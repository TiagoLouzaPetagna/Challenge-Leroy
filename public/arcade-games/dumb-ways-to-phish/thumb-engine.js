// Judge the requested action itself. No unseen sender history or trusted-channel premise.
export const SCENARIOS = [
 {message:'Me passe o código de login que chegou por SMS.',button:'CONTINUAR',scam:true,why:'O pedido é repassar um código de acesso a outra pessoa.'},
 {message:'Código de acesso: 482 196. Não compartilhe com ninguém.',button:'FECHAR AVISO',scam:false,why:'Fechar o aviso não envia nem compartilha o código.'},
 {message:'Mande sua senha neste chat para corrigirmos sua conta.',button:'CONTINUAR',scam:true,why:'O pedido é enviar sua senha pelo chat. Não a compartilhe.'},
 {message:'Quer salvar esta mensagem como rascunho, sem enviar?',button:'SALVAR',scam:false,why:'Salvar um rascunho não envia a mensagem a ninguém.'},
 {message:'Faça um Pix para receber seu reembolso.',button:'CONTINUAR',scam:true,why:'O pedido exige pagar antes de receber um suposto reembolso.'},
 {message:'Quer ver uma prévia da mensagem antes de enviar?',button:'CONTINUAR',scam:false,why:'A ação é apenas revisar o texto antes de enviá-lo.'},
 {message:'Desative o antivírus para abrir este comprovante.',button:'ABRIR',scam:true,why:'O pedido manda desligar uma proteção para abrir um arquivo.'},
 {message:'O suporte nunca pede sua senha por mensagem.',button:'ENTENDI',scam:false,why:'É um lembrete de segurança. O botão apenas fecha o aviso.'},
 {message:'Instale o APK deste chat para atualizar seu banco.',button:'ATUALIZAR',scam:true,why:'O pedido manda instalar um arquivo recebido no chat, fora da loja de aplicativos.'},
 {message:'Quer aumentar o tamanho das letras desta conversa?',button:'AJUSTAR',scam:false,why:'A ação só altera o tamanho do texto exibido.'},
 {message:'Envie foto do cartão, frente e verso, para liberar o prêmio.',button:'CONTINUAR',scam:true,why:'A foto pode expor os dados do cartão. Um prêmio não justifica esse pedido.'},
 {message:'Quer marcar esta conversa como não lida?',button:'CONFIRMAR',scam:false,why:'Marcar como não lida apenas organiza suas conversas.'},
 {message:'Pague a taxa de seleção para garantir esta vaga de emprego.',button:'GARANTIR VAGA',scam:true,why:'A promessa de vaga garantida em troca de pagamento é um sinal de golpe.'},
 {message:'Quer arquivar esta conversa sem apagar as mensagens?',button:'ARQUIVAR',scam:false,why:'A ação organiza a conversa sem enviar dados ou dinheiro.'},
 {message:'Digite a senha do seu e-mail para baixar este cardápio.',button:'VER CARDÁPIO',scam:true,why:'Baixar um cardápio não exige entregar a senha do seu e-mail.'},
 {message:'Quer mostrar apenas as mensagens ainda não lidas?',button:'MOSTRAR',scam:false,why:'A ação apenas filtra a lista de mensagens.'},
 {message:'Compartilhe a tela enquanto digita a senha do banco.',button:'CONTINUAR',scam:true,why:'O pedido pode expor sua senha e informações bancárias.'},
 {message:'Quer mudar esta conversa para o tema escuro?',button:'CONTINUAR',scam:false,why:'A ação só muda a aparência da conversa.'},
 {message:'Mande o código de recuperação da sua conta para o suporte.',button:'ENVIAR',scam:true,why:'Um código de recuperação pode permitir que outra pessoa entre na conta.'},
 {message:'Quer silenciar os avisos desta conversa por uma hora?',button:'CONFIRMAR',scam:false,why:'A ação apenas pausa as notificações desta conversa por um período definido.'},
];
export const roundDuration = n => Math.max(6000, 11000 - (n - 1) * 240);
export function dragDirection(dx,dy,threshold=60){
 if(!Number.isFinite(dx)||!Number.isFinite(dy)||Math.abs(dx)<threshold||Math.abs(dx)<=Math.abs(dy))return null;
 return dx<0?'left':'right';
}
export class ThumbGame {
 constructor(rng=Math.random){this.rng=rng;this.status='ready';this.score=0;this.lives=3;this.round=0;this.correct=0;this.events=[];this.remaining=0;this.elapsed=0;this.reaction=null;this.bag=[];}
 start({score=0,lives=3,round=1,rounds=Infinity}={}){this.score=score;this.lives=lives;this.correct=0;this.events=[];this.bag=[];this.rule=null;this.lastRound=round+rounds-1;this.nextRound(round);}
 nextRound(n){
  if(!this.bag.length){this.bag=SCENARIOS.map((_,i)=>i);for(let i=this.bag.length-1;i>0;i--){const j=Math.min(i,Math.floor(this.rng()*(i+1)));[this.bag[i],this.bag[j]]=[this.bag[j],this.bag[i]];}if(this.bag.at(-1)===this.rule?.id)this.bag.reverse();}
  const id=this.bag.pop();this.rule={...SCENARIOS[id],id,duration:roundDuration(n)};
  this.round=n;this.elapsed=0;this.remaining=this.rule.duration;this.reaction=null;this.status='running';this.events.push({type:'round'});
 }
 choose(direction,handX=null){if(this.status!=='running'||!['left','right'].includes(direction))return false;this.resolve(direction==='right',handX);return true;}
 resolve(blocked,handX=null){
  const good=blocked===this.rule.scam,points=good?100+Math.min(50,(this.round-1)*2):0;
  this.score+=points;if(good)this.correct++;else this.lives--;
  this.reaction={blocked,good,age:0,progress:1-this.remaining/this.rule.duration,handX};this.status='draining';this.clock=good?2200:3400;
  this.events.push({type:'decision',good,blocked,points});
 }
 pause(){if(['running','draining'].includes(this.status)){this.beforePause=this.status;this.status='paused';}}
 resume(){if(this.status==='paused')this.status=this.beforePause;}
 stop(){this.status='ready';this.events=[];this.reaction=null;}
 drain(){return this.events.splice(0);}
 step(ms){
  if(!Number.isFinite(ms)||ms<=0)return;
  if(this.status==='draining'){this.reaction.age+=ms;this.clock-=ms;if(this.clock<=0){if(this.lives===0){this.status='over';this.events.push({type:'over'});}else if(this.round>=this.lastRound){this.status='complete';this.events.push({type:'complete'});}else this.nextRound(this.round+1);}return;}
  if(this.status!=='running')return;this.elapsed+=ms;this.remaining=Math.max(0,this.remaining-ms);if(this.remaining===0)this.resolve(false);
 }
}

