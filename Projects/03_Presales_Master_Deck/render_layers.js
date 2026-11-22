const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1920,height:1080}});
fs.mkdirSync('stills',{recursive:true});
const L={'m04_1':'corp','m04_2':'gw','m04_3':'cls','m04_4':'ot,iso'};
for(const [n,l] of Object.entries(L)){await p.goto('file://'+process.cwd()+'/scenes.html?l='+l);await p.waitForTimeout(300);await p.screenshot({path:'stills/'+n+'.png',omitBackground:true});}
await p.goto('file://'+process.cwd()+'/scenes.html?l=all');await p.waitForTimeout(300);await p.screenshot({path:'stills/m04_full.png',omitBackground:true});
await b.close();console.log('ok');})();
