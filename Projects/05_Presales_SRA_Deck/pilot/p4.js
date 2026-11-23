// ---- 22 File transfer
{const s=ns(K+'RDP','File transfer is checked inside the session','File type, anti-malware and sandbox checks apply to every file that crosses.',
 NOTE('A file crosses the session boundary through three checks: file type, anti-malware and sandbox. These are the same kinds of checks the Gateway uses.','Checks apply inside the session, to files in either direction that your policy allows.','Do we need a separate sandbox? -> No. Use the one you already run, or ours.'));
 const names=[];names.push(box(s,0.7,2.3,2.6,1.4,'File','in the remote session','f1',{}));
 [['File type','is it what it claims to be'],['Anti-malware','TruScope Anti Malware Engine'],['Sandbox','your sandbox or ours']].forEach((c,i)=>{const x=3.9+i*2.9;arrow(s,x-0.55,3.0,0.5,'fa'+i);names.push(box(s,x,2.3,2.5,1.4,c[0],c[1],'fc'+i,{line:GOLD,lw:1.75}));names.push(['fa'+i]);});
 arrow(s,12.1,3.0,0.5,'fz');names.push(['fz']);
 names.push(...rowsR(s,[['Clean file','Crosses, and the transfer is logged.'],['A check fails','Your policy decides what happens to the file.']],0.7,4.2,11.9,1.0,'r',15));
 names.push(killer(s,'Every file that crosses has been checked.',0.7,6.05,11.9,'k'));cl(N,names);}
// ---- 23 Recording
{const s=ns(K+'EVIDENCE','Every session is recorded and can be replayed','Search a session, jump to the moment that matters, and play it back.',
 NOTE('Replay a session in the working session. Show the search, then jump to a clipboard event and a file event. The session shown is a sample.','Sessions are recorded, searchable and replayable.','How long do you keep recordings? -> You set the retention.'));
 const names=[];s.addShape(pres.ShapeType.roundRect,{x:0.7,y:2.1,w:8.0,h:3.0,fill:{color:CARD},line:{color:'2A2F36',width:1.25},rectRadius:0.1,objectName:'rp'});
 T(s,'SESSION REPLAY (SAMPLE ENTRIES)',{x:0.95,y:2.2,w:7.5,h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:2,objectName:'rph'});
 s.addShape(pres.ShapeType.roundRect,{x:0.95,y:2.65,w:7.5,h:1.5,fill:{color:'0E131A'},line:{color:'2A2F36',width:1},rectRadius:0.06,objectName:'rpv'});T(s,'Recorded remote desktop',{x:0.95,y:2.65,w:7.5,h:1.5,fontSize:16,color:MU,align:'center',valign:'middle',objectName:'rpvt'});
 s.addShape(pres.ShapeType.line,{x:1.1,y:4.6,w:7.2,h:0,line:{color:GREY,width:3},objectName:'tl'});
 [[2.4,'Clipboard'],[4.6,'File transfer'],[6.7,'Session end']].forEach((m,i)=>{s.addShape(pres.ShapeType.ellipse,{x:m[0]-0.11,y:4.49,w:0.22,h:0.22,fill:{color:GOLD},line:{color:'0B0D10',width:1},objectName:'tm'+i});T(s,m[1],{x:m[0]-0.8,y:4.75,w:1.6,h:0.3,fontSize:12,bold:true,color:STEEL,align:'center',objectName:'tmt'+i});});
 names.push(...rowsR(s,[['Search','Find a session by user, system or event.'],['Replay','Play it back from any marker.'],['Evidence','Clipboard and file events are marked on the timeline.']],9.1,2.1,3.5,1.0,'r',14));
 names.push(killer(s,'You can show exactly what happened in any session.',0.7,5.5,11.9,'k'));cl(N,names);}
