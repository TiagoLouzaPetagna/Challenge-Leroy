# Simulação — Uma manhã comum

> Estado documental: a triagem em lote está implementada como versão 2 e disponível na rota histórica. A versão 1 permanece legível e não é reinterpretada.

## 1. Identidade

| Campo | Valor vigente |
|---|---|
| Área | Simulações |
| Percurso | Confiança sob pressão |
| Ordem recomendada | 7 de 8 |
| `activityId` | `simulation:workday` |
| Versão publicada | `2` |
| Versões aceitas | `1` e `2` |
| `mechanicId` v2 | `batch-triage` |
| Rota preservada | `/simulacoes/dia-de-trabalho` |
| Título visível | Uma manhã comum |
| Duração estimada | 14 minutos |
| Pontos-base | 70 |
| Competências | Observar, Investigar, Verificar, Decidir e Reportar |
| Recomendação anterior | Cliquei. E agora? |
| Próxima prática | Mudança bancária sem atalho |

O identificador e a rota ainda usam o nome técnico histórico **Dia de trabalho** para preservar progresso, tentativas e integrações existentes.

## 2. Objetivo de aprendizagem

Praticar uma rotina na qual itens legítimos, maliciosos e inconclusivos chegam juntos. A pessoa consulta fatos na medida necessária, prossegue quando o processo está sustentado, contém ameaças confirmadas e mantém ações sensíveis bloqueadas quando ainda falta confirmação.

A conclusão demonstra apenas o comportamento naquela tentativa. Não prova retenção, domínio permanente ou produtividade real. Velocidade não participa da nota.

## 3. Experiência vigente — versão 2

### 3.1 Pacotes internos

A primeira abertura atribui automaticamente `simulation:workday:v2:p1-opening`, com sete itens. Os outros pacotes ficam internos e só podem ser praticados depois da conclusão:

- `simulation:workday:v2:p2-priority-change`, com cinco itens;
- `simulation:workday:v2:p3-returned-pending`, com seis itens.

P1, P2 e P3 não são escolhas apresentadas no início. Cada pacote combina casos legítimos, maliciosos e inconclusivos sem revelar essa distribuição durante a execução.

### 3.2 Mecânica

A tela usa quatro filas:

- **Entrada:** item ainda sem decisão;
- **Investigar:** item aberto para consulta de fatos;
- **Inconclusivos:** ação sensível permanece bloqueada enquanto falta confirmação;
- **Resolvidos:** há base para prosseguir ou conter.

O item selecionado mostra canal, origem exibida, mensagem e fontes fictícias. A pessoa consulta as fontes pertinentes, escolhe uma ação proporcional e define o destino pelo seletor nativo. Arrastar não é necessário.

As ações v2 são prosseguir pelo processo normal; manter a ação bloqueada e verificar; conter e avisar a equipe responsável; ou apenas apagar/ignorar. Não há feedback de acerto durante a triagem. O gabarito aparece depois da revisão global e da transferência curta.

### 3.3 Fluxo

1. **Abertura:** papel, contexto, tarefa, ausência de cronômetro e pacote atribuído.
2. **Triagem:** organização do lote, investigação seletiva, ação e destino por item.
3. **Revisão global:** resumo editável de todas as filas, ações e fontes consultadas.
4. **Transferência:** reaplicação do processo a outro canal ou aparência.
5. **Resultado:** nota privada e comparação resposta por resposta.
6. **Debrief:** regra generalizável, repetição e próxima prática.

A conclusão só é liberada quando todos os itens têm ação e terminam em **Resolvidos** ou **Inconclusivos**.

## 4. Conteúdo publicado

O pacote canônico reúne aviso interno legítimo, falso bloqueio de conta, pedido plausível de planilha, falsa nota fiscal com macro, aviso legítimo de benefícios, convite legítimo de treinamento e repetição do pedido sensível por um novo contato.

Os outros pacotes trabalham urgência real misturada a falso suporte, texto pouco polido em aviso legítimo, redefinição de senha não iniciada, pendência que recebe nova evidência e QR descrito sem destino confirmado.

Todos os nomes, domínios, cadastros, chamados, arquivos e mensagens são fictícios ou inertes. Nenhum item contém link navegável, anexo executável, telefone, QR ativo ou ação externa.

## 5. Avaliação e feedback

| Critério | Peso | Comportamento esperado |
|---|---:|---|
| Triagem | 30 | Destinar legítimos e ameaças resolvidas corretamente e preservar inconclusivos |
| Ação | 30 | Prosseguir, verificar ou conter de forma proporcional aos fatos |
| Evidências | 25 | Consultar as fontes relevantes publicadas para o item |
| Calibração | 15 | Evitar falsos positivos e aplicar o processo no caso de transferência |

`needsReview` é verdadeiro abaixo de 60 ou quando ocorre um controle crítico. Os controles impedem liberar pedido sensível sem confirmação, forçar certeza em caso inconclusivo e tratar todo o lote como ameaça.

O resultado mostra nota, quatro parcelas, falsos positivos e uma revisão de cada item com **Acertou** ou **Precisa revisar**, resposta escolhida, resposta esperada e explicação. A transferência recebe uma revisão separada. O feedback usa linguagem sem culpa.

