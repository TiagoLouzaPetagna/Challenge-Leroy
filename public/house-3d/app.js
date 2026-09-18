import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {FLOOR_TROPHY,createFloorTrophy} from './floor-trophy.js';
import {createMimic} from './mimic.js';
import {CATALOG,byId} from './catalog.js';
import {createNeutralFurniture,createImportedAnimation} from './neutral-furniture.js';
import {CELL,FLOOR_Y,STORAGE_KEY,History,clone,footprint,baseY,localPoint,pointOnSurface,mountedWall,groupIds,withoutItem,withItem,validateScene,readSave,encodeSave} from './editor-state.js';
import {WALL_HEIGHT,WALL_GAP,WINDOW,wallPose,wallAlong,wallPlane,resolveWall,wallsForCells,wallsForScene} from './wall-model.js';
import {upgradeRooms,renameRoom,setRoomTheme,partitionEdges,roomAt} from './room-plan.js';
import {planBounds,brushCells,PLAN_LIMITS} from './floor-plan.js';
import {RoomStructure,constructionGrid} from './room-structure.js';
import {createFloorBuilder} from './floor-builder.js';
import {icon,fillIcons} from './icons.js';
import {CUT_HEIGHT,supportsAttachment} from './wall-visibility.js';
import {readFinish,finishThumbnail,furnitureAsset,architectureAsset,FINISHES} from './finish-preference.js';
import {applyIndustrialTheme} from './industrial-themes.js';
import {applyCyberpunkTheme} from './cyberpunk-theme.js';
import {createShadowDetailLighting} from './shadow-detail-lighting.js';
import {surfacesFor} from './editor-state.js';
import {configureModels,readModelSave} from './model-versions.js';

const embedParams=new URLSearchParams(location.search);
const embedded=embedParams.get('embedded')==='1';
const visitorProfile=embedParams.get('visitor');
const requestedTheme=embedParams.get('theme');
const visitorTheme=['crafted','cyberpunk','industrial'].includes(requestedTheme)?requestedTheme:null;
let requestedHostMode=['edit','view','build'].includes(embedParams.get('mode'))?embedParams.get('mode'):null;
document.documentElement.classList.toggle('embedded',embedded);
const $=id=>document.getElementById(id), canvas=$('scene');
let finishMode=visitorTheme??'crafted';if(!visitorTheme)try{finishMode=readFinish(window.localStorage);}catch{}
const modernModels=true;configureModels(true);
const themeLabels={'previous':'Anterior','detailed':'Casa texturizada','crafted':'Tatame trabalhado','crafted-plain':'Sala anterior','default-room':'Cômodo default','industrial':'Industrial','industrial-loft':'Industrial Loft','cyberpunk':'Cyberpunk'};
for(const id of ['room-theme','new-room-theme']){for(const theme of FINISHES){const option=document.createElement('option');option.value=theme;option.textContent=themeLabels[theme];$(id).append(option);}$(id).value=finishMode;}
fillIcons();
const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-6,6,6,-6,.1,100);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
renderer.localClippingEnabled=true;
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;controls.enablePan=true;controls.minPolarAngle=.15;controls.maxPolarAngle=Math.PI/2-.04;controls.minZoom=.2;controls.maxZoom=5;
const ambient=new THREE.HemisphereLight(0xfff7e7,0xb7baa0,2.9);scene.add(ambient);
const sun=new THREE.DirectionalLight(0xfff2df,2);sun.position.set(0,9,3);sun.target.position.set(3,0,1);
sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:.1,far:25});
sun.shadow.bias=-.00015;sun.shadow.normalBias=.015;sun.shadow.radius=3;scene.add(sun,sun.target);
const fill=new THREE.DirectionalLight(0xf4faeb,.65);fill.position.set(7,5,7);scene.add(fill);
// Approved lighting: balanced contrast with readable shadow detail.
ambient.intensity=1.7;ambient.color.setHex(0xe6edff);ambient.groundColor.setHex(0x7c7884);
sun.intensity=2.8;sun.color.setHex(0xffe8d0);sun.position.copy(sun.target.position).add(new THREE.Vector3(-5,8,5));
fill.intensity=.75;fill.color.setHex(0xdceaff);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
const shadowDetail=createShadowDetailLighting(renderer,scene);shadowDetail.setEnabled(true);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:0x435338,opacity:.10}));
ground.rotation.x=-Math.PI/2;ground.position.y=-.155;ground.receiveShadow=true;scene.add(ground);

const importedMixers=new Map();
const models=new Map(),cards=new Map(),pointer=new THREE.Vector2(),ray=new THREE.Raycaster();
const selection=new THREE.LineLoop(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:0x597c40,transparent:true,opacity:.9,depthTest:false}));
selection.renderOrder=5;selection.visible=false;scene.add(selection);
const footprintFill=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({color:0x809e53,transparent:true,opacity:.18,depthWrite:false,depthTest:false}));
footprintFill.rotation.x=-Math.PI/2;footprintFill.renderOrder=4;footprintFill.visible=false;scene.add(footprintFill);
let manifest,history,walls,grid,trophyMixer,trophyClip,structure,builder,buildGrid,ready=false;
let mimicMixer,mimicClip;
let wallMode='auto',activeRoom='room-1',focusRoomId=null,buildCamera=null;
let selected=null,mode='edit',moveMode=true,gridVisible=false,category='all',collapsed=false;
let frameMode='house',cameraInteraction=null;
let gesture=null,cardDrag=null,pointerDown=null,lastPointer=null,suppressCardClick=0;
let storage,lastRaw=null,saveBlocked=false,saveState='loading',saveTimer,toastTimer;
const heldArrows=new Set();
const currentItem=()=>history?.scene.items.find(item=>item.id===selected);
const isWall=id=>byId[id]?.kind==='wall';
const wallTitle=id=>wallPlane(id)?.label??'Parede';
const currentCells=()=>history?.scene.cells??manifest?.cells;
const currentWalls=()=>history?wallsForScene(history.scene):wallsForCells(currentCells());

function toast(message) {
  clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;
  toastTimer=setTimeout(()=>$('toast').hidden=true,3500);
}
function saveLabel(message,error=false) {
  $('save-state').textContent=message;$('save-state').dataset.state=error?'error':'ok';
}
function viewState() {
  return {camera:camera.position.toArray(),target:controls.target.toArray(),zoom:camera.zoom,walls:wallMode!=='low',wallMode,focusRoom:focusRoomId,grid:gridVisible,mode,activeRoom,frame:frameMode??'free'};
}
function blockSave(message) {
  saveBlocked=true;saveState='blocked';saveLabel(message,true);$('save-recovery').hidden=false;
  $('save-recovery').title='Preservar o salvamento anterior em uma cópia e salvar a decoração desta aba';
}
function persist() {
  clearTimeout(saveTimer);if(!ready||saveBlocked)return;
  try {
    if(!storage)throw Error('Armazenamento indisponível');
    if(storage.getItem(STORAGE_KEY)!==lastRaw) {
      blockSave('Outra aba alterou a decoração. Recarregue para abrir essa versão.');return;
    }
    const raw=encodeSave(history.scene,viewState());storage.setItem(STORAGE_KEY,raw);lastRaw=raw;
    saveState='saved';saveLabel('Salvo neste navegador');$('save-recovery').hidden=true;
  } catch(error) {
    saveState='unavailable';saveLabel('Não foi possível salvar. Mantenha esta aba aberta.',true);
    $('save-recovery').hidden=false;$('save-recovery').title='Tentar salvar novamente';
  }
}
function scheduleSave() {
  if(!ready||saveBlocked)return;
  clearTimeout(saveTimer);saveState='pending';saveTimer=setTimeout(persist,400);
}
$('save-recovery').onclick=()=>{
  try {
    storage=window.localStorage;
    const previous=storage.getItem(STORAGE_KEY);
    if(saveBlocked&&previous!==null)storage.setItem(`${STORAGE_KEY}:recovery:${Date.now()}`,previous);
    lastRaw=previous;saveBlocked=false;persist();
    if(saveState==='saved')toast('Decoração salva. A versão anterior foi preservada quando necessário.');
  } catch(error){saveLabel('O navegador ainda não permite salvar esta decoração.',true);}
};
addEventListener('storage',event=>{
  if(ready&&(event.key===STORAGE_KEY||event.key===null)&&event.newValue!==lastRaw)blockSave('A decoração mudou em outra aba. Recarregue para abrir essa versão.');
});
addEventListener('pagehide',()=>{cancelGesture(false);persist();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelGesture(false);persist();}});

