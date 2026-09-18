import * as THREE from 'three';
import {mergeGeometries} from './vendor/BufferGeometryUtils.js';
import {CELL,floorMats,planBounds} from './floor-plan.js';
import {WALL_HEIGHT,WINDOW} from './wall-model.js';
import {partitionParts} from './room-plan.js';
import {FINISHES} from './finish-preference.js';
import {CUT_HEIGHT,visibilitySections,sectionIsLow,supportsAttachment} from './wall-visibility.js';

function batches(group,pieces) {
  for(const [material,geometries] of pieces) {
    const geometry=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());
    const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  }
}
function append(pieces,material,geometry) {
  if(!pieces.has(material))pieces.set(material,[]);pieces.get(material).push(geometry);
}
function clearMeshes(group) {
  for(const child of [...group.children])if(child.isMesh){child.geometry.dispose();group.remove(child);}
}
export class RoomStructure {
  constructor(room,kit,finishes=null) {
    this.defaultRoom=Boolean(kit.getObjectByName('DefaultRoomMaterial'));
    this.crafted=Boolean(kit.getObjectByName('BaseboardProfile'));this.profiles=new Map();
    this.floor=new THREE.Group();this.floor.name='Piso editável';
    this.walls=new THREE.Group();this.walls.name='Paredes editáveis';this.materials=new Map();
    this.wallMaterialVariants=new Map();
    this.sections=[];this.context=new THREE.Group();this.contextMaterial=new THREE.MeshBasicMaterial({color:0xdce5d2,transparent:true,opacity:.45,depthWrite:false});
    this.guides=new THREE.Group();this.guides.visible=false;
    this.guideMaterials=[0x85a774,0xc6a66d,0x8facc1,0xb094b0,0xc68a79,0x8eafa4,0xafb16c,0x96a0c0].map(color=>new THREE.MeshBasicMaterial({color,transparent:true,opacity:.24,depthWrite:false,side:THREE.DoubleSide}));
    this.lineMaterial=new THREE.MeshBasicMaterial({color:0x46634b,depthWrite:false});
    room.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])this.materials.set(m.name,m);});
    if(finishes)finishes.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material]){
      if(m.name==='Cal mineral')this.materials.set('Japones-1',m);
      if(m.name==='Madeira estrutural')this.materials.set('Japones-3',m);
    }});
    room.getObjectByName('Piso').visible=false;room.getObjectByName('PisoMadeira').visible=false;
    const original=room.getObjectByName('Paredes');original.visible=false;
    const originalWindow=room.getObjectByName('Janela');
    this.window=finishes?.getObjectByName('Janela')??originalWindow;
    if(this.window!==originalWindow)originalWindow.visible=false;
    this.walls.add(this.window);
    kit.updateMatrixWorld(true);this.templates=new Map();
    if(this.crafted)for(const name of ['BaseboardProfile','CrownProfile','SlatProfile','PostProfile','DoorJambProfile','DoorHeadProfile']){
      const root=kit.getObjectByName(name);if(!root)throw Error('Perfil ausente: '+name);
      root.traverse(o=>{if(o.isMesh)this.profiles.set(name,o.geometry.clone().applyMatrix4(o.matrixWorld));});
    }
    const names=this.defaultRoom?Array.from({length:25},(_,i)=>`WoodCell${i%5}_${Math.floor(i/5)}`):['FloorBase','MatSquare','MatSquareTurn','MatWide','MatLong'];
    for(const name of names) {
      const parts=[];kit.getObjectByName(name).traverse(o=>{if(o.isMesh)parts.push({geometry:o.geometry.clone().applyMatrix4(o.matrixWorld),material:o.material});});
      this.templates.set(name,parts);
    }
  }
  installThemes(states,fallback) {
    this.themeFallback=fallback;this.themeLibrary=new Map();
    for(const [theme,state] of states){
      const snapshot={};for(const key of ['defaultRoom','crafted','profiles','templates','materials','neonMaterials','window'])snapshot[key]=state[key];
      this.themeLibrary.set(theme,snapshot);this.walls.add(snapshot.window);snapshot.window.visible=false;
    }
  }
  useOwner(id) {
    if(!this.themeLibrary)return;
    this.activeTheme=this.roomThemes?.get(id)??this.themeFallback;
    Object.assign(this,this.themeLibrary.get(this.activeTheme));
  }
  wallMaterial(source,axis,role) {
    // End caps, doorway linings and cut-wall tops can share a depth plane.
    // Give their finishes a stable depth tie-break without moving geometry or
    // changing shared floor/furniture materials. Depth testing remains enabled.
    const theme=Math.max(0,FINISHES.indexOf(this.activeTheme??this.themeFallback));
    const rank=1+role*16+theme*2+(axis==='z'?1:0);
    let variants=this.wallMaterialVariants.get(source);
    if(!variants)this.wallMaterialVariants.set(source,variants=new Map());
    if(!variants.has(rank)){
      const material=source.clone();material.polygonOffset=true;
      material.polygonOffsetFactor=0;material.polygonOffsetUnits=-2*rank;
      variants.set(rank,material);
    }
    return variants.get(rank);
  }
  update(cells,layout) {
    const key=JSON.stringify([cells,layout?.rooms?.map(r=>[r.id,r.theme,r.cells]),layout?.openings]);if(this.key===key)return false;this.key=key;
    this.roomThemes=new Map((layout?.rooms??[]).map(r=>[r.id,r.theme??this.themeFallback]));
    clearMeshes(this.floor);const floors=new Map();
    for(const section of this.sections)for(const group of [section.full,section.low]){clearMeshes(group);this.walls.remove(group);}
    this.sections=visibilitySections(layout);clearMeshes(this.context);
    for(const section of this.sections){section.full=new THREE.Group();section.low=new THREE.Group();section.fullPieces=new Map();section.lowPieces=new Map();this.walls.add(section.full,section.low);}
    let currentSection;
    clearMeshes(this.guides);const guides=new Map();
    const stamp=(name,x,z)=>{const transform=new THREE.Matrix4().makeTranslation(x,0,z);for(const part of this.templates.get(name))append(floors,part.material,part.geometry.clone().applyMatrix4(transform));};
    const rooms=layout?.rooms??[{cells}];
    rooms.forEach((room,i)=>{
      this.useOwner(room.id);
    for(const [x,z] of room.cells)stamp(this.defaultRoom?`WoodCell${((x%5)+5)%5}_${((z%5)+5)%5}`:'FloorBase',(x+.5)*CELL,(z+.5)*CELL);

      if(!this.defaultRoom)for(const mat of floorMats(room.cells))stamp(mat.width>CELL?'MatWide':mat.depth>CELL?'MatLong':mat.turned?'MatSquareTurn':'MatSquare',mat.x,mat.z);
      for(const [x,z] of room.cells)append(guides,this.guideMaterials[i],new THREE.PlaneGeometry(CELL,CELL).rotateX(-Math.PI/2).translate((x+.5)*CELL,.058,(z+.5)*CELL));
      const cover=new Map();for(const [x,z] of room.cells)append(cover,this.contextMaterial,new THREE.PlaneGeometry(CELL,CELL).rotateX(-Math.PI/2).translate((x+.5)*CELL,.059,(z+.5)*CELL));
      const group=new THREE.Group();batches(group,cover);for(const mesh of [...group.children]){mesh.userData.room=room.id;mesh.castShadow=false;mesh.receiveShadow=false;this.context.add(mesh);}
    });
    batches(this.floor,floors);
    const box=(x,y,z,w,h,d,material,wallAxis=null,profile=null,profileAxis=null)=>{
      for(const [pieces,ceiling] of [[currentSection.fullPieces,Infinity],[currentSection.lowPieces,CUT_HEIGHT]]) {
      const bottom=y-h/2,top=Math.min(y+h/2,ceiling);if(top<=bottom)continue;
      const originalY=y,originalH=h;y=(bottom+top)/2;h=top-bottom;
      const template=this.crafted&&profile?this.profiles.get(profile):null;
      // Profiles are straight extrusions: shortening a low wall preserves its
      // cross-section, caps and physical UV density without distorting a bevel.
      const g=template?template.clone().rotateY(profileAxis==='x'?Math.PI/2:0).scale(w,h,d):new THREE.BoxGeometry(w,h,d);
      const p=g.attributes.position,n=g.attributes.normal,uv=g.attributes.uv;
      for(let i=0;i<p.count;i++) {
        if(wallAxis)uv.setXY(i,(wallAxis==='x'?-(p.getZ(i)+z):p.getX(i)+x)/1.6,(p.getY(i)+y)/1.37);
        else if(template){
          const vertical=['SlatProfile','PostProfile','DoorJambProfile'].includes(profile);
          const across=vertical?(Math.abs(n.getX(i))>.5?p.getZ(i)+z:p.getX(i)+x):Math.abs(n.getY(i))>.5?(profileAxis==='x'?p.getX(i)+x:p.getZ(i)+z):p.getY(i)+y;
          const along=vertical?p.getY(i)+y:profileAxis==='x'?p.getZ(i)+z:p.getX(i)+x;
          uv.setXY(i,across/.22,along/1.1);
        }
        else if(Math.abs(n.getY(i))>.5)uv.setXY(i,p.getX(i)/w+.5,-p.getZ(i)/d+.5);
        else if(Math.abs(n.getZ(i))>.5)uv.setXY(i,p.getX(i)/w+.5,p.getY(i)/h+.5);
        else uv.setXY(i,-p.getZ(i)/d+.5,p.getY(i)/h+.5);
      }
      const role=profile?1:wallAxis?0:2;
      append(pieces,this.wallMaterial(material,currentSection.axis,role),g.translate(x,y,z));y=originalY;h=originalH;
      }
    };

    for(const wall of this.sections.filter(s=>!s.internal)) {
      currentSection=wall;this.useOwner(wall.positive??wall.negative);
      const plaster=this.materials.get('Japones-1'),trim=this.materials.get('Japones-3');
      const {axis,line,from,to}=wall;
      const piece=(a,b,bottom,top)=>{if(b<=a||top<=bottom)return;box(axis==='x'?line:(a+b)/2,(bottom+top)/2,axis==='x'?(a+b)/2:line,axis==='x'?.064:b-a,top-bottom,axis==='x'?b-a:.064,plaster,axis);};
      if(!this.defaultRoom&&wall.id===WINDOW.wall&&from<=2.22&&to>=3.52) {
        piece(from,2.22,0,WALL_HEIGHT);piece(3.52,to,0,WALL_HEIGHT);
        piece(2.22,3.52,0,WINDOW.bottom+.05);piece(2.22,3.52,WINDOW.top-.05,WALL_HEIGHT);
      }else piece(from,to,0,WALL_HEIGHT);
      for(const [y,h,profile] of [[WALL_HEIGHT+.018,.075,'CrownProfile'],[.048,.096,'BaseboardProfile']])box(axis==='x'?line:(from+to)/2,y,axis==='x'?(from+to)/2:line,axis==='x'?.084:to-from+.024,h,axis==='x'?to-from+.024:.084,trim,null,profile,axis);
      if(!this.defaultRoom&&axis==='z')for(let a=from+.072;a<to;a+=.192)box(a,WALL_HEIGHT/2,line+wall.normal*.04,.0192,WALL_HEIGHT-.05,.0188,trim,null,'SlatProfile',axis);
    }
    for(const section of this.sections.filter(s=>s.internal))for(const edge of section.edges)for(const side of this.themeLibrary?[-1,1]:[0]) {
      currentSection=section;this.useOwner(side===1?section.positive:section.negative);
      const plaster=this.materials.get('Japones-1'),trim=this.materials.get('Japones-3');
      const {axis,line,from,to}=edge;
      const bar=(a,b,bottom,top,depth,material,profile=null)=>box(axis==='x'?line+side*depth/4:(a+b)/2,(bottom+top)/2,axis==='x'?(a+b)/2:line+side*depth/4,axis==='x'?depth/(side?2:1):b-a,top-bottom,axis==='x'?b-a:depth/(side?2:1),material,material===plaster?axis:null,profile,axis);
      for(const part of partitionParts(edge,WALL_HEIGHT)) {
        bar(part.from,part.to,part.bottom,part.top,.064,plaster);
        if(part.bottom===0) {
          bar(part.from,part.to,0,.096,.084,trim,'BaseboardProfile');
          if(side!==1)append(guides,this.lineMaterial,new THREE.PlaneGeometry(axis==='x'?.06:part.to-part.from,axis==='x'?part.to-part.from:.06).rotateX(-Math.PI/2).translate(axis==='x'?line:(part.from+part.to)/2,.075,axis==='x'?(part.from+part.to)/2:line));
        }
        if(!this.defaultRoom&&axis==='z')for(let a=from+.072;a<to;a+=.192)if(a-.01>=part.from&&a+.01<=part.to)for(const sign of side?[side]:[-1,1])box(a,(part.bottom+part.top)/2,line+sign*.04,.0192,part.top-part.bottom-.05,.0188,trim,null,'SlatProfile',axis);
      }
      bar(from,to,WALL_HEIGHT-.019,WALL_HEIGHT+.055,.084,trim,'CrownProfile');
      if(edge.opening) {
        bar(from,from+.048,0,2.11,.11,trim,'DoorJambProfile');bar(to-.048,to,0,2.11,.11,trim,'DoorJambProfile');
        bar(from+.048,to-.048,2.06,2.11,.11,trim,'DoorHeadProfile');
      }
    }
    for(const section of this.sections){
      this.useOwner(section.positive??section.negative);if(!this.crafted||this.themeLibrary&&section.internal)continue;
      const trim=this.materials.get('Japones-3');
      currentSection=section;const {axis,line,from,to}=section;
      for(const along of [from+.013,to-.013])box(axis==='x'?line:along,(WALL_HEIGHT+.077)/2,axis==='x'?along:line,axis==='x'?.080:.026,WALL_HEIGHT-.115,axis==='x'?.026:.080,trim,null,'PostProfile',axis);
    }
    for(const section of this.sections) {
      currentSection=section;
      const {axis,line,from,to}=section;
      const edges=section.internal?section.edges:[section];
      for(const edge of edges)for(const part of section.internal?partitionParts(edge,WALL_HEIGHT):[{from,to,bottom:0,top:WALL_HEIGHT}]) {
        for(const sign of section.internal?[-1,1]:[section.normal]) {
          this.useOwner(sign===1?section.positive:section.negative);if(!this.neonMaterials)continue;
          const material=this.neonMaterials[axis==='x'?0:1],face=line+sign*.048;
          for(const y of [part.bottom===0?.108:part.bottom+.015,part.top-.018]) {
            box(axis==='x'?face:(part.from+part.to)/2,y,axis==='x'?(part.from+part.to)/2:face,axis==='x'?.009:part.to-part.from,.009,axis==='x'?part.to-part.from:.009,material);
          }
        }
      }
    }
    batches(this.guides,guides);this.guides.traverse(o=>{o.castShadow=false;o.receiveShadow=false;});
    for(const section of this.sections){batches(section.full,section.fullPieces);batches(section.low,section.lowPieces);delete section.fullPieces;delete section.lowPieces;}
    return true;
  }
  updateVisibility(options) {
    let changed=false;
    for(const section of this.sections) {
      const low=sectionIsLow(section,options,section.isLow);
      if(section.isLow!==low)changed=true;
      section.isLow=low;section.full.visible=!low;section.low.visible=low;
    }
    const windowWall=this.sections.find(s=>s.id===WINDOW.wall&&s.from<=WINDOW.from&&s.to>=WINDOW.to);
    if(this.themeLibrary){for(const state of this.themeLibrary.values())state.window.visible=false;this.useOwner(windowWall?.positive??windowWall?.negative);}
    this.window.visible=!this.defaultRoom&&Boolean(windowWall&&!windowWall.isLow);
    for(const mesh of this.context.children)mesh.visible=!options.building&&Boolean(options.room)&&mesh.userData.room!==options.room;
    return changed;
  }
  attachmentVisible(item,width=0) {
    const support=this.sections.filter(s=>supportsAttachment(s,item,width));
    return support.length>0&&support.every(s=>!s.isLow);
  }
}

export function constructionGrid(cells) {
  const b=planBounds(cells),points=[],margin=2*CELL;
  for(let x=b.minX-margin;x<=b.maxX+margin+.001;x+=CELL)points.push(new THREE.Vector3(x,.063,b.minZ-margin),new THREE.Vector3(x,.063,b.maxZ+margin));
  for(let z=b.minZ-margin;z<=b.maxZ+margin+.001;z+=CELL)points.push(new THREE.Vector3(b.minX-margin,.063,z),new THREE.Vector3(b.maxX+margin,.063,z));
  const grid=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x536c51,transparent:true,opacity:.28,depthWrite:false}));return grid;
}
