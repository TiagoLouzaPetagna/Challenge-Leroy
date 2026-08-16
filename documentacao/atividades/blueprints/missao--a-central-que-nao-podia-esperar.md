# A central que não podia esperar

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** atividade inexistente como player; não deve ser confundida com o piloto legado O aviso que não podia esperar.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Encerrar contato recebido e iniciar suporte pela rota oficial |
| Mecânica-base aprovada | Console textual de callback + diretório/chamado fictício |
| Estado da atividade atual | Inexistente como atividade executável |
| Relação com implementação existente | Atividade nova; não reutiliza identidade, rota ou recompensa do piloto legado |
| `activityId`, versão e rota | Não definidos |
| Duração-alvo | 10–13 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada pelo blueprint |
| Conceitos proprietários | 11; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três percursos textuais para suporte remoto, “conta segura” e suporte legítimo;
- encerramento do contato, busca independente, validação de ticket/pessoa/ferramenta/escopo;
- painel inerte de permissões, avaliação, controles críticos e recuperação proporcional;
- ausência de áudio, chamada, software, pagamento ou integração real.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão e rota;
- diretório, política, tickets e catálogo de ferramentas publicados;
- persistência de rascunho, ordem de implementação, recompensa e integração corporativa.

## 2. Contrato educacional

