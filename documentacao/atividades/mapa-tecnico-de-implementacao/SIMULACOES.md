# Mapa técnico das Simulações

> **Estado:** identidades, versões-alvo e rotas aprovadas no mapa técnico; **Uma manhã comum v2** está implementada, e as demais atividades continuam planejadas até implementação individual.
>
> **Regra de área:** 70 pontos-base e bônus transversal vigente na primeira conclusão válida. Simulações aplicam competências em ambiente misto e não fornecem feedback corretivo durante a execução.

## 1. Matriz de identidade

| Simulação | Estado atual | Identidade técnica candidata | Estratégia | Onda |
|---|---|---|---|---:|
| Uma manhã comum | disponível v2; v1 compatível | `simulation:workday` v2 · `/simulacoes/dia-de-trabalho` | ID/rota, histórico e recompensa v1 preservados | concluída |
| Central de mensagens | card conceitual | `simulation:message-center` v1 · `/simulacoes/central-de-mensagens` | nova identidade; `message-center` local não era ID público | 4 |
| Ataque multicanal | card conceitual | `simulation:multichannel` v1 · `/simulacoes/ataque-multicanal` | nova identidade; `multichannel` local não era ID público | 5 |
| O primeiro resultado | inexistente | `simulation:search-results` v1 · `/simulacoes/o-primeiro-resultado` | nova identidade candidata | 2 |
| Pagamento para quem? | inexistente | `simulation:payment-recipient` v1 · `/simulacoes/pagamento-para-quem` | nova identidade, distinta de Equipes | 3 |
| A porta também é um canal | arquitetura futura | sem ID, versão ou rota | não entra na ordem | posterior |

## 2. Uma manhã comum

### Fronteira técnica

- **Blueprint:** [`simulacao--uma-manha-comum.md`](../blueprints/simulacao--uma-manha-comum.md).
- **Mecânica:** C6 triagem em lote + C9 pacotes mistos.
- **Contrato bruto implementado:** `casePackageId`, `mechanicId`, `itemDecisions` com fila, ação e evidências, `transferActionId` e `transferEvidenceId`.
- **Derivados:** acerto por item, investigação proporcional, falso positivo, pendência tratada, nota e `needsReview`.

### Reuso e trabalho novo

Reutiliza shell, item selecionado, ações e padrões de resultado. A versão 2 acrescenta tipos textuais de canal, quatro filas, investigação seletiva e revisão global. Feedback de correção aparece somente depois da conclusão. O rascunho ainda vive apenas na sessão; retomada após recarga e filtros continuam futuros.

### Compatibilidade

V1 permanece `SimulationAttempt`; v2 não converte seis decisões antigas em estados de fila. Recompensa já reivindicada não reabre. A conclusão v2 persiste no envelope v13; a migração v12→v13 preserva o estado anterior e o progresso parcial continua apenas na sessão.

### Testes próprios

- lote contém legítimo, malicioso e inconclusivo;
- item pode sair e voltar à fila sem perda;
- investigar tudo não recebe bônus artificial;
- falso positivo e obediência automática são diferenciados;
- revisão global obrigatória, teclado, foco e seletor de destino;
- v1 legível e v2 idempotente.

## 3. Central de mensagens

### Fronteira técnica

- **Blueprint:** [`simulacao--central-de-mensagens.md`](../blueprints/simulacao--central-de-mensagens.md).
- **Mecânica:** conversas paralelas + livro de continuidade C3 + C9.
- **Contrato bruto proposto:** `casePackageId`, `conversationAssessmentById`, `identityRelationIds`, `continuityAnchorByConversationId`, `verificationActionByConversationId`, `pendingConversationIds`, `finalReviewAccepted`.
- **Derivados:** continuidade comprovada, independência do canal, decisões proporcionais e nota.

### Reuso e trabalho novo

Reutiliza mensagens e mapa de relações, mas não é uma terceira inbox: o objeto avaliado é a continuidade da identidade ao mudar número, conta ou plataforma. Conversas permanecem textuais e os contatos pertencem a um livro fictício.

### Persistência e testes

Atividade nova v1 e recompensa própria. Se houver rascunho, ele precisa de pacote, etapa e expiração. Testes cobrem número novo malicioso, troca legítima confirmada, ausência temporária de âncora, dois canais dependentes da mesma origem, conversas paralelas, pacote repetido e execução por teclado.

## 4. Ataque multicanal

### Fronteira técnica

- **Blueprint:** [`simulacao--ataque-multicanal.md`](../blueprints/simulacao--ataque-multicanal.md).
- **Mecânica:** C8 ambiente multicanal textual, composto por C2, C3 e controles C4/C7.
- **Contrato bruto proposto:** `casePackageId`, `orderedEventIds`, `channelRelationIds`, `certaintyByRelation`, `independentAnchorId`, `interruptionActionIds`, `reportBlockIds`, `finalDecisionId`.
- **Derivados:** cadeia causal, autocorroboração, âncora independente, contenção e nota.

### Reuso e trabalho novo

É a atividade tecnicamente mais composta. E-mail, chat, transcrição de ligação, QR descrito, página e registro interno são artefatos inertes de uma timeline. A tabela de eventos e relações é canônica; o grafo é derivado. Não há áudio, vídeo, chamada, QR ativo ou tempo real.

