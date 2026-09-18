# Viabilidade de formatos — Identidade, remetente e contas

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Base:** portal local inspecionado em 2026-08-11; escopo desktop. Adaptação móvel permanece posterior.

Todos os nomes, endereços, diretórios, contas, conversas e registros propostos abaixo seriam sintéticos e inertes. Nenhum formato consultaria correio, identidade ou nuvem reais. A classificação considera a demonstração local atual; backend autoritativo continua obrigatório antes de progresso, avaliação ou recompensa em uso real. A base pedagógica e as fontes oficiais de cada conceito permanecem no [estudo de formatos correspondente](../estudos-de-formatos/02-identidade-remetente-e-contas.md).

## `concept:identity-display-name` — Nome exibido, foto e cargo

### Formato A — Cartão de identidade em camadas

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartão de mensagem, ferramentas reveláveis, caso guiado/independente, rádios e debrief de `SenderInspectorLab`.
- **Trabalho novo:** tornar foto, cargo e nome camadas declarativas; permitir atribuir peso a cada evidência; acrescentar casos legítimos e inconclusivos, avaliador e testes de falso positivo.
- **Dependências:** perfis e políticas fictícios revisados; contrato versionado e backend autoritativo no uso real.
- **Acessibilidade:** cada camada precisa de rótulo e texto equivalente; foto, cor ou posição não podem carregar a resposta.
- **Risco principal:** ensinar que um campo isolado prova fraude ou medir reconhecimento visual em vez de confirmação.

### Formato B — Dois Alex, um pedido

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** lista de mensagens da Simulação, cartões selecionáveis e decisão revisável.
- **Trabalho novo:** mini-diretório estático, comparação entre homônimos, ação por caso e feedback que aceite “preciso confirmar”.
- **Dependências:** diretório exclusivamente fictício, conteúdo balanceado e backend autoritativo para registro real.
- **Acessibilidade:** nomes repetidos devem ser diferenciados por endereço, função e identificador textual, nunca apenas por avatar.
- **Risco principal:** transformar homonímia em suspeita automática ou fazer o diretório cenográfico parecer corporativo.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** aprofunda diretamente o PhishLab existente e pode receber B como transferência, sem justificar dois players.
- **Vínculo recomendado:** evolução de “Quem enviou de verdade?”.
- **Condição para avançar:** extrair campos de identidade para conteúdo declarativo e definir casos legítimos, suspeitos e inconclusivos.

### Evidências no portal

- `features/phishlab/SenderInspectorLab.tsx` já revela `displayName`, `fromAddress`, `replyTo` e contexto, mas usa apenas dois casos fixos.
- `lib/domain/types.ts` registra ferramentas usadas e evidências; um peso explícito exigiria extensão de contrato, regras, persistência e testes.

## `concept:identity-from` — Endereço completo e campo `From`

### Formato A — Mapa de quem declarou o quê

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** campos do inspetor, botões de evidência e debrief causal.
- **Trabalho novo:** mapa de relações acessível entre nome, `From`, conta alegada e pessoa confirmada; seleção por lista, contrato relacional e avaliador.
- **Dependências:** modelo editorial de identidade, conteúdo sintético e backend autoritativo no uso real.
- **Acessibilidade:** o grafo visual precisa de representação linear completa com relações anunciadas e operação por teclado.
- **Risco principal:** sugerir que o `From` visível revela controle humano ou criar um diagrama difícil de compreender.

### Formato B — Conferência antes de responder

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de mensagem e referência conhecida da Missão e do desafio bancário; decisões por rádio.
- **Trabalho novo:** histórico/diretório fictício, pares de endereço esperado e recebido e feedback proporcional.
- **Dependências:** referência estática aprovada e backend autoritativo para qualquer avaliação real.
- **Acessibilidade:** tabela linearizável com endereços completos e instrução para não depender de truncamento visual.
- **Risco principal:** ensinar igualdade de endereço como autorização suficiente diante de conta comprometida.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B mede a ação segura com baixo custo; A vale como componente compartilhado apenas quando houver vários conceitos relacionais.
- **Vínculo recomendado:** caso independente do PhishLab de identidade.
- **Condição para avançar:** separar “conta declarada”, “conta esperada” e “controle confirmado” no modelo de conteúdo.

### Evidências no portal

