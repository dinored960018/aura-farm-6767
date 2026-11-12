// 접속, 방 목록, 대기실, 결과 화면. 경기가 끝나면 항상 대기실로 돌아온다.
import { SKIN_IDS, WIN_KILLS, MAX_PLAYERS, ULTRAS } from '../shared/constants.js';
import { MAPS, MAP_IDS } from '../shared/map.js';
import { Sfx } from './audio.js';
import { Hud } from './hud.js';
import { Game } from './game.js';
import { P2P, inviteCode, inviteUrl, openTransport, setInviteCode, matchmake, isPublicHost } from './transport.js';
import { lines, pick } from './memes.js';
import { makePortraits, faceEl, lookShot, closeShopRenderer } from './portraits.js';
import { COSMETICS } from '../shared/cosmetics.js';
import { t, getLang, setLang, suggestLang, applyStatic } from './i18n.js';
import { portal } from './portal.js';
import { createProfile, xpNeed } from './profile.js';

// 진행 기록. 포털 SDK가 준비된 뒤에 만든다 (그 전에는 브라우저 저장소)
let profile = createProfile(portal.store);
const COIN = '<svg class="coin" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4"/></svg>';
const LOCK = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

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
  net.send({ t: 'hello', name: $('nameInput').value.trim() || t('home.nickPh'), skin: currentSkin, look: profile.data.equip });
}

const H = net.handlers;
let joined = false;
let invitedToast = false;

