# Ataque multicanal

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** existe somente como card planejado identificado localmente por `multichannel`; não possui player, contrato, versão pública ou rota própria.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Simulação |
| Comportamento principal aprovado | Reconstruir a dependência entre contatos de vários canais e estabelecer uma âncora realmente independente antes de agir |
| Mecânica-base aprovada | Linha temporal multicanal textual com mapa causal e controles de interrupção |
| Estado da atividade atual | Planejada no hub; não disponível como atividade |
| Relação com implementação existente | Atividade nova; o card atual é somente catálogo local |
| `activityId`, versão e rota | Não definidos; `multichannel` não é automaticamente um ID público |
| Duração-alvo | 11 a 15 minutos |
| Regra de recompensa considerada | 70 pontos-base de Simulação e bônus transversal, não ativados por este blueprint |
| Conceitos proprietários | 4, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md) |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes alternativos com cadeia maliciosa, cadeia legítima e cadeia inconclusiva;
- representação textual de eventos, relações de origem e grau de certeza;
- avaliação de arestas críticas, sem exigir uma ordem total artificial;
- uma decisão de interrupção e um relato factual montado com fragmentos;
- ausência de voz, vídeo, chamada, QR navegável ou integração real na primeira versão.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão executável e rota;
- expressão visual final do mapa causal;
- quantidade final de eventos por pacote;
- política de retomada e expiração de rascunho;
- ordem de implementação, publicação e recompensa.

## 2. Contrato educacional

