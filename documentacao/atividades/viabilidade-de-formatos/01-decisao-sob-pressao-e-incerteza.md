# Viabilidade de formatos — decisão sob pressão e incerteza

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Escopo:** desktop, sobre o portal local e não autoritativo de 2026-08-11.

**Bases:** [estudo canônico do conjunto 01](../estudos-de-formatos/01-decisao-sob-pressao-e-incerteza.md) e [inventário da arquitetura atual](ARQUITETURA-ATUAL.md).

As classificações abaixo consideram o formato como parte de uma família reutilizável, não como autorização para criar 19 players independentes. O portal já oferece escolhas, inspeção de evidências, conversas, caixa de entrada, sequência por etapas, resultado e debrief; qualquer resposta semanticamente nova ainda atravessa tipos, avaliador, provider, reducer, persistência, seletores, rota e testes. Backend autoritativo permanece obrigatório antes do uso real.

## `concept:influence-authority` — Autoridade

### Formato A — Mesa de autorização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** fontes progressivas e comparação de registros de `BankChangeChallenge`, evidências pressionáveis e escolhas por `fieldset`.
- **Trabalho novo:** tabela declarativa de papéis, pedido, alcance e canal oficial; regra que pontue verificação de autoridade e não obediência ao cargo.
- **Dependências:** matriz corporativa versionada de alçadas, canais e exceções; revisão de Segurança e RH; backend para publicar a versão válida no uso real.
- **Acessibilidade:** tabela semântica e resumo textual devem conservar todas as relações sem depender de posição ou cor.
- **Risco principal:** ensinar uma hierarquia fictícia como universal ou tratar pessoa sênior como sinal de fraude.

### Formato B — Conversa com resposta profissional

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa textual, evidências e decisão de `CompromisedConversationMission` e `MfaFatigueMission`.
- **Trabalho novo:** respostas seguras pré-compostas, consequências por turno e avaliação do procedimento escolhido; texto livre não deve ser pontuado por palavras-chave.
- **Dependências:** tom institucional aprovado e caminhos reais de escalonamento; backend para versão, tentativa e resultado autoritativos.
- **Acessibilidade:** ordem linear das mensagens, identificação textual do interlocutor e resultado anunciado em região de status.
- **Risco principal:** avaliar polidez ou estilo de escrita em vez de verificar limite, canal e autorização.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** a mesa torna a autoridade verificável e a conversa pratica como interromper o pedido sem confronto; isoladas, repetiriam estruturas já existentes.
- **Vínculo recomendado:** estação de processo com um turno final de resposta profissional.
- **Condição para avançar:** matriz de autoridade aprovada e componente declarativo de fontes e escolhas.

### Evidências no portal

- `features/teams/BankChangeChallenge.tsx`, `features/missions/CompromisedConversationMission.tsx`, `lib/domain/types.ts` e `lib/state/app-reducer.ts` sustentam o reuso visual e mostram o custo transversal de uma resposta nova.

## `concept:influence-urgency` — Urgência

### Formato A — Pausa de vinte segundos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** stepper, alertas, escolhas e preferência de movimento reduzido das experiências atuais.
- **Trabalho novo:** cartão de pausa com checklist PARE, continuação explícita e telemetria apenas da decisão; não é necessário bloquear por cronômetro real.
- **Dependências:** texto curto validado e backend apenas para registrar conclusão autoritativa, nunca tempo como indicador de competência.
- **Acessibilidade:** sem contagem regressiva obrigatória; controle manual, foco previsível e ausência de animação indispensável.
- **Risco principal:** premiar lentidão, penalizar tecnologia assistiva ou transformar a urgência em prova cronometrada.

### Formato B — Duas filas, um prazo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** lista e leitor de itens de `WorkdaySimulation` e `TeamChallenge`.
- **Trabalho novo:** duas categorias de prioridade, retorno a itens inconclusivos e avaliação separada entre urgência operacional e verificação de segurança.
- **Dependências:** casos balanceados com pedidos urgentes legítimos; backend para catálogo e resultado autoritativos.
- **Acessibilidade:** mover itens também por botões “enviar para fila” e lista textual; arrastar nunca pode ser a única interação.
- **Risco principal:** ensinar que todo pedido urgente é malicioso ou confundir prioridade com severidade.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** a pausa é uma microinteração útil dentro da triagem; a fila fornece a transferência para situações legítimas e suspeitas.
- **Vínculo recomendado:** triagem em lote com intervenção PARE antes de uma decisão de alto impacto.
- **Condição para avançar:** componente de filas acessível e casos com falsos positivos revisados.

