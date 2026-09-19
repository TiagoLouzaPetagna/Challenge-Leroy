import * as THREE from 'three';
import {CELL,brushCells,PLAN_LIMITS} from './floor-plan.js';
import {withRoomArea,withPassage} from './editor-state.js';
import {partitionEdges,roomAt} from './room-plan.js';

export function createFloorBuilder({canvas,camera,scene,controls,getScene,getActiveRoom,setActiveRoom,selectRoom,isActive,commit,toast,getNewTheme=()=>undefined}) {
  const $=id=>document.getElementById(id),ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
  const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-.055),tools=['select','add','erase','new','passage'];
  const overlay=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({color:0x6f944f,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false,depthTest:false}));
  overlay.rotation.x=-Math.PI/2;overlay.renderOrder=6;overlay.visible=false;scene.add(overlay);
  let tool='select',drag=null,preview=null,lastKey=null,selectStart=null;
  function at(event) {
    const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);
    return ray.ray.intersectPlane(plane,new THREE.Vector3());
  }
  const cell=point=>point?[Math.floor(point.x/CELL),Math.floor(point.z/CELL)]:null;
  function nearestEdge(point) {
    if(!point)return null;let nearest=null,distance=.2;
    for(const edge of partitionEdges(getScene())) {
      const along=edge.axis==='x'?point.z:point.x,across=edge.axis==='x'?point.x:point.z;
      const d=Math.hypot(across-edge.line,Math.max(edge.from-along,0,along-edge.to));
      if(d<distance){nearest=edge;distance=d;}
    }
    return nearest;
  }
  function status(message,invalid=false){$('build-status').textContent=message;$('build-status').dataset.invalid=String(invalid);}
  function instructions(){status(tool==='select'?'Clique no piso para selecionar um ambiente. Arraste o espaço para explorar.':tool==='passage'?'Clique em uma divisória para abrir ou fechar uma passagem.':tool==='new'?'Arraste a área do novo cômodo. Ele será ligado à casa por uma passagem.':tool==='add'?'Clique ou arraste para ampliar o ambiente selecionado.':'Clique ou arraste para remover uma área de piso.');}
  function show(a,b) {
    const key=JSON.stringify([tool,a,b,getActiveRoom(),getNewTheme()]);if(key===lastKey)return;lastKey=key;
    const result=withRoomArea(getScene(),tool,brushCells(a,b),getActiveRoom(),tool==='new'?getNewTheme():undefined);
    preview={tool,from:a,to:b,valid:result.ok,reason:result.reason??null,changed:result.changed??0};
    overlay.visible=Boolean(a&&b);overlay.material.color.setHex(result.ok?(tool==='erase'?0xbf9849:0x729d4e):0xb25634);
    if(a&&b){overlay.position.set((a[0]+b[0]+1)*CELL/2,.08,(a[1]+b[1]+1)*CELL/2);overlay.scale.set((Math.abs(a[0]-b[0])+1)*CELL,(Math.abs(a[1]-b[1])+1)*CELL,1);}
    status(result.ok?result.changed?`${drag?'Solte':'Clique'} para ${tool==='new'?'criar um ambiente com':tool==='add'?'adicionar':'recortar'} ${result.changed} ${result.changed===1?'bloco':'blocos'}.`:'Esta área já está assim.':result.reason,!result.ok);
  }
  function showPassage(point) {
    const edge=nearestEdge(point),key=edge?.id??'none';if(lastKey===key)return;lastKey=key;
    overlay.visible=Boolean(edge);
    if(!edge){preview=null;instructions();return;}
    const result=withPassage(getScene(),edge.id);
    preview={tool,edge:edge.id,valid:result.ok,reason:result.reason??null,changed:result.changed??0};
    overlay.position.set(edge.axis==='x'?edge.line:(edge.from+edge.to)/2,.083,edge.axis==='x'?(edge.from+edge.to)/2:edge.line);
    overlay.scale.set(edge.axis==='x'?.22:CELL,edge.axis==='x'?CELL:.22,1);overlay.material.color.setHex(result.ok?0x729d4e:0xb25634);
    status(result.ok?`Clique para ${edge.opening?'fechar':'abrir'} esta passagem.`:result.reason,!result.ok);
  }
  function cancel() {
    const wasDragging=Boolean(drag),pointerId=drag?.pointerId;drag=null;selectStart=null;preview=null;lastKey=null;overlay.visible=false;controls.enabled=true;canvas.style.cursor='';
    if(pointerId!==undefined&&canvas.hasPointerCapture(pointerId))canvas.releasePointerCapture(pointerId);
    instructions();return wasDragging;
  }
  function apply(tool,patch,roomId=getActiveRoom(),theme=getNewTheme()) {
    cancel();if(!isActive())return {ok:false,reason:'Entre em Construir para alterar a planta.'};
    const result=withRoomArea(getScene(),tool,patch,roomId,tool==='new'?theme:undefined);
    if(result.ok&&result.changed){setActiveRoom(result.roomId);commit(result.scene,tool==='new'?'Ambiente criado com uma passagem.':tool==='add'?'Ambiente ampliado.':'Recorte aplicado.');}
    else if(!result.ok)toast(result.reason);
    return {ok:result.ok,changed:result.changed??0,...(result.ok?{roomId:result.roomId}:{reason:result.reason})};
  }
  function applyPassage(edgeId) {
    cancel();if(!isActive())return {ok:false,reason:'Entre em Construir para alterar as passagens.'};
    const result=withPassage(getScene(),edgeId);
    if(result.ok)commit(result.scene,'Passagem atualizada.');else toast(result.reason);
    return {ok:result.ok,...(!result.ok?{reason:result.reason}:{})};
  }
  for(const name of tools)$('floor-'+name).onclick=()=>{cancel();tool=name;instructions();update();};
  function update(){
    for(const name of tools)$('floor-'+name).setAttribute('aria-pressed',String(name===tool));
    const current=getScene(),room=current.rooms.find(r=>r.id===getActiveRoom());
    $('floor-count').textContent=`${current.rooms.length} ${current.rooms.length===1?'ambiente':'ambientes'} · ${(current.cells.length*CELL*CELL).toFixed(2).replace('.',',')} m²`;
    $('room-area').textContent=`${((room?.cells.length??0)*CELL*CELL).toFixed(2).replace('.',',')} m²`;
    $('floor-limit').textContent=`80 cm por bloco · até 8 ambientes / ${PLAN_LIMITS.cells} blocos`;
  }
  canvas.addEventListener('pointerdown',event=>{
    if(!isActive()||event.button!==0||event.shiftKey||event.altKey)return;
    if(tool==='select'){selectStart={x:event.clientX,y:event.clientY};return;}
    event.preventDefault();event.stopImmediatePropagation();canvas.focus({preventScroll:true});const point=at(event);if(!point)return;
    drag={start:cell(point),edge:nearestEdge(point)?.id,pointerId:event.pointerId};lastKey=null;controls.enabled=false;canvas.style.cursor='crosshair';canvas.setPointerCapture(event.pointerId);
    tool==='passage'?showPassage(point):show(drag.start,drag.start);
  },true);
  canvas.addEventListener('pointermove',event=>{
    if(!isActive()||tool==='select'||event.shiftKey||event.altKey||(!drag&&event.buttons))return;
    const point=at(event);if(!point)return;tool==='passage'?showPassage(point):show(drag?.start??cell(point),cell(point));
    if(drag){event.preventDefault();event.stopImmediatePropagation();}
  },true);
  canvas.addEventListener('pointerup',event=>{
    if(isActive()&&tool==='select'&&selectStart){const start=selectStart;selectStart=null;if(Math.hypot(event.clientX-start.x,event.clientY-start.y)<5){const p=at(event),id=p?roomAt(getScene(),p.x,p.z):null;if(id)selectRoom(id);}return;}
    if(!drag)return;event.preventDefault();event.stopImmediatePropagation();
    const onCanvas=document.elementFromPoint(event.clientX,event.clientY)===canvas,point=at(event),start=drag.start,edge=drag.edge;cancel();
    if(!onCanvas||!point)return;
    if(tool==='passage'){if(edge&&nearestEdge(point)?.id===edge)applyPassage(edge);}
    else apply(tool,brushCells(start,cell(point)));
  },true);
  canvas.addEventListener('pointerleave',()=>{if(!drag)cancel();});
  canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',()=>{if(drag)cancel();});
  addEventListener('keydown',event=>{if(isActive()&&event.key==='Escape'&&!event.target.closest('input,textarea,select')){event.preventDefault();event.stopImmediatePropagation();cancel();}},true);
  addEventListener('blur',cancel);addEventListener('pagehide',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  return {cancel,update,apply,applyPassage,activate:()=>{cancel();tool='select';instructions();update();},read:()=>preview};
}
