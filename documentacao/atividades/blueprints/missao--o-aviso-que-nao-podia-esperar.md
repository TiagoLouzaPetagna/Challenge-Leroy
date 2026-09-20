# O aviso que não podia esperar — fundação

> **Estado do blueprint:** aprovado, implementado e validado na demonstração local em 2026-08-15.
>
> **Jornada curricular:** papel de fundação aprovado em 2026-08-15.
>
> **Integração no portal:** `mission:account-lock` versão 2 é a versão publicada; tentativas da versão 1 permanecem históricas e compatíveis.
>
> **Efeito técnico:** conteúdo versionado, player, contrato, avaliador, estado, envelope local 9, percurso e testes conectados. O backend autoritativo continua obrigatório antes do uso real.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Antes de agir sobre uma solicitação inesperada, identificar a ação pedida e sua consequência e concluir PARE por uma fonte independente |
| Mecânica-base aprovada | Estação PARE guiada + aplicação curta independente |
| Estado da atividade atual | Versão 2 disponível e validada na demonstração local; versão 1 preservada no histórico |
| Relação com implementação existente | Evolução semântica que preserva identidade lógica, rota, histórico, recompensa e contribuição da versão 1 |
| `activityId`, versão e rota publicados | `mission:account-lock`, versão 2, `/missoes/aviso-de-bloqueio` |
| `mechanicId` publicado | `phishing-foundation` |
| Pacote inicial publicado | `mission:account-lock:v2:foundation-account-alert` |
| Duração-alvo | 8–10 minutos |
| Regra de recompensa considerada | Missão: 100 pontos-base e bônus transversal vigente; sem nova recompensa para quem concluiu a versão 1 |
| Conceitos proprietários | Zero; a fundação fica fora das 22 atividades proprietárias e reapresenta conceitos de outras atividades sem mudar a propriedade |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- preservar `activityId`, rota e chaves lógicas de recompensa e contribuição;
- propor `activityVersion: 2` e contrato próprio `phishing-foundation`;
- publicar inicialmente um único pacote canônico, atribuído automaticamente;
- ensinar modelo mental de phishing, ação pedida, consequência, confirmação independente e PARE antes da avaliação final;
- usar uma aplicação curta legítima para impedir a regra falsa de que todo alerta é golpe;
- manter nove estados, revisão livre, resultado privado e debrief separado;
- manter somente estado de sessão durante a atividade, sem rascunho persistido entre recargas;
- propor pesos, controles críticos, competências, compatibilidade e testes.

### 1.2 O que permanece antes do uso real

- qualquer diretório, portal, reporte ou procedimento corporativo real.
- identidade, autorização, publicação de pacote e idempotência controladas por backend;
- validação dos textos e procedimentos pela organização que usar o portal;
- retenção, auditoria e integração corporativa autoritativas.

## 2. Contrato educacional

- **Comportamento observável:** interromper a ação automática, explicar o que foi pedido e o que pode ser afetado, reconfirmar por uma referência externa à solicitação e responder pelo processo apropriado.
- **Técnica ou objetivo do atacante:** usar um aviso falso de bloqueio, identidade corporativa aparente e urgência para levar a pessoa a um destino de coleta de credencial.
- **Atalho inseguro enfrentado:** começar procurando uma pista visual ou usar o botão recebido para “descobrir se é verdadeiro”, sem considerar o pedido, o impacto e a origem da confirmação.
- **Resposta segura generalizável:** aplicar PARE — Pare, Avalie, Reconfirme, Escale e responda — sem precisar provar tecnicamente que a mensagem é maliciosa.
- **O que a conclusão permite afirmar:** desempenho no processo desta tentativa e capacidade de reaplicá-lo num caso curto.
- **O que não permite afirmar:** retenção, domínio permanente, legitimidade de mensagens reais, controle humano do remetente ou capacidade de detectar todo phishing.

## 3. Inventário de conceitos e fronteira de propriedade

Esta fundação não recebe `conceptId` proprietário. Os conceitos abaixo são aplicações secundárias de itens que continuam mantidos nas atividades proprietárias do mapa aprovado.

