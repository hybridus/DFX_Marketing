# Common

## Visual system
- Output 1920x1080, 30 fps, H.264 (yuv420p, crf 18). Isometric SVG, rendered frame by frame with Playwright -> ffmpeg.
- Colors: Pantone 130C gold `#F5A800` (brand/accent), background `#0B0D10`, Corporate blue `#4F8FC9`, Classified violet `#9B6FD8`, OT cyan `#2CC4D9`, isolated gray `#8FA0B3`, clean green `#3DDC84`, threat red `#B3121F`, quarantine soft red `#C8505A` / `#E4838B`. Font: Inter.
- Naming on screen: DFX Media Transfer Station, DFX One (Platform), DFX TruCDR, DFX Malware Mitigation Sandbox, DFX Unidirectional Gateway, DFX PASS. Third network = **Industrial OT** in speech, **OT** on screen.

## iso/iso-lib.js
`ISO.I(x,y,z)` projects world coordinates to the screen; `ISO.assets.<name>(group, x, y, opts)` draws an asset: `kiosk2`, `person2`, `usb`, `platformD1`, `sandbox`, `gateway`, `deskpc`, `cnc`, `pass` (`opts.cable` = cable length, draws "DFX PASS" on its screen). Assets are resized by scaling their group about a ground anchor. Text on floors/faces uses matrix transforms. Flow arrowheads are drawn flat on the floor.

## tools
- `node tools/render_range.js T0 T1 out.mp4` renders `film3.html` from the current folder for that time range (page must expose `window.setTime(t)` and `window.__ready`).
- `node tools/stills.js 40 70 100` writes `still_<t>.png` for quick checks.
- `node tools/shot_env.js` screenshots `environment.html`.
- Use `export NODE_PATH=$(npm root -g)` if playwright is installed globally. The renderers wait 1 s for images (logo) to load.

## Voice
Approved narrator: **Cedric M – Engaging Documentary Narrator**, ElevenLabs `VvVVKaa2nHZpbZdtSRSX`, model `eleven_v4`. Tone: calm, documentary, authoritative, native British; not an advert voice. Generate one take per line, sequentially or a few at a time (a burst of parallel calls hit an account error once). Keep the exact text in `Projects/*/script/voiceover.md`.
Voices tried and rejected: Odom, Daniel, Martin (good fallback), Sarah, George, Natraj (right style, accent too far), Timothy.

## Audio
Ambient bed (55 / 82.5 / 110 Hz drone + soft noise, ducked under the voice by sidechain), UI cues synthesized with numpy (click, chime, tick, confirm, blip, thud, stamp, whoosh, sweep, hum, swell), final loudness -16 LUFS, true peak <= -1.5 dBTP target. See `Projects/01_Portfolio_DataStationX/mkaudio.py` and `mix.sh`.
