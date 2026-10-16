/* =====================================================================
   BOOT SCREEN + INTRO
   Types CONTENT.bootLines once per visit, then reveals the page (adds .ready to <body>).
   Also prepares the logo letter wave and the hero word-by-word reveal.
   ===================================================================== */
(function(){
  const boot=document.getElementById('boot'), out=document.getElementById('bootTxt');
  let seen=false; try{seen=sessionStorage.getItem('pc-boot')==='1'}catch(e){}
  const end=()=>{if(boot.classList.contains('done'))return;boot.classList.add('done');document.body.classList.add('ready');try{sessionStorage.setItem('pc-boot','1')}catch(e){}};
  boot.addEventListener('click',end);
  /* prepare intro animations: logo letters + hero words */
  const logo=document.querySelector('.logo');let li0=0;
  logo.querySelectorAll('*').length;
  (function wrap(node){[...node.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();
    [...n.textContent].forEach(ch=>{const s=document.createElement('span');s.className='lt';s.textContent=ch;s.style.animationDelay=(li0++*.12)+'s';f.appendChild(s);});
    n.replaceWith(f);}else wrap(n);});})(logo);
  const sm=document.querySelector('.hero h1 small');
  sm.innerHTML=sm.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w" style="animation-delay:${.15+i*.035}s">${w}</span>`).join(' ');
  document.querySelectorAll('.links a').forEach((a,i)=>a.style.animationDelay=(.1+i*.07)+'s');
  if(RM||seen){end();return;}
  const lines=CONTENT.bootLines;
  let li=0,ci=0,txt='';
  (function step(){
    if(li>=lines.length){out.innerHTML=txt+'<span class="cur"></span>';setTimeout(end,500);return;}
    const l=lines[li];
    if(ci<l.length){const n=li===0?1:3;txt+=l.slice(ci,ci+n);ci+=n;out.innerHTML=txt+'<span class="cur"></span>';setTimeout(step,li===0?35:12);}
    else{txt+='\n';li++;ci=0;setTimeout(step,90);}
  })();
})();

