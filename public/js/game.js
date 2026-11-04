// 3D 세계와 1인칭 조작. 서버 메시지를 받아 눈깔을 튀어나오게 한다.
import * as THREE from 'three';
import {
  WEAPONS, LASER, ULTRAS, MOVE, PLAYER, SLAP, BOMB, EVENTS, AURA_MAX, INTERP_MS, MATCH_SECONDS, TICK_HZ,
} from '../shared/constants.js';
import { MAPS, DEFAULT_MAP, rayWorld, rayPlayer } from '../shared/map.js';
import { newBody, stepBodyFixed } from '../shared/physics.js';
import { Character, glowTexture } from './character.js';
import { Effects, textTexture } from './effects.js';
import { KILL_LINES, DEATH_LINES, FALL_LINES, pick } from './memes.js';

const emptyAmmo = () => Object.fromEntries(Object.values(WEAPONS).map((w) => [w.id, w.mag]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerpAngle = (a, b, k) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * k;
};

function gridTexture({ base, line, label = null, checker = false, windows = false }, size = 256) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const x = c.getContext('2d');
  x.fillStyle = base;
  x.fillRect(0, 0, size, size);
  if (windows) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        x.fillStyle = (i * 7 + j * 13) % 5 < 2 ? line : '#15172b';
        x.fillRect(i * size / 6 + 8, j * size / 6 + 8, size / 6 - 16, size / 6 - 16);
      }
    }
  } else if (checker) {
    x.fillStyle = line;
    x.fillRect(0, 0, size / 2, size / 2);
    x.fillRect(size / 2, size / 2, size / 2, size / 2);
  } else {
    x.strokeStyle = line;
    x.lineWidth = 8;
    x.strokeRect(0, 0, size, size);
  }
  if (label) {
    x.fillStyle = 'rgba(255,255,255,.2)';
    x.font = `900 ${size * 0.34}px Impact, sans-serif`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText(label, size * 0.25, size * 0.25);
    x.fillText(label, size * 0.75, size * 0.75);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function boxMesh(b, mat, tile) {
  const sx = b.max[0] - b.min[0], sy = b.max[1] - b.min[1], sz = b.max[2] - b.min[2];
  const geo = new THREE.BoxGeometry(sx, sy, sz);
  // 면 크기에 맞춰 무늬가 늘어나지 않게 UV 조정 (+x -x +y -y +z -z)
  const faces = [[sz, sy], [sz, sy], [sx, sz], [sx, sz], [sx, sy], [sx, sy]];
  const uv = geo.attributes.uv;
  for (let f = 0; f < 6; f++) {
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, uv.getX(i) * faces[f][0] / tile, uv.getY(i) * faces[f][1] / tile);
    }
  }
  const m = new THREE.Mesh(geo, mat);
  m.position.set(b.min[0] + sx / 2, b.min[1] + sy / 2, b.min[2] + sz / 2);
  return m;
}

