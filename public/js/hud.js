// 경기 화면 위 DOM 연출 전부. 이름 같은 값은 textContent로만 넣는다.
import { AURA_MAX, WEAPONS } from '../shared/constants.js';
import { t } from './i18n.js';
import { lines, pick } from './memes.js';
import { faceEl } from './portraits.js';

const $ = (id) => document.getElementById(id);

export class Hud {
  constructor() {
    this.names = new Map();
    this.el = {
      root: $('hud'), hpBar: $('hpBar'), hpText: $('hpText'), auraBar: $('auraBar'), auraText: $('auraText'),
      chips: $('scoreChips'), timer: $('timer'),
      weapon: $('weaponName'), ammo: $('ammo'), reload: $('reloadText'), cross: $('crosshair'), hit: $('hitmarker'),
      big: $('bigCount'), feed: $('killfeed'), shout: $('shout'), aura: $('auraPops'), eyes: $('bigEyes'),
      vignette: $('vignette'), lock: $('lockHint'), cut: $('killCut'), cutText: $('killCutText'), death: $('death'),
      deathLine: $('deathLine'), deathBy: $('deathBy'), deathBar: $('deathBar'), event: $('eventBanner'),
      ultra: $('ultraFrame'), ultraLabel: $('ultraLabel'), ultraReady: $('ultraReady'), claws: $('claws'), grab: $('grabFace'),
      charm: $('charmFx'), slow: $('slowFx'), oppen: $('oppen'), oppenBy: $('oppenBy'), flash: $('nukeFlash'), rain: $('rain'), dir: $('damageDir'), six: $('sixSeven'),
    };
    this.prev = {};
  }

  show(v) { this.el.root.hidden = !v; }

  reset() {
    this.prev = {};
    this.el.feed.replaceChildren();
    this.el.aura.replaceChildren();
    this.el.event.hidden = true;
    this.el.death.hidden = true;
    this.el.cut.hidden = true;
    this.el.vignette.className = '';
    document.getElementById('hudGameLayer').hidden = false;
    this.setUltra(false);
    this.setGrabbed(false);
    this.setCharm(0);
    this.setSlow(0);
    this.el.oppen.hidden = true;
    this.el.chips.replaceChildren();
    this.show(true);
  }

  setFace(skin) {
    const box = $('hudFace');
    box.replaceChildren();
    if (skin) box.append(faceEl(skin, 'hudPortrait'));
  }

  setLockHint(v) { this.el.lock.hidden = !v; }

  setWeapon(w) {
    this.el.weapon.textContent = t(`weapon.${w.id}`);
    this.restart(this.el.weapon, 'wobble');
  }

