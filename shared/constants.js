// 서버·클라이언트가 같이 쓰는 숫자들. 전부 6과 7에 집착한다.
export const PORT = 6767;
export const TICK_HZ = 30;
export const MAX_HP = 100;
// 데스매치: 킬 목표 없이 5분 동안 제일 많이 죽인 사람이 이긴다
export const MATCH_SECONDS = 300;
export const AURA_MAX = 6767;
export const MAX_PLAYERS = 6;
// 경기 방식. rush: 아우라 3배, 반쯤 찬 채로 시작
export const MODES = { classic: {}, rush: { auraMul: 3, auraStart: 0.45 } };
export const MODE_IDS = Object.keys(MODES);
export const INTERP_MS = 100;

export const PLAYER = { radius: 0.45, height: 1.8, eye: 1.55 };
export const MOVE = {
  speed: 9.5, jump: 10.5, doubleJump: 9.5, gravity: 25,
  dashSpeed: 27, dashTime: 0.17, dashCooldown: 2.2, ultraSpeedMul: 1.4,
};

// 주무기 하나 + 보조무기 하나를 대기실에서 고른다
export const WEAPONS = {
  fart: {
    id: 'fart', slot: 'primary', name: '방귀 기관총',
    body: 6.7, head: 13.4, interval: 0.1, mag: 67, reload: 1.67,
    spread: 0.016, pellets: 1, range: 90, auto: true,
  },
  boom: {
    id: 'boom', slot: 'primary', name: '바인붐 샷건',
    body: 8, head: 13, interval: 0.85, mag: 6, reload: 1.5,
    spread: 0.07, pellets: 9, range: 32, auto: false,
  },
  // 저격총: 머리 한 방. 우클릭 조준경에서만 정확하다
  sniper: {
    id: 'sniper', slot: 'primary', name: '모깅 저격총',
    body: 67, head: 167, interval: 1.15, mag: 5, reload: 2.1,
    spread: 0.05, zoomSpread: 0, zoomFov: 22, pellets: 1, range: 220, auto: false,
  },
  // 드라이아이스 런처: 맞은 자리에서 터져 주변을 얼리고 느리게 만든다
  ice: {
    id: 'ice', slot: 'primary', name: '드라이아이스 런처',
    body: 28, head: 28, interval: 0.8, mag: 4, reload: 1.9,
    spread: 0.006, pellets: 1, range: 70, auto: false,
    splash: { radius: 4, damage: 38, slowMs: 1600 },
  },
  six7: {
    id: 'six7', slot: 'secondary', name: '67 리볼버',
    body: 33.5, head: 67, interval: 0.46, mag: 6, reload: 1.3,
    spread: 0.002, pellets: 1, range: 150, auto: false,
  },
  // 쌍권총: 양손 번갈아 빵빵
  dual: {
    id: 'dual', slot: 'secondary', name: '쌍권총',
    body: 10, head: 20, interval: 0.115, mag: 24, reload: 1.45,
    spread: 0.024, pellets: 1, range: 70, auto: true,
  },
};
export const WEAPON_IDS = Object.keys(WEAPONS);
export const PRIMARY_IDS = WEAPON_IDS.filter((id) => WEAPONS[id].slot === 'primary');
export const SECONDARY_IDS = WEAPON_IDS.filter((id) => WEAPONS[id].slot === 'secondary');
export const DEFAULT_LOADOUT = { p: 'fart', s: 'six7' };
export function cleanLoadout(l) {
  return {
    p: PRIMARY_IDS.includes(l?.p) ? l.p : DEFAULT_LOADOUT.p,
    s: SECONDARY_IDS.includes(l?.s) ? l.s : DEFAULT_LOADOUT.s,
  };
}
// 민수 각성 전용 무기
export const LASER = { id: 'laser', slot: 0, name: '눈깔 레이저', emoji: '👁️', body: 6.7, head: 13.4, interval: 0.1, mag: 1, reload: 0, spread: 0, pellets: 1, range: 120, auto: true, pierce: true };
export const SLAP = { damage: 67, range: 3.4, cooldown: 0.8, knock: 19 };

export const AURA = {
  hitBody: 67, hitHead: 676, kill: 1000, death: -1000, fell: -2000,
  farmPerSec: 420, farmInterrupted: -676, sixSeven: 67, orb: 1676,
};

export const CHICKEN_HEAL = 34;
export const BOMB = { radius: 5, damage: 45, knock: 16, fuseMs: 2000 };

