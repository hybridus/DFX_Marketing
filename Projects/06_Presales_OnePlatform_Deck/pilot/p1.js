const SKIP=[];
function sl(o){const s=ns(K+o.k,o.t,o.m,o.note,{fs:o.fs});const P=scene(s,o.sc,0.1,1.9,8.2,5.1);bcap(s,P,'b',SKIP.concat(o.skip||[]));const names=[];
 rowsR(s,o.rows,8.5,2.0,4.1,o.pitch||1.15,'r',o.rfs||14).forEach(r=>names.push(r));
 if(o.kill)names.push(killer(s,o.kill,8.5,5.75,4.1,'k',1.15));cl(N,names);return s;}
function tiles(s,items,x,y,w,h,cols,p){const gap=0.2,tw=(w-(cols-1)*gap)/cols,rowsN=Math.ceil(items.length/cols),th=(h-(rowsN-1)*gap)/rowsN,out=[];
 items.forEach((it,i)=>{const cx=x+(i%cols)*(tw+gap),cy=y+Math.floor(i/cols)*(th+gap),q=p+i;
  s.addShape(pres.ShapeType.roundRect,{x:cx,y:cy,w:tw,h:th,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.08,objectName:q+'c'});
  s.addShape(pres.ShapeType.ellipse,{x:cx+0.18,y:cy+0.2,w:0.2,h:0.2,fill:{color:it[2]||GRN},line:{color:'0B0D10',width:1},objectName:q+'l'});
  T(s,[{text:it[0],options:{bold:true,fontSize:14,breakLine:true}},{text:it[1],options:{fontSize:12,color:STEEL}}],{x:cx+0.5,y:cy+0.08,w:tw-0.6,h:th-0.16,valign:'middle',objectName:q+'t'});out.push([q+'c',q+'l',q+'t']);});return out;}
function frame(s,x,y,w,h,title,col,p){s.addShape(pres.ShapeType.roundRect,{x,y,w,h,fill:{color:CARD},line:{color:col||'2A2F36',width:1.5},rectRadius:0.1,objectName:p+'f'});
 s.addShape(pres.ShapeType.rect,{x:x+0.02,y:y+0.02,w:w-0.04,h:0.36,fill:{color:'10141A'},line:{color:'10141A',width:0.5},objectName:p+'fb'});T(s,title,{x:x+0.2,y:y+0.02,w:w-0.4,h:0.36,fontSize:12,bold:true,color:col||GOLD,charSpacing:2,valign:'middle',objectName:p+'ft'});return [p+'f',p+'fb',p+'ft'];}
// ---- 1 Opening question
{N++;const s=pres.addSlide();s.background={color:BG};
 s.addImage({path:LOGO,x:0.7,y:0.7,w:3.2,h:0.696,objectName:'logo',altText:'DataFlowX'});
 T(s,'Control the Flow',{x:0.7,y:1.9,w:6,h:0.9,fontSize:44,bold:true,color:GOLD,valign:'top',objectName:'Title'});
 T(s,'DFX One Platform',{x:0.7,y:2.85,w:6,h:0.6,fontSize:26,bold:true,valign:'top',objectName:'Subtitle'});
 T(s,'Technical Sales Presentation  |  '+(OT?'Plants and industrial sites':'Corporate networks'),{x:0.7,y:3.45,w:6,h:0.4,fontSize:16,color:STEEL,valign:'top',objectName:'Kind'});
 T(s,OT?'How many removable media entered your plants last month?':'How many removable media entered your corporate network last month?',{x:0.7,y:4.3,w:5.6,h:1.3,fontSize:26,bold:true,valign:'top',objectName:'Question'});
 T(s,'Nobody knows the number, in or out, on media or over the network, and every one of them is a crossing.',{x:0.7,y:5.7,w:5.4,h:0.8,fontSize:16,color:MU,valign:'top',objectName:'Line'});
 s.addImage({path:path.join(ST,'op_usb.png'),x:6.8,y:1.5,w:6.0,h:3.3,objectName:'usb',altText:'USB stick'});
 T(s,'?',{x:8.3,y:4.2,w:3.0,h:2.2,fontSize:120,bold:true,color:GOLD,align:'center',valign:'middle',objectName:'q'});
 T(s,'Presenter  |  Company  |  Date',{x:0.7,y:6.8,w:8,h:0.3,fontSize:12,color:MU,objectName:'meta'});
 s.addNotes(NOTE('Ask the room, then stay quiet for five seconds. Most organisations have a policy and no count. Write the first number you hear on the slide. Then ask the second question: how many left carrying data. Do not supply a statistic; the point is that the room does not know.','A question, not a claim.','We ban USB. -> Then every file on a stick is a policy exception, in and out. The count shows how many exceptions you run.'));}
