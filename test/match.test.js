// 실제 서버를 띄우고 WebSocket 클라이언트 두 개로 한 판을 끝까지 돌린다.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { WebSocket } from 'ws';
import { startServer } from '../server/app.js';
import { WEAPONS, MOVE } from '../shared/constants.js';
import { BOXES, SPAWNS, JUMP_PADS, PICKUPS, rayPlayer, rayWorld } from '../shared/map.js';
import { newBody, stepBodyFixed } from '../shared/physics.js';

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

test('싸대기는 날려버리고, 아우라를 다 채우면 각성해서 데미지가 1.67배가 된다', async () => {
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

test('맵: 스폰·픽업은 벽에 안 끼고, 스폰에서 떨어지면 바닥에 선다', () => {
  for (const s of SPAWNS) {
    const b = newBody(...s.pos);
    for (let i = 0; i < 60; i++) stepBodyFixed(b, { fwd: 0, right: 0, yaw: 0 }, 1 / 60);
    assert.ok(b.onGround, `스폰 ${s.pos} 착지`);
    assert.ok(Math.abs(b.y - s.pos[1]) < 0.01, `스폰 ${s.pos} 높이 유지 (${b.y})`);
  }
  for (const p of PICKUPS) {
    const inside = BOXES.some((b) => p.pos.every((v, i) => v > b.min[i] && v < b.max[i]));
    assert.ok(!inside, `픽업 ${p.pos}`);
  }
  assert.ok(MOVE.speed > 0);
});

test('계단으로 탑 위까지 걸어 올라간다', () => {
  const b = newBody(-22, 0, -6);
  for (let i = 0; i < 110; i++) stepBodyFixed(b, { fwd: 1, right: 0, yaw: 0 }, 1 / 60);
  assert.ok(Math.abs(b.y - 4) < 0.01, `탑 높이여야 함: y=${b.y} z=${b.z}`);
});

test('다리 점프대로 공중 명당에 올라간다', () => {
  const pad = JUMP_PADS[0];
  const b = newBody(pad.pos[0], 0, pad.pos[2]);
  b.onGround = true;
  let top = 0;
  for (let i = 0; i < 240; i++) {
    stepBodyFixed(b, { fwd: 0, right: 0, yaw: 0 }, 1 / 60);
    top = Math.max(top, b.y);
    if (b.onGround && i > 10) break;
  }
  assert.ok(Math.abs(b.y - 6.6) < 0.01, `명당 착지: y=${b.y} z=${b.z} top=${top}`);
});

test('레이: 벽 뒤 상대는 안 맞고, 뚫린 곳은 맞는다', () => {
  const target = [-12, 0, 0];
  const o = [-20, 1.55, 0];
  const d = [1, 0.005, 0];
  const l = Math.hypot(...d);
  const nd = d.map((v) => v / l);
  // 벽 (-13..-11) 안쪽에 있는 상대
  assert.ok(rayWorld(o, nd, 100) < 8);
  const hit = rayPlayer(o, nd, [-16, 0, 0], false, rayWorld(o, nd, 100));
  assert.ok(hit, '벽 앞 상대는 맞아야 함');
  assert.equal(rayPlayer(o, nd, target, false, rayWorld(o, nd, 100)), null, '벽 뒤 상대는 안 맞아야 함');
});
