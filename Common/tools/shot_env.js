const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/environment.html');await p.screenshot({path:'environment.png'});
console.log('errors',JSON.stringify(errs));await b.close();})();
