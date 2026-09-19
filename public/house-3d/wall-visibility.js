import {CELL,cellKey} from './floor-plan.js';
import {roomIndex,partitionEdges} from './room-plan.js';
import {wallsForCells,wallPlane} from './wall-model.js';

export const CUT_HEIGHT=.22;

// Keep contiguous pieces together so doors and trim change with their wall.
export function visibilitySections(layout) {
  const index=roomIndex(layout),sections=[];
  for(const wall of wallsForCells(layout.cells)) {
    let run=null;
    for(let start=Math.round(wall.from/CELL);start<Math.round(wall.to/CELL);start++) {
      const inside=wall.gridLine-(wall.normal===-1?1:0),side=wall.normal===-1?'negative':'positive';
      const owner=index.get(cellKey(wall.axis==='x'?inside:start,wall.axis==='x'?start:inside));
      if(run&&run[side]===owner)run.to=(start+1)*CELL;
      else {run={...wall,from:start*CELL,to:(start+1)*CELL,[side]:owner,key:`outer:${wall.id}:${start}`};sections.push(run);}
    }
  }
  let run=null;
  for(const edge of partitionEdges(layout)) {
    if(run&&run.axis===edge.axis&&run.line===edge.line&&Math.abs(run.to-edge.from)<1e-6&&run.negative===edge.negative&&run.positive===edge.positive) {
      run.to=edge.to;run.edges.push(edge);
    } else {
      run={...edge,internal:true,key:`partition:${edge.id}`,edges:[edge]};sections.push(run);
    }
  }
  return sections;
}

export function supportsAttachment(section,attachment,width=0) {
  const plane=wallPlane(attachment?.wall);if(!plane)return false;
  const along=plane.axis==='x'?attachment.z:attachment.x;
  return plane.axis===section.axis&&Math.abs(plane.line-section.line)<1e-6&&Boolean(plane.internal)===Boolean(section.internal)&&(section.internal||(plane.normal??1)===(section.normal??1))&&along+width/2>=section.from-1e-6&&along-width/2<=section.to+1e-6;
}

export function sectionIsLow(section,{mode='auto',building=false,room=null,direction={x:1,z:1},attachment=null,attachmentWidth=0},previous=false) {
  if(building)return true;
  if(attachment&&supportsAttachment(section,attachment,attachmentWidth))return false;
  if(mode==='full')return false;
  if(mode==='low')return true;
  if(room&&section.positive!==room&&section.negative!==room)return true;
  if(section.internal&&!room)return true;
  const normal=section.internal?(room===section.negative?-1:1):(section.normal??1);
  const facing=direction[section.axis]*normal;
  // A dead band prevents flickering when the camera is almost parallel.
  if(Math.abs(facing)<.1)return previous;
  return facing<0;
}