- `SenderInspectorLab` já mostra o endereço completo e conclui corretamente que ele identifica a conta usada, não quem a controla.
- Não existe componente compartilhado de relações; criá-lo atravessaria resposta, avaliador e persistência.

## `concept:identity-reply-to` — `Reply-To` diferente

### Formato A — Prévia do destino da resposta

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** ferramenta `replyTo`, cartão de mensagem e achados progressivos do inspetor.
- **Trabalho novo:** prévia inerte de resposta, comparação explícita entre origem e destino e casos em que a diferença é legítima.
- **Dependências:** corpus fictício de centrais, listas e terceiros; backend autoritativo no uso real.
- **Acessibilidade:** anunciar em texto “a resposta iria para”, sem depender de setas, cor ou alinhamento.
- **Risco principal:** converter qualquer divergência em veredito malicioso.

### Formato B — Central ou pessoa?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** triagem em lote, mensagens revisáveis e relatório final da Simulação.
- **Trabalho novo:** casos de caixa compartilhada, ticket, lista e desvio suspeito, com ação segura por item.
- **Dependências:** procedimentos sintéticos ou aprovados e backend autoritativo para progresso real.
- **Acessibilidade:** campos completos em `dl`/tabela e classificação por rádio; nenhum endereço deve ser ocultado por elipse.
- **Risco principal:** penalizar fluxos legítimos de atendimento centralizado.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A explica o mecanismo e B controla falsos positivos em contexto; cabem no mesmo ciclo guiado/independente.
- **Vínculo recomendado:** estação de identidade do PhishLab, com transferência em caixa mista.
- **Condição para avançar:** catalogar motivos legítimos e suspeitos para divergência e aceitar resposta inconclusiva.

### Evidências no portal

- `SenderInspectorLab` já possui `replyTo`, inclusive caso igual que não prova segurança.
- `WorkdaySimulation` já suporta vários itens e revisão, mas seu catálogo e contrato precisariam incluir `Reply-To` como evidência própria.

## `concept:identity-spoofing` — Spoofing do remetente

### Formato A — O que a tela não prova

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cartões de fato, escolhas múltiplas e debrief do PhishLab.
- **Trabalho novo:** matriz curta de afirmações e limites, com feedback que distingue aparência, origem técnica e controle humano.
- **Dependências:** revisão técnica do conteúdo; nenhum cabeçalho real ou detector; backend autoritativo no uso real.
- **Acessibilidade:** tabela simples com cabeçalhos e estado textual de cada conclusão.
- **Risco principal:** prometer que o usuário consegue detectar tecnicamente spoofing pela interface comum.

### Formato B — Três origens, mesma aparência

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartões de mensagens, comparação de campos e vereditos legítimo/suspeito/inconclusivo.
- **Trabalho novo:** três artefatos sintéticos com aparência equivalente, evidências disponíveis diferentes e ação por caso.
- **Dependências:** conteúdo tecnicamente revisado; sinais técnicos devem ser fornecidos como fatos, não calculados no cliente; backend autoritativo no uso real.
- **Acessibilidade:** descrições equivalentes da aparência e lista dos fatos; a semelhança visual não pode ser requisito.
- **Risco principal:** fazer o aluno adivinhar uma origem invisível ou decorar o caso.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Combinação.
- **Justificativa:** A deve estabelecer o limite; B só é válida quando cada decisão usa evidências observáveis e aceita incerteza.
- **Vínculo recomendado:** explicação e transferência dentro de “Quem enviou de verdade?”, não player próprio.
- **Condição para avançar:** escrever explicitamente quais fatos são observáveis e quais pertencem aos controles técnicos.

### Evidências no portal

- O resultado do inspetor já afirma que nome exibido pode ser falsificado e que conta correta também pode estar comprometida.
- Não há parser de cabeçalhos nem serviço de correio; qualquer detecção automática seria falsa no portal atual.

## `concept:identity-external-marker` — Aviso de remetente externo ou não verificado

### Formato A — Evidência com peso, não carimbo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** seleção de evidências e razões das Missões.
- **Trabalho novo:** controle de peso/confiança, casos com marcador presente e ausente e avaliação do conjunto de sinais.
- **Dependências:** marcador exclusivamente fictício, regras editoriais e backend autoritativo no uso real.
- **Acessibilidade:** peso expresso por texto/escala rotulada; não depender de cor, ícone ou posição do banner.
- **Risco principal:** transformar aviso em prova de fraude ou ausência em prova de segurança.

