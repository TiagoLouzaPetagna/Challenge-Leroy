import * as THREE from 'three';

const THEMES={gothic:'colecao_gotica','dark-academia':'dark_academia'};

function materials(gltf){
  const found=new Map();
  gltf.scene.traverse(object=>{
    if(!object.isMesh)return;
    for(const material of Array.isArray(object.material)?object.material:[object.material]){
      if(material&&!found.has(material.name))found.set(material.name,material);
    }
  });
  return [...found.values()];
}

// The supplied room is a fixed 4 × 4 m set. Reuse its actual materials on
// the editor's modular cells and walls so built or resized rooms keep the theme.
export async function applyNewCollectionTheme(structure,theme,loader){
  const folder=THEMES[theme];
  if(!folder)return;
  const prefix=`./assets/new-collections/${folder}`;
  const [floorRoom,wallRoom]=await Promise.all([
    loader.loadAsync(`${prefix}/chao.glb`),
    loader.loadAsync(`${prefix}/parede_esquerda.glb`),
  ]);
  const floors=materials(floorRoom);
  const walls=materials(wallRoom);
  const plaster=walls.find(material=>/reboco|papel de parede/i.test(material.name))??walls[0];
  const trim=walls.find(material=>/arremate/i.test(material.name))??walls.at(-1);
  if(!floors.length||!plaster||!trim)throw Error(`Materiais ausentes no tema ${theme}`);
  for(const material of [...floors,plaster,trim]){
    for(const texture of [material.map,material.normalMap,material.roughnessMap]){
      if(texture)texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
    }
  }
  structure.materials.set('Japones-1',plaster);
  structure.materials.set('Japones-3',trim);
  structure.defaultRoom=true;
  for(const parts of structure.templates.values())for(const part of parts)part.geometry.dispose();
  structure.templates.clear();
  for(let x=0;x<5;x++)for(let z=0;z<5;z++){
    const geometry=new THREE.BoxGeometry(.8,.1,.8).translate(0,.005,0);
    const uv=geometry.attributes.uv;
    for(let i=0;i<uv.count;i++)uv.setXY(i,(uv.getX(i)+x)*.8/2,(uv.getY(i)+z)*.8/2);
    structure.templates.set(`WoodCell${x}_${z}`,[{geometry,material:floors[(x+z)%floors.length]}]);
  }
  structure.theme=theme;
  structure.key=null;
}