function updateUI() {
  if(!ready)return;
  const placed=currentItem(),editing=mode==='edit',building=mode==='build';
  if(!history.scene.rooms.some(r=>r.id===activeRoom))activeRoom=history.scene.rooms[0].id;
  if(focusRoomId&&!history.scene.rooms.some(r=>r.id===focusRoomId))focusRoomId=null;
  const room=history.scene.rooms.find(r=>r.id===activeRoom),roomSelect=$('room-select');
  const optionsKey=JSON.stringify(history.scene.rooms.map(r=>[r.id,r.name]));
  if(roomSelect.dataset.options!==optionsKey){roomSelect.replaceChildren(...history.scene.rooms.map(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=r.name;return o;}));roomSelect.dataset.options=optionsKey;}
  if($('room-tabs').dataset.options!==optionsKey){$('room-tabs').replaceChildren(...history.scene.rooms.map(r=>{const b=document.createElement('button');b.type='button';b.dataset.room=r.id;b.textContent=r.name;b.title=`Focar ${r.name}`;b.onclick=()=>chooseRoom(r.id,true);return b;}));$('room-tabs').dataset.options=optionsKey;}
  $('all-rooms').setAttribute('aria-pressed',String(!focusRoomId));
  for(const b of $('room-tabs').children)b.setAttribute('aria-pressed',String(b.dataset.room===focusRoomId));
  roomSelect.value=activeRoom;
  $('room-theme').value=room.theme??finishMode;
  if(document.activeElement!==$('room-name'))$('room-name').value=room.name;
  $('studio').classList.toggle('view-mode',mode==='view');$('studio').classList.toggle('build-mode',building);
  $('mode-label').textContent=building||editing?'Concluir':'Decorar';
  $('mode').setAttribute('aria-label',building?'Concluir construção':editing?'Concluir':'Decorar');
  const modeIcon=editing||building?'check':'edit';if($('mode-icon').dataset.icon!==modeIcon){$('mode-icon').dataset.icon=modeIcon;$('mode-icon').replaceChildren(icon(modeIcon));}
  $('build').setAttribute('aria-pressed',String(building));$('build-panel').hidden=!building;builder?.update();
  $('move').setAttribute('aria-pressed',String(moveMode));$('grid').setAttribute('aria-pressed',String(gridVisible));
  const wallLabel={auto:'Paredes automáticas',full:'Paredes inteiras',low:'Paredes baixas'}[wallMode];
  $('walls').setAttribute('aria-label',wallLabel);$('walls').title=`${wallLabel} · clique para alternar`;
  $('wall-mode-label').textContent={auto:'Auto',full:'Inteiras',low:'Baixas'}[wallMode];
  $('walls').dataset.mode=wallMode;
  $('undo').disabled=mode==='view'||!history.past.length;$('redo').disabled=mode==='view'||!history.future.length;
  $('selected-tools').hidden=!editing||(!placed&&!gesture?.draft);
  $('selected-name').textContent=byId[selected]?.name??'';
  $('selected-name').title=byId[selected]?.description??'';
  $('selected-state').textContent=gesture?'Escolha a posição · Esc cancela':placed?(placed.wall?wallTitle(placed.wall):placed.parent?`Sobre ${byId[placed.parent].name.toLowerCase()}`:`No chão · ${history.scene.rooms.find(r=>r.id===roomAt(history.scene,placed.x,placed.z))?.name??'Casa'}`):'Guardado na coleção';
  $('rotate').disabled=!editing||(!placed&&!gesture);$('remove').disabled=!editing||!placed;
  $('rotate').hidden=isWall(selected);$('wall-height').hidden=!isWall(selected)||!placed;
  const wallDraft=gesture?.draft??placed;
  if(isWall(selected)&&wallDraft)$('wall-height-value').value=`Base a ${(baseY(wallDraft,history.scene.items)-FLOOR_Y).toFixed(2).replace('.',',')} m`;
  $('raise').disabled=$('lower').disabled=!editing||!placed||Boolean(gesture);
  $('walls').disabled=building||Boolean(gesture&&isWall(gesture.id));
  $('focus').disabled=!placed;$('cancel').hidden=!gesture;
  $('collection').classList.toggle('collapsed',collapsed);$('studio').classList.toggle('collection-collapsed',collapsed);
  $('collection-content').hidden=collapsed;$('collapse').setAttribute('aria-expanded',String(!collapsed));
  $('collapse').title=collapsed?'Abrir coleção':'Recolher coleção';
  $('collapse-label').textContent=collapsed&&gesture?.kind==='drag'?'Solte para guardar':'Minha coleção';
  $('placed-count').textContent=`${history.scene.items.length} objetos na casa`;
  for(const item of CATALOG) {
    const card=cards.get(item.id),onFloor=history.scene.items.some(v=>v.id===item.id);
    card.hidden=category!=='all'&&item.category!==category;
    card.setAttribute('aria-pressed',String(item.id===selected));card.dataset.placed=String(onFloor);
    card.querySelector('.item-state').textContent=onFloor?'Na casa':'Colocar';
    card.setAttribute('aria-label',`${item.name}, ${onFloor?'na casa':'guardado, colocar na casa'}`);
  }
  document.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===category)));
  $('hint').textContent=building?'Shift + arrastar gira a câmera':gesture?'R gira · Enter coloca · Esc cancela':'Arraste o espaço para explorar';
  grid.visible=editing&&gridVisible;
  buildGrid.visible=building;
  structure.guides.visible=building;
  updateOutline();
}
function fade(id,active) {
  models.get(id)?.traverse(o=>{if(o.isMesh)for(const m of (Array.isArray(o.material)?o.material:[o.material])) {
    m.opacity=m.userData.baseOpacity*(active?.55:1);m.transparent=active||m.userData.baseTransparent;m.depthWrite=active?false:m.userData.baseDepthWrite;
  }});
}
function drawItems(items,active=new Set()) {
  for(const [id,model] of models) {
    const item=items.find(v=>v.id===id);model.visible=Boolean(item);fade(id,active.has(id));
    if(item){model.position.set(item.x,baseY(item,items),item.z);model.rotation.y=item.angle;}
  }
  updateWallVisibility(items);
}
function updateWallVisibility(items=gesture?.scene?.items??history.scene.items) {
  if(!structure?.sections.length)return;
  const chosen=gesture?.draft??currentItem(),attachment=mode==='edit'&&chosen?mountedWall(chosen,items):null;
  const direction=camera.position.clone().sub(controls.target).normalize();
  const changed=structure.updateVisibility({mode:wallMode,building:mode==='build',room:focusRoomId,direction,attachment,attachmentWidth:attachment?byId[attachment.id].width:0});
  let itemChanged=false;
  for(const [id,model] of models) {
    const item=items.find(v=>v.id===id),support=item&&mountedWall(item,items);
    const visible=Boolean(item)&&(!support||structure.attachmentVisible(support,byId[support.id].width));
    if(model.visible!==visible)itemChanged=true;
    model.visible=visible;
  }
  if(changed||itemChanged)updateOutline();
}
function syncModels() {
  if(structure.update(currentCells(),history.scene)) {
    for(const previous of [grid,buildGrid])if(previous){scene.remove(previous);previous.geometry.dispose();previous.material.dispose();}
    grid=makeGrid(currentCells());buildGrid=constructionGrid(currentCells());scene.add(grid,buildGrid);
    const b=planBounds(currentCells()),extent=Math.max(7,...Object.values(b).map(v=>Math.abs(v)+3));
    Object.assign(sun.shadow.camera,{left:-extent,right:extent,top:extent,bottom:-extent});sun.shadow.camera.updateProjectionMatrix();
  }
  drawItems(history.scene.items);
  updateUI();
}
function updateOutline() {
  const item=gesture?.draft??currentItem(),visible=mode==='edit'&&Boolean(item)&&models.get(item?.id)?.visible&&(moveMode||Boolean(gesture));
  selection.visible=visible;footprintFill.visible=visible&&Boolean(gesture);
  if(!visible)return;
  const height=baseY(item,gesture?.scene?.items??history.scene.items);
  const definition=byId[item.id],wallItem=isWall(item.id),c=Math.cos(item.angle),s=Math.sin(item.angle);
  const wallPoint=(x,y)=>new THREE.Vector3(item.x+x*c+(definition.depth/2+.006)*s,height+y,item.z-x*s+(definition.depth/2+.006)*c);
  const points=wallItem?[wallPoint(-definition.width/2,0),wallPoint(definition.width/2,0),wallPoint(definition.width/2,definition.height),wallPoint(-definition.width/2,definition.height)]:footprint(item).map(p=>new THREE.Vector3(p.x,height+.012,p.z));
  selection.geometry.dispose();selection.geometry=new THREE.BufferGeometry().setFromPoints(points);
  const valid=!gesture?.issue,color=valid?0x597c40:0xb25634;
  selection.material.color.setHex(color);footprintFill.material.color.setHex(color);
  if(wallItem){footprintFill.position.copy(wallPoint(0,definition.height/2));footprintFill.rotation.set(0,item.angle,0);footprintFill.scale.set(definition.width,definition.height,1);}
  else{footprintFill.position.set(item.x,height+.008,item.z);footprintFill.rotation.set(-Math.PI/2,0,item.angle);footprintFill.scale.set(definition.width,definition.depth,1);}
}
function positionObjectTools() {
  const panel=$('selected-tools'),item=gesture?.draft??currentItem();
  const visible=ready&&mode==='edit'&&item&&models.get(item.id)?.visible;
  panel.hidden=!visible;if(!visible)return;
  const items=gesture?.scene?.items??history.scene.items,bottom=baseY(item,items),top=bottom+byId[item.id].height;
  const points=footprint(item).flatMap(p=>[bottom,top].map(y=>new THREE.Vector3(p.x,y,p.z).project(camera)));
  const xs=points.map(p=>(p.x+1)*innerWidth/2),ys=points.map(p=>(1-p.y)*innerHeight/2);
  const center=new THREE.Vector3(item.x,(bottom+top)/2,item.z).project(camera);
  if(center.z<-1||center.z>1||Math.max(...xs)<0||Math.min(...xs)>innerWidth||Math.max(...ys)<0||Math.min(...ys)>innerHeight){panel.style.visibility='hidden';return;}
  const w=panel.offsetWidth,h=panel.offsetHeight,ceiling=$('studio').querySelector('.room-nav').getBoundingClientRect().bottom+8;
  const floor=collapsed?innerHeight-88:$('collection').getBoundingClientRect().top-8;
  let x=(Math.min(...xs)+Math.max(...xs)-w)/2,y=Math.min(...ys)-h-10;
  if(y<ceiling)y=Math.max(...ys)+10;
  x=Math.max(12,Math.min(innerWidth-w-12,x));y=Math.max(ceiling,Math.min(floor-h,y));
  panel.style.left=`${Math.round(x)}px`;panel.style.top=`${Math.round(y)}px`;panel.style.visibility='visible';panel.dataset.dragging=String(gesture?.kind==='drag');
}
function commit(next,message) {
  if(!history.commit(next)){syncModels();return false;}
  syncModels();persist();if(message)toast(message);return true;
}
function selectItem(id) {
  if(!Object.hasOwn(byId,id))return;
  if(mode==='build')setMode('edit');
  cancelGesture(false);selected=id;
  const item=currentItem();
  if(item&&focusRoomId&&roomAt(history.scene,item.x,item.z)!==focusRoomId){activeRoom=roomAt(history.scene,item.x,item.z)??activeRoom;setView(false,true);}
  updateWallVisibility();updateUI();persist();
}
function setMode(value) {
  cancelGesture(false);builder?.cancel();
  const wasBuilding=mode==='build';
  if(value==='build'&&!wasBuilding){buildCamera={camera:camera.position.clone(),target:controls.target.clone(),zoom:camera.zoom,frame:frameMode,room:focusRoomId};builder?.activate();}
  mode=value;moveMode=value==='edit';controls.enabled=true;syncModels();
  if(value==='build'&&!wasBuilding)setView();
  else if(wasBuilding&&value!=='build'&&buildCamera){camera.position.copy(buildCamera.camera);controls.target.copy(buildCamera.target);camera.zoom=buildCamera.zoom;frameMode=buildCamera.frame;focusRoomId=buildCamera.room;if(focusRoomId)activeRoom=focusRoomId;buildCamera=null;camera.updateProjectionMatrix();controls.update();}
  else if(wasBuilding&&value!=='build')setView(false,Boolean(focusRoomId));
  updateWallVisibility();resize();updateUI();persist();notifyHost('casa-atelie:mode');
}

