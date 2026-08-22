# Fundação P0 antes de novos players

> **Estado:** concluída; P0.1 a P0.8 implementados e validados em 2026-08-15.
>
> **Objetivo:** permitir que as 21 atividades sejam construídas de forma incremental, tipada, versionada, acessível e testável, sem ampliar o acoplamento atual.

## 1. Diagnóstico que determina a fundação

Em 2026-08-15, o portal possui:

- `app/page.tsx` com 2.759 linhas e discriminação manual das rotas dos players;
- `app/globals.css` com 9.677 linhas;
- `app/providers.tsx` com métodos de submissão separados por tipo;
- `lib/state/app-reducer.ts` com 1.278 linhas;
- `lib/domain/rules.ts` com 1.238 linhas;
- `lib/state/persistence.ts` com 1.081 linhas e esquema local 6;
- `tests/rendered-html.test.mjs` com 2.628 linhas e 17 blocos, cobrindo principalmente regras e SSR;
- persistência local demonstrativa, `isAuthoritative: false`, sem D1 ou R2 configurados.

O portal já prova avaliação determinística, idempotência, recompensa única, progresso, Perfil, atividade recente, migração e quarentena. O problema não é ausência de base funcional, mas a concentração das extensões em pontos centrais e a falta de testes reais de interação.

## 2. O que P0 pode e não pode fazer

P0 pode extrair infraestrutura e conectar uma prova técnica sem redesenhar todas as telas existentes. P0 não pode:

- alterar resultados históricos;
- reabrir recompensas;
- marcar atividade planejada como disponível;
- criar um editor genérico de conteúdo;
- iniciar Painel de gestão, Arcade, celular ou integrações reais;
- transformar armazenamento local em backend confiável por declaração.

## 3. P0-A — refatoração compatível com o esquema 6

Esta parte não muda a forma persistida e, portanto, deve manter `APP_SCHEMA_VERSION = 6` e `mvp-local-v6`.

### 3.1 Registro de atividades e rotas

**Alvo proposto:** `lib/activities/registry.ts` e tipos auxiliares em `lib/activities/types.ts`.

Cada definição registrada deverá possuir:

- `activityId`, área, título e rota canônica;
- versão atualmente publicada;
- estado de integração `available | planned`;
- chave do player, sem importar componente React dentro do domínio;
- família de contrato;
- pontos-base da área e chave lógica de recompensa;
- competências, pré-requisitos e recomendações;
- pacote de conteúdo publicado e versões aceitas.

O resolvedor deverá distinguir:

1. rota de hub;
2. rota de atividade disponível;
3. rota conhecida mas planejada;
4. rota desconhecida.

Rotas planejadas ou desconhecidas não poderão cair silenciosamente no hub como se a atividade tivesse sido aberta. A UI deverá apresentar estado explícito e o SSR deverá prová-lo.

### 3.2 Registro visual separado do domínio

**Alvo proposto:** `features/activities/player-registry.tsx`.

O registro visual relaciona a chave do player ao componente React. Essa separação evita que catálogo, regras e testes de domínio dependam de JSX e permite carregamento por área. `app/page.tsx` passa a pedir uma resolução ao registro em vez de acumular novos booleanos de rota.

A extração é incremental: players atuais podem ser registrados um a um, com testes de equivalência, sem reescrita simultânea.

### 3.3 Shell flexível de atividade

**Alvo proposto:** `features/activities/ActivityShell.tsx`.

O shell compartilha somente:

- `h1`, metadados e progresso;
- foco após mudança de etapa;
- navegação, retorno, revisão e saída;
- regiões de erro e status;
- estados de carregamento, conteúdo indisponível e falha ao salvar;
- estrutura de resultado e entrada do debrief;
- preferências de contraste, texto e movimento.

O shell deverá aceitar áreas de conteúdo por composição, sem impor grid, cartões, inbox ou sequência visual. Missão, PhishLab e Simulação continuam com identidades próprias.

### 3.4 Primitivas acessíveis

**Alvo proposto:** `features/activities/primitives/`.

Primeiras primitivas:

