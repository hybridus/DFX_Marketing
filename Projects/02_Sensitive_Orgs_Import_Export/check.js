// Popup validator: node check.js  (run from this folder after make_film3.py). Prints issues per popup.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/film3.html');await p.waitForFunction('window.__ready===true',{timeout:20000});await p.waitForTimeout(500);
const r=await p.evaluate(()=>({T:window.T_END,res:window.__check()}));
let bad=0;for(const x of r.res){if(x.issues.length){bad++;console.log('POPUP',x.i,x.draw,x.t0+'-'+x.t1,'->',x.issues.join('; '));}}
console.log('film length (s):',r.T.toFixed(1),'| popups checked:',r.res.length,'| with issues:',bad,'| page errors:',JSON.stringify(errs));await b.close();})();
