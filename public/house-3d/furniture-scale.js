export const FURNITURE_SCALE=1.35;
const sources=new WeakMap();
const scaleSurface=(surface,factor)=>{
  const result={...surface};
  for(const key of ['height','width','depth','radius','x','z','clearanceHeight'])if(typeof result[key]==='number')result[key]*=factor;
  return result;
};
export function setFurnitureScale(catalog,factor=FURNITURE_SCALE){
  for(const item of catalog){
    if(!item.asset)continue;
    if(item.nativeScale){item.visualScale=1;continue;}
    if(!sources.has(item))sources.set(item,JSON.parse(JSON.stringify(item)));
    const source=sources.get(item);
    for(const key of ['width','depth','height'])item[key]=source[key]*factor;
    item.visualScale=factor;
    if(source.surface)item.surface=scaleSurface(source.surface,factor);
    if(source.surfaces)item.surfaces=source.surfaces.map(s=>scaleSurface(s,factor));
  }
}
