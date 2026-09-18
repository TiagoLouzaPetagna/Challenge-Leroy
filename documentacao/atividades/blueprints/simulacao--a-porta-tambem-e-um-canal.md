# A porta também é um canal

> **Estado do blueprint:** arquitetura futura aprovada em 2026-08-15 como fronteira; continua aguardando escolha de composição e validação das políticas locais. Não constitui blueprint pronto para versão executável.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Cobertura por momento:** 0 conceitos em Primeira versão e 9 conceitos em Versão futura.
>
> **Integração no portal:** atividade inexistente no catálogo executável; não há primeira versão, pacote aprovado, player, contrato, identificador ou rota.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Simulação |
| Comportamento principal aprovado | Encaminhar pessoa, pergunta ou objeto pelo controle apropriado sem ceder acesso próprio |
| Mecânica-base aprovada | Estação de recepção textual/ilustrada com consulta de registro e cadeia de custódia |
| Estado da atividade atual | Arquitetura futura, sem composição escolhida; 0 conceitos em Primeira versão e 9 em Versão futura |
| Relação com implementação existente | Hipótese de atividade nova, condicionada a procedimentos locais, escolha de composição e componentes ainda não disponíveis |
| `activityId`, versão e rota | Não definidos |
| Duração-alvo | Não estimada antes da escolha de composição |
| Regra de recompensa considerada | Regra de Simulação só poderá ser discutida depois de composição e políticas aprovadas; nenhuma recompensa é proposta agora |
| Conceitos proprietários | 9, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md) |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- não existe percurso de primeira versão aprovado neste momento;
- os nove conceitos permanecem no momento **Versão futura**, sem antecipação para catálogo, pontuação ou player;
- quatro módulos candidatos futuros organizam possibilidades, sem escolher uma composição;
- qualquer implementação deverá ser textual e inerte como base, sem exigir deslocamento, confronto ou ambiente físico rico;
- casos futuros precisarão incluir visitante legítimo e situação inconclusiva, além de tentativa maliciosa.

Este documento decide apenas fronteiras e requisitos de arquitetura futura. Não aprova percursos, casos, pesos, contrato, duração ou recompensa.

### 1.2 O que permanece sem decisão técnica

- se e quando existirá uma primeira versão;
- quais módulos futuros formarão a composição inicial;
- `activityId`, versão, rota, duração e recompensa;
- procedimento local de recepção, acesso, descarte e custódia;
- conteúdo ilustrado, público elegível e ordem de implementação.

## 2. Contrato educacional

- **Comportamento observável:** identificar o objeto da solicitação, a autoridade necessária e a rota de apoio; preservar a própria credencial, o acesso e a informação enquanto oferece ajuda segura.
- **Técnicas ou objetivos do atacante:** pretexting presencial, personificação, elicitation, troca social, carona de acesso, observação de tela e isca por mídia ou descarte.
- **Atalho inseguro enfrentado:** ceder acesso por cortesia, aparência, uniforme, familiaridade, urgência ou vontade de resolver pessoalmente.
- **Resposta segura generalizável:** não autenticar outra pessoa com a própria credencial; consultar registro e anfitrião pela rota local; encaminhar pessoa, pergunta ou objeto sem confronto e com mínima exposição.
- **O que uma conclusão futura permitiria afirmar:** desempenho no procedimento fictício e versionado apresentado.
- **O que não permitiria afirmar:** intenção real de uma pessoa, risco baseado em aparência, segurança física universal, retenção ou adequação a instalações diferentes.