function notifyHost(type,extra={}) {
  if(embedded&&window.parent!==window)window.parent.postMessage({type,mode,...extra},location.origin);
}
window.addEventListener('message',event=>{
  if(!embedded||event.origin!==location.origin||event.source!==window.parent)return;
  if(event.data?.type!=='casa-digital:set-mode'||!['edit','view','build'].includes(event.data.mode))return;
  requestedHostMode=event.data.mode;
  if(ready)setMode(requestedHostMode);
});
function undo() {cancelGesture(false);builder?.cancel();if(mode==='view')return false;const result=history.undo();if(result){syncModels();persist();toast('Alteração desfeita.');}return result;}
function redo() {cancelGesture(false);builder?.cancel();if(mode==='view')return false;const result=history.redo();if(result){syncModels();persist();toast('Alteração refeita.');}return result;}
function storeItem(id=selected) {
  if(mode!=='edit'||!history.scene.items.some(item=>item.id===id))return false;
  const children=groupIds(history.scene,id).size-1;
  cancelGesture(false);return commit(withoutItem(history.scene,id),children?`${byId[id].name} e ${children===1?'seu objeto voltaram':`seus ${children} objetos voltaram`} à coleção.`:`${byId[id].name} voltou à coleção.`);
}
function applyItem(item,message) {
  if(mode!=='edit')return {ok:false,reason:'Entre no modo Decorar para editar.'};
  const result=withItem(history.scene,item,currentCells());
  if(result.ok)commit(result.scene,message);else toast(result.reason);
  return {ok:result.ok,...(!result.ok?{reason:result.reason}:{})};
}
function rotateItem() {
  if(mode!=='edit')return;
  if(isWall(selected)){toast('A orientação acompanha a parede. Arraste o item para outra parede.');return;}
  if(gesture){gesture.angle+=Math.PI/4;if(gesture.draft)preview({...gesture.draft,angle:gesture.angle});return;}
  const item=currentItem();if(item)applyItem({...item,angle:item.angle+Math.PI/4});
}
function adjustWallHeight(delta) {
  const item=currentItem();if(mode!=='edit'||!item||!isWall(item.id)||gesture)return;
  applyItem({...item,elevation:item.elevation+delta});
}

