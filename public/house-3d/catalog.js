import {FLOOR_TROPHY} from './trophy-metadata.js';
import {MIMIC} from './mimic-metadata.js';
import {NEUTRAL_ITEMS} from './neutral-catalog.js';
import {INDUSTRIAL_ITEMS} from './industrial-catalog.js';
import {CYBERPUNK_ITEMS} from './cyberpunk-catalog.js';
import {DECORATION_ITEMS} from './decoration-catalog.js';
import {setFurnitureScale} from './furniture-scale.js';
const Z=.4/(39.2*Math.sqrt(2)*Math.cos(Math.asin(21.2/39.2)));

// Dimensions describe floor footprints in metres; the animated mesh stays inside its wrapper.
export const CATALOG = [
  {id:'table', name:'Mesa de centro', category:'furniture', width:1.02, depth:1.02, height:54.042575*Z,
    surface:{height:54.042575*Z,width:.984,depth:.984}, image:'assets/novos-modelos/table.png'},
  {id:'armchair', name:'Poltrona musgo', category:'furniture', width:.94, depth:.96, height:1.1, image:'assets/moveis-refinados/armchair.png'},
  {id:'cabinet', name:'Aparador', category:'furniture', width:1.42, depth:.60, height:76.35186939313986*Z,
    surface:{height:76.35186939313986*Z,width:1.39,depth:.57}, image:'assets/referencias/cabinet.png'},
  {id:'bookcase', name:'Estante baixa', category:'furniture', width:1.26, depth:.58, height:.58,
    surface:{height:.58,width:1.23,depth:.55}, image:'assets/referencias/bookcase.png'},
  {id:'shelf',name:'Prateleira',category:'furniture',kind:'wall',width:1.6,depth:.38,height:.26,node:'Prateleira',image:'assets/wall/shelf.png',
    surface:{height:.26,width:1.56,depth:.35,centerDepth:true}},
  {id:'books',name:'Livros favoritos',category:'decoration',kind:'object',width:.42,depth:.31,height:.173,node:'Livros',image:'assets/decor/books.png'},
  {id:'lamp',name:'Luminária cogumelo',category:'decoration',kind:'object',width:.34,depth:.34,height:.445,node:'Luminaria',image:'assets/decor/lamp.png'},
  {id:'print',name:'Jardim emoldurado',category:'decoration',kind:'wall',width:.68,depth:.055,height:.92,node:'Quadro',image:'assets/wall/print.png'},
  {id:'grave', name:'Lápide RIP', category:'achievement', width:FLOOR_TROPHY.width, depth:FLOOR_TROPHY.depth, height:FLOOR_TROPHY.height,
    image:'assets/novos-modelos/grave.png', description:'RIP PASS123 · Um descanso para as senhas fracas. Troféu animado de chão, com cerca de 1,52 m de altura.'},
  {id:'mimic',name:'Cofre faminto',category:'achievement',width:MIMIC.width,depth:MIMIC.depth,height:MIMIC.height,
    image:'assets/mimico/miniatura.png',description:'Mímico de RPG com nove olhos e dentes curvos na língua. Respira em um ciclo suave de cinco segundos; objeto de chão.'},
  ...NEUTRAL_ITEMS,
  ...INDUSTRIAL_ITEMS,
  ...CYBERPUNK_ITEMS,
  ...DECORATION_ITEMS,
].map(item => ({kind:'floor',...item}));
export const byId = Object.fromEntries(CATALOG.map(item => [item.id, item]));
setFurnitureScale(CATALOG);
