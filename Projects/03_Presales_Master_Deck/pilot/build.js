const pptxgen=require('pptxgenjs'),fs=require('fs'),path=require('path');
const ST=path.join(__dirname,'..','stills');
const pres=new pptxgen();pres.layout='LAYOUT_WIDE';pres.title='DataFlowX Technical Sales Presentation (Master, pilot)';pres.author='DataFlowX';
const BG='0B0D10',TX='F5F7FA',MU='9AA3AD',GOLD='F5A800',F='Arial';
const builds={};
function img(s,n,o){s.addImage(Object.assign({path:path.join(ST,n+'.png')},o));}
function base(i,head,msg,notes,opt){const s=pres.addSlide();s.background={color:BG};
 const w=(opt&&opt.w)||2.5;
 s.addText(head,{x:0.5,y:0.55,w,h:(opt&&opt.hh)||2.3,fontFace:F,fontSize:(opt&&opt.fs)||26,bold:true,color:TX,valign:'top',margin:0,isTextBox:true,objectName:'Title'});
 s.addText(msg,{x:0.5,y:(opt&&opt.my)||3.0,w,h:2.2,fontFace:F,fontSize:16,color:MU,valign:'top',margin:0,isTextBox:true,objectName:'Message'});
 s.addNotes(notes);return s;}
function clicks(i,list){builds[i]=list;}
// ---------- M01
{const s=pres.addSlide();s.background={color:BG};
 s.addText('What crossed your boundary today?',{x:0.7,y:0.5,w:11.9,h:1.0,fontFace:F,fontSize:40,bold:true,color:TX,margin:0,isTextBox:true,objectName:'Title'});
 const items=[['usb','A file',3.1,2.05],['gateway','A data stream',3.1,2.05],['deskpc','A remote session',2.4,2.6],['emailGateway','A mail',3.1,2.05]];
 const x0=0.7,step=3.05,names=[];
 items.forEach((it,k)=>{const x=x0+k*step+(3.0-it[2])/2,y=2.4+(2.7-it[3])/2;
  img(s,'obj_'+it[0],{x,y,w:it[2],h:it[3],objectName:'obj'+k,altText:it[1]});
  s.addText(it[1],{x:x0+k*step,y:5.35,w:3.0,h:0.45,fontFace:F,fontSize:18,color:TX,align:'center',margin:0,isTextBox:true,objectName:'lab'+k});
  names.push(['obj'+k,'lab'+k]);});
 s.addText('Something crossed your boundary today, and you know less about it than you think.',{x:0.7,y:6.3,w:11.9,h:0.6,fontFace:F,fontSize:16,color:MU,margin:0,isTextBox:true,objectName:'Message'});
 s.addNotes('TALK TRACK: Ask first, talk later. Four things light up, one after another. Ask the room how many of the four they could list from memory, with sources and destinations. Wait for the answer.\nPROOF: No statistics. The room supplies its own. Source: notes, four crossings.\nVISUAL: Four isometric objects appear one by one. (Pilot: USB = file, Unidirectional Gateway = data stream, desk PC = remote session, Secure Email Gateway = mail.)');
 clicks(1,names);}
// ---------- M04
{const s=base(2,'One topology, six products','Four zones, two gateways, and six products that decide what crossed between them.','TALK TRACK: The anchor slide. Walk it once, then do not redraw it. Name the zones left to right: Corporate, Classified, OT, and Isolated OT beyond it. Then show where files enter (Media Transfer Station), where they are judged (DFX One Platform with the Sandbox and TruCDR), and the two gateways that carry data out. Isolated OT has no network at all: a person walks in with DFX PASS.\nPROOF: Whiteboard test: a partner can redraw it in two minutes. Source: repo master map, notes.\nOBJECTION: SIPSE: Can I redraw this alone? Yes. It is the same picture on every product deck.\nOPEN: Secure Email Gateway and Secure Remote Access are not on the map yet (placement decision pending).');
 const L=[['m04_1','corp'],['m04_2','gw'],['m04_3','cls'],['m04_4','ot']];
 L.forEach(([n,t])=>img(s,n,{x:2.93,y:0.9,w:10.4,h:5.85,objectName:t,altText:'Master map layer '+t}));
 clicks(2,L.map(l=>[l[1]]));}