### Evidências no portal

- `features/simulations/WorkdaySimulation.tsx`, `features/teams/TeamChallenge.tsx` e a preferência `reducedMotion` demonstram a base, enquanto a arquitetura ainda não possui ordenação acessível compartilhada.

## `concept:influence-scarcity` — Escassez

### Formato A — Oferta sob comparação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** revelação progressiva e comparação de evidências de `BankChangeChallenge` e dos laboratórios.
- **Trabalho novo:** quadro que confronte prazo alegado, fonte independente e custo de agir sem verificação; avaliador por decisões.
- **Dependências:** ofertas e comunicações fictícias balanceadas; revisão para não reproduzir marca ou promoção real; backend autoritativo.
- **Acessibilidade:** comparação em tabela e versão linear equivalente, com rótulos explícitos para “alegado” e “confirmado”.
- **Risco principal:** reduzir a regra a “oferta limitada é golpe” e gerar falsos positivos comerciais.

### Formato B — Leilão de atenção

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards, barra de progresso e debrief existentes.
- **Trabalho novo:** distribuição acessível de atenção entre pedidos, consequências adiadas e contrato capaz de persistir prioridades sem depender de arrastar.
- **Dependências:** modelo pedagógico que não use tempo de reação nem escassez artificial de pontos; backend para estado autoritativo.
- **Acessibilidade:** controles de aumentar/diminuir e resumo tabular; nenhuma informação apenas por posição, animação ou saldo visual.
- **Risco principal:** a própria mecânica explorar pressão e recompensar rapidez, contrariando o ensinamento.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** a comparação ensina a verificar a alegação com menor custo; o leilão só se justifica futuramente como componente compartilhado de priorização.
- **Vínculo recomendado:** caso dentro de estação de evidências ou triagem.
- **Condição para avançar:** conjunto explícito de casos legítimos e enganosos e fonte independente simulada.

### Evidências no portal

- `features/teams/BankChangeChallenge.tsx` oferece o melhor padrão de comparação; `lib/domain/types.ts` não possui resposta de alocação ou ordenação.

## `concept:influence-fear` — Medo e intimidação

### Formato A — A ameaça estreita o caminho

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** narrativa em etapas, conversa textual e escolhas revisáveis das Missões.
- **Trabalho novo:** alternativas que reabram canais seguros, debrief causal e controle editorial da intensidade do cenário.
- **Dependências:** revisão de conteúdo sensível, alternativa a ameaças potencialmente traumáticas e backend autoritativo no uso real.
- **Acessibilidade:** aviso de conteúdo, linguagem direta e opção equivalente de cenário menos intenso sem perda de aprendizagem.
- **Risco principal:** induzir ansiedade desnecessária ou avaliar reação emocional em vez de ação segura.

### Formato B — Plano de contenção

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** seleção de ação imediata, ações de recuperação e reporte de `RecoveryMission`.
- **Trabalho novo:** variação de conteúdo com ameaças e caminhos oficiais; ajuste do catálogo e dos testes de pontuação.
- **Dependências:** procedimento corporativo aprovado para cada incidente; backend para validação e registro reais.
- **Acessibilidade:** grupos de opções já possuem estrutura semântica; o debrief deve explicar por que conter não significa obedecer.
- **Risco principal:** plano genérico incompatível com o incidente ou incentivo a agir sozinho.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** transformar medo em um plano observável é mais avaliável e reaproveita uma atividade já construída; a ameaça pode permanecer no briefing.
- **Vínculo recomendado:** variação da família de resposta a incidente.
- **Condição para avançar:** catálogo de incidentes e ações aprovado por responsáveis internos.

### Evidências no portal

- `features/missions/RecoveryMission.tsx`, `lib/content/recovery-mission-catalog.ts` e `evaluateRecoveryMission` já suportam resposta por categorias, embora com contrato fechado aos incidentes atuais.

## `concept:influence-curiosity` — Curiosidade

