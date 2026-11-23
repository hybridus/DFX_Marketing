const pptxgen=require('pptxgenjs'),fs=require('fs'),path=require('path');
const ST=path.join(__dirname,'..','stills');
const pres=new pptxgen();pres.layout='LAYOUT_WIDE';pres.title='DataFlowX Technical Sales Presentation: DFX Unidirectional Gateway';pres.author='DataFlowX';
const BG='0B0D10',TX='F5F7FA',MU='9AA3AD',GOLD='F5A800',F='Arial',CARD='171A1F',RED='B3121F',GRN='3DDC84',STEEL='C9D1DA',GREY='8FA0B3';
const BL={Corp:'4F8FC9',Cls:'9B6FD8',OT:'2CC4D9'};
const LOGO=path.join(__dirname,'..','..','..','Common','brand','logo-dark-bg.png');
pres.defineSlideMaster({title:'MASTER',background:{color:BG},objects:[{image:{path:LOGO,x:11.55,y:7.02,w:1.25,h:0.272}}],slideNumber:{x:0.5,y:7.02,w:0.6,h:0.3,color:MU,fontSize:10,fontFace:F}});
const builds={};let N=0;
function png(n){const b=fs.readFileSync(path.join(ST,n+'.png'));return [b.readUInt32BE(16),b.readUInt32BE(20)];}
function img(s,n,x,y,w,h,name){const [pw,ph]=png(n),r=pw/ph;let W=w,H=w/r;if(H>h){H=h;W=h*r;}
 s.addImage({path:path.join(ST,n+'.png'),x:x+(w-W)/2,y:y+(h-H)/2,w:W,h:H,objectName:name||n,altText:n});}
function T(s,t,o){s.addText(t,Object.assign({fontFace:F,color:TX,margin:0,isTextBox:true},o));}
const NOTE=(talk,proof,obj)=>'TALK TRACK: '+talk+'\nPROOF: '+proof+(obj?'\nOBJECTION: '+obj:'');
function ns(kick,title,msg,note,o){o=o||{};N++;const s=pres.addSlide({masterName:'MASTER'});s.background={color:BG};
 T(s,kick,{x:0.7,y:0.22,w:11.9,h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:3,objectName:'Kicker'});
 T(s,title,{x:0.7,y:0.55,w:11.9,h:o.th||0.85,fontSize:o.fs||28,bold:true,valign:'top',objectName:'Title'});
 T(s,msg,{x:0.7,y:o.my||1.42,w:11.9,h:0.5,fontSize:16,color:MU,valign:'top',objectName:'Message'});
 s.addNotes(note);return s;}
const cl=(n,list)=>{builds[n]=list;};
function lab(s,x,y,w,t,nm){T(s,t,{x,y,w,h:0.28,fontSize:12,bold:true,color:GOLD,charSpacing:3,valign:'top',objectName:nm});}
function rowsR(s,rows,x,y,w,pitch,p,fs){const out=[];rows.forEach((r,i)=>{const yy=y+i*pitch;
 s.addShape(pres.ShapeType.line,{x,y:yy-0.06,w:0.0001,h:pitch-0.2,line:{color:GOLD,width:2.5},objectName:p+'bar'+i});
 lab(s,x+0.2,yy-0.04,w-0.2,r[0].toUpperCase(),p+'l'+i);T(s,r[1],{x:x+0.2,y:yy+0.24,w:w-0.2,h:pitch-0.55,fontSize:fs||15,valign:'top',objectName:p+'t'+i});out.push([p+'bar'+i,p+'l'+i,p+'t'+i]);});return out;}
function killer(s,txt,x,y,w,p,h){h=h||0.8;s.addShape(pres.ShapeType.roundRect,{x,y,w,h,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.1,objectName:p+'k'});
 T(s,[{text:'THE KEY CAPABILITY   ',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2}},{text:txt,options:{bold:true,fontSize:16}}],{x:x+0.25,y,w:w-0.5,h,valign:'middle',objectName:p+'kt'});return [p+'k',p+'kt'];}
