# 02 Sensitive Orgs: Import and Export (plan, approved structure)

Audience: law enforcement, intelligence and defense agencies (Corporate + Classified networks only; no OT).
Film: about 215 s, one film in two chapters ("Into Classified", "Out of Classified"). Same architecture as project 01: shared `Common/`, same engine pattern, Cedric voice (ElevenLabs VvVVKaa2nHZpbZdtSRSX, eleven_v4).

## Rules from Burak
1. OT zones, CNC and DFX PASS are removed. Map = Corporate zone + a larger Classified zone.
2. Chapter 1, import: identical process to film 1 (USB, badge, select files, destination, inspection, seal, gateway), but the destination is **Classified**. No approval step on import.
3. Chapter 2, export: the employee uses the **DFX One portal inside Classified** (no USB at the start).
4. Two DFX One platforms: a Corporate instance (import inspection) and a Classified instance (export inspection, DLP, approval, storage). All export checks and the approver stay **inside Classified, before anything leaves**.
5. Two DFX Unidirectional Gateways: inbound (Corporate to Classified) and a dedicated outbound (Classified to Corporate).
6. Export controls: two-person approval by a data owner inside Classified; content review / DLP / classification check. **Encryption happens on the outbound gateway**: classified files encrypted before transmission, unclassified go as they are. User can request encryption; approver can force or remove it (final say).
7. Corporate-side delivery of the export: both a DFX Media Transfer Station (writes USB, encrypted or plain) and the Corporate DFX One portal download. The encrypted USB can be handed to an external party safely (loss, theft, man-in-the-middle).
8. Second import source: a standard user PC in Corporate (with an Internet cloud outside the zone) downloads a file and sends it with the **DFX End-User client app** (shell integration): right-click, "Send To > Classified Network", shown as a zoom on the screen. Both sources merge in one DFX One queue. Import example set (merged): 10 files, 2 of them from the web = 2 quarantined, 6 sanitized, 2 clean. Export example set: 10 files = 2 blocked (secret markings), 3 classified so encrypted, 5 unclassified as is.
9. Vocabulary for this audience: case files, evidence, intelligence reports, chain of custody, need-to-know; the seal also means tamper-evidence.


## Positioning and messaging (decided)
- Problem we solve: sensitive organizations move files by USB (unsafe) or via a Data Transfer Office (queue, hand-over, a technician scanning by hand, night-shift staff). One bad file can compromise a whole network.
- Pillars pushed hardest: **Fluent** (no queue, no hand-over), **Safe** (every file inspected, no blind trust in a person), **Always on** (no night shift needed). Auditability must appear in the slogan.
- Slogan base: "No transfer desk. No queue. No blind spots." plus an audit element (exact wording pending). This replaces "Control the Flow, Secure the Operation" for this project.
- Opening keeps the zone tour with a short risk line built on the single-file risk (not the old-way montage).
- Do not disparage customers' staff; speak about "manual, person-dependent" processes.

## Scenes (target about 215 s)
| # | Time (s) | Content |
|---|---|---|
| 0 | 0-20 | Zone tour (Corporate, Classified); two threats framed: malware coming in, data leaking out |
| Ch.1 card | 20-22.5 | "Into Classified" |
| 1 | 22.5-28 | Corporate employee has files to take into Classified |
| 2 | 28-48 | Media Transfer Station: USB, badge, select files, destination Classified, submit (8 USB files) |
| 2b | 48-63 | Second source: a standard user PC in Corporate downloads a file from the Internet (gray cloud outside the zone). Zoom to the screen: right-click the file, "Send To > Classified Network" (DFX End-User client app, shell integration). 2 web files join the queue |
| 3 | 63-68 | Policy (Corporate DFX One), both sources merge in one queue |
| 4 | 68-85 | Multi-AV, TruCDR, sandbox; verdict on the merged 10 files: 2 quarantined / 6 sanitized / 2 clean (2 of the 10 came from the web) |
| 5 | 85-91 | Quarantine to the security admin |
| 6 | 91-96 | 8 approved files sealed and stored |
| 7 | 96-109 | Inbound gateway, one way, 8 chips |
| 8 | 109-116 | Files arrive on a Classified PC, seal verified |
| Ch.2 card | 116-118.5 | "Out of Classified" |
| 9 | 118.5-135 | Classified DFX One portal: sign in, select files, destination Corporate, "Encrypt for external delivery", submit |
| 10 | 135-153 | Policy, multi-AV, TruCDR, sandbox and DLP / classification check; verdict 2 blocked / 3 classified / 5 unclassified |
| 11 | 153-167 | Blocked files quarantined; data owner (inside Classified) reviews verdict and DLP, approves, can force or remove encryption |
| 12 | 167-172 | Approved files sealed and stored |
| 13 | 172-185 | Outbound gateway: seal verified, 3 files encrypted (lock), 5 plain, one way only |
| 14 | 185-199 | Corporate side: Media Transfer Station writes USB, and portal download side by side |
| 15 | 199-207 | USB handed to an external party; encrypted files unreadable without the key |
| 16 | 207-215 | Closing lines and logo card |

## Build steps
1. Folder from project 01 (done: scaffold). Load shared code from `../../Common/`.
2. Environment map (static, no animation) for review: Corporate zone with station, DFX One (Corporate), SOC PC; Classified zone (larger) with DFX One (Classified), portal PC, data-owner PC, Classified PC; inbound and outbound gateways; Corporate-side station + portal PC; external party. New assets go to `Common/iso/iso-lib.js` and are checked against project 01 with `stills.js`.
3. Engine: CAM keys, captions, bubbles, chips with states (quarantined / sanitized / clean / blocked / encrypt / plain), locks, USB out and hand-off, chapter cards.
4. Script v1 for Burak's edits, then generation (one take per line), render, review rounds, audio mix, publish.

## Open items
- Script line for 2b: "Or a user simply downloads a file from the internet, and needs to work on it inside Classified."
- Risk lines for scene 0 and the closing lines (draft after the map is approved).
- File names for both 10-file sets in the vocabulary of this audience.
