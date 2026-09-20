# Equipes — Caixa de Entrada Segura

> **Estado atual:** implementada, disponível e preservada como desafio anterior.
> **Formato-alvo:** não definido; nenhuma reformulação foi aprovada para esta atividade legada.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | Equipes |
| Percurso e ordem | Fora de **Confiança sob pressão**; desafio anterior preservado no hub de Equipes |
| `activityId` | `team:secure-inbox` |
| Versão implementada | `1` |
| Versão-alvo | A definir somente se houver reformulação |
| Rota funcional | `/equipes/caixa-de-entrada-segura` |
| Integração atual | Disponível |
| Duração estimada | 8–10 minutos |
| Pontos | 80 pontos-base; bônus geral de até 30%; máximo de 104 na primeira conclusão |
| Competências | Observar, Verificar e Decidir |
| Pré-requisitos | Nenhum |
| Relações recomendadas | **Mudança bancária sem atalho** é o desafio atual destacado; não é pré-requisito nem substitui este desafio |
| Radar relacionado | Não formalizado |
| Última conferência no código | 2026-08-11 |

### Mapa da implementação atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Catálogo de casos | `lib/content/team-challenge-catalog.ts` | Implementado |
| Interface | `features/teams/TeamsExperience.tsx` — `TeamChallenge` | Implementada |
| Tipos | `lib/domain/types.ts` — `TeamChallengeSubmission`, `TeamChallengeAttempt` e `TeamChallengeResult` | Implementados |
| Avaliador | `lib/domain/rules.ts` — `isValidTeamChallengeSubmission` e `evaluateTeamChallenge` | Implementado |
| Estado | `lib/state/app-reducer.ts` — `TEAM_CHALLENGE_COMPLETED` | Implementado |
| Persistência | `lib/state/persistence.ts` | Implementada no esquema local 6 |
| Seletores | `lib/state/selectors.ts` — resultado, tentativa, contribuição, métricas e rota | Implementados |
| Testes | `tests/rendered-html.test.mjs` | Implementados para rota, avaliação, repetição, agregado, coexistência e persistência |

## 2. Objetivo educacional

Treinar decisões proporcionais em uma caixa mista, sem indicar antecipadamente quais mensagens são legítimas, maliciosas ou inconclusivas. Cada funcionário resolve o desafio completo individualmente; o resultado pessoal é privado e somente uma contribuição resumida alimenta o setor.

- **Comportamento esperado:** investigar remetente, destino e contexto; manter o que é legítimo, verificar pedidos inconclusivos e reportar phishing.
- **Técnicas:** urgência, QR Code, personificação de gestor, anexo inesperado e contexto plausível.
- **Atalhos inseguros:** agir apenas pelo tom da mensagem ou classificar tudo como fraude.
- **Limite:** a nota representa cinco decisões desta tentativa e não comprova retenção definitiva.

## 3. Implementação atual

### 3.1 Casos

O catálogo contém cinco mensagens fictícias:

| Caso | Natureza interna do avaliador | Ação esperada | Competência principal |
|---|---|---|---|
| Atualização da entrega programada | Legítima | Manter | Observar |
| QR Code urgente para reativação | Phishing | Reportar | Observar |
| Pedido incomum de gestor | Inconclusiva | Verificar por outro canal | Verificar |
| Nota fiscal inesperada em `.zip` | Phishing | Reportar | Decidir |
| Confirmação de treinamento agendado | Legítima | Manter | Decidir |

Todos os endereços usam domínios fictícios `.example`. Destinos e anexos são apenas descritos e não podem ser abertos.

### 3.2 Fluxo

1. **Briefing:** informa privacidade, ausência de pistas antecipadas, contribuição única, recompensa e falta de cronômetro.
2. **Caixa do setor:** permite alternar entre cinco mensagens.
3. **Investigação:** em cada mensagem, o funcionário pode abrir remetente, destino/anexo e contexto.
4. **Decisão:** escolhe Manter, Verificar por outro canal, Reportar ou Excluir.
5. **Revisão antes do envio:** pode voltar a qualquer item e mudar a decisão; não há uma tela de revisão separada.
6. **Conclusão:** o envio só é liberado depois das cinco decisões.
7. **Resultado privado:** apresenta nota, decisões corretas, falsos positivos, pontos, estado do agregado, competências e debrief por caso.

Inspecionar evidências não é obrigatório para responder e atualmente não altera a nota. A lista é persistida para cada caso, mas o avaliador v1 considera somente a ação escolhida. Essa diferença deve permanecer explícita.

## 4. Formato-alvo

**Não definido.** O desafio continua acessível como implementação legada enquanto **Mudança bancária sem atalho** ocupa o destaque atual. A decisão de diversificar as sete atividades do primeiro percurso não atribuiu uma nova mecânica a Caixa de Entrada Segura.

