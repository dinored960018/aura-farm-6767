// 서버 연결 방식 3가지를 WebSocket처럼 쓰게 감싼다.
//  - 로컬 서버: 진짜 WebSocket
//  - GitHub Pages 방장: 이 브라우저 안에서 서버 코드를 돌림 + 친구는 WebRTC로 붙음
//  - GitHub Pages 손님: 초대 코드로 방장에게 WebRTC 연결
const PREFIX = 'aura6767-';
const SILENCE_MS = 10000; // 이만큼 아무 신호 없으면 끊긴 걸로 본다 (창을 그냥 닫으면 close가 늦게 온다)
const params = new URLSearchParams(location.search);

export const P2P = location.hostname.endsWith('github.io') || params.has('p2p') || window.AURA_PORTAL === 'crazygames';
let requested = params.get('room')?.toUpperCase().replace(/[^A-Z0-9]/g, '') || null;
// 방장이 자기 방 주소에서 새로고침한 경우: 손님이 아니라 다시 방장으로 시작
try {
  if (P2P && requested && sessionStorage.getItem('aura-host-code') === requested) requested = null;
} catch { /* 저장 안 되는 브라우저 */ }
export let inviteCode = requested;

// 크레이지게임즈 초대는 주소가 아니라 SDK로 코드가 온다. 연결 전에 부른다
export function setInviteCode(code) {
  const c = String(code ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '') || null;
  let mine = null;
  try { mine = sessionStorage.getItem('aura-host-code'); } catch { /* 무시 */ }
  inviteCode = c && c !== mine ? c : null;
}

// 공개 매칭: 서버 없이 정해 둔 방 번호를 돌아가며 두드린다.
// 개인 초대 코드에는 0과 1이 안 들어가므로 PUB01~PUB16과 겹치지 않는다
const PUB_SLOTS = Array.from({ length: 16 }, (_, i) => `PUB${String(i + 1).padStart(2, '0')}`);
let found = null; // 들어갈 공개 방 { peer, conn, first, code }
let freeSlots = null; // 방장이 될 때 차지할 빈 번호. null이면 비공개 방
export const isPublicHost = () => Array.isArray(freeSlots);

// 빈 번호는 PeerJS 서버가 5초 뒤에야 알려 주므로 기다리지 않는다.
// 정해진 시간 안에 응답한 방만 "주인 있음"으로 보고, 나머지는 방장이 될 때 차례로 차지를 시도한다
// (이미 주인이 있는 번호는 서버가 즉시 거절한다)
export async function matchmake(probeMs = 2500) {
  let Peer;
  try { Peer = await loadPeer(); } catch { return false; }
  const peer = new Peer();
  const ok = await new Promise((res) => {
    const to = setTimeout(() => res(false), 5000);
    peer.on('open', () => { clearTimeout(to); res(true); });
    peer.on('error', () => { clearTimeout(to); res(false); });
  });
  const order = [...PUB_SLOTS].sort(() => Math.random() - 0.5);
  if (!ok) { peer.destroy(); freeSlots = order; return false; }
  return new Promise((resolve) => {
    const settled = new Set();
    const owned = new Set();
    const conns = new Map();
    let done = false;
    const finish = (hit) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      for (const [id, c] of conns) if (id !== hit?.code) { try { c.close(); } catch { /* 무시 */ } }
      if (hit) found = { peer, ...hit };
      else { peer.destroy(); freeSlots = order.filter((c) => !owned.has(c)); }
      resolve(!!hit);
    };
    const settle = (code) => {
      if (settled.has(code)) return;
      settled.add(code);
      if (settled.size === order.length) finish(null);
    };
    peer.on('error', (e) => {
      const code = String(e?.message ?? '').match(/PUB\d\d/)?.[0];
      if (code && e.type === 'peer-unavailable') settle(code);
    });
    for (const code of order) {
      const conn = peer.connect(PREFIX + code, { serialization: 'raw', reliable: true });
      conns.set(code, conn);
      conn.on('data', (d) => {
        if (done || settled.has(code)) return;
        let m = null;
        try { m = JSON.parse(d); } catch { /* 무시 */ }
        if (m?.t !== 'welcome') return;
        owned.add(code);
        if (m.rooms?.[0]?.open) finish({ conn, first: d, code });
        else settle(code);
      });
    }
    const timer = setTimeout(() => finish(null), probeMs);
  });
}

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
  // 포털의 보안 정책이 워커를 막으면 일반 타이머로 돌린다
  const fallback = () => setInterval(fn, ms);
  try {
    const src = `setInterval(() => postMessage(0), ${ms});`;
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    w.onmessage = fn;
    w.onerror = fallback;
  } catch { fallback(); }
}