// ---- 24 SSH
sl({k:'SSH',t:'SSH access to servers and devices, with no route to them',m:'The same two modules: the session ends at the SM and is rebuilt by the CM.',sc:'sra_priv',
 note:NOTE('SSH uses the same mechanism as every other protocol. The administrator\'s session ends at the SM, the CM rebuilds it towards the server or device. Nothing joins the administrator\'s network and the target network. Do not add SSH features that are not on the supported list.','SSH is on the supported protocol list.','Do you record SSH sessions? -> We check it with you. Recording is shown for the RDP session.'),
 skip:['ISOLATED HOST'],rows:[['What the administrator does','Opens an SSH session to the SM, in the normal way.'],['What the target sees','A new SSH session from the Client Module.'],['What does not exist','A network path between the administrator and the target.']],pitch:1.15});
// ---- 25 Attacker
{const s=ns(K+'WHAT AN ATTACKER HAS TO BEAT','Each attack path meets a control in this product','One row, one control.',
 NOTE('Read three rows and point to the rest. Each row names what the attacker does, not what staff do.','Each control is shown on its own slide in this deck.','Is anything not covered? -> We check it with you. This table is the full claim.'));
 const hdr=['Attack path','What stops it'].map(t=>({text:t,options:{bold:true,color:GOLD,fill:{color:CARD},fontSize:14}}));
 const R=[['Malicious data transfer through the clipboard','Clipboard policy, by direction'],['Malicious file in a transfer','File type, anti-malware and sandbox checks'],['Command and control from the target side','The CM cannot start traffic'],['Scanning the target network','The CM cannot discover'],['Malformed request','Schema validation at the broker'],['Reaching back into the user\'s network','One-way gateways, enforced in hardware']].map(r=>[{text:r[0],options:{color:STEEL,fontSize:15,fill:{color:'10141A'}}},{text:r[1],options:{color:TX,bold:true,fontSize:15,fill:{color:'10141A'}}}]);
 s.addTable([hdr,...R],{x:0.7,y:2.05,w:11.9,colW:[5.9,6.0],rowH:0.55,fontFace:F,border:{type:'solid',pt:0.75,color:'2A2F36'},margin:[0,0.12,0,0.12],valign:'middle',objectName:'atT'});
 killer(s,'Every attack path has a named control.',0.7,6.15,11.9,'k',0.7);}
// ---- 26 Assurance
{const s=ns(K+'INDEPENDENT ASSURANCE','Independent assurance: Common Criteria EAL4+','DFX Secure Remote Access holds Common Criteria EAL4+.',
 NOTE('Name the product and the certification. State the scope as written. Do not mention any listing that does not exist.','Common Criteria EAL4+ certificates 21.0.03.0.00.0/TSE-CCCS-103 and TSE-CCCS-86.','Is it NIAP listed? -> We make no such claim. We state EAL4+ and the scope.'));
 cards(s,[{t:'Common Criteria EAL4+',d:'Certificates 21.0.03.0.00.0 / TSE-CCCS-103 and TSE-CCCS-86.',hi:true},{t:'Direction in hardware',d:'The gateways enforce direction in hardware, so no setting can reverse it.'}],{x:0.7,y:2.15,w:11.9,h:3.0,cols:2,p:'as',tf:26,df:18});
 killer(s,'The certification is independent. The one-way direction is physical.',0.7,5.5,11.9,'k');}
