# Cliquei. E agora?

> **Estado do blueprint:** aprovado em 2026-08-15 e implementado como versão 2 em 2026-08-16; validação completa do portal em andamento.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** a versão 2 está disponível na rota histórica; a versão 1 e suas tentativas permanecem legíveis.
>
> **Efeito técnico:** contrato v2, três pacotes publicados, avaliador, estado, persistência v12, player e testes foram conectados.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Montar resposta proporcional ao evento real e reportar sem culpa |
| Mecânica-base aprovada | Linha do incidente + montador Primeiras ações seguras/Ações sob orientação da equipe responsável/Ações que aumentam o risco + construtor de reporte |
| Estado da atividade atual | Disponível na versão 2; validação completa do portal em andamento |
| Relação com implementação existente | Evolução publicada; a versão 1 e suas tentativas permanecem históricas |
| `activityId`, versão e rota | `mission:clicked-now-what`, versão 2, `/missoes/cliquei-e-agora` |
| Duração-alvo | 12 minutos |
| Regra de recompensa considerada | Missão: 100 pontos-base e bônus vigente, uma vez pela chave histórica |
| Conceitos proprietários | 21; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três percursos iniciais por estágio de exposição, cada um com no máximo dois complementares;
- classificação e ordenação de ações, relação causal, reporte seguro e revisão;
- controles críticos, avaliação normalizada, estados e alternativas acessíveis;
- separação explícita entre prevenção, resposta e capacidades futuras.

### 1.2 Decisões técnicas fechadas e limites restantes

- a versão executável é 2, a rota foi preservada e o esquema local passou a 12;
- tentativas v1 permanecem imutáveis; v2 usa contrato e avaliador próprios;
- a primeira abertura usa o pacote canônico e os demais só aparecem após a conclusão;
- persistência de rascunho e integração corporativa continuam fora do recorte.

## 2. Contrato educacional