Qualquer futura alteração na função das evidências, nas ações, nos casos ou na interface exigirá nova versão. Não se deve alterar o avaliador v1 silenciosamente para tornar a investigação pontuada.

## 5. Regras de interação e conteúdo seguro

| Regra | Implementação vigente |
|---|---|
| Feedback durante o desafio | Nenhum acerto ou erro é revelado antes da conclusão |
| Navegação | Os cinco casos podem ser revisitados livremente |
| Condição de conclusão | Uma ação registrada para cada caso |
| Evidências | Remetente, destino/anexo e contexto podem ser consultados |
| Efeitos externos | Nenhum e-mail, anexo, QR Code, link ou reporte real é aberto |
| Tempo | Sem cronômetro e sem pontos por velocidade |
| Repetição | Reinicia as escolhas locais e cria nova tentativa quando concluída |

## 6. Avaliação, competências e recompensa

### 6.1 Nota individual

A nota é a porcentagem de ações exatamente iguais às esperadas:

> `round(decisões corretas / 5 × 100)`

Cada caso vale implicitamente 20 pontos. Não existe crédito parcial por uma ação alternativa e a evidência inspecionada não entra no cálculo. Um falso positivo é contado quando uma mensagem legítima recebe **Reportar** ou **Excluir**; o total aparece no resultado, mas não cria desconto adicional além do erro da decisão.

### 6.2 Competências

Cada caso pertence a Observar, Verificar ou Decidir. A nota de competência é a porcentagem de casos corretos daquele grupo. Uma competência entra em `coveredCompetencyIds` quando atinge pelo menos 60. Cada tentativa cria evidência privada para as três competências.

### 6.3 Recompensa e repetição

A recompensa potencial usa 80 pontos-base e o bônus geral:

| Nota | Bônus | Recompensa potencial |
|---:|---:|---:|
| Abaixo de 60 | 0% | 80 |
| 60 a 74 | 10% | 88 |
| 75 a 89 | 20% | 96 |
| 90 a 100 | 30% | 104 |

A primeira conclusão usa `team:secure-inbox:first-completion`. Repetições atualizam última tentativa, melhor nota e evidências de competência, mas não criam novos pontos.

Não existe campo `needsReview` nem recomendação adaptativa própria na v1. O debrief mostra quais decisões precisam de revisão.

## 7. Contrato, persistência e compatibilidade

### 7.1 Resposta bruta

| Campo | Tipo e valores permitidos |
|---|---|
| `attemptId` | `string` não vazia |
| `activityId` | `team:secure-inbox` |
| `activityVersion` | `1` |
| `completedAt` | data válida |
| `caseDecisions` | exatamente cinco decisões, uma para cada ID do catálogo |
| `caseDecisions[].caseId` | ID conhecido e único |
| `caseDecisions[].action` | `keep`, `verify`, `report` ou `delete` |
| `caseDecisions[].inspectedEvidence` | lista de `sender`, `link` e `context` |

O validador de submissão rejeita versão ou atividade diferentes, quantidade incorreta e conjunto de casos incompleto. O resultado derivado registra nota, acertos, total, falsos positivos, notas de competência, cobertura e recompensa potencial.

### 7.2 Estado persistido

A conclusão armazena tentativa avaliada, progresso, IDs das tentativas, última e melhor nota, data da primeira conclusão, recompensa, livro-razão, evidências, histórico e contribuição agregada. O envelope atual é `mvp-local-v9`; tentativas v1 foram preservadas durante a inclusão das novas formas de tentativa.

O validador genérico de tentativa persistida verifica forma e faixas, mas não repete toda a verificação específica de `activityId`, versão e quantidade de casos feita pelo reducer. Essa assimetria local é uma pendência de robustez; o backend autoritativo deverá validar o contrato específico integralmente.

Uma v2 deverá manter as tentativas v1 legíveis e nunca recalculá-las com novos casos ou pesos.

## 8. Contribuição e agregado transversal

A primeira conclusão válida cria `team:team:secure-inbox:first-aggregate-contribution`. A reivindicação contém somente:

- `claimKey`;
- `sourceId`;
- decisões corretas;
- total de decisões;
- competências cobertas;
- horário.

Ela não contém `attemptId`, escolhas, evidências, nota individual ou identificação nominal.

Na primeira contribuição desta atividade, acertos e total são somados uma vez à precisão do setor e competências exigidas podem ampliar a cobertura. A participação conta a mesma pessoa apenas uma vez entre Caixa de Entrada Segura e Mudança bancária sem atalho. Como o protótipo possui um único funcionário, a deduplicação é inferida pela existência de qualquer `aggregateClaim`; o backend real deverá usar identidade e equipe.

