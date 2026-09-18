# Mapa técnico de implementação do portfólio-alvo

> **Estado:** mapa técnico aprovado em 2026-08-15; P0.1 a P0.8 e a prova 1.1 da Onda 1 implementados e validados.
>
> **Origem:** 21 blueprints de primeira versão aprovados em 2026-08-15 e uma arquitetura futura aprovada apenas como fronteira.
>
> **Efeito técnico atual:** a fundação está concluída, **Domínio sob a lupa** foi publicada como versão 2 e a migração local 6→7 foi ativada. Nenhuma atividade antes planejada ficou disponível e nenhuma recompensa foi reaberta.
>
> **Escopo:** portal do funcionário em desktop. Painel de gestão, celular, Arcade, mídia obrigatória e integrações reais permanecem fora.

Este mapa transforma os blueprints aprovados em uma sequência que poderá ser implementada e validada sem acoplar 21 players novos aos arquivos centrais atuais. Ele define a fundação necessária, as famílias reutilizáveis, uma identidade técnica candidata por atividade, as dependências e os gates de cada onda.

## 1. Resultado desta etapa

| Recorte | Resultado documental |
|---|---:|
| Blueprints aprovados com primeira versão | 21 |
| Missões no mapa técnico | 8 |
| PhishLabs no mapa técnico | 8 |
| Simulações no mapa técnico | 5 |
| Arquitetura futura mantida fora da execução | 1 — **A porta também é um canal** |
| Atividades existentes que evoluem para versão 2 | 6 |
| Atividades com ID de catálogo já existente e primeira versão futura | 2 |
| Atividades novas com identidade técnica apenas candidata | 13 |

As quantidades não alteram o catálogo atual. Uma atividade só poderá ser marcada como disponível depois de player, conteúdo, contrato, avaliador, persistência, integrações e testes estarem conectados.

## 2. Documentos

1. [`FUNDACAO-P0.md`](FUNDACAO-P0.md) — registro de atividades, shell flexível, conteúdo versionado, execução, estado, persistência, testes e gate autoritativo.
2. [`COMPONENTES-COMPARTILHADOS.md`](COMPONENTES-COMPARTILHADOS.md) — componentes reutilizáveis, sua fronteira e a primeira atividade responsável por prová-los.
3. [`ORDEM-DE-IMPLEMENTACAO.md`](ORDEM-DE-IMPLEMENTACAO.md) — ondas, dependências, gates de entrada e saída e ordem dentro de cada onda.
4. [`MISSOES.md`](MISSOES.md) — conversão técnica individual das oito Missões.
5. [`PHISHLABS.md`](PHISHLABS.md) — conversão técnica individual dos oito PhishLabs.
6. [`SIMULACOES.md`](SIMULACOES.md) — conversão técnica individual das cinco Simulações e fronteira da sexta arquitetura futura.

## 3. Hierarquia de decisão

1. [`DOCUMENTACAO-PLATAFORMA.md`](../../../DOCUMENTACAO-PLATAFORMA.md) mantém as políticas transversais.
2. [`conjuntos-de-ensino`](../conjuntos-de-ensino/README.md) mantém a definição dos 187 conceitos.
3. [`mapa-conceitos-atividades`](../mapa-conceitos-atividades/README.md) mantém propriedade, papel, momento e composição aprovados.
4. [`blueprints`](../blueprints/README.md) mantém casos, percursos, fluxo, avaliação e limites aprovados por atividade.
5. Esta pasta propõe identidade técnica, componentes, contratos por família, dependências e ordem de construção.
6. As [fichas canônicas da pasta pai](../README.md) continuam descrevendo o que realmente funciona no portal. Elas só serão atualizadas como implementadas no mesmo lote do código correspondente.

Em caso de conflito, prevalece a decisão transversal mais recente. O mapa técnico não pode alterar silenciosamente um comportamento aprovado no blueprint.

## 4. Regras de identidade e versão

### 4.1 Atividade existente com nova mecânica

São preservados o `activityId` e a rota atuais, e a mecânica aprovada recebe `activityVersion: 2`. Tentativas da versão 1 permanecem legíveis e imutáveis. A recompensa continua vinculada à atividade lógica e não é concedida de novo apenas pela atualização para a versão 2.

Essa regra se aplica a:

- `mission:compromised-conversation`;
- `mission:mfa-fatigue`;
- `mission:clicked-now-what`;
- `phishlab:true-sender`;
- `phishlab:link-analyzer`;
- `simulation:workday`.

### 4.2 Item planejado que já possui ID de catálogo

