// 방 하나 = 대기실 + 경기 1판 (개인전, 2~4명). 서버가 체력·킬·아우라·판정을 전부 결정한다.
import {
  TICK_HZ, MAX_HP, WIN_KILLS, MATCH_SECONDS, AURA_MAX, INTERP_MS, MAX_PLAYERS,
  WEAPONS, LASER, SLAP, AURA, CHICKEN_HEAL, BOMB, NUKE, FALLOUT, SIGMA, CAT, FLUSH, BARK, HERO, CHILL, TUNG, RIZZ, ULTRAS, EVENTS, EVENT_IDS, PLAYER, DEFAULT_TIMINGS, SKIN_IDS,
} from '../shared/constants.js';
import { MAPS, MAP_IDS, DEFAULT_MAP, pickSpawn, rayWorld, rayPlayer, groundAt } from '../shared/map.js';
import { Bot } from './bot.js';
import { cleanText } from '../shared/filter.js';

const finite = (v) => typeof v === 'number' && Number.isFinite(v);
const validVec = (v) => Array.isArray(v) && v.length === 3 && v.every(finite);
const round = (n) => Math.round(n * 100) / 100;
const BOT_NAMES = ['AI Minsu', 'Practice NPC', 'Bot Rocks', 'Ohio Bot', 'Payroll Bot', 'Skill Issue', 'Intern Bot'];
const CREDIT_MS = 8000;
const now0 = () => Date.now();

export class Room {
  constructor(id, name, hub, timings = {}) {
    this.id = id;
    this.name = name;
    this.hub = hub;
    this.t = { ...DEFAULT_TIMINGS, ...timings };
    this.players = [];
    this.state = 'lobby';
    this.stateUntil = 0;
    this.matchEndsAt = 0;
    this.mapChoice = DEFAULT_MAP;
    this.map = MAPS[DEFAULT_MAP];
    this.pickups = [];
    this.bombs = [];
    this.nukes = [];
    this.fallouts = [];
    this.event = null;
    this.nextEventAt = 0;
    // 공개 방: 모르는 사람이 경기 중에도 봇 자리로 들어오고, 경기가 끝나면 알아서 다음 판이 시작된다
    this.public = false;
    this.autoStartAt = 0;
    this.played = 0;
  }

  // ---------- 대기실 ----------
  summary() {
    return { id: this.id, name: this.name, state: this.state, count: this.players.length, humans: this.humans(), max: MAX_PLAYERS, map: this.mapChoice, open: this.joinable(), public: this.public };
  }

  humans() { return this.players.filter((p) => !p.isBot).length; }
  live() { return this.state === 'countdown' || this.state === 'playing'; }

  // 지금 사람이 더 들어올 수 있나. 봇 자리는 빈자리로 친다
  joinable() {
    if (this.humans() >= MAX_PLAYERS) return false;
    return this.state === 'lobby' || (this.public && this.live());
  }

  roomMessage() {
    return {
      t: 'room',
      room: {
        id: this.id, name: this.name, state: this.state, mapChoice: this.mapChoice, mapId: this.map.id,
        open: this.joinable(), public: this.public,
        autoStartIn: this.autoStartAt ? Math.max(0, this.autoStartAt - Date.now()) : 0,
        players: this.players.map((p) => ({
          id: p.id, name: p.name, skin: p.skin, ready: p.ready, wins: p.wins, isBot: p.isBot,
        })),
      },
    };
  }

  broadcast(msg) {
    const raw = JSON.stringify(msg);
    for (const p of this.players) p.sendRaw(raw);
  }

  sendRoom() {
    this.broadcast(this.roomMessage());
    this.hub.roomsChanged();
  }

  add(player) {
    if (!this.joinable()) return false;
    // 사람이 오면 봇이 자리를 내준다
    if (this.players.length >= MAX_PLAYERS) {
      const bot = [...this.players].reverse().find((p) => p.isBot);
      if (!bot) return false;
      this.detach(bot);
    }
    player.room = this;
    player.ready = false;
    player.wins = 0;
    player.name = this.uniqueName(player.name, player);
    this.players.push(player);
    if (this.live()) this.dropIn(player);
    this.armAutoStart();
    this.sendRoom();
    return true;
  }

  // 경기 중에 들어온 사람이나 봇을 바로 경기에 넣는다
  dropIn(p) {
    p.resetForMatch();
    p.ready = true;
    this.placeAtSpawn(p, this.players.filter((q) => q !== p && q.alive).map((q) => q.pos));
    if (!p.isBot) {
      const now = Date.now();
      p.send({
        t: 'matchStart',
        map: this.map.id,
        countdownMs: this.state === 'countdown' ? Math.max(0, this.stateUntil - now) : 0,
        endsIn: this.matchEndsAt - now,
        players: this.players.map((q) => ({ id: q.id, name: q.name, skin: q.skin, pos: q.pos, yaw: q.yaw, isBot: q.isBot })),
        pickups: this.pickups.map((q) => q.active),
        dropIn: true,
      });
      if (this.state === 'playing') p.send({ t: 'go' });
    }
    this.broadcast({ t: 'sys', key: 'sys.joined', vars: { name: p.name } });
  }

  // 방에서 떼어 낸다. 걸려 있던 각성과 고양이도 정리
  detach(player) {
    const i = this.players.indexOf(player);
    if (i < 0) return false;
    if (player.ultraKind) this.endUltra(player, false);
    for (const q of this.players) if (q.cat?.target === player) { q.cat.target = null; q.cat.latched = false; }
    this.players.splice(i, 1);
    player.room = null;
    return true;
  }

  // 공개 방은 사람이 나간 자리를 봇으로 채워 경기가 계속 굴러가게 한다
  fillBots() {
    if (!this.public || this.state === 'results') return;
    while (this.players.length < MAX_PLAYERS) this.makeBot();
  }

