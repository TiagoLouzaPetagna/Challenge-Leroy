# De qual dispositivo veio este código?

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
| Comportamento principal aprovado | Relacionar tipo de código, quem provocou sua geração, quem o recebeu, onde seria digitado, dispositivo e sessão antes de agir. |
| Mecânica-base aprovada | Console de vinculação entre dispositivos, códigos e sessões, com tabela relacional equivalente. |
| Estado da atividade atual | Planejada; não existe atividade executável correspondente. |
| Relação com implementação existente | Atividade nova; complementa, sem substituir, a missão Você iniciou este acesso?. |
| `activityId`, versão e rota | Não definidos; este blueprint não cria nenhum deles. |
| Duração-alvo | 8 a 10 minutos. |
| Regra de recompensa considerada | 60 pontos-base de PhishLab e bônus transversal, após aprovação executável; não ativada pelo blueprint. |
| Conceitos proprietários | 8, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos que separam código de dispositivo, OTP e resposta segura;
- console totalmente fictício, sem autenticação ou segredo funcional;
- diferença de escopo em relação à missão Você iniciou este acesso?;
- avaliação, contrato, estados e destinos futuros dos oito conceitos.

### 1.2 O que permanece sem decisão técnica

- ID, rota, versão e posição curricular;
- vocabulário final dos dispositivos e sessões;
- integração curricular com a missão;
- ativação de recompensa, rascunho e bancos.

## 2. Contrato educacional

- **Comportamento observável:** classificar OTP ou device code, mapear geração, recebimento e local de entrada, vincular a sessão e escolher resposta proporcional.
- **Técnicas ou objetivos do atacante:** furtar OTP ou induzir a vítima a autorizar um dispositivo com código gerado para outra sessão.
- **Atalho inseguro enfrentado:** tratar qualquer código como prova de suporte ou digitá-lo porque a página de entrada é oficial.
- **Resposta segura generalizável:** OTP é segredo recebido para uma autenticação própria e nunca é compartilhado; device code só autoriza o dispositivo cujo fluxo a pessoa iniciou e reconhece.
- **O que a conclusão permite afirmar:** se a pessoa distinguiu os fluxos e protegeu a autorização nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente, origem real de mensagem, comprometimento de conta ou segurança de telecomunicação.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso | Percurso ou destino |
|---|---|---|---|---|
| `concept:otp-theft` | Núcleo | Primeira versão | Reconhecer OTP como segredo recebido para autenticação própria, nunca como dado a compartilhar. | P3 |
| `concept:device-code` | Núcleo | Primeira versão | Relacionar código exibido à sessão e ao dispositivo para o qual foi gerado. | P1 e P2 |
| `concept:device-link-response` | Complementar | Primeira versão | Escolher negar, encerrar ou prosseguir conforme a vinculação. | P1 e P2 |
| `concept:recovery-code-theft` | Complementar | Banco de casos | Proteger código de recuperação e iniciar resposta adequada. | Banco B1 |
| `concept:device-join` | Variação de caso | Banco de casos | Avaliar entrada de novo dispositivo em conta ou organização. | Banco B2 |
| `concept:account-pairing-qr` | Variação de caso | Banco de casos | Transferir vinculação para pareamento representado por QR. | Banco B3 |
| `concept:recovery-method-takeover` | Variação de caso | Banco de casos | Responder a alteração de método de recuperação. | Banco B4 |
| `concept:sim-swap` | Transferência | Versão futura | Aplicar proteção e recuperação quando o canal telefônico pode ter sido tomado. | Futuro F1 |

Regras aplicadas:

