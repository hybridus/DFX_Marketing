/* time-driven film engine, project 02: Sensitive organizations, import and export (Public <-> Classified), 216 s */
(function(){
var N='http://www.w3.org/2000/svg';
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
function ease(x){x=clamp(x,0,1);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;}
function lerp(a,b,x){return a+(b-a)*x;}
function V(x,y,z){return ISO.I(x,y,z||0);}
var STRETCH=[[29.6,50,1.15],[50,63.8,1.15],[84.5,97.4,1.5],[120.2,134.4,1.1],[152.4,172.4,1.15],[186,199.4,1.1]];
var D_END=216;
function toDesign(t){var rt=0,dt=0,i,S=STRETCH,cur=0;
 for(i=0;i<S.length;i++){var a=S[i][0],b=S[i][1],f=S[i][2];
  if(t<=rt+(a-dt)){return dt+(t-rt);}
  rt+=a-dt;dt=a;
  if(t<=rt+(b-a)*f){return dt+(t-rt)/f;}
  rt+=(b-a)*f;dt=b;}
 return dt+(t-rt);}
function toReal(d){var rt=0,dt=0,i,S=STRETCH;for(i=0;i<S.length;i++){var a=S[i][0],b=S[i][1],f=S[i][2];if(d<=a)return rt+(d-dt);rt+=a-dt;dt=a;if(d<=b)return rt+(d-a)*f;rt+=(b-a)*f;dt=b;}return rt+(d-dt);}
var T_END=toReal(D_END);
/* ---------- camera: [t, worldX, worldY, worldZ, zoom] -> base screen coords ---------- */
var OV=[990,590];
var CAMW=[
[0,null,1],[3,null,1.04],
[4.5,[480,-100,0],1.45],[8,[480,-100,0],1.5],
[9.6,[1900,-130,0],1.25],[13.4,[1900,-130,0],1.3],
[15.4,null,1],[22,null,1.02],
[23.2,[330,60,0],1.55],[28,[330,60,0],1.6],
[29.6,[100,250,60],3.0],[49.8,[100,250,60],3.0],
[51.8,[660,-560,90],2.5],[59,[660,-560,90],2.5],[61,[560,-330,30],1.6],[63.4,[500,-200,30],1.8],
[64.4,[428,-40,30],2.2],[68.9,[428,-40,30],2.2],[70.1,[428,60,30],1.9],[84.5,[428,60,30],1.9],[85.4,[428,-40,30],2.2],[87.9,[428,-40,30],2.2],[90.4,[235,-560,40],2.1],[93,[235,-560,40],2.1],[94.4,[428,-40,30],2.3],[97,[428,-40,30],2.3],
[98,[760,0,0],1.6],[99.6,[1078,100,20],2.1],[108.4,[1078,100,20],2.1],
[110.2,[1650,0,20],1.7],[111.8,[2000,-40,30],2.0],[116.2,[2000,-40,30],2.0],
[117.3,[1900,-130,0],1.28],[118.6,[1900,-130,0],1.28],
[120,[2195,-60,70],3.0],[134.4,[2195,-60,70],3.0],
[136.4,[1598,40,30],1.95],[155.8,[1598,40,30],1.95],
[157.6,[2175,-540,70],2.6],[167,[2175,-540,70],2.6],
[168.6,[1598,-40,30],2.3],[172.4,[1598,-40,30],2.3],
[173.4,[1340,-200,10],1.6],[176.2,[1078,-250,20],2.1],[184.4,[1078,-250,20],2.1],
[186.2,[500,-60,10],1.7],[188,[110,230,60],2.7],[193.6,[110,230,60],2.7],[195.4,[640,-520,60],2.1],[199.4,[640,-520,60],2.1],
[201.2,[-330,170,60],1.7],[207.2,[-330,170,60],1.7],
[208.4,null,1],[216,null,1.03]
];
var CAM=CAMW.map(function(k){var p=k[1]?V(k[1][0],k[1][1],k[1][2]):OV;return [k[0],p[0],p[1],k[2]];});
function cam(t){var i=0;while(i<CAM.length-2&&t>CAM[i+1][0])i++;var a=CAM[i],b=CAM[i+1],x=ease((t-a[0])/(b[0]-a[0]));return [lerp(a[1],b[1],x),lerp(a[2],b[2],x),lerp(a[3],b[3],x)];}
var world=document.getElementById('world'),ui=document.getElementById('ui'),usbG=window.usbG;
function sx(c,p){return [960+(p[0]-c[0])*c[2],540+(p[1]-c[1])*c[2]];}
function el(n,a,p,txt){var e=document.createElementNS(N,n);for(var k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;if(p)p.appendChild(e);return e;}
/* ---------- cooperation partner organization (institution building, appears only in the delivery scenes) ---------- */
var BLD_O=[-790,-20];
var extG=el('g',{opacity:0},world);var BLD=ISO.assets.institution(extG,BLD_O[0],BLD_O[1],{w:280,d:150});
var EXT_AT=BLD.entrance;
(function(){var q=ISO.I(BLD_O[0]+140,BLD_O[1]+150+44,0),w=300;var r=el('rect',{x:q[0]-w/2,y:q[1]+6,width:w,height:26,rx:13,fill:'#0B0D10','fill-opacity':.85,stroke:'#F5A800','stroke-width':1.4},extG);el('text',{x:q[0],y:q[1]+24,'text-anchor':'middle',style:'font:700 12px Inter;fill:#F5A800;letter-spacing:.8px'},extG,'COOPERATION PARTNER ORGANIZATION');})();
/* ---------- flow dots ---------- */
var dotG=el('g',{},world),dots=[];
FL.forEach(function(pts,fi){var pp=pts.map(function(q){return ISO.I(q[0],q[1],1.2);});var len=[0];for(var i=1;i<pp.length;i++)len.push(len[i-1]+Math.hypot(pp[i][0]-pp[i-1][0],pp[i][1]-pp[i-1][1]));
 var total=len[len.length-1];for(var k=0;k<3;k++){var c=el('circle',{r:5,fill:'#FFD36B',opacity:0},dotG);dots.push({c:c,pp:pp,len:len,total:total,ph:k/3,fi:fi});}});
function dotPos(d,u){var L=u*d.total,i=1;while(i<d.len.length-1&&L>d.len[i])i++;var s=(L-d.len[i-1])/(d.len[i]-d.len[i-1]||1);return [lerp(d.pp[i-1][0],d.pp[i][0],s),lerp(d.pp[i-1][1],d.pp[i][1],s)];}
var FIDX={};Object.keys(FLN).forEach(function(k){FIDX[k]=FL.indexOf(FLN[k]);});
var FNAME={};Object.keys(FIDX).forEach(function(k){FNAME[FIDX[k]]=k;});
function flowOn(name,t){
 if(t<2)return 0;
 if(t<20)return clamp((t-2)/1.5,0,1)*(t>18.5?clamp((20-t)/1.5,0,1):1)*(name==='apr'||name==='aud'||name==='net'?.45:.7);
 var w={ // active windows per flow
  st:[[47,52]],net:[[56,60]],web:[[59.2,63.6]],sb1:[[69.5,78.5]],aud:[[88,91]],in1:[[97.4,102]],in2:[[106,110]],wk:[[110,114],[133,136]],
  sb2:[[138,147]],apr:[[157.6,166.6]],ex1:[[173.6,178]],ex2:[[182,186.4]]}[name]||[];
 for(var i=0;i<w.length;i++)if(t>=w[i][0]&&t<=w[i][1])return clamp((t-w[i][0])/.8,0,1)*clamp((w[i][1]-t)/.8,0,1)*1+0;
 return 0;}
/* ---------- captions (lower third) ---------- */
var CAPS=[
[0.6,3.8,'DataFlowX','Controlled file transfer for sensitive organizations'],
[4.5,8,'PUBLIC NETWORK','Everyday IT: staff, partners, the internet side'],
[9.6,13.6,'CLASSIFIED NETWORK','Air-gapped. Sensitive data, no direct connection in'],
[23.4,28,'Public side','One transfer station. One DFX One platform. One gateway each way.'],
[30,47.5,'DFX Media Transfer Station','Badge, USB media from partners, files and destination chosen on the station'],
[50,63.2,'Files from the internet','A right-click, Send To Classified Network. No USB needed.'],
[64.4,67.8,'Policy decides first','Is this user allowed? Which file types? Which destination?'],
[69,84.6,'DFX One inspection','Multi AV engines, DFX TruCDR and the Malware Mitigation Sandbox'],
[85.5,92.8,'Quarantine','Malicious files stay in DFX One. The security admin gets the reports.'],
[94.5,97,'Sealed and stored','Approved files are signed, tamper-evident, stored in DFX One.'],
[98.2,109,'DFX Unidirectional Gateway (inbound)','Seal verified. Audit record logged. One way only.'],
[111,116.2,'Delivered inside Classified','Seal verified. Chain of custody intact.'],
[119,134.6,'DFX One portal, inside Classified','Verify identity, select files, choose the public network, encrypt for partner delivery'],
[136.4,152.6,'Inspection, plus DLP and classification','Markings and content checked, not just file types'],
[153.6,167,'Approval by the data owner','Inside Classified, before anything leaves'],
[168.8,172.3,'Sealed and stored','Approved files wait inside Classified.'],
[173,185,'DFX Unidirectional Gateway (outbound)','Classified files encrypted. One way only. Audit record logged.'],
[186.4,199.2,'Delivery on the public side','USB from the station, or download from the DFX One portal'],
[201.2,207.2,'Delivery to the Cooperation Partner Organization','The encrypted files stay unreadable if the USB is lost or stolen']
];
var BANNERS=[[20,22.5,'CHAPTER 1','Into Classified'],[116,118.5,'CHAPTER 2','Out of Classified']];
var RISK=[15.8,19.8,'One bad file is enough to compromise a whole network.'];
/* ---------- bubble helpers ---------- */
function R(g,x,y,w,h,r,fill,stroke,sw){return el('rect',{x:x,y:y,width:w,height:h,rx:r,fill:fill,stroke:stroke||'none','stroke-width':sw||0},g);}
function Tx(g,x,y,txt,st,anchor){return el('text',{x:x,y:y,'text-anchor':anchor||'start',style:st},g,txt);}
function head(g,bx,by,w,title,sub){Tx(g,bx+20,by+30,title,'font:700 15px Inter;fill:#F5A800;letter-spacing:.14em');if(sub)Tx(g,bx+w-20,by+30,sub,'font:500 13px Inter;fill:#8D97A3','end');el('line',{x1:bx+20,y1:by+42,x2:bx+w-20,y2:by+42,stroke:'#2A323C'},g);}
function tick(g,x,y,on,col){R(g,x,y,18,18,5,on?(col||'#3DDC84'):'#0E1217',on?'none':'#4A5562',1.5);if(on)el('path',{d:'M'+(x+4)+' '+(y+9)+'l4 4 7-8',fill:'none',stroke:'#0B0D10','stroke-width':2.4,'stroke-linecap':'round','stroke-linejoin':'round'},g);}
function row(g,bx,by,w,i,label,sub,on,col){var y=by+54+i*38;R(g,bx+16,y,w-32,32,8,'#171C23','#262E38',1);if(col)R(g,bx+16,y,4,32,2,col);Tx(g,bx+30,y+21,label,'font:500 15px Inter;fill:#E6EDF5');if(sub)Tx(g,bx+w-62,y+21,sub,'font:400 12px Inter;fill:#8D97A3','end');tick(g,bx+w-50,y+7,on);}
function btn(g,x,y,w,txt,on,col){R(g,x,y,w,26,13,on?(col||'#F5A800'):'#2A323C');Tx(g,x+w/2,y+18,txt,'font:700 13px Inter;fill:'+(on?'#0B0D10':'#8D97A3'),'middle');}
function lock(g,cx,cy,k,col){k=k||1;R(g,cx-6*k,cy-1*k,12*k,9*k,2*k,col||'#F5F7FA');el('path',{d:'M'+(cx-3.6*k)+' '+(cy-1*k)+'v-3.4a3.6 3.6 0 0 1 7.2 0v3.4',fill:'none',stroke:col||'#F5F7FA','stroke-width':1.8*k},g);}
function badge(g,x,y,w,txt,fill,stroke,col){R(g,x,y,w,22,11,fill,stroke,1.2);Tx(g,x+w/2,y+15,txt,'font:700 11px Inter;fill:'+col,'middle');}
/* file sets, in this audience's vocabulary */
var IMP=[['case_file_2291.pdf','PDF','#B3121F','cln'],['witness_statement.docx','DOC','#9B6FD8','san'],['evidence_log_A7.xlsx','XLS','#3DDC84','san'],['partner_update.xlsm','XLS','#3DDC84','mal'],['intel_summary_Q3.pdf','PDF','#B3121F','san'],['surveillance_photos.zip','ZIP','#8FA0B3','san'],['chain_of_custody.pdf','PDF','#B3121F','cln'],['field_report_0412.docx','DOC','#9B6FD8','san'],['suspect_profile_osint.pdf','PDF','#B3121F','mal'],['open_source_report.docx','DOC','#9B6FD8','san']];
var EXP=[['briefing_public.pdf','PDF','#B3121F','unc'],['case_summary_TS.docx','DOC','#9B6FD8','blk'],['joint_op_plan.docx','DOC','#9B6FD8','cls'],['press_release.docx','DOC','#9B6FD8','unc'],['training_manual.pdf','PDF','#B3121F','unc'],['source_list_SECRET.xlsx','XLS','#3DDC84','blk'],['evidence_extract.zip','ZIP','#8FA0B3','cls'],['liaison_note.pdf','PDF','#B3121F','unc'],['witness_report_red.pdf','PDF','#B3121F','cls'],['annual_stats.xlsx','XLS','#3DDC84','unc']];
function fileRow(g,bx,by,w,i,f,on,extra){var y=by+54+i*34;R(g,bx+16,y,w-32,28,8,'#171C23','#262E38',1);R(g,bx+22,y+5,30,18,5,f[2]);Tx(g,bx+37,y+18,f[1],'font:700 9px Inter;fill:#fff','middle');Tx(g,bx+62,y+19,f[0],'font:500 14px Inter;fill:#E6EDF5');
 if(extra)extra(g,bx+w-30,y);else{var cx=bx+w-30;R(g,cx-9,y+5,18,18,5,on?'#F5A800':'#0E1217',on?'none':'#4A5562',1.5);if(on)el('path',{d:'M'+(cx-5)+' '+(y+14)+'l4 4 7-8',fill:'none',stroke:'#0B0D10','stroke-width':2.4,'stroke-linecap':'round','stroke-linejoin':'round'},g);}}
var DRAW={};
DRAW.sign=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SIGN IN','Station');row(g,bx,by,w,0,'Tap ID badge (NFC)','',tt>0.8);row(g,bx,by,w,1,'Identity and policy checked','',tt>1.9);};
DRAW.usbfiles=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SELECT FILES','USB drive · 8 files');for(var i=0;i<4;i++)fileRow(g,bx,by,w,i,IMP[i],tt>i*0.45+0.3);Tx(g,bx+22,by+h-40,'+ 4 more files selected','font:500 13px Inter;fill:#8D97A3');R(g,bx+16,by+h-30,w-32,1,0,'#2A323C');Tx(g,bx+22,by+h-10,tt>2.4?'8 of 8 selected':'Selecting...','font:600 14px Inter;fill:#E6EDF5');btn(g,bx+w-110,by+h-36,90,'Next',tt>2.4);};
DRAW.dest=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SEND TO','Choose destination');var sel=tt>1.1?1:-1;[['Public network','Standard network','#4F8FC9'],['Classified network','Air-gapped','#9B6FD8']].forEach(function(d,i){var y=by+54+i*52,s=(i===sel);R(g,bx+16,y,w-32,44,10,s?'#1E2630':'#171C23',s?'#F5A800':'#262E38',s?2:1);R(g,bx+26,y+10,24,24,6,d[2]);Tx(g,bx+62,y+21,d[0],'font:600 15px Inter;fill:#E6EDF5');Tx(g,bx+62,y+37,d[1],'font:400 12px Inter;fill:#8D97A3');el('circle',{cx:bx+w-36,cy:y+22,r:9,fill:'none',stroke:s?'#F5A800':'#4A5562','stroke-width':2},g);if(s)el('circle',{cx:bx+w-36,cy:y+22,r:4.5,fill:'#F5A800'},g);});btn(g,bx+w-120,by+h-40,100,'Submit',tt>1.9);};
DRAW.websc=function(g,bx,by,w,h,tt){head(g,bx,by,w,'STANDARD USER PC','Downloads');
 [['suspect_profile_osint.pdf','PDF','#B3121F','2.4 MB'],['open_source_report.docx','DOC','#9B6FD8','860 KB']].forEach(function(f,i){var y=by+54+i*36,hot=tt>1.2&&i===0;R(g,bx+16,y,w-32,30,8,hot?'#1E2630':'#171C23',hot?'#4F8FC9':'#262E38',1);R(g,bx+22,y+6,30,18,5,f[2]);Tx(g,bx+37,y+19,f[1],'font:700 9px Inter;fill:#fff','middle');Tx(g,bx+62,y+20,f[0],'font:500 14px Inter;fill:#E6EDF5');Tx(g,bx+w-30,y+20,f[3],'font:400 12px Inter;fill:#8D97A3','end');});
 if(tt>2&&tt<7){var mx=bx+100,my=by+80;R(g,mx,my,230,112,8,'#1D242D','#4A5562',1.2);['Open','Copy','Rename'].forEach(function(l,i){Tx(g,mx+16,my+24+i*24,l,'font:500 13px Inter;fill:#C9D1DA');});
  var hs=tt>3;R(g,mx+6,my+78,218,24,6,hs?'#2A323C':'none');Tx(g,mx+16,my+95,'Send To  ▸','font:600 13px Inter;fill:#F5F7FA');
  if(hs){R(g,mx+200,my+72,240,36,8,'#1D242D','#4A5562',1.2);var on=tt>4.3;R(g,mx+206,my+77,228,26,6,on?'#3A2E10':'none',on?'#F5A800':'none',1.5);Tx(g,mx+216,my+95,'Classified Network','font:700 13px Inter;fill:'+(on?'#F5A800':'#E6EDF5'));}}
 if(tt>5.6){R(g,bx+w-250,by+h-62,234,50,10,'#12301F','#3DDC84',1.2);Tx(g,bx+w-236,by+h-42,'DFX End-User client','font:700 12px Inter;fill:#3DDC84');Tx(g,bx+w-236,by+h-24,'2 files sent to DFX One','font:500 13px Inter;fill:#E6EDF5');}};
DRAW.policy=function(g,bx,by,w,h,tt){head(g,bx,by,w,'POLICY ENGINE','DFX One');row(g,bx,by,w,0,'Is this user allowed?','Station + client',tt>0.9);row(g,bx,by,w,1,'File types permitted?','10 of 10',tt>1.9);row(g,bx,by,w,2,'Destination: Classified','Rule: allow',tt>2.8);Tx(g,bx+22,by+h-14,tt>2.8?'Policy passed. One queue, 10 files.':'Checking...','font:600 13px Inter;fill:'+(tt>2.8?'#3DDC84':'#8D97A3'));};
var ENG=[['AV engine 1','#4F8FC9'],['AV engine 2','#4F8FC9'],['AV engine 3','#4F8FC9'],['AV engine 4','#4F8FC9'],['DFX TruCDR','#F5A800'],['Malware Mitigation Sandbox','#9B6FD8']];
DRAW.scan=function(g,bx,by,w,h,tt){head(g,bx,by,w,'INSPECTION','all at once · 10 files');ENG.forEach(function(en,i){var y=by+54+i*28,p=clamp((tt-0.3-i*0.35)/5.5,0,1);Tx(g,bx+22,y+14,en[0],'font:500 13px Inter;fill:#E6EDF5');R(g,bx+w-190,y+5,150,8,4,'#232B35');R(g,bx+w-190,y+5,150*p,8,4,en[1]);if(p>=1)el('path',{d:'M'+(bx+w-30)+' '+(y+9)+'l4 4 7-8',fill:'none',stroke:'#3DDC84','stroke-width':2.4,'stroke-linecap':'round'},g);});};
DRAW.dlp=function(g,bx,by,w,h,tt){head(g,bx,by,w,'INSPECTION + DLP','all at once · 10 files');var E=ENG.concat([['Markings and DLP scan','#E4838B'],['Classification check','#E4838B']]);E.forEach(function(en,i){var y=by+54+i*26,p=clamp((tt-0.3-i*0.4)/5,0,1);Tx(g,bx+22,y+14,en[0],'font:500 13px Inter;fill:#E6EDF5');R(g,bx+w-190,y+5,150,8,4,'#232B35');R(g,bx+w-190,y+5,150*p,8,4,en[1]);if(p>=1)el('path',{d:'M'+(bx+w-30)+' '+(y+9)+'l4 4 7-8',fill:'none',stroke:'#3DDC84','stroke-width':2.4,'stroke-linecap':'round'},g);});};
function verdictFn(rows,ttl){return function(g,bx,by,w,h,tt){head(g,bx,by,w,ttl,'');rows.forEach(function(r,i){var y=by+54+i*44,on=tt>0.4+i*0.7;R(g,bx+16,y,w-32,38,10,'#171C23','#262E38',1);R(g,bx+16,y,5,38,2,r[2]);Tx(g,bx+34,y+25,r[0],'font:600 15px Inter;fill:#E6EDF5');if(on)Tx(g,bx+w-34,y+27,r[1],'font:800 22px Inter;fill:'+r[2],'end');});};}
DRAW.verdict=verdictFn([['Quarantined','2','#E06A74'],['Sanitized by CDR','6','#3DDC84'],['Already clean','2','#3DDC84']],'VERDICT');
DRAW.verdict2=verdictFn([['Blocked: secret markings','2','#E06A74'],['Classified: encrypt','3','#B58CF0'],['Unclassified: as is','5','#3DDC84']],'VERDICT + DLP');
DRAW.note1=function(g,bx,by,w,h,tt){head(g,bx,by,w,'QUARANTINE','DFX One');R(g,bx+20,by+56,w-40,44,10,'#2A1216','#B3121F',1.5);Tx(g,bx+34,by+76,'2 files quarantined','font:700 15px Inter;fill:#FF8A93');Tx(g,bx+34,by+93,'Sent to the security admin','font:400 12px Inter;fill:#C9AEB1');};
DRAW.note2=function(g,bx,by,w,h,tt){head(g,bx,by,w,'BLOCKED','DLP');R(g,bx+20,by+56,w-40,44,10,'#2A1216','#B3121F',1.5);Tx(g,bx+34,by+76,'2 files blocked: secret markings','font:700 15px Inter;fill:#FF8A93');Tx(g,bx+34,by+93,'Quarantined inside Classified','font:400 12px Inter;fill:#C9AEB1');};
DRAW.soc=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SECURITY ADMIN (SOC)','Audit console');[['partner_update.xlsm','Macro, startup key'],['suspect_profile_osint.pdf','JavaScript, C2 contact']].forEach(function(f,i){var y=by+54+i*50;R(g,bx+16,y,w-32,44,8,'#171C23','#262E38',1);R(g,bx+16,y,4,44,2,'#D9646E');Tx(g,bx+30,y+19,f[0],'font:600 14px Inter;fill:#E6EDF5');Tx(g,bx+30,y+36,f[1],'font:400 12px Inter;fill:#8D97A3');R(g,bx+w-112,y+11,84,22,11,'none','#F5A800',1.2);Tx(g,bx+w-70,y+26,'Detail report','font:600 11px Inter;fill:#F5A800','middle');});btn(g,bx+20,by+h-38,110,'Analyze',tt>1.2);btn(g,bx+140,by+h-38,100,'Release',false);};
DRAW.stored=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SEALED','DFX One');row(g,bx,by,w,0,'8 approved files signed','Tamper-evident',tt>0.8);row(g,bx,by,w,1,'Stored in DFX One','Encrypted',tt>2.2);Tx(g,bx+22,by+h-14,'Next: inbound gateway to Classified','font:500 13px Inter;fill:#8D97A3');};
DRAW.stored2=function(g,bx,by,w,h,tt){head(g,bx,by,w,'SEALED','DFX One · Classified');row(g,bx,by,w,0,'8 approved files signed','Tamper-evident',tt>0.8);row(g,bx,by,w,1,'Stored inside Classified','Encrypted',tt>2.2);};
DRAW.gw=function(g,bx,by,w,h,tt){head(g,bx,by,w,'GATEWAY','Inbound');row(g,bx,by,w,0,'Seal verified','',tt>1.5);row(g,bx,by,w,1,'Direction: Public to Classified','',tt>3.5);row(g,bx,by,w,2,'One-way transfer','',tt>5.5);Tx(g,bx+22,by+h-14,tt>6.5?'Audit record logged':'Checking...','font:600 13px Inter;fill:'+(tt>6.5?'#3DDC84':'#8D97A3'));};
DRAW.gw2=function(g,bx,by,w,h,tt){head(g,bx,by,w,'GATEWAY','Outbound');row(g,bx,by,w,0,'Seal verified','',tt>1.3);row(g,bx,by,w,1,'Classified files: encrypt (3)','',tt>3.2,'#B58CF0');row(g,bx,by,w,2,'Unclassified: as is (5)','',tt>5.2);Tx(g,bx+22,by+h-14,tt>7?'One way only. Audit record logged':'Checking...','font:600 13px Inter;fill:'+(tt>7?'#3DDC84':'#8D97A3'));};
DRAW.recv=function(g,bx,by,w,h,tt){head(g,bx,by,w,'CLASSIFIED PC','Analyst');row(g,bx,by,w,0,'8 files received','Sealed',tt>0.9);row(g,bx,by,w,1,'Seal verified','',tt>1.9);row(g,bx,by,w,2,'Chain of custody intact','',tt>2.9);};
DRAW.portal=function(g,bx,by,w,h,tt){var st=tt<2.6?0:tt<7.4?1:tt<10.4?2:tt<13?3:4;head(g,bx,by,w,'DFX ONE PORTAL',['Identity verification','Select files','Destination','Options','Options'][st]);
 if(st===0){row(g,bx,by,w,0,'Authorization credentials','',tt>1);row(g,bx,by,w,1,'Identity verified, policy checked','',tt>1.9);}
 else if(st===1){for(var i=0;i<5;i++)fileRow(g,bx,by,w,i,EXP[i],tt>2.8+i*0.6);Tx(g,bx+22,by+h-26,'+ 5 more files','font:500 13px Inter;fill:#8D97A3');Tx(g,bx+22,by+h-8,tt>6.4?'10 of 10 selected':'Selecting...','font:600 14px Inter;fill:#E6EDF5');}
 else if(st===2){[['Public network','Standard network','#4F8FC9']].forEach(function(d,i){var y=by+54+i*52,s=true;R(g,bx+16,y,w-32,44,10,s?'#1E2630':'#171C23',s?'#F5A800':'#262E38',s?2:1);R(g,bx+26,y+10,24,24,6,d[2]);Tx(g,bx+62,y+21,d[0],'font:600 15px Inter;fill:#E6EDF5');Tx(g,bx+62,y+37,d[1],'font:400 12px Inter;fill:#8D97A3');});}
 else{var on=tt>11.2;R(g,bx+16,by+54,w-32,48,10,'#171C23',on?'#F5A800':'#262E38',on?2:1);lock(g,bx+40,by+80,1.4,on?'#F5A800':'#8D97A3');Tx(g,bx+62,by+74,'Encrypt for partner delivery','font:600 15px Inter;fill:#E6EDF5');Tx(g,bx+62,by+92,'Approver can force or remove','font:400 12px Inter;fill:#8D97A3');R(g,bx+w-72,by+68,40,22,11,on?'#F5A800':'#2A323C');el('circle',{cx:on?bx+w-42:bx+w-62,cy:by+79,r:8,fill:'#0B0D10'},g);btn(g,bx+w-120,by+h-40,100,tt>13.4?'Submitted':'Submit',tt>12.2);}};
DRAW.approval=function(g,bx,by,w,h,tt){head(g,bx,by,w,'DATA OWNER · APPROVER','Classified');row(g,bx,by,w,0,'Verdict reviewed','10 files',tt>1.2);row(g,bx,by,w,1,'DLP findings: 2 blocked','Quarantined',tt>3);var f=tt>5;row(g,bx,by,w,2,'Encryption: 3 files','Forced on',f,'#B58CF0');Tx(g,bx+22,by+h-52,'Can force or remove encryption','font:500 12px Inter;fill:#8D97A3');btn(g,bx+w-124,by+h-40,104,tt>7.4?'Approved':'Approve',tt>6.6,tt>7.4?'#3DDC84':'#F5A800');};
DRAW.usbout=function(g,bx,by,w,h,tt){head(g,bx,by,w,'WRITE TO USB','Station');row(g,bx,by,w,0,'3 classified files encrypted','',tt>1,'#B58CF0');row(g,bx,by,w,1,'5 unclassified files, plain','',tt>2.2);Tx(g,bx+22,by+h-14,tt>3.2?'USB ready. Hand over.':'Writing...','font:600 13px Inter;fill:'+(tt>3.2?'#3DDC84':'#8D97A3'));};
DRAW.dl=function(g,bx,by,w,h,tt){head(g,bx,by,w,'DFX ONE PORTAL','Download');[2,6,8,0,3].forEach(function(ix,i){var f=EXP[ix];fileRow(g,bx,by,w,i,f,false,function(g2,cx,y){if(f[3]==='cls')lock(g2,cx,y+13,1.1,'#B58CF0');else el('path',{d:'M'+(cx-5)+' '+(y+10)+'l5 6 5-6',fill:'none',stroke:'#3DDC84','stroke-width':2,'stroke-linecap':'round'},g2);});});Tx(g,bx+22,by+h-12,tt>1.8?'8 files ready to download':'Loading...','font:600 13px Inter;fill:'+(tt>1.8?'#3DDC84':'#8D97A3'));};
DRAW.ext=function(g,bx,by,w,h,tt){head(g,bx,by,w,'ENCRYPTED USB','Cooperation partner');R(g,bx+16,by+54,w-32,50,10,'#171C23','#B58CF0',1.5);lock(g,bx+40,by+80,1.4,'#B58CF0');Tx(g,bx+62,by+75,'Unreadable without the key','font:600 15px Inter;fill:#E6EDF5');Tx(g,bx+62,by+94,'Lost, stolen or intercepted: no data loss','font:400 12px Inter;fill:#8D97A3');};
DRAW.audit=function(g,bx,by,w,h,tt){head(g,bx,by,w,'AUDIT LOG','SOC');};
function B(t0,t1,wx,wy,wz,w,h,title,draw,s,pos){return {t0:t0,t1:t1,w3:[wx,wy,wz],s:s||1.2,w:w,h:h,draw:draw,pos:pos};}
var POS_R=function(W,H){return [150,-H*0.55];},POS_UR=function(W,H){return [190,-H-40];};
var BUB=[
 B(35.4,38.6,60,200,150,300,140,'','sign',1.4,POS_R),
 B(39,43.2,60,200,150,360,290,'','usbfiles',1.3,POS_R),
 B(43.6,47,60,200,150,360,220,'','dest',1.3,POS_R),
 B(47.3,49.6,60,200,150,320,70,'','submitted',1.5,POS_R),
 B(52.2,58.8,640,-600,140,560,330,'','websc',1.15,function(W,H){return [140,-H*0.5];}),
 B(64.8,68.9,428,-80,60,380,204,'','policy',1.1),
 B(70.3,79.2,428,262,80,420,252,'','scan',1.1),
 B(79.8,84.2,428,262,80,380,222,'','verdict',1.1),
 B(85.6,87.8,428,-80,60,330,120,'','note1',1.2),
 B(90.8,93,235,-628,120,390,212,'','soc',1.1),
 B(94.7,97,428,-80,60,380,150,'','stored',1.2),
 B(99.9,108.4,1078,140,60,380,200,'','gw',1.2),
 B(112.2,115.9,2195,-78,110,360,180,'','recv',1.2),
 B(120.4,134.2,2195,-78,110,420,262,'','portal',1.3,function(W,H){return [300,-H/2];}),
 B(137,147.4,1598,262,80,420,300,'','dlp',1.05),
 B(147.9,153.2,1598,-80,100,380,222,'','verdict2',1.1),
 B(153.6,155.6,1598,-80,60,360,120,'','note2',1.2),
 B(157.9,166.8,2175,-568,110,380,244,'','approval',1.25),
 B(169,172.2,1598,-80,60,380,150,'','stored2',1.2),
 B(176.4,184.2,1078,-300,60,400,200,'','gw2',1.2),
 B(188.4,193.4,96,200,150,340,150,'','usbout',1.4,POS_R),
 B(195.6,199.2,675,-568,110,400,252,'','dl',1.3),
 B(201.6,207,EXT_AT[0],EXT_AT[1],170,380,130,'','ext',1.3)
];
/* plain text bubbles */
function fadeIO(t,a,b,f){f=f||0.5;return clamp((t-a)/f,0,1)*clamp((b-t)/f,0,1);}
DRAW.submitted=function(g,bx,by,w,h,tt){Tx(g,bx+20,by+26,'SUBMITTED','font:700 15px Inter;fill:#F5A800;letter-spacing:.14em');Tx(g,bx+20,by+48,'Nothing has touched the network yet','font:500 14px Inter;fill:#E6EDF5');};
/* ---------- overlays ---------- */
var closeA=el('g',{opacity:0},ui),closeB=el('g',{opacity:0},ui);
el('rect',{x:0,y:0,width:1920,height:1080,fill:'#0B0D10','fill-opacity':.92},closeA);
['No Manual Transfer.','No Human Error.','No Wait.','Full Control.'].forEach(function(l,i){var g=el('g',{class:'cl'+i},closeA);el('text',{x:960,y:400+i*90,'text-anchor':'middle',style:'font:700 58px Inter;fill:#F5F7FA'},g,l);});
el('rect',{x:0,y:0,width:1920,height:1080,fill:'#0B0D10','fill-opacity':.94},closeB);
el('image',{href:'../../Common/brand/logo-dark-bg.png',x:520,y:300,width:880,height:191},closeB);
el('text',{x:960,y:590,'text-anchor':'middle',style:'font:600 40px Inter;fill:#F5F7FA'},closeB,'Nothing crosses unseen.');
el('text',{x:960,y:650,'text-anchor':'middle',style:'font:600 40px Inter;fill:#F5A800'},closeB,'Nothing crosses unrecorded.');
el('text',{x:960,y:730,'text-anchor':'middle',style:'font:500 22px Inter;fill:#B8C0CA'},closeB,'dataflowx.com');
var layer=el('g',{},ui);
var capG=el('g',{},layer),banG=el('g',{},layer),bubG=el('g',{},layer),riskG=el('g',{},layer);
el('image',{href:'../../Common/brand/logo-dark-bg.png',x:50,y:34,width:184,height:40},layer);
/* ---------- chips ---------- */
var chipG=el('g',{},world);
function pw(pts,u,z){var pp=pts.map(function(q){return ISO.I(q[0],q[1],z);}),L=[0];for(var i=1;i<pp.length;i++)L.push(L[i-1]+Math.hypot(pp[i][0]-pp[i-1][0],pp[i][1]-pp[i-1][1]));var tot=L[L.length-1],d=clamp(u,0,1)*tot,i=1;while(i<L.length-1&&d>L[i])i++;var s=(d-L[i-1])/((L[i]-L[i-1])||1);return [lerp(pp[i-1][0],pp[i][0],s),lerp(pp[i-1][1],pp[i][1],s)];}
function lerp2(a,b,u){return [lerp(a[0],b[0],u),lerp(a[1],b[1],u)];}
function chip(g,p,col,ring,seal,op,lk){var r=7;var gg=el('g',{opacity:op==null?1:op},g);if(ring)el('circle',{cx:p[0],cy:p[1],r:r+4,fill:'none',stroke:col,'stroke-width':1.6},gg);el('rect',{x:p[0]-r,y:p[1]-r,width:2*r,height:2*r,rx:3,fill:col,stroke:seal?'#F5A800':'#0B0D10','stroke-width':seal?2.5:1},gg);if(lk)lock(gg,p[0],p[1]-3,.8,'#0B0D10');}
function folder(g,c,op,txt){var gg=el('g',{opacity:op},g),x=c[0]-30,y=c[1]-24;el('path',{d:'M'+x+' '+(y+8)+'h20l6 6h34v34h-60z',fill:'#C8505A',stroke:'#0B0D10','stroke-width':1.5,'stroke-linejoin':'round'},gg);el('path',{d:'M'+x+' '+(y+18)+'h60v30h-60z',fill:'#E4838B'},gg);el('text',{x:c[0],y:c[1]+40,'text-anchor':'middle',style:'font:700 11px Inter;fill:#FFB3B8;letter-spacing:.1em'},gg,txt||'QUARANTINE');}
function glow(g,c,t,col){var r=9+Math.sin(t*6)*3;el('circle',{cx:c[0],cy:c[1],r:r+8,fill:col,opacity:.18},g);el('circle',{cx:c[0],cy:c[1],r:r,fill:col,opacity:.5},g);el('circle',{cx:c[0],cy:c[1],r:5,fill:'#fff',opacity:.9},g);}
var F=FLN;
var IN=F.in1.concat(F.in2),EX=F.ex1.concat(F.ex2),WKR=F.wk.slice().reverse(),STR=F.st.slice().reverse();
var KIOSK=V(112,200,44),WEBPC=V(640,-560,70),WORKPC=V(2180,-90,100);
function lid1(i){return V(428-44+(i%5)*22,-80+(Math.floor(i/5))*18-8,62);}
function lid2(i){return V(1598-44+(i%5)*22,-80+(Math.floor(i/5))*18-8,62);}
var SB1=V(428,262,76),SB2=V(1598,262,76),SOCP=V(235,-540,40);
var CCOL={cln:'#3DDC84',san:'#3DDC84',mal:'#E06A74',unc:'#3DDC84',blk:'#E06A74',cls:'#B58CF0'};
function drawChips(t){chipG.innerHTML='';
 /* ---- import: chips 0-7 from USB (station), 8-9 from the web PC ---- */
 var SAFE=[0,1,2,4,5,6,7,9],MAL=[3,8];
 if(t>=47.2&&t<116){
  var base=V(428,-80,70),fw=clamp((t-88)/.5,0,1),fp=lerp2(base,pw(F.aud,ease(clamp((t-88)/2.6,0,1)),10),fw);
  if(t>=85.4&&t<93.2)folder(chipG,fp,clamp((t-85.4)/.6,0,1)*clamp((93.2-t)/.8,0,1));
  for(var i=0;i<10;i++){var f=IMP[i],s=f[3],col='#C9D1DA',ring=0,seal=0,op=1,p,home=lid1(i),web=i>=8;
   var t0=web?59.2:47.2+i*0.12,t1=web?63.6:52.4,path=web?F.web:F.st;
   if(t<t0)continue;
   var u=ease((t-t0)/(t1-t0));p=u<1?pw(path,u,10):home;if(u>=1&&web===false)p=home;if(web&&u>=1)p=home;
   if(t>=68.6&&t<79.4)col=(Math.floor(t*4+i)%3===0)?'#F5A800':'#C9D1DA';
   if(t>=70&&(i===3||i===6||i===8)){var k=i===3?0:i===6?0.5:1,go=ease((t-70-k)/1.4),back=ease((t-77.6)/1.2);p=lerp2(home,[SB1[0]-14+(i%3)*10,SB1[1]-(i===6?6:0)],go*(1-back));}
   if(t>=79.6)col=CCOL[s],ring=(s==='san');
   if(s==='mal'&&t>=85.4){p=lerp2(home,fp,ease((t-85.4)/1.0));if(t>=93.2)continue;op=clamp((93.2-t)/.8,0,1);}
   if(s!=='mal'&&t>=94.6){seal=1;var k2=SAFE.indexOf(i),dep=97.4+k2*0.3;
    if(t>=dep){var tg=100.8+k2*0.3,tc=105.6+k2*0.3,ta=108.6+k2*0.3,tw=109.8+k2*0.3,tr=113.4+k2*0.3;
     if(t<tg)p=pw(IN,ease((t-dep)/(tg-dep))*0.464,10);
     else if(t<tc)p=pw(IN,0.464+0.145*((t-tg)/(tc-tg)),10);
     else if(t<ta)p=pw(IN,0.609+0.391*ease((t-tc)/(ta-tc)),10);
     else if(t<tw)p=lid2(i);
     else p=pw(F.wk,ease((t-tw)/(tr-tw)),10);
     if(t>=tr)continue;}
    else p=home;}
   chip(chipG,p,col,ring,seal,op);}}
 /* ---- export: chips E0-E9 ---- */
 if(t>=133.4&&t<200){
  var folder2=t>=153&&t<170;
  for(var j=0;j<10;j++){var e=EXP[j],s2=e[3],col2='#C9D1DA',ring2=0,seal2=0,lk=0,op2=1,pp,home2=lid2(j);
   var a0=133.4+j*0.12,a1=136.2,u2=ease((t-a0)/(a1-a0));
   if(t<a0)continue;
   pp=u2<1?pw(WKR,u2,10):home2;
   if(t>=137&&t<147)col2=(Math.floor(t*4+j)%3===0)?'#F5A800':'#C9D1DA';
   if(t>=138.4&&t<147&&(j===1||j===5||j===2)){var k3=j===1?0:j===5?.5:1,go2=ease((t-138.4-k3)/1.4),back2=ease((t-145.6)/1.2);pp=lerp2(home2,[SB2[0]-14+(j%3)*10,SB2[1]],go2*(1-back2));}
   if(t>=147)col2=CCOL[s2],ring2=(s2==='cls');
   if(s2==='blk'&&t>=153.4){pp=lerp2(home2,V(1598+((j===1)?-18:18),-20,30),ease((t-153.4)/1.2));if(t>=170)continue;}
   if(s2!=='blk'&&t>=168.8){seal2=1;var k4=[0,2,3,4,6,7,8,9].indexOf(j),d2=173.6+k4*0.3;
    if(t>=d2){var g1=177+k4*0.3,g2=182+k4*0.3,a2=185.6+k4*0.3;
     if(t<g1)pp=pw(EX,ease((t-d2)/(g1-d2))*0.406,10);
     else if(t<g2){pp=pw(EX,0.406+0.147*((t-g1)/(g2-g1)),10);if(s2==='cls'&&t>g1+2)lk=1;}
     else if(t<a2){pp=pw(EX,0.553+0.447*ease((t-g2)/(a2-g2)),10);if(s2==='cls')lk=1;}
     else{pp=lid1(j);if(s2==='cls')lk=1;
       if(t>=187.2+k4*0.25){var ku=ease((t-187.2-k4*.25)/2.6);pp=ku<1?pw(STR,ku,10):KIOSK;if(t>=192.6)continue;}}
    }else pp=home2;}
   if(s2==='cls'&&t>=147&&t<167.8)lk=0;
   chip(chipG,pp,col2,ring2,seal2,op2,lk);}
  if(folder2)folder(chipG,V(1598,-20,30),clamp((t-153.4)/.6,0,1)*clamp((170-t)/.8,0,1),'BLOCKED');
 }
 if(t>=133.2&&t<136.4)glow(chipG,WORKPC,t,'#9B6FD8');
}
/* ---------- sandbox VM windows ---------- */
var vmG=el('g',{},ui);
var VMSETS=[
 {t0:70,t1:78.6,at:[428,262,0],vms:[['VM 1 · Win 11 · Office','partner_update.xlsm',['macro runs','writes startup key','outbound connection'],1],['VM 2 · Win 10 · PDF','suspect_profile_osint.pdf',['JavaScript runs','drops payload','contacts C2 server'],1],['VM 3 · Win 11 · PDF','chain_of_custody.pdf',['opens document','no child process','no network calls'],0]]},
 {t0:138.4,t1:146.6,at:[1598,262,0],vms:[['VM 1 · Win 11 · Office','case_summary_TS.docx',['opens document','reads markings','SECRET found'],1],['VM 2 · Win 10 · Office','source_list_SECRET.xlsx',['opens workbook','reads markings','SECRET found'],1],['VM 3 · Win 11 · Office','joint_op_plan.docx',['opens document','no child process','no network calls'],0]]}];
function drawVMs(t){vmG.innerHTML='';VMSETS.forEach(function(S){if(t<S.t0||t>S.t1)return;var a=sx(cam(t),V(S.at[0],S.at[1],S.at[2])),fo=clamp((S.t1-t)/0.7,0,1);
 var ww=210,wh=158,sc=0.95;S.vms.forEach(function(v,i){var t0=S.t0+0.2+i*0.8,pp=ease((t-t0)/0.45);if(pp<=0)return;var cx=a[0]+(i-1)*(ww+16)*sc,top=a[1]+50;
  var g=el('g',{opacity:fo,transform:'translate('+cx+' '+(top+wh*sc)+') scale('+(pp*sc)+') translate(0 '+(-wh)+')'},vmG);var x=-ww/2,y=0;
  R(g,x,y,ww,wh,10,'#0F1318','#4A5562',1.5);R(g,x,y,ww,22,10,'#1D242D');R(g,x,y+12,ww,10,0,'#1D242D');
  [0,1,2].forEach(function(k){el('circle',{cx:x+14+k*13,cy:y+11,r:3.6,fill:['#B3121F','#F5A800','#3DDC84'][k]},g);});
  Tx(g,x+ww-10,y+15,'Sandbox','font:600 10px Inter;fill:#8D97A3','end');
  Tx(g,x+12,y+40,v[0],'font:700 12px Inter;fill:#E6EDF5');R(g,x+12,y+48,ww-24,20,5,'#171C23','#262E38',1);Tx(g,x+20,y+62,'running: '+v[1].slice(0,22),'font:500 11px ui-monospace,monospace;fill:#F5A800');
  var tt=t-t0;v[2].forEach(function(l,k){if(tt>1.2+k*1.5)Tx(g,x+14,y+86+k*15,'> '+l,'font:500 11px ui-monospace,monospace;fill:#B8C0CA');});
  if(tt>6){var bad=v[3];R(g,x+10,y+wh-26,ww-20,18,9,bad?'#3A1218':'#12301F',bad?'#B3121F':'#3DDC84',1.2);Tx(g,x+ww/2,y+wh-13,bad?(S.t0>100?'Secret markings':'Malicious behavior'):'Behavior: clean','font:700 11px Inter;fill:'+(bad?'#FF8A93':'#3DDC84'),'middle');}});});}
function bubRect(b,c){var a=sx(c,V(b.w3[0],b.w3[1],b.w3[2])),S=b.s,W=b.w*S,H=b.h*S,p=b.pos?b.pos(W,H):[-W/2,-90-H];var bx=a[0]+p[0],by=a[1]+p[1],cb=clamp(bx,20,1900-W),cy=clamp(by,20,1000-H);return {a:a,bx:cb,by:cy,W:W,H:H,S:S,clipped:(cb!==bx||cy!==by)};}
/* ---------- frame ---------- */
window.setTime=function(tr){
 var t=toDesign(tr);var c=cam(t);world.setAttribute('transform','translate(960 540) scale('+c[2]+') translate('+(-c[0])+' '+(-c[1])+')');
 dots.forEach(function(d){var on=flowOn(FNAME[d.fi],t);var u=((t*0.28)+d.ph)%1;var p=dotPos(d,u);d.c.setAttribute('cx',p[0]);d.c.setAttribute('cy',p[1]);d.c.setAttribute('r',5/c[2]*1.2);d.c.setAttribute('opacity',on);});
 /* station USB: arrives 33-35.6, written/handed off in chapter 2 */
 if(usbG){var u=ease((t-33.8)/1.8),op=1,tx=0,ty=0;if(t<30)op=1;else if(t<33)op=0;else if(t<33.8)op=clamp((t-33)/0.8,0,1);
  if(t>=30&&t<35.6){tx=(1-u)*-60;ty=(1-u)*-40;}
  if(t>=201.4){var d=V(EXT_AT[0]-20,EXT_AT[1]+6,22),b=V(96,234,205),h=ease((t-201.4)/2.6);tx=(d[0]-b[0])*h;ty=(d[1]-b[1])*h-(Math.sin(h*Math.PI)*30);}
  usbG.setAttribute('transform','translate('+tx+' '+ty+')');usbG.setAttribute('opacity',op*clamp((208.4-t)/1.0,0,1));}
 extG.setAttribute('opacity',clamp((t-199.6)/1.2,0,1)*clamp((208.4-t)/1.0,0,1));
 if(usbG&&!usbG.__home){usbG.__home=[usbG.parentNode,usbG.nextSibling];}
 if(usbG){var wantTop=t>=201.4;if(wantTop&&usbG.parentNode!==world)world.appendChild(usbG);else if(!wantTop&&usbG.parentNode!==usbG.__home[0])usbG.__home[0].insertBefore(usbG,usbG.__home[1]);}
 if(usbG){var ub=usbG.querySelector('.usb-badge');if(ub)ub.setAttribute('opacity',clamp(1-(t-104)/1.2,0,1));}
 capG.innerHTML='';
 CAPS.forEach(function(cp){var o=fadeIO(t,cp[0],cp[1]);if(o<=0)return;
  var g=el('g',{opacity:o},capG);el('rect',{x:60,y:900,width:820,height:104,rx:10,fill:'#0B0D10','fill-opacity':.78,stroke:'#F5A800','stroke-opacity':.55},g);
  el('rect',{x:60,y:900,width:6,height:104,fill:'#F5A800'},g);
  el('text',{x:90,y:944,style:'font:700 30px Inter;fill:#F5F7FA'},g,cp[2]);el('text',{x:90,y:980,style:'font:400 19px Inter;fill:#B8C0CA'},g,cp[3]);});
 banG.innerHTML='';
 BANNERS.forEach(function(b){var o=fadeIO(t,b[0],b[1],0.4);if(o<=0)return;var sh=(1-clamp((t-b[0])/0.6,0,1))*40;
  var g=el('g',{opacity:o,transform:'translate('+(-sh)+' 0)'},banG);el('rect',{x:0,y:760,width:1100,height:150,fill:'#0B0D10','fill-opacity':.86},g);el('rect',{x:0,y:760,width:10,height:150,fill:'#F5A800'},g);
  el('text',{x:60,y:812,style:'font:700 22px Inter;fill:#F5A800;letter-spacing:.3em'},g,b[2]);el('text',{x:60,y:880,style:'font:700 64px Inter;fill:#F5F7FA'},g,b[3]);});
 var ca=clamp((t-207)/0.8,0,1)*clamp((211.6-t)/0.6,0,1);closeA.setAttribute('opacity',ca);
 [0,1,2,3].forEach(function(i){var g=closeA.querySelector('.cl'+i);g.setAttribute('opacity',clamp((t-207.2-i*0.9)/0.5,0,1));});
 closeB.setAttribute('opacity',clamp((t-211.4)/0.8,0,1));
 riskG.innerHTML='';var ro=fadeIO(t,RISK[0],RISK[1],0.7);
 if(ro>0){var g=el('g',{opacity:ro},riskG);el('rect',{x:0,y:0,width:1920,height:1080,fill:'#0B0D10','fill-opacity':.86},g);
  el('text',{x:960,y:560,'text-anchor':'middle',style:'font:700 50px Inter;fill:#F5F7FA'},g,RISK[2]);el('rect',{x:760,y:590,width:400,height:4,fill:'#B3121F'},g);}
 drawChips(t);drawVMs(t);
 bubG.innerHTML='';
 BUB.forEach(function(b,bi){var o=fadeIO(t,b.t0,b.t1,0.4);if(o<=0)return;var q=bubRect(b,c);
  var g=el('g',{opacity:o,'data-i':bi},bubG);
  var N=[clamp(q.a[0],q.bx,q.bx+q.W),clamp(q.a[1],q.by,q.by+q.H)],dx=q.a[0]-N[0],dy=q.a[1]-N[1],L=Math.hypot(dx,dy);
  if(L>12){var ux=dx/L,uy=dy/L,px=-uy,py=ux;el('line',{x1:N[0],y1:N[1],x2:q.a[0]-ux*14,y2:q.a[1]-uy*14,stroke:'#F5A800','stroke-width':2.5},g);
   el('path',{d:'M'+q.a[0]+' '+q.a[1]+'L'+(q.a[0]-ux*16+px*7)+' '+(q.a[1]-uy*16+py*7)+'L'+(q.a[0]-ux*16-px*7)+' '+(q.a[1]-uy*16-py*7)+'z',fill:'#F5A800'},g);}
  var bg=el('g',{transform:'translate('+q.bx+' '+q.by+') scale('+q.S+')'},g);
  el('rect',{x:0,y:0,width:b.w,height:b.h,rx:12,fill:'#12161C',stroke:'#F5A800','stroke-width':2},bg);
  var ct=el('g',{class:'ct'},bg);
  (DRAW[b.draw]||DRAW.dest)(ct,0,0,b.w,b.h,t-b.t0);});
};
window.__check=function(){var out=[];
 var CAPR=[60,900,880,1004];
 BUB.forEach(function(b,bi){var iss=[],mid=(b.t0+b.t1)/2,n=14,c0=cam(b.t0+0.4),md=0;
  for(var k=0;k<=n;k++){var tt=b.t0+0.4+(b.t1-b.t0-0.8)*k/n,cc=cam(tt);md=Math.max(md,Math.abs(cc[0]-c0[0]),Math.abs(cc[1]-c0[1]),Math.abs(cc[2]-c0[2])*400);}
  if(md>0.5)iss.push('camera moves ('+md.toFixed(1)+')');
  var q=bubRect(b,cam(mid));if(q.clipped)iss.push('clipped by screen edge');
  window.setTime(toReal(b.t1-0.5));var gi=bubG.querySelector('[data-i="'+bi+'"] .ct');
  if(gi){var bb=gi.getBBox();if(bb.y+bb.height>b.h-4)iss.push('content overflows bottom by '+(bb.y+bb.height-b.h+4).toFixed(0));if(bb.x+bb.width>b.w-2||bb.x<2)iss.push('content overflows sides');}else iss.push('not drawn');
  var act=CAPS.some(function(cp){return mid>=cp[0]&&mid<=cp[1];});
  if(act&&!(q.bx+q.W<CAPR[0]||q.bx>CAPR[2]||q.by+q.H<CAPR[1]||q.by>CAPR[3]))iss.push('overlaps caption');
  out.push({i:bi,draw:b.draw,t0:b.t0,t1:b.t1,issues:iss});});
 return out;};
window.setTime(0);window.__ready=true;window.T_END=T_END;window.D2R=toReal;
})();