  restart(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  setText(key, el, value) {
    if (this.prev[key] === value) return;
    this.prev[key] = value;
    el.textContent = value;
  }

  update(g) {
    const e = this.el;
    const hp = Math.max(0, g.hp);
    if (this.prev.hp !== hp) {
      this.prev.hp = hp;
      e.hpBar.style.width = `${hp}%`;
      e.hpBar.classList.toggle('low', hp <= 33.5);
      e.hpText.textContent = t('hud.sanity', { n: Math.ceil(hp * 10) / 10 });
    }
    if (this.prev.aura !== g.aura) {
      this.prev.aura = g.aura;
      e.auraBar.style.width = `${(g.aura / AURA_MAX) * 100}%`;
      e.auraText.textContent = `AURA ${g.aura.toLocaleString()} / ${AURA_MAX.toLocaleString()}`;
      const full = g.aura >= AURA_MAX;
      e.ultraReady.hidden = !full;
      if (full) e.ultraReady.textContent = t('hud.ultraReady', { name: t(`ultra.${g.me?.skinId}`) });
      e.auraBar.classList.toggle('full', full);
    }
    this.renderScores(g);
    const s = Math.ceil(g.timeLeft / 1000);
    this.setText('timer', e.timer, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
    const w = WEAPONS[g.weapon];
    this.setText('ammo', e.ammo, g.infAmmo() ? '∞ / 6767' : `${g.ammo[w.id]} / ${w.mag}`);
    const rel = g.reloadT > 0;
    if (this.prev.rel !== rel) {
      this.prev.rel = rel;
      e.reload.hidden = !rel;
      if (rel) e.reload.textContent = pick(lines('reload'));
    }
    const hideCross = !!g.emote || !g.alive || g.forced;
    if (this.prev.hideCross !== hideCross) {
      this.prev.hideCross = hideCross;
      e.cross.hidden = hideCross;
    }
    const spread = (g.zoom ? 4 : 10) + (Math.hypot(g.body.vx, g.body.vz) > 2 ? 6 : 0) + g.recoil * 8;
    if (Math.abs((this.prev.spread ?? 0) - spread) > 0.4) {
      this.prev.spread = spread;
      e.cross.style.setProperty('--gap', `${spread}px`);
    }
  }

  // 위쪽 점수판: 킬 순서대로
  renderScores(g) {
    const rows = [...g.scores].sort((a, b) => b.k - a.k);
    const key = rows.map((r) => `${r.id}:${r.k}`).join(',');
    if (this.prev.scores === key) return;
    this.prev.scores = key;
    this.el.chips.replaceChildren(...rows.map((r) => {
      const chip = document.createElement('div');
      chip.className = `chip${r.id === g.myId ? ' me' : ''}`;
      const n = document.createElement('span');
      n.textContent = this.names.get(r.id) ?? '???';
      const b = document.createElement('b');
      b.textContent = r.k;
      const skin = g.chars.get(r.id)?.skinId;
      if (skin) chip.append(faceEl(skin, 'chipFace'));
      chip.append(n, b);
      return chip;
    }));
  }

  hitmarker(head) {
    const el = this.el.hit;
    el.classList.toggle('head', !!head);
    this.restart(el, 'show');
  }

  flashHpLoss() { this.restart(this.el.hpBar.parentElement, 'jolt'); }

  // 맞으면 내 화면 양쪽에서 눈깔이 튀어나온다
  eyePop(big) {
    const el = this.el.eyes;
    el.classList.toggle('big', !!big);
    this.restart(el, 'pop');
    this.restart(this.el.vignette, 'hurt');
  }

  damageDir(angle) {
    const d = this.el.dir;
    d.style.setProperty('--a', `${angle}rad`);
    this.restart(d, 'show');
  }

  bigCount(text) {
    const el = this.el.big;
    el.textContent = text;
    el.hidden = !text;
    if (text) this.restart(el, 'stamp');
  }

  shout(text, tone = 'gold') {
    const el = this.el.shout;
    el.textContent = text;
    el.dataset.tone = tone;
    this.restart(el, 'show');
  }

  sixSeven() {
    const el = this.el.six;
    el.textContent = (this.sixFlag = !this.sixFlag) ? '6' : '7';
    el.style.setProperty('--x', `${Math.random() * 60 - 30}px`);
    this.restart(el, 'show');
  }

  auraPop(delta, reason) {
    const el = document.createElement('div');
    el.className = `aurapop ${delta >= 0 ? 'up' : 'down'}`;
    el.textContent = `${delta >= 0 ? '+' : ''}${delta.toLocaleString()} AURA`;
    if (reason) {
      const r = document.createElement('small');
      r.textContent = t(`aura.${reason}`);
      el.append(r);
    }
    el.style.setProperty('--r', `${Math.random() * 14 - 7}deg`);
    this.el.aura.append(el);
    setTimeout(() => el.remove(), 1500);
  }

  killFeed(m, killer, victim) {
    const row = document.createElement('div');
    row.className = 'feed';
    const a = document.createElement('b');
    a.textContent = killer;
    const w = document.createElement('span');
    w.textContent = ` ${t(`label.${m.weapon}`)}${m.head ? ' 🎯' : ''} `;
    const v = document.createElement('b');
    v.textContent = victim;
    row.append(a, w, v);
    this.el.feed.prepend(row);
    while (this.el.feed.children.length > 5) this.el.feed.lastChild.remove();
    setTimeout(() => row.remove(), 5500);
  }

  killCutIn(line, head) {
    const c = this.el.cut;
    this.el.cutText.textContent = line;
    c.hidden = false;
    c.classList.toggle('head', !!head);
    this.restart(c, 'play');
    clearTimeout(this.cutTimer);
    this.cutTimer = setTimeout(() => { c.hidden = true; }, 1050);
  }

  deathScreen(line, killer, weapon, ms) {
    const e = this.el;
    e.death.hidden = false;
    e.deathLine.textContent = line;
    e.deathBy.textContent = weapon === 'fall' ? t('hud.deathFall') : t('hud.deathBy', { name: killer, weapon: t(`label.${weapon}`) });
    e.deathBar.style.transition = 'none';
    e.deathBar.style.width = '100%';
    void e.deathBar.offsetWidth;
    e.deathBar.style.transition = `width ${ms}ms linear`;
    e.deathBar.style.width = '0%';
  }

  hideDeath() { this.el.death.hidden = true; }

  eventBanner(name, ms) {
    const e = this.el.event;
    clearTimeout(this.eventTimer);
    if (!name) { e.hidden = true; return; }
    e.textContent = name;
    e.hidden = false;
    this.restart(e, 'stamp');
    this.eventTimer = setTimeout(() => { e.hidden = true; }, ms);
  }

  // 고양이에게 할퀴일 때 화면에 긁힌 자국
  claws() {
    const s = document.createElement('i');
    s.style.left = `${10 + Math.random() * 62}%`;
    s.style.top = `${8 + Math.random() * 50}%`;
    s.style.setProperty('--r', `${Math.random() * 60 - 30}deg`);
    this.el.claws.append(s);
    while (this.el.claws.children.length > 14) this.el.claws.firstChild.remove();
    setTimeout(() => s.remove(), 1100);
  }

  setGrabbed(on) {
    this.el.grab.hidden = !on;
    if (!on) this.el.claws.replaceChildren();
  }

  setCharm(ms) {
    clearTimeout(this.charmTimer);
    this.el.charm.hidden = !ms;
    if (ms) this.charmTimer = setTimeout(() => { this.el.charm.hidden = true; }, ms);
  }

  setSlow(ms) {
    clearTimeout(this.slowTimer);
    this.el.slow.hidden = !ms;
    if (ms) this.slowTimer = setTimeout(() => { this.el.slow.hidden = true; }, ms);
  }

  oppenheimer(ms, by) {
    const e = this.el;
    e.oppenBy.textContent = by ? t('hud.nukeOther', { name: by }) : t('hud.nukeMine');
    e.oppen.hidden = false;
    clearTimeout(this.oppenTimer);
    this.oppenTimer = setTimeout(() => { e.oppen.hidden = true; }, ms);
  }

  nukeFlash() {
    this.el.oppen.hidden = true;
    this.restart(this.el.flash, 'show');
  }

  setUltra(on, ms, name, color) {
    this.el.ultra.hidden = !on;
    if (name) this.el.ultraLabel.textContent = name;
    if (color !== undefined) this.el.ultra.style.setProperty('--u', `#${color.toString(16).padStart(6, '0')}`);
    clearTimeout(this.ultraTimer);
    if (on) {
      this.ultraTimer = setTimeout(() => { this.el.ultra.hidden = true; }, ms);
      const bar = $('ultraTime');
      bar.style.transition = 'none';
      bar.style.transform = 'scaleX(1)';
      void bar.offsetWidth;
      bar.style.transition = `transform ${ms}ms linear`;
      bar.style.transform = 'scaleX(0)';
    }
  }

  rain(items, n = 30) {
    const box = this.el.rain;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.textContent = pick(items);
      s.style.left = `${Math.random() * 100}%`;
      s.style.fontSize = `${24 + Math.random() * 64}px`;
      s.style.animationDuration = `${1 + Math.random() * 1.3}s`;
      s.style.animationDelay = `${Math.random() * 0.5}s`;
      box.append(s);
      setTimeout(() => s.remove(), 3000);
    }
  }
}

