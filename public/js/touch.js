// 휴대폰·태블릿 조작. 왼쪽 엄지로 이동, 오른쪽 엄지로 시점, 버튼으로 나머지.
// 발사 버튼을 누른 채 끌면 쏘면서 시점도 돌아간다 (모바일 FPS 기본 방식).
const LOOK = 0.0062; // 화면 1px당 회전
const STICK = 56; // 조이스틱 반지름(px)

export const isTouch = () => (navigator.maxTouchPoints > 0 && matchMedia('(pointer: coarse)').matches) || new URLSearchParams(location.search).has('touch');

export function setupTouch(game) {
  if (!isTouch()) return false;
  document.body.classList.add('touch');
  game.touch = true;
  const $ = (id) => document.getElementById(id);
  const ui = $('touchUi');

  // ---- 이동: 왼쪽 아무 데나 누른 자리가 조이스틱 중심 ----
  const zone = $('moveZone');
  const stick = $('stick');
  const knob = stick.querySelector('i');
  let moveId = null, ox = 0, oy = 0;
  zone.addEventListener('pointerdown', (e) => {
    if (moveId !== null) return;
    moveId = e.pointerId;
    zone.setPointerCapture(e.pointerId);
    ox = e.clientX;
    oy = e.clientY;
    stick.style.left = `${ox}px`;
    stick.style.top = `${oy}px`;
    stick.hidden = false;
    knob.style.transform = '';
    game.touchMove = { f: 0, r: 0 };
  });
  zone.addEventListener('pointermove', (e) => {
    if (e.pointerId !== moveId) return;
    let dx = e.clientX - ox, dy = e.clientY - oy;
    const d = Math.hypot(dx, dy);
    if (d > STICK) { dx *= STICK / d; dy *= STICK / d; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    // 가운데 조금은 무시해서 손가락 떨림에 안 움직이게
    const dead = (v) => (Math.abs(v) < 0.18 ? 0 : v);
    game.touchMove = { f: dead(-dy / STICK), r: dead(dx / STICK) };
  });
  const endMove = (e) => {
    if (e.pointerId !== moveId) return;
    moveId = null;
    stick.hidden = true;
    game.touchMove = null;
  };
  zone.addEventListener('pointerup', endMove);
  zone.addEventListener('pointercancel', endMove);

  // ---- 시점: 손가락마다 마지막 위치를 기억 ----
  const last = new Map();
  const lookStart = (e) => { last.set(e.pointerId, [e.clientX, e.clientY]); e.currentTarget.setPointerCapture(e.pointerId); };
  const lookMove = (e) => {
    const p = last.get(e.pointerId);
    if (!p) return;
    game.lookBy(e.clientX - p[0], e.clientY - p[1], LOOK);
    p[0] = e.clientX;
    p[1] = e.clientY;
  };
  const lookEnd = (e) => last.delete(e.pointerId);
  const lookZone = $('lookZone');
  lookZone.addEventListener('pointerdown', lookStart);
  lookZone.addEventListener('pointermove', lookMove);
  lookZone.addEventListener('pointerup', lookEnd);
  lookZone.addEventListener('pointercancel', lookEnd);

  // ---- 버튼 ----
  const hold = (btn, down, up) => {
    btn.addEventListener('pointerdown', (e) => { e.preventDefault(); btn.classList.add('down'); down(e); });
    const off = (e) => { btn.classList.remove('down'); up?.(e); };
    btn.addEventListener('pointerup', off);
    btn.addEventListener('pointercancel', off);
  };
  const fire = ui.querySelector('[data-act=fire]');
  hold(fire, (e) => { game.mouseDown = true; game.shotQueued = true; lookStart(e); }, (e) => { game.mouseDown = false; lookEnd(e); });
  fire.addEventListener('pointermove', lookMove);
  hold(ui.querySelector('[data-act=jump]'), () => { game.jumpQueued = true; });
  hold(ui.querySelector('[data-act=dash]'), () => { game.dashQueued = true; });
  hold(ui.querySelector('[data-act=slap]'), () => game.slap());
  hold(ui.querySelector('[data-act=ultra]'), () => game.tryUltra());
  hold(ui.querySelector('[data-act=zoom]'), () => { game.zoom = !game.zoom; ui.querySelector('[data-act=zoom]').classList.toggle('on', game.zoom); });
  hold(ui.querySelector('[data-act=farm]'), () => game.keys.add('KeyG'), () => game.keys.delete('KeyG'));
  hold(ui.querySelector('[data-act=swap]'), () => game.cycleWeapon());

  // 각성이 차면 버튼이 빛난다
  const ultraBtn = ui.querySelector('[data-act=ultra]');
  const ready = $('ultraReady');
  setInterval(() => ultraBtn.classList.toggle('ready', !ready.hidden), 250);

  // 길게 눌러도 글자 선택·확대·메뉴가 안 뜨게
  ui.addEventListener('contextmenu', (e) => e.preventDefault());
  return true;
}
