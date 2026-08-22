# Viabilidade de formatos — canais, personificação e IA

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Escopo:** desktop, sobre o portal local e não autoritativo de 2026-08-11.

**Bases:** [estudo canônico do conjunto 06](../estudos-de-formatos/06-canais-personificacao-e-ia.md) e [inventário da arquitetura atual](ARQUITETURA-ATUAL.md).

O portal atual representa e-mail, conversa, evidências e processos em texto, mas não possui subsistema de áudio, vídeo, transcrição sincronizada ou mídia versionada. Formatos de voz e vídeo só podem avançar com qualidade editorial, direitos, consentimento, transcrição e equivalente textual completo; uma adaptação textual não pode fingir avaliar detecção de voz ou imagem. Backend autoritativo permanece obrigatório antes do uso real.

## `concept:smishing` — Phishing por SMS

### Formato A — Central de mensagens

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** lista/leitor, inspeção e ações de `WorkdaySimulation`.
- **Trabalho novo:** catálogo de mensagens curtas inertes, visual desktop de telefone, diretório fictício e ação “acessar por origem independente”.
- **Dependências:** casos legítimos, maliciosos e inconclusivos; números e links não acionáveis; backend autoritativo.
- **Acessibilidade:** lista textual e botões são o modo completo; não depender de swipe, tela pequena, notificação sonora ou aparência de celular.
- **Risco principal:** ensinar que SMS legítimo não contém link ou usar número curto/formatação como prova.

### Formato B — Serviço sem o SMS

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** sequência de fontes e escolhas de `BankChangeChallenge` e `RecoveryMission`.
- **Trabalho novo:** ambiente fictício do serviço, caminho independente e comparação entre alegação e estado oficial.
- **Dependências:** processos representativos sem imitar conta real; conteúdo versionado; backend antes do uso corporativo.
- **Acessibilidade:** passos em lista, títulos de etapa e alternativa ao mapa visual; foco previsível.
- **Risco principal:** confundir “não usar o SMS” com ignorar um problema real que ainda precisa ser verificado.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A pratica triagem e B mede se o usuário consegue resolver a necessidade fora da rota controlada pelo remetente.
- **Vínculo recomendado:** simulação de mensagens com uma etapa final de navegação de processo.
- **Condição para avançar:** generalizar catálogo da simulação para canais e ações, com todos os destinos inertes.

### Evidências no portal

- `features/simulations/WorkdaySimulation.tsx` oferece a caixa; `BankChangeChallenge` oferece navegação por fontes, mas ambos possuem contratos específicos.

## `concept:messaging-phishing` — Phishing em aplicativos de mensagem

### Formato A — A conversa já estava acontecendo

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** a Missão homônima já apresenta histórico, mudança de comportamento, evidências e decisão segura.
- **Trabalho novo:** completar ordenação acessível se ela permanecer parte do formato, variar casos e explicitar conclusão inconclusiva.
- **Dependências:** personas e diretório sintéticos; backend para conteúdo, tentativa e recompensa reais.
- **Acessibilidade:** transcrição linear completa e ordenação por botões; não depender de arrastar, avatar ou cor da mensagem.
- **Risco principal:** pontuar mudança de estilo como prova de conta comprometida.

### Formato B — Grupo, privado, processo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa textual, cards e seleção de rota das Missões e do desafio bancário.
- **Trabalho novo:** espaços rotulados, minimização do que pode migrar entre eles e confirmação por responsável fictício.
- **Dependências:** política corporativa de colaboração e dados; sem integração com mensageria real; backend autoritativo.
- **Acessibilidade:** espaços também em lista e cada movimento por botão nomeado; resumo do que será compartilhado.
- **Risco principal:** ensinar uma plataforma específica ou assumir que canal privado é mais confiável que grupo.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A já possui prova funcional; B deve ser uma extensão de transferência para processo, não uma atividade duplicada.
- **Vínculo recomendado:** evolução de `CompromisedConversationMission` com debrief sobre mudança de canal.
- **Condição para avançar:** separar conteúdo e avaliador do componente atual e adicionar ordenação acessível se necessária.

### Evidências no portal

- `features/missions/CompromisedConversationMission.tsx` comprova o encaixe, enquanto seus textos, evidências e submissão ainda estão acoplados ao caso atual.

## `concept:vishing` — Phishing por voz

### Formato A — A central que não podia esperar

- **Viabilidade:** Média.
- **Esforço relativo:** EG.
- **Encaixe:** Mídia ou processo externo.
- **Reuso possível:** conversa por turnos, escolhas e resultado das Missões; o modo textual pode conservar toda a decisão.
- **Trabalho novo:** player de áudio acessível, transcrição sincronizada, controle de reprodução, falhas de carregamento, ativos versionados e alternativa somente texto; sem áudio, adaptar explicitamente para chamada transcrita.
- **Dependências:** roteiro, atuação/produção com qualidade, direitos e consentimento; revisão especializada; backend e hospedagem de mídia antes do uso real.
- **Acessibilidade:** transcrição integral, identificação dos falantes, controles por teclado, volume independente e nenhuma questão baseada em tom, sotaque ou ruído.
- **Risco principal:** áudio de baixa qualidade ensinar pistas falsas ou o usuário acreditar que consegue detectar voz fraudulenta.

