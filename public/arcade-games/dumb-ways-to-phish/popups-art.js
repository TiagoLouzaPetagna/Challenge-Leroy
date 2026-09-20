import {SIZE,closeRect} from './popups-engine.js';
const load=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error(`Imagem indisponível: ${src}`));im.src=src;});
const surface=(w,h)=>Object.assign(document.createElement('canvas'),{width:w,height:h});
function extract(image){
 const source=surface(image.width,image.height),ctx=source.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
 const px=ctx.getImageData(0,0,image.width,image.height),d=px.data;
 for(let i=0;i<d.length;i+=4)if(d[i]>180&&d[i+1]<90&&d[i+2]>180)d[i+3]=0;
 ctx.putImageData(px,0,0);
 return Array.from({length:3},(_,col)=>{
  let l=image.width,t=image.height,r=0,b=0;
  for(let y=0;y<image.height;y++)for(let x=Math.floor(col*image.width/3);x<Math.floor((col+1)*image.width/3);x++)if(d[(y*image.width+x)*4+3]>128){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);}
  const sprite=surface(r-l+1,b-t+1);sprite.getContext('2d').drawImage(source,l,t,sprite.width,sprite.height,0,0,sprite.width,sprite.height);
  // Keep the window chrome and its illustrated contents as separate pieces.
  const split=Math.round(sprite.height*.108),header=surface(sprite.width,split),body=surface(sprite.width,sprite.height-split);
  header.getContext('2d').drawImage(sprite,0,0,sprite.width,split,0,0,sprite.width,split);
  body.getContext('2d').drawImage(sprite,0,split,sprite.width,sprite.height-split,0,0,body.width,body.height);
  return {header,body,split:split/sprite.height};
 });
}
export class PopupArt{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.ghosts=[];this.focus=null;}
 async load(){const [bg,atlas]=await Promise.all(['background.png','windows-source.png'].map(f=>load(`assets/popups/${f}`)));this.bg=bg;this.parts=extract(atlas);this.ready=true;}
 reset(){this.ghosts=[];this.focus=null;}
 point(e){const r=this.canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*SIZE.w/r.width,y:(e.clientY-r.top)*SIZE.h/r.height};}
 update(ms){for(const g of this.ghosts)g.fade+=ms;this.ghosts=this.ghosts.filter(g=>g.fade<160);}
 window(win,reduced,fade=0){
  const ctx=this.ctx,part=this.parts[win.type];let scale=1;
  if(!reduced){if(fade)scale=1-fade/160*.12;else if(win.age<180){const t=win.age/180;scale=.91+.09*t+.035*Math.sin(t*Math.PI);}}
  ctx.save();ctx.globalAlpha=fade?1-fade/160:1;ctx.translate(win.x+win.w/2,win.y+win.h/2);ctx.scale(scale,scale);
  ctx.drawImage(part.header,-win.w/2,-win.h/2,win.w,win.h*part.split);
  ctx.drawImage(part.body,-win.w/2,-win.h/2+win.h*part.split,win.w,win.h*(1-part.split));
  ctx.restore();
 }
 draw(game,reduced){if(!this.ready)return;const ctx=this.ctx;ctx.setTransform(this.canvas.width/SIZE.w,0,0,this.canvas.height/SIZE.h,0,0);ctx.clearRect(0,0,SIZE.w,SIZE.h);
  // The taskbar now belongs to the full desktop, not this browser window.
  ctx.drawImage(this.bg,0,0,this.bg.width,this.bg.height*882/SIZE.h,0,0,SIZE.w,882);
  for(const win of game.windows)this.window(win,reduced);
  for(const g of this.ghosts)this.window(g.window,reduced,g.fade);
  const focused=game.windows.find(w=>w.id===this.focus);if(focused){const r=closeRect(focused);ctx.save();ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.setLineDash([6,4]);ctx.strokeRect(r.x-3,r.y-3,r.w+6,r.h+6);ctx.restore();}
 }
}
