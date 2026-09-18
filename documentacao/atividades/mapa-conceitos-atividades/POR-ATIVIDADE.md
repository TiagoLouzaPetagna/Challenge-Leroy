# Mapa inverso — atividades e conceitos proprietários

> **Estado:** visão inversa do mapa curricular aprovado em 2026-08-15.
> **Efeito técnico:** nenhum. Este documento não cria atividade, rota, contrato, versão, pontos, recompensa, progresso ou disponibilidade.
> **Fonte de verdade:** os nove mapas por conceito desta pasta e as composições propostas das 22 atividades.

Este documento reorganiza os 187 conceitos por atividade proprietária. Propriedade continua única: cada `conceptId` aparece em uma única linha abaixo. Quando um conceito também é aplicado em outra experiência, essa ocorrência é registrada somente na coluna de observação e não é contabilizada outra vez.

## Como interpretar a carga

A **carga documental não é a carga de uma tentativa**. O total de uma atividade reúne primeira versão, banco de casos, versões futuras e debriefs. Uma tentativa continua limitada a um comportamento principal, até dois complementares ativos e, quando previsto, um caso curto de transferência. Variações editoriais são selecionadas por pacote; conteúdos futuros dependem de capacidade ou governança posterior; debriefs explicam limites sem criar player ou recompensa próprios.

As listas estão agrupadas primeiro pelo momento de cobertura e depois pelo papel curricular. Momentos sem conceitos continuam visíveis nas contagens, mas não recebem uma tabela vazia.

## Resumo do portfólio

| Área | Atividade | Total | Primeira versão | Banco de casos | Versão futura | Debrief |
|---|---|---:|---:|---:|---:|---:|
| Missão | **A conversa já estava acontecendo** | 6 | 3 | 2 | 0 | 1 |
| Missão | **Você iniciou este acesso?** | 5 | 4 | 0 | 0 | 1 |
| Missão | **Cliquei. E agora?** | 21 | 10 | 2 | 6 | 3 |
| Missão | **Pedido urgente de um gestor** | 8 | 6 | 2 | 0 | 0 |
| Missão | **Documento inesperado** | 15 | 5 | 7 | 0 | 3 |
| Missão | **A central que não podia esperar** | 11 | 5 | 5 | 0 | 1 |
| Missão | **Ele já sabia meus dados** | 16 | 3 | 6 | 6 | 1 |
| Missão | **O pedido não tinha link** | 5 | 3 | 2 | 0 | 0 |
| PhishLab | **Quem enviou de verdade?** | 6 | 3 | 1 | 0 | 2 |
| PhishLab | **Domínio sob a lupa** | 4 | 4 | 0 | 0 | 0 |
| PhishLab | **Uma letra fora do lugar** | 4 | 1 | 3 | 0 | 0 |
| PhishLab | **Para onde esse link realmente vai?** | 5 | 3 | 1 | 0 | 1 |
| PhishLab | **O destino atrás do QR** | 5 | 1 | 3 | 1 | 0 |
| PhishLab | **Espelho de Página** | 13 | 4 | 6 | 0 | 3 |
| PhishLab | **Login verdadeiro, permissão errada** | 5 | 3 | 0 | 0 | 2 |
| PhishLab | **De qual dispositivo veio este código?** | 8 | 3 | 4 | 1 | 0 |
| Simulação | **Uma manhã comum** | 14 | 4 | 10 | 0 | 0 |
| Simulação | **Central de mensagens** | 7 | 2 | 5 | 0 | 0 |
| Simulação | **Ataque multicanal** | 4 | 2 | 2 | 0 | 0 |
| Simulação | **O primeiro resultado** | 4 | 2 | 2 | 0 | 0 |
| Simulação | **Pagamento para quem?** | 12 | 5 | 6 | 1 | 0 |
| Simulação | **A porta também é um canal** | 9 | 0 | 0 | 9 | 0 |
| **Total** | **22 atividades** | **187** | **76** | **69** | **24** | **18** |

## Missões

### 1. A conversa já estava acontecendo

- **Área:** Missão.
- **Comportamento principal:** Confirmar fora da conversa quando comportamento ou processo muda.
- **Mecânica-base:** reconstrução cronológica acessível + ponto de mudança + painel de evidências.
- **Carga documental:** **6 conceitos** — 3 na primeira versão, 2 no banco de casos, 0 em versão futura e 1 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:thread-hijacking` | Conversation ou thread hijacking | Formato A | Combinar | Ordenar mensagens, marcar a ruptura operacional e prender evidências antes de selecionar confirmação e reporte proporcionais. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

##### Complementar — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-familiarity` | Familiaridade, confiança e liking | Combinação | Combinar | A reconstrução mostra uma conta conhecida mudando de comportamento; a inspeção final compara estilo, contexto, endereço e rota de confirmação sem converter familiaridade em prova. | Reaparece em: Central de mensagens; Ele já sabia meus dados. Aplicação secundária; não altera a propriedade. |
| `concept:account-compromise` | Conta legítima comprometida | Formato A | Manter | Reconstruir o antes e o depois de uma conta correta e confirmar fora da conversa quando pedido, destino ou processo mudam. | Reaparece em: Quem enviou de verdade?; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 2 conceitos

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:lateral-phishing` | Phishing interno ou lateral | Formato A | Combinar | Aplicar o mesmo processo a pedido interno inesperado e produzir reporte discreto, factual e sem acusar o titular da conta. | Reaparece em: Uma manhã comum; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:thread-fabrication` | Thread fabricada | Formato B | Adaptar | Contrastar `Re:` e citações no corpo com contexto realmente disponível, aceitando que histórico ausente também pode ser inconclusivo. | Reaparece em: Quem enviou de verdade?; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

#### Debrief — 1 conceito

##### Debrief ou limite técnico — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:inbox-manipulation` | Regras maliciosas de encaminhamento e ocultação | Combinação | Descartar como atividade própria | Relacionar sintomas a causas legítimas e maliciosas e revelar, somente após o reporte, uma investigação administrativa fictícia. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

### 2. Você iniciou este acesso?

- **Área:** Missão.
- **Comportamento principal:** Negar e reportar autenticação não iniciada.
- **Mecânica-base:** console sequencial de eventos + conversa textual reativa.
- **Carga documental:** **5 conceitos** — 4 na primeira versão, 0 no banco de casos, 0 em versão futura e 1 em debrief.

#### Primeira versão — 4 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:mfa-uninitiated` | Solicitação MFA não iniciada | Formato A | Manter | Negar um evento fictício, abrir a área oficial simulada, revisar o contexto e reportar, sem notificação do sistema ou cronômetro. | Reaparece em: Ataque multicanal; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

##### Complementar — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:mfa-fatigue` | MFA fatigue ou push bombing | Formato A | Manter | Manter a recusa diante de uma fila controlada e de falso suporte textual, sem som, vibração, volume perturbador ou pressão de tempo. | Reaparece em: A central que não podia esperar; Ataque multicanal. Aplicação secundária; não altera a propriedade. |
| `concept:mfa-context` | Número, localização e dispositivo do prompt | Formato B | Manter | Associar cada prompt a uma ação própria ou marcar “sem vínculo”, usando número, local e dispositivo apenas como contexto falível. | Reaparece em: De qual dispositivo veio este código?. Aplicação secundária; não altera a propriedade. |
| `concept:otp-mfa-response` | Compartilhou OTP ou aprovou MFA | Formato A | Combinar | Negar novos eventos, encerrar falso suporte e selecionar reporte e revisão oficial após aprovação ou código compartilhado narrados. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Debrief — 1 conceito

##### Debrief ou limite técnico — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:credential-stuffing-symptom` | Prompt decorrente de tentativa de senha reutilizada | Nenhum como player próprio | Descartar como atividade própria | Revelar somente após a decisão que prompts iguais podem ter causas distintas; avaliar negar e reportar, nunca diagnosticar stuffing ou atribuir culpa. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

### 3. Cliquei. E agora?

- **Área:** Missão.
- **Comportamento principal:** Montar resposta proporcional ao evento real e reportar sem culpa.
- **Mecânica-base:** linha do incidente + montador por papel da ação + construtor de reporte.
- **Carga documental:** **21 conceitos** — 10 na primeira versão, 2 no banco de casos, 6 em versão futura e 3 em debrief.

#### Primeira versão — 10 conceitos

