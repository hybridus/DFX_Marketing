const pptxgen=require('pptxgenjs'),fs=require('fs'),path=require('path');
const ST=path.join(__dirname,'..','stills'),ROWS=JSON.parse(fs.readFileSync(path.join(__dirname,'master_rows.json'),'utf8'));
const pres=new pptxgen();pres.layout='LAYOUT_WIDE';pres.title='DataFlowX Technical Sales Presentation: Master deck';pres.author='DataFlowX';
const BG='0B0D10',TX='F5F7FA',MU='9AA3AD',GOLD='F5A800',F='Arial',CARD='171A1F',RED='B3121F',GRN='3DDC84',STEEL='C9D1DA',GREY='8FA0B3';
const BL={Corp:'4F8FC9',Cls:'9B6FD8',OT:'2CC4D9'};
const builds={};let N=0;
function png(n){const b=fs.readFileSync(path.join(ST,n+'.png'));return [b.readUInt32BE(16),b.readUInt32BE(20)];}
function img(s,n,x,y,w,h,name){const [pw,ph]=png(n),r=pw/ph;let W=w,H=w/r;if(H>h){H=h;W=h*r;}
 s.addImage({path:path.join(ST,n+'.png'),x:x+(w-W)/2,y:y+(h-H)/2,w:W,h:H,objectName:name||n,altText:n});}
function T(s,t,o){s.addText(t,Object.assign({fontFace:F,color:TX,margin:0,isTextBox:true},o));}
function notes(id){const r=ROWS.find(r=>r[0]===id);return 'TALK TRACK: '+r[3]+'\nPROOF: '+r[4]+'\nVISUAL BRIEF (SVCGDE): '+r[5]+(r[6]?'\nOBJECTION: '+r[6].replace(' -> ','  ANSWER: '):'');}
function slide(id,o){o=o||{};const r=ROWS.find(r=>r[0]===id);N++;const s=pres.addSlide();s.background={color:BG};
 if(o.left){T(s,r[1],{x:0.5,y:0.55,w:o.left,h:2.4,fontSize:o.fs||26,bold:true,valign:'top',objectName:'Title'});
  T(s,r[2],{x:0.5,y:o.my||3.1,w:o.left,h:2.4,fontSize:15,color:MU,valign:'top',objectName:'Message'});}
 else{T(s,r[1],{x:0.7,y:0.45,w:11.9,h:o.th||1.0,fontSize:o.fs||36,bold:true,valign:'top',objectName:'Title'});
  T(s,r[2],{x:0.7,y:o.my||(o.th?0.45+o.th+0.1:1.55),w:11.9,h:0.7,fontSize:18,color:MU,valign:'top',objectName:'Message'});}
 s.addNotes(notes(id));s._id=id;return s;}
const cl=(n,list)=>{builds[n]=list;};
// ---------------- M01
{const s=slide('M01',{fs:40});const items=[['obj_usb','A file',3.1,2.05],['obj_gateway','A data stream',3.1,2.05],['obj_deskpc','A remote session',2.4,2.6],['obj_emailGateway','A mail',3.1,2.05]];const names=[];
 items.forEach((it,k)=>{img(s,it[0],0.7+k*3.05+(3.0-it[2])/2,2.4+(2.7-it[3])/2,it[2],it[3],'obj'+k);T(s,it[1],{x:0.7+k*3.05,y:5.35,w:3.0,h:0.45,fontSize:18,align:'center',objectName:'lab'+k});names.push(['obj'+k,'lab'+k]);});
cl(N,names);}
// ---------------- M02
{const s=slide('M02',{fs:28,th:1.3,my:1.8});const L=[['obj_usb','File','A supplier sends a drawing','A renamed executable'],['obj_gateway','Data stream','A system sends readings','A return channel'],['obj_deskpc','Remote session','An engineer fixes a machine','A hijacked session'],['obj_emailGateway','Mail','A customer sends an order','A spoofed sender']];const names=[];
 L.forEach((it,k)=>{const x=0.7+k*3.05;img(s,it[0],x,2.75,2.9,1.7,'o'+k);
  T(s,it[1],{x,y:4.55,w:2.9,h:0.4,fontSize:18,bold:true,align:'center',objectName:'t'+k});
  T(s,'Used: '+it[2],{x,y:5.0,w:2.9,h:0.6,fontSize:13,color:MU,align:'center',valign:'top',objectName:'u'+k});
  T(s,'Abused: '+it[3],{x,y:5.65,w:2.9,h:0.6,fontSize:13,color:MU,align:'center',valign:'top',objectName:'a'+k});names.push(['o'+k,'t'+k,'u'+k,'a'+k]);});
 cl(N,names);}
