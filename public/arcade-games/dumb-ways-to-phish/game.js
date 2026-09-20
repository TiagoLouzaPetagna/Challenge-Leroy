import {makeRound,scoreFor,multiplier,loadNumber,evaluateChoice} from './game-logic.js';

const $=id=>document.getElementById(id);
const elements=Object.fromEntries(['game','workroom','score','best','lives','pace','combo','files','file-count','round-label','command-title','clue','inspector','inspector-zone','speech','drop-target','input-hint','feedback','feedback-tag','feedback-title','feedback-detail','feedback-points','particles','speed-up','timer-fill','timer-label','start-overlay','start-button','pause-overlay','pause-button','resume-button','sound-button','gameover-overlay','replay-button','end-score','end-summary','end-eyebrow','announcer','load-error','reload-button'].map(id=>[id,$(id)]));
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Local UI checks have a separate record so they never replace the player's best.
const bestKey='dwto-phish.anexo-faminto.best.v1'+(new URLSearchParams(location.search).has('preview-check')?'.preview':'');
let storage;try{storage=window.localStorage;}catch{storage={getItem(){return null},setItem(){}};}
const state={phase:'ready',previousPhase:null,score:0,best:loadNumber(storage,bestKey),lives:3,streak:0,correct:0,round:null,selected:null,remaining:0,resolutionTime:0,result:null,drag:null,muted:true,firstRun:true};
try{state.muted=storage.getItem('dwto-phish.sound')!=='on';}catch{}
try{const preference=storage.getItem('dwto-phish.motion');if(preference!==null)reduced=preference==='reduced';}catch{}
const screenIds=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
let activeScreen='start-overlay',optionsOrigin='start-overlay';
let audio,master,lastTick=performance.now(),lastTimerAnnouncement=0;
const activeAnimations=new Set();
const successLines=['BEM MASTIGADO!','PEGO NO DISFARCE!','PRO LIXO DIGITAL!','NEM TENTOU DIREITO.'];

function persist(){try{storage.setItem(bestKey,String(state.best));}catch{}}
function announce(text){elements.announcer.textContent=text;}
function scoreText(value){return value.toLocaleString('pt-BR');}
function fitScore(){
  const container=elements.score.parentElement,label=container.querySelector('span');
  let size=matchMedia('(max-width:700px)').matches?29:42;
  const inline=getComputedStyle(container).flexDirection==='row';
  const available=container.clientWidth-(inline?label.getBoundingClientRect().width+20:0);
  elements.score.style.fontSize=`${size}px`;
  while(elements.score.scrollWidth>available&&size>12){size--;elements.score.style.fontSize=`${size}px`;}
}
function updateScore(){
  elements.score.textContent=scoreText(state.score);elements.best.textContent=scoreText(state.best);
  elements.combo.textContent=state.streak>0&&multiplier(state.streak)>1?`${state.streak} ×${multiplier(state.streak)}`:String(state.streak);
  const dots=elements.lives.querySelectorAll('b');dots.forEach((dot,index)=>{const lost=index>=state.lives;dot.classList.toggle('lost',lost);dot.querySelector('img').src=`assets/ui/shield-${lost?'empty':'full'}.svg`;});
  elements.lives.setAttribute('aria-label',`${state.lives} ${state.lives===1?'vida':'vidas'}`);
  fitScore();
}
function playSound(kind){
  if(state.muted)return;
  try{
    if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)();master=audio.createGain();master.gain.value=.12;master.connect(audio.destination);}
    if(audio.state==='suspended')audio.resume().catch(()=>{});
    const notes=kind==='good'?[[261.6,0,.07],[392,.07,.07],[523.2,.14,.11]]:kind==='bad'?[[125,0,.12],[93,.13,.2]]:kind==='tick'?[[600,0,.025]]:kind==='start'?[[196,0,.06],[293.7,.07,.06],[392,.14,.12]]:[[75,0,.06],[55,.07,.06],[88,.15,.07],[45,.22,.12]];
    for(const [frequency,offset,duration]of notes){
      const osc=audio.createOscillator(),gain=audio.createGain(),t=audio.currentTime+offset;
      osc.type=kind==='shred'?'sawtooth':'square';osc.frequency.setValueAtTime(frequency,t);
      if(kind==='shred')osc.frequency.exponentialRampToValueAtTime(frequency*.6,t+duration);
      gain.gain.setValueAtTime(.001,t);gain.gain.linearRampToValueAtTime(kind==='shred'?.13:.19,t+.007);gain.gain.exponentialRampToValueAtTime(.001,t+duration);
      osc.connect(gain);gain.connect(master);osc.start(t);osc.stop(t+duration+.01);
    }
  }catch{}
}
function updateSound(){elements['sound-button'].setAttribute('aria-pressed',String(!state.muted));elements['sound-button'].setAttribute('aria-label',state.muted?'Som desligado. Ativar som':'Som ligado. Desativar som');$('sound-state').textContent=state.muted?'desligado':'ligado';}
elements['sound-button'].addEventListener('click',()=>{state.muted=!state.muted;updateSound();try{storage.setItem('dwto-phish.sound',state.muted?'off':'on');}catch{}if(!state.muted)playSound('tick');});

