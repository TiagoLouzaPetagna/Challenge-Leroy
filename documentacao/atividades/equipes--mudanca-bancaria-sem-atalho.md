# Equipes — Mudança bancária sem atalho

> Estado documental: a versão 2 está implementada e disponível como estação de processo. A versão 1 permanece legível e imutável para preservar tentativas, recompensa e agregado anteriores.

## 1. Identidade

| Campo | Valor vigente |
|---|---|
| Área | Equipes |
| Percurso | Confiança sob pressão |
| Ordem recomendada | 8 de 8 |
| `activityId` | `team:bank-change` |
| Versão implementada | `2` — versão `1` aceita como histórico |
| Rota | `/equipes/mudanca-bancaria-sem-atalho` |
| Duração estimada | 14 minutos |
| Pontos-base | 80 |
| Competências | Verificar, Decidir, Reportar e Orientar |
| Pré-requisitos obrigatórios | Nenhum |
| Recomendação anterior | Uma manhã comum |
| Radar relacionado | Quando o golpista se passa por um gestor — opcional |

A atividade é individual, embora pertença à área Equipes. Uma pessoa recebe todo o contexto e somente um resumo da primeira conclusão válida alimenta o agregado. Não há papéis, espera por colegas ou multiplayer simulado.

**Caixa de Entrada Segura** permanece como desafio anterior separado em `/equipes/caixa-de-entrada-segura`. Seu contrato e seu histórico não foram convertidos para esta atividade.

## 2. Objetivo de aprendizagem

Ensinar a proteger uma alteração bancária por processo, não por aparência. O funcionário deve suspender a mudança, consultar o cadastro existente, confirmar por contato previamente registrado, manter a segunda aprovação e reportar possível comprometimento.

O caso trabalha BEC e engenharia social em uma situação plausível: fornecedor conhecido, conversa coerente, documento convincente, prazo real e contato novo fornecido na própria solicitação.

## 3. Versão 1 preservada

### 3.1 Conteúdo atual

O cenário utiliza a fornecedora fictícia Madeira Norte Componentes, o pedido 8731 e dados mascarados. A mensagem:

- vem de uma conta conhecida;
- usa pedido, valor e conversa coerentes;
- pede nova conta perto do fechamento do lote;
- apresenta PDF timbrado inerte;
- fornece um novo telefone;
- pressiona por exceção ao processo.

Cinco fontes aparecem progressivamente:

1. solicitação recebida;
2. lote de pagamento;
3. cadastro homologado;
4. procedimento oficial;
5. retorno do contato cadastrado negando a mudança.

Abrir uma fonte registra inspeção, mas não vale pontos.

### 3.2 Fluxo atual

1. **Briefing:** informa recompensa, privacidade, ausência de cronômetro e efeito coletivo.
2. **Conter:** uma escolha em rádio sobre a primeira ação.
3. **Interpretar:** uma escolha sobre o limite das evidências aparentes.
4. **Confirmar:** uma escolha sobre a origem do contato.
5. **Proteger:** uma escolha sobre bloqueio, fluxo e segunda aprovação.
6. **Reportar:** uma escolha sobre o reporte.
7. **Resultado:** nota, cinco decisões, debrief, competências e efeito agregado.

É possível voltar pelas abas das cinco decisões, mas não existe uma tela-resumo própria antes do envio. Portanto, a “revisão antes da conclusão” descrita no documento-mãe corresponde hoje à navegação entre etapas, não a uma revisão consolidada.

### 3.3 Avaliação e recompensa atuais

A nota vai de 0 a 100:

| Etapa | Resposta integralmente segura | Peso |
|---|---|---:|
| Conter | suspender alteração e pagamento relacionado, preservando o pedido | 20 |
| Interpretar | reconhecer plausibilidade sem tratá-la como autenticação | 20 |
| Confirmar | usar contato previamente cadastrado | 25 |
| Proteger | manter bloqueio, abrir fluxo e exigir segunda aprovação | 20 |
| Reportar | usar canal oficial com contexto útil e sem segredos | 15 |

