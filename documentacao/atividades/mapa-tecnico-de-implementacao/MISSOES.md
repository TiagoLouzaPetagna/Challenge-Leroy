# Mapa técnico das oito Missões

> **Estado:** identidades, versões-alvo e rotas aprovadas; a fundação, **A conversa já estava acontecendo**, **Você iniciou este acesso?** e **Cliquei. E agora?** estão implementadas em v2; as demais atividades continuam condicionadas à implementação individual.
>
> **Regra de área:** 100 pontos-base e bônus transversal vigente na primeira conclusão válida. Evolução v2 não reabre recompensa já concedida à atividade lógica.

## 1. Matriz de identidade

| Missão | Estado atual | Identidade técnica candidata | Estratégia | Onda |
|---|---|---|---|---:|
| A conversa já estava acontecendo | disponível v2; v1 histórica | `mission:compromised-conversation` v2 · `/missoes/a-conversa-ja-estava-acontecendo` | ID/rota preservados; três pacotes publicados | 1 |
| Você iniciou este acesso? | disponível v2; v1 histórica | `mission:mfa-fatigue` v2 · `/missoes/voce-iniciou-este-acesso` | ID/rota preservados; três pacotes publicados | 4 |
| Cliquei. E agora? | disponível v2; v1 histórica | `mission:clicked-now-what` v2 · `/missoes/cliquei-e-agora` | ID/rota preservados; três pacotes publicados | 1 |
| Pedido urgente de um gestor | card planejado | `mission:urgent-manager-request` v1 · `/missoes/pedido-urgente-do-gestor` | preservar ID e slug já existentes | 3 |
| Documento inesperado | card planejado | `mission:unexpected-document` v1 · `/missoes/documento-inesperado` | preservar ID e slug já existentes | 3 |
| A central que não podia esperar | inexistente | `mission:official-callback` v1 · `/missoes/a-central-que-nao-podia-esperar` | nova identidade candidata | 4 |
| Ele já sabia meus dados | inexistente | `mission:personalized-pretext` v1 · `/missoes/ele-ja-sabia-meus-dados` | nova identidade candidata | 4 |
| O pedido não tinha link | inexistente | `mission:pretext-without-link` v1 · `/missoes/o-pedido-nao-tinha-link` | nova identidade candidata | 4 |

O piloto legado `mission:account-lock` continua fora deste portfólio proprietário e não será renomeado nem reutilizado pela nova central. Ele recebeu separadamente o papel de fundação da jornada.

### 1.1 Fundação adicional — O aviso que não podia esperar v2

- **Blueprint:** [`missao--o-aviso-que-nao-podia-esperar.md`](../blueprints/missao--o-aviso-que-nao-podia-esperar.md).
- **Identidade implementada:** `mission:account-lock`, versão 2 publicada em `/missoes/aviso-de-bloqueio`, aceitando versões `[1, 2]`.
- **Mecânica:** `phishing-foundation`, com estação PARE guiada e aplicação curta independente.
- **Pacote inicial:** `mission:account-lock:v2:foundation-account-alert`, único e atribuído automaticamente; nenhum seletor P1/P2/P3.
- **Contrato bruto implementado:** ação pedida, ativo, consequência, pausa, avaliação, confirmação, conclusão, ação/reporte e transferência legítima.
- **Derivados:** cinco parcelas 20/15/25/25/15, controles críticos, competências, `needsReview`, recompensa e contribuição.
- **Compatibilidade:** `MissionAttempt` v1 continua histórico; v2 usa `PhishingFoundationV2Attempt`, esquema 9 e migração v8→v9 restrita ao metadado. Recompensa e contribuição mantêm as chaves lógicas atuais.
- **Interface:** `PhishingFoundationMission` está no registro visual, compõe `ActivityShell` e implementa a estação PARE sem painel de evidências ou nova rota.

O blueprint foi aprovado, convertido e validado. A próxima conversão curricular pode tratar **Quem enviou de verdade? v2** individualmente.

## 2. A conversa já estava acontecendo

### Fronteira técnica