// ---------------- M03
{const s=slide('M03',{fs:34,th:1.0});const lay=[['Physics','Hardware decides which way data can move',GOLD,'0B0D10',5.2],['Rules','Protocol and policy. No matching rule: data is dropped',CARD,TX,4.0],['Content','Inspection of what is allowed to move',CARD,TX,2.8]];const names=[];
 lay.forEach((l,k)=>{s.addShape(pres.ShapeType.roundRect,{x:0.9,y:5.15-k*1.35,w:7.6,h:1.15,fill:{color:l[2]},line:{color:GOLD,width:1.5},rectRadius:0.1,objectName:'slab'+k});
  T(s,[{text:l[0]+'  ',options:{bold:true,fontSize:22,color:l[3]}},{text:l[1],options:{fontSize:15,color:l[3]}}],{x:1.2,y:5.15-k*1.35,w:7.0,h:1.15,valign:'middle',objectName:'st'+k});names.push(['slab'+k,'st'+k]);});
 cl(N,names);}
// ---------------- M04
{const s=slide('M04',{left:2.5});const L=['m04_1','m04_2','m04_3','m04_4'];L.forEach(n=>img(s,n,2.93,0.9,10.4,5.85,n));cl(N,L.map(n=>[n]));}
// ---------------- M05
{const s=pres.addSlide();N++;s.background={color:BG};const r=ROWS.find(r=>r[0]==='M05');s.addNotes(notes('M05'));
 T(s,r[1],{x:0.7,y:0.5,w:11.9,h:1.3,fontSize:36,bold:true,valign:'top',objectName:'Title'});T(s,r[2],{x:0.7,y:1.85,w:11.9,h:0.5,fontSize:18,color:MU,objectName:'Message'});
 img(s,'obj_gateway',0.9,2.7,5.2,3.9,'gw');
 s.addShape(pres.ShapeType.line,{x:6.2,y:4.25,w:3.6,h:0,line:{color:GOLD,width:4,endArrowType:'triangle'},objectName:'fibre'});T(s,'one fibre, one direction',{x:6.2,y:3.8,w:3.6,h:0.35,fontSize:14,color:GOLD,objectName:'fibreLabel'});
 s.addShape(pres.ShapeType.rect,{x:6.2,y:5.3,w:3.6,h:0.7,fill:{type:'none'},line:{color:GREY,width:1.5,dashType:'dash'},objectName:'emptySlot'});T(s,'no return fibre',{x:6.2,y:6.1,w:3.6,h:0.35,fontSize:14,color:GREY,objectName:'emptyLabel'});
 s.addShape(pres.ShapeType.roundRect,{x:10.3,y:5.3,w:2.4,h:0.7,fill:{color:CARD},line:{color:GOLD,width:1.25},rectRadius:0.1,objectName:'cc'});T(s,'Common Criteria EAL4+',{x:10.3,y:5.3,w:2.4,h:0.7,fontSize:14,bold:true,align:'center',valign:'middle',objectName:'ccText'});cl(N,[['fibre','fibreLabel']]);}
// ---------------- M06
{const s=slide('M06',{fs:34,th:1.0});img(s,'obj_gateway',4.6,2.9,4.1,3.1,'gw');
 const D=[['Active Directory',0.8,2.7],['Sandbox',9.3,2.7],['SIEM',0.8,5.2],['OPC server',9.3,5.2]];const names=[];
 D.forEach((d,k)=>{s.addShape(pres.ShapeType.roundRect,{x:d[1],y:d[2],w:3.2,h:0.9,fill:{color:CARD},line:{color:GREY,width:1.25},rectRadius:0.1,objectName:'dock'+k});
  T(s,d[0],{x:d[1],y:d[2],w:3.2,h:0.9,fontSize:18,bold:true,align:'center',valign:'middle',objectName:'dt'+k});
  const gx=k%2?8.2:5.3,gy=4.4;const a=[d[1]+(k%2?0:3.2),d[2]+0.45],b=[gx,gy+(k<2?-0.2:0.2)];
  s.addShape(pres.ShapeType.line,{x:Math.min(a[0],b[0]),y:Math.min(a[1],b[1]),w:Math.abs(a[0]-b[0])||0.01,h:Math.abs(a[1]-b[1])||0.01,flipV:(a[1]>b[1])!==(a[0]>b[0]),line:{color:GOLD,width:1.75},objectName:'ln'+k});names.push(['dock'+k,'dt'+k,'ln'+k]);});
 cl(N,names);}
