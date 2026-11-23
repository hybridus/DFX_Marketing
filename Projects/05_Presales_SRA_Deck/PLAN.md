# 05 Presales deck: DFX Secure Remote Access (SRA)

Status: plan, built from board plan R01-R28 plus founder answers of 2026-11-23.
Format: native PowerPoint (pptxgenjs + inject.py builds) and PDF. English master. LAYOUT_WIDE, bg 0B0D10, Arial, gold F5A800.
Audience: prospect, shown by vendor or partner salesperson. Buyer voice. Notes: TALK TRACK, PROOF, OBJECTION only.

## Founder answers (this deck)
- Protocols bridged: HTTP/S, RDP, SSH.
- RDP virtual channels named on slides: clipboard, file transfer, printer, microphone, sound, removable media mount (plus session recording).
- About 30 slides, deep. Closing slide gets the Boundary Map frame (customer crossing in gold).
- Nothing else is claimed. Not claimed: latency, throughput, failure behaviours, SSH features beyond the shared mechanism.

## Locked facts
- Two DFX Unidirectional Gateways: outbound (request) and inbound (response). Each module has one send link to its TX unit and one receive link from its RX unit, on its own network. Never a chain, never Ethernet.
- SM is the only initiator. CM cannot initiate, discover or choose a target; it raises a request only to a predefined target, from payload SM delivered.
- Not a firewall, VPN, proxy, jump host or tunnel. Protocol terminated at SM and rebuilt at CM. Correlation lives in SM state.
- EAL4+ (UDG and SRA), certificates 21.0.03.0.00.0/TSE-CCCS-103 and TSE-CCCS-86, mapping not shown. No NIAPC claim.
- Starting point: two-week trial with its own charter, one real application pair, success criteria written by the customer.

## Modules and slides (31)
Core 1-13: cover, hero, not a firewall, two modules, SM, CM, link map, two paths, seven steps, broken twice, correlation, no app change, either side starts.
Protocols 14-24: protocols, HTTP/S inspect, rewrite, schema, logging, RDP rebuilt, virtual channels, clipboard, file transfer, recording, SSH.
Assurance and scenarios 25-30: attacker steps, EAL4+, vendor maintenance, privileged access, internal data as API, operations.
Close 31: Boundary Map frame, two-week trial charter, next steps, summary, next meeting.

## Visual
Scene source scenes.html (ISO.assets.sra from Common, unchanged). Floor tags on plates, 12 pt captions from anchor file. Outbound gateway gold, inbound white.