### Formato B — Roteiro de retorno seguro

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards de ações, stepper e diretório fictício das experiências de processo.
- **Trabalho novo:** ordenação acessível de registrar, encerrar, localizar contato independente, autenticar e documentar; variações por papel.
- **Dependências:** procedimento real de callback e contatos publicados; backend autoritativo no uso real.
- **Acessibilidade:** ordenar também por botões e disponibilizar lista numerada; sem cronômetro.
- **Risco principal:** prescrever uma sequência universal quando o incidente exige contenção ou reporte imediato.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina o comportamento central com risco e custo menores. A pode ser combinada depois, apenas quando a camada de mídia tiver qualidade e equivalência comprovadas.
- **Vínculo recomendado:** estação de processo de retorno seguro, com chamada transcrita como contexto inicial.
- **Condição para avançar:** procedimento corporativo validado; para áudio, pipeline de mídia acessível, direitos e teste editorial.

### Evidências no portal

- Conversas e etapas já existem, mas `ARQUITETURA-ATUAL.md` confirma a ausência de áudio, vídeo e transcrição sincronizada.

## `concept:caller-id-spoofing` — Falsificação do identificador de chamada

### Formato A — Mesmo visor, duas origens

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** cards, escolha segura e debrief das Missões.
- **Trabalho novo:** duas chamadas textuais com visor idêntico e origens reveladas somente depois; a mesma ação segura deve ser aceita em ambas.
- **Dependências:** números reservados/sintéticos e explicação técnica revisada; backend autoritativo.
- **Acessibilidade:** número e estado em texto; nenhum telefone real, imagem indispensável ou pista sonora.
- **Risco principal:** introduzir uma diferença visual que transforme o exercício em “ache o spoofing”.

### Formato B — O que este campo prova?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** seletores, evidências e três conclusões dos laboratórios.
- **Trabalho novo:** tabela de alegação, contexto e confirmação independente para nome, número, ticket e diretório.
- **Dependências:** modelo de confiança aprovado; backend apenas para catálogo e avaliação no uso real.
- **Acessibilidade:** tabela com cabeçalhos e explicações em lista; categorias nunca só por cor.
- **Risco principal:** atribuir pesos numéricos universais a indicadores contextuais.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Combinação.
- **Justificativa:** o conceito é um limite técnico, não uma habilidade de detecção. A demonstra o limite e B o integra à verificação em poucos minutos.
- **Vínculo recomendado:** microinteração dentro de vishing/callback.
- **Condição para avançar:** avaliador que pontue processo idêntico diante de visores iguais, nunca identificação do falso.

### Evidências no portal

- Cards, evidências e debrief existentes bastam; não é justificável criar novo contrato/recompensa para essa explicação curta.

## `concept:callback-phishing` — Phishing que induz retorno telefônico

### Formato A — O pedido não tinha link

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** documento inerte do PhishLab e navegação de processo de `BankChangeChallenge`.
- **Trabalho novo:** fatura/cancelamento em HTML, diretório oficial fictício, registro real simulado e decisão de reporte.
- **Dependências:** nenhum número discável; fontes e marcas sintéticas; procedimento de contato; backend autoritativo.
- **Acessibilidade:** documento em HTML/texto, valores copiáveis sem acionar ligação e passos rotulados.
- **Risco principal:** ensinar que mensagem sem link é segura ou que pesquisa genérica é fonte independente suficiente.

### Formato B — Origem do contato

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards de evidência e seletores dos laboratórios.
- **Trabalho novo:** cadeia de proveniência em lista hierárquica, marcação das rotas dependentes do solicitante e escolha de fonte anterior/oficial.
- **Dependências:** fontes fictícias com relações inequívocas; backend para catálogo versionado.
- **Acessibilidade:** cadeia também em tabela “contato/encontrado em/depende de”; não depender de linhas gráficas.
- **Risco principal:** confundir popularidade em busca ou anúncio com independência.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A dá consequência ao caso e B torna explícito por que o contato não era independente.
- **Vínculo recomendado:** laboratório de proveniência com etapa de processo.
- **Condição para avançar:** componente compartilhado de origem e garantia de que nenhum contato seja acionável.

### Evidências no portal

- `PhishLabExperience` e `BankChangeChallenge` fornecem padrões complementares; a cadeia de proveniência requer componente novo, não grafo obrigatório.

## `concept:fake-0800` — Falso número de central