##### Núcleo — 4

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:session-review-revoke` | Revisão e revogação de sessões ou aplicativos | Combinação | Manter | Relacionar o tipo de exposição às contenções e operar uma central inteiramente simulada de sessões, dispositivos e aplicativos, com “solicitar” em vez de prometer efeito real. | Reaparece em: Você iniciou este acesso?; Login verdadeiro, permissão errada; De qual dispositivo veio este código?. Aplicação secundária; não altera a propriedade. |
| `concept:file-view-download-open-execute` | Visualizar, baixar, abrir e executar | Combinação | Manter | Marcar o último estágio realmente ocorrido e montar ações “agora”, “em seguida” e “não faça”, separando fato de hipótese e sem culpa. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:clicked-link-response` | Clicou sem fornecer dado | Formato A | Manter | Distribuir ações entre agora, depois e não faça, interromper a interação e relatar o clique sem reabrir o destino. | Reaparece em: Espelho de Página. Aplicação secundária; não altera a propriedade. |
| `concept:incident-causality` | Linha temporal e exposição | Combinação | Combinar | Reconstruir eventos, última exposição conhecida e incertezas e ligar o caminho a uma árvore textual de resposta proporcional. | Reaparece em: Ataque multicanal; Documento inesperado. Aplicação secundária; não altera a propriedade. |

##### Complementar — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:report-preserve` | Preservação de contexto | Formato A | Manter | Selecionar canal, horário, origem, destino aparente e ações relevantes, excluindo segredo, opinião e dado excessivo. | Reaparece em: A conversa já estava acontecendo; Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:do-not-delete-forward` | Não apagar nem encaminhar indiscriminadamente | Formato A | Adaptar | Comparar reporte oficial fictício, encaminhamento informal e exclusão prematura conforme procedimento, sem executar nenhuma ação real. | Reaparece no procedimento oficial futuro e em Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:report-without-secrets` | Reporte sem senha, OTP ou código | Formato A | Manter | Montar o reporte com blocos allowlisted que informam categoria e sistema afetado sem persistir senha, OTP, token ou código. | Reaparece em: Todas as atividades com reporte. Aplicação secundária; não altera a propriedade. |

##### Transversal com proprietário — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:no-blame-reporting` | Cultura de reporte sem culpa | Combinação | Combinar | Abrir ajuda após um erro fictício e montar relato factual por opções fechadas, sem pontuar vergonha, confissão ou velocidade. | Reaparece em: Todas as atividades que terminam em reporte. Aplicação secundária; não altera a propriedade. |
| `concept:account-recovery` | Recuperação de conta e sessão | Formato A | Manter | Relacionar credencial, sessão, MFA, permissão e dispositivo ao que pode persistir e a quem cabe tratar, sem central conectada. | Reaparece em: Você iniciou este acesso?; Login verdadeiro, permissão errada; De qual dispositivo veio este código?. Aplicação secundária; não altera a propriedade. |
| `concept:collective-protection` | Reporte como proteção coletiva | Combinação | Combinar | Revelar barreiras organizacionais fictícias após um relato e transferir o comportamento para segundo caso, sem expor pessoa ou resultado individual. | Reaparece em: A conversa já estava acontecendo; Ataque multicanal; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 2 conceitos

##### Variação de caso — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:opened-message-response` | Apenas abriu a mensagem | Combinação | Combinar | Classificar até onde uma persona chegou e comparar abertura, clique e envio de dado, aceitando “não sei” e resposta proporcional. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:credential-response` | Informou credencial | Formato A | Combinar | Reportar e navegar por rota oficial fictícia para recuperação e revisão de sessões, sem campo de credencial nem inventário pessoal. | Reaparece em: Espelho de Página. Aplicação secundária; não altera a propriedade. |

#### Versão futura — 6 conceitos

##### Variação de caso — 6

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:oauth-response` | Concedeu OAuth | Formato A | Adaptar | Usar uma matriz inerte para mostrar que troca de senha pode não remover consentimento e encaminhar revogação ou revisão pelo processo. | Reaparece em: Login verdadeiro, permissão errada. Aplicação secundária; não altera a propriedade. |
| `concept:file-execution-response` | Abriu ou executou arquivo | Combinação | Combinar | Reconstruir recebeu, baixou, abriu, permitiu e executou e então montar contenção que aceita incerteza, sem arquivo ou ação técnica real. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:command-response` | Colou ou executou comando | Formato B | Adaptar | Classificar ações posteriores em parar agora, somente com orientação e não tentar, sem mostrar sintaxe copiável ou terminal. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:data-disclosure-response` | Enviou dado pessoal ou corporativo | Combinação | Combinar | Classificar somente categorias fictícias de dado e áreas que precisam saber, sem entrada livre nem repetição do conteúdo exposto. | Reaparece em: O pedido não tinha link. Aplicação secundária; não altera a propriedade. |
| `concept:payment-response` | Realizou pagamento | Formato B | Combinar | Associar meio de pagamento fictício à rota oficial e aos limites de resposta, sem cronômetro, contato bancário ou garantia de reversão. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:extortion-response` | Extorsão, sextorsão ou chantagem | Formato B | Adiar | Orientar uma persona fictícia com linguagem acolhedora, preservação e apoio, somente após governança, aviso e saída sem penalidade. | Reaparece em: Ele já sabia meus dados. Aplicação secundária; não altera a propriedade. |

#### Debrief — 3 conceitos

##### Debrief ou limite técnico — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:tracking-pixel` | Pixel ou beacon invisível | Nenhum como player próprio | Descartar como atividade própria | Ao tratar “abri a mensagem”, explicar carregamento externo e responsabilidades do cliente de e-mail sem pedir que a pessoa encontre ou bloqueie o pixel. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:session-cookie` | Roubo ou reutilização de sessão | Formato B | Combinar | Após uma exposição declarada, incluir revisão de sessões no plano proporcional e explicar que trocar senha pode não encerrá-las; nenhuma detecção de cookie é pedida. | Reaparece em: Login verdadeiro, permissão errada. Aplicação secundária; não altera a propriedade. |
| `concept:med-response` | Mecanismo Especial de Devolução e contato bancário | Formato A | Adaptar | Diferenciar, em casos fictícios, suspeita de fraude, Pix errado e disputa, apontando contato imediato com a instituição sem garantir elegibilidade ou devolução. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

### 4. Pedido urgente de um gestor

- **Área:** Missão.
- **Comportamento principal:** Preservar o processo diante de autoridade e urgência.
- **Mecânica-base:** conversa curta + estação de autoridade, alçada e aprovação.
- **Carga documental:** **8 conceitos** — 6 na primeira versão, 2 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 6 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-authority` | Autoridade | Combinação | Combinar | A estação confronta pedido, alçada e registro oficial; no fechamento, o funcionário monta uma resposta respeitosa que pausa a execução e indica a confirmação independente. | Reaparece em: Pagamento para quem?; A porta também é um canal. Aplicação secundária; não altera a propriedade. |
| `concept:ceo-fraud` | CEO fraud e falso gestor | Formato A | Combinar | Montar resposta de limite, consultar alçada fictícia e confirmar por contato independente diante de autoridade, sigilo e urgência. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

##### Complementar — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-urgency` | Urgência e pressão temporal | Combinação | Combinar | O caso separa prioridade operacional de necessidade de autenticação e insere uma pausa PARE antes da decisão de alto impacto, sem cronômetro ou bônus por rapidez. | Reaparece em: Uma manhã comum; A central que não podia esperar. Aplicação secundária; não altera a propriedade. |
| `concept:influence-secrecy` | Segredo e isolamento | Formato B | Adaptar | Uma matriz diferencia confidencialidade legítima, necessidade de conhecer e pressão para impedir consulta; a decisão preserva a informação e aciona somente pessoas autorizadas. | Reaparece em: Pagamento para quem?; O pedido não tinha link. Aplicação secundária; não altera a propriedade. |
| `concept:process-exception` | Exceção urgente ao processo | Formato A | Manter | Registrar motivo, risco, autoridade e medida temporária numa mesa de exceção fictícia, em vez de aceitar atalho informal. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

##### Transversal com proprietário — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:pare-model` | Pare → Avalie → Reconfirme → Escale e responda | Combinação | Manter | A atividade apresenta as quatro etapas durante o pedido e reconstrói no debrief onde cada uma alterou a decisão; o modelo permanece adaptável ao risco e sem recompensa própria. | Reaparece em: Todas as 22 atividades. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 2 conceitos

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:gift-card-procurement` | Cartão-presente e compra sigilosa | Formato A | Adaptar | Apresentar primeiro a compra e depois o pedido de envio de códigos fictícios, exigindo procurement, reconfirmação e rastreabilidade. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:whaling` | Whaling e fraude contra lideranças | Formato B | Adaptar | Montar uma resposta profissional e acionar assessoria ou alçada fictícia sem contornar o processo por causa do cargo. | Reaparece em: Ele já sabia meus dados; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

### 5. Documento inesperado

- **Área:** Missão.
- **Comportamento principal:** Confirmar contexto e recusar quebra de proteção antes de abrir ou executar.
- **Mecânica-base:** inspetor de propriedades + cadeia de exposição + ação segura.
- **Carga documental:** **15 conceitos** — 5 na primeira versão, 7 no banco de casos, 0 em versão futura e 3 em debrief.

