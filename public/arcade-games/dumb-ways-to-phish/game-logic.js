/** Pure round generation and scoring. The only downloads in this game are artwork. */
const THEMES = [
  {format:'PDF',extension:'pdf',names:['boleto','contrato','relatorio','recibo','proposta','fatura'],disguises:['exe','js','lnk','bat']},
  {format:'uma imagem',extension:'jpg',names:['foto','comprovante','convite','imagem','cartaz','banner'],disguises:['exe','scr','lnk']},
  {format:'uma planilha',extension:'xlsx',names:['orcamento','planilha','custos','balanco','precos','agenda'],disguises:['exe','js','bat']},
  {format:'um documento Word',extension:'docx',names:['resumo','proposta','contrato','curriculo','roteiro','ata'],disguises:['exe','lnk','js']},
];
export function responseWindowMs(roundNumber){
  const pace=Math.floor((Math.max(1,roundNumber)-1)/3);
  return Math.max(3300,Math.round(7600*Math.pow(.9,pace)));
}
export function paceFor(roundNumber){return Math.floor((Math.max(1,roundNumber)-1)/3)+1;}
export function multiplier(streak){return Math.min(3,1+Math.floor(Math.max(0,streak-1)/5));}
export function scoreFor(remainingMs,totalMs,streak){
  const ratio=Math.min(1,Math.max(0,remainingMs/Math.max(1,totalMs)));
  return (100+Math.round(100*ratio))*multiplier(streak);
}
export function shuffle(items,rng=Math.random){
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.min(i,Math.floor(rng()*(i+1)));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
export function makeRound(roundNumber,rng=Math.random){
  const theme=roundNumber<=3?THEMES[0]:THEMES[Math.floor(rng()*THEMES.length)%THEMES.length];
  const count=roundNumber>=7?3:2;
  const names=shuffle(theme.names,rng).slice(0,count);
  const executable=theme.disguises[Math.floor(rng()*theme.disguises.length)%theme.disguises.length];
  const files=names.map((name,index)=>({
    id:`r${roundNumber}-${index}`,
    name:index===0?`${name}.${theme.extension}.${executable}`:`${name}.${theme.extension}`,
    suspicious:index===0,
    size:`${80+Math.floor(rng()*780)} KB`,
    tilt:Math.round(rng()*8-4),
  }));
  return {
    number:roundNumber,pace:paceFor(roundNumber),duration:responseWindowMs(roundNumber),
    clue:theme.extension==='pdf'?'Você esperava um PDF. Qual arquivo está disfarçado?':`Você esperava ${theme.format}. Qual arquivo está disfarçado?`,
    files:shuffle(files,rng),
    explanation:`O nome termina em .${executable}, não em .${theme.extension}. O disfarce está na extensão.`,
    intendedExtension:theme.extension,
  };
}
export function evaluateChoice(round,id){
  const chosen=round.files.find(file=>file.id===id);
  if(!chosen)return {valid:false,correct:false};
  return {valid:true,correct:chosen.suspicious,file:chosen};
}
export function loadNumber(storage,key,fallback=0){
  try{const value=Number(storage.getItem(key));return Number.isFinite(value)&&value>=0?Math.floor(value):fallback;}catch{return fallback;}
}
