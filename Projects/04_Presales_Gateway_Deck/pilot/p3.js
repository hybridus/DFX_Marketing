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
 NOTE('Read the names, not the descriptions. The audience will find their own protocol. If it is not here, say it is assessed in the design workshop; do not promise it. ICCP is the one utilities ask about first: control-centre to control-centre exchange. The direction is always the same: from the plant to the network that needs the data. This slide has no builds, so the audience can copy the list.','Protocol list from the product documentation.','Our protocol is not on the list. -> We assess it in the design workshop before you decide anything.'));
 const C=cards(s,[{t:'OPC UA and DA',d:'Plant data and tags from OPC servers.',hi:true},{t:'DNP3',d:'Telemetry from utility systems.'},{t:'ICCP',d:'Data exchange between control centres.',hi:true},{t:'AVEVA PI',d:'Historian data from AVEVA PI.'},{t:'IEC 104',d:'Telecontrol in power systems.'},{t:'AMQP',d:'Message queues between systems.'},{t:'MQTT',d:'Telemetry from devices and sensors.'},{t:'Another protocol?',d:'We assess it in the design workshop.'}],{x:0.7,y:2.05,w:11.9,h:3.75,cols:4,p:'k',tf:18,df:14});
 const names=[...C];names.push(strip(s,'Data crosses one way, from the plant to the network that needs it.',6.05,'q'));}

// ---- 19 IT protocols
{const s=ns(K+'PROTOCOLS: IT','The IT protocols behind everyday transfers','Files, mail, logs, time, streams and databases cross in their own formats.',
 NOTE('Same as the OT slide: read the names. Syslog is the quiet one that sells itself, because every customer has logs they would like in one place. Oracle and Microsoft SQL replication is the one for backup and reporting copies. This slide has no builds, so the audience can copy the list. RDP streaming sends the screen of a session one way.','Protocol list from the product documentation.','Our protocol is not on the list. -> We assess it in the design workshop before you decide anything.'));
 const C=cards(s,[{t:'SMTP',d:'Mail and alerts'},{t:'SFTP',d:'Secure file transfer'},{t:'HTTP',d:'Web and API traffic'},{t:'UDP',d:'Streams and datagrams'},{t:'SNMP',d:'Device status'},{t:'NTP',d:'Time from your server'},{t:'Syslog',d:'Logs from devices',hi:true},{t:'Kafka',d:'Event streams'},{t:'RDP streaming',d:'Remote session view'},{t:'Oracle replication',d:'Database copy, one way',hi:true},{t:'Microsoft SQL replication',d:'Database copy, one way',hi:true},{t:'Another protocol?',d:'Ask us about others'}],{x:0.7,y:2.05,w:11.9,h:4.6,cols:4,p:'k',tf:17,df:13,gap:0.2});}

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