- `ActivityProgress`;
- `ActivityDecisionGroup`;
- `EvidenceToggle`;
- `ReviewSummary`;
- `ResultBreakdown`;
- `DebriefPanel`;
- `ActivityError`.

Cada extração deve manter o comportamento atual e receber teste de teclado/foco quando for interativa.

### 3.5 Conteúdo declarativo versionado

**Alvo proposto:** tipos em `lib/activities/content.ts` e pacotes em `lib/content/activities/<slug>/vN.ts`.

Um pacote publicado contém:

- `casePackageId` estável e exclusivo na versão;
- contexto, artefatos e opções por IDs, nunca por texto como chave;
- allowlists de relações, ações, fontes e transições;
- critérios e controles críticos;
- feedback e debrief versionados;
- classificação `legitimate | malicious | inconclusive`, quando aplicável;
- conteúdo de transferência;
- data editorial e estado de publicação.

P0 não cria editor. Os pacotes continuam estáticos, revisáveis em código e testáveis.

### 3.6 Gateway uniforme de execução

**Alvo proposto:** `lib/activities/runtime/execute-activity.ts` e adaptador no provider.

Fluxo local obrigatório:

1. resolver definição publicada por ID e versão;
2. confirmar hidratação e pré-requisitos;
3. gerar `attemptId` e data local demonstrativa;
4. validar payload bruto e pacote por allowlist;
5. avaliar por função pura;
6. formar evento interno com tentativa e resultado derivados;
7. persistir por reducer;
8. retornar à interface o mesmo resultado aceito.

Simulação e desafio de Equipes deixam de ser avaliados antes da validação. O provider não poderá retornar sucesso para algo que o reducer rejeitará.

O runtime será discriminado por família, não um avaliador universal com `unknown`. Contratos específicos continuam possíveis.

### 3.7 Separação dos testes atuais

Sem trocar a ferramenta atual de uma vez, os testes deverão ser organizados por responsabilidade:

- contrato e avaliador;
- reducer, idempotência e recompensa;
- persistência, migração e quarentena;
- catálogo, registro e SSR;
- seletores, Perfil e atividade recente.

O arquivo legado poderá continuar enquanto os blocos forem extraídos gradualmente. P0 só termina quando a cobertura anterior continuar passando.

## 4. P0-B — primeira forma nova de tentativa

P0-B começou e terminou junto da primeira prova técnica aprovada. O esquema 7 foi ativado porque a forma persistida ganhou uma nova variante reutilizável.

### 4.1 Envelope de tentativa por mecânica

Forma conceitual:

```text
MechanicActivityAttempt
  attemptId
  activityId
  activityVersion
  casePackageId
  completedAt
  mechanicId
  answerPayload
  status: evaluated
  result
```

`answerPayload` é uma união discriminada por `mechanicId`; não é um objeto arbitrário. Cada atividade restringe os IDs aceitos pelo pacote publicado. Nota, bônus, recompensa, competências e recomendações permanecem derivados.

As formas v1 atuais continuam na união `LearningAttempt` como histórico. Nenhuma tentativa antiga é convertida para a mecânica nova.

### 4.2 Migração implementada `v6 → v7`

A migração implementada:

- manter a chave `casa-digital-segura:mvp:v1`;
- alterar o envelope para `mvp-local-v7`;
- preservar integralmente estado v6 válido;
- atualizar somente metadados quando não houver dado novo a materializar;
- não criar atividade, tentativa, conclusão, competência, ponto, recompensa ou agregado;
- validar novamente todo o estado no formato v7;
- colocar payload inválido em quarentena pelo mecanismo existente;
- manter as migrações v1–v6 cobertas por teste.

Uma nova família de payload após v7 só exigirá outro bump se alterar a forma persistida, e não apenas por acrescentar um pacote de conteúdo aceito pelo registro.

### 4.3 Rascunho em andamento separado de tentativa

Conclusão e rascunho não são o mesmo dado. Se uma atividade aprovada realmente precisar de retomada, o estado futuro deverá usar uma coleção separada, por exemplo `activityDrafts`, com:

- ID, versão e pacote;
- payload parcial validado;
- etapa atual;
- data de atualização e política de expiração;
- nenhuma nota, recompensa ou evidência de competência.

