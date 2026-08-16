# Login verdadeiro, permissão errada

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
| Comportamento principal aprovado | Relacionar finalidade, aplicativo, publicador e permissões antes de conceder acesso. |
| Mecânica-base aprovada | Mesa de consentimento com mapa de finalidade e alcance. |
| Estado da atividade atual | Planejada; não existe atividade executável correspondente. |
| Relação com implementação existente | Atividade nova; não substitui nem migra tentativa atual. |
| `activityId`, versão e rota | Não definidos; este blueprint não cria nenhum deles. |
| Duração-alvo | 8 a 10 minutos. |
| Regra de recompensa considerada | 60 pontos-base de PhishLab e bônus transversal, após implementação aprovada; não ativada pelo blueprint. |
| Conceitos proprietários | 5, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos com decisões legítima, suspeita e inconclusiva;
- mesa de consentimento inteiramente fictícia, sem fluxo OAuth real;
- avaliação do alcance pedido em relação à finalidade;
- contrato, estados, acessibilidade e limites de debrief.

### 1.2 O que permanece sem decisão técnica

- ID, rota, versão e posição curricular;
- vocabulário final de permissões e políticas fictícias;
- ativação de recompensa e rascunho;
- critérios editoriais para novos pacotes.

## 2. Contrato educacional

- **Comportamento observável:** identificar a finalidade iniciada, ler o publicador e agrupar cada permissão como necessária, explicável mas opcional, incompatível ou não comprovada.
- **Técnicas ou objetivos do atacante:** usar uma tela legítima de consentimento para obter acesso excessivo.
- **Atalho inseguro enfrentado:** concluir que login verdadeiro torna o aplicativo e todas as permissões confiáveis.
- **Resposta segura generalizável:** avaliar quem pede, para quê e até onde o acesso chega; negar e verificar quando a combinação não fizer sentido.
- **O que a conclusão permite afirmar:** qualidade da decisão nesta tentativa fictícia.
- **O que não permite afirmar:** retenção, domínio permanente, segurança do provedor real, reputação atual do aplicativo ou leitura de todo sistema de identidade.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso | Percurso ou destino |
|---|---|---|---|---|
| `concept:oauth-consent` | Núcleo | Primeira versão | Entender consentimento como concessão de acesso, não simples login. | P1, P2 e P3 |
| `concept:oauth-scopes` | Núcleo | Primeira versão | Relacionar permissões ao alcance e à finalidade. | P1, P2 e P3 |
| `concept:publisher-identity` | Complementar | Primeira versão | Comparar publicador declarado e referência organizacional. | P1, P2 e P3 |
| `concept:passkey-fido` | Debrief ou limite técnico | Debrief | Explicar proteção contra certas formas de phishing sem prometer solução universal. | Debrief D1 |
| `concept:prompt-injection-assistant` | Debrief ou limite técnico | Debrief | Delimitar instruções maliciosas mediadas por assistente sem simulá-las como consentimento comum. | Debrief D2 |

Regras aplicadas:

- os cinco conceitos aparecem uma vez, com papel e momento aprovados;
- conceitos de debrief não geram objetivo, nota ou recompensa própria;
- o Complementar permanece limitado à primeira versão indicada;
- aplicações secundárias não alteram propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Aplicativo conhecido, alcance excessivo | Ferramenta aprovada pede leitura e alteração além da tarefa. | Mapear cada escopo à finalidade e negar excesso. | publisher-identity (1) | Mesma ferramenta pede somente o mínimo necessário. | Suspeito no principal; legítimo no transferido. |
| P2 — Aplicativo novo, pedido compatível | Catálogo interno confirma publicador e finalidade limitada. | Verificar a referência e aprovar apenas o conjunto previsto. | publisher-identity (1) | A referência deixa de existir. | Legítimo; inconclusivo na mudança. |
| P3 — Mesmo nome, outro publicador | Tela legítima do provedor mostra aplicativo homônimo. | Distinguir provedor de identidade, app e publicador. | publisher-identity (1) | Nome e publicador corretos, mas um escopo muda. | Suspeito ou inconclusivo. |

Há apenas um Complementar formal em cada percurso. Os dois núcleos compõem uma única análise de consentimento.

Cada pacote contém microcalibração guiada da mesa, não pontuada como caso completo, resolução independente do consentimento principal da seção 5 e transferência curta. Os percursos são alternativas.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Aplicativo conhecido, alcance excessivo

