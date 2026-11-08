# Voiceover script, English master (final, approved)

Voice: **Cedric M – Engaging Documentary Narrator**, ElevenLabs voice_id `VvVVKaa2nHZpbZdtSRSX`, model `eleven_v4`, one take per line, default voice settings.
Lines are numbered by scene; files are in `../vo/`. The third network is always called **Industrial OT** (never "Production").

| File | Scene | Film time (s) | Line | Length (s) |
|---|---|---|---|---|
| s00 | 0 Opening, zone tour, risk | 0–22 | Three networks. Corporate. Classified. And Industrial OT, the systems that run your plant. Files have to move between them. And one infected USB can undo every boundary you built. | 13.4 |
| s01 | 1 Corporate | 22–32 | Every day, people carry work across these boundaries: reports, updates, project files, on removable media. | 7.7 |
| s02 | 2 Media Transfer Station | 32.5–56 | It starts at the DFX Media Transfer Station. The employee inserts the USB and signs in with an ID badge. They select the files, choose the destination, OT, and submit. Nothing has touched the network yet. | 14.4 |
| s03 | 3 Policy | 56.5–64 | DFX One applies policy: this user, this destination, this file type. | 6.0 |
| s04 | 4 Inspection | 64.5–88 | Multiple antivirus engines scan every file in parallel, while DFX TruCDR disarms and rebuilds the content. The DFX Malware Mitigation Sandbox then runs each file as a real user would, and monitors its behavior to expose what signatures miss. Ten files in. Two quarantined. Six sanitized. Two clean. | 22.0 |
| s05 | 5 Quarantine | 88.5–96 | Malicious files never leave DFX One. They are quarantined, and the security admin receives them with the full reports. | 7.5 |
| s06 | 6 Seal and store | 96.5–105.5 | The approved files are sealed and stored inside DFX One, ready for delivery. | 5.1 |
| s07 | 7 Gateway | 106.5–125.5 | They cross the DFX Unidirectional Gateway, one way only. Seal verified. Audit record logged. Hardware enforced. Physically separated. Isolation ensured. | 12.4 |
| s08 | 8 Connected OT | 126.5–133.9 | The connected control computer receives the files from the gateway, verifies the seal, and the CNC starts running. | 7.0 |
| s09 | 9 Isolated OT with DFX PASS | 134.5–155.5 | Some machines are never connected. For these isolated systems, DFX PASS connects to the DFX Unidirectional Gateway, by network cable or OT Wi-Fi, and fetches the files only for the authorized computer and employee. | 14.8 |
| s10a | 10 Close | from 155.6 | File transfer is controlled end-to-end into every network you protect. | 4.5 |
| s10b | 10 Close (logo card) | from 160.3 | DataFlowX. Control the Flow, Secure the Operation. | 4.3 |

Start times used by `mix.sh` (ms): s01 23400, s02 33000, s03 57000, s04 64300, s05 88800, s06 97000, s07 107000, s08 126800, s09 135000, s10a 155600, s10b 160300. Scene 0 is cut at its pauses (see `mix.sh`).
