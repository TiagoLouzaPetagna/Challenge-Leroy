export const reactionLabels={idle:'Respirar e piscar',wave:'Acenar',laugh:'Rir',surprise:'Surpresa',sleep:'Dormir',celebrate:'Comemorar'};
export const reactionFrames={
 laugh:[{ms:180,expression:'laugh'},{ms:180,expression:'laugh',breath:1},{ms:180,expression:'laugh'},{ms:180,expression:'laugh',breath:1},{ms:250,expression:'laugh'},{ms:400}],
 surprise:[{ms:120,blink:1},{ms:180,expression:'surprise',breath:1},{ms:700,expression:'surprise'},{ms:250,expression:'surprise',breath:1},{ms:400}],
 sleep:[{ms:400,expression:'sleep'},{ms:650,expression:'sleep',breath:1,z:1},{ms:700,expression:'sleep',breath:1,z:2},{ms:650,expression:'sleep',z:1}],
 celebrate:[{ms:160,expression:'laugh',wave:1,both:1},{ms:200,expression:'laugh',wave:2,both:1},{ms:220,expression:'laugh',wave:3,both:1,breath:1},{ms:200,expression:'laugh',wave:2,both:1},{ms:220,expression:'laugh',wave:3,both:1,breath:1},{ms:160,expression:'laugh',wave:1,both:1},{ms:400}]
};
Object.assign(reactionLabels,{wink:'Piscar um olho',nod:'Concordar',look:'Olhar ao redor',shiver:'Tremer de frio',yawn:'Bocejar',love:'Mandar carinho'});
Object.assign(reactionFrames,{
 wink:[{ms:180},{ms:450,expression:'piscadela'},{ms:180,expression:'piscadela',headDx:1},{ms:350}],
 nod:[{ms:200},{ms:180,headDy:1},{ms:180},{ms:180,headDy:1},{ms:400}],
 look:[{ms:200},{ms:400,headDx:-1,gaze:-1},{ms:200},{ms:400,headDx:1,gaze:1},{ms:350}],
 shiver:[{ms:200,expression:'preocupado'},...[-1,1,-1,1,-1,1].map(sway=>({ms:100,sway,expression:'preocupado'})),{ms:400}],
 yawn:[{ms:300,blink:1},{ms:400,expression:'yawn'},{ms:500,expression:'yawn',headDy:1},{ms:250,blink:1},{ms:350}],
 love:[{ms:250,expression:'timido'},{ms:350,expression:'timido',hearts:1},{ms:450,expression:'timido',hearts:2},{ms:350,expression:'timido',hearts:3},{ms:350}]
});
export const animatedAccessories=new Set(['helice','alien','polvo','nuvem','peixe','robo']);
// O polvo descansa ~2,8 s e faz dois movimentos curtos por ciclo.
export function cosmeticTiming(kind,time){const t=Math.max(0,time);if(kind!=='polvo')return {phase:Math.floor(t/120)%4,remaining:120-t%120};const at=t%3550;if(at<2830)return {phase:0,remaining:2830-at};const step=Math.floor((at-2830)/180);return {phase:[1,0,3,0][step],remaining:180-(at-2830)%180};}
export function accessoryFrame(source,kind,phase){const p=((phase||0)%4+4)%4;if(!p||!animatedAccessories.has(kind))return source;const out=new Uint8Array(source.length);const put=(x,y,v)=>{if(x>=0&&x<48&&y>=0&&y<64)out[y*48+x]=v;};const swing=[0,1,0,-1][p];
 if(['nuvem','peixe','robo'].includes(kind)){
  out.set(source);
  if(kind==='nuvem'){for(let y=14;y<23;y++)for(let x=12;x<36;x++)if([23,24].includes(out[y*48+x]))out[y*48+x]=0;for(const [x,offset]of [[17,0],[30,2]]){const y=15+(p*2+offset)%7;put(x,y,24);put(x,y+1,23);}}
  if(kind==='peixe'){const fish=[];for(let y=6;y<=13;y++)for(let x=16;x<=29;x++){const v=source[y*48+x];if([25,19,21].includes(v)){fish.push([x,y,v]);out[y*48+x]=23;}}for(const [x,y,v]of fish)put(x+swing,y,v);}
  if(kind==='robo'){if(p===1||p===3){put(21,8,22);put(27,8,22);put(21,9,24);put(27,9,24);}put(24,0,p===2?21:23);if(p===2){put(22,12,22);put(26,12,22);put(24,12,21);}}
 }else if(kind==='helice'){
  out.set(source);for(let y=0;y<6;y++)for(let x=10;x<40;x++)out[y*48+x]=0;
  for(let y=3;y<7;y++){put(23,y,1);put(24,y,25);put(25,y,1);}
  const tips=p===1?[[15,0],[33,5]]:p===2?[[22,0],[26,5]]:[[15,5],[33,0]];
  const line=(x,y,x2,y2,v)=>{let dx=Math.abs(x2-x),dy=-Math.abs(y2-y),sx=x<x2?1:-1,sy=y<y2?1:-1,e=dx+dy;for(;;){put(x,y,v);if(x===x2&&y===y2)break;const ee=2*e;if(ee>=dy){e+=dy;x+=sx;}if(ee<=dx){e+=dx;y+=sy;}}};
  for(let i=0;i<2;i++){const [x,y]=tips[i];line(24,2,x,y,1);line(24,3,x,y+1,1);line(24,4,x,y+2,1);line(24,3,x,y+1,i?24:23);}put(23,2,25);put(24,2,24);put(25,2,25);put(24,3,25);
 }else{
  for(let y=0;y<64;y++)for(let x=0;x<48;x++){const v=source[y*48+x];if(!v)continue;let dx=0;if(kind==='alien'&&y<8)dx=swing;if(kind==='polvo'&&y>=16&&y<=22&&[1,21,22,23,24].includes(v))dx=x<24?swing:-swing;put(x+dx,y,v);}
 }return out;
}