// ---------- M05
{const s=pres.addSlide();s.background={color:BG};
 s.addText('Unidirectional Gateway: data moves one way, enforced by hardware',{x:0.7,y:0.5,w:11.9,h:1.3,fontFace:F,fontSize:36,bold:true,color:TX,margin:0,isTextBox:true,objectName:'Title'});
 s.addText('Nothing can return. You can see it on the cable.',{x:0.7,y:1.85,w:11.9,h:0.5,fontFace:F,fontSize:18,color:MU,margin:0,isTextBox:true,objectName:'Message'});
 img(s,'obj_gateway',{x:0.9,y:2.7,w:5.2,h:3.9,objectName:'gw',altText:'DFX Unidirectional Gateway'});
 s.addShape(pres.ShapeType.line,{x:6.2,y:4.25,w:3.6,h:0,line:{color:GOLD,width:4,endArrowType:'triangle'},objectName:'fibre'});
 s.addText('one fibre, one direction',{x:6.2,y:3.8,w:3.6,h:0.35,fontFace:F,fontSize:14,color:GOLD,margin:0,isTextBox:true,objectName:'fibreLabel'});
 s.addShape(pres.ShapeType.rect,{x:6.2,y:5.3,w:3.6,h:0.7,fill:{type:'none'},line:{color:'8FA0B3',width:1.5,dashType:'dash'},objectName:'emptySlot'});
 s.addText('no return fibre',{x:6.2,y:6.1,w:3.6,h:0.35,fontFace:F,fontSize:14,color:'8FA0B3',margin:0,isTextBox:true,objectName:'emptyLabel'});
 s.addShape(pres.ShapeType.roundRect,{x:10.3,y:5.3,w:2.4,h:0.7,fill:{color:'171A1F'},line:{color:GOLD,width:1.25},rectRadius:0.1,objectName:'cc'});
 s.addText('Common Criteria EAL4+',{x:10.3,y:5.3,w:2.4,h:0.7,fontFace:F,fontSize:14,bold:true,color:TX,align:'center',valign:'middle',margin:0,isTextBox:true,objectName:'ccText'});
 s.addNotes('TALK TRACK: Two units, one fibre, one direction. Point at the missing fibre. Then say the sentence we use everywhere: the Gateway is certified Common Criteria EAL4+. Do not explain diodes for more than a minute.\nPROOF: Common Criteria EAL4+ (evidence item 1). Physical fact: no return fibre.\nOBJECTION: PECCSM: What if the box is bypassed? There is no electrical or optical return to bypass; the return side has no transmitter.\nNOTE: the empty slot has no animation (brief).');
 clicks(3,[['fibre','fibreLabel']]);}