// ---- scenarios
function scen(c){const s=ns('SCENARIO  |  '+c.kick,c.title,c.msg,NOTE(c.talk+' Buyer: '+c.buyer+'. Typical effort: sized in the trial charter.',c.proof,c.obj),{});const names=[];
 const P=scene(s,c.scene,3.5,2.0,6.3,3.75);
 const card=(x,lbl,txt,col,k)=>{s.addShape(pres.ShapeType.roundRect,{x,y:2.15,w:2.9,h:3.6,fill:{color:CARD},line:{color:col,width:1.5},rectRadius:0.12,objectName:k+'c'});
  T(s,lbl,{x:x+0.22,y:2.32,w:2.5,h:0.3,fontSize:12,bold:true,color:col,charSpacing:3,objectName:k+'l'});T(s,txt,{x:x+0.22,y:2.75,w:2.5,h:2.9,fontSize:15,valign:'top',objectName:k+'t'});return [k+'c',k+'l',k+'t'];};
 names.push(card(0.5,'TODAY',c.before,GREY,'b'));names.push(['scene',...bcap(s,P,'b',SKIP.concat(['ISOLATED HOST']))]);names.push(card(9.93,'WITH SECURE REMOTE ACCESS',c.after,GOLD,'a'));names.push(strip(s,c.cross,6.05,'q'));cl(N,names);}
[{buyer:'Plant manager and the OT security lead, with the vendor manager',kick:'VENDOR MAINTENANCE',title:'Vendor maintenance without a VPN',msg:'A vendor reaches one system, and no network path to it exists.',scene:'sra_vendor',
 before:'A VPN opens a path from the vendor into your plant and keeps it open.',after:'The vendor works on one system through the SM and CM. The session is recorded. Clipboard and files are controlled.',cross:'Typical policy: no paste into the plant, files scanned, every session recorded.',
 talk:'Before: a VPN gives the vendor a path into the plant. After: the vendor opens a session to the SM and works on one host. The session is recorded and the clipboard and files are under your policy. Nothing connects the vendor network to the plant.',proof:'The working session shows a recorded session and a blocked paste.',obj:'The vendor will not change tools. -> They use remote desktop as they do today.'},
 {buyer:'Head of IT or OT operations, with the security team',kick:'PRIVILEGED ACCESS',title:'Privileged access to isolated hosts',msg:'Administrators work on isolated hosts through a recorded session.',scene:'sra_priv',
 before:'Administrators reach isolated hosts through a jump host that touches both networks.',after:'Administrators work through the SM and CM. Every session is recorded. Nothing connects the networks.',cross:'Typical policy: recorded sessions, scanned file transfer, removable media blocked.',
 talk:'Say who is allowed in, what is recorded and what is blocked. Administrators use RDP or SSH as they do today. The recording is the evidence for audit.',proof:'A recorded session is replayed in the working session.',obj:'Our admins need file transfer. -> It is allowed after the checks, if your policy says so.'},
 {buyer:'Application owner and the security architect',kick:'INTERNAL DATA AS AN API',title:'Expose an internal service as an API without a route',msg:'An internal service answers an external request, and no path connects the networks.',scene:'sra_api',
 before:'To answer an external request, the internal service is exposed on a network path.',after:'The request is inspected and rebuilt. The internal service answers it. Requests that break the schema stop at the broker.',cross:'Typical policy: schema validation, header rewrite, every transaction logged.',
 talk:'This is HTTP/S bridging. The external client sends a request to the SM. It is inspected, validated against the schema and rebuilt by the CM for the internal service. The response returns the same way.',proof:'A valid and an invalid request are shown in the working session.',obj:'Will our clients notice? -> They send a normal HTTP/S request.'}].forEach(scen);
// ---- 30 Operations
{const s=ns(K+'OPERATIONS','It joins your estate like the rest of the platform','Sign-in, logging and availability follow what you already run.',
 NOTE('Say what is on the slide: sign-in through Active Directory, logging to your SIEM, and high availability. Failure behaviour is not described on this slide.','Operations features are shown in the trial.','What happens when a node fails? -> We go through it with you in the trial.'));
 cards(s,[{t:'Active Directory',d:'Users sign in with their company account.'},{t:'Logging',d:'Transactions and events are logged and sent to your SIEM and Syslog.'},{t:'High availability',d:'Runs as an active and passive pair.'}],{x:0.7,y:2.1,w:11.9,h:3.6,cols:3,p:'op',tf:24,df:17});
 killer(s,'It fits what you already run.',0.7,6.05,11.9,'k');}
