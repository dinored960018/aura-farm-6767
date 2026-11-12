// 사람·봇 공통 플레이어 상태
import { MAX_HP } from '../shared/constants.js';

export class Player {
  constructor(id, name, skin) {
    this.id = id;
    this.name = name;
    this.skin = skin;
    this.isBot = false;
    this.room = null;
    this.ready = false;
    this.wins = 0;
    this.rtt = 0;
    this.resetForMatch();
  }

  resetForMatch() {
    this.pos = [0, 0, 0];
    this.yaw = 0;
    this.pitch = 0;
    this.weapon = 'fart';
    this.emote = 0;
    this.hp = MAX_HP;
    this.aura = 0;
    this.kills = 0;
    this.alive = true;
    this.respawnAt = 0;
    this.invulnUntil = 0;
    this.ultraUntil = 0;
    this.ultraKind = null;
    this.cat = null;
    this.flush = null;
    this.ultraTick = 0;
    this.charmUntil = 0;
    this.charmBy = null;
    this.slowUntil = 0;
    this.lastHitBy = null;
    this.lastHitAt = 0;
    this.lastShot = {};
    this.lastSlap = 0;
    this.lastSixSeven = 0;
    this.movedAt = 0;
    this.history = [];
    this.stats = { shots: 0, hitShots: 0, headshots: 0, damage: 0, deaths: 0, streak: 0, bestStreak: 0, auraEarned: 0, ultras: 0, ultraKills: 0, slapKills: 0 };
  }

  pushHistory(now) {
    this.history.push({ t: now, p: this.pos });
    while (this.history.length > 2 && now - this.history[0].t > 600) this.history.shift();
  }

  // 쏜 사람 화면에 보였던 시점의 위치로 되감는다
  rewound(when) {
    const h = this.history;
    if (h.length === 0) return this.pos;
    if (when <= h[0].t) return h[0].p;
    for (let i = h.length - 1; i > 0; i--) {
      if (h[i - 1].t <= when) {
        const a = h[i - 1], b = h[i];
        if (when >= b.t) return b.p;
        const k = (when - a.t) / (b.t - a.t || 1);
        return [a.p[0] + (b.p[0] - a.p[0]) * k, a.p[1] + (b.p[1] - a.p[1]) * k, a.p[2] + (b.p[2] - a.p[2]) * k];
      }
    }
    return this.pos;
  }

  // 서버가 위치를 정해 줄 때 (고양이 착지)
  teleport(pos) {
    this.pos = [...pos];
    this.history = [];
    this.send({ t: 'teleport', pos: this.pos });
  }

  send() {}
  sendRaw() {}
}