// ---- 2 MFT
sl({k:'MANAGED FILE TRANSFER',t:'Managed file transfer, in and out',m:'Intake, inspection, approval, delivery and export control in one flow.',sc:'op_platform',
 note:NOTE('Say the five words in order: intake, inspection, approval, delivery, export. It is one flow with one portal, not five tools. Data comes in under control and goes out under control. Hold the screens back until the next slide.','One flow, one policy, one record.','Is this just a file share? -> A file share stores. This flow inspects, asks the right approver, delivers one way and controls what goes out.'),
 rows:[['Intake','Files arrive through one portal or one station.'],['Inspection','Every file is checked under one policy.'],['Approval','The right approver releases what the policy holds.'],['Delivery','Cleared files go on, one way.'],['Export control','Data leaving to media or to another network is controlled and recorded.']],pitch:0.67,rfs:12,kill:'One flow. One policy. One record.'});
// ---- 3 Portal
const TG=OT?'Plant':'Isolated network';
{const s=ns(K+'THE PORTAL','The portal your users see','Upload a file, pick the target network, follow its status. Approvers are decided by group.',
 NOTE('Switch roles on screen: the user uploads, the approver sees the request by Active Directory group, approves, the file moves. Show one export request too. Keep it under two minutes. Show where the user sees status. The entries are samples.','The portal shows status to users and a queue to approvers.','Will users accept another portal? -> It shows status, so there are fewer questions than with email.'));
 const names=[];names.push(frame(s,0.7,2.05,5.8,3.6,'USER VIEW (SAMPLE ENTRIES)',BL.Corp,'u'));names.push(frame(s,6.8,2.05,5.8,3.6,'APPROVER VIEW (SAMPLE ENTRIES)',GOLD,'a'));
 [['report.xlsx  to '+TG,'Checking',GOLD],['plan.docx  (export)','Waiting for approval',MU],['update.zip  to '+TG,'Approved',GRN]].forEach((r,i)=>{const y=2.6+i*0.8;s.addShape(pres.ShapeType.roundRect,{x:0.95,y,w:5.3,h:0.62,fill:{color:'10141A'},line:{color:'2A2F36',width:1},rectRadius:0.05,objectName:'ur'+i});T(s,[{text:r[0]+'   ',options:{bold:true}},{text:r[1],options:{color:r[2],bold:true}}],{x:1.15,y,w:4.9,h:0.62,fontSize:14,valign:'middle',objectName:'urt'+i});});
 [['plan.docx  (export)','Waiting for you'],['update.zip  to '+TG,'Waiting for you']].forEach((r,i)=>{const y=2.6+i*0.8;s.addShape(pres.ShapeType.roundRect,{x:7.05,y,w:3.9,h:0.62,fill:{color:'10141A'},line:{color:'2A2F36',width:1},rectRadius:0.05,objectName:'ar'+i});T(s,[{text:r[0]+'   ',options:{bold:true}},{text:r[1],options:{color:STEEL}}],{x:7.2,y,w:3.7,h:0.62,fontSize:13,valign:'middle',objectName:'art'+i});s.addShape(pres.ShapeType.roundRect,{x:11.1,y:y+0.1,w:1.25,h:0.42,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.06,objectName:'ab'+i});T(s,'Approve',{x:11.1,y:y+0.1,w:1.25,h:0.42,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'abt'+i});});
 T(s,'Approvers are the members of the Active Directory group the policy names.',{x:7.05,y:4.35,w:5.3,h:0.7,fontSize:14,color:STEEL,valign:'top',objectName:'adn'});
 killer(s,'Users see status. Approvers see their queue.',0.7,5.95,11.9,'k');cl(N,[]);}
// ---- Three ways
{const s=ns(K+'THREE WAYS TO MOVE A FILE','Three ways to move a file, one platform','Media, portal and export all run under the same policy and the same record.',
 NOTE('Three ways, one platform. Media: a stick goes into the station. Portal: a user uploads a file from any network, for example one downloaded from the Internet, and picks the target network. Export: data going out needs a request and an approver. Whichever way the file arrives, DFX One is there: same checks, same approvers, same record.','One platform behind the station and the portal.','Do we need media at all? -> If files only move between networks, the portal is enough. The station covers media.'));
 const names=[];names.push(...cards(s,[{t:'Media Transfer Station',d:'Insert a USB stick, CD or other medium. Cleared files go to the network you choose.'},{t:'Portal',d:'Upload a file from any network, for example one downloaded from the Internet, and select the target network.',hi:1},{t:'Export',d:'Data going out to media or to another network needs a request and an approver.'}],{x:0.7,y:2.1,w:11.9,h:3.3,p:'w',cols:3,tf:20,df:16}));
 names.push(killer(s,'Same policy and same record, whichever way the file arrives.',0.7,5.8,11.9,'k',0.8));cl(N,names);}