// ---------------- M07
{const s=slide('M07',{fs:34,th:1.0});const C=[['7','controls','File Type Control catches what antivirus ignores'],['6','modifications','A file is fixed if needed'],['4','actions','Every file ends in one outcome']];const names=[];
 C.forEach((c,k)=>{const x=0.7+k*4.05;s.addShape(pres.ShapeType.roundRect,{x,y:2.7,w:3.8,h:3.6,fill:{color:CARD},line:{color:k===0?GOLD:'2A2F36',width:1.5},rectRadius:0.12,objectName:'c'+k});
  T(s,c[0],{x,y:2.9,w:3.8,h:1.5,fontSize:88,bold:true,color:k===0?GOLD:TX,align:'center',valign:'middle',objectName:'n'+k});
  T(s,c[1],{x,y:4.4,w:3.8,h:0.5,fontSize:24,bold:true,align:'center',objectName:'l'+k});
  T(s,c[2],{x:x+0.3,y:5.0,w:3.2,h:1.0,fontSize:14,color:MU,align:'center',valign:'top',objectName:'d'+k});names.push(['c'+k,'n'+k,'l'+k,'d'+k]);});cl(N,names);}
// ---------------- M08
{const s=slide('M08',{left:2.5,my:2.6});img(s,'m04_full',2.93,0.9,10.4,5.85,'map');const k=10.4/1920,P=(x,y)=>[2.93+x*k-0.17,0.9+y*k-0.17];
 const M=[[1,'File selected',170,330,'F5F7FA'],[2,'Policy applied',380,470,'F5F7FA'],[3,'Sandbox: clean',250,545,GRN],[4,'TruCDR: rebuilt',360,610,GRN],[5,'Gateway: one way',640,650,GRN],[6,'Delivered to OT',1150,520,GRN]];const c2=[];
 M.forEach(m=>{const [x,y]=P(m[2],m[3]);s.addShape(pres.ShapeType.ellipse,{x,y,w:0.34,h:0.34,fill:{color:m[4]},line:{color:m[0]===4?'F5F7FA':m[4],width:m[0]===4?2.25:0.75},objectName:'v'+m[0]});
  T(s,String(m[0]),{x,y,w:0.34,h:0.34,fontSize:12,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'n'+m[0]});c2.push(['v'+m[0],'n'+m[0]]);});
 T(s,M.map((m,i)=>({text:m[0]+'  '+m[1],options:{breakLine:i<M.length-1}})),{x:0.5,y:4.15,w:2.4,h:2.4,fontSize:13,color:STEEL,valign:'top',paraSpaceAfter:5,objectName:'legend'});cl(N,c2);}
