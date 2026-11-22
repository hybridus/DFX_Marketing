# Scene, Environment and Film-UI Spec

Applies to every project under `Projects/NN_*`. Reference implementations: `Projects/01_Portfolio_DataStationX/` (environment, engine v4) and `Projects/02_Sensitive_Orgs_Import_Export/` (engine v7, timing model).
Canvas 1920x1080, 30 fps, background `#0B0D10`, Inter. Everything below is SVG drawn by `window.setTime(t)`; nothing is raster except the DataFlowX logo.

## 1. Environment page (`environment.html`)
- Loads `../../Common/iso/iso-lib.js`, sets `ISO.cam={cx,cy,s:.5}`, `ISO.defs(svg)`. Layers in order: floor group (zones, flows, labels) -> assets group `g` (depth-sorted items) -> (film only) UI layers.
- **Zone plate**: 4-point polygon, fill `url(#fl)`, stroke zone colour 2.2. Floor tag: Inter 700 22px, letter-spacing .14em, zone colour, opacity .9, floor matrix transform, placed 30 units inside the front-left corner (`x0+30, y1-34`). Tags: `CORPORATE NETWORK`, `CLASSIFIED (AIR-GAPPED)`, `OT NETWORK`, `ISOLATED OT (NO NETWORK)`, `PUBLIC NETWORK`. On screen the third network is "OT".
- **Gap strip** between zones: `#10151B`, no stroke, holds the gateways.
- **Flows** `flow(points, '#F5A800')`: 4 px gold polyline at z 1.2 (stroke-linejoin round, butt caps), ends 64 units before target with a **flat triangular arrowhead on the floor** (length 64, half-width 36). Data moves only along gold lines; flows run left to right through gateways only.
- **Non-data links** (e.g. cable, Wi-Fi): grey `#8FA0B3`, dashed, marker `arw`. Never gold.
- **Internet / external cloud** (Project 02): drawn as rounded cloud shapes in the zone colour with floor-tag style label.
- **Placement**: `add(depthKey, fn)`; sort ascending, draw. Depth key ~ the screen-near order of the asset's anchor; tune manually if a tall asset overlaps another.
- **Scaling**: endpoints are scaled by wrapper `sc(ox,oy,k,fn)` (desk PC 1.8, CNC 1.5, PASS 1.8). Do not scale `person2`.
- **Lighting**: every asset has its own `sh` shadow; never add a second global shadow.

## 2. Film UI layer (all in 1920x1080 screen space above the world group)
Colours: panel `#12161C` with 2 px gold `#F5A800` border, radius 12. Text: primary `#E6EDF5`/`#F5F7FA`, muted `#8D97A3`, sub `#B8C0CA`. OK `#3DDC84`, threat `#B3121F` / `#E06A74` / `#FF8A93`, quarantine `#E4838B`.
| Component | Spec |
|---|---|
| **Lower-third caption** | rect x60 y900 w820 h104 r10, fill `#0B0D10` @.78, stroke gold @.55; 6 px gold bar on the left; title Inter 700 30px `#F5F7FA` at (90,944); sub Inter 400 19px `#B8C0CA` at (90,980). Fade in/out 0.5 s. One caption at a time. |
| **Chapter banner** | rect x0 y760 w1100 h150 fill `#0B0D10` @.86, 10 px gold bar left; kicker Inter 700 22px gold letter-spacing .3em at (60,812); title Inter 700 64px `#F5F7FA` at (60,880); slides in 40 px from the left over 0.6 s; fade 0.4 s. |
| **Risk overlay** | full-frame `#0B0D10` @.86, text Inter 700 50px `#F5F7FA` centred y560, 400x4 `#B3121F` underline at (760,590). Fade 0.7 s. |
| **Popup (bubble)** | width/height per bubble, panel as above, anchored to a world point with a **straight gold 2.5 px leader line** from the nearest point of the panel edge to the anchor, ending in a filled triangular arrowhead (16 long, 7 half-width) that points at the asset (leader drawn only when farther than 12 px); frozen at the camera of its start time; clamped to x 20..1900-W and y 20..1000-H; never overlaps the caption rect (60,900,880,1004) (`window.__check` reports it). Popups sit ABOVE the sandbox, never an arrow into it. |
| **Popup header** `head()` | title Inter 700 15px gold letter-spacing .14em at (+20,+30); sub Inter 500 13px `#8D97A3` right-aligned; 1 px `#2A323C` rule at y+42. |
| **Row** `row()` | y = 54 + i*38; rect h32 r8 fill `#171C23` stroke `#262E38`; optional 4 px left colour bar; label Inter 500 15px `#E6EDF5` at +30; sub Inter 400 12px `#8D97A3`; `tick` at right. |
| **Tick** | 18x18 r5; ON fill `#3DDC84` (or given) with a `#0B0D10` check path 2.4 px round; OFF fill `#0E1217` stroke `#4A5562` 1.5. |
| **Button** `btn()` | h26 r13; ON fill gold (or colour) text `#0B0D10`; OFF fill `#2A323C` text `#8D97A3`; Inter 700 13px centred. |
| **File row** `fileRow()` | row h28 pitch 34; type chip 30x18 r5 coloured by type (PDF `#B3121F`, DOC `#9B6FD8`, XLS `#3DDC84`, ZIP `#8FA0B3`) with Inter 700 9px white label; name Inter 500 14px `#E6EDF5`; right checkbox gold when selected. |
| **Badge** | h22 r11 pill, Inter 700 11px. |
| **File chip (on the map)** | 14x14 rounded square r3 filled with the type colour, 1 px `#0B0D10` stroke; sealed = 2.5 px gold stroke; optional lock glyph; optional ring (r+4, 1.6 px) while being processed. |
| **Quarantine folder** | soft red `#C8505A`/`#E4838B`; fades in, takes red chips, fades out. |
| **Sandbox VM windows** | three small windows popping above the sandbox, no connecting arrow. |
| **Closing cards** | statement lines then logo card (`Common/brand/logo-dark-bg.png`), tagline "Control the Flow, Secure the Operation." gold. |
Motion: fades 0.4-0.7 s ease; camera keys are `[time, [x,y,zoom]]` eased; nothing bounces.

## 3. Timing model (Project 02 v7; reuse for new films)
1. Generate VO takes once (Cedric M, `eleven_v4`), measure audible onsets -> table `A.sNN` (real seconds).
2. Everything the viewer must sync (camera moves, popups, captions, banners, risk, closing) is keyed to `A.*` in REAL seconds.
3. Chip/flow animation keeps its own design clock mapped to real time through the `ANCH` design->real map.
4. `mix_vo.sh` + `starts.json` place takes; verify onsets by audio analysis, not by scene guess. Never leave a gap that reads as a missing sound; Project 01 uses UI cues only (no synthetic bed).

## 4. Validation
`window.__check()` in the engine: popups fully on screen, no caption overlap, no popup clipped. Tools: `tools/stills.js` (frames), `tools/shot_env.js` (environment), `tools/render_range.js`, `tools/duration.js`. After touching `iso-lib.js`: `tools/lint_asset.js --check-baseline` + re-render old stills.
