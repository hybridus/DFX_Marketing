# Playbook: add an asset for a new product (e.g. DFX SEG, Secure Email Gateway)

Goal: the new asset is indistinguishable in shape language, weight, quality and polish from `Common/iso/previews/_sheet.png`. Follow the steps in order. Do not skip the plan (Burak's standing rule: plan before coding; ask decisions with AskUserQuestion, recommended option first).

## Step 0. Inputs you MUST have (never assume; ask Burak if missing)
| Item | Example for DFX SEG | Source |
|---|---|---|
| Official on-screen name | "DFX Secure Email Gateway" (UNCONFIRMED) | Burak |
| Product class | rack appliance (family of DFX One / Gateway) | Burak / datasheet |
| Which zone(s) it sits in | Corporate / Classified / DMZ | scenario |
| What it does in one line (drives the lid glyph) | filters mail, strips active content, one-way | product sheet |
| Signature glyph idea | envelope on the lid chamber | proposal, approve |
| Flow direction | which way gold chevrons or arrows point, if any | scenario |
| Popups/screens needed | e.g. "Mail policy", "Attachment CDR" rows | script |

## Step 1. Choose the construction route (decision table)
1. Server-type product -> **compose on `platformD1`** (preferred, 90 % of cases). Pass `lines`, `fs`, `rail`, lid option; add one glyph on the lid. Worked example: `Common/iso/templates/example-secure-email-gateway.js` (preview: `Common/iso/previews/emailGateway.png`).
2. Same body, new lid pattern used in more than one asset -> add a new `opts.lid` value inside `platformD1` (like `'arrow'`). Existing lid outputs MUST stay byte-identical (baseline check).
3. Endpoint / appliance with a screen (kiosk-like) -> new function modelled on `deskpc` or `kiosk2` (plate, rails, 4-row screen, zone stripe).
4. Handheld / small part -> new function modelled on `pass` or `usb` (design at real size, show scaled).
5. Anything else -> write the plan, show Burak a preview first.

## Step 2. Write the brief (put it in the PR/commit message and in the catalog)
Name, class, size x·y·z, zone, route, signature details (2-4), name plate lines (max 2, UPPERCASE), lid, opts, anchors returned, which colours (all from tokens), scale in environments, where it appears.

Sizing rules of thumb (world units): rack appliance 196·112·54; desk-class 150·80·~138; machine room-size 300·170·~214; person 323; kiosk 330. Pick a size relative to these, not relative to its icon.

## Step 3. Implement
1. Work in `Common/iso/iso-lib.js` (never in a project). Insert after the last current asset, before the closing `})(window)`. Never reorder existing code.
2. Skeleton (pure composition route):
```js
ISO.assets.emailGateway = function (g, ox, oy, opts) {
  opts = opts || {};
  var r = ISO.assets.platformD1(g, ox, oy, { lines: opts.lines || ['DFX SECURE EMAIL','GATEWAY'], fs: 10, mods: 0, rail: opts.rail });
  var host = g.lastChild;                       // the asset's <g filter="url(#sh)"> group
  /* signature glyph here: P([...ISO.I(ox+x, oy+y, zTop)], fill, stroke, host, sw) */
  r.glyph = ISO.I(ox + xm, oy + ym, zTop);     // extra anchor
  return r;
};
```
3. New-body route skeleton:
```js
ISO.assets.myThing = function (g, ox, oy, opts) {
  opts = opts || {};
  var G = ISO.se('g', { filter: 'url(#sh)' }, undefined, g);          // rule 3
  ISO.box(-7,-7,0, w+14,d+14,6, '#2E3741','#171C22','#10141A', G, '#4A5560', ox, oy);   // plate
  ISO.box(0,0,6, w,d,h, '#3A444F','#222A32','#161C22', G, '#4A5560', ox, oy);           // body
  // +y face details via ISO.P with ISO.I(ox+x, oy+d, z); +x face details with ISO.I(ox+w, oy+y, z)
  return { front: ISO.I(ox + w/2, oy + d, h/2), top: ISO.I(ox + w/2, oy + d/2, 6 + h) };
};
```
4. Faces per the style guide: name plate centred on +y with the matrix transform, 2 left bays, 3 right LEDs, zone rail 2.5 high at the top edge of the +y face. Gold is the only accent.
5. Draw order far -> near. Verify the asset in front of/behind another in an environment.
6. No new greys: use `tokens.json`. If a new colour is truly needed, add it to the right group + `__allHex`, with a role.

## Step 4. Register
1. `Common/iso/asset-manifest.json`: add `{id, fn, status:"current", product, opts, s, anchors_returned, anchor_space}` (one entry per variant, e.g. `emailGateway.cls`).
2. `Common/docs/ASSET_CATALOG.md`: add a section in the format of the others (silhouette, build, signature details, opts, returns, placement) and a row in the overview table.
3. `Common/README.md` asset list line; this playbook if the route/rules changed.

## Step 5. Verify (all must pass; do not claim done otherwise)
```bash
export NODE_PATH=$(npm root -g)
node Common/tools/lint_asset.js                        # ALL CLEAN (new + old assets)
node Common/tools/lint_asset.js --check-baseline       # existing assets unchanged (only the new id is "missing" until baselined)
node Common/tools/preview_assets.js <newId>            # LOOK at the 3 panels, then _sheet.png (full run)
node Common/tools/lint_asset.js --write-baseline       # only after the above and approval
```
Visual acceptance (look, do not guess): same plate overhang as neighbours; edge colour and weight equal; name plate centred and readable at s=0.5; gold accent count = 1 line + LEDs (+ glyph); no element < 4 units; shadow identical; sits correctly beside `person2` (scale) in a test environment at 1920x1080. Re-render stills of earlier projects if `iso-lib.js` changed: unchanged.

## Step 6. Ship
Commit in `Common/` only (assets, manifest, docs, previews, baseline). Message: new ids, "existing assets unchanged (baseline verified)". Push to `origin main`. Then a project may use the asset via `../../Common/iso/iso-lib.js`; projects never contain asset code.

## Appendix: ready-made recipes for likely next products (PROPOSALS; confirm with Burak first)
| Product | Route | Signature (proposal) |
|---|---|---|
| DFX SEG (Secure Email Gateway) | compose on platformD1 | flat gold-outlined envelope on lid chamber; text `DFX SECURE EMAIL / GATEWAY` |
| DFX Web/File gateway-type | compose on platformD1 | globe/arc glyph on lid; keep gold + zone rail |
| Any new endpoint | new fn from `deskpc` | 4-row screen, zone bezel stripe, own header bar |
| Any new handheld | new fn from `pass` | gold edge ring, name on screen |
Glyph rules: flat on the lid chamber top (z = z1+12), max 3 strokes, 1-1.4 px gold or `#C9D1DA`, no fills except `#0E131A`/`#46515E`, must read at s=0.5.