### Formato A — Caixa fechada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** investigação guiada e independente de `PhishLabExperience`, sem abrir artefato real.
- **Trabalho novo:** representação inerte de anexo, prévia ou convite; ferramentas de contexto e decisão segura fora do artefato.
- **Dependências:** artefatos sintéticos e revisão de segurança; nenhum upload, download ou execução; backend para tentativa real.
- **Acessibilidade:** descrição textual completa da aparência e dos metadados; “revelar” deve ser um botão sem efeito externo.
- **Risco principal:** ensinar que nome/ícone do arquivo basta para diagnóstico ou criar objeto executável por engano.

### Formato B — Manchete versus contexto

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** cards de evidência, veredito legítimo/suspeito/inconclusivo e debrief do PhishLab.
- **Trabalho novo:** pares fictícios de manchete e contexto com fonte identificável; testes de falsos positivos.
- **Dependências:** revisão editorial periódica se houver referência a evento atual; backend autoritativo antes da publicação real.
- **Acessibilidade:** manchete, fonte e contexto em texto estruturado; não depender de captura de tela.
- **Risco principal:** confundir conteúdo sensacionalista com prova de phishing.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** a caixa ensina a não executar para satisfazer curiosidade; a manchete transfere o mesmo autocontrole para links e notícias.
- **Vínculo recomendado:** casos diferentes dentro de um laboratório de contexto antes da abertura.
- **Condição para avançar:** componente de artefato totalmente inerte e casos com conclusão inconclusiva.

### Evidências no portal

- `features/phishlab/PhishLabExperience.tsx` oferece ferramentas, evidências e três vereditos; o portal não possui upload nem sandbox de arquivos, o que deve permanecer fora deste formato.

## `concept:influence-reward` — Recompensa

### Formato A — Balanço invisível

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** comparação de fontes, opções com consequência e debrief das atividades atuais.
- **Trabalho novo:** quadro de benefício alegado, informação solicitada, reversibilidade e canal de confirmação; avaliador de ação segura.
- **Dependências:** exemplos fictícios de cupom, prêmio ou benefício; revisão para não parecer promoção real; backend autoritativo.
- **Acessibilidade:** tabela semântica e explicação textual do custo oculto, sem balança exclusivamente visual.
- **Risco principal:** ensinar que toda recompensa é fraude ou atribuir valor fixo ao risco.

### Formato B — Escolha adiada

- **Viabilidade:** Média.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** sequência por etapas, resultado e botão de retorno já existentes.
- **Trabalho novo:** mecanismo de colocar pedido em espera, investigar por fonte independente e retomar a escolha sem cronômetro.
- **Dependências:** casos em que adiar é seguro e casos em que a ação oficial tem prazo real; backend para rascunho se a pausa atravessar sessão.
- **Acessibilidade:** retomada explícita e estado textual; nenhuma penalização por duração ou abandono involuntário.
- **Risco principal:** converter “adiar” em resposta universal quando o correto é verificar ou reportar imediatamente.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** o balanço torna observável a troca pedida pelo atacante; a pausa pode ser absorvida pelo componente PARE sem player próprio.
- **Vínculo recomendado:** microcaso na família de decisão sob pressão.
- **Condição para avançar:** matriz de custos e ações segura, revisada com exemplos legítimos.

### Evidências no portal

- Os steppers e debriefs existentes permitem o formato, mas `lib/state/persistence.ts` não salva rascunho durante uma atividade; uma pausa entre sessões elevaria o custo.

## `concept:influence-reciprocity` — Reciprocidade

### Formato A — Favor em parcelas

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa por turnos e marcação de evidências de `CompromisedConversationMission`.
- **Trabalho novo:** sequência em que pequenos favores alteram o pedido seguinte, com opção persistente de interromper e confirmar por processo.
- **Dependências:** exemplos de ajuda legítima e indevida; tom aprovado para recusa profissional; backend autoritativo no uso real.
- **Acessibilidade:** conversa linear, resumo das concessões anteriores e controles que não dependam de gestos ou posição.
- **Risco principal:** sugerir que aceitar ajuda gera culpa ou que toda reciprocidade social é manipulação.