| `conceptId` reapresentado | Proprietário no mapa | Papel aprovado no proprietário | Uso limitado nesta fundação | Destino de aprofundamento |
|---|---|---|---|---|
| `concept:pare-model` | Pedido urgente de um gestor | Transversal com proprietário | Apresentar as quatro etapas em linguagem simples | Aplicação completa sob autoridade e urgência |
| `concept:influence-urgency` | Pedido urgente de um gestor | Complementar | Mostrar que o prazo muda a pressão, não a necessidade de confirmar | Casos de autoridade, urgência real e exceção |
| `concept:credential-harvest` | Espelho de Página | Núcleo | Explicar a consequência possível sem renderizar formulário nem coletar dado | Origem da navegação e página de coleta simulada |
| `concept:registered-domain` | Domínio sob a lupa | Núcleo | Mostrar endereço completo como pista, sem ensinar anatomia da URL | Cirurgia de URL e domínio registrado |
| `concept:false-positive-control` | Uma manhã comum | Transversal com proprietário | Incluir uma transferência legítima que ainda exige processo | Triagem balanceada em lote |
| `concept:uncertain-reporting` | Uma manhã comum | Transversal com proprietário | Permitir interromper e reportar suspeita sem exigir diagnóstico definitivo | Reporte sob ambiguidade e rotina |

Nenhum desses conceitos recebe nota, recompensa ou evidência separadas nesta atividade. A avaliação mede um único comportamento: concluir o processo PARE antes de agir.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — O aviso e a rota conhecida | Início do expediente com aviso inesperado de bloqueio de conta | Identificar pedido e consequência, pausar, reconfirmar fora da mensagem e responder pelo processo | Nenhum; a fundação usa somente aplicações secundárias formativas | Aviso legítimo de expiração orienta a abrir a área oficial sem fornecer link | Caso principal suspeito; transferência legítima após confirmação |

P1 é um identificador de documentação e teste. Ele não aparece para o funcionário. A primeira conclusão recebe automaticamente o único pacote publicado. A interface inicial será **sem seletor de caso**: a versão 2 não publica P2 ou P3.

## 5. Caso e conteúdo da primeira versão

### Percurso P1 — O aviso e a rota conhecida

| Elemento | Definição |
|---|---|
| Situação inicial | O funcionário inicia o expediente e recebe um aviso de que sua conta será bloqueada em 30 minutos se não confirmar os dados. |
| Canal e artefatos | Uma mensagem de e-mail textual, prévia inerte do destino, cartão da área oficial conhecida e estado fictício do serviço. Não há caixa com mensagens concorrentes. |
| Identidade ou pretexto | “Central de Acessos”, com nome e aparência corporativos, usando `suporte@seguranca-contas.example`. |
| Objetivo do atacante ou hipótese legítima | Levar a pessoa a abrir um destino não verificado e fornecer credenciais; a intenção não precisa ser tecnicamente provada para interromper a ação. |
| Pressões e aparências | Prazo de 30 minutos, ameaça de bloqueio, assinatura e botão com texto tranquilizador. |
| Ação pedida | Abrir o botão recebido e “confirmar” a conta. |
| Ativo e consequência | Conta e credenciais corporativas; a consequência possível é entregar autenticação ou sessão a um destino não verificado. |
| Evidências disponíveis | Endereço completo do remetente, prévia do destino, ausência de manutenção no estado fictício e referência conhecida da área oficial. |
| Evidência decisiva ou limite de certeza | A solicitação não fornece confirmação independente. O portal aberto por referência conhecida informa que não há bloqueio; isso permite agir com segurança sem diagnosticar a origem técnica do e-mail. |
| Confirmação independente | Favorito corporativo fictício ou referência previamente apresentada, nunca o botão, endereço ou contato contido na mensagem. |
| Ação segura | Não usar o botão recebido; abrir a área oficial pela referência conhecida, manter a conta sem alteração e reportar a mensagem como suspeita. |
| Reporte | Selecionar remetente, assunto, horário, ação pedida e prévia do destino; nunca senha, código ou dado pessoal. |
| Transferência curta | Um aviso legítimo informa que a senha expirará no dia seguinte, não contém link e orienta a usar a área oficial. O estado fictício confirma a política; a resposta correta é prosseguir pela rota conhecida sem reportar incidente. |
| Debrief | Phishing tenta provocar uma ação. Aparência, urgência ou uma pista isolada não resolvem o caso; PARE transforma o pedido em uma decisão segura e também permite reconhecer alertas legítimos. |
| Conteúdo fictício necessário | Uma mensagem principal, uma prévia não navegável, uma referência oficial, um estado de serviço, quatro cartões PARE, uma transferência legítima e feedback versionado. |

