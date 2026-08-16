# Estudo de formatos — canais, personificação e IA

> **Estado:** pesquisa; não aprovado para implementação.

Este documento converte os conceitos canônicos do conjunto 06 em hipóteses pedagógicas. O princípio comum é que mudança de canal, voz, vídeo, número exibido ou texto convincente aumenta plausibilidade, mas não autentica a solicitação. Não há definição de atividade, rota, recompensa ou viabilidade técnica.

## Resumo de cobertura

| Conceito | Potencial pedagógico | Papel recomendado |
|---|---|---|
| `concept:smishing` | Alto | atividade/caso |
| `concept:messaging-phishing` | Alto | atividade/caso |
| `concept:vishing` | Alto | atividade/caso |
| `concept:caller-id-spoofing` | Controle técnico predominante | explicação de limite/caso |
| `concept:callback-phishing` | Alto | caso |
| `concept:fake-0800` | Médio | variação |
| `concept:fake-tech-support` | Alto | atividade/caso |
| `concept:remote-assistance` | Alto | caso |
| `concept:email-bombing-support` | Alto | caso multicanal |
| `concept:external-collaboration` | Médio | caso/explicação de limite |
| `concept:cloned-social-profile` | Médio | caso |
| `concept:new-number-scam` | Alto | caso |
| `concept:angler-phishing` | Médio | caso |
| `concept:catfishing-honeytrap` | Alto | caso longitudinal |
| `concept:virtual-meeting-bec` | Alto | síntese |
| `concept:voice-cloning` | Controle técnico predominante | explicação de limite/caso |
| `concept:deepfake-video` | Controle técnico predominante | explicação de limite/caso |
| `concept:ai-polished-text` | Controle técnico predominante | explicação de limite/variação |
| `concept:multichannel-chain` | Alto | atividade de síntese |
| `concept:false-cross-channel-corroboration` | Alto | fundamento transversal |
| `concept:platform-migration` | Alto | caso |
| `concept:prompt-injection-assistant` | Controle técnico predominante | explicação de limite/interação de autorização |

## `concept:smishing` — Phishing por SMS

### Ensinamento e papel

- **Comportamento observável:** o funcionário trata SMS inesperado como mensagem não autenticada, evita o link ou número fornecido e acessa o serviço por aplicativo, site ou contato já conhecido.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso introdutório de mudança de canal.
- A interface de telefone permite praticar origem independente e consequência da ação sem usar links, números ou códigos reais.

### Dificuldades e riscos

- SMS legítimos também usam links e códigos. Número curto, grafia ou aparência não provam fraude; casos devem incluir comunicações verdadeiras e estado inconclusivo.

### Formato A — Central de mensagens

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** caixa de entrada móvel simulada em desktop; **Mecânica:** triagem por ação solicitada e canal de confirmação.
- **Fluxo:** revisar mensagens inertes → identificar ativo/ação → abrir diretório oficial fictício → decidir confirmar, reportar ou arquivar.
- **O que seria avaliado:** não interagir com a rota oferecida e escolher acesso independente.
- **Alternativa acessível:** lista textual, foco visível e botões; nenhuma dependência de gesto ou tamanho de tela móvel.

### Formato B — Serviço sem o SMS

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** navegação de processo; **Mecânica:** resolver a necessidade alegada sem usar a mensagem.
- **Fluxo:** receber alerta de entrega, conta ou benefício → localizar o serviço no ambiente fictício → verificar estado real → registrar divergência.
- **O que seria avaliado:** separar possível problema real da instrução potencialmente maliciosa.
- **Alternativa acessível:** caminho em etapas textuais, com mapa equivalente em lista.

### Recomendação para a etapa de viabilidade

- Levar os dois formatos: A ensina triagem; B evita que a resposta se reduza a “apagar SMS”.

### Fontes