### Formato B — Caixa mista de parceiros

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** caixa de entrada, ações revisáveis e métrica de falsos positivos da Simulação.
- **Trabalho novo:** mensagens internas e externas legítimas, suspeitas e inconclusivas com marcador variado.
- **Dependências:** casos balanceados e política fictícia; backend autoritativo para avaliação real.
- **Acessibilidade:** banner anunciado no cartão e no leitor, sem substituir os demais campos.
- **Risco principal:** penalizar colaboração legítima com terceiros ou premiar resposta baseada só no banner.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** a caixa mista mede uso contextual e já possui proteção contra falsos positivos; A pode ser instrução curta.
- **Vínculo recomendado:** pacote de Simulação, não estação exclusiva.
- **Condição para avançar:** assegurar distribuição balanceada do marcador e não torná-lo preditor da classe.

### Evidências no portal

- `WorkdaySimulation` já mede falsos positivos e posterga feedback até o fim.
- O modelo `SimulationMessage` teria de ganhar o marcador como dado versionado, sem integração com e-mail real.

## `concept:identity-authentication-limits` — Limites de SPF, DKIM e DMARC

### Formato A — Camadas de proteção

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cards, tabelas e debrief já existentes.
- **Trabalho novo:** interação de limites: o que cada camada reduz e o que não autoriza, sem pedir interpretação de cabeçalho.
- **Dependências:** revisão técnica e atualização editorial; backend não é necessário para a explicação, mas é obrigatório para resultado real.
- **Acessibilidade:** tabela textual de “ajuda a”/“não prova”, navegável por cabeçalhos.
- **Risco principal:** simplificar controles de domínio a um selo de mensagem segura.

### Formato B — Autenticado, mas não autorizado

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa comprometida, decisão e debrief causal da Missão existente.
- **Trabalho novo:** acrescentar fatos técnicos fornecidos e perguntar sobre o pedido/processo, não sobre configuração de protocolo.
- **Dependências:** cenário sintético revisado; nenhum cálculo de SPF/DKIM/DMARC no cliente; backend autoritativo no uso real.
- **Acessibilidade:** fatos apresentados em texto simples, com expansão opcional de termos.
- **Risco principal:** avaliar conhecimento de siglas em vez de comportamento seguro.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Combinação.
- **Justificativa:** o limite técnico é importante como explicação, enquanto B transfere para a decisão já coberta por conta comprometida.
- **Vínculo recomendado:** debrief da Missão e material opcional do PhishLab/Radar.
- **Condição para avançar:** revisão técnica e linguagem que não atribua detecção invisível ao funcionário.

### Evidências no portal

- `CompromisedConversationMission` já apresenta conta e endereço verdadeiros sem autorizar o novo pedido.
- O portal não recebe cabeçalhos nem resultados de autenticação; um “teste” técnico seria cenográfico.

## `concept:account-compromise` — Conta legítima comprometida

### Formato A — Antes e depois da conversa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** thread anterior/nova, três ferramentas de investigação e decisão de `CompromisedConversationMission`.
- **Trabalho novo:** parametrizar conversas e mudanças, incluir caso de transferência e tornar conteúdo versionado.
- **Dependências:** conversas fictícias e procedimento de confirmação/reporte; backend autoritativo no uso real.
- **Acessibilidade:** ordem cronológica semântica em lista, datas claras e achados anunciados.
- **Risco principal:** ensinar que toda mudança em conversa legítima implica comprometimento.

### Formato B — Conta correta, quatro decisões

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** caixa de itens, ação por rádio, revisão e relatório final da Simulação.
- **Trabalho novo:** quatro pedidos vindos de contas corretas, sinais de processo e ações distintas, inclusive aceitar/confirmar/reportar.
- **Dependências:** conteúdo balanceado e backend autoritativo para tentativa real.
- **Acessibilidade:** todos os sinais devem estar disponíveis em texto por item; navegação por teclado entre casos.
- **Risco principal:** tornar “conta correta” um indício negativo previsível em todos os casos.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A já existe quase integralmente e B é uma boa transferência posterior, não substituição.
- **Vínculo recomendado:** Missão “A conversa já estava acontecendo”.
- **Condição para avançar:** extrair o cenário fixo para catálogo e adicionar variação legítima de processo.

