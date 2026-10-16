/* =====================================================================
   THEME SWITCHER
   Applies a theme (colors via CSS, effects via fx classes, background scene via Parallax),
   builds the THEME menu, remembers the visitor's choice. Priority: ?theme= link > saved choice > default.
   ===================================================================== */
const themeBtn=document.getElementById('themeBtn'),themeMenu=document.getElementById('themeMenu'),themeName=document.getElementById('themeName');
function applyTheme(name,animate){
  if(!(name in THEMES))name=DEFAULT_THEME;
  root.dataset.theme=name;
  root.className=THEMES[name].fx.map(f=>'fx-'+f).join(' ');
  readTheme();
  themeName.textContent=THEMES[name].label.toUpperCase();
  themeMenu.querySelectorAll('button').forEach(b=>b.setAttribute('aria-checked',b.dataset.t===name));
  Parallax.start(THEMES[name].scene);
  try{localStorage.setItem('pc-theme',name)}catch(e){}
  if(animate&&!RM){const f=document.getElementById('tflash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}
}
themeMenu.innerHTML=Object.entries(THEMES).map(([k,t])=>
  `<button role="menuitemradio" data-t="${k}" aria-checked="false"><span class="sw">${t.sw.map(c=>`<i style="background:${c}"></i>`).join('')}</span>${t.label}</button>`).join('');
function toggleMenu(open){themeMenu.classList.toggle('open',open);themeBtn.setAttribute('aria-expanded',open);}
themeBtn.addEventListener('click',e=>{e.stopPropagation();toggleMenu(!themeMenu.classList.contains('open'));});
themeMenu.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;applyTheme(b.dataset.t,true);toggleMenu(false);themeBtn.focus();});
document.addEventListener('click',e=>{if(!e.target.closest('.theme-sw'))toggleMenu(false);});
function initTheme(){
  let t=new URLSearchParams(location.search).get('theme');
  if(!(t in THEMES)){try{t=localStorage.getItem('pc-theme')}catch(e){t=null}}
  applyTheme(t in THEMES?t:DEFAULT_THEME,false);
}

