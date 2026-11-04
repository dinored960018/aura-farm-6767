// 머릿수 채우는 봇. 일부러 좀 멍청하다.
import { Player } from './player.js';
import { WEAPONS, LASER, PLAYER, MAX_HP, AURA_MAX } from '../shared/constants.js';
import { newBody, stepBodyFixed } from '../shared/physics.js';
import { groundAt, rayWorld } from '../shared/map.js';
import { navFor, findPath, advance } from './nav.js';

export class Bot extends Player {
  constructor(id, name, skin) {
    super(id, name, skin);
    this.isBot = true;
    this.body = newBody();
    this.nextDecide = 0;
    this.strafe = 1;
    this.nextShot = 0;
    this.seenSince = 0;
    this.nextEmote = 0;
    this.emoteUntil = 0;
    this.path = [];
    this.pathIdx = 0;
    this.nextPath = 0;
  }

  onSpawn() {
    this.body = newBody(...this.pos);
    this.seenSince = 0;
    this.path = [];
    this.nextPath = 0;
    this.nextEmote = Date.now() + 4000 + Math.random() * 6000;
  }

  teleport(pos) {
    this.pos = [...pos];
    this.body = newBody(...pos);
    this.path = [];
    this.nextPath = 0;
  }

  applyKnock(v) {
    this.body.vx += v[0];
    this.body.vy = Math.max(this.body.vy, v[1]);
    this.body.vz += v[2];
    this.body.onGround = false;
  }

  // 가깝고 보이는 상대 우선
  chooseTarget(room, eye, only = null) {
    let best = null, bestScore = Infinity;
    for (const o of only ? [only] : room.others(this)) {
      if (!o.alive) continue;
      const tgt = [o.pos[0], o.pos[1] + 1.1, o.pos[2]];
      const to = [tgt[0] - eye[0], tgt[1] - eye[1], tgt[2] - eye[2]];
      const dist = Math.hypot(to[0], to[1], to[2]) || 1;
      const dir = [to[0] / dist, to[1] / dist, to[2] / dist];
      const canSee = rayWorld(room.map, eye, dir, dist) >= dist - 0.05;
      const score = dist + (canSee ? 0 : 30);
      if (score < bestScore) { bestScore = score; best = { o, to, dist, dir, canSee }; }
    }
    return best;
  }