- **Blueprint:** [`missao--a-conversa-ja-estava-acontecendo.md`](../blueprints/missao--a-conversa-ja-estava-acontecendo.md).
- **Mecânica:** C2 ordenação/linha temporal + painel de evidências C1.
- **Contrato bruto implementado:** `casePackageId`, `orderedArtifactIds`, `turningPointArtifactId`, `evidenceAssessments`, conclusões provisória/final, `confirmationRouteId`, `finalActionId`, `reportDetailIds` e `transferDecisionId`.
- **Derivados:** precedências da ordem, ponto de mudança, classificação das evidências, calibração, confirmação independente, ação/reporte, nota, competências e `needsReview`.

### Reuso e trabalho novo

Reutiliza thread textual, fontes, resultado e infraestrutura de Missão. Exige lista reordenável acessível, marcação de ponto, painel de evidências fixadas e avaliador de precedências. O embaralhamento inicial pertence ao pacote e deve ser determinístico por tentativa ou definido pelo servidor, nunca pela posição visual da resposta correta.

### Compatibilidade

A resposta genérica v1 continua como `MissionAttempt`; v2 usa `ConversationReconstructionV2Attempt`. Reabrir resultado v1 mostra uma leitura histórica, sem convertê-lo em v2. A chave lógica de recompensa permanece a mesma. A forma nova ativou `APP_SCHEMA_VERSION = 8` e migração v7→v8 restrita ao metadado de esquema.

### Testes próprios

- ordem integral, parcialmente equivalente e impossível;
- ponto de mudança correto sem destaque antecipado;
- evidência útil, irrelevante e duplicada;
- confirmação dentro da thread exige revisão;
- teclado, anúncio de posição e foco após mover;
- v1 legível e v2 sem recompensa duplicada.

Esses testes foram implementados no domínio/SSR e no harness Playwright. A próxima prova técnica da Onda 1 continua sendo **Quem enviou de verdade? v2**, depois do gate documental da fundação e das regras de atribuição automática e clareza definido na jornada curricular.

## 3. Você iniciou este acesso?

### Fronteira técnica

- **Blueprint:** [`missao--voce-iniciou-este-acesso.md`](../blueprints/missao--voce-iniciou-este-acesso.md).
- **Mecânica:** C7 console textual reativo + ações oficiais fictícias C4.
- **Contrato bruto implementado:** `casePackageId`, associações e ações por evento, respostas ao suporte, rota oficial, ações no console, detalhes do reporte e transferência.
- **Derivados:** resposta a eventos não iniciados, separação suporte/console, revisão de sessão, reporte e controles críticos.

### Reuso e trabalho novo

Reutiliza o conteúdo e a identidade da Missão v1 e substitui o painel estático por máquina de estados finita. Eventos chegam quando a pessoa avança, sem cronômetro. A conversa de suporte reage por transições publicadas e o histórico permanece consultável.

### Compatibilidade

V1 continua `MissionAttempt`; v2 usa `MfaConsoleV2Attempt`, esquema 11 e migração v10→v11. A conclusão prévia mantém pontos e progresso. Os dois PhishLabs permanecem pré-requisitos.

### Testes próprios

- negar evento alheio, tratar evento próprio ainda ativo e evento encerrado;
- aprovar para “parar notificações” exige revisão;
- suporte não recebe OTP nem aprovação;
- entrada pela área oficial é distinta do link da conversa;
- máquina retoma somente em estado válido;
- histórico, foco e movimento reduzido.

Esses testes foram implementados no domínio/SSR e no harness Playwright. A primeira abertura atribui o pacote canônico; pacotes alternativos aparecem apenas após conclusão.

## 4. Cliquei. E agora?

### Fronteira técnica

- **Blueprint:** [`missao--cliquei-e-agora.md`](../blueprints/missao--cliquei-e-agora.md).
- **Mecânica:** C4 montador de ações/reporte + relações parciais C2.
- **Contrato bruto implementado:** `casePackageId`, ordem dos fatos, estágio de exposição, ações com grupo/posição, blocos do reporte, rota oficial e transferência.
- **Derivados:** fatos e estágio, classificação, dependências críticas, proporcionalidade, reporte, transferência, nota e `needsReview`.

### Reuso e trabalho novo

Publica três pacotes internos e usa linha temporal, lembrete contextual, grupos Primeiras ações seguras/Ações sob orientação da equipe responsável/Ações que aumentam o risco, botões de movimento, validação de todos os cartões exatamente uma vez e construtor final. Não exige uma ordem total quando ações puderem ocorrer em paralelo.

