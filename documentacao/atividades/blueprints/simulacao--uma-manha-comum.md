# Uma manhã comum

> **Estado do blueprint:** aprovado em 2026-08-15 e convertido na versão 2 em 2026-08-16.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** a triagem em lote está disponível como `simulation:workday` versão 2 na rota `/simulacoes/dia-de-trabalho`; a versão 1 continua aceita e legível.
>
> **Efeito técnico:** implementação registrada no catálogo, contrato, avaliador, estado, persistência, currículo e testes.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Simulação |
| Comportamento principal aprovado | Organizar uma caixa mista e decidir quando prosseguir, verificar, manter inconclusivo ou reportar sem usar a aparência como veredito |
| Mecânica-base aprovada | Triagem em lote com fila inconclusiva, investigação seletiva e revisão global |
| Estado da atividade atual | Disponível na versão 2 como triagem em lote; versão 1 preservada por compatibilidade |
| Relação com implementação existente | Evolução versionada da atividade atual; preserva identidade curricular, tentativas e recompensa já reivindicada |
| `activityId`, versão e rota | `simulation:workday`, versão publicada `2`, versões aceitas `[1, 2]` e `/simulacoes/dia-de-trabalho` |
| Duração-alvo | 10 a 14 minutos |
| Regra de recompensa considerada | 70 pontos-base de Simulação e bônus transversal vigente; a evolução não reabre uma recompensa já concedida |
| Conceitos proprietários | 14, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md) |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes iniciais alternativos, incluindo resultados malicioso, legítimo e inconclusivo;
- uma triagem por filas que substitui, na versão-alvo, a sequência de perguntas independentes;
- avaliação do processo completo, com controle explícito de falsos positivos e incerteza;
- retomada do rascunho e repetição preferencial com pacote ainda não visto;
- compatibilidade obrigatória com a versão 1 sem reinterpretar respostas anteriores.

### 1.2 Decisões técnicas fechadas e pendência remanescente

- versão sucessora `2`, `mechanicId: "batch-triage"` e `APP_SCHEMA_VERSION: 13`;
- quatro filas textuais, seleção por controle nativo e revisão global;
- três pacotes publicados com 7, 5 e 6 itens;
- contrato `WorkdayTriageV2Submission` e tentativa própria, sem converter respostas v1;
- rascunho parcial permanece apenas na sessão e sua persistência continua pendente;
- integrações e persistência reais continuam condicionadas ao backend autoritativo.

## 2. Contrato educacional

