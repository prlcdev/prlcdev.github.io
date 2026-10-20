# Resume site

Live at https://prlcdev.github.io. Static site with no build step, served by GitHub Pages from the `main` branch. Open `index.html` locally to preview.

**Source of truth:** the resume copy in the project. Any change to experience, certifications, or education goes there first, then into `js/data/content.js` and `index.html`.

## Folder map

| Path | What it holds | Edit it when you want to… |
|---|---|---|
| `index.html` | Page markup and section text (hero, results, strengths, certifications, contact panel) | Change wording on the page |
| `js/data/content.js` | Experience timeline, companies, tools, globe places, countries, boot/hero/contact text, email, LinkedIn | Update experience or contact details |
| `js/data/geo.js` | Country and coastline outlines for the globe | Add a country outline |
| `js/data/agent.js` | Agent Log entries: every LinkedIn About the career agent published, newest first | The career agent adds one entry per approved run |
| `css/themes/<name>.css` | One theme's colors and fonts | Recolor a theme |
| `js/config/themes.js` | Theme list: menu label, background scene, CSS effects | Mix and match effects |
| `js/scenes/<name>.js` | One animated parallax background each | Tune or redesign a background |
| `js/core/parallax.js` | Shared parallax engine (camera, layers, loop) | Change parallax behaviour everywhere |
| `js/core/theme.js` | Theme switcher and menu | Rarely |
| `js/ui/*.js` | One file per page feature (boot, hero, timeline, globe, contact…) | Change a feature's behaviour |
| `css/base.css` | Layout and components | Change spacing or layout |
| `css/motion.css` | Animations shared by all themes | Change entry or hover animations |

## Themes and their parallax scenes

| Theme | Scene file | Background |
|---|---|---|
| Cyberpunk | `scenes/holo.js` | Rising neon hexagons, rings, crosshairs and data streaks |
| Corporate Light | `scenes/bokeh.js` | Soft translucent circles, rings and rounded squares |
| Matrix | `scenes/rain.js` | Code rain |
| Synthwave Sunset | `scenes/horizon.js` | Twinkling stars, wireframe mountains, shooting stars |
| Minimal Mono | `scenes/constellation.js` | Depth particles with a mouse-reactive constellation |

Every scene uses the same engine. Each scene has 4–5 depth layers from far to near, plus a blurred foreground. Each layer moves at its own rate with scroll, mouse and a slow camera sway, which creates a rich, layered motion background.

### Tuning a scene

Each layer in a scene's `layers` list has these settings:

- `scroll`: movement per pixel of page scroll (0 = fixed, above 1 = faster than the page)
- `mouse`: shift against the mouse
- `sway`: idle drift in px
- `front: true`: draws on the blurred foreground

The other numbers (count, size, speed, alpha) control density and look.

## Common changes

- **Default theme:** change `data-theme="cyberpunk"` on the `<html>` line in `index.html`.
- **Link to a specific theme:** `index.html?theme=corporate` (or matrix, synthwave, minimal, cyberpunk).
- **Add a job:** add an entry to `missions` in `content.js`. `s` and `e` are decimal years (2024.25 = April 2024). `b` is the bullet list. `now: true` marks the current role.
- **Add a globe city:** add `['City', latitude, longitude]` to `places`.
- **Outline another country:** its outline must exist in `geo.js`. Ask for it to be added, then list its name in `countriesWorkedIn`.

### Add a theme

1. Copy a file in `css/themes/` and rename the selector, for example `[data-theme="ocean"]`.
2. Link the new file in `index.html`.
3. Add an entry to `js/config/themes.js`, picking a scene or writing a new one.

### Add a scene

1. Copy a file in `js/scenes/` and change the name passed to `Parallax.register`.
2. Add its `<script>` tag in `index.html`, before `js/core/theme.js`.
3. Set `scene:` on a theme in `js/config/themes.js`.

## Accessibility

When a visitor's system has "Reduce motion" turned on, animations and backgrounds stay still on purpose.