O escudo segue a fórmula transversal:

- participação: 40%;
- precisão: 40%;
- cobertura: 20%.

Pontos gerais e posições individuais do Arcade não entram nessa nota.

## 9. Integrações

- permanece no hub de Equipes como “desafio anterior disponível”;
- possui resultado, tentativa e contribuição próprios, independentes de `team:bank-change`;
- atualiza pontos, nível, competências, conquistas, histórico e atividade recente;
- a atividade recente direciona de volta à rota correta e informa participação agregada;
- Meu perfil mostra o resultado individual somente ao próprio funcionário;
- o ranking e o escudo recebem apenas o agregado;
- não avança a jornada principal nem exige Radar.

Abrir Equipes, iniciar o desafio ou inspecionar evidências não concede recompensa. Somente a primeira conclusão válida faz isso.

## 10. Privacidade e segurança

| Dado | Persistido localmente | Funcionário | Equipe |
|---|---|---|---|
| Ações e evidências por caso | Sim | Visível | Não |
| Nota e debrief | Sim | Visível | Não |
| Competências individuais | Sim | Visível | Não |
| Recompensa | Sim | Visível | Não |
| Reivindicação agregada resumida | Sim | Explicada | Usada somente nos indicadores |

O armazenamento local é demonstrativo e modificável. Não há colegas simulados, papéis, espera ou multiplayer. Nenhum resultado pessoal é publicado no ranking.

## 11. Backend autoritativo obrigatório

Antes do uso real, o servidor deverá:

- autenticar funcionário e equipe;
- autorizar `team:secure-inbox` versão 1 para o público correto;
- validar o conjunto exato de casos, ações e evidências;
- calcular nota, competências, recompensa e agregado;
- garantir idempotência por tentativa, recompensa, atividade, funcionário e equipe;
- deduplicar participantes entre desafios;
- persistir tentativa e agregado numa transação;
- auditar, reter, anonimizar e excluir conforme política;
- impedir que o cliente envie nota ou contribuição calculadas como autoridade.

## 12. Acessibilidade desktop

A interface usa botões para selecionar mensagens e evidências, `fieldset` e rádio para ações, texto de progresso e mensagens de erro. Não depende de arrastar nem de tempo.

A validação manual completa ainda deve confirmar:

- foco ao entrar no desafio, trocar caso, concluir e refazer;
- anúncio da mensagem ativa, estado “Respondida” e contagem de decisões;
- leitura do debrief e das barras de competência sem depender de cor;
- contraste, texto ampliado e movimento reduzido;
- teclado completo em todas as cinco mensagens;
- manutenção de contexto quando o envio falha.

O escopo atual é desktop. Celular permanece para etapa posterior.

## 13. Testes e critérios de aceite

Os testes atuais comprovam:

- SSR de `/equipes` e `/equipes/caixa-de-entrada-segura` com conteúdo correto;
- rejeição de submissão sem os cinco casos;
- resultado perfeito 100/100 e recompensa 104;
- cálculo de competências e agregado;
- formato restrito da reivindicação agregada;
- repetição com nota inferior sem novos pontos nem alteração do agregado;
- preservação da melhor nota;
- coexistência com Mudança bancária sem atalho em qualquer ordem;
- deduplicação do participante e soma das decisões dos dois desafios;
- atividade recente com rota e aviso de participação agregada;
- persistência e migrações do estado local.

Pendências:

- testes explícitos para IDs duplicados, evidências duplicadas e versão incompatível na carga persistida;
- teste de teclado e foco por ferramenta apropriada;
- auditoria manual de alto contraste, texto ampliado e movimento reduzido;
- decisão editorial sobre evidências inspecionadas não influenciarem a nota;
- validação do fluxo de erro de armazenamento no navegador.

## 14. Fora de escopo, pendências e riscos

- não há reformulação aprovada;
- não adicionar colegas, papéis ou multiplayer simulado;
- não expor resultado individual no ranking;
- não incorporar jogos do Arcade;
- não iniciar Painel de gestão;
- decidir em versão futura se investigação deve ter efeito avaliativo;
- fortalecer a validação específica das tentativas carregadas;
- manter backend autoritativo obrigatório.

## 15. Histórico

| Data | Registro |
|---|---|
| Lote 5 | Caixa de Entrada Segura implementada como primeiro desafio individual de Equipes. |
| Lotes seguintes | Perfil, atividade recente, conquistas e preferências passaram a consumir o mesmo estado. |
| 2026-08-11 | Mudança bancária sem atalho tornou-se destaque; Caixa Segura foi preservada como desafio anterior. |
| 2026-08-11 | O agregado transversal passou a deduplicar participação entre os dois desafios. |
| 2026-08-11 | Documento individual criado a partir da implementação v1 vigente. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
