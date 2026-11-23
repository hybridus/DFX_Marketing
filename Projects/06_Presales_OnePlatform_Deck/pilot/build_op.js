const pptxgen=require('pptxgenjs'),fs=require('fs'),path=require('path');
const ST=path.join(__dirname,'..','stills');
const pres=new pptxgen();pres.layout='LAYOUT_WIDE';pres.title='DataFlowX Technical Sales Presentation: DFX One Platform';pres.author='DataFlowX';
const BG='0B0D10',TX='F5F7FA',MU='9AA3AD',GOLD='F5A800',F='Arial',CARD='171A1F',RED='B3121F',GRN='3DDC84',STEEL='C9D1DA',GREY='8FA0B3';
const BL={Corp:'4F8FC9',Cls:'9B6FD8',OT:'2CC4D9'};
const LOGO=path.join(__dirname,'..','..','..','Common','brand','logo-dark-bg.png');
pres.defineSlideMaster({title:'MASTER',background:{color:BG},objects:[{image:{path:LOGO,x:11.55,y:7.02,w:1.25,h:0.272}}],slideNumber:{x:0.5,y:7.02,w:0.6,h:0.3,color:MU,fontSize:10,fontFace:F}});
const builds={};let N=0;const KC={};for(let i=9;i<=12;i++)KC[i]='F5F7FA';
function png(n){const b=fs.readFileSync(path.join(ST,n+'.png'));return [b.readUInt32BE(16),b.readUInt32BE(20)];}
function img(s,n,x,y,w,h,name){const [pw,ph]=png(n),r=pw/ph;let W=w,H=w/r;if(H>h){H=h;W=h*r;}
 s.addImage({path:path.join(ST,n+'.png'),x:x+(w-W)/2,y:y+(h-H)/2,w:W,h:H,objectName:name||n,altText:n});}
function T(s,t,o){s.addText(t,Object.assign({fontFace:F,color:TX,margin:0,isTextBox:true},o));}
const NOTE=(talk,proof,obj)=>'TALK TRACK: '+talk+'\nPROOF: '+proof+(obj?'\nOBJECTION: '+obj:'');
function ns(kick,title,msg,note,o){o=o||{};N++;const s=pres.addSlide({masterName:'MASTER'});s.background={color:BG};
 T(s,kick,{x:0.7,y:0.22,w:11.9,h:0.3,fontSize:12,bold:true,color:KC[N]||GOLD,charSpacing:3,objectName:'Kicker'});
 T(s,title,{x:0.7,y:0.55,w:11.9,h:o.th||0.85,fontSize:o.fs||28,bold:true,valign:'top',objectName:'Title'});
 T(s,msg,{x:0.7,y:o.my||1.42,w:11.9,h:0.5,fontSize:16,color:MU,valign:'top',objectName:'Message'});
 s.addNotes(note);return s;}
const cl=(n,list)=>{builds[n]=list;};
const CARDS_LINK={};
function lab(s,x,y,w,t,nm){T(s,t,{x,y,w,h:0.28,fontSize:12,bold:true,color:GOLD,charSpacing:3,valign:'top',objectName:nm});}
function rowsR(s,rows,x,y,w,pitch,p,fs){const out=[];rows.forEach((r,i)=>{const yy=y+i*pitch;
 s.addShape(pres.ShapeType.line,{x,y:yy-0.06,w:0.0001,h:pitch-0.2,line:{color:GOLD,width:2.5},objectName:p+'bar'+i});
 lab(s,x+0.2,yy-0.04,w-0.2,r[0].toUpperCase(),p+'l'+i);T(s,r[1],{x:x+0.2,y:yy+0.24,w:w-0.2,h:pitch-0.55,fontSize:fs||15,valign:'top',objectName:p+'t'+i});out.push([p+'bar'+i,p+'l'+i,p+'t'+i]);});return out;}
