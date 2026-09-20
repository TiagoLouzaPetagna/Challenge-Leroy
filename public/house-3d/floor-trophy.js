import * as THREE from 'three';
import {FLOOR_TROPHY} from './trophy-metadata.js';
export {FLOOR_TROPHY} from './trophy-metadata.js';

// Placement metadata is separate from the animated model's own transforms.

export function createFloorTrophy(gltf){
 const item=new THREE.Group();item.name='Lapide_no_chao';item.position.fromArray(FLOOR_TROPHY.position);
 item.userData={itemId:FLOOR_TROPHY.id,kind:'floor',width:FLOOR_TROPHY.width,depth:FLOOR_TROPHY.depth,height:FLOOR_TROPHY.height,focusHeight:.82};
 gltf.scene.scale.setScalar(FLOOR_TROPHY.scale);item.add(gltf.scene);
 const normalized=gltf.scene.getObjectByName('PASS123_Web');
 if(normalized){
   const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0),point=new THREE.Vector3();
   gltf.scene.traverse(mesh=>{if(!mesh.isMesh)return;
     for(const mat of Array.isArray(mesh.material)?mesh.material:[mesh.material])if(mat.name.startsWith('Fantasma |')){mat.clippingPlanes=[plane];mat.clipShadows=true;}
     const updateClip=()=>{gltf.scene.updateWorldMatrix(true,false);point.set(0,normalized.userData.spectralClipHeight,0).applyMatrix4(gltf.scene.matrixWorld);for(const mat of Array.isArray(mesh.material)?mesh.material:[mesh.material])for(const clip of mat.clippingPlanes??[])clip.constant=-point.y;};
     mesh.onBeforeRender=updateClip;mesh.onBeforeShadow=updateClip;
   });
 }
 const clip=gltf.animations[0];if(!clip)throw Error('Animação do troféu ausente');
 const mixer=new THREE.AnimationMixer(gltf.scene);mixer.clipAction(clip).play();
 return {item,mixer,clip};
}
