import {campaignFor,phaseOptions,advanceCampaign,finishCampaign,restartCampaign,decorateCampaign} from './campaign.js';
const $=id=>document.getElementById(id),frame=$('usb-frame');
const campaign=campaignFor('usb');decorateCampaign(campaign);
const screens=['start-overlay','pause-overlay','options-overlay','help-overlay','exit-overlay','gameover-overlay','load-error'];
let active='start-overlay',origin='start-overlay',ready=false,playing=false,score=0,lives=3,round=0,audio;
const read=(k)=>{try{return localStorage.getItem(k);}catch{return null;}},save=(k,v)=>{try{localStorage.setItem(k,v);}catch{}};
const bestKey='dwto-phish.usb.best.v1'+(location.search.includes('preview-check')?'.preview':'');
let best=Number(read(bestKey))||0,muted=read('dwto-phish.sound')!=='on',reduced=read('dwto-phish.motion')==='reduced'||(read('dwto-phish.motion')===null&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const send=(type,data={})=>frame.contentWindow.postMessage({usb:true,type,...data},location.origin);
function show(id,focus){active=id;for(const s of screens)$(s).hidden=s!==id;frame.inert=!!id;$('game-hud').inert=!!id;if(id)(focus?$(focus):$(id).querySelector('button:not(:disabled)'))?.focus();else frame.focus();}
function hud(){$('score').textContent=score.toLocaleString('pt-BR');$('best').textContent=best.toLocaleString('pt-BR');$('lives').setAttribute('aria-label',`${lives} vidas`);$('lives').querySelectorAll('img').forEach((img,i)=>{img.src=`assets/ui/shield-${i<lives?'full':'empty'}.svg`;});}
function sound(bad){if(muted)return;try{audio??=new AudioContext();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type='square';o.frequency.value=bad?150:650;g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.13);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.14);}catch{}}
function preferences(){$('sound-state').textContent=muted?'desligado':'ligado';$('sound-button').setAttribute('aria-pressed',String(!muted));$('motion-state').textContent=reduced?'sim':'não';$('motion-button').setAttribute('aria-pressed',String(reduced));document.body.classList.toggle('reduce-motion',reduced);send('preferences',{reduced});}
function start(){if(!ready)return;playing=true;$('game').classList.remove('is-start');$('pause-button').disabled=false;show(null);send('start',{options:campaign?phaseOptions(campaign):undefined});}
function pause(){if(!playing||active)return;send('pause');show('pause-overlay','resume-button');}
function resume(){if(!playing)return;send('resume');show(null);}
function home(){if(campaign){finishCampaign();location.href='./';return;}send('stop');playing=false;$('pause-button').disabled=true;$('game').classList.add('is-start');show('start-overlay','start-button');}
const actions={'start-button':start,'replay-button':campaign?restartCampaign:start,'pause-button':pause,'resume-button':resume,'exit-cancel':resume,'exit-confirm':home,'result-home':home,'other-game':()=>location.href='./','help-button':()=>show('help-overlay'),'help-back':()=>show('start-overlay','help-button'),'exit-button':()=>show('exit-overlay'),'reload-button':()=>location.reload(),'home-options':()=>{origin='start-overlay';show('options-overlay');},'pause-options':()=>{origin='pause-overlay';show('options-overlay');},'options-back':()=>show(origin),'sound-button':()=>{muted=!muted;save('dwto-phish.sound',muted?'off':'on');preferences();sound(false);},'motion-button':()=>{reduced=!reduced;save('dwto-phish.motion',reduced?'reduced':'full');preferences();}};
for(const [id,fn] of Object.entries(actions))$(id).onclick=fn;
window.addEventListener('message',e=>{
 if(e.source!==frame.contentWindow||e.origin!==location.origin||!e.data.usb)return;
 const d=e.data;
 if(d.type==='ready'){ready=true;$('start-button').disabled=false;preferences();if(campaign)start();}
 if(d.type==='error')show('load-error');
 if(d.type==='pause')pause();
 if(d.type==='decision')sound(!d.correct);
 if(d.type==='hud'){({score,lives,round}=d);if(score>best){best=score;save(bestKey,String(best));}hud();$('announcer').textContent=`Rodada ${round}. ${score} pontos. ${lives} vidas.`;}
 if(d.type==='finished'){
  playing=false;$('pause-button').disabled=true;
  if(campaign&&lives>0){advanceCampaign(campaign,score,lives);return;}
  if(campaign)finishCampaign(score);
  $('end-score').textContent=score.toLocaleString('pt-BR');$('end-summary').textContent=`${score} conexões autorizadas · rodada ${round}.`;show('gameover-overlay','replay-button');
 }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
document.addEventListener('keydown',e=>{if(e.repeat)return;if(!active&&['Escape','p','P',' '].includes(e.key)){e.preventDefault();pause();return;}if(e.key==='Escape'){if(active==='pause-overlay')resume();else if(active==='options-overlay')show(origin);else if(active==='exit-overlay')show('pause-overlay');else if(active==='help-overlay')show('start-overlay');e.preventDefault();}if(!active)return;const buttons=[...$(active).querySelectorAll('button:not(:disabled)')],i=buttons.indexOf(document.activeElement);if(['ArrowDown','ArrowUp','Tab'].includes(e.key)&&buttons.length){const backwards=e.key==='ArrowUp'||e.key==='Tab'&&e.shiftKey;buttons[(i+(backwards?-1:1)+buttons.length)%buttons.length].focus();e.preventDefault();}});
for(const id of screens)$(id).addEventListener('focusin',e=>{$(id).querySelectorAll('.menu-item').forEach(b=>b.classList.toggle('current',b===e.target));});
$('start-button').disabled=true;$('game').classList.add('is-start');show('start-overlay');hud();preferences();
