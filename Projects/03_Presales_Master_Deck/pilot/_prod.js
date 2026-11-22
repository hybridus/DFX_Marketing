// ======== product-block helpers
const PN='DFX ';
function ns(kick,title,msg,note,o){o=o||{};N++;const s=pres.addSlide({masterName:'MASTER'});s.background={color:BG};
 if(kick)T(s,kick,{x:0.7,y:0.22,w:11.9,h:0.3,fontSize:11,bold:true,color:GOLD,charSpacing:3,objectName:'Kicker'});
 T(s,title,{x:0.7,y:0.55,w:11.9,h:o.th||0.85,fontSize:o.fs||28,bold:true,valign:'top',objectName:'Title'});
 T(s,msg,{x:0.7,y:o.my||1.42,w:11.9,h:0.5,fontSize:16,color:MU,valign:'top',objectName:'Message'});
 s.addNotes(note);return s;}
function lab(s,x,y,w,t,nm){T(s,t,{x,y,w,h:0.28,fontSize:11,bold:true,color:GOLD,charSpacing:3,valign:'top',objectName:nm});}
function rowsR(s,rows,x,y,w,pitch,p,fs){const out=[];rows.forEach((r,i)=>{const yy=y+i*pitch;
 s.addShape(pres.ShapeType.line,{x,y:yy-0.06,w:0.0001,h:pitch-0.2,line:{color:GOLD,width:2.5},objectName:p+'bar'+i});
 lab(s,x+0.2,yy-0.04,w-0.2,r[0].toUpperCase(),p+'l'+i);T(s,r[1],{x:x+0.2,y:yy+0.24,w:w-0.2,h:pitch-0.55,fontSize:fs||15,valign:'top',objectName:p+'t'+i});out.push([p+'bar'+i,p+'l'+i,p+'t'+i]);});return out;}
function killer(s,txt,x,y,w,p){s.addShape(pres.ShapeType.roundRect,{x,y,w,h:0.8,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.1,objectName:p+'k'});
 T(s,[{text:'KILLER FEATURE   ',options:{bold:true,fontSize:11,color:GOLD,charSpacing:2}},{text:txt,options:{bold:true,fontSize:16}}],{x:x+0.25,y,w:w-0.5,h:0.8,valign:'middle',objectName:p+'kt'});return [p+'k',p+'kt'];}
function hero(s,o){const b=[];img(s,o.img,0.6,2.05,5.0,3.4,'heroimg');b.push(['heroimg']);
 b.push(...rowsR(s,o.rows,6.1,2.0,6.6,1.25,'h'));b.push(killer(s,o.killer,6.1,5.75,6.6,'h'));if(o.extra)b.push(...o.extra(s));cl(N,b);}
function cards(s,items,o){const n=items.length,cols=o.cols||n,rowsN=Math.ceil(n/cols),gap=o.gap||0.25,w=(o.w-(cols-1)*gap)/cols,h=(o.h-(rowsN-1)*gap)/rowsN,out=[];
 items.forEach((it,i)=>{const cx=o.x+(i%cols)*(w+gap),cy=o.y+Math.floor(i/cols)*(h+gap),p=o.p+i;
  s.addShape(pres.ShapeType.roundRect,{x:cx,y:cy,w,h,fill:{color:CARD},line:{color:it.hi?GOLD:'2A2F36',width:it.hi?1.75:1},rectRadius:0.1,objectName:p+'c'});
  const tfz=o.tf||19,cap=Math.floor((w-0.5)/(tfz*0.0078)),two=it.t.length>cap,dy=two?0.95:0.68;
  T(s,it.t,{x:cx+0.25,y:cy+0.18,w:w-0.5,h:two?0.75:0.45,fontSize:tfz,bold:true,color:it.hi?GOLD:TX,valign:'top',objectName:p+'t'});
  T(s,it.d,{x:cx+0.25,y:cy+dy,w:w-0.5,h:h-dy-0.12,fontSize:o.df||16,color:STEEL,valign:'top',objectName:p+'d'});out.push([p+'c',p+'t',p+'d']);});return out;}