Rascunho não será criado no primeiro P0 por antecipação. Cada atividade precisa justificar duração e perda real antes de ativá-lo.

## 5. Harness de interação e acessibilidade

A suíte SSR atual não comprova teclado, foco ou anúncios. A proposta técnica é acrescentar um harness de navegador baseado em Playwright, com auditoria automatizada complementar por `axe-core`, sem substituir os testes de domínio.

Cobertura mínima da primeira mecânica:

- navegação integral por teclado;
- foco no título ao avançar, revisar e concluir;
- operação sem arrastar;
- estado e posição anunciados;
- erro preservando contexto;
- `role="progressbar"`, `aria-current`, `fieldset` e `legend` quando aplicáveis;
- alto contraste, texto ampliado e movimento reduzido;
- 1280 × 720 e 1440 × 900 sem overflow horizontal;
- retomada, repetição e tentativa inválida;
- console do navegador sem erro.

Playwright, Chromium e `axe-core` foram instalados somente após autorização específica em 2026-08-15. O harness complementa, mas não substitui, os testes de domínio, reducer, persistência e SSR.

## 6. Gate autoritativo antes de uso real

O modo local pode continuar para desenvolvimento e demonstração. Antes de piloto real, o servidor deverá possuir:

- identidade e autorização por público;
- registro e versão publicada de atividade e pacote;
- validação por allowlist;
- geração ou aceite idempotente de tentativa;
- cálculo de resultado, competências, bônus e recompensa;
- transação para progresso, ledger e agregados;
- auditoria, retenção, exclusão e observabilidade;
- política de publicação e retirada de conteúdo;
- proteção contra replay e concorrência.

O cliente envia resposta bruta. Ele nunca é fonte confiável da nota ou dos pontos. Esse gate é obrigatório mesmo quando todos os artefatos forem fictícios e não depende de D1, R2 ou integração corporativa específica já estarem escolhidos.

## 7. Ordem interna de P0

| Passo | Entrega | Esquema | Gate de saída |
|---:|---|---|---|
| P0.1 | Testes de caracterização das rotas e submissões atuais | v6 | comportamento atual congelado por testes |
| P0.2 | Registro de domínio e resolvedor de rota | v6 | players atuais resolvidos sem queda silenciosa |
| P0.3 | Registro visual e extração incremental de `app/page.tsx` | v6 | mesmas rotas e SSR |
| P0.4 | `ActivityShell` e primitivas comuns | v6 | nenhuma regressão visual/funcional nos players migrados |
| P0.5 | Gateway validar → avaliar → persistir/retornar | v6 | todos os fluxos atuais rejeitam antes de avaliar |
| P0.6 | Conteúdo versionado e primeiro runtime de mecânica | v6 | definição pura e allowlists testadas |
| P0.7 | Harness de navegador e acessibilidade | v6 | teclado, foco e alternativa comprovados |
| P0.8 | Primeira atividade v2 e migração condicionada | v7 | round-trip, migrações e recompensa histórica aprovados |

### 7.1 Registro do primeiro recorte P0-A

O recorte implementado preserva `APP_SCHEMA_VERSION = 6` e `mvp-local-v6` e contém:

- registro puro de 31 conteúdos conhecidos, sendo 10 disponíveis e 21 planejados;
- resolução distinta de hub, atividade disponível, conteúdo planejado, detalhe e rota desconhecida;
- estado visual verdadeiro para rotas planejadas ou desconhecidas, sem queda silenciosa no hub e sem criar tentativa ou recompensa;
- registro visual separado com nove players já extraídos e o piloto legado identificado como player ainda inline;
- `ActivityShell`, progresso de etapas e região de erro compartilhados, adotados primeiro pelo piloto legado sem mudar sua mecânica;
- gateway tipado único usado pelas sete famílias de submissão atuais;
- validação anterior à avaliação também para Simulação, Radar e Caixa de Entrada Segura;
- pacote declarativo publicado `phishlab:link-analyzer:v1:default`, usado pela interface e pelo avaliador da versão 1;
- testes de contrato do registro, ordem de execução e SSR dos novos estados.

