// 효과음은 파일 없이 전부 코드로 합성한다. 밈은 그대로, 총소리는 진짜 FPS처럼 묵직하게.
//
// 신호 흐름
//   소리 하나 = 보이스(voice) 하나: 입력 → (거리 로우패스 → 스테레오 팬) → sfxBus
//                                               └→ 리버브 센드 → 컨볼버(짧은 방) → mix
//   musicBus → 덕킹(내가 쏠 때 잠깐 줄어듦) → mix
//   mix → 로우셸프 → 하이셸프 → 컴프레서 → 리미터 → 마스터 볼륨 → 소프트 클리퍼 → 스피커
//
// 동시에 울리는 보이스는 MAX_VOICES 개까지. 넘으면 가장 조용하거나 거의 끝난 것부터 끊는다.
const rand = (a, b) => a + Math.random() * (b - a);
const MAX_VOICES = 24;

export class Sfx {
  constructor() {
    this.ctx = null;
    this.volume = 0.8;
    this.muted = false;
    this.holds = new Set(); // 광고, 포털 음소거처럼 사용자 설정보다 우선하는 무음
    this.music = null;
    this.voices = [];
    this._v = null; // 지금 소리를 쌓고 있는 보이스
    this.listener = null;
    this.ttsOn = 'speechSynthesis' in window;
    this.ttsVoices = [];
    if (this.ttsOn) {
      const load = () => { this.ttsVoices = speechSynthesis.getVoices(); };
      load();
      speechSynthesis.addEventListener?.('voiceschanged', load);
    }
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this._build(new AC());
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  // 믹스 버스를 만든다. (테스트에서는 OfflineAudioContext 를 넣을 수 있다)
  _build(ctx) {
    this.ctx = ctx;
    const c = ctx;
    this.mix = c.createGain();

    const low = c.createBiquadFilter();
    low.type = 'lowshelf'; low.frequency.value = 110; low.gain.value = 3.5;
    const high = c.createBiquadFilter();
    high.type = 'highshelf'; high.frequency.value = 6500; high.gain.value = 2.5;

    const comp = c.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 8; comp.ratio.value = 4;
    comp.attack.value = 0.004; comp.release.value = 0.16;
    const limiter = c.createDynamicsCompressor();
    limiter.threshold.value = -3; limiter.knee.value = 0; limiter.ratio.value = 20;
    limiter.attack.value = 0.001; limiter.release.value = 0.08;

    this.master = c.createGain();
    this.master.gain.value = this.silent ? 0 : this.volume;

    // 마지막 안전장치: 0.8 까지는 그대로, 그 위는 부드럽게 눌러 1.0 을 절대 넘지 않는다
    this.clip = c.createWaveShaper();
    const n = 4097, curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1, ax = Math.abs(x);
      curve[i] = ax < 0.8 ? x : Math.sign(x) * (0.8 + 0.18 * Math.tanh((ax - 0.8) / 0.18));
    }
    this.clip.curve = curve;

    this.mix.connect(low); low.connect(high); high.connect(comp); comp.connect(limiter);
    limiter.connect(this.master); this.master.connect(this.clip); this.clip.connect(c.destination);

    this.sfxBus = c.createGain();
    this.sfxBus.gain.value = 0.9;
    this.sfxBus.connect(this.mix);

    // 리버브: 짧은 방 울림을 직접 만든 임펄스로
    this.revIn = c.createGain();
    const conv = c.createConvolver();
    conv.normalize = true;
    conv.buffer = this._makeIR(1.15);
    const revHp = c.createBiquadFilter();
    revHp.type = 'highpass'; revHp.frequency.value = 180;
    this.revOut = c.createGain();
    this.revOut.gain.value = 0.55;
    this.revIn.connect(conv); conv.connect(revHp); revHp.connect(this.revOut); this.revOut.connect(this.mix);

    this.musicBus = c.createGain();
    this.musicBus.gain.value = 0.32;
    this.duck = c.createGain();
    this.musicBus.connect(this.duck); this.duck.connect(this.mix);

    // 노이즈 버퍼는 한 번만 만들고 계속 재사용
    const len = c.sampleRate * 2;
    this.noiseBuf = c.createBuffer(1, len, c.sampleRate);
    this.brownBuf = c.createBuffer(1, len, c.sampleRate);
    const w = this.noiseBuf.getChannelData(0), b = this.brownBuf.getChannelData(0);
    let last = 0, peak = 0;
    for (let i = 0; i < len; i++) {
      w[i] = Math.random() * 2 - 1;
      last = (last + 0.02 * w[i]) / 1.02;
      b[i] = last;
      peak = Math.max(peak, Math.abs(last));
    }
    for (let i = 0; i < len; i++) b[i] /= peak || 1;

    // 홀수 길이라야 입력 0 이 정확히 0 으로 나온다 (짝수면 DC 가 샌다)
    this.crunchCurve = new Float32Array(1025);
    for (let i = 0; i < 1025; i++) { const x = (i / 512) - 1; this.crunchCurve[i] = Math.tanh(x * 6); }
    this.crunch = c.createWaveShaper(); // 보이스 밖에서 쓰는 공용 크런치
    this.crunch.curve = this.crunchCurve;
    this.crunch.connect(this.sfxBus);
  }

