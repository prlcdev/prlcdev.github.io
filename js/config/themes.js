/* =====================================================================
   THEME REGISTRY — one entry per theme.

   label  : name shown in the THEME menu
   sw     : 3 swatch colors shown in the menu
   scene  : animated parallax background (file in js/scenes/, registered by name)
            rain | holo | horizon | bokeh | constellation   (or null for none)
   fx     : CSS ambient effects layered on top of the scene
            floor  = perspective grid floor     sun        = glowing sun
            sunstripes = striped retro sun      scan       = CRT scanlines
            glitch = glitching headline         glow       = cursor glow + card shine
            aurora = drifting color blobs       dots       = moving dot grid

   Colors and fonts live in css/themes/<name>.css.
   To add a theme: copy a css/themes file, rename the selector, add an entry here,
   and add the stylesheet link in index.html.
   ===================================================================== */
const THEMES = {
  cyberpunk: { label:'Cyberpunk',        scene:'holo',          fx:['floor','sun','scan','glitch','glow'],               sw:['#05050b','#00f0ff','#ff2bd6'] },
  corporate: { label:'Corporate Light',  scene:'bokeh',         fx:['aurora','dots','glow'],                            sw:['#f5f6f8','#1f5f8b','#d1495b'] },
  matrix:    { label:'Matrix',           scene:'rain',          fx:['scan','glitch','glow'],                            sw:['#000000','#00ff41','#7dffb0'] },
  synthwave: { label:'Synthwave Sunset', scene:'horizon',       fx:['floor','sun','sunstripes','scan','glitch','glow'], sw:['#14072b','#ff6ec7','#ffb03b'] },
  minimal:   { label:'Minimal Mono',     scene:'constellation', fx:['glow'],                                            sw:['#0f0f0f','#ffffff','#9a9a9a'] }
};

/* Default theme = the data-theme attribute on <html> in index.html */
const DEFAULT_THEME = (root.dataset.theme in THEMES) ? root.dataset.theme : 'cyberpunk';
