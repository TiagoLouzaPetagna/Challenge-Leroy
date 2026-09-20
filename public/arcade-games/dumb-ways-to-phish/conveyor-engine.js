// In this game, documents and images pass; executable files and scripts go to the cutter.
export const PASS_TYPES=['PDF','XLS','JPG','DOCX','PNG','TXT'];
export const BLOCK_TYPES=['EXE','BAT','JS','CMD','VBS','SCR'];
export const TYPES=[...PASS_TYPES,...BLOCK_TYPES];
export const TRACK={start:-110,end:1747,y:686,width:150,height:172};
const RULES=[['EXE','BAT'],['JS','CMD'],['VBS','EXE'],['SCR','JS'],['BAT','VBS'],['CMD','SCR']];
export function roundSettings(number){
  return {number,blocked:[...RULES[(number-1)%RULES.length]],speed:Math.min(420,170+15*(number-1)),gap:410,count:6+Math.min(4,Math.floor((number-1)/3))};
}
export function decision(blocked,type,delivered){return blocked.includes(type)===delivered;}
export class ConveyorGame{
  constructor({rng=Math.random}={}){this.rng=rng;this.status='ready';this.events=[];this.files=[];this.score=0;this.lives=3;this.number=0;this.serial=0;}
  start({score=0,lives=3,round=1,rounds=Infinity}={}){this.score=score;this.lives=lives;this.lastRound=round+rounds-1;this.streak=0;this.correct=0;this.caught=0;this.serial=0;this.elapsed=0;this.events=[];this.files=[];this.nextRound(round);}
  nextRound(number){
    this.number=number;this.rule=roundSettings(number);this.status='intro';this.intro=number===1?2200:2400;this.spawned=0;this.spawnClock=0;this.files=[];
    this.queue=Array.from({length:this.rule.count},(_,i)=>{const list=i%3===1?this.rule.blocked:PASS_TYPES;return list[Math.floor(this.rng()*list.length)%list.length];});
    // The first item demonstrates that doing nothing is also a valid decision.
    this.emit('round',{number,blocked:this.rule.blocked});
  }
  emit(type,data={}){this.events.push({type,...data});}
  drain(){return this.events.splice(0);}
  pause(){if(['running','intro','draining'].includes(this.status)){this.beforePause=this.status;this.status='paused';}}
  resume(){if(this.status==='paused'){this.status=this.beforePause;this.beforePause=null;}}
  stop(){this.status='ready';this.files=[];this.events=[];}
  spawn(){const type=this.queue[this.spawned++];this.files.push({id:++this.serial,type,x:TRACK.start,age:0});this.emit('spawn',{id:this.serial,type});}
  deliver(id){
    if(this.status!=='running')return false;
    const file=this.files.find(f=>f.id===id);if(!file||file.x<50||file.x>1585)return false;
    this.resolve(file,true);return true;
  }
  resolve(file,delivered){
    const index=this.files.indexOf(file);if(index<0)return;
    this.files.splice(index,1);
    const correct=decision(this.rule.blocked,file.type,delivered);
    let points=0;
    if(correct){this.correct++;this.streak++;if(delivered)this.caught++;points=100+(delivered?Math.round(80*Math.max(0,1-file.age/((TRACK.end-TRACK.start)/this.rule.speed*1000))):0);this.score+=points;}
    else{this.lives=Math.max(0,this.lives-1);this.streak=0;}
    this.emit('decision',{file:{...file},delivered,correct,points,lives:this.lives});
    if(!this.lives){this.status='over';this.emit('over');}
  }
  step(ms){
    if(!['running','intro','draining'].includes(this.status))return;
    let remaining=Math.max(0,ms);
    // Bound simulation steps so a delayed frame cannot skip a spawn or resolve twice.
    while(remaining>0&&['running','intro','draining'].includes(this.status)){
      const dt=Math.min(remaining,40);remaining-=dt;this.elapsed+=dt;
      if(this.status==='intro'){this.intro-=dt;if(this.intro<=0){this.status='running';this.spawn();}continue;}
      if(this.status==='draining'){this.drainTime-=dt;if(this.drainTime<=0){if(this.number>=this.lastRound){this.status='complete';this.emit('complete');}else this.nextRound(this.number+1);}continue;}
      this.spawnClock+=dt;
      if(this.spawned<this.queue.length&&this.spawnClock>=this.rule.gap/this.rule.speed*1000){this.spawnClock-=this.rule.gap/this.rule.speed*1000;this.spawn();}
      for(const file of [...this.files]){if(this.status!=='running')break;file.age+=dt;file.x+=this.rule.speed*dt/1000;if(file.x>TRACK.end)this.resolve(file,false);}
      if(this.status==='running'&&this.spawned===this.queue.length&&!this.files.length){this.status='draining';this.drainTime=1000;}
    }
  }
}
