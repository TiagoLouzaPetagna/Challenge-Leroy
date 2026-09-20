/* Phishing Beat — sprite-driven, one-button rhythm game. No dependencies.
 * All visible structural UI is raster art; Canvas only composites sprites/text.
 */
(function(){'use strict';
const W=1280,H=720, C={navy:'#10152c',cream:'#fff2d9',cyan:'#45e1e5',pink:'#f754a9',yellow:'#ffda50',muted:'#a5b4da',ink:'#1b2446',red:'#ff7589',green:'#82e5a2'};
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d'),controls=document.getElementById('controls'),live=document.getElementById('status');
const images={}, audio=new PBAudio(PBAssets),storeKey='phishing-beat-v7';
const defaults={music:.62,fx:.55,guide:.8,offset:0,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,muted:false,best:0,bests:{},lastStage:'passo',seenStages:{}};
let saved={};try{saved=JSON.parse(localStorage.getItem(storeKey)||localStorage.getItem('phishing-beat-v6')||localStorage.getItem('phishing-beat-v5')||localStorage.getItem('phishing-beat-v4')||localStorage.getItem('phishing-beat-v3')||localStorage.getItem('phishing-beat-v2')||'{}');}catch(_){}
const prefs={...defaults};
for(const k of ['music','fx','guide'])if(Number.isFinite(saved[k]))prefs[k]=Math.max(0,Math.min(1,saved[k]));
if(Number.isFinite(saved.offset))prefs.offset=Math.max(-250,Math.min(250,saved.offset));
for(const k of ['muted','reduced'])if(typeof saved[k]==='boolean')prefs[k]=saved[k];
prefs.seenStages=(saved.seenStages&&typeof saved.seenStages==='object')?{...saved.seenStages}:{};
if(Number.isFinite(saved.best))prefs.best=Math.max(0,saved.best);
for(const tr of PBRhythms.tracks)if(Number.isFinite(saved.bests?.[tr.id]))prefs.bests[tr.id]=Math.max(0,saved.bests[tr.id]);
let selectedStage=PBRhythms.get(saved.lastStage).id,selectionTraining=false,previewStageId=null,previewEnd=0,previewToken=0;
let selectedSound=PBRhythms.get(selectedStage).soundBank||'original';
let scene='boot',run=null,summary=null,boxes=[],focused='',hover='',heldPointer=null,armed=null,spaceHeld=false,pressUntil=0;
let tutorialStep=0,helpTraining=false,settingsFrom='menu',reviewIndex=0,reviewFilter='content',feedback=null,particles=[],lastWall=performance.now(),finishDue=0;
let resumeAt=0,resumeDeadline=0,resumeMode=false,errorMessage='',calib=null,uiStamp='',ariaEvent=-1;
const titleFont='"Oxanium", "Trebuchet MS", sans-serif',mono='"IBM Plex Mono", "DejaVu Sans Mono", Consolas, monospace';
function persist(){try{localStorage.setItem(storeKey,JSON.stringify(prefs));}catch(_){}applySound();}
function applySound(){const bank=(run?.track||PBRhythms.get(selectedStage)).soundBank||'original';if(!audio.playing)audio.bank=bank;audio.musicVolume=prefs.music;audio.fxVolume=prefs.fx;audio.guideVolume=prefs.guide;audio.muted=prefs.muted;audio.applyVolumes();}
function setScene(s){if(scene==='calibration'&&s!=='calibration')audio.clearCues();scene=s;document.body.dataset.scene=s;focused='';hover='';uiStamp='';live.textContent='';}
function announce(s){live.textContent=s;}
function image(key,x,y,w,h,alpha=1){const im=images[key];if(!im)return;ctx.save();ctx.globalAlpha=alpha;ctx.drawImage(im,x,y,w===undefined?im.width/2:w,h===undefined?im.height/2:h);ctx.restore();}
function frame(key,index,columns,x,y,w,h){const im=images[key];if(!im)return;ctx.drawImage(im,Math.floor(index)%columns*im.width/columns,0,im.width/columns,im.height,x,y,w,h);}
function txt(s,x,y,size=20,color=C.cream,align='left',weight=500,family=titleFont){ctx.save();ctx.font=`${weight} ${size}px ${family}`;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(String(s),x,y);ctx.restore();}
function wrap(s,x,y,maxWidth,size=18,color=C.muted,lineHeight=29,family=mono){
 ctx.save();ctx.font=`500 ${size}px ${family}`;const words=String(s).split(' ');let current='',yy=y;
 for(const word of words){const next=current?current+' '+word:word;if(ctx.measureText(next).width>maxWidth&&current){txt(current,x,yy,size,color,'left',500,family);current=word;yy+=lineHeight;}else current=next;}
 if(current)txt(current,x,yy,size,color,'left',500,family);ctx.restore();return yy+lineHeight;
}
function digits(value,x,y,height=36,color='digits',align='left'){
 const chars='0123456789×%:–+',s=String(value),cw=height*58/70,im=images[color];if(!im)return;
 let start=x;if(align==='center')start-=s.length*cw/2;if(align==='right')start-=s.length*cw;
 for(let i=0;i<s.length;i++){const n=chars.indexOf(s[i]);if(n>=0)ctx.drawImage(im,n*116,0,116,140,start+i*cw,y,cw,height);}
}
function progress(x,y,w,value,color='progress_fill',h=6){image('progress_base',x,y,w,h);const im=images[color],v=Math.max(0,Math.min(1,value));if(im&&v>0)ctx.drawImage(im,0,0,im.width*v,im.height,x,y,w*v,h);}
function button(id,label,x,y,w=280,h=74,fn=()=>{},kind='primary',options={}){
 const disabled=!!options.disabled,down=(id==='report'&&performance.now()<pressUntil)||(heldPointer!==null&&armed===id);
 let state=disabled?'disabled':down?'down':(hover===id||focused===id)?'focus':'up';
 image(`button_${kind}_${state}`,x,y,w,h,disabled?.7:1);
 if(options.icon){image('icon_'+options.icon,x+w/2-19,y+h/2-21,38,38);}
 else if(id==='report'){image('report_label',x+5+(down?3:0),y+5+(down?3:0),w-20,h-24);}
 else{
  const color=kind==='dark'?C.cream:C.navy;
  txt(label,x+w/2-5+(down?3:0),y+h*.44+(down?3:0),options.size||Math.min(23,w/10),color,'center',800);
 }
 boxes.push({id,label:options.aria||label||id,x,y,w,h,fn,disabled});
}
function iconButton(id,icon,x,y,fn,aria){
 image('button_dark_up',x,y,54,51);
 if(focused===id||hover===id)image('focus_line',x+5,y+44,42,3);
 image('icon_'+icon,x+9,y+5,35,35);boxes.push({id,label:aria,x,y,w:54,h:51,fn,disabled:false});
}
function base(stageId=null){image('stage',0,0,W,H);if(stageId&&images['overlay_'+stageId])image('overlay_'+stageId,0,0,W,H);}
function modal(){image('scrim',0,0,W,H,.70);image('modal',105,49,1080,624);}
function equalizer(x,y,w=204,h=53,time=0,beat=.5){frame('equalizer',prefs.reduced?0:Math.floor(time/beat*4)%8,8,x,y,w,h);}
function record(x,y,size,time=0,alpha=1){ctx.save();ctx.translate(x+size/2,y+size/2);ctx.rotate(prefs.reduced?0:time*.27);image('record',-size/2,-size/2,size,size,alpha);ctx.restore();}
function soundButton(x=1061,y=40){iconButton('mute',prefs.muted?'muted':'sound',x,y,()=>{prefs.muted=!prefs.muted;persist();},prefs.muted?'Ativar som':'Silenciar som');}
function fullscreen(){const el=document.getElementById('stage');if(document.fullscreenElement){document.exitFullscreen?.().catch(()=>{});}else el.requestFullscreen?.().catch(()=>{announce('Tela cheia não está disponível neste navegador.');});}
function footer(s='ESPAÇO / TOQUE PARA REPORTAR   ·   ESC PARA PAUSAR'){
 image('scrim',150,645,980,51,.82);
 txt(s,640,656,13,C.muted,'center',500,mono);
 
}
function menu(now){
 base();soundButton();iconButton('full','fullscreen',1123,40,fullscreen,'Tela cheia');
 
 image('logo',150,118,715,238);
 record(846,159,259,now/1000);image('star',1032,133,58,58);image('spark',844,365,39,39);
 txt('Observe o contexto e reporte na batida.',177,390,31,C.cream,'left',800);
 txt('Cada fase traz seu próprio som, ritmo e estilo visual.',177,430,22,C.cyan,'left',700);
 
 image('ribbon',168,502,944,57);
 txt('DOMÍNIO · REMETENTE',252,526,14,C.cyan,'left',700,mono);
 txt('6 FASES RÍTMICAS',500,526,19,C.cream,'left',800);
 txt('SOM · MOVIMENTO · LEITURA',1070,526,13,C.muted,'right',500,mono);
 button('play','ESCOLHER FASE',170,579,590,78,()=>openTracks(false),'primary',{size:25});
 button('settings','AJUSTES',780,579,333,78,()=>openSettings('menu'),'dark',{size:22});
 
 if(errorMessage){image('scrim',160,360,950,130,.94);wrap(errorMessage,190,398,890,18,C.red);}
}
function openTracks(training=false){
 audio.stop();previewStageId=null;previewToken++;selectionTraining=training;setScene('tracks');
}
async function previewStage(id){
 if(previewStageId===id){audio.stop();previewStageId=null;previewToken++;return;}
 const token=++previewToken;previewStageId=null;
 try{
  const tr=PBRhythms.get(id);selectedStage=tr.id;selectedSound=tr.soundBank||'original';prefs.lastStage=tr.id;persist();
  await audio.init();if(token!==previewToken||scene!=='tracks')return;applySound();
  const tl=PBRhythms.timeline(id),key=PBSoundsets.musicKey(tr);await audio.prepare(key);if(token!==previewToken||scene!=='tracks')return;audio.setFocus('mix');audio.configure(key,PBRhythms.guideCues(id),tr.soundBank||'original');
  const beginAt=Math.max(0,tl.events[0].readAt-.25);previewEnd=Math.min(18,tl.events[2]?.closeAt||tl.events[1].closeAt+.35);
  previewStageId=id;audio.play(beginAt);announce('Prévia de '+tr.name+'. '+tr.short);
 }catch(e){announce('Não foi possível reproduzir a prévia.');console.error(e);}
}
function route(e,t,x,y,w,h,small=false,spriteKey='mail'){
 image('lane',x,y,w,h);if(!e)return null;
 const m=PBRhythms.motionAt(e,t,prefs.reduced),target=small?x+47:456,entry=small?x+w-28:1045,baseY=y+h*.485;
 for(let i=0;i<e.steps.length;i++){
  const st=e.steps[i],xx=entry-(entry-target)*st.to,bright=t>=st.at&&t<st.at+.14;
  if(!st.final)image('spark',xx-(small?4:6),y+h*.82,small?8:12,small?8:12,bright?1:t>=st.at?.55:.20);
 }
 const age=t-e.hitAt,pulse=prefs.reduced?0:age>=0&&age<.24?Math.min(3,Math.floor(age/.06)):3,ps=small?62:142;
 frame('pulse',pulse,4,target-ps/2,baseY-ps/2,ps,ps);
 let alpha=1,raise=0;
 if(e.resolved&&['perfect','good','offbeat','false_positive'].includes(e.result)){const a=Math.max(0,t-Math.max(e.hitAt,e.decidedAt)-.07);alpha=Math.max(0,1-a/.32);raise=prefs.reduced?0:Math.min(42,a*140);}
 const xx=entry-(entry-target)*m.progress,sz=small?55:124;
 if(t>=e.readAt&&t<=e.closeAt+.18){ctx.save();ctx.translate(xx,baseY-m.height*(small?.40:1)-raise);ctx.rotate(m.angle);ctx.scale(m.sx,m.sy);image(e.icon||spriteKey,-sz/2,-sz*.91/2,sz,sz*.91,alpha);ctx.restore();}
 return m;
}
function stageCard(tr,x,y,w=464,h=128,now=0){
 const tone=C[tr.color]||C.cream,isPreview=previewStageId===tr.id,ctxInfo=PBData.stageContext[tr.id];
 image('modal',x,y,w,h);image('ribbon',x+8,y+8,w-16,29);
 txt('FASE 0'+tr.number,x+23,y+22,10,tone,'left',700,mono);txt(tr.bpm+' BPM',x+w-23,y+22,10,C.cream,'right',600,mono);
 image(tr.sprite,x+18,y+43,61,56);
 txt(tr.name,x+91,y+49,tr.name.length>20?16:18,tone,'left',800);
 txt(tr.style,x+91,y+72,10,C.muted,'left',600,mono);
 txt('♪ '+tr.soundName,x+91,y+94,10,C.cream,'left',600,mono);
 if(isPreview)equalizer(x+90,y+105,122,16,audio.time(),60/tr.bpm);
 button('preview-'+tr.id,isPreview?'PARAR':'OUVIR',x+w-166,y+78,76,37,()=>previewStage(tr.id),'dark',{size:11});
 button('stage-'+tr.id,selectionTraining?'TREINO':'JOGAR',x+w-84,y+78,74,37,()=>startRequest(selectionTraining,tr.id),tr.number%2?'primary':'cream',{size:11});
}
function tracksScreen(now){
 base();modal();txt(selectionTraining?'MODO TREINO':'ESCOLHER FASE',164,105,30,C.cream,'left',800);
 txt('Cada fase já inclui trilha, ritmo e estilo próprios.',165,141,13,C.muted,'left',500,mono);
 button('toggleTraining',selectionTraining?'MODO FAIXA':'MODO TREINO',872,99,240,47,()=>{selectionTraining=!selectionTraining;},'dark',{size:15});
 const pos=[[158,169],[650,169],[158,307],[650,307],[158,445],[650,445]];
 PBRhythms.tracks.forEach((tr,i)=>stageCard(tr,pos[i][0],pos[i][1],464,128,now));
 button('menu','MENU',164,592,206,55,()=>{audio.stop();previewStageId=null;previewToken++;setScene('menu');},'dark',{size:18});
 txt(selectionTraining?'40 s · sem vidas':'60 s · 3 vidas',1106,621,14,C.muted,'right',500,mono);
 txt('OUVIR = prévia da fase',1106,596,12,C.muted,'right',500,mono);
}

function startRequest(training,trackId=selectedStage){
 const tr=PBRhythms.get(trackId);selectedStage=tr.id;selectedSound=tr.soundBank||'original';audio.stop();previewStageId=null;previewToken++;errorMessage='';helpTraining=training;
 prefs.lastStage=selectedStage;persist();
 if(!prefs.seenStages[selectedStage]&&!training){tutorialStep=0;setScene('briefing');}else begin(training,selectedStage);
}
async function begin(training=false,trackId=selectedStage){
 selectedStage=PBRhythms.get(trackId).id;previewStageId=null;previewToken++;prefs.lastStage=selectedStage;persist();audio.stop();setScene('loading');
 try{await audio.init();audio.clearCues();run=new PBCore.Run(PBData,{seed:(Date.now()^(Math.random()*0xffffffff))>>>0,training,offset:prefs.offset,trackId:selectedStage});selectedSound=run.track.soundBank||'original';applySound();const key=PBSoundsets.musicKey(run.track);await audio.prepare(key);audio.setFocus('mix');audio.configure(key,PBRhythms.guideCues(selectedStage,training),selectedSound);run.soundset=selectedSound;summary=null;feedback=null;particles=[];finishDue=0;ariaEvent=-1;resumeMode=false;audio.play(0);setScene('playing');announce(run.track.name+'. '+run.track.instruction);
 }catch(e){errorMessage='Não foi possível iniciar o áudio. Verifique a permissão de som do navegador e tente novamente.';setScene('menu');console.error('Audio initialization failed',e);}
}
function briefing(now){
 base(selectedStage);modal();const tr=PBRhythms.get(selectedStage),sc=PBData.stageContext[tr.id],tone=C[tr.color];
 txt('FASE 0'+tr.number+'  /  '+tr.name,165,118,14,tone,'left',700,mono);
 txt(tutorialStep===0?'O QUE ANALISAR':'COMO ESSA FASE BATE',164,161,34,C.cream,'left',800);
 if(tutorialStep===0){
  image(tr.sprite==='mixed'?'mixed':tr.sprite,174,218,145,133);
  txt(sc.title,354,226,28,tone,'left',800);wrap(sc.reference,354,267,715,18,C.cream,28,mono);wrap(sc.hint,354,335,715,16,C.muted,26,mono);
  image('ribbon',164,421,954,57);txt('A resposta depende do contexto mostrado na tela — não de uma cor ou som de ameaça.',640,447,14,C.cream,'center',600,mono);
  if(['passo','contra','freio','trinca'].includes(tr.id))txt('Ex.: portal.vela.com passa · portal.vela.net e portal.vela.com.br devem ser reportados.',170,517,14,C.muted,'left',500,mono);
  if(tr.id==='swing')txt('Ex.: financeiro@vela.com passa · financeiro@vela.net e @vela.com.br são suspeitos.',170,517,13,C.muted,'left',500,mono);
  if(tr.id==='resposta')txt('A fase alterna domínio e remetente: observe qual regra está ativa em cada mensagem.',170,517,14,C.muted,'left',500,mono);
 }else{
  txt(tr.short,170,232,25,tone,'left',800);wrap(tr.instruction,170,274,855,18,C.muted,29,mono);
  const p=PBRhythms.introPattern(tr),demo=PBRhythms.event(p,0,tr,-1);demo.icon=tr.sprite==='mixed'?'mixed':tr.sprite;const period=PBRhythms.patterns[p].length*60/tr.bpm;route(demo,(now/1000)%period,164,360,954,104,false,tr.sprite==='mixed'?'mixed':tr.sprite);
  txt('Os passos movem a mensagem. Somente o último pouso é a janela principal de reporte.',640,496,14,C.cream,'center',600,mono);
  txt('3 erros de classificação encerram a faixa. Erro só de timing quebra o combo.',640,536,13,C.muted,'center',500,mono);
 }
 button('back',tutorialStep?'VOLTAR':'FASES',164,612,232,61,()=>{if(tutorialStep)tutorialStep--;else openTracks(false);uiStamp='';},'dark',{size:18});
 button('next',tutorialStep===0?'OUVIR A REGRA':helpTraining?'INICIAR TREINO':'COMEÇAR FAIXA',728,612,391,61,()=>{if(tutorialStep===0){tutorialStep=1;uiStamp='';}else{prefs.seenStages[selectedStage]=true;persist();begin(helpTraining,selectedStage);}},'primary',{size:20});
}
function head(t){
 image('logo',151,18,292,97);
 txt(run.training?'SESSÃO DE TREINO':'FASE 0'+run.track.number,468,46,12,C[run.track.color],'left',700,mono);
 txt(run.track.name,468,75,25,C.cream,'left',800);
 const e=run.eventAt(t),part=t<run.events[0].readAt?'OUÇA A DEMONSTRAÇÃO':e?.freeze?'PAUSA MUSICAL':t>run.duration-3?'ENCERRANDO':'RITMO EM MOVIMENTO';
 const bank=PBSoundsets.forTrack(run.track);txt(run.track.soundName,988,46,12,C[bank.color]||C.cream,'right',600,mono);
 txt(part,988,75,11,C.muted,'right',600,mono);
 soundButton(1006,35);iconButton('pause','pause',1071,35,pause,'Pausar');
 image('ribbon',153,118,974,66);
 txt('PONTOS',254,131,10,C.muted,'left',600,mono);digits(String(run.score).padStart(4,'0'),250,144,28);
 txt('COMBO',479,131,10,C.muted,'left',600,mono);digits('×'+String(run.combo).padStart(2,'0'),474,144,28,'digits_yellow');
 txt(run.bpm+' BPM',697,149,15,C[run.track.color],'center',700,mono);
 if(run.training)txt('TREINO',852,149,16,C.pink,'center',700);
 else for(let i=0;i<3;i++)image('icon_'+(i<run.lives?'heart':'heart_empty'),796+i*31,132,29,29);
 const left=Math.ceil(Math.max(0,run.duration-t));txt('TEMPO',1015,131,10,C.muted,'left',600,mono);digits(Math.floor(left/60)+':'+String(left%60).padStart(2,'0'),1011,144,28);
}
function gameplay(now,paused=false){
 base(run?.track?.id);if(!run)return;const t=paused?resumeAt:audio.time();head(t);
 const e=run.displayAt(t),intro=t<run.events[0].readAt,sc=PBData.stageContext[run.track.id];
 const demo=intro?PBRhythms.introEvent(run.track.id,t):null;if(demo)demo.icon=run.track.sprite==='mixed'?'mixed':run.track.sprite;
 image('evidence_v4',154,200,972,188);
 const reading=e&&t<e.closeAt+.18,shown=reading?e:null;
 txt(sc.title,184,220,14,C.cream,'left',700,mono);
 txt(shown?shown.category.toUpperCase():intro?'DEMONSTRAÇÃO':'CONTEXTO',1094,220,12,C.cream,'right',600,mono);
 const iconKey=shown?.icon||(run.track.sprite==='mixed'?'mixed':run.track.sprite);image(iconKey,180,239,98,90);
 const primary=shown?shown.primary:intro?'OUÇA O PADRÃO':t>run.duration-3?'FINALIZANDO…':'PRÓXIMA MENSAGEM…';
 const secondary=shown?shown.secondary:sc.hint;
 const fs=primary.length>46?22:primary.length>38?24:primary.length>34?27:primary.length>28?31:primary.length>22?35:40;
 txt(primary,664,278,fs,C.navy,'center',700,mono);
 txt(secondary,664,322,15,C.ink,'center',500,mono);
 txt('REGRA: '+(shown?.reference||sc.reference),314,356,11,C.ink,'left',600,mono);
 if(e)txt(String(e.index+1).padStart(2,'0')+'/'+run.events.length,1090,356,13,C.ink,'right',500,mono);
 const visible=intro?demo:reading?e:null;
 const m=route(visible,t,154,393,972,137,false,visible?.icon||(run.track.sprite==='mixed'?'mixed':run.track.sprite));
 txt('ALVO',456,545,11,C.cyan,'center',700,mono);
 let instruction=intro?'SÓ OBSERVE':m?.resting?'SEGURA…':m?.landed?'POUSO!':m?.moving?'PASSO':'ESPERE O POUSO';if(!intro&&!visible)instruction='PRÓXIMA FRASE';
 txt(instruction,638,548,13,m?.resting?C.yellow:C.cyan,'center',700);
 txt(visible?.patternLabel||run.track.short,902,548,11,C.muted,'center',600,mono);
 const resting=visible?.freeze&&m?.resting;equalizer(174,568,203,56,resting?0:t,run.beat);equalizer(912,568,203,56,resting?0:t+run.beat,run.beat);
 button('report','REPORTAR',424,565,434,79,()=>report(),'primary',{size:28,disabled:paused||run.ended||intro});
 if(feedback&&now-feedback.at<950){const elapsed=(now-feedback.at)/1000,labels={perfect:'perfect',good:'good',offbeat:'offbeat',miss:'miss',false_positive:'false_positive',ok:'ok'};const w=feedback.result==='ok'?105:feedback.result==='perfect'?240:290;const bump=prefs.reduced?1:1+Math.max(0,.12-elapsed)*.8;ctx.save();ctx.translate(896,542);ctx.scale(bump,bump);image('label_'+labels[feedback.result],-w/2,-22,w,47,Math.min(1,(.95-elapsed)*4));ctx.restore();if(feedback.deltaMs!==null&&feedback.result!=='false_positive')txt((feedback.deltaMs>0?'+':'')+Math.round(feedback.deltaMs)+' ms',1110,545,11,C.muted,'right',500,mono);}
 footer(intro?run.track.instruction:run.training?'TREINO · LEIA O CONTEXTO · REPORTE SÓ A SUSPEITA NO POUSO FINAL':'LEIA O CONTEXTO · OUÇA A FRASE · REPORTE SÓ NO POUSO FINAL');
 progress(0,713,W,t/run.duration,'progress_fill',7);
 for(const p of particles){const age=(now-p.at)/1000;if(age>.75)continue;const d=prefs.reduced?0:age;image(p.sprite,p.x+p.vx*d,p.y+p.vy*d+100*d*d,p.size,p.size,Math.max(0,1-age/.75));}
 if(feedback&&['miss','false_positive'].includes(feedback.result)&&now-feedback.at<180&&!prefs.reduced)image('glitch',0,0,W,H,.30);
}

function report(){
 if(scene!=='playing'||!run||run.ended)return;
 pressUntil=performance.now()+100;
 const t=audio.time();if(t<run.events[0].readAt)return;for(const result of run.advance(t))react(result);
 const result=run.report(t);if(result)react(result);else audio.sfx('tap',null,.34);
}
function react(r){
 feedback={...r,at:performance.now()};
 const sound={perfect:'perfect',good:'good',offbeat:'offbeat',false_positive:'error',miss:'error',ok:null}[r.result];
 if(sound)audio.sfx(sound,null,r.result==='perfect'?.9:.7);
 if(r.result==='perfect'&&!prefs.reduced){for(let i=0;i<8;i++)particles.push({at:performance.now(),x:440,y:450,vx:(Math.random()-.5)*400,vy:-100-Math.random()*180,size:18+Math.random()*13,sprite:i%2?'spark':'star'});}
 if(run.training)announce(({perfect:'Perfeito.',good:'Bom.',offbeat:'Identificação correta, fora do tempo.',miss:'A mensagem suspeita passou.',false_positive:'Falso positivo.',ok:'Mensagem compatível deixada passar.'})[r.result]);
}
function pause(){
 if(scene==='playing'){
  if(run.ended)return;
  resumeAt=audio.time();audio.stop();setScene('paused');announce('Jogo pausado. A música e os eventos foram interrompidos.');
 }else if(scene==='paused')resume();
}
function resume(){
 if(scene!=='paused')return;
 const active=run.eventAt(resumeAt);
 if(active&&!active.resolved)resumeAt=active.readAt;
 setScene('resuming');resumeMode=true;
 const start=audio.ctx.currentTime+.12;resumeDeadline=start+4*run.beat;
 audio.play(resumeAt,resumeDeadline);
 for(let i=0;i<4;i++)audio.beep(start+i*run.beat,i===0);
}

function pauseScreen(now){
 gameplay(now,true);boxes=[];modal();
 txt('PAUSA',640,179,52,C.cream,'center',800);
 txt('O beat espera por você.',640,238,24,C.cyan,'center',600);
 txt('Ao continuar, haverá uma contagem de quatro batidas.',640,287,16,C.muted,'center',500,mono);
 button('resume','CONTINUAR',406,346,472,80,resume,'primary',{size:27});
 button('restart','REINICIAR',169,470,302,75,()=>begin(run.training),'cream',{size:22});
 button('settings','AJUSTES',491,470,302,75,()=>openSettings('paused'),'dark',{size:22});
 button('quit','MENU',813,470,302,75,()=>{audio.stop();run=null;setScene('menu');},'dark',{size:22});
 txt('ESPAÇO ou ESC para continuar',640,584,14,C.muted,'center',500,mono);
}
function endRun(){
 if(!run)return;audio.stop();summary={...run.summary(),version:'10.0.0',soundset:run.track.soundBank,soundsetName:run.track.soundName,musicKey:run.track.musicKey};if(!run.training&&summary.completed&&summary.score>(prefs.bests[run.track.id]||0)){prefs.bests[run.track.id]=summary.score;persist();}
 particles=[];setScene('results');
 const resultEvent=new CustomEvent('phishingbeat:result',{detail:JSON.parse(JSON.stringify(summary))});window.dispatchEvent(resultEvent);
 if(!run.training)window.parent.postMessage({source:'fortifica:arcade-game',version:1,type:'arcade:finished',game:'phishing-beat',trackId:summary.trackId,score:summary.score,mode:summary.mode,completed:summary.completed},location.origin);
 announce(`${summary.completed?'Faixa concluída.':'Tentativa encerrada.'} ${Math.round(summary.decisions||0)} por cento de decisões corretas. ${summary.score} pontos.`);
 audio.sfx(summary.completed?'perfect':'offbeat',null,.65);
}
function percent(n){return n===null?'–':Math.round(n)+'%';}
function results(){
 base(run?.track?.id);modal();image('label_'+(summary.completed?'clear':'failed'),374,121,527,94);
 txt(run.training?'SESSÃO DE TREINO  /  SEM RECORDE':run.track.name+' / '+run.bpm+' BPM / '+run.track.soundName,640,228,15,C.muted,'center',500,mono);
 const cols=[244,581,928];
 const row=(label,value,x,y,subtitle,color='digits')=>{
  txt(label,x,y,13,C.muted,'center',600,mono);digits(value,x,y+18,51,color,'center');if(subtitle)txt(subtitle,x,y+80,12,C.muted,'center',500,mono);
 };
 row('DECISÕES CORRETAS',percent(summary.decisions),cols[0],282,`${summary.tp+summary.tn} de ${summary.resolved} resolvidas`,'digits_cyan');
 row('REPORTES NO RITMO',percent(summary.rhythm),cols[1],282,'entre as suspeitas reportadas','digits_yellow');
 row('MAIOR COMBO','×'+summary.maxCombo,cols[2],282,'sequência de acertos');
 progress(180,389,919,1,'progress_base',2);
 row('PONTUAÇÃO',String(summary.score),cols[0],418,run.training?'Treino não altera o recorde':`Recorde desta fase: ${prefs.bests[run.track.id]||0}`);
 row('DETECÇÃO',percent(summary.detection),cols[1],418,`${summary.tp} reportadas / ${summary.tp+summary.fn} suspeitas`);
 row('FALSOS POSITIVOS',String(summary.fp),cols[2],418,`${summary.fp} de ${summary.fp+summary.tn} compatíveis`);
 const contentCount=summary.review.filter(r=>r.result!=='offbeat').length;
 txt(`${summary.resolved}/${summary.total} mensagens analisadas  ·  ${contentCount} erros de conteúdo  ·  ${summary.offbeat} fora do tempo`,640,547,13,C.muted,'center',500,mono);
 button('repeat','REPETIR',161,609,223,64,()=>begin(run.training),'primary',{size:21});
 button('review','REVISAR',397,609,225,64,()=>{reviewFilter='content';reviewIndex=0;setScene('review');},'cream',{size:21});
 const next=PBRhythms.tracks[run.track.number];
 button('nextStage','PRÓXIMA',635,609,229,64,()=>startRequest(run.training,next.id),'pink',{size:21,disabled:!next||!summary.completed});
 button('menu','FASES',877,609,237,64,()=>openTracks(false),'dark',{size:21});
}
function review(){
 base(run?.track?.id);modal();txt('REVISÃO SEM PRESSA',163,151,35,C.cream,'left',800);
 const content=summary.review.filter(r=>r.result!=='offbeat'),timing=summary.review.filter(r=>r.result==='offbeat');
 button('content','CONTEÚDO ('+content.length+')',164,202,328,58,()=>{reviewFilter='content';reviewIndex=0;uiStamp='';},reviewFilter==='content'?'primary':'dark',{size:18});
 button('timing','RITMO ('+timing.length+')',511,202,290,58,()=>{reviewFilter='timing';reviewIndex=0;uiStamp='';},reviewFilter==='timing'?'primary':'dark',{size:18});
 const list=reviewFilter==='content'?content:timing;reviewIndex=Math.max(0,Math.min(reviewIndex,list.length-1));const item=list[reviewIndex];
 if(item){
  image('evidence_v4',164,287,950,184);txt(item.category.toUpperCase(),190,307,12,C.cream,'left',700,mono);
  txt(item.primary,638,361,item.primary.length>30?28:34,C.navy,'center',600,mono);txt(item.secondary||'',638,402,14,C.ink,'center',500,mono);
  const expected=reviewFilter==='timing'?'IDENTIFICAÇÃO CORRETA':item.expected==='report'?'DEVERIA REPORTAR':'DEVERIA DEIXAR PASSAR';txt(expected,472,438,16,C.ink,'left',700);
  let desc=item.reason;if(reviewFilter==='timing')desc=`Você reconheceu a suspeita, mas reportou ${Math.abs(Math.round(item.deltaMs))} ms ${item.deltaMs<0?'antes':'depois'} da batida calibrada. Não houve perda de vida.`;wrap(desc,172,506,918,17,C.muted,28);txt(`${reviewIndex+1} / ${list.length}`,1006,236,17,C.muted,'center',500,mono);
 }else{image('icon_check',595,326,90,90);txt(reviewFilter==='content'?'Nenhum erro de conteúdo nesta tentativa.':'Nenhum reporte fora do tempo.',640,454,25,C.cyan,'center',600);txt('No mundo real, confirme por um canal conhecido antes de agir.',640,514,16,C.muted,'center',500,mono);}
 button('previous','ANTERIOR',164,611,239,62,()=>{reviewIndex--;},'dark',{size:18,disabled:!item||reviewIndex===0});button('nextcase','PRÓXIMO',420,611,239,62,()=>{reviewIndex++;},'dark',{size:18,disabled:!item||reviewIndex>=list.length-1});button('export','EXPORTAR JSON',677,611,234,62,exportResult,'cream',{size:17});button('backresult','VOLTAR',927,611,188,62,()=>setScene('results'),'primary',{size:18});
}

function exportResult(){
 if(!summary)return;const blob=new Blob([JSON.stringify(summary,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='phishing-beat-resultado.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Resultado exportado em JSON.');
}
function openSettings(from){settingsFrom=from;setScene('settings');}
function settings(){
 base();modal();txt('AJUSTES',163,156,36,C.cream,'left',800);
 const vol=(id,label,key,y)=>{
  txt(label,169,y+26,19,C.cream,'left',700);
  button(id+'Minus','−',473,y,72,58,()=>{prefs[key]=Math.max(0,prefs[key]-.1);persist();},'dark',{size:25});
  progress(565,y+23,300,prefs[key],'progress_fill',10);txt(Math.round(prefs[key]*100)+'%',963,y+26,20,C.cyan,'center',600,mono);
  button(id+'Plus','+',1005,y,84,58,()=>{prefs[key]=Math.min(1,prefs[key]+.1);persist();},'dark',{size:25});
 };
 vol('music','MÚSICA','music',205);vol('fx','EFEITOS','fx',275);vol('guide','GUIA DOS PASSOS','guide',345);
 txt('COMPENSAÇÃO',170,456,18,C.cream,'left',700);
 button('lessOffset','−',473,430,72,57,()=>{prefs.offset=Math.max(-250,prefs.offset-10);persist();},'dark',{size:25});
 txt((prefs.offset>0?'+':'')+prefs.offset+' ms',720,456,26,C.cyan,'center',600,mono);
 button('moreOffset','+',1005,430,84,57,()=>{prefs.offset=Math.min(250,prefs.offset+10);persist();},'dark',{size:25});
 txt('Positivo compensa um toque atrasado em relação à batida.',481,499,11,C.muted,'left',500,mono);
 txt('MOVIMENTO',170,550,18,C.cream,'left',700);
 button('motion',prefs.reduced?'REDUZIDO':'COMPLETO',474,520,366,63,()=>{prefs.reduced=!prefs.reduced;persist();},'cream',{size:19});
 button('testSound','TESTAR SOM',857,520,239,63,async()=>{try{await audio.init();applySound();audio.sfx('perfect');}catch(_){announce('Áudio indisponível neste navegador.');}},'dark',{size:18});
 button('calibrate','CALIBRAR BATIDA',165,611,383,63,()=>{calib=null;setScene('calibration');},'primary',{size:20});
 button('reset','PADRÃO',563,611,230,63,()=>{Object.assign(prefs,{music:.62,fx:.55,guide:.8,offset:0,reduced:defaults.reduced,muted:false});persist();},'dark',{size:19});
 button('back','VOLTAR',811,611,302,63,()=>{if(run)run.offset=prefs.offset;setScene(settingsFrom);},'cream',{size:21});
}
async function startCalibration(){
 try{await audio.init();applySound();audio.stop();audio.clearCues();const start=audio.ctx.currentTime+.75;calib={start,total:16,samples:[],lastBeat:-1,finished:false};for(let i=0;i<16;i++)audio.beep(start+i*.5,i%4===0);uiStamp='';}catch(_){announce('Não foi possível iniciar o som da calibração.');}
}
function calibrationTap(){
 if(!calib||calib.finished)return;const dt=audio.clock()-calib.start,beat=Math.round(dt/.5);
 if(beat<4||beat>=calib.total||beat===calib.lastBeat)return;const delta=(dt-beat*.5)*1000;if(Math.abs(delta)>250)return;
 calib.lastBeat=beat;calib.samples.push(delta);pressUntil=performance.now()+90;
}
function calibration(){
 base();modal();txt('ACERTE O TEMPO',640,156,39,C.cream,'center',800);
 txt('Ouça 4 batidas. Depois, toque no ritmo do clique.',640,217,18,C.muted,'center',500,mono);
 const dt=calib?audio.clock()-calib.start:0;
 if(calib&&dt>=calib.total*.5+.3)calib.finished=true;
 frame('pulse',prefs.reduced?0:Math.floor(((dt%.5)+.5)%.5*8),4,572,268,136,136);
 if(calib&&!calib.finished){txt(dt<2?'OUÇA…':'AGORA TOQUE',640,439,27,C.cyan,'center',800);txt(calib.samples.length+' toques registrados',640,480,16,C.muted,'center',500,mono);}
 else if(calib){
  const sorted=[...calib.samples].sort((a,b)=>a-b);const med=sorted.length?sorted[Math.floor(sorted.length/2)]:0;
  calib.value=Math.max(-250,Math.min(250,Math.round(med/10)*10));
  txt(sorted.length>=4?'AJUSTE SUGERIDO: '+(calib.value>0?'+':'')+calib.value+' ms':'POUCOS TOQUES. TENTE NOVAMENTE.',640,434,23,C.cyan,'center',700);
  txt('A calibração inclui a latência do dispositivo e o seu tempo de resposta.',640,478,13,C.muted,'center',500,mono);
 }else txt('Fones com fio costumam facilitar o ajuste.',640,453,18,C.muted,'center',500,mono);
 button('calTap',calib&&!calib.finished?'TOCAR / ESPAÇO':'INICIAR TESTE',394,513,492,71,()=>{if(calib&&!calib.finished)calibrationTap();else startCalibration();},'primary',{size:24});
 button('calBack','VOLTAR',163,611,289,63,()=>{calib=null;setScene('settings');},'dark',{size:21});
 button('calApply','APLICAR AJUSTE',726,611,388,63,()=>{prefs.offset=calib.value;persist();calib=null;setScene('settings');},'cream',{size:21,disabled:!calib?.finished||calib.samples.length<4});
}
function portrait(){
 if(innerWidth<innerHeight&&innerWidth<760){
 boxes=[];image('scrim',0,0,W,H,.94);txt('VIRE A TELA',640,259,45,C.cyan,'center',800);
 txt('Este jogo foi composto para o modo paisagem.',640,343,25,C.cream,'center',600);
 txt('Os indicadores precisam permanecer grandes e legíveis.',640,394,20,C.muted,'center',500,mono);
 button('full','TELA CHEIA',416,482,448,87,fullscreen,'primary',{size:25});
 }
}
function tick(now){
 const delta=Math.min(.1,(now-lastWall)/1000);lastWall=now;boxes=[];
 ctx.clearRect(0,0,W,H);
 if(scene==='menu')menu(now);
 else if(scene==='tracks'){if(previewStageId&&audio.time()>=previewEnd){audio.stop();previewStageId=null;}tracksScreen(now);}

 else if(scene==='briefing')briefing(now);
 else if(scene==='playing'){
  for(const r of run.advance(audio.time()))react(r);
  if(run.ended&&!finishDue)finishDue=now+(run.completed?160:850);
  gameplay(now);
  if(finishDue&&now>=finishDue){finishDue=0;endRun();}
 }else if(scene==='paused')pauseScreen(now);
 else if(scene==='resuming'){
  gameplay(now,true);boxes=[];image('scrim',0,0,W,H,.66);
  const remaining=Math.max(0,resumeDeadline-audio.clock());
  digits(Math.max(1,Math.ceil(remaining/run.beat)),640,290,115,'digits_yellow','center');
  txt('RETOMANDO O BEAT',640,443,22,C.cream,'center',800);
  if(remaining<=0){resumeMode=false;setScene('playing');}
 }else if(scene==='results')results();else if(scene==='review')review();else if(scene==='settings')settings();else if(scene==='calibration')calibration();
 else {base();image('logo',310,196,660,220);txt('PREPARANDO O SOM…',640,474,21,C.cyan,'center',600);}
 particles=particles.filter(p=>now-p.at<800);
 portrait();syncControls();requestAnimationFrame(tick);
}
function syncControls(){
 const stamp=scene+'|'+boxes.map(b=>b.id+':'+b.label+':'+b.disabled).join('|');
 if(stamp===uiStamp)return;uiStamp=stamp;
 const old=controls.contains(document.activeElement)?document.activeElement.dataset.control:null;
 controls.replaceChildren();
 for(const b of boxes){
  const el=document.createElement('button');el.type='button';el.textContent=b.label;el.dataset.control=b.id;el.disabled=b.disabled;
  el.addEventListener('focus',()=>{focused=b.id;});el.addEventListener('blur',()=>{focused='';});
  el.addEventListener('click',()=>{const current=boxes.find(x=>x.id===b.id);if(current&&!current.disabled)current.fn();});
  controls.appendChild(el);
 }
 if(old){const el=[...controls.children].find(x=>x.dataset.control===old);if(el&&!el.disabled)el.focus({preventScroll:true});}
}
function coords(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};}
function boxAt(p){return [...boxes].reverse().find(b=>!b.disabled&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h);}
canvas.addEventListener('pointermove',e=>{const hit=boxAt(coords(e));hover=hit?.id||'';canvas.style.cursor=hit?'pointer':'default';});
canvas.addEventListener('pointerleave',()=>{hover='';});
canvas.addEventListener('pointerdown',e=>{
 if(heldPointer!==null)return;e.preventDefault();const hit=boxAt(coords(e));if(!hit)return;heldPointer=e.pointerId;armed=hit.id;canvas.setPointerCapture?.(e.pointerId);
 if(hit.id==='report'||hit.id==='calTap'&&calib&&!calib.finished){hit.fn();armed=null;}
});
canvas.addEventListener('pointerup',e=>{if(e.pointerId!==heldPointer)return;const hit=boxAt(coords(e)),action=armed;heldPointer=null;armed=null;if(hit&&hit.id===action){audio.sfx('ui',null,.36);hit.fn();}});
canvas.addEventListener('pointercancel',()=>{heldPointer=null;armed=null;});
document.addEventListener('keydown',e=>{
 if(e.code==='Escape'){
  e.preventDefault();if(scene==='playing'||scene==='paused')pause();else if(scene==='settings'){if(run)run.offset=prefs.offset;setScene(settingsFrom);}else if(scene==='review')setScene('results');else if(scene==='calibration'){calib=null;setScene('settings');}else if(scene==='tracks'){audio.stop();previewStageId=null;previewToken++;setScene('menu');}return;
 }
 if(e.code==='KeyM'&&!e.repeat){prefs.muted=!prefs.muted;persist();return;}
 if(e.code==='Space'){
  const target=document.activeElement;if(target?.tagName==='BUTTON'&&!['report','resume','calTap'].includes(target.dataset.control))return;
  if(['playing','paused','calibration'].includes(scene)){
   e.preventDefault();if(e.repeat||spaceHeld)return;spaceHeld=true;
   if(scene==='playing')report();else if(scene==='paused')resume();else if(scene==='calibration'){if(calib&&!calib.finished)calibrationTap();else startCalibration();}
  }
 }
 if(e.code==='Enter'&&!e.repeat&&scene==='menu'&&document.activeElement?.tagName!=='BUTTON')openTracks(false);
});
document.addEventListener('keyup',e=>{if(e.code==='Space')spaceHeld=false;});
function lostFocus(){spaceHeld=false;heldPointer=null;armed=null;if(scene==='playing')pause();else if(scene==='resuming'){audio.stop();resumeMode=false;setScene('paused');}else if(scene==='tracks'&&previewStageId){audio.stop();previewStageId=null;previewToken++;}}
window.addEventListener('blur',lostFocus);document.addEventListener('visibilitychange',()=>{if(document.hidden)lostFocus();});
function resize(){
 const rect=canvas.getBoundingClientRect();
 const dpr=Math.max(1,window.devicePixelRatio||1);
 // Render at the actual physical pixel density of the displayed canvas instead
 // of always stretching a 1280x720 buffer on 1080p/1440p/4K monitors.
 const neededX=(rect.width||W)*dpr/W,neededY=(rect.height||H)*dpr/H;
 const renderScale=Math.min(4,Math.max(1,neededX,neededY));
 const bw=Math.max(W,Math.round(W*renderScale)),bh=Math.max(H,Math.round(H*renderScale));
 if(canvas.width!==bw||canvas.height!==bh){canvas.width=bw;canvas.height=bh;}
 ctx.setTransform(renderScale,0,0,renderScale,0,0);
 ctx.imageSmoothingEnabled=true;
 if('imageSmoothingQuality' in ctx)ctx.imageSmoothingQuality='high';
 canvas.dataset.renderScale=renderScale.toFixed(3);
}
window.addEventListener('resize',()=>{resize();if(innerWidth<innerHeight&&innerWidth<760&&scene==='playing')pause();});resize();
async function load(){
 try{
  await Promise.all(Object.entries(PBAssets.images).map(([key,uri])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[key]=im;resolve();};im.onerror=()=>reject(new Error('Asset inválido: '+key));im.src=uri;})));
  applySound();document.getElementById('boot').hidden=true;setScene('menu');requestAnimationFrame(tick);
  // Explicit test-only hooks. Not enabled in normal use, and never used to generate a score automatically.
  if(new URLSearchParams(location.search).has('test'))window.__PB_TEST__={begin,openTracks,previewStage,get selectedStage(){return selectedStage;},get previewStageId(){return previewStageId;},motionAt:PBRhythms.motionAt,setTime(t){audio.stop();audio.offset=t;},report,pause,resume,finish:endRun,get run(){return run;},get scene(){return scene;},get summary(){return summary;},get boxes(){return boxes.map(({fn,...b})=>b);},audio,prefs,images};
 }catch(e){document.getElementById('boot').textContent='Não foi possível carregar os sprites. Extraia todo o ZIP e tente abrir index.html novamente.';console.error(e);}
}
load();
})();
