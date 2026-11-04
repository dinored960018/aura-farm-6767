// 경기 화면 위 DOM 연출 전부. 이름 같은 값은 textContent로만 넣는다.
import { AURA_MAX, WEAPONS, WIN_KILLS } from '/shared/constants.js';
import { WEAPON_LABEL, pick } from './memes.js';

const $ = (id) => document.getElementById(id);

export class Hud {
  constructor() {
    this.names = new Map();
    this.el = {
      root: $('hud'), hpBar: $('hpBar'), hpText: $('hpText'), auraBar: $('auraBar'), auraText: $('auraText'),
      scoreMe: $('scoreMe'), scoreEnemy: $('scoreEnemy'), nameMe: $('nameMe'), nameEnemy: $('nameEnemy'), timer: $('timer'),
      weapon: $('weaponName'), ammo: $('ammo'), reload: $('reloadText'), cross: $('crosshair'), hit: $('hitmarker'),
      big: $('bigCount'), feed: $('killfeed'), shout: $('shout'), aura: $('auraPops'), eyes: $('bigEyes'),
      vignette: $('vignette'), lock: $('lockHint'), cut: $('killCut'), cutText: $('killCutText'), death: $('death'),
      deathLine: $('deathLine'), deathBy: $('deathBy'), deathBar: $('deathBar'), event: $('eventBanner'),
      ultra: $('ultraFrame'), ultraReady: $('ultraReady'), rain: $('rain'), dir: $('damageDir'), six: $('sixSeven'),
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
    this.show(true);
  }

  setNames(me, enemy) {
    this.el.nameMe.textContent = me;
    this.el.nameEnemy.textContent = enemy;
  }

  setLockHint(v) { this.el.lock.hidden = !v; }

  setWeapon(w) {
    this.el.weapon.textContent = `${w.emoji} ${w.name}`;
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
      e.hpText.textContent = `정신력 ${Math.ceil(hp * 10) / 10}`;
    }
    if (this.prev.aura !== g.aura) {
      this.prev.aura = g.aura;
      e.auraBar.style.width = `${(g.aura / AURA_MAX) * 100}%`;
      e.auraText.textContent = `AURA ${g.aura.toLocaleString()} / ${AURA_MAX.toLocaleString()}`;
      const full = g.aura >= AURA_MAX;
      e.ultraReady.hidden = !full;
      e.auraBar.classList.toggle('full', full);
    }
    this.setText('sm', e.scoreMe, String(g.kills));
    this.setText('se', e.scoreEnemy, String(g.enemyKills));
    const s = Math.ceil(g.timeLeft / 1000);
    this.setText('timer', e.timer, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
    const w = WEAPONS[g.weapon];
    this.setText('ammo', e.ammo, g.ultra ? '∞ / 6767' : `${g.ammo[w.id]} / ${w.mag}`);
    const rel = g.reloadT > 0;
    if (this.prev.rel !== rel) {
      this.prev.rel = rel;
      e.reload.hidden = !rel;
      if (rel) e.reload.textContent = pick(['장전 중 ㅋㅋ', '잠깐만요', '콩콩콩', 'loading...', '총알 사러 감']);
    }
    const hideCross = !!g.emote || !g.alive;
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
      r.textContent = reason;
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
    w.textContent = ` ${WEAPON_LABEL[m.weapon] ?? '❓'}${m.head ? ' 🎯' : ''} `;
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
    e.deathBy.textContent = weapon === 'fall' ? '오하이오로 추락함' : `${killer}의 ${WEAPON_LABEL[weapon] ?? ''}에 눈깔 뽑힘`;
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

  setUltra(on, ms) {
    this.el.ultra.hidden = !on;
    clearTimeout(this.ultraTimer);
    if (on) this.ultraTimer = setTimeout(() => { this.el.ultra.hidden = true; }, ms);
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

export { WIN_KILLS };