Como não há primeira versão nem composição escolhida, este contrato é apenas uma fronteira educacional de arquitetura futura: ainda não é operacional, avaliável ou submetido à aprovação como percurso.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:physical-pretexting` | Núcleo | Versão futura | Separa alegação, necessidade, identidade e autorização | Módulos futuros F1 a F4 |
| `concept:physical-impersonation` | Complementar | Versão futura | Compara registro/ordem com pessoa alegada, sem julgar aparência | F1 e F3 |
| `concept:elicitation` | Complementar | Versão futura | Limita informação durante conversa casual e encaminha perguntas | F2 |
| `concept:physical-quid-pro-quo` | Variação de caso | Versão futura | Oferta de ajuda ou brinde que muda para pedido de acesso | F2 |
| `concept:usb-baiting` | Variação de caso | Versão futura | Objeto encontrado segue custódia sem conexão ou inspeção | F4 |
| `concept:tailgating` | Variação de caso | Versão futura | Ajuda por recepção sem compartilhar autenticação ou confrontar | F3 |
| `concept:shoulder-surfing` | Variação de caso | Versão futura | Protege tela ou informação sem acusar quem está próximo | F3 |
| `concept:dumpster-diving` | Variação de caso | Versão futura | Descarte segue classificação e destino autorizado | F4 |
| `concept:removable-media-custody` | Variação de caso | Versão futura | Registra transferência de responsabilidade sem abrir conteúdo | F4 |

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| Nenhum percurso aprovado | Não aplicável | Não há primeira versão composta | Nenhum | Nenhum | Não aplicável |

Os quatro módulos descritos na seção 17 são opções de **Versão futura**, não uma composição escolhida nem percursos de primeira versão. Nenhum deles cria ID, versão, rota, pontos, recompensa ou disponibilidade.

## 5. Casos e conteúdo da primeira versão

Não existem casos de primeira versão porque o mapa aprovou os nove conceitos exclusivamente para **Versão futura**. Antecipar um caso nesta seção mudaria o momento curricular sem aprovação.

Somente depois da aprovação das políticas locais uma etapa posterior poderá escolher módulos da seção 17, definir quais conceitos estarão ativos em cada pacote e manter no máximo dois Complementares formais. Essa composição futura deverá trazer, no mínimo:

- uma situação maliciosa ou de alto risco;
- uma situação legítima em que a pessoa realmente precisa de ajuda;
- uma situação inconclusiva em que registro ou anfitrião não estão disponíveis;
- transferência curta que reaplique o encaminhamento seguro sem criar outro objetivo.

Todo conteúdo será fictício, revisável e inerte. Não haverá planta, crachá, agenda, câmera, biometria, nome, ordem de serviço ou rotina real da organização.

## 6. Mecânica e diferenciação

As decisões desta seção são requisitos e possibilidades de arquitetura, condicionais à escolha e aprovação futura de uma composição.

- **Interação central:** receber uma pessoa, pergunta ou objeto descrito, consultar agenda/ordem/diretório/política fictícios e montar o encaminhamento seguro ou a cadeia de custódia.
- **Por que combina com o comportamento:** o ponto de aprendizagem é oferecer ajuda sem ceder o próprio acesso e sem assumir intenção pela aparência.
- **Como se distingue das outras 21 atividades:** leva o mesmo princípio de origem e autorização a um contexto presencial/ambiental, com rotas de recepção e custódia em vez de mensagem ou URL.
- **O que é reutilizável:** shell, estação de processo, cartões de fonte, mapa de relações, linha temporal e montador de ação.
- **O que exige componente novo:** estação de recepção, estados de anfitrião/registro e cadeia de custódia de objeto.
- **Alternativa sem arrastar, mídia ou representação espacial:** caso textual com tabelas e seletores; ilustrações são opcionais e nunca contêm pista exclusiva.
- **Risco de virar questionário disfarçado e prevenção:** a pessoa consulta registros e monta um encaminhamento; não classifica rostos, roupas ou perfis como “suspeitos”.

Ambiente físico rico, vídeo, voz, mapa de andar, câmera ou encenação não são requisitos. A futura mecânica não poderá pedir que o funcionário confronte, siga, toque, retenha fisicamente ou fotografe alguém.

## 7. Fluxo completo

O fluxo abaixo é somente um esqueleto de arquitetura para comparar futuras composições; não é um fluxo aprovado e não descreve funcionalidade disponível.

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Local fictício, papel do funcionário, limites de segurança e política aplicável | Iniciar | Pacote futuro publicado | Início e pacote | Sem revelar resultado | `h1` e resumo |
| Investigação | Pessoa, pergunta ou objeto e fontes autorizadas | Separar alegação, necessidade, autorização e ativo | Livre consulta | Campos e fontes consultados | Confirma inspeção | Tabela textual |
| Decisão inicial | Rotas de ajuda, recepção, anfitrião, segurança ou custódia | Escolher encaminhamento provisório | Opção pertence ao pacote | Rota e justificativa estruturada | Efeito factual, não acerto | `fieldset` |
| Consequência | Resposta fictícia do registro/anfitrião/política | Atualizar rota sem ceder acesso | Conteúdo versionado | Evidência liberada | Região de status | Texto equivalente |
| Revisão | Resumo de acesso, informação e custódia | Corrigir e revisar exposição | Todos os ativos tratados | Rascunho | Avisos de incompletude | Lista linear |
| Decisão final | Ação, limite e apoio oferecido | Confirmar | Contrato válido | Resposta bruta | Sem nota antecipada | Resumo antes do envio |
| Transferência | Minicaso em outro ponto físico ou objeto | Reaplicar o mesmo encaminhamento | Uma decisão curta | Transferência | Sem acerto antecipado | Texto |
| Resultado | Nota e controles futuros | Consultar | Tentativa válida | Resultado derivado | Privado, sem culpa | Tabela |
| Debrief | Fato, indício, hipótese, limite, segurança e ajuda | Rever/repetir | Nova tentativa | Intenção de repetir | Explicação completa | Conteúdo linear |

## 8. Estados da experiência

Os estados abaixo somente se aplicam se uma versão futura for aprovada.

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Versão publicada, sem rascunho/tentativa | Apresentação e iniciar | Progresso oficial Não iniciada | `h1` e descrição |
| Em andamento | Pacote iniciado | Estação, fontes, rotas e revisão | Pacote, inspeções e escolhas | Foco e progresso textual |
| Retomada | Rascunho compatível | Resumo e continuar/recomeçar | Mesma versão/pacote | Anúncio do ponto retomado |
| Revisão | Encaminhamento provisório completo | Resumo editável | Rascunho preservado | Cabeçalhos e links |
| Concluída | Tentativa válida | Resultado, debrief e repetição | Progresso oficial Concluída | Foco no resultado |
| Repetição | Já concluída | Pacote alternativo, sem nova recompensa | Melhor e última separadas | Aviso explícito |
| Conteúdo indisponível | Política, pacote ou versão retirados | Retorno ao hub | Sem tentativa | Status e foco |
| Resposta inválida | Fonte/ação/relação incoerente | Corrigir sem perda | Sem conclusão | Alerta associado |
| Falha ao salvar | Persistência recusada | Tentar novamente | Sem recompensa | Alerta e contexto preservado |

Somente Não iniciada, Em andamento e Concluída seriam estados oficiais. Hoje nenhum deles se aplica porque a atividade não está integrada.

## 9. Avaliação e feedback

Os pesos são apenas uma hipótese de distribuição para avaliar viabilidade depois que uma composição for escolhida; não estão submetidos à aprovação, e não existe avaliador ou nota operacional.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Processo e fonte autorizada | 30 | Consulta registro/anfitrião/política por rota conhecida | Usa rota segura, mas deixa uma lacuna não crítica | Confia em uniforme, crachá, familiaridade ou informação fornecida pela própria pessoa | Observar, Verificar |
| Preservação de acesso e informação | 30 | Não cede autenticação e minimiza informação | Evita acesso, mas compartilha detalhe desnecessário | Segura porta, empresta credencial, conecta mídia ou revela informação interna | Decidir, Recuperar |
| Ajuda segura e custódia | 25 | Encaminha pessoa/objeto de modo cordial e rastreável | Encaminhamento seguro, porém incompleto | Confronta, toca, segue, retém fisicamente ou abandona objeto/processo | Decidir, Orientar |
| Proporcionalidade e falso positivo | 15 | Ajuda caso legítimo e preserva incerteza sem perfilamento | Excesso de cautela sem dano | Decide por aparência, sotaque, deficiência, cargo percebido ou acusa sem base | Reportar, Orientar |

Os pesos somam 100. Velocidade, aparência, distância física e reação corporal nunca pontuam.

### 9.1 Controles críticos

Se uma versão futura existir, exigirá revisão quando:

- a pessoa ceder a própria credencial, autenticação ou acesso;
- conectar, abrir, compartilhar ou inspecionar mídia encontrada;
- revelar agenda, planta, tecnologia, identificação ou rotina além do necessário;
- confrontar, seguir, tocar, reter ou bloquear fisicamente alguém;
- decidir com base em atributo pessoal, aparência, roupa, sotaque ou deficiência;
- deixar de oferecer uma rota segura a visitante legítimo ou caso inconclusivo.

`needsReview` seria verdadeiro abaixo de 60 pontos ou com falha em qualquer controle crítico.

### 9.2 Resultado privado

Um resultado futuro mostraria nota, quatro parcelas, fontes, encaminhamento, exposição evitada, cadeia de custódia, competências, `needsReview`, debrief e recompensa potencial. Não exibiria perfil de visitante, interpretação de aparência ou dado de instalação. Nenhuma resposta individual seria enviada à equipe.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** nenhuma nesta etapa; 70 pontos é a regra geral da área a consultar somente depois de composição e versão executável aprovadas.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** se publicada, a primeira recompensa válida usará chave própria; repetição não duplicará pontos.
- **Versões anteriores:** não existem.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendações somente após publicação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

Esta arquitetura futura não ativa nem propõe nesta etapa pontos, card, progresso, conquista ou recomendação.

## 11. Contrato de resposta proposto

Este contrato é apenas uma lista de capacidades que uma composição futura poderá exigir. Nenhum campo, pacote ou fluxo está aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Se houver versão | servidor no uso real | idempotente |
| `activityId` | ID futuro publicado | Se houver versão | catálogo autoritativo | ainda não definido |
| `activityVersion` | versão futura publicada | Se houver versão | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Se houver versão | conteúdo publicado | seleção do servidor |
| `completedAt` | data válida | Se houver versão | servidor real | sem pontuação por tempo |
| `subjectTypeId` | pessoa, pergunta, objeto ou descarte publicado | Sim no contrato futuro | conteúdo/interação | não registrar atributo pessoal |
| `inspectedSourceIds` | IDs únicos | Sim no contrato futuro | interação | somente fontes fictícias |
| `authorizationAssessmentId` | autorizado, não autorizado ou inconclusivo | Sim no contrato futuro | interação | coerente com evidência |
| `routingActionIds` | ações publicadas | Sim no contrato futuro | interação | sem ação física real |
| `informationBoundaryIds` | fragmentos que podem/não podem ser compartilhados | Quando aplicável | interação | somente conteúdo sintético |
| `custodyStepIds` | sequência/arestas publicadas | Para objeto ou descarte | interação | sem upload ou inspeção |
| `transferDecision` | fonte, limite e encaminhamento | Sim no contrato futuro | transferência | allowlist própria |

Nota, competências, feedback e recompensa seriam sempre derivados.

### 11.1 Invariantes

- todos os IDs pertencem à versão e ao pacote futuros;
- listas rejeitam duplicatas e valores extras;
- nenhum campo aceita descrição livre de pessoa, instalação ou incidente;
- ação não pode representar autenticação compartilhada, confronto ou inspeção de mídia;
- autorização inconclusiva não libera acesso;
- replay do mesmo `attemptId` é `no-op`;
- nova tentativa não duplica recompensa;
- conteúdo, política e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Se uma versão for aprovada, guardar somente versão, pacote, fontes fictícias, avaliações, rotas, limites e cadeia de custódia para retomada, com `isAuthoritative: false`. Não guardar descrição livre, imagem, voz, vídeo, geolocalização, biometria, câmera, nome, crachá, agenda ou planta.

### Backend obrigatório

O servidor controlará identidade, autorização, público por função/local, versão, pacote, política aplicável, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Segurança Física, Facilities, RH, Jurídico, Privacidade e Acessibilidade deverão aprovar conteúdo e público antes de uso real.

### Compatibilidade

- qualquer implementação inaugura `activityVersion` própria;
- nova forma persistida exige análise de `APP_SCHEMA_VERSION`;
- conteúdo de um local não pode ser aplicado silenciosamente a outro;
- política retirada torna pacote indisponível, sem reinterpretar tentativa;
- migrações preservam progresso, pontos, preferências e evidências existentes;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Somente IDs fictícios, se houver versão | Própria tentativa | Nunca | Acesso minimizado e autorizado |
| Nota e feedback | Melhor e última, se publicados | Privados | Nunca | Preferir agregado |
| Competências | Derivadas | Privadas | Cobertura agregada | Agregado com limiar |
| Recompensa | Chave e valor futuros | Titular | Nunca | Auditoria |
| Agregado | Nenhum agora; mínimo se futuro | Resumo | Sem pessoa/local/objeto | Coorte autorizada |

São proibidos dados, nomes, imagens, vozes, agendas, crachás, ordens, plantas, câmeras, biometria, rotinas, locais e objetos reais. Não há upload, fotografia, rastreamento, leitura de mídia, chamada, contato ou reporte real. O player não afirma que acesso foi negado, segurança acionada ou objeto entregue.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente;
- experiência integralmente textual; ilustrações são redundantes e opcionais;
- nenhuma avaliação exige caminhar, ficar em pé, ouvir, falar, enxergar rosto, reconhecer roupa ou reagir rapidamente;
- fontes e registros em tabelas semânticas;
- operação integral por teclado;
- cadeia de custódia por lista e seletores, com Subir/Descer quando necessário;
- `fieldset` e `legend` para decisões;
- consequências e erros anunciados sem apagar contexto;
- contraste, texto ampliado, movimento reduzido e ausência de limite de tempo;
- linguagem sem culpa, sem perfilamento e sem recomendação de confronto;
- visitantes legítimos com necessidades de acesso devem receber rota segura equivalente;
- desktop se houver versão; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Pacotes e fontes declarativas | Políticas locais, módulos e revisão multissetorial | P3 e publicação segmentada |
| Interface | Shell, estação de processo, linha temporal | Estação de recepção/custódia | P1/P3 |
| Contrato e avaliador | Validadores determinísticos | Autorização, limite e custódia | P0: validar → avaliar → persistir |
| Estado e provider | Tentativas/progresso | Rascunho por pacote/local | Rejeição antes de avaliar |
| Persistência | Envelope/migrações | União sem dados físicos reais | Análise de schema |
| Integrações | Perfil/histórico | Registro e público por função | Backend e política |
| Testes | Regras/renderização | Não perfilamento, alternativas e segurança | Harness P0 e revisão especializada |

Esforço relativo: **G a EG**, em P3. Uma versão textual poderia reduzir interface, mas não remove dependências editoriais, legais, de segurança e acessibilidade. Não é cronograma.

### 15.1 Riscos específicos e mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| Perfilamento por aparência ou atributo pessoal | Reforça discriminação e não comprova autorização | Avaliar somente registro, fonte, limite e encaminhamento |
| Recomendar confronto | Pode produzir dano físico | Proibir seguir, tocar, reter ou bloquear; oferecer recepção e apoio local |
| Expor instalação ou rotina real | Cria informação operacional sensível | Cenários fictícios, sem planta, agenda, crachá, câmera ou nome real |
| Universalizar política de um local | Procedimento fica incorreto em outra unidade | Conteúdo segmentado por público/local e política versionada |
| Exigir capacidade física ou sensorial | Exclui funcionários e mede o atributo errado | Player textual, sem tempo, deslocamento, fala, audição ou reconhecimento visual |
| Ilustração virar pista exclusiva | Quebra equivalência acessível | Texto é fonte canônica; imagem apenas redundante |

## 16. Testes e critérios de aceite

Nenhum teste de player é exigível enquanto não houver composição aprovada. Se uma versão futura avançar:

### Automatizados

- identidade, versão, pacote, política, fontes e opções por allowlist;
- máximo de dois Complementares formais por pacote;
- casos malicioso, legítimo e inconclusivo;
- nenhum atributo pessoal ou aparência usado pelo avaliador;
- avaliador integral, parcial, inseguro e inválido;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada, repetição e recompensa idempotente;
- persistência, retomada, migração e quarentena;
- privacidade de agregado e ausência de dado de instalação;
- Perfil, atividade recente e recomendação;
- rota própria sem queda silenciosa no hub;
- teclado, foco, tabela e alternativa a ilustração.

### Manuais no desktop

- módulos aprovados, revisão, retomada e repetição;
- visitante legítimo recebe ajuda sem cessão de acesso;
- situação inconclusiva não vira acusação;
- nenhuma escolha recomenda confronto ou ação física;
- mídia nunca é conectada, aberta ou simulada como inspecionada;
- teclado, leitor de tela, foco, contraste, texto ampliado e movimento reduzido;
- revisão por Segurança/Facilities, RH, Jurídico, Privacidade e Acessibilidade;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

Todos os conceitos estão em versão futura. Os módulos abaixo são alternativas para uma escolha posterior, não uma composição, banco aprovado ou primeira versão.

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:physical-pretexting` + `concept:physical-impersonation` | F1 — Recepção e técnico | Política de visitante, ordem de serviço e revisão contra perfilamento | Não há procedimento local aprovado |
| `concept:physical-pretexting` + `concept:elicitation` + `concept:physical-quid-pro-quo` | F2 — Conversa e ajuda | Limites de informação e linguagem cordial aprovados | Exige conteúdo contextual e revisão de exposição |
| `concept:physical-pretexting` + `concept:physical-impersonation` + `concept:tailgating` + `concept:shoulder-surfing` | F3 — Porta e espaço compartilhado | Rota de ajuda segura e alternativas sem confronto | Depende de política física e análise de acessibilidade |
| `concept:physical-pretexting` + `concept:usb-baiting` + `concept:dumpster-diving` + `concept:removable-media-custody` | F4 — Objeto e descarte | Cadeia de custódia/descarte autorizada e artefatos inertes | Exige procedimento local e novo componente |