// 방에 있는 동안 주소창 링크가 곧 초대 링크다
function syncAddress() {
  const { ws } = net;
  if (portal.active) { syncPortalRoom(); return; }
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
// 크레이지게임즈의 친구 초대 버튼에 방 상태를 알려 준다. 봇 자리는 사람이 오면 비워 주므로 빈자리로 친다
function syncPortalRoom() {
  const { ws } = net;
  if (!room) { portal.leftRoom(); return; }
  const code = ws?.code;
  const ok = !!code && (ws.isGuest || ws.registered);
  if (!code) return; // SDK는 첫 호출에 방 ID가 있어야 한다
  portal.updateRoom({ roomId: code, isJoinable: ok && !!room.open, inviteParams: { room: code } });
}
function leaveToHome(text) {
  toast(text);
  $('connStatus').textContent = text;
  // 새로고침해도 같은 초대로 다시 들어가지 않게 표시해 둔다
  try { sessionStorage.setItem('aura-skip-invite', net.ws?.code ?? ''); } catch { /* 무시 */ }
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
  // 크레이지게임즈: 첫 화면 없이 바로 내 방에 들어가고, 봇이 채워져 있어 버튼 한 번이면 시작
  if (portal.active && net.ws.isHost && !joined) {
    joined = true;
    openMyRoom();
    for (let i = 1; i < MAX_PLAYERS; i++) net.send({ t: 'addBot' });
  }
  // 초대 링크로 왔으면 바로 입장
  if (net.ws.isGuest && !joined) {
    if (!m.rooms.length) {
      if (portal.active) leaveToHome(t('toast.noRoom'));
      else toast(t('toast.noRoom'));
      return;
    }
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
  : m.modeId ? { ...m.vars, mode: t(`mode.${m.modeId}`) } : m.vars));
H.error = (m) => {
  if (portal.active && net.ws?.isGuest) { leaveToHome(t(m.key)); return; }
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
H.chat = (m) => { if (!chatOff()) addChat(m.from, m.text); };
H.matchStart = (m) => {
  inMatch = true;
  sfx.unlock();
  for (const p of m.players) hud.names.set(p.id, p.name);
  showScreen(null);
  portal.gameplayStart();
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
  // 광고를 보는 동안은 서버가 다음 판 자동 시작을 미룬다
  net.send({ t: 'busy', on: true });
  portal.midgame(sfx).then(() => net.send({ t: 'busy', on: false }));
};

function leaveMatchView() {
  inMatch = false;
  portal.gameplayStop();
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

function openMyRoom() {
  sendHello();
  if (net.ws.isHost) net.ws.onCode = syncAddress;
  net.ws.openInvites?.(() => toast(t('toast.inviteFail')));
  net.send({
    t: 'create',
    public: isPublicHost(),
    name: $('roomNameInput').value.trim() || t('roomDefault', { name: $('nameInput').value.trim() || t('home.nickPh') }),
  });
}

$('createBtn').onclick = () => {
  sfx.unlock();
  openMyRoom();
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
    const full = (r.humans ?? r.count) >= MAX_PLAYERS || r.state !== 'lobby';
    const mapLabel = r.map === 'random' ? t('room.random') : t(`map.${r.map}`);
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
    b.setAttribute('aria-label', t(`skin.${id}`));
    b.setAttribute('aria-pressed', id === currentSkin);
    b.append(faceEl(id));
    if (!profile.unlocked(id)) {
      b.classList.add('locked');
      const lock = document.createElement('em');
      lock.innerHTML = `${LOCK}<span>${profile.unlockLevel(id)}</span>`;
      b.append(lock);
      b.title = `${t(`skin.${id}`)} · ${t('toast.locked', { n: profile.unlockLevel(id) })}`;
      b.onclick = () => { toast(t('toast.locked', { n: profile.unlockLevel(id) })); sfx.click(); };
      box.append(b);
      continue;
    }
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
    b.dataset.map = id;
    b.title = t(def ? `mapDesc.${id}` : 'room.randomDesc');
    b.setAttribute('aria-pressed', room.mapChoice === id);
    const n = document.createElement('span');
    n.textContent = t(def ? `map.${id}` : 'room.random');
    b.append(n);
    b.disabled = room.state !== 'lobby';
    b.onclick = () => {
      net.send({ t: 'map', id });
      sfx.click();
    };
    box.append(b);
  }
}

function renderModes(box) {
  box.replaceChildren();
  for (const id of ['classic', 'rush']) {
    const b = document.createElement('button');
    b.className = `modeBtn${room.mode === id ? ' on' : ''}`;
    b.dataset.mode = id;
    b.setAttribute('aria-pressed', room.mode === id);
    b.disabled = room.state !== 'lobby';
    const n = document.createElement('strong');
    n.textContent = t(`mode.${id}`);
    const d = document.createElement('small');
    d.textContent = t(`modeDesc.${id}`);
    b.append(n, d);
    b.onclick = () => { net.send({ t: 'mode', id }); sfx.click(); };
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
    const face = document.createElement('div');
    face.className = 'face';
    const info = document.createElement('div');
    info.className = 'who';
    const nm = document.createElement('strong');
    const sub = document.createElement('small');
    if (p) {
      face.append(faceEl(p.skin));
      nm.textContent = p.name;
      const tags = [];
      if (p.id === net.id) tags.push(['you', t('room.youTag')]);
      if (p.isBot) tags.push(['bot', t('room.botTag')]);
      if (p.wins) tags.push(['wins', t('room.wins', { n: p.wins })]);
      for (const [k, txt] of tags) {
        const tag = document.createElement('i');
        tag.className = `tag ${k}`;
        tag.textContent = txt;
        sub.append(tag);
      }
      const stamp = document.createElement('b');
      stamp.className = 'stamp';
      stamp.textContent = t(p.ready ? 'room.isReady' : 'room.notReady');
      card.append(face, info, stamp);
    } else {
      nm.textContent = t('room.empty');
      sub.textContent = t('room.emptySub');
      card.append(face, info);
    }
    info.prepend(nm);
    info.append(sub);
    box.append(card);
  }
  const me = room.players.find((p) => p.id === net.id);
  myReady = !!me?.ready;
  if (me && document.activeElement !== $('renameInput')) $('renameInput').value = me.name;
  const rb = $('readyBtn');
  const onlyBots = room.players.length > 1 && room.players.every((p) => p.isBot || p.id === net.id);
  rb.textContent = t(myReady ? 'room.unready' : room.players.length < 2 ? 'room.waiting' : onlyBots ? 'room.play' : 'room.ready');
  autoStartAt = room.state === 'lobby' && room.autoStartIn ? Date.now() + room.autoStartIn : 0;
  rb.dataset.label = rb.textContent;
  showAutoStart();
  rb.classList.toggle('on', myReady);
  rb.disabled = room.state !== 'lobby';
  $('botBtn').disabled = room.state !== 'lobby' || room.players.length >= MAX_PLAYERS;
  $('botOutBtn').disabled = room.state !== 'lobby' || !room.players.some((p) => p.isBot);
  renderModes($('modePick'));
  renderMaps($('mapPick'));
  renderSkins($('skinPick'));
  showSkinDesc();
  renderProfile();
}

// 레벨, 경험치, 코인 띠와 오늘의 미션
function renderProfile() {
  const d = profile.data;
  const bar = $('profileBar');
  bar.innerHTML = `<b class="lv"></b><span class="xp"><i></i></span><button type="button" class="shopBtn"><span class="coins">${COIN}<b></b></span><span class="lbl"></span></button>`;
  bar.querySelector('.lbl').textContent = t('shop.open');
  bar.querySelector('.shopBtn').onclick = openShop;
  bar.querySelector('.lv').textContent = t('prof.level', { n: d.level });
  bar.querySelector('.xp i').style.width = `${Math.min(100, (d.xp / xpNeed(d.level)) * 100)}%`;
  bar.querySelector('.coins b').textContent = d.coins.toLocaleString();
  const box = $('missions');
  box.replaceChildren();
  for (const m of profile.missions()) {
    const row = document.createElement('div');
    row.className = `mission${m.done ? ' done' : ''}`;
    const txt = document.createElement('span');
    txt.textContent = t(`mission.${m.id}`, { n: m.goal.toLocaleString() });
    const prog = document.createElement('small');
    prog.textContent = `${m.n.toLocaleString()} / ${m.goal.toLocaleString()}`;
    const fill = document.createElement('i');
    fill.style.width = `${(m.n / m.goal) * 100}%`;
    const pay = document.createElement('b');
    pay.innerHTML = COIN;
    pay.append(String(m.coins));
    row.append(fill, txt, prog, pay);
    box.append(row);
  }
}

// 공개 방은 경기가 끝나면 알아서 다음 판이 시작된다. 남은 시간을 시작 버튼에 붙인다
let autoStartAt = 0;
function showAutoStart() {
  const rb = $('readyBtn');
  if (!autoStartAt || screens.room.hidden) return;
  const s = Math.max(0, Math.ceil((autoStartAt - Date.now()) / 1000));
  rb.textContent = `${rb.dataset.label} · ${t('room.autoStart', { s })}`;
}
setInterval(showAutoStart, 250);

function showSkinDesc() {
  const u = ULTRAS[currentSkin];
  const descBox = $('skinDesc');
  descBox.replaceChildren();
  if (u) {
    const name = document.createElement('strong');
    name.textContent = t(`skin.${currentSkin}`);
    const head = document.createElement('b');
    head.textContent = t(`ultra.${currentSkin}`);
    const key = document.createElement('kbd');
    key.textContent = 'E';
    head.prepend(key);
    const body = document.createElement('span');
    body.textContent = t(`ultraDesc.${currentSkin}`);
    descBox.append(faceEl(currentSkin, 'descFace'), name, head, body);
  }
}

$('readyBtn').onclick = () => {
  sfx.unlock();
  // 봇전은 이 클릭으로 경기가 바로 시작되니 마우스도 같이 잡아 클릭을 한 번 줄인다
  if (!myReady && room?.players.length > 1 && room.players.every((p) => p.ready || p.id === net.id)) game.requestLock();
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
  const url = (portal.active && portal.inviteLink(ws.code)) || location.href.split('#')[0];
  if (await copyText(url)) toast(P2P ? t('toast.copied', { code: ws.code }) : t('toast.copiedPlain'));
  else toast(url);
};

// 포털 안(iframe)에서는 클립보드 API가 막힐 수 있다
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const a = document.createElement('textarea');
    a.value = text;
    document.body.append(a);
    a.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* 실패 */ }
    a.remove();
    return ok;
  }
}

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
  // 순위표: 순위, 얼굴, 이름, 킬 수만 크게. 나머지 기록은 한 줄로
  // 기권승이면 킬이 적어도 승자를 맨 위에
  const ranked = [...m.players].sort((a, b) => (b.id === m.winner) - (a.id === m.winner));
  ranked.forEach((p, i) => {
    const s = p.stats;
    const acc = s.shots ? Math.round((s.hitShots / s.shots) * 100) : 0;
    const row = document.createElement('div');
    row.className = `rankRow${p.id === m.winner ? ' winner' : ''}${p.id === net.id ? ' me' : ''}`;
    const rank = document.createElement('b');
    rank.className = 'rank';
    rank.textContent = i + 1;
    const who = document.createElement('div');
    who.className = 'who';
    const nm = document.createElement('strong');
    nm.textContent = p.name;
    const line = document.createElement('small');
    line.textContent = [
      `${t('stat.deaths')} ${s.deaths}`, `${t('stat.acc')} ${acc}%`, `${t('stat.heads')} ${s.headshots}`,
      `${t('stat.damage')} ${Math.round(s.damage)}`, `${t('stat.aura')} ${Math.round(s.auraEarned).toLocaleString()}`,
      t('room.wins', { n: p.wins }),
    ].join(' · ');
    who.append(nm, line);
    const kills = document.createElement('div');
    kills.className = 'kills';
    const k = document.createElement('b');
    k.textContent = p.kills;
    const kl = document.createElement('small');
    kl.textContent = t('stat.kills');
    kills.append(k, kl);
    row.append(rank, faceEl(p.skin, 'rankFace'), who, kills);
    table.append(row);
  });

  showReward(m);

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
  if (won) portal.happytime();
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