  armAutoStart() {
    if (!this.public || this.state !== 'lobby' || this.autoStartAt) return;
    if (this.humans() >= 2 || this.played > 0) this.autoStartAt = Date.now() + (this.t.autoStartMs ?? 15000);
  }

  remove(player) {
    if (!this.detach(player)) return;
    if (this.humans() === 0) {
      this.players = [];
      this.hub.deleteRoom(this);
      return;
    }
    this.fillBots();
    if (this.state === 'countdown' || this.state === 'playing') {
      if (this.players.length >= 2) {
        this.broadcast({ t: 'sys', key: 'sys.fled', vars: { name: player.name } });
        this.sendRoom();
      } else {
        this.endMatch(this.players[0], 'ragequit');
      }
    } else if (this.state === 'results') {
      this.broadcast({ t: 'sys', key: 'sys.fled', vars: { name: player.name } });
      this.sendRoom();
    } else {
      this.players.forEach((p) => { p.ready = p.isBot; });
      this.broadcast({ t: 'sys', key: 'sys.left', vars: { name: player.name } });
      this.sendRoom();
    }
  }

  addBot() {
    if (this.state !== 'lobby' || this.players.length >= MAX_PLAYERS) return;
    this.makeBot();
    this.sendRoom();
    this.maybeStart();
  }

  makeBot() {
    const used = new Set(this.players.map((p) => p.name));
    const names = BOT_NAMES.filter((n) => !used.has(n));
    const bot = new Bot(this.hub.nextId(), names[Math.floor(Math.random() * names.length)], SKIN_IDS[Math.floor(Math.random() * SKIN_IDS.length)]);
    bot.room = this;
    bot.ready = true;
    bot.wins = 0;
    this.players.push(bot);
    if (this.live()) this.dropIn(bot);
    return bot;
  }

  removeBot() {
    if (this.state !== 'lobby') return;
    for (let i = this.players.length - 1; i >= 0; i--) {
      if (this.players[i].isBot) { this.players.splice(i, 1); break; }
    }
    this.sendRoom();
  }

  setReady(player, ready) {
    if (this.state !== 'lobby') return;
    player.ready = !!ready;
    this.sendRoom();
    this.maybeStart();
  }

  setSkin(player, skin) {
    if (this.state !== 'lobby' || !SKIN_IDS.includes(skin)) return;
    player.skin = skin;
    this.sendRoom();
  }

  setMap(player, id) {
    if (this.state !== 'lobby' || (id !== 'random' && !MAP_IDS.includes(id)) || this.mapChoice === id) return;
    this.mapChoice = id;
    if (id !== 'random') this.map = MAPS[id];
    this.broadcast({ t: 'sys', key: 'sys.map', vars: { name: player.name }, mapId: id });
    this.sendRoom();
  }

  // 같은 이름이 있으면 뒤에 번호를 붙인다 (게스트 기본 이름이 겹치기 쉽다)
  uniqueName(name, self) {
    const taken = new Set(this.players.filter((p) => p !== self).map((p) => p.name));
    if (!taken.has(name)) return name;
    for (let i = 2; ; i++) {
      const n = `${name.slice(0, 17)} ${i}`;
      if (!taken.has(n)) return n;
    }
  }

  rename(player, name) {
    name = this.uniqueName(name, player);
    if (this.state !== 'lobby' || player.name === name) return;
    const old = player.name;
    player.name = name;
    this.broadcast({ t: 'sys', key: 'sys.rename', vars: { old, name } });
    this.sendRoom();
  }

