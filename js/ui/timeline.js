/* =====================================================================
   TRACK RECORD TIMELINE
   Builds the Gantt rows from CONTENT.missions and the slide-in role brief.
   ===================================================================== */
const M=CONTENT.missions.slice().reverse();
const Y0=2006,Y1=Math.max(2027,Math.ceil(NOW_Y)),pct=y=>((y-Y0)/(Y1-Y0)*100);
const ticks=document.getElementById('ticks');
[2006,2010,2014,2018,2022,2026].forEach(y=>{const s=document.createElement('span');s.style.left=pct(y)+'%';s.textContent=y;ticks.appendChild(s);});
const rows=document.getElementById('rows');
M.forEach((m,i)=>{
  const r=document.createElement('div');r.className='g-row';r.tabIndex=0;r.setAttribute('role','button');
  r.innerHTML=`<div class="g-name">${m.co}<small>${m.per}</small></div><div class="g-track"><div class="g-bar" style="left:${pct(m.s)}%;width:${Math.max(1.4,pct(m.e)-pct(m.s))}%;transition-delay:${i*90}ms"></div></div>`;
  r.style.animationDelay=(i*.06)+'s';
  r.addEventListener('click',()=>openBrief(m,i));r.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBrief(m,i);}});
  rows.appendChild(r);
});
const drawer=document.getElementById('drawer'),shade=document.getElementById('shade');
function openBrief(m,i){
  document.getElementById('dId').textContent='ROLE BRIEF // R-'+String(M.length-i).padStart(2,'0')+(m.now?' // CURRENT':'');
  document.getElementById('dCo').textContent=m.co;document.getElementById('dRole').textContent=m.role;
  document.getElementById('dPer').textContent=m.per;document.getElementById('dLoc').textContent=m.loc;
  document.getElementById('dSum').textContent=m.sum;
  const ul=document.getElementById('dList');ul.innerHTML='';
  m.b.forEach((b,k)=>{const li=document.createElement('li');li.textContent=b;li.style.transitionDelay=(150+k*70)+'ms';ul.appendChild(li);});
  drawer.classList.remove('open');void drawer.offsetWidth;
  drawer.classList.add('open');shade.classList.add('open');drawer.setAttribute('aria-hidden','false');
}
function closeBrief(){drawer.classList.remove('open');shade.classList.remove('open');drawer.setAttribute('aria-hidden','true');}
document.getElementById('dClose').onclick=closeBrief;shade.onclick=closeBrief;
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeBrief();toggleMenu(false);}});

