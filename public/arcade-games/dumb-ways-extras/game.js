import {GAMES} from './catalog.js';
import {progressState,recordResult} from './progress.js';
import {createSession} from './generator.js';

const id=document.body.dataset.game;
const game=GAMES[id];
if(!game)throw new Error('Jogo não encontrado');
document.body.classList.add(`color-${game.color}`);
const intro=document.getElementById('intro');
const progress=document.getElementById('progress');
const stage=document.getElementById('stage');
const feedback=document.getElementById('feedback');
const next=document.getElementById('next');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let rounds=createSession(id),sessionToken=crypto.randomUUID(),round=0,score=0,answered=false,preview=false,holdTimer=null,selection=[],found=new Set(),wrongClue=false;

intro.innerHTML=`<p class="eyebrow">${esc(game.tag)}</p><h1>${esc(game.title)}</h1><p>${esc(game.description)}</p><p class="play-note">Conclua as dez rodadas para adicionar os pontos ao passaporte.</p>`;

function finish(correct,why){
  if(answered)return;
  answered=true;
  if(correct)score++;
  progress.textContent=`Rodada ${round+1} de ${rounds.length}  ·  ${score} ${score===1?'acerto':'acertos'}`;
  feedback.className=correct?'good':'bad';
  feedback.innerHTML=`<span class="round-result">${correct?'Acertou!':'Quase!'} </span>${esc(why)}`;
  stage.querySelectorAll('button').forEach(button=>button.disabled=true);
  next.hidden=false;
  next.textContent=round===rounds.length-1?'Ver resultado →':'Próxima rodada →';
  next.focus();
}

function hoverHtml(r){return `<h2>O que há atrás deste botão?</h2><p class="prompt">Passe o mouse ou mantenha o dedo pressionado para ver o endereço. Depois escolha.</p><p class="hint">Domínio conhecido: <strong>${esc(r.trusted)}</strong></p><button class="hover-target" data-action="hover-target" type="button">${esc(r.label)}</button><div class="reveal${preview?' visible':''}" id="destination">${preview?`<strong>Destino revelado</strong><code>${esc(r.url)}</code>`:'Destino oculto. Inspecione antes de decidir.'}</div><div class="choices two"><button class="choice" data-action="hover-choice" data-choice="open" type="button" ${preview?'':'disabled'}>Abrir</button><button class="choice" data-action="hover-choice" data-choice="report" type="button" ${preview?'':'disabled'}>Reportar</button></div>`;}
function lockpickHtml(r){return `<h2>Qual é o domínio real?</h2><p class="prompt">O começo do endereço pode tentar enganar. Escolha o domínio que controla o destino.</p><div class="url-display">${esc(r.url)}</div><div class="choices">${r.choices.map((c,i)=>`<button class="choice" data-action="domain" data-index="${i}" type="button">${esc(c)}</button>`).join('')}</div>`;}
function builderHtml(r){const pieces=selection.map(i=>r.pieces[i]);return `<h2>${esc(r.request)}</h2><p class="prompt">Monte o endereço na ordem indicada. Compare as peças parecidas antes de escolher.</p><p class="hint">Domínio conhecido: <strong>${esc(r.trusted)}</strong></p><div class="slots">${['Protocolo','Subdomínio','Nome','Final','Caminho'].map((label,i)=>`<div class="slot${pieces[i]?' filled':''}">${esc(pieces[i]||label)}</div>`).join('')}</div><div class="assembly">${pieces.length?esc(pieces.join('')):'Sua URL aparece aqui'}</div><div class="piece-tray">${r.pieces.map((piece,i)=>`<button class="piece" data-action="piece" data-index="${i}" type="button" ${selection.includes(i)||selection.length>=5?'disabled':''}>${esc(piece)}</button>`).join('')}</div><div class="builder-actions"><button class="small-button" data-action="undo" type="button" ${selection.length?'':'disabled'}>Desfazer</button><button class="primary" data-action="check" type="button" ${selection.length===5?'':'disabled'}>Conferir URL</button></div>`;}
function loginHtml(r){const details=[r.url,r.noticeDetail||r.notice,r.request,r.footerDetail||r.footer];return `<h2>Encontre dois sinais suspeitos</h2><p class="prompt">Clique nas partes que merecem uma verificação antes de qualquer login. Os campos abaixo são apenas ilustração.</p><div class="fake-browser"><div class="fake-bar"><span class="fake-dot" aria-hidden="true"></span><button class="clue" data-action="clue" data-index="0" type="button">${esc(details[0])}</button></div><div class="fake-page"><h3>${esc(r.brand)}</h3><button class="clue" data-action="clue" data-index="1" type="button">${esc(details[1])}</button><div class="fake-fields"><div class="fake-input">Usuário</div><div class="fake-input">Senha</div></div><button class="clue" data-action="clue" data-index="2" type="button">${esc(details[2])}</button><button class="clue" data-action="clue" data-index="3" type="button">${esc(details[3])}</button></div></div><p class="hint" id="clue-count">${found.size} de 2 sinais encontrados</p>`;}
function callbackHtml(r){return `<h2>Como você confirma esse pedido?</h2><div class="message-card"><b>${esc(r.from)}</b><p>${esc(r.message)}</p></div><div class="choices">${r.choices.map((c,i)=>`<button class="choice" data-action="callback" data-index="${i}" type="button">${esc(c)}</button>`).join('')}</div>`;}

