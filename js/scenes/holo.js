/* =====================================================================
   SCENE: holo — Cyberpunk holographic field.
   Hexagons, rings and crosshairs rise through 4 depth layers, with fast
   horizontal data streaks in the middle layers.
   ===================================================================== */
(function(){
  function hex(ctx, x, y, r, rot){
    ctx.beginPath();
    for (let i = 0; i < 6; i++){ const a = rot + i * Math.PI / 3; ctx[i ? 'lineTo' : 'moveTo'](x + r*Math.cos(a), y + r*Math.sin(a)); }
    ctx.closePath(); ctx.stroke();
  }
  function cross(ctx, x, y, r){
    ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke();
    ctx.strokeRect(x - r*.45, y - r*.45, r*.9, r*.9);
  }

  Parallax.register('holo', {
    /* n = shape count, r = size range, rise = upward speed, streaks = data streaks per layer */
    layers: [
      { n:70, r:[3,7],   rise:.10, alpha:.28, line:1,   streaks:0, scroll:.10, mouse:.012, sway:6  },
      { n:38, r:[9,16],  rise:.20, alpha:.42, line:1.2, streaks:4, scroll:.35, mouse:.03,  sway:14 },
      { n:16, r:[20,34], rise:.38, alpha:.55, line:1.5, streaks:3, scroll:.80, mouse:.065, sway:28 },
      { n:6,  r:[50,90], rise:.70, alpha:.32, line:2,   streaks:0, scroll:1.4, mouse:.12,  sway:46, front:true }
    ],

    build(L, W, H){
      const ww = W + 400, hh = H * 1.6, a = [];
      for (let i = 0; i < L.n; i++)
        a.push({ x:rand(0, ww), y:rand(0, hh), r:rand(...L.r), rot:rand(0, 6.3), vr:rand(-.004, .004),
                 type:pick(['hex','hex','ring','cross']), c:Math.random() < .55 ? 'a1' : 'a2', ph:rand(0, 6.3) });
      const s = [];
      for (let i = 0; i < L.streaks; i++) s.push({ x:rand(0, ww), y:rand(0, hh), len:rand(60, 180), v:rand(2, 5) });
      a.ww = ww; a.hh = hh; a.streaks = s;
      return a;
    },

    draw(ctx, a, L, f){
      ctx.lineWidth = L.line;
      if (TC.glow && !L.front && L.r[0] > 8){ ctx.shadowBlur = 10 * TC.glow; }
      a.forEach(p => {
        if (f.dt){ p.y -= L.rise * (1 + f.boost) * f.dt / 16; p.rot += p.vr * f.dt; }
        const x = wrap(p.x + f.off.x, a.ww) - 200, y = wrap(p.y + f.off.y, a.hh) - (a.hh - f.H) / 2;
        if (x < -p.r || x > f.W + p.r || y < -p.r || y > f.H + p.r) return;
        const col = TC[p.c];
        ctx.globalAlpha = L.alpha * (.65 + .35 * Math.sin(f.t * .002 + p.ph));
        ctx.strokeStyle = col; ctx.shadowColor = col;
        if (p.type === 'hex') hex(ctx, x, y, p.r, p.rot);
        else if (p.type === 'ring'){ ctx.beginPath(); ctx.arc(x, y, p.r, p.rot, p.rot + 4.5); ctx.stroke(); }
        else cross(ctx, x, y, p.r * .7);
      });
      ctx.shadowBlur = 0;
      a.streaks.forEach(s => {
        if (f.dt) s.x += s.v * f.dt / 16;
        const x = wrap(s.x + f.off.x, a.ww) - 200, y = wrap(s.y + f.off.y, a.hh) - (a.hh - f.H) / 2;
        const g = ctx.createLinearGradient(x - s.len, 0, x, 0);
        g.addColorStop(0, rgba(TC.a2, 0)); g.addColorStop(1, rgba(TC.a1, L.alpha + .2));
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x - s.len, y); ctx.lineTo(x, y); ctx.stroke();
      });
    }
  });
})();
