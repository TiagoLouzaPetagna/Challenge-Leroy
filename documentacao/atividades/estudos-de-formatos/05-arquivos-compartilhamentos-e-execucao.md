# Estudo de formatos — Arquivos, compartilhamentos e execução

> **Estado:** pesquisa; não aprovado para implementação.

## `concept:unexpected-attachment` — Anexo inesperado

### Ensinamento e papel

- **Comportamento observável:** interromper a abertura, relacionar o arquivo a uma tarefa esperada, conferir remetente e necessidade por uma referência conhecida e decidir entre prosseguir, verificar ou reportar.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria ou comportamento principal de **Documento inesperado**.
- **Por que não basta uma explicação textual:** a dificuldade está em dosar investigação e ação diante de anexos legítimos, maliciosos e inconclusivos, não em repetir “não abra anexos”.

### Dificuldades e riscos

- “Inesperado” depende da rotina e não equivale a malicioso.
- Um remetente conhecido pode estar comprometido, enquanto um novo fornecedor pode ser legítimo.
- Classificar todo arquivo como fraude produziria falsos positivos e prejudicaria o trabalho.
- O exercício precisa oferecer uma confirmação independente realista, mas inteiramente simulada.

### Formato A — Estação de contexto

- **Área provável:** Missão.
- **Mecânica:** comparar o anexo com agenda, pedido, chamado e histórico fictícios antes de escolher uma ação.
- **Fluxo:** mensagem recebida → consulta seletiva às fontes → confirmação por contato conhecido → decisão e debrief.
- **O que seria avaliado:** interrupção inicial, pertinência das fontes consultadas, confirmação independente e decisão proporcional.
- **Alternativa acessível:** fontes abertas por botões e apresentadas numa lista estruturada, sem arrastar.

### Formato B — Caixa de exceções

- **Área provável:** Simulação.
- **Mecânica:** triar vários arquivos entre “esperado”, “precisa confirmar” e “reportar”, podendo rever itens inconclusivos.
- **Fluxo:** lote misto → primeira triagem → investigação apenas quando necessária → resolução → debrief final sem pistas antecipadas.
- **O que seria avaliado:** tratamento correto dos inconclusivos, ausência de abertura precipitada e controle de falsos positivos.
- **Alternativa acessível:** seleção por rádio e navegação por lista com estados textuais.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Estação de contexto, porque torna processo e expectativa observáveis.
- Reutilizações possíveis devem ser estudadas depois em relação a painel de evidências, confirmação simulada e reporte.
- A curadoria precisará definir quais documentos e tarefas são normais para cada persona fictícia.
- A futura análise deve decidir como representar “abrir” sem gerar download ou arquivo real.

### Fontes

