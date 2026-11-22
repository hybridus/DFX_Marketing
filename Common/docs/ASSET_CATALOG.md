# Asset Catalog (isometric SVG library)

Source: `Common/iso/iso-lib.js`. Registry: `Common/iso/asset-manifest.json`. Images: `Common/iso/previews/<id>.png` (clean | anchors | map scale) and `_sheet.png` (all current assets).
All dimensions are world units (1 unit = 1 px at `ISO.cam.s = 1`); `x` = width toward lower-right, `y` = depth toward lower-left, `z` = up. Placement `(ox,oy)` is the asset origin on the floor; for most assets the footprint spans `x:0..w, y:0..d` from the origin (kiosk, person, usb are centred on the origin: noted below).
Call: `ISO.assets.<fn>(g, ox, oy, opts)`; scale a whole asset with a wrapper group scaled about `ISO.I(ox,oy,0)` (`sc(ox,oy,k,fn)` in environments).

## Status overview
| id | product / role | status | size x·y·z | design s |
|---|---|---|---|---|
| kiosk2 | DFX Media Transfer Station | current | 180·144·330 | 1.1 |
| person2 | Employee / operator | current | height 359 x .9 = ~323 | 1.3 |
| usb | USB stick (with threat badge) | current | 80·22·13 | 5 |
| institution | Government / partner organisation building | current | 200·110·69 (+flag to 113) | 1.5 |
| platformD1 | DFX One Platform | current | 196·112·54 (modules +16) | 2 |
| sandbox | DFX Malware Mitigation Sandbox | current | 196·112·54 (+12 chamber) | 2 |
| gateway(.cls/.ot/.rev) | DFX Unidirectional Gateway | current | 196·112·54 | 2 |
| deskpc(.corp/.cls/.ot) | Desk PC (portal / standard user / admin) | current | 150·80·~138 | 3 |
| cnc(.ot/.iso) | CNC machine + console | current | ~396·170·~214 | 1.2 |
| pass | DFX PASS handheld | current | 32·16·1.9 (+cable) | 9 |
| emailGateway | DFX Secure Email Gateway | current | 196·112·54 (+12 chamber) | 2 |
| trucdr | DFX TruCDR | current | 196·112·54 (+12 chamber) | 2 |
| kiosk, person, platformA/B/C/D | superseded | legacy | | |

Legacy assets stay for old renders. NEVER use them in new work and never change them.

---
## kiosk2 : DFX Media Transfer Station
- **Silhouette**: slim angular totem; lower pedestal vertical, upper section (above z 215) leans BACK 30 units (bent profile); wide keyboard tray projects forward at the bend.
- **Build order**: base plate box(-90,-72,0,180,144,8) with 4 mounting-hole ellipses (rx6 ry3.4) at (+-76,+-58); far rail (extrudeYZ, x -54..-40); recessed pedestal panel `#232B34` with two black vertical grooves at x=+-14; upper frame (thick, top `#2E3741`); inset portrait screen (outer `#0A0F15` 2px border, inner glass); near rail (x 40..54); keyboard tray box(-36,14,197,72,52,14) with 4x10 key grid; NFC pad.
- **Rails**: profile `[14,8],[14,215],[-16,330],[-44,330],[-14,215],[-14,8]` (y,z).
- **Signature details**: (1) gold header bar on the screen, (2) up to 4 file rows (ON = white outline + white checkbox, OFF = dim), (3) NFC reader: dark pad with gold 1.8px outline + three gold arcs (r 3, 6.5, 10; opacity 1, .78, .56), (4) USB port on tray side (14x8 black, 1.6 `#C9D1DA` outline).
- **opts**: `files` array of 0/1, first 4 used (default `[1,1,1,0,1,0]`).
- **Returns** (screen): `screen` centre of screen, `nfc`, `port`, `keyboard`.
- **Placement**: `ISO.assets.kiosk2(g, 60, 200)`; USB inserted at `usb(g, 96, 234, {z0:205})`; person at `(17,318)` i.e. kiosk + (-43,+118) so the badge hand meets the NFC pad.
- **Zone**: none (neutral). Name never printed on the body.

## person2 : employee
- Profile figure facing -y (toward the kiosk), height 359 before scale `SC=.9`, shadow ellipse under feet, jacket blue-grey ramp, grey skin, near-black hair, gold collar/lanyard line, near arm raised holding a white badge with a gold stripe.
- **opts**: always `{refined:1, legs2:1}` (stride pose, jacket hem + pocket, head x1.12). Without opts = simple single-leg legacy.
- **Returns**: `badge`, `head`, `hand` (screen, already scaled).
- Scale via `sc()` wrapper when needed (people near desk PCs sit at 1:1 beside desks scaled 1.8).