- **Comportamento observável:** encerrar ou suspender contato recebido, encontrar a rota oficial de forma independente e validar ticket, pessoa, ferramenta, duração e escopo antes de qualquer acesso.
- **Técnicas ou objetivos do atacante:** vishing, falso suporte, ferramenta remota, pedido para desativar proteção ou transferir a uma “conta segura”.
- **Atalho inseguro enfrentado:** confiar no número exibido, retornar pelo contato fornecido ou aceitar acesso/pagamento para resolver urgência.
- **Resposta segura generalizável:** iniciar novo contato por diretório conhecido, confirmar necessidade e limitar qualquer suporte ao escopo autorizado.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** autenticidade de chamadas reais, detecção de caller-ID falsificado ou execução de suporte/recuperação.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:remote-tool-artifact` | Núcleo | Primeira versão | Faz validar ferramenta, duração, escopo e permissões sem abrir pacote | P1 e P3 |
| `concept:vishing` | Núcleo | Primeira versão | Representa contato recebido por transcrição e retorno seguro | P1, P2 e P3 |
| `concept:disable-protection` | Complementar | Primeira versão | Exige recusar enfraquecimento sem autorização verificável | P1 e P3 |
| `concept:fake-tech-support` | Complementar | Primeira versão | Contrasta contato, ticket, diretório e limites do suporte | P1, P2 e P3 |
| `concept:safe-account-scam` | Complementar | Primeira versão | Decompõe falsa proteção e perda de controle | P2 |
| `concept:scareware` | Variação de caso | Banco de casos | Conecta alerta fictício a callback e falso técnico | Banco versionado |
| `concept:fake-0800` | Variação de caso | Banco de casos | Compara origem de números plausíveis sem usar prefixo como veredito | Banco versionado |
| `concept:remote-assistance` | Variação de caso | Banco de casos | Expõe permissões solicitadas e resposta após acesso narrado | Banco versionado |
| `concept:pix-fraud` | Variação de caso | Banco de casos | Interrompe falsa central e reconstrói rota oficial sem app real | Banco versionado |
| `concept:remote-access-response` | Transferência | Banco de casos | Reconstrói acesso já concedido e encaminha contenção oficial | Banco versionado |
| `concept:caller-id-spoofing` | Debrief ou limite técnico | Debrief | Explica que visor não permite determinar origem verdadeira | Debrief |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Atualização urgente do suporte | Contato recebido pede instalador remoto e proteção desativada | Encerrar e validar suporte por rota oficial | Desativar proteção; falso suporte | Novo pedido textual de ferramenta remota | Malicioso provável |
| P2 — Mova para a conta segura | Suposta central bancária pede transferência protetiva | Encerrar e iniciar contato oficial | Falso suporte; conta segura | Pedido similar chega por mensagem textual | Malicioso |
| P3 — O chamado existe | Suporte legítimo contata sobre ticket real | Recomeçar pelo diretório e limitar escopo | Desativar proteção; falso suporte | Outro ticket legítimo com ferramenta diferente | Legítimo após validação |

Cada percurso ativa dois complementares no máximo. O núcleo de ferramenta remota é explícito em P1/P3; o P2 pratica o mesmo encerramento/retorno com o núcleo de vishing.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Atualização urgente do suporte

| Elemento | Definição |
|---|---|
| Situação inicial | Uma transcrição representa chamada recebida de “suporte” que pede instalação remota e desativação temporária de proteção. |
| Canal e artefatos | Transcrição, diretório, ticket, catálogo de ferramentas e painel de permissões fictícios. |
| Identidade ou pretexto | Técnico alega incidente amplo e urgência. |
| Objetivo do atacante ou hipótese legítima | Obter acesso remoto e enfraquecer proteção. |
| Pressões e aparências | Número plausível, jargão, risco de bloqueio e tempo curto narrado sem cronômetro. |
| Evidências disponíveis | Ausência de ticket, diretório, política, ferramenta não catalogada e escopo excessivo. |
| Evidência decisiva ou limite de certeza | O contato recebido não é confirmação; inconsistências justificam encerrar e reportar sem provar identidade. |
| Confirmação independente | Diretório fictício e ticket aberto pelo portal. |
| Ação segura | Encerrar, não instalar/desativar e iniciar suporte oficial. |
| Reporte ou recuperação | Reportar contato e pedido em categorias fechadas. |
| Transferência curta | Mensagem textual pede ferramenta remota; a mesma rota oficial é escolhida. |
| Debrief | Suporte legítimo também pode ter urgência, mas ticket, ferramenta e escopo continuam verificáveis. |
| Conteúdo fictício necessário | 6–8 turnos, diretório, ticket vazio, política e painel de permissões. |

### Percurso P2 — Mova para a conta segura

| Elemento | Definição |
|---|---|
| Situação inicial | Uma central alegada informa fraude e pede transferência para uma “conta segura”. |
| Canal e artefatos | Transcrição, cartões problema–ação–controle e diretório oficial cenográfico. |
| Identidade ou pretexto | Setor antifraude com dados sintéticos plausíveis. |
| Objetivo do atacante ou hipótese legítima | Induzir transferência e manter a pessoa no contato. |
| Pressões e aparências | Medo de perda, sigilo, urgência e promessa de proteção. |
| Evidências disponíveis | Origem do contato, política de que proteção não exige transferência e rota oficial. |
| Evidência decisiva ou limite de certeza | A operação pedida transfere controle; número exibido e dados corretos não autenticam. |
| Confirmação independente | Encerrar e abrir a central fictícia pela área oficial. |
| Ação segura | Não transferir, não fornecer dado e iniciar novo contato oficial. |
| Reporte ou recuperação | Reportar a tentativa; se pagamento fosse narrado, encaminhar para resposta especializada futura. |
| Transferência curta | A mesma narrativa chega por mensagem sem link e exige novo contato oficial. |
| Debrief | Não existe operação de “segurança” que dependa de obedecer à chamada recebida neste cenário. |
| Conteúdo fictício necessário | Transcrição, política, diretório e valores totalmente fictícios, sem chave ou botão de pagamento. |

### Percurso P3 — O chamado existe

| Elemento | Definição |
|---|---|
| Situação inicial | Um suporte legítimo liga sobre ticket real, mas o funcionário precisa validar antes de aceitar escopo. |
| Canal e artefatos | Transcrição, ticket, diretório, ferramenta autorizada e matriz de permissões simulados. |
| Identidade ou pretexto | Técnica listada no ticket, com escopo limitado. |
| Objetivo do atacante ou hipótese legítima | Suporte legítimo. |
| Pressões e aparências | Impacto operacional real, sem pedido de segredo ou pagamento. |
| Evidências disponíveis | Ticket aberto previamente, contato cadastrado, ferramenta aprovada, janela e escopo. |
| Evidência decisiva ou limite de certeza | Novo contato iniciado pelo diretório confirma ticket e profissional; ainda se limita permissões. |
| Confirmação independente | Encerrar e retornar pelo diretório fictício. |
| Ação segura | Aceitar somente procedimento representado e escopo confirmado, sem executar nada real. |
| Reporte ou recuperação | Registrar atendimento comum; escalar somente divergências. |
| Transferência curta | Outro ticket legítimo pede ferramenta diferente e exige confirmar catálogo/escopo. |
| Debrief | Segurança não ensina a rejeitar todo suporte; ensina a reiniciar a confiança e limitar autorização. |
| Conteúdo fictício necessário | 5–7 turnos, ticket, diretório, catálogo e permissões cenográficas. |

Nenhum número é discável; não há chamada, software remoto, instalação, transferência, pagamento ou suporte real.

## 6. Mecânica e diferenciação

- **Interação central:** operar contato textual recebido, encerrar/pausar, localizar entrada no diretório, consultar ticket e avaliar ferramenta, permissões, duração e escopo.
- **Por que combina com o comportamento:** torna a independência do canal e os limites de suporte ações concretas.
- **Como se distingue das outras 21 atividades:** testa canal independente e escopo de suporte/acesso; O pedido não tinha link testa identidade, necessidade, autorização e minimização de dados.
- **O que é reutilizável:** conversa reativa de MFA, fontes de processo, cartões de recuperação, shell e resultado.
- **O que exige componente novo:** console de callback, diretório/ticket combinados, painel de permissões/escopo e motor finito.
- **Alternativa sem arrastar, mídia ou representação espacial:** transcrição linear, tabelas de ticket/permissões e seletores; sem áudio obrigatório.
- **Risco de virar questionário disfarçado e prevenção:** o funcionário monta a nova rota e valida múltiplos limites; um caso legítimo controla a tendência de rejeitar tudo.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contato recebido, papel e limites | Iniciar pacote | Pacote publicado | `casePackageId` | Orientação breve | Foco no título |
| Investigação | Transcrição e fontes | Marcar alegações e consultar diretório/ticket | Fontes opcionais | fontes/avaliações | Número exibido não autentica | Texto/tabela |
| Decisão inicial | Continuar, encerrar ou pôr em espera | Escolher ação | Ação registrada | ação recebida | Consequência limitada | `fieldset` |
| Consequência | Resposta do contato | Reagir sem fornecer acesso/dado | Máquina finita | respostas | Liga pressão à decisão | Região de status |
| Revisão | Diretório, ticket e permissões | Alterar avaliações | Livre antes do final | rascunho | Sem penalidade | Foco previsível |
| Decisão final | Callback, escopo e reporte | Montar rota/limites | Controles completos | rota, escopo, relato | Erros específicos | Resumo |
| Transferência | Contato curto em outro canal | Encerrar e escolher fonte | Resposta mínima | transferência | Feedback posterior | Texto |
| Resultado | Nota privada | Rever/concluir | Avaliação válida | resultado | Decomposição | Resumo |
| Debrief | Limite de caller-ID e suporte legítimo | Ler/retornar | Sem nova nota | visualização opcional | Não ensina detecção de spoofing | Texto |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa | Briefing/início | Estado objetivo | Foco no `h1` |
| Em andamento | Pacote ativo | Transcrição, fontes e painel | Rascunho se aprovado | Turnos anunciados |
| Retomada | Rascunho compatível | Resumo/continuar/reiniciar | Mesma versão/estado | Contexto lido |
| Revisão | Fontes consultadas | Alterar avaliações | Atualiza rascunho | Foco no item |
| Concluída | Resposta válida | Resultado/debrief | Tentativa imutável | Título focado |
| Repetição | Nova tentativa | Novo pacote sem pontos duplicados | Melhor/última | Aviso |
| Conteúdo indisponível | Pacote/versão ausente | Explicação/retorno | Nenhuma tentativa | Alerta sem fallback |
| Resposta inválida | Transição/ID inválido | Corrigir mantendo contexto | Não conclui | Erros associados |
| Falha ao salvar | Persistência falhou | Tentar novamente | Sem recompensa até confirmar | Alerta persistente |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Encerrar ou suspender contato recebido | 15 | Interrompe antes de qualquer ação crítica | Posterga sem compartilhar | Continua e obedece | decisão sob pressão |
| Diretório e callback independente | 20 | Obtém rota de fonte cadastrada | Usa portal oficial com lacuna | Usa número fornecido/visor | verificação segura |
| Ticket, pessoa, ferramenta e escopo | 30 | Valida todos os itens aplicáveis | Uma lacuna não crítica | Aceita acesso sem validação | processo seguro |
| Proteção e controle | 20 | Recusa enfraquecimento, transferência e excesso | Limite incompleto | Desativa, paga ou cede acesso | proteção |
| Reporte ou recuperação | 15 | Ação proporcional completa | Detalhe útil ausente | Omite caso crítico | reporte |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa alegação, evidência, incerteza e processo seguro;
- número exibido, jargão ou urgência isolados não valem como veredito;
- velocidade não é pontuada;
- suporte legítimo não premia obediência antes de validar ticket e escopo.

### 9.1 Controles críticos

- não tratar contato fornecido ou caller-ID como fonte independente;
- não desativar proteção, transferir valor ou conceder acesso fora de escopo;
- validar ticket, pessoa, ferramenta e duração quando aplicáveis;
- reportar/recuperar após exposição narrada.

### 9.2 Resultado privado

Nota, decomposição, fontes, ticket, permissões, limites, controles, feedback, competências e recompensa potencial são privados. Agregados excluem transcrição e decisões individuais.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, sujeita à aprovação executável.
- **Bônus:** regra transversal; sem velocidade.
- **Idempotência:** primeira recompensa válida; repetição não duplica.
- **Versões anteriores:** não reutilizar a chave nem recompensa do piloto legado.
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
| `inboundContactActionId` | continuar/pausar/encerrar allowlisted | Sim | interação | ação inicial |
| `directoryContactId` | fonte fictícia | Sim | interação | independente |
| `ticketAssessmentId` | opção publicada | Sim | interação | existência/escopo |
| `toolPermissionAssessments` | pares permissão–avaliação | Condicional | interação | cada permissão uma vez |
| `supportScopeActionId` | ação de escopo | Sim | interação | não executa acesso |
| `reportDetailIds` | blocos fechados | Condicional | interação | sem segredo |
| `recoveryHandoffId` | opção publicada | Condicional | interação | exposição narrada |
| `transferRouteId` | rota allowlisted | Sim | transferência | independente |

Nota e feedback são derivados.

### 11.1 Invariantes

- IDs/turnos/fontes pertencem ao pacote;
- transições respeitam máquina publicada;
- listas sem duplicatas/extras;
- replay é no-op;
- nova tentativa não duplica recompensa;
- conteúdo/máquina/avaliador têm versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Persistir IDs, estado finito e resultado mínimos com `isAuthoritative: false`; sem número, gravação, ticket ou dado real.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote e conteúdo publicados, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Diretório/tickets reais só por integrações autorizadas futuras.

### Compatibilidade

- atividade requer ID/versão próprios;
- piloto legado permanece separado e imutável;
- forma persistida exige análise de `APP_SCHEMA_VERSION`;
- migração preserva histórico;
- inválidos em quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios | Própria | Não | Auditoria restrita |
| Nota e feedback | Derivados | Completos | Não | Agregado |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Demonstrativa | Própria | Não | Total permitido |
| Agregado | Sem transcrição/resposta | Contexto coletivo | Contagens/tendências | Contagens/tendências |

Não há chamada, número acionável, áudio obrigatório, gravação, software remoto, arquivo, comando, credencial, OTP, conta ou pagamento real. O player nunca promete encerramento, bloqueio ou contato.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- transcrição completa e suficiente; áudio não é necessário;
- diretório, ticket e permissões em tabelas semânticas;
- `fieldset`, `legend` e teclado integral;
- novos turnos anunciados sem roubar foco;
- contraste, texto ampliado, movimento reduzido, sem cronômetro;
- linguagem sem culpa;
- desktop; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Conversas/fontes atuais | Três pacotes, ticket, diretório, escopo | P0 |
| Interface | Chat, console e resultado | Callback + ticket + permissões | P2 |
| Contrato e avaliador | Infra determinística | Máquina e avaliação de escopo | P0/P2 |
| Estado e provider | Fluxo atual | Nova atividade/rascunho | Registro P0 |
| Persistência | Envelope | Nova resposta | Análise de esquema |
| Integrações | Hub/Perfil | Registro; integrações reais adiadas | Backend |
| Testes | Regras/navegador | Transições, legítimo e acessibilidade | Harness P0 |

**Esforço relativo:** G. **Posição provável:** P0 e experiência composta P2.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, turnos, fontes e permissões por allowlist;
- máquina integral e estados inválidos;
- avaliador integral, parcial, inseguro, legítimo e inválido;
- pesos 100, nota limitada, controles críticos e idempotência;
- persistência, quarentena, privacidade e integrações;
- rota própria sem fallback;
- teclado, foco e transcrição.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- falso suporte e suporte legítimo;
- leitor de tela, teclado, contraste, texto ampliado e movimento reduzido;
- nenhum áudio, chamada, acesso ou efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Scareware; falso 0800; assistência remota; Pix por falsa central | Banco de casos | Aprovar pacotes, procedimentos e controles de segurança | Ampliam canais e consequências além dos três percursos iniciais |
| Resposta após acesso remoto | Banco de casos e transferência própria | Integrar contrato proporcional com recuperação | É pós-exposição e exige ações diferentes |
| Caller-ID falsificado | Debrief | Revisão técnica do texto | Não é detectável de forma confiável pelo visor |

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes, turnos e caso legítimo;
- aprovar pesos, corte e controles críticos;
- definir `activityId`, versão e rota sem reutilizar o piloto legado;
- aprovar diretório, ticket, catálogo de ferramenta e matriz de permissões fictícios;
- decidir rascunho e limites do motor ramificado;
- aprovar a fronteira com O pedido não tinha link e Cliquei. E agora?.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
