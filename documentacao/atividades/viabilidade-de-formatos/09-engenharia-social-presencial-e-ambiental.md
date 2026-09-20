# Viabilidade de formatos — engenharia social presencial e ambiental

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Escopo:** desktop, sobre o portal local e não autoritativo de 2026-08-11.

**Bases:** [estudo canônico do conjunto 09](../estudos-de-formatos/09-engenharia-social-presencial-e-ambiental.md) e [inventário da arquitetura atual](ARQUITETURA-ATUAL.md).

Os formatos físicos podem ser ensinados por cenas, documentos e processos fictícios, mas a correção depende das regras reais de acesso, recepção, descarte e custódia da organização. Aparência, sotaque, roupa, deficiência, nervosismo ou proximidade nunca podem compor a nota. Nenhuma atividade deve conectar mídia, escanear QR, abrir destino, simular confronto ou registrar pessoa/objeto real. Backend autoritativo permanece obrigatório antes do uso real.

## `concept:physical-pretexting` — Pretexto presencial

### Formato A — Balcão de encaminhamento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa textual, fontes e escolhas das Missões e de `BankChangeChallenge`.
- **Trabalho novo:** perguntas mínimas, agenda/diretório fictício, patrocinador, área de espera e encaminhamento sem confronto.
- **Dependências:** política de recepção/acesso, responsáveis e exceções aprovadas; backend para publicar a versão vigente.
- **Acessibilidade:** diálogo e descrição da cena em texto, sem tempo, mapa espacial ou aparência necessária à resposta.
- **Risco principal:** perfilar visitante ou ensinar processo físico incompatível com o local.

### Formato B — Painel de alegações presenciais

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** evidências, seletores e conclusão inconclusiva dos laboratórios.
- **Trabalho novo:** tabela de identidade alegada, tarefa, local, urgência e evidência independente; lacunas críticas e rota segura.
- **Dependências:** modelo de alegações e fontes autorizadas; backend autoritativo.
- **Acessibilidade:** tabela/lista com relações e estado textual, sem arraste.
- **Risco principal:** confundir coerência narrativa com autorização ou exigir certeza sobre intenção.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A pratica acolhimento e encaminhamento; B torna explícita a diferença entre história plausível e evidência. B cabe como painel/debrief de A.
- **Vínculo recomendado:** missão de recepção orientada por função.
- **Condição para avançar:** revisão de Segurança Física/Facilities e parametrização do procedimento por local.

### Evidências no portal

- Conversas, fontes e decisões já existem; não há diretório ou agenda integrados, portanto o protótipo deve usar conteúdo fictício.

## `concept:physical-impersonation` — Personificação presencial

### Formato A — Ordem de serviço

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** reconciliação de registros e fontes progressivas de `BankChangeChallenge`.
- **Trabalho novo:** documentos estruturados de pessoa, tarefa, equipamento, horário e responsável; ações de espera, acompanhamento ou apoio.
- **Dependências:** ordens e política de exceção corporativas; documentos sintéticos; backend autoritativo.
- **Acessibilidade:** documentos HTML e tabela comparativa, sem imagem de crachá/uniforme necessária.
- **Risco principal:** tratar ausência de crachá como fraude ou ordem de serviço como autenticação suficiente.

### Formato B — Papéis trocados

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** triagem de casos legítimos, suspeitos e inconclusivos das simulações.
- **Trabalho novo:** quatro visitantes descritos sem estereótipos, consulta a registros e tratamento proporcional.
- **Dependências:** revisão de diversidade e Segurança Física; backend autoritativo.
- **Acessibilidade:** personagens e dados relevantes em texto; imagens, roupa e expressão não informam a resposta.
- **Risco principal:** introduzir viés por descrição ou fazer o participante buscar uma “pessoa suspeita”.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina o processo completo; B é útil como conjunto de falsos positivos dentro da mesma atividade, não como player próprio.
- **Vínculo recomendado:** estação de manutenção/visita com casos comparativos.
- **Condição para avançar:** procedimento oficial e revisão contra perfilamento.

### Evidências no portal

