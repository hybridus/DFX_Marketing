# Common

## Visual system
- Output 1920x1080, 30 fps, H.264 (yuv420p, crf 18). Isometric SVG, rendered frame by frame with Playwright -> ffmpeg.
- Colors: Pantone 130C gold `#F5A800` (brand/accent), background `#0B0D10`, Corporate blue `#4F8FC9`, Classified violet `#9B6FD8`, OT cyan `#2CC4D9`, isolated gray `#8FA0B3`, clean green `#3DDC84`, threat red `#B3121F`, quarantine soft red `#C8505A` / `#E4838B`. Font: Inter.
- Naming on screen: DFX Media Transfer Station, DFX One (Platform), DFX TruCDR, DFX Malware Mitigation Sandbox, DFX Unidirectional Gateway, DFX PASS. Third network = **Industrial OT** in speech, **OT** on screen.

## iso/iso-lib.js
`ISO.I(x,y,z)` projects world coordinates to the screen; `ISO.assets.<name>(group, x, y, opts)` draws an asset. Current: `kiosk2`, `person2`, `usb`, `institution`, `platformD1`, `sandbox`, `gateway`, `deskpc`, `cnc`, `pass`. Legacy (old renders only): `kiosk`, `person`, `platformA/B/C/D`. Assets are resized by scaling their group about a ground anchor. Text on floors/faces uses matrix transforms. Flow arrowheads are drawn flat on the floor.

## Documentation for agents (start at `docs/README.md`)
`docs/STYLE_GUIDE.md` (strict rules), `docs/ASSET_CATALOG.md` (exact specs of every asset), `docs/NEW_ASSET_PLAYBOOK.md` (how to add a product such as DFX SEG), `docs/SCENE_AND_UI_SPEC.md` (environments, popups, captions, timing); machine-readable `iso/tokens.json`, `iso/asset-manifest.json`, `iso/baseline-hashes.json`; previews in `iso/previews/_sheet.png`.

## tools
- `node tools/render_range.js T0 T1 out.mp4` renders `film3.html` from the current folder for that time range (page must expose `window.setTime(t)` and `window.__ready`).
- `node tools/stills.js 40 70 100` writes `still_<t>.png` for quick checks.
- `node tools/shot_env.js` screenshots `environment.html`.
- `node tools/lint_asset.js` lints every asset (tokens, NaN, shadow group, anchors); `--check-baseline` after touching `iso-lib.js`; `--write-baseline` after an approved change.
- `node tools/preview_assets.js [id]` renders `iso/previews/` (clean | anchors | map scale) and `_sheet.png`.
- Use `export NODE_PATH=$(npm root -g)` if playwright is installed globally. The renderers wait 1 s for images (logo) to load.

## Voice
Approved narrator: **Cedric M – Engaging Documentary Narrator**, ElevenLabs `VvVVKaa2nHZpbZdtSRSX`, model `eleven_v4`. Tone: calm, documentary, authoritative, native British; not an advert voice. Generate one take per line, sequentially or a few at a time (a burst of parallel calls hit an account error once). Keep the exact text in `Projects/*/script/voiceover.md`.
Voices tried and rejected: Odom, Daniel, Martin (good fallback), Sarah, George, Natraj (right style, accent too far), Timothy.

## Audio
No synthetic ambient bed (it was audible as noise and was removed). Project 01 mixes the narration with synthesized UI cues only (click, chime, tick, confirm, blip, thud, stamp, whoosh, sweep), final loudness -16 LUFS, true peak <= -1.5 dBTP. See `Projects/01_Portfolio_DataStationX/mkaudio.py` and `mix.sh`. Project 02 is voice only (`mix_vo.sh`, `starts.json`).