// 방장: 내 브라우저가 서버
class HostTransport extends Fake {
  constructor() {
    super();
    this.isHost = true;
    this.code = null;
    this.hub = null;
    this.peerFailed = false;
    this.publicId = null;
    this.start();
  }

  async start() {
    const { createHub } = await import('../server/hub.js');
    const { TICK_MS } = await import('../server/room.js');
    // 내 브라우저가 서버이므로 욕설 목록도 여기서 받는다. 실패하면 기본 목록만 쓴다
    fetch(new URL('../badwords.txt', import.meta.url))
      .then((r) => (r.ok ? r.text() : ''))
      .then(async (txt) => { (await import('../shared/filter.js')).addWords(txt.split('\n')); })
      .catch(() => {});
    this.hub = createHub({ autoTick: false });
    workerTimer(TICK_MS, () => this.hub.tick());
    this.client = this.hub.connect((raw) => queueMicrotask(() => this.deliver(raw)));
    this.opened();
  }

  send(raw) { this.client?.message(raw); }

  // 첫 방을 만들 때 초대 코드를 받아 온다
  async openInvites(onError) {
    if (this.inviting) return;
    this.inviting = true;
    this.assignCode();
    try {
      const Peer = await loadPeer();
      this.tryRegister(Peer, onError, 0);
      if (freeSlots?.length) this.claimPublic(Peer, [...freeSlots]);
    } catch (e) {
      this.peerFailed = true;
      this.code = null;
      this.onCode?.();
      onError?.(e);
    }
  }

  assignCode() {
    this.code = Array.from(crypto.getRandomValues(new Uint8Array(5)), (b) => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b % 32]).join('');
    try { sessionStorage.setItem('aura-host-code', this.code); } catch { /* 무시 */ }
    this.onCode?.();
  }

  tryRegister(Peer, onError, attempt) {
    const peer = new Peer(PREFIX + this.code);
    this.peer = peer;
    peer.on('open', () => { this.registered = true; this.onCode?.(); });
    peer.on('connection', (conn) => this.addGuest(conn));
    peer.on('disconnected', () => { if (!peer.destroyed) peer.reconnect(); }); // 새 손님을 받으려면 필요
    peer.on('error', (e) => {
      if (e.type === 'unavailable-id' && attempt < 5) {
        peer.destroy();
        this.assignCode();
        this.tryRegister(Peer, onError, attempt + 1);
      } else if (!this.registered) {
        this.peerFailed = true;
        this.code = null;
        this.onCode?.();
        onError?.(e);
      }
    });
  }

  // 공개 방 번호를 하나 차지한다. 동시에 같은 번호를 잡으면 다음 번호로
  claimPublic(Peer, left) {
    const code = left.shift();
    if (!code) return;
    const peer = new Peer(PREFIX + code);
    this.pubPeer = peer;
    peer.on('open', () => { this.publicId = code; });
    peer.on('connection', (conn) => this.addGuest(conn));
    peer.on('disconnected', () => { if (!peer.destroyed) peer.reconnect(); });
    peer.on('error', (e) => {
      if (e.type === 'unavailable-id') { peer.destroy(); this.claimPublic(Peer, left); }
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
    if (found) { this.adopt(found); found = null; return; }
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

  // 매칭하며 이미 열어 둔 연결을 그대로 쓴다. 첫 메시지(방 정보)는 다시 전달
  adopt({ peer, conn, first }) {
    this.peer = peer;
    this.conn = conn;
    this.isPublic = true;
    let lastData = Date.now();
    peer.on('error', () => {});
    conn.on('data', (d) => { lastData = Date.now(); this.deliver(d); });
    conn.on('close', () => this.closed());
    conn.on('error', () => this.closed());
    const watch = setInterval(() => {
      if (this.readyState === 3) clearInterval(watch);
      else if (Date.now() - lastData > SILENCE_MS) this.closed();
    }, 2000);
    queueMicrotask(() => {
      this.opened();
      this.deliver(first);
    });
  }

  send(raw) { if (this.conn?.open) this.conn.send(raw); }
}

export function openTransport() {
  if (!P2P) {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    return new WebSocket(`${proto}://${location.host}/ws`);
  }
  if (found) return new GuestTransport(found.code);
  return inviteCode ? new GuestTransport(inviteCode) : new HostTransport();
}
