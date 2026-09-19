import * as THREE from 'three';

// A small studio environment supplies broad reflections without changing
// the furniture materials or the visible background. Generated once per page.
export function createShadowDetailLighting(renderer,scene) {
  const studio=new THREE.Scene();
  const shell=new THREE.Mesh(new THREE.BoxGeometry(20,16,20),new THREE.MeshBasicMaterial({color:new THREE.Color(.12,.14,.18),side:THREE.BackSide}));
  studio.add(shell);
  for(const [position,size,color] of [
    [[-5,5,5],[5,7],[2.5,2.7,3]],
    [[6,4,2],[4,6],[2.8,2.6,2.3]],
    [[0,7,-3],[7,5],[1.4,1.5,1.7]],
  ]) {
    const panel=new THREE.Mesh(new THREE.PlaneGeometry(...size),new THREE.MeshBasicMaterial({color:new THREE.Color(...color),side:THREE.DoubleSide}));
    panel.position.set(...position);panel.lookAt(0,0,0);studio.add(panel);
  }
  const pmrem=new THREE.PMREMGenerator(renderer);
  const environment=pmrem.fromScene(studio,.12);
  pmrem.dispose();studio.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});
  const bounce=new THREE.HemisphereLight(0xe8efff,0xc8bfba,.45);
  const softFill=new THREE.DirectionalLight(0xe5edff,.55);softFill.position.set(-4,5,7);
  // Non-shadowing fill represents bounced light; the main light retains shadows.
  scene.add(bounce,softFill);
  const originalEnvironment=scene.environment,originalIntensity=scene.environmentIntensity;
  let active=false;
  const floors=new Map();
  const updateFloors=()=>{for(const [material,original] of floors){
    material.envMap=active?environment.texture:original.map;
    material.envMapIntensity=active?.055:original.intensity;
    material.needsUpdate=true;
  }};
  return {
    bindFloor(structure){
      for(const parts of structure.templates.values())for(const {material} of parts){
        if(!floors.has(material))floors.set(material,{map:material.envMap,intensity:material.envMapIntensity});
      }
      updateFloors();
    },
    setEnabled(enabled){
      active=enabled;
      bounce.visible=softFill.visible=enabled;
      scene.environment=enabled?environment.texture:originalEnvironment;
      scene.environmentIntensity=enabled?.55:originalIntensity;
      updateFloors();
    },
    dispose(){environment.dispose();scene.remove(bounce,softFill);scene.environment=originalEnvironment;scene.environmentIntensity=originalIntensity;},
  };
}
