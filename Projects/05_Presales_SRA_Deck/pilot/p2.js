// ---- 7 Link map
{const s=sl({k:'THE LINK MAP',t:'Each module reaches both one-way units on its own side',m:'Two gateways, one per direction. No chain, and no Ethernet between the boxes.',sc:'sra_core',
 marks:[['fo','1'],['fi','2','F5F7FA']],
 note:NOTE('This is the slide people redraw. Never draw SM to unit to unit to CM as a chain. Each module has two connections on its own side: one send, one receive. Trace gateway 1 in gold, then gateway 2 in white.','Two DFX Unidirectional Gateways, one outbound and one inbound. Every connection between SM or CM and the TX or RX units is physically one way, so TCP/IP cannot continue past the SM or the CM.','Is it Ethernet between the boxes? -> No. Every module-to-unit link is a one-way connection.'),
 rows:[['1  Outbound gateway','SM, TX unit, one fibre, RX unit, CM. Carries the request.'],['2  Inbound gateway','CM, TX unit, one fibre, RX unit, SM. Carries the response.'],['On each side','One send link and one receive link per module. Every one is physically one way.']],pitch:1.15});}
// ---- 8 Two paths
sl({k:'TWO PATHS',t:'Two one-way paths serve one exchange',m:'The request travels on the outbound gateway, the response on the inbound gateway.',sc:'sra_core',marks:[['fo','1'],['fi','2','F5F7FA']],
 note:NOTE('Trace the request on the upper path, then the response on the lower path. One logical exchange, two separate physical paths. Neither is bidirectional.','Direction is enforced in hardware on every link.'),
 rows:[['Request','Left to right on the outbound gateway.'],['Response','Right to left on the inbound gateway.'],['Never shared','The two paths do not share a link. Neither path is bidirectional.']],pitch:1.15,kill:'One logical exchange, two separate physical paths.'});
// ---- 9 Seven steps
{const s=ns(K+'ONE EXCHANGE','One exchange in seven steps','Terminate, translate, send, rebuild, answer, send back, match.',
 NOTE('Walk the sequence slowly once. The source opens a session to the SM. The SM translates and sends. The CM builds a new request to its predefined target. The target answers the CM. The CM sends back. The SM matches the response and answers the source.','Seven steps, two gateways. Latency is measured on your own application pair, so no figure is quoted here.','How long does it take? -> It is measured on your application pair in the trial.'));
 const St=[['Terminate','The source opens a session to the SM.'],['Translate','The SM turns it into payload.'],['Send','Payload crosses on the outbound gateway.'],['Rebuild','The CM builds a new request to its predefined target.'],['Answer','The target answers the CM.'],['Send back','The response crosses on the inbound gateway.'],['Match','The SM matches it and answers the source.']];const names=[];
 const w=1.55,g=0.17;St.forEach((st,i)=>{const x=0.7+i*(w+g),p='q'+i,col=(i==2||i==5)?GOLD:'2A2F36';
  s.addShape(pres.ShapeType.roundRect,{x,y:2.3,w,h:3.0,fill:{color:CARD},line:{color:i==2?GOLD:(i==5?'F5F7FA':'2A2F36'),width:i==2||i==5?1.75:1},rectRadius:0.1,objectName:p+'c'});
  s.addShape(pres.ShapeType.ellipse,{x:x+0.15,y:2.45,w:0.45,h:0.45,fill:{color:GOLD},line:{color:GOLD,width:0.75},objectName:p+'n'});T(s,String(i+1),{x:x+0.15,y:2.45,w:0.45,h:0.45,fontSize:14,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'nt'});
  T(s,st[0],{x:x+0.15,y:3.05,w:w-0.3,h:0.4,fontSize:17,bold:true,color:GOLD,valign:'top',objectName:p+'t'});T(s,st[1],{x:x+0.15,y:3.5,w:w-0.3,h:1.7,fontSize:13,color:STEEL,valign:'top',objectName:p+'d'});names.push([p+'c',p+'n',p+'nt',p+'t',p+'d']);});
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:5.55,w:11.9,h:0.6,fill:{color:'10141A'},line:{color:'2A2F36',width:1},rectRadius:0.08,objectName:'ls'});
 T(s,[{text:'Gold: ',options:{bold:true,color:GOLD}},{text:'outbound gateway (step 3).  ',options:{}},{text:'White: ',options:{bold:true,color:'F5F7FA'}},{text:'inbound gateway (step 6).',options:{}}],{x:0.95,y:5.55,w:11.4,h:0.6,fontSize:14,color:STEEL,valign:'middle',objectName:'lst'});names.push(['ls','lst']);
 names.push(killer(s,'Seven steps, and every one is visible in the log.',0.7,6.25,11.9,'k',0.65));cl(N,names);}
// ---- 10 Broken twice
{const s=ns(K+'NO PACKET CROSSES INTACT','The protocol is broken twice: no packet crosses intact','The connection ends at the SM and a new one begins at the CM.',
 NOTE('Show a packet entering the SM and leaving as payload. Show the payload entering the CM and leaving as a new request. The original packet never appears on the other side.','Termination happens at the SM and again at the CM.','Does the target see the user\'s address? -> No. It sees a new request from the Client Module.'));
 const names=[];const col=['4F8FC9',GOLD,'9B6FD8'];
 const B=[[0.7,'Original request','from the source application',col[0]],[4.95,'Plain payload','nothing of the original packet remains',col[1]],[9.2,'New request','built by the CM for its predefined target',col[2]]];
 B.forEach((b,i)=>{names.push(box(s,b[0],2.25,3.4,1.4,b[1],b[2],'pk'+i,{line:b[3],lw:2}));});
 [['SM',4.15],['CM',8.4]].forEach((a,i)=>{arrow(s,a[1],2.95,0.75,'pa'+i);T(s,a[0],{x:a[1],y:2.4,w:0.75,h:0.3,fontSize:13,bold:true,color:GOLD,align:'center',objectName:'pal'+i});names.push(['pa'+i,'pal'+i]);});
 names.push(...rowsR(s,[['Ends at the SM','TCP/IP is broken here. Only payload moves on, through a physical one-way interface.'],['Begins at the CM','The CM builds a new request. The target sees the Client Module, not the user.']],0.7,4.1,11.9,1.0,'r',15));
 names.push(killer(s,'The original connection never reaches the target.',0.7,6.1,11.9,'k'));cl(N,names);}