function cards(s,items,o){const n=items.length,cols=o.cols||n,rowsN=Math.ceil(n/cols),gap=o.gap||0.25,w=(o.w-(cols-1)*gap)/cols,h=(o.h-(rowsN-1)*gap)/rowsN,out=[];
 items.forEach((it,i)=>{const cx=o.x+(i%cols)*(w+gap),cy=o.y+Math.floor(i/cols)*(h+gap),p=o.p+i;
  s.addShape(pres.ShapeType.roundRect,{x:cx,y:cy,w,h,fill:{color:CARD},line:{color:it.hi?GOLD:'2A2F36',width:it.hi?1.75:1},rectRadius:0.1,objectName:p+'c'});
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
const K='DFX UNIDIRECTIONAL GATEWAY  |  ';
// ---- 1 Cover
{N++;const s=pres.addSlide();s.background={color:BG};
 s.addImage({path:path.join(ST,'obj_gateway.png'),x:5.6,y:1.4,w:7.4,h:4.4,objectName:'coverGw',altText:'DFX Unidirectional Gateway'});
 s.addImage({path:LOGO,x:0.7,y:0.7,w:3.2,h:0.696,objectName:'logo',altText:'DataFlowX'});
 T(s,'Control the Flow',{x:0.7,y:2.3,w:4.8,h:1.8,fontSize:54,bold:true,color:GOLD,valign:'top',objectName:'Title'});
 T(s,'DFX Unidirectional Gateway',{x:0.7,y:4.2,w:5.8,h:0.6,fontSize:26,bold:true,valign:'top',objectName:'Subtitle'});
 T(s,'Technical Sales Presentation',{x:0.7,y:4.8,w:5.6,h:0.4,fontSize:18,color:STEEL,valign:'top',objectName:'Kind'});
 T(s,'One-way transfer with full content control between networks of different trust',{x:0.7,y:5.4,w:4.9,h:0.9,fontSize:16,color:MU,valign:'top',objectName:'Tagline'});
 T(s,'Presenter  |  Company  |  Date',{x:0.7,y:6.7,w:8,h:0.4,fontSize:12,color:MU,objectName:'meta'});
 s.addNotes(NOTE('Welcome. In the next session you see how one device moves data between two networks in one direction only, how every file is checked on the way, and how it fits what you already run. Ask what the two networks are before you start; it sets the examples you use.','Nothing to prove yet. The proof starts on the next slide.'));}

// ---- 2 Hero
{const A=JSON.parse(fs.readFileSync(path.join(ST,'gw_scene.json'),'utf8'));
 const s=ns(K+'IN YOUR ENVIRONMENT','It works in your environment from day one','Proof on your own systems, in one session. Nothing is rebuilt around it.',
 NOTE('Open on the working system, not on the diode. Say what you are about to do: sign in with a company account, send a file, watch your sandbox return a verdict, open the transfer log, pull a value from an OPC server. Then do it, one step per click, and say only what is on screen. The diode comes after the proof. There are two gateways, one per direction: one carries data out of OT, the other carries data in.','A working session on your own systems. We need an Active Directory service account, the address of your sandbox, a syslog target and the address of an OPC server.','We already have a sandbox. -> Keep it. The Gateway calls it.'),{th:0.85});
 const SX=0.3,SY=1.9,SW=9.0,SH=5.0;img(s,'gw_scene',SX,SY,SW,SH,'scene');
 const [px,py]=png('gw_scene'),k=Math.min(SW/px,SH/py),ox=SX+(SW-px*k)/2,oy=SY+(SH-py*k)/2,P=(n,dx,dy)=>[ox+A[n][0]*k+(dx||0),oy+A[n][1]*k+(dy||0)];
 {const [a1,b1]=P('zot');T(s,'OT NETWORK',{x:0.35,y:b1+0.5,w:3.2,h:0.3,fontSize:13,bold:true,color:BL.OT,charSpacing:2,objectName:'zOT'});
  const [a2,b2]=P('zcorp');T(s,'CORPORATE NETWORK',{x:a2-4.6,y:b2-0.05,w:4.3,h:0.3,fontSize:13,bold:true,color:BL.Corp,charSpacing:2,align:'right',objectName:'zCorp'});
  const [a3,b3]=P('zsys');T(s,'YOUR SYSTEMS',{x:a3-0.2,y:b3-0.38,w:2.6,h:0.3,fontSize:13,bold:true,color:GREY,charSpacing:2,objectName:'zSys'});}
 const steps=[['1','Log in','Users sign in with their company account (Active Directory).','ad'],['2','Send a file','A file crosses through the gateway under one policy.','file'],['3','Inspect it','Your sandbox gives the verdict. Ours or one you already run.','sbx'],['4','See it','Every transfer is in the log, and it reaches your SIEM.','siem'],['5','Pull a value','A value is read from the OPC server and delivered one way.','opc']];
 const names=[];
 steps.forEach((st,i)=>{const y=1.95+i*0.95,x=9.45;
  s.addShape(pres.ShapeType.roundRect,{x,y,w:3.6,h:0.85,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.08,objectName:'sc'+i});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.15,y:y+0.2,w:0.42,h:0.42,fill:{color:GOLD},line:{color:GOLD,width:0.75},objectName:'sn'+i});T(s,st[0],{x:x+0.15,y:y+0.2,w:0.42,h:0.42,fontSize:14,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'snt'+i});
  T(s,[{text:st[1],options:{bold:true,fontSize:15,breakLine:true}},{text:st[2],options:{fontSize:12,color:STEEL}}],{x:x+0.7,y:y+0.03,w:2.85,h:0.8,valign:'middle',objectName:'stt'+i});
  const [mx,my]=P(st[3],0,-0.1);s.addShape(pres.ShapeType.ellipse,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fill:{color:GOLD},line:{color:'0B0D10',width:1.5},objectName:'mk'+i});T(s,st[0],{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'mkt'+i});
  const cap={ad:'Active Directory',file:'File source',sbx:'Your sandbox',siem:'SIEM',opc:'OPC server'}[st[3]];
  T(s,cap,{x:mx+0.25,y:my-0.14,w:1.6,h:0.28,fontSize:13,bold:true,color:STEEL,valign:'middle',objectName:'cap'+i});
  names.push(['sc'+i,'sn'+i,'snt'+i,'stt'+i,'mk'+i,'mkt'+i,'cap'+i]);});
 [['A','gw','OT to corporate',5.75],['B','gw2','corporate to OT',6.2]].forEach((q,i)=>{const [mx,my]=P(q[1],0.1,0.3);s.addShape(pres.ShapeType.ellipse,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fill:{color:'F5F7FA'},line:{color:'0B0D10',width:1.5},objectName:'gm'+i});T(s,q[0],{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'gmt'+i});
  s.addShape(pres.ShapeType.roundRect,{x:0.4,y:q[3],w:3.6,h:0.36,fill:{color:'1A1608'},line:{color:GOLD,width:1.25},rectRadius:0.08,objectName:'gp'+i});T(s,[{text:q[0]+'  ',options:{bold:true,color:'F5F7FA'}},{text:'Gateway: '+q[2],options:{bold:true,color:GOLD}}],{x:0.55,y:q[3],w:3.4,h:0.36,fontSize:12,valign:'middle',objectName:'gpt'+i});names.push(['gm'+i,'gmt'+i,'gp'+i,'gpt'+i]);});
 cl(N,names);}

// ---- 3 Diode
{const s=ns(K+'THE PRINCIPLE','A data diode removes the return path','A normal connection works both ways, and so does an attacker. A data diode does not.',
 NOTE('Start with the problem: every normal connection can be used in both directions, including by an attacker. Then the product: a transmit unit on one side, a receive unit on the other, one fibre between them. There is no return path to attack. Say what disappears: command and control, data theft over a return channel, remote exploits of the protected side. Keep it under two minutes.','The absence of a return fibre can be checked by eye.','Can it be reversed in software? -> No. There is no transmitter on the receiving side to reverse.'));
 const P=scene(s,'gw_diode',0.4,1.95,7.7,4.0);
 const names=[];
 names.push(zlab(s,P,'tx','TRANSMIT UNIT',GOLD,'t1',0,-0.85,2.4,'center'));
 names.push(zlab(s,P,'rx','RECEIVE UNIT',GOLD,'t2',0.5,-0.85,2.4,'center'));
 names.push(...rowsR(s,[['The problem','Every network link carries traffic both ways. An attacker uses the return path to give commands and to take data out.'],['What it does','A transmit unit on one network, a receive unit on the other, one fibre between them. Nothing is built to send back.'],['What disappears','Command and control, data theft over a return channel and remote attacks on the protected side have no path to travel.']],8.4,2.0,4.4,1.3,'r',14));
 names.push(killer(s,'You can see it. One fibre, one direction.',0.7,6.05,11.9,'k'));
 cl(N,[['scene'],...names]);}

// ---- 4 Certified
{const s=ns(K+'INDEPENDENT ASSURANCE','One fibre, one direction, certified','The isolation is physical, and independent bodies have looked at it.',
 NOTE('Walk the diagram left to right: transmit unit, one fibre, receive unit, and the dotted line that is not there. Then the two assurance points. Common Criteria EAL4+ is a certification of the products; read the certificate numbers if asked. Say the Gartner wording as written and no more: it is a listing, not an endorsement.','Common Criteria EAL4+ certificates 21.0.03.0.00.0/TSE-CCCS-103 and TSE-CCCS-86. Gartner Cyber Physical Security Hype Cycle, 2024 to 2026, Sample Vendor.','Which product holds which certificate? -> The certificate documents can be shared on request.'));
 const names=[];
 names.push(box(s,0.9,2.1,2.9,1.4,'Transmit unit','sending network','tx',{line:BL.OT}));
 arrow(s,3.95,2.55,2.9,'fib');names.push(['fib','fibT']);T(s,'one fibre, one direction',{x:3.95,y:2.15,w:2.9,h:0.3,fontSize:12,bold:true,color:GOLD,align:'center',objectName:'fibT'});
 names.push(box(s,7.0,2.1,2.9,1.4,'Receive unit','receiving network','rx',{line:BL.Cls}));
 s.addShape(pres.ShapeType.line,{x:3.95,y:3.0,w:2.9,h:0,line:{color:GREY,width:2,dashType:'dash',beginArrowType:'triangle'},objectName:'noret'});T(s,'X',{x:5.2,y:2.82,w:0.4,h:0.36,fontSize:20,bold:true,color:RED,align:'center',valign:'middle',objectName:'noretX'});T(s,'no return fibre',{x:3.95,y:3.15,w:2.9,h:0.3,fontSize:12,bold:true,color:GREY,align:'center',objectName:'noretT'});names.push(['noret','noretX','noretT']);
 s.addShape(pres.ShapeType.roundRect,{x:10.25,y:2.1,w:2.35,h:1.4,fill:{color:'1A1608'},line:{color:GOLD,width:1.5},rectRadius:0.1,objectName:'chk'});
 T(s,[{text:'You can check it',options:{bold:true,fontSize:15,color:GOLD,breakLine:true}},{text:'One fibre goes out. No fibre comes back.',options:{fontSize:13,color:STEEL}}],{x:10.4,y:2.1,w:2.1,h:1.4,valign:'middle',objectName:'chkT'});names.push(['chk','chkT']);
 const C=cards(s,[{t:'Hardware isolation',d:'The receiving side has no transmitter, so it cannot be reversed in software.'},{t:'Common Criteria EAL4+',d:'Certificates 21.0.03.0.00.0 / TSE-CCCS-103 and TSE-CCCS-86.',hi:true},{t:'Gartner listing',d:'Named as a Sample Vendor in the Cyber Physical Security Hype Cycle, 2024 to 2026. This is not an endorsement.'}],{x:0.7,y:3.9,w:11.9,h:2.75,cols:3,p:'k',tf:19,df:15});
 cl(N,[...names,...C]);}

