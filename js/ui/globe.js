/* =====================================================================
   GLOBE
   Rotating wireframe globe: coastline + outlined countries (js/data/geo.js),
   markers and arcs from CONTENT.places. Colors follow the active theme.
   ===================================================================== */
(function(){
  /* legends under the globe */
  document.getElementById('globeLegend').innerHTML=CONTENT.places.map(p=>`<span>${p[0]}</span>`).join('');
  document.getElementById('countryLegend').innerHTML='<b>COUNTRIES WORKED IN</b> '+CONTENT.countriesWorkedIn.join(' · ');
  const cv=document.getElementById('globe'),ctx=cv.getContext('2d');
  const D=Math.PI/180;
  const pts=CONTENT.places;
  /* label slots tried in order: [dx, dy, align]; far slots get a leader line */
  const SLOTS=[[8,-6,'left'],[8,14,'left'],[-8,-6,'right'],[-8,14,'right'],[16,-22,'left'],[16,30,'left'],[-16,-22,'right'],[-16,30,'right'],
               [26,4,'left'],[-26,4,'right'],[0,-26,'center'],[0,36,'center'],[30,-38,'left'],[30,46,'left'],[-30,-38,'right'],[-30,46,'right']];
  const lastSlot={};
  let W,H,R,rot=60,tilt=18;
  function size(){const r=cv.getBoundingClientRect(),dpr=window.devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);R=Math.min(W,H)*.4;}
  size();addEventListener('resize',size);
  function proj(lat,lon,lift=1){const p=lat*D,l=(lon+rot)*D,t=tilt*D;
    const x=Math.cos(p)*Math.sin(l),y=Math.cos(t)*Math.sin(p)-Math.sin(t)*Math.cos(p)*Math.cos(l),z=Math.sin(t)*Math.sin(p)+Math.cos(t)*Math.cos(p)*Math.cos(l);
    return {x:W/2+R*lift*x,y:H/2-R*lift*y,z};}
  function v3(lat,lon){const p=lat*D,l=lon*D;return[Math.cos(p)*Math.cos(l),Math.cos(p)*Math.sin(l),Math.sin(p)];}
  function ll(v){const n=Math.hypot(...v);return[Math.asin(v[2]/n)/D,Math.atan2(v[1],v[0])/D];}
  function path(list,col,w){ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();let on=false;
    list.forEach(p=>{if(p.z>0){on?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);on=true;}else on=false;});ctx.stroke();}
  let t0=performance.now();
  function frame(now){
    const tt=(now-t0)/1000;
    ctx.clearRect(0,0,W,H);
    const g=ctx.createRadialGradient(W/2,H/2,R*.2,W/2,H/2,R*1.25);g.addColorStop(0,rgba(TC.a1,.07));g.addColorStop(.8,rgba(TC.a2,.05));g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(W/2,H/2,R*1.25,0,7);ctx.fill();
    ctx.strokeStyle=rgba(TC.a1,.55);ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(W/2,H/2,R,0,7);ctx.stroke();
    const grid=rgba(TC.a1,.16);
    for(let lat=-75;lat<=75;lat+=15){const a=[];for(let lon=-180;lon<=180;lon+=4)a.push(proj(lat,lon));path(a,grid,1);}
    for(let lon=-180;lon<180;lon+=15){const a=[];for(let lat=-90;lat<=90;lat+=4)a.push(proj(lat,lon));path(a,grid,1);}
    /* world coastline (faint) */
    const landC=rgba(TC.a1,.32);GEO.land.forEach(r=>path(r.map(p=>proj(p[1],p[0])),landC,.8));
    /* countries worked in: glowing outline, fill where fully visible */
    const cp=RM?.8:.6+.4*Math.sin(tt*2);
    CONTENT.countriesWorkedIn.map(n=>GEO.c[n]).filter(Boolean).forEach(rs=>rs.forEach(r=>{const q=r.map(p=>proj(p[1],p[0]));
      if(q.every(p=>p.z>0)){ctx.fillStyle=rgba(TC.a2,.14);ctx.beginPath();q.forEach((p,k)=>k?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill();}
      ctx.shadowColor=TC.a2;ctx.shadowBlur=8*TC.glow;path(q,rgba(TC.a2,cp),1.4);ctx.shadowBlur=0;}));
    const home=v3(pts[0][1],pts[0][2]),arc=rgba(TC.a2,.85);
    pts.slice(1).forEach((p,i)=>{const b=v3(p[1],p[2]),a=[];const prog=RM?1:Math.min(1,((tt*0.5+i*0.18)%2.2));
      for(let s=0;s<=40*prog;s++){const f=s/40,v=[home[0]+(b[0]-home[0])*f,home[1]+(b[1]-home[1])*f,home[2]+(b[2]-home[2])*f],q=ll(v);a.push(proj(q[0],q[1],1+.18*Math.sin(Math.PI*f)));}
      path(a,arc,1.6);});
    const vis=[];
    pts.forEach((p,i)=>{const q=proj(p[1],p[2]);if(q.z<=0)return;vis.push({p,q,i});const pulse=RM?0:(tt*1.2+i*.3)%1;
      ctx.fillStyle=TC.head;ctx.shadowColor=TC.a1;ctx.shadowBlur=12*TC.glow;ctx.beginPath();ctx.arc(q.x,q.y,3,0,7);ctx.fill();ctx.shadowBlur=0;
      ctx.strokeStyle=rgba(TC.a1,1-pulse);ctx.beginPath();ctx.arc(q.x,q.y,3+pulse*14,0,7);ctx.stroke();});
    /* collision-free labels: greedy placement, keeps last good slot to avoid flicker */
    ctx.font=`10px ${TC.mono||'monospace'}`;ctx.textBaseline='alphabetic';
    const boxes=vis.map(v=>({x:v.q.x-5,y:v.q.y-5,w:10,h:10}));
    const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
    vis.forEach(v=>{
      const txt=v.p[0].toUpperCase(),tw=ctx.measureText(txt).width,th=11;
      const order=lastSlot[v.i]!=null?[lastSlot[v.i],...SLOTS.keys()]:[...SLOTS.keys()];
      let pick=null;
      for(const k of order){const [dx,dy,al]=SLOTS[k],lx=v.q.x+dx,ly=v.q.y+dy;
        const bx=al==='left'?lx:al==='right'?lx-tw:lx-tw/2,b={x:bx-3,y:ly-th+1,w:tw+6,h:th+3};
        if(b.x<0||b.x+b.w>W||b.y<0||b.y+b.h>H)continue;
        if(boxes.some(o=>hit(b,o)))continue;
        pick={k,lx,ly,al,b,dx,dy};break;}
      if(!pick)return;
      lastSlot[v.i]=pick.k;boxes.push(pick.b);
      if(Math.abs(pick.dx)>10||Math.abs(pick.dy)>16){ctx.strokeStyle=rgba(TC.a1,.45);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(v.q.x,v.q.y);
        ctx.lineTo(Math.min(Math.max(v.q.x,pick.b.x),pick.b.x+pick.b.w),pick.b.y+pick.b.h/2);ctx.stroke();}
      ctx.fillStyle=rgba(TC.bg,.78);ctx.fillRect(pick.b.x,pick.b.y,pick.b.w,pick.b.h);
      ctx.fillStyle=TC.ink;ctx.textAlign=pick.al;ctx.fillText(txt,pick.lx,pick.ly);});
    ctx.textAlign='left';
    if(!RM)rot+=0.12;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

