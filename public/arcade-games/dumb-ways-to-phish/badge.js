import {BadgeGame,loadNumber} from './badge-engine.js';
import {campaignFor,phaseOptions,roundText,advanceCampaign,finishCampaign,restartCampaign,decorateCampaign} from './campaign.js';

const $=id=>document.getElementById(id),game=new BadgeGame();
const campaign=campaignFor('badge');decorateCampaign(campaign);
const checkpoint=$('checkpoint'),visitor=$('visitor-sprite'),guard=$('guard-sprite'),door=$('door-sprite'),alarm=$('alarm-sprite'),presentedBadge=$('presented-badge');
const screens=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
const previewMode=new URLSearchParams(location.search).has('preview-check');
const visitorNames={office:'funcionário',courier:'entregador',technician:'técnico',executive:'executivo',supplier:'fornecedora'};
const visitorFolders={office:'visitor-01',courier:'visitor-02',technician:'visitor-03',executive:'visitor-04',supplier:'visitor-05'};
const visualClasses=['running','round-enter','result-allow-good','result-block-good','result-allow-bad','result-block-bad','result-timeout'];
const visitorStates=['present','accepted','impostor','blocked-guilty','blocked-innocent','portrait'];
const guardStates=['inspect','approve','block','panic'];
let activeScreen='start-overlay',optionsOrigin='start-overlay',last=performance.now(),best=0,muted=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,audio,currentClass='';
const drag={active:false,pointerId:null,startX:0,startY:0,dx:0,dy:0};
let snapTimer=0;
let storage;try{storage=localStorage;}catch{storage={getItem(){return null},setItem(){}};}
const bestKey='dwto-phish.badge.best.v1'+(new URLSearchParams(location.search).has('preview-check')?'.preview':'');
try{best=loadNumber(storage,bestKey);muted=storage.getItem('dwto-phish.sound')!=='on';const motion=storage.getItem('dwto-phish.motion');if(motion!==null)reduced=motion==='reduced';}catch{}

