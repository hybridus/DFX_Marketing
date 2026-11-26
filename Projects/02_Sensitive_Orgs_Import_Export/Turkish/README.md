# Project 02, Turkish version (voice-over and on-screen text)

English master is locked (`../ENGLISH_LOCK.sha256`, verify with `cd .. && sha256sum -c ENGLISH_LOCK.sha256`). Nothing in `..` is edited; everything Turkish is generated from it.

## How it is built
- `i18n/tr.json`: exact-literal translation table (old, new, expected count) applied to COPIES of `../engine.js` and `../environment.html`. Product names stay English (DFX Media Transfer Station, DFX One, DFX TruCDR, DFX Malware Mitigation Sandbox, DFX Unidirectional Gateway, DFX End-User). Sample file names are localized (ASCII).
- `i18n/warp.json`: timing spec. The English animation plays unchanged; a clock warp (Turkish film time to English film time) is appended to the generated engine, so every popup, camera move, chip and flow lands on the Turkish phrase it belongs to. Pairs = [English event offset, Turkish phrase onset] per line, measured with silencedetect.
- `i18n/build_tr.py`: applies the tables (aborts on any count mismatch), builds the warp (aborts if not strictly monotone, warns on slopes outside 0.45..1.7), writes `engine.js`, `film3.html` and `i18n/starts_tr.json` (Turkish VO start times).
- `i18n/check_fit.js`: engine checks, text-fit and collision check at every 0.25 s, plus a census of all on-screen strings (`i18n/census.txt`).
- `render.sh` (silent master, 3 parallel parts) then `mix_tr.py` (VO only, loudnorm -16 LUFS / -1.5 TP, overlap check).
- `script/voiceover_tr.md`: the 20 lines, generated verbatim. `vo/`: one take per line (voice Kerem, eleven_v4, one take each, no retries).

## Film length
Turkish film is about 259 s (English 249.5 s) because the Turkish lines run longer.

## Open points (for Burak)
- Voice was chosen by analysis, not by ear (see `../../01_Portfolio_DataStationX/Turkish/voice_choice.md`).
- Closing slogan and chapter titles are proposals: "Hiçbir şey görülmeden geçmez. Hiçbir şey kaydedilmeden geçmez.", "Gizli ağa giriş", "Gizli ağdan çıkış".
- Terms: açık ağ / gizli ağ / iş birliği yapılan kurum / gözetim zinciri. Glossary: `../../01_Portfolio_DataStationX/Turkish/script/glossary_tr.md`.
- One slow stretch: the end of the inspection line (about 1.2 s at 0.44x playback speed), because the Turkish line is longer.
