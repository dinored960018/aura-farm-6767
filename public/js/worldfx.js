// 맵 분위기: 햇빛 방향, 네온, 하늘 장식, 떠다니는 먼지, 바닥 접촉 그림자, 소품 빛
import * as THREE from 'three';
import { softTexture, flashTexture } from './character.js';

export const LOOK = {
  ohio: { sunDir: [-0.55, 0.42, -0.72], sunColor: 0xffb0d0, hemiMul: 0.82, sunMul: 1.35, rim: 0xff5fc0, rimK: 0.55, neon: { wall: 0xff2a7a, plat: 0x19e3e8, bridge: 0x4dff6a, step: 0xa070ff }, stars: true, sunDisc: 0xffa060, motes: 0xff90e0 },
  roof: { sunDir: [0.7, 0.34, -0.62], sunColor: 0xffc890, hemiMul: 0.8, sunMul: 1.5, rim: 0xff9a50, rimK: 0.55, neon: { plat: 0xffa040 }, sunDisc: 0xffb060, clouds: 0xffb8a0, motes: 0xffd090 },
  office: { sunDir: [0.2, 1, 0.3], sunColor: 0xfff6c4, hemiMul: 0.72, sunMul: 1, rim: 0xfff0a0, rimK: 0.28, noCast: ['plat'], lampCones: true, flicker: true, motes: 0xeee090 },
  boat: { sunDir: [0.5, 0.62, 0.6], sunColor: 0xfff0d0, hemiMul: 0.8, sunMul: 1.45, rim: 0xbfe8ff, rimK: 0.4, sunDisc: 0xfff0b0, clouds: 0xffffff, ocean: 0x1d7fa8, motes: 0xffffff },
  restroom: { sunDir: [-0.3, 1, 0.42], sunColor: 0xffffff, hemiMul: 0.66, sunMul: 1.1, rim: 0x9fe0ff, rimK: 0.4, tubes: true, bubbles: true, motes: 0xbfeaff },
  arena: { sunDir: [-0.55, 0.62, 0.5], sunColor: 0xffe2b0, hemiMul: 0.78, sunMul: 1.55, rim: 0xffc070, rimK: 0.45, sunDisc: 0xfff0c0, clouds: 0xffeed8, torches: true, motes: 0xe8cc90 },
  school: { sunDir: [0.45, 0.8, 0.5], sunColor: 0xfff1d0, hemiMul: 0.78, sunMul: 1.3, rim: 0xffe0a0, rimK: 0.38, noCast: ['ceil'], sunDisc: 0xfff0c0, clouds: 0xffffff, fluoro: { lamp: [2.7, 2.65, 2.4], pool: 0xfff4d8, cones: true }, props: 'school', motes: 0xfff2c0 },
  mart: { sunDir: [0.25, 1, -0.3], sunColor: 0xf4fbff, hemiMul: 0.74, sunMul: 1.05, rim: 0xbfe8ff, rimK: 0.42, noCast: ['ceil'], neon: { freezer: 0x40d8ff, counter: 0xff3b6b }, fluoro: { lamp: [2.5, 2.75, 3], pool: 0xe8f6ff }, frost: true, props: 'mart', motes: 0xd8f4ff },
};

// [x0,y0,z0,x1,y1,z1,색] 상자들을 정점색 한 덩어리로 (그리기 1번)
function colorBoxes(list, mat) {
  const c = new THREE.Color();
  const parts = list.map(([x0, y0, z0, x1, y1, z1, col]) => {
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    c.set(col);
    const n = g.attributes.position.count, a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(a, 3));
    return g;
  });
  return new THREE.Mesh(mergeBoxes(parts), mat ?? new THREE.MeshLambertMaterial({ vertexColors: true }));
}

// 아래로 가장 가까운 바닥 높이 (천장은 뺀다)
function floorBelow(map, x, z, y) {
  let top = 0;
  for (const b of map.boxes) {
    if (x > b.min[0] && x < b.max[0] && z > b.min[2] && z < b.max[2] && b.max[1] < y - 0.2 && b.max[1] > top) top = b.max[1];
  }
  return top;
}