### Módulo futuro F1 — Recepção e técnico

- **Complementar formal:** `concept:physical-impersonation`.
- **Pacote malicioso candidato:** pessoa com ordem inexistente e aparência plausível pede acesso imediato.
- **Pacote legítimo candidato:** técnica registrada chega com problema real no crachá; a resposta correta é oferecer a rota de recepção/anfitrião, não negar ajuda.
- **Pacote inconclusivo candidato:** registro está indisponível; o acesso permanece retido e a pessoa é encaminhada com segurança, sem acusação.
- **Transferência:** fornecedor conhecido chega fora do horário, exigindo o mesmo controle.

### Módulo futuro F2 — Conversa e ajuda

- **Complementar formal:** `concept:elicitation`. `concept:physical-quid-pro-quo` é variação, não terceiro Complementar.
- **Pacote candidato:** conversa casual começa com pedido legítimo de orientação e muda para agenda, tecnologia ou acesso.
- **Resultado possível:** legítimo até o limite autorizado, malicioso quando insiste em informação restrita, ou inconclusivo.
- **Transferência:** oferta de brinde ou ajuda não muda a alçada da pessoa.

### Módulo futuro F3 — Porta e espaço compartilhado

- **Complementar formal:** `concept:physical-impersonation`. Tailgating e observação de tela são variações.
- **Pacote candidato:** visitante com necessidade plausível se aproxima durante autenticação; a pessoa bloqueia a tela, preserva a própria credencial e oferece recepção.
- **Controle de falso positivo:** proximidade ou aparência não prova intenção; a nota avalia proteção e ajuda, não acusação.
- **Transferência:** a mesma necessidade ocorre em área compartilhada, sem exigir deslocamento no player.