// ---------- 상점 ----------
let shopTab = 'hat';
function openShop() {
  if (!room || room.state !== 'lobby') return;
  sfx.click();
  $('shop').hidden = false;
  renderShop();
}
function closeShop() {
  $('shop').hidden = true;
  closeShopRenderer();
  renderProfile();
}
$('shopClose').onclick = closeShop;
$('shop').addEventListener('pointerdown', (e) => { if (e.target === $('shop')) closeShop(); });
for (const b of document.querySelectorAll('#shopTabs button')) {
  b.onclick = () => { shopTab = b.dataset.tab; renderShop(); sfx.click(); };
}
function renderShop() {
  const d = profile.data;
  $('shopCoins').innerHTML = COIN;
  $('shopCoins').append(d.coins.toLocaleString());
  for (const b of document.querySelectorAll('#shopTabs button')) b.setAttribute('aria-selected', b.dataset.tab === shopTab);
  const grid = $('shopGrid');
  grid.replaceChildren();
  for (const [id, item] of Object.entries(COSMETICS)) {
    if (item.slot !== shopTab) continue;
    const owned = profile.owns(id);
    const on = d.equip[item.slot] === id;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `item${owned ? ' owned' : ''}${on ? ' on' : ''}${!owned && d.coins < item.price ? ' poor' : ''}`;
    const url = lookShot(currentSkin, { ...d.equip, [item.slot]: id });
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      b.append(img);
    }
    const name = document.createElement('strong');
    name.textContent = t(`item.${id}`);
    const price = document.createElement('span');
    price.className = 'price';
    if (on) price.textContent = t('shop.equipped');
    else if (owned) price.textContent = t('shop.owned');
    else { price.innerHTML = COIN; price.append(String(item.price)); }
    b.append(name, price);
    b.onclick = () => {
      if (!owned) {
        if (!profile.buy(id, item.price)) {
          toast(t('shop.need', { n: item.price - profile.data.coins }));
          sfx.click();
          return;
        }
        toast(t('shop.bought', { name: t(`item.${id}`) }));
        sfx.airhorn();
        profile.equip(item.slot, id);
      } else {
        profile.equip(item.slot, on ? null : id);
        sfx.quack();
      }
      net.send({ t: 'look', look: profile.data.equip });
      renderShop();
    };
    grid.append(b);
  }
}