- [MITRE ATT&CK — Spearphishing Attachment](https://attack.mitre.org/techniques/T1566/001/)
- [NCSC — Identifying and reporting a suspected phishing email: micro exercise](https://www.ncsc.gov.uk/files/identifying-and-reporting-a-suspected-phishing-email-micro-exercise.pdf)

## `concept:file-format-variety` — Variedade de formatos de arquivo

### Ensinamento e papel

- **Comportamento observável:** avaliar contexto, origem e comportamento solicitado sem concluir segurança ou perigo apenas pela extensão.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e conjunto de casos rotativos.
- **Por que não basta uma explicação textual:** é útil ver que formatos visualmente familiares podem abrir links, executar conteúdo ou apenas exibir informação, mas não faz sentido memorizar uma blacklist extensa.

### Dificuldades e riscos

- Office, PDF, HTML, SVG, OneNote, atalhos e imagens de disco possuem usos legítimos.
- Risco de ensinar que uma extensão específica é sempre perigosa ou que outra é sempre segura.
- Alguns comportamentos só são confirmados por endpoint ou sandbox.
- O nível de detalhe precisa caber no papel do funcionário, não no de analista de malware.

### Formato A — Famílias de comportamento

- **Área provável:** PhishLab.
- **Mecânica:** relacionar representações inertes de arquivos a capacidades amplas: “somente conteúdo”, “pode levar a outro destino”, “pode solicitar execução” ou “informação insuficiente”.
- **Fluxo:** demonstração de uma família → classificação assistida → casos legítimo e suspeito → explicação dos limites.
- **O que seria avaliado:** busca de contexto e reconhecimento de que formato isolado não autoriza interação.
- **Alternativa acessível:** tabela com seleção por linha e descrições textuais equivalentes aos ícones.

### Formato B — Mesmo pedido, outro contêiner

- **Área provável:** Simulação.
- **Mecânica:** o mesmo pretexto aparece como PDF, link de nuvem e arquivo compactado; a pessoa deve manter o mesmo processo seguro.
- **Fluxo:** primeiro artefato → mudança de formato → nova decisão sem explicação → comparação do raciocínio no debrief.
- **O que seria avaliado:** transferência do comportamento entre formatos, não identificação de malware.
- **Alternativa acessível:** cartões sequenciais operáveis por botões anterior/próximo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mesmo pedido, outro contêiner.
- O conteúdo deve usar poucas famílias por tentativa e variar em versões futuras.
- A futura análise deverá decidir se representações de sistema operacional podem ser suficientemente claras sem reproduzir arquivos reais.

### Fontes

- [MITRE ATT&CK — Malicious File](https://attack.mitre.org/techniques/T1204/002/)
- [CISA — Phishing infographic](https://www.cisa.gov/sites/default/files/2023-02/phishing-infographic-508c_0.pdf)

## `concept:hidden-double-extension` — Extensão escondida ou dupla extensão

### Ensinamento e papel

- **Comportamento observável:** abrir detalhes seguros do artefato, comparar nome completo, tipo declarado e contexto e interromper quando houver inconsistência.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de uma atividade.
- **Por que não basta uma explicação textual:** a ambiguidade nasce da apresentação do arquivo; uma simulação permite praticar inspeção sem disponibilizar artefato executável.

### Dificuldades e riscos

- Nomes com vários pontos podem ser legítimos.
- Configurações diferentes mostram ou escondem extensões.
- A extensão visível ainda não garante o tipo interno nem segurança.
- Não se deve avaliar memória de todas as extensões executáveis.

### Formato A — Inspetor de propriedades

- **Área provável:** PhishLab.
- **Mecânica:** abrir um painel fictício de propriedades e marcar divergências entre nome exibido, nome completo, tipo e origem.
- **Fluxo:** arquivo na mensagem → inspeção guiada → segundo caso sem dica → decisão proporcional.
- **O que seria avaliado:** uso da inspeção e identificação de inconsistência, sem exigir diagnóstico técnico.
- **Alternativa acessível:** campos textuais em `fieldset`, com marcação por caixas de seleção.

### Formato B — Montador de apresentação enganosa

- **Área provável:** PhishLab.
- **Mecânica:** relacionar três camadas inertes — nome mostrado, tipo alegado e ação que ocorreria — para explicar como a interface pode ocultar informação.
- **Fluxo:** exemplo decomposto → associação de camadas → caso legítimo com nome longo → debrief.
- **O que seria avaliado:** distinção entre aparência e fato disponível, não capacidade de criar disfarces.
- **Alternativa acessível:** seletores de associação em vez de linhas arrastáveis.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Inspetor de propriedades.
- A futura análise deverá definir uma apresentação neutra, que não dependa de uma versão específica do Windows.
- O conjunto precisa conter pelo menos um nome legítimo com vários pontos para evitar regra absoluta.

### Fontes

- [MITRE ATT&CK — Double File Extension](https://attack.mitre.org/techniques/T1036/007/)
- [Microsoft Support — Common file name extensions in Windows](https://support.microsoft.com/en-us/windows/common-file-name-extensions-in-windows-da4a4430-8e76-89c5-59f7-1cdbbc75cb01)

## `concept:icon-masquerade` — Ícone ou nome incompatível

### Ensinamento e papel

- **Comportamento observável:** tratar ícone e nome como apresentação, consultar origem e tipo por meios seguros e não executar o arquivo para “descobrir”.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de uma atividade.
- **Por que não basta uma explicação textual:** o conceito envolve conflito entre aparência familiar e informações verificáveis.

### Dificuldades e riscos

- Aplicativos legítimos podem ter ícones genéricos ou mudar de identidade visual.
- Tipo declarado e assinatura também não bastam isoladamente.
- O exercício não pode ensinar que um ícone “feio” significa malware.
- Abrir para testar seria exatamente o comportamento inseguro.

### Formato A — Balança de evidências

- **Área provável:** PhishLab.
- **Mecânica:** atribuir peso a ícone, nome, origem, tarefa esperada e tipo exibido, vendo depois quais evidências são apenas cosméticas.
- **Fluxo:** artefato → seleção de evidências → veredito com grau de certeza → debrief.
- **O que seria avaliado:** prioridade dada a contexto e origem, não a cosmética.
- **Alternativa acessível:** lista ordenável também operável por botões “subir/descer”.

### Formato B — Conferência de entrega

- **Área provável:** Missão.
- **Mecânica:** comparar um download representado com o software ou documento solicitado no canal oficial.
- **Fluxo:** pedido → arquivo recebido → consulta à fonte oficial fictícia → aceitar, verificar ou reportar.
- **O que seria avaliado:** conferência independente e recusa de executar diante de incompatibilidade.
- **Alternativa acessível:** comparação lado a lado com tabela textual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Conferência de entrega.
- Estudar depois se o inspetor de propriedades pode ser compartilhado com extensão escondida.
- A curadoria precisa decidir quais metadados são compreensíveis sem simular perícia.

### Fontes

- [MITRE ATT&CK — Masquerading](https://attack.mitre.org/techniques/T1036/)
- [Microsoft — SmartScreen reputation for Windows app developers](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)

## `concept:rtlo-file-name` — Unicode RTL no nome do arquivo

### Ensinamento e papel

- **Comportamento observável:** reconhecer que a ordem visual do nome pode ser enganosa, usar detalhes fornecidos pelo sistema e seguir contexto e rota oficial.
- **Potencial pedagógico:** Baixo como atividade própria.
- **Papel recomendado:** Explicação interativa e variação avançada.
- **Por que não basta uma explicação textual:** revelar visualmente a diferença entre sequência armazenada e sequência apresentada ajuda, mas decodificação manual não é competência esperada.

### Dificuldades e riscos

- A técnica é rara para grande parte do público e pode desviar atenção do processo geral.
- Idiomas de escrita direita-para-esquerda são legítimos; não podem ser tratados como suspeitos.
- Fonte, renderização e tecnologia assistiva podem representar a sequência de modos diferentes.
- A pessoa não deve ser penalizada por não identificar o caractere invisível.

### Formato A — Revelação assistida de direção

- **Área provável:** PhishLab.
- **Mecânica:** alternar entre nome apresentado e sequência anotada, com o controle de direção destacado por texto.
- **Fluxo:** nome ambíguo → revelação assistida → explicação do limite → escolha de ação segura.
- **O que seria avaliado:** decisão de não executar e uso de confirmação, não localização do caractere.
- **Alternativa acessível:** sequência descrita em palavras e caracteres numerados.

### Formato B — Caso sem decodificação

- **Área provável:** Missão.
- **Mecânica:** apresentar nome visualmente plausível e um painel do sistema que informa inconsistência; a pessoa decide como tratar.
- **Fluxo:** arquivo recebido → alerta de inconsistência → consulta ao processo → decisão e debrief.
- **O que seria avaliado:** resposta ao sinal do sistema e confirmação independente.
- **Alternativa acessível:** alerta textual explícito, sem depender da percepção da ordem gráfica.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Revelação assistida de direção, como complemento não pontuado.
- A futura análise precisa verificar bidi, leitores de tela e isolamento de texto antes de qualquer protótipo.
- Não reutilizar exemplos que associem scripts legítimos a fraude.

### Fontes

- [MITRE ATT&CK — Right-to-Left Override](https://attack.mitre.org/techniques/T1036/002/)
- [Unicode — Unicode Security Considerations](https://www.unicode.org/reports/tr36/)

## `concept:password-archive` — Arquivo compactado com senha

### Ensinamento e papel

- **Comportamento observável:** confirmar por que o arquivo foi compactado e protegido, de onde veio a senha e se o envio corresponde a um acordo anterior antes de baixar ou abrir.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de uma atividade.
- **Por que não basta uma explicação textual:** arquivos protegidos são comuns em fluxos legítimos, mas também podem reduzir a inspeção automática; a decisão depende da combinação de contexto e processo.

### Dificuldades e riscos

- Senha não significa malware e ausência de senha não significa segurança.
- A senha enviada no mesmo contato pode ser prática legítima ruim, não prova de ataque.
- O resultado de uma varredura pode ser inconclusivo.
- O treinamento não deve solicitar senha real nem oferecer arquivo para extração.

### Formato A — Conferência de acordo prévio

- **Área provável:** Missão.
- **Mecânica:** comparar mensagem, acordo fictício de troca de arquivos e canal pelo qual a senha deveria chegar.
- **Fluxo:** arquivo recebido → consulta ao acordo → contato independente → decisão proporcional.
- **O que seria avaliado:** busca do acordo, confirmação e recusa de abrir quando não houver base suficiente.
- **Alternativa acessível:** documentos comparados em uma tabela, com navegação por títulos.

### Formato B — Dois arquivos, dois contextos

- **Área provável:** PhishLab.
- **Mecânica:** analisar um arquivo protegido esperado e outro inesperado, registrando quais evidências mudam o tratamento.
- **Fluxo:** caso guiado legítimo → caso independente suspeito → contraste no debrief.
- **O que seria avaliado:** uso de contexto e ausência de regra absoluta sobre ZIP, RAR ou senha.
- **Alternativa acessível:** seleção de evidências por caixas e conclusão por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Dois arquivos, dois contextos.
- Pode compartilhar o painel de contexto de anexo inesperado, sujeito à análise posterior.
- A política corporativa sobre arquivos criptografados precisa ser definida antes do conteúdo final.

### Fontes

- [Google Chrome Help — Chrome blocks some downloads](https://support.google.com/chrome/answer/6261569)
- [NCSC — Identifying and reporting a suspected phishing email: micro exercise](https://www.ncsc.gov.uk/files/identifying-and-reporting-a-suspected-phishing-email-micro-exercise.pdf)

## `concept:cloud-share` — Documento compartilhado em nuvem

### Ensinamento e papel

- **Comportamento observável:** distinguir a plataforma que entregou a notificação da pessoa que compartilhou e do destino seguinte; confirmar o documento pela área oficial ou com o contato esperado.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso forte de uma atividade ou caso de transferência.
- **Por que não basta uma explicação textual:** o cenário mistura componentes legítimos — serviço, autenticação e identidade conhecida — com conteúdo ou encadeamento possivelmente malicioso.

### Dificuldades e riscos

- Links e páginas legítimos de nuvem são rotina de trabalho.
- O serviço pode ser legítimo enquanto a conta, o arquivo ou o link interno foi abusado.
- Uma marca confiável não autentica o autor do compartilhamento.
- O exercício precisa separar “abrir a plataforma por rota conhecida” de “seguir a notificação”.

### Formato A — Mapa de responsabilidades

- **Área provável:** PhishLab.
- **Mecânica:** ligar plataforma, remetente, proprietário do arquivo, página de autenticação e destino interno ao que cada elemento realmente comprova.
- **Fluxo:** notificação → construção do mapa → lacunas de identidade → escolha de rota segura.
- **O que seria avaliado:** distinção entre hospedeiro e autor, além de confirmação independente.
- **Alternativa acessível:** seletores “pertence a” e resumo textual das relações.

### Formato B — Abrir pela área oficial

- **Área provável:** Missão.
- **Mecânica:** em vez de clicar na notificação, navegar por uma representação inerte do serviço conhecido e localizar — ou não — o compartilhamento esperado.
- **Fluxo:** convite recebido → escolha da origem de acesso → busca simulada → confirmação ou reporte.
- **O que seria avaliado:** abandono da rota recebida, inspeção do contexto e reação à ausência do documento.
- **Alternativa acessível:** árvore de navegação por botões e breadcrumb textual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mapa de responsabilidades, por ser reutilizável em diferentes provedores fictícios.
- A futura etapa deve decidir quanto da navegação oficial simulada é necessário sem copiar um produto real.
- Os casos devem incluir compartilhamento legítimo inesperado para controlar falso positivo.

### Fontes

- [Microsoft Security Blog — AiTM phishing and BEC campaign abusing SharePoint](https://www.microsoft.com/en-us/security/blog/2026/01/21/multistage-aitm-phishing-bec-campaign-abusing-sharepoint/)
- [Microsoft Security Blog — Phishing actors exploit complex routing and spoof domains](https://www.microsoft.com/en-us/security/blog/2026/01/06/phishing-actors-exploit-complex-routing-and-misconfigurations-to-spoof-domains/)

## `concept:calendar-invite` — Convite de calendário ou arquivo ICS

### Ensinamento e papel

- **Comportamento observável:** verificar organizador, expectativa, local, links, telefone e anexos antes de aceitar ou seguir instruções do convite.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de uma atividade e transferência para outro canal.
- **Por que não basta uma explicação textual:** calendários misturam evento, mensagem, atualização e lembrete; a interação permite mostrar como a mesma isca persiste fora da caixa de entrada.

### Dificuldades e riscos

- Convites legítimos frequentemente chegam de pessoas novas.
- A presença automática no calendário não comprova aceitação nem legitimidade.
- Fuso, sala virtual e alterações de organizador podem gerar diferenças benignas.
- O fluxo não pode enviar, aceitar ou remover evento real.

### Formato A — Agenda sob revisão

- **Área provável:** Simulação.
- **Mecânica:** examinar uma manhã fictícia com reuniões esperadas, convite suspeito e alteração inconclusiva.
- **Fluxo:** agenda → seleção do evento → inspeção de organizador e destino → aceitar, confirmar ou reportar → debrief.
- **O que seria avaliado:** investigação pertinente, ação proporcional e controle de falsos positivos.
- **Alternativa acessível:** lista cronológica com detalhes em região rotulada, sem depender da grade visual.

### Formato B — Persistência entre canais

- **Área provável:** PhishLab.
- **Mecânica:** reconstruir como um convite recebido por e-mail reaparece no calendário mesmo após a mensagem sair da caixa.
- **Fluxo:** artefatos fora de ordem → linha causal → identificação do ponto de interação → resposta segura.
- **O que seria avaliado:** compreensão da persistência e revisão do evento antes de usar links ou telefones.
- **Alternativa acessível:** ordenação por botões e lista numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Agenda sob revisão.
- Verificar posteriormente se a representação de calendário pode ser compartilhada com **Uma manhã comum**.
- A política sobre convites externos e ferramentas oficiais de reunião precisa ser curada.

### Fontes

- [Microsoft Defender for Office 365 — Strengthening calendar security through enhanced remediation](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-calendar-security-through-enhanced-remediation/4456876)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:macro-enable-content` — Macro e “habilitar conteúdo”

### Ensinamento e papel

- **Comportamento observável:** recusar habilitar macro ou conteúdo ativo por instrução do próprio arquivo, confirmar a necessidade pelo processo conhecido e acionar suporte oficial.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso central de uma atividade.
- **Por que não basta uma explicação textual:** a pessoa precisa decidir quando uma barreira de segurança aparece em meio a uma tarefa plausível, sem aprender que toda macro é maliciosa.

### Dificuldades e riscos

- Algumas organizações ainda possuem documentos legítimos com macro.
- A política pode permitir conteúdo ativo somente em locais ou processos gerenciados.
- “Assinado” ou “veio de colega” não resolve sozinho a autorização.
- A simulação não pode conter macro, arquivo real ou botão funcional de habilitação.

### Formato A — Faixa de segurança inerte

- **Área provável:** Missão.
- **Mecânica:** um documento representado exibe uma barreira de segurança; a pessoa escolhe investigar, habilitar ou buscar a versão oficial.
- **Fluxo:** tarefa plausível → aviso → consulta a processo e origem → decisão → consequência explicada.
- **O que seria avaliado:** preservação da proteção, confirmação independente e uso de alternativa segura.
- **Alternativa acessível:** aviso textual com controles fora da réplica visual do documento.

### Formato B — Processo legítimo versus atalho

- **Área provável:** PhishLab.
- **Mecânica:** comparar dois fluxos: execução gerenciada de uma planilha autorizada e instrução improvisada para habilitar conteúdo.
- **Fluxo:** decomposição guiada → marcação das fontes de autorização → caso novo → debrief.
- **O que seria avaliado:** reconhecimento de que autorização vem do processo, não do texto contido no arquivo.
- **Alternativa acessível:** tabela de etapas com marcação sem arrastar.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Processo legítimo versus atalho.
- A futura análise deve definir uma política fictícia clara e evitar ensinar interface específica como universal.
- O caso precisa mostrar uma macro legítima gerenciada para controlar regra absoluta.

### Fontes

- [Microsoft Support — Enable or disable macros in Microsoft 365 files](https://support.microsoft.com/en-US/Office/vba/enable-or-disable-macros-in-microsoft-365-files)
- [Microsoft Support — What is Protected View?](https://support.microsoft.com/en-us/office/what-is-protected-view-d6f09ac7-e6b9-4495-8e43-2bbcdbcb6653)

## `concept:disable-protection` — Pedido para desativar proteção

### Ensinamento e papel

- **Comportamento observável:** recusar desativar antivírus, SmartScreen, modo protegido ou política por instrução recebida e procurar suporte por rota oficial.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso central ou complementar forte.
- **Por que não basta uma explicação textual:** a pressão costuma ser apresentada como solução operacional; uma decisão ramificada permite praticar a interrupção e a escalada correta.

### Dificuldades e riscos

- Equipes autorizadas podem alterar políticas, mas isso ocorre por processo verificável.
- Avisos e nomes de proteção variam por plataforma.
- O exercício não deve ensinar caminhos para desligar controles.
- Não se pode afirmar que todo aviso seja detecção confirmada de malware.

### Formato A — Conversa de suporte ramificada

- **Área provável:** Missão.
- **Mecânica:** um falso suporte reage à recusa e reformula a pressão, enquanto a pessoa pode encerrar e abrir o canal oficial.
- **Fluxo:** bloqueio representado → pedido de desativação → resistência à pressão → verificação independente → reporte.
- **O que seria avaliado:** preservação do controle, encerramento do contato recebido e uso da rota oficial.
- **Alternativa acessível:** diálogo textual por escolhas, sem áudio ou limite de tempo.

### Formato B — Fonte da autorização

- **Área provável:** PhishLab.
- **Mecânica:** relacionar instruções de arquivo, chat, política corporativa e console administrado às fontes que podem ou não autorizar uma mudança.
- **Fluxo:** mapa guiado → conflito entre instruções → escolha da autoridade correta → debrief.
- **O que seria avaliado:** distinção entre pedido e autorização, não conhecimento de configuração.
- **Alternativa acessível:** seletores por linha em vez de conexões gráficas.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Conversa de suporte ramificada.
- O conteúdo final depende de política corporativa e nomenclatura neutra entre plataformas.
- A etapa técnica futura deve confirmar que nenhuma instrução revele como contornar controles.

### Fontes

- [Microsoft Learn — Available Microsoft Defender SmartScreen settings](https://learn.microsoft.com/en-us/windows/security/operating-system-security/virus-and-threat-protection/microsoft-defender-smartscreen/available-settings)
- [Google Chrome Help — Manage warnings about unsafe sites](https://support.google.com/chrome/answer/99020)

## `concept:document-as-bridge` — Documento usado como ponte para link ou QR

### Ensinamento e papel

- **Comportamento observável:** reconhecer que abrir o documento é apenas uma etapa e reavaliar separadamente o link, QR, telefone ou página apresentado dentro dele.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso de uma atividade e ponte curricular entre arquivos, destinos e QR.
- **Por que não basta uma explicação textual:** a cadeia induz a pessoa a transferir confiança do arquivo para o próximo destino; a experiência precisa tornar essa transferência visível.

### Dificuldades e riscos

- PDFs e documentos frequentemente contêm links e QR legítimos.
- A ausência de alerta ao abrir o arquivo não valida o destino seguinte.
- O primeiro domínio ou serviço pode ser legítimo e apenas encaminhar adiante.
- Nenhum elemento da simulação pode navegar ou codificar um destino real.

### Formato A — Trilha de confiança

- **Área provável:** PhishLab.
- **Mecânica:** construir a cadeia mensagem → documento → botão ou QR → destino, marcando onde cada evidência deixa de valer.
- **Fluxo:** abertura segura da representação → revelação da ponte → inspeção do destino → escolha de rota independente.
- **O que seria avaliado:** reavaliação em cada transição e identificação do destino efetivo.
- **Alternativa acessível:** lista hierárquica com controles de expansão e rótulos de origem.

### Formato B — Documento incompleto

- **Área provável:** Missão.
- **Mecânica:** um documento solicita “continuar” por outro canal; a pessoa pode seguir, abrir o serviço conhecido ou confirmar com o remetente.
- **Fluxo:** tarefa recebida → documento representado → decisão sobre continuidade → consequência → debrief.
- **O que seria avaliado:** não herdar confiança automaticamente e usar a rota conhecida.
- **Alternativa acessível:** ações por botões e descrição textual completa do documento.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Trilha de confiança.
- Pode conectar futuramente componentes de arquivo, URL e QR, mas a análise de reutilização ainda não foi feita.
- A curadoria deve decidir quantos saltos cabem sem transformar o caso em puzzle artificial.

### Fontes

- [MITRE ATT&CK — Spearphishing Attachment](https://attack.mitre.org/techniques/T1566/001/)
- [NCSC — QR codes: what is the real risk?](https://www.ncsc.gov.uk/blog-post/qr-codes-whats-real-risk)

## `concept:html-smuggling` — HTML smuggling

### Ensinamento e papel

- **Comportamento observável:** interromper quando uma página ou arquivo HTML produz download ou execução não solicitada e reportar o evento, sem tentar explicar ou inspecionar o código.
- **Potencial pedagógico:** Controle técnico predominante, com resposta humana observável.
- **Papel recomendado:** Explicação interativa de limite e caso de resposta.
- **Por que não basta uma explicação textual:** uma visualização causal pode explicar por que gateway e aparência inicial não garantem segurança, mas detectar a construção interna do arquivo não é tarefa do funcionário.

### Dificuldades e riscos

- HTML e JavaScript têm muitos usos legítimos.
- A construção local do arquivo normalmente não é observável em detalhes.
- Ensinar a procurar nomes de APIs, código ou extensão seria falsa perícia.
- A proteção principal depende de navegador, endpoint, análise dinâmica e políticas.

### Formato A — Raio X causal

- **Área provável:** PhishLab.
- **Mecânica:** animação controlável e inteiramente textual mostra página recebida, criação local representada, download inesperado e possível execução.
- **Fluxo:** evento observável → revelação assistida do mecanismo → marcação do ponto em que a pessoa pode parar → limites técnicos.
- **O que seria avaliado:** escolha de interromper e reportar diante do download inesperado, não identificação de smuggling.
- **Alternativa acessível:** linha numerada com os mesmos estados e controles anterior/próximo.

### Formato B — Mesmo sintoma, causas diferentes

- **Área provável:** Simulação.
- **Mecânica:** comparar download esperado iniciado pelo funcionário, download automático legítimo conhecido e download inesperado após isca.
- **Fluxo:** três microcasos → resposta proporcional → debrief sobre o que era observável e o que exigia controle técnico.
- **O que seria avaliado:** contexto da ação iniciada e resposta ao comportamento inesperado.
- **Alternativa acessível:** cartões textuais independentes com ações por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Raio X causal, sem pontuar detecção técnica.
- A futura análise deve verificar se animação agrega algo além da linha textual; ela não pode ser obrigatória.
- O material nunca deve incluir JavaScript, arquivo ou sequência reproduzível.

### Fontes

- [Microsoft Security Blog — HTML smuggling surges](https://www.microsoft.com/en-us/security/blog/2021/11/11/html-smuggling-surges-highly-evasive-loader-technique-increasingly-used-in-banking-malware-targeted-attacks/)
- [MITRE ATT&CK — Malicious File](https://attack.mitre.org/techniques/T1204/002/)

## `concept:clickfix` — ClickFix ou falso CAPTCHA

### Ensinamento e papel

- **Comportamento observável:** recusar instrução de site, CAPTCHA ou suporte para abrir ferramenta do sistema, colar conteúdo ou executar comando; fechar a interação e reportar.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso central de uma atividade.
- **Por que não basta uma explicação textual:** a técnica explora a vontade de resolver um pequeno bloqueio; praticar a interrupção diante de uma sequência convincente é mais útil que memorizar o nome.

### Dificuldades e riscos

- CAPTCHAs legítimos existem e não devem ser classificados como fraude por definição.
- O ponto decisivo é a quebra de fronteira para ferramenta do sistema ou comando, não a aparência do desafio.
- Copiar um exemplo funcional criaria risco real e material ofensivo desnecessário.
- O treinamento deve prever o caminho pós-execução sem culpa.

### Formato A — Verificação que cruza a fronteira

- **Área provável:** Missão.
- **Mecânica:** página inerte apresenta etapas fictícias; quando pede uma ação de sistema, a pessoa escolhe continuar, interromper ou buscar rota oficial.
- **Fluxo:** tarefa plausível → CAPTCHA representado → pedido de ação externa → decisão → recuperação se houve continuação.
- **O que seria avaliado:** reconhecimento da fronteira, interrupção e reporte.
- **Alternativa acessível:** texto e botões; nenhuma combinação de teclas, clipboard ou campo executável.

### Formato B — Autópsia de instruções

- **Área provável:** PhishLab.
- **Mecânica:** decompor instruções higienizadas em “ação dentro da página”, “ação no sistema” e “efeito alegado”, marcando a mudança de confiança.
- **Fluxo:** caso guiado → classificação das etapas → caso novo sem marcação → debrief.
- **O que seria avaliado:** identificação da quebra de fronteira e escolha segura, não leitura de comando.
- **Alternativa acessível:** menus de seleção por etapa em vez de arrastar.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Verificação que cruza a fronteira.
- Qualquer protótipo futuro deve bloquear clipboard, atalhos reproduzidos e texto parecido com comando real.
- A curadoria deve incluir CAPTCHA legítimo que permanece inteiramente no site para evitar regra absoluta.

### Fontes

- [Microsoft Security Blog — Think before you Click(Fix)](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/)
- [MITRE ATT&CK — Malicious Copy and Paste](https://attack.mitre.org/techniques/T1204/004/)

## `concept:copied-command` — Comando copiado e execução orientada

### Ensinamento e papel

- **Comportamento observável:** não executar conteúdo copiado de mensagem, página ou suporte; preservar os fatos e acionar o canal oficial.
- **Potencial pedagógico:** Alto como caso, baixo como atividade separada de ClickFix.
- **Papel recomendado:** Caso de uma atividade e complemento de resposta.
- **Por que não basta uma explicação textual:** a pessoa precisa perceber que “copiar e colar” pode ocultar o que será executado e que a origem da instrução não tem autoridade sobre o sistema.

### Dificuldades e riscos

- Equipes técnicas legítimas podem usar comandos em procedimentos controlados.
- O exercício não pode revelar sintaxe, ferramenta ou sequência operacional útil a abuso.
- Mostrar o conteúdo real do clipboard pode introduzir risco e desviar para análise de código.
- A avaliação deve focar a autorização do processo.

### Formato A — Clipboard selado

- **Área provável:** PhishLab.
- **Mecânica:** blocos inertes identificados apenas como “texto da página” e “conteúdo copiado” demonstram que ambos podem divergir, sem exibir comando.
- **Fluxo:** botão fictício → conteúdo opaco no clipboard → pedido para executar → decisão e explicação.
- **O que seria avaliado:** recusa de executar conteúdo não verificável e reporte.
- **Alternativa acessível:** descrição textual da divergência, sem depender de animação.

### Formato B — Fonte da instrução

- **Área provável:** Missão.
- **Mecânica:** comparar procedimento técnico publicado numa base oficial fictícia com instrução recebida em chat ou página.
- **Fluxo:** problema → duas fontes → consulta ao chamado → escolha de seguir processo ou atalho → debrief.
- **O que seria avaliado:** validação da fonte, do chamado e da autorização.
- **Alternativa acessível:** documentos em abas com resumo tabular.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Fonte da instrução.
- Pode ser combinado a ClickFix, sem duplicar uma atividade inteira.
- A futura etapa precisa definir uma política editorial que proíba qualquer comando funcional, mesmo em exemplos “benignos”.

### Fontes

- [MITRE ATT&CK — Malicious Copy and Paste](https://attack.mitre.org/techniques/T1204/004/)
- [Microsoft Security Blog — Think before you Click(Fix)](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/)

## `concept:fake-update` — Atualização falsa

### Ensinamento e papel

- **Comportamento observável:** fechar a solicitação recebida e iniciar atualização somente pela ferramenta, loja ou processo oficial conhecido.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso de uma atividade ou transferência para descoberta segura.
- **Por que não basta uma explicação textual:** a competência é abandonar a origem recebida e reencontrar a atualização pelo canal autorizado.

### Dificuldades e riscos

- Atualizações legítimas podem aparecer durante o trabalho e exigir ação.
- Interfaces e políticas variam por sistema e organização.
- Uma página pode imitar aviso do navegador ou do sistema.
- O exercício não pode instalar, baixar nem redirecionar.

### Formato A — Duas origens de atualização

- **Área provável:** PhishLab.
- **Mecânica:** comparar aviso dentro de página com estado representado na ferramenta oficial, distinguindo aparência de origem.
- **Fluxo:** pop-up → inspeção da origem → abertura da área conhecida → constatação e decisão.
- **O que seria avaliado:** uso da origem oficial e recusa de download recebido.
- **Alternativa acessível:** descrições rotuladas “conteúdo da página” e “ferramenta do sistema”.

### Formato B — Manutenção planejada ou isca

- **Área provável:** Simulação.
- **Mecânica:** tratar avisos legítimo, falso e inconclusivo em uma rotina com calendário de manutenção.
- **Fluxo:** três eventos → consulta seletiva à agenda e ao catálogo oficial → ações → debrief final.
- **O que seria avaliado:** contexto, rota oficial e falsos positivos.
- **Alternativa acessível:** lista de eventos com detalhes por teclado.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Duas origens de atualização.
- A futura análise precisa escolher uma interface fictícia, não uma cópia de Windows, macOS ou navegador real.
- A política de atualização gerenciada deve ser definida editorialmente.

### Fontes

- [Microsoft Support — Protect yourself from online scams and attacks](https://support.microsoft.com/en-us/security/protect-yourself-from-online-scams-and-attacks)
- [FTC — Ads for fake AI and other software spread malicious software](https://consumer.ftc.gov/consumer-alerts/2023/04/ads-fake-ai-other-software-spread-malicious-software)

## `concept:scareware` — Alerta falso, antivírus falso e tela cheia

### Ensinamento e papel

- **Comportamento observável:** não ligar, instalar, pagar ou conceder acesso a partir do alerta; encerrar a interação com segurança e procurar suporte pela rota oficial.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso de uma atividade, especialmente em falso suporte.
- **Por que não basta uma explicação textual:** tela cheia, contador e linguagem de dano iminente criam pressão; a prática deve permitir resistir sem depender de velocidade.

### Dificuldades e riscos

- Alertas legítimos de navegador, sistema e endpoint existem.
- Fechar janela pode exigir caminhos diferentes; o treinamento não deve ensinar um gesto único como universal.
- Número de telefone, logotipo e tom técnico são aparência, não confirmação.
- A interface não pode bloquear de verdade, abrir chamada ou imitar uma infecção ativa.

### Formato A — Alerta sob controle

- **Área provável:** Missão.
- **Mecânica:** uma representação de alerta ocupa a área da atividade, mas oferece ações seguras simuladas, informações de origem e canal oficial.
- **Fluxo:** alerta → pausa sem cronômetro → inspeção de origem → encerramento simulado → suporte oficial e reporte.
- **O que seria avaliado:** recusa de contato/instalação/pagamento e uso de rota independente.
- **Alternativa acessível:** alerta como `dialog` não modal ou seção textual, com foco previsível e botão de saída sempre disponível.

### Formato B — Roteiro de callback

- **Área provável:** Simulação.
- **Mecânica:** ordenar a cadeia pop-up → número exibido → falso técnico → pedido de ferramenta remota e marcar onde interromper.
- **Fluxo:** eventos fora de ordem → reconstrução → seleção dos pontos de contenção → debrief.
- **O que seria avaliado:** compreensão da cadeia e resposta em mais de um ponto, não reconhecimento visual do pop-up.
- **Alternativa acessível:** ordenação por botões e lista numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Roteiro de callback, por reduzir risco de uma réplica visual excessivamente convincente.
- A futura análise deve definir caminhos de encerramento seguros sem instruções específicas demais para um sistema.
- A curadoria precisa incluir alerta legítimo que orienta para ferramenta oficial.

### Fontes

- [FTC — How to spot, avoid, and report tech support scams](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams)
- [Google Chrome Help — Manage warnings about unsafe sites](https://support.google.com/chrome/answer/99020)

## `concept:remote-tool-artifact` — Instalador remoto, extensão ou arquivo RDP

### Ensinamento e papel

- **Comportamento observável:** exigir chamado iniciado, profissional confirmado, ferramenta aprovada e escopo compreendido antes de instalar ou conceder controle; interromper e reportar desvios.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso central em falso suporte ou documento inesperado.
- **Por que não basta uma explicação textual:** ferramentas legítimas podem ser abusadas; a decisão depende do processo de suporte, não de uma lista de produtos “bons” e “ruins”.

### Dificuldades e riscos

- A mesma ferramenta pode ser legítima em um chamado real e perigosa em contato não solicitado.
- Assinatura, loja ou reputação não comprovam autorização para aquela sessão.
- Processos de suporte variam por empresa.
- Nenhum instalador, extensão, arquivo RDP ou sessão real pode existir no exercício.

### Formato A — Validador de chamado

- **Área provável:** Missão.
- **Mecânica:** comparar solicitação de acesso com chamado, técnico, ferramenta permitida, janela e escopo fictícios.
- **Fluxo:** contato recebido → consulta ao chamado → verificação do técnico → aceitar, limitar ou encerrar → debrief.
- **O que seria avaliado:** confirmação independente, correspondência de escopo e recusa de acesso não solicitado.
- **Alternativa acessível:** tabela de correspondências e decisões por rádio.

### Formato B — Manifesto de acesso

- **Área provável:** PhishLab.
- **Mecânica:** relacionar permissões representadas — ver tela, controlar, transferir arquivo, persistir — à finalidade declarada do suporte.
- **Fluxo:** caso guiado → análise de escopo → caso independente com ferramenta legítima e pedido excessivo → conclusão.
- **O que seria avaliado:** necessidade mínima, excesso de escopo e autoridade do processo.
- **Alternativa acessível:** caixas de seleção com descrição de impacto, sem metáfora visual obrigatória.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Validador de chamado.
- O procedimento corporativo e a lista de ferramentas autorizadas precisam ser configuráveis editorialmente.
- A análise técnica futura deverá confirmar que nenhuma representação dispara instalação ou protocolo externo.

### Fontes

- [Microsoft Security Blog — Threat actors misusing Quick Assist](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/)
- [Microsoft Security Blog — Think before you Click(Fix)](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/)

## `concept:file-view-download-open-execute` — Visualizar, baixar, abrir e executar

### Ensinamento e papel

- **Comportamento observável:** descrever com precisão a última interação ocorrida e escolher contenção, reporte e recuperação proporcionais, sem esconder nem exagerar o incidente.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Comportamento principal de atividade e ponte para recuperação.
- **Por que não basta uma explicação textual:** as consequências mudam por estágio e a pessoa precisa reconstruir fatos antes de agir.

### Dificuldades e riscos

- “Abrir” pode significar pré-visualizar mensagem, renderizar documento ou executar conteúdo ativo.
- Nem todo download causa execução; nem toda visualização é sem efeito.
- Ações exatas dependem do ambiente e do procedimento corporativo.
- O treinamento deve evitar culpa e não prometer contenção real.

### Formato A — Linha de exposição

- **Área provável:** PhishLab.
- **Mecânica:** ordenar eventos e marcar o último estado confirmado, separando fato de hipótese.
- **Fluxo:** evidências fora de ordem → reconstrução → nível de exposição → ações proporcionais → debrief.
- **O que seria avaliado:** precisão factual, distinção entre estados e escolha de resposta.
- **Alternativa acessível:** ordenação com botões e grupos rotulados.

### Formato B — Montador de resposta por estágio

- **Área provável:** Missão.
- **Mecânica:** após escolher o que ocorreu, distribuir ações entre “agora”, “em seguida” e “não faça”.
- **Fluxo:** estágio → cartões adaptados → relações críticas de precedência → reporte seguro → resultado.
- **O que seria avaliado:** proporcionalidade, ações críticas e ausência de medidas prejudiciais.
- **Alternativa acessível:** cada cartão recebe categoria por menu; ordem ajustada por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Linha de exposição para este conceito; o montador pode pertencer à atividade de recuperação.
- Os verbos e efeitos precisam de definições editoriais consistentes.
- A futura análise deve decidir quais estados podem ser simulados sem criar arquivo ou sessão.

### Fontes

- [MITRE ATT&CK — Malicious File](https://attack.mitre.org/techniques/T1204/002/)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:antivirus-silence` — Ausência de alerta do antivírus

### Ensinamento e papel

- **Comportamento observável:** não usar silêncio ou resultado isolado de scanner como autorização; manter contexto, origem, processo e resposta a comportamento inesperado.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e caso de transferência.
- **Por que não basta uma explicação textual:** dois casos contrastantes ajudam a mostrar que controles reduzem risco, mas não produzem certeza absoluta.

### Dificuldades e riscos

- Resultado limpo não prova segurança, e aviso pode ser falso positivo.
- O funcionário não deve ser incentivado a enviar arquivos corporativos a scanners públicos.
- Produtos e políticas têm coberturas diferentes.
- A detecção principal é responsabilidade técnica em camadas.

### Formato A — Balança sem veredito automático

- **Área provável:** PhishLab.
- **Mecânica:** combinar contexto, origem, política, comportamento e estado do controle; “sem alerta” recebe peso limitado.
- **Fluxo:** caso guiado → ponderação → caso legítimo bloqueado por reputação → caso suspeito sem alerta → debrief.
- **O que seria avaliado:** decisão proporcional e recusa de tratar o scanner como prova definitiva.
- **Alternativa acessível:** lista ordenável com botões e explicação de peso.

### Formato B — Detecção tardia

- **Área provável:** Simulação.
- **Mecânica:** mostrar que um evento inicialmente sem alerta recebe depois um aviso técnico, perguntando quais ações humanas já eram justificadas antes.
- **Fluxo:** arquivo inesperado → silêncio inicial → decisão → alerta posterior → revisão do raciocínio.
- **O que seria avaliado:** uso das evidências disponíveis no momento, não previsão do alerta futuro.
- **Alternativa acessível:** linha temporal textual sem animação obrigatória.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Balança sem veredito automático.
- A futura análise deve impedir upload real e evitar marcas específicas quando não forem necessárias.
- O debrief precisa explicar defesa em profundidade e falso positivo.

### Fontes

- [Google Chrome Help — Chrome blocks some downloads](https://support.google.com/chrome/answer/6261569)
- [Microsoft Security Blog — HTML smuggling surges](https://www.microsoft.com/en-us/security/blog/2021/11/11/html-smuggling-surges-highly-evasive-loader-technique-increasingly-used-in-banking-malware-targeted-attacks/)

## `concept:polyglot-magic-type` — Arquivo poliglota ou tipo interno divergente

### Ensinamento e papel

- **Comportamento observável:** aceitar que aparência e extensão não permitem diagnosticar o conteúdo interno, preservar o artefato sem executá-lo e acionar análise autorizada.
- **Potencial pedagógico:** Controle técnico predominante.
- **Papel recomendado:** Explicação interativa de limite e controle técnico.
- **Por que não basta uma explicação textual:** uma demonstração de camadas pode tornar o limite compreensível, mas não deve virar teste de inspeção manual.

### Dificuldades e riscos

- O tipo interno exige ferramentas e conhecimento especializados.
- Arquivos legítimos podem conter múltiplas estruturas ou metadados complexos.
- Extensão, ícone, assinatura e resultado superficial não fornecem certeza.
- Pontuar “detecção” responsabilizaria o funcionário por pista invisível.

### Formato A — Camadas que o usuário não vê

- **Área provável:** PhishLab.
- **Mecânica:** uma representação abstrata revela, após a decisão, extensão, cabeçalho interno e interpretações diferentes por ferramentas.
- **Fluxo:** aparência disponível → escolha de processo seguro → raio X técnico não avaliativo → explicação da defesa em camadas.
- **O que seria avaliado:** somente preservação, não execução e encaminhamento correto.
- **Alternativa acessível:** descrição textual das camadas em lista aninhada.

### Formato B — Limite da inspeção humana

- **Área provável:** Simulação curta.
- **Mecânica:** dois arquivos visualmente idênticos recebem análises técnicas opostas depois da decisão, demonstrando que não havia pista humana confiável.
- **Fluxo:** casos pareados → ação baseada em contexto → laudo posterior → debrief sem culpa.
- **O que seria avaliado:** consistência do processo diante da incerteza, não acerto sobre o conteúdo.
- **Alternativa acessível:** casos descritos em texto e resultados anunciados em região de status.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Camadas que o usuário não vê, como explicação não pontuada.
- O estudo técnico futuro deverá decidir se a visualização agrega valor suficiente para justificar o conteúdo.
- Scanner, sandbox, assinatura e inspeção de tipo permanecem controles técnicos; nenhuma análise real é executada.

### Fontes

- [MITRE ATT&CK — Masquerade File Type](https://attack.mitre.org/techniques/T1036/008/)
- [NIST — Guide to Malware Incident Prevention and Handling for Desktops and Laptops](https://csrc.nist.gov/pubs/sp/800/83/r1/final)