// ---- 5 Two directions
{const s=ns(K+'TWO DIRECTIONS','Two directions, two gateways','Each path stays one way. A second gateway carries the other direction.',
 NOTE('Real work needs data in both directions: readings out of OT, updates and files into OT. Do not make one device carry both. One gateway per direction, each one way, each with its own policy. Point at A and B on the picture and say which way each one carries data.','The two units are separate and each one has one direction. The picture matches the working session setup.','Why not one device for both? -> Then it would carry both directions, and the one-way guarantee would be gone.'));
 const P=scene(s,'gw_twoway',0.3,1.95,7.9,4.0);const names=[];
 names.push(dot(s,P,'a','A','a',0.1,0.4));names.push(dot(s,P,'b','B','b',0.1,0.4));
 names.push(bcap(s,P,'b'));
 names.push(...rowsR(s,[['A: out of OT','Gateway A carries readings, files and logs from OT to the corporate network.'],['B: into OT','Gateway B carries files and data from the corporate network into OT. It is a separate unit.'],['Why two','No single device carries both directions, so each path keeps its one-way guarantee.']],8.5,2.0,4.3,1.3,'r',14));
 names.push(killer(s,'One gateway per direction. Each path is physically one way.',0.7,6.05,11.9,'k'));
 cl(N,[['scene'],...names]);}

// ---- 6 Family
{const s=ns(K+'A MODEL FOR EVERY SITE','A model for every site','From the server room to a plant cabinet. You pick the model that fits the site.',
 NOTE('Name the family and stop: Enterprise, Small, Mini, Fusion Core and Guard. Do not give throughput numbers; they are confirmed per model, and the selection table for the customer site is shared after the design workshop. The picture shows the Gateway and the Guard.','Model names as listed. Throughput is confirmed per model before it is quoted.','How fast is it? -> It depends on the model. We confirm it for your site in the design workshop.'));
 const P=scene(s,'gw_family',0.4,2.4,6.9,2.7);const names=[];
 names.push(zlab(s,P,'gw','DFX UNIDIRECTIONAL GATEWAY',GOLD,'zg',0,-0.75,3.4,'center'));names.push(zlab(s,P,'guard','DFX DDX GUARD',GOLD,'zd',0.9,0.0,2.2));
 names.push(...rowsR(s,[['Sized to the site','From the server room to a plant cabinet or a small site.'],['The Gateway','Moves data one way and applies the policy. Pairs of gateways carry both directions.'],['The Guard','A 1U chassis that holds two systems, with dual power supplies.']],7.7,2.0,5.1,1.1,'r',13));
 const chips=['Enterprise','Small','Mini','Fusion Core','Guard'];
 chips.forEach((c,i)=>{names.push(pill(s,0.7+i*1.4,5.25,1.3,c,'m'+i,i===0?GOLD:STEEL));});
 names.push(strip(s,'Throughput is confirmed per model. Ask for the selection table for your site.',5.85,'q',GREY));
 cl(N,[['scene'],...names]);}

// ---- 7 Capability map
{const s=ns(K+'THE CAPABILITY MAP','What the Gateway does, in one view','One device, one policy. Each capability has its own slide next.',
 NOTE('Use this as the contents slide. Read the card titles left to right, top to bottom, and say which ones the audience cares about most. Then jump to those. Everything on this page is shown later with a picture or a working example.','Each card maps to a later slide in this deck.'));
 const C=cards(s,[{t:'One-way transfer',d:'Hardware decides the direction. Nothing returns.',hi:true},{t:'FlowRule policy',d:'One policy inspects, repairs and routes every file.',hi:true},{t:'Many ways in',d:'SFTP, HTTP/S API and a web portal.'},{t:'Your tools',d:'Your sandbox and your CDR engine, or ours.'},{t:'Approvals',d:'Follow your Active Directory groups.'},{t:'OT and IT protocols',d:'OPC UA, DNP3, ICCP, Syslog, SMTP and more.'},{t:'Evidence',d:'Every transfer logged, events to your SIEM.'},{t:'Operations',d:'High availability and central management.'}],{x:0.7,y:2.05,w:11.9,h:4.6,cols:4,p:'k',tf:19,df:15});
 cl(N,C);}
// ---- 8 Many ways in
{const s=ns(K+'MANY WAYS IN, ONE POLICY','Many ways in, one policy','Every entry point ends in the same FlowRule, so a file is judged the same way however it arrives.',
 NOTE('People and systems send files in different ways. Show the entries, then point at the bar below: they all lead to one policy. This is the point for the security team: it does not matter how the file arrived, the same checks apply. Ask which entries the customer uses today.','Each entry is shown in the working session.','Do we have to change our applications? -> No. They keep using SFTP or HTTP/S, and the gateway sits behind them.'));
 const C=cards(s,[{t:'SFTP transfer',d:'Users and systems drop files by SFTP.'},{t:'SFTP pull',d:'The gateway fetches files from your SFTP server.'},{t:'HTTP/S API transfer',d:'Systems push files through an API.'},{t:'HTTP/S API pull and mirroring',d:'The gateway pulls from an API and mirrors the data.'},{t:'Web portal',d:'People upload in a browser with their company account.'}],{x:0.7,y:2.05,w:11.9,h:2.5,cols:5,p:'k',tf:16,df:13,gap:0.2});
 const names=[...C];
 names.push(box(s,0.7,4.95,3.2,1.0,'Any entry','file arrives','e1',{line:GREY}));arrow(s,4.05,5.45,1.2,'a1');names.push(['a1']);
 names.push(box(s,5.4,4.95,3.8,1.0,'FlowRule','one policy for every file','e2',{line:GOLD,fill:'1A1608',col:GOLD}));arrow(s,9.35,5.45,1.2,'a2');names.push(['a2']);
 names.push(box(s,10.7,4.95,1.9,1.0,'One way','to the other network','e3',{line:BL.Cls,fs:15}));
 names.push(strip(s,'Same policy, same log, same approvals, whichever way the file comes in.',6.15,'q'));
 cl(N,names);}