// ---------------- M09
{const s=slide('M09',{fs:34,th:1.2,my:1.75});
 s.addShape(pres.ShapeType.roundRect,{x:0.8,y:2.9,w:4.6,h:3.2,fill:{color:CARD},line:{color:GREY,width:1.25},rectRadius:0.12,objectName:'cardA'});
 T(s,'Static analysis',{x:1.1,y:3.1,w:4.0,h:0.5,fontSize:22,bold:true,objectName:'tA'});T(s,'Verdict: clean',{x:1.1,y:3.8,w:4.0,h:0.6,fontSize:28,bold:true,color:GRN,objectName:'vA'});T(s,'Antivirus engines see nothing wrong.',{x:1.1,y:4.6,w:4.0,h:0.8,fontSize:15,color:MU,valign:'top',objectName:'dA'});
 img(s,'obj_sandbox',5.7,3.4,2.5,1.9,'sbx');
 s.addShape(pres.ShapeType.roundRect,{x:8.5,y:2.9,w:4.0,h:3.2,fill:{color:CARD},line:{color:RED,width:1.5},rectRadius:0.12,objectName:'cardB'});
 s.addShape(pres.ShapeType.ellipse,{x:11.9,y:3.15,w:0.3,h:0.3,fill:{color:RED},line:{color:RED,width:0.75},objectName:'lampB'});
 T(s,'Dynamic analysis',{x:8.8,y:3.1,w:3.0,h:0.5,fontSize:22,bold:true,objectName:'tB'});T(s,'Verdict: malicious behaviour',{x:8.8,y:3.8,w:3.4,h:1.0,fontSize:22,bold:true,color:'F26B76',valign:'top',objectName:'vB'});T(s,'Behaviour in a virtual machine gives it away.',{x:8.8,y:4.9,w:3.4,h:0.9,fontSize:15,color:MU,valign:'top',objectName:'dB'});
 cl(N,[['cardA','tA','vA','dA'],['sbx'],['cardB','lampB','tB','vB','dB']]);}
// ---------------- M10
{const s=slide('M10',{fs:36,th:1.0});
 s.addShape(pres.ShapeType.roundRect,{x:0.9,y:3.0,w:3.3,h:2.9,fill:{color:CARD},line:{color:STEEL,width:1.5},rectRadius:0.1,objectName:'sheetA'});T(s,[{text:'Original file',options:{bold:true,fontSize:20,breakLine:true}},{text:'hash A',options:{fontSize:16,color:MU,breakLine:true}},{text:'carries active content',options:{fontSize:14,color:MU}}],{x:1.2,y:3.3,w:2.8,h:2.3,valign:'top',objectName:'tA'});
 img(s,'obj_trucdr',4.5,3.3,4.3,2.5,'cdr');
 s.addShape(pres.ShapeType.roundRect,{x:9.1,y:3.0,w:3.3,h:2.9,fill:{color:CARD},line:{color:GOLD,width:2},rectRadius:0.1,objectName:'sheetB'});T(s,[{text:'Rebuilt file',options:{bold:true,fontSize:20,breakLine:true}},{text:'hash B',options:{fontSize:16,color:GOLD,breakLine:true}},{text:'looks the same, nothing active',options:{fontSize:14,color:MU}}],{x:9.4,y:3.3,w:2.8,h:2.3,valign:'top',objectName:'tB'});
 T(s,'Forensic report lists what was removed',{x:0.9,y:6.25,w:11.5,h:0.45,fontSize:16,color:MU,align:'center',objectName:'rep'});
 cl(N,[['sheetA','tA'],['cdr'],['sheetB','tB','rep']]);}
// ---------------- M11
{const s=slide('M11',{left:3.3,my:3.3});img(s,'sra_base',3.9,0.9,9.0,5.6,'base');img(s,'sra_out',3.9,0.9,9.0,5.6,'out');img(s,'sra_in',3.9,0.9,9.0,5.6,'in');
 T(s,'Not a firewall, VPN, proxy, jump host or tunnel.',{x:0.5,y:5.4,w:3.0,h:1.0,fontSize:13,color:GOLD,valign:'top',objectName:'neg'});cl(N,[['out','in','neg']]);}
// ---------------- M12
{const s=slide('M12',{left:3.3,my:3.2});img(s,'sra_base',3.9,0.9,9.0,5.6,'base');img(s,'sra_out',3.9,0.9,9.0,5.6,'out');img(s,'sra_in',3.9,0.9,9.0,5.6,'in');
 T(s,[{text:'Gold: request path',options:{color:GOLD,breakLine:true}},{text:'White: response path',options:{color:TX}}],{x:0.5,y:5.5,w:3.0,h:0.9,fontSize:14,valign:'top',objectName:'key'});cl(N,[['out','key'],['in']]);}