export const NUKE = { radius: 20, damage: 220, knock: 30, fuseMs: 2600, aimRange: 70 };
export const FALLOUT = { radius: 13, ms: 6700, tickMs: 670, damage: 6.7 };
export const SIGMA = { killExtendMs: 2000, killHeal: 34 };
// 고양이: 총알을 안 맞고 순식간에 덮친다. 덮칠 때 한 방, 붙어서 할퀴기. 싸대기 맞으면 튕겨서 다른 놈에게
export const CAT = { flySpeed: 75, latchRange: 1.3, tickMs: 150, damage: 8, pounce: 20, auraSteal: 67, slapStunMs: 600, slapDamage: 20 };
export const BARK = { range: 16, cone: 0.6, tickMs: 800, damage: 24, knock: 22, finalKnock: 44, finalDamage: 40, count: 6 };
export const HERO = { flySpeed: 60, hits: 3, range: 1.5, damage: [45, 60, 90], knock: 28, splashRadius: 6, splashDamage: 18 };
export const CHILL = { radius: 18, slowMul: 0.4, regenPerSec: 13, reflect: 0.5 };
export const TUNG = { radius: 8, radiusStep: 1, finalRadius: 17, tickMs: 670, damage: 17, finalDamage: 40, knock: 12, finalKnock: 26, count: 7 };
export const RIZZ = { radius: 26, kissRange: 2.6, tickMs: 250, damage: 6.7, auraDrain: 100, heal: 3 };
// 새 캐릭터 4명
export const PEEL = { count: 6, everyMs: 700, radius: 1.7, damage: 30, slowMs: 1500, lifeMs: 10000 };
export const PEDRO = { radius: 22, tickMs: 500, damage: 7 };
export const MEW = { range: 32, cone: 0.88, tickMs: 300, damage: 9, auraDrain: 60 };
export const SPIN = { radius: 2.9, tickMs: 250, damage: 13, knock: 18, speedMul: 1.55 };
export const FLUSH = { radius: 17, coreRadius: 3.5, pull: 9, tickMs: 200, damage: 10, geyserRadius: 14, geyserDamage: 30, geyserUp: 24 };

// 스킨마다 다른 각성
export const ULTRAS = {
  minsu: { name: '눈깔 레이저', ms: 6700, desc: '6.7초간 벽까지 뚫는 레이저. 벽 뒤 상대도 보임' },
  sigma: { name: '시그마 각성', ms: 6700, desc: '이동 1.4배, 데미지 1.67배, 안 밀림. 킬마다 시간 연장과 회복' },
  cat: { name: '냥냥 급습', ms: 6700, desc: '총알 무시하고 덮쳐서 할퀴고 아우라 강탈. 싸대기 맞으면 튕겨서 다음 놈에게' },
  cone: { name: '핵 모드', ms: 2600, desc: '조준한 곳에 핵. 터진 뒤 방사능 지대가 남음' },
  toilet: { name: '대물내림', ms: 5000, desc: '5초간 빨아들이고, 끝날 때 물기둥으로 다 띄움' },
  streamer: { name: '짖기 방송', ms: 4800, desc: '빨리 달리며 6번 짖기. 마지막은 사방으로 터지는 샤우팅' },
  tung: { name: '사후르 타임', ms: 4700, desc: '점점 커지는 충격파 7번. 7번째 사후르가 제일 큼' },
  hero: { name: '메가 펀치', ms: 5000, desc: '무적 상태로 셋을 관통. 때릴수록 세지고 주변까지 터짐' },
  rizz: { name: '리즈 매혹', ms: 3500, desc: '상대가 걸어오고 공격 못 함. 가까이 오면 아우라와 체력을 뺏음' },
  chill: { name: '완전 칠함', ms: 5000, desc: '5초간 무적에 체력 회복. 쏜 총알은 되돌아감. 주변은 느려짐' },
  banana: { name: '바나나 폭격', ms: 4200, desc: '앞으로 바나나 껍질 6개를 뿌림. 밟으면 미끄러져 날아가고 느려짐' },
  pedro: { name: '페드로 댄스', ms: 4000, desc: '주변 전원 강제로 춤춤. 춤추는 동안 공격 못 하고 체력이 깎임' },
  mew: { name: '모깅', ms: 5000, desc: '턱선 광선. 바라보는 상대의 체력과 아우라를 계속 뺏음' },
  ballerina: { name: '카푸치노 회전', ms: 5000, desc: '빙글빙글 빠르게 돌며 닿는 놈을 갈아버리고 튕겨냄' },
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
  streamer: { name: '짖는 스트리머', skin: 0x6e4426, shirt: 0xd81e2c },
  tung: { name: '퉁퉁퉁 사후르', skin: 0xa8743f, shirt: 0x8f5f30 },
  hero: { name: '메가브로', skin: 0xf2c6a0, shirt: 0xe8342c },
  rizz: { name: '리즈왕', skin: 0xf2c6a0, shirt: 0xff3d9a },
  chill: { name: '칠가이', skin: 0xb98d62, shirt: 0x8b9099 },
  banana: { name: '바나나 고양이', skin: 0xf4f1ea, shirt: 0xffd83a },
  pedro: { name: '페드로 너구리', skin: 0x8e8e98, shirt: 0x6a6a74 },
  mew: { name: '뮤잉남', skin: 0xe8b48c, shirt: 0x1a1a1f },
  ballerina: { name: '발레리나 카푸치나', skin: 0xf5d6c0, shirt: 0xff8fc1 },
};
export const SKIN_IDS = Object.keys(SKINS);

export const DEFAULT_TIMINGS = {
  countdownMs: 3000, respawnMs: 2600, invulnMs: 1200, resultsMs: 6700,
  pickupRespawnMs: 20000, eventFirstMs: 25000, eventGapMs: 32000,
};