// ---- 4 Central management
{const s=ns(K+'CENTRAL MANAGEMENT','Central management of every Media Transfer Station','One console governs all stations.',
 NOTE('One console for all stations: status lamps, policy push, last seen. Pick one station, push a policy change, show it applied. The IT manager sees a fleet he can run, not a pile of boxes. The tiles are sample entries.','Status, policy and last contact are visible per station.','What if a station is offline? -> We go through that with you in the trial.'));
 const names=[];const TL=OT?['Station, main gate','Station, workshop','Station, warehouse','Station, control room','Station, maintenance','Station, visitor entrance']:['Station, headquarters','Station, branch office','Station, data centre','Station, finance','Station, engineering','Station, visitor reception'];
 names.push(...tiles(s,TL.map(n=>[n,'Policy applied']),0.7,2.05,8.2,3.7,2,'f'));
 names.push(...rowsR(s,[['Status','Every station shows its state.'],['Policy','Push a change to one station or all.'],['Last seen','Know when each station last reported.']],9.2,2.05,3.4,1.2,'r',14));
 T(s,'SAMPLE ENTRIES',{x:0.7,y:5.8,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 names.push(killer(s,'One place to run every station.',0.7,6.15,11.9,'k',0.65));cl(N,names);}
// ---- 5 Station
sl({k:'DFX MEDIA TRANSFER STATION',t:'Removable media never touch your network',m:'USB sticks, CDs and other removable media are checked on a physical station, not on a workstation.',sc:'op_station',
 note:NOTE('Name the pain: a stick plugged into an office PC is already inside. The station is a separate physical place where media are checked before they touch anything, going in and coming out. Say physical isolation once, plainly.','The station is a separate physical device.','Can someone bypass the station? -> Policy decides who may bring media in or take data out. The station is the intake and export point in the plan.'),
 rows:[['The pain','A stick in a workstation is already inside your network.'],['The station','A separate physical place where media are checked first, in and out.'],['The result','Only cleared files go in. Only approved files go out.']],pitch:1.15,kill:'Media are checked before they touch anything.'});
// ---- 6 Four moves
{const s=ns(K+'STATION WALK-THROUGH','Insert, inspect, approve, release','Four moves for one stick.',
 NOTE('Take one stick through four moves: insert, inspect, approve, release. Say the verdict out loud at each move. Use the wording of the product and add nothing from memory.','Four moves, in this order.'));
 const St=[['Insert','The stick goes into the station.'],['Inspect','The files on it are checked under your policy.'],['Approve','An approver releases what the policy holds.'],['Release','Cleared files leave the station.']];const names=[];
 const w=2.85,g=0.17;St.forEach((st,i)=>{const x=0.7+i*(w+g),p='m'+i;s.addShape(pres.ShapeType.roundRect,{x,y:2.2,w,h:3.0,fill:{color:CARD},line:{color:i==3?GOLD:'2A2F36',width:i==3?1.75:1},rectRadius:0.1,objectName:p+'c'});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.25,y:2.4,w:0.6,h:0.6,fill:{color:GOLD},line:{color:GOLD,width:0.75},objectName:p+'n'});T(s,String(i+1),{x:x+0.25,y:2.4,w:0.6,h:0.6,fontSize:20,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'nt'});
  T(s,st[0],{x:x+0.25,y:3.2,w:w-0.5,h:0.5,fontSize:24,bold:true,color:GOLD,valign:'top',objectName:p+'t'});T(s,st[1],{x:x+0.25,y:3.8,w:w-0.5,h:1.3,fontSize:16,color:STEEL,valign:'top',objectName:p+'d'});names.push([p+'c',p+'n',p+'nt',p+'t',p+'d']);});
 names.push(killer(s,'Say the result out loud at every move.',0.7,5.55,11.9,'k'));cl(N,names);}
