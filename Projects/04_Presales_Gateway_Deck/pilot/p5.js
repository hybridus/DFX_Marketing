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
