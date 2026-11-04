// 서버 연결 방식 3가지를 WebSocket처럼 쓰게 감싼다.
//  - 로컬 서버: 진짜 WebSocket
//  - GitHub Pages 방장: 이 브라우저 안에서 서버 코드를 돌림 + 친구는 WebRTC로 붙음
//  - GitHub Pages 손님: 초대 코드로 방장에게 WebRTC 연결
const PREFIX = 'aura6767-';
const SILENCE_MS = 10000; // 이만큼 아무 신호 없으면 끊긴 걸로 본다 (창을 그냥 닫으면 close가 늦게 온다)
const params = new URLSearchParams(location.search);

export const P2P = location.hostname.endsWith('github.io') || params.has('p2p');
export const inviteCode = params.get('room')?.toUpperCase().replace(/[^A-Z0-9]/g, '') || null;

let peerLib = null;
function loadPeer() {
  if (!peerLib) {
    peerLib = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = new URL('../vendor/peerjs/peerjs.min.js', import.meta.url).href;
      s.onload = () => resolve(window.peerjs?.Peer ?? window.Peer);
      s.onerror = () => reject(new Error('PeerJS 로드 실패'));
      document.head.append(s);
    });
  }
  return peerLib;
}

export function inviteUrl(code) {
  const u = new URL(location.href);
  u.search = '';
  u.hash = '';
  if (params.has('p2p')) u.searchParams.set('p2p', '1');
  u.searchParams.set('room', code);
  return u.href;
}

class Fake {
  constructor() { this.readyState = 0; this.onopen = this.onmessage = this.onclose = null; }
  opened() { this.readyState = 1; this.onopen?.(); }
  closed() {
    if (this.readyState === 3) return;
    this.readyState = 3;
    this.onclose?.();
  }
  deliver(data) { this.onmessage?.({ data }); }
}

// 탭이 뒤로 가도 느려지지 않는 타이머 (워커 안에서 돈다)
function workerTimer(ms, fn) {
  const src = `setInterval(() => postMessage(0), ${ms});`;
  const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
  w.onmessage = fn;
}

// 방장: 내 브라우저가 서버
class HostTransport extends Fake {
  constructor() {
    super();
    this.isHost = true;
    this.code = null;
    this.hub = null;
    this.peerFailed = false;
    this.start();
  }

  async start() {
    const { createHub } = await import('../../server/hub.js');
    const { TICK_MS } = await import('../../server/room.js');
    this.hub = createHub({ autoTick: false });
    workerTimer(TICK_MS, () => this.hub.tick());
    this.client = this.hub.connect((raw) => queueMicrotask(() => this.deliver(raw)));
    this.opened();
  }

  send(raw) { this.client?.message(raw); }

  // 첫 방을 만들 때 초대 코드를 받아 온다
  async openInvites(onError) {
    if (this.peer) return;
    try {
      const Peer = await loadPeer();
      this.tryRegister(Peer, onError, 0);
    } catch (e) {
      this.peerFailed = true;
      onError?.(e);
    }
  }

  tryRegister(Peer, onError, attempt) {
    const code = Array.from(crypto.getRandomValues(new Uint8Array(5)), (b) => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b % 32]).join('');
    const peer = new Peer(PREFIX + code);
    this.peer = peer;
    peer.on('open', () => { this.code = code; });
    peer.on('connection', (conn) => this.addGuest(conn));
    peer.on('disconnected', () => { if (!peer.destroyed) peer.reconnect(); }); // 새 손님을 받으려면 필요
    peer.on('error', (e) => {
      if (e.type === 'unavailable-id' && attempt < 5) {
        peer.destroy();
        this.tryRegister(Peer, onError, attempt + 1);
      } else if (!this.code) {
        this.peerFailed = true;
        onError?.(e);
      }
    });
  }

  addGuest(conn) {
    conn.on('open', () => {
      const c = this.hub.connect((raw) => { if (conn.open) conn.send(raw); });
      let lastData = Date.now();
      const bye = () => { clearInterval(watch); c.close(); };
      const watch = setInterval(() => { if (Date.now() - lastData > SILENCE_MS) { bye(); conn.close(); } }, 2000);
      conn.on('data', (d) => { lastData = Date.now(); c.message(d); });
      conn.on('close', bye);
      conn.on('error', bye);
    });
  }
}

// 손님: 방장에게 붙는다
class GuestTransport extends Fake {
  constructor(code) {
    super();
    this.isGuest = true;
    this.code = code;
    this.start();
  }

  async start() {
    const timeout = setTimeout(() => this.closed(), 15000);
    try {
      const Peer = await loadPeer();
      this.peer = new Peer();
      this.peer.on('error', () => this.closed());
      this.peer.on('open', () => {
        const conn = this.peer.connect(PREFIX + this.code, { serialization: 'raw', reliable: true });
        this.conn = conn;
        let lastData = Date.now();
        conn.on('open', () => {
          clearTimeout(timeout);
          lastData = Date.now();
          const watch = setInterval(() => {
            if (this.readyState === 3) clearInterval(watch);
            else if (Date.now() - lastData > SILENCE_MS) this.closed();
          }, 2000);
          this.opened();
        });
        conn.on('data', (d) => { lastData = Date.now(); this.deliver(d); });
        conn.on('close', () => this.closed());
        conn.on('error', () => this.closed());
      });
    } catch {
      this.closed();
    }
  }

  send(raw) { if (this.conn?.open) this.conn.send(raw); }
}

export function openTransport() {
  if (!P2P) {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    return new WebSocket(`${proto}://${location.host}/ws`);
  }
  return inviteCode ? new GuestTransport(inviteCode) : new HostTransport();
}
