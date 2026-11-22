const pptxgen=require('pptxgenjs'),fs=require('fs'),path=require('path');
const ST=path.join(__dirname,'..','stills'),ROWS=JSON.parse(fs.readFileSync(path.join(__dirname,'master_rows.json'),'utf8'));
const pres=new pptxgen();pres.layout='LAYOUT_WIDE';pres.title='DataFlowX Technical Sales Presentation: Master deck';pres.author='DataFlowX';
const BG='0B0D10',TX='F5F7FA',MU='9AA3AD',GOLD='F5A800',F='Arial',CARD='171A1F',RED='B3121F',GRN='3DDC84',STEEL='C9D1DA',GREY='8FA0B3';
const BL={Corp:'4F8FC9',Cls:'9B6FD8',OT:'2CC4D9'};
const LOGO=path.join(__dirname,'..','..','..','Common','brand','logo-dark-bg.png');
pres.defineSlideMaster({title:'MASTER',background:{color:BG},objects:[{image:{path:LOGO,x:11.55,y:7.02,w:1.25,h:0.272}}],slideNumber:{x:0.5,y:7.02,w:0.6,h:0.3,color:MU,fontSize:10,fontFace:F}});
const builds={};let N=0;
function png(n){const b=fs.readFileSync(path.join(ST,n+'.png'));return [b.readUInt32BE(16),b.readUInt32BE(20)];}
function img(s,n,x,y,w,h,name){const [pw,ph]=png(n),r=pw/ph;let W=w,H=w/r;if(H>h){H=h;W=h*r;}
 s.addImage({path:path.join(ST,n+'.png'),x:x+(w-W)/2,y:y+(h-H)/2,w:W,h:H,objectName:name||n,altText:n});}
function T(s,t,o){s.addText(t,Object.assign({fontFace:F,color:TX,margin:0,isTextBox:true},o));}
function notes(id){const r=ROWS.find(r=>r[0]===id);return 'TALK TRACK: '+r[3]+'\nPROOF: '+r[4]+'\nVISUAL BRIEF (SVCGDE): '+r[5]+(r[6]?'\nOBJECTION: '+r[6].replace(' -> ','  ANSWER: '):'');}
function slide(id,o){o=o||{};const r=ROWS.find(r=>r[0]===id);N++;const s=pres.addSlide({masterName:'MASTER'});s.background={color:BG};
 if(o.left){T(s,r[1],{x:0.5,y:0.55,w:o.left,h:2.4,fontSize:o.fs||26,bold:true,valign:'top',objectName:'Title'});
  T(s,r[2],{x:0.5,y:o.my||3.1,w:o.left,h:2.4,fontSize:15,color:MU,valign:'top',objectName:'Message'});}
 else{T(s,r[1],{x:0.7,y:0.45,w:11.9,h:o.th||1.0,fontSize:o.fs||36,bold:true,valign:'top',objectName:'Title'});
  T(s,r[2],{x:0.7,y:o.my||(o.th?0.45+o.th+0.1:1.55),w:11.9,h:0.7,fontSize:18,color:MU,valign:'top',objectName:'Message'});}
 s.addNotes(notes(id));s._id=id;return s;}
const cl=(n,list)=>{builds[n]=list;};
// ---------------- Cover
{N++;const s=pres.addSlide();s.background={color:BG};
 s.addImage({path:path.join(ST,'m04_full.png'),x:4.9,y:0.7,w:8.9,h:5.0,transparency:0,objectName:'coverMap',altText:'DataFlowX isometric master map'});
 s.addImage({path:LOGO,x:0.7,y:0.7,w:3.2,h:0.696,objectName:'logo',altText:'DataFlowX'});
 T(s,'Control the Flow',{x:0.7,y:2.5,w:5.6,h:1.8,fontSize:54,bold:true,color:GOLD,valign:'top',objectName:'Title'});
 T(s,'Technical Sales Presentation',{x:0.7,y:4.35,w:5.6,h:0.6,fontSize:24,bold:true,valign:'top',objectName:'Subtitle'});
 T(s,'How DataFlowX controls every crossing between your networks',{x:0.7,y:5.0,w:5.2,h:0.9,fontSize:16,color:MU,valign:'top',objectName:'Tagline'});
 T(s,'Presenter  |  Company  |  Date',{x:0.7,y:6.7,w:8,h:0.4,fontSize:12,color:MU,objectName:'meta'});
 s.addNotes(notes('C00'));}
