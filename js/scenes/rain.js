/* =====================================================================
   SCENE: rain — Matrix code rain in 4 depth layers.
   Far: small, slow, dim. Near: big, fast, bright. Front: huge, blurred.
   Tweak a layer's numbers below to change density, speed or depth.
   ===================================================================== */
(function(){
  const CH = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789{}[]<>=+*;:$#';
  const rc = () => CH[Math.random() * CH.length | 0];

  Parallax.register('rain', {
    /* size = glyph px, speed = fall speed, gap = column spacing (× size), len = trail length, alpha = brightness */
    layers: [
      { size:10, speed:.18, gap:1.2, len:14, alpha:.26, scroll:.12, mouse:.012, sway:6  },
      { size:14, speed:.32, gap:1.3, len:18, alpha:.42, scroll:.35, mouse:.03,  sway:14 },
      { size:20, speed:.55, gap:1.5, len:22, alpha:.68, scroll:.75, mouse:.06,  sway:26 },
      { size:32, speed:.95, gap:4.2, len:12, alpha:.30, scroll:1.35,mouse:.11,  sway:44, front:true }
    ],

    build(L, W, H){
      const gap = L.size * L.gap, n = Math.ceil((W + 400) / gap), cols = [];
      for (let i = 0; i < n; i++){
        const len = Math.round(L.len * rand(.6, 1.4));
        cols.push({ x:i*gap, y:Math.random() * (H / L.size + len), sp:L.speed * rand(.6, 1.4), len, ch:Array.from({ length:len }, rc) });
      }
      cols.wrapW = n * gap;
      return cols;
    },

    draw(ctx, cols, L, f){
      ctx.font = `${L.size}px ${TC.mono || 'monospace'}`; ctx.textAlign = 'center';
      cols.forEach(c => {
        if (f.dt){
          c.y += c.sp * (1 + f.boost) * f.dt / 33;
          if (Math.random() < .05) c.ch[Math.random() * c.len | 0] = rc();
          if (Math.random() < .02){ c.ch.unshift(rc()); c.ch.pop(); }
        }
        const x = wrap(c.x + f.off.x, cols.wrapW) - 200;
        if (x < -L.size || x > f.W + L.size) return;
        const span = f.H + c.len * L.size * 2, py = wrap(c.y * L.size + f.off.y, span);
        for (let k = 0; k < c.len; k++){
          const y = py - k * L.size; if (y < -L.size || y > f.H + L.size) continue;
          ctx.globalAlpha = L.alpha * (1 - k / c.len);
          ctx.fillStyle = k === 0 ? TC.head : TC.a1;
          if (k === 0 && TC.glow && !L.front){ ctx.shadowColor = TC.a1; ctx.shadowBlur = 8; }
          ctx.fillText(c.ch[k], x, y); ctx.shadowBlur = 0;
        }
      });
    }
  });
})();
