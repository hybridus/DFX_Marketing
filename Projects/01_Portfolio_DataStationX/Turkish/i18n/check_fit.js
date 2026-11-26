// Text-fit check: for sample times, every <text> inside a bubble/caption must lie inside that group's largest rect (8px margin),
// risk line must lie inside 1920, nothing may leave the viewport. Usage: node i18n/check_fit.js [film3.html dir]
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+process.cwd()+'/film3.html');await p.waitForFunction('window.__ready===true');await p.waitForTimeout(800);
const times=[];for(let t=0.5;t<164;t+=0.5)times.push(t);
const bad=[];
for(const t of times){const r=await p.evaluate(t=>{window.setTime(t);const out=[];
 ['capG','bubG','riskG'].forEach(()=>{});
 const groups=[...document.querySelectorAll('#ui > g > g')];
 groups.forEach(G=>{[...G.children].forEach(g=>{if(g.tagName!=='g')return;const rects=[...g.querySelectorAll('rect')].map(r=>({r:r.getBoundingClientRect()}));
  if(!rects.length)return;const R=rects.reduce((a,c)=>c.r.width*c.r.height>a.r.width*a.r.height?c:a).r;
  g.querySelectorAll('text').forEach(tx=>{const q=tx.getBoundingClientRect();if(!q.width)return;
   const full=R.width>=1900; // risk overlay: check viewport instead
   const L=full?40:R.left+6,Rr=full?1880:R.right-6;
   if(q.left<L||q.right>Rr||q.top<R.top-2||q.bottom>R.bottom+2)out.push({txt:tx.textContent.slice(0,50),l:Math.round(q.left),r:Math.round(q.right),boxL:Math.round(L),boxR:Math.round(Rr),over:Math.round(Math.max(L-q.left,q.right-Rr))});});});});
 return out;},t);
 r.forEach(x=>bad.push(Object.assign({t},x)));}
const seen=new Set();bad.forEach(x=>{const k=x.txt;if(seen.has(k))return;seen.add(k);console.log('OVERFLOW t='+x.t,JSON.stringify(x));});
console.log('checked',times.length,'times; distinct overflows:',seen.size);await b.close();})();