Nenhum artefato abre link, solicita credencial, altera conta ou executa reporte. Todos os nomes e endereços usam dados fictícios e domínios `.example`.

## 6. Mecânica e diferenciação

- **Interação central:** construir uma cadeia **pedido → ativo → consequência → fonte de confirmação → resposta**, percorrendo os quatro passos PARE em uma estação guiada; em seguida, reaplicar o processo sem dicas num alerta curto legítimo.
- **Por que combina com o comportamento:** a atividade começa pelo que a mensagem quer provocar e pelo impacto possível, evitando que a pessoa dependa de uma lista de sinais ou de conhecimento técnico prévio.
- **Como se distingue das 22 atividades proprietárias:** não disseca cabeçalhos ou URL, não investiga conta comprometida, não simula página de login e não faz triagem em lote. Ela ensina a linguagem e o processo usados depois por todas essas práticas.
- **O que é reutilizável:** `ActivityShell`, progresso, grupos de decisão, região de consequência, revisão, resultado, debrief, runtime validar→avaliar→persistir e preferências de acessibilidade.
- **O que exigiu trabalho novo:** estação PARE integrada ao `PhishingFoundationMission`, pacote v2, resumo causal pedido–consequência–fonte, transferência com orientação reduzida e avaliador próprio.
- **Alternativa sem arrastar, mídia ou representação espacial:** lista ordenada PARE, botões **Usar nesta etapa**, seletores agrupados e resumo tabular completo; arrastar não será implementado como requisito.
- **Risco de virar questionário disfarçado e prevenção:** cada escolha altera a cadeia causal e a fonte consultada; a consequência é mostrada de forma inerte, a revisão recompõe o processo e a transferência remove a orientação sem trocar o comportamento.

O painel de evidências de **A conversa já estava acontecendo** não é usado nem modificado por esta Missão.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Papel, situação, tarefa única, consequência protegida e aviso de ambiente fictício | Iniciar o caso atribuído automaticamente | Pacote canônico publicado | `casePackageId` | Contexto direto, sem jargão e sem revelar a resposta | Foco no `h1` e resumo textual |
| Investigação | Mensagem, ação pedida e opções de ativo/consequência | Identificar pedido, ativo e consequência | Um item de cada grupo selecionado | `requestedActionId`, `protectedAssetId`, `potentialConsequenceId` | Explica o significado da tarefa, não a correção | `fieldset`, `legend` e descrições completas |
| Decisão inicial | P de Pare e A de Avalie | Escolher se pausa antes de agir e montar a relação causal | Pausa e avaliação preenchidas | `pauseDecisionId` e etapas guiadas concluídas | Feedback formativo sobre o processo, sem nota | Lista PARE numerada |
| Consequência | Prévia inerte do que o botão recebido tentaria solicitar | Comparar a consequência com o que está sendo protegido | Visualização reconhecida | conclusão provisória mantida em sessão | Mostra risco sem campo de entrada, clique real ou susto | Descrição textual equivalente |
| Revisão | Cadeia completa e fontes possíveis | Rever pedido, impacto e qualquer escolha | Livre antes do envio | estado de sessão revisado | Sem penalidade por revisão | Resumo tabular e retorno de foco |
| Decisão final | R de Reconfirme e E de Escale e responda | Escolher fonte independente, avaliação final, ação e detalhes do reporte | Controles críticos completos | confirmação, avaliação, ação e reporte | Erros específicos, sem apagar respostas | Grupos de decisão e resumo de erros |
| Transferência | Alerta legítimo curto, sem as instruções passo a passo | Identificar pedido, confirmar pela rota conhecida e decidir | Resposta mínima completa | decisões de transferência | Feedback somente após a conclusão | Caso integral em texto |
| Resultado | Nota privada, cinco parcelas, controles e recompensa potencial | Rever o próprio processo ou concluir | Avaliação válida e persistida | resultado derivado | Linguagem sem culpa e recomendação seguinte | Resumo linear com título focado |
| Debrief | Modelo de phishing, PARE, diferença entre suspeito e legítimo e limites técnicos | Ler, repetir ou seguir para o primeiro PhishLab | Sem nova nota | visualização opcional | Regra transferível, sem declarar domínio permanente | Texto independente de cor e layout |

