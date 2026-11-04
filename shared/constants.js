// 서버·클라이언트가 같이 쓰는 숫자들. 전부 6과 7에 집착한다.
export const PORT = 6767;
export const TICK_HZ = 30;
export const MAX_HP = 100;
export const WIN_KILLS = 7;
export const MATCH_SECONDS = 367; // 6분 7초
export const AURA_MAX = 6767;
export const MAX_PLAYERS = 4;
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
// 민수 각성 전용 무기
export const LASER = { id: 'laser', slot: 0, name: '눈깔 레이저', emoji: '👁️', body: 8, head: 16, interval: 0.1, mag: 1, reload: 0, spread: 0, pellets: 1, range: 120, auto: true };
export const SLAP = { damage: 67, range: 3.4, cooldown: 0.8, knock: 19 };

export const AURA = {
  hitBody: 67, hitHead: 676, kill: 1000, death: -1000, fell: -2000,
  farmPerSec: 420, farmInterrupted: -676, sixSeven: 67, orb: 1676,
};

export const CHICKEN_HEAL = 34;
export const BOMB = { radius: 5, damage: 45, knock: 16, fuseMs: 2000 };

export const NUKE = { radius: 20, damage: 220, knock: 30, fuseMs: 2600, aimRange: 70 };
export const CAT = { flySpeed: 38, latchRange: 1.3, tickMs: 150, damage: 6.7 };
export const FLUSH = { radius: 17, coreRadius: 3.5, pull: 9, tickMs: 200, damage: 10 };

// 스킨마다 다른 각성
export const ULTRAS = {
  minsu: { name: '눈깔 레이저', ms: 6700, desc: '6.7초간 눈에서 레이저. 탄창 무한' },
  sigma: { name: '시그마 각성', ms: 6700, desc: '이동 1.4배, 데미지 1.67배, 탄창 무한' },
  cat: { name: '냥냥 급습', ms: 6700, desc: '벽 뚫고 날아가 얼굴에 붙어 할큄. 맞는 쪽은 F로 떼어냄' },
  cone: { name: '오펜하이머', ms: 2600, desc: '조준한 곳에 핵. 2.6초 뒤 터짐. 벽 뒤면 절반' },
  toilet: { name: '대물내림', ms: 5000, desc: '5초간 주변을 빨아들이고 코앞이면 갈아버림' },
};

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
