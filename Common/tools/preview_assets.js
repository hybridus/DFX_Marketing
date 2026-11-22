/* Render preview sheets for every asset in Common/iso/asset-manifest.json.
   node Common/tools/preview_assets.js            all assets -> Common/iso/previews/<id>.png + _sheet.png
   node Common/tools/preview_assets.js sandbox    selected ids only
   node Common/tools/preview_assets.js --template Common/iso/templates/<file>.js <fnName>   preview an unpromoted template function (not in the manifest)
   Per asset: left = clean render at the asset's design scale, middle = returned anchors numbered (screen-space anchors only),
   right = the same asset at map scale (ISO.cam.s = 0.5, 1:1 pixels) to check stroke weights and legibility at environment size. */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
const ISO_DIR=path.join(__dirname,'..','iso'),OUT=path.join(ISO_DIR,'previews');
const manifest=JSON.parse(fs.readFileSync(path.join(ISO_DIR,'asset-manifest.json'),'utf8'));
const argv=process.argv.slice(2),ti=argv.indexOf('--template'),TPL=ti>=0?argv[ti+1]:null,ids=argv.filter(function(a,i){return ti<0||(i!==ti&&i!==ti+1);});
(async()=>{
 fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch(),p=await b.newPage({viewport:{width:1700,height:900},deviceScaleFactor:2});
 await p.setContent('<body style="margin:0;background:#0B0D10;font-family:Inter,sans-serif"></body>');
 await p.addScriptTag({path:path.join(ISO_DIR,'iso-lib.js')});
 const list=TPL?ids.map(fn=>({id:fn,fn:fn,status:'proposal',product:'PROPOSAL from template (not in iso-lib.js)',opts:{},s:2,anchor_space:'screen'})):manifest.assets.filter(a=>!ids.length||ids.includes(a.id));
 const FN=`
 window.drawAsset=function(host,a,s,anch,w,h){
  var NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.setAttribute('width',w);svg.setAttribute('height',h);
  svg.style.background='#0B0D10';host.appendChild(svg);ISO.cam={cx:0,cy:0,s:s};ISO.defs(svg);
  var fl=ISO.se('g',null,undefined,svg),g=ISO.se('g',null,undefined,svg);
  var ret=ISO.assets[a.fn](g,0,0,JSON.parse(JSON.stringify(a.opts||{})));
  var bb=g.getBBox(),pad=36,sc=Math.min((w-2*pad)/bb.width,(h-2*pad)/bb.height,s>=1?3:1);
  var tx=w/2-(bb.x+bb.width/2)*sc,ty=h/2-(bb.y+bb.height/2)*sc;
  g.setAttribute('transform','translate('+tx+' '+ty+') scale('+sc+')');
  var o=ISO.I(0,0,0);var gp=[ISO.I(-60,-60,0),ISO.I(260,-60,0),ISO.I(260,200,0),ISO.I(-60,200,0)];
  if(anch){var n=0;Object.keys(ret||{}).forEach(function(k){var v=ret[k];var pts=(Array.isArray(v)&&typeof v[0]==='number')?[v]:(Array.isArray(v)?v:[]);
   if(/entrance/.test(k)&&a.anchor_space.indexOf('MIXED')===0)return;
   pts.forEach(function(q,i){if(!q||q.length!==2)return;var x=q[0]*sc+tx,y=q[1]*sc+ty;
    var c=ISO.se('circle',{cx:x,cy:y,r:4.5,fill:'#F5A800',stroke:'#0B0D10','stroke-width':1.5},undefined,svg);
    ISO.se('text',{x:x+8,y:y-6,style:'font:600 11px Inter;fill:#F5F7FA;paint-order:stroke;stroke:#0B0D10;stroke-width:3px'},k+(pts.length>1?'['+i+']':''),svg);});});}
  return {bbox:[bb.width,bb.height],sc:sc};};`;
 await p.evaluate(FN);
 if(TPL)await p.addScriptTag({path:path.resolve(TPL)});
 for(const a of list){
  await p.evaluate(({a,def})=>{
   document.body.innerHTML='';var row=document.createElement('div');row.id='row';row.style.cssText='display:flex;gap:2px;width:1700px;height:900px;background:#10151B';document.body.appendChild(row);
   function cell(t,wp){var c=document.createElement('div');c.style.cssText='position:relative;width:'+wp+'px;height:900px';var l=document.createElement('div');l.style.cssText='position:absolute;left:16px;top:12px;color:#8D97A3;font:600 13px Inter;letter-spacing:.12em;z-index:2';l.textContent=t;c.appendChild(l);row.appendChild(c);return c;}
   var s=a.s||def.s,A=cell('CLEAN  s='+s,640),B=cell('ANCHORS',560),C=cell('MAP SCALE  s='+def.map_s+'  (1:1 px)',492);
   drawAsset(A,a,s,false,640,900);drawAsset(B,a,s,true,560,900);
   var cc=document.createElement('div');cc.style.cssText='position:absolute;left:0;top:0;width:492px;height:900px;display:flex;align-items:center;justify-content:center';C.appendChild(cc);
   var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('width',492);svg.setAttribute('height',480);cc.appendChild(svg);
   ISO.cam={cx:0,cy:0,s:def.map_s};ISO.defs(svg);var g=ISO.se('g',null,undefined,svg);ISO.assets[a.fn](g,0,0,JSON.parse(JSON.stringify(a.opts||{})));
   var bb=g.getBBox();g.setAttribute('transform','translate('+(246-(bb.x+bb.width/2))+' '+(240-(bb.y+bb.height/2))+')');
   var t=document.createElement('div');t.style.cssText='position:absolute;left:16px;bottom:14px;right:16px;color:#F5F7FA;font:700 20px Inter';t.innerHTML=a.id+(a.status!=='current'?' <span style="color:#B3121F;font-size:13px;letter-spacing:.1em">'+a.status.toUpperCase()+'</span>':'')+'<div style="font:400 13px Inter;color:#B8C0CA;margin-top:4px">'+a.product+'</div>';
   document.body.firstChild.appendChild(t);
  },{a,def:manifest.preview_defaults});
  await p.locator('#row').screenshot({path:path.join(OUT,a.id+'.png')});
  console.log('preview',a.id);
 }
 /* contact sheet of current assets */
 if(!ids.length&&!TPL){
  const cur=manifest.assets.filter(a=>a.status==='current');
  await p.evaluate(({cur,def})=>{
   document.body.innerHTML='';var W=1900,cols=4,cw=W/cols,ch=330,rows=Math.ceil(cur.length/cols);
   var sh=document.createElement('div');sh.id='sheet';sh.style.cssText='width:'+W+'px;height:'+(rows*ch+70)+'px;background:#0B0D10;position:relative';document.body.appendChild(sh);
   var t=document.createElement('div');t.style.cssText='position:absolute;left:24px;top:18px;color:#F5F7FA;font:700 22px Inter';t.innerHTML='DataFlowX isometric asset library <span style="color:#F5A800">· current assets</span>';sh.appendChild(t);
   cur.forEach(function(a,i){var c=document.createElement('div');c.style.cssText='position:absolute;left:'+((i%cols)*cw)+'px;top:'+(70+Math.floor(i/cols)*ch)+'px;width:'+cw+'px;height:'+ch+'px;border:1px solid #1A2027;box-sizing:border-box';sh.appendChild(c);
    var l=document.createElement('div');l.style.cssText='position:absolute;left:12px;bottom:10px;color:#C9D1DA;font:600 13px Inter';l.textContent=a.id;c.appendChild(l);
    drawAsset(c,a,Math.min(a.s||1.5,1.5),false,cw,ch-26);});
  },{cur,def:manifest.preview_defaults});
  await p.setViewportSize({width:1900,height:1500});
  await p.locator('#sheet').screenshot({path:path.join(OUT,'_sheet.png')});console.log('sheet');
 }
 await b.close();})();
