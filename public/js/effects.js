// 스프라이트 글자, 궤적, 튀는 눈깔, 공습 개 비행기
import * as THREE from 'three';
import { groundAt } from '/shared/map.js';

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
  tex.userData = { aspect: w / c.height };
  if (texCache.size > 200) texCache.clear();
  texCache.set(key, tex);
  return tex;
}

const EYE_GEO = new THREE.SphereGeometry(0.22, 12, 10);
const PUPIL_GEO = new THREE.SphereGeometry(0.1, 8, 6);
const WHITE = new THREE.MeshBasicMaterial({ color: 0xffffff });
const BLACK = new THREE.MeshBasicMaterial({ color: 0x000000 });

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.items = [];
    this.warnings = [];
    this.bouncers = [];
    this.planes = [];
  }

  add(obj, life, update) {
    this.scene.add(obj);
    this.items.push({ obj, life, max: life, update });
    return obj;
  }

  // 공중에 뜨는 글자/이모지
  text(pos, text, { color = '#fff', scale = 1, life = 0.9, rise = 1.8, spin = 0, jitter = 0.4, depthTest = false, stroke = '#000' } = {}) {
    const tex = textTexture(text, { color, stroke });
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest, depthWrite: false });
    const s = new THREE.Sprite(mat);
    s.position.set(pos[0] + (Math.random() - 0.5) * jitter, pos[1] + (Math.random() - 0.5) * jitter, pos[2] + (Math.random() - 0.5) * jitter);
    const a = tex.userData.aspect;
    s.scale.set(a * scale, scale, 1);
    s.renderOrder = 10;
    const v = Math.random() * 0.6 + 0.7;
    return this.add(s, life, (it, dt) => {
      const k = it.life / it.max;
      s.position.y += rise * v * dt;
      mat.opacity = Math.min(1, k * 2.2);
      mat.rotation += spin * dt;
      const pop = k > 0.85 ? 1 + (k - 0.85) * 5 : 1;
      s.scale.set(a * scale * pop, scale * pop, 1);
    });
  }

  // 총알 궤적
  tracer(from, to, color = 0xffee66, width = 0.035, life = 0.09) {
    const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
    const len = dir.length();
    if (len < 0.1) return;
    const geo = new THREE.BoxGeometry(width, width, len);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2);
    m.lookAt(to[0], to[1], to[2]);
    this.add(m, life, (it) => {
      mat.opacity = it.life / it.max;
      m.scale.x = m.scale.y = it.life / it.max;
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
  }

  // 방귀 구름
  cloud(pos, n = 3, color = 0x88cc22) {
    for (let i = 0; i < n; i++) {
      const mat = new THREE.SpriteMaterial({ color, transparent: true, opacity: 0.6, depthWrite: false });
      const s = new THREE.Sprite(mat);
      s.position.set(pos[0] + rnd(0.25), pos[1] + rnd(0.25), pos[2] + rnd(0.25));
      const v = [rnd(1), Math.random() * 1.1, rnd(1)];
      const base = 0.3 + Math.random() * 0.45;
      this.add(s, 0.55, (it, dt) => {
        const k = it.life / it.max;
        s.position.x += v[0] * dt; s.position.y += v[1] * dt; s.position.z += v[2] * dt;
        s.scale.setScalar(base * (2 - k));
        mat.opacity = 0.6 * k;
      });
    }
  }

  // 빠진 눈깔: 데굴데굴 튄다
  eyeball(pos, vel) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(EYE_GEO, WHITE));
    const p = new THREE.Mesh(PUPIL_GEO, BLACK);
    p.position.z = -0.17;
    g.add(p);
    g.position.set(pos.x, pos.y, pos.z);
    g.scale.setScalar(1.8);
    this.scene.add(g);
    this.bouncers.push({
      g, v: vel.clone(), spin: new THREE.Vector3(rnd(14), rnd(14), rnd(14)), life: 5,
      floor: Math.max(-24, groundAt(pos.x, pos.z, pos.y + 0.5)),
    });
    if (this.bouncers.length > 12) {
      const old = this.bouncers.shift();
      this.scene.remove(old.g);
    }
  }

  // 폭탄 경고 원
  warning(pos, radius, ms) {
    const geo = new THREE.RingGeometry(radius * 0.92, radius, 40).rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(geo, mat);
    ring.position.set(pos[0], pos[1] + 0.06, pos[2]);
    const fillGeo = new THREE.CircleGeometry(radius, 32).rotateX(-Math.PI / 2);
    const fillMat = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.1, depthWrite: false });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    fill.position.set(0, -0.02, 0);
    ring.add(fill);
    const life = ms / 1000;
    this.add(ring, life, (it) => {
      const k = 1 - it.life / it.max;
      fill.scale.setScalar(Math.max(0.01, k));
      fillMat.opacity = 0.14 + k * 0.32;
      mat.opacity = 0.5 + Math.sin(k * 40) * 0.4;
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); fillGeo.dispose(); fillMat.dispose(); };

    // 떨어지는 뼈다귀 폭탄
    const tex = textTexture('🦴', { stroke: null, size: 96, font: '"Segoe UI Emoji", sans-serif' });
    const bm = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const bone = new THREE.Sprite(bm);
    bone.scale.set(1.4, 1, 1);
    this.add(bone, life, (it, dt) => {
      const k = 1 - it.life / it.max;
      bone.position.set(pos[0], pos[1] + (1 - k * k) * 34, pos[2]);
      bm.rotation += dt * 6;
    });
  }

  explosion(pos) {
    const base = [pos[0], pos[1] + 1, pos[2]];
    this.text(base, 'BOOM', { color: '#ffdd00', scale: 2.4, life: 0.7, stroke: '#ff0000' });
    this.cloud(base, 8, 0xff7a00);
    const geo = new THREE.SphereGeometry(1, 14, 10);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, depthWrite: false });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...base);
    this.add(m, 0.3, (it) => {
      const k = 1 - it.life / it.max;
      m.scale.setScalar(0.5 + k * 5);
      mat.opacity = 0.8 * (1 - k);
    }).userData.dispose = () => { geo.dispose(); mat.dispose(); };
  }

  // 개 전투기 편대
  dogPlane(side = 1, y = 26) {
    const g = new THREE.Group();
    const grey = new THREE.MeshLambertMaterial({ color: 0x9aa4b2 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.5, 8, 10).rotateX(Math.PI / 2), grey);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(11, 0.2, 1.8), grey);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2, 1.3), grey);
    fin.position.set(0, 1.1, 3.4);
    g.add(body, wing, fin);
    const tex = textTexture('🐶', { stroke: null, size: 128, font: '"Segoe UI Emoji", sans-serif' });
    const face = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    face.scale.set(tex.userData.aspect * 3.6, 3.6, 1);
    face.position.set(0, 0.8, -4.6);
    g.add(face);
    const x0 = (Math.random() - 0.5) * 20;
    g.rotation.y = side > 0 ? 0 : Math.PI;
    this.add(g, 3.4, (it) => {
      const k = 1 - it.life / it.max;
      g.position.set(x0, y + Math.sin(k * 15) * 0.7, side * (70 - k * 140));
      g.rotation.z = Math.sin(k * 11) * 0.3;
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
        b.g.position.y = b.floor + 0.3;
        b.v.y = Math.abs(b.v.y) * 0.62;
        b.v.x *= 0.72; b.v.z *= 0.72;
        b.spin.multiplyScalar(0.7);
      }
      if (b.life <= 0) { this.scene.remove(b.g); this.bouncers.splice(i, 1); }
    }
  }

  clear() {
    for (const it of this.items) { this.scene.remove(it.obj); it.obj.userData.dispose?.(); }
    for (const b of this.bouncers) this.scene.remove(b.g);
    this.items = [];
    this.bouncers = [];
  }
}

function rnd(s) { return (Math.random() - 0.5) * s; }