  _makeIR(sec) {
    const c = this.ctx, sr = c.sampleRate, n = Math.floor(sr * sec);
    const ir = c.createBuffer(2, n, sr);
    const k = Math.log(1000) / sec; // 60dB 감쇠
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < n; i++) {
        const t = i / sr;
        // 시간이 갈수록 고음이 먼저 죽는다 (원폴 로우패스 계수를 점점 낮춤)
        const a = 0.75 - 0.6 * (t / sec);
        lp += a * ((Math.random() * 2 - 1) - lp);
        d[i] = lp * Math.exp(-k * t) * (t < 0.006 ? t / 0.006 : 1);
      }
      // 초기 반사음 몇 개
      for (const [ms, g] of [[7, 0.7], [13, 0.5], [21, 0.42], [33, 0.3], [47, 0.22]]) {
        const i = Math.floor(((ms + (ch ? 2.3 : 0)) / 1000) * sr);
        if (i < n) d[i] += (Math.random() < 0.5 ? -g : g);
      }
    }
    return ir;
  }

  setVolume(v) {
    this.volume = v;
    this.applyGain();
  }

  toggleMute() {
    this.muted = !this.muted;
    this.applyGain();
    return this.muted;
  }

  setHold(key, on) {
    if (on) this.holds.add(key);
    else this.holds.delete(key);
    this.applyGain();
  }

  get silent() { return this.muted || this.holds.size > 0; }

  applyGain() {
    if (this.master) this.master.gain.value = this.silent ? 0 : this.volume;
    if (this.silent && this.ttsOn) speechSynthesis.cancel();
  }

  get ready() { return !!this.ctx && this.ctx.state === 'running'; }

  // ---- 공간 음향 ----
  // 카메라는 yaw 만큼 돌린 -z 방향을 본다. forward = (-sin, 0, -cos), right = (cos, 0, -sin)
  setListener(x, y, z, yaw = 0) {
    if (![x, y, z, yaw].every(Number.isFinite)) return;
    const L = this.listener ?? (this.listener = {});
    L.x = x; L.y = y; L.z = z;
    L.fx = -Math.sin(yaw); L.fz = -Math.cos(yaw);
    L.rx = Math.cos(yaw); L.rz = -Math.sin(yaw);
  }

  _spatial(pos) {
    const L = this.listener;
    if (!pos || !L) return { gain: 1, spatial: false, d: 0 };
    const x = pos.x ?? pos[0], y = pos.y ?? pos[1] ?? L.y, z = pos.z ?? pos[2];
    if (![x, y, z].every(Number.isFinite)) return { gain: 1, spatial: false, d: 0 };
    const dx = x - L.x, dy = y - L.y, dz = z - L.z;
    const h = Math.hypot(dx, dz), d = Math.hypot(h, dy);
    // 4m 안은 그대로, 60m 에서 약 10%
    const gain = d <= 4 ? 1 : 1 / (1 + (d - 4) * 0.1607);
    let pan = 0, front = 1;
    if (h > 0.01) {
      pan = (dx * L.rx + dz * L.rz) / h;
      front = (dx * L.fx + dz * L.fz) / h;
    }
    pan *= 0.8 * Math.min(1, h / 1.5);
    let lp = Math.max(700, 20000 * Math.exp(-Math.max(0, d - 4) / 18));
    if (front < 0) lp *= 1 + 0.35 * front; // 뒤쪽은 조금 어둡게
    return { gain, pan, lp, spatial: true, d };
  }

  // ---- 보이스 관리 ----
  _prune(t) {
    this.voices = this.voices.filter((v) => {
      if (v.end + 0.15 > t) return true;
      this._drop(v);
      return false;
    });
  }

  _drop(v) {
    try { v.out.disconnect(); v.send?.disconnect(); v.wetIn?.disconnect(); } catch { /* 이미 끊김 */ }
  }

  _steal(t) {
    let worst = null, score = Infinity;
    for (const v of this.voices) {
      const left = Math.max(0, v.end - t) / Math.max(0.05, v.end - v.start);
      const s = v.level * v.prio * (0.15 + left);
      if (s < score) { score = s; worst = v; }
    }
    if (!worst) return;
    this.voices.splice(this.voices.indexOf(worst), 1);
    for (const g of [worst.in.gain, worst.wetIn?.gain]) {
      if (!g) continue;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.setTargetAtTime(0, t, 0.008);
    }
    for (const s of worst.srcs) { try { s.stop(t + 0.05); } catch { /* 이미 멈춤 */ } }
    setTimeout(() => this._drop(worst), 120);
  }

  _voice(sp, level, rev, prio) {
    const c = this.ctx, t = c.currentTime;
    this._prune(t);
    while (this.voices.length >= MAX_VOICES) this._steal(t);
    const inp = c.createGain();
    inp.gain.value = level;
    let out = inp;
    if (sp.spatial) {
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = Math.min(sp.lp, c.sampleRate * 0.45); lp.Q.value = 0.5;
      const pn = c.createStereoPanner();
      pn.pan.value = sp.pan;
      inp.connect(lp); lp.connect(pn); out = pn;
    }
    out.connect(this.sfxBus);
    let send = null;
    const wetAmt = rev * (1 + Math.min(1, sp.d / 30));
    if (wetAmt > 0) {
      send = c.createGain(); send.gain.value = wetAmt;
      out.connect(send); send.connect(this.revIn);
    }
    const v = { in: inp, out, send, wetIn: null, crunchIn: null, srcs: [], start: t, end: t + 0.05, level, prio, sp };
    this.voices.push(v);
    return v;
  }

  // 소리 하나를 보이스로 감싸서 만든다. 이미 보이스 안이면 거기에 그냥 쌓는다.
  _play(opts, fn) {
    if (!this.ready) return false;
    if (this._v) { fn.call(this, this._v); return true; }
    const sp = this._spatial(opts.pos);
    const level = (opts.vol ?? 1) * sp.gain;
    if (!(level > 0.003)) return false;
    const v = this._voice(sp, level, opts.rev ?? 0.12, opts.prio ?? 1);
    this._v = v;
    try { fn.call(this, v); } catch (e) { console.warn('sfx', e); } finally { this._v = null; }
    return true;
  }

  dest() { return this._v ? this._v.in : this.sfxBus; }

  // 리버브로만 가는 입력 (꼬리 전용)
  wet() {
    const v = this._v;
    if (!v) return this.revIn;
    if (!v.wetIn) {
      v.wetIn = this.ctx.createGain();
      v.wetIn.gain.value = v.level;
      v.wetIn.connect(this.revIn);
    }
    return v.wetIn;
  }

  crunchOut() {
    const v = this._v;
    if (!v) return this.crunch;
    if (!v.crunchIn) {
      v.crunchIn = this.ctx.createWaveShaper();
      v.crunchIn.curve = this.crunchCurve;
      v.crunchIn.connect(v.in);
    }
    return v.crunchIn;
  }

  _reg(src, stopT) {
    const v = this._v;
    if (!v) return;
    v.srcs.push(src);
    if (stopT > v.end) v.end = stopT;
  }

  // ---- 저수준 부품 ----
  env(g, t, a, peak, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  osc(type, f0, f1, dur, peak, { at = 0, out, a = 0.005 } = {}) {
    const t = this.ctx.currentTime + at;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
    this.env(g, t, a, peak, dur);
    o.connect(g);
    g.connect(out ?? this.dest());
    const stop = t + dur + a + 0.05;
    o.start(t);
    o.stop(stop);
    this._reg(o, stop);
    return o;
  }

  noise(dur, peak, { at = 0, type = 'bandpass', f0 = 1000, f1, q = 1, out, a = 0.002, brown = false } = {}) {
    const t = this.ctx.currentTime + at;
    const s = this.ctx.createBufferSource();
    s.buffer = brown ? this.brownBuf : this.noiseBuf;
    s.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = this.ctx.createGain();
    this.env(g, t, a, peak, dur);
    s.connect(f); f.connect(g); g.connect(out ?? this.dest());
    const stop = t + dur + a + 0.05;
    s.start(t, Math.random());
    s.stop(stop);
    this._reg(s, stop);
  }

  // 짧은 금속성 딸깍
  _mclick(at, f, vol, q = 4, dur = 0.018) {
    this.noise(dur, vol, { at, f0: f, q, a: 0.0005 });
    this.osc('square', f * 0.9, f * 0.6, 0.008, vol * 0.18, { at, a: 0.0005 });
  }

  // 묵직한 철컥
  _clack(at, vol) {
    this.noise(0.035, vol, { at, f0: 1400, q: 2, a: 0.0005 });
    this.noise(0.05, vol * 0.6, { at, type: 'lowpass', f0: 700, q: 1, brown: true, a: 0.001 });
    this.osc('sine', 320, 140, 0.035, vol * 0.5, { at, a: 0.001 });
  }

  _slide(at, dur, vol, f0, f1) {
    this.noise(dur, vol, { at, f0, f1, q: 2.2, a: dur * 0.3 });
  }

  _ping(at, f, dur, vol) {
    this.osc('sine', f, f * 0.995, dur, vol, { at, a: 0.001 });
  }

  // ---- 방귀 ----
  _fartLayer(len, pitch, vol, at = 0) {
    const c = this.ctx, t = c.currentTime + at;
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(pitch * 1.35, t);
    o.frequency.exponentialRampToValueAtTime(pitch * 0.7, t + len);
    const lfo = c.createOscillator();
    lfo.type = 'square';
    lfo.frequency.setValueAtTime(rand(24, 42), t);
    lfo.frequency.linearRampToValueAtTime(rand(14, 30), t + len);
    const lg = c.createGain();
    lg.gain.value = 0.45;
    const amp = c.createGain();
    amp.gain.value = 0.55;
    lfo.connect(lg); lg.connect(amp.gain);
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = rand(420, 720);
    f.Q.value = 7;
    const g = c.createGain();
    this.env(g, t, 0.012, vol, len);
    o.connect(amp); amp.connect(f); f.connect(g); g.connect(this.dest());
    const stop = t + len + 0.1;
    o.start(t); lfo.start(t);
    o.stop(stop); lfo.stop(stop);
    this._reg(o, stop); this._reg(lfo, stop);
    this.noise(len * 0.6, vol * 0.18, { at, f0: 300, q: 2 });
  }

  fart(len = rand(0.14, 0.24), pitch = rand(62, 105), vol = 0.5) {
    this._play({ rev: 0.1 }, () => this._fartLayer(len, pitch, vol));
  }

  bigFart() {
    this._play({ rev: 0.25, prio: 3 }, () => {
      this._fartLayer(1.15, 58, 0.8);
      this.osc('sine', 90, 40, 0.5, 0.5, { out: this.crunchOut() });
    });
  }

  // ---- 밈 효과음 ----
  _vineLayers(k = 1) {
    this.osc('sine', 150, 38, 1.1, 1.0 * k, { out: this.crunchOut() });
    this.osc('triangle', 80, 30, 1.3, 0.7 * k);
    this.noise(0.09, 0.8 * k, { type: 'lowpass', f0: 2400, q: 0.5 });
    [0.17, 0.34, 0.51].forEach((at, i) => this.osc('sine', 90, 34, 0.5, (0.33 * k) / (i + 1), { at }));
  }

  vineBoom() { this._play({ rev: 0.3, prio: 3 }, () => this._vineLayers(1)); }

  airhorn() {
    this._play({ rev: 0.3, prio: 3 }, () => {
      [[0, 0.12], [0.16, 0.12], [0.32, 0.5]].forEach(([at, d]) => {
        [466, 469, 702, 932].forEach((f, i) => {
          this.osc('sawtooth', f, f * 0.995, d, i === 3 ? 0.08 : 0.17, { at, a: 0.01, out: this.crunchOut() });
        });
      });
    });
  }

  metalPipe() {
    this._play({ rev: 0.35, prio: 2 }, () => {
      const hit = (at, v) => {
        [523, 1394, 2377, 3611, 5120].forEach((f, i) => {
          this.osc('sine', f, f * 0.992, 1.3 / (i * 0.5 + 1), (0.3 * v) / (i + 1), { at, a: 0.001 });
        });
        this.noise(0.04, 0.5 * v, { at, f0: 4000, q: 1 });
      };
      hit(0, 1); hit(0.26, 0.5); hit(0.42, 0.28); hit(0.53, 0.14);
    });
  }

  bonk(pos) {
    this._play({ pos, rev: 0.15 }, () => {
      this.osc('triangle', 620, 180, 0.13, 0.7, { a: 0.001 });
      this.osc('sine', 260, 90, 0.09, 0.5, { a: 0.001, out: this.crunchOut() });
      this.noise(0.05, 0.4, { f0: 1600 });
      this.noise(0.012, 0.35, { type: 'highpass', f0: 4000, a: 0.0005 });
    });
  }

  slap(pos) {
    this._play({ pos, rev: 0.18 }, () => {
      this.noise(0.012, 0.6, { type: 'highpass', f0: 5000, q: 0.5, a: 0.0005 });
      this.noise(0.09, 1, { type: 'highpass', f0: 1400, q: 0.3, a: 0.001 });
      this.noise(0.05, 0.8, { f0: 3000, q: 0.8, a: 0.001, at: 0.008 });
      this.osc('sine', 210, 70, 0.1, 0.8, { a: 0.001, out: this.crunchOut() });
    });
  }

  whiff() { this._play({ rev: 0.05 }, () => this.noise(0.2, 0.35, { f0: 600, f1: 2200, q: 1.5, a: 0.04 })); }

  boing(big = false) {
    this._play({ rev: 0.12 }, () => {
      const c = this.ctx, t = c.currentTime, dur = big ? 0.75 : 0.45;
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(big ? 130 : 200, t);
      o.frequency.exponentialRampToValueAtTime(big ? 780 : 950, t + dur * 0.42);
      o.frequency.exponentialRampToValueAtTime(big ? 300 : 430, t + dur);
      const lfo = c.createOscillator();
      lfo.frequency.value = 19;
      const lg = c.createGain();
      lg.gain.value = 90;
      lfo.connect(lg); lg.connect(o.frequency);
      const g = c.createGain();
      this.env(g, t, 0.01, 0.5, dur);
      o.connect(g); g.connect(this.dest());
      const stop = t + dur + 0.1;
      o.start(t); lfo.start(t); o.stop(stop); lfo.stop(stop);
      this._reg(o, stop); this._reg(lfo, stop);
    });
  }

  squeak() {
    this._play({ rev: 0.05 }, () => {
      const f = rand(1050, 1500);
      this.osc('sine', f, f * 1.5, 0.07, 0.09);
      this.osc('sine', f * 1.45, f, 0.06, 0.07, { at: 0.06 });
    });
  }

  quack() {
    this._play({ rev: 0.1 }, () => {
      const c = this.ctx, t = c.currentTime;
      const f = c.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = 1150; f.Q.value = 4;
      const g = c.createGain();
      this.env(g, t, 0.01, 0.9, 0.17);
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(430, t);
      o.frequency.exponentialRampToValueAtTime(235, t + 0.17);
      o.connect(f); f.connect(g); g.connect(this.dest());
      o.start(t); o.stop(t + 0.25);
      this._reg(o, t + 0.25);
    });
  }

  bark() {
    this._play({ rev: 0.2 }, () => {
      [0, 0.17].forEach((at) => {
        const t = this.ctx.currentTime + at;
        const f = this.ctx.createBiquadFilter();
        f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 2.5;
        const g = this.ctx.createGain();
        this.env(g, t, 0.006, 0.8, 0.1);
        const o = this.ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(rand(540, 680), t);
        o.frequency.exponentialRampToValueAtTime(190, t + 0.1);
        o.connect(f); f.connect(g); g.connect(this.dest());
        o.start(t); o.stop(t + 0.2);
        this._reg(o, t + 0.2);
      });
    });
  }

  planeFlyby() {
    this._play({ rev: 0.2, prio: 2 }, () => {
      const c = this.ctx, t = c.currentTime;
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(170, t);
      o.frequency.linearRampToValueAtTime(240, t + 1.6);
      o.frequency.linearRampToValueAtTime(95, t + 3.4);
      const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t + 1.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
      o.connect(f); f.connect(g); g.connect(this.dest());
      o.start(t); o.stop(t + 3.5);
      this._reg(o, t + 3.5);
      this.noise(3.3, 0.2, { type: 'lowpass', f0: 300, f1: 900, q: 0.7, a: 1.4 });
    });
  }

  explosion(pos) {
    this._play({ pos, rev: 0.4, prio: 2 }, () => {
      this.noise(0.05, 1, { type: 'highpass', f0: 1500, q: 0.5, a: 0.0005 });
      this.noise(1.1, 1, { type: 'lowpass', f0: 2200, f1: 70, q: 0.6, out: this.crunchOut(), a: 0.001 });
      this.osc('sine', 110, 26, 0.9, 1, { a: 0.002, out: this.crunchOut() });
      this.osc('triangle', 60, 24, 1.1, 0.6);
      for (let i = 0; i < 6; i++) this.noise(rand(0.02, 0.05), rand(0.15, 0.3), { at: rand(0.08, 0.6), f0: rand(1500, 5000), q: 3, a: 0.001 });
      this.noise(1.6, 0.7, { type: 'lowpass', f0: 900, f1: 120, q: 0.5, a: 0.02, out: this.wet() });
    });
  }

  sadTrombone() {
    this._play({ rev: 0.2, prio: 3 }, () => {
      const notes = [[311, 0, 0.3], [293, 0.32, 0.3], [277, 0.64, 0.3], [261, 0.96, 1.0]];
      for (const [f, at, d] of notes) {
        const t = this.ctx.currentTime + at;
        const o = this.ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(f, t);
        if (d > 0.5) {
          const lfo = this.ctx.createOscillator();
          lfo.frequency.value = 5.2;
          const lg = this.ctx.createGain();
          lg.gain.value = 9;
          lfo.connect(lg); lg.connect(o.frequency);
          lfo.start(t); lfo.stop(t + d);
          this._reg(lfo, t + d);
        }
        const fl = this.ctx.createBiquadFilter();
        fl.type = 'lowpass'; fl.Q.value = 5;
        fl.frequency.setValueAtTime(500, t);
        fl.frequency.linearRampToValueAtTime(1300, t + 0.1);
        fl.frequency.linearRampToValueAtTime(600, t + d);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.4, t + 0.03);
        g.gain.setValueAtTime(0.4, t + d - 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(fl); fl.connect(g); g.connect(this.dest());
        o.start(t); o.stop(t + d + 0.02);
        this._reg(o, t + d + 0.02);
      }
    });
  }

  bing() {
    this._play({ rev: 0.25 }, () => {
      this.osc('sine', 1318, 1318, 0.5, 0.25);
      this.osc('sine', 1975, 1975, 0.7, 0.2, { at: 0.11 });
    });
  }

  bong() {
    this._play({ rev: 0.35, prio: 3 }, () => {
      this.osc('sine', 196, 190, 1.3, 0.7, { a: 0.003 });
      this.osc('sine', 523, 515, 0.8, 0.25, { a: 0.003 });
      this.osc('sine', 1041, 1030, 0.4, 0.12, { a: 0.003 });
    });
  }

  tick() { this._play({ rev: 0 }, () => this.osc('square', 1900, 1500, 0.035, 0.18, { a: 0.001 })); }
  click() { this._play({ rev: 0 }, () => this.osc('square', 760, 500, 0.03, 0.12, { a: 0.001 })); }

  // 빈 총 방아쇠 (예전 이름 dry 도 유지)
  empty() {
    this._play({ rev: 0.05 }, () => {
      this.noise(0.015, 1, { f0: 3800, q: 5, a: 0.0005 });
      this.osc('square', 1400, 900, 0.012, 0.3, { a: 0.0005 });
      this.osc('triangle', 700, 400, 0.02, 0.4, { a: 0.0005 });
      this.osc('sine', 5200, 5100, 0.03, 0.04, { at: 0.004, a: 0.001 });
      this.noise(0.02, 0.2, { at: 0.03, f0: 2400, q: 4, a: 0.0005 });
    });
  }

  dry() { this.empty(); }

  // 대시 바람 소리 (예전 이름 dash 도 유지)
  whoosh() {
    this._play({ rev: 0.08 }, () => {
      this.noise(0.24, 0.5, { f0: 350, f1: 2600, q: 0.9, a: 0.05 });
      this.noise(0.2, 0.28, { type: 'lowpass', f0: 500, f1: 200, q: 0.7, brown: true, a: 0.02 });
      this.noise(0.12, 0.12, { at: 0.08, type: 'highpass', f0: 5000, q: 0.5, a: 0.03 });
    });
  }

  dash() { this.whoosh(); }

  jump() {
    this._play({ rev: 0.03 }, () => {
      this.noise(0.06, 0.6, { type: 'lowpass', f0: 600, q: 1, brown: true, a: 0.002 });
      this.noise(0.08, 0.12, { f0: 1200, q: 0.8, a: 0.01 });
      this.osc('sine', 150, 230, 0.07, 0.12, { a: 0.004 });
    });
  }

  land(pos) {
    this._play({ pos, rev: 0.06 }, () => {
      this.osc('sine', 130, 48, 0.14, 0.6, { a: 0.002, out: this.crunchOut() });
      this.noise(0.07, 0.45, { type: 'lowpass', f0: 900, q: 0.8, brown: true, a: 0.001 });
      this.noise(0.03, 0.12, { f0: 2500, q: 1.5, a: 0.001, at: 0.01 });
    });
  }

  // 발소리: 내 발은 작게, 남의 발은 위치에 따라
  step(pos, run = false) {
    const mine = !pos;
    const vol = (mine ? 0.3 : 0.7) * (run ? 1.25 : 1) * rand(0.8, 1.1);
    this._play({ pos, vol, rev: 0.04, prio: 0.5 }, () => {
      this.noise(rand(0.04, 0.07), 1, { type: 'lowpass', f0: rand(280, 560), q: 1, brown: true, a: 0.002 });
      this.osc('sine', rand(90, 125), 50, 0.06, 0.9, { a: 0.002 });
      this.noise(0.025, run ? 0.16 : 0.1, { at: rand(0, 0.012), f0: rand(1800, 3200), q: 1.5, a: 0.001 });
    });
  }

  // 맞혔을 때: 몸통은 딱, 머리는 딩
  hitmark(head = false) {
    this._play({ rev: head ? 0.15 : 0.03, prio: 2 }, () => {
      this.osc('sine', 3000, 2800, 0.04, 0.45, { a: 0.0005 });
      this.osc('triangle', 1100, 700, 0.03, 0.55, { a: 0.0005 });
      this.noise(0.012, 0.45, { type: 'highpass', f0: 6000, q: 0.5, a: 0.0005 });
      if (head) {
        const f = 1760;
        this.osc('sine', f, f, 0.45, 0.3, { at: 0.012, a: 0.001 });
        this.osc('sine', f * 2.76, f * 2.75, 0.25, 0.12, { at: 0.012, a: 0.001 });
        this.osc('sine', f * 5.4, f * 5.38, 0.12, 0.06, { at: 0.012, a: 0.001 });
        this.noise(0.02, 0.2, { at: 0.012, type: 'highpass', f0: 7000, a: 0.0005 });
      }
    });
  }

  killConfirm() {
    this._play({ rev: 0.3, prio: 3 }, () => {
      this.osc('sine', 140, 45, 0.2, 0.8, { a: 0.002, out: this.crunchOut() });
      this.noise(0.015, 0.4, { type: 'highpass', f0: 4000, a: 0.0005 });
      this.osc('triangle', 988, 988, 0.18, 0.25, { a: 0.002 });
      this.osc('sine', 1480, 1480, 0.35, 0.25, { at: 0.07, a: 0.002 });
      this.osc('sine', 1976, 1976, 0.45, 0.16, { at: 0.07, a: 0.002 });
      this.noise(0.06, 0.18, { at: 0.07, type: 'highpass', f0: 6000, a: 0.002 });
    });
  }

  // 체력 낮을 때 심장 소리 (부를 때마다 쿵-쿵 한 번)
  lowHp() {
    this._play({ rev: 0, prio: 2 }, () => {
      this.osc('sine', 62, 42, 0.14, 0.9, { a: 0.006 });
      this.noise(0.1, 0.45, { type: 'lowpass', f0: 160, q: 1, brown: true, a: 0.004 });
      this.osc('sine', 56, 40, 0.12, 0.65, { at: 0.2, a: 0.006 });
      this.noise(0.08, 0.3, { at: 0.2, type: 'lowpass', f0: 140, q: 1, brown: true, a: 0.004 });
    });
  }

  reload() {
    this._play({ rev: 0.08 }, () => {
      [0, 0.15, 0.3].forEach((at) => this.noise(0.03, 0.4, { at, f0: 3200, q: 3 }));
      this.osc('sawtooth', 300, 840, 0.3, 0.13, { at: 0.5 });
    });
  }

  // 장전 시작: 탄창 빼기, 리볼버 실린더 돌리기, 샷건 탄 넣기
  reloadStart(w) {
    this._play({ rev: 0.08 }, () => {
      if (w === 'fart') {
        this._mclick(0, 2600, 0.45);
        this._slide(0.04, 0.12, 0.25, 2000, 900);
        this._fartLayer(0.08, 85, 0.12, 0.08);
        this._clack(0.38, 0.3);
      } else if (w === 'six7') {
        this._mclick(0, 3000, 0.5);
        this._slide(0.05, 0.08, 0.3, 1500, 3000);
        let at = 0.16;
        for (let i = 0; i < 10; i++) { this._mclick(at, 4200, 0.3 - i * 0.022, 6, 0.01); at += 0.026 * (1 + i * 0.09); }
        for (let i = 0; i < 3; i++) this._ping(0.62 + i * 0.05 + rand(0, 0.02), rand(3500, 5500), 0.12, 0.08);
      } else if (w === 'boom') {
        this._clack(0, 0.5);
        for (let i = 0; i < 3; i++) {
          const at = 0.3 + i * 0.32;
          this._slide(at, 0.06, 0.25, 1800, 900);
          this._clack(at + 0.06, 0.4);
          this._mclick(at + 0.07, 1800, 0.25);
        }
      } else if (w === 'sniper') {
        this._mclick(0, 2200, 0.5);
        this._slide(0.08, 0.12, 0.4, 1200, 2800);
        this._mclick(0.2, 3200, 0.5);
        this._mclick(0.5, 2000, 0.4);
        this._slide(0.53, 0.1, 0.25, 1600, 800);
        this._clack(0.85, 0.25);
      } else if (w === 'dual') {
        this._mclick(0, 3000, 0.45);
        this._mclick(0.05, 3300, 0.45);
        this._clack(0.3, 0.25);
        this._clack(0.36, 0.22);
      } else if (w === 'laser') {
        this._mclick(0, 2400, 0.3);
        this.osc('sine', 1800, 200, 0.4, 0.14, { a: 0.005 });
        this.osc('sawtooth', 900, 120, 0.4, 0.05, { a: 0.005 });
      } else if (w === 'ice') {
        this._clack(0, 0.4);
        this.noise(0.5, 0.35, { type: 'highpass', f0: 3000, f1: 1500, q: 0.6, a: 0.01 });
        this._mclick(0.12, 2500, 0.4);
      } else {
        this._mclick(0, 2600, 0.45);
        this._slide(0.05, 0.1, 0.25, 2000, 900);
        this._clack(0.35, 0.3);
      }
    });
  }

  // 장전 끝: 탄창 끼우기, 노리쇠, 펌프
  reloadEnd(w) {
    this._play({ rev: 0.1 }, () => {
      if (w === 'fart') {
        this._clack(0, 0.55);
        this._mclick(0.01, 3000, 0.4);
        this._slide(0.12, 0.1, 0.3, 1500, 3000);
        this._mclick(0.24, 3500, 0.5);
        this._fartLayer(0.07, 110, 0.1, 0.3);
      } else if (w === 'six7') {
        [0, 0.04, 0.08].forEach((at) => this._mclick(at, 3800, 0.25, 5, 0.012));
        this._clack(0.16, 0.6);
        this._mclick(0.16, 3600, 0.6);
        for (let i = 0; i < 3; i++) this._mclick(0.26 + i * 0.03, 4200, 0.2, 6, 0.01);
      } else if (w === 'boom') {
        this._slide(0, 0.09, 0.55, 900, 2200);
        this._clack(0.08, 0.6);
        this._slide(0.16, 0.08, 0.5, 2200, 1000);
        this._clack(0.24, 0.7);
        this.osc('sine', 180, 90, 0.06, 0.4, { at: 0.24, a: 0.001 });
      } else if (w === 'sniper') {
        this._clack(0, 0.5);
        this._slide(0.15, 0.1, 0.4, 2800, 1200);
        this._mclick(0.26, 2600, 0.6);
        this._clack(0.34, 0.55);
      } else if (w === 'dual') {
        this._clack(0, 0.45);
        this._clack(0.08, 0.45);
        this._mclick(0.2, 3400, 0.55);
        this._mclick(0.26, 3100, 0.55);
      } else if (w === 'laser') {
        this.osc('sine', 200, 2400, 0.35, 0.15, { a: 0.01 });
        this.osc('sawtooth', 100, 1200, 0.35, 0.05, { a: 0.01 });
        this._ping(0.35, 2400, 0.15, 0.12);
      } else if (w === 'ice') {
        this._clack(0, 0.6);
        this.noise(0.4, 0.3, { at: 0.08, f0: 800, f1: 5000, q: 1.2, a: 0.1 });
        this._mclick(0.5, 2800, 0.45);
      } else {
        this._clack(0, 0.5);
        this._mclick(0.18, 3200, 0.5);
      }
    });
  }

  // 무기 바꾸기
  equip(w) {
    this._play({ rev: 0.06 }, () => {
      this.noise(0.14, 0.3, { f0: 900, f1: 1800, q: 0.8, a: 0.02 });
      this._mclick(0.1, 3200, 0.45);
      this._mclick(0.16, 2400, 0.35);
      if (w === 'laser') this.osc('sine', 600, 2400, 0.15, 0.12, { at: 0.18, a: 0.01 });
      else if (w === 'fart') this._fartLayer(0.08, 90, 0.16, 0.18);
      else if (w === 'six7') this._mclick(0.2, 4200, 0.3, 6, 0.012);
      else if (w === 'boom') { this._slide(0.18, 0.06, 0.35, 900, 2000); this._clack(0.24, 0.45); }
      else if (w === 'sniper') this._clack(0.2, 0.4);
      else if (w === 'dual') { this._mclick(0.2, 3400, 0.4); this._mclick(0.24, 3100, 0.4); }
      else if (w === 'ice') this.noise(0.12, 0.2, { at: 0.18, type: 'highpass', f0: 4000, q: 0.6, a: 0.01 });
    });
  }

  chomp() {
    this._play({ rev: 0.05 }, () => {
      [0, 0.11, 0.22].forEach((at) => this.noise(0.07, 0.45, { at, type: 'lowpass', f0: 1800, q: 3 }));
    });
  }

  sparkle() {
    this._play({ rev: 0.35 }, () => {
      [1568, 2093, 2637, 3136, 4186].forEach((f, i) => this.osc('sine', f, f, 0.32, 0.13, { at: i * 0.06 }));
    });
  }

  // ---- 발사음 ----
  // remote=false: 내 총. 위치는 무시하고 가운데에서 들리며 음악을 잠깐 눌러 준다.
  // remote=true 에 pos 가 있으면 거리/방향 반영, 없으면 예전처럼 0.55 배.
  shoot(w, remote = false, ultra = false, pos) {
    if (!this.ready) return;
    const p = remote ? pos : undefined;
    const vol = remote ? (p ? 0.9 : 0.55) : 1;
    const k = ultra ? 1.2 : 1; // 각성 중엔 살짝 높고 날카롭게
    const def = GUNS[w] ?? GUNS.six7;
    const ok = this._play({ pos: p, vol: vol * (def.vol ?? 1), rev: def.rev, prio: remote ? 1 : 2 }, () => def.play(this, k, ultra));
    if (ok && !remote) this._duck(def.duck);
  }

  _duck(depth = 0.5) {
    const g = this.duck.gain, t = this.ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(Math.max(0.0001, g.value), t);
    g.setTargetAtTime(Math.min(g.value, depth), t, 0.01);
    g.setTargetAtTime(1, t + 0.09, 0.28);
  }

  laser() { this._play({ rev: 0.2, vol: GUNS.laser.vol }, () => GUNS.laser.play(this, 1)); }

  // 드라이아이스 탄이 터지는 소리
  iceHit(pos) {
    this._play({ pos, rev: 0.3, prio: 1.5 }, () => {
      this.noise(0.06, 0.6, { type: 'lowpass', f0: 900, q: 0.8, brown: true, a: 0.001 });
      this.osc('sine', 180, 70, 0.08, 0.5, { a: 0.001 });
      for (let i = 0; i < 9; i++) {
        this.noise(rand(0.02, 0.06), rand(0.25, 0.5), { at: rand(0, 0.12), f0: rand(3000, 9000), q: rand(6, 10), a: 0.0005 });
      }
      for (let i = 0; i < 4; i++) this._ping(rand(0, 0.1), rand(2400, 5200), rand(0.2, 0.4), rand(0.08, 0.12));
      this.noise(0.25, 0.3, { f0: 5000, q: 1.5, a: 0.002 });
      this.noise(0.7, 0.3, { type: 'highpass', f0: 6000, f1: 3000, q: 0.5, a: 0.02 });
    });
  }

  meow() {
    this._play({ rev: 0.15 }, () => {
      const c = this.ctx, t = c.currentTime;
      const f = c.createBiquadFilter();
      f.type = 'bandpass'; f.Q.value = 3;
      f.frequency.setValueAtTime(700, t);
      f.frequency.linearRampToValueAtTime(1900, t + 0.14);
      f.frequency.linearRampToValueAtTime(800, t + 0.42);
      const g = c.createGain();
      this.env(g, t, 0.03, 0.9, 0.42);
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(520, t);
      o.frequency.linearRampToValueAtTime(880, t + 0.15);
      o.frequency.linearRampToValueAtTime(430, t + 0.45);
      o.connect(f); f.connect(g); g.connect(this.dest());
      o.start(t); o.stop(t + 0.5);
      this._reg(o, t + 0.5);
    });
  }

  scratch() {
    this._play({ rev: 0.05 }, () => this.noise(0.07, 0.5, { f0: rand(2500, 4000), f1: rand(700, 1200), q: 2, a: 0.002 }));
  }

  tungTung() {
    this._play({ rev: 0.2 }, () => {
      this.osc('triangle', 330, 150, 0.14, 1, { a: 0.001, out: this.crunchOut() });
      this.noise(0.03, 0.6, { f0: 1300, q: 3, a: 0.001 });
      this.osc('sine', 95, 45, 0.3, 0.8);
    });
  }

  // 변기 물 내려가는 소리
  flush(ms = 5000) {
    this._play({ rev: 0.25, prio: 2 }, () => {
      const d = ms / 1000;
      this.noise(d, 0.65, { f0: 2600, f1: 240, q: 1.2, a: 0.25 });
      this.noise(d * 0.7, 0.3, { type: 'lowpass', f0: 500, f1: 140, q: 3, a: 0.3 });
      for (let i = 0; i < 9; i++) this.osc('sine', rand(300, 700), rand(700, 1500), 0.07, 0.13, { at: rand(0.2, d) });
    });
  }

  // 핵 떨어지기 전: 불안하게 올라가는 현악기 무리
  nukeWind(ms = 2600) {
    this._play({ rev: 0.2, prio: 5 }, () => {
      const d = ms / 1000, c = this.ctx, t = c.currentTime;
      const f = c.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(500, t);
      f.frequency.exponentialRampToValueAtTime(4200, t + d);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.42, t + d * 0.96);
      g.gain.setValueAtTime(0.0001, t + d);
      f.connect(g); g.connect(this.dest());
      const trem = c.createOscillator();
      trem.frequency.value = 11;
      const tg = c.createGain();
      tg.gain.value = 0.12;
      trem.connect(tg); tg.connect(g.gain);
      trem.start(t); trem.stop(t + d);
      this._reg(trem, t + d);
      for (const base of [110, 111.5, 165, 220.7, 330]) {
        const o = c.createOscillator();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(base, t);
        o.frequency.exponentialRampToValueAtTime(base * 2.6, t + d);
        o.connect(f);
        o.start(t); o.stop(t + d);
        this._reg(o, t + d);
      }
    });
  }

  // 핵: 묵직하게 오래 간다
  nukeBoom() {
    this._play({ rev: 0.4, prio: 5 }, () => {
      this.noise(0.06, 1, { type: 'highpass', f0: 1200, q: 0.5, a: 0.0005 });
      this.noise(5.5, 1, { type: 'lowpass', f0: 2400, f1: 45, q: 0.5, a: 0.03, out: this.crunchOut() });
      this.osc('sine', 90, 19, 5.5, 1, { out: this.crunchOut() });
      this.osc('triangle', 55, 22, 6.5, 0.8);
      this.noise(5, 0.6, { type: 'lowpass', f0: 800, f1: 60, q: 0.5, a: 0.05, out: this.wet() });
    });
  }

  // 눈깔 튀어나오는 소리
  eyePop(big) {
    this.boing(big);
    if (big) this._play({ rev: 0.1 }, () => this.osc('sine', 1400, 300, 0.05, 0.5, { a: 0.001, at: 0.02 }));
  }

  // ---- 음악 ----
  playMusic(name) {
    if (!this.ctx || this.music?.name === name) return;
    this.stopMusic();
    if (!name) return;
    const def = SONGS[name];
    if (!def) return;
    const bus = this.ctx.createGain();
    bus.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    bus.gain.exponentialRampToValueAtTime(def.gain ?? 1, this.ctx.currentTime + 0.15);
    bus.connect(this.musicBus);
    // 패드는 로우패스 하나를 같이 쓴다
    const padF = this.ctx.createBiquadFilter();
    padF.type = 'lowpass'; padF.frequency.value = def.padCut ?? 1400; padF.Q.value = 0.7;
    padF.connect(bus);
    bus.pad = padF;
    const m = { name, bus, step: 0, next: this.ctx.currentTime + 0.08, timer: 0 };
    const stepDur = 60 / def.bpm / 4;
    m.timer = setInterval(() => {
      while (m.next < this.ctx.currentTime + 0.14) {
        def.play(this, m.step, m.next, bus, stepDur);
        m.step++;
        m.next += stepDur;
      }
    }, 40);
    this.music = m;
  }

  stopMusic() {
    if (!this.music) return;
    const { timer, bus } = this.music;
    clearInterval(timer);
    const t = this.ctx.currentTime;
    bus.gain.cancelScheduledValues(t);
    bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0002), t);
    bus.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    setTimeout(() => { bus.disconnect(); bus.pad?.disconnect(); }, 300);
    this.music = null;
  }

  note(type, f, t, d, v, out, f1) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(out);
    o.start(t); o.stop(t + d + 0.02);
  }

  // 화음 패드. pump=true 면 킥에 눌렸다가 차오르는 사이드체인 느낌
  chord(type, notes, t, d, v, out, pump = false) {
    const dest = out.pad ?? out;
    for (const n of notes) {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(NOTE(n), t);
      o.detune.value = rand(-7, 7);
      g.gain.setValueAtTime(0.0001, t);
      if (pump) {
        g.gain.linearRampToValueAtTime(v * 0.15, t + d * 0.1);
        g.gain.linearRampToValueAtTime(v, t + d * 0.7);
      } else {
        g.gain.linearRampToValueAtTime(v, t + d * 0.3);
        g.gain.setValueAtTime(v, t + d * 0.7);
      }
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g); g.connect(dest);
      o.start(t); o.stop(t + d + 0.02);
    }
  }

  hat(t, v, out) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'highpass'; f.frequency.value = 7000;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(f); f.connect(g); g.connect(out);
    s.start(t, Math.random()); s.stop(t + 0.06);
  }

  // 카우벨 = 두 사각파를 묶은 것 (phonk의 영혼)
  cowbell(f, t, v, out) {
    this.note('square', f, t, 0.16, v, out);
    this.note('square', f * 1.48, t, 0.16, v * 0.7, out);
  }

  // ---- TTS ----
  say(text, { lang = 'en-US', pitch = 1, rate = 1, volume = 1, interrupt = true } = {}) {
    if (!this.ttsOn || this.silent) return;
    try {
      if (interrupt) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.pitch = pitch;
      u.rate = rate;
      u.volume = Math.min(1, volume * this.volume * 1.25);
      const v = this.ttsVoices.find((x) => x.lang === lang) ?? this.ttsVoices.find((x) => x.lang.startsWith(lang.slice(0, 2)));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch { /* 음성 없는 환경 */ }
  }

  sayMeme(text) {
    const korean = /[가-힣]/.test(text);
    this.say(text, {
      lang: korean ? 'ko-KR' : 'en-US',
      pitch: Math.random() < 0.5 ? rand(0.1, 0.5) : rand(1.5, 2),
      rate: rand(0.75, 1.3),
    });
  }
}

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);