// 매달린 양면 표지판 여러 장을 글자 아틀라스 하나로: [[줄], 바탕, 글자, x, y, z, 회전, 폭]
function hangSigns(list, own, ceilY) {
  const N = list.length, W = 512, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H * N;
  const x = c.getContext('2d');
  const parts = [], rods = [];
  list.forEach(([lines, bg, fg, px, py, pz, rot, w], i) => {
    const y0 = i * H;
    x.fillStyle = bg;
    x.fillRect(0, y0, W, H);
    x.strokeStyle = fg;
    x.lineWidth = 12;
    x.strokeRect(8, y0 + 8, W - 16, H - 16);
    x.fillStyle = fg;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    lines.forEach((l, k) => {
      let size = 150 / lines.length;
      x.font = `900 ${size}px Impact, "Malgun Gothic", "Segoe UI Emoji", sans-serif`;
      const tw = x.measureText(l).width;
      if (tw > 440) { size *= 440 / tw; x.font = `900 ${size}px Impact, "Malgun Gothic", "Segoe UI Emoji", sans-serif`; }
      x.fillText(l, W / 2, y0 + H / 2 + (k - (lines.length - 1) / 2) * (200 / lines.length));
    });
    const v0 = 1 - (i + 1) / N, v1 = 1 - i / N;
    for (const flip of [0, Math.PI]) {
      const g = new THREE.PlaneGeometry(w, w / 2);
      const uv = g.attributes.uv;
      for (let j = 0; j < uv.count; j++) uv.setY(j, uv.getY(j) ? v1 : v0);
      g.translate(0, 0, 0.012).rotateY(rot + flip).translate(px, py, pz);
      parts.push(g);
    }
    if (ceilY !== undefined) {
      const top = py + w / 4;
      for (const s of [-1, 1]) {
        const ox = Math.cos(rot) * s * w * 0.38, oz = -Math.sin(rot) * s * w * 0.38;
        rods.push([px + ox - 0.03, top, pz + oz - 0.03, px + ox + 0.03, ceilY, pz + oz + 0.03, '#4a4f57']);
      }
    }
  });
  const tex = own(new THREE.CanvasTexture(c));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const g = new THREE.Group();
  g.add(new THREE.Mesh(mergeBoxes(parts), new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color(1.05, 1.05, 1.05) })));
  if (rods.length) g.add(colorBoxes(rods));
  return g;
}

