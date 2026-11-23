// ---- 14 Protocols (static)
{const s=ns(K+'PROTOCOLS','HTTP/S, RDP and SSH, bridged by the same two modules','Each protocol is ended at the SM and rebuilt at the CM.',
 NOTE('Three protocols, one mechanism. Say what each is used for, then move on. The detail follows on the next slides.','The protocol list on the slide is the full list.','Do you support another protocol? -> Tell us what you need and we check it with you.'));
 cards(s,[{t:'HTTP/S',d:'Web applications and APIs. The query and the response are inspected, and can be rewritten and validated.'},{t:'RDP',d:'Remote desktop. The session is rebuilt on the other side, and each virtual channel has its own policy.'},{t:'SSH',d:'Command-line access to servers and devices, through the same two modules.'}],{x:0.7,y:2.1,w:11.9,h:3.8,cols:3,p:'pr',tf:30,df:17});
 killer(s,'One mechanism for every protocol: end it, rebuild it.',0.7,6.1,11.9,'k');}
// ---- 15 HTTP/S inspect
{const s=ns(K+'HTTP/S','Every query and every response is inspected','Not forwarded: inspected, and rebuilt on the other side.',
 NOTE('Show one request through the broker. The query is inspected at the SM, the request is rebuilt by the CM, the response is inspected on the way back.','Inspection happens on query and response.'));
 const names=[];const X=[[0.7,'Client','sends a query'],[3.5,'SM','inspects the query'],[6.3,'CM','rebuilds the request'],[9.1,'Service','answers']];
 X.forEach((b,i)=>{names.push(box(s,b[0],2.2,2.5,1.3,b[1],b[2],'h'+i,{line:i==1||i==2?GOLD:'2A2F36',lw:i==1||i==2?1.75:1.25}));if(i<3){arrow(s,b[0]+2.52,2.85,0.26,'ha'+i);names.push(['ha'+i]);}});
 names.push(box(s,3.5,3.9,5.3,0.7,'Response comes back the same way, and is inspected too',null,'hb',{line:'F5F7FA',fs:14}));
 names.push(...rowsR(s,[['Query','Inspected before anything is rebuilt.'],['Response','Inspected before it reaches the user.']],0.7,4.75,11.9,0.72,'r',15));
 names.push(killer(s,'Inspected, not forwarded.',0.7,6.15,11.9,'k',0.7));cl(N,names);}
// ---- 16 Rewrite
{const s=ns(K+'HTTP/S','Headers and bodies can be rewritten on the way','Strip a server banner. Mask a field.',
 NOTE('Header and body modification on the request and on the response. Show before and after with one header. The entries are samples.','Rewriting applies to requests and responses.'));
 const names=[];const L=[['Server: WebServer 2.4.1',0],['X-Powered-By: Framework 7',0],['Account: 4821 0043 7710',0],['Status: 200 OK',1]];
 const R=[['Server: removed',0],['X-Powered-By: removed',0],['Account: **** **** 7710',0],['Status: 200 OK',1]];
 [[0.7,'ORIGINAL RESPONSE (SAMPLE ENTRIES)',L,'8FA0B3'],[6.9,'AFTER THE BROKER',R,GOLD]].forEach((p,k)=>{s.addShape(pres.ShapeType.roundRect,{x:p[0],y:2.1,w:5.7,h:2.9,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'d'+k});T(s,p[1],{x:p[0]+0.25,y:2.22,w:5.2,h:0.3,fontSize:12,bold:true,color:p[3],charSpacing:2,objectName:'dh'+k});
  p[2].forEach((r,i)=>{const y=2.65+i*0.55,ch=k==1&&!r[1];s.addShape(pres.ShapeType.roundRect,{x:p[0]+0.2,y,w:5.3,h:0.45,fill:{color:ch?'1A1608':'10141A'},line:{color:ch?GOLD:'2A2F36',width:ch?1.5:1},rectRadius:0.05,objectName:'dr'+k+i});T(s,r[0],{x:p[0]+0.4,y,w:4.9,h:0.45,fontSize:14,color:ch?GOLD:STEEL,bold:ch,valign:'middle',objectName:'drt'+k+i});});});
 arrow(s,6.4,3.55,0.45,'dar');
 names.push(['d0','dh0',...[0,1,2,3].flatMap(i=>['dr0'+i,'drt0'+i])],['dar'],['d1','dh1',...[0,1,2,3].flatMap(i=>['dr1'+i,'drt1'+i])]);
 names.push(...rowsR(s,[['Headers and bodies','Rewritten on requests and on responses, by your policy.']],0.7,5.25,11.9,0.8,'r',15));
 names.push(killer(s,'Your policy decides what the other side sees.',0.7,6.15,11.9,'k',0.7));cl(N,names);}
