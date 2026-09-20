/* V3 audio transport. All cues and music use one audio timeline. Short samples
 * are loaded once; full tracks decode lazily into an LRU of at most 3 buffers.
 * A/B switching reuses the transport origin with a 65ms crossfade. No tempo or
 * playbackRate changes to the backing track. See docs/AUDIO_V3.md.
 */
(function(root){'use strict';
class AudioEngine{
 constructor(assets){
  this.assets=assets;this.ctx=null;this.track=null;this.tracks={};this.sounds={};this.source=null;this.sourceGain=null;this.voices=new Set();
  this.startCtx=0;this.offset=0;this.playing=false;this.musicVolume=.62;this.fxVolume=.55;this.guideVolume=.8;this.muted=false;this.focus='mix';
  this.pending=null;this.available=true;this.error='';this.cues=[];this.score=[];this.lastTime=0;this.trackKey='';this.bank='original';this.loading=new Map();this.lru=[];
 }
 async decode(data){
  if(data&&typeof data==='object'&&data.url){const response=await fetch(data.url);if(!response.ok)throw Error('Asset indisponível: '+data.url);return this.ctx.decodeAudioData(await response.arrayBuffer());}
  const raw=atob(data),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return this.ctx.decodeAudioData(bytes.buffer);
 }
 async init(){
  if(this.ctx){if(this.ctx.state==='suspended')await this.ctx.resume();return this.pending;}
  const C=root.AudioContext||root.webkitAudioContext;
  if(!C){this.available=false;this.error='Este navegador não oferece Web Audio.';throw Error(this.error);}
  this.ctx=new C({latencyHint:'interactive'});
  this.musicGain=this.ctx.createGain();this.fxGain=this.ctx.createGain();this.guideGain=this.ctx.createGain();this.master=this.ctx.createGain();
  this.limiter=this.ctx.createDynamicsCompressor();this.limiter.threshold.value=-5;this.limiter.knee.value=3;this.limiter.ratio.value=10;this.limiter.attack.value=.003;this.limiter.release.value=.10;
  this.musicGain.connect(this.limiter);this.fxGain.connect(this.limiter);this.guideGain.connect(this.limiter);this.limiter.connect(this.master);this.master.connect(this.ctx.destination);this.applyVolumes();
  this.pending=(async()=>{
   for(const [k,v] of Object.entries(this.assets.audio)){if(!root.PBSoundsets.isMusic(k))this.sounds[k]=await this.decode(v);}
  })();
  await this.ctx.resume();await this.pending;
 }
 async prepare(key){
  await this.init();
  if(!this.assets.audio[key]||!root.PBSoundsets.isMusic(key))throw Error('Faixa de áudio indisponível: '+key);
  if(!this.tracks[key]){
   if(!this.loading.has(key))this.loading.set(key,this.decode(this.assets.audio[key]).then(buffer=>{this.tracks[key]=buffer;this.loading.delete(key);return buffer;}).catch(e=>{this.loading.delete(key);throw e;}));
   await this.loading.get(key);
  }
  this.lru=this.lru.filter(k=>k!==key);this.lru.push(key);
  while(this.lru.length>3){const old=this.lru.shift();delete this.tracks[old];}
  return this.tracks[key];
 }
 configure(key,score=[],bank=this.bank){
  if(!this.tracks[key])throw Error('Prepare o áudio antes de configurar: '+key);
  this.stop();this.trackKey=key;this.track=this.tracks[key];this.score=score;this.bank=bank;
 }
 applyVolumes(){
  if(!this.ctx)return;const t=this.ctx.currentTime;
  this.musicGain.gain.setTargetAtTime(this.focus==='guide'?0:this.musicVolume,t,.025);
  this.guideGain.gain.setTargetAtTime(this.focus==='music'?0:this.guideVolume,t,.025);
  this.fxGain.gain.setTargetAtTime(this.fxVolume,t,.025);this.master.gain.setTargetAtTime(this.muted?0:.88,t,.02);
 }
 setFocus(focus){this.focus=['mix','music','guide'].includes(focus)?focus:'mix';this.applyVolumes();}
 clock(){
  if(!this.ctx)return 0;
  if(this.ctx.getOutputTimestamp){const ts=this.ctx.getOutputTimestamp();if(ts.performanceTime>0&&ts.contextTime>0){const estimate=ts.contextTime+(performance.now()-ts.performanceTime)/1000;return Math.min(this.ctx.currentTime,estimate);}}
  return this.ctx.currentTime-(this.ctx.outputLatency||this.ctx.baseLatency||0);
 }
 voice(buffer,when,offset,fade=false){
  const source=this.ctx.createBufferSource(),gain=this.ctx.createGain();source.buffer=buffer;source.connect(gain);gain.connect(this.musicGain);
  gain.gain.setValueAtTime(fade?0:1,when);if(fade)gain.gain.linearRampToValueAtTime(1,when+.065);
  source.start(when,offset);const voice={source,gain};this.voices.add(voice);
  source.onended=()=>{source.disconnect();gain.disconnect();this.voices.delete(voice);};
  this.source=source;this.sourceGain=gain;return voice;
 }
 cueRate(c){if(this.bank==='original'||c.name==='land')return c.rate;return c.rate>1.15?Math.pow(2,5/12):c.rate>1.05?Math.pow(2,3/12):1;}
 schedule(from,notBefore=0){
  for(const c of this.score){if(c.at>=from-1e-7){const when=this.startCtx+c.at-this.offset;if(when+1e-6<notBefore)continue;
   const source=this.sfx(c.name,when,c.gain,this.cueRate(c),true);if(source)this.cues.push(source);
  }}
 }
 play(offset=0,when=null){
  this.stop();if(!this.track)return;
  this.offset=Math.max(0,Math.min(offset,this.track.duration-.02));this.lastTime=this.offset;
  this.startCtx=when===null?this.ctx.currentTime+.12:Math.max(this.ctx.currentTime+.01,when);
  this.voice(this.track,this.startCtx,this.offset);this.playing=true;this.schedule(this.offset);
 }
 switchMusic(key,bank,score=this.score){
  if(!this.tracks[key])throw Error('Faixa ainda não preparada: '+key);
  if(!this.playing){this.configure(key,score,bank);return;}
  const when=this.ctx.currentTime+.065,at=this.offset+when-this.startCtx;
  if(at<0||at>=this.tracks[key].duration-.15){this.configure(key,score,bank);this.play(0);return;}
  const old=[...this.voices];
  this.track=this.tracks[key];this.trackKey=key;this.bank=bank;this.score=score;
  this.voice(this.track,when,at,true);
  for(const v of old){v.gain.gain.cancelScheduledValues(when);v.gain.gain.setValueAtTime(1,when);v.gain.gain.linearRampToValueAtTime(0,when+.065);try{v.source.stop(when+.07);}catch(_){}}
  this.clearCues(when);this.schedule(at,when);
 }
 time(){if(!this.playing)return this.offset;this.lastTime=Math.max(this.lastTime,this.offset+this.clock()-this.startCtx);return this.lastTime;}
 stop(){
  if(this.playing)this.offset=this.time();this.playing=false;
  for(const v of this.voices){try{v.source.stop();}catch(_){}v.source.disconnect();v.gain.disconnect();}this.voices.clear();this.source=null;this.sourceGain=null;this.clearCues();
 }
 sampleKey(name){const key=this.bank+'__'+name;return this.sounds[key]?key:name;}
 sfx(name,when=null,gain=1,rate=1,guide=false){
  if(!this.ctx)return null;const key=this.sampleKey(name),buffer=this.sounds[key];if(!buffer)return null;
  const source=this.ctx.createBufferSource();source.buffer=buffer;source.playbackRate.value=rate;
  const g=this.ctx.createGain();g.gain.value=gain;source.connect(g);g.connect(guide?this.guideGain:this.fxGain);
  source.onended=()=>{source.disconnect();g.disconnect();const i=this.cues.indexOf(source);if(i>=0)this.cues.splice(i,1);};
  source._pbSample=key;source._pbAt=Math.max(when===null?this.ctx.currentTime:when,this.ctx.currentTime);source.start(source._pbAt);return source;
 }
 beep(when,high=false){const source=this.sfx('tick',when,high?.7:.42,high?1.3:1,true);if(source)this.cues.push(source);}
 clearCues(when=null){for(const source of [...this.cues]){try{source.stop(when===null?0:when);}catch(_){}}this.cues=[];}
}
root.PBAudio=AudioEngine;
})(window);
