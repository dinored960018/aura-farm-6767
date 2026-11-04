// 봇 길찾기. 맵마다 1m 격자 높이맵을 만들어 두고 BFS로 다닌다.
const STEP = 0.56;
const cache = new Map();

function surface(map, x, z) {
  const over = map.boxes.filter((b) => x > b.min[0] && x < b.max[0] && z > b.min[2] && z < b.max[2] && b.max[1] >= -0.5);
  if (!over.length) return NaN;
  over.sort((a, b) => a.min[1] - b.min[1]);
  let h = over[0].max[1];
  // 바로 위에 붙어 쌓인 상자는 한 덩어리로 본다
  for (let again = true; again;) {
    again = false;
    for (const b of over) {
      if (b.min[1] <= h + 0.01 && b.max[1] > h) { h = b.max[1]; again = true; }
    }
  }
  return h;
}

export function navFor(map) {
  if (cache.has(map.id)) return cache.get(map.id);
  const B = map.bounds, N = B * 2;
  const h = new Float32Array(N * N);
  const safe = new Uint8Array(N * N);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x = i - B + 0.5, z = j - B + 0.5;
      let top = surface(map, x, z);
      if (!Number.isNaN(top)) {
        // 몸 두께만큼 옆에 벽이 걸치면 그 칸은 벽으로 친다
        for (const [ox, oz] of [[-0.46, -0.46], [0.46, -0.46], [-0.46, 0.46], [0.46, 0.46]]) {
          const v = surface(map, x + ox, z + oz);
          if (!Number.isNaN(v) && v > top) top = v;
        }
      }
      h[j * N + i] = top;
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (Number.isNaN(h[j * N + i])) continue;
      let ok = i > 0 && j > 0 && i < N - 1 && j < N - 1;
      for (let dx = -1; ok && dx <= 1; dx++) {
        for (let dz = -1; ok && dz <= 1; dz++) {
          if (Number.isNaN(h[(j + dz) * N + i + dx])) ok = false; // 낭떠러지 옆은 안 간다
        }
      }
      const x = i - B + 0.5, z = j - B + 0.5;
      for (const p of map.pads) {
        if (Math.hypot(x - p.pos[0], z - p.pos[2]) < p.radius + 0.8) ok = false; // 점프대 밟으면 날아감
      }
      safe[j * N + i] = ok ? 1 : 0;
    }
  }
  const nav = { B, N, h, safe, parent: new Int32Array(N * N), queue: new Int32Array(N * N) };
  cache.set(map.id, nav);
  return nav;
}

function cellOf(nav, x, z) {
  const i = Math.max(0, Math.min(nav.N - 1, Math.floor(x + nav.B)));
  const j = Math.max(0, Math.min(nav.N - 1, Math.floor(z + nav.B)));
  return j * nav.N + i;
}

function nearestSafe(nav, c) {
  if (nav.safe[c]) return c;
  const { N } = nav;
  const ci = c % N, cj = (c - ci) / N;
  for (let r = 1; r < 12; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const i = ci + dx, j = cj + dz;
        if (i < 0 || j < 0 || i >= N || j >= N) continue;
        if (nav.safe[j * N + i]) return j * N + i;
      }
    }
  }
  return -1;
}

// 목표에 못 가면 가장 가까이 갈 수 있는 곳까지. 반환: [[x, z], ...]
export function findPath(nav, fromX, fromZ, toX, toZ) {
  const { N, B, h, safe, parent, queue } = nav;
  const start = nearestSafe(nav, cellOf(nav, fromX, fromZ));
  const goal = nearestSafe(nav, cellOf(nav, toX, toZ));
  if (start < 0 || goal < 0) return [];
  parent.fill(-1);
  parent[start] = start;
  let head = 0, tail = 0, best = start, bestD = Infinity;
  queue[tail++] = start;
  const gi = goal % N, gj = (goal - gi) / N;
  const dirs = [1, -1, N, -N];
  while (head < tail) {
    const c = queue[head++];
    const ci = c % N, cj = (c - ci) / N;
    const d = (ci - gi) ** 2 + (cj - gj) ** 2;
    if (d < bestD) { bestD = d; best = c; }
    if (c === goal) break;
    for (const step of dirs) {
      if ((step === 1 && ci === N - 1) || (step === -1 && ci === 0)) continue;
      const n = c + step;
      if (n < 0 || n >= N * N || parent[n] !== -1 || !safe[n]) continue;
      if (h[n] - h[c] > STEP) continue;
      parent[n] = c;
      queue[tail++] = n;
    }
  }
  const path = [];
  for (let c = best; c !== start; c = parent[c]) path.push([(c % N) - B + 0.5, Math.floor(c / N) - B + 0.5]);
  path.reverse();
  return path;
}

// 다음에 갈 칸의 번호를 돌려준다
export function advance(path, idx, x, z) {
  while (idx < path.length && Math.hypot(path[idx][0] - x, path[idx][1] - z) < 0.75) idx++;
  return idx;
}
