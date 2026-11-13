// 1인칭 총과 손. 총마다 움직이는 부품(리볼버 탄창, 샷건 펌프, 방귀 방석)이 있고
// 반동은 용수철로 튀었다가 돌아온다. 좌표: -z 앞, +y 위, +x 오른쪽 (카메라 기준)
import * as THREE from 'three';
import { toon } from './character.js';
import { textTexture } from './effects.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (k) => k * k * (3 - 2 * k);
const UP = new THREE.Vector3(0, 1, 0);
// 총마다 허리 사격 자리 (작은 총은 앞으로 더 내민다)
const HIP = {
  fart: [0.22, -0.215, -0.66], six7: [0.2, -0.2, -0.6], boom: [0.22, -0.22, -0.7],
  sniper: [0.21, -0.215, -0.72], ice: [0.23, -0.225, -0.68], dual: [0.23, -0.15, -0.5],
};

// 총마다 다른 손맛
const FEEL = {
  fart: { kick: 0.22, climb: 0.05, back: 0.035, roll: 0.02 },
  six7: { kick: 1, climb: 0.32, back: 0.07, roll: 0.06 },
  boom: { kick: 1.25, climb: 0.22, back: 0.12, roll: 0.04 },
  sniper: { kick: 1.4, climb: 0.3, back: 0.14, roll: 0.03 },
  ice: { kick: 1.1, climb: 0.18, back: 0.1, roll: 0.03 },
  dual: { kick: 0.35, climb: 0.08, back: 0.04, roll: 0.05 },
};

export class ViewModel {
  constructor(root, skin, sleeve) {
    this.root = root;
    this.skin = skin;
    this.sleeve = sleeve;
    this.guns = {};
    this.id = 'fart';
    // 용수철 상태
    this.kz = 0; this.kzV = 0; // 뒤로 밀림
    this.kx = 0; this.kxV = 0; // 총구 들림
    this.kr = 0; this.krV = 0; // 비틀림
    this.dip = 0; this.dipV = 0; // 착지
    this.walk = 0;
    this.sprint = 0;
    this.aim = 0;
    this.strafe = 0;
    this.lastShot = 9;
    this.drawT = 0;
    this.build();
  }

