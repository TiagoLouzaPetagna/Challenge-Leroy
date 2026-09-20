// Real suffixes, checked against IANA, Registro.br and DNS.PT.
// Addresses are fictional game labels; they are never opened or requested.
export const SUFFIXES=['com','co','net','org','pt','com.br','com.pt','net.br','org.br','info','biz','io','me'];
export const NAMES=['pombocorreio','pombopostal','correiodopombo','pombomail','pombograma','pombopombo','pomboninho','pombovoa','pombocarta','pombomensagem','pomborota','pombopena','pomboposte','pomboposto','pombovoo','pombopapo'];
const pick=(items,rng)=>items[Math.min(items.length-1,Math.floor(rng()*items.length))];
const shuffle=(items,rng)=>{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.min(i,Math.floor(rng()*(i+1)));[a[i],a[j]]=[a[j],a[i]];}return a;};
const NEAR={com:['co','com.br','com.pt'],co:['com','io'],net:['net.br','org'],org:['org.br','net'],pt:['com.pt','co'],'com.br':['com.pt','com'],'com.pt':['com.br','pt'],'net.br':['org.br','net'],'org.br':['net.br','org'],info:['io','biz'],biz:['info','com'],io:['co','info'],me:['net','co']};
export function letterVariants(name,hard=false){
 const variants=new Set();
 const replacements={o:'0',i:'l',l:'i',m:'rn',b:'d',n:'m'};
 for(let i=0;i<name.length;i++){
  if(replacements[name[i]])variants.add(name.slice(0,i)+replacements[name[i]]+name.slice(i+1));
  if(!hard||i>2){
   variants.add(name.slice(0,i)+name[i]+name.slice(i));
   if(i>1)variants.add(name.slice(0,i)+name.slice(i+1));
  }
 }
 if(!hard)for(let i=1;i<name.length-1;i++)if(name[i]!==name[i+1])variants.add(name.slice(0,i)+name[i+1]+name[i]+name.slice(i+2));
 variants.delete(name);return [...variants];
}
export function makeRound(n,rng=Math.random,previousTarget=''){
 const possibleNames=NAMES.filter(name=>!previousTarget.startsWith(name+'.'));
 const name=pick(possibleNames,rng),suffix=pick(SUFFIXES,rng),target=`${name}.${suffix}`;
 const typo=pick(letterVariants(name,n>=6),rng)+'.'+suffix;
 const tld=name+'.'+pick(NEAR[suffix],rng);
 const options=shuffle([target,typo,tld],rng);
 return {target,options,correctIndex:options.indexOf(target),duration:Math.max(3000,9000-(n-1)*220)};
}
export class LinkGame{
 constructor(rng=Math.random){this.rng=rng;this.status='ready';this.score=0;this.lives=3;this.round=0;this.correct=0;this.events=[];this.remaining=0;this.elapsed=0;this.reaction=null;}
 start({score=0,lives=3,round=1,rounds=Infinity}={}){this.score=score;this.lives=lives;this.correct=0;this.events=[];this.rule=null;this.lastRound=round+rounds-1;this.nextRound(round);}
 nextRound(n){this.round=n;this.rule=makeRound(n,this.rng,this.rule?.target);this.remaining=this.rule.duration;this.elapsed=0;this.reaction=null;this.status='running';this.events.push({type:'round'});}
 choose(index){if(this.status!=='running'||!Number.isInteger(index)||index<0||index>2)return false;this.resolve(index);return true;}
 resolve(index){
  const good=index===this.rule.correctIndex,points=good?100+Math.round(80*this.remaining/this.rule.duration):0;
  this.score+=points;if(good)this.correct++;else this.lives--;
  this.reaction={bird:index,good,age:0};this.status='draining';this.clock=1900;
  this.events.push({type:'decision',good,index,points,timeout:index===null});
 }
 pause(){if(['running','draining'].includes(this.status)){this.beforePause=this.status;this.status='paused';}}
 resume(){if(this.status==='paused')this.status=this.beforePause;}
 stop(){this.status='ready';this.events=[];this.reaction=null;}
 drain(){return this.events.splice(0);}
 step(ms){
  if(this.status==='draining'){
   this.reaction.age+=ms;this.clock-=ms;
   if(this.clock<=0){if(this.lives===0){this.status='over';this.events.push({type:'over'});}else if(this.round>=this.lastRound){this.status='complete';this.events.push({type:'complete'});}else this.nextRound(this.round+1);}return;
  }
  if(this.status!=='running')return;
  this.elapsed+=ms;this.remaining=Math.max(0,this.remaining-ms);
  if(this.remaining===0)this.resolve(null);
 }
}
