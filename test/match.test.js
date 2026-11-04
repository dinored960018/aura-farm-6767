// 실제 서버를 띄우고 WebSocket 클라이언트 두 개로 한 판을 끝까지 돌린다.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { WebSocket } from 'ws';
import { startServer } from '../server/app.js';
import { WEAPONS, NUKE, MAX_PLAYERS } from '../shared/constants.js';
import { MAPS, MAP_IDS, groundAt, rayPlayer, rayWorld } from '../shared/map.js';
import { newBody, stepBodyFixed } from '../shared/physics.js';
import { navFor, findPath, advance } from '../server/nav.js';

const TIMINGS = { countdownMs: 60, respawnMs: 40, invulnMs: 0, resultsMs: 150, eventFirstMs: 999999 };
let srv;
before(async () => { srv = await startServer({ port: 0, host: '127.0.0.1', timings: TIMINGS }); });
after(async () => { await srv.close(); });

class C {
  constructor() { this.msgs = []; this.waiters = []; }
  async open(name) {
    this.ws = new WebSocket(`ws://127.0.0.1:${srv.port}/ws`);
    this.ws.on('message', (d) => {
      const m = JSON.parse(d.toString());
      this.msgs.push(m);
      if (m.t === 'welcome') this.id = m.id;
      if (m.t === 'room') this.room = m.room;
      this.waiters = this.waiters.filter((w) => !(w.f(m) && (w.res(m), true)));
    });
    await this.wait((m) => m.t === 'welcome');
    this.send({ t: 'hello', name, skin: 'cat' });
    return this;
  }
  send(m) { this.ws.send(JSON.stringify(m)); }
  wait(f, ms = 4000) {
    return new Promise((res, rej) => {
      const w = { f, res };
      this.waiters.push(w);
      setTimeout(() => rej(new Error('시간초과')), ms).unref();
    });
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function aimAt(from, to) {
  const o = [from[0], from[1] + 1.55, from[2]];
  const v = [to[0] - o[0], to[1] + 1.6 - o[1], to[2] - o[2]];
  return { o, d: v };
}

test('대기실 → 경기 → 7킬 → 결과 → 대기실 복귀 → 재경기', async () => {
  const a = await new C().open('민수');
  const b = await new C().open('철수');
  a.send({ t: 'create', name: '테스트방' });
  await a.wait((m) => m.t === 'room');
  const roomId = a.room.id;
  b.send({ t: 'join', id: roomId });
  await b.wait((m) => m.t === 'room' && m.room.players.length === 2);

  for (let round = 1; round <= 2; round++) {
    const started = a.wait((m) => m.t === 'matchStart');
    const go = a.wait((m) => m.t === 'go');
    a.send({ t: 'ready', ready: true });
    b.send({ t: 'ready', ready: true });
    await started;
    await go;

    // 두 사람을 시야가 뚫린 곳에 세운다
    const ap = [-20, 0, 12], bp = [-20, 0, 18];
    const end = a.wait((m) => m.t === 'matchEnd', 15000);
    const backP = a.wait((m) => m.t === 'backToLobby', 15000);
    let done = false;
    end.then(() => { done = true; });
    while (!done) {
      a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'six7', e: 0 });
      b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'six7', e: 0 });
      await sleep(30);
      const { o, d } = aimAt(ap, bp);
      a.send({ t: 'shoot', w: 'six7', o, dirs: [d] });
      await sleep(WEAPONS.six7.interval * 1000 + 15);
    }
    const res = await end;
    assert.equal(res.winner, a.id);
    const pa = res.players.find((p) => p.id === a.id);
    assert.equal(pa.kills, 7);
    assert.equal(pa.wins, round, '승수는 판이 바뀌어도 누적');
    assert.ok(pa.stats.headshots >= 7);

    const back = await backP;
    assert.ok(back);
    await sleep(20);
    assert.equal(a.room.state, 'lobby');
    assert.ok(a.room.players.every((p) => p.ready === false), '복귀하면 레디가 풀린다');
  }
  a.ws.close(); b.ws.close();
  await sleep(50);
});