function renderStage(){const r=rounds[round],kind=r.kind||game.kind;stage.innerHTML=({hover:hoverHtml,lockpick:lockpickHtml,builder:builderHtml,login:loginHtml,callback:callbackHtml})[kind](r);if(kind==='hover')bindHover();}
function showRound(){answered=false;preview=false;selection=[];found=new Set();wrongClue=false;feedback.textContent='';feedback.className='';next.hidden=true;progress.textContent=`Rodada ${round+1} de ${rounds.length}  ·  ${score} ${score===1?'acerto':'acertos'}`;renderStage();}
function showEnd(){
  const result=recordResult(id,score,sessionToken,rounds.length);
  const bonusLink=result.unlocked&&id!=='master-challenge'?'<a class="bonus-link" href="master-challenge.html">Jogar Desafio Mestre →</a>':'';
  progress.textContent='Desafio concluído';
  stage.innerHTML=`<h2>Fim de jogo</h2><div class="end-score">${score}/${rounds.length}</div><div class="points-earned">+${result.earned} pontos nesta partida</div><p>Melhor marca: ${result.best[id]}/${rounds.length} · Total: <strong>${result.total} pontos</strong></p><p class="save-note">${result.saved?'Progresso salvo neste navegador.':'Armazenamento indisponível neste navegador.'} Uma nova partida sorteia outras atividades e seus acertos também somam pontos.</p>${bonusLink}<a class="back" href="index.html">← Ver todos os jogos</a>`;
  feedback.textContent='';feedback.className='';next.hidden=false;next.textContent='Jogar novamente';
  window.parent.postMessage({source:'fortifica:arcade-game',version:1,type:'arcade:finished',game:'dumb-ways-extras',score},location.origin);
}
function reveal(){if(preview||answered)return;preview=true;const d=document.getElementById('destination');d.classList.add('visible');d.innerHTML=`<strong>Destino revelado</strong><code>${esc(rounds[round].url)}</code>`;stage.querySelectorAll('[data-action="hover-choice"]').forEach(b=>b.disabled=false);}
function bindHover(){const target=stage.querySelector('.hover-target');const start=()=>{clearTimeout(holdTimer);holdTimer=setTimeout(reveal,400);};target.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')start();});target.addEventListener('pointerleave',()=>clearTimeout(holdTimer));target.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')start();});target.addEventListener('pointerup',()=>clearTimeout(holdTimer));target.addEventListener('pointercancel',()=>clearTimeout(holdTimer));target.addEventListener('focus',()=>{if(target.matches(':focus-visible'))reveal();});}

stage.addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');if(!button||answered)return;
  const r=rounds[round],action=button.dataset.action,index=Number(button.dataset.index);
  if(action==='hover-target'){if(!preview){feedback.className='bad';feedback.textContent='Primeiro revele o destino passando o mouse ou segurando o botão.';}return;}
  if(action==='hover-choice'){finish((button.dataset.choice==='open')===r.safe,r.why);return;}
  if(action==='domain'){finish(index===r.answer,r.why);return;}
  if(action==='piece'){if(selection.length<5){selection.push(index);renderStage();}return;}
  if(action==='undo'){selection.pop();renderStage();return;}
  if(action==='check'){finish(selection.map(i=>r.pieces[i]).join('')===r.answer.join(''),`${r.why} Endereço: ${r.answer.join('')}`);return;}
  if(action==='clue'){
    if(found.has(index)||button.classList.contains('wrong'))return;
    const flagPosition=r.flags.indexOf(index);
    if(flagPosition<0){wrongClue=true;button.classList.add('wrong');feedback.className='bad';feedback.textContent='Isso sozinho não é um sinal de fraude. Procure outro detalhe.';return;}
    found.add(index);button.classList.add('found');button.disabled=true;feedback.className='good';feedback.textContent=r.reasons[flagPosition];document.getElementById('clue-count').textContent=`${found.size} de 2 sinais encontrados`;
    if(found.size===r.flags.length)finish(!wrongClue,r.why);
    return;
  }
  if(action==='callback')finish(index===r.answer,r.why);
});
next.addEventListener('click',()=>{if(round>=rounds.length){rounds=createSession(id);sessionToken=crypto.randomUUID();round=0;score=0;showRound();return;}round++;if(round<rounds.length)showRound();else showEnd();});
if(id==='master-challenge'&&!progressState().unlocked){progress.textContent='Desafio bloqueado';stage.innerHTML='<h2>Primeiro, pratique os cinco jogos</h2><p>Conclua os cinco jogos e junte 300 pontos para abrir este desafio.</p><a class="back" href="index.html">← Ver os jogos</a>';next.hidden=true;}else showRound();