#### Primeira versão — 5 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:unexpected-attachment` | Anexo inesperado | Formato A | Manter | Comparar o anexo textual com agenda, chamado, histórico e contato conhecido antes de prosseguir, verificar ou reportar. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |

##### Complementar — 4

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-curiosity` | Curiosidade e surpresa | Combinação | Combinar | Antes de abrir o artefato inerte, o funcionário consulta expectativa, histórico e origem; uma comparação curta entre manchete e contexto mostra que interesse não equivale a autorização. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:hidden-double-extension` | Extensão escondida ou dupla extensão | Formato A | Adaptar | Abrir um inspetor fictício com nome exibido, nome completo, tipo alegado e origem; a pessoa identifica inconsistência sem memorizar extensões. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:macro-enable-content` | Macro e “habilitar conteúdo” | Combinação | Combinar | Uma faixa inerte marca a fronteira e a comparação de processos mostra que autorização vem da política e do canal conhecido, não do arquivo. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:clickfix` | ClickFix ou falso CAPTCHA | Combinação | Manter | Uma sequência higienizada cruza da página para ação no sistema; a pessoa marca a fronteira, interrompe e reporta sem copiar ou executar conteúdo. | Reaparece em: Espelho de Página; A central que não podia esperar; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 7 conceitos

##### Variação de caso — 7

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:file-format-variety` | Office, PDF, HTML, SVG, OneNote, atalho, executável e imagem de disco | Formato B | Combinar | Repetir o mesmo pedido em PDF, link de nuvem, compactado ou outro contêiner e cobrar processo consistente, sem classificar extensões como seguras ou perigosas. | Reaparece em: Uma manhã comum; Ataque multicanal. Aplicação secundária; não altera a propriedade. |
| `concept:icon-masquerade` | Ícone ou nome incompatível | Combinação | Combinar | Calibrar ícone e nome como pistas fracas e conferir o artefato recebido contra a entrega esperada no canal oficial. | Reaparece em: O primeiro resultado. Aplicação secundária; não altera a propriedade. |
| `concept:rtlo-file-name` | Unicode RTL no nome do arquivo | Formato B | Adaptar | Resolver pela origem e pelo processo quando o sistema informa inconsistência; direção e caractere invisível são explicados depois, sem teste perceptivo. | Reaparece em: Ataque multicanal. Aplicação secundária; não altera a propriedade. |
| `concept:password-archive` | ZIP ou RAR com senha | Formato B | Manter | Contrastar arquivos protegidos esperado e inesperado, usando acordo e confirmação independente sem solicitar senha nem extrair conteúdo. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:cloud-share` | Documento compartilhado em nuvem | Combinação | Manter | Separar serviço, remetente, proprietário e destino e depois procurar o compartilhamento numa área oficial inteiramente simulada. | Reaparece em: Quem enviou de verdade?; Para onde esse link realmente vai?. Aplicação secundária; não altera a propriedade. |
| `concept:document-as-bridge` | PDF, HTML ou documento usado como ponte para link ou QR | Formato B | Adaptar | Um documento estático pede continuidade por link, QR ou telefone; a pessoa reavalia a nova origem e usa a rota conhecida. | Reaparece em: O destino atrás do QR; Espelho de Página; Ataque multicanal. Aplicação secundária; não altera a propriedade. |
| `concept:copied-command` | Comando copiado e execução orientada | Formato B | Adaptar | Comparar pedido sanitizado com procedimento e chamado oficiais; a avaliação verifica origem e autorização, sem comando, terminal ou Clipboard API. | Reaparece em: A central que não podia esperar; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Debrief — 3 conceitos

##### Debrief ou limite técnico — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:html-smuggling` | HTML smuggling e download construído no navegador | Nenhum como player próprio | Descartar como atividade própria | Um download inesperado é tratado por contexto e reporte; o debrief cita possíveis causas e controles sem pedir diagnóstico nem mostrar código. | Reaparece em: Cliquei. E agora?; Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:antivirus-silence` | “O antivírus não alertou” | Formato A | Combinar | Classificar “sem alerta” como evidência insuficiente ao lado de contexto e origem; scanner continua controle técnico e nenhum arquivo é enviado para análise. | Reaparece em: Uma manhã comum; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |
| `concept:polyglot-magic-type` | Arquivo poliglota ou tipo interno divergente | Nenhum como player próprio | Descartar como atividade própria | Explicar que tipo interno não é diagnosticável pela aparência e que preservar, não executar e encaminhar são os únicos comportamentos humanos avaliáveis. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

### 6. A central que não podia esperar

- **Área:** Missão.
- **Comportamento principal:** Encerrar contato recebido e iniciar suporte pela rota oficial.
- **Mecânica-base:** console textual de callback + diretório/chamado fictício.
- **Carga documental:** **11 conceitos** — 5 na primeira versão, 5 no banco de casos, 0 em versão futura e 1 em debrief.

#### Primeira versão — 5 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:remote-tool-artifact` | Instalador remoto, extensão, arquivo RDP | Combinação | Manter | Validar chamado, profissional, ferramenta, duração e escopo e compreender as permissões solicitadas; nenhum pacote ou protocolo é aberto. | Reaparece em: Cliquei. E agora?; Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:vishing` | Vishing | Formato B | Adaptar | Uma chamada transcrita fornece o contexto e o funcionário monta o retorno seguro com número obtido do diretório fictício, ticket verificado e limites de informação. | Reaparece em: Ataque multicanal. Aplicação secundária; não altera a propriedade. |

##### Complementar — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:disable-protection` | Desativar antivírus, SmartScreen, modo protegido ou política | Formato B | Manter | Confrontar o pedido recebido com chamado, política e contato registrado e recusar mudança sem autorização verificável, sem revelar como desativar nada. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:fake-tech-support` | Falso suporte ou help desk | Combinação | Manter | A estação compara contato, ticket e diretório e incorpora uma conversa textual na qual suporte legítimo nunca solicita senha, OTP, pagamento ou acesso fora do escopo. | Reaparece em: Você iniciou este acesso?; Ataque multicanal. Aplicação secundária; não altera a propriedade. |
| `concept:safe-account-scam` | “Conta segura” | Formato A | Combinar | Decompor a falsa proteção em problema alegado, transferência exigida e perda de controle, então encerrar e procurar o canal oficial. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 5 conceitos

##### Variação de caso — 4

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:scareware` | Alerta falso, antivírus falso e tela cheia | Formato B | Adaptar | Reconstruir alerta → callback → falso técnico → acesso remoto e interromper pelo diretório oficial, sem tela cheia, timer, áudio ou contato acionável. | Reaparece em: Cliquei. E agora?; Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:fake-0800` | Falso 0800 ou central | Combinação | Combinar | Três cartões exibem números igualmente plausíveis e obrigam a comparar a origem de cada contato; o prefixo gratuito nunca é usado como resposta correta. | Reaparece em: O primeiro resultado; Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:remote-assistance` | Quick Assist, AnyDesk, TeamViewer ou acesso remoto equivalente | Combinação | Manter | Um painel totalmente inerte expõe permissões solicitadas; caso uma sessão fictícia já tenha sido aceita, a pessoa escolhe encerramento, contenção e reporte proporcionais. | Reaparece em: Cliquei. E agora?; Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:pix-fraud` | Pix induzido por falsa central ou mensagem | Combinação | Combinar | Interromper conversa textual persistente, decompor motivo alegado e operação pedida e reconstruir a rota oficial sem abrir aplicativo real. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:remote-access-response` | Concedeu acesso remoto | Formato A | Adaptar | Reconstruir instalação e controle apenas em texto, interromper obediência e procurar suporte oficial por canal ou dispositivo independente. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Debrief — 1 conceito

##### Debrief ou limite técnico — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:caller-id-spoofing` | Caller-ID ou sender-ID falsificado | Combinação | Descartar como atividade própria | Dois visores idênticos recebem exatamente o mesmo processo seguro; o debrief explica que o campo exibido não permite ao usuário determinar a origem verdadeira. | Reaparece em: Central de mensagens; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

### 7. Ele já sabia meus dados

- **Área:** Missão.
- **Comportamento principal:** Tratar a personalização de um spear phishing — inclusive dados corretos e mídia convincente — como plausibilidade, não autenticação.
- **Mecânica-base:** dossiê de fatos e inferências + narrativa em etapas.
- **Carga documental:** **16 conceitos** — 3 na primeira versão, 6 no banco de casos, 6 em versão futura e 1 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:spear-phishing` | Spear phishing | Combinação | Combinar | Separar detalhes verdadeiros, inferências e autorização num dossiê fictício e depois transferir o comportamento para pedidos com diferentes graus de contexto. | Reaparece em: Pedido urgente de um gestor; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

##### Complementar — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:osint-personalization` | OSINT, pegada digital e organograma | Formato B | Adaptar | Revisar a pegada de uma persona fictícia por finalidade e risco, sem pesquisar, aceitar ou persistir dados reais do participante. | Reaparece em: O pedido não tinha link; Pedido urgente de um gestor. Aplicação secundária; não altera a propriedade. |
| `concept:leaked-data` | Dados vazados usados como credibilidade | Combinação | Combinar | Inventariar categorias de dados sintéticos que o contato conhece, manter a origem como inconclusiva e confirmar pelo canal oficial. | Reaparece em: Central de mensagens; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 6 conceitos