test('상대가 경기 중 나가면 남은 사람 승리 후 대기실로', async () => {
  const a = await new C().open('A');
  const b = await new C().open('B');
  a.send({ t: 'create' });
  await a.wait((m) => m.t === 'room');
  b.send({ t: 'join', id: a.room.id });
  await a.wait((m) => m.t === 'room' && m.room.players.length === 2);
  const go = a.wait((m) => m.t === 'go');
  a.send({ t: 'ready', ready: true });
  b.send({ t: 'ready', ready: true });
  await go;
  const end = a.wait((m) => m.t === 'matchEnd');
  b.ws.close();
  const res = await end;
  assert.equal(res.winner, a.id);
  assert.equal(res.reason, 'ragequit');
  await a.wait((m) => m.t === 'backToLobby');
  a.ws.close();
  await sleep(50);
});

test('봇 추가하면 바로 싸울 수 있고 봇이 스스로 움직인다', async () => {
  const a = await new C().open('혼자');
  a.send({ t: 'create' });
  await a.wait((m) => m.t === 'room');
  a.send({ t: 'addBot' });
  await a.wait((m) => m.t === 'room' && m.room.players.length === 2);
  const go = a.wait((m) => m.t === 'go');
  a.send({ t: 'ready', ready: true });
  await go;
  const botId = a.room.players.find((p) => p.isBot).id;
  const first = (await a.wait((m) => m.t === 'snap')).players.find((p) => p.id === botId).p;
  await sleep(800);
  const later = (await a.wait((m) => m.t === 'snap')).players.find((p) => p.id === botId).p;
  assert.ok(Math.hypot(later[0] - first[0], later[2] - first[2]) > 0.5, '봇이 움직여야 함');
  a.ws.close();
  await sleep(50);
});

test('이상한 입력에 서버가 안 죽는다', async () => {
  const a = await new C().open('해커');
  a.ws.send('이건 JSON이 아님');
  a.ws.send('null');
  a.send({ t: 'shoot', w: 'nope', o: 1, dirs: 'x' });
  a.send({ t: 'join', id: { a: 1 } });
  a.send({ t: 'create', name: 'x'.repeat(500) });
  await a.wait((m) => m.t === 'room');
  assert.ok(a.room.name.length <= 20);
  a.send({ t: 'state', p: [NaN, null, 1], y: 'x', pi: {} });
  a.send({ t: 'shoot', w: 'fart', o: [0, 0, 0], dirs: [[null, 1, 2]] });
  a.send({ t: 'chat', text: { evil: true } });
  const pong = a.wait((m) => m.t === 'pong');
  a.send({ t: 'ping', c: 1 });
  await pong;
  a.ws.close();
  await sleep(50);
});

test('싸대기는 날려버리고, 시그마가 각성하면 데미지가 1.67배가 된다', async () => {
  const a = await new C().open('A');
  const b = await new C().open('B');
  a.send({ t: 'hello', name: 'A', skin: 'sigma' });
  a.send({ t: 'create' });
  await a.wait((m) => m.t === 'room');
  b.send({ t: 'join', id: a.room.id });
  await a.wait((m) => m.t === 'room' && m.room.players.length === 2);
  const go = a.wait((m) => m.t === 'go');
  a.send({ t: 'ready', ready: true });
  b.send({ t: 'ready', ready: true });
  await go;
  const ap = [-20, 0, 12], bp = [-20, 0, 14];
  const pin = () => {
    a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'six7', e: 0 });
    b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'six7', e: 0 });
  };
  pin();
  await sleep(60);

  const knocked = b.wait((m) => m.t === 'knock');
  const slapHit = a.wait((m) => m.t === 'hit' && m.weapon === 'slap');
  a.send({ t: 'slap', d: [0, -0.2, 1] });
  assert.ok((await knocked).v[2] > 5, '멀어지는 쪽으로 날아가야 함');
  assert.equal((await slapHit).dmg, 67);

  // 아우라 충전: 헤드샷 2방이면 1킬이라 3킬쯤이면 가득 찬다
  let aura = 0;
  for (let i = 0; i < 40 && aura < 6767; i++) {
    pin();
    await sleep(25);
    const { o, d } = aimAt(ap, bp);
    a.send({ t: 'shoot', w: 'six7', o, dirs: [d] });
    const snap = await a.wait((m) => m.t === 'snap');
    aura = snap.players.find((p) => p.id === a.id).aura;
    await sleep(WEAPONS.six7.interval * 1000 + 10);
  }
  assert.equal(aura, 6767);
  const on = a.wait((m) => m.t === 'ultra' && m.on);
  a.send({ t: 'ultra' });
  await on;

  await sleep(80);
  pin();
  await sleep(60);
  const hit = a.wait((m) => m.t === 'hit' && m.from === a.id);
  const { o, d } = aimAt(ap, bp);
  a.send({ t: 'shoot', w: 'six7', o, dirs: [d] });
  assert.equal((await hit).dmg, 111.89, '머리 67 x 1.67');
  a.ws.close(); b.ws.close();
  await sleep(50);
});

