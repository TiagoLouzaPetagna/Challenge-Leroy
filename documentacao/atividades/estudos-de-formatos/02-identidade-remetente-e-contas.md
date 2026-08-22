# Estudo de formatos — identidade, remetente e contas

> **Estado:** pesquisa; não aprovado para implementação.

Este documento converte todos os conceitos canônicos do conjunto 02 em hipóteses pedagógicas. Identidade apresentada, conta usada, pessoa que controla a conta e autorização do pedido permanecem perguntas separadas; não há definição de atividade, rota, recompensa ou viabilidade técnica.

## Resumo de cobertura

| Conceito | Potencial pedagógico | Papel recomendado |
|---|---|---|
| `concept:identity-display-name` | Alto | caso/atividade |
| `concept:identity-from` | Alto | atividade |
| `concept:identity-reply-to` | Alto | caso/atividade |
| `concept:identity-spoofing` | Controle técnico predominante | explicação de limite/caso |
| `concept:identity-external-marker` | Médio | complementar/transferência |
| `concept:identity-authentication-limits` | Controle técnico predominante | explicação de limite |
| `concept:account-compromise` | Alto | caso transversal |
| `concept:thread-hijacking` | Alto | atividade |
| `concept:thread-fabrication` | Médio | caso de transferência |
| `concept:lateral-phishing` | Alto | caso transversal |
| `concept:cloud-account-abuse` | Alto | caso |
| `concept:spear-phishing` | Alto | caso |
| `concept:whaling` | Médio | caso de função |
| `concept:osint-personalization` | Alto | atividade/caso |
| `concept:leaked-data` | Alto | caso |
| `concept:synthetic-identity` | Médio | caso longitudinal |
| `concept:inbox-manipulation` | Controle técnico predominante | explicação de limite/reporte |

## `concept:identity-display-name` — Nome exibido, foto e cargo

### Ensinamento e papel

- **Comportamento observável:** abrir os detalhes do remetente e separar nome, foto e cargo exibidos da conta que efetivamente enviou a mensagem.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso principal em investigação de identidade.
- A prática é necessária porque a interface dá destaque visual ao nome e pode ocultar o endereço completo; reconhecer a regra em texto não garante que a pessoa procure os detalhes durante uma solicitação plausível.

### Dificuldades e riscos

- Nomes repetidos, contas compartilhadas e sistemas de envio legítimos geram divergências reais.
- Foto, logotipo ou cargo coerentes aumentam plausibilidade, mas não autenticam; a ausência deles também não prova fraude.
- Não avaliar memória sobre colegas nem exigir que a pessoa atribua o controlador real da conta.

### Formato A — Cartão de identidade em camadas

- **Área provável:** PhishLab.
- **Mecânica:** expandir um cartão para relacionar nome exibido, endereço, diretório e contexto.
- **Fluxo:** mensagem → detalhes ocultos → comparação com diretório fictício → conclusão com grau de certeza.
- **O que seria avaliado:** abrir os detalhes e descrever corretamente o que cada camada demonstra.
- **Alternativa acessível:** tabela linear com rótulos explícitos, foco por teclado e nenhuma dependência de foto ou cor.

### Formato B — Dois Alex, um pedido

