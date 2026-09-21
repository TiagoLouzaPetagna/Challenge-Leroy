import * as THREE from 'three';
import {NEON_INTENSITY_BOOST} from './neon-intensity.js';
export function createNeutralFurniture(definition,gltf){
  const model=new THREE.Group();model.name=definition.name;
  if(definition.collection==='cyberpunk'){
    const materials=new Map();
    gltf.scene.traverse(object=>{
      if(!object.isMesh)return;
      const boost=source=>{
        if(!source.emissive||source.emissive.getHex()===0)return source;
        if(!materials.has(source)){
          const material=source.clone();
          material.emissiveIntensity*=NEON_INTENSITY_BOOST;
          materials.set(source,material);
        }
        return materials.get(source);
      };
      object.material=Array.isArray(object.material)?object.material.map(boost):boost(object.material);
    });
  }
  const scale=definition.visualScale??1;model.scale.setScalar(scale);
  if(definition.centeredWall){
    const bounds=new THREE.Box3().setFromObject(gltf.scene),center=bounds.getCenter(new THREE.Vector3());
    gltf.scene.position.set(-center.x,-bounds.min.y,-center.z);
  }else if(definition.modelOffset){
    gltf.scene.position.add(new THREE.Vector3(...definition.modelOffset));
  }else if(definition.kind==='wall'){
    // Editor wall items are centered in depth and positioned at their bottom.
    // Supplied shelves use the middle of the rear face as the origin.
    gltf.scene.position.y+=definition.height/(2*scale);
    gltf.scene.position.z-=definition.depth/(2*scale);
  }else{
    // Some upholstered backs offset the exported bounds from the stated origin.
    // Center the real footprint so selection and collision follow the mesh.
    const bounds=new THREE.Box3().setFromObject(gltf.scene),center=bounds.getCenter(new THREE.Vector3());
    gltf.scene.position.x-=center.x;gltf.scene.position.z-=center.z;gltf.scene.position.y-=bounds.min.y;
  }
  model.add(gltf.scene);model.userData={...definition,itemId:definition.id};return model;
}

export function createImportedAnimation(gltf){
  if(!gltf.animations?.length)return null;
  const mixer=new THREE.AnimationMixer(gltf.scene);
  for(const clip of gltf.animations)mixer.clipAction(clip).setLoop(THREE.LoopRepeat,Infinity).play();
  return mixer;
}
