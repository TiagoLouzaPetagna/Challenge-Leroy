import {GAMES} from './catalog.js';

export const ROUND_COUNT=10;

// As imitações alteram o domínio registrado, não apenas o subdomínio.
const profiles=[
  {brand:'Pombo Correio',name:'pombocorreio',suffix:'.com.br',host:'pombocorreio.com.br',impostors:['pombo-correio.com.br','pombocorreio-acesso.com.br','pombocorreio.com'],services:[['entregas','pedidos','a página de pedidos','Ver meus pedidos'],['conta','entrar','a página de acesso','Entrar na conta'],['suporte','ajuda','a central de ajuda','Pedir ajuda'],['avisos','consulta','a consulta de avisos','Consultar avisos']]},
  {brand:'Biblioteca Pombo',name:'biblioteca-pombo',suffix:'.org',host:'biblioteca-pombo.org',impostors:['bibliotecapombo.org','biblioteca-pombo-online.org','biblioteca-pombo.com'],services:[['catalogo','consulta','o catálogo','Consultar catálogo'],['conta','renovar','a renovação de empréstimos','Renovar empréstimo'],['suporte','ajuda','a central de ajuda','Pedir ajuda'],['www','avisos','a página de avisos','Ver avisos']]},
  {brand:'Correio Pombo',name:'correio-pombo',suffix:'.co',host:'correio-pombo.co',impostors:['correiopombo.co','correio-pombo-online.co','correio-pombo.com'],services:[['entregas','pedidos','a página de pedidos','Ver meus pedidos'],['painel','avisos','o painel de avisos','Consultar avisos'],['suporte','ajuda','a central de ajuda','Pedir ajuda'],['conta','entrar','a página de acesso','Entrar na conta']]},
  {brand:'Clube do Pombo',name:'clube-pombo',suffix:'.com.pt',host:'clube-pombo.com.pt',impostors:['clubepombo.com.pt','clube-pombo-acesso.com.pt','clube-pombo.pt'],services:[['conta','entrar','a página de acesso','Entrar na conta'],['portal','avisos','o mural de avisos','Ver avisos'],['suporte','ajuda','a central de ajuda','Pedir ajuda'],['www','consulta','a consulta de associados','Consultar cadastro']]},
  {brand:'Oficina do Pombo',name:'oficina-pombo',suffix:'.net',host:'oficina-pombo.net',impostors:['oficinapombo.net','oficina-pombo-servicos.net','oficina-pombo.com'],services:[['servicos','consulta','a consulta de serviços','Consultar serviço'],['conta','entrar','a página de acesso','Entrar na conta'],['suporte','ajuda','a central de ajuda','Pedir ajuda'],['portal','avisos','o painel de avisos','Ver avisos']]}
];
const pick=(items,rng)=>items[Math.floor(rng()*items.length)];
const shuffle=(items,rng)=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
const profile=rng=>pick(profiles,rng);
const service=(p,rng)=>{const [sub,path,request,label]=pick(p.services,rng);return {sub,path,request,label};};
const url=(domain,s)=>`https://${s.sub}.${domain}/${s.path}`;

function hover(rng,index){
  const p=profile(rng),s=service(p,rng),safe=index%2===0;
  const domain=safe?p.host:pick(p.impostors,rng);
  return {kind:'hover',label:s.label,trusted:p.host,url:url(domain,s),safe,
    why:safe?`O endereço usa exatamente ${p.host}, o domínio conhecido.`:`O domínio do destino é ${domain}, diferente do domínio conhecido ${p.host}.`};
}

function lockpick(rng,index){
  const p=profile(rng),s=service(p,rng),impostors=shuffle(p.impostors,rng);
  const real=index%2===0?p.host:impostors[0];
  const other=impostors.filter(domain=>domain!==real);
  const choices=shuffle(real===p.host?[real,...other.slice(0,2)]:[real,p.host,other[0]],rng);
  return {kind:'lockpick',url:url(real,s),choices,answer:choices.indexOf(real),
    why:`Depois de ${s.sub}., o domínio registrado neste endereço é ${real}.${real===p.host?' Ele coincide com o domínio conhecido.':` O domínio conhecido seria ${p.host}.`}`};
}

function builder(rng){
  const p=profile(rng),s=service(p,rng);
  const answer=['https://',`${s.sub}.`,p.name,p.suffix,`/${s.path}`];
  const sameSuffix=p.impostors.filter(domain=>domain.endsWith(p.suffix));
  const fakeName=pick(sameSuffix,rng).slice(0,-p.suffix.length);
  const otherSuffix=p.impostors.find(domain=>domain.startsWith(p.name+'.'))?.slice(p.name.length);
  const decoy=otherSuffix&&rng()<0.5?otherSuffix:fakeName;
  const article=/^(Biblioteca|Oficina)/.test(p.brand)?'da':'do';
  return {kind:'builder',request:`Monte ${s.request} ${article} ${p.brand}.`,trusted:p.host,
    pieces:shuffle([...answer,decoy],rng),answer,
    why:`Compare o nome e o final com ${p.host}. A peça ${decoy} levaria a outro domínio.`};
}

