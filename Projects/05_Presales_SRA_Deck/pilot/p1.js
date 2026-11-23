const SKIP=['OUTBOUND GATEWAY','INBOUND GATEWAY'];
function sl(o){const s=ns(K+o.k,o.t,o.m,o.note,{fs:o.fs});const P=scene(s,o.sc,0.1,1.9,8.2,5.1);bcap(s,P,'b',SKIP.concat(o.skip||[]));const names=[];
 (o.marks||[]).forEach((m,i)=>{const [mx,my]=P(m[0],0,-0.05);s.addShape(pres.ShapeType.ellipse,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fill:{color:m[2]||GOLD},line:{color:'0B0D10',width:1.5},objectName:'mk'+i});T(s,m[1],{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'mkt'+i});});
 rowsR(s,o.rows,8.5,2.0,4.1,o.pitch||1.15,'r',o.rfs||14).forEach(r=>names.push(r));
 if(o.kill)names.push(killer(s,o.kill,8.5,5.75,4.1,'k',1.15));cl(N,names);return s;}
// ---- 1 Cover
{N++;const s=pres.addSlide();s.background={color:BG};
 s.addImage({path:path.join(ST,'sra_core.png'),x:5.2,y:1.6,w:7.9,h:5.12,objectName:'coverScene',altText:'DFX Secure Remote Access between two networks'});
 s.addImage({path:LOGO,x:0.7,y:0.7,w:3.2,h:0.696,objectName:'logo',altText:'DataFlowX'});
 T(s,'Control the Flow',{x:0.7,y:2.3,w:4.8,h:1.8,fontSize:54,bold:true,color:GOLD,valign:'top',objectName:'Title'});
 T(s,'DFX Secure Remote Access',{x:0.7,y:4.2,w:5.8,h:0.6,fontSize:26,bold:true,valign:'top',objectName:'Subtitle'});
 T(s,'Technical Sales Presentation',{x:0.7,y:4.8,w:5.6,h:0.4,fontSize:18,color:STEEL,valign:'top',objectName:'Kind'});
 T(s,'Remote access to isolated networks with no connection between them',{x:0.7,y:5.4,w:4.4,h:0.9,fontSize:16,color:MU,valign:'top',objectName:'Tagline'});
 T(s,'Presenter  |  Company  |  Date',{x:0.7,y:6.7,w:8,h:0.4,fontSize:12,color:MU,objectName:'meta'});
 s.addNotes(NOTE('Welcome. In this session you see how a user can work on a system in another network while no connection exists between the two networks. Ask which remote access they use today and who uses it: vendors, administrators, partners. It sets the examples you use.','Nothing to prove yet. The proof starts on the next slide.'));}
// ---- 2 Hero
sl({k:'REMOTE ACCESS WITHOUT A ROUTE',t:'Remote access with no route between the networks',m:'A user works on a system in another network. No connection exists between the two networks at any time.',sc:'sra_core',
 note:NOTE('Start with the user on one network and the application on the other. Ask: where is the connection? Let the silence work. Then say the line: no route exists between the two networks at any time. Only then name the two appliances.','The link map on slide 7 shows every link, and each one is one-way.','We already have a VPN. -> A VPN joins the networks. This keeps them apart.'),
 rows:[['The problem','A normal remote path is a route. If the route exists, an attacker can use it as well.'],['What changes','Two appliances, one in each network. The session ends at the first and is rebuilt by the second.'],['What you get','Users keep working in their normal way. Nothing connects the two networks.']],kill:'No route exists between the two networks at any time.'});
