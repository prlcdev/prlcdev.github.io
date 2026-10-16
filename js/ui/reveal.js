/* =====================================================================
   SCROLL REVEAL
   Fades sections in as they scroll into view, runs number counters, decodes headings.
   ===================================================================== */
/* ---------- counters ---------- */
function runCount(el){
  const to=parseFloat(el.dataset.count), from=parseFloat(el.dataset.start||0), d=parseInt(el.dataset.dec||0);
  if(RM){el.textContent=to.toFixed(d);return;}
  const t0=performance.now(),dur=1800;
  (function f(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=(from+(to-from)*e).toFixed(d);if(p<1)requestAnimationFrame(f);})(t0);
}


/* ---------- reveal observer ---------- */
/* heading decrypt effect */
function scramble(el){
  if(RM||!el)return;const fin=el.dataset.text||(el.dataset.text=el.textContent);
  const G='!<>-_/[]{}=+*^?#01ABCDEFXZ',res=[...fin].map((c,i)=>c===' '?0:Math.floor(i*1.1+Math.random()*12));
  const max=Math.max(...res);let f=0;cancelAnimationFrame(el._sc);
  (function t(){el.textContent=[...fin].map((c,i)=>f>=res[i]?c:G[Math.random()*G.length|0]).join('');if(f++<max)el._sc=requestAnimationFrame(t);})();
}
document.querySelectorAll('.sec-head').forEach(h=>h.addEventListener('mouseenter',()=>scramble(h.querySelector('h2'))));
const io=new IntersectionObserver(es=>{es.forEach(en=>{if(!en.isIntersecting)return;const t=en.target;t.classList.add('in');
  if(t.classList.contains('sec-head'))scramble(t.querySelector('h2'));
  t.querySelectorAll('[data-count]').forEach(runCount);io.unobserve(t);});},{threshold:.15});
document.querySelectorAll('.reveal,.sec-head').forEach((el,i)=>{el.style.transitionDelay=((i%3)*90)+'ms';io.observe(el);});

