/* =====================================================================
   SCENE: constellation — Minimal Mono depth particles.
   Far dust, a connected constellation in the middle that reacts to the
   mouse, larger near points, and blurred foreground orbs.
   ===================================================================== */
(function(){
  Parallax.register('constellation', {
    /* link = max distance for connecting lines (0 = no lines), repel = mouse push */
    layers: [
      { n:90, r:[.5,1.1], alpha:.30, speed:.15, link:0,   repel:0,   scroll:.08, mouse:.01,  sway:5  },
      { n:55, r:[1,1.8],  alpha:.70, speed:.35, link:130, repel:1.6, scroll:.30, mouse:.03,  sway:12 },
      { n:18, r:[2,3.5],  alpha:.55, speed:.55, link:0,   repel:0,   scroll:.70, mouse:.06,  sway:24 },
      { n:6,  r:[14,28],  alpha:.18, speed:.8,  link:0,   repel:0,   scroll:1.3, mouse:.11,  sway:42, front:true }
    ],

    build(L, W, H){
      const a = []; a.ww = W + 400; a.hh = H * 1.5;
      for (let i = 0; i < L.n; i++) a.push({ x:rand(0, a.ww), y:rand(0, a.hh), r:rand(...L.r), vx:rand(-.5, .5), vy:rand(-.5, .5) });
      return a;
    },

    draw(ctx, a, L, f){
      const S = [];   /* screen positions this frame */
      a.forEach(p => {
        if (f.dt){ p.x += p.vx * L.speed * f.dt / 16; p.y += p.vy * L.speed * (1 + f.boost) * f.dt / 16; }
        let x = wrap(p.x + f.off.x, a.ww) - 200, y = wrap(p.y + f.off.y, a.hh) - (a.hh - f.H) / 2;
        if (L.repel && f.dt){
          const dx = x - f.mouse.x, dy = y - f.mouse.y, d = Math.hypot(dx, dy);
          if (d < 110 && d > 0){ p.x += dx / d * L.repel; p.y += dy / d * L.repel; }
        }
        S.push([x, y, p.r]);
      });
      ctx.lineWidth = 1;
      if (L.link){
        for (let i = 0; i < S.length; i++){
          for (let j = i + 1; j < S.length; j++){
            const d = Math.hypot(S[i][0] - S[j][0], S[i][1] - S[j][1]);
            if (d < L.link){ ctx.strokeStyle = rgba(TC.a1, (1 - d / L.link) * .28); ctx.beginPath(); ctx.moveTo(S[i][0], S[i][1]); ctx.lineTo(S[j][0], S[j][1]); ctx.stroke(); }
          }
          const dm = Math.hypot(S[i][0] - f.mouse.x, S[i][1] - f.mouse.y);
          if (dm < 170){ ctx.strokeStyle = rgba(TC.a2, (1 - dm / 170) * .5); ctx.beginPath(); ctx.moveTo(S[i][0], S[i][1]); ctx.lineTo(f.mouse.x, f.mouse.y); ctx.stroke(); }
        }
      }
      ctx.fillStyle = TC.a1; ctx.globalAlpha = L.alpha;
      S.forEach(([x, y, r]) => { if (x < -r || x > f.W + r || y < -r || y > f.H + r) return; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); });
    }
  });
})();