- `BankChangeChallenge` fornece o padrão de reconciliação; `WorkdaySimulation` demonstra triagem balanceada e penalização de falso positivo.

## `concept:elicitation` — Elicitação de informação

### Formato A — Conversa por camadas

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa progressiva e evidências de `CompromisedConversationMission`.
- **Trabalho novo:** inventário cumulativo de fragmentos pedidos, respostas de minimização e encaminhamento a fonte pública/autorizada.
- **Dependências:** classificação de informação por função e roteiro que não exponha contexto real; backend autoritativo.
- **Acessibilidade:** transcrição completa, revisão livre e ausência de áudio, tempo ou julgamento de sociabilidade.
- **Risco principal:** estigmatizar conversa informal ou fornecer um roteiro real de coleta de informação.

### Formato B — Quebra-cabeça do outro lado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, seleção múltipla e debrief.
- **Trabalho novo:** agrupamento por seletores de fragmentos fictícios, distinção entre fato e inferência e correção de respostas.
- **Dependências:** exemplos abstratos/sintéticos e revisão de Segurança; backend autoritativo.
- **Acessibilidade:** agrupamento por botões e resultado em texto; nenhuma montagem espacial obrigatória.
- **Risco principal:** ensinar ao participante como reconstruir estrutura real ou tratar toda inferência como fato.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A pratica limite durante a conversa; B demonstra por que pequenos fragmentos importam. A sequência oferece causa e consequência observáveis.
- **Vínculo recomendado:** missão conversacional com debrief de agregação.
- **Condição para avançar:** conteúdo fictício revisado para não revelar ativos ou estruturas reais.

### Evidências no portal

- A conversa é reutilizável; a agregação exige componente local e resposta nova, mas não grafo nem integração externa.

## `concept:social-mining` — Mineração social

### Formato A — Mosaico de contexto

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, evidências e filtros existentes.
- **Trabalho novo:** relações entre publicação, agenda, foto e conversa, marcação de fato versus inferência e alternativa tabular completa.
- **Dependências:** artefatos inteiramente fictícios e revisão de Privacidade; backend autoritativo.
- **Acessibilidade:** tabela de relações como formato canônico; mosaico visual é opcional e não depende de imagens.
- **Risco principal:** vigilância da vida pessoal, culpabilização da vítima ou grafo inacessível.

### Formato B — Publicar com intenção

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** montagem por opções e seleção de detalhes de `RecoveryMission`.
- **Trabalho novo:** editor estruturado de comunicação fictícia para escolher público, remover detalhe desnecessário e preservar finalidade; sem texto/foto real.
- **Dependências:** política de publicação e privacidade; backend sem conservar conteúdo livre real.
- **Acessibilidade:** texto estruturado, descrição equivalente de elementos visuais e controles por checkbox/botão.
- **Risco principal:** ensinar silêncio total, coletar postagem real ou fazer da privacidade responsabilidade exclusiva da vítima.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B produz comportamento cotidiano com menor complexidade; A pode aparecer como debrief tabular para mostrar efeito cumulativo.
- **Vínculo recomendado:** oficina de minimização ligada a privacidade e elicitação.
- **Condição para avançar:** casos sintéticos e revisão de Privacidade/Comunicação.

### Evidências no portal

- Seleção e montagem existem; mapa de informações não existe e só se justifica como componente reutilizável, não como visual isolado.

## `concept:physical-quid-pro-quo` — Troca de favor presencial

### Formato A — Ajuda com contrapartida

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** diálogo progressivo e decisão das Missões.
- **Trabalho novo:** favor inicial, mudança de escopo, limite profissional e encaminhamento, com exemplos legítimos e indevidos.
- **Dependências:** política de acesso, brindes e suporte; revisão de linguagem; backend autoritativo.
- **Acessibilidade:** cena textual, sem pressão temporal ou pistas de aparência.
- **Risco principal:** ensinar hostilidade, proibir ajuda legítima ou sugerir que gentileza cria suspeita.

