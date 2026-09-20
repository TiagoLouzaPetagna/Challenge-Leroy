// Only scenery is extended. Actors and input stay in their original canvas.
export async function createStageBackdrop(canvas,workroom,kind){
 const path=kind==='conveyor'?'assets/conveyor/scenery.png':'assets/popups/background.png';
 const image=await new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('Falha ao carregar cenário expandido.'));im.src=path;});
 const ctx=canvas.getContext('2d'),stage=canvas.parentElement;
 const crop=(x,y,w,h,...dest)=>ctx.drawImage(image,x/1672*image.width,y/941*image.height,w/1672*image.width,h/941*image.height,...dest);
 function draw(){
  const r=stage.getBoundingClientRect(),s=workroom.getBoundingClientRect();
  const w=r.width,h=r.height,left=s.left-r.left,top=s.top-r.top,scale=s.width/1672;
  const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  if(kind==='conveyor'){
   crop(660,30,410,480,0,0,w,h);
   for(const x of [69,1597]){
    crop(x,12,10,110,left+x*scale,0,10*scale,top);
    const bottom=top+s.height;
    if(bottom<h)crop(x,917,10,24,left+x*scale,bottom,10*scale,h-bottom);
   }
  }else{
   crop(520,6,1000,27,0,0,w,h);
   // Three-slice taskbar: original icons and text retain their proportions.
   const barH=40,k=barH/61,y=h-barH,leftW=520*k,rightW=260*k;
   crop(520,880,892,61,leftW,y,Math.max(1,w-leftW-rightW),barH);
   crop(0,880,520,61,0,y,leftW,barH);
   crop(1412,880,260,61,w-rightW,y,rightW,barH);
  }
 }
 const observer=new ResizeObserver(draw);observer.observe(stage);observer.observe(workroom);draw();
 return {draw,disconnect:()=>observer.disconnect()};
}