function fileButton(file,index){
  const button=document.createElement('button');button.type='button';button.className='file-card';button.dataset.id=file.id;button.style.setProperty('--tilt',`${file.tilt}deg`);button.setAttribute('aria-label',`Arquivo ${index+1}: ${file.name}. Selecione e pressione Enter para entregar ao fiscal.`);button.setAttribute('aria-pressed','false');
  const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('class','paper-icon');icon.setAttribute('viewBox','0 0 32 40');icon.setAttribute('aria-hidden','true');
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M5 2h15l8 9v26H5zM20 2v10h8M10 20h12M10 26h9');icon.append(path);
  const key=document.createElement('span');key.className='file-index';key.textContent=String(index+1).padStart(2,'0');
  const filename=document.createElement('span');filename.className='file-name';
  const split=file.name.lastIndexOf('.');filename.append(document.createTextNode(file.name.slice(0,split)));const ext=document.createElement('span');ext.className='extension';ext.textContent=file.name.slice(split);filename.append(ext);
  const meta=document.createElement('span');meta.className='file-meta';const label=document.createElement('span');label.textContent='ANEXO';const size=document.createElement('span');size.textContent=file.size;meta.append(label,size);
  button.append(icon,key,filename,meta);button.addEventListener('pointerdown',event=>pointerDown(event,file,button));
  button.addEventListener('click',()=>{if(state.phase==='playing'&&!button.dataset.suppressClick)select(file.id);delete button.dataset.suppressClick;});
  return button;
}
function renderFiles(round){
  elements.files.replaceChildren(...round.files.map(fileButton));elements.files.classList.toggle('three',round.files.length===3);
  elements['file-count'].textContent=`0${round.files.length} ANEXOS`;
}
function select(id){
  if(state.phase!=='playing')return;
  state.selected=id;elements.game.classList.add('has-selection');
  for(const button of elements.files.children){button.classList.toggle('selected',button.dataset.id===id);button.setAttribute('aria-pressed',String(button.dataset.id===id));}
  elements['drop-target'].disabled=false;elements['input-hint'].textContent='Agora toque no triturador ou aperte Enter.';
}
function clearSelection(){state.selected=null;elements.game.classList.remove('has-selection');for(const button of elements.files.children){button.classList.remove('selected');button.setAttribute('aria-pressed','false');}elements['drop-target'].disabled=state.phase!=='playing';}
function withinTarget(x,y){const r=elements['drop-target'].getBoundingClientRect();const padding=16;return x>=r.left-padding&&x<=r.right+padding&&y>=r.top-padding&&y<=r.bottom+padding;}
function pointerDown(event,file,button){
  if(state.phase!=='playing'||event.button!==0||state.drag)return;
  state.drag={id:file.id,pointerId:event.pointerId,button,startX:event.clientX,startY:event.clientY,x:event.clientX,y:event.clientY,active:false,ghost:null};
  button.setPointerCapture(event.pointerId);
}
function stopDrag(suppress=false){
  const drag=state.drag;if(!drag)return;
  if(drag.ghost)drag.ghost.remove();drag.button.classList.remove('is-drag-source');
  if(suppress)drag.button.dataset.suppressClick='1';
  try{drag.button.releasePointerCapture(drag.pointerId);}catch{}
  elements.game.classList.remove('is-dragging');elements['drop-target'].classList.remove('is-over');state.drag=null;
}
document.addEventListener('pointermove',event=>{
  const drag=state.drag;if(!drag||event.pointerId!==drag.pointerId||state.phase!=='playing')return;
  drag.x=event.clientX;drag.y=event.clientY;
  if(!drag.active&&Math.hypot(drag.x-drag.startX,drag.y-drag.startY)>7){
    drag.active=true;select(drag.id);const rect=drag.button.getBoundingClientRect();
    const ghost=drag.button.cloneNode(true);ghost.classList.add('drag-ghost');ghost.classList.remove('selected');ghost.setAttribute('aria-hidden','true');ghost.removeAttribute('aria-pressed');ghost.tabIndex=-1;ghost.style.width=`${rect.width}px`;ghost.style.height=`${rect.height}px`;document.body.append(ghost);drag.ghost=ghost;drag.button.classList.add('is-drag-source');elements.game.classList.add('is-dragging');
  }
  if(drag.active){event.preventDefault();drag.ghost.style.left=`${drag.x}px`;drag.ghost.style.top=`${drag.y}px`;elements['drop-target'].classList.toggle('is-over',withinTarget(drag.x,drag.y));}
},{passive:false});
document.addEventListener('pointerup',event=>{
  const drag=state.drag;if(!drag||drag.pointerId!==event.pointerId)return;
  const active=drag.active,id=drag.id,hit=withinTarget(event.clientX,event.clientY);
  const from=active?{x:event.clientX,y:event.clientY}:null;stopDrag(active);
  if(active&&hit)submit(id,from);
});
document.addEventListener('pointercancel',()=>stopDrag(true));
elements['drop-target'].addEventListener('click',()=>{if(state.selected)submit(state.selected);});