- os oito conceitos aparecem uma vez, com papel e momento aprovados;
- `otp-theft` só é objetivo em P3 e `device-code` somente em P1/P2;
- conceitos de banco e futuro não são obrigatórios nem geram recompensa própria;
- aplicações secundárias não alteram propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Código para dispositivo desconhecido | Atacante inicia sessão no dispositivo dele e entrega o device code à vítima para entrada na página oficial. | Mapear quem gerou, recebeu e onde seria digitado; negar a vinculação. | device-link-response (1) | O pedido chega por outro canal. | Suspeito; negar e reportar. |
| P2 — Vinculação iniciada pelo funcionário | Funcionário inicia acesso em dispositivo cenográfico reconhecido e recebe nele o device code. | Conferir dispositivo, finalidade e local oficial de entrada antes de prosseguir. | device-link-response (1) | Código expira e uma nova solicitação aparece sem reinício. | Legítimo; depois inconclusivo. |
| P3 — “Leia o código para mim” | Serviço gera OTP para login e o entrega ao canal cadastrado da pessoa; falso suporte pede o valor. | Classificar OTP como segredo e não compartilhar nem digitar na conversa. | Nenhum (0) | O pedido muda de chat para ligação textualizada. | Suspeito; encerrar e verificar. |

Nenhum percurso tem mais de um Complementar formal. OTP e device code pertencem à mesma família de autorização, mas nunca são tratados como o mesmo artefato ou pontuados no mesmo percurso.

Cada pacote inclui microcalibração guiada do tipo de código, não pontuada como caso completo, resolução independente do artefato principal da seção 5 e transferência curta.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Código para dispositivo desconhecido

| Elemento | Definição |
|---|---|
| Situação inicial | Falso suporte fornece um device code e orienta inseri-lo em página oficial fictícia. |
| Canal e artefatos | Conversa textual, console, tipo de código, dispositivos e sessões cenográficas. |
| Identidade ou pretexto | Suporte técnico que afirma validar a conta. |
| Objetivo do atacante ou hipótese legítima | O atacante provoca a geração no dispositivo dele, recebe o código na própria tela e o transmite à vítima para que ela autorize esse dispositivo. |
| Pressões e aparências | Autoridade, urgência e página oficial como falsa garantia. |
| Evidências disponíveis | Vítima não iniciou ação, dispositivo gerador é desconhecido, código chegou pelo falso suporte e seria digitado pela vítima na página oficial. |
| Evidência decisiva ou limite de certeza | A página de entrada ser oficial não torna o dispositivo ou a vinculação autorizados. |
| Confirmação independente | Abrir a área de dispositivos por rota própria. |
| Ação segura | Não inserir; negar ou encerrar a solicitação cenográfica. |
| Reporte ou recuperação | Reportar o contato e revisar dispositivos fictícios sem expor código. |
| Transferência curta | A instrução idêntica chega por e-mail. |
| Debrief | Device code vincula uma sessão a um dispositivo; quem o digita pode autorizar o dispositivo de outra pessoa. |
| Conteúdo fictício necessário | IDs e códigos não funcionais, conversa e console inertes. |

### Percurso P2 — Vinculação iniciada pelo funcionário

| Elemento | Definição |
|---|---|
| Situação inicial | Funcionário inicia sessão em dispositivo de sala fictício. |
| Canal e artefatos | Registro de início, dispositivo de sala, estação autenticada, console e device code inerte. |
| Identidade ou pretexto | Pareamento esperado do serviço corporativo fictício. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima: o serviço gera o código no dispositivo de sala, o funcionário o lê ali e o digita na página oficial aberta por ele na estação própria. |
| Pressões e aparências | Conveniência e validade curta, sem rapidez pontuada. |
| Evidências disponíveis | Ação iniciada, dispositivo gerador reconhecido, pessoa receptora correta, local oficial de entrada e sessão compatível. |
| Evidência decisiva ou limite de certeza | A autorização vale só para aquele dispositivo, finalidade e sessão. |
| Confirmação independente | Conferir o dispositivo no console fictício. |
| Ação segura | Prosseguir cenograficamente enquanto todos os vínculos coincidem. |
| Reporte ou recuperação | Não reportar automaticamente; negar se o código expirar ou surgir sem novo início. |
| Transferência curta | Depois da expiração, nova solicitação sem reinício exige parar. |
| Debrief | O fluxo legítimo começa no dispositivo que será vinculado e termina em local oficial controlado pela pessoa. |
| Conteúdo fictício necessário | Estado válido e expirado, sem código funcional ou cronômetro pontuado. |

### Percurso P3 — “Leia o código para mim”