Há crédito parcial em algumas alternativas, mas falhar em contenção, contato cadastrado, segunda aprovação ou reporte sempre recomenda revisão. Cada competência é considerada coberta pela atividade a partir de 60.

A primeira conclusão concede 80 pontos-base mais bônus geral de 10%, 20% ou 30%. Uma conclusão perfeita concede 104 pontos. Repetições não duplicam recompensa, contribuição ou conquista.

### 3.4 Contrato atual e agregado

A versão 1 possui `BankChangeSubmission`, `BankChangeAnswer`, `BankChangeAttempt` e `BankChangeResult`. A resposta registra:

- `initialActionId`;
- `evidenceAssessmentId`;
- `verificationRouteId`;
- `processActionId`;
- `reportActionId`;
- `inspectedEvidenceIds`;
- metadados e resultado.

Essa forma foi adicionada ao esquema local 6. O agregado recebe somente origem, quantidade de decisões integralmente corretas, total de cinco decisões, competências cobertas e horário.

A primeira conclusão de cada desafio elegível soma decisões e cobertura. A mesma pessoa aumenta `validParticipants` apenas uma vez no agregado transversal, mesmo concluindo os dois desafios de Equipes.

## 4. Versão 2 implementada — estação de processo

### 4.1 Mecânica principal

A versão 2 usa uma **estação de processo**, não uma sequência de cinco perguntas de múltipla escolha. O funcionário:

1. comparar cadastro anterior e solicitação;
2. selecionar um contato no diretório interno;
3. consultar a resposta do fornecedor;
4. organizar confirmação, bloqueio, fluxo oficial e segunda aprovação;
5. montar o reporte final.

O caso continua único e individual. O pacote canônico `team:bank-change:v2:registered-supplier-change` é atribuído automaticamente; não existe seletor P1/P2/P3. A mudança está na operação realizada, não na privacidade.

### 4.2 Fluxo publicado

#### Estação 1 — Comparar registros

A solicitação e o cadastro homologado aparecem lado a lado. O funcionário marca diferenças relevantes entre:

- conta cadastrada e conta solicitada;
- telefone homologado e telefone fornecido no documento;
- procedimento existente e exceção pedida;
- prazo operacional e autorização real.

Histórico, aparência e urgência podem ser registrados como contexto, mas não como autenticação.

#### Estação 2 — Escolher a origem do contato

Um diretório simulado oferece fontes como:

- telefone do PDF;
- resposta na mesma conversa;
- busca pública;
- contato homologado no cadastro.

A interface identifica a origem de cada contato. A consequência só aparece depois da escolha: o contato cadastrado nega a alteração; contatos vindos do pedido, da própria conversa ou de busca pública mostram por que aquela rota não confirma o fornecedor. A pessoa pode voltar e corrigir a origem antes de concluir.

#### Estação 3 — Consultar a confirmação

O contato homologado informa, em texto, que não houve solicitação de mudança e pede bloqueio preventivo. Nenhuma ligação real é realizada.

#### Estação 4 — Montar o processo seguro

Cartões de ação são classificados entre ações que integram ou não integram o processo e, quando necessário, ordenados por botões **Subir** e **Descer**. O conjunto inclui:

- suspender alteração e pagamento relacionado;
- preservar mensagem e documento;
- confirmar pelo contato cadastrado;
- manter o bloqueio;
- abrir o fluxo oficial;
- exigir segunda aprovação;
- reportar possível comprometimento;
- alternativas inseguras como atualizar, pagar ou divulgar antes da confirmação.

O avaliador verifica quatro relações críticas, não uma sequência total artificial. Preservação e reporte podem ocorrer em paralelo.

#### Estação 5 — Montar o reporte

O funcionário reúne fatos operacionais úteis, como remetente, horário, fornecedor, pedido, mudança solicitada, contenção, fonte de confirmação e resposta obtida. Senha, código, boato, dados bancários completos ou opinião sem evidência não devem entrar.