// ---- 9 FlowRule pipeline
{const s=ns(K+'FLOWRULE','One policy checks, fixes and routes every file','FlowRule decides what happens to every file: it inspects, repairs if needed, and sets the outcome.',
 NOTE('One file walks left to right. Controls look at it, modifications change it, actions decide its fate. Pause on File Type: it checks what the file really is, so a renamed .exe is stopped where antivirus lets it through. Pause on approvals: they follow Active Directory groups, so the people who approve are the people your org chart says should. Do not read the lists; read the headings and one example each.','The pipeline is shown live in the working session. Each control, modification and action has its own slide next.','What if our rules are complicated? -> The design workshop maps your rules to FlowRule before anything is installed.'));
 const C=[['funnel','Controls','They inspect',['File Type','AV Scan','Sandbox Scan','Meta Data','Schema Validation','Archive Depth','Password Protection'],true],['gear6','Modifications','They fix the file',['Format Convert','Meta Data Clean Up','Data Masking','Compression','Encryption','File Disarm'],false],['rightArrow','Actions','They decide',['Allow','Quarantine','Suspend','Notify'],false]];const names=[];
 C.forEach((c,k)=>{const x=0.7+k*4.05;s.addShape(pres.ShapeType.roundRect,{x,y:2.05,w:3.8,h:4.35,fill:{color:CARD},line:{color:k===0?GOLD:'2A2F36',width:1.5},rectRadius:0.12,objectName:'c'+k});
  s.addShape(pres.ShapeType[c[0]],{x:x+0.3,y:2.3,w:0.85,h:0.8,fill:{color:GOLD},line:{color:GOLD,width:0.75},objectName:'n'+k});
  T(s,[{text:c[1],options:{bold:true,fontSize:20,breakLine:true}},{text:c[2],options:{fontSize:13,color:MU}}],{x:x+1.4,y:2.2,w:2.3,h:1.0,valign:'middle',objectName:'l'+k});
  T(s,c[3].map((t,i)=>({text:t,options:{bullet:{indent:14},breakLine:i<c[3].length-1}})),{x:x+0.3,y:3.35,w:3.3,h:2.95,fontSize:14,color:STEEL,valign:'top',paraSpaceAfter:3,objectName:'li'+k});names.push(['c'+k,'n'+k,'l'+k,'li'+k]);});
 T(s,'Approvals follow your Active Directory groups: the right person approves the right file.',{x:0.7,y:6.5,w:11.9,h:0.4,fontSize:14,color:GOLD,objectName:'appr'});names.push(['appr']);cl(N,names);}

// ---- 10 Controls
{const s=ns(K+'FLOWRULE: CONTROLS','Controls look inside before anything crosses','Each control passes or fails the file. FlowRule decides what happens next.',
 NOTE('Pick three and say them well. File Type: a renamed .exe is stopped where antivirus lets it through. Archive Depth: an archive inside an archive inside an archive is a classic way to hide something. Password Protection: a file that cannot be inspected should not cross without a rule. The rest you name and move on.','The controls are listed in the product documentation and shown in the working session.','Does the order matter? -> Yes, you set it in FlowRule, and the design workshop sets it with you.'));
 const C=cards(s,[{t:'File Type',d:'Checks what the file really is, not what its name says. A renamed .exe is stopped.',hi:true},{t:'AV Scan',d:'Scans the file with antivirus engines.'},{t:'Sandbox Scan',d:'Runs the file in a sandbox and takes the verdict. Yours or ours.'},{t:'Meta Data',d:'Checks author, dates and properties against your rules.'},{t:'Schema Validation',d:'Checks structured data against the schema you define.'},{t:'Archive Depth',d:'Limits how deep archives may nest, so nothing hides inside layers.'},{t:'Password Protection',d:'Finds files that cannot be inspected and applies your rule.'},{t:'Your rule decides',d:'Each control passes or fails. FlowRule sets the next step.',hi:true}],{x:0.7,y:2.05,w:11.9,h:4.6,cols:4,p:'k',tf:18,df:14});
 cl(N,C);}

// ---- 11 Modifications
{const s=ns(K+'FLOWRULE: MODIFICATIONS','Modifications fix the file instead of refusing it','When a file is almost right, the policy changes it and lets the work carry on.',
 NOTE('The point is that security does not have to mean a refusal. File Disarm rebuilds the file without active content, so the engineer still gets the drawing. Meta Data Clean Up removes what the sender did not mean to share. Data Masking hides values that should not leave. Say one sentence for each and stop.','Modifications are listed in the product documentation and shown in the working session.','Does disarm change how the file looks? -> It rebuilds the file without active content. The design workshop tests it on your file types.'));
 const C=cards(s,[{t:'File Disarm',d:'Rebuilds the file without active content such as macros.',hi:true},{t:'Format Convert',d:'Converts the file to a safer format.'},{t:'Meta Data Clean Up',d:'Removes hidden author, location and history data.'},{t:'Data Masking',d:'Hides sensitive values before the file leaves.'},{t:'Compression',d:'Compresses files for transfer.'},{t:'Encryption',d:'Encrypts the file for its destination.'}],{x:0.7,y:2.05,w:11.9,h:4.6,cols:3,p:'k',tf:20,df:16});
 cl(N,C);}

// ---- 12 Actions
{const s=ns(K+'FLOWRULE: ACTIONS','Actions decide what happens to the file','Every file ends in one of four outcomes, and each one is recorded.',
 NOTE('Four outcomes. Allow: the file crosses. Quarantine: it is held and never crosses. Suspend: it waits for a person. Notify: people or systems are told. A policy can combine them, for example suspend and notify the approver group.','Each outcome is visible in the transfer log.'));
 const names=[];
 const A=[['Allow','The file crosses to the other network.',GRN],['Quarantine','The file is held. It never crosses.',RED],['Suspend','The transfer waits for an approver.',GOLD],['Notify','People or systems are told what happened.',BL.Corp]];
 A.forEach((a,k)=>{const x=0.7+k*3.0,y=2.2;s.addShape(pres.ShapeType.roundRect,{x,y,w:2.8,h:2.9,fill:{color:CARD},line:{color:a[2],width:1.75},rectRadius:0.12,objectName:'a'+k});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.3,y:y+0.3,w:0.7,h:0.7,fill:{color:a[2]},line:{color:a[2],width:0.75},objectName:'o'+k});
  T(s,a[0],{x:x+0.3,y:y+1.2,w:2.3,h:0.5,fontSize:22,bold:true,objectName:'at'+k});T(s,a[1],{x:x+0.3,y:y+1.8,w:2.3,h:1.0,fontSize:15,color:STEEL,valign:'top',objectName:'ad'+k});names.push(['a'+k,'o'+k,'at'+k,'ad'+k]);});
 names.push(strip(s,'Actions can be combined: for example suspend the transfer and notify the approver group.',5.45,'q'));
 names.push(strip(s,'Every outcome is written to the transfer log, with the rule that caused it.',6.15,'r',GREY));
 cl(N,names);}

// ---- 13 Approvals
{const s=ns(K+'APPROVALS','Approvals follow your org chart','The people who approve a file are the people your Active Directory says should.',
 NOTE('Show the approver group in the directory, then a file waiting, then the approval. The point is that nobody maintains a second list of approvers: the gateway reads the groups you already manage. When someone changes role in the directory, the approval right changes with them.','Approver groups are read from Active Directory. The approval and the approver are in the transfer log.','Can one person approve their own file? -> Your policy decides; the design workshop sets it with you.'));
 const P=scene(s,'gw_approval',0.3,1.95,7.9,4.0);const names=[];
 names.push(bcap(s,P,'b',['ACTIVE DIRECTORY']));names.push(dot(s,P,'req','1','m1',0,-0.3));names.push(dot(s,P,'ad','2','m2',0,-0.3));names.push(dot(s,P,'appr','3','m3',0,-0.3));
 names.push(...rowsR(s,[['1  The requester','Sends a file that needs a decision. It is suspended before it crosses.'],['2  Active Directory','Approver groups come from the directory. Nothing new to maintain.'],['3  The approver','The decision and the person are written to the transfer log.']],8.5,2.0,4.3,1.3,'r',14));
 names.push(killer(s,'Your org chart decides who approves.',0.7,6.05,11.9,'k'));
 cl(N,[['scene'],...names]);}