##### Variação de caso — 5

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-social-proof` | Prova social | Formato B | Adaptar | Colegas e depoimentos fictícios sustentam um pedido plausível; o funcionário precisa localizar quem realmente aprovou e consultar um registro independente, sem tratar a maioria como autenticação. | Reaparece em: Pedido urgente de um gestor; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:influence-empathy` | Empatia e altruísmo | Combinação | Combinar | Um pedido sensível apresenta necessidade humana plausível; o funcionário escolhe uma resposta acolhedora e uma rota oficial de ajuda que não abre exceção nem expõe dados. | Reaparece em: Central de mensagens; O pedido não tinha link. Aplicação secundária; não altera a propriedade. |
| `concept:influence-commitment` | Compromisso gradual e custo já investido | Combinação | Combinar | Um caso longitudinal permite interromper a interação em cada degrau e, no desfecho, inventariar dados, permissões e promessas já concedidos para definir contenção proporcional. | Reaparece em: Cliquei. E agora?; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:catfishing-honeytrap` | Catfishing e honey trap | Formato B | Adaptar | Um caso opcional classifica mudanças entre contexto pessoal, profissional e financeiro e oferece saída e apoio sem exigir que o participante investigue ou prove a identidade. | Reaparece em: Central de mensagens; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:ai-polished-text` | Texto gerado ou aprimorado por IA | Combinação | Descartar como atividade própria | O banco intercala mensagens legítimas e maliciosas com diferentes níveis de fluência e personalização; a avaliação usa origem, pedido e processo, não qualidade da escrita. | Reaparece em: Uma manhã comum; Central de mensagens. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:charity-disaster` | Caridade e desastre | Formato A | Combinar | Preservar a intenção de ajudar e localizar uma organização inteiramente fictícia por rota própria antes de escolher canal e beneficiário. | Reaparece em: Pagamento para quem?; O destino atrás do QR. Aplicação secundária; não altera a propriedade. |

#### Versão futura — 6 conceitos

##### Variação de caso — 5

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:synthetic-identity` | Identidade sintética e perfil composto | Formato B | Adiar | Classificar peças verdadeiras e inferências de uma persona inteiramente fictícia, sem avaliar aparência ou autenticar identidade civil. | Reaparece em: Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:investment-pig-butchering` | Investimento, cripto e pig-butchering | Formato B | Adiar | Auditar promessa, risco, registro, custódia e saque num caso curto, sem aconselhamento financeiro ou campanha longitudinal nesta fase. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:romance-financial-scam` | Romance seguido de emergência ou investimento | Formato B | Adiar | Orientar uma persona fictícia a buscar apoio e separar confiança afetiva de dinheiro, com aviso, saída e revisão psicossocial obrigatórios. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:social-mining` | Coleta gradual de organograma, agenda e tecnologia | Formato B | Adaptar | Uma oficina com publicações inteiramente sintéticas pede que a pessoa mantenha a intenção comunicacional enquanto remove identificadores, agenda e detalhes técnicos desnecessários. | Reaparece em: A porta também é um canal. Aplicação secundária; não altera a propriedade. |
| `concept:badge-photo-exposure` | Crachá, tela, quadro ou foto pública | Formato B | Combinar | Um mosaico sintético mostra como pequenas exposições ao longo de uma semana se agregam; a pessoa escolhe uma versão publicável sem enviar nem editar foto real. | Reaparece em: A porta também é um canal. Aplicação secundária; não altera a propriedade. |

##### Debrief ou limite técnico — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:deepfake-video` | Deepfake de vídeo | Formato A | Adiar | Um debrief futuro, sem avaliação de detecção, poderá usar mídia licenciada e transcrição equivalente para explicar por que o pedido e o processo ainda exigem verificação. | Reaparece em: Ataque multicanal; Pedido urgente de um gestor. Aplicação secundária; não altera a propriedade. |

#### Debrief — 1 conceito

##### Debrief ou limite técnico — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:voice-cloning` | Voz clonada | Formato B | Descartar como atividade própria | Uma emergência representada em texto mostra por que semelhança vocal e palavra combinada são insuficientes; a resposta correta continua sendo confirmação independente e apoio de outra pessoa. | Reaparece em: A central que não podia esperar; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

### 8. O pedido não tinha link

- **Área:** Missão.
- **Comportamento principal:** Validar identidade, necessidade e autorização antes de responder ou enviar dado.
- **Mecânica-base:** painel alegação–fato–necessidade–autorização + resposta conversacional.
- **Carga documental:** **5 conceitos** — 3 na primeira versão, 2 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:pretexting` | Pretexting | Combinação | Manter | O funcionário relaciona alegações a evidências independentes, fornecidas pelo solicitante ou ausentes e conduz uma entrevista curta que verifica sem revelar dados úteis ao pretexto. | Reaparece em: Pedido urgente de um gestor; A porta também é um canal. Aplicação secundária; não altera a propriedade. |

##### Complementar — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-reciprocity` | Reciprocidade, solicitude e quid pro quo digital | Combinação | Combinar | Uma conversa começa com ajuda legítima, muda de escopo e termina num resumo que separa cortesia de permissão organizacional antes do encaminhamento. | Reaparece em: A central que não podia esperar; A porta também é um canal. Aplicação secundária; não altera a propriedade. |
| `concept:callback-phishing` | Callback phishing | Combinação | Manter | O funcionário decompõe uma cobrança sem link, identifica que o telefone veio do próprio pedido e localiza uma rota independente antes de decidir ou reportar. | Reaparece em: A central que não podia esperar; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 2 conceitos

##### Variação de caso — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:job-recruitment-scam` | Vaga e recrutamento falso | Formato B | Adaptar | Cruzar anúncio, site de carreiras e diretório de RH inventados antes de fornecer dado ou pagar, aceitando ausência como inconclusiva. | Reaparece em: Ele já sabia meus dados; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:government-legal-payment` | Governo, polícia, jurídico ou compliance exigindo pagamento | Formato A | Adaptar | Encerrar ameaça textual, procurar órgão ou jurídico em diretório cenográfico e verificar o protocolo sem pagar nem fornecer dado. | Reaparece em: Pagamento para quem?; A central que não podia esperar. Aplicação secundária; não altera a propriedade. |

## PhishLabs

### 1. Quem enviou de verdade?

- **Área:** PhishLab.
- **Comportamento principal:** Mapear nome, conta, resposta, domínio e contexto sem inferir controle não comprovado.
- **Mecânica-base:** mapa de relações com alternativa tabular completa.
- **Carga documental:** **6 conceitos** — 3 na primeira versão, 1 no banco de casos, 0 em versão futura e 2 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:identity-display-name` | Nome exibido, foto e cargo | Formato A | Manter | Abrir o cartão em camadas e separar apresentação visual, conta declarada, diretório fictício e controle ainda não comprovado. | Reaparece em: Central de mensagens; Pedido urgente de um gestor. Aplicação secundária; não altera a propriedade. |
| `concept:identity-from` | Endereço completo e campo `From` | Formato B | Combinar | Comparar o `From` completo com uma referência fictícia e escolher confirmação independente sem tratá-lo como prova de controle. | Reaparece em: A conversa já estava acontecendo. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:identity-reply-to` | `Reply-To` diferente | Combinação | Combinar | Revelar o destino inerte da resposta, contrastá-lo com o `From` e praticar casos legítimos, suspeitos e inconclusivos. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 1 conceito

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:cloud-account-abuse` | Conta ou serviço legítimo de nuvem abusado | Formato B | Combinar | Abandonar a notificação e procurar o compartilhamento numa biblioteca totalmente fictícia, separando plataforma, conta, conteúdo e destino. | Reaparece em: Documento inesperado; Para onde esse link realmente vai?. Aplicação secundária; não altera a propriedade. |

#### Debrief — 2 conceitos

##### Debrief ou limite técnico — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:identity-spoofing` | Spoofing do remetente | Combinação | Adaptar | Classificar o que a tela comum permite ou não concluir e comparar, após a decisão, spoofing, domínio parecido e conta comprometida. | Reaparece em: Domínio sob a lupa; A conversa já estava acontecendo. Aplicação secundária; não altera a propriedade. |
| `concept:identity-authentication-limits` | Limites de SPF, DKIM e DMARC | Combinação | Descartar como atividade própria | Explicar em camadas que autenticação de domínio ajuda controles técnicos, mas não autoriza o pedido nem exige leitura de cabeçalho pelo funcionário. | Reaparece em: A conversa já estava acontecendo. Aplicação secundária; não altera a propriedade. |