### Formato A — Três cartões, um serviço

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** comparação de fontes e escolha de evidência dos laboratórios.
- **Trabalho novo:** variação localizada com mensagem, anúncio e área autenticada fictícia; debrief sobre origem, não prefixo.
- **Dependências:** números sintéticos não discáveis e revisão brasileira do conteúdo; backend autoritativo.
- **Acessibilidade:** cartões também em lista, com origem escrita integralmente.
- **Risco principal:** criar regra visual sobre formato de 0800 verdadeiro.

### Formato B — Resolver sem telefonar para a mensagem

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** estação de processo e diretório fictício propostos para smishing/callback.
- **Trabalho novo:** jornada de serviço via aplicativo/documento previamente cadastrado e confirmação de protocolo.
- **Dependências:** processo corporativo ou de serviço validado; backend para conteúdo real.
- **Acessibilidade:** passos textuais, busca por teclado e nenhuma simulação de chamada necessária.
- **Risco principal:** duplicar integralmente callback phishing sem acrescentar aprendizagem.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** é uma variação regional importante, mas os dois formatos cabem como casos da família de procedência do contato.
- **Vínculo recomendado:** callback phishing/smishing, sem player ou recompensa próprios.
- **Condição para avançar:** catálogo localizado e teste de que o resultado nunca depende do prefixo.

### Evidências no portal

- O reuso é majoritariamente de conteúdo; criar uma nova família no `LearningAttempt` seria desproporcional ao conceito isolado.

## `concept:fake-tech-support` — Falso suporte técnico

### Formato A — Ticket ou pretexto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** fontes progressivas, comparação e escolha de rota de `BankChangeChallenge`.
- **Trabalho novo:** console fictício em formulário/lista para reconciliar chamada, ticket, solicitante e escopo; nenhuma sessão ou terminal real.
- **Dependências:** processo de suporte, estados de ticket e responsáveis aprovados; backend autoritativo no uso real.
- **Acessibilidade:** console em HTML sem emulação visual indispensável, relações resumidas em tabela e foco por etapa.
- **Risco principal:** ensinar que ticket visível autentica o solicitante ou reproduzir passos operacionais exploráveis.

### Formato B — Limites de uma chamada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** diálogo progressivo de `MfaFatigueMission` e `CompromisedConversationMission`.
- **Trabalho novo:** respostas profissionais diante de código, instalação, compartilhamento e segredo, com encerramento e abertura do canal oficial.
- **Dependências:** limites reais do suporte e texto revisado; áudio é opcional e só poderá existir sob os requisitos de mídia; backend autoritativo.
- **Acessibilidade:** transcrição textual completa como modo primário, sem tempo e sem avaliação de tom de voz.
- **Risco principal:** pontuar a frase exata ou afirmar que suporte legítimo nunca inicia contato, independentemente da política local.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A verifica vínculo e escopo; B pratica como preservar o limite. Ambas cabem na mesma estação sem ação técnica real.
- **Vínculo recomendado:** estação de processo com conversa textual incorporada.
- **Condição para avançar:** procedimento corporativo aprovado e garantia de interface inteiramente inerte.

### Evidências no portal

- `BankChangeChallenge` e `MfaFatigueMission` oferecem os padrões; integrar os resultados pede um contrato composto ou nova versão reutilizável.

## `concept:remote-assistance` — Ferramentas de assistência remota

### Formato A — Painel de permissões

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, detalhes expansíveis, escolhas e debrief existentes.
- **Trabalho novo:** painel inerte que explique ver tela, controlar e executar, vincule cada permissão ao ticket e permita recusar/encaminhar.
- **Dependências:** política de assistência remota e revisão técnica; nenhuma marca, código, instalação ou integração; backend autoritativo.
- **Acessibilidade:** descrição textual completa de escopo e consequência, controles por teclado e sem ícone como único rótulo.
- **Risco principal:** fazer uma interface fictícia parecer treinamento operacional ou ensinar que uma permissão isolada é sempre segura.

### Formato B — Sessão em andamento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** categorias de contenção, recuperação e reporte de `RecoveryMission`.
- **Trabalho novo:** incidente de sessão não autorizada, sequência de interrupção proporcional e fatos apropriados para o reporte.
- **Dependências:** procedimento corporativo por plataforma; todos os controles fictícios; backend autoritativo.
- **Acessibilidade:** ações selecionáveis/ordenáveis por botões e explicação linear, sem simular ponteiro remoto ou tela piscando.
- **Risco principal:** prescrever desconexão incorreta ou incentivar investigação autônoma após comprometimento.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A ensina consentimento informado antes da sessão e B cobre recuperação quando o limite já foi ultrapassado.
- **Vínculo recomendado:** laboratório curto de permissões conectado à família de resposta a incidente.
- **Condição para avançar:** matriz de permissões e contenção aprovada pelos responsáveis técnicos.

### Evidências no portal

- `RecoveryMission` cobre B quase diretamente; A precisa de componente local, mas não de ferramenta remota real nem subsistema externo.

## `concept:email-bombing-support` — Bombardeio de e-mail seguido de falso suporte

