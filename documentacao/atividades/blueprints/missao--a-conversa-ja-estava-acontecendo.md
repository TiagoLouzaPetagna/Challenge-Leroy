# A conversa já estava acontecendo

> **Estado do blueprint:** versão 2 e revisão curricular/de clareza implementadas e validadas na demonstração em 2026-08-15.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** a versão 2 está disponível com três pacotes internos e atribuição automática; a versão 1 permanece histórica.
>
> **Efeito técnico:** `mission:compromised-conversation` v2, contrato `conversation-reconstruction`, esquema local 8 e migração v7→v8.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Confirmar fora da conversa quando comportamento ou processo muda, depois de aprender os fundamentos de phishing e a leitura inicial de identidade e destino |
| Mecânica-base aprovada | Reconstrução cronológica acessível + ponto de mudança + painel de evidências |
| Estado da atividade atual | Disponível na versão 2; versão 1 preservada como histórico; atribuição automática, contexto e saída curricular implementados |
| Relação com implementação existente | Evolução implementada sem reinterpretar a versão 1 |
| `activityId`, versão e rota | `mission:compromised-conversation`, versão 2, `/missoes/a-conversa-ja-estava-acontecendo` |
| Duração-alvo | 9–12 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada por este blueprint |
| Conceitos proprietários | 6; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes internos, incluindo resultado malicioso, legítimo e inconclusivo, sem escolha P1/P2/P3 pelo funcionário na primeira abertura;
- reconstrução por mensagens, marcação do ponto de mudança e vínculo de evidências;
- critérios de decisão, confirmação independente, reporte e avaliação;
- conteúdo fictício, estados, acessibilidade e fronteiras de dados.
- posicionamento depois da Missão de fundamento e dos PhishLabs iniciais;
- revisão de briefing, instruções e alternativas para tornar papel, situação, tarefa e consequência explícitos.

### 1.2 Decisões técnicas materializadas e limites remanescentes

- a versão executável é 2 e a rota foi preservada;
- a nova forma de resposta ativou o esquema 8 e a migração v7→v8;
- os três pacotes foram publicados no registro P0;
- o portal atribui o primeiro caso automaticamente e reserva os demais para repetição;
- o painel de evidências da versão 2 permanece inalterado nesta revisão;
- rascunho entre sessões, integrações reais, celular e backend autoritativo permanecem fora.

## 2. Contrato educacional