function strip(s,txt,y,p,col){s.addShape(pres.ShapeType.roundRect,{x:0.7,y,w:11.9,h:0.6,fill:{color:'10141A'},line:{color:col||'2A2F36',width:1},rectRadius:0.08,objectName:p+'s'});
 T(s,txt,{x:0.95,y,w:11.4,h:0.6,fontSize:14,color:STEEL,valign:'middle',objectName:p+'st'});return [p+'s',p+'st'];}
const NOTE=(talk,proof,partner,obj)=>'TALK TRACK: '+talk+'\nPROOF: '+proof+'\nFOR THE PARTNER: '+partner+(obj?'\nOBJECTION: '+obj:'');

// ======== PRODUCT BLOCK: DFX UNIDIRECTIONAL GATEWAY
{const s=ns('DFX UNIDIRECTIONAL GATEWAY  |  1 OF 6','Data moves one way, enforced by hardware','A normal connection works both ways, and so does an attacker. A data diode does not.',
 NOTE('Start with the problem: every normal connection can be used in both directions, including by an attacker. Then the product: a transmit unit on one side, a receive unit on the other, one fibre between them. There is no return path to attack. Say what disappears: command and control, data theft over a return channel, remote exploits of the protected side. Keep it under two minutes.','Common Criteria EAL4+. The absence of a return fibre can be checked by eye.','The Gateway is the entry product for OT and closed networks. It sells on a certificate and on something the customer can see, so it needs little argument. Integration and design are services the partner can lead.','Can it be reversed in software? -> No. There is no transmitter on the receiving side to reverse.'));
 hero(s,{img:'obj_gateway',rows:[['The problem','Every network link carries traffic both ways. An attacker uses the return path to give commands and to take data out.'],['What it does','A transmit unit on one network, a receive unit on the other, one fibre between them. Nothing is built to send back.'],['Why it matters','Command and control, data theft and remote attacks on the protected side have no path to travel.']],
 killer:'You can see it. One fibre, one direction. Common Criteria EAL4+.',
 extra:(s)=>{s.addShape(pres.ShapeType.line,{x:0.8,y:5.8,w:2.2,h:0,line:{color:GOLD,width:4,endArrowType:'triangle'},objectName:'fib'});T(s,'one fibre, one direction',{x:0.8,y:5.9,w:2.4,h:0.3,fontSize:12,color:GOLD,objectName:'fibl'});
  s.addShape(pres.ShapeType.rect,{x:3.3,y:5.65,w:2.2,h:0.3,fill:{type:'none'},line:{color:GREY,width:1.5,dashType:'dash'},objectName:'emp'});T(s,'no return fibre',{x:3.3,y:5.98,w:2.2,h:0.3,fontSize:12,color:GREY,objectName:'empl'});return [['fib','fibl','emp','empl']];}});}

