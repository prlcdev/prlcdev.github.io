/* =====================================================================
   CONTACT
   Ottawa clock, animated placeholder in the details field, and the inquiry form
   (opens the visitor's mail app addressed to CONTENT.email).
   ===================================================================== */
function clk(){try{const c=document.getElementById('clock');c.textContent=new Date().toLocaleTimeString('en-CA',{timeZone:'America/Toronto',hour12:false});
  c.classList.remove('tick');void c.offsetWidth;c.classList.add('tick');}catch(e){} }
clk();setInterval(clk,1000);
try{document.getElementById('yr').textContent=new Date().getFullYear();}catch(e){}


/* ---------- animated placeholder in the brief field ---------- */
(function(){
  const ta=document.getElementById('f-msg');if(RM){ta.placeholder=CONTENT.contactPlaceholders[0];return;}
  const P=CONTENT.contactPlaceholders;
  let p=0,c=0,del=false;
  (function t(){if(document.activeElement===ta||ta.value){setTimeout(t,800);return;}
    const s=P[p];ta.placeholder=s.slice(0,c);
    if(!del&&c<s.length){c++;setTimeout(t,45);}else if(!del){del=true;setTimeout(t,1800);}
    else if(c>0){c--;setTimeout(t,20);}else{del=false;p=(p+1)%P.length;setTimeout(t,300);}})();
})();


/* ---------- ticket form ---------- */
document.getElementById('ticket').addEventListener('submit',e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim();
  const sub=`Message for the team: ${v('f-type')} — ${v('f-name')}${v('f-org')?', '+v('f-org'):''}`;
  const body=`Hello,

${v('f-msg')}

— ${v('f-name')}${v('f-org')?'
'+v('f-org'):''}
Topic: ${v('f-type')}`;
  document.getElementById('out').textContent='> Preparing your email. Your mail app will open with the details filled in.';
  location.href=`mailto:${CONTENT.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
});