function setView(close=false,roomOnly=false) {
  cameraInteraction=null;
  const item=currentItem(),model=models.get(selected);
  focusRoomId=roomOnly?activeRoom:close&&item?roomAt(history.scene,item.x,item.z):null;
  if(focusRoomId)activeRoom=focusRoomId;
  const focusHeight=item&&(byId[selected]?.kind==='object'||isWall(selected))?baseY(item,history.scene.items)+byId[selected].height/2:model?.userData.focusHeight??.47;
  const focusCells=roomOnly?history.scene.rooms.find(r=>r.id===activeRoom).cells:currentCells();
  const b=focusCells?planBounds(focusCells):{minX:0,maxX:6.4,minZ:-2.4,maxZ:4.8};
  const target=close&&item?new THREE.Vector3(item.x,focusHeight,item.z):new THREE.Vector3((b.minX+b.maxX)/2,.9,(b.minZ+b.maxZ)/2);
  const e=mode==='build'?1.12:Math.asin(21.2/39.2),damping=controls.enableDamping;controls.enableDamping=false;controls.update();
  camera.position.copy(target).add(new THREE.Vector3(Math.cos(e)/Math.sqrt(2),Math.sin(e),Math.cos(e)/Math.sqrt(2)).multiplyScalar(16));
  controls.target.copy(target);frameMode=close?null:roomOnly?'room':'house';camera.zoom=close?3.2:1;camera.updateProjectionMatrix();controls.update();controls.enableDamping=damping;
  if(ready){updateWallVisibility();resize();updateUI();persist();}
}
function workspaceRect() {
  const compact=innerWidth<=740,rect={left:compact?16:88,right:innerWidth-(compact?16:30),top:compact?134:160,bottom:innerHeight-93};
  const collection=$('collection'),panel=$('build-panel');
  if(mode==='edit'&&!collapsed)rect.bottom=collection.getBoundingClientRect().top-18;
  if(mode==='build'){
    const box=panel.getBoundingClientRect();rect.top=compact?141:104;
    if(compact)rect.bottom=box.top-16;else rect.right=box.left-24;
  }
  rect.bottom=Math.max(rect.top+80,rect.bottom);rect.right=Math.max(rect.left+80,rect.right);return rect;
}
function fitCurrentView(rect,vertical) {
  if(!frameMode||!ready)return;
  const cells=frameMode==='room'?history.scene.rooms.find(r=>r.id===activeRoom).cells:currentCells(),b=planBounds(cells),points=[];
  for(const [x,z] of cells)for(const [dx,dz] of [[0,0],[1,0],[1,1],[0,1]])points.push(new THREE.Vector3((x+dx)*CELL,0,(z+dz)*CELL));
  for(const w of structure.sections){
    const a=Math.max(w.from,w.axis==='x'?b.minZ:b.minX),c=Math.min(w.to,w.axis==='x'?b.maxZ:b.maxX);
    if(c<a||w.line<(w.axis==='x'?b.minX:b.minZ)-.01||w.line>(w.axis==='x'?b.maxX:b.maxZ)+.01)continue;
    for(const along of [a,c])points.push(new THREE.Vector3(w.axis==='x'?w.line:along,w.isLow?CUT_HEIGHT:WALL_HEIGHT,w.axis==='x'?along:w.line));
  }
  for(const item of history.scene.items)if(models.get(item.id)?.visible&&item.x>=b.minX&&item.x<=b.maxX&&item.z>=b.minZ&&item.z<=b.maxZ)for(const p of footprint(item))points.push(new THREE.Vector3(p.x,baseY(item,history.scene.items)+byId[item.id].height,p.z));
  camera.updateMatrixWorld();const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0),up=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,1);
  const xs=points.map(p=>p.clone().sub(controls.target).dot(right)),ys=points.map(p=>p.clone().sub(controls.target).dot(up)),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  const shift=right.multiplyScalar((minX+maxX)/2).add(up.multiplyScalar((minY+maxY)/2));camera.position.add(shift);controls.target.add(shift);
  const pixelsPerUnit=innerHeight/vertical;
  camera.zoom=THREE.MathUtils.clamp(.94*Math.min((rect.right-rect.left)/((maxX-minX)*pixelsPerUnit),(rect.bottom-rect.top)/((maxY-minY)*pixelsPerUnit)),.2,3.5);
}
function resize() {
  if(gesture||cardDrag)return;
  const aspect=innerWidth/innerHeight,vertical=Math.max(10.6,14/aspect);
  camera.left=-vertical*aspect/2;camera.right=vertical*aspect/2;camera.top=vertical/2;camera.bottom=-vertical/2;
  const rect=workspaceRect();fitCurrentView(rect,vertical);
  camera.setViewOffset(innerWidth,innerHeight,innerWidth/2-(rect.left+rect.right)/2,innerHeight/2-(rect.top+rect.bottom)/2,innerWidth,innerHeight);
  camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);$('zoom-value').value=`${Math.round(camera.zoom*100)}%`;
}
function zoom(factor) {frameMode=null;camera.zoom=THREE.MathUtils.clamp(camera.zoom*factor,.2,5);camera.updateProjectionMatrix();controls.update();persist();}
controls.addEventListener('start',()=>{cameraInteraction={position:camera.position.clone(),target:controls.target.clone(),zoom:camera.zoom};});
controls.addEventListener('end',()=>{cameraInteraction=null;});
controls.addEventListener('change',()=>{
  if(cameraInteraction&&(camera.position.distanceToSquared(cameraInteraction.position)>1e-8||controls.target.distanceToSquared(cameraInteraction.target)>1e-8||Math.abs(camera.zoom-cameraInteraction.zoom)>1e-7))frameMode=null;
  $('zoom-value').value=`${Math.round(camera.zoom*100)}%`;scheduleSave();
});
resize();setView();addEventListener('resize',()=>{cancelGesture(false);cardDrag=null;resize();});

