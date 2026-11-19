// 방 목록과 메시지 처리. 통신 방식을 모른다: Node(WebSocket)와 브라우저(P2P)에서 똑같이 돈다.
import { Room, TICK_MS } from './room.js';
import { Player } from './player.js';
import { SKIN_IDS, TICK_HZ, MODES, MATCH_SECONDS } from '../shared/constants.js';
import { MAPS, MAP_IDS } from '../shared/map.js';
import { cleanText } from '../shared/filter.js';
import { cleanLook } from '../shared/cosmetics.js';
import { cleanLoadout } from '../shared/constants.js';

class HumanPlayer extends Player {
  constructor(id, name, skin, rawSend) {
    super(id, name, skin);
    this.rawSend = rawSend;
  }
  send(msg) { this.sendRaw(JSON.stringify(msg)); }
  sendRaw(raw) { this.rawSend(raw); }
}

function cleanName(v, fallback, max = 20) { // 크레이지게임즈 닉네임이 최대 20자
  const s = String(v ?? '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, max);
  return s ? cleanText(s) : fallback;
}

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

// migrate: 방장 브라우저가 서버인 경우(P2P). 방장이 나갈 때를 대비해 이어받을 사람에게 상태를 보낸다
export function createHub({ timings = {}, autoTick = true, migrate = false } = {}) {
  const rooms = new Map();
  const clients = new Set();
  let ids = 0, roomIds = 0;

  const hub = {
    migrate,
    nextId: () => ++ids,
    roomsChanged() {
      const raw = JSON.stringify({ t: 'rooms', rooms: [...rooms.values()].map((r) => r.summary()) });
      for (const c of clients) if (!c.room) c.sendRaw(raw);
    },
    deleteRoom(room) { rooms.delete(room.id); hub.roomsChanged(); },
  };

  const createRoom = (name) => {
    const room = new Room(String(++roomIds), name, hub, timings);
    rooms.set(room.id, room);
    return room;
  };

  function handle(p, data) {
    let m;
    try { m = JSON.parse(String(data)); } catch { return; }
    if (!m || typeof m !== 'object') return;
    const r = p.room;
    switch (m.t) {
      case 'ping':
        if (typeof m.rtt === 'number' && m.rtt >= 0) p.rtt = Math.min(250, m.rtt);
        p.send({ t: 'pong', c: m.c, s: Date.now() });
        break;
      case 'hello':
        p.name = cleanName(m.name, p.name);
        if (SKIN_IDS.includes(m.skin)) p.skin = m.skin;
        p.look = cleanLook(m.look);
        if (m.loadout) p.loadout = cleanLoadout(m.loadout);
        if (Number.isInteger(m.was)) p.was = m.was; // 방장이 바뀌기 전 내 아이디
        break;
      case 'loadout':
        // 무기는 대기실에서만 바꾼다
        if (r && r.state !== 'lobby') break;
        p.loadout = cleanLoadout(m.loadout);
        if (r) r.sendRoom();
        break;
      case 'look':
        // 꾸미기는 대기실에서만 바뀐다 (경기 중 캐릭터를 다시 만들지 않게)
        if (r && r.state !== 'lobby') break;
        p.look = cleanLook(m.look);
        if (r) r.sendRoom();
        break;
      case 'rename': {
        const name = cleanName(m.name, p.name);
        if (r) r.rename(p, name);
        else p.name = name;
        break;
      }
      case 'create':
        if (!r) {
          const room = createRoom(cleanName(m.name, `${p.name}'s room`, 20));
          room.public = !!m.public;
          room.add(p);
        }
        break;
      case 'join':
        if (!r) {
          const room = rooms.get(String(m.id));
          if (!room || !room.add(p)) p.send({ t: 'error', key: 'err.roomFull' });
        }
        break;
      case 'leave':
        if (r) { r.remove(p); p.send({ t: 'left' }); hub.roomsChanged(); }
        break;
      case 'ready': r?.setReady(p, m.ready); break;
      case 'busy':
        p.adBusy = !!m.on;
        break;
      case 'skin':
        if (r) r.setSkin(p, m.skin);
        else if (SKIN_IDS.includes(m.skin)) p.skin = m.skin;
        break;
      case 'map': r?.setMap(p, m.id); break;
      case 'mode': r?.setMode(p, m.id); break;
      case 'chat': r?.chat(p, m.text); break;
      case 'addBot': r?.addBot(); break;
      case 'removeBot': r?.removeBot(); break;
      case 'state': r?.onState(p, m); break;
      case 'shoot': r?.onShoot(p, m); break;
      case 'slap': r?.onSlap(p, m); break;
      case 'ultra': r?.onUltra(p); break;
      case 'fell': r?.onFell(p); break;
      default: break;
    }
  }

  let last = Date.now();
  function tick() {
    const now = Date.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    for (const room of rooms.values()) {
      try { room.tick(now, dt); } catch (e) { console.error('방 처리 오류', room.id, e); }
    }
  }
  const loop = autoTick ? setInterval(tick, TICK_MS) : 0;

  return {
    rooms,
    tick,
    // 옛 방장이 맡겨 둔 상태로 방을 다시 만든다. 봇은 바로, 사람은 옛 아이디로 들어오면 기록을 돌려받는다
    restore(s) {
      const room = createRoom(cleanName(s?.name, 'AURA FARM', 20));
      room.public = !!s.public;
      if (MODES[s.mode]) room.mode = s.mode;
      if (s.mapChoice === 'random' || MAP_IDS.includes(s.mapChoice)) room.mapChoice = s.mapChoice;
      if (MAPS[s.mapId]) room.map = MAPS[s.mapId];
      room.played = Math.max(0, num(s.played) | 0);
      room.carry = new Map();
      const live = num(s.msLeft) > 0;
      const rec = (r) => ({
        wins: num(r.wins) | 0,
        ...(live ? { kills: num(r.kills) | 0, aura: num(r.aura), stats: r.stats && typeof r.stats === 'object' ? r.stats : {} } : {}),
      });
      for (const r of (Array.isArray(s.players) ? s.players : []).slice(0, 12)) {
        if (!r || typeof r !== 'object') continue;
        if (r.isBot) {
          const b = room.makeBot();
          b.name = room.uniqueName(cleanName(r.name, b.name), b);
          if (SKIN_IDS.includes(r.skin)) b.skin = r.skin;
          b.loadout = cleanLoadout(r.loadout);
          b.weapon = b.loadout.p;
          const c = rec(r);
          b.wins = c.wins;
          if (live) b.carry = c;
        } else if (Number.isInteger(r.id)) {
          room.carry.set(r.id, rec(r));
        }
      }
      if (live) room.pendingResume = Math.min(num(s.msLeft), MATCH_SECONDS * 1000);
      return room;
    },
    // 접속 하나 연결. rawSend(문자열)로 보내고, message/close를 불러 준다.
    // local: 이 브라우저의 방장 자신 (이어받을 사람 후보에서 뺀다)
    connect(rawSend, { local = false } = {}) {
      const p = new HumanPlayer(hub.nextId(), 'Random NPC', 'minsu', rawSend);
      p.isLocal = local;
      clients.add(p);
      p.send({ t: 'welcome', id: p.id, rooms: [...rooms.values()].map((r) => r.summary()), tickHz: TICK_HZ });
      return {
        message: (data) => handle(p, data),
        close() {
          if (!clients.delete(p)) return;
          p.room?.remove(p);
          hub.roomsChanged();
        },
      };
    },
    stop() { clearInterval(loop); },
  };
}