// ---- 7 Import and export
{const s=ns(K+'IMPORT AND EXPORT','Import and export under one policy','Data goes in through the station, and data comes out through the station.',
 NOTE('Two lanes. Import: media to station to network. Export: network to approval to station to media. Same policy, same approvers, same record. Say that export control is the half most customers have no answer for.','Both directions use the same policy and are recorded.','Do you control what leaves? -> Yes. Exports need a request, the same checks and an approver, and each one is recorded.'));
 const names=[];
 [['IMPORT','Media',['Station','Approval'],2.15,GOLD,'Files from USB, CD or other media are checked and approved before they reach your network.'],['EXPORT','Network',['Approval','Station'],3.85,'F5F7FA','Files leaving to media need a request, the same checks and an approver.']].forEach((l,i)=>{const y=l[3];
  T(s,l[0],{x:0.7,y,w:1.5,h:0.4,fontSize:14,bold:true,color:l[4],charSpacing:3,objectName:'ln'+i});
  const bx=[l[1],l[2][0],l[2][1],i==0?'Network':'Media'];bx.forEach((b,k)=>{const x=0.7+k*3.05;names.push(box(s,x,y+0.4,2.55,0.8,b,null,'b'+i+k,{line:k==1||k==2?l[4]:'2A2F36',lw:k==1||k==2?1.75:1.25,fs:16}));if(k<3){arrow(s,x+2.57,y+0.8,0.45,'a'+i+k,l[4]);names.push(['a'+i+k]);}});
  T(s,l[5],{x:0.7,y:y+1.25,w:11.9,h:0.35,fontSize:14,color:STEEL,valign:'top',objectName:'ld'+i});});
 names.push(killer(s,'Nothing moves in or out without the policy.',0.7,6.0,11.9,'k'));cl(N,names);}
// ---- Gateways
{const s=ns(K+'ONE PLATFORM, SEVERAL GATEWAYS','One platform, one or more gateways','Each DFX Unidirectional Gateway targets a network. DFX One knows each of them.',
 NOTE('DFX One is configured with one or more DFX Unidirectional Gateways. Each one targets a network. Two can target the same network as a backup, active-passive or active-active. DFX One knows every gateway, so the user only picks the target network and the platform does the rest. Where the target is isolated, the gateway makes the last hop one way.','One platform knows all of its gateways.','What if a gateway fails? -> Two gateways can serve the same network, as backup or active-active. We go through the setup with you in the trial.'));
 const names=[];names.push(box(s,0.7,2.05,2.6,3.6,'DFX One','policy, approvals, record','pl',{line:GOLD,lw:2,fs:22}));
 const R=OT?[['Gateway','to the OT network','OT network'],['Gateway','to the Classified network','Classified network'],['Two gateways','to the same network, as backup or active-active','Same network']]:[['Gateway','to an isolated network','Isolated network A'],['Gateway','to a second isolated network','Isolated network B'],['Two gateways','to the same network, as backup or active-active','Same network']];
 R.forEach((r,i)=>{const y=2.05+i*1.3;arrow(s,3.35,y+0.5,1.55,'ga'+i);names.push(['ga'+i]);names.push(box(s,4.95,y,3.6,1.0,r[0],r[1]+'  |  DFX Unidirectional Gateway','g'+i,{line:GOLD,lw:1.5,fs:16}));arrow(s,8.6,y+0.5,1.1,'gb'+i);names.push(['gb'+i]);names.push(box(s,9.75,y,2.85,1.0,r[2],null,'n'+i,{fs:15}));});
 names.push(killer(s,'The user picks the network. The platform knows the way.',0.7,6.0,11.9,'k',0.75));cl(N,names);}
// ---- PASS slides (OT only)
if(OT){
sl({k:'DFX PASS',t:'Access for OT without a network',m:'A handheld that connects to the machine in plants with no network access.',sc:'op_pass',
 note:NOTE('Start from the plant: no network, a machine on the shop floor, an engineer who still needs access. PASS connects to the machine and carries the access in. Show the device, then the screen the engineer sees.','PASS is a handheld device for OT with no network access.','What if the handheld is lost? -> We go through that with you in the trial.'),
 rows:[['The plant','No network access, machines that still need work.'],['The engineer','Still needs access to the machine to do the work.'],['The handheld','PASS connects to the machine and carries the access in, with no network.']],pitch:1.15,kill:'Access without a network.'});
{const s=ns(K+'CENTRAL MANAGEMENT','Central management of every PASS','One console for all handhelds.',
 NOTE('Fleet view for the handhelds: who holds which, which policy, which state. Compare it to a key cabinet: you know what is out and who has it. The tiles are sample entries.','Holder, policy and state are visible per handheld.'));
 const names=[];names.push(...tiles(s,[['PASS, maintenance team','Policy applied'],['PASS, electrical team','Policy applied'],['PASS, contractor','Policy applied'],['PASS, spare','In the cabinet',MU],['PASS, shift engineer','Policy applied'],['PASS, vendor visit','Policy applied']],0.7,2.05,8.2,3.7,2,'f'));
 names.push(...rowsR(s,[['Who holds which','Every handheld has a named holder.'],['Which policy','One policy per handheld or group.'],['Which state','In use, or back in the cabinet.']],9.2,2.05,3.4,1.2,'r',14));
 T(s,'SAMPLE ENTRIES',{x:0.7,y:5.8,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 names.push(killer(s,'You know what is out and who has it.',0.7,6.15,11.9,'k',0.65));cl(N,names);}
}
