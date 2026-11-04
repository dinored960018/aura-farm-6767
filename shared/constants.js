// 서버·클라이언트가 같이 쓰는 숫자들. 전부 6과 7에 집착한다.
export const PORT = 6767;
export const TICK_HZ = 30;
export const MAX_HP = 100;
export const WIN_KILLS = 7;
export const MATCH_SECONDS = 367; // 6분 7초
export const AURA_MAX = 6767;
export const ULTRA_MS = 6700;
export const INTERP_MS = 100;

export const PLAYER = { radius: 0.45, height: 1.8, eye: 1.55 };
export const MOVE = {
  speed: 9.5, jump: 10.5, doubleJump: 9.5, gravity: 25,
  dashSpeed: 27, dashTime: 0.17, dashCooldown: 2.2, ultraSpeedMul: 1.4,
};

export const WEAPONS = {
  fart: {
    id: 'fart', slot: 1, name: '방귀 기관총', emoji: '💨',
    body: 6.7, head: 13.4, interval: 0.1, mag: 67, reload: 1.67,
    spread: 0.016, pellets: 1, range: 90, auto: true,
  },
  six7: {
    id: 'six7', slot: 2, name: '67 리볼버', emoji: '🤌',
    body: 33.5, head: 67, interval: 0.46, mag: 6, reload: 1.3,
    spread: 0.002, pellets: 1, range: 150, auto: false,
  },
  boom: {
    id: 'boom', slot: 3, name: '바인붐 샷건', emoji: '📢',
    body: 8, head: 13, interval: 0.85, mag: 6, reload: 1.5,
    spread: 0.07, pellets: 9, range: 32, auto: false,
  },
};
export const WEAPON_IDS = Object.keys(WEAPONS);
export const SLAP = { damage: 67, range: 3.4, cooldown: 0.8, knock: 19 };

export const AURA = {
  hitBody: 67, hitHead: 676, kill: 1000, death: -1000, fell: -2000,
  farmPerSec: 420, farmInterrupted: -676, sixSeven: 67, orb: 1676,
};

export const CHICKEN_HEAL = 34;
export const BOMB = { radius: 5, damage: 45, knock: 16, fuseMs: 2000 };

export const EVENTS = {
  dogfight: { name: '🐶✈️ 봄바르디로 도기로 공습!!', ms: 7000, say: 'Bombardiro Doggilo' },
  sixseven: { name: '6️⃣7️⃣ 67 타임: 모든 데미지 67', ms: 6700, say: 'six seven, six seven' },
  bighead: { name: '🗿 대두 시대: 머리 판정 대폭발', ms: 13000, say: '대두 시대' },
  moon: { name: '🌙 오하이오 저중력', ms: 13000, say: 'only in ohio' },
};
export const EVENT_IDS = Object.keys(EVENTS);

export const SKINS = {
  minsu: { name: '민수', skin: 0xffd23f, shirt: 0x2f6df6 },
  sigma: { name: '시그마', skin: 0xb9b9c4, shirt: 0x1c1c22 },
  cat: { name: '킹받는 고양이', skin: 0xff9a3c, shirt: 0xf5f5f5 },
  cone: { name: '오하이오 주민', skin: 0x7fdc5a, shirt: 0x8a3ffc },
  toilet: { name: '변기맨', skin: 0xffc6a8, shirt: 0xffffff },
};
export const SKIN_IDS = Object.keys(SKINS);

export const DEFAULT_TIMINGS = {
  countdownMs: 3000, respawnMs: 2600, invulnMs: 1200, resultsMs: 6700,
  pickupRespawnMs: 20000, eventFirstMs: 25000, eventGapMs: 32000,
};