### Evidências no portal

- `features/missions/CompromisedConversationMission.tsx` implementa exatamente histórico legítimo, pedido alterado, confirmação e reporte.
- `lib/domain/rules.ts` e `app-reducer.ts` já validam e persistem essa família, mas o conteúdo é embutido no componente.

## `concept:thread-hijacking` — Sequestro de conversa existente

### Formato A — A conversa já estava acontecendo

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** experiência homônima completa, incluindo thread, investigação, decisão, pontuação e debrief.
- **Trabalho novo:** somente novos casos versionados e uma transferência curta; eventual generalização do catálogo.
- **Dependências:** conteúdo sintético e procedimento de confirmação fora da conversa; backend autoritativo no uso real.
- **Acessibilidade:** lista cronológica e botões já semânticos; falta padronizar foco ao trocar de etapa e movimento reduzido.
- **Risco principal:** duplicar uma atividade já jogável ou decorar a mudança de portal do único cenário.

### Formato B — Bifurcação de processo

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** fontes progressivas e etapas do desafio bancário.
- **Trabalho novo:** comparação acessível de processo esperado e desvio, escolha do ponto de reconfirmação e representação sem arrastar.
- **Dependências:** processos fictícios/aprovados e backend autoritativo no uso real.
- **Acessibilidade:** duas listas ordenadas e relações textuais; nenhuma linha visual pode ser a única informação.
- **Risco principal:** sobrecarregar a mecânica ou ensinar um processo corporativo que não corresponda ao real.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A já cobre o comportamento principal; B deve virar uma etapa de explicação/transferência quando houver componente de processo.
- **Vínculo recomendado:** Missão existente e futura estação de processo compartilhada.
- **Condição para avançar:** não criar novo player; primeiro parametrizar A e prototipar bifurcação acessível.

### Evidências no portal

- A rota `/missoes/a-conversa-ja-estava-acontecendo` já integra currículo, estado, Perfil e testes.
- Não existe construtor compartilhado de fluxo ou dependência entre ações.

## `concept:thread-fabrication` — Conversa ou histórico fabricado

### Formato A — Histórico citado versus histórico localizado

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** painel de conversa, lista selecionável e comparação de fontes.
- **Trabalho novo:** busca cenográfica em histórico fictício, comparação de citações e registros e estado de “não localizado”.
- **Dependências:** corpus de conversas sintéticas; nenhuma busca em correio; backend autoritativo no uso real.
- **Acessibilidade:** busca precisa aceitar seleção por filtros/lista, com resultados e ausência anunciados.
- **Risco principal:** fazer ausência no recorte provar fraude ou simular acesso a e-mail real.

### Formato B — O `Re:` não cria passado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cartões de mensagem e ferramentas remetente/contexto do PhishLab.
- **Trabalho novo:** pares com assunto encadeado, citação fabricada e conversa realmente localizada, seguidos de escolha de rota segura.
- **Dependências:** conteúdo sintético e backend autoritativo para avaliação real.
- **Acessibilidade:** assunto e citações em texto estruturado, sem depender de recuo ou estilo visual.
- **Risco principal:** ensinar que todo `Re:` inesperado é malicioso.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B entrega o modelo mental com a base atual; A só compensa se a busca fictícia servir a várias atividades.
- **Vínculo recomendado:** caso do PhishLab/Simulação sobre contexto.
- **Condição para avançar:** incluir histórico legítimo ausente/incompleto para controlar falso positivo.

### Evidências no portal

- `SenderInspectorLab` já trata contexto como campo verificável, mas não oferece busca ou histórico alternativo.
- `SimulationExperience` permite comparar vários itens, porém não persiste consultas intermediárias.

## `concept:lateral-phishing` — Phishing interno ou lateral

### Formato A — O pedido veio de dentro

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** Missão de conta comprometida, evidências de processo e decisão com confirmação independente.
- **Trabalho novo:** cenário interno fictício, referência de processo e caso legítimo de pedido incomum.
- **Dependências:** organograma/procedimento sintético ou aprovado; backend autoritativo no uso real.
- **Acessibilidade:** papel, canal e processo apresentados textualmente; identidade não depende de foto.
- **Risco principal:** estigmatizar colegas ou ensinar que pedido interno é inerentemente seguro/inseguro.