| Elemento | Definição |
|---|---|
| Situação inicial | Pessoa que se apresenta como suporte pede OTP recebido pelo funcionário. |
| Canal e artefatos | Conversa, notificação cenográfica, fluxo de login e referência de política. |
| Identidade ou pretexto | Suporte que afirma precisar “confirmar identidade”. |
| Objetivo do atacante ou hipótese legítima | O serviço gera OTP após tentativa de login; o funcionário o recebe no canal cadastrado e o atacante tenta obter o valor para digitá-lo na sessão dele. |
| Pressões e aparências | Autoridade, urgência e chegada real da notificação. |
| Evidências disponíveis | Pedido de segredo, ausência de chamado, login não iniciado e solicitação para ler ou enviar o OTP. |
| Evidência decisiva ou limite de certeza | OTP deve ser digitado somente no prompt da autenticação própria iniciada pela pessoa, nunca entregue a terceiro. |
| Confirmação independente | Contatar suporte pelo diretório fictício e revisar sessões. |
| Ação segura | Não compartilhar nem digitar na conversa; encerrar a interação. |
| Reporte ou recuperação | Reportar e revisar sessões fictícias sem registrar o valor do OTP. |
| Transferência curta | A conversa vira transcrição de chamada; regra permanece. |
| Debrief | OTP é segredo de autenticação entregue à pessoa; não é device code nem prova de identidade do suporte. |
| Conteúdo fictício necessário | Notificação sem valor funcional, conversa textual e política cenográfica. |

Nenhum artefato executa ação real. O contrato registra somente IDs e tipos, nunca valores de código.

## 6. Mecânica e diferenciação

- **Interação central:** conectar Ação iniciada, Dispositivo, Sessão, Tipo de código e Resposta; marcar vínculos como confirmados, incompatíveis ou não comprovados.
- **Por que combina com o comportamento:** o mapa exige explicitar gerador, receptor, local de entrada, dispositivo e sessão antes da resposta.
- **Como se distingue das outras 21 atividades:** avalia artefato isolado e vínculo; a missão Você iniciou este acesso? trabalha sequência, pressão e resposta operacional.
- **O que é reutilizável:** shell, stepper, revisão, resultado e infraestrutura relacional.
- **O que exige componente novo:** editor de vínculos de sessão, seletor de tipo de código e console cenográfico.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela de origem, relação, destino e estado com seletores.
- **Risco de virar questionário disfarçado e prevenção:** o veredito sem mapear geração/recebimento/entrada limita a nota; IP, localização e telemetria invisíveis nunca pontuam.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, distinção OTP/device code, conteúdo fictício e ausência de cronômetro. | Iniciar ou voltar. | Explícita. | Pacote. | Sem gabarito. | Foco no `h1`. |
| Investigação | Microcalibração do tipo e depois artefato principal. | Aprender os papéis e mapear independentemente geração, recebimento, entrada, dispositivo e sessão. | Calibração vista e vínculos principais completos. | Tipo, relações, consultas e ajuda. | Explica o tipo sem revelar o caso principal. | Tabela. |
| Decisão inicial | Mapa principal. | Negar, encerrar, prosseguir ou verificar provisoriamente. | Campos completos. | Decisão provisória. | Lacunas revisáveis. | `fieldset` e lista. |
| Consequência | Efeito cenográfico da autorização ou recusa. | Observar qual dispositivo ou sessão seria afetado. | Consequência lida. | Estado simulado. | Sem autenticação real. | Texto completo. |
| Revisão | Mapa e decisão provisória. | Editar tipo, vínculos, conclusão ou rota. | Caso principal completo e editável. | Revisões. | Sem acerto antecipado. | Índice de foco. |
| Decisão final | Resposta consolidada. | Confirmar ou voltar. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | Canal ou tempo muda. | Reavaliar vínculo. | Uma resposta e rota. | Transferência. | Após envio. | Texto completo. |
| Resultado | Nota, critérios, competências e recompensa potencial. | Consultar resultado privado. | Aceite. | Derivados. | Tipo, vínculo, limite e resposta. | Texto completo. |
| Debrief | Fluxo esperado e diferença OTP/device code. | Comparar e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Consolida geração, recebimento e entrada. | Texto estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Iniciar ou voltar. | Nenhuma. | Foco no título. |
| Em andamento | Mapa parcial. | Continuar e revisar. | Rascunho opcional. | Progresso anunciado. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Sem gabarito. | Resumo textual. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Índice por caso. |
| Concluída | Tentativa aceita. | Resultado e debrief. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Conclusão anterior. | Nova prática. | Novo attemptId; sem prêmio duplicado. | Regra explícita. |
| Conteúdo indisponível | Pacote ausente. | Voltar. | Nada. | Mensagem explícita. |
| Resposta inválida | Vínculo ou ação incompatível. | Corrigir. | Não conclui. | Alerta e foco. |
| Falha ao salvar | Operação falhou. | Reenviar. | Mantém resposta. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica segue a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores especializam esses eixos para tipo de código e vínculos de geração, recebimento e entrada.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidências e vínculos | 30 | Relaciona ação, dispositivo, sessão, código e contexto. | Omite vínculo não crítico. | Decide por canal ou aparência isolados. | Observar, Investigar |
| Conclusão e proteção do segredo | 25 | Conclusão proporcional e nunca compartilha código. | Ação segura com justificativa parcial. | Digita/compartilha em fluxo não iniciado. | Investigar |
| Console e rota independente | 20 | Usa console e política de modo pertinente. | Ação correta com verificação genérica. | Confirma pela conversa suspeita. | Verificar |
| Independente e transferência | 25 | Repete sem dica em outro tipo/canal. | Usa ajuda sem falha crítica. | Não transfere ou executa ação insegura. | Investigar, Verificar |

