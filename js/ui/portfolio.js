/* =====================================================================
   PORTFOLIO MARQUEE + TOOLSET
   Company names from CONTENT.companies, tool hexagons from CONTENT.tools.
   ===================================================================== */
const cos=CONTENT.companies;
document.getElementById('marq').innerHTML=[...cos,...cos].map(c=>`<span>${c.replace('&','&amp;')}</span>`).join('');


const tools=CONTENT.tools;
const hx=document.getElementById('hexes');
hx.innerHTML=tools.map((t,i)=>`<div class="hex" style="animation-delay:${i*.05}s">${t}</div>`).join('');
if(!RM){const hs=[...hx.children];let k=0;setInterval(()=>{hs.forEach(h=>h.classList.remove('lit'));
  for(let j=0;j<3;j++)hs[(k+j*5)%hs.length].classList.add('lit');k=(k+1)%hs.length;},450);}

