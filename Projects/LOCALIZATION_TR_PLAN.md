# Turkish localization plan (Projects 01 and 02)

Decided 2026-11-26 (Burak): voice = audition first (Cedric M + 2-3 native Turkish documentary voices, same 2-line sample); Project 01 gets phrase-level sync like Project 02 (picture may grow); order = Project 01 first, then 02.

| # | Phase | Output | Gate |
|---|---|---|---|
| 1 | Glossary | `Projects/glossary_tr.md`: network names, "Industrial OT", Cooperation Partner Organization, slogans, UI labels. Product names stay English as on screen. | Burak approves |
| 2 | Text inventory | `i18n/en.json` per project (P01 about 105 strings, P02 about 131): captions, popups, banners, file rows, floor tags, closing | auto |
| 3 | Turkish copy | `script/voiceover_tr.md` (P01 12 lines, P02 20 lines) + `i18n/tr.json`; formal, natural, no AI tone; tightened to scene windows | Burak reviews full script before ANY generation |
| 4 | Engine | one engine, string table + `?lang=tr`; Inter glyphs (ğ ü ş ı İ ö ç) and fit checked by `__check`; English stills must stay identical | stills diff |
| 5 | Voice | audition, pick, then one take per line, no retries | Burak picks voice |
| 6 | Sync | measure TR audible onsets, rebuild timing table (P02 `A`/`starts.json` model; P01 migrates to it), re-time camera/popups/captions | onset check |
| 7 | Render + mix | `master_tr` silent + voiced per project; UI cues only, no ambient bed; -16 LUFS, noise-floor check, frame samples | Burak review |
| 8 | Ship | renders under 100 MB, READMEs/PLAN updated, push | |

Rules that stay: Cedric/ElevenLabs one take per line; show full script first; AskUserQuestion for decisions; Turkish formal register; no AI-sounding copy; English masters untouched.