## usb : USB memory stick
- Lies along +x. Origin = connector tip centre. Steel plug 22x11x5.2 (`steel` gradient, edge `#5E6975`), capsule 58x22x13 `rr` r8 (`usbBody` gradient, edge `#7C8896`), lanyard hole ellipse at x=71 (`#0A0D10` fill, `#C9D1DA` stroke).
- **Threat badge** (group class `usb-badge`, toggle `opts.badge:false`): 9.6-radius disc `#3A0A10` with `#B3121F` rim, three `#B3121F` lobes (r3.6 at 4.3 radius, 120 deg apart, first at -90 deg), centre ring r2.2 `#3A0A10`, dot r1 `#B3121F`. Drawn flat on the top face at `z0+6.8`. Film engine fades it by setting opacity on `.usb-badge`: keep that class.
- **opts**: `z0` centre height (0 on floor; 205 when inserted in the kiosk tray), `badge`.
- **Returns**: `connector`, `band`, `hole`, `body`.

## institution : government / partner organisation
- Neoclassical block: plinth (box(-12,-4,0,Wd+24,D+30,5)), body 200x110x64 at z5, 2x4 dark windows (13x12, stroke `#55616D`) on the +x face, 26x36 entrance with gold 1.4 outline centred on +y, 6 stone columns (8x8, `#8B96A1` ramp, height H-8), cornice, triangular pediment (`#2A323C`, edge `#55616D`) with inner gold 1px outline, flagpole `#C9D1DA` 1.6 px with gold flag.
- **opts**: `w` (200), `d` (110). Height fixed 64.
- **Returns**: `entrance` = WORLD `[x,y]` (quirk), `top` = screen point above the flag.

## platformD1 : DFX One Platform (family base for ALL rack appliances)
- Plate: `box(-7,-7,0,w+14,d+14,6)` plate group. Body: `box(0,0,6,w,d,h)` default group; defaults `w196 d112 h48`. Rail: strip `w x 2.5` at the top of the +y face, colour `opts.rail` (default gold `#F5A800`).
- Name plate: `opts.lines` (default `['DFX ONE PLATFORM']`), font size `opts.fs` (11), 700, `#F5F7FA`, centred on the +y face; z-centre `6+(h-2.5)/2`.
- Left end: two vertical bays (6 wide, 8 apart, start x=7) `#0E131A` / `#3A444F` with `#8FA0B3` slots. Right end: three LEDs at x=w-13 (white, gold, green).
- **Lids** (mutually exclusive, picked in this order): `mods:1` -> 2x4 grid of 8 modules 38x36x16 (`lid` group colours) with a 28x5 `#C9D1DA` slot on each front, the last (index 7 = User Portal) slot gold; `opts.lift[k]` raises module k (animation hook). `lid:'arrow'` -> three flat gold chevrons (polygon 52 wide, pitch 46 at u=28/74/120) on the lid, `rev:1` mirrors along -x. default -> one inset glass chamber box(.2w,.2d,z1,.6w,.6d,12).
- Module names (for popups, `ISO.MODS`): AV 1, AV 2, AV 3, AV 4, TruCDR, Policy Engine, Managed File Transfer, User Portal.
- **Returns**: `tops[]` (module tops / chevron tops), `front`, `center`.

## sandbox : DFX Malware Mitigation Sandbox
`platformD1` with `lines:['DFX MALWARE','MITIGATION SANDBOX']`, `fs:9.5`, glass-chamber lid, gold rail. VM windows are UI overlays above it (no arrow into it; see `SCENE_AND_UI_SPEC.md`).

## gateway : DFX Unidirectional Gateway
`platformD1` with `lines:['DFX UNIDIRECTIONAL','GATEWAY']`, `fs:10`, `lid:'arrow'`, rail colour by zone: `zone:'ot'` -> `#2CC4D9`, otherwise `#9B6FD8`. `rev:true` mirrors chevrons (direction reversed, e.g. outbound gateway). Chevrons always gold: gold = data flows one way. One instance per network (separate Classified and OT gateways).

## deskpc : desk PC (Corporate / Classified / OT user)
- Desk 150x80, top 5 thick at z40, 4 legs 6x6; monitor 130x73 panel (bezel 3, depth 4.5) on a tapered neck with rounded base; 4 UI rows (first 3 green square, last gold), zone header bar and zone bezel stripe; keyboard 62x20x3 with 3x9 keycaps.
- **opts.zone**: `corp` `#4F8FC9` (default), `cls` `#9B6FD8`, `ot` `#2CC4D9`.
- Used at scale 1.8 in environments. **Returns** `screen`, `tops[]`.

## cnc : CNC machine with integrated operator console
- Base 300x170x70, enclosure 276x150x120 on top, front window 230 wide with sliding-door seam, glare polygon, work table, vise workpiece, spindle + gold tool tip, tool-changer drum (20-gon r26, 8 tool pegs) on the roof, signal lamp box 16x16x12 (zone colour), chip conveyor + coolant tank on +x, console at front-right: pedestal 18x14x90, keyboard shelf 94x34, monitor 92x54 (3 UI rows) with zone header + bezel stripe. Zone rail along the top of the base.
- **opts.zone**: `ot` (cyan, connected) or `iso` (`#8FA0B3`, isolated; lamp is grey instead of cyan).
- Used at scale 1.5 on the map. **Returns** `top`, `screen`.

