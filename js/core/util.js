/* =====================================================================
   SHARED HELPERS — used by every other script.
   ===================================================================== */

/* true when the visitor's OS asks for reduced motion: animations then stay still */
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* Active theme colors for canvas drawing. Filled by readTheme() on every theme change.
   a1/a2 = accents, head = brightest text, ink = body text, bg = page background */
const TC = {};
function readTheme(){
  const cs = getComputedStyle(root), v = n => cs.getPropertyValue(n).trim();
  Object.assign(TC, {
    a1:v('--a1'), a2:v('--a2'), a3:v('--a3'), head:v('--head'), ink:v('--ink'), bg:v('--bg'),
    mono:v('--mono'), glow:parseFloat(v('--g')) || 0
  });
}

/* '#00ff41', .5  →  'rgba(0,255,65,.5)' */
function rgba(hex, a){
  let h = (hex || '#000').replace('#','');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16);
  return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;
}

/* positive modulo: wraps v into [0, m) */
const wrap = (v, m) => ((v % m) + m) % m;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.random() * arr.length | 0];
