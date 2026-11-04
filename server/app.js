// HTTP 정적 파일 + WebSocket 허브. 테스트에서 포트·시간을 바꿔 띄울 수 있게 함수로 뺐다.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { Room, TICK_MS } from './room.js';
import { Player } from './player.js';
import { SKIN_IDS, TICK_HZ } from '../shared/constants.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MOUNTS = [
  ['/vendor/three/', path.join(ROOT, 'node_modules/three/build')],
  ['/shared/', path.join(ROOT, 'shared')],
  ['/', path.join(ROOT, 'public')],
];
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
};

function serveStatic(req, res) {
  let url;
  try { url = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (url === '/') url = '/index.html';
  for (const [prefix, dir] of MOUNTS) {
    if (!url.startsWith(prefix)) continue;
    const file = path.resolve(dir, '.' + url.slice(prefix.length - 1));
    if (file !== dir && !file.startsWith(dir + path.sep)) break;
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404).end('없음'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
      res.end(data);
    });
    return;
  }
  res.writeHead(404).end('없음');
}

class HumanPlayer extends Player {
  constructor(id, name, skin, ws) {
    super(id, name, skin);
    this.ws = ws;
  }
  send(msg) { this.sendRaw(JSON.stringify(msg)); }
  sendRaw(raw) { if (this.ws.readyState === 1) this.ws.send(raw); }
}

function cleanName(v, fallback, max = 12) {
  const s = String(v ?? '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, max);
  return s || fallback;
}

export function startServer({ port = 6767, host = '0.0.0.0', timings = {} } = {}) {
  const server = http.createServer(serveStatic);
  const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 16 * 1024 });
  const rooms = new Map();
  const clients = new Set();
  let ids = 0, roomIds = 0;

  const hub = {
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

  wss.on('connection', (ws) => {
    const p = new HumanPlayer(hub.nextId(), '익명의 NPC', 'minsu', ws);
    clients.add(p);
    p.send({ t: 'welcome', id: p.id, rooms: [...rooms.values()].map((r) => r.summary()), tickHz: TICK_HZ });

    ws.on('message', (data) => {
      let m;
      try { m = JSON.parse(data.toString()); } catch { return; }
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
          break;
        case 'create':
          if (!r) createRoom(cleanName(m.name, `${p.name}의 방`, 20)).add(p);
          break;
        case 'join':
          if (!r) {
            const room = rooms.get(String(m.id));
            if (!room || !room.add(p)) p.send({ t: 'error', text: '그 방은 못 들어감. 꽉 찼거나 게임 중임.' });
          }
          break;
        case 'leave':
          if (r) { r.remove(p); p.send({ t: 'left' }); hub.roomsChanged(); }
          break;
        case 'ready': r?.setReady(p, m.ready); break;
        case 'skin':
          if (r) r.setSkin(p, m.skin);
          else if (SKIN_IDS.includes(m.skin)) p.skin = m.skin;
          break;
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
    });

    const gone = () => {
      if (!clients.delete(p)) return;
      p.room?.remove(p);
      hub.roomsChanged();
    };
    ws.on('close', gone);
    ws.on('error', gone);
  });

  let last = Date.now();
  const loop = setInterval(() => {
    const now = Date.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    for (const room of rooms.values()) {
      try { room.tick(now, dt); } catch (e) { console.error('방 처리 오류', room.id, e); }
    }
  }, TICK_MS);

  return new Promise((resolve) => {
    server.listen(port, host, () => {
      resolve({
        port: server.address().port,
        rooms,
        close() {
          clearInterval(loop);
          for (const c of clients) c.ws.terminate();
          wss.close();
          return new Promise((done) => server.close(done));
        },
      });
    });
  });
}