// ---- 14 Own sandbox and CDR
{const s=ns(K+'YOUR TOOLS','Bring your own sandbox and CDR engine','Keep what you run today. The gateway calls it and waits for the verdict.',
 NOTE('This answers the first objection in every IT meeting: we already have a sandbox. Keep it. The gateway sends the file to it and waits. Our own DFX Malware Mitigation Sandbox and DFX TruCDR are there if you want them. Do not say which is better; say that the policy is the same either way.','Third-party sandboxes and disarm engines are called through their interfaces; the working session shows it with your tool.','We already have a sandbox. -> Keep it. The Gateway calls it.'));
 const P=scene(s,'gw_docks',0.3,1.95,7.9,4.0);const names=[];
 names.push(bcap(s,P,'b'));names.push(dot(s,P,'s3','1','m1',-1.0,-0.3));names.push(dot(s,P,'s4','2','m2',-1.0,-0.3));names.push(zlab(s,P,'s1','DFX MALWARE MITIGATION SANDBOX',GOLD,'z1',0.3,-0.5,4.2));names.push(zlab(s,P,'s2','DFX TRUCDR',GOLD,'z2',0.4,-0.4,2.4)); names.push(...rowsR(s,[['1  Your sandbox','The gateway calls the sandbox you already run, or ours: DFX Malware Mitigation Sandbox.'],['2  Your CDR engine','The gateway calls your CDR engine, or ours: DFX TruCDR.'],['Verdict first','A file crosses only after the verdict comes back clean.']],8.5,2.0,4.3,1.3,'r',14));
 names.push(killer(s,'Your sandbox, your CDR engine. We fit in.',0.7,6.05,11.9,'k'));
 cl(N,[['scene'],...names]);}

// ---- 15 TruScope
{const s=ns(K+'OUR OWN ENGINE','Our own detection engine: TruScope Anti Malware Engine','Made for the formats people exchange every day: Office files, PDF and images.',
 NOTE('Say it simply: this is our own engine, and it is focused on Office files, PDF and images. It is one control among others in FlowRule; you can use it alone or with your engines. Do not compare detection rates; say that the working session runs it on the customer files.','TruScope Anti Malware Engine, part of the DataFlowX product line.','How does it compare to our antivirus? -> Use both. FlowRule can run several controls on the same file.'),{fs:26});
 const names=[];
 [['Office','DOCX XLSX PPTX'],['PDF','PDF files'],['Image','JPG PNG']].forEach((f,k)=>{const y=2.1+k*1.0;names.push(box(s,0.7,y,2.4,0.85,f[0],f[1],'f'+k,{line:GREY}));arrow(s,3.2,y+0.42,0.9,'fa'+k,GREY);names[names.length-1].push('fa'+k);});
 names.push(box(s,4.2,2.1,3.0,2.85,'TruScope','Anti Malware Engine','e',{line:GOLD,fill:'1A1608',col:GOLD,fs:24,scol:STEEL}));
 arrow(s,7.3,3.5,1.2,'ev');names.push(['ev']);
 names.push(box(s,8.6,2.1,3.6,1.2,'Clean','the file continues to the next step','v1',{line:GRN,col:GRN}));names.push(box(s,8.6,3.75,3.6,1.2,'Blocked','the file is held and the reason is logged','v2',{line:RED,col:RED}));
 [['Office, PDF and images',0.7],['Verdict goes to FlowRule',4.75],['Runs beside your antivirus and sandbox',8.8]].forEach((q,i)=>{names.push(pill(s,q[1],5.2,3.8,q[0],'i'+i,STEEL));});
 names.push(strip(s,'One control among others: FlowRule can run TruScope, your antivirus and your sandbox on the same file.',5.95,'q'));
 cl(N,names);}
// ---- 16 Archive and quarantine
{const s=ns(K+'ARCHIVE AND QUARANTINE','Held files and archives stay in your hands','A file that fails a control is held with the reason. Nothing disappears without a record.',
 NOTE('Show the quarantine list: the file, the control that stopped it, the time. Say that the gateway does not silently drop things: a held file is visible to the people who own the policy. Archive is for the opposite need, keeping a copy of what crossed. The slide shows sample entries; the working session shows the real screen.','Held files and archived files are visible in the working session.'));
 const names=[];
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:2.05,w:7.2,h:4.1,fill:{color:'10141A'},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'win'});
 s.addShape(pres.ShapeType.rect,{x:0.7,y:2.05,w:7.2,h:0.5,fill:{color:'1C2128'},line:{color:'2A2F36',width:1},objectName:'bar'});
 T(s,'Quarantine',{x:0.95,y:2.05,w:3,h:0.5,fontSize:14,bold:true,valign:'middle',objectName:'wt'});

 const H=[['FILE',0.95,2.6],['STOPPED BY',3.65,2.3],['STATE',6.05,1.7]];H.forEach((h,i)=>T(s,h[0],{x:h[1],y:2.7,w:h[2],h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:'h'+i}));
 names.push(['win','bar','wt','h0','h1','h2']);
 const R=[['supplier_drawing.pdf','File Type','Held'],['update_pack.zip','Archive Depth','Held'],['report_Q3.xlsx','Sandbox Scan','Held'],['firmware.bin','Password Protection','Held']];
 R.forEach((r,i)=>{const y=3.1+i*0.7;s.addShape(pres.ShapeType.roundRect,{x:0.85,y,w:6.9,h:0.58,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.06,objectName:'r'+i});
  T(s,r[0],{x:0.95,y,w:2.6,h:0.58,fontSize:13,valign:'middle',objectName:'rf'+i});T(s,r[1],{x:3.65,y,w:2.3,h:0.58,fontSize:13,color:STEEL,valign:'middle',objectName:'rc'+i});
  s.addShape(pres.ShapeType.roundRect,{x:6.05,y:y+0.14,w:1.0,h:0.3,fill:{color:'2A1214'},line:{color:RED,width:1},rectRadius:0.1,objectName:'rb'+i});T(s,r[2],{x:6.05,y:y+0.14,w:1.0,h:0.3,fontSize:12,bold:true,color:'F26B76',align:'center',valign:'middle',objectName:'rs'+i});
  names.push(['r'+i,'rf'+i,'rc'+i,'rb'+i,'rs'+i]);});
 names.push(...rowsR(s,[['Held with the reason','A file that fails a control is held, and the control that stopped it is shown.'],['Archive','A copy of what crossed can be kept for later reference.'],['Recorded','What happened to a held file is written to the transfer log.']],8.3,2.0,4.5,1.3,'q',14));
 cl(N,names);}

