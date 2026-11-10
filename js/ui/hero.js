/* =====================================================================
   HERO ROTATOR
   Types each line of CONTENT.heroRotator under the headline and keeps it.
   ===================================================================== */
(function(){
  /* Types each line of CONTENT.heroRotator once, one under the other, and
     keeps them all on screen. Nothing is erased. */
  const el=document.getElementById('typed');
  const words=CONTENT.heroRotator;
  el.style.whiteSpace='pre-line';
  if(RM){el.textContent=words.join('\n');return;}
  let w=0,c=0,done='';
  (function tick(){
    const s=words[w];
    el.textContent=done+s.slice(0,c);
    if(c<s.length){c++;setTimeout(tick,55);}
    else if(w<words.length-1){done+=s+'\n';w++;c=0;setTimeout(tick,700);}
  })();
})();
