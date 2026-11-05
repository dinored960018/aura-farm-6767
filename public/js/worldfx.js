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
};

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