### Formato B — Livro-caixa de permissões

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** listas, tags, escolhas e debrief existentes.
- **Trabalho novo:** tabela de favores recebidos versus permissões pedidas, com classificação de itens que nunca devem ser trocados.
- **Dependências:** política corporativa sobre credenciais, acesso, brindes e suporte; backend apenas para versão e avaliação, sem dados reais.
- **Acessibilidade:** tabela navegável com cabeçalhos e alternativa em lista; não usar saldo, cor ou ícone como única conclusão.
- **Risco principal:** passar a ideia de que permissões possuem um “preço” aceitável.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** a conversa mostra a escalada social e o livro-caixa torna explícito que favor não transfere autorização.
- **Vínculo recomendado:** missão conversacional com resumo estruturado antes da decisão.
- **Condição para avançar:** limites corporativos claros e avaliador focado no procedimento, não na aceitação do primeiro favor.

### Evidências no portal

- `features/missions/CompromisedConversationMission.tsx` suporta a narrativa; um quadro de relações exigiria componente local e extensão do contrato de resposta.

## `concept:influence-social-proof` — Prova social

### Formato A — Árvore de fontes

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** evidências pressionáveis, cards e resultado textual.
- **Trabalho novo:** representação acessível de dependências entre afirmações, seleção da fonte original e avaliador que detecte confirmações derivadas da mesma origem.
- **Dependências:** casos editoriais com proveniência inequívoca; backend para catálogo versionado e resposta autoritativa.
- **Acessibilidade:** árvore também em lista hierárquica ou tabela “afirmação/origem”; conexão visual nunca pode ser a única evidência.
- **Risco principal:** criar um grafo visualmente convincente, porém impossível de compreender por teclado ou leitor de tela.

### Formato B — Reunião de adesão

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa textual, sequência de turnos e decisão revisável das Missões.
- **Trabalho novo:** intervenções dos participantes, indicação de quais falas citam fonte independente e resposta segura final.
- **Dependências:** roteiro balanceado com consenso legítimo e pressão indevida; revisão de linguagem e backend no uso real.
- **Acessibilidade:** cada fala identifica pessoa, papel e fonte alegada; versão textual é o formato primário.
- **Risco principal:** ensinar desconfiança automática de colegas ou premiar oposição ao grupo sem verificação.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** a reunião pratica a decisão com custo menor; a árvore deve virar um componente transversal de proveniência antes de justificar seu esforço.
- **Vínculo recomendado:** missão conversacional, com mini-resumo textual das fontes ao final.
- **Condição para avançar:** casos legítimos e enganosos e, para o Formato A, componente de relações acessível reutilizável.

### Evidências no portal

- As conversas existentes tornam B imediato; `ARQUITETURA-ATUAL.md` registra que grafo e conexão entre nós ainda não existem.

## `concept:influence-familiarity` — Familiaridade

### Formato A — O conhecido mudou

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** histórico de conversa, mudança de comportamento, evidências e decisão de `CompromisedConversationMission`.
- **Trabalho novo:** variações editoriais de tom, pedido, número ou rotina, mais testes de que aparência familiar não decide o resultado.
- **Dependências:** personas sintéticas; nenhum dado de colega real; backend para conteúdo e tentativa autoritativos.
- **Acessibilidade:** mudanças devem ser descritas em texto e marcadas por conteúdo, não apenas estilo visual.
- **Risco principal:** transformar diferença de linguagem, erro gramatical ou comportamento atípico em prova de comprometimento.

### Formato B — Gêmeos plausíveis

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** comparação e inspeção de identidade de `SenderInspectorLab`.
- **Trabalho novo:** pares quase idênticos com fontes independentes e conclusão legítima, suspeita ou inconclusiva.
- **Dependências:** identidades e endereços reservados/sintéticos; revisão de falso positivo; backend no uso real.
- **Acessibilidade:** valores completos copiáveis e lidos em ordem; diferenças não podem depender de realce cromático.
- **Risco principal:** virar jogo de “ache a diferença” e reforçar que semelhança visual prova fraude.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A ensina mudança contextual e B ensina diferença de controle; ambos transferem a familiaridade para evidência verificável.
- **Vínculo recomendado:** missão de conversa seguida de inspeção curta de identidade.
- **Condição para avançar:** banco de casos com causas legítimas para mudanças e resultado inconclusivo.

### Evidências no portal

- `CompromisedConversationMission` e `SenderInspectorLab` já implementam os dois padrões, mas seus catálogos e enums continuam específicos às atividades atuais.

## `concept:influence-empathy` — Empatia e disposição para ajudar

