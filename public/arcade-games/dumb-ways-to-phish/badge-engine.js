export const VISITORS=['office','courier','technician','executive','supplier'];
export const FAULTS=['photo','name','id','department'];
export const CASE_TYPES=['valid','valid','valid','valid','valid',...FAULTS];

const NAMES=['Bia Nunes','Caio Luz','Dani Reis','Eli Ramos','Ivo Lima','Lia Vaz','Nina Melo','Rui Dias','Téo Cruz','Yara Neves'];
const DEPARTMENTS=['FINANCEIRO','TECNOLOGIA','OPERAÇÕES','JURÍDICO','PESSOAS'];
const REASONS={
 photo:'A foto do crachá não era a mesma do cadastro.',
 name:'O nome do crachá não conferia com o cadastro.',
 id:'A matrícula tinha um dígito diferente.',
 department:'O setor informado não conferia.',
};

const pick=(items,rng)=>items[Math.min(items.length-1,Math.floor(rng()*items.length))];
const other=(items,value,rng)=>pick(items.filter(item=>item!==value),rng);
function shuffle(items,rng){
 const out=[...items];
 for(let i=out.length-1;i>0;i--){const j=Math.min(i,Math.floor(rng()*(i+1)));[out[i],out[j]]=[out[j],out[i]];}
 return out;
}
function alterName(name,rng){
 const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 const candidates=[...name].map((character,index)=>({character,index})).filter(item=>/[A-Za-z]/.test(item.character));
 const target=pick(candidates,rng),available=[...letters].filter(letter=>letter!==target.character.toUpperCase()),replacement=pick(available,rng);
 return name.slice(0,target.index)+replacement+name.slice(target.index+1);
}
function alterId(id,rng){
 const index=2+Math.floor(rng()*(id.length-2));
 const digit=String((Number(id[index])+1+Math.floor(rng()*8))%10);
 return id.slice(0,index)+digit+id.slice(index+1);
}
export const roundDuration=round=>Math.max(3800,8500-(round-1)*150);

export function makeBadgeRound(round=1,rng=Math.random,caseType='valid',year=new Date().getFullYear(),visitor=pick(VISITORS,rng)){
 const name=pick(NAMES,rng),department=pick(DEPARTMENTS,rng);
 const record={portrait:visitor,name,id:`P-${1000+Math.floor(rng()*9000)}`,department};
 const presented={...record};
 const valid=caseType==='valid';
 if(!valid){
  if(caseType==='photo')presented.portrait=other(VISITORS,visitor,rng);
  if(caseType==='name')presented.name=alterName(name,rng);
  if(caseType==='id')presented.id=alterId(record.id,rng);
  if(caseType==='department')presented.department=other(DEPARTMENTS,record.department,rng);
 }
 return {round,visitor,record,presented,valid,fault:valid?null:caseType,reason:valid?'Todos os dados conferiam com o cadastro.':REASONS[caseType],duration:roundDuration(round)};
}

export function badgeMatches(rule){
 const {record,presented}=rule;
 return record.portrait===presented.portrait&&record.name===presented.name&&record.id===presented.id&&record.department===presented.department;
}

export function loadNumber(storage,key,fallback=0){
 try{const value=Number(storage.getItem(key));return Number.isFinite(value)&&value>=0?Math.floor(value):fallback;}catch{return fallback;}
}

export class BadgeGame{
 constructor(rng=Math.random,year=new Date().getFullYear()){
  this.rng=rng;this.year=year;this.status='ready';this.score=0;this.lives=3;this.round=0;this.correct=0;this.remaining=0;this.elapsed=0;this.events=[];this.re=null;this.caseBag=[];this.visitorBag=[];
 }
 refill(){
  this.caseBag=shuffle(CASE_TYPES,this.rng);
  if(this.caseBag.at(-1)===this.rule?.caseType)this.caseBag.reverse();
 }
 refillVisitors(){
  this.visitorBag=shuffle(VISITORS,this.rng);
  if(this.visitorBag.at(-1)===this.rule?.visitor)this.visitorBag.reverse();
 }
 start({score=0,lives=3,round=1,rounds=Infinity}={}){this.score=score;this.lives=lives;this.correct=0;this.events=[];this.caseBag=[];this.visitorBag=[];this.rule=null;this.lastRound=round+rounds-1;this.nextRound(round);}
 nextRound(round){
  if(!this.caseBag.length)this.refill();
  if(!this.visitorBag.length)this.refillVisitors();
  const caseType=this.caseBag.pop();
  const visitor=this.visitorBag.pop();
  this.rule={...makeBadgeRound(round,this.rng,caseType,this.year,visitor),caseType};
  this.round=round;this.remaining=this.rule.duration;this.elapsed=0;this.reaction=null;this.status='running';this.events.push({type:'round'});
 }
 choose(action){if(this.status!=='running'||!['allow','block'].includes(action))return false;this.resolve(action);return true;}
 resolve(action){
  const good=action!=='timeout'&&((action==='allow')===this.rule.valid);
  const speed=Math.round(50*this.remaining/this.rule.duration),points=good?100+Math.min(250,(this.round-1)*4)+speed:0;
  if(good){this.score+=points;this.correct++;}else this.lives--;
  this.reaction={action,good,age:0,valid:this.rule.valid,fault:this.rule.fault};
  this.status='resolving';this.clock=good?1450:2300;
  this.events.push({type:'decision',action,good,points,reason:this.rule.reason});
 }
 pause(){if(['running','resolving'].includes(this.status)){this.beforePause=this.status;this.status='paused';}}
 resume(){if(this.status==='paused')this.status=this.beforePause;}
 stop(){this.status='ready';this.events=[];this.reaction=null;}
 drain(){return this.events.splice(0);}
 step(ms){
  if(!Number.isFinite(ms)||ms<=0)return;
  if(this.status==='resolving'){
   this.reaction.age+=ms;this.clock-=ms;
   if(this.clock<=0){if(this.lives<=0){this.status='over';this.events.push({type:'over'});}else if(this.round>=this.lastRound){this.status='complete';this.events.push({type:'complete'});}else this.nextRound(this.round+1);}
   return;
  }
  if(this.status!=='running')return;
  this.elapsed+=ms;this.remaining=Math.max(0,this.remaining-ms);
  if(this.remaining===0)this.resolve('timeout');
 }
}
