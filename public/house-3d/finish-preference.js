// Appearance is independent of the floor plan and furniture save format.
export const FINISH_KEY='casa-atelie-3d:finish:v2';
export const FINISHES=['previous','detailed','crafted','crafted-plain','default-room','industrial','industrial-loft','cyberpunk','gothic','dark-academia'];
export const SELECTABLE_FINISHES=FINISHES.filter(finish=>!['previous','detailed','crafted-plain'].includes(finish));
export function readFinish(storage) {
  try{const value=storage?.getItem(FINISH_KEY);return SELECTABLE_FINISHES.includes(value)?value:'crafted';}
  catch{return 'crafted';}
}
export function writeFinish(storage,value) {
  if(!SELECTABLE_FINISHES.includes(value))throw Error('Acabamento desconhecido.');
  storage.setItem(FINISH_KEY,value);
}
export const REFINED_ITEMS=new Set(['cabinet','bookcase','shelf','print','books','lamp']);
const crafted=finish=>['crafted','crafted-plain','default-room','industrial','industrial-loft','cyberpunk','gothic','dark-academia'].includes(finish);
export function finishThumbnail(item,finish) {
  if(['table','grave'].includes(item.id))return `assets/novos-modelos/${item.id}.png`;
  if(crafted(finish)&&item.id==='armchair')return 'assets/moveis-marcenaria/armchair.png';
  return finish==='detailed'&&REFINED_ITEMS.has(item.id)?`assets/casa-refinada/${item.id}.png`:item.image;
}
export function furnitureAsset(finish) {
  return crafted(finish)?'./assets/moveis-marcenaria/mesa-poltrona.glb':'./assets/moveis-refinados/mesa-poltrona.glb';
}
export function trophyAsset() {
  return './assets/novos-modelos/lapide.glb';
}
export function architectureAsset(finish){
  if(['default-room','industrial','industrial-loft','cyberpunk','gothic','dark-academia'].includes(finish))return './assets/comodo-default/comodo-modular.glb';
  return finish==='crafted'?'./assets/arquitetura-marcenaria/piso-e-perfis.glb':'./assets/structure/piso-modular.glb';
}
