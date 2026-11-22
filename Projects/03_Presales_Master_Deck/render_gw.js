const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1600,height:900}});
await p.goto('file://'+process.cwd()+'/gw_scene.html');await p.waitForFunction('window.__ok');
await p.screenshot({path:'stills/gw_scene.png',omitBackground:true});fs.writeFileSync('stills/gw_scene.json',JSON.stringify(await p.evaluate('window.__A')));await b.close();console.log('ok');})();