function login(rng){
  const p=profile(rng),s={sub:pick(['conta','portal'],rng),path:pick(['entrar','acesso'],rng)};
  const fake=pick(p.impostors,rng);
  const flags=shuffle([0,1,2,3],rng).slice(0,2).sort((a,b)=>a-b);
  const suspicious=[
    url(fake,s),
    'Para manter o acesso hoje, confirme os dados solicitados nesta página.',
    'Informe também a senha do seu e-mail corporativo para sincronizar a conta.',
    `Dúvidas? Escreva para suporte@${fake}`
  ];
  const normal=[
    url(p.host,s),
    'Confira seus dados antes de continuar.',
    'Entrar na conta',
    `Ajuda: suporte@${p.host}`
  ];
  const details=normal.map((text,i)=>flags.includes(i)?suspicious[i]:text);
  const reasons=[
    `O endereço usa ${fake}, não ${p.host}.`,
    'A mensagem pressiona você a confirmar dados nesta tela para evitar uma perda de acesso.',
    'A senha do e-mail é uma credencial diferente e não é necessária para entrar nesta conta.',
    `O contato termina em ${fake}, diferente do domínio conhecido ${p.host}.`
  ];
  return {kind:'login',brand:p.brand,url:details[0],notice:details[1],request:details[2],footer:details[3],flags,
    reasons:flags.map(i=>reasons[i]),why:'Antes de preencher dados, compare o endereço e confirme pedidos inesperados por um canal já cadastrado.'};
}

const callbackCases=[
  {from:'financeiro',message:'O fornecedor enviou um boleto reemitido com novos dados bancários. A assinatura traz um telefone para dúvidas.',choices:['Conferir a alteração com o fornecedor no contato cadastrado no sistema','Pedir confirmação respondendo ao e-mail que trouxe o boleto','Ligar para o telefone da assinatura do e-mail']},
  {from:'suporte',message:'Seu acesso ao portal precisa ser revalidado. A mensagem traz um link para a página de suporte.',choices:['Abrir o portal pelo endereço salvo e consultar o chamado por lá','Responder à mensagem perguntando se o link é oficial','Abrir o link e conferir se a página tem o logotipo correto']},
  {from:'gestor',message:'Recebemos uma mudança de favorecido para um pagamento previsto hoje. O pedido menciona uma reunião em andamento.',choices:['Confirmar a alteração com o gestor pelo contato que você já utiliza','Responder no mesmo fio pedindo o número do novo favorecido','Conferir se o nome do gestor aparece no remetente e seguir o pedido']},
  {from:'fornecedor',message:'Uma fatura foi atualizada após revisão do pedido. O PDF anexado traz os dados para pagamento.',choices:['Comparar os dados com o pedido e confirmar pelo canal cadastrado do fornecedor','Comparar o PDF com a mensagem e pedir confirmação no mesmo e-mail','Usar o telefone impresso no PDF para confirmar a alteração']},
  {from:'recursos humanos',message:'A atualização do benefício pede envio de documento por um formulário novo. O prazo termina nesta semana.',choices:['Localizar a solicitação no canal interno habitual do RH','Responder à mensagem pedindo confirmação do formulário','Abrir o formulário e verificar se mostra a identidade visual da empresa']},
  {from:'administração',message:'Uma mudança de acesso exige confirmação. O aviso orienta ligar para um ramal alternativo.',choices:['Consultar o chamado no sistema interno e usar o ramal cadastrado','Ligar para o ramal alternativo para saber quais dados serão pedidos','Responder ao aviso pedindo o número do chamado']},
  {from:'compras',message:'Uma proposta atualizada chegou com outro endereço para assinatura eletrônica.',choices:['Abrir a negociação no sistema de compras e conferir o endereço ali','Responder ao remetente perguntando se o novo endereço substitui o anterior','Comparar o logotipo da proposta com a versão que veio antes']},
  {from:'equipe de projetos',message:'O arquivo compartilhado foi movido para uma nova pasta. O acesso está em um link nesta mensagem.',choices:['Abrir a plataforma de arquivos pelo endereço habitual e procurar a pasta','Pedir ao remetente, nesta conversa, que reenvie o link','Abrir o link e verificar se a tela mostra o nome do projeto']}
];
const channels=['E-mail','Mensagem','Aviso'];
function callback(rng){
  const c=pick(callbackCases,rng),channel=pick(channels,rng),choices=shuffle(c.choices,rng);
  return {kind:'callback',from:`${channel} do “${c.from}”`,message:c.message,choices,
    answer:choices.indexOf(c.choices[0]),why:'Confirme em um registro ou contato que já existia antes desta mensagem; responder nela ou usar seus links e números não é uma confirmação independente.'};
}

const factories={hover,lockpick,builder,login,callback};
const key=r=>r.url||(Array.isArray(r.answer)?r.answer.join(''):`${r.from}|${r.message}`);

export function createSession(id,rng=Math.random){
  const game=GAMES[id];
  if(!game)throw new Error('Jogo não encontrado');
  const kinds=game.kind==='mixed'?shuffle(Object.keys(factories).flatMap(kind=>[kind,kind]),rng):Array(ROUND_COUNT).fill(game.kind);
  const used=new Set(),counts={};
  const rounds=kinds.map(kind=>{
    let item,attempt=0;
    const index=counts[kind]||0;
    do{item=factories[kind](rng,index);attempt++;}while(used.has(`${kind}:${key(item)}`)&&attempt<200);
    if(used.has(`${kind}:${key(item)}`))throw new Error('Não foi possível gerar uma rodada nova');
    used.add(`${kind}:${key(item)}`);
    counts[kind]=index+1;
    return item;
  });
  return shuffle(rounds,rng);
}
