// ---- 4 Central management of stations
{const s=ns(K+'CENTRAL MANAGEMENT','Central management of every Media Transfer Station','One console governs all stations.',
 NOTE('One console for all stations: status lamps, policy push, last seen. Pick one station, push a policy change, show it applied. The IT manager sees a fleet he can run, not a pile of boxes. The tiles are sample entries.','Status, policy and last contact are visible per station.','What if a station is offline? -> We go through that with you in the trial.'));
 const names=[];names.push(...tiles(s,[['Station, main gate','Policy applied'],['Station, workshop','Policy applied'],['Station, warehouse','Policy applied'],['Station, control room','Policy applied'],['Station, maintenance','Policy applied'],['Station, visitor entrance','Policy applied']],0.7,2.05,8.2,3.7,2,'f'));
 names.push(...rowsR(s,[['Status','Every station shows its state.'],['Policy','Push a change to one station or all.'],['Last seen','Know when each station last reported.']],9.2,2.05,3.4,1.2,'r',14));
 T(s,'SAMPLE ENTRIES',{x:0.7,y:5.8,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 names.push(killer(s,'One place to run every station.',0.7,6.15,11.9,'k',0.65));cl(N,names);}
// ---- 5 Station
sl({k:'DFX MEDIA TRANSFER STATION',t:'Removable media never touch your network',m:'Media are checked on a physical station, not on a workstation.',sc:'op_station',
 note:NOTE('Name the pain: a stick plugged into an office PC is already inside. The station is a separate physical place where the stick is checked before it touches anything. Say physical isolation once, plainly.','The station is a separate physical device.','Can someone bypass the station? -> Policy decides who may bring media. The station is the intake point in the plan.'),
 rows:[['The pain','A stick in an office PC is already inside your network.'],['The station','A separate physical place where the stick is checked first.'],['The result','Only cleared files leave the station.']],pitch:1.15,kill:'The stick is checked before it touches anything.'});
// ---- 6 Four moves
{const s=ns(K+'STATION WALK-THROUGH','Insert, inspect, approve, release','Four moves for one stick.',
 NOTE('Take one stick through four moves: insert, inspect, approve, release. Say the verdict out loud at each move. Use the wording of the product and add nothing from memory.','Four moves, in this order.'));
 const St=[['Insert','The stick goes into the station.'],['Inspect','The files on it are checked under your policy.'],['Approve','An approver releases what the policy holds.'],['Release','Cleared files leave the station.']];const names=[];
 const w=2.85,g=0.17;St.forEach((st,i)=>{const x=0.7+i*(w+g),p='m'+i;s.addShape(pres.ShapeType.roundRect,{x,y:2.2,w,h:3.0,fill:{color:CARD},line:{color:i==3?GOLD:'2A2F36',width:i==3?1.75:1},rectRadius:0.1,objectName:p+'c'});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.25,y:2.4,w:0.6,h:0.6,fill:{color:GOLD},line:{color:GOLD,width:0.75},objectName:p+'n'});T(s,String(i+1),{x:x+0.25,y:2.4,w:0.6,h:0.6,fontSize:20,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'nt'});
  T(s,st[0],{x:x+0.25,y:3.2,w:w-0.5,h:0.5,fontSize:24,bold:true,color:GOLD,valign:'top',objectName:p+'t'});T(s,st[1],{x:x+0.25,y:3.8,w:w-0.5,h:1.3,fontSize:16,color:STEEL,valign:'top',objectName:p+'d'});names.push([p+'c',p+'n',p+'nt',p+'t',p+'d']);});
 names.push(killer(s,'Say the result out loud at every move.',0.7,5.55,11.9,'k'));cl(N,names);}
