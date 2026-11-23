const pptxgen=require('pptxgenjs'),fs=require('fs'),path=require('path');
const ST=path.join(__dirname,'..','stills');
const pres=new pptxgen();pres.layout='LAYOUT_WIDE';pres.title='DataFlowX Technical Sales Presentation: DFX Unidirectional Gateway';pres.author='DataFlowX';
const BG='0B0D10',TX='F5F7FA',MU='9AA3AD',GOLD='F5A800',F='Arial',CARD='171A1F',RED='B3121F',GRN='3DDC84',STEEL='C9D1DA',GREY='8FA0B3';
const BL={Corp:'4F8FC9',Cls:'9B6FD8',OT:'2CC4D9'};
const LOGO=path.join(__dirname,'..','..','..','Common','brand','logo-dark-bg.png');
pres.defineSlideMaster({title:'MASTER',background:{color:BG},objects:[{image:{path:LOGO,x:11.55,y:7.02,w:1.25,h:0.272}}],slideNumber:{x:0.5,y:7.02,w:0.6,h:0.3,color:MU,fontSize:10,fontFace:F}});
const builds={};let N=0;
function png(n){const b=fs.readFileSync(path.join(ST,n+'.png'));return [b.readUInt32BE(16),b.readUInt32BE(20)];}
function img(s,n,x,y,w,h,name){const [pw,ph]=png(n),r=pw/ph;let W=w,H=w/r;if(H>h){H=h;W=h*r;}
 s.addImage({path:path.join(ST,n+'.png'),x:x+(w-W)/2,y:y+(h-H)/2,w:W,h:H,objectName:name||n,altText:n});}
function T(s,t,o){s.addText(t,Object.assign({fontFace:F,color:TX,margin:0,isTextBox:true},o));}
const NOTE=(talk,proof,obj)=>'TALK TRACK: '+talk+'\nPROOF: '+proof+(obj?'\nOBJECTION: '+obj:'');
function ns(kick,title,msg,note,o){o=o||{};N++;const s=pres.addSlide({masterName:'MASTER'});s.background={color:BG};
 T(s,kick,{x:0.7,y:0.22,w:11.9,h:0.3,fontSize:12,bold:true,color:GOLD,charSpacing:3,objectName:'Kicker'});
 T(s,title,{x:0.7,y:0.55,w:11.9,h:o.th||0.85,fontSize:o.fs||28,bold:true,valign:'top',objectName:'Title'});
 T(s,msg,{x:0.7,y:o.my||1.42,w:11.9,h:0.5,fontSize:16,color:MU,valign:'top',objectName:'Message'});
 s.addNotes(note);return s;}
const cl=(n,list)=>{builds[n]=list;};
function lab(s,x,y,w,t,nm){T(s,t,{x,y,w,h:0.28,fontSize:12,bold:true,color:GOLD,charSpacing:3,valign:'top',objectName:nm});}
function rowsR(s,rows,x,y,w,pitch,p,fs){const out=[];rows.forEach((r,i)=>{const yy=y+i*pitch;
 s.addShape(pres.ShapeType.line,{x,y:yy-0.06,w:0.0001,h:pitch-0.2,line:{color:GOLD,width:2.5},objectName:p+'bar'+i});
 lab(s,x+0.2,yy-0.04,w-0.2,r[0].toUpperCase(),p+'l'+i);T(s,r[1],{x:x+0.2,y:yy+0.24,w:w-0.2,h:pitch-0.55,fontSize:fs||15,valign:'top',objectName:p+'t'+i});out.push([p+'bar'+i,p+'l'+i,p+'t'+i]);});return out;}
function killer(s,txt,x,y,w,p,h){h=h||0.8;s.addShape(pres.ShapeType.roundRect,{x,y,w,h,fill:{color:'1A1608'},line:{color:GOLD,width:1.75},rectRadius:0.1,objectName:p+'k'});
 T(s,[{text:'THE KEY CAPABILITY   ',options:{bold:true,fontSize:12,color:GOLD,charSpacing:2}},{text:txt,options:{bold:true,fontSize:16}}],{x:x+0.25,y,w:w-0.5,h,valign:'middle',objectName:p+'kt'});return [p+'k',p+'kt'];}
