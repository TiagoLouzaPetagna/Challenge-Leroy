import {SliceGame,REFERENCE_DOMAINS} from './slice-engine.js';

const W=1672,H=941,canvas=document.getElementById('slice-stage'),ctx=canvas.getContext('2d');
const status=document.getElementById('slice-status');
const game=new SliceGame();
const files={arena:'arena-fundo.png',envelope:'envelope-frente.png',panel:'folha-painel.png',impact:'mancha-impacto.png',tape:'fita-amarela.png'};
const crops={envelope:[49,80,1923,609],panel:[0,13,1561,976],impact:[39,19,1303,1126],tape:[63,31,1998,710]};
const art={};let mode='home',previousMode='home',buttons=[],lastFrame=performance.now(),dpr=1,scale=1,ox=0,oy=0,bg={x:0,y:0,s:1};
let pointer=null,strokeHits=[],trails=[],bursts=[],fragments=[],notices=[];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const bestKey='phish-slice.best';
if(localStorage.getItem(bestKey)===null){
  const previousBest=localStorage.getItem('dwto-phish.slice.best');
  if(previousBest!==null)localStorage.setItem(bestKey,previousBest);
}
const image=(src)=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=`assets/phish-slice/${src}`;});
for(const [key,file] of Object.entries(files))art[key]=await image(file).catch(()=>null);
await Promise.all([
  document.fonts.load('700 32px Rowdies'),
  document.fonts.load('32px Knewave'),
  document.fonts.load('32px MPlus')
]);
if(Object.values(art).some(a=>!a))mode='load-error';

