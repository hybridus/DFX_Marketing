const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1600,height:900}});
for(const l of ['core','estate','log','all']){await p.goto('file://'+process.cwd()+'/integration.html?l='+l);await p.waitForFunction('window.__ok');await p.screenshot({path:'stills/int_'+l+'.png',omitBackground:true});}
await b.close();console.log('ok');})();
