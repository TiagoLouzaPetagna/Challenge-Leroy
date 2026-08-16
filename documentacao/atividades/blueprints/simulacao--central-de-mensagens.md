# Central de mensagens

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** existe somente como item planejado identificado localmente por `message-center`; não possui experiência, contrato, versão pública ou rota própria.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Simulação |
| Comportamento principal aprovado | Verificar a continuidade de identidade em conversas paralelas antes de atender uma solicitação sensível |
| Mecânica-base aprovada | Central textual de conversas com livro de identidade, canal e origem de confirmação |
| Estado da atividade atual | Planejada no hub; não disponível como atividade |
| Relação com implementação existente | Atividade nova; o card atual é apenas referência editorial e não constitui integração |
| `activityId`, versão e rota | Não definidos; `message-center` não deve ser promovido automaticamente a identificador público |
| Duração-alvo | 9 a 12 minutos |
| Regra de recompensa considerada | 70 pontos-base de Simulação e bônus transversal, não ativados por este blueprint |
| Conceitos proprietários | 7, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md) |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes iniciais que usam o mesmo livro de continuidade;
- um caso malicioso, um legítimo e um inconclusivo;
- confirmação registrada pela origem da informação, não apenas pelo texto recebido;
- decisão final proporcional por conversa, sem feedback de acerto durante o pacote;
- fronteira clara com a reconstrução de uma conversa única em **A conversa já estava acontecendo**.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão executável e rota;
- nome técnico do card e eventual migração do identificador local;
- quantidade final de conversas simultâneas após teste de carga cognitiva;
- formato visual definitivo do livro de continuidade;
- ordem de implementação, publicação e ativação de recompensa.

## 2. Contrato educacional