| Elemento | Definição |
|---|---|
| Situação inicial | Ferramenta de agenda pede também leitura de arquivos e envio de mensagens. |
| Canal e artefatos | Consentimento fictício, descrição da tarefa e catálogo de aplicativos. |
| Identidade ou pretexto | Aplicativo conhecido com publicador cadastrado. |
| Objetivo do atacante ou hipótese legítima | Obter acesso maior que a finalidade; uma atualização legítima continua possível, mas não comprovada. |
| Pressões e aparências | Provedor de login verdadeiro, conveniência e botão de continuidade. |
| Evidências disponíveis | Finalidade estreita, escopos amplos e publicador cadastrado. |
| Evidência decisiva ou limite de certeza | Publicador conhecido não justifica toda permissão. |
| Confirmação independente | Consultar catálogo fictício e fluxo de suporte. |
| Ação segura | Negar cenograficamente e verificar a alteração. |
| Reporte ou recuperação | Reportar se o catálogo não sustentar o novo alcance. |
| Transferência curta | A mesma ferramenta pede somente calendário de leitura. |
| Debrief | Login verdadeiro autentica a conta no provedor; não aprova todo alcance do aplicativo. |
| Conteúdo fictício necessário | Permissões em linguagem simples e detalhe técnico opcional, sem OAuth real. |

### Percurso P2 — Aplicativo novo, pedido compatível

| Elemento | Definição |
|---|---|
| Situação inicial | Funcionário inicia integração aprovada para salvar um arquivo selecionado. |
| Canal e artefatos | Registro da ação, catálogo e mesa de escopos. |
| Identidade ou pretexto | Aplicativo novo e publicador registrado. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima de integração com alcance mínimo. |
| Pressões e aparências | Continuidade do trabalho, sem urgência artificial. |
| Evidências disponíveis | Ação iniciada, publicador confirmado e escopo limitado ao arquivo escolhido. |
| Evidência decisiva ou limite de certeza | Aprovação vale para essa finalidade, versão e conjunto de escopos. |
| Confirmação independente | Conferir o aplicativo no catálogo fictício. |
| Ação segura | Prosseguir cenograficamente com o mínimo necessário. |
| Reporte ou recuperação | Não reportar automaticamente; negar e verificar se o registro faltar. |
| Transferência curta | Sem registro no catálogo, parar e verificar. |
| Debrief | Caso legítimo exige finalidade, identidade e alcance coerentes, não clique automático. |
| Conteúdo fictício necessário | Consentimento legítimo inerte e catálogo cenográfico. |

### Percurso P3 — Mesmo nome, outro publicador

| Elemento | Definição |
|---|---|
| Situação inicial | Aplicativo com nome igual ao conhecido surge na tela do provedor. |
| Canal e artefatos | Consentimento, dois registros de publicador e contexto. |
| Identidade ou pretexto | Aplicativo homônimo apresentado por provedor legítimo. |
| Objetivo do atacante ou hipótese legítima | Obter autorização confundindo nome do app com identidade do publicador. |
| Pressões e aparências | Tela oficial, nome familiar e pedido de continuidade. |
| Evidências disponíveis | Publicador divergente, ação não iniciada e escopos sensíveis. |
| Evidência decisiva ou limite de certeza | O provedor de login é legítimo, mas não atesta finalidade ou publicador do aplicativo. |
| Confirmação independente | Voltar ao catálogo pela rota própria. |
| Ação segura | Negar cenograficamente e usar a rota oficial. |
| Reporte ou recuperação | Reportar o consentimento incompatível, sem token ou conta real. |
| Transferência curta | Publicador fica correto, mas novo escopo exige nova análise. |
| Debrief | Nome, publicador, finalidade e alcance são entidades separadas. |
| Conteúdo fictício necessário | Identidades, organizações e consentimento inventados. |

Nenhum artefato executa ação real. Não há login, token, conta ou autorização.

## 6. Mecânica e diferenciação

