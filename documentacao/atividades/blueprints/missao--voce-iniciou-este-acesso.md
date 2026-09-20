# Você iniciou este acesso?

> **Estado do blueprint:** aprovado e convertido tecnicamente em 2026-08-15; versão 2 implementada e validada na suíte local.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** a versão 2 publica o console sequencial e a conversa reativa; a versão 1 permanece compatível como histórico.
>
> **Efeito técnico:** `mission:mfa-fatigue` versão 2, `mechanicId: "mfa-console"`, persistência local v11 e recompensa lógica compartilhada entre versões.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Negar e reportar autenticação não iniciada |
| Mecânica-base aprovada | Console sequencial de eventos + conversa textual reativa |
| Estado da atividade atual | Disponível na versão 2 com console sequencial; versão 1 preservada |
| Relação com implementação existente | Implementação do blueprint com compatibilidade da versão 1 |
| `activityId`, versão e rota | `mission:mfa-fatigue`, versão 2, `/missoes/voce-iniciou-este-acesso` |
| Duração-alvo | 9–12 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada por este blueprint |
| Conceitos proprietários | 5; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes internos atribuídos pela plataforma, nunca três percursos oferecidos como escolha ao funcionário, que distribuem os complementares sem exceder dois por caso;
- eventos sequenciais, vínculo com ação própria, falso suporte textual e resposta de recuperação;
- avaliação determinística, controles críticos, estados, privacidade e acessibilidade;
- conteúdo inteiramente fictício, sem prompt, OTP ou console real.

### 1.2 O que permanece sem decisão técnica

- versão executável da evolução e eventual ajuste de rota;
- migração do contrato vigente;
- publicação, pontos, ordem de implementação e integrações corporativas.

A revisão aplicada à versão 1 não resolve esses itens: ela distingue cartões estáticos de controles, explica papel/situação/tarefa/consequência, detalha acertos e erros e torna a próxima Missão acionável, sem antecipar o console sequencial.

## 2. Contrato educacional

