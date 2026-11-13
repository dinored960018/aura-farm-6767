// 판이 끝날 때마다 코인과 경험치를 쌓는다. 레벨이 오르면 캐릭터가 열리고, 매일 미션 3개가 바뀐다.
// 크레이지게임즈에서는 SDK 저장소(로그인하면 기기 사이에 동기화)에, 아니면 브라우저에 저장한다.
import { SKIN_IDS } from '../shared/constants.js';

const KEY = 'aura-profile-v1';
export const START_SKINS = ['minsu', 'sigma', 'cat', 'toilet'];
export const UNLOCK_LEVEL = { cone: 2, streamer: 3, banana: 3, tung: 4, hero: 5, pedro: 5, rizz: 6, chill: 7, mew: 8, ballerina: 9 };

// 다음 레벨까지 필요한 경험치. 봇전 한 판이 대략 80~150
export const xpNeed = (level) => 120 + (level - 1) * 60;

// key: 경기 기록에서 더할 값
export const MISSIONS = [
  { id: 'kills', key: 'kills', goal: 10, coins: 60 },
  { id: 'heads', key: 'headshots', goal: 6, coins: 60 },
  { id: 'win', key: 'wins', goal: 1, coins: 80 },
  { id: 'play', key: 'matches', goal: 3, coins: 50 },
  { id: 'ultra', key: 'ultras', goal: 2, coins: 60 },
  { id: 'aura', key: 'aura', goal: 10000, coins: 60 },
  { id: 'slap', key: 'slapKills', goal: 3, coins: 70 },
  { id: 'ultraKill', key: 'ultraKills', goal: 2, coins: 70 },
];

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

// 날짜로 정해지는 오늘의 미션 3개 (모두에게 같다)
function dailyIds(day) {
  let h = 0;
  for (const c of day) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const pool = MISSIONS.map((m) => m.id);
  const out = [];
  while (out.length < 3) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(pool.splice(h % pool.length, 1)[0]);
  }
  return out;
}

function fresh() {
  return { v: 1, level: 1, xp: 0, coins: 0, matches: 0, wins: 0, owned: [], equip: {}, day: '', daily: [] };
}

export function createProfile(store) {
  let p = fresh();
  try {
    const raw = store.get(KEY);
    if (raw) p = { ...p, ...JSON.parse(raw) };
  } catch { /* 깨진 저장은 새로 시작 */ }

  const save = () => { try { store.set(KEY, JSON.stringify(p)); } catch { /* 저장 못 해도 게임은 계속 */ } };

  function rollDay() {
    const d = today();
    if (p.day === d) return;
    p.day = d;
    p.daily = dailyIds(d).map((id) => ({ id, n: 0, done: false }));
    save();
  }
  rollDay();

  return {
    get data() { rollDay(); return p; },
    unlocked(skin) { return START_SKINS.includes(skin) || p.level >= (UNLOCK_LEVEL[skin] ?? 1); },
    unlockLevel(skin) { return UNLOCK_LEVEL[skin] ?? 1; },
    missions() {
      rollDay();
      return p.daily.map((d) => ({ ...MISSIONS.find((m) => m.id === d.id), n: d.n, done: d.done }));
    },
    owns(id) { return p.owned.includes(id); },
    // 상점: 코인이 모자라면 false
    buy(id, price) {
      if (p.owned.includes(id)) return true;
      if (p.coins < price) return false;
      p.coins -= price;
      p.owned.push(id);
      save();
      return true;
    },
    // 대기실에서 고른 주무기·보조무기
    setLoadout(l) { p.loadout = { ...l }; save(); },
    equip(slot, id) {
      if (id && !p.owned.includes(id)) return;
      if (id) p.equip[slot] = id;
      else delete p.equip[slot];
      save();
    },
    // 경기 결과 반영. 바뀐 내용을 돌려줘 결과 화면에서 보여 준다
    record({ kills = 0, won = false, stats = {} }) {
      rollDay();
      const before = { level: p.level, xp: p.xp, coins: p.coins };
      const add = {
        kills, headshots: stats.headshots ?? 0, wins: won ? 1 : 0, matches: 1,
        ultras: stats.ultras ?? 0, aura: Math.round(stats.auraEarned ?? 0),
        slapKills: stats.slapKills ?? 0, ultraKills: stats.ultraKills ?? 0,
      };
      let coins = 15 + kills * 8 + (won ? 40 : 0) + Math.floor(add.aura / 500);
      const xp = 30 + kills * 12 + (won ? 60 : 0);
      const done = [];
      for (const d of p.daily) {
        if (d.done) continue;
        const m = MISSIONS.find((x) => x.id === d.id);
        d.n = Math.min(m.goal, d.n + (add[m.key] ?? 0));
        if (d.n >= m.goal) { d.done = true; coins += m.coins; done.push(m); }
      }
      p.coins += coins;
      p.matches++;
      if (won) p.wins++;
      p.xp += xp;
      const unlocked = [];
      while (p.xp >= xpNeed(p.level)) {
        p.xp -= xpNeed(p.level);
        p.level++;
        for (const s of SKIN_IDS) if (UNLOCK_LEVEL[s] === p.level) unlocked.push(s);
      }
      save();
      return { before, coins, xp, level: p.level, levelUp: p.level > before.level, unlocked, done };
    },
  };
}
