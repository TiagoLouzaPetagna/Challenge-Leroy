# Pedido urgente de um gestor

> **Atualização do portal (2026-09-20):** piloto simples v2 disponível em `/missoes/pedido-urgente-do-gestor`, com um caso curto e quatro decisões: identificar o atalho, confirmar por contato conhecido, manter a segunda aprovação e encaminhar a ausência do aprovador. O comportamento central — preservar a segunda aprovação diante de urgência e autoridade alegada — foi mantido. Os percursos adicionais e a mecânica mais extensa descritos abaixo ainda não foram convertidos; os trechos de estado histórico deste blueprint referem-se ao desenho anterior ao piloto.

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** existe um card planejado no catálogo; não há player, versão executável nem rota funcional comprovada para esta atividade.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Preservar o processo diante de autoridade e urgência |
| Mecânica-base aprovada | Conversa curta + estação de autoridade, alçada e aprovação |
| Estado da atividade atual | Planejada no catálogo; indisponível como atividade própria |
| Relação com implementação existente | Atividade nova; pode reutilizar padrões de conversa e processo |
| `activityId`, versão e rota | O catálogo contém o identificador candidato `mission:urgent-manager-request`; isso não define versão executável nem rota da atividade-alvo |
| Duração-alvo | 9–12 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada pelo blueprint |
| Conceitos proprietários | 8; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três percursos alternativos que dividem urgência, sigilo e exceção de processo;
- consulta a alçada, confirmação independente, resposta profissional e registro de exceção;
- uso explícito do modelo PARE, sem recompensa separada;
- avaliação, estados, conteúdo fictício, acessibilidade e limites de integração.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão e rota executáveis;
- redação canônica final do acrônimo PARE;
- processo corporativo, matriz de alçada e fontes publicadas;
- ordem de implementação, pontos e integrações reais.

## 2. Contrato educacional

