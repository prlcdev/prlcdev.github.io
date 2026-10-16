/* =====================================================================
   SCENE: horizon — Synthwave night sky.
   Twinkling stars (2 depths), two wireframe mountain ranges on the
   horizon, and blurred shooting stars in front.
   The striped sun and grid floor come from CSS (fx: sun, sunstripes, floor).
   HORIZON sets where the mountains stand (fraction of screen height).
   ===================================================================== */
(function(){
  const HORIZON = .74;

  function ridge(W, peaks, hMin, hMax){
    const ww = W + 400, pts = [], step = ww / peaks;
    for (let i = 0; i <= peaks; i++) pts.push([i * step, rand(hMin, hMax) * (i % 2 ? 1 : .55)]);
    pts[peaks][1] = pts[0][1];   /* seamless when it wraps */
    return { pts, ww };
  }

  Parallax.register('horizon', {
    layers: [
      { kind:'stars',    n:140, r:[.4,1.1], alpha:.7, scroll:.04, mouse:.008, sway:3  },
      { kind:'stars',    n:50,  r:[1,2],    alpha:.9, scroll:.12, mouse:.02,  sway:8  },
      { kind:'mountain', peaks:28, h:[.035,.085], col:'a1', alpha:.55, scroll:.15, mouse:.03, sway:10 },
      { kind:'mountain', peaks:18, h:[.05,.13],  col:'a2', alpha:.8,  scroll:.30, mouse:.06, sway:18 },
      { kind:'meteor',   n:4,  alpha:.6, scroll:.6, mouse:.1, sway:30, front:true }
    ],

    build(L, W, H){
      if (L.kind === 'stars'){
        const a = []; a.ww = W + 400; a.hh = H * 1.4;
        for (let i = 0; i < L.n; i++) a.push({ x:rand(0, a.ww), y:rand(0, a.hh), r:rand(...L.r), ph:rand(0, 6.3), sp:rand(.001, .004) });
        return a;
      }
      if (L.kind === 'mountain') return ridge(W, L.peaks, L.h[0] * H, L.h[1] * H);
      const a = []; for (let i = 0; i < L.n; i++) a.push({ x:rand(0, W), y:rand(0, H * .5), v:rand(4, 8), wait:rand(0, 6000) });
      return a;
    },

    draw(ctx, a, L, f){
      if (L.kind === 'stars'){
        ctx.fillStyle = TC.head;
        a.forEach(s => {
          const x = wrap(s.x + f.off.x, a.ww) - 200, y = wrap(s.y + f.off.y, a.hh) - (a.hh - f.H) / 2;
          if (y > f.H * HORIZON) return;
          ctx.globalAlpha = L.alpha * (.35 + .65 * Math.abs(Math.sin(f.t * s.sp + s.ph)));
          ctx.beginPath(); ctx.arc(x, y, s.r, 0, 7); ctx.fill();
        });
        return;
      }
      if (L.kind === 'mountain'){
        /* mountains fade out as the page scrolls past the first screen, so they never sit behind content */
        const fade = Math.max(0, 1 - scrollY / (f.H * 1.1)); if (!fade) return;
        const base = f.H * HORIZON + f.off.y * .5, col = TC[L.col];
        for (let rep = -1; rep <= 1; rep++){
          const dx = wrap(f.off.x, a.ww) - 200 + rep * a.ww;
          ctx.beginPath(); ctx.moveTo(dx, base);
          a.pts.forEach(p => ctx.lineTo(dx + p[0], base - p[1]));
          ctx.lineTo(dx + a.ww, base); ctx.closePath();
          ctx.globalAlpha = fade; ctx.fillStyle = TC.bg; ctx.fill();
          const g = ctx.createLinearGradient(0, base - Math.max(...a.pts.map(p => p[1])), 0, base);
          g.addColorStop(0, rgba(col, .25)); g.addColorStop(1, rgba(col, 0));
          ctx.fillStyle = g; ctx.fill();
          ctx.globalAlpha = L.alpha * fade; ctx.strokeStyle = col; ctx.lineWidth = 1.5;
          if (TC.glow){ ctx.shadowColor = col; ctx.shadowBlur = 12; }
          ctx.stroke(); ctx.shadowBlur = 0;
          /* wireframe verticals from each peak */
          ctx.globalAlpha = L.alpha * .35 * fade; ctx.lineWidth = 1;
          a.pts.forEach(p => { ctx.beginPath(); ctx.moveTo(dx + p[0], base - p[1]); ctx.lineTo(dx + p[0], base); ctx.stroke(); });
        }
        return;
      }
      /* meteors */
      a.forEach(m => {
        if (!f.dt) return;
        if (m.wait > 0){ m.wait -= f.dt; return; }
        m.x += m.v * f.dt / 16; m.y += m.v * .45 * f.dt / 16;
        if (m.x > f.W + 200 || m.y > f.H * HORIZON){ m.x = rand(-200, f.W * .6); m.y = rand(-50, f.H * .3); m.wait = rand(1500, 7000); return; }
        const x = m.x + f.off.x, y = m.y + f.off.y * .3;
        const g = ctx.createLinearGradient(x - 140, y - 63, x, y);
        g.addColorStop(0, rgba(TC.a3, 0)); g.addColorStop(1, rgba(TC.head, L.alpha));
        ctx.strokeStyle = g; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 140, y - 63); ctx.lineTo(x, y); ctx.stroke();
      });
    }
  });
})();
