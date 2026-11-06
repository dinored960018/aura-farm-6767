// 효과음은 파일 없이 전부 코드로 합성한다. 그래서 더 구리다. 그게 포인트다.
const rand = (a, b) => a + Math.random() * (b - a);

export class Sfx {
  constructor() {
    this.ctx = null;
    this.volume = 0.8;
    this.muted = false;
    this.holds = new Set(); // 광고, 포털 음소거처럼 사용자 설정보다 우선하는 무음
    this.music = null;
    this.ttsOn = 'speechSynthesis' in window;
    this.voices = [];
    if (this.ttsOn) {
      const load = () => { this.voices = speechSynthesis.getVoices(); };
      load();
      speechSynthesis.addEventListener?.('voiceschanged', load);
    }
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.silent ? 0 : this.volume;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -10;
      comp.ratio.value = 6;
      this.master.connect(comp);
      comp.connect(this.ctx.destination);
      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = 0.32;
      this.musicBus.connect(this.master);
      const len = this.ctx.sampleRate * 2;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.crunch = this.ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) { const x = (i / 512) - 1; curve[i] = Math.tanh(x * 6); }
      this.crunch.curve = curve;
      this.crunch.connect(this.master);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
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
    g.connect(out ?? this.master);
    o.start(t);
    o.stop(t + dur + a + 0.05);
    return o;
  }

  noise(dur, peak, { at = 0, type = 'bandpass', f0 = 1000, f1, q = 1, out, a = 0.002 } = {}) {
    const t = this.ctx.currentTime + at;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = this.ctx.createGain();
    this.env(g, t, a, peak, dur);
    s.connect(f); f.connect(g); g.connect(out ?? this.master);
    s.start(t, Math.random());
    s.stop(t + dur + a + 0.05);
  }

  // ---- 방귀 ----
  fart(len = rand(0.14, 0.24), pitch = rand(62, 105), vol = 0.5) {
    if (!this.ready) return;
    const c = this.ctx, t = c.currentTime;
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
    o.connect(amp); amp.connect(f); f.connect(g); g.connect(this.master);
    o.start(t); lfo.start(t);
    o.stop(t + len + 0.1); lfo.stop(t + len + 0.1);
    this.noise(len * 0.6, vol * 0.18, { f0: 300, q: 2 });
  }

  bigFart() { this.fart(1.15, 58, 0.8); }

  // ---- 밈 효과음 ----
  vineBoom() {
    if (!this.ready) return;
    this.osc('sine', 150, 38, 1.1, 1.0, { out: this.crunch });
    this.osc('triangle', 80, 30, 1.3, 0.7);
    this.noise(0.09, 0.8, { type: 'lowpass', f0: 2400, q: 0.5 });
    [0.17, 0.34, 0.51].forEach((at, i) => this.osc('sine', 90, 34, 0.5, 0.33 / (i + 1), { at }));
  }

  airhorn() {
    if (!this.ready) return;
    [[0, 0.12], [0.16, 0.12], [0.32, 0.5]].forEach(([at, d]) => {
      [466, 469, 702, 932].forEach((f, i) => {
        this.osc('sawtooth', f, f * 0.995, d, i === 3 ? 0.08 : 0.17, { at, a: 0.01, out: this.crunch });
      });
    });
  }

  metalPipe() {
    if (!this.ready) return;
    const hit = (at, v) => {
      [523, 1394, 2377, 3611, 5120].forEach((f, i) => {
        this.osc('sine', f, f * 0.992, 1.3 / (i * 0.5 + 1), (0.3 * v) / (i + 1), { at, a: 0.001 });
      });
      this.noise(0.04, 0.5 * v, { at, f0: 4000, q: 1 });
    };
    hit(0, 1); hit(0.26, 0.5); hit(0.42, 0.28); hit(0.53, 0.14);
  }

  bonk() {
    if (!this.ready) return;
    this.osc('triangle', 620, 180, 0.13, 0.7, { a: 0.001 });
    this.noise(0.05, 0.4, { f0: 1600 });
  }

  slap() {
    if (!this.ready) return;
    this.noise(0.09, 1, { type: 'highpass', f0: 1400, q: 0.3, a: 0.001 });
    this.noise(0.05, 0.8, { f0: 3000, q: 0.8, a: 0.001, at: 0.008 });
    this.osc('sine', 210, 70, 0.1, 0.8, { a: 0.001 });
  }

  whiff() { if (this.ready) this.noise(0.2, 0.35, { f0: 600, f1: 2200, q: 1.5, a: 0.04 }); }

  boing(big = false) {
    if (!this.ready) return;
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
    o.connect(g); g.connect(this.master);
    o.start(t); lfo.start(t); o.stop(t + dur + 0.1); lfo.stop(t + dur + 0.1);
  }

  squeak() {
    if (!this.ready) return;
    const f = rand(1050, 1500);
    this.osc('sine', f, f * 1.5, 0.07, 0.09);
    this.osc('sine', f * 1.45, f, 0.06, 0.07, { at: 0.06 });
  }

  quack() {
    if (!this.ready) return;
    const c = this.ctx, t = c.currentTime;
    const f = c.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 1150; f.Q.value = 4;
    const g = c.createGain();
    this.env(g, t, 0.01, 0.9, 0.17);
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(430, t);
    o.frequency.exponentialRampToValueAtTime(235, t + 0.17);
    o.connect(f); f.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 0.25);
  }

  bark() {
    if (!this.ready) return;
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
      o.connect(f); f.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + 0.2);
    });
  }

  planeFlyby() {
    if (!this.ready) return;
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
    o.connect(f); f.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 3.5);
  }

  explosion() {
    if (!this.ready) return;
    this.noise(0.7, 1, { type: 'lowpass', f0: 1800, f1: 90, q: 0.6, out: this.crunch });
    this.osc('sine', 120, 28, 0.7, 0.9);
  }

  sadTrombone() {
    if (!this.ready) return;
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
      o.connect(fl); fl.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + d + 0.02);
    }
  }

  bing() {
    if (!this.ready) return;
    this.osc('sine', 1318, 1318, 0.5, 0.25);
    this.osc('sine', 1975, 1975, 0.7, 0.2, { at: 0.11 });
  }

  bong() {
    if (!this.ready) return;
    this.osc('sine', 196, 190, 1.3, 0.7, { a: 0.003 });
    this.osc('sine', 523, 515, 0.8, 0.25, { a: 0.003 });
    this.osc('sine', 1041, 1030, 0.4, 0.12, { a: 0.003 });
  }

  tick() { if (this.ready) this.osc('square', 1900, 1500, 0.035, 0.18, { a: 0.001 }); }
  click() { if (this.ready) this.osc('square', 760, 500, 0.03, 0.12, { a: 0.001 }); }

  dry() { if (this.ready) this.osc('square', 300, 240, 0.05, 0.14, { a: 0.001 }); }

  dash() { if (this.ready) this.noise(0.2, 0.55, { f0: 400, f1: 3000, q: 1, a: 0.01 }); }

  land() { if (this.ready) { this.osc('sine', 130, 50, 0.13, 0.5); this.noise(0.05, 0.2, { type: 'lowpass', f0: 900 }); } }

  reload() {
    if (!this.ready) return;
    [0, 0.15, 0.3].forEach((at) => this.noise(0.03, 0.4, { at, f0: 3200, q: 3 }));
    this.osc('sawtooth', 300, 840, 0.3, 0.13, { at: 0.5 });
  }

  chomp() {
    if (!this.ready) return;
    [0, 0.11, 0.22].forEach((at) => this.noise(0.07, 0.45, { at, type: 'lowpass', f0: 1800, q: 3 }));
  }

  sparkle() {
    if (!this.ready) return;
    [1568, 2093, 2637, 3136, 4186].forEach((f, i) => this.osc('sine', f, f, 0.32, 0.13, { at: i * 0.06 }));
  }

  // 발사음
  shoot(w, remote = false, ultra = false) {
    if (!this.ready) return;
    const v = remote ? 0.55 : 1;
    if (w === 'laser') this.laser();
    else if (w === 'fart') this.fart(undefined, ultra ? rand(110, 160) : undefined, 0.5 * v);
    else if (w === 'six7') {
      this.noise(0.08, 0.95 * v, { f0: 2200, q: 0.6, a: 0.001 });
      this.osc('square', 130, 62, 0.16, 0.6 * v, { a: 0.002, out: this.crunch });
      const six = (this._six = !this._six);
      this.osc('sawtooth', six ? 660 : 494, six ? 620 : 440, 0.1, 0.16 * v, { at: 0.03 });
    } else if (w === 'boom') {
      this.vineBoom();
      this.noise(0.14, 0.9 * v, { type: 'lowpass', f0: 4000, f1: 500, a: 0.001 });
    }
  }

  laser() {
    if (!this.ready) return;
    this.osc('sawtooth', 1700, 900, 0.09, 0.14, { a: 0.002 });
    this.osc('square', 2600, 2100, 0.05, 0.05, { a: 0.002 });
  }

  meow() {
    if (!this.ready) return;
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
    o.connect(f); f.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 0.5);
  }

  scratch() {
    if (!this.ready) return;
    this.noise(0.07, 0.5, { f0: rand(2500, 4000), f1: rand(700, 1200), q: 2, a: 0.002 });
  }

  tungTung() {
    if (!this.ready) return;
    this.osc('triangle', 330, 150, 0.14, 1, { a: 0.001, out: this.crunch });
    this.noise(0.03, 0.6, { f0: 1300, q: 3, a: 0.001 });
    this.osc('sine', 95, 45, 0.3, 0.8);
  }

  // 변기 물 내려가는 소리
  flush(ms = 5000) {
    if (!this.ready) return;
    const d = ms / 1000;
    this.noise(d, 0.65, { f0: 2600, f1: 240, q: 1.2, a: 0.25 });
    this.noise(d * 0.7, 0.3, { type: 'lowpass', f0: 500, f1: 140, q: 3, a: 0.3 });
    for (let i = 0; i < 9; i++) this.osc('sine', rand(300, 700), rand(700, 1500), 0.07, 0.13, { at: rand(0.2, d) });
  }

  // 핵 떨어지기 전: 불안하게 올라가는 현악기 무리
  nukeWind(ms = 2600) {
    if (!this.ready) return;
    const d = ms / 1000, c = this.ctx, t = c.currentTime;
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(500, t);
    f.frequency.exponentialRampToValueAtTime(4200, t + d);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.42, t + d * 0.96);
    g.gain.setValueAtTime(0.0001, t + d);
    f.connect(g); g.connect(this.master);
    const trem = c.createOscillator();
    trem.frequency.value = 11;
    const tg = c.createGain();
    tg.gain.value = 0.12;
    trem.connect(tg); tg.connect(g.gain);
    trem.start(t); trem.stop(t + d);
    for (const base of [110, 111.5, 165, 220.7, 330]) {
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(base, t);
      o.frequency.exponentialRampToValueAtTime(base * 2.6, t + d);
      o.connect(f);
      o.start(t); o.stop(t + d);
    }
  }

  // 핵: 묵직하게 오래 간다
  nukeBoom() {
    if (!this.ready) return;
    this.noise(5.5, 1, { type: 'lowpass', f0: 2400, f1: 45, q: 0.5, a: 0.03, out: this.crunch });
    this.osc('sine', 90, 19, 5.5, 1, { out: this.crunch });
    this.osc('triangle', 55, 22, 6.5, 0.8);
  }

  // 눈깔 튀어나오는 소리
  eyePop(big) {
    this.boing(big);
    if (big && this.ready) this.osc('sine', 1400, 300, 0.05, 0.5, { a: 0.001, at: 0.02 });
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
    setTimeout(() => bus.disconnect(), 300);
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
      const v = this.voices.find((x) => x.lang === lang) ?? this.voices.find((x) => x.lang.startsWith(lang.slice(0, 2)));
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

const SONGS = {
  // 대기실: 멍청한 엘리베이터 음악
  lobby: {
    bpm: 112,
    gain: 0.9,
    play(s, step, t, out, sd) {
      const melody = [72, 0, 76, 79, 0, 76, 72, 0, 74, 0, 77, 81, 0, 77, 74, 0, 71, 0, 74, 79, 0, 74, 71, 0, 72, 76, 79, 84, 79, 76, 72, 0];
      const bass = [48, 48, 55, 55, 50, 50, 57, 57];
      const m = melody[step % melody.length];
      if (m) s.note('triangle', NOTE(m), t, sd * 1.4, 0.26, out);
      if (step % 4 === 0) s.note('sine', NOTE(bass[(step / 4) % 8] - 12), t, sd * 2.6, 0.5, out);
      if (step % 4 === 2) s.hat(t, 0.1, out);
    },
  },
  // 전투: 쫓기는 듯한 8비트
  battle: {
    bpm: 168,
    gain: 0.75,
    play(s, step, t, out, sd) {
      const bass = [40, 40, 52, 40, 40, 52, 40, 43, 45, 45, 57, 45, 43, 43, 55, 42];
      const lead = [76, 0, 0, 79, 0, 0, 83, 0, 82, 0, 79, 0, 76, 0, 74, 0];
      s.note('sawtooth', NOTE(bass[step % 16]), t, sd * 0.85, 0.24, out);
      if (step % 64 >= 32 && lead[step % 16]) s.note('square', NOTE(lead[step % 16]), t, sd * 0.8, 0.09, out);
      if (step % 4 === 0) s.note('sine', 150, t, 0.1, 0.8, out, 45);
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
