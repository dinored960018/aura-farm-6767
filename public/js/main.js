// 접속, 방 목록, 대기실, 결과 화면. 경기가 끝나면 항상 대기실로 돌아온다.
import { SKIN_IDS, WIN_KILLS, MAX_PLAYERS, ULTRAS } from '../shared/constants.js';
import { MAPS, MAP_IDS } from '../shared/map.js';
import { Sfx } from './audio.js';
import { Hud } from './hud.js';
import { Game } from './game.js';
import { P2P, inviteCode, inviteUrl, openTransport } from './transport.js';
import { lines, pick } from './memes.js';
import { makePortraits, faceEl } from './portraits.js';
import { t, getLang, setLang, applyStatic } from './i18n.js';

const $ = (id) => document.getElementById(id);
const screens = { home: $('home'), room: $('room'), result: $('result') };

function showScreen(name) {
  for (const [k, el] of Object.entries(screens)) el.hidden = k !== name;
}

const sfx = new Sfx();
const hud = new Hud();
const game = new Game($('view'), sfx, hud);

// ---------- 네트워크 ----------
const net = {
  ws: null, id: null, offset: 0, rtt: 0, handlers: {},
  send(m) { if (this.ws?.readyState === 1) this.ws.send(JSON.stringify(m)); },
  serverNow() { return Date.now() + this.offset; },
};
game.net = net;

let room = null;
let lastRooms = [];
let inMatch = false;
let myReady = false;
let reconnectTimer = 0;
let pingTimer = 0;

function connect() {
  const ws = openTransport();
  net.ws = ws;
  ws.onopen = () => {
    $('connStatus').textContent = t(ws.isHost ? 'conn.host' : ws.isGuest ? 'conn.guest' : 'conn.server');
    $('connStatus').classList.add('ok');
    sendHello();
    clearInterval(pingTimer);
    pingTimer = setInterval(() => net.send({ t: 'ping', c: Date.now(), rtt: net.rtt }), 1000);
    net.send({ t: 'ping', c: Date.now(), rtt: 0 });
  };
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    net.handlers[m.t]?.(m);
  };
  ws.onclose = () => {
    clearInterval(pingTimer);
    if (ws.isGuest) {
      // 방장이 나갔거나 코드가 틀림: 첫 화면으로
      leaveToHome(t(joined ? 'conn.hostLeft' : 'conn.badCode'));
      return;
    }
    $('connStatus').textContent = t('conn.lost');
    $('connStatus').classList.remove('ok');
    if (inMatch) leaveMatchView();
    room = null;
    syncAddress();
    hud.show(false);
    game.setAttract([]);
    showScreen('home');
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connect, 1500);
  };
}

function sendHello() {
  net.send({ t: 'hello', name: $('nameInput').value.trim() || t('home.nickPh'), skin: currentSkin });
}

const H = net.handlers;
let joined = false;
let invitedToast = false;

// 방에 있는 동안 주소창 링크가 곧 초대 링크다
function syncAddress() {
  const { ws } = net;
  if (ws?.isGuest) return; // 손님 주소에는 이미 코드가 있다
  const code = !room ? null : P2P ? ws?.code : room.id;
  const u = new URL(location.href);
  if ((u.searchParams.get('room') ?? null) === (code ?? null)) return;
  if (code) u.searchParams.set('room', code);
  else u.searchParams.delete('room');
  history.replaceState(null, '', u.href);
  if (code && !invitedToast && !invitedByLink) {
    invitedToast = true;
    toast(t('toast.addressInvite'));
  }
}
let invitedByLink = false;
function leaveToHome(text) {
  toast(text);
  $('connStatus').textContent = text;
  setTimeout(() => {
    const u = new URL(location.href);
    u.searchParams.delete('room');
    location.href = u.href;
  }, 2500);
}
H.welcome = (m) => {
  net.id = m.id;
  renderRooms(m.rooms);
  // 로컬 서버: 주소의 방 번호로 바로 입장
  if (!P2P && inviteCode && !joined) {
    joined = true;
    invitedByLink = true;
    sendHello();
    net.send({ t: 'join', id: inviteCode });
  }
  // 방장이 새로고침한 경우 주소의 옛 코드를 지운다
  if (P2P && net.ws.isHost) syncAddress();
  // 초대 링크로 왔으면 바로 입장
  if (net.ws.isGuest && !joined) {
    if (!m.rooms.length) { toast(t('toast.noRoom')); return; }
    joined = true;
    sendHello();
    net.send({ t: 'join', id: m.rooms[0].id });
  }
};
H.pong = (m) => {
  const now = Date.now();
  net.rtt = now - m.c;
  net.offset = m.s - (m.c + net.rtt / 2);
  $('ping').textContent = `${net.rtt}ms`;
};
H.rooms = (m) => renderRooms(m.rooms);
H.sys = (m) => addChat(t('system'), t(m.key, m.mapId
  ? { ...m.vars, map: t(m.mapId === 'random' ? 'room.random' : `map.${m.mapId}`) }
  : m.vars));