// ---- 11 Correlation
{const s=ns(K+'HOW THE ANSWER FINDS ITS WAY BACK','The SM remembers which response belongs to which request','The transport carries no session. The SM holds it, so your application keeps working.',
 NOTE('The transport carries no session. The SM holds each pending request and matches the returning response. That is why the application keeps working. The ledger shown is made of sample entries.','Correlation lives in SM state, not in the transport.'));
 const names=[];s.addShape(pres.ShapeType.roundRect,{x:0.7,y:2.1,w:6.2,h:3.7,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'led'});
 T(s,'SM: PENDING REQUESTS (SAMPLE ENTRIES)',{x:0.95,y:2.22,w:5.7,h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:'ledh'});
 const rows=[['Request 1','waiting'],['Request 2','waiting'],['Request 3','response arrived: matched'],['Request 4','waiting']];
 rows.forEach((r,i)=>{const y=2.7+i*0.72,m=i==2;s.addShape(pres.ShapeType.roundRect,{x:0.95,y,w:5.7,h:0.58,fill:{color:m?'1A1608':'10141A'},line:{color:m?GOLD:'2A2F36',width:m?1.75:1},rectRadius:0.06,objectName:'lr'+i});T(s,[{text:r[0]+'   ',options:{bold:true,color:m?GOLD:TX}},{text:r[1],options:{color:m?TX:STEEL}}],{x:1.15,y,w:5.3,h:0.58,fontSize:15,valign:'middle',objectName:'lrt'+i});});
 names.push(...rowsR(s,[['Holds','The SM keeps each pending request.'],['Matches','A returning payload pairs with its request and the answer goes to the source.'],['Transport','The one-way links carry no session state.']],7.3,2.1,5.3,1.2,'r',14));
 names.push(killer(s,'The application keeps working because the SM does the matching.',0.7,6.05,11.9,'k'));cl(N,names);}
// ---- 12 App unchanged
{const s=ns(K+'NO CHANGE TO YOUR APPLICATIONS','Your application keeps its normal mode of operation','No change to the source or the target application is required.',
 NOTE('Use one real example: an agent reporting to a central platform over TLS. It sees a normal request and response. Nothing changes for either application.','No reconfiguration of the source or the target application is needed.','Do we have to change our apps? -> No change to source or target is required.'));
 const names=[];names.push(box(s,0.7,2.4,3.2,1.5,'Agent','source application','a1',{line:BL.Corp}));names.push(box(s,5.05,2.4,3.2,1.5,'DFX Secure Remote Access','SM and CM','a2',{line:GOLD,lw:2}));names.push(box(s,9.4,2.4,3.2,1.5,'Central platform','target application','a3',{line:BL.Cls}));
 arrow(s,3.95,3.15,1.05,'ar1');arrow(s,8.3,3.15,1.05,'ar2');names.push(['ar1','ar2']);
 names.push(pill(s,1.7,4.1,1.2,'TLS','p1'),pill(s,10.4,4.1,1.2,'TLS','p2'));
 names.push(...rowsR(s,[['What the agent sees','A normal request and a normal response.'],['What the platform sees','A normal request from the Client Module.']],0.7,4.7,11.9,0.72,'r',15));
 names.push(killer(s,'Nothing changes for either application.',0.7,6.15,11.9,'k',0.7));cl(N,names);}
// ---- 13 Either side
{const s=ns(K+'SESSIONS FROM EITHER NETWORK','A session can start from either network','Two broker sets share the same one-way units. Every link stays one way.',
 NOTE('Only when asked about two-way initiation. Two broker sets share the same one-way units. Each module still reaches only the units on its own side. In each set the SM is the only initiator.','Direction is enforced in hardware on every link.'));
 const names=[];
 [['Sessions that start in network A','SM in A  to  CM in B',2.15,GOLD],['Sessions that start in network B','SM in B  to  CM in A',3.65,'F5F7FA']].forEach((l,i)=>{const y=l[2];
  names.push(box(s,0.7,y,3.9,1.2,l[0],null,'l'+i,{line:l[3],lw:1.75,fs:16}));names.push(box(s,4.9,y,3.9,1.2,'One-way gateways','shared by both sets','m'+i,{}));names.push(box(s,9.1,y,3.5,1.2,l[1],null,'n'+i,{line:l[3],lw:1.75,fs:15}));
  arrow(s,4.62,y+0.6,0.26,'e'+i,l[3]);arrow(s,8.82,y+0.6,0.26,'f'+i,l[3]);names.push(['e'+i,'f'+i]);});
 names.push(...rowsR(s,[['Each module','Reaches only the units on its own side.'],['Each set','Has one initiator: the SM of that set.']],0.7,4.95,11.9,0.62,'r',15));
 names.push(killer(s,'Either network can start a session. Every link stays one way.',0.7,6.15,11.9,'k',0.7));cl(N,names);}