#### Resultado

O debrief reproduz a trajetória como linha de processo e mostra onde um controle foi preservado ou substituído por um atalho.

## 5. Atual × alvo

| Aspecto | Versão 1 atual | Formato-alvo aprovado |
|---|---|---|
| Comparação | Dados visíveis e uma pergunta sobre evidência | Marcação direta de diferenças entre registros |
| Contato | Uma opção em rádio | Escolha da fonte em diretório simulado |
| Resposta do fornecedor | Fonte liberada pelo avanço da etapa | Consequência coerente da confirmação independente |
| Processo | Uma alternativa pronta | Cartões classificados e parcialmente ordenados |
| Reporte | Uma alternativa pronta | Seleção e composição dos fatos do reporte |
| Resultado | Revisão das cinco escolhas | Linha do processo construído |
| Contrato | Cinco identificadores de escolha | Comparações, diretório, processo e reporte a definir |

## 6. Avaliação e recompensa da versão 2

Os 80 pontos-base, bônus geral, recompensa única e ausência de nota por velocidade foram preservados. Uma nota perfeita produz 104 pontos potenciais na primeira conclusão lógica.

As dimensões publicadas são:

- comparação e limite de autorização — 20 pontos;
- origem independente do contato e consulta da consequência — 25 pontos;
- classificação das ações do processo — 20 pontos;
- relações críticas entre contenção, confirmação, fluxo e segunda aprovação — 20 pontos;
- qualidade e segurança do reporte — 15 pontos.

A avaliação não exige uma única ordem para ações que podem ocorrer em paralelo e preserva os controles críticos:

- nenhuma alteração ou pagamento relacionado antes da contenção e confirmação;
- contato anterior independente da solicitação;
- segunda aprovação sem substituir a confirmação do fornecedor;
- reporte do possível comprometimento.

Para manter o agregado comparável com a versão 1, o resultado deriva cinco controles normalizados nos mesmos pesos 20/20/25/20/15. `correctDecisions` registra quantos controles atingiram integralmente o valor esperado e `totalDecisions` permanece `5`.

## 7. Contrato, versionamento e compatibilidade

A versão 2 possui `BankProcessV2Submission`, `BankProcessV2Answer`, `BankProcessV2Attempt` e `BankProcessV2Result`. A resposta bruta registra:

- `casePackageId` e `mechanicId: "process-station"`;
- `selectedComparisonIds`;
- `contactSourceId` e `contactResponseViewed`;
- `processPlacements`, com grupo e posição de cada cartão;
- `selectedReportBlockIds`;
- metadados da tentativa. Nota, competências, recompensa e cinco controles normalizados são sempre derivados.

O validador publicado:

- valida pacote, versão, mecânica, fontes, cartões, grupos, posições e blocos por allowlist;
- rejeita duplicatas, omissões de cartões e posições inválidas;
- preserva tentativas e resultados v1 sem fabricar operações v2;
- mantém as mesmas chaves de recompensa e agregado entre versões;
- impede segunda contribuição ou nova recompensa pela reformatação.

O `activityId` e a rota permaneceram estáveis. `APP_SCHEMA_VERSION` passou de `13` para `14`, o envelope passou a `mvp-local-v14` e a migração v13→v14 altera somente o metadado antes de revalidar todo o estado.

## 8. Integrações

A atividade deve continuar:

- como sétima etapa recomendada e destaque atual de Equipes;
- disponível sem pré-requisito obrigatório;
- recomendada depois de **Uma manhã comum**;
- relacionada a Radar opcional;
- atualizando Verificar, Decidir, Reportar e Orientar;
- integrada a perfil, pontos, conquistas e atividade recente;
- preservando **Caixa de Entrada Segura** como desafio anterior separado;
- alimentando somente resultados agregados de setor.