### Formato B — Propagação interrompida

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** resultado/debrief e contribuição coletiva agregada do portal.
- **Trabalho novo:** cadeia de destinatários acessível, pontos de contenção e consequência causal, sem colaboração em tempo real.
- **Dependências:** narrativa sintética e política de reporte; backend autoritativo para qualquer agregado real.
- **Acessibilidade:** cadeia como lista ordenada com relações “enviou para”; diagrama apenas complementar.
- **Risco principal:** dar impressão de telemetria/rede real ou expor pessoas em agregados.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A mede a decisão individual; B cabe como debrief causal, não como subsistema de propagação.
- **Vínculo recomendado:** variante interna da Missão de conversa comprometida.
- **Condição para avançar:** garantir dados totalmente fictícios e agregação sem identidade.

### Evidências no portal

- A Missão existente já ensina que conta verdadeira não autoriza o pedido.
- Equipes persiste apenas contribuição resumida; não há grafo, colaboração ou eventos em tempo real.

## `concept:cloud-account-abuse` — Conta ou serviço legítimo de nuvem abusado

### Formato A — Quem controla cada etapa?

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ferramentas por camadas do PhishLab e fontes progressivas.
- **Trabalho novo:** cadeia acessível mensagem–serviço–destino–ação, atribuição de controle e conclusão proporcional.
- **Dependências:** artefatos sintéticos, revisão técnica e nenhum acesso a nuvem; backend autoritativo no uso real.
- **Acessibilidade:** mapa acompanhado de lista completa e seletores; não depender de linhas, proximidade ou ícones.
- **Risco principal:** confundir infraestrutura legítima com conteúdo autorizado.

### Formato B — Abrir pela biblioteca

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** referência conhecida, fonte progressiva e escolha de rota do desafio bancário/PhishLab.
- **Trabalho novo:** biblioteca corporativa fictícia, item esperado/ausente e ação segura sem abrir link recebido.
- **Dependências:** biblioteca estática e procedimento aprovado; nenhuma integração; backend autoritativo para uso real.
- **Acessibilidade:** navegação por lista/busca cenográfica, com estado “não localizado” anunciado.
- **Risco principal:** fazer a biblioteca demonstrativa parecer fonte oficial real ou tratar ausência como prova final.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B mede recuperação de rota com menor custo; A pode ser ferramenta explicativa compartilhada depois.
- **Vínculo recomendado:** PhishLab de destino/identidade com transferência em Missão.
- **Condição para avançar:** definir claramente controle da conta, do serviço e do conteúdo no catálogo.

### Evidências no portal

- `BankChangeChallenge` já libera referências e usa contato cadastrado sem integração real.
- Não existe mapa relacional genérico nem biblioteca/diretório integrado.

## `concept:spear-phishing` — Phishing direcionado

### Formato A — Dossiê de plausibilidade

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** seleção de evidências e comparação guiada/independente do PhishLab.
- **Trabalho novo:** separar fatos verdadeiros, inferências e autorização; casos com personalização legítima e maliciosa.
- **Dependências:** personas totalmente fictícias e revisão de privacidade; backend autoritativo no uso real.
- **Acessibilidade:** cada peça precisa de fonte e categoria textual; nenhuma relação só visual.
- **Risco principal:** expor dados reais, ensinar coleta ofensiva ou fazer personalização equivaler a fraude.

### Formato B — Mesmo pedido, três graus de contexto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** pacote de mensagens e relatório final da Simulação.
- **Trabalho novo:** versões do mesmo pedido com contexto genérico, plausível e altamente personalizado, mantendo sinais não correlacionados.
- **Dependências:** conteúdo balanceado e sintético; backend autoritativo para avaliação real.
- **Acessibilidade:** diferenças explicitadas por fatos, sem exigir comparação visual lado a lado.
- **Risco principal:** fazer grau de personalização prever o gabarito.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A ensina separar plausibilidade de autorização e B prova transferência; devem ser fases, não atividades duplicadas.
- **Vínculo recomendado:** PhishLab guiado seguido de Simulação curta.
- **Condição para avançar:** proibir dados reais e equilibrar personalização em casos legítimos/inconclusivos.

### Evidências no portal

- PhishLab já possui ciclo guiado/independente e Simulação já posterga feedback.
- Não há editor de casos ou geração combinatória; cada variante precisará ser conteúdo versionado.

## `concept:whaling` — Phishing contra lideranças e funções de alto valor