- **Área provável:** Missão.
- **Mecânica:** escolher uma rota de confirmação quando duas identidades plausíveis compartilham o mesmo nome.
- **Fluxo:** pedido → busca no diretório → seleção do contato anterior → confirmação ou reporte.
- **O que seria avaliado:** não responder ao identificador apresentado apenas por familiaridade visual.
- **Alternativa acessível:** lista pesquisável e botões de ação, sem arraste.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** cartão de identidade em camadas; reutilizar o componente de mapa de identidade.
- Permanecem pendentes convenções fictícias de diretório e quais detalhes o correio corporativo exibirá; futuramente, verificar se a interface pode representar contas intermediárias sem copiar produto real.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [Microsoft Support — Phishing and suspicious behavior in Outlook](https://support.microsoft.com/en-US/Outlook/mail/phishing-and-suspicious-behavior-in-outlook)

## `concept:identity-from` — Endereço completo e campo `From`

### Ensinamento e papel

- **Comportamento observável:** localizar o endereço completo declarado no campo `From`, compará-lo com a identidade alegada e evitar inferir quem controla a conta.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de investigação e fundamento do mapa de remetente.
- Texto isolado não ensina a pessoa a encontrar o campo em meio a nomes, avatares e interfaces diferentes nem a registrar uma conclusão limitada.

### Dificuldades e riscos

- Um endereço diferente pode pertencer a plataforma, lista, assessoria ou fornecedor legítimo.
- Um endereço correto pode estar comprometido ou ter sido falsificado; “igual” e “diferente” não são vereditos.
- Não exigir leitura de cabeçalho bruto nem de `Return-Path`.

### Formato A — Mapa de quem declarou o quê

- **Área provável:** PhishLab.
- **Mecânica:** conectar identidade alegada, nome exibido e `From` a afirmações como “conta declarada” e “controle não comprovado”.
- **Fluxo:** abrir detalhes → formar conexões → escolher conclusão → receber debrief.
- **O que seria avaliado:** leitura correta do endereço e linguagem sem certeza indevida.
- **Alternativa acessível:** relações feitas por seletores em tabela, não por linhas arrastáveis.

### Formato B — Conferência antes de responder

- **Área provável:** Missão.
- **Mecânica:** consultar um registro anterior e decidir entre responder, confirmar por outra rota ou reportar.
- **Fluxo:** pedido novo → consulta ao histórico fictício → comparação do `From` → ação proporcional.
- **O que seria avaliado:** uso do endereço como uma evidência entre várias e escolha de canal independente quando necessário.
- **Alternativa acessível:** histórico textual cronológico com navegação por cabeçalhos.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mapa de quem declarou o quê; compartilhar detalhes de remetente com `Reply-To`.
- Definir editorialmente exemplos legítimos de intermediários e, depois, testar como tornar o endereço completo visível sem simular um cliente específico.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [NIST — Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851)

## `concept:identity-reply-to` — `Reply-To` diferente

### Ensinamento e papel

- **Comportamento observável:** verificar para onde uma resposta será enviada e, se houver divergência relevante, confirmar o processo sem classificar automaticamente a mensagem como fraude.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso investigativo com usos legítimos e maliciosos.
- A diferença só se torna ensinável quando aparece junto de propósito, histórico e rota de resposta; uma regra textual “`Reply-To` diferente é golpe” seria falsa.

### Dificuldades e riscos

- Plataformas de chamados, campanhas, formulários e listas usam `Reply-To` diferente de modo legítimo.
- Algumas interfaces não mostram o campo antes da resposta.
- A atividade não deve pedir análise de sintaxe de cabeçalho nem premiar rejeição automática.

### Formato A — Prévia do destino da resposta

- **Área provável:** PhishLab.
- **Mecânica:** abrir uma prévia inerte de resposta e comparar `From`, `Reply-To` e processo esperado.
- **Fluxo:** mensagem → detalhes → prévia → consulta de contexto → decisão.
- **O que seria avaliado:** percepção do destino e uso de evidência adicional antes de responder.
- **Alternativa acessível:** todos os campos em tabela rotulada, sem depender de posição visual.

### Formato B — Central ou pessoa?

- **Área provável:** Missão.
- **Mecânica:** classificar vários pares `From`/`Reply-To` como explicáveis, exigindo confirmação ou inconclusivos.
- **Fluxo:** casos curtos → escolha de hipótese → seleção de próximo passo → revelação do contexto.
- **O que seria avaliado:** tolerância a intermediários legítimos e escalada proporcional.
- **Alternativa acessível:** cartões em lista com radios e justificativas textuais.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** prévia do destino; reutilizar o mapa de identidade e manter ao menos um caso legítimo.
- A política sobre quais plataformas corporativas podem intermediar respostas precisa ser decidida antes do conteúdo final.

### Fontes

- [FBI — Business Email Compromise: The $26 Billion Scam](https://www.ic3.gov/PSA/2019/PSA190910)
- [NIST — Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851)

## `concept:identity-spoofing` — Spoofing do remetente

### Ensinamento e papel

- **Comportamento observável:** explicar que um campo pode aparentar um endereço legítimo sem provar sua origem e encaminhar dúvida pelo processo, sem tentar diagnosticar spoofing sozinho.
- **Potencial pedagógico:** Controle técnico predominante; **papel recomendado:** explicação de limite acompanhada de um caso de decisão.
- O resultado de autenticação e o caminho real da mensagem pertencem à infraestrutura; pedir que o usuário “encontre o spoofing” em uma tela comum criaria falsa perícia.

### Dificuldades e riscos

- Spoofing de campo, domínio parecido e conta comprometida são mecanismos diferentes com aparência semelhante.
- Um endereço visualmente correto não permite concluir falsificação; um aviso do cliente pode ter falso positivo.
- A camada humana continua responsável por pedido e processo, não por substituir DMARC ou investigação de logs.

### Formato A — O que a tela não prova

- **Área provável:** PhishLab.
- **Mecânica:** classificar conclusões possíveis e impossíveis a partir da mesma visualização de mensagem.
- **Fluxo:** tela comum → hipóteses → limite técnico revelado → escolha de verificação segura.
- **O que seria avaliado:** não afirmar autoria nem autenticação com base no campo visível.
- **Alternativa acessível:** matriz textual “evidência / permite concluir / não permite concluir”.

### Formato B — Três origens, mesma aparência

- **Área provável:** Missão explicativa.
- **Mecânica:** acompanhar três narrativas reveladas pelo debrief — spoofing, domínio parecido e conta comprometida — que exigem o mesmo cuidado de processo.
- **Fluxo:** pedido idêntico → decisão segura → revelação técnica → comparação das causas.
- **O que seria avaliado:** comportamento preservado apesar de a causa não ser observável.
- **Alternativa acessível:** narrativas sequenciais com resumo em tabela.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** o que a tela não prova; reutilizar matriz de limites.
- A revisão técnica futura deve validar terminologia e decidir quanto de autenticação de e-mail cabe no debrief, sem transformar cabeçalho em pista obrigatória.

### Fontes

- [CISA — Domain-Based Message Authentication, Reporting and Conformance](https://www.cisa.gov/sites/default/files/publications/cisa-dmarc.pdf)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:identity-external-marker` — Aviso de remetente externo ou não verificado

### Ensinamento e papel

- **Comportamento observável:** considerar o marcador como sinal contextual e continuar avaliando pedido, relação e processo, sem tratá-lo como veredito.
- **Potencial pedagógico:** Médio; **papel recomendado:** complemento recorrente e caso curto de transferência.
- A comparação prática evita dois erros simétricos: ignorar o aviso e rejeitar toda mensagem externa.

### Dificuldades e riscos

- Fornecedores legítimos são externos e contas internas comprometidas podem não receber o marcador.
- Marcadores variam por ferramenta e configuração; cor e ícone não podem ser a única pista.
- O conteúdo não deve prometer que todos os clientes exibem o mesmo rótulo.

### Formato A — Evidência com peso, não carimbo

- **Área provável:** PhishLab.
- **Mecânica:** posicionar o marcador numa escala de força probatória ao lado de contexto, cadastro e confirmação independente.
- **Fluxo:** caso → seleção do que o aviso demonstra → decisão → contraste com conta interna comprometida.
- **O que seria avaliado:** uso não absoluto do aviso.
- **Alternativa acessível:** escala com opções nomeadas e explicação textual, sem cor.

### Formato B — Caixa mista de parceiros

- **Área provável:** Simulação.
- **Mecânica:** triar mensagens externas legítimas, suspeitas e inconclusivas com a mesma faixa de aviso.
- **Fluxo:** lote → consulta a contexto → ação por item → revisão dos falsos positivos.
- **O que seria avaliado:** investigar a solicitação, não o rótulo isolado.
- **Alternativa acessível:** lista paginada e ações por teclado, sem limite de tempo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** caixa mista; reutilizar o componente de triagem.
- Definir um marcador fictício e textual; a futura análise deve verificar se ele será suficientemente distinto sem copiar uma suíte específica.

### Fontes

- [CISA — StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide)
- [Microsoft Support — Phishing and suspicious behavior in Outlook](https://support.microsoft.com/en-US/Outlook/mail/phishing-and-suspicious-behavior-in-outlook)

## `concept:identity-authentication-limits` — Limites de SPF, DKIM e DMARC

### Ensinamento e papel

- **Comportamento observável:** descrever que autenticação de domínio ajuda filtros e servidores, mas não prova a autorização humana do pedido; manter a verificação do processo.
- **Potencial pedagógico:** Controle técnico predominante; **papel recomendado:** explicação interativa de limite, não atividade de detecção.
- A configuração e a interpretação completa pertencem a administradores; exigir leitura de `pass`/`fail` ou cabeçalhos do funcionário deslocaria a responsabilidade técnica.

### Dificuldades e riscos

- Uma mensagem autenticada pode vir de conta ou serviço legítimo abusado; falhas podem decorrer de encaminhamento ou configuração.
- DMARC reduz spoofing de domínios protegidos, mas não elimina domínios parecidos, contas comprometidas ou fraude de processo.
- Não ensinar “DMARC passou, então confie” nem “falhou, então bloqueie”.

### Formato A — Camadas de proteção

- **Área provável:** PhishLab explicativo.
- **Mecânica:** revelar o que filtro, autenticação, interface e processo humano cobrem e deixam de cobrir.
- **Fluxo:** mensagem → quatro camadas → cenários que atravessam cada uma → síntese.
- **O que seria avaliado:** atribuir corretamente responsabilidade e limite, sem interpretar cabeçalho real.
- **Alternativa acessível:** tabela de camadas com descrições completas.

### Formato B — Autenticado, mas não autorizado

- **Área provável:** Missão curta.
- **Mecânica:** decidir sobre um pedido enviado por serviço legítimo e autenticado, porém fora do processo.
- **Fluxo:** selo técnico explicado → pedido sensível → consulta ao processo → confirmação independente.
- **O que seria avaliado:** não transformar autenticação do domínio em autorização da ação.
- **Alternativa acessível:** narrativa textual sem jargão obrigatório e glossário opcional.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** camadas de proteção; reutilizar a matriz “protege / não protege”.
- O debrief precisa de revisão por segurança de e-mail; futuramente, decidir se a sigla aparece no núcleo ou apenas no aprofundamento.

### Fontes

- [CISA — Domain-Based Message Authentication, Reporting and Conformance](https://www.cisa.gov/sites/default/files/publications/cisa-dmarc.pdf)
- [CISA — StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:account-compromise` — Conta legítima comprometida

### Ensinamento e papel

- **Comportamento observável:** reconhecer mudança de comportamento ou processo mesmo quando o endereço está correto e confirmar a solicitação fora da conversa afetada.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso transversal e causa principal de “A conversa já estava acontecendo”.
- A atividade deve deslocar atenção da aparência para a mudança observável e permitir que o aluno aja sem precisar provar o comprometimento.

### Dificuldades e riscos

- Mudanças legítimas acontecem e nenhum desvio isolado diagnostica invasão.
- O titular real pode continuar usando a conta simultaneamente; confirmar respondendo na mesma conversa não é independente.
- Não atribuir culpa ao titular nem pedir análise de login ao usuário final.

### Formato A — Antes e depois da conversa

- **Área provável:** Missão.
- **Mecânica:** reconstruir a linha temporal e marcar a primeira mudança relevante de pedido, destino ou processo.
- **Fluxo:** mensagens anteriores → nova solicitação → evidências → canal independente → conclusão inconclusiva ou escalada.
- **O que seria avaliado:** localizar a mudança e escolher confirmação fora do possível canal comprometido.
- **Alternativa acessível:** linha temporal em lista numerada com controles de seleção.

### Formato B — Conta correta, quatro decisões

- **Área provável:** Simulação.
- **Mecânica:** lidar com pedidos sucessivos de uma conta conhecida, incluindo alteração legítima e abuso.
- **Fluxo:** lote de solicitações → consulta a processo → resposta/pausa/reporte → debrief por decisão.
- **O que seria avaliado:** consistência de processo sem rejeição automática da conta.
- **Alternativa acessível:** tabela cronológica e ações textuais, sem temporizador.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** antes e depois; reutilizar linha temporal e diretório de confirmação.
- Definir quais mudanças são relevantes ao processo fictício e, futuramente, como representar conversa realista sem dados de pessoa real.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [Microsoft Learn — Respond to a compromised email account](https://learn.microsoft.com/en-us/defender-office-365/responding-to-a-compromised-email-account)

## `concept:thread-hijacking` — Sequestro de conversa existente

### Ensinamento e papel

- **Comportamento observável:** identificar quando uma conversa autêntica passa a pedir nova ação, beneficiário, segredo ou exceção e confirmar por canal independente.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade própria de reconstrução de conversa.
- A sequência é essencial: o ensinamento depende de perceber uma ruptura dentro de contexto verdadeiro, não de caçar erros numa mensagem isolada.

### Dificuldades e riscos

- Pessoas reais mudam de assunto, tom e prazo; a ruptura é motivo para verificar, não prova de ataque.
- Citar detalhes anteriores pode ser compatível tanto com participante legítimo quanto com invasor que leu a caixa.
- Evitar uma única “frase mágica” repetida em todos os casos.

### Formato A — A conversa já estava acontecendo

- **Área provável:** Missão.
- **Mecânica:** ordenar mensagens, marcar a mudança e prender evidências antes de selecionar a próxima ação.
- **Fluxo:** reconstrução → ponto de ruptura → painel de evidências → confirmação independente → debrief.
- **O que seria avaliado:** mudança relevante e resposta de processo, não diagnóstico do invasor.
- **Alternativa acessível:** ordenação por botões e linha do tempo textual numerada.

### Formato B — Bifurcação de processo

- **Área provável:** PhishLab.
- **Mecânica:** comparar a conversa com o fluxo esperado de compra, RH ou suporte.
- **Fluxo:** histórico → mapa do processo → identificação da etapa desviada → escolha de escalada.
- **O que seria avaliado:** distinguir continuidade textual de continuidade operacional.
- **Alternativa acessível:** duas listas paralelas com cabeçalhos e resumo sequencial.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** reconstrução da conversa; reutilizar linha temporal e painel de evidências.
- O processo de referência e o contato independente exigem definição corporativa antes do conteúdo definitivo.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [Microsoft — File hosting services misused for identity phishing](https://www.microsoft.com/en-us/security/blog/2024/10/08/file-hosting-services-misused-for-identity-phishing/)

## `concept:thread-fabrication` — Conversa ou histórico fabricado

### Ensinamento e papel

- **Comportamento observável:** tratar `Re:`, texto citado, assinaturas e supostas mensagens anteriores como conteúdo copiável e buscar o histórico real ou o processo oficial.
- **Potencial pedagógico:** Médio; **papel recomendado:** caso de transferência após thread hijacking.
- A comparação prática mostra que aparência de continuidade não é o mesmo que registro existente na caixa ou no sistema.

### Dificuldades e riscos

- Migrações, encaminhamentos e cópias legítimas podem criar histórico parcial.
- Ausência de conversa local não prova fabricação; o funcionário pode não ter participado das mensagens anteriores.
- Não ensinar formatação ou pequenos desalinhamentos como detector confiável.

### Formato A — Histórico citado versus histórico localizado

- **Área provável:** PhishLab.
- **Mecânica:** comparar o bloco citado no corpo com registros fictícios encontrados por busca.
- **Fluxo:** mensagem → busca por assunto/participantes → diferenças substantivas → próximo passo.
- **O que seria avaliado:** procurar fonte independente e manter conclusão proporcional.
- **Alternativa acessível:** comparação textual com diferenças descritas, não apenas destacadas por cor.

### Formato B — O `Re:` não cria passado

- **Área provável:** Simulação curta.
- **Mecânica:** triar mensagens com `Re:` legítimo, encaminhado e inventado usando contexto e processo.
- **Fluxo:** três casos → hipótese → ação segura → revelação da origem.
- **O que seria avaliado:** não usar prefixo ou assinatura como prova de conversa anterior.
- **Alternativa acessível:** cartões em lista com rótulos completos.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** histórico citado versus localizado; reutilizar busca e comparação.
- Definir casos em que a ausência de registro é legitimamente inconclusiva; futuramente, testar legibilidade de conversas longas.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [NIST — Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851)

## `concept:lateral-phishing` — Phishing interno ou lateral

### Ensinamento e papel

- **Comportamento observável:** aplicar a mesma verificação a pedidos sensíveis vindos de conta interna e reportar cedo para proteger outros destinatários.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso transversal entre identidade, triagem e proteção coletiva.
- Uma atividade permite experimentar a tensão entre confiança organizacional e mudança de comportamento sem transformar “interno” em “seguro” ou “suspeito”.

### Dificuldades e riscos

- Mensagens internas são majoritariamente legítimas e não devem ser tratadas como ameaça por padrão.
- O usuário não tem telemetria para provar tomada de conta.
- Reportar não deve expor publicamente ou culpar a pessoa cujo endereço foi usado.

### Formato A — O pedido veio de dentro

- **Área provável:** Missão.
- **Mecânica:** investigar uma solicitação interna inesperada e escolher confirmação e reporte discretos.
- **Fluxo:** mensagem interna → consulta de contexto → contato conhecido → reporte sem acusação.
- **O que seria avaliado:** manter o processo e usar linguagem de possibilidade.
- **Alternativa acessível:** diálogo textual e diretório navegável por teclado.

### Formato B — Propagação interrompida

- **Área provável:** Simulação.
- **Mecânica:** observar destinatários e decidir quando um reporte pode permitir bloqueio coletivo, sem enviar alerta real.
- **Fluxo:** primeiro caso → decisão → mapa fictício de alcance → consequência explicada.
- **O que seria avaliado:** reporte precoce e contenção pelo canal oficial.
- **Alternativa acessível:** mapa convertido em lista de destinatários e eventos.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** o pedido veio de dentro; reutilizar confirmação e reporte.
- A linguagem de reporte e a representação de alcance precisam de validação corporativa; a viabilidade futura deve evitar qualquer mensagem real.

### Fontes

- [Microsoft Learn — Address compromised user accounts](https://learn.microsoft.com/en-us/defender-office-365/address-compromised-users-quickly)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:cloud-account-abuse` — Conta ou serviço legítimo de nuvem abusado

### Ensinamento e papel

- **Comportamento observável:** separar plataforma que enviou a notificação, conta que compartilhou, arquivo hospedado e destino final; reabrir o serviço por rota conhecida quando necessário.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso investigativo entre identidade, arquivos e links.
- A cadeia de confiança precisa ser manipulada para mostrar que domínio e notificação legítimos não autenticam o conteúdo nem a intenção do compartilhamento.

### Dificuldades e riscos

- Compartilhamentos legítimos costumam chegar inesperadamente por notificações automáticas.
- O serviço pode autenticar corretamente a própria mensagem, enquanto a conta ou o arquivo foi abusado.
- Não ensinar bloqueio de marcas, nuvens ou OTP legítimos.

### Formato A — Quem controla cada etapa?

- **Área provável:** PhishLab.
- **Mecânica:** formar um mapa de plataforma, compartilhador, arquivo, link interno e destino externo.
- **Fluxo:** notificação → expansão da cadeia → atribuição limitada → ação segura.
- **O que seria avaliado:** distinguir cada papel e não transferir confiança entre etapas.
- **Alternativa acessível:** tabela hierárquica com relações descritas.

### Formato B — Abrir pela biblioteca

- **Área provável:** Missão.
- **Mecânica:** abandonar a notificação e procurar o compartilhamento numa biblioteca fictícia aberta independentemente.
- **Fluxo:** convite → rota conhecida → item existente ou ausente → confirmar/reportar.
- **O que seria avaliado:** reconstruir navegação segura e responder proporcionalmente à incerteza.
- **Alternativa acessível:** árvore textual de pastas e busca por teclado.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mapa da cadeia; reutilizar componentes de identidade e URL.
- Marcas e telas devem ser fictícias; futuramente, verificar se a biblioteca simulada comunica a rota independente sem imitar produto real.

### Fontes

- [Microsoft — File hosting services misused for identity phishing](https://www.microsoft.com/en-us/security/blog/2024/10/08/file-hosting-services-misused-for-identity-phishing/)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:spear-phishing` — Phishing direcionado

### Ensinamento e papel

- **Comportamento observável:** reconhecer que cargo, projeto e rotina corretos aumentam plausibilidade, mas ainda confirmar identidade, autorização e processo antes de agir.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso personalizado sem usar dados reais do aluno.
- A prática revela como várias informações verdadeiras podem sustentar uma conclusão falsa; uma definição textual não treina essa separação.

### Dificuldades e riscos

- Personalização também é normal em comunicações legítimas.
- Não coletar nem expor dados reais do funcionário para “tornar a simulação convincente”.
- Evitar avaliar a capacidade de detectar uma mensagem perfeita; avaliar o processo diante de ação sensível.

### Formato A — Dossiê de plausibilidade

- **Área provável:** PhishLab.
- **Mecânica:** marcar quais detalhes poderiam vir de fontes públicas e quais ainda precisariam de confirmação.
- **Fluxo:** mensagem direcionada → painel de detalhes → origem provável → decisão segura.
- **O que seria avaliado:** não confundir conhecimento do contexto com autenticação.
- **Alternativa acessível:** tabela de fatos e inferências, sem imagens obrigatórias.

### Formato B — Mesmo pedido, três graus de contexto

- **Área provável:** Simulação.
- **Mecânica:** comparar versões genérica, personalizada e legítima do mesmo pedido.
- **Fluxo:** casos → ação escolhida → processo consultado → contraste de resultados.
- **O que seria avaliado:** comportamento consistente apesar da persuasão crescente.
- **Alternativa acessível:** versões textuais apresentadas sequencialmente, sem limite de tempo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** dossiê de plausibilidade; reutilizar painel de evidências.
- O conteúdo deve usar organização e pessoas fictícias; futuramente, testar se a personalização é clara sem recorrer a dados do perfil real.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [NIST — Spear phishing glossary](https://csrc.nist.gov/glossary/term/spear_phishing)

## `concept:whaling` — Phishing contra lideranças e funções de alto valor

### Ensinamento e papel

- **Comportamento observável:** manter confirmações, alçadas e apoio especializado quando o alvo ou o suposto remetente ocupa posição de alta autoridade.
- **Potencial pedagógico:** Médio como atividade própria, alto como caso de função; **papel recomendado:** transferência para liderança, assessoria e áreas críticas.
- O caso praticado permite ensaiar uma pausa profissional sem sugerir que executivos “deveriam reconhecer” ataques mais sofisticados.

### Dificuldades e riscos

- Não estigmatizar cargos nem divulgar rotinas reais de liderança.
- Autoridade legítima e risco elevado coexistem; a resposta correta não é desobedecer, mas preservar o processo.
- O treinamento geral não substitui apoio específico para funções expostas.

### Formato A — Agenda de alto impacto

- **Área provável:** Missão de função.
- **Mecânica:** priorizar solicitações dirigidas a uma liderança segundo ativo, autorização e canal de confirmação.
- **Fluxo:** agenda fictícia → pedido sensível → consulta de assessoria/processo → ação.
- **O que seria avaliado:** aplicação proporcional de controle sob pressão hierárquica.
- **Alternativa acessível:** lista de agenda e decisões por botões.

### Formato B — Assessoria como barreira

- **Área provável:** Simulação de conversa.
- **Mecânica:** montar uma resposta e acionar uma rota de apoio diante de pedido confidencial personalizado.
- **Fluxo:** contato → identificação do ativo → frase de limite → confirmação independente.
- **O que seria avaliado:** comunicação segura e não contorno de controles.
- **Alternativa acessível:** diálogo integralmente textual, sem voz ou vídeo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** assessoria como barreira; reutilizar resposta profissional e diretório.
- Liderança, RH e segurança precisam aprovar cenários e linguagem; futuramente, decidir se haverá trilha por função sem revelar estrutura real.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)

## `concept:osint-personalization` — OSINT, pegada digital e organograma

### Ensinamento e papel

- **Comportamento observável:** identificar como informações públicas podem sustentar um pretexto e reduzir exposição desnecessária sem culpabilizar a pessoa por ter presença digital.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de modelo mental e complemento de spear phishing.
- Um exercício torna visível a montagem do pretexto a partir de fragmentos públicos e permite praticar minimização e verificação.

### Dificuldades e riscos

- Muitas informações são publicadas legitimamente para trabalho, transparência ou carreira.
- Não pesquisar participantes reais nem reproduzir perfis, parentes, agenda ou localização.
- O objetivo não é desaparecer da internet, e sim entender o uso adversarial e seguir política de exposição.

### Formato A — Monte o pretexto defensivamente

- **Área provável:** PhishLab.
- **Mecânica:** combinar cartões fictícios de site, vaga, rede social e evento para prever pretextos possíveis.
- **Fluxo:** fontes públicas → combinações → risco criado → ajuste de publicação/verificação.
- **O que seria avaliado:** reconhecer a cadeia de inferência e propor proteção proporcional.
- **Alternativa acessível:** seleção por checkboxes e resumo textual, sem arraste.

### Formato B — Revisão de pegada por função

- **Área provável:** Missão reflexiva.
- **Mecânica:** revisar um perfil totalmente fictício e decidir o que manter, generalizar ou encaminhar para política.
- **Fluxo:** perfil → finalidade de cada dado → risco de abuso → decisão justificada.
- **O que seria avaliado:** equilíbrio entre utilidade e exposição, não remoção indiscriminada.
- **Alternativa acessível:** formulário estruturado com explicações.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** monte o pretexto defensivamente; reutilizar cartões de evidência.
- Definir política fictícia/organizacional de publicação e garantir que nenhuma integração busque dados reais; essa proteção deve ser confirmada na análise futura.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)

## `concept:leaked-data` — Dados vazados usados como credibilidade

### Ensinamento e papel

- **Comportamento observável:** tratar nome, documento, endereço, pedido ou fornecedor corretos como dados possivelmente obtidos fora do contato e confirmar por canal oficial.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso recorrente em identidade, suporte e pagamento.
- A atividade deve criar o choque controlado de “todos os dados estão certos” e ainda oferecer um comportamento seguro que não dependa de descobrir a origem do vazamento.

### Dificuldades e riscos

- Dados corretos podem vir de relação legítima, fonte pública ou vazamento; o usuário raramente sabe qual.
- Não usar CPF, telefone, endereço ou pedidos reais de participantes.
- Conhecer um dado não prova que o contato controla a organização, mas também não prova crime.

### Formato A — Ele já sabia meus dados

- **Área provável:** Missão.
- **Mecânica:** separar dados conhecidos de provas de autorização e escolher uma confirmação independente.
- **Fluxo:** contato altamente personalizado → inventário de dados → classificação de valor probatório → ação.
- **O que seria avaliado:** não transferir confiança do dado correto para o pedido.
- **Alternativa acessível:** tabela com categorias e descrições mascaradas.

### Formato B — Vazamento ou cadastro?

- **Área provável:** PhishLab.
- **Mecânica:** trabalhar com hipóteses concorrentes sem precisar decidir qual é verdadeira.
- **Fluxo:** evidências → três origens possíveis → conclusão “não determina” → verificação do processo.
- **O que seria avaliado:** raciocínio sob incerteza e proteção do próximo dado solicitado.
- **Alternativa acessível:** árvore de hipóteses em lista linear.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** ele já sabia meus dados; reutilizar inventário de evidências.
- Editorial deve definir exemplos fictícios e mascarados; futuramente, verificar que nenhum campo solicita dado pessoal real.

### Fontes

- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)
- [FBI — Generative AI increases financial fraud](https://www.ic3.gov/PSA/2024/PSA241203)

## `concept:synthetic-identity` — Identidade sintética e perfil composto

### Ensinamento e papel

- **Comportamento observável:** verificar pessoa e autorização por registros e contatos anteriores, sem aceitar coerência de perfil, documentos isolados ou longa presença online como prova suficiente.
- **Potencial pedagógico:** Médio; **papel recomendado:** caso longitudinal e explicação de limite.
- O valor pedagógico está na construção gradual de confiança; uma definição curta pode induzir o usuário a procurar “perfil falso” por aparência.

### Dificuldades e riscos

- O termo tem uso específico em fraude financeira; no portal, deve ser explicado como composição de dados reais e fictícios sem ampliar indevidamente a definição.
- Pessoas reais podem ter histórico curto, nomes diferentes ou poucos vínculos; isso não deve gerar suspeita discriminatória.
- O usuário não deve autenticar documentos nem investigar identidade civil por conta própria.

### Formato A — Perfil que cresce com o tempo

- **Área provável:** Missão longitudinal.
- **Mecânica:** acompanhar contatos e promessas que acumulam coerência até surgir ação sensível.
- **Fluxo:** primeiro contato → sinais sociais → pedido → consulta a processo/registro independente → decisão.
- **O que seria avaliado:** não transformar investimento de tempo em autenticação.
- **Alternativa acessível:** diário cronológico textual, sem imagens de pessoas.

### Formato B — Peças verdadeiras, conclusão não provada

- **Área provável:** PhishLab.
- **Mecânica:** classificar elementos de um perfil composto conforme o que podem e não podem demonstrar.
- **Fluxo:** cartões de dados → mapa de inferências → limite → escolha de verificação.
- **O que seria avaliado:** evitar inferências sobre identidade a partir de coerência superficial.
- **Alternativa acessível:** tabela de evidências e inferências.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** perfil que cresce com o tempo; reutilizar diário e matriz de limites.
- Revisão jurídica/editorial deve fixar a terminologia e evitar viés; futuramente, testar se o caso ensina processo sem pedir julgamento de aparência ou origem.

### Fontes

- [Federal Reserve — Synthetic identity payments fraud](https://www.federalreserve.gov/newsevents/pressreleases/other20190709a.htm)
- [FTC — How to recognize and avoid phishing scams](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams)

## `concept:inbox-manipulation` — Regras maliciosas de encaminhamento e ocultação

### Ensinamento e papel

- **Comportamento observável:** ao notar respostas sumidas, mensagens movidas ou encaminhamento desconhecido, preservar fatos e reportar; não tentar concluir sozinho que existe comprometimento.
- **Potencial pedagógico:** Controle técnico predominante; **papel recomendado:** explicação de limite e caso de reporte após conta comprometida.
- A detecção confiável exige alertas, auditoria e revisão administrativa; o usuário pode relatar anomalias observadas, mas não substituir essa investigação.

### Dificuldades e riscos

- Regras legítimas, filtros antispam, delegação e sincronização podem produzir os mesmos sintomas.
- Pedir que o usuário procure e apague regras pode destruir contexto ou exceder sua permissão.
- Uma mudança de senha isolada pode não resolver sessões, permissões ou regras; a resposta depende do ambiente.

### Formato A — Sintoma não é diagnóstico

- **Área provável:** PhishLab explicativo.
- **Mecânica:** relacionar sintomas observáveis a várias causas possíveis e ao mesmo comportamento de reporte.
- **Fluxo:** mensagem desaparecida → hipóteses legítimas/maliciosas → fatos preserváveis → canal oficial.
- **O que seria avaliado:** descrição factual e ausência de remediação improvisada.
- **Alternativa acessível:** tabela “observei / pode significar / próximo passo”.

### Formato B — Bastidores da caixa comprometida

- **Área provável:** Missão de debrief.
- **Mecânica:** depois de uma decisão segura, revelar uma visão administrativa fictícia de regra maliciosa e contrastá-la com o que o usuário conseguia ver.
- **Fluxo:** anomalia → reporte → investigação simulada da equipe → explicação de contenção.
- **O que seria avaliado:** reporte útil, não identificação da regra.
- **Alternativa acessível:** relato cronológico da investigação, sem diagrama obrigatório.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** sintoma não é diagnóstico; reutilizar construtor de reporte.
- O procedimento corporativo e a fronteira entre ação do usuário e da equipe precisam ser aprovados; futuramente, decidir se a visão administrativa aparece apenas no debrief.

### Fontes

- [Microsoft Learn — Alert classification for suspicious inbox manipulation rules](https://learn.microsoft.com/en-us/defender-xdr/alert-grading-playbook-inbox-manipulation-rules)
- [Microsoft Learn — Respond to a compromised email account](https://learn.microsoft.com/en-us/defender-office-365/responding-to-a-compromised-email-account)
