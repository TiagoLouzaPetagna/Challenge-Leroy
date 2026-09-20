# Estudo de formatos — engenharia social presencial e ambiental

> **Estado:** pesquisa; não aprovado para implementação.

Este documento transforma os conceitos canônicos do conjunto 09 em hipóteses pedagógicas para uma etapa posterior e, quando pertinente, orientada por função. O objetivo é proteger identidade, necessidade de saber, acesso e cadeia de custódia sem confronto. Não há definição de atividade, rota, recompensa ou viabilidade técnica.

## Resumo de cobertura

| Conceito | Potencial pedagógico | Papel recomendado |
|---|---|---|
| `concept:physical-pretexting` | Alto | atividade/caso |
| `concept:physical-impersonation` | Alto | caso |
| `concept:elicitation` | Alto | atividade/caso |
| `concept:social-mining` | Médio | caso/síntese |
| `concept:physical-quid-pro-quo` | Médio | caso |
| `concept:usb-baiting` | Controle técnico predominante | explicação de limite/caso |
| `concept:tailgating` | Alto | atividade/caso |
| `concept:shoulder-surfing` | Médio | caso/ensaio de rotina |
| `concept:dumpster-diving` | Médio | explicação de processo/caso |
| `concept:badge-photo-exposure` | Médio | caso |
| `concept:physical-qr-tampering` | Médio | caso/explicação de limite |
| `concept:removable-media-custody` | Alto | atividade de processo |

## `concept:physical-pretexting` — Pretexto presencial

### Ensinamento e papel

- **Comportamento observável:** o funcionário acolhe a pessoa, limita informação e acesso, verifica necessidade e patrocinador pelo processo e encaminha sem confronto.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso estruturante para recepção, escritório e áreas restritas.
- Uma cena interativa permite praticar linguagem profissional e rota segura quando a história é plausível, mas ainda não confirmada.

### Dificuldades e riscos

- Visitantes, prestadores e colegas podem ter situações incomuns legítimas. Não avaliar aparência, sotaque, roupa, nervosismo ou “intuição”; permitir estado inconclusivo e ajuda segura.

### Formato A — Balcão de encaminhamento

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** simulação de recepção; **Mecânica:** escolher perguntas mínimas, patrocinador e área de espera.
- **Fluxo:** ouvir história → evitar confirmar informações internas → consultar agenda/diretório → emitir encaminhamento fictício ou pedir apoio.
- **O que seria avaliado:** verificação por processo, minimização de dados e não concessão de acesso improvisada.
- **Alternativa acessível:** diálogo textual, descrição da cena e decisões sem tempo.

### Formato B — Painel de alegações presenciais

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** investigação; **Mecânica:** separar identidade alegada, tarefa, local, urgência e evidência independente.
- **Fluxo:** decompor o pretexto → marcar lacunas críticas → selecionar fonte autorizada → concluir ou manter a pessoa em rota segura.
- **O que seria avaliado:** não confundir coerência narrativa com autorização.
- **Alternativa acessível:** relações em tabela e seletores, sem arraste obrigatório.

### Recomendação para a etapa de viabilidade

- Avançar A como candidato principal e B como debrief; parametrizar todo detalhe conforme política física da organização.

### Fontes

- [CISA — Cybersecurity Awareness Month partner presentation](https://www.cisa.gov/sites/default/files/publications/Cybersecurity%20Awareness%20Month_2021_PartnerPresentation_Final.pdf)
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)

## `concept:physical-impersonation` — Personificação presencial

### Ensinamento e papel

- **Comportamento observável:** o funcionário verifica papel e autorização de quem se apresenta como técnico, entregador, auditor, executivo ou autoridade, sem depender de uniforme, crachá aparente ou segurança performada.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** caso em acesso, manutenção e entrega.
- O exercício permite separar aparência plausível de vínculo verificado e ensaiar uma negativa segura.

### Dificuldades e riscos

- Profissionais legítimos podem estar sem crachá ou fora da agenda. Não perfilar por características pessoais; avaliar patrocinador, ordem de serviço e procedimento de exceção.