### Compatibilidade

O contrato específico v1 permanece histórico. A versão 2 usa `RecoveryBuilderV2Attempt`, esquema 12 e migração v11→v12; não converte checkboxes anteriores em posições no quadro nem concede outra recompensa.

### Testes próprios

- os três pacotes publicados;
- cada cartão classificado uma vez, sem extras ou omissões;
- dependências críticas por incidente;
- senha, OTP e segredo nunca entram no reporte;
- arraste opcional e fluxo completo por botões/teclado;
- resposta rápida e sem culpa após erro do usuário.

Esses testes foram implementados no domínio/SSR e no harness Playwright. A primeira abertura usa o caso canônico de clique sem envio de dados; os demais pacotes aparecem apenas após conclusão.

## 5. Pedido urgente de um gestor

### Fronteira técnica

- **Blueprint:** [`missao--pedido-urgente-de-um-gestor.md`](../blueprints/missao--pedido-urgente-de-um-gestor.md).
- **Mecânica:** C5 estação de processo com conversa curta.
- **Contrato bruto proposto:** `casePackageId`, `requestAssessmentId`, `authorityClaimId`, `verificationSourceId`, `controlOrder`, `exceptionRouteId`, `replyTemplateId`, `reportBlockIds`.
- **Derivados:** preservação de alçada, independência da verificação, resposta profissional e nota.

### Reuso e trabalho novo

O card atual fornece ID e slug, não contrato. A implementação reutiliza fontes progressivas e organizador de controles. Precisa de matriz fictícia de alçada e de uma redação canônica única do PARE antes do pacote executável.

### Compatibilidade

Como não há tentativa válida anterior, começa em v1 e possui nova chave de recompensa. A atividade não herda o pré-requisito do card legado nem cria obrigação curricular automaticamente.

### Testes próprios

- gestor legítimo com pedido válido;
- conta comprometida e autoridade simulada;
- urgência real sem quebra do processo;
- confirmação pelo contato fornecido na mensagem é insuficiente;
- segunda aprovação não substitui verificação quando ambas forem exigidas.

## 6. Documento inesperado

### Fronteira técnica

- **Blueprint:** [`missao--documento-inesperado.md`](../blueprints/missao--documento-inesperado.md).
- **Mecânica:** C1 inspetor de propriedades + cadeia de exposição + C4 para ação segura.
- **Contrato bruto proposto:** `casePackageId`, `inspectedPropertyIds`, `contextAssessmentId`, `protectionRequestAssessmentId`, `preExecutionActionId`, `exposureStateId`, `reportBlockIds`.
- **Derivados:** confirmação de contexto, recusa de quebra de proteção, resposta proporcional e nota.

### Reuso e trabalho novo

Todos os arquivos são cartões descritivos; não existe upload, download, macro, comando ou execução. A Missão termina antes da exposição quando nada foi executado. Casos de execução real simulada seguem para **Cliquei. E agora?**, evitando duplicação.

### Compatibilidade

O ID planejado inicia em v1 sem converter o card atual em tentativa. O pacote de conteúdo deve deixar explícito quando o funcionário apenas recebeu, abriu uma visualização inerte ou simulou uma ação de execução.

### Testes próprios

- documento legítimo, malicioso e inconclusivo;
- extensão não funciona como veredito isolado;
- “habilitar conteúdo” ou quebrar proteção é controle crítico;
- confirmar pelo mesmo remetente não é independência;
- nenhum artefato possui `href`, download ou comando.

## 7. A central que não podia esperar

### Fronteira técnica

- **Blueprint:** [`missao--a-central-que-nao-podia-esperar.md`](../blueprints/missao--a-central-que-nao-podia-esperar.md).
- **Identidade candidata:** `mission:official-callback` comunica o comportamento seguro, sem reutilizar o piloto de bloqueio.
- **Mecânica:** C7 console de callback + diretório/ticket fictícios.
- **Contrato bruto proposto:** `casePackageId`, `receivedContactActionId`, `directorySourceId`, `ticketAssessmentId`, `toolPermissionIds`, `officialContactActionId`, `reportBlockIds`.
- **Derivados:** encerramento do contato recebido, retomada por rota oficial, minimização de permissões e nota.

