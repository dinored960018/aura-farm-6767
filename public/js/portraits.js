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
    r.setSize(160, 160);
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
