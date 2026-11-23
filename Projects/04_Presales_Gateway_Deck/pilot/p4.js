// ---- 21 Logging
{const s=ns(K+'EVIDENCE','Every transfer is logged, and the log goes where you need it','Who sent what, which rule applied, what the verdict was. In the gateway and in your SIEM.',
 NOTE('Open the log after the transfer you just made and read one line: time, entry, file, rule, outcome. That line is the answer to who decided this file could cross. Then say where it goes: Syslog and CEF to your SIEM, so security sees it where they already look. The screen on the slide is an illustration.','The transfer log and the event in the SIEM are both shown in the working session.','Can we send it to our SIEM? -> Yes, in Syslog and CEF.'));
 const names=[];
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:2.05,w:8.1,h:4.3,fill:{color:'10141A'},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'win'});
 s.addShape(pres.ShapeType.rect,{x:0.7,y:2.05,w:8.1,h:0.5,fill:{color:'1C2128'},line:{color:'2A2F36',width:1},objectName:'bar'});
 T(s,'Transfer log',{x:0.95,y:2.05,w:3,h:0.5,fontSize:14,bold:true,valign:'middle',objectName:'wt'});T(s,'ILLUSTRATION',{x:6.5,y:2.05,w:2.1,h:0.5,fontSize:12,bold:true,color:GREY,align:'right',valign:'middle',objectName:'ill'});
 names.push(['win','bar','wt','ill']);
 const H=[['TIME',0.95,1.2],['ENTRY',2.2,1.4],['FILE',3.65,2.1],['RULE',5.8,1.6],['OUTCOME',7.45,1.2]];H.forEach((h,i)=>T(s,h[0],{x:h[1],y:2.7,w:h[2],h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:'h'+i}));
 const R=[['10:42:07','SFTP','drawing_rev4.pdf','Engineering','Allowed',GRN],['10:42:31','Portal','invoice.docx','Partners','Held',RED],['10:43:02','OPC UA','tag values','Plant data','Allowed',GRN],['10:43:40','SFTP','update_pack.zip','OT updates','Suspended',GOLD],['10:44:15','Syslog','site events','Log intake','Allowed',GRN]];
 R.forEach((r,i)=>{const y=3.1+i*0.62;s.addShape(pres.ShapeType.roundRect,{x:0.85,y,w:7.8,h:0.52,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.06,objectName:'r'+i});
  [[r[0],0.95,1.2],[r[1],2.2,1.4],[r[2],3.65,2.1],[r[3],5.8,1.6]].forEach((c,j)=>T(s,c[0],{x:c[1],y,w:c[2],h:0.52,fontSize:12,color:j===0?MU:STEEL,valign:'middle',objectName:'rc'+i+j}));
  T(s,r[4],{x:7.45,y,w:1.2,h:0.52,fontSize:12,bold:true,color:r[5],valign:'middle',objectName:'ro'+i});names.push(['r'+i,'rc'+i+'0','rc'+i+'1','rc'+i+'2','rc'+i+'3','ro'+i]);});
 names.push(...rowsR(s,[['Who and what','Sender, entry point, file and the rule that applied.'],['The verdict','The result of each control and the outcome.'],['Your SIEM','Events leave in Syslog and CEF.']],9.1,2.0,3.7,1.3,'q',14));
 cl(N,names);}

// ---- 22 Estate
{const s=ns(K+'IT JOINS YOUR ESTATE','It joins your estate instead of asking you to rebuild it','Your directory, your time source, your SIEM and your firewall stay where they are.',
 NOTE('Name what the gateway connects to and what stays untouched. Directory for users and groups, Radius for access, NTP for time, Syslog and CEF to the SIEM, your firewall and IPS in front. Two gateways in active and passive give high availability, and one central management shows all of them. Nothing here needs a project of its own.','These integrations are on the integration checklist used in the working session.','Does it replace our firewall? -> No. A firewall is software, and software has had vulnerabilities. A Unidirectional Gateway isolates with hardware, on simple laws of physics. It sits next to your firewall and IPS.'));
 const P=scene(s,'gw_estate',0.3,1.95,8.3,4.6);const names=[];
 [['ad','Active Directory'],['radius','Radius'],['ntp','NTP'],['siem','SIEM'],['fw','Firewall and IPS'],['mgmt','Central management'],['ha','High availability']].forEach((q,i)=>{names.push(dot(s,P,q[0],String(i+1),'m'+i,0,-0.2));});
 const cap=['Active Directory','Radius','NTP','SIEM','Firewall and IPS','Central management','High availability'];[['ad',0.3,-0.12],['radius',0.3,-0.12],['ntp',0.3,-0.12],['siem',-1.9,0.3],['fw',-1.9,0.3],['mgmt',-0.9,0.3],['ha',-2.2,0.0]].forEach((q,i)=>{const [x,y]=P(q[0],q[1],q[2]);T(s,cap[i],{x:q[1]<0&&q[0]!=='mgmt'?x-0.0:x+(q[1]<0?0:0.15),y:y-0.15,w:1.9,h:0.3,fontSize:12,bold:true,color:STEEL,align:q[1]<0&&q[0]!=='mgmt'?'right':'left',valign:'middle',objectName:'cp'+i});names[i].push('cp'+i);});
 names.push(...rowsR(s,[['1 to 3  Identity and time','Active Directory for users and groups, Radius for access, NTP for time.'],['4 and 5  Your tools','Syslog and CEF to your SIEM. Your firewall and IPS stay in front.'],['6 and 7  Operations','Central management for every gateway. Active and passive high availability.']],8.9,2.0,3.9,1.55,'r',14));
 cl(N,[['scene'],...names]);}

