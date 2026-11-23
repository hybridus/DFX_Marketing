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
