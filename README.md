# DFX_Marketing

DataFlowX marketing production kit: reusable assets and one folder per video/project.

```
Common/                          shared by every project
  iso/iso-lib.js                 isometric SVG asset library (kiosk, person, USB, DFX One platform, sandbox, gateway, desk PC, CNC, PASS)
  iso/previews/                  PNG reference renders of the approved assets
  brand/                         logo files (white + Pantone 130C gold, for dark backgrounds)
  tools/                         render_range.js (time range -> mp4), stills.js (PNG at given times), shot_env.js (environment PNG)
  audio/ , voice/                audio conventions and the approved narrator
Projects/
  01_Portfolio_DataStationX/     164 s portfolio film: Media Transfer Station scenario on one isometric topology
```

**Rule:** anything reusable goes in `Common/`. A new project gets its own `Projects/NN_Name/` folder and loads Common by relative path (`../../Common/...`). Never copy `iso-lib.js` into a project; extend it in Common and re-check old projects with `stills.js`.

Requirements: node + playwright (chromium), ffmpeg, python3 (+ numpy for audio). No secrets are stored here; ElevenLabs generation happens through the Claude connector.
