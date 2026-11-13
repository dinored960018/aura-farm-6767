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

// ---------- 4. 아우라 보트: 뱃머리에서 파밍하는 그 맵. 물에 빠지면 끝 ----------
const boat = {
  id: 'boat',
  name: '아우라 보트',
  emoji: '🚣',
  desc: '배 세 척. 물에 빠지면 끝',
  bounds: 31,
  fallY: -8,
  showcase: { pos: [0, 0, 4], r: 6.4 },
  boxes: [
    B(-4, -2, -30, 4, 0, 30, 'floor', { floor: true }),
    ...rotAll([
      B(14, -2, -26, 22, 0, 26, 'floor', { floor: true }),
      B(4, -0.5, -2, 14, 0, 2, 'bridge'),
      B(4, -0.5, 14, 14, 0, 18, 'bridge'),
      B(-2, 0, -22, 2, 3, -14, 'wall'),
      ...stairs(0, -8.5, -1, 6, 4, 'step'),
      B(16, 0, 6, 20, 1.6, 9, 'crate'),
      B(15, 0, -20, 18, 2.2, -17, 'crate'),
      B(20, 0, -4, 22, 2.5, 2, 'wall'),
    ], TWO),
  ],
  decor: [],
  pads: rotPads([{ pos: [18, 0, -23], radius: 1, power: 14, push: [-16, 0, 0] }], TWO),
  spawns: spawnsFrom([[-18, 0, -20], [18, 0, 20], [-18, 0, 8], [18, 0, -8], [0, 0, 26], [0, 0, -26]]),
  pickups: [
    ...rotPoints([[18, 0.5, 13], [0, 3.5, -18]], TWO).map((pos, i) => ({ kind: i % 2 ? 'orb' : 'chicken', pos })),
  ],
  theme: {
    sky: [[0, '#2a8bd8'], [0.48, '#a8e0ff'], [0.54, '#fff3c4'], [0.6, '#1d7fa8'], [1, '#0a3a5c']],
    fog: [0xa8d8ee, 60, 200],
    hemi: [0xffffff, 0x4a8a9c, 2.4],
    sun: 1.6,
    tex: {
      floor: { base: '#a8703c', line: '#8a5a2c', checker: true, label: '67' },
      wall: { base: '#f4f4f0', line: '#c44a3a' },
      crate: { base: '#ffc233', line: '#b57a00' },
      plat: { base: '#2ad3d7', line: '#07898c' },
      step: { base: '#c98a50', line: '#8a5a2c' },
      bridge: { base: '#d9b078', line: '#8a5a2c' },
    },
    signs: [
      [['AURA', 'FARMING'], '#000', '#ffd700', [0, 11, -34], 0, 22],
      [['뱃머리', '명당'], '#fff', '#0a5c9c', [0, 11, 34], Math.PI, 22],
      [['물 조심'], '#0a3a5c', '#fff', [-30, 9, 0], Math.PI / 2, 18],
      [['수영', '금지'], '#c00', '#fff', [30, 9, 0], -Math.PI / 2, 18],
    ],
    pit: { pos: [0, -5, 0], size: 260, lines: ['🌊 🌊 🌊'], bg: '#1a86b8', fg: '#7fd4f0' },
    big67: [0, 18, 0],
  },
};

