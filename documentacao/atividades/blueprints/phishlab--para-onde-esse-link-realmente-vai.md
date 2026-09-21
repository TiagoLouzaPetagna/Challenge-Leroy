# Para onde esse link realmente vai?

> **Atualização do portal (2026-09-20):** versão curta v2 disponível em `/phishlab/para-onde-esse-link-realmente-vai`, com quatro decisões sobre texto do botão, destino final, limite da evidência e rota de acesso. O comportamento central foi mantido. Os percursos mais extensos descritos abaixo ainda representam o blueprint anterior à versão curta.

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** planejada; não há ID público, versão executável ou rota disponível definidos.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | PhishLab |
| Comportamento principal aprovado | Comparar o destino observável com a promessa, interromper diante de divergência e usar rota oficial independente. |
| Mecânica-base aprovada | Linha de rastreamento inerte, com nós ordenados e caderno de hipóteses. |
| Estado da atividade atual | Planejada; não existe atividade executável correspondente. |
| Relação com implementação existente | Atividade nova; não substitui nem migra tentativa atual. |
| `activityId`, versão e rota | Não definidos; este blueprint não cria nenhum deles. |
| Duração-alvo | 8 a 10 minutos. |
| Regra de recompensa considerada | 60 pontos-base de PhishLab e bônus transversal, somente após implementação aprovada; não ativada pelo blueprint. |
| Conceitos proprietários | 5, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos e uma mecânica de cadeia totalmente cenográfica;
- distinção entre texto visível, href fornecido pelo caso, saltos e destino final;
- avaliação que premia inspeção relevante, não abertura indiscriminada;
- contrato, estados e limites técnicos.

### 1.2 O que permanece sem decisão técnica

- ID, rota, versão e posição no percurso;
- pacotes finais e quantidade de saltos;
- ativação de recompensa;
- política de rascunho e versão do esquema.

## 2. Contrato educacional

- **Comportamento observável:** identificar divergência entre rótulo e destino, reconstruir a cadeia fornecida e escolher uma origem oficial independente.
- **Técnicas ou objetivos do atacante:** texto de link enganoso, redirecionamentos encadeados e uso de redirecionador aberto.
- **Atalho inseguro enfrentado:** confiar no texto do botão, no primeiro domínio conhecido ou no último nome de marca visto.
- **Resposta segura generalizável:** no trabalho, comparar o destino que o cliente permite observar, interromper e usar a rota oficial; só usar uma ferramenta de expansão quando ela for corporativa e publicada.
- **O que a conclusão permite afirmar:** se a pessoa interpretou a cadeia didática fictícia e escolheu ação proporcional nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente, cadeia real futura, reputação, conteúdo remoto ou segurança do destino.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso | Percurso ou destino |
|---|---|---|---|---|
| `concept:link-text-mismatch` | Núcleo | Primeira versão | Comparar o rótulo com o destino inicial. | P1, P2 e P3 |
| `concept:redirect-chain` | Núcleo | Primeira versão | Reconstruir saltos e localizar mudança relevante de origem. | P1, P2 e P3 |
| `concept:open-redirect` | Complementar | Primeira versão | Mostrar serviço conhecido usado apenas como passagem. | P2 |
| `concept:url-shortener` | Variação de caso | Banco de casos | Aplicar o mesmo processo quando o primeiro destino é encurtado. | Banco B1 |
| `concept:url-obfuscation-advanced` | Debrief ou limite técnico | Debrief | Delimitar representações técnicas que não devem ser decodificadas pelo usuário. | Debrief D1 |

Regras aplicadas:

- todos os cinco conceitos aparecem uma vez, com papel e momento aprovados;
- o conceito de banco não é obrigatório na primeira versão;
- o debrief não gera objetivo, nota ou recompensa própria;
- aplicações secundárias não mudam propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Botão que promete outra coisa | Botão “abrir documento” aponta para origem incompatível e faz dois saltos. | Comparar rótulo, entrada e destino final. | Nenhum (0) | Texto simples exibe o destino integral. | Suspeito e rota própria. |
| P2 — Serviço conhecido no meio | Primeiro salto pertence a serviço conhecido, mas parâmetro conduz a outro domínio. | Não confundir intermediário com destino confiável. | open-redirect (1) | Redirecionador legítimo permanece dentro do processo iniciado. | Suspeito no principal; legítimo no transferido. |
| P3 — Cadeia legítima esperada | Fluxo iniciado usa dois domínios fictícios previamente documentados. | Sustentar decisão pelo registro do processo. | Nenhum (0) | Um salto novo deixa a conclusão inconclusiva. | Legítimo; verificar na mudança. |

Cada percurso possui zero ou um Complementar formal; os dois núcleos formam a mesma ação investigativa.