- **Comportamento observável:** classificar itens de trabalho, investigar somente o necessário, preservar pendências verificáveis e aplicar uma ação proporcional antes de concluir o lote.
- **Técnicas ou objetivos do atacante:** explorar sobrecarga, ambiguidade, rotina e urgência para obter clique, dado, credencial, pagamento ou continuidade de contato.
- **Atalho inseguro enfrentado:** resolver tudo depressa, confiar no contexto aparente, reportar todo item incomum ou descartar o que ainda não pode ser comprovado.
- **Resposta segura generalizável:** reduzir o ruído, separar fato de hipótese, verificar por fonte independente e manter itens inconclusivos sob controle sem liberar ação sensível.
- **O que a conclusão permite afirmar:** como a pessoa aplicou esse processo no pacote apresentado.
- **O que não permite afirmar:** retenção, domínio permanente, produtividade real ou capacidade de detectar fenômenos invisíveis.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:influence-overload` | Núcleo | Primeira versão | Pressão concorrente que exige priorização sem decisão automática | P1, P2 e P3 |
| `concept:decision-ambiguity` | Complementar | Primeira versão | Distingue desconhecido de malicioso e impede certeza forçada | P1, P2 e P3 |
| `concept:false-positive-control` | Transversal com proprietário | Primeira versão | Exige tratamento correto de itens legítimos difíceis | P1, P2 e P3 |
| `concept:uncertain-reporting` | Transversal com proprietário | Primeira versão | Permite registrar hipótese e lacuna sem acusação | P1, P2 e P3 |
| `concept:influence-scarcity` | Variação de caso | Banco de casos | Pressão por oportunidade ou recurso supostamente limitado | Banco de casos |
| `concept:influence-fear` | Variação de caso | Banco de casos | Ameaça de perda, punição ou bloqueio | Banco de casos |
| `concept:influence-reward` | Variação de caso | Banco de casos | Benefício prometido para induzir ação | Banco de casos |
| `concept:influence-current-event` | Variação de caso | Banco de casos | Uso de evento recente como plausibilidade | Banco de casos |
| `concept:phishing-mass` | Variação de caso | Banco de casos | Solicitação genérica enviada em escala | Banco de casos |
| `concept:identity-external-marker` | Variação de caso | Banco de casos | Marcador de remetente externo como indício, nunca veredito | Banco de casos |
| `concept:malicious-unsubscribe` | Variação de caso | Banco de casos | Botão de descadastro usado como destino suspeito | Banco de casos |
| `concept:calendar-invite` | Variação de caso | Banco de casos | Convite de calendário como veículo de pretexto | Banco de casos |
| `concept:prize-sweepstakes` | Variação de caso | Banco de casos | Prêmio ou sorteio como isca | Banco de casos |
| `concept:delivery-fee` | Variação de caso | Banco de casos | Cobrança pequena ligada a entrega | Banco de casos |

## 4. Arquitetura da primeira versão

Os três percursos são pacotes alternativos. Uma tentativa recebe somente um deles.

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Abertura do expediente | Caixa com e-mail, chat, calendário e aviso interno acumulados | Triar, investigar e concluir o lote com ações proporcionais | `concept:decision-ambiguity` | A mesma solicitação reaparece em outro canal sem virar prova adicional | Malicioso, legítimo e inconclusivo no mesmo lote |
| P2 — Mudança de prioridade | Duas demandas legítimas urgentes competem com uma solicitação maliciosa e outra ambígua | Reduzir ruído e preservar controles mesmo sob urgência real | `concept:decision-ambiguity` | Um aviso visualmente estranho é confirmado em fonte oficial | Controle de falso positivo com ameaça real |
| P3 — Pendência que voltou | Um item inicialmente inconclusivo recebe nova informação durante o lote | Manter, retomar e resolver uma pendência sem adivinhar | `concept:decision-ambiguity` | A confirmação chega por rota independente em formato diferente | Inconclusivo que se torna legítimo ou malicioso |

`concept:false-positive-control` e `concept:uncertain-reporting` são transversais proprietários e explicam a mesma decisão de triagem; não criam objetivos paralelos. Nenhum conceito do banco é ativado formalmente na primeira versão.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Abertura do expediente

| Elemento | Definição |
|---|---|
| Situação inicial | O expediente começa com sete itens não tratados e nenhuma indicação da quantidade de ameaças |
| Canal e artefatos | E-mails sintéticos, conversa curta, tarefa interna, aviso de serviço e registro de pedido |
| Identidade ou pretexto | Colega, fornecedor e sistema interno alegados |
| Objetivo do atacante ou hipótese legítima | Obter abertura de destino ou continuidade de contato; parte dos itens representa trabalho normal |
| Pressões e aparências | Acúmulo, assunto urgente, linguagem familiar e logotipo |
| Evidências disponíveis | Endereço completo, contexto anterior, destino aparente, registro do pedido e canal oficial conhecido |
| Evidência decisiva ou limite de certeza | Alguns itens possuem confirmação independente; um permanece sem evidência suficiente |
| Confirmação independente | Consulta simulada ao registro ou ao contato previamente cadastrado |
| Ação segura | Prosseguir no legítimo, conter e reportar o malicioso e manter o desconhecido em investigação |
| Reporte ou recuperação | Relato estruturado apenas para itens justificáveis, com fatos e lacunas |
| Transferência curta | Uma solicitação já vista por e-mail reaparece no chat; a repetição não vale como confirmação independente |
| Debrief | Compara fato, indício, hipótese, limite e ação proporcional de cada item |
| Conteúdo fictício necessário | Sete itens, registros internos simulados, endereços `.example` e fragmentos de reporte |

### Percurso P2 — Mudança de prioridade

| Elemento | Definição |
|---|---|
| Situação inicial | Uma tarefa legítima muda de prioridade enquanto chegam quatro solicitações adicionais |
| Canal e artefatos | Caixa de entrada, aviso interno de prazo, mensagem de projeto e solicitação de parceiro |
| Identidade ou pretexto | Gestor real do cenário, parceiro conhecido e identidade externa não confirmada |
| Objetivo do atacante ou hipótese legítima | Explorar a pressa causada por trabalho verdadeiro; dois itens urgentes são legítimos |
| Pressões e aparências | Prazos simultâneos, linguagem curta e notificação destacada |
| Evidências disponíveis | Histórico do projeto, diretório fictício, número do chamado e origem completa |
| Evidência decisiva ou limite de certeza | A urgência legítima possui vínculo com registro anterior; a solicitação perigosa depende somente do próprio remetente |
| Confirmação independente | Abrir o chamado pelo catálogo simulado, sem usar o destino recebido |
| Ação segura | Priorizar sem liberar a ação sensível, confirmar e depois prosseguir ou reportar |
| Reporte ou recuperação | Registrar a tentativa maliciosa; não reportar o item legítimo apenas por ser urgente |
| Transferência curta | Um aviso pouco polido, mas autêntico, aparece em um canal diferente |
| Debrief | Mostra que urgência e aparência alteram prioridade de investigação, não o veredito |
| Conteúdo fictício necessário | Cinco itens, histórico de projeto, catálogo de serviço e confirmação inerte |

### Percurso P3 — Pendência que voltou

| Elemento | Definição |
|---|---|
| Situação inicial | Seis itens chegam; um pedido plausível não possui confirmação disponível no primeiro momento |
| Canal e artefatos | E-mail, chat e registro textual de resposta posterior |
| Identidade ou pretexto | Solicitante conhecido por endereço ainda não confirmado |
| Objetivo do atacante ou hipótese legítima | Pode ser uma troca legítima de canal ou uma tentativa de personificação |
| Pressões e aparências | Pedido rotineiro, prazo próximo e dados contextuais corretos |
| Evidências disponíveis | Cadastro anterior, histórico parcial e resposta posterior da rota conhecida |
| Evidência decisiva ou limite de certeza | Antes da resposta independente, o estado correto é inconclusivo |
| Confirmação independente | A consulta simulada é feita pelo cadastro anterior e libera nova evidência sem revelar acerto |
| Ação segura | Manter a ação sensível bloqueada, voltar à pendência e concluir após a confirmação |
| Reporte ou recuperação | Reportar se a resposta negar o pedido; registrar somente a pendência se continuar incerta |
| Transferência curta | A resposta independente chega como nota de chamado, não como mensagem do solicitante |
| Debrief | Evidencia que “não sei ainda” é um estado operacional, não falha |
| Conteúdo fictício necessário | Seis itens, duas evoluções possíveis versionadas e fragmentos factuais |

## 6. Mecânica e diferenciação

- **Interação central:** mover cada item, por botões ou seleção equivalente, entre `Entrada`, `Investigar`, `Inconclusivos` e `Resolvidos`; abrir evidências quando necessário; atribuir ação final e revisar o lote.
- **Por que combina com o comportamento:** a pessoa precisa administrar prioridade, incerteza e retorno a pendências, não responder a seis perguntas isoladas.
- **Como se distingue das outras 21 atividades:** simula carga de trabalho mista e decisões concorrentes; não reconstrói uma única conversa, não disseca um único artefato e não executa um processo financeiro especializado.
- **O que é reutilizável:** estrutura de briefing/resultado, cartões de artefato, seletores de evidência, montador de reporte e indicadores de progresso.
- **O que foi implementado em componente próprio:** seleção de item, quatro filas, estado inconclusivo e revisão global do lote. Persistência do rascunho e filtros não destrutivos continuam extensões futuras.
- **Alternativa sem arrastar, mídia ou representação espacial:** cada cartão oferece `Mover para…`, teclas e lista tabular; ordem visual não contém informação exclusiva.
- **Risco de virar questionário disfarçado e prevenção:** nenhuma tela pergunta “é phishing?”; o estado de cada item resulta de movimentação, investigação, dependências e ação final.

Filtros apenas reduzem ruído visual e nunca removem evidência ou alteram avaliação. A distribuição de itens legítimos, maliciosos e inconclusivos não é revelada no briefing nem durante a tentativa.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contexto, objetivo, privacidade, ausência de cronômetro e pacote sem distribuição revelada | Iniciar | Conteúdo e versão válidos | Início e pacote | Sem feedback de acerto | Título focado e resumo textual |
| Investigação inicial | Lote completo na Entrada | Examinar, filtrar e mover itens | Qualquer item pode ser revisitado | Destino provisório por item | Apenas confirmação operacional | Tabela e botões `Mover` |
| Decisão inicial | Ações provisórias e fontes disponíveis | Escolher prosseguir, verificar, conter ou reportar | Ações sensíveis exigem etapa de verificação | Ação provisória e fonte escolhida | Explica efeito simulado, não correção | `fieldset` por item |
| Consequência | Nova informação coerente com a fonte consultada | Atualizar fila ou manter pendência | Não revela gabarito; libera somente fato do cenário | Evidência consultada | Região de status factual | Texto linear equivalente |
| Revisão do lote | Resumo de filas, ações, evidências e pendências | Corrigir qualquer item | Só avança com todos os itens destinados | Revisões do rascunho | Avisos de incompletude | Lista por item com links internos |
| Decisão final | Estado final de cada item | Confirmar conclusão do lote | Validação semântica integral | Resposta bruta | Erro somente se contrato inválido | Resumo antes do envio |
| Transferência | Um item curto em outro canal | Reaplicar verificar/prosseguir/conter | Uma escolha e justificativa estruturada | Ação e evidência | Sem acerto antecipado | Artefato textual |
| Resultado | Nota, decomposição e controles | Consultar feedback e plano seguro | Tentativa válida concluída | Resultado derivado | Privado e sem culpa | Tabela de critérios |
| Debrief | Fatos, indícios, hipóteses, limites e resposta por item | Rever ou repetir | Repetição cria tentativa nova | Intenção de repetir | Explicação completa | Conteúdo em ordem linear |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa ou rascunho | Visão geral e botão iniciar | Progresso oficial Não iniciada | `h1` e descrição do formato |
| Em andamento | Pacote iniciado | Filas, investigação, revisão e saída segura | Pacote, filas, ações e evidências | Foco na etapa e progresso textual |
| Retomada | Rascunho compatível encontrado | Resumo do ponto salvo e continuar/recomeçar | Reidrata a mesma versão e pacote | Anúncio do ponto retomado |
| Revisão | Todos os itens receberam destino provisório | Resumo global editável | Mantém rascunho até conclusão | Cabeçalhos por fila e links para editar |
| Concluída | Tentativa válida persistida | Resultado, debrief, perfil e repetição | Progresso oficial Concluída | Foco no título do resultado |
| Repetição | Atividade já concluída | Preferência por pacote ainda não visto; sem nova recompensa | Nova tentativa, melhor e última separadas | Aviso explícito sobre pontos |
| Conteúdo indisponível | Pacote ou versão não publicados | Mensagem neutra e retorno ao hub | Não cria tentativa | `role="status"` e foco no erro |
| Resposta inválida | Campo ausente, ID extra ou etapa incoerente | Preserva rascunho e indica o item | Não persiste conclusão | `role="alert"` associado ao controle |
| Falha ao salvar | Persistência recusada | Tentar novamente ou exportar nenhum dado | Não concede recompensa | Alerta sem apagar escolhas |

Somente Não iniciada, Em andamento e Concluída são estados oficiais de progresso; os demais são subestados da experiência.

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Triagem e identificação inicial | 30 | Prioriza itens por impacto e incerteza sem usar sinal isolado | Classifica a maioria, com um excesso ou omissão reversível | Libera ação sensível ou trata aparência como certeza | Observar, Decidir |
| Ação final proporcional | 30 | Prossegue no legítimo, contém ameaça e preserva inconclusivo | Ação segura, porém excessiva ou incompleta | Clica, envia, paga, descarta evidência ou paralisa tudo | Decidir, Recuperar |
| Evidências e confirmação | 25 | Usa fonte pertinente e independente nos itens críticos | Consulta fonte útil, mas incompleta | Confirma pela mesma solicitação ou por aparência | Verificar |
| Falso positivo e incerteza | 15 | Não acusa legítimos e registra lacuna factual | Evita dano, mas reporta ou segura em excesso | Reporta tudo, ignora incerteza ou inventa certeza | Reportar, Orientar |

Os pesos somam 100. Nota e conclusão são independentes. A nota fica entre 0 e 100, e velocidade nunca participa.

### 9.1 Controles críticos

- nenhum item de alto impacto pode ser liberado sem confirmação independente quando exigida;
- ameaça confirmada deve ser contida e encaminhada, não apenas excluída;
- item inconclusivo não pode ser marcado como legítimo ou malicioso sem base;
- o funcionário não pode “resolver” o lote reportando todos os itens;
- toda decisão final precisa apontar uma evidência ou declarar explicitamente a lacuna.

`needsReview` é verdadeiro abaixo de 60 pontos ou quando qualquer controle crítico falha, ainda que a soma seja maior.

### 9.2 Resultado privado

O resultado mostra nota total, quatro parcelas, ações por item, evidências usadas, falsos positivos evitados, lacunas preservadas, competências observadas, `needsReview`, debrief e recompensa potencial. A equipe não recebe resposta bruta, item, nota, erro ou recomendação individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 70 pontos de Simulação, condicionados à versão executável. A reivindicação existente de `simulation:workday` permanece única.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** a versão 1 permanece legível, com seu avaliador e conteúdo; não será convertida para a nova semântica.
- **Integrações vigentes na demonstração:** hub de Simulações, percurso, Perfil, atividade recente, competências, conquistas e recomendações.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta implementado

O desenho semântico foi concretizado em `WorkdayTriageV2Submission`. Os nomes físicos abaixo seguem a implementação; campos editoriais que não são necessários à avaliação permanecem no pacote publicado, não na resposta do funcionário.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | `simulation:workday` | Sim | catálogo autoritativo | rejeitar divergência |
| `activityVersion` | `2` | Sim | catálogo autoritativo | não aceitar versão 1 neste contrato |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | seleção do servidor |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |
| `mechanicId` | `batch-triage` | Sim | conteúdo publicado | rejeitar outra mecânica |
| `itemDecisions` | lista de `itemId`, `queueId`, `actionId` e `inspectedEvidenceIds` | Sim | interação | todos os itens exatamente uma vez e sem IDs extras |
| `queueId` | `resolved` ou `inconclusive` | Sim por item | interação | rascunhos `inbox`/`investigate` não entram na conclusão |
| `actionId` | `proceed`, `verify`, `contain-report` ou `dismiss` | Sim por item | interação | opção allowlisted |
| `inspectedEvidenceIds` | IDs sem duplicatas | Sim por item | interação | subconjunto do item publicado |
| `transferActionId` | ação allowlisted | Sim | transferência | avaliada com a evidência |
| `transferEvidenceId` | evidência allowlisted | Sim | transferência | fonte independente esperada conforme o pacote |

Nota, bônus, competências, feedback e `needsReview` são derivados pelo avaliador autoritativo.

### 11.1 Invariantes

- IDs e opções pertencem à versão e ao pacote publicados;
- cada item aparece exatamente uma vez na decisão final;
- listas rejeitam duplicatas e valores extras;
- item em `Inconclusivos` não pode declarar certeza final;
- ação sensível não pode coexistir com confirmação ausente quando o caso a exige;
- replay do mesmo `attemptId` é `no-op`;
- nova tentativa não duplica recompensa;
- conteúdo, contrato e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

O rascunho permanece somente na sessão do componente e não sobrevive a recarga. A tentativa concluída guarda resposta bruta e resultado derivado no envelope local não autoritativo. A versão 1 continua com sua forma original e não recebe campos retroativos.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção, exclusão e expiração de rascunhos. A seleção do pacote deve ocorrer no servidor e não revelar antecipadamente sua composição.

### Compatibilidade

- a nova semântica exige `activityVersion` sucessora;
- a ampliação da união persistida resultou em `APP_SCHEMA_VERSION: 13` e envelope `mvp-local-v13`;
- tentativas da versão 1 permanecem legíveis e imutáveis;
- migrações preservam progresso, pontos, recompensa reivindicada, preferências e evidências;
- rascunho de versão indisponível não é reinterpretado;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | No dispositivo, não autoritativa | Própria tentativa | Nunca | Somente política autorizada e minimizada |
| Nota e feedback | Melhor e última tentativa | Privados | Nunca | Preferir agregado, não resposta individual |
| Competências | Evidência derivada | Privadas | Cobertura agregada | Agregado com limiar |
| Recompensa | Chave e valor derivados | Visível ao titular | Nunca | Auditoria de concessão |
| Agregado | Reivindicação mínima, se elegível | Resumo próprio | Métrica sem escolhas | Somente coorte autorizada |

Mensagens, identidades, endereços, pedidos e registros são fictícios ou mascarados. O player não abre link, envia mensagem, chama contato, altera cadastro, realiza pagamento ou produz reporte real. Não se coleta credencial, OTP, segredo, dado pessoal ou conteúdo da caixa real.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente após cada transição;
- filas expostas por cabeçalhos, contagem textual e lista, sem depender de posição ou cor;
- operação integral por teclado;
- seletor nativo de destino com `Entrada`, `Investigar`, `Inconclusivos` e `Resolvidos`;
- resumo global em lista, com botão textual para editar cada item;
- `fieldset` e `legend` para ações e evidências relacionadas;
- resumo linear equivalente à visão em colunas;
- feedback e erro em regiões apropriadas sem apagar contexto;
- contraste, texto ampliado e movimento reduzido;
- nenhuma animação obrigatória ou limite de tempo;
- linguagem sem culpa;
- desktop neste blueprint; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e artefatos sintéticos atuais | Implementado em três pacotes allowlisted | Concluído na demonstração |
| Interface | Shell de Simulação, briefing e resultado | Fila inconclusiva e revisão global implementadas | Sem filtros no corte atual |
| Contrato e avaliador | Padrões de validação e resultado | Contrato por itens, controles e pacote implementados | Validar → avaliar → persistir |
| Estado e provider | Tentativas e progresso compartilhados | Ação v2 e provider implementados | Rascunho permanece em sessão |
| Persistência | Envelope e migrações existentes | União v2 e migração v12→v13 implementadas | Backend ainda obrigatório |
| Integrações | Perfil, histórico e recompensa | Seletores adaptados sem duplicidade | Registro único publicado |
| Testes | Testes de regras e renderização | Node, SSR e Playwright implementados | Retomada persistida continua futura |

Esforço relativo: **G**, combinando P0, família P1 de triagem e P2 para retomada/pacotes. Não é cronograma.

### 15.1 Riscos específicos e mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| A própria interface reproduzir sobrecarga excessiva | Acessibilidade e decisão ficam piores que o conteúdo | Limitar itens, usar contagens e visão linear; avaliar filtros em versão futura |
| Revelar a composição do lote | A pessoa resolve por contagem, não por processo | Não informar quantos itens são legítimos, maliciosos ou inconclusivos |
| Estratégia de reportar tudo | Boa nota aparente com comportamento improdutivo | Controle crítico e casos legítimos difíceis |
| Reinterpretar a versão 1 | Histórico e recompensa ficam inconsistentes | Versão sucessora, avaliador próprio e reivindicação única preservada |
| Rascunho expor conteúdo excessivo | Amplia dado local sem necessidade | Persistir somente IDs publicados e expirar rascunho por política |

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote e opções por allowlist;
- ausência de revelação da distribuição do pacote no briefing;
- avaliador integral, parcial, inseguro, legítimo, malicioso e inconclusivo;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- todos os itens exatamente uma vez e listas sem duplicatas;
- tentativa duplicada e repetição com nova tentativa;
- recompensa, evidência e eventual contribuição idempotentes entre versões;
- persistência da tentativa concluída, migração e quarentena;
- privacidade de qualquer agregado;
- Perfil, atividade recente e recomendação;
- rota própria preservada sem cair silenciosamente no hub;
- fila, seletor de destino, teclado, foco e revisão linear em navegador.

### Manuais no desktop

- os três pacotes completos, revisão e repetição;
- itens legítimos urgentes não são tratados automaticamente como ameaça;
- pendência pode permanecer inconclusiva e ser retomada;
- nenhum feedback de correção aparece antes do resultado;
- teclado, leitor de tela, foco, anúncios e ordem linear;
- alto contraste, texto ampliado e movimento reduzido;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:influence-scarcity` | Banco de casos | Caso que não trate escassez como prova isolada | A primeira versão já cobre sobrecarga e ambiguidade |
| `concept:influence-fear` | Banco de casos | Linguagem segura e revisão para evitar gatilho desnecessário | Exige curadoria própria |
| `concept:influence-reward` | Banco de casos | Contraste legítimo e malicioso equivalente | Evita ensinar que benefício é sempre fraude |
| `concept:influence-current-event` | Banco de casos | Processo editorial rápido e validade temporal | Conteúdo envelhece e exige revisão frequente |
| `concept:phishing-mass` | Banco de casos | Pacote com contexto suficiente para decisão proporcional | Não deve virar sinônimo de mensagem genérica |
| `concept:identity-external-marker` | Banco de casos | Casos legítimos externos e ameaça interna simulada | O marcador isolado produz falso positivo |
| `concept:malicious-unsubscribe` | Banco de casos | Destino inerte e alternativa segura de tratamento | Não haverá navegação real |
| `concept:calendar-invite` | Banco de casos | Artefato acessível e canal representado sem integração | Precisa de modelo próprio de convite |
| `concept:prize-sweepstakes` | Banco de casos | Público e linguagem aprovados | Baixa prioridade frente ao contexto de trabalho |
| `concept:delivery-fee` | Banco de casos | Regionalização e contraste legítimo | Depende de contexto pessoal sem coletar dado pessoal |

O debrief da primeira versão cobre apenas os quatro conceitos ativos e o limite de certeza. O banco não gera novos objetivos, pontos ou recompensas.

## 18. Gates de publicação atendidos e pendências

Os pacotes, casos, pesos e controles foram aprovados e publicados na demonstração em 2026-08-16.

- três pacotes publicados com 7, 5 e 6 itens;
- versão 2, rota e `activityId` históricos preservados;
- corte de revisão 60 e pesos 30/30/25/15 implementados;
- recompensa e contribuição compatíveis entre v1 e v2;
- rascunho persistido e retomada após recarga continuam futuros;
- backend autoritativo, procedimentos corporativos e validação móvel continuam fora deste corte.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Triagem em lote, três pacotes e contrato semântico propostos | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
| 2026-08-16 | Versão 2 publicada com triagem, três pacotes, revisão global e feedback por item | Implementada e validada | Novo contrato, player, registro e testes |
| 2026-08-16 | `LearningAttempt` ampliada e esquema local elevado de v12 para v13 | Implementada e validada | Migração preserva o estado e não reabre recompensa |
