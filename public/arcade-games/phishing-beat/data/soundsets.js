/* Phishing Beat V7 — internal sound palettes only.
 * Palettes are assigned by stage; there is no player-facing sound laboratory.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PBSoundsets=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const sets=[
 {id:'original',name:'DIGITAL ORIGINAL',short:'ORIGINAL',color:'cyan'},
 {id:'groove',name:'BAIXO & TECLAS',short:'BAIXO & TECLAS',color:'green'},
 {id:'madeira',name:'MADEIRA & PELE',short:'MADEIRA & PELE',color:'yellow'},
 {id:'office',name:'ESCRITÓRIO MIX',short:'ESCRITÓRIO MIX',color:'cream'}
];
const musicKeys=['passo-a-passo','contratempo','para-e-vai','swing-remetente--groove','trinca-332-madeira','chamada-resposta-office'];
function get(id='original'){return sets.find(s=>s.id===id)||sets[0];}
function forTrack(track){return get(track?.soundBank||'original');}
function musicKey(track){return track?.musicKey||track?.audio||musicKeys[0];}
function isMusic(key){return musicKeys.includes(key);}
return {version:'7.0.0',sets,get,forTrack,musicKey,isMusic,musicKeys};
});
