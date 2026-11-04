// 맵 3개. 서버와 브라우저가 같은 데이터를 쓴다. 충돌은 boxes, 장식은 decor.
const B = (x0, y0, z0, x1, y1, z1, kind, opts = {}) => ({
  min: [x0, y0, z0], max: [x1, y1, z1], kind, ...opts,
});

// (x, z) -> (-z, x) 를 k번
function rotXZ(x, z, k) {
  for (let i = 0; i < k; i++) [x, z] = [-z, x];
  return [x, z];
}
function rotBox(b, k) {
  const [ax, az] = rotXZ(b.min[0], b.min[2], k);
  const [bx, bz] = rotXZ(b.max[0], b.max[2], k);
  return {
    ...b,
    min: [Math.min(ax, bx), b.min[1], Math.min(az, bz)],
    max: [Math.max(ax, bx), b.max[1], Math.max(az, bz)],
  };
}
const rotAll = (list, ks) => ks.flatMap((k) => list.map((b) => rotBox(b, k)));
const FOUR = [0, 1, 2, 3];
const TWO = [0, 2];

function rotPads(list, ks) {
  return ks.flatMap((k) => list.map((p) => {
    const [x, z] = rotXZ(p.pos[0], p.pos[2], k);
    const [px, pz] = rotXZ(p.push[0], p.push[2], k);
    return { ...p, pos: [x, p.pos[1], z], push: [px, 0, pz] };
  }));
}
function rotPoints(list, ks) {
  return ks.flatMap((k) => list.map(([x, y, z]) => {
    const [a, b] = rotXZ(x, z, k);
    return [a, y, b];
  }));
}
// 스폰은 맵 가운데를 바라본다
const spawnsFrom = (points) => points.map((pos) => ({ pos, yaw: Math.atan2(pos[0], pos[2]) }));

function stairs(x, z, dz, n, w, kind, stepH = 0.5) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const cz = z + dz * i;
    out.push(B(x - w / 2, 0, cz - 0.5, x + w / 2, stepH * (i + 1), cz + 0.5, kind));
  }
  return out;
}