// ---- 17 Schema
{const s=ns(K+'HTTP/S','Schema validation: malformed requests never arrive','A request that breaks the schema stops at the broker.',
 NOTE('Show one valid and one invalid request. The invalid one never reaches the target.','The schema is the one you provide for the application.','Where does the schema come from? -> From your application. We use yours.'));
 const names=[];
 names.push(box(s,0.7,2.2,3.0,1.1,'Valid request','matches the schema','v1',{line:GOLD,lw:1.75}));arrow(s,3.75,2.75,1.0,'va');names.push(box(s,4.8,2.2,2.4,1.1,'Broker','schema gate','v2',{line:GOLD,lw:1.75}));arrow(s,7.25,2.75,1.0,'vb');names.push(box(s,8.3,2.2,3.0,1.1,'Target','receives it','v3',{}));names.push(['va','vb']);
 names.push(box(s,0.7,3.75,3.0,1.1,'Malformed request','breaks the schema','m1',{line:RED,lw:1.75}));arrow(s,3.75,4.3,1.0,'ma',RED);names.push(box(s,4.8,3.75,2.4,1.1,'Broker','stops it here','m2',{line:RED,lw:1.75}));names.push(['ma']);
 T(s,'Nothing reaches the target',{x:7.5,y:3.75,w:4.8,h:1.1,fontSize:16,bold:true,color:RED,valign:'middle',objectName:'mt'});names.push(['mt']);
 names.push(killer(s,'The target never sees a request that breaks the schema.',0.7,5.4,11.9,'k'));cl(N,names);}