## 6. Recompensa e integrações

A primeira conclusão lógica de `simulation:workday` concede 70 pontos-base mais o bônus transversal vigente, até 91 pontos. A chave de recompensa e a contribuição são as mesmas da versão 1. Quem já recebeu a recompensa na v1 não a recebe novamente na v2.

Repetições atualizam última tentativa, melhor nota, competências e recomendações sem duplicar pontos, conquista ou contribuição. Resultado satisfatório recomenda **Mudança bancária sem atalho**; dificuldade pode recomendar o PhishLab. Radar continua opcional, pontuado por regra própria e nunca é pré-requisito.

## 7. Contrato v2

`WorkdayTriageV2Submission` registra metadados da tentativa, `casePackageId`, `mechanicId`, uma decisão por item com fila final, ação e fontes consultadas, além da ação e evidência da transferência.

O validador exige IDs allowlisted, todos os itens exatamente uma vez, listas sem duplicata, fila final válida e pacote publicado. `WorkdayTriageV2Result` é sempre derivado: o cliente não envia nota, recompensa, competências ou contribuição como verdade.

## 8. Persistência e compatibilidade

`WorkdayTriageV2Attempt` foi incluída em `LearningAttempt`. Por isso, `APP_SCHEMA_VERSION` passou de 12 para 13 e o envelope local passou a `mvp-local-v13`. A chave histórica de armazenamento permanece `casa-digital-segura:mvp:v1`.

A migração v12→v13 altera somente `meta.schemaVersion`, revalida o estado e preserva tentativas, progresso, preferências, tutorial, competências, recompensas, ledger e contribuições. Tentativas v1 permanecem `SimulationAttempt`, com sua resposta e avaliador originais; filas v2 nunca são inventadas a partir delas.

O rascunho v2 ainda vive somente na sessão da página. Retomar um lote incompleto após fechar ou recarregar continua uma pendência futura e não é anunciado como capacidade disponível.

## 9. Privacidade, segurança e backend

Resposta bruta, fontes consultadas, ação, nota, falsos positivos e recomendação são privados. O estado demonstrativo registra apenas a contribuição coletiva permitida, sem conteúdo do item ou nota individual.

A demonstração continua `isAuthoritative: false`. Antes do uso real, o backend deverá controlar identidade, autorização, versão publicada, pacote, allowlists, idempotência, avaliação, recompensa, competência, contribuição, transação, auditoria e retenção. O servidor deve receber a resposta bruta e recalcular os derivados.

## 10. Acessibilidade e desktop

- um `h1` identifica a atividade e o foco vai ao título de cada etapa;
- progresso possui `role="progressbar"` e valores textuais;
- filas têm nome, descrição e contagem, sem depender de cor;
- item selecionado usa `aria-pressed` e texto;
- ações usam `fieldset`/`legend` e controles nativos;
- a movimentação usa `select`, sem exigir drag-and-drop;
- erro usa `role="alert"` e preserva as escolhas;
- resultado inclui revisão textual completa;
- não há limite de tempo ou animação necessária.

O escopo validado permanece desktop. O comportamento específico para celular continua posterior.

## 11. Arquitetura

| Camada | Implementação v2 |
|---|---|
| Conteúdo | `lib/content/activities/workday-triage/v2.ts` |
| UI | `features/simulations/WorkdayTriageSimulation.tsx` |
| Contrato e avaliação | `lib/domain/types.ts` e `lib/domain/rules.ts` |
| Estado | `app/providers.tsx` e `lib/state/app-reducer.ts` |
| Registro e currículo | `lib/activities/registry.ts` e `lib/content/curriculum-catalog.ts` |
| Persistência | `lib/state/persistence.ts` |
| Testes | `tests/rendered-html.test.mjs` e `tests/browser/p0-accessibility.spec.ts` |

A antiga `SimulationExperience` permanece como hub e compatibilidade de apresentação. O player v1 não é usado na rota publicada, mas tipos, avaliador e tentativas v1 continuam suportados.

## 12. Testes e critérios de aceite

Os testes automatizados cobrem três pacotes publicados, contagens 7/5/6, submissão perfeita, payload inválido, falha crítica, avaliação 100/100, recompensa potencial de 91, idempotência, coexistência v1/v2, recompensa e contribuição únicas, registro, currículo, migração v12→v13 e SSR.

O cenário Playwright percorre o pacote canônico, consulta fontes, preserva dois itens inconclusivos, revisa sete decisões, conclui a transferência, confirma nota 100, oito revisões **Acertou**, envelope v13, foco, teclado, ausência de overflow, acessibilidade automatizada e console sem erros.

## 13. Histórico

| Data | Registro |
|---|---|
| Implementação anterior | Versão 1 disponibilizada como Dia de trabalho e depois apresentada como Uma manhã comum. |
| 2026-08-11 | Aprovada a direção de triagem em lote com investigação e retorno aos inconclusivos. |
| 2026-08-15 | Blueprint com três pacotes e revisão global aprovado. |
| 2026-08-16 | Versão 2 implementada com `batch-triage`, pacotes internos, contrato próprio e revisão por item. |
| 2026-08-16 | Esquema local atualizado de v12 para v13, sem reabrir recompensa nem reinterpretar tentativas. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