### 2. Domínio sob a lupa

- **Área:** PhishLab.
- **Comportamento principal:** Localizar domínio registrado e separar componentes da URL.
- **Mecânica-base:** anatomia de URL por segmentos, sem arraste obrigatório.
- **Carga documental:** **4 conceitos** — 4 na primeira versão, 0 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 4 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:url-anatomy` | Protocolo, host, caminho, consulta e fragmento | Formato A | Manter | Segmentar uma URL sintética e rotular suas partes antes de localizar o host, com seleção por controles e sem arraste obrigatório. | Reaparece em: Espelho de Página; Para onde esse link realmente vai?. Aplicação secundária; não altera a propriedade. |
| `concept:registered-domain` | Domínio registrado e sufixo público | Combinação | Combinar | A ferramenta calcula e revela a fronteira do registro com dados versionados; o funcionário a usa para comparar o destino com a referência, sem memorizar sufixos. | Reaparece em: Todas as atividades que exibirem URL. Aplicação secundária; não altera a propriedade. |

##### Complementar — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:deceptive-subdomain` | Subdomínio enganoso | Combinação | Combinar | Recolher camadas do endereço para revelar qual domínio controla a marca à esquerda e decidir com uma referência oficial fornecida. | Reaparece em: Uma letra fora do lugar; Quem enviou de verdade?. Aplicação secundária; não altera a propriedade. |
| `concept:path-query-branding` | Marca no caminho, parâmetro ou fragmento | Formato A | Manter | Posicionar a fronteira do host e explicar por que uma marca depois dela não muda o controlador, sem mandar ignorar parâmetros. | Reaparece em: Para onde esse link realmente vai?; Espelho de Página. Aplicação secundária; não altera a propriedade. |

### 3. Uma letra fora do lugar

- **Área:** PhishLab.
- **Comportamento principal:** Comparar domínio com referência conhecida.
- **Mecânica-base:** lente de comparação Unicode + pares legítimos/enganosos.
- **Carga documental:** **4 conceitos** — 1 na primeira versão, 3 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 1 conceito

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:typosquatting` | Typosquatting | Combinação | Combinar | Abandonar a rota recebida e comparar o domínio com uma referência usando uma lente assistida; a nota recai sobre usar a referência, não enxergar a letra. | Reaparece em: Domínio sob a lupa; O primeiro resultado. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 3 conceitos

##### Variação de caso — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:typo-variants` | Omissão, inserção, troca, repetição e transposição | Formato A | Combinar | Alternar pequenas famílias de mudança e exigir a mesma resposta segura, com diferenças descritas em texto e casos legítimos semelhantes. | Reaparece em: O primeiro resultado; Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:combosquatting` | Palavra adicional, hífen, plural e outro TLD | Combinação | Combinar | Separar marca alegada, palavra adicional, domínio e TLD e depois recuperar o serviço pelo catálogo ou referência oficial. | Reaparece em: O primeiro resultado; Domínio sob a lupa. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:homograph-idn` | Homógrafos, IDN e Punycode | Combinação | Adaptar | Resolver pela rota conhecida; script, nome Unicode e Punycode aparecem apenas como revelação assistida, nunca como teste visual ou condenação de IDN. | Reaparece em: Espelho de Página; Domínio sob a lupa. Aplicação secundária; não altera a propriedade. |

### 4. Para onde esse link realmente vai?

- **Área:** PhishLab.
- **Comportamento principal:** Identificar a cadeia e o destino final.
- **Mecânica-base:** linha de redirecionamentos inerte + decisão de navegação independente.
- **Carga documental:** **5 conceitos** — 3 na primeira versão, 1 no banco de casos, 0 em versão futura e 1 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:link-text-mismatch` | Texto ou botão diferente do `href` | Formato A | Manter | Acionar “ver destino” por teclado ou ponteiro, comparar promessa e endereço inerte e prender a divergência como evidência proporcional. | Reaparece em: Uma manhã comum; Domínio sob a lupa. Aplicação secundária; não altera a propriedade. |
| `concept:redirect-chain` | Cadeia de redirecionamentos | Formato B | Adaptar | Reconstruir saltos previamente curados e selecionar o destino final e a rota segura, sem prometer que o navegador sempre revela a cadeia. | Reaparece em: Cliquei. E agora?; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:open-redirect` | Redirecionador aberto | Formato B | Combinar | Mostrar a sequência domínio conhecido → destino externo e exigir abandono da confiança emprestada para a ação sensível. | Reaparece em: Domínio sob a lupa; O primeiro resultado. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 1 conceito

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:url-shortener` | Encurtador | Combinação | Adaptar | Uma prévia declarativa explica a opacidade e o caso cobra rota independente conforme o impacto, aceitando destino legítimo, suspeito ou inconclusivo. | Reaparece em: Uma manhã comum; O destino atrás do QR. Aplicação secundária; não altera a propriedade. |

#### Debrief — 1 conceito

##### Debrief ou limite técnico — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:url-obfuscation-advanced` | `userinfo@host`, IP, codificação e abuso de esquema | Formato B | Adaptar | Um caso de alto impacto termina em “informação insuficiente”; somente a escolha de verificar, reportar ou usar rota oficial é avaliada, não a decodificação. | Reaparece em: Domínio sob a lupa; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

### 5. O destino atrás do QR

- **Área:** PhishLab.
- **Comportamento principal:** Conferir destino, contexto e, quando aplicável, beneficiário.
- **Mecânica-base:** prévia fictícia de QR + inspeção de contexto e recebedor.
- **Carga documental:** **5 conceitos** — 1 na primeira versão, 3 no banco de casos, 1 em versão futura e 0 em debrief.

#### Primeira versão — 1 conceito

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:quishing` | Quishing | Combinação | Combinar | Revelar por botão o conteúdo textual de um QR inerte, preservar o contexto entre canais e escolher a rota apropriada sem câmera. | Reaparece em: Ataque multicanal; Central de mensagens. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 3 conceitos

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:qr-payment-destination` | QR, valor e beneficiário | Formato B | Adaptar | Consultar cadastro e confirmação independente para conferir recebedor e valor; a simulação não gera QR ou pagamento funcional. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:qr-physical-replacement` | QR físico substituído | Formato B | Adaptar | Confrontar identificador, local, finalidade e responsável do QR com um cadastro fictício; observação de adesivo é apenas contexto opcional. | Reaparece em: A porta também é um canal. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:payment-qr` | QR de pagamento alterado | Formato A | Adaptar | Revelar por botão o conteúdo simulado do QR e confrontar obrigação, recebedor e valor, sem câmera nem código escaneável. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

#### Versão futura — 1 conceito

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:physical-qr-tampering` | QR público substituído por adesivo | Combinação | Manter | Uma placa fictícia apresenta sinais de alteração e contexto de custódia; o funcionário informa o responsável e conclui a tarefa pela rota oficial simulada, sem escanear para testar. | Reaparece em: A porta também é um canal; O primeiro resultado. Aplicação secundária; não altera a propriedade. |

### 6. Espelho de Página

- **Área:** PhishLab.
- **Comportamento principal:** Abandonar aparência como prova e abrir o serviço independentemente.
- **Mecânica-base:** comparação de origem, campos e ação pedida; não “jogo dos sete erros”.
- **Carga documental:** **13 conceitos** — 4 na primeira versão, 6 no banco de casos, 0 em versão futura e 3 em debrief.

#### Primeira versão — 4 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:cloned-page` | Página clonada e coleta de credenciais | Formato B | Combinar | Classificar evidências copiáveis e contextuais e reabrir o serviço por rota própria; nenhuma tela aceita credenciais. | Reaparece em: O primeiro resultado; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |
| `concept:credential-harvest` | Coleta de usuário e senha | Combinação | Manter | Fechar uma página de login inerte, reabrir o serviço por rota conhecida e classificar quais evidências podem ser copiadas; nenhum campo recebe texto. | Reaparece em: Cliquei. E agora?; Documento inesperado. Aplicação secundária; não altera a propriedade. |

##### Complementar — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:https-limit` | HTTPS e cadeado | Formato B | Combinar | Contrastar dois destinos cifrados e separar conexão protegida de identidade, finalidade e origem da navegação. | Reaparece em: Domínio sob a lupa; O destino atrás do QR. Aplicação secundária; não altera a propriedade. |
| `concept:false-sso` | Falso SSO | Combinação | Adaptar | Interromper uma autenticação não iniciada e conferir a cadeia aplicação–provedor–retorno numa explicação aderente ao ambiente fictício. | Reaparece em: Login verdadeiro, permissão errada; Documento inesperado. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 6 conceitos