const roomOf = (c) => srv.rooms.get(c.room.id);
const playerOf = (c) => roomOf(c).players.find((p) => p.id === c.id);

async function startRoom(n, { skins = [], map } = {}) {
  const cs = [];
  for (let k = 0; k < n; k++) cs.push(await new C().open('P' + k));
  cs[0].send({ t: 'create' });
  await cs[0].wait((m) => m.t === 'room');
  for (let k = 1; k < n; k++) cs[k].send({ t: 'join', id: cs[0].room.id });
  await cs[0].wait((m) => m.t === 'room' && m.room.players.length === n);
  cs.forEach((c, k) => { if (skins[k]) c.send({ t: 'skin', skin: skins[k] }); });
  if (map) cs[0].send({ t: 'map', id: map });
  await sleep(30);
  const go = cs[0].wait((m) => m.t === 'go');
  const started = cs[0].wait((m) => m.t === 'matchStart');
  cs.forEach((c) => c.send({ t: 'ready', ready: true }));
  const startMsg = await started;
  await go;
  return { cs, startMsg, close: async () => { cs.forEach((c) => c.ws.close()); await sleep(50); } };
}

test('대기실에서 닉변하면 모두에게 보이고, 경기 중에는 안 바뀐다', async () => {
  const a = await new C().open('민수');
  const b = await new C().open('철수');
  a.send({ t: 'create' });
  await a.wait((m) => m.t === 'room');
  b.send({ t: 'join', id: a.room.id });
  await a.wait((m) => m.t === 'room' && m.room.players.length === 2);
  const seen = b.wait((m) => m.t === 'room' && m.room.players.some((p) => p.name === '시그마'));
  const note = b.wait((m) => m.t === 'sys' && m.key === 'sys.rename' && m.vars.name === '시그마');
  a.send({ t: 'rename', name: '  시그마  ' });
  await seen;
  await note;
  a.send({ t: 'rename', name: '   ' });
  a.send({ t: 'rename', name: 'x'.repeat(50) });
  await a.wait((m) => m.t === 'room' && m.room.players.some((p) => p.name === 'x'.repeat(12)));
  const go = a.wait((m) => m.t === 'go');
  a.send({ t: 'ready', ready: true });
  b.send({ t: 'ready', ready: true });
  await go;
  a.send({ t: 'rename', name: '경기중닉변' });
  await sleep(40);
  assert.equal(roomOf(a).players.find((p) => p.id === a.id).name, 'x'.repeat(12));
  a.ws.close(); b.ws.close();
  await sleep(50);
});