function bannerTexture(lines, bg, fg) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = bg;
  x.fillRect(0, 0, 1024, 512);
  x.strokeStyle = fg;
  x.lineWidth = 22;
  x.strokeRect(14, 14, 996, 484);
  x.fillStyle = fg;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const n = lines.length;
  lines.forEach((l, i) => {
    let size = 300 / n;
    x.font = `900 ${size}px Impact, "Malgun Gothic", "Segoe UI Emoji", sans-serif`;
    const w = x.measureText(l).width;
    if (w > 900) { size *= 900 / w; x.font = `900 ${size}px Impact, "Malgun Gothic", "Segoe UI Emoji", sans-serif`; }
    x.fillText(l, 512, 256 + (i - (n - 1) / 2) * (420 / n));
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Game {
  constructor(canvas, sfx, hud) {
    this.canvas = canvas;
    this.sfx = sfx;
    this.hud = hud;
    this.net = null;
    this.myId = null;
    this.mode = 'attract'; // attract | match

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.autoClear = false;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x4a1b6d, 45, 150);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x333333, 2);
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.sunLight.position.set(20, 40, 12);
    this.scene.add(this.hemi, this.sunLight);
    this.camera = new THREE.PerspectiveCamera(78, 16 / 9, 0.08, 500);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.effects = new Effects(this.scene);
    this.effects.camera = this.camera;
    this.loadMap(DEFAULT_MAP);
    this.buildViewmodels();

    this.chars = new Map();
    this.body = newBody();
    this.yaw = 0;
    this.pitch = 0;
    this.keys = new Set();
    this.mouseDown = false;
    this.zoom = false;
    this.locked = false;
    this.lastFrame = performance.now();
    this.sendAcc = 0;
    this.attractT = 0;
    this.nextAttractPop = 1;
    this.shake = 0;
    this.buffers = new Map();
    this.resetMatchState();
    this.bindInput();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.renderer.setAnimationLoop(() => this.frame());
  }

  resetMatchState() {
    this.alive = true;
    this.frozen = true;
    this.me = null;
    this.weapon = 'fart';
    this.ammo = emptyAmmo();
    this.cooldown = 0;
    this.reloadT = 0;
    this.slapCd = 0;
    this.slapT = 0;
    this.recoil = 0;
    this.lastEmote = 0;
    this.emote = 0;
    this.ultra = false;
    this.ultraKind = null;
    this.forced = false;
    this.grabbedBy = null;
    this.musicHold = 0;
    this.cineUntil = 0;
    this.cinePos = null;
    this.aura = 0;
    this.hp = 100;
    this.kills = 0;
    this.scores = [];
    this.timeLeft = MATCH_SECONDS * 1000;
    this.eventKind = null;
    this.stepAcc = 0;
    this.deadCamT = 0;
    this.lastMemeAt = 0;
    this.killerId = null;
    this.buffers.clear();
    this.jumpQueued = false;
    this.dashQueued = false;
    this.fovKick = 0;
    this.spin = 0;
  }

  // ---------- 세계 ----------
  loadMap(id) {
    if (this.mapId === id && this.world) return;
    if (this.world) {
      this.scene.remove(this.world);
      this.world.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose?.();
      });
      for (const t of this.worldTextures) t.dispose();
    }
    this.mapId = id;
    this.map = MAPS[id] ?? MAPS[DEFAULT_MAP];
    this.effects.map = this.map;
    this.world = new THREE.Group();
    this.worldTextures = [];
    this.scene.add(this.world);
    this.buildWorld(this.map);
  }

  buildWorld(map) {
    const s = this.world;
    const th = map.theme;
    const own = (t) => { this.worldTextures.push(t); return t; };
    this.scene.fog.color.setHex(th.fog[0]);
    this.scene.fog.near = th.fog[1];
    this.scene.fog.far = th.fog[2];
    this.hemi.color.setHex(th.hemi[0]);
    this.hemi.groundColor.setHex(th.hemi[1]);
    this.hemi.intensity = th.hemi[2];
    this.sunLight.intensity = th.sun;

    const sky = document.createElement('canvas');
    sky.width = 16; sky.height = 512;
    const sx = sky.getContext('2d');
    const g = sx.createLinearGradient(0, 0, 0, 512);
    for (const [stop, col] of th.sky) g.addColorStop(stop, col);
    sx.fillStyle = g;
    sx.fillRect(0, 0, 16, 512);
    const skyTex = own(new THREE.CanvasTexture(sky));
    skyTex.colorSpace = THREE.SRGBColorSpace;
    s.add(new THREE.Mesh(
      new THREE.SphereGeometry(300, 24, 16),
      new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false }),
    ));

    const mats = {};
    for (const [kind, def] of Object.entries(th.tex)) mats[kind] = new THREE.MeshLambertMaterial({ map: own(gridTexture(def)) });
    mats.lamp = new THREE.MeshBasicMaterial({ color: 0xfffff0 });
    for (const b of map.boxes) {
      const tile = b.floor ? 4 : b.wall ? 6 : 2;
      s.add(boxMesh(b, mats[b.kind], tile));
    }
    for (const b of map.decor) s.add(boxMesh(b, mats[b.kind], b.kind === 'city' ? 8 : 2));

    for (const [lines, bg, fg, pos, rot, w] of th.signs) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 2), new THREE.MeshBasicMaterial({ map: own(bannerTexture(lines, bg, fg)), fog: false }));
      m.position.set(...pos);
      m.rotation.y = rot;
      s.add(m);
    }

    if (th.pit) {
      const pit = new THREE.Mesh(
        new THREE.PlaneGeometry(th.pit.size, th.pit.size).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ map: own(bannerTexture(th.pit.lines, th.pit.bg, th.pit.fg)), fog: false }),
      );
      pit.position.set(...th.pit.pos);
      s.add(pit);
    }

    const tex = textTexture('67', { color: '#ffe600', stroke: '#ff0080', size: 200 });
    this.big67 = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, fog: false }));
    this.big67.scale.set(tex.userData.aspect * 9, 9, 1);
    this.big67.position.set(...th.big67);
    this.big67.userData.baseY = th.big67[1];
    s.add(this.big67);

    this.padMeshes = [];
    for (const p of map.pads) {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(p.radius, p.radius * 1.1, 0.14, 24),
        new THREE.MeshBasicMaterial({ color: 0xffee00 }),
      );
      m.position.set(p.pos[0], p.pos[1] + 0.07, p.pos[2]);
      s.add(m);
      const arrow = new THREE.Mesh(
        new THREE.ConeGeometry(p.radius * 0.5, 0.8, 4),
        new THREE.MeshBasicMaterial({ color: 0xff0080, transparent: true, opacity: 0.85 }),
      );
      arrow.position.set(p.pos[0], 0.9, p.pos[2]);
      s.add(arrow);
      this.padMeshes.push(arrow);
    }

    const chickenTex = textTexture('🍗', { stroke: null, size: 128, font: '"Segoe UI Emoji", sans-serif' });
    this.pickupMeshes = map.pickups.map((p) => {
      let m;
      if (p.kind === 'chicken') {
        m = new THREE.Sprite(new THREE.SpriteMaterial({ map: chickenTex, transparent: true }));
        m.scale.set(chickenTex.userData.aspect * 1.25, 1.25, 1);
      } else {
        m = new THREE.Group();
        m.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.55), new THREE.MeshBasicMaterial({ color: 0xffd700 })));
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
        glow.scale.set(3.4, 3.4, 1);
        m.add(glow);
      }
      m.position.set(...p.pos);
      m.userData.baseY = p.pos[1];
      s.add(m);
      return m;
    });
  }

  buildViewmodels() {
    this.vmScene = new THREE.Scene();
    this.vmScene.add(new THREE.HemisphereLight(0xffffff, 0x554488, 2.6));
    this.vmCam = new THREE.PerspectiveCamera(58, 16 / 9, 0.01, 10);
    this.vmRoot = new THREE.Group();
    this.vmScene.add(this.vmRoot);
    const skin = new THREE.MeshLambertMaterial({ color: 0xffd23f });
    const L = (c) => new THREE.MeshLambertMaterial({ color: c });
    const add = (group, geo, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      group.add(m);
      return m;
    };

    const fist = (g, x = 0, y = -0.13, z = 0.05) => {
      add(g, new THREE.SphereGeometry(0.075, 12, 10), skin, x, y, z);
      const arm = add(g, new THREE.CylinderGeometry(0.05, 0.065, 0.8, 8).rotateX(1.2), skin, x + 0.04, y - 0.13, z + 0.38);
      return arm;
    };

    const fart = new THREE.Group();
    add(fart, new THREE.BoxGeometry(0.13, 0.15, 0.5), L(0x6cc644));
    add(fart, new THREE.ConeGeometry(0.11, 0.22, 12).rotateX(-Math.PI / 2), L(0x2f7a1a), 0, 0, -0.34);
    add(fart, new THREE.SphereGeometry(0.055, 12, 10), L(0xff66b2), 0, 0.1, 0.08).scale.set(1.2, 0.7, 1.4); // 방귀 방석
    add(fart, new THREE.BoxGeometry(0.08, 0.17, 0.07), L(0x222222), 0, -0.13, 0.07);
    fist(fart);

    const six7 = new THREE.Group();
    add(six7, new THREE.BoxGeometry(0.11, 0.13, 0.22), L(0xffd23f));
    add(six7, new THREE.CylinderGeometry(0.052, 0.052, 0.54, 12).rotateX(Math.PI / 2), L(0xb8930a), 0, 0.03, -0.36);
    add(six7, new THREE.CylinderGeometry(0.085, 0.085, 0.13, 10).rotateX(Math.PI / 2), L(0x777777), 0, 0.01, -0.09);
    add(six7, new THREE.BoxGeometry(0.075, 0.18, 0.08), L(0x5b3210), 0, -0.13, 0.08);
    const tag = textTexture('67', { color: '#ff0080', stroke: '#fff', size: 96 });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.1), new THREE.MeshBasicMaterial({ map: tag, transparent: true, side: THREE.DoubleSide }));
    label.position.set(-0.058, 0.03, -0.05);
    label.rotation.y = -Math.PI / 2;
    six7.add(label);
    fist(six7);

    const boom = new THREE.Group();
    add(boom, new THREE.BoxGeometry(0.12, 0.12, 0.42), L(0x333340));
    add(boom, new THREE.ConeGeometry(0.2, 0.34, 18, 1, true).rotateX(Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xff3d81, side: THREE.DoubleSide }), 0, 0, -0.36);
    add(boom, new THREE.CircleGeometry(0.2, 18), L(0x111111), 0, 0, -0.2);
    add(boom, new THREE.BoxGeometry(0.075, 0.16, 0.07), L(0x222222), 0, -0.12, 0.1);
    fist(boom);

    this.vmGuns = { fart, six7, boom };
    for (const g of Object.values(this.vmGuns)) { g.visible = false; this.vmRoot.add(g); }
    this.vmRoot.position.set(0.3, -0.27, -0.62);

    // 싸대기 손
    const hand = new THREE.Group();
    add(hand, new THREE.BoxGeometry(0.34, 0.06, 0.34), skin);
    for (let i = 0; i < 4; i++) add(hand, new THREE.BoxGeometry(0.065, 0.05, 0.24), skin, -0.13 + i * 0.087, 0, -0.27);
    add(hand, new THREE.BoxGeometry(0.06, 0.05, 0.22), skin, 0.21, 0, -0.04).rotation.y = -0.8;
    add(hand, new THREE.CylinderGeometry(0.07, 0.08, 0.9, 8).rotateX(Math.PI / 2), skin, 0, 0, 0.58);
    hand.visible = false;
    this.vmScene.add(hand);
    this.vmHand = hand;
    this.setViewWeapon('fart');
  }

  setViewWeapon(id) {
    for (const [k, g] of Object.entries(this.vmGuns)) g.visible = k === id;
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = this.vmCam.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.vmCam.updateProjectionMatrix();
  }

  // ---------- 입력 ----------
  bindInput() {
    window.addEventListener('keydown', (e) => {
      if (this.mode !== 'match' || e.target.tagName === 'INPUT') return;
      if (['Space', 'Tab', 'ShiftLeft', 'ShiftRight'].includes(e.code)) e.preventDefault();
      if (e.repeat) return;
      this.keys.add(e.code);
      if (e.code === 'Space') this.jumpQueued = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.dashQueued = true;
      if (e.code === 'Digit1') this.switchWeapon('fart');
      if (e.code === 'Digit2') this.switchWeapon('six7');
      if (e.code === 'Digit3') this.switchWeapon('boom');
      if (e.code === 'KeyR') this.startReload();
      if (e.code === 'KeyF') this.slap();
      if (e.code === 'KeyE') this.tryUltra();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.mouseDown = false; this.zoom = false; });
    document.addEventListener('mousemove', (e) => {
      if (!this.locked || this.mode !== 'match') return;
      const mult = this.zoom ? 0.0011 : 0.0022;
      this.yaw -= clamp(e.movementX, -300, 300) * mult;
      this.pitch = clamp(this.pitch - clamp(e.movementY, -300, 300) * mult, -1.5, 1.5);
    });
    document.addEventListener('mousedown', (e) => {
      if (this.mode !== 'match') return;
      if (!this.locked) { this.requestLock(); return; }
      if (e.button === 0) { this.mouseDown = true; this.shotQueued = true; }
      if (e.button === 2) this.zoom = true;
    });
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseDown = false;
      if (e.button === 2) this.zoom = false;
    });
    document.addEventListener('contextmenu', (e) => { if (this.mode === 'match') e.preventDefault(); });
    document.addEventListener('wheel', (e) => {
      if (this.mode !== 'match' || !this.locked) return;
      const ids = Object.keys(WEAPONS);
      const i = ids.indexOf(this.weapon);
      this.switchWeapon(ids[(i + (e.deltaY > 0 ? 1 : ids.length - 1)) % ids.length]);
    }, { passive: true });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      if (!this.locked) { this.mouseDown = false; this.zoom = false; this.keys.clear(); }
      this.hud.setLockHint(this.mode === 'match' && !this.locked);
    });
  }

  requestLock() {
    try {
      const r = this.canvas.requestPointerLock();
      r?.catch?.(() => {});
    } catch { /* Esc 직후엔 잠시 막힘 */ }
  }

  switchWeapon(id) {
    if (this.weapon === id || !this.alive) return;
    this.weapon = id;
    this.reloadT = 0;
    this.cooldown = Math.max(this.cooldown, 0.12);
    this.setViewWeapon(id);
    this.sfx.click();
    this.hud.setWeapon(WEAPONS[id]);
    this.me?.setWeapon(id);
  }

  startReload() {
    const w = WEAPONS[this.weapon];
    if (this.reloadT > 0 || this.ammo[w.id] >= w.mag || !this.alive || this.infAmmo() || this.forced) return;
    this.reloadT = w.reload;
    this.sfx.reload();
  }

  // ---------- 대기실 배경 ----------
  setAttract(players, mapId) {
    this.mode = 'attract';
    if (mapId) this.loadMap(mapId);
    if (players.length === 0) players = [{ id: 'demo1', skin: 'sigma' }, { id: 'demo2', skin: 'cat' }];
    this.syncChars(players, true);
    const list = [...this.chars.values()];
    const c0 = this.map.showcase.pos;
    list.forEach((c, i) => {
      c.root.position.set(c0[0] + (i - (list.length - 1) / 2) * 1.75, c0[1], c0[2]);
      c.lastPos.copy(c.root.position);
      c.root.rotation.y = 0;
      c.pitch = 0;
      c.emote = i % 2 === 0 ? 2 : 1;
      c.ultra = false;
      c.ultraKind = null;
      c.bigHead = false;
      c.respawn();
      c.setVisibleBody(true);
    });
    this.setHudVisible(false);
  }

  setHudVisible(v) { this.vmRoot.visible = v; }

  syncChars(players, attract = false) {
    const wanted = new Map();
    for (const p of players) wanted.set(p.id, p);
    for (const [id, c] of this.chars) {
      const w = wanted.get(id);
      if (!w || c.skinId !== w.skin) { c.dispose(this.scene); this.chars.delete(id); }
    }
    for (const p of players) {
      if (!this.chars.has(p.id)) {
        const c = new Character(p.skin, p.name);
        this.scene.add(c.root);
        this.chars.set(p.id, c);
      }
    }
    if (attract && players.length < 2) {
      if (!this.chars.has('ghost')) {
        const c = new Character('cone', '상대 구함');
        this.scene.add(c.root);
        this.chars.set('ghost', c);
      }
    } else if (this.chars.has('ghost')) {
      this.chars.get('ghost').dispose(this.scene);
      this.chars.delete('ghost');
    }
  }

  // ---------- 경기 흐름 ----------
  onMatchStart(m, myId) {
    this.effects.clear();
    this.resetMatchState();
    this.myId = myId;
    this.mode = 'match';
    this.loadMap(m.map);
    this.syncChars(m.players, false);
    this.me = this.chars.get(myId);
    for (const p of m.players) {
      const c = this.chars.get(p.id);
      c.respawn();
      c.emote = 0;
      c.ultra = false;
      c.ultraKind = null;
      c.bigHead = false;
      c.root.position.set(...p.pos);
      c.root.rotation.y = p.yaw;
      c.lastPos.copy(c.root.position);
      if (p.id === myId) {
        this.body = newBody(...p.pos);
        this.yaw = p.yaw;
        this.pitch = 0;
      }
    }
    if (this.me?.tag) this.me.tag.visible = false;
    m.pickups.forEach((a, i) => { this.pickupMeshes[i].visible = a; });
    this.timeLeft = m.endsIn;
    this.setHudVisible(true);
    this.setViewWeapon('fart');
    this.hud.setWeapon(WEAPONS.fart);
    this.hud.reset();
    this.canvas.classList.remove('dead');
    this.requestLock();
    this.hud.setLockHint(!this.locked);

    // 6... 7... 시작
    const step = m.countdownMs / 3;
    this.hud.bigCount('6');
    this.sfx.say('six', { rate: 0.8, pitch: 0.6 });
    this.sfx.bong();
    this.cdTimers = [
      setTimeout(() => { this.hud.bigCount('7'); this.sfx.say('seven', { rate: 0.8, pitch: 0.4 }); this.sfx.bong(); }, step),
      setTimeout(() => { this.hud.bigCount('쏴라!!'); this.sfx.airhorn(); }, step * 2),
    ];
    this.sfx.stopMusic();
  }

  // 경기 중 누가 나갔을 때
  onRoster(players) {
    if (this.mode !== 'match') return;
    this.syncChars(players, false);
    for (const id of [...this.buffers.keys()]) if (!this.chars.has(id)) this.buffers.delete(id);
  }

  onGo() {
    this.frozen = false;
    this.hud.bigCount('');
    this.sfx.playMusic('battle');
  }

  onMatchEnd() {
    this.frozen = true;
    this.mouseDown = false;
    this.zoom = false;
    (this.cdTimers ?? []).forEach(clearTimeout);
    this.hud.setLockHint(false);
    this.mode = 'ended';
    this.keys.clear();
    if (document.pointerLockElement) document.exitPointerLock();
    this.canvas.classList.remove('dead');
    this.setHudVisible(false);
    // 승패 카메라를 위해 양쪽 몸은 보이게
    this.me?.setVisibleBody(true);
    this.effects.clear();
    this.sfx.stopMusic();
  }

  onSnap(m) {
    this.timeLeft = m.left;
    this.scores = m.players.map((s) => ({ id: s.id, k: s.k }));
    for (const s of m.players) {
      const mine = s.id === this.myId;
      if (mine) {
        if (this.hp > s.hp + 0.01) this.hud.flashHpLoss();
        this.hp = s.hp;
        this.aura = s.aura;
        this.kills = s.k;
        this.invuln = s.inv;
        if (this.forced) {
          this.body.x = s.p[0]; this.body.y = s.p[1]; this.body.z = s.p[2];
          this.body.vx = this.body.vy = this.body.vz = 0;
        }
      } else {
        let buf = this.buffers.get(s.id);
        if (!buf) this.buffers.set(s.id, (buf = []));
        buf.push({ t: m.s, ...s });
        if (buf.length > 40) buf.shift();
      }
      const c = this.chars.get(s.id);
      if (c) {
        c.emote = s.e;
        c.ultra = s.u;
        if (!mine) c.setWeapon(s.w);
      }
    }
    if (this.me) {
      this.me.emote = this.emote;
      this.me.ultra = this.ultra;
    }
  }

  renderOf(id) {
    const buf = this.buffers.get(id);
    if (!buf || !buf.length) return null;
    const t = this.net.serverNow() - INTERP_MS;
    let a = buf[0], b = buf[buf.length - 1];
    for (let i = buf.length - 1; i > 0; i--) {
      if (buf[i - 1].t <= t) { a = buf[i - 1]; b = buf[i]; break; }
    }
    const k = b.t > a.t ? clamp((t - a.t) / (b.t - a.t), 0, 1) : 1;
    const jump = Math.hypot(b.p[0] - a.p[0], b.p[1] - a.p[1], b.p[2] - a.p[2]) > 12; // 부활 순간 이동은 보간 안 함
    return {
      p: jump ? b.p : [a.p[0] + (b.p[0] - a.p[0]) * k, a.p[1] + (b.p[1] - a.p[1]) * k, a.p[2] + (b.p[2] - a.p[2]) * k],
      y: lerpAngle(a.y, b.y, k),
      pi: a.pi + (b.pi - a.pi) * k,
      a: b.a,
    };
  }

  onKnock(m) {
    if (!this.alive) return;
    this.body.vx += m.v[0];
    this.body.vy = Math.max(this.body.vy, m.v[1]);
    this.body.vz += m.v[2];
    this.body.onGround = false;
  }

  onShot(m) {
    const color = { fart: 0x9be02a, six7: 0xffe600, boom: 0xff3d81, laser: 0xff1133 }[m.w];
    for (const end of m.ends) this.effects.tracer(m.o, end, color, m.w === 'six7' || m.w === 'laser' ? 0.08 : 0.04, 0.12);
    this.sfx.shoot(m.w, true);
    if (m.w === 'fart' && this.camera.position.distanceTo(new THREE.Vector3(...m.o)) > 5) this.effects.cloud(m.o, 2);
    if (m.w === 'six7' && this.camera.position.distanceTo(new THREE.Vector3(...m.ends[0])) > 7) {
      this.effects.text(m.ends[0], '67', { color: '#ffe600', scale: 1.1, life: 0.6 });
    }
    if (m.w === 'boom' && this.camera.position.distanceTo(new THREE.Vector3(...m.o)) > 5) this.effects.text(m.o, 'BOOM', { color: '#ff3d81', scale: 1.4, life: 0.4 });
  }

  onSlapFx(m) {
    if (m.id !== this.myId) {
      this.sfx.whiff();
      const c = this.chars.get(m.id);
      if (c) c.armR.rotation.x = -3;
    }
  }

  onHit(m) {
    const mine = m.to === this.myId;
    const fromMe = m.from === this.myId;
    const c = this.chars.get(m.to);
    const strength = m.head ? 1.6 : m.dmg >= 20 ? 1.2 : 0.7;
    if (c) c.pop(strength);
    if (m.weapon === 'slap') this.sfx.slap();
    if (m.weapon === 'claw') {
      this.sfx.scratch();
      this.effects.text([m.pos[0], m.pos[1] + 2.1, m.pos[2]], pick(['냥!', '할퀴기!', '💢', '🐾', '캬악']), { color: '#ff4d6d', scale: 0.9, life: 0.45 });
      if (Math.random() < 0.18) this.sfx.meow();
    }
    if (mine && m.weapon === 'claw') {
      this.shake = Math.min(1, this.shake + 0.14);
      this.hud.claws();
    } else if (mine) {
      this.shake = Math.min(1, this.shake + (m.head ? 0.8 : 0.3 + m.dmg / 120));
      this.hud.eyePop(m.head || m.dmg >= 30);
      this.sfx.eyePop(m.head || m.dmg >= 30);
      if (m.head) this.sfx.metalPipe();
      const from = this.buffers.get(m.from)?.at(-1)?.p;
      if (from && m.from) {
        const ang = Math.atan2(from[0] - this.body.x, from[2] - this.body.z);
        this.hud.damageDir(ang - this.yaw + Math.PI);
      }
    }
    if (fromMe) {
      this.hud.hitmarker(m.head);
      this.sfx.tick();
      if (m.head) { this.sfx.metalPipe(); this.hud.shout('HEADSHOT', 'gold'); }
      const pos = [m.pos[0], m.pos[1] + (m.head ? 2.2 : 1.4), m.pos[2]];
      this.effects.text(pos, `-${m.dmg}`, { color: m.head ? '#ffdd00' : '#ffffff', scale: m.head ? 1.3 : 0.8, life: 0.8 });
      if (m.head) this.effects.text(pos, pick(['💀', '👁️', '🫨', '🤯']), { scale: 1.5, life: 0.8, spin: 3, stroke: null });
      if (m.weapon === 'slap') this.effects.text(pos, '찰싹!!', { color: '#ff4d6d', scale: 1.6, life: 0.8 });
    } else if (c && !mine && m.weapon !== 'claw') {
      this.sfx.bonk();
    }
  }

  onKill(m) {
    const victim = this.chars.get(m.victim);
    const iDied = m.victim === this.myId;
    const iKilled = m.killer === this.myId && m.weapon !== 'fall' && m.weapon !== 'bomb';
    const got = m.killer === this.myId;

    if (victim) {
      const eyes = victim.eyeWorldPositions();
      const vel = new THREE.Vector3((Math.random() - 0.5) * 6, 8 + Math.random() * 5, (Math.random() - 0.5) * 6);
      eyes.forEach((p, i) => {
        const v = vel.clone();
        v.x += i ? 3.5 : -3.5;
        this.effects.eyeball(p, v);
      });
      victim.setVisibleBody(true);
      victim.die();
      this.effects.text([m.pos[0], m.pos[1] + 2.6, m.pos[2]], pick(KILL_LINES), { color: '#ff2a6d', scale: 1.5, life: 1.8, rise: 1 });
      this.effects.cloud([m.pos[0], m.pos[1] + 1.2, m.pos[2]], 10, 0xff3355);
    }
    const killerName = m.killer != null ? this.nameOf(m.killer) : m.weapon === 'bomb' ? '🐶 개 전투기' : '중력';
    this.hud.killFeed(m, killerName, this.nameOf(m.victim));

    if (got) {
      if (iKilled) {
        const line = pick(KILL_LINES);
        this.hud.killCutIn(line, m.head);
        this.sfx.vineBoom();
        setTimeout(() => this.sfx.airhorn(), 160);
        this.meme(line);
      } else {
        this.hud.shout('공짜 킬 개꿀', 'gold');
      }
      this.hud.rain(['67', '67', '🗿', '👁️'], 12);
      if (m.killerKills === 6) { this.sfx.say('six', { pitch: 0.2, rate: 0.7 }); this.hud.shout('SIX...', 'gold'); }
      if (m.killerKills === 7) this.sfx.say('seven', { pitch: 0.2, rate: 0.7 });
    }
    if (iDied) {
      this.alive = false;
      this.killerId = m.killer;
      this.deadCamT = 0;
      this.emote = 0;
      this.reloadT = 0;
      this.canvas.classList.add('dead');
      this.setHudVisible(false);
      this.me?.setVisibleBody(true);
      if (this.me?.tag) this.me.tag.visible = false;
      this.ultraOff();
      const line = pick(m.weapon === 'fall' ? FALL_LINES : DEATH_LINES);
      this.setGrabbed(null);
      this.hud.deathScreen(line, killerName, m.weapon, m.respawnMs);
      this.sfx.sadTrombone();
      this.sfx.bigFart();
      this.meme(line, true);
      if (m.victimKills === 6 && m.killerKills === 6) this.hud.shout('6:6 매치포인트', 'gold');
    }
  }

  nameOf(id) {
    return this.hud.names.get(id) ?? '나간 사람';
  }

  meme(text, force = false) {
    const now = performance.now();
    if (!force && now - this.lastMemeAt < 1400) return;
    this.lastMemeAt = now;
    this.sfx.sayMeme(text);
  }

  onSpawn(m) {
    const c = this.chars.get(m.id);
    if (c) {
      c.respawn();
      c.root.position.set(...m.pos);
      c.lastPos.copy(c.root.position);
      c.pop(0.8);
    }
    if (m.id === this.myId) {
      this.body = newBody(...m.pos);
      this.yaw = m.yaw;
      this.pitch = 0;
      this.alive = true;
      this.forced = false;
      this.ammo = emptyAmmo();
      this.reloadT = 0;
      this.canvas.classList.remove('dead');
      this.setHudVisible(true);
      this.setViewWeapon(this.weapon);
      this.hud.hideDeath();
      this.sfx.boing();
      if (this.me) this.me.setVisibleBody(false);
    } else {
      this.buffers.set(m.id, []);
    }
  }

  onAura(m) {
    if (m.id === this.myId) {
      this.hud.auraPop(m.delta, m.reason);
      if (m.delta >= 600) this.sfx.sparkle();
      if (m.delta <= -600 && m.reason !== '사망' && m.reason !== '오하이오 추락') {
        this.meme('cringe', true);
      }
    } else {
      const p = this.chars.get(m.id)?.root.position;
      if (p) this.effects.text([p.x, p.y + 3, p.z], `${m.delta > 0 ? '+' : ''}${m.delta} AURA`, { color: m.delta > 0 ? '#ffd700' : '#ff4d6d', scale: 0.8, life: 1.1 });
    }
  }

  tryUltra() {
    if (this.alive && this.aura >= AURA_MAX && !this.ultra) this.net.send({ t: 'ultra' });
  }

  ultraOff() {
    if (!this.ultra) return;
    const wasLaser = this.ultraKind === 'minsu';
    this.ultra = false;
    this.ultraKind = null;
    this.forced = false;
    this.hud.setUltra(false);
    if (wasLaser) this.hud.setWeapon(WEAPONS[this.weapon]);
    this.setHudVisible(this.alive);
  }

  infAmmo() { return this.ultraKind === 'sigma' || this.ultraKind === 'minsu'; }
  curWeapon() { return this.ultraKind === 'minsu' ? LASER : WEAPONS[this.weapon]; }

  setGrabbed(id) {
    this.grabbedBy = id;
    this.hud.setGrabbed(id !== null);
  }

  onTeleport(m) {
    this.body = newBody(...m.pos);
    this.forced = false;
  }

  // 고양이가 누군가의 얼굴에 붙거나 떨어졌을 때
  onCat(m) {
    if (m.to === this.myId) {
      this.setGrabbed(m.id);
      this.hud.shout('얼굴에 고양이 붙음!! F로 떼어내', 'red');
      this.sfx.meow();
      this.sfx.say('냥', { lang: 'ko-KR', pitch: 2, rate: 1.4 });
    } else if (m.to === null && this.grabbedBy === m.id) {
      this.setGrabbed(null);
    }
    if (m.id === this.myId && m.to !== null) this.sfx.meow();
  }

  // 오펜하이머: 위로 올라가는 현악기 → 번쩍 → 잠깐 정적 → 쾅
  onNuke(m) {
    const mine = m.id === this.myId;
    this.effects.warning(m.pos, m.radius, m.in, '☢️', 5);
    this.sfx.stopMusic();
    this.musicHold = performance.now() + m.in + 3500;
    this.sfx.nukeWind(m.in);
    this.sfx.say('Now I am become death, the destroyer of worlds', { pitch: 0.1, rate: 0.72 });
    this.hud.oppenheimer(m.in, mine ? null : this.nameOf(m.id));
  }

  onNukeBoom(m) {
    this.effects.mushroom(m.pos, m.radius);
    this.hud.nukeFlash();
    this.cineUntil = performance.now() + 2400;
    this.cinePos = m.pos;
    this.mouseDown = false;
    this.fovKick = 30;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    // 빛이 먼저, 소리는 나중에
    setTimeout(() => {
      this.sfx.nukeBoom();
      if (this.mode === 'match') this.shake = Math.min(1, this.shake + Math.max(0.5, 1 - d / 60));
    }, 950);
  }

  ultraIntro(kind, ms) {
    if (kind === 'sigma') {
      this.sfx.vineBoom();
      this.sfx.sparkle();
      this.sfx.say('sigma', { pitch: 0.1, rate: 0.6 });
    } else if (kind === 'minsu') {
      this.sfx.boing(true);
      this.sfx.say('눈깔 레이저', { lang: 'ko-KR', pitch: 0.2, rate: 0.8 });
    } else if (kind === 'cat') {
      this.sfx.meow();
      this.sfx.say('냥냥 급습', { lang: 'ko-KR', pitch: 1.9, rate: 1.3 });
    } else if (kind === 'toilet') {
      this.sfx.flush(ms);
      this.sfx.say('flush', { pitch: 0.1, rate: 0.5 });
    }
  }

  onUltra(m) {
    const c = this.chars.get(m.id);
    if (c) {
      c.ultra = m.on;
      c.ultraKind = m.on ? m.kind : null;
    }
    if (m.id === this.myId) {
      if (m.on) {
        this.ultra = true;
        this.ultraKind = m.kind;
        this.emote = 0;
        const def = ULTRAS[m.kind];
        this.hud.setUltra(true, m.ms, def.name);
        this.fovKick = 22;
        if (this.infAmmo()) this.reloadT = 0;
        if (m.kind === 'cat') {
          this.forced = true;
          this.reloadT = 0;
          this.setHudVisible(false);
        }
        if (m.kind === 'minsu') {
          this.setHudVisible(false);
          this.hud.setWeapon(LASER);
        }
        if (m.kind !== 'cone') this.hud.shout(def.name, 'gold');
        this.ultraIntro(m.kind, m.ms);
      } else this.ultraOff();
    } else if (m.on) {
      if (m.kind !== 'cone') this.hud.shout(`${this.nameOf(m.id)}: ${ULTRAS[m.kind].name} 도망쳐`, 'red');
      this.ultraIntro(m.kind, m.ms);
      if (m.kind === 'sigma') this.sfx.airhorn();
    }
    if (!m.on && this.grabbedBy === m.id) this.setGrabbed(null);
  }

  onEvent(m) {
    const prev = this.eventKind;
    this.eventKind = m.kind;
    if (!m.kind) {
      this.hud.eventBanner(null);
      for (const c of this.chars.values()) c.bigHead = false;
      return;
    }
    const def = EVENTS[m.kind];
    this.hud.eventBanner(def.name, m.ms);
    this.sfx.bong();
    this.sfx.sayMeme(def.say);
    if (m.kind === 'bighead') for (const c of this.chars.values()) c.bigHead = true;
    if (m.kind === 'dogfight') {
      this.effects.dogPlane(1, 24);
      setTimeout(() => this.effects.dogPlane(-1, 28), 1700);
      this.sfx.planeFlyby();
      this.sfx.bark();
      setTimeout(() => this.sfx.bark(), 900);
    }
    if (m.kind === 'sixseven') this.hud.rain(['67', '6', '7'], 60);
    if (prev) { /* 이벤트 겹침 없음 */ }
  }

  onBomb(m) {
    this.effects.warning(m.pos, BOMB.radius, m.in);
    if (Math.random() < 0.3) this.sfx.bark();
  }

  onBoom(m) {
    this.effects.explosion(m.pos);
    this.sfx.explosion();
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    if (d < 16) this.shake = Math.min(1, this.shake + (1 - d / 16) * 0.6);
  }

  onPickup(m) {
    this.pickupMeshes[m.i].visible = m.active;
    if (m.active) return;
    if (m.by === this.myId) {
      if (m.kind === 'chicken') {
        this.sfx.chomp();
        this.hud.shout('🍗 맛도리', 'gold');
      }
    }
  }

  // ---------- 사격 ----------
  fireDirs(w) {
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    const right = new THREE.Vector3().crossVectors(dir, this.camera.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, dir).normalize();
    const moving = Math.hypot(this.body.vx, this.body.vz) > 2 ? 1.6 : 1;
    const air = this.body.onGround ? 1 : 1.5;
    const zoom = this.zoom ? 0.45 : 1;
    const spread = w.spread * (w.pellets > 1 ? 1 : moving * air * zoom);
    const out = [];
    for (let i = 0; i < w.pellets; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * spread;
      out.push([
        dir.x + right.x * Math.cos(a) * r + up.x * Math.sin(a) * r,
        dir.y + right.y * Math.cos(a) * r + up.y * Math.sin(a) * r,
        dir.z + right.z * Math.cos(a) * r + up.z * Math.sin(a) * r,
      ]);
    }
    return out;
  }

  tryFire() {
    const w = this.curWeapon();
    if (performance.now() < this.cineUntil) return;
    if (this.forced || this.frozen || !this.alive || this.cooldown > 0 || this.reloadT > 0 || this.slapT > 0.12) return;
    if (this.emote) return;
    const inf = this.infAmmo();
    if (!inf && this.ammo[w.id] <= 0) {
      this.sfx.dry();
      this.startReload();
      return;
    }
    if (!inf) this.ammo[w.id]--;
    this.cooldown = w.interval * (this.ultraKind === 'sigma' ? 0.6 : 1);
    this.recoil = Math.min(1.5, this.recoil + (w.id === 'fart' ? 0.28 : 1));
    const kick = { fart: 0.002, six7: 0.018, boom: 0.03, laser: 0 }[w.id];
    this.pitch = clamp(this.pitch + kick, -1.5, 1.5);

    const o = [this.camera.position.x, this.camera.position.y, this.camera.position.z];
    const dirs = this.fireDirs(w);
    this.net.send({ t: 'shoot', w: w.id, o, dirs });
    this.sfx.shoot(w.id, false, this.ultraKind === 'sigma');

    // 내 화면 효과 (판정은 서버)
    const muzzle = this.muzzlePos();
    const foes = this.otherPositions();
    const bigHead = this.eventKind === 'bighead';
    for (const raw of dirs) {
      const l = Math.hypot(...raw);
      const d = [raw[0] / l, raw[1] / l, raw[2] / l];
      let t = rayWorld(this.map, o, d, w.range);
      let hit = null;
      for (const p of foes) {
        const h = rayPlayer(o, d, p, bigHead, t);
        if (h) { hit = h; t = h.t; }
      }
      const end = [o[0] + d[0] * t, o[1] + d[1] * t, o[2] + d[2] * t];
      const col = { fart: 0x9be02a, six7: 0xffe600, boom: 0xff3d81, laser: 0xff1133 }[w.id];
      if (w.id === 'laser') {
        // 눈 두 개에서 나간다
        this.effects.tracer(this.muzzlePos(0.2), end, col, 0.07, 0.11);
        this.effects.tracer(this.muzzlePos(-0.2), end, col, 0.07, 0.11);
        if (t < w.range - 0.1) this.effects.text(end, '👁️', { scale: 0.5, life: 0.25, stroke: null, rise: 0 });
        continue;
      }
      this.effects.tracer(muzzle, end, col, w.id === 'six7' ? 0.06 : 0.025, 0.08);
      if (!hit && t < w.range - 0.1 && (w.id !== 'boom' || Math.random() < 0.3)) {
        if (w.id === 'fart') this.effects.cloud(end, 1, 0xb5e02a);
        if (w.id === 'six7') this.effects.text(end, '67', { color: '#ffe600', scale: 0.8, life: 0.55, rise: 0.8 });
        if (w.id === 'boom') this.effects.text(end, '💥', { scale: 0.7, life: 0.3, stroke: null, rise: 0 });
      }
    }
    const look = this.camera.getWorldDirection(new THREE.Vector3());
    const ahead = (d) => [o[0] + look.x * d + 0.4, o[1] + look.y * d - 0.5, o[2] + look.z * d];
    if (w.id === 'fart') this.effects.cloud(ahead(3.2), 1);
    if (w.id === 'six7') this.hud.sixSeven();
    if (w.id === 'boom') {
      this.shake = Math.min(1, this.shake + 0.22);
      this.hud.shout('BOOM', 'red');
    }
    if (!inf && this.ammo[w.id] <= 0) this.startReload();
  }

  slap() {
    if (this.forced || this.frozen || !this.alive || this.slapCd > 0 || this.emote) return;
    this.slapCd = SLAP.cooldown;
    this.slapT = 0.26;
    this.sfx.whiff();
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    this.net.send({ t: 'slap', d: [dir.x, dir.y, dir.z] });
  }

  muzzlePos(side = 0.24) {
    const v = new THREE.Vector3(side, -0.2, -0.75).applyMatrix4(this.camera.matrixWorld);
    return [v.x, v.y, v.z];
  }

  otherPositions() {
    const out = [];
    for (const id of this.buffers.keys()) {
      const r = this.renderOf(id);
      if (r && r.a) out.push(r.p);
    }
    return out;
  }

  // ---------- 프레임 ----------
  frame() {
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    if (this.mode === 'match') this.updateMatch(dt);
    else this.updateAttract(dt);

    const t = now / 1000;
    this.big67.material.rotation = Math.sin(t * 1.4) * 0.14;
    this.big67.position.y = this.big67.userData.baseY + Math.sin(t * 2) * 0.5;
    for (const [i, m] of this.padMeshes.entries()) {
      m.position.y = 0.9 + Math.sin(t * 5 + i) * 0.25;
      m.rotation.y = t * 2;
    }
    for (const m of this.pickupMeshes) {
      m.position.y = m.userData.baseY + Math.sin(t * 3) * 0.14;
      if (m.isGroup) m.rotation.y = t * 2;
    }
    for (const c of this.chars.values()) c.update(dt);
    this.effects.update(dt);

    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    if (this.mode === 'match' && this.alive && !this.emote && !this.forced && now >= this.cineUntil) {
      this.renderer.clearDepth();
      this.renderer.render(this.vmScene, this.vmCam);
    }
  }

  updateAttract(dt) {
    this.attractT += dt;
    const t = this.attractT * 0.25;
    this.camera.fov = 58;
    this.camera.updateProjectionMatrix();
    const sc = this.map.showcase;
    this.camera.position.set(sc.pos[0] + Math.sin(t) * sc.r, sc.pos[1] + 2.5 + Math.sin(t * 2) * 0.35, sc.pos[2] + Math.cos(t) * sc.r);
    this.camera.lookAt(sc.pos[0], sc.pos[1] + 1.45, sc.pos[2]);
    for (const c of this.chars.values()) {
      c.root.rotation.y = Math.atan2(c.root.position.x - this.camera.position.x, c.root.position.z - this.camera.position.z);
    }
    this.nextAttractPop -= dt;
    if (this.nextAttractPop <= 0) {
      this.nextAttractPop = 1.4 + Math.random() * 2.2;
      const list = [...this.chars.values()];
      if (list.length) list[Math.floor(Math.random() * list.length)].pop(1.5);
    }
  }

  updateMatch(dt) {
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.slapCd = Math.max(0, this.slapCd - dt);
    this.slapT = Math.max(0, this.slapT - dt);
    this.recoil = Math.max(0, this.recoil - dt * 6);
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.fovKick = Math.max(0, this.fovKick - dt * 22);

    if (this.reloadT > 0) {
      this.reloadT -= dt;
      if (this.reloadT <= 0) {
        this.ammo[this.weapon] = WEAPONS[this.weapon].mag;
        this.sfx.click();
      }
    }

    if (this.alive) this.updateLocal(dt);

    // 상대들
    for (const [id, c] of this.chars) {
      if (id === this.myId) continue;
      const r = this.renderOf(id);
      if (!r) continue;
      c.root.position.set(r.p[0], r.p[1], r.p[2]);
      c.root.rotation.y = r.y;
      c.pitch = r.pi;
      if (r.a && c.deadT < 0 && c.speed > 3 && Math.hypot(this.body.x - r.p[0], this.body.z - r.p[2]) < 20) {
        c.stepAcc = (c.stepAcc ?? 0) + dt;
        if (c.stepAcc > 0.34) { c.stepAcc = 0; this.sfx.squeak(); }
      }
    }

    // 음악: 파밍·각성 중엔 phonk
    if (!this.frozen && performance.now() > this.musicHold) this.sfx.playMusic(this.emote === 1 || this.ultra ? 'phonk' : 'battle');

    this.updateCamera(dt);
    this.updateViewmodel(dt);
    this.hud.update(this);

    this.sendAcc += dt;
    if (this.sendAcc >= 1 / TICK_HZ) {
      this.sendAcc = 0;
      if (this.alive) {
        this.net.send({
          t: 'state',
          p: [this.body.x, this.body.y, this.body.z],
          y: this.yaw, pi: this.pitch, w: this.weapon, e: this.emote,
        });
      }
    }
  }

  updateLocal(dt) {
    if (this.forced) {
      // 고양이 비행 중엔 서버가 몰아 준다
      this.emote = 0;
      this.jumpQueued = this.dashQueued = this.shotQueued = false;
      if (this.me) {
        this.me.root.position.set(this.body.x, this.body.y, this.body.z);
        this.me.root.rotation.y = this.yaw;
        this.me.setVisibleBody(true);
        if (this.me.tag) this.me.tag.visible = false;
      }
      return;
    }
    const k = this.keys;
    const held = (c) => k.has(c);
    let emote = 0;
    if (!this.frozen && this.body.onGround && !this.ultraKind) {
      if (held('KeyG')) emote = 1;
      else if (held('KeyT')) emote = 2;
    }
    if (emote && !this.emote) {
      this.sfx.vineBoom();
      this.sfx.say(emote === 1 ? 'aura farming' : 'six seven', { pitch: 0.3, rate: 0.8 });
      if (emote === 1) this.hud.shout('아우라 파밍 중...', 'gold');
    }
    this.emote = emote;

    const fwd = emote || this.frozen ? 0 : (held('KeyW') ? 1 : 0) - (held('KeyS') ? 1 : 0);
    const right = emote || this.frozen ? 0 : (held('KeyD') ? 1 : 0) - (held('KeyA') ? 1 : 0);
    const opts = {
      map: this.map,
      gravityMul: this.eventKind === 'moon' ? 0.35 : 1,
      speedMul: this.ultraKind === 'sigma' ? MOVE.ultraSpeedMul : this.grabbedBy !== null ? 0.55 : 1,
    };
    const events = stepBodyFixed(this.body, {
      fwd, right, yaw: this.yaw, jump: this.jumpQueued && !this.frozen, dash: this.dashQueued && !this.frozen,
    }, dt, opts);
    this.jumpQueued = false;
    this.dashQueued = false;
    for (const e of events) {
      if (e === 'jump') this.sfx.quack();
      if (e === 'doubleJump') { this.sfx.quack(); this.sfx.boing(); this.spin = Math.PI * 2; }
      if (e === 'pad') { this.sfx.boing(true); this.hud.shout('뿌잉', 'gold'); }
      if (e === 'dash') { this.sfx.dash(); this.fovKick = 12; }
      if (e === 'land') this.sfx.land();
    }
    const speed = Math.hypot(this.body.vx, this.body.vz);
    if (this.body.onGround && speed > 3) {
      this.stepAcc += dt * speed;
      if (this.stepAcc > 3.1) { this.stepAcc = 0; this.sfx.squeak(); }
    }
    if (this.body.y < this.map.fallY) this.body.vy = 0; // 서버가 죽여 줄 때까지 대기

    if (this.shotQueued || (this.mouseDown && this.curWeapon().auto)) this.tryFire();
    this.shotQueued = false;

    if (this.me) {
      this.me.root.position.set(this.body.x, this.body.y, this.body.z);
      this.me.root.rotation.y = this.yaw;
      this.me.pitch = this.pitch;
      this.me.emote = this.emote;
      this.me.setVisibleBody(this.emote !== 0);
      if (this.me.tag) this.me.tag.visible = false;
    }
  }

  updateCamera(dt) {
    this.updateCameraBase(dt);
    if (performance.now() < this.cineUntil && this.cinePos) {
      // 조준값은 그대로 두고 화면만 위로 돌린다
      const p = this.cinePos;
      this.camera.lookAt(p[0], p[1] + 15, p[2]);
      this.camera.updateMatrixWorld();
    }
  }

  updateCameraBase(dt) {
    const cam = this.camera;
    const fovBase = this.zoom ? 46 : 80;
    const want = fovBase + this.fovKick + (this.ultra ? 8 : 0);
    if (Math.abs(cam.fov - want) > 0.05) {
      cam.fov += (want - cam.fov) * Math.min(1, dt * 12);
      cam.updateProjectionMatrix();
    }

    if (!this.alive) {
      this.deadCamT += dt;
      const killer = this.chars.get(this.killerId);
      const focus = killer && killer.deadT < 0 ? killer.root.position : this.me?.root.position;
      if (focus) {
        const a = this.deadCamT * 0.9;
        const r = Math.max(3.2, 7 - this.deadCamT * 1.2);
        const want3 = new THREE.Vector3(focus.x + Math.sin(a) * r, focus.y + 2.6, focus.z + Math.cos(a) * r);
        cam.position.lerp(want3, Math.min(1, dt * 5));
        cam.lookAt(focus.x, focus.y + 1.3, focus.z);
      }
      return;
    }

    if (this.emote || this.forced) {
      // 포즈 잡는 내 모습을 뒤에서 봄
      const a = performance.now() / 1000 * 0.9;
      const r = this.eventKind === 'bighead' ? 7 : 5.2;
      const fx = this.body.x, fy = this.body.y + 1.3, fz = this.body.z;
      const dx = Math.sin(this.yaw + a), dz = Math.cos(this.yaw + a);
      const dir = [dx, 0.35, dz];
      const l = Math.hypot(...dir);
      const nd = [dir[0] / l, dir[1] / l, dir[2] / l];
      const dist = this.forced ? r : Math.min(r, rayWorld(this.map, [fx, fy, fz], nd, r) - 0.25);
      cam.position.set(fx + nd[0] * dist, fy + nd[1] * dist, fz + nd[2] * dist);
      cam.lookAt(fx, fy, fz);
      return;
    }

    if (this.spin > 0) this.spin = Math.max(0, this.spin - dt * 13);
    cam.position.set(this.body.x, this.body.y + PLAYER.eye, this.body.z);
    const shakeA = this.shake * this.shake * 0.05;
    cam.rotation.set(
      this.pitch + (Math.random() - 0.5) * shakeA,
      this.yaw + (Math.random() - 0.5) * shakeA,
      (Math.random() - 0.5) * shakeA + this.spin * 0.02,
    );
    cam.updateMatrixWorld();
  }

  updateViewmodel(dt) {
    const speed = Math.hypot(this.body.vx, this.body.vz);
    const t = performance.now() / 1000;
    const bob = this.body.onGround ? Math.min(1, speed / 9) : 0.2;
    const baseX = this.zoom ? 0.02 : 0.3;
    const baseY = this.zoom ? -0.2 : -0.27;
    const vm = this.vmRoot;
    vm.position.x += ((baseX + Math.cos(t * 9) * 0.02 * bob) - vm.position.x) * Math.min(1, dt * 14);
    vm.position.y = baseY + Math.abs(Math.sin(t * 9)) * 0.022 * bob - (this.body.vy * 0.002);
    vm.position.z = -0.62 + this.recoil * 0.12;
    vm.rotation.x = this.recoil * 0.28;
    vm.rotation.y = 0;
    const w = WEAPONS[this.weapon];
    if (this.reloadT > 0) {
      const k = 1 - this.reloadT / w.reload;
      vm.rotation.x = Math.sin(k * Math.PI) * 0.6;
      vm.rotation.z = k * Math.PI * 2;
      vm.position.y -= Math.sin(k * Math.PI) * 0.2;
    } else {
      vm.rotation.z = 0;
    }
    vm.scale.setScalar(this.ultraKind === 'sigma' ? 1.25 : 1);

    const h = this.vmHand;
    h.visible = this.slapT > 0;
    if (h.visible) {
      const k = 1 - this.slapT / 0.26;
      const swing = Math.sin(k * Math.PI);
      h.position.set(0.72 - k * 1.2, -0.28 + swing * 0.16, -0.72);
      h.rotation.set(0.25, 0.3 - k * 1.3, -0.75 + k * 1.0);
    }
  }
}