// ---------- 1. 오하이오 구덩이 ----------
const ohio = {
  id: 'ohio',
  name: '오하이오 구덩이',
  emoji: '🕳️',
  desc: '가운데 구멍 + 공중 명당',
  bounds: 29,
  fallY: -25,
  showcase: { pos: [0, 0, 0], r: 7.4 },
  boxes: [
    B(-28, -2, -28, 28, 0, -7, 'floor', { floor: true }),
    B(-28, -2, 7, 28, 0, 28, 'floor', { floor: true }),
    B(-28, -2, -7, -7, 0, 7, 'floor', { floor: true }),
    B(7, -2, -7, 28, 0, 7, 'floor', { floor: true }),
    B(-7, -1, -1.75, 7, 0, 1.75, 'bridge'),
    B(-1.75, -1, -7, 1.75, 0, -1.75, 'bridge'),
    B(-1.75, -1, 1.75, 1.75, 0, 7, 'bridge'),
    B(-29, -2, -29, 29, 12, -28, 'wall', { wall: true }),
    B(-29, -2, 28, 29, 12, 29, 'wall', { wall: true }),
    B(-29, -2, -28, -28, 12, 28, 'wall', { wall: true }),
    B(28, -2, -28, 29, 12, 28, 'wall', { wall: true }),
    B(-4, 6, -4, 4, 6.6, 4, 'plat'),
    ...rotAll([
      B(-27, 0, -27, -17, 4, -17, 'plat'),
      ...stairs(-22, -9.5, -1, 8, 4, 'step'),
      B(-14, 0, -14, -11, 2.4, -11, 'crate'),
      B(-10, 0, -21, -7, 1.6, -18, 'crate'),
      B(-13, 0, -3.5, -11, 3, 3.5, 'wall'),
      B(-3, 0, -24, 3, 3, -22.5, 'wall'),
      B(9, 0, -16, 12.5, 2.2, -12.5, 'crate'),
      B(16, 0, -24, 22, 1.2, -18, 'step'),
      B(17.5, 1.2, -22.5, 20.5, 2.6, -19.5, 'crate'),
      B(-25, 0, 4, -21, 2, 8, 'crate'),
    ], TWO),
  ],
  decor: [],
  pads: [
    { pos: [0, 0, -6], radius: 1, power: 21, push: [0, 0, 2.6] },
    { pos: [0, 0, 6], radius: 1, power: 21, push: [0, 0, -2.6] },
    { pos: [-6, 0, 0], radius: 1, power: 21, push: [2.6, 0, 0] },
    { pos: [6, 0, 0], radius: 1, power: 21, push: [-2.6, 0, 0] },
    { pos: [24, 0, -1], radius: 1.4, power: 17, push: [-5, 0, 0] },
    { pos: [-24, 0, 1], radius: 1.4, power: 17, push: [5, 0, 0] },
  ],
  spawns: spawnsFrom([[-22, 4, -22], [22, 4, 22], [-24, 0, 22], [24, 0, -22], [-17, 0, -3], [17, 0, 3]]),
  pickups: [
    { kind: 'chicken', pos: [-20, 4.4, -20] },
    { kind: 'chicken', pos: [20, 4.4, 20] },
    { kind: 'chicken', pos: [-8.5, 0.4, 13] },
    { kind: 'chicken', pos: [8.5, 0.4, -13] },
    { kind: 'orb', pos: [0, 7.2, 0] },
  ],
  theme: {
    sky: [[0, '#12062e'], [0.45, '#7a1fa2'], [0.56, '#ff4fa3'], [0.62, '#ffb347'], [1, '#25083f']],
    fog: [0x4a1b6d, 45, 150],
    hemi: [0xffe0f0, 0x31206b, 2.1],
    sun: 1.5,
    tex: {
      floor: { base: '#3b2e6e', line: '#46367f', checker: true, label: '67' },
      wall: { base: '#ff5c95', line: '#c7215f' },
      crate: { base: '#ffc233', line: '#b57a00' },
      plat: { base: '#2ad3d7', line: '#07898c' },
      step: { base: '#8d63ff', line: '#5a2fd1' },
      bridge: { base: '#46e063', line: '#1d8c34' },
    },
    signs: [
      [['6767'], '#000', '#ffee00', [0, 8, -27.97], 0, 20],
      [['ONLY IN', 'OHIO'], '#14002e', '#ff5f1f', [0, 8, 27.97], Math.PI, 20],
      [['SKILL', 'ISSUE'], '#fff', '#e00', [-27.97, 8, -12], Math.PI / 2, 16],
      [['SIGMA', '🗿 GRINDSET'], '#111', '#fff', [-27.97, 8, 12], Math.PI / 2, 16],
      [['어쩔티비', '저쩔티비'], '#00154a', '#00e5ff', [27.97, 8, -12], -Math.PI / 2, 16],
      [['AURA', '+6767'], '#2a1a00', '#ffd700', [27.97, 8, 12], -Math.PI / 2, 16],
    ],
    pit: { pos: [0, -16, 0], size: 14, lines: ['OHIO', '↓↓↓'], bg: '#3a0000', fg: '#ff3b00' },
    big67: [0, 15.5, 0],
  },
};