// ---- 23 Failures
{const s=ns(K+'WHEN SOMETHING FAILS','When something fails, this is what happens','Each failure has one defined behaviour and leaves a log entry.',
 NOTE('Three cases, said the same way each time: what fails, what the gateway does, where you see it. Rule mismatch: no rule matches, the data is dropped, the event is logged. Node failure: it fails over, active to passive. Engine unreachable: it is recorded in the log and sent to Syslog and your SIEM. Do not add other failure cases; the design workshop covers the rest.','Each behaviour is visible in the log.'),{fs:28});
 const C=[['Rule mismatch','No matching rule: the data is dropped.','Event logged',RED],['Node failure','The gateway fails over (high availability, active and passive).','Event logged',GOLD],['Engine unreachable','The failure is recorded in the log.','Event sent to Syslog and your SIEM',GREY]];const names=[];
 C.forEach((c,k)=>{const x=0.7+k*4.05;s.addShape(pres.ShapeType.roundRect,{x,y:2.3,w:3.8,h:3.7,fill:{color:CARD},line:{color:'2A2F36',width:1.5},rectRadius:0.12,objectName:'p'+k});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.3,y:2.55,w:0.5,h:0.5,fill:{color:c[3]},line:{color:c[3],width:0.75},objectName:'i'+k});
  T(s,c[0],{x:x+0.3,y:3.25,w:3.2,h:0.5,fontSize:22,bold:true,objectName:'h'+k});T(s,c[1],{x:x+0.3,y:3.85,w:3.2,h:1.1,fontSize:16,valign:'top',objectName:'b'+k});
  s.addShape(pres.ShapeType.line,{x:x+0.3,y:5.1,w:3.2,h:0,line:{color:'2A2F36',width:1},objectName:'ln'+k});
  T(s,c[2],{x:x+0.3,y:5.2,w:3.2,h:0.6,fontSize:13,color:MU,valign:'top',objectName:'l'+k});names.push(['p'+k,'i'+k,'h'+k,'b'+k,'ln'+k,'l'+k]);});
 names.push(strip(s,'Every case leaves a line in the log, so you can see what happened and when.',6.25,'q',GREY));
 cl(N,names);}

// ---- 24 Fleet
{const s=ns(K+'FLEET MANAGEMENT','One place to manage every gateway','Sites grow. The way you manage them does not have to change.',
 NOTE('For customers with more than one site, this is the slide that matters. One central management for every gateway: you see them together, you change them from one place. Say that high availability comes as an active and passive pair. Do not go into numbers of gateways; say that the design workshop sizes it.','Central management is shown in the working session. The picture is an illustration.','How many gateways can it manage? -> The design workshop sizes it for your sites.'));
 const names=[];
 const cmb=box(s,3.0,2.1,3.6,1.0,'Central management','every gateway, one place','cm',{line:GOLD,fill:'1A1608',col:GOLD});
 const G=[['Site A','active',GRN],['Site B','active',GRN],['Site C','active',GRN],['Site D','standby',GREY]];
 s.addShape(pres.ShapeType.line,{x:1.7,y:3.6,w:6.2,h:0,line:{color:'3A4350',width:1.5},objectName:'bus'});s.addShape(pres.ShapeType.line,{x:4.8,y:3.1,w:0,h:0.5,line:{color:'3A4350',width:1.5},objectName:'stem'});names.push([...cmb,'bus','stem']);
 G.forEach((g,k)=>{const x=0.7+k*2.1;s.addShape(pres.ShapeType.line,{x:x+0.95,y:3.6,w:0,h:0.4,line:{color:'3A4350',width:1.5},objectName:'dr'+k});
  s.addShape(pres.ShapeType.roundRect,{x,y:4.0,w:1.9,h:1.6,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'g'+k});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.2,y:4.2,w:0.22,h:0.22,fill:{color:g[2]},line:{color:g[2],width:0.5},objectName:'dt'+k});
  T(s,g[0],{x:x+0.5,y:4.15,w:1.3,h:0.32,fontSize:15,bold:true,valign:'middle',objectName:'gn'+k});T(s,'DFX Unidirectional Gateway',{x:x+0.2,y:4.6,w:1.55,h:0.55,fontSize:12,color:STEEL,valign:'top',objectName:'gt'+k});T(s,g[1],{x:x+0.2,y:5.15,w:1.5,h:0.3,fontSize:12,color:g[2],bold:true,objectName:'gs'+k});names.push(['dr'+k,'g'+k,'dt'+k,'gn'+k,'gt'+k,'gs'+k]);});
 T(s,'ILLUSTRATION',{x:0.7,y:5.8,w:3,h:0.3,fontSize:12,bold:true,color:GREY,objectName:'ill'});names.push(['ill']);
 names.push(...rowsR(s,[['One place','Central management for every gateway in your estate.'],['Pairs stay up','Active and passive high availability.'],['Same feeds','Time from NTP, events to your SIEM.']],9.0,2.0,3.8,1.3,'q',14));
 cl(N,names);}
