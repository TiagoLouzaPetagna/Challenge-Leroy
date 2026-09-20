import {TYPES,TRACK} from './conveyor-engine.js';
export const WORLD={width:1672,height:941};
export const MOUTH={x:1140,y:315,width:205,height:145};
export const MOUTH_LIP={x:1172,y:380};
const BODY={x:1110,y:192,w:470,h:556};
// The mouth receives files; the belly cutter only emits the strips.
export const CUTTER={x:1220,y:626,width:208,height:70};
const makeCanvas=(w,h)=>Object.assign(document.createElement('canvas'),{width:w,height:h});
const load=src=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error(`Falha ao carregar ${src}`));img.src=src;});

// Chroma-key and atlas rectangles are technical masks, not replacement artwork.
function keyedAtlas(image,cols,rows){
  const source=makeCanvas(image.width,image.height),ctx=source.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
  const pixels=ctx.getImageData(0,0,source.width,source.height),d=pixels.data;
  for(let i=0;i<d.length;i+=4){const spill=Math.min(d[i],d[i+2])-d[i+1],magenta=Math.abs(d[i]-d[i+2])<Math.max(30,(d[i]+d[i+2])*.22);if(magenta&&spill>18){d[i+3]=0;}else if(magenta&&spill>5){d[i]=d[i+1];d[i+2]=d[i+1];}}
  ctx.putImageData(pixels,0,0);
  return Array.from({length:cols*rows},(_,index)=>{
    const x0=Math.round((index%cols)*image.width/cols),x1=Math.round((index%cols+1)*image.width/cols),y0=Math.round(Math.floor(index/cols)*image.height/rows),y1=Math.round((Math.floor(index/cols)+1)*image.height/rows);
    let left=x1,top=y1,right=x0,bottom=y0;
    for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)if(d[(y*image.width+x)*4+3]>128){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
    if(right<=left)throw new Error('Sprite vazio no atlas');
    const out=makeCanvas(right-left+1,bottom-top+1);out.getContext('2d').drawImage(source,left,top,out.width,out.height,0,0,out.width,out.height);return out;
  });
}
function labelFrom(file){
  const w=Math.round(file.width*.83),h=Math.round(file.height*.31),out=makeCanvas(w,h),ctx=out.getContext('2d',{willReadFrequently:true});
  ctx.drawImage(file,file.width*.08,file.height*.405,w,h,0,0,w,h);
  const p=ctx.getImageData(0,0,w,h);
  for(let i=0;i<p.data.length;i+=4){const lum=Math.max(p.data[i],p.data[i+1],p.data[i+2]);p.data[i+3]=Math.round(Math.max(0,Math.min(1,(170-lum)/80))*p.data[i+3]);p.data[i]=p.data[i+1]=p.data[i+2]=12;}
  ctx.putImageData(p,0,0);return out;
}

const ART_TYPES=['PDF','EXE','JPG','BAT','DOCX','JS'];
const VARIANT_BASE={XLS:'DOCX',PNG:'JPG',TXT:'PDF',CMD:'BAT',VBS:'JS',SCR:'EXE'};
function relabelFile(base,type){
  const out=makeCanvas(base.width,base.height),ctx=out.getContext('2d');
  ctx.drawImage(base,0,0);
  // Borrow unlettered paper from the same drawing to preserve its color and grain.
  ctx.drawImage(base,base.width*.16,base.height*.77,base.width*.66,base.height*.10,
    base.width*.105,base.height*.395,base.width*.79,base.height*.32);
  const label=`.${type}`;
  ctx.fillStyle='#11100e';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font=`${Math.round(base.height*.245)}px ConveyorLetters`;
  ctx.fillText(label,base.width*.5,base.height*.56,base.width*.79);
  return out;
}