// ---------- 2. 시그마 옥상: 벽 없음. 싸대기 맞으면 떨어진다 ----------
const CITY = [[-60, 40, 14], [55, 52, 12], [-48, -58, 16], [60, -44, 14], [0, 70, 18], [-74, -6, 12], [72, 10, 15], [8, -74, 16]];
const roof = {
  id: 'roof',
  name: '시그마 옥상',
  emoji: '🌆',
  desc: '벽 없음. 밀리면 추락',
  bounds: 40,
  fallY: -25,
  showcase: { pos: [0, 0, 0], r: 7.4 },
  boxes: [
    B(-12, -3, -12, 12, 0, 12, 'floor', { floor: true }),
    ...rotAll([
      B(20, -3, -9, 36, 0, 9, 'floor', { floor: true }),
      B(12, -1, -2, 20, 0, 2, 'bridge'),
      B(6, 0, 6, 9, 2, 9, 'crate'),
      B(8, 0, -2, 9, 1.5, 2, 'wall'),
      B(29, 0, -3, 35, 2.5, 5, 'plat'),
      ...stairs(32, -7.5, 1, 5, 4, 'step'),
      B(22, 0, 3, 25, 1.5, 6, 'crate'),
      B(22, 0, -8, 24, 2.4, -6, 'crate'),
      B(35, 0, 5, 36, 1, 9, 'wall'),
    ], FOUR),
  ],
  decor: [
    B(-12, -90, -12, 12, -3, 12, 'city'),
    ...rotAll([B(20, -90, -9, 36, -3, 9, 'city')], FOUR),
    ...CITY.map(([x, z, w]) => B(x - w / 2, -90, z - w / 2, x + w / 2, -12 - (Math.abs(x + z) % 16), z + w / 2, 'city')),
  ],
  pads: rotPads([{ pos: [26, 0, 7.5], radius: 1, power: 17, push: [-13.2, 0, 13.2] }], FOUR),
  spawns: spawnsFrom(rotPoints([[31, 2.5, 1], [24, 0, 0], [-5, 0, -9]], FOUR)),
  pickups: [
    ...rotPoints([[0, 0.4, 9.5]], FOUR).map((pos) => ({ kind: 'chicken', pos })),
    { kind: 'orb', pos: [32, 3.3, 1] },
    { kind: 'orb', pos: [-32, 3.3, -1] },
  ],
  theme: {
    sky: [[0, '#1b2a6b'], [0.42, '#c84b7a'], [0.5, '#ff9248'], [0.56, '#ffd76a'], [0.62, '#5c2d55'], [1, '#14102a']],
    fog: [0xc46a6a, 60, 220],
    hemi: [0xfff0d8, 0x5a3a55, 2.2],
    sun: 1.7,
    tex: {
      floor: { base: '#6a6a78', line: '#5c5c69', checker: true, label: '🗿' },
      wall: { base: '#d94f3d', line: '#8f2d20' },
      crate: { base: '#8fd14f', line: '#4f8a1c' },
      plat: { base: '#f2b134', line: '#a8740f' },
      step: { base: '#4aa8ff', line: '#1a64b8' },
      bridge: { base: '#ffe066', line: '#000000' },
      city: { base: '#2c2f4a', line: '#ffd76a', windows: true },
    },
    signs: [
      [['SIGMA', 'ROOFTOP'], '#000', '#ffd700', [0, 11, -38], 0, 22],
      [['떨어지면', '-2000 AURA'], '#fff', '#e00', [0, 11, 38], Math.PI, 22],
      [['MOGGED'], '#14002e', '#ff5fa2', [-38, 11, 0], Math.PI / 2, 22],
      [['GRINDSET', 'NEVER STOP'], '#0a2a12', '#7dff8e', [38, 11, 0], -Math.PI / 2, 22],
    ],
    pit: null,
    big67: [0, 19, 0],
  },
};

