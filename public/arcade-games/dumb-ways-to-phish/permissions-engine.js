export const PERMISSIONS = {
  photos: 'Fotos', camera: 'Câmera', contacts: 'Contatos', messages: 'Mensagens',
  location: 'Localização', notifications: 'Notificações', microphone: 'Microfone',
  files: 'Arquivos', calendar: 'Calendário',
};

// Every request describes a concrete task, so only one of its three accesses is unjustified.
export const REQUESTS = [
  {id:'photo', name:'Editor de fotos', purpose:'Edita fotos salvas no celular, mesmo sem internet.', icon:'photos', choices:['photos','camera','contacts'], abuse:'contacts', reason:'Editar fotos não exige acesso aos seus contatos.'},
  {id:'qr', name:'Leitor de QR', purpose:'Lê códigos QR com a câmera e abre imagens salvas.', icon:'qr', choices:['camera','photos','messages'], abuse:'messages', reason:'Ler códigos QR não exige ler suas mensagens.'},
  {id:'map', name:'Mapa de ruas', purpose:'Mostra sua posição e avisa sobre o trânsito.', icon:'location', choices:['location','notifications','messages'], abuse:'messages', reason:'Um mapa não precisa ler suas mensagens.'},
  {id:'recorder', name:'Gravador de voz', purpose:'Grava áudio e salva os arquivos no celular.', icon:'microphone', choices:['microphone','files','location'], abuse:'location', reason:'Gravar voz não exige sua localização.'},
  {id:'agenda', name:'Agenda simples', purpose:'Organiza eventos e lembra você dos horários.', icon:'calendar', choices:['calendar','notifications','camera'], abuse:'camera', reason:'Uma agenda não precisa ligar a câmera.'},
  {id:'call', name:'Videochamada', purpose:'Faz chamadas com voz e imagem.', icon:'video', choices:['camera','microphone','messages'], abuse:'messages', reason:'Uma videochamada não precisa ler suas mensagens.'},
  {id:'scanner', name:'Scanner de páginas', purpose:'Fotografa documentos e salva cópias no celular.', icon:'camera', choices:['camera','files','contacts'], abuse:'contacts', reason:'Digitalizar páginas não exige acesso aos contatos.'},
  {id:'birthday', name:'Lembrete de datas', purpose:'Consulta sua agenda e avisa sobre eventos marcados.', icon:'calendar', choices:['calendar','notifications','photos'], abuse:'photos', reason:'Avisar sobre eventos não exige acesso às suas fotos.'},
  {id:'voicecall', name:'Chamada de voz', purpose:'Liga para pessoas dos seus contatos usando o microfone.', icon:'microphone', choices:['contacts','microphone','location'], abuse:'location', reason:'Uma chamada de voz não precisa da sua localização.'},
  {id:'album', name:'Álbum pessoal', purpose:'Mostra suas fotos e salva álbuns no celular.', icon:'photos', choices:['photos','files','messages'], abuse:'messages', reason:'Organizar fotos não exige ler suas mensagens.'},
  {id:'planner', name:'Lista de tarefas', purpose:'Organiza tarefas no calendário e lembra os prazos.', icon:'calendar', choices:['calendar','notifications','camera'], abuse:'camera', reason:'Lembrar tarefas não exige ligar a câmera.'},
  {id:'route', name:'Guia de rotas', purpose:'Mostra onde você está e avisa sobre mudanças no trajeto.', icon:'location', choices:['location','notifications','contacts'], abuse:'contacts', reason:'Indicar rotas não exige acesso aos contatos.'},
  {id:'music', name:'Música local', purpose:'Toca arquivos de áudio salvos e mostra controles de reprodução.', icon:'files', choices:['files','notifications','contacts'], abuse:'contacts', reason:'Tocar músicas salvas não exige acesso aos contatos.'},
  {id:'postcard', name:'Cartão com foto', purpose:'Escolhe uma imagem salva e envia por mensagem.', icon:'photos', choices:['photos','messages','location'], abuse:'location', reason:'Enviar uma foto por mensagem não exige sua localização.'},
];

const shuffle=(items,rng)=>{
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.min(i,Math.floor(rng()*(i+1)));[result[i],result[j]]=[result[j],result[i]];}
  return result;
};
export const roundDuration=round=>Math.max(5700,10000-(round-1)*190);

export function makePermissionRound(round=1,rng=Math.random,request=REQUESTS[0]){
  return {...request,round,choices:shuffle(request.choices,rng),duration:roundDuration(round)};
}

export class PermissionsGame {
  constructor(rng=Math.random){
    this.rng=rng;this.status='ready';this.score=0;this.lives=3;this.round=0;
    this.correct=0;this.remaining=0;this.events=[];this.bag=[];this.rule=null;this.reaction=null;
  }
  start({score=0,lives=3,round=1,rounds=Infinity}={}){this.score=score;this.lives=lives;this.round=round-1;this.lastRound=round+rounds-1;this.correct=0;this.bag=[];this.events=[];this.nextRound();}
  nextRound(){
    if(!this.bag.length){this.bag=shuffle(REQUESTS,this.rng);if(this.bag.at(-1)?.id===this.rule?.id)this.bag.reverse();}
    this.round++;this.rule=makePermissionRound(this.round,this.rng,this.bag.pop());
    this.remaining=this.rule.duration;this.reaction=null;this.status='running';this.events.push({type:'round'});
  }
  choose(index){
    if(this.status!=='running'||!Number.isInteger(index)||index<0||index>2)return false;
    this.resolve(index);return true;
  }
  resolve(index){
    const chosen=index===null?null:this.rule.choices[index];
    const good=chosen===this.rule.abuse;
    const points=good?100+Math.round(70*this.remaining/this.rule.duration)+Math.min(100,(this.round-1)*5):0;
    if(good){this.score+=points;this.correct++;}else this.lives--;
    this.reaction={index,chosen,good,age:0};this.status='resolving';this.resolveRemaining=good?1250:1650;
    this.events.push({type:'decision',good,index,points,reason:this.rule.reason,timeout:index===null});
  }
  pause(){if(this.status==='running'||this.status==='resolving'){this.beforePause=this.status;this.status='paused';}}
  resume(){if(this.status==='paused')this.status=this.beforePause;}
  stop(){this.status='ready';this.events=[];this.reaction=null;}
  drain(){return this.events.splice(0);}
  step(ms){
    if(!Number.isFinite(ms)||ms<=0)return;
    if(this.status==='running'){
      this.remaining=Math.max(0,this.remaining-ms);
      if(this.remaining===0)this.resolve(null);
    }else if(this.status==='resolving'){
      this.reaction.age+=ms;this.resolveRemaining-=ms;
      if(this.resolveRemaining<=0){if(this.lives<=0){this.status='over';this.events.push({type:'over'});}else if(this.round>=this.lastRound){this.status='complete';this.events.push({type:'complete'});}else this.nextRound();}
    }
  }
}