### Formato A — Agenda de alto impacto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** triagem em lote, prioridades e decisões revisáveis da Simulação.
- **Trabalho novo:** agenda fictícia com pedidos delegáveis, verificáveis e reportáveis, sem usar cargo como gabarito.
- **Dependências:** alçadas e papéis sintéticos/aprovados; backend autoritativo no uso real.
- **Acessibilidade:** agenda em lista/tabela com horário, papel e impacto; prioridade não apenas por posição.
- **Risco principal:** ensinar tratamento excepcional inseguro ou expor agendas reais.

### Formato B — Assessoria como barreira

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa, referências e decisões por rádio das Missões.
- **Trabalho novo:** encaminhamento por assessoria fictícia, confirmação de alçada e reporte, com opção legítima.
- **Dependências:** procedimento sintético e revisão organizacional; backend autoritativo no uso real.
- **Acessibilidade:** fluxo linear com papéis nomeados e consequência textual.
- **Risco principal:** atribuir responsabilidade exclusiva à liderança/assessoria ou universalizar um processo local.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina barreira de processo sem exigir uma agenda complexa; o conceito deve ser variante de autoridade, não player exclusivo.
- **Vínculo recomendado:** Missão de falso gestor/BEC.
- **Condição para avançar:** validar alçadas fictícias e incluir pedido legítimo de alta prioridade.

### Evidências no portal

- O catálogo já contém “Pedido urgente de um gestor” como planejado e Radar relacionado.
- O portal não possui agenda, diretório ou alçada real; tudo deve permanecer cenográfico.

## `concept:osint-personalization` — OSINT, pegada digital e organograma

### Formato A — Monte o pretexto defensivamente

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cards selecionáveis, evidências e debrief do PhishLab.
- **Trabalho novo:** combinador controlado de fatos sintéticos, inferências permitidas, limites de minimização e avaliação defensiva.
- **Dependências:** personas inventadas, revisão ética/privacidade e catálogo fechado; backend autoritativo no uso real.
- **Acessibilidade:** montagem por checkboxes/menus e resumo textual, sem arrastar.
- **Risco principal:** virar tutorial de construção de pretexto ou incentivar pesquisa sobre colegas reais.

### Formato B — Revisão de pegada por função

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** checklist, filtros e preferências do Perfil; cards de decisão.
- **Trabalho novo:** inventário fictício por função, classificação “necessário/reduzir/verificar” e orientação não punitiva.
- **Dependências:** política de privacidade aprovada e exemplos sintéticos; nenhuma coleta de conta real; backend autoritativo no uso real.
- **Acessibilidade:** lista por categoria, linguagem clara e sem exigir pesquisa externa.
- **Risco principal:** responsabilizar a vítima ou sugerir apagar presença pública como defesa suficiente.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B é defensivo e seguro; A só deve existir como demonstração fechada, sem permitir texto livre ou dados reais.
- **Vínculo recomendado:** módulo opcional de preparação/privacidade, conectado a spear phishing.
- **Condição para avançar:** revisão de privacidade e garantia técnica de que nenhum dado pessoal será aceito/persistido.

### Evidências no portal

- O Perfil já apresenta preferências, mas não coleta pegada digital nem deve fazê-lo no estado local.
- O modelo atual suporta escolhas fechadas; não há editor, moderação ou backend para conteúdo livre.

## `concept:leaked-data` — Dados vazados usados como credibilidade

### Formato A — Ele já sabia meus dados

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** narrativa, evidências e decisão de Missão.
- **Trabalho novo:** cenário com dado sintético conhecido, confirmação por rota independente e reporte sem repetir segredo.
- **Dependências:** dados totalmente fictícios, revisão de privacidade e backend autoritativo no uso real.
- **Acessibilidade:** dado apresentado como categoria fictícia, com aviso explícito para não inserir informação pessoal.
- **Risco principal:** coletar dado real ou ensinar que conhecimento de um dado autentica o interlocutor.