##### Complementar — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:captcha-trust` | CAPTCHA como falsa prova de segurança | Formato A | Combinar | Comparar casos legítimo e enganoso, ambos com CAPTCHA já resolvido, e indicar exatamente o que o desafio prova e o que permanece aberto. | Reaparece em: Documento inesperado; O primeiro resultado. Aplicação secundária; não altera a propriedade. |
| `concept:password-manager-clue` | Ausência de preenchimento automático | Combinação | Combinar | Representar logins inertes com estado “oferecido/não oferecido” e calibrar a ausência como pista para conferir domínio, nunca como prova. | Reaparece em: Uma letra fora do lugar; Login verdadeiro, permissão errada. Aplicação secundária; não altera a propriedade. |
| `concept:password-manager` | Gerenciador de senhas vinculado ao domínio | Combinação | Manter | Comparar formulários inertes com estado declarativo do gerenciador e calibrar ausência de preenchimento como pista, não veredito. | Reaparece em: Uma letra fora do lugar; Login verdadeiro, permissão errada. Aplicação secundária; não altera a propriedade. |

##### Variação de caso — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:browser-in-browser` | Janela de navegador simulada | Formato B | Adaptar | Fechar a camada representada e iniciar login pela rota conhecida; a técnica é revelada depois, sem réplica fiel ou caça a detalhe visual. | Reaparece em: Para onde esse link realmente vai?. Aplicação secundária; não altera a propriedade. |
| `concept:browser-warning` | Avisos do navegador e certificado | Combinação | Manter | Um intersticial claramente fictício leva a voltar e validar uma possível exceção no canal corporativo, sem apresentar caminho de contorno. | Reaparece em: O primeiro resultado; Documento inesperado. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:legitimate-site-compromise` | Site legítimo comprometido | Formato A | Combinar | Em domínio esperado com comportamento novo, interromper, verificar e reportar; a nota avalia a resposta, não o diagnóstico de comprometimento. | Reaparece em: Documento inesperado; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Debrief — 3 conceitos

##### Debrief ou limite técnico — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:watering-hole` | Watering hole | Nenhum como player próprio | Descartar como atividade própria | Uma retrospectiva separa pistas disponíveis no momento das descobertas técnicas posteriores e distribui responsabilidades sem culpar a visita legítima. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |
| `concept:pharming` | Pharming | Formato B | Adaptar | Depois de uma rota correta produzir alerta inesperado, explicar múltiplas causas possíveis; somente parar e buscar canal oficial pode ser avaliado. | Reaparece em: Domínio sob a lupa; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |
| `concept:aitm` | Adversary-in-the-middle | Combinação | Adaptar | A atividade avalia somente abandonar a rota recebida; depois, uma cadeia causal explica por que login e MFA bem-sucedidos não comprovam sessão segura. | Reaparece em: Cliquei. E agora?; Login verdadeiro, permissão errada. Aplicação secundária; não altera a propriedade. |

### 7. Login verdadeiro, permissão errada

- **Área:** PhishLab.
- **Comportamento principal:** Avaliar aplicativo, finalidade e escopos antes de consentir.
- **Mecânica-base:** mesa de consentimento e permissões fictícias.
- **Carga documental:** **5 conceitos** — 3 na primeira versão, 0 no banco de casos, 0 em versão futura e 2 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:oauth-consent` | OAuth consent phishing | Combinação | Manter | Conferir aplicativo, finalidade, ação iniciada, editor e escopos numa tela abstrata e consultar o catálogo fictício antes de consentir ou escalar. | Reaparece em: Ataque multicanal; O primeiro resultado. Aplicação secundária; não altera a propriedade. |
| `concept:oauth-scopes` | Permissões excessivas | Formato A | Manter | Relacionar cada permissão traduzida à finalidade, aceitando compatível, excessiva ou informação insuficiente em vez de contar escopos. | Reaparece em: O pedido não tinha link. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:publisher-identity` | Editor verificado ou aplicativo conhecido | Formato B | Combinar | Comparar dois pedidos do mesmo editor com finalidades e permissões diferentes, demonstrando que identidade não é autorização universal. | Reaparece em: O primeiro resultado. Aplicação secundária; não altera a propriedade. |

#### Debrief — 2 conceitos

##### Debrief ou limite técnico — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:passkey-fido` | Passkeys e FIDO resistentes a phishing | Formato B | Combinar | Uma falha representada leva a reabrir a rota oficial; o debrief explica resistência a phishing sem prometer invulnerabilidade nem acionar WebAuthn. | Reaparece em: Espelho de Página; Você iniciou este acesso?. Aplicação secundária; não altera a propriedade. |
| `concept:prompt-injection-assistant` | Prompt injection contra assistente de IA | Combinação | Combinar | Uma demonstração inerte separa conteúdo da fonte, instrução recebida, permissões e autoridade real; toda ação sensível termina numa porta de aprovação humana sem integração externa. | Reaparece em: Defesa principal da plataforma; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

### 8. De qual dispositivo veio este código?

- **Área:** PhishLab.
- **Comportamento principal:** Associar código, QR ou vínculo a uma ação iniciada em dispositivo reconhecido.
- **Mecânica-base:** mapa dispositivo–código–sessão + console de vínculo fictício.
- **Carga documental:** **8 conceitos** — 3 na primeira versão, 4 no banco de casos, 1 em versão futura e 0 em debrief.

#### Primeira versão — 3 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:otp-theft` | Roubo de OTP | Formato B | Manter | Um falso suporte reformula o pedido por um código apenas rotulado; a pessoa encerra a conversa e usa o canal oficial sem digitar segredo. | Reaparece em: Você iniciou este acesso?; Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:device-code` | Device-code phishing | Formato A | Manter | Relacionar código fictício à ação, ao aplicativo e ao dispositivo que o originou, sem copiar, digitar ou abrir página real. | Reaparece em: Ataque multicanal; Central de mensagens. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:device-link-response` | Vinculou dispositivo ou método | Formato A | Adaptar | Relacionar vínculo a uma ação iniciada, negar o que não foi reconhecido e montar pedido de revisão sem remover dispositivo real. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 4 conceitos

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:recovery-code-theft` | Código de recuperação | Formato A | Combinar | Classificar a função de itens mascarados e reconhecer o código de recuperação como segredo de alto impacto, sem ensinar formato real ou armazenamento. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

##### Variação de caso — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:device-join` | Registro ou ingresso de dispositivo | Combinação | Combinar | Um falso suporte fornece o contexto e uma mesa de registro mostra conta, máquina, chamado e efeito do vínculo antes da decisão. | Reaparece em: Você iniciou este acesso?; A central que não podia esperar. Aplicação secundária; não altera a propriedade. |
| `concept:account-pairing-qr` | QR de pareamento ou vinculação de conta | Formato B | Adaptar | Depois de interação declarada, revisar vínculos fictícios e solicitar remoção ou confirmação; o QR aparece apenas narrado e não é escaneável. | Reaparece em: O destino atrás do QR; Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:recovery-method-takeover` | Cadastro de novo fator, passkey ou recuperação | Formato B | Manter | Comparar migração planejada e inclusão não solicitada, usando inventário sintético para verificar, solicitar revogação e reportar. | Reaparece em: Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Versão futura — 1 conceito

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:sim-swap` | SIM swap | Combinação | Combinar | Combinar perda de serviço com outros sinais e montar um plano por canais alternativos, sem diagnosticar troca de SIM por um sintoma isolado. | Reaparece em: Central de mensagens; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

## Simulações

### 1. Uma manhã comum

- **Área:** Simulação.
- **Comportamento principal:** Triar entre prosseguir, verificar e reportar sem feedback antecipado.
- **Mecânica-base:** triagem em lote + fila explícita de inconclusivos.
- **Carga documental:** **14 conceitos** — 4 na primeira versão, 10 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 4 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-overload` | Sobrecarga, distração e ruído | Combinação | Manter | A caixa em lote permite resolver, investigar e manter itens inconclusivos, com filtros que reduzem ruído sem apagar evidências e com retorno posterior às pendências. | Reaparece em: Ataque multicanal. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:decision-ambiguity` | Legítimo, suspeito ou inconclusivo | Combinação | Manter | A terceira fila registra o que falta verificar; um painel de impacto ajuda a escolher uma ação reversível e proporcional em vez de forçar um veredito binário. | Reaparece em: Todas as atividades investigativas. Aplicação secundária; não altera a propriedade. |

##### Transversal com proprietário — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:false-positive-control` | Controle de falsos positivos | Combinação | Combinar | A composição balanceada inclui casos legítimos, maliciosos e inconclusivos, mede separadamente decisão e ação e expande um caso parcial sem exigir acusação do remetente. | Reaparece em: Central de mensagens; Ataque multicanal. Aplicação secundária; não altera a propriedade. |
| `concept:uncertain-reporting` | Reportar mesmo em dúvida | Combinação | Combinar | Permitir veredito inconclusivo e mostrar um falso positivo útil, avaliando qualidade factual e próximo passo em vez de acerto binário. | Reaparece em: Quem enviou de verdade?; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 10 conceitos