// ---------------- M13
{const s=slide('M13',{left:3.3,my:3.3,fs:24});img(s,'sra_all',3.9,0.9,9.0,5.6,'all');T(s,'Shown only when the audience asks about two-way initiation.',{x:0.5,y:5.2,w:3.0,h:1.0,fontSize:13,color:MU,valign:'top',objectName:'app'});}
// ---------------- M14
{const s=slide('M14',{fs:34,th:1.0});img(s,'obj_kiosk2',0.8,2.7,2.4,3.8,'ks');img(s,'obj_platformD1',4.3,3.1,4.2,3.0,'one');img(s,'obj_pass',9.7,3.6,3.0,2.0,'pass');
 T(s,'Media Transfer Station',{x:0.8,y:6.5,w:3.0,h:0.4,fontSize:16,objectName:'tk'});T(s,'DFX One Platform: one portal, one policy',{x:4.3,y:6.5,w:4.6,h:0.4,fontSize:16,objectName:'to'});T(s,'DFX PASS: handheld for OT without network access',{x:9.4,y:6.0,w:3.5,h:0.7,fontSize:16,valign:'top',objectName:'tp'});
 cl(N,[['ks','tk'],['one','to'],['pass','tp']]);}
// ---------------- M15
{const s=slide('M15',{fs:36,th:1.0});img(s,'obj_emailGateway',0.9,2.7,5.2,3.9,'seg');
 const O=[['Passes',GRN,'clean mail is delivered'],['Rebuilt',GOLD,'attachment rebuilt by TruCDR'],['Held',RED,'spoofed sender stopped']];const names=[];
 O.forEach((o,k)=>{const y=2.9+k*1.15;s.addShape(pres.ShapeType.roundRect,{x:6.8,y,w:5.7,h:0.95,fill:{color:CARD},line:{color:o[1]==RED?RED:o[1],width:1.5},rectRadius:0.1,objectName:'o'+k});
  T(s,[{text:o[0]+'  ',options:{bold:true,fontSize:20}},{text:o[2],options:{fontSize:15,color:MU}}],{x:7.1,y,w:5.2,h:0.95,valign:'middle',objectName:'ot'+k});names.push(['o'+k,'ot'+k]);});
 cl(N,[['seg'],...names]);}
// ---------------- M16
{const s=slide('M16',{fs:36,th:1.0});const cx=6.67,cy=4.3;const A=['Active Directory','Radius','NTP','Syslog','SIEM','Sandboxes','CDR','High availability'];const names=[];
 A.forEach((a,k)=>{const ang=-Math.PI/2+k*2*Math.PI/8,x=cx+Math.cos(ang)*4.2,y=cy+Math.sin(ang)*1.95;
  const bx=x-1.15,by=y-0.28;s.addShape(pres.ShapeType.line,{x:Math.min(cx,x),y:Math.min(cy,y),w:Math.abs(x-cx)||0.01,h:Math.abs(y-cy)||0.01,flipV:(y<cy)!==(x<cx),line:{color:'3A4350',width:1.25},objectName:'ln'+k});
  s.addShape(pres.ShapeType.roundRect,{x:bx,y:by,w:2.3,h:0.56,fill:{color:CARD},line:{color:GREY,width:1.25},rectRadius:0.1,objectName:'nd'+k});T(s,a,{x:bx,y:by,w:2.3,h:0.56,fontSize:14,bold:true,align:'center',valign:'middle',objectName:'nt'+k});names.push('ln'+k,'nd'+k,'nt'+k);});
 s.addShape(pres.ShapeType.ellipse,{x:cx-0.85,y:cy-0.85,w:1.7,h:1.7,fill:{color:GOLD},line:{color:GOLD,width:1},objectName:'hub'});T(s,'DFX',{x:cx-0.85,y:cy-0.85,w:1.7,h:1.7,fontSize:24,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'hubt'});
 T(s,'A blocked-file event arrives in your SIEM as a Syslog (CEF) line',{x:2.2,y:6.95,w:9.0,h:0.4,fontSize:15,color:GOLD,align:'center',objectName:'log'});
 cl(N,[['hub','hubt'],names,['log']]);}