### Formato B — Troca permitida ou processo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** tabela, grupos de opções e estado inconclusivo dos laboratórios.
- **Trabalho novo:** classificar ativo e limite como “pode decidir”, “exige autorização” ou “inconclusivo”, com justificativa por procedimento.
- **Dependências:** matriz corporativa por função; backend para versão e avaliação válidas.
- **Acessibilidade:** tabela e botões com rótulos, sem classificação apenas por cor.
- **Risco principal:** simplificar uma política contextual em lista universal.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A ensaia a mudança social e B controla falsos positivos, deixando claro que o ativo e a autoridade — não o favor — determinam o limite.
- **Vínculo recomendado:** caso conversacional com painel de alçada.
- **Condição para avançar:** matriz de decisões aprovada e casos positivos de colaboração legítima.

### Evidências no portal

- Conversas e escolhas são base forte; a matriz precisa ser declarativa e versionada para não ficar codificada no componente.

## `concept:usb-baiting` — Isca com mídia USB

### Formato A — Objeto encontrado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** seleção de ação imediata, resposta e reporte de `RecoveryMission`.
- **Trabalho novo:** objeto apenas descrito, registro mínimo de local/contexto, isolamento e destinatário responsável; nenhuma inspeção técnica.
- **Dependências:** processo corporativo de mídia encontrada; nenhum USB real; backend autoritativo para registro real.
- **Acessibilidade:** descrição textual e formulário linear; não exigir visão, manipulação física ou arrastar.
- **Risco principal:** participante tentar conectar/analisar objeto ou procedimento fictício orientar manuseio inseguro.

### Formato B — Aparência não é diagnóstico

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** cards comparativos, mesma decisão e revelação em debrief.
- **Trabalho novo:** mídias descritas de modo semelhante com histórias diferentes, todas exigindo o processo seguro.
- **Dependências:** representações sintéticas e revisão técnica; backend autoritativo.
- **Acessibilidade:** descrições integrais; imagem e rótulo são dispensáveis à decisão.
- **Risco principal:** deixar uma pista estética e transformar o limite em diagnóstico visual.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A ensina custódia e B corrige confiança na aparência; o conceito deve ser caso da família de mídia removível, não player separado.
- **Vínculo recomendado:** estação de custódia de mídia.
- **Condição para avançar:** procedimento oficial e proibição técnica/editorial de conexão, upload ou exame de conteúdo.

### Evidências no portal

- `RecoveryMission` acomoda ações e reporte; o portal não possui upload ou acesso a dispositivo, ausência que deve ser preservada.

## `concept:tailgating` — Entrada por acompanhamento

### Formato A — A porta também é um canal

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** cena conversacional, escolhas e debrief das Missões.
- **Trabalho novo:** casos de aproximação, mãos ocupadas, uniforme e falha alegada, com orientação à recepção e chamada de apoio.
- **Dependências:** política física por local, emergência e acessibilidade; backend autoritativo.
- **Acessibilidade:** descrição textual completa e opções sem tempo/reflexo; nenhuma planta é necessária para pontuar.
- **Risco principal:** incentivar bloqueio físico, toque, perseguição, confronto ou perfilamento.

### Formato B — Sequência de acesso

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** stepper, cards e resultado de atividades de processo.
- **Trabalho novo:** ordenação acessível de autenticação, espera, acompanhante e registro para visitante, colega e emergência.
- **Dependências:** procedimentos configuráveis por local; backend para versão válida.
- **Acessibilidade:** mover por botões e lista numerada; sem drag-and-drop obrigatório.
- **Risco principal:** apresentar uma única sequência como válida para todos os edifícios e emergências.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A ensaia a pressão social e a frase segura; B consolida rotas legítimas diferentes. Podem ser etapas da mesma atividade orientada por função.
- **Vínculo recomendado:** missão de acesso físico com estação de processo.
- **Condição para avançar:** validação de Segurança Física e linguagem que exclua confronto corporal.

### Evidências no portal

- Missões suportam a cena; não há ordenação acessível compartilhada, mas o componente serviria também a custódia e resposta a incidente.

## `concept:shoulder-surfing` — Observação indevida de tela ou entrada