function resize(){
  const w=innerWidth,h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  scale=Math.min(w/W,h/H);ox=(w-W*scale)/2;oy=(h-H*scale)/2;
}
addEventListener('resize',resize);resize();
function drawAsset(key,x,y,w,h){const im=art[key];if(!im)return;const c=crops[key];if(c)ctx.drawImage(im,...c,x,y,w,h);else ctx.drawImage(im,x,y,w,h);}
function fill(text,x,y,font,color='#fff',align='left'){
  ctx.font=font;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(text,x,y);
}
function textFit(text,x,y,maxWidth,maxSize,minSize,font,color,align='center'){
  let size=maxSize;do{ctx.font=`${size}px ${font}`;if(ctx.measureText(text).width<=maxWidth)break;size-=1;}while(size>minSize);
  fill(text,x,y,`${size}px ${font}`,color,align);
}
function background(){
  const vw=canvas.width/dpr,vh=canvas.height/dpr,ratio=Math.max(vw/W,vh/H);
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#101c30';ctx.fillRect(0,0,vw,vh);
  bg={x:(vw-W*ratio)/2,y:(vh-H*ratio)/2,s:ratio};
  ctx.drawImage(art.arena,bg.x,bg.y,W*ratio,H*ratio);
  ctx.translate(ox,oy);ctx.scale(scale,scale);
}
function envelopeTexture(o){
  if(o.texture)return o.texture;
  const c=document.createElement('canvas');c.width=Math.ceil(o.w);c.height=Math.ceil(o.h);
  const p=c.getContext('2d');const box=crops.envelope;
  p.drawImage(art.envelope,...box,0,0,o.w,o.h);
  p.textAlign='center';p.textBaseline='middle';p.fillStyle='#18213a';
  let brandSize=Math.round(o.h*.145);
  do{p.font=`700 ${brandSize}px Rowdies`;if(p.measureText(o.brand).width<=o.w*.7)break;brandSize--;}while(brandSize>19);
  p.fillText(o.brand,o.w/2,o.h*.33);
  let fontSize=Math.round(o.h*.177);const max=o.w*.84;
  do{p.font=`700 ${fontSize}px Consolas, 'Courier New', monospace`;if(p.measureText(o.domain).width<=max)break;fontSize--;}while(fontSize>24);
  p.fillText(o.domain,o.w/2,o.h*.58);
  o.texture=c;return c;
}
function drawEnvelope(o){
  const t=envelopeTexture(o);ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.angle);
  ctx.shadowColor='#071323aa';ctx.shadowBlur=16;ctx.shadowOffsetY=13;
  ctx.drawImage(t,-o.w/2,-o.h/2);ctx.restore();
}
function cutFragment(o,line){
  if(!line)return;
  const t=envelopeTexture(o),dx=line.bx-line.ax,dy=line.by-line.ay,len=Math.hypot(dx,dy)||1;
  const c=Math.cos(o.angle),s=Math.sin(o.angle);
  const tx=(dx*c+dy*s)/len,ty=(-dx*s+dy*c)/len;
  const worldNx=-dy/len,worldNy=dx/len,nx=-ty,ny=tx;
  // The cut path uses coordinates centered on the paper, just like drawImage below.
  const mx=(line.ax+line.bx)/2-o.x,my=(line.ay+line.by)/2-o.y;
  fragments.push({t,x:o.x,y:o.y,w:o.w,h:o.h,tx,ty,nx,ny,worldNx,worldNy,
    baseAngle:o.angle,cx:mx*c+my*s,cy:-mx*s+my*c,age:0});
}
function drawFragments(dt){
  fragments=fragments.filter(f=>f.age<.85);
  for(const f of fragments){
    f.age+=dt;const p=reduced?Math.min(1,f.age*3):f.age/.85;
    for(const side of [-1,1]){
      ctx.save();ctx.translate(f.x+f.worldNx*side*p*102,f.y+f.worldNy*side*p*102+p*p*92);
      ctx.rotate(f.baseAngle+side*p*.17);ctx.globalAlpha=Math.max(0,1-Math.max(0,p-.62)/.38);
      const cx=f.cx,cy=f.cy,tx=f.tx,ty=f.ty,nx=f.nx*side,ny=f.ny*side;
      ctx.beginPath();ctx.moveTo(cx-tx*1500,cy-ty*1500);
      ctx.lineTo(cx+tx*1500,cy+ty*1500);
      ctx.lineTo(cx+tx*1500+nx*1500,cy+ty*1500+ny*1500);
      ctx.lineTo(cx-tx*1500+nx*1500,cy-ty*1500+ny*1500);ctx.closePath();ctx.clip();
      ctx.drawImage(f.t,-f.w/2,-f.h/2);ctx.restore();
    }
  }
}
function drawEffects(dt){
  bursts=bursts.filter(b=>b.age<.5);for(const b of bursts){b.age+=dt;ctx.globalAlpha=Math.max(0,1-b.age/.5);
    const k=.75+b.age*.65;drawAsset('impact',b.x-120*k,b.y-107*k,240*k,214*k);ctx.globalAlpha=1;}
  trails=trails.filter(t=>t.age<.22);for(const t of trails){t.age+=dt;ctx.save();
    ctx.globalAlpha=Math.max(0,1-t.age/.22);ctx.lineCap='round';
    for(const [width,color] of [[17,'#12659d'],[9,'#3fe4ff'],[3,'#ffffff']]){
      ctx.beginPath();ctx.moveTo(t.ax,t.ay);ctx.lineTo(t.bx,t.by);
      ctx.lineWidth=width;ctx.strokeStyle=color;ctx.stroke();
    }
    ctx.restore();}
  notices=notices.filter(n=>n.age<1.2);for(const n of notices){n.age+=dt;
    ctx.globalAlpha=Math.max(0,1-n.age/1.2);fill(n.text,n.x,n.y-n.age*45,'36px Knewave',n.color,'center');ctx.globalAlpha=1;}
}
function drawHud(){
  fill('PHISH',44,46,'47px Rowdies','#f5efe3');fill('SLICE',230,46,'49px Knewave','#f84276');
  textFit(`PRESERVE: ${REFERENCE_DOMAINS.map(item=>item.domain).join('  /  ')}`,48,112,1540,22,17,'MPlus','#f0e7d5','left');
  fill(String(Math.max(0,game.score)),836,47,'51px Rowdies','#ffd859','center');
  fill('PONTOS',836,94,'17px Rowdies','#e9dbc5','center');
  fill(`ERROS ${3-game.lives}/3`,1460,48,'34px Rowdies','#f3eee9','center');
  buttons=[];drawButton('II',1588,29,66,61,'pause');
}
function drawButton(label,x,y,w,h,action){
  drawAsset('tape',x,y,w,h);textFit(label,x+w/2,y+h*.49,w*.8,Math.min(33,h*.45),18,'Rowdies','#17213b');
  buttons.push({x,y,w,h,action});
}
function drawPanel(){drawAsset('panel',318,132,1036,676);}
function drawReferenceList(top,size=30){
  REFERENCE_DOMAINS.forEach((item,i)=>
    textFit(item.domain,i%2?1072:595,top+Math.floor(i/2)*50,440,size,22,'Consolas, monospace','#152b45'));
}
function menu(){
  buttons=[];drawPanel();fill('PHISH',836,252,'100px Rowdies','#15213b','center');
  fill('SLICE',836,348,'108px Knewave','#ed3d70','center');
  fill('LEIA. MIRE. CORTE A IMITAÇÃO.',836,427,'31px Rowdies','#1d344f','center');
  fill('Mensagens de marcas conhecidas vão voar pela mesa.',836,502,'25px MPlus','#1d344f','center');
  fill('Compare o domínio real; o começo do endereço pode enganar.',836,541,'25px MPlus','#1d344f','center');
  fill('A lista de referência aparece antes da partida.',836,580,'23px MPlus','#1d344f','center');
  drawButton('JOGAR',656,622,360,96,'start');
  drawButton('COMO JOGAR',680,716,312,79,'help');
}
function references(){
  menu();ctx.fillStyle='rgba(8,19,37,.63)';ctx.fillRect(0,0,W,H);
  buttons=[];drawAsset('panel',383,144,906,661);
  fill('ANTES DE JOGAR',836,231,'67px Knewave','#e7386e','center');
  fill('Preserve estes quatro domínios e seus subdomínios:',836,301,'27px Rowdies','#20324d','center');
  REFERENCE_DOMAINS.forEach((item,i)=>{
    const y=361+i*55;
    fill(item.brand,500,y,'25px Rowdies','#28405d');
    textFit(item.domain,1194,y,470,31,23,'Consolas, monospace','#14243f','right');
  });
  fill('accounts.google.com passa; google.com.conta.co não passa.',836,612,'23px MPlus','#263952','center');
  fill('Confira o fim do endereço, não só o nome da marca.',836,647,'22px MPlus','#263952','center');
  drawButton('VOLTAR',477,691,300,79,'referenceBack');
  drawButton('COMEÇAR',895,691,300,79,'begin');
}
function help(){
  buttons=[];drawPanel();fill('COMO JOGAR',836,236,'68px Knewave','#17213b','center');
  fill('DOMÍNIOS DE REFERÊNCIA',836,318,'28px Rowdies','#23334c','center');
  drawReferenceList(370,27);
  const lines=[
    'O nome da marca no envelope não prova que o endereço é verdadeiro.',
    'Preserve um domínio da lista e seus subdomínios, como accounts.google.com.',
    'Corte os outros endereços. Três erros encerram a partida.'
  ];lines.forEach((s,i)=>textFit(s,836,501+i*40,895,25,19,'MPlus','#23334c'));
  drawButton('JOGAR',655,670,362,90,'start');drawButton('VOLTAR',80,829,300,76,'back');
}
function pause(){
  buttons=[];drawPanel();fill('PAUSA',836,293,'92px Knewave','#18233b','center');
  fill('A partida continua até você cometer três erros.',836,409,'29px MPlus','#283850','center');
  drawButton('CONTINUAR',653,492,366,99,'resume');
  drawButton('COMO JOGAR',653,605,366,99,'help');
  drawButton('SAIR',86,829,268,76,'home');
}
function result(){
  buttons=[];drawPanel();fill('FIM DE JOGO',836,229,'67px Knewave','#e7386e','center');
  fill(`${Math.max(0,game.score)} PONTOS`,836,338,'63px Rowdies','#192641','center');
  const s=game.stats;
  fill(`GOLPES CORTADOS   ${s.cut}       CORRETOS PRESERVADOS   ${s.saved}`,836,445,'24px Rowdies','#22324b','center');
  fill(`GOLPES PERDIDOS   ${s.missed}       CORTES ERRADOS   ${s.falsePositive}`,836,485,'24px Rowdies','#22324b','center');
  drawButton('JOGAR DE NOVO',653,601,370,104,'start');
  drawButton('MENU',80,829,278,76,'home');
}
function loadError(){buttons=[];drawPanel();fill('NÃO CARREGOU',836,330,'78px Knewave','#17213b','center');
  fill('Uma imagem da fase não abriu.',836,440,'30px MPlus','#27334b','center');drawButton('TENTAR DE NOVO',650,570,374,103,'reload');}