// ---------------- M17
{const s=slide('M17',{fs:36,th:1.0});const C=[['Rule mismatch','No matching rule: data is dropped','event logged'],['Node failure','Fails over (high availability, active/passive)','event logged'],['Engine unreachable','Recorded in the log','event sent to Syslog and your SIEM']];const names=[];
 C.forEach((c,k)=>{const x=0.7+k*4.05;s.addShape(pres.ShapeType.roundRect,{x,y:2.7,w:3.8,h:3.4,fill:{color:CARD},line:{color:'2A2F36',width:1.5},rectRadius:0.12,objectName:'p'+k});
  T(s,c[0],{x:x+0.3,y:2.95,w:3.2,h:0.5,fontSize:22,bold:true,objectName:'h'+k});T(s,c[1],{x:x+0.3,y:3.7,w:3.2,h:1.1,fontSize:16,valign:'top',objectName:'b'+k});T(s,c[2],{x:x+0.3,y:5.2,w:3.2,h:0.6,fontSize:13,color:MU,valign:'top',objectName:'l'+k});names.push(['p'+k,'h'+k,'b'+k,'l'+k]);});
 T(s,'Wording is confirmed on the product before it is shown.',{x:0.7,y:6.4,w:11.9,h:0.4,fontSize:12,color:MU,objectName:'conf'});cl(N,names);}
// ---------------- M18
{const s=slide('M18',{fs:36,th:1.0});const rows=[['Attacker step','Control'],['File type spoof','File Type Control'],['Nested archive','Archive depth control'],['Password protection','Password policy'],['Malicious macro','TruCDR rebuild'],['Return channel','One-way hardware (Gateway)'],['Spoofed sender','Email Gateway'],['Session hijack by clipboard or file','Secure Remote Access']];
 const tb=rows.map((r,i)=>r.map((c,j)=>({text:c,options:{fontFace:F,fontSize:i?15:13,bold:i===0||j===0&&false,color:i===0?MU:(j===0&&r[0]==='Malicious macro'?'F26B76':(j===0?MU:TX)),fill:{color:i===0?'10141A':CARD},border:[{type:'none'},{type:'none'},{type:'solid',pt:0.75,color:'2A2F36'},{type:'none'}],valign:'middle'}})));
 s.addTable(tb,{x:0.9,y:2.55,w:11.5,colW:[5.2,6.3],rowH:0.5,objectName:'table'});}
// ---------------- M19
{const s=slide('M19',{fs:40,my:1.5});[['DFX Unidirectional Gateway',0.7],['DFX Secure Remote Access',6.85]].forEach(([n,x],i)=>{
  s.addShape(pres.ShapeType.roundRect,{x,y:2.7,w:5.75,h:2.1,fill:{color:CARD},line:{color:GOLD,width:1.5},rectRadius:0.12,objectName:'card'+i});T(s,n,{x:x+0.35,y:2.95,w:5.05,h:0.6,fontSize:24,bold:true,objectName:'cn'+i});T(s,'Common Criteria EAL4+',{x:x+0.35,y:3.7,w:5.05,h:0.5,fontSize:20,color:GOLD,objectName:'cc'+i});});
 T(s,'Certificates 21.0.03.0.00.0/TSE-CCCS-103 and TSE-CCCS-86. Evaluated scope per certificate: to be confirmed before use.',{x:0.7,y:5.2,w:11.9,h:0.6,fontSize:16,color:STEEL,valign:'top',objectName:'certs'});
 T(s,'DFX Unidirectional Gateway is named as a Sample Vendor in the Gartner Cyber Physical Security Hype Cycle, 2024 to 2026. This is not an endorsement.',{x:0.7,y:6.1,w:11.9,h:0.7,fontSize:12,color:MU,valign:'top',objectName:'gartner'});}