H.error = (m) => {
  toast(t(m.key));
  syncAddress();
};
H.left = () => {
  room = null;
  syncAddress();
  showScreen('home');
  game.setAttract([]);
  sfx.playMusic('lobby');
};
H.room = (m) => {
  const wasIn = !!room;
  room = m.room;
  syncAddress();
  for (const p of room.players) hud.names.set(p.id, p.name);
  if (inMatch) game.onRoster(room.players);
  if (!inMatch) {
    if (!screens.result.hidden) return; // 결과 화면 끝날 때 다시 그림
    showScreen('room');
    renderRoom();
    game.setAttract(room.players, room.mapId);
    if (!wasIn) { sfx.unlock(); sfx.playMusic('lobby'); }
  }
};
H.chat = (m) => addChat(m.from, m.text);
H.matchStart = (m) => {
  inMatch = true;
  sfx.unlock();
  for (const p of m.players) hud.names.set(p.id, p.name);
  showScreen(null);
  game.onMatchStart(m, net.id);
  startTicker();
};
H.go = () => game.onGo();
H.snap = (m) => { if (inMatch) game.onSnap(m); };
H.shot = (m) => inMatch && game.onShot(m);
H.slapFx = (m) => inMatch && game.onSlapFx(m);
H.hit = (m) => inMatch && game.onHit(m);
H.kill = (m) => inMatch && game.onKill(m);
H.spawn = (m) => inMatch && game.onSpawn(m);
H.aura = (m) => inMatch && game.onAura(m);
H.ultra = (m) => inMatch && game.onUltra(m);
H.event = (m) => inMatch && game.onEvent(m);
H.bomb = (m) => inMatch && game.onBomb(m);
H.boom = (m) => inMatch && game.onBoom(m);
H.pickup = (m) => inMatch && game.onPickup(m);
H.knock = (m) => inMatch && game.onKnock(m);
H.teleport = (m) => inMatch && game.onTeleport(m);
H.cat = (m) => inMatch && game.onCat(m);
H.wave = (m) => inMatch && game.onWave(m);
H.fallout = (m) => inMatch && game.onFallout(m);
H.geyser = (m) => inMatch && game.onGeyser(m);
H.punch = (m) => inMatch && game.onPunch(m);
H.ultraExt = (m) => inMatch && game.onUltraExt(m);
H.charm = (m) => inMatch && game.onCharm(m);
H.bark = (m) => inMatch && game.onBark(m);
H.slow = (m) => inMatch && game.onSlow(m);
H.nuke = (m) => inMatch && game.onNuke(m);
H.nukeBoom = (m) => inMatch && game.onNukeBoom(m);
H.matchEnd = (m) => {
  leaveMatchView();
  showResult(m);
};
H.backToLobby = () => {
  clearInterval(resultTimer);
  showScreen('room');
  myReady = false;
  renderRoom();
  game.setAttract(room?.players ?? [], room?.mapId);
  sfx.playMusic('lobby');
  addChat(t('system'), t('sys.again'));
};

function leaveMatchView() {
  inMatch = false;
  game.onMatchEnd();
  hud.show(false);
  stopTicker();
  game.setAttract(room?.players ?? [], room?.mapId);
}

// ---------- 홈 ----------
let currentSkin = 'minsu';
try {
  const saved = localStorage.getItem('aura-name');
  if (saved) $('nameInput').value = saved;
  const sk = localStorage.getItem('aura-skin');
  if (SKIN_IDS.includes(sk)) currentSkin = sk;
} catch { /* 저장 안 되는 브라우저 */ }

$('nameInput').addEventListener('change', () => {
  try { localStorage.setItem('aura-name', $('nameInput').value); } catch { /* 무시 */ }
  sendHello();
});

