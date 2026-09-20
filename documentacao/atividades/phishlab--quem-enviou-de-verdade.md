# PhishLab — Quem enviou de verdade?

> Estado documental: a versão 2 do investigador de identidade está implementada e validada na demonstração local. A versão 1 permanece legível como histórico; a validação autoritativa continua obrigatória antes do uso real.

## 1. Identidade

| Campo | Valor vigente |
|---|---|
| Área | PhishLab |
| Percurso | Jornada curricular — leitura de identidade e destino |
| Ordem executável | Após **O aviso que não podia esperar** e antes de **Domínio sob a lupa** |
| `activityId` | `phishlab:true-sender` |
| Versão publicada | `2`; versão `1` aceita como histórica |
| Rota | `/phishlab/quem-enviou-de-verdade` |
| Mecânica | `identity-map` |
| Duração estimada | 9 minutos |
| Pontos-base | 60, com bônus transversal na primeira conclusão válida |
| Competências | Observar, Investigar e Verificar |
| Pré-requisitos técnicos | Nenhum bloqueio obrigatório |
| Próxima prática | **Domínio sob a lupa** |
| Escopo | Desktop; celular posterior |

## 2. Objetivo de aprendizagem

O funcionário aprende a separar cinco perguntas diferentes: qual nome foi declarado, qual conta aparece no campo `From`, para onde o `Reply-To` levaria uma resposta, qual domínio está no endereço e se o pedido combina com o processo conhecido.

O laboratório não pede que a pessoa adivinhe quem é o atacante. Ele avalia se ela:

- registra somente o que os dados comprovam;
- diferencia o que está comprovado do que ainda não está comprovado;
- não trata nome, endereço ou domínio como prova da pessoa que controla a conta;
- escolhe uma rota de confirmação obtida fora da própria solicitação;
- não compartilha senha, código ou outro segredo.

## 3. Estado implementado — versão 2

### 3.1 Mecânica e fluxo

A atividade usa um mapa de identidade operável por seletores e reproduz esse mapa em uma lista textual. O fluxo possui nove estados:

1. abertura com papel, situação, tarefa e consequência protegida;
2. calibração guiada e não pontuada sobre o alcance de `Nome`, `From` e `Reply-To`;
3. montagem do mapa do caso principal;
4. classificação binária de afirmações como **Comprovado** ou **Não comprovado**;
5. conclusão proporcional e escolha de confirmação independente;
6. revisão livre da resposta principal;
7. transferência curta para outro contexto;
8. resultado privado;
9. debrief e próximo passo.

P1, P2 e P3 são identificadores internos. A primeira abertura recebe automaticamente o pacote canônico **Suporte sem chamado**. O funcionário não escolhe percurso. **Praticar com outro caso** avança para outro pacote, e a retomada preserva o último pacote v2 concluído.

### 3.2 Pacotes publicados

| Pacote | Caso principal | Conclusão esperada | Transferência |
|---|---|---|---|
| `phishlab:true-sender:v2:p1-support-without-ticket` | Suposto suporte pede código sem chamado aberto | Suspeito; interromper e reportar, confirmando pelo diretório oficial conhecido | Caixa compartilhada legítima confirmada pelo fluxo iniciado |
| `phishlab:true-sender:v2:p2-known-account-new-process` | Conta conhecida introduz novo portal e autenticação | Inconclusivo; confirmar pelo contato previamente cadastrado | O mesmo pedido migra para chat sem criar confirmação independente |
| `phishlab:true-sender:v2:p3-legitimate-unusual-message` | Confirmação esperada chega fora do horário | Legítimo no contexto do protocolo iniciado | Sem protocolo correspondente, a conclusão passa a inconclusiva |

Todos os endereços usam `.example`; mensagens, diretório e fluxos são fictícios e inertes.

## 4. Avaliação, feedback e recompensa

| Critério derivado | Peso |
|---|---:|
| Mapa entre campos e funções | 20 |
| Comprovado, não comprovado e limites | 30 |
| Conclusão e confirmação | 25 |
| Transferência | 25 |

A nota é limitada a 0–100. `needsReview` é ativado abaixo de 60 ou quando um controle crítico falha. Os controles críticos são:

- atribuir controle humano a partir de nome, `From`, `Reply-To` ou domínio;
- confirmar pela própria solicitação em vez de usar rota independente;
- compartilhar código ou segredo.

A primeira conclusão válida concede 60 pontos-base mais bônus de desempenho. A chave `phishlab:true-sender:first-completion` permanece a mesma entre v1 e v2. Repetições atualizam a última e a melhor nota, mas não duplicam recompensa nem contribuição coletiva. Velocidade não pontua.

