export const customColorFields=['hairColor','eyeColor','topColor','bottomColor','shoeColor','accentColor'];
// Keep the original hairstyle; overlap its edge beneath the curved hat silhouette.
export function hairMask(data,c){
 if(!data.hairClipY?.[c.accessory])return null;
 if(c.accessory==='helice')return Array(data.width).fill(data.hairClipY.helice);
 const edge=new Int16Array(data.width).fill(-1);
 for(const [x,y,w,index] of data.pieces.accessory[c.accessory])if(index)for(let xx=x;xx<x+w;xx++)edge[xx]=Math.max(edge[xx],y);
 const left=edge.findIndex(y=>y>=0);let right=edge.length-1;while(edge[right]<0)right--;
 return Array.from(edge,(y,x)=>y>=0?Math.max(0,y-2):Math.max(0,edge[x<left?left:right]-2+Math.floor(Math.abs(x-(x<left?left:right))/2)));
}
export const isHexColor=value=>typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value);
export function colorRamp(data,field,value){
 if(!customColorFields.includes(field)||!isHexColor(value))return data.ramps[field][value];
 const base=value.slice(1).toLowerCase();if(field==='eyeColor')return base;
 const mix=(target,amount)=>[0,2,4].map(i=>Math.round(parseInt(base.slice(i,i+2),16)*(1-amount)+parseInt(target.slice(i,i+2),16)*amount).toString(16).padStart(2,'0')).join('');
 return [mix('151020',.38),base,mix('fff0d7',.32),...(field==='hairColor'?[mix('fff0d7',.56)]:[])];
}
export function colors(data,c){const r=field=>colorRamp(data,field,c[field]);return ['00000000','332b3f',...r('skin'),r('skin')[0],...r('hairColor'),...r('topColor'),...r('bottomColor'),...r('shoeColor'),'2d2839',r('eyeColor'),'fff0d7',...r('accentColor'),'e8c17d'];}
export function pixels(data,c){const mask=hairMask(data,c);const out=new Uint8ClampedArray(data.width*data.height*4);const p=colors(data,c).map((v,i)=>i?[parseInt(v.slice(0,2),16),parseInt(v.slice(2,4),16),parseInt(v.slice(4,6),16),255]:[0,0,0,0]);for(const layer of data.order){if(layer==='bottom'&&data.bottomHiddenByTop?.[c.top])continue;const variant=layer==='body'?'base':layer==='hairBack'||layer==='hairFront'?c.hair:layer==='face'?[c.face,c.eyeShape,c.nose].join(':'):c[layer];for(const [x,y,w,color] of data.pieces[layer][variant]){for(let xx=x;xx<x+w;xx++){if(layer.startsWith('hair')&&mask&&y<mask[xx])continue;out.set(p[color],(y*data.width+xx)*4);}}}return out;}
export function randomize(data,current,rng=Math.random){return Object.fromEntries(Object.entries(data.options).map(([key,values])=>{const pool=values.filter(v=>v!==current[key]);return [key,pool.length?pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))]:values[0]];}));}
export function validate(data,patch){for(const [key,value]of Object.entries(patch)){if(!data.options[key]?.includes(value)&&!(customColorFields.includes(key)&&isHexColor(value)))throw new Error('Opção inválida: '+key);}return patch;}
