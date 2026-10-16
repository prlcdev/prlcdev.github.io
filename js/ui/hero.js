/* =====================================================================
   HERO ROTATOR
   Types and deletes each line of CONTENT.heroRotator under the headline.
   ===================================================================== */
(function(){
  const el=document.getElementById('typed');
  const words=CONTENT.heroRotator;
  if(RM){el.textContent=words[0];return;}
  let w=0,c=0,del=false;
  (function tick(){
    const s=words[w];
    el.textContent=s.slice(0,c);
    if(!del&&c<s.length){c++;setTimeout(tick,55);}
    else if(!del){del=true;setTimeout(tick,1600);}
    else if(c>0){c--;setTimeout(tick,25);}
    else{del=false;w=(w+1)%words.length;setTimeout(tick,300);}
  })();
})();

