# O destino atrás do QR

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
| Comportamento principal aprovado | Confirmar primeiro se o fluxo com QR foi iniciado ou esperado; usar prévia segura quando disponível e, sem ela, abandonar o QR e usar rota oficial. |
| Mecânica-base aprovada | Mesa de espécimes com prévia segura do conteúdo, contexto e destinatário. |
| Estado da atividade atual | Planejada; não existe atividade executável correspondente. |
| Relação com implementação existente | Atividade nova; não substitui nem migra tentativa atual. |
| `activityId`, versão e rota | Não definidos; este blueprint não cria nenhum deles. |
| Duração-alvo | 7 a 9 minutos. |
| Regra de recompensa considerada | 60 pontos-base de PhishLab e bônus transversal, após aprovação executável; não ativada pelo blueprint. |
| Conceitos proprietários | 5, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular e uso de câmera são posteriores. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos iniciais sem câmera, scanner ou QR funcional;
- uma prévia inerte que torna o conteúdo observável para todos;
- avaliação de contexto, destino e ação independente;
- limites entre quishing inicial e casos futuros de pagamento ou adulteração física.

### 1.2 O que permanece sem decisão técnica

- ID, rota, versão e posição curricular;
- ilustrações finais dos espécimes;
- entrada dos bancos de pagamento e mídia física;
- ativação de recompensa e persistência.

## 2. Contrato educacional

- **Comportamento observável:** identificar quem apresentou o QR, revelar seu tipo e destino por ferramenta segura, comparar com a ação iniciada e escolher rota própria.
- **Técnicas ou objetivos do atacante:** deslocar destino ou instrução para uma imagem que a pessoa não consegue ler diretamente.
- **Atalho inseguro enfrentado:** escanear sem contexto para “descobrir” ou confiar na aparência do cartaz ou da mensagem.
- **Resposta segura generalizável:** confirmar primeiro se o fluxo foi iniciado ou esperado; usar prévia segura se existir; sem ferramenta publicada, abandonar o QR e usar rota oficial.
- **O que a conclusão permite afirmar:** se a pessoa investigou o espécime fictício e respondeu de forma segura nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente, capacidade de câmera, leitura de QR real, legitimidade universal ou ausência de comprometimento.

Escanear um QR em fluxo legítimo, iniciado e esperado não é automaticamente inseguro; o risco está em agir sem vínculo, prévia ou rota confiável.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso | Percurso ou destino |
|---|---|---|---|---|
| `concept:quishing` | Núcleo | Primeira versão | Interpretar QR como conteúdo que exige inspeção e contexto. | P1, P2 e P3 |
| `concept:qr-payment-destination` | Complementar | Banco de casos | Conferir recebedor e finalidade antes de confirmar pagamento. | Banco B1 |
| `concept:qr-physical-replacement` | Variação de caso | Banco de casos | Analisar sobreposição ou substituição em material físico. | Banco B2 |
| `concept:payment-qr` | Transferência | Banco de casos | Transferir o comportamento para fluxo de pagamento. | Banco B3 |
| `concept:physical-qr-tampering` | Variação de caso | Versão futura | Investigar adulteração física com evidências adequadas. | Futuro F1 |

Somente quishing é formalmente ativo na primeira versão; nenhum Complementar é antecipado nos percursos iniciais.

Regras aplicadas:

- os cinco conceitos aparecem exatamente uma vez, com papel e momento do mapa;
- conceitos de banco e versão futura não são obrigatórios nem pontuados agora;
- nenhum conceito futuro gera recompensa própria;
- aplicações secundárias não mudam propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Login que você não iniciou | QR chega por mensagem como “acesso rápido”. | Revelar o tipo, comparar contexto e negar a ação. | Nenhum (0) | Mesmo pedido aparece em apresentação interna fictícia. | Suspeito; usar rota própria. |
| P2 — QR esperado | Funcionário acabou de iniciar pareamento em área fictícia. | Confirmar finalidade, origem e destino antes de continuar. | Nenhum (0) | O mesmo QR reaparece depois que a sessão expira. | Legítimo no principal; inconclusivo depois. |
| P3 — Cartaz digital inesperado | Aviso em canal corporativo promete benefício por QR. | Separar aparência institucional de origem e finalidade. | Nenhum (0) | Link textual equivalente permite aplicar o mesmo processo. | Inconclusivo ou suspeito; verificar. |

Os percursos alternam suspeito, legítimo e inconclusivo sem depender de leitura visual do padrão do QR.

Cada pacote inclui microcalibração guiada da prévia, não pontuada como caso completo, resolução independente do espécime principal da seção 5 e transferência curta. Os três percursos são alternativas, não uma sequência.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Login que você não iniciou