### Formato A — Linha do tempo do ruído

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, evidências, filtros e debrief das simulações.
- **Trabalho novo:** tabela cronológica agrupável, correlação prudente entre volume, alertas e contato e ação de abrir suporte oficial.
- **Dependências:** corpus sintético, revisão de resposta a incidente e backend autoritativo.
- **Acessibilidade:** tabela/lista cronológica, filtros nomeados, pausa e ausência de animação ou som de notificações.
- **Risco principal:** afirmar autoria comum apenas por coincidência temporal ou reproduzir sobrecarga sensorial.

### Formato B — Caixa de entrada sob controle

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** caixa, filtros e leitor de `WorkdaySimulation`.
- **Trabalho novo:** representação agregada de grande volume, busca de alertas relevantes e isolamento do falso contato, sem renderizar centenas de itens.
- **Dependências:** conteúdo balanceado e regra de filtragem pedagógica; backend autoritativo.
- **Acessibilidade:** volume por contagem e grupos, lista sem movimento, sem limite de tempo e com opção de limpar filtros.
- **Risco principal:** medir capacidade de operar filtros ou sugerir exclusão em massa de evidências.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A explicita a coordenação possível sem exigir volume real; B deve funcionar como ferramenta dentro dela, não como player autônomo.
- **Vínculo recomendado:** investigação temporal com uma mini-caixa agregada.
- **Condição para avançar:** componente de linha temporal acessível e revisão para manter causalidade inconclusiva.

### Evidências no portal

- A simulação fornece filtros e itens; não existe componente temporal compartilhado, mas uma primeira versão tabular é localizada e não exige grafo.

## `concept:external-collaboration` — Colaboração com identidades externas

### Formato A — Fronteira da organização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, tabelas e escolhas existentes.
- **Trabalho novo:** lista de identidades, arquivos, permissões e patrocinadores que atravessam a fronteira; o diagrama deve ser apenas uma visualização complementar.
- **Dependências:** política de colaboração agnóstica de produto; backend para identidades e políticas reais, que não devem entrar no protótipo.
- **Acessibilidade:** tabela/lista canônica com relações explícitas; ícone, cor e posição de “externo” são redundantes.
- **Risco principal:** memorização de interface específica ou tratamento automático de todo externo como ameaça.

### Formato B — Sala com convidado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa, painel de participantes e escolha de rota das Missões.
- **Trabalho novo:** pedidos de arquivo, código e suporte, confirmação do patrocinador interno e nível mínimo de acesso.
- **Dependências:** regras corporativas de convidado e compartilhamento; sem sala real; backend autoritativo.
- **Acessibilidade:** transcrição completa e participantes em tabela, com estado externo escrito.
- **Risco principal:** usar entrada na plataforma como prova de autorização ou tornar “externo” um veredito.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B oferece decisão contextual com menor abstração; A funciona melhor como painel explicativo da própria sala.
- **Vínculo recomendado:** caso de colaboração com painel textual de fronteira.
- **Condição para avançar:** parâmetros agnósticos de produto e inclusão de parceiro externo legítimo.

### Evidências no portal

- Conversas e tabelas são reutilizáveis; não há integração de colaboração ou diretório, portanto toda identidade deve continuar sintética.

## `concept:cloned-social-profile` — Perfil social clonado

### Formato A — Quem controla este contato?

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** inspeção de identidade e evidências de `SenderInspectorLab`.
- **Trabalho novo:** mapa/tabela que separe atributos públicos copiáveis, conta controlada e confirmação independente; resposta sem “adivinhar o perfil falso”.
- **Dependências:** perfis sintéticos e relações editoriais; nenhuma consulta de rede social real; backend autoritativo.
- **Acessibilidade:** tabela de relações completa; o mapa visual é opcional e não depende de fotos.
- **Risco principal:** virar comparação estética ou grafo inacessível e reforçar pistas como seguidores/biografia.

### Formato B — Pedido vindo do perfil

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** narrativa, evidências e decisão segura de `CompromisedConversationMission`.
- **Trabalho novo:** rota conhecida para confirmar a pessoa, preservação mínima de evidência e conclusão inconclusiva quando apropriado.
- **Dependências:** personas sintéticas, regras de reporte e backend autoritativo.
- **Acessibilidade:** fluxo textual integral, sem foto ou aparência como informação necessária.
- **Risco principal:** obrigar o usuário a classificar o perfil quando a ação segura independe desse diagnóstico.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B avalia comportamento seguro sob identidade inconclusiva; A deve aparecer apenas como explicação tabular curta até existir componente de identidade reutilizável.
- **Vínculo recomendado:** missão de pedido sensível por perfil social.
- **Condição para avançar:** conteúdo sintético e processo independente de confirmação/reporte.

### Evidências no portal

- `SenderInspectorLab` e a Missão de conversa oferecem peças complementares, mas o portal não possui mapa genérico de identidade.