// 급식실 소품: 식판, 배식 반찬통, 의자 등받이, 반 표지판
function schoolProps(map, s, own) {
  const L = [];
  const FOOD = ['#ffffff', '#e8442a', '#f2a93b', '#7ac74f', '#8a4b2a'];
  for (const b of map.boxes) {
    if (b.kind === 'table' && b.max[0] - b.min[0] > 6) {
      // 식판: 식탁 양쪽으로
      const y = b.max[1];
      for (let tx = b.min[0] + 1; tx < b.max[0] - 0.5; tx += 2.2) {
        for (const side of [-1, 1]) {
          const cz = (b.min[2] + b.max[2]) / 2 + side * 0.36;
          L.push([tx - 0.3, y, cz - 0.2, tx + 0.3, y + 0.035, cz + 0.2, '#9fc7b0']);
          L.push([tx - 0.24, y + 0.035, cz - 0.14, tx - 0.04, y + 0.12, cz + 0.04, FOOD[0]]);
          L.push([tx + 0.02, y + 0.035, cz - 0.14, tx + 0.24, y + 0.09, cz + 0.14, FOOD[1 + ((tx * 3 + side) & 3)]]);
        }
      }
    }
    if (b.kind === 'desk' && b.max[1] < 0.5 && b.max[0] - b.min[0] < 1) {
      // 교실 의자 등받이 (의자 뒤쪽 끝)
      L.push([b.min[0] + 0.04, b.max[1], b.min[2], b.max[0] - 0.04, b.max[1] + 0.55, b.min[2] + 0.06, '#8a5a2c']);
    }
    if (b.kind === 'desk' && b.max[1] === 0.85) {
      // 책상 상판: 밝은 나무, 살짝 튀어나오게
      L.push([b.min[0] - 0.04, 0.85, b.min[2] - 0.04, b.max[0] + 0.04, 0.89, b.max[2] + 0.04, '#e8c79a']);
    }
  }
  // 배식대 반찬통과 국통
  const BAN = ['#ffffff', '#e8442a', '#f2a93b', '#7ac74f', '#ff9ec7', '#e8442a', '#ffffff', '#f2d24b'];
  BAN.forEach((col, i) => {
    const x0 = -14 + i * 3.5;
    L.push([x0, 1.2, -20.9, x0 + 3, 1.24, -19.9, '#d8dee3']);
    L.push([x0 + 0.15, 1.24, -20.75, x0 + 2.85, 1.3, -20.05, col]);
  });
  for (const sx of [-1, 1]) {
    L.push([sx * 8 - 1.3, 1.8, -26, sx * 8 + 1.3, 2.9, -24.2, '#9aa6b0']);
    L.push([sx * 8 - 1.1, 2.9, -25.8, sx * 8 + 1.1, 2.94, -24.4, '#f2a93b']);
  }
  // 배식대 가림막 기둥
  for (let x = -15; x <= 15; x += 5) L.push([x - 0.05, 1.2, -20.55, x + 0.05, 2, -20.45, '#aab4bc']);
  s.add(colorBoxes(L));
  // 가림막 유리
  const glass = new THREE.Mesh(new THREE.BoxGeometry(30, 0.04, 0.9).translate(0, 2, -20.4), new THREE.MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, opacity: 0.35, depthWrite: false }));
  s.add(glass);
  // 반 표지판: 문 위에서 복도 쪽으로 튀어나온다 (6반, 7반 = 67)
  s.add(hangSigns([
    [['1-6'], '#fff', '#1f4d34', -18.5, 4.15, 9.2, Math.PI / 2, 1.6],
    [['1-6'], '#fff', '#1f4d34', -9.5, 4.15, 9.2, Math.PI / 2, 1.6],
    [['1-7'], '#fff', '#1f4d34', 9.5, 4.15, 9.2, Math.PI / 2, 1.6],
    [['1-7'], '#fff', '#1f4d34', 18.5, 4.15, 9.2, Math.PI / 2, 1.6],
  ], own));
  // 급식실 천장에 매단 표지판
  s.add(hangSigns([
    [['배식구', '↓↓↓'], '#d62828', '#fff', -10.5, 6.6, -20.4, 0, 3.6],
    [['배식구', '↓↓↓'], '#d62828', '#fff', 10.5, 6.6, -20.4, 0, 3.6],
    [['매점 털러', '가자'], '#ffd21f', '#14002e', -12.5, 7.4, -0.5, 0, 4],
    [['AURA', '맛집'], '#14002e', '#ff5fa2', 12.5, 7.4, -0.5, 0, 4],
  ], own, 10));
}