##### Variação de caso — 10

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:influence-scarcity` | Escassez e FOMO | Formato A | Combinar | Uma oferta limitada entra na triagem e só pode avançar depois da comparação entre benefício, condição, política e fonte independente simulada. | Reaparece em: Ele já sabia meus dados; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:influence-fear` | Medo e intimidação | Formato B | Adaptar | Um alerta potencialmente real exige ordenar preservação, consulta direta ao serviço, reporte e contenção, sem obedecer ao contato que apresentou a ameaça. | Reaparece em: Você iniciou este acesso?; A central que não podia esperar. Aplicação secundária; não altera a propriedade. |
| `concept:influence-reward` | Recompensa, prêmio e ganho desproporcional | Formato A | Combinar | O caso de benefício decompõe ganho prometido, ação exigida, ativo exposto e evidência, permitindo preservar uma oportunidade legítima sem usar o contato recebido. | Reaparece em: Ele já sabia meus dados; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:influence-current-event` | Evento atual e contexto oportuno | Formato A | Combinar | Um caso versionado apresenta a mesma técnica antes e depois de um acontecimento fictício ou fonte oficial segura, deixando claro que a plausibilidade mudou, mas a evidência não. | Reaparece em: Ele já sabia meus dados; O primeiro resultado. Aplicação secundária; não altera a propriedade. |
| `concept:phishing-mass` | Phishing em massa | Formato B | Adaptar | A pessoa decide sobre uma mensagem e depois recebe contexto coletivo sintético e anonimizado, usando a correlação para melhorar o reporte sem tratá-la como prova isolada. | Reaparece em: Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:identity-external-marker` | Avisos “Externo”, “primeiro contato” ou “não verificado” | Formato B | Manter | Triar mensagens com o mesmo marcador fictício em itens legítimos, suspeitos e inconclusivos, sem usá-lo como gabarito. | Reaparece em: Quem enviou de verdade?; Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:malicious-unsubscribe` | “Cancelar inscrição” malicioso | Combinação | Manter | Triar mensagens entre preferências na conta aberta independentemente, ferramenta nativa, arquivar ou reportar, incluindo newsletter legítima. | Reaparece em: Para onde esse link realmente vai?. Aplicação secundária; não altera a propriedade. |
| `concept:calendar-invite` | Convite de calendário ou arquivo ICS | Formato A | Manter | Triar convite fictício por organizador, expectativa, link, telefone e anexo, podendo aceitar, confirmar ou reportar sem alterar calendário real. | Reaparece em: Ataque multicanal; Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:prize-sweepstakes` | Prêmio, sorteio e vantagem inesperada | Combinação | Adaptar | Consultar participação fictícia e decompor prêmio, taxa, prazo, canal e dados solicitados sem transformar surpresa em diagnóstico. | Reaparece em: Pagamento para quem?. Aplicação secundária; não altera a propriedade. |
| `concept:delivery-fee` | Entrega, pacote, pedágio ou taxa | Combinação | Combinar | Abandonar a mensagem, consultar rastreamento fictício e triar taxas legítimas, suspeitas e inconclusivas sem usar baixo valor como prova. | Reaparece em: O destino atrás do QR; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

### 2. Central de mensagens

- **Área:** Simulação.
- **Comportamento principal:** Manter identidade consistente ao mudar de número, conta ou plataforma.
- **Mecânica-base:** conversas paralelas + mapa de identidade/canal.
- **Carga documental:** **7 conceitos** — 2 na primeira versão, 5 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 2 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:messaging-phishing` | Phishing em mensageria | Formato A | Adaptar | Uma conversa reconstruída mostra quando identidade, contexto e comportamento mudaram dentro do aplicativo; o debrief preserva o canal anterior como referência. | Reaparece em: A conversa já estava acontecendo; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:new-number-scam` | Troca de número | Formato A | Adaptar | A troca de contato preserva o histórico e apresenta rotas alternativas; se nenhuma confirmação independente estiver disponível, o caso permanece inconclusivo. | Reaparece em: Ele já sabia meus dados; Ataque multicanal. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 5 conceitos

##### Variação de caso — 4

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:external-collaboration` | Chat externo e tenant de colaboração | Formato B | Combinar | Uma sala de colaboração fictícia explicita organização, convidado e arquivo solicitado; o funcionário mantém estado inconclusivo até confirmar identidade e necessidade. | Reaparece em: Ataque multicanal; Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:cloned-social-profile` | Perfil clonado ou conta social tomada | Formato B | Adaptar | Um pedido sensível chega por perfil plausível e é resolvido por contato conhecido ou terceiro autorizado, não por foto, nome ou conexões em comum. | Reaparece em: Ele já sabia meus dados. Aplicação secundária; não altera a propriedade. |
| `concept:angler-phishing` | Falso atendimento após comentário público | Combinação | Combinar | Uma resposta privada fictícia chega primeiro; a pessoa procura o perfil oficial por conta própria e monta um relato mínimo que não replica dados do atendimento. | Reaparece em: O primeiro resultado; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |
| `concept:smishing` | Smishing e SMS | Combinação | Manter | A pessoa analisa uma mensagem inerte e conclui a tarefa abrindo o processo oficial simulado por origem independente, sem usar o link ou o número recebido. | Reaparece em: Ataque multicanal; O primeiro resultado. Aplicação secundária; não altera a propriedade. |

##### Transferência — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:platform-migration` | Migração induzida de plataforma | Formato A | Adaptar | Ao trocar de plataforma, a pessoa registra quais controles, identidade e histórico ficaram para trás e decide como restabelecer confirmação sem seguir a rota proposta. | Reaparece em: Ataque multicanal. Aplicação secundária; não altera a propriedade. |

### 3. Ataque multicanal

- **Área:** Simulação.
- **Comportamento principal:** Reconhecer que canais fornecidos pelo solicitante pertencem à mesma cadeia.
- **Mecânica-base:** linha temporal multicanal textual + mapa causal.
- **Carga documental:** **4 conceitos** — 2 na primeira versão, 2 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 2 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:multichannel-chain` | Ataque multicanal | Combinação | Manter | Uma linha temporal reúne e-mail, chat, ligação e QR inertes; o funcionário marca dependências, interrompe a cadeia e reconstrói o único contato obtido independentemente. | Reaparece em: Todas as atividades deste conjunto. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:false-cross-channel-corroboration` | Um canal validando falsamente outro | Combinação | Manter | O painel mostra que três confirmações remetem à mesma origem controlada; o funcionário substitui uma delas por uma fonte realmente independente. | Reaparece em: A central que não podia esperar; Central de mensagens. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 2 conceitos

##### Variação de caso — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:email-bombing-support` | E-mail bombing seguido de falso suporte | Formato A | Combinar | A linha temporal relaciona a enxurrada de mensagens e a chegada do suposto suporte sem afirmar causalidade automática; uma mini-caixa permite preservar e reportar o ruído. | Reaparece em: Uma manhã comum; A central que não podia esperar. Aplicação secundária; não altera a propriedade. |
| `concept:virtual-meeting-bec` | Reunião virtual falsa | Formato B | Adaptar | A pessoa compara ata, pedido e alçada e executa a segunda aprovação fora da reunião; falhas de câmera, áudio ou presença não contam como indício pontuado. | Reaparece em: Pedido urgente de um gestor; Pagamento para quem?. Aplicação secundária; não altera a propriedade. |

### 4. O primeiro resultado

- **Área:** Simulação.
- **Comportamento principal:** Localizar serviço, suporte, download ou aplicativo pela origem oficial.
- **Mecânica-base:** resultados de busca/loja fictícios + comparação de origem.
- **Carga documental:** **4 conceitos** — 2 na primeira versão, 2 no banco de casos, 0 em versão futura e 0 em debrief.

#### Primeira versão — 2 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:seo-poisoning` | SEO poisoning | Combinação | Combinar | Examinar resultados fictícios e montar a rota para serviço, suporte ou download usando catálogo, favorito ou endereço conhecido. | Reaparece em: Espelho de Página; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

##### Complementar — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:malicious-ad` | Anúncio falso e malvertising | Formato B | Combinar | Distinguir conteúdo e anúncio sem tratá-lo como veredito e obter o recurso pelo canal aprovado; botões concorrentes são inertes. | Reaparece em: Ataque multicanal; Documento inesperado. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 2 conceitos

##### Variação de caso — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:fake-app-developer` | Aplicativo e desenvolvedor imitados | Combinação | Manter | Comparar ficha, editor, finalidade e permissões com o catálogo fictício antes de aceitar uma solicitação de instalação. | Reaparece em: Login verdadeiro, permissão errada; A central que não podia esperar. Aplicação secundária; não altera a propriedade. |
| `concept:fake-update` | Atualização falsa | Combinação | Manter | Comparar aviso em página com manutenção e ferramenta oficial e obter a atualização somente pela origem aprovada, sem download. | Reaparece em: Documento inesperado; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