A orientação explica **como decidir**, não qual opção selecionar. Todas as escolhas podem ser revistas antes do envio. Velocidade não é coletada para pontuação.

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa concluída | Contexto e botão para iniciar o caso canônico | Apenas estado objetivo | Foco no `h1` |
| Em andamento | Pacote iniciado na sessão | Estação PARE e navegação reversível | Sessão atual; sem rascunho durável | Progresso e etapa anunciados |
| Retomada | Retorno dentro da mesma sessão | Resumo do caso e continuação | Mesmo pacote e versão | Contexto reapresentado antes dos controles |
| Revisão | Cadeia inicial completa | Alterar qualquer resposta antes do envio | Estado de sessão atualizado | Foco no primeiro item solicitado para revisão |
| Concluída | Resposta válida avaliada e salva | Resultado privado e debrief | Tentativa imutável | Título do resultado focado |
| Repetição | Nova tentativa após conclusão | Repetir o caso sem recompensa duplicada; banco de casos somente quando publicado | Melhor e última tentativa separadas | Aviso explícito de repetição |
| Conteúdo indisponível | Versão ou pacote não publicado | Explicação e retorno ao hub | Nenhuma tentativa | `role="alert"` sem redirecionamento silencioso |
| Resposta inválida | Campo ausente, ID desconhecido ou relação incompatível | Corrigir sem perder as respostas | Não conclui | Erros associados aos grupos |
| Falha ao salvar | Avaliação válida e persistência falhou | Tentar salvar novamente ou sair sem recompensa | Nenhuma recompensa até confirmação | Alerta persistente e foco preservado |

Uma recarga completa durante a versão 2 reinicia o caso, pois este recorte não inclui `activityDrafts`. O reinício não cria tentativa nem perde recompensa já confirmada.

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Ação pedida, ativo e consequência | 20 | Identifica os três elementos coerentes | Identifica dois elementos: 10 | Confunde aparência ou urgência com a ação/impacto: 0 | Observar; Investigar |
| Pausa e avaliação inicial | 15 | Pausa antes do botão e avalia impacto: 15 | Evita o botão, mas pretende excluir sem avaliar: 7 | Usa primeiro o controle recebido: 0 | Decidir |
| Confirmação independente | 25 | Abre a referência conhecida fora da mensagem: 25 | Procura o serviço por busca genérica: 8 | Usa remetente, botão ou contato da mensagem: 0 | Verificar |
| Resposta e reporte proporcionais | 25 | Mantém a conta, usa rota oficial e reporta apenas fatos seguros: 25 | Verifica com segurança, mas omite reporte: 18; apenas exclui: 8 | Insere dado, encaminha segredo ou continua no destino recebido: 0 | Decidir; Reportar |
| Transferência e controle de falso positivo | 15 | Confirma o alerta legítimo e prossegue pela rota conhecida sem incidente: 15 | Mantém segurança, mas reporta desnecessariamente: 10; descarta sem verificar: 5 | Obedece sem confirmação independente: 0 | Verificar; Decidir |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- as quatro explicações guiadas não concedem pontos por mera visualização;
- conclusão e desempenho são estados separados; nota baixa não bloqueia a jornada;
- `needsReview` é verdadeiro abaixo de 75 ou quando um controle crítico falhar;
- o feedback separa pedido, consequência, indício, limite de certeza e processo seguro;
- urgência, logotipo, nome, domínio ou HTTPS isolados não recebem valor de veredito;
- velocidade não é pontuada;
- o alerta legítimo não premia exclusão ou reporte automático.

