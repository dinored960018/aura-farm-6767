// 접속, 방 목록, 대기실, 결과 화면. 경기가 끝나면 항상 대기실로 돌아온다.
import { SKINS, SKIN_IDS, WIN_KILLS, MAX_PLAYERS, ULTRAS } from '../shared/constants.js';
import { MAPS, MAP_IDS } from '../shared/map.js';
import { Sfx } from './audio.js';
import { Hud } from './hud.js';
import { Game } from './game.js';
import { P2P, inviteUrl, openTransport } from './transport.js';
import { TICKER, RESULT_WIN, RESULT_LOSE, SKIN_FACE, pick } from './memes.js';

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
let inMatch = false;
let myReady = false;
let reconnectTimer = 0;
let pingTimer = 0;

function connect() {
  const ws = openTransport();
  net.ws = ws;
  ws.onopen = () => {
    $('connStatus').textContent = ws.isHost ? '이 브라우저가 서버' : ws.isGuest ? '방장에게 연결됨' : '서버 연결됨';
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
      leaveToHome(joined ? '방장이 나가서 끝남' : '그 초대 코드로 못 들어감. 방장 창이 켜져 있어야 함');
      return;
    }
    $('connStatus').textContent = '서버 끊김. 다시 붙는 중...';
    $('connStatus').classList.remove('ok');
    if (inMatch) leaveMatchView();
    room = null;
    hud.show(false);
    game.setAttract([]);
    showScreen('home');
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connect, 1500);
  };
}

function sendHello() {
  net.send({ t: 'hello', name: $('nameInput').value, skin: currentSkin });
}

const H = net.handlers;
let joined = false;
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
  // 초대 링크로 왔으면 바로 입장
  if (net.ws.isGuest && !joined) {
    if (!m.rooms.length) { toast('방이 아직 없음'); return; }
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
H.error = (m) => toast(m.text);
H.left = () => {
  room = null;
  showScreen('home');
  game.setAttract([]);
  sfx.playMusic('lobby');
};
H.room = (m) => {
  const wasIn = !!room;
  room = m.room;
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
  addChat('시스템', '한 판 더 하려면 준비 눌러라');
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
  net.ws.openInvites?.(() => toast('초대 서버 연결 실패. 봇전은 됨'));
  net.send({ t: 'create', name: $('roomNameInput').value });
  sfx.boing();
};

function renderRooms(rooms) {
  const box = $('roomList');
  box.replaceChildren();
  if (!rooms.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = '방 없음. 니가 첫 번째 시그마가 돼라.';
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
    const mapLabel = r.map === 'random' ? '🎲 랜덤' : `${MAPS[r.map]?.emoji ?? ''} ${MAPS[r.map]?.name ?? ''}`;
    st.textContent = r.state !== 'lobby' ? '싸우는 중' : `${mapLabel} · ${r.count}/${MAX_PLAYERS}`;
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
    b.title = SKINS[id].name;
    const f = document.createElement('i');
    f.textContent = SKIN_FACE[id];
    const n = document.createElement('span');
    n.textContent = SKINS[id].name;
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
    b.title = def?.desc ?? '시작할 때 아무 맵이나';
    const f = document.createElement('i');
    f.textContent = def?.emoji ?? '🎲';
    const n = document.createElement('span');
    n.textContent = def?.name ?? '랜덤';
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
  $('roomTitle').textContent = room.name;
  const box = $('slots');
  box.replaceChildren();
  for (let i = 0; i < MAX_PLAYERS; i++) {
    const p = room.players[i];
    const card = document.createElement('div');
    card.className = `slot${p?.ready ? ' ready' : ''}${p?.id === net.id ? ' me' : ''}`;
    if (p) {
      const face = document.createElement('div');
      face.className = 'face';
      face.textContent = SKIN_FACE[p.skin] ?? '🙂';
      const info = document.createElement('div');
      const nm = document.createElement('strong');
      nm.textContent = p.name + (p.id === net.id ? ' (나)' : '') + (p.isBot ? ' 🤖' : '');
      const sub = document.createElement('small');
      sub.textContent = `${p.wins}승 · ${p.ready ? '준비 완료' : '폰 보는 중'}`;
      info.append(nm, sub);
      card.append(face, info);
    } else {
      const face = document.createElement('div');
      face.className = 'face';
      face.textContent = '❓';
      const info = document.createElement('div');
      const nm = document.createElement('strong');
      nm.textContent = '빈자리';
      const sub = document.createElement('small');
      sub.textContent = '친구 또는 봇';
      info.append(nm, sub);
      card.append(face, info);
    }
    box.append(card);
  }
  const me = room.players.find((p) => p.id === net.id);
  myReady = !!me?.ready;
  const rb = $('readyBtn');
  rb.textContent = myReady ? '준비 취소' : room.players.length < 2 ? '준비 (상대 기다리는 중)' : '준비 완료 🗿';
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
  $('skinDesc').textContent = u ? `각성: ${u.name}. ${u.desc}` : '';
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
  if (P2P && !ws.code) {
    toast(ws.peerFailed ? '초대 서버 연결 실패. 봇전만 가능' : '초대 코드 받는 중. 잠깐만');
    return;
  }
  const url = P2P ? inviteUrl(ws.code) : location.href.split('#')[0];
  try {
    await navigator.clipboard.writeText(url);
    toast(P2P ? `초대 링크 복사함 (코드 ${ws.code})` : '주소 복사함');
  } catch { toast(url); }
};

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
  const reason = { kills: `${WIN_KILLS}킬 달성`, time: '시간 끝', ragequit: '다 도망감 ㅋㅋ' }[m.reason] ?? '';
  $('resultTitle').textContent = draw ? '무승부?? 둘 다 NPC' : won ? pick(RESULT_WIN) : pick(RESULT_LOSE);
  $('resultSub').textContent = `${won ? 'YOU WIN' : draw ? 'DRAW' : 'YOU LOSE'} · ${reason}`;
  $('sixSevenBanner').hidden = !m.sixSeven;

  const table = $('resultStats');
  table.replaceChildren();
  for (const p of m.players) {
    const s = p.stats;
    const acc = s.shots ? Math.round((s.hitShots / s.shots) * 100) : 0;
    const col = document.createElement('div');
    col.className = `statCol${p.id === m.winner ? ' winner' : ''}`;
    const head = document.createElement('h3');
    head.textContent = `${SKIN_FACE[p.skin] ?? ''} ${p.name}`;
    col.append(head);
    const rows = [
      ['킬', p.kills], ['데스', s.deaths], ['명중률', `${acc}%`], ['헤드샷', s.headshots],
      ['입힌 데미지', Math.round(s.damage)], ['벌어들인 아우라', Math.round(s.auraEarned).toLocaleString()],
      ['누적 승수', `${p.wins}승`],
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
    $('resultCountdown').textContent = `${Math.max(0, (end - Date.now()) / 1000).toFixed(1)}초 뒤 대기실로 복귀`;
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
    sfx.say(pick(['bruh', 'you are the N P C', '스킬 이슈']), { pitch: 0.3, lang: 'en-US' });
  }
}

// ---------- 잡것 ----------
let tickerTimer = 0;
function startTicker() {
  const el = $('ticker');
  const next = () => { el.textContent = `🚨 ${pick(TICKER)}`; };
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
    toast(m ? '음소거. 근데 이 게임은 소리가 본체임' : '소리 켬');
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

// 시작
showScreen('home');
hud.show(false);
game.setAttract([]);
connect();

window.__aura = { game, net, sfx, hud };