## `concept:new-number-scam` — Golpe do novo número

### Formato A — Contato em transição

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa, evidências e decisão de `CompromisedConversationMission`.
- **Trabalho novo:** múltiplas rotas independentes — número anterior, diretório ou contato comum — e atualização somente pelo processo oficial.
- **Dependências:** contatos e pessoas sintéticos; política para cadastro; backend autoritativo no uso real.
- **Acessibilidade:** transcrição integral e rotas em lista; nenhum áudio obrigatório ou dependência de bolhas visuais.
- **Risco principal:** ensinar que toda troca de número é golpe ou que uma pergunta secreta improvisada autentica a pessoa.

### Formato B — Grafo de contatos

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards e seletores dos laboratórios.
- **Trabalho novo:** relações de dependência entre rotas, eliminação das controladas pelo novo contato e alternativa em lista de adjacência.
- **Dependências:** casos sintéticos com independência inequívoca; backend autoritativo.
- **Acessibilidade:** lista/tabela é canônica; o grafo visual deve ser redundante e totalmente operável por teclado.
- **Risco principal:** complexidade espacial desnecessária e falsa certeza sobre quem controla cada caminho.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A pratica a ação segura de modo direto; B agrega valor apenas depois de um componente de proveniência compartilhado.
- **Vínculo recomendado:** missão conversacional de identidade em transição.
- **Condição para avançar:** catálogo de rotas alternativas e estado inconclusivo quando nenhuma estiver disponível.

### Evidências no portal

- A conversa já existe; `ARQUITETURA-ATUAL.md` registra a ausência de grafo/mapa de relações.

## `concept:angler-phishing` — Falso atendimento em rede social

### Formato A — A resposta chegou primeiro

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa, caixa de itens e navegação por fonte independente.
- **Trabalho novo:** fluxo social inteiramente simulado, respostas oportunistas e legítimas, minimização pública e verificação de protocolo oficial.
- **Dependências:** perfis e marca sintéticos; nenhuma publicação, link ou mensageria real; backend autoritativo.
- **Acessibilidade:** lista linear e textos alternativos; nenhuma imagem ou selo é necessário para decidir.
- **Risco principal:** usar rapidez, selo ou conhecimento do problema como prova de legitimidade/fraude.

### Formato B — Limpeza do chamado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** seleção múltipla e montagem de reporte de `RecoveryMission`.
- **Trabalho novo:** editor estruturado por trechos fictícios para remover dados excessivos e montar resumo mínimo; não pontuar texto livre por palavras.
- **Dependências:** política de dados e exemplos seguros; backend para tentativa autoritativa, sem conservar texto real.
- **Acessibilidade:** seleção também por checkboxes/lista, explicação de cada remoção e nenhum arrastar obrigatório.
- **Risco principal:** coletar dado real em campo livre ou ensinar que apagar postagem resolve toda exposição.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A cobre procedência do atendimento e B transfere para minimização; devem formar um único caso curto.
- **Vínculo recomendado:** missão social simulada com construtor de relato mínimo.
- **Condição para avançar:** conteúdo totalmente fictício e componente de minimização sem entrada livre persistida.

### Evidências no portal

- A conversa e montagem por checkboxes são reutilizáveis; não há rede social nem editor seguro genérico, que precisam continuar simulados/localizados.

## `concept:catfishing-honeytrap` — Relacionamento fabricado e armadilha afetiva

### Formato A — Relação em capítulos

- **Viabilidade:** Média.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Reuso possível:** conversa, stepper e resumo das Missões.
- **Trabalho novo:** narrativa longitudinal, controle de intensidade, saída/retomada e decisões acumuladas sem gamificar intimidade; persistência de rascunho se atravessar sessão.
- **Dependências:** revisão de segurança psicológica, diversidade e conteúdo sensível; backend para rascunho e privacidade no uso real.
- **Acessibilidade:** texto como formato primário, resumos por capítulo, aviso de conteúdo e alternativa equivalente menos intensa.
- **Risco principal:** estigmatizar vínculos, avaliar vulnerabilidade pessoal ou causar desconforto desnecessário.

### Formato B — Fronteiras de contexto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** grupos de opções, tabela e montagem de resposta existentes.
- **Trabalho novo:** classificador entre vida pessoal, processo profissional e conteúdo que não deve ser compartilhado, seguido de recusa/encaminhamento.
- **Dependências:** política de ativos profissionais e revisão psicológica; backend autoritativo.
- **Acessibilidade:** tabela e botões sem arraste, linguagem não moralizante e exemplos que não dependam de romance explícito.
- **Risco principal:** sugerir que relações pessoais são suspeitas ou invadir privacidade do participante.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina o limite observável com exposição menor. A permanece conteúdo posterior, opcional e condicionado a revisão especializada.
- **Vínculo recomendado:** caso opcional de fronteiras de contexto, sem player longitudinal inicialmente.
- **Condição para avançar:** revisão de segurança psicológica e mecanismo de saída sem prejuízo ou perda de progresso.

