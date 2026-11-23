# 04 Presales Gateway Deck: plan (v1, 2026-11-23)

Deliverable: native PowerPoint (animated builds only, no MP4) plus PDF. English. Audience: PROSPECT customers, shown by vendor and partner salespeople. Source of content: Presales Board Discussion artifact (Gateway section U01-U30, lessons section) and Burak's answers. No fixed slide count: depth over count.

## Rules carried over from the Master deck (every one applies)
- Buyer voice: problem, outcome, proof. No presenter, partner or internal text on slides or in notes. Notes = TALK TRACK, PROOF, OBJECTION only.
- Label "THE KEY CAPABILITY" (never "killer feature"). No words like Appendix in titles.
- No counts of anything that grows (protocols, controls, modifications, engines, sandboxes, features). Shapes or neutral wording instead.
- Complete protocol lists: OT = OPC UA and DA, DNP3, ICCP, AVEVA PI, IEC 104, AMQP, MQTT. IT = SMTP, SFTP, HTTP, UDP, SNMP, NTP, Syslog, Kafka, RDP streaming, Oracle and Microsoft SQL replication.
- One gateway per direction: drawings that move data both ways show two gateways.
- Own engine name: TruScope Anti Malware Engine (strong on malicious Office, PDF and image files).
- No third-party vendor names, no throughput numbers, no customer references, no optical break switch, no NIAPC claim, no gated claims (separate admin portals, immutable backup wording, failure wording beyond Master slide 33).
- Starting point: working session in the customer environment plus design workshop (no PoC, no lab). Avoid demo/PoC wording on slides. Close = one final slide: next steps, one-line summary, dated next meeting.
- Firewall answer: firewall is software and software has had vulnerabilities; the gateway isolates with hardware, on simple laws of physics.
- Attacker wording is about the attacker path, not staff.
- Visual: kicker (gold 12 pt) + 28 pt title + message line on every slide, 12 pt minimum font, platforms above links, scenes without hidden elements, tables never get builds, shapes instead of big numbers, 1920x1080-equivalent 13.33x7.5 in, gold F5A800 on 0B0D10.
- Single source of truth: build_gateway.js.

## Modules and slides
Core: 1 cover; 2 It works in your environment from day one (hero scene, two gateways); 3 A data diode removes the return path; 4 One fibre, one direction, certified (EAL4+, Gartner wording); 5 Two directions, two gateways; 6 A model for every site; 7 The capability map.
Policy: 8 Many ways in, one policy; 9 FlowRule pipeline; 10 Controls; 11 Modifications; 12 Actions; 13 Approvals follow your org chart; 14 Bring your own sandbox and CDR; 15 Our own detection engine (TruScope); 16 Archive and quarantine; 17 Your portal, your brand.
Protocols: 18 OT protocols; 19 IT protocols; 20 Pull from OPC; 21 Every transfer logged.
Operations: 22 It joins your estate; 23 When something fails; 24 Fleet management.
Scenarios (one layout: before left, scene centre with gold crossing, after right): 25 software updates for OT; 26 OT/IoT/IIoT/xIoT visibility; 27 managed file transfer between isolated networks; 28 data exchange with third parties; 29 log consolidation; 30 backup into a protected network; 31 one-way database replication.
Close: 32 Your crossing and next step.

## Steps
1 Scenes: render stills from Common/iso (no Common changes). 2 Build deck. 3 Validate, render PDF, contact sheets, text dump and internal-word search. 4 Send, then record lessons in the artifact.
Open: product-to-certificate mapping, throughput per model, failure behaviours, third-party integration test status, UI screenshots (UI slides use illustrative drawings, labelled), photo permission.
