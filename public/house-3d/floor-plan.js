export const CELL=.8;
export const PLAN_LIMITS={cells:256,span:16,coordinate:32};
export const cellKey=(x,z)=>`${x},${z}`;
export const canonicalCells=cells=>cells.map(c=>[...c]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
export function planBounds(cells) {
  return {minX:Math.min(...cells.map(c=>c[0]))*CELL,maxX:(Math.max(...cells.map(c=>c[0]))+1)*CELL,minZ:Math.min(...cells.map(c=>c[1]))*CELL,maxZ:(Math.max(...cells.map(c=>c[1]))+1)*CELL};
}
export function planIssue(cells) {
  if(!Array.isArray(cells)||!cells.length)return 'A sala precisa manter pelo menos um bloco de piso.';
  if(cells.length>PLAN_LIMITS.cells)return 'O limite desta planta é de 256 blocos.';
  if(cells.some(c=>!Array.isArray(c)||c.length!==2||c.some(n=>!Number.isSafeInteger(n)||Math.abs(n)>PLAN_LIMITS.coordinate)))return 'Coordenadas de piso inválidas.';
  const remaining=new Set(cells.map(c=>cellKey(...c)));
  if(remaining.size!==cells.length)return 'Há blocos repetidos na planta.';
  const b=planBounds(cells);
  if(b.maxX-b.minX>CELL*PLAN_LIMITS.span+1e-7||b.maxZ-b.minZ>CELL*PLAN_LIMITS.span+1e-7)return 'A planta pode ocupar até 16 blocos em cada direção.';
  const stack=[cells[0]];remaining.delete(cellKey(...cells[0]));
  while(stack.length) {const [x,z]=stack.pop();for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]])if(remaining.delete(cellKey(x+dx,z+dz)))stack.push([x+dx,z+dz]);}
  return remaining.size?'Mantenha o piso conectado por uma borda; encostar só pelo canto não basta.':null;
}
export function brushCells(a,b) {
  if(![a,b].every(c=>Array.isArray(c)&&c.length===2&&c.every(n=>Number.isSafeInteger(n)&&Math.abs(n)<=PLAN_LIMITS.coordinate)))return [];
  const x1=Math.min(a[0],b[0]),x2=Math.max(a[0],b[0]),z1=Math.min(a[1],b[1]),z2=Math.max(a[1],b[1]);
  if((x2-x1+1)*(z2-z1+1)>PLAN_LIMITS.cells)return [];
  const result=[];for(let x=x1;x<=x2;x++)for(let z=z1;z<=z2;z++)result.push([x,z]);return result;
}
export function editCells(current,tool,patch) {
  if(!['add','erase'].includes(tool)||!Array.isArray(patch)||!patch.length||patch.length>PLAN_LIMITS.cells||patch.some(c=>!Array.isArray(c)||c.length!==2||c.some(n=>!Number.isSafeInteger(n)||Math.abs(n)>PLAN_LIMITS.coordinate)))return {ok:false,reason:'Selecione uma área válida de piso.'};
  const next=new Map(current.map(c=>[cellKey(...c),c]));let changed=0;
  for(const c of patch) {const key=cellKey(...c);if(tool==='add'&&!next.has(key)){next.set(key,c);changed++;}else if(tool==='erase'&&next.delete(key))changed++;}
  const cells=canonicalCells([...next.values()]),reason=planIssue(cells);
  return reason?{ok:false,reason}:{ok:true,cells,changed};
}
// Every exposed cell edge becomes a wall. Normal points into the house;
// opposite-facing edges on the same plane must remain separate runs.
export function boundarySegments(cells) {
  const index=new Set(cells.map(c=>cellKey(...c))),groups=new Map();
  for(const [x,z] of cells)for(const [axis,line,start,dx,dz,normal] of [['x',x,z,-1,0,1],['z',z,x,0,-1,1],['x',x+1,z,1,0,-1],['z',z+1,x,0,1,-1]]) {
    if(index.has(cellKey(x+dx,z+dz)))continue;
    const key=`${axis}:${line}:${normal}`;if(!groups.has(key))groups.set(key,{axis,line,normal,starts:[]});groups.get(key).starts.push(start);
  }
  const result=[];
  for(const {axis,line,normal,starts} of groups.values()) {
    starts.sort((a,b)=>a-b);let start=starts[0],end=start+1;
    const add=()=>result.push({axis,line:line*CELL,gridLine:line,normal,from:start*CELL,to:end*CELL});
    for(const next of starts.slice(1)){if(next===end)end++;else{add();start=next;end=next+1;}}add();
  }
  return result.sort((a,b)=>a.axis.localeCompare(b.axis)||a.line-b.line||a.from-b.from);
}
// Fixed weave anchors preserve the original alternating tatami pattern. A
// partly erased mat splits into individual squares instead of spanning a hole.
export function floorMats(cells) {
  const index=new Set(cells.map(c=>cellKey(...c))),visited=new Set(),result=[];
  for(const [x,z] of canonicalCells(cells)) {
    if(visited.has(cellKey(x,z)))continue;
    const gx=Math.floor(x/2),gz=Math.floor(z/2),turned=Math.abs(gx+gz)%2===1;
    const pair=turned?[[gx*2,z],[gx*2+1,z]]:[[x,gz*2],[x,gz*2+1]];
    const occupied=pair.filter(c=>index.has(cellKey(...c)));occupied.forEach(c=>visited.add(cellKey(...c)));
    const minX=Math.min(...occupied.map(c=>c[0])),maxX=Math.max(...occupied.map(c=>c[0]));
    const minZ=Math.min(...occupied.map(c=>c[1])),maxZ=Math.max(...occupied.map(c=>c[1]));
    result.push({x:(minX+maxX+1)*CELL/2,z:(minZ+maxZ+1)*CELL/2,width:(maxX-minX+1)*CELL,depth:(maxZ-minZ+1)*CELL,turned});
  }
  return result;
}