function firstGesture() { sfx.unlock(); sfx.playMusic('lobby'); }
window.addEventListener('pointerdown', firstGesture, { once: true });
window.addEventListener('keydown', firstGesture, { once: true });

$('createBtn').onclick = () => {
  sfx.unlock();
  sendHello();
  if (net.ws.isHost) net.ws.onCode = syncAddress;
  net.ws.openInvites?.(() => toast(t('toast.inviteFail')));
  net.send({
    t: 'create',
    name: $('roomNameInput').value.trim() || t('roomDefault', { name: $('nameInput').value.trim() || t('home.nickPh') }),
  });
  sfx.boing();
};

function renderRooms(rooms) {
  lastRooms = rooms;
  const box = $('roomList');
  box.replaceChildren();
  if (!rooms.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = t('home.empty');
    box.append(p);
    return;
  }
  for (const r of rooms) {
    const b = document.createElement('button');
    b.className = 'roomRow';
    const name = document.createElement('span');
    name.textContent = r.name;
    const st = document.createElement('em');
    const full = r.count >= MAX_PLAYERS || r.state !== 'lobby';
    const mapLabel = r.map === 'random' ? `🎲 ${t('room.random')}` : `${MAPS[r.map]?.emoji ?? ''} ${t(`map.${r.map}`)}`;
    st.textContent = r.state !== 'lobby' ? t('room.fighting') : `${mapLabel} · ${r.count}/${MAX_PLAYERS}`;
    b.append(name, st);
    b.disabled = full;
    b.onclick = () => {
      sfx.unlock();
      sendHello();
      net.send({ t: 'join', id: r.id });
    };
    box.append(b);
  }
}

// ---------- 대기실 ----------
function renderSkins(box) {
  box.replaceChildren();
  for (const id of SKIN_IDS) {
    const b = document.createElement('button');
    b.className = `skinBtn${id === currentSkin ? ' on' : ''}`;
    b.title = t(`skin.${id}`);
    const f = faceEl(id);
    const n = document.createElement('span');
    n.textContent = t(`skin.${id}`);
    b.append(f, n);
    b.onclick = () => {
      currentSkin = id;
      try { localStorage.setItem('aura-skin', id); } catch { /* 무시 */ }
      net.send({ t: 'skin', skin: id });
      sfx.quack();
      renderSkins(box);
      showSkinDesc();
    };
    box.append(b);
  }
}

function renderMaps(box) {
  box.replaceChildren();
  for (const id of [...MAP_IDS, 'random']) {
    const def = MAPS[id];
    const b = document.createElement('button');
    b.className = `mapBtn${room.mapChoice === id ? ' on' : ''}`;
    b.title = t(def ? `mapDesc.${id}` : 'room.randomDesc');
    const f = document.createElement('i');
    f.textContent = def?.emoji ?? '🎲';
    const n = document.createElement('span');
    n.textContent = t(def ? `map.${id}` : 'room.random');
    b.append(f, n);
    b.disabled = room.state !== 'lobby';
    b.onclick = () => {
      net.send({ t: 'map', id });
      sfx.click();
    };
    box.append(b);
  }
}

function renderRoom() {
  if (!room) return;
  $('roomTitle').textContent = room.name || t('room.title');
  const box = $('slots');
  box.replaceChildren();
  for (let i = 0; i < MAX_PLAYERS; i++) {
    const p = room.players[i];
    const card = document.createElement('div');
    card.className = `slot${p ? '' : ' open'}${p?.ready ? ' ready' : ''}${p?.id === net.id ? ' me' : ''}`;
    if (p) {
      const face = document.createElement('div');
      face.className = 'face';
      face.append(faceEl(p.skin));
      const info = document.createElement('div');
      const nm = document.createElement('strong');
      nm.textContent = p.name + (p.id === net.id ? t('room.me') : '') + (p.isBot ? ' 🤖' : '');
      const sub = document.createElement('small');
      sub.textContent = `${t('room.wins', { n: p.wins })} · ${t(p.ready ? 'room.isReady' : 'room.notReady')}`;
      info.append(nm, sub);
      card.append(face, info);
    } else {
      const face = document.createElement('div');
      face.className = 'face';
      face.textContent = '❓';
      const info = document.createElement('div');
      const nm = document.createElement('strong');
      nm.textContent = t('room.empty');
      const sub = document.createElement('small');
      sub.textContent = t('room.emptySub');
      info.append(nm, sub);
      card.append(face, info);
    }
    box.append(card);
  }
  const me = room.players.find((p) => p.id === net.id);
  myReady = !!me?.ready;
  if (me && document.activeElement !== $('renameInput')) $('renameInput').value = me.name;
  const rb = $('readyBtn');
  rb.textContent = t(myReady ? 'room.unready' : room.players.length < 2 ? 'room.waiting' : 'room.ready');
  rb.classList.toggle('on', myReady);
  rb.disabled = room.state !== 'lobby';
  $('botBtn').disabled = room.state !== 'lobby' || room.players.length >= MAX_PLAYERS;
  $('botOutBtn').disabled = room.state !== 'lobby' || !room.players.some((p) => p.isBot);
  renderMaps($('mapPick'));
  renderSkins($('skinPick'));
  showSkinDesc();
}