- [CISA — Recognize and report phishing](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)
- [FBI — Senior officials impersonated in malicious messaging campaign](https://www.fbi.gov/investigate/cyber/alerts/2025/senior-us-officials-impersonated-in-malicious-messaging-campaign)

## `concept:messaging-phishing` — Phishing em aplicativos de mensagem

### Ensinamento e papel

- **Comportamento observável:** o funcionário não toma foto, nome, grupo ou histórico aparente como autenticação e confirma pedidos sensíveis fora da conversa controlada pelo solicitante.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso em contatos internos, fornecedores e grupos.
- A conversa reconstruída permite ensinar continuidade falsa, mensagens encaminhadas e pressão social de grupo.

### Dificuldades e riscos

- Contatos legítimos usam aplicativos. Não diagnosticar fraude por informalidade, emoji, escrita ou conta nova; avaliar a mudança de risco e a rota independente.

### Formato A — A conversa já estava acontecendo

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** reconstrução de conversa; **Mecânica:** ordenar mensagens e marcar quando identidade, objetivo ou consequência mudam.
- **Fluxo:** reconstruir → prender evidências em painel → identificar lacunas → confirmar por diretório anterior → concluir ou manter inconclusivo.
- **O que seria avaliado:** renovar a verificação quando a ação muda, ainda que o histórico pareça familiar.
- **Alternativa acessível:** ordenação por botões e transcrição linear completa.

### Formato B — Grupo, privado, processo

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** simulação de colaboração; **Mecânica:** escolher em qual espaço uma solicitação pode ser tratada e por qual processo.
- **Fluxo:** receber pedido no grupo → mover apenas o necessário para canal autorizado → consultar responsável → registrar.
- **O que seria avaliado:** minimizar dados e não usar concordância do grupo como prova.
- **Alternativa acessível:** regiões representadas também por lista e rótulos.

### Recomendação para a etapa de viabilidade

- Priorizar A; B é útil para transferência a políticas organizacionais sem supor uma plataforma específica.

### Fontes

- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)
- [FBI — Senior officials impersonated in malicious messaging campaign](https://www.fbi.gov/investigate/cyber/alerts/2025/senior-us-officials-impersonated-in-malicious-messaging-campaign)

## `concept:vishing` — Phishing por voz

### Ensinamento e papel

- **Comportamento observável:** o funcionário interrompe uma chamada sensível, não compartilha códigos ou acesso e retorna por número oficial obtido independentemente.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso em suporte, banco, liderança e emergência.
- O ensaio de resposta profissional é mais útil do que tentar reconhecer emoção, sotaque ou ruído como “voz falsa”.

### Dificuldades e riscos

- Chamadas legítimas podem ser inesperadas. Não pontuar detecção vocal nem velocidade; áudio requer consentimento editorial, transcrição e equivalente textual completo.

### Formato A — A central que não podia esperar

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** chamada simulada; **Mecânica:** escolher respostas e ações enquanto o interlocutor aumenta o escopo.
- **Fluxo:** ouvir ou ler → recusar segredo/acesso → encerrar educadamente → buscar contato oficial → verificar e reportar.
- **O que seria avaliado:** controle da chamada, não a identificação técnica da voz.
- **Alternativa acessível:** transcrição sincronizada, modo somente texto e ausência de limite de tempo.

### Formato B — Roteiro de retorno seguro

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** montador de processo; **Mecânica:** ordenar ações de callback independente para diferentes papéis.
- **Fluxo:** registrar mínimo necessário → encerrar → localizar número no diretório → autenticar pelo processo → documentar.
- **O que seria avaliado:** não retornar para número ditado, exibido ou enviado pelo interlocutor.
- **Alternativa acessível:** cartões ordenáveis também por botões e lista numerada.

### Recomendação para a etapa de viabilidade

- Usar A para comportamento e B para consolidação; a versão sem áudio deve ser pedagogicamente equivalente.

### Fontes

- [FBI — Tech support scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams)
- [FBI — Warning on AI used by cyber criminals](https://www.fbi.gov/contact-us/field-offices/sanfrancisco/news/fbi-warns-of-increasing-threat-of-cyber-criminals-utilizing-artificial-intelligence)

## `concept:caller-id-spoofing` — Falsificação do identificador de chamada

### Ensinamento e papel

- **Comportamento observável:** o funcionário entende que o número ou nome exibido não autentica a chamada e usa retorno independente para ações sensíveis.
- **Potencial pedagógico:** controle técnico predominante; **papel recomendado:** explicação interativa de limite dentro de vishing, não atividade de “detectar o número falso”.
- A manipulação não é observável de modo confiável pelo usuário; o ensino deve retirar confiança excessiva do indicador, não inventar pistas.

### Dificuldades e riscos

- Chamadas autênticas também podem exibir centrais, ramais ou números desconhecidos. Não pedir que o participante compare formatação, DDD ou aparência para declarar fraude.

### Formato A — Mesmo visor, duas origens

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** duas chamadas com visor idêntico levam a origens diferentes reveladas somente no debrief.
- **Fluxo:** observar igualdade → escolher a mesma ação segura em ambas → retornar pelo diretório → ver por que o visor não decidiu.
- **O que seria avaliado:** aplicação consistente do processo diante de indicador não confiável.
- **Alternativa acessível:** números e estados descritos em texto, sem depender de imagem.

### Formato B — O que este campo prova?

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** mapa de confiança; **Mecânica:** classificar indicadores como alegação, contexto ou confirmação independente.
- **Fluxo:** analisar “nome exibido”, “número”, “ticket” e “diretório” → montar cadeia de verificação → testar em um caso.
- **O que seria avaliado:** atribuir peso correto ao identificador, não reconhecer spoofing.
- **Alternativa acessível:** tabela com seletores e explicações.

### Recomendação para a etapa de viabilidade

- Manter como microinteração de limite; qualquer protótipo que peça “ache o número falso” deve ser rejeitado.

### Fontes

- [FCC — Caller ID spoofing](https://www.fcc.gov/spoofing)
- [FBI — Tech support scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams)

## `concept:callback-phishing` — Phishing que induz retorno telefônico

### Ensinamento e papel

- **Comportamento observável:** o funcionário não liga para o contato incluído em cobrança, cancelamento ou alerta recebido; procura a organização por fonte independente.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso de ponte entre e-mail/mensagem e voz.
- A atividade mostra que uma mensagem sem link ainda pode transferir a vítima para um canal controlado.

### Dificuldades e riscos

- Números de atendimento legítimos aparecem em mensagens. Não avaliar formato do telefone; avaliar a origem usada para obtê-lo e o procedimento após conectar.

### Formato A — O pedido não tinha link

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** documento e chamada simulados; **Mecânica:** escolher entre o número da mensagem, pesquisa genérica ou diretório oficial fictício.
- **Fluxo:** receber fatura/cancelamento → identificar a ação → localizar contato independente → verificar registro real → reportar divergência.
- **O que seria avaliado:** não confundir ausência de link com ausência de risco.
- **Alternativa acessível:** todos os documentos em HTML/texto, sem número real discável.

### Formato B — Origem do contato

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** rastreamento de proveniência; **Mecânica:** montar a cadeia “onde encontrei este número”.
- **Fluxo:** revisar várias rotas → marcar as que dependem do solicitante → escolher uma fonte anterior/oficial → simular retorno.
- **O que seria avaliado:** independência da rota de callback.
- **Alternativa acessível:** cadeia em lista hierárquica e seletores.

### Recomendação para a etapa de viabilidade

- Priorizar A como caso narrativo e usar B no debrief para tornar explícita a dependência entre canais.

### Fontes

- [MITRE ATT&CK — Phishing: Spearphishing Voice](https://attack.mitre.org/techniques/T1566/004/)
- [FBI — Silent Ransom Group targeting law firms](https://www.fbi.gov/file-repository/cyber-alerts/silent-ransom-group-targeting-law-firms-052325.pdf)

## `concept:fake-0800` — Falso número de central

### Ensinamento e papel

- **Comportamento observável:** o funcionário entende que prefixo, gratuidade ou aparência institucional não autenticam uma central e obtém o contato no canal oficial já conhecido.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** variação brasileira de callback e falsa central.
- A interação deve ensinar procedência do contato, não características visuais de um “0800 verdadeiro”.

### Dificuldades e riscos

- Centrais legítimas usam 0800 e outros prefixos; números encontrados em anúncios também podem ser adulterados. Não criar uma regra baseada no padrão numérico.

### Formato A — Três cartões, um serviço

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** comparação de fontes; **Mecânica:** o mesmo número aparece em mensagem, anúncio e área autenticada, com proveniências diferentes.
- **Fluxo:** selecionar uma fonte → justificar independência → acessar ambiente oficial fictício → confirmar.
- **O que seria avaliado:** escolher pela origem confiável, não pelo número parecer institucional.
- **Alternativa acessível:** fontes descritas e navegáveis em lista.

### Formato B — Resolver sem telefonar para a mensagem

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** jornada de serviço; **Mecânica:** encontrar atendimento a partir de aplicativo/documento previamente cadastrado.
- **Fluxo:** receber alerta → ignorar contato fornecido → navegar para atendimento oficial → verificar protocolo → registrar.
- **O que seria avaliado:** reconstruir uma rota independente.
- **Alternativa acessível:** passos textuais e diretório pesquisável por teclado.

### Recomendação para a etapa de viabilidade

- Manter como variação localizada; não dedicar atividade isolada se callback phishing já cobrir a procedência.

### Fontes

- [CERT.br — Golpes na Internet](https://cartilha.cert.br/fasciculos/golpes/fasciculo-golpes.pdf)
- [FBI — Tech support scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams)

## `concept:fake-tech-support` — Falso suporte técnico

### Ensinamento e papel

- **Comportamento observável:** o funcionário recusa contato de suporte não solicitado, não executa comandos nem entrega credenciais e abre atendimento pelo canal interno.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso que reúne autoridade, medo e acesso técnico.
- Uma estação de suporte permite praticar a diferença entre relatar um problema e entregar o controle do dispositivo.

### Dificuldades e riscos

- Suporte legítimo pode iniciar contato conforme política local. Evitar comandos reais, telas operacionais reproduzíveis e qualquer instrução de contorno de segurança.

### Formato A — Ticket ou pretexto

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** console de suporte fictício; **Mecânica:** reconciliar chamada, ticket, solicitante e procedimento.
- **Fluxo:** receber abordagem → procurar ticket por rota interna → confirmar responsável → aceitar sessão prevista ou encerrar/reportar.
- **O que seria avaliado:** vínculo com demanda registrada e minimização de permissões.
- **Alternativa acessível:** console como formulário e lista; sem terminal real.

### Formato B — Limites de uma chamada

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** diálogo ramificado; **Mecânica:** responder a pedidos progressivos de código, instalação, compartilhamento e segredo.
- **Fluxo:** ouvir problema → nomear limite → interromper → acionar suporte oficial → documentar.
- **O que seria avaliado:** interromper escalada com linguagem profissional e sem confronto.
- **Alternativa acessível:** transcrição completa e modo somente texto.

### Recomendação para a etapa de viabilidade

- Avançar A e B como partes distintas do mesmo ensinamento; toda ação técnica deve ser fictícia e inerte.

### Fontes

- [FBI — Tech support scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams)
- [Microsoft — Threat actors misusing Quick Assist](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/)

## `concept:remote-assistance` — Ferramentas de assistência remota

### Ensinamento e papel

- **Comportamento observável:** o funcionário trata assistência remota como concessão de acesso, exige solicitação registrada e entende o escopo antes de autorizar.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso de permissão e resposta, não treinamento operacional da ferramenta.
- A simulação torna visíveis permissões que interfaces reais podem resumir em um clique.

### Dificuldades e riscos

- A ferramenta pode ser legítima e ainda estar sendo abusada. Não ensinar marca, tela ou código como prova; não reproduzir instalação, comando ou controle remoto real.

### Formato A — Painel de permissões

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** cada pedido revela o que “ver tela”, “controlar” e “executar” permitiria.
- **Fluxo:** receber convite → consultar ticket → abrir detalhes de escopo → permitir apenas fluxo aprovado ou recusar/reportar.
- **O que seria avaliado:** consentimento informado e vínculo com suporte autorizado.
- **Alternativa acessível:** descrições textuais de cada permissão e navegação por teclado.

### Formato B — Sessão em andamento

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** resposta a incidente; **Mecânica:** ordenar contenção após perceber assistência não autorizada.
- **Fluxo:** interromper sessão fictícia → desconectar pelo procedimento → contatar suporte/segurança → relatar ações observadas.
- **O que seria avaliado:** contenção rápida sem ocultar o engano e sem investigar por conta própria.
- **Alternativa acessível:** ordenação por botões e explicação linear.

### Recomendação para a etapa de viabilidade

- Prototipar A como ensino e B como recuperação; adaptar detalhes apenas quando a política organizacional estiver definida.

### Fontes

- [Microsoft — Threat actors misusing Quick Assist](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/)
- [FBI — Tech support scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams)

## `concept:email-bombing-support` — Bombardeio de e-mail seguido de falso suporte

### Ensinamento e papel

- **Comportamento observável:** o funcionário reconhece o volume anormal como possível incidente, não aceita o “ajudante” que surge e usa suporte oficial independente.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso multicanal que combina sobrecarga, suporte e acesso remoto.
- A sequência ensina que o ruído e o contato de socorro podem ser partes coordenadas, sem exigir que o usuário atribua intenção com certeza.

### Dificuldades e riscos

- Picos de mensagens e contatos legítimos podem coincidir. A interface não deve causar sobrecarga sensorial; representar volume por agrupamento, permitir pausa e usar conteúdo inerte.

### Formato A — Linha do tempo do ruído

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** investigação temporal; **Mecânica:** correlacionar aumento de mensagens, alertas e contato de suporte.
- **Fluxo:** agrupar eventos → identificar o primeiro impacto → isolar contato não solicitado → abrir chamado oficial → preservar evidências.
- **O que seria avaliado:** correlação prudente e ação de contenção, não certeza sobre autoria comum.
- **Alternativa acessível:** linha do tempo como tabela cronológica e filtros nomeados.

### Formato B — Caixa de entrada sob controle

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** triagem; **Mecânica:** aplicar filtros fictícios, localizar alertas relevantes e manter o contato externo fora do fluxo.
- **Fluxo:** reduzir ruído → procurar mudanças de conta/compra → reportar volume → confirmar com suporte oficial.
- **O que seria avaliado:** priorizar sinais operacionais sem clicar, responder ou conceder acesso.
- **Alternativa acessível:** lista sem animação e sem tempo; volume resumido numericamente.

### Recomendação para a etapa de viabilidade

- Avançar A; usar B somente se a interface conseguir representar volume sem penalizar acessibilidade ou atenção.

### Fontes

- [Microsoft — How a Teams support call led to compromise](https://www.microsoft.com/en-us/security/blog/2026/03/16/help-on-the-line-how-a-microsoft-teams-support-call-led-to-compromise/)
- [Microsoft — Threat actors misusing Quick Assist](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/)

## `concept:external-collaboration` — Colaboração com identidades externas

### Ensinamento e papel

- **Comportamento observável:** o funcionário verifica contexto, organização e necessidade antes de responder a convidado externo, sem tomar presença na plataforma como identidade validada.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso e explicação de limite dependente da plataforma.
- Marcadores de externo ajudam, mas são controles de contexto, não detectores de intenção; o ensino deve centrar autorização e rota interna.

### Dificuldades e riscos

- Parceiros legítimos são externos e interfaces mudam. Não avaliar memorização de ícones ou cores; apresentar o estado externo também em texto e incluir colaboração autêntica.

### Formato A — Fronteira da organização

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** visualizar quais identidades, arquivos e permissões atravessam a fronteira.
- **Fluxo:** abrir conversa → consultar indicação textual de externo → limitar dados → confirmar patrocinador interno → colaborar ou recusar.
- **O que seria avaliado:** ajustar compartilhamento e verificação ao limite organizacional.
- **Alternativa acessível:** diagrama disponível como lista de relações.

### Formato B — Sala com convidado

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** conversa/reunião simulada; **Mecânica:** tratar pedidos de arquivo, código e suporte feitos por participante externo.
- **Fluxo:** receber pedido → identificar impacto → consultar responsável interno → escolher canal e nível de acesso.
- **O que seria avaliado:** não confundir entrada na plataforma com autorização.
- **Alternativa acessível:** transcrição e painel de participantes em tabela.

### Recomendação para a etapa de viabilidade

- Manter o conteúdo agnóstico de produto; detalhes visuais específicos devem ser parametrizados e não fazer parte da resposta correta.

### Fontes

- [Microsoft — Midnight Blizzard social engineering over Teams](https://www.microsoft.com/en-us/security/blog/2023/08/02/midnight-blizzard-conducts-targeted-social-engineering-over-microsoft-teams/)
- [Microsoft — Cross-tenant helpdesk impersonation](https://www.microsoft.com/en-us/security/blog/2026/04/18/crosstenant-helpdesk-impersonation-data-exfiltration-human-operated-intrusion-playbook/)

## `concept:cloned-social-profile` — Perfil social clonado

### Ensinamento e papel

- **Comportamento observável:** o funcionário não autentica um contato por foto, nome, biografia ou conexões copiadas e confirma pedidos por contato previamente conhecido.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso de personificação em rede social.
- Um mapa de identidade mostra que muitos atributos públicos podem ser reproduzidos sem controle real da conta original.

### Dificuldades e riscos

- Perfis reais podem ser novos, duplicados por motivo legítimo ou pouco completos. Não pedir “qual perfil é falso” apenas por estética ou volume de seguidores.

### Formato A — Quem controla este contato?

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** mapa de identidade; **Mecânica:** separar atributos públicos, canal controlado e confirmação independente.
- **Fluxo:** comparar perfis → marcar o que pode ser copiado → localizar contato anterior → confirmar pedido → reportar impersonação se apropriado.
- **O que seria avaliado:** não usar aparência pública como prova de controle.
- **Alternativa acessível:** mapa convertido em tabela com relações descritas.

### Formato B — Pedido vindo do perfil

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** narrativa de decisão; **Mecânica:** responder a um pedido plausível sem precisar declarar qual perfil é genuíno.
- **Fluxo:** receber abordagem → recusar ação sensível → contatar a pessoa por rota conhecida → decidir e preservar evidência.
- **O que seria avaliado:** ação segura sob identidade inconclusiva.
- **Alternativa acessível:** fluxo totalmente textual e sem dependência de imagens.

### Recomendação para a etapa de viabilidade

- Preferir B para público geral; usar A como explicação curta sobre atributos copiáveis.

### Fontes

- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)
- [FBI — Spoofing and phishing](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/spoofing-and-phishing)

## `concept:new-number-scam` — Golpe do novo número

### Ensinamento e papel

- **Comportamento observável:** o funcionário trata mudança de número como mudança de identidade, confirma pela rota anterior ou terceiro confiável e não transfere valores/dados durante a validação.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso cotidiano de familiaridade, urgência e vínculo emocional.
- A conversa permite praticar uma confirmação respeitosa sem depender de pergunta secreta improvisada.

### Dificuldades e riscos

- Pessoas realmente trocam de número e a rota anterior pode estar indisponível. Oferecer múltiplas opções de confirmação e estado inconclusivo; evitar culpar quem acreditou.

### Formato A — Contato em transição

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** conversa ramificada; **Mecânica:** escolher uma rota de confirmação que não dependa do novo contato.
- **Fluxo:** receber aviso → suspender pedido sensível → usar número anterior, diretório ou contato comum → atualizar cadastro pelo processo.
- **O que seria avaliado:** tratar troca de canal como evento que exige nova verificação.
- **Alternativa acessível:** transcrição e lista de rotas, sem áudio obrigatório.

### Formato B — Grafo de contatos

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** mapa de confiança; **Mecânica:** localizar caminhos independentes até a identidade alegada.
- **Fluxo:** marcar origem do novo número → eliminar caminhos controlados por ele → escolher referência anterior → registrar resultado.
- **O que seria avaliado:** independência real da confirmação.
- **Alternativa acessível:** grafo apresentado também como lista de adjacência em linguagem natural.

### Recomendação para a etapa de viabilidade

- Avançar A; B pode integrar o debrief de múltiplos casos de identidade.

### Fontes

- [FTC — Scammers use AI to enhance family emergency schemes](https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes)
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)

## `concept:angler-phishing` — Falso atendimento em rede social

### Ensinamento e papel

- **Comportamento observável:** o funcionário não entrega dados ou credenciais a perfis que surgem após reclamação pública e inicia atendimento no canal oficial.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso em suporte e exposição pública de necessidade.
- A atividade pode mostrar que o contato oportunista conhece o problema porque ele foi publicado, não porque representa a organização.

### Dificuldades e riscos

- Marcas legítimas atendem em redes sociais. Selo, rapidez e conhecimento do caso não bastam; evitar ensinar uma lista frágil de sinais de perfil.

### Formato A — A resposta chegou primeiro

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** fluxo social simulado; **Mecânica:** comparar contato reativo com rota oficial localizada independentemente.
- **Fluxo:** publicar problema fictício → receber respostas → minimizar dados públicos → iniciar canal oficial → verificar protocolo.
- **O que seria avaliado:** procedência do atendimento e proteção de dados.
- **Alternativa acessível:** fluxo em lista linear, imagens com descrição e sem publicação real.

### Formato B — Limpeza do chamado

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** montador de comunicação; **Mecânica:** transformar uma postagem excessiva em relato mínimo para o canal correto.
- **Fluxo:** identificar dados expostos → remover do relato público fictício → preparar resumo → enviar ao suporte oficial simulado.
- **O que seria avaliado:** minimização e migração segura, não identificação de perfil fraudulento.
- **Alternativa acessível:** editor textual com sugestões explicadas.

### Recomendação para a etapa de viabilidade

- Usar A como caso e B como transferência para privacidade; não simular uma rede real nem links externos.

### Fontes

- [FBI — Spoofing and phishing](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/spoofing-and-phishing)
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)

## `concept:catfishing-honeytrap` — Relacionamento fabricado e armadilha afetiva

### Ensinamento e papel

- **Comportamento observável:** o funcionário mantém limites entre vínculo pessoal e ativos profissionais, reconhece escalada de pedidos e procura apoio sem vergonha.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso longitudinal, opcional e sensível.
- Uma sequência é necessária para ensinar construção gradual de confiança; uma mensagem isolada caricaturaria o mecanismo.

### Dificuldades e riscos

- Tema emocional e potencialmente estigmatizante. Não avaliar orientação, intimidade, solidão ou “ingenuidade”; evitar sexualização e permitir sair/retomar o conteúdo.

### Formato A — Relação em capítulos

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** narrativa longitudinal; **Mecânica:** acompanhar mudança de assunto, canal e pedido ao longo do tempo.
- **Fluxo:** interagir socialmente → notar aproximação de trabalho/dinheiro → estabelecer limite → confirmar identidade/necessidade → procurar apoio.
- **O que seria avaliado:** proteção de ativos e reavaliação diante de escalada.
- **Alternativa acessível:** história em texto, resumos por capítulo e controle de intensidade.

### Formato B — Fronteiras de contexto

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** classificador de pedidos; **Mecânica:** separar o que pertence à vida pessoal, ao processo profissional e ao que não deve ser compartilhado.
- **Fluxo:** analisar solicitações → marcar fronteira → formular recusa/encaminhamento → montar plano de reporte.
- **O que seria avaliado:** limites consistentes independentemente da autenticidade do relacionamento.
- **Alternativa acessível:** tabela e botões, sem arraste.

### Recomendação para a etapa de viabilidade

- Manter como conteúdo posterior e opcional; envolver revisão de segurança psicológica antes de qualquer protótipo.

### Fontes

- [FBI — Romance scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/romance-scams)
- [FTC — What to know about romance scams](https://consumer.ftc.gov/articles/what-know-about-romance-scams)

## `concept:virtual-meeting-bec` — Fraude corporativa em reunião virtual

### Ensinamento e papel

- **Comportamento observável:** o funcionário não trata presença, imagem ou voz em reunião como dispensa de alçada; confirma mudanças financeiras e dados pelo processo corporativo.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** síntese de BEC, mídia sintética, autoridade e processo financeiro.
- A reunião simulada permite praticar discordância segura em ambiente socialmente convincente.

### Dificuldades e riscos

- Participantes legítimos podem ter câmera ruim, representante ou conta externa. Não avaliar “quem parece falso”; avaliar separação de funções e confirmação da transação.

### Formato A — Sala de decisão

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** reunião textual/audiovisual simulada; **Mecânica:** pedidos surgem na pauta e exigem consulta de alçada fora da sala.
- **Fluxo:** acompanhar reunião → identificar mudança sensível → pausar execução → consultar fluxo financeiro → retomar com resposta.
- **O que seria avaliado:** manter controle formal sob pressão coletiva.
- **Alternativa acessível:** transcrição, descrição dos participantes e versão somente texto equivalente.

### Formato B — Ata versus autorização

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** reconciliação documental; **Mecânica:** comparar o que foi dito com cadastro, solicitação e aprovações.
- **Fluxo:** montar ata → destacar decisão alegada → localizar aprovação ausente → encaminhar verificação → registrar.
- **O que seria avaliado:** não transformar reunião em autorização automática.
- **Alternativa acessível:** documentos HTML estruturados e comparação em tabela.

### Recomendação para a etapa de viabilidade

- Priorizar B pela estabilidade e acessibilidade; A só deve avançar com paridade integral entre mídia e texto.

### Fontes

- [FBI IC3 — Criminals use virtual meeting platforms to conduct BEC](https://www.ic3.gov/PSA/2022/PSA220216)
- [FBI — Warning on AI used by cyber criminals](https://www.fbi.gov/contact-us/field-offices/sanfrancisco/news/fbi-warns-of-increasing-threat-of-cyber-criminals-utilizing-artificial-intelligence)

## `concept:voice-cloning` — Clonagem de voz

### Ensinamento e papel

- **Comportamento observável:** o funcionário aplica o mesmo processo de confirmação a uma voz familiar e não baseia ações sensíveis em “reconheci quem falou”.
- **Potencial pedagógico:** controle técnico predominante; **papel recomendado:** explicação de limite e caso de transferência, nunca teste auditivo de detecção.
- A qualidade de clonagem varia e humanos não têm um sinal universal confiável; a interação deve ensinar invariância de processo.

### Dificuldades e riscos

- Voz real pode soar estranha e voz sintética pode soar perfeita. Áudio exige consentimento, transcrição e alternativa textual; não coletar nem imitar voz de pessoa real.

### Formato A — Duas vozes, a mesma decisão

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** pedidos com origens diferentes recebem a mesma ação segura; a origem só é revelada depois.
- **Fluxo:** ouvir/ler → identificar pedido de alto impacto → confirmar por rota separada → comparar desfechos.
- **O que seria avaliado:** processo consistente, não acerto sobre qual áudio foi sintetizado.
- **Alternativa acessível:** descrições e transcrição fornecem experiência pedagógica equivalente.

### Formato B — Emergência com palavra combinada insuficiente

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** caso familiar/profissional; **Mecânica:** construir múltiplas rotas de confirmação em vez de depender só da voz.
- **Fluxo:** receber pedido urgente → não revelar pistas ao interlocutor → contatar pessoa/referência por rota anterior → acionar ajuda adequada.
- **O que seria avaliado:** confirmação independente e minimização de informação.
- **Alternativa acessível:** versão integral em mensagens de texto.

### Recomendação para a etapa de viabilidade

- Avançar somente como ensino de limite; rejeitar pontuação por “ouvido”, artefato sonoro ou sotaque.

### Fontes

- [FTC — Scammers use AI to enhance family emergency schemes](https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes)
- [FBI — Warning on AI used by cyber criminals](https://www.fbi.gov/contact-us/field-offices/sanfrancisco/news/fbi-warns-of-increasing-threat-of-cyber-criminals-utilizing-artificial-intelligence)

## `concept:deepfake-video` — Vídeo sintético e deepfake

### Ensinamento e papel

- **Comportamento observável:** o funcionário entende que ver uma pessoa em vídeo não substitui processo, alçada ou confirmação independente para uma ação sensível.
- **Potencial pedagógico:** controle técnico predominante; **papel recomendado:** explicação de limite/caso, não atividade de localizar defeitos visuais.
- Artefatos como piscar, bordas ou sincronia ficam obsoletos e geram falso excesso de confiança; o comportamento seguro independe deles.

### Dificuldades e riscos

- Vídeos legítimos sofrem compressão e falhas; deepfakes podem não apresentar pistas visíveis. Não usar rosto/voz de pessoa real sem consentimento e não tornar vídeo obrigatório.

### Formato A — Reunião sem prova biométrica

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** cenário de autorização; **Mecânica:** um vídeo convincente solicita exceção e o participante deve recorrer ao processo.
- **Fluxo:** assistir ou ler → identificar ação → consultar alçada fora da reunião → responder → revelar que a mídia era inconclusiva.
- **O que seria avaliado:** proteção do processo, não classificação do vídeo.
- **Alternativa acessível:** transcrição, descrição e versão textual com resultado idêntico.

### Formato B — Laboratório de limites

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** variar compressão, iluminação e origem para mostrar que “estranheza” não é diagnóstico.
- **Fluxo:** observar exemplos seguros → registrar nível de confiança → comparar com metadados fictícios revelados → definir ação estável.
- **O que seria avaliado:** reconhecer incerteza e escolher confirmação independente.
- **Alternativa acessível:** cada variação explicada em texto e gráfico dispensável.

### Recomendação para a etapa de viabilidade

- Preferir A; B só vale se não se transformar em catálogo de “pistas de deepfake”.

### Fontes

- [FBI — Warning on AI used by cyber criminals](https://www.fbi.gov/contact-us/field-offices/sanfrancisco/news/fbi-warns-of-increasing-threat-of-cyber-criminals-utilizing-artificial-intelligence)
- [FBI IC3 — Virtual meeting platforms and BEC](https://www.ic3.gov/PSA/2022/PSA220216)

## `concept:ai-polished-text` — Texto aprimorado por IA

### Ensinamento e papel

- **Comportamento observável:** o funcionário não usa gramática, fluência ou personalização como prova de legitimidade e verifica ação, identidade e processo.
- **Potencial pedagógico:** controle técnico predominante; **papel recomendado:** explicação de limite e variação editorial em outros casos.
- Não há característica textual universal que revele uso de IA; o aprendizado correto é abandonar “erro de português” como salvaguarda.

### Dificuldades e riscos

- Textos legítimos e fraudulentos podem ser excelentes ou ruins. Não pontuar detecção de estilo, idioma, educação ou suposta autoria por IA.

### Formato A — Quatro textos, nenhuma certeza

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** comparação crítica; **Mecânica:** mensagens com qualidade semelhante têm legitimidades diferentes, reveladas por processo e contexto.
- **Fluxo:** ler → evitar classificação por estilo → consultar origem e ação → decidir → receber debrief.
- **O que seria avaliado:** uso de evidências independentes.
- **Alternativa acessível:** conteúdo em texto simples e compatível com leitor de tela.

### Formato B — Editor de pedido plausível

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** decomposição; **Mecânica:** ocultar temporariamente aparência e destacar remetente, ação, ativo e alçada.
- **Fluxo:** converter a mensagem em campos → investigar cada campo → recompor decisão → comparar com impressão inicial.
- **O que seria avaliado:** superar efeito de fluência e personalização.
- **Alternativa acessível:** formulário linear e resumo textual.

### Recomendação para a etapa de viabilidade

- Manter como princípio editorial transversal; A pode funcionar como microlição, não como detector de IA.

### Fontes

- [FBI — Warning on AI used by cyber criminals](https://www.fbi.gov/contact-us/field-offices/sanfrancisco/news/fbi-warns-of-increasing-threat-of-cyber-criminals-utilizing-artificial-intelligence)
- [Microsoft — AI-powered deception and emerging fraud threats](https://www.microsoft.com/en-us/security/blog/2025/04/16/cyber-signals-issue-9-ai-powered-deception-emerging-fraud-threats-and-countermeasures/)

## `concept:multichannel-chain` — Cadeia multicanal

### Ensinamento e papel

- **Comportamento observável:** o funcionário reconstrói uma campanha que atravessa e-mail, mensagem, chamada e colaboração, preservando a exigência de confirmação independente em cada transição.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade de síntese após o aprendizado dos canais.
- Uma linha do tempo interativa revela como sinais dispersos formam um incidente sem pressupor que toda coincidência seja coordenação.

### Dificuldades e riscos

- Contatos legítimos também mudam de canal. Avaliar dependência entre fontes e ações, não quantidade de canais; permitir hipótese inconclusiva.

### Formato A — Ataque multicanal

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** quadro investigativo; **Mecânica:** ordenar eventos e ligar cada transição a quem controla a próxima rota.
- **Fluxo:** reunir eventos → identificar pivôs → separar confirmação independente de autorreferência → conter e reportar.
- **O que seria avaliado:** visão de cadeia, preservação de evidência e escolha de ponto seguro de interrupção.
- **Alternativa acessível:** quadro convertido em tabela cronológica e relações descritas.

### Formato B — Simulador de interrupção

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** narrativa ramificada; **Mecânica:** testar em qual etapa diferentes salvaguardas interrompem a campanha.
- **Fluxo:** acompanhar cadeia → aplicar retorno oficial, dupla aprovação ou reporte → observar o que ainda permanece exposto → revisar.
- **O que seria avaliado:** selecionar controle proporcional e entender defesa em camadas.
- **Alternativa acessível:** caminhos em lista, sem animação nem tempo.

### Recomendação para a etapa de viabilidade

- Avançar A como síntese principal e usar B no debrief para mostrar que não existe uma única oportunidade de acerto.

### Fontes

- [FBI — Senior officials impersonated in malicious messaging campaign](https://www.fbi.gov/investigate/cyber/alerts/2025/senior-us-officials-impersonated-in-malicious-messaging-campaign)
- [Microsoft — Threat actors misusing Quick Assist](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/)

## `concept:false-cross-channel-corroboration` — Falsa corroboração entre canais

### Ensinamento e papel

- **Comportamento observável:** o funcionário pergunta se confirmações em canais diferentes são realmente independentes ou foram originadas/controladas pela mesma solicitação.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** fundamento transversal de toda aprendizagem multicanal.
- A visualização de dependência corrige a intuição de que e-mail mais ligação mais vídeo equivalem a três provas.

### Dificuldades e riscos

- É possível haver confirmação legítima em canal diferente. Não contar canais; mapear controle, origem do contato e vínculo com registros anteriores.

### Formato A — Árvore de dependência

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** mapa de evidências; **Mecânica:** ligar mensagens, números, perfis e reuniões à fonte que os introduziu.
- **Fluxo:** construir árvore → identificar ramos com raiz comum → adicionar fonte independente → reavaliar.
- **O que seria avaliado:** independência real da confirmação.
- **Alternativa acessível:** árvore também em lista hierárquica e tabela de origem.

### Formato B — Três confirmações, uma pessoa

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** caso narrativo; **Mecânica:** cada canal parece confirmar o anterior, mas o participante pode sair da cadeia.
- **Fluxo:** receber e-mail → chamada → reunião → escolher diretório/cadastro prévio → concluir ou escalar.
- **O que seria avaliado:** romper autorreferência sem precisar diagnosticar cada artefato.
- **Alternativa acessível:** história integral em texto e controles por teclado.

### Recomendação para a etapa de viabilidade

- Levar ambos; A ensina o modelo mental e B testa transferência sob plausibilidade.

### Fontes

- [FBI IC3 — Virtual meeting platforms and BEC](https://www.ic3.gov/PSA/2022/PSA220216)
- [FBI — Senior officials impersonated in malicious messaging campaign](https://www.fbi.gov/investigate/cyber/alerts/2025/senior-us-officials-impersonated-in-malicious-messaging-campaign)

## `concept:platform-migration` — Migração induzida de plataforma

### Ensinamento e papel

- **Comportamento observável:** o funcionário trata o convite para mudar de canal como mudança de contexto e de controles, revalidando identidade e necessidade antes de continuar.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso em recrutamento, suporte, relacionamento, fornecedor e investimento.
- A sequência mostra como sair de uma plataforma pode remover moderação, histórico, identidade corporativa e registro.

### Dificuldades e riscos

- Migrações legítimas são comuns. Não ensinar “nunca mude de aplicativo”; avaliar justificativa, procedimento, preservação de registro e independência da confirmação.

### Formato A — O que ficou para trás

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** comparação de controles; **Mecânica:** cada mudança exibe recursos perdidos ou alterados.
- **Fluxo:** receber convite → revisar identidade, histórico e política → escolher permanecer, migrar com validação ou encerrar → registrar.
- **O que seria avaliado:** reconhecer mudança de fronteira e revalidar.
- **Alternativa acessível:** comparação em tabela textual.

### Formato B — Corrida de canais sem corrida

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** narrativa longitudinal; **Mecânica:** o contato sugere várias migrações, mas o usuário controla o ritmo e pode pausar.
- **Fluxo:** acompanhar → identificar motivo alegado → buscar rota oficial fora da cadeia → decidir → reportar.
- **O que seria avaliado:** resistência à pressa e manutenção de evidência.
- **Alternativa acessível:** sem cronômetro; transcrição e navegação reversível.

### Recomendação para a etapa de viabilidade

- Priorizar A para clareza; B deve evitar excesso de interfaces imitadas e permanecer agnóstico de marca.

### Fontes

- [FBI — Romance scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/romance-scams)
- [Microsoft — Midnight Blizzard social engineering over Teams](https://www.microsoft.com/en-us/security/blog/2023/08/02/midnight-blizzard-conducts-targeted-social-engineering-over-microsoft-teams/)

## `concept:prompt-injection-assistant` — Injeção de instruções em assistente

### Ensinamento e papel

- **Comportamento observável:** o funcionário não concede a um assistente autoridade superior à sua função, revisa fonte, escopo e consequência antes de aprovar ação sensível e reporta comportamento inesperado.
- **Potencial pedagógico:** controle técnico predominante; **papel recomendado:** explicação de limite e interação de autorização, não caça a texto oculto.
- Injeção indireta pode estar em conteúdo invisível ao usuário e não é confiavelmente detectável por leitura; prevenção e contenção pertencem sobretudo à arquitetura, permissões e validação.

### Dificuldades e riscos

- O assistente pode errar sem ataque, e uma resposta correta pode vir de fonte não confiável. Não pedir que o usuário reconheça “frases de prompt injection” nem transferir a ele a obrigação de proteger o sistema.

### Formato A — Fonte, instrução e autoridade

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** separar pedido do usuário, conteúdo consultado, resposta do assistente e ação autorizada.
- **Fluxo:** observar o fluxo de processamento fictício → identificar onde conteúdo não confiável entra → limitar permissão → revisar saída → encaminhar anomalia.
- **O que seria avaliado:** compreensão do limite e uso de confirmação humana independente para alto impacto.
- **Alternativa acessível:** diagrama integralmente representado em lista ordenada.

### Formato B — Porta de autorização

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** decisão de processo; **Mecânica:** o assistente propõe enviar, apagar, pagar ou compartilhar, mas a ação fica inerte até revisão.
- **Fluxo:** ler proposta e fontes declaradas → verificar escopo/destinatário → aprovar, editar, recusar ou escalar → receber debrief.
- **O que seria avaliado:** revisão de consequência e privilégio mínimo, não detecção da causa técnica.
- **Alternativa acessível:** formulário textual, foco previsível e nenhuma ação real.

### Recomendação para a etapa de viabilidade

- Levar A como explicação e B como comportamento; declarar explicitamente que controles técnicos e backend autoritativo são obrigatórios antes de qualquer uso real.

### Fontes

- [NIST CSRC — Prompt injection](https://csrc.nist.gov/glossary/term/prompt_injection)
- [NCSC — Prompt injection is not SQL injection](https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection)