function save(key,value){try{storage.setItem(key,String(value));}catch{}}
function announce(text){$('announcer').textContent=text;}
function visitorPath(kind,state){return `assets/badge/v4/${visitorFolders[kind]??visitorFolders.office}/${state}.png`;}
function portraitPath(kind){return visitorPath(kind,'portrait');}
function guardPath(state){return `assets/badge/v4/guard/${state}.png`;}
const doorPath='assets/badge/v4/door.png';
const alarmPath='assets/badge/v4/alarm-active.png';
function setImage(node,src){if(node&&node.getAttribute('src')!==src)node.src=src;}
function setInkText(node,value){
 const visual=value.toLocaleUpperCase('pt-BR');
 node.setAttribute('aria-label',value);
 node.replaceChildren();
 const spoken=document.createElement('span');spoken.className='sr-only';spoken.textContent=value;node.append(spoken);
 [...visual].forEach((character,index)=>{
  const letter=document.createElement('span');letter.setAttribute('aria-hidden','true');
  if(character===' '){letter.className='ink-space';letter.textContent='\u00a0';}
  else{
   const code=character.codePointAt(0),vertical=((code*7+index*13)%9)-4,turn=((code*3+index*5)%9)-4,width=(.985+((code+index*11)%5)*.0075).toFixed(3);
   letter.className='ink-letter';letter.textContent=character;letter.style.setProperty('--ink-y',`${vertical*.006}em`);letter.style.setProperty('--ink-turn',`${turn*.12}deg`);letter.style.setProperty('--ink-width',width);
  }
  node.append(letter);
 });
}
function setSceneClass(value){if(value===currentClass)return;checkpoint.classList.remove(...visualClasses);checkpoint.classList.add(...value.split(' ').filter(Boolean));currentClass=value;}
function fitScore(){let size=42;const score=$('score'),box=score.parentElement,available=box.clientWidth-box.querySelector('span').clientWidth-20;score.style.fontSize=`${size}px`;while(score.scrollWidth>available&&size>12)score.style.fontSize=`${--size}px`;}
function hud(){
 $('score').textContent=game.score.toLocaleString('pt-BR');$('best').textContent=best.toLocaleString('pt-BR');$('lives').setAttribute('aria-label',`${game.lives} vidas`);
 $('lives').querySelectorAll('b').forEach((item,index)=>{const lost=index>=game.lives;item.classList.toggle('lost',lost);item.querySelector('img').src=`assets/ui/shield-${lost?'empty':'full'}.svg`;});fitScore();
}
function preferences(){$('sound-button').setAttribute('aria-pressed',String(!muted));$('sound-state').textContent=muted?'desligado':'ligado';$('motion-button').setAttribute('aria-pressed',String(reduced));$('motion-state').textContent=reduced?'sim':'não';document.body.classList.toggle('reduce-motion',reduced);}
function sound(bad=false){if(muted)return;try{audio??=new AudioContext();audio.resume().catch(()=>{});const osc=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;osc.type='square';osc.frequency.setValueAtTime(bad?145:510,now);osc.frequency.exponentialRampToValueAtTime(bad?70:880,now+.12);gain.gain.setValueAtTime(.04,now);gain.gain.exponentialRampToValueAtTime(.001,now+.16);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(now+.17);}catch{}}
function show(id,focus){activeScreen=id;for(const screen of screens)$(screen).hidden=screen!==id;$('game-hud').inert=!!id;checkpoint.inert=!!id;if(id)(focus?$(focus):$(id).querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
function controls(){const enabled=game.status==='running'&&!activeScreen;presentedBadge.setAttribute('aria-disabled',String(!enabled));presentedBadge.tabIndex=enabled?0:-1;}
function setDragPosition(dx=0,dy=0){drag.dx=dx;drag.dy=dy;presentedBadge.style.setProperty('--drag-x',`${dx}px`);presentedBadge.style.setProperty('--drag-y',`${dy}px`);presentedBadge.style.setProperty('--drag-tilt',`${Math.max(-9,Math.min(9,dx/28))}deg`);}
function clearDragPosition(){clearTimeout(snapTimer);drag.active=false;drag.pointerId=null;presentedBadge.classList.remove('is-dragging','is-snapping');setDragPosition();}
function snapBadge(){presentedBadge.classList.remove('is-dragging');presentedBadge.classList.add('is-snapping');setDragPosition();clearTimeout(snapTimer);snapTimer=setTimeout(()=>presentedBadge.classList.remove('is-snapping'),220);}
function fillRule(){
 const {record,presented,visitor:visitorId}=game.rule;
 setImage($('record-photo'),portraitPath(record.portrait));setImage($('badge-photo'),portraitPath(presented.portrait));
 setInkText($('record-name'),record.name);setInkText($('record-id'),record.id);setInkText($('record-department'),record.department);
 setInkText($('badge-name'),presented.name);setInkText($('badge-id'),presented.id);setInkText($('badge-department'),presented.department);
 visitor.alt=`${visitorNames[visitorId]} apresentando um crachá`;visitor.dataset.kind=visitorId;
}
function decisionText(event){
 if(event.good&&event.action==='allow')return `+${event.points} · Tudo confere. Pode entrar!`;
 if(event.good)return `+${event.points} · Barrado! ${event.reason}`;
 if(event.action==='timeout')return `Tempo esgotado. ${event.reason}`;
 if(event.action==='allow')return `Entrada errada. ${event.reason}`;
 return `Bloqueio errado. ${event.reason}`;
}
function events(){for(const event of game.drain()){
 if(event.type==='round'){clearDragPosition();fillRule();announce(`${roundText(campaign,game.round)}. Compare o crachá com o cadastro.`);}
 if(event.type==='decision'){
  if(game.score>best){best=game.score;save(bestKey,best);}hud();const text=decisionText(event);announce(text);sound(!event.good);
 }
 if(event.type==='over'){$('pause-button').disabled=true;end();}
 if(event.type==='complete'&&campaign)advanceCampaign(campaign,game.score,game.lives);
 }controls();}
function visual(){
 if(!game.rule)return;
 const reaction=game.reaction;
 checkpoint.classList.toggle('alarm-on',Boolean(reaction&&((reaction.action==='allow'&&!reaction.good)||reaction.action==='timeout')));
 if(game.status==='running'||game.status==='paused'&&!reaction){
  const entering=game.elapsed<520;setSceneClass(`running${entering?' round-enter':''}`);setImage(visitor,visitorPath(game.rule.visitor,'present'));setImage(guard,guardPath('inspect'));
 }else if(reaction){
  if(reaction.action==='allow'&&reaction.good){setSceneClass('result-allow-good');setImage(visitor,visitorPath(game.rule.visitor,'accepted'));setImage(guard,guardPath('approve'));}
  else if(reaction.action==='block'&&reaction.good){setSceneClass('result-block-good');setImage(visitor,visitorPath(game.rule.visitor,'blocked-guilty'));setImage(guard,guardPath('block'));}
  else if(reaction.action==='allow'){setSceneClass('result-allow-bad');setImage(visitor,visitorPath(game.rule.visitor,'impostor'));setImage(guard,guardPath('panic'));}
  else if(reaction.action==='block'){setSceneClass('result-block-bad');setImage(visitor,visitorPath(game.rule.visitor,'blocked-innocent'));setImage(guard,guardPath('panic'));}
  else{setSceneClass('result-timeout');setImage(visitor,visitorPath(game.rule.visitor,game.rule.valid?'blocked-innocent':'blocked-guilty'));setImage(guard,guardPath('panic'));}
 }
 $('command').hidden=game.status!=='running'||game.elapsed>760;
}
function start(){game.start(campaign?phaseOptions(campaign):undefined);$('game').classList.remove('is-start');$('pause-button').disabled=false;show(null);events();hud();last=performance.now();presentedBadge.focus({preventScroll:true});}
function pause(){if(!['running','resolving'].includes(game.status))return;game.pause();$('game').classList.add('is-paused');show('pause-overlay','resume-button');}
function resume(){if(game.status!=='paused')return;game.resume();$('game').classList.remove('is-paused');show(null);last=performance.now();controls();presentedBadge.focus({preventScroll:true});}
function home(){if(campaign){finishCampaign();location.href='./';return;}game.stop();$('game').classList.add('is-start');$('game').classList.remove('is-paused');$('pause-button').disabled=true;show('start-overlay','start-button');}
function end(){if(campaign)finishCampaign(game.score);$('end-score').textContent=game.score.toLocaleString('pt-BR');$('end-summary').textContent=`${game.correct} decisões certas · rodada ${game.round}.`;$('end-eyebrow').textContent=game.score>0&&game.score>=best?'NOVO RECORDE':'FIM DE JOGO';show('gameover-overlay','replay-button');announce(`Fim de jogo. ${game.score} pontos.`);}
function choose(action,fromDrag=false){if(!fromDrag)clearDragPosition();if(game.choose(action)){events();visual();return true}if(fromDrag)snapBadge();return false;}

presentedBadge.addEventListener('pointerdown',event=>{if(game.status!=='running'||activeScreen||event.button!==0)return;clearTimeout(snapTimer);drag.active=true;drag.pointerId=event.pointerId;drag.startX=event.clientX;drag.startY=event.clientY;setDragPosition();presentedBadge.classList.remove('is-snapping');presentedBadge.classList.add('is-dragging');presentedBadge.setPointerCapture?.(event.pointerId);event.preventDefault();});
presentedBadge.addEventListener('pointermove',event=>{if(!drag.active||event.pointerId!==drag.pointerId)return;const limit=innerWidth*.44,dx=Math.max(-limit,Math.min(limit,event.clientX-drag.startX)),dy=Math.max(-28,Math.min(28,(event.clientY-drag.startY)*.18));setDragPosition(dx,dy);event.preventDefault();});
function finishDrag(event,cancel=false){if(!drag.active||event.pointerId!==drag.pointerId)return;drag.active=false;presentedBadge.classList.remove('is-dragging');const threshold=Math.max(74,presentedBadge.getBoundingClientRect().width*.22);if(!cancel&&Math.abs(drag.dx)>=threshold){choose(drag.dx<0?'block':'allow',true);}else snapBadge();}
presentedBadge.addEventListener('pointerup',event=>finishDrag(event));presentedBadge.addEventListener('pointercancel',event=>finishDrag(event,true));
const bindings={'start-button':start,'replay-button':campaign?restartCampaign:start,'pause-button':pause,'resume-button':resume,'exit-cancel':resume,'exit-confirm':home,'result-home':home,'reload-button':()=>location.reload(),'help-button':()=>show('help-overlay','help-back'),'help-back':()=>show('start-overlay','help-button'),'exit-button':()=>show('exit-overlay','exit-cancel'),'other-game':()=>location.href='./'};
for(const [id,fn] of Object.entries(bindings))$(id).addEventListener('click',fn);
for(const [id,origin] of [['home-options','start-overlay'],['pause-options','pause-overlay']])$(id).addEventListener('click',()=>{optionsOrigin=origin;show('options-overlay','sound-button');});
const closeOptions=()=>show(optionsOrigin,optionsOrigin==='pause-overlay'?'pause-options':'home-options');$('options-back').addEventListener('click',closeOptions);
$('sound-button').addEventListener('click',()=>{muted=!muted;save('dwto-phish.sound',muted?'off':'on');preferences();sound();});$('motion-button').addEventListener('click',()=>{reduced=!reduced;save('dwto-phish.motion',reduced?'reduced':'full');preferences();});
for(const id of screens)for(const event of ['focusin','pointermove'])$(id).addEventListener(event,e=>{const button=e.target.closest('.menu-item');if(button)$(id).querySelectorAll('.menu-item').forEach(item=>item.classList.toggle('current',item===button));});
document.addEventListener('keydown',event=>{
 if(event.repeat)return;
 if(activeScreen){
  if(event.key==='Escape'){if(activeScreen==='pause-overlay')resume();else if(activeScreen==='options-overlay')closeOptions();else if(activeScreen==='help-overlay')show('start-overlay','help-button');else if(activeScreen==='exit-overlay')show('pause-overlay','exit-button');event.preventDefault();return;}
  if(event.key.toLowerCase()==='p'&&activeScreen==='pause-overlay'){resume();event.preventDefault();return;}
  const buttons=[...$(activeScreen).querySelectorAll('button:not(:disabled)')],index=buttons.indexOf(document.activeElement);
  if(['ArrowUp','ArrowDown','Home','End'].includes(event.key)){const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[next]?.focus();event.preventDefault();}
  return;
 }
 const key=event.key.toLowerCase();if(event.key==='ArrowLeft'||key==='a'){choose('block');event.preventDefault();}else if(event.key==='ArrowRight'||key==='d'){choose('allow');event.preventDefault();}else if(event.key==='Escape'||key==='p'){pause();event.preventDefault();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
function frame(now){const ms=Math.max(0,Math.min(80,now-last));last=now;if(!activeScreen){game.step(ms);if(previewMode&&game.status==='running')game.remaining=game.rule.duration;events();}visual();requestAnimationFrame(frame);}

const preload=[
 'assets/badge/v4/scene-background.png',
 'assets/badge/v4/counter.png',
 ...guardStates.map(guardPath),
 ...Object.keys(visitorFolders).flatMap(kind=>visitorStates.map(state=>visitorPath(kind,state))),
 doorPath,
 alarmPath,
 'assets/badge/v4/record-monitor.png',
 'assets/badge/v2/messages/command.png',
 'assets/badge/v4/badge-front.png'
];
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(new Error(src));image.src=src;});}
$('start-button').disabled=true;$('game').classList.add('is-start');hud();preferences();show('start-overlay');new ResizeObserver(fitScore).observe($('score').parentElement);
Promise.all(preload.map(load)).then(()=>{$('start-button').disabled=false;if(campaign)start();else $('start-button').focus();requestAnimationFrame(frame);}).catch(error=>{console.error(error);show('load-error','reload-button');});

