/* Phishing Beat V10 — every stage owns its music, sound palette and rhythmic grammar.
 * No sound laboratory: choosing a stage chooses the complete audiovisual experience.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PBRhythms=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const tracks=[
 {id:'passo',audio:'passo-a-passo',musicKey:'passo-a-passo',soundBank:'original',soundName:'DIGITAL ORIGINAL',number:1,name:'PASSO A PASSO',bpm:96,totalBeats:96,introBeats:8,content:'domain',sprite:'mail',color:'cyan',visual:'pulso',
  short:'PASSO · PASSO · ALVO',style:'4/4 RETO',description:['A fase original, preservada.','Três pousos claros sobre um pulso reto.'],instruction:'Escute os passos. O último pousa no alvo.',patterns:Array.from({length:20},()=> 'walk')},
 {id:'contra',audio:'contratempo',musicKey:'contratempo',soundBank:'original',soundName:'BREAK DIGITAL',number:2,name:'CONTRATEMPO',bpm:112,totalBeats:112,introBeats:8,content:'domain',sprite:'mail',color:'pink',visual:'contra',
  short:'TÁ-TÁ … TÁ-TÁ',style:'SÍNCOPA / CONTRATEMPO',description:['A fase antiga de contratempos.','Passos duplos entram entre os pulsos.'],instruction:'Não siga só o bumbo. Escute os passos entre as batidas.',patterns:Array.from({length:24},(_,i)=> i>=8&&i%4>=2?'shuffle':'double')},
 {id:'freio',audio:'para-e-vai',musicKey:'para-e-vai',soundBank:'original',soundName:'STOP & GO',number:3,name:'PARA E VAI',bpm:120,totalBeats:120,introBeats:8,content:'domain',sprite:'mail',color:'yellow',visual:'freio',
  short:'VAI · SEGURA … VOLTA!',style:'PAUSA / RETOMADA',description:['A fase antiga de pausas longas.','A mensagem para e retoma junto da música.'],instruction:'Na pausa, espere. Reporte só no pouso final, se houver suspeita.',patterns:['short','short','freeze','freeze','short','freeze','short','freeze','rush','short','freeze','rush','short','freeze','rush','rush']},
 {id:'swing',audio:'swing-remetente',musicKey:'swing-remetente--groove',soundBank:'groove',soundName:'BAIXO & TECLAS',number:4,name:'SWING DO REMETENTE',bpm:108,totalBeats:108,introBeats:8,content:'sender',sprite:'sender',color:'green',visual:'swing',
  short:'LONGO-CURTO · LONGO-CURTO',style:'SWING / TRIPLETOS',description:['Nome + endereço do remetente.','Baixo e teclas acompanham o balanço ternário.'],instruction:'Sinta o longo-curto. O último acento fecha a frase no alvo.',patterns:Array.from({length:23},(_,i)=>i%6===5?'swingHold':i>9&&i%4===2?'swingTurn':'swing')},
 {id:'trinca',audio:'trinca-332',musicKey:'trinca-332-madeira',soundBank:'madeira',soundName:'MADEIRA & PELE',number:5,name:'TRINCA 3–3–2',bpm:120,totalBeats:120,introBeats:8,content:'domain',sprite:'mail',color:'yellow',visual:'trinca',
  short:'3 + 3 + 2',style:'AGRUPAMENTO 3–3–2',description:['Domínios em frases quebradas.','Tambores e madeira marcam grupos 3 + 3 + 2.'],instruction:'Sinta os grupos 3–3–2. O pouso final fecha a célula rítmica.',patterns:Array.from({length:25},(_,i)=>i%6===5?'claveBreak':i>10&&i%4===2?'claveRush':'clave')},
 {id:'resposta',audio:'chamada-resposta',musicKey:'chamada-resposta-office',soundBank:'office',soundName:'ESCRITÓRIO MIX',number:6,name:'CHAMADA & RESPOSTA',bpm:126,totalBeats:126,introBeats:8,content:'identity',sprite:'mail',color:'cream',visual:'resposta',
  short:'CHAMA → ESPERA → RESPONDE',style:'CALL & RESPONSE',description:['Domínio e remetente se alternam.','Sons de escritório fazem pergunta e resposta.'],instruction:'A primeira frase chama; a segunda responde. Reporte só no pouso final.',patterns:['call','answer','call','holdBurst','answer','call','silence','answer','holdBurst','call','answer','silence','rushAnswer','call','holdBurst','answer','rushAnswer','silence','answer','call','answer']}
];
const patterns={
 walk:{length:4,read:1,land:[2,3,4],label:'PASSO · PASSO · ALVO',syllables:['TUM','TUM','JÁ']},
 double:{length:4,read:1.5,land:[2,2.5,4,4.5],label:'DOIS · PAUSA · DOIS',syllables:['TÁ','TÁ','TÁ','JÁ']},
 shuffle:{length:4,read:1.5,land:[2,3,3.5,4.5],label:'PASSO · DUPLO · ALVO',syllables:['TUM','TÁ','TÁ','JÁ']},
 short:{length:4,read:1,land:[2,2.5,4],label:'DUPLO · ESPERA · ALVO',syllables:['TÁ','TÁ','JÁ']},
 freeze:{length:8,read:1,land:[2,3,7,8],label:'VAI · SEGURA · VOLTA',syllables:['TUM','TUM','TUM','JÁ'],freeze:true},
 rush:{length:8,read:1,land:[2,3,6,7,7.5,8],label:'PAUSA · RETOMADA DUPLA',syllables:['TUM','TUM','TUM','TÁ','TÁ','JÁ'],freeze:true},
 swing:{length:4,read:1,land:[5/3,2,11/3,4],label:'LONGO-CURTO · LONGO-CURTO',syllables:['TUM','tá','TUM','JÁ']},
 swingTurn:{length:4,read:1,land:[4/3,2,8/3,10/3,4],label:'TRIPLETOS · VIRADA · ALVO',syllables:['TÁ','tá','TÁ','tá','JÁ']},
 swingHold:{length:6,read:1,land:[5/3,2,14/3,16/3,6],label:'SWING · SEGURA · RESPOSTA',syllables:['TUM','tá','TUM','tá','JÁ'],freeze:true},
 // 3-3-2 over eighth-note space. Values are exact musical fractions.
 clave:{length:4,read:1,land:[3/2,3,4],label:'3 · 3 · 2',syllables:['TRÊS','TRÊS','DOIS']},
 claveRush:{length:4,read:1,land:[3/2,9/4,3,7/2,4],label:'3 · DOBRA · 3 · 2',syllables:['TRÊS','TÁ','TRÊS','TÁ','JÁ']},
 claveBreak:{length:6,read:1,land:[3/2,3,5,11/2,6],label:'3 · 3 · PAUSA · 2',syllables:['TRÊS','TRÊS','SEGURA','TÁ','JÁ'],freeze:true},
 // Call/response stage: all positions are locked to quarter/eighth/quarter-note subdivisions.
 call:{length:4,read:1,land:[3/2,2,7/2,4],label:'CHAMA · CHAMA / RESPONDE',syllables:['EI','EI','VAI','JÁ']},
 answer:{length:4,read:1,land:[5/4,9/4,13/4,4],label:'RESPOSTA DESLOCADA',syllables:['TÁ','TÁ','TÁ','JÁ']},
 holdBurst:{length:6,read:1,land:[3/2,2,19/4,21/4,11/2,6],label:'CHAMA · SEGURA · RAJADA',syllables:['EI','EI','TÁ','TÁ','TÁ','JÁ'],freeze:true},
 silence:{length:8,read:1,land:[3/2,2,13/2,7,15/2,8],label:'CHAMADA · SILÊNCIO · RESPOSTA',syllables:['EI','EI','VOLTA','TÁ','TÁ','JÁ'],freeze:true},
 rushAnswer:{length:6,read:1,land:[5/4,2,15/4,17/4,19/4,21/4,6],label:'CHAMADA · RESPOSTA RÁPIDA',syllables:['EI','EI','TÁ','TÁ','TÁ','TÁ','JÁ']}
};
function get(id='passo'){return tracks.find(t=>t.id===id)||tracks[0];}
function event(patternId,startBeat,track,index=0){
 const p=patterns[patternId],beat=60/track.bpm;
 const landings=p.land.map(b=>(startBeat+b)*beat),readAt=(startBeat+p.read)*beat;let previous=readAt;
 const steps=landings.map((at,j)=>{const gap=at-previous,duration=Math.min(.19,Math.max(.075,gap*.48),beat*.36);const step={at,start:at-duration,from:j/landings.length,to:(j+1)/landings.length,final:j===landings.length-1,syllable:p.syllables[j]};previous=at;return step;});
 let levels=index<6?['simple']:index<14?['simple','medium']:['medium','complex'];if(track.id==='resposta')levels=index<5?['simple','medium']:['simple','medium','complex'];
 return {index,pattern:patternId,patternLabel:p.label,startBeat,readAt,hitAt:landings.at(-1),closeAt:landings.at(-1)+.45,beat,steps,freeze:!!p.freeze,levels};
}
function timeline(id='passo',training=false){const track=get(id),duration=training?40:60,events=[];let b=track.introBeats;for(const p of track.patterns){const e=event(p,b,track,events.length);if(e.closeAt<=duration-.45)events.push(e);b+=patterns[p].length;}return {track,duration,events};}
function motionAt(e,t,reduced=false){let progress=0,last=-1,next=0,moving=false,u=0,height=0,angle=0,sx=1,sy=1;for(let i=0;i<e.steps.length;i++){const s=e.steps[i];if(t>=s.at){progress=s.to;last=i;next=i+1;continue;}next=i;if(t>=s.start){u=Math.max(0,Math.min(1,(t-s.start)/(s.at-s.start)));const ease=u*u*(3-2*u);progress=s.from+(s.to-s.from)*ease;moving=true;if(!reduced){height=Math.sin(Math.PI*u)*(s.final?24:18+(i%3)*4);angle=Math.sin(Math.PI*u)*(i%2?-.07:.07);sx=1-.035*Math.sin(Math.PI*u);sy=1+.055*Math.sin(Math.PI*u);}}break;}const age=last>=0?t-e.steps[last].at:Infinity;if(!reduced&&!moving&&age>=0&&age<.13){const settle=Math.sin(Math.PI*age/.13);sx=1+.09*settle;sy=1-.09*settle;}const upcoming=e.steps[next],lastAt=last>=0?e.steps[last].at:e.readAt;const resting=!moving&&next<e.steps.length&&upcoming.at-lastAt>e.beat*1.12&&t>lastAt+.15;return {progress,moving,height,angle,sx,sy,last,next,resting,landed:t>=e.hitAt,lastAge:age,untilNext:upcoming?Math.max(0,upcoming.at-t):0};}
function introPattern(track){return track.id==='passo'?'walk':track.id==='contra'?'double':track.id==='freio'?'freeze':track.id==='swing'?'swing':track.id==='trinca'?'clave':'call';}
function introEvent(id,t){const track=get(id),p=introPattern(track),period=patterns[p].length*60/track.bpm,n=Math.floor(Math.max(0,t)/period);return event(p,n*patterns[p].length,track,-1);}
function guideCues(id,training=false){const tl=timeline(id,training),track=tl.track,cues=[];const add=e=>{for(let i=0;i<e.steps.length;i++){const s=e.steps[i];cues.push({at:s.at,name:s.final?'land':'step',gain:s.final?.80:.68,rate:s.final?1:1+(i%4)*.075});}};const p=introPattern(track);let b=0;while((b+patterns[p].length)*60/track.bpm<=track.introBeats*60/track.bpm+.001){add(event(p,b,track,-1));b+=patterns[p].length;}for(const e of tl.events)add(e);return cues.filter(c=>c.at<tl.duration).sort((a,b)=>a.at-b.at);}
function freezes(id){const tl=timeline(id);return tl.events.flatMap(e=>e.freeze?e.steps.flatMap((s,i)=>{const n=e.steps[i+1];return n&&n.at-s.at>1.25*e.beat?[{from:s.at+.11,to:n.start-.12}]:[];}):[]);}
return {version:'10.0.0',tracks,patterns,get,event,timeline,motionAt,introEvent,guideCues,freezes,introPattern};
});