function showSkinDesc() {
  const u = ULTRAS[currentSkin];
  const descBox = $('skinDesc');
  descBox.replaceChildren();
  if (u) {
    const head = document.createElement('b');
    head.textContent = t(`ultra.${currentSkin}`);
    const body = document.createElement('span');
    body.textContent = t(`ultraDesc.${currentSkin}`);
    descBox.append(faceEl(currentSkin, 'descFace'), head, body);
  }
}

$('readyBtn').onclick = () => {
  sfx.unlock();
  net.send({ t: 'ready', ready: !myReady });
  sfx.bing();
};
$('botBtn').onclick = () => {
  net.send({ t: 'addBot' });
  sfx.bark();
};
$('botOutBtn').onclick = () => net.send({ t: 'removeBot' });
$('leaveBtn').onclick = () => net.send({ t: 'leave' });
$('copyBtn').onclick = async () => {
  const { ws } = net;
  if (P2P && !ws.registered && !ws.isGuest) {
    toast(t(ws.peerFailed ? 'toast.inviteFail' : 'toast.inviteWait'));
    return;
  }
  const url = location.href.split('#')[0];
  try {
    await navigator.clipboard.writeText(url);
    toast(P2P ? t('toast.copied', { code: ws.code }) : t('toast.copiedPlain'));
  } catch { toast(url); }
};

$('renameForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('renameInput').value.trim();
  $('renameInput').blur();
  if (!name) { renderRoom(); return; }
  $('nameInput').value = name;
  try { localStorage.setItem('aura-name', name); } catch { /* 무시 */ }
  net.send({ t: 'rename', name });
  sfx.quack();
});

$('chatForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = $('chatInput').value.trim();
  if (!v) return;
  net.send({ t: 'chat', text: v });
  $('chatInput').value = '';
});

function addChat(from, text) {
  const log = $('chatLog');
  const row = document.createElement('div');
  const b = document.createElement('b');
  b.textContent = `${from}: `;
  row.append(b, document.createTextNode(text));
  log.append(row);
  while (log.children.length > 60) log.firstChild.remove();
  log.scrollTop = log.scrollHeight;
}

