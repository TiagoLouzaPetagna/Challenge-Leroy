import {CARDS} from './cards.js';
export const KEYS=['caixa','equipe','reputacao','seguranca'];
export const LABELS=['Caixa','Equipe','Reputação','Segurança'];
export const ACTORS=['Financeiro','TI e Segurança','Equipe','Comercial','Direção','Veterano','Consultora','Cliente recorrente'];
export const VERSION=1;
const clone=x=>JSON.parse(JSON.stringify(x));
const N=(prefix,n)=>`${prefix}-${String(n).padStart(2,'0')}`;
export function random(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
const pick=(s,a)=>a[Math.floor(random(s)*a.length)];
export function newGame(seed=Date.now()){
 const s={version:VERSION,seed:seed>>>0,week:0,bars:{caixa:52,equipe:54,reputacao:48,seguranca:52},queue:[],seen:{},flags:{},arcs:{},ledger:{},history:[],current:null,ending:null,feedback:null,contacts:['Ponto Norte'],characters:['Direção'],endings:[],serial:0};
 next(s);return s;
}
function mark(s,...names){for(const n of names)if(!s.contacts.includes(n))s.contacts.push(n);}
function queue(s,id,min=1,max=min,optional=false,tag=id){if(s.queue.some(q=>q.tag===tag))return;const due=s.week+min+Math.floor(random(s)*(max-min+1));s.queue.push({id,due,optional,tag,order:++s.serial});}
function cancel(s,prefix){s.queue=s.queue.filter(q=>!q.id.startsWith(prefix));}
function money(s,key,amount){if(s.ledger[key])return;s.ledger[key]=true;change(s,{caixa:amount});}
function change(s,values,excess=[]){for(const [k,v]of Object.entries(values)){let n=s.bars[k]+v;if(v>0&&!excess.includes(k))n=Math.min(95,Math.max(s.bars[k],n));s.bars[k]=Math.max(0,Math.min(100,n));}}
function ended(s){for(const k of KEYS)if(s.bars[k]===0||s.bars[k]===100){s.ending=`FIM-${k.toUpperCase()}-${s.bars[k]}`;s.endings.push(s.ending);s.current=null;return true;}return false;}
function initialize(s,p){if(s.arcs[p])return;const variants={AUT:['adequada','suporte','preco_temporario'],CON:['organizado','expansivo','pagamento_lento'],ARQ:['credito','promessa','acesso_antigo'],VIT:['merito','patrocinio','exposicao']};s.arcs[p]={variant:pick(s,variants[p]),status:'aberta'};if(p==='AUT')mark(s,'NexoFluxo');if(p==='CON')mark(s,'Aurora');if(p==='ARQ')s.flags.integration=random(s)<.5;if(p==='VIT')mark(s,'Encontro Giro','Aurora');}
function valid(s,q){const f=s.flags;if(q.id==='EML-01')return f.test&&!f.license;if(q.id==='EML-04')return f.test||f.license;if(q.id==='EML-05')return f.creditRequested&&!f.creditClosed;if(['EML-02','EML-08'].includes(q.id))return f.contract&&!f.delivered;if(q.id==='CON-04')return f.contract&&!f.delivered;if(q.id==='AUT-07')return f.license&&!s.arcs.CON;if(q.id==='VIT-05')return !f.campaignClosed;if(q.id==='VIT-07')return !f.promise;if(q.id==='VIT-06')return !!f.promise;return true;}
function tick(s){
 // Pequeno desgaste normal. Custos recorrentes não são cobranças da mesma carta.
 change(s,{caixa:-1,equipe:-1,seguranca:s.week%2===0?-1:0});
 if(s.flags.license&&s.week%4===0)money(s,`licenca-mes-${s.week}`,s.flags.promoEnded?-4:-2);
 if(s.flags.coverage&&s.week%4===0)money(s,`cobertura-${s.week}`,-2);
 for(const q of [...s.queue])if(q.id==='@parcela'&&q.due<=s.week){money(s,q.tag,q.amount);s.queue=s.queue.filter(x=>x!==q);s.history.push({week:s.week,title:'Parcela recebida',choice:'Financeiro confirmou o recebimento previsto.',id:q.tag});}
}
function next(s){
 s.queue=s.queue.filter(q=>valid(s,q));
 const priority=q=>q.id==='CON-05'?0:q.id==='RET-01'?1:2;
 const mandatory=s.queue.filter(q=>!q.optional&&!q.id.startsWith('@')&&q.due<=s.week).sort((a,b)=>priority(a)-priority(b)||a.due-b.due||a.order-b.order);
 let id;
 if(mandatory.length){id=mandatory[0].id;s.queue=s.queue.filter(q=>q!==mandatory[0]);}
 else{
 const pool=[];const add=(id,weight)=>pool.push({id,weight});
 for(let n=1;n<=8;n++){const r=N('ROT',n);if(s.week-(s.seen[r]??-20)<5)continue;if(n===3&&s.flags.maintenanceDue)continue;if(n===5&&s.flags.equipment)continue;if(n===7&&s.flags.promise)continue;if(n===8&&!s.flags.accessConcern&&s.week<10)continue;add(r,3);}
 if(!s.arcs.AUT&&s.week>=2)add('AUT-01',4);
 if(!s.arcs.CON&&s.week>=1)add('CON-01',5);
 if(!s.arcs.ARQ&&s.week>=3)add('ARQ-01',4);
 if(!s.arcs.VIT&&s.flags.success)add('VIT-01',4);
 if(s.week>=4&&s.seen['EML-07']===undefined)add('EML-07',1.3);
 if((s.flags.test||s.flags.license)&&s.seen['EML-04']===undefined)add('EML-04',1.3);
 if(s.flags.contract&&!s.flags.delivered&&s.seen['EML-08']===undefined)add('EML-08',1.5);
 for(const q of s.queue.filter(q=>q.optional&&q.due<=s.week))add(q.id,4);
 if(!pool.length)add('ROT-01',1);
 let roll=random(s)*pool.reduce((v,p)=>v+p.weight,0);id=pool[pool.length-1].id;for(const p of pool){roll-=p.weight;if(roll<=0){id=p.id;break;}}
 s.queue=s.queue.filter(q=>!(q.id===id&&q.optional));
 }
 if(id.endsWith('-01')&&['AUT','CON','ARQ','VIT'].includes(id.slice(0,3)))initialize(s,id.slice(0,3));
 s.current={id,token:++s.serial};const actor=CARDS[id].actor;if(ACTORS.includes(actor)&&!s.characters.includes(actor))s.characters.push(actor);
}
function variantText(card,index){return Object.values(card.variants||{})[index]||card.text;}
function contractTerms(s){return `Aurora · integração e painel de acompanhamento. ${s.flags.small?'Primeira etapa reduzida':'Escopo integral'}. Entrega: semana ${s.flags.deadline??s.week+5}. Pagamento após entrega e conferência, em até duas semanas. Receita ${s.flags.small?'moderada':'alta'}; exige reservar equipe. Trabalho adicional exige novo acordo.`;}
function licenseTerms(s){return `NexoFluxo · ${s.flags.scope==='ampliado'?'mais equipes':s.flags.scope==='reduzido'?'relatório principal':'uma equipe'}. Contrato de 12 meses; cobrança mensal ${s.flags.scope==='ampliado'?'alta':'moderada'} e implantação inicial. ${s.arcs.AUT?.variant==='preco_temporario'?'Preço promocional por 12 semanas; depois a mensalidade dobra. É permitido reduzir licenças ao fim da promoção; o escopo restante segue contratado.':'Preço estável. Cancelamento na renovação; avaliação gratuita sem conversão automática.'} O teste não garante economia em todo processo.`;}
export function view(s){
 if(s.ending)return {...CARDS[s.ending],ending:true};
 const c=clone(CARDS[s.current.id]),f=s.flags,id=c.id;
 if(id==='AUT-04'){c.text=variantText(c,s.arcs.AUT.variant==='preco_temporario'?1:0);c.terms=licenseTerms(s);}
 if(id==='AUT-06')c.text=variantText(c,f.overload?1:0);
 if(id==='CON-01'||id==='CON-02'||id==='EML-02')c.terms=contractTerms(id==='CON-02'?{...s,flags:{...f,small:true}}:s);
 if(id==='CON-02')c.text=variantText(c,s.arcs.CON.variant==='organizado'?0:1);
 if(id==='CON-05'){const ready=f.capacityReserved&&(f.reinforced||s.bars.equipe>=35);c.text=variantText(c,ready?0:1);c.choices=ready?['Concluir as correções combinadas','Negociar o suporte após a entrega']:['Concentrar a equipe para terminar','Combinar a entrega em etapas'];}
 if(id==='CON-07'){const partial=s.arcs.CON.variant==='pagamento_lento'&&!f.installments&&!f.finalCollection;c.text=variantText(c,f.installments?1:partial?2:0);c.terms=partial?'Proposta: receber metade e dar quitação do restante, ou manter cobrança com revisão em duas semanas.':f.installments?'Três parcelas iguais: a primeira agora, as próximas em duas e quatro semanas.':'Recebimento confirmado. Sem alteração retroativa de prazo ou escopo.';if(f.finalCollection)c.text='Após a cobrança, recebemos a quitação pelo saldo acordado. O processo pode ser encerrado.';}
 if(id==='CON-07'){const partial=s.arcs.CON.variant==='pagamento_lento'&&!f.installments&&!f.finalCollection;c.choices=partial?['Aceitar metade e encerrar a dívida','Continuar cobrando o valor completo']:['Encerrar sem oferecer novos projetos','Conversar sobre novos projetos'];}
 if(id==='ARQ-05'){c.text=variantText(c,f.refund?0:1);c.choices=[f.refund?'Guardar o dinheiro para imprevistos':'Guardar o crédito para outro serviço','Usar na manutenção prevista'];}
 if(id==='ARQ-06'){const pending=!f.legacyWindow&&s.bars.equipe<25;c.text=variantText(c,pending?1:0);c.choices=pending?['Reservar tempo para terminar a revisão','Combinar novo prazo antes dos extras']:['Encerrar após a revisão prometida','Orçar separadamente os pedidos extras'];}
 if(id==='ARQ-07'){c.text=variantText(c,f.integration?1:0);if(f.integration&&f.revoked)c.text+=' A sincronização parou; os dados foram preservados.';}
 if(id==='ARQ-07')c.choices=f.integration?['Conferir o uso e desativar o processo','Criar uma conta própria para o sistema']:['Confirmar que a conta foi desativada','Atualizar o registro dos acessos'];
 if(id==='VIT-03'){c.text=variantText(c,s.arcs.VIT.variant==='patrocinio'?1:0);c.terms='Formato básico: apresentação gratuita, com custo pequeno de preparação e viagem. Maior presença: despesa alta de divulgação e preparação; patrocínio identificado. Nenhuma opção garante vendas.';}
 if(id==='VIT-04')c.text=variantText(c,s.arcs.VIT.variant==='exposicao'?1:0);
 if(id==='VIT-06')c.text=variantText(c,f.promise==='prazo'?1:0);
 if(id==='VIT-07')c.text=variantText(c,f.overload?1:0);
 if(id==='EML-01')c.terms=licenseTerms(s);
 if(id==='EML-03')c.document='Permitido: nome Aurora, descrição geral do projeto e processo implantado. Retirar: dados operacionais, valores e contatos da última página. Autorização limitada a esta apresentação.';
 if(id==='EML-05')c.terms='Registro Cedro 071 · crédito da empresa confirmado pelo Financeiro. Não há taxa antecipada. O destino segue a solicitação já registrada.';
 if(id==='EML-07')c.terms='Beneficiário: parceiro não cadastrado. Sem pedido de compra. Adiantamento alto, equivalente a uma parte importante da reserva. Domínio interno: pontonorte.com.br. Toda movimentação é fictícia.';
 if(id==='ROT-03'&&f.maintenanceDue){c.text='Chegou a janela que reservamos para revisar os acessos. A entrega anterior já foi reorganizada. Precisamos concluir a revisão.';c.choices=['Executar com a equipe interna','Contratar apoio para a revisão'];}
 if(id==='ROT-05'&&f.deferredEquipment)c.text='Adiamos a troca do computador, mas a lentidão continua atrasando as entregas. A equipe está perdendo tempo todo dia. Vamos substituí-lo agora?';
 c.effects=[effects(s,0),effects(s,1)].map(e=>Object.keys(e).filter(k=>e[k]!==0));c.token=s.current.token;return c;
}
// Efeitos são consultados pela interface e aplicados pela mesma função.
export function effects(s,side){
 const id=s.current.id,f=s.flags,r=side===1;
 const pairs={
 'ROT-01':[{equipe:8,reputacao:-2},{equipe:-7,reputacao:4}],
 'ROT-02':[{caixa:8,equipe:-2},{caixa:-5,equipe:4}],
 'ROT-03':f.maintenanceDue?[{equipe:-5,seguranca:10},{caixa:-8,seguranca:10}]:[{equipe:-4,seguranca:9},{equipe:3,seguranca:-2}],
 'ROT-04':[{equipe:-3,reputacao:6,seguranca:2},{equipe:-2,reputacao:7,seguranca:2}],
 'ROT-05':[{caixa:-12,equipe:12},{caixa:9,equipe:-9}],
 'ROT-06':[{caixa:3,reputacao:-3},{caixa:-10,equipe:18}],
 'ROT-07':[{reputacao:-5,equipe:5},{reputacao:17,equipe:-7}],
 'ROT-08':[{equipe:-2,seguranca:8},{seguranca:23,equipe:-13,reputacao:-4}],
 'AUT-01':[{equipe:-2},{equipe:-5}], 'AUT-02':[{equipe:9},{equipe:3,reputacao:3}],
 'AUT-03':[{equipe:4},{equipe:-7}], 'AUT-04':[{}, {caixa:f.scope==='ampliado'?-14:-9,equipe:5}],
 'AUT-05':[{equipe:4},{equipe:-2}], 'AUT-06':[{equipe:8,seguranca:4},{caixa:6,equipe:f.overload?-10:-3}],
 'AUT-07':[{equipe:5},{equipe:-2}], 'AUT-08':[{caixa:-3,equipe:-3},{caixa:-6,equipe:4}],
 'CON-01':[{reputacao:-2},{reputacao:5,equipe:-3}], 'CON-02':[{equipe:2},{reputacao:3}],
 'CON-03':[{equipe:-8,reputacao:-3},{caixa:-12,equipe:8}], 'CON-04':[{reputacao:-4,equipe:3},{equipe:-3,reputacao:4}],
 'CON-05':[{equipe:-6,reputacao:f.capacityReserved&&(f.reinforced||s.bars.equipe>=35)?10:-6},{equipe:-2,reputacao:f.capacityReserved&&(f.reinforced||s.bars.equipe>=35)?5:-3}],
 'CON-06':[{equipe:-2},{reputacao:-4,equipe:3}], 'CON-07':[{}, {equipe:-2}],
 'CON-08':[{equipe:4,reputacao:3},{equipe:-7,reputacao:7}],
 'ARQ-01':[{equipe:-1},{equipe:-4,seguranca:3}], 'ARQ-02':[{equipe:-2},{equipe:1}],
 'ARQ-03':[{equipe:-7,reputacao:5},{equipe:-3,reputacao:1}], 'ARQ-04':[{equipe:-4,seguranca:9},{seguranca:10,equipe:s.flags.integration?-5:-1}],
 'ARQ-05':[{}, {caixa:f.refund?-6:0,equipe:7}], 'ARQ-06':[{equipe:2,reputacao:5},{equipe:-3,reputacao:7}],
 'ARQ-07':[{seguranca:5,equipe:f.integration?-3:2},{seguranca:8,equipe:f.integration?-4:-1}],
 'ARQ-08':[{equipe:6},{equipe:3,reputacao:3}],
 'VIT-01':[{equipe:3},{equipe:-3}], 'VIT-02':[{equipe:-4,seguranca:2},{equipe:-2,seguranca:2}],
 'VIT-03':[{caixa:-5,equipe:-3},{caixa:-14,equipe:-6}], 'VIT-04':[{equipe:5,reputacao:5},{equipe:-10,reputacao:12}],
 'VIT-05':[{reputacao:-4,equipe:4},{reputacao:16,equipe:-5}], 'VIT-06':[{reputacao:-10,equipe:5},{caixa:-15,equipe:5,reputacao:2}],
 'VIT-07':[{caixa:f.overload?5:12,equipe:3},{caixa:-7,equipe:10,reputacao:5}], 'VIT-08':[{seguranca:5},{seguranca:8,equipe:-3}],
 'RET-01':[{seguranca:14,equipe:-8,reputacao:-3},{seguranca:14,caixa:-12,equipe:-2}],
 'RET-02':[{equipe:-3},{reputacao:-5,equipe:2}],
 'EML-01':[{equipe:-2,seguranca:2},{equipe:-2,seguranca:3}], 'EML-02':[{equipe:-2,seguranca:2},{equipe:-2,seguranca:3}],
 'EML-03':[{equipe:-3,seguranca:3,reputacao:3},{equipe:-3,seguranca:3}],
 'EML-04':[{seguranca:4,equipe:-2},{seguranca:-19,equipe:-2}], 'EML-05':[{equipe:-2,seguranca:2},{equipe:-2,seguranca:3}],
 'EML-06':[{equipe:-2,seguranca:2},{equipe:-3,seguranca:2}],
 'EML-07':[{caixa:s.bars.caixa>20?-18:0,seguranca:s.bars.caixa>20?-9:2},{seguranca:4}],
 'EML-08':[{seguranca:-19,equipe:-2},{seguranca:4,equipe:-2}]
 };
 const e={...pairs[id][side]};
 if(id==='CON-07'){const a=s.arcs.CON;const val=f.small?18:30;e.caixa=a.variant==='pagamento_lento'?(f.installments?val/3:(!r||f.finalCollection?val*(f.finalCollection?1:.5):0)):val;}
 if(id==='ARQ-05'&&f.refund)e.caixa=(e.caixa||0)+14;
 return e;
}
function close(s,p){s.arcs[p].status='encerrada';cancel(s,p);if(p==='AUT'){s.flags.test=false;s.queue=s.queue.filter(q=>q.id!=='EML-01');}}
function finishArchive(s){s.flags.success=true;s.arcs.ARQ.status='encerrada';queue(s,'ARQ-08',1,6,true);}
function contract(s,small){const f=s.flags;f.contract=true;f.small=small;f.deadline=s.week+5;s.arcs.CON.status='contratada';mark(s,'Aurora');queue(s,'CON-03',1);queue(s,'CON-05',4);queue(s,'EML-02',1,2,true);if(s.arcs.CON.variant==='expansivo')queue(s,'CON-04',2,3,true);}
function incident(s){s.flags.exposed=true;s.flags.accessConcern=true;queue(s,'RET-01',1);}
function resolve(s,side,before){
 const r=side===1,id=s.current.id,f=s.flags;const q=(id,a=1,b=a,opt=false)=>queue(s,id,a,b,opt);s.feedback=null;
 switch(id){
 case 'AUT-01':if(r){f.test=true;q(s.arcs.AUT.variant==='suporte'?'AUT-03':'AUT-02',2,3);q('EML-01',1,2,true);}else close(s,'AUT');break;
 case 'AUT-02':f.scope=r?'ampliado':'atual';q('AUT-04',1,3);break;
 case 'AUT-03':if(r)q('AUT-05',2,3);else close(s,'AUT');break;
 case 'AUT-04':if(r){f.license=true;f.test=false;s.arcs.AUT.status='contratada';q('AUT-06',2,4);if(s.arcs.AUT.variant==='preco_temporario')q('AUT-08',12);}else close(s,'AUT');break;
 case 'AUT-05':if(r){f.scope='reduzido';q('AUT-04',1,2);}else close(s,'AUT');break;
 case 'AUT-06':f.success=true;f.overload=r;if(r||f.scope==='ampliado')q('AUT-07',2,5,true);break;
 case 'AUT-07':if(r&&!s.arcs.CON)q('CON-01',1,3);break;
 case 'AUT-08':f.promoEnded=r;f.scope=r?f.scope:'reduzido';s.feedback=r?'O preço informado passa a valer no próximo ciclo.':'As licenças foram reduzidas conforme a cláusula de ajuste.';break;
 case 'CON-01':if(r)contract(s,false);else q('CON-02',1);break;
 case 'CON-02':if(r)contract(s,true);else close(s,'CON');break;
 case 'CON-03':f.reinforced=r;f.capacityReserved=true;f.overload=!r;break;
 case 'CON-04':f.secondStage=r;break;
 case 'CON-05':{const ready=f.capacityReserved&&(f.reinforced||before.equipe>=35);f.delivered=true;f.success=true;f.overload=false;s.arcs.CON.status='faturada';s.feedback=r?(ready?'A entrega foi aceita. O suporte adicional será negociado separadamente. O Financeiro iniciou a cobrança pelo serviço entregue.':'O cliente aceitou receber por etapas. A equipe concluiu o restante no novo prazo combinado, e o Financeiro iniciou a cobrança.'):'A equipe concluiu a entrega e as correções combinadas. O Financeiro iniciou a cobrança pelo serviço.';q(s.arcs.CON.variant==='pagamento_lento'?'CON-06':'CON-07',2);break;}
 case 'CON-06':f.installments=!r;q('CON-07',2);break;
 case 'CON-07':{
 const partial=s.arcs.CON.variant==='pagamento_lento'&&!f.installments&&!f.finalCollection;
 if(partial&&r){f.finalCollection=true;q('CON-07',2);s.feedback='A baixa foi recusada. A cobrança continua e voltará com a resolução.';}
 else{f.paid=true;s.arcs.CON.status='encerrada';if(f.installments&&!f.parcelsScheduled){f.parcelsScheduled=true;for(let i=1;i<=2;i++)s.queue.push({id:'@parcela',tag:`aurora-parcela-${i}`,due:s.week+1+i*2,amount:(f.small?18:30)/3});}if(r&&!partial)q('CON-08',2,5,true);s.feedback=partial?'Metade foi recebida. Você aceitou dar quitação do saldo restante.':'O recebimento foi lançado uma vez. Valores futuros continuam na agenda.';}break;}
 case 'CON-08':f.overload=r;break;
 case 'ARQ-01':f.archiveDocumented=r;q({credito:'ARQ-02',promessa:'ARQ-03',acesso_antigo:'ARQ-04'}[s.arcs.ARQ.variant],1,3);break;
 case 'ARQ-02':f.refund=!r;f.creditRequested=true;mark(s,'Cedro Serviços');q('ARQ-05',3);q('EML-05',1,2,true);break;
 case 'ARQ-03':mark(s,'Aurora');q('ARQ-06',3);break;
 case 'ARQ-04':f.revoked=r;f.accessConcern=true;q('ARQ-07',2);break;
 case 'ARQ-05':f.creditClosed=true;finishArchive(s);break;
 case 'ARQ-06':if(!f.legacyWindow&&before.equipe<25){f.legacyWindow=true;q('ARQ-06',2);s.feedback='Uma janela protegida foi reservada para terminar a revisão antes de qualquer trabalho extra.';}else finishArchive(s);break;
 case 'ARQ-07':finishArchive(s);break;
 case 'ARQ-08':f.veteranAlly=r;break;
 case 'VIT-01':if(r){q('VIT-02',1,3);q('EML-06',1,2,true);}else close(s,'VIT');break;
 case 'VIT-02':if(r)q('EML-03',1,2);else q('VIT-03',1,2);break;
 case 'VIT-03':f.sponsored=r;q('VIT-04',3);break;
 case 'VIT-04':f.overload=r;f.publicity=true;q('VIT-07',5,7);q('VIT-08',1,4,true);if(r)q('VIT-05',1,2,true);break;
 case 'VIT-05':if(r){f.promise='horario';q('VIT-06',2);}break;
 case 'VIT-06':f.promise=null;f.coverage=r;s.feedback=r?'Cobertura temporária contratada até a conclusão dos turnos em duas semanas. A manutenção entra no orçamento mensal.':'O anúncio foi corrigido. O cliente recebeu uma previsão compatível e o pedido foi atendido.';if(s.arcs.VIT?.status==='aberta')q('VIT-07',2);break;
 case 'VIT-07':f.campaignClosed=true;close(s,'VIT');break;
 case 'VIT-08':f.accessConcern=true;break;
 case 'ROT-01':if(!r)f.success=true;break;
 case 'ROT-03':if(f.maintenanceDue){f.maintenanceDue=false;s.feedback='Revisão concluída: contas sem responsável foram tratadas e os acessos necessários ficaram documentados.';}else if(r){f.maintenanceDue=true;q('ROT-03',3);s.feedback='A revisão está agendada para daqui a três semanas.';}break;
 case 'ROT-05':if(r)f.deferredEquipment=(f.deferredEquipment||0)+1;else {f.equipment=true;f.success=true;}break;
 case 'ROT-06':if(r)f.extraManagers=(f.extraManagers||0)+1;break;
 case 'ROT-07':if(r){f.promise='prazo';q('VIT-06',2,4);}break;
 case 'ROT-08':f.accessConcern=true;f.rigid=r;break;
 case 'EML-01':s.feedback=r?'A consultora confirmou a proposta pelo contato cadastrado. O teste continua sem contratação automática.':'O Financeiro recebeu os termos para a decisão sobre a licença.';break;
 case 'EML-02':s.feedback='O Comercial conferiu escopo e prazo. A documentação corresponde ao contrato firmado com a Aurora.';break;
 case 'EML-03':f.permission=!r;q('VIT-03',1);s.feedback=r?'O material foi anonimizado.':'A apresentação foi revisada dentro da autorização recebida.';break;
 case 'EML-04':if(r){incident(s);s.feedback='Na simulação, a autenticação foi realizada pela página da mensagem.';}else s.feedback='O suporte cadastrado nega a exigência. O domínio da mensagem não é o usado pela NexoFluxo. A tentativa foi relatada e o acesso legítimo continua ativo.';break;
 case 'EML-05':s.feedback='O Financeiro confirmou o documento pelo contato da Cedro. A solicitação anterior continua; o e-mail não gera um segundo recebimento.';break;
 case 'EML-06':f.eventPreference=r?'ampliada':'basica';s.feedback='As condições foram anexadas à análise. Nenhuma modalidade foi contratada.';break;
 case 'EML-07':if(!r&&s.bars.caixa>2){f.paymentIncident=true;f.recovery=0;q('RET-02',1);s.feedback='O adiantamento foi executado na simulação, fora do cadastro de fornecedores.';}else s.feedback='A direção negou a solicitação pelo contato interno. O pagamento não foi realizado.';break;
 case 'EML-08':if(!r){incident(s);s.feedback='Na simulação, a conta corporativa foi usada na página recebida.';}else s.feedback='Marina confirmou que os documentos continuam no portal cadastrado. O endereço recebido imitava a Aurora. O contrato verdadeiro foi preservado.';break;
 case 'RET-01':f.exposed=false;s.feedback='As sessões foram encerradas e os acessos revisados. A conta foi usada indevidamente; não foi constatada transferência financeira. A contenção limitou o alcance, sem apagar a exposição.';break;
 case 'RET-02':f.paymentIncident=false;s.feedback='O valor já havia sido movimentado e não foi recuperado. O Financeiro reorganizou os pagamentos essenciais. Não houve um segundo débito do adiantamento.';break;
 }
}
export function choose(state,side,token=state.current?.token){
 if(!Number.isInteger(side)||side<0||side>1)throw new Error('Escolha inválida. Use 0 ou 1.');
 if(state.ending||!state.current||token!==state.current.token)throw new Error('Esta carta já foi resolvida.');
 const s=clone(state),c=view(s),id=s.current.id,before={...s.bars};
 const values=effects(s,side);const excess=side===1?({'ROT-05':['caixa'],'ROT-06':['equipe'],'ROT-07':['reputacao'],'VIT-05':['reputacao'],'ROT-08':['seguranca']}[id]||[]):[];
 // O resultado da transferência depende do saldo anterior à decisão.
 const impossiblePayment=id==='EML-07'&&side===0&&s.bars.caixa<=20;
 change(s,values,excess);
 if(impossiblePayment)s.feedback='O Financeiro bloqueou o adiantamento: a reserva não comporta esse valor. Ao confirmar pelo canal interno, a direção negou o pedido.';
 else resolve(s,side,before);
 s.seen[id]=s.week;s.history.push({week:s.week+1,id,title:c.title,choice:c.choices[side],feedback:s.feedback});
 if(ended(s))return s;
 s.week++;tick(s);if(ended(s)){s.week--;return s;}
 next(s);return s;
}
export function restore(raw){try{const s=typeof raw==='string'?JSON.parse(raw):raw;if(s.version!==VERSION||!Number.isInteger(s.week)||s.week<0||!KEYS.every(k=>Number.isFinite(s.bars[k])&&s.bars[k]>=0&&s.bars[k]<=100)||!Array.isArray(s.queue)||!Array.isArray(s.history)||!Array.isArray(s.characters)||!Array.isArray(s.endings)||!s.flags||!s.arcs||!s.ledger||!Array.isArray(s.contacts)||!s.seen||!Number.isInteger(s.seed)||!Number.isInteger(s.serial))return null;if(s.ending&&!CARDS[s.ending]?.id.startsWith('FIM'))return null;if(!s.ending&&(!s.current||!CARDS[s.current.id]?.choices.length||!Number.isInteger(s.current.token)))return null;if(s.queue.some(q=>!Number.isFinite(q.due)||(q.id!=='@parcela'&&!CARDS[q.id]?.choices.length)))return null;return clone(s);}catch{return null;}}
export function commitments(s){const f=s.flags,a=[];if(f.contract&&!f.delivered)a.push(`Aurora: entrega na semana ${f.deadline}. ${f.small?'Escopo reduzido.':'Escopo integral.'}`);if(f.delivered&&!f.paid)a.push('Aurora: recebível aguardando resolução do Financeiro.');if(f.test)a.push('NexoFluxo: teste gratuito em avaliação.');if(f.license)a.push(`NexoFluxo: licença ativa; despesa a cada quatro semanas.${f.promoEnded?' Preço posterior à promoção.':''}`);if(f.maintenanceDue)a.push('Revisão de acessos agendada; a janela terá retorno obrigatório.');if(f.promise)a.push(f.promise==='prazo'?'Promessa pública: qualquer problema em 24 horas.':'Promessa pública: atendimento em qualquer horário.');if(f.coverage)a.push('Cobertura de atendimento contratada; custo mensal.');for(const q of s.queue.filter(q=>q.id==='@parcela'))a.push(`Parcela Aurora prevista na semana ${q.due}.`);return a;}