| Elemento | Definição |
|---|---|
| Situação inicial | Mensagem de falso suporte pede leitura de QR para “validar a conta”. |
| Canal e artefatos | Conversa fictícia, espécime não escaneável e prévia segura. |
| Identidade ou pretexto | Suporte técnico e validação de conta. |
| Objetivo do atacante ou hipótese legítima | Induzir autenticação não iniciada por instrução escondida. |
| Pressões e aparências | Urgência, autoridade e QR com identidade institucional. |
| Evidências disponíveis | Ação não iniciada, pedido de autenticação e destino incompatível com a rota oficial. |
| Evidência decisiva ou limite de certeza | A prévia mostra a instrução do caso, não autoria humana; sem vínculo, a ação deve ser abandonada. |
| Confirmação independente | Abrir a área de segurança pelo diretório fictício. |
| Ação segura | Não usar o QR; encerrar e verificar pela rota oficial. |
| Reporte ou recuperação | Reportar o artefato fictício sem compartilhar código ou dado. |
| Transferência curta | O QR aparece num slide recebido pelo mesmo canal. |
| Debrief | A imagem não herda confiança do material em que aparece. |
| Conteúdo fictício necessário | Ilustração não decodificável e payload allowlisted por ID. |

### Percurso P2 — QR esperado

| Elemento | Definição |
|---|---|
| Situação inicial | O funcionário inicia pareamento de sessão e recebe QR no próprio fluxo. |
| Canal e artefatos | Registro de início, estado de validade não pontuado e prévia segura. |
| Identidade ou pretexto | Serviço fictício esperado no pareamento. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima sustentada pela ação iniciada e pelo destino previsto. |
| Pressões e aparências | Conveniência e familiaridade, sem urgência artificial. |
| Evidências disponíveis | Contexto iniciado, finalidade, origem e destino previstos. |
| Evidência decisiva ou limite de certeza | Legitimidade vale só para aquela sessão; não autoriza pedidos adicionais. |
| Confirmação independente | Conferir a sessão na área própria. |
| Ação segura | Usar cenograficamente o QR apenas enquanto contexto e prévia coincidem. |
| Reporte ou recuperação | Não reportar automaticamente; abandonar e verificar se o vínculo mudar. |
| Transferência curta | Após expiração, o mesmo desenho não é autorização suficiente. |
| Debrief | Escanear em fluxo legítimo iniciado não é falha; contexto e destino continuam necessários. |
| Conteúdo fictício necessário | Dois estados da sessão, sem QR funcional ou cronômetro pontuado. |

### Percurso P3 — Cartaz digital inesperado

| Elemento | Definição |
|---|---|
| Situação inicial | Cartaz compartilhado promete inscrição imediata por QR. |
| Canal e artefatos | Imagem, publicação fictícia, prévia e diretório de campanhas. |
| Identidade ou pretexto | Campanha interna de benefício. |
| Objetivo do atacante ou hipótese legítima | Conduzir a destino não cadastrado; a campanha pode ser legítima, mas não está confirmada. |
| Pressões e aparências | Benefício limitado, marca e compartilhamento em canal corporativo. |
| Evidências disponíveis | Campanha ausente, canal incomum e destino revelado diferente. |
| Evidência decisiva ou limite de certeza | Identidade visual não substitui confirmação; sem prévia confiável, abandonar o QR. |
| Confirmação independente | Consultar o diretório fictício. |
| Ação segura | Não abrir o destino; usar rota oficial e verificar. |
| Reporte ou recuperação | Reportar conforme o processo se a campanha continuar incompatível. |
| Transferência curta | O mesmo destino aparece como link, mantendo a resposta segura. |
| Debrief | O comportamento vale para QR e link: contexto primeiro, depois destino e rota própria. |
| Conteúdo fictício necessário | Marca inventada, diretório cenográfico e ilustração não decodificável. |

Nenhum artefato executa ação real. Não há câmera, QR funcional, pagamento ou autenticação.

## 6. Mecânica e diferenciação

- **Interação central:** colocar o espécime em uma mesa, acionar “revelar com segurança” e relacionar tipo de ação, destino, apresentador e contexto.
- **Por que combina com o comportamento:** a mesa obriga a registrar contexto iniciado/esperado antes de revelar e interpretar o destino.
- **Como se distingue das outras 21 atividades:** investiga instrução em mídia bidimensional e sua relação com contexto; não disseca URL nem rastreia saltos.
- **O que é reutilizável:** shell, stepper, revisão, resultado e catálogo versionado.
- **O que exige componente novo:** mesa de espécimes, painel de prévia e comparador de contexto.
- **Alternativa sem arrastar, mídia ou representação espacial:** ficha textual com ID, conteúdo revelado, origem, finalidade e estado.
- **Risco de virar questionário disfarçado e prevenção:** veredito sem contexto, prévia e rota limita a nota; módulos gráficos nunca são pista ou condição.

