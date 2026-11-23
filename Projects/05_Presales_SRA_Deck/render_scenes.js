const {chromium}=require('playwright');const fs=require('fs');const {execSync}=require('child_process');
const names=process.argv.slice(2);
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1600,height:900}});
for(const n of names){p.on('pageerror',e=>console.log('ERR',n,e.message));
await p.goto('file://'+process.cwd()+'/scenes.html?s='+n);await p.waitForFunction('window.__ok',{timeout:8000});
await p.screenshot({path:'stills/sra_'+n+'.png',omitBackground:true});fs.writeFileSync('stills/sra_'+n+'.json',JSON.stringify(Object.assign(await p.evaluate('window.__A'),{_blocks:await p.evaluate('window.__B')})));}
await b.close();console.log('ok');})();