- **Comportamento observável:** indicar de onde cada contato obteve seu contexto, separar dependência de independência e interromper uma ação sensível até encontrar uma âncora confiável.
- **Técnicas ou objetivos do atacante:** fabricar corroboração falsa por e-mail, chat, página, QR descrito e falso suporte, fazendo vários canais parecerem confirmações distintas.
- **Atalho inseguro enfrentado:** considerar “recebi confirmação em dois canais” suficiente sem perguntar quem forneceu ou controlou cada canal.
- **Resposta segura generalizável:** rastrear a origem da rota, voltar a um ponto conhecido fora da cadeia e conter a solicitação enquanto a independência não existir.
- **O que a conclusão permite afirmar:** como a pessoa reconstruiu e interrompeu a cadeia apresentada.
- **O que não permite afirmar:** comprometimento real, autoria, domínio permanente ou capacidade de detectar mídia sintética e telemetria invisível.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:multichannel-chain` | Núcleo | Primeira versão | Relações entre eventos em canais diferentes organizam toda a decisão | P1, P2 e P3 |
| `concept:false-cross-channel-corroboration` | Complementar | Primeira versão | Mostra quando dois canais dependem da mesma origem | P1, P2 e P3 |
| `concept:email-bombing-support` | Variação de caso | Banco de casos | Sobrecarga seguida por falso suporte | Banco de casos |
| `concept:virtual-meeting-bec` | Variação de caso | Banco de casos | Reunião virtual usada para sustentar personificação financeira | Banco de casos |

## 4. Arquitetura da primeira versão

Cada tentativa recebe somente um pacote. Todos usam um Núcleo e um Complementar formal.

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Chamado que confirma a si mesmo | E-mail leva a chat e falso suporte, que apontam uns para os outros | Mapear a origem comum e interromper a cadeia | `concept:false-cross-channel-corroboration` | Um QR descrito repete o destino recebido no primeiro e-mail | Malicioso |
| P2 — Mudança de canal documentada | Um serviço migra de canal com chamado anterior e catálogo oficial | Distinguir confirmação independente de autocorroboração | `concept:false-cross-channel-corroboration` | Uma notificação nova é confirmada pela mesma âncora independente | Legítimo |
| P3 — Cadeia interrompida | Parte das relações é conhecida e parte não pode ser confirmada | Conter alto impacto e registrar dependências desconhecidas | `concept:false-cross-channel-corroboration` | Uma ligação transcrita oferece nova rota fornecida pela própria cadeia | Inconclusivo |

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Chamado que confirma a si mesmo

| Elemento | Definição |
|---|---|
| Situação inicial | Um aviso por e-mail recomenda abrir um chat; o chat remete a uma página inerte e a um falso número de suporte |
| Canal e artefatos | E-mail, chat textual, descrição inerte de página/QR, transcrição de chamada e catálogo oficial fictício |
| Identidade ou pretexto | Central de suporte que alega responder a um incidente urgente |
| Objetivo do atacante ou hipótese legítima | Obter aprovação de acesso ou compartilhamento de código por uma cadeia inteiramente controlada |
| Pressões e aparências | Vários canais coerentes, número de chamado, linguagem técnica e risco de bloqueio |
| Evidências disponíveis | Horários, campo “obtido de”, endereços completos, catálogo conhecido e um evento legítimo não relacionado |
| Evidência decisiva ou limite de certeza | Chat, página e telefone foram todos fornecidos pelo primeiro e-mail; quantidade de canais não cria independência |
| Confirmação independente | Abrir o catálogo sintético por uma rota previamente conhecida e comparar o chamado |
| Ação segura | Interromper a cadeia, negar ação sensível, preservar eventos e usar a rota oficial |
| Reporte ou recuperação | Montar relato factual com sequência, origem e ação solicitada |
| Transferência curta | O QR descrito aponta ao mesmo domínio do e-mail; continua sendo um ramo da mesma origem |
| Debrief | Diferencia repetição, referência cruzada e confirmação independente |
| Conteúdo fictício necessário | Oito eventos textuais, grafo declarativo, domínios `.example` e fragmentos de reporte |

### Percurso P2 — Mudança de canal documentada

| Elemento | Definição |
|---|---|
| Situação inicial | Uma ferramenta de serviço migra o atendimento para outro canal após manutenção programada |
| Canal e artefatos | Aviso interno, chamado anterior, chat novo e catálogo oficial sintético |
| Identidade ou pretexto | Equipe de serviço legítima no cenário |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima de mudança planejada |
| Pressões e aparências | Interface nova, domínio diferente e janela de manutenção real |
| Evidências disponíveis | Chamado aberto antes da mudança, catálogo conhecido, datas coerentes e retorno independente |
| Evidência decisiva ou limite de certeza | A nova rota consta na fonte previamente conhecida e não nasceu do contato sob análise |
| Confirmação independente | Consulta ao catálogo e ao chamado anterior |
| Ação segura | Prosseguir pelo processo documentado sem reportar fraude |
| Reporte ou recuperação | Registrar apenas a mudança operacional quando requerido |
| Transferência curta | Uma notificação por outro canal referencia o mesmo chamado oficial já validado |
| Debrief | Mostra que mudança de canal é verificável e pode ser legítima |
| Conteúdo fictício necessário | Seis eventos, catálogo, chamado e histórico de manutenção |

### Percurso P3 — Cadeia interrompida

| Elemento | Definição |
|---|---|
| Situação inicial | E-mail, mensagem e transcrição de chamada compartilham detalhes, mas a origem de um dos eventos não pode ser demonstrada |
| Canal e artefatos | Linha temporal textual, metadados simplificados e fonte oficial temporariamente indisponível |
| Identidade ou pretexto | Suporte e gestor alegados em canais relacionados |
| Objetivo do atacante ou hipótese legítima | Ataque coordenado e comunicação legítima permanecem hipóteses possíveis |
| Pressões e aparências | Repetição, tom urgente e detalhes consistentes |
| Evidências disponíveis | Relações conhecidas, arestas não comprovadas e rota de escalonamento |
| Evidência decisiva ou limite de certeza | Não há âncora suficiente para liberar a ação de alto impacto |
| Confirmação independente | Tentativa registrada por rota conhecida, sem simular uma resposta inexistente |
| Ação segura | Negar ou adiar a ação sensível, preservar fatos e escalar a incerteza |
| Reporte ou recuperação | Relato usa “não confirmado” e lista a dependência que falta |
| Transferência curta | Uma ligação transcrita fornece outro número; a nova rota deriva do próprio contato e não encerra a incerteza |
| Debrief | Explica que contenção proporcional não exige declarar fraude |
| Conteúdo fictício necessário | Sete eventos, estados de certeza e fragmentos factuais |

## 6. Mecânica e diferenciação

- **Interação central:** examinar uma linha temporal, marcar `obtido de`, `refere-se a` e nível de certeza, montar relações causais e escolher onde interromper a cadeia.
- **Por que combina com o comportamento:** o risco está na dependência escondida entre canais, não em uma mensagem individual.
- **Como se distingue das outras 21 atividades:** **Central de mensagens** verifica continuidade de várias identidades; esta Simulação reconstrói uma cadeia causal única que atravessa canais e controles.
- **O que é reutilizável:** shell, ordenação acessível, cartões de evento, tabela de relações, montador de ações/reporte e resultado.
- **O que exige componente novo:** linha temporal multicanal inerte, editor de relações parciais, visualização redundante do grafo e avaliação de arestas críticas.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela por evento com seletores de origem, referência e certeza; botões para alterar posição quando a ordem for relevante.
- **Risco de virar questionário disfarçado e prevenção:** a pessoa constrói e corrige dependências; não recebe uma lista de pistas seguida de “é golpe?”.

O avaliador não exige uma única ordem total quando dois eventos puderem ocorrer em paralelo. Somente precedências e relações críticas publicadas entram na nota.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contexto, canais representados, privacidade e ausência de mídia real | Iniciar | Pacote e versão válidos | Início e pacote | Sem revelar resultado | `h1` focado e resumo |
| Investigação | Eventos inicialmente ordenados por recepção, não por causa | Inspecionar metadados e anotar relações | Livre exploração | Evidências consultadas | Confirma abertura, não acerto | Lista cronológica |
| Decisão inicial | Possíveis origens e referências | Relacionar eventos e marcar certeza | Toda aresta usa IDs permitidos | Mapa provisório | Sem feedback de correção | Tabela com seletores |
| Consequência | Fonte consultada ou retorno factual | Atualizar relações e escolher âncora | Conteúdo liberado depende da rota, não da correção | Fonte consultada | Região de status factual | Texto equivalente |
| Revisão | Mapa, lacunas e possíveis pontos de interrupção | Corrigir relações e ação | Ação sensível precisa de destino | Rascunho revisado | Aviso de incompletude | Resumo linear por evento |
| Decisão final | Âncora, interrupção e fragmentos de relato | Confirmar | Contrato válido | Resposta bruta | Sem nota antecipada | Resumo antes de enviar |
| Transferência | Evento curto em outro canal | Classificar sua dependência | Uma relação e ação | Decisão de transferência | Sem acerto antecipado | Artefato textual |
| Resultado | Nota, arestas críticas e controles | Consultar feedback | Tentativa válida | Resultado derivado | Privado | Tabela de critérios |
| Debrief | Fato, indício, hipótese, limite e resposta | Rever ou repetir | Repetição cria tentativa nova | Intenção de repetir | Explicação completa | Sequência textual |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem rascunho/tentativa | Apresentação e iniciar | Progresso oficial Não iniciada | `h1` e descrição |
| Em andamento | Pacote aberto | Linha, mapa, fontes e decisões | Pacote, eventos, relações e escolhas | Foco e progresso textual |
| Retomada | Rascunho compatível | Resumo de eventos e relações já preenchidas | Mesma versão e pacote | Anúncio do ponto retomado |
| Revisão | Arestas e ação provisórias registradas | Mapa completo editável | Rascunho preservado | Cabeçalhos e links internos |
| Concluída | Tentativa válida salva | Resultado, debrief e repetição | Progresso oficial Concluída | Foco no resultado |
| Repetição | Já concluída | Pacote alternativo quando disponível | Melhor e última separadas | Aviso de recompensa única |
| Conteúdo indisponível | Pacote/versão ausente | Retorno ao hub | Sem tentativa | Status e foco |
| Resposta inválida | Aresta ou opção desconhecida/incoerente | Corrigir sem perder dados | Sem conclusão | Alerta associado |
| Falha ao salvar | Persistência recusada | Tentar novamente | Sem recompensa | Alerta e contexto preservado |

Somente Não iniciada, Em andamento e Concluída são estados oficiais de progresso.

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Reconstrução de dependências | 30 | Registra todas as arestas críticas e lacunas sem inventar relação | Identifica origem comum, com uma relação secundária ausente | Trata coincidência temporal ou referência como independência | Observar, Verificar |
| Âncora independente | 30 | Escolhe fonte conhecida fora da cadeia | Escolhe fonte plausível, mas com dependência parcial | Usa rota fornecida pela própria solicitação | Verificar |
| Interrupção e ação | 25 | Interrompe alto impacto e prossegue no caso legítimo confirmado | Evita dano, mas contém ou escalona em excesso | Aprova, envia código, segue destino ou paralisa tudo | Decidir, Recuperar |
| Falso positivo e relato | 15 | Relata fato, origem, lacuna e ação sem acusar além da prova | Relato seguro, porém incompleto | Reporta todo canal, apaga evidência ou declara autoria | Reportar, Orientar |

Os pesos somam 100. Não há pontuação por velocidade, quantidade de canais ou número de nós desenhados.

### 9.1 Controles críticos

- nenhuma rota fornecida pela cadeia pode ser contada como âncora independente;
- ação sensível permanece interrompida enquanto a independência não for estabelecida;
- evidências e ordem factual não podem ser apagadas para “resolver” o incidente;
- caso legítimo confirmado não deve ser reportado como ataque;
- caso inconclusivo exige linguagem factual e limite explícito.

`needsReview` é verdadeiro abaixo de 60 pontos ou com falha em qualquer controle crítico.

### 9.2 Resultado privado

O resultado apresenta nota, quatro parcelas, mapa esperado e mapa do funcionário em formato textual, arestas críticas, âncora escolhida, ação, fragmentos de relato, competências, `needsReview` e recompensa potencial. Nenhum grafo, canal, nota ou decisão individual integra o agregado de equipe.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 70 pontos de Simulação, sujeita à aprovação da versão executável.
- **Bônus:** somente regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** não há versão executável; o card `multichannel` não é uma tentativa nem uma chave de recompensa.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendações.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | ID futuro publicado | Sim | catálogo autoritativo | não inferir de `multichannel` |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | seleção do servidor |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar tempo |
| `inspectedEventIds` | IDs únicos | Sim | interação | subconjunto do pacote |
| `relationEdges` | origem, alvo e tipo permitido | Sim | interação | arestas únicas, sem nós externos |
| `certaintySelections` | nível publicado por relação crítica | Sim | interação | não aceitar certeza fora da allowlist |
| `independentAnchorId` | fonte publicada ou estado “indisponível” | Sim | interação | coerente com o pacote |
| `interruptionActionIds` | IDs únicos e ordenação parcial quando aplicável | Sim | interação | somente controles publicados |
| `reportFragmentIds` | IDs predefinidos | Quando houver relato | interação | sem texto livre ou segredo |
| `transferDecision` | relação, certeza e ação | Sim | transferência | allowlist própria |

Nota, feedback, competências e recompensa são derivados.

### 11.1 Invariantes

- todos os IDs pertencem à versão e ao pacote;
- arestas rejeitam duplicatas, auto-relação inválida e nós extras;
- o avaliador usa relações críticas e não exige ordem total inexistente;
- âncora dependente da cadeia não pode ser declarada independente;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é `no-op`;
- tentativa nova não duplica recompensa;
- conteúdo, contrato e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Persistir o mínimo para retomada: versão, pacote, eventos inspecionados, arestas, certeza, âncora, ação e fragmentos. A tentativa concluída inclui resposta bruta, resultado derivado e `isAuthoritative: false`.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists de nós/arestas, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Não existe consulta a e-mail, chat, telefonia, QR, página ou catálogo reais.

### Compatibilidade

- mudança semântica exige `activityVersion` nova;
- nova união persistida exige análise de `APP_SCHEMA_VERSION`;
- IDs locais de card não são convertidos em registros de tentativa;
- migrações preservam progresso, pontos, preferências e evidências existentes;
- rascunho exige versão, pacote e grafo compatíveis;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Local, não autoritativa | Própria tentativa | Nunca | Somente minimizada e autorizada |
| Nota e feedback | Melhor e última | Privados | Nunca | Preferir agregado |
| Competências | Derivadas | Privadas | Cobertura agregada | Agregado com limiar |
| Recompensa | Chave e valor | Titular | Nunca | Auditoria |
| Agregado | Reivindicação mínima, se adotada | Resumo | Sem canais/arestas | Coorte autorizada |

Todos os eventos são fictícios e inertes. Domínios usam `.example`; números, IDs de chamado e contas são mascarados. Não há link, QR ativo, mídia, telefonema, código, credencial, chat, alteração, pagamento ou reporte real. O player nunca afirma que bloqueou conta, encerrou sessão ou comunicou uma equipe externa.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- linha temporal como lista ordenada semântica, com horários e canais em texto;
- relações também disponíveis em tabela por origem, alvo, tipo e certeza;
- operação integral por teclado;
- botões Mover/Subir/Descer se a ordem puder ser ajustada, com posição anunciada;
- nenhuma aresta depende somente de cor, linha ou posição;
- transcrições completas substituem chamadas; descrições textuais substituem QR e página;
- mensagens novas em região de status sem mover foco;
- `fieldset` e `legend` para controles;
- contraste, texto ampliado, movimento reduzido e sem limite de tempo;
- linguagem sem culpa;
- desktop agora; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Artefatos textuais e pacotes declarativos | Grafo causal e precedências parciais | P0: registro/allowlist |
| Interface | Shell, timeline e montador | Ambiente multicanal e mapa redundante | P1/P2: timeline + relações |
| Contrato e avaliador | Validação determinística | Arestas críticas e dependência | P0: validar → avaliar → persistir |
| Estado e provider | Tentativas e progresso | Rascunho de grafo | Rejeição antes da avaliação |
| Persistência | Envelope/migrações | União de arestas e retomada | Análise de schema |
| Integrações | Perfil/histórico | Nova atividade/rota | IDs ainda não definidos |
| Testes | Regras/renderização | Grafo, ordem parcial, teclado e leitor | Harness P0 |

Esforço relativo: **EG**, predominantemente P2, após P0 e os componentes P1 de linha temporal e mapa de relações. Não é cronograma.

### 15.1 Riscos específicos e mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| Mapa afirmar causalidade que o caso não prova | Ensina certeza artificial | Relações parciais, nível de certeza e lacuna explícita |
| Grafo visual inacessível | Parte essencial fica indisponível | Tabela canônica completa; linhas são apenas redundância |
| Muitos canais virarem ruído | A mecânica mede memória, não proveniência | Limitar eventos e avaliar apenas arestas críticas |
| Áudio ou vídeo ampliar escopo | Qualidade, direitos e detecção de artefato desviam o objetivo | Primeira versão textual; mídia só com equivalente e revisão futura |
| Pacotes combinatórios inconsistentes | Avaliador e narrativa divergem | Pacotes editoriais fechados, versionados e testados |

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, nós, arestas e opções por allowlist;
- ordem parcial aceita e arestas críticas avaliadas;
- rota dependente nunca conta como âncora;
- casos malicioso, legítimo e inconclusivo;
- avaliador integral, parcial, inseguro e inválido;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada, repetição e recompensa idempotente;
- persistência, retomada, migração e quarentena;
- privacidade de agregado;
- Perfil, atividade recente e recomendação;
- rota própria futura sem queda silenciosa no hub;
- teclado, foco, tabela equivalente e anúncios.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- relações paralelas não exigem ordem arbitrária;
- caso legítimo não produz falso reporte;
- caso inconclusivo preserva a lacuna;
- nenhum feedback de acerto antes do resultado;
- teclado, leitor de tela, foco, contraste, texto ampliado e movimento reduzido;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:email-bombing-support` | Banco de casos | Limites de volume, alternativa acessível e conteúdo sem dano | Pode transformar a interface em sobrecarga artificial |
| `concept:virtual-meeting-bec` | Banco de casos | Transcrição/equivalente textual, qualidade, direitos e política aprovados | A primeira versão não usa áudio ou vídeo e não pontua detecção de artefato |

Uma futura reunião virtual deverá avaliar confirmação e processo, nunca capacidade de reconhecer voz ou vídeo falso. O debrief pode explicar essa limitação sem criar pontuação.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes e o número máximo de eventos;
- aprovar a ontologia mínima de arestas e níveis de certeza;
- decidir a apresentação visual do mapa sem comprometer a tabela canônica;
- aprovar pesos, corte de 60 e controles críticos;
- definir `activityId`, rota e versão apenas na conversão técnica;
- decidir política de retomada de grafos parcialmente preenchidos.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Linha multicanal, grafo causal e três pacotes propostos | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | Termos “corroboração” e “autocorroboração” normalizados em NFC | Documentada | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
