# Ele já sabia meus dados

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** atividade inexistente como player; não há identificador, versão ou rota definidos.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Tratar a personalização de um spear phishing — inclusive dados corretos e mídia convincente — como plausibilidade, não autenticação |
| Mecânica-base aprovada | Dossiê de fatos e inferências + narrativa em etapas |
| Estado da atividade atual | Inexistente como atividade executável |
| Relação com implementação existente | Atividade nova |
| `activityId`, versão e rota | Não definidos |
| Duração-alvo | 10–13 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada pelo blueprint |
| Conceitos proprietários | 16; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três percursos com personalização sintética, fontes incertas e caso legítimo/inconclusivo;
- classificação de fatos, inferências, autorização alegada e origem desconhecida;
- narrativa finita, verificação independente, minimização e reporte proporcional;
- exclusão de pesquisa real, mídia obrigatória e avaliação de “detecção de IA”.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão e rota;
- governança editorial de temas sensíveis, conteúdo sintético e fontes;
- persistência de rascunho, ordem, pontos e integração corporativa;
- requisitos de mídia para capacidades futuras.

## 2. Contrato educacional

- **Comportamento observável:** classificar o que o contato sabe, separar plausibilidade de autorização e verificar o pedido por rota independente antes de compartilhar, agir ou responder.
- **Técnicas ou objetivos do atacante:** spear phishing com OSINT, dados vazados, contexto profissional e personalização para simular confiança.
- **Atalho inseguro enfrentado:** assumir que detalhes corretos, tom convincente ou conhecimento interno autenticam identidade e permissão.
- **Resposta segura generalizável:** avaliar pedido e impacto, confirmar por processo conhecido e revelar somente o mínimo autorizado.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** origem real dos dados, vazamento confirmado, falsidade de mídia, retenção ou domínio permanente.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:spear-phishing` | Núcleo | Primeira versão | Organiza dossiê e pedido direcionado sem usar personalização como autenticação | P1, P2 e P3 |
| `concept:osint-personalization` | Complementar | Primeira versão | Representa pegada e organograma de persona fictícia, sem pesquisa real | P1, P2 e P3 |
| `concept:leaked-data` | Complementar | Primeira versão | Apresenta categorias de um incidente sintético previamente documentado como fato, sem atribuir cada detalhe ao incidente | P1 |
| `concept:influence-social-proof` | Variação de caso | Banco de casos | Confronta alegações de colegas com registro independente | Banco versionado |
| `concept:influence-empathy` | Variação de caso | Banco de casos | Preserva resposta acolhedora sem abrir exceção ou expor dado | Banco versionado |
| `concept:influence-commitment` | Variação de caso | Banco de casos | Permite interromper escalada gradual e inventariar concessões | Banco versionado |
| `concept:catfishing-honeytrap` | Variação de caso | Banco de casos | Oferece caso opcional com saída e apoio, sem investigar identidade | Banco versionado |
| `concept:ai-polished-text` | Variação de caso | Banco de casos | Varia fluência sem pontuar qualidade da escrita como sinal | Banco versionado |
| `concept:charity-disaster` | Transferência | Banco de casos | Transfere verificação a pedido de ajuda e organização fictícia | Banco versionado |
| `concept:synthetic-identity` | Variação de caso | Versão futura | Classifica peças verdadeiras/inferidas sem autenticar identidade civil | Versão futura |
| `concept:investment-pig-butchering` | Variação de caso | Versão futura | Audita promessa e risco após governança financeira | Versão futura |
| `concept:romance-financial-scam` | Variação de caso | Versão futura | Trabalha apoio e separação entre afeto e dinheiro | Versão futura |
| `concept:social-mining` | Variação de caso | Versão futura | Reduz detalhes desnecessários em publicações sintéticas | Versão futura |
| `concept:badge-photo-exposure` | Variação de caso | Versão futura | Mostra agregação de pequenas exposições sem foto real | Versão futura |
| `concept:deepfake-video` | Debrief ou limite técnico | Versão futura | Futuro debrief com mídia licenciada, sem avaliar detecção | Versão futura |
| `concept:voice-cloning` | Debrief ou limite técnico | Debrief | Explica em texto que semelhança vocal não substitui confirmação | Debrief |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Ele conhece o pedido | Contato cita detalhes públicos e categorias expostas em incidente sintético documentado | Separar conhecimento de autorização e verificar | OSINT/personalização; dados vazados | Pedido semelhante chega por chat | Malicioso provável |
| P2 — A agenda da diretoria | Suposto gestor conhece viagem, organograma e projeto | Não usar contexto público como autenticação | OSINT/personalização | Convite profissional personalizado | Inconclusivo ou malicioso |
| P3 — O contato era legítimo | Recrutador/parceiro real usa detalhes profissionais públicos, mas pede ação fora do canal | Verificar identidade, necessidade e autorização | OSINT/personalização | Solicitação legítima em outro canal | Legítimo após confirmação |

Cada tentativa recebe um percurso. Somente o P1 ativa dados vazados e inclui um incidente sintético previamente documentado como fato. Mesmo ali, o incidente comprova apenas as categorias expostas: não prova a origem de cada detalhe usado pelo contato.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Ele conhece o pedido

| Elemento | Definição |
|---|---|
| Situação inicial | Um contato cita número de pedido, produto e nome de responsável fictícios antes de solicitar alteração sensível; o dossiê inclui aviso oficial fictício de um incidente anterior que expôs categorias sintéticas determinadas. |
| Canal e artefatos | Mensagem textual, dossiê sintético, aviso de incidente previamente publicado no cenário, cadastro e diretório cenográficos. |
| Identidade ou pretexto | Representante de fornecedor conhecido. |
| Objetivo do atacante ou hipótese legítima | Explorar detalhes públicos e categorias que constam do incidente sintético documentado para ganhar credibilidade. |
| Pressões e aparências | Precisão, familiaridade e alegação de continuidade. |
| Evidências disponíveis | Dados do pedido, elementos públicos da persona, aviso oficial do incidente, categorias expostas, autorização ausente e contato cadastrado. |
| Evidência decisiva ou limite de certeza | O incidente e suas categorias são fatos do pacote; isso não prova que o contato obteve cada detalhe por esse incidente nem que controla a identidade alegada. |
| Confirmação independente | Contato cadastrado e registro oficial fictícios. |
| Ação segura | Pausar, reconfirmar e não compartilhar novos dados. |
| Reporte ou recuperação | Reportar personificação provável com categorias mínimas. |
| Transferência curta | Chat contém os mesmos detalhes e exige novamente verificação. |
| Debrief | Um atacante pode combinar fontes; mesmo um incidente documentado não autentica o contato nem permite atribuir causalidade a cada dado. |
| Conteúdo fictício necessário | 6–8 mensagens, dossiê de 8–10 cartões, aviso sintético de incidente, cadastro e diretório. |

### Percurso P2 — A agenda da diretoria

| Elemento | Definição |
|---|---|
| Situação inicial | Suposto membro da diretoria menciona viagem, projeto e nomes do organograma para solicitar preparação de acesso. |
| Canal e artefatos | E-mail textual, organograma e agenda inteiramente sintéticos, matriz de autorização. |
| Identidade ou pretexto | Liderança de outra área. |
| Objetivo do atacante ou hipótese legítima | Usar contexto público para obter ação; o caso permanece inconclusivo até a verificação. |
| Pressões e aparências | Status, conhecimento interno e antecipação de reunião. |
| Evidências disponíveis | Origem possível de cada detalhe, ausência de chamado e rota oficial. |
| Evidência decisiva ou limite de certeza | Agenda/organograma explicam plausibilidade, não autorização. |
| Confirmação independente | Assessoria ou chamado oficial fictício. |
| Ação segura | Não preparar acesso nem fornecer detalhes; verificar necessidade e alçada. |
| Reporte ou recuperação | Reportar se a fonte oficial negar o pedido; caso contrário seguir o processo. |
| Transferência curta | Convite profissional personalizado exige a mesma separação. |
| Debrief | Personalização pode ser legítima; o controle de falsos positivos é a confirmação, não a rejeição automática. |
| Conteúdo fictício necessário | 5–7 mensagens, dossiê, organograma, agenda e fonte oficial. |

### Percurso P3 — O contato era legítimo

| Elemento | Definição |
|---|---|
| Situação inicial | Recrutador ou parceiro legítimo usa detalhes profissionais públicos de uma persona e pede continuação em canal não previsto. |
| Canal e artefatos | Mensagem, histórico, portal e diretório fictícios. |
| Identidade ou pretexto | Contato legítimo, inicialmente não autenticado. |
| Objetivo do atacante ou hipótese legítima | Processo legítimo com pedido incompleto ou mal encaminhado. |
| Pressões e aparências | Cortesia, detalhamento e receio de atrasar oportunidade. |
| Evidências disponíveis | Página profissional inteiramente sintética, histórico oficial, contato cadastrado e limites de divulgação; não há incidente documentado neste pacote. |
| Evidência decisiva ou limite de certeza | A confirmação oficial resolve identidade e necessidade; detalhes públicos continuam sem valor de autenticação por si só. |
| Confirmação independente | Portal ou contato cadastrado. |
| Ação segura | Confirmar e responder somente com informação autorizada pelo canal oficial. |
| Reporte ou recuperação | Sem incidente quando o processo é confirmado; registrar atividade comum. |
| Transferência curta | Solicitação legítima personalizada muda de canal e exige a mesma verificação. |
| Debrief | Verificação protege o trabalho legítimo e impede que informação pública seja confundida com autoridade; este pacote não ensina nem presume vazamento. |
| Conteúdo fictício necessário | 5 mensagens, dossiê, portal e matriz de divulgação. |

Não há pesquisa, perfil, nome, imagem, mídia, dado vazado ou contato real.

## 6. Mecânica e diferenciação

- **Interação central:** classificar cartões do dossiê como fato, inferência, autorização alegada ou origem desconhecida e responder a uma narrativa finita antes de escolher rota e dados mínimos.
- **Por que combina com o comportamento:** torna explícita a diferença entre “sabe algo verdadeiro” e “pode pedir/receber isto”.
- **Como se distingue das outras 21 atividades:** é proprietária da personalização e do dossiê; Pedido urgente de um gestor é proprietária de autoridade/alçada e O pedido não tinha link do pretexto/necessidade.
- **O que é reutilizável:** conversa, seletores de evidência, tabelas de relação, diretório, shell, resultado e debrief.
- **O que exige componente novo:** classificador de dossiê, narrativa em estágios e controles de sensibilidade/minimização.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela cartão–classe com seletores; todo conteúdo tem texto equivalente e não exige voz/vídeo.
- **Risco de virar questionário disfarçado e prevenção:** o dossiê evolui e precisa ser relacionado a autorização e ação; não há pergunta “isso veio de OSINT ou vazamento?”.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contexto e aviso de dados sintéticos | Iniciar pacote | Pacote publicado | `casePackageId` | Objetivo curto | Foco no título |
| Investigação | Dossiê e primeira mensagem | Classificar cartões e pedido | Todos os cartões avaliados | classificações | Origem pode ser desconhecida | Tabela |
| Decisão inicial | Prosseguir, verificar ou interromper | Escolher e justificar | Decisão registrada | decisão inicial | Consequência limitada | `fieldset` |
| Consequência | Novo detalhe ou pressão | Reavaliar sem tratá-lo como autenticação | Turno determinístico | decisões por estágio | Mostra plausibilidade versus autoridade | Status |
| Revisão | Dossiê completo | Alterar classificações/decisão | Livre antes do final | rascunho | Sem penalidade | Foco previsível |
| Decisão final | Fontes, resposta e reporte | Verificar e minimizar | Controles completos | rota, blocos e relato | Erros específicos | Resumo |
| Transferência | Pedido curto em outro canal | Reaplicar distinção | Resposta mínima | transferência | Feedback posterior | Texto |
| Resultado | Nota privada | Rever/concluir | Avaliação válida | resultado | Decomposição | Resumo |
| Debrief | Fontes possíveis e limites de mídia | Ler/retornar | Sem nota | visualização opcional | Não diagnostica vazamento/IA | Texto |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa | Briefing/início | Estado objetivo | Foco no `h1` |
| Em andamento | Pacote ativo | Dossiê e narrativa | Rascunho se aprovado | Turnos anunciados |
| Retomada | Rascunho compatível | Resumo/continuar/reiniciar | Mesma versão/pacote | Contexto antes dos controles |
| Revisão | Dossiê completo | Alterar livremente | Atualiza rascunho | Foco no item |
| Concluída | Resposta válida | Resultado/debrief | Tentativa imutável | Título focado |
| Repetição | Nova tentativa | Novo pacote sem pontos duplicados | Melhor/última | Aviso explícito |
| Conteúdo indisponível | Pacote/versão ausente | Explicação/retorno | Nenhuma tentativa | Alerta |
| Resposta inválida | Campo/turno inválido | Corrigir mantendo contexto | Não conclui | Erros associados |
| Falha ao salvar | Persistência falhou | Tentar novamente | Sem recompensa até confirmar | Alerta persistente |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Fato, inferência e origem | 20 | Classificação calibrada e aceita desconhecido | Pequena superafirmação | Atribui origem sem base | análise de evidências |
| Dados corretos não autenticam | 20 | Mantém distinção em todos os turnos | Hesita, mas não concede | Usa detalhe correto como prova | identidade |
| Pedido, impacto e processo | 20 | Identifica necessidade, autorização e risco | Uma dimensão incompleta | Avalia apenas a pessoa | processo seguro |
| Verificação independente | 25 | Usa rota cadastrada adequada | Rota oficial com lacuna | Usa contato fornecido | verificação segura |
| Minimização, resposta e reporte | 15 | Resposta mínima/profissional e relato proporcional | Detalhe útil ausente | Compartilha dado excessivo ou omite caso crítico | comunicação/reporte |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa fato, inferência, origem desconhecida e processo seguro;
- dado correto, fluência ou mídia convincente isolados não valem como autenticação;
- velocidade não é pontuada;
- caso legítimo não premia resposta antes de verificar necessidade e autorização.

### 9.1 Controles críticos

- não usar dados corretos como prova de identidade ou autorização;
- confirmar por rota independente;
- não fornecer dado adicional para “provar” contexto;
- reportar spear phishing de impacto quando indicado.

### 9.2 Resultado privado

O funcionário vê nota, classificações, decisões por estágio, rota, minimização, controles, feedback, competências e recompensa potencial. O resultado não atribui origem a vazamento/OSINT. Agregados não expõem dado, narrativa ou resposta individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, sujeita à aprovação executável.
- **Bônus:** regra transversal; sem velocidade.
- **Idempotência:** primeira recompensa válida; repetição não duplica.
- **Versões anteriores:** não há versão executável a reinterpretar.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | local/servidor | idempotente |
| `activityId` | ID publicado | Sim | catálogo | não definido |
| `activityVersion` | versão publicada | Sim | catálogo | não definida |
| `casePackageId` | pacote allowlisted | Sim | conteúdo | servidor valida |
| `completedAt` | data válida | Sim | servidor real | sem velocidade |
| `classifiedDossierItems` | pares item–classe allowlisted | Sim | interação | cada item uma vez |
| `authorizationAssessmentId` | opção publicada | Sim | interação | separada da plausibilidade |
| `stageDecisionIds` | uma decisão por estágio | Sim | interação | turnos apresentados |
| `verificationRouteId` | rota fictícia | Sim | interação | independente |
| `responseBlockIds` | blocos allowlisted | Sim | interação | minimizados |
| `reportDetailIds` | blocos fechados | Condicional | interação | sem dado sensível |
| `transferDecisionId` | opção publicada | Sim | transferência | mesmo comportamento |

Origem real dos dados, nota e feedback são derivados ou permanecem indeterminados; o cliente não os declara.

### 11.1 Invariantes

- IDs/turnos/classes pertencem ao pacote;
- cada item classificado uma vez;
- listas sem duplicatas/extras;
- etapas obrigatórias presentes;
- replay é no-op e nova tentativa não duplica recompensa;
- conteúdo/máquina/avaliador têm versões compatíveis.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Persistir apenas IDs de dados inteiramente sintéticos, rascunho mínimo, resultado e progresso como `isAuthoritative: false`. Proibir texto livre e importação de perfis.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Conteúdo sensível depende de governança e publicação autorizada.

### Compatibilidade

- nova atividade exige ID/versão publicados;
- forma persistida exige análise de `APP_SCHEMA_VERSION`;
- migrações preservam histórico, preferências, pontos e evidências;
- inválidos em quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs sintéticos mínimos | Própria | Não | Auditoria restrita |
| Nota e feedback | Derivados | Completos | Não | Agregado |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Demonstrativa | Própria | Não | Total permitido |
| Agregado | Sem dossiê/resposta | Contexto coletivo | Contagens/tendências | Contagens/tendências |

Não há nome, perfil, organograma, agenda, vazamento, voz, vídeo, imagem, telefone, conta ou pesquisa real. Nenhum texto sugere que a origem de um dado foi comprovada.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- dossiê em tabela semântica, não somente mural visual;
- seletores por item, `fieldset` e `legend`;
- operação por teclado e anúncios de turno sem roubo de foco;
- qualquer mídia futura exige transcrição/equivalente textual e não pode ser necessária para nota;
- contraste, texto ampliado, movimento reduzido, sem limite de tempo;
- linguagem sem culpa;
- desktop; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Conversas/evidências atuais | Três pacotes e dossiês sintéticos | P0 + governança |
| Interface | Chat, fontes e resultado | Classificador de dossiê/narrativa | P1/P2 |
| Contrato e avaliador | Infra determinística | Classes, turnos e minimização | P0/P2 |
| Estado e provider | Fluxo atual | Nova atividade/rascunho | Registro P0 |
| Persistência | Envelope | Nova resposta | Análise de esquema |
| Integrações | Hub/Perfil | Registro; sem OSINT real | Backend |
| Testes | Regras/navegador | Classificação, legítimo e privacidade | Harness P0 |

**Esforço relativo:** G. **Posição provável:** P0, classificador P1 e narrativa P2. Mídia permanece P3.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, itens, classes e turnos por allowlist;
- avaliador integral, parcial, inseguro, legítimo, inconclusivo e inválido;
- pesos 100, nota limitada e controles críticos;
- idempotência, persistência, quarentena e recompensa;
- agregado sem dossiê/resposta e integrações;
- rota própria sem fallback;
- teclado, foco e tabela equivalente.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- origem desconhecida aceita; caso legítimo não penalizado;
- leitor de tela, teclado, contraste, texto ampliado e movimento reduzido;
- nenhum dado, busca, voz, vídeo ou efeito real.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Prova social; empatia; compromisso gradual; catfishing; texto polido por IA | Banco de casos | Aprovar pacotes, avisos e controle de falsos positivos | Ampliam gatilhos e sensibilidade além da primeira versão |
| Caridade/desastre | Banco de casos e transferência própria | Aprovar organização/rota fictícia e linguagem acolhedora | Exige contexto humanitário específico |
| Identidade sintética; investimento; romance financeiro | Versões futuras | Governança jurídica, financeira e psicossocial | Alto risco e potencial de dano |
| Social mining; exposição por crachá/foto | Versões futuras | Conteúdo sintético e revisão de privacidade | Exigem oficina de exposição, não o pedido inicial |
| Deepfake de vídeo | Versão futura em debrief | Mídia licenciada, consentimento, legenda, transcrição e equivalente textual | Não se avalia detecção e a capacidade é P3 |
| Voz clonada | Debrief | Revisão técnica e texto equivalente | Semelhança vocal não é detectável com confiabilidade |

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes, dossiês e distribuição legítimo/malicioso/inconclusivo;
- aprovar classes, pesos, corte e controles críticos;
- definir `activityId`, versão e rota;
- aprovar governança de conteúdo sintético, linguagem e categorias de dados;
- decidir persistência de rascunho;
- confirmar que a primeira versão permanecerá textual, sem mídia e sem pesquisa real.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
