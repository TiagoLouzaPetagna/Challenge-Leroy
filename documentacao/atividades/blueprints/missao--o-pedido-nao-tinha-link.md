# O pedido não tinha link

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
| Comportamento principal aprovado | Validar identidade, necessidade e autorização antes de responder ou enviar dado |
| Mecânica-base aprovada | Painel alegação–fato–necessidade–autorização + resposta conversacional |
| Estado da atividade atual | Inexistente como atividade executável |
| Relação com implementação existente | Atividade nova |
| `activityId`, versão e rota | Não definidos |
| Duração-alvo | 9–12 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada pelo blueprint |
| Conceitos proprietários | 5; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três percursos sem dependência de link: callback, favor gradual e pedido legítimo/inconclusivo;
- painel de alegações e entrevista finita que verifica sem revelar informação;
- avaliação de necessidade, autorização, minimização, rota e reporte;
- conteúdo fechado e fictício, sem telefone, pagamento ou dado real.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão e rota;
- fontes corporativas, categorias de divulgação e procedimento publicado;
- persistência de rascunho, ordem, pontos e integrações.

## 2. Contrato educacional

- **Comportamento observável:** relacionar alegações a fatos, perguntar apenas o necessário, validar identidade/necessidade/autorização e responder com o mínimo permitido.
- **Técnicas ou objetivos do atacante:** construir pretexto sem link, explorar reciprocidade ou induzir callback para obter informação, ação ou pagamento.
- **Atalho inseguro enfrentado:** considerar ausência de link como ausência de risco, ajudar por cortesia ou usar o contato fornecido como confirmação.
- **Resposta segura generalizável:** verificar a necessidade pelo processo, usar fonte independente e minimizar divulgação mesmo quando o pedido parece plausível.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** identidade real do contato, intenção criminosa, retenção ou domínio permanente.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:pretexting` | Núcleo | Primeira versão | Relaciona alegações a evidências e conduz entrevista sem alimentar o pretexto | P1, P2 e P3 |
| `concept:influence-reciprocity` | Complementar | Primeira versão | Separa cortesia e ajuda anterior de permissão organizacional | P2 |
| `concept:callback-phishing` | Complementar | Primeira versão | Mostra que telefone fornecido no pedido não é fonte independente | P1 e P3 |
| `concept:job-recruitment-scam` | Variação de caso | Banco de casos | Cruza anúncio, carreira e RH fictícios antes de dado ou pagamento | Banco versionado |
| `concept:government-legal-payment` | Variação de caso | Banco de casos | Encerra ameaça, consulta órgão/jurídico fictício e verifica protocolo | Banco versionado |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Ligue para regularizar | Cobrança sem link oferece telefone de retorno | Validar necessidade e buscar rota independente | Callback phishing | Pedido equivalente chega por carta textual | Malicioso provável |
| P2 — Depois de tudo que ajudei | Contato começa com favor plausível e amplia o pedido | Separar reciprocidade de autorização | Reciprocidade | Favor semelhante em chat de projeto | Malicioso ou inconclusivo |
| P3 — O chamado sem atalho | Prestador legítimo pede informação por chat/formulário incompleto | Validar identidade, necessidade, autorização e mínimo | Callback phishing | Solicitação legítima por outro canal | Legítimo após confirmação |

Cada tentativa executa um pacote. A ausência de link é apenas característica do caso, nunca sinal de segurança.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Ligue para regularizar

| Elemento | Definição |
|---|---|
| Situação inicial | Uma cobrança fictícia informa pendência e fornece número para evitar interrupção de serviço. |
| Canal e artefatos | Mensagem textual, fatura representada, cadastro e diretório cenográficos. |
| Identidade ou pretexto | Prestador de serviço conhecido. |
| Objetivo do atacante ou hipótese legítima | Levar a ligação controlada pelo solicitante e obter dado ou pagamento. |
| Pressões e aparências | Consequência operacional e aparência documental plausível. |
| Evidências disponíveis | Cadastro, histórico, ausência de pendência no portal e origem do telefone. |
| Evidência decisiva ou limite de certeza | O número pertence ao próprio pedido e não confirma nada; a obrigação ainda precisa ser verificada. |
| Confirmação independente | Portal/diretório fictício já conhecido. |
| Ação segura | Não ligar para o número fornecido; consultar obrigação e contato oficial. |
| Reporte ou recuperação | Reportar se o prestador oficial negar a cobrança. |
| Transferência curta | Carta textual com número repete a busca independente. |
| Debrief | Um pedido pode ser phishing sem link; o ponto é quem controla a próxima rota. |
| Conteúdo fictício necessário | Mensagem, fatura inerte, cadastro, portal e diretório. |

### Percurso P2 — Depois de tudo que ajudei

| Elemento | Definição |
|---|---|
| Situação inicial | Um contato ajuda com informação simples e depois pede lista ou dado fora do escopo. |
| Canal e artefatos | Conversa textual, matriz de categorias e diretório fictício. |
| Identidade ou pretexto | Colega ou parceiro prestativo, ainda não autenticado para o pedido ampliado. |
| Objetivo do atacante ou hipótese legítima | Explorar obrigação social para obter informação. |
| Pressões e aparências | Cortesia, dívida implícita e mudança gradual de escopo. |
| Evidências disponíveis | Histórico do favor, função alegada, necessidade e política de divulgação. |
| Evidência decisiva ou limite de certeza | Ajuda anterior não concede autorização; a necessidade precisa de fonte independente. |
| Confirmação independente | Responsável pelo processo ou registro fictício. |
| Ação segura | Agradecer, pausar e encaminhar ao fluxo correto sem revelar dado. |
| Reporte ou recuperação | Reportar se houver personificação ou coleta insistente. |
| Transferência curta | Favor em chat de projeto muda de escopo e exige a mesma resposta. |
| Debrief | Reciprocidade regula o tom, não a permissão. |
| Conteúdo fictício necessário | 6–8 turnos, política de divulgação e diretório. |

### Percurso P3 — O chamado sem atalho

| Elemento | Definição |
|---|---|
| Situação inicial | Prestador legítimo solicita uma categoria de informação por formulário ou chat incompleto. |
| Canal e artefatos | Formulário textual, chat, chamado, diretório e matriz de autorização simulados. |
| Identidade ou pretexto | Prestador real com contato recebido fora do fluxo. |
| Objetivo do atacante ou hipótese legítima | Pedido legítimo, inicialmente inconclusivo. |
| Pressões e aparências | Impacto operacional alegado e telefone de retorno oferecido. |
| Evidências disponíveis | Chamado, contrato fictício, responsável, finalidade e classificação do dado. |
| Evidência decisiva ou limite de certeza | O chamado e a autorização oficial definem necessidade; o retorno fornecido não serve para confirmação. |
| Confirmação independente | Diretório/portal fictício e responsável pelo dado. |
| Ação segura | Confirmar e compartilhar apenas categoria allowlisted pelo fluxo oficial. |
| Reporte ou recuperação | Sem incidente após validação; registrar o atendimento comum. |
| Transferência curta | Solicitação legítima por outro canal exige a mesma minimização. |
| Debrief | Processo seguro permite responder, mas somente depois de identidade, necessidade e autorização. |
| Conteúdo fictício necessário | 5–7 turnos, chamado, contrato, matriz e diretório. |

Nenhum número, formulário, dado, órgão, pagamento, chamada ou reporte é real.

## 6. Mecânica e diferenciação

- **Interação central:** preencher painel alegação–fato–necessidade–autorização, escolher perguntas de uma entrevista finita e montar resposta mínima.
- **Por que combina com o comportamento:** o pretexto funciona por lacunas; o painel torna visível o que foi alegado, comprovado ou ainda falta.
- **Como se distingue das outras 21 atividades:** avalia necessidade/autorização/minimização sem link; A central que não podia esperar avalia independência do canal e escopo de suporte/acesso.
- **O que é reutilizável:** conversa, evidências, fontes/diretório, guia de reporte, shell e resultado.
- **O que exige componente novo:** matriz de alegação e motor de entrevista finita com divulgação controlada.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela com seletores e lista de perguntas/respostas; nenhum telefone ou mídia.
- **Risco de virar questionário disfarçado e prevenção:** perguntas selecionadas alteram as alegações disponíveis e podem revelar dado demais; o caso legítimo exige conclusão operacional, não apenas “reportar”.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Pedido sem link, contexto e limites | Iniciar pacote | Pacote publicado | `casePackageId` | Orientação curta | Foco no título |
| Investigação | Alegações e fontes | Classificar e escolher perguntas | Perguntas finitas por turno | avaliações/perguntas | Não revela veredito | Tabela |
| Decisão inicial | Responder, verificar ou interromper | Escolher ação | Decisão registrada | decisão inicial | Consequência limitada | `fieldset` |
| Consequência | Resposta do contato/fonte | Reavaliar necessidade/autorização | Turno determinístico | decisões | Mostra mudança de escopo | Status |
| Revisão | Matriz completa | Alterar classificações/decisão | Livre antes do final | rascunho | Sem penalidade | Foco no item |
| Decisão final | Rota, categorias e resposta | Confirmar mínimo e reporte | Controles completos | rota/divulgação/resposta | Erros específicos | Resumo |
| Transferência | Pedido breve em outro canal | Reaplicar matriz mínima | Resposta completa | transferência | Feedback posterior | Texto |
| Resultado | Nota privada | Rever/concluir | Avaliação válida | resultado | Decomposição | Resumo |
| Debrief | Fatos, lacunas e processo | Ler/retornar | Sem nota | visualização opcional | Caso legítimo não premia obediência automática | Texto |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa | Briefing/início | Estado objetivo | Foco no `h1` |
| Em andamento | Pacote ativo | Matriz e entrevista | Rascunho se aprovado | Turnos anunciados |
| Retomada | Rascunho compatível | Resumo/continuar/reiniciar | Mesma versão/pacote | Contexto antes dos controles |
| Revisão | Matriz completa | Alterar livremente | Atualiza rascunho | Foco no item |
| Concluída | Resposta válida | Resultado/debrief | Tentativa imutável | Título focado |
| Repetição | Nova tentativa | Novo pacote sem pontos duplicados | Melhor/última | Aviso |
| Conteúdo indisponível | Pacote/versão ausente | Explicação/retorno | Nenhuma tentativa | Alerta |
| Resposta inválida | Campo/turno inválido | Corrigir mantendo contexto | Não conclui | Erros associados |
| Falha ao salvar | Persistência falhou | Tentar novamente | Sem recompensa até confirmar | Alerta |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Alegações e evidências | 20 | Separa alegação, fato e ausência | Pequena superafirmação | Alegação vira fato | análise de evidências |
| Necessidade | 20 | Confirma finalidade e vínculo do pedido | Finalidade incompleta | Ajuda/cortesia basta | processo seguro |
| Identidade e autorização | 20 | Verifica ambas por fontes adequadas | Uma delas incompleta sem divulgar | Confia no contato | identidade |
| Minimização | 20 | Compartilha somente categoria autorizada ou nada | Informação levemente excessiva e não sensível | Revela dado útil ao pretexto | proteção de dados |
| Rota, resposta e reporte | 20 | Usa rota independente e resposta proporcional | Um detalhe útil ausente | Usa contato fornecido ou omite caso crítico | verificação/reporte |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa alegação, fato, necessidade, autorização e incerteza;
- ausência de link, cortesia ou detalhe correto isolados não valem como veredito;
- velocidade não é pontuada;
- caso legítimo não premia divulgação antes da confirmação completa.

### 9.1 Controles críticos

- não usar contato fornecido como confirmação independente;
- não divulgar sem necessidade e autorização;
- verificar identidade, finalidade e permissão separadamente;
- reportar ameaça, pagamento ou personificação quando indicados.

### 9.2 Resultado privado

Nota, matriz, perguntas, rota, categorias, resposta, controles, feedback, competências e recompensa potencial ficam privados. Agregado não contém alegação ou dado individual.

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
| `claimAssessments` | pares alegação–classe | Sim | interação | cada alegação uma vez |
| `selectedQuestionIds` | sequência de perguntas | Sim | interação | somente turnos apresentados |
| `needAssessmentId` | opção publicada | Sim | interação | finalidade separada |
| `authorizationAssessmentId` | opção publicada | Sim | interação | identidade não basta |
| `disclosureCategoryIds` | categorias allowlisted | Sim | interação | pode ser lista vazia válida |
| `verificationRouteId` | rota fictícia | Sim | interação | independente |
| `responseBlockIds` | blocos ordenados | Sim | interação | resposta mínima |
| `reportDetailIds` | blocos fechados | Condicional | interação | sem dado sensível |
| `transferDecisionId` | opção publicada | Sim | transferência | mesmo comportamento |

Nota e feedback são derivados pelo servidor.

### 11.1 Invariantes

- IDs, turnos, alegações e categorias pertencem ao pacote;
- listas sem duplicatas/extras;
- nenhuma etapa crítica é omitida;
- divulgação precisa ser permitida pela necessidade/autorização do pacote;
- replay é no-op e nova tentativa não duplica recompensa;
- conteúdo/máquina/avaliador têm versões compatíveis.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Persistir somente IDs fictícios, estado finito, rascunho mínimo, resultado e progresso com `isAuthoritative: false`. Nenhum texto livre ou dado real.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Fontes corporativas exigem publicação autorizada.

### Compatibilidade

- atividade requer ID/versão publicados;
- forma persistida exige análise de `APP_SCHEMA_VERSION`;
- migração preserva histórico;
- inválidos seguem para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios | Própria | Não | Auditoria restrita |
| Nota e feedback | Derivados | Completos | Não | Agregado |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Demonstrativa | Própria | Não | Total permitido |
| Agregado | Sem alegação/dado | Contexto coletivo | Contagens/tendências | Contagens/tendências |

São proibidos telefone, dado pessoal/corporativo, conta, pagamento, credencial, OTP, contato e reporte real. O player não envia resposta nem consulta diretório externo.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- matriz como tabela semântica com seletores;
- entrevista textual, teclado integral, `fieldset` e `legend`;
- turnos anunciados sem roubo de foco;
- feedback/erros preservam contexto;
- contraste, texto ampliado, movimento reduzido, sem limite de tempo;
- linguagem sem culpa;
- desktop; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Conversas/fontes atuais | Três pacotes, alegações e perguntas | P0 |
| Interface | Chat, evidências e resultado | Matriz e entrevista finita | P1/P2 |
| Contrato e avaliador | Infra determinística | Necessidade/autorização/minimização | P0/P2 |
| Estado e provider | Fluxo atual | Nova atividade/rascunho | Registro P0 |
| Persistência | Envelope | Nova resposta | Análise de esquema |
| Integrações | Hub/Perfil | Registro; fontes reais adiadas | Backend |
| Testes | Regras/navegador | Turnos, legítimo e privacidade | Harness P0 |

**Esforço relativo:** G. **Posição provável:** P0, matriz P1 e entrevista P2.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, alegações, perguntas e opções por allowlist;
- avaliador integral, parcial, inseguro, legítimo, inconclusivo e inválido;
- pesos 100, nota limitada e controles críticos;
- idempotência, persistência, quarentena e recompensa;
- privacidade e integrações;
- rota própria sem fallback;
- teclado, foco e tabela equivalente.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- caso legítimo, malicioso e inconclusivo;
- leitor de tela, teclado, contraste, texto ampliado e movimento reduzido;
- nenhum telefone, dado, chamada ou efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Vaga/recrutamento falso | Banco de casos | Aprovar fonte de carreiras/RH e limites sobre dado/pagamento | Exige contexto de candidato distinto |
| Governo, jurídico ou compliance exigindo pagamento | Banco de casos | Revisão jurídica e diretório cenográfico | Tema de ameaça e pagamento demanda governança específica |

Não há conceito proprietário de versão futura ou debrief nesta atividade.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes, alegações, perguntas e caso legítimo;
- aprovar pesos, corte e controles críticos;
- definir `activityId`, versão e rota;
- aprovar matriz de categorias, procedimento e fontes fictícias;
- decidir persistência de rascunho;
- confirmar a fronteira com A central que não podia esperar e Ele já sabia meus dados.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