  // a에서 b로 이어지는 원통 (팔뚝, 소매)
  limb(group, a, b, r0, r1, mat) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, len, 12), mat);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(UP, dir.normalize());
    group.add(m);
    return m;
  }

  // 손잡이를 감싸 쥔 주먹 + 팔뚝 + 소매가 화면 밖으로
  hand(group, at, elbow, { left = false } = {}) {
    const g = new THREE.Group();
    g.position.copy(at);
    const palm = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 10), this.skin);
    palm.scale.set(1.05, 1.25, 1.1);
    g.add(palm);
    // 손가락 마디가 총 앞쪽을 감싼다
    for (let i = 0; i < 4; i++) {
      const k = new THREE.Mesh(new THREE.SphereGeometry(0.019, 8, 6), this.skin);
      k.position.set(left ? 0.04 : -0.04, 0.045 - i * 0.028, -0.035);
      g.add(k);
    }
    const thumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.016, 0.05, 4, 8), this.skin);
    thumb.position.set(left ? -0.045 : 0.045, 0.05, -0.03);
    thumb.rotation.x = 1.2;
    g.add(thumb);
    group.add(g);
    const wrist = at.clone().add(new THREE.Vector3(0, -0.035, 0.03));
    this.limb(group, wrist, elbow, 0.04, 0.052, this.skin);
    const shoulder = elbow.clone().add(new THREE.Vector3(left ? -0.2 : 0.2, -0.3, 0.5));
    // 소매는 손목 조금 뒤부터
    const cuff = wrist.clone().lerp(elbow, 0.55);
    this.limb(group, cuff, shoulder, 0.07, 0.085, this.sleeve);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.012, 6, 16), this.sleeve);
    ring.position.copy(cuff);
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), elbow.clone().sub(wrist).normalize());
    group.add(ring);
    return g;
  }

  build() {
    const L = (c) => toon(c);
    const H = (r, g, b) => new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b) });
    const add = (group, geo, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      group.add(m);
      return m;
    };
    const V = (x, y, z) => new THREE.Vector3(x, y, z);

    // ---- 방귀 기관총: 녹색 통 + 앞 손잡이 + 위에 방귀 방석
    const fart = new THREE.Group();
    add(fart, new THREE.CapsuleGeometry(0.07, 0.34, 6, 16).rotateX(Math.PI / 2), L(0x6cc644), 0, 0.05, -0.12);
    add(fart, new THREE.ConeGeometry(0.1, 0.18, 16).rotateX(-Math.PI / 2), L(0x2f7a1a), 0, 0.05, -0.45);
    add(fart, new THREE.CylinderGeometry(0.035, 0.035, 0.06, 12).rotateX(Math.PI / 2), L(0x1d3d10), 0, 0.05, -0.56);
    for (const z of [-0.26, -0.12, 0.02]) add(fart, new THREE.TorusGeometry(0.073, 0.008, 6, 20), L(0x2c4a18), 0, 0.05, z);
    const gas = add(fart, new THREE.CapsuleGeometry(0.019, 0.26, 4, 10).rotateX(Math.PI / 2), H(1.4, 3, 0.35), 0.068, 0.09, -0.12);
    const cushion = add(fart, new THREE.SphereGeometry(0.045, 14, 10), L(0xff66b2), 0, 0.14, -0.02);
    cushion.scale.set(1.25, 0.6, 1.45);
    add(fart, new THREE.CylinderGeometry(0.008, 0.012, 0.04, 8), L(0xd83a8a), 0, 0.155, 0.04).rotation.x = 1.1;
    add(fart, new THREE.BoxGeometry(0.055, 0.05, 0.16), L(0x2a2a2a), 0, 0.0, 0.1); // 개머리 뿌리
    add(fart, new THREE.BoxGeometry(0.05, 0.13, 0.06), L(0x222222), 0, -0.07, 0.04).rotation.x = 0.25; // 손잡이
    add(fart, new THREE.BoxGeometry(0.045, 0.12, 0.05), L(0x222222), 0, -0.04, -0.3); // 앞 손잡이
    this.hand(fart, V(0, -0.075, 0.045), V(0.12, -0.24, 0.3));
    this.hand(fart, V(0, -0.075, -0.3), V(-0.2, -0.26, -0.06), { left: true });
    fart.userData = { muzzle: V(0, 0.05, -0.6), gas, cushion };

    // ---- 67 리볼버: 탄창이 돌고 공이가 젖혀진다
    const six7 = new THREE.Group();
    const gold = L(0xffd23f);
    add(six7, new THREE.BoxGeometry(0.075, 0.1, 0.16), gold, 0, 0.04, -0.02); // 몸통
    add(six7, new THREE.CylinderGeometry(0.03, 0.034, 0.36, 14).rotateX(Math.PI / 2), L(0xb8930a), 0, 0.065, -0.27); // 총열
    add(six7, new THREE.BoxGeometry(0.02, 0.022, 0.32), L(0xb8930a), 0, 0.095, -0.27); // 총열 위 띠
    add(six7, new THREE.BoxGeometry(0.012, 0.03, 0.014), H(3.2, 0.3, 1.2), 0, 0.12, -0.42); // 가늠쇠
    const cyl = new THREE.Group();
    cyl.position.set(0, 0.035, -0.07);
    add(cyl, new THREE.CylinderGeometry(0.058, 0.058, 0.1, 12).rotateX(Math.PI / 2), L(0x8a8a90));
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      add(cyl, new THREE.CylinderGeometry(0.012, 0.012, 0.102, 8).rotateX(Math.PI / 2), L(0x3a3a40), Math.cos(a) * 0.036, Math.sin(a) * 0.036, 0);
    }
    six7.add(cyl);
    const hammer = new THREE.Group();
    hammer.position.set(0, 0.08, 0.055);
    add(hammer, new THREE.BoxGeometry(0.018, 0.05, 0.02), L(0x555555), 0, 0.02, 0);
    six7.add(hammer);
    const grip = add(six7, new THREE.BoxGeometry(0.06, 0.16, 0.07), L(0x6b3a14), 0, -0.06, 0.07);
    grip.rotation.x = 0.35;
    add(six7, new THREE.TorusGeometry(0.03, 0.007, 6, 14, Math.PI), L(0x8a6a08), 0, -0.01, -0.02).rotation.z = Math.PI; // 방아쇠울
    const tag = textTexture('67', { color: '#ff0080', stroke: '#fff', size: 96 });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.065), new THREE.MeshBasicMaterial({ map: tag, transparent: true, side: THREE.DoubleSide }));
    label.position.set(-0.039, 0.04, -0.02);
    label.rotation.y = -Math.PI / 2;
    six7.add(label);
    this.hand(six7, V(0, -0.07, 0.075), V(0.1, -0.24, 0.32));
    // 왼손은 오른손 밑을 받친다
    this.hand(six7, V(-0.035, -0.11, 0.06), V(-0.2, -0.3, 0.2), { left: true });
    six7.userData = { muzzle: V(0, 0.065, -0.48), cyl, hammer };

    // ---- 바인붐 샷건: 나팔 총구 + 펌프
    const boom = new THREE.Group();
    add(boom, new THREE.BoxGeometry(0.09, 0.1, 0.3), L(0x333340), 0, 0.04, -0.02);
    add(boom, new THREE.CylinderGeometry(0.035, 0.035, 0.32, 12).rotateX(Math.PI / 2), L(0x26262e), 0, 0.06, -0.3);
    const horn = add(boom, new THREE.ConeGeometry(0.15, 0.22, 20, 1, true).rotateX(Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xff3d81, side: THREE.DoubleSide }), 0, 0.06, -0.52);
    add(boom, new THREE.CircleGeometry(0.15, 20), L(0x111111), 0, 0.06, -0.41);
    add(boom, new THREE.TorusGeometry(0.15, 0.01, 6, 28), H(3, 0.9, 1.8), 0, 0.06, -0.63);
    add(boom, new THREE.BoxGeometry(0.03, 0.03, 0.22), L(0xff3d81), 0, 0.105, -0.03); // 위 레일
    add(boom, new THREE.BoxGeometry(0.016, 0.016, 0.016), H(0.3, 3, 1), 0.05, 0.05, 0.08); // 장전 표시등
    add(boom, new THREE.BoxGeometry(0.07, 0.08, 0.22), L(0x26262e), 0, 0.0, 0.2).rotation.x = 0.12; // 개머리
    add(boom, new THREE.BoxGeometry(0.055, 0.13, 0.06), L(0x222222), 0, -0.06, 0.08).rotation.x = 0.3;
    const pump = new THREE.Group();
    pump.position.set(0, 0.0, -0.28);
    add(pump, new THREE.BoxGeometry(0.075, 0.06, 0.16), L(0xff3d81));
    for (const z of [-0.05, 0, 0.05]) add(pump, new THREE.BoxGeometry(0.08, 0.008, 0.012), L(0x9a1d4c), 0, -0.03, z);
    boom.add(pump);
    this.hand(boom, V(0, -0.075, 0.09), V(0.12, -0.24, 0.34));
    this.hand(pump, V(0, -0.055, 0.01), V(-0.22, -0.24, 0.24), { left: true });
    boom.userData = { muzzle: V(0, 0.06, -0.64), pump, horn };

    // ---- 모깅 저격총: 긴 총열 + 큰 조준경 + 볼트
    const sniper = new THREE.Group();
    const purple = L(0x3b2a5c);
    add(sniper, new THREE.BoxGeometry(0.075, 0.09, 0.42), purple, 0, 0.03, -0.08);
    add(sniper, new THREE.CylinderGeometry(0.022, 0.026, 0.6, 12).rotateX(Math.PI / 2), L(0x1d1d24), 0, 0.05, -0.58);
    add(sniper, new THREE.CylinderGeometry(0.038, 0.032, 0.09, 12).rotateX(Math.PI / 2), L(0x1d1d24), 0, 0.05, -0.9); // 소음기처럼 생긴 총구
    add(sniper, new THREE.CylinderGeometry(0.038, 0.038, 0.26, 14).rotateX(Math.PI / 2), L(0x16161c), 0, 0.135, -0.1); // 조준경
    add(sniper, new THREE.CylinderGeometry(0.05, 0.042, 0.05, 14).rotateX(Math.PI / 2), L(0x16161c), 0, 0.135, -0.25);
    add(sniper, new THREE.CircleGeometry(0.04, 14), H(0.4, 1.6, 3), 0, 0.135, -0.276); // 렌즈
    for (const z of [-0.03, -0.17]) add(sniper, new THREE.BoxGeometry(0.03, 0.05, 0.02), L(0x16161c), 0, 0.09, z);
    add(sniper, new THREE.BoxGeometry(0.06, 0.1, 0.24), purple, 0, -0.005, 0.24).rotation.x = 0.1; // 개머리
    add(sniper, new THREE.BoxGeometry(0.05, 0.12, 0.055), L(0x222222), 0, -0.07, 0.07).rotation.x = 0.3;
    const bolt = new THREE.Group();
    bolt.position.set(0.05, 0.05, 0.03);
    add(bolt, new THREE.CylinderGeometry(0.01, 0.01, 0.06, 8).rotateZ(Math.PI / 2), L(0xb8b8c0), 0.03, 0, 0);
    add(bolt, new THREE.SphereGeometry(0.018, 10, 8), L(0xb8b8c0), 0.065, 0, 0);
    sniper.add(bolt);
    const mogTag = textTexture('MOG', { color: '#ffe600', stroke: '#000', size: 80 });
    const mog = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.05), new THREE.MeshBasicMaterial({ map: mogTag, transparent: true, side: THREE.DoubleSide }));
    mog.position.set(-0.039, 0.03, -0.12);
    mog.rotation.y = -Math.PI / 2;
    sniper.add(mog);
    this.hand(sniper, V(0, -0.075, 0.075), V(0.12, -0.24, 0.32));
    this.hand(sniper, V(0, -0.03, -0.3), V(-0.2, -0.26, -0.04), { left: true });
    sniper.userData = { muzzle: V(0, 0.05, -0.95), bolt };

    // ---- 드라이아이스 런처: 투명한 통 안에서 김이 도는 굵은 발사기
    const ice = new THREE.Group();
    add(ice, new THREE.CylinderGeometry(0.085, 0.085, 0.42, 16).rotateX(Math.PI / 2), L(0x2e6fb8), 0, 0.05, -0.18);
    const tank = add(ice, new THREE.CylinderGeometry(0.06, 0.06, 0.22, 14), H(0.75, 1.6, 2.2), 0.0, 0.17, -0.04);
    tank.rotation.x = Math.PI / 2;
    add(ice, new THREE.TorusGeometry(0.062, 0.01, 6, 16), L(0xdfe8f2), 0, 0.17, 0.07);
    add(ice, new THREE.TorusGeometry(0.062, 0.01, 6, 16), L(0xdfe8f2), 0, 0.17, -0.15);
    add(ice, new THREE.CylinderGeometry(0.11, 0.09, 0.08, 16).rotateX(Math.PI / 2), L(0xdfe8f2), 0, 0.05, -0.43);
    add(ice, new THREE.CircleGeometry(0.07, 16), L(0x0d2340), 0, 0.05, -0.471);
    for (const z of [-0.3, -0.12]) add(ice, new THREE.TorusGeometry(0.087, 0.008, 6, 20), L(0x9fd0ff), 0, 0.05, z);
    add(ice, new THREE.BoxGeometry(0.06, 0.07, 0.2), L(0x1d3d66), 0, 0.0, 0.12); // 뒤
    add(ice, new THREE.BoxGeometry(0.05, 0.13, 0.06), L(0x222222), 0, -0.07, 0.05).rotation.x = 0.25;
    add(ice, new THREE.BoxGeometry(0.045, 0.11, 0.05), L(0x222222), 0, -0.05, -0.27);
    const frost = textTexture('-78°C', { color: '#bfeaff', stroke: '#0d2340', size: 72 });
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.05), new THREE.MeshBasicMaterial({ map: frost, transparent: true, side: THREE.DoubleSide }));
    fl.position.set(-0.087, 0.05, -0.18);
    fl.rotation.y = -Math.PI / 2;
    ice.add(fl);
    this.hand(ice, V(0, -0.08, 0.05), V(0.12, -0.25, 0.3));
    this.hand(ice, V(0, -0.08, -0.27), V(-0.2, -0.27, -0.04), { left: true });
    ice.userData = { muzzle: V(0, 0.05, -0.5), tank };

    // ---- 쌍권총: 양손에 하나씩, 번갈아 쏜다
    const dual = new THREE.Group();
    const pistol = (x, left) => {
      const g = new THREE.Group();
      g.position.x = x;
      add(g, new THREE.BoxGeometry(0.055, 0.075, 0.24), L(0xff8a1f), 0, 0.05, -0.08); // 슬라이드
      add(g, new THREE.BoxGeometry(0.05, 0.03, 0.18), L(0x2a2a2a), 0, 0.0, -0.06);
      add(g, new THREE.CylinderGeometry(0.014, 0.014, 0.04, 8).rotateX(Math.PI / 2), L(0x111111), 0, 0.055, -0.215);
      add(g, new THREE.BoxGeometry(0.05, 0.13, 0.06), L(0x2a2a2a), 0, -0.06, 0.03).rotation.x = 0.3;
      add(g, new THREE.BoxGeometry(0.01, 0.018, 0.012), H(3, 1.2, 0.2), 0, 0.095, -0.19);
      this.hand(g, V(0, -0.06, 0.035), V(left ? -0.1 : 0.1, -0.24, 0.3), { left });
      dual.add(g);
      return g;
    };
    const gunR = pistol(0, false);
    const gunL = pistol(-0.42, true);
    dual.userData = { muzzle: V(0, 0.055, -0.24), gunR, gunL, muzzleL: V(-0.42, 0.055, -0.24), muzzleR: V(0, 0.055, -0.24) };

    this.guns = { fart, six7, boom, sniper, ice, dual };
    for (const g of Object.values(this.guns)) {
      g.visible = false;
      this.root.add(g);
    }
  }

  set(id) {
    this.id = id;
    for (const [k, g] of Object.entries(this.guns)) g.visible = k === id;
    this.drawT = 1;
    this.reloadK = 0;
    this.muzzle = this.guns[id]?.userData.muzzle ?? null;
    return this.muzzle;
  }

  fire(id) {
    const f = FEEL[id] ?? FEEL.fart;
    this.kzV += f.back * 60;
    this.kxV += f.climb * 30;
    this.krV += (Math.random() - 0.5) * f.roll * 60;
    this.lastShot = 0;
    const u = this.guns[id]?.userData;
    if (!u) return;
    if (u.gunL) {
      // 번갈아 쏜다: 쏜 쪽 총만 튄다
      this.leftNext = !this.leftNext;
      const left = this.leftNext;
      this.muzzle = left ? u.muzzleL : u.muzzleR;
      (left ? u.gunL : u.gunR).userData.kick = 1;
      this.krV += (left ? 1 : -1) * 2;
    }
    if (u.bolt) this.boltT = 1;
    if (u.tank) this.tankT = 1;
    if (u.cyl) { this.cylTo = (this.cylTo ?? 0) + Math.PI / 3; this.hammerT = 1; }
    if (u.pump) this.pumpT = 1;
    if (u.cushion) this.squishT = 1;
  }

  land(strength = 1) { this.dipV -= 1.6 * strength; }

  // s: { dt, t, speed, fwd, side, onGround, vy, zoom, sway:[x,y], reloadK (0~1 또는 -1), sigma, slap }
  update(s) {
    const { dt } = s;
    for (const k of ['kz', 'kzV', 'kx', 'kxV', 'kr', 'krV', 'dip', 'dipV', 'walk', 'bob', 'sprint', 'aim', 'strafe']) if (!Number.isFinite(this[k])) this[k] = 0;
    const step = (x, v, k, d) => { v += (-k * x - d * v) * dt; return [x + v * dt, v]; };
    [this.kz, this.kzV] = step(this.kz, this.kzV, 260, 20);
    [this.kx, this.kxV] = step(this.kx, this.kxV, 180, 17);
    [this.kr, this.krV] = step(this.kr, this.krV, 160, 14);
    [this.dip, this.dipV] = step(this.dip, this.dipV, 120, 13);
    this.lastShot += dt;
    this.drawT = Math.max(0, this.drawT - dt * 3.6);

    const moving = s.onGround && s.speed > 0.6;
    this.walk += dt * (moving ? 5 + s.speed * 0.55 : 0);
    const bobAmt = moving ? Math.min(1, s.speed / 8) : 0;
    this.bob = (this.bob ?? 0) + (bobAmt - (this.bob ?? 0)) * Math.min(1, dt * 8);
    const wantSprint = s.speed > 7.2 && s.onGround && this.lastShot > 0.35 && !s.zoom && s.reloadK < 0 ? 1 : 0;
    this.sprint += (wantSprint - this.sprint) * Math.min(1, dt * 7);
    this.aim += ((s.zoom ? 1 : 0) - this.aim) * Math.min(1, dt * 12);
    this.strafe += (clamp(s.side / 9, -1, 1) - this.strafe) * Math.min(1, dt * 6);
    const breathe = Math.sin(s.t * 1.7);

    const r = this.root;
    const b = this.bob * (1 - this.aim * 0.8);
    // 8자 흔들림: 옆으로 한 번 갈 때 위아래 두 번
    const bx = Math.sin(this.walk) * 0.018 * b;
    const by = -Math.abs(Math.cos(this.walk)) * 0.016 * b;
    const hip = HIP[this.id] ?? HIP.fart;
    const ads = [0.0, hip[1] + 0.06, hip[2] + 0.06];
    const base = hip.map((v, i) => v + (ads[i] - v) * this.aim);
    r.position.set(
      base[0] + bx + s.sway[0] * 0.09 - this.sprint * 0.06,
      base[1] + by + breathe * 0.004 * (1 - this.aim) + s.sway[1] * 0.08 - this.sprint * 0.05 + this.dip * 0.05 - clamp(s.vy, -12, 12) * 0.0018,
      base[2] + this.kz,
    );
    r.rotation.set(
      this.kx + s.sway[1] * 0.9 - this.sprint * 0.35 + Math.cos(this.walk * 2) * 0.012 * b,
      0.035 * (1 - this.aim) + s.sway[0] + this.sprint * 0.55,
      this.kr - this.strafe * 0.07 * (1 - this.aim) + this.sprint * 0.18 + bx * 1.5,
    );

    // 꺼낼 때: 아래에서 휙 올라온다
    if (this.drawT > 0) {
      const d = ease(this.drawT);
      r.position.y -= d * 0.32;
      r.rotation.x -= d * 0.8;
      r.rotation.z += d * 0.4;
    }

    // 장전: 총마다 다르게
    const u = this.guns[this.id]?.userData ?? {};
    if (s.reloadK >= 0) {
      const k = s.reloadK;
      const inOut = Math.sin(Math.min(1, k * 1.25) * Math.PI); // 내려갔다 올라오기
      if (this.id === 'six7') {
        // 왼쪽으로 눕히고 탄창을 손가락으로 휘리릭
        r.rotation.z += inOut * 0.9;
        r.rotation.x += inOut * 0.35;
        r.position.y -= inOut * 0.06;
        u.cyl.rotation.z = k * Math.PI * 6;
      } else if (this.id === 'boom') {
        // 오른쪽으로 비틀어 한 발씩 쑤셔 넣고 마지막에 철컥
        r.rotation.z -= inOut * 0.55;
        r.rotation.x += inOut * 0.25;
        r.position.y -= inOut * 0.05;
        const shells = Math.floor(k * 4);
        const sk = (k * 4) % 1;
        if (k < 0.82) r.position.z += Math.sin(sk * Math.PI) * 0.025 * (shells < 3 ? 1 : 0);
        u.pump.position.z = -0.28 + (k > 0.82 ? Math.sin(((k - 0.82) / 0.18) * Math.PI) * 0.08 : 0);
      } else if (this.id === 'sniper') {
        // 총을 기울여 탄창 빼고 꽂은 뒤 볼트를 당겼다 민다
        r.rotation.z += inOut * 0.5;
        r.rotation.x += inOut * 0.2;
        r.position.y -= inOut * 0.07;
        const pull = k > 0.75 ? Math.sin(((k - 0.75) / 0.25) * Math.PI) : 0;
        u.bolt.position.z = 0.03 + pull * 0.07;
        u.bolt.rotation.z = pull * 0.9;
      } else if (this.id === 'ice') {
        // 통을 비틀어 새 드라이아이스 통으로 갈아 끼운다
        r.rotation.z -= inOut * 0.6;
        r.rotation.x += inOut * 0.3;
        r.position.y -= inOut * 0.08;
        u.tank.position.y = 0.17 + (k > 0.25 && k < 0.7 ? Math.sin(((k - 0.25) / 0.45) * Math.PI) * 0.12 : 0);
        u.tank.rotation.z = k * Math.PI * 2;
      } else if (this.id === 'dual') {
        // 양손을 안쪽으로 모아 탄창 갈기
        r.rotation.x += inOut * 0.55;
        r.position.y -= inOut * 0.12;
        u.gunL.rotation.z = -inOut * 0.6;
        u.gunR.rotation.z = inOut * 0.6;
      } else if (u.cushion) {
        // 방귀 기관총: 내려서 방석을 꾹꾹 두 번 눌러 충전
        r.rotation.x += inOut * 0.45;
        r.rotation.z += inOut * 0.25;
        r.position.y -= inOut * 0.1;
        const press = Math.max(0, Math.sin(k * Math.PI * 4)) * inOut;
        u.cushion.scale.set(1.25 + press * 0.3, 0.6 - press * 0.35, 1.45 + press * 0.2);
      }
      this.wasReloading = true;
    } else if (u.cyl) {
      // 쏠 때마다 한 칸(60도)씩 돈다
      if (this.wasReloading) this.cylTo = Math.round(u.cyl.rotation.z / (Math.PI / 3)) * (Math.PI / 3);
      u.cyl.rotation.z += ((this.cylTo ?? 0) - u.cyl.rotation.z) * Math.min(1, dt * 22);
    }
    if (s.reloadK < 0) this.wasReloading = false;
    if (u.bolt && s.reloadK < 0) {
      // 쏘고 나면 볼트 철컥
      this.boltT = Math.max(0, (this.boltT ?? 0) - dt * 1.6);
      const p = this.boltT > 0 && this.boltT < 0.7 ? Math.sin((1 - this.boltT / 0.7) * Math.PI) : 0;
      u.bolt.position.z = 0.03 + p * 0.07;
      u.bolt.rotation.z = p * 0.9;
      r.rotation.z += p * 0.06;
    }
    if (u.tank) {
      this.tankT = Math.max(0, (this.tankT ?? 0) - dt * 3);
      const g = 1.6 + Math.sin(s.t * 3) * 0.3 - this.tankT;
      u.tank.material.color.setRGB(0.75 * g / 1.6, 1.6 * g / 1.6, 2.2 * g / 1.6);
    }
    if (u.gunL && s.reloadK < 0) {
      for (const g of [u.gunL, u.gunR]) {
        g.userData.kick = Math.max(0, (g.userData.kick ?? 0) - dt * 9);
        g.position.z = g.userData.kick * 0.05;
        g.rotation.x = g.userData.kick * 0.35;
        g.rotation.z = 0;
      }
    }
    if (s.scoped) r.position.y -= 2; // 조준경 볼 땐 총을 치운다
    if (u.hammer) {
      this.hammerT = Math.max(0, (this.hammerT ?? 0) - dt * 5);
      u.hammer.rotation.x = this.hammerT > 0.6 ? -0.2 : 0.7 * (1 - this.hammerT);
    }
    if (u.pump && s.reloadK < 0) {
      // 쏘고 나서 조금 뒤에 펌프 철컥
      this.pumpT = Math.max(0, (this.pumpT ?? 0) - dt * 2.6);
      const p = this.pumpT > 0 && this.pumpT < 0.75 ? Math.sin((1 - this.pumpT / 0.75) * Math.PI) : 0;
      u.pump.position.z = -0.28 + p * 0.1;
      r.rotation.z -= p * 0.05;
    }
    if (u.cushion && s.reloadK < 0) {
      this.squishT = Math.max(0, (this.squishT ?? 0) - dt * 9);
      const q = this.squishT;
      u.cushion.scale.set(1.25 + q * 0.25, 0.6 - q * 0.3, 1.45 + q * 0.15);
    }
    if (u.gas) u.gas.material.color.setRGB(1.4, 2.4 + Math.sin(s.t * 5) * 0.8, 0.35);
    if (u.horn) u.horn.scale.setScalar(1 + Math.max(0, this.kz) * 1.5);

    r.scale.setScalar(s.sigma ? 1.2 : 1);
  }
}
