/* time-driven film engine for scenes 0-2 */
(function(){
var N='http://www.w3.org/2000/svg';
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
function ease(x){x=clamp(x,0,1);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;}
function lerp(a,b,x){return a+(b-a)*x;}
// camera keyframes [t, cx, cy, k] in base screen coordinates
var CAM=[
[0,930,510,1],[2.5,930,510,1.04],
[4,420,430,1.65],[7,420,430,1.7],
[9,790,640,1.7],[11.5,790,640,1.75],
[13.5,1430,420,1.3],[16.5,1430,420,1.35],
[18.5,930,510,1],[22,930,510,1.02],
[24,420,430,1.5],[30,420,430,1.55],
[32.5,175,330,3.1],[50,175,330,3.15],
[52,300,420,1.9],[55,330,450,2.2],
[64,330,450,2.25],[88,330,455,2.2],[90.5,330,455,2.2],[93.8,480,340,1.58],
[96,480,330,1.55],[105,480,330,1.55],
[108,900,480,1.7],[126,900,480,1.75],
[129,1200,540,2.3],[134,1200,540,2.3],
[137,1500,300,2.0],[156,1500,300,2.05],
[160,930,510,1],[164,930,510,1.03]
];
var T_END=164;
function cam(t){var i=0;while(i<CAM.length-2&&t>CAM[i+1][0])i++;var a=CAM[i],b=CAM[i+1],x=ease((t-a[0])/(b[0]-a[0]));return [lerp(a[1],b[1],x),lerp(a[2],b[2],x),lerp(a[3],b[3],x)];}
var world=document.getElementById('world'),ui=document.getElementById('ui'),usbG=window.usbG;
function sx(c,p){return [960+(p[0]-c[0])*c[2],540+(p[1]-c[1])*c[2]];}
function el(n,a,p,txt){var e=document.createElementNS(N,n);for(var k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;if(p)p.appendChild(e);return e;}
// flow dots
var dotG=el('g',{},world);var dots=[];
FL.forEach(function(pts,fi){var pp=pts.map(function(q){return ISO.I(q[0],q[1],1.2);});var len=[0];for(var i=1;i<pp.length;i++)len.push(len[i-1]+Math.hypot(pp[i][0]-pp[i-1][0],pp[i][1]-pp[i-1][1]));
 var total=len[len.length-1];for(var k=0;k<3;k++){var c=el('circle',{r:5,fill:'#FFD36B',opacity:0},dotG);dots.push({c:c,pp:pp,len:len,total:total,ph:k/3,fi:fi});}});
function dotPos(d,u){var L=u*d.total,i=1;while(i<d.len.length-1&&L>d.len[i])i++;var s=(L-d.len[i-1])/(d.len[i]-d.len[i-1]||1);return [lerp(d.pp[i-1][0],d.pp[i][0],s),lerp(d.pp[i-1][1],d.pp[i][1],s)];}
// which flows are visible when: [t0,t1] per flow index (0 kiosk->platform, 1 platform<->sandbox... order of flow() calls)
function flowOn(fi,t){
 if(t<2)return 0;
 if(t<22){return clamp((t-2)/1.5,0,1)*(t>20?clamp((22-t)/2,0,1):1)*0.7;} // ambient in scenes 0-1
 if(fi===0)return t>46?clamp(t-46,0,1):0;
 return 0;}
// overlays
var CAPS=[
[0.6,3.6,'DataFlowX','Secure file transfer between security zones'],
[4,7,'CORPORATE NETWORK','Everyday IT: employees, desktops, standard network'],
[9,11.5,'CLASSIFIED NETWORK','Air-gapped. Sensitive data, no direct connection in'],
[13.5,16.5,'OT NETWORK  ·  ISOLATED OT','CNC machines on the OT network, and CNCs with no network at all'],
[24,30,'The corporate environment','One transfer station. One platform. One-way gateways to every protected zone.'],
[32.5,50,'DFX Media Transfer Station','Employee badge, USB media, files and destination chosen on the station'],
[56.5,63.5,'Policy decides first','Is this user allowed, and which file types may they bring?'],
[64.5,87.5,'DFX One Platform inspection','Multi AV engines, DFX TruCDR and the Malware Mitigation Sandbox, all at once'],
[88.5,96.0,'Quarantine','Blocked files stay in DFX One. The SOC admin receives them with the reports.'],
[96.5,105.5,'Sealed and stored','Safe files are sealed with a signature and stored in DFX One Platform.'],
[106.5,125.5,'DFX Unidirectional Gateway','Seal verified. Own protection profile. One way only.'],
[126.5,133.9,'Connected OT','The files reach the CNC control computer. Once approved, the machine runs.'],
[134.5,155.5,'Isolated OT with DFX PASS','No network at all. A controlled device replaces the USB stick.']
];
var RISK=[18.8,22.4,'One infected USB can undo every boundary you built.'];
var BUB=[
 {t0:5,t1:7,a:[175,285],w:250,h:64,title:'EMPLOYEES',rows:['Bring files on USB media']},
 {t0:24.6,t1:29.6,a:[380,455],w:360,h:100,title:'DFX ONE PLATFORM',rows:['Policy, Multi AV, DFX TruCDR,','Sandbox, seal and store']},
 {t0:36,t1:39,a:[175,285],s:1.5,w:260,h:92,title:'SIGN IN',rows:['Tap corporate ID (NFC)','Identity and policy checked']},
 {t0:39.5,t1:43.5,a:[175,285],s:1.35,w:360,h:262,title:'SELECT FILES',draw:'files',rows:[]},
 {t0:43.8,t1:47,a:[175,285],s:1.35,w:360,h:262,title:'SEND TO',draw:'dest',rows:[]},
 {t0:56.6,t1:63.6,a:[380,455],s:1.2,w:360,h:204,title:'POLICY ENGINE',draw:'policy',rows:[]},
 {t0:66,t1:76.6,a:[380,455],s:1.1,w:380,h:252,title:'INSPECTION',draw:'scan',rows:[]},
 {t0:77,t1:87.6,a:[380,455],s:1.1,w:380,h:222,title:'VERDICT',draw:'verdict',rows:[]},
 {t0:89.4,t1:92.2,a:[175,285],s:1.3,w:330,h:120,title:'BLOCKED',draw:'notice',rows:[]},
 {t0:95.6,t1:98.4,a:[610,275],s:1.1,w:390,h:200,title:'SECURITY ADMIN',draw:'soc',rows:[]},
 {t0:98.8,t1:105.6,a:[380,455],s:1.2,w:360,h:176,title:'STORED',draw:'stored',rows:[]},
 {t0:111,t1:125.6,a:[930,445],s:1.2,w:360,h:210,title:'GATEWAY',draw:'gw',rows:[]},
 {t0:128.8,t1:134.0,a:[1245,585],s:1.2,w:360,h:218,title:'MGMT PC',draw:'mgmt',rows:[]},
 {t0:135,t1:139.8,a:[1610,380],s:1.2,w:320,h:160,title:'DFX PASS',draw:'pass1',rows:[]},
 {t0:140,t1:145.4,a:[1610,380],s:1.2,w:320,h:160,title:'DFX PASS',draw:'pass2',rows:[]},
 {t0:145.6,t1:150.4,a:[1610,380],s:1.2,w:320,h:160,title:'DFX PASS',draw:'pass3',rows:[]},
 {t0:150.6,t1:155.6,a:[1515,290],s:1.2,w:340,h:150,title:'CNC COMPUTER',draw:'cnc',rows:[]},
 {t0:47.2,t1:50,a:[175,285],s:1.5,w:300,h:92,title:'SUBMITTED',rows:['Files sent to DFX One Platform','for inspection']}
];

function R(g,x,y,w,h,r,fill,stroke,sw){return el('rect',{x:x,y:y,width:w,height:h,rx:r,fill:fill,stroke:stroke||'none','stroke-width':sw||0},g);}
function T(g,x,y,txt,st,anchor){return el('text',{x:x,y:y,'text-anchor':anchor||'start',style:st},g,txt);}
var FILES=[['STEP','#4F8FC9','design_v7.step','4.2 MB'],['PDF','#B3121F','report_q3.pdf','1.1 MB'],['XLS','#3DDC84','budget.xlsx','380 KB'],['DOC','#9B6FD8','specification.docx','920 KB']];
var DEST=[['Corporate network','Standard network','#4F8FC9'],['Classified network','Air-gapped','#9B6FD8'],['OT network','Machines and CNC','#2CC4D9']];
function drawFiles(g,bx,by,w,h,tt){
 T(g,bx+20,by+30,'SELECT FILES','font:700 15px Inter;fill:#F5A800;letter-spacing:.14em');
 T(g,bx+w-20,by+30,'USB drive · 10 files','font:500 13px Inter;fill:#8D97A3','end');
 el('line',{x1:bx+20,y1:by+42,x2:bx+w-20,y2:by+42,stroke:'#2A323C'},g);
 FILES.forEach(function(f,i){var y=by+54+i*38;R(g,bx+16,y,w-32,32,8,'#171C23','#262E38',1);
  R(g,bx+24,y+6,34,20,5,f[1]);T(g,bx+41,y+20,f[0],'font:700 10px Inter;fill:#fff','middle');
  T(g,bx+68,y+21,f[2],'font:500 15px Inter;fill:#E6EDF5');T(g,bx+w-62,y+21,f[3],'font:400 12px Inter;fill:#8D97A3','end');
  var on=tt>i*0.5+0.3;R(g,bx+w-50,y+7,18,18,5,on?'#F5A800':'#0E1217',on?'none':'#4A5562',1.5);
  if(on)el('path',{d:'M'+(bx+w-46)+' '+(y+16)+'l4 4 8-9',fill:'none',stroke:'#0B0D10','stroke-width':2.4,'stroke-linecap':'round','stroke-linejoin':'round'},g);});
 T(g,bx+22,by+h-50+14,'+ 6 more files selected','font:500 13px Inter;fill:#8D97A3');
 R(g,bx+16,by+h-40,w-32,1,0,'#2A323C');
 T(g,bx+22,by+h-14,'10 of 10 selected','font:600 14px Inter;fill:#E6EDF5');
 R(g,bx+w-112,by+h-36,92,26,13,'#F5A800');T(g,bx+w-66,by+h-18,'Next','font:700 14px Inter;fill:#0B0D10','middle');}
function drawDest(g,bx,by,w,h,tt){
 T(g,bx+20,by+30,'SEND TO','font:700 15px Inter;fill:#F5A800;letter-spacing:.14em');
 T(g,bx+w-20,by+30,'Choose destination','font:500 13px Inter;fill:#8D97A3','end');
 el('line',{x1:bx+20,y1:by+42,x2:bx+w-20,y2:by+42,stroke:'#2A323C'},g);
 var sel=tt>1.2?2:-1;
 DEST.forEach(function(d,i){var y=by+54+i*50,s=(i===sel);R(g,bx+16,y,w-32,42,10,s?'#1E2630':'#171C23',s?'#F5A800':'#262E38',s?2:1);
  R(g,bx+26,y+9,24,24,6,d[2]);R(g,bx+32,y+15,12,12,2,'#0B0D10','none').setAttribute('opacity','.35');
  T(g,bx+62,y+20,d[0],'font:600 15px Inter;fill:#E6EDF5');T(g,bx+62,y+36,d[1],'font:400 12px Inter;fill:#8D97A3');
  el('circle',{cx:bx+w-36,cy:y+21,r:9,fill:'none',stroke:s?'#F5A800':'#4A5562','stroke-width':2},g);
  if(s)el('circle',{cx:bx+w-36,cy:y+21,r:4.5,fill:'#F5A800'},g);});
 R(g,bx+w-132,by+h-40,112,28,14,tt>1.8?'#F5A800':'#4A4020');T(g,bx+w-76,by+h-21,'Submit','font:700 14px Inter;fill:#0B0D10','middle');}
var DRAW={files:drawFiles,dest:drawDest};
function head(g,bx,by,w,title,sub){T(g,bx+20,by+30,title,'font:700 15px Inter;fill:#F5A800;letter-spacing:.14em');if(sub)T(g,bx+w-20,by+30,sub,'font:500 13px Inter;fill:#8D97A3','end');el('line',{x1:bx+20,y1:by+42,x2:bx+w-20,y2:by+42,stroke:'#2A323C'},g);}
function tick(g,x,y,on){R(g,x,y,18,18,5,on?'#3DDC84':'#0E1217',on?'none':'#4A5562',1.5);if(on)el('path',{d:'M'+(x+4)+' '+(y+9)+'l4 4 7-8',fill:'none',stroke:'#0B0D10','stroke-width':2.4,'stroke-linecap':'round','stroke-linejoin':'round'},g);}
function row(g,bx,by,w,i,label,sub,on,col){var y=by+54+i*38;R(g,bx+16,y,w-32,32,8,'#171C23','#262E38',1);if(col)R(g,bx+16,y,4,32,2,col);T(g,bx+30,y+21,label,'font:500 15px Inter;fill:#E6EDF5');if(sub)T(g,bx+w-62,y+21,sub,'font:400 12px Inter;fill:#8D97A3','end');tick(g,bx+w-50,y+7,on);}
function btn(g,x,y,w,txt,on,col){R(g,x,y,w,26,13,on?(col||'#F5A800'):'#2A323C');T(g,x+w/2,y+18,txt,'font:700 13px Inter;fill:'+(on?'#0B0D10':'#8D97A3'),'middle');}
DRAW.policy=function(g,bx,by,w,h,tt){head(g,bx,by,w,'POLICY ENGINE','DFX One Platform');row(g,bx,by,w,0,'Is this user allowed?','Corporate ID',tt>1.4);row(g,bx,by,w,1,'File types permitted?','10 of 10',tt>3);row(g,bx,by,w,2,'Destination: OT network','Rule: allow',tt>4.4);T(g,bx+22,by+h-14,tt>4.4?'Policy passed. Inspection starts.':'Checking rules...','font:600 14px Inter;fill:'+(tt>4.4?'#3DDC84':'#8D97A3'));};
var ENG=[['AV engine 1','#4F8FC9'],['AV engine 2','#4F8FC9'],['AV engine 3','#4F8FC9'],['AV engine 4','#4F8FC9'],['DFX TruCDR','#F5A800'],['Malware Mitigation Sandbox','#9B6FD8']];
DRAW.scan=function(g,bx,by,w,h,tt){head(g,bx,by,w,'INSPECTION','all at once · 10 files');ENG.forEach(function(en,i){var y=by+54+i*28,p=clamp((tt-0.3-i*0.35)/5.5,0,1);T(g,bx+22,y+14,en[0],'font:500 13px Inter;fill:#E6EDF5');R(g,bx+w-190,y+5,150,8,4,'#232B35');R(g,bx+w-190,y+5,150*p,8,4,en[1]);if(p>=1)el('path',{d:'M'+(bx+w-30)+' '+(y+10)+'l4 4 8-9',fill:'none',stroke:'#3DDC84','stroke-width':2.4,'stroke-linecap':'round'},g);});T(g,bx+22,by+h-14,'Scanning, rebuilding, detonating in parallel','font:500 13px Inter;fill:#8D97A3');};
DRAW.verdict=function(g,bx,by,w,h,tt){head(g,bx,by,w,'VERDICT','');var rows=[['Quarantined','2','#B3121F'],['Sanitized by CDR','6','#3DDC84'],['Already clean','2','#3DDC84']];rows.forEach(function(r,i){var y=by+54+i*44,on=tt>0.4+i*0.7;R(g,bx+16,y,w-32,38,10,'#171C23','#262E38',1);R(g,bx+16,y,5,38,2,r[2]);T(g,bx+34,y+25,r[0],'font:600 16px Inter;fill:#E6EDF5');T(g,bx+w-34,y+27,on?r[1]:'-','font:700 22px Inter;fill:'+(on?r[2]:'#4A5562'),'end');});R(g,bx+w-170,by+h-36,150,24,12,'none','#F5A800',1.5);T(g,bx+w-95,by+h-19,'Example scenario','font:600 12px Inter;fill:#F5A800','middle');T(g,bx+22,by+h-18,'10 files','font:600 14px Inter;fill:#8D97A3');};
DRAW.notice=function(g,bx,by,w,h,tt){head(g,bx,by,w,'BLOCKED','Station screen');R(g,bx+20,by+56,w-40,44,10,'#2A1216','#B3121F',1.5);T(g,bx+34,by+76,'2 files blocked','font:700 15px Inter;fill:#FF8A93');T(g,bx+34,by+93,'Sent to admin for review','font:400 12px Inter;fill:#C9AEB1');};
DRAW.admin=function(g,bx,by,w,h,tt){head(g,bx,by,w,'ADMIN ALERT','SOC review');R(g,bx+20,by+52,w-40,28,8,'#171C23','#262E38',1);T(g,bx+32,by+71,'2 files stored in DFX One','font:600 14px Inter;fill:#E6EDF5');btn(g,bx+20,by+h-36,120,'Analyze',tt>1.2);btn(g,bx+150,by+h-36,100,'Release',false);};
DRAW.soc=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SECURITY ADMIN (SOC)','DFX One Portal');[['invoice_scan.pdf','JavaScript, C2 contact'],['price_list.xlsm','Macro, startup key']].forEach(function(f,i){var y=by+54+i*50;R(g,bx+16,y,w-32,44,8,'#171C23','#262E38',1);R(g,bx+16,y,4,44,2,'#D9646E');T(g,bx+30,y+19,f[0],'font:600 14px Inter;fill:#E6EDF5');T(g,bx+30,y+35,'Malicious: '+f[1],'font:400 12px Inter;fill:#FF9AA1');R(g,bx+w-112,y+11,84,22,11,'none','#F5A800',1.2);T(g,bx+w-70,y+26,'VM report','font:600 11px Inter;fill:#F5A800','middle');});btn(g,bx+20,by+h-36,110,'Analyze',tt>1.2);btn(g,bx+140,by+h-36,100,'Release',false);};
DRAW.stored=function(g,bx,by,w,h,tt){head(g,bx,by,w,'STORED','DFX One Platform');row(g,bx,by,w,0,'8 safe files sealed','Signed',tt>0.8);row(g,bx,by,w,1,'Stored in DFX One','Encrypted',tt>2.4);T(g,bx+22,by+h-16,'Next: sent to the chosen network, OT','font:500 13px Inter;fill:#8D97A3');};
DRAW.portal=function(g,bx,by,w,h,tt){head(g,bx,by,w,'DFX ONE PORTAL','Corporate');[['design_v7.step','4.2 MB'],['report_q3.pdf','1.1 MB'],['budget.xlsx','380 KB'],['specification.docx','920 KB']].forEach(function(f,i){var y=by+54+i*34;R(g,bx+16,y,w-32,28,8,'#171C23','#262E38',1);T(g,bx+30,y+19,f[0],'font:500 14px Inter;fill:#E6EDF5');el('circle',{cx:bx+w-80,cy:y+14,r:5,fill:'#F5A800'},g);T(g,bx+w-66,y+18,'Sealed','font:600 11px Inter;fill:#F5A800');});T(g,bx+22,by+h-12,'8 sealed files available','font:500 13px Inter;fill:#8D97A3');};
DRAW.gw=function(g,bx,by,w,h,tt){head(g,bx,by,w,'GATEWAY','OT instance');row(g,bx,by,w,0,'Seal verified','',tt>1.5);row(g,bx,by,w,1,'Protection profile: OT','',tt>3.5);row(g,bx,by,w,2,'One-way transfer','',tt>5.5);T(g,bx+22,by+h-14,tt>5.5?'Audit record logged':'Checking...','font:600 13px Inter;fill:'+(tt>5.5?'#3DDC84':'#8D97A3'));};
DRAW.mgmt=function(g,bx,by,w,h,tt){head(g,bx,by,w,'CNC CONTROL PC','OT network');row(g,bx,by,w,0,'8 files received','Sealed',tt>1.9);row(g,bx,by,w,1,'Seal verified','',tt>2.8);row(g,bx,by,w,2,'Operator approved','design_v7.step',tt>3.7);T(g,bx+22,by+h-16,tt>4.4?'CNC machine running':'Waiting for approval','font:600 14px Inter;fill:'+(tt>4.4?'#3DDC84':'#8D97A3'));};
DRAW.pass1=function(g,bx,by,w,h,tt){head(g,bx,by,w,'DFX PASS','Sign in');T(g,bx+22,by+70,'Corporate ID badge','font:500 14px Inter;fill:#E6EDF5');tick(g,bx+w-40,by+54,tt>1);T(g,bx+22,by+104,'PIN','font:500 14px Inter;fill:#E6EDF5');for(var i=0;i<4;i++)el('circle',{cx:bx+w-100+i*20,cy:by+99,r:6,fill:tt>1.6+i*0.4?'#E6EDF5':'#2A323C'},g);};
DRAW.pass2=function(g,bx,by,w,h,tt){head(g,bx,by,w,'DFX PASS','Fetch');row(g,bx,by,w,0,'Sealed files received','',tt>0.8);row(g,bx,by,w,1,'Seal verified','',tt>2.4);};
DRAW.pass3=function(g,bx,by,w,h,tt){head(g,bx,by,w,'DFX PASS','USB mode');R(g,bx+16,by+54,w-32,60,10,'#171C23','#F5A800',1.5);T(g,bx+32,by+80,'Appears as a USB stick','font:600 15px Inter;fill:#E6EDF5');T(g,bx+32,by+100,'design_v7.step','font:400 13px Inter;fill:#8D97A3');};
DRAW.cnc=function(g,bx,by,w,h,tt){head(g,bx,by,w,'CNC COMPUTER','No network');R(g,bx+16,by+54,w-32,32,8,'#171C23','#262E38',1);T(g,bx+30,by+75,'USB drive: design_v7.step','font:500 14px Inter;fill:#E6EDF5');T(g,bx+22,by+h-16,tt>2?'File loaded. Machining starts.':'Reading drive...','font:600 14px Inter;fill:'+(tt>2?'#3DDC84':'#8D97A3'));};
var closeG=el('g',{opacity:0},ui);
el('rect',{x:0,y:0,width:1920,height:1080,fill:'#0B0D10','fill-opacity':.9},closeG);
el('image',{href:'../../Common/brand/logo-dark-bg.png',x:520,y:380,width:880,height:191},closeG);
el('text',{x:960,y:640,'text-anchor':'middle',style:'font:500 30px Inter;fill:#F5F7FA'},closeG,'Controlled file transfer into every network you protect.');
el('text',{x:960,y:690,'text-anchor':'middle',style:'font:500 22px Inter;fill:#B8C0CA'},closeG,'dataflowx.com');
var layer=el('g',{},ui);
var capG=el('g',{},layer),bubG=el('g',{},layer),riskG=el('g',{},layer);
el('image',{href:'../../Common/brand/logo-dark-bg.png',x:50,y:34,width:184,height:40},layer);
el('rect',{x:0,y:900,width:1920,height:180,fill:'url(#capg)',opacity:0},layer);
function fadeIO(t,a,b,f){f=f||0.5;return clamp((t-a)/f,0,1)*clamp((b-t)/f,0,1);}

var chipG=el('g',{},world);
function pw(pts,u,z){var pp=pts.map(function(q){return ISO.I(q[0],q[1],z);}),L=[0];for(var i=1;i<pp.length;i++)L.push(L[i-1]+Math.hypot(pp[i][0]-pp[i-1][0],pp[i][1]-pp[i-1][1]));var tot=L[L.length-1],d=clamp(u,0,1)*tot,i=1;while(i<L.length-1&&d>L[i])i++;var s=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(pp[i-1][0],pp[i][0],s),lerp(pp[i-1][1],pp[i][1],s)];}
var P_OT=[[526,60],[720,60],[720,-570],[960,-570]],P_CNC=[[960,-570],[1190,-570],[1210,-570],[1210,-405],[1790,-405],[1800,-452]];
var LID=[380,432],KIOSK=[175,330],SBX=[255,520],QF=[352,520];
var STATE=['cln','san','san','mal','san','san','cln','mal','san','san'];
function chip(g,p,col,ring,seal,op){var r=7;var gg=el('g',{opacity:op==null?1:op},g);if(ring)el('circle',{cx:p[0],cy:p[1],r:r+4,fill:'none',stroke:col,'stroke-width':1.6},gg);el('rect',{x:p[0]-r,y:p[1]-r,width:2*r,height:2*r,rx:3,fill:col,stroke:seal?'#F5A800':'#0B0D10','stroke-width':seal?2.5:1},gg);}
function folder(g,c,op){var gg=el('g',{opacity:op},g),x=c[0]-30,y=c[1]-24;el('path',{d:'M'+x+' '+(y+8)+'h20l6 6h34v34h-60z',fill:'#C8505A',stroke:'#0B0D10','stroke-width':1.5,'stroke-linejoin':'round'},gg);el('path',{d:'M'+x+' '+(y+18)+'h60v30h-60z',fill:'#E4838B'},gg);el('text',{x:c[0],y:c[1]+40,'text-anchor':'middle',style:'font:800 9px Inter;fill:#FF9AA1;letter-spacing:.1em'},gg,'QUARANTINE');}
function lerp2(a,b,u){return [lerp(a[0],b[0],u),lerp(a[1],b[1],u)];}
function glow(g,c,t,col){var r=9+Math.sin(t*6)*3;el('circle',{cx:c[0],cy:c[1],r:r+8,fill:col,opacity:.18},g);el('circle',{cx:c[0],cy:c[1],r:r,fill:col,opacity:.5},g);el('circle',{cx:c[0],cy:c[1],r:5,fill:'#fff',opacity:.9},g);}
function drawChips(t){chipG.innerHTML='';
 var P_DESK=[[428,34],[428,-420]],SEND=[0,1,2,4,5,6,8,9];
 if(t>=63&&t<107.2){
  var qOp=clamp((98-t)/1,0,1);
  var fOp=clamp((t-88.3)/0.8,0,1)*clamp((98-t)/1,0,1);
  var fu=clamp((t-91.2)/5,0,1),pd=pw(P_DESK,0,8),fp=fu<0.12?lerp2(QF,pd,fu/0.12):pw(P_DESK,(fu-0.12)/0.88*0.93,8);
  if(t>=88.3&&t<99)folder(chipG,fp,fOp);
  for(var i=0;i<10;i++){var home=[LID[0]-54+i*12,LID[1]-(i%2)*10-12],col='#C9D1DA',ring=0,seal=0,op=1,s=STATE[i];
   var arrive=ease((t-(63+i*0.12))/1.6),p=lerp2(KIOSK,home,arrive);
   if(t>=64.5&&t<77)col=(Math.floor(t*4+i)%3===0)?'#F5A800':'#C9D1DA';
   if(t>=66.6&&(i===3||i===6||i===7)){var go=ease((t-66.6-(i===3?0:i===6?0.4:0.8))/1.4),back=ease((t-75.6)/1.2);var sp=[SBX[0]-14+(i-3)*8,SBX[1]-(i===6?6:0)];p=lerp2(home,sp,go*(1-back));}
   if(t>=77.5)col=s==='mal'?'#B3121F':'#3DDC84',ring=(s==='san');
   if(s==='mal'&&t>=89.1){var q=ease((t-89.1)/1.3);p=lerp2(home,[fp[0]-8+(i===3?0:16),fp[1]+2],q);op=qOp;if(t>=99)continue;}
   if(s!=='mal'&&t>=96.6){seal=t>=97.2;if(t>=106.2+SEND.indexOf(i)*0.3)continue;}
   chip(chipG,p,col,ring,seal,op);}}
 if(t>=106.2&&t<135){SEND.forEach(function(ix,k){var dep=106.2+k*0.3,home=[LID[0]-54+ix*12,LID[1]-(ix%2)*10-12],start=ISO.I(526,60,8),p,tg=113.8+k*0.3,tc=119.5+k*0.3,ta=128.5+k*0.3,op=1,u=0;
   if(t<dep)return;
   if(t<dep+0.8)p=lerp2(home,start,ease((t-dep)/0.8));
   else if(t<tg)p=pw(P_OT,ease((t-dep-0.8)/(tg-dep-0.8)),8);
   else if(t<tc)p=pw(P_OT,1,8);
   else{u=clamp((t-tc)/(ta-tc),0,1);p=pw(P_CNC,u,8+(u>0.9?(u-0.9)*10*50:0));var off=clamp((u-0.85)/0.15,0,1);p=[p[0]+((k%4)*11-16)*off,p[1]-Math.floor(k/4)*11*off];}
   if(t>=133.4)op=clamp((134.6-t)/1.2,0,1);
   chip(chipG,p,'#3DDC84',0,1,op);});}
 if(t>=133.2&&t<136.4){glow(chipG,[1197,503],t,'#2CC4D9');}
 if(t>=153.2&&t<160){glow(chipG,[1467,199],t,'#8FA0B3');}
 if(t>=145.6&&t<156){chip(chipG,pw([[1555,-1380],[1415,-1395]],ease((t-146)/3.5),8),'#3DDC84',0,1);}
}
// sandbox VM windows
var vmG=el('g',{},ui);
var VMS=[['VM 1 · Win 11 · Office','price_list.xlsm',['macro runs','writes startup key','outbound connection'],1],['VM 2 · Win 10 · PDF','invoice_scan.pdf',['JavaScript runs','drops payload','contacts C2 server'],1],['VM 3 · Win 11 · Office','specification.docx',['opens document','no child process','no network calls'],0]];
function drawVMs(t,c){vmG.innerHTML='';if(t<66.6||t>76.8)return;var a=sx(cam(66.6),[255,548]),fo=clamp((76.8-t)/0.7,0,1);
 var ww=210,wh=158,sc=0.95;VMS.forEach(function(v,i){var t0=66.8+i*0.8,pp=ease((t-t0)/0.45);if(pp<=0)return;var cx=a[0]+(i-1)*(ww+16)*sc,top=a[1]-120-wh*sc;
  var g=el('g',{opacity:fo,transform:'translate('+cx+' '+(top+wh*sc)+') scale('+(pp*sc)+') translate(0 '+(-wh)+')'},vmG);var x=-ww/2,y=0;
  R(g,x,y,ww,wh,10,'#0F1318','#4A5562',1.5);R(g,x,y,ww,22,10,'#1D242D');R(g,x,y+12,ww,10,0,'#1D242D');
  [0,1,2].forEach(function(k){el('circle',{cx:x+14+k*13,cy:y+11,r:3.6,fill:['#B3121F','#F5A800','#3DDC84'][k]},g);});
  T(g,x+ww-10,y+15,'Sandbox','font:600 10px Inter;fill:#8D97A3','end');
  T(g,x+12,y+40,v[0],'font:700 12px Inter;fill:#E6EDF5');R(g,x+12,y+48,ww-24,20,5,'#171C23','#262E38',1);T(g,x+20,y+62,'running: '+v[1],'font:500 11px ui-monospace,monospace;fill:#F5A800');
  var tt=t-t0;v[2].forEach(function(l,k){if(tt>1.2+k*1.5){T(g,x+14,y+86+k*15,'> '+l,'font:500 11px ui-monospace,monospace;fill:#B8C0CA');}});
  if(tt>6.3){var bad=v[3];R(g,x+10,y+wh-26,ww-20,18,9,bad?'#3A1218':'#12301F',bad?'#B3121F':'#3DDC84',1.2);T(g,x+ww/2,y+wh-13,bad?'Malicious behavior':'Behavior: clean','font:700 11px Inter;fill:'+(bad?'#FF8A93':'#3DDC84'),'middle');}});
 }
window.setTime=function(t){
 var c=cam(t);world.setAttribute('transform','translate(960 540) scale('+c[2]+') translate('+(-c[0])+' '+(-c[1])+')');
 // dots
 dots.forEach(function(d){var on=flowOn(d.fi,t);var u=((t*0.28)+d.ph)%1;if(d.fi===0&&t>46)u=clamp(((t-46)/6)+d.ph*0.3,0,1);var p=dotPos(d,u);d.c.setAttribute('cx',p[0]);d.c.setAttribute('cy',p[1]);d.c.setAttribute('r',5/c[2]*1.2);d.c.setAttribute('opacity',on);});
 // usb animation: arrives at kiosk port between 34 and 36
 if(usbG){var u=ease((t-33.8)/1.8),op=1;if(t>=30&&t<33)op=0;else if(t>=33&&t<33.8)op=clamp((t-33)/0.8,0,1);
  usbG.setAttribute('transform','translate('+((t>=30)?(1-u)*-60:0)+' '+((t>=30)?(1-u)*-40:0)+')');usbG.setAttribute('opacity',op);}
 // captions
 capG.innerHTML='';
 CAPS.forEach(function(cp){var o=fadeIO(t,cp[0],cp[1]);if(o<=0)return;
  var g=el('g',{opacity:o},capG);el('rect',{x:60,y:900,width:760,height:104,rx:10,fill:'#0B0D10','fill-opacity':.78,stroke:'#F5A800','stroke-opacity':.55},g);
  el('rect',{x:60,y:900,width:6,height:104,fill:'#F5A800'},g);
  el('text',{x:90,y:944,style:'font:700 30px Inter;fill:#F5F7FA'},g,cp[2]);el('text',{x:90,y:980,style:'font:400 19px Inter;fill:#B8C0CA'},g,cp[3]);});
 closeG.setAttribute('opacity',clamp((t-160)/1.2,0,1));
 // risk line
 riskG.innerHTML='';var ro=fadeIO(t,RISK[0],RISK[1],0.7);
 if(ro>0){var g=el('g',{opacity:ro},riskG);el('rect',{x:0,y:0,width:1920,height:1080,fill:'#0B0D10','fill-opacity':.86},g);
  el('text',{x:960,y:560,'text-anchor':'middle',style:'font:700 54px Inter;fill:#F5F7FA'},g,RISK[2]);el('rect',{x:760,y:590,width:400,height:4,fill:'#B3121F'},g);}
 drawChips(t);drawVMs(t,c);
 // bubbles
 bubG.innerHTML='';
 BUB.forEach(function(b){var o=fadeIO(t,b.t0,b.t1,0.4);if(o<=0)return;var a=sx(cam(b.t0),b.a);
  var S=b.s||1,bx=clamp(a[0]-b.w*S/2,20,1900-b.w*S)/1,by=clamp(a[1]-90-b.h*S,20,1000-b.h*S);bx=(bx-a[0])/S+a[0];by=(by-a[1])/S+a[1];
  var g=el('g',{opacity:o,transform:'translate('+a[0]+' '+a[1]+') scale('+S+') translate('+(-a[0])+' '+(-a[1])+')'},bubG);
  el('line',{x1:a[0],y1:by+b.h,x2:a[0],y2:a[1]-6,stroke:'#F5A800','stroke-width':2.5},g);el('path',{d:'M'+(a[0]-7)+' '+(a[1]-14)+'L'+a[0]+' '+(a[1]-2)+'L'+(a[0]+7)+' '+(a[1]-14)+'z',fill:'#F5A800'},g);
  el('rect',{x:bx,y:by,width:b.w,height:b.h,rx:12,fill:'#12161C',stroke:'#F5A800','stroke-width':2},g);
  if(b.draw){(DRAW[b.draw]||drawDest)(g,bx,by,b.w,b.h,t-b.t0);return;}
  el('text',{x:bx+18,y:by+30,style:'font:700 15px Inter;fill:#F5A800;letter-spacing:.14em'},g,b.title);
  b.rows.forEach(function(r,i){el('text',{x:bx+18,y:by+58+i*24,style:'font:'+(b.ui?'500 17px ui-monospace,monospace':'500 18px Inter')+';fill:#E6EDF5'},g,r);});});
};
window.setTime(0);window.__ready=true;window.T_END=T_END;
})();