### 9.1 Controles críticos

- não usar o botão ou a rota fornecida na solicitação para confirmar a própria solicitação;
- escolher uma fonte obtida independentemente da mensagem;
- não inserir, compartilhar ou encaminhar credencial, código ou segredo;
- interromper e reportar o caso principal com detalhes não sensíveis;
- no caso legítimo, somente prosseguir depois da confirmação pela rota conhecida.

### 9.2 Resultado privado

O funcionário vê nota 0–100, cinco parcelas, cadeia pedido–consequência–fonte, controles atendidos, diferença entre o caso suspeito e o legítimo, competências derivadas, feedback sem culpa, recompensa potencial e recomendação para **Quem enviou de verdade?**. Equipe e gestão não recebem escolhas, cadeia, mensagem ou resposta individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, com bônus transversal de 10%, 20% ou 30% conforme a nota; máximo de 130 na primeira conclusão válida da atividade lógica.
- **Chave preservada:** `mission:account-lock:first-completion`.
- **Contribuição preservada:** `team:mission:account-lock:first-contribution`, derivada uma única vez como 12, 8, 5 ou 2 conforme os controles do primeiro resultado aceito.
- **Idempotência entre versões:** conclusão v1 seguida de v2 registra tentativa e evidências v2, mas não concede outra recompensa nem contribuição; conclusão inicial em v2 usa a mesma chave lógica.
- **Repetição:** atualiza melhor e última tentativa sem duplicar pontos, conquista ou contribuição.
- **Competências publicadas para v2:** Observar, Investigar, Verificar, Decidir e Reportar; a versão 1 mantém suas evidências originais.
- **Jornada:** sem pré-requisito; recomenda primeiro **Quem enviou de verdade?** e depois **Domínio sob a lupa**, sem bloquear conteúdo disponível.
- **Integrações:** hub de Missões, recomendação da Visão geral, Perfil, atividade recente, pontos, competências, conquistas e histórico.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta implementado

O contrato implementado é `PhishingFoundationV2Submission`.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | literal `mission:account-lock` | Sim | registro publicado | rejeitar divergência |
| `activityVersion` | literal `2` | Sim | registro publicado | v1 usa o contrato histórico |
| `casePackageId` | literal publicado `mission:account-lock:v2:foundation-account-alert` | Sim | conteúdo/servidor | primeiro pacote atribuído, não escolhido |
| `mechanicId` | literal `phishing-foundation` | Sim | contrato | discrimina a tentativa |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |
| `requestedActionId` | opção allowlisted | Sim | interação | o que a mensagem pede |
| `protectedAssetId` | opção allowlisted | Sim | interação | ativo ou processo afetado |
| `potentialConsequenceId` | opção allowlisted | Sim | interação | consequência coerente com pedido e ativo |
| `pauseDecisionId` | opção allowlisted | Sim | interação | agir, excluir ou pausar e avaliar |
| `evaluationId` | opção allowlisted | Sim | interação | relação pedido–ativo–consequência ou atalhos inseguros |
| `confirmationRouteId` | referência fictícia allowlisted | Sim | interação | independência validada pelo pacote |
| `finalAssessmentId` | `suspicious-unconfirmed`, `confirmed-malicious`, `legitimate` | Sim | interação | não exige diagnóstico técnico |
| `finalActionId` | ação allowlisted | Sim | interação | coerente com avaliação e confirmação |
| `reportDetailIds` | lista fechada, sem duplicatas | Condicional | interação | obrigatória no caso principal; proíbe segredo |
| `transferDecisionId` | opção allowlisted | Sim | transferência | sintetiza a resposta ao caso legítimo depois que pedido, rota conhecida e estado oficial já foram exibidos |

