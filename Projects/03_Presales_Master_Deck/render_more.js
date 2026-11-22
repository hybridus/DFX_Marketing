const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1600,height:900}});
// sra layers: identical canvas, then crop all to the same box
for(const l of ['base','out','in','all']){await p.goto('file://'+process.cwd()+'/sra_layers.html?l='+l);await p.waitForFunction('window.__ok');await p.screenshot({path:'stills/sra_'+l+'.png',omitBackground:true});}
const L=[['sandbox',3],['trucdr',3],['kiosk2',2],['pass',9],['platformD1',3]];
await p.setViewportSize({width:1200,height:900});
for(const [a,s] of L){await p.goto('file://'+process.cwd()+'/objects.html?a='+a+'&s='+s);await p.waitForFunction('window.__ok');
 const bb=await p.evaluate('window.__bb');const m=14;
 await p.screenshot({path:'stills/obj_'+a+'.png',omitBackground:true,clip:{x:Math.max(0,bb[0]-m),y:Math.max(0,bb[1]-m),width:Math.min(1200,bb[2]+2*m),height:Math.min(900,bb[3]+2*m)}});}
await b.close();console.log('ok');})();
