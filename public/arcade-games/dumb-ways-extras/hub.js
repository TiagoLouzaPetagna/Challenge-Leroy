import {CORE_IDS} from './catalog.js';
import {progressState} from './progress.js';
import {ROUND_COUNT} from './generator.js';

const state=progressState();
document.getElementById('total-points').textContent=String(state.total);
const missing=CORE_IDS.filter(id=>!state.played[id]).length;
document.getElementById('goal-progress').textContent=state.unlocked?'Desafio Mestre liberado!':`${state.corePoints} de ${state.goal} pontos · ${missing?`faltam ${missing} ${missing===1?'jogo':'jogos'} para concluir ao menos uma vez`:'todos os jogos concluídos'}`;
document.getElementById('goal-bar').value=Math.min(state.corePoints,state.goal);
document.getElementById('save-note').textContent=state.saved?'Progresso salvo neste navegador. Ao concluir cada partida, cada acerto vale 10 pontos. Novas partidas também somam.':'O armazenamento deste navegador está indisponível; o progresso pode não permanecer após sair.';
for(const id of CORE_IDS){
  const card=document.querySelector(`[data-id="${id}"]`);
  card.querySelector('.card-score').textContent=`Recorde: ${state.best[id]}/${ROUND_COUNT} · ${state.played[id]} ${state.played[id]===1?'partida':'partidas'}`;
}
const bonus=document.getElementById('bonus-card');
bonus.classList.toggle('locked',!state.unlocked);
bonus.setAttribute('aria-disabled',String(!state.unlocked));
bonus.querySelector('.card-score').textContent=state.unlocked?`Recorde: ${state.best['master-challenge']}/${ROUND_COUNT} · ${state.played['master-challenge']} ${state.played['master-challenge']===1?'partida':'partidas'}`:'Conclua os cinco jogos e junte 300 pontos';
if(!state.unlocked)bonus.removeAttribute('href');