// ---- Gateway slide 7: the hero
{const A=JSON.parse(fs.readFileSync(path.join(ST,'gw_scene.json'),'utf8'));
 const s=ns('DFX UNIDIRECTIONAL GATEWAY  |  2 OF 6','It works in your environment from day one','Five proofs on your own systems, in one session. Nothing is rebuilt around it.',
 NOTE('Open on the working system, not on the diode. Say what you are about to do: log in through Active Directory, send a file, watch your sandbox return a verdict, open the transfer log, pull a value from an OPC server. Then do it, one step per click, and say only what the room sees. The diode comes after the proof. This slide sells the Gateway as a working part of the estate.','Demo D1, integration walk-through, run in the customer environment. Prerequisites: an Active Directory service account, the address of the sandbox, a syslog target, the address of an OPC server.','This is the slide a partner can deliver alone. The integration demo and the design workshop that follow are partner-led services, and they are what turns interest into a project.','We already have a sandbox. -> Keep it. The Gateway calls it.'),{th:0.85});
 // scene
 const SX=0.3,SY=1.9,SW=9.0,SH=5.0;img(s,'gw_scene',SX,SY,SW,SH,'scene');
 const [px,py]=png('gw_scene'),k=Math.min(SW/px,SH/py),ox=SX+(SW-px*k)/2,oy=SY+(SH-py*k)/2,P=(n,dx,dy)=>[ox+A[n][0]*k+(dx||0),oy+A[n][1]*k+(dy||0)];
 {const [a1,b1]=P('zot');T(s,'OT NETWORK  (SENDING)',{x:0.35,y:b1+0.5,w:3.2,h:0.3,fontSize:11,bold:true,color:BL.OT,charSpacing:2,objectName:'zOT'});
  const [a2,b2]=P('zcorp');T(s,'CORPORATE NETWORK  (RECEIVING)',{x:a2-4.6,y:b2-0.05,w:4.3,h:0.3,fontSize:11,bold:true,color:BL.Corp,charSpacing:2,align:'right',objectName:'zCorp'});
  const [a3,b3]=P('zsys');T(s,'YOUR SYSTEMS',{x:a3-0.2,y:b3-0.38,w:2.6,h:0.3,fontSize:11,bold:true,color:GREY,charSpacing:2,objectName:'zSys'});}
 const steps=[['1','Log in','Users sign in with their company account (Active Directory).','ad'],['2','Send a file','A file goes from the source to the other side under one policy.','file'],['3','Inspect it','Your sandbox gives the verdict. Ours or one you already run.','sbx'],['4','See it','Every transfer is in the log, and it reaches your SIEM.','siem'],['5','Pull a value','A value is read from the OPC server and delivered one way.','opc']];
 const names=[];
 steps.forEach((st,i)=>{const y=1.95+i*0.95,x=9.45;
  s.addShape(pres.ShapeType.roundRect,{x,y,w:3.6,h:0.85,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.08,objectName:'sc'+i});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.15,y:y+0.2,w:0.42,h:0.42,fill:{color:GOLD},line:{color:GOLD,width:0.75},objectName:'sn'+i});T(s,st[0],{x:x+0.15,y:y+0.2,w:0.42,h:0.42,fontSize:14,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'snt'+i});
  T(s,[{text:st[1],options:{bold:true,fontSize:15,breakLine:true}},{text:st[2],options:{fontSize:11.5,color:STEEL}}],{x:x+0.7,y:y+0.03,w:2.85,h:0.8,valign:'middle',objectName:'stt'+i});
  const [mx,my]=P(st[3],0,-0.1);s.addShape(pres.ShapeType.ellipse,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fill:{color:GOLD},line:{color:'0B0D10',width:1.5},objectName:'mk'+i});T(s,st[0],{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'mkt'+i});
  const cap={ad:'Active Directory',file:'File source',sbx:'Your sandbox',siem:'SIEM',opc:'OPC server'}[st[3]];
  T(s,cap,{x:mx+0.25,y:my-0.14,w:1.6,h:0.28,fontSize:11,bold:true,color:STEEL,valign:'middle',objectName:'cap'+i});
  names.push(['sc'+i,'sn'+i,'snt'+i,'stt'+i,'mk'+i,'mkt'+i,'cap'+i]);});
 cl(N,names);}

