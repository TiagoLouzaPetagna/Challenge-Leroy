import {PopupGame,AD_NAMES,SIZE,BLOG_CLOSE,closeRect,closeExposed,contains} from './popups-engine.js';
import {campaignFor,phaseOptions,roundText,advanceCampaign,finishCampaign,restartCampaign,decorateCampaign} from './campaign.js';
import {PopupArt} from './popups-art.js';
import {loadNumber} from './game-logic.js';
import {createStageBackdrop} from './expanded-stage.js';
const $=id=>document.getElementById(id),canvas=$('popup-canvas'),game=new PopupGame(),art=new PopupArt(canvas);
const campaign=campaignFor('popups');decorateCampaign(campaign);
const screens=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
let activeScreen='start-overlay',optionsOrigin='start-overlay',last=performance.now(),endDelay=0,feedbackTime=0;
let storage;try{storage=localStorage;}catch{storage={getItem(){return null},setItem(){}};}
const save=(key,value)=>{try{storage.setItem(key,String(value));}catch{}};
const bestKey='dwto-phish.popups.best.v1'+(new URLSearchParams(location.search).has('preview-check')?'.preview':'');
let best=loadNumber(storage,bestKey),muted=true,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,audio;
try{muted=storage.getItem('dwto-phish.sound')!=='on';const m=storage.getItem('dwto-phish.motion');if(m!==null)reduced=m==='reduced';}catch{}
function sound(bad){if(muted)return;try{audio??=new AudioContext();audio.resume().catch(()=>{});const osc=audio.createOscillator(),gain=audio.createGain();osc.type='square';osc.frequency.setValueAtTime(bad?150:650,audio.currentTime);osc.frequency.exponentialRampToValueAtTime(bad?65:950,audio.currentTime+.09);gain.gain.setValueAtTime(.025,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.13);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+.14);}catch{}}
function fitScore(){let size=42;const score=$('score'),box=score.parentElement,available=box.clientWidth-box.querySelector('span').clientWidth-20;score.style.fontSize=`${size}px`;while(score.scrollWidth>available&&size>12)score.style.fontSize=`${--size}px`;}
function hud(){
 $('score').textContent=game.score.toLocaleString('pt-BR');$('best').textContent=best.toLocaleString('pt-BR');$('lives').setAttribute('aria-label',`${game.lives} vidas`);
 $('lives').querySelectorAll('b').forEach((b,i)=>{const lost=i>=game.lives;b.classList.toggle('lost',lost);b.querySelector('img').src=`assets/ui/shield-${lost?'empty':'full'}.svg`;});fitScore();
}
function announce(text){$('announcer').textContent=text;}
function show(id,focus){activeScreen=id;for(const screen of screens)$(screen).hidden=screen!==id;$('game-hud').inert=!!id;$('workroom').inert=!!id;if(id)(focus?$(focus):$(id).querySelector('button:not(:disabled)'))?.focus({preventScroll:true});}
function preferences(){$('sound-button').setAttribute('aria-pressed',String(!muted));$('sound-state').textContent=muted?'desligado':'ligado';$('motion-button').setAttribute('aria-pressed',String(reduced));$('motion-state').textContent=reduced?'sim':'não';document.body.classList.toggle('reduce-motion',reduced);}
function pause(){if(!['intro','running','draining'].includes(game.status))return;game.pause();show('pause-overlay','resume-button');}
function resume(){if(game.status!=='paused')return;game.resume();show(null);last=performance.now();canvas.focus({preventScroll:true});}
function start(){if(!art.ready)return;game.start(campaign?phaseOptions(campaign):undefined);art.reset();endDelay=0;feedbackTime=0;$('game').classList.remove('is-start');$('pause-button').disabled=false;show(null);events();hud();last=performance.now();canvas.focus({preventScroll:true});}
function home(){if(campaign){finishCampaign();location.href='./';return;}game.stop();art.reset();endDelay=0;$('game').classList.add('is-start');$('pause-button').disabled=true;show('start-overlay','start-button');}
function end(){if(campaign)finishCampaign(game.score);$('end-score').textContent=game.score.toLocaleString('pt-BR');$('end-summary').textContent=`${game.closed} anúncios fechados · rodada ${game.round}.`;$('end-eyebrow').textContent=game.score>0&&game.score>=best?'NOVO RECORDE':'FIM DE JOGO';show('gameover-overlay','replay-button');announce(`Fim de jogo. ${game.score} pontos.`);}
function events(){for(const event of game.drain()){
 if(event.type==='round'){feedbackTime=0;announce(`${roundText(campaign,game.round)}. ${game.rule.count} janelas, ${game.rule.duration/1000} segundos para fechar todas.`);}
 if(event.type==='clear'){$('feedback').textContent='Todas fechadas!';feedbackTime=900;announce('Todas as janelas fechadas!');}
 if(event.type==='decision'){
  if(event.window)art.ghosts.push({window:{...event.window},fade:1});
  if(game.score>best){best=game.score;save(bestKey,best);}hud();
  const text=event.kind==='close'?`+${event.points} · Janela fechada!`:event.kind==='blog'?'Esse X é do blog! Feche apenas os anúncios.':event.kind==='bait'?'Era uma isca! Use o X da janela.':`Tempo esgotado! ${event.missed} por fechar · −1 escudo`;
  $('feedback').textContent=text;$('feedback').dataset.kind=event.kind;feedbackTime=1400;announce(text);sound(event.kind!=='close');
 }
 if(event.type==='over'){$('pause-button').disabled=true;endDelay=650;}
 if(event.type==='complete'&&campaign)advanceCampaign(campaign,game.score,game.lives);
}}
function controls(){
 $('blog-close').disabled=game.status!=='running';
 const parent=$('popup-controls'),ids=new Set(game.windows.map(w=>String(w.id)));
 for(const button of [...parent.children])if(!ids.has(button.dataset.id)){if(button===document.activeElement)canvas.focus({preventScroll:true});button.remove();art.focus=null;}
 for(const win of game.windows){let button=parent.querySelector(`[data-id="${win.id}"]`);if(!button){button=document.createElement('button');button.type='button';button.className='popup-close';button.dataset.id=win.id;button.setAttribute('aria-label',`Fechar anúncio: ${AD_NAMES[win.type]}`);button.addEventListener('focus',()=>art.focus=win.id);button.addEventListener('blur',()=>art.focus=null);button.addEventListener('click',()=>{game.resolve(win.id,'close');events();controls();});parent.append(button);}
  const r=closeRect(win);Object.assign(button.style,{left:`${r.x/SIZE.w*100}%`,top:`${r.y/SIZE.h*100}%`,width:`${r.w/SIZE.w*100}%`,height:`${r.h/SIZE.h*100}%`});button.disabled=game.status!=='running'||win.age<180||!closeExposed(win,game.windows);
 }
}
canvas.tabIndex=-1;
$('blog-close').addEventListener('click',()=>{game.click({x:BLOG_CLOSE.x+10,y:BLOG_CLOSE.y+10});events();});
canvas.addEventListener('click',event=>{game.click(art.point(event));events();controls();});
canvas.addEventListener('pointermove',event=>{const p=art.point(event);canvas.style.cursor=game.status==='running'&&game.windows.some(w=>contains(w,p))?'pointer':'default';});
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
 if(event.key==='Escape'||event.key.toLowerCase()==='p'){pause();event.preventDefault();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
function frame(now){const ms=Math.min(100,Math.max(0,now-last));last=now;if(!activeScreen){game.step(ms);events();art.update(ms);feedbackTime=Math.max(0,feedbackTime-ms);if(endDelay){endDelay-=ms;if(endDelay<=0){endDelay=0;end();}}}
 $('intro-command').hidden=game.status!=='intro';$('intro-command').textContent=`${roundText(campaign,game.round)} · ${game.rule?.count||0} janelas · ${(game.rule?.duration||0)/1000}s`;
 $('round-timer').textContent=`${((game.remaining||0)/1000).toFixed(1).replace('.',',')}s`;
 $('round-progress').textContent=`${game.windows.length} por fechar`;
 $('round-clock').classList.toggle('urgent',game.status==='running'&&game.remaining<3000);
 $('feedback').hidden=feedbackTime<=0;controls();art.draw(game,reduced);requestAnimationFrame(frame);
}
$('start-button').disabled=true;$('game').classList.add('is-start');hud();preferences();show('start-overlay');
new ResizeObserver(fitScore).observe($('score').parentElement);
Promise.all([art.load(),createStageBackdrop($('stage-backdrop'),$('workroom'),'popups')]).then(()=>{$('start-button').disabled=false;if(campaign)start();else if(activeScreen==='start-overlay')$('start-button').focus();requestAnimationFrame(frame);}).catch(err=>{console.error(err);show('load-error','reload-button');});