function animate(target,keyframes,options){
  const animation=target.animate(keyframes,{...options,duration:reduced?Math.min(160,options.duration):options.duration});activeAnimations.add(animation);
  animation.finished.then(()=>activeAnimations.delete(animation)).catch(()=>activeAnimations.delete(animation));return animation;
}
function clearAnimation(){for(const animation of activeAnimations)animation.cancel();activeAnimations.clear();elements.particles.replaceChildren();for(const node of elements.workroom.querySelectorAll('.flying-file'))node.remove();}
function flyFile(file,from){
  const original=[...elements.files.children].find(button=>button.dataset.id===file.id);if(!original)return;
  const rect=original.getBoundingClientRect(),room=elements.workroom.getBoundingClientRect(),target=elements['drop-target'].getBoundingClientRect();
  const start=from||{x:rect.left+rect.width/2,y:rect.top+rect.height/2};const end={x:target.left+target.width/2,y:target.top+target.height*.45};
  const clone=original.cloneNode(true);clone.classList.remove('selected');clone.classList.add('flying-file');clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;clone.style.width=`${rect.width}px`;clone.style.height=`${rect.height}px`;clone.style.left=`${start.x-room.left-rect.width/2}px`;clone.style.top=`${start.y-room.top-rect.height/2}px`;elements.workroom.append(clone);original.classList.add('consumed');
  animate(clone,[{transform:'rotate(7deg) scale(1)',opacity:1},{offset:.55,transform:`translate(${(end.x-start.x)*.65}px,${(end.y-start.y)*.65-35}px) rotate(-12deg) scale(.75)`,opacity:1},{transform:`translate(${end.x-start.x}px,${end.y-start.y}px) rotate(3deg) scale(.13,.01)`,opacity:0}],{duration:500,easing:'cubic-bezier(.4,0,.7,1)',fill:'forwards'});
}
function scraps(){
  const target=elements['drop-target'].getBoundingClientRect(),room=elements.workroom.getBoundingClientRect();
  for(let index=0;index<12;index++){
    const scrap=document.createElement('i');scrap.className='scrap';scrap.style.left=`${target.left-room.left+target.width*(.22+Math.random()*.6)}px`;scrap.style.top=`${target.bottom-room.top-12}px`;scrap.style.width=`${5+Math.random()*5}px`;scrap.style.height=`${17+Math.random()*25}px`;if(index%4===0)scrap.style.background='#e9ad85';elements.particles.append(scrap);
    const x=(Math.random()-.5)*150,y=75+Math.random()*60,rotation=(Math.random()-.5)*300;
    animate(scrap,[{transform:'translate(0,0) rotate(0)',opacity:1},{offset:.25,transform:`translate(${x*.4}px,-14px) rotate(${rotation*.2}deg)`,opacity:1},{transform:`translate(${x}px,${y}px) rotate(${rotation}deg)`,opacity:0}],{duration:650+Math.random()*450,delay:index*14,easing:'cubic-bezier(.2,.6,.5,1)',fill:'forwards'});
  }
}
function flashFeedback(result){
  elements.feedback.hidden=false;elements.feedback.classList.toggle('wrong',!result.correct);
  elements['feedback-tag'].textContent=result.correct?'AMEAÇA NA QUARENTENA':result.timeout?'TEMPO ESGOTADO':'CALMA, FISCAL!';
  elements['feedback-title'].textContent=result.correct?successLines[(state.correct-1)%successLines.length]:result.timeout?'PASSOU BATIDO!':'ESSE NÃO!';
  elements['feedback-detail'].textContent=result.correct?state.round.explanation:result.timeout?`O suspeito era ${state.round.files.find(file=>file.suspicious).name}.`:`Neste desafio, ${result.file.name} tinha o formato esperado. Procure o arquivo disfarçado.`;
  elements['feedback-points'].textContent=result.correct?`+${result.points} PONTOS${multiplier(state.streak)>1?` · ×${multiplier(state.streak)}`:''}`:`−1 VIDA${state.lives>0?' · RESPIRA E VAI.':''}`;
  announce(`${elements['feedback-title'].textContent} ${elements['feedback-detail'].textContent} ${elements['feedback-points'].textContent}`);
  if(!reduced)animate(elements.feedback,[{transform:'rotate(-8deg) scale(.7)',opacity:0},{transform:'rotate(-3deg) scale(1)',opacity:1}],{duration:220,easing:'cubic-bezier(.2,.8,.3,1.4)'});
}
function submit(id,from=null){
  if(state.phase!=='playing')return;
  const result=evaluateChoice(state.round,id);if(!result.valid)return;
  resolve({...result,timeout:false},from);
}
function resolve(result,from){
  stopDrag(true);clearSelection();state.phase='resolving';state.resolutionTime=0;state.result={...result,points:0,chewed:false,feedbackShown:false};elements.game.classList.add('is-resolving');elements['drop-target'].disabled=true;
  for(const button of elements.files.children)button.disabled=true;
  if(result.correct){state.streak++;state.correct++;const points=scoreFor(state.remaining,state.round.duration,state.streak);state.score+=points;state.result.points=points;if(state.score>state.best){state.best=state.score;persist();}flyFile(result.file,from);}
  else{state.lives--;state.streak=0;elements.game.classList.add('is-angry');playSound('bad');flashFeedback(state.result);state.result.feedbackShown=true;}
  updateScore();
}
function nextRound(number){
  clearAnimation();stopDrag();
  for(const name of ['is-resolving','is-shredding','is-success','is-angry','has-selection'])elements.game.classList.remove(name);
  const oldPace=state.round?.pace;state.round=makeRound(number);state.selected=null;state.remaining=state.round.duration;state.phase='playing';state.result=null;
  elements.feedback.hidden=true;elements['speed-up'].hidden=true;
  elements['command-title'].textContent='TRITURE O SUSPEITO!';elements['round-label'].textContent=`RODADA ${String(number).padStart(2,'0')}`;elements.clue.textContent=state.round.clue;elements.pace.textContent=String(state.round.pace).padStart(2,'0');
  elements['input-hint'].textContent=matchMedia('(pointer:coarse)').matches?'Toque no arquivo e depois no triturador.':'Arraste o suspeito até o fiscal. Ou use 1–3 + Enter.';
  elements['drop-target'].disabled=false;elements['pause-button'].disabled=false;elements.speech.innerHTML=number%4===0?'Belo disfarce.<br>Quase.':'Pode mandar.<br>Eu tenho estômago.';
  renderFiles(state.round);updateTimer();lastTick=performance.now();
  if(oldPace&&oldPace!==state.round.pace){elements['speed-up'].hidden=false;state.speedNotice=650;playSound('start');}
  announce(`Rodada ${number}. ${state.round.clue} ${state.round.files.map((file,index)=>`${index+1}: ${file.name}`).join('. ')}.`);
}
function startGame(){
  clearAnimation();state.score=0;state.lives=3;state.streak=0;state.correct=0;state.round=null;state.selected=null;state.previousPhase=null;
  elements['start-overlay'].hidden=true;elements['gameover-overlay'].hidden=true;elements['pause-overlay'].hidden=true;elements.game.classList.remove('is-start','is-paused');
  showScreen(null);
  updateScore();nextRound(1);playSound('start');elements.files.querySelector('button')?.focus({preventScroll:true});
}
function gameOver(){
  state.phase='gameover';elements['pause-button'].disabled=true;elements['drop-target'].disabled=true;elements['gameover-overlay'].hidden=false;elements.feedback.hidden=true;
  elements['end-score'].textContent=state.score.toLocaleString('pt-BR');elements['end-summary'].textContent=`${state.correct} ${state.correct===1?'anexo suspeito triturado':'anexos suspeitos triturados'} · ritmo ${state.round.pace}.`;
  elements['end-eyebrow'].textContent=state.score>0&&state.score>=state.best?'RECORDE DO EXPEDIENTE!':'FIM DO EXPEDIENTE';elements['replay-button'].focus({preventScroll:true});announce(`Fim de jogo. ${state.score} pontos. ${elements['end-summary'].textContent}`);
  showScreen('gameover-overlay','replay-button');
}
function pause(){
  if(!['playing','resolving'].includes(state.phase))return;
  stopDrag(true);state.previousPhase=state.phase;state.phase='paused';elements.game.classList.add('is-paused');for(const animation of activeAnimations)animation.pause();showScreen('pause-overlay','resume-button');
}
function resume(){
  if(state.phase!=='paused')return;
  state.phase=state.previousPhase;state.previousPhase=null;elements.game.classList.remove('is-paused');showScreen(null);for(const animation of activeAnimations)animation.play();lastTick=performance.now();elements.files.querySelector('button:not(:disabled)')?.focus({preventScroll:true});
}
function showScreen(id,focusId){
  activeScreen=id;
  for(const screen of screenIds)$(screen).hidden=screen!==id;
  for(const surface of [$('game-hud'),elements.workroom,document.querySelector('.bottom-bar')])surface.inert=Boolean(id);
  if(id){const button=focusId?$(focusId):$(id).querySelector('button:not(:disabled)');button?.focus({preventScroll:true});}
}
function returnToMenu(){
  stopDrag(true);clearAnimation();state.phase='ready';state.previousPhase=null;state.round=null;state.result=null;state.selected=null;state.speedNotice=0;
  elements.game.classList.remove('is-paused','is-resolving','is-shredding','is-success','is-angry','has-selection');elements.game.classList.add('is-start');
  elements['pause-button'].disabled=true;elements['drop-target'].disabled=true;elements.feedback.hidden=true;elements['speed-up'].hidden=true;
  showScreen('start-overlay','start-button');announce('Menu principal.');
}
function openOptions(origin){optionsOrigin=origin;showScreen('options-overlay','sound-button');}
function closeOptions(){showScreen(optionsOrigin,optionsOrigin==='pause-overlay'?'pause-options':'home-options');}
function updateMotion(){document.body.classList.toggle('reduce-motion',reduced);$('motion-button').setAttribute('aria-pressed',String(reduced));$('motion-state').textContent=reduced?'sim':'não';}
$('home-options').addEventListener('click',()=>openOptions('start-overlay'));
$('pause-options').addEventListener('click',()=>openOptions('pause-overlay'));
$('options-back').addEventListener('click',closeOptions);
$('help-button').addEventListener('click',()=>showScreen('help-overlay','help-back'));
$('help-back').addEventListener('click',()=>showScreen('start-overlay','help-button'));
$('motion-button').addEventListener('click',()=>{reduced=!reduced;updateMotion();try{storage.setItem('dwto-phish.motion',reduced?'reduced':'full');}catch{}});
$('exit-button').addEventListener('click',()=>showScreen('exit-overlay','exit-cancel'));
$('exit-cancel').addEventListener('click',resume);
$('exit-confirm').addEventListener('click',returnToMenu);
$('result-home').addEventListener('click',returnToMenu);
for(const screen of screenIds){
  $(screen).addEventListener('focusin',event=>{const button=event.target.closest('.menu-item');if(!button)return;$(screen).querySelectorAll('.menu-item').forEach(item=>item.classList.toggle('current',item===button));});
  $(screen).addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const button=event.target.closest('.menu-item');if(!button)return;$(screen).querySelectorAll('.menu-item').forEach(item=>item.classList.toggle('current',item===button));});
}
function updateTimer(){
  const ratio=state.round?Math.max(0,state.remaining/state.round.duration):1;
  elements['timer-fill'].style.transform=`scaleX(${ratio})`;const timer=elements['timer-fill'].parentElement;timer.classList.toggle('urgent',ratio<.27);timer.setAttribute('aria-valuenow',String(Math.round(ratio*100)));
  elements['timer-label'].textContent=state.phase==='ready'?'PRONTO PARA O EXPEDIENTE?':state.phase==='resolving'?'ARQUIVO EM ANÁLISE':state.remaining<=0?'TEMPO ESGOTADO':`${(Math.max(0,state.remaining)/1000).toFixed(1).replace('.',',')} SEG`;
}
function tick(now){
  const delta=Math.max(0,Math.min(now-lastTick,300));lastTick=now;
  if(state.phase==='playing'){
    state.remaining-=delta;
    if(state.speedNotice>0){state.speedNotice-=delta;if(state.speedNotice<=0)elements['speed-up'].hidden=true;}
    if(state.remaining<2000&&Math.ceil(state.remaining/1000)!==lastTimerAnnouncement){lastTimerAnnouncement=Math.ceil(state.remaining/1000);playSound('tick');}
    if(state.remaining<=0){state.remaining=0;resolve({valid:true,correct:false,timeout:true});}
    updateTimer();
  }else if(state.phase==='resolving'){
    state.resolutionTime+=delta;const result=state.result;
    if(result.correct&&state.resolutionTime>=350&&!result.chewed){result.chewed=true;elements.game.classList.add('is-shredding');scraps();playSound('shred');}
    if(result.correct&&state.resolutionTime>=850&&!result.feedbackShown){result.feedbackShown=true;elements.game.classList.remove('is-shredding');elements.game.classList.add('is-success');flashFeedback(result);playSound('good');}
    const duration=result.correct?2450:2700;
    if(state.resolutionTime>=duration){if(state.lives<=0)gameOver();else nextRound(state.round.number+1);}
    updateTimer();
  }
  requestAnimationFrame(tick);
}
elements['start-button'].addEventListener('click',startGame);elements['replay-button'].addEventListener('click',startGame);elements['pause-button'].addEventListener('click',pause);elements['resume-button'].addEventListener('click',resume);elements['reload-button'].addEventListener('click',()=>location.reload());
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
window.addEventListener('blur',()=>{if(state.drag)stopDrag(true);});
document.addEventListener('keydown',event=>{
  if(event.repeat)return;
  if(activeScreen){
    if(event.key==='Escape'){
      if(activeScreen==='options-overlay')closeOptions();
      else if(activeScreen==='help-overlay')showScreen('start-overlay','help-button');
      else if(activeScreen==='exit-overlay')showScreen('pause-overlay','exit-button');
      else if(activeScreen==='pause-overlay')resume();
      event.preventDefault();return;
    }
    if(event.key.toLowerCase()==='p'&&activeScreen==='pause-overlay'){resume();event.preventDefault();return;}
    const buttons=[...$(activeScreen).querySelectorAll('button:not(:disabled)')];
    if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
      const current=buttons.indexOf(document.activeElement);
      const index=event.key==='Home'?0:event.key==='End'?buttons.length-1:(current+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
      buttons[index]?.focus();event.preventDefault();return;
    }
    return;
  }
  if(event.key.toLowerCase()==='p'||event.key==='Escape'){pause();event.preventDefault();return;}
  if(state.phase==='playing'){
    if(/^[1-3]$/.test(event.key)){const file=state.round.files[Number(event.key)-1];if(file){select(file.id);event.preventDefault();}}
    if(event.key==='Enter'&&state.selected){event.preventDefault();submit(state.selected);}
  }
});
// Keep modal tab navigation inside the active dialog.
document.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const overlay=activeScreen?$(activeScreen):null;
  if(!overlay)return;
  const controls=[...overlay.querySelectorAll('button:not(:disabled)')];if(!controls.length)return;
  if(event.shiftKey&&document.activeElement===controls[0]){event.preventDefault();controls.at(-1).focus();}else if(!event.shiftKey&&document.activeElement===controls.at(-1)){event.preventDefault();controls[0].focus();}
});
updateScore();updateSound();updateMotion();elements.game.classList.add('is-start');renderFiles(makeRound(1,()=>.45));for(const button of elements.files.children)button.disabled=true;showScreen('start-overlay','start-button');
const scoreResize=new ResizeObserver(fitScore);scoreResize.observe(elements.score.parentElement);
for(const image of document.querySelectorAll('.part')){const failed=()=>{pause();showScreen('load-error','reload-button');};image.addEventListener('error',failed);if(image.complete&&image.naturalWidth===0)failed();}
requestAnimationFrame(tick);