- **Comportamento observável:** pausar pedido de impacto, consultar autoridade/alçada, reconfirmar por contato independente e seguir ou registrar o processo aplicável.
- **Técnicas ou objetivos do atacante:** personificar liderança, explorar autoridade, urgência, sigilo e exceção para contornar aprovação.
- **Atalho inseguro enfrentado:** obedecer ao cargo alegado ou tratar confidencialidade como proibição de consultar pessoas autorizadas.
- **Resposta segura generalizável:** preservar respeito e confidencialidade enquanto verifica identidade, alçada, necessidade e segunda aprovação.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente ou legitimidade de pedidos reais fora do pacote.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:influence-authority` | Núcleo | Primeira versão | Confronta cargo alegado com alçada, registro e resposta profissional | P1, P2 e P3 |
| `concept:ceo-fraud` | Núcleo | Primeira versão | Representa falso gestor sem transformar nome ou cargo em autenticação | P1, P2 e P3 |
| `concept:influence-urgency` | Complementar | Primeira versão | Separa prioridade operacional de necessidade de verificação | P1 e P3 |
| `concept:influence-secrecy` | Complementar | Primeira versão | Diferencia confidencialidade legítima de isolamento indevido | P2 e P3 |
| `concept:process-exception` | Complementar | Primeira versão | Registra motivo, risco, autoridade e medida temporária | P1 e P2 |
| `concept:pare-model` | Transversal com proprietário | Primeira versão | Ensina a sequência PARE vigente durante decisões do caso | Todos os percursos |
| `concept:gift-card-procurement` | Variação de caso | Banco de casos | Leva compra e códigos fictícios ao fluxo de procurement e rastreabilidade | Banco versionado |
| `concept:whaling` | Transferência | Banco de casos | Transfere o limite profissional para pedido dirigido à alta liderança | Banco versionado |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Fornecedor hoje | Gestor pede exceção urgente para fornecedor | Preservar alçada e confirmação | Urgência; exceção de processo | Pedido urgente muda de chat para e-mail | Malicioso provável |
| P2 — Projeto confidencial | Suposta liderança pede aquisição sigilosa | Consultar somente autorizados e registrar exceção | Sigilo; exceção de processo | Pedido equivalente em ferramenta de projeto | Inconclusivo ou malicioso |
| P3 — É urgente e é legítimo | Gestor real faz pedido urgente e confidencial | Completar verificação e processo sem rejeição automática | Urgência; sigilo | Nova solicitação legítima por outro canal | Legítimo após confirmação |

PARE é o apoio transversal do comportamento e não um terceiro complementar. Nenhum pacote do banco entra na primeira versão.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Fornecedor hoje

| Elemento | Definição |
|---|---|
| Situação inicial | Mensagem de suposto gestor pede inclusão imediata de fornecedor e dispensa da segunda aprovação. |
| Canal e artefatos | Conversa textual, matriz de alçada, cadastro e mesa de exceção fictícios. |
| Identidade ou pretexto | Gestor conhecido em conta plausível, alegando risco de paralisação. |
| Objetivo do atacante ou hipótese legítima | Inserir fornecedor ou destino sem controle. |
| Pressões e aparências | Cargo, prazo “hoje” e responsabilidade atribuída ao funcionário. |
| Evidências disponíveis | Alçada, procedimento, histórico, diretório e ausência de registro. |
| Evidência decisiva ou limite de certeza | O atalho pedido contraria o processo; a identidade ainda precisa de confirmação. |
| Confirmação independente | Contato do gestor no diretório e aprovador secundário fictícios. |
| Ação segura | Pausar, reconfirmar, manter alçada e registrar exceção somente se autorizada. |
| Reporte ou recuperação | Reportar personificação se negada; se legítima, concluir pelo fluxo auditável. |
| Transferência curta | Pedido por e-mail testa a mesma pausa sem repetir toda a estação. |
| Debrief | Urgência muda prioridade, não quem pode autorizar. |
| Conteúdo fictício necessário | 5–7 mensagens, matriz, cadastro, diretório e formulário cenográfico. |

### Percurso P2 — Projeto confidencial

| Elemento | Definição |
|---|---|
| Situação inicial | Uma liderança solicita aquisição fora do processo e proíbe contato com a equipe por confidencialidade. |
| Canal e artefatos | Chat, classificação de informação, diretório de pessoas autorizadas e registro de exceção simulados. |
| Identidade ou pretexto | Projeto sensível e suposta autorização executiva. |
| Objetivo do atacante ou hipótese legítima | Isolar a pessoa e evitar aprovação independente; a legitimidade inicial é inconclusiva. |
| Pressões e aparências | Sigilo, autoridade e receio de “vazar” o projeto. |
| Evidências disponíveis | Política de necessidade de conhecer, alçada e canal confidencial autorizado. |
| Evidência decisiva ou limite de certeza | Confidencialidade legítima permite consulta a pessoas autorizadas; não autoriza atalho. |
| Confirmação independente | Assessoria ou aprovador listado na fonte fictícia, sem usar contato fornecido na conversa. |
| Ação segura | Responder de forma discreta, suspender execução e obter validação/registro. |
| Reporte ou recuperação | Reportar se a identidade ou justificativa falhar; preservar o mínimo necessário. |
| Transferência curta | O mesmo pedido aparece em ferramenta de projeto com menos pressão explícita. |
| Debrief | Sigilo regula com quem falar, não elimina controles. |
| Conteúdo fictício necessário | 6 mensagens, política, diretório restrito e mesa de exceção. |

### Percurso P3 — É urgente e é legítimo

| Elemento | Definição |
|---|---|
| Situação inicial | Gestor real solicita priorização confidencial dentro de uma contingência documentada. |
| Canal e artefatos | Mensagem, incidente operacional, matriz de alçada e resposta oficial fictícios. |
| Identidade ou pretexto | Liderança legítima; o pedido inicial ainda precisa de confirmação. |
| Objetivo do atacante ou hipótese legítima | Pedido legítimo com urgência real. |
| Pressões e aparências | Prazo curto, confidencialidade proporcional e impacto operacional. |
| Evidências disponíveis | Registro de contingência, diretório, aprovador e procedimento abreviado autorizado. |
| Evidência decisiva ou limite de certeza | A confirmação independente e a alçada tornam o caminho legítimo. |
| Confirmação independente | Canal cadastrado e segundo aprovador. |
| Ação segura | Prosseguir pelo procedimento de contingência, registrando decisão e prazo. |
| Reporte ou recuperação | Sem incidente de segurança; manter registro operacional. |
| Transferência curta | Outro pedido legítimo exige reconhecer que verificar não significa bloquear. |
| Debrief | Processo seguro deve permitir trabalho legítimo, inclusive sob pressão. |
| Conteúdo fictício necessário | 4–6 mensagens, contingência, alçada e registro de aprovação. |

Nenhum contato, fornecedor, compra, pagamento, aprovação ou registro é real.

## 6. Mecânica e diferenciação

- **Interação central:** ler a conversa, percorrer PARE e operar uma estação que relaciona identidade alegada, alçada, fonte de confirmação, exceção e resposta profissional.
- **Por que combina com o comportamento:** a pressão só é neutralizada quando a pessoa transforma autoridade em verificações e registros observáveis.
- **Como se distingue das outras 21 atividades:** avalia autoridade social e preservação de processo; a Simulação de pagamento avalia obrigação, beneficiário e reconciliação financeira.
- **O que é reutilizável:** conversa, fontes progressivas, estação de processo de Equipes, cartões de decisão, resultado e debrief.
- **O que exige componente novo:** matriz interativa de autoridade/alçada, registro de exceção e construtor de resposta profissional.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabelas, seletores, botões de ordenação e resumo linear do processo.
- **Risco de virar questionário disfarçado e prevenção:** fontes e decisões formam um processo; a pessoa precisa justificar confirmação e alçada, inclusive num caso legítimo.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Papel, impacto e PARE vigente | Iniciar pacote | Pacote publicado | `casePackageId` | Situação, não aula extensa | Foco no título |
| Investigação | Pedido, alçada e fontes | Marcar alegação, impacto e fonte | Fontes opcionais, avaliação obrigatória | avaliação e fontes | Separa cargo de autorização | Tabela |
| Decisão inicial | Opções de seguir, pausar ou rejeitar | Escolher e justificar | Decisão registrada | decisão inicial | Consequência limitada | `fieldset` |
| Consequência | Resposta do gestor/fonte | Consultar alçada e exceção | Conteúdo determinístico | fontes e reação | Mostra efeito no processo | Região de status |
| Revisão | Estação completa | Alterar decisão e registro | Livre antes do envio | rascunho revisado | Sem penalidade | Foco previsível |
| Decisão final | Confirmação, resposta e reporte | Montar sequência final | Controles completos | rota, processo, resposta | Validação específica | Resumo de erros |
| Transferência | Pedido curto em outro canal | Aplicar PARE e escolher confirmação | Resposta mínima | transferência | Feedback posterior | Texto |
| Resultado | Nota privada | Rever ou concluir | Avaliação válida | resultado | Decomposição e recomendação | Resumo |
| Debrief | Evidências e fronteiras | Ler e retornar | Sem nova nota | visualização opcional | Caso legítimo não premia obediência automática | Texto |

Velocidade não pontua e a decisão permanece revisável até a conclusão.

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa | Briefing e início | Estado objetivo | Foco no `h1` |
| Em andamento | Pacote ativo | Conversa, fontes e estação | Rascunho mínimo se aprovado | Progresso anunciado |
| Retomada | Rascunho compatível | Resumo e continuar/reiniciar | Mesma versão/pacote | Contexto antes dos controles |
| Revisão | Processo inicial montado | Alterar livremente | Atualiza rascunho | Foco no item a revisar |
| Concluída | Resposta válida | Resultado/debrief privados | Tentativa imutável | Título do resultado |
| Repetição | Nova tentativa | Novo pacote, sem recompensa duplicada | Melhor/última separadas | Aviso explícito |
| Conteúdo indisponível | Versão/pacote não publicado | Explicação e retorno | Nenhuma tentativa | Alerta sem fallback |
| Resposta inválida | Campo ou relação inválida | Corrigir sem perder trabalho | Não conclui | Erros associados |
| Falha ao salvar | Persistência falhou | Repetir salvamento | Sem recompensa até confirmar | Alerta persistente |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Pausa e avaliação de impacto | 10 | Interrompe atalho e avalia impacto | Pausa sem avaliar impacto | Prossegue automaticamente | decisão sob pressão |
| Autoridade e alçada | 20 | Distingue cargo, identidade e permissão | Consulta incompleta | Cargo alegado basta | processo seguro |
| Confirmação independente | 25 | Usa fonte cadastrada fora da conversa | Rota oficial com pequena lacuna | Usa contato fornecido no pedido | verificação segura |
| Processo, exceção e aprovação | 25 | Preserva fluxo ou registra exceção completa | Omite registro não crítico | Contorna alçada/segunda aprovação | governança |
| Resposta e escalonamento | 20 | Resposta profissional, mínima e proporcional | Tom/registro incompleto | Obedece, acusa ou expõe informação | comunicação segura |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa cargo alegado, autoridade confirmada, incerteza e processo seguro;
- urgência, sigilo ou autoridade isolados não valem como veredito;
- velocidade não é pontuada;
- caso legítimo não premia obediência automática a processo incompleto.

### 9.1 Controles críticos

- confirmar por fonte independente;
- não contornar alçada ou segunda aprovação;
- registrar exceção legítima com autoridade, motivo e medida temporária;
- reportar personificação quando confirmada ou suficientemente indicada.

### 9.2 Resultado privado

O resultado apresenta nota, decisões PARE, fontes, alçada, registro, resposta, controles críticos, feedback, competências e recompensa potencial. A equipe não vê resposta individual; gestão recebe apenas agregado permitido.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, sujeita à aprovação executável.
- **Bônus:** somente regra transversal; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição não duplica.
- **Versões anteriores:** não há versão executável desta atividade a reinterpretar; o card planejado não gera recompensa.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | local/servidor | idempotente |
| `activityId` | ID publicado | Sim | catálogo autoritativo | ainda não decidido para execução |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | não confiar no cliente |
| `completedAt` | data válida | Sim | servidor no uso real | sem velocidade |
| `requestAssessmentId` | opção publicada | Sim | interação | impacto e legitimidade provisória |
| `consultedSourceIds` | IDs de fontes | Sim | interação | sem duplicatas |
| `authorityFindingId` | opção publicada | Sim | interação | cargo não implica alçada |
| `confirmationRouteId` | rota fictícia | Sim | interação | independente |
| `processDecisionId` | ação de processo | Sim | interação | inclui exceção quando aplicável |
| `exceptionRecordFieldIds` | blocos allowlisted | Condicional | interação | pacote legítimo/contingência |
| `responseBlockIds` | lista ordenada | Sim | interação | profissional e mínima |
| `reportDetailIds` | lista fechada | Condicional | interação | sem dados sensíveis |
| `transferDecisionId` | opção publicada | Sim | transferência | mesmo comportamento |

Nota e resultados são derivados pelo avaliador autoritativo.

### 11.1 Invariantes

- todos os IDs pertencem ao pacote publicado;
- fontes e blocos não se repetem;
- exceção só é válida com autoridade e justificativa allowlisted;
- etapas críticas não podem ser omitidas;
- replay do mesmo `attemptId` é no-op;
- tentativa nova não duplica recompensa.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Registrar pacote, rascunho mínimo, IDs de fontes/decisões, resultado e progresso como `isAuthoritative: false`. Não registrar nomes ou pedidos reais.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Procedimentos e matrizes exigem publicação versionada e autorizada.

### Compatibilidade

- a criação exige versão própria;
- o ID candidato de catálogo não comprova compatibilidade;
- mudança persistida exige análise de `APP_SCHEMA_VERSION`;
- migrações preservam todo histórico existente;
- dados inválidos seguem para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios mínimos | Própria | Não | Não; auditoria restrita |
| Nota e feedback | Derivados | Completos | Não | Agregado |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Chave/valor demonstrativos | Própria | Não | Total autorizado |
| Agregado | Sem resposta individual | Contexto coletivo | Contagens/tendências | Contagens/tendências |

É proibido inserir gestor, fornecedor, telefone, dado, compra, pagamento, credencial, OTP, contato ou reporte real. O player não afirma que obteve aprovação ou registrou exceção corporativa.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- tabela de autoridade/alçada legível por leitor de tela;
- `fieldset`, `legend`, controles por teclado e ordem linear equivalente;
- botões de ordenação em vez de depender de arrastar;
- feedback e erros anunciados sem apagar contexto;
- contraste, texto ampliado, movimento reduzido e sem limite de tempo;
- linguagem profissional e sem culpa;
- desktop; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e fontes de processo atuais | Três pacotes, alçada e exceção | P0 + aprovação editorial |
| Interface | Conversa, fontes e resultado | Estação de autoridade/alçada | P1 |
| Contrato e avaliador | Primitivas determinísticas | Relações de alçada/exceção e PARE | P0/P1 |
| Estado e provider | Fluxo de atividade | Nova atividade e rascunho | Registro P0 |
| Persistência | Envelope atual | Nova forma de tentativa | Análise de esquema |
| Integrações | Hub/Perfil | Registro e recomendações | Backend |
| Testes | Regras e navegador atuais | Fontes, alçada, legítimo e acessibilidade | Harness P0 |

**Esforço relativo:** G. **Posição provável:** P0 e estação reutilizável P1.

## 16. Testes e critérios de aceite

### Automatizados

- ID/versão/pacote/fontes/opções por allowlist;
- avaliador integral, parcial, inseguro, legítimo, inconclusivo e inválido;
- pesos 100, nota limitada e controles críticos;
- idempotência, repetição, recompensa, persistência e quarentena;
- privacidade do agregado e integrações;
- rota própria sem fallback;
- teclado, foco, tabela e ordenação acessível.

### Manuais no desktop

- os três percursos, inclusive pedido legítimo;
- revisão, retomada e repetição;
- PARE compreensível sem depender de cor;
- leitor de tela, contraste, texto ampliado e movimento reduzido;
- nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Cartão-presente e compra sigilosa | Banco de casos | Aprovar fluxo de procurement e conteúdo fictício não acionável | A primeira versão já distribui três combinações complementares |
| Whaling | Banco de casos e transferência própria | Aprovar cenário dirigido à liderança e rota de assessoria/alçada | Exige contexto e governança editorial específicos |

Não há conceito proprietário de versão futura ou debrief nesta atividade.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes, pesos, corte e controles críticos;
- harmonizar a redação canônica do PARE entre “Analise/Encaminhe” e “Avalie/Escale e responda” antes do conteúdo executável;
- decidir `activityId`, versão e rota, sem tratar o card atual como player;
- aprovar matriz de alçada, diretório, procedimento de exceção e respostas profissionais fictícias;
- decidir persistência de rascunho.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