### Evidências no portal

- O portal não salva rascunho dentro de atividades nem possui controle de intensidade; B cabe em escolhas determinísticas já dominadas.

## `concept:virtual-meeting-bec` — Fraude corporativa em reunião virtual

### Formato A — Sala de decisão

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Mídia ou processo externo.
- **Reuso possível:** conversa, participantes, fontes progressivas e decisão de processo.
- **Trabalho novo:** sala simulada, mídia/transcrição/descrição, interrupção para consultar alçada e paridade de resultado entre mídia e texto.
- **Dependências:** produção audiovisual, direitos e consentimento; política financeira; hospedagem e backend autoritativos.
- **Acessibilidade:** transcrição, audiodescrição do que for relevante, versão somente texto completa e controles de mídia; nenhuma inferência por aparência.
- **Risco principal:** custo alto, mídia pouco convincente ou avaliação enganosa de “quem parece falso”.

### Formato B — Ata versus autorização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** comparação de documentos e fontes de `BankChangeChallenge`.
- **Trabalho novo:** ata estruturada, decisão alegada, cadastro e aprovações; identificação da aprovação ausente e encaminhamento.
- **Dependências:** processo financeiro e alçadas aprovados; documentos sintéticos; backend autoritativo.
- **Acessibilidade:** documentos HTML com cabeçalhos e comparação tabular/linear, sem PDF-imagem obrigatório.
- **Risco principal:** ensinar que ata nunca autoriza ou reproduzir um processo incompatível com a organização.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B preserva o ensinamento central — reunião não substitui alçada — com alta estabilidade. A só deve voltar após infraestrutura de mídia madura.
- **Vínculo recomendado:** estação de processo financeiro/BEC.
- **Condição para avançar:** fluxo corporativo aprovado; para A, prova de paridade audiovisual/textual, direitos e qualidade.

### Evidências no portal

- `BankChangeChallenge` suporta B; não existe qualquer player ou pipeline de mídia para A.

## `concept:voice-cloning` — Clonagem de voz

### Formato A — Duas vozes, a mesma decisão

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Mídia ou processo externo.
- **Reuso possível:** escolhas e debrief; a lógica pode ser demonstrada com transcrição.
- **Trabalho novo:** dois ativos de voz eticamente produzidos, reprodução acessível, transcrições equivalentes e revelação que não premie identificação do sintético.
- **Dependências:** voz sintética/atuada sem imitar pessoa real, direitos e consentimento, hospedagem e backend autoritativos.
- **Acessibilidade:** transcrição produz exatamente a mesma decisão e pontuação; controles completos e sem limite de tempo.
- **Risco principal:** virar teste auditivo, criar excesso de confiança ou usar voz sem consentimento.

### Formato B — Emergência com palavra combinada insuficiente

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** missão conversacional, seleção de rotas e resposta a pressão.
- **Trabalho novo:** múltiplas confirmações independentes, minimização de pistas dadas ao interlocutor e acionamento de ajuda apropriada.
- **Dependências:** conteúdo familiar/profissional sensível e procedimentos plausíveis; backend autoritativo.
- **Acessibilidade:** versão integral em texto, sem voz como evidência ou barreira.
- **Risco principal:** vender “palavra secreta” como solução única ou ensinar perguntas que expõem mais contexto ao atacante.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Formato B.
- **Justificativa:** clonagem é um limite técnico: o comportamento deve permanecer estável mesmo sem saber se a voz é real. B ensina isso dentro de um caso; A não justifica mídia agora.
- **Vínculo recomendado:** variação de vishing/emergência no debrief de identidade.
- **Condição para avançar:** avaliador baseado em confirmação independente, nunca em detecção vocal.

### Evidências no portal

- O portal já suporta o caso textual; mídia e transcrição sincronizada estão ausentes e não devem ser criadas para um teste de “ouvido”.

## `concept:deepfake-video` — Vídeo sintético e deepfake

### Formato A — Reunião sem prova biométrica

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Mídia ou processo externo.
- **Reuso possível:** decisão por processo, fontes e debrief; a versão textual pode conservar a mesma competência.
- **Trabalho novo:** vídeo seguro e convincente, transcrição, descrição, player e rota de alçada fora da reunião, com resultado independente da classificação da mídia.
- **Dependências:** produção especializada, direitos/consentimento, hospedagem, revisão de deepfake e backend autoritativo.
- **Acessibilidade:** equivalente textual completo, audiodescrição quando necessária e nenhuma pergunta sobre artefato visual.
- **Risco principal:** uso de rosto real, mídia de baixa qualidade ou inferência de que se pode autenticar pessoas por aparência.

