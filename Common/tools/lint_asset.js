/* Asset lint + regression baseline for Common/iso/iso-lib.js.
   node Common/tools/lint_asset.js                 lint every manifest asset (palette, NaN, shadow group, anchors, errors)
   node Common/tools/lint_asset.js sandbox pass    lint selected ids
   node Common/tools/lint_asset.js --harvest       print the palette each asset actually uses (JSON)
   node Common/tools/lint_asset.js --write-baseline  store a hash of every asset's SVG in iso/baseline-hashes.json
   node Common/tools/lint_asset.js --check-baseline  fail if any asset's SVG differs from the stored hash (run after touching iso-lib.js)
   Exit code 1 on any violation. Needs playwright (export NODE_PATH=$(npm root -g)). */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const ISO_DIR=path.join(__dirname,'..','iso');
const manifest=JSON.parse(fs.readFileSync(path.join(ISO_DIR,'asset-manifest.json'),'utf8'));
const tokens=JSON.parse(fs.readFileSync(path.join(ISO_DIR,'tokens.json'),'utf8')).__allHex||[];
const allow=new Set(tokens.map(h=>h.toUpperCase()));
const args=process.argv.slice(2),flags=args.filter(a=>a.startsWith('--')),ids=args.filter(a=>!a.startsWith('--'));
(async()=>{
 const b=await chromium.launch(),p=await b.newPage({viewport:{width:1200,height:900}});
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
 await p.setContent('<body style="margin:0;background:#0B0D10"><svg id="s" width="1200" height="900" viewBox="0 0 1200 900"></svg></body>');
 await p.addScriptTag({path:path.join(ISO_DIR,'iso-lib.js')});
 const list=manifest.assets.filter(a=>!ids.length||ids.includes(a.id));
 const res={},fail=[];
 for(const a of list){
  const r=await p.evaluate(({a})=>{
   const svg=document.getElementById('s');svg.innerHTML='';ISO.cam={cx:600,cy:700,s:a.s||1.5};ISO.defs(svg);
   const g=ISO.se('g',null,undefined,svg);let ret,err=null;
   try{ret=ISO.assets[a.fn](g,0,0,JSON.parse(JSON.stringify(a.opts||{})));}catch(e){err=String(e);}
   const out={err:err,problems:[]};
   if(err)return out;
   const hexes={};
   g.querySelectorAll('*').forEach(el=>{
    ['fill','stroke'].forEach(k=>{const v=el.getAttribute(k);if(v&&v[0]==='#')hexes[v.toUpperCase()]=1;});
    const st=el.getAttribute('style')||'';(st.match(/#[0-9A-Fa-f]{6}\b/g)||[]).forEach(h=>hexes[h.toUpperCase()]=1);
    if(el.getAttribute('points')&&/NaN|undefined|Infinity/.test(el.getAttribute('points')))out.problems.push('bad points: '+el.getAttribute('points').slice(0,60));
    ['cx','cy','rx','ry','x1','y1','x2','y2','d','transform'].forEach(k=>{const v=el.getAttribute(k);if(v&&/NaN|undefined|Infinity/.test(v))out.problems.push('bad '+k);});
   });
   out.hexes=Object.keys(hexes).sort();
   out.refs=[];g.querySelectorAll('[fill^="url("],[stroke^="url("],[filter]').forEach(el=>{['fill','stroke','filter'].forEach(k=>{const v=el.getAttribute(k);if(v&&v.startsWith('url('))out.refs.push(v);});});
   out.refs=Array.from(new Set(out.refs)).sort();
   out.hasShadowGroup=!!g.querySelector(':scope > g[filter="url(#sh)"]');
   out.polygons=g.querySelectorAll('polygon').length;out.nodes=g.querySelectorAll('*').length;
   const fonts=[];g.querySelectorAll('text').forEach(t=>{const s=t.getAttribute('style')||'';if(!/Inter/.test(s))fonts.push(s.slice(0,40));});
   if(fonts.length)out.problems.push('text without Inter: '+fonts[0]);
   const bb=g.getBBox();out.bbox_px={w:+bb.width.toFixed(1),h:+bb.height.toFixed(1)};out.bbox_world={w:+(bb.width/(a.s||1.5)).toFixed(0),h:+(bb.height/(a.s||1.5)).toFixed(0)};
   const flat=[];(function walk(v,k){if(Array.isArray(v)&&v.length===2&&typeof v[0]==='number')flat.push([k,v]);else if(Array.isArray(v))v.forEach((x,i)=>walk(x,k+'['+i+']'));})(ret&&typeof ret==='object'?ret:{},'');
   Object.keys(ret||{}).forEach(k=>{const v=ret[k];(function w(x,n){if(Array.isArray(x)&&x.length===2&&typeof x[0]==='number'){if(!isFinite(x[0])||!isFinite(x[1]))out.problems.push('anchor '+n+' not finite');}else if(Array.isArray(x))x.forEach((y,i)=>w(y,n+'['+i+']'));})(v,k);});
   out.anchors=Object.keys(ret||{});
   out.svg=g.outerHTML;
   return out;},{a});
  if(r.err){fail.push(a.id+': threw '+r.err);res[a.id]={err:r.err};continue;}
  r.hash=crypto.createHash('sha256').update(r.svg).digest('hex').slice(0,16);delete r.svg;
  const unknown=(r.hexes||[]).filter(h=>!allow.has(h));
  if(unknown.length&&a.status==='current')r.problems.push('unregistered colors: '+unknown.join(' '));
  if(a.status==='current'&&!r.hasShadowGroup)r.problems.push('missing root <g filter="url(#sh)">');
  const miss=(a.anchors_returned||[]).filter(k=>!(r.anchors||[]).includes(k));if(miss.length)r.problems.push('manifest anchors not returned: '+miss.join(','));
  const extra=(r.anchors||[]).filter(k=>!(a.anchors_returned||[]).includes(k));if(extra.length)r.problems.push('returned anchors missing in manifest: '+extra.join(','));
  res[a.id]=r;if(r.problems.length)fail.push(a.id+': '+r.problems.join(' | '));
 }
 if(errs.length)fail.push('page errors: '+errs.join(' | '));
 const bpath=path.join(ISO_DIR,'baseline-hashes.json');
 if(flags.includes('--harvest')){const o={};Object.keys(res).forEach(k=>o[k]=res[k].hexes);console.log(JSON.stringify(o,null,1));}
 if(flags.includes('--write-baseline')){const o={};Object.keys(res).forEach(k=>o[k]=res[k].hash);fs.writeFileSync(bpath,JSON.stringify(o,null,1)+'\n');console.log('baseline written for',Object.keys(o).length,'assets');}
 if(flags.includes('--check-baseline')){const o=JSON.parse(fs.readFileSync(bpath,'utf8'));Object.keys(res).forEach(k=>{if(o[k]!==res[k].hash)fail.push(k+': SVG changed vs baseline ('+o[k]+' -> '+res[k].hash+')');});}
 if(!flags.length||flags.every(f=>f==='--check-baseline')){Object.keys(res).forEach(k=>{const r=res[k];console.log((r.problems&&r.problems.length?'FAIL ':'ok   ')+k.padEnd(18)+(r.bbox_world?(' '+r.bbox_world.w+'x'+r.bbox_world.h+'  px-per-unit-s  polys '+r.polygons+'  colors '+(r.hexes||[]).length):''));});}
 console.log(fail.length?'\nVIOLATIONS:\n - '+fail.join('\n - '):'\nALL CLEAN');
 await b.close();process.exit(fail.length?1:0);})();
