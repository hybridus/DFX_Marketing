# Common/docs: index for Claude agents

| File | Read it when |
|---|---|
| `STYLE_GUIDE.md` | ALWAYS before drawing or changing anything visual. Strict rules, checklist, anti-patterns. |
| `ASSET_CATALOG.md` | You need exact specs of an existing asset, its opts and returned anchors, or composition recipes. |
| `NEW_ASSET_PLAYBOOK.md` | You create an asset for a new product (DFX SEG etc.). Step-by-step with commands. |
| `SCENE_AND_UI_SPEC.md` | You build an environment, popups, captions, banners, timing for a new film. |
| `../iso/tokens.json` | Machine-readable colours, face groups, strokes, typography. Lint allow-list. |
| `../iso/asset-manifest.json` | Machine-readable asset registry (ids, opts, anchors, status). |
| `../iso/baseline-hashes.json` | SVG hash per asset; detects accidental changes. |
| `../iso/previews/` | `_sheet.png` (all current assets), `<id>.png` per asset (clean / anchors / map scale). |
| `../iso/templates/` | Worked example for a new product. |
| `../tools/lint_asset.js`, `preview_assets.js` | Verification and previews. |

Truth order when sources disagree: `iso-lib.js` > `tokens.json` > `asset-manifest.json` > these markdown files.
Source of everything visual: `Common/iso/iso-lib.js`. Brand files: `Common/brand/`.