// ---------- M08
{const s=base(4,'Follow one file','One file crosses the products and every step leaves a verdict.','TALK TRACK: The file starts at the Media Transfer Station, DFX One applies policy, the Sandbox and TruCDR process it, the Gateway transfers, the file lands in OT. Narrate one verdict per step. Clean is green, sanitized is green with a ring, blocked is dark red.\nPROOF: Master scenario. Verdict colours: clean #3DDC84, blocked #B3121F. Source: notes, portfolio.\nOBJECTION: PECITM: Where does it queue if a step is slow? Failure and queue behaviour is on the operations slide, confirmed by engineering.\nPILOT NOTE: Email Gateway step omitted because the Secure Email Gateway is not on the map; confirm.',{my:2.6});
 img(s,'m04_full',{x:2.93,y:0.9,w:10.4,h:5.85,objectName:'map',altText:'Master map'});
 const k=10.4/1920,P=(x,y)=>[2.93+x*k-0.17,0.9+y*k-0.17];
 const M=[[1,'File selected',170,330,'F5F7FA','0B0D10'],[2,'Policy applied',380,470,'F5F7FA','0B0D10'],[3,'Sandbox: clean',250,545,'3DDC84','0B0D10'],[4,'TruCDR: rebuilt',360,610,'3DDC84','0B0D10'],[5,'Gateway: one way',640,650,'3DDC84','0B0D10'],[6,'Delivered to OT',1150,520,'3DDC84','0B0D10']];
 const cl=[];
 M.forEach(m=>{const [x,y]=P(m[2],m[3]);
  s.addShape(pres.ShapeType.ellipse,{x,y,w:0.34,h:0.34,fill:{color:m[4]},line:{color:m[0]===4?'F5F7FA':m[4],width:m[0]===4?2.25:0.75},objectName:'v'+m[0]});
  s.addText(String(m[0]),{x,y,w:0.34,h:0.34,fontFace:F,fontSize:12,bold:true,color:m[5],align:'center',valign:'middle',margin:0,isTextBox:true,objectName:'n'+m[0]});
  cl.push(['v'+m[0],'n'+m[0]]);});
 s.addText(M.map((m,i)=>({text:m[0]+'  '+m[1],options:{breakLine:i<M.length-1}})),{x:0.5,y:4.15,w:2.4,h:2.4,fontFace:F,fontSize:13,color:'C9D1DA',valign:'top',margin:0,paraSpaceAfter:5,isTextBox:true,objectName:'legend'});
 clicks(4,cl);}
// ---------- M19
{const s=pres.addSlide();s.background={color:BG};
 s.addText('Independent assurance',{x:0.7,y:0.5,w:11.9,h:0.9,fontFace:F,fontSize:40,bold:true,color:TX,margin:0,isTextBox:true,objectName:'Title'});
 s.addText('Two products, DFX Unidirectional Gateway and DFX Secure Remote Access, hold Common Criteria EAL4+.',{x:0.7,y:1.5,w:11.9,h:0.8,fontFace:F,fontSize:20,color:MU,margin:0,isTextBox:true,objectName:'Message'});
 [['DFX Unidirectional Gateway',0.7],['DFX Secure Remote Access',6.85]].forEach(([n,x],i)=>{
  s.addShape(pres.ShapeType.roundRect,{x,y:2.7,w:5.75,h:2.1,fill:{color:'171A1F'},line:{color:GOLD,width:1.5},rectRadius:0.12,objectName:'card'+i});
  s.addText(n,{x:x+0.35,y:2.95,w:5.05,h:0.6,fontFace:F,fontSize:24,bold:true,color:TX,margin:0,isTextBox:true,objectName:'cardName'+i});
  s.addText('Common Criteria EAL4+',{x:x+0.35,y:3.7,w:5.05,h:0.5,fontFace:F,fontSize:20,color:GOLD,margin:0,isTextBox:true,objectName:'cardCC'+i});});
 s.addText('Certificates 21.0.03.0.00.0/TSE-CCCS-103 and TSE-CCCS-86. Evaluated scope per certificate: to be confirmed before use.',{x:0.7,y:5.2,w:11.9,h:0.6,fontFace:F,fontSize:16,color:'C9D1DA',margin:0,isTextBox:true,objectName:'certs'});
 s.addText('DFX Unidirectional Gateway is named as a Sample Vendor in the Gartner Cyber Physical Security Hype Cycle, 2024 to 2026. This is not an endorsement.',{x:0.7,y:6.1,w:11.9,h:0.7,fontFace:F,fontSize:12,color:MU,margin:0,isTextBox:true,objectName:'gartner'});
 s.addNotes('TALK TRACK: Name both products, show the certificate numbers, say what scope was evaluated. Add the Gartner mention in exact wording. No NIAPC claim.\nPROOF: Evidence items 1 and 2 cleared by Burak. Scope per certificate to confirm.\nOBJECTION: PECCSM: Which product holds which certificate? Scope per certificate is shown on this slide; the full list is in the evidence register.\nPILOT NOTE: product-to-certificate mapping is not stated in my sources, so the slide lists both numbers without mapping them.');}
pres.writeFile({fileName:path.join(__dirname,'raw.pptx')}).then(()=>{fs.writeFileSync(path.join(__dirname,'builds.json'),JSON.stringify(builds));console.log('written');});
