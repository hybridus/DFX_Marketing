# 01 Portfolio film: DFX Media Transfer Station on one topology

Approved silent master v4 (164 s) and master with voiceover v1 (166 s) are in `renders/`.

## Files
| File | Purpose |
|---|---|
| `environment.html` | Static isometric master map (all zones, assets, flows). Edit this to move/resize things. |
| `make_film3.py` | Generates `film3.html` from `environment.html` (strips captions, wraps USB, appends engine). Always re-run after editing the environment. |
| `engine.js` | Time-driven film engine: camera keys (`CAM`), captions (`CAPS`), bubbles (`BUB` + `DRAW`), file chips, VM windows, quarantine folder, closing card. `window.setTime(t)` draws any frame. |
| `render.sh` | Render the silent master in 3 parallel parts and join (~8 min). |
| `mkaudio.py`, `mix.sh` | Build the bed and UI cues, then mix with `vo/*.mp3` into `master_vo.mp4`. |
| `script/voiceover.md` | Final English script with film times. |
| `vo/` | The 12 approved Cedric takes (`s00`..`s10b`). |

## Reproduce
```
export NODE_PATH=$(npm root -g)
./render.sh                       # -> master_silent.mp4
./mix.sh master_silent.mp4        # -> master_vo.mp4
```
(`mix.sh` alone uses `renders/master_silent_v4.mp4`.) Frame output was verified pixel-identical to the approved render after moving to this layout.

## Scenario and timeline (engine seconds)
Employee at the DFX Media Transfer Station (USB, NFC ID, picks files, destination Corporate / Classified / OT) -> DFX One (policy; multiple AV engines + DFX TruCDR + DFX Malware Mitigation Sandbox in parallel; verdict 10 files = 2 quarantined, 6 sanitized, 2 clean; quarantined files go to the security admin/SOC via the DFX One portal; the 8 approved files are sealed and stored) -> DFX Unidirectional Gateway (separate Classified and OT instances; 8 chips) -> connected OT: CNC control PC verifies the seal and the CNC starts; isolated OT: DFX PASS connects to the gateway (cable or OT Wi-Fi), fetches files only for the authorized computer and employee, and hands them to the isolated CNC.
Scenes: 0 opening/zone tour/risk 0-22 | 1 corporate 22-32 | 2 station 32.5-56 | 3 policy 56.5-64 | 4 inspection 64.5-88 | 5 quarantine 88.5-96 | 6 seal and store 96.5-105.5 | 7 gateway 106.5-125.5 | 8 connected OT 126.5-133.9 | 9 isolated OT with PASS 134.5-155.5 | 10 close 156-164 (logo card 160). Risk text "One infected USB can undo every boundary you built." 18.8-22.4.

## Decisions to keep
- Files go to the OT zone only when the user selects OT at the station; nothing is delivered to the Corporate PC (that PC plays the Security Admin/SOC console).
- Bubbles are frozen at the camera of their start time (no drift). No arrow into the sandbox; three VM windows pop up above it.
- Quarantine folder is soft red; it fades in, takes the red files, fades out.
- File-name types follow the selected types (10-file set: price_list.xlsm, invoice_scan.pdf, specification.docx, ...).
- Closing: "File transfer is controlled end-to-end into every network you protect." then "DataFlowX. Control the Flow, Secure the Operation."

## Next
Interactive scenario-tree page, English/Turkish versions (Turkish copy reviewed by Burak), branch clips (classified path, denied badge/file type, quarantine and admin review).