### Formato A — Ajudar sem abrir exceção

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa textual e alternativas de ação das Missões.
- **Trabalho novo:** respostas que mantenham apoio, redirecionem ao canal oficial e evitem segredo ou compartilhamento impróprio.
- **Dependências:** linguagem inclusiva e fluxos reais de apoio; revisão para cenários sensíveis; backend autoritativo.
- **Acessibilidade:** alternativas completas e diretas, sem inferir emoção apenas por voz, emoji ou expressão visual.
- **Risco principal:** apresentar empatia como fraqueza ou pontuar uma formulação linguística específica.

### Formato B — Rede de apoio

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** cards, seleção de rota e fontes progressivas de `BankChangeChallenge`.
- **Trabalho novo:** diretório fictício de apoio por tipo de situação e montagem de um encaminhamento seguro.
- **Dependências:** responsáveis internos por RH, Segurança, suporte e liderança; backend para diretório publicado e atualizado no uso real.
- **Acessibilidade:** lista pesquisável e tabela por necessidade; não depender de organograma espacial.
- **Risco principal:** contato desatualizado ou encaminhamento que exponha mais informação que o necessário.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** o valor pedagógico está em preservar a ajuda enquanto se respeita o processo; conversa e rota de apoio medem partes diferentes desse comportamento.
- **Vínculo recomendado:** cenário conversacional encerrado por escolha de canal oficial.
- **Condição para avançar:** mapa de apoio aprovado, com proprietário e rotina de atualização.

### Evidências no portal

- Conversas e escolha de rotas já existem; não há diretório integrado, portanto B deve usar dados fictícios até existir publicação corporativa autoritativa.

## `concept:influence-secrecy` — Segredo e isolamento

### Formato A — Círculo que se fecha

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** linha de mensagens, evidências e debrief.
- **Trabalho novo:** mapa temporal das tentativas de afastar colegas e canais oficiais, com seleção dos pontos em que o isolamento aumenta.
- **Dependências:** roteiro sensível e revisão de Segurança/RH; backend para conteúdo versionado.
- **Acessibilidade:** versão linear numerada de cada passo e seus vínculos; nenhuma dependência de círculos, distância ou animação.
- **Risco principal:** representar confidencialidade legítima como manipulação ou expor cenários traumáticos sem cuidado.

### Formato B — Cofre legítimo ou isolamento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** escolhas, cards comparativos e conclusão inconclusiva já presentes nos laboratórios.
- **Trabalho novo:** matriz que diferencie necessidade de conhecer, canal protegido, proibição de consulta e pressão para esconder o pedido.
- **Dependências:** política de confidencialidade e escalonamento; revisão jurídica/Segurança; backend autoritativo.
- **Acessibilidade:** tabela com cabeçalhos e explicações; “secreto” e “confidencial” não podem ser codificados só por cor.
- **Risco principal:** ensinar que qualquer confidencialidade é suspeita ou que informação restrita deve ser compartilhada para verificar.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** a matriz permite discutir o limite sem criar um grafo próprio; a escalada do Formato A pode aparecer como sequência de caso.
- **Vínculo recomendado:** laboratório de limites e processo.
- **Condição para avançar:** exemplos corporativos aprovados de confidencialidade legítima e isolamento indevido.

### Evidências no portal

- Os padrões de escolha suportam B; o portal ainda não possui visualização temporal/relacional genérica para A.

## `concept:influence-commitment` — Compromisso e escalada gradual

### Formato A — Escada com saídas

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** stepper e conversa em estágios das Missões e de `BankChangeChallenge`.
- **Trabalho novo:** ramificações controladas, saída segura em cada degrau e resumo das concessões; contrato para registrar decisões múltiplas.
- **Dependências:** casos que não punam quem interrompe cedo; backend para estado e idempotência autoritativos.
- **Acessibilidade:** navegação linear equivalente, retorno explícito e ausência de diagrama como única forma de compreender os ramos.
- **Risco principal:** tornar a escalada irresistível por design ou recompensar chegar mais longe no ataque.

### Formato B — Inventário do que já foi dado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** montagem de resposta por categorias de `RecoveryMission`.
- **Trabalho novo:** classificação de dados, ações e permissões já concedidos, seguida de contenção proporcional e reporte mínimo.
- **Dependências:** taxonomia corporativa de dados e resposta a incidente; nenhum dado real no protótipo; backend no uso real.
- **Acessibilidade:** itens selecionáveis em grupos semânticos, com resumo textual e sem arrastar obrigatório.
- **Risco principal:** incentivar o participante a inserir informação real ou assumir que toda concessão tem a mesma gravidade.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** a escada explica como se chegou ao risco e o inventário transforma reconhecimento em recuperação concreta.
- **Vínculo recomendado:** missão ramificada curta seguida pela família de resposta a incidente.
- **Condição para avançar:** componente acessível de sequência/ramificação e categorias de exposição aprovadas.

