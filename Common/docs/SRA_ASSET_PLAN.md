# Plan: DFX Secure Remote Access six-box asset (draft for approval, no code written)

Status: plan only. Topology confirmed by Burak on 2026-11-23 (artifact "SRA link map check"). Style source: STYLE_GUIDE sections 3, 4, 6, 8, 9; playbook steps 0 to 6.

## 1. Inputs (playbook step 0)
| Item | Value | Source |
|---|---|---|
| On-screen name | DFX Secure Remote Access | CLAUDE.md |
| Class | Rack appliances, composition on `platformD1` (style guide section 9: MUST) | Burak: "follow the rules and styles in the guides" |
| Boxes | 6: Server Module (SM), Client Module (CM), 4 one-way units | SRA spec, link map |
| Plate text | Modules: SM + SERVER MODULE, CM + CLIENT MODULE. Units: DFX UDG + TX, DFX UDG + RX (alternative offered by Burak: DFX UDG IN / OUT) | Burak 2026-11-23 |
| Zones | SM and its two units on network A; CM and its two units on network B. Rail colour per scene via `opts` | repo rule 7 |
| Flow | Left to right = +x. Outbound gateway gold chevrons +x; inbound gateway chevrons `rev` | style guide section 2 |

## 2. Link map the asset draws (locked)
- Outbound gateway: SM -> TX unit (network A) -> one fibre -> RX unit (network B) -> CM.
- Inbound gateway: CM -> TX unit (network B) -> one fibre -> RX unit (network A) -> SM.
- Each module has one one-way send connection to its TX unit and one one-way receive connection from its RX unit, on its own network. Nothing else joins the networks. Never a chain, never Ethernet.
- Assumption to confirm: TX = the TX unit, RX = the RX unit.

## 3. Construction
`ISO.assets.sra(g, ox, oy, opts)` composes six `platformD1` bodies (no new body geometry, no new greys):
- SM and CM: `lines:['SM','SERVER MODULE']` / `['CM','CLIENT MODULE']`, `fs:10`, plain lid, gold rail.
- Units: `lines:['DFX UDG','TX']` / `['DFX UDG','RX']`, `fs:10`, `lid:'arrow'` (gold chevrons are the only large gold). Outbound pair `rev:false`, inbound pair `rev:true`.
- Links: thin gold polylines on the floor (1.4 px, `#F5A800`), module to unit, one arrowhead each, drawn far to near. Two fibre links between the networks, one per gateway, upper rail (outbound) and lower rail (inbound).
- Two zone plates under the left and right groups (rr extrude, existing floor-plate colours) with a visible dark gap between them; plates carry the zone rail colour via `opts.zoneA`, `opts.zoneB`.
- Footprint target: about 3 x 2 boxes of 196 x 112; design scale s = 1.2, check s = 0.5.

## 4. Options and anchors
- `opts`: `zoneA`, `zoneB` (corp|cls|ot|iso, default corp and cls), `labels` (true draws SM/CM captions), `rev` (mirror the whole asset).
- Returns: `sm`, `cm`, `outbound` (fibre midpoint), `inbound`, `center`, `front`.

## 5. Registration and checks
- `asset-manifest.json`: `sra` (default), `sra.otcls` (zoneA ot, zoneB cls).
- `tokens.json`: no new colours expected.
- `ASSET_CATALOG.md`: new section and overview row; `Common/README.md` asset line.
- Run: `lint_asset.js` (ALL CLEAN), `--check-baseline` (existing assets unchanged), `preview_assets.js sra` then `_sheet.png`, stills of Project 01 unchanged.
- Baseline written only after Burak approves the previews.

## 6. Decided by Burak 2026-11-23
TX and RX unit naming (IN/OUT allowed as alternative); module plates with second line; default zones Corporate and Classified.