Cada pacote inclui microcalibração guiada da timeline, não pontuada como caso completo, resolução independente do artefato principal da seção 5 e transferência curta. A cadeia completa é ferramenta didática fornecida pelo pacote, não algo que o funcionário deva descobrir na internet.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Botão que promete outra coisa

| Elemento | Definição |
|---|---|
| Situação inicial | Mensagem não solicitada oferece um documento por botão com marca conhecida. |
| Canal e artefatos | Mensagem, rótulo, destino inicial fictício e cadeia didática pré-calculada. |
| Identidade ou pretexto | Repositório corporativo fictício. |
| Objetivo do atacante ou hipótese legítima | Ocultar uma origem incompatível atrás de rótulo convincente. |
| Pressões e aparências | Botão de marca, convite de colega e pedido de abertura rápida. |
| Evidências disponíveis | Divergência imediata, contexto ausente e destino final incompatível no instrumento didático. |
| Evidência decisiva ou limite de certeza | A cadeia organiza o roteiro do caso, mas não identifica autoria nem prevê um link real. |
| Confirmação independente | Consultar o repositório fictício por favorito. |
| Ação segura | Não abrir; abandonar o link e usar rota oficial. |
| Reporte ou recuperação | Reportar o artefato fictício sem reabrir destino. |
| Transferência curta | Endereço integral substitui o botão; processo permanece igual. |
| Debrief | Texto visível é promessa; o destino observável e o processo oficial orientam a ação. |
| Conteúdo fictício necessário | Nós inertes e domínios `.example`. |

### Percurso P2 — Serviço conhecido no meio

| Elemento | Definição |
|---|---|
| Situação inicial | Link começa em plataforma conhecida e carrega destino externo em parâmetro. |
| Canal e artefatos | Mensagem, linha de saltos, ficha do serviço e registro de atividade. |
| Identidade ou pretexto | Plataforma conhecida usada como intermediária. |
| Objetivo do atacante ou hipótese legítima | Abusar de redirecionador aberto; existe hipótese legítima quando o fluxo foi iniciado e documentado. |
| Pressões e aparências | Primeiro domínio conhecido e continuidade aparente. |
| Evidências disponíveis | Origem intermediária legítima, parâmetro de saída, contexto e destino incompatível. |
| Evidência decisiva ou limite de certeza | Um domínio conhecido em qualquer ponto não valida a cadeia completa. |
| Confirmação independente | Acessar a tarefa pela área oficial fictícia. |
| Ação segura | Abandonar a cadeia e verificar por rota própria. |
| Reporte ou recuperação | Reportar quando a saída não corresponde ao processo publicado. |
| Transferência curta | Fluxo iniciado usa redirecionador previsto e termina na origem cadastrada. |
| Debrief | Intermediário legítimo pode ser apenas passagem; contexto controla falsos positivos. |
| Conteúdo fictício necessário | Pares suspeito e legítimo em `.example`, sem navegação. |

### Percurso P3 — Cadeia legítima esperada

| Elemento | Definição |
|---|---|
| Situação inicial | Funcionário acabou de iniciar autenticação que passa por um provedor fictício. |
| Canal e artefatos | Registro do início, cadeia didática e lista de origens esperadas. |
| Identidade ou pretexto | Provedor de identidade fictício previsto no processo. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima de redirecionamento documentado. |
| Pressões e aparências | Fluxo técnico rápido e familiaridade com o provedor. |
| Evidências disponíveis | Contexto, ordem e destinos coincidem com o registro. |
| Evidência decisiva ou limite de certeza | A legitimidade vale para aquela finalidade, não para pedidos adicionais. |
| Confirmação independente | Conferir o estado na área própria. |
| Ação segura | Prosseguir somente no fluxo iniciado. |
| Reporte ou recuperação | Não reportar automaticamente; parar e verificar se um salto muda. |
| Transferência curta | Um novo salto não documentado exige parar e verificar. |
| Debrief | Cadeia longa não é automaticamente maliciosa; a origem oficial e o contexto são determinantes. |
| Conteúdo fictício necessário | Cadeia legítima e mutação controlada em `.example`. |

Nenhum artefato executa ação real. A timeline usa dados mascarados, nomes fictícios e `.example`.

## 6. Mecânica e diferenciação

- **Interação central:** revelar cartões de salto já contidos no pacote, conectá-los por ordem e rotular cada transição como esperada, saída de origem ou ainda inconclusiva.
- **Por que combina com o comportamento:** a sequência didática torna explícita a diferença entre promessa, destino observável, intermediário e saída.
- **Como se distingue das outras 21 atividades:** investiga sequência e mudança de destino; Domínio sob a lupa disseca uma URL e Uma letra fora do lugar compara grafia.
- **O que é reutilizável:** shell, stepper, revisão, resultado e conteúdo versionado.
- **O que exige componente novo:** timeline ordenável e avaliador de cadeia fictícia.
- **Alternativa sem arrastar, mídia ou representação espacial:** lista numerada com botões Mover/Subir/Descer, origem, causa e próximo destino.
- **Risco de virar questionário disfarçado e prevenção:** a conclusão sem organizar evidências e escolher rota oficial limita a nota; nenhum salto oculto vira condição de acerto.

