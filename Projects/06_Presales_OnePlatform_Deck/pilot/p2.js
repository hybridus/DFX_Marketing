// ---- Six features
white();{const s=ns(K+'SIX SECURITY FEATURES','Six security features in one policy','One policy applies them all, and you choose which ones to use.',
 NOTE('Read the six features as one chain, not as a list: multi AV, multi sandbox, file disarm, file type, AD group control, file encryption. One policy applies them all and the customer picks which links to use. The same chain checks files going in and files going out.','Six features, one policy.','Which engines? -> We go through the exact list with you in the trial.'));
 const L=['Multi AV','Multi sandbox','File disarm','File type','AD group control','File encryption'];const w=1.78,g=0.24;
 s.addShape(pres.ShapeType.line,{x:0.9,y:3.3,w:11.5,h:0,line:{color:GOLD,width:4},objectName:'rail'});
 L.forEach((l,i)=>{const x=0.7+i*(w+g),p='ch'+i;s.addShape(pres.ShapeType.roundRect,{x,y:2.5,w,h:1.6,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.12,objectName:p+'c'});s.addShape(pres.ShapeType.ellipse,{x:x+w/2-0.25,y:2.2,w:0.5,h:0.5,fill:{color:GOLD},line:{color:'0B0D10',width:1.5},objectName:p+'n'});T(s,String(i+1),{x:x+w/2-0.25,y:2.2,w:0.5,h:0.5,fontSize:16,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'nt'});
  T(s,l,{x:x+0.1,y:2.85,w:w-0.2,h:1.1,fontSize:18,bold:true,align:'center',valign:'middle',objectName:p+'t'});});
 T(s,'One policy applies the chain, in and out. You choose which links to use.',{x:0.7,y:4.5,w:11.9,h:0.5,fontSize:18,color:STEEL,align:'center',objectName:'cn'});
 killer(s,'One chain, one policy, your choice of links.',0.7,5.6,11.9,'k');}
// ---- Verdict and record
white();{const s=ns(K+'ONE VERDICT, ONE RECORD','Many engines, one verdict, one record','The policy gives one decision, and every decision is written down.',
 NOTE('Three engines give three verdicts. One combined decision follows from the policy. When they disagree, the policy decides. Then point to the record: the verdict is written down with who, what, when and where. A verdict without a record is an opinion; with a record it is evidence.','The policy decides, and the decision is recorded.','What if engines disagree? -> The policy decides which verdict applies.'));
 const names=[];const E=[['Multi AV',2.05],['Multi sandbox',3.1],['File disarm',4.15]];
 E.forEach((e,i)=>{names.push(box(s,0.7,e[1],2.9,0.85,e[0],null,'e'+i,{line:GOLD,lw:1.5}));arrow(s,3.65,e[1]+0.42,1.3,'ea'+i);names.push(['ea'+i]);});
 s.addShape(pres.ShapeType.ellipse,{x:5.0,y:2.75,w:1.7,h:1.7,fill:{color:'0E1A12'},line:{color:GRN,width:3},objectName:'lamp'});T(s,'One verdict',{x:5.0,y:2.75,w:1.7,h:1.7,fontSize:16,bold:true,color:GRN,align:'center',valign:'middle',objectName:'lampt'});names.push(['lamp','lampt']);
 arrow(s,6.75,3.6,1.1,'la');names.push(['la']);
 names.push(box(s,7.9,2.5,4.7,2.2,'Full record','What, when, who, how, device, where to, approved by','rec',{line:GOLD,lw:2,fs:20}));
 names.push(strip(s,'When engines disagree, the policy decides which verdict applies.',5.05,'q'));
 names.push(killer(s,'One decision, and the evidence behind it.',0.7,5.85,11.9,'k',0.8));cl(N,names);}