### Persistência e testes

Atividade nova v1. Um rascunho de grafo parcial só será aceito depois que C2 e C3 possuírem validação de payload parcial. Testes cobrem cadeia maliciosa, migração legítima de canal, caso inconclusivo, ciclo/aresta inválida, canal que confirma a si mesmo, âncora realmente independente, leitor de tela e movimento reduzido.

## 5. O primeiro resultado

### Fronteira técnica

- **Blueprint:** [`simulacao--o-primeiro-resultado.md`](../blueprints/simulacao--o-primeiro-resultado.md).
- **Mecânica:** página sintética de resultados + C1 + planejador de rota segura.
- **Contrato bruto proposto:** `casePackageId`, `inspectedResultIds`, `originAssessmentByResultId`, `selectedOfficialSourceId`, `plannedRouteStepIds`, `finalActionId`.
- **Derivados:** uso de origem confiável, independência de posição/anúncio, rota construída e nota.

### Reuso e trabalho novo

A lista imita apenas a estrutura genérica de busca; não usa marca, domínio ou link real. Resultado patrocinado pode ser legítimo e resultado orgânico pode ser inseguro. A ação avaliada é chegar pela origem conhecida, não escolher a posição “certa”.

### Persistência e testes

Atividade nova v1. Por ser curta, não recebe rascunho no primeiro corte. Testes cobrem anúncio malicioso, anúncio legítimo, resultado orgânico parecido, ausência de fonte suficiente, rota oficial, item não navegável, teclado e não dependência de selo/cor.

## 6. Pagamento para quem?

### Fronteira técnica

- **Blueprint:** [`simulacao--pagamento-para-quem.md`](../blueprints/simulacao--pagamento-para-quem.md).
- **Mecânica:** C5 estação de processo com C1 e C3.
- **Contrato bruto proposto:** `casePackageId`, `obligationSourceId`, `beneficiaryRelationIds`, `recordAssessmentById`, `controlOrder`, `releaseDecisionId`, `reportBlockIds`.
- **Derivados:** obrigação confirmada, recebedor vinculado, controles e decisão proporcional.

### Fronteira com Equipes

Esta Simulação é individual e não altera cadastro bancário. O primeiro pacote usa fatura autêntica com recebedor sem vínculo; não há contato anterior negando mudança nem segunda aprovação nesse percurso. **Mudança bancária sem atalho** continua sendo o caso profundo de alteração cadastral e contribuição coletiva.

Componentes visuais podem ser extraídos de `BankChangeChallenge`, mas ID, contrato, recompensa, tentativa e agregado não são reutilizados. A Simulação não cria contribuição de equipe.

### Persistência e testes

Atividade nova v1. Testes cobrem obrigação válida/recebedor divergente, comprovante sem crédito, intermediador legítimo, relação extra, liberação antes da conciliação, diferença entre confirmação e segunda aprovação, ausência de agregado e coexistência com `team:bank-change` nas duas ordens.

## 7. A porta também é um canal

### Estado preservado

- **Documento:** [`simulacao--a-porta-tambem-e-um-canal.md`](../blueprints/simulacao--a-porta-tambem-e-um-canal.md).
- **Classificação:** arquitetura futura aprovada como fronteira, não como primeira versão.
- **Identidade técnica:** nenhuma.
- **Composição:** nenhuma; os nove conceitos permanecem em Versão futura.
- **Recompensa:** nenhuma proposta.

### Condições para voltar ao mapa executável

1. escolher um comportamento e um módulo inicial;
2. definir público por função e procedimento local;
3. revisar com Segurança, Facilities, RH, Jurídico, Privacidade e Acessibilidade, conforme o módulo;
4. decidir base somente textual ou ilustração redundante;
5. produzir casos legítimos, maliciosos e inconclusivos sem incentivar confronto;
6. só então definir ID, rota, versão, pesos, contrato e posição.

Enquanto essas condições não forem satisfeitas, esta atividade não entra em contagem de implementação nem bloqueia a conclusão do portal do funcionário.

## 8. Dependências transversais das Simulações

| Dependência | Consumidores | Gate |
|---|---|---|
| C6 fila inconclusiva | Uma manhã | revisão global e nenhum feedback antecipado |
| C3 relações | Central, Multicanal, Pagamento | tabela canônica validada em Remetente v2 |
| C2 timeline | Multicanal | ordem parcial validada em Conversa v2 |
| C5 estação | Pagamento | separação de contrato/agregado de Equipes |
| C1 anatomia | Busca, Pagamento | componentes inertes e sem navegação |
| C8 multicanal | Ataque multicanal | só depois de consumidores menores de C2/C3/C7 |
| C9 pacotes | todas | allowlists e seleção versionada |

## 9. Gate de conversão para código

Uma Simulação só fica disponível quando possui pacote misto, contrato por item ou relação, revisão global, avaliador sem feedback antecipado, persistência compatível, recompensa idempotente, Perfil/atividade recente e teste de rota própria. Uma rota dinâmica que retorna o hub continua classificada como planejada.
