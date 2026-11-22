const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1200,height:900}});
const L=[['usb',6],['gateway',2.6],['deskpc',2.2],['emailGateway',2.6],['person2',1.8]];
for(const [a,s] of L){await p.goto('file://'+process.cwd()+'/objects.html?a='+a+'&s='+s);await p.waitForFunction('window.__ok');
 const bb=await p.evaluate('window.__bb');const m=14;
 await p.screenshot({path:'stills/obj_'+a+'.png',omitBackground:true,clip:{x:Math.max(0,bb[0]-m),y:Math.max(0,bb[1]-m),width:Math.min(1200,bb[2]+2*m),height:Math.min(900,bb[3]+2*m)}});}
await b.close();console.log('ok');})();