// ---- Record
{const s=ns(K+'AUDIT AND VISIBILITY','Every movement of data is on record','What file, when, by whom, how, on which device, to where, approved by whom.',
 NOTE('Open one record and read it left to right: what file, when, who, how, on which device, to where, approved by whom. This is the answer to the auditor and to the incident review. Say that records are kept for every movement, in and out, and can be sent to your logging platform. The entry is a sample.','Each movement has one record with these fields.','Can we send it to our SIEM? -> The records can be forwarded to your logging platform. We go through the format in the trial.'));
 const names=[];names.push(frame(s,0.7,2.05,7.4,3.75,'ONE RECORD (SAMPLE ENTRY)',GOLD,'f'));
 const F=[['File','update-pack.zip, 14 MB'],['When','Date and time of every step'],['By whom','Named user, directory group'],['How','Station, portal or handheld'],['Device','Station or media identity'],['Where to','Destination network or media'],['Approved by','Named approver, with time'],['Verdict','Released, held or blocked']];
 F.forEach((f,i)=>{const col=i%2,row=Math.floor(i/2),x=0.95+col*3.6,y=2.6+row*0.78;T(s,[{text:f[0].toUpperCase(),options:{bold:true,fontSize:12,color:GOLD,charSpacing:2,breakLine:true}},{text:f[1],options:{fontSize:14}}],{x,y,w:3.4,h:0.68,valign:'top',objectName:'fl'+i});});
 names.push(...rowsR(s,[['For the auditor','A full trail of who moved what, where and when.'],['For the incident review','Find the file, the user and the approver in one place.'],['For your platform','Forward records to your logging platform.']],8.4,2.05,4.2,1.25,'r',14));
 names.push(killer(s,'Full visibility of every data movement.',0.7,6.0,11.9,'k',0.75));cl(N,names);}
// ---- AD group policy
{const s=ns(K+'POLICY BY GROUP','Policy by Active Directory group','Who may bring what in, and who may take what out, decided by group.',
 NOTE('One rule per group, with two lines each: what the group may bring in and what it may take out. Show one row, then the effect on the portal for each group. The rules shown are samples and stay on screen so they can be read.','Rules are tied to Active Directory groups and cover both directions.','Do we need new groups? -> No. The policy uses the groups you already have.'));
 const G=OT?[['MAINTENANCE GROUP','Plant files and update packs','Full check chain and plant approver.','Logs and reports, after approval.'],['OFFICE STAFF','Documents and drawings','File type and anti-malware checks.','Documents, after a type check.'],['CONTRACTORS','Files for one job','Full chain, approval before release.','Only job files, approved.']]:[['ENGINEERING','Source packages and tools','Full chain and team approver.','Releases, after approval.'],['FINANCE','Reports and statements','File type and anti-malware checks.','Reports, approved by the owner.'],['CONTRACTORS AND VISITORS','Files for one visit','Full chain, approval before release.','Nothing, unless approved.']];
 G.forEach((c,i)=>{const x=0.7+i*4.05,p='g'+i;s.addShape(pres.ShapeType.roundRect,{x,y:2.1,w:3.8,h:3.5,fill:{color:CARD},line:{color:i==0?GOLD:'2A2F36',width:i==0?1.75:1},rectRadius:0.1,objectName:p+'c'});
  T(s,c[0],{x:x+0.25,y:2.3,w:3.3,h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:p+'l'});T(s,c[1],{x:x+0.25,y:2.7,w:3.3,h:0.7,fontSize:20,bold:true,valign:'top',objectName:p+'t'});
  T(s,[{text:'IN   ',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2}},{text:c[2],options:{fontSize:14,color:STEEL,breakLine:true}},{text:' ',options:{fontSize:8,breakLine:true}},{text:'OUT   ',options:{bold:true,fontSize:12,color:'F5F7FA',charSpacing:2}},{text:c[3],options:{fontSize:14,color:STEEL}}],{x:x+0.25,y:3.5,w:3.3,h:1.9,valign:'top',objectName:p+'d'});});
 T(s,'SAMPLE RULES',{x:0.7,y:5.65,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 killer(s,'Your groups decide who brings what in and takes what out.',0.7,6.05,11.9,'k',0.75);}
// ---- Encryption
{const s=ns(K+'FILE ENCRYPTION','Files can be encrypted on the way out','Files that leave a protected area should not travel in clear.',
 NOTE('One sentence why: files leaving a protected area should not travel in clear. One screen how: pick encryption in the policy for exports. Do not go into algorithms unless asked.','Encryption is one of the policy options.','Which algorithm? -> We give you the exact list in the trial.'));
 const names=[];names.push(box(s,0.7,2.3,3.2,1.5,'File','cleared and approved','x1',{}));arrow(s,3.95,3.05,1.2,'xa');names.push(['xa']);names.push(box(s,5.2,2.3,3.2,1.5,'Encryption','chosen in the policy','x2',{line:GOLD,lw:2}));arrow(s,8.45,3.05,1.2,'xb');names.push(['xb']);names.push(box(s,9.7,2.3,2.9,1.5,'Media or network','protected file','x3',{}));
 names.push(...rowsR(s,[['Why','A file that leaves a protected area should not travel in clear.'],['How','Pick encryption in the policy for exports.']],0.7,4.2,11.9,0.9,'r',15));
 names.push(killer(s,'Protected on the way out.',0.7,6.0,11.9,'k'));cl(N,names);}