function killer(s,txt,x,y,w,p,h){h=h||0.8;s.addShape(pres.ShapeType.roundRect,{x,y,w,h,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.1,objectName:p+'k'});
 T(s,[{text:'THE KEY CAPABILITY   ',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2}},{text:txt,options:{bold:true,fontSize:16}}],{x:x+0.25,y,w:w-0.5,h,valign:'middle',objectName:p+'kt'});return [p+'k',p+'kt'];}
function cards(s,items,o){const n=items.length,cols=o.cols||n,rowsN=Math.ceil(n/cols),gap=o.gap||0.25,w=(o.w-(cols-1)*gap)/cols,h=(o.h-(rowsN-1)*gap)/rowsN,out=[];
 items.forEach((it,i)=>{const cx=o.x+(i%cols)*(w+gap),cy=o.y+Math.floor(i/cols)*(h+gap),p=o.p+i;
  s.addShape(pres.ShapeType.roundRect,Object.assign({x:cx,y:cy,w,h,fill:{color:CARD},line:{color:it.hi?GOLD:'2A2F36',width:it.hi?1.75:1},rectRadius:0.1,objectName:p+'c'},it.link?{hyperlink:{slide:it.link,tooltip:'Go to slide '+it.link}}:{}));
  const tfz=o.tf||19,cap=Math.floor((w-0.5)/(tfz*0.0078)),two=it.t.length>cap,dy=two?0.95:0.68;
  T(s,it.t,{x:cx+0.25,y:cy+0.18,w:w-0.5,h:two?0.75:0.45,fontSize:tfz,bold:true,color:it.hi?GOLD:TX,valign:'top',objectName:p+'t'});
  T(s,it.d,{x:cx+0.25,y:cy+dy,w:w-0.5,h:h-dy-0.12,fontSize:o.df||16,color:STEEL,valign:'top',objectName:p+'d'});out.push([p+'c',p+'t',p+'d']);});return out;}
function strip(s,txt,y,p,col){s.addShape(pres.ShapeType.roundRect,{x:0.7,y,w:11.9,h:0.6,fill:{color:'10141A'},line:{color:col||'2A2F36',width:1},rectRadius:0.08,objectName:p+'s'});
 T(s,txt,{x:0.95,y,w:11.4,h:0.6,fontSize:14,color:STEEL,valign:'middle',objectName:p+'st'});return [p+'s',p+'st'];}
// scene placement: returns P(anchor,dx,dy) in slide inches
function scene(s,name,x,y,w,h){const A=JSON.parse(fs.readFileSync(path.join(ST,name+'.json'),'utf8'));img(s,name,x,y,w,h,'scene');const [px,py]=png(name),k=Math.min(w/px,h/py),ox=x+(w-px*k)/2,oy=y+(h-py*k)/2;
 const P=(n,dx,dy)=>[ox+A[n][0]*k+(dx||0),oy+A[n][1]*k+(dy||0)];P.blocks=(A._blocks||[]).map(b=>[ox+b[0]*k,oy+b[1]*k,b[2]]);return P;}