- **Comportamento observável:** vincular cada solicitação a uma ação própria; quando não houver vínculo, negar, encerrar interferências e usar a área oficial para revisar e reportar.
- **Técnicas ou objetivos do atacante:** explorar aprovação automática, repetição de prompts, contexto ambíguo e falso suporte para obter um fator de autenticação.
- **Atalho inseguro enfrentado:** aprovar para silenciar, confiar em número/local/dispositivo isolados ou compartilhar código para “cancelar” o evento.
- **Resposta segura generalizável:** só aprovar autenticação iniciada pela própria pessoa e coerente com o contexto; negar o restante e recuperar por rota oficial.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** causa do prompt, reutilização de senha, identidade do atacante ou segurança permanente da conta.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:mfa-uninitiated` | Núcleo | Primeira versão | Exige associar ou negar cada autenticação e iniciar revisão oficial | P1, P2 e P3 |
| `concept:mfa-fatigue` | Complementar | Primeira versão | Testa manutenção da recusa diante de fila controlada e falso suporte | P2 |
| `concept:mfa-context` | Complementar | Primeira versão | Usa número, local e dispositivo como contexto falível, nunca como veredito | P1, P2 e P3 |
| `concept:otp-mfa-response` | Complementar | Primeira versão | Aciona resposta proporcional após código compartilhado ou aprovação narrada | P3 |
| `concept:credential-stuffing-symptom` | Debrief ou limite técnico | Debrief | Explica que prompts iguais podem ter causas distintas, sem diagnóstico nem culpa | Debrief |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — O prompt atrasado | Uma solicitação aparece durante uma transação ativa iniciada pela própria pessoa ou depois que o fluxo terminou | Vincular serviço, finalidade e desafio da transação ativa ou negar | Contexto de MFA | Evento surge após o encerramento do fluxo | Legítimo ou inconclusivo |
| P2 — Aprova só para parar | Solicitações repetidas são seguidas por falso suporte textual | Negar eventos não iniciados e usar rota oficial | MFA fatigue; contexto de MFA | Único prompt após pausa, sem o mesmo volume | Malicioso provável |
| P3 — O código já foi dito | A narrativa informa aprovação ou OTP compartilhado antes do início | Negar novos eventos e iniciar recuperação oficial | Resposta a OTP/MFA; contexto de MFA | Pedido de código em chat corporativo fictício | Exposição narrada; recuperação necessária |

Uma tentativa recebe somente um percurso. O P3 não reinicia nem pune a pessoa pelo evento narrado: avalia o que ela faz a seguir.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — O prompt atrasado

| Elemento | Definição |
|---|---|
| Situação inicial | O funcionário iniciou uma transação fictícia que ainda está ativa e recebe um evento após um pequeno atraso; a transferência curta mostra outro evento somente depois que o fluxo terminou. |
| Canal e artefatos | Console de autenticação simulado, registro de ações próprias e área oficial cenográfica. |
| Identidade ou pretexto | Serviço corporativo fictício com detalhes parcialmente coerentes. |
| Objetivo do atacante ou hipótese legítima | Evento legítimo associado à transação ainda ativa ou evento não relacionado; proximidade temporal não resolve a origem. |
| Pressões e aparências | Pequeno atraso, número aparentemente coerente, localização aproximada e dispositivo familiar. |
| Evidências disponíveis | Estado ativo ou encerrado da transação, autoria da iniciação, serviço, finalidade, desafio exibido, número, horário, local, dispositivo e registro oficial fictício. |
| Evidência decisiva ou limite de certeza | Aprovação só é segura quando a própria pessoa iniciou a transação, ela continua ativa e serviço, finalidade e desafio correspondem. Tempo, número, local e dispositivo são apenas contexto; se o fluxo terminou, deve negar e revisar. |
| Confirmação independente | Abrir a área oficial simulada por rota já conhecida. |
| Ação segura | Aprovar somente a transação própria ainda ativa com serviço, finalidade e desafio correspondentes; negar e revisar qualquer evento após o encerramento ou com uma divergência. |
| Reporte ou recuperação | Reportar se não houver vínculo ou se o registro apontar evento desconhecido. |
| Transferência curta | Depois que o fluxo é marcado como encerrado, um novo evento com número, local e dispositivo plausíveis deve ser negado e revisado. |
| Debrief | A regra não é proximidade nem reconhecimento superficial: só a transação própria ainda ativa, com serviço, finalidade e desafio correspondentes, pode ser aprovada. |
| Conteúdo fictício necessário | Linha de ações com estado da transação, serviço, finalidade e desafio, dois eventos, console oficial e opções fechadas. |

### Percurso P2 — Aprova só para parar

| Elemento | Definição |
|---|---|
| Situação inicial | Três eventos controlados chegam em sequência e uma conversa de “suporte” oferece cancelá-los. |
| Canal e artefatos | Fila visual sem som ou vibração, conversa textual e console oficial fictício. |
| Identidade ou pretexto | Suposto help desk afirma que uma aprovação ou código encerrará o problema. |
| Objetivo do atacante ou hipótese legítima | Obter aprovação por fadiga e pressão social. |
| Pressões e aparências | Repetição, urgência, alívio prometido e detalhes plausíveis do evento. |
| Evidências disponíveis | Ausência de login próprio, origem do contato recebido, política e área oficial. |
| Evidência decisiva ou limite de certeza | Nenhum evento foi iniciado; o contato recebido não é uma rota de validação. |
| Confirmação independente | Encerrar a conversa e abrir o suporte/console pelo portal fictício. |
| Ação segura | Negar todos os eventos, não compartilhar código e revisar sessões. |
| Reporte ou recuperação | Reportar fila e falso suporte, solicitando revisão conforme procedimento. |
| Transferência curta | Um único prompt posterior testa se a resposta depende do volume ou da autoria. |
| Debrief | A frequência aumenta pressão, mas a decisão continua ligada a uma ação própria. |
| Conteúdo fictício necessário | 3–4 eventos, 5–7 mensagens reativas, política curta e console oficial. |

### Percurso P3 — O código já foi dito

| Elemento | Definição |
|---|---|
| Situação inicial | O caso informa que uma persona fictícia compartilhou um código ou aprovou um evento e agora recebe nova solicitação. |
| Canal e artefatos | Narrativa curta, console de eventos, sessões e conversa textual simulados. |
| Identidade ou pretexto | Falso suporte usa o erro anterior para pedir continuidade. |
| Objetivo do atacante ou hipótese legítima | Manter acesso e obter novos fatores. |
| Pressões e aparências | Vergonha, promessa de correção e falsa inevitabilidade. |
| Evidências disponíveis | Evento narrado, novas tentativas, sessões fictícias e rota oficial. |
| Evidência decisiva ou limite de certeza | Houve exposição declarada; não se pede que a pessoa prove o uso posterior. |
| Confirmação independente | Área oficial fictícia de segurança e suporte iniciado pelo portal. |
| Ação segura | Negar novos eventos, encerrar contato e solicitar revisão/recuperação. |
| Reporte ou recuperação | Reportar sem repetir código, senha ou dado sensível; revisar sessões e fatores. |
| Transferência curta | Mensagem de chat pede um “código de confirmação”; a pessoa recusa e usa a rota oficial. |
| Debrief | Reportar cedo protege outras pessoas; o erro inicial não bloqueia nem reduz a possibilidade de recuperação. |
| Conteúdo fictício necessário | Narrativa sem segredo real, 2 eventos, sessões cenográficas e blocos de reporte. |

Nenhum evento aciona autenticação, notificação, sessão ou suporte real.

## 6. Mecânica e diferenciação

- **Interação central:** responder a eventos sequenciais, vinculá-los a ações próprias e operar uma conversa textual finita que reage às decisões anteriores.
- **Por que combina com o comportamento:** a pressão surge ao longo da sequência; a pessoa pratica consistência e recuperação, não reconhecimento de uma imagem estática.
- **Como se distingue das outras 21 atividades:** é o console de autenticação e fator; não é análise de identidade de remetente, central telefônica nem resposta genérica a incidente.
- **O que é reutilizável:** console e conversa da versão 1, evidências, shell, resultado, debrief e integrações.
- **O que exige componente novo:** motor determinístico de estados, fila sequencial, associação evento–ação e contrato/evaluador por percurso.
- **Alternativa sem arrastar, mídia ou representação espacial:** lista cronológica, botões de ação e tabela evento–ação própria; toda conversa é textual.
- **Risco de virar questionário disfarçado e prevenção:** cada ação altera a próxima mensagem e o estado do console; a resposta final deriva do percurso executado, sem pergunta de definição.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Papel, regra de segurança e aviso fictício | Iniciar pacote | Pacote publicado | `casePackageId` | Orientação curta | Foco no título |
| Investigação | Registro de ações próprias e primeiro evento | Associar evento ou marcar sem vínculo | Associação obrigatória | associações | Contexto não vira veredito | Tabela textual |
| Decisão inicial | Ações Aprovar/Negar/Revisar | Agir sobre o evento | Estado permitido pelo pacote | ação por evento | Consequência sem nota imediata | `fieldset` |
| Consequência | Novo evento ou falso suporte | Responder ou encerrar | Máquina de estados finita | ação e resposta | Mensagem coerente com decisão | Região de status |
| Revisão | Linha completa até o momento | Corrigir associações e ações ainda não finais | Livre antes do envio | rascunho revisado | Sem penalidade | Lista numerada |
| Decisão final | Área oficial, sessões e opções de reporte | Escolher revisão, recuperação e relato | Controles aplicáveis completos | ações finais e reporte | Validação específica | Erros associados |
| Transferência | Evento curto em outro canal | Aplicar autoria e rota oficial | Uma associação e uma ação | transferência | Feedback após envio | Texto equivalente |
| Resultado | Nota e decomposição privadas | Rever ou concluir | Avaliador válido | resultado derivado | Próximo passo recomendado | Resumo linear |
| Debrief | Causas possíveis e limites | Ler e retornar | Sem nova nota | visualização opcional | Não diagnostica stuffing | Texto |

Não há cronômetro, som obrigatório, vibração nem volume perturbador. A pessoa pode revisar antes da conclusão.

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa ou rascunho | Briefing e início | Estado objetivo | Foco no `h1` |
| Em andamento | Sequência ativa | Eventos, conversa e console | Snapshot mínimo, se aprovado | Evento novo anunciado sem roubar foco |
| Retomada | Snapshot compatível | Resumo e continuar/reiniciar | Mesma máquina, versão e pacote | Contexto lido antes do controle |
| Revisão | Antes do envio final | Linha, associações e ações revisáveis | Atualiza rascunho | Foco previsível |
| Concluída | Resposta válida | Resultado privado e debrief | Tentativa imutável | Título do resultado |
| Repetição | Nova tentativa | Novo pacote sem recompensa duplicada | Melhor e última separadas | Aviso explícito |
| Conteúdo indisponível | Pacote não publicado | Explicação e retorno | Nenhuma tentativa | Alerta sem fallback silencioso |
| Resposta inválida | Campo, transição ou ID inválido | Corrigir preservando contexto | Não conclui | Resumo e erros locais |
| Falha ao salvar | Avaliação válida, gravação falhou | Repetir salvamento | Sem recompensa até confirmação | Alerta persistente |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Associação ao contexto próprio | 15 | Vincula somente evento de transação própria ainda ativa com serviço, finalidade e desafio correspondentes | Uma associação incerta, sem aprovação insegura | Tempo, número, local ou dispositivo justificam aprovação | análise contextual |
| Decisões por evento | 25 | Aprova somente evento iniciado e nega os demais | Decisão segura com revisão incompleta | Aprova evento não iniciado | autenticação segura |
| Proteção do fator e resistência ao suporte | 20 | Não compartilha fator e encerra falso suporte | Recusa fator, mas prolonga contato | Compartilha/aceita solicitação | proteção de credenciais |
| Rota oficial independente | 15 | Inicia console/suporte por rota conhecida | Usa área oficial com passo incompleto | Confirma pelo contato recebido | verificação segura |
| Revisão, recuperação e reporte | 25 | Ações proporcionais completas para o percurso | Omite uma ação não crítica | Ignora exposição ou não reporta caso crítico | resposta a incidente |

Os avaliadores são normalizados por pacote: não há desconto por ação que não se aplica ao P1.

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa fatos, contexto falível, incerteza e processo seguro;
- nenhum número, local ou dispositivo isolado vale como veredito;
- velocidade não é pontuada;
- caso legítimo não premia aprovação sem vínculo completo com ação própria.

### 9.1 Controles críticos

- nunca aprovar ou compartilhar fator para autenticação não iniciada;
- negar e revisar quando a transação própria já terminou ou serviço, finalidade ou desafio não correspondem;
- encerrar falso suporte recebido;
- usar console ou suporte por rota oficial independente;
- quando houver exposição narrada, revisar/recuperar e reportar sem segredo.

### 9.2 Resultado privado

O resultado apresenta nota de 0–100, decisões por evento, associações, controles críticos, feedback factual, competências, recomendação e recompensa potencial. A causa técnica não é pontuada. Equipe e gestão recebem somente agregados permitidos, nunca eventos ou respostas individuais.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, sujeita à aprovação da versão executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida pela chave publicada; repetição não duplica pontos.
- **Versões anteriores:** a versão 1 não é reinterpretada e sua recompensa permanece preservada.
- **Integrações futuras:** Missões, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, com pontuação própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | ID publicado | Sim | catálogo autoritativo | deve corresponder à versão-alvo |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | não confiar no cliente |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |
| `eventInitiationAssociations` | pares evento–transação própria ativa ou sem vínculo | Sim | interação | vínculo só é válido com iniciação própria, transação ainda ativa e serviço, finalidade e desafio correspondentes |
| `eventActions` | pares evento–ação allowlisted | Sim | interação | respeitar transições possíveis |
| `supportResponseIds` | respostas fechadas por turno | Condicional | interação | somente turnos apresentados |
| `officialConsoleActionIds` | lista ordenada de ações | Sim | interação | opções do pacote |
| `reportDetailIds` | blocos allowlisted sem segredo | Condicional | interação | obrigatório nos casos críticos |
| `transferAssociationId` | vínculo ou sem vínculo | Sim | transferência | opção publicada |
| `transferActionId` | ação allowlisted | Sim | transferência | coerente com autoria |

Necessidade de recuperação, nota, bônus, competências e feedback são derivados pelo avaliador; o cliente não declara autoridade sobre esses resultados.

### 11.1 Invariantes

- IDs, eventos, turnos e opções pertencem à versão publicada;
- cada evento recebe uma associação e ação válidas;
- listas rejeitam duplicatas e valores extras;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op;
- tentativa nova não duplica recompensa;
- conteúdo, máquina de estados e avaliador têm versões compatíveis.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Registrar pacote, estado finito atual, rascunho mínimo, resposta bruta, resultado e progresso como `isAuthoritative: false`. Não gerar evento real nem aceitar OTP ou texto livre sensível.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização, público, versão, pacote, allowlists, transições, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão.

### Compatibilidade

- a nova semântica exige `activityVersion` própria;
- a versão 1 continua legível, imutável e avaliada por sua regra original;
- mudança da forma persistida exige análise de `APP_SCHEMA_VERSION`;
- migrações preservam progresso, pontos, recompensas, preferências e evidências;
- nenhuma reformulação concede novamente recompensa já reivindicada;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios mínimos | Própria tentativa | Não | Não; auditoria restrita quando autorizada |
| Nota e feedback | Derivados localmente | Completo | Não | Agregado permitido |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Chave e valor demonstrativos | Própria | Não | Total autorizado |
| Agregado | Sem evento ou resposta individual | Contexto coletivo permitido | Contagens/tendências | Contagens/tendências autorizadas |

Não há credencial, OTP, segredo, conta, telefone, dispositivo real, chamada, notificação, sessão, bloqueio ou reporte real. Campos são fechados; o player não afirma que revogou sessão ou contatou suporte.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- eventos como lista semântica e tabela evento–ação própria;
- anúncios de novos eventos sem som, vibração ou roubo de foco;
- `fieldset` e `legend` para cada decisão;
- conversa inteiramente textual e controles por teclado;
- feedback e erro em regiões adequadas, preservando contexto;
- contraste, texto ampliado e movimento reduzido;
- ausência de limite de tempo e linguagem sem culpa;
- desktop neste blueprint; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Mensagens e opções da versão 1 | Três pacotes e grafo finito de turnos | Fundação P0 |
| Interface | Console, conversa, shell e resultado | Fila sequencial e associação evento–ação | P2 |
| Contrato e avaliador | Validação determinística atual | Contrato por evento e avaliador normalizado por pacote | P0/P2 |
| Estado e provider | Estado da Missão atual | Máquina finita e retomada versionada | Decisão de rascunho |
| Persistência | Envelope e quarentena | Snapshot e resposta nova | Análise de esquema |
| Integrações | Hub, Perfil, competências | Registro da versão-alvo | Backend autoritativo |
| Testes | Regras e testes atuais | Todas as transições, foco e compatibilidade v1 | Harness P0 |

**Esforço relativo:** G. **Posição provável:** fundação P0 e experiência composta P2.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, eventos, turnos e opções por allowlist;
- transições integrais, alternativas seguras e estados inalcançáveis;
- avaliador integral, parcial, inseguro, legítimo e inválido por pacote;
- pesos somando 100, nota limitada e controles críticos;
- tentativa duplicada, repetição, recompensa e contribuição idempotentes;
- versão 1 preservada, migração e quarentena;
- agregado sem resposta individual e integrações de Perfil;
- rota própria sem cair no hub;
- teclado, foco, anúncios e tabela equivalente.

### Manuais no desktop

- os três percursos, incluindo aprovação legítima no P1 e recuperação no P3;
- revisão, retomada e repetição;
- teclado, leitor de tela, alto contraste, texto ampliado e movimento reduzido;
- ausência de som, vibração, cronômetro e pressão de velocidade;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Sintoma de credential stuffing | Debrief | Revisão técnica da explicação e responsabilidade compartilhada | O usuário não consegue diagnosticar a causa de um prompt |

Não há conceitos proprietários de banco de casos ou versão futura neste mapa; futuras variações deverão reutilizar o mesmo comportamento sem ampliar a tentativa artificialmente.

## 18. Gates de produção e validação posterior

Os pacotes, pesos, controles, versão, rota e compatibilidade foram convertidos. Permanecem antes do uso real: revisão dos procedimentos corporativos, backend autoritativo, testes de navegador de todos os ramos e validação editorial/acessível do acabamento visual.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
| 2026-08-15 | Apresentação da versão 1 revisada sem fingir o console-alvo | Implementada e validada localmente | Somente textos, feedback detalhado e navegação; contrato v1 preservado |
| 2026-08-15 | Console sequencial, falso suporte reativo, área oficial, reporte e transferência convertidos | Implementada como versão 2 | Novo contrato por mecânica; esquema v11; versões e recompensa preservadas |
