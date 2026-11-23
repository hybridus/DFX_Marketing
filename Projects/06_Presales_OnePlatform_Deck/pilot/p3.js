// ---- 13 Two shapes
{const s=ns(K+'TWO DEPLOYMENT SHAPES','With and without a Gateway behind it','Standalone, or with the DFX Unidirectional Gateway as a one-way last hop.',
 NOTE('Draw both shapes on a whiteboard. Standalone: station, platform, delivery. With a Gateway: the same, plus a one-way last hop. Ask which shape the customer is closer to today.','The Gateway is the DFX Unidirectional Gateway.'));
 [['op_standalone',0.3,'STANDALONE','Station, platform, delivery.'],['op_withgw',6.75,'WITH A GATEWAY','The same, plus a one-way last hop.']].forEach((q,i)=>{const P=scene(s,q[0],q[1],2.0,6.3,3.3);bcap(s,P,'b',[]);T(s,q[2],{x:q[1]+0.2,y:5.4,w:5.9,h:0.3,fontSize:13,bold:true,color:GOLD,charSpacing:2,objectName:'sh'+i});T(s,q[3],{x:q[1]+0.2,y:5.75,w:5.9,h:0.4,fontSize:16,objectName:'shd'+i});});
 killer(s,'Choose the shape that fits your plant.',0.7,6.3,11.9,'k',0.6);}