function bcap(s,P,p,skip){const out=[];P.blocks.forEach((b,i)=>{if(skip&&skip.includes(b[2]))return;const w=Math.max(1.0,b[2].length*0.105+0.3);T(s,b[2],{x:b[0]-w/2,y:b[1]-0.36,w,h:0.28,fontSize:12,bold:true,color:STEEL,align:'center',valign:'middle',fill:{color:'0B0D10',transparency:25},objectName:p+'bc'+i});out.push(p+'bc'+i);});return out;}
function dot(s,P,anchor,num,p,dx,dy){const [mx,my]=P(anchor,dx||0,dy||0);s.addShape(pres.ShapeType.ellipse,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fill:{color:GOLD},line:{color:'0B0D10',width:1.5},objectName:p+'m'});T(s,num,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'mt'});return [p+'m',p+'mt'];}
function zlab(s,P,anchor,txt,col,p,dx,dy,w,al){const [x,y]=P(anchor,dx||0,dy||0);T(s,txt,{x:al==='right'?x-w:(al==='center'?x-w/2:x),y,w,h:0.3,fontSize:13,bold:true,color:col,charSpacing:2,align:al||'left',valign:'middle',objectName:p});return [p];}
function pill(s,x,y,w,txt,p,col){s.addShape(pres.ShapeType.roundRect,{x,y,w,h:0.4,fill:{color:'10141A'},line:{color:col||GOLD,width:1.25},rectRadius:0.08,objectName:p+'p'});T(s,txt,{x,y,w,h:0.4,fontSize:13,bold:true,color:col||GOLD,align:'center',valign:'middle',objectName:p+'pt'});return [p+'p',p+'pt'];}
function box(s,x,y,w,h,txt,sub,p,o){o=o||{};s.addShape(pres.ShapeType.roundRect,{x,y,w,h,fill:{color:o.fill||CARD},line:{color:o.line||'2A2F36',width:o.lw||1.25},rectRadius:0.1,objectName:p+'b'});
 T(s,sub?[{text:txt,options:{bold:true,fontSize:o.fs||15,color:o.col||TX,breakLine:true}},{text:sub,options:{fontSize:12,color:o.scol||MU}}]:[{text:txt,options:{bold:true,fontSize:o.fs||15,color:o.col||TX}}],{x:x+0.1,y,w:w-0.2,h,align:'center',valign:'middle',objectName:p+'bt'});return [p+'b',p+'bt'];}
function arrow(s,x,y,w,p,col,dash){s.addShape(pres.ShapeType.line,{x,y,w,h:0,line:{color:col||GOLD,width:3.5,endArrowType:'triangle',dashType:dash||'solid'},objectName:p});return [p];}
const K='DFX ONE PLATFORM  |  ';
const SKIP=[];
function sl(o){const s=ns(K+o.k,o.t,o.m,o.note,{fs:o.fs});const P=scene(s,o.sc,0.1,1.9,8.2,5.1);bcap(s,P,'b',SKIP.concat(o.skip||[]));const names=[];
 rowsR(s,o.rows,8.5,2.0,4.1,o.pitch||1.15,'r',o.rfs||14).forEach(r=>names.push(r));
 if(o.kill)names.push(killer(s,o.kill,8.5,5.75,4.1,'k',1.15));cl(N,names);return s;}
function tiles(s,items,x,y,w,h,cols,p,lamp){const gap=0.2,tw=(w-(cols-1)*gap)/cols,rowsN=Math.ceil(items.length/cols),th=(h-(rowsN-1)*gap)/rowsN,out=[];
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
 T(s,'Technical Sales Presentation',{x:0.7,y:3.45,w:6,h:0.4,fontSize:18,color:STEEL,valign:'top',objectName:'Kind'});
 T(s,'How many removable media entered your plants last month?',{x:0.7,y:4.3,w:5.6,h:1.3,fontSize:26,bold:true,valign:'top',objectName:'Question'});
 T(s,'Nobody knows the number, and every one of them is a crossing.',{x:0.7,y:5.7,w:5.4,h:0.8,fontSize:16,color:MU,valign:'top',objectName:'Line'});
 s.addImage({path:path.join(ST,'op_usb.png'),x:6.8,y:1.5,w:6.0,h:3.3,objectName:'usb',altText:'USB stick'});
 T(s,'?',{x:8.3,y:4.2,w:3.0,h:2.2,fontSize:120,bold:true,color:GOLD,align:'center',valign:'middle',objectName:'q'});
 T(s,'Presenter  |  Company  |  Date',{x:0.7,y:6.8,w:8,h:0.3,fontSize:12,color:MU,objectName:'meta'});
 s.addNotes(NOTE('Ask the room, then stay quiet for five seconds. Most plants have a policy and no count. Write the first number you hear on the slide. Do not supply a statistic; the point is that the room does not know.','A question, not a claim.','We ban USB. -> Then every file on a stick is a policy exception. The count shows how many exceptions you run.'));}