// ---------- 3. 백룸 사무실: 좁은 복도, 샷건 천국. 천장 위로도 올라간다 ----------
const lamps = [];
for (const [x, z] of [[-20, -18], [-20, -11], [-14, -18], [-9, -16], [-15, -11], [-21, -3], [-14, -4], [-9, -11]]) {
  lamps.push(B(x, 4.96, z, x + 3, 5, z + 1, 'lamp'));
}
const office = {
  id: 'office',
  name: '백룸 사무실',
  emoji: '🏢',
  desc: '좁은 복도 + 옥상 2층',
  bounds: 25,
  fallY: -25,
  showcase: { pos: [0, 0, 0], r: 5.6 },
  boxes: [
    B(-24, -1, -24, 24, 0, 24, 'floor', { floor: true }),
    ...rotAll([
      B(-25, -1, -25, 25, 9, -24, 'wall', { wall: true }),
      // 천장: 가운데가 뚫려 있다
      B(-24, 5, -24, 24, 5.6, -6, 'plat'),
      // 칸막이
      B(-18, 0, -24, -17, 5, -14, 'wall'),
      B(-24, 0, -8, -12, 5, -7, 'wall'),
      B(-12, 0, -20, -11, 5, -12, 'wall'),
      B(-8, 0, -8, -7, 5, -3, 'wall'),
      // 책상
      B(-23, 0, -23, -20, 1.1, -21, 'crate'),
      B(-16, 0, -5, -13, 1.1, -3.5, 'crate'),
      B(-7, 0, -22, -3, 1.1, -20.5, 'crate'),
    ], FOUR),
  ],
  decor: rotAll(lamps, FOUR),
  pads: [
    { pos: [0, 0, -4], radius: 1, power: 21, push: [0, 0, -3.5] },
    { pos: [0, 0, 4], radius: 1, power: 21, push: [0, 0, 3.5] },
    { pos: [-4, 0, 0], radius: 1, power: 21, push: [-3.5, 0, 0] },
    { pos: [4, 0, 0], radius: 1, power: 21, push: [3.5, 0, 0] },
  ],
  spawns: spawnsFrom(rotPoints([[-21, 0, -12], [-14, 0, -18]], FOUR)),
  pickups: [
    ...rotPoints([[-14.5, 0.5, -9.5]], FOUR).map((pos) => ({ kind: 'chicken', pos })),
    { kind: 'orb', pos: [15, 6.4, 15] },
    { kind: 'orb', pos: [-15, 6.4, -15] },
  ],
  theme: {
    sky: [[0, '#05060f'], [0.5, '#161a33'], [1, '#05060f']],
    fog: [0xb9a95c, 16, 62],
    hemi: [0xfff6c4, 0x8a7a3a, 2.6],
    sun: 0.5,
    tex: {
      floor: { base: '#b5a35a', line: '#a9974f', checker: true, label: '67' },
      wall: { base: '#d9c872', line: '#b5a24c' },
      crate: { base: '#7a5230', line: '#4f3219' },
      plat: { base: '#cfc9a0', line: '#a09a70' },
      step: { base: '#8d63ff', line: '#5a2fd1' },
      bridge: { base: '#46e063', line: '#1d8c34' },
    },
    signs: [
      [['퇴근', '금지'], '#fff', '#000', [-6, 2.8, -23.97], 0, 8],
      [['EXIT', '없음'], '#0a5c2a', '#fff', [6, 2.8, 23.97], Math.PI, 8],
      [['출근', '6:07'], '#fff', '#c00', [-23.97, 2.8, 4], Math.PI / 2, 7],
      [['스킬', '이슈'], '#fff', '#00f', [23.97, 2.8, -4], -Math.PI / 2, 7],
    ],
    pit: null,
    big67: [0, 11, 0],
  },
};

export const MAPS = { ohio, roof, office };
export const MAP_IDS = Object.keys(MAPS);
export const DEFAULT_MAP = 'ohio';

export function groundAt(map, x, z, fromY = 100) {
  let top = -Infinity;
  for (const b of map.boxes) {
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

export function rayWorld(map, o, d, maxT = 200) {
  let best = maxT;
  for (const b of map.boxes) {
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

// avoid: 피할 위치 목록. 가장 먼 스폰 둘 중 하나.
export function pickSpawn(map, avoid = []) {
  if (!avoid.length) return map.spawns[Math.floor(Math.random() * map.spawns.length)];
  const score = (s) => Math.min(...avoid.map((a) => dist2(s.pos, a)));
  const ranked = [...map.spawns].sort((a, b) => score(b) - score(a));
  return ranked[Math.floor(Math.random() * 2)];
}
