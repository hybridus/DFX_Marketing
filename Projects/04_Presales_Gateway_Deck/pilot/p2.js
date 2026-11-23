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
 names.push(dot(s,P,'req','1','m1',0,-0.3));names.push(dot(s,P,'ad','2','m2',0,-0.3));names.push(dot(s,P,'appr','3','m3',0,-0.3));
 names.push(...rowsR(s,[['1  The requester','Sends a file that needs a decision. It is suspended before it crosses.'],['2  Active Directory','Approver groups come from the directory. Nothing new to maintain.'],['3  The approver','The decision and the person are written to the transfer log.']],8.5,2.0,4.3,1.3,'r',14));
 names.push(killer(s,'Your org chart decides who approves.',0.7,6.05,11.9,'k'));
 cl(N,[['scene'],...names]);}

// ---- 14 Own sandbox and CDR
{const s=ns(K+'YOUR TOOLS','Bring your own sandbox and CDR engine','Keep what you run today. The gateway calls it and waits for the verdict.',
 NOTE('This answers the first objection in every IT meeting: we already have a sandbox. Keep it. The gateway sends the file to it and waits. Our own DFX Malware Mitigation Sandbox and DFX TruCDR are there if you want them. Do not say which is better; say that the policy is the same either way.','Third-party sandboxes and disarm engines are called through their interfaces; the working session shows it with your tool.','We already have a sandbox. -> Keep it. The Gateway calls it.'));
 const P=scene(s,'gw_docks',0.3,1.95,7.9,4.0);const names=[];
 names.push(dot(s,P,'s1','1','m1',0,-0.3));names.push(dot(s,P,'s2','2','m2',0,-0.3)); names.push(...rowsR(s,[['1  Your sandbox','The gateway calls the sandbox you already run, or ours: DFX Malware Mitigation Sandbox.'],['2  Your CDR engine','The gateway calls your CDR engine, or ours: DFX TruCDR.'],['Verdict first','A file crosses only after the verdict comes back clean.']],8.5,2.0,4.3,1.3,'r',14));
 names.push(killer(s,'Your sandbox, your CDR engine. We fit in.',0.7,6.05,11.9,'k'));
 cl(N,[['scene'],...names]);}

// ---- 15 TruScope
{const s=ns(K+'OUR OWN ENGINE','Our own detection engine: TruScope Anti Malware Engine','Built by DataFlowX for the formats people exchange every day: Office files, PDF and images.',
 NOTE('Say it simply: this is our own engine, and it is focused on the formats that cross most often. It is one control among others in FlowRule; you can use it alone or with your engines. Do not compare detection rates; say that the working session runs it on the customer files.','TruScope Anti Malware Engine, developed by DataFlowX.','How does it compare to our antivirus? -> Use both. FlowRule can run several controls on the same file.'),{fs:26});
 const names=[];
 [['Office','DOCX XLSX PPTX'],['PDF','PDF files'],['Image','JPG PNG']].forEach((f,k)=>{const y=2.2+k*1.15;names.push(box(s,0.7,y,2.4,0.95,f[0],f[1],'f'+k,{line:GREY}));arrow(s,3.2,y+0.47,0.9,'fa'+k,GREY);names[names.length-1].push('fa'+k);});
 names.push(box(s,4.2,2.2,3.0,3.25,'TruScope','Anti Malware Engine, developed by DataFlowX','e',{line:GOLD,fill:'1A1608',col:GOLD,fs:24,scol:STEEL}));
 arrow(s,7.3,3.8,1.2,'ev');names.push(['ev']);
 names.push(box(s,8.6,2.2,3.6,1.35,'Clean','the file continues to the next step','v1',{line:GRN,col:GRN}));names.push(box(s,8.6,4.1,3.6,1.35,'Blocked','the file is held and the reason is logged','v2',{line:RED,col:RED}));
 names.push(strip(s,'One control among others: FlowRule can run TruScope, your antivirus and your sandbox on the same file.',5.85,'q'));
 cl(N,names);}