// ---- 17 Portal
{const s=ns(K+'YOUR PORTAL, YOUR BRAND','Your portal, your brand','People upload through a page that looks like your organisation and follows your policy.',
 NOTE('Use this for teams that exchange files with people who are not technical: suppliers, contractors, colleagues. They sign in, drop the file, and see the outcome. It looks like your organisation, not like ours. The slide shows a sample page; the working session shows the real one.','The portal is shown in the working session with your own logo and colours.','Is it another system to maintain? -> No. Sign-in uses Active Directory and the files follow the same FlowRule as every other entry.'));
 const names=[];
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:2.05,w:7.2,h:4.5,fill:{color:'10141A'},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'win'});
 s.addShape(pres.ShapeType.rect,{x:0.7,y:2.05,w:7.2,h:0.5,fill:{color:'1C2128'},line:{color:'2A2F36',width:1},objectName:'bar'});
 [0,1,2].forEach(i=>s.addShape(pres.ShapeType.ellipse,{x:0.95+i*0.26,y:2.22,w:0.16,h:0.16,fill:{color:'3A4350'},line:{color:'3A4350',width:0.5},objectName:'d'+i}));
 s.addShape(pres.ShapeType.roundRect,{x:1.0,y:2.8,w:1.9,h:0.5,fill:{color:'1C2128'},line:{color:GREY,width:1,dashType:'dash'},rectRadius:0.06,objectName:'logo'});T(s,'YOUR LOGO',{x:1.0,y:2.8,w:1.9,h:0.5,fontSize:12,bold:true,color:GREY,align:'center',valign:'middle',objectName:'logoT'});
 T(s,'Secure file transfer',{x:1.0,y:3.5,w:5.5,h:0.5,fontSize:22,bold:true,objectName:'pt'});
 T(s,'Signed in as a colleague through your company account',{x:1.0,y:4.0,w:6.5,h:0.3,fontSize:13,color:MU,objectName:'ps'});
 s.addShape(pres.ShapeType.roundRect,{x:1.0,y:4.5,w:6.6,h:1.2,fill:{type:'none'},line:{color:GOLD,width:1.5,dashType:'dash'},rectRadius:0.1,objectName:'drop'});T(s,'Drop a file here',{x:1.0,y:4.5,w:6.6,h:1.2,fontSize:16,color:STEEL,align:'center',valign:'middle',objectName:'dropT'});
 s.addShape(pres.ShapeType.roundRect,{x:5.7,y:5.85,w:1.9,h:0.5,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.08,objectName:'btn'});T(s,'Send',{x:5.7,y:5.85,w:1.9,h:0.5,fontSize:14,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'btnT'});
 names.push(['win','bar','d0','d1','d2','logo','logoT','pt','ps','drop','dropT','btn','btnT']);
 names.push(...rowsR(s,[['Your branding','Your logo and your colours, so people trust the page.'],['Company sign-in','Users sign in with Active Directory.'],['One policy','Uploads follow the same FlowRule as every other entry.']],8.3,2.0,4.5,1.3,'q',14));
 cl(N,names);}

// ---- 18 OT protocols
{const s=ns(K+'PROTOCOLS: OT','The industrial protocols your plant already speaks','Data leaves the plant in the protocol it already uses, one way.',
 NOTE('Read the names, not the descriptions. The audience will find their own protocol. If it is not here, say it is assessed in the design workshop; do not promise it. ICCP is the one utilities ask about first: control-centre to control-centre exchange. The direction is always the same: from the plant to the network that needs the data.','Protocol list from the product documentation.','Our protocol is not on the list. -> We assess it in the design workshop before you decide anything.'));
 const C=cards(s,[{t:'OPC UA and DA',d:'Plant data and tags from OPC servers.',hi:true},{t:'DNP3',d:'Telemetry from utility systems.'},{t:'ICCP',d:'Data exchange between control centres.',hi:true},{t:'AVEVA PI',d:'Historian data from AVEVA PI.'},{t:'IEC 104',d:'Telecontrol in power systems.'},{t:'AMQP',d:'Message queues between systems.'},{t:'MQTT',d:'Telemetry from devices and sensors.'},{t:'Another protocol?',d:'We assess it in the design workshop.'}],{x:0.7,y:2.05,w:11.9,h:3.75,cols:4,p:'k',tf:18,df:14});
 const names=[...C];names.push(strip(s,'Data crosses one way, from the plant to the network that needs it.',6.05,'q'));cl(N,names);}

// ---- 19 IT protocols
{const s=ns(K+'PROTOCOLS: IT','The IT protocols behind everyday transfers','Files, mail, logs, time, streams and databases cross in their own formats.',
 NOTE('Same as the OT slide: read the names. Syslog is the quiet one that sells itself, because every customer has logs they would like in one place. Oracle and Microsoft SQL replication is the one for backup and reporting copies. RDP streaming sends the screen of a session one way.','Protocol list from the product documentation.','Our protocol is not on the list. -> We assess it in the design workshop before you decide anything.'));
 const C=cards(s,[{t:'SMTP',d:'Mail and alerts'},{t:'SFTP',d:'Secure file transfer'},{t:'HTTP',d:'Web and API traffic'},{t:'UDP',d:'Streams and datagrams'},{t:'SNMP',d:'Device status'},{t:'NTP',d:'Time from your server'},{t:'Syslog',d:'Logs from devices',hi:true},{t:'Kafka',d:'Event streams'},{t:'RDP streaming',d:'Remote session view'},{t:'Oracle replication',d:'Database copy, one way',hi:true},{t:'Microsoft SQL replication',d:'Database copy, one way',hi:true},{t:'Another protocol?',d:'Ask us about others'}],{x:0.7,y:2.05,w:11.9,h:4.6,cols:4,p:'k',tf:17,df:13,gap:0.2});
 cl(N,C);}

// ---- 20 Pull from OPC
{const s=ns(K+'PROTOCOLS: OPC','Pull from OPC: nothing on the other side can query the plant','The gateway reads the values. The corporate side only receives them.',
 NOTE('The common worry is that opening OPC to the business network opens the plant. Here the gateway sits on the plant side and reads the values itself. The corporate side receives data; it cannot send a query. Say the three words on the slide: pull, deliver, configure. The OPC server address is one of the four things we ask for before a working session.','An OPC server address is all we need to start the working session.','Can IT browse the OPC server? -> No. IT receives the values the policy delivers. It cannot browse or query.'),{fs:26});
 const names=[];
 names.push(box(s,0.7,2.2,2.9,1.3,'OPC server','in the plant','o',{line:BL.OT}));
 arrow(s,3.75,2.85,1.1,'ar1',GREY);T(s,'read',{x:3.75,y:2.4,w:1.1,h:0.3,fontSize:12,bold:true,color:GREY,align:'center',objectName:'rd'});names[names.length-1].push('ar1','rd');
 names.push(box(s,5.0,2.2,2.9,1.3,'Gateway','reads the values','g',{line:GOLD,fill:'1A1608',col:GOLD}));
 arrow(s,8.05,2.85,1.3,'ar2');T(s,'one way',{x:8.05,y:2.4,w:1.3,h:0.3,fontSize:12,bold:true,color:GOLD,align:'center',objectName:'ow'});
 names.push(box(s,9.5,2.2,3.1,1.3,'Corporate network','historian, dashboards','c',{line:BL.Corp}));names.push(['ar2','ow']);
 names.push(...(() => {const r=[];[['1  Pull','The gateway reads the values from the OPC server on the plant side.'],['2  Deliver','Values arrive one way, as data, at the receiving side.'],['3  Configure','You give the OPC server address. The design workshop maps the tags.']].forEach((c,k)=>{const x=0.7+k*4.05;s.addShape(pres.ShapeType.roundRect,{x,y:4.4,w:3.8,h:1.9,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.1,objectName:'q'+k});T(s,c[0],{x:x+0.25,y:4.55,w:3.3,h:0.4,fontSize:18,bold:true,color:GOLD,objectName:'qt'+k});T(s,c[1],{x:x+0.25,y:5.0,w:3.3,h:1.2,fontSize:15,color:STEEL,valign:'top',objectName:'qd'+k});r.push(['q'+k,'qt'+k,'qd'+k]);});return r;})());
 cl(N,names);}
