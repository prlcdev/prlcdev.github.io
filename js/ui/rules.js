/* =====================================================================
   RULES TREE
   Renders RULES (js/data/rules.js) as an expandable tree:
   region -> rule -> details. Native <details>, so it works without JS styling.
   ===================================================================== */
(function(){
  const root=document.getElementById('rulesTree');if(!root||typeof RULES==='undefined')return;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const total=RULES.reduce((n,r)=>n+r.rules.length,0);
  document.getElementById('rulesCount').textContent=`${total} RULES · ${RULES.length} JURISDICTIONS · 0 FOLLOWED`;
  root.innerHTML=RULES.map((r,i)=>`
    <details class="rt-region"${i===0?' open':''}>
      <summary><span class="rt-caret"></span><span class="rt-name">${esc(r.region)}</span><span class="rt-n">${r.rules.length} ${r.rules.length===1?'rule':'rules'}</span></summary>
      <p class="rt-quip">🤖 ${esc(r.quip)}</p>
      <div class="rt-kids">${r.rules.map(x=>`
        <details class="rt-rule">
          <summary><span class="rt-caret"></span><span class="rt-code">${esc(x.code)}</span>${x.where?`<span class="rt-where">${esc(x.where)}</span>`:''}</summary>
          <div class="rt-body">
            <p class="rt-scope">${esc(x.scope)}</p>
            <p class="rt-take">🤖 ${esc(x.take)}</p>
            <a class="rt-link" href="${esc(x.link)}" target="_blank" rel="noopener">${esc(x.source)} ↗</a>
          </div>
        </details>`).join('')}
      </div>
    </details>`).join('');
  document.querySelectorAll('.rt-btn').forEach(b=>b.addEventListener('click',()=>{
    const open=b.dataset.rt==='open';root.querySelectorAll('details').forEach(d=>d.open=open);}));
})();