// ---------------- M20
{const s=slide('M20',{fs:40});s.addShape(pres.ShapeType.roundRect,{x:5.0,y:2.4,w:3.3,h:0.8,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.1,objectName:'root'});T(s,'What do you not control today?',{x:5.0,y:2.4,w:3.3,h:0.8,fontSize:15,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'rootT'});
 const B=[['No sandbox','DFX Malware Mitigation Sandbox'],['No CDR','DFX TruCDR'],['No remote access control','DFX Secure Remote Access'],['No one-way path','DFX Unidirectional Gateway']];const names=[];
 B.forEach((b,k)=>{const x=0.7+k*3.05;s.addShape(pres.ShapeType.line,{x:Math.min(6.65,x+1.4),y:3.2,w:Math.abs(6.65-(x+1.4))||0.01,h:0.9,flipH:(x+1.4)<6.65,line:{color:'3A4350',width:1.5},objectName:'br'+k});
  s.addShape(pres.ShapeType.roundRect,{x,y:4.1,w:2.8,h:0.7,fill:{color:CARD},line:{color:GREY,width:1.25},rectRadius:0.1,objectName:'q'+k});T(s,b[0],{x,y:4.1,w:2.8,h:0.7,fontSize:14,align:'center',valign:'middle',objectName:'qt'+k});
  s.addShape(pres.ShapeType.roundRect,{x,y:5.2,w:2.8,h:1.0,fill:{color:CARD},line:{color:GOLD,width:1.5},rectRadius:0.1,objectName:'e'+k});T(s,b[1],{x:x+0.1,y:5.2,w:2.6,h:1.0,fontSize:15,bold:true,align:'center',valign:'middle',objectName:'et'+k});names.push(['br'+k,'q'+k,'qt'+k,'e'+k,'et'+k]);});
 cl(N,[['root','rootT'],...names]);}
// ---------------- M21
{const s=slide('M21',{fs:40});const S=[['1','Workshop','Map the crossings, pick the first one'],['2','Integration demo','Run it in your own environment'],['3','Rollout','Scope and repeat']];const names=[];
 S.forEach((st,k)=>{const x=0.9+k*4.0;s.addShape(pres.ShapeType.ellipse,{x,y:2.9,w:0.9,h:0.9,fill:{color:GOLD},line:{color:GOLD,width:1},objectName:'c'+k});T(s,st[0],{x,y:2.9,w:0.9,h:0.9,fontSize:28,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'cn'+k});
  T(s,st[1],{x:x+1.1,y:2.95,w:2.7,h:0.5,fontSize:22,bold:true,objectName:'ct'+k});T(s,st[2],{x:x+1.1,y:3.5,w:2.7,h:1.0,fontSize:14,color:MU,valign:'top',objectName:'cd'+k});names.push(['c'+k,'cn'+k,'ct'+k,'cd'+k]);});
 T(s,'Partner and DataFlowX roles are agreed per project.',{x:0.9,y:5.4,w:11,h:0.4,fontSize:16,color:MU,objectName:'roles'});cl(N,[...names,['roles']]);}
// ---------------- M22
{const s=slide('M22',{fs:36,th:1.0});const hd=['#','Crossing','Today’s control','Priority'];
 const tb=[hd.map(h=>({text:h,options:{fontFace:F,fontSize:12,color:MU,fill:{color:'10141A'},bold:true}}))].concat([1,2,3].map(i=>[String(i),'','',''].map(c=>({text:c,options:{fontFace:F,fontSize:14,color:TX,fill:{color:CARD},border:[{type:'none'},{type:'none'},{type:'solid',pt:0.75,color:'2A2F36'},{type:'none'}]}}))));
 s.addTable(tb,{x:0.7,y:2.6,w:5.8,colW:[0.5,2.2,2.2,0.9],rowH:0.75,objectName:'bm'});
 const P=[['DFX Malware Mitigation Sandbox','Same-day demo, optional one-week PoC'],['DFX TruCDR','Same-day demo, optional one-week PoC'],['DFX Secure Email Gateway','Same-day demo, optional one-week PoC'],['DFX Unidirectional Gateway','Integration demo in your environment'],['DFX Secure Remote Access','Two-week PoC, own charter'],['DFX One Platform','Two-week PoC, own charter']];
 P.forEach((p,k)=>{const y=2.6+k*0.62;s.addShape(pres.ShapeType.roundRect,{x:6.9,y,w:5.7,h:0.52,fill:{color:CARD},line:{color:'2A2F36',width:1},rectRadius:0.08,objectName:'ch'+k});T(s,[{text:p[0]+'  ',options:{bold:true,fontSize:13}},{text:p[1],options:{fontSize:12,color:MU}}],{x:7.05,y,w:5.5,h:0.52,valign:'middle',objectName:'cht'+k});});}
// order check
const ids=ROWS.map(r=>r[0]);
pres.writeFile({fileName:path.join(__dirname,'raw_full.pptx')}).then(()=>{fs.writeFileSync(path.join(__dirname,'builds_full.json'),JSON.stringify(builds));console.log('slides',N);});