function showReward(m) {
  const box = $('reward');
  box.replaceChildren();
  const me = m.players.find((p) => p.id === net.id);
  if (!me) return;
  const r = profile.record({ kills: me.kills, won: m.winner === net.id, stats: me.stats });
  const line = document.createElement('div');
  line.className = 'gain';
  line.innerHTML = `<b class="c">${COIN}<span></span></b><b class="x"></b><span class="lv"></span><span class="xp"><i></i></span>`;
  line.querySelector('.c span').textContent = t('reward.coins', { n: r.coins });
  line.querySelector('.x').textContent = t('reward.xp', { n: r.xp });
  line.querySelector('.lv').textContent = t('prof.level', { n: r.level });
  const fill = line.querySelector('.xp i');
  const pct = Math.min(100, (profile.data.xp / xpNeed(r.level)) * 100);
  fill.style.width = r.levelUp ? '0%' : `${Math.min(100, (r.before.xp / xpNeed(r.level)) * 100)}%`;
  requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = `${pct}%`; }));
  box.append(line);
  const notes = [];
  if (r.levelUp) notes.push(['up', t('reward.levelUp')]);
  for (const s of r.unlocked) notes.push(['new', t('reward.unlocked', { name: t(`skin.${s}`) }), s]);
  for (const mm of r.done) notes.push(['done', t('reward.mission', { text: t(`mission.${mm.id}`, { n: mm.goal.toLocaleString() }) })]);
  for (const [k, txt, skin] of notes) {
    const n = document.createElement('p');
    n.className = `note ${k}`;
    if (skin) n.append(faceEl(skin, 'noteFace'));
    n.append(txt);
    box.append(n);
  }
  if (r.levelUp) { sfx.airhorn(); portal.happytime(); }
}