A cadeia completa é ferramenta didática e organizacional fictícia. Fora do laboratório, o comportamento transferível é comparar o destino que estiver observável, interromper e usar rota oficial; expansão só por ferramenta corporativa publicada.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, segurança, natureza fictícia da cadeia e ausência de cronômetro. | Iniciar ou voltar. | Explícita. | Pacote. | Sem resposta. | Foco no `h1`. |
| Investigação | Microexemplo guiado e depois nós do artefato principal. | Aprender a timeline e organizar independentemente a cadeia principal. | Calibração vista e nós principais usados uma vez. | Ordem, rótulos e ajuda. | Explica termos sem revelar o caso principal. | Lista numerada. |
| Decisão inicial | Cadeia principal montada. | Escolher veredito provisório e rota própria. | Campos completos. | Decisão provisória. | Sinaliza lacunas revisáveis. | `fieldset` e lista. |
| Consequência | Efeito cenográfico da decisão. | Observar resultado sem navegar. | Consequência lida. | Estado simulado. | Reforça a rota oficial. | Texto completo. |
| Revisão | Cadeia principal e decisão provisória. | Editar ordem, rótulos, conclusão ou rota. | Caso principal completo e editável. | Revisões. | Sem acerto antecipado. | Links de foco. |
| Decisão final | Resposta consolidada. | Confirmar ou voltar. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | Mudança de contexto. | Dizer se altera a decisão. | Uma resposta e rota. | Transferência. | Depois do envio. | Texto completo. |
| Resultado | Nota, critérios, competências e recompensa potencial. | Consultar resultado privado. | Aceite. | Derivados. | Evidência, limite e ação. | Lista textual. |
| Debrief | Cadeia esperada e limite da ferramenta. | Comparar e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Distingue laboratório de prática real. | Texto estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Iniciar ou voltar. | Nenhuma. | Foco no título. |
| Em andamento | Cadeia parcial. | Ordenar, revisar, decidir. | Rascunho opcional. | Posição anunciada. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Sem gabarito. | Resumo textual. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Índice de casos. |
| Concluída | Tentativa aceita. | Resultado. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Conclusão anterior. | Nova prática. | Novo attemptId, sem prêmio duplicado. | Regra explícita. |
| Conteúdo indisponível | Pacote ausente. | Voltar. | Nada. | Mensagem explícita. |
| Resposta inválida | Nó duplicado ou fora do pacote. | Corrigir. | Não conclui. | Alerta e foco. |
| Falha ao salvar | Operação falhou. | Repetir envio. | Mantém resposta. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica segue a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores especializam esses eixos para destino e cadeia didática.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidências da cadeia | 30 | Distingue rótulo, entrada, saltos e destino final. | Uma classificação não crítica incorreta. | Decide só pelo texto ou primeiro domínio. | Observar, Investigar |
| Conclusão e limite | 25 | Veredito proporcional e limite explícito. | Veredito seguro com justificativa incompleta. | Confia no intermediário conhecido. | Investigar |
| Rastreamento e rota própria | 20 | Usa timeline e rota independente de modo pertinente. | Cadeia correta com rota genérica. | Tenta abrir o link para verificar. | Verificar |
| Independente e transferência | 25 | Repete sem dica e controla falso positivo. | Usa ajuda sem falha crítica. | Não transfere ou age inseguramente. | Investigar, Verificar |

Regras obrigatórias:

- pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho são separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinal isolado não recebe valor automático de veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- caso legítimo não premia obediência automática.

### 9.1 Controles críticos

- não navegar nem “testar” destinos;
- não validar a cadeia por um único domínio conhecido;
- distinguir o que o rótulo promete do que a representação mostra;
- aceitar inconclusivo quando falta nó observável.

### 9.2 Resultado privado

