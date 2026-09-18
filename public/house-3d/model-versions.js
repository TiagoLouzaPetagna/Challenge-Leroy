import {byId,CATALOG} from './catalog.js';
import {FURNITURE_SCALE,setFurnitureScale} from './furniture-scale.js';
import {wallPose,wallAlong,WALL_HEIGHT} from './wall-model.js';
import {readSave,validateScene,withItem,localPoint,groupIds} from './editor-state.js';
const KEY='casa-atelie-3d:models:v1';
const original={...byId.table,surface:{...byId.table.surface}};
export function readModelVersion(storage){try{return storage?.getItem(KEY)!=='previous';}catch{return true;}}
export function writeModelVersion(storage,modern){storage.setItem(KEY,modern?'new':'previous');}
export function configureModels(modern){
  Object.assign(byId.table,modern?{name:'Mesa Sakura',width:1.4314,depth:.9464,height:.765,surface:{height:.765,width:1.26,depth:.79}}:original);
}
// Revalidate saves under the source dimensions before adapting them. A size
// change must never turn an otherwise valid save into a replacement seed scene.
export function readModelSave(storage,cells,modern){
  let raw;try{raw=JSON.parse(storage?.getItem('casa-atelie-3d:scene:v1')??'null');}catch{}
  if(raw?.furnitureScale!==FURNITURE_SCALE&&raw?.scene?.items?.some(i=>byId[i.id]?.asset)){
    let source;
    setFurnitureScale(CATALOG,1);
    try{source=readExistingModelSave(storage,cells,modern);}finally{setFurnitureScale(CATALOG);}
    if(source.status!=='loaded')return source;
    try{return {...source,scene:adaptFurniture(source.scene,cells),modelsAdapted:true,furnitureAdapted:true};}
    catch(error){throw Error('Não há espaço para ampliar todos os móveis nesta planta. Sua decoração foi preservada. '+error.message);}
  }
  return readExistingModelSave(storage,cells,modern);
}
function readExistingModelSave(storage,cells,modern){
  configureModels(modern);let saved=readSave(storage,cells);
  if(saved.status!=='invalid')return saved;
  configureModels(!modern);const sourceSurface={...byId.table.surface},source=readSave(storage,cells);configureModels(modern);
  if(source.status!=='loaded')return saved;
  try{return {...source,scene:adaptTable(source.scene,cells,sourceSurface),modelsAdapted:true};}
  catch(error){const issue=Error('Não há espaço para adaptar a mesa nesta planta. Sua decoração anterior foi preservada.');issue.modelConflict=true;throw issue;}
}
export function adaptFurniture(source,fallbackCells){
  const cells=source.cells??fallbackCells;
  const roots=source.items.filter(i=>byId[i.id].asset&&!i.parent);
  const moving=new Set(roots.flatMap(root=>[...groupIds(source,root.id)]));
  let scene={...source,items:source.items.filter(i=>!moving.has(i.id))};
  // Place the largest groups first, keeping the original positions whenever possible.
  roots.sort((a,b)=>byId[b.id].width*byId[b.id].depth-byId[a.id].width*byId[a.id].depth);
  const offsets=[{x:0,z:0}];
  for(let x=-12;x<=12;x++)for(let z=-12;z<=12;z++)if(x||z)offsets.push({x:x*.2,z:z*.2});
  offsets.sort((a,b)=>a.x*a.x+a.z*a.z-b.x*b.x-b.z*b.z);
  for(const root of roots){
    const def=byId[root.id],children=source.items.filter(i=>i.parent===root.id);
    let placed;
    for(const offset of offsets){
      let candidate={...root,x:root.x+offset.x,z:root.z+offset.z};
      if(def.kind==='wall'){
        candidate=wallPose(def,root.wall,wallAlong(root)+offset.x,Math.min(root.elevation,WALL_HEIGHT-def.height-.085)+offset.z,cells,source);
        if(!candidate)continue;
      }
      const result=withItem(scene,candidate,cells);if(!result.ok)continue;
      let next=result.scene,valid=true;
      for(const child of children){
        const local=localPoint(child,root),c=Math.cos(candidate.angle),s=Math.sin(candidate.angle);
        const x=local.x*FURNITURE_SCALE,z=local.z*FURNITURE_SCALE;
        const attached={...child,x:candidate.x+x*c+z*s,z:candidate.z-x*s+z*c,angle:child.angle+candidate.angle-root.angle};
        const added=withItem(next,attached,cells);if(!added.ok){valid=false;break;}next=added.scene;
      }
      if(valid){placed=next;break;}
    }
    if(!placed)throw Error('Falta espaço próximo de '+def.name+'.');
    scene=placed;
  }
  return validateScene(scene,cells);
}
export function adaptTable(scene,cells,sourceSurface=original.surface){
  try{return validateScene(scene,cells);}catch{}
  const table=scene.items.find(i=>i.id==='table');if(!table)throw Error('A decoração tem outro conflito.');
  const surface=byId.table.surface,c=Math.cos(table.angle),s=Math.sin(table.angle);
  const adjusted={...scene,items:scene.items.map(item=>{
    if(item.parent!=='table')return {...item};
    const local=localPoint(item,table),def=byId[item.id],relative=item.angle-table.angle;
    const w=Math.abs(Math.cos(relative))*def.width+Math.abs(Math.sin(relative))*def.depth;
    const d=Math.abs(Math.sin(relative))*def.width+Math.abs(Math.cos(relative))*def.depth;
    const x=Math.max(-(surface.width-w)/2,Math.min((surface.width-w)/2,local.x*surface.width/sourceSurface.width));
    const z=Math.max(-(surface.depth-d)/2,Math.min((surface.depth-d)/2,local.z*surface.depth/sourceSurface.depth));
    return {...item,x:table.x+x*c+z*s,z:table.z-x*s+z*c};
  })};
  const positions=[{x:table.x,z:table.z}];
  // Nearby positions first; do not move unrelated furniture to make space.
  for(let dx=-15;dx<=15;dx++)for(let dz=-15;dz<=15;dz++)if(dx||dz)positions.push({x:table.x+dx*.1,z:table.z+dz*.1});
  positions.sort((a,b)=>(a.x-table.x)**2+(a.z-table.z)**2-((b.x-table.x)**2+(b.z-table.z)**2));
  for(const pos of positions){const result=withItem(adjusted,{...table,...pos},cells);if(result.ok)return result.scene;}
  throw Error('Afaste os objetos próximos da mesa e tente novamente.');
}
