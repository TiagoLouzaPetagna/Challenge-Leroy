// Animation study only. No scoring, random domains, rounds or game state.
const W=1672,H=941;
const canvas=document.querySelector('#scene'),ctx=canvas.getContext('2d');
const timeline=document.querySelector('#timeline'),play=document.querySelector('#play');
const restart=document.querySelector('#restart'),clock=document.querySelector('#time');
const status=document.querySelector('#status'),loop=document.querySelector('#loop');
const durations={sequence:12,idle:4,success:3.6,error:3.6};
let mode='sequence',bird=0,time=0,playing=false,last=0,ready=false;
const load=name=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(`Não foi possível carregar ${name}.`));image.src=`assets/link-animation/${name}.png`;});
const makeCanvas=(w,h)=>Object.assign(document.createElement('canvas'),{width:w,height:h});
let base,blink,reactions,delivery,sideDelivery,otherReactions;
const hats=[],actors=[];
const patches={};

// Registered source poses are composited locally. The soft mask only blends
// the outer edge; eyes/beaks are always opaque to avoid doubled expressions.
function patch(image,x,y,w,h,feather=5){
  const out=makeCanvas(w,h),c=out.getContext('2d',{willReadFrequently:true});
  c.drawImage(image,x,y,w,h,0,0,w,h);
  const p=c.getImageData(0,0,w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){
    const edge=Math.min(i,j,w-1-i,h-1-j);
    p.data[(j*w+i)*4+3]*=Math.min(1,edge/feather);
  }
  c.putImageData(p,0,0);return {image:out,x,y};
}
function drawPatch(p){ctx.drawImage(p.image,p.x,p.y);}
function buildHat(index){
  if(index<2){
    const rect=index===0?[255,255,212,119]:[763,225,141,85];
    const shape=index===0?'M265 311 C261 293 280 284 305 282 C325 263 348 260 367 262 C390 262 408 272 426 283 C444 289 457 299 459 311 C461 326 454 335 440 341 L438 350 C447 354 452 360 450 365 C423 369 392 369 362 368 C324 368 291 363 267 357 L269 348 L281 337 C271 332 265 323 265 311 Z':'M774 265 C773 253 789 245 803 240 C823 228 844 231 858 239 L875 247 C891 253 896 264 894 272 C892 280 887 286 882 288 L882 296 C855 304 808 302 784 292 L785 283 C777 279 774 273 774 265 Z';
    const out=makeCanvas(rect[2],rect[3]),c=out.getContext('2d');c.translate(-rect[0],-rect[1]);c.clip(new Path2D(shape));c.drawImage(base,0,0);return {image:out,x:rect[0]+rect[2]/2,y:rect[1]+rect[3]/2};
  }
  // Trace the existing cap, including its black outline. No synthetic hat art.
  const out=makeCanvas(210,120),c=out.getContext('2d');c.translate(-1226,-258);
  c.clip(new Path2D('M1236 329 C1230 313 1240 306 1254 302 L1279 292 C1299 280 1325 266 1348 265 C1366 264 1384 269 1394 279 C1406 290 1405 301 1399 312 L1385 332 C1402 333 1421 337 1428 342 L1427 348 C1412 360 1388 368 1360 372 C1329 375 1288 368 1268 361 L1258 364 L1256 347 C1244 345 1238 340 1236 329 Z'));
  c.drawImage(base,0,0);return {image:out,x:1331,y:318};
}
function blinks(t,exclude=-1){
  const starts=[.72,1.58,2.63];
  for(let i=0;i<3;i++){
    const phase=(t-starts[i]+4)%4;
    if(i!==exclude&&(phase<.13||(i===1&&phase>.23&&phase<.34)))drawPatch(patches[`eye${i}`]);
  }
}
function success(t){
  const actor=actors[bird];blinks(t,bird);
  if(t<.22)return 'Acerto · antecipação';
  if(t<.4){drawPatch(patches[`eye${bird}`]);return 'Acerto · piscar';}
  if(t<.62){drawPatch(actor.proud);return 'Acerto · expressão orgulhosa';}
  if(t<2.65){
    drawPatch(actor.delivery);
    // Preserve the exact approved URL rather than the generated variant.
    const [x,y,w,h]=actor.text;ctx.drawImage(base,x,y,w,h,x,y,w,h);
    return 'Acerto · o pombo apresenta o envelope';
  }
  if(t<2.95){drawPatch(actor.proud);return 'Acerto · recolhe o envelope';}
  return 'Acerto · volta ao repouso';
}
function error(t){
  blinks(t,bird);
  if(t<.22)return 'Erro · antecipação';
  if(t<.36){drawPatch(patches[`eye${bird}`]);return 'Erro · susto';}
  if(t<2.95){
    drawPatch(actors[bird].startled);
    // The original cap is erased by the hatless pose before the loose sprite
    // moves. A short upward kick leads into a gravity-driven fall.
    const age=t-.36;
    const direction=bird===0?-1:1,hat=hats[bird];
    const dx=direction*110*age,dy=-235*age+640*age*age;
    ctx.save();ctx.translate(hat.x+dx,hat.y+dy);ctx.rotate(direction*age*2.8);
    ctx.drawImage(hat.image,-hat.image.width/2,-hat.image.height/2);ctx.restore();
    return age<1.2?'Erro · o boné salta e cai':'Erro · expressão de flagrante';
  }
  return 'Erro · volta ao repouso';
}
function render(){
  if(!ready)return;
  ctx.clearRect(0,0,W,H);ctx.drawImage(base,0,0,W,H);
  let text='Repouso · piscadas alternadas';
  if(mode==='idle')blinks(time);
  else if(mode==='success')text=success(time);
  else if(mode==='error')text=error(time);
  else if(time<4)blinks(time);
  else if(time<7.6)text=success(time-4);
  else if(time<11.2)text=error(time-7.6);
  else blinks(time);
  status.textContent=`${['Esquerda','Centro','Direita'][bird]} · ${text}`;
  timeline.value=time;
  const format=n=>n.toFixed(2).replace('.',',');
  clock.textContent=`${format(time)} / ${format(durations[mode])} s`;
}
function setPlaying(value){playing=value;last=performance.now();play.textContent=playing?'Pausar':'Reproduzir';}
document.querySelectorAll('[data-bird]').forEach(button=>button.addEventListener('click',()=>{
  bird=Number(button.dataset.bird);time=0;
  document.querySelectorAll('[data-bird]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  if(ready){setPlaying(true);render();}
}));
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  mode=button.dataset.mode;time=0;timeline.max=durations[mode];
  document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  if(ready){setPlaying(true);render();}
}));
play.addEventListener('click',()=>{if(time>=durations[mode])time=0;setPlaying(!playing);render();});
restart.addEventListener('click',()=>{time=0;setPlaying(true);render();});
timeline.addEventListener('input',()=>{setPlaying(false);time=Number(timeline.value);render();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlaying(false);});
function tick(now){
  if(ready&&playing){
    time+=Math.min((now-last)/1000,.1);
    if(time>=durations[mode]){
      if(loop.checked)time%=durations[mode];else{time=durations[mode];setPlaying(false);}
    }
    render();
  }
  last=now;requestAnimationFrame(tick);
}
try{
  [base,blink,reactions,delivery,sideDelivery,otherReactions]=await Promise.all(['base','blink','reactions','delivery','delivery-sides','reactions-others'].map(load));
  patches.eye0=patch(blink,258,365,199,68);
  patches.eye1=patch(blink,764,310,139,69);
  patches.eye2=patch(blink,1253,373,185,74);
  patches.proud=patch(reactions,763,294,144,218);
  patches.delivery=patch(delivery,551,282,522,543,6);
  patches.startled=patch(reactions,1145,245,386,444,8);
  actors.push(
    {proud:patch(sideDelivery,248,350,218,281),delivery:patch(sideDelivery,2,250,604,578,2),startled:patch(otherReactions,166,250,372,435),text:[139,737,368,57]},
    {proud:patches.proud,delivery:patches.delivery,startled:patch(otherReactions,755,225,155,298),text:[676,737,330,57]},
    {proud:patch(sideDelivery,1213,260,243,294),delivery:patch(sideDelivery,1070,250,600,578,2),startled:patches.startled,text:[1158,738,420,56]}
  );
  hats.push(...[0,1,2].map(buildHat));ready=true;
  play.disabled=restart.disabled=timeline.disabled=false;
  setPlaying(!matchMedia('(prefers-reduced-motion: reduce)').matches);render();requestAnimationFrame(tick);
}catch(error){status.textContent=error.message;status.setAttribute('role','alert');}