function gameDraw(dt){
  drawHud();for(const o of game.objects)drawEnvelope(o);drawFragments(dt);
  // Repaint only the physical front lip over envelopes still entering or leaving the desk.
  ctx.save();ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.drawImage(art.arena,0,778,W,163,bg.x,bg.y+778*bg.s,W*bg.s,163*bg.s);
  ctx.restore();
  drawEffects(dt);
}
function render(now){
  const dt=Math.min(.1,(now-lastFrame)/1000);lastFrame=now;
  if(mode==='playing'){game.update(dt);for(const e of game.drainEvents()){
    if(e.kind==='missed')notices.push({x:e.object.x,y:720,text:'PASSOU  −15',color:'#ff6184',age:0});
    if(e.kind==='saved')notices.push({x:e.object.x,y:720,text:'PRESERVADO  +5',color:'#83ebcb',age:0});
    if(e.kind==='combo')notices.push({x:836,y:210,text:'COMBO  +5',color:'#ffe064',age:0});
    if(e.kind==='over')finish();
    if(e.kind==='missed'||e.kind==='falsePositive')status.textContent=`${e.object.domain}: ${e.object.why}`;
  }}
  background();if(mode==='playing'||mode==='paused'||mode==='result')gameDraw(dt);
  if(mode==='home')menu();else if(mode==='references')references();else if(mode==='help')help();else if(mode==='paused')pause();else if(mode==='result')result();else if(mode==='load-error')loadError();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
function start(){pointer=null;strokeHits=[];trails=[];bursts=[];fragments=[];notices=[];game.start();mode='playing';canvas.focus();}
function finish(){mode='result';game.objects=[];fragments=[];trails=[];bursts=[];
  window.parent.postMessage({source:'fortifica:arcade-game',version:1,type:'arcade:finished',game:'phish-slice',score:game.score},location.origin);
  const old=Number(localStorage.getItem(bestKey)||0);if(game.score>old)localStorage.setItem(bestKey,String(game.score));
  status.textContent=`Fim da rodada. ${game.score} pontos. ${game.stats.cut} golpes cortados e ${game.stats.saved} mensagens preservadas.`;}
function action(id){
  if(id==='start')mode='references';
  else if(id==='begin')start();
  else if(id==='pause'){mode='paused';pointer=null;}
  else if(id==='resume')mode='playing';
  else if(id==='help'){previousMode=mode;mode='help';}
  else if(id==='back')mode=['paused','references'].includes(previousMode)?previousMode:'home';
  else if(id==='referenceBack')mode='home';
  else if(id==='home'){pointer=null;strokeHits=[];mode='home';}
  else if(id==='reload')location.reload();
}
function point(ev){const r=canvas.getBoundingClientRect();return {x:((ev.clientX-r.left)-ox)/scale,y:((ev.clientY-r.top)-oy)/scale};}
canvas.addEventListener('pointerdown',ev=>{
  ev.preventDefault();canvas.setPointerCapture(ev.pointerId);const p=point(ev);
  const button=buttons.find(b=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h);
  if(button){action(button.action);return;}
  if(mode==='playing'){pointer={...p,startX:p.x,startY:p.y,travel:0,armed:false};strokeHits=[];canvas.focus();}
});
canvas.addEventListener('pointermove',ev=>{
  if(!pointer||mode!=='playing')return;ev.preventDefault();const p=point(ev);
  const len=Math.hypot(p.x-pointer.x,p.y-pointer.y);if(len>2){
    const ax=pointer.armed?pointer.x:pointer.startX,ay=pointer.armed?pointer.y:pointer.startY;
    pointer.travel+=len;pointer.x=p.x;pointer.y=p.y;
    if(pointer.travel<28)return;
    pointer.armed=true;
    const visibleY=Math.min(H,(bg.y+778*bg.s-oy)/scale);
    const newHits=game.cutSegment(ax,ay,p.x,p.y,visibleY);
    strokeHits.push(...newHits);
    for(const hit of newHits){cutFragment(hit.object,hit.cutLine);
      const impactX=hit.cutLine?(hit.cutLine.ax+hit.cutLine.bx)/2:hit.object.x;
      const impactY=hit.cutLine?(hit.cutLine.ay+hit.cutLine.by)/2:hit.object.y;
      bursts.push({x:impactX,y:impactY,age:0});
      notices.push({x:hit.object.x,y:hit.object.y-120,text:hit.kind==='cut'?'+10':'−30',color:hit.kind==='cut'?'#ffe35e':'#ff6690',age:0});
      status.textContent=`${hit.object.domain}: ${hit.kind==='cut'?'golpe interceptado':'corte incorreto'}. ${hit.object.why}`;
      if(hit.cutLine)trails.push({...hit.cutLine,age:0});
    }
  }
});
function endStroke(){if(pointer){game.awardCombo(strokeHits);pointer=null;strokeHits=[];}}
canvas.addEventListener('pointerup',endStroke);canvas.addEventListener('pointercancel',endStroke);
addEventListener('keydown',ev=>{
  if(ev.key==='Escape'||ev.key.toLowerCase()==='p'){
    if(mode==='playing')action('pause');else if(mode==='paused')action('resume');else if(mode==='help')action('back');else if(mode==='references')action('referenceBack');
    ev.preventDefault();
  }else if((ev.key==='Enter'||ev.key===' ')&&['home','references','help','result'].includes(mode)){
    action(mode==='references'?'begin':'start');ev.preventDefault();
  }
});
