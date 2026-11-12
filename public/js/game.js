// 3D 세계와 1인칭 조작. 서버 메시지를 받아 눈깔을 튀어나오게 한다.
import * as THREE from 'three';
import { lookKey } from '../shared/cosmetics.js';
import {
  SKINS, WEAPONS, LASER, CHILL, MOVE, PLAYER, SLAP, BOMB, AURA_MAX, INTERP_MS, MATCH_SECONDS, TICK_HZ,
} from '../shared/constants.js';
import { MAPS, DEFAULT_MAP, rayWorld, rayPlayer } from '../shared/map.js';
import { newBody, stepBodyFixed } from '../shared/physics.js';
import { Character, glowTexture, flashTexture, softTexture, toon, setRim, setOutlines } from './character.js';
import { Effects, textTexture } from './effects.js';
import { Pipeline } from './render.js';
import { LOOK, decorateWorld, mergeBoxes } from './worldfx.js';
import { lines, pick } from './memes.js';
import { t, ttsLang, signLines } from './i18n.js';

const emptyAmmo = () => Object.fromEntries(Object.values(WEAPONS).map((w) => [w.id, w.mag]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerpAngle = (a, b, k) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * k;
};

function gridTexture({ base, line, label = null, checker = false, windows = false }, size = 512) {
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
    x.lineWidth = 12;
    x.strokeRect(0, 0, size, size);
    // 패널 모서리 나사
    x.fillStyle = line;
    for (const px of [26, size - 26]) for (const py of [26, size - 26]) { x.beginPath(); x.arc(px, py, 7, 0, 7); x.fill(); }
  }
  // 줄눈 빛과 때: 평면 색이 아니라 뭔가 만든 벽처럼 보이게
  x.strokeStyle = 'rgba(255,255,255,.14)';
  x.lineWidth = 3;
  x.strokeRect(9, 9, size - 18, size - 18);
  for (let i = 0; i < 420; i++) {
    x.fillStyle = i % 2 ? 'rgba(0,0,0,.018)' : 'rgba(255,255,255,.014)';
    const r = 1 + Math.random() * 40;
    x.beginPath();
    x.arc(Math.random() * size, Math.random() * size, r, 0, 7);
    x.fill();
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
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// 위는 밝고 아래로 갈수록 어두운 박스: 값싼 AO
function boxGeo(b, tile, gradient = true) {
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
  const cols = new Float32Array(uv.count * 3);
  const pos = geo.attributes.position;
  for (let i = 0; i < uv.count; i++) {
    const side = i < 8 || i >= 16;
    const low = pos.getY(i) < 0;
    const k = gradient && side && low ? Math.max(0.5, 0.86 - sy * 0.03) : 1;
    cols[i * 3] = cols[i * 3 + 1] = cols[i * 3 + 2] = k;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  geo.translate(b.min[0] + sx / 2, b.min[1] + sy / 2, b.min[2] + sz / 2);
  return geo;
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

// 각성별 몸 입자
const rise = (fx, p, color, { size = 0.14, r = 0.9, up = 3.2, hdr = 2.3, life = 0.9 } = {}) => {
  const a = Math.random() * 6.283, d = r * (0.4 + Math.random() * 0.6);
  fx.burst([p.x + Math.cos(a) * d, p.y + 0.1 + Math.random() * 1.4, p.z + Math.sin(a) * d], { n: 1, speed: 0.2, up, color, size, life, hdr, drag: 0.8, spread: 0 });
};
export const ULTRA_FX = {
  farm: { color: 0xffd21f, emit: (fx, p) => rise(fx, p, 0xffd21f, { size: 0.15 }) },
  sigma: { color: 0xffc800, emit: (fx, p) => { rise(fx, p, 0xffc800); rise(fx, p, 0xffffff, { size: 0.08, up: 5 }); } },
  minsu: { color: 0xff2030, emit: (fx, p, c) => { for (const w of c.eyeWorldPositions()) fx.burst([w.x, w.y, w.z], { n: 1, speed: 0.6, color: 0xff2030, size: 0.32, size2: 0.05, life: 0.2, hdr: 3 }); } },
  cat: { color: 0xff7040, emit: (fx, p) => fx.burst([p.x, p.y + 1, p.z], { n: 2, speed: 2.6, color: 0xffa060, size: 0.22, size2: 0.06, life: 0.4, additive: false, alpha: 0.75, spread: 0.7 }) },
  cone: { color: 0x7fdc5a, emit: (fx, p) => rise(fx, p, 0x7fff50, { up: 2.4 }) },
  toilet: { color: 0x41b6ff, emit: (fx, p, c, t) => {
    for (let i = 0; i < 3; i++) {
      const a = t * 9 + (i * 6.283) / 3, r = 1.2 + ((t * 3 + i) % 3);
      fx.burst([p.x + Math.cos(a) * r, p.y + 0.3, p.z + Math.sin(a) * r], { n: 1, speed: 0.3, up: 2.6, color: 0x8fdcff, size: 0.18, life: 0.5, hdr: 1.9, g: 7, spread: 0 });
    }
  } },
  streamer: { color: 0xff3344, emit: (fx, p) => rise(fx, p, 0xff3344, { size: 0.12, up: 2.5 }) },
  tung: { color: 0xffc233, emit: (fx, p) => { if (Math.random() < 0.5) fx.dust([p.x, p.y, p.z], 2, 0xc9975c); } },
  hero: { color: 0xe8342c, emit: (fx, p) => {
    fx.burst([p.x, p.y + 1.1, p.z], { n: 3, speed: 0.4, color: 0xff5a3a, size: 0.55, size2: 0.06, life: 0.42, hdr: 2.2, spread: 0.6 });
    fx.burst([p.x, p.y + 1.1, p.z], { n: 2, speed: 0.4, color: 0xffd21f, size: 0.42, size2: 0.05, life: 0.5, hdr: 2.6, spread: 0.8 });
  } },
  rizz: { color: 0xff5fc0, emit: (fx, p) => rise(fx, p, 0xff5fc0, { size: 0.18, up: 2 }) },
  chill: { color: 0x60c8ff, emit: (fx, p) => rise(fx, p, 0x60c8ff, { size: 0.12, up: 0.9, r: 1.7, life: 1.5 }) },
};

export class Game {
  constructor(canvas, sfx, hud) {
    this.canvas = canvas;
    this.sfx = sfx;
    this.hud = hud;
    this.net = null;
    this.myId = null;
    this.mode = 'attract'; // attract | match

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.autoClear = false;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x4a1b6d, 45, 150);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x333333, 2);
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.sunLight.position.set(20, 40, 12);
    this.sunLight.shadow.bias = -0.0004;
    this.sunLight.shadow.normalBias = 0.04;
    this.sunLight.shadow.radius = 2.5;
    this.sunLight.shadow.autoUpdate = false;
    this.shadowN = 0;
    this.scene.add(this.hemi, this.sunLight, this.sunLight.target);
    // 각성한 사람 몸에서 나오는 빛
    this.auraLight = new THREE.PointLight(0xffd21f, 0, 14, 1.5);
    this.scene.add(this.auraLight);
    this.camera = new THREE.PerspectiveCamera(78, 16 / 9, 0.08, 500);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    this.effects = new Effects(this.scene);
    this.effects.camera = this.camera;
    Character.fx = {
      landDust: (p) => this.effects.dust(p, 5),
      poof: (p) => this.effects.poof(p),
      tap: (p) => this.effects.tap(p),
    };
    Character.cam = this.camera;
    this.buildViewmodels();
    this.pipeline = new Pipeline(this.renderer, this.scene, this.camera, this.vmScene, this.vmCam, (cfg) => this.applyTier(cfg));
    this.loadMap(DEFAULT_MAP);

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

  applyTier(cfg) {
    const r = this.renderer;
    r.shadowMap.enabled = cfg.shadow > 0;
    this.sunLight.castShadow = cfg.shadow > 0;
    if (cfg.shadow > 0) {
      this.sunLight.shadow.mapSize.set(cfg.shadow, cfg.shadow);
      this.sunLight.shadow.map?.dispose();
      this.sunLight.shadow.map = null;
    }
    setOutlines(cfg.outline);
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
    this.charmUntil = 0;
    this.charmBy = null;
    this.slowUntil = 0;
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
    this.camRoll = 0;
    this.landDip = 0;
    this.landDipV = 0;
    this.swayX = 0;
    this.swayY = 0;
    this.lastYaw = 0;
    this.lastPitch = 0;
    this.vmSwitch = 0;
    this.vmFlash = 0;
    this.fxAcc = 0;
  }

  // ---------- 세계 ----------
  reloadWorld() {
    const id = this.mapId;
    this.mapId = null;
    this.loadMap(id);
  }

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
    Character.map = this.map;
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
    const look = LOOK[map.id] ?? LOOK.ohio;
    this.hemi.intensity = th.hemi[2] * look.hemiMul;
    this.sunLight.intensity = th.sun * look.sunMul;
    this.sunLight.color.setHex(look.sunColor);
    const sd = look.sunDir, sl = Math.hypot(...sd), R = map.bounds + 8;
    this.sunLight.position.set((sd[0] / sl) * 90, (sd[1] / sl) * 90, (sd[2] / sl) * 90);
    this.sunLight.target.position.set(0, 0, 0);
    const sc = this.sunLight.shadow.camera;
    sc.left = sc.bottom = -R * 1.15;
    sc.right = sc.top = R * 1.15;
    sc.near = 5;
    sc.far = 200;
    sc.updateProjectionMatrix();
    setRim(look.rim, look.rimK);
    this.sunLight.shadow.needsUpdate = true;

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
    for (const [kind, def] of Object.entries(th.tex)) mats[kind] = new THREE.MeshLambertMaterial({ map: own(gridTexture(def)), vertexColors: true });
    mats.lamp = new THREE.MeshBasicMaterial({ color: 0xfffff0, vertexColors: true });
    this.lampMat = mats.lamp;
    // 종류별로 한 덩어리로 합쳐 그림자와 그리기 호출을 줄인다
    const byKind = new Map();
    for (const b of map.boxes) {
      const tile = b.floor ? 4 : b.wall ? 6 : 2;
      const key = b.floor ? `${b.kind}|floor` : b.kind;
      if (!byKind.has(key)) byKind.set(key, { kind: b.kind, floor: !!b.floor, parts: [] });
      byKind.get(key).parts.push(boxGeo(b, tile, !b.floor));
    }
    for (const { kind, floor, parts } of byKind.values()) {
      const m = new THREE.Mesh(mergeBoxes(parts), mats[kind]);
      m.receiveShadow = true;
      m.castShadow = !floor && !(look.noCast ?? []).includes(kind);
      s.add(m);
    }
    const decorKinds = new Map();
    for (const b of map.decor) {
      if (!decorKinds.has(b.kind)) decorKinds.set(b.kind, []);
      decorKinds.get(b.kind).push(boxGeo(b, b.kind === 'city' ? 8 : 2, b.kind === 'city'));
    }
    for (const [kind, parts] of decorKinds) s.add(new THREE.Mesh(mergeBoxes(parts), mats[kind]));

    for (const [signText, bg, fg, pos, rot, w] of th.signs) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 2), new THREE.MeshBasicMaterial({ map: own(bannerTexture(signLines(signText), bg, fg)), color: new THREE.Color(1.06, 1.06, 1.06), fog: false }));
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
    this.big67 = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(1.2, 1.2, 1.2), transparent: true, fog: false }));
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
      m.material.color.multiplyScalar(1.5);
      const arrow = new THREE.Mesh(
        new THREE.ConeGeometry(p.radius * 0.5, 0.8, 4),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 0, 1.1), transparent: true, opacity: 0.9 }),
      );
      arrow.position.set(p.pos[0], p.pos[1] + 0.9, p.pos[2]);
      arrow.userData.baseY = p.pos[1] + 0.9;
      s.add(arrow);
      this.padMeshes.push(arrow);
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(p.radius * 0.95, p.radius, 3.4, 20, 1, true).translate(0, 1.7, 0),
        new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
          vertexShader: 'varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
          fragmentShader: 'varying vec2 vU; void main(){ gl_FragColor = vec4(vec3(1.5, 1.2, 0.2), (1.0 - vU.y) * (1.0 - vU.y) * 0.5); }',
        }),
      );
      beam.position.set(p.pos[0], p.pos[1] + 0.1, p.pos[2]);
      s.add(beam);
    }

    const chickenTex = textTexture('🍗', { stroke: null, size: 128, font: '"Segoe UI Emoji", sans-serif' });
    this.pickupMeshes = map.pickups.map((p) => {
      let m;
      if (p.kind === 'chicken') {
        m = new THREE.Sprite(new THREE.SpriteMaterial({ map: chickenTex, transparent: true }));
        m.scale.set(chickenTex.userData.aspect * 1.25, 1.25, 1);
      } else {
        m = new THREE.Group();
        m.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 1.7, 0.2) })));
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.022, 6, 36).rotateX(1.2), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.4, 0.8) }));
        m.add(band);
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
        glow.scale.set(3.4, 3.4, 1);
        m.add(glow);
      }
      m.position.set(...p.pos);
      m.userData.baseY = p.pos[1];
      s.add(m);
      return m;
    });
    this.worldTick = decorateWorld(this, map, s, own);
  }

  buildViewmodels() {
    this.vmScene = new THREE.Scene();
    this.vmScene.add(new THREE.HemisphereLight(0xffffff, 0x554488, 1.7));
    const vmSun = new THREE.DirectionalLight(0xfff2e0, 1.6);
    vmSun.position.set(-1, 2, 1);
    this.vmScene.add(vmSun);
    this.vmLight = new THREE.PointLight(0xffffff, 0, 3, 1.2);
    this.vmLight.position.set(0.3, -0.05, -1);
    this.vmScene.add(this.vmLight);
    this.vmCam = new THREE.PerspectiveCamera(58, 16 / 9, 0.01, 10);
    this.vmRoot = new THREE.Group();
    this.vmScene.add(this.vmRoot);
    const skin = toon(0xffd23f);
    const sleeve = toon(0x2f6df6);
    this.vmSkin = skin;
    this.vmSleeve = sleeve;
    const L = (c) => toon(c);
    const H = (r, g, b) => new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b) });
    const add = (group, geo, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      group.add(m);
      return m;
    };

    const fist = (g, x = 0, y = -0.13, z = 0.05) => {
      add(g, new THREE.SphereGeometry(0.078, 14, 10), skin, x, y, z);
      for (let i = 0; i < 3; i++) add(g, new THREE.SphereGeometry(0.024, 8, 6), skin, x - 0.055, y + 0.035 - i * 0.034, z - 0.05);
      add(g, new THREE.CylinderGeometry(0.052, 0.06, 0.3, 10).rotateX(1.2), skin, x + 0.015, y - 0.05, z + 0.15);
      const arm = add(g, new THREE.CylinderGeometry(0.075, 0.09, 0.75, 12).rotateX(1.2), sleeve, x + 0.05, y - 0.19, z + 0.54);
      return arm;
    };

    const fart = new THREE.Group();
    add(fart, new THREE.CapsuleGeometry(0.075, 0.36, 6, 16).rotateX(Math.PI / 2), L(0x6cc644));
    add(fart, new THREE.ConeGeometry(0.115, 0.22, 16).rotateX(-Math.PI / 2), L(0x2f7a1a), 0, 0, -0.34);
    for (const z of [-0.14, 0.02, 0.15]) add(fart, new THREE.TorusGeometry(0.078, 0.008, 6, 20), L(0x2c4a18), 0, 0, z);
    // 빛나는 가스관
    this.vmGas = add(fart, new THREE.CapsuleGeometry(0.021, 0.27, 4, 10).rotateX(Math.PI / 2), H(1.4, 3, 0.35), 0.074, 0.044, 0);
    add(fart, new THREE.SphereGeometry(0.04, 12, 10), L(0xff66b2), 0, 0.092, -0.08).scale.set(1.2, 0.65, 1.4); // 방귀 방석
    add(fart, new THREE.CylinderGeometry(0.006, 0.01, 0.035, 8), L(0xd83a8a), 0, 0.112, -0.03).rotation.x = 1.1;
    add(fart, new THREE.BoxGeometry(0.08, 0.17, 0.07), L(0x222222), 0, -0.13, 0.07);
    fist(fart);

    const six7 = new THREE.Group();
    add(six7, new THREE.BoxGeometry(0.11, 0.13, 0.22), L(0xffd23f));
    add(six7, new THREE.CylinderGeometry(0.052, 0.052, 0.54, 12).rotateX(Math.PI / 2), L(0xb8930a), 0, 0.03, -0.36);
    add(six7, new THREE.CylinderGeometry(0.085, 0.085, 0.13, 10).rotateX(Math.PI / 2), L(0x777777), 0, 0.01, -0.09);
    add(six7, new THREE.BoxGeometry(0.075, 0.18, 0.08), L(0x5b3210), 0, -0.13, 0.08);
    add(six7, new THREE.BoxGeometry(0.018, 0.035, 0.018), H(3.2, 0.3, 1.2), 0, 0.105, -0.6);
    add(six7, new THREE.BoxGeometry(0.03, 0.03, 0.07), L(0x222222), 0, 0.085, 0.06);
    for (const z of [-0.2, -0.5]) add(six7, new THREE.TorusGeometry(0.054, 0.007, 6, 16), L(0x7a6108), 0, 0.03, z);
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
    add(boom, new THREE.TorusGeometry(0.2, 0.012, 6, 28), H(3, 0.9, 1.8), 0, 0, -0.53);
    add(boom, new THREE.BoxGeometry(0.03, 0.05, 0.3), L(0xff3d81), 0, 0.08, 0.02);
    add(boom, new THREE.BoxGeometry(0.02, 0.02, 0.02), H(0.3, 3, 1), 0.065, 0.02, 0.1);
    fist(boom);

    this.vmGuns = { fart, six7, boom };
    for (const g of Object.values(this.vmGuns)) { g.visible = false; this.vmRoot.add(g); }
    this.vmRoot.position.set(0.3, -0.27, -0.62);
    // 총구 불꽃
    this.vmMuzzle = new THREE.Sprite(new THREE.SpriteMaterial({ map: flashTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    this.vmMuzzle.scale.setScalar(0.55);
    this.vmRoot.add(this.vmMuzzle);

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
    this.vmSwitch = 1;
    this.vmMuzzle.position.set(0, id === 'six7' ? 0.03 : 0, id === 'fart' ? -0.48 : id === 'six7' ? -0.68 : -0.58);
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.pipeline?.resize();
    this.effects.setPointScale(h * this.renderer.getPixelRatio() * 0.72);
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
      // 고양이가 얼굴에 붙으면 상하좌우가 뒤집힌다
      const mult = (this.zoom ? 0.0011 : 0.0022) * (this.grabbedBy !== null ? -1 : 1);
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
    const demo = players.length === 0;
    if (demo) players = [{ id: 'demo1', skin: 'sigma' }, { id: 'demo2', skin: 'tung' }, { id: 'demo3', skin: 'cat' }, { id: 'demo4', skin: 'streamer' }];
    this.syncChars(players, true);
    const list = [...this.chars.values()];
    const c0 = this.map.showcase.pos;
    list.forEach((c, i) => {
      c.root.position.set(c0[0] + (i - (list.length - 1) / 2) * (demo ? 2.5 : 1.75), c0[1], c0[2]);
      c.lastPos.copy(c.root.position);
      c.root.rotation.y = 0;
      c.pitch = 0;
      c.emote = 0;
      c.lobby = true;
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
      if (!w || c.skinId !== w.skin || c.nameText !== w.name || lookKey(c.look) !== lookKey(w.look)) { c.dispose(this.scene); this.chars.delete(id); }
    }
    for (const p of players) {
      if (!this.chars.has(p.id)) {
        const c = new Character(p.skin, p.name, p.look);
        this.scene.add(c.root);
        this.chars.set(p.id, c);
      }
    }
    if (attract && players.length < 2) {
      if (!this.chars.has('ghost')) {
        const c = new Character('cone', t('room.ghost'));
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
    const myDef = SKINS[m.players.find((p) => p.id === myId)?.skin];
    if (myDef) {
      this.vmSkin.color.setHex(myDef.skin);
      this.vmSleeve.color.setHex(myDef.shirt);
    }
    for (const p of m.players) {
      const c = this.chars.get(p.id);
      c.respawn();
      c.emote = 0;
      c.lobby = false;
      c.xray = false;
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
    this.pipeline.prewarm(this.effects);
    this.sunLight.shadow.needsUpdate = true;
    this.hud.setFace(myDef ? m.players.find((p) => p.id === myId)?.skin : null);
    m.pickups.forEach((a, i) => { this.pickupMeshes[i].visible = a; });
    this.timeLeft = m.endsIn;
    this.setHudVisible(true);
    this.setViewWeapon('fart');
    this.hud.setWeapon(WEAPONS.fart);
    this.hud.reset();
    this.canvas.classList.remove('dead');
    this.requestLock();
    this.hud.setLockHint(!this.locked);

    // 6... 7... 시작. 경기 중에 들어온 사람은 바로 싸운다
    const step = m.countdownMs / 3;
    this.cdTimers = [];
    this.sfx.stopMusic();
    if (step <= 0) return;
    this.hud.bigCount('6');
    this.sfx.say('six', { rate: 0.8, pitch: 0.6 });
    this.sfx.bong();
    this.cdTimers = [
      setTimeout(() => { this.hud.bigCount('7'); this.sfx.say('seven', { rate: 0.8, pitch: 0.4 }); this.sfx.bong(); }, step),
      setTimeout(() => { this.hud.bigCount(t('hud.go')); this.sfx.airhorn(); }, step * 2),
    ];
    this.sfx.stopMusic();
  }

  // 경기 중 누가 나갔을 때
  onRoster(players) {
    if (this.mode !== 'match') return;
    const had = new Set(this.chars.keys());
    this.syncChars(players, false);
    // 경기 중에 새로 들어온 사람: 대기실 모습이 아니라 싸우는 모습으로
    for (const [id, c] of this.chars) {
      if (had.has(id)) continue;
      c.respawn();
      c.lobby = false;
      c.emote = 0;
    }
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
    for (const c of this.chars.values()) { if (c.tag) c.tag.visible = false; c.xray = false; }
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
    for (const end of m.ends) {
      this.effects.tracer(m.o, end, color, m.w === 'six7' || m.w === 'laser' ? 0.08 : 0.04, 0.12);
      if (m.w !== 'fart') this.effects.impact(end, color, 3);
    }
    this.effects.flash(m.o, color, 16, 9, 0.07);
    if (m.id !== undefined) this.chars.get(m.id)?.fire(m.w);
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
      this.chars.get(m.id)?.slap();
    }
  }

  onHit(m) {
    const mine = m.to === this.myId;
    const fromMe = m.from === this.myId;
    const c = this.chars.get(m.to);
    const strength = m.head ? 1.6 : m.dmg >= 20 ? 1.2 : 0.7;
    if (c) {
      c.pop(strength);
      const hitAt = [m.pos[0], m.pos[1] + (m.head ? 1.75 : 1.1), m.pos[2]];
      this.effects.burst(hitAt, { n: m.head ? 18 : 8, speed: m.head ? 8 : 5, color: m.head ? 0xffd21f : 0xff3d70, size: 0.17, life: 0.42, g: 12, drag: 1.6, hdr: 2.4 });
      if (m.head) this.effects.flash(hitAt, 0xffd21f, 26, 7, 0.14);
    }
    if (m.weapon === 'slap') this.sfx.slap();
    if (m.weapon === 'rizz' && c) this.effects.text([m.pos[0], m.pos[1] + 2.3, m.pos[2]], pick(['😘', '💋', '💖']), { scale: 0.9, life: 0.7, stroke: null });
    if (m.weapon === 'reflect' && c) {
      this.effects.text([m.pos[0], m.pos[1] + 2.3, m.pos[2]], 'nah', { color: '#60c8ff', scale: 1, life: 0.6 });
      this.effects.burst([m.pos[0], m.pos[1] + 1.2, m.pos[2]], { n: 8, speed: 5, color: 0x60c8ff, size: 0.14, life: 0.35, hdr: 2.4 });
    }
    if (mine && m.weapon === 'bark') this.hud.rain(['W', 'L', '💀', 'CHAT', '🐶', 'L', 'RATIO'], 7);
    if (m.weapon === 'claw') {
      this.sfx.scratch();
      this.effects.slash([m.pos[0], m.pos[1] + 1.4, m.pos[2]]);
      this.effects.burst([m.pos[0], m.pos[1] + 1.4, m.pos[2]], { n: 4, speed: 3, color: 0xffb060, size: 0.22, size2: 0.1, life: 0.5, g: 4, additive: false });
      this.effects.text([m.pos[0], m.pos[1] + 2.1, m.pos[2]], pick(lines('claw')), { color: '#ff4d6d', scale: 0.9, life: 0.45 });
      if (Math.random() < 0.18) this.sfx.meow();
    }
    if (mine) this.pipeline.hit(m.head ? 1.3 : 0.5 + m.dmg / 60);
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
      if (m.weapon === 'slap') this.effects.text(pos, t('fx.slap'), { color: '#ff4d6d', scale: 1.6, life: 0.8 });
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
      this.effects.text([m.pos[0], m.pos[1] + 2.6, m.pos[2]], pick(lines('kill')), { color: '#ff2a6d', scale: 1.5, life: 1.8, rise: 1 });
      this.effects.burst([m.pos[0], m.pos[1] + 1.2, m.pos[2]], { n: 30, speed: 10, up: 3, color: 0xff3d70, color2: 0xffd21f, size: 0.2, life: 0.8, g: 16, drag: 1.2, hdr: 2.4 });
      this.effects.burst([m.pos[0], m.pos[1] + 1.2, m.pos[2]], { n: 10, speed: 2.5, up: 0.8, color: 0xff6688, color2: 0x552233, size: 0.7, size2: 1.6, life: 0.8, drag: 3, additive: false, spread: 0.7, alpha: 0.6 });
      this.effects.flash([m.pos[0], m.pos[1] + 1.2, m.pos[2]], 0xff4066, 40, 11, 0.24);
    }
    const killerName = m.killer != null ? this.nameOf(m.killer) : t(m.weapon === 'bomb' ? 'name.plane' : 'name.gravity');
    this.hud.killFeed(m, killerName, this.nameOf(m.victim));

    if (got) {
      if (iKilled) {
        const line = pick(lines('kill'));
        this.hud.killCutIn(line, m.head);
        this.sfx.vineBoom();
        setTimeout(() => this.sfx.airhorn(), 160);
        this.meme(line);
      } else {
        this.hud.shout(t('shout.free'), 'gold');
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
      const line = pick(lines(m.weapon === 'fall' ? 'fall' : 'death'));
      this.setGrabbed(null);
      this.charmUntil = this.slowUntil = 0;
      this.hud.setCharm(0);
      this.hud.setSlow(0);
      this.hud.deathScreen(line, killerName, m.weapon, m.respawnMs);
      this.sfx.sadTrombone();
      this.sfx.bigFart();
      this.meme(line, true);
      if (m.victimKills === 6 && m.killerKills === 6) this.hud.shout(t('shout.matchPoint'), 'gold');
    }
  }

  nameOf(id) {
    return this.hud.names.get(id) ?? t('name.left');
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
      this.effects.pillar(m.pos, 0x5fe0ff);
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
      if (m.delta <= -600 && m.reason !== 'death' && m.reason !== 'fall') {
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
      this.hud.shout(t('shout.flipped'), 'red');
      this.sfx.meow();
      this.sfx.say(t('tts.meow'), { lang: ttsLang(), pitch: 2, rate: 1.4 });
    } else if (m.to === null && this.grabbedBy === m.id) {
      this.setGrabbed(null);
    }
    if (m.id === this.myId && m.to !== null) this.sfx.meow();
  }

  onWave(m) {
    this.effects.ring(m.pos, m.radius);
    this.effects.dust(m.pos, m.final ? 34 : 14, 0xc9975c);
    this.effects.flash([m.pos[0], m.pos[1] + 1, m.pos[2]], 0xffc233, m.final ? 90 : 30, m.final ? 28 : 12, m.final ? 0.4 : 0.2);
    this.effects.text([m.pos[0], m.pos[1] + 3.4, m.pos[2]], m.final ? 'SAHUR!!!' : t('fx.tung'), { color: m.final ? '#ff5f1f' : '#ffc233', scale: m.final ? 2.8 : 1.1 + (m.n ?? 1) * 0.12, life: m.final ? 0.9 : 0.5 });
    if (m.final) this.effects.pillar(m.pos, 0xffc233, 12, 0.4);
    this.sfx.tungTung();
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    if (d < m.radius * 1.4) this.shake = Math.min(1, this.shake + 0.35);
  }

  onCharm(m) {
    const c = this.chars.get(m.to);
    if (c) {
      this.effects.text([c.root.position.x, c.root.position.y + 2.8, c.root.position.z], '💖', { scale: 1.2, life: 1.2, stroke: null });
      this.effects.burst([c.root.position.x, c.root.position.y + 1.4, c.root.position.z], { n: 14, speed: 2.5, up: 2, color: 0xff5fc0, size: 0.2, life: 0.9, hdr: 2.3, drag: 1 });
    }
    if (m.to !== this.myId) return;
    this.charmUntil = performance.now() + m.ms;
    this.charmBy = m.id;
    this.emote = 0;
    this.mouseDown = false;
    this.hud.setCharm(m.ms);
    this.hud.shout(t('shout.charm', { name: this.nameOf(m.id) }), 'red');
  }

  onFallout(m) {
    this.effects.fallout(m.pos, m.radius, m.ms);
  }

  onGeyser(m) {
    this.effects.geyser(m.pos, m.radius);
    this.sfx.flush(900);
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    if (d < m.radius * 1.3) {
      this.shake = Math.min(1, this.shake + 0.7);
      this.pipeline.hit(0.8);
    }
  }

  onPunch(m) {
    this.effects.punch(m.pos, m.n);
    this.sfx.vineBoom();
    this.effects.text([m.pos[0], m.pos[1] + 2.8, m.pos[2]], ['POW!', 'BAM!', 'THINK!'][m.n - 1] ?? 'POW!', { color: '#ffd21f', scale: 1.3 + m.n * 0.35, life: 0.6 });
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    if (d < 25) this.shake = Math.min(1, this.shake + 0.3 + m.n * 0.12);
    if (m.id === this.myId) this.fovKick = 10 + m.n * 5;
  }

  onUltraExt(m) {
    const c = this.chars.get(m.id);
    if (c) {
      const p = c.root.position;
      this.effects.text([p.x, p.y + 3.1, p.z], '+2s', { color: '#ffd21f', scale: 1.1, life: 0.9 });
      this.effects.pillar([p.x, p.y, p.z], 0xffc800, 8, 0.4);
    }
    if (m.id === this.myId) {
      this.hud.setUltra(true, m.ms, t('ultra.sigma'));
      this.sfx.sparkle();
    }
  }

  // 스트리머가 짖을 때
  onBark(m) {
    const ahead = 3;
    const pos = [m.pos[0] - Math.sin(m.yaw) * ahead, m.pos[1] + 1.8, m.pos[2] - Math.cos(m.yaw) * ahead];
    this.effects.ring([m.pos[0] - Math.sin(m.yaw) * 5, m.pos[1], m.pos[2] - Math.cos(m.yaw) * 5], m.range * 0.5, 0xff3344);
    this.effects.text(pos, 'WOOF!', { color: '#ff3344', scale: 1.7, life: 0.55 });
    this.effects.flash(pos, 0xff3344, m.final ? 80 : 36, m.final ? 24 : 14, m.final ? 0.35 : 0.18);
    if (m.final) {
      this.effects.ring(m.pos, m.range, 0xff3344);
      this.effects.text([m.pos[0], m.pos[1] + 3.2, m.pos[2]], 'AAAAAAAA!!', { color: '#ff3344', scale: 2.2, life: 0.9 });
      this.effects.burst([m.pos[0], m.pos[1] + 1.2, m.pos[2]], { n: 40, speed: 16, color: 0xff3344, size: 0.2, life: 0.6, drag: 1, hdr: 2.6 });
      this.sfx.airhorn();
    }
    this.effects.burst(pos, { n: 18, speed: 13, color: 0xff3344, size: 0.2, life: 0.45, drag: 1.2, hdr: 2.6, dir: [-Math.sin(m.yaw), 0.05, -Math.cos(m.yaw)] });
    this.sfx.bark();
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    if (d < m.range) this.shake = Math.min(1, this.shake + 0.25);
  }

  onSlow(m) {
    const c = this.chars.get(m.to);
    if (c) {
      this.effects.text([c.root.position.x, c.root.position.y + 2.8, c.root.position.z], '😌', { scale: 1.1, life: 1.2, stroke: null });
      this.effects.burst([c.root.position.x, c.root.position.y + 1.2, c.root.position.z], { n: 10, speed: 1.2, up: 0.9, color: 0x60c8ff, size: 0.2, life: 1.2, hdr: 2, drag: 1 });
    }
    if (m.to !== this.myId) return;
    this.slowUntil = performance.now() + m.ms;
    this.hud.setSlow(m.ms);
    this.hud.shout(t('shout.slow', { name: this.nameOf(m.id) }), 'gold');
  }

  disabled() {
    return performance.now() < this.charmUntil;
  }

  // 핵 모드: 위로 올라가는 현악기 → 번쩍 → 잠깐 정적 → 쾅
  onNuke(m) {
    const mine = m.id === this.myId;
    this.effects.warning(m.pos, m.radius, m.in, '☢️', 5);
    this.sfx.stopMusic();
    this.musicHold = performance.now() + m.in + 3500;
    this.sfx.nukeWind(m.in);
    this.sfx.say('Tactical nuke incoming', { pitch: 0.1, rate: 0.72 });
    this.hud.oppenheimer(m.in, mine ? null : this.nameOf(m.id));
  }

  onNukeBoom(m) {
    this.effects.mushroom(m.pos, m.radius);
    this.hud.nukeFlash();
    this.pipeline.hit(1.6);
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
      this.sfx.say(t('tts.laser'), { lang: ttsLang(), pitch: 0.2, rate: 0.8 });
    } else if (kind === 'cat') {
      this.sfx.meow();
      this.sfx.say(t('tts.cat'), { lang: ttsLang(), pitch: 1.9, rate: 1.3 });
    } else if (kind === 'toilet') {
      this.sfx.flush(ms);
      this.sfx.say('flush', { pitch: 0.1, rate: 0.5 });
    } else if (kind === 'streamer') {
      this.sfx.airhorn();
      this.hud.rain(['W', 'W', 'L', '🔥', '💀', 'CHAT', '🐶'], 12);
    } else if (kind === 'hero') {
      this.sfx.vineBoom();
      this.sfx.say('think! think!', { pitch: 0.2, rate: 0.75 });
    } else if (kind === 'chill') {
      this.sfx.sparkle();
      this.sfx.say('just a chill guy', { pitch: 0.5, rate: 0.7 });
    } else if (kind === 'tung') {
      this.sfx.say('tung tung tung sahur', { pitch: 0.2, rate: 0.9 });
    } else if (kind === 'rizz') {
      this.sfx.sparkle();
      this.sfx.say('rizz', { pitch: 0.2, rate: 0.5 });
    }
  }

  onUltra(m) {
    const c = this.chars.get(m.id);
    if (c) {
      c.ultra = m.on;
      c.ultraKind = m.on ? m.kind : null;
      if (m.on) {
        const p = c.root.position, col = ULTRA_FX[m.kind]?.color ?? 0xffd21f;
        this.effects.pillar([p.x, p.y, p.z], col, 16, 0.55);
        this.effects.ring([p.x, p.y, p.z], 12, col);
        this.effects.flash([p.x, p.y + 1.5, p.z], col, 28, 16, 0.3);
      }
    }
    if (m.id === this.myId) {
      if (m.on) {
        this.ultra = true;
        this.ultraKind = m.kind;
        this.emote = 0;
        const ultraName = t(`ultra.${m.kind}`);
        this.hud.setUltra(true, m.ms, ultraName, ULTRA_FX[m.kind]?.color);
        this.fovKick = 22;
        if (this.infAmmo()) this.reloadT = 0;
        if (m.kind === 'cat' || m.kind === 'hero') {
          this.forced = true;
          this.reloadT = 0;
          this.setHudVisible(false);
        }
        if (m.kind === 'minsu') {
          this.setHudVisible(false);
          this.hud.setWeapon(LASER);
        }
        if (m.kind !== 'cone') this.hud.shout(ultraName, 'gold');
        this.ultraIntro(m.kind, m.ms);
      } else this.ultraOff();
    } else if (m.on) {
      if (m.kind !== 'cone') this.hud.shout(t('shout.flee', { name: this.nameOf(m.id), ultra: t(`ultra.${m.kind}`) }), 'red');
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
    this.hud.eventBanner(t(`event.${m.kind}`), m.ms);
    this.sfx.bong();
    this.sfx.sayMeme(t(`eventSay.${m.kind}`));
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
    if (Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]) < 14) this.pipeline.hit(0.8);
    const d = Math.hypot(this.body.x - m.pos[0], this.body.z - m.pos[2]);
    if (d < 16) this.shake = Math.min(1, this.shake + (1 - d / 16) * 0.6);
  }

  onPickup(m) {
    const pm = this.pickupMeshes[m.i];
    if (pm) this.effects.burst([pm.position.x, pm.position.y, pm.position.z], { n: m.active ? 10 : 22, speed: m.active ? 2 : 6, up: 1.5, color: m.kind === 'chicken' ? 0xffa040 : 0xffd21f, size: 0.14, life: 0.7, drag: 1.5, hdr: 2.4 });
    pm.visible = m.active;
    if (m.active) return;
    if (m.by === this.myId) {
      if (m.kind === 'chicken') {
        this.sfx.chomp();
        this.hud.shout(t('shout.chicken'), 'gold');
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
    if (performance.now() < this.cineUntil || this.disabled()) return;
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
        const far = [o[0] + d[0] * w.range, o[1] + d[1] * w.range, o[2] + d[2] * w.range];
        this.effects.tracer(this.muzzlePos(0.2), far, col, 0.07, 0.11);
        this.effects.tracer(this.muzzlePos(-0.2), far, col, 0.07, 0.11);
        const wall = rayWorld(this.map, o, d, w.range);
        if (wall < w.range - 0.1) this.effects.impact([o[0] + d[0] * wall, o[1] + d[1] * wall, o[2] + d[2] * wall], col, 4);
        continue;
      }
      this.effects.tracer(muzzle, end, col, w.id === 'six7' ? 0.06 : 0.025, 0.08);
      if (t < w.range - 0.1 && w.id !== 'fart' && (w.id !== 'boom' || Math.random() < 0.45)) this.effects.impact(end, col, w.id === 'boom' ? 3 : 8);
      if (!hit && t < w.range - 0.1 && (w.id !== 'boom' || Math.random() < 0.3)) {
        if (w.id === 'fart') this.effects.cloud(end, 1, 0xb5e02a);
        if (w.id === 'six7') this.effects.text(end, '67', { color: '#ffe600', scale: 0.8, life: 0.55, rise: 0.8 });
        if (w.id === 'boom') this.effects.text(end, '💥', { scale: 0.7, life: 0.3, stroke: null, rise: 0 });
      }
    }
    const muzzleCol = { fart: 0x9be02a, six7: 0xffd060, boom: 0xff3d81, laser: 0xff1133 }[w.id];
    if (w.id !== 'laser') {
      this.vmFlash = 0.055;
      this.vmMuzzle.material.color.set(muzzleCol).multiplyScalar(2.8);
      this.vmMuzzle.material.rotation = Math.random() * 6.28;
      this.vmLight.color.set(muzzleCol);
      this.effects.flash(muzzle, muzzleCol, w.id === 'fart' ? 8 : 22, w.id === 'fart' ? 6 : 12, 0.07);
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
    if (this.forced || this.disabled() || this.frozen || !this.alive || this.slapCd > 0 || this.emote) return;
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
    // 대기실은 30프레임이면 충분하다
    if (this.mode !== 'match' && now - this.lastFrame < 30) return;
    const realDt = (now - this.lastFrame) / 1000;
    const dt = Math.min(0.05, realDt);
    this.lastFrame = now;
    this.pipeline.watch(realDt);
    if (this.mode === 'match') this.updateMatch(dt);
    else this.updateAttract(dt);

    const t = now / 1000;
    this.big67.material.rotation = Math.sin(t * 1.4) * 0.14;
    this.big67.position.y = this.big67.userData.baseY + Math.sin(t * 2) * 0.5;
    for (const [i, m] of this.padMeshes.entries()) {
      m.position.y = m.userData.baseY + Math.sin(t * 5 + i) * 0.25;
      m.rotation.y = t * 2;
    }
    for (const m of this.pickupMeshes) {
      m.position.y = m.userData.baseY + Math.sin(t * 3) * 0.14;
      if (m.isGroup) m.rotation.y = t * 2;
    }
    for (const c of this.chars.values()) c.update(dt);
    this.updateCharFx(dt, t);
    this.worldTick?.(t, dt);
    this.effects.update(dt);

    if (this.sunLight.castShadow && ++this.shadowN % (this.mode === 'match' ? 2 : 4) === 0) this.sunLight.shadow.needsUpdate = true;
    this.pipeline.render(dt, this.mode === 'match' && this.alive && !this.emote && !this.forced && now >= this.cineUntil && this.vmRoot.visible);
  }

  // 각성과 파밍 중인 몸에서 나오는 입자와 빛
  updateCharFx(dt, t) {
    this.fxAcc += dt;
    const tick = this.fxAcc > 0.045;
    if (tick) this.fxAcc = 0;
    const fx = this.effects;
    let lit = null;
    for (const [id, c] of this.chars) {
      c.xray = this.ultraKind === 'minsu' && id !== this.myId && c.deadT < 0;
      if (c.deadT >= 0 || !c.visual.visible) continue;
      const p = c.root.position;
      const kind = c.ultra ? c.ultraKind : null;
      const farming = c.emote === 1;
      if (kind || farming) {
        const def = kind ? ULTRA_FX[kind] : ULTRA_FX.farm;
        if (def && (!lit || id !== this.myId)) lit = { p, color: def.color, k: kind ? 1 : 0.6 };
        if (tick && def) def.emit(fx, p, c, t, id === this.myId);
      }
    }
    if (lit) {
      this.auraLight.position.set(lit.p.x, lit.p.y + 1.5, lit.p.z);
      this.auraLight.color.setHex(lit.color);
      this.auraLight.intensity = (9 + Math.sin(t * 9) * 2.5) * lit.k;
    } else this.auraLight.intensity = 0;
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
    const charmed = performance.now() < this.charmUntil;
    if (!this.frozen && this.body.onGround && !this.ultraKind && !charmed) {
      if (held('KeyG')) emote = 1;
      else if (held('KeyT')) emote = 2;
    }
    if (emote && !this.emote) {
      this.sfx.vineBoom();
      this.sfx.say(emote === 1 ? 'aura farming' : 'six seven', { pitch: 0.3, rate: 0.8 });
      if (emote === 1) this.hud.shout(t('shout.farming'), 'gold');
    }
    this.emote = emote;

    let fwd = emote || this.frozen ? 0 : (held('KeyW') ? 1 : 0) - (held('KeyS') ? 1 : 0);
    let right = emote || this.frozen ? 0 : (held('KeyD') ? 1 : 0) - (held('KeyA') ? 1 : 0);
    if (charmed) {
      // 반한 사람에게 저절로 걸어간다
      const r = this.renderOf(this.charmBy);
      right = 0;
      fwd = 0;
      if (r) {
        const dx = r.p[0] - this.body.x, dz = r.p[2] - this.body.z;
        this.yaw = Math.atan2(-dx, -dz);
        fwd = Math.hypot(dx, dz) > 1.6 ? 1 : 0;
      }
    }
    if (charmed) { this.jumpQueued = false; this.dashQueued = false; this.shotQueued = false; }
    if (this.grabbedBy !== null) { fwd = -fwd; right = -right; }
    const opts = {
      map: this.map,
      gravityMul: this.eventKind === 'moon' ? 0.35 : 1,
      speedMul: this.ultraKind === 'sigma' || this.ultraKind === 'streamer' ? MOVE.ultraSpeedMul : performance.now() < this.slowUntil ? CHILL.slowMul : this.grabbedBy !== null ? 0.55 : 1,
    };
    const events = stepBodyFixed(this.body, {
      fwd, right, yaw: this.yaw, jump: this.jumpQueued && !this.frozen, dash: this.dashQueued && !this.frozen,
    }, dt, opts);
    this.jumpQueued = false;
    this.dashQueued = false;
    for (const e of events) {
      if (e === 'jump') this.sfx.quack();
      if (e === 'doubleJump') { this.sfx.quack(); this.sfx.boing(); this.spin = Math.PI * 2; }
      if (e === 'pad') { this.sfx.boing(true); this.hud.shout(t('shout.pad'), 'gold'); }
      if (e === 'dash') {
        this.sfx.dash();
        this.fovKick = 12;
        const moveLen = Math.hypot(this.body.vx, this.body.vz) || 1;
        this.effects.burst([this.body.x, this.body.y + 0.9, this.body.z], { n: 14, speed: 9, color: 0xbfeaff, size: 0.12, life: 0.3, hdr: 2.2, spread: 1.2, dir: [-this.body.vx / moveLen, 0, -this.body.vz / moveLen] });
        this.effects.dust([this.body.x, this.body.y, this.body.z], 6);
      }
      if (e === 'land') {
        this.sfx.land();
        this.landDipV = -1.3;
        this.vmRoot.position.y -= 0.03;
        this.effects.dust([this.body.x, this.body.y, this.body.z], 7);
      }
      if (e === 'jump' || e === 'doubleJump') this.effects.dust([this.body.x, this.body.y, this.body.z], e === 'jump' ? 4 : 9, e === 'jump' ? 0xd8c8b8 : 0xffd21f);
      if (e === 'pad') this.effects.pillar([this.body.x, this.body.y, this.body.z], 0xffe600, 8, 0.5);
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
    const runFov = this.zoom ? 0 : Math.min(1, Math.hypot(this.body.vx, this.body.vz) / 14) * 3;
    const want = fovBase + runFov + this.fovKick + (this.ultra ? 8 : 0);
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
    // 착지하면 살짝 꺼지고, 옆으로 뛰면 살짝 기운다
    this.landDipV += (-120 * this.landDip - 16 * this.landDipV) * dt;
    this.landDip += this.landDipV * dt;
    const strafe = (this.body.vx * Math.cos(this.yaw) - this.body.vz * Math.sin(this.yaw));
    this.camRoll += (clamp(strafe * -0.0028, -0.035, 0.035) - this.camRoll) * Math.min(1, dt * 8);
    cam.position.set(this.body.x, this.body.y + PLAYER.eye + this.landDip, this.body.z);
    const shakeA = this.shake * this.shake * 0.05;
    cam.rotation.set(
      this.pitch + (Math.random() - 0.5) * shakeA,
      this.yaw + (Math.random() - 0.5) * shakeA,
      (Math.random() - 0.5) * shakeA + this.spin * 0.02 + this.camRoll,
    );
    cam.updateMatrixWorld();
  }

  updateViewmodel(dt) {
    const speed = Math.hypot(this.body.vx, this.body.vz);
    const t = performance.now() / 1000;
    const bob = this.body.onGround ? Math.min(1, speed / 9) : 0.2;
    const baseX = this.zoom ? 0.02 : 0.3;
    const baseY = this.zoom ? -0.2 : -0.27 - Math.min(1, speed / 14) * 0.02;
    const vm = this.vmRoot;
    vm.position.x += ((baseX + Math.cos(t * 9) * 0.02 * bob) - vm.position.x) * Math.min(1, dt * 14);
    vm.position.y = baseY + Math.abs(Math.sin(t * 9)) * 0.022 * bob - (this.body.vy * 0.002);
    vm.position.z = -0.62 + this.recoil * 0.12;
    // 조준을 돌리면 총이 늦게 따라오고, 뛰면 숙인다
    let dy = this.yaw - this.lastYaw;
    while (dy > Math.PI) dy -= Math.PI * 2;
    while (dy < -Math.PI) dy += Math.PI * 2;
    const dp = this.pitch - this.lastPitch;
    this.lastYaw = this.yaw;
    this.lastPitch = this.pitch;
    const inv = 1 / Math.max(dt, 0.001);
    this.swayX += (clamp(dy * inv * 0.022, -0.16, 0.16) - this.swayX) * Math.min(1, dt * 11);
    this.swayY += (clamp(dp * inv * 0.02, -0.12, 0.12) - this.swayY) * Math.min(1, dt * 11);
    vm.position.x += this.swayX * 0.1;
    vm.position.y += this.swayY * 0.1;
    this.vmSwitch = Math.max(0, this.vmSwitch - dt * 5.2);
    const sw = this.vmSwitch * this.vmSwitch;
    vm.position.y -= sw * 0.42;
    vm.rotation.x = this.recoil * 0.28 + this.swayY + sw * -0.9;
    vm.rotation.y = this.swayX;
    this.vmFlash = Math.max(0, this.vmFlash - dt);
    this.vmMuzzle.material.opacity = this.vmFlash > 0 ? 1 : 0;
    this.vmLight.intensity = this.vmFlash > 0 ? 4 : 0;
    if (this.vmGas) this.vmGas.material.color.setRGB(1.4, 2.4 + Math.sin(t * 5) * 0.8, 0.35);
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