Fora do laboratório, a pessoa verifica primeiro se o fluxo foi iniciado ou esperado. Usa prévia somente quando ela existir em ferramenta publicada; sem essa ferramenta, abandona o QR e abre a rota oficial.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, QR não funcional, prática real e ausência de cronômetro. | Iniciar ou voltar. | Explícita. | Pacote. | Sem gabarito. | Foco no `h1`. |
| Investigação | Microexemplo guiado e depois espécime principal. | Aprender a prévia, registrar contexto e resolver independentemente o principal. | Calibração vista e evidências principais completas. | IDs, contexto e ajuda. | Explica ferramenta sem revelar o caso principal. | Ficha textual. |
| Decisão inicial | Contexto e destino relacionados. | Escolher veredito provisório e rota. | Campos completos. | Decisão provisória. | Aponta lacunas revisáveis. | `fieldset` e lista. |
| Consequência | Efeito cenográfico da ação. | Observar resultado sem escanear. | Consequência lida. | Estado simulado. | Distingue abandono de fluxo legítimo. | Texto integral. |
| Revisão | Espécime principal e decisão provisória. | Editar evidências, contexto, conclusão ou rota. | Caso principal completo e editável. | Revisões. | Sem acerto antecipado. | Links por seção. |
| Decisão final | Resposta consolidada. | Confirmar ou voltar. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | QR vira link ou muda de sessão. | Aplicar o comportamento. | Uma resposta e rota. | Transferência. | Após envio. | Texto integral. |
| Resultado | Nota, critérios, competências e recompensa potencial. | Consultar resultado privado. | Aceite. | Derivados. | Contexto, destino, limite e ação. | Texto completo. |
| Debrief | Processo real sem ferramenta e limite da prévia. | Comparar e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Evita “QR sempre inseguro”. | Texto estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Iniciar ou voltar. | Nenhuma. | Foco no título. |
| Em andamento | Evidências parciais. | Revelar, relacionar e decidir. | Rascunho opcional. | Etapa anunciada. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Nunca salva gabarito. | Resumo textual. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Índice por caso. |
| Concluída | Tentativa aceita. | Resultado e debrief. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Conclusão anterior. | Praticar novamente. | Novo attemptId; sem prêmio duplicado. | Regra explícita. |
| Conteúdo indisponível | Espécime ou pacote ausente. | Voltar. | Nada. | Mensagem explícita. |
| Resposta inválida | IDs incompatíveis. | Corrigir. | Não conclui. | Alerta e foco. |
| Falha ao salvar | Operação falhou. | Reenviar. | Mantém resposta. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica segue a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores especializam esses eixos para contexto e prévia de QR.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidências de contexto e destino | 30 | Relaciona apresentador, ação iniciada, tipo e destino. | Omite evidência não crítica. | Decide pela arte ou marca. | Observar, Investigar |
| Conclusão proporcional | 25 | Distingue legítimo, suspeito e inconclusivo. | Ação segura com justificativa parcial. | Trata todo QR como seguro ou malicioso. | Investigar |
| Ferramenta e rota própria | 20 | Usa prévia segura e canal independente. | Consulta correta com rota genérica. | Escaneia/abre para verificar. | Verificar |
| Independente e transferência | 25 | Repete em outro contexto sem dica. | Usa ajuda sem falha crítica. | Não transfere ou executa ação insegura. | Investigar, Verificar |

Regras obrigatórias:

- pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho permanecem separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinal isolado não vale como veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- o percurso legítimo não premia escaneamento automático sem contexto.

### 9.1 Controles críticos

- não escanear, abrir ou executar o conteúdo para descobrir sua natureza;
- não usar aparência do material como prova;
- não confirmar autenticação que não foi iniciada;
- não concluir fraude apenas por ser QR.

### 9.2 Resultado privado

O resultado privado exibe nota, quatro critérios, evidências, conteúdo revelado em texto, conclusão, rota, competências, recomendação e recompensa potencial. A equipe recebe só agregado elegível, nunca resposta individual.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos-base apenas depois da aprovação executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** nunca reinterpretar ou recompensar novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação para De qual dispositivo veio este código?.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código. Não há `activityId` aprovado; o campo representa o ID futuro do catálogo e não cria um valor neste documento.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor | idempotente |
| activityId | ID futuro publicado | Sim | catálogo | ainda indefinido |
| activityVersion | versão publicada | Sim | catálogo | compatível |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | sem rapidez |
| mainCaseResponse | contexto, prévia, evidências, veredito e rota | Sim | interação | resolução independente do espécime principal |
| transferResponse | resposta curta allowlisted | Sim | interação | calibração não é segundo caso |
| specimenId | ID allowlisted | Sim | caso | nunca imagem livre |
| revealedPayloadId | ID allowlisted | Sim | ferramenta | pertence ao espécime |
| evidenceIds | lista allowlisted | Sim | investigação | sem duplicatas |
| contextAssessmentId | expected, unexpected ou unconfirmed | Sim | decisão | allowlist |
| verdictId | legitimate, suspicious ou inconclusive | Sim | decisão | allowlist |
| safeRouteId | ID de rota fictícia | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- espécime, payload e evidências pertencem ao mesmo pacote;
- não se recebe imagem, QR, URL ou texto livre do usuário;
- a revelação é determinística e local ao pacote;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível;
- nota, resultado, competência e recompensa são derivados;

