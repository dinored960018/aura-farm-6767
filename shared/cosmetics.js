// 상점 꾸미기. 능력치는 없고 겉모습만 바뀐다. 다른 사람 화면에도 보인다.
export const COSMETICS = {
  party: { slot: 'hat', price: 150 },
  bucket: { slot: 'hat', price: 150 },
  tophat: { slot: 'hat', price: 220 },
  propeller: { slot: 'hat', price: 260 },
  horns: { slot: 'hat', price: 260 },
  halo: { slot: 'hat', price: 340 },
  bandage: { slot: 'face', price: 80 },
  stache: { slot: 'face', price: 120 },
  clown: { slot: 'face', price: 120 },
  monocle: { slot: 'face', price: 220 },
};
export const COSMETIC_SLOTS = ['hat', 'face'];

// 받은 겉모습에서 모르는 값은 버린다
export function cleanLook(look) {
  const out = {};
  if (!look || typeof look !== 'object') return out;
  for (const slot of COSMETIC_SLOTS) {
    const id = look[slot];
    if (typeof id === 'string' && COSMETICS[id]?.slot === slot) out[slot] = id;
  }
  return out;
}

export const lookKey = (look) => COSMETIC_SLOTS.map((s) => look?.[s] ?? '').join('|');
