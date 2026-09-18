import {colors} from './engine.js';
import {accessoryFrame} from './reactions.js';
export const idleFrames=[{ms:1100},{ms:700,breath:1},{ms:100,breath:1,blink:1},{ms:650,breath:1},{ms:900},{ms:100,blink:1}];
export const waveFrames=[{ms:160,wave:1},{ms:180,wave:2},{ms:200,wave:3},{ms:180,wave:2},{ms:200,wave:3},{ms:160,wave:1},{ms:550}];
export function layers(data,c,pose={}){
 const expression=pose.expression==='laugh'?'alegre':pose.expression==='sleep'?'sereno':c.face;
 const result=data.order.map(key=>{const image=new Uint8Array(48*64);if(key==='bottom'&&data.bottomHiddenByTop?.[c.top])return image;const variant=key==='body'?'base':key.startsWith('hair')?c.hair:key==='face'?[expression,c.eyeShape,c.nose].join(':'):c[key];for(const [x,y,w,index]of data.pieces[key][variant]){if(key.startsWith('hair')&&y<(data.hairClipY?.[c.accessory]||0))continue;for(let xx=x;xx<x+w;xx++){if((pose.blink||pose.expression==='surprise'||pose.expression==='sleep')&&key==='face'&&y>=23&&y<=26&&((xx>=17&&xx<=21)||(xx>=27&&xx<=31)))continue;if(key==='face'&&['surprise','sleep'].includes(pose.expression)&&y>=28&&y<=30&&xx>=21&&xx<=27)continue;if(pose.wave&&(key==='body'||(key==='top'&&c.top!=='capa'))&&((xx>=31&&xx<=35)||(pose.both&&xx>=12&&xx<=16))&&y>=36&&y<=46)continue;image[y*48+xx]=index;}}return image;});
 const face=result[data.order.indexOf('face')];if(pose.blink||pose.expression==='sleep'){const y=25;for(const x of [18,28]){for(let dx=0;dx<3;dx++)face[y*48+x+dx]=19;face[(y-1)*48+x-1]=2;}}
 if(pose.expression==='surprise'){for(const x of [18,28]){for(let y=23;y<=26;y++)for(let dx=0;dx<3;dx++)face[y*48+x+dx]=19;face[23*48+x]=21;face[26*48+x+1]=20;}for(let y=28;y<=30;y++)for(let x=23;x<=25;x++)face[y*48+x]=19;face[29*48+24]=21;}
 if(pose.expression==='sleep'){for(let x=23;x<=25;x++)face[29*48+x]=2;}
 if(Number.isInteger(pose.cosmeticPhase)){const at=data.order.indexOf('accessory');result[at]=accessoryFrame(result[at],c.accessory,pose.cosmeticPhase);}
 const gesture=new Uint8Array(48*64);const px=(x,y,c)=>{if(x>=0&&x<48&&y>=0&&y<64)gesture[y*48+x]=c;};const rect=(x,y,w,h,c)=>{for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)px(xx,yy,c);};const line=(x,y,x2,y2,c)=>{let dx=Math.abs(x2-x),dy=-Math.abs(y2-y),sx=x<x2?1:-1,sy=y<y2?1:-1,e=dx+dy;for(;;){px(x,y,c);if(x===x2&&y===y2)break;let ee=2*e;if(ee>=dy){e+=dy;x+=sx;}if(ee<=dx){e+=dx;y+=sy;}}};
 if(pose.wave){
  const mid=pose.wave===1;
  const poly=(points,color)=>{for(let y=0;y<48;y++){const xs=[];for(let i=0;i<points.length;i++){const [x1,y1]=points[i],[x2,y2]=points[(i+1)%points.length];if((y1<=y+.5&&y2>y+.5)||(y2<=y+.5&&y1>y+.5))xs.push(x1+(y+.5-y1)*(x2-x1)/(y2-y1));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2)for(let x=Math.ceil(xs[i]-.5);x<=Math.floor(xs[i+1]-.5);x++)px(x,y,color);}};
  const longSleeve=['jaqueta','moletom','sueter','gravata','armadura','pijama','capa'].includes(c.top);
  poly(mid?[[30,34],[33,34],[36,37],[39,37],[39,41],[34,43],[31,40]]:[[30,34],[33,34],[35,37],[36,33],[39,33],[38,40],[35,42],[31,39]],1);
  poly(mid?[[31,35],[33,35],[35,38],[38,38],[38,40],[34,41],[32,39]]:[[31,35],[33,35],[35,39],[37,35],[38,35],[37,39],[35,40],[32,38]],longSleeve?11:3);
  line(31,35,34,38,12);if(longSleeve){line(34,40,36,39,10);}else{line(32,37,34,39,4);}
  // Manga curta acompanha o ombro; mangas compridas cobrem o antebraço.
  if(!longSleeve){poly([[30,34],[33,34],[35,37],[33,39],[30,37]],11);line(31,35,33,37,12);}
  if(c.top==='sueter'){line(32,36,34,38,21);if(!mid)line(36,37,37,36,21);}
  if(c.top==='gravata')rect(36,mid?38:34,2,2,21);
  if(c.top==='armadura'){rect(31,34,4,3,10);line(31,34,34,34,12);px(33,36,25);}
  const hx=mid?36:35,hy=mid?36:29;
  const hand=pose.wave===3?['..OO.','.OLSO','OLSSO','.OSSO','..OO.']:['.OO.','OLSO','OLSO','OSSO','.OO.'];
  const ink={O:1,S:3,L:4};for(let y=0;y<hand.length;y++)for(let x=0;x<hand[y].length;x++)if(ink[hand[y][x]])px(hx+x,hy+y,ink[hand[y][x]]);
  if(!mid){rect(36,33,2,2,longSleeve?10:3);px(35,33,1);px(38,33,1);}
 }
 if(pose.both){const original=gesture.slice();for(let y=0;y<64;y++)for(let x=0;x<48;x++)if(original[y*48+x])gesture[y*48+47-x]=original[y*48+x];}
 if(pose.z){const x=39,y=pose.z===2?10:14;line(x,y,x+3,y,21);line(x+3,y,x,y+3,21);line(x,y+3,x+3,y+3,21);}
 result.push(gesture);
 if(pose.breath)return result.map(source=>{const moved=new Uint8Array(3072);for(let y=0;y<64;y++)for(let x=0;x<48;x++){const v=source[y*48+x];if(v)moved[(y+(y<44?1:0))*48+x]=v;}return moved;});
 return result;
}
export function animatedPixels(data,c,pose={}){const out=new Uint8ClampedArray(12288);const palette=colors(data,c).map((v,i)=>i?[parseInt(v.slice(0,2),16),parseInt(v.slice(2,4),16),parseInt(v.slice(4,6),16),255]:[0,0,0,0]);for(const layer of layers(data,c,pose))for(let i=0;i<layer.length;i++)if(layer[i])out.set(palette[layer[i]],i*4);return out;}