- **Interação central:** colocar cartões de permissão sob Necessária, Opcional, Incompatível ou Não comprovada e conectá-los à finalidade declarada.
- **Por que combina com o comportamento:** o mapa obriga a relacionar capacidade e finalidade antes da decisão.
- **Como se distingue das outras 21 atividades:** investiga autorização delegada e alcance; Espelho trata credencial e Device code trata vínculo de sessão.
- **O que é reutilizável:** shell, stepper, revisão, resultado e catálogo.
- **O que exige componente novo:** mesa de escopos, mapa finalidade-alcance e avaliador de minimização.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela de permissão, capacidade, justificativa e classificação.
- **Risco de virar questionário disfarçado e prevenção:** acertar “negar” sem classificar permissões e verificar publicador limita a nota; Aprovar e Negar são cenográficos.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, ausência de OAuth real e cronômetro. | Iniciar ou voltar. | Explícita. | Pacote. | Sem gabarito. | Foco no `h1`. |
| Investigação | Microcalibração e depois consentimento principal. | Aprender a mesa e classificar independentemente escopos, publicador e contexto principais. | Calibração vista e núcleos completos. | Respostas e ajuda. | Explica escopo sem revelar o caso principal. | Tabela. |
| Decisão inicial | Mapa principal montado. | Aprovar cenograficamente, negar ou verificar provisoriamente. | Campos completos. | Decisão provisória. | Lacunas revisáveis. | `fieldset` e lista. |
| Consequência | Efeito fictício do acesso. | Observar capacidade concedida ou evitada. | Consequência lida. | Estado simulado. | Sem consentimento real. | Texto completo. |
| Revisão | Mapa e decisão provisória. | Editar escopos, publicador, conclusão ou rota. | Caso principal completo e editável. | Revisões. | Sem acerto antecipado. | Índice de foco. |
| Decisão final | Resposta consolidada. | Confirmar ou voltar. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | Um elemento muda. | Reavaliar o conjunto. | Uma resposta e rota. | Transferência. | Após envio. | Comparação textual. |
| Resultado | Nota, critérios, competências e recompensa potencial. | Consultar resultado privado. | Aceite. | Derivados. | Permissão, limite e ação. | Texto completo. |
| Debrief | Mapa esperado e limites dos debriefs. | Comparar e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Distingue login de autorização. | Texto estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Iniciar ou voltar. | Nenhuma. | Foco no título. |
| Em andamento | Escopos parciais. | Classificar e revisar. | Rascunho opcional. | Progresso anunciado. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Sem gabarito. | Resumo textual. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Índice por caso. |
| Concluída | Tentativa aceita. | Resultado. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Conclusão anterior. | Nova prática. | Novo attemptId; sem prêmio duplicado. | Regra explícita. |
| Conteúdo indisponível | Pacote ausente. | Voltar. | Nada. | Mensagem explícita. |
| Resposta inválida | Escopo ou app incompatível. | Corrigir. | Não conclui. | Alerta e foco. |
| Falha ao salvar | Operação falhou. | Tentar novamente. | Mantém resposta. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica segue a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores especializam esses eixos para finalidade, publicador e escopos.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidências de finalidade e alcance | 30 | Relaciona contexto, app, publicador e cada escopo. | Uma classificação não crítica incompleta. | Confia só no provedor ou nome. | Observar, Investigar |
| Conclusão e minimização | 25 | Decisão proporcional e acesso mínimo. | Decisão segura com justificativa parcial. | Aprova excesso ou nega tudo sem análise. | Investigar |
| Mesa e verificação | 20 | Usa catálogo e classes de modo pertinente. | Usa ferramenta com interpretação parcial. | Confirma na própria solicitação. | Verificar |
| Independente e transferência | 25 | Repete sem dica e reage à mudança de escopo. | Usa ajuda sem falha crítica. | Não transfere ou concede acesso inseguro. | Investigar, Verificar |

Regras obrigatórias:

- pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho são separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinal isolado não vale como veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- caso legítimo não premia aprovação automática.

### 9.1 Controles críticos

- não aprovar permissão incompatível com a finalidade;
- não confundir provedor de login com identidade e intenção do aplicativo;
- não usar a própria tela como única confirmação;
- não penalizar toda permissão ampla sem considerar finalidade e política.

### 9.2 Resultado privado

O resultado privado mostra nota, quatro critérios, mapa de finalidade, classificações, publicador, decisão, rota, competências, recomendação e recompensa potencial. Não registra token, conta ou consentimento real nem expõe resposta individual no agregado.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos-base depois da aprovação executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição não duplica pontos ou contribuição.
- **Versões anteriores:** nunca reinterpretar ou premiar novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação para De qual dispositivo veio este código?.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código. Não há `activityId` aprovado; o campo representa o valor futuro do catálogo, sem defini-lo.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor | idempotente |
| activityId | ID futuro publicado | Sim | catálogo | ainda indefinido |
| activityVersion | versão publicada | Sim | catálogo | compatível |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | sem rapidez |
| mainCaseResponse | finalidade, publicador, escopos, decisão e rota | Sim | interação | consentimento principal resolvido independentemente |
| transferResponse | resposta curta allowlisted | Sim | interação | calibração não é segundo caso |
| purposeId | ID allowlisted | Sim | caso | finalidade publicada |
| publisherAssessmentId | confirmed, mismatched ou unconfirmed | Sim | investigação | allowlist |
| scopeAssessments | scopeId e classificação | Sim | mesa | cobertura exata |
| decisionId | approve_simulated, deny ou verify | Sim | decisão | allowlist do caso |
| safeRouteId | ID fictício | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- app, publicador, finalidade e escopos pertencem ao pacote;
- “aprovar” é somente escolha pedagógica e nunca concede acesso;
- nenhum token, conta, e-mail ou identificador real é recebido;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível;
- nota, competência e recompensa são derivados no servidor;

