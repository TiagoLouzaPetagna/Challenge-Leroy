# Documento inesperado

> **Atualização do portal (2026-09-20):** versão curta v2 disponível em `/missoes/documento-inesperado`, com quatro decisões sobre contexto, confirmação com RH, limite da evidência e encaminhamento sem abrir o anexo. O comportamento central foi mantido. Os percursos mais extensos descritos abaixo ainda representam o blueprint anterior à versão curta.

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** existe um card planejado no catálogo; não há player, versão executável nem rota funcional comprovada para esta atividade.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão |
| Comportamento principal aprovado | Confirmar contexto e recusar quebra de proteção antes de abrir ou executar |
| Mecânica-base aprovada | Inspetor de propriedades + cadeia de exposição + ação segura |
| Estado da atividade atual | Planejada no catálogo; indisponível como player próprio |
| Relação com implementação existente | Atividade nova, distinta da resposta pós-incidente |
| `activityId`, versão e rota | O catálogo contém o identificador candidato `mission:unexpected-document`; versão e rota executáveis não estão definidas |
| Duração-alvo | 9–12 minutos |
| Regra de recompensa considerada | Regra vigente de Missão; não ativada pelo blueprint |
| Conceitos proprietários | 15; propriedade definida no mapa inverso aprovado |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três percursos iniciais para dupla extensão, macro e ClickFix, cada um com até dois complementares;
- inspeção de contexto e propriedades, marcação da fronteira de proteção e ação segura;
- avaliação, controles críticos, estados e transição para recuperação quando narrativamente necessária;
- conteúdo representado e inerte, sem upload, download, arquivo ou comando.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão e rota executáveis;
- forma final do inspetor compartilhado e da cadeia de exposição;
- procedimentos corporativos e publicação dos pacotes;
- ordem, pontos e integrações reais.

## 2. Contrato educacional

