# VO takes (English master)
Cedric M (VvVVKaa2nHZpbZdtSRSX), eleven_v4, one take per line, no retries. Generated 2026-11-09 from script/voiceover.md. s00i (intro) added in the sync rework.

Sync model (v7): camera, popups, captions, banners, risk line and closing are set in real seconds from each line's audible start (start + 0.3 s). Popup rows tick on the spoken words. Chips and flows use a design clock mapped to real time by anchors in engine.js (ANCH). Audible starts live in `A` (engine.js) and `starts.json`.

| File | Seconds | Audible start (s) | Audible end (s) |
|---|---|---|---|
| s00i | 4.0 | 0.5 | 4.5 |
| s00 | 12.1 | 5.0 | 17.1 |
| s01 | 8.0 | 21.0 | 29.0 |
| s02 | 18.1 | 29.8 | 47.9 |
| s02b | 13.2 | 51.2 | 64.4 |
| s03 | 7.2 | 66.4 | 73.6 |
| s04 | 19.9 | 75.7 | 95.6 |
| s05 | 6.1 | 97.0 | 103.1 |
| s06 | 5.1 | 106.5 | 111.6 |
| s07 | 12.1 | 114.5 | 126.6 |
| s08 | 7.3 | 129.3 | 136.6 |
| s09 | 16.7 | 137.9 | 154.6 |
| s10 | 16.7 | 157.5 | 174.2 |
| s11 | 11.5 | 175.3 | 186.8 |
| s12 | 3.7 | 188.9 | 192.6 |
| s13 | 13.5 | 195.7 | 209.2 |
| s14 | 10.3 | 212.3 | 222.6 |
| s15 | 9.2 | 225.3 | 234.5 |
| s16a | 5.4 | 235.7 | 241.1 |
| s16b | 6.0 | 242.1 | 248.1 |

Rebuild: `bash render.sh v7` then `bash mix_vo.sh renders/master_silent_v7.mp4 renders/master_vo_v2.mp4 starts.json`.
