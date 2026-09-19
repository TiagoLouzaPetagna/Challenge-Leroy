import {byId, CATALOG} from './catalog.js';
import {FURNITURE_SCALE} from './furniture-scale.js';
import {wallPlane,WALL_HEIGHT,wallPlacementIssue,intersectsWindow,windowSupportIssue,windowPartitionIssue} from './wall-model.js';
import {planIssue,canonicalCells,editCells} from './floor-plan.js';
import {roomsIssue,canonicalRooms,editRooms,toggleOpening,partitionEdges,partitionParts} from './room-plan.js';

export const FLOOR_Y = .055;
export const CELL = .8;
export const STORAGE_KEY = 'casa-atelie-3d:scene:v1';
const EPS = 1e-7;
export const clone = value => JSON.parse(JSON.stringify(value));
export const normalizeAngle = angle => ((angle % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI);
const canonicalItem=({id,x,z,angle,parent,support,wall,elevation})=>({id,x,z,angle:normalizeAngle(angle),...(parent?{parent,...(support?{support}:{})}:{}),...(byId[id].kind==='wall'?{wall,elevation}:{})});
export const surfacesFor=parent=>byId[parent.id]?.surfaces??(byId[parent.id]?.surface?[byId[parent.id].surface]:[]);
export const surfaceFor=(parent,support)=>support?surfacesFor(parent).find(s=>s.id===support):byId[parent.id]?.surface;

export function footprint(item,dimensions=byId[item.id]) {
  const {width, depth} = dimensions, c = Math.cos(item.angle), s = Math.sin(item.angle);
  return [[-width/2,-depth/2],[width/2,-depth/2],[width/2,depth/2],[-width/2,depth/2]]
    .map(([x,z]) => ({x:item.x+x*c+z*s, z:item.z-x*s+z*c}));
}

export function overlaps(a,b) {
  for (const poly of [a,b]) for (let i=0; i<poly.length; i++) {
    const p=poly[i], q=poly[(i+1)%poly.length], nx=-(q.z-p.z), nz=q.x-p.x;
    const av=a.map(v=>v.x*nx+v.z*nz), bv=b.map(v=>v.x*nx+v.z*nz);
    if (Math.max(...av)<=Math.min(...bv)+EPS || Math.max(...bv)<=Math.min(...av)+EPS) return false;
  }
  return true;
}

// Clipping measures actual coverage, including missing cells inside a rotated footprint.
function clip(poly, axis, value, greater) {
  const result=[];
  for (let i=0; i<poly.length; i++) {
    const a=poly[i], b=poly[(i+1)%poly.length];
    const ai=greater?a[axis]>=value:a[axis]<=value, bi=greater?b[axis]>=value:b[axis]<=value;
    if(ai) result.push(a);
    if(ai!==bi) {
      const t=(value-a[axis])/(b[axis]-a[axis]);
      result.push({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t});
    }
  }
  return result;
}
function area(poly) {
  return Math.abs(poly.reduce((sum,p,i)=>{const q=poly[(i+1)%poly.length];return sum+p.x*q.z-q.x*p.z;},0))/2;
}
export function fitsFloor(poly,cells) {
  let covered=0;
  for(const [x,z] of cells) {
    let part=clip(poly,'x',x*CELL,true);
    part=clip(part,'x',(x+1)*CELL,false);
    part=clip(part,'z',z*CELL,true);
    part=clip(part,'z',(z+1)*CELL,false);
    covered+=area(part);
  }
  return Math.abs(area(poly)-covered)<EPS;
}
export function baseY(item,items) {
  if(byId[item.id]?.kind==='wall')return item.elevation;
  const parent=items.find(other=>other.id===item.parent);
  return parent?(byId[parent.id].kind==='wall'?parent.elevation:FLOOR_Y)+(surfaceFor(parent,item.support)?.height??0):FLOOR_Y;
}
export function mountedWall(item,items) {
  return byId[item.id]?.kind==='wall'?item:items.find(other=>other.id===item.parent&&byId[other.id].kind==='wall');
}
export function localPoint(point,parent) {
  const dx=point.x-parent.x,dz=point.z-parent.z,c=Math.cos(parent.angle),s=Math.sin(parent.angle);
  return {x:dx*c-dz*s,z:dx*s+dz*c};
}
export function pointOnSurface(point,parent,support) {
  const surface=surfaceFor(parent,support);if(!surface)return false;
  const local=localPoint(point,parent);
  local.x-=surface.x??0;local.z-=surface.z??0;
  if(surface.shape==='circle')return local.x**2+local.z**2<=surface.radius**2+EPS;
  return Math.abs(local.x)<=surface.width/2+EPS&&Math.abs(local.z)<=surface.depth/2+EPS;
}
export function fitsSurface(item,parent) {
  // A hovering object rests on its stationary base; its full motion envelope
  // still governs wall/furniture collisions and clearance above the support.
  const base=byId[item.id].supportFootprint,c=Math.cos(item.angle),s=Math.sin(item.angle);
  const origin=base?{...item,x:item.x+(base.x??0)*c+(base.z??0)*s,z:item.z-(base.x??0)*s+(base.z??0)*c}:item;
  return footprint(origin,base??byId[item.id]).every(point=>pointOnSurface(point,parent,item.support));
}
export function groupIds(scene,id) {
  return new Set([id,...scene.items.filter(item=>item.parent===id).map(item=>item.id)]);
}
export function withoutItem(scene,id) {
  const removed=groupIds(scene,id);return {...scene,items:scene.items.filter(item=>!removed.has(item.id))};
}
export function placementIssue(item,items,cells,layout) {
  if(!item || !Object.hasOwn(byId,item.id)) return 'Esse item não faz parte da coleção.';
  if(![item.x,item.z,item.angle].every(Number.isFinite) || Math.abs(item.x)>100 || Math.abs(item.z)>100 || Math.abs(item.angle)>1e6) return 'Posição inválida.';
  const poly=footprint(item),definition=byId[item.id];
  if(definition.kind==='wall') {
    const issue=wallPlacementIssue(item,definition,cells,layout);if(issue)return issue;
  } else if(item.wall!=null||item.elevation!=null) return 'A altura deste objeto é definida pelo chão ou pelo seu apoio.';
  if(item.parent!==undefined&&item.parent!==null) {
    if(typeof item.parent!=='string')return 'Apoio inválido.';
    if(definition.kind!=='object')return 'Esse item deve ficar no chão.';
    const parent=items.find(other=>other.id===item.parent);
    if(!parent||parent.parent||!byId[parent.id]?.surface||parent.id===item.id)return 'Escolha um móvel com tampo para apoiar o objeto.';
    const surface=surfaceFor(parent,item.support);
    if(!surface)return 'Escolha um apoio válido deste móvel.';
    if(surface.clearanceHeight!=null&&definition.height>surface.clearanceHeight+EPS)return 'O objeto é alto demais para esse nicho.';
    if(!fitsSurface(item,parent))return 'A base inteira do objeto precisa caber no tampo.';
  }
  if(!fitsFloor(poly,cells)) return 'A base inteira precisa ficar sobre o piso.';
  // Leave room for the visible wall thickness, including the inward corner of the L.
  const index=new Set(cells.map(([x,z])=>`${x},${z}`));
  for(const [x,z] of cells) for(const [dx,dz] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    if(index.has(`${x+dx},${z+dz}`)) continue;
    const line=dx ? (x+(dx===1?1:0))*CELL : (z+(dz===1?1:0))*CELL;
    const start=(dx?z:x)*CELL, end=start+CELL, pad=.034;
    const wall=dx ? [{x:line-pad,z:start},{x:line+pad,z:start},{x:line+pad,z:end},{x:line-pad,z:end}]
      : [{x:start,z:line-pad},{x:end,z:line-pad},{x:end,z:line+pad},{x:start,z:line+pad}];
    if(overlaps(poly,wall)) return 'Afaste um pouco o objeto da borda ou da parede.';
  }
  const bottom=baseY(item,items),top=bottom+definition.height;
  for(const edge of partitionEdges(layout))for(const part of partitionParts(edge,WALL_HEIGHT)) {
    if(top<=part.bottom+EPS||bottom>=part.top-EPS)continue;
    const pad=.055,wall=edge.axis==='x'?[{x:edge.line-pad,z:part.from},{x:edge.line+pad,z:part.from},{x:edge.line+pad,z:part.to},{x:edge.line-pad,z:part.to}]:[{x:part.from,z:edge.line-pad},{x:part.to,z:edge.line-pad},{x:part.to,z:edge.line+pad},{x:part.from,z:edge.line+pad}];
    if(overlaps(poly,wall))return 'Esse espaço é ocupado por uma divisória ou pelo batente da passagem.';
  }
  const wallParent=mountedWall(item,items);
  if(wallParent&&item.parent) {
    if(top>WALL_HEIGHT-.08)return 'O objeto na prateleira precisa ficar abaixo do acabamento superior.';
    const axis=wallPlane(wallParent.wall)?.axis==='x'?'z':'x',along=poly.map(point=>point[axis]);
    if(intersectsWindow(wallParent.wall,Math.min(...along),Math.max(...along),bottom,top))return 'O objeto na prateleira precisa deixar a janela livre.';
  }
  for(const other of items) {
    if(other.id===item.id||other.id===item.parent||other.parent===item.id)continue;
    const otherBottom=baseY(other,items),otherTop=otherBottom+byId[other.id].height;
    if(top<=otherBottom+EPS||otherTop<=bottom+EPS)continue;
    if(overlaps(poly,footprint(other)))return `Esse lugar está ocupado por ${byId[other.id].name.toLowerCase()}.`;
  }
  return null;
}

export function validateScene(scene,cells) {
  if(!scene || !Array.isArray(scene.items) || scene.items.length>CATALOG.length) throw Error('Decoração inválida.');
  if(Object.hasOwn(scene,'cells')) {
    const issue=planIssue(scene.cells);if(issue)throw Error(issue);
    cells=canonicalCells(scene.cells);const fixtureIssue=windowSupportIssue(cells);if(fixtureIssue)throw Error(fixtureIssue);
  }
  if(Object.hasOwn(scene,'rooms')){const issue=roomsIssue(scene)||windowPartitionIssue(scene);if(issue)throw Error(issue);}
  const seen=new Set();
  for(const item of scene.items) {
    if(!item || !Object.hasOwn(byId,item.id) || seen.has(item.id)) throw Error('Item desconhecido ou repetido.');
    seen.add(item.id);
  }
  for(const item of scene.items) {
    const issue=placementIssue(item,scene.items,cells,scene);
    if(issue) throw Error(issue);
  }
  return {items:scene.items.map(canonicalItem),...(Object.hasOwn(scene,'cells')?{cells}: {}),...(scene.rooms?canonicalRooms(scene):{})};
}

function validateStructure(result) {
  if(!result.ok)return result;
  const next=result.scene;
  const fixtureIssue=windowSupportIssue(next.cells)||windowPartitionIssue(next);if(fixtureIssue)return {ok:false,reason:fixtureIssue};
  for(const item of next.items){const issue=placementIssue(item,next.items,next.cells,next);if(issue)return {ok:false,reason:`Mova ou guarde “${byId[item.id].name}” antes de alterar esse trecho. ${issue}`};}
  try{return {...result,scene:validateScene(next,next.cells)};}catch(error){return {ok:false,reason:error.message};}
}
export function withRoomArea(scene,tool,patch,roomId,theme) {return validateStructure(editRooms(scene,tool,patch,roomId,theme));}
export function withPassage(scene,edgeId) {return validateStructure(toggleOpening(scene,edgeId));}

export function withFloor(scene,tool,patch,fallbackCells,roomId) {
  if(scene.rooms)return withRoomArea(scene,tool,patch,roomId??scene.rooms[0].id);
  const result=editCells(scene.cells??fallbackCells,tool,patch);if(!result.ok)return result;
  const fixtureIssue=windowSupportIssue(result.cells);if(fixtureIssue)return {ok:false,reason:fixtureIssue};
  for(const item of scene.items)if(Object.hasOwn(byId,item?.id)&&placementIssue(item,scene.items,result.cells)) {
    const support=byId[item.id].kind==='wall'?'a parede de':'o piso e as bordas sob';
    return {ok:false,reason:`Preserve ${support} “${byId[item.id].name}”. Mova ou guarde o item primeiro.`};
  }
  try {return {ok:true,changed:result.changed,scene:validateScene({...scene,cells:result.cells},result.cells)};}
  catch(error){return {ok:false,reason:error.message};}
}

export function withItem(scene,item,cells) {
  cells=scene.cells??cells;
  if(!item||!Object.hasOwn(byId,item.id))return {ok:false,reason:'Esse item não faz parte da coleção.'};
  const previous=scene.items.find(other=>other.id===item.id);
  const items=scene.items.filter(other=>other.id!==item.id).map(other=>{
    if(!previous||other.parent!==item.id)return other;
    const local=localPoint(other,previous),c=Math.cos(item.angle),s=Math.sin(item.angle);
    return {...other,x:item.x+local.x*c+local.z*s,z:item.z-local.x*s+local.z*c,angle:normalizeAngle(other.angle+item.angle-previous.angle)};
  });
  items.push({...item,angle:normalizeAngle(item.angle)});
  // Stable order avoids history entries caused solely by selecting an object.
  items.sort((a,b)=>CATALOG.findIndex(v=>v.id===a.id)-CATALOG.findIndex(v=>v.id===b.id));
  const next={...scene,items};
  // Validate descendants too; moving a support is a single atomic placement.
  for(const candidate of items) {
    const issue=placementIssue(candidate,items,cells,next);
    if(issue)return {ok:false,reason:issue,scene:next};
  }
  return {ok:true,scene:{...next,items:items.map(canonicalItem)}};
}

export class History {
  constructor(initial,limit=40) {this.scene=clone(initial);this.past=[];this.future=[];this.limit=limit;}
  commit(next) {
    if(JSON.stringify(next)===JSON.stringify(this.scene)) return false;
    this.past.push(clone(this.scene));if(this.past.length>this.limit)this.past.shift();
    this.scene=clone(next);this.future=[];return true;
  }
  undo() {if(!this.past.length)return false;this.future.push(this.scene);this.scene=this.past.pop();return true;}
  redo() {if(!this.future.length)return false;this.past.push(this.scene);this.scene=this.future.pop();return true;}
}

export function decodeSave(raw,cells) {
  const saved=JSON.parse(raw);
  if(saved?.format!=='casa-atelie-3d' || ![1,2,3,4,5].includes(saved.version)) throw Error('Formato de salvamento não reconhecido.');
  if(saved.version>=4&&!Array.isArray(saved.scene?.cells))throw Error('O salvamento está sem a planta do piso.');
  if(saved.version===5&&!Array.isArray(saved.scene?.rooms))throw Error('O salvamento está sem os ambientes.');
  const scene=validateScene(saved.scene,cells), view={};
  const src=saved.view;
  if(src && typeof src==='object') {
    if(typeof src.walls==='boolean') view.walls=src.walls;
    if(['auto','full','low'].includes(src.wallMode))view.wallMode=src.wallMode;
    if(src.focusRoom===null||scene.rooms?.some(r=>r.id===src.focusRoom))view.focusRoom=src.focusRoom;
    if(typeof src.grid==='boolean') view.grid=src.grid;
    if(['edit','view','build'].includes(src.mode))view.mode=src.mode;
    if(['house','room','free'].includes(src.frame))view.frame=src.frame;
    if(typeof src.activeRoom==='string'&&scene.rooms?.some(r=>r.id===src.activeRoom))view.activeRoom=src.activeRoom;
    if(['japanese','atelie'].includes(src.style))view.style=src.style;
    if(Array.isArray(src.camera) && src.camera.length===3 && src.camera.every(n=>Number.isFinite(n)&&Math.abs(n)<100)
      && Array.isArray(src.target) && src.target.length===3 && src.target.every(n=>Number.isFinite(n)&&Math.abs(n)<100)
      && Number.isFinite(src.zoom) && src.zoom>=.2 && src.zoom<=5
      && Math.hypot(...src.camera.map((n,i)=>n-src.target[i]))>.1) {
      Object.assign(view,{camera:src.camera,target:src.target,zoom:src.zoom});
    }
  }
  return {scene,view};
}
export function encodeSave(scene,view) {
  return JSON.stringify({format:'casa-atelie-3d',version:scene.rooms?5:Object.hasOwn(scene,'cells')?4:3,furnitureScale:FURNITURE_SCALE,updatedAt:new Date().toISOString(),scene,view});
}

// The caller decides how to report blocked storage; a broken save is never overwritten.
export function readSave(storage,cells) {
  try {
    const raw=storage.getItem(STORAGE_KEY);
    if(raw===null)return {status:'empty'};
    try{return {status:'loaded',...decodeSave(raw,cells)};}
    catch(error){return {status:'invalid',raw,error:error.message};}
  } catch(error) {return {status:'unavailable',error:error.message};}
}
