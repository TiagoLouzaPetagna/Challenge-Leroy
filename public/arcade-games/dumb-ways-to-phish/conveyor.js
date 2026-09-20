import {ConveyorGame,TRACK} from './conveyor-engine.js';
import {ConveyorArt,WORLD} from './conveyor-art.js';
import {loadNumber} from './game-logic.js';
import {createStageBackdrop} from './expanded-stage.js';
import {beginCampaign,campaignFor,phaseOptions,roundText,advanceCampaign,finishCampaign,restartCampaign,decorateCampaign} from './campaign.js';

const $=id=>document.getElementById(id),canvas=$('conveyor-canvas');
const game=new ConveyorGame(),art=new ConveyorArt(canvas);
const campaign=campaignFor('conveyor');decorateCampaign(campaign);
const screens=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
let activeScreen='start-overlay',optionsOrigin='start-overlay',selected=null,drag=null,muted=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let storage;try{storage=localStorage;}catch{storage={getItem(){return null},setItem(){}};}
const bestKey='dwto-phish.conveyor.best.v1'+(new URLSearchParams(location.search).has('preview-check')?'.preview':'');
let best=loadNumber(storage,bestKey),audio,last=performance.now(),endDelay=0;
try{muted=storage.getItem('dwto-phish.sound')!=='on';const motion=storage.getItem('dwto-phish.motion');if(motion!==null)reduced=motion==='reduced';}catch{}
const save=(key,value)=>{try{storage.setItem(key,String(value));}catch{}};
const announce=text=>{$('announcer').textContent=text;};
function sound(kind){
  if(muted)return;
  try{audio??=new AudioContext();if(audio.state==='suspended')audio.resume().catch(()=>{});const now=audio.currentTime;
    const notes=kind==='bad'?[140,90]:kind==='shred'?[80,55,105]:[350,525];
    notes.forEach((frequency,i)=>{const osc=audio.createOscillator(),gain=audio.createGain(),start=now+i*.065;osc.type=kind==='shred'?'sawtooth':'square';osc.frequency.value=frequency;gain.gain.setValueAtTime(.035,start);gain.gain.exponentialRampToValueAtTime(.001,start+.09);osc.connect(gain);gain.connect(audio.destination);osc.start(start);osc.stop(start+.1);});
  }catch{}
}
function fitScore(){
  const box=$('score').parentElement,available=box.clientWidth-box.querySelector('span').getBoundingClientRect().width-20;let size=42;$('score').style.fontSize=`${size}px`;
  while($('score').scrollWidth>available&&size>12)$('score').style.fontSize=`${--size}px`;
}
function hud(){
  $('score').textContent=game.score.toLocaleString('pt-BR');$('best').textContent=best.toLocaleString('pt-BR');
  $('lives').setAttribute('aria-label',`${game.lives} ${game.lives===1?'vida':'vidas'}`);
  $('lives').querySelectorAll('b').forEach((b,i)=>{const lost=i>=game.lives;b.classList.toggle('lost',lost);b.querySelector('img').src=`assets/ui/shield-${lost?'empty':'full'}.svg`;});fitScore();
}
function show(id,focus){
  activeScreen=id;for(const screen of screens)$(screen).hidden=screen!==id;
  $('game-hud').inert=Boolean(id);$('workroom').inert=Boolean(id);
  if(id)(focus?$(focus):$(id).querySelector('button:not(:disabled)'))?.focus({preventScroll:true});
}
function preferences(){
  $('sound-button').setAttribute('aria-pressed',String(!muted));$('sound-state').textContent=muted?'desligado':'ligado';
  $('motion-button').setAttribute('aria-pressed',String(reduced));$('motion-state').textContent=reduced?'sim':'não';document.body.classList.toggle('reduce-motion',reduced);
}
function select(id){selected=id;art.selected=id;$('drop-target').disabled=game.status!=='running'||!game.files.some(f=>f.id===id);}
function cancelDrag(){
  if(drag?.active&&art.drag)art.returning={id:drag.id,from:{x:art.drag.x,y:art.drag.y},age:0};
  if(drag)try{canvas.releasePointerCapture(drag.pointerId);}catch{}
  drag=null;art.drag=null;canvas.classList.remove('is-dragging');
}
function pause(){if(!['running','intro','draining'].includes(game.status))return;cancelDrag();game.pause();$('game').classList.add('is-paused');show('pause-overlay','resume-button');}
function resume(){if(game.status!=='paused')return;game.resume();$('game').classList.remove('is-paused');show(null);last=performance.now();canvas.focus({preventScroll:true});}
function start(){if(!art.ready)return;cancelDrag();art.reset();select(null);endDelay=0;game.start(campaign?phaseOptions(campaign):undefined);$('game').classList.remove('is-start','is-paused');$('pause-button').disabled=false;show(null);processEvents();hud();last=performance.now();canvas.focus({preventScroll:true});sound('good');}
function home(){if(campaign){finishCampaign();location.href='./';return;}cancelDrag();game.stop();art.reset();select(null);endDelay=0;$('game').classList.remove('is-paused');$('game').classList.add('is-start');$('pause-button').disabled=true;show('start-overlay','campaign-button');}
function end(){
  if(campaign)finishCampaign(game.score);
  $('end-score').textContent=game.score.toLocaleString('pt-BR');$('end-summary').textContent=`${game.correct} decisões corretas · ${game.caught} arquivos bloqueados triturados · rodada ${game.number}.`;
  $('end-eyebrow').textContent=game.score>0&&game.score>=best?'NOVO RECORDE':'FIM DO EXPEDIENTE';show('gameover-overlay','replay-button');announce(`Fim de jogo. ${game.score} pontos.`);
}
function processEvents(from){
  for(const event of game.drain()){
    if(event.type==='round'){
      $('round-label').textContent=roundText(campaign,event.number).toUpperCase();$('pace').textContent=`RITMO ${event.number}`;
      $('rule-description').textContent=`Bloqueados nesta rodada: ${event.blocked.map(t=>'.'+t).join(' e ')}.`;
      announce(`${$('rule-description').textContent} Entregue esses tipos à boca do antivírus e deixe os demais passar.`);
    }else if(event.type==='decision'){
      art.decide(event,event.delivered?from:null,reduced);
      if(selected===event.file.id)select(null);
      if(drag?.id===event.file.id)cancelDrag();
      if(game.score>best){best=game.score;save(bestKey,best);}hud();
      const text=event.correct?`${event.delivered?'Bloqueado triturado':'Permitido passou'}: .${event.file.type}. +${event.points} pontos.`:`.${event.file.type}: ${event.delivered?'este tipo estava permitido':'este tipo estava bloqueado e escapou'}. Menos um escudo.`;
      $('stage-status').textContent=text;announce(text);if(event.delivered||!event.correct)sound(event.correct?'shred':'bad');
    }else if(event.type==='over'){cancelDrag();$('pause-button').disabled=true;$('drop-target').disabled=true;endDelay=1100;}
    else if(event.type==='complete'&&campaign)advanceCampaign(campaign,game.score,game.lives);
  }
}
function deliver(id,from){if(game.deliver(id)){processEvents(from);syncControls();}}
function visibleFiles(){return game.files.filter(f=>f.x>100&&f.x<1580).sort((a,b)=>a.x-b.x);}
function syncControls(){
  const parent=$('file-controls'),files=visibleFiles(),ids=new Set(files.map(f=>String(f.id)));
  for(const button of [...parent.children])if(!ids.has(button.dataset.id)){if(button===document.activeElement)canvas.focus({preventScroll:true});button.remove();}
  files.forEach((file,index)=>{
    let button=parent.querySelector(`[data-id="${file.id}"]`);
    if(!button){button=document.createElement('button');button.type='button';button.className='file-control';button.dataset.id=file.id;button.addEventListener('focus',()=>select(file.id));button.addEventListener('click',()=>select(file.id));parent.append(button);}
    button.setAttribute('aria-label',`Arquivo ${index+1}: .${file.type}. Enter entrega à boca do antivírus.`);button.setAttribute('aria-pressed',String(file.id===selected));button.disabled=game.status!=='running';
    Object.assign(button.style,{left:`${(file.x-TRACK.width/2)/WORLD.width*100}%`,top:`${(TRACK.y-TRACK.height/2)/WORLD.height*100}%`,width:`${TRACK.width/WORLD.width*100}%`,height:`${TRACK.height/WORLD.height*100}%`});
  });
  if(selected&&!game.files.some(f=>f.id===selected)){selected=null;art.selected=null;}
  $('drop-target').disabled=game.status!=='running'||!game.files.some(f=>f.id===selected);
}
canvas.tabIndex=-1;
canvas.addEventListener('pointerdown',event=>{
  if(event.button!==0||game.status!=='running'||drag)return;
  const p=art.point(event.clientX,event.clientY),file=art.hitFile(p,game.files);if(!file)return;
  event.preventDefault();select(file.id);drag={id:file.id,pointerId:event.pointerId,start:p,active:false};canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove',event=>{
  const p=art.point(event.clientX,event.clientY);canvas.classList.toggle('can-grab',game.status==='running'&&Boolean(art.hitFile(p,game.files)));
  if(!drag||drag.pointerId!==event.pointerId||game.status!=='running')return;
  if(!drag.active&&Math.hypot(p.x-drag.start.x,p.y-drag.start.y)>8)drag.active=true;
  if(drag.active){art.drag={id:drag.id,...p};canvas.classList.add('is-dragging');}
});
canvas.addEventListener('pointerup',event=>{
  if(!drag||drag.pointerId!==event.pointerId)return;
  const p=art.point(event.clientX,event.clientY),id=drag.id,hit=drag.active&&art.hitMouth(p);cancelDrag();if(hit){art.returning=null;deliver(id,p);}
});
canvas.addEventListener('pointercancel',cancelDrag);
$('drop-target').addEventListener('click',()=>deliver(selected));
window.addEventListener('blur',cancelDrag);document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
const bindings={'replay-button':campaign?restartCampaign:start,'pause-button':pause,'resume-button':resume,'exit-cancel':resume,'exit-confirm':home,'result-home':home,'reload-button':()=>location.reload(),'help-button':()=>show('help-overlay','help-back'),'help-back':()=>show('start-overlay','help-button'),'exit-button':()=>show('exit-overlay','exit-cancel')};
for(const [id,fn] of Object.entries(bindings))$(id).addEventListener('click',fn);
$('campaign-button').addEventListener('click',beginCampaign);
for(const [id,origin]of [['home-options','start-overlay'],['pause-options','pause-overlay']])$(id).addEventListener('click',()=>{optionsOrigin=origin;show('options-overlay','sound-button');});
const closeOptions=()=>show(optionsOrigin,optionsOrigin==='pause-overlay'?'pause-options':'home-options');
$('options-back').addEventListener('click',closeOptions);
$('sound-button').addEventListener('click',()=>{muted=!muted;save('dwto-phish.sound',muted?'off':'on');preferences();sound('good');});
$('motion-button').addEventListener('click',()=>{reduced=!reduced;save('dwto-phish.motion',reduced?'reduced':'full');preferences();});
for(const id of screens){$(id).addEventListener('focusin',event=>{const b=event.target.closest('.menu-item');if(b)$(id).querySelectorAll('.menu-item').forEach(item=>item.classList.toggle('current',item===b));});$(id).addEventListener('pointermove',event=>{const b=event.target.closest('.menu-item');if(b)$(id).querySelectorAll('.menu-item').forEach(item=>item.classList.toggle('current',item===b));});}
document.addEventListener('keydown',event=>{
  if(event.repeat)return;
  if(activeScreen){
    if(event.key==='Escape'){if(activeScreen==='pause-overlay')resume();else if(activeScreen==='options-overlay')closeOptions();else if(activeScreen==='help-overlay')show('start-overlay','help-button');else if(activeScreen==='exit-overlay')show('pause-overlay','exit-button');event.preventDefault();return;}
    if(event.key.toLowerCase()==='p'&&activeScreen==='pause-overlay'){resume();event.preventDefault();return;}
    const buttons=[...$(activeScreen).querySelectorAll('button:not(:disabled)')],index=buttons.indexOf(document.activeElement);
    if(['ArrowUp','ArrowDown','Home','End'].includes(event.key)){const n=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[n]?.focus();event.preventDefault();}
    if(event.key==='Tab'&&buttons.length){if(event.shiftKey&&index===0){buttons.at(-1).focus();event.preventDefault();}else if(!event.shiftKey&&index===buttons.length-1){buttons[0].focus();event.preventDefault();}}
    return;
  }
  if(event.key==='Escape'||event.key.toLowerCase()==='p'){pause();event.preventDefault();return;}
  if(game.status==='running'){
    if(/^[1-5]$/.test(event.key)){const file=visibleFiles()[Number(event.key)-1];if(file)select(file.id);event.preventDefault();}
    if(event.key==='Enter'&&selected){deliver(selected);event.preventDefault();}
  }
});
function frame(now){
  const delta=Math.min(250,Math.max(0,now-last));last=now;
  if(!activeScreen){game.step(delta);processEvents();art.update(delta,reduced);if(endDelay>0){endDelay-=delta;if(endDelay<=0)end();}}
  if(drag&&!game.files.some(f=>f.id===drag.id))cancelDrag();
  syncControls();art.draw(game,reduced);requestAnimationFrame(frame);
}
$('game').classList.add('is-start');hud();preferences();show('start-overlay');
new ResizeObserver(fitScore).observe($('score').parentElement);
Promise.all([art.load(),createStageBackdrop($('stage-backdrop'),$('workroom'),'conveyor')]).then(()=>{if(campaign)start();else if(activeScreen==='start-overlay')$('campaign-button').focus({preventScroll:true});requestAnimationFrame(frame);}).catch(error=>{console.error(error);show('load-error','reload-button');});