// ---- 총소리 정의 ----
// 각 총 = 날카로운 크랙(트랜지언트) + 몸통(필터 노이즈 + 음정 있는 쿵) + 리버브 꼬리
// play(s, k, ultra): s 는 Sfx (이미 보이스 안), k 는 음정 배율
const GUNS = {
  // 방귀 기관총: 빠르니까 짧고 가볍게, 대신 펑 하는 팝을 더한다
  fart: {
    rev: 0.12, duck: 0.6, vol: 1.2,
    play(s, k, ultra) {
      s.osc('sine', 190 * k, 55, 0.07, 0.9, { a: 0.001, out: s.crunchOut() });
      s.noise(0.018, 0.55, { type: 'highpass', f0: 2500, q: 0.7, a: 0.0005 });
      s.noise(0.06, 0.35, { f0: 900 * k, f1: 300, q: 1.2, a: 0.001 });
      s._fartLayer(rand(0.09, 0.15), ultra ? rand(110, 160) : rand(62, 105), 0.42);
    },
  },
  // 67 리볼버: 쩌렁한 크랙 + 묵직한 붐 + 식스/세븐 울림
  six7: {
    rev: 0.3, duck: 0.4,
    play(s, k) {
      s.noise(0.03, 1, { type: 'highpass', f0: 3000, q: 0.7, a: 0.0005 });
      s.osc('square', 2400 * k, 600, 0.012, 0.35, { a: 0.0005 });
      s.osc('sine', 120 * k, 42, 0.28, 1, { a: 0.001, out: s.crunchOut() });
      s.osc('triangle', 65, 35, 0.35, 0.6, { a: 0.002 });
      s.noise(0.2, 0.8, { type: 'lowpass', f0: 3500, f1: 250, q: 0.7, a: 0.001 });
      const six = (s._six = !s._six);
      s.osc('sawtooth', (six ? 660 : 494) * k, (six ? 620 : 440) * k, 0.1, 0.12, { at: 0.03 });
      s.noise(0.6, 0.5, { at: 0.02, type: 'lowpass', f0: 1200, f1: 300, q: 0.6, a: 0.005, out: s.wet() });
    },
  },
  // 바인붐 샷건: 엄청난 저음 + 바인붐
  boom: {
    rev: 0.35, duck: 0.3,
    play(s, k) {
      s.noise(0.04, 1, { type: 'highpass', f0: 1800, q: 0.5, a: 0.0005 });
      s.osc('sine', 90 * k, 26, 0.7, 1, { a: 0.001, out: s.crunchOut() });
      s.osc('sine', 48, 24, 0.9, 0.8, { a: 0.003 });
      s.noise(0.35, 1, { type: 'lowpass', f0: 5000, f1: 180, q: 0.6, a: 0.001 });
      s._vineLayers(0.75);
      s.noise(1, 0.6, { at: 0.02, type: 'lowpass', f0: 900, f1: 200, q: 0.5, a: 0.01, out: s.wet() });
    },
  },
  // 눈깔 레이저: 지잉 + 작은 서브 쿵
  laser: {
    rev: 0.2, duck: 0.7, vol: 1.8,
    play(s, k) {
      s.osc('sawtooth', 1700 * k, 900, 0.09, 0.18, { a: 0.002 });
      s.osc('square', 2600 * k, 2100, 0.05, 0.07, { a: 0.002 });
      s.osc('sine', 3200 * k, 400, 0.06, 0.25, { a: 0.001 });
      s.noise(0.01, 0.35, { type: 'highpass', f0: 5000, a: 0.0005 });
      s.osc('sine', 160, 60, 0.08, 0.5, { a: 0.001 });
    },
  },
  // 저격총: 초음속 크랙 + 붐 + 멀리서 되돌아오는 메아리
  sniper: {
    rev: 0.45, duck: 0.25,
    play(s, k) {
      s.noise(0.012, 1, { type: 'highpass', f0: 4500, q: 0.5, a: 0.0003 });
      s.osc('square', 3000 * k, 400, 0.015, 0.5, { a: 0.0003 });
      s.noise(0.03, 0.8, { f0: 2000, q: 0.8, a: 0.0005 });
      s.osc('sine', 100 * k, 30, 0.5, 1, { a: 0.001, out: s.crunchOut() });
      s.osc('triangle', 55, 28, 0.7, 0.7, { a: 0.003 });
      s.noise(0.45, 0.9, { type: 'lowpass', f0: 3000, f1: 120, q: 0.6, a: 0.001 });
      [0.22, 0.48, 0.82, 1.25].forEach((at, i) => {
        s.noise(0.35, 0.45 * Math.pow(0.6, i), { at, type: 'lowpass', f0: 1400 / (i + 1), f1: 150, q: 0.6, a: 0.004 });
      });
      s.noise(1.6, 0.7, { at: 0.02, type: 'lowpass', f0: 1000, f1: 150, q: 0.5, a: 0.01, out: s.wet() });
    },
  },
  // 쌍권총: 가볍고 탁탁. 좌우 번갈아 음정이 살짝 다르다
  dual: {
    rev: 0.15, duck: 0.6, vol: 1.4,
    play(s, k) {
      const p = ((s._dual = !s._dual) ? 1 : 1.07) * k;
      s.noise(0.02, 0.8, { type: 'highpass', f0: 3200 * p, q: 0.7, a: 0.0005 });
      s.osc('square', 2800 * p, 900, 0.01, 0.25, { a: 0.0005 });
      s.noise(0.06, 0.5, { f0: 1500 * p, f1: 600, q: 1, a: 0.001 });
      s.osc('sine', 240 * p, 85, 0.07, 0.6, { a: 0.001, out: s.crunchOut() });
      s.noise(0.25, 0.25, { at: 0.01, type: 'lowpass', f0: 1500, f1: 400, q: 0.5, a: 0.004, out: s.wet() });
    },
  },
  // 드라이아이스 런처: 공기압 텅 + 칙 새는 소리
  ice: {
    rev: 0.2, duck: 0.5,
    play(s, k) {
      s.noise(0.09, 0.9, { type: 'lowpass', f0: 500 * k, f1: 150, q: 1.5, brown: true, a: 0.001 });
      s.osc('sine', 150 * k, 55, 0.14, 0.8, { a: 0.001, out: s.crunchOut() });
      s.osc('triangle', 340 * k, 210, 0.05, 0.25, { a: 0.001 });
      s.noise(0.35, 0.35, { type: 'highpass', f0: 4500, f1: 2500, q: 0.5, a: 0.01 });
      s.noise(0.15, 0.15, { f0: 7000, q: 2, a: 0.005 });
    },
  },
};

