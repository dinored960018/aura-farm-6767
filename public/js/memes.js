// 문구 창고. 욕 대신 킹받게 한다. 언어별로 나뉜다.
import { getLang } from './i18n.js';

export const pick = (a) => a[Math.floor(Math.random() * a.length)];

const LINES = {
  en: {
    kill: ['EYES REMOVED', 'SKILL ISSUE', 'L + RATIO', 'GG EZ', 'SHIPPED TO OHIO', 'NPC DELETED', 'SIGMA MOVE', 'COPE', 'SEETHE', 'DO YOUR HOMEWORK',
      'CLOCK OUT', 'LOL LOL LOL', 'SIX SEVEN!', 'FANUM TAX', 'AURA GAP', 'FUNDAMENTALS ISSUE', 'TRALALERO TRALALA', 'MOGGED', 'WHAT WAS THAT?', 'WHERE ARE YOUR EYES?', 'TOUCH GRASS'],
    death: ['SKILL ISSUE', 'BRUH', 'HOW?', 'LOST YOUR EYES', 'YOU ARE THE NPC', 'AURA BANKRUPT', 'UNPLUG YOUR MOUSE', 'IS THIS AN FPS?',
      'CERTIFIED OHIO', 'WAS THAT ON PURPOSE?', 'THAT GOT CLIPPED', 'MOM SAYS DINNER', 'CRINGE'],
    fall: ['STRAIGHT TO OHIO', 'FELL BY YOURSELF LOL', "CAN'T SEE THE FLOOR?", 'DO YOU HAVE EYES?', 'FREEFALL MASTER'],
    ticker: ['BREAKING: Minsu files for aura bankruptcy at -6767', 'Ohio residents insist "we are normal"', 'Man yells 6-7, cannot explain why', 'Experts: "eyes do not normally do that"',
      'Sigma population up 67%', 'Fart SMG now under environmental regulation', 'Bombardiro Doggilo bombs town again', 'Tung Tung Tung Sahur late for the third time',
      'Chicken restores health (no medical basis)', 'Man runs out of aura choosing a menu', 'Hat industry nervous as big head era begins', 'Shotgun going boom is normal, says shotgun'],
    win: ['CERTIFIED SIGMA', 'MAIN CHARACTER', 'AURA BILLIONAIRE', 'EYEBALL COLLECTOR', 'MAYOR OF OHIO'],
    lose: ['CERTIFIED NPC', 'AURA BANKRUPT', 'EYEBALL DONOR', 'EXILED FROM OHIO', 'GRADE A SKILL ISSUE'],
    reload: ['reloading lol', 'one sec', 'tung tung tung', 'loading...', 'buying bullets'],
    claw: ['MEOW!', 'SCRATCH!', '💢', '🐾', 'HISS'],
  },
  ko: {
    kill: ['눈깔 적출 완료', 'SKILL ISSUE', '응 아니야~', '어쩔티비', '저쩔티비', 'GG EZ', '오하이오로 택배 발송',
      'NPC 처리 완료', 'SIGMA MOVE', '킹받쥬?', '숙제해', '퇴근하세요', 'ㅋㅋㅋㅋㅋㅋㅋ', 'SIX SEVEN!',
      'FANUM TAX 징수', 'L + RATIO', '아우라 차이 실화냐', '기본기 이슈', '럭키비키잖아', 'TRALALERO TRALALA',
      '폼 미쳤다', '이게 맞냐', 'MOGGED', '너 지금 뭐함?', '눈깔 어디 갔음?'],
    death: ['스킬 이슈', 'BRUH', '왜 맞음?', '눈깔 잃어버림', '너 NPC임', '아우라 파산', '마우스 뽑아라', '이게 FPS임?',
      '오하이오 주민 판정', '지금 그거 일부러임?', '방금 그거 클립 따였음', '엄마가 밥 먹으래', 'CRINGE'],
    fall: ['오하이오로 직행', '혼자 떨어짐 ㅋㅋㅋ', '바닥 안 보임?', '눈 달린 거 맞음?', '자유낙하 장인'],
    ticker: ['속보: 민수 아우라 -6767 파산 신청', '오하이오 주민들 "우리는 평범합니다" 주장', '6-7 외친 남성, 이유 묻자 "그냥"',
      '전문가 "눈깔은 원래 튀어나오지 않아"', '시그마 수 67% 증가', '방귀 기관총 환경부 규제 대상 지정',
      '봄바르디로 도기로, 또 민가 폭격', 'TUNG TUNG TUNG 사후르 3연속 지각', '치킨 먹으면 체력 회복 (의학적 근거 없음)',
      '메뉴 고르다 아우라 소진', '대두 시대 도래에 모자 업계 긴장', '샷건 쏠 때마다 쿵 소리 나는 것 정상'],
    win: ['시그마 인증', '오늘의 주인공', '아우라 재벌', '눈깔 수집가', '오하이오 시장 당선'],
    lose: ['NPC 인증', '아우라 파산', '눈깔 기증자', '오하이오 추방', '스킬 이슈 1급'],
    reload: ['장전 중 ㅋㅋ', '잠깐만요', '콩콩콩', 'loading...', '총알 사러 감'],
    claw: ['냥!', '할퀴기!', '💢', '🐾', '캬악'],
  },
};

export const lines = (name) => LINES[getLang()][name];

export const SKIN_FACE = { minsu: '😐', sigma: '🗿', cat: '😼', cone: '🛸', toilet: '🚽', streamer: '🎙️', tung: '🪵', hero: '🦸', rizz: '😏', chill: '🐕' };
