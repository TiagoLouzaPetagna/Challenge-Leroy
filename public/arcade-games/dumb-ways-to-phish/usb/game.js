import * as THREE from 'three';
import {GLTFLoader} from './vendor/GLTFLoader.js';
import {GameEngine,SYMBOLS,COLORS} from './engine.mjs';
import {createUsbIcons} from './usb-icons.js';
import {createLedBloom} from './led-bloom.js';
const $=s=>document.querySelector(s),canvas=$('#game'),stage=$('#stage');
const scene=new THREE.Scene();scene.background=new THREE.Color('#191e1b');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const camera=new THREE.OrthographicCamera(-1,1,1,-1,.01,15);camera.position.set(0,2.35,3.3);camera.lookAt(0,.95,.0);
scene.add(new THREE.HemisphereLight(0xf0e5c1,0x344d37,2.0));const sun=new THREE.DirectionalLight(0xffecc4,2.1);sun.position.set(-2,5,3);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:.1,far:12});sun.shadow.bias=-.0004;scene.add(sun);
const fill=new THREE.DirectionalLight(0x9fc6bd,.55);fill.position.set(3,2,-2);scene.add(fill);
let usbIcons;const sealMaterials=new Map();
const models={},visuals=new Map(),tosses=[];let screenMaterial,monitorFaces={},drag=null,ready=false,last=performance.now(),toastUntil=0,buttonsKey='',pausedByVisibility=false;
const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.MeshStandardMaterial({color:0x3b4c3d,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.005;floor.receiveShadow=true;floor.visible=false;scene.add(floor);
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),surface=new THREE.Plane(new THREE.Vector3(0,1,0),-.80);
const embedded=new URLSearchParams(location.search).has('embedded');
let reduced=false,displayRoundOffset=0,displayScoreOffset=0;
const notify=(type,data={})=>{if(embedded)parent.postMessage({usb:true,type,...data},location.origin);};
const engine=new GameEngine({onEvent:handleEvent});
const ledBloom=createLedBloom(renderer,scene,camera);
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);ledBloom.resize(w,h);const aspect=w/h,span=Math.max(1.03,1.72/aspect);camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(stage);resize();
function prepare(o){o.traverse(n=>{if(n.isMesh){n.castShadow=true;n.receiveShadow=true;}});return o;}
function addModel(name,pos){const o=models[name].clone(true);o.position.set(...pos);scene.add(o);return o;}
const sleeveColors=['#56767b','#826444','#63715a','#79616d','#80774f'];
function createVisual(a){
 const g=new THREE.Group();g.visible=false;scene.add(g);
 const hand=models.retro_mao_3d.clone(true);g.add(hand);
 const morphs=[];hand.traverse(n=>{if(n.isMesh&&n.morphTargetInfluences){n.morphTargetInfluences=n.morphTargetInfluences.slice();morphs.push(n);}});
 const drive=models['retro_pendrive_'+COLORS[a.color]].clone(true);drive.scale.setScalar(1.35);drive.position.set(0,.033,-.005);g.add(drive);
 drive.traverse(n=>{if(!n.isMesh||!n.material.name.startsWith('Selo impresso'))return;
  const key=`${a.color}:${a.symbol}`;if(!sealMaterials.has(key)){const m=n.material.clone();m.map=usbIcons.textures[a.color][a.symbol];sealMaterials.set(key,m);}n.material=sealMaterials.get(key);
 });
 const sleeve=models.retro_manga_3d.clone(true);sleeve.traverse(n=>{if(n.isMesh){n.material=n.material.clone();n.material.color.set(sleeveColors[a.slot%5]);}});sleeve.visible=false;scene.add(sleeve);
 const v={g,hand,morphs,drive,sleeve,lastState:'',savedPos:new THREE.Vector3(),savedRot:0,savedRotX:0,tossed:false,open:0,search:0};visuals.set(a.id,v);return v;
}
function disposeVisual(v){scene.remove(v.g,v.sleeve);v.sleeve.traverse(n=>{if(n.isMesh)n.material.dispose();});}
function clearVisuals(){for(const v of visuals.values())disposeVisual(v);visuals.clear();}
function updateSleeve(a,v){
 const wrist=new THREE.Vector3(0,0,.096).applyQuaternion(v.g.quaternion).add(v.g.position);
 const base=new THREE.Vector3(a.targetX+(a.startX-a.targetX)*(1.8-a.targetZ)/(a.startZ-a.targetZ),v.g.position.y,1.8),dir=base.sub(wrist);v.sleeve.position.copy(wrist);
 v.sleeve.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),dir.clone().normalize());v.sleeve.scale.set(1,1,dir.length());
}
const ease=t=>{t=Math.min(1,Math.max(0,t));return t*t*(3-2*t);};
function updateVisual(a,v,dt){if(v.lastState!==a.state){v.savedPos.copy(v.g.position);v.savedRot=v.g.rotation.y;v.savedRotX=v.g.rotation.x;v.lastState=a.state;}
 if(a.state==='approach'||a.state==='waiting'){const p=a.progress;v.g.position.set(a.startX+(a.targetX-a.startX)*p,.754+a.height,a.startZ+(a.targetZ-a.startZ)*p);v.g.rotation.set(.30,Math.atan2(a.startX-a.targetX,a.startZ-a.targetZ),0);}
 else if(a.state==='align'){const p=ease(a.age/.38);v.g.position.lerpVectors(v.savedPos,new THREE.Vector3(0,.754,.28),p);v.g.rotation.y=v.savedRot*(1-p);v.g.rotation.x=v.savedRotX*(1-p);}
 else if(a.state==='insert'){v.g.position.set(0,.754,.28-.073*ease(a.age/.62));v.g.rotation.set(0,0,0);}
 else if(a.state==='search'){v.g.position.copy(v.savedPos);v.g.position.x+=Math.sin(a.age*15)*.012;v.g.rotation.y=v.savedRot+Math.sin(a.age*13)*.14;}
 else if(a.state==='retreat'){const p=ease(a.age/.6);v.g.position.lerpVectors(v.savedPos,new THREE.Vector3(a.startX,.754,1.14),p);v.g.rotation.y=v.savedRot*(1-p);}
 v.g.visible=a.state!=='pending'&&a.state!=='gone'&&!(a.state==='retreat'&&a.age>.6);v.sleeve.visible=v.g.visible;v.drive.visible=a.hasDrive&&!v.tossed;handPose(v,a,dt);updateSleeve(a,v);
}
function handPose(v,a,dt){if(reduced){for(const m of v.morphs)m.morphTargetInfluences.fill(0);return;}
 let open=0,search=0;
 if(!a.hasDrive){if(a.state==='search'){open=a.age<.25?1:.22+.2*Math.sin(a.age*17);search=a.age<.25?0:.55+.4*Math.sin((a.age-.25)*17);}else open=.6;}
 const k=1-Math.exp(-dt*24);v.open+=(open-v.open)*k;v.search+=(search-v.search)*k;
 for(const m of v.morphs){m.morphTargetInfluences[m.morphTargetDictionary.Soltar]=v.open;m.morphTargetInfluences[m.morphTargetDictionary.Procurar]=v.search;}
}
function setFace(name){for(const [key,obj] of Object.entries(monitorFaces))obj.visible=key===name;}
function drawTarget(){
 const list=$('#allowed-list');list.replaceChildren();
 for(const index of engine.accepted){
  const symbol=SYMBOLS[index],item=document.createElement('div'),img=document.createElement('img'),label=document.createElement('span');
  item.className='allowed-item';img.src=usbIcons.previews[index];img.alt=symbol.name;label.textContent=symbol.name;
  item.append(img,label);list.append(item);
 }
 $('#target').textContent=engine.accepted.map(i=>SYMBOLS[i].name).join(' / ');setFace('neutra');
}
function react(good){setFace(good?'alegre':'triste');}
function hud(){notify('hud',{score:engine.score,lives:engine.lives,round:engine.round});$('#round').textContent=`RODADA ${Math.max(1,engine.round-displayRoundOffset)}`;const localScore=engine.score-displayScoreOffset;$('#score').textContent=`${localScore} ACERTO${localScore===1?'':'S'}`;$('#lives').textContent=`${engine.lives} TENTATIVAS`;$('#collected').textContent=engine.collected;}
function toast(text,bad=false){$('#toast').textContent=text;$('#toast').className='show'+(bad?' bad':'');toastUntil=performance.now()+1700;}
function handleEvent(e){if(e.type==='resolved')notify('decision',{correct:e.correct});if(e.type==='finished')notify('finished',{score:engine.score,round:engine.round});if(e.type==='round'){if(drag){scene.remove(drag.o);drag=null;}clearVisuals();clearTosses();engine.actors.forEach(createVisual);drawTarget();hud();buttonsKey='';}
 if(e.type==='removed'){hud();buttonsKey='';}
 if(e.type==='resolved'){if(drag){toss(drag.o);drag=null;}react(e.correct);hud();toast(e.correct?'CONEXÃO AUTORIZADA!':e.actor?'SELO ERRADO. ACESSO NEGADO.':'NENHUM PENDRIVE CHEGOU.',!e.correct);if(!e.correct&&!reduced)stage.classList.add('shake');setTimeout(()=>stage.classList.remove('shake'),450);}
 if(e.type==='finished'){showOverlay(engine.lives>0?'Expediente encerrado.':'Acesso bloqueado.',`${engine.score} acertos em ${engine.round} rodadas. ${engine.collected} pendrives recolhidos.`,'Jogar de novo');$('#pause').disabled=true;if(!embedded)setTimeout(()=>{if(engine.state==='finished')start();},1800);}}
