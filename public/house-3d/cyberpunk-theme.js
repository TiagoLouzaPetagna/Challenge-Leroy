import * as THREE from 'three';
import {NEON_INTENSITY_BOOST} from './neon-intensity.js';

export async function applyCyberpunkTheme(structure,theme) {
  if(theme!=='cyberpunk')return;
  const loader=new THREE.TextureLoader();
  const [wall,floor,normal]=await Promise.all(['grafite','metal_piso','micro_normal'].map(name=>loader.loadAsync(`./assets/cyberpunk-room/${name}.png`)));
  for(const texture of [wall,floor,normal])texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
  wall.colorSpace=floor.colorSpace=THREE.SRGBColorSpace;
  const metal=new THREE.MeshStandardMaterial({map:floor,normalMap:normal,normalScale:new THREE.Vector2(.2,.2),roughness:.72,metalness:.65});
  const graphite=new THREE.MeshStandardMaterial({map:wall,normalMap:normal,normalScale:new THREE.Vector2(.3,.3),roughness:.7,metalness:.12});
  const trim=new THREE.MeshStandardMaterial({color:0x303641,metalness:.7,roughness:.4});
  structure.materials.set('Japones-1',graphite);structure.materials.set('Japones-3',trim);
  structure.neonMaterials=[0x00cfff,0xff1680].map(color=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:3*NEON_INTENSITY_BOOST,roughness:.3}));
  structure.defaultRoom=true;structure.templates.forEach(parts=>parts.forEach(p=>p.geometry.dispose()));structure.templates.clear();
  for(let x=0;x<5;x++)for(let z=0;z<5;z++) {
    const slab=new THREE.BoxGeometry(.8,.095,.8).translate(0,.0025,0);
    const plate=new THREE.BoxGeometry(.795,.005,.795).translate(0,.0525,0),uv=plate.attributes.uv;
    for(let i=0;i<uv.count;i++)uv.setXY(i,(uv.getX(i)+x)*.8/1.5,(uv.getY(i)+z)*.8/1.5);
    structure.templates.set(`WoodCell${x}_${z}`,[{geometry:slab,material:trim},{geometry:plate,material:metal}]);
  }
  structure.theme=theme;structure.key=null;
}
