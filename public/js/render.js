// 화면 마감: 블룸 + 톤매핑 + 비네트 + 맞을 때 색수차. 느린 컴퓨터는 알아서 단계를 낮춘다.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

const FINAL = {
  uniforms: {
    tDiffuse: { value: null },
    ab: { value: 0 },
    vig: { value: 0.32 },
    tint: { value: new THREE.Color(0, 0, 0) },
    exposure: { value: 1 },
    time: { value: 0 },
  },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float ab, vig, exposure, time; uniform vec3 tint;
    varying vec2 vUv;
    vec3 neutral(vec3 c) {
      const float s = 0.76; const float desat = 0.15;
      float x = min(c.r, min(c.g, c.b));
      float off = x < 0.08 ? x - 6.25 * x * x : 0.04;
      c -= off;
      float peak = max(c.r, max(c.g, c.b));
      if (peak < s) return c;
      float d = 1.0 - s;
      float np = 1.0 - d * d / (peak + d - s);
      c *= np / peak;
      float g = 1.0 - 1.0 / (desat * (peak - np) + 1.0);
      return mix(c, vec3(np), g);
    }
    vec3 srgb(vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(0.41666)) - 0.055, step(0.0031308, c)); }
    void main() {
      vec2 d = vUv - 0.5;
      float r2 = dot(d, d);
      vec3 c;
      if (ab > 0.001) {
        vec2 o = d * r2 * ab * 0.045;
        c = vec3(texture2D(tDiffuse, vUv + o).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - o).b);
      } else c = texture2D(tDiffuse, vUv).rgb;
      c = neutral(c * exposure + tint);
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, 1.12);
      c *= 1.0 - vig * smoothstep(0.12, 0.62, r2 * 1.6);
      c = srgb(clamp(c, 0.0, 1.0));
      float n = fract(sin(dot(gl_FragCoord.xy + time, vec2(12.9898, 78.233))) * 43758.5453);
      gl_FragColor = vec4(c + (n - 0.5) / 255.0, 1.0);
    }`,
};

// 총과 손은 따로 그려서 합친다. 멀티샘플 버퍼에 두 번 그리면 앞 그림이 날아가서 이렇게 한다.
class ViewmodelPass extends Pass {
  constructor(scene, camera) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.needsSwap = true;
    this.rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    this.mat = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, tVm: { value: this.rt.texture } },
      vertexShader: FINAL.vertexShader,
      fragmentShader: `uniform sampler2D tDiffuse, tVm; varying vec2 vUv;
        void main(){ vec4 v = texture2D(tVm, vUv); gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb * (1.0 - clamp(v.a, 0.0, 1.0)) + v.rgb, 1.0); }`,
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new FullScreenQuad(this.mat);
  }

  setSize(w, h) { this.rt.setSize(w, h); }

  render(renderer, writeBuffer, readBuffer) {
    const clear = renderer.getClearColor(new THREE.Color());
    const alpha = renderer.getClearAlpha();
    renderer.setRenderTarget(this.rt);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.render(this.scene, this.camera);
    renderer.setClearColor(clear, alpha);
    this.mat.uniforms.tDiffuse.value = readBuffer.texture;
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    this.quad.render(renderer);
  }
}

export const TIERS = [
  { pixel: 1.5, bloom: true, shadow: 2048, outline: true },
  { pixel: 1, bloom: true, shadow: 1024, outline: true },
  { pixel: 1, bloom: false, shadow: 0, outline: false },
  { pixel: 0.75, bloom: false, shadow: 0, outline: false },
];

export class Pipeline {
  constructor(renderer, scene, camera, vmScene, vmCam, onTier) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.vmScene = vmScene;
    this.vmCam = vmCam;
    this.onTier = onTier;
    this.hitAb = 0;
    this.tint = new THREE.Color(0, 0, 0);
    this.frameMs = 16;
    this.watchT = 0;
    this.fastT = 0;
    this.dropped = false;
    const forced = new URLSearchParams(location.search).get('gfx');
    this.locked = forced !== null;
    let saved = 0;
    try { saved = Number(localStorage.getItem('aura-gfx')) || 0; } catch { /* 저장 불가 */ }
    this.tier = -1;
    this.setTier(this.locked ? clampTier(Number(forced)) : clampTier(saved));
  }

  buildComposer() {
    const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    const c = new EffectComposer(this.renderer, rt);
    c.addPass(new RenderPass(this.scene, this.camera));
    this.vmPass = new ViewmodelPass(this.vmScene, this.vmCam);
    c.addPass(this.vmPass);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.32, 0.5, 1.12);
    c.addPass(this.bloom);
    this.finalPass = new ShaderPass(FINAL);
    c.addPass(this.finalPass);
    this.composer = c;
  }

  setTier(n) {
    if (n === this.tier) return;
    this.tier = n;
    const cfg = TIERS[n];
    const r = this.renderer;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, cfg.pixel));
    if (cfg.bloom) {
      if (!this.composer) this.buildComposer();
      r.toneMapping = THREE.NoToneMapping;
      // 중간 단계는 안티앨리어싱을 줄인다
      const samples = n === 0 ? 4 : 2;
      for (const rt of [this.composer.renderTarget1, this.composer.renderTarget2, this.vmPass.rt]) {
        if (rt.samples !== samples) { rt.samples = samples; rt.dispose(); }
      }
    } else {
      r.toneMapping = THREE.NeutralToneMapping;
    }
    this.onTier?.(cfg, n);
    this.resize();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(w, h);
    }
  }

  hit(v) { this.hitAb = Math.min(1.6, Math.max(this.hitAb, v)); }

  // 프레임이 계속 느리면 한 단계 내린다
  watch(realDt) {
    if (this.locked || document.hidden || realDt > 0.25) return;
    this.frameMs += (realDt * 1000 - this.frameMs) * 0.05;
    this.watchT += realDt;
    if (this.watchT > 3 && this.frameMs > 27 && this.tier < TIERS.length - 1) {
      this.watchT = 0;
      this.frameMs = 16;
      this.fastT = 0;
      this.dropped = true;
      this.setTier(this.tier + 1);
      try { localStorage.setItem('aura-gfx', String(this.tier)); } catch { /* 저장 불가 */ }
      return;
    }
    // 지난번에 낮춘 단계가 남아 있어도 여유가 충분하면 한 칸 올려 본다. 이번 실행에서 떨어진 적이 있으면 안 올린다.
    this.fastT = this.frameMs < 12 ? this.fastT + realDt : 0;
    if (this.fastT > 20 && !this.dropped && this.tier > 0) {
      this.fastT = 0;
      this.setTier(this.tier - 1);
      try { localStorage.setItem('aura-gfx', String(this.tier)); } catch { /* 저장 불가 */ }
    }
  }

  prewarm(effects) {
    const r = this.renderer;
    if (TIERS[this.tier].bloom) r.setRenderTarget(this.composer.renderTarget1);
    effects.prewarm(r, this.camera);
    r.setRenderTarget(null);
  }

  render(dt, showVm) {
    this.hitAb = Math.max(0, this.hitAb - dt * 2.6);
    if (TIERS[this.tier].bloom) {
      const u = this.finalPass.uniforms;
      u.ab.value = this.hitAb;
      u.time.value = (u.time.value + dt * 60) % 1000;
      u.tint.value.copy(this.tint);
      this.vmPass.enabled = showVm;
      this.composer.render(dt);
      return;
    }
    const r = this.renderer;
    r.setRenderTarget(null);
    r.clear();
    r.render(this.scene, this.camera);
    if (showVm) {
      r.clearDepth();
      r.render(this.vmScene, this.vmCam);
    }
  }
}

function clampTier(n) { return Number.isFinite(n) ? Math.max(0, Math.min(TIERS.length - 1, Math.round(n))) : 0; }
