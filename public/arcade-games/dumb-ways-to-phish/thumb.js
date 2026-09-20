import {ThumbGame,dragDirection} from './thumb-engine.js';
import {createThumbArt} from './thumb-art.js';
import {loadNumber} from './game-logic.js';
import {campaignFor,phaseOptions,roundText,advanceCampaign,finishCampaign,restartCampaign,decorateCampaign} from './campaign.js';
const $=id=>document.getElementById(id),canvas=$('thumb-canvas'),game=new ThumbGame();
const campaign=campaignFor('thumb');decorateCampaign(campaign);
let art,drag=null;
const screens=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
let activeScreen='start-overlay',optionsOrigin='start-overlay',last=performance.now(),endDelay=0,feedbackTime=0;
let storage;try{storage=localStorage;}catch{storage={getItem(){return null},setItem(){}};}
const save=(key,value)=>{try{storage.setItem(key,String(value));}catch{}};
const bestKey='dwto-phish.thumb.best.v1'+(new URLSearchParams(location.search).has('preview-check')?'.preview':'');
let best=loadNumber(storage,bestKey),muted=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,audio;
try{muted=storage.getItem('dwto-phish.sound')!=='on';const m=storage.getItem('dwto-phish.motion');if(m!==null)reduced=m==='reduced';}catch{}
function sound(bad){if(muted)return;try{audio??=new AudioContext();audio.resume().catch(()=>{});const osc=audio.createOscillator(),gain=audio.createGain();osc.type='square';osc.frequency.setValueAtTime(bad?150:650,audio.currentTime);osc.frequency.exponentialRampToValueAtTime(bad?65:950,audio.currentTime+.09);gain.gain.setValueAtTime(.025,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.13);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+.14);}catch{}}
function fitScore(){let size=42;const score=$('score'),box=score.parentElement,available=box.clientWidth-box.querySelector('span').clientWidth-20;score.style.fontSize=`${size}px`;while(score.scrollWidth>available&&size>12)score.style.fontSize=`${--size}px`;}
function hud(){
 $('score').textContent=game.score.toLocaleString('pt-BR');$('best').textContent=best.toLocaleString('pt-BR');$('lives').setAttribute('aria-label',`${game.lives} vidas`);
 $('lives').querySelectorAll('b').forEach((b,i)=>{const lost=i>=game.lives;b.classList.toggle('lost',lost);b.querySelector('img').src=`assets/ui/shield-${lost?'empty':'full'}.svg`;});fitScore();
}
function announce(text){$('announcer').textContent=text;}
function show(id,focus){if(id)cancelDrag();activeScreen=id;for(const screen of screens)$(screen).hidden=screen!==id;$('game-hud').inert=!!id;$('workroom').inert=!!id;if(id)(focus?$(focus):$(id).querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
function preferences(){$('sound-button').setAttribute('aria-pressed',String(!muted));$('sound-state').textContent=muted?'desligado':'ligado';$('motion-button').setAttribute('aria-pressed',String(reduced));$('motion-state').textContent=reduced?'sim':'não';document.body.classList.toggle('reduce-motion',reduced);}
function pause(){if(!['intro','running','draining'].includes(game.status))return;game.pause();show('pause-overlay','resume-button');}
function resume(){if(game.status!=='paused')return;game.resume();show(null);last=performance.now();canvas.focus({preventScroll:true});}
function start(){if(!art)return;game.start(campaign?phaseOptions(campaign):undefined);endDelay=0;feedbackTime=0;$('game').classList.remove('is-start');$('pause-button').disabled=false;show(null);events();hud();last=performance.now();canvas.focus({preventScroll:true});}
function home(){if(campaign){finishCampaign();location.href='./';return;}game.stop();endDelay=0;$('game').classList.add('is-start');$('pause-button').disabled=true;show('start-overlay','start-button');}
function end(){if(campaign)finishCampaign(game.score);$('end-score').textContent=game.score.toLocaleString('pt-BR');$('end-summary').textContent=`${game.correct} decisões certas · rodada ${game.round}.`;$('end-eyebrow').textContent=game.score>0&&game.score>=best?'NOVO RECORDE':'FIM DE JOGO';show('gameover-overlay','replay-button');announce(`Fim de jogo. ${game.score} pontos.`);}
function controls(){if(game.status!=='running')cancelDrag();$('hand-control').disabled=game.status!=='running';}
function events(){for(const event of game.drain()){
 if(event.type==='round'){feedbackTime=0;announce(roundText(campaign,game.round)+'. '+game.rule.message);hud();}
 if(event.type==='decision'){
  if(game.score>best){best=game.score;save(bestKey,best);}hud();
  const text=(event.good?'+'+event.points+' · '+(event.blocked?'Golpe evitado!':'Pode tocar!'):(event.blocked?'Essa ação podia passar.':'O golpe passou.'))+' '+game.rule.why;
  $('feedback').textContent=text;$('feedback').dataset.kind=event.good?'close':'wrong';feedbackTime=event.good?2200:3400;announce(text);sound(!event.good);
 }
 if(event.type==='over'){$('pause-button').disabled=true;end();}
 if(event.type==='complete'&&campaign)advanceCampaign(campaign,game.score,game.lives);
}controls();}
canvas.tabIndex=-1;
const handControl=$('hand-control');
function cancelDrag(){const id=drag?.id;drag=null;handControl.classList.remove('dragging');if(id!==undefined&&handControl.hasPointerCapture(id))handControl.releasePointerCapture(id);}
function point(event){const box=$('workroom').getBoundingClientRect();return {x:(event.clientX-box.left)*1672/box.width,y:(event.clientY-box.top)*941/box.height,scale:1672/box.width};}
handControl.addEventListener('pointerdown',event=>{
 if(activeScreen||game.status!=='running'||drag||event.button!==0||!event.isPrimary)return;
 const p=point(event);if(!art.hit(p.x,p.y))return;
 drag={id:event.pointerId,start:p,origin:art.handX,x:art.handX,threshold:Math.max(45,40*p.scale)};
 handControl.setPointerCapture(event.pointerId);handControl.classList.add('dragging');event.preventDefault();
});
handControl.addEventListener('pointermove',event=>{
 if(!drag||event.pointerId!==drag.id)return;
 const p=point(event);drag.x=Math.max(870,Math.min(1500,drag.origin+p.x-drag.start.x));art.draw(game,reduced,drag);event.preventDefault();
});
handControl.addEventListener('pointerup',event=>{
 if(!drag||event.pointerId!==drag.id)return;
 const p=point(event),direction=dragDirection(p.x-drag.start.x,p.y-drag.start.y,drag.threshold);
 const releaseX=Math.max(870,Math.min(1500,drag.origin+p.x-drag.start.x));cancelDrag();
 if(direction)game.choose(direction,releaseX);events();canvas.focus({preventScroll:true});event.preventDefault();
});
handControl.addEventListener('pointercancel',cancelDrag);
handControl.addEventListener('lostpointercapture',cancelDrag);
window.addEventListener('resize',cancelDrag);
const bindings={'start-button':start,'replay-button':campaign?restartCampaign:start,'pause-button':pause,'resume-button':resume,'exit-cancel':resume,'exit-confirm':home,'result-home':home,'reload-button':()=>location.reload(),'help-button':()=>show('help-overlay','help-back'),'help-back':()=>show('start-overlay','help-button'),'exit-button':()=>show('exit-overlay','exit-cancel'),'other-game':()=>location.href='./'};
for(const [id,fn] of Object.entries(bindings))$(id).addEventListener('click',fn);
for(const [id,origin] of [['home-options','start-overlay'],['pause-options','pause-overlay']])$(id).addEventListener('click',()=>{optionsOrigin=origin;show('options-overlay','sound-button');});
const closeOptions=()=>show(optionsOrigin,optionsOrigin==='pause-overlay'?'pause-options':'home-options');
$('options-back').addEventListener('click',closeOptions);
$('sound-button').addEventListener('click',()=>{muted=!muted;save('dwto-phish.sound',muted?'off':'on');preferences();sound(false);});
$('motion-button').addEventListener('click',()=>{reduced=!reduced;save('dwto-phish.motion',reduced?'reduced':'full');preferences();});
for(const id of screens)for(const event of ['focusin','pointermove'])$(id).addEventListener(event,e=>{const b=e.target.closest('.menu-item');if(b)$(id).querySelectorAll('.menu-item').forEach(el=>el.classList.toggle('current',el===b));});
document.addEventListener('keydown',event=>{
 if(event.repeat)return;
 if(activeScreen){
  if(event.key==='Escape'){if(activeScreen==='pause-overlay')resume();else if(activeScreen==='options-overlay')closeOptions();else if(activeScreen==='help-overlay')show('start-overlay','help-button');else if(activeScreen==='exit-overlay')show('pause-overlay','exit-button');event.preventDefault();return;}
  if(event.key.toLowerCase()==='p'&&activeScreen==='pause-overlay'){resume();event.preventDefault();return;}
  const buttons=[...$(activeScreen).querySelectorAll('button:not(:disabled)')],index=buttons.indexOf(document.activeElement);
  if(['ArrowUp','ArrowDown','Home','End'].includes(event.key)){const n=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[n]?.focus();event.preventDefault();}
  if(event.key==='Tab'&&buttons.length){if(event.shiftKey&&index<=0){buttons.at(-1).focus();event.preventDefault();}else if(!event.shiftKey&&index===buttons.length-1){buttons[0].focus();event.preventDefault();}}return;
 }
 if(['ArrowLeft','ArrowRight'].includes(event.key)){const x=art.handX;cancelDrag();game.choose(event.key==='ArrowLeft'?'left':'right',x);events();event.preventDefault();}
 if(event.key==='Escape'||event.key.toLowerCase()==='p'){pause();event.preventDefault();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
function frame(now){const ms=Math.max(0,now-last);last=now;if(!activeScreen){game.step(ms);events();feedbackTime=Math.max(0,feedbackTime-ms);if(endDelay){endDelay-=ms;if(endDelay<=0){endDelay=0;end();}}}
 $('intro-command').hidden=true;
 $('round-timer').textContent=((game.remaining||0)/1000).toFixed(1).replace('.',',')+'s';
 $('round-progress').textContent=roundText(campaign,game.round);
 $('round-clock').classList.toggle('urgent',game.status==='running'&&game.remaining<2500);
 $('feedback').hidden=feedbackTime<=0;art.draw(game,reduced,drag);requestAnimationFrame(frame);
}
$('start-button').disabled=true;$('game').classList.add('is-start');hud();preferences();show('start-overlay');
new ResizeObserver(fitScore).observe($('score').parentElement);
createThumbArt(canvas,handControl).then((renderer)=>{art=renderer;$('start-button').disabled=false;if(campaign)start();else if(activeScreen==='start-overlay')$('start-button').focus();requestAnimationFrame(frame);}).catch(err=>{console.error(err);show('load-error','reload-button');});