Nota, parcelas, controles críticos, `needsReview`, competências, bônus, recompensa, contribuição, feedback e recomendação são derivados pelo avaliador; o cliente não os envia como verdade.

### 11.1 Invariantes

- ID, versão, mecânica e pacote devem corresponder ao registro publicado;
- na primeira conclusão, o pacote é atribuído pelo runtime e apenas confirmado pela submissão;
- a passagem pelas etapas guiadas permanece no estado de sessão e não é persistida nem pontuada;
- toda opção pertence à allowlist do pacote e relações pedido–ativo–consequência são coerentes;
- listas rejeitam duplicatas e valores extras;
- reporte é obrigatório no caso principal, mas não no alerta legítimo de transferência;
- nenhuma opção aceita texto livre, credencial, código, endereço ou dado real;
- replay do mesmo `attemptId` é no-op;
- tentativa nova não duplica recompensa nem contribuição;
- conteúdo e avaliador possuem a mesma versão.

## 12. Persistência, compatibilidade e backend

### Demonstração local implementada

- `PhishingFoundationV2Attempt` combina a resposta v2 com o resultado derivado;
- a forma integra `LearningAttempt`, mantendo `MissionAttempt` v1 intacta;
- o runtime P0 segue validar → avaliar → persistir/retornar;
- escolhas parciais permanecem somente no estado React da sessão;
- somente tentativa concluída, progresso, evidências derivadas, recomendação e chaves já existentes são persistidos;
- `isAuthoritative: false` permanece visível.

### Versão do estado local

A forma persistida usa `APP_SCHEMA_VERSION = 9` e envelope `mvp-local-v9`. A migração v8→v9 atualiza apenas `meta.schemaVersion`, revalida o estado e preserva integralmente tudo que já existe. Ela não cria tentativa, conclusão, competência, ponto, recompensa, recomendação ou contribuição.

### Compatibilidade

- o registro publica v2 e aceita `[1, 2]`;
- resultados v1 continuam usando o avaliador e a apresentação histórica originais;
- nenhum campo de PARE, transferência ou confirmação é fabricado para tentativas v1;
- a chave lógica de recompensa e a contribuição continuam únicas entre versões;
- migrações anteriores permanecem válidas e cobertas;
- payload incompatível segue para quarentena;
- voltar de v2 para v1 não reavalia nem apaga tentativas v2.

### Backend autoritativo obrigatório

Antes do uso real, o servidor controla identidade, autorização, público, versão e pacote atribuídos, allowlists, horário confiável, avaliação, competências, recompensa, contribuição, idempotência, transação, auditoria, retenção e exclusão. A referência oficial e o procedimento de reporte precisam de publicação organizacional versionada e autorizada. O cliente envia somente a resposta bruta.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios da tentativa concluída | Própria tentativa | Não | Não; somente auditoria autorizada e restrita |
| Nota e feedback | Resultado derivado | Completos | Não | Apenas agregado permitido |
| Competências | Evidências derivadas | Próprias | Agregado sem resposta | Agregado com limiar de privacidade |
| Recompensa | Chave e valor demonstrativos | Própria | Não | Total agregado quando permitido |
| Agregado | Contribuição derivada sem conteúdo da mensagem | Contexto coletivo permitido | Contagem e tendência | Contagem e tendência autorizadas |