O resultado privado também apresenta cada campo, afirmação, conclusão e rota com o rótulo textual **Acertou** ou **Precisa revisar**, a resposta dada, a resposta esperada e uma explicação. Quando somente um resultado histórico está disponível, a revisão usa as parcelas do avaliador sem inventar escolhas que não estejam carregadas na sessão.

## 5. Contrato e persistência

`TrueSenderV2Submission` registra resposta bruta allowlisted:

- `attemptId`, `activityId`, `activityVersion`, `casePackageId`, `completedAt` e `mechanicId`;
- `fieldRelationById`;
- `claimAssessmentById`;
- `inspectedEvidenceIds`;
- `verdictId` e `verificationRouteId`;
- `transferVerdictId` e `transferVerificationRouteId`;
- `usedHelpIds`.

O avaliador deriva nota, parcelas, controles críticos, competências, bônus e contribuição. IDs extras, listas duplicadas, pacote desconhecido, versão divergente e relação fora da allowlist são rejeitados antes da persistência.

Na interface atual, `claimAssessmentById` oferece somente `fact` (**Comprovado**) e `unproven` (**Não comprovado**). O valor `inference` permanece na allowlist apenas para leitura de tentativas v2 anteriores a esta correção de clareza e não é apresentado em novas respostas.

`TrueSenderV2Attempt` passou a integrar `LearningAttempt`. Por isso, `APP_SCHEMA_VERSION` passou de 9 para 10 e o envelope local passou a `mvp-local-v10`. A migração v9→v10 altera somente `meta.schemaVersion`, revalida o estado e não cria tentativa, mapa, progresso, competência, ponto, recompensa, recomendação ou contribuição.

Tentativas v1 continuam sendo `PhishLabAttempt`, não recebem relações inventadas e permanecem suficientes para qualquer progresso já conquistado. Ao reabrir a atividade com apenas histórico v1, o player informa que o resultado foi preservado e que a recompensa não será concedida novamente.

## 6. Integrações

- o registro publica v2, aceita `[1, 2]` e associa três pacotes a `identity-map-v2`;
- o hub e a atividade recente aceitam resultados v1 e v2;
- a conclusão alimenta Perfil, competências, pontos, conquistas e recomendação para **Domínio sob a lupa**;
- a atividade continua servindo ao requisito já existente de **Você iniciou este acesso?**;
- Radar permanece opcional, pontuado por regra própria e nunca é pré-requisito;
- Arcade permanece fora desta integração.

## 7. Privacidade, segurança e backend

Mapa, escolhas, erros, nota e ajuda ficam no resultado individual local. A equipe recebe somente a contribuição resumida e idempotente já permitida, nunca as relações montadas ou os erros do funcionário.

Nenhum controle envia resposta, código, e-mail ou reporte; nenhum endereço é navegável; não há consulta a DNS, diretório ou identidade real. O estado local continua demonstrativo com `isAuthoritative: false`.

Antes do uso real, o backend deverá controlar identidade, autorização, pacote e versão publicados, allowlists, idempotência, avaliação, competências, recompensa, contribuição, transação, auditoria, retenção e exclusão. O cliente envia resposta bruta e nunca é fonte confiável da nota ou dos pontos.

## 8. Acessibilidade desktop

- um único `h1` e foco programático no título de cada etapa;
- progresso com **Concluído**, **Agora** e **A seguir**, sem depender de cor;
- relações feitas por `select`, com mapa textual equivalente;
- decisões agrupadas por `fieldset` e `legend`;
- revisão sem apagar contexto ou respostas;
- resultado e erro anunciados pelas primitivas compartilhadas;
- teclado, alto contraste, texto ampliado e movimento reduzido;
- sem cronômetro ou pontuação por rapidez.

O suporte específico para celular permanece posterior.

## 9. Testes e critérios de aceite

Os testes automatizados cobrem catálogo com três pacotes, contrato perfeito, payload extra ou duplicado, controle humano indevido, nota 100, recompensa potencial 78, reducer idempotente, coexistência v1→v2, preservação da recompensa, migração v9→v10, registro, seletores e SSR da rota própria.

O cenário de navegador cobre a primeira tentativa por teclado, foco entre etapas, ausência de P1/P2/P3 visível, persistência do envelope v10, debrief, acessibilidade séria/crítica e ausência de overflow horizontal em desktop.

## 10. Histórico

| Data | Registro |
|---|---|
| Implementação anterior | Versão 1 disponibilizada com quatro ferramentas, caso guiado e caso independente. |
| 2026-08-11 | Aprovada a direção de investigador de identidade. |
| 2026-08-15 | Blueprint, três pacotes e jornada com atribuição automática aprovados. |
| 2026-08-15 | Versão 2 implementada com `identity-map`, contrato próprio e esquema local 10; v1 e recompensa lógica preservadas. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