### Evidências no portal

- Há stepper e resposta por categorias, mas `LearningAttempt` não registra uma sequência genérica de decisões; A exigiria extensão transversal ou uma família compartilhada.

## `concept:influence-overload` — Sobrecarga e fadiga decisória

### Formato A — Uma manhã comum

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** `WorkdaySimulation` já apresenta caixa em lote, inspeção, ação, retorno a itens e feedback somente ao final.
- **Trabalho novo:** novos casos balanceados, estado explícito de “investigar depois” e testes de retomada e falso positivo.
- **Dependências:** volume e mistura realistas sem copiar mensagens reais; backend autoritativo antes do uso corporativo.
- **Acessibilidade:** lista/leitor por teclado, contador textual e ausência de limite de tempo; a densidade não pode impedir ampliação de texto.
- **Risco principal:** simular sobrecarga com ruído excessivo e medir resistência à interface em vez de decisão segura.

### Formato B — Redutor de ruído

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** filtros, estados de item e painel de evidências das simulações.
- **Trabalho novo:** controles para agrupar, silenciar o irrelevante e preservar pendências; regra que não premie ocultar sinais importantes.
- **Dependências:** definição pedagógica de ruído versus evidência; backend apenas para tentativa e conteúdo autoritativos.
- **Acessibilidade:** filtros como controles nomeados, anúncio da quantidade resultante e comando para limpar; nenhum gesto de arrastar obrigatório.
- **Risco principal:** ensinar a descartar em massa ou confundir redução de ruído com exclusão de evidência.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A já é uma base forte no portal e B adiciona estratégia observável sem exigir um player separado.
- **Vínculo recomendado:** evolução da família de triagem em lote.
- **Condição para avançar:** generalizar catálogo e resposta da simulação, mantendo falsos positivos e pendências explícitos.

### Evidências no portal

- `features/simulations/WorkdaySimulation.tsx`, `lib/content/simulation-catalog.ts` e `evaluateSimulation` já cobrem a mecânica, mas enums e catálogo são específicos à caixa atual.

## `concept:influence-current-event` — Acontecimento atual

### Formato A — Antes e depois da manchete

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** comparação de contexto, ferramentas e veredito do PhishLab.
- **Trabalho novo:** caso versionado que mostre a mesma técnica antes/depois de um evento, com fonte fictícia ou oficial segura.
- **Dependências:** revisão editorial e data de validade; backend/publicação autoritativa para retirar conteúdo desatualizado.
- **Acessibilidade:** datas, fontes e diferenças expostas em texto, sem depender de layout lado a lado.
- **Risco principal:** envelhecimento rápido ou associação indevida entre um evento verdadeiro e uma campanha específica.

### Formato B — Calendário de pretextos

- **Viabilidade:** Média.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards e filtros do portal.
- **Trabalho novo:** linha editorial por período, validade, proprietário e revisão; interação para identificar o mecanismo constante sob temas diferentes.
- **Dependências:** governança contínua de conteúdo; não requer feed ao vivo, mas requer backend de publicação antes do uso real.
- **Acessibilidade:** lista cronológica alternativa, datas por extenso e filtros acessíveis.
- **Risco principal:** alto custo de manutenção e falsa promessa de prever qual tema será usado por atacantes.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina que o pretexto muda e o mecanismo permanece; B serve melhor como planejamento editorial do que como player pontuado.
- **Vínculo recomendado:** caso rotativo de PhishLab ou Radar, sem obrigatoriedade na jornada.
- **Condição para avançar:** proprietário editorial, validade visível e retirada automática/administrativa de casos vencidos.

### Evidências no portal

- O PhishLab suporta o caso; não há editor, banco rotativo nem publicação versionada de conteúdo, lacunas registradas em `ARQUITETURA-ATUAL.md`.

## `concept:pretexting` — Construção de pretexto