O conteúdo proíbe senha, OTP, segredo, dado pessoal, conta, telefone, link, formulário, contato ou reporte real. A prévia do destino não possui `href`, o cartão de portal oficial não navega e a interface não afirma que conta, suporte ou Segurança foram acionados.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente depois de avançar, revisar, concluir e abrir o debrief;
- contexto, papel, tarefa e consequência apresentados antes do primeiro grupo de respostas;
- estação PARE como lista ordenada sem depender de posição espacial, cor ou acrônimo isolado;
- cadeia pedido–ativo–consequência disponível como tabela textual equivalente;
- `fieldset` e `legend` para cada decisão relacionada;
- operação integral por teclado, sem arrastar;
- estado selecionado anunciado por texto e sem depender de ícone;
- consequência inerte com descrição textual equivalente;
- erros em região apropriada, associados ao campo e sem apagar respostas;
- resultado e feedback em regiões anunciadas sem mover foco para o corpo da página;
- contraste, texto ampliado e movimento reduzido;
- ausência de cronômetro e linguagem sem culpa;
- desktop neste blueprint; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo legado e infraestrutura de pacotes P0 | `lib/content/activities/account-lock/v2.ts` com um pacote canônico e transferência | Aprovação editorial e do pacote |
| Interface | `ActivityShell`, progresso, grupos de decisão, erro, resultado e debrief | `features/missions/PhishingFoundationMission.tsx`, incluindo a estação PARE | Player v2 registrado na rota existente |
| Contrato e avaliador | Runtime validar→avaliar→persistir e bônus vigente | `PhishingFoundationV2Submission`, validador, avaliador e controles próprios | Aprovar IDs, pesos e relações |
| Estado e provider | Reducer, evidências, recomendação e gateway atuais | Action/adapter v2 sem contaminar `MISSION_COMPLETED` v1 | Resultado retornado deve ser o persistido |
| Persistência | Envelope, migrações e quarentena atuais | Tentativa v2, esquema 9 e migração v8→v9 | Round-trip e preservação histórica |
| Integrações | Registro, hubs, Perfil, atividade recente e conquistas | Publicar v2, aceitar v1/v2 e atualizar ordem/recomendação | Jornada curricular aprovada |
| Testes | Suíte de domínio/SSR e harness Playwright atuais | Fundação guiada, transferência legítima, compatibilidade v1/v2 e clareza contextual | Todos os gates antes de disponibilidade |

**Esforço relativo:** G no conjunto, embora a mecânica visual seja M, porque a evolução atravessa contrato, tentativa, migração, player inline, jornada e compatibilidade. **Posição:** gate curricular e técnico anterior à prova 1.3; não constitui cronograma de publicação.

## 16. Testes e critérios de aceite

### Automatizados de domínio, estado e persistência

- registro preserva `mission:account-lock`, rota, 100 pontos, chave de recompensa e aceita versões 1 e 2;
- pacote canônico, mecânica, opções e relações possuem IDs únicos e allowlists fechadas;
- o primeiro caso é atribuído automaticamente e não existe opção de P1/P2/P3 na submissão ou na abertura;
- caso integral resulta em 100 e recompensa potencial 130 quando ainda não reivindicada;
- cada parcial produz a parcela exata descrita e a soma permanece limitada a 0–100;
- usar o botão recebido, confirmar pela própria mensagem ou compartilhar segredo exige revisão;
- transferência legítima premia confirmação e prosseguimento pela rota conhecida, não exclusão ou reporte automático;
- a passagem visual pelas etapas guiadas não é persistida nem concede pontos isoladamente;
- payload com versão, pacote, mecânica, ID, lista ou relação inválida é rejeitado antes da avaliação;
- replay do mesmo `attemptId` é no-op;
- nova tentativa atualiza melhor/última sem duplicar recompensa, contribuição, conquista ou histórico coletivo;
- concluir v1 e depois v2, nas duas ordens possíveis, preserva uma única recompensa e contribuição;
- evidências v1 permanecem imutáveis e evidências v2 usam somente o resultado novo;
- migração v8→v9 preserva estado byte a byte fora do metadado; migrações anteriores continuam aprovadas;
- tentativa v2 malformada entra em quarentena;
- Perfil, atividade recente, recomendação e SSR usam a apresentação correta de cada versão.

### Automatizados de navegador

- exatamente um `h1`, foco previsível e progresso anunciado em todos os nove estados;
- briefing contém papel, situação, tarefa e consequência antes da primeira resposta;
- estação PARE, cadeia causal e grupos de decisão funcionam integralmente por teclado;
- nenhuma tela oferece seletor de percurso ou pacote;
- revisão preserva respostas e erro mantém o contexto;
- prévia, portal e reporte são inertes e não possuem navegação externa;
- resultado, debrief e repetição não duplicam pontos;
- alto contraste, texto extra grande, movimento reduzido e 1280×720/1440×900 sem overflow horizontal;
- `axe` sem violações sérias ou críticas e console sem erro.