- **Comportamento observável:** relacionar identidade alegada, conta ou número atual, âncora previamente verificada, pedido e fonte de confirmação antes de prosseguir, reter ou reportar.
- **Técnicas ou objetivos do atacante:** phishing por mensageria, troca de número, personificação de contato conhecido e migração induzida para um canal controlado.
- **Atalho inseguro enfrentado:** acreditar que conhecer nomes, histórico ou assunto prova quem controla a conta atual.
- **Resposta segura generalizável:** tratar mudança de canal como uma nova condição de confiança e confirmar por uma rota já conhecida ou por processo independente.
- **O que a conclusão permite afirmar:** como a pessoa verificou continuidade e agiu neste conjunto de conversas.
- **O que não permite afirmar:** que uma conta real foi comprometida, que toda mudança de número é fraude ou que a competência permanecerá em outros contextos.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:messaging-phishing` | Núcleo | Primeira versão | Solicitações por conversa que exigem origem e contexto antes da ação | P1, P2 e P3 |
| `concept:new-number-scam` | Complementar | Primeira versão | Mudança de número como hipótese a verificar, não veredito | P1, P2 e P3 |
| `concept:external-collaboration` | Variação de caso | Banco de casos | Convite ou contato externo em espaço colaborativo | Banco de casos |
| `concept:cloned-social-profile` | Variação de caso | Banco de casos | Perfil visualmente copiado com controle diferente | Banco de casos |
| `concept:angler-phishing` | Variação de caso | Banco de casos | Falso atendimento que intercepta pedido público | Banco de casos |
| `concept:smishing` | Variação de caso | Banco de casos | Mensagem curta por SMS como outro canal | Banco de casos |
| `concept:platform-migration` | Transferência | Banco de casos | Reaplicação do comportamento ao convite para trocar de plataforma | Banco de transferência |

## 4. Arquitetura da primeira versão

Uma tentativa recebe apenas um pacote. Todos usam um Núcleo e um Complementar formal.

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Número novo, pedido antigo | Conversas paralelas incluem um colega que reaparece por outro número | Confirmar a continuidade antes de atender pedido sensível | `concept:new-number-scam` | A mesma identidade solicita continuação em um canal textual diferente | Malicioso |
| P2 — Troca legítima confirmada | Um contato realmente mudou de número e seguiu o processo | Confirmar a mudança sem acusar nem bloquear trabalho legítimo | `concept:new-number-scam` | Outro contato altera somente o dispositivo, mantendo uma âncora válida | Legítimo |
| P3 — Sem rota disponível agora | O pedido é plausível, mas a âncora independente está temporariamente indisponível | Manter a ação segura e registrar a lacuna | `concept:new-number-scam` | Um segundo canal repete o pedido sem fornecer independência | Inconclusivo |

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Número novo, pedido antigo

| Elemento | Definição |
|---|---|
| Situação inicial | Quatro conversas aguardam resposta; uma começa com “troquei de número” e referencia um projeto real do cenário |
| Canal e artefatos | Mensagens textuais, cartão de contato atual, registro anterior e diretório fictício |
| Identidade ou pretexto | Colega conhecido que alega estar sem acesso ao número corporativo |
| Objetivo do atacante ou hipótese legítima | Obter envio de informação ou aprovação de uma ação por um canal controlado |
| Pressões e aparências | Familiaridade, assunto correto, pedido de sigilo e urgência moderada |
| Evidências disponíveis | Número atual, número anterior, histórico parcial, diretório e fonte de cada dado |
| Evidência decisiva ou limite de certeza | O número anterior e o diretório não reconhecem a mudança; detalhes conhecidos não provam controle |
| Confirmação independente | Consulta simulada ao número anterior ou a outro registro já conhecido |
| Ação segura | Reter a ação, encerrar a dependência do número novo e reportar a personificação com fatos |
| Reporte ou recuperação | Fragmentos registram identidade alegada, número mascarado, pedido e rota de verificação, sem transcrever dado sensível |
| Transferência curta | O mesmo pedido chega por chat de projeto; ambos os canais derivam do contato novo e não se confirmam entre si |
| Debrief | Separa conhecimento contextual de controle do canal |
| Conteúdo fictício necessário | Quatro conversas, contatos mascarados, diretório inerte e fragmentos de reporte |

### Percurso P2 — Troca legítima confirmada

| Elemento | Definição |
|---|---|
| Situação inicial | Uma fornecedora informa novo número entre outras três conversas normais |
| Canal e artefatos | Conversas textuais, cadastro anterior e chamado de atualização |
| Identidade ou pretexto | Contato conhecido com mudança registrada pelo processo do cenário |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima de substituição de número |
| Pressões e aparências | Mensagem curta e número desconhecido, sem outro sinal decisivo |
| Evidências disponíveis | Chamado aberto por rota oficial, retorno pelo contato anterior e data de vigência |
| Evidência decisiva ou limite de certeza | Duas fontes independentes confirmam a mudança; o número desconhecido isolado não prova fraude |
| Confirmação independente | Consulta simulada ao chamado e ao contato anterior |
| Ação segura | Atualizar o livro de continuidade e prosseguir pelo fluxo normal |
| Reporte ou recuperação | Não reportar fraude; registrar apenas a atualização autorizada se o processo exigir |
| Transferência curta | Um colega troca de aparelho, mas mantém conta e confirmação por diretório |
| Debrief | Explica por que verificar não significa suspeitar de toda mudança |
| Conteúdo fictício necessário | Quatro conversas, chamado sintético, datas e números mascarados |

### Percurso P3 — Sem rota disponível agora

| Elemento | Definição |
|---|---|
| Situação inicial | Um contato conhecido escreve de outro número enquanto a fonte de confirmação está indisponível no cenário |
| Canal e artefatos | Conversa textual, diretório em manutenção e registro anterior |
| Identidade ou pretexto | Pessoa conhecida alegando perda do aparelho |
| Objetivo do atacante ou hipótese legítima | Tanto fraude quanto troca legítima continuam plausíveis |
| Pressões e aparências | Pedido simples que levaria a informação interna, referência correta e prazo curto |
| Evidências disponíveis | Histórico incompleto, número novo e estado indisponível das fontes |
| Evidência decisiva ou limite de certeza | Não existe evidência suficiente para autenticar ou acusar |
| Confirmação independente | Rota definida para tentativa posterior ou escalonamento autorizado, sem simular sucesso |
| Ação segura | Manter o pedido suspenso, registrar a lacuna e encaminhar por processo apropriado |
| Reporte ou recuperação | Relato factual de tentativa não confirmada; sem rotular o contato como invasor |
| Transferência curta | A identidade repete o pedido por outro canal criado a partir da conversa inicial; continua inconclusivo |
| Debrief | Demonstra que repetir o pedido em dois canais dependentes não produz duas confirmações |
| Conteúdo fictício necessário | Quatro conversas, estados de indisponibilidade e opções estruturadas de escalonamento |

## 6. Mecânica e diferenciação

- **Interação central:** alternar entre conversas e preencher um livro estruturado com identidade alegada, canal atual, âncora anterior, pedido, fonte de cada confirmação e ação proporcional.
- **Por que combina com o comportamento:** a decisão depende de continuidade e proveniência distribuídas, não de uma pista em uma mensagem.
- **Como se distingue das outras 21 atividades:** **A conversa já estava acontecendo** reconstrói uma única thread possivelmente comprometida; esta Simulação administra várias conversas e o estado de confiança entre identidades e canais.
- **O que é reutilizável:** shell, cartões de mensagem, seletores, mapa de relações em formato tabular, montador de reporte e resultado.
- **O que exige componente novo:** central de conversas paralelas, livro de continuidade e desbloqueio factual por rota consultada.
- **Alternativa sem arrastar, mídia ou representação espacial:** lista de conversas e tabela editável por seletores; nenhuma ligação visual é exclusiva.
- **Risco de virar questionário disfarçado e prevenção:** a pessoa constrói relações e escolhe fontes; a decisão final é consequência desse registro, não uma sequência “verdadeiro ou falso”.

Novas mensagens podem aparecer depois de uma consulta simulada, mas somente como consequência factual. A interface não confirma acerto até o resultado do pacote.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contexto, privacidade e explicação do livro de continuidade | Iniciar pacote | Pacote autorizado | Início e pacote | Sem distribuição de resultados | Título focado e resumo |
| Investigação | Quatro ou cinco conversas paralelas | Ler, selecionar conversa e registrar identidade/canal/pedido | Livre navegação entre conversas | Relações provisórias | Confirma apenas edição | Lista e tabela linear |
| Decisão inicial | Rotas de confirmação possíveis | Escolher fonte para cada conversa sensível | Fonte precisa existir no pacote | Rota consultada | Mostra fato obtido, não correção | `fieldset` e descrição da fonte |
| Consequência | Retorno sintético da fonte escolhida | Atualizar confiança e ação | Apenas conteúdo versionado é liberado | Evidência e proveniência | Região de status factual | Texto em ordem cronológica |
| Revisão | Livro completo e conversas com lacunas | Corrigir relações e marcar lacuna explícita | Todo pedido sensível precisa de ação provisória | Rascunho revisado | Avisos de ausência | Resumo navegável por conversa |
| Decisão final | Prosseguir, reter, verificar ou reportar | Confirmar ações | Validação de relações e ações | Resposta bruta | Sem nota antecipada | Resumo antes de enviar |
| Transferência | Minicaso em outro canal | Identificar se a nova rota é independente | Uma decisão estruturada | Relação e ação | Sem acerto antecipado | Artefato textual |
| Resultado | Nota e decomposição | Consultar feedback | Tentativa válida | Resultado derivado | Privado e sem culpa | Tabela de critérios |
| Debrief | Fatos, indícios, hipóteses, limites e processo | Rever ou repetir | Repetição usa nova tentativa | Intenção de repetir | Explicação completa | Conteúdo linear |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa ou rascunho | Apresentação e iniciar | Progresso oficial Não iniciada | `h1` e resumo da mecânica |
| Em andamento | Pacote aberto | Conversas, livro, fontes e revisão | Pacote, conversa atual e relações | Foco e progresso textual |
| Retomada | Rascunho compatível | Resumo das conversas tratadas e continuar/recomeçar | Mesmo pacote e versão | Anúncio do ponto retomado |
| Revisão | Todas as conversas receberam ação provisória | Livro completo editável | Rascunho preservado | Cabeçalhos e links por conversa |
| Concluída | Tentativa válida salva | Resultado, debrief e repetir | Progresso oficial Concluída | Foco no título do resultado |
| Repetição | Já concluída | Pacote ainda não visto quando disponível | Melhor e última tentativa separadas | Aviso de recompensa única |
| Conteúdo indisponível | Pacote/versão ausente | Retornar ao hub | Sem tentativa | Status e foco na mensagem |
| Resposta inválida | Relação, opção ou campo incoerente | Corrigir sem perder rascunho | Sem conclusão | Alerta associado ao campo |
| Falha ao salvar | Persistência falha | Tentar novamente | Sem recompensa | Alerta persistente e contexto preservado |

Somente Não iniciada, Em andamento e Concluída aparecem como progresso oficial.

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Continuidade e proveniência | 30 | Relaciona corretamente identidade, canal, pedido e origem de cada dado | Mantém relações principais com uma lacuna não crítica | Trata nome, foto ou detalhe conhecido como autenticação | Observar, Verificar |
| Verificação independente | 30 | Usa âncora anterior ou processo independente | Escolhe fonte útil, mas incompleta | Confirma pelo próprio número novo ou canal dele derivado | Verificar |
| Ação proporcional | 25 | Prossegue, retém ou reporta conforme a evidência | Evita dano, porém bloqueia ou reporta em excesso | Atende pedido sensível sem confirmar ou acusa sem base | Decidir, Recuperar |
| Falso positivo e minimização | 15 | Preserva caso legítimo e relata somente fatos necessários | Uma ação excessiva sem exposição | Compartilha dado, reporta tudo ou inventa certeza | Reportar, Orientar |

Os pesos somam 100. A conclusão não depende da nota; velocidade não pontua.

### 9.1 Controles críticos

- pedido sensível não pode ser atendido antes de confirmação independente;
- a mesma conta, o mesmo número novo ou canal criado por ele não conta como confirmação;
- o caso inconclusivo deve permanecer suspenso ou encaminhado, sem acusação;
- o caso legítimo não pode ser reportado apenas porque o número mudou;
- nenhum fragmento de reporte pode incluir segredo ou dado desnecessário.

`needsReview` é verdadeiro abaixo de 60 pontos ou quando um controle crítico falha.

### 9.2 Resultado privado

O resultado apresenta nota, quatro critérios, livro comparado com o processo esperado, fontes dependentes identificadas, ação por conversa, competências, `needsReview`, debrief e recompensa potencial. Nenhuma conversa, relação, nota ou recomendação individual é exposta à equipe.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 70 pontos de Simulação, sujeita à aprovação da futura versão executável.
- **Bônus:** aplicar somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** não existem tentativas executáveis desta atividade; o card local não cria direito a migração ou recompensa.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendações.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo aprovado.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | ID futuro publicado | Sim | catálogo autoritativo | não usar automaticamente `message-center` |
| `activityVersion` | versão futura publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | seleção do servidor |
| `completedAt` | data válida | Sim | servidor no uso real | sem pontuação por tempo |
| `identityLedgerEntries` | lista de `conversationId`, `claimedIdentityId`, `channelId` e `requestId` | Sim | interação | uma entrada por conversa |
| `trustAnchorSelections` | fonte e alvo por conversa | Sim quando houver pedido sensível | interação | somente IDs publicados |
| `consultedSourceIds` | lista sem duplicatas | Sim | interação | origem deve existir no pacote |
| `finalActionSelections` | ação e nível de certeza por conversa | Sim | interação | todas as conversas tratadas |
| `reportFragmentIds` | IDs predefinidos | Quando houver reporte | interação | sem texto livre ou segredo |
| `transferDecision` | relação, fonte e ação | Sim | transferência | allowlist do minicaso |

Nota, competências, feedback, recompensa e `needsReview` são derivados.

### 11.1 Invariantes

- IDs pertencem à versão e ao pacote publicados;
- cada conversa possui exatamente uma entrada e uma ação final;
- listas rejeitam duplicatas e valores extras;
- fonte derivada do contato sob verificação não pode ser marcada como independente;
- estado inconclusivo não pode declarar identidade confirmada;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é `no-op`;
- tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Salvar o mínimo para retomada: versão, pacote, conversa atual, livro, fontes consultadas, ações e transferência. A tentativa concluída guarda resposta bruta, resultado derivado e `isAuthoritative: false`.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Nenhum diretório ou mensageria real é consultado; conteúdo corporativo futuro precisa de publicação autorizada e versionada.

### Compatibilidade

- mudança semântica exige `activityVersion` nova;
- nova forma persistida exige análise de `APP_SCHEMA_VERSION`;
- o identificador local do card não pode ser reinterpretado como tentativa;
- migrações preservam progresso, pontos, preferências e evidências existentes;
- rascunho só retoma com pacote e avaliador compatíveis;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Local, não autoritativa | Própria tentativa | Nunca | Somente política autorizada e minimizada |
| Nota e feedback | Melhor e última | Privados | Nunca | Preferir agregado |
| Competências | Evidência derivada | Privadas | Cobertura agregada | Agregado com limiar |
| Recompensa | Chave e valor | Visível ao titular | Nunca | Auditoria de concessão |
| Agregado | Reivindicação mínima, se adotada | Resumo | Sem conteúdo das conversas | Coorte autorizada |

Não usar nomes, números, perfis, conversas ou diretórios reais. Contatos são mascarados, domínios usam `.example` e mensagens são predefinidas. O player não envia mensagem, abre conta, chama número, consulta serviço, bloqueia perfil ou produz reporte real.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco após transição;
- lista de conversas com remetente alegado, canal, estado e pedido anunciados em texto;
- livro de continuidade em tabela semântica ou grupos equivalentes;
- operação integral por teclado;
- relações escolhidas por seletores, sem exigir linhas gráficas;
- `fieldset` e `legend` para fonte, certeza e ação;
- novas mensagens anunciadas sem mover foco inesperadamente;
- feedback e erro em regiões adequadas, preservando o contexto;
- contraste, texto ampliado e movimento reduzido;
- sem limite de tempo, áudio ou vídeo;
- linguagem sem culpa;
- desktop agora; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Cartões e cenários declarativos | Pacotes de conversas e relações | P0: registro e allowlist |
| Interface | Shell, mensagens e resultado | Central paralela e livro de continuidade | P1: mapa de relações acessível |
| Contrato e avaliador | Validadores determinísticos | Avaliação de proveniência e dependência | P0: validar → avaliar → persistir |
| Estado e provider | Tentativas/progresso comuns | Rascunho relacional e desbloqueios | Provider rejeita antes de avaliar |
| Persistência | Envelope atual | União e retomada específicas | Análise de schema |
| Integrações | Perfil e histórico | Registro de nova rota/atividade | IDs ainda não definidos |
| Testes | Regras e renderização | Conversas paralelas, teclado e leitor de tela | Harness P0 |

Esforço relativo: **G**, em P1 para mapa/livro e P2 para pacotes e retomada.

### 15.1 Riscos específicos e mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| Ensinar que número novo é sempre fraude | Produz falso positivo e bloqueia trabalho legítimo | P2 legítimo e nota baseada na fonte, não na mudança |
| Confirmação pela mesma pessoa em outro canal | Autocorroboração parece independente | Registrar origem de cada rota e aplicar controle crítico |
| Livro de continuidade ficar complexo | Carga cognitiva compete com a aprendizagem | Quatro ou cinco conversas, campos mínimos e resumo linear |
| Foto, nome ou perfil induzir julgamento visual | Reforça pista fraca e viés | Conteúdo textual, identidades fictícias e aparência sem valor de prova |
| Nova mensagem revelar o gabarito | Avaliação vira sequência guiada | Liberar somente fatos coerentes com a fonte consultada |

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote e opções por allowlist;
- casos malicioso, legítimo e inconclusivo;
- relação dependente nunca contada como confirmação independente;
- avaliador integral, parcial, inseguro e inválido;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada, repetição e recompensa idempotente;
- persistência, retomada, migração e quarentena;
- privacidade do agregado;
- Perfil, atividade recente e recomendação;
- rota própria futura sem queda silenciosa no hub;
- teclado, foco, anúncios de nova mensagem e tabela equivalente.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- mudança legítima pode prosseguir sem reporte de fraude;
- ausência de fonte mantém o estado inconclusivo;
- nova mensagem não revela o gabarito;
- teclado, leitor de tela, foco e anúncios;
- alto contraste, texto ampliado e movimento reduzido;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:external-collaboration` | Banco de casos | Modelo acessível de espaço externo e política autorizada | A primeira versão foca continuidade de contato |
| `concept:cloned-social-profile` | Banco de casos | Perfis fictícios sem imitar pessoas ou marcas reais | Exige curadoria visual e controle de falso positivo |
| `concept:angler-phishing` | Banco de casos | Cenário de atendimento com origem independente verificável | Depende de contexto público adicional |
| `concept:smishing` | Banco de casos | Representação textual acessível e números mascarados | É variação de canal, não novo objetivo |
| `concept:platform-migration` | Banco de transferência | Caso que preserve o comportamento de verificar continuidade | Não é obrigatório em toda tentativa inicial |

O debrief poderá comparar esses canais, mas não declarará que aparência de perfil, SMS ou espaço externo prova fraude.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes e a quantidade inicial de conversas;
- decidir o formato editorial do livro de continuidade;
- aprovar pesos, corte de 60 e controles críticos;
- definir `activityId`, rota e versão somente ao converter para ficha executável;
- decidir se a repetição garante pacote diferente ou apenas prioriza o ainda não visto;
- definir validade e expiração do rascunho.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Livro de continuidade e três pacotes propostos | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