// ---------- 잡것 ----------
let tickerTimer = 0;
function startTicker() {
  const el = $('ticker');
  const next = () => {
    const tag = document.createElement('b');
    tag.textContent = t('ticker.tag');
    el.replaceChildren(tag, document.createTextNode(pick(lines('ticker'))));
  };
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

window.__aura = { game, net, sfx, hud, portal, H };

// 포털이 정한 채팅 끄기, 음소거를 따른다
function chatOff() { return !!portal.settings().disableChat; }
function applyPortalSettings() {
  document.body.classList.toggle('noChat', chatOff());
  sfx.setHold('portal', !!portal.settings().muteAudio);
}

// CrazyGames 초대: 시작 시 파라미터, 또는 게임 중 친구 방 입장(새로고침으로 다시 시작)
function resolvePortalInvite() {
  let pending = null, skip = null;
  try {
    pending = sessionStorage.getItem('aura-join-code');
    skip = sessionStorage.getItem('aura-skip-invite');
    sessionStorage.removeItem('aura-join-code');
  } catch { /* 무시 */ }
  const code = pending || portal.invite() || inviteCode;
  setInviteCode(code && code === skip ? null : code);
  portal.onJoin((params) => {
    if (!params?.room || params.room === net.ws?.code) return;
    try {
      sessionStorage.setItem('aura-join-code', params.room);
      sessionStorage.removeItem('aura-skip-invite');
    } catch { /* 무시 */ }
    location.reload();
  });
}

// 로그인한 사람은 크레이지게임즈 닉네임을 쓴다. 게스트는 그대로 닉네임을 정할 수 있다
async function applyPortalUser() {
  const useName = (user) => {
    if (!user?.username) return;
    $('nameInput').value = user.username;
    $('nameInput').closest('label').hidden = true;
    $('renameForm').hidden = true;
    if (room) net.send({ t: 'rename', name: user.username });
    else sendHello();
  };
  useName(await portal.user());
  portal.onLogin(useName);
}

async function start() {
  if (portal.active) {
    await portal.init();
    portal.loadingStart();
    suggestLang(portal.locale());
    applyLanguage();
    applyPortalSettings();
    portal.onSettings(applyPortalSettings);
    resolvePortalInvite();
    profile = createProfile(portal.store);
    await applyPortalUser();
    // 초대 받은 게 아니고 친구와 바로 하기도 아니면, 모르는 사람이 있는 공개 방부터 찾는다
    if (!inviteCode && !portal.instant()) {
      $('connStatus').textContent = t('conn.searching');
      toast(t('conn.searching'));
      await matchmake();
    }
  } else {
    showScreen('home');
  }
  if (!profile.unlocked(currentSkin)) currentSkin = 'minsu';
  hud.show(false);
  game.setAttract([]);
  connect();

  // 첫 화면이 뜬 다음에 캐릭터 얼굴을 찍어 교체한다
  setTimeout(() => {
    makePortraits();
    if (room) { renderRoom(); renderSkins($('skinPick')); showSkinDesc(); }
    portal.loadingStop();
  }, 60);
}
start();
