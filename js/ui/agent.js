/* =====================================================================
   AGENT LOG
   Renders AGENT_LOG (js/data/agent.js) as a slide deck, newest first.
   Prev/next buttons, dot index, and left/right arrow keys.
   ===================================================================== */
(function(){
  const root=document.getElementById('agentDeck');
  if(!root||typeof AGENT_LOG==='undefined'||!AGENT_LOG.length)return;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const paras=t=>String(t||'').trim().split(/\n\s*\n/).map(p=>'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>').join('');
  const total=AGENT_LOG.length;

  root.innerHTML=
    '<div class="ag-bar"><span class="ag-tag">'+'ENTRY <b id="agNum"></b> / '+total+'</span>'+
    '<span class="ag-date" id="agDate"></span><span class="ag-item" id="agItem"></span></div>'+
    '<article class="ag-slide" id="agSlide" aria-live="polite"></article>'+
    '<div class="ag-nav"><button class="btn" id="agPrev" aria-label="Newer entry">◂ NEWER</button>'+
    '<div class="ag-dots" id="agDots"></div>'+
    '<button class="btn" id="agNext" aria-label="Older entry">OLDER ▸</button></div>';

  const slide=document.getElementById('agSlide'),dots=document.getElementById('agDots');
  dots.innerHTML=AGENT_LOG.map((e,i)=>'<button class="ag-dot" aria-label="Entry '+(total-i)+'" data-i="'+i+'"></button>').join('');
  let cur=0;

  function show(i){
    cur=Math.max(0,Math.min(total-1,i));
    const e=AGENT_LOG[cur];
    document.getElementById('agNum').textContent=total-cur;
    document.getElementById('agDate').textContent=e.date;
    document.getElementById('agItem').textContent='FEATURED · '+e.item.toUpperCase();
    slide.classList.remove('in');void slide.offsetWidth;
    slide.innerHTML=paras(e.text)+
      (e.quote?'<blockquote>“'+esc(e.quote)+'”<cite>— '+esc(e.source)+'</cite></blockquote>':'')+
      paras(e.closer);
    slide.classList.add('in');
    document.getElementById('agPrev').disabled=cur===0;
    document.getElementById('agNext').disabled=cur===total-1;
    dots.querySelectorAll('.ag-dot').forEach((d,k)=>d.classList.toggle('on',k===cur));
  }
  document.getElementById('agPrev').onclick=()=>show(cur-1);
  document.getElementById('agNext').onclick=()=>show(cur+1);
  dots.onclick=ev=>{const b=ev.target.closest('.ag-dot');if(b)show(+b.dataset.i);};
  root.addEventListener('keydown',ev=>{if(ev.key==='ArrowLeft')show(cur-1);if(ev.key==='ArrowRight')show(cur+1);});
  root.tabIndex=0;
  show(0);
})();
