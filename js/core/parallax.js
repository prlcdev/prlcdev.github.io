/* =====================================================================
   PARALLAX ENGINE — shared by every theme's background scene.

   The engine owns the two canvases, the animation loop and a smoothed
   "camera" that follows scroll, mouse and a slow sway. Each scene only
   describes its layers and how to draw them.

   How depth works: every layer has its own multipliers —
     scroll : how far the layer moves when the page scrolls (0 = fixed, >1 = faster than the page)
     mouse  : how far it shifts against the mouse
     sway   : idle camera drift in px
     front  : true = drawn on the out-of-focus foreground canvas (blurred by CSS)
   Far layers use small numbers, near layers big ones. That difference is the parallax.

   Writing a scene (see js/scenes/*.js):
     Parallax.register('name', {
       layers: [ {scroll, mouse, sway, front, ...your own settings}, ... ],   // far → near
       build(layer, W, H)            → returns this layer's items (called on start + resize)
       draw(ctx, items, layer, f)    → draw one layer; f = {off:{x,y}, dt, t, W, H, boost, mouse:{x,y}}
                                        off = this layer's parallax offset, dt = ms since last frame
                                        (0 when paused), boost = 0..4 extra speed while scrolling fast
     });
   ===================================================================== */
const Parallax = (function(){
  const back = document.getElementById('scene'), front = document.getElementById('scene-front');
  const bctx = back.getContext('2d'), fctx = front.getContext('2d');
  const SCENES = {};
  let cur = null, items = [], on = false, raf = 0, last = 0, W = 0, H = 0, mx = 0, my = 0;
  const cam = { sy:0, mx:0, my:0, boost:0, lastSY:0 };

  function build(){
    const dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    [back, front].forEach(c => { c.width = W*dpr; c.height = H*dpr; c.getContext('2d').setTransform(dpr,0,0,dpr,0,0); });
    items = cur.layers.map(L => cur.build(L, W, H));
    cam.sy = cam.lastSY = scrollY; cam.mx = mx; cam.my = my;
  }

  function frame(dt, t){
    /* ease the camera toward the real scroll + mouse so movement glides */
    const k = Math.min(1, dt * .006);
    cam.sy += (scrollY - cam.sy) * (dt ? k : 1);
    cam.mx += (mx - cam.mx) * (dt ? k : 1);
    cam.my += (my - cam.my) * (dt ? k : 1);
    const v = Math.abs(scrollY - cam.lastSY) / Math.max(dt, 1); cam.lastSY = scrollY;
    cam.boost += (Math.min(4, v * 2.2) - cam.boost) * .08;

    bctx.clearRect(0, 0, W, H); fctx.clearRect(0, 0, W, H);
    cur.layers.forEach((L, i) => {
      const ctx = L.front ? fctx : bctx;
      const sway = RM ? 0 : (L.sway || 0);
      const off = {
        x: -(cam.mx - W/2) * (L.mouse || 0) + Math.sin(t*.00035 + i*1.7) * sway,
        y: -cam.sy * (L.scroll || 0) - (cam.my - H/2) * (L.mouse || 0) * .6 + Math.cos(t*.00027 + i) * sway * .4
      };
      ctx.save();
      cur.draw(ctx, items[i], L, { off, dt, t, W, H, boost:cam.boost, mouse:{ x:mx, y:my } });
      ctx.restore();
    });
  }

  function loop(t){
    if (!on) return;
    raf = requestAnimationFrame(loop);
    const dt = last ? Math.min(60, t - last) : 16; last = t;
    frame(dt, t);
  }

  addEventListener('resize', () => { if (on){ build(); frame(0, performance.now()); } });
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
  addEventListener('scroll', () => { if (on && RM) frame(0, 0); }, { passive:true });

  return {
    register(name, scene){ SCENES[name] = scene; },
    start(name){
      this.stop();
      if (!name || !SCENES[name]) return;
      cur = SCENES[name]; on = true; last = 0;
      back.style.display = front.style.display = 'block';
      mx = mx || innerWidth/2; my = my || innerHeight/2;
      build();
      if (RM) frame(0, 0); else raf = requestAnimationFrame(loop);
    },
    stop(){
      on = false; cancelAnimationFrame(raf);
      bctx.clearRect(0, 0, W, H); fctx.clearRect(0, 0, W, H);
      back.style.display = front.style.display = 'none';
    }
  };
})();