// ---- 18 Logging
{const s=ns(K+'EVIDENCE','Every transaction is logged and reaches your SIEM','Who did what, through which protocol, and with what result.',
 NOTE('Show the log fields, then the event in a SIEM. This is the evidence moment. The entries are samples.','Log entries leave in a format your SIEM reads, such as CEF.','Does it reach our SIEM? -> Events are forwarded to your SIEM.'));
 const hdr=['Time','Session','Protocol','Action','Result'].map(t=>({text:t,options:{bold:true,color:GOLD,fill:{color:CARD},fontSize:13}}));
 const R=[['09:14:02','S-0417','HTTP/S','GET /status','Allowed'],['09:14:09','S-0417','HTTP/S','POST /config','Blocked: schema'],['09:20:31','S-0418','RDP','Clipboard paste','Blocked'],['09:21:05','S-0418','RDP','File transfer','Scanned'],['09:30:44','S-0419','SSH','Session start','Allowed']].map(r=>r.map(t=>({text:t,options:{color:STEEL,fontSize:13,fill:{color:'10141A'}}})));
 s.addTable([hdr,...R],{x:0.7,y:2.05,w:8.2,colW:[1.1,1.1,1.2,2.1,2.7],rowH:0.5,fontFace:F,border:{type:'solid',pt:0.75,color:'2A2F36'},margin:[0,0.12,0,0.12],valign:'middle',objectName:'logT'});
 T(s,'SAMPLE ENTRIES',{x:0.7,y:5.15,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 const names=[];names.push(box(s,9.3,2.05,3.3,1.5,'Your SIEM','events in CEF','siem',{line:GOLD,lw:1.75}));names.push(box(s,9.3,3.85,3.3,1.3,'Syslog','forwarded as it happens','sys',{}));
 names.push(killer(s,'Every transaction is on record.',0.7,5.75,11.9,'k'));cl(N,names);}
// ---- 19 RDP rebuilt
{const s=ns(K+'RDP','How the RDP session is rebuilt on the other side','What passes and what stops is decided by policy.',
 NOTE('The RDP session ends at the SM and is rebuilt by the CM. What passes and what stops is decided per feature by policy. This is the architecture slide; the next slides take the features one by one.','Each remote desktop feature has its own policy.'));
 const names=[];names.push(box(s,0.7,2.2,2.7,1.5,'Remote desktop client','the user\'s session','r1',{line:BL.Corp}));names.push(box(s,3.9,2.2,2.4,1.5,'SM','session ends here','r2',{line:GOLD,lw:1.75}));names.push(box(s,6.8,2.2,2.4,1.5,'CM','session rebuilt here','r3',{line:GOLD,lw:1.75}));names.push(box(s,9.7,2.2,2.9,1.5,'Target system','the desktop being reached','r4',{line:BL.Cls}));
 [[3.43],[6.33],[9.23]].forEach((a,i)=>{arrow(s,a[0],2.95,0.45,'ra'+i);names.push(['ra'+i]);});
 names.push(...rowsR(s,[['What passes','Features you allow, by policy.'],['What stops','Features you block. Nothing is on by default.']],0.7,4.2,11.9,1.0,'r',15));
 names.push(killer(s,'Each feature passes or stops by your policy.',0.7,6.0,11.9,'k'));cl(N,names);}
// ---- 20 Virtual channels (static table)
{const s=ns(K+'RDP','Virtual channels, one by one','Each virtual channel has its own policy.',
 NOTE('Walk the table. Each channel has its own policy, so a session can allow sound and block the clipboard. The policies shown are samples. Show the policy screen in the working session.','Clipboard, file transfer, printer, microphone, sound and removable media mount each have their own policy.','Can we block everything except the screen? -> Yes. Each channel is switched by policy.'));
 const hdr=['Channel','Sample policy'].map(t=>({text:t,options:{bold:true,color:GOLD,fill:{color:CARD},fontSize:14}}));
 const R=[['Clipboard','Copy from remote allowed. Paste into remote blocked.'],['File transfer','Allowed after file type, AV and sandbox checks.'],['Printer','Blocked.'],['Microphone','Blocked.'],['Sound','Allowed.'],['Removable media mount','Blocked.']].map(r=>[{text:r[0],options:{bold:true,color:TX,fontSize:15,fill:{color:'10141A'}}},{text:r[1],options:{color:/Blocked\.$/.test(r[1])&&r[1]==='Blocked.'?MU:STEEL,fontSize:15,fill:{color:'10141A'}}}]);
 s.addTable([hdr,...R],{x:0.7,y:2.05,w:11.9,colW:[3.6,8.3],rowH:0.52,fontFace:F,border:{type:'solid',pt:0.75,color:'2A2F36'},margin:[0,0.12,0,0.12],valign:'middle',objectName:'chT'});
 T(s,'SAMPLE POLICY',{x:0.7,y:5.85,w:4,h:0.3,fontSize:12,bold:true,color:MU,charSpacing:2,objectName:'samp'});
 killer(s,'You decide, channel by channel, what the session can do.',0.7,6.2,11.9,'k',0.65);}
// ---- 21 Clipboard
{const s=ns(K+'RDP','Clipboard control by direction','Allow, block or restrict, one direction at a time.',
 NOTE('Copy from remote is allowed. Paste into remote is blocked. Show it live in the working session. The policy is a sample.','The clipboard has its own policy for each direction.'));
 const names=[];names.push(box(s,0.7,2.3,3.6,2.0,'User\'s desktop','the local side','c1',{line:BL.Corp}));names.push(box(s,9.0,2.3,3.6,2.0,'Remote system','the system being reached','c2',{line:BL.Cls}));
 s.addShape(pres.ShapeType.line,{x:4.6,y:2.9,w:4.1,h:0,line:{color:GOLD,width:3.5,beginArrowType:'triangle'},objectName:'cb1'});T(s,'Copy from remote: allowed',{x:4.6,y:2.4,w:4.1,h:0.4,fontSize:14,bold:true,color:GOLD,align:'center',objectName:'cl1'});
 arrow(s,4.6,3.8,4.1,'cb2',GREY,'dash');T(s,'X',{x:6.4,y:3.6,w:0.5,h:0.4,fontSize:20,bold:true,color:RED,align:'center',valign:'middle',objectName:'cx'});T(s,'Paste into remote: blocked',{x:4.6,y:4.0,w:4.1,h:0.4,fontSize:14,bold:true,color:GREY,align:'center',objectName:'cl2'});
 names.push(['cb1','cl1'],['cb2','cx','cl2']);
 names.push(...rowsR(s,[['Sample policy','Copy from remote allowed, paste into remote blocked. You can set each direction on its own.']],0.7,4.75,11.9,0.9,'r',15));
 names.push(killer(s,'You choose the direction for each action.',0.7,6.0,11.9,'k'));cl(N,names);}
