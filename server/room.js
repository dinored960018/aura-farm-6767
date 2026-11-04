// 방 하나 = 대기실 + 경기 1판. 서버가 체력·킬·아우라·판정을 전부 결정한다.
import {
  TICK_HZ, MAX_HP, WIN_KILLS, MATCH_SECONDS, AURA_MAX, ULTRA_MS, INTERP_MS,
  WEAPONS, SLAP, AURA, CHICKEN_HEAL, BOMB, EVENTS, EVENT_IDS, PLAYER, DEFAULT_TIMINGS, SKIN_IDS,
} from '../shared/constants.js';
import { PICKUPS, FALL_Y, pickSpawn, rayWorld, rayPlayer, groundAt } from '../shared/map.js';
import { Bot } from './bot.js';

const finite = (v) => typeof v === 'number' && Number.isFinite(v);
const validVec = (v) => Array.isArray(v) && v.length === 3 && v.every(finite);
const round = (n) => Math.round(n * 100) / 100;
const BOT_NAMES = ['AI 민수', '연습용 NPC', '봇치더락', '오하이오 봇'];

export class Room {
  constructor(id, name, hub, timings = {}) {
    this.id = id;
    this.name = name;
    this.hub = hub;
    this.t = { ...DEFAULT_TIMINGS, ...timings };
    this.players = [];
    this.state = 'lobby';
    this.stateUntil = 0;
    this.matchEndsAt = 0;
    this.pickups = [];
    this.bombs = [];
    this.event = null;
    this.nextEventAt = 0;
    this.seq = 0;
  }

  // ---------- 대기실 ----------
  summary() {
    return { id: this.id, name: this.name, state: this.state, count: this.players.length };
  }

  roomMessage() {
    return {
      t: 'room',
      room: {
        id: this.id, name: this.name, state: this.state,
        players: this.players.map((p) => ({
          id: p.id, name: p.name, skin: p.skin, ready: p.ready, wins: p.wins, isBot: p.isBot,
        })),
      },
    };
  }

  broadcast(msg) {
    const raw = JSON.stringify(msg);
    for (const p of this.players) p.sendRaw(raw);
  }

  sendRoom() {
    this.broadcast(this.roomMessage());
    this.hub.roomsChanged();
  }

  add(player) {
    if (this.players.length >= 2 || this.state !== 'lobby') return false;
    player.room = this;
    player.ready = false;
    player.wins = 0;
    this.players.push(player);
    this.sendRoom();
    return true;
  }

  remove(player) {
    const i = this.players.indexOf(player);
    if (i < 0) return;
    this.players.splice(i, 1);
    player.room = null;
    const humans = this.players.filter((p) => !p.isBot);
    if (humans.length === 0) {
      this.players = [];
      this.hub.deleteRoom(this);
      return;
    }
    if (this.state === 'countdown' || this.state === 'playing') {
      this.endMatch(this.players[0], 'ragequit');
    } else if (this.state === 'results') {
      this.broadcast({ t: 'chat', from: '시스템', text: `${player.name} 도망침 ㅋㅋ` });
      this.sendRoom();
    } else {
      this.players.forEach((p) => { p.ready = p.isBot; });
      this.broadcast({ t: 'chat', from: '시스템', text: `${player.name} 나감. 쫄?` });
      this.sendRoom();
    }
  }