function showOverlay(title,text,button){$('#overlay').classList.remove('hidden');$('#overlay-title').textContent=title;$('#overlay-text').textContent=text;$('#start').textContent=button;$('#loading').textContent='';}
function start(options){$('#overlay').classList.add('hidden');$('#pause').disabled=false;$('#pause').textContent='Pausar';$('#pause').setAttribute('aria-label','Pausar o jogo');$('#restart').disabled=false;engine.count=+$('#amount').value;engine.duration=+$('#speed').value;displayRoundOffset=options?.round?options.round-1:0;displayScoreOffset=options?.score||0;engine.start(options);}
$('#start').onclick=()=>start();$('#restart').onclick=()=>start();$('#amount').onchange=()=>{engine.count=+$('#amount').value;if(engine.state==='playing')toast('Quantidade aplicada na próxima rodada.');};$('#speed').onchange=()=>{engine.duration=+$('#speed').value;if(engine.state==='playing')toast('Ritmo aplicado na próxima rodada.');};
function pause(){if(embedded){notify('pause');return;}if(!['playing','result'].includes(engine.state))return;engine.paused=!engine.paused;$('#pause').textContent=engine.paused?'Continuar':'Pausar';$('#pause').setAttribute('aria-label',engine.paused?'Continuar o jogo':'Pausar o jogo');if(engine.paused)toast('PAUSADO');else $('#toast').className='';}$('#pause').onclick=pause;
function detach(id){if(!engine.remove(id))return null;const v=visuals.get(id);v.g.updateMatrixWorld(true);const o=v.drive.clone(true);o.position.copy(v.drive.getWorldPosition(new THREE.Vector3()));o.quaternion.copy(v.drive.getWorldQuaternion(new THREE.Quaternion()));o.scale.copy(v.drive.getWorldScale(new THREE.Vector3()));scene.add(o);v.tossed=true;v.drive.visible=false;return o;}
function toss(o){tosses.push({o,from:o.position.clone(),to:new THREE.Vector3(-.60+(Math.random()-.5)*.12,.771,-.06+(Math.random()-.5)*.12),age:0});}
function quickRemove(id){const o=detach(id);if(o)toss(o);}
function clearTosses(){for(const t of tosses)scene.remove(t.o);tosses.length=0;}
function worldPoint(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.ray.intersectPlane(surface,new THREE.Vector3());}
function pick(e){if(engine.state!=='playing'||engine.paused)return null;let best=null,dist=40;const r=canvas.getBoundingClientRect();
 pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);
 const candidates=engine.actors.filter(a=>a.hasDrive&&visuals.get(a.id)?.g.visible),owners=new Map(),meshes=[];
 for(const a of candidates){const v=visuals.get(a.id);v.g.updateMatrixWorld(true);v.drive.traverse(n=>{if(n.isMesh){meshes.push(n);owners.set(n,a);}});}
 const hit=ray.intersectObjects(meshes,false)[0];if(hit)return owners.get(hit.object);
 for(const a of engine.actors){if(!a.hasDrive||a.state==='gone')continue;const v=visuals.get(a.id);if(!v||!v.g.visible)continue;v.g.updateMatrixWorld(true);const p=v.drive.getWorldPosition(new THREE.Vector3()).project(camera);const d=Math.hypot((p.x+1)*r.width/2+r.left-e.clientX,(-p.y+1)*r.height/2+r.top-e.clientY);if(d<dist){dist=d;best=a;}}return best;}
