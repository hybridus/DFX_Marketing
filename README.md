# DFX_Marketing

DataFlowX marketing production kit: reusable assets and one folder per video/project.

```
Common/                          shared by every project
  iso/iso-lib.js                 isometric SVG asset library (kiosk2, person2, USB, institution, DFX One platform, sandbox, gateway, desk PC, CNC, PASS, Secure Email Gateway)
  iso/tokens.json                design tokens (colours, face groups, strokes, type); iso/asset-manifest.json asset registry; iso/baseline-hashes.json regression hashes
  iso/previews/                  _sheet.png (all current assets) + one PNG per asset (clean | anchors | map scale)
  iso/templates/                 worked example for a new product asset (proposal)
  docs/                          AGENT DOCS: STYLE_GUIDE, ASSET_CATALOG, NEW_ASSET_PLAYBOOK, SCENE_AND_UI_SPEC (start at docs/README.md)
  brand/                         logo files (white + Pantone 130C gold, for dark backgrounds)
  tools/                         render_range.js, stills.js, shot_env.js, duration.js, lint_asset.js (asset lint + baseline), preview_assets.js (previews)
  audio/ , voice/                audio conventions and the approved narrator
Projects/
  01_Portfolio_DataStationX/     164 s portfolio film: Media Transfer Station scenario on one isometric topology
  02_Sensitive_Orgs_Import_Export/  Public/Classified import + export film for law enforcement, intelligence and defense
```

**Rule:** anything reusable goes in `Common/`. A new project gets its own `Projects/NN_Name/` folder and loads Common by relative path (`../../Common/...`). Never copy `iso-lib.js` into a project; extend it in Common, run `node Common/tools/lint_asset.js --check-baseline` and re-check old projects with `stills.js`. New product assets (e.g. DFX SEG): follow `Common/docs/NEW_ASSET_PLAYBOOK.md`.

Requirements: node + playwright (chromium), ffmpeg, python3 (+ numpy for audio). No secrets are stored here; ElevenLabs generation happens through the Claude connector.
