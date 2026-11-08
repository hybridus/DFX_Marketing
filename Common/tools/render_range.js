const {chromium}=require('playwright');const {spawn}=require('child_process');
const [t0,t1,out]=[Number(process.argv[2]),Number(process.argv[3]),process.argv[4]];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/film3.html');await p.waitForFunction('window.__ready===true',{timeout:20000});await p.waitForTimeout(1000);
const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate','30','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','ignore','inherit']});
const n=Math.round((t1-t0)*30);const s=Date.now();
for(let i=0;i<n;i++){await p.evaluate(t=>window.setTime(t),t0+i/30);const buf=await p.screenshot({type:'png'});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('frames',n,'secs',((Date.now()-s)/1000).toFixed(1),'errors',JSON.stringify(errs));await b.close();})();
