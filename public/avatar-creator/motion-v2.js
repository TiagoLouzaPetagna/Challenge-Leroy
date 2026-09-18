import {animatedPixels,idleFrames,waveFrames} from './animation.js';
import {reactionFrames,reactionLabels,animatedAccessories,cosmeticTiming} from './reactions.js';
let last='',start=0,action=null,lastExport='idle';
export function resetMotion(){last='';}
export function sequence(name){return name==='wave'?waveFrames:name==='idle'?idleFrames:reactionFrames[name];}
export function samplePose(frames,time,loop=true){let t=loop?Math.max(0,time)%frames.reduce((n,f)=>n+f.ms,0):Math.max(0,time);for(const f of frames){if(t<f.ms)return {...f};t-=f.ms;}return {};}
export function exportSequence(name,cosmetics=false,kind=''){const frames=sequence(name);if(!frames)throw new Error('Reação inválida');if(!cosmetics)return frames.map(f=>({...f}));const out=[];let elapsed=0;for(const f of frames){let remain=f.ms;while(remain>0){const timing=cosmeticTiming(kind,elapsed),duration=Math.min(remain,timing.remaining);out.push({...f,ms:duration,cosmeticPhase:timing.phase});elapsed+=duration;remain-=duration;}}return out;}
export function setupMotion(data,getState){
 const $=s=>document.querySelector(s),canvas=$('#avatar'),toggle=$('#animate'),wave=$('#wave'),sheetButton=$('#sheet'),reaction=$('#reaction'),react=$('#react'),cosmetics=$('#cosmetics');
 start=performance.now();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;toggle.checked=!reduced;cosmetics.checked=!reduced;
 const status=()=>{const c=getState();$('#cosmetic-status').textContent=animatedAccessories.has(c.accessory)?data.labels[c.accessory]+' tem movimento próprio.':'Movimento disponível para hélice, antenas e polvo.';sheetButton.textContent='Baixar: '+reactionLabels[lastExport];};
 const paint=()=>{const now=performance.now();let pose={};if(action){const frames=sequence(action.name),length=frames.reduce((n,f)=>n+f.ms,0);if(now-action.start>=length)action=null;else pose=samplePose(frames,now-action.start,false);}if(!action&&toggle.checked)pose=samplePose(idleFrames,now-start);if(cosmetics.checked&&animatedAccessories.has(getState().accessory))pose.cosmeticPhase=cosmeticTiming(getState().accessory,now-start).phase;const hash=JSON.stringify(pose);if(hash!==last){canvas.getContext('2d').putImageData(new ImageData(animatedPixels(data,getState(),pose),48,64),0,0);last=hash;status();}};
 const play=name=>{action={name,start:performance.now()};lastExport=name;resetMotion();paint();status();};
 toggle.onchange=()=>{start=performance.now();action=null;lastExport='idle';resetMotion();paint();};cosmetics.onchange=()=>{resetMotion();paint();};
 wave.disabled=false;wave.onclick=()=>play('wave');react.disabled=false;react.onclick=()=>play(reaction.value);reaction.onchange=()=>{lastExport=reaction.value;status();};
 sheetButton.disabled=false;sheetButton.onclick=()=>{
  const frames=exportSequence(lastExport,cosmetics.checked&&animatedAccessories.has(getState().accessory),getState().accessory),sheet=document.createElement('canvas');sheet.width=frames.length*48;sheet.height=64;
  for(let i=0;i<frames.length;i++)sheet.getContext('2d').putImageData(new ImageData(animatedPixels(data,getState(),frames[i]),48,64),48*i,0);
  const link=document.createElement('a');link.download='avatar-'+lastExport+'-'+frames.length+'-quadros.png';link.href=sheet.toDataURL();link.click();
  const blob=new Blob([JSON.stringify({frameWidth:48,frameHeight:64,animation:lastExport,frames:frames.map((f,i)=>({x:i*48,y:0,duration:f.ms})),config:getState()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);link.href=url;link.download='avatar-'+lastExport+'-tempos.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);$('#status').textContent='Animação salva: '+frames.length+' quadros e arquivo de tempos.';
 };
 const timer=setInterval(()=>{if(!document.hidden)paint();},40);window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});status();paint();
}
