// 이동 물리. 클라이언트 본인 조작과 서버 봇이 같은 코드를 쓴다.
import { BOXES, JUMP_PADS } from './map.js';
import { PLAYER, MOVE } from './constants.js';

const R = PLAYER.radius, H = PLAYER.height;
const STEP_UP = 0.55;

export function newBody(x = 0, y = 0, z = 0) {
  return { x, y, z, vx: 0, vy: 0, vz: 0, onGround: false, jumps: 0, dashT: 0, dashCd: 0, dashX: 0, dashZ: 0 };
}

function hits(x, y, z) {
  for (const b of BOXES) {
    if (x + R > b.min[0] && x - R < b.max[0] && y + H > b.min[1] && y < b.max[1] && z + R > b.min[2] && z - R < b.max[2]) return b;
  }
  return null;
}

// 앞에 있는 턱의 맨 위까지 올라서는 데 필요한 높이
function stepHeight(x, y, z) {
  let top = y;
  for (const b of BOXES) {
    if (x + R > b.min[0] && x - R < b.max[0] && y + H > b.min[1] && y < b.max[1] && z + R > b.min[2] && z - R < b.max[2]) {
      if (b.max[1] > top) top = b.max[1];
    }
  }
  return top - y + 0.001;
}

function canStep(x, y, z) {
  const h = stepHeight(x, y, z);
  return h <= STEP_UP && !hits(x, y + h, z);
}

/**
 * input: { fwd, right, yaw, jump, dash } (jump/dash는 이번 프레임에 눌렸는지)
 * opts: { gravityMul, speedMul }
 * 반환: 소리 내기용 이벤트 목록 ('jump','doubleJump','pad','dash','land')
 */
export function stepBody(s, input, dt, opts = {}) {
  const ev = [];
  const gravity = MOVE.gravity * (opts.gravityMul ?? 1);
  const speed = MOVE.speed * (opts.speedMul ?? 1);
  const sin = Math.sin(input.yaw), cos = Math.cos(input.yaw);
  let wx = -sin * input.fwd + cos * input.right;
  let wz = -cos * input.fwd - sin * input.right;
  const len = Math.hypot(wx, wz);
  if (len > 1) { wx /= len; wz /= len; }
  const hasInput = len > 0.01;

  s.dashCd = Math.max(0, s.dashCd - dt);
  if (input.dash && s.dashCd <= 0) {
    const dx = hasInput ? wx : -sin, dz = hasInput ? wz : -cos;
    const l = Math.hypot(dx, dz) || 1;
    s.dashX = dx / l; s.dashZ = dz / l;
    s.dashT = MOVE.dashTime; s.dashCd = MOVE.dashCooldown;
    ev.push('dash');
  }

  if (input.jump) {
    if (s.onGround) { s.vy = MOVE.jump; s.onGround = false; s.jumps = 1; ev.push('jump'); }
    else if (s.jumps < 2) { s.vy = MOVE.doubleJump; s.jumps = 2; ev.push('doubleJump'); }
  }

  if (s.dashT > 0) {
    s.dashT -= dt;
    s.vx = s.dashX * MOVE.dashSpeed; s.vz = s.dashZ * MOVE.dashSpeed;
    s.vy = Math.max(s.vy, 0);
    if (s.dashT <= 0) { s.vx = s.dashX * speed; s.vz = s.dashZ * speed; }
  } else if (s.onGround) {
    const k = Math.min(1, 16 * dt);
    s.vx += (wx * speed - s.vx) * k;
    s.vz += (wz * speed - s.vz) * k;
  } else if (hasInput) {
    const k = Math.min(1, 5 * dt);
    s.vx += (wx * speed - s.vx) * k;
    s.vz += (wz * speed - s.vz) * k;
  }
  if (s.dashT <= 0) s.vy -= gravity * dt;

  // X
  let nx = s.x + s.vx * dt;
  if (hits(nx, s.y, s.z)) {
    if (s.onGround && canStep(nx, s.y, s.z)) s.y += stepHeight(nx, s.y, s.z);
    else { nx = s.x; s.vx = 0; }
  }
  s.x = nx;
  // Z
  let nz = s.z + s.vz * dt;
  if (hits(s.x, s.y, nz)) {
    if (s.onGround && canStep(s.x, s.y, nz)) s.y += stepHeight(s.x, s.y, nz);
    else { nz = s.z; s.vz = 0; }
  }
  s.z = nz;
  // Y
  const wasGround = s.onGround, fallV = s.vy;
  const ny = s.y + s.vy * dt;
  const hit = hits(s.x, ny, s.z);
  if (hit) {
    if (s.vy <= 0) {
      s.y = hit.max[1];
      s.onGround = true; s.jumps = 0;
      if (!wasGround && fallV < -9) ev.push('land');
    } else {
      s.y = hit.min[1] - H - 0.001;
    }
    s.vy = 0;
  } else {
    s.y = ny;
    s.onGround = false;
    if (wasGround && s.jumps === 0) s.jumps = 1; // 걸어서 떨어져도 공중 점프 1번은 남긴다
  }

  if (s.onGround) {
    for (const p of JUMP_PADS) {
      if (Math.hypot(s.x - p.pos[0], s.z - p.pos[2]) < p.radius && Math.abs(s.y - p.pos[1]) < 0.3) {
        s.vy = p.power; s.vx += p.push[0]; s.vz += p.push[2];
        s.onGround = false; s.jumps = 1;
        ev.push('pad');
        break;
      }
    }
  }
  return ev;
}

// 고정 스텝으로 잘라서 돌린다 (대시 중 벽 뚫림 방지)
export function stepBodyFixed(s, input, dt, opts) {
  const ev = [];
  let left = Math.min(dt, 0.1);
  let first = true;
  while (left > 1e-5) {
    const h = Math.min(left, 1 / 90);
    const i = first ? input : { ...input, jump: false, dash: false };
    ev.push(...stepBody(s, i, h, opts));
    left -= h; first = false;
  }
  return ev;
}