### 11.2 Instrumentação mínima

Eventos: case_started, specimen_inspected, safe_preview_opened, evidence_selected, help_opened, answer_revised, submission_requested e submission_result. Somente IDs allowlisted, versão, etapa e sequência; nenhum conteúdo decodificado livre. Eventos não são fonte de nota.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Exige variante discriminada e análise de `APP_SCHEMA_VERSION`. Persiste somente retomada, resposta bruta, resultado derivado e progresso. Nenhuma imagem real é persistida; `isAuthoritative` permanece falso.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização e público; publica versão, pacote, espécime e payload; valida evidências, opções e etapas por allowlist; deriva avaliação, `needsReview`, competências e feedback; concede recompensa, evidência e contribuição em transação idempotente; mantém auditoria sem imagem livre; e aplica retenção e exclusão conforme política. Ele não recebe câmera, imagem, QR ou URL real.

### Compatibilidade

Não há tentativa anterior a migrar. ID, rota e versão dependem de aprovação. Estado inválido ou pacote retirado fica em quarentena e não produz conclusão.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas sem resposta individual |

Não há credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte, câmera, upload, clipboard de imagem, scanner, link, autenticação ou navegação. O desenho não codifica conteúdo real e o player não afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, contexto, conteúdo e destino são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- a operação é integral por teclado;
- qualquer ordenação oferece Mover, Subir e Descer e anuncia posição;
- ficha textual e seletores equivalem à mesa visual; a imagem é redundante;
- toda ilustração ou mídia possui texto equivalente, e nenhuma tarefa depende dos módulos do QR;
- feedback usa região de status e erro usa alerta com foco, sem apagar espécime ou contexto;
- alto contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem rapidez na nota;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; câmera e celular permanecem posteriores.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e shell | Espécimes, payloads e contexto versionados | P0 |
| Interface | Stepper e resultado | Mesa, prévia e ficha acessível | P1 |
| Contrato e avaliador | Envelope e pesos comuns | Resposta por espécime e regras de contexto/destino | Nova versão |
| Estado e provider | Provider assíncrono | Operação de prévia, decisão e revisão | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso | Rascunho, migração e quarentena | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Hub e perfil | Cadastro da nova atividade | ID aprovado |
| Testes | Contratos, reducer e SSR | QR não funcional, teclado, foco e ficha equivalente | Harness de navegador |

**Esforço relativo:** M. **Camadas:** P0 e P1; bancos B1–B3 em P2 e adulteração em versão futura.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, espécime, payload, evidência e opções por allowlist;
- nenhum QR funcional, URL real, upload ou permissão de câmera;
- pesos somam 100 e nota é limitada;
- casos legítimo, suspeito, inconclusivo, parcial e inseguro;
- controles críticos, needsReview e ajuda sem desconto;
- replay, repetição, recompensa idempotente e privacidade;
- teclado, foco, status e equivalência da ficha textual.

### Manuais no desktop

- concluir P1, P2 e P3;
- verificar que aplicativos leitores não decodificam as ilustrações;
- testar leitor de tela, zoom, contraste e movimento reduzido;
- revisar e repetir sem prêmio duplicado;
- confirmar que não surge pedido de câmera ou navegação;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| concept:qr-payment-destination | Banco B1 | Simulação de recebedor e confirmação sem transação | Exige vocabulário e controle crítico próprios |
| concept:qr-physical-replacement | Banco B2 | Evidências físicas reproduzíveis e acessíveis | Não deve depender de acuidade visual |
| concept:payment-qr | Banco B3, transferência | Fluxo de pagamento completamente cenográfico | Não misturar autenticação e pagamento no início |
| concept:physical-qr-tampering | Futuro F1 | Formato multimodal equivalente validado | Complexidade e risco de virar caça a detalhe |

O debrief explica que QR pode representar diferentes tipos de ação e que a ferramenta do laboratório é uma simulação segura, não um scanner.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três percursos e os espécimes não decodificáveis;
- definir ID, rota, versão e posição curricular;
- validar o texto de prévia e as rotas próprias;
- aprovar gates para pagamento e adulteração física;
- validar com Segurança, Educação e Acessibilidade.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, mesa de espécimes e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