### Módulo futuro F4 — Objeto e descarte

- **Complementares formais:** nenhum.
- **Pacote candidato:** mídia ou documento fictício é encontrado e precisa de cadeia de custódia/descarte, sem inspeção.
- **Resultados possíveis:** objeto legítimo com proprietário conhecido, origem maliciosa não comprovável ou origem inconclusiva; o processo seguro permanece rastreável.
- **Transferência:** um item diferente recebe o mesmo tratamento por categoria e política.

Os módulos nunca serão executados todos numa tentativa. Cada percurso futuro continuará limitado ao mesmo comportamento e a no máximo dois Complementares formais.

## 18. Gates antes de uma futura composição

A arquitetura e sua manutenção fora da primeira ordem de implementação foram aprovadas em 2026-08-15. Os itens abaixo continuam obrigatórios antes de propor uma composição executável.

- decidir se algum módulo futuro deve compor uma primeira versão;
- escolher explicitamente a composição antes de submeter percursos, pesos ou contrato à aprovação;
- aprovar o procedimento fictício por responsáveis de Segurança/Facilities, RH, Jurídico, Privacidade e Acessibilidade;
- escolher o público por função e o limite de generalização entre locais;
- aprovar pesos, corte e controles somente junto da composição;
- decidir se a base será exclusivamente textual ou textual com ilustrações redundantes;
- definir `activityId`, rota, versão e duração apenas após essas decisões.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Ausência de primeira versão e quatro módulos futuros registrados | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | Documento reclassificado como arquitetura futura, sem composição escolhida | Aguardando composição e políticas locais | Nenhum |
| 2026-08-15 | Arquitetura futura aprovada como fronteira e mantida fora da ordem executável | Aprovada como fronteira; sem primeira versão | Nenhum |