test('4명까지 들어오고 5번째는 못 들어오며, 봇도 4명까지만', async () => {
  const cs = [];
  for (let k = 0; k < MAX_PLAYERS + 1; k++) cs.push(await new C().open('P' + k));
  cs[0].send({ t: 'create' });
  await cs[0].wait((m) => m.t === 'room');
  const id = cs[0].room.id;
  for (let k = 1; k < MAX_PLAYERS; k++) cs[k].send({ t: 'join', id });
  await cs[0].wait((m) => m.t === 'room' && m.room.players.length === 4);
  const err = cs[4].wait((m) => m.t === 'error');
  cs[4].send({ t: 'join', id });
  await err;
  cs[0].send({ t: 'addBot' });
  await sleep(40);
  assert.equal(roomOf(cs[0]).players.length, 4);
  cs.forEach((c) => c.ws.close());
  await sleep(50);
});

test('3명이 준비해도 시작하고, 쏜 사람 앞의 가까운 사람이 맞고, 한 명이 나가도 계속된다', async () => {
  const { cs: [a, b, c], close } = await startRoom(3);
  const ap = [-20, 0, 12], bp = [-20, 0, 15], cp = [-20, 0, 19];
  const pin = () => {
    a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'six7', e: 0 });
    b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'six7', e: 0 });
    c.send({ t: 'state', p: cp, y: 0, pi: 0, w: 'six7', e: 0 });
  };
  pin();
  await sleep(60);
  const hit = a.wait((m) => m.t === 'hit');
  const { o, d } = aimAt(ap, cp); // 일직선: b가 앞을 막고 있다
  a.send({ t: 'shoot', w: 'six7', o, dirs: [[0, d[1] * 0, 1]] });
  assert.equal((await hit).to, b.id, '앞에 선 사람이 맞아야 함');
  const noEnd = a.msgs.length;
  c.ws.close();
  await a.wait((m) => m.t === 'room' && m.room.players.length === 2);
  assert.equal(a.room.state, 'playing', '둘 남았으면 계속');
  assert.ok(a.msgs.slice(noEnd).every((m) => m.t !== 'matchEnd'));
  const end = a.wait((m) => m.t === 'matchEnd');
  b.ws.close();
  assert.equal((await end).winner, a.id);
  await close();
});

test('개인전 추락사: 마지막으로 때린 사람에게 킬이 간다', async () => {
  const { cs: [a, b, c], close } = await startRoom(3);
  const ap = [-20, 0, 12], bp = [-20, 0, 15];
  a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'six7', e: 0 });
  b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'six7', e: 0 });
  c.send({ t: 'state', p: [20, 0, -12], y: 0, pi: 0, w: 'six7', e: 0 });
  await sleep(60);
  const hit = a.wait((m) => m.t === 'hit');
  const { o, d } = aimAt(ap, bp);
  a.send({ t: 'shoot', w: 'fart', o, dirs: [d] });
  await hit;
  const kill = c.wait((m) => m.t === 'kill');
  b.send({ t: 'state', p: [0, -30, 0], y: 0, pi: 0, w: 'six7', e: 0 });
  const k = await kill;
  assert.equal(k.weapon, 'fall');
  assert.equal(k.killer, a.id);
  await close();
});

test('맵 선택이 경기에 적용되고 랜덤도 고른다', async () => {
  const one = await startRoom(2, { map: 'roof' });
  assert.equal(one.startMsg.map, 'roof');
  await one.close();
  const two = await startRoom(2, { map: 'random' });
  assert.ok(MAP_IDS.includes(two.startMsg.map));
  await two.close();
});