// ---- 14 Fleet
{const s=ns(K+'CENTRAL MANAGEMENT','One console for stations, handhelds and gateways','One place to look.',
 NOTE('Stations, handhelds and gateways in one fleet view. The point for IT is one place to look. The tiles are sample entries.','One fleet view.'));
 const names=[];names.push(...tiles(s,[['Station, main gate','Policy applied'],['PASS, maintenance team','Policy applied'],['Gateway, OT to corporate','Active'],['Station, workshop','Policy applied'],['PASS, shift engineer','Policy applied'],['Gateway, corporate to OT','Active']],0.7,2.05,11.9,3.5,3,'f'));
 T(s,'SAMPLE ENTRIES',{x:0.7,y:5.65,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 names.push(killer(s,'One fleet, one view.',0.7,6.1,11.9,'k',0.7));cl(N,names);}
// ---- scenarios
function scen(c){const s=ns('SCENARIO  |  '+c.kick,c.title,c.msg,NOTE(c.talk+' Buyer: '+c.buyer+'. Typical effort: sized in the trial charter.',c.proof,c.obj),{});const names=[];
 const P=scene(s,c.scene,3.5,2.0,6.3,3.75);
 const card=(x,lbl,txt,col,k)=>{s.addShape(pres.ShapeType.roundRect,{x,y:2.15,w:2.9,h:3.6,fill:{color:CARD},line:{color:col,width:1.5},rectRadius:0.12,objectName:k+'c'});
  T(s,lbl,{x:x+0.22,y:2.32,w:2.5,h:0.3,fontSize:12,bold:true,color:col,charSpacing:3,objectName:k+'l'});T(s,txt,{x:x+0.22,y:2.75,w:2.5,h:2.9,fontSize:15,valign:'top',objectName:k+'t'});return [k+'c',k+'l',k+'t'];};
 names.push(card(0.5,'TODAY',c.before,GREY,'b'));names.push(['scene',...bcap(s,P,'b',c.skip||[])]);names.push(card(9.93,'WITH ONE PLATFORM',c.after,GOLD,'a'));names.push(strip(s,c.cross,6.05,'q'));cl(N,names);}
[{buyer:'Plant manager and the OT security lead',kick:'PLANT GATE',title:'Every visitor stick is checked before it enters',msg:'Sticks go to the station at the gate, not to a workstation.',scene:'op_gate',
 before:'Visitor and contractor sticks go straight to workstations.',after:'Sticks go to the station at the gate. Cleared files go on to the plant. Exceptions have a named approver.',cross:'Typical policy: full check chain, approval by the plant approver group.',
 talk:'Before: sticks go straight to workstations. After: sticks go to the station at the gate. Name who approves exceptions.',proof:'The station walk-through shows one stick through four moves.',obj:'Visitors will not wait. -> The check runs while they are at the gate, and status is on the portal.'},
 {buyer:'Owner of the maintenance contractor relationship, with the OT security lead',kick:'CONTRACTOR LAPTOPS',title:'Contractors hand over files through the station',msg:'What crosses is the file, not the laptop.',scene:'op_contractor',
 before:'Contractor laptops are plugged into the plant network to move files.',after:'Contractors hand files to the station. The file is checked and released. The laptop stays outside.',cross:'Typical policy: contractor group, full check chain, approval before release.',
 talk:'Contractors carry files in and out. They hand them to the station, not to a PC. What crosses is the file, not the laptop.',proof:'The portal shows each hand-over with its status.',obj:'Contractors need their own tools on site. -> Their tools stay on their laptops; the files go through the station.'},
 {buyer:'Maintenance manager and the OT security lead',kick:'FIELD ENGINEER WITH PASS',title:'The field engineer works in the plant without a network',msg:'Access comes in with the handheld. Nothing connects to a network.',scene:'op_pass',skip:['DFX PASS'],
 before:'Access to plant equipment depends on a network connection or a shared laptop.',after:'The engineer arrives, authenticates, works and leaves with PASS. Nothing connects to a network.',cross:'Typical policy: PASS issued per engineer group, one policy per group.',
 talk:'Follow the engineer through a day: arrive, authenticate, work, leave. Nothing connects to a network.',proof:'The PASS fleet view shows who holds which handheld.',obj:'Our plants have no network at all. -> That is the case PASS is made for.'}].forEach(scen);
// ---- 18 Close
{const s=ns(K+'YOUR NEXT STEP','Your media crossing, and a two-week trial','A real station, a real policy, two weeks.',
 NOTE('Fill the Boundary Map row for media: where sticks enter, who brings them, where the files go. Then the one-page charter: scope, success criteria written by the customer, environment, roles, two weeks, review date. Wait for the ask. We do not ask for a decision on the platform; we ask for one plant gate and one policy. The partner runs intake and the approval workshop, so the customer sees one team.','The trial uses a physical Media Transfer Station on site. The customer writes the success criteria.','What do you need from us? -> A location, a network port, a policy owner and a directory group.'),{});
 const P=scene(s,'op_gate',0.3,1.95,6.2,3.2);bcap(s,P,'b',[]);
 const S=[['1','Boundary Map','List where media enter your plants and choose one gate.'],['2','Two-week trial','A physical station on site, with its own charter.'],['3','Success criteria','Written by you, for one gate and one policy.']];const names=[];
 S.forEach((st,k)=>{const y=2.0+k*1.05;s.addShape(pres.ShapeType.ellipse,{x:6.9,y,w:0.75,h:0.75,fill:{color:GOLD},line:{color:GOLD,width:1},objectName:'c'+k});T(s,st[0],{x:6.9,y,w:0.75,h:0.75,fontSize:24,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'cn'+k});
  T(s,[{text:st[1],options:{bold:true,fontSize:20,breakLine:true}},{text:st[2],options:{fontSize:14,color:STEEL}}],{x:7.85,y:y-0.05,w:4.8,h:0.9,valign:'middle',objectName:'ct'+k});names.push(['c'+k,'cn'+k,'ct'+k]);});
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:5.3,w:11.9,h:0.8,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'need'});
 T(s,[{text:'BEFORE DAY ONE   ',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2}},{text:'A location, a network port, a policy owner and a directory group.',options:{fontSize:15,color:STEEL}}],{x:1.0,y:5.3,w:11.3,h:0.8,valign:'middle',objectName:'needt'});names.push(['need','needt']);
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:6.25,w:11.9,h:0.65,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.1,objectName:'nm'});
 T(s,'Next meeting: [date]. We choose the gate and write the charter.',{x:1.0,y:6.25,w:11.3,h:0.65,fontSize:18,bold:true,color:'0B0D10',valign:'middle',objectName:'nmt'});names.push(['nm','nmt']);
 cl(N,names);}
pres.writeFile({fileName:path.join(__dirname,'raw.pptx')}).then(()=>{fs.writeFileSync(path.join(__dirname,'builds.json'),JSON.stringify(builds));console.log('slides',N);});
