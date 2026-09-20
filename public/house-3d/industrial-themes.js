import * as THREE from 'three';

export const INDUSTRIAL_THEMES = ['industrial', 'industrial-loft'];

function brickTexture() {
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1024;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#988577';ctx.fillRect(0,0,1024,1024);
  let seed=719;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
  for(let row=0;row<8;row++)for(let col=-1;col<5;col++) {
    const x=col*256+(row%2)*128,y=row*128,v=Math.floor(random()*18);
    ctx.fillStyle=`rgb(${163+v},${105+v},${73+v})`;ctx.fillRect(x+3,y+3,250,122);
    for(let i=0;i<900;i++){ctx.fillStyle=`rgba(75,45,25,${random()*.13})`;ctx.fillRect(x+4+random()*248,y+4+random()*120,2,2);}
  }
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;return texture;
}

// Adapt the two room finishes to the editable footprint, retaining its walls,
// openings and furniture collision rules rather than overlaying a fixed room.
export async function applyIndustrialTheme(structure,theme) {
  if(!INDUSTRIAL_THEMES.includes(theme))return;
  const loader=new THREE.TextureLoader();
  const [floor,wall,normal,roughness]=await Promise.all(['concrete_floor','concrete_wall','concrete_normal','concrete_roughness'].map(name=>loader.loadAsync(`./assets/industrial-themes/${name}.png`)));
  for(const texture of [floor,wall,normal,roughness])texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
  floor.colorSpace=wall.colorSpace=THREE.SRGBColorSpace;
  const concrete=new THREE.MeshStandardMaterial({map:floor,normalMap:normal,normalScale:new THREE.Vector2(.25,.25),roughnessMap:roughness,roughness:.9});
  const plaster=new THREE.MeshStandardMaterial({map:theme==='industrial-loft'?brickTexture():wall,normalMap:normal,normalScale:new THREE.Vector2(.2,.2),roughness:.9});
  const steel=new THREE.MeshStandardMaterial({color:0x292c2c,metalness:.65,roughness:.48});
  structure.materials.set('Japones-1',plaster);structure.materials.set('Japones-3',steel);
  structure.defaultRoom=true;
  for(const parts of structure.templates.values())for(const part of parts)part.geometry.dispose();
  structure.templates.clear();
  for(let x=0;x<5;x++)for(let z=0;z<5;z++) {
    const geometry=new THREE.BoxGeometry(.8,.1,.8).translate(0,.005,0);
    const uv=geometry.attributes.uv;
    for(let i=0;i<uv.count;i++)uv.setXY(i,(uv.getX(i)+x)*.8/2.9,(uv.getY(i)+z)*.8/2.9);
    structure.templates.set(`WoodCell${x}_${z}`,[{geometry,material:concrete}]);
  }
  structure.theme=theme;structure.key=null;
}