### Formato A — Campo de visão

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, opções e debrief.
- **Trabalho novo:** representação espacial de posição, tela e momento de autenticação, acompanhada de modelo textual equivalente e alternativas para diferentes necessidades físicas.
- **Dependências:** revisão de Segurança Física e Acessibilidade; cenários sintéticos; backend autoritativo.
- **Acessibilidade:** relações espaciais em frases/tabela e decisões equivalentes; não avaliar acuidade visual nem exigir mapa.
- **Risco principal:** planta inacessível, recomendação capacitista ou associação entre proximidade e intenção.

### Formato B — Rotina interrompida

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** narrativa em etapas, escolha imediata e resposta proporcional de Missões/Recuperação.
- **Trabalho novo:** cenas de senha, documento e chamada, com pausar/ocultar/reposicionar/adiar e reporte somente quando fundamentado.
- **Dependências:** política de telas e espaços; revisão de acessibilidade; backend autoritativo.
- **Acessibilidade:** cenas em texto, sem tempo, movimento, visão periférica ou gesto obrigatório.
- **Risco principal:** incentivar acusação de quem está próximo ou assumir que toda pessoa consegue reposicionar corpo/equipamento.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B mede recuperação segura sem depender de habilidade espacial. A pode permanecer como explicação opcional quando houver componente acessível comprovado.
- **Vínculo recomendado:** caso curto de rotina em espaço compartilhado.
- **Condição para avançar:** revisão com Acessibilidade e conjunto de respostas equivalentes para diferentes capacidades e ambientes.

### Evidências no portal

- Narrativa e escolhas já existem; planta/mapa espacial é capacidade ausente registrada em `ARQUITETURA-ATUAL.md`.

## `concept:dumpster-diving` — Recuperação de informação descartada

### Formato A — Estação de descarte

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** classificadores, opções e resultado das atividades atuais.
- **Trabalho novo:** artefatos fictícios classificados por conteúdo/suporte e destinos de descarte comum, destruição segura, devolução, retenção ou exceção.
- **Dependências:** política de retenção, descarte e mídia; backend para versão vigente, sem dados reais.
- **Acessibilidade:** tabela com botões, sem recipientes por arraste ou cor como classificação.
- **Risco principal:** orientar descarte ilegal/inadequado ou aplicar política genérica a materiais regulados.

### Formato B — Depois do descarte

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** debrief causal, escolhas de contenção e reporte.
- **Trabalho novo:** consequências fictícias e inferências possíveis após uma decisão, sem simular busca ou recuperação de resíduos.
- **Dependências:** conteúdo aprovado e abstrato; backend autoritativo.
- **Acessibilidade:** consequências em lista textual; nenhuma imagem de resíduo necessária.
- **Risco principal:** fornecer demonstração indevida de reconstrução ou incentivar manuseio posterior.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A pratica a decisão antes do descarte; B funciona melhor como debrief da consequência, não como mecânica separada.
- **Vínculo recomendado:** estação de ciclo de vida da informação.
- **Condição para avançar:** política oficial de retenção/descarte por categoria e revisão jurídica/Segurança.

### Evidências no portal

- O portal suporta escolhas determinísticas e debrief, mas um catálogo corporativo precisa ser externo ao componente e versionado.

## `concept:badge-photo-exposure` — Exposição de crachá em fotografia

### Formato A — Foto antes de publicar

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Mídia ou processo externo.
- **Reuso possível:** evidências, escolhas e comparação antes/depois.
- **Trabalho novo:** imagens totalmente sintéticas, descrição completa, controles fictícios de recorte/ocultação/público e alternativa textual com a mesma decisão.
- **Dependências:** produção visual, direitos e revisão de Privacidade/Marca; nenhuma foto real ou reconhecimento; backend autoritativo.
- **Acessibilidade:** descrição revela todos os elementos relevantes e formulário oferece decisões equivalentes; não pontuar rapidez para localizar o crachá.
- **Risco principal:** exposição de pessoa/dado real, atividade de “caça visual” ou ensino de clonagem por ampliação.