function cast(event) {
  const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
  ray.setFromCamera(pointer,camera);
}
function atHeight(event,height) {cast(event);return ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-height),new THREE.Vector3());}
function floorAt(event) {return atHeight(event,FLOOR_Y);}
function pointAtWall(event,wall) {
  if(!wall)return null;
  cast(event);const sign=wall.normal??1,normal=wall.axis==='x'?new THREE.Vector3(sign,0,0):new THREE.Vector3(0,0,sign);
  if(ray.ray.direction.dot(normal)>=-.001)return null;
  return ray.ray.intersectPlane(new THREE.Plane(normal,-sign*wall.line-WALL_GAP),new THREE.Vector3());
}
function placementAt(event,offset) {
  if(isWall(gesture.id)) {
    const candidates=[];
    for(const wall of currentWalls()) {
      const hit=pointAtWall(event,wall);if(!hit)continue;
      const along=wall.axis==='x'?hit.z:hit.x;
      if(along<wall.from||along>wall.to||hit.y<.04||hit.y>WALL_HEIGHT)continue;
      if(focusRoomId&&!structure.sections.some(s=>supportsAttachment(s,{wall:wall.id,x:hit.x,z:hit.z})&&(s.positive===focusRoomId||s.negative===focusRoomId)))continue;
      candidates.push({wall:wall.id,along:along+(offset.along??0),elevation:hit.y+(offset.elevation??-byId[gesture.id].height/2),distance:camera.position.distanceTo(hit)});
    }
    candidates.sort((a,b)=>a.distance-b.distance);return candidates[0]??null;
  }
  if(byId[gesture.id].kind==='object') {
    const candidates=[];
    for(const parent of history.scene.items) {
      if(!models.get(parent.id)?.visible)continue;
      for(const surface of surfacesFor(parent)) {
      if(surface.clearanceHeight!=null&&byId[gesture.id].height>surface.clearanceHeight)continue;
      const hit=atHeight(event,baseY(parent,history.scene.items)+surface.height);if(!hit)continue;
      let point={x:hit.x+offset.x,z:hit.z+offset.z};
      if(pointOnSurface(point,parent,surface.id)) {
        if(surface.centerDepth){const local=localPoint(point,parent);point={x:parent.x+local.x*Math.cos(parent.angle),z:parent.z-local.x*Math.sin(parent.angle)};}
        candidates.push({...point,parent:parent.id,support:surface.id,distance:camera.position.distanceTo(hit)});
      }
      }
    }
    candidates.sort((a,b)=>a.distance-b.distance);
    if(candidates.length)return candidates[0];
  }
  const point=floorAt(event);return point?{x:point.x+offset.x,z:point.z+offset.z}:null;
}
function itemAt(event) {
  cast(event);const hits=ray.intersectObjects([...models.values()].filter(o=>o.visible),true);
  if(!hits.length)return null;let object=hits[0].object;while(object&&!object.userData.itemId)object=object.parent;
  return object?.userData.itemId??null;
}
function over(element,event) {const r=element.getBoundingClientRect();return event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;}
const returnZone=()=>collapsed?$('collapse'):$('collection');
function overCanvas(event) {return document.elementFromPoint(event.clientX,event.clientY)===canvas;}
function preview(draft) {
  if(!gesture)return;
  const result=withItem(history.scene,draft,currentCells());
  gesture.draft=draft;gesture.angle=draft.angle;gesture.issue=result.ok?null:result.reason;gesture.scene=result.scene;
  if(result.scene)drawItems(result.scene.items,groupIds(result.scene,draft.id));
  const label=$('placement-label');label.hidden=false;label.classList.toggle('invalid',Boolean(gesture.issue));
  const where=draft.wall?'na parede':draft.parent?`sobre ${byId[draft.parent].name.toLowerCase()}`:'no chão';
  label.textContent=gesture.issue??`${gesture.kind==='place'?'Clique ou pressione Enter':'Solte'} para colocar ${where}`;
  if(draft.wall)$('wall-height-value').value=`Base a ${(draft.elevation-FLOOR_Y).toFixed(2).replace('.',',')} m`;
  updateOutline();
}
function previewAt(event) {
  if(!gesture)return;
  const point=placementAt(event,gesture.offset);
  if(!point){gesture.issue='Escolha um trecho de parede.';$('placement-label').hidden=false;$('placement-label').textContent=gesture.issue;$('placement-label').classList.add('invalid');updateOutline();return;}
  const snap=n=>gridVisible?Math.round(n/.2)*.2:n;
  if(point.wall)preview(wallPose(byId[gesture.id],point.wall,snap(point.along),snap(point.elevation)));
  else preview({id:gesture.id,x:point.parent?point.x:snap(point.x),z:point.parent?point.z:snap(point.z),angle:gesture.angle,...(point.parent?{parent:point.parent,support:point.support}:{})});
  const returning=!$('return-target').hidden&&over(returnZone(),event);
  $('collection').classList.toggle('return-hover',returning);
  $('collapse').classList.toggle('return-hover',returning);
  if(returning){$('placement-label').textContent='Solte para guardar na coleção';$('placement-label').classList.remove('invalid');}
}
function startGesture(id,kind,offset={x:0,z:0}) {
  cancelGesture(false);selected=id;moveMode=true;
  if(isWall(id))drawItems(history.scene.items);
  const item=currentItem();gesture={id,kind,offset,angle:item?.angle??0,draft:null,issue:null};
  controls.enabled=false;canvas.style.cursor='grabbing';
  $('return-target').hidden=kind!=='drag';updateUI();
  if(item)preview(clone(item));else{$('placement-label').hidden=false;$('placement-label').textContent=isWall(id)?'Escolha uma parede · Esc cancela':byId[id].kind==='object'?'Escolha o chão ou um tampo · Esc cancela':'Escolha um lugar no piso · Esc cancela';}
}
function cancelGesture(announce=true) {
  if(!gesture)return false;
  gesture=null;heldArrows.clear();cardDrag=null;controls.enabled=true;canvas.style.cursor='';
  $('return-target').hidden=true;$('placement-label').hidden=true;$('collection').classList.remove('return-hover');$('collapse').classList.remove('return-hover');
  if(ready){syncModels();resize();}if(announce)toast('Movimento cancelado.');return true;
}
function finishGesture(event=null) {
  if(!gesture)return;
  if(event&&!$('return-target').hidden&&over(returnZone(),event)) {const id=gesture.id;cancelGesture(false);storeItem(id);return;}
  const active=gesture;
  if(active.issue||!active.draft||(event&&!overCanvas(event))) {
    const message=active.issue??'Escolha um lugar no piso.';
    if(active.kind==='place'&&event&&overCanvas(event)){toast(message);return;}
    cancelGesture(false);toast(message);return;
  }
  cancelGesture(false);applyItem(active.draft,active.kind==='place'?`${byId[active.id].name} colocado na sala.`:null);
}

// Capture before OrbitControls so moving an object never also moves the camera.
canvas.addEventListener('pointerdown',event=>{
  if(!ready||mode==='build'||event.button!==0)return;
  canvas.focus({preventScroll:true});lastPointer=event;pointerDown={x:event.clientX,y:event.clientY};
  if(gesture?.kind==='place'){event.stopImmediatePropagation();previewAt(event);canvas.setPointerCapture(event.pointerId);return;}
  const id=itemAt(event);
  if(mode==='edit'&&moveMode&&id&&!event.shiftKey&&!event.altKey) {
    const item=history.scene.items.find(v=>v.id===id),wall=isWall(id)?resolveWall(item.wall,wallAlong(item),currentCells(),history.scene):null,point=isWall(id)?pointAtWall(event,wall):atHeight(event,baseY(item,history.scene.items));
    if(!point)return;
    const offset=isWall(id)?{along:wallAlong(item)-(wall.axis==='x'?point.z:point.x),elevation:item.elevation-point.y}:{x:item.x-point.x,z:item.z-point.z};
    event.stopImmediatePropagation();startGesture(id,'drag',offset);canvas.setPointerCapture(event.pointerId);
  }
},true);
canvas.addEventListener('pointermove',event=>{
  lastPointer=event;if(gesture&&!cardDrag&&gesture.kind!=='keyboard')previewAt(event);
});
canvas.addEventListener('pointerup',event=>{
  if(!ready||mode==='build'||cardDrag)return;
  if(gesture&&gesture.kind!=='keyboard')finishGesture(event);
  else if(pointerDown&&Math.hypot(event.clientX-pointerDown.x,event.clientY-pointerDown.y)<5){const id=itemAt(event);if(id)selectItem(id);}
  pointerDown=null;if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
});
canvas.addEventListener('pointercancel',()=>{pointerDown=null;cancelGesture(false);});
canvas.addEventListener('lostpointercapture',()=>{if(gesture?.kind==='drag')cancelGesture(false);});

function buildCards() {
  $('collection-count').textContent=CATALOG.length;
  for(const item of CATALOG) {
    const card=document.createElement('button');card.type='button';card.dataset.item=item.id;
    card.title=item.description??`${item.name} · uma unidade na coleção`;
    const img=document.createElement('img');img.src=finishThumbnail(item,finishMode);img.alt='';img.draggable=false;
    const name=document.createElement('span');name.className='item-name';name.textContent=item.name;
    const status=document.createElement('span');status.className='item-state';const mark=document.createElement('span');mark.className='placed-mark';mark.append(icon('check'));mark.setAttribute('aria-hidden','true');card.append(mark,img,name,status);$('items').append(card);cards.set(item.id,card);
    card.onclick=()=>{
      if(performance.now()<suppressCardClick||mode!=='edit')return;
      selectItem(item.id);moveMode=true;
      if(!currentItem())startGesture(item.id,'place');else updateUI();
    };
    card.addEventListener('pointerdown',event=>{
      if(event.button!==0||mode!=='edit')return;
      cardDrag={id:item.id,x:event.clientX,y:event.clientY,started:false,pointerId:event.pointerId};
      card.setPointerCapture(event.pointerId);
    });
    card.addEventListener('pointercancel',()=>{cardDrag=null;cancelGesture(false);});
  }
}
addEventListener('pointermove',event=>{
  if(!cardDrag)return;
  if(!cardDrag.started&&Math.hypot(event.clientX-cardDrag.x,event.clientY-cardDrag.y)>7) {
    const held=cardDrag;startGesture(held.id,'drag');cardDrag=held;cardDrag.started=true;
  }
  if(cardDrag?.started)previewAt(event);
});
addEventListener('pointerup',event=>{
  if(!cardDrag)return;
  const held=cardDrag;cardDrag=null;
  if(held.started){suppressCardClick=performance.now()+300;finishGesture(event);}
  const card=cards.get(held.id);if(card.hasPointerCapture(event.pointerId))card.releasePointerCapture(event.pointerId);
});
addEventListener('blur',()=>{cardDrag=null;pointerDown=null;cancelGesture(false);});