// ---- 7 PASS
sl({k:'DFX PASS',t:'Access for OT without a network',m:'A handheld for plants with no network access.',sc:'op_pass',
 note:NOTE('Start from the plant: no network, a closed cabinet, an engineer who still needs access. PASS is the handheld that carries the access in. Show the device, then the screen the engineer sees.','PASS is a handheld device for OT with no network access.','What if the handheld is lost? -> We go through that with you in the trial.'),
 rows:[['The plant','No network access, a closed cabinet.'],['The engineer','Still needs access to do the work.'],['The handheld','PASS carries the access in, with no network.']],pitch:1.15,kill:'Access without a network.'});
// ---- 8 Fleet PASS
{const s=ns(K+'CENTRAL MANAGEMENT','Central management of every PASS','One console for all handhelds.',
 NOTE('Fleet view for the handhelds: who holds which, which policy, which state. Compare it to a key cabinet: you know what is out and who has it. The tiles are sample entries.','Holder, policy and state are visible per handheld.'));
 const names=[];names.push(...tiles(s,[['PASS, maintenance team','Policy applied'],['PASS, electrical team','Policy applied'],['PASS, contractor','Policy applied'],['PASS, spare','In the cabinet',MU],['PASS, shift engineer','Policy applied'],['PASS, vendor visit','Policy applied']],0.7,2.05,8.2,3.7,2,'f'));
 names.push(...rowsR(s,[['Who holds which','Every handheld has a named holder.'],['Which policy','One policy per handheld or group.'],['Which state','In use, or back in the cabinet.']],9.2,2.05,3.4,1.2,'r',14));
 T(s,'SAMPLE ENTRIES',{x:0.7,y:5.8,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 names.push(killer(s,'You know what is out and who has it.',0.7,6.15,11.9,'k',0.65));cl(N,names);}
// ---- 9 Six features (static)
{const s=ns(K+'SIX SECURITY FEATURES','Six security features in one policy','One policy applies them all, and you choose which ones to use.',
 NOTE('Read the six features as one chain, not as a list: multi AV, multi sandbox, file disarm, file type, AD group control, file encryption. One policy applies them all and the customer picks which links to use. Nothing builds after the first reveal so every link can be read.','Six features in one policy.','Can we turn parts off? -> Yes, per policy.'));
 const L=['Multi AV','Multi sandbox','File disarm','File type','AD group control','File encryption'];const w=1.78,g=0.24;
 s.addShape(pres.ShapeType.line,{x:0.9,y:3.3,w:11.5,h:0,line:{color:GOLD,width:4},objectName:'rail'});
 L.forEach((l,i)=>{const x=0.7+i*(w+g),p='ch'+i;s.addShape(pres.ShapeType.roundRect,{x,y:2.5,w,h:1.6,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.12,objectName:p+'c'});s.addShape(pres.ShapeType.ellipse,{x:x+w/2-0.25,y:2.2,w:0.5,h:0.5,fill:{color:GOLD},line:{color:'0B0D10',width:1.5},objectName:p+'n'});T(s,String(i+1),{x:x+w/2-0.25,y:2.2,w:0.5,h:0.5,fontSize:16,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'nt'});
  T(s,l,{x:x+0.1,y:2.85,w:w-0.2,h:1.1,fontSize:18,bold:true,align:'center',valign:'middle',objectName:p+'t'});});
 T(s,'One policy applies the chain. You choose which links to use.',{x:0.7,y:4.5,w:11.9,h:0.5,fontSize:18,color:STEEL,align:'center',objectName:'cn'});
 killer(s,'One chain, one policy, your choice of links.',0.7,5.6,11.9,'k');}
// ---- 10 Verdict
{const s=ns(K+'ONE VERDICT','Many engines, one verdict','Multi AV, multi sandbox and file disarm combine into one decision.',
 NOTE('Three engines give three verdicts. One combined decision follows from the policy. Who decides when they disagree: the policy decides. Show a file where AV is clean and the sandbox disagrees. That is the reason to have more than one.','The policy decides the combined verdict.','What if the engines disagree? -> The policy decides which verdict applies.'));
 const names=[];const E=[['Multi AV',2.1],['Multi sandbox',3.45],['File disarm',4.8]];
 E.forEach((e,i)=>{names.push(box(s,0.9,e[1],3.2,1.0,e[0],'one verdict','e'+i,{line:GOLD,lw:1.5}));arrow(s,4.15,e[1]+0.5,1.6,'ea'+i);names.push(['ea'+i]);});
 s.addShape(pres.ShapeType.ellipse,{x:6.0,y:3.0,w:1.7,h:1.7,fill:{color:'0E1A12'},line:{color:GRN,width:3},objectName:'lamp'});T(s,'One verdict',{x:6.0,y:3.0,w:1.7,h:1.7,fontSize:16,bold:true,color:GRN,align:'center',valign:'middle',objectName:'lampt'});names.push(['lamp','lampt']);
 names.push(...rowsR(s,[['Why more than one','One engine can be clean where another is not.'],['Who decides','The policy decides which verdict applies.']],8.4,2.3,4.2,1.4,'r',15));
 names.push(killer(s,'The policy decides.',0.7,6.1,11.9,'k',0.7));cl(N,names);}
// ---- 11 AD group policy (static)
{const s=ns(K+'POLICY BY GROUP','Policy by Active Directory group','Who may bring what, from where, decided by group.',
 NOTE('One rule for the maintenance group, one for office staff, one for contractors. Show one row of the rule table, then the effect on the portal for each group. The rules shown are samples and stay on screen so they can be read.','Rules are tied to Active Directory groups.'));
 const cardsG=[['MAINTENANCE GROUP','Plant files and update packs','Checked by the full chain, approved by the plant approver.'],['OFFICE STAFF','Documents and drawings','File type and anti-malware checks, no approval step.'],['CONTRACTORS','Files for one job','Full chain, approved before release.']];
 cardsG.forEach((c,i)=>{const x=0.7+i*4.05,p='g'+i;s.addShape(pres.ShapeType.roundRect,{x,y:2.1,w:3.8,h:3.4,fill:{color:CARD},line:{color:i==0?GOLD:'2A2F36',width:i==0?1.75:1},rectRadius:0.1,objectName:p+'c'});
  T(s,c[0],{x:x+0.25,y:2.3,w:3.3,h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:p+'l'});T(s,c[1],{x:x+0.25,y:2.8,w:3.3,h:0.7,fontSize:20,bold:true,valign:'top',objectName:p+'t'});T(s,c[2],{x:x+0.25,y:3.7,w:3.3,h:1.6,fontSize:15,color:STEEL,valign:'top',objectName:p+'d'});});
 T(s,'SAMPLE RULES',{x:0.7,y:5.55,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 killer(s,'Your groups decide who may bring what.',0.7,6.0,11.9,'k');}
// ---- 12 Encryption
{const s=ns(K+'FILE ENCRYPTION','Files can be encrypted on the way out','Files that leave a protected area should not travel in clear.',
 NOTE('One sentence why: files leaving a protected area should not travel in clear. One screen how: pick encryption in the policy. Do not go into algorithms unless asked.','Encryption is one of the policy options.','Which algorithm? -> We give you the exact line from the datasheet.'));
 const names=[];names.push(box(s,0.7,2.4,3.2,1.5,'File','cleared by the policy','x1',{}));arrow(s,3.95,3.15,1.2,'xa');names.push(box(s,5.2,2.4,3.2,1.5,'Encryption','chosen in the policy','x2',{line:GOLD,lw:2}));arrow(s,8.45,3.15,1.2,'xb');names.push(box(s,9.7,2.4,2.9,1.5,'Encrypted file','leaves the station','x3',{}));names.push(['xa','xb']);
 names.push(...rowsR(s,[['Why','A file that leaves a protected area should not travel in clear.'],['How','Pick encryption in the policy.']],0.7,4.3,11.9,0.9,'r',15));
 names.push(killer(s,'Protected on the way out.',0.7,6.0,11.9,'k'));cl(N,names);}