test('각성: 고양이는 날아가 붙어서 할퀴고, 맞는 쪽 싸대기에 떨어지며 원래 자리로 착지한다', async () => {
  const { cs: [a, b], close } = await startRoom(2, { skins: ['cat', 'minsu'] });
  const ap = [-22, 0, 12], bp = [-16, 0, 20];
  a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'fart', e: 0 });
  b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'fart', e: 0 });
  await sleep(60);
  playerOf(a).aura = 6767;
  const on = b.wait((m) => m.t === 'ultra' && m.on);
  const latched = b.wait((m) => m.t === 'cat' && m.to === b.id);
  const claw = b.wait((m) => m.t === 'hit' && m.weapon === 'claw' && m.to === b.id);
  a.send({ t: 'ultra' });
  assert.equal((await on).kind, 'cat');
  await latched;
  assert.equal((await claw).from, a.id);
  // 비행 중/부착 중 클라이언트가 보내는 위치는 무시
  a.send({ t: 'state', p: [0, 50, 0], y: 0, pi: 0, w: 'fart', e: 0 });
  await sleep(40);
  assert.ok(Math.hypot(playerOf(a).pos[0] - bp[0], playerOf(a).pos[2] - bp[2]) < 2, '상대 얼굴에 붙어 있어야 함');
  const off = a.wait((m) => m.t === 'ultra' && !m.on);
  const tele = a.wait((m) => m.t === 'teleport');
  b.send({ t: 'slap', d: [0, 0, -1] });
  await off;
  assert.deepEqual((await tele).pos.map(Math.round), bp, '떨어지면 상대 자리에 착지');
  await close();
});

test('각성: 핵은 쏜 사람은 안 다치고 가까운 상대를 잡으며 킬은 쏜 사람 몫', async () => {
  const { cs: [a, b], close } = await startRoom(2, { skins: ['cone', 'minsu'] });
  const ap = [-20, 0, 12], bp = [-20, 0, 16];
  a.send({ t: 'state', p: ap, y: 0, pi: -0.5, w: 'fart', e: 0 });
  b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'fart', e: 0 });
  await sleep(60);
  playerOf(a).aura = 6767;
  const nuke = b.wait((m) => m.t === 'nuke');
  const boom = b.wait((m) => m.t === 'nukeBoom', NUKE.fuseMs + 2000);
  const kill = b.wait((m) => m.t === 'kill', NUKE.fuseMs + 2000);
  a.send({ t: 'ultra' });
  assert.equal((await nuke).radius, NUKE.radius);
  await boom;
  const k = await kill;
  assert.equal(k.weapon, 'nuke');
  assert.equal(k.killer, a.id);
  assert.equal(k.victim, b.id);
  assert.equal(playerOf(a).hp, 100);
  await close();
});

test('각성: 변기맨은 빨아들이고, 민수는 각성 중에만 레이저를 쏜다', async () => {
  const { cs: [a, b], close } = await startRoom(2, { skins: ['toilet', 'minsu'] });
  const ap = [-20, 0, 12], bp = [-20, 0, 18];
  const pin = () => {
    a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'fart', e: 0 });
    b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'fart', e: 0 });
  };
  pin();
  await sleep(60);
  const { o, d } = aimAt(bp, ap);
  b.send({ t: 'shoot', w: 'laser', o, dirs: [d] });
  await sleep(40);
  assert.equal(playerOf(a).hp, 100, '각성 전 레이저는 무시');
  playerOf(a).aura = 6767;
  const pulled = b.wait((m) => m.t === 'knock');
  a.send({ t: 'ultra' });
  assert.ok((await pulled).v[2] < 0, '변기 쪽으로 끌려가야 함');
  playerOf(b).aura = 6767;
  const hit = a.wait((m) => m.t === 'hit' && m.weapon === 'laser');
  b.send({ t: 'ultra' });
  await sleep(40);
  pin();
  await sleep(60);
  b.send({ t: 'shoot', w: 'laser', o, dirs: [d] });
  assert.equal((await hit).to, a.id);
  await close();
});

async function ultraRoom(skin) {
  const started = await startRoom(2, { skins: [skin, 'minsu'] });
  const [a, b] = started.cs;
  const ap = [-20, 0, 12], bp = [-20, 0, 14];
  a.send({ t: 'state', p: ap, y: 0, pi: 0, w: 'fart', e: 0 });
  b.send({ t: 'state', p: bp, y: 0, pi: 0, w: 'fart', e: 0 });
  await sleep(60);
  playerOf(a).aura = 6767;
  return { ...started, a, b, ap, bp };
}

