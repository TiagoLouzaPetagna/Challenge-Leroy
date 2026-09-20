import {PermissionsGame,PERMISSIONS} from './permissions-engine.js';
import {iconMarkup} from './permissions-icons.js';
import {campaignFor,phaseOptions,roundText,advanceCampaign,finishCampaign,restartCampaign,decorateCampaign} from './campaign.js';

const $=id=>document.getElementById(id);
const campaign=campaignFor('permissions');decorateCampaign(campaign);
const game=new PermissionsGame();
const stage=$('permission-stage'),cards=[...stage.querySelectorAll('.permission-card')];
const screens=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
const preview=new URLSearchParams(location.search).has('preview-check');
let activeScreen='start-overlay',optionsOrigin='start-overlay',last=performance.now();
let muted=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,best=0,audio;
let storage;try{storage=localStorage;}catch{storage={getItem(){return null;},setItem(){}};}
const bestKey='dwto-phish.permissions.best.v1'+(preview?'.preview':'');
try{best=Math.max(0,Number(storage.getItem(bestKey))||0);muted=storage.getItem('dwto-phish.sound')!=='on';const motion=storage.getItem('dwto-phish.motion');if(motion!==null)reduced=motion==='reduced';}catch{}
function save(key,value){try{storage.setItem(key,String(value));}catch{}}
function announce(text){$('announcer').textContent=text;$('stage-status').textContent=text;}
function sound(bad=false){if(muted)return;try{audio??=new AudioContext();audio.resume().catch(()=>{});const osc=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;osc.type=bad?'sawtooth':'square';osc.frequency.setValueAtTime(bad?260:430,now);osc.frequency.exponentialRampToValueAtTime(bad?70:830,now+.18);gain.gain.setValueAtTime(.035,now);gain.gain.exponentialRampToValueAtTime(.001,now+.22);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(now+.23);}catch{}}
function hud(){
 $('score').textContent=game.score.toLocaleString('pt-BR');$('best').textContent=best.toLocaleString('pt-BR');$('lives').setAttribute('aria-label',`${game.lives} vidas`);
 $('lives').querySelectorAll('b').forEach((item,index)=>{const lost=index>=game.lives;item.classList.toggle('lost',lost);item.querySelector('img').src=`assets/ui/shield-${lost?'empty':'full'}.svg`;});
}
function preferences(){$('sound-button').setAttribute('aria-pressed',String(!muted));$('sound-state').textContent=muted?'desligado':'ligado';$('motion-button').setAttribute('aria-pressed',String(reduced));$('motion-state').textContent=reduced?'sim':'não';document.body.classList.toggle('reduce-motion',reduced);}
function show(id,focus){activeScreen=id;for(const screen of screens)$(screen).hidden=screen!==id;$('game-hud').inert=!!id;stage.inert=!!id;if(id)(focus?$(focus):$(id).querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
function controls(){const enabled=game.status==='running'&&!activeScreen;for(const card of cards)card.disabled=!enabled;}
function fillRound(){
 const rule=game.rule;
 stage.classList.remove('resolving','correct','incorrect');
 $('round-label').textContent=`${roundText(campaign,game.round).toUpperCase()} · PEDIDO DE ACESSO`;
 $('app-name').textContent=rule.name;$('app-purpose').textContent=rule.purpose;$('app-icon').innerHTML=iconMarkup(rule.icon);
 $('data-eater').src='assets/permissions/v2/data-eater-idle.png';
 for(let index=0;index<3;index++){
  const card=cards[index],access=rule.choices[index];card.classList.remove('selected','abusive');
  card.querySelector('.card-icon').innerHTML=iconMarkup(access);
  card.querySelector('.card-label').textContent=PERMISSIONS[access];
  card.setAttribute('aria-label',`${index+1}. ${PERMISSIONS[access]}`);
 }
 announce(`${roundText(campaign,game.round)}. ${rule.name}: ${rule.purpose} Qual permissão não faz sentido? ${rule.choices.map((access,i)=>`${i+1}, ${PERMISSIONS[access]}`).join('; ')}.`);
}
function decision(event){
 stage.classList.add('resolving',event.good?'correct':'incorrect');
 const wrongIndex=game.rule.choices.indexOf(game.rule.abuse);
 cards[wrongIndex].classList.add('abusive');if(event.index!==null)cards[event.index].classList.add('selected');
 $('data-eater').src=`assets/permissions/v2/data-eater-${event.good?'blocked':'grab'}.png`;
 if(game.score>best){best=game.score;save(bestKey,best);}hud();
 const result=event.good?`Bloqueado! Mais ${event.points} pontos. ${event.reason}`:event.timeout?`Tempo esgotado. ${event.reason}`:`Essa permissão fazia sentido. ${event.reason}`;
 announce(result);sound(!event.good);
}
function drain(){for(const event of game.drain()){
 if(event.type==='round')fillRound();
 else if(event.type==='decision')decision(event);
 else if(event.type==='over')end();
 else if(event.type==='complete'&&campaign)advanceCampaign(campaign,game.score,game.lives);
}controls();}
function start(){game.start(campaign?phaseOptions(campaign):undefined);$('game').classList.remove('is-start');$('pause-button').disabled=false;show(null);drain();hud();last=performance.now();cards[0].focus({preventScroll:true});}
function pause(){if(!['running','resolving'].includes(game.status))return;game.pause();show('pause-overlay','resume-button');}
function resume(){if(game.status!=='paused')return;game.resume();show(null);last=performance.now();controls();cards[0].focus({preventScroll:true});}
function home(){if(campaign){finishCampaign();location.href='./';return;}game.stop();$('game').classList.add('is-start');$('pause-button').disabled=true;show('start-overlay','start-button');}
function end(){if(campaign)finishCampaign(game.score);$('pause-button').disabled=true;$('end-score').textContent=game.score.toLocaleString('pt-BR');$('end-summary').textContent=`${game.correct} decisões certas · rodada ${game.round}.`;$('end-eyebrow').textContent=game.score>0&&game.score>=best?'NOVO RECORDE':'FIM DE JOGO';show('gameover-overlay','replay-button');announce(`Fim de jogo. ${game.score} pontos.`);}
function choose(index){if(game.choose(index)){drain();return true;}return false;}
cards.forEach((card,index)=>card.addEventListener('click',()=>choose(index)));
const bindings={'start-button':start,'replay-button':campaign?restartCampaign:start,'pause-button':pause,'resume-button':resume,'exit-cancel':resume,'exit-confirm':home,'result-home':home,'reload-button':()=>location.reload(),'help-button':()=>show('help-overlay','help-back'),'help-back':()=>show('start-overlay','help-button'),'exit-button':()=>show('exit-overlay','exit-cancel'),'other-game':()=>location.href='./'};
for(const [id,fn] of Object.entries(bindings))$(id).addEventListener('click',fn);
for(const [id,origin] of [['home-options','start-overlay'],['pause-options','pause-overlay']])$(id).addEventListener('click',()=>{optionsOrigin=origin;show('options-overlay','sound-button');});
const closeOptions=()=>show(optionsOrigin,optionsOrigin==='pause-overlay'?'pause-options':'home-options');
$('options-back').addEventListener('click',closeOptions);
$('sound-button').addEventListener('click',()=>{muted=!muted;save('dwto-phish.sound',muted?'off':'on');preferences();sound();});
$('motion-button').addEventListener('click',()=>{reduced=!reduced;save('dwto-phish.motion',reduced?'reduced':'full');preferences();});
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
 if(['1','2','3'].includes(event.key)){choose(Number(event.key)-1);event.preventDefault();}
 else if(event.key==='Escape'||event.key.toLowerCase()==='p'){pause();event.preventDefault();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
function frame(now){const ms=Math.max(0,Math.min(80,now-last));last=now;if(!activeScreen){if(preview&&game.status==='running')game.remaining=game.rule.duration;else game.step(ms);drain();}requestAnimationFrame(frame);}
const preload=['scene-base.png','request-panel.png','permission-card.png','permission-card-yellow.png','permission-card-cyan.png','data-eater-idle.png','data-eater-blocked.png','data-eater-grab.png'].map(name=>`assets/permissions/v2/${name}`);
function load(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(new Error(src));image.src=src;});}
$('start-button').disabled=true;$('game').classList.add('is-start');hud();preferences();show('start-overlay');
Promise.all(preload.map(load)).then(()=>{$('start-button').disabled=false;if(campaign)start();else $('start-button').focus({preventScroll:true});requestAnimationFrame(frame);}).catch(error=>{console.error(error);show('load-error','reload-button');});
