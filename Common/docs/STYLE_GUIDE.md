# DFX Isometric Style Guide (for Claude agents)

Authority: this file + `../iso/tokens.json` + `../iso/asset-manifest.json` + `../iso/iso-lib.js`. If they disagree, `iso-lib.js` is the truth: fix the doc.
Keywords: MUST / MUST NOT / SHOULD are strict. Reading order for a new-asset task: this file -> `ASSET_CATALOG.md` -> `NEW_ASSET_PLAYBOOK.md` -> look at `../iso/previews/_sheet.png`.

## 0. Non-negotiables (checklist form)
1. Pure SVG built by `ISO.*` helpers in `Common/iso/iso-lib.js`. No raster images, no external fonts, no CSS classes for look, no gradients other than those in `ISO.defs`.
2. Every asset is `ISO.assets.<name>(g, ox, oy, opts)` -> draws into group `g` at world offset (ox,oy), returns an object of anchors. Never draw outside the function.
3. First line of the function body wraps everything in `<g filter="url(#sh)">` (drop shadow). Exactly one shadow group per asset.
4. Only colours registered in `iso/tokens.json` (`__allHex`). New colour = register first, with a role note. Prefer an existing token.
5. Projection is the global `ISO.I(x,y,z)`. No hand-made transforms for geometry. Resizing = scale the group about its ground anchor (see `sc()` in environments).
6. Text is Inter only, drawn on a face with a matrix transform (section 6).
7. Corporate/Classified/OT/Isolated identity is a thin coloured rail/stripe, never a body recolour (section 4).
8. Gold `#F5A800` is the accent. It is one-way flow, status edge, name rail, key light. Large gold fill only for gateway chevrons.
9. Add the asset to `asset-manifest.json`, run `node Common/tools/lint_asset.js` (must print ALL CLEAN), render previews, update `ASSET_CATALOG.md`, then `--write-baseline`.
10. After ANY edit to `iso-lib.js`: `node Common/tools/lint_asset.js --check-baseline` MUST pass for all pre-existing ids, plus re-render earlier projects' stills (`Common/tools/stills.js`) and confirm unchanged. A deliberate change to an existing asset is only allowed if the user asked for it; then say so in the commit.

## 1. Look and feel in one paragraph
Premium dark industrial hardware, seen in true isometric from the upper left. Matte graphite bodies with crisp 1.4 px lighter edges, three-face lighting (top lightest, left mid, right darkest), black glass screens with tiny UI rows, a single gold accent line per product, soft large drop shadow. Calm, precise, expensive. No cartoon outlines, no gradients on bodies (except the defined `bodyL/bodyR` on slab extrusions), no textures, no glow, no bevel noise, no reflections beyond one 3.5-6 % white glare polygon on glass.

## 2. Projection and axes
`screen = [cx + (x - y) * 0.866 * s, cy + (x + y) * 0.5 * s - z * s]`. `ISO.cam = {cx, cy, s}`; default `{960,700,1.5}`; environment maps use `s = 0.5`.
- +x runs to the lower right, +y to the lower left, +z up. World units, 1 unit = 1 px at s=1.
- Camera sees the **+y face (LEFT, faces lower-left)** and the **+x face (RIGHT, faces lower-right)** and the **top**. Fronts (screens, name plates, bays, ports) go on the **+y face**. Secondary detail (windows on buildings, ports, the CNC console side) goes on +x.
- Flow along the picture: left to right in the film = +x (gateway chevrons point along +x; `rev` mirrors).
- Z-order: draw far to near. Within one asset: base plate -> far parts -> body -> near parts -> screen content -> accents. `box()` already draws left, right, top in the correct order. `extrudeXY` sorts side faces itself.
- In environments, assets are depth-sorted with `add(depth, fn)`; depth ~ (x + y) of the anchor plus manual tweaks (see `Projects/02_*/environment.html`).