test('각성: 상어는 닿으면 물어뜯고, 사후르는 충격파를 날린다', async () => {
  const s = await ultraRoom('shark');
  const bite = s.b.wait((m) => m.t === 'hit' && m.weapon === 'shark');
  s.a.send({ t: 'ultra' });
  assert.equal((await bite).dmg, 22);
  await s.close();
  const t = await ultraRoom('tung');
  const wave = t.b.wait((m) => m.t === 'wave');
  const hit = t.b.wait((m) => m.t === 'hit' && m.weapon === 'tung');
  const knock = t.b.wait((m) => m.t === 'knock');
  t.a.send({ t: 'ultra' });
  await wave;
  assert.equal((await hit).dmg, 17);
  assert.ok((await knock).v[2] > 0, '바깥으로 밀려남');
  await t.close();
});

test('각성: 악어 폭격은 13발이고 쏜 사람은 안 맞는다', async () => {
  const s = await ultraRoom('croc');
  const before = s.b.msgs.length;
  const hit = s.b.wait((m) => m.t === 'hit' && m.weapon === 'bomb', 8000);
  s.a.send({ t: 'ultra' });
  const h = await hit;
  assert.equal(h.from, s.a.id);
  assert.equal(s.b.msgs.slice(before).filter((m) => m.t === 'bomb').length, 13);
  assert.equal(playerOf(s.a).hp, 100);
  await s.close();
});

test('각성: 리즈에 반하면 공격이 막히고, 부장님은 전원을 소환해 차렷시킨다', async () => {
  const s = await ultraRoom('rizz');
  const charm = s.b.wait((m) => m.t === 'charm' && m.to === s.b.id);
  s.a.send({ t: 'ultra' });
  await charm;
  const { o, d } = aimAt(s.bp, s.ap);
  s.b.send({ t: 'shoot', w: 'six7', o, dirs: [d] });
  await sleep(50);
  assert.equal(playerOf(s.a).hp, 100, '반하면 못 쏨');
  await s.close();

  const t = await ultraRoom('boss');
  t.a.send({ t: 'state', p: [-22, 0, 11], y: 0, pi: 0, w: 'fart', e: 0 });
  await sleep(50);
  const tele = t.b.wait((m) => m.t === 'teleport');
  const stun = t.b.wait((m) => m.t === 'stun');
  t.a.send({ t: 'ultra' });
  assert.deepEqual((await tele).pos, [-22, 0, 11]);
  await stun;
  t.b.send({ t: 'shoot', w: 'six7', o: [-22, 1.55, 11], dirs: [[1, 0, 0]] });
  t.b.send({ t: 'slap', d: [1, 0, 0] });
  await sleep(50);
  assert.equal(playerOf(t.a).hp, 100, '차렷 중엔 공격 불가');
  await t.close();
});

