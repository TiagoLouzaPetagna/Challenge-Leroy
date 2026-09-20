/* Phishing Beat V10 — realistic-looking Vela identity cases.
 * The fictional organization uses vela.com as its single official base domain.
 * Suspicious cases rotate real delegated TLDs and common suffix structures.
 * Strings are displayed only inside the game; they are never clickable links.
 */
(function(root,factory){const data=factory();if(typeof module==='object'&&module.exports)module.exports=data;else root.PBData=data;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';

const OFFICIAL='vela.com';
const serviceMap={
 portal:{name:'PORTAL VELA',root:'portal.vela.com',short:'Portal → portal.vela.com'},
 login:{name:'LOGIN VELA',root:'login.vela.com',short:'Login → login.vela.com'},
 people:{name:'PESSOAS VELA',root:'pessoas.vela.com',short:'Pessoas → pessoas.vela.com'}
};
const senderMap={
 finance:{name:'FINANCEIRO VELA',root:OFFICIAL,short:'Financeiro → @vela.com'},
 people:{name:'RH / PESSOAS',root:OFFICIAL,short:'RH → @vela.com'},
 alerts:{name:'SEGURANÇA VELA',root:OFFICIAL,short:'Segurança → @vela.com'}
};
const add=(track,category,c)=>({
 track,category,id:`${track}-${category}-${c.id}`,primary:c.primary,secondary:c.secondary,
 host:c.primary,threat:c.threat,level:c.level,reason:c.reason,identity:c.identity,
 icon:category==='sender'?'sender':'mail',reference:c.reference
});
const D=(id,service,primary,threat,level,reason)=>({
 id,primary,secondary:`Serviço declarado: ${serviceMap[service].name}`,threat,level,reason,
 identity:serviceMap[service].name,reference:`Oficial: ${serviceMap[service].root}`
});
const S=(id,kind,primary,threat,level,reason)=>({
 id,primary,secondary:`Identidade declarada: ${senderMap[kind].name}`,threat,level,reason,
 identity:senderMap[kind].name,reference:`Domínio oficial de e-mail: @${senderMap[kind].root}`
});

/*
 * Vela owns only vela.com in this exercise.
 * .com, .net, .org, .br, .co, .io, .app and .dev are real delegated TLDs.
 * .com.br is included as a common Brazilian registration suffix under .br;
 * vela.com.br is a different domain from vela.com.
 */
const domains=[
 // Legitimate — every service remains under the official base vela.com.
 D('ok-portal','portal','portal.vela.com',false,'simple','O host está exatamente sob o domínio oficial vela.com.'),
 D('ok-portal-auth','portal','auth.portal.vela.com',false,'medium','auth é um subdomínio de portal.vela.com e continua sob vela.com.'),
 D('ok-portal-status','portal','status.eu.portal.vela.com',false,'complex','Os níveis extras permanecem à esquerda de portal.vela.com; o domínio base continua vela.com.'),
 D('ok-login','login','login.vela.com',false,'simple','O Login usa o domínio oficial vela.com.'),
 D('ok-login-sso','login','sso.login.vela.com',false,'medium','sso é um subdomínio legítimo abaixo de login.vela.com.'),
 D('ok-login-id','login','id.eu.login.vela.com',false,'complex','O endereço continua terminando em login.vela.com.'),
 D('ok-people','people','pessoas.vela.com',false,'simple','O serviço Pessoas está sob o domínio oficial vela.com.'),
 D('ok-people-benefits','people','beneficios.pessoas.vela.com',false,'medium','beneficios permanece abaixo de pessoas.vela.com.'),
 D('ok-people-docs','people','docs.br.pessoas.vela.com',false,'complex','Mesmo com vários níveis, o domínio base continua vela.com.'),

 // Real TLD / suffix swaps. The stem looks right, but the registrable domain changed.
 D('bad-portal-net','portal','portal.vela.net',true,'simple','O domínio oficial é vela.com; vela.net é outro domínio.'),
 D('bad-portal-org','portal','portal.vela.org',true,'simple','O nome Vela está correto, mas o final mudou de vela.com para vela.org.'),
 D('bad-portal-br','portal','portal.vela.com.br',true,'medium','vela.com.br é um domínio diferente de vela.com; o final .com.br não pertence à Vela neste exercício.'),
 D('bad-portal-co','portal','portal.vela.co',true,'medium','vela.co é outro domínio, apesar de diferir de vela.com por poucos caracteres.'),
 D('bad-login-net','login','login.vela.net',true,'simple','O Login oficial termina em vela.com, não em vela.net.'),
 D('bad-login-org','login','login.vela.org',true,'simple','O TLD mudou de .com para .org.'),
 D('bad-login-io','login','login.vela.io',true,'medium','vela.io é um domínio diferente de vela.com.'),
 D('bad-login-app','login','login.vela.app',true,'complex','O final .app é real, mas não é o domínio oficial da Vela.'),
 D('bad-people-net','people','pessoas.vela.net',true,'simple','Pessoas deveria estar sob vela.com; vela.net não é o domínio informado.'),
 D('bad-people-org','people','pessoas.vela.org',true,'simple','O TLD .org cria outro domínio.'),
 D('bad-people-br','people','pessoas.vela.com.br',true,'medium','vela.com.br não é o mesmo domínio que vela.com.'),
 D('bad-people-dev','people','pessoas.vela.dev',true,'complex','O TLD .dev existe, mas esse domínio não pertence ao contexto oficial da Vela.'),

 // Lookalike registered domains. A typo only in a subdomain of vela.com is not enough to label the host as phishing.
 D('bad-portal-vella','portal','portal.vella.com',true,'simple','vella.com tem uma letra l a mais que vela.com e é outro domínio.'),
 D('bad-vela-one','portal','portal.ve1a.com',true,'medium','O número 1 substitui a letra l em vela.'),
 D('bad-vela-cap-i','portal','portal.veIa.com',true,'complex','veIa usa I maiúsculo no lugar de l minúsculo.'),
 D('bad-login-velaa','login','login.velaa.com',true,'medium','velaa.com tem uma letra a extra e não é o domínio oficial vela.com.'),
 D('bad-login-veia','login','login.veia.com',true,'complex','veia.com usa i no lugar de l; o domínio base é diferente de vela.com.'),
 D('bad-people-vel4','people','pessoas.vel4.com',true,'medium','vel4.com usa o algarismo 4 no lugar de a e não pertence a vela.com.'),

 // Hyphen and label-order traps.
 D('bad-portal-hyphen','portal','portal-vela.com',true,'medium','portal-vela.com é um domínio próprio; não é um subdomínio de vela.com.'),
 D('bad-login-hyphen','login','login-vela.com',true,'medium','login-vela.com não está sob o domínio vela.com.'),
 D('bad-people-hyphen','people','pessoas-vela.com',true,'medium','O hífen cria outro domínio registrável.'),
 D('bad-portal-order','portal','vela-portal.com',true,'complex','As palavras parecem corretas, mas o domínio registrado é vela-portal.com.'),
 D('bad-login-order','login','vela-login.com',true,'complex','vela-login.com é diferente de login.vela.com.'),

 // Trusted-domain embedding: vela.com appears visually, but another domain is authoritative.
 D('bad-parent-portal','portal','portal.vela.com.login-seguro.net',true,'complex','vela.com aparece à esquerda, mas o endereço termina em login-seguro.net.'),
 D('bad-parent-login','login','login.vela.com.auth-conta.org',true,'complex','O domínio efetivo é auth-conta.org; login.vela.com foi usado como subdomínio.'),
 D('bad-parent-people','people','pessoas.vela.com.portal-seguro.com.br',true,'complex','O host está sob portal-seguro.com.br, não sob vela.com.'),
 D('bad-parent-dev','portal','auth.portal.vela.com.verificacao.dev',true,'complex','O final real é verificacao.dev; a sequência portal.vela.com aparece apenas como subdomínio.')
];

const senders=[
 // Legitimate — company mail is always @vela.com.
 S('ok-fin','finance','financeiro@vela.com',false,'simple','O domínio após @ é exatamente vela.com.'),
 S('ok-fin-pay','finance','pagamentos@vela.com',false,'medium','O nome da caixa muda, mas o domínio após @ continua vela.com.'),
 S('ok-fin-ap','finance','contas.ap@vela.com',false,'complex','O local-part pode conter ponto; o domínio oficial após @ continua vela.com.'),
 S('ok-rh','people','rh@vela.com',false,'simple','O RH utiliza o domínio oficial @vela.com.'),
 S('ok-rh-benef','people','beneficios@vela.com',false,'medium','O endereço permanece no domínio oficial da empresa.'),
 S('ok-rh-recruit','people','recrutamento@vela.com',false,'complex','O remetente usa @vela.com.'),
 S('ok-sec','alerts','seguranca@vela.com',false,'simple','Segurança utiliza @vela.com.'),
 S('ok-sec-notify','alerts','notificacoes@vela.com',false,'medium','O domínio após @ corresponde a vela.com.'),
 S('ok-sec-soc','alerts','soc@vela.com',false,'complex','O endereço permanece em @vela.com.'),

 // Real TLD / suffix swaps after @.
 S('bad-fin-net','finance','financeiro@vela.net',true,'simple','O domínio após @ mudou de vela.com para vela.net.'),
 S('bad-rh-org','people','rh@vela.org',true,'simple','O remetente usa vela.org, não vela.com.'),
 S('bad-sec-br','alerts','seguranca@vela.com.br',true,'simple','vela.com.br é um domínio diferente de vela.com.'),
 S('bad-fin-co','finance','pagamentos@vela.co',true,'medium','vela.co parece próximo de vela.com, mas é outro domínio.'),
 S('bad-rh-io','people','beneficios@vela.io',true,'medium','O TLD .io é real, porém o domínio oficial informado é vela.com.'),
 S('bad-sec-app','alerts','notificacoes@vela.app',true,'medium','O endereço usa vela.app no lugar de vela.com.'),
 S('bad-sec-dev','alerts','soc@vela.dev',true,'complex','O final .dev é válido na Internet, mas não pertence ao domínio oficial da Vela.'),

 // Typo / homoglyph-style ASCII confusables.
 S('bad-fin-one','finance','financeiro@ve1a.com',true,'medium','O número 1 substitui a letra l em vela.'),
 S('bad-rh-cap-i','people','rh@veIa.com',true,'complex','veIa usa I maiúsculo no lugar de l minúsculo.'),
 S('bad-sec-extra','alerts','seguranca@vellla.com',true,'complex','O nome contém letras extras e não é vela.com.'),

 // Brand in the local-part or in a different registrable domain.
 S('bad-fin-local','finance','financeiro.vela@contas-seguras.com',true,'medium','O texto vela está antes de @; o domínio real é contas-seguras.com.'),
 S('bad-rh-hyphen','people','rh@vela-rh.com',true,'medium','vela-rh.com é outro domínio; não é @vela.com.'),
 S('bad-sec-hyphen','alerts','seguranca@vela-sec.com',true,'medium','vela-sec.com não pertence ao domínio oficial vela.com.'),
 S('bad-fin-pay','finance','pagamentos@vela-pay.com',true,'complex','O nome contém a marca, mas o domínio registrado é vela-pay.com.'),

 // Parent-domain traps after @.
 S('bad-fin-parent','finance','financeiro@vela.com.login-seguro.net',true,'complex','Depois de @, o endereço termina em login-seguro.net; vela.com é apenas um subdomínio.'),
 S('bad-rh-parent','people','rh@vela.com.auth-conta.org',true,'complex','O domínio efetivo é auth-conta.org.'),
 S('bad-sec-parent','alerts','soc@vela.com.alerta-seguro.com.br',true,'complex','O remetente está sob alerta-seguro.com.br, não sob vela.com.')
];

const cases=[];
for(const track of ['passo','contra','freio','trinca'])for(const c of domains)cases.push(add(track,'domain',c));
for(const c of senders)cases.push(add('swing','sender',c));
for(const c of domains)cases.push(add('resposta','domain',c));
for(const c of senders)cases.push(add('resposta','sender',c));

const domainRule='Base oficial: vela.com · Portal → portal.vela.com · Login → login.vela.com · Pessoas → pessoas.vela.com';
const senderRule='Todos os remetentes oficiais usam @vela.com';
const stageContext={
 passo:{title:'DOMÍNIO OFICIAL: VELA.COM',reference:domainRule,hint:'Compare o domínio completo. .net, .org, .co, .io, .app, .dev e .com.br podem parecer plausíveis, mas são domínios diferentes.'},
 contra:{title:'TLD E SUFIXO TAMBÉM CONTAM',reference:domainRule,hint:'No contratempo, não olhe só para “vela”. Confira o final completo antes de decidir.'},
 freio:{title:'LEIA DA DIREITA PARA A ESQUERDA',reference:domainRule,hint:'Use as pausas para confirmar onde termina o domínio confiável. vela.com.br e vela.com não são a mesma identidade.'},
 swing:{title:'REMETENTE OFICIAL: @VELA.COM',reference:senderRule,hint:'Leia principalmente o que vem depois de @. O nome antes do @ pode ser convincente e ainda assim apontar para outro domínio.'},
 trinca:{title:'VARIAÇÕES AVANÇADAS',reference:domainRule,hint:'Entram TLDs reais, .com.br, hífens, confusáveis e o domínio vela.com embutido dentro de outro host.'},
 resposta:{title:'IDENTIDADE AVANÇADA',reference:'DOMÍNIO: '+domainRule+' · REMETENTE: '+senderRule,hint:'Domínio e remetente se alternam. Confira sempre o final real da identidade antes do pouso.'}
};

return Object.freeze({
 version:'10.0.0',context:'vela-com-real-suffix-training',officialDomain:OFFICIAL,
 tlds:['com','net','org','br','co','io','app','dev'],suffixes:['.com','.net','.org','.com.br','.co','.io','.app','.dev'],
 cases,stageContext,serviceMap,senderMap
});
});