// ---------------- M01
{const s=slide('M01',{fs:40});const items=[['obj_usb','A file',3.1,2.05],['obj_gateway','A data stream',3.1,2.05],['obj_deskpc','A remote session',2.4,2.6],['obj_emailGateway','A mail',3.1,2.05]];const names=[];
 items.forEach((it,k)=>{img(s,it[0],0.7+k*3.05+(3.0-it[2])/2,2.4+(2.7-it[3])/2,it[2],it[3],'obj'+k);T(s,it[1],{x:0.7+k*3.05,y:5.35,w:3.0,h:0.45,fontSize:18,align:'center',objectName:'lab'+k});names.push(['obj'+k,'lab'+k]);});
cl(N,names);}
// ---------------- M02
{const s=slide('M02',{fs:28,th:1.3,my:1.8});const L=[['obj_usb','File','A supplier sends a drawing','A renamed executable'],['obj_gateway','Data stream','A system sends readings','A return channel'],['obj_deskpc','Remote session','An engineer fixes a machine','A hijacked session'],['obj_emailGateway','Mail','A customer sends an order','A spoofed sender']];const names=[];
 L.forEach((it,k)=>{const x=0.7+k*3.05;img(s,it[0],x,2.75,2.9,1.7,'o'+k);
  T(s,it[1],{x,y:4.55,w:2.9,h:0.4,fontSize:18,bold:true,align:'center',objectName:'t'+k});
  T(s,'Normal use: '+it[2],{x,y:5.0,w:2.9,h:0.6,fontSize:13,color:MU,align:'center',valign:'top',objectName:'u'+k});
  T(s,'Abuse: '+it[3],{x,y:5.65,w:2.9,h:0.6,fontSize:13,color:MU,align:'center',valign:'top',objectName:'a'+k});names.push(['o'+k,'t'+k,'u'+k,'a'+k]);});
 cl(N,names);}
// ---------------- M03
{const s=slide('M03',{fs:34,th:1.0});const lay=[['Physics','Hardware allows one direction only',GOLD,'0B0D10',5.2],['Rules','Policy decides. No matching rule, no transfer',CARD,TX,4.0],['Content','Inspection looks inside every file',CARD,TX,2.8]];const names=[];
 lay.forEach((l,k)=>{s.addShape(pres.ShapeType.roundRect,{x:0.9,y:5.15-k*1.35,w:7.6,h:1.15,fill:{color:l[2]},line:{color:GOLD,width:1.5},rectRadius:0.1,objectName:'slab'+k});
  T(s,[{text:l[0]+'  ',options:{bold:true,fontSize:22,color:l[3]}},{text:l[1],options:{fontSize:15,color:l[3]}}],{x:1.2,y:5.15-k*1.35,w:7.0,h:1.15,valign:'middle',objectName:'st'+k});names.push(['slab'+k,'st'+k]);});
 cl(N,names);}
// ---------------- M04
{const s=slide('M04',{left:2.5});T(s,[{text:'Corporate',options:{color:BL.Corp,bold:true,breakLine:true}},{text:'Classified (air-gapped)',options:{color:BL.Cls,bold:true,breakLine:true}},{text:'OT',options:{color:BL.OT,bold:true,breakLine:true}},{text:'Isolated OT (no network)',options:{color:GREY,bold:true}}],{x:0.5,y:4.9,w:2.4,h:1.5,fontSize:13,valign:'top',paraSpaceAfter:4,objectName:'zones'});const L=['m04_1','m04_2','m04_3','m04_4'];L.forEach(n=>img(s,n,2.93,0.9,10.4,5.85,n));cl(N,L.map(n=>[n]));}