canvas.addEventListener('pointerdown',e=>{if(drag||e.button>0)return;const a=pick(e);if(!a)return;const o=detach(a.id);if(!o)return;drag={o,id:e.pointerId};canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';e.preventDefault();});
canvas.addEventListener('pointermove',e=>{if(drag&&drag.id===e.pointerId){if(engine.paused)return;const p=worldPoint(e);if(p){drag.o.position.copy(p);drag.o.position.y=.86;}return;}canvas.style.cursor=pick(e)?'grab':'default';});
function release(e){if(!drag||drag.id!==e.pointerId)return;toss(drag.o);drag=null;canvas.style.cursor='default';if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
document.addEventListener('keydown',e=>{if(['SELECT','INPUT','TEXTAREA'].includes(e.target.tagName)||e.repeat)return;if(e.code==='KeyR'&&ready&&!embedded){start();return;}if(['Space','Escape','KeyP'].includes(e.code)){e.preventDefault();pause();}if(/^[1-8]$/.test(e.key)){const a=engine.actors[+e.key-1];if(a)quickRemove(a.id);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&!engine.paused&&['playing','result'].includes(engine.state)){pause();pausedByVisibility=true;}else if(!document.hidden&&pausedByVisibility){pausedByVisibility=false;last=performance.now();}});
function handButtons(){const key=engine.actors.map(a=>a.hasDrive?`${a.id}:${a.state}`:'').join()+(engine.paused?'p':'')+engine.state;if(key===buttonsKey)return;buttonsKey=key;$('#hand-buttons').replaceChildren();for(const a of engine.actors){if(!a.hasDrive||a.state==='pending'||a.state==='gone'||engine.state!=='playing')continue;const b=document.createElement('button');b.textContent=`${a.slot+1} · ${SYMBOLS[a.symbol].glyph}`;b.setAttribute('aria-label',`Retirar pendrive ${a.slot+1}: ${SYMBOLS[a.symbol].name}`);b.disabled=engine.paused;b.onclick=()=>quickRemove(a.id);$('#hand-buttons').append(b);}}
async function init(){try{usbIcons=await createUsbIcons();const loader=new GLTFLoader();const names=['retro_mesa','monitor_sem_rosto','expressao_alegre','expressao_neutra','expressao_triste','retro_ambiente_v4','retro_modulo_usb','retro_bandeja','retro_mao_3d','retro_manga_3d',...COLORS.map(c=>'retro_pendrive_'+c)];await Promise.all(names.map(async name=>{models[name]=prepare((await loader.loadAsync(`assets/${name}.glb`)).scene);}));
 addModel('retro_ambiente_v4',[0,0,0]);addModel('retro_mesa',[0,0,0]);const monitor=addModel('monitor_sem_rosto',[0,.7425,-.20]);monitor.scale.setScalar(1.12);
 // Plain dark CRT glass; the unused phosphor grid is hidden.
 monitor.traverse(o=>{if(!o.isMesh)return;if(o.material.name==='Fosforo apagado')o.visible=false;});
 for(const name of ['alegre','neutra','triste']){const face=models['expressao_'+name].clone(true);face.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false;o.material=o.material.clone();o.material.emissiveIntensity=2.2;ledBloom.register(o);}});monitor.add(face);monitorFaces[name]=face;}
 addModel('retro_modulo_usb',[0,.7425,.045]).scale.setScalar(1.8);addModel('retro_bandeja',[-.60,.7425,-.06]);ready=true;$('#start').disabled=false;$('#start').textContent='COMEÇAR TURNO →';$('#loading').textContent='';if(embedded)notify('ready');else start();
 }catch(err){notify('error');console.error(err);$('#overlay-title').textContent='A mesa não carregou.';$('#overlay-text').textContent='Abra pelo servidor local indicado no README. Detalhe: '+err.message;$('#loading').textContent='';}}