const SONGS = {
  // 대기실: 멍청한 엘리베이터 음악 + 부드러운 화음 패드
  lobby: {
    bpm: 112,
    gain: 0.9,
    padCut: 1800,
    play(s, step, t, out, sd) {
      const melody = [72, 0, 76, 79, 0, 76, 72, 0, 74, 0, 77, 81, 0, 77, 74, 0, 71, 0, 74, 79, 0, 74, 71, 0, 72, 76, 79, 84, 79, 76, 72, 0];
      const bass = [48, 48, 55, 55, 50, 50, 57, 57];
      const pads = [[60, 64, 67], [62, 65, 69], [59, 62, 67], [60, 64, 67]];
      const m = melody[step % melody.length];
      if (m) s.note('triangle', NOTE(m), t, sd * 1.4, 0.26, out);
      if (step % 4 === 0) s.note('sine', NOTE(bass[(step / 4) % 8] - 12), t, sd * 2.6, 0.5, out);
      if (step % 4 === 2) s.hat(t, 0.1, out);
      if (step % 8 === 0) s.chord('triangle', pads[(step / 8) % 4], t, sd * 8.5, 0.05, out);
    },
  },
  // 전투: 쫓기는 듯한 8비트 + 킥에 눌리는 펌핑 패드
  battle: {
    bpm: 168,
    gain: 0.75,
    padCut: 1300,
    play(s, step, t, out, sd) {
      const bass = [40, 40, 52, 40, 40, 52, 40, 43, 45, 45, 57, 45, 43, 43, 55, 42];
      const lead = [76, 0, 0, 79, 0, 0, 83, 0, 82, 0, 79, 0, 76, 0, 74, 0];
      const b = bass[step % 16];
      s.note('sawtooth', NOTE(b), t, sd * 0.85, 0.24, out);
      if (step % 64 >= 32 && lead[step % 16]) s.note('square', NOTE(lead[step % 16]), t, sd * 0.8, 0.09, out);
      if (step % 4 === 0) {
        s.note('sine', 150, t, 0.1, 0.8, out, 45);
        const root = { 40: [52, 55, 59], 45: [57, 60, 64], 43: [55, 59, 62] }[b] ?? [52, 55, 59];
        s.chord('sawtooth', root, t, sd * 4, 0.045, out, true);
      }
      if (step % 8 === 4) s.hat(t, 0.32, out);
      if (step % 2 === 1) s.hat(t, 0.08, out);
    },
  },
  // 아우라 파밍: 드리프트 phonk (원곡 아님, 분위기만 따라함)
  phonk: {
    bpm: 132,
    gain: 1.3,
    play(s, step, t, out, sd) {
      const bell = [62, 0, 62, 0, 65, 0, 62, 0, 69, 0, 68, 0, 65, 0, 62, 60];
      const n = bell[step % 16];
      if (n) s.cowbell(NOTE(n + 12), t, 0.1, out);
      if (step % 16 === 0 || step % 16 === 6 || step % 16 === 10) s.note('sine', 72, t, 0.42, 1, out, 38);
      if (step % 8 === 4) { s.hat(t, 0.5, out); s.note('square', 210, t, 0.07, 0.25, out, 90); }
      if (step % 2 === 0) s.hat(t, 0.12, out);
    },
  },
};