// ---- 21 Logging
{const s=ns(K+'EVIDENCE','Every transfer is logged, and the log goes where you need it','Who sent what, which rule applied, what the verdict was. In the gateway and in your SIEM.',
 NOTE('Open the log after the transfer you just made and read one line: time, entry, file, rule, outcome. That line is the answer to who decided this file could cross. Then say where it goes: Syslog and CEF to your SIEM, so security sees it where they already look. The slide shows sample entries.','The transfer log and the event in the SIEM are both shown in the working session.','Can we send it to our SIEM? -> Yes, in Syslog and CEF.'));
 const names=[];
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:2.05,w:8.1,h:4.3,fill:{color:'10141A'},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'win'});
 s.addShape(pres.ShapeType.rect,{x:0.7,y:2.05,w:8.1,h:0.5,fill:{color:'1C2128'},line:{color:'2A2F36',width:1},objectName:'bar'});
 T(s,'Transfer log',{x:0.95,y:2.05,w:3,h:0.5,fontSize:14,bold:true,valign:'middle',objectName:'wt'});

 const H=[['TIME',0.95,1.2],['ENTRY',2.2,1.4],['FILE',3.65,2.1],['RULE',5.8,1.6],['OUTCOME',7.45,1.2]];H.forEach((h,i)=>T(s,h[0],{x:h[1],y:2.7,w:h[2],h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:'h'+i}));
 names.push(['win','bar','wt','h0','h1','h2','h3','h4']);
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
 const cap=['Active Directory','Radius','NTP','SIEM','Firewall and IPS','Central management','High availability'];[['ad',0.3,-0.12],['radius',0.3,-0.12],['ntp',0.3,-0.12],['siem',0.3,-0.12],['fw',0.3,-0.12],['mgmt',0.3,-0.12],['ha',0.3,0.4]].forEach((q,i)=>{const [x,y]=P(q[0],q[1],q[2]);T(s,cap[i],{x:q[1]<0&&q[0]!=='mgmt'?x-0.0:x+(q[1]<0?0:0.15),y:y-0.15,w:1.9,h:0.3,fontSize:12,bold:true,color:STEEL,align:q[1]<0&&q[0]!=='mgmt'?'right':'left',valign:'middle',objectName:'cp'+i});names[i].push('cp'+i);});
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
 NOTE('For customers with more than one site, this is the slide that matters. One central management for every gateway: you see them together, you change them from one place. Say that high availability comes as an active and passive pair. Do not go into numbers of gateways; say that the design workshop sizes it.','Central management is shown in the working session. The picture is a sample.','How many gateways can it manage? -> The design workshop sizes it for your sites.'));
 const names=[];
 const cmb=box(s,3.0,2.1,3.6,1.0,'Central management','every gateway, one place','cm',{line:GOLD,fill:'1A1608',col:GOLD});
 const G=[['Site A','active',GRN],['Site B','active',GRN],['Site C','active',GRN],['Site D','standby',GREY]];
 s.addShape(pres.ShapeType.line,{x:1.7,y:3.6,w:6.2,h:0,line:{color:'3A4350',width:1.5},objectName:'bus'});s.addShape(pres.ShapeType.line,{x:4.8,y:3.1,w:0,h:0.5,line:{color:'3A4350',width:1.5},objectName:'stem'});names.push([...cmb,'bus','stem']);
 G.forEach((g,k)=>{const x=0.7+k*2.1;s.addShape(pres.ShapeType.line,{x:x+0.95,y:3.6,w:0,h:0.4,line:{color:'3A4350',width:1.5},objectName:'dr'+k});
  s.addShape(pres.ShapeType.roundRect,{x,y:4.0,w:1.9,h:1.6,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'g'+k});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.2,y:4.2,w:0.22,h:0.22,fill:{color:g[2]},line:{color:g[2],width:0.5},objectName:'dt'+k});
  T(s,g[0],{x:x+0.5,y:4.15,w:1.3,h:0.32,fontSize:15,bold:true,valign:'middle',objectName:'gn'+k});T(s,'DFX Unidirectional Gateway',{x:x+0.2,y:4.6,w:1.55,h:0.55,fontSize:12,color:STEEL,valign:'top',objectName:'gt'+k});T(s,g[1],{x:x+0.2,y:5.15,w:1.5,h:0.3,fontSize:12,color:g[2],bold:true,objectName:'gs'+k});names.push(['dr'+k,'g'+k,'dt'+k,'gn'+k,'gt'+k,'gs'+k]);});
 names.push(...rowsR(s,[['One place','Central management for every gateway in your estate.'],['Pairs stay up','Active and passive high availability.'],['Same feeds','Time from NTP, events to your SIEM.']],9.0,2.0,3.8,1.3,'q',14));
 cl(N,names);}
// ---- scenarios
function scen(c){const s=ns('SCENARIO  |  '+c.kick,c.title,c.msg,NOTE(c.talk,c.proof,c.obj),{fs:c.fs||28});const names=[];
 const P=scene(s,c.scene,3.5,2.0,6.3,3.75);
 const card=(x,lbl,txt,col,k)=>{s.addShape(pres.ShapeType.roundRect,{x,y:2.15,w:2.9,h:3.6,fill:{color:CARD},line:{color:col,width:1.5},rectRadius:0.12,objectName:k+'c'});
  T(s,lbl,{x:x+0.22,y:2.32,w:2.5,h:0.3,fontSize:12,bold:true,color:col,charSpacing:3,objectName:k+'l'});T(s,txt,{x:x+0.22,y:2.75,w:2.5,h:2.9,fontSize:15,valign:'top',objectName:k+'t'});return [k+'c',k+'l',k+'t'];};
 names.push(card(0.5,'TODAY',c.before,GREY,'b'));
 const sc=['scene',...bcap(s,P,'b')];
 names.push(sc);
 names.push(card(9.93,'WITH THE GATEWAY',c.after,GOLD,'a'));
 names.push(strip(s,c.cross,6.05,'q'));
 cl(N,names);}