// ---- Gateway 3: what you see on the day
{const s=ns('DFX UNIDIRECTIONAL GATEWAY  |  3 OF 6','What each proof tells you','Five things you do in the session. Each answers a question someone in the room is already asking.',
 NOTE('Read it as a table of questions. IT asks: will it work with our directory? Security asks: who decided this file could cross, and who can prove it? Operations asks: does my data still arrive? Each proof closes one of those. Do not add features here; this slide is about confidence.','Demo D1. Every step is visible on screen. The log step is the evidence moment for security.','Each row is a reason for a different stakeholder to say yes. The partner who runs the session should invite IT, security and operations to the same room.','Does it work with our groups? -> It reads Active Directory groups. The demo shows it on your directory.'),{th:0.85});
 const R=[['You do','The room sees','It tells you'],['Log in through your directory','Your own account and groups, no new user list','It joins your identity system'],['Send a file','The file leaves one network and arrives in the other','A one-way path can still move real work'],['Run it through your sandbox','A verdict from your own engine before the file crosses','You keep the tools you trust'],['Open the transfer log','Who sent, which rule matched, which engine said what, the outcome','Every crossing can be audited'],['Pull a value from OPC','A tag value from the OT side appears on the corporate side','Operations data reaches you, nothing flows back']];
 const names=[];const X=[0.7,4.65,8.6],W=[3.8,3.8,4.0];
 R.forEach((r,i)=>{const y=2.05+i*0.78,h=0.7;if(i===0){r.forEach((c,j)=>T(s,c.toUpperCase(),{x:X[j]+0.15,y:y+0.1,w:W[j],h:0.4,fontSize:11,bold:true,color:GOLD,charSpacing:2,valign:'middle',objectName:'h'+j}));names.push(['h0','h1','h2']);return;}
  s.addShape(pres.ShapeType.roundRect,{x:0.7,y,w:11.9,h,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.08,objectName:'rw'+i});
  const ids=['rw'+i];r.forEach((c,j)=>{const id='c'+i+'_'+j;T(s,c,{x:X[j]+0.15,y,w:W[j]-0.15,h,fontSize:j===0?15:14,bold:j===0,color:j===2?GOLD:TX,valign:'middle',objectName:id});ids.push(id);});names.push(ids);});
 cl(N,names);}

// ---- Gateway 4: FlowRule
{const s=ns('DFX UNIDIRECTIONAL GATEWAY  |  4 OF 6','One policy checks, fixes and routes every file','One policy called FlowRule decides what happens. Five entry doors, seven checks, six repairs, four outcomes.',
 NOTE('One file walks left to right. Controls look at it, modifications change it, actions decide its fate. Pause on File Type Control: it checks what the file really is, so a renamed .exe is stopped where antivirus lets it through. Pause on approvals: they follow Active Directory groups, so the people who approve are the people your org chart says should. Do not read the lists; read the headings and one example each.','Controls, modifications and actions as listed in the product documentation. Demo D2 shows the pipeline; Demo D6 shows the approval by AD group.','FlowRule is where a partner shows their understanding of the customer process. The workshop that maps the customer rules to FlowRule is a billable service.','Is it just antivirus? -> No. Antivirus is one of seven checks, and the policy also repairs files and decides who approves.'),{th:0.85});
 const C=[['7','Controls','They inspect',['File Type','Antivirus scan','Sandbox scan','Metadata','Schema validation','Archive depth','Password protection'],true],['6','Modifications','They fix the file',['Format convert','Metadata clean-up','Data masking','Compression','Encryption','File disarm'],false],['4','Actions','They decide',['Allow','Quarantine','Suspend','Notify'],false]];const names=[];
 C.forEach((c,k)=>{const x=0.7+k*4.05;s.addShape(pres.ShapeType.roundRect,{x,y:2.05,w:3.8,h:4.35,fill:{color:CARD},line:{color:k===0?GOLD:'2A2F36',width:1.5},rectRadius:0.12,objectName:'c'+k});
  T(s,c[0],{x:x+0.25,y:2.15,w:1.2,h:1.1,fontSize:60,bold:true,color:GOLD,valign:'middle',objectName:'n'+k});
  T(s,[{text:c[1],options:{bold:true,fontSize:20,breakLine:true}},{text:c[2],options:{fontSize:13,color:MU}}],{x:x+1.4,y:2.2,w:2.3,h:1.0,valign:'middle',objectName:'l'+k});
  T(s,c[3].map((t,i)=>({text:t,options:{bullet:{indent:14},breakLine:i<c[3].length-1}})),{x:x+0.3,y:3.35,w:3.3,h:2.95,fontSize:14,color:STEEL,valign:'top',paraSpaceAfter:3,objectName:'li'+k});names.push(['c'+k,'n'+k,'l'+k,'li'+k]);});
 T(s,'Approvals follow your Active Directory groups: the right person approves the right file.',{x:0.7,y:6.5,w:11.9,h:0.4,fontSize:14,color:GOLD,objectName:'appr'});names.push(['appr']);cl(N,names);}

