/* =====================================================================
   INTERACTIONS
   Cursor glow, scroll progress bar, hero scroll parallax, 3D card tilt, magnetic buttons.
   ===================================================================== */
/* ---------- cursor glow ---------- */
const glow=document.getElementById('glow');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});


/* ---------- scroll progress + hero parallax ---------- */
(function(){
  const prog=document.getElementById('prog');let pend=false;
  function upd(){pend=false;const max=document.documentElement.scrollHeight-innerHeight,y=scrollY;
    prog.style.transform=`scaleX(${max>0?y/max:0})`;
    if(!RM&&y<innerHeight*1.2){root.style.setProperty('--hy',y);root.style.setProperty('--ho',Math.max(0,1-y/(innerHeight*.9)).toFixed(3));}}
  addEventListener('scroll',()=>{if(!pend){pend=true;requestAnimationFrame(upd);}},{passive:true});upd();
})();


/* ---------- card tilt + spotlight, magnetic buttons ---------- */
if(!RM&&matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.kpi,.mod,.cert,.direct').forEach(el=>{
    el.classList.add('tilt');
    el.addEventListener('pointermove',e=>{if(!el.classList.contains('in'))return;
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transition='transform .12s ease-out';
      el.style.transform=`perspective(800px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) translateY(-4px)`;
      el.style.setProperty('--mx',((x+.5)*100).toFixed(1)+'%');el.style.setProperty('--my',((y+.5)*100).toFixed(1)+'%');});
    el.addEventListener('pointerleave',()=>{el.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';el.style.transform='';});
  });
  document.querySelectorAll('.btn,#themeBtn').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();
      b.style.transform=`translate(${((e.clientX-r.left-r.width/2)*.18).toFixed(1)}px,${((e.clientY-r.top-r.height/2)*.3).toFixed(1)}px)`;});
    b.addEventListener('pointerleave',()=>{b.style.transform='';});
  });
}