O resultado privado mostra nota, quatro critérios, cadeia esperada em lista, primeira divergência, decisão, rota segura, competências, recomendação e recompensa potencial. A equipe recebe somente agregado elegível, nunca resposta individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos-base, após aprovação da versão executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** nunca reinterpretar ou premiar novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendações entre Domínio sob a lupa e O destino atrás do QR.
- **Radar:** opcional, com pontuação própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código. Não há ID aprovado; `activityId` abaixo é o valor futuro publicado pelo catálogo, não um identificador criado neste arquivo.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor | idempotente |
| activityId | ID futuro publicado | Sim | catálogo | ainda indefinido |
| activityVersion | versão publicada | Sim | catálogo | compatível |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | sem tempo na nota |
| mainCaseResponse | cadeia, transições, veredito e rota | Sim | interação | resolução independente do artefato principal |
| transferResponse | resposta curta allowlisted | Sim | interação | calibração não é segundo caso |
| orderedNodeIds | lista de nós | Sim | timeline | cobertura exata, sem repetição |
| transitionAssessments | nó e classificação | Sim | investigação | allowlist |
| verdictId | legitimate, suspicious ou inconclusive | Sim | decisão | allowlist |
| safeRouteId | ID de rota fictícia | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- nenhum nó ou destino é fornecido livremente;
- todos os saltos pertencem ao pacote versionado;
- o cliente não calcula nota ou descobre destinos na rede;
- cadeia incompleta não é tratada como resposta completa;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível;
- resultado, competências e recompensa são derivados.

### 11.2 Instrumentação mínima

Eventos: case_started, node_inspected, node_moved, transition_classified, help_opened, answer_revised, submission_requested e submission_result. Guardam apenas IDs allowlisted, versão, etapa e sequência; não guardam URL livre nem determinam a nota.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Requer submissão discriminada e análise de `APP_SCHEMA_VERSION`. Persiste somente retomada, resposta bruta, resultado derivado e progresso; `isAuthoritative` permanece falso.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização e público; publica versão e pacote; valida nós, ordem, transições, opções e etapas por allowlist; deriva avaliação, `needsReview`, competências e feedback; concede recompensa, evidência e contribuição em transação idempotente; mantém auditoria sem URL livre; e aplica retenção e exclusão conforme política. Nunca segue URL fornecida pelo usuário.

### Compatibilidade

Não há tentativa anterior própria. ID, rota e versão dependem de aprovação e catálogo. Estados desconhecidos ficam em quarentena; nenhuma migração inventa cadeia ou premiação.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas sem resposta individual |

Todos os destinos são IDs e textos inertes em `.example`. Não há credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte ou URL real. A interface não faz fetch, preview, DNS, redirecionamento ou abertura; o player não afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, nós, posição e mudança são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- operação e reorganização são integrais por teclado;
- ordenação possui Mover, Subir e Descer e anuncia a nova posição;
- lista numerada equivale ao diagrama; cor, setas e animação são redundantes;
- ilustração ou mídia futura possui texto equivalente e destinos permanecem completos em texto;
- feedback usa região de status e erro usa alerta com foco, sem apagar cadeia ou contexto;
- contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem pontos por rapidez;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo curricular | Cadeias e transições versionadas | P0 |
| Interface | Shell, revisão e resultado | Timeline/lista ordenável acessível | P1 |
| Contrato e avaliador | Envelope e pesos comuns | Resposta de cadeia, ordem, transições e limites | Nova versão |
| Estado e provider | Provider assíncrono | Operação de timeline e revisão | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso | Rascunho, migração e quarentena | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Hub e perfil | Cadastro genérico da atividade | ID aprovado |
| Testes | Contratos, reducer e SSR | Zero rede, teclado, foco e lista equivalente | Harness de navegador |

**Esforço relativo:** G. **Camadas:** P0 e P1; banco rotativo em P2.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, nós, transições e opções por allowlist;
- nó ausente, duplicado, extra e ordem inválida;
- pesos somando 100 e nota limitada;
- casos integral, parcial, legítimo, suspeito e inconclusivo;
- controle crítico, needsReview e ajuda sem desconto automático;
- zero chamada de rede, navegação e URL livre;
- replay, repetição, idempotência e privacidade;
- teclado, foco e equivalência lista/diagrama.

### Manuais no desktop

- concluir P1, P2 e P3 e revisar antes do envio;
- testar leitor de tela, zoom, contraste e movimento reduzido;
- verificar reordenação somente por teclado;
- confirmar ausência de link acionável;
- repetir sem nova recompensa;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| concept:url-shortener | Banco B1 | Casos que não promovam abertura do encurtador | É variação, não novo passo obrigatório |
| concept:url-obfuscation-advanced | Debrief D1 | Texto revisado de limites técnicos | Decodificação avançada não é responsabilidade do usuário final |

O debrief explica que cadeias reais podem depender de navegador, sessão e tempo; por isso o laboratório fornece uma representação segura e não promete previsão universal.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar timeline, três pacotes e critérios de cadeia completa;
- definir ID, rota, versão e posição curricular;
- validar que nenhum texto incentiva abertura;
- aprovar tratamento do banco de encurtadores;
- validar com Segurança, Educação e Acessibilidade.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, timeline inerte e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
