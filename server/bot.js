// 혼자 연습할 때 쓰는 봇. 일부러 좀 멍청하다.
import { Player } from './player.js';
import { WEAPONS, PLAYER, MAX_HP } from '../shared/constants.js';
import { newBody, stepBodyFixed } from '../shared/physics.js';
import { groundAt, rayWorld } from '../shared/map.js';

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
  }

  onSpawn() {
    this.body = newBody(...this.pos);
    this.seenSince = 0;
    this.nextEmote = Date.now() + 4000 + Math.random() * 6000;
  }

  applyKnock(v) {
    this.body.vx += v[0];
    this.body.vy = Math.max(this.body.vy, v[1]);
    this.body.vz += v[2];
    this.body.onGround = false;
  }

  think(room, now, dt) {
    if (!this.alive) return;
    const opp = room.opponent(this);
    if (!opp) return;

    const eye = [this.pos[0], this.pos[1] + PLAYER.eye, this.pos[2]];
    const tgt = [opp.pos[0], opp.pos[1] + 1.1, opp.pos[2]];
    const to = [tgt[0] - eye[0], tgt[1] - eye[1], tgt[2] - eye[2]];
    const dist = Math.hypot(to[0], to[1], to[2]) || 1;
    const dir = [to[0] / dist, to[1] / dist, to[2] / dist];
    const canSee = opp.alive && rayWorld(eye, dir, dist) >= dist - 0.05;

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
    const emoting = now < this.emoteUntil;
    if (!emoting || canSee) { this.emote = 0; this.emoteUntil = 0; }

    // 이동
    let fwd = 0, right = 0, jump = false;
    if (!emoting || canSee) {
      fwd = dist > 7 ? 1 : dist < 4 ? -0.6 : 0;
      right = canSee ? this.strafe : 0;
    }
    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    const wx = -sin * fwd + cos * right, wz = -cos * fwd - sin * right;
    if (wx || wz) {
      // 앞이 구멍이면 옆으로 돌아간다
      const l = Math.hypot(wx, wz) || 1;
      const ax = this.body.x + (wx / l) * 2.4, az = this.body.z + (wz / l) * 2.4;
      if (groundAt(ax, az, this.body.y + 1) < -0.5) {
        const flipped = this.body.vx * cos - this.body.vz * sin;
        right = flipped >= 0 ? 1 : -1;
        fwd = 0;
        this.strafe = right;
      }
    }
    const before = [this.body.x, this.body.z];
    if (this.body.onGround && Math.random() < 0.006) jump = true;
    const opts = { gravityMul: room.event?.kind === 'moon' ? 0.35 : 1, speedMul: 0.82 };
    stepBodyFixed(this.body, { fwd, right, yaw: this.yaw, jump, dash: false }, dt, opts);
    const stuck = Math.hypot(this.body.x - before[0], this.body.z - before[1]) < 0.01;
    if (stuck && (fwd || right) && this.body.onGround) {
      this.body.vy = 10;
      this.body.onGround = false;
    }
    this.pos = [this.body.x, this.body.y, this.body.z];
    this.movedAt = stuck ? this.movedAt : now;
    this.pushHistory(now);

    // 치킨 먹기
    if (this.hp < MAX_HP) room.checkPickups(this, now);

    // 사격
    if (canSee && now - this.seenSince > 450 && now > this.nextShot && now >= room.playStart(this)) {
      if (dist < 3) {
        this.nextShot = now + 900;
        room.onSlap(this, { d: dir });
        return;
      }
      const w = dist < 9 ? WEAPONS.boom : dist < 22 ? WEAPONS.fart : WEAPONS.six7;
      this.weapon = w.id;
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
