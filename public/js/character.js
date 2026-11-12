// 대두 + 왕눈깔 캐릭터. 맞으면 눈이 용수철처럼 튀어나온다. 앞쪽은 -Z.
import * as THREE from 'three';
import { SKINS } from '../shared/constants.js';
import { groundAt } from '../shared/map.js';

// 3단 만화 음영 + 가장자리 빛. 림 색은 맵마다 바뀐다.
const gradient = (() => {
  const t = new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 190, 190, 190, 255, 255, 255, 255, 255]), 3, 1);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
})();
const RIM = { value: new THREE.Color(0x665577) };
export function setRim(hex, scale = 1) { RIM.value.setHex(hex).multiplyScalar(scale); }

function withRim(m) {
  m.onBeforeCompile = (s) => {
    s.uniforms.uRim = RIM;
    s.fragmentShader = `uniform vec3 uRim;\n${s.fragmentShader}`.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
       totalEmissiveRadiance += uRim * pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), 2.6);`,
    );
  };
  m.customProgramCacheKey = () => 'rim';
  return m;
}
export const toon = (color, extra = {}) => withRim(new THREE.MeshToonMaterial({ color, gradientMap: gradient, ...extra }));
const lambert = toon;
const basic = (color, extra = {}) => new THREE.MeshBasicMaterial({ color, ...extra });
const hdr = (color, k = 2.4, extra = {}) => { const m = basic(color, extra); m.color.multiplyScalar(k); return m; };

// 뒤집힌 껍데기 외곽선: 한 벌의 재질로 그린다
const OUTLINE = new THREE.MeshBasicMaterial({ color: 0x1a0f22, side: THREE.BackSide });
OUTLINE.onBeforeCompile = (s) => {
  s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normalize(normal) * 0.018;');
};
export function setOutlines(on) { OUTLINE.visible = on; }

function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}
const skipOutline = (m) => { m.userData.noOutline = true; return m; };

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
  glowTex.colorSpace = THREE.SRGBColorSpace;
  return glowTex;
}

let softTex = null;
export function softTexture() {
  if (softTex) return softTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.5, 'rgba(255,255,255,.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  softTex = new THREE.CanvasTexture(c);
  return softTex;
}

let flashTex = null;
export function flashTexture() {
  if (flashTex) return flashTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  x.translate(64, 64);
  x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 7; i++) {
    x.rotate((Math.PI * 2) / 7);
    const g = x.createLinearGradient(0, 0, 60, 0);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(0, -9); x.lineTo(i % 2 ? 42 : 62, 0); x.lineTo(0, 9);
    x.fill();
  }
  const g = x.createRadialGradient(0, 0, 0, 0, 0, 30);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(-32, -32, 64, 64);
  flashTex = new THREE.CanvasTexture(c);
  return flashTex;
}

function decal(text, size = 0.36, color = '#fff') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = color;
  x.font = '900 104px Impact, "Segoe UI Emoji", sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(text, 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }));
  m.userData.noOutline = true;
  return m;
}

function nameSprite(text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 96;
  const x = c.getContext('2d');
  x.font = '900 56px "Malgun Gothic", sans-serif';
  // 긴 닉네임(최대 20자)도 잘리지 않게 줄인다
  const fit = Math.min(1, 480 / x.measureText(text).width);
  x.font = `900 ${Math.floor(56 * fit)}px "Malgun Gothic", sans-serif`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.lineWidth = 12 * fit;
  x.strokeStyle = '#000';
  x.strokeText(text, 256, 50);
  x.fillStyle = '#fff';
  x.fillText(text, 256, 50);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  s.scale.set(2.4, 0.45, 1);
  return s;
}

let woodTex = null;
function stripeTexture(a, b) {
  const cv = document.createElement('canvas');
  cv.width = 64; cv.height = 64;
  const x = cv.getContext('2d');
  x.fillStyle = a; x.fillRect(0, 0, 64, 64);
  x.fillStyle = b;
  for (let i = 0; i < 4; i++) x.fillRect(0, i * 16, 64, 8);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function woodTexture() {
  if (woodTex) return woodTex;
  const c = document.createElement('canvas');
  c.width = 128; c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#b07c44';
  x.fillRect(0, 0, 128, 256);
  for (let i = 0; i < 26; i++) {
    x.strokeStyle = i % 3 ? 'rgba(92,52,20,.45)' : 'rgba(226,176,112,.4)';
    x.lineWidth = 1 + Math.random() * 3;
    const px = Math.random() * 128;
    x.beginPath();
    x.moveTo(px, 0);
    x.bezierCurveTo(px + 9, 80, px - 9, 170, px + 3, 256);
    x.stroke();
  }
  woodTex = new THREE.CanvasTexture(c);
  woodTex.colorSpace = THREE.SRGBColorSpace;
  woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;
  return woodTex;
}

const GEO = {
  head: new THREE.SphereGeometry(0.52, 28, 20),
  eye: new THREE.SphereGeometry(0.2, 20, 16),
  lid: new THREE.SphereGeometry(0.212, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  iris: new THREE.SphereGeometry(0.115, 14, 10),
  pupil: new THREE.SphereGeometry(0.07, 12, 8),
  shine: new THREE.SphereGeometry(0.03, 8, 6),
  stalk: new THREE.CylinderGeometry(0.05, 0.075, 1, 10).rotateX(Math.PI / 2).translate(0, 0, -0.5),
  upperArm: new THREE.CapsuleGeometry(0.098, 0.2, 4, 10).translate(0, -0.14, 0),
  foreArm: new THREE.CapsuleGeometry(0.08, 0.2, 4, 10).translate(0, -0.13, 0),
  hand: new THREE.SphereGeometry(0.108, 12, 10),
  thigh: new THREE.CapsuleGeometry(0.115, 0.2, 4, 10).translate(0, -0.14, 0),
  shin: new THREE.CapsuleGeometry(0.098, 0.18, 4, 10).translate(0, -0.11, 0),
  shoe: new THREE.SphereGeometry(0.13, 12, 8).scale(0.95, 0.62, 1.45),
  sole: new THREE.BoxGeometry(0.2, 0.035, 0.34),
  torso: new THREE.CapsuleGeometry(0.31, 0.34, 6, 16).scale(1, 1, 0.82),
  hips: new THREE.SphereGeometry(0.3, 14, 10).scale(1.02, 0.62, 0.8),
  nose: new THREE.SphereGeometry(0.07, 10, 8),
  ear: new THREE.SphereGeometry(0.11, 10, 8).scale(0.6, 1, 0.8),
  brow: new THREE.CapsuleGeometry(0.034, 0.2, 3, 6).rotateZ(Math.PI / 2),
};

// 스킨별 옷 색
const OUTFIT = {
  minsu: { pants: 0x2a2f4a, shoe: 0xf2f2f2, iris: 0x2b6cff, brow: 0x3a2412 },
  sigma: { pants: 0x17171c, shoe: 0x0a0a0a, iris: 0x667788, brow: 0x111111, lid: 0.35, browTilt: 0.32 },
  cat: { pants: 0xe8e8e8, shoe: 0xff9a3c, iris: 0x6dd400, brow: null, lid: 0.22 },
  cone: { pants: 0x402080, shoe: 0xff6a00, iris: 0xff3030, brow: null },
  toilet: { pants: 0xffffff, shoe: 0xffffff, iris: 0x2b9cff, brow: 0x4a2a12 },
  streamer: { pants: 0x18181c, shoe: 0xf4f4f4, iris: 0x2a1a0c, brow: 0x120c08 },
  tung: { pants: 0x8f5f30, shoe: 0x5c3a1c, iris: 0x111111, brow: 0x5c3a1c, browTilt: 0.2 },
  hero: { pants: 0x1c1c22, shoe: 0xe8342c, iris: 0x222222, brow: null },
  rizz: { pants: 0x24182e, shoe: 0xfafafa, iris: 0xd0208a, brow: 0x1a1a24, browTilt: -0.15 },
  chill: { pants: 0x3f6aa8, shoe: 0xd9d4c8, iris: 0x2a1a0c, brow: null, lid: 0.04 },
};

export class Character {
  static map = null;
  static fx = null;
  static cam = null;

  // 상점 꾸미기. 머리 위(모자)와 얼굴 앞(얼굴)에 붙인다
  addLook(look) {
    const top = { cone: 1.02, toilet: 0.62, tung: 0.6, cat: 0.5 }[this.skinId] ?? 0.52;
    const hat = new THREE.Group();
    hat.position.y = top;
    switch (look.hat) {
      case 'party': {
        const tex = stripeTexture('#ff2a7a', '#ffd21f');
        hat.add(mesh(new THREE.ConeGeometry(0.24, 0.62, 18), toon(0xffffff, { map: tex }), 0, 0.3, 0));
        hat.add(mesh(new THREE.SphereGeometry(0.08, 10, 8), toon(0x19e3e8), 0, 0.64, 0));
        hat.rotation.z = -0.18;
        break;
      }
      case 'bucket': {
        const m = toon(0x7d9a4a);
        hat.add(mesh(new THREE.CylinderGeometry(0.4, 0.46, 0.26, 20), m, 0, 0.07, 0));
        hat.add(mesh(new THREE.CylinderGeometry(0.66, 0.7, 0.04, 22), m, 0, -0.06, 0));
        hat.position.y -= 0.08;
        break;
      }
      case 'tophat': {
        const m = toon(0x16131c);
        hat.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.56, 20), m, 0, 0.26, 0));
        hat.add(mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.04, 22), m, 0, 0, 0));
        hat.add(mesh(new THREE.CylinderGeometry(0.305, 0.305, 0.1, 20), toon(0xff2a7a), 0, 0.08, 0));
        hat.rotation.z = 0.12;
        break;
      }
      case 'propeller': {
        const cols = [0xff2a7a, 0xffd21f, 0x2f6df6, 0x4dff6a];
        for (let i = 0; i < 4; i++) {
          hat.add(mesh(new THREE.SphereGeometry(0.43, 16, 8, (i * Math.PI) / 2, Math.PI / 2, 0, Math.PI / 2), toon(cols[i]), 0, -0.13, 0));
        }
        hat.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.16, 6), toon(0x333333), 0, 0.36, 0));
        const prop = new THREE.Group();
        prop.position.y = 0.45;
        for (const s of [-1, 1]) prop.add(mesh(new THREE.BoxGeometry(0.5, 0.02, 0.1), toon(0xff2d2d), s * 0.25, 0, 0));
        hat.add(prop);
        this.propeller = prop;
        break;
      }
      case 'horns': {
        const m = toon(0xd8202c);
        for (const s of [-1, 1]) {
          const h = mesh(new THREE.ConeGeometry(0.09, 0.34, 10), m, s * 0.26, 0.04, -0.06);
          h.rotation.z = -s * 0.45;
          hat.add(h);
        }
        break;
      }
      case 'halo': {
        hat.add(skipOutline(mesh(new THREE.TorusGeometry(0.3, 0.045, 8, 28).rotateX(Math.PI / 2), hdr(0xffe36b, 2.2), 0, 0.3, 0)));
        this.haloRing = hat;
        break;
      }
      default: break;
    }
    if (hat.children.length) { this.head.add(hat); this.hat = hat; }
    const face = new THREE.Group();
    switch (look.face) {
      case 'stache': {
        const m = toon(0x2a1608);
        for (const s of [-1, 1]) {
          const half = mesh(new THREE.CapsuleGeometry(0.06, 0.2, 4, 8), m, s * 0.13, -0.15, -0.5);
          half.rotation.z = Math.PI / 2 + s * 0.35;
          face.add(half);
        }
        break;
      }
      case 'clown':
        face.add(mesh(new THREE.SphereGeometry(0.12, 14, 10), toon(0xff2020), 0, -0.04, -0.58));
        break;
      case 'monocle': {
        face.add(skipOutline(mesh(new THREE.TorusGeometry(0.21, 0.03, 8, 24), hdr(0xffc800, 1.3), 0.2, 0.13, -0.78)));
        face.add(skipOutline(mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4), hdr(0xffc800, 1.3), 0.4, -0.14, -0.74)));
        break;
      }
      case 'bandage': {
        const m = toon(0xf2c79a);
        const a = mesh(new THREE.BoxGeometry(0.26, 0.08, 0.02), m, -0.2, 0.4, -0.45);
        a.rotation.set(-0.3, 0, 0.6);
        const b = mesh(new THREE.BoxGeometry(0.26, 0.08, 0.02), m, -0.2, 0.4, -0.45);
        b.rotation.set(-0.3, 0, -0.6);
        face.add(a, b);
        break;
      }
      default: break;
    }
    if (face.children.length) this.head.add(face);
  }

  constructor(skinId, name, look = {}) {
    this.skinId = skinId;
    this.nameText = name;
    this.look = look ?? {};
    this.root = new THREE.Group();
    this.visual = new THREE.Group();
    this.root.add(this.visual);
    this.build(skinId);
    this.addLook(this.look);
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
    this.lastYaw = 0;
    this.speed = 0;
    this.pitch = 0;
    this.emote = 0;
    this.ultra = false;
    this.ultraKind = null;
    this.bigHead = false;
    this.headScale = 1;
    // 모션 상태
    this.vy = 0;
    this.air = 0;
    this.leanF = 0;
    this.leanS = 0;
    this.twist = 0;
    this.squash = 0;
    this.squashV = 0;
    this.kick = 0;
    this.slapT = 0;
    this.flashT = 0;
    this.spawnT = 1;
    this.blinkT = 2 + Math.random() * 3;
    this.blink = 0;
    this.mouthOpen = 0;
    this.deadSpin = 1;
    this.lobby = false;
    this.foreZ = [0, 0];
    this.tapPrev = 0;
    this.poseIdx = 0;
    this.xray = false;
    this.outlineFar = false;
    this.setWeapon('fart');
  }

  build(skinId) {
    const def = SKINS[skinId] ?? SKINS.minsu;
    const out = this.outfit = OUTFIT[skinId] ?? OUTFIT.minsu;
    const skin = lambert(def.skin);
    const shirt = lambert(def.shirt);
    const pants = lambert(out.pants);
    const shoe = lambert(out.shoe);
    this.mats = [skin, shirt, pants, shoe];

    const v = this.visual;
    this.torso = mesh(GEO.torso, shirt, 0, 1.0, 0);
    v.add(this.torso);
    this.hips = mesh(GEO.hips, pants, 0, 0.66, 0);
    v.add(this.hips);

    const makeLeg = (side) => {
      const thigh = mesh(GEO.thigh, pants, side * 0.16, 0.64, 0);
      const shin = mesh(GEO.shin, pants, 0, -0.3, 0);
      const foot = mesh(GEO.shoe, shoe, 0, -0.26, -0.06);
      const sole = skipOutline(mesh(GEO.sole, basic(0x111118), 0, -0.07, 0));
      foot.add(sole);
      shin.add(foot);
      thigh.add(shin);
      thigh.userData.shin = shin;
      thigh.userData.foot = foot;
      v.add(thigh);
      return thigh;
    };
    this.legL = makeLeg(-1);
    this.legR = makeLeg(1);

    const makeArm = (side) => {
      const upper = mesh(GEO.upperArm, shirt, side * 0.41, 1.26, 0);
      const fore = mesh(GEO.foreArm, skin, 0, -0.29, 0);
      const hand = mesh(GEO.hand, skin, 0, -0.27, 0);
      fore.add(hand);
      upper.add(fore);
      upper.userData.fore = fore;
      upper.userData.hand = hand;
      v.add(upper);
      return upper;
    };
    this.armL = makeArm(-1);
    this.armR = makeArm(1);

    this.gun = new THREE.Group();
    this.gun.position.set(0, -0.3, 0.02);
    this.gun.rotation.x = -Math.PI / 2;
    this.armR.userData.fore.add(this.gun);

    this.muzzle = new THREE.Sprite(new THREE.SpriteMaterial({ map: flashTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0, fog: false }));
    this.muzzle.material.color.setRGB(2.6, 2.2, 1.2);
    this.muzzle.position.set(0, 0, -0.6);
    this.muzzle.scale.setScalar(0.9);
    this.gun.parent.add(this.muzzle);
    this.muzzle.position.set(0, -1.0, 0.02);

    // 머리
    this.head = new THREE.Group();
    this.head.position.y = 1.66;
    v.add(this.head);
    this.head.add(mesh(GEO.head, skin));

    // 눈깔
    const lidMat = lambert(def.skin);
    this.mats.push(lidMat);
    this.eyes = [-0.21, 0.21].map((x) => {
      const eye = new THREE.Group();
      const base = new THREE.Vector3(x, 0.12, -0.42);
      eye.position.copy(base);
      const white = skipOutline(mesh(GEO.eye, basic(0xffffff)));
      const iris = skipOutline(mesh(GEO.iris, basic(out.iris), 0, 0, -0.105));
      iris.scale.z = 0.7;
      const pupil = skipOutline(mesh(GEO.pupil, basic(0x000000), 0, 0, -0.17));
      pupil.scale.z = 0.6;
      const shine = skipOutline(mesh(GEO.shine, basic(0xffffff), 0.045, 0.05, -0.2));
      const lid = mesh(GEO.lid, lidMat);
      lid.rotation.x = 0.9;
      eye.add(white, iris, pupil, shine, lid);
      const stalk = skipOutline(mesh(GEO.stalk, lambert(0xff4d6d), x, 0.12, -0.3));
      stalk.scale.z = 0.01;
      this.head.add(eye, stalk);
      return { group: eye, pupil, iris, shine, stalk, base, white, lid };
    });

    // 눈썹
    this.brows = [];
    if (out.brow !== null && out.brow !== undefined) {
      const m = lambert(out.brow);
      for (const s of [-1, 1]) {
        const b = mesh(GEO.brow, m, s * 0.22, 0.36, -0.42);
        b.rotation.z = s * (out.browTilt ?? 0);
        b.userData = { y: 0.36, side: s };
        this.head.add(b);
        this.brows.push(b);
      }
    }

    // 입: 이빨과 혀가 달렸다
    this.mouth = skipOutline(mesh(new THREE.SphereGeometry(0.17, 14, 10), basic(0x3a0010), 0, -0.2, -0.44));
    this.mouthBase = [1.3, 0.35, 0.5];
    this.mouth.scale.set(...this.mouthBase);
    const teeth = skipOutline(mesh(new THREE.BoxGeometry(0.22, 0.05, 0.05), basic(0xffffff), 0, 0.09, -0.14));
    const tongue = skipOutline(mesh(new THREE.SphereGeometry(0.09, 10, 8), basic(0xff6a8a), 0, -0.09, -0.11));
    tongue.scale.set(1.2, 0.5, 1);
    this.mouth.add(teeth, tongue);
    this.head.add(this.mouth);

    // 코와 귀
    if (!['cat', 'hero', 'chill', 'cone', 'tung'].includes(skinId)) {
      this.head.add(mesh(GEO.nose, skin, 0, -0.03, -0.53));
      for (const s of [-1, 1]) if (skinId !== 'streamer') this.head.add(mesh(GEO.ear, skin, s * 0.52, 0.02, 0));
    }

    // 선글라스 (아우라 파밍 중에만)
    this.shades = new THREE.Group();
    const dark = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const lens = new THREE.BoxGeometry(0.32, 0.17, 0.04);
    const glint = hdr(0xffffff, 1.5);
    this.shades.add(
      skipOutline(mesh(lens, dark, -0.2, 0.14, -0.6)),
      skipOutline(mesh(lens, dark, 0.2, 0.14, -0.6)),
      skipOutline(mesh(new THREE.BoxGeometry(0.74, 0.035, 0.04), dark, 0, 0.21, -0.6)),
      skipOutline(mesh(new THREE.BoxGeometry(0.11, 0.022, 0.01), glint, -0.25, 0.18, -0.625)),
      skipOutline(mesh(new THREE.BoxGeometry(0.11, 0.022, 0.01), glint, 0.15, 0.18, -0.625)),
    );
    this.shades.visible = false;
    this.head.add(this.shades);

    this.buildSkin(skinId, def, skin, shirt, pants, shoe);

    // 아우라 후광
    this.glow = skipOutline(new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0,
    })));
    this.glow.scale.set(5, 5, 1);
    this.glow.position.y = 1.2;
    v.add(this.glow);

    // 왕관 (울트라)
    this.crown = new THREE.Group();
    const gold = hdr(0xffc800, 1.25);
    if (skinId === 'sigma') {
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      this.crown.add(mesh(new THREE.ConeGeometry(0.1, 0.32, 5), gold, Math.cos(a) * 0.3, 0.14, Math.sin(a) * 0.3));
      this.crown.add(skipOutline(mesh(new THREE.SphereGeometry(0.035, 6, 5), hdr(i % 2 ? 0xff2060 : 0x30a0ff, 2), Math.cos(a) * 0.3, 0.32, Math.sin(a) * 0.3)));
    }
    this.crown.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.1, 18), gold));
    }
    this.crown.position.y = 0.62;
    this.crown.visible = false;
    this.head.add(this.crown);

    // 변기 소용돌이
    if (skinId === 'toilet') {
    const spiral = document.createElement('canvas');
    spiral.width = spiral.height = 256;
    const sx = spiral.getContext('2d');
    sx.translate(128, 128);
    for (let arm = 0; arm < 3; arm++) {
      sx.rotate((Math.PI * 2) / 3);
      sx.beginPath();
      for (let i = 0; i < 60; i++) {
        const k = i / 60, a = k * 6, r = 14 + k * 112;
        const x = Math.cos(a) * r, y = Math.sin(a) * r;
        if (i) sx.lineTo(x, y); else sx.moveTo(x, y);
      }
      sx.strokeStyle = 'rgba(140,225,255,.9)';
      sx.lineWidth = 15;
      sx.lineCap = 'round';
      sx.stroke();
    }
    const spiralTex = new THREE.CanvasTexture(spiral);
    this.whirl = skipOutline(mesh(new THREE.CircleGeometry(4.2, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: spiralTex, color: new THREE.Color(0.7, 1.05, 1.5), transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), 0, 0.14, 0));
    this.whirl2 = skipOutline(mesh(new THREE.TorusGeometry(4.4, 0.08, 6, 44).rotateX(Math.PI / 2), hdr(0x8fdcff, 2, { transparent: true, opacity: 0.6, depthWrite: false }), 0, 0.2, 0));
    this.whirl.visible = this.whirl2.visible = false;
    this.root.add(this.whirl, this.whirl2);
    }

    // 칠가이 방어막
    if (skinId === 'chill') {
      const bubbleMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        uniforms: { t: { value: 0 } },
        vertexShader: 'varying vec3 vN, vV; void main(){ vec4 p = modelViewMatrix * vec4(position, 1.0); vN = normalMatrix * normal; vV = -p.xyz; gl_Position = projectionMatrix * p; }',
        fragmentShader: 'uniform float t; varying vec3 vN, vV; void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4); gl_FragColor = vec4(vec3(0.35, 0.75, 1.5) * (f * 1.3 + 0.02), 1.0); }',
      });
      this.bubble = skipOutline(mesh(new THREE.SphereGeometry(1.7, 28, 20), bubbleMat, 0, 1.2, 0));
      this.bubble.visible = false;
      this.root.add(this.bubble);
    }

    // 발밑 그림자
    this.blob = skipOutline(mesh(new THREE.CircleGeometry(0.72, 20).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: softTexture(), color: 0x000000, transparent: true, opacity: 0.55, depthWrite: false }), 0, 0.03, 0));
    this.root.add(this.blob);

    // 그림자 + 외곽선. 멀면 외곽선은 그리지 않는다.
    this.outlines = [];
    this.root.traverse((m) => {
      if (!m.isMesh || m.userData.noOutline || !m.geometry || m === this.blob) return;
      m.castShadow = true;
      const o = new THREE.Mesh(m.geometry, OUTLINE);
      o.userData.noOutline = true;
      m.add(o);
      this.outlines.push(o);
    });
    // 민수 각성 때 벽 너머로 보이는 표시
    this.mark = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTexture(), color: new THREE.Color(3, 0.25, 0.25), transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    this.mark.scale.set(2.2, 3.2, 1);
    this.mark.position.y = 1.2;
    this.mark.renderOrder = 20;
    this.mark.visible = false;
    this.root.add(this.mark);
  }

  buildSkin(skinId, def, skin, shirt, pants, shoe) {
    const v = this.visual;
    const collar = (mat = shirt) => v.add(mesh(new THREE.TorusGeometry(0.2, 0.05, 8, 18).rotateX(Math.PI / 2), mat, 0, 1.36, 0));
    if (skinId === 'minsu') {
      const hair = lambert(0x2b1a10);
      this.head.add(mesh(new THREE.SphereGeometry(0.535, 18, 10, 0, Math.PI * 2, 0, 0.95), hair, 0, 0.03, 0.02));
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const spike = mesh(new THREE.ConeGeometry(0.1, 0.26, 6), hair, Math.cos(a) * 0.25, 0.52, Math.sin(a) * 0.25);
        spike.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
        this.head.add(spike);
      }
      collar();
      const n = decal('67', 0.34, '#ffe600');
      n.position.set(0, 1.04, -0.255);
      n.rotation.y = Math.PI;
      v.add(n);
    } else if (skinId === 'sigma') {
      const jaw = mesh(new THREE.SphereGeometry(0.34, 14, 10), skin, 0, -0.4, -0.12);
      jaw.scale.set(1, 0.7, 1);
      this.head.add(jaw);
      const hair = lambert(0x0d0d10);
      this.head.add(mesh(new THREE.SphereGeometry(0.54, 18, 10, 0, Math.PI * 2, 0, 1.15), hair, 0, 0.04, 0.02));
      const swoop = mesh(new THREE.SphereGeometry(0.28, 12, 8), hair, 0.14, 0.44, -0.26);
      swoop.scale.set(1.5, 0.5, 0.9);
      this.head.add(swoop);
      // 정장 앞판: 흰 셔츠, 빨간 넥타이
      const front = mesh(new THREE.ConeGeometry(0.16, 0.55, 3).rotateX(Math.PI), lambert(0xf2f2f2), 0, 1.15, -0.235);
      front.scale.z = 0.14;
      v.add(front);
      const tie = mesh(new THREE.BoxGeometry(0.075, 0.36, 0.02), lambert(0xc01020), 0, 1.13, -0.27);
      v.add(tie);
    } else if (skinId === 'cat') {
      const ear = new THREE.ConeGeometry(0.18, 0.36, 4);
      const inner = new THREE.ConeGeometry(0.1, 0.22, 4);
      const pink = lambert(0xffa5c0);
      for (const s of [-1, 1]) {
        const e = mesh(ear, skin, s * 0.32, 0.5, 0);
        e.rotation.z = -s * 0.18;
        this.head.add(e);
        this.head.add(skipOutline(mesh(inner, pink, s * 0.32, 0.47, -0.09)));
        for (const dy of [-0.02, 0.04]) {
          const w = skipOutline(mesh(new THREE.BoxGeometry(0.3, 0.012, 0.012), basic(0x222222), s * 0.48, -0.14 + dy, -0.36));
          w.rotation.z = s * dy * 3;
          this.head.add(w);
        }
      }
      const stripe = lambert(0xc8691a);
      for (const dx of [-0.12, 0, 0.12]) this.head.add(skipOutline(mesh(new THREE.BoxGeometry(0.05, 0.18, 0.05), stripe, dx, 0.42 + (dx === 0 ? 0.03 : 0), -0.27)));
      this.head.add(mesh(new THREE.SphereGeometry(0.055, 8, 6), pink, 0, -0.08, -0.52));
      this.mouth.position.y = -0.24;
      this.tail = [];
      let parent = v;
      let px = 0, py = 0.78, pz = 0.28;
      for (let i = 0; i < 4; i++) {
        const seg = mesh(new THREE.CapsuleGeometry(0.075 - i * 0.008, 0.16, 3, 8).rotateX(Math.PI / 2).translate(0, 0, 0.1), i === 3 ? stripe : skin, px, py, pz);
        parent.add(seg);
        this.tail.push(seg);
        parent = seg;
        px = 0; py = 0; pz = 0.22;
      }
    } else if (skinId === 'cone') {
      const orange = lambert(0xff6a00);
      const white = lambert(0xffffff);
      this.head.add(mesh(new THREE.ConeGeometry(0.42, 0.88, 20), orange, 0, 0.77, 0));
      this.head.add(skipOutline(mesh(new THREE.CylinderGeometry(0.255, 0.325, 0.14, 20), white, 0, 0.74, 0)));
      this.head.add(skipOutline(mesh(new THREE.CylinderGeometry(0.145, 0.2, 0.11, 20), white, 0, 0.98, 0)));
      this.head.add(mesh(new THREE.BoxGeometry(0.98, 0.07, 0.98), orange, 0, 0.48, 0));
      const n = decal('☢', 0.42, '#ffe600');
      n.position.set(0, 1.04, -0.255);
      n.rotation.y = Math.PI;
      v.add(n);
      // 후드 끈
      const hood = mesh(new THREE.TorusGeometry(0.28, 0.09, 8, 20).rotateX(Math.PI / 2), shirt, 0, 1.36, 0.02);
      v.add(hood);
    } else if (skinId === 'toilet') {
      const porcelain = lambert(0xf8fbff);
      for (const m of [this.torso, this.hips, this.legL, this.legR]) m.visible = false;
      const profile = [[0.26, 0], [0.34, 0.02], [0.3, 0.16], [0.4, 0.4], [0.56, 0.66], [0.58, 0.8]].map(([x, y]) => new THREE.Vector2(x, y));
      v.add(mesh(new THREE.LatheGeometry(profile, 20), new THREE.MeshToonMaterial({ color: 0xf8fbff, gradientMap: gradient, side: THREE.DoubleSide }), 0, 0, 0));
      v.add(mesh(new THREE.TorusGeometry(0.5, 0.09, 10, 26).rotateX(Math.PI / 2), porcelain, 0, 0.84, 0));
      v.add(skipOutline(mesh(new THREE.CircleGeometry(0.48, 22).rotateX(-Math.PI / 2), hdr(0x41b6ff, 1), 0, 0.72, 0)));
      v.add(mesh(new THREE.BoxGeometry(0.9, 1.0, 0.3), porcelain, 0, 1.08, 0.55));
      v.add(mesh(new THREE.BoxGeometry(0.98, 0.09, 0.38), porcelain, 0, 1.62, 0.55));
      v.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 8).rotateZ(Math.PI / 2), lambert(0xb8c4d0), 0.36, 1.4, 0.38));
      this.head.position.y = 1.32;
      this.armL.position.y = 1.02;
      this.armR.position.y = 1.02;
    } else if (skinId === 'streamer') {
      const hair = lambert(0x15100c);
      this.head.add(mesh(new THREE.SphereGeometry(0.538, 18, 10, 0, Math.PI * 2, 0, 1.0), hair, 0, 0.02, 0.02));
      const black = lambert(0x18181c);
      this.head.add(mesh(new THREE.TorusGeometry(0.54, 0.05, 8, 26, Math.PI).rotateY(Math.PI / 2), black, 0, 0.1, 0));
      for (const s of [-1, 1]) {
        this.head.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 18).rotateZ(Math.PI / 2), lambert(0xd81e2c), s * 0.53, 0.08, 0));
        this.head.add(skipOutline(mesh(new THREE.TorusGeometry(0.12, 0.018, 6, 18).rotateY(Math.PI / 2), hdr(0xff2233, 2.4), s * 0.6, 0.08, 0)));
      }
      this.head.add(mesh(new THREE.BoxGeometry(0.03, 0.03, 0.36), black, -0.5, -0.1, -0.2));
      this.head.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), black, -0.46, -0.13, -0.38));
      this.head.add(skipOutline(mesh(new THREE.SphereGeometry(0.02, 6, 5), hdr(0xff2020, 4), -0.45, -0.09, -0.42)));
      this.mouthBase = [1.5, 0.9, 0.55];
      this.mouth.scale.set(...this.mouthBase);
      const n = decal('7');
      n.position.set(0, 1.04, -0.255);
      n.rotation.y = Math.PI;
      v.add(n);
      const n2 = decal('7', 0.44);
      n2.position.set(0, 1.04, 0.255);
      v.add(n2);
      collar(lambert(0xffffff));
    } else if (skinId === 'hero') {
      const blue = lambert(0x1c1c22);
      this.mats.push(blue);
      this.head.add(mesh(new THREE.SphereGeometry(0.538, 20, 12, 0, Math.PI * 2, 0, 1.75), lambert(0xe8342c), 0, 0.01, 0));
      const dark = new THREE.MeshBasicMaterial({ color: 0x101014 });
      for (const s of [-1, 1]) {
        const lens = mesh(new THREE.SphereGeometry(0.235, 16, 10), dark, s * 0.21, 0.13, -0.33);
        lens.scale.set(1.15, 0.85, 0.55);
        this.head.add(lens);
        this.head.add(skipOutline(mesh(new THREE.BoxGeometry(0.1, 0.03, 0.01), hdr(0xffffff, 1.5), s * 0.21 - 0.05, 0.22, -0.455)));
      }
      this.armL.material = blue;
      this.armR.material = blue;
      for (const a of [this.armL, this.armR]) { a.userData.fore.material = blue; a.userData.hand.material = blue; }
      const chest = decal('M', 0.44, '#1c1c22');
      chest.position.set(0, 1.08, -0.255);
      chest.rotation.y = Math.PI;
      v.add(chest);
      for (const s of [-1, 1]) {
        const strap = mesh(new THREE.BoxGeometry(0.17, 0.5, 0.05), blue, s * 0.25, 1.02, -0.2);
        strap.rotation.z = s * -0.1;
        v.add(strap);
      }
    } else if (skinId === 'tung') {
      const wood = new THREE.MeshToonMaterial({ map: woodTexture(), gradientMap: gradient });
      withRim(wood);
      this.mats.push(wood);
      this.torso.geometry = new THREE.CylinderGeometry(0.42, 0.44, 0.92, 16);
      this.torso.material = wood;
      this.head.children[0].material = wood;
      const ring = lambert(0x5c3a1c);
      v.add(mesh(new THREE.CylinderGeometry(0.455, 0.455, 0.05, 16), ring, 0, 0.76, 0));
      v.add(mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.05, 16), ring, 0, 1.2, 0));
      this.head.add(mesh(new THREE.CylinderGeometry(0.42, 0.53, 0.14, 16), ring, 0, 0.47, 0));
      this.head.add(mesh(new THREE.CircleGeometry(0.42, 16).rotateX(-Math.PI / 2), wood, 0, 0.541, 0));
      for (const a of [this.armL, this.armR]) { a.material = wood; a.userData.fore.material = wood; a.userData.hand.material = wood; }
      const bat = new THREE.Group();
      bat.add(mesh(new THREE.CylinderGeometry(0.13, 0.05, 1.15, 12), wood, 0, -0.5, 0));
      bat.add(mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.05, 12), ring, 0, -0.84, 0));
      bat.add(mesh(new THREE.SphereGeometry(0.05, 8, 6), ring, 0, 0.09, 0));
      bat.rotation.x = 0.2;
      this.bat = bat;
      this.armL.userData.fore.add(bat);
      bat.position.set(0, -0.3, -0.06);
    } else if (skinId === 'rizz') {
      const hair = lambert(0x1a1a24);
      this.head.add(mesh(new THREE.SphereGeometry(0.538, 18, 10, 0, Math.PI * 2, 0, 0.95), hair, 0, 0.03, 0.02));
      const quiff = mesh(new THREE.SphereGeometry(0.3, 14, 10), hair, 0, 0.46, -0.24);
      quiff.scale.set(1.25, 0.8, 1.25);
      this.head.add(quiff);
      const white = lambert(0xfafafa);
      const front = mesh(new THREE.ConeGeometry(0.17, 0.5, 3).rotateX(Math.PI), white, 0, 1.18, -0.235);
      front.scale.z = 0.14;
      v.add(front);
      // 금목걸이
      v.add(skipOutline(mesh(new THREE.TorusGeometry(0.27, 0.03, 8, 24).rotateX(1.25), hdr(0xffc800, 1.3), 0, 1.22, -0.08)));
      v.add(skipOutline(mesh(new THREE.OctahedronGeometry(0.06), hdr(0xffe080, 2.2), 0, 0.97, -0.25)));
      // 반짝 치아
      this.mouth.children[0].material = hdr(0xffffff, 1.5);
    } else if (skinId === 'chill') {
      const brown = lambert(0x7d5a3c);
      for (const s of [-1, 1]) {
        const ear = mesh(new THREE.SphereGeometry(0.2, 12, 10), brown, s * 0.56, -0.08, 0.02);
        ear.scale.set(0.55, 1.55, 0.9);
        ear.rotation.z = s * 0.14;
        this.head.add(ear);
      }
      const snout = mesh(new THREE.SphereGeometry(0.27, 16, 10), lambert(0xe6d2b0), 0, -0.14, -0.42);
      snout.scale.set(1.1, 0.75, 0.85);
      this.head.add(snout);
      this.head.add(skipOutline(mesh(new THREE.SphereGeometry(0.07, 10, 8), basic(0x18100a), 0, -0.05, -0.65)));
      this.mouth.position.set(0.05, -0.27, -0.6);
      this.mouthBase = [0.8, 0.15, 0.4];
      this.mouth.scale.set(...this.mouthBase);
      // 스웨터 목과 시보리
      const rib = lambert(0x74787f);
      v.add(mesh(new THREE.TorusGeometry(0.22, 0.075, 8, 20).rotateX(Math.PI / 2), rib, 0, 1.36, 0));
      v.add(mesh(new THREE.CylinderGeometry(0.34, 0.33, 0.1, 18), rib, 0, 0.72, 0));
    }
    // 스니커즈처럼 앞코를 얹는다
    if (skinId !== 'toilet' && skinId !== 'tung') {
      for (const l of [this.legL, this.legR]) {
        const cap = skipOutline(mesh(new THREE.SphereGeometry(0.075, 8, 6), basic(0xffffff), 0, 0.01, -0.13));
        cap.scale.set(1.1, 0.8, 1);
        l.userData.foot.add(cap);
      }
    }
  }

  setWeapon(id) {
    if (this.weaponId === id) return;
    this.weaponId = id;
    this.gun.clear();
    const add = (geo, mat, x, y, z) => {
      const m = mesh(geo, mat, x, y, z);
      m.castShadow = true;
      this.gun.add(m);
      if (!mat.isMeshBasicMaterial) { const o = new THREE.Mesh(geo, OUTLINE); m.add(o); }
      return m;
    };
    if (id === 'fart') {
      add(new THREE.CapsuleGeometry(0.1, 0.32, 4, 10).rotateX(Math.PI / 2), toon(0x6cc644));
      add(new THREE.ConeGeometry(0.16, 0.26, 12).rotateX(-Math.PI / 2), toon(0x3a7d1c), 0, 0, -0.36);
      add(new THREE.SphereGeometry(0.07, 10, 8), toon(0xff66b2), 0, 0.11, 0.05).scale.set(1.3, 0.7, 1.4);
      add(new THREE.TorusGeometry(0.106, 0.02, 6, 14), hdr(0xb5ff2a, 2), 0, 0, -0.08);
    } else if (id === 'six7') {
      add(new THREE.BoxGeometry(0.15, 0.18, 0.28), toon(0xffd23f));
      add(new THREE.CylinderGeometry(0.06, 0.06, 0.65, 10).rotateX(Math.PI / 2), toon(0xaa8800), 0, 0.03, -0.42);
      add(new THREE.CylinderGeometry(0.09, 0.09, 0.14, 10).rotateX(Math.PI / 2), toon(0x777777), 0, 0.01, -0.1);
      add(new THREE.BoxGeometry(0.02, 0.05, 0.02), hdr(0xff2060, 3), 0, 0.12, -0.7);
    } else {
      add(new THREE.BoxGeometry(0.17, 0.17, 0.42), toon(0x333340));
      add(new THREE.ConeGeometry(0.3, 0.42, 16, 1, true).rotateX(Math.PI / 2), toon(0xff3d81, { side: THREE.DoubleSide }), 0, 0, -0.42);
      add(new THREE.TorusGeometry(0.29, 0.022, 6, 18), hdr(0xff90c0, 2), 0, 0, -0.62);
    }
  }

  pop(strength = 1) {
    this.eyeVel += 9 * strength;
    this.flash = 0.16;
    this.squashV -= 2.6 * strength;
    this.mouthOpen = 1;
    for (const m of this.mats) m.emissive?.setHex(0xff2020);
  }

  fire(w = 'fart') {
    this.kick = Math.min(1.2, this.kick + (w === 'fart' ? 0.35 : 1));
    this.flashT = 0.06;
    this.muzzle.material.color.setRGB(...(w === 'fart' ? [1.2, 2.6, 0.5] : w === 'boom' ? [3, 0.9, 1.8] : [2.8, 2.2, 0.8]));
    this.muzzle.material.rotation = Math.random() * 6.28;
  }

  slap() { this.slapT = 0.28; }

  die() {
    this.deadT = 0;
    this.deadSpin = Math.random() < 0.5 ? -1 : 1;
    this.eyes.forEach((e) => { e.group.visible = false; e.stalk.visible = false; });
    this.tag && (this.tag.visible = false);
    this.muzzle.material.opacity = 0;
    if (this.whirl) this.whirl.visible = this.whirl2.visible = false;
    this.mark.visible = false;
    if (this.bubble) this.bubble.visible = false;
    this.poofed = false;
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
    this.spawnT = 0;
    this.squash = this.squashV = 0;
    this.eyes.forEach((e) => { e.group.visible = true; e.stalk.visible = true; });
    this.tag && (this.tag.visible = true);
  }

  eyeWorldPositions() {
    return this.eyes.map((e) => e.group.getWorldPosition(new THREE.Vector3()));
  }

  setFore(bendL, bendR) {
    this.armL.userData.fore.rotation.x = bendL;
    this.armR.userData.fore.rotation.x = bendR;
    this.armL.userData.fore.rotation.z = this.foreZ[0];
    this.armR.userData.fore.rotation.z = this.foreZ[1];
  }

  // 대기실에서 캐릭터마다 다른 짓을 한다. 돌려주는 값은 팔꿈치 굽힘.
  lobbyPose(t) {
    const A = this.armL, B = this.armR, V = this.visual, H = this.head;
    V.rotation.x = 0;
    V.rotation.z = 0;
    H.rotation.y = 0;
    H.rotation.x = 0;
    switch (this.skinId) {
      case 'sigma': {
        // 근육, 팔짱, 허리 손을 번갈아 찍는다
        const idx = Math.floor(t / 2.3) % 3;
        if (idx !== this.poseIdx) { this.poseIdx = idx; this.squashV -= 2.2; }
        H.rotation.x = 0.16;
        H.rotation.y = Math.sin(t * 0.8) * 0.12;
        if (idx === 0) {
          A.rotation.set(0, 0, -1.5);
          B.rotation.set(0, 0, 1.5);
          const flex = Math.sin(t * 7) * 0.12;
          this.foreZ = [-2.05 + flex, 2.05 - flex];
        } else if (idx === 1) {
          A.rotation.set(-0.95, 0, 0.1);
          B.rotation.set(-1.15, 0, -0.1);
          this.foreZ = [1.7, -1.7];
        } else {
          A.rotation.set(0, 0, -0.72);
          B.rotation.set(0, 0, 0.72);
          this.foreZ = [1.65, -1.65];
          H.rotation.y = 0.5;
        }
        return [0, 0];
      }
      case 'tung': {
        // 빠따로 손바닥을 탁탁
        const s = Math.abs(Math.sin(t * 5.2));
        A.rotation.set(-1.05 - s * 0.75, 0, 0.42);
        B.rotation.set(-0.85, 0, -0.32);
        this.foreZ = [0, -0.85];
        H.rotation.x = 0.12 - s * 0.14;
        V.position.y = (1 - s) * 0.02;
        V.rotation.z = Math.sin(t * 2.6) * 0.035;
        if (this.tapPrev > 0.1 && s <= 0.1) {
          this.squashV -= 0.9;
          const p = this.root.position;
          const fwd = this.root.rotation.y;
          Character.fx?.tap?.([p.x - Math.sin(fwd) * 0.55, p.y + 0.98, p.z - Math.cos(fwd) * 0.55]);
        }
        this.tapPrev = s;
        return [-0.25, -0.1];
      }
      case 'cat': {
        // 앞발 핥으면서 킹받게 쳐다보기
        const lick = Math.sin(t * 9) * 0.14;
        A.rotation.set(0.1, 0, -0.12);
        B.rotation.set(-2.05, 0, -0.42);
        H.rotation.z = 0.16;
        H.rotation.y = Math.sin(t * 0.7) * 0.2;
        V.rotation.z = Math.sin(t * 1.5) * 0.05;
        return [-0.3, -1.05 + lick];
      }
      case 'cone': {
        // 오하이오 주민: 어딘가 고장 났다
        const glitch = Math.sin(t * 1.3) > 0.82;
        H.rotation.y = glitch ? Math.PI * (Math.floor(t * 11) % 2) * 0.5 : Math.sin(t * 0.9) * 0.2;
        H.rotation.z = glitch ? 0.3 : Math.sin(t * 2.2) * 0.1;
        V.position.y = glitch ? Math.random() * 0.07 : 0;
        A.rotation.set(Math.sin(t * 2.1) * 0.5, 0, -0.14);
        B.rotation.set(Math.sin(t * 2.1 + 3) * 0.5, 0, 0.14);
        return [-0.1, -0.1];
      }
      case 'toilet': {
        // 변기에서 머리가 들락날락, 양손 휘적
        H.position.y = 1.3 + Math.max(0, Math.sin(t * 2.4)) * 0.3;
        H.rotation.y = Math.sin(t * 1.2) * 0.35;
        V.position.y = Math.abs(Math.sin(t * 2.4)) * 0.05;
        A.rotation.set(0, 0, -1.2 + Math.sin(t * 4.8) * 0.4);
        B.rotation.set(0, 0, 1.2 - Math.sin(t * 4.8) * 0.4);
        return [0, 0];
      }
      case 'streamer': {
        // 펄쩍펄쩍 뛰면서 소리 지르기
        const j = Math.abs(Math.sin(t * 5.4));
        V.position.y = j * 0.3;
        H.rotation.x = -0.28 + Math.sin(t * 10.8) * 0.16;
        H.rotation.y = Math.sin(t * 2.7) * 0.25;
        A.rotation.set(-2.8 + Math.sin(t * 10.8) * 0.25, 0, -0.35);
        B.rotation.set(-2.8 - Math.sin(t * 10.8) * 0.25, 0, 0.35);
        this.mouthOpen = Math.max(this.mouthOpen, 0.8);
        return [-0.4, -0.4];
      }
      case 'hero': {
        // 허리에 손, 살짝 떠서 내려다보기
        V.position.y = 0.3 + Math.sin(t * 1.8) * 0.07;
        H.rotation.x = 0.14;
        A.rotation.set(0, 0, -0.72);
        B.rotation.set(0, 0, 0.72);
        this.foreZ = [1.65, -1.65];
        this.legL.rotation.x = 0.04;
        this.legR.rotation.x = -0.22;
        this.legR.userData.shin.rotation.x = 0.38;
        return [0, 0];
      }
      case 'rizz': {
        // 앞머리 쓸어 넘기고 손가락 총
        const flick = Math.sin(t * 1.7);
        A.rotation.set(-2.75, 0, -0.4 - flick * 0.15);
        B.rotation.set(-1.45 + Math.max(0, Math.sin(t * 3.4)) * -0.18, 0.25, 0);
        H.rotation.z = -0.13;
        H.rotation.y = 0.25 + flick * 0.1;
        V.rotation.z = Math.sin(t * 1.7) * 0.055;
        if (Math.sin(t * 0.9) > 0.97) this.eyes[1].lid.rotation.x = -1.2;
        return [-1.7, -0.02];
      }
      case 'chill': {
        // 주머니에 손 넣고 끄덕
        A.rotation.set(0.42, 0, 0.16);
        B.rotation.set(0.42, 0, -0.16);
        H.rotation.x = Math.sin(t * 1.5) * 0.09;
        H.rotation.y = Math.sin(t * 0.55) * 0.2;
        V.rotation.z = Math.sin(t * 1.1) * 0.03;
        return [-1, -1];
      }
      default: {
        // 민수: 멍하니 머리 긁기
        const sc = Math.sin(t * 13) * 0.14;
        A.rotation.set(0.05, 0, -0.1);
        B.rotation.set(-2.5, 0, 0.34);
        H.rotation.z = -0.1 + Math.sin(t * 0.8) * 0.05;
        H.rotation.y = Math.sin(t * 0.5) * 0.15;
        return [-0.1, -1.55 + sc];
      }
    }
  }

  updateBlob() {
    if (!this.blob.visible || !Character.map) return;
    const p = this.root.position;
    const ground = Math.max(Character.map.fallY, groundAt(Character.map, p.x, p.z, p.y + 0.6));
    const h = Math.max(0, p.y - ground);
    this.blob.position.y = ground - p.y + 0.03;
    const k = Math.max(0.35, 1 - h * 0.09);
    this.blob.scale.setScalar(k);
    this.blob.material.opacity = 0.55 * k;
  }

  // 포즈 값은 정면이 +z인 기준으로 짜여 있는데 몸은 -z를 본다.
  // 그래서 관절 회전의 x, y를 뒤집어 앞뒤를 맞춘다. 매 프레임 원래 값으로 되돌린 뒤 계산하고 다시 뒤집는다
  // (어떤 관절은 일부 포즈에서만 값을 넣기 때문). 사망 연출은 원래 기준이 맞아서 뒤집지 않는다.
  mirrorJoints() {
    if (!this.joints) {
      const arms = [this.armL, this.armR];
      const legs = [this.legL, this.legR];
      this.joints = [this.visual, this.head, ...arms, ...arms.map((a) => a.userData.fore), ...legs, ...legs.map((l) => l.userData.shin), ...legs.map((l) => l.userData.foot)];
    }
    for (const o of this.joints) { o.rotation.x = -o.rotation.x; o.rotation.y = -o.rotation.y; }
  }

  update(dt) {
    if (this.mirrored) { this.mirrorJoints(); this.mirrored = false; }
    this.updatePose(dt);
    if (this.deadT < 0) { this.mirrorJoints(); this.mirrored = true; }
  }

  updatePose(dt) {
    this.time += dt;
    if (this.propeller) this.propeller.rotation.y += dt * 14;
    if (this.hat) this.hat.visible = !this.crown.visible;
    const t = this.time;

    const pos = this.root.position;
    const dx = pos.x - this.lastPos.x, dy = pos.y - this.lastPos.y, dz = pos.z - this.lastPos.z;
    const invDt = 1 / Math.max(dt, 0.001);
    const d = Math.hypot(dx, dy, dz);
    this.speed += ((d * invDt) - this.speed) * Math.min(1, dt * 10);
    const prevVy = this.vy;
    this.vy += (dy * invDt - this.vy) * Math.min(1, dt * 14);
    this.lastPos.copy(pos);

    // 몸 기준 속도: 앞뒤로 숙이고 옆으로 기운다
    const yaw = this.root.rotation.y;
    const sn = Math.sin(yaw), cs = Math.cos(yaw);
    const vf = (-dx * sn - dz * cs) * invDt;
    const vs = (dx * cs - dz * sn) * invDt;
    const safe = (v) => (Math.abs(v) > 40 ? 0 : v);
    this.leanF += (safe(vf) * 0.022 - this.leanF) * Math.min(1, dt * 9);
    this.leanS += (safe(vs) * -0.024 - this.leanS) * Math.min(1, dt * 9);
    let dYaw = yaw - this.lastYaw;
    while (dYaw > Math.PI) dYaw -= Math.PI * 2;
    while (dYaw < -Math.PI) dYaw += Math.PI * 2;
    this.lastYaw = yaw;
    this.twist += (Math.max(-0.5, Math.min(0.5, dYaw * invDt * 0.06)) - this.twist) * Math.min(1, dt * 10);

    // 착지 찌부
    const inAir = Math.abs(this.vy) > 1.6;
    this.air += ((inAir ? 1 : 0) - this.air) * Math.min(1, dt * 11);
    if (prevVy < -6 && this.vy > prevVy + 3) {
      this.squashV -= Math.min(5, -prevVy * 0.32);
      if (d < 3) Character.fx?.landDust([pos.x, pos.y, pos.z]);
    }
    this.squashV += (-210 * this.squash - 15 * this.squashV) * dt;
    this.squash += this.squashV * dt;

    // 스폰 팝인
    if (this.spawnT < 1) this.spawnT = Math.min(1, this.spawnT + dt * 3.2);
    const sp = this.spawnT;
    const spawnScale = sp >= 1 ? 1 : 1 + 2.7 * (sp - 1) ** 3 + 1.7 * (sp - 1) ** 2;

    // 사망 연출: 튕겨 나가 대자로 뻗고 납작해져서 펑
    if (this.deadT >= 0) {
      this.deadT += dt;
      const T = this.deadT;
      const k = Math.min(1, T * 2.4);
      const eased = 1 - (1 - k) ** 3;
      this.visual.rotation.x = eased * 1.57;
      this.visual.rotation.z = this.deadSpin * Math.sin(Math.min(1, T * 1.8) * Math.PI) * 0.7;
      this.visual.position.y = Math.abs(Math.sin(T * 5.5)) * Math.max(0, 1.05 - T * 1.05) + eased * 0.18;
      const flail = Math.max(0, 1 - T * 1.1);
      const s = Math.sin(T * 26) * flail;
      this.armL.rotation.set(-2.6 + s * 0.6, 0, 0.9);
      this.armR.rotation.set(-2.6 - s * 0.6, 0, -0.9);
      this.setFore(-0.3 + s, -0.3 - s);
      this.legL.rotation.set(0.5 + s * 0.8, 0, 0.35);
      this.legR.rotation.set(0.5 - s * 0.8, 0, -0.35);
      this.mouth.scale.set(this.mouthBase[0] * 1.1, 1.1, this.mouthBase[2]);
      const squish = T > 1.4 ? Math.max(0.01, 1 - (T - 1.4) * 2) : 1;
      this.visual.scale.set(1 + (1 - squish) * 0.6, squish, 1 + (1 - squish) * 0.6);
      if (T > 1.72 && !this.poofed) {
        this.poofed = true;
        Character.fx?.poof([pos.x, pos.y + 0.4, pos.z]);
      }
      if (squish <= 0.02) { this.visual.visible = false; this.blob.visible = false; }
      this.updateBlob();
      return;
    }

    // 맞은 빨간색 복귀
    if (this.flash > 0) {
      this.flash -= dt;
      if (this.flash <= 0) for (const m of this.mats) m.emissive?.setHex(0x000000);
    }

    // 깜빡임
    this.blinkT -= dt;
    if (this.blinkT <= 0) { this.blinkT = 2 + Math.random() * 4; this.blink = 1; }
    this.blink = Math.max(0, this.blink - dt * 9);

    // 눈깔 용수철
    const stiff = 60, damp = 6;
    this.eyeVel += (-stiff * this.eyePop - damp * this.eyeVel) * dt;
    this.eyePop += this.eyeVel * dt;
    const kind = this.ultra ? this.ultraKind : null;
    const pop = Math.max(kind === 'minsu' ? 0.4 : 0, this.eyePop);
    const lidOpen = this.outfit.lid ?? 0.9;
    for (const [i, e] of this.eyes.entries()) {
      e.white.material.color.setHex(kind === 'minsu' ? 0xff2a2a : 0xffffff);
      const jig = pop * 0.15 * Math.sin(t * 40 + i * 2);
      e.group.position.set(e.base.x + jig, e.base.y + jig * 0.6, e.base.z - pop * 1.2);
      e.group.scale.setScalar(1 + pop * 1.1);
      e.stalk.position.set(e.base.x * 0.9, e.base.y, -0.28);
      e.stalk.scale.set(1, 1, Math.max(0.01, pop * 1.2 + 0.05));
      const look = 0.018 * Math.sin(t * (i ? 3.1 : 2.3));
      e.iris.position.set(look, look * 0.6, -0.105);
      e.pupil.position.set(look * 1.2, look * 0.7, -0.17);
      e.shine.position.set(0.045 + look, 0.05 + look * 0.6, -0.2);
      const wide = Math.max(0, pop) * 1.5;
      e.lid.rotation.x = lidOpen + wide - this.blink * (lidOpen + 1.25);
      e.lid.rotation.z = (i ? -1 : 1) * (this.outfit.browTilt ?? 0) * 0.5;
    }
    for (const b of this.brows) {
      b.position.y = b.userData.y + Math.max(0, pop) * 0.2;
      b.rotation.z = b.userData.side * ((this.outfit.browTilt ?? 0) - Math.max(0, pop) * 0.5);
    }

    // 입
    this.mouthOpen = Math.max(0, this.mouthOpen - dt * 3.5);
    const wantMouth = kind === 'streamer' ? 0.5 + Math.abs(Math.sin(t * 12)) * 0.6 : kind === 'cat' || kind === 'hero' || this.emote === 2 ? 0.8 : this.mouthOpen;
    this.mouth.scale.set(this.mouthBase[0] * (1 + wantMouth * 0.12), this.mouthBase[1] + wantMouth * 0.7, this.mouthBase[2]);

    // 다리: 무릎이 굽는 달리기
    const moving = this.speed > 1 && this.air < 0.6;
    if (moving) this.walkT += dt * this.speed * 1.25;
    const runAmt = Math.min(1, this.speed / 9);
    const ph = this.walkT;
    const swing = moving ? Math.sin(ph) : 0;
    const swingAmt = 0.45 + runAmt * 0.5;
    const airK = this.air;
    const tuck = this.vy > 0 ? 1 : 0.55;
    this.legL.rotation.set(swing * swingAmt * (1 - airK) - airK * 0.75 * tuck, 0, 0);
    this.legR.rotation.set(-swing * swingAmt * (1 - airK) + airK * 0.35, 0, 0);
    const kneeL = moving ? Math.max(0, Math.sin(ph + 1.2)) * (0.5 + runAmt * 0.8) : 0;
    const kneeR = moving ? Math.max(0, Math.sin(ph + 1.2 + Math.PI)) * (0.5 + runAmt * 0.8) : 0;
    this.legL.userData.shin.rotation.x = kneeL * (1 - airK) + airK * 1.1 * tuck;
    this.legR.userData.shin.rotation.x = kneeR * (1 - airK) + airK * 0.6;
    this.legL.userData.foot.rotation.x = -this.legL.userData.shin.rotation.x * 0.35;
    this.legR.userData.foot.rotation.x = -this.legR.userData.shin.rotation.x * 0.35;

    // 머리 크기
    const wantHead = this.bigHead ? 2.15 : 1;
    this.headScale += (wantHead - this.headScale) * Math.min(1, dt * 6);
    this.head.scale.setScalar(this.headScale);
    const breath = Math.sin(t * 2.1);
    const headBob = moving ? Math.sin(ph * 2) * 0.03 : breath * 0.012;
    this.head.position.y = (this.skinId === 'toilet' ? 1.32 : 1.66) + headBob;
    this.head.rotation.x = -this.pitch * 0.55;
    this.head.rotation.z = -this.leanS * 0.6 + Math.max(0, this.eyePop) * Math.sin(t * 22) * 0.12;
    this.torso.scale.set(1 + breath * 0.012, 1, 1 + breath * 0.012);

    // 포즈
    this.visual.rotation.y = 0;
    this.visual.position.y = moving ? Math.abs(Math.sin(ph)) * (0.05 + runAmt * 0.05) : 0;
    const farming = this.emote === 1;
    let bendL = -0.25, bendR = -0.12;
    this.foreZ[0] = this.foreZ[1] = 0;
    if (this.lobby) {
      [bendL, bendR] = this.lobbyPose(t);
    } else if (kind === 'hero') {
      this.armR.rotation.set(-3.1, 0, 0);
      this.armL.rotation.set(0.1, 0, 0.1);
      bendL = -0.5; bendR = 0;
      this.visual.rotation.x = -1.4;
      this.visual.rotation.z = 0;
      this.head.rotation.y = 0;
      this.head.rotation.x = 0.9;
      this.legL.rotation.x = 0.15; this.legR.rotation.x = 0.55;
      this.legL.userData.shin.rotation.x = 0.1; this.legR.userData.shin.rotation.x = 0.9;
    } else if (kind === 'chill') {
      // 주머니에 손 넣고 까딱까딱
      this.armL.rotation.set(0.42, 0, 0.16);
      this.armR.rotation.set(0.42, 0, -0.16);
      bendL = bendR = -1.0;
      this.visual.rotation.x = 0;
      this.visual.rotation.z = Math.sin(t * 2.2) * 0.05;
      this.head.rotation.y = Math.sin(t * 1.1) * 0.15;
    } else if (kind === 'streamer') {
      const s = Math.sin(t * 8);
      this.armL.rotation.set(-2.7 + s * 0.3, 0, 0.5);
      this.armR.rotation.set(-2.7 - s * 0.3, 0, -0.5);
      bendL = bendR = -0.5 + s * 0.3;
      this.visual.rotation.x = 0;
      this.visual.rotation.z = s * 0.12;
      this.head.rotation.y = 0;
      this.head.rotation.x = -0.45 + s * 0.2;
    } else if (kind === 'tung') {
      const s = Math.sin(t * 9.4);
      this.armL.rotation.set(-2.1 + s * 1.1, 0, 0.2);
      this.armR.rotation.set(-1.3, 0, 0);
      bendL = -0.4 + s * 0.3;
      this.visual.rotation.x = 0;
      this.visual.rotation.z = s * 0.06;
      this.head.rotation.y = 0;
    } else if (kind === 'cat') {
      const s = Math.sin(t * 34);
      this.armL.rotation.set(-2.5 + s * 0.8, 0, 0.3);
      this.armR.rotation.set(-2.5 - s * 0.8, 0, -0.3);
      bendL = -0.6 + s * 0.5; bendR = -0.6 - s * 0.5;
      this.visual.rotation.x = -1.05 + Math.sin(t * 19) * 0.08;
      this.visual.rotation.z = Math.sin(t * 23) * 0.18;
      this.head.rotation.y = 0;
      this.head.rotation.x = 0.7;
    } else if (kind === 'toilet') {
      this.armL.rotation.set(0, 0, -1.45);
      this.armR.rotation.set(0, 0, 1.45);
      bendL = bendR = 0;
      this.visual.rotation.x = 0;
      this.visual.rotation.z = 0;
      this.head.rotation.y = 0;
    } else if (farming) {
      this.visual.rotation.x = 0;
      // 뱃머리 소년 춤: 한 손 뻗어 살랑살랑, 몸은 까딱
      this.armR.rotation.set(-2.6 + Math.sin(t * 4.3) * 0.25, 0, -0.4 + Math.sin(t * 8.6) * 0.25);
      this.armL.rotation.set(0.25, 0, 0.75 + Math.sin(t * 4.3) * 0.15);
      bendR = -0.25 + Math.sin(t * 8.6) * 0.3;
      bendL = -0.9;
      this.visual.rotation.z = Math.sin(t * 4.3) * 0.08;
      this.visual.position.y = Math.abs(Math.sin(t * 4.3)) * 0.05;
      this.head.rotation.y = Math.sin(t * 2.15) * 0.25;
    } else if (this.emote === 2) {
      // 6-7: 양손을 저울처럼 번갈아 위아래
      const s = Math.sin(t * 11);
      this.visual.rotation.x = 0;
      this.armL.rotation.set(-1.55 + s * 0.55, 0, 0.15);
      this.armR.rotation.set(-1.55 - s * 0.55, 0, -0.15);
      bendL = bendR = -0.3;
      this.visual.rotation.z = s * 0.04;
      this.head.rotation.y = 0;
    } else {
      // 총 들고 달리기
      this.visual.rotation.x = 0;
      const pump = moving ? Math.sin(ph) * 0.09 * runAmt : breath * 0.012;
      const flail = airK * (this.vy < -1 ? Math.sin(t * 16) * 0.22 : 0);
      this.armR.rotation.set(-1.45 - this.pitch * 0.9 + this.kick * -0.28 + pump + flail, 0, 0);
      this.armL.rotation.set(-1.15 - this.pitch * 0.9 - pump - airK * 0.5 + flail, 0, 0.5 + airK * 0.3);
      bendL = -0.5 - this.pitch * 0.2;
      bendR = -0.1 - this.kick * 0.3;
      this.visual.rotation.z = 0;
      this.head.rotation.y = -this.twist * 0.8;
    }
    this.setFore(bendL, bendR);

    // 싸대기
    if (this.slapT > 0) {
      this.slapT -= dt;
      const k = 1 - Math.max(0, this.slapT) / 0.28;
      const sw = Math.sin(k * Math.PI);
      this.armR.rotation.set(-1.6, -0.9 + k * 2.3, -0.3);
      this.armR.userData.fore.rotation.x = -0.2 * sw;
      this.visual.rotation.y += -0.5 + k * 0.9;
    }

    this.gun.visible = !this.lobby && this.emote === 0 && !['cat', 'minsu', 'hero', 'chill', 'streamer', 'toilet'].includes(kind);

    // 숙임과 꼬임
    if (!['hero', 'cat', 'toilet'].includes(kind)) {
      this.visual.rotation.x += this.leanF;
      this.visual.rotation.z += this.leanS;
      this.visual.rotation.y += this.twist;
    }
    if (this.skinId === 'toilet' && kind !== 'toilet' && !this.lobby) {
      // 변기는 다리 없이 통통 뛰어 다닌다
      const hop = moving ? Math.abs(Math.sin(ph * 0.75)) * 0.24 : 0;
      this.visual.position.y = hop;
      this.visual.rotation.z = moving ? Math.sin(ph * 0.75) * 0.08 : 0;
    }
    if (this.tail) {
      const wag = kind === 'cat' ? 1.6 : 0.5;
      this.tail.forEach((seg, i) => {
        seg.rotation.y = Math.sin(t * (kind === 'cat' ? 18 : 4) - i * 0.9) * 0.42 * wag;
        seg.rotation.x = i === 0 ? -0.6 : -0.32 + this.air * 0.2;
      });
    }
    if (kind === 'toilet') this.visual.rotation.y = t * 11;
    if (this.whirl) this.whirl.visible = this.whirl2.visible = kind === 'toilet';
    if (kind === 'toilet') {
      this.whirl.rotation.y = -t * 7;
      this.whirl.scale.setScalar(0.92 + Math.sin(t * 3) * 0.08);
      this.whirl2.scale.setScalar(1 + ((t * 0.9) % 1) * 0.1);
    }
    if (this.bubble) {
      this.bubble.visible = kind === 'chill';
      if (this.bubble.visible) this.bubble.scale.setScalar(1 + Math.sin(t * 3) * 0.035);
    }

    // 총구 불꽃
    this.flashT -= dt;
    this.kick = Math.max(0, this.kick - dt * 7);
    this.muzzle.material.opacity = this.flashT > 0 && this.gun.visible ? 1 : 0;

    // 아우라
    const auraOn = farming || kind === 'sigma' || kind === 'cone' || kind === 'rizz';
    this.shades.visible = auraOn;
    this.crown.visible = kind === 'sigma';
    const wantGlow = this.ultra ? 0.2 : farming ? 0.22 : 0;
    this.glow.material.opacity += (wantGlow - this.glow.material.opacity) * Math.min(1, dt * 6);
    const gs = 3.2 + Math.sin(t * 7) * 0.35;
    this.glow.scale.set(gs, gs * 1.25, 1);
    const scale = (kind === 'sigma' ? 1.3 : kind === 'cat' ? 1.15 : 1) * spawnScale;
    const sq = Math.max(-0.35, Math.min(0.35, this.squash));
    this.visual.scale.set(scale * (1 - sq * 0.6), scale * (1 + sq), scale * (1 - sq * 0.6));

    this.mark.visible = this.xray;
    if (Character.cam) {
      const c = Character.cam.position;
      const far = (c.x - pos.x) ** 2 + (c.z - pos.z) ** 2 > 900;
      if (far !== this.outlineFar) {
        this.outlineFar = far;
        for (const o of this.outlines) o.visible = !far;
      }
    }
    this.updateBlob();
  }

  setVisibleBody(v) {
    this.visual.visible = v;
    this.blob.visible = v;
    if (this.tag) this.tag.visible = v;
  }

  dispose(scene) { scene.remove(this.root); }
}
