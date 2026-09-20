export const FIRST_PASS=['popups','link','thumb','permissions','badge','conveyor','usb'];
export const GAME_NAMES={popups:'Fecha essa janela!',link:'Link torto',thumb:'Dedão apressado',permissions:'Permissão pra quê?',badge:'Crachá falso',conveyor:'Antivírus com fome',usb:'Porta errada'};
export const ROUNDS_PER_PHASE={popups:1,link:3,thumb:3,permissions:3,badge:3,conveyor:1,usb:1};
const KEY='dwto-phish.campaign.v1';
const path=id=>id==='conveyor'?'./':'./'+id+'.html';
const shuffle=(items,rng)=>{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.min(i,Math.floor(rng()*(i+1)));[result[i],result[j]]=[result[j],result[i]];}return result;};
export function initialCampaign(){return {phase:0,game:FIRST_PASS[0],score:0,lives:3,bag:[],last:null};}
export function nextCampaign(state,rng=Math.random){
 const phase=state.phase+1,bag=[...state.bag];let game;
 if(phase<FIRST_PASS.length)game=FIRST_PASS[phase];
 else{if(!bag.length){bag.push(...shuffle(FIRST_PASS,rng));if(bag.at(-1)===state.game&&bag.length>1)[bag[bag.length-1],bag[bag.length-2]]=[bag[bag.length-2],bag[bag.length-1]];}game=bag.pop();}
 return {...state,phase,game,bag,last:state.game};
}
export const phaseOptions=state=>({score:state.score,lives:state.lives,round:state.phase+1,rounds:ROUNDS_PER_PHASE[state.game]});
export const roundText=(state,round)=>state?`Rodada ${round-state.phase} de ${ROUNDS_PER_PHASE[state.game]}`:`Rodada ${round}`;
function read(){try{const value=JSON.parse(sessionStorage.getItem(KEY));return value&&Number.isInteger(value.phase)&&FIRST_PASS.includes(value.game)&&value.lives>0?value:null;}catch{return null;}}
function write(state){sessionStorage.setItem(KEY,JSON.stringify(state));}
export function beginCampaign(){const state=initialCampaign();write(state);location.href=path(state.game)+'?campaign=1';}
export function campaignFor(id){if(!new URLSearchParams(location.search).has('campaign'))return null;const state=read();return state?.game===id?state:null;}
export function advanceCampaign(state,score,lives){if(!state)return;const next=nextCampaign({...state,score,lives});write(next);location.href=path(next.game)+'?campaign=1';}
export function finishCampaign(score){
 if(Number.isInteger(score))window.parent.postMessage({source:'fortifica:arcade-game',version:1,type:'arcade:finished',game:'dumb-ways-to-phish',score},location.origin);
 try{sessionStorage.removeItem(KEY);}catch{}
}
export function restartCampaign(){beginCampaign();}
export function decorateCampaign(state){
 if(!state)return;
 document.body.classList.add('campaign-active');
 const label=document.createElement('div');label.className='campaign-label';label.textContent=`FASE ${state.phase+1} · ${GAME_NAMES[state.game]}`;
 document.querySelector('.game-hud')?.append(label);
 const replay=document.getElementById('replay-button');if(replay)replay.textContent='Recomeçar sequência';
}
