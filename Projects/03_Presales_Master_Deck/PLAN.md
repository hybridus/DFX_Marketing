# 03 Presales Master Deck (plan, nothing built yet)

Source of truth for content: the Presales Board Discussion artifact v3 (Master deck, 22 slides, short path 12 slides in 25 minutes) and Project doc `claude/presales-board-v3-status.md`.

## Deliverable
Native PowerPoint (.pptx, native animated builds only, no MP4) plus PDF. English master; Turkish variant on request.

## Visual base
- `environment.html` here is a copy of Project 01's master map extended with DFX TruCDR only (Secure Email Gateway, Guard and Secure Remote Access removed by Burak). Extensions live in this project only; Common/ is not changed.
- Status: PLACEMENT PROPOSAL (TruCDR), awaiting Burak's approval.

## Steps
1. Approve the extended map (this file's `environment.png`).
2. Render stills per slide scene from the map and the asset library (Common/iso).
3. Build the 22 slides from the artifact notes (headline, message, talk track, proof, visual brief, objection).
4. Export pptx and PDF; review on the board checklist (one gold focal element, red only for malware, at most 8 builds).

## v3 structure (38 slides)
Framing 1-5 (cover, four ways, two guards, one topology). Product blocks, each: what/why (problem, what it does, why it matters, killer feature), how, what you get.
Gateway 6 (hero slide 7: scene with five numbered proofs), Sandbox 3, TruCDR 3, Email Gateway 3, Secure Remote Access 4 plus appendix, One Platform 4 (platform, Media Transfer Station, PASS, policy). Then portfolio table, follow one file, integration, failures, attacker table, assurance, where to start, first project, boundary map.
Voice: buyer (problem, outcome, proof). Partner angle lives in speaker notes (FOR THE PARTNER).
Open: Gateway scene shows OT as sending side (matches OPC pull); sandbox third-party names kept out of slides until test status is confirmed.

## v3.2 (2026-11-23)
- build_master3.js is now the source of truth; the _head/_prod/_prod2/_prod3/_tail fragments are no longer in sync.
- Founder review applied: two-gateway slide 7, KEY CAPABILITY label, counts removed, prospect-facing close (slides 36-38), firewall answer on slide 4, partner and internal notes removed, TruScope Anti Malware Engine name, kickers and 12 pt floor on all slides.
- Open: product-to-certificate mapping, throughput per model, failure behaviours, third-party integration test status, SRA and failure wording left as is (Q10).