function cards(s,items,o){const n=items.length,cols=o.cols||n,rowsN=Math.ceil(n/cols),gap=o.gap||0.25,w=(o.w-(cols-1)*gap)/cols,h=(o.h-(rowsN-1)*gap)/rowsN,out=[];
 items.forEach((it,i)=>{const cx=o.x+(i%cols)*(w+gap),cy=o.y+Math.floor(i/cols)*(h+gap),p=o.p+i;
  s.addShape(pres.ShapeType.roundRect,{x:cx,y:cy,w,h,fill:{color:CARD},line:{color:it.hi?GOLD:'2A2F36',width:it.hi?1.75:1},rectRadius:0.1,objectName:p+'c'});
  const tfz=o.tf||19,cap=Math.floor((w-0.5)/(tfz*0.0078)),two=it.t.length>cap,dy=two?0.95:0.68;
  T(s,it.t,{x:cx+0.25,y:cy+0.18,w:w-0.5,h:two?0.75:0.45,fontSize:tfz,bold:true,color:it.hi?GOLD:TX,valign:'top',objectName:p+'t'});
  T(s,it.d,{x:cx+0.25,y:cy+dy,w:w-0.5,h:h-dy-0.12,fontSize:o.df||16,color:STEEL,valign:'top',objectName:p+'d'});out.push([p+'c',p+'t',p+'d']);});return out;}
function strip(s,txt,y,p,col){s.addShape(pres.ShapeType.roundRect,{x:0.7,y,w:11.9,h:0.6,fill:{color:'10141A'},line:{color:col||'2A2F36',width:1},rectRadius:0.08,objectName:p+'s'});
 T(s,txt,{x:0.95,y,w:11.4,h:0.6,fontSize:14,color:STEEL,valign:'middle',objectName:p+'st'});return [p+'s',p+'st'];}
// scene placement: returns P(anchor,dx,dy) in slide inches
function scene(s,name,x,y,w,h){const A=JSON.parse(fs.readFileSync(path.join(ST,name+'.json'),'utf8'));img(s,name,x,y,w,h,'scene');const [px,py]=png(name),k=Math.min(w/px,h/py),ox=x+(w-px*k)/2,oy=y+(h-py*k)/2;return (n,dx,dy)=>[ox+A[n][0]*k+(dx||0),oy+A[n][1]*k+(dy||0)];}
function dot(s,P,anchor,num,p,dx,dy){const [mx,my]=P(anchor,dx||0,dy||0);s.addShape(pres.ShapeType.ellipse,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fill:{color:GOLD},line:{color:'0B0D10',width:1.5},objectName:p+'m'});T(s,num,{x:mx-0.2,y:my-0.2,w:0.4,h:0.4,fontSize:13,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:p+'mt'});return [p+'m',p+'mt'];}
function zlab(s,P,anchor,txt,col,p,dx,dy,w,al){const [x,y]=P(anchor,dx||0,dy||0);T(s,txt,{x:al==='right'?x-w:(al==='center'?x-w/2:x),y,w,h:0.3,fontSize:13,bold:true,color:col,charSpacing:2,align:al||'left',valign:'middle',objectName:p});return [p];}
function pill(s,x,y,w,txt,p,col){s.addShape(pres.ShapeType.roundRect,{x,y,w,h:0.4,fill:{color:'10141A'},line:{color:col||GOLD,width:1.25},rectRadius:0.08,objectName:p+'p'});T(s,txt,{x,y,w,h:0.4,fontSize:13,bold:true,color:col||GOLD,align:'center',valign:'middle',objectName:p+'pt'});return [p+'p',p+'pt'];}
function box(s,x,y,w,h,txt,sub,p,o){o=o||{};s.addShape(pres.ShapeType.roundRect,{x,y,w,h,fill:{color:o.fill||CARD},line:{color:o.line||'2A2F36',width:o.lw||1.25},rectRadius:0.1,objectName:p+'b'});
 T(s,sub?[{text:txt,options:{bold:true,fontSize:o.fs||15,color:o.col||TX,breakLine:true}},{text:sub,options:{fontSize:12,color:o.scol||MU}}]:[{text:txt,options:{bold:true,fontSize:o.fs||15,color:o.col||TX}}],{x:x+0.1,y,w:w-0.2,h,align:'center',valign:'middle',objectName:p+'bt'});return [p+'b',p+'bt'];}
function arrow(s,x,y,w,p,col,dash){s.addShape(pres.ShapeType.line,{x,y,w,h:0,line:{color:col||GOLD,width:3.5,endArrowType:'triangle',dashType:dash||'solid'},objectName:p});return [p];}
const K='DFX UNIDIRECTIONAL GATEWAY  |  ';