O ID candidato existente é preservado e a primeira versão executável futura será `activityVersion: 1`. A existência do card não prova integração nem concede progresso.

Essa regra se aplica a:

- `mission:urgent-manager-request`;
- `mission:unexpected-document`.

### 4.3 Atividade nova

O mapa de área define um ID em inglês estável, uma rota legível em português e `activityVersion: 1`. Esses valores foram aprovados como identidade técnica, mas permanecem com integração `planned` até cada player, contrato, avaliador, persistência e teste ser concluído.

### 4.4 Arquitetura futura

**A porta também é um canal** não recebe ID, rota, versão, pontos ou posição de construção. Seus módulos dependem de composição, público e procedimentos locais ainda não definidos.

## 5. Regras de contrato e persistência

- Conteúdo e resposta são versionados por `activityId`, `activityVersion` e `casePackageId`.
- A resposta persistida contém escolhas brutas; nota, feedback, bônus e competências são derivados.
- Cada família possui um payload discriminado, validado por allowlist da atividade e do pacote.
- A ordem obrigatória é **validar → avaliar → persistir/retornar**.
- O mesmo `attemptId` é idempotente; uma tentativa nova pode atualizar melhor e último resultado sem duplicar recompensa.
- Refatorações que não mudavam dados preservaram o esquema 6 durante P0-A.
- A primeira forma nova foi publicada no P0-B e ativou explicitamente a migração `v6 → v7`.
- A segunda família persistida, reconstrução de conversa, ativou `v7 → v8` sem fabricar dados.
- A migração não cria tentativas, progresso, pontos ou recompensa e mantém formas antigas como variantes históricas.
- O armazenamento local continua demonstrativo e `isAuthoritative: false`.

## 6. Regra de composição técnica

Compartilhar infraestrutura não significa repetir o mesmo formato. O shell fornece foco, progresso, revisão, erro e resultado; cada mecânica mantém sua própria área de trabalho, linguagem visual e interação central.

Cada pacote continua com:

- um comportamento principal;
- até dois complementares formais;
- uma transferência curta quando prevista;
- debrief que separa fato, indício, hipótese, limite técnico e ação segura.

Percursos não recebem recompensas separadas. Banco de casos, debriefs e versões futuras não entram automaticamente na primeira implementação.

## 7. Gates invariáveis

- Portal do funcionário e validação completa vêm antes do Painel de gestão.
- Radar permanece opcional, pontuado por sua regra própria e nunca pré-requisito.
- Arcade permanece somente catálogo, sem incorporação de jogo externo.
- Desktop é o recorte atual; celular permanece posterior.
- Nenhuma atividade usa link, QR, arquivo, comando, chamada, pagamento, contato ou reporte real.
- Teclado, foco, alternativa sem arrastar, texto equivalente, alto contraste, texto ampliado e movimento reduzido são requisitos de aceite.
- O backend autoritativo é gate de produção independente das integrações corporativas e obrigatório antes de qualquer uso real.

## 8. Execução autorizada e próximo gate

Em 2026-08-15 foram aprovados os 13 IDs e rotas novos, as seis evoluções v2, a fundação P0, as migrações condicionadas por novas formas persistidas, as famílias compartilhadas e a ordem das ondas.

P0.1 a P0.8, as provas 1.1–1.3 e a fundação `mission:account-lock` v2 foram concluídos. O harness autorizado usa Playwright, Chromium e `axe-core`; cobre teclado, foco, preferências de acessibilidade, desktop sem overflow, estados de rota e console limpo. **Domínio sob a lupa v2** publica três pacotes de anatomia; **A conversa já estava acontecendo v2** publica três reconstruções alternativas; **O aviso que não podia esperar v2** publica um pacote PARE canônico; e **Quem enviou de verdade? v2** publica três pacotes internos de mapa de identidade. As formas v1 permanecem históricas e recompensa/contribuição continuam únicas por atividade lógica. O envelope atual é `mvp-local-v10`; as migrações 6→7, 7→8, 8→9 e 9→10 modificam somente o metadado de esquema.

A [jornada curricular aprovada](../mapa-conceitos-atividades/JORNADA-CURRICULAR.md) não desfaz essas provas técnicas. O [blueprint técnico de **O aviso que não podia esperar**](../blueprints/missao--o-aviso-que-nao-podia-esperar.md) foi convertido como primeira aplicação da atribuição automática de pacote e das regras de clareza textual. **Quem enviou de verdade? v2** concluiu depois a prova 1.3 da Onda 1 com o mesmo princípio de pacote interno e mecânica própria. A ordem de engenharia não deve ser exibida como ordem de aprendizagem.
