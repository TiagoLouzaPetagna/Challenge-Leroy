export const REFERENCE_DOMAINS = Object.freeze([
  {brand:'GOOGLE',domain:'google.com'},
  {brand:'MICROSOFT',domain:'microsoft.com'},
  {brand:'APPLE',domain:'apple.com'},
  {brand:'LEROY MERLIN',domain:'leroymerlin.com.br'},
]);

// Only the four reference domains and hosts beneath them pass in this game.
// This is an allowlist for the exercise, not a verdict about live websites.
export function isReferenceHost(brand,hostname){
  const reference=REFERENCE_DOMAINS.find(item=>item.brand===brand)?.domain;
  return Boolean(reference&&(hostname===reference||hostname.endsWith(`.${reference}`)));
}

const subdomains=[
  {brand:'GOOGLE',domain:'accounts.google.com',unlockAt:4},
  {brand:'MICROSOFT',domain:'support.microsoft.com',unlockAt:4},
  {brand:'APPLE',domain:'support.apple.com',unlockAt:8},
  {brand:'LEROY MERLIN',domain:'www.leroymerlin.com.br',unlockAt:8},
];

// Altered addresses are illustrative examples, not a list of active phishing sites.
const examples=[
  {brand:'GOOGLE',domain:'gooogle.com',why:'Uma letra o extra muda google.com.',unlockAt:0},
  {brand:'GOOGLE',domain:'g00gle.com',why:'Dois zeros substituem as letras o de google.com.',unlockAt:0},
  {brand:'MICROSOFT',domain:'microssoft.com',why:'A letra s extra muda microsoft.com.',unlockAt:0},
  {brand:'MICROSOFT',domain:'micros0ft.com',why:'O número zero substitui a letra o de microsoft.com.',unlockAt:0},
  {brand:'APPLE',domain:'applle.com',why:'A letra l extra muda apple.com.',unlockAt:0},
  {brand:'APPLE',domain:'app1e.com',why:'O número 1 substitui a letra l de apple.com.',unlockAt:0},
  {brand:'LEROY MERLIN',domain:'leroymerlln.com.br',why:'A letra l substitui o i de leroymerlin.com.br.',unlockAt:0},
  {brand:'LEROY MERLIN',domain:'leroymerlin.com.pt',why:'O final .com.pt não é .com.br.',unlockAt:4},
  {brand:'GOOGLE',domain:'google.co',why:'O final .co não é o .com da lista.',unlockAt:4},
  {brand:'MICROSOFT',domain:'microsoft.net',why:'O final .net não é o .com da lista.',unlockAt:4},
  {brand:'APPLE',domain:'apple.org',why:'O final .org não é o .com da lista.',unlockAt:4},
  {brand:'GOOGLE',domain:'google.com.verificar-login.co',why:'O domínio termina em verificar-login.co, não em google.com.',unlockAt:8},
  {brand:'GOOGLE',domain:'google.conta.com.br',why:'O domínio é conta.com.br; google é apenas um subdomínio.',unlockAt:8},
  {brand:'MICROSOFT',domain:'microsoft.com.suporte.co',why:'O domínio termina em suporte.co, não em microsoft.com.',unlockAt:8},
  {brand:'MICROSOFT',domain:'login.microsoft.co',why:'O domínio é microsoft.co, não microsoft.com.',unlockAt:8},
  {brand:'APPLE',domain:'apple.com.conta.net',why:'O domínio termina em conta.net, não em apple.com.',unlockAt:8},
  {brand:'APPLE',domain:'suporte.apple.co',why:'O domínio é apple.co, não apple.com.',unlockAt:8},
  {brand:'LEROY MERLIN',domain:'leroymerlin.com.br.acesso.co',why:'O domínio termina em acesso.co, não em leroymerlin.com.br.',unlockAt:8},
  {brand:'LEROY MERLIN',domain:'leroymerlin.pedidos.com.br',why:'O domínio é pedidos.com.br; leroymerlin é apenas um subdomínio.',unlockAt:8},
];
export const SLICE_CASES = Object.freeze([
  ...REFERENCE_DOMAINS.map(({brand,domain})=>({brand,domain,danger:false,unlockAt:0,
    why:`${domain} está na lista de domínios de referência.`})),
  ...subdomains.map(({brand,domain,unlockAt})=>({brand,domain,danger:false,unlockAt,
    why:`${domain} termina no domínio de referência dessa marca.`})),
  ...examples.map(item=>({...item,danger:true})),
]);

export function segmentHitsBox(ax,ay,bx,by,box){
  const minX=box.x-box.w/2,minY=box.y-box.h/2,maxX=minX+box.w,maxY=minY+box.h;
  let lo=0,hi=1;
  for(const [p,q] of [[-(bx-ax),ax-minX],[bx-ax,maxX-ax],[-(by-ay),ay-minY],[by-ay,maxY-ay]]){
    if(p===0){if(q<0)return false;continue;}
    const t=q/p;
    if(p<0)lo=Math.max(lo,t);else hi=Math.min(hi,t);
    if(lo>hi)return false;
  }
  return true;
}