Regras obrigatórias:

- pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho permanecem separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinal isolado não vale como veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- o caso legítimo exige vínculo completo, não obediência automática.

### 9.1 Controles críticos

- não compartilhar OTP, código de dispositivo ou recuperação;
- não inserir código para ação que a pessoa não iniciou;
- não tratar página oficial como prova de que o pedido é autorizado;
- não confirmar pelo mesmo contato suspeito.

### 9.2 Resultado privado

O resultado privado mostra nota, critérios, tipo de código, mapa esperado, vínculo ausente ou incompatível, resposta, rota, competências, recomendação e recompensa potencial. Códigos são referidos por IDs e tipo; nenhuma resposta individual entra no agregado.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos-base depois da aprovação executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição não duplica pontos ou contribuição.
- **Versões anteriores:** nunca reinterpretar ou premiar novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação para a missão Você iniciou este acesso?.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código. Não há `activityId` aprovado; o campo representa o valor futuro publicado pelo catálogo e não o define.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor | idempotente |
| activityId | ID futuro publicado | Sim | catálogo | ainda indefinido |
| activityVersion | versão publicada | Sim | catálogo | compatível |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | sem rapidez |
| mainCaseResponse | fluxo, vínculos, decisão e rota | Sim | interação | resolução independente do artefato principal |
| transferResponse | resposta curta allowlisted | Sim | interação | calibração não é segundo caso |
| codeTypeId | otp ou device_code conforme pacote | Sim | caso | P3 usa otp; P1/P2 usam device_code |
| codeFlowRelations | origem, generated_by, generated_for, received_by, entered_at e destino | Sim | console | modela quem gerou, recebeu e onde seria digitado |
| initiationAssessmentId | initiated, not_initiated ou unconfirmed | Sim | decisão | allowlist |
| responseActionIds | lista ordenada de ações | Sim | decisão | allowlist e ordem válida |
| verdictId | legitimate, suspicious ou inconclusive | Sim | decisão | allowlist |
| safeRouteId | ID fictício | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- relações, dispositivos, sessões e ações pertencem ao pacote;
- nenhum campo recebe o valor de OTP ou código;
- em OTP, `received_by` é a pessoa no canal cadastrado e `entered_at` só pode ser o prompt próprio iniciado;
- em device code, `generated_for` é o dispositivo a vincular, `received_by` registra quem o viu e `entered_at` é a superfície oficial;
- decisão de prosseguir só é válida quando caso e vínculos autorizam;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível;
- cliente não envia nota, competência, recompensa ou gabarito;

### 11.2 Instrumentação mínima