- **Comportamento observável:** comparar o artefato com contexto, expectativa e origem; interromper quando houver pedido para abrir, executar ou enfraquecer proteção sem confirmação independente.
- **Técnicas ou objetivos do atacante:** explorar curiosidade, disfarçar o tipo do artefato, pedir habilitação de conteúdo ou cruzar da página para ação no sistema.
- **Atalho inseguro enfrentado:** confiar no nome, ícone, ausência de alerta ou aparência do documento e seguir instruções internas do próprio artefato.
- **Resposta segura generalizável:** confirmar por rota conhecida, tratar mudança de proteção como fronteira crítica e reportar sem manipular o conteúdo.
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** natureza interna do arquivo, ausência de código malicioso, retenção ou proteção técnica real.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:unexpected-attachment` | Núcleo | Primeira versão | Compara artefato textual com agenda, chamado, histórico e contato conhecido | P1, P2 e P3 |
| `concept:influence-curiosity` | Complementar | Primeira versão | Mostra que interesse ou surpresa não equivalem a autorização | P1, P2 e P3 |
| `concept:hidden-double-extension` | Complementar | Primeira versão | Usa propriedades cenográficas para mostrar inconsistência sem memorização | P1 |
| `concept:macro-enable-content` | Complementar | Primeira versão | Marca pedido de habilitação como quebra de proteção que exige processo | P2 |
| `concept:clickfix` | Complementar | Primeira versão | Marca a passagem de página para ação no sistema, sem comando | P3 |
| `concept:file-format-variety` | Variação de caso | Banco de casos | Varia contêiner mantendo o mesmo processo, sem lista absoluta de extensões | Banco versionado |
| `concept:icon-masquerade` | Variação de caso | Banco de casos | Calibra ícone/nome incompatíveis como pistas fracas | Banco versionado |
| `concept:rtlo-file-name` | Variação de caso | Banco de casos | Explica inconsistência de direção sem teste perceptivo | Banco versionado |
| `concept:password-archive` | Variação de caso | Banco de casos | Contrasta compactado esperado e inesperado sem solicitar senha | Banco versionado |
| `concept:cloud-share` | Variação de caso | Banco de casos | Separa serviço, remetente, proprietário e destino | Banco versionado |
| `concept:document-as-bridge` | Variação de caso | Banco de casos | Reavalia nova origem quando documento aponta para link, QR ou telefone | Banco versionado |
| `concept:copied-command` | Variação de caso | Banco de casos | Verifica origem e autorização sem mostrar sintaxe ou usar clipboard | Banco versionado |
| `concept:html-smuggling` | Debrief ou limite técnico | Debrief | Explica download construído no navegador sem diagnóstico ou código | Debrief |
| `concept:antivirus-silence` | Debrief ou limite técnico | Debrief | Ensina que ausência de alerta é evidência insuficiente | Debrief |
| `concept:polyglot-magic-type` | Debrief ou limite técnico | Debrief | Delimita que tipo interno não é diagnosticável pela aparência | Debrief |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — O currículo que chegou hoje | Anexo inesperado com nome atraente e propriedade inconsistente | Confirmar contexto antes de abrir | Curiosidade; dupla extensão | Documento legítimo, mas não esperado, em outro canal | Malicioso provável ou inconclusivo |
| P2 — Habilite para ver a planilha | Planilha plausível pede habilitação de conteúdo | Recusar quebra de proteção sem autorização | Curiosidade; macro/habilitar conteúdo | Documento legítimo com fluxo oficial | Malicioso ou legítimo após confirmação |
| P3 — A verificação saiu do documento | Anexo inesperado contém uma falsa verificação que pede ação no sistema | Interromper a cadeia e confirmar pela rota oficial | Curiosidade; ClickFix | Outro anexo inesperado chega por chat | Malicioso provável |

Cada pacote mantém o anexo inesperado como núcleo e ativa somente dois complementares. Conceitos do banco aparecem apenas em versões posteriores.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — O currículo que chegou hoje

| Elemento | Definição |
|---|---|
| Situação inicial | Um arquivo textual representado como currículo chega a uma área que não tem vaga aberta. |
| Canal e artefatos | Mensagem, agenda de recrutamento, nome exibido e propriedades fictícias. |
| Identidade ou pretexto | Candidato não conhecido cita uma pessoa real apenas dentro do cenário. |
| Objetivo do atacante ou hipótese legítima | Induzir abertura; também pode ser envio legítimo fora do processo. |
| Pressões e aparências | Curiosidade e nome de arquivo com aparência comum. |
| Evidências disponíveis | Agenda, origem, nome completo, tipo alegado, histórico e diretório. |
| Evidência decisiva ou limite de certeza | Inconsistência eleva risco, mas contexto e confirmação determinam a ação; não se diagnostica conteúdo. |
| Confirmação independente | Consultar a vaga/solicitação pela área oficial fictícia. |
| Ação segura | Não abrir; confirmar expectativa e encaminhar pelo procedimento. |
| Reporte ou recuperação | Reportar se não houver solicitação ou se a origem falhar. |
| Transferência curta | Documento legítimo porém inesperado exige verificar, não denunciar automaticamente. |
| Debrief | Extensão é propriedade a inspecionar, não lista mágica de segurança. |
| Conteúdo fictício necessário | Mensagem, agenda, inspetor e diretório, sem arquivo real. |

### Percurso P2 — Habilite para ver a planilha

| Elemento | Definição |
|---|---|
| Situação inicial | Uma planilha representada pede “habilitar conteúdo” para exibir valores. |
| Canal e artefatos | Mensagem, faixa visual inerte, procedimento de fornecedor e histórico fictício. |
| Identidade ou pretexto | Fornecedor plausível, mas entrega não registrada. |
| Objetivo do atacante ou hipótese legítima | Levar à quebra de proteção; pode haver documento legítimo mal encaminhado. |
| Pressões e aparências | Interesse nos valores e alegação de compatibilidade. |
| Evidências disponíveis | Pedido original, política, canal de entrega e propriedades do artefato. |
| Evidência decisiva ou limite de certeza | A própria faixa não autoriza habilitação; a fonte oficial precisa confirmar processo e artefato. |
| Confirmação independente | Contato cadastrado ou portal fictício de fornecedor. |
| Ação segura | Manter proteção, pausar e pedir entrega pelo fluxo aprovado. |
| Reporte ou recuperação | Reportar pedido de habilitação se não confirmado. |
| Transferência curta | Documento legítimo no repositório oficial mostra quando seguir sem habilitar proteção extra. |
| Debrief | A autorização vem da política e do canal, não do conteúdo do arquivo. |
| Conteúdo fictício necessário | Cartão de arquivo, faixa, política e portal cenográfico. |

### Percurso P3 — A verificação saiu do documento

| Elemento | Definição |
|---|---|
| Situação inicial | Um anexo inesperado, representado como guia de acesso, chega sem solicitação prévia; sua prévia estática contém um quadro de “verificação” que pede uma ação no sistema. |
| Canal e artefatos | Mensagem recebida, cartão do anexo, prévia textual inerte, sequência higienizada em linguagem abstrata e procedimento oficial. |
| Identidade ou pretexto | Suposto fornecedor de suporte envia um guia para “liberar” o acesso. |
| Objetivo do atacante ou hipótese legítima | Usar o documento inesperado e a curiosidade para fazer a pessoa cruzar da leitura para uma ação no sistema. |
| Pressões e aparências | Guia com aparência operacional, falsa verificação e alegação de bloqueio do trabalho. |
| Evidências disponíveis | Ausência de solicitação ou chamado, origem não cadastrada, instrução de sistema e rota oficial do serviço. |
| Evidência decisiva ou limite de certeza | O anexo não era esperado e pede quebra de proteção fora do processo; isso determina a interrupção, sem exigir diagnóstico do conteúdo ou da técnica interna. |
| Confirmação independente | Não seguir o documento; consultar o chamado e o serviço pelo portal fictício conhecido. |
| Ação segura | Não copiar nem executar; fechar a prévia, preservar o contexto e usar a rota oficial. |
| Reporte ou recuperação | Relatar a categoria do anexo e da instrução, sem reproduzi-la; se alguma ação já tiver sido narrada, encaminhar para Cliquei. E agora?. |
| Transferência curta | Outro anexo inesperado chega por chat e contém a mesma falsa verificação com menos orientação. |
| Debrief | O anexo inesperado é o início do caso; a falsa verificação não ganha autoridade para controlar o sistema. |
| Conteúdo fictício necessário | Mensagem, cartão de anexo, prévia inerte, etapas abstratas, diretório e blocos de reporte. |

O documento é o próprio artefato inicial do P3 e a instrução aparece dentro da prévia simulada: não há link, QR ou telefone intermediário e o conceito de documento como ponte permanece no banco de casos. Nenhum artefato oferece upload, download, execução, copiar comando, link ou scanner real.

## 6. Mecânica e diferenciação

- **Interação central:** abrir propriedades cenográficas, relacionar expectativa/origem, marcar a fronteira da cadeia e escolher confirmação, ação e eventual encaminhamento à recuperação.
- **Por que combina com o comportamento:** o risco nasce da combinação entre contexto e próxima ação, não de decorar formato.
- **Como se distingue das outras 21 atividades:** atua antes de abrir/executar; Cliquei. E agora? é proprietária da resposta depois da exposição.
- **O que é reutilizável:** inspetor de PhishLab, fontes/evidências, shell de Missão, cartões e resultados.
- **O que exige componente novo:** inspetor genérico de artefato, cadeia de exposição inerte e avaliador de fronteira/contexto.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela de propriedades, lista ordenada e seletores para estágio/fronteira.
- **Risco de virar questionário disfarçado e prevenção:** a conclusão depende de relacionar artefato, expectativa, política e fonte; não há pergunta “qual extensão é perigosa?”.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contexto, aviso inerte e objetivo | Iniciar pacote | Pacote publicado | `casePackageId` | Orientação breve | Foco no título |
| Investigação | Artefato, expectativa e fontes | Inspecionar propriedades e contexto | Inspeção não reduz nota | propriedades/fontes | Nome e ícone não são veredito | Tabela |
| Decisão inicial | Cadeia e ações possíveis | Marcar fronteira e prosseguir/verificar/interromper | Fronteira obrigatória | fronteira e decisão | Consequência limitada | Lista numerada |
| Consequência | Resposta de fonte ou nova instrução | Revisar avaliação | Conteúdo determinístico | revisão | Explica o risco da próxima ação | Região de status |
| Revisão | Painel completo | Alterar respostas | Livre antes do envio | rascunho | Sem penalidade | Foco no item |
| Decisão final | Rotas, ação e reporte | Confirmar plano | Controles completos | rota, ação e reporte | Erros específicos | Resumo |
| Transferência | Segundo artefato curto | Aplicar contexto e fronteira | Decisão mínima | transferência | Feedback posterior | Texto |
| Resultado | Nota privada | Rever/concluir | Avaliação válida | resultado | Decomposição | Resumo linear |
| Debrief | Limites técnicos | Ler/retornar | Sem nota nova | visualização opcional | Sem diagnóstico impossível | Texto |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa | Briefing/início | Estado objetivo | Foco no `h1` |
| Em andamento | Pacote ativo | Inspetor, cadeia e fontes | Rascunho mínimo se aprovado | Progresso anunciado |
| Retomada | Rascunho compatível | Resumo/continuar/reiniciar | Mesma versão/pacote | Contexto antes dos controles |
| Revisão | Decisão inicial feita | Alterar livremente | Atualiza rascunho | Foco no item |
| Concluída | Resposta válida | Resultado/debrief | Tentativa imutável | Título focado |
| Repetição | Nova tentativa | Novo pacote sem pontos duplicados | Melhor/última separadas | Aviso explícito |
| Conteúdo indisponível | Pacote/versão ausente | Explicação/retorno | Nenhuma tentativa | Alerta sem fallback |
| Resposta inválida | ID/campo incompatível | Corrigir mantendo trabalho | Não conclui | Erros associados |
| Falha ao salvar | Persistência falhou | Tentar novamente | Sem recompensa até confirmar | Alerta persistente |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Contexto, expectativa e origem | 25 | Relaciona todas as fontes relevantes | Falta uma fonte não crítica | Aparência basta para abrir | análise contextual |
| Propriedades e inconsistências | 20 | Usa propriedades como evidência calibrada | Identifica pista, mas superafirma | Ignora inconsistência ou memoriza regra absoluta | análise de artefato |
| Fronteira de proteção/execução | 25 | Interrompe antes de habilitar/copiar/executar | Pausa com justificativa incompleta | Cruza a fronteira | proteção |
| Confirmação independente | 20 | Usa rota conhecida fora do artefato | Rota oficial incompleta | Usa contato/instrução do artefato | verificação segura |
| Reporte ou encaminhamento | 10 | Reporta ou encaminha proporcionalmente | Detalhe útil ausente | Manipula artefato ou não reporta caso crítico | reporte |

Regras desta avaliação:

- os pesos somam 100 e a nota final é limitada a 0–100;
- conclusão e desempenho são estados separados; resultado baixo não bloqueia progresso;
- `needsReview` considera nota e controles críticos;
- o feedback separa contexto, propriedade observada, incerteza e processo seguro;
- extensão, ícone ou ausência de alerta isolados não valem como veredito;
- velocidade não é pontuada;
- caso legítimo não premia abertura automática antes da confirmação.

### 9.1 Controles críticos

- não abrir, habilitar, copiar ou executar artefato não confirmado;
- usar confirmação independente;
- não desativar controles nem seguir instrução fora do processo;
- quando já houver interação narrada, encaminhar para recuperação e reporte.

### 9.2 Resultado privado

O resultado mostra nota, contexto, propriedades usadas, fronteira, rota, ação, controles, feedback, competências e recompensa potencial. A equipe nunca recebe o artefato ou resposta individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, sujeita à aprovação executável.
- **Bônus:** regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave; repetição não duplica.
- **Versões anteriores:** o card planejado não constitui tentativa nem recompensa.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas, recomendação e encaminhamento para recuperação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | local/servidor | idempotente |
| `activityId` | ID publicado | Sim | catálogo | ainda não decidido para execução |
| `activityVersion` | versão publicada | Sim | catálogo | rejeitar desconhecida |
| `casePackageId` | pacote allowlisted | Sim | conteúdo | não confiar no cliente |
| `completedAt` | data válida | Sim | servidor real | sem velocidade |
| `inspectedPropertyIds` | lista de propriedades | Sim | interação | IDs do pacote, sem duplicatas |
| `expectationAssessmentId` | opção publicada | Sim | interação | esperado, inesperado ou inconclusivo |
| `artifactFindingIds` | fatos/indícios allowlisted | Sim | interação | sem diagnóstico técnico |
| `boundaryActionId` | fronteira/ação publicada | Sim | interação | não executa ação |
| `confirmationRouteId` | rota fictícia | Sim | interação | independente |
| `finalActionId` | opção publicada | Sim | interação | proporcional |
| `reportDetailIds` | blocos fechados | Condicional | interação | sem segredo |
| `recoveryHandoffId` | opção de encaminhamento | Condicional | interação | só quando interação é narrada |
| `transferDecisionId` | opção publicada | Sim | transferência | mesmo comportamento |

Resultados são derivados pelo avaliador.

### 11.1 Invariantes

- IDs pertencem ao pacote publicado;
- listas rejeitam duplicatas/extras;
- fronteira e ação são compatíveis;
- etapa obrigatória não é omitida;
- replay é no-op e nova tentativa não duplica recompensa;
- conteúdo e avaliador têm versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Persistir apenas IDs fictícios, rascunho mínimo, resultado e progresso com `isAuthoritative: false`. Nenhum arquivo, conteúdo livre, nome real ou amostra binária.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão.

### Compatibilidade

- atividade exige versão publicada própria;
- identificador candidato não comprova contrato;
- forma nova exige análise de `APP_SCHEMA_VERSION`;
- migrações preservam todo histórico;
- inválidos seguem para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | IDs fictícios mínimos | Própria | Não | Auditoria restrita, se autorizada |
| Nota e feedback | Derivados | Completos | Não | Agregado |
| Competências | Derivadas | Próprias | Agregado | Agregado com limiar |
| Recompensa | Demonstrativa | Própria | Não | Total permitido |
| Agregado | Sem artefato/resposta | Contexto coletivo | Contagens/tendências | Contagens/tendências |

Proibir arquivo, upload, download, link, comando, clipboard, scanner, credencial, OTP, dado pessoal ou reporte real. O player não diz que analisou, bloqueou ou removeu um arquivo.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado e foco coerente;
- propriedades e cadeia em estrutura textual/tabela;
- operação integral por teclado e sem dependência de arrastar;
- texto equivalente a ícone, extensão visual e faixa;
- `fieldset`, `legend`, erros e regiões de status;
- contraste, texto ampliado, movimento reduzido, sem limite de tempo;
- linguagem sem culpa;
- desktop; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Artefatos de PhishLab e catálogo | Três pacotes de propriedades/cadeias | P0 |
| Interface | Evidências, fontes e shell | Inspetor genérico e cadeia | P1 |
| Contrato e avaliador | Validadores atuais | Contexto, fronteira e handoff | P0/P1 |
| Estado e provider | Fluxo atual | Registro da nova atividade | Registro P0 |
| Persistência | Envelope atual | Nova tentativa por IDs | Análise de esquema |
| Integrações | Hub/Perfil/recuperação | Registro e recomendações | Backend |
| Testes | Regras/navegador | Inspetor, casos e teclado | Harness P0 |

**Esforço relativo:** G. **Posição provável:** P0 e componente compartilhado P1.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, propriedades e opções por allowlist;
- avaliador integral, parcial, inseguro, legítimo, inconclusivo e inválido;
- pesos 100, nota limitada e controles críticos;
- idempotência, repetição, persistência, recompensa e quarentena;
- agregado privado e integrações;
- rota própria sem fallback;
- teclado, foco e equivalentes textuais.

### Manuais no desktop

- os três percursos, revisão, retomada e repetição;
- caso malicioso, legítimo e inconclusivo;
- leitor de tela, teclado, contraste, texto ampliado e movimento reduzido;
- nenhum arquivo, download, comando ou efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| Variedade de formato; ícone; RTLO; compactado com senha | Banco de casos | Aprovar pacotes e revisão de falsos positivos | Ampliam variedade, não o comportamento inicial |
| Compartilhamento em nuvem; documento como ponte; comando copiado | Banco de casos | Componentes e conteúdo multietapa aprovados | Exigem outras cadeias e fontes sem sobrecarregar a primeira versão |
| HTML smuggling; silêncio do antivírus; tipo interno divergente | Debrief | Revisão técnica dos limites | Não são detectáveis com confiabilidade pela aparência |

Não há conceito proprietário de versão futura no mapa atual.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes, propriedades exibidas e casos legítimos/inconclusivos;
- aprovar pesos, corte e controles críticos;
- decidir `activityId`, versão e rota executáveis;
- aprovar a fronteira exata entre esta Missão e Cliquei. E agora?;
- aprovar procedimento de confirmação e encaminhamento;
- decidir persistência de rascunho.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual detalhado | Proposta aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