  addBot() {
    if (this.state !== 'lobby' || this.players.length >= 2) return;
    const bot = new Bot(this.hub.nextId(), BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)], SKIN_IDS[Math.floor(Math.random() * SKIN_IDS.length)]);
    bot.room = this;
    bot.ready = true;
    bot.wins = 0;
    this.players.push(bot);
    this.sendRoom();
    this.maybeStart();
  }

  removeBot() {
    if (this.state !== 'lobby') return;
    this.players = this.players.filter((p) => !p.isBot);
    this.sendRoom();
  }

  setReady(player, ready) {
    if (this.state !== 'lobby') return;
    player.ready = !!ready;
    this.sendRoom();
    this.maybeStart();
  }

  setSkin(player, skin) {
    if (this.state !== 'lobby' || !SKIN_IDS.includes(skin)) return;
    player.skin = skin;
    this.sendRoom();
  }

  chat(player, text) {
    const clean = String(text ?? '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, 120);
    if (clean) this.broadcast({ t: 'chat', from: player.name, text: clean });
  }

  maybeStart() {
    if (this.state === 'lobby' && this.players.length === 2 && this.players.every((p) => p.ready)) this.startMatch();
  }

  // ---------- 경기 ----------
  startMatch() {
    const now = Date.now();
    this.state = 'countdown';
    this.stateUntil = now + this.t.countdownMs;
    this.event = null;
    this.bombs = [];
    this.nextEventAt = now + this.t.countdownMs + this.t.eventFirstMs;
    this.matchEndsAt = now + this.t.countdownMs + MATCH_SECONDS * 1000;
    this.pickups = PICKUPS.map((p) => ({ ...p, active: true, respawnAt: 0 }));

    let prev = null;
    for (const p of this.players) {
      p.resetForMatch();
      this.placeAtSpawn(p, prev);
      prev = p.pos;
    }
    this.broadcast({
      t: 'matchStart',
      countdownMs: this.t.countdownMs,
      endsIn: this.matchEndsAt - now,
      players: this.players.map((p) => ({ id: p.id, name: p.name, skin: p.skin, pos: p.pos, yaw: p.yaw, isBot: p.isBot })),
      pickups: this.pickups.map((p) => p.active),
    });
    this.sendRoom();
  }

  placeAtSpawn(p, avoid) {
    const sp = pickSpawn(avoid);
    p.pos = [...sp.pos];
    p.yaw = sp.yaw;
    p.pitch = 0;
    p.history = [];
    p.alive = true;
    p.hp = MAX_HP;
    p.invulnUntil = Date.now() + this.t.invulnMs;
    p.emote = 0;
    if (p.isBot) p.onSpawn();
  }

  opponent(p) {
    return this.players.find((o) => o !== p) ?? null;
  }

  playStart() { return this.stateUntil; }
  isPlaying() { return this.state === 'playing'; }
  bigHead() { return this.event?.kind === 'bighead'; }

  tick(now, dt) {
    if (this.state === 'countdown') {
      if (now >= this.stateUntil) {
        this.state = 'playing';
        this.broadcast({ t: 'go' });
        this.sendRoom();
      }
      this.snapshot(now);
    } else if (this.state === 'playing') {
      this.tickPlaying(now, dt);
      if (this.state === 'playing') this.snapshot(now);
    } else if (this.state === 'results' && now >= this.stateUntil) {
      this.backToLobby();
    }
  }

  tickPlaying(now, dt) {
    for (const p of this.players) {
      if (p.isBot) p.think(this, now, dt);
      if (!p.alive) {
        if (now >= p.respawnAt) this.respawn(p);
        continue;
      }
      if (p.ultraUntil && now >= p.ultraUntil) {
        p.ultraUntil = 0;
        this.broadcast({ t: 'ultra', id: p.id, on: false });
      }
      if (p.emote === 1 && now - p.movedAt > 150) {
        this.addAura(p, AURA.farmPerSec * dt, null);
      }
      if (p.pos[1] < FALL_Y) {
        this.kill(p, this.opponent(p), { weapon: 'fall', head: false });
        if (this.state !== 'playing') return;
      }
    }
    for (let i = 0; i < this.pickups.length; i++) {
      const pk = this.pickups[i];
      if (!pk.active && now >= pk.respawnAt) {
        pk.active = true;
        this.broadcast({ t: 'pickup', i, active: true });
      }
    }
    this.tickBombs(now);
    if (this.state !== 'playing') return;
    this.tickEvents(now);
    if (now >= this.matchEndsAt) this.endByTime();
  }

  tickEvents(now) {
    if (this.event && now >= this.event.until) {
      this.event = null;
      this.broadcast({ t: 'event', kind: null });
    }
    if (!this.event && now >= this.nextEventAt) {
      const kind = EVENT_IDS[Math.floor(Math.random() * EVENT_IDS.length)];
      this.startEvent(kind, now);
    }
  }

  startEvent(kind, now = Date.now()) {
    const def = EVENTS[kind];
    this.event = { kind, until: now + def.ms };
    this.nextEventAt = now + def.ms + this.t.eventGapMs;
    this.broadcast({ t: 'event', kind, ms: def.ms });
    if (kind === 'dogfight') this.scheduleAirstrike(now);
  }

  scheduleAirstrike(now) {
    // 6발 + 7발. 양쪽을 조준하고, 나머지는 아무 데나.
    const targets = this.players.filter((p) => p.alive);
    for (let i = 0; i < 13; i++) {
      const anchor = targets.length && Math.random() < 0.7 ? targets[i % targets.length].pos : [0, 0, 0];
      const spread = 9;
      const x = Math.max(-26, Math.min(26, anchor[0] + (Math.random() - 0.5) * spread));
      const z = Math.max(-26, Math.min(26, anchor[2] + (Math.random() - 0.5) * spread));
      const y = Math.max(0, groundAt(x, z, anchor[1] + 1));
      const at = now + BOMB.fuseMs + (i < 6 ? i * 280 : 2000 + (i - 6) * 280);
      this.bombs.push({ pos: [x, y, z], at });
      this.broadcast({ t: 'bomb', pos: [round(x), round(y), round(z)], in: at - now });
    }
  }

  tickBombs(now) {
    if (!this.bombs.length) return;
    const due = this.bombs.filter((b) => now >= b.at);
    this.bombs = this.bombs.filter((b) => now < b.at);
    for (const b of due) {
      this.broadcast({ t: 'boom', pos: b.pos });
      for (const p of [...this.players]) {
        if (!p.alive) continue;
        const dx = p.pos[0] - b.pos[0], dy = p.pos[1] + 0.9 - b.pos[1], dz = p.pos[2] - b.pos[2];
        const d = Math.hypot(dx, dy, dz);
        if (d >= BOMB.radius) continue;
        const k = 1 - d / BOMB.radius;
        const l = d || 1;
        this.knock(p, [dx / l * BOMB.knock * k, 8 * k + 3, dz / l * BOMB.knock * k]);
        this.damage(p, this.opponent(p), BOMB.damage * k, { weapon: 'bomb', head: false, env: true, pos: p.pos });
        if (this.state !== 'playing') return;
      }
    }
  }

  // ---------- 클라이언트 입력 ----------
  onState(p, msg) {
    if (!this.isPlaying() && this.state !== 'countdown') return;
    if (!validVec(msg.p) || !finite(msg.y) || !finite(msg.pi)) return;
    if (!p.alive) return;
    const now = Date.now();
    if (this.state === 'playing') {
      const moved = Math.hypot(msg.p[0] - p.pos[0], msg.p[2] - p.pos[2]);
      if (moved > 0.02) p.movedAt = now;
      p.pos = [
        Math.max(-30, Math.min(30, msg.p[0])),
        Math.max(-60, Math.min(60, msg.p[1])),
        Math.max(-30, Math.min(30, msg.p[2])),
      ];
    }
    p.yaw = msg.y;
    p.pitch = Math.max(-1.6, Math.min(1.6, msg.pi));
    if (WEAPONS[msg.w]) p.weapon = msg.w;
    const em = msg.e === 1 || msg.e === 2 ? msg.e : 0;
    if (em === 2 && p.emote !== 2 && now - p.lastSixSeven > 2000) {
      p.lastSixSeven = now;
      this.addAura(p, AURA.sixSeven, '6-7');
    }
    p.emote = em;
    p.pushHistory(now);
    this.checkPickups(p, now);
  }

  checkPickups(p, now) {
    for (let i = 0; i < this.pickups.length; i++) {
      const pk = this.pickups[i];
      if (!pk.active) continue;
      if (Math.hypot(p.pos[0] - pk.pos[0], p.pos[1] + 0.9 - pk.pos[1], p.pos[2] - pk.pos[2]) > 1.9) continue;
      if (pk.kind === 'chicken' && p.hp >= MAX_HP) continue;
      pk.active = false;
      pk.respawnAt = now + this.t.pickupRespawnMs;
      if (pk.kind === 'chicken') p.hp = Math.min(MAX_HP, p.hp + CHICKEN_HEAL);
      else this.addAura(p, AURA.orb, '아우라 결정 획득');
      this.broadcast({ t: 'pickup', i, active: false, by: p.id, kind: pk.kind });
    }
  }

  onShoot(p, msg) {
    if (!this.isPlaying() || !p.alive) return;
    const w = WEAPONS[msg.w];
    if (!w || !validVec(msg.o) || !Array.isArray(msg.dirs) || msg.dirs.length === 0 || msg.dirs.length > w.pellets) return;
    const now = Date.now();
    const interval = w.interval * (p.ultraUntil ? 0.6 : 1) * 0.75 * 1000; // 네트워크 흔들림 허용치
    if (now - (p.lastShot[w.id] ?? 0) < interval) return;
    p.lastShot[w.id] = now;

    const eye = [p.pos[0], p.pos[1] + PLAYER.eye, p.pos[2]];
    const o = Math.hypot(msg.o[0] - eye[0], msg.o[1] - eye[1], msg.o[2] - eye[2]) < 3 ? msg.o : eye;

    const target = this.opponent(p);
    const targetPos = target?.alive && now >= target.invulnUntil ? target.rewound(now - p.rtt / 2 - INTERP_MS) : null;
    let total = 0, anyHead = false, hits = 0;
    const ends = [];
    p.stats.shots++;

    for (const raw of msg.dirs) {
      if (!validVec(raw)) continue;
      const l = Math.hypot(raw[0], raw[1], raw[2]);
      if (l < 0.5) continue;
      const d = [raw[0] / l, raw[1] / l, raw[2] / l];
      const worldT = rayWorld(o, d, w.range);
      const hit = targetPos ? rayPlayer(o, d, targetPos, this.bigHead(), worldT) : null;
      const t = hit ? hit.t : worldT;
      ends.push([round(o[0] + d[0] * t), round(o[1] + d[1] * t), round(o[2] + d[2] * t)]);
      if (hit) {
        hits++;
        total += hit.head ? w.head : w.body;
        if (hit.head) anyHead = true;
      }
    }

    const shot = JSON.stringify({ t: 'shot', id: p.id, w: w.id, o: o.map(round), ends });
    for (const q of this.players) if (q !== p) q.sendRaw(shot);

    if (hits > 0) {
      p.stats.hitShots++;
      if (anyHead) p.stats.headshots++;
      this.damage(target, p, total, { weapon: w.id, head: anyHead, pos: targetPos });
    }
  }

  onSlap(p, msg) {
    if (!this.isPlaying() || !p.alive || !validVec(msg.d)) return;
    const now = Date.now();
    if (now - p.lastSlap < SLAP.cooldown * 1000 * 0.8) return;
    p.lastSlap = now;
    this.broadcast({ t: 'slapFx', id: p.id });
    const target = this.opponent(p);
    if (!target?.alive || now < target.invulnUntil) return;
    const tp = target.rewound(now - p.rtt / 2 - INTERP_MS);
    const eye = [p.pos[0], p.pos[1] + PLAYER.eye, p.pos[2]];
    const c = [tp[0], tp[1] + 1, tp[2]];
    const to = [c[0] - eye[0], c[1] - eye[1], c[2] - eye[2]];
    const dist = Math.hypot(to[0], to[1], to[2]);
    if (dist > SLAP.range) return;
    const l = Math.hypot(msg.d[0], msg.d[1], msg.d[2]) || 1;
    const cos = dist < 0.01 ? 1 : (to[0] * msg.d[0] + to[1] * msg.d[1] + to[2] * msg.d[2]) / (dist * l);
    if (cos < 0.55) return;
    const norm = [to[0] / (dist || 1), to[1] / (dist || 1), to[2] / (dist || 1)];
    if (rayWorld(eye, norm, dist) < dist - 0.01) return;
    this.knock(target, [norm[0] * SLAP.knock, 9, norm[2] * SLAP.knock]);
    this.damage(target, p, SLAP.damage, { weapon: 'slap', head: false, pos: tp });
  }

  onUltra(p) {
    if (!this.isPlaying() || !p.alive || p.aura < AURA_MAX) return;
    p.aura = 0;
    p.ultraUntil = Date.now() + ULTRA_MS;
    this.broadcast({ t: 'ultra', id: p.id, on: true, ms: ULTRA_MS });
  }

  onFell(p) {
    if (this.isPlaying() && p.alive && p.pos[1] < FALL_Y + 8) {
      this.kill(p, this.opponent(p), { weapon: 'fall', head: false });
    }
  }

  // ---------- 판정 결과 ----------
  knock(p, v) {
    if (p.isBot) p.applyKnock(v);
    else p.send({ t: 'knock', v: v.map(round) });
  }

  damage(target, attacker, raw, info) {
    if (!target?.alive || Date.now() < target.invulnUntil) return;
    let dmg = raw;
    if (!info.env) {
      if (this.event?.kind === 'sixseven') dmg = 67;
      if (attacker?.ultraUntil) dmg *= 1.67;
    }
    dmg = round(dmg);
    target.hp = round(target.hp - dmg);
    if (attacker && !info.env) {
      attacker.stats.damage = round(attacker.stats.damage + dmg);
      this.addAura(attacker, info.head ? AURA.hitHead : AURA.hitBody, info.head ? '헤드샷' : null);
    }
    if (target.emote === 1) this.addAura(target, AURA.farmInterrupted, '파밍 중 처맞음');
    const dead = target.hp <= 0;
    this.broadcast({
      t: 'hit', to: target.id, from: attacker?.id ?? null, dmg, head: !!info.head, weapon: info.weapon,
      hp: Math.max(0, target.hp), pos: target.pos.map(round), dead,
    });
    if (dead) this.kill(target, attacker, info);
  }

  kill(victim, killer, info) {
    if (!victim.alive) return;
    const now = Date.now();
    victim.alive = false;
    victim.hp = 0;
    victim.emote = 0;
    victim.respawnAt = now + this.t.respawnMs;
    victim.stats.deaths++;
    if (victim.ultraUntil) {
      victim.ultraUntil = 0;
      this.broadcast({ t: 'ultra', id: victim.id, on: false });
    }
    const self = info.weapon === 'fall';
    this.addAura(victim, self ? AURA.fell : AURA.death, self ? '오하이오 추락' : '사망');
    if (killer) {
      killer.kills++;
      killer.stats.streak++;
      if (killer.stats.streak > killer.stats.bestStreak) killer.stats.bestStreak = killer.stats.streak;
      if (!self && info.weapon !== 'bomb') this.addAura(killer, AURA.kill, '킬');
    }
    victim.stats.streak = 0;
    this.broadcast({
      t: 'kill', victim: victim.id, killer: killer?.id ?? null, weapon: info.weapon, head: !!info.head,
      pos: victim.pos.map(round), killerKills: killer?.kills ?? 0, victimKills: victim.kills,
      respawnMs: this.t.respawnMs,
    });
    if (killer && killer.kills >= WIN_KILLS) this.endMatch(killer, 'kills');
  }

  respawn(p) {
    const opp = this.opponent(p);
    this.placeAtSpawn(p, opp?.alive ? opp.pos : null);
    this.broadcast({ t: 'spawn', id: p.id, pos: p.pos, yaw: p.yaw, invulnMs: this.t.invulnMs });
  }

  addAura(p, delta, reason) {
    const before = p.aura;
    p.aura = Math.max(0, Math.min(AURA_MAX, p.aura + delta));
    p.stats.auraEarned += Math.max(0, p.aura - before);
    if (reason) this.broadcast({ t: 'aura', id: p.id, delta: Math.round(delta), reason });
  }

  endByTime() {
    const [a, b] = this.players;
    let winner = null;
    if (a.kills !== b.kills) winner = a.kills > b.kills ? a : b;
    else if (Math.round(a.aura) !== Math.round(b.aura)) winner = a.aura > b.aura ? a : b;
    this.endMatch(winner, 'time');
  }

  endMatch(winner, reason) {
    if (this.state === 'results' || this.state === 'lobby') return;
    if (winner) winner.wins++;
    this.state = 'results';
    this.stateUntil = Date.now() + this.t.resultsMs;
    this.event = null;
    this.bombs = [];
    const loser = winner ? this.opponent(winner) : null;
    this.broadcast({
      t: 'matchEnd',
      winner: winner?.id ?? null,
      reason,
      sixSeven: !!(winner && loser && winner.kills === 7 && loser.kills === 6),
      resultsMs: this.t.resultsMs,
      players: this.players.map((p) => ({
        id: p.id, name: p.name, skin: p.skin, kills: p.kills, wins: p.wins,
        aura: Math.round(p.aura), stats: p.stats,
      })),
    });
    this.sendRoom();
  }

  backToLobby() {
    this.state = 'lobby';
    for (const p of this.players) p.ready = p.isBot;
    this.broadcast({ t: 'backToLobby' });
    this.sendRoom();
  }

  snapshot(now) {
    this.seq++;
    this.broadcast({
      t: 'snap',
      s: now,
      left: Math.max(0, this.matchEndsAt - now),
      players: this.players.map((p) => ({
        id: p.id, p: p.pos.map(round), y: round(p.yaw), pi: round(p.pitch),
        w: p.weapon, e: p.emote, hp: Math.max(0, Math.round(p.hp * 10) / 10), aura: Math.round(p.aura),
        k: p.kills, a: p.alive, u: !!p.ultraUntil, inv: now < p.invulnUntil,
      })),
    });
  }
}

export const TICK_MS = 1000 / TICK_HZ;
