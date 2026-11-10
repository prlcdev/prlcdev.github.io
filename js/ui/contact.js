/* =====================================================================
   CONTACT
   Animated placeholder in the details field, and the inquiry form
   (opens the visitor's mail app addressed to CONTENT.email).
   ===================================================================== */
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


/* ---------- inquiry form ----------
   The site is static (no server), so nothing is sent from here.
   On submit we build the email and give the visitor every way to send it:
   their mail app (mailto), Gmail or Outlook.com in the browser, or copy
   the text. The details stay in the visitor's browser until they send. */
document.getElementById('ticket').addEventListener('submit',e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim();
  const to=CONTENT.email;
  const sub=`Message for Paulo: ${v('f-type')} — ${v('f-name')}${v('f-org')?', '+v('f-org'):''}`;
  const body=`Hello Paulo,\n\n${v('f-msg')}\n\n— ${v('f-name')}${v('f-org')?'\n'+v('f-org'):''}\nTopic: ${v('f-type')}`;
  const q=encodeURIComponent;
  const links=[
    ['OPEN MAIL APP',`mailto:${to}?subject=${q(sub)}&body=${q(body)}`],
    ['GMAIL',`https://mail.google.com/mail/?view=cm&fs=1&to=${q(to)}&su=${q(sub)}&body=${q(body)}`],
    ['OUTLOOK.COM',`https://outlook.office.com/mail/deeplink/compose?to=${q(to)}&subject=${q(sub)}&body=${q(body)}`]
  ];
  const out=document.getElementById('out');
  out.innerHTML='';
  const p1=document.createElement('p');
  p1.textContent='> Your message is ready. Choose how to send it to '+to+':';
  out.appendChild(p1);
  const row=document.createElement('div');row.className='send-opts';
  links.forEach(([label,href],i)=>{const a=document.createElement('a');a.className='btn';a.textContent=label;a.href=href;
    if(i>0){a.target='_blank';a.rel='noopener';}row.appendChild(a);});
  const cp=document.createElement('button');cp.type='button';cp.className='btn';cp.textContent='COPY MESSAGE';
  cp.addEventListener('click',()=>{const txt=`To: ${to}\nSubject: ${sub}\n\n${body}`;
    const ok=()=>{cp.textContent='COPIED ✓';};
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(ok,()=>fallback());}else fallback();
    function fallback(){const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();
      try{document.execCommand('copy');ok();}catch(err){cp.textContent='SELECT AND COPY BELOW';}t.remove();}});
  row.appendChild(cp);
  out.appendChild(row);
  const note=document.createElement('p');note.className='send-note';
  note.textContent='Nothing is sent until you press Send in your email.';
  out.appendChild(note);
  out.scrollIntoView({block:'nearest',behavior:RM?'auto':'smooth'});
});
