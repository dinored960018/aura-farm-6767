// 경기장: 56x56, 가운데는 오하이오로 떨어지는 구멍.
const B = (x0, y0, z0, x1, y1, z1, color, opts = {}) => ({
  min: [x0, y0, z0], max: [x1, y1, z1], color, ...opts,
});

const FLOOR = 0x3b2e6e, WALL = 0xff3d81, CRATE = 0xffb400, PLAT = 0x18c5c9, STEP = 0x7c4dff, BRIDGE = 0x39d353;

function mirrored(list) {
  // 공정한 1대1을 위해 점대칭으로 복제
  const out = [];
  for (const b of list) {
    out.push(b);
    out.push({ ...b, min: [-b.max[0], b.min[1], -b.max[2]], max: [-b.min[0], b.max[1], -b.min[2]] });
  }
  return out;
}

function stairs(x, z, dz, n, w, color) {
  // z 방향으로 올라가는 계단. 한 칸 높이 0.5
  const out = [];
  for (let i = 0; i < n; i++) {
    const cz = z + dz * i;
    out.push(B(x - w / 2, 0, cz - 0.5, x + w / 2, 0.5 * (i + 1), cz + 0.5, color));
  }
  return out;
}

export const BOXES = [
  // 바닥
  B(-28, -2, -28, 28, 0, -7, FLOOR, { floor: true }),
  B(-28, -2, 7, 28, 0, 28, FLOOR, { floor: true }),
  B(-28, -2, -7, -7, 0, 7, FLOOR, { floor: true }),
  B(7, -2, -7, 28, 0, 7, FLOOR, { floor: true }),
  // 다리
  B(-7, -1, -1.75, 7, 0, 1.75, BRIDGE),
  B(-1.75, -1, -7, 1.75, 0, -1.75, BRIDGE),
  B(-1.75, -1, 1.75, 1.75, 0, 7, BRIDGE),
  // 외벽
  B(-29, -2, -29, 29, 12, -28, WALL, { wall: true }),
  B(-29, -2, 28, 29, 12, 29, WALL, { wall: true }),
  B(-29, -2, -28, -28, 12, 28, WALL, { wall: true }),
  B(28, -2, -28, 29, 12, 28, WALL, { wall: true }),
  // 공중 명당
  B(-4, 6, -4, 4, 6.6, 4, PLAT),
  ...mirrored([
    // 모서리 탑 + 계단
    B(-27, 0, -27, -17, 4, -17, PLAT),
    ...stairs(-22, -9.5, -1, 8, 4, STEP),
    // 엄폐물
    B(-14, 0, -14, -11, 2.4, -11, CRATE),
    B(-10, 0, -21, -7, 1.6, -18, CRATE),
    B(-13, 0, -3.5, -11, 3, 3.5, WALL),
    B(-3, 0, -24, 3, 3, -22.5, WALL),
    B(9, 0, -16, 12.5, 2.2, -12.5, CRATE),
    B(16, 0, -24, 22, 1.2, -18, STEP),
    B(17.5, 1.2, -22.5, 20.5, 2.6, -19.5, CRATE),
    B(-25, 0, 4, -21, 2, 8, CRATE),
  ]),
];

export const JUMP_PADS = [
  { pos: [0, 0, -6], radius: 1, power: 21, push: [0, 0, 2.6] },
  { pos: [0, 0, 6], radius: 1, power: 21, push: [0, 0, -2.6] },
  { pos: [-6, 0, 0], radius: 1, power: 21, push: [2.6, 0, 0] },
  { pos: [6, 0, 0], radius: 1, power: 21, push: [-2.6, 0, 0] },
  { pos: [24, 0, -1], radius: 1.4, power: 17, push: [-5, 0, 0] },
  { pos: [-24, 0, 1], radius: 1.4, power: 17, push: [5, 0, 0] },
];