// ---------- 5. 거대 화장실: 칸막이와 대왕 변기 ----------
const restroom = {
  id: 'restroom',
  name: '거대 화장실',
  emoji: '🚻',
  desc: '칸막이 사이 숨바꼭질 + 대왕 변기',
  bounds: 27,
  fallY: -25,
  showcase: { pos: [0, 0, 0], r: 6 },
  boxes: [
    B(-26, -1, -26, 26, 0, 26, 'floor', { floor: true }),
    ...rotAll([
      B(-27, -1, -27, 27, 10, -26, 'wall', { wall: true }),
      B(-20, 0, -26, -19, 4, -18, 'step'),
      B(-14, 0, -26, -13, 4, -18, 'step'),
      B(-8, 0, -26, -7, 4, -18, 'step'),
      B(10, 0, -4, 16, 2, 4, 'crate'),
      B(16, 0, -5, 19, 6, 5, 'plat'),
    ], FOUR),
  ],
  decor: [],
  pads: rotPads([{ pos: [13, 0, 7], radius: 1, power: 15, push: [0, 0, -3.5] }], FOUR),
  spawns: spawnsFrom(rotPoints([[-11, 0, -21], [6, 0, -6]], FOUR)),
  pickups: [
    ...rotPoints([[-17, 0.5, -22]], FOUR).map((pos) => ({ kind: 'chicken', pos })),
    { kind: 'orb', pos: [13, 2.8, 0] },
    { kind: 'orb', pos: [-13, 2.8, 0] },
  ],
  theme: {
    sky: [[0, '#dfe9ee'], [1, '#aebfc8']],
    fog: [0xd5e2e8, 40, 120],
    hemi: [0xffffff, 0x8fa8b4, 2.5],
    sun: 0.9,
    tex: {
      floor: { base: '#f4f6f7', line: '#d5dde2', checker: true, label: '67' },
      wall: { base: '#bfe3ee', line: '#8fc0d0' },
      crate: { base: '#ffffff', line: '#c8d2d8' },
      plat: { base: '#f0f4f6', line: '#b8c4cc' },
      step: { base: '#3f7fbf', line: '#2a5a8c' },
      bridge: { base: '#46e063', line: '#1d8c34' },
    },
    signs: [
      [['손 씻으세요'], '#fff', '#07f', [0, 7, -25.97], 0, 16],
      [['SKIBIDI', '금지'], '#fff', '#d00', [0, 7, 25.97], Math.PI, 16],
      [['휴지', '없음'], '#222', '#fff', [-25.97, 7, 0], Math.PI / 2, 14],
      [['물 내려', '주세요'], '#ffe', '#040', [25.97, 7, 0], -Math.PI / 2, 14],
    ],
    pit: null,
    big67: [0, 14, 0],
  },
};

// ---------- 6. 67 콜로세움: 가운데 피라미드와 2층 관중석 ----------
const pyramid = [];
for (let i = 0; i < 8; i++) {
  const h = 9 - i;
  pyramid.push(B(-h, 0.5 * i, -h, h, 0.5 * (i + 1), h, 'step'));
}
const arena = {
  id: 'arena',
  name: '67 콜로세움',
  emoji: '🏟️',
  desc: '기둥 숲, 피라미드, 2층 관중석',
  bounds: 31,
  fallY: -25,
  showcase: { pos: [0, 0, 20], r: 6 },
  boxes: [
    B(-30, -2, -30, 30, 0, 30, 'floor', { floor: true }),
    ...pyramid,
    ...rotAll([
      B(-31, -2, -31, 31, 10, -30, 'wall', { wall: true }),
      B(-30, 4, -30, 30, 4.6, -24, 'plat'),
      ...stairs(-20, -15.5, -1, 9, 4, 'bridge', 4.6 / 9),
      B(-23, 0, -9, -20, 8, -6, 'wall'),
      B(-14, 0, -14, -11, 8, -11, 'wall'),
      B(-7, 0, -17, -3, 1.4, -14, 'crate'),
    ], FOUR),
  ],
  decor: [],
  pads: rotPads([{ pos: [-20, 0, 0], radius: 1, power: 20, push: [12.5, 0, 0] }], FOUR),
  spawns: spawnsFrom(rotPoints([[-12, 0, -21], [-26, 0, -3]], FOUR)),
  pickups: [
    ...rotPoints([[-27, 5, 0]], FOUR).map((pos) => ({ kind: 'chicken', pos })),
    { kind: 'orb', pos: [0, 4.8, 0] },
  ],
  theme: {
    sky: [[0, '#3f8fe0'], [0.5, '#bfe4ff'], [0.56, '#ffe9b0'], [1, '#c9a26a']],
    fog: [0xe8d4a8, 55, 170],
    hemi: [0xfff4dc, 0x9c7a4a, 2.3],
    sun: 1.7,
    tex: {
      floor: { base: '#d9bd85', line: '#cdb077', checker: true, label: '67' },
      wall: { base: '#efe3c8', line: '#b8a57f' },
      crate: { base: '#a8703c', line: '#70471f' },
      plat: { base: '#c9b48a', line: '#8f7c58' },
      step: { base: '#e0a848', line: '#a8741f' },
      bridge: { base: '#d9cfae', line: '#9c9070' },
    },
    signs: [
      [['ARE YOU', 'NOT AURA?'], '#5c0a0a', '#ffd700', [0, 8, -29.97], 0, 20],
      [['6-7', 'GLADIATOR'], '#000', '#fff', [0, 8, 29.97], Math.PI, 20],
      [['SIGMA', 'IMPERATOR'], '#2a0a5c', '#ffd700', [-29.97, 8, 0], Math.PI / 2, 18],
      [['검투사', '모집'], '#fff', '#900', [29.97, 8, 0], -Math.PI / 2, 18],
    ],
    pit: null,
    big67: [0, 16, 0],
  },
};

