/* =====================================================================
   SCENE: bokeh — Corporate Light soft geometry.
   Translucent circles, rings and rounded squares drifting at 4 depths.
   Kept very low-contrast so text stays easy to read.
   ===================================================================== */
(function(){
  function rrect(ctx, x, y, s, r){
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + s, y, x + s, y + s, r); ctx.arcTo(x + s, y + s, x, y + s, r);
    ctx.arcTo(x, y + s, x, y, r); ctx.arcTo(x, y, x + s, y, r); ctx.closePath();
  }

  Parallax.register('bokeh', {
    layers: [
      { n:40, r:[2,5],    alpha:.22, drift:.05, scroll:.10, mouse:.01,  sway:6  },
      { n:22, r:[8,18],   alpha:.14, drift:.10, scroll:.30, mouse:.025, sway:12 },
      { n:12, r:[24,48],  alpha:.09, drift:.16, scroll:.65, mouse:.05,  sway:22 },
      { n:5,  r:[80,150], alpha:.07, drift:.25, scroll:1.2, mouse:.1,   sway:40, front:true }
    ],

    build(L, W, H){
      const a = []; a.ww = W + 400; a.hh = H * 1.6;
      for (let i = 0; i < L.n; i++)
        a.push({ x:rand(0, a.ww), y:rand(0, a.hh), r:rand(...L.r), type:pick(['dot','dot','ring','square']),
                 c:pick(['a1','a2','a3']), vx:rand(-1, 1), vy:rand(-1, -.3), rot:rand(0, 6.3), ph:rand(0, 6.3) });
      return a;
    },

    draw(ctx, a, L, f){
      a.forEach(p => {
        if (f.dt){ p.x += p.vx * L.drift * f.dt / 16; p.y += p.vy * L.drift * (1 + f.boost) * f.dt / 16; p.rot += .0004 * f.dt; }
        const x = wrap(p.x + f.off.x, a.ww) - 200, y = wrap(p.y + f.off.y, a.hh) - (a.hh - f.H) / 2;
        if (x < -p.r*2 || x > f.W + p.r*2 || y < -p.r*2 || y > f.H + p.r*2) return;
        const col = TC[p.c];
        ctx.globalAlpha = L.alpha * (.75 + .25 * Math.sin(f.t * .0015 + p.ph));
        if (p.type === 'dot'){ ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, p.r, 0, 7); ctx.fill(); }
        else if (p.type === 'ring'){ ctx.strokeStyle = col; ctx.lineWidth = Math.max(1, p.r * .08); ctx.beginPath(); ctx.arc(x, y, p.r, 0, 7); ctx.stroke(); }
        else { ctx.save(); ctx.translate(x, y); ctx.rotate(p.rot); ctx.strokeStyle = col; ctx.lineWidth = Math.max(1, p.r * .06);
               rrect(ctx, -p.r/2, -p.r/2, p.r, p.r * .22); ctx.stroke(); ctx.restore(); }
      });
    }
  });
})();