- **Comportamento observável:** declarar o último estágio realmente ocorrido, separar ações imediatas, ações dependentes do procedimento oficial e ações que não devem ser feitas e montar reporte factual sem segredo.
- **Técnicas ou objetivos do atacante:** levar a pessoa de mensagem a link, artefato, sessão ou outra exposição e explorar atraso, vergonha ou resposta improvisada.
- **Atalho inseguro enfrentado:** apagar evidência, repetir segredo, tentar “consertar” sozinho, presumir que todo incidente exige as mesmas ações ou não reportar por culpa.
- **Resposta segura generalizável:** parar a interação, preservar contexto, comunicar cedo, usar a rota oficial e aplicar contenção proporcional ao que ocorreu e ao que ainda é incerto.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** ausência de comprometimento, retenção, domínio permanente ou execução real de contenção.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:session-review-revoke` | Núcleo | Primeira versão | Relaciona exposição a revisão simulada de sessões, dispositivos e aplicativos | P3 |
| `concept:file-view-download-open-execute` | Núcleo | Primeira versão | Faz a pessoa marcar o último estágio conhecido sem transformar hipótese em fato | P2 |
| `concept:clicked-link-response` | Núcleo | Primeira versão | Organiza a resposta ao clique sem dado fornecido e sem reabrir o destino | P1 |
| `concept:incident-causality` | Núcleo | Primeira versão | Sustenta linha temporal, exposição conhecida e incertezas | P1, P2 e P3 |
| `concept:report-preserve` | Complementar | Primeira versão | Seleciona contexto útil e preservável sem excesso | P1 |
| `concept:do-not-delete-forward` | Complementar | Primeira versão | Separa reporte oficial de exclusão prematura e encaminhamento informal | P2 e P3 |
| `concept:report-without-secrets` | Complementar | Primeira versão | Constrói relato allowlisted sem senha, OTP, token ou código | P1 e P3 |
| `concept:no-blame-reporting` | Transversal com proprietário | Primeira versão | Torna o reporte factual possível mesmo após erro fictício | Todos os percursos |
| `concept:account-recovery` | Transversal com proprietário | Primeira versão | Relaciona sessão, fator, permissão e dispositivo às áreas responsáveis | Todos os percursos |
| `concept:collective-protection` | Transversal com proprietário | Primeira versão | Mostra barreiras coletivas acionadas por um relato, sem expor indivíduo | Todos os percursos |
| `concept:opened-message-response` | Variação de caso | Banco de casos | Permite praticar resposta proporcional quando só houve abertura | Banco versionado |
| `concept:credential-response` | Variação de caso | Banco de casos | Leva a recuperação oficial sem campo de credencial | Banco versionado |
| `concept:oauth-response` | Variação de caso | Versão futura | Acrescenta revisão de consentimentos sem afirmar que trocar senha basta | Versão futura |
| `concept:file-execution-response` | Variação de caso | Versão futura | Trata abertura/execução com contenção proporcional e incerteza | Versão futura |
| `concept:command-response` | Variação de caso | Versão futura | Classifica resposta após comando sem exibir sintaxe executável | Versão futura |
| `concept:data-disclosure-response` | Variação de caso | Versão futura | Trabalha categorias fictícias de dados e áreas que precisam saber | Versão futura |
| `concept:payment-response` | Variação de caso | Versão futura | Encaminha meio fictício à rota oficial sem prometer reversão | Versão futura |
| `concept:extortion-response` | Variação de caso | Versão futura | Oferece preservação, apoio e saída segura após governança específica | Versão futura |
| `concept:tracking-pixel` | Debrief ou limite técnico | Debrief | Explica carregamento externo sem exigir localizar pixel invisível | Debrief |
| `concept:session-cookie` | Debrief ou limite técnico | Debrief | Explica por que revisão de sessões pode continuar necessária | Debrief |
| `concept:med-response` | Debrief ou limite técnico | Debrief | Diferencia rotas bancárias possíveis sem garantir elegibilidade ou devolução | Debrief |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Abri o destino | Clique em link fictício sem envio de dado | Montar resposta proporcional ao clique | Preservação de contexto; reporte sem segredos | Clique narrado em mensagem de projeto | Exposição limitada conhecida |
| P2 — Até onde o arquivo foi? | Artefato fictício foi visualizado, baixado ou aberto, sem afirmar execução | Declarar estágio e ordenar ações seguras | Preservação por não apagar/encaminhar | Artefato recebido por compartilhamento textual | Estágio conhecido ou inconclusivo |
| P3 — A sessão parece diferente | Após evento narrado, há sessão ou aplicativo fictício para revisar | Solicitar revisão/revogação e reportar proporcionalmente | Não apagar/encaminhar; reporte sem segredos | Nova sessão em outro serviço cenográfico | Recuperação necessária ou investigação |

Os três conceitos transversais sustentam o mesmo comportamento e não funcionam como complementares adicionais. Cada tentativa executa um único pacote.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Abri o destino

| Elemento | Definição |
|---|---|
| Situação inicial | Uma persona clicou num destino fictício e fechou a página antes de preencher qualquer campo. |
| Canal e artefatos | Linha temporal textual, mensagem original inerte, histórico de navegador cenográfico e guia oficial. |
| Identidade ou pretexto | Aviso de documento pendente. |
| Objetivo do atacante ou hipótese legítima | Levar ao próximo estágio; a intenção técnica do destino não precisa ser diagnosticada. |
| Pressões e aparências | Preocupação após o clique e impulso de reabrir para conferir. |
| Evidências disponíveis | Clique declarado, ausência declarada de dado enviado, horário, canal e sistema. |
| Evidência decisiva ou limite de certeza | O clique é fato; ausência de persistência ou comprometimento não pode ser concluída. |
| Confirmação independente | Acessar serviço pelo portal fictício e acionar o canal oficial de reporte. |
| Ação segura | Parar interação, não reabrir e registrar o ocorrido. |
| Reporte ou recuperação | Relato com canal, horário, destino aparente e ação realizada, sem segredo. |
| Transferência curta | Clique narrado em mensagem de projeto exige o mesmo plano com menos ajuda. |
| Debrief | Clicar e fornecer dado são estágios diferentes; resposta proporcional não significa omissão. |
| Conteúdo fictício necessário | Linha com 4–6 eventos, blocos de ação e de reporte allowlisted. |

### Percurso P2 — Até onde o arquivo foi?

| Elemento | Definição |
|---|---|
| Situação inicial | A persona recebeu um artefato e não tem certeza se apenas visualizou, baixou ou abriu. |
| Canal e artefatos | Cadeia textual de exposição, registro fictício de interface e procedimento de reporte. |
| Identidade ou pretexto | Documento inesperado associado a uma entrega plausível. |
| Objetivo do atacante ou hipótese legítima | Induzir interação adicional; o caso avalia resposta, não prevenção do primeiro contato. |
| Pressões e aparências | Medo de admitir o estágio e vontade de apagar o arquivo. |
| Evidências disponíveis | Ações narradas, estados possíveis, origem, horário e ausência de confirmação de execução. |
| Evidência decisiva ou limite de certeza | A pessoa escolhe o último estágio sustentado e pode marcar incerteza. |
| Confirmação independente | Procedimento oficial fictício e suporte iniciado pelo portal. |
| Ação segura | Parar, preservar contexto, não abrir de novo e seguir orientação oficial. |
| Reporte ou recuperação | Reportar o estágio conhecido e a incerteza; não encaminhar o artefato informalmente. |
| Transferência curta | Compartilhamento textual em nuvem repete a classificação de estágio. |
| Debrief | Visualizar, baixar, abrir e executar não são equivalentes; incerteza deve ser relatada. |
| Conteúdo fictício necessário | Cadeia de 4 estágios, sinais de interface cenográficos e cartões de ação. |

### Percurso P3 — A sessão parece diferente

| Elemento | Definição |
|---|---|
| Situação inicial | Depois de um evento fictício, a área oficial simulada mostra sessão ou aplicativo que a persona não reconhece. |
| Canal e artefatos | Linha do incidente, console inerte de sessões/aplicativos e construtor de reporte. |
| Identidade ou pretexto | Continuação de uma exposição já narrada, sem pedir diagnóstico da técnica. |
| Objetivo do atacante ou hipótese legítima | Manter acesso; também pode haver sessão legítima não reconhecida, tratada como inconclusiva. |
| Pressões e aparências | Urgência de “resolver tudo” e impulso de apagar registros. |
| Evidências disponíveis | Serviço, data aproximada, dispositivo fictício, exposição narrada e procedimento. |
| Evidência decisiva ou limite de certeza | Não reconhecimento justifica revisão; sozinho não prova invasão. |
| Confirmação independente | Console oficial simulado acessado pelo portal e suporte fictício. |
| Ação segura | Solicitar encerramento/revisão pelos controles cenográficos e seguir recuperação. |
| Reporte ou recuperação | Reportar evento, sistema e ação solicitada sem segredo ou dado excessivo. |
| Transferência curta | Outra aplicação apresenta sessão semelhante e exige a mesma decisão proporcional. |
| Debrief | Troca de senha pode não encerrar toda sessão; a área responsável confirma o efeito real. |
| Conteúdo fictício necessário | 3 sessões, 2 aplicativos, procedimento e blocos de reporte, sem botão conectado. |

Nenhum link, arquivo, sessão, dispositivo, conta, reporte ou ação de recuperação é real.

## 6. Mecânica e diferenciação

- **Interação central:** reconstruir uma linha curta, declarar exposição/incerteza, rever o contexto, distribuir cartões em Primeiras ações seguras/Ações sob orientação da equipe responsável/Ações que aumentam o risco, ordenar dependências e montar reporte com blocos fechados.
- **Por que combina com o comportamento:** ações corretas variam pelo estágio; o montador torna visível proporcionalidade e precedência.
- **Como se distingue das outras 21 atividades:** é a proprietária da resposta pós-evento; Documento inesperado atua antes de abrir/executar e outros players não montam o plano completo.
- **O que é reutilizável:** catálogo e guias da versão 1, shell, cartões, resultado, competências e atividade recente.
- **O que exige componente novo:** categorização e ordenação acessíveis, avaliador por dependências, linha causal e construtor de reporte.
- **Alternativa sem arrastar, mídia ou representação espacial:** seletores de categoria e posição, botões Subir/Descer e tabela ação–momento.
- **Risco de virar questionário disfarçado e prevenção:** o funcionário compõe e ordena um plano coerente; as opções possuem dependências e itens plausíveis, não uma única alternativa óbvia.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Evento, aviso sem culpa e limites fictícios | Iniciar pacote | Pacote publicado | `casePackageId` | Orientação curta | Foco no título |
| Investigação | Linha incompleta e evidências | Marcar fatos, estágio e incerteza | Estágio ou incerteza obrigatórios | linha e exposição | Explica diferença entre fato e hipótese | Lista/tabela |
| Decisão inicial | Cartões de ação | Distribuir em três grupos | Todos os cartões classificados | colocações iniciais | Consequência limitada | Seletores por cartão |
| Consequência | Efeito narrado de uma precedência | Revisar ordem e categoria | Conteúdo determinístico do pacote | revisão | Liga decisão a risco | Região de status |
| Revisão | Linha, grupos e reporte | Alterar livremente | Antes do envio final | rascunho | Sem penalidade | Foco no erro |
| Decisão final | Ações ordenadas e blocos de relato | Finalizar plano e reporte | Controles aplicáveis completos | plano e relato | Validação específica | Resumo de erros |
| Transferência | Segundo evento breve | Declarar estágio e duas primeiras ações | Resposta mínima completa | transferência | Feedback após envio | Texto linear |
| Resultado | Nota privada e decomposição | Rever ou concluir | Avaliação válida | resultado derivado | Recomendações proporcionais | Resumo |
| Debrief | Fatos, limites e proteção coletiva | Ler e retornar | Sem nova nota | visualização opcional | Sem afirmar efeito real | Texto |

Velocidade não pontua, e toda resposta pode ser revisada antes da conclusão.

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa/rascunho | Briefing e início | Estado objetivo | Foco no `h1` |
| Em andamento | Pacote ativo | Linha, montador e relato | Rascunho mínimo, se aprovado | Progresso anunciado |
| Retomada | Rascunho compatível | Resumo e continuar/reiniciar | Mesma versão/pacote | Contexto antes dos controles |
| Revisão | Plano inicial completo | Alteração sem penalidade | Atualiza rascunho | Foco no item crítico |
| Concluída | Resposta válida | Resultado e debrief privados | Tentativa imutável | Título do resultado |
| Repetição | Nova tentativa | Novo pacote, sem pontos duplicados | Melhor e última separadas | Aviso explícito |
| Conteúdo indisponível | Pacote/versão não publicados | Explicação e retorno | Nenhuma tentativa | Alerta, sem queda silenciosa |
| Resposta inválida | Campo, categoria ou ordem inválida | Corrigir sem perder trabalho | Não conclui | Erro local e resumo |
| Falha ao salvar | Persistência falhou | Repetir salvamento | Sem recompensa antes de confirmar | Alerta persistente |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Exposição e incerteza | 20 | Último estágio e limites corretamente declarados | Pequena imprecisão sem subestimar risco | Omite fato ou inventa certeza | análise contextual |
| Classificação por resposta imediata/procedimento oficial/não fazer | 30 | Todas as ações no grupo proporcional | Um erro não crítico | Ação perigosa como imediata ou contenção crítica omitida | resposta a incidente |
| Precedência crítica | 15 | Ordem respeita dependências do pacote | Inversão sem dano principal | Atraso/ordem torna resposta insegura | planejamento |
| Proporcionalidade | 15 | Evita reabrir, apagar, encaminhar ou “consertar” sozinho | Uma ação excessiva sem efeito crítico | Executa ou recomenda ação insegura | julgamento |
| Reporte seguro | 20 | Relato factual, suficiente e sem segredo | Falta detalhe útil não sensível | Inclui segredo ou não reporta caso crítico | reporte |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa fato, hipótese, incerteza e resposta proporcional;
- nenhum indício isolado vale como veredito de comprometimento;
- velocidade não é pontuada;
- caso inconclusivo não premia certeza artificial nem ação máxima automática.

### 9.1 Controles críticos

- parar a interação e não reabrir o artefato/destino;
- usar a rota oficial para reporte e recuperação;
- excluir senha, OTP, token, código e conteúdo sensível do relato;
- não apagar evidência nem encaminhar indiscriminadamente;
- solicitar revisão/recuperação quando o pacote narrar exposição persistente.

### 9.2 Resultado privado

O resultado exibe nota de 0–100, estágio declarado, linha, categorias, precedências, relato, controles críticos, feedback sem culpa, competências, recomendação e recompensa potencial. O agregado não contém estágio, erro, ação nem texto individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base publicada:** Missão 100, com bônus transversal vigente.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição preserva pontos.
- **Versões anteriores:** a versão 1 permanece imutável; seus casos de abertura e credencial continuam históricos mesmo quando esses conceitos ficam no banco da versão-alvo.
- **Integrações publicadas:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta implementado

O desenho foi materializado em `RecoveryBuilderV2Submission`; nota, bônus, competências, `needsReview` e feedback continuam derivados pelo avaliador.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | ID publicado | Sim | catálogo autoritativo | rejeitar divergência |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | não confiar no cliente |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |
| `timelineFacts` | IDs de fatos e ordem permitidos | Sim | interação | sem texto livre sensível |
| `exposureStageId` | estágio ou incerteza allowlisted | Sim | interação | coerente com pacote |
| `actionPlacements` | pares ação–grupo–posição | Sim | interação | cada cartão exatamente uma vez |
| `reportBlockIds` | blocos allowlisted | Sim | interação | rejeitar segredos/extra |
| `officialRouteActionId` | ação oficial publicada | Sim | interação | não afirma execução |
| `transferExposureId` | estágio allowlisted | Sim | transferência | pacote curto |
| `transferFirstActionIds` | lista ordenada | Sim | transferência | quantidade definida pelo pacote |

### 11.1 Invariantes

- IDs e opções pertencem à versão publicada;
- cada ação aparece uma vez e somente em grupo permitido;
- precedências são validadas pelo pacote, não pelo cliente;
- listas rejeitam duplicatas e valores extras;
- replay do mesmo `attemptId` é no-op;
- tentativa nova não duplica recompensa;
- conteúdo e avaliador têm versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Registrar pacote, rascunho mínimo, resposta bruta por IDs, resultado e progresso como `isAuthoritative: false`. Nunca persistir texto livre, segredo ou dado real.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão antes do uso real.

### Compatibilidade

- a nova mecânica usa `activityVersion: 2`;
- a versão 1 e suas tentativas permanecem legíveis e imutáveis;
- a ampliação de `LearningAttempt` elevou `APP_SCHEMA_VERSION` de 11 para 12;
- migrações preservam progresso, pontos, recompensas, preferências e evidências;
- a mesma atividade não concede novamente recompensa por reformulação;
- dados inválidos seguem para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios mínimos | Própria | Não | Não; auditoria restrita quando autorizada |
| Nota e feedback | Derivados | Completos | Não | Agregado permitido |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Chave/valor demonstrativos | Própria | Não | Total autorizado |
| Agregado | Sem estágio ou resposta individual | Contexto coletivo permitido | Contagens/tendências | Contagens/tendências autorizadas |

São proibidos credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando e reporte real. Nenhum botão promete revogar, bloquear, notificar ou recuperar de verdade.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- linha temporal e grupos em ordem semântica;
- operação integral por teclado em investigação, classificação, revisão e resultado;
- seletores e botões Subir/Descer substituem arrastar;
- tabela ação–grupo–posição equivale à representação visual;
- `fieldset` e `legend`, erros associados e regiões de status;
- contraste, texto ampliado e movimento reduzido;
- ausência de limite de tempo e linguagem sem culpa;
- desktop; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e guia atuais | Três pacotes, ações, dependências e relatos | P0 |
| Interface | Shell, cartões e resultado | Linha, categorizador/ordenador e construtor de relato | P1 |
| Contrato e avaliador | Infraestrutura determinística | Avaliador de grupos, precedência e controles | P0/P1 |
| Estado e provider | Tentativa atual | Revisão/rascunho da composição | Decisão de retomada |
| Persistência | Envelope/quarentena | Nova resposta e compatibilidade v1 | Análise de esquema |
| Integrações | Hub, Perfil e competências | Registro da versão-alvo | Backend |
| Testes | Regras existentes | Dependências, teclado e compatibilidade | Harness P0 |

**Esforço relativo:** G. **Posição provável:** P0 e família reutilizável P1.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, fatos, ações, grupos e blocos por allowlist;
- avaliador integral, parcial, inseguro, inconclusivo e inválido;
- todas as dependências, pesos 100, nota limitada e controles críticos;
- duplicidade, repetição, recompensa, evidência e contribuição idempotentes;
- versão 1 preservada, migração e quarentena;
- privacidade de agregado, Perfil, atividade recente e recomendação;
- rota própria e testes de teclado/foco/alternativa acessível.

### Manuais no desktop

- os três pacotes publicados e todos os estágios implementados;
- revisão, retomada e repetição;
- caso integral, parcial, inseguro e inconclusivo;
- teclado, leitor de tela, contraste, texto ampliado e movimento reduzido;
- nenhum efeito externo ou erro de console.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Apenas abriu a mensagem; informou credencial | Banco de casos | Aprovar pacotes e compatibilidade com a versão 1 | A primeira versão-alvo prioriza três estágios sem misturar todos em uma tentativa |
| OAuth; execução de arquivo; comando; divulgação de dado; pagamento | Versões futuras | Contratos, procedimentos e conteúdos específicos aprovados | Cada exposição altera ações, governança e avaliador |
| Extorsão | Versão futura | Revisão jurídica, psicossocial, aviso de conteúdo e saída sem penalidade | Tema sensível e de alto risco |
| Pixel de rastreamento; cookie de sessão; MED | Debrief | Revisão técnica e, no MED, jurídica/editorial | Não devem ser detectados ou prometidos pelo player |

## 18. Gates de publicação e pendências posteriores

Os percursos, casos, pesos e controles foram aprovados em 2026-08-15 e materializados em 2026-08-16. Permanecem como gates para uso real:

- decidir se o rascunho da composição será persistido;
- aprovar e versionar o procedimento corporativo de recuperação e os blocos de reporte;
- substituir o armazenamento local pelo backend autoritativo;
- concluir a validação visual desktop e a validação completa do portal.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
| 2026-08-16 | Montador publicado como versão 2 com compatibilidade v1 | Implementado; validação completa em andamento | Contrato v2, três pacotes, avaliador, provider, persistência v12, player e testes |
| 2026-08-16 | Revisão da transferência separada e grupos renomeados em linguagem operacional | Implementado | Sem alteração de IDs, contrato, avaliador ou persistência |
| 2026-08-16 | Contexto e estágio reapresentados antes da classificação; categorias e cartões de arquivo tornados concretos | Implementado | Mudança editorial e de interface sem alteração do contrato persistido |
