import {CORE_IDS,GAMES,UNLOCK_POINTS} from './catalog.js';
import {ROUND_COUNT} from './generator.js';

const KEY='dwtp-extras-progress-v2';
const OLD_KEY='dwtp-extras-progress-v1';
const IDS=Object.keys(GAMES);
let memory=null;
let storageWorking=true;
const integer=(value,max=Number.MAX_SAFE_INTEGER)=>Math.min(max,Math.max(0,Math.trunc(Number(value)||0)));
const empty=()=>({total:0,corePoints:0,best:Object.fromEntries(IDS.map(id=>[id,0])),played:Object.fromEntries(IDS.map(id=>[id,0])),seen:[]});
function storage(){try{return globalThis.localStorage}catch{return null}}
function normalize(raw){
  const value=empty();
  if(!raw||typeof raw!=='object')return value;
  value.total=integer(raw.total);
  value.corePoints=integer(raw.corePoints,value.total);
  for(const id of IDS){value.best[id]=integer(raw.best?.[id],ROUND_COUNT);value.played[id]=integer(raw.played?.[id]);}
  value.seen=Array.isArray(raw.seen)?raw.seen.filter(token=>typeof token==='string').slice(-100):[];
  return value;
}
function read(){
  const source=storage();
  if(source)try{
    const current=source.getItem(KEY);
    if(current)return normalize(JSON.parse(current));
    const previous=JSON.parse(source.getItem(OLD_KEY)||'null');
    if(previous&&typeof previous==='object'){
      const migrated=empty();
      for(const id of IDS){
        migrated.best[id]=integer(previous[id],ROUND_COUNT);
        migrated.played[id]=migrated.best[id]>0?1:0;
        migrated.total+=migrated.best[id]*10;
        if(CORE_IDS.includes(id))migrated.corePoints+=migrated.best[id]*10;
      }
      return migrated;
    }
  }catch{storageWorking=false;/* Usar o progresso desta sessão se o armazenamento falhar. */}
  return normalize(memory);
}
function state(value,saved=!!storage()&&storageWorking){
  return {...value,unlocked:value.corePoints>=UNLOCK_POINTS&&CORE_IDS.every(id=>value.played[id]>0),goal:UNLOCK_POINTS,saved};
}
export function progressState(){return state(read());}
export function recordResult(id,score,token,maxScore=ROUND_COUNT){
  if(!GAMES[id])throw new Error('Jogo não encontrado');
  if(typeof token!=='string'||!token)throw new Error('Identificador da partida ausente');
  const before=read();
  if(before.seen.includes(token)||id==='master-challenge'&&!state(before).unlocked)return {...state(before),earned:0};
  const correct=integer(score,integer(maxScore,ROUND_COUNT));
  const earned=correct*10;
  const after=normalize(before);
  after.total+=earned;
  if(CORE_IDS.includes(id))after.corePoints+=earned;
  after.best[id]=Math.max(after.best[id],correct);
  after.played[id]++;
  after.seen.push(token);
  after.seen=after.seen.slice(-100);
  memory=after;
  let saved=false;
  const source=storage();
  if(source)try{source.setItem(KEY,JSON.stringify(after));saved=true;storageWorking=true}catch{storageWorking=false;/* A pontuação permanece nesta sessão. */}
  return {...state(after,saved),earned};
}