export class ConveyorArt{
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.time=0;this.feeds=[];this.scraps=[];this.reaction=null;this.drag=null;this.selected=null;this.returning=null;this.ready=false;}
  async load(){
    const [scenery,files,clerk,commands]=await Promise.all(['scenery.png','files-source.png','clerk-mouth-cutter-source.png','commands-source.png'].map(f=>load(`assets/conveyor/${f}`)));
    const letters=new FontFace('ConveyorLetters','url(assets/fonts/MPLUSRounded1c-ExtraBold.ttf)');
    await letters.load();document.fonts.add(letters);
    this.scenery=scenery;this.files=keyedAtlas(files,3,2);
    this.paperByType=Object.fromEntries(ART_TYPES.map((type,index)=>[type,this.files[index]]));
    for(const [type,base] of Object.entries(VARIANT_BASE))this.paperByType[type]=relabelFile(this.paperByType[base],type);
    this.labels=Object.fromEntries(TYPES.map(type=>[type,labelFrom(this.paperByType[type])]));
    this.clerk=keyedAtlas(clerk,3,1);this.commands=keyedAtlas(commands,1,5);this.ready=true;
  }
  reset(){this.time=0;this.feeds=[];this.scraps=[];this.reaction=null;this.drag=null;this.selected=null;this.returning=null;this.message=null;}
  point(clientX,clientY){const r=this.canvas.getBoundingClientRect();return {x:(clientX-r.left)/r.width*WORLD.width,y:(clientY-r.top)/r.height*WORLD.height};}
  hitMouth(p){return p.x>=MOUTH.x&&p.x<=MOUTH.x+MOUTH.width&&p.y>=MOUTH.y&&p.y<=MOUTH.y+MOUTH.height;}
  hitFile(p,files){return [...files].reverse().find(f=>f.x>65&&f.x<1590&&Math.abs(p.x-f.x)<TRACK.width*.56&&Math.abs(p.y-TRACK.y)<TRACK.height*.58);}
  decide(event){
    // The engine removes the delivered file immediately; no flight sprite is created.
    if(event.delivered)this.feeds.push({age:0,emitted:false});
    if(event.delivered||!event.correct)this.reaction={pose:event.correct?0:2,ttl:1350};
    if(!event.correct)this.message={index:event.delivered?3:4,ttl:1200};
  }
  update(ms,reduced){
    this.time+=ms;
    if(this.reaction){this.reaction.ttl-=ms;if(this.reaction.ttl<=0)this.reaction=null;}
    for(const feed of this.feeds){
      feed.age+=ms;
      if(!feed.emitted&&feed.age>=430){feed.emitted=true;
        for(let i=0;i<(reduced?3:7);i++)this.scraps.push({age:0,x:CUTTER.x+18+i*(reduced?66:27),dx:reduced?0:(i-3)*9,turn:reduced?0:(i-3)*.035});
      }
    }
    this.feeds=this.feeds.filter(f=>f.age<1100);
    for(const scrap of this.scraps)scrap.age+=ms;this.scraps=this.scraps.filter(s=>s.age<650);
    if(this.message){this.message.ttl-=ms;if(this.message.ttl<=0)this.message=null;}
    if(this.returning){this.returning.age+=ms;if(this.returning.age>180)this.returning=null;}
  }
  paper(type,x,y,width=TRACK.width,height=TRACK.height,rotation=0){
    const ctx=this.ctx;ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.drawImage(this.paperByType[type],-width/2,-height/2,width,height);ctx.restore();
  }
  plateCrop(sx,sy,w,h,dx=sx,dy=sy,dw=w,dh=h){const s=this.scenery;this.ctx.drawImage(s,sx/WORLD.width*s.width,sy/WORLD.height*s.height,w/WORLD.width*s.width,h/WORLD.height*s.height,dx,dy,dw,dh);}
  draw(game,reduced=false){
    if(!this.ready)return;
    const ctx=this.ctx,canvas=this.canvas;ctx.setTransform(canvas.width/WORLD.width,0,0,canvas.height/WORLD.height,0,0);ctx.clearRect(0,0,WORLD.width,WORLD.height);ctx.drawImage(this.scenery,0,0,WORLD.width,WORLD.height);
    // Both tile edges fall in the blank space between dividers. Cropping at
    // x=645 cut through a slanted divider and repeated an incomplete line.
    const beltTile={x:270,width:440};
    const offset=(this.time*(game.rule?.speed||170)/1000)%beltTile.width;
    ctx.save();ctx.beginPath();ctx.rect(34,752,1604,43);ctx.clip();
    for(let x=34-beltTile.width+offset;x<1640;x+=beltTile.width)this.plateCrop(beltTile.x,752,beltTile.width,43,x,752);ctx.restore();
    const feed=this.feeds.at(-1);
    const opening=feed&&feed.age<300;
    const chewing=feed&&!reduced&&feed.age>=300&&feed.age<430;
    const pose=opening?1:chewing?(Math.floor(feed.age/65)%2):this.reaction?.pose||0;
    const actor=this.clerk[pose],body=BODY;
    ctx.drawImage(actor,body.x,body.y,body.w,body.h);
    if(feed&&feed.age>=430&&feed.age<900&&!reduced){
      ctx.save();ctx.beginPath();ctx.rect(CUTTER.x+4,CUTTER.y+25,CUTTER.width-8,32);ctx.clip();
      const shift=Math.floor(feed.age/65)%2?5:0;ctx.drawImage(actor,body.x+shift,body.y,body.w,body.h);ctx.restore();
    }
    if(game.rule){game.rule.blocked.forEach((type,i)=>{const label=this.labels[type];ctx.drawImage(label,110+i*266,263,225,90);});}
    // The visible track includes both dark tunnel apertures, but excludes the
    // exterior wall. Follow the slanted roofs, but leave the bottom open so
    // the mask never trims sheets resting on the moving belt.
    ctx.save();ctx.beginPath();
    ctx.moveTo(105,0);ctx.lineTo(1578,0);
    ctx.lineTo(1578,584);ctx.lineTo(1594,584);ctx.lineTo(1636,612);
    ctx.lineTo(1636,WORLD.height);ctx.lineTo(36,WORLD.height);
    ctx.lineTo(36,612);ctx.lineTo(88,584);ctx.lineTo(105,584);
    ctx.closePath();ctx.clip();
    for(const file of game.files){
      if(this.drag?.id===file.id||this.returning?.id===file.id)continue;
      let x=file.x,y=TRACK.y;
      const selected=file.id===this.selected;this.paper(file.type,x,y-(selected?9:0),TRACK.width*(selected?1.04:1),TRACK.height*(selected?1.04:1));
    }
    ctx.restore();
    for(const scrap of this.scraps){
      const t=scrap.age/650;ctx.save();ctx.translate(scrap.x+scrap.dx*t,CUTTER.y+CUTTER.height-4+100*t);ctx.rotate(scrap.turn+(reduced?0:t*.35));ctx.globalAlpha=1-t;
      const paper=this.files[0];ctx.drawImage(paper,paper.width*.06,paper.height*.14,paper.width*.07,paper.height*.5,-5,0,10,42);ctx.restore();
    }
    // A released paper can travel back from anywhere on the stage; the conveyor
    // band must not cut its return animation off above the belt.
    if(this.returning){const file=game.files.find(f=>f.id===this.returning.id);if(file){const t=Math.min(1,this.returning.age/180);this.paper(file.type,this.returning.from.x+(file.x-this.returning.from.x)*t,this.returning.from.y+(TRACK.y-this.returning.from.y)*t);}}
    if(this.drag){const file=game.files.find(f=>f.id===this.drag.id);if(file)this.paper(file.type,this.drag.x,this.drag.y,TRACK.width,TRACK.height,reduced?0:-.06);}
    const command=this.message?.index??(game.status==='intro'?(game.number===1?0:1):null);
    if(command!==null){const img=this.commands[command],w=Math.min(800,img.width*.65),h=w*img.height/img.width;ctx.drawImage(img,500-w/2,450,w,h);}
  }
}
