// prints window.T_END (real film length in seconds) of ./film3.html
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+process.cwd()+'/film3.html');await p.waitForFunction('window.__ready===true',{timeout:20000});
console.log(await p.evaluate(()=>window.T_END));await b.close();})();
