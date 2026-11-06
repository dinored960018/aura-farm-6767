// HTTP 정적 파일 + WebSocket. 테스트에서 포트·시간을 바꿔 띄울 수 있게 함수로 뺐다.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { createHub } from './hub.js';
import { addWords } from '../shared/filter.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MOUNTS = [
  ['/vendor/three/', path.join(ROOT, 'node_modules/three/build')],
  ['/vendor/three-addons/', path.join(ROOT, 'node_modules/three/examples/jsm')],
  ['/vendor/peerjs/', path.join(ROOT, 'node_modules/peerjs/dist')],
  ['/shared/', path.join(ROOT, 'shared')],
  ['/server/', path.join(ROOT, 'server')],
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

export function startServer({ port = 6767, host = '0.0.0.0', timings = {} } = {}) {
  const server = http.createServer(serveStatic);
  const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 16 * 1024 });
  try { addWords(fs.readFileSync(path.join(ROOT, 'public/badwords.txt'), 'utf8').split('\n')); } catch { /* 기본 목록만 쓴다 */ }
  const hub = createHub({ timings });
  const sockets = new Set();

  wss.on('connection', (ws) => {
    sockets.add(ws);
    const client = hub.connect((raw) => { if (ws.readyState === 1) ws.send(raw); });
    ws.on('message', (data) => client.message(data));
    const gone = () => { sockets.delete(ws); client.close(); };
    ws.on('close', gone);
    ws.on('error', gone);
  });

  return new Promise((resolve) => {
    server.listen(port, host, () => {
      resolve({
        port: server.address().port,
        rooms: hub.rooms,
        close() {
          hub.stop();
          for (const ws of sockets) ws.terminate();
          wss.close();
          return new Promise((done) => server.close(done));
        },
      });
    });
  });
}