const arrowSteps={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
addEventListener('keydown',event=>{
  if(!ready||event.target.closest('input,textarea,select,[contenteditable=true]'))return;
  const key=event.key.toLowerCase(),modifier=event.ctrlKey||event.metaKey;
  if(modifier&&key==='z'){event.preventDefault();event.shiftKey?redo():undo();return;}
  if(modifier&&key==='y'){event.preventDefault();redo();return;}
  if(key==='escape'){event.preventDefault();if(!cancelGesture()){selected=null;updateUI();}return;}
  if(mode!=='edit'||modifier||event.altKey)return;
  if(key==='r'&&!event.repeat){event.preventDefault();rotateItem();return;}
  if(key==='delete'||key==='backspace'){event.preventDefault();storeItem();return;}
  if(key==='g'&&!event.repeat){event.preventDefault();$('grid').click();return;}
  if(key==='enter'&&gesture){event.preventDefault();finishGesture();return;}
  if(arrowSteps[event.key]) {
    if(!gesture&&!currentItem())return;
    event.preventDefault();
    if(!gesture)startGesture(selected,'keyboard');
    if(!gesture.draft)return;
    const step=(gridVisible?.2:.08)*(event.shiftKey?5:1),[dx,dz]=arrowSteps[event.key];
    const next=isWall(gesture.id)?wallPose(byId[gesture.id],gesture.draft.wall,wallAlong(gesture.draft)+dx*step,gesture.draft.elevation-dz*step):{...gesture.draft,x:gesture.draft.x+dx*step,z:gesture.draft.z+dz*step};
    const result=withItem(history.scene,next,currentCells());
    if(result.ok)preview(next);else toast(result.reason);
    heldArrows.add(event.key);
  }
});
addEventListener('keyup',event=>{heldArrows.delete(event.key);if(gesture?.kind==='keyboard'&&arrowSteps[event.key]&&!heldArrows.size)finishGesture();});

$('reset').onclick=()=>{cancelGesture(false);builder?.cancel();setView();};
$('all-rooms').onclick=$('reset').onclick;
function chooseRoom(id,focus=false) {
  if(!history.scene.rooms.some(r=>r.id===id))return {ok:false,reason:'Ambiente não encontrado.'};
  cancelGesture(false);builder.cancel();activeRoom=id;if(focus){selected=null;setView(false,true);}updateUI();persist();return {ok:true};
}
function nameRoom(id,name) {
  if(mode!=='build')return {ok:false,reason:'Entre em Construir para renomear ambientes.'};
  builder.cancel();const result=renameRoom(history.scene,id,name);
  if(result.ok)commit(result.scene,'Nome do ambiente atualizado.');else toast(result.reason);
  return {ok:result.ok,...(!result.ok?{reason:result.reason}:{})};
}
$('room-theme').onchange=()=>{builder.cancel();const result=setRoomTheme(history.scene,activeRoom,$('room-theme').value);if(result.ok)commit(result.scene,'Tema do ambiente atualizado.');else toast(result.reason);};
$('room-select').onchange=()=>chooseRoom($('room-select').value);
$('room-focus').onclick=()=>chooseRoom(activeRoom,true);
$('close-build').onclick=()=>setMode('edit');
$('room-name-form').onsubmit=event=>{event.preventDefault();nameRoom(activeRoom,$('room-name').value);};
$('walls').onclick=()=>{wallMode={auto:'full',full:'low',low:'auto'}[wallMode];syncModels();resize();persist();toast({auto:'Paredes se ajustam ao cômodo e à câmera.',full:'Paredes inteiras.',low:'Paredes baixas. Selecione um quadro ou prateleira para revelar sua parede.'}[wallMode]);};
$('focus').onclick=()=>{cancelGesture(false);setView(true);syncModels();};
$('raise').onclick=()=>adjustWallHeight(.08);$('lower').onclick=()=>adjustWallHeight(-.08);
$('move').onclick=()=>{cancelGesture(false);moveMode=!moveMode;updateUI();};
$('grid').onclick=()=>{gridVisible=!gridVisible;updateUI();persist();};
$('mode').onclick=()=>setMode(mode==='edit'?'view':'edit');
$('build').onclick=()=>setMode(mode==='build'?'edit':'build');
$('rotate').onclick=rotateItem;$('remove').onclick=()=>storeItem();$('cancel').onclick=()=>cancelGesture();
$('undo').onclick=undo;$('redo').onclick=redo;
$('zoom-in').onclick=()=>zoom(1.2);$('zoom-out').onclick=()=>zoom(1/1.2);
$('collapse').onclick=()=>{collapsed=!collapsed;updateUI();resize();};
$('close-collection').onclick=()=>{collapsed=true;updateUI();resize();};
new ResizeObserver(()=>{if(ready){resize();scheduleSave();}}).observe($('collection'));
new ResizeObserver(()=>{if(ready&&mode==='build')resize();}).observe($('build-panel'));
document.querySelectorAll('[data-category]').forEach(button=>button.onclick=()=>{category=button.dataset.category;updateUI();});

function makeGrid(cells) {
  const lines=new Map();
  for(const [x,z] of cells)for(let n=0;n<=4;n++) {
    const a=[x*CELL+n*.2,FLOOR_Y+.006,z*CELL],b=[a[0],a[1],(z+1)*CELL];
    const c=[x*CELL,FLOOR_Y+.006,z*CELL+n*.2],d=[(x+1)*CELL,c[1],c[2]];
    for(const pair of [[a,b],[c,d]])lines.set(pair.flat().map(v=>v.toFixed(4)).join(','),pair);
  }
  const geometry=new THREE.BufferGeometry().setFromPoints([...lines.values()].flat().map(v=>new THREE.Vector3(...v)));
  return new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:0x486b43,transparent:true,opacity:.28,depthWrite:false}));
}
let previous=performance.now();renderer.setAnimationLoop(now=>{
  const delta=Math.min((now-previous)/1000,.05);previous=now;
  if(models.get('grave')?.visible)trophyMixer?.update(delta);
  if(models.get('mimic')?.visible)mimicMixer?.update(delta);
  for(const [id,mixer] of importedMixers)if(models.get(id)?.visible)mixer.update(delta);
  controls.update();if(ready){camera.updateMatrixWorld();updateWallVisibility();positionObjectTools();}renderer.render(scene,camera);
});

