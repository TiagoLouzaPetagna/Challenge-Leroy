// The room fills the viewport; gameplay remains in its original coordinate
// system. Only scenery is extended, so hit targets and actor proportions agree.
export async function createRoomBackdrop(canvas,workroom){
 const [room,wood]=await Promise.all(['room-extension','counter-extension'].map(name=>new Promise((resolve,reject)=>{
  const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Não foi possível carregar a extensão da sala.'));img.src='assets/link-animation/'+name+'.png';
 })));
 const ctx=canvas.getContext('2d'),stage=canvas.parentElement;
 function draw(){
  const bounds=stage.getBoundingClientRect(),scene=workroom.getBoundingClientRect();
  const w=bounds.width,h=bounds.height,top=scene.top-bounds.top,sh=scene.height;
  const ratio=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
  // Header extends the ceiling; the wall and counter share the gameplay's
  // horizontal levels even on very wide screens. Bottom space extends wood.
  ctx.drawImage(wood,0,0,wood.width,140,0,0,w,Math.max(1,top));
  const counter=sh*792/941;
  // Extend unadorned wall panels only: copying the whole room outside the
  // scene would duplicate its lamp, posters and parcels on wide monitors.
  ctx.drawImage(room,270,620,1000,150,0,top,w,counter);
  const fascia=sh*859/941;
  ctx.drawImage(room,0,783,room.width,76,0,top+counter,w,fascia-counter);
  ctx.drawImage(room,0,859,room.width,82,0,top+fascia,w,sh-fascia);
  const bottom=top+sh;
  if(bottom<h){
   const tileHeight=w*wood.height/wood.width;
   for(let y=bottom;y<h;y+=tileHeight)ctx.drawImage(wood,0,y,w,tileHeight);
  }
 }
 const observer=new ResizeObserver(draw);observer.observe(stage);observer.observe(workroom);draw();
 return {draw,disconnect:()=>observer.disconnect()};
}