for (const id of MAP_IDS) {
  const map = MAPS[id];
  const opts = { map };

  test(`맵 ${id}: 스폰은 끼지 않고 바닥에 서며, 픽업은 상자 안에 없다`, () => {
    for (const s of map.spawns) {
      const b = newBody(...s.pos);
      for (let i = 0; i < 60; i++) stepBodyFixed(b, { fwd: 0, right: 0, yaw: 0 }, 1 / 60, opts);
      assert.ok(b.onGround, `스폰 ${s.pos} 착지`);
      assert.ok(Math.abs(b.y - s.pos[1]) < 0.01, `스폰 ${s.pos} 높이 유지 (${b.y})`);
    }
    for (const p of map.pickups) {
      const inside = map.boxes.some((b) => p.pos.every((v, i) => v > b.min[i] && v < b.max[i]));
      assert.ok(!inside, `픽업 ${p.pos}`);
    }
  });

  test(`맵 ${id}: 점프대는 낭떠러지가 아닌 어딘가에 착지시킨다`, () => {
    for (const pad of map.pads) {
      const b = newBody(pad.pos[0], pad.pos[1], pad.pos[2]);
      b.onGround = true;
      let landed = false;
      for (let i = 0; i < 360 && !landed; i++) {
        stepBodyFixed(b, { fwd: 0, right: 0, yaw: 0 }, 1 / 60, opts);
        if (i > 10 && b.onGround) landed = true;
      }
      assert.ok(landed && b.y > -1, `패드 ${pad.pos}: x=${b.x} y=${b.y} z=${b.z}`);
    }
  });

  test(`맵 ${id}: 봇이 모든 스폰에서 다른 스폰까지 떨어지지 않고 걸어간다`, () => {
    const nav = navFor(map);
    const goal = map.spawns[0].pos;
    for (const s of map.spawns.slice(1)) {
      const b = newBody(...s.pos);
      const path = findPath(nav, b.x, b.z, goal[0], goal[2]);
      assert.ok(path.length > 0, `${s.pos} 경로 없음`);
      const end = path[path.length - 1];
      assert.ok(Math.hypot(end[0] - goal[0], end[1] - goal[2]) < 3, `${s.pos} 경로 끝이 멀다: ${end}`);
      let idx = 0, lastX = b.x, lastZ = b.z;
      for (let i = 0; i < 60 * 40; i++) {
        idx = advance(path, idx, b.x, b.z);
        const wp = path[idx];
        if (!wp) break;
        const yaw = Math.atan2(-(wp[0] - b.x), -(wp[1] - b.z));
        stepBodyFixed(b, { fwd: 1, right: 0, yaw, jump: false, dash: false }, 1 / 30, { map, speedMul: 0.82 });
        if (Math.hypot(b.x - lastX, b.z - lastZ) < 0.003 && b.onGround) { b.vy = 10; b.onGround = false; }
        lastX = b.x; lastZ = b.z;
        assert.ok(b.y > -3, `${s.pos}에서 출발해 추락: ${b.x},${b.z}`);
      }
      assert.ok(Math.hypot(b.x - end[0], b.z - end[1]) < 1.5, `${s.pos} 도착 실패: ${b.x},${b.y},${b.z} 목표 ${end}`);
    }
  });
}

test('오하이오: 계단으로 탑 위까지, 다리 점프대로 공중 명당까지', () => {
  const map = MAPS.ohio;
  const b = newBody(-22, 0, -6);
  for (let i = 0; i < 110; i++) stepBodyFixed(b, { fwd: 1, right: 0, yaw: 0 }, 1 / 60, { map });
  assert.ok(Math.abs(b.y - 4) < 0.01, `탑 높이여야 함: y=${b.y} z=${b.z}`);
  const pad = map.pads[0];
  const c = newBody(pad.pos[0], 0, pad.pos[2]);
  c.onGround = true;
  for (let i = 0; i < 240; i++) {
    stepBodyFixed(c, { fwd: 0, right: 0, yaw: 0 }, 1 / 60, { map });
    if (c.onGround && i > 10) break;
  }
  assert.ok(Math.abs(c.y - 6.6) < 0.01, `명당 착지: y=${c.y}`);
});

test('백룸: 점프대로 천장 위에 올라간다', () => {
  const map = MAPS.office;
  const pad = map.pads[0];
  const c = newBody(pad.pos[0], 0, pad.pos[2]);
  c.onGround = true;
  for (let i = 0; i < 240; i++) {
    stepBodyFixed(c, { fwd: 0, right: 0, yaw: 0 }, 1 / 60, { map });
    if (c.onGround && i > 10) break;
  }
  assert.ok(Math.abs(c.y - 5.6) < 0.01, `옥상 착지: y=${c.y} z=${c.z}`);
  assert.equal(groundAt(map, 0, 0, 1), 0);
});

test('레이: 벽 뒤 상대는 안 맞고, 뚫린 곳은 맞는다', () => {
  const map = MAPS.ohio;
  const o = [-20, 1.55, 0];
  const d = [1, 0.005, 0];
  const l = Math.hypot(...d);
  const nd = d.map((v) => v / l);
  const w = rayWorld(map, o, nd, 100);
  assert.ok(w < 8);
  assert.ok(rayPlayer(o, nd, [-16, 0, 0], false, w), '벽 앞 상대는 맞아야 함');
  assert.equal(rayPlayer(o, nd, [-12, 0, 0], false, w), null, '벽 뒤 상대는 안 맞아야 함');
});