### Formato A — Painel de alegações e evidências

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** ferramentas, evidências e veredito inconclusivo dos laboratórios.
- **Trabalho novo:** modelo declarativo “alegação/fonte/evidência/estado”, seleção de contradições e conclusão independente da plausibilidade narrativa.
- **Dependências:** casos revisados com alegações verdadeiras, falsas e não verificáveis; backend autoritativo.
- **Acessibilidade:** relações em tabela ou lista agrupada, com estado textual e navegação por cabeçalhos.
- **Risco principal:** pontuar quantidade de contradições e ignorar que um pretexto coerente ainda pode ser fraudulento.

### Formato B — Entrevista com limite

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** conversa por turnos e escolha de resposta das Missões.
- **Trabalho novo:** perguntas permitidas, dados que não devem ser fornecidos e opção de redirecionar para canal oficial; consequências determinísticas.
- **Dependências:** limites de informação por função; revisão de RH/Segurança; backend no uso real.
- **Acessibilidade:** transcrição é a experiência primária, interlocutores e propósito de cada pergunta ficam explícitos.
- **Risco principal:** transformar a atividade em interrogatório ou ensinar perguntas de autenticação que um atacante também possa explorar.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** o painel avalia evidência; a entrevista avalia minimização e encaminhamento. Juntos cobrem análise e conduta sem depender de “sentir” o pretexto.
- **Vínculo recomendado:** família de investigação por alegações com etapa conversacional curta.
- **Condição para avançar:** modelo declarativo de alegações e política de dados divulgáveis.

### Evidências no portal

- `PhishLabExperience` e as Missões oferecem os dois esqueletos; unificá-los exige contrato compartilhado ou composição dentro de uma nova versão de atividade.

## `concept:phishing-mass` — Phishing em massa

### Formato A — Mosaico de campanha

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Reuso possível:** cards de casos e evidências de `TeamChallenge`.
- **Trabalho novo:** correlação de atributos entre mensagens, seleção de agrupamentos e resumo textual de padrões compartilhados.
- **Dependências:** corpus sintético balanceado; backend para conjunto versionado e agregação autoritativa.
- **Acessibilidade:** tabela comparativa e filtros como alternativa ao mosaico; não depender de proximidade ou cor.
- **Risco principal:** fazer volume ou repetição parecer prova suficiente e criar agrupamentos falsos.

### Formato B — Caixa individual com contexto coletivo

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** leitor e lista de `WorkdaySimulation`, além de contribuição coletiva resumida de Equipes.
- **Trabalho novo:** indicadores fictícios de mensagens semelhantes e debrief sobre como reportes individuais ajudam a correlação, sem revelar pessoas.
- **Dependências:** regra de privacidade e agregação; backend obrigatório para qualquer contexto coletivo real.
- **Acessibilidade:** o contexto coletivo deve aparecer em texto, com contagens e incerteza; nenhum mapa de calor isolado.
- **Risco principal:** expor dados individuais, fabricar certeza estatística ou sugerir que o funcionário deve investigar a campanha inteira.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B preserva a responsabilidade do usuário final e reutiliza a caixa atual; A só vale como visualização compartilhada após existir uma família de correlação.
- **Vínculo recomendado:** caso da triagem em lote com debrief coletivo privado.
- **Condição para avançar:** agregação no backend com minimização, limiar de privacidade e dados sintéticos no protótipo.

### Evidências no portal

- A caixa e agregados já existem separadamente, mas `app/providers.tsx` declara modo local não autoritativo; contexto coletivo real não pode derivar do estado local.

## `concept:decision-ambiguity` — Decisão sob ambiguidade

### Formato A — Fila inconclusiva

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** lista/leitor das simulações e veredito “inconclusivo” dos laboratórios.
- **Trabalho novo:** terceira fila persistida dentro da tentativa, ação de buscar fonte independente e retorno explícito ao caso.
- **Dependências:** casos realmente inconclusivos e procedimentos de escalonamento; backend autoritativo.
- **Acessibilidade:** mover por botões, anunciar estado e oferecer filtro “inconclusivos”; não exigir drag-and-drop.
- **Risco principal:** usar a fila como estacionamento permanente ou pontuar suspeita como acerto.

