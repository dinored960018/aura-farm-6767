// 크레이지게임즈 연동. 빌드에 AURA_PORTAL이 있을 때만 켜진다.
// SDK가 광고 차단기에 막혀도 게임은 그대로 돌아가야 하므로 모든 호출을 감싼다.
export const portalBuild = window.AURA_PORTAL === 'crazygames';

let sdk = null;
const guard = (fn, fallback = null) => {
  if (!sdk) return fallback;
  try { return fn(sdk) ?? fallback; } catch { return fallback; }
};

let lastRoom = '';
let roomTimer = 0;
export const portal = {
  active: portalBuild,
  async init() {
    const s = window.CrazyGames?.SDK;
    if (!portalBuild || !s) return;
    try {
      await Promise.race([s.init(), new Promise((_, no) => setTimeout(no, 6000))]);
      if (s.environment !== 'disabled') sdk = s;
    } catch { sdk = null; }
  },
  get ready() { return !!sdk; },
  loadingStart: () => guard((s) => { s.game.loadingStart(); }),
  loadingStop: () => guard((s) => { s.game.loadingStop(); }),
  gameplayStart: () => guard((s) => { s.game.gameplayStart(); }),
  gameplayStop: () => guard((s) => { s.game.gameplayStop(); }),
  happytime: () => guard((s) => { s.game.happytime(); }),
  invite: () => guard((s) => s.game.inviteParams?.room ?? s.game.getInviteParam('room')),
  inviteLink: (code) => guard((s) => s.game.inviteLink({ room: code })),
  locale: () => guard((s) => s.user.systemInfo?.locale, ''),
  settings: () => guard((s) => s.game.settings, {}),
  onSettings: (fn) => guard((s) => { s.game.addSettingsChangeListener(fn); }),
  onJoin: (fn) => guard((s) => { s.game.addJoinRoomListener(fn); }),
  onLogin: (fn) => guard((s) => { s.user.addAuthListener(fn); }),
  async user() {
    if (!sdk) return null;
    try { return sdk.user.isUserAccountAvailable ? await sdk.user.getUser() : null; } catch { return null; }
  },
  // SDK가 250ms 안의 연속 호출을 걸러 내므로, 마지막 상태만 조금 뒤에 보낸다
  updateRoom(info) {
    const key = JSON.stringify(info);
    if (key === lastRoom) return;
    lastRoom = key;
    clearTimeout(roomTimer);
    roomTimer = setTimeout(() => guard((s) => { s.game.updateRoom(info); }), 300);
  },
  leftRoom() {
    if (!lastRoom) return;
    lastRoom = '';
    clearTimeout(roomTimer);
    roomTimer = setTimeout(() => guard((s) => { s.game.leftRoom(); }), 300);
  },
  // 경기 사이 광고. 실패해도 항상 끝난다. 재생 중에는 화면 입력을 막고 소리를 끈다.
  midgame(sfx) {
    return new Promise((resolve) => {
      if (!sdk) { resolve(); return; }
      const block = document.getElementById('adBlock');
      block.hidden = false;
      let started = false, done = false;
      const finish = () => {
        if (done) return;
        done = true;
        block.hidden = true;
        sfx.setHold('ad', false);
        resolve();
      };
      setTimeout(() => { if (!started) finish(); }, 8000);
      try {
        sdk.ad.requestAd('midgame', {
          adStarted: () => { started = true; sfx.setHold('ad', true); },
          adFinished: finish,
          adError: finish,
        });
      } catch { finish(); }
    });
  },
};