### 5. Pagamento para quem?

- **Área:** Simulação.
- **Comportamento principal:** Confirmar obrigação, beneficiário e controles pelo processo oficial antes de pagar, liberar ou devolver.
- **Mecânica-base:** estação de processo com cadastro, diretório, conciliação e aprovação.
- **Carga documental:** **12 conceitos** — 5 na primeira versão, 6 no banco de casos, 1 em versão futura e 0 em debrief.

#### Primeira versão — 5 conceitos

##### Núcleo — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:bec` | Business Email Compromise | Formato A | Manter | Conciliar solicitação contextualizada, obrigação autêntica, registro oficial e beneficiário apresentado antes de qualquer liberação, sem presumir que o documento ou a conversa comprovam o vínculo. | Reaparece em: A conversa já estava acontecendo; Pedido urgente de um gestor. Aplicação secundária; não altera a propriedade. |
| `concept:beneficiary-check` | Conferência do beneficiário | Formato B | Manter | Construir o beneficiário esperado a partir de fontes independentes antes de revelar recebedor, valor e instituição apresentados. | Reaparece em: O destino atrás do QR. Aplicação secundária; não altera a propriedade. |

##### Complementar — 3

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:vendor-compromise` | Fornecedor comprometido | Combinação | Combinar | Comparar o recebedor apresentado numa conversa plausível com a relação e os registros oficiais, verificando fora da conversa se existe vínculo antes de qualquer decisão. | Reaparece em: A conversa já estava acontecendo. Aplicação secundária; não altera a propriedade. |
| `concept:fake-receipt` | Comprovante falso | Formato A | Combinar | Comparar comprovante fictício com registro autoritativo cenográfico e distinguir agendado, processando, liquidado e ausente. | Reaparece em: Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:second-approval` | Segunda aprovação e segregação | Combinação | Combinar | Separar confirmação, conferência e aprovação e montar para o segundo papel um pacote fechado de fatos, sem simular colaboração real. | Reaparece em: Pedido urgente de um gestor; Mudança bancária sem atalho, em Equipes. Aplicação secundária; não altera a propriedade. |

#### Banco de casos — 6 conceitos

##### Variação de caso — 6

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:bank-change` | Alteração bancária | Formato A | Manter | Executar a sequência fictícia de suspender, contatar pelo cadastro anterior, validar e obter segunda aprovação, sem atualizar ou pagar de verdade. | Reaparece em: Mudança bancária sem atalho, em Equipes. Aplicação secundária; não altera a propriedade. |
| `concept:invoice-diversion` | Fatura ou nota adulterada | Formato A | Combinar | Conciliar documento sintético com pedido, recebimento, fornecedor e beneficiário; o PDF apenas ordena a revelação e nunca é fonte autoritativa. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:boleto-fraud` | Boleto adulterado | Formato A | Combinar | Localizar obrigação em portal inerte aberto independentemente e comparar valor e beneficiário com um boleto não pagável. | Reaparece em: Documento inesperado; Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:mistaken-pix-return` | Pix “por engano” e falsa devolução | Formato A | Combinar | Consultar extrato fictício e ordenar a devolução pela própria transação ou o contato oficial, bloqueando um novo Pix para terceiro. | Reaparece em: Central de mensagens. Aplicação secundária; não altera a propriedade. |
| `concept:refund-overpayment` | Reembolso, pagamento excedente e cheque aparente | Formato B | Combinar | Triar créditos liquidado, pendente e inexistente e aplicar o processo formal de reembolso sem enviar dinheiro novo. | Reaparece em: Uma manhã comum. Aplicação secundária; não altera a propriedade. |
| `concept:advance-fee` | Taxa antecipada para prêmio, emprego, benefício ou liberação | Formato A | Manter | Decompor promessa, condição, taxa, destinatário e verificabilidade em casos legítimos, suspeitos e inconclusivos. | Reaparece em: Ele já sabia meus dados; Uma manhã comum. Aplicação secundária; não altera a propriedade. |

#### Versão futura — 1 conceito

##### Variação de caso — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:payroll-diversion` | Desvio de folha ou alteração de depósito | Combinação | Adiar | Simular um balcão de RH inerte e uma sequência de alteração sem coletar dados pessoais ou bancários, após procedimento específico ser aprovado. | Reaparece em: O pedido não tinha link. Aplicação secundária; não altera a propriedade. |

### 6. A porta também é um canal

- **Área:** Simulação.
- **Comportamento principal:** Encaminhar pessoa, pergunta ou objeto pelo controle apropriado sem ceder acesso próprio.
- **Mecânica-base:** estação de recepção textual/ilustrada + cadeia de custódia.
- **Carga documental:** **9 conceitos** — 0 na primeira versão, 0 no banco de casos, 9 em versão futura e 0 em debrief.

#### Versão futura — 9 conceitos

##### Núcleo — 1

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:physical-pretexting` | Pretexting presencial | Combinação | Manter | No balcão fictício, o funcionário separa alegação, identidade, necessidade e autorização, escolhe recepção ou segurança e revê as evidências num painel textual. | Reaparece em: O pedido não tinha link. Aplicação secundária; não altera a propriedade. |

##### Complementar — 2

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:physical-impersonation` | Falso funcionário, visitante, técnico ou fornecedor | Formato A | Adaptar | Uma ordem de serviço e um cadastro de visita são comparados antes de qualquer acesso; roupa, crachá, ferramenta e familiaridade não substituem anfitrião e registro. | Reaparece em: Ele já sabia meus dados; Pedido urgente de um gestor. Aplicação secundária; não altera a propriedade. |
| `concept:elicitation` | Elicitation e conversa casual | Combinação | Manter | Uma conversa por camadas permite responder apenas o necessário e encaminhar perguntas; o debrief revela como fragmentos neutros poderiam ser combinados, sem expor estrutura real. | Reaparece em: O pedido não tinha link; Ele já sabia meus dados. Aplicação secundária; não altera a propriedade. |

##### Variação de caso — 6

| `conceptId` | Conceito | Formato | Decisão | Aplicação prevista | Observação de aplicação secundária |
|---|---|---|---|---|---|
| `concept:physical-quid-pro-quo` | Quid pro quo presencial | Combinação | Combinar | Uma oferta de ajuda ou brinde evolui para pedido de acesso; a resposta cordial é seguida por um painel que separa troca social, alçada e processo. | Reaparece em: O pedido não tinha link. Aplicação secundária; não altera a propriedade. |
| `concept:usb-baiting` | Baiting por USB ou mídia encontrada | Combinação | Combinar | Um objeto encontrado é descrito sem conteúdo examinável; a pessoa identifica aparência como evidência insuficiente e o entrega pela cadeia de custódia, sem conectar ou carregar arquivo. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:tailgating` | Tailgating e piggybacking | Combinação | Manter | Uma sequência textual de acesso apresenta visitante com necessidade plausível; o funcionário preserva a própria autenticação e oferece ajuda pela recepção, sem confronto corporal. | Reaparece em: Pedido urgente de um gestor. Aplicação secundária; não altera a propriedade. |
| `concept:shoulder-surfing` | Shoulder surfing | Formato B | Adaptar | Uma rotina em espaço compartilhado é interrompida e o participante escolhe bloquear, cobrir, reposicionar ou procurar apoio conforme o ambiente, sem acusar quem está próximo. | Reaparece em: Você iniciou este acesso?. Aplicação secundária; não altera a propriedade. |
| `concept:dumpster-diving` | Documento ou mídia descartados | Formato A | Combinar | A estação de descarte relaciona categoria fictícia, retenção e destino permitido; a avaliação verifica uso do processo, não a capacidade de adivinhar sensibilidade pela aparência. | Reaparece em: Documento inesperado. Aplicação secundária; não altera a propriedade. |
| `concept:removable-media-custody` | Cadeia de custódia de mídia | Combinação | Manter | A estação registra, em linha temporal textual, a passagem de responsabilidade por uma mídia fictícia sem abrir, conectar, compartilhar ou inspecionar seu conteúdo. | Reaparece em: Documento inesperado; Cliquei. E agora?. Aplicação secundária; não altera a propriedade. |

## Regras preservadas nesta visão

- Cada `conceptId` possui uma única atividade proprietária e uma única linha de inventário.
- Formato, decisão, momento, papel e aplicação prevista foram transpostos dos mapas por conceito sem alteração semântica.
- Aplicações secundárias são apenas observações de reaplicação; não criam segunda propriedade nem aumentam as contagens.
- Banco de casos, versão futura e debrief não são requisitos simultâneos da primeira versão.
- Conceitos invisíveis ou técnicos permanecem explicações de limite quando assim classificados; não viram pegadinhas pontuadas.
- Artefatos permanecem fictícios e inertes, e o backend autoritativo continua obrigatório antes de uso real.