### Formato B — Laboratório de limites

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Mídia ou processo externo.
- **Reuso possível:** evidências, escala de confiança e debrief dos laboratórios.
- **Trabalho novo:** corpus audiovisual controlado de compressão/iluminação/origem e explicações acessíveis, sem catálogo de “pistas”.
- **Dependências:** produção e direitos de vários ativos, validação especializada e backend autoritativo.
- **Acessibilidade:** descrição textual de cada variação e conclusão equivalente; não exigir visão nem audição.
- **Risco principal:** tornar defeitos de compressão em heurística de deepfake e reforçar falsa competência de detecção.

### Decisão preliminar

- **Destino:** Adiar.
- **Escolha:** Formato A.
- **Justificativa:** A mantém foco em processo e é o menos enganoso dos dois, mas nenhum formato audiovisual cabe na capacidade atual. O conceito pode existir antes como explicação/debrief textual em BEC.
- **Vínculo recomendado:** síntese de reunião/BEC, sem player próprio nesta fase.
- **Condição para avançar:** pipeline de mídia acessível, produção licenciada e teste que confirme ausência de pontuação por pista visual.

### Evidências no portal

- Não existe infraestrutura de vídeo; a decisão segura já pode ser ensinada com o processo de `BankChangeChallenge`, sem alegar detecção técnica.

## `concept:ai-polished-text` — Texto aprimorado por IA

### Formato A — Quatro textos, nenhuma certeza

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** cards de mensagens, evidências e decisão de PhishLab/Simulação.
- **Trabalho novo:** conjunto balanceado em que qualidade de escrita não coincide com legitimidade, acompanhado de origem, ação e processo verificáveis.
- **Dependências:** revisão linguística para evitar viés; conteúdo sintético; backend autoritativo.
- **Acessibilidade:** texto simples, estrutura semântica e nenhum efeito de tipografia como pista necessária.
- **Risco principal:** virar detector de autoria por IA, gramática, idioma ou nível educacional.

### Formato B — Editor de pedido plausível

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** formulários, evidências e resumo do portal.
- **Trabalho novo:** decompor mensagem em remetente, ação, ativo e alçada, investigar campos e recompor a decisão; sem geração de texto por IA.
- **Dependências:** modelo de campos e casos revisados; backend autoritativo.
- **Acessibilidade:** formulário linear, rótulos explícitos e resumo textual; ocultar aparência não pode remover contexto necessário.
- **Risco principal:** ensinar checklist rígido ou avaliar se o participante “detectou IA”.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Combinação.
- **Justificativa:** o conceito é princípio editorial transversal. A corrige a heurística de gramática e B oferece uma microinteração de análise, sem justificar player/recompensa próprios.
- **Vínculo recomendado:** variações de mensagens em PhishLab, Simulação e Missões.
- **Condição para avançar:** teste editorial que desassocie fluência, legitimidade e malícia em ambas as direções.

### Evidências no portal

- Os componentes atuais já renderizam mensagens e evidências; nenhuma integração com modelo de IA é necessária ou desejável para o ensinamento.

## `concept:multichannel-chain` — Cadeia multicanal

### Formato A — Ataque multicanal

- **Viabilidade:** Média.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Reuso possível:** conversas, cards, evidências, filtros e debrief de várias experiências.
- **Trabalho novo:** atividade composta com linha temporal, relação de controle entre transições, estado inconclusivo e resposta de contenção/reporte; contrato próprio ou motor declarativo compartilhado.
- **Dependências:** roteiro e corpus coerentes entre canais; backend para conteúdo, tentativa e agregação autoritativos.
- **Acessibilidade:** quadro sempre acompanhado de tabela cronológica e relações escritas; ordenação por botões e sem movimento indispensável.
- **Risco principal:** complexidade excessiva, atribuição causal sem evidência ou colagem de várias interfaces sem foco.

### Formato B — Simulador de interrupção

- **Viabilidade:** Média.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Reuso possível:** decisões por etapa, consequências e debrief causal.
- **Trabalho novo:** ramos determinísticos para callback oficial, dupla aprovação e reporte, preservando exposição residual e eventos para replay.
- **Dependências:** matriz de controles por cenário e backend autoritativo; não requer tempo real.
- **Acessibilidade:** caminhos em lista, revisão reversível e sem animação ou cronômetro.
- **Risco principal:** explosão combinatória de ramos e falsa impressão de que existe um único ponto correto de interrupção.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** é uma síntese valiosa após os canais básicos; A reconstrói a cadeia e B mostra defesa em camadas. Deve ser uma única atividade composta, não duas.
- **Vínculo recomendado:** família futura de investigação temporal e replay causal.
- **Condição para avançar:** componentes compartilhados de linha temporal/proveniência, motor de casos versionado e refatoração do shell de atividade.

### Evidências no portal

- Peças visuais existem dispersas, mas `LearningAttempt`, providers e reducer são uniatividade e fechados; combinar canais exige trabalho transversal G.

## `concept:false-cross-channel-corroboration` — Falsa corroboração entre canais

