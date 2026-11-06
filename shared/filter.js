// 채팅, 닉네임, 방 이름의 욕설을 가린다. 크레이지게임즈 필수 요건.
// 기본 목록은 코드에 있고, 전체 목록(public/badwords.txt)은 시작 후 addWords로 더한다.
// 낱말 단위로 비교해 class, assume 같은 정상 단어는 가리지 않는다.
const words = new Set(['fuck', 'shit', 'bitch', 'cunt', 'nigger', 'nigga', 'faggot', 'retard', 'whore', 'slut', 'dick', 'pussy', 'asshole', 'bastard', 'rape']);
// 다른 말에 붙어 나와도 가릴 만큼 뜻이 분명한 것들
const PARTS = ['fuck', 'nigg', 'fagg', 'shit', 'bitch', '시발', '씨발', '씨바', '병신', '좆', '존나', '새끼', '지랄', '썅', '니미', '느금', '섹스', '창녀'];
const LEET = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't', '@': 'a', $: 's' };

export function addWords(list) {
  for (const w of list) if (w) words.add(w);
}

function isBad(token) {
  const low = token.toLowerCase();
  const plain = low.replace(/[013457@$]/g, (c) => LEET[c]);
  if (words.has(low) || words.has(plain)) return true;
  return PARTS.some((p) => plain.includes(p));
}

export function cleanText(text) {
  return String(text).replace(/[\p{L}\p{N}@$]+/gu, (t) => (isBad(t) ? '*'.repeat(t.length) : t));
}