// x 를 뒤집은 짝까지 붙인다 (좌우 대칭)
const mirX = (list) => list.flatMap((b) => [b, { ...b, min: [-b.max[0], b.min[1], b.min[2]], max: [-b.min[0], b.max[1], b.max[2]] }]);

// ---------- 7. 급식실: 긴 식탁, 배식대, 복도, 교실 두 칸, 계단으로 교실 옥상 ----------
const lunch = [];
for (const z of [-15, -9, -3]) {
  for (const [x0, x1] of [[-22, -15], [-10, -3]]) {
    lunch.push(
      B(x0, 0, z - 0.7, x1, 1.1, z + 0.7, 'table'),
      B(x0, 0, z - 1.6, x1, 0.45, z - 1, 'desk'),
      B(x0, 0, z + 1, x1, 0.45, z + 1.6, 'desk'),
    );
  }
}
const classroom = [];
for (const x of [-23, -19, -15, -11]) {
  for (const z of [14.5, 18, 21.5]) {
    classroom.push(
      B(x - 0.6, 0, z - 0.4, x + 0.6, 0.85, z + 0.4, 'desk'),
      B(x - 0.35, 0, z - 1.25, x + 0.35, 0.45, z - 0.65, 'desk'),
    );
  }
}
// 창문: 턱 1.2 아래와 3.2 위만 막혀 있어 뛰어서 넘나든다
const win = (x0, x1) => [B(x0, 0, 10, x1, 1.2, 10.8, 'wall'), B(x0, 3.2, 10, x1, 5, 10.8, 'wall')];
const door = (x0, x1) => [B(x0, 3.2, 10, x1, 5, 10.8, 'wall')];
const school = {
  id: 'school',
  name: '급식실',
  emoji: '🍱',
  desc: '급식실 식탁 엄폐, 교실 창문 넘기, 옥상 저격',
  bounds: 28,
  fallY: -25,
  showcase: { pos: [0, 0, -11], r: 5 },
  boxes: [
    B(-27, -1, -27, 27, 0, 27, 'floor', { floor: true }),
    ...rotAll([B(-28, -1, -28, 28, 10, -27, 'wall', { wall: true })], FOUR),
    // 급식실 천장 (그림자 없음)
    B(-27, 10, -27, 27, 10.6, 3.4, 'ceil'),
    // 배식대와 밥솥
    B(-15, 0, -21, 15, 1.2, -19.8, 'steel'),
    ...mirX([B(-10, 0, -26.2, -6, 1.8, -24, 'steel')]),
    ...mirX(lunch),
    ...mirX([B(-13, 0, -12.6, -12, 10, -11.4, 'wall')]),
    // 가운데 전망대: 다리 넷 위의 판
    B(-4, 5, -14, 4, 5.5, -6, 'plat'),
    ...mirX([B(-3.8, 0, -13.8, -3.4, 5, -13.4, 'steel'), B(-3.8, 0, -6.6, -3.4, 5, -6.2, 'steel')]),
    // 급식실과 복도 사이 벽, 복도 사물함
    ...mirX([B(-27, 0, 2.6, -19, 5, 3.4, 'wall'), B(-13, 0, 2.6, -4, 5, 3.4, 'wall'), B(-12.5, 0, 3.4, -5, 2.4, 4.1, 'locker')]),
    // 교실 (서쪽을 만들고 뒤집는다)
    ...mirX([
      B(-27, 0, 10, -25, 5, 10.8, 'wall'),
      ...win(-25, -20), ...door(-20, -17), ...win(-17, -11), ...door(-11, -8),
      B(-8, 0, 10, -6, 5, 10.8, 'wall'),
      B(-6.8, 0, 10.8, -6, 5, 14, 'wall'),
      B(-6.8, 3.2, 14, -6, 5, 17, 'wall'),
      B(-6.8, 0, 17, -6, 5, 27, 'wall'),
      B(-27, 5, 10, -6, 5.5, 27, 'plat'),
      B(-20, 0, 24.3, -15, 1.1, 25.3, 'table'),
      ...classroom,
    ]),
    // 계단과 옥상 층계참
    ...stairs(0, 10.5, 1, 11, 5, 'step'),
    B(-6, 0, 21, 6, 5.5, 27, 'step'),
    // 옥상 물탱크와 실외기
    B(-24, 5.5, 19, -20, 8, 23, 'steel'),
    B(18, 5.5, 16, 22, 6.8, 19, 'steel'),
    B(10, 5.5, 22, 13, 6.8, 25, 'steel'),
  ],
  decor: [
    ...[-18, -6, 6, 18].flatMap((x) => [-23, -15, -7, -0.5].map((z) => B(x - 1.6, 9.86, z - 0.22, x + 1.6, 10, z + 0.22, 'lamp'))),
    ...mirX([-22, -16, -10].flatMap((x) => [14, 20].map((z) => B(x - 1.4, 4.86, z - 0.2, x + 1.4, 5, z + 0.2, 'lamp')))),
  ],
  pads: [
    { pos: [0, 0, -18], radius: 1, power: 19, push: [0, 0, 6] },
    { pos: [0, 0, 0], radius: 1, power: 19, push: [0, 0, -6] },
    { pos: [-22, 0, 6.5], radius: 1, power: 20, push: [0, 0, 5] },
    { pos: [22, 0, 6.5], radius: 1, power: 20, push: [0, 0, 5] },
  ],
  spawns: spawnsFrom([
    [-21, 0, -24], [21, 0, -24], [-25, 0, -9], [25, 0, -9], [0, 0, 6.5],
    [-24, 0, 12.5], [24, 0, 12.5], [-9, 0, 25], [9, 0, 25], [0, 5.5, 24],
  ]),
  pickups: [
    { kind: 'chicken', pos: [0, 0.5, -24] },
    { kind: 'chicken', pos: [-16, 0.5, 12.5] },
    { kind: 'chicken', pos: [16, 0.5, 12.5] },
    { kind: 'chicken', pos: [-12, 6, 18] },
    { kind: 'chicken', pos: [12, 6, 18] },
    { kind: 'orb', pos: [0, 6.3, -10] },
  ],
  theme: {
    sky: [[0, '#4f9cff'], [0.48, '#cfe6ff'], [0.55, '#fff0c4'], [0.62, '#9cc48a'], [1, '#4a6b3a']],
    fog: [0xe4ecf2, 50, 150],
    hemi: [0xfffaf0, 0x8a7f6a, 2.4],
    sun: 1.4,
    tex: {
      floor: { base: '#d6cfbd', line: '#c9c1ab', checker: true, label: '67' },
      wall: { base: '#f1ead2', line: '#c9bf9c' },
      ceil: { base: '#f4f4ee', line: '#d8d8cc' },
      table: { base: '#e6ecf0', line: '#97a5b0' },
      desk: { base: '#c98d4f', line: '#8a5a2c' },
      steel: { base: '#b8c3cc', line: '#7d8a94' },
      step: { base: '#5aa86a', line: '#2f7040' },
      plat: { base: '#a3abb4', line: '#6b737c' },
      locker: { base: '#3f7fcf', line: '#1f4f8f' },
    },
    signs: [
      [['오늘의 급식', '제육 + 6.7배'], '#fff7d6', '#d62828', [0, 7.4, -26.97], 0, 10],
      [['줄 서시오', '새치기 -67'], '#14002e', '#ffd21f', [-26.97, 6.6, -12], Math.PI / 2, 10],
      [['잔반 남기면', '-1000 AURA'], '#fff', '#e00', [26.97, 6.6, -12], -Math.PI / 2, 10],
      [['복도에서', '뛰지 마시오'], '#fff', '#0a4fd6', [-8.5, 3.85, 3.43], 0, 4.4],
      [['6교시', '체육 ㄱㄱ'], '#0a5c2a', '#fff', [8.5, 3.85, 3.43], 0, 4.4],
      [['자습', '떠들면 이름 적음'], '#1f4d34', '#f4f4e8', [-16.5, 2.9, 26.97], Math.PI, 7],
      [['시험 범위', '1~67쪽'], '#1f4d34', '#f4f4e8', [16.5, 2.9, 26.97], Math.PI, 7],
      [['옥상', '출입 금지?'], '#c00', '#fff', [0, 7.7, 26.97], Math.PI, 8.6],
    ],
    pit: null,
    big67: [0, 14, 6.7],
  },
};