export function segmentHitsRotatedBox(ax,ay,bx,by,box){
  const c=Math.cos(box.angle||0),s=Math.sin(box.angle||0);
  const local=(x,y)=>({x:(x-box.x)*c+(y-box.y)*s,y:-(x-box.x)*s+(y-box.y)*c});
  const a=local(ax,ay),b=local(bx,by);
  return segmentHitsBox(a.x,a.y,b.x,b.y,{x:0,y:0,w:box.w,h:box.h});
}

// Extend the player's actual stroke to the paper edges. Rendering and hit testing
// can then use the same cut line even when a pointer event covers only a short span.
export function sliceLineThroughBox(ax,ay,bx,by,box){
  const c=Math.cos(box.angle||0),s=Math.sin(box.angle||0);
  const local=(x,y)=>({x:(x-box.x)*c+(y-box.y)*s,y:-(x-box.x)*s+(y-box.y)*c});
  const world=(x,y)=>({x:box.x+x*c-y*s,y:box.y+x*s+y*c});
  const a=local(ax,ay),b=local(bx,by),dx=b.x-a.x,dy=b.y-a.y;
  if(Math.hypot(dx,dy)<1)return null;
  let lo=-Infinity,hi=Infinity;
  for(const [origin,d,min,max] of [[a.x,dx,-box.w/2,box.w/2],[a.y,dy,-box.h/2,box.h/2]]){
    if(Math.abs(d)<1e-9){if(origin<min||origin>max)return null;continue;}
    const t1=(min-origin)/d,t2=(max-origin)/d;
    lo=Math.max(lo,Math.min(t1,t2));hi=Math.min(hi,Math.max(t1,t2));
    if(lo>hi)return null;
  }
  const start=world(a.x+lo*dx,a.y+lo*dy),end=world(a.x+hi*dx,a.y+hi*dy);
  return {ax:start.x,ay:start.y,bx:end.x,by:end.y};
}

export function clipStrokeAboveY(ax,ay,bx,by,limit){
  if(ay>=limit&&by>=limit)return null;
  if(ay>limit){const t=(limit-ay)/(by-ay);ax+=t*(bx-ax);ay=limit;}
  else if(by>limit){const t=(limit-ay)/(by-ay);bx=ax+t*(bx-ax);by=limit;}
  return {ax,ay,bx,by};
}

export const flightDuration=elapsed=>Math.max(2.7,4-elapsed*.02);

