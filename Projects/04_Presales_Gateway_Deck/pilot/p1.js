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