### Reuso e trabalho novo

Reutiliza máquina de estados e montador de reporte. Precisa de diretório, ticket e catálogo de ferramentas inteiramente fictícios. Não realiza ligação, instalação ou acesso remoto.

### Compatibilidade

Atividade nova v1, chave de recompensa própria e nenhuma relação de recompensa com `mission:account-lock`.

### Testes próprios

- callback por telefone da própria mensagem é rejeitado;
- ticket legítimo consultado na área oficial;
- suporte real com permissões proporcionais;
- pedido de senha, OTP ou controle irrestrito exige revisão;
- transcrição e fluxo pausável substituem áudio obrigatório.

## 8. Ele já sabia meus dados

### Fronteira técnica

- **Blueprint:** [`missao--ele-ja-sabia-meus-dados.md`](../blueprints/missao--ele-ja-sabia-meus-dados.md).
- **Mecânica:** dossiê de fatos/inferências + narrativa em etapas.
- **Contrato bruto proposto:** `casePackageId`, `classificationByClueId`, `sourceHypothesisIds`, `identityProofAssessmentId`, `verificationRouteId`, `finalActionId`, `reportBlockIds`.
- **Derivados:** separação fato/inferência/autenticação, processo de verificação e nota.

### Reuso e trabalho novo

Reutiliza evidências, relações e narrativa. Exige classificador explícito e categorias editoriais de fonte pública, dado organizacional, dado previamente vazado apenas como fato sintético e alegação não comprovada. A primeira versão é textual; voz, vídeo e pesquisa real permanecem fora.

### Compatibilidade

Atividade nova v1. Nenhum dado real do funcionário, rede social, vazamento ou pesquisa é coletado ou consultado.

### Testes próprios

- dado correto aumenta plausibilidade, não autenticação;
- caso legítimo personalizado confirmado por fonte independente;
- inferência apresentada como fato perde crédito;
- deepfake permanece limite/debrief, não pista pontuada;
- categorias não permitem inserir texto livre sensível.

## 9. O pedido não tinha link

### Fronteira técnica

- **Blueprint:** [`missao--o-pedido-nao-tinha-link.md`](../blueprints/missao--o-pedido-nao-tinha-link.md).
- **Mecânica:** matriz alegação–fato–necessidade–autorização + resposta conversacional.
- **Contrato bruto proposto:** `casePackageId`, `claimClassificationById`, `questionIds`, `needToKnowAssessmentId`, `authorizationSourceId`, `finalActionId`, `replyTemplateId`, `reportBlockIds`.
- **Derivados:** validação de identidade, necessidade e autorização, minimização e nota.

### Reuso e trabalho novo

Reutiliza relações e estação de processo, mas não depende de URL, anexo ou domínio. A entrevista é uma árvore curta e determinística. O objetivo é enfrentar pretexting e elicitation sem ensinar a “pegar mentira”.

### Compatibilidade

Atividade nova v1. Perguntas e respostas são IDs publicados; não há chat livre nem armazenamento de informações fornecidas pela pessoa.

### Testes próprios

- pedido legítimo com need-to-know e autorização;
- identidade plausível sem necessidade comprovada;
- perguntas encadeadas que, combinadas, revelariam informação;
- resposta cortês que encaminha ao processo;
- nenhuma resposta livre, dado real ou confronto.

## 10. Dependências transversais das Missões

| Dependência | Missões afetadas | Gate |
|---|---|---|
| P0 registro/runtime/shell | todas | obrigatório antes de qualquer nova versão |
| C1 inspetor | Conversa, Documento | validado em Domínio v2 |
| C2 timeline | Conversa, Cliquei | validado em Conversa v2 |
| C4 ações/reporte | Cliquei, Documento, Central | validado em Cliquei v2 |
| C5 estação | Gestor, Pedido sem link | procedimento fictício versionado |
| C7 console | MFA, Central | máquina finita e testes de retomada |
| dossiê/classificador | Ele já sabia | primeira versão textual e sem dado real |

## 11. Gate de conversão para código

Cada Missão só entra em implementação quando identidade técnica, versão, pacote P1, contrato bruto, controle crítico, estratégia de recompensa e dependências acima estiverem aprovados. A publicação no percurso é uma decisão posterior e não decorre da conclusão do player.
