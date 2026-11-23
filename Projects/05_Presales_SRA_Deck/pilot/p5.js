// ---- 31 Close
{const s=ns(K+'YOUR NEXT STEP','Your remote access crossing, and a two-week trial','One real application pair, a written charter, and success criteria you define.',
 NOTE('Close on the plan. Draw the Boundary Map for their remote access: who connects, to what, across which networks. Then the two-week trial with its own charter and one real application pair. Success is that the application works unchanged through the SM and CM. Set the date and stop.','The trial uses a real application pair. The customer writes the success criteria.'),{});
 const P=scene(s,'sra_core',0.3,1.95,6.2,3.2);bcap(s,P,'b',SKIP);
 const S=[['1','Boundary Map','List your remote access crossings and choose the first one.'],['2','Two-week trial','One real application pair, with its own charter.'],['3','Success criteria','Written by you. The application works unchanged.']];const names=[];
 S.forEach((st,k)=>{const y=2.0+k*1.05;s.addShape(pres.ShapeType.ellipse,{x:6.9,y,w:0.75,h:0.75,fill:{color:GOLD},line:{color:GOLD,width:1},objectName:'c'+k});T(s,st[0],{x:6.9,y,w:0.75,h:0.75,fontSize:24,bold:true,color:'0B0D10',align:'center',valign:'middle',objectName:'cn'+k});
  T(s,[{text:st[1],options:{bold:true,fontSize:20,breakLine:true}},{text:st[2],options:{fontSize:14,color:STEEL}}],{x:7.85,y:y-0.05,w:4.8,h:0.9,valign:'middle',objectName:'ct'+k});names.push(['c'+k,'cn'+k,'ct'+k]);});
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:5.3,w:11.9,h:0.8,fill:{color:CARD},line:{color:GOLD,width:1.5},rectRadius:0.1,objectName:'sum'});
 T(s,[{text:'Users keep working.  ',options:{bold:true,color:GOLD,fontSize:18}},{text:'No route exists between the networks.',options:{fontSize:16}}],{x:1.0,y:5.3,w:11.3,h:0.8,valign:'middle',objectName:'sumt'});names.push(['sum','sumt']);
 s.addShape(pres.ShapeType.roundRect,{x:0.7,y:6.25,w:11.9,h:0.65,fill:{color:GOLD},line:{color:GOLD,width:1},rectRadius:0.1,objectName:'nm'});
 T(s,'Next meeting: [date]. We choose the application pair and write the charter.',{x:1.0,y:6.25,w:11.3,h:0.65,fontSize:18,bold:true,color:'0B0D10',valign:'middle',objectName:'nmt'});names.push(['nm','nmt']);
 cl(N,names);}
pres.writeFile({fileName:path.join(__dirname,'raw.pptx')}).then(()=>{fs.writeFileSync(path.join(__dirname,'builds.json'),JSON.stringify(builds));console.log('slides',N);});
