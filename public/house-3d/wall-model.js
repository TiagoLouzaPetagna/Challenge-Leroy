// Matches the four wall segments and the window in create_main_scene.py.
// Coordinates use Three.js axes: y up, x/z on the floor.
import {boundarySegments,CELL} from './floor-plan.js';
import {partitionEdges,partitionParts} from './room-plan.js';
const Z=.4/(39.2*Math.sqrt(2)*Math.cos(Math.asin(21.2/39.2)));
export const WALL_HEIGHT=330*Z;
export const WALL_GAP=.06;
export const ROOM_WALLS=[
  {id:'west',label:'Parede da janela',axis:'x',line:0,from:0,to:4.8,angle:Math.PI/2},
  {id:'back',label:'Parede principal',axis:'z',line:0,from:0,to:4,angle:0},
  {id:'alcove-west',label:'Lateral do recuo',axis:'x',line:4,from:-2.4,to:0,angle:Math.PI/2},
  {id:'alcove-back',label:'Fundo do recuo',axis:'z',line:-2.4,from:4,to:6.4,angle:0},
];
export const wallById=Object.assign(Object.create(null),Object.fromEntries(ROOM_WALLS.map(wall=>[wall.id,wall])));
export const WINDOW={wall:'west',from:2.16,to:3.58,bottom:132*Z-.05,top:275*Z+.05};
export function wallPlane(id) {
  if(wallById[id])return wallById[id];
  if(typeof id==='string'&&/^outer:[xz]:-?\d+:-$/.test(id)) {
    const [,axis,grid]=id.split(':');if(Math.abs(Number(grid))>33)return null;
    return {id,axis,line:Number(grid)*CELL,normal:-1,angle:axis==='x'?-Math.PI/2:Math.PI,label:'Parede da casa'};
  }
  if(typeof id==='string'&&/^inner:[xz]:-?\d+:[+-]$/.test(id)) {
    const [,axis,grid,side]=id.split(':'),normal=side==='+'?1:-1;
    if(Math.abs(Number(grid))>33)return null;
    return {id,axis,line:Number(grid)*CELL,normal,internal:true,angle:axis==='x'?normal*Math.PI/2:normal===1?0:Math.PI,label:'Divisória'};
  }
  if(typeof id!=='string'||!/^([xz]):(-?\d+)$/.test(id))return null;
  const [axis,grid]=id.split(':'),line=Number(grid)*CELL;if(Math.abs(Number(grid))>33)return null;
  return {id,axis,line,angle:axis==='x'?Math.PI/2:0,label:'Parede da sala'};
}
export function wallsForCells(cells) {
  if(!cells)return ROOM_WALLS;
  return boundarySegments(cells).map(segment=>{
    const legacy=segment.normal===1&&ROOM_WALLS.find(w=>w.axis===segment.axis&&Math.abs(w.line-segment.line)<1e-7);
    const id=segment.normal===-1?`outer:${segment.axis}:${segment.gridLine}:-`:legacy?.id??`${segment.axis}:${segment.gridLine}`;
    return {...segment,id,label:legacy?.label??'Parede da casa',angle:segment.axis==='x'?segment.normal*Math.PI/2:segment.normal===1?0:Math.PI};
  });
}
export function wallsForScene(scene) {
  const walls=wallsForCells(scene.cells),groups=new Map();
  for(const edge of partitionEdges(scene)) {
    const key=`${edge.axis}:${edge.gridLine}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(edge);
  }
  for(const edges of groups.values()) {
    let from=edges[0].from,to=edges[0].to;
    const add=()=>{for(const side of ['+','-'])walls.push({...wallPlane(`inner:${edges[0].axis}:${edges[0].gridLine}:${side}`),from,to});};
    for(const e of edges.slice(1))if(Math.abs(e.from-to)<1e-7)to=e.to;else{add();from=e.from;to=e.to;}add();
  }
  return walls;
}
export function resolveWall(id,along,cells,layout) {
  return (layout?.rooms?wallsForScene(layout):wallsForCells(cells)).find(w=>w.id===id&&along>=w.from-1e-7&&along<=w.to+1e-7);
}
export function wallPose(definition,wallId,along,elevation,cells,layout) {
  const wall=cells?resolveWall(wallId,along,cells,layout):wallPlane(wallId);if(!wall||!definition)return null;
  const normal=wall.line+(wall.normal??1)*(WALL_GAP+definition.depth/2);
  return {id:definition.id,x:wall.axis==='x'?normal:along,z:wall.axis==='x'?along:normal,angle:wall.angle,wall:wallId,elevation};
}
export function wallAlong(item) {
  const wall=wallPlane(item.wall);return wall?.axis==='x'?item.z:item.x;
}
export function intersectsWindow(wall,from,to,bottom,top) {
  return wall===WINDOW.wall&&to>WINDOW.from+1e-7&&from<WINDOW.to-1e-7&&top>WINDOW.bottom+1e-7&&bottom<WINDOW.top-1e-7;
}
export function windowSupportIssue(cells) {
  return wallsForCells(cells).some(w=>w.id==='west'&&w.from<=WINDOW.from&&w.to>=WINDOW.to)?null:'Preserve a parede que sustenta a janela.';
}
export function windowPartitionIssue(scene) {
  return partitionEdges(scene).some(e=>e.axis==='z'&&e.from<.06&&e.to>-.06&&e.line>WINDOW.from-.055&&e.line<WINDOW.to+.055)?'A divisória precisa deixar a janela livre.':null;
}
export function wallPlacementIssue(item,definition,cells,layout) {
  const wall=resolveWall(item.wall,wallAlong(item),cells,layout);
  if(!wall)return 'Escolha uma parede para pendurar este item.';
  if(!Number.isFinite(item.elevation))return 'Altura inválida.';
  const along=wallAlong(item),expected=wallPose(definition,wall.id,along,item.elevation);
  if(Math.abs(item.x-expected.x)>1e-6||Math.abs(item.z-expected.z)>1e-6||Math.abs(Math.sin(item.angle-expected.angle))>1e-6||Math.cos(item.angle-expected.angle)<0)return 'O item precisa ficar encaixado na parede.';
  if(along-definition.width/2<wall.from+.04-1e-7||along+definition.width/2>wall.to-.04+1e-7)return 'O item precisa caber inteiro neste trecho de parede.';
  if(item.elevation<.12||item.elevation+definition.height>WALL_HEIGHT-.08)return 'Mantenha o item entre o rodapé e o acabamento superior.';
  if(intersectsWindow(wall.id,along-definition.width/2,along+definition.width/2,item.elevation,item.elevation+definition.height))return 'Deixe o espaço da janela livre.';
  if(wall.internal) {
    const from=along-definition.width/2,to=along+definition.width/2;
    const spans=partitionEdges(layout).filter(e=>e.axis===wall.axis&&Math.abs(e.line-wall.line)<1e-7).flatMap(e=>partitionParts(e,WALL_HEIGHT)).filter(p=>p.bottom<=item.elevation+1e-7&&p.top>=item.elevation+definition.height-1e-7).sort((a,b)=>a.from-b.from);
    let cursor=from;for(const p of spans){if(p.to<=cursor)continue;if(p.from>cursor+1e-7)break;cursor=Math.max(cursor,p.to);}
    if(cursor<to-1e-7)return 'Mantenha a passagem livre; o item precisa de parede em toda a largura.';
  }
  return null;
}
