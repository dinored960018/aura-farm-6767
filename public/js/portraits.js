// 대기실·점수판에 쓰는 진짜 캐릭터 얼굴. 처음 한 번만 찍어 둔다.
import * as THREE from 'three';
import { SKIN_IDS } from '../shared/constants.js';
import { Character } from './character.js';
import { SKIN_FACE } from './memes.js';

const urls = new Map();

export function makePortraits() {
  if (urls.size) return;
  let r = null;
  try {
    r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.setSize(200, 200);
    r.toneMapping = THREE.NeutralToneMapping;
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x665577, 2.2));
    const sun = new THREE.DirectionalLight(0xfff2e0, 1.6);
    sun.position.set(-2, 4, -5);
    scene.add(sun);
    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 30);
    for (const id of SKIN_IDS) {
      const c = new Character(id);
      c.update(0.016);
      c.gun.visible = false;
      c.blob.visible = false;
      scene.add(c.root);
      const y = id === 'toilet' ? 1.25 : 1.62;
      const tall = id === 'cone' ? 0.3 : 0;
      cam.position.set(-1.1, y + 0.3 + tall, -4.2 - tall * 2);
      cam.lookAt(0, y + tall * 0.7, 0);
      r.render(scene, cam);
      urls.set(id, r.domElement.toDataURL('image/png'));
      scene.remove(c.root);
    }
  } catch {
    urls.clear();
  } finally {
    r?.dispose();
    r?.forceContextLoss();
  }
}

// 상점 미리보기: 내 캐릭터가 그 물건을 쓴 모습. 상점을 닫으면 렌더러를 버린다
const lookUrls = new Map();
let shopR = null;
export function lookShot(skin, look) {
  const key = `${skin}:${look.hat ?? ''}:${look.face ?? ''}`;
  if (lookUrls.has(key)) return lookUrls.get(key);
  let url = '';
  try {
    if (!shopR) {
      const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      r.setSize(180, 180);
      r.toneMapping = THREE.NeutralToneMapping;
      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xffffff, 0x665577, 2.2));
      const sun = new THREE.DirectionalLight(0xfff2e0, 1.6);
      sun.position.set(-2, 4, -5);
      scene.add(sun);
      shopR = { r, scene, cam: new THREE.PerspectiveCamera(30, 1, 0.1, 30) };
    }
    const { r, scene, cam } = shopR;
    const c = new Character(skin, null, look);
    c.update(0.016);
    c.gun.visible = false;
    c.blob.visible = false;
    scene.add(c.root);
    const y = skin === 'toilet' ? 1.25 : 1.62;
    const tall = skin === 'cone' ? 0.45 : 0;
    cam.position.set(-1.2, y + 0.55 + tall, -4.6 - tall * 2);
    cam.lookAt(0, y + 0.22 + tall * 0.7, 0);
    r.render(scene, cam);
    url = r.domElement.toDataURL('image/png');
    scene.remove(c.root);
  } catch { /* 미리보기 없이 이름만 */ }
  lookUrls.set(key, url);
  return url;
}
export function closeShopRenderer() {
  shopR?.r.dispose();
  shopR?.r.forceContextLoss();
  shopR = null;
}

export function faceEl(skin, cls = 'portrait') {
  const url = urls.get(skin);
  if (url) {
    const img = document.createElement('img');
    img.className = cls;
    img.src = url;
    img.alt = '';
    img.draggable = false;
    return img;
  }
  const i = document.createElement('i');
  i.className = `${cls} emojiFace`;
  i.textContent = SKIN_FACE[skin] ?? '🙂';
  return i;
}
