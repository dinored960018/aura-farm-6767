// 입자, 글자, 궤적, 불덩이, 튀는 눈깔, 공습 개 비행기, 잠깐 켜지는 빛
import * as THREE from 'three';
import { groundAt } from '../shared/map.js';
import { softTexture, glowTexture } from './character.js';

const texCache = new Map();

export function textTexture(text, { color = '#fff', stroke = '#000', size = 96, font = 'Impact, "Malgun Gothic", sans-serif' } = {}) {
  const key = `${text}|${color}|${stroke}|${size}`;
  if (texCache.has(key)) return texCache.get(key);
  const c = document.createElement('canvas');
  const x = c.getContext('2d');
  x.font = `900 ${size}px ${font}`;
  const w = Math.ceil(x.measureText(text).width) + size;
  c.width = w;
  c.height = Math.ceil(size * 1.6);
  x.font = `900 ${size}px ${font}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.lineJoin = 'round';
  if (stroke) {
    x.lineWidth = size * 0.18;
    x.strokeStyle = stroke;
    x.strokeText(text, w / 2, c.height / 2);
  }
  x.fillStyle = color;
  x.fillText(text, w / 2, c.height / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData = { aspect: w / c.height };
  if (texCache.size > 200) texCache.clear();
  texCache.set(key, tex);
  return tex;
}

const EYE_GEO = new THREE.SphereGeometry(0.22, 14, 12);
const IRIS_GEO = new THREE.SphereGeometry(0.13, 10, 8);
const PUPIL_GEO = new THREE.SphereGeometry(0.08, 8, 6);
const WHITE = new THREE.MeshBasicMaterial({ color: 0xffffff });
const IRIS = new THREE.MeshBasicMaterial({ color: 0x2b6cff });
const BLACK = new THREE.MeshBasicMaterial({ color: 0x000000 });
const TRACER_GEO = new THREE.CylinderGeometry(0.4, 1, 1, 6, 1).rotateX(-Math.PI / 2);
const easeOutBack = (k) => 1 + 2.7 * (k - 1) ** 3 + 1.7 * (k - 1) ** 2;

// 수천 개를 한 번에 그리는 입자 묶음
class Particles {
  constructor(scene, max, additive) {
    this.max = max;
    this.n = 0;
    this.items = [];
    const g = new THREE.BufferGeometry();
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 4);
    this.size = new Float32Array(max);
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('pColor', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('pSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: { map: { value: softTexture() }, scale: { value: 700 } },
      vertexShader: `attribute vec4 pColor; attribute float pSize; uniform float scale; varying vec4 vC;
        void main(){ vC = pColor; vec4 p = modelViewMatrix * vec4(position, 1.0); gl_PointSize = min(512.0, pSize * scale / max(0.1, -p.z)); gl_Position = projectionMatrix * p; }`,
      fragmentShader: `uniform sampler2D map; varying vec4 vC;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vC.a; if (a < 0.004) discard; gl_FragColor = vec4(vC.rgb, a); }`,
    });
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    this.points.renderOrder = 8;
    scene.add(this.points);
  }

  add(p) {
    if (this.items.length >= this.max) this.items.shift();
    this.items.push(p);
  }

  clear() { this.items.length = 0; }

  update(dt) {
    let w = 0;
    const list = this.items;
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      p.t += dt;
      if (p.t >= p.life) continue;
      p.vy -= p.g * dt;
      const dr = Math.max(0, 1 - p.drag * dt);
      p.vx *= dr; p.vy *= dr; p.vz *= dr;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      if (p.floor !== undefined && p.y < p.floor) { p.y = p.floor; p.vy = Math.abs(p.vy) * 0.4; }
      const k = p.t / p.life;
      const c = p.c0;
      const mix = p.c1 ? k : 0;
      const a = (k < 0.1 ? k / 0.1 : 1) * (1 - k) ** p.fade * p.a;
      const pi = w * 3, ci = w * 4;
      this.pos[pi] = p.x; this.pos[pi + 1] = p.y; this.pos[pi + 2] = p.z;
      if (p.c1) {
        this.col[ci] = c[0] + (p.c1[0] - c[0]) * mix;
        this.col[ci + 1] = c[1] + (p.c1[1] - c[1]) * mix;
        this.col[ci + 2] = c[2] + (p.c1[2] - c[2]) * mix;
      } else {
        this.col[ci] = c[0]; this.col[ci + 1] = c[1]; this.col[ci + 2] = c[2];
      }
      this.col[ci + 3] = a;
      this.size[w] = p.s0 + (p.s1 - p.s0) * k;
      list[w++] = p;
    }
    list.length = w;
    if (w === 0 && this.lastW === 0) return;
    this.lastW = w;
    const g = this.points.geometry;
    g.setDrawRange(0, w);
    for (const [attr, n] of [[g.attributes.position, 3], [g.attributes.pColor, 4], [g.attributes.pSize, 1]]) {
      attr.clearUpdateRanges();
      attr.addUpdateRange(0, w * n);
      attr.needsUpdate = true;
    }
  }
}

const rgb = (hex, k = 1) => {
  const c = new THREE.Color(hex);
  return [c.r * k, c.g * k, c.b * k];
};

// 불덩이 재질: 가운데는 하얗게 뜨겁고 가장자리는 어둡게 끓는다
function fireMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    fog: false,
    uniforms: { t: { value: 0 }, heat: { value: 1 }, fade: { value: 1 } },
    vertexShader: /* glsl */`
      uniform float t; varying vec3 vN, vV; varying float vD;
      float n3(vec3 p){ return sin(p.x*3.1+t*1.7)*sin(p.y*3.7-t*2.3)*sin(p.z*3.3+t*1.3); }
      void main(){
        float d = n3(position*1.3) + 0.5*n3(position*3.1+4.0);
        vD = d;
        vec3 q = position + normal * d * 0.13;
        vec4 p = modelViewMatrix * vec4(q, 1.0);
        vN = normalMatrix * normal; vV = -p.xyz;
        gl_Position = projectionMatrix * p;
      }`,
    fragmentShader: /* glsl */`
      uniform float heat, fade; varying vec3 vN, vV; varying float vD;
      void main(){
        float f = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
        float h = clamp(f * 0.9 + vD * 0.32, 0.0, 1.0) * heat;
        vec3 smoke = vec3(0.12, 0.07, 0.05);
        vec3 fire = vec3(2.6, 0.75, 0.12);
        vec3 core = vec3(4.2, 3.2, 1.7);
        vec3 c = mix(smoke, fire, smoothstep(0.08, 0.5, h));
        c = mix(c, core, smoothstep(0.55, 0.95, h));
        gl_FragColor = vec4(c, fade * smoothstep(0.0, 0.25, f + 0.1));
      }`,
  });
}

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.items = [];
    this.warnings = [];
    this.bouncers = [];
    this.planes = [];
    this.map = null;
    this.camera = null;
    this.soft = new Particles(scene, 900, false);
    this.glow = new Particles(scene, 1400, true);
    // 켜고 끄지 않고 밝기만 바꾼다. 개수가 변하면 셰이더를 다시 만들어 끊긴다.
    this.lights = [];
    for (let i = 0; i < 3; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 10, 1.6);
      l.userData.t = 0;
      l.userData.max = 1;
      l.userData.peak = 0;
      scene.add(l);
      this.lights.push(l);
    }
  }

  setPointScale(px) {
    this.soft.points.material.uniforms.scale.value = px;
    this.glow.points.material.uniforms.scale.value = px;
  }

  add(obj, life, update) {
    this.scene.add(obj);
    this.items.push({ obj, life, max: life, update });
    return obj;
  }

  // 입자 한 움큼
  burst(pos, {
    n = 8, speed = 4, up = 0, color = 0xffffff, color2 = null, size = 0.2, size2 = null, life = 0.5, g = 0, drag = 1,
    additive = true, spread = 0.1, alpha = 1, fade = 1, hdr = 1, dir = null, floor,
  } = {}) {
    const pool = additive ? this.glow : this.soft;
    const c0 = rgb(color, hdr);
    const c1 = color2 !== null ? rgb(color2, hdr) : null;
    for (let i = 0; i < n; i++) {
      let vx = rnd(2), vy = rnd(2), vz = rnd(2);
      const l = Math.hypot(vx, vy, vz) || 1;
      const sp = speed * (0.35 + Math.random() * 0.65);
      vx = (vx / l) * sp; vy = (vy / l) * sp + up; vz = (vz / l) * sp;
      if (dir) { vx = vx * 0.35 + dir[0] * speed; vy = vy * 0.35 + dir[1] * speed; vz = vz * 0.35 + dir[2] * speed; }
      pool.add({
        x: pos[0] + rnd(spread), y: pos[1] + rnd(spread), z: pos[2] + rnd(spread), vx, vy, vz,
        g, drag, t: 0, life: life * (0.6 + Math.random() * 0.6), c0, c1, a: alpha, fade,
        s0: size * (0.7 + Math.random() * 0.6), s1: size2 ?? size * 0.3, floor,
      });
    }
  }

  // 잠깐 켜지는 빛 (폭발, 총구)
  flash(pos, color = 0xffffff, intensity = 30, distance = 12, life = 0.1) {
    let best = this.lights[0];
    for (const l of this.lights) if (l.userData.peak * (l.userData.t / l.userData.max) < best.userData.peak * (best.userData.t / best.userData.max)) best = l;
    best.position.set(pos[0], pos[1], pos[2]);
    best.color.setHex(color);
    best.distance = distance;
    best.userData.t = life;
    best.userData.max = life;
    best.userData.peak = intensity;
    best.intensity = intensity;
  }

  // 공중에 뜨는 글자/이모지
  text(pos, text, { color = '#fff', scale = 1, life = 0.9, rise = 1.8, spin = 0, jitter = 0.4, depthTest = false, stroke = '#000' } = {}) {
    const cam = this.camera?.position;
    if (cam && Math.hypot(cam.x - pos[0], cam.y - pos[1], cam.z - pos[2]) < 3.2) return null;
    const tex = textTexture(text, { color, stroke });
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest, depthWrite: false, fog: false });
    const s = new THREE.Sprite(mat);
    s.position.set(pos[0] + rnd(jitter), pos[1] + rnd(jitter), pos[2] + rnd(jitter));
    const a = tex.userData.aspect;
    s.scale.set(a * scale, scale, 1);
    s.renderOrder = 10;
    const v = Math.random() * 0.6 + 0.7;
    const tilt = rnd(0.25);
    mat.rotation = tilt;
    return this.add(s, life, (it, dt) => {
      const age = it.max - it.life;
      const k = it.life / it.max;
      s.position.y += rise * v * dt * (0.4 + k);
      mat.opacity = Math.min(1, k * 2.6);
      mat.rotation += spin * dt;
      const pop = age < 0.14 ? 0.3 + easeOutBack(age / 0.14) * 0.85 : 1.15 - Math.min(0.15, (age - 0.14) * 0.6);
      s.scale.set(a * scale * pop, scale * pop, 1);
    });
  }

  // 총알 궤적: 뜨거운 심지 + 끝에 불꽃
  tracer(from, to, color = 0xffee66, width = 0.035, life = 0.09) {
    const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
    const len = dir.length();
    if (len < 0.1) return;
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(3.2), transparent: true, depthWrite: false, fog: false });
    const m = new THREE.Mesh(TRACER_GEO, mat);
    m.scale.set(width, width, len);
    m.position.set((from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2);
    m.lookAt(to[0], to[1], to[2]);
    this.add(m, life, (it) => {
      const k = it.life / it.max;
      mat.opacity = k;
      m.scale.x = m.scale.y = width * k;
    }).userData.dispose = () => { mat.dispose(); };
  }

  // 벽이나 몸에 맞은 자리
  impact(pos, color = 0xffee66, n = 7) {
    this.burst(pos, { n, speed: 5.5, color, size: 0.16, life: 0.3, g: 14, drag: 2, hdr: 2.6 });
    this.burst(pos, { n: 1, speed: 0, color, size: 0.75, size2: 0.2, life: 0.1, hdr: 2.2, spread: 0 });
  }

  // 방귀 구름: 몽글몽글
  cloud(pos, n = 3, color = 0x88cc22) {
    this.burst(pos, {
      n, speed: 1.1, up: 0.55, color, color2: 0x4a6a14, size: 0.55, size2: 1.5, life: 0.75, drag: 2.2,
      additive: false, spread: 0.45, alpha: 0.62,
    });
    if (n > 1) this.burst(pos, { n: Math.ceil(n / 2), speed: 0.8, up: 0.5, color, size: 0.2, life: 0.55, hdr: 1.2, spread: 0.4, alpha: 0.5 });
  }

  // 착지 먼지
  dust(pos, n = 6, color = 0xd8c8b8) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.random();
      this.soft.add({
        x: pos[0] + Math.cos(a) * 0.3, y: pos[1] + 0.08, z: pos[2] + Math.sin(a) * 0.3,
        vx: Math.cos(a) * 3, vy: 0.55, vz: Math.sin(a) * 3, g: 0, drag: 4.5, t: 0, life: 0.5, a: 0.42, fade: 1,
        c0: rgb(color), c1: null, s0: 0.3, s1: 0.95,
      });
    }
  }

  poof(pos) {
    this.burst(pos, { n: 12, speed: 3, up: 0.8, color: 0xffffff, color2: 0x8866aa, size: 0.5, size2: 1.3, life: 0.6, drag: 3.5, additive: false, spread: 0.5, alpha: 0.7 });
    this.burst(pos, { n: 10, speed: 5, color: 0xffd21f, size: 0.13, life: 0.45, g: 7, hdr: 2.2 });
  }

  // 위로 솟는 빛 기둥 (부활, 각성 시작)
  pillar(pos, color = 0xffd21f, height = 9, life = 0.6) {
    const geo = new THREE.CylinderGeometry(0.75, 0.95, height, 18, 1, true).translate(0, height / 2, 0);
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      uniforms: { c: { value: new THREE.Color(color).multiplyScalar(2.2) }, f: { value: 1 } },
      vertexShader: 'varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform vec3 c; uniform float f; varying vec2 vU; void main(){ gl_FragColor = vec4(c, (1.0 - vU.y) * (1.0 - vU.y) * f * 0.42); }',
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos[0], pos[1], pos[2]);
    this.add(m, life, (it) => {
      const k = 1 - it.life / it.max;
      mat.uniforms.f.value = (1 - k) ** 1.6;
      m.scale.set(0.45 + k * 1.1, 0.5 + easeOutBack(Math.min(1, k * 2.2)) * 0.5, 0.45 + k * 1.1);
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
    this.burst([pos[0], pos[1] + 0.2, pos[2]], { n: 16, speed: 2, up: 6, color, size: 0.16, life: 0.9, drag: 1.2, spread: 1.1, hdr: 2.2 });
  }

  // 빠진 눈깔: 데굴데굴 튄다
  eyeball(pos, vel) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(EYE_GEO, WHITE));
    const iris = new THREE.Mesh(IRIS_GEO, IRIS);
    iris.position.z = -0.12;
    const p = new THREE.Mesh(PUPIL_GEO, BLACK);
    p.position.z = -0.17;
    g.add(iris, p);
    g.position.set(pos.x, pos.y, pos.z);
    g.scale.setScalar(1.8);
    g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    this.scene.add(g);
    this.bouncers.push({
      g, v: vel.clone(), spin: new THREE.Vector3(rnd(14), rnd(14), rnd(14)), life: 5,
      floor: Math.max(-24, groundAt(this.map, pos.x, pos.z, pos.y + 0.5)),
    });
    if (this.bouncers.length > 12) {
      const old = this.bouncers.shift();
      this.scene.remove(old.g);
    }
  }

  // 폭탄 경고 원
  warning(pos, radius, ms, icon = '🦴', iconScale = 1) {
    const geo = new THREE.RingGeometry(radius * 0.93, radius, 48).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 0.25, 0.1), transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide, fog: false });
    const ring = new THREE.Mesh(geo, mat);
    ring.position.set(pos[0], pos[1] + 0.06, pos[2]);
    const fillGeo = new THREE.CircleGeometry(radius, 40).rotateX(-Math.PI / 2);
    const fillMat = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.1, depthWrite: false, fog: false });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    fill.position.set(0, -0.02, 0);
    ring.add(fill);
    const life = ms / 1000;
    this.add(ring, life, (it) => {
      const k = 1 - it.life / it.max;
      fill.scale.setScalar(Math.max(0.01, k));
      fillMat.opacity = 0.14 + k * 0.32;
      mat.opacity = 0.55 + Math.sin(k * k * 90) * 0.4;
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); fillGeo.dispose(); fillMat.dispose(); };

    // 떨어지는 뼈다귀 폭탄
    const tex = textTexture(icon, { stroke: null, size: 96, font: '"Segoe UI Emoji", sans-serif' });
    const bm = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const bone = new THREE.Sprite(bm);
    bone.scale.set(1.4 * iconScale, iconScale, 1);
    let acc = 0;
    this.add(bone, life, (it, dt) => {
      const k = 1 - it.life / it.max;
      bone.position.set(pos[0], pos[1] + (1 - k * k) * 34, pos[2]);
      bm.rotation += dt * 6;
      acc += dt;
      if (acc > 0.05) {
        acc = 0;
        this.burst([bone.position.x, bone.position.y + 0.3, bone.position.z], { n: 1, speed: 0.3, color: 0xffffff, color2: 0x777777, size: 0.5, size2: 1, life: 0.5, additive: false, alpha: 0.4 });
      }
    });
  }

  explosion(pos) {
    const base = [pos[0], pos[1] + 1, pos[2]];
    this.text(base, 'BOOM', { color: '#ffdd00', scale: 2.4, life: 0.7, stroke: '#ff0000' });
    this.flash(base, 0xff9a40, 180, 26, 0.32);
    const geo = new THREE.SphereGeometry(1, 28, 20);
    const mat = fireMaterial();
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...base);
    this.add(m, 0.55, (it, dt) => {
      const k = 1 - it.life / it.max;
      mat.uniforms.t.value += dt * 3;
      mat.uniforms.heat.value = 1.05 - k * 0.8;
      mat.uniforms.fade.value = Math.min(1, (1 - k) * 2.4);
      m.scale.setScalar(0.6 + (1 - (1 - k) ** 3) * 3.6);
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
    this.burst(base, { n: 26, speed: 15, color: 0xffb040, color2: 0xff3000, size: 0.2, size2: 0.05, life: 0.65, g: 15, drag: 1.3, hdr: 2.8 });
    this.burst(base, { n: 12, speed: 3.5, up: 1.6, color: 0x4a3a30, color2: 0x1c1612, size: 1.3, size2: 3.4, life: 1.5, drag: 2, additive: false, spread: 1.2, alpha: 0.75 });
    this.scorch(pos, 3.6);
    this.ring(pos, 11, 0xffa030);
  }

  // 바닥 그을음
  scorch(pos, radius) {
    const geo = new THREE.CircleGeometry(radius, 24).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ map: softTexture(), color: 0x050302, transparent: true, opacity: 0.8, depthWrite: false });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos[0], pos[1] + 0.035, pos[2]);
    this.add(m, 7, (it) => { mat.opacity = Math.min(0.8, it.life * 0.5); }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
  }

  // 퍼져 나가는 충격파
  ring(pos, radius, color = 0xffc233) {
    const geo = new THREE.TorusGeometry(1, 0.075, 6, 48).rotateX(Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.6), transparent: true, depthWrite: false, fog: false });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos[0], pos[1] + 0.4, pos[2]);
    this.add(m, 0.42, (it) => {
      const k = 1 - it.life / it.max;
      const e = 1 - (1 - k) ** 2.4;
      m.scale.set(0.5 + e * radius, 1 + k * 2, 0.5 + e * radius);
      mat.opacity = (1 - k) ** 1.4;
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
  }

  // 방사능 지대: 바닥 초록 빛과 올라오는 입자
  fallout(pos, radius, ms) {
    const geo = new THREE.CircleGeometry(radius, 40).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ map: softTexture(), color: new THREE.Color(0.5, 2.4, 0.2), transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(pos[0], pos[1] + 0.05, pos[2]);
    let acc = 0;
    this.add(m, ms / 1000, (it, dt) => {
      mat.opacity = Math.min(0.6, it.life * 0.6) * (0.8 + Math.sin(it.life * 7) * 0.2);
      acc += dt;
      if (acc > 0.05) {
        acc = 0;
        const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * radius;
        this.burst([pos[0] + Math.cos(a) * r, pos[1] + 0.2, pos[2] + Math.sin(a) * r], { n: 1, speed: 0.3, up: 2.6, color: 0x7fff50, size: 0.26, life: 1.3, hdr: 2.2, drag: 0.5, spread: 0 });
      }
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
  }

  // 변기맨 물기둥
  geyser(pos, radius) {
    this.pillar(pos, 0x41b6ff, 22, 0.9);
    this.ring(pos, radius, 0x8fdcff);
    this.flash([pos[0], pos[1] + 3, pos[2]], 0x41b6ff, 60, 24, 0.5);
    this.burst([pos[0], pos[1] + 0.5, pos[2]], { n: 70, speed: 5, up: 17, color: 0x8fdcff, color2: 0x2a8cff, size: 0.3, size2: 0.12, life: 1.5, g: 21, drag: 0.2, hdr: 2, spread: 1.6 });
    this.burst([pos[0], pos[1] + 0.3, pos[2]], { n: 20, speed: 12, up: 2, color: 0xffffff, color2: 0x8fdcff, size: 0.8, size2: 1.8, life: 0.8, drag: 3, additive: false, spread: 1, alpha: 0.5 });
  }

  // 히어로 펀치 충격
  punch(pos, n = 1) {
    const at = [pos[0], pos[1] + 1.1, pos[2]];
    this.flash(at, 0xffd21f, 50 + n * 20, 16, 0.2);
    this.ring(pos, 5 + n * 2.5, n >= 3 ? 0xff4040 : 0xffd21f);
    this.burst(at, { n: 18 + n * 8, speed: 10 + n * 2, color: 0xffd21f, color2: 0x2a60ff, size: 0.24, life: 0.5, g: 8, drag: 1.3, hdr: 2.5 });
  }

  // 빠따 탁탁: 대기실
  tap(pos) {
    this.burst(pos, { n: 5, speed: 2.5, up: 0.8, color: 0xffd9a0, size: 0.08, life: 0.3, g: 7, hdr: 1.6, spread: 0.05 });
  }

  // 셰이더를 미리 만들어 첫 폭발에서 끊기지 않게 한다
  prewarm(renderer, camera) {
    const g = new THREE.Group();
    const add = (m) => { const x = new THREE.Mesh(TRACER_GEO, m); g.add(x); return m; };
    const mats = [add(fireMaterial()), add(new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, fog: false })), add(new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }))];
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false }));
    g.add(s);
    this.scene.add(g);
    renderer.compile(this.scene, camera);
    this.scene.remove(g);
    for (const m of mats) m.dispose();
    s.material.dispose();
  }

  // 고양이 할퀴기 자국
  slash(pos, color = 0xff4d6d) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');
    x.strokeStyle = '#fff';
    x.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      x.lineWidth = 5;
      x.beginPath();
      x.moveTo(10 + i * 17, 6);
      x.quadraticCurveTo(14 + i * 15, 32, 4 + i * 17, 58);
      x.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(color).multiplyScalar(2.4), transparent: true, depthWrite: false, depthTest: false, rotation: rnd(1.6), fog: false });
    const s = new THREE.Sprite(mat);
    s.position.set(pos[0] + rnd(0.7), pos[1] + rnd(0.7), pos[2] + rnd(0.7));
    this.add(s, 0.22, (it) => {
      const k = 1 - it.life / it.max;
      mat.opacity = 1 - k;
      s.scale.setScalar(1.1 + k * 0.9);
    }).userData.dispose = () => { tex.dispose(); mat.dispose(); };
  }

  // 버섯구름
  mushroom(pos, radius) {
    const [x, y, z] = pos;
    const g = new THREE.Group();
    g.position.set(x, y, z);
    const ball = new THREE.SphereGeometry(1, 32, 22);
    const fire = fireMaterial();
    const stemGeo = new THREE.CylinderGeometry(0.55, 1, 1, 22, 10, true).translate(0, 0.5, 0);
    const stem = new THREE.Mesh(stemGeo, fire);
    g.add(stem);
    const cap = [];
    for (let i = 0; i < 13; i++) {
      const a = (i / 13) * Math.PI * 2;
      const m = new THREE.Mesh(ball, fire);
      m.userData = { a, r: 0.72 + (i % 2) * 0.28, h: (i % 3) * 0.14 };
      g.add(m);
      cap.push(m);
    }
    const core = new THREE.Mesh(ball, fire);
    g.add(core);
    // 응결 고리
    const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 2.2, 2.2), transparent: true, fog: false, depthWrite: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.007, 6, 64).rotateX(Math.PI / 2), ringMat);
    ring.position.y = 0.4;
    g.add(ring);
    const flash = new THREE.Mesh(ball, new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 6, 5), transparent: true, fog: false, depthWrite: false }));
    g.add(flash);
    let emberAcc = 0;
    this.flash([x, y + 8, z], 0xfff0c0, 900, radius * 3.5, 1.8);
    this.add(g, 8, (it, dt) => {
      const age = it.max - it.life, k = Math.min(1, age / 3.2);
      const height = radius * 1.7 * (1 - (1 - k) ** 2);
      const wide = radius * 0.62 * (0.3 + 0.7 * k);
      stem.scale.set(wide * 0.42, height, wide * 0.42);
      core.position.y = height;
      core.scale.set(wide * 0.8, wide * 0.55, wide * 0.8);
      for (const m of cap) {
        const { a, r, h } = m.userData;
        const spin = a + age * 0.25;
        m.position.set(Math.cos(spin) * wide * r, height + wide * h, Math.sin(spin) * wide * r);
        m.scale.set(wide * 0.5, wide * 0.42, wide * 0.5);
      }
      fire.uniforms.t.value += dt * 0.9;
      fire.uniforms.heat.value = Math.max(0.34, 0.92 - age * 0.14);
      fire.uniforms.fade.value = Math.min(1, it.life / 2);
      ring.scale.setScalar(1 + age * radius * 1.7);
      ringMat.opacity = Math.max(0, 1 - age / 1.1);
      flash.scale.setScalar(radius * Math.min(1, age * 7));
      flash.material.opacity = Math.max(0, 1 - age / 0.6);
      emberAcc += dt;
      if (emberAcc > 0.05 && it.life > 2) {
        emberAcc = 0;
        const a = Math.random() * 6.28, r = wide * (0.3 + Math.random());
        this.burst([x + Math.cos(a) * r, y + height * Math.random(), z + Math.sin(a) * r], { n: 2, speed: 3, up: 4, color: 0xffa040, size: 0.45, life: 1.4, hdr: 2.6, drag: 0.6 });
      }
    }).userData.dispose = () => {
      ball.dispose(); stemGeo.dispose(); ring.geometry.dispose();
      for (const m of [fire, ringMat, flash.material]) m.dispose();
    };
    this.burst([x, y + 0.5, z], { n: 44, speed: 22, up: 1, color: 0x8c7660, color2: 0x352a22, size: 3, size2: 6, life: 2, drag: 1.6, additive: false, spread: 4, alpha: 0.4 });
  }

  // 개 전투기 편대
  dogPlane(side = 1, y = 26) {
    const g = new THREE.Group();
    const grey = new THREE.MeshLambertMaterial({ color: 0x9aa4b2 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.5, 8, 14).rotateX(Math.PI / 2), grey);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(11, 0.2, 1.8), grey);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2, 1.3), grey);
    fin.position.set(0, 1.1, 3.4);
    const burner = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.4, 1.7, 0.5), fog: false }));
    burner.position.z = 4.1;
    g.add(body, wing, fin, burner);
    for (const m of [body, wing, fin]) m.castShadow = true;
    const tex = textTexture('🐶', { stroke: null, size: 128, font: '"Segoe UI Emoji", sans-serif' });
    const face = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    face.scale.set(tex.userData.aspect * 3.6, 3.6, 1);
    face.position.set(0, 0.8, -4.6);
    g.add(face);
    const x0 = rnd(20);
    g.rotation.y = side > 0 ? 0 : Math.PI;
    let acc = 0;
    this.add(g, 3.4, (it, dt) => {
      const k = 1 - it.life / it.max;
      g.position.set(x0, y + Math.sin(k * 15) * 0.7, side * (70 - k * 140));
      g.rotation.z = Math.sin(k * 11) * 0.3;
      acc += dt;
      if (acc > 0.03) {
        acc = 0;
        const back = side * 4.2;
        for (const wx of [-5, 5]) this.burst([x0 + wx, g.position.y, g.position.z + back], { n: 1, speed: 0.1, color: 0xffffff, size: 0.4, size2: 1.2, life: 0.9, additive: false, alpha: 0.5 });
      }
    });
  }

  update(dt) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.life -= dt;
      if (it.life <= 0) {
        this.scene.remove(it.obj);
        it.obj.userData.dispose?.();
        if (it.obj.material && !it.obj.userData.dispose) it.obj.material.dispose();
        this.items.splice(i, 1);
      } else {
        it.update?.(it, dt);
      }
    }
    for (let i = this.bouncers.length - 1; i >= 0; i--) {
      const b = this.bouncers[i];
      b.life -= dt;
      b.v.y -= 22 * dt;
      b.g.position.addScaledVector(b.v, dt);
      b.g.rotation.x += b.spin.x * dt;
      b.g.rotation.y += b.spin.y * dt;
      if (b.g.position.y < b.floor + 0.3) {
        if (b.v.y < -3) this.dust([b.g.position.x, b.floor, b.g.position.z], 2);
        b.g.position.y = b.floor + 0.3;
        b.v.y = Math.abs(b.v.y) * 0.62;
        b.v.x *= 0.72; b.v.z *= 0.72;
        b.spin.multiplyScalar(0.7);
      }
      if (b.life <= 0) { this.scene.remove(b.g); this.bouncers.splice(i, 1); }
    }
    for (const l of this.lights) {
      if (l.userData.t > 0) {
        l.userData.t -= dt;
        l.intensity = Math.max(0, l.userData.peak * (l.userData.t / l.userData.max));
      } else l.intensity = 0;
    }
    this.soft.update(dt);
    this.glow.update(dt);
  }

  clear() {
    for (const it of this.items) { this.scene.remove(it.obj); it.obj.userData.dispose?.(); }
    for (const b of this.bouncers) this.scene.remove(b.g);
    this.items = [];
    this.bouncers = [];
    this.soft.clear();
    this.glow.clear();
    for (const l of this.lights) { l.userData.t = 0; l.intensity = 0; }
  }
}

function rnd(s) { return (Math.random() - 0.5) * s; }
export { glowTexture };