### Manuais no desktop

- pessoa sem vocabulário técnico entende o que aconteceu e o que deve fazer em cada etapa;
- respostas continuam compreensíveis quando lidas fora do título da pergunta;
- caso principal não exige certeza de fraude e caso legítimo não ensina bloqueio indiscriminado;
- leitor de tela anuncia PARE e a cadeia na ordem correta;
- nenhuma ação externa ocorre e o modo demonstrativo permanece explícito.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Outros canais para o mesmo alerta | Banco de casos futuro | Validar a fundação canônica e provar atribuição automática/repetição | A primeira versão precisa permanecer simples e previsível |
| Casos suspeito, legítimo e inconclusivo completos | Pacotes futuros | Revisão editorial e teste de que cada pacote mantém o mesmo comportamento | A transferência legítima já controla o falso positivo sem criar três percursos iniciais |
| Cabeçalhos e identidade | **Quem enviou de verdade?** | Player v2 próprio | A fundação apenas aponta o endereço completo; não substitui o laboratório |
| Anatomia de URL | **Domínio sob a lupa** e laboratórios seguintes | Players próprios | A fundação não ensina domínio registrado, redirecionamento ou Unicode |
| Página de coleta de credencial | **Espelho de Página** | Player próprio | Nenhum formulário ou campo de credencial pertence à fundação |
| Resposta depois de interação | **Cliquei. E agora?** | Missão própria | A versão inicial termina antes de qualquer exposição real ou simulada |
| Procedimento, diretório e reporte reais | Publicação futura autorizada | Backend e governança organizacional | Artefatos atuais permanecem fictícios e inertes |
| Celular, voz ou vídeo | Etapa posterior | Decisão específica de dispositivo/mídia e acessibilidade | Fora do recorte atual |

## 18. Gates da conversão técnica

Os seguintes gates foram aprovados e confirmados na conversão:

- `mission:account-lock` versão 2, mesma rota e `mechanicId: "phishing-foundation"`;
- pacote único `mission:account-lock:v2:foundation-account-alert`, atribuído automaticamente;
- caso principal suspeito e transferência legítima descritos na seção 5;
- cadeia pedido–ativo–consequência–fonte–resposta e estação PARE guiada;
- pesos 20/15/25/25/15, corte 75 e controles críticos;
- competência Verificar adicionada somente às evidências da versão 2;
- contribuição 12/8/5/2 e chaves lógicas preservadas entre versões;
- ausência de rascunho persistido e reinício informado após recarga;
- nova tentativa v2, esquema 9 e migração v8→v9 restrita ao metadado;
- player v2 registrado, conteúdo final, alternativas, feedback e recomendação para os PhishLabs iniciais;
- revisão manual de clareza por alguém que não conheça os termos técnicos.

A implementação local não autoriza publicação para uso real. Backend autoritativo e validação especializada continuam gates separados.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| Implementação inicial | `mission:account-lock` v1 criada como Missão piloto | Implementada | Contrato `MissionSubmission`, recompensa e contribuição legadas |
| 2026-08-15 | Papel de fundação, nova jornada, PARE e confirmação independente aprovados | Aprovado conceitualmente | Nenhum |
| 2026-08-15 | Blueprint v2 detalhado com pacote único, transferência legítima, avaliação, compatibilidade e arquitetura | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint aprovado e convertido em conteúdo, contrato, avaliador, player, persistência v9, percurso e testes | Implementada e validada na demonstração local | Migração v8→v9 apenas de metadado; versões 1 e 2 aceitas sem recompensa duplicada |
| 2026-08-15 | Revisão de uso após inspeção da primeira atividade: progresso e enunciados precisavam de contexto mais explícito | Implementada e revalidada na demonstração local | O progresso passou a separar Concluído, Agora e A seguir; perguntas e alternativas passaram a nomear o e-mail, a conta, a consulta oficial e a decisão avaliada; o foco dos títulos recebeu indicador visual coerente, sem alterar IDs, contrato, nota ou versão |