function tick(now){const dt=Math.min((now-last)/1000,.05);last=now;if(ready){engine.update(dt);for(const a of engine.actors){const v=visuals.get(a.id);if(v)updateVisual(a,v,engine.paused?0:dt);}if(!engine.paused){for(const t of tosses){t.age+=dt;const p=ease(t.age/.42);t.o.position.lerpVectors(t.from,t.to,p);t.o.position.y+=(reduced?0:Math.sin(p*Math.PI)*.19);if(t.age<.42&&!reduced)t.o.rotation.y+=dt*3;if(t.age>.42)t.o.position.copy(t.to);}}handButtons();if(now>toastUntil&&!engine.paused)$('#toast').className='';}ledBloom.render();requestAnimationFrame(tick);}requestAnimationFrame(tick);init();
// Read-only diagnostics for integration and repeatable QA.
window.usbPrototype={getState:()=>({ready,state:engine.state,paused:engine.paused,round:engine.round,score:engine.score,lives:engine.lives,target:engine.target,accepted:[...(engine.accepted||[])],waveCount:engine.waveCount,waveDuration:engine.waveDuration,actors:engine.actors.map(a=>({...a})),collected:engine.collected}),projectHand:(slot)=>{const a=engine.actors[slot],v=a&&visuals.get(a.id);if(!v)return null;const p=v.drive.getWorldPosition(new THREE.Vector3()).project(camera),r=canvas.getBoundingClientRect();return{x:(p.x+1)*r.width/2+r.left,y:(-p.y+1)*r.height/2+r.top};}};





window.addEventListener('message',e=>{if(!embedded||e.source!==parent||e.origin!==location.origin||!e.data.usb)return;const {type}=e.data;if(type==='start'&&ready)start(e.data.options);if(type==='pause'){engine.paused=true;if(drag){toss(drag.o);drag=null;}}if(type==='resume'){engine.paused=false;last=performance.now();}if(type==='stop'){engine.paused=true;engine.state='idle';clearVisuals();clearTosses();}if(type==='preferences')reduced=!!e.data.reduced;});