// ---- Gateway 5: fits protocols, sandboxes, sites
{const s=ns('DFX UNIDIRECTIONAL GATEWAY  |  5 OF 6','It speaks your protocols and keeps your tools','You do not change your systems to use it.',
 NOTE('Three questions, three cards. Which protocols? Fourteen are listed, six from OT and eight from IT. Which tools do I keep? Your sandbox and your CDR engine: the Gateway calls them. Which size? A family from server room to small site. Do not give throughput numbers: they are confirmed per model before they are quoted.','Protocol list from product documentation; DNP3 confirmed. Sandbox and CDR integrations: confirm test status and version per integration before naming them.','Compatibility is the partner’s main risk and main service. The integration demo shows it on the customer systems; the partner brings the knowledge of those systems.','We already have a sandbox or CDR. -> Keep it. The Gateway integrates with five third-party sandboxes and Forcepoint CDR as well as ours.'),{th:0.85});
 const names=cards(s,[{t:'6 OT protocols',d:'OPC UA and DA, DNP3, AVEVA PI, IEC 104, AMQP, MQTT. Data from the plant crosses one way.'},{t:'8 IT protocols',d:'SMTP, NTP, Syslog, Kafka, RDP streaming, UDP, Oracle and Microsoft SQL replication.'},{t:'Your sandbox, your CDR',d:'Our sandbox plus five third-party sandboxes, and two disarm engines. Keep what you run today.',hi:true},{t:'A model for every site',d:'Enterprise, Small, Mini, Fusion Core and Guard. Server room, plant cabinet or small site.'}],{x:0.7,y:2.05,w:11.9,h:3.0,cols:4,p:'k',tf:17,df:14});
 names.push(strip(s,'Also built in: Active Directory, Radius, NTP, Syslog and CEF to your SIEM, firewall and IPS, active/passive high availability, central management of every gateway.',5.35,'f'));
 names.push(strip(s,'Throughput is confirmed per model. Ask for the selection table for your site.',6.1,'g',GREY));cl(N,names);}

// ---- Gateway 6: where it earns its place
{const s=ns('DFX UNIDIRECTIONAL GATEWAY  |  6 OF 6','Where customers start','Four first projects. Each one is small, clear, and has one buyer.',
 NOTE('Pick the one that matches what the customer said in the opening. Software updates is the usual entry for OT. OT visibility is the one operations asks for. Managed file transfer leads into DFX One Platform. Log consolidation is the easy IT win. State the before and after; do not stack all four.','Scenarios from the product notes. Ask engineering before using the words immutable backup or database replication on a slide: the exact wording is confirmed first.','Each scenario is a small project with a clear scope, which suits a partner. The first one usually opens a second.'),{th:0.85});
 const names=cards(s,[{t:'Software updates for OT',d:'Before: patches carried by hand on sticks. After: files are checked and arrive in the OT repository with no path open.',hi:true},{t:'Plant data visibility',d:'Before: operations data stays in the plant. After: telemetry flows out to analytics, nothing flows in.'},{t:'File transfer between isolated networks',d:'Before: sticks and ad hoc shares. After: one policy, approvals and a full log. Leads to DFX One Platform.'},{t:'Logs from separated networks',d:'Before: no central view. After: Syslog from each network reaches one collector in your SIEM.'}],{x:0.7,y:2.05,w:11.9,h:4.3,cols:2,p:'q',df:17});
 cl(N,names);}
