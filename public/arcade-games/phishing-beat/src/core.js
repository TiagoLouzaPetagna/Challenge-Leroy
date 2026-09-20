/* V10 pure rules: six fixed audiovisual stages; no sound laboratory. */
(function(root,factory){const rhythm=typeof module==='object'&&module.exports?require('../data/rhythms.js'):root.PBRhythms;const core=factory(rhythm);if(typeof module==='object'&&module.exports)module.exports=core;else root.PBCore=core;})(typeof globalThis!=='undefined'?globalThis:this,(Rhythms)=>{
'use strict';
function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
function shuffled(items,random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function buildSigns(count,random){const bad=Math.ceil(count/2);let signs=[];for(let tries=0;tries<200;tries++){signs=shuffled(Array.from({length:count},(_,i)=>i<bad),random);if(!signs.some((s,i)=>i>=3&&s===signs[i-1]&&s===signs[i-2]&&s===signs[i-3]))break;}return signs;}
function buildEvents(data,seed,training=false,trackId='passo'){
 const random=rng(seed),timeline=Rhythms.timeline(trackId,training),used=new Map(),signs=buildSigns(timeline.events.length,random);let lastCats=[];
 return timeline.events.map((slot,i)=>{
  const desiredCategory=trackId==='resposta'?(i%2===0?'domain':'sender'):null;
  let pool=data.cases.filter(c=>c.track===trackId&&(!desiredCategory||c.category===desiredCategory)&&c.threat===signs[i]&&slot.levels.includes(c.level));
  if(!pool.length)pool=data.cases.filter(c=>c.track===trackId&&(!desiredCategory||c.category===desiredCategory)&&c.threat===signs[i]);
  const minimum=Math.min(...pool.map(c=>used.get(c.id)||0));const eligible=pool.filter(c=>(used.get(c.id)||0)===minimum);const c=eligible[Math.floor(random()*eligible.length)];
  used.set(c.id,(used.get(c.id)||0)+1);lastCats.push(c.category);
  return {...c,...slot,resolved:false,result:null};
 });
}
class Run{
 constructor(data,{seed=Date.now()>>>0,training=false,offset=0,trackId='passo'}={}){
  this.seed=seed>>>0;this.training=!!training;this.offset=Math.max(-250,Math.min(250,Number(offset)||0));this.data=data;
  this.track=Rhythms.get(trackId);this.bpm=this.track.bpm;this.beat=60/this.bpm;this.events=buildEvents(data,this.seed,this.training,this.track.id);this.duration=this.training?40:60;
  this.score=0;this.combo=0;this.maxCombo=0;this.tp=0;this.tn=0;this.fp=0;this.fn=0;this.perfect=0;this.good=0;this.offbeat=0;this.ended=false;this.completed=false;this.endTime=null;
 }
 get errors(){return this.fp+this.fn;}get lives(){return this.training?Infinity:Math.max(0,3-this.errors);}
 eventAt(t){let found=null;for(const e of this.events){if(t>=e.readAt&&t<=e.closeAt)found=e;}return found;}
 displayAt(t){let e=null;for(const x of this.events){if(t>=x.readAt)e=x;else break;}return e;}
 resolve(e,result,t,deltaMs=null){if(e.resolved||this.ended)return null;e.resolved=true;e.result=result;e.decidedAt=t;e.deltaMs=deltaMs;const correct=['perfect','good','offbeat','ok'].includes(result);if(e.threat){if(correct)this.tp++;else this.fn++;}else{if(result==='ok')this.tn++;else this.fp++;}if(correct)this.score+=100;if(result==='perfect'){this.perfect++;this.score+=50;}if(result==='good'){this.good++;this.score+=25;}if(result==='offbeat')this.offbeat++;if(correct&&result!=='offbeat')this.combo++;else this.combo=0;this.maxCombo=Math.max(this.maxCombo,this.combo);if(this.lives===0){this.ended=true;this.endTime=t;}return {event:e,result,correct,deltaMs};}
 advance(t){const resolved=[];if(this.ended)return resolved;for(const e of this.events){if(!e.resolved&&t>e.closeAt){const r=this.resolve(e,e.threat?'miss':'ok',e.closeAt);if(r)resolved.push(r);}if(this.ended)break;}if(!this.ended&&t>=this.duration){this.ended=true;this.completed=true;this.endTime=this.duration;}return resolved;}
 report(t){if(this.ended)return null;const e=this.eventAt(t);if(!e||e.resolved)return null;if(!e.threat)return this.resolve(e,'false_positive',t);const deltaMs=(t-e.hitAt)*1000-this.offset;const p=this.training?130:80,g=this.training?320:190;const result=Math.abs(deltaMs)<=p+1e-5?'perfect':Math.abs(deltaMs)<=g+1e-5?'good':'offbeat';return this.resolve(e,result,t,deltaMs);}
 summary(){const n=this.tp+this.tn+this.fp+this.fn,phish=this.tp+this.fn,legit=this.tn+this.fp;return {version:'10.0.0',track:this.track.name,trackId:this.track.id,content:this.track.content,bpm:this.bpm,mode:this.training?'training':'track',seed:this.seed,completed:this.completed,score:this.score,maxCombo:this.maxCombo,resolved:n,total:this.events.length,seconds:this.endTime,tp:this.tp,tn:this.tn,fp:this.fp,fn:this.fn,perfect:this.perfect,good:this.good,offbeat:this.offbeat,decisions:n?100*(this.tp+this.tn)/n:null,detection:phish?100*this.tp/phish:null,falsePositiveRate:legit?100*this.fp/legit:null,rhythm:this.tp?100*(this.perfect+this.good)/this.tp:null,offset:this.offset,review:this.events.filter(e=>e.resolved&&['false_positive','miss','offbeat'].includes(e.result)).map(e=>({id:e.id,primary:e.primary,secondary:e.secondary,host:e.primary,category:e.category,result:e.result,reason:e.reason,pattern:e.pattern,deltaMs:e.deltaMs,expected:e.threat?'report':'pass'}))};}
}
return {Run,buildEvents,rng,shuffled};
});