// ---- 2 MFT
sl({k:'MANAGED FILE TRANSFER',t:'Managed file transfer, one concept',m:'Intake, inspection, approval and delivery in one flow.',sc:'op_platform',skip:[],
 note:NOTE('Say the four verbs in order: intake, inspection, approval, delivery. It is one flow with one portal, not four tools. Hold the screens back until the next slide.','One flow, one policy.','Is this just a file share? -> A file share stores. This flow inspects, asks the right approver and delivers one way.'),
 rows:[['Intake','Files arrive through one portal or one station.'],['Inspection','Every file is checked under one policy.'],['Approval','The right approver releases what the policy holds.'],['Delivery','Cleared files go on, one way.']],pitch:0.95,kill:'One flow. One portal. One policy.'});
// ---- 3 Portal
{const s=ns(K+'THE PORTAL','The portal your users see','Upload, status and approvals, with who may approve decided by group.',
 NOTE('Switch roles on screen: the user uploads, the approver sees the request by Active Directory group, approves, the file moves. Keep it under two minutes. Show where the user sees status. The entries are samples.','The portal shows status to users and a queue to approvers.','Will users accept another portal? -> It shows status, so there are fewer questions than with email.'));
 const names=[];names.push(frame(s,0.7,2.05,5.8,3.6,'USER VIEW (SAMPLE ENTRIES)',BL.Corp,'u'));names.push(frame(s,6.8,2.05,5.8,3.6,'APPROVER VIEW (SAMPLE ENTRIES)',GOLD,'a'));
 [['report.xlsx','Uploaded',MU],['drawing.pdf','Checking',GOLD],['update.zip','Approved',GRN]].forEach((r,i)=>{const y=2.6+i*0.8;s.addShape(pres.ShapeType.roundRect,{x:0.95,y,w:5.3,h:0.62,fill:{color:'10141A'},line:{color:'2A2F36',width:1},rectRadius:0.05,objectName:'ur'+i});T(s,[{text:r[0]+'   ',options:{bold:true}},{text:r[1],options:{color:r[2],bold:true}}],{x:1.15,y,w:4.9,h:0.62,fontSize:15,valign:'middle',objectName:'urt'+i});});
 [['update.zip','Waiting for you'],['plan.docx','Waiting for you']].forEach((r,i)=>{const y=2.6+i*0.8;s.addShape(pres.ShapeType.roundRect,{x:7.05,y,w:3.9,h:0.62,fill:{color:'10141A'},line:{color:'2A2F36',width:1},rectRadius:0.05,objectName:'ar'+i});T(s,[{text:r[0]+'   ',options:{bold:true}},{text:r[1],options:{color:STEEL}}],{x:7.2,y,w:3.7,h:0.62,fontSize:14,valign:'middle',objectName:'art'+i});s.addShape(pres.ShapeType.roundRect,{x:11.1,y:y+0.1,w:1.25,h:0.42,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.06,objectName:'ab'+i});T(s,'Approve',{x:11.1,y:y+0.1,w:1.25,h:0.42,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'abt'+i});});
 T(s,'Approvers are the members of the Active Directory group the policy names.',{x:7.05,y:4.35,w:5.3,h:0.7,fontSize:14,color:STEEL,valign:'top',objectName:'adn'});
 killer(s,'Users see status. Approvers see their queue.',0.7,5.95,11.9,'k');cl(N,[]);}
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
 NOTE('Fill the Boundary Map row for media: where sticks enter, who brings them, where the files go. Then the one-page charter: scope, success criteria written by the customer, environment, roles, two weeks, review date. Wait for the ask. We do not ask for a decision on the platform; we ask for one plant gate and one policy.','The trial uses a physical Media Transfer Station on site. The customer writes the success criteria.','What do you need from us? -> A location, a network port, a policy owner and a directory group.'),{});
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
