# 02 Classified Extract: implementation plan (draft for approval)

Goal: 165 s film, same architecture as project 01 (shared `Common/`, same environment map, same engine pattern, Cedric voice). Scenario: a user inside the Classified network extracts files to the Corporate network and onward to an external party.

## Rules from Burak (do not change)
1. Start: the employee uses the **DFX One portal inside Classified** (no USB at the start).
2. Outbound path: a **dedicated outbound DFX Unidirectional Gateway** (Classified to Corporate).
3. The **approver (data owner) sits inside Classified**. Every check and control happens **before** the files leave Classified.
4. Controls: two-person approval, content review / DLP and classification check.
5. **Encryption happens on the DFX Unidirectional Gateway**: files that are classified are encrypted before transmission to Corporate; unclassified files go as they are. The end user can request encryption; the approver can force or remove it (approver has the final say).
6. Delivery to the Corporate side: **both** a DFX Media Transfer Station (writes encrypted/plain files to USB) and the Corporate DFX One portal download.
7. The encrypted USB can be handed to an external party safely (protected against loss, theft, man-in-the-middle).
8. Example set: 10 files = 2 blocked (secret markings), 3 classified so encrypted, 5 unclassified sent as is.

## Scenes (target 165 s)
| # | Time (s) | Content |
|---|---|---|
| 0 | 0-22 | Zone tour, focus on Classified; risk line (draft: data leaving the most trusted network is the highest-stakes transfer) |
| 1 | 22-32 | Analyst in Classified needs to release files |
| 2 | 32-54 | Login to DFX One portal (Classified), select files, destination Corporate, tick "Encrypt for external delivery", submit |
| 3 | 54-62 | Policy engine: user, destination, labels |
| 4 | 62-84 | Multi-AV + TruCDR + sandbox + DLP / classification check; verdict 10 files |
| 5 | 84-100 | 2 blocked files to quarantine; request goes to the data owner inside Classified; approver reviews verdict and DLP findings, approves, can force or remove encryption |
| 6 | 100-108 | Approved files sealed and stored in DFX One |
| 7 | 108-130 | Outbound DFX Unidirectional Gateway: seal verified, 3 classified files encrypted (lock), 5 plain; one way only |
| 8 | 130-146 | Corporate side: files arrive; path A Media Transfer Station writes USB, path B portal download |
| 9 | 146-157 | USB handed to an external party; encrypted files readable only with the key |
| 10 | 157-165 | Closing lines, logo card |

## Build steps
1. Create `Projects/02_Classified_Extract/` from project 01 (environment.html, engine.js, make_film3.py, render.sh, mix.sh, mkaudio.py), loading `../../Common/...`.
2. Environment: add the outbound gateway (Classified to Corporate) using the existing gateway asset, a Classified-side portal PC and approver PC (desk PC asset), Corporate-side station and external-party person. Any new asset goes into `Common/iso/iso-lib.js` and is checked against project 01 with `stills.js`.
3. Engine: new CAM keys, captions, bubbles (portal request, DLP verdict, approval, gateway encrypt, delivery), 10 chips with states (blocked / encrypt / plain), lock icons, USB-out animation.
4. Script v1 -> show to Burak -> approve -> ElevenLabs (Cedric), one take per line.
5. Render silent master, review rounds, then mix audio, then publish to repo and Project.

## Open items
- Exact wording of the risk line (scene 0) and closing lines.
- Whether the film carries the same closing slogan.
- Real names/types of the 10 files (proposal after approval).