Eventos: case_started, relation_added, relation_changed, policy_opened, console_action_selected, help_opened, answer_revised, submission_requested e submission_result. Somente IDs allowlisted, versão, etapa e sequência; nunca o código, telefone, conta ou texto de conversa. O log não determina a nota.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Exige submissão discriminada e análise de `APP_SCHEMA_VERSION`. Persiste somente retomada, resposta bruta, resultado derivado e progresso. Somente IDs cenográficos são aceitos; `isAuthoritative` permanece falso.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização e público; publica versão, pacote e tipo de código; valida entidades, relações, ações, opções e etapas por allowlist; deriva avaliação, `needsReview`, competências e feedback; concede recompensa, evidência e contribuição em transação idempotente; mantém auditoria sem valor de código; e aplica retenção e exclusão conforme política. Não autentica, envia código, liga dispositivo, consulta sessão real ou recebe segredo.

### Compatibilidade

Não há tentativa anterior própria. ID, rota e versão dependem de aprovação. Estado desconhecido é colocado em quarentena, nunca convertido em conclusão ou premiado.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia e por IDs | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas sem resposta individual |

Sem credencial, OTP real, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte, dispositivo, IP, geolocalização, sessão, autenticação, QR funcional ou mensagem externa. O console é cenográfico e o player não afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, tipo, gerador, receptor, local de entrada e vínculos são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- vínculos e console operam integralmente por teclado;
- qualquer ordenação oferece Mover, Subir e Descer e anuncia posição;
- tabela e seletores equivalem ao diagrama; ícone, posição e cor são redundantes;
- ilustração ou mídia futura possui texto equivalente;
- feedback usa região de status e erro usa alerta com foco, sem apagar mapa ou contexto;
- contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem pontos por rapidez;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e shell | Dispositivos, sessões, tipos, fluxos e políticas | P0 |
| Interface | Stepper e resultado | Console e tabela de vínculos | P1 |
| Contrato e avaliador | Envelope e pesos comuns | Relações por tipo, sequência e controles críticos | Nova versão |
| Estado e provider | Provider assíncrono | Operação de mapa, console e revisão | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso | Rascunho, migração e quarentena | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Hub, perfil e missão | Cadastro da nova atividade | ID aprovado |
| Testes | Contratos, reducer e SSR | Separação OTP/device code, teclado, foco e tabela | Harness de navegador |

**Esforço relativo:** G. **Camadas:** P0 e P1; bancos B1–B4 em P2 e sim-swap em versão futura.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, dispositivo, sessão, relação, tipo e ação por allowlist;
- relação impossível, duplicada, ausente ou de outro pacote;
- payload rejeita qualquer campo de valor de código;
- quatro pesos somam 100 e nota fica limitada;
- casos legítimo, suspeito, inconclusivo, parcial e inseguro;
- controles críticos, needsReview e ajuda sem desconto;
- zero autenticação, sessão real, envio ou rede;
- replay, repetição, recompensa idempotente e privacidade;
- teclado e equivalência tabela/diagrama.

### Manuais no desktop

- concluir P1, P2 e P3;
- testar leitor de tela, zoom, contraste e movimento reduzido;
- montar e revisar vínculos somente pelo teclado;
- confirmar que nenhum código real pode ser digitado;
- repetir sem prêmio duplicado;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| concept:recovery-code-theft | Banco B1 | Recuperação cenográfica e controle crítico revisados | Segredo de maior impacto merece caso próprio |
| concept:device-join | Banco B2 | Estados de dispositivo e autorização claros | É variação posterior |
| concept:account-pairing-qr | Banco B3 | Integração conceitual com QR sem câmera | Evitar misturar mídias na primeira versão |
| concept:recovery-method-takeover | Banco B4 | Fluxo de resposta e reversão definido | Exige recuperação mais extensa |
| concept:sim-swap | Futuro F1, transferência | Conteúdo de telecom e recuperação validado | Não é observável apenas pelo artefato atual |

O debrief diferencia OTP e código de dispositivo em linguagem simples, sem ensinar operação ofensiva nem mostrar segredo funcional.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três percursos e a gramática de vínculos;
- definir ID, rota, versão e posição curricular;
- validar limite com a missão Você iniciou este acesso?;
- aprovar gates de B1–B4 e Futuro F1;
- revisar com Segurança, Educação e Acessibilidade.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, console de vínculos e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
