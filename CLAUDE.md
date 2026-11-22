# DFX_Marketing: instructions for Claude

DataFlowX marketing production repo (videos first). Read `README.md` and `Common/README.md` before starting any video work. Before drawing or changing ANY asset or visual element, read `Common/docs/STYLE_GUIDE.md` (index: `Common/docs/README.md`); for a new product asset follow `Common/docs/NEW_ASSET_PLAYBOOK.md`.

## Rules
- Reusable things (isometric asset library, logos, render/audio tools, voice settings) live in `Common/`. Never copy them into a project; extend them in `Common/`.
- Every video/project gets its own folder `Projects/NN_Name/` (environment page, engine, scripts, vo, renders, README). Load shared code by relative path `../../Common/...`.
- Start a new video by copying the structure of `Projects/01_Portfolio_DataStationX/`, then write a plan before coding.
- After touching `Common/iso/iso-lib.js`, run `node Common/tools/lint_asset.js --check-baseline` (must pass for existing assets), re-render stills of earlier projects (`Common/tools/stills.js`) and confirm they are unchanged.
- New/changed assets: register in `Common/iso/asset-manifest.json` and `tokens.json`, run `lint_asset.js` (ALL CLEAN) and `preview_assets.js`, update `Common/docs/ASSET_CATALOG.md`, refresh the baseline only after approval.
- Visual: 1920x1080, 30 fps, Pantone 130C gold #F5A800 on #0B0D10, Inter. Names on screen: DFX Media Transfer Station, DFX One, DFX TruCDR, DFX Malware Mitigation Sandbox, DFX Unidirectional Gateway, DFX PASS. Third network is "Industrial OT" in speech, "OT" on screen.
- Voice: Cedric M, ElevenLabs `VvVVKaa2nHZpbZdtSRSX`, model `eleven_v4`. One take per line; never repeat a generation call to retry; show the full script to Burak before generating.
- Ask Burak decisions with AskUserQuestion (recommended option first). Turkish for formal/client-facing copy. No AI-sounding copy.
- Commit renders under 100 MB; no secrets, tokens or signed URLs in the repo.