Uma conclusão v1 continua contando para o percurso. Reabrir o desafio poderá apresentar o resultado histórico ou oferecer a prática nova, conforme regra de compatibilidade a definir.

## 9. Privacidade, segurança e backend

Permanecem privados:

- diferenças marcadas;
- fonte de contato escolhida;
- processo e reporte montados;
- nota, debrief, competências e repetições;
- recompensa individual.

O setor recebe apenas um resumo sem nome, tentativa, escolhas ou evidências brutas. Reportar e Orientar continuam fora do denominador coletivo até configuração explícita futura, embora possam aparecer na reivindicação da atividade e no perfil.

Nenhum e-mail é enviado, telefone é chamado, PDF é executado, cadastro é alterado, pagamento é realizado ou reporte real é criado.

No uso real, o backend autoritativo deverá identificar funcionário e equipe, deduplicar participante, validar o caminho, calcular nota e controles agregados e confirmar recompensa e contribuição transacionalmente.

## 10. Acessibilidade desktop

- A comparação lado a lado deve possuir alternativa linear e cabeçalhos associados.
- Diferenças não podem ser comunicadas apenas por cor.
- O diretório deve informar a fonte de cada contato em texto.
- O montador de processo não pode depender exclusivamente de arrastar.
- Devem existir comandos Mover, Subir e Descer com anúncio da nova posição.
- O reporte deve usar controles nativos e agrupamentos claros.
- Mudanças de estação devem mover foco para o título.
- O resultado deve reproduzir o processo também em lista textual.
- Contraste, tamanho de texto e movimento reduzido precisam ser respeitados.
- Velocidade não pode afetar a nota.

O comportamento específico para celular permanece fora deste recorte.

## 11. Testes e critérios de aceite

- A rota deve renderizar a atividade, não o hub genérico de Equipes.
- Solicitação e cadastro devem usar somente dados fictícios e mascarados.
- A comparação deve funcionar por teclado e pela alternativa linear.
- A origem de cada contato deve permanecer identificável.
- A resposta do fornecedor não pode aparecer incoerentemente antes da rota correspondente.
- O processo deve aceitar ordens seguras equivalentes e rejeitar ausência de controles críticos.
- O reporte deve excluir segredos e dados excessivos conforme regra publicada.
- A avaliação deve produzir os controles normalizados usados no agregado.
- A mesma pessoa deve contar uma única vez em `validParticipants` no agregado transversal.
- Uma atividade deve contribuir suas decisões no máximo uma vez.
- Tentativas v1 e reivindicações anteriores devem sobreviver à migração.
- Repetições não podem duplicar recompensa, conquista ou contribuição.
- Resultado individual e escolhas não podem aparecer no ranking.
- Nenhuma ação pode produzir efeito externo.
- Build, lint, testes e validação manual desktop devem passar sem erro de console.

## 12. Decisões fechadas na versão 2

- O pacote inicial é único e atribuído automaticamente.
- Cada origem de contato possui consequência textual própria; somente o contato cadastrado produz confirmação independente.
- Todos os cartões são classificados e apenas os incluídos no processo são ordenados.
- A avaliação usa relações críticas e não cobra uma ordem total.
- O reporte usa blocos fechados e inertes; nenhum envio ocorre.
- A conclusão v1 continua válida, não é reinterpretada e não reabre recompensa ou agregado.
- O rascunho incompleto permanece somente na sessão nesta versão e não é anunciado como retomável após recarga.

## 13. Histórico

| Data | Registro |
|---|---|
| 2026-08-11 | Versão 1 disponibilizada com um caso contínuo, cinco decisões e agregado transversal. |
| 2026-08-11 | Aprovado o formato de estação de processo com comparação, diretório, confirmação, ordenação e reporte. |
| 2026-08-11 | Documento criado para separar a versão funcional do alvo e registrar os requisitos de compatibilidade do agregado. |
| 2026-08-16 | Versão 2 publicada como estação de processo, com contrato próprio, esquema 14, revisão privada e compatibilidade integral com a versão 1. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
