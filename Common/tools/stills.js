const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/film3.html');await p.waitForFunction('window.__ready===true',{timeout:20000});await p.waitForTimeout(1000);
for(const t of process.argv.slice(2).map(Number)){await p.evaluate(t=>window.setTime(t),t);await p.screenshot({path:'still_'+t+'.png'});}
console.log('errors',JSON.stringify(errs));await b.close();})();