### 11.2 Instrumentação mínima

Eventos: case_started, scope_inspected, scope_classified, publisher_checked, catalog_opened, help_opened, answer_revised, submission_requested e submission_result. Somente IDs allowlisted, versão, etapa e sequência. A telemetria não contém escopo livre nem determina a nota.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Exige submissão discriminada e análise de `APP_SCHEMA_VERSION`. Persiste somente retomada, resposta bruta, resultado derivado e progresso; o modo local usa entidades fictícias e `isAuthoritative` falso.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização e público; publica versão, pacote, app, publicador e escopos; valida opções e etapas por allowlist; deriva avaliação, `needsReview`, competências e feedback; concede recompensa, evidência e contribuição em transação idempotente; mantém auditoria sem token; e aplica retenção e exclusão conforme política. Não inicia OAuth, autentica, recebe token ou consulta diretório real.

### Compatibilidade

Não há tentativa anterior a migrar. ID, rota e versão dependem de aprovação. Estado incompatível é colocado em quarentena e não gera conclusão ou recompensa.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas sem resposta individual |

Sem credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte, login, token, autorização real, iframe ou endpoint OAuth. Botões são cenográficos, domínios usam `.example` e o player não afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, finalidade, publicador e escopos são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- a operação é integral por teclado;
- qualquer ordenação oferece Mover, Subir e Descer e anuncia posição;
- tabela e seletores equivalem à mesa visual; cor e posição são redundantes;
- ilustração ou mídia futura possui texto equivalente;
- feedback usa região de status e erro usa alerta com foco, sem apagar consentimento ou contexto;
- contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem pontuação por rapidez;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e shell | Apps, publicadores, finalidades e escopos | P0 |
| Interface | Stepper e resultado | Mesa/tabela de consentimento | P1 |
| Contrato e avaliador | Envelope e pesos comuns | Submissão e compatibilidade finalidade-alcance | Nova versão |
| Estado e provider | Provider assíncrono | Operação de mesa, decisão e revisão | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso | Rascunho, migração e quarentena | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Hub e perfil | Registro da nova atividade | ID aprovado |
| Testes | Contratos, reducer e SSR | Zero OAuth, teclado, foco e tabela equivalente | Harness de navegador |

**Esforço relativo:** M. **Camadas:** P0 e P1; novos pacotes em P2.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, app, publicador, finalidade, escopo e opção por allowlist;
- escopo ausente, extra, repetido ou de outro pacote;
- quatro pesos somam 100 e nota fica limitada;
- casos legítimo, suspeito, inconclusivo, parcial e inseguro;
- controles críticos, needsReview e ajuda sem desconto;
- nenhum OAuth, token, login, iframe ou rede;
- replay, repetição, recompensa idempotente e privacidade;
- teclado e equivalência entre mesa e tabela.

### Manuais no desktop

- concluir P1, P2 e P3;
- testar leitor de tela, zoom, contraste e movimento reduzido;
- classificar tudo apenas pelo teclado;
- confirmar que aprovar nunca abre autenticação;
- revisar e repetir sem prêmio duplicado;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| concept:passkey-fido | Debrief D1 | Texto tecnicamente revisado e alinhado à política | É proteção relacionada, não pista de consentimento |
| concept:prompt-injection-assistant | Debrief D2 | Tratamento próprio de assistentes e autorização | Não deve ser reduzido a um escopo OAuth nem virar instrução ofensiva |

Não há conceito proprietário marcado para banco ou versão futura neste blueprint. O debrief não promete que passkeys resolvem abuso de consentimento.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três percursos e a taxonomia de escopos;
- definir ID, rota, versão e posição curricular;
- revisar as fronteiras entre provedor, app e publicador;
- aprovar os dois debriefs;
- validar com Segurança, Educação e Acessibilidade.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, mesa de consentimento e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
