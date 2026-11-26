// Text-fit + census check for the Turkish build.  Usage (from Turkish/): node i18n/check_fit.js
// 1) engine __check (camera still, bubble not clipped, no content overflow) 2) every <text> inside a bubble/caption/banner lies inside its largest rect
// 3) census of all distinct on-screen strings (to spot untranslated English)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/film3.html');await p.waitForFunction('window.__ready===true',{timeout:20000});await p.waitForTimeout(800);
const T=await p.evaluate(()=>window.T_END);console.log('T_END (TR)',T,'page errors',JSON.stringify(errs));
const chk=await p.evaluate(()=>window.__check());let nb=0;chk.forEach(c=>{if(c.issues.length){nb++;console.log('CHECK',c.i,c.draw,c.issues.join('; '));}});console.log('bubble checks',chk.length,'with issues',nb);
const bad=[],census=new Map();
for(let t=0.25;t<T;t+=0.25){const r=await p.evaluate(t=>{window.setTime(t);const out=[],txt=[];
 document.querySelectorAll('#ui text, #world text').forEach(x=>{if(x.textContent.trim())txt.push(x.textContent.trim());});
 const groups=[...document.querySelectorAll('#ui > g > g')];
 groups.forEach(G=>{[...G.children].forEach(g=>{if(g.tagName!=='g')return;const rects=[...g.querySelectorAll('rect')].map(r=>({r:r.getBoundingClientRect()}));
  if(!rects.length)return;const R=rects.reduce((a,c)=>c.r.width*c.r.height>a.r.width*a.r.height?c:a).r;
  const tl=[...g.querySelectorAll('text')].map(x=>({s:x.textContent,q:x.getBoundingClientRect()})).filter(o=>o.q.width);
  for(let i=0;i<tl.length;i++)for(let j=i+1;j<tl.length;j++){const a=tl[i].q,c=tl[j].q;if(a.left<c.right-1&&c.left<a.right-1&&a.top<c.bottom-3&&c.top<a.bottom-3)out.push({txt:'COLLIDE: '+tl[i].s.slice(0,30)+' | '+tl[j].s.slice(0,30),l:0,r:0,boxL:0,boxR:0,over:0});}
  g.querySelectorAll('text').forEach(tx=>{const q=tx.getBoundingClientRect();if(!q.width)return;
   const full=R.width>=1900;const L=full?40:R.left+6,Rr=full?1880:R.right-6;
   if(q.left<L||q.right>Rr||q.top<R.top-2||q.bottom>R.bottom+2)out.push({txt:tx.textContent.slice(0,60),l:Math.round(q.left),r:Math.round(q.right),boxL:Math.round(L),boxR:Math.round(Rr),over:Math.round(Math.max(L-q.left,q.right-Rr))});});});});
 return {out,txt};},t);
 r.out.forEach(x=>bad.push(Object.assign({t},x)));r.txt.forEach(s=>{if(!census.has(s))census.set(s,t);});}
const seen=new Set();bad.forEach(x=>{if(seen.has(x.txt))return;seen.add(x.txt);console.log('OVERFLOW t='+x.t,JSON.stringify(x));});
console.log('distinct overflows:',seen.size);
require('fs').writeFileSync('i18n/census.txt',[...census.entries()].map(([s,t])=>t.toFixed(2)+'\t'+s).join('\n'));
console.log('census strings',census.size,'-> i18n/census.txt');await b.close();})();
