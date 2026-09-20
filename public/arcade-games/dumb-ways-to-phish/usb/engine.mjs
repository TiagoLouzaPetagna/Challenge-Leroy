export const COLORS=['coral','lilas','mostarda'];
export const SYMBOLS=[{name:'CAVEIRA',glyph:'☠',model:'coral'},{name:'CARINHA',glyph:'☺',model:'lilas'},{name:'ESTRELA',glyph:'★',model:'mostarda'},{name:'CORAÇÃO',glyph:'♥'},{name:'RAIO',glyph:'ϟ'},{name:'LUA',glyph:'☾'},{name:'OLHO',glyph:'◉'},{name:'FLOR',glyph:'✿'}];
export class GameEngine{
 constructor({random=Math.random,onEvent=()=>{}}={}){this.random=random;this.onEvent=onEvent;this.state='idle';this.actors=[];this.round=0;this.score=0;this.lives=3;this.total=Infinity;this.clock=0;this.count=2;this.duration=6;this.paused=false;this.serial=0;this.collected=0;}
 emit(type,data={}){this.onEvent({type,...data});}
 start({score=0,lives=3,round=1,rounds=Infinity}={}){this.round=round-1;this.score=score;this.lives=lives;this.total=round+rounds-1;this.collected=0;this.paused=false;this.nextRound();}
 shuffle(items){for(let i=items.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;}
 nextRound(){
  this.round++;this.clock=0;this.state='playing';this.entrant=null;this.resolution=null;
  this.waveCount=Math.min(8,this.count+Math.floor((this.round-1)/2));
  this.waveDuration=Math.max(3.2,this.duration*Math.pow(.90,this.round-1));
  // The accepted list is sampled independently of the wave, so a listed type may never arrive.
  this.accepted=this.shuffle(SYMBOLS.map((_,i)=>i)).slice(0,this.random()<.75?1:2);
  this.target=this.accepted[0];
  const symbols=Array.from({length:this.waveCount},()=>Math.floor(this.random()*SYMBOLS.length));
  symbols[Math.floor(this.random()*this.waveCount)]=this.accepted[Math.floor(this.random()*this.accepted.length)];
  this.shuffle(symbols);
  const lanes=this.shuffle(Array.from({length:this.waveCount},(_,i)=>i));
  const origins=lanes.map(lane=>this.waveCount===1?0:-.65+lane*1.30/(this.waveCount-1)+(this.random()-.5)*.02);
  let delay=.15+this.random()*.35;
  this.actors=symbols.map((symbol,i)=>{
   if(i)delay+=this.waveDuration/this.waveCount*(.55+this.random()*.35);
   return {id:++this.serial,slot:i,symbol,color:Math.floor(this.random()*COLORS.length),height:this.random()*.035,state:'pending',age:0,progress:0,startDelay:delay,
    targetX:(lanes[i]-(this.waveCount-1)/2)*.16,targetZ:.35+(lanes[i]%2)*.065,
    duration:Math.max(3.2,this.waveDuration*(.90+this.random()*.20)),startX:origins[i],startZ:1.12+this.random()*.08,hasDrive:true};
  });this.emit('round');
 }
 remove(id){if(this.state!=='playing'||this.paused)return false;const a=this.actors.find(x=>x.id===id);if(!a||!a.hasDrive||!['approach','waiting','align','insert'].includes(a.state))return false;a.hasDrive=false;a.state='search';a.age=0;if(this.entrant===id)this.entrant=null;this.collected++;this.emit('removed',{actor:a});return true;}
 resolve(actor){if(this.state!=='playing')return false;this.state='result';this.resolution=actor?this.accepted.includes(actor.symbol):false;if(this.resolution)this.score++;else this.lives--;this.resultAge=0;this.emit('resolved',{correct:this.resolution,actor});for(const a of this.actors){a.state=a.state==='pending'?'gone':'retreat';a.age=0;}return true;}
 update(dt){if(this.paused||this.state==='idle'||this.state==='finished')return;dt=Math.min(dt,.05);this.clock+=dt;
  if(this.state==='result'){for(const a of this.actors)a.age+=dt;this.resultAge+=dt;if(this.resultAge>2.0){if(this.lives<=0||this.round>=this.total){this.state='finished';this.emit('finished');}else this.nextRound();}return;}
  for(const a of this.actors){a.age+=dt;
   if(a.state==='pending'&&this.clock>=a.startDelay){a.state='approach';a.age=0;}
   if(a.state==='approach'){a.progress=Math.max(0,Math.min(1,(this.clock-a.startDelay)/a.duration));if(a.progress>=1){a.state='waiting';a.age=0;a.arrivedAt=a.startDelay+a.duration;}}
   else if(a.state==='align'&&a.age>.38){a.state='insert';a.age=0;}
   else if(a.state==='insert'&&a.age>.62){this.resolve(a);return;}
   else if(a.state==='search'&&a.age>1){a.state='retreat';a.age=0;}
   else if(a.state==='retreat'&&a.age>.6)a.state='gone';
  }
  if(this.entrant===null){const next=this.actors.filter(a=>a.state==='waiting'&&a.hasDrive).sort((a,b)=>(a.arrivedAt??0)-(b.arrivedAt??0))[0];if(next){next.state='align';next.age=0;this.entrant=next.id;this.emit('align',{actor:next});}}
  if(!this.actors.some(a=>a.hasDrive&&a.state!=='gone')&&this.actors.every(a=>['retreat','gone'].includes(a.state)))this.resolve(null);
 }
}