// 마트 소품: 진열 상품, 냉동고 문, 계산대, 하역장 줄무늬
function martProps(map, s, own) {
  const L = [], G = [];
  const RUNS = ['#ff4040', '#ffd21f', '#3fa9f5', '#7ac74f', '#ff8a1f', '#ffffff', '#b06cff', '#ff5fa2', '#20c4b0', '#f2e6c8'];
  let seed = 67;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (const b of map.boxes) {
    if (b.kind === 'shelf') {
      for (const [fx, dir] of [[b.min[0], -1], [b.max[0], 1]]) {
        for (const ly of [0.12, 1.12, 2.12, 3.12]) {
          // 선반 턱
          L.push([Math.min(fx, fx + dir * 0.2), ly, b.min[2] + 0.05, Math.max(fx, fx + dir * 0.2), ly + 0.07, b.max[2] - 0.05, '#e8edf2']);
          if (ly > 3) continue;
          // 같은 상품 한 줄을 상자 하나로 (삼각형 아끼기)
          let z = b.min[2] + 0.15;
          while (z < b.max[2] - 0.6) {
            const w = Math.min(0.9 + rnd() * 1.6, b.max[2] - 0.15 - z), h = 0.4 + rnd() * 0.45;
            L.push([Math.min(fx, fx + dir * 0.17), ly + 0.07, z, Math.max(fx, fx + dir * 0.17), ly + 0.07 + h, z + w, RUNS[(rnd() * RUNS.length) | 0]]);
            z += w + 0.08;
          }
        }
      }
    }
    if (b.kind === 'counter') {
      const cx = (b.min[0] + b.max[0]) / 2;
      L.push([cx - 0.45, b.max[1], b.min[2] + 0.3, cx + 0.45, b.max[1] + 0.03, b.max[2] - 1.6, '#2a2d33']);
      L.push([cx - 0.35, b.max[1], b.max[2] - 1.3, cx + 0.35, b.max[1] + 0.32, b.max[2] - 0.6, '#3a3f48']);
      L.push([cx - 0.04, b.max[1], b.max[2] - 0.2, cx + 0.04, 2.9, b.max[2] - 0.12, '#4a4f57']);
      G.push([cx - 0.28, 2.9, b.max[2] - 0.3, cx + 0.28, 3.3, b.max[2] - 0.02, '#ffe14d']);
      G.push([cx - 0.3, b.max[1] + 0.32, b.max[2] - 1.28, cx + 0.3, b.max[1] + 0.33, b.max[2] - 0.62, '#7fe0ff']);
    }
  }
  // 벽 냉장고 유리문 (빛나는 판)과 손잡이
  for (let x = -18.85; x < -5.3; x += 1.36) {
    G.push([x, 0.3, -26.8, x + 1.26, 2.75, -26.76, '#bff0ff']);
    L.push([x + 1.08, 1.1, -26.76, x + 1.13, 2, -26.7, '#5a6470']);
  }
  // 아이스크림 냉동고 유리 뚜껑
  for (const b of map.boxes.filter((q) => q.kind === 'freezer' && q.max[1] === 1)) {
    G.push([b.min[0] + 0.15, 1, b.min[2] + 0.15, b.max[0] - 0.15, 1.02, b.max[2] - 0.15, '#9fe8ff']);
  }
  // 워크인 냉동고 비닐 커튼: 지나갈 때 흔들리는 느낌만
  for (let z = -23.95; z < -22.05; z += 0.24) L.push([-19.34, 0.15, z, -19.32, 2.6, z + 0.18, '#d8f2ff']);
  // 하역장 가장자리 노랑/검정 줄무늬와 고무 범퍼
  for (let x = 4; x < 27.9; x += 0.8) {
    const stair = (x > 4.9 && x < 9.1) || (x > 22.9 && x < 27.1);
    if (!stair) L.push([x, 1.12, -19.02, Math.min(28, x + 0.8), 1.5, -18.99, ((x - 4) / 0.8) % 2 < 1 ? '#ffcc00' : '#1a1a1a']);
  }
  for (const x of [11, 20.5]) L.push([x - 0.3, 0.3, -19.18, x + 0.3, 1.05, -19, '#1a1a1a']);
  // 트럭: 빨간 띠
  L.push([11.97, 3.6, -28, 12, 3.9, -21.2, '#d63a3a'], [19, 3.6, -28, 19.03, 3.9, -21.2, '#d63a3a']);
  s.add(colorBoxes(L));
  s.add(colorBoxes(G, new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(1.5, 1.5, 1.5) })));
  // 통로 표지판
  s.add(hangSigns([
    [['라면'], '#ff4040', '#fff', -18.25, 7.6, 4.5, 0, 3.4],
    [['과자'], '#ffd21f', '#14002e', -12.75, 7.6, 4.5, 0, 3.4],
    [['음료'], '#3fa9f5', '#fff', -7.25, 7.6, 4.5, 0, 3.4],
    [['밈 코너'], '#14002e', '#ff5fa2', 7.25, 7.6, 4.5, 0, 3.4],
    [['시그마', '단백질'], '#111', '#ffd700', 12.75, 7.6, 4.5, 0, 3.4],
    [['67%', 'SALE'], '#fff', '#d00', 18.25, 7.6, 4.5, 0, 3.4],
    [['CHECKOUT', '계산대'], '#e8384f', '#fff', 0, 7.2, 16.2, 0, 5],
  ], own, 10));
}