### Formato B — Limiar de ação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Reuso possível:** escolhas, fontes progressivas e resultado por etapa.
- **Trabalho novo:** matriz de evidência versus ação reversível, escalonamento e dano potencial; avaliador contextual em vez de limiar numérico universal.
- **Dependências:** política por cenário e revisão de risco; backend para versão válida.
- **Acessibilidade:** matriz com cabeçalhos e resumo linear; intensidade não pode depender de cor.
- **Risco principal:** ensinar um número fixo de sinais para decidir ou confundir incerteza com inação.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** a fila torna a incerteza operacional; a matriz ensina escolher ação proporcional e reversível.
- **Vínculo recomendado:** família de triagem com estado inconclusivo e painel de ação segura.
- **Condição para avançar:** contrato genérico com estado pendente e catálogo de ações por contexto.

### Evidências no portal

- O PhishLab já modela conclusão inconclusiva, mas as simulações aceitam somente quatro ações e exigem decisão para todos os itens; ambas precisariam ser generalizadas.

## `concept:false-positive-control` — Controle de falsos positivos

### Formato A — Caixa de entrada balanceada

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Reuso possível:** `WorkdaySimulation` e `TeamChallenge` já incluem itens legítimos, verificação e penalização de falso positivo.
- **Trabalho novo:** ampliar diversidade de legitimidade, explicitar custo por ação inadequada e testar equilíbrio do conjunto.
- **Dependências:** revisão estatística/editorial de distribuição; backend autoritativo no uso real.
- **Acessibilidade:** sem mudança estrutural relevante; feedback deve explicar ação e evidência, não apenas nota.
- **Risco principal:** conjunto pequeno permitir decorar proporções ou induzir a procurar sempre “um legítimo”.

### Formato B — Tribunal sem veredito

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** seleção de evidências, conclusão inconclusiva e debrief dos laboratórios.
- **Trabalho novo:** apresentação equilibrada de hipóteses, escolha da próxima verificação e fechamento sem rótulo definitivo quando não houver base.
- **Dependências:** casos editorialmente defensáveis; revisão para não simular decisão jurídica real; backend autoritativo.
- **Acessibilidade:** argumentos e evidências em listas rotuladas; metáfora visual de tribunal não pode ocultar a estrutura.
- **Risco principal:** gamificar acusação ou premiar indecisão sem ação de verificação.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A mede custo de falsos positivos em volume; B ensina aceitar incerteza em um caso profundo. B deve ser um debrief/variação, não outro player completo.
- **Vínculo recomendado:** triagem balanceada com um caso inconclusivo expandido.
- **Condição para avançar:** métricas separadas de acerto, ação e falso positivo, validadas em casos diversos.

### Evidências no portal

- `evaluateSimulation` e `evaluateTeamChallenge` já contam falsos positivos; o resultado atual precisaria expor o raciocínio de forma mais granular.

## `concept:pare-model` — Modelo PARE

### Formato A — Estação PARE

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** stepper, foco por etapa, escolhas e fontes progressivas de `BankChangeChallenge`.
- **Trabalho novo:** shell declarativo para Pausar, Analisar, Resolver e Encaminhar, com evidência e ação observável em cada etapa.
- **Dependências:** definição institucional final do acrônimo e rotas oficiais; backend autoritativo.
- **Acessibilidade:** títulos de etapa, progresso semântico, retorno controlado e nenhuma transição cronometrada.
- **Risco principal:** virar checklist rígido e bloquear ações urgentes de contenção que deveriam ocorrer imediatamente.

### Formato B — Replay de decisão

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Reuso possível:** resultado, debrief e tentativa anterior já disponíveis no estado.
- **Trabalho novo:** linha causal que associe escolha, evidência ignorada e etapa PARE; alternativa textual e teste de repetição sem nova recompensa.
- **Dependências:** explicações específicas por atividade; backend para histórico autoritativo no uso real.
- **Acessibilidade:** sequência numerada e resumo textual; não depender de animação de replay.
- **Risco principal:** reconstruir uma justificativa genérica que não corresponda ao que o participante realmente fez.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A fornece estrutura reutilizável durante a ação e B consolida o modelo sobre decisões reais; juntos podem atravessar várias atividades sem gerar recompensa própria.
- **Vínculo recomendado:** shell/debrief transversal para atividades de decisão de maior impacto.
- **Condição para avançar:** extrair `ActivityShell`, padronizar eventos de decisão e manter PARE adaptável ao cenário.

### Evidências no portal

- `BankChangeChallenge` já demonstra etapas e foco; `selectActivityTimeline` registra apenas resumo da tentativa, portanto um replay causal requer eventos mais ricos no contrato.
