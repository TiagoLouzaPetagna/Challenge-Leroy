# Política de remetentes das simulações

## Regra corporativa

Toda simulação de phishing da Fortifica deverá começar por um **e-mail institucional**. A identidade maliciosa simulada nunca poderá ser uma pessoa física.

Essa restrição vale para nome, fotografia, cargo, voz, vídeo, assinatura, endereço individual e qualquer outro elemento que permita apresentar o phishing como ação de uma pessoa específica. O funcionário que realiza a atividade continua sendo uma pessoa, mas o remetente simulado será sempre uma instituição, área ou serviço.

## Remetentes permitidos

### Área ou serviço interno da empresa

O e-mail poderá aparentar vir de:

- Pessoas & Cultura;
- Tecnologia;
- Jurídico e Compliance;
- Financeiro ou Fiscal;
- Saúde e Segurança;
- Comunicação Interna;
- Universidade Corporativa;
- Central de Acessos;
- Portal do Colaborador;
- outro setor, programa, sistema ou caixa compartilhada institucional.

O remetente deve usar nome funcional e endereço genérico, como `comunicados@`, `notificacoes@`, `servicos@` ou `nao-responda@`. A assinatura termina na área ou no serviço, sem nome de funcionário.

### Pessoa jurídica externa

O e-mail poderá aparentar vir de:

- fornecedor ou prestador contratado;
- empresa em processo de homologação;
- possível parceira comercial;
- consultoria, auditoria ou escritório jurídico como organização;
- plataforma corporativa de documentos, benefícios, certificação ou assinatura;
- associação, fabricante, transportadora ou outra organização relacionada ao trabalho.

Uma possível colaboração pode ser apresentada em nome da empresa interessada, mas nunca em nome de seu representante, vendedor, advogado, recrutador, técnico ou outro colaborador individual.

### Órgão ou serviço público

O e-mail poderá simular comunicado institucional relacionado a obrigação, protocolo, fiscalização, certidão, processo administrativo ou portal público. O remetente será o órgão ou serviço, nunca um servidor, fiscal, procurador ou atendente identificado como pessoa.

Por padrão, marcas, brasões, domínios e portais reais não serão reproduzidos. A atividade usará identidade fictícia, conteúdo inerte e domínio `.example`. Qualquer uso futuro de identidade pública real dependerá de revisão jurídica e autorização editorial próprias.

## Liberdade de conteúdo e diversidade editorial

A restrição corporativa define **quem pode ser representado como remetente**, não quais assuntos um e-mail pode abordar. Não existe uma lista fechada de conteúdos permitidos. A mensagem poderá tratar de qualquer situação empresarial coerente com a instituição que aparenta enviá-la.

Os casos não deverão repetir uma fórmula única de comunicado com saudação, justificativa, lista, quatro passos e botão. Cada e-mail será construído de acordo com sua finalidade e poderá assumir, entre outros, formatos como:

- peça visual de comunicação interna;
- notificação automática curta de plataforma;
- ofício, intimação ou protocolo administrativo;
- carta de apresentação ou proposta comercial;
- convite institucional ou inscrição em evento;
- boletim técnico, relatório ou documento de referência;
- confirmação transacional, demonstrativo ou aviso de disponibilidade;
- compartilhamento de documento, assinatura eletrônica ou sala de dados;
- pesquisa, formulário, campanha ou convocação corporativa;
- mensagem de serviço, segurança, indisponibilidade ou mudança de processo.

Essa lista descreve possibilidades, não limita o conteúdo. A estrutura, extensão, tom, densidade visual, artefato, ação solicitada e técnica de phishing deverão variar entre os casos. Um e-mail poderá ser detalhado e diagramado como o exemplo de atualização cadastral; outro poderá ser uma notificação automática de poucas linhas; outro poderá trazer tabela, protocolo, agenda, resumo executivo ou documento anexado.

O elemento enganoso poderá estar no remetente, `Reply-To`, domínio, destino, anexo, QR, autenticação, consentimento, prazo, procedimento, contexto ou inexistência da campanha. Aparência profissional, linguagem correta e assunto plausível não serão tratados como prova de legitimidade.

## Limitação de identidade

Não poderão ser criadas simulações em que o atacante se apresente como:

- diretor, gestor, líder ou colega identificado;
- funcionário de fornecedor ou empresa parceira;
- advogado, auditor, recrutador, técnico, motorista, cliente ou atendente individual;
- pessoa conhecida pelo funcionário;
- conta pessoal, contato particular ou perfil individual;
- voz, vídeo ou imagem sintética de pessoa física.

Como a experiência solicitada é de phishing por e-mail e não pode personificar pessoas físicas, também ficam fora deste recorte:

- conversas de WhatsApp, SMS, telefone, reunião ou chat como estímulo principal;
- pedidos pessoais ou diálogos individuais;
- deepfake ou clonagem de voz;
- uso de nome, fotografia, assinatura ou dados de pessoa real;
- simulação de comprometimento de uma pessoa específica.

Uma técnica pesquisada que dependa desses elementos poderá permanecer na biblioteca como referência de ameaça, mas não será convertida diretamente em atividade. Para ser aproveitada, deverá ser reconstruída como e-mail institucional sem personificação de pessoa física e passar por nova aprovação.

Esta política não proíbe assuntos, pedidos, documentos, ações ou consequências por categoria. Ela proíbe somente a personificação de pessoa física e mantém o e-mail como estímulo inicial da experiência.

## Casos legítimos de controle

As atividades deverão incluir comunicações legítimas com acabamento equivalente. O funcionário não deverá aprender que todo e-mail de RH, Jurídico, Governo, fornecedor ou parceiro é malicioso.

A distinção será feita por processo verificável:

- existência do comunicado em fonte independente;
- remetente e domínio coerentes com o canal conhecido;
- destino real do link;
- procedimento anunciado previamente;
- proporcionalidade entre finalidade e dados, permissões ou autenticação solicitados;
- possibilidade de abrir o portal pela rota conhecida, sem depender do e-mail.

## Relação com os casos reais pesquisados

Os 24 dossiês continuam registrando campanhas reais, inclusive campanhas que personificaram pessoas. Pesquisa histórica não equivale a autorização editorial.

Ao converter um dossiê, o blueprint deverá registrar:

- `identidade_simulada`: `setor-interno`, `pessoa-juridica-externa` ou `orgao-publico`;
- `canal_inicial`: sempre `email`;
- nome institucional do remetente;
- ausência de assinatura individual;
- rota independente de confirmação;
- caso legítimo de controle;
- técnica preservada e elementos removidos da campanha original.

Se a técnica perder o sentido ao remover a pessoa física, o caso permanecerá somente como pesquisa e não será implementado.

## Segurança da implementação

- Todas as organizações, identidades visuais e pessoas jurídicas serão fictícias, salvo autorização expressa posterior.
- Endereços usarão `.example` e não serão navegáveis.
- QR Codes não serão escaneáveis.
- Links, anexos, logins, códigos e consentimentos serão representações inertes dentro do portal.
- Nenhuma simulação autoriza disparo de e-mail real.
- O backend autoritativo continua obrigatório antes de qualquer uso corporativo.