// 박스 모서리 네온
function neonBars(boxes, colors) {
  const out = new Map();
  for (const b of boxes) {
    const col = colors[b.kind];
    if (col === undefined || b.floor) continue;
    const [x0, y0, z0] = b.min, [x1, y1, z1] = b.max;
    const sx = x1 - x0, sz = z1 - z0;
    if (Math.max(sx, sz) < 2.5) continue;
    const t = 0.05, y = y1 + 0.005;
    const list = out.get(col) ?? [];
    list.push([sx, t, t, (x0 + x1) / 2, y, z0], [sx, t, t, (x0 + x1) / 2, y, z1], [t, t, sz, x0, y, (z0 + z1) / 2], [t, t, sz, x1, y, (z0 + z1) / 2]);
    out.set(col, list);
    void y0;
  }
  return out;
}

export function mergeBoxes(parts) {
  const pos = [], nor = [], uv = [], col = [], idx = [];
  let base = 0;
  for (const g of parts) {
    const p = g.attributes.position, n = g.attributes.normal, u = g.attributes.uv, c = g.attributes.color;
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      nor.push(n.getX(i), n.getY(i), n.getZ(i));
      uv.push(u.getX(i), u.getY(i));
      if (c) col.push(c.getX(i), c.getY(i), c.getZ(i)); else col.push(1, 1, 1);
    }
    const ix = g.index;
    for (let i = 0; i < ix.count; i++) idx.push(ix.getX(i) + base);
    base += p.count;
    g.dispose();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}

// 바닥에 닿은 곳을 어둡게: 작은 캔버스에 흐린 그림자를 그려 깐다
function contactShadow(map, own) {
  const floors = map.boxes.filter((b) => b.floor && Math.abs(b.max[1]) < 0.01);
  if (!floors.length) return null;
  const R = map.bounds + 1;
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  const k = size / (R * 2);
  const px = (v) => (v + R) * k;
  x.save();
  x.beginPath();
  for (const f of floors) x.rect(px(f.min[0]), px(f.min[2]), (f.max[0] - f.min[0]) * k, (f.max[2] - f.min[2]) * k);
  x.clip();
  x.shadowColor = 'rgba(0,0,0,1)';
  x.shadowBlur = 34;
  x.fillStyle = 'rgba(0,0,0,.72)';
  for (const b of map.boxes) {
    if (b.floor || b.min[1] > 0.6 || b.max[1] < 0.05) continue;
    x.fillRect(px(b.min[0]) - 2, px(b.min[2]) - 2, (b.max[0] - b.min[0]) * k + 4, (b.max[2] - b.min[2]) * k + 4);
  }
  x.restore();
  const tex = own(new THREE.CanvasTexture(c));
  tex.anisotropy = 4;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(R * 2, R * 2).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
  );
  m.position.y = 0.012;
  m.renderOrder = -1;
  return m;
}

function lightPool(x, y, z, r, color, opacity = 0.5) {
  const m = new THREE.Mesh(
    new THREE.CircleGeometry(r, 28).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ map: softTexture(), color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }),
  );
  m.position.set(x, y + 0.02, z);
  return m;
}

function coneMaterial(color, opacity) {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { c: { value: new THREE.Color(color) }, o: { value: opacity } },
    vertexShader: 'varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'uniform vec3 c; uniform float o; varying vec2 vU; void main(){ gl_FragColor = vec4(c, vU.y * vU.y * o); }',
  });
}