### Formato A — Árvore de dependência

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** evidências e seletores dos laboratórios.
- **Trabalho novo:** árvore/tabela de origem entre mensagens, números, perfis e reuniões, identificação de raiz comum e adição de fonte independente.
- **Dependências:** casos editoriais com controle conhecido; backend autoritativo.
- **Acessibilidade:** lista hierárquica e tabela de origem são canônicas; linhas e posição visual são redundantes.
- **Risco principal:** grafo inacessível ou representação que declara controle sem base observável.

### Formato B — Três confirmações, uma pessoa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** narrativa por etapas, conversa e escolha de rota das Missões.
- **Trabalho novo:** sequência e-mail/chamada/reunião, oportunidade de sair pelo cadastro anterior e debrief da autorreferência.
- **Dependências:** artefatos sintéticos e processo de confirmação; backend autoritativo.
- **Acessibilidade:** história integral em texto, canais identificados por rótulo e controles por teclado.
- **Risco principal:** contar canais como indício de fraude em vez de analisar dependência.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** B entrega um caso viável agora; A consolida o modelo mental e pode integrar o debrief quando o componente de proveniência existir.
- **Vínculo recomendado:** caso multicanal com painel textual de dependências.
- **Condição para avançar:** B com saída independente explícita; A somente como componente acessível reutilizável.

### Evidências no portal

- A narrativa cabe no shell atual; a árvore é uma das capacidades ausentes registradas em `ARQUITETURA-ATUAL.md`.

## `concept:platform-migration` — Migração induzida de plataforma

### Formato A — O que ficou para trás

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** comparação de fontes, escolhas e debrief.
- **Trabalho novo:** tabela de identidade, histórico, moderação, registro e política antes/depois de cada mudança, com ação de permanecer, validar ou encerrar.
- **Dependências:** conteúdo agnóstico de marca e regras corporativas; backend autoritativo.
- **Acessibilidade:** comparação tabular e linear; ícones de aplicativos não são necessários.
- **Risco principal:** ensinar “nunca mude de canal” ou supor que uma plataforma é sempre segura.

### Formato B — Corrida de canais sem corrida

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa longitudinal, stepper e pausa PARE.
- **Trabalho novo:** múltiplas superfícies textuais, histórico preservado, controle de ritmo e decisão acumulada; possível rascunho se longa.
- **Dependências:** narrativa e interfaces agnósticas; backend para retomada no uso real.
- **Acessibilidade:** sem cronômetro, transcrição unificada, navegação reversível e rótulo textual de cada canal.
- **Risco principal:** sobrecarregar com imitações de interface ou medir navegação em vez de revalidação.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A isola a competência com clareza e menor custo; B pode fornecer um caso curto depois, sem tentar reproduzir várias plataformas.
- **Vínculo recomendado:** laboratório de fronteira e controles de canal.
- **Condição para avançar:** matriz agnóstica de controles e inclusão de migrações legítimas.

### Evidências no portal

- Tabelas e escolhas são locais; uma narrativa longa entre múltiplas interfaces exigiria estado e conteúdo além do contrato atual.

## `concept:prompt-injection-assistant` — Injeção de instruções em assistente

### Formato A — Fonte, instrução e autoridade

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** fontes, evidências, stepper e debrief dos laboratórios.
- **Trabalho novo:** fluxo fictício que separe pedido do usuário, conteúdo consultado, resposta do assistente e ação autorizada; diagrama com lista equivalente.
- **Dependências:** revisão de segurança de IA e explicação de responsabilidade técnica; nenhum assistente real; backend autoritativo.
- **Acessibilidade:** lista ordenada canônica e relações textuais; diagrama dispensável.
- **Risco principal:** transferir ao usuário a obrigação de encontrar instrução invisível ou tratar erro comum como ataque.

### Formato B — Porta de autorização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** escolhas de processo e fontes progressivas de `BankChangeChallenge`.
- **Trabalho novo:** proposta fictícia de enviar, apagar, pagar ou compartilhar; revisão de fonte, escopo e destinatário antes de aprovar, editar, recusar ou escalar.
- **Dependências:** política de autorização e revisão especializada; nenhuma ação, integração ou dado real; backend e controles técnicos obrigatórios antes de qualquer uso real.
- **Acessibilidade:** formulário textual, foco previsível e consequência descrita; nenhum controle real ativável.
- **Risco principal:** fazer a simulação parecer barreira suficiente ou autorizar ação real pelo frontend.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A explica o limite de forma honesta e B pratica revisão de consequência. O conceito não deve virar caça a texto malicioso nem substituir controles técnicos.
- **Vínculo recomendado:** explicação curta seguida de estação inerte de autorização.
- **Condição para avançar:** revisão de Segurança/IA, separação explícita entre demonstração e controle real e nenhum efeito externo.

### Evidências no portal

- O portal suporta decisões determinísticas, mas não possui assistente ou integração. `app/providers.tsx` declara estado local não autoritativo, incompatível com autorizar ações reais.