## 3. Geometry vocabulary (use only these)
| Helper | Use |
|---|---|
| `ISO.box(x,y,z,w,d,h, top,left,right, p, stroke, ox,oy)` | Any rectangular block. Default workhorse. |
| `ISO.extrudeXY(footprint, z0,z1, side, top, p, stroke, ox,oy)` | Rounded plates, discs (20-24 pts), capsule bodies, drums. Footprint from `ISO.rr(x0,y0,x1,y1,r,n)`. |
| `ISO.extrudeXZ(profile, ya,yb, side, front, ...)` | Profile in the x/z plane pushed along y (kiosk slab/stem). |
| `ISO.extrudeYZ(profile, xa,xb, side, end, ...)` | Profile in y/z pushed along x: bent rails, person body parts, legs. |
| `ISO.rr(x0,z0,x1,z1,r,n)` | Rounded rectangle outline; n = 5-6 segments per corner. |
| `chaikin(poly, 1-2)` (internal) | Smooth organic profiles (person). Not exported: copy the 8-line function only inside `iso-lib.js`. |
| `ISO.P(points, fill, stroke, parent, sw)` | Flat polygon on any plane (face detail, LEDs, screen rows, chevrons). All face detail is `P` with `I(...)` corners on a constant x/y/z. |
Rules:
- Corner radii: 8-12 for large housings, 16-22 for base plates and slabs, 2.6 for handhelds. Never sharp-cornered consumer-like shells; rack hardware is sharp boxes with rounded plate.
- Every product stands on a **base plate/plinth**: plate top at z 5-8, protruding 6-12 units beyond the body on every side (platforms 6-8, institution 12/-4, cnc 8). Gives the grounded premium look.
- Heights are believable relative to a 345-unit adult (`person`): kiosk 330, platform D1 54, gateway 54, desk 40+monitor 98, CNC 196, institution 69 + roof. Scale a new product against these, not against the screen.
- Depth cues are only: three-face shading, 0.5 px darker side strips, drop shadow. No outline-only shapes.

## 4. Colour usage
Tokens live in `tokens.json`. Quick map:
- Canvas `#0B0D10`. Floor plate gradient `fl` (`#1E2731 -> #10151B`).
- Block faces (top/left/right/edge): default `#3A444F / #222A32 / #161C22 / #4A5560`; lids/modules `#46515E / #2A323C / #1D232A`; base plates `#2E3741 / #171C22 / #10141A`. Pick a group, do not mix faces of different groups on one block.
- Screens: glass `#0E131A` panel, `#0A0F15` outer, border `#0B0D10` 2 px, content rows `#1A2027`/`#161D25` with 1 px `#3A444F` stroke; ON row stroke `#E6EDF5`, OFF `#33404C`. Status square `#3DDC84` (ok) or `#F5A800` (current/attention).
- Metal highlights: `#C9D1DA` strips (module slots), `#8FA0B3` bay slots, `steel` gradient for plugs/connectors only.
- Zone colours (`#4F8FC9` Corporate, `#9B6FD8` Classified, `#2CC4D9` OT, `#8FA0B3` Isolated): used on (a) a 2-3 unit rail along the top edge of the front face (platform/gateway/CNC base), (b) a 2 unit bezel stripe under a monitor, (c) the screen header bar (0.05 height), (d) a CNC lamp. Nothing else, with one exception: the `guard` lid carries two 24 x 24 zone-colour squares (one per system, `opts.zoneA/zoneB`; right default is `#C8505A` = untrusted side, not malware).
- Threat `#B3121F` only for malware/threat (USB trefoil). Clean `#3DDC84` only for ok/LED/tick.
- Never: pure black fills, pure white (except 3.5-6 % glare), saturated colours on bodies, new greys. Greys differ by <= 0x10 per step; use the ramps.

## 5. Stroke and detail standards
- Block face edges 1-1.4 px in the group's `edge` colour (applies via `box()`). Side strips 0.5 px. Screen outer border 2 px `#0B0D10`. Row outlines 1 px. Gold accents 1.4-2.4 px. Hairline details 0.6.
- Stroke widths are screen px and do NOT scale with `s`. So develop at the design scale in `asset-manifest.json` AND check the 'MAP SCALE s=0.5' panel in the preview: it must stay readable and not look heavy.
- Stroke joins round (`stroke-linejoin: round` is set by `P`).
- Detail density: each product gets 2-4 *signature* details (see catalog) and one named screen/plate. Do not fill every face; empty graphite is part of the style.
- Minimum feature size: 4 world units (a LED square is 7x5, a USB port 14x8). Anything smaller is dropped.
- LEDs: three squares stacked on the right end of a front face: `#E6EDF5` (power), `#F5A800` (activity), `#3DDC84` (ok), 7x5 units, 11 apart.