## pass : DFX PASS handheld
- 32x16x1.9 slab `rr` r2.6 with a 1.2 px gold `#F5A800` edge ring, glass screen inset 1.2, title text `DFX PASS` Inter 800 3.6 gold on the screen, badge row, 4 PIN dots `#E6EDF5`, status row with green square, status line; USB cable (`opts.cable`, default 34, 3.6 wide) with steel plug 10x5.6 leaving toward -x.
- Environment usage: scaled x1.8 and lifted 72*s so it sits above the isolated CNC bench; cable 16.
- **Returns** `screen`, `plug`, `top`.

## emailGateway : DFX Secure Email Gateway
- **Route**: composition on `platformD1` (rack-appliance family). Same plate, left bays, right LEDs, centred name plate and rail as the Gateway and Sandbox. Only the text and one lid glyph differ. Official name confirmed by Burak on 2026-11-22.
- **Name plate**: `['DFX SECURE EMAIL','GATEWAY']`, Inter 700, fs 10, UPPERCASE (override with `opts.lines`, `opts.fs`).
- **Rail**: gold `#F5A800` by default; `opts.rail` passes a zone colour per scene (no zone variants are registered).
- **Lid**: default glass chamber (top at z 66) with a flat envelope at z 66.2: 80 x 50 units (about 1.6 : 1), centred on the chamber, `#0E131A` fill, 1.4 px `#F5A800` outline, flap polyline (1.4 px gold) from the two back corners to a point 4 units behind the centre, two 1 px `#46515E` fold lines from the front corners.
- **Signature details**: (1) gold-outlined envelope, (2) the standard gold rail + LEDs.
- **opts**: `lines`, `fs`, `rail`.
- **Returns** (screen): `tops` (chamber top), `front`, `center`, `glyph` (envelope centre).
- **Colours**: tokens only (`#0E131A`, `#F5A800`, `#46515E` plus the platformD1 set).
- **Placement**: same footprint as the Gateway; e.g. `emailGateway(g, x, y)`; scale with `sc()` like the other appliances.
- **Preview**: `iso/previews/emailGateway.png`. Template that produced it: `iso/templates/example-secure-email-gateway.js` (now promoted; keep as worked example).

## trucdr : DFX TruCDR
- **Route**: composition on `platformD1` (rack-appliance family), like `emailGateway`. Same plate, left bays, right LEDs, centred name plate and rail; only the text and one lid glyph differ. Single appliance. Plate text and glyph chosen by Burak on 2026-11-22.
- **Name plate**: `['DFX TRUCDR']`, one line, Inter 700, fs 11, UPPERCASE (override with `opts.lines`, `opts.fs`). On-screen product name elsewhere stays `DFX TruCDR`.
- **Rail**: gold `#F5A800` by default; `opts.rail` for a zone colour per scene.
- **Lid**: default glass chamber (top at z 66) with a flat glyph at z 66.2, left to right along +x: original sheet (28 x 40, `#C9D1DA` outline, two `#46515E` lines) -> gold outlined arrow (`#0E131A` fill, 1.4 px gold) -> rebuilt sheet (28 x 40, gold outline, two `#C9D1DA` lines). Sheets have a folded top-right corner; "up" = -y.
- **Signature details**: (1) original-to-rebuilt sheet pair, (2) the standard gold rail + LEDs.
- **opts**: `lines`, `fs`, `rail`.
- **Returns** (screen): `tops` (chamber top), `front`, `center`, `glyph` (arrow centre).
- **Colours**: tokens only (`#0E131A`, `#F5A800`, `#C9D1DA`, `#46515E` plus the platformD1 set).
- **Placement**: same footprint as the Gateway; scale with `sc()` like the other appliances.
- **Preview**: `iso/previews/trucdr.png`.

---
## Legacy (do not use)
kiosk (v1 rounded slab 140·120·330), person (front view, scale .8), platformA (tall cabinet, labelled slots, `labels:1`), platformB (three racks), platformC (open frame, 8 stacked trays), platformD (single rack, `top:1` engines on the lid or front bays). Kept so old stills reproduce.

## Environment composition recipes (Projects 01/02)
- Zone floor plates: Corporate `0,-620 .. 960,540`, Classified `1300,-40 .. 1820,560`, OT L-shape, each filled `url(#fl)` with a 2.2 px zone-colour stroke and a floor tag text (`700 22px Inter`, letter-spacing .14em, matrix floor transform).
- Station cluster: `kiosk2(60,200)`, `usb(96,234,{z0:205})`, `person2(17,318,{refined,legs2})`.
- Core: `platformD1(330,40,{mods:1})`, `sandbox(330,330)`.
- Gateways: `gateway(980,84,{zone:'cls'})` inbound to Classified, `gateway(980,-626,{zone:'ot'})` to OT.
- Endpoints at k=1.8: `deskpc(250,-560,{zone:'corp'})`, `deskpc(1380,100,{zone:'cls'})`; `cnc` at k=1.5: `(1330,-700,{zone:'ot'})` and `(1030,-1620,{zone:'iso'})`; PASS on a stand beside the isolated CNC.