// ---------- 결과 ----------
let resultTimer = 0;
function showResult(m) {
  showScreen('result');
  const won = m.winner === net.id;
  const draw = m.winner === null;
  const box = $('result');
  box.dataset.outcome = draw ? 'draw' : won ? 'win' : 'lose';
  const reason = { kills: t('reason.kills', { n: WIN_KILLS }), time: t('reason.time'), ragequit: t('reason.ragequit') }[m.reason] ?? '';
  $('resultTitle').textContent = draw ? t('result.draw') : pick(lines(won ? 'win' : 'lose'));
  $('resultSub').textContent = `${t(won ? 'result.win' : draw ? 'result.drawSub' : 'result.lose')} · ${reason}`;
  $('sixSevenBanner').hidden = !m.sixSeven;

  const table = $('resultStats');
  table.replaceChildren();
  for (const p of m.players) {
    const s = p.stats;
    const acc = s.shots ? Math.round((s.hitShots / s.shots) * 100) : 0;
    const col = document.createElement('div');
    col.className = `statCol${p.id === m.winner ? ' winner' : ''}`;
    const head = document.createElement('h3');
    head.append(faceEl(p.skin, 'statFace'), document.createTextNode(p.name));
    col.append(head);
    const rows = [
      [t('stat.kills'), p.kills], [t('stat.deaths'), s.deaths], [t('stat.acc'), `${acc}%`], [t('stat.heads'), s.headshots],
      [t('stat.damage'), Math.round(s.damage)], [t('stat.aura'), Math.round(s.auraEarned).toLocaleString()],
      [t('stat.wins'), t('room.wins', { n: p.wins })],
    ];
    for (const [k, v] of rows) {
      const r = document.createElement('p');
      const a = document.createElement('span');
      a.textContent = k;
      const b = document.createElement('b');
      b.textContent = v;
      r.append(a, b);
      col.append(r);
    }
    table.append(col);
  }

  // 대기실 복귀 카운트다운
  const end = Date.now() + m.resultsMs;
  const tick = () => {
    $('resultCountdown').textContent = t('result.back', { s: Math.max(0, (end - Date.now()) / 1000).toFixed(1) });
  };
  tick();
  clearInterval(resultTimer);
  resultTimer = setInterval(tick, 100);

  // 결과 연출
  hud.show(true);
  document.getElementById('hudGameLayer').hidden = true;
  hud.rain(won ? ['🗿', '67', '👑', '✨', '👁️'] : ['😭', 'L', '💀', '🤡'], 70);
  setTimeout(() => {
    if (!inMatch) { hud.show(false); document.getElementById('hudGameLayer').hidden = false; }
  }, 3200);
  if (m.sixSeven) {
    sfx.vineBoom();
    sfx.say('six seven! six seven!', { pitch: 0.2, rate: 0.75 });
  } else if (won) {
    sfx.airhorn();
    sfx.say(pick(['sigma', 'G G easy', 'skill issue']), { pitch: 0.3 });
  } else if (!draw) {
    sfx.sadTrombone();
    sfx.say(pick(['bruh', 'you are the N P C', 'skill issue']), { pitch: 0.3, lang: 'en-US' });
  }
}

// ---------- 잡것 ----------
let tickerTimer = 0;
function startTicker() {
  const el = $('ticker');
  const next = () => { el.textContent = `🚨 ${pick(lines('ticker'))}`; };
  next();
  clearInterval(tickerTimer);
  tickerTimer = setInterval(next, 6700);
}
function stopTicker() { clearInterval(tickerTimer); }

let toastTimer = 0;
function toast(text) {
  const el = $('toast');
  el.textContent = text;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2500);
}

// 음량
const vol = $('volume');
try {
  const v = Number(localStorage.getItem('aura-vol'));
  if (v > 0 && v <= 1) vol.value = v;
} catch { /* 무시 */ }
sfx.setVolume(Number(vol.value));
vol.addEventListener('input', () => {
  sfx.setVolume(Number(vol.value));
  try { localStorage.setItem('aura-vol', vol.value); } catch { /* 무시 */ }
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyM' && e.target.tagName !== 'INPUT') {
    const m = sfx.toggleMute();
    toast(t(m ? 'toast.muted' : 'toast.unmuted'));
  }
});

// GitHub Pages: 코드로 참가
if (P2P) {
  $('joinRow').hidden = false;
  $('joinRow').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = $('joinInput').value.trim().toUpperCase();
    if (code) location.href = inviteUrl(code);
  });
}

// 언어 선택 (첫 화면). 기본은 영어
function applyLanguage() {
  applyStatic();
  for (const b of document.querySelectorAll('#langPick button')) {
    const on = b.dataset.lang === getLang();
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  }
  if (net.ws?.readyState === 1) $('connStatus').textContent = t(net.ws.isHost ? 'conn.host' : net.ws.isGuest ? 'conn.guest' : 'conn.server');
  renderRooms(lastRooms);
  if (room) renderRoom();
}
for (const b of document.querySelectorAll('#langPick button')) {
  b.addEventListener('click', () => {
    if (b.dataset.lang === getLang()) return;
    setLang(b.dataset.lang);
    applyLanguage();
    game.reloadWorld(); // 맵 표지판도 바꾼다
    sfx.click();
  });
}
applyLanguage();

// 시작
showScreen('home');
hud.show(false);
game.setAttract([]);
connect();

window.__aura = { game, net, sfx, hud };

// 첫 화면이 뜬 다음에 캐릭터 얼굴을 찍어 교체한다
setTimeout(() => {
  makePortraits();
  if (room) { renderRoom(); renderSkins($('skinPick')); showSkinDesc(); }
}, 60);