### Formato B — Mosaico de uma semana

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, filtros e comparação de fatos/evidências.
- **Trabalho novo:** publicações fictícias ao longo do tempo, distinção entre fato e inferência e escolha de detalhes a remover/adiar.
- **Dependências:** corpus sintético e revisão de Privacidade; backend autoritativo.
- **Acessibilidade:** tabela cronológica e relações escritas são canônicas; imagens são opcionais.
- **Risco principal:** vigilância pessoal, culpabilização ou inferência apresentada como certeza.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina risco cumulativo com menor dependência de mídia e pode integrar mineração social; A pode virar microcaso posterior com ativos sintéticos.
- **Vínculo recomendado:** oficina de minimização/publicação, sem player autônomo.
- **Condição para avançar:** revisão de Privacidade e garantia de que nenhum conteúdo real seja carregado ou persistido.

### Evidências no portal

- Cards e tabelas são reutilizáveis; não há editor de imagem/upload e essa ausência deve ser preservada no protótipo.

## `concept:physical-qr-tampering` — Adulteração física de QR Code

### Formato A — Placa sob custódia

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** inspeção de contexto e evidências dos laboratórios.
- **Trabalho novo:** representação não funcional da placa, responsável pelo suporte, alteração/contexto e confirmação por canal independente.
- **Dependências:** casos sintéticos, processo de Facilities/Segurança e nenhum QR escaneável; backend autoritativo.
- **Acessibilidade:** descrição textual de todos os sinais; QR é decoração inerte e nunca precisa ser visto ou lido.
- **Risco principal:** aparência de adesivo virar prova de fraude ou artefato abrir destino real.

### Formato B — Resolver sem o código

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** navegação por fonte independente de smishing/callback e etapas de `BankChangeChallenge`.
- **Trabalho novo:** rota alternativa por terminal, aplicativo ou endereço fictício e comparação de destino, valor ou serviço.
- **Dependências:** procedimento específico por uso; nenhum pagamento, câmera, login ou formulário real; backend autoritativo.
- **Acessibilidade:** navegação textual completa e nenhuma câmera/leitura de QR.
- **Risco principal:** reproduzir tela real ou fazer a rota alternativa parecer universal.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A cobre custódia do suporte e B prova que a necessidade pode ser resolvida sem confiar no objeto. Juntos evitam “detecção por adesivo”.
- **Vínculo recomendado:** laboratório de contexto físico com estação de processo.
- **Condição para avançar:** validação do procedimento e teste automatizado/manual de que nenhum QR ou destino seja acionável.

### Evidências no portal

- Evidências e etapas já existem; o portal não possui câmera ou scanner e não precisa adquiri-los para este ensinamento.

## `concept:removable-media-custody` — Cadeia de custódia de mídia removível

### Formato A — Estação de custódia

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** formulário, fontes progressivas e montagem de reporte.
- **Trabalho novo:** campos fictícios de origem, estado, local, responsável e transferência, com minimização e confirmação do destinatário.
- **Dependências:** processo oficial e público orientado por função; backend obrigatório para qualquer registro real; protótipo sem mídia/dado real.
- **Acessibilidade:** formulário linear, ajuda contextual, erros associados aos campos e nenhuma assinatura física simulada necessária.
- **Risco principal:** criar registro local que pareça cadeia de custódia real ou pedir informação sensível desnecessária.

### Formato B — Linha do tempo da passagem de responsabilidade

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, debrief e ações de contenção/reporte.
- **Trabalho novo:** ordenação acessível de eventos, marcação de lacuna de custódia e correção sem atribuição de culpa.
- **Dependências:** exemplos e resposta oficial a lacunas; backend autoritativo para uso real.
- **Acessibilidade:** ordenar por botões e tabela cronológica, com estado textual da lacuna.
- **Risco principal:** simular prova forense, acusar pessoa ou tratar sequência fictícia como procedimento legal.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A pratica registro e encaminhamento; B testa rastreabilidade e transparência. A família deve ser oferecida apenas a funções relevantes.
- **Vínculo recomendado:** atividade de processo de mídia removível, compartilhada com USB baiting.
- **Condição para avançar:** procedimento oficial, responsável definido e distinção visível entre treinamento fictício e registro operacional.

### Evidências no portal

- Formulários, choices e debrief são reutilizáveis; para registro real, o estado local e não autoritativo de `app/providers.tsx` e `persistence.ts` é insuficiente.