// ---- 3 Not a firewall
{const s=ns(K+'WHAT IT IS NOT','It is not a firewall, VPN, proxy, jump host or tunnel','It is a protocol-breaking broker built from two appliances, one in each network.',
 NOTE('Five negatives, one positive. Say each negative once. The positive: two appliances, one in each network, and no packet crosses intact. Do not call it a proxy at any point.','No end-to-end route, NAT, tunnel or proxy path exists between the networks.','How is this different from a jump host? -> No host sits between the networks. Each side is terminated and rebuilt.'));
 const items=[['Firewall','Filters a path that still exists.'],['VPN','Joins the two networks.'],['Proxy','Relays the original connection.'],['Jump host','Has a foot in both networks.'],['Tunnel','Carries the original connection across.']];const names=[];
 const C=cards(s,items.map(i=>({t:i[0],d:i[1]})),{x:0.7,y:2.05,w:11.9,h:1.9,cols:5,p:'n',tf:19,df:14});C.forEach((c,i)=>{const w=(11.9-4*0.25)/5,x=0.7+i*(w+0.25);s.addShape(pres.ShapeType.line,{x:x+0.2,y:2.05+0.66,w:w-0.4,h:0,line:{color:RED,width:3},objectName:'x'+i});names.push([...c,'x'+i]);});
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:4.3,w:11.9,h:1.6,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.1,objectName:'pos'});
 T(s,[{text:'DFX SECURE REMOTE ACCESS',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2,breakLine:true}},{text:'Two appliances, one in each network.',options:{bold:true,fontSize:22,breakLine:true}},{text:'The protocol is terminated at the first and rebuilt at the second, so no packet crosses intact.',options:{fontSize:16,color:STEEL}}],{x:1.0,y:4.3,w:11.3,h:1.6,valign:'middle',objectName:'post'});names.push(['pos','post']);
 names.push(killer(s,'No host sits between the networks.',0.7,6.1,11.9,'k'));cl(N,names);}
// ---- 4 Two modules
sl({k:'TWO MODULES',t:'Two modules, one in each network',m:'The Server Module sits with the user. The Client Module sits with the system being reached.',sc:'sra_core',
 note:NOTE('Introduce both modules. SM faces the user\'s application. CM faces the target. Define SM and CM once and keep the abbreviations.','The two modules and the four one-way units are the whole product. All connections between SM or CM and the TX or RX units are physically one way.'),
 rows:[['Server Module (SM)','In the network of the source application. It receives the user\'s session and starts everything that follows.'],['Client Module (CM)','In the network of the target application. It answers the SM and speaks to the target.'],['Between them','Two one-way gateways. Every link between a module and a unit is physically one way.']]});
// ---- 5 SM only initiator
sl({k:'THE SERVER MODULE',t:'The Server Module is the only initiator',m:'It ends the user\'s connection, turns it into payload and later answers the source application.',sc:'sra_core',
 note:NOTE('Four verbs: terminates, translates, emits, matches. Once the SM receives the request, TCP/IP is broken there. The SM pushes the payload through a physical unidirectional diode interface to the TX unit of the gateway. It is the only part of the system that initiates anything.','The source connection ends at the SM and goes no further.'),
 rows:[['Terminates','TCP/IP ends here. The user\'s connection is broken at the SM.'],['Translates','The request becomes plain payload.'],['Emits','The payload is pushed through a physical one-way diode interface to the TX unit.'],['Matches','The returning response is matched to its request and answered to the source.']],pitch:0.88,kill:'The SM is the only part of the system that initiates anything.'});
// ---- 6 CM cannot
sl({k:'THE CLIENT MODULE',t:'The Client Module cannot initiate, discover or choose a target',m:'It raises a request only to a predefined target, using only the payload the SM delivered.',sc:'sra_core',
 note:NOTE('Three negatives: it cannot start traffic, it cannot discover, it cannot address anything outside its predefined list. This is the answer to the question: what can the target side do?','The CM works from a predefined list and from delivered payload only.','Can the CM scan my target network? -> No. It cannot discover and it cannot address anything outside its predefined list.'),
 rows:[['Cannot start traffic','No request leaves the CM until payload arrives from the SM.'],['Cannot discover','It does not look for systems.'],['Cannot choose','It addresses only the targets on its predefined list.']],pitch:1.15,kill:'The CM only answers, and only to targets you defined.'});