- **Comportamento observável:** reconstruir o contexto, marcar quando pedido ou processo mudou e confirmar por uma rota independente antes de agir.
- **Técnicas ou objetivos do atacante:** assumir uma conversa existente, explorar familiaridade e usar uma conta possivelmente comprometida para alterar destino, dado ou procedimento.
- **Atalho inseguro enfrentado:** considerar histórico, nome conhecido ou tom familiar como autenticação suficiente.
- **Resposta segura generalizável:** tratar mudança relevante como novo pedido, separar fato de inferência, reconfirmar fora do mesmo fio e reportar de forma proporcional.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente, comprometimento real da conta ou causa técnica de mensagens ausentes.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:thread-hijacking` | Núcleo | Primeira versão | Organiza a reconstrução, a ruptura operacional e a confirmação externa | P1, P2 e P3 |
| `concept:influence-familiarity` | Complementar | Primeira versão | Mostra por que uma conta e um estilo conhecidos aumentam plausibilidade sem provar identidade | P1, P2 e P3 |
| `concept:account-compromise` | Complementar | Primeira versão | Permite considerar conta correta com controle indevido sem obrigar diagnóstico técnico | P1, P2 e P3 |
| `concept:lateral-phishing` | Variação de caso | Banco de casos | Leva a mesma decisão a um pedido interno e a reporte factual, sem acusar o titular | Banco versionado |
| `concept:thread-fabrication` | Transferência | Banco de casos | Contrasta histórico real com citações ou assunto fabricados, admitindo incerteza | Banco versionado |
| `concept:inbox-manipulation` | Debrief ou limite técnico | Debrief | Explica que regras de caixa podem ocultar mensagens, sem exigir detecção humana | Debrief |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — O novo destino | Fornecedor conhecido altera dados de envio no meio de uma conversa | Confirmar fora da conversa diante da mudança | Familiaridade; conta comprometida | Pedido semelhante migra do e-mail para chat corporativo fictício | Malicioso provável |
| P2 — A alteração legítima incompleta | Parceira real comunica mudança operacional sem evidência suficiente | Suspender a execução e reconfirmar por rota independente | Familiaridade; conta comprometida | Solicitação breve de alteração de agenda em outro canal | Inconclusivo que se revela legítimo |
| P3 — O chamado fora do padrão | Conta interna conhecida pede acesso ou informação fora do processo | Tratar a mudança como novo pedido e verificar | Familiaridade; conta comprometida | Continuação resumida em mensagem de projeto fictícia | Malicioso provável ou inconclusivo |

Os três percursos são pacotes editoriais alternativos. Uma tentativa recebe somente um deles e nenhum conceito do banco é necessário para a primeira versão. P1, P2 e P3 não aparecem como opções: a primeira abertura recebe o caso canônico automaticamente; os demais ficam para **Praticar com outro caso**.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — O novo destino

| Elemento | Definição |
|---|---|
| Situação inicial | Uma conversa fictícia sobre entrega evolui normalmente até a conta conhecida solicitar alteração de endereço e urgência incomum. |
| Canal e artefatos | Fio de e-mail textual, resumo de pedido e cadastro anterior inertes. |
| Identidade ou pretexto | Contato conhecido do fornecedor, com linguagem coerente e assinatura habitual. |
| Objetivo do atacante ou hipótese legítima | Redirecionar a entrega usando uma conta possivelmente comprometida. |
| Pressões e aparências | Continuidade do assunto, familiaridade e risco alegado de atraso. |
| Evidências disponíveis | Sequência temporal, cadastro anterior, mudança de destino, ausência de chamado e contato cadastrado. |
| Evidência decisiva ou limite de certeza | A mudança de processo é comprovada; o controle da conta não é observável. |
| Confirmação independente | Contato cadastrado no diretório fictício, não o endereço ou número fornecido no fio. |
| Ação segura | Pausar a alteração, confirmar externamente e manter o cadastro vigente até validação. |
| Reporte ou recuperação | Preservar contexto e reportar possível uso indevido, sem acusar o titular. |
| Transferência curta | No chat corporativo fictício, marcar novamente a mudança e escolher a fonte independente. |
| Debrief | Histórico torna o pedido plausível, não autorizado; conta correta e pessoa correta são questões diferentes. |
| Conteúdo fictício necessário | 7–9 mensagens, cadastro de fornecedor, diretório e resposta de confirmação, todos com nomes fictícios e domínio `.example`. |

### Percurso P2 — A alteração legítima incompleta

| Elemento | Definição |
|---|---|
| Situação inicial | Uma parceira real pede mudança de janela de entrega, mas o fio não contém aprovação nem referência ao processo. |
| Canal e artefatos | E-mail, agenda operacional e procedimento fictícios. |
| Identidade ou pretexto | Conta conhecida com comportamento ligeiramente diferente por substituição temporária. |
| Objetivo do atacante ou hipótese legítima | Mudança legítima, porém insuficientemente confirmada no momento da decisão. |
| Pressões e aparências | Pedido cordial, prazo próximo e histórico longo. |
| Evidências disponíveis | Agenda, cadastro, ausência de registro, mensagem anterior sobre férias e contato alternativo oficial. |
| Evidência decisiva ou limite de certeza | Nenhum sinal isolado resolve o caso; somente a confirmação externa estabelece legitimidade. |
| Confirmação independente | Pessoa de cobertura listada no cadastro fictício. |
| Ação segura | Classificar como inconclusivo, confirmar e só então seguir o processo normal. |
| Reporte ou recuperação | Não abrir incidente quando a confirmação e o registro tornam o pedido legítimo; registrar a mudança pelo fluxo comum. |
| Transferência curta | Pedido de troca de agenda em ferramenta textual de projeto exige a mesma reconfirmação. |
| Debrief | Verificar não equivale a acusar; casos legítimos também exigem processo completo. |
| Conteúdo fictício necessário | 6–8 mensagens, agenda, procedimento e diretório cenográficos. |

### Percurso P3 — O chamado fora do padrão

| Elemento | Definição |
|---|---|
| Situação inicial | Uma conta de serviço interno retoma chamado antigo e solicita informação que o fluxo anterior nunca exigiu. |
| Canal e artefatos | Conversa textual, histórico do chamado e catálogo de serviços simulados. |
| Identidade ou pretexto | Conta interna familiar e assunto técnico verdadeiro. |
| Objetivo do atacante ou hipótese legítima | Obter dado ou ação fora do escopo, com controle da conta ainda incerto. |
| Pressões e aparências | Continuidade aparente, jargão correto e pedido para evitar reabertura do chamado. |
| Evidências disponíveis | Ordem das mensagens, escopo original, identidade alegada e rota oficial do serviço. |
| Evidência decisiva ou limite de certeza | A ruptura de escopo é observável; intenção e comprometimento permanecem hipóteses. |
| Confirmação independente | Reabrir ou consultar o chamado pela área oficial fictícia. |
| Ação segura | Não fornecer o dado, verificar o escopo e responder pela rota oficial. |
| Reporte ou recuperação | Reportar se o serviço negar o pedido ou se houver indício suficiente; preservar o fio. |
| Transferência curta | Mensagem curta em canal de projeto repete a alteração de escopo com menos orientação. |
| Debrief | Conhecimento interno pode ser legítimo ou obtido de contexto; processo independente resolve sem adivinhação. |
| Conteúdo fictício necessário | 7 mensagens, chamado, catálogo de serviço e resposta oficial simulada. |

Nenhum artefato executa ação real. Todos os nomes, endereços e dados são fictícios, mascarados e revisáveis.

## 6. Mecânica e diferenciação

- **Interação central:** ordenar mensagens por controles explícitos, marcar a ruptura e fixar evidências classificadas como fato, indício ou inferência antes de escolher confirmação e ação.
- **Por que combina com o comportamento:** a decisão depende da mudança ao longo do tempo, não de uma pista isolada em uma mensagem.
- **Como se distingue das outras 21 atividades:** avalia continuidade e ruptura de uma conversa; não autentica cabeçalhos, não disseca URLs e não executa resposta pós-incidente.
- **O que é reutilizável:** shell de Missão, cartões de mensagem, seletores de evidência, resultado, debrief e integrações de aprendizagem atuais.
- **O que exige componente novo:** ordenação acessível, linha temporal, vínculo entre evidência e conclusão e avaliador próprio.
- **Alternativa sem arrastar, mídia ou representação espacial:** botões Subir/Descer, lista numerada, seleção de posição e tabela evidência–afirmação.
- **Risco de virar questionário disfarçado e prevenção:** a resposta é construída sobre a ordem e relações que a pessoa produziu; alternativas finais não revelam o veredito antecipadamente.

O **painel de evidências permanece exatamente como está na versão 2** nesta revisão. Ele continua sendo o local em que a pessoa fixa os elementos usados para sustentar sua conclusão. Não foram aprovadas mudanças de nome, classificação, composição visual ou pontuação do painel.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Papel profissional, situação, tarefa atual, consequência protegida e aviso de artefatos fictícios | Iniciar o caso atribuído | Pacote publicado e atribuído sem escolha P1/P2/P3 | `casePackageId` | Orientação curta e contextual, sem revelar a resposta | Título focado e resumo textual |
| Investigação | Mensagens fora de ordem e fontes disponíveis | Ordenar, abrir fontes e classificar evidências | Todas as mensagens posicionadas; fontes opcionais | ordem, fontes e classificações | Anúncio de posição e fonte aberta | Subir/Descer e tabela |
| Decisão inicial | Linha reconstruída | Marcar ponto de mudança e conclusão provisória | Ruptura selecionada | ponto e conclusão inicial | Consequência limitada, sem nota | Controles agrupados |
| Consequência | Nova mensagem ou resposta de fonte | Revisar hipótese | Conteúdo depende do pacote, não de IA | revisão da conclusão | Explica o que mudou | Região de status |
| Revisão | Painel completo | Alterar ordem, evidências e decisão | Livre até envio final | estado revisado | Sem penalidade por revisão | Retorno de foco ao painel |
| Decisão final | Objetivo da verificação e opções concretas: diretório/portal/chamado já conhecido, mesma conversa, contato fornecido no pedido ou busca pública | Escolher a referência que já existia antes da conversa e uma ação proporcional | Campos críticos completos | confirmação, ação e reporte | Explica por que o próprio pedido não pode confirmar a si mesmo | Erros associados aos campos |
| Transferência | Caso curto em outro canal | Repetir ruptura e confirmação com menos ajuda | Uma decisão e uma justificativa | resposta de transferência | Feedback após conclusão | Lista textual equivalente |
| Resultado | Nota, decomposição privada e comparação entre resposta dada e esperada | Revisar decisões ou concluir | Avaliador válido | resultado derivado | Acertou ou Precisa revisar por item, fatos, incertezas e próximo passo | Resumo linear sem depender de cor |
| Debrief | Explicação do pacote e limite técnico | Ler e retornar | Sem nova nota | visualização opcional | Não afirma comprometimento comprovado | Texto sem dependência visual |

A revisão é livre antes da conclusão, e velocidade não é coletada para pontuação.

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa ou rascunho | Briefing e início | Apenas estado objetivo | Foco no `h1` |
| Em andamento | Pacote iniciado | Reconstrução, fontes e decisões | Rascunho mínimo, se aprovado | Progresso anunciado |
| Retomada | Rascunho compatível | Resumo do pacote e continuar/reiniciar | Mesma versão e pacote | Aviso claro do ponto retomado |
| Revisão | Decisão inicial feita | Alterar qualquer resposta antes de enviar | Atualiza rascunho | Foco no primeiro item a revisar |
| Concluída | Resposta válida avaliada | Resultado privado e debrief | Tentativa imutável | Título do resultado focado |
| Repetição | Nova tentativa após conclusão | Praticar com outro caso, sem pontos duplicados | Melhor e última tentativa separadas | Aviso de repetição e nome contextual do novo caso |
| Conteúdo indisponível | Versão ou pacote não publicado | Explicação e retorno ao hub | Nenhuma tentativa | `role="alert"` sem redirecionamento silencioso |
| Resposta inválida | Falha de allowlist ou campo obrigatório | Preservar respostas e corrigir | Não conclui | Erros específicos e resumo |
| Falha ao salvar | Avaliação válida, persistência falhou | Tentar novamente ou manter cópia local controlada | Sem conceder recompensa até confirmar | Alerta persistente e foco preservado |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Reconstrução temporal | 20 | Ordem e contexto coerentes | Um erro sem mudar a ruptura | Ordem incompatível com o caso | análise contextual |
| Ponto de mudança | 20 | Marca a ruptura operacional correta | Marca transição próxima e justificável | Não reconhece mudança relevante | decisão sob pressão |
| Qualidade das evidências | 20 | Usa fatos relevantes e não duplica pistas | Combina fato com indício fraco | Familiaridade vira veredito | análise de evidências |
| Calibração da conclusão | 15 | Separa fato, indício, inferência e incerteza | Conclusão segura, mas superafirmada | Diagnostica sem base ou obedece automaticamente | julgamento |
| Confirmação independente | 15 | Usa rota cadastrada fora do fio | Escolhe rota oficial com pequena lacuna | Confirma pelo mesmo contato fornecido | verificação segura |
| Preservação e reporte | 10 | Ação e reporte proporcionais | Preserva ou reporta com detalhe incompleto | Apaga, encaminha indiscriminadamente ou acusa | reporte |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa fatos, indícios, inferências, incerteza e processo seguro;
- nenhum sinal isolado vale como veredito;
- velocidade não é pontuada;
- caso legítimo não premia obediência automática a processo incompleto.

### 9.1 Controles críticos

- reconhecer a mudança de processo ou escopo;
- não usar o próprio fio ou contato nele fornecido como confirmação independente;
- suspender a ação de impacto até reconfirmar;
- preservar e reportar quando o pacote indicar possível comprometimento.

`needsReview` é verdadeiro quando a nota ficar abaixo do corte vigente ou qualquer controle aplicável falhar. Casos legítimos não exigem reporte de incidente depois de confirmação suficiente.

### 9.2 Resultado privado

O funcionário vê nota de 0–100, seis parcelas, ruptura escolhida, evidências bem e mal calibradas, rota de confirmação, ação, feedback sem culpa, competências e recomendação. A recompensa aparece somente como potencial conforme a versão publicada. Equipe e gestão nunca recebem ordem, evidências ou resposta individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, sujeita à aprovação da versão executável e às regras vigentes.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida pela chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** a versão 1 permanece imutável e não é reavaliada por este blueprint.
- **Integrações futuras:** Missões, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este desenho é semântico e não substitui tipos aprovados no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | ID publicado | Sim | catálogo autoritativo | deve corresponder à versão-alvo |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | rejeitar versão desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | não confiar no cliente |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |
| `orderedArtifactIds` | lista ordenada, completa e sem duplicatas | Sim | interação | exatamente os artefatos do pacote |
| `turningPointArtifactId` | ID de artefato permitido | Sim | interação | deve pertencer à lista |
| `evidenceAssessments` | pares de evidência e classe allowlisted | Sim | interação | classes: fato, indício, inferência |
| `provisionalConclusionId` | opção publicada | Sim | interação | preserva revisão, não pontua isoladamente |
| `finalConclusionId` | opção publicada | Sim | interação | admite legítimo, malicioso ou inconclusivo |
| `confirmationRouteId` | rota fictícia allowlisted | Sim | interação | deve ser independente quando aplicável |
| `finalActionId` | ação allowlisted | Sim | interação | coerente com o pacote |
| `reportDetailIds` | lista fechada sem segredo | Condicional | interação | obrigatória quando o caso exige reporte |
| `transferDecisionId` | opção publicada | Sim | transferência | mesmo comportamento, outro canal |

Nota, competências, bônus e feedback são derivados pelo avaliador autoritativo.

### 11.1 Invariantes

- IDs e opções pertencem à versão publicada;
- a ordem cobre cada artefato uma vez;
- listas rejeitam duplicatas e valores extras;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op;
- tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Registrar somente pacote, rascunho mínimo de ordem e decisões, resposta bruta, resultado derivado e progresso, com `isAuthoritative: false`. A adoção do novo contrato requer análise explícita do esquema local.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão.

### Compatibilidade

- a evolução exige nova `activityVersion`;
- tentativas da versão 1 continuam legíveis, imutáveis e avaliadas pela regra original;
- mudança de forma persistida exige análise de `APP_SCHEMA_VERSION`;
- migrações preservam progresso, pontos, recompensas, preferências e evidências;
- recompensa já reivindicada não é concedida novamente por reformulação;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Mínima, fictícia e não autoritativa | Própria tentativa | Não | Não; somente auditoria autorizada e restrita |
| Nota e feedback | Resultado derivado | Completo | Não | Somente agregado permitido |
| Competências | Derivadas da tentativa | Próprias | Agregado sem resposta | Agregado com limiar de privacidade |
| Recompensa | Chave e valor demonstrativos | Própria | Não | Total agregado quando permitido |
| Agregado | Derivado sem conteúdo de resposta | Contexto coletivo permitido | Contagens e tendências | Contagens e tendências autorizadas |

É proibido usar credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando ou reporte real. O player não afirma que contato, bloqueio ou reporte corporativo ocorreu.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente após transição;
- lista ordenada semanticamente, posição anunciada e operação integral por teclado;
- botões Mover para cima/baixo e seletor de posição como alternativas a arrastar;
- tabela evidencia–afirmação equivalente ao painel visual;
- `fieldset` e `legend` para decisões;
- feedback e erros em regiões adequadas sem apagar contexto;
- contraste, texto ampliado e movimento reduzido;
- ausência de limite de tempo e linguagem sem culpa;
- desktop neste blueprint; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogos e mensagens atuais | Três pacotes declarativos e relações esperadas | Fundação P0 |
| Interface | Shell, mensagens, evidências e resultado | Ordenação/linha temporal e painel de relações | P1 |
| Contrato e avaliador | Validação e resultado determinísticos | Contrato próprio, ordem, relações e controles críticos | P0/P1 |
| Estado e provider | Fluxo de tentativa atual | Rascunho e revisão sem contaminar versão 1 | Decisão de retomada |
| Persistência | Envelope e quarentena atuais | Nova forma de resposta e compatibilidade | Análise de esquema |
| Integrações | Hub, Perfil e competências | Registro da versão-alvo | Backend antes do uso real |
| Testes | Testes de regras e navegador existentes | Ordenação, foco, pacotes e compatibilidade v1 | Harness acessível P0 |

**Esforço relativo:** G. **Posição provável:** fundação P0 e mecânica reutilizável P1; não constitui cronograma.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote e opções por allowlist;
- ordenação completa, ponto de mudança e relações válidas;
- avaliador integral, parcial, inseguro, legítimo, inconclusivo e inválido;
- pesos somando 100, nota limitada e controles críticos;
- tentativa duplicada, repetição e recompensa idempotente;
- leitura imutável das tentativas da versão 1, migração e quarentena;
- privacidade do agregado e integrações com Perfil;
- rota própria sem queda silenciosa no hub;
- teclado, foco, anúncios de posição e tabela equivalente em navegador.

### Manuais no desktop

- os três percursos, revisão, retomada e repetição;
- primeira abertura sem seletor de pacote e repetição com **Praticar com outro caso**;
- clareza do briefing, das instruções e das alternativas sem conhecimento técnico prévio;
- ordenação por teclado, leitor de tela e sem arrastar;
- caso malicioso, legítimo e inconclusivo;
- alto contraste, texto ampliado e movimento reduzido;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Phishing interno ou lateral | Banco de casos | Aprovar pacote interno e linguagem de reporte sem acusação | A primeira versão já cobre a ruptura com três pacotes |
| Thread fabricada | Banco de casos e transferência própria | Aprovar conteúdo que diferencie ausência de contexto de falsificação comprovada | Exige outro padrão de evidência e controle de falsos positivos |
| Regras maliciosas de caixa | Debrief | Revisão técnica e texto de responsabilidade compartilhada | Não é fenômeno detectável com confiabilidade pelo funcionário |

## 18. Gates de conversão técnica e publicação

Os percursos, casos, pesos e controles foram convertidos em código em 2026-08-15. Os gates abaixo foram fechados para a demonstração local; publicação organizacional continua condicionada ao backend autoritativo e à validação especializada.

- três pacotes publicados: uso indevido provável, legítimo confirmado e escopo não reconhecido;
- pesos 20/20/20/15/15/10, corte 75 e controles críticos determinísticos;
- `activityVersion: 2`, rota e chave lógica de recompensa preservadas;
- rascunho permanece apenas na sessão e não é persistido;
- fontes são fictícias e inertes;
- v1 e v2 coexistem, sem conversão ou nova recompensa.

A revisão curricular posterior foi convertida sem mudar o painel de evidências: a escolha inicial foi removida, o primeiro caso passou a ser atribuído automaticamente, a saída passou a recomendar **Você iniciou este acesso?** e os textos foram contextualizados. A mudança permaneceu compatível com v2 porque não alterou contrato, allowlists, avaliador, pontuação ou significado das respostas.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
| 2026-08-15 | Versão 2 integrada com três pacotes e contrato próprio | Implementada e validada na demonstração | Esquema 8 e migração v7→v8 |
| 2026-08-15 | Jornada reposicionada; escolha inicial removida; caso atribuído; textos contextuais; revisão resposta por resposta; painel de evidências preservado | Implementada e validada na demonstração | Apresentação e encadeamento; sem nova versão, contrato ou recompensa |
| 2026-08-15 | Pergunta abstrata sobre “rota” e “solicitante” substituída por objetivo de verificação e ações concretas | Implementada e validada na demonstração | Somente texto visível; IDs e avaliação preservados |