// ---------- 8. 메가 마트: 높은 진열대 골목, 계산대, 냉동 코너, 하역장 ----------
const SHELF_X = [-21, -15.5, -10, -4.5, 4.5, 10, 15.5, 21];
const mart = {
  id: 'mart',
  name: '마트',
  emoji: '🛒',
  desc: '진열대 골목, 냉동 코너, 하역장 트럭',
  bounds: 29,
  fallY: -25,
  showcase: { pos: [-1, 0, -12], r: 6 },
  boxes: [
    B(-28, -1, -28, 28, 0, 28, 'floor', { floor: true }),
    ...rotAll([B(-29, -1, -29, 29, 10, -28, 'wall', { wall: true })], FOUR),
    B(-28, 10, -28, 28, 10.6, 28, 'ceil'),
    // 진열대: 4.2m, 2단 점프로도 못 넘는다
    ...SHELF_X.flatMap((x) => [[-6, 3], [6, 14]].map(([z0, z1]) => B(x - 0.8, 0, z0, x + 0.8, 4.2, z1, 'shelf'))),
    // 계산대
    ...[-20, -13, -6, 6, 13, 20].map((x) => B(x - 0.7, 0, 18, x + 0.7, 1.1, 23, 'counter')),
    B(-3, 0, 24.5, 3, 1.3, 26.5, 'crate'),
    // 1+1 행사 더미
    B(-2, 0, 2.5, 2, 1, 6.5, 'crate'),
    B(-1.2, 1, 3.3, 1.2, 2, 5.7, 'crate'),
    // 냉동 코너: 워크인 냉동고(지붕 위로 올라감), 벽 냉장고, 아이스크림 냉동고
    B(-19.6, 0, -28, -19, 3.6, -24, 'freezer'),
    B(-19.6, 0, -22, -19, 3.6, -20, 'freezer'),
    B(-19.6, 2.6, -24, -19, 3.6, -22, 'freezer'),
    B(-28, 0, -20.6, -19, 3.6, -20, 'freezer'),
    B(-28, 3.6, -28, -19, 4, -20, 'freezer'),
    B(-19, 0, -28, -5, 3, -26.8, 'freezer'),
    B(-17, 0, -19.4, -7, 1, -17.6, 'freezer'),
    B(-17, 0, -14.4, -7, 1, -12.6, 'freezer'),
    // 하역장: 1.5m 단, 계단 둘, 트럭, 팔레트
    B(4, 0, -28, 28, 1.5, -19, 'dock'),
    ...stairs(7, -17.5, -1, 2, 4, 'dock'),
    ...stairs(25, -17.5, -1, 2, 4, 'dock'),
    B(12, 0, -28, 19, 4.5, -21, 'truck'),
    B(5, 1.5, -27.5, 9, 2.9, -24.5, 'crate'),
    B(20.5, 1.5, -22, 24, 2.7, -20, 'crate'),
  ],
  decor: [
    ...[-18.25, -12.75, -7.25, 0, 7.25, 12.75, 18.25].flatMap((x) => [[-5, 2], [7, 13]].map(([z0, z1]) => B(x - 0.22, 9.86, z0, x + 0.22, 10, z1, 'lamp'))),
    ...[-16, -8, 0, 8, 16].map((x) => B(x - 2.5, 9.86, 20.3, x + 2.5, 10, 20.7, 'lamp')),
    ...[-14, -2, 10, 22].map((x) => B(x - 2.5, 9.86, -15.2, x + 2.5, 10, -14.8, 'lamp')),
    ...[-24, 24].map((x) => B(x - 0.22, 9.86, -6, x + 0.22, 10, 12, 'lamp')),
  ],
  pads: [
    { pos: [-21, 0, -8], radius: 1, power: 17, push: [0, 0, 4] },
    { pos: [21, 0, 16], radius: 1, power: 17, push: [0, 0, -4] },
    { pos: [22.5, 1.5, -24.5], radius: 1, power: 17, push: [-4, 0, 0] },
    { pos: [-23.5, 0, -17.5], radius: 1, power: 17, push: [0, 0, -4] },
  ],
  spawns: spawnsFrom([
    [-25, 0, -12], [-10, 0, -23.5], [10.5, 1.5, -24], [0, 0, -14], [24, 0, -12],
    [-24.5, 0, 0], [24.5, 0, 8], [0, 0, 11], [-16.5, 0, 21], [16.5, 0, 21],
  ]),
  pickups: [
    { kind: 'chicken', pos: [-23.5, 4.5, -24] },
    { kind: 'chicken', pos: [-24, 0.5, -24] },
    { kind: 'chicken', pos: [-21, 4.7, 0] },
    { kind: 'chicken', pos: [21, 4.7, 9] },
    { kind: 'chicken', pos: [0, 2.5, 4.5] },
    { kind: 'orb', pos: [15.5, 5.3, -24.5] },
  ],
  theme: {
    sky: [[0, '#cfd6de'], [1, '#9aa4b0']],
    fog: [0xe6f2fb, 45, 140],
    hemi: [0xffffff, 0x8a96a8, 2.4],
    sun: 1.2,
    tex: {
      floor: { base: '#eceff2', line: '#dde2e7', checker: true, label: '67' },
      wall: { base: '#ffd43b', line: '#d9a800' },
      ceil: { base: '#d9dde2', line: '#b8bec6' },
      shelf: { base: '#2f6fd6', line: '#1d4a99' },
      counter: { base: '#e8384f', line: '#9c1a2c' },
      freezer: { base: '#e6f6ff', line: '#7cc8f0' },
      dock: { base: '#8a8f96', line: '#f2c200' },
      truck: { base: '#f4f4f4', line: '#d63a3a' },
      crate: { base: '#c98a4a', line: '#8a5a2c' },
    },
    signs: [
      [['❄ FROZEN ❄', '냉동 코너'], '#e8f8ff', '#0a6cc2', [-12, 6.3, -27.97], 0, 8],
      [['LOADING', 'DOCK 67'], '#222', '#ffcc00', [16, 7.3, -27.97], 0, 9],
      [['계산은', '셀프 6767'], '#fff', '#e8384f', [-13, 6, 27.97], Math.PI, 10],
      [['1+1', '오늘만 67%'], '#ffe14d', '#d00', [13, 6, 27.97], Math.PI, 10],
      [['시식 코너', '무한 리필'], '#fff', '#2a8a3a', [-27.97, 6, 4], Math.PI / 2, 10],
      [['카트로', '박치기 금지'], '#14002e', '#ff5fa2', [27.97, 6, 4], -Math.PI / 2, 10],
      [['AURA', 'EXPRESS'], '#f4f4f4', '#d63a3a', [15.5, 3.05, -20.97], 0, 5.4],
    ],
    pit: null,
    big67: [0, 16, 0],
  },
};

export const MAPS = { ohio, roof, office, boat, restroom, arena, school, mart };
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
