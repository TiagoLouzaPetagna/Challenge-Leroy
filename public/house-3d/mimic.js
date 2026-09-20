import * as THREE from 'three';
import {MIMIC} from './mimic-metadata.js';
export function createMimic(gltf) {
  const item=new THREE.Group();item.name='Mimico_Cofre_Faminto';
  item.userData={...MIMIC,itemId:MIMIC.id,kind:'floor',focusHeight:.75};item.add(gltf.scene);
  const clip=gltf.animations[0];if(!clip)throw Error('Respiração do mímico ausente');
  const mixer=new THREE.AnimationMixer(gltf.scene);mixer.clipAction(clip).play();
  return {item,mixer,clip};
}
