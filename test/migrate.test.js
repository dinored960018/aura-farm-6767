// 방장 이전: 방장 브라우저가 꺼져도 남은 사람이 새 방장이 되어 점수·남은 시간 그대로 이어서 한다
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHub } from '../server/hub.js';

const T = { countdownMs: 300, eventFirstMs: 999999, invulnMs: 0, respawnMs: 800, resultsMs: 4000 };

function join(hub, { local = false, name, was } = {}) {
  const inbox = [];
  const c = hub.connect((raw) => inbox.push(JSON.parse(raw)), { local });
  const send = (m) => c.message(JSON.stringify(m));
  send({ t: 'hello', name, skin: 'minsu', ...(was ? { was } : {}) });
  const id = inbox.find((m) => m.t === 'welcome').id;
  return { c, id, inbox, send, last: (t) => inbox.filter((m) => m.t === t).at(-1) };
}

test('방장이 나가면 이어받는 사람이 같은 점수·남은 시간으로 경기를 잇는다', () => {
  const a = createHub({ timings: T, autoTick: false, migrate: true });
  const host = join(a, { local: true, name: 'Host' });
  host.send({ t: 'create', name: 'Room' });
  host.send({ t: 'addBot' });
  const g1 = join(a, { name: 'G1' });
  const g2 = join(a, { name: 'G2' });
  const roomId = host.last('room').room.id;
  g1.send({ t: 'join', id: roomId });
  g2.send({ t: 'join', id: roomId });
  for (const p of [host, g1, g2]) p.send({ t: 'ready', ready: true });
  const room = a.rooms.get(roomId);
  assert.equal(room.state, 'countdown');
  room.stateUntil = 0;
  a.tick();
  assert.equal(room.state, 'playing');

  const p1 = room.players.find((p) => p.id === g1.id);
  const bot = room.players.find((p) => p.isBot);
  p1.kills = 3; p1.aura = 500; p1.stats.deaths = 1;
  bot.kills = 2;
  room.lastHeir = 0;
  a.tick();

  // 이어받을 사람은 방장 말고 먼저 온 G1. G1만 상태를 받는다
  const h1 = g1.last('heir');
  const h2 = g2.last('heir');
  assert.ok(h1?.save && !h2?.save && !host.last('heir'));
  assert.equal(h1.heir, g1.id);
  assert.equal(h2.heir, g1.id);
  assert.equal(h1.code, h2.code);
  assert.ok(h1.save.msLeft > 200000);

  // 방장 브라우저가 꺼짐 → G1 브라우저에 새 허브
  const b = createHub({ timings: T, autoTick: false, migrate: true });
  const restored = b.restore(h1.save);
  assert.equal(restored.state, 'lobby');
  const n1 = join(b, { local: true, name: 'G1', was: g1.id });
  n1.send({ t: 'join', id: restored.id });
  const start = n1.last('matchStart');
  assert.ok(start, '이어받은 사람이 들어오면 바로 경기 재개');
  assert.equal(start.map, room.map.id);
  assert.ok(start.countdownMs <= 3000);
  assert.ok(Math.abs(start.endsIn - start.countdownMs - h1.save.msLeft) < 1000);
  const me = restored.players.find((p) => p.id === n1.id);
  assert.equal(me.kills, 3);
  assert.equal(me.aura, 500);
  assert.equal(me.stats.deaths, 1);
  assert.equal(restored.players.find((p) => p.isBot && p.name === bot.name)?.kills, 2);

  // 다른 손님도 옛 아이디로 들어오면 경기 중이라도 바로 합류
  const n2 = join(b, { name: 'G2', was: g2.id });
  n2.send({ t: 'join', id: restored.id });
  assert.ok(n2.last('matchStart')?.dropIn);
  assert.equal(restored.players.filter((p) => !p.isBot).length, 2);

  // 모르는 사람은 비공개 방 경기 중에 못 들어온다
  const x = join(b, { name: 'X' });
  x.send({ t: 'join', id: restored.id });
  assert.equal(x.last('error')?.key, 'err.roomFull');
});

test('대기실에서 방장이 나가면 대기실로 이어지고 승수는 남는다', () => {
  const a = createHub({ timings: T, autoTick: false, migrate: true });
  const host = join(a, { local: true, name: 'Host' });
  host.send({ t: 'create', name: 'Room' });
  const g1 = join(a, { name: 'G1' });
  g1.send({ t: 'join', id: host.last('room').room.id });
  a.rooms.values().next().value.players.find((p) => p.id === g1.id).wins = 2;
  a.tick();
  const save = g1.last('heir').save;
  assert.equal(save.msLeft, 0);

  const b = createHub({ timings: T, autoTick: false, migrate: true });
  const r = b.restore(save);
  const n1 = join(b, { local: true, name: 'G1', was: g1.id });
  n1.send({ t: 'join', id: r.id });
  assert.equal(r.state, 'lobby');
  assert.ok(!n1.last('matchStart'));
  assert.equal(r.players.find((p) => p.id === n1.id).wins, 2);
});

test('서버(Node)에서는 이어받기 메시지를 보내지 않는다', () => {
  const a = createHub({ timings: T, autoTick: false });
  const host = join(a, { name: 'Host' });
  host.send({ t: 'create', name: 'Room' });
  const g1 = join(a, { name: 'G1' });
  g1.send({ t: 'join', id: host.last('room').room.id });
  a.tick();
  assert.ok(!g1.last('heir') && !host.last('heir'));
});