const SC=[
{kick:'SOFTWARE UPDATES FOR OT',title:'Bring software updates into OT without a USB stick',msg:'Patches reach the plant through a checked, logged and one-way path.',scene:'gw_s25',
 before:'Updates travel on USB sticks and laptops. Each one is a way in, and nobody can prove what was on it.',after:'The update server sends the pack through the gateway. Your sandbox checks it, an approver releases it, and the log records it.',cross:'Typical policy: File Type, Sandbox Scan, Archive Depth, then suspend for approval.',
 caps:[['src','CORPORATE NETWORK',BL.Corp,-1.3,-0.55,3.0],['dst','OT NETWORK',BL.OT,-0.3,0.9,2.4]],
 talk:'Updates are the one thing OT must receive, so it is where USB sticks and laptops creep in. Show the path instead: the update server sends the pack, your sandbox checks it, a person from the approver group releases it, and the plant receives it. The way back does not exist.',proof:'The same path is shown in the working session with one of your update packs.',obj:'Vendors insist on their own tools. -> The pack still arrives as a file through the gateway; the policy decides whether it may enter.'},
{kick:'OT, IOT, IIOT AND XIOT VISIBILITY',title:'See your OT, IoT, IIoT and xIoT estate without opening it',msg:'Visibility needs data from the plant. It does not need a way in.',scene:'gw_s26',
 before:'A monitoring connection into the plant is also a connection for an attacker.',after:'Sensor and system data leaves one way. Analytics, dashboards and AI work on what arrives. Nothing can send back.',cross:'Typical policy: OPC UA, MQTT or Syslog out of the plant, no inbound traffic at all.',
 caps:[['src','OT NETWORK',BL.OT,-1.3,-0.55,3.0],['dst','CORPORATE NETWORK',BL.Corp,-0.5,0.9,3.2]],
 talk:'Customers want to see all their devices. The usual way is a connection into the plant, which is a way in. Here the data leaves through one gateway and the analytics sit on the other side. They can look as much as they like; they cannot reach back.',proof:'The working session pulls a value from an OPC server and shows it arriving on the other side.',obj:'Our tool needs to poll the devices. -> It polls a copy on the receiving side. It never talks to the plant.'},
{kick:'MANAGED FILE TRANSFER',title:'Managed file transfer between isolated networks',msg:'Files move both ways, and each way has its own gateway and its own policy.',scene:'gw_s27',
 before:'Files move on removable media or through a shared jump host that touches both networks.',after:'Two gateways, one per direction. Every file is inspected, approved by group and logged.',cross:'Typical policy: File Type, AV Scan, Sandbox Scan, then approval by Active Directory group.',
 caps:[['src','NETWORK A',BL.Corp,-1.3,-0.55,3.0],['dst','NETWORK B',BL.OT,-0.3,0.9,2.4]],
 talk:'This is the plain file-exchange case between two networks that must stay apart. Say two gateways, one per direction. A file from A to B passes one policy, a file from B to A passes another, and both are logged. Nobody carries media across.',proof:'The working session sends a file in each direction and shows both entries in the log.',obj:'Do we need two policies? -> You can use the same one. Each gateway applies the policy you choose.'},
{kick:'DATA EXCHANGE WITH THIRD PARTIES',title:'Exchange data with third parties without giving them a path in',msg:'Partners deliver files. They never get a connection into your network.',scene:'gw_s28',
 before:'Partners send files by mail or get a remote path into your network.',after:'Partners upload through your portal. Files are checked, disarmed and delivered one way. Only clean files reach your teams.',cross:'Typical policy: File Type, Sandbox Scan, File Disarm with DFX TruCDR.',
 caps:[['src','EXTERNAL PARTNER',GREY,-1.5,-0.55,3.2],['dst','YOUR NETWORK',BL.Corp,-0.3,0.9,2.4]],
 talk:'Every company receives files from people it does not control. Show the portal, then the path: the partner uploads, the policy checks, DFX TruCDR rebuilds the file without active content, and only the clean file reaches your teams. The partner never sees your network.',proof:'The portal and the rebuilt file are shown in the working session.',obj:'Partners will not change how they work. -> They use a web page with a file drop. That is all they need.'},
{kick:'LOG CONSOLIDATION',title:'Consolidate logs from separated networks',msg:'Logs from every network end up in one place, and nothing can travel back.',scene:'gw_s29',
 before:'Logs from separated networks are collected by hand, or not at all.',after:'Syslog from each network crosses one way into one collector and your SIEM.',cross:'Typical policy: Syslog in, CEF out to your SIEM.',
 caps:[['src','SEPARATED NETWORKS',BL.OT,-1.5,-0.55,3.4],['dst','YOUR LOG SYSTEM',BL.Corp,-0.4,0.9,3.0]],
 talk:'Security teams want every log in one place, and separated networks are exactly where logs go missing. Syslog crosses one way. The collector and the SIEM get everything; the networks keep their isolation.',proof:'A Syslog event arriving at the SIEM is shown in the working session.',obj:'Will the SIEM parse it? -> Events leave in CEF and Syslog, which SIEMs read.'},
{kick:'BACKUP INTO A PROTECTED NETWORK',title:'Back up into a network the attacker cannot reach',msg:'The copy that saves you must sit where the attack cannot go.',scene:'gw_s30',
 before:'Backups sit on a network the attacker can reach, so they can be encrypted or deleted with everything else.',after:'Backups cross one way into a vault network. Nothing travels back from the vault.',cross:'Typical policy: File Type, AV Scan, encryption for the vault.',
 caps:[['src','PRODUCTION NETWORK',BL.Corp,-1.5,-0.55,3.4],['dst','BACKUP VAULT NETWORK',GREY,-0.9,0.9,3.4]],
 talk:'After an attack, the question is whether the backup survived. If the backup network can be reached from production, the answer is often no. One-way transfer puts the copy where nothing can come back from. Say what is true and nothing more: the path is one way.',proof:'The one-way path is shown by eye in the working session.',obj:'How do we restore? -> The restore path is designed in the workshop, with its own controlled route.'},
{kick:'ONE-WAY DATABASE REPLICATION',title:'Replicate databases one way',msg:'Reporting and analytics read a replica. The production database stays out of reach.',scene:'gw_s31',
 before:'Replication needs a two-way link to the database, which is an open path to it.',after:'Oracle and Microsoft SQL replication cross one way. The replica can be read. Nothing can write back.',cross:'Typical policy: replication in one direction, events logged, time from your NTP.',
 caps:[['src','SOURCE NETWORK',BL.Corp,-1.3,-0.55,3.0],['dst','REPLICA NETWORK',BL.OT,-0.5,0.9,3.0]],
 talk:'Many teams need a copy of production data for reports. Normal replication needs a path to the primary. Here the replica receives changes one way, so reporting users can read as much as they like and cannot touch the primary.',proof:'Oracle and Microsoft SQL replication are on the protocol list. The design workshop tests your version.',obj:'Does it work with our version? -> The design workshop checks the exact version before anything is decided.'}];
SC.forEach(scen);

// ---- 32 Close
{const s=ns(K+'YOUR NEXT STEP','Your crossing and your next step','Three steps from a crossing on paper to the Gateway in your environment.',
 NOTE('Close on the plan. Start with the Boundary Map: one page listing the crossings that matter to the customer. Then the working session in their environment, then the design workshop where the rules are mapped to FlowRule. Ask for the four prerequisites by name. Say the one-line summary, set the date, stop.','Prerequisites: an Active Directory service account, the address of the sandbox, a syslog target, the address of an OPC server.'),{});
 const S=[['1','Boundary Map','List your crossings and choose the first one'],['2','Working session','See it run on your own systems'],['3','Design workshop','Map your rules to FlowRule']];const names=[];
 S.forEach((st,k)=>{const x=0.9+k*4.0;s.addShape(pres.ShapeType.ellipse,{x,y:2.15,w:0.9,h:0.9,fill:{color:GOLD},line:{color:GOLD,width:1},objectName:'c'+k});T(s,st[0],{x,y:2.15,w:0.9,h:0.9,fontSize:28,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'cn'+k});
  T(s,st[1],{x:x+1.1,y:2.15,w:2.7,h:0.5,fontSize:22,bold:true,objectName:'ct'+k});T(s,st[2],{x:x+1.1,y:2.7,w:2.7,h:0.9,fontSize:14,color:MU,valign:'top',objectName:'cd'+k});names.push(['c'+k,'cn'+k,'ct'+k,'cd'+k]);});
 s.addShape(pres.ShapeType.roundRect,{x:0.9,y:3.75,w:11.6,h:1.05,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'pre'});
 T(s,[{text:'WHAT WE NEED FROM YOU   ',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2,breakLine:true}},{text:'An Active Directory service account, the address of your sandbox, a syslog target and the address of an OPC server.',options:{fontSize:15,color:STEEL}}],{x:1.2,y:3.75,w:11.0,h:1.05,valign:'middle',objectName:'pret'});names.push(['pre','pret']);
 s.addShape(pres.ShapeType.roundRect,{x:0.9,y:5.0,w:11.6,h:0.95,fill:{color:CARD},line:{color:GOLD,width:1.5},rectRadius:0.1,objectName:'sum'});
 T(s,[{text:'Control every crossing.  ',options:{bold:true,color:GOLD,fontSize:18}},{text:'Hardware decides the direction. Rules decide what may pass. Inspection looks inside every file.',options:{fontSize:16}}],{x:1.2,y:5.0,w:11.0,h:0.95,valign:'middle',objectName:'sumt'});names.push(['sum','sumt']);
 s.addShape(pres.ShapeType.roundRect,{x:0.9,y:6.1,w:11.6,h:0.75,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.1,objectName:'nm'});
 T(s,'Next meeting: [date]. We agree the first crossing and the scope of the working session.',{x:1.2,y:6.1,w:11.0,h:0.75,fontSize:18,bold:true,color:'0B0D10',valign:'middle',objectName:'nmt'});names.push(['nm','nmt']);
 cl(N,names);}
pres.writeFile({fileName:path.join(__dirname,'raw.pptx')}).then(()=>{fs.writeFileSync(path.join(__dirname,'builds.json'),JSON.stringify(builds));console.log('slides',N);});