### Formato B — Vazamento ou cadastro?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** escolhas múltiplas e debrief causal.
- **Trabalho novo:** hipóteses concorrentes e resposta segura que não dependa de diagnosticar a origem.
- **Dependências:** conteúdo sintético, revisão jurídica/privacidade quando necessário e backend autoritativo no uso real.
- **Acessibilidade:** hipóteses em `fieldset`, com explicação textual do grau de certeza.
- **Risco principal:** atribuir origem do dado sem evidência ou ensinar investigação pelo usuário.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A coloca o comportamento em contexto; B corrige a inferência de que o funcionário precisa provar vazamento.
- **Vínculo recomendado:** Missão curta de personalização e reporte minimizado.
- **Condição para avançar:** usar somente categorias e valores fictícios e aceitar “origem inconclusiva”.

### Evidências no portal

- Missões já usam respostas fechadas e motivos; `RecoveryMission` já distingue dados apropriados e senha/código inseguros no reporte.
- Persistência local não deve receber texto livre nem qualquer dado real.

## `concept:synthetic-identity` — Identidade sintética e perfil composto

### Formato A — Perfil que cresce com o tempo

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** cards, histórico e progresso do portal apenas como aparência.
- **Trabalho novo:** narrativa longitudinal, retomada de rascunho, conteúdo versionado por episódios, estado intermediário e avaliação tardia.
- **Dependências:** roteiro extenso, revisão especializada, backend autoritativo e gestão de versões.
- **Acessibilidade:** resumo cumulativo, controle de ritmo e alternativa à memória; episódios não podem depender de reconhecimento facial.
- **Risco principal:** medir memória/estereótipo, persistir perfil sensível ou quebrar com mudanças de conteúdo.

### Formato B — Peças verdadeiras, conclusão não provada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** seleção de evidências, veredito inconclusivo e debrief do PhishLab.
- **Trabalho novo:** matriz de atributos sintéticos, distinção entre fato verificado e identidade concluída e rota de confirmação.
- **Dependências:** personas fictícias, revisão contra vieses e backend autoritativo no uso real.
- **Acessibilidade:** atributos em tabela/lista, com origem e limite anunciados; sem foto como prova.
- **Risco principal:** reforçar perfilamento, associar inconsistência a fraude ou pedir investigação indevida.

### Decisão preliminar

- **Destino:** Adiar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina o limite com o portal atual; A depende de rascunho e currículo longitudinal ainda inexistentes.
- **Vínculo recomendado:** caso avançado do PhishLab de identidade, não player longitudinal agora.
- **Condição para avançar:** revisão de vieses e privacidade; A somente após conteúdo versionado e retomada segura.

### Evidências no portal

- O PhishLab já aceita “inconclusivo”; a persistência guarda apenas tentativas concluídas, não estado intermediário.
- Não há banco de episódios, editor de conteúdo ou retomada de atividade.

## `concept:inbox-manipulation` — Regras maliciosas de encaminhamento e ocultação

### Formato A — Sintoma não é diagnóstico

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** matriz de escolhas, achados progressivos e debrief causal.
- **Trabalho novo:** sintomas sintéticos, hipóteses alternativas e ação de encaminhar ao suporte sem alterar configuração real.
- **Dependências:** revisão técnica, procedimento fictício/aprovado e backend autoritativo no uso real.
- **Acessibilidade:** tabela de sintoma/hipótese/ação; nenhuma configuração visual de cliente de e-mail.
- **Risco principal:** fazer o funcionário diagnosticar comprometimento ou tentar corrigir regras por conta própria.

### Formato B — Bastidores da caixa comprometida

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** debrief, timeline simples em lista e cards explicativos.
- **Trabalho novo:** retrospectiva inerte mostrando o que a equipe técnica encontrou e quais barreiras o reporte acionou.
- **Dependências:** conteúdo tecnicamente revisado; nenhuma conexão a correio ou painel administrativo; backend autoritativo no uso real.
- **Acessibilidade:** sequência textual equivalente ao diagrama e linguagem que separe fato posterior de sinal observável.
- **Risco principal:** revelar a causa antes da decisão ou sugerir que regras são visíveis ao funcionário.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Combinação.
- **Justificativa:** A ensina limite e escalonamento; B funciona melhor como debrief de conta comprometida.
- **Vínculo recomendado:** resultado da Missão “A conversa já estava acontecendo” ou recuperação de conta.
- **Condição para avançar:** revisar o procedimento de suporte e manter todos os controles técnicos apenas narrados.

### Evidências no portal

- O portal já oferece debrief causal e reporte, mas não integra correio nem possui interface de regras.
- `RecoveryMission` permite escolher parar, preservar e reportar; esse é o encaixe seguro, sem simular correção técnica.
