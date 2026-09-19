import {CELL,cellKey,canonicalCells,planIssue,editCells} from './floor-plan.js';
import {FINISHES} from './finish-preference.js';
export const MAX_ROOMS=8;
export const PASSAGE={height:2.06,jamb:.048};
const copy=value=>JSON.parse(JSON.stringify(value));
export function upgradeRooms(scene) {
  if(scene.rooms)return scene;
  return {...scene,rooms:[{id:'room-1',name:'Sala',cells:canonicalCells(scene.cells)}],nextRoom:2,openings:[]};
}
export const roomIndex=scene=>new Map((scene.rooms??[]).flatMap(r=>r.cells.map(c=>[cellKey(...c),r.id])));
export function roomAt(scene,x,z) {return roomIndex(scene).get(cellKey(Math.floor(x/CELL),Math.floor(z/CELL)))??null;}
export function partitionEdges(scene) {
  if(!scene?.rooms)return [];
  const index=roomIndex(scene),open=new Set(scene.openings??[]),edges=[];
  for(const [x,z] of scene.cells)for(const [axis,line,start,dx,dz] of [['x',x+1,z,1,0],['z',z+1,x,0,1]]) {
    const negative=index.get(cellKey(x,z)),positive=index.get(cellKey(x+dx,z+dz));
    if(!negative||!positive||negative===positive)continue;
    const id=`${axis}:${line}:${start}`;edges.push({id,axis,gridLine:line,line:line*CELL,from:start*CELL,to:(start+1)*CELL,negative,positive,opening:open.has(id)});
  }
  return edges.sort((a,b)=>a.axis.localeCompare(b.axis)||a.gridLine-b.gridLine||a.from-b.from);
}
export function partitionParts(edge,height) {
  return edge.opening?[{from:edge.from,to:edge.from+PASSAGE.jamb,bottom:0,top:height},{from:edge.from+PASSAGE.jamb,to:edge.to-PASSAGE.jamb,bottom:PASSAGE.height,top:height},{from:edge.to-PASSAGE.jamb,to:edge.to,bottom:0,top:height}]:[{from:edge.from,to:edge.to,bottom:0,top:height}];
}
export function roomsIssue(scene,connectivity=true) {
  const problem=planIssue(scene.cells);if(problem)return problem;
  if(!Array.isArray(scene.rooms)||!scene.rooms.length||scene.rooms.length>MAX_ROOMS)return 'A casa pode ter de um a oito ambientes.';
  if(!Number.isSafeInteger(scene.nextRoom)||scene.nextRoom<2||scene.nextRoom>1e6)return 'Identificação de ambientes inválida.';
  const ids=new Set(),all=new Set(scene.cells.map(c=>cellKey(...c))),assigned=new Set();
  for(const r of scene.rooms) {
    if(!r||typeof r.id!=='string'||!/^room-[1-9]\d*$/.test(r.id)||Number(r.id.slice(5))>=scene.nextRoom||ids.has(r.id)||typeof r.name!=='string'||!r.name.trim()||r.name.length>40||/[\u0000-\u001f]/.test(r.name))return 'Nome ou identificação de ambiente inválido.';
    ids.add(r.id);const issue=planIssue(r.cells);if(issue)return `Mantenha “${r.name}” conectado e com piso.`;
    if(r.theme!==undefined&&!FINISHES.includes(r.theme))return 'Tema de ambiente desconhecido.';
    for(const c of r.cells){const key=cellKey(...c);if(!all.has(key)||assigned.has(key))return 'Cada bloco precisa pertencer a um único ambiente.';assigned.add(key);}
  }
  if(assigned.size!==all.size)return 'Há piso sem ambiente.';
  if(!Array.isArray(scene.openings)||scene.openings.length>512||scene.openings.some(id=>typeof id!=='string')||new Set(scene.openings).size!==scene.openings.length)return 'Passagens inválidas ou repetidas.';
  const edges=partitionEdges(scene),keys=new Set(edges.map(e=>e.id));
  if(scene.openings.some(id=>!keys.has(id)))return 'A passagem precisa estar em uma divisória entre ambientes.';
  if(connectivity) {
    const reached=new Set([scene.rooms[0].id]);
    for(let n=0;n<scene.rooms.length;n++)for(const edge of edges)if(edge.opening&&(reached.has(edge.positive)||reached.has(edge.negative))){reached.add(edge.positive);reached.add(edge.negative);}
    if(reached.size!==scene.rooms.length)return 'Mantenha uma passagem ligando cada ambiente à casa. Abra outra antes de fechar a última.';
  }
  return null;
}
export function canonicalRooms(scene) {
  return {rooms:scene.rooms.map(r=>({id:r.id,name:r.name.trim(),cells:canonicalCells(r.cells),...(r.theme?{theme:r.theme}:{})})),nextRoom:scene.nextRoom,openings:[...scene.openings].sort()};
}
export function editRooms(source,tool,patch,roomId,theme) {
  if(theme!==undefined&&!FINISHES.includes(theme))return {ok:false,reason:'Tema de ambiente desconhecido.'};
  const scene=upgradeRooms(source),check=editCells(scene.cells,tool==='new'?'add':tool,patch);if(!check.ok)return check;
  if(!scene.rooms.some(r=>r.id===roomId))return {ok:false,reason:'Selecione o ambiente que deseja ampliar.'};
  if(tool==='new'&&scene.rooms.length>=MAX_ROOMS)return {ok:false,reason:'O limite é de oito ambientes.'};
  const next=copy(scene),index=roomIndex(next);let selected=roomId,changed=0;
  if(tool==='new'){selected=`room-${next.nextRoom++}`;const chosen=theme??scene.rooms.find(r=>r.id===roomId)?.theme;next.rooms.push({id:selected,name:`Ambiente ${next.nextRoom-1}`,cells:[],...(chosen?{theme:chosen}:{})});}
  for(const c of patch){const key=cellKey(...c),previous=index.get(key);
    if(tool==='erase'){if(index.delete(key))changed++;}
    else if(tool==='new'){index.set(key,selected);changed++;}
    else if(previous&&previous!==selected)return {ok:false,reason:'Use Novo ambiente para dividir o piso existente.'};
    else if(!previous){index.set(key,selected);changed++;}
  }
  next.cells=check.cells;
  for(const room of next.rooms)room.cells=next.cells.filter(c=>index.get(cellKey(...c))===room.id);
  next.rooms=next.rooms.filter(r=>r.cells.length);
  const edgeKeys=new Set(partitionEdges(next).map(e=>e.id));next.openings=next.openings.filter(id=>edgeKeys.has(id));
  const issue=roomsIssue(next,false);if(issue)return {ok:false,reason:issue};
  if(tool==='new') {
    const shared=partitionEdges(next).filter(e=>e.negative===selected||e.positive===selected);
    if(!shared.length)return {ok:false,reason:'O novo ambiente precisa ter uma borda em comum com outro cômodo.'};
    // Prefer the middle of the longest straight border, away from room corners.
    const runs=[];for(const edge of shared){const previous=runs.at(-1)?.at(-1);if(previous&&previous.axis===edge.axis&&previous.gridLine===edge.gridLine&&Math.abs(previous.to-edge.from)<1e-7)runs.at(-1).push(edge);else runs.push([edge]);}
    runs.sort((a,b)=>b.length-a.length);const opening=runs[0][Math.floor(runs[0].length/2)].id;
    if(!next.openings.includes(opening))next.openings.push(opening);
  }
  const finalIssue=roomsIssue(next);return finalIssue?{ok:false,reason:finalIssue}:{ok:true,scene:next,roomId:next.rooms.some(r=>r.id===selected)?selected:next.rooms[0].id,changed};
}
export function toggleOpening(scene,edgeId) {
  const edge=partitionEdges(scene).find(e=>e.id===edgeId);if(!edge)return {ok:false,reason:'Escolha uma divisória entre dois ambientes.'};
  const next={...scene,openings:edge.opening?scene.openings.filter(id=>id!==edgeId):[...scene.openings,edgeId]};
  const issue=roomsIssue(next);return issue?{ok:false,reason:issue}:{ok:true,scene:next,changed:1};
}
export function renameRoom(scene,id,name) {
  if(typeof name!=='string'||!name.trim()||name.trim().length>40||/[\u0000-\u001f]/.test(name))return {ok:false,reason:'Use um nome de 1 a 40 caracteres.'};
  if(!scene.rooms.some(r=>r.id===id))return {ok:false,reason:'Ambiente não encontrado.'};
  return {ok:true,scene:{...scene,rooms:scene.rooms.map(r=>r.id===id?{...r,name:name.trim()}:r)}};
}
export function setRoomTheme(scene,id,theme){
  if(!FINISHES.includes(theme))return {ok:false,reason:'Tema de ambiente desconhecido.'};
  if(!scene.rooms.some(r=>r.id===id))return {ok:false,reason:'Ambiente não encontrado.'};
  return {ok:true,scene:{...scene,rooms:scene.rooms.map(r=>r.id===id?{...r,theme}:r)}};
}
