import * as THREE from 'three';
import {SYMBOLS,COLORS} from './engine.mjs';

export async function createUsbIcons(){
 const masks=await Promise.all(SYMBOLS.map(async(symbol,index)=>{
  const c=document.createElement('canvas');c.width=c.height=128;
  const x=c.getContext('2d');x.fillStyle='#efe6bd';x.strokeStyle='#efe6bd';x.lineWidth=7;x.lineJoin='round';x.lineCap='round';
  if(index<3){
   const img=new Image();img.src=`assets/selo_${symbol.model}.png`;await img.decode();x.drawImage(img,0,0,128,128);
   const data=x.getImageData(0,0,128,128);
   for(let i=0;i<data.data.length;i+=4){const d=data.data;d[i+3]=Math.min(d[i],d[i+1],d[i+2])>125?255:0;d[i]=239;d[i+1]=230;d[i+2]=189;}
   x.putImageData(data,0,0);
  }else{
   x.beginPath();
   if(index===3){x.moveTo(64,99);x.bezierCurveTo(5,63,23,22,49,35);x.lineTo(64,49);x.bezierCurveTo(96,3,145,52,64,99);x.fill();}
   if(index===4){for(const [i,p] of [[75,24],[40,69],[63,69],[51,107],[93,57],[69,57]].entries())i?x.lineTo(...p):x.moveTo(...p);x.closePath();x.fill();}
   if(index===5){x.arc(64,64,37,0,Math.PI*2);x.fill();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(82,49,34,0,Math.PI*2);x.fill();}
   if(index===6){x.moveTo(20,64);x.quadraticCurveTo(64,14,108,64);x.quadraticCurveTo(64,114,20,64);x.stroke();x.beginPath();x.arc(64,64,14,0,Math.PI*2);x.fill();}
   if(index===7){for(let i=0;i<5;i++){const a=i*Math.PI*2/5;x.beginPath();x.ellipse(64+23*Math.sin(a),64+23*Math.cos(a),13,19,-a,0,Math.PI*2);x.fill();}x.globalCompositeOperation='destination-out';x.beginPath();x.arc(64,64,9,0,Math.PI*2);x.fill();}
  }
  return c;
 }));
 const palette=['#a74735','#69417e','#a98a30'];
 const textures=COLORS.map((_,color)=>masks.map(mask=>{
  const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle=palette[color];x.fillRect(0,0,128,128);
  // Small deterministic patches preserve the worn, low resolution finish.
  for(let i=0;i<800;i++){x.fillStyle=i%2?'#ffffff0b':'#0000000c';x.fillRect((i*73)%128,(i*47+Math.floor(i/128)*11)%128,3,3);}
  x.drawImage(mask,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.flipY=false;t.magFilter=THREE.NearestFilter;return t;
 }));
 return {textures,previews:masks.map(c=>c.toDataURL())};
}