// 불꽃처럼 흔들리는 스프라이트 한 벌
function makeFlame(s, x, y, z) {
  const mat = new THREE.SpriteMaterial({ map: flashTexture(), color: new THREE.Color(3.2, 1.5, 0.35), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const f = new THREE.Sprite(mat);
  f.position.set(x, y, z);
  f.scale.setScalar(1.3);
  s.add(f);
  return f;
}

export function decorateWorld(game, map, s, own) {
  const look = LOOK[map.id] ?? LOOK.ohio;
  const updaters = [];
  const effects = game.effects;

  const ao = contactShadow(map, own);
  if (ao) s.add(ao);

  // 네온 막대
  if (look.neon) {
    for (const [col, bars] of neonBars(map.boxes, look.neon)) {
      const parts = bars.map(([w, h, d, x, y, z]) => new THREE.BoxGeometry(w, h, d).translate(x, y, z));
      const m = new THREE.Mesh(mergeBoxes(parts), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(2.7) }));
      s.add(m);
    }
  }

  // 태양 원반
  if (look.sunDisc !== undefined) {
    const d = look.sunDir;
    const l = Math.hypot(...d);
    const disc = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTexture(), color: new THREE.Color(look.sunDisc).multiplyScalar(3.4), transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
    disc.scale.setScalar(150);
    disc.position.set((d[0] / l) * 280, (d[1] / l) * 280, (d[2] / l) * 280);
    s.add(disc);
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTexture(), color: new THREE.Color(5, 4.6, 3.8), transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
    core.scale.setScalar(48);
    core.position.copy(disc.position);
    s.add(core);
  }

  // 별
  if (look.stars) {
    const n = 500;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, y = 0.12 + Math.random() * 0.88, r = Math.sqrt(1 - y * y);
      pos[i * 3] = Math.cos(a) * r * 280; pos[i * 3 + 1] = y * 280; pos[i * 3 + 2] = Math.sin(a) * r * 280;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(g, new THREE.PointsMaterial({ color: new THREE.Color(1.8, 1.7, 2), size: 1.5, sizeAttenuation: false, fog: false, transparent: true, depthWrite: false }));
    s.add(stars);
    updaters.push((t) => { stars.rotation.y = t * 0.006; });
  }

  // 구름
  if (look.clouds !== undefined) {
    const puffs = [];
    for (let i = 0; i < 16; i++) {
      const c = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTexture(), color: look.clouds, transparent: true, opacity: 0.34 + Math.random() * 0.2, depthWrite: false, fog: false }));
      const w = 60 + Math.random() * 90;
      c.scale.set(w, w * 0.26, 1);
      c.userData = { a: Math.random() * 6.283, r: 170 + Math.random() * 90, y: 55 + Math.random() * 70, v: 0.004 + Math.random() * 0.006 };
      s.add(c);
      puffs.push(c);
    }
    updaters.push((t) => {
      for (const c of puffs) {
        const u = c.userData, a = u.a + t * u.v;
        c.position.set(Math.cos(a) * u.r, u.y, Math.sin(a) * u.r);
      }
    });
  }

  // 바다
  if (look.ocean !== undefined) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const x = c.getContext('2d');
    x.fillStyle = '#1b6f96';
    x.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 70; i++) {
      x.strokeStyle = i % 3 ? 'rgba(120,215,240,.5)' : 'rgba(255,255,255,.65)';
      x.lineWidth = 1.5 + Math.random() * 2;
      const px = Math.random() * 256, py = Math.random() * 256, l = 16 + Math.random() * 34;
      x.beginPath();
      x.moveTo(px, py);
      x.quadraticCurveTo(px + l / 2, py - 5, px + l, py);
      x.stroke();
    }
    const tex = own(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(60, 60);
    tex.anisotropy = 4;
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(900, 900).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: tex }));
    const y = (map.theme.seaY ?? -7);
    sea.position.y = y;
    s.add(sea);
    updaters.push((t) => {
      tex.offset.set(t * 0.012, t * 0.02);
      sea.position.y = y + Math.sin(t * 0.8) * 0.2;
    });
  }

  // 사무실 형광등: 빛 원뿔과 깜빡임
  if (look.lampCones) {
    const lamps = map.decor.filter((b) => b.kind === 'lamp');
    const coneMat = coneMaterial(new THREE.Color(1, 0.96, 0.62), 0.16);
    const geo = new THREE.CylinderGeometry(0.95, 2.6, 4.9, 16, 1, true);
    const entries = [];
    for (const b of lamps) {
      const x = (b.min[0] + b.max[0]) / 2, z = (b.min[2] + b.max[2]) / 2;
      const cone = new THREE.Mesh(geo, coneMat);
      cone.position.set(x, 2.5, z);
      cone.scale.x = 1.15;
      s.add(cone);
      s.add(lightPool(x, 0, z, 4.2, 0xfff2a0, 0.34));
      entries.push(cone);
    }
    const lampMat = game.lampMat;
    if (lampMat) {
      let next = 3;
      updaters.push((t) => {
        if (t > next) {
          next = t + 2 + Math.random() * 5;
          lampMat.color.setRGB(0.3, 0.3, 0.26);
          coneMat.uniforms.o.value = 0.03;
          setTimeout(() => { lampMat.color.setRGB(3, 2.9, 2.2); coneMat.uniforms.o.value = 0.16; }, 60 + Math.random() * 110);
        }
      });
      lampMat.color.setRGB(3, 2.9, 2.2);
    }
  }

  // 화장실 형광등
  if (look.tubes) {
    const R = map.bounds - 4;
    const parts = [];
    for (const dx of [-R * 0.6, 0, R * 0.6]) for (const dz of [-R * 0.55, R * 0.55]) parts.push(new THREE.BoxGeometry(5, 0.1, 0.22).translate(dx, 12.4, dz));
    s.add(new THREE.Mesh(mergeBoxes(parts), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 3.4, 3.6) })));
  }

  // 경기장 횃불: 입자와 바닥 빛
  if (look.torches) {
    const R = map.bounds - 1.4;
    const spots = [[R, R], [-R, R], [R, -R], [-R, -R], [0, R], [0, -R], [R, 0], [-R, 0]];
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x3a2a1c });
    const flames = [];
    for (const [x, z] of spots) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 5, 8), poleMat);
      pole.position.set(x, 2.5, z);
      pole.castShadow = true;
      s.add(pole);
      flames.push(makeFlame(s, x, 5.5, z));
      s.add(lightPool(x, 0, z, 5, 0xff9040, 0.28));
    }
    let acc = 0;
    updaters.push((t, dt) => {
      acc += dt;
      for (const [i, f] of flames.entries()) {
        f.scale.setScalar(1.4 + Math.sin(t * 13 + i) * 0.25);
        f.material.rotation = Math.sin(t * 8 + i) * 0.4;
      }
      if (acc > 0.13) {
        acc = 0;
        const f = flames[Math.floor(Math.random() * flames.length)];
        effects.burst([f.position.x, f.position.y, f.position.z], { n: 2, speed: 0.5, up: 2.2, color: 0xffa040, size: 0.14, life: 1, hdr: 2.2, drag: 0.5 });
      }
    });
  }

  // 오하이오 구덩이: 밑에서 올라오는 불빛
  if (map.theme.pit) {
    const glow = new THREE.Mesh(
      new THREE.CylinderGeometry(9.2, 6.8, 15, 28, 1, true).translate(0, -8.2, 0),
      coneMaterial(new THREE.Color(1.2, 0.3, 0.05), 0.6),
    );
    s.add(glow);
    let acc = 0;
    updaters.push((t, dt) => {
      acc += dt;
      if (acc > 0.09) {
        acc = 0;
        effects.burst([(Math.random() - 0.5) * 11, -13, (Math.random() - 0.5) * 11], { n: 1, speed: 0.5, up: 6, color: 0xff7030, size: 0.22, life: 2.2, hdr: 2.4, drag: 0.2 });
      }
    });
  }

  // 형광등: 바닥 빛 웅덩이와 빛 원뿔을 각각 한 덩어리로
  if (look.fluoro) {
    const f = look.fluoro;
    if (game.lampMat) game.lampMat.color.setRGB(...f.lamp);
    const pools = [], cones = [];
    for (const b of map.decor) {
      if (b.kind !== 'lamp') continue;
      const x = (b.min[0] + b.max[0]) / 2, z = (b.min[2] + b.max[2]) / 2;
      const sx = b.max[0] - b.min[0], sz = b.max[2] - b.min[2];
      const y = floorBelow(map, x, z, b.min[1]);
      const r = Math.min(4.2, 1.8 + Math.max(sx, sz) * 0.22);
      pools.push(new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2).scale(r + sx * 0.3, 1, r + sz * 0.3).translate(x, y + 0.03, z));
      if (f.cones) {
        const h = b.min[1] - y;
        cones.push(new THREE.CylinderGeometry(0.6, 1.9, h, 12, 1, true).scale(1 + sx * 0.3, 1, 1 + sz * 0.3).translate(x, y + h / 2, z));
      }
    }
    if (pools.length) {
      s.add(new THREE.Mesh(mergeBoxes(pools), new THREE.MeshBasicMaterial({ map: softTexture(), color: f.pool, transparent: true, opacity: 0.3, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 })));
    }
    if (cones.length) s.add(new THREE.Mesh(mergeBoxes(cones), coneMaterial(new THREE.Color(f.pool), 0.08)));
  }

  // 맵별 소품 (충돌 없음)
  if (look.props === 'school') schoolProps(map, s, own);
  if (look.props === 'mart') martProps(map, s, own);

  // 냉동 코너: 냉동고에서 찬 김이 흘러내리고, 바닥에 푸른 빛
  if (look.frost) {
    // 키 큰 벽 냉장고는 앞쪽 바닥, 낮은 냉동고는 뚜껑 위
    const spots = map.boxes.filter((b) => b.kind === 'freezer' && b.max[1] <= 3).map((b) => ({ b, tall: b.max[1] > 2 }));
    for (const { b, tall } of spots) {
      const cx = (b.min[0] + b.max[0]) / 2, cz = tall ? b.max[2] + 1.4 : (b.min[2] + b.max[2]) / 2;
      s.add(lightPool(cx, 0, cz, (b.max[0] - b.min[0]) * 0.45, 0x60d8ff, 0.3));
    }
    let acc = 0;
    updaters.push((t, dt) => {
      acc += dt;
      if (acc < 0.12) return;
      acc = 0;
      const { b, tall } = spots[Math.floor(Math.random() * spots.length)];
      const px = b.min[0] + Math.random() * (b.max[0] - b.min[0]);
      const py = tall ? 0.4 + Math.random() * 2 : b.max[1] + 0.05;
      const pz = tall ? b.max[2] + 0.2 : b.min[2] + Math.random() * (b.max[2] - b.min[2]);
      effects.burst([px, py, pz], { n: 2, speed: 0.35, up: -0.25, color: 0xe4f8ff, size: 0.55, size2: 1.1, life: 1.8, additive: false, alpha: 0.38, drag: 1.2, spread: 0.3 });
    });
  }

  // 떠다니는 먼지: 카메라 주변을 맴돈다
  if (look.motes !== undefined) {
    const n = 90, R = 22;
    const pos = new Float32Array(n * 3);
    const seed = [];
    for (let i = 0; i < n; i++) {
      seed.push([Math.random() * R * 2, Math.random() * 12, Math.random() * R * 2, Math.random() * 6.28]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    const m = new THREE.PointsMaterial({ map: softTexture(), color: new THREE.Color(look.motes).multiplyScalar(1.5), size: 0.13, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(g, m);
    pts.frustumCulled = false;
    s.add(pts);
    updaters.push((t) => {
      const c = game.camera.position;
      for (let i = 0; i < n; i++) {
        const q = seed[i];
        const wrap = (v, w) => ((v % w) + w) % w;
        pos[i * 3] = c.x - R + wrap(q[0] + Math.sin(t * 0.3 + q[3]) * 1.5 - c.x, R * 2);
        pos[i * 3 + 1] = c.y - 3 + wrap(q[1] + (look.bubbles ? t * 0.8 : Math.sin(t * 0.4 + q[3]) * 0.8) - c.y, 12);
        pos[i * 3 + 2] = c.z - R + wrap(q[2] + Math.cos(t * 0.25 + q[3]) * 1.5 - c.z, R * 2);
      }
      g.attributes.position.needsUpdate = true;
    });
  }

  return (t, dt) => { for (const u of updaters) u(t, dt); };
}