### Formato A — Ordem de serviço

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** estação de manutenção fictícia; **Mecânica:** reconciliar pessoa, tarefa, equipamento, horário e responsável interno.
- **Fluxo:** receber profissional → manter acesso em espera → consultar ordem pelo sistema fictício → acompanhar/encaminhar ou pedir apoio.
- **O que seria avaliado:** confirmação independente e escopo mínimo.
- **Alternativa acessível:** documentos estruturados em texto e navegação por teclado.

### Formato B — Papéis trocados

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** comparação de casos; **Mecânica:** aparências diferentes compartilham ou não a mesma autorização.
- **Fluxo:** analisar quatro visitantes → ignorar estereótipos → consultar registros → selecionar tratamento proporcional → rever.
- **O que seria avaliado:** decisão baseada em processo, não impressão.
- **Alternativa acessível:** personagens descritos sem imagens necessárias à resposta.

### Recomendação para a etapa de viabilidade

- Priorizar A; revisar com responsáveis por segurança física para evitar ensinar um processo inexistente.

### Fontes

- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)
- [CISA — Cybersecurity Awareness Month partner presentation](https://www.cisa.gov/sites/default/files/publications/Cybersecurity%20Awareness%20Month_2021_PartnerPresentation_Final.pdf)

## `concept:elicitation` — Elicitação de informação

### Ensinamento e papel

- **Comportamento observável:** o funcionário percebe perguntas que extraem fragmentos de contexto, responde apenas dentro da necessidade de saber e encaminha a uma fonte pública ou autorizada.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso em conversa informal, telefone, evento e recepção.
- A conversa ramificada ensina que nenhuma pergunta precisa parecer secreta para que o conjunto seja sensível.

### Dificuldades e riscos

- Curiosidade e conversa profissional são normais. Não avaliar simpatia, sociabilidade ou intenção do interlocutor; avaliar conteúdo revelado e rota de encaminhamento.

### Formato A — Conversa por camadas

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** diálogo ramificado; **Mecânica:** perguntas aparentemente pequenas se acumulam ao longo da interação.
- **Fluxo:** conversar → visualizar o inventário de fragmentos pedidos → estabelecer limite → oferecer informação pública ou contato responsável.
- **O que seria avaliado:** necessidade de saber, minimização e resposta não confrontativa.
- **Alternativa acessível:** transcrição completa, revisão livre e modo somente texto.

### Formato B — Quebra-cabeça do outro lado

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** combinar fragmentos fictícios para mostrar o que um terceiro poderia inferir.
- **Fluxo:** revisar pequenas divulgações → agrupá-las por processo/pessoa/local → observar inferência possível → corrigir respostas.
- **O que seria avaliado:** reconhecer valor agregado sem decorar uma lista de “segredos”.
- **Alternativa acessível:** agrupamento por seletores e resultado descrito em texto.

### Recomendação para a etapa de viabilidade

- Levar A e B como sequência; limitar o conteúdo para não produzir um roteiro útil de coleta contra uma organização real.

### Fontes

- [FBI — Elicitation brochure](https://www.fbi.gov/file-repository/counterintelligence/elicitation-brochure.pdf)
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)

## `concept:social-mining` — Mineração social

### Ensinamento e papel

- **Comportamento observável:** o funcionário identifica como publicações e conversas dispersas podem revelar estrutura, rotina, fornecedores, ausências e relações úteis a um pretexto, reduzindo exposição sob seu controle.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso/síntese de privacidade, elicitação e pretexting.
- A montagem do mosaico mostra o efeito cumulativo melhor do que uma lista abstrata de dados pessoais.

### Dificuldades e riscos

- Informações públicas não são automaticamente inadequadas e políticas variam. Não vigiar vida pessoal nem responsabilizar a vítima; focar exemplos fictícios e exposição profissional evitável.

### Formato A — Mosaico de contexto

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** mapa de informações; **Mecânica:** relacionar publicações, agenda, foto e conversa para revelar inferências.
- **Fluxo:** revisar artefatos fictícios → marcar fatos diretos e inferências → identificar combinação de risco → propor redução.
- **O que seria avaliado:** pensamento agregado e distinção entre fato e inferência.
- **Alternativa acessível:** mosaico em tabela com relações textuais.

### Formato B — Publicar com intenção

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** oficina de revisão; **Mecânica:** editar uma comunicação legítima para manter seu objetivo com menos exposição.
- **Fluxo:** escolher público → identificar detalhes desnecessários → revisar texto/imagem descrita → comparar utilidade preservada.
- **O que seria avaliado:** minimização proporcional, não silêncio total.
- **Alternativa acessível:** editor textual; elementos visuais têm descrição equivalente.

### Recomendação para a etapa de viabilidade

- Preferir B para comportamento cotidiano e usar A como explicação; submeter exemplos a revisão de privacidade.

### Fontes

- [NCSC — Social media: how to use it safely](https://www.ncsc.gov.uk/guidance/social-media-how-to-use-it-safely)
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)

## `concept:physical-quid-pro-quo` — Troca de favor presencial

### Ensinamento e papel

- **Comportamento observável:** o funcionário não troca acesso, informação ou exceção por ajuda, brinde ou conveniência e encaminha a necessidade pelo processo.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso em suporte improvisado, evento, entrega e manutenção.
- O diálogo ensaia como aceitar cortesia legítima sem criar uma dívida de autorização.

### Dificuldades e riscos

- Reciprocidade e ajuda mútua são positivas. Não ensinar hostilidade nem proibir brindes genericamente; o limite deve depender do ativo e da política.

### Formato A — Ajuda com contrapartida

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** narrativa ramificada; **Mecânica:** um favor inicial evolui para pedido de informação ou acesso.
- **Fluxo:** receber ajuda → reconhecer mudança de escopo → agradecer e limitar → acionar responsável → registrar.
- **O que seria avaliado:** reavaliar cada pedido e separar gentileza de permissão.
- **Alternativa acessível:** cena narrada em texto e sem pressão temporal.

### Formato B — Troca permitida ou processo

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** classificador de limites; **Mecânica:** separar interações sociais comuns de concessões formais.
- **Fluxo:** analisar situações → identificar ativo → escolher “pode decidir”, “exige autorização” ou “inconclusivo” → justificar.
- **O que seria avaliado:** proporcionalidade e conhecimento do limite do próprio papel.
- **Alternativa acessível:** tabela e botões; nenhuma classificação por cor.

### Recomendação para a etapa de viabilidade

- Manter como caso; A oferece melhor aprendizagem, enquanto B ajuda a controlar falsos positivos.

### Fontes

- [CISA — Cybersecurity Awareness Month partner presentation](https://www.cisa.gov/sites/default/files/publications/Cybersecurity%20Awareness%20Month_2021_PartnerPresentation_Final.pdf)
- [FBI — Elicitation brochure](https://www.fbi.gov/file-repository/counterintelligence/elicitation-brochure.pdf)

## `concept:usb-baiting` — Isca com mídia USB

### Ensinamento e papel

- **Comportamento observável:** o funcionário não conecta mídia encontrada ou recebida fora do processo, preserva-a sem manipulação adicional e aciona a cadeia de custódia definida.
- **Potencial pedagógico:** controle técnico predominante; **papel recomendado:** explicação de limite/caso, nunca teste para descobrir se o dispositivo “parece seguro”.
- O conteúdo ou risco do dispositivo não é observável com segurança pelo usuário; controles técnicos e procedimento devem substituir curiosidade e experimentação.

### Dificuldades e riscos

- Dispositivos legítimos existem e podem conter trabalho importante. Nenhum exemplo deve ser conectado, aberto ou analisado; usar apenas representações fictícias e inertes.

### Formato A — Objeto encontrado

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** estação de encaminhamento; **Mecânica:** escolher isolamento físico, registro mínimo e destinatário responsável.
- **Fluxo:** encontrar objeto → não conectar → registrar local/contexto sem explorar → acondicionar conforme processo fictício → entregar.
- **O que seria avaliado:** custódia e não interação técnica.
- **Alternativa acessível:** descrição do objeto e decisões por formulário.

### Formato B — Aparência não é diagnóstico

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** explicação interativa; **Mecânica:** mídias idênticas têm histórias diferentes, reveladas só depois da decisão.
- **Fluxo:** observar rótulo/formato → escolher o mesmo encaminhamento seguro → receber origem fictícia → discutir por que a aparência não decidiu.
- **O que seria avaliado:** consistência do processo diante de incerteza.
- **Alternativa acessível:** descrição textual integral, sem depender da imagem.

### Recomendação para a etapa de viabilidade

- Avançar somente como interação de limite e custódia; rejeitar qualquer mecânica de “examinar o conteúdo” ou identificar mídia maliciosa visualmente.

### Fontes

- [CISA — Cybersecurity Awareness Month partner presentation](https://www.cisa.gov/sites/default/files/publications/Cybersecurity%20Awareness%20Month_2021_PartnerPresentation_Final.pdf)
- [NCSC — Using peripherals securely](https://www.ncsc.gov.uk/collection/device-security-guidance/policies-and-settings/using-peripherals-securely)

## `concept:tailgating` — Entrada por acompanhamento

### Ensinamento e papel

- **Comportamento observável:** o funcionário evita conceder passagem pela própria credencial, direciona a pessoa à autenticação/recepção e pede apoio sem confronto.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade/caso para ambientes com controle físico.
- A cena permite ensaiar frase, posicionamento e chamada de apoio, reduzindo o custo social de aplicar a regra.

### Dificuldades e riscos

- Políticas de acesso variam e emergências exigem exceções previstas. Não incentivar bloqueio físico, perseguição, toque, confronto ou acusação.

### Formato A — A porta também é um canal

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** narrativa espacial; **Mecânica:** escolher ação diante de aproximação, mãos ocupadas, uniforme ou alegação de falha no crachá.
- **Fluxo:** manter passagem individual → orientar recepção → chamar apoio se necessário → continuar sem seguir a pessoa.
- **O que seria avaliado:** proteção de acesso e comunicação segura.
- **Alternativa acessível:** descrição da cena, opções textuais e nenhum reflexo/tempo.

### Formato B — Sequência de acesso

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** montador de processo; **Mecânica:** ordenar ações para visitante, colega sem credencial e emergência.
- **Fluxo:** selecionar caso → montar autenticação, espera, acompanhante e registro → comparar com política fictícia.
- **O que seria avaliado:** reconhecer rotas legítimas diferentes sem “dar carona” na credencial.
- **Alternativa acessível:** ordenação por botões e lista numerada.

### Recomendação para a etapa de viabilidade

- Priorizar A, com revisão de segurança física; B deve ser configurável à política da organização.

### Fontes

- [CISA — Cybersecurity Awareness Month partner presentation](https://www.cisa.gov/sites/default/files/publications/Cybersecurity%20Awareness%20Month_2021_PartnerPresentation_Final.pdf)
- [NCSC — Supplier assurance questions: physical security](https://www.ncsc.gov.uk/guidance/supplier-assurance-questions)

## `concept:shoulder-surfing` — Observação indevida de tela ou entrada

### Ensinamento e papel

- **Comportamento observável:** o funcionário ajusta tela, posição e momento de autenticação, interrompe exposição percebida e procura apoio sem acusar quem está por perto.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso/ensaio de rotina em espaços compartilhados, deslocamento e atendimento.
- Uma representação espacial ajuda a ensinar prevenção contínua, não caça a uma pessoa “suspeita”.

### Dificuldades e riscos

- Proximidade não implica intenção e necessidades de acessibilidade podem limitar posicionamento. Não avaliar acuidade visual, reflexo nem confronto.

### Formato A — Campo de visão

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** planta interativa; **Mecânica:** escolher posição, bloqueio de tela e momento de abrir informação sensível.
- **Fluxo:** analisar ambiente fictício → reduzir visibilidade → autenticar quando apropriado → bloquear ao se afastar.
- **O que seria avaliado:** antecipação e proteção proporcional ao contexto.
- **Alternativa acessível:** relações espaciais descritas em texto e opções equivalentes.

### Formato B — Rotina interrompida

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** ensaio de processo; **Mecânica:** responder a aproximação durante senha, documento ou chamada.
- **Fluxo:** pausar/ocultar → reposicionar → continuar ou adiar → registrar incidente somente se houver fundamento.
- **O que seria avaliado:** recuperação segura sem atribuir intenção.
- **Alternativa acessível:** cenas em texto, sem tempo ou movimento obrigatório.

### Recomendação para a etapa de viabilidade

- Usar A como explicação e B como comportamento; validar alternativas para diferentes necessidades físicas e visuais.

### Fontes

- [NCSC — End user devices: advice for end users](https://www.ncsc.gov.uk/guidance/end-user-devices-advice-end-users)
- [NCSC — Password policy infographic](https://www.ncsc.gov.uk/sites/default/files/documents/password_policy_infographic.pdf)

## `concept:dumpster-diving` — Recuperação de informação descartada

### Ensinamento e papel

- **Comportamento observável:** o funcionário classifica e descarta documentos, etiquetas e mídias pelo canal adequado e reporta recipientes/processos inadequados.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** explicação de processo/caso de ciclo de vida da informação.
- A interação deve ensinar decisão de descarte antes que o material chegue ao lixo, não simular busca em resíduos.

### Dificuldades e riscos

- Regras de retenção e descarte são locais. Não pedir ao participante que vasculhe, recupere ou manipule lixo; não expor exemplos com dados reais.

### Formato A — Estação de descarte

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** classificador de ciclo de vida; **Mecânica:** encaminhar artefatos fictícios a descarte comum, destruição segura, devolução ou retenção.
- **Fluxo:** identificar conteúdo e suporte → consultar regra fictícia → escolher destino → registrar exceção.
- **O que seria avaliado:** minimização e uso do canal autorizado.
- **Alternativa acessível:** tabela com botões em vez de recipientes por arraste.

### Formato B — Depois do descarte

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** cadeia de consequências; **Mecânica:** revelar quais informações podem ser reconstruídas a partir de materiais descartados incorretamente.
- **Fluxo:** revisar decisão → ver inferências possíveis em exemplos fictícios → escolher contenção e correção do processo → concluir.
- **O que seria avaliado:** compreender o risco agregado e agir sem tentar recuperar material por conta própria.
- **Alternativa acessível:** consequências descritas em lista.

### Recomendação para a etapa de viabilidade

- Preferir A e tratar B como debrief; parametrizar categorias somente após política de informação definida.

### Fontes

- [NCSC — Reducing data exfiltration by malicious insiders](https://www.ncsc.gov.uk/guidance/reducing-data-exfiltration-by-malicious-insiders)
- [NCSC — Secure sanitisation and disposal of storage media](https://www.ncsc.gov.uk/guidance/secure-sanitisation-storage-media)

## `concept:badge-photo-exposure` — Exposição de crachá em fotografia

### Ensinamento e papel

- **Comportamento observável:** o funcionário revisa fotos antes de publicar ou compartilhar, reduzindo exposição de crachá, código, local, rotina e contexto corporativo.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso de privacidade e mineração social.
- Uma revisão em camadas mostra que o risco pode estar no conjunto de detalhes, não apenas em texto legível no crachá.

### Dificuldades e riscos

- Nem toda aparição de crachá gera dano e regras de imagem variam. Não usar reconhecimento facial, dados reais ou ampliação que ensine clonagem; focar minimização preventiva.

### Formato A — Foto antes de publicar

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** revisão de exposição; **Mecânica:** escolher recorte, ocultação fictícia, público e adiamento de postagem.
- **Fluxo:** receber descrição/foto sintética → listar elementos profissionais → reduzir o desnecessário → escolher público → revisar.
- **O que seria avaliado:** decisão de minimização e contexto, não velocidade para “achar o crachá”.
- **Alternativa acessível:** descrição textual completa de todos os elementos relevantes e controles por formulário.

### Formato B — Mosaico de uma semana

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** síntese temporal; **Mecânica:** combinar postagens fictícias para revelar rotina, papel e acesso inferidos.
- **Fluxo:** organizar publicações → distinguir fatos de inferências → escolher quais detalhes remover/adiar → comparar utilidade.
- **O que seria avaliado:** risco cumulativo e temporal.
- **Alternativa acessível:** publicações e relações apresentadas em tabela.

### Recomendação para a etapa de viabilidade

- Priorizar B se já houver ensino de mineração social; A pode ser uma microatividade com imagens integralmente sintéticas.

### Fontes

- [NCSC — Social media: how to use it safely](https://www.ncsc.gov.uk/guidance/social-media-how-to-use-it-safely)
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering)

## `concept:physical-qr-tampering` — Adulteração física de QR Code

### Ensinamento e papel

- **Comportamento observável:** o funcionário interrompe o uso de QR inesperado ou aparentemente alterado, confirma a instrução com o responsável pelo local e verifica destino e ação antes de continuar.
- **Potencial pedagógico:** médio como atividade própria; **papel recomendado:** caso e explicação de limite em pagamento, acesso, cardápio e autenticação.
- Sinais físicos podem motivar cautela, mas não provam autenticidade; o ensino deve combinar custódia do suporte, destino e processo.

### Dificuldades e riscos

- Adesivos e impressões sobrepostas podem ser manutenção legítima, enquanto adulteração pode ser invisível. Não usar QR escaneável, URL ativa, pagamento ou credencial real.

### Formato A — Placa sob custódia

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** inspeção de contexto; **Mecânica:** analisar quem é responsável pela placa e qual ação ela solicita.
- **Fluxo:** observar representação inerte → identificar alteração/contexto → não escanear → confirmar com responsável por canal independente → reportar.
- **O que seria avaliado:** interromper e verificar sem declarar fraude pela aparência.
- **Alternativa acessível:** todos os aspectos visuais descritos em texto e QR não funcional.

### Formato B — Resolver sem o código

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** jornada alternativa; **Mecânica:** cumprir a necessidade alegada por terminal, aplicativo ou endereço oficial fictício.
- **Fluxo:** receber instrução por QR → localizar rota independente → comparar destino/valor/serviço → concluir ou registrar divergência.
- **O que seria avaliado:** não depender do objeto potencialmente adulterado.
- **Alternativa acessível:** navegação em texto; nenhuma câmera ou leitura de QR necessária.

### Recomendação para a etapa de viabilidade

- Levar os dois formatos; proibir qualquer artefato que abra endereço, pagamento ou formulário real.

### Fontes

- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)
- [FBI — Building a digital defense against QR code scams](https://www.fbi.gov/contact-us/field-offices/portland/news/press-releases/oregon-fbi-tech-tuesday-building-a-digital-defense-against-qr-code-scams)

## `concept:removable-media-custody` — Cadeia de custódia de mídia removível

### Ensinamento e papel

- **Comportamento observável:** o funcionário não conecta nem transporta informalmente mídia desconhecida, registra origem e manuseio mínimos e entrega ao responsável previsto.
- **Potencial pedagógico:** alto como atividade própria; **papel recomendado:** atividade de processo para funções expostas a mídias, achados e transferências físicas.
- A cadeia de custódia ensina que o objetivo não é “testar se tem vírus”, mas preservar segurança, contexto e responsabilidade.

### Dificuldades e riscos

- Procedimentos variam por organização e tipo de mídia. Não imitar análise forense, lacre real ou descarte sem autorização; todos os objetos e registros são fictícios.

### Formato A — Estação de custódia

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** fluxo de processo; **Mecânica:** preencher origem, estado, local, responsável e transferência sem acessar conteúdo.
- **Fluxo:** receber/encontrar mídia → isolar → registrar mínimo → selecionar destinatário autorizado → obter confirmação fictícia.
- **O que seria avaliado:** completude proporcional do registro e ausência de conexão.
- **Alternativa acessível:** formulário linear com ajuda contextual.

### Formato B — Linha do tempo da passagem de responsabilidade

- **Área provável:** a definir entre Missão, PhishLab e Simulação na etapa de viabilidade. **Gênero candidato:** reconstrução de incidente; **Mecânica:** ordenar quem recebeu, moveu e entregou uma mídia, identificando lacunas sem atribuir culpa.
- **Fluxo:** organizar eventos → marcar custódia desconhecida → escolher contenção → comunicar lacuna → atualizar o registro.
- **O que seria avaliado:** rastreabilidade, transparência e recuperação sem culpa.
- **Alternativa acessível:** ordenação por botões e tabela cronológica.

### Recomendação para a etapa de viabilidade

- Avançar A para funções relevantes e B como debrief; adaptar somente após processo físico oficial e responsável definido.

### Fontes

- [NCSC — Using peripherals securely](https://www.ncsc.gov.uk/collection/device-security-guidance/policies-and-settings/using-peripherals-securely)
- [CISA — Cybersecurity Awareness Month partner presentation](https://www.cisa.gov/sites/default/files/publications/Cybersecurity%20Awareness%20Month_2021_PartnerPresentation_Final.pdf)
