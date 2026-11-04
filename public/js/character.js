// 대두 + 왕눈깔 캐릭터. 맞으면 눈이 용수철처럼 튀어나온다. 앞쪽은 -Z.
import * as THREE from 'three';
import { SKINS } from '../shared/constants.js';

const lambert = (color, extra = {}) => new THREE.MeshLambertMaterial({ color, ...extra });
const basic = (color, extra = {}) => new THREE.MeshBasicMaterial({ color, ...extra });

function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}

let glowTex = null;
export function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,240,160,1)');
  g.addColorStop(0.35, 'rgba(255,200,50,.55)');
  g.addColorStop(1, 'rgba(255,170,0,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

function nameSprite(text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 96;
  const x = c.getContext('2d');
  x.font = '900 56px "Malgun Gothic", sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.lineWidth = 12;
  x.strokeStyle = '#000';
  x.strokeText(text, 256, 50);
  x.fillStyle = '#fff';
  x.fillText(text, 256, 50);
  const tex = new THREE.CanvasTexture(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  s.scale.set(2.4, 0.45, 1);
  return s;
}

const GEO = {
  head: new THREE.SphereGeometry(0.52, 20, 16),
  eye: new THREE.SphereGeometry(0.2, 14, 12),
  pupil: new THREE.SphereGeometry(0.085, 10, 8),
  stalk: new THREE.CylinderGeometry(0.05, 0.075, 1, 8).rotateX(Math.PI / 2).translate(0, 0, -0.5),
  limb: new THREE.BoxGeometry(0.17, 0.62, 0.17).translate(0, -0.28, 0),
  leg: new THREE.BoxGeometry(0.2, 0.62, 0.22).translate(0, -0.31, 0),
  torso: new THREE.CylinderGeometry(0.3, 0.38, 0.72, 12),
};

export class Character {
  constructor(skinId, name) {
    this.skinId = skinId;
    this.nameText = name;
    this.root = new THREE.Group();
    this.visual = new THREE.Group();
    this.root.add(this.visual);
    this.build(skinId);
    if (name) {
      this.tag = nameSprite(name);
      this.tag.position.y = 2.65;
      this.tag.renderOrder = 5;
      this.root.add(this.tag);
    }
    this.eyePop = 0;
    this.eyeVel = 0;
    this.walkT = 0;
    this.deadT = -1;
    this.flash = 0;
    this.time = Math.random() * 10;
    this.lastPos = new THREE.Vector3();
    this.speed = 0;
    this.pitch = 0;
    this.emote = 0;
    this.ultra = false;
    this.ultraKind = null;
    this.bigHead = false;
    this.headScale = 1;
    this.setWeapon('fart');
  }

  build(skinId) {
    const def = SKINS[skinId] ?? SKINS.minsu;
    const skin = lambert(def.skin);
    const shirt = lambert(def.shirt);
    const pants = lambert(0x2a2a3a);
    this.mats = [skin, shirt, pants];

    const v = this.visual;
    this.torso = mesh(GEO.torso, shirt, 0, 0.96, 0);
    v.add(this.torso);

    this.legL = mesh(GEO.leg, pants, -0.17, 0.62, 0);
    this.legR = mesh(GEO.leg, pants, 0.17, 0.62, 0);
    v.add(this.legL, this.legR);

    this.armL = mesh(GEO.limb, skin, -0.42, 1.24, 0);
    this.armR = mesh(GEO.limb, skin, 0.42, 1.24, 0);
    v.add(this.armL, this.armR);

    this.gun = new THREE.Group();
    this.gun.position.set(0, -0.56, -0.2);
    this.armR.add(this.gun);

    // 머리
    this.head = new THREE.Group();
    this.head.position.y = 1.62;
    v.add(this.head);
    this.head.add(mesh(GEO.head, skin));

    // 눈깔
    this.eyes = [-0.21, 0.21].map((x) => {
      const eye = new THREE.Group();
      const base = new THREE.Vector3(x, 0.12, -0.42);
      eye.position.copy(base);
      const white = mesh(GEO.eye, basic(0xffffff));
      const pupil = mesh(GEO.pupil, basic(0x000000), 0, 0, -0.15);
      eye.add(white, pupil);
      const stalk = mesh(GEO.stalk, lambert(0xff4d6d), x, 0.12, -0.3);
      stalk.scale.z = 0.01;
      this.head.add(eye, stalk);
      return { group: eye, pupil, stalk, base, white };
    });

    // 입
    this.mouth = mesh(new THREE.SphereGeometry(0.17, 12, 8), basic(0x3a0010), 0, -0.2, -0.44);
    this.mouth.scale.set(1.3, 0.35, 0.5);
    this.head.add(this.mouth);

    // 선글라스 (아우라 파밍 중에만)
    this.shades = new THREE.Group();
    const dark = basic(0x050505);
    this.shades.add(
      mesh(new THREE.BoxGeometry(0.3, 0.15, 0.04), dark, -0.2, 0.14, -0.6),
      mesh(new THREE.BoxGeometry(0.3, 0.15, 0.04), dark, 0.2, 0.14, -0.6),
      mesh(new THREE.BoxGeometry(0.72, 0.035, 0.04), dark, 0, 0.2, -0.6),
    );
    this.shades.visible = false;
    this.head.add(this.shades);

    // 스킨별 소품
    if (skinId === 'sigma') {
      this.head.add(mesh(new THREE.BoxGeometry(0.58, 0.36, 0.5), skin, 0, -0.42, -0.12));
      const hair = mesh(new THREE.SphereGeometry(0.53, 14, 8, 0, Math.PI * 2, 0, 1.15), lambert(0x111111), 0, 0.04, 0.02);
      this.head.add(hair);
    } else if (skinId === 'cat') {
      const ear = new THREE.ConeGeometry(0.18, 0.34, 4);
      this.head.add(mesh(ear, skin, -0.32, 0.5, 0), mesh(ear, skin, 0.32, 0.5, 0));
      const tail = mesh(new THREE.BoxGeometry(0.1, 0.1, 0.7), skin, 0, 0.95, 0.5);
      tail.rotation.x = 0.7;
      this.visual.add(tail);
    } else if (skinId === 'cone') {
      const hat = mesh(new THREE.ConeGeometry(0.42, 0.85, 14), lambert(0xff6a00), 0, 0.75, 0);
      this.head.add(hat, mesh(new THREE.CylinderGeometry(0.46, 0.5, 0.06, 14), basic(0xffffff), 0, 0.5, 0));
    } else if (skinId === 'toilet') {
      const porcelain = lambert(0xffffff);
      this.torso.visible = false;
      this.legL.visible = false;
      this.legR.visible = false;
      v.add(mesh(new THREE.CylinderGeometry(0.55, 0.32, 0.8, 16), porcelain, 0, 0.42, 0));
      v.add(mesh(new THREE.TorusGeometry(0.46, 0.09, 8, 18).rotateX(Math.PI / 2), porcelain, 0, 0.82, 0));
      v.add(mesh(new THREE.BoxGeometry(0.85, 1.05, 0.28), porcelain, 0, 0.98, 0.55));
      this.head.position.y = 1.32;
      this.armL.position.y = 1.0;
      this.armR.position.y = 1.0;
    } else {
      this.head.add(mesh(new THREE.SphereGeometry(0.53, 14, 8, 0, Math.PI * 2, 0, 0.9), lambert(0x2b1a10), 0, 0.03, 0.02));
    }

    // 아우라 후광
    this.glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
    }));
    this.glow.scale.set(5, 5, 1);
    this.glow.position.y = 1.2;
    v.add(this.glow);

    // 왕관 (울트라)
    this.crown = new THREE.Group();
    const gold = basic(0xffd700);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      this.crown.add(mesh(new THREE.ConeGeometry(0.1, 0.32, 4), gold, Math.cos(a) * 0.3, 0.14, Math.sin(a) * 0.3));
    }
    this.crown.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.1, 14), gold));
    this.crown.position.y = 0.62;
    this.crown.visible = false;
    this.head.add(this.crown);

    // 변기 소용돌이
    this.whirl = mesh(new THREE.TorusGeometry(2.4, 0.16, 6, 28).rotateX(Math.PI / 2), basic(0x2aa8ff, { transparent: true, opacity: 0.75, depthWrite: false }), 0, 0.3, 0);
    this.whirl2 = mesh(new THREE.TorusGeometry(4.4, 0.12, 6, 32).rotateX(Math.PI / 2), basic(0x8fdcff, { transparent: true, opacity: 0.5, depthWrite: false }), 0, 0.15, 0);
    this.whirl.visible = this.whirl2.visible = false;
    this.root.add(this.whirl, this.whirl2);

    // 그림자 대신 까만 원
    this.blob = mesh(new THREE.CircleGeometry(0.6, 16).rotateX(-Math.PI / 2), basic(0x000000, { transparent: true, opacity: 0.35, depthWrite: false }), 0, 0.02, 0);
    this.root.add(this.blob);
  }

  setWeapon(id) {
    if (this.weaponId === id) return;
    this.weaponId = id;
    this.gun.clear();
    if (id === 'fart') {
      this.gun.add(mesh(new THREE.BoxGeometry(0.16, 0.2, 0.55), lambert(0x6cc644)));
      this.gun.add(mesh(new THREE.ConeGeometry(0.15, 0.25, 10).rotateX(-Math.PI / 2), lambert(0x3a7d1c), 0, 0, -0.36));
    } else if (id === 'six7') {
      this.gun.add(mesh(new THREE.BoxGeometry(0.15, 0.18, 0.28), lambert(0xffd23f)));
      this.gun.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.65, 8).rotateX(Math.PI / 2), lambert(0xaa8800), 0, 0.03, -0.42));
    } else {
      this.gun.add(mesh(new THREE.BoxGeometry(0.17, 0.17, 0.42), lambert(0x333333)));
      this.gun.add(mesh(new THREE.ConeGeometry(0.3, 0.42, 14, 1, true).rotateX(Math.PI / 2), lambert(0xff3d81, { side: THREE.DoubleSide }), 0, 0, -0.42));
    }
  }

  pop(strength = 1) {
    this.eyeVel += 9 * strength;
    this.flash = 0.16;
    for (const m of this.mats) m.emissive?.setHex(0xff0000);
  }

  die() {
    this.deadT = 0;
    this.eyes.forEach((e) => { e.group.visible = false; e.stalk.visible = false; });
    this.tag && (this.tag.visible = false);
  }

  respawn() {
    this.deadT = -1;
    this.visual.rotation.set(0, 0, 0);
    this.visual.position.set(0, 0, 0);
    this.visual.scale.set(1, 1, 1);
    this.visual.visible = true;
    this.blob.visible = true;
    this.eyePop = 0;
    this.eyeVel = 0;
    this.eyes.forEach((e) => { e.group.visible = true; e.stalk.visible = true; });
    this.tag && (this.tag.visible = true);
  }

  eyeWorldPositions() {
    return this.eyes.map((e) => e.group.getWorldPosition(new THREE.Vector3()));
  }

  update(dt) {
    this.time += dt;
    const t = this.time;

    const d = this.root.position.distanceTo(this.lastPos);
    this.speed += ((d / Math.max(dt, 0.001)) - this.speed) * Math.min(1, dt * 10);
    this.lastPos.copy(this.root.position);

    // 사망 연출: 벌러덩 + 납작
    if (this.deadT >= 0) {
      this.deadT += dt;
      const k = Math.min(1, this.deadT * 2.2);
      this.visual.rotation.x = k * 1.57 * (1 + Math.sin(this.deadT * 18) * 0.05 * (1 - k));
      this.visual.position.y = Math.sin(k * Math.PI) * 0.9;
      const squish = this.deadT > 1.4 ? Math.max(0.01, 1 - (this.deadT - 1.4) * 2) : 1;
      this.visual.scale.setScalar(squish);
      if (squish <= 0.02) { this.visual.visible = false; this.blob.visible = false; }
      return;
    }

    // 맞은 빨간색 복귀
    if (this.flash > 0) {
      this.flash -= dt;
      if (this.flash <= 0) for (const m of this.mats) m.emissive?.setHex(0x000000);
    }

    // 눈깔 용수철
    const stiff = 60, damp = 6;
    this.eyeVel += (-stiff * this.eyePop - damp * this.eyeVel) * dt;
    this.eyePop += this.eyeVel * dt;
    const kind = this.ultra ? this.ultraKind : null;
    const pop = Math.max(kind === 'minsu' ? 0.4 : 0, this.eyePop);
    for (const e of this.eyes) e.white.material.color.setHex(kind === 'minsu' ? 0xff2a2a : 0xffffff);
    for (const [i, e] of this.eyes.entries()) {
      const jig = pop * 0.15 * Math.sin(t * 40 + i * 2);
      e.group.position.set(e.base.x + jig, e.base.y + jig * 0.6, e.base.z - pop * 1.2);
      e.group.scale.setScalar(1 + pop * 1.1);
      e.stalk.position.set(e.base.x * 0.9, e.base.y, -0.28);
      e.stalk.scale.set(1, 1, Math.max(0.01, pop * 1.2 + 0.05));
      const look = 0.03 * Math.sin(t * (i ? 3.1 : 2.3));
      e.pupil.position.set(look, look * 0.6, -0.15);
    }

    // 다리
    const moving = this.speed > 1;
    if (moving) this.walkT += dt * this.speed * 1.25;
    const swing = moving ? Math.sin(this.walkT) * 0.75 : 0;
    this.legL.rotation.x = swing;
    this.legR.rotation.x = -swing;

    // 머리 크기
    const wantHead = this.bigHead ? 2.15 : 1;
    this.headScale += (wantHead - this.headScale) * Math.min(1, dt * 6);
    this.head.scale.setScalar(this.headScale);
    this.head.rotation.x = -this.pitch * 0.55;

    // 포즈
    this.visual.rotation.y = 0;
    this.visual.position.y = moving ? Math.abs(Math.sin(this.walkT)) * 0.07 : 0;
    const farming = this.emote === 1;
    if (kind === 'cat') {
      // 앞으로 눕듯이 날아서 양손으로 마구 할퀸다
      const s = Math.sin(t * 34);
      this.armL.rotation.set(-2.5 + s * 0.8, 0, 0.3);
      this.armR.rotation.set(-2.5 - s * 0.8, 0, -0.3);
      this.visual.rotation.x = -1.05 + Math.sin(t * 19) * 0.08;
      this.visual.rotation.z = Math.sin(t * 23) * 0.18;
      this.head.rotation.y = 0;
    } else if (farming) {
      this.visual.rotation.x = 0;
      // 뱃머리 소년 춤: 한 손 뻗어 살랑살랑, 몸은 까딱
      this.armR.rotation.set(-2.6 + Math.sin(t * 4.3) * 0.25, 0, -0.4 + Math.sin(t * 8.6) * 0.25);
      this.armL.rotation.set(0.25, 0, 0.75 + Math.sin(t * 4.3) * 0.15);
      this.visual.rotation.z = Math.sin(t * 4.3) * 0.08;
      this.head.rotation.y = Math.sin(t * 2.15) * 0.25;
    } else if (this.emote === 2) {
      // 6-7: 양손을 저울처럼 번갈아 위아래
      const s = Math.sin(t * 11);
      this.visual.rotation.x = 0;
      this.armL.rotation.set(-1.55 + s * 0.55, 0, 0.15);
      this.armR.rotation.set(-1.55 - s * 0.55, 0, -0.15);
      this.visual.rotation.z = s * 0.04;
      this.head.rotation.y = 0;
    } else {
      this.visual.rotation.x = 0;
      this.armR.rotation.set(-1.45 - this.pitch * 0.9, 0, 0);
      this.armL.rotation.set(-1.2 - this.pitch * 0.9, 0, 0.5);
      this.visual.rotation.z = 0;
      this.head.rotation.y = 0;
    }
    this.gun.visible = this.emote === 0 && kind !== 'cat' && kind !== 'minsu';
    if (kind === 'toilet') this.visual.rotation.y = t * 11;
    this.whirl.visible = this.whirl2.visible = kind === 'toilet';
    if (kind === 'toilet') {
      this.whirl.rotation.y = t * 9;
      this.whirl.scale.setScalar(0.7 + ((t * 1.4) % 1) * 0.7);
      this.whirl2.scale.setScalar(1.5 - ((t * 0.9) % 1) * 0.8);
    }

    // 아우라
    const auraOn = farming || kind === 'sigma' || kind === 'cone';
    this.shades.visible = auraOn;
    this.crown.visible = kind === 'sigma';
    const wantGlow = this.ultra ? 0.6 : farming ? 0.38 : 0;
    this.glow.material.opacity += (wantGlow - this.glow.material.opacity) * Math.min(1, dt * 6);
    const gs = 3.2 + Math.sin(t * 7) * 0.35;
    this.glow.scale.set(gs, gs * 1.25, 1);
    const scale = kind === 'sigma' ? 1.3 : kind === 'cat' ? 1.15 : 1;
    this.visual.scale.setScalar(scale);
  }

  setVisibleBody(v) {
    this.visual.visible = v;
    this.blob.visible = v;
    if (this.tag) this.tag.visible = v;
  }

  dispose(scene) { scene.remove(this.root); }
}