try {
  const getJSON=async path=>{const response=await fetch(path);if(!response.ok)throw Error('Arquivo ausente: '+path);return response.json();};
  const [description,seed]=await Promise.all([getJSON('./assets/principal/scene.json'),getJSON('./assets/principal/editor-seed.json')]);manifest=description;
  const loader=new GLTFLoader();
  const [room,trophy,decor,wallDecor,floorKit,mimic,furniture,finishes,sakura]=await Promise.all([loader.loadAsync('./assets/principal/casa-principal.glb'),loader.loadAsync('./assets/novos-modelos/lapide.glb'),loader.loadAsync('./assets/decor/objetos.glb'),loader.loadAsync('./assets/wall/objetos.glb'),loader.loadAsync(architectureAsset(finishMode)),loader.loadAsync('./assets/mimico/mimico-respirando.glb'),loader.loadAsync(furnitureAsset(finishMode)),finishMode==='detailed'?loader.loadAsync('./assets/casa-refinada/acabamentos.glb'):Promise.resolve(null),loader.loadAsync('./assets/novos-modelos/mesa.glb')]);
  scene.add(room.scene,furniture.scene);
  for(const item of manifest.items) {
    const original=room.scene.getObjectByName(item.node);
    const older=finishes?.scene.getObjectByName(item.node)??furniture.scene.getObjectByName(item.node);
    const refined=item.id==='table'&&sakura?sakura.scene:older;
    if(refined!==older)older?.removeFromParent();
    const model=refined??original;if(!model)throw Error('Móvel ausente: '+item.id);
    if(refined&&original)original.removeFromParent();
    if(refined)scene.add(refined);
    model.userData={...model.userData,itemId:item.id,...byId[item.id]};models.set(item.id,model);
  }
  const animated=createFloorTrophy(trophy);trophyMixer=animated.mixer;trophyClip=animated.clip;models.set('grave',animated.item);scene.add(animated.item);
  const breathing=createMimic(mimic);mimicMixer=breathing.mixer;mimicClip=breathing.clip;models.set('mimic',breathing.item);scene.add(breathing.item);
  scene.add(decor.scene);
  for(const item of CATALOG.filter(item=>item.kind==='object'&&!item.asset)) {
    const original=decor.scene.getObjectByName(item.node),refined=finishes?.scene.getObjectByName(item.node);
    const model=refined??original;if(!model)throw Error('Objeto ausente: '+item.id);
    if(refined){original?.removeFromParent();scene.add(refined);}
    model.userData={...model.userData,...item,itemId:item.id};models.set(item.id,model);
  }
  scene.add(wallDecor.scene);
  for(const item of CATALOG.filter(item=>item.kind==='wall'&&!item.asset)) {
    const original=wallDecor.scene.getObjectByName(item.node),refined=finishes?.scene.getObjectByName(item.node);
    const model=refined??original;if(!model)throw Error('Objeto de parede ausente: '+item.id);
    if(refined){original?.removeFromParent();scene.add(refined);}
    model.userData={...model.userData,...item,itemId:item.id};models.set(item.id,model);
  }
  const neutralModels=await Promise.all(CATALOG.filter(item=>item.asset).map(async item=>[item,await loader.loadAsync(item.asset)]));
  for(const [definition,gltf] of neutralModels){const model=createNeutralFurniture(definition,gltf);models.set(definition.id,model);scene.add(model);const mixer=createImportedAnimation(gltf);if(mixer)importedMixers.set(definition.id,mixer);}
  // Refined item roots were moved into the live scene; templates stay offscreen.
  for(const root of [room.scene,furniture.scene,...models.values(),decor.scene,wallDecor.scene,floorKit.scene,...(finishes?[finishes.scene]:[])])root.traverse(object=>{
    if(!object.isMesh||object.userData.finishPrepared)return;object.userData.finishPrepared=true;object.castShadow=true;object.receiveShadow=true;
    const originals=Array.isArray(object.material)?object.material:[object.material];
    const materials=originals.map(original=>{
      const material=original.clone();material.userData={...material.userData,baseOpacity:material.opacity,baseTransparent:material.transparent,baseDepthWrite:material.depthWrite};
      for(const texture of [material.map,material.normalMap,material.roughnessMap])if(texture)texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return material;
    });object.material=Array.isArray(object.material)?materials:materials[0];
  });
  const themeStates=new Map();
  const kitCache=new Map([[architectureAsset(finishMode),floorKit]]);
  for(const theme of FINISHES){
    const path=architectureAsset(theme);
    if(!kitCache.has(path))kitCache.set(path,await loader.loadAsync(path));
    const kit=kitCache.get(path).scene.clone(true);
    const details=theme==='detailed'?(finishes??await loader.loadAsync('./assets/casa-refinada/acabamentos.glb')).scene.clone(true):null;
    const architecture=['crafted','default-room','industrial','industrial-loft','cyberpunk'].includes(theme)?kit:details;
    const state=new RoomStructure(room.scene.clone(true),architecture??kit,architecture);
    await applyIndustrialTheme(state,theme);await applyCyberpunkTheme(state,theme);shadowDetail.bindFloor(state);
    themeStates.set(theme,state);
  }
  structure=themeStates.get(finishMode);structure.installThemes(themeStates,finishMode);
  for(const name of ['Piso','PisoMadeira','Paredes','Janela']){const node=room.scene.getObjectByName(name);if(node)node.visible=false;}
  walls=structure.walls;scene.add(structure.floor,walls,structure.guides,structure.context);
  let saved;
  if(visitorProfile){saved={status:'empty'};saveBlocked=true;saveState='blocked';}
  else {
    try{storage=window.localStorage;}catch{}
    if(storage){saved=readModelSave(storage,manifest.cells,modernModels);lastRaw=storage.getItem(STORAGE_KEY);}
    else saved={status:'unavailable'};
  }
  if(saved.modelsAdapted&&lastRaw)storage.setItem(STORAGE_KEY+(saved.furnitureAdapted?':before-furniture-scale-135':':before-model-change'),lastRaw);
  const loadedScene=saved.status==='loaded'?saved.scene:validateScene(seed,manifest.cells);
  const themedScene=upgradeRooms({...loadedScene,cells:loadedScene.cells??manifest.cells});
  history=new History({...themedScene,rooms:themedScene.rooms.map(r=>({...r,theme:r.theme??finishMode}))});
  builder=createFloorBuilder({canvas,camera,scene,controls,getScene:()=>history.scene,getActiveRoom:()=>activeRoom,getNewTheme:()=>$('new-room-theme').value,setActiveRoom:id=>{activeRoom=id;},selectRoom:id=>chooseRoom(id),isActive:()=>mode==='build',commit,toast});
  if(saved.status==='loaded') {
    const view=saved.view;wallMode=view.wallMode??(view.walls===false?'low':'auto');gridVisible=view.grid??false;mode=view.mode??'edit';
    activeRoom=view.activeRoom??history.scene.rooms[0].id;
    frameMode=view.frame==='free'?null:view.frame??'house';
    focusRoomId=view.focusRoom??(frameMode==='room'?activeRoom:null);
    if(view.camera){camera.position.fromArray(view.camera);controls.target.fromArray(view.target);camera.zoom=view.zoom;camera.updateProjectionMatrix();controls.update();}
  }
  buildCards();$('studio').setAttribute('aria-busy','false');$('loading').hidden=true;
  for(const id of ['reset','walls','focus','move','grid','mode','build','zoom-in','zoom-out','room-select','room-focus'])$(id).disabled=false;
  const requested=new URLSearchParams(location.search).get('item');selected=Object.hasOwn(byId,requested)?requested:null;
  if(requested&&Object.hasOwn(byId,requested))mode='edit';
  if(requestedHostMode)mode=requestedHostMode;
  ready=true;syncModels();resize();if(saved.status!=='loaded'||saved.view.frame===undefined)setView();

  if(saved.status==='invalid')blockSave('O salvamento anterior não abriu. Esta sessão é temporária.');
  else persist();
  if(saved.modelsAdapted)toast(saved.furnitureAdapted?'Móveis ampliados em 35%. A decoração anterior foi preservada em uma cópia.':'Mesa ajustada ao novo tamanho. A decoração anterior foi preservada em uma cópia.');
  registerTools();
  notifyHost('casa-atelie:ready');
} catch(error) {
  $('loading').hidden=false;$('loading').textContent='Não foi possível abrir a sala. Recarregue a página.';
  if(error.modelConflict){$('loading').textContent=error.message;}
  notifyHost('casa-atelie:error',{message:'Não foi possível abrir a casa 3D.'});
  saveLabel('A decoração salva foi preservada.',true);console.error(error);
}

