export const SIZE={w:1672,h:941};
export const AD_NAMES=['Você ganhou!','Seu PC está infectado!','Download turbo!'];
export const BLOG_CLOSE={x:1612,y:7,w:44,h:34};
export const settings=n=>({count:Math.min(9,n+2),duration:Math.max(8500,12000-(n-1)*280)});
export const closeRect=w=>({x:w.x+w.w*.902,y:w.y+w.h*.012,w:w.w*.085,h:w.h*.09});
export const contains=(r,p)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
export const closeExposed=(win,windows)=>{
 const index=windows.indexOf(win),r=closeRect(win);
 return index>=0&&!windows.slice(index+1).some(other=>r.x<other.x+other.w&&r.x+r.w>other.x&&r.y<other.y+other.h&&r.y+r.h>other.y);
};
export class PopupGame{
 constructor(rng=Math.random){this.rng=rng;this.status='ready';this.windows=[];this.events=[];this.score=0;this.lives=3;this.round=0;this.serial=0;}
 start({score=0,lives=3,round=1,rounds=Infinity}={}){this.score=score;this.lives=lives;this.lastRound=round+rounds-1;this.closed=0;this.windows=[];this.events=[];this.nextRound(round);}
 nextRound(n){
  this.round=n;this.rule=settings(n);this.status='running';this.remaining=this.rule.duration;this.clock=0;
  const shift=Math.floor(this.rng()*3);
  // The full desktop is available: each window receives fresh independent
  // coordinates. Overlapped close buttons become usable when uncovered.
  this.windows=Array.from({length:this.rule.count},(_,i)=>({id:++this.serial,type:(i+shift)%3,x:24+Math.floor(this.rng()*1178),y:52+Math.floor(this.rng()*358),w:470,h:421,age:180}));
  this.events.push({type:'round'});
 }
 pause(){if(['running','intro','draining'].includes(this.status)){this.beforePause=this.status;this.status='paused';}}
 resume(){if(this.status==='paused')this.status=this.beforePause;}
 stop(){this.status='ready';this.windows=[];this.events=[];}
 drain(){return this.events.splice(0);}
 resolve(id,kind){
  if(this.status!=='running')return false;
  const i=this.windows.findIndex(w=>w.id===id);if(i<0)return false;
  const win=this.windows[i];
  this.windows.splice(i,1);let points=0;
  if(kind==='close'){points=100+Math.round(80*Math.max(0,this.remaining/this.rule.duration));this.score+=points;this.closed++;}else this.lives--;
  this.events.push({type:'decision',kind,window:win,points});
  if(this.lives<=0){this.status='over';this.events.push({type:'over'});}
  else if(!this.windows.length){this.status='draining';this.clock=900;this.events.push({type:'clear'});}
  return true;
 }
 click(p){
  if(this.status!=='running')return;
  const win=[...this.windows].reverse().find(w=>contains(w,p));
  if(win){if(contains(closeRect(win),p)&&closeExposed(win,this.windows))this.resolve(win.id,'close');else if(p.y>win.y+win.h*.11)this.resolve(win.id,'bait');}
  else if(contains(BLOG_CLOSE,p)){
   this.lives--;this.events.push({type:'decision',kind:'blog',points:0});
   if(this.lives<=0){this.status='over';this.events.push({type:'over'});}
  }
 }
 step(ms){
  if(this.status==='draining'){this.clock-=ms;if(this.clock<=0){if(this.round>=this.lastRound){this.status='complete';this.events.push({type:'complete'});}else this.nextRound(this.round+1);}return;}
  if(this.status!=='running')return;
  this.remaining=Math.max(0,this.remaining-ms);
  if(this.remaining===0){
   // A missed round costs one shield, regardless of how many windows remain.
   const missed=this.windows.length;this.windows=[];this.lives--;
   this.events.push({type:'decision',kind:'timeout',points:0,missed});
   if(this.lives<=0){this.status='over';this.events.push({type:'over'});}
   else{this.status='draining';this.clock=1400;}
  }
 }
}