  chat(player, text) {
    const clean = String(text ?? '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, 120);
    if (clean) this.broadcast({ t: 'chat', from: player.name, text: cleanText(clean) });
  }

  maybeStart() {
    if (this.state === 'lobby' && this.players.length >= 2 && this.players.every((p) => p.ready)) this.startMatch();
  }

  // ---------- 경기 ----------
  startMatch() {
    const now = Date.now();
    if (this.mapChoice === 'random') {
      const rest = MAP_IDS.filter((m) => m !== this.map.id);
      this.map = MAPS[rest[Math.floor(Math.random() * rest.length)]];
    }
    this.state = 'countdown';
    this.autoStartAt = 0;
    this.stateUntil = now + this.t.countdownMs;
    this.event = null;
    this.bombs = [];
    this.nukes = [];
    this.fallouts = [];
    this.nextEventAt = now + this.t.countdownMs + this.t.eventFirstMs;
    this.matchEndsAt = now + this.t.countdownMs + MATCH_SECONDS * 1000;
    this.pickups = this.map.pickups.map((p) => ({ ...p, active: true, respawnAt: 0 }));

    const taken = [];
    for (const p of this.players) {
      p.resetForMatch();
      this.placeAtSpawn(p, taken);
      taken.push(p.pos);
    }
    this.broadcast({
      t: 'matchStart',
      map: this.map.id,
      countdownMs: this.t.countdownMs,
      endsIn: this.matchEndsAt - now,
      players: this.players.map((p) => ({ id: p.id, name: p.name, skin: p.skin, pos: p.pos, yaw: p.yaw, isBot: p.isBot })),
      pickups: this.pickups.map((p) => p.active),
    });
    this.sendRoom();
  }

  placeAtSpawn(p, avoid) {
    const sp = pickSpawn(this.map, avoid);
    p.pos = [...sp.pos];
    p.yaw = sp.yaw;
    p.pitch = 0;
    p.history = [];
    p.alive = true;
    p.hp = MAX_HP;
    p.invulnUntil = Date.now() + this.t.invulnMs;
    p.emote = 0;
    p.lastHitBy = null;
    p.charmUntil = 0;
    p.charmBy = null;
    p.slowUntil = 0;
    if (p.isBot) p.onSpawn();
  }

  others(p) { return this.players.filter((o) => o !== p); }
  isPlaying() { return this.state === 'playing'; }
  bigHead() { return this.event?.kind === 'bighead'; }
  isGrabbed(p) { return this.players.some((q) => q.cat?.latched && q.cat.target === p); }

  // 혼자 죽어도 마지막으로 때린 사람 몫. 1대1이면 상대 몫.
  creditFor(victim, now = Date.now()) {
    if (victim.lastHitBy && now - victim.lastHitAt < CREDIT_MS && this.players.includes(victim.lastHitBy)) return victim.lastHitBy;
    const rest = this.others(victim);
    return rest.length === 1 ? rest[0] : null;
  }

  tick(now, dt) {
    if (this.state === 'lobby') {
      // 광고를 보는 사람이 있으면 끝날 때까지 기다린다
      if (this.autoStartAt && now >= this.autoStartAt && !this.players.some((p) => p.adBusy)) {
        if (this.players.length >= 2) {
          for (const p of this.players) p.ready = true;
          this.startMatch();
        } else {
          this.autoStartAt = 0;
          this.sendRoom();
        }
      }
    } else if (this.state === 'countdown') {
      if (now >= this.stateUntil) {
        this.state = 'playing';
        this.broadcast({ t: 'go' });
        this.sendRoom();
      }
      this.snapshot(now);
    } else if (this.state === 'playing') {
      this.tickPlaying(now, dt);
      if (this.state === 'playing') this.snapshot(now);
    } else if (this.state === 'results' && now >= this.stateUntil) {
      this.backToLobby();
    }
  }

  tickPlaying(now, dt) {
    for (const p of [...this.players]) {
      if (this.state !== 'playing') return;
      if (p.isBot && !p.cat) p.think(this, now, dt);
      if (this.state !== 'playing') return;
      if (!p.alive) {
        if (now >= p.respawnAt) this.respawn(p);
        continue;
      }
      if (p.ultraUntil && now >= p.ultraUntil) this.endUltra(p, true);
      if (p.cat) this.tickCat(p, now, dt);
      if (this.state !== 'playing') return;
      if (p.flush && p.alive) this.tickFlush(p, now);
      if (this.state !== 'playing') return;
      if (p.alive && (p.ultraKind === 'streamer' || p.ultraKind === 'tung')) this.tickContact(p, now);
      if (this.state !== 'playing') return;
      if (p.alive && p.ultraKind === 'rizz') this.tickRizz(p, now);
      if (this.state !== 'playing') return;
      if (p.alive && p.ultraKind === 'chill') p.hp = Math.min(MAX_HP, round(p.hp + CHILL.regenPerSec * dt));
      if (p.alive && p.emote === 1 && now - p.movedAt > 150) {
        this.addAura(p, AURA.farmPerSec * dt, null);
      }
      if (p.alive && !p.cat && p.pos[1] < this.map.fallY) {
        this.kill(p, this.creditFor(p, now), { weapon: 'fall', head: false });
        if (this.state !== 'playing') return;
      }
    }
    for (let i = 0; i < this.pickups.length; i++) {
      const pk = this.pickups[i];
      if (!pk.active && now >= pk.respawnAt) {
        pk.active = true;
        this.broadcast({ t: 'pickup', i, active: true });
      }
    }
    this.tickBombs(now);
    if (this.state !== 'playing') return;
    this.tickNukes(now);
    if (this.state !== 'playing') return;
    this.tickFallouts(now);
    if (this.state !== 'playing') return;
    this.tickEvents(now);
    if (now >= this.matchEndsAt) this.endByTime();
  }

  tickEvents(now) {
    if (this.event && now >= this.event.until) {
      this.event = null;
      this.broadcast({ t: 'event', kind: null });
    }
    if (!this.event && now >= this.nextEventAt) {
      this.startEvent(EVENT_IDS[Math.floor(Math.random() * EVENT_IDS.length)], now);
    }
  }

  startEvent(kind, now = Date.now()) {
    const def = EVENTS[kind];
    this.event = { kind, until: now + def.ms };
    this.nextEventAt = now + def.ms + this.t.eventGapMs;
    this.broadcast({ t: 'event', kind, ms: def.ms });
    if (kind === 'dogfight') this.scheduleAirstrike(now);
  }

  scheduleAirstrike(now) {
    // 6발 + 7발. 사람들을 노리고, 나머지는 아무 데나.
    const targets = this.players.filter((p) => p.alive);
    const lim = this.map.bounds - 2;
    for (let i = 0; i < 13; i++) {
      const anchor = targets.length && Math.random() < 0.7 ? targets[i % targets.length].pos : this.map.showcase.pos;
      const x = Math.max(-lim, Math.min(lim, anchor[0] + (Math.random() - 0.5) * 9));
      const z = Math.max(-lim, Math.min(lim, anchor[2] + (Math.random() - 0.5) * 9));
      const g = groundAt(this.map, x, z, anchor[1] + 1);
      const y = g > -50 ? g : anchor[1];
      const at = now + BOMB.fuseMs + (i < 6 ? i * 280 : 2000 + (i - 6) * 280);
      this.bombs.push({ pos: [x, y, z], at });
      this.broadcast({ t: 'bomb', pos: [round(x), round(y), round(z)], in: at - now });
    }
  }

  tickBombs(now) {
    if (!this.bombs.length) return;
    const due = this.bombs.filter((b) => now >= b.at);
    this.bombs = this.bombs.filter((b) => now < b.at);
    for (const b of due) {
      this.broadcast({ t: 'boom', pos: b.pos });
      for (const p of [...this.players]) {
        if (!p.alive) continue;
        const dx = p.pos[0] - b.pos[0], dy = p.pos[1] + 0.9 - b.pos[1], dz = p.pos[2] - b.pos[2];
        const d = Math.hypot(dx, dy, dz);
        if (d >= BOMB.radius) continue;
        const k = 1 - d / BOMB.radius;
        const l = d || 1;
        this.knock(p, [dx / l * BOMB.knock * k, 8 * k + 3, dz / l * BOMB.knock * k]);
        this.damage(p, this.creditFor(p, now), BOMB.damage * k, { weapon: 'bomb', head: false, env: true, pos: p.pos });
        if (this.state !== 'playing') return;
      }
    }
  }

  // ---------- 캐릭터별 각성 ----------
  onUltra(p) {
    if (!this.isPlaying() || !p.alive || p.aura < AURA_MAX || p.ultraKind) return;
    const now = Date.now();
    const kind = ULTRAS[p.skin] ? p.skin : 'sigma';
    const def = ULTRAS[kind];
    p.aura = 0;
    p.ultraKind = kind;
    p.ultraUntil = now + def.ms;
    p.emote = 0;
    p.waveN = 0;
    p.ultraTick = 0;
    p.rizzTick = 0;
    this.broadcast({ t: 'ultra', id: p.id, on: true, ms: def.ms, kind });
    if (kind === 'cat') {
      p.cat = { target: null, latched: false, start: [...p.pos], nextTick: 0 };
    } else if (kind === 'toilet') {
      p.flush = { nextTick: now };
    } else if (kind === 'cone') {
      this.launchNuke(p, now);
    } else if (kind === 'hero') {
      p.cat = { punch: true, target: null, hits: 0, done: new Set(), start: [...p.pos], landing: null };
    } else if (kind === 'chill') {
      for (const q of this.others(p)) {
        if (!q.alive || Math.hypot(q.pos[0] - p.pos[0], q.pos[2] - p.pos[2]) > CHILL.radius) continue;
        q.slowUntil = now + def.ms;
        this.broadcast({ t: 'slow', id: p.id, to: q.id, ms: def.ms });
      }
    } else if (kind === 'rizz') {
      for (const q of this.others(p)) {
        if (!q.alive || Math.hypot(q.pos[0] - p.pos[0], q.pos[2] - p.pos[2]) > RIZZ.radius) continue;
        q.charmUntil = now + def.ms;
        q.charmBy = p;
        this.broadcast({ t: 'charm', id: p.id, to: q.id, ms: def.ms });
      }
    }
  }

  endUltra(p, notify) {
    if (!p.ultraKind) return;
    const c = p.cat;
    const wasFlush = p.flush && notify && p.alive && now0() >= p.ultraUntil;
    p.cat = null;
    p.flush = null;
    p.ultraKind = null;
    p.ultraUntil = 0;
    if (c && p.alive && notify) {
      // 벽 뚫고 날아다녔으니 안전한 곳에 내려놓는다
      const landing = c.landing ?? (c.latched && c.target?.alive ? c.target.pos : c.start);
      p.teleport(landing);
    }
    if (notify) this.broadcast({ t: 'ultra', id: p.id, on: false });
    if (wasFlush) this.geyser(p);
  }

  // 변기맨 마무리: 물기둥
  geyser(p) {
    this.broadcast({ t: 'geyser', id: p.id, pos: p.pos.map(round), radius: FLUSH.geyserRadius });
    for (const q of this.others(p)) {
      if (!q.alive) continue;
      const dx = q.pos[0] - p.pos[0], dz = q.pos[2] - p.pos[2];
      const d = Math.hypot(dx, dz) || 1;
      if (d > FLUSH.geyserRadius || Math.abs(q.pos[1] - p.pos[1]) > 8) continue;
      this.knock(q, [dx / d * 6, FLUSH.geyserUp, dz / d * 6]);
      this.damage(q, p, FLUSH.geyserDamage, { weapon: 'flush', head: false, env: true, pos: q.pos });
      if (this.state !== 'playing') return;
    }
  }

  // 리즈왕: 코앞까지 걸어온 상대의 아우라와 체력을 뺏는다
  tickRizz(p, now) {
    if (now < p.rizzTick) return;
    p.rizzTick = now + RIZZ.tickMs;
    for (const q of this.others(p)) {
      if (!q.alive || q.charmBy !== p || now >= q.charmUntil) continue;
      if (Math.hypot(q.pos[0] - p.pos[0], q.pos[2] - p.pos[2]) > RIZZ.kissRange) continue;
      this.addAura(q, -RIZZ.auraDrain, null);
      this.addAura(p, RIZZ.auraDrain, null);
      p.hp = Math.min(MAX_HP, round(p.hp + RIZZ.heal));
      this.damage(q, p, RIZZ.damage, { weapon: 'rizz', head: false, env: true, pos: q.pos });
      if (this.state !== 'playing') return;
    }
  }

  tickFallouts(now) {
    if (!this.fallouts.length) return;
    this.fallouts = this.fallouts.filter((f) => now < f.until);
    for (const f of this.fallouts) {
      if (now < f.next) continue;
      f.next = now + FALLOUT.tickMs;
      for (const q of [...this.players]) {
        if (q === f.owner || !q.alive) continue;
        if (Math.hypot(q.pos[0] - f.pos[0], q.pos[2] - f.pos[2]) > FALLOUT.radius || Math.abs(q.pos[1] - f.pos[1]) > 6) continue;
        this.damage(q, this.players.includes(f.owner) ? f.owner : null, FALLOUT.damage, { weapon: 'nuke', head: false, env: true, pos: q.pos });
        if (this.state !== 'playing') return;
      }
    }
  }

  nearestAlive(p) {
    let best = null, bestD = Infinity;
    for (const o of this.others(p)) {
      if (!o.alive) continue;
      const d = Math.hypot(o.pos[0] - p.pos[0], o.pos[1] - p.pos[1], o.pos[2] - p.pos[2]);
      if (d < bestD) { bestD = d; best = o; }
    }
    return best;
  }

  // 고양이: 제일 가까운 놈에게 날아가서 얼굴에 붙어 할퀸다. 맞는 쪽은 싸대기(F)로 떼어낼 수 있다.
  tickCat(p, now, dt) {
    const c = p.cat;
    if (c.punch) { this.tickHero(p, c, now, dt); return; }
    if (!c.target || !c.target.alive) {
      if (c.latched) this.broadcast({ t: 'cat', id: p.id, to: null });
      c.latched = false;
      c.target = this.nearestAlive(p);
      if (!c.target) return;
    }
    const t = c.target;
    if (!c.latched) {
      const goal = [t.pos[0], t.pos[1] + 0.6, t.pos[2]];
      const to = [goal[0] - p.pos[0], goal[1] - p.pos[1], goal[2] - p.pos[2]];
      const d = Math.hypot(to[0], to[1], to[2]) || 1;
      const move = CAT.flySpeed * dt;
      if (d <= Math.max(CAT.latchRange, move)) {
        c.latched = true;
        c.nextTick = now;
        this.broadcast({ t: 'cat', id: p.id, to: t.id });
      } else {
        p.pos = [p.pos[0] + (to[0] / d) * move, p.pos[1] + (to[1] / d) * move, p.pos[2] + (to[2] / d) * move];
        p.yaw = Math.atan2(-to[0], -to[2]);
      }
    }
    if (c.latched) {
      const s = Math.sin(t.yaw), k = Math.cos(t.yaw);
      p.pos = [t.pos[0] - s * 0.55, t.pos[1] + 0.55, t.pos[2] - k * 0.55];
      p.yaw = t.yaw + Math.PI;
      if (now >= c.nextTick) {
        c.nextTick = now + CAT.tickMs;
        const stolen = Math.min(t.aura, CAT.auraSteal);
        if (stolen > 0) { this.addAura(t, -stolen, null); this.addAura(p, stolen, null); }
        this.damage(t, p, CAT.damage, { weapon: 'claw', head: false, env: true, pos: t.pos });
      }
    }
    p.movedAt = now;
    p.pushHistory(now);
  }

  disabled(p, now) { return now < p.charmUntil; }

  // 사후르: 주변 전체 충격파. 스트리머: 바라보는 쪽으로 짖기.
  tickContact(p, now) {
    if (now < p.ultraTick) return;
    const tung = p.ultraKind === 'tung';
    const def = tung ? TUNG : BARK;
    p.ultraTick = now + def.tickMs;
    p.waveN = (p.waveN ?? 0) + 1;
    const final = p.waveN >= def.count;
    const fx = -Math.sin(p.yaw), fz = -Math.cos(p.yaw);
    const reach = tung ? (final ? TUNG.finalRadius : TUNG.radius + (p.waveN - 1) * TUNG.radiusStep) : BARK.range;
    if (tung) this.broadcast({ t: 'wave', id: p.id, pos: p.pos.map(round), radius: reach, n: p.waveN, final });
    else this.broadcast({ t: 'bark', id: p.id, pos: p.pos.map(round), yaw: round(p.yaw), range: BARK.range, final });
    const eye = [p.pos[0], p.pos[1] + PLAYER.eye, p.pos[2]];
    for (const q of this.others(p)) {
      if (!q.alive || now < q.invulnUntil) continue;
      const dx = q.pos[0] - p.pos[0], dz = q.pos[2] - p.pos[2];
      const d = Math.hypot(dx, dz) || 1;
      if (d > reach || Math.abs(q.pos[1] - p.pos[1]) > 6) continue;
      if (!tung) {
        if (!final && (dx * fx + dz * fz) / d < BARK.cone) continue;
        const to = [dx, q.pos[1] + 1 - eye[1], dz];
        const l = Math.hypot(to[0], to[1], to[2]) || 1;
        if (rayWorld(this.map, eye, [to[0] / l, to[1] / l, to[2] / l], l) < l - 0.05) continue; // 벽 뒤는 안 들림
      }
      const kn = final ? def.finalKnock : def.knock;
      this.knock(q, [dx / d * kn, final ? 15 : 9, dz / d * kn]);
      this.damage(q, p, final ? def.finalDamage : def.damage, { weapon: tung ? 'tung' : 'bark', head: false, env: true, pos: q.pos });
      if (this.state !== 'playing') return;
    }
  }

  // 히어로: 벽 뚫고 날아가 한 명씩 관통
  tickHero(p, c, now, dt) {
    if (!c.target || !c.target.alive || c.done.has(c.target)) {
      let best = null, bestD = Infinity;
      for (const o of this.others(p)) {
        if (!o.alive || c.done.has(o)) continue;
        const d = Math.hypot(o.pos[0] - p.pos[0], o.pos[1] - p.pos[1], o.pos[2] - p.pos[2]);
        if (d < bestD) { bestD = d; best = o; }
      }
      c.target = best;
      if (!best) { this.endUltra(p, true); return; }
    }
    const t = c.target;
    const goal = [t.pos[0], t.pos[1] + 0.6, t.pos[2]];
    const to = [goal[0] - p.pos[0], goal[1] - p.pos[1], goal[2] - p.pos[2]];
    const d = Math.hypot(to[0], to[1], to[2]) || 1;
    const move = HERO.flySpeed * dt;
    p.yaw = Math.atan2(-to[0], -to[2]);
    if (d > Math.max(HERO.range, move)) {
      p.pos = [p.pos[0] + (to[0] / d) * move, p.pos[1] + (to[1] / d) * move, p.pos[2] + (to[2] / d) * move];
    } else {
      c.done.add(t);
      c.hits++;
      c.landing = [...t.pos];
      this.knock(t, [(to[0] / d) * HERO.knock, 12, (to[2] / d) * HERO.knock]);
      this.damage(t, p, HERO.damage[Math.min(c.hits - 1, HERO.damage.length - 1)], { weapon: 'hero', head: false, env: true, pos: t.pos });
      if (this.state !== 'playing' || !p.cat) return;
      this.broadcast({ t: 'punch', id: p.id, pos: t.pos.map(round), n: c.hits });
      for (const q of this.others(p)) {
        if (q === t || !q.alive || c.done.has(q)) continue;
        const sd = Math.hypot(q.pos[0] - t.pos[0], q.pos[1] - t.pos[1], q.pos[2] - t.pos[2]);
        if (sd > HERO.splashRadius) continue;
        this.damage(q, p, HERO.splashDamage, { weapon: 'hero', head: false, env: true, pos: q.pos });
        if (this.state !== 'playing' || !p.cat) return;
      }
      if (c.hits >= HERO.hits) { this.endUltra(p, true); return; }
    }
    p.movedAt = now;
    p.pushHistory(now);
  }

  // 변기맨: 주변을 빨아들이고, 코앞까지 오면 물에 갈린다.
  tickFlush(p, now) {
    if (now < p.flush.nextTick) return;
    p.flush.nextTick = now + FLUSH.tickMs;
    for (const q of this.others(p)) {
      if (!q.alive || now < q.invulnUntil) continue;
      const dx = p.pos[0] - q.pos[0], dz = p.pos[2] - q.pos[2];
      const d = Math.hypot(dx, dz) || 1;
      if (d > FLUSH.radius || Math.abs(p.pos[1] - q.pos[1]) > 8) continue;
      const pull = FLUSH.pull * (1 - d / FLUSH.radius) + 3;
      this.knock(q, [dx / d * pull, 2.2, dz / d * pull]);
      if (d < FLUSH.coreRadius) {
        this.damage(q, p, FLUSH.damage, { weapon: 'flush', head: false, env: true, pos: q.pos });
        if (this.state !== 'playing') return;
      }
    }
  }

  // 오하이오 주민: 조준한 곳에 핵. 쏜 사람은 방사능 면역.
  launchNuke(p, now) {
    const cp = Math.cos(p.pitch);
    const d = [-Math.sin(p.yaw) * cp, Math.sin(p.pitch), -Math.cos(p.yaw) * cp];
    const eye = [p.pos[0], p.pos[1] + PLAYER.eye, p.pos[2]];
    const t = rayWorld(this.map, eye, d, NUKE.aimRange);
    const hit = [eye[0] + d[0] * t, eye[1] + d[1] * t, eye[2] + d[2] * t];
    const g = groundAt(this.map, hit[0], hit[2], hit[1] + 0.5);
    const pos = [round(hit[0]), round(g > -50 ? g : Math.max(0, hit[1])), round(hit[2])];
    this.nukes.push({ pos, at: now + NUKE.fuseMs, owner: p });
    this.broadcast({ t: 'nuke', id: p.id, pos, in: NUKE.fuseMs, radius: NUKE.radius });
  }

  tickNukes(now) {
    if (!this.nukes.length) return;
    const due = this.nukes.filter((n) => now >= n.at);
    this.nukes = this.nukes.filter((n) => now < n.at);
    for (const n of due) {
      this.broadcast({ t: 'nukeBoom', id: n.owner.id, pos: n.pos, radius: NUKE.radius });
      const owner = this.players.includes(n.owner) ? n.owner : null;
      const center = [n.pos[0], n.pos[1] + 3, n.pos[2]];
      for (const q of [...this.players]) {
        if (q === n.owner || !q.alive) continue;
        const to = [q.pos[0] - center[0], q.pos[1] + 1 - center[1], q.pos[2] - center[2]];
        const d = Math.hypot(to[0], to[1], to[2]) || 1;
        if (d >= NUKE.radius) continue;
        const dir = [to[0] / d, to[1] / d, to[2] / d];
        const covered = rayWorld(this.map, center, dir, d) < d - 0.05; // 벽 뒤면 절반
        const k = 1 - d / NUKE.radius;
        this.knock(q, [dir[0] * NUKE.knock * k, 14 * k + 4, dir[2] * NUKE.knock * k]);
        this.damage(q, owner, NUKE.damage * k * (covered ? 0.5 : 1), { weapon: 'nuke', head: false, env: true, pos: q.pos });
        if (this.state !== 'playing') return;
      }
      this.fallouts.push({ pos: n.pos, owner: n.owner, until: now + FALLOUT.ms, next: now + FALLOUT.tickMs });
      this.broadcast({ t: 'fallout', pos: n.pos, radius: FALLOUT.radius, ms: FALLOUT.ms });
    }
  }

  // ---------- 클라이언트 입력 ----------
  onState(p, msg) {
    if (!this.isPlaying() && this.state !== 'countdown') return;
    if (!validVec(msg.p) || !finite(msg.y) || !finite(msg.pi)) return;
    if (!p.alive) return;
    const now = Date.now();
    if (this.state === 'playing' && !p.cat) {
      const moved = Math.hypot(msg.p[0] - p.pos[0], msg.p[2] - p.pos[2]);
      if (moved > 0.02) p.movedAt = now;
      const lim = this.map.bounds + 20;
      p.pos = [
        Math.max(-lim, Math.min(lim, msg.p[0])),
        Math.max(-60, Math.min(60, msg.p[1])),
        Math.max(-lim, Math.min(lim, msg.p[2])),
      ];
    }
    if (!p.cat) p.yaw = msg.y;
    p.pitch = Math.max(-1.6, Math.min(1.6, msg.pi));
    if (WEAPONS[msg.w]) p.weapon = msg.w;
    const em = !p.cat && (msg.e === 1 || msg.e === 2) ? msg.e : 0;
    if (em === 2 && p.emote !== 2 && now - p.lastSixSeven > 2000) {
      p.lastSixSeven = now;
      this.addAura(p, AURA.sixSeven, 'sixSeven');
    }
    p.emote = em;
    if (!p.cat) p.pushHistory(now);
    this.checkPickups(p, now);
  }

  checkPickups(p, now) {
    for (let i = 0; i < this.pickups.length; i++) {
      const pk = this.pickups[i];
      if (!pk.active) continue;
      if (Math.hypot(p.pos[0] - pk.pos[0], p.pos[1] + 0.9 - pk.pos[1], p.pos[2] - pk.pos[2]) > 1.9) continue;
      if (pk.kind === 'chicken' && p.hp >= MAX_HP) continue;
      pk.active = false;
      pk.respawnAt = now + this.t.pickupRespawnMs;
      if (pk.kind === 'chicken') p.hp = Math.min(MAX_HP, p.hp + CHICKEN_HEAL);
      else this.addAura(p, AURA.orb, 'orb');
      this.broadcast({ t: 'pickup', i, active: false, by: p.id, kind: pk.kind });
    }
  }

  onShoot(p, msg) {
    if (!this.isPlaying() || !p.alive || p.cat || this.disabled(p, Date.now())) return;
    const w = msg.w === LASER.id ? (p.ultraKind === 'minsu' ? LASER : null) : WEAPONS[msg.w];
    if (!w || !validVec(msg.o) || !Array.isArray(msg.dirs) || msg.dirs.length === 0 || msg.dirs.length > w.pellets) return;
    const now = Date.now();
    const sigma = p.ultraKind === 'sigma';
    const interval = w.interval * (sigma ? 0.6 : 1) * 0.75 * 1000; // 네트워크 흔들림 허용치
    if (now - (p.lastShot[w.id] ?? 0) < interval) return;
    p.lastShot[w.id] = now;

    const eye = [p.pos[0], p.pos[1] + PLAYER.eye, p.pos[2]];
    const o = Math.hypot(msg.o[0] - eye[0], msg.o[1] - eye[1], msg.o[2] - eye[2]) < 3 ? msg.o : eye;

    const when = now - p.rtt / 2 - INTERP_MS;
    const targets = this.others(p)
      .filter((t) => t.alive && now >= t.invulnUntil)
      .map((t) => ({ player: t, pos: t.rewound(when), total: 0, head: false, hits: 0 }));
    const ends = [];
    p.stats.shots++;

    for (const raw of msg.dirs) {
      if (!validVec(raw)) continue;
      const l = Math.hypot(raw[0], raw[1], raw[2]);
      if (l < 0.5) continue;
      const d = [raw[0] / l, raw[1] / l, raw[2] / l];
      let t = w.pierce ? w.range : rayWorld(this.map, o, d, w.range);
      let bestTarget = null, bestHit = null;
      for (const tg of targets) {
        const hit = rayPlayer(o, d, tg.pos, this.bigHead(), t);
        if (!hit) continue;
        if (w.pierce) {
          tg.hits++;
          tg.total += hit.head ? w.head : w.body;
          if (hit.head) tg.head = true;
        } else { t = hit.t; bestTarget = tg; bestHit = hit; }
      }
      ends.push([round(o[0] + d[0] * t), round(o[1] + d[1] * t), round(o[2] + d[2] * t)]);
      if (bestTarget) {
        bestTarget.hits++;
        bestTarget.total += bestHit.head ? w.head : w.body;
        if (bestHit.head) bestTarget.head = true;
      }
    }

    const shot = JSON.stringify({ t: 'shot', id: p.id, w: w.id, o: o.map(round), ends });
    for (const q of this.players) if (q !== p) q.sendRaw(shot);

    const struck = targets.filter((tg) => tg.hits > 0);
    if (struck.length) {
      p.stats.hitShots++;
      if (struck.some((tg) => tg.head)) p.stats.headshots++;
    }
    for (const tg of struck) {
      if (this.state !== 'playing') return;
      this.damage(tg.player, p, tg.total, { weapon: w.id, head: tg.head, pos: tg.pos });
    }
  }

  onSlap(p, msg) {
    if (!this.isPlaying() || !p.alive || p.cat || !validVec(msg.d)) return;
    const now = Date.now();
    if (this.disabled(p, now)) return;
    if (now - p.lastSlap < SLAP.cooldown * 1000 * 0.8) return;
    p.lastSlap = now;
    this.broadcast({ t: 'slapFx', id: p.id });

    // 얼굴에 붙은 고양이는 무조건 떨어진다
    const clinger = this.players.find((q) => q.cat?.latched && q.cat.target === p);
    if (clinger) {
      this.endUltra(clinger, true);
      this.knock(clinger, [(clinger.pos[0] - p.pos[0]) * 6, 9, (clinger.pos[2] - p.pos[2]) * 6]);
      this.damage(clinger, p, SLAP.damage, { weapon: 'slap', head: false, pos: clinger.pos });
      return;
    }

    const eye = [p.pos[0], p.pos[1] + PLAYER.eye, p.pos[2]];
    const l = Math.hypot(msg.d[0], msg.d[1], msg.d[2]) || 1;
    let best = null;
    for (const target of this.others(p)) {
      if (!target.alive || now < target.invulnUntil) continue;
      const tp = target.rewound(now - p.rtt / 2 - INTERP_MS);
      const to = [tp[0] - eye[0], tp[1] + 1 - eye[1], tp[2] - eye[2]];
      const dist = Math.hypot(to[0], to[1], to[2]);
      if (dist > SLAP.range) continue;
      const cos = dist < 0.01 ? 1 : (to[0] * msg.d[0] + to[1] * msg.d[1] + to[2] * msg.d[2]) / (dist * l);
      if (cos < 0.55) continue;
      const norm = [to[0] / (dist || 1), to[1] / (dist || 1), to[2] / (dist || 1)];
      if (rayWorld(this.map, eye, norm, dist) < dist - 0.01) continue;
      if (!best || dist < best.dist) best = { target, tp, norm, dist };
    }
    if (!best) return;
    this.knock(best.target, [best.norm[0] * SLAP.knock, 9, best.norm[2] * SLAP.knock]);
    this.damage(best.target, p, SLAP.damage, { weapon: 'slap', head: false, pos: best.tp });
  }

  onFell(p) {
    if (this.isPlaying() && p.alive && !p.cat && p.pos[1] < this.map.fallY + 8) {
      this.kill(p, this.creditFor(p), { weapon: 'fall', head: false });
    }
  }

  // ---------- 판정 결과 ----------
  knock(p, v) {
    if (p.ultraKind === 'sigma') return; // 시그마는 안 밀린다
    if (p.isBot) p.applyKnock(v);
    else p.send({ t: 'knock', v: v.map(round) });
  }

  damage(target, attacker, raw, info) {
    const now = Date.now();
    if (!target?.alive || now < target.invulnUntil) return;
    if (target.ultraKind === 'hero') return; // 날아가는 동안 무적
    if (target.ultraKind === 'chill') {
      // 너무 칠해서 안 맞고, 쏜 사람한테 되돌아간다
      if (attacker && attacker !== target && !info.env && attacker.ultraKind !== 'chill') {
        this.damage(attacker, target, raw * CHILL.reflect, { weapon: 'reflect', head: false, env: true, pos: attacker.pos });
      }
      return;
    }
    let dmg = raw;
    if (!info.env) {
      if (this.event?.kind === 'sixseven') dmg = 67;
      if (attacker?.ultraKind === 'sigma') dmg *= 1.67;
    }
    dmg = round(dmg);
    target.hp = round(target.hp - dmg);
    if (attacker) {
      if (info.weapon !== 'bomb') {
        attacker.stats.damage = round(attacker.stats.damage + dmg);
        target.lastHitBy = attacker;
        target.lastHitAt = now;
      }
      if (!info.env) this.addAura(attacker, info.head ? AURA.hitHead : AURA.hitBody, info.head ? 'head' : null);
    }
    if (target.emote === 1) this.addAura(target, AURA.farmInterrupted, 'farmHit');
    const dead = target.hp <= 0;
    this.broadcast({
      t: 'hit', to: target.id, from: attacker?.id ?? null, dmg, head: !!info.head, weapon: info.weapon,
      hp: Math.max(0, target.hp), pos: target.pos.map(round), dead,
    });
    if (dead) this.kill(target, attacker, info);
  }

  kill(victim, killer, info) {
    if (!victim.alive) return;
    const now = Date.now();
    if (victim.ultraKind) this.endUltra(victim, true);
    victim.alive = false;
    victim.hp = 0;
    victim.emote = 0;
    victim.respawnAt = now + this.t.respawnMs;
    victim.stats.deaths++;
    const self = info.weapon === 'fall';
    this.addAura(victim, self ? AURA.fell : AURA.death, self ? 'fall' : 'death');
    if (killer) {
      killer.kills++;
      killer.stats.streak++;
      if (killer.stats.streak > killer.stats.bestStreak) killer.stats.bestStreak = killer.stats.streak;
      if (!self && info.weapon !== 'bomb') this.addAura(killer, AURA.kill, 'kill');
      if (killer.ultraKind === 'sigma' && killer.alive) {
        killer.ultraUntil += SIGMA.killExtendMs;
        killer.hp = Math.min(MAX_HP, killer.hp + SIGMA.killHeal);
        this.broadcast({ t: 'ultraExt', id: killer.id, ms: killer.ultraUntil - now });
      }
    }
    victim.stats.streak = 0;
    this.broadcast({
      t: 'kill', victim: victim.id, killer: killer?.id ?? null, weapon: info.weapon, head: !!info.head,
      pos: victim.pos.map(round), killerKills: killer?.kills ?? 0, victimKills: victim.kills,
      respawnMs: this.t.respawnMs,
    });
    if (killer && killer.kills >= WIN_KILLS) this.endMatch(killer, 'kills');
  }

  respawn(p) {
    const avoid = this.others(p).filter((o) => o.alive).map((o) => o.pos);
    this.placeAtSpawn(p, avoid);
    this.broadcast({ t: 'spawn', id: p.id, pos: p.pos, yaw: p.yaw, invulnMs: this.t.invulnMs });
  }

  addAura(p, delta, reason) {
    const before = p.aura;
    p.aura = Math.max(0, Math.min(AURA_MAX, p.aura + delta));
    p.stats.auraEarned += Math.max(0, p.aura - before);
    if (reason) this.broadcast({ t: 'aura', id: p.id, delta: Math.round(delta), reason });
  }

  endByTime() {
    const ranked = [...this.players].sort((a, b) => b.kills - a.kills || b.aura - a.aura);
    const [a, b] = ranked;
    const tie = b && a.kills === b.kills && Math.round(a.aura) === Math.round(b.aura);
    this.endMatch(tie ? null : a, 'time');
  }

  endMatch(winner, reason) {
    if (this.state === 'results' || this.state === 'lobby') return;
    if (winner) winner.wins++;
    for (const p of this.players) if (p.ultraKind) this.endUltra(p, false);
    this.state = 'results';
    this.stateUntil = Date.now() + this.t.resultsMs;
    this.event = null;
    this.bombs = [];
    this.nukes = [];
    this.fallouts = [];
    const runnerUp = winner ? Math.max(0, ...this.others(winner).map((p) => p.kills)) : 0;
    const ranked = [...this.players].sort((a, b) => b.kills - a.kills || b.aura - a.aura);
    this.broadcast({
      t: 'matchEnd',
      winner: winner?.id ?? null,
      reason,
      sixSeven: !!(winner && winner.kills === 7 && runnerUp === 6),
      resultsMs: this.t.resultsMs,
      players: ranked.map((p) => ({
        id: p.id, name: p.name, skin: p.skin, kills: p.kills, wins: p.wins,
        aura: Math.round(p.aura), stats: p.stats,
      })),
    });
    this.sendRoom();
  }

  backToLobby() {
    this.state = 'lobby';
    this.played++;
    for (const p of this.players) p.ready = p.isBot;
    this.fillBots();
    this.armAutoStart();
    this.broadcast({ t: 'backToLobby' });
    this.sendRoom();
  }

  snapshot(now) {
    this.broadcast({
      t: 'snap',
      s: now,
      left: Math.max(0, this.matchEndsAt - now),
      players: this.players.map((p) => ({
        id: p.id, p: p.pos.map(round), y: round(p.yaw), pi: round(p.pitch),
        w: p.weapon, e: p.emote, hp: Math.max(0, Math.round(p.hp * 10) / 10), aura: Math.round(p.aura),
        k: p.kills, a: p.alive, u: !!p.ultraKind, inv: now < p.invulnUntil,
      })),
    });
  }
}

export const TICK_MS = 1000 / TICK_HZ;