function readRoom() {
  return {loaded:ready,finish:finishMode,reference:manifest.reference,room:manifest.room,style:manifest.style,selected,mode,moveMode,walls:wallMode!=='low',wallMode,focusRoom:focusRoomId,wallSections:structure.sections.map(s=>({key:s.key,axis:s.axis,line:s.line,from:s.from,to:s.to,low:s.isLow,positive:s.positive,negative:s.negative})),grid:gridVisible,
    activeRoom,rooms:history.scene.rooms.map(r=>({...r,area:r.cells.length*CELL*CELL})),partitions:partitionEdges(history.scene),openings:history.scene.openings,
    items:history.scene.items.map(item=>({...item,y:baseY(item,history.scene.items),width:byId[item.id].width,depth:byId[item.id].depth,kind:byId[item.id].kind,visible:models.get(item.id).visible})),
    surfaces:history.scene.items.filter(item=>byId[item.id].surface).map(item=>({id:item.id,x:item.x,z:item.z,angle:item.angle,...byId[item.id].surface,y:baseY(item,history.scene.items)+byId[item.id].surface.height})),
    mountableWalls:currentWalls(),window:WINDOW,
    floor:{cells:currentCells(),cellSize:CELL,area:currentCells().length*CELL*CELL,bounds:planBounds(currentCells()),limits:PLAN_LIMITS,preview:builder.read()},
    inventory:CATALOG.filter(item=>!history.scene.items.some(v=>v.id===item.id)).map(item=>item.id),
    preview:gesture?{kind:gesture.kind,item:gesture.draft,valid:!gesture.issue&&Boolean(gesture.draft),reason:gesture.issue}:null,
    history:{undo:history.past.length,redo:history.future.length},save:{status:saveState,key:STORAGE_KEY},
    trophy:{time:trophyMixer.time%trophyClip.duration,duration:trophyClip.duration,height:FLOOR_TROPHY.height,visible:models.get('grave').visible},
    mimic:{time:mimicMixer.time%mimicClip.duration,duration:mimicClip.duration,visible:models.get('mimic').visible},
    camera:camera.position.toArray(),target:controls.target.toArray(),zoom:camera.zoom,framing:frameMode??'free',triangles:renderer.info.render.triangles,drawCalls:renderer.info.render.calls};
}
function registerTools() {
  if(!document.modelContext?.registerTool)return;
  const lifecycle=new AbortController();addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(console.warn);}catch(error){console.warn(error);}};
  const ids=CATALOG.map(item=>item.id),idSchema={type:'string',enum:ids};
  const parentSchema={anyOf:[{type:'string',enum:CATALOG.filter(item=>item.surface).map(item=>item.id)},{type:'null'}]};
  register({name:'mount_wall_item',description:'Coloca ou move quadro/prateleira na parede. Use um id de mountableWalls de read_room. Along é a posição ao longo do trecho e elevation é a altura da base. Move também os objetos apoiados; valida janela, colisões, teto e histórico.',inputSchema:{type:'object',properties:{id:{type:'string',enum:CATALOG.filter(item=>item.kind==='wall').map(item=>item.id)},wall:{type:'string'},along:{type:'number'},elevation:{type:'number'}},required:['id','wall','along','elevation'],additionalProperties:false},execute:input=>{
    cancelGesture(false);const result=applyItem(wallPose(byId[input.id],input.wall,input.along,input.elevation,currentCells(),history.scene));return {...result,state:readRoom()};
  }});
  const cellSchema={type:'array',items:{type:'integer',minimum:-32,maximum:32},minItems:2,maxItems:2};
  register({name:'edit_floor',description:'Cria um ambiente (new), amplia (add) ou recorta (erase) uma área em blocos de 80 cm. Exige modo build. roomId indica o ambiente a ampliar, omitido usa o selecionado. Cria uma passagem inicial e valida conexões, móveis e janela.',inputSchema:{type:'object',properties:{tool:{type:'string',enum:['add','erase','new']},from:cellSchema,to:cellSchema,roomId:{type:'string'}},required:['tool','from','to'],additionalProperties:false},execute:input=>({...builder.apply(input.tool,brushCells(input.from,input.to),input.roomId??activeRoom),state:readRoom()})});
  register({name:'toggle_passage',description:'Abre ou fecha uma passagem em uma divisória. Exige modo build; use o id de uma partition retornada por read_room. Preserva móveis e a ligação entre os cômodos.',inputSchema:{type:'object',properties:{edge:{type:'string'}},required:['edge'],additionalProperties:false},execute:input=>({...builder.applyPassage(input.edge),state:readRoom()})});
  register({name:'select_room',description:'Seleciona um ambiente existente e, opcionalmente, centraliza a câmera nele.',inputSchema:{type:'object',properties:{id:{type:'string'},focus:{type:'boolean'}},required:['id'],additionalProperties:false},execute:input=>({...chooseRoom(input.id,input.focus),state:readRoom()})});
  register({name:'rename_room',description:'Renomeia um ambiente em modo build, preservando o histórico e o salvamento.',inputSchema:{type:'object',properties:{id:{type:'string'},name:{type:'string',minLength:1,maxLength:40}},required:['id','name'],additionalProperties:false},execute:input=>({...nameRoom(input.id,input.name),state:readRoom()})});
  register({name:'read_room',description:'Lê a decoração salva, coleção, histórico, prévia de movimento, câmera e animação da sala 3D.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:readRoom});
  register({name:'move_furniture',description:'Move um item e os objetos apoiados nele. Para transferir um objeto pequeno, informe parent com o id do tampo ou null para o chão; omitido mantém o apoio atual. Respeita colisões, histórico e salvamento.',inputSchema:{type:'object',properties:{id:idSchema,x:{type:'number'},z:{type:'number'},parent:parentSchema},required:['id','x','z'],additionalProperties:false},execute:input=>{
    cancelGesture(false);const item=history.scene.items.find(v=>v.id===input.id);
    const result=item?applyItem({...item,x:input.x,z:input.z,...(Object.hasOwn(input,'parent')?{parent:input.parent}:{})}):{ok:false,reason:'O item está guardado.'};return {moved:result.ok,reason:result.reason,state:readRoom()};
  }});
  register({name:'place_furniture',description:'Coloca um item guardado. Informe parent para apoiar livros ou luminária num tampo; omitido ou null coloca no chão. Não cria cópias e usa a mesma validação da interface.',inputSchema:{type:'object',properties:{id:idSchema,x:{type:'number'},z:{type:'number'},angle:{type:'number'},parent:parentSchema},required:['id','x','z'],additionalProperties:false},execute:input=>{
    cancelGesture(false);const present=history.scene.items.some(item=>item.id===input.id);
    const result=present?{ok:false,reason:'Esse item já está na sala.'}:applyItem({id:input.id,x:input.x,z:input.z,angle:input.angle??0,...(Object.hasOwn(input,'parent')?{parent:input.parent}:{})});
    return {...result,state:readRoom()};
  }});
  register({name:'room_action',description:'Seleciona ou guarda um item, gira o selecionado, desfaz/refaz, alterna construir/decorar/visualizar ou cancela a prévia; mesmas ações dos botões.',inputSchema:{type:'object',properties:{action:{type:'string',enum:['select','store','rotate','undo','redo','edit','view','build','cancel']},id:idSchema},required:['action'],additionalProperties:false},execute:input=>{
    if(input.action==='select'&&input.id)selectItem(input.id);
    else if(input.action==='store')storeItem(input.id??selected);
    else if(input.action==='rotate')rotateItem();else if(input.action==='undo')undo();else if(input.action==='redo')redo();
    else if(['edit','view','build'].includes(input.action))setMode(input.action);else if(input.action==='cancel'){cancelGesture();builder.cancel();}return readRoom();
  }});
}
