const W=1672,H=941;
const load=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('Não abriu '+src));image.src=src;});
const clamp=n=>Math.max(0,Math.min(1,n));
const ease=n=>1-Math.pow(1-clamp(n),3);
function pixels(image){const c=document.createElement('canvas');c.width=image.width;c.height=image.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(image,0,0);return x.getImageData(0,0,c.width,c.height);}
function bounds(data){let x0=data.width,y0=data.height,x1=0,y1=0;for(let y=0;y<data.height;y++)for(let x=0;x<data.width;x++)if(data.data[(y*data.width+x)*4+3]>30){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}return [x0,y0,x1-x0+1,y1-y0+1];}
export async function createThumbArt(canvas,button){
 const [phone,hand,mouth]=await Promise.all(['phone','hand','mouth'].map(name=>load('assets/thumb/'+name+'.png')));
 await document.fonts.load('40px ThumbHand');
 const ctx=canvas.getContext('2d'),handPixels=pixels(hand),mouthBox=bounds(pixels(mouth));
 const handW=900,handH=handW*hand.height/hand.width;let matrix=new DOMMatrix(),bleed=0,poseX=1085;
 function resize(){const room=canvas.parentElement.getBoundingClientRect(),scale=room.width/W;if(!scale)return;bleed=Math.ceil(Math.max(0,room.left)/scale);canvas.width=W+2*bleed;canvas.style.width=(W+2*bleed)/W*100+'%';canvas.style.marginLeft=-bleed/W*100+'%';}
 new ResizeObserver(resize).observe(canvas.parentElement);resize();
 function font(size){ctx.font=`${size}px ThumbHand, "Segoe Print", cursive`;ctx.fillStyle='#282828';ctx.textBaseline='middle';ctx.textAlign='center';}
 function text(value,x,y,size=40){font(size);ctx.fillText(value,x,y);}
 function lines(value,width,size){font(size);const out=[''];for(const word of value.split(' ')){const i=out.length-1,next=out[i]?out[i]+' '+word:word;if(ctx.measureText(next).width>width&&out[i])out.push(word);else out[i]=next;}return out;}
 function paragraph(value,x,y,width,size,maxHeight,align='center'){
  let rows=lines(value,width,size);while(rows.length*size*1.14>maxHeight&&size>24)rows=lines(value,width,--size);
  font(size);ctx.textAlign=align;rows.forEach((row,i)=>ctx.fillText(row,x,y+i*size*1.14));return rows.length*size*1.14;
 }
 function draw(game,reduced,drag=null){
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,H);ctx.translate(bleed,0);ctx.drawImage(phone,0,0,W,H);
  text('Segure o impulso!',836,55,60);
  const rule=game.rule;if(!rule)return;
  text('MENSAGEM',783,233,32);
  paragraph(rule.message,783,315,312,48,220);
  let labelSize=38;font(labelSize);while(ctx.measureText(rule.button).width>280)font(--labelSize);ctx.fillText(rule.button,783,599);
  const reaction=game.reaction;
  const p=reaction?reaction.progress:clamp(1-game.remaining/rule.duration);
  let x=1085-215*p,y=315,angle=0;
  if(drag&&!reaction)x=drag.x;
  if(!reaction&&!drag&&!reduced){y+=Math.sin(game.elapsed*.035)*(1+2*p);angle=Math.sin(game.elapsed*.027)*.003*p;}
  if(reaction){
   const t=reaction.age;
   const origin=reaction.handX??x;
   if(reaction.blocked){const kick=reduced?1:ease(t/250);x=origin+270*kick;y+=35*kick;angle=.24*kick;}
   else if(t<160&&!reduced){x=origin+(870-origin)*ease(t/160);}
   else if(!reaction.good){const retreat=reduced?1:ease((t-640)/340);x=870+390*retreat;y+=35*retreat;angle=.15*retreat;}
   else{const retreat=reduced?1:ease((t-460)/480);x=870+230*retreat;y+=60*retreat;}
  }
  poseX=x;
  // Rotate around the wrist; preserve the release position when a drag resolves.
  matrix=new DOMMatrix().translate(x+handW*.87,y+handH).rotate(angle*180/Math.PI).translate(-handW*.87,-handH);
  ctx.save();ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.e+bleed,matrix.f);ctx.drawImage(hand,0,0,handW,handH);ctx.restore();
  // The mouth overlays just the fingertip at contact, then shuts after recoil.
  if(reaction&&!reaction.blocked&&!reaction.good&&(reduced||reaction.age>=160)){
   const bite=reduced?.65:reaction.age<640?1-.5*Math.abs(Math.sin((reaction.age-160)/100)):.42;
   ctx.fillStyle='#fff';ctx.fillRect(619,545,330,106);
   const mh=104*bite;ctx.drawImage(mouth,...mouthBox,623,599-mh/2,320,mh);
  }
  button.style.left=matrix.e/W*100+'%';button.style.top=matrix.f/H*100+'%';button.style.width=handW/W*100+'%';button.style.height=handH/H*100+'%';button.style.transform=`rotate(${angle}rad)`;
 }
 function hit(x,y){const p=matrix.inverse().transformPoint({x,y});if(p.x<0||p.y<0||p.x>=handW||p.y>=handH)return false;const sx=Math.floor(p.x/handW*hand.width),sy=Math.floor(p.y/handH*hand.height);return handPixels.data[(sy*hand.width+sx)*4+3]>30;}
 return {draw,hit,get handX(){return poseX;}};
}