export const SPAWNS = [
  { pos: [-22, 4, -22], yaw: -Math.PI * 0.75 },
  { pos: [22, 4, 22], yaw: Math.PI * 0.25 },
  { pos: [-24, 0, 22], yaw: -Math.PI * 0.25 },
  { pos: [24, 0, -22], yaw: Math.PI * 0.75 },
  { pos: [-17, 0, -3], yaw: -Math.PI / 2 },
  { pos: [17, 0, 3], yaw: Math.PI / 2 },
];

export const PICKUPS = [
  { kind: 'chicken', pos: [-20, 4.4, -20] },
  { kind: 'chicken', pos: [20, 4.4, 20] },
  { kind: 'chicken', pos: [-8.5, 0.4, 13] },
  { kind: 'chicken', pos: [8.5, 0.4, -13] },
  { kind: 'orb', pos: [0, 7.2, 0] },
];

export const FALL_Y = -25;

export function groundAt(x, z, fromY = 100) {
  let top = -Infinity;
  for (const b of BOXES) {
    if (x > b.min[0] && x < b.max[0] && z > b.min[2] && z < b.max[2] && b.max[1] <= fromY && b.max[1] > top) top = b.max[1];
  }
  return top;
}

// 슬랩 레이캐스트. 안 맞으면 Infinity.
export function rayAABB(o, d, min, max, maxT = Infinity) {
  let t0 = 0, t1 = maxT;
  for (let i = 0; i < 3; i++) {
    if (Math.abs(d[i]) < 1e-8) {
      if (o[i] < min[i] || o[i] > max[i]) return Infinity;
    } else {
      const inv = 1 / d[i];
      let a = (min[i] - o[i]) * inv, b = (max[i] - o[i]) * inv;
      if (a > b) [a, b] = [b, a];
      if (a > t0) t0 = a;
      if (b < t1) t1 = b;
      if (t0 > t1) return Infinity;
    }
  }
  return t0;
}

export function raySphere(o, d, c, r) {
  const ox = o[0] - c[0], oy = o[1] - c[1], oz = o[2] - c[2];
  const b = ox * d[0] + oy * d[1] + oz * d[2];
  const q = ox * ox + oy * oy + oz * oz - r * r;
  const disc = b * b - q;
  if (disc < 0) return Infinity;
  const t = -b - Math.sqrt(disc);
  return t >= 0 ? t : (q < 0 ? 0 : Infinity);
}

export function rayWorld(o, d, maxT = 200) {
  let best = maxT;
  for (const b of BOXES) {
    const t = rayAABB(o, d, b.min, b.max, best);
    if (t < best) best = t;
  }
  return best;
}

// 플레이어 판정: 대두 시대에는 머리 판정이 커진다.
export const HITBOX = {
  headY: 1.6, headR: 0.55, bigHeadY: 1.95, bigHeadR: 1.15,
  bodyHalf: 0.55, bodyTop: 1.25,
};

export function rayPlayer(o, d, p, bigHead = false, maxT = 200) {
  const headY = bigHead ? HITBOX.bigHeadY : HITBOX.headY;
  const headR = bigHead ? HITBOX.bigHeadR : HITBOX.headR;
  const th = raySphere(o, d, [p[0], p[1] + headY, p[2]], headR);
  const tb = rayAABB(o, d,
    [p[0] - HITBOX.bodyHalf, p[1], p[2] - HITBOX.bodyHalf],
    [p[0] + HITBOX.bodyHalf, p[1] + HITBOX.bodyTop, p[2] + HITBOX.bodyHalf], maxT);
  if (th === Infinity && tb === Infinity) return null;
  if (th <= tb) return th <= maxT ? { t: th, head: true } : null;
  return tb <= maxT ? { t: tb, head: false } : null;
}

function dist2(a, b) { return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2; }

export function pickSpawn(avoid) {
  if (!avoid) return SPAWNS[Math.floor(Math.random() * SPAWNS.length)];
  const ranked = [...SPAWNS].sort((a, b) => dist2(b.pos, avoid) - dist2(a.pos, avoid));
  return ranked[Math.floor(Math.random() * 2)];
}