  think(room, now, dt) {
    if (!this.alive) return;
    const map = room.map;
    const eye = [this.pos[0], this.pos[1] + PLAYER.eye, this.pos[2]];
    const opts = { map, gravityMul: room.event?.kind === 'moon' ? 0.35 : 1, speedMul: this.ultraKind === 'shark' ? 1.5 : 0.82 };
    const stunned = now < this.stunUntil;
    const charmed = now < this.charmUntil && this.charmBy?.alive;
    const t = stunned ? null : this.chooseTarget(room, eye, charmed ? this.charmBy : null);
    if (!t) {
      stepBodyFixed(this.body, { fwd: 0, right: 0, yaw: this.yaw }, dt, opts);
      this.pos = [this.body.x, this.body.y, this.body.z];
      return;
    }
    const { o, to, dist, dir, canSee } = t;
    if (canSee) { if (!this.seenSince) this.seenSince = now; } else this.seenSince = 0;

    // 조준: 사람처럼 약간씩 늦게 돈다
    const wantYaw = Math.atan2(-to[0], -to[2]);
    let dy = wantYaw - this.yaw;
    while (dy > Math.PI) dy -= Math.PI * 2;
    while (dy < -Math.PI) dy += Math.PI * 2;
    this.yaw += dy * Math.min(1, 6 * dt);
    this.pitch = Math.asin(Math.max(-1, Math.min(1, dir[1])));

    if (now > this.nextDecide) {
      this.nextDecide = now + 500 + Math.random() * 1200;
      this.strafe = Math.random() < 0.5 ? -1 : 1;
    }

    // 안 보이고 한가하면 아우라 파밍
    if (!canSee && now > this.nextEmote) {
      this.emote = Math.random() < 0.7 ? 1 : 2;
      this.emoteUntil = now + 2500;
      this.nextEmote = now + 9000 + Math.random() * 7000;
    }
    const emoting = now < this.emoteUntil && !canSee;
    if (!emoting) { this.emote = 0; this.emoteUntil = 0; }

    // 각성은 상대가 보일 때 쓴다
    if (canSee && this.aura >= AURA_MAX && !this.ultraKind && !charmed) {
      room.onUltra(this);
      if (this.cat) return;
    }

    // 이동: 가까우면 좌우로 비비고, 멀면 길찾기
    const input = { fwd: 0, right: 0, yaw: this.yaw, jump: false, dash: false };
    if (!emoting) {
      if (canSee && dist <= 7 && !charmed && this.ultraKind !== 'shark') {
        input.fwd = dist < 4 ? -0.6 : 0;
        input.right = this.strafe;
        const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
        const wx = -sin * input.fwd + cos * input.right, wz = -cos * input.fwd - sin * input.right;
        const l = Math.hypot(wx, wz) || 1;
        if (groundAt(map, this.body.x + (wx / l) * 2.2, this.body.z + (wz / l) * 2.2, this.body.y + 1) < -0.5) {
          input.fwd = 0;
          input.right = 0; // 떨어지기 싫음
        }
      } else {
        if (now > this.nextPath) {
          this.nextPath = now + 600 + Math.random() * 300;
          this.path = findPath(navFor(map), this.body.x, this.body.z, o.pos[0], o.pos[2]);
          this.pathIdx = 0;
        }
        this.pathIdx = advance(this.path, this.pathIdx, this.body.x, this.body.z);
        const wp = this.path[this.pathIdx];
        if (wp) {
          input.yaw = Math.atan2(-(wp[0] - this.body.x), -(wp[1] - this.body.z));
          input.fwd = 1;
        }
      }
    }
    const before = [this.body.x, this.body.z];
    if (this.body.onGround && canSee && Math.random() < 0.006) input.jump = true;
    stepBodyFixed(this.body, input, dt, opts);
    const stuck = Math.hypot(this.body.x - before[0], this.body.z - before[1]) < 0.01;
    if (stuck && (input.fwd || input.right) && this.body.onGround) {
      this.body.vy = 10;
      this.body.onGround = false;
    }
    this.pos = [this.body.x, this.body.y, this.body.z];
    if (!stuck) this.movedAt = now;
    this.pushHistory(now);

    // 치킨 먹기
    if (this.hp < MAX_HP) room.checkPickups(this, now);

    // 사격
    if (canSee && !charmed && now - this.seenSince > 450 && now > this.nextShot) {
      if (dist < 3 && !room.isGrabbed(this)) {
        this.nextShot = now + 900;
        room.onSlap(this, { d: dir });
        return;
      }
      const w = this.ultraKind === 'minsu' ? LASER : dist < 9 ? WEAPONS.boom : dist < 22 ? WEAPONS.fart : WEAPONS.six7;
      if (w !== LASER) this.weapon = w.id;
      this.nextShot = now + w.interval * 1000 * (w.auto ? 1.3 : 1.8);
      const aimErr = 0.05 + dist * 0.0018;
      const dirs = [];
      for (let i = 0; i < w.pellets; i++) {
        const s = w.pellets > 1 ? w.spread : aimErr;
        const base = i === 0 && w.pellets > 1 ? [(Math.random() - 0.5) * aimErr, (Math.random() - 0.5) * aimErr, (Math.random() - 0.5) * aimErr] : [0, 0, 0];
        dirs.push([
          dir[0] + base[0] + (Math.random() - 0.5) * s * 2,
          dir[1] + base[1] + (Math.random() - 0.5) * s * 2,
          dir[2] + base[2] + (Math.random() - 0.5) * s * 2,
        ]);
      }
      room.onShoot(this, { w: w.id, o: eye, dirs });
    }
  }
}