O recorte não cria a cirurgia de URL v2, não acrescenta parâmetro à resposta, não altera pontos, não reabre recompensa e não cria migração.

### 7.2 Registro do harness P0.7

O harness Playwright possui cinco cenários em Chromium:

- tutorial obrigatório e piloto por teclado, com foco entre etapas;
- alto contraste, texto extra grande e movimento reduzido;
- estados explícitos para rota planejada e desconhecida;
- fluxo completo de **Domínio sob a lupa v2**, persistência atual e debrief;
- reconstrução completa de **A conversa já estava acontecendo v2**, foco, teclado e debrief.

Os cenários verificam `axe` sem violações sérias ou críticas, console sem erro e ausência de overflow horizontal em 1280×720 e 1440×900 quando aplicável.

O comando `npm run test:browser` usa `scripts/run-browser-tests.mjs`: ele executa o build, inicia o Vinext somente na porta 4173, espera a disponibilidade, roda Playwright e encerra no `finally` exatamente a árvore do servidor criada pelo próprio teste. `npm run test:all` reutiliza o build produzido pela suíte de domínio. A porta 3000 não é usada por esse harness.

### 7.3 Registro do P0-B e P0.8

A primeira forma nova de tentativa usa `mechanicId: "url-anatomy"`, `casePackageId` publicado e payload discriminado. Foram conectados três pacotes alternativos da versão 2 de **Domínio sob a lupa**, avaliador puro, controles críticos, competências, reducer, provider, seletores, Perfil, atividade recente e persistência.

O esquema local passou a 7 e o envelope a `mvp-local-v7`. A migração 6→7 preserva o estado integralmente e modifica somente o metadado de esquema. A forma `PhishLabAttempt` v1 continua na união histórica; não é convertida, reinterpretada nem recompensada novamente. Com esse registro, P0 foi encerrado e abriu a prova 1.2 da Onda 1.

### 7.4 Registro da prova 1.2

**A conversa já estava acontecendo** foi publicada como versão 2 com `mechanicId: "conversation-reconstruction"` e três pacotes alternativos. A família C2 agora possui ordenação por botões/seletor, ponto de mudança, painel fato–indício–inferência, confirmação independente, reporte condicional, transferência e debrief.

A nova variante `ConversationReconstructionV2Attempt` ativou `APP_SCHEMA_VERSION = 8` e `mvp-local-v8`. A fundação aprovada foi convertida depois, ativando esquema/envelope 9 com migração v8→v9 também restrita ao metadado. **Quem enviou de verdade? v2** foi convertida em seguida, ativando esquema/envelope 10 com migração v9→v10 também restrita ao metadado e aplicando as regras compartilhadas de atribuição automática e clareza da jornada curricular.

### 7.5 Validação de encerramento atualizada

Em 2026-08-15:

- `npm run lint` passou;
- `npm test` passou com build completo e 22 testes de domínio, estado, migração, catálogo e SSR;
- `npm run test:browser` passou com cinco cenários em Chromium;
- `git diff --check` passou, restando somente avisos de conversão LF→CRLF do ambiente Windows;
- `npx tsc --noEmit --incremental false` continuou apontando apenas o baseline preexistente de tipos Cloudflare, narrowing do Radar e validações `unknown` da persistência; nenhum erro novo do registro, runtime, contrato v2 ou player foi introduzido.

## 8. Critérios de aceite de P0

- Nenhuma rota, resultado, ponto ou estado atual muda sem decisão explícita.
- `app/page.tsx` não recebe novo ramo específico para a primeira prova técnica.
- Registro de domínio não importa React.
- O shell não impõe a mecânica visual.
- Toda submissão integrada passa pela mesma ordem de execução.
- Contratos continuam tipados e allowlisted.
- Tentativas v1 permanecem legíveis.
- O esquema só muda junto de uma forma persistida realmente nova.
- Testes de domínio, SSR, navegador e acessibilidade passam.
- A ficha canônica e o documento principal são atualizados no mesmo lote do código.
- O portal continua identificado como demonstração local não autoritativa.