const STAGE_W=1672;
const choice=(items,rng)=>items[Math.min(items.length-1,Math.floor(rng()*items.length))];
const waveGap=(elapsed,rng)=>Math.max(1.9,2.55-elapsed*.012)+rng()*.85;
const waveSize=(elapsed,wave,rng)=>{
  if(wave===0)return 1;
  const roll=rng();
  if(elapsed<7)return roll<.72?1:2;
  if(elapsed<14)return roll<.36?1:2;
  return roll<.22?1:roll<.82?2:3;
};
const waveMix=(count,rng)=>{
  if(count===1)return [rng()>=.38];
  if(count===2){const roll=rng();return roll<.15?[false,false]:roll<.65?[false,true]:[true,true];}
  const mix=[true,true,false];
  for(let i=mix.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[mix[i],mix[j]]=[mix[j],mix[i]];}
  return mix;
};
export class SliceGame{
  constructor(rng=Math.random){this.rng=rng;this.status='ready';this.events=[];this.objects=[];this.stats={cut:0,missed:0,saved:0,falsePositive:0,combos:0};}
  start(options={}){
    this.status='playing';this.score=options.score??0;this._base=this.score;this.rawScore=0;this.lives=options.lives??3;
    this.elapsed=0;
    this.objects=[];this.events=[];this.nextId=1;this.wave=0;this.nextWaveAt=0;
    this.stats={cut:0,missed:0,saved:0,falsePositive:0,combos:0};this.spawnWave();
  }
  spawnWave(){
    const capacity=3-this.objects.length;
    if(capacity<=0)return false;
    const count=Math.min(capacity,waveSize(this.elapsed,this.wave,this.rng));
    const widths={1:650,2:560,3:500},heights={1:206,2:190,3:178};
    const w=widths[count],h=heights[count];
    const centers=count===1?[470+this.rng()*732]:count===2
      ?[475+this.rng()*65,1197-this.rng()*65]
      :[310+this.rng()*28,836+(this.rng()-.5)*40,1362-this.rng()*28];
    const heightsAtApex=count===1?[320+this.rng()*220]:count===2
      ?[325+this.rng()*50,505+this.rng()*45]
      :[300+this.rng()*35,425+this.rng()*35,545+this.rng()*35];
    if(count>1&&this.rng()<.5)heightsAtApex.reverse();
    const mix=waveMix(count,this.rng);
    const pool=SLICE_CASES.filter(c=>c.unlockAt<=this.elapsed&&(count<3||c.domain.length<=24));
    const used=[];
    for(const [index,lane] of heightsAtApex.entries()){
      let available=pool.filter(c=>c.danger===mix[index]&&!used.includes(c.domain));
      if(!available.length)available=pool.filter(c=>c.danger===mix[index]);
      const item=choice(available,this.rng);used.push(item.domain);
      const apexX=centers[index];
      const maxTravel=Math.min(count===1?320:count===2?230:105,
        2*(apexX-w/2-24),2*(STAGE_W-w/2-24-apexX));
      const horizontalTravel=(this.rng()<.5?-1:1)*Math.min(maxTravel,
        (count===1?190:count===2?100:45)+this.rng()*(count===1?110:count===2?120:55));
      const spin=(this.rng()<.5?-1:1)*(.6+this.rng()*.5);
      const lifetime=Math.max(2.7,Math.min(4.65,flightDuration(this.elapsed)
        +(item.domain.length>22?.3:0)+(this.rng()-.5)*.46));
      this.objects.push({id:this.nextId++,brand:item.brand,domain:item.domain,danger:item.danger,why:item.why,
        x:apexX-horizontalTravel/2,y:1040,w,h,
        lane,apexX,horizontalTravel,spin,angle:0,age:-index*(count===3?.18:.24),lifetime,resolved:false});
    }
    this.wave++;
    this.nextWaveAt=this.elapsed+waveGap(this.elapsed,this.rng);
    return true;
  }
  update(dt){
    if(this.status!=='playing')return;
    dt=Math.min(.1,Math.max(0,dt));this.elapsed+=dt;
    for(const object of this.objects){
      if(this.status!=='playing')break;
      if(object.resolved)continue;
      object.age+=dt;if(object.age<=0)continue;
      const p=Math.min(1,object.age/object.lifetime);
      object.x=object.apexX+object.horizontalTravel*(p-.5);
      const startY=1000+object.h/2,drop=startY-object.lane;
      object.y=startY-4*drop*p*(1-p);
      object.angle=object.spin*((p-.5)*.12+Math.sin(Math.PI*2*p)*.008);
      if(p>=1){object.resolved=true;this.resolveExit(object);}
    }
    this.objects=this.objects.filter(o=>!o.resolved);
    if(this.status!=='playing')return;
    if(this.elapsed>=this.nextWaveAt)this.spawnWave();
  }
  strike(){this.lives=Math.max(0,this.lives-1);if(!this.lives){this.status='over';this.events.push({kind:'over'});}}
  resolveExit(object){
    if(object.danger){this.rawScore-=15;this.stats.missed++;this.events.push({kind:'missed',object:{...object}});this.strike();}
    else{this.rawScore+=5;this.stats.saved++;this.events.push({kind:'saved',object:{...object}});}
    this.score=Math.max(0,this.scoreBase()+this.rawScore);
  }
  scoreBase(){return this._base??(this._base=this.score-this.rawScore);}
  cutSegment(ax,ay,bx,by,visibleY=778){
    if(this.status!=='playing'||Math.hypot(bx-ax,by-ay)<6)return [];
    const visibleStroke=clipStrokeAboveY(ax,ay,bx,by,visibleY);
    if(!visibleStroke)return [];
    const hits=[];
    for(const object of this.objects){
      if(this.status!=='playing')break;
      if(object.resolved)continue;
      if(segmentHitsRotatedBox(visibleStroke.ax,visibleStroke.ay,visibleStroke.bx,visibleStroke.by,
        {x:object.x,y:object.y,w:object.w*.95,h:object.h*.88,angle:object.angle})){
        object.resolved=true;const kind=object.danger?'cut':'falsePositive';
        this.rawScore+=object.danger?10:-30;this.stats[kind]++;
        const cutLine=sliceLineThroughBox(visibleStroke.ax,visibleStroke.ay,visibleStroke.bx,visibleStroke.by,object);
        const event={kind,object:{...object},line:{ax,ay,bx,by},cutLine};hits.push(event);this.events.push(event);
        if(!object.danger)this.strike();
      }
    }
    this.objects=this.objects.filter(o=>!o.resolved);
    this.score=Math.max(0,this.scoreBase()+this.rawScore);
    return hits;
  }
  awardCombo(hits){
    if(hits.length>=2&&hits.every(h=>h.kind==='cut')){this.rawScore+=5;this.stats.combos++;this.score=Math.max(0,this.scoreBase()+this.rawScore);this.events.push({kind:'combo'});return true;}
    return false;
  }
  drainEvents(){return this.events.splice(0);}
}