## 6. Typography on faces
- Inter 700, size in world units (platform nameplate 11, sandbox 9.5, gateway 10, pass 3.6/800), `letter-spacing .08em`, fill `#F5F7FA`, `text-anchor: middle`, centred horizontally and vertically on the face.
- Two lines max, UPPERCASE on hardware: `['DFX ONE PLATFORM']`, `['DFX MALWARE','MITIGATION SANDBOX']`, `['DFX UNIDIRECTIONAL','GATEWAY']`. Product naming is fixed (see `../../CLAUDE.md`): DFX Media Transfer Station, DFX One, DFX TruCDR, DFX Malware Mitigation Sandbox, DFX Unidirectional Gateway, DFX PASS. New products: get the official name from Burak, never invent.
- +y (left-facing) face: `transform="matrix(0.866*s 0.5*s 0 s ox oy)"` where (ox,oy) = `ISO.I(...)` of the text origin; text x/y in world units.
- Floor/lid text (zone labels): `matrix(0.866*s 0.5*s -0.866*s 0.5*s ox oy)`.
- Never rotate text any other way, never use other fonts, never outline text.

## 7. Anchors (return value contract)
Return an object of named screen-space points (`ISO.I(...)` results) that the film engine uses to attach popups, flow ends, chips. Reserved names: `screen`, `front`, `top`, `tops` (array), `center`, `nfc`, `port`, `plug`, `connector`, `badge`, `head`, `hand`. Anchors MUST be finite. Document each in the manifest `anchors_returned` list. Known quirk: `institution.entrance` is WORLD `[x,y]` not screen; do not copy this for new assets (return screen points).

## 8. Options pattern
`opts` is a plain object; every option has a default so `asset(g,ox,oy)` always works. Existing: `zone` ('corp'|'cls'|'ot'|'iso'), `mods`, `lift[]`, `lid` ('arrow'), `rev`, `lines`, `fs`, `rail`, `w d h`, `files`, `badge:false`, `cable`, `z0`, `refined`, `legs2`, `labels`. Zone variants are options, not copies. Never add a new asset function for something that is a colour or a lid change.

## 9. Product family rules
- **Rack appliances** (DFX One, Sandbox, Gateway and any new server-type product such as a Secure Email Gateway): MUST be built on `platformD1` (196 x 112 x 48, plate 6) with different `lines`, `rail`, lid. Same plate, same left-end two vertical bays, same right-end three LEDs, same centred name plate, same gold or zone rail. Differentiator = the lid (modules / glass chamber / chevrons / new glyph) and the text, not the body.
- **Endpoints** (kiosk, desk PC, CNC console): own function, zone-coloured bezel stripe, screen content uses the 4-row pattern.
- **Handhelds/small parts** (USB, PASS): own function, drawn at their real ratio, shown larger via `sc()`.
- **People**: only `person2` with `refined:1,legs2:1`. No new characters.
- **Buildings**: `institution` with `w`/`d` options. Columns + pediment + gold flag.

## 10. Quality gate (every new/changed asset)
1. `node Common/tools/lint_asset.js` -> ALL CLEAN (no NaN, tokens only, shadow group, anchors match manifest, Inter text).
2. `node Common/tools/preview_assets.js <id>` -> open `iso/previews/<id>.png`; check all three panels. Compare side by side with `_sheet.png` neighbours: same weight, same darkness, same plate, same edge light.
3. Place it in an environment at `s=0.5`, 1920x1080, next to a `person2` and verify scale, depth order, shadow overlap.
4. Pixel regression: `lint_asset.js --check-baseline` for old ids; stills from earlier projects unchanged.
5. Docs: manifest entry, catalog section, tokens if any, previews committed.
6. Commit message lists new/changed ids and states "existing assets unchanged" (baseline verified).

## 11. Anti-patterns (reject on sight)
Gradients on body faces; glow/blur; outlines thicker than 2.4; more than one accent colour per product; text in lowercase on hardware; text not on a face matrix; copying iso-lib code into a project; per-project private asset functions; hand-drawn paths instead of `P/box/extrude*`; new greys; zone colour as body fill; sharp-edged consumer housings; floating objects without plate/shadow; anchors in world space; forgetting the manifest/lint/preview step.
