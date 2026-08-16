# Viabilidade de formatos — Destinos, links, QR, páginas e aplicativos

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Base:** portal local inspecionado em 2026-08-11; escopo desktop. Adaptação móvel permanece posterior.

Os artefatos abaixo seriam exclusivamente sintéticos e inertes. Nenhum formato autoriza navegação externa, leitura de QR por câmera, download, instalação, pagamento ou consulta a conta real. A classificação considera o estado local demonstrativo atual; backend autoritativo continua obrigatório antes de progresso, avaliação ou recompensa em uso real. A base pedagógica e as fontes oficiais de cada conceito permanecem no [estudo de formatos correspondente](../estudos-de-formatos/03-destinos-links-qr-paginas-e-aplicativos.md).

## `concept:url-anatomy` — Protocolo, host, caminho, consulta e fragmento

### Formato A — Mesa de dissecação

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** shell e etapas do PhishLab, botões de ferramenta, escolhas por rádio, caso guiado/independente e debrief de `PhishLabExperience`.
- **Trabalho novo:** tokenizador declarativo de URL, seleção e rotulagem de segmentos, resposta sem arrastar, avaliador próprio, contrato persistido e testes de limites.
- **Dependências:** corpus sintético revisado, regras editoriais para sufixos e parâmetros e backend autoritativo no uso real; não precisa de rede em execução.
- **Acessibilidade:** cada token precisaria de nome, posição e seleção por botão/menu; cor e geometria não poderiam carregar a resposta.
- **Risco principal:** transformar sintaxe em prova de memorização ou aceitar uma segmentação visual que não corresponda à URI modelada.

### Formato B — Mesma origem, outra roupa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** listas selecionáveis, rádios, cartões de artefato e comparação guiada/independente do PhishLab.
- **Trabalho novo:** agrupamento acessível por escolha de grupo, conjunto balanceado de URLs e avaliação que aceite contexto inconclusivo.
- **Dependências:** conteúdo versionado e backend autoritativo para registrar a tentativa; nenhum resolvedor externo.
- **Acessibilidade:** grupo selecionável por rádio ou `select`, com host anunciado em texto integral.
- **Risco principal:** ensinar que host idêntico basta para concluir segurança, ignorando caminho, ação pedida e possível comprometimento.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** é a fundação mais transferível, embora exija um componente reutilizável novo; o Formato B pode ser o caso independente do mesmo player.
- **Vínculo recomendado:** família de decomposição de URL do PhishLab, compartilhada pelos conceitos de domínio e redirecionamento.
- **Condição para avançar:** definir um modelo declarativo de segmentos, protótipo acessível sem arrastar e testes de URI sintética antes do contrato de atividade.

### Evidências no portal

- `features/phishlab/PhishLabExperience.tsx` já oferece o fluxo pedagógico, mas `LinkToolKey` só registra ferramentas usadas; não armazena segmentação nem agrupamento.

## `concept:registered-domain` — Domínio registrado e sufixo público

### Formato A — Árvore de controle

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** revelação progressiva de evidências, stepper e debrief do PhishLab.
- **Trabalho novo:** árvore acessível de rótulos, modelo de sufixo público versionado, cálculo determinístico e casos para sufixos simples, compostos e privados.
- **Dependências:** snapshot auditável da [Public Suffix List](https://publicsuffix.org/list/), revisão técnica de atualização e backend autoritativo para a versão usada na avaliação.
- **Acessibilidade:** estrutura em lista hierárquica, níveis anunciados e alternativa linear completa.
- **Risco principal:** congelar ou simplificar a lista e ensinar a falsa regra das “duas últimas partes”.

### Formato B — Quem controla este destino?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** comparação de fonte e pedido de `BankChangeChallenge`, ferramentas do analisador de links e decisão por rádio das Missões.
- **Trabalho novo:** referência oficial fictícia, destaque textual do domínio registrável já calculado e respostas proporcionais.
- **Dependências:** conteúdo corporativo fictício ou procedimento aprovado; backend com cálculo autoritativo do domínio antes de uso real.
- **Acessibilidade:** tabela linearizável com rótulos “recebido” e “referência”, sem depender apenas de realce visual.
- **Risco principal:** apresentar o domínio destacado como veredito automático ou como dado confiável calculado só pelo cliente.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** o comportamento seguro do Formato B cabe agora; a árvore do Formato A deve funcionar como ferramenta explicativa compartilhada, não como memorização de sufixos.
- **Vínculo recomendado:** laboratório de domínio, com aplicação posterior em uma Missão de rota sensível.
- **Condição para avançar:** adotar snapshot/versionamento de PSL e separar visualização pedagógica de cálculo autoritativo.

### Evidências no portal

- O analisador atual já expõe `registeredDomain`, porém o valor é conteúdo fixo; não existe parser nem fonte de sufixos em `lib/content` ou `lib/domain`.

## `concept:deceptive-subdomain` — Subdomínio enganoso

### Formato A — Camadas do endereço

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** botões `protocol`, `subdomain` e `registeredDomain`, cartão de URL e achados progressivos do PhishLab.
- **Trabalho novo:** visualização recolher/expandir, fronteira textual do registro e casos legítimos de hospedagem terceirizada.
- **Dependências:** mesmo modelo versionado de domínio registrável; backend autoritativo para correção real.
- **Acessibilidade:** botões de expandir/recolher, lista hierárquica e leitura integral do endereço.
- **Risco principal:** converter quantidade de pontos ou presença de marca à esquerda em regra de fraude.

### Formato B — Chamado de suporte

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa fictícia, painel de investigação, fonte progressiva e decisão das Missões existentes.
- **Trabalho novo:** cenário, referência de diretório fictício e feedback específico; o contrato genérico só serviria se a resposta continuasse em evidência/decisão/motivo.
- **Dependências:** procedimento corporativo e diretório simulados; backend obrigatório antes de usar referência real.
- **Acessibilidade:** comparação em texto e ações por `fieldset`, já alinhadas aos padrões atuais.
- **Risco principal:** sugerir que qualquer URL de terceiro é inválida ou que o diretório demonstrativo representa o procedimento real.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** a visualização A aprofunda o mecanismo e B demonstra a transferência; ambas encaixam sem justificar players separados.
- **Vínculo recomendado:** mesmo laboratório de anatomia/domínio, seguido de caso de suporte em Missão ou simulação.
- **Condição para avançar:** consolidar o componente de domínio registrado e escrever pares legítimo/enganoso que controlem falsos positivos.

### Evidências no portal

- `PhishLabExperience` e `MfaFatigueMission` já cobrem, respectivamente, camadas de URL e falso suporte; falta uma visualização genérica compartilhada.

## `concept:path-query-branding` — Marca no caminho, parâmetro ou fragmento

### Formato A — A fronteira do host

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartão de URL e ferramentas `registeredDomain`/`path` do PhishLab.
- **Trabalho novo:** tokens numerados, escolha do divisor e rótulos explícitos para host, caminho, consulta e fragmento.
- **Dependências:** exemplos sintéticos revisados e backend autoritativo para a avaliação real.
- **Acessibilidade:** ponto de divisão selecionado por lista de tokens, com descrição antes/depois.
- **Risco principal:** ensinar a ignorar parâmetros que contenham redirecionamento ou informação relevante.

### Formato B — Muitas histórias, mesmo destino

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartões, rádios e caso independente do laboratório.
- **Trabalho novo:** agrupador acessível e avaliação de quais parâmetros merecem investigação adicional.
- **Dependências:** corpus balanceado, inclusive URLs legítimas com outro endereço como dado; backend autoritativo no uso real.
- **Acessibilidade:** atribuição por menu, lista de grupos e resumo textual final.
- **Risco principal:** confundir “mesmo host” com “mesma intenção” ou penalizar uma classificação defensável como inconclusiva.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** estende diretamente o laboratório atual e ensina a fronteira essencial com menos estado que o agrupamento.
- **Vínculo recomendado:** etapa do componente compartilhado de anatomia de URL.
- **Condição para avançar:** definir como parâmetros aninhados serão exibidos sem exigir decodificação manual.

### Evidências no portal

- O PhishLab atual mostra `path`, mas não consulta/fragmento nem permite marcar fronteiras; a extensão fica localizada à experiência.

## `concept:typosquatting` — Typosquatting

### Formato A — Lente de comparação

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** caso guiado/independente, ferramentas reveláveis e conclusão proporcional do PhishLab.
- **Trabalho novo:** comparador Unicode acessível por posição, diferenças enumeradas, pares legítimos e avaliação baseada no uso da referência.
- **Dependências:** revisão linguística e de acessibilidade, strings reservadas e backend autoritativo; áudio seria opcional e dependeria de produção externa.
- **Acessibilidade:** soletração textual e nomes de caracteres; percepção visual e áudio não poderiam influenciar a nota.
- **Risco principal:** medir acuidade, dislexia ou fonte em vez de comportamento, e gerar listas que pareçam catálogo ofensivo.

### Formato B — Recuperar a rota

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** fontes progressivas de `BankChangeChallenge`, decisões de Missão e comparação de destino do PhishLab.
- **Trabalho novo:** navegação fictícia por favorito/diretório/aplicativo aprovado e resultado que não exija nomear o erro.
- **Dependências:** rotas e procedimentos sintéticos ou aprovados; backend autoritativo antes de progresso real.
- **Acessibilidade:** árvore de botões com rótulos completos e caminho atual anunciado.
- **Risco principal:** fazer a navegação simulada parecer um serviço real ou afirmar que a rota conhecida elimina todo risco.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** B mede o comportamento importante; A pode explicar a técnica sem virar teste visual.
- **Vínculo recomendado:** Missão de recuperação de rota com lente opcional no debrief ou no PhishLab.
- **Condição para avançar:** prototipar o comparador com leitor de tela e produzir falsos positivos legítimos obrigatórios.

### Evidências no portal

- O portal já mede decisões e uso de referências; não existe componente de comparação caractere a caractere nem contrato para a diferença identificada.

## `concept:typo-variants` — Omissão, inserção, troca, repetição e transposição

### Formato A — Famílias de alteração

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartões de opções, múltipla escolha, debrief e pacote de casos da Simulação.
- **Trabalho novo:** classificação por família, conjunto pequeno e rotativo e etapa final de ação segura.
- **Dependências:** revisão editorial para evitar marcas reais e backend autoritativo se a classificação compuser nota.
- **Acessibilidade:** descrição “faltou/trocou/mudou de posição” equivalente à marcação visual.
- **Risco principal:** premiar memorização de cinco padrões e associar toda diferença a fraude.

### Formato B — Erro de digitação sem culpa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** narrativa, evidências e decisão da Missão; rota segura como fonte progressiva.
- **Trabalho novo:** evento de digitação apenas narrado, página inesperada inerte e opções de recuperação/reporte.
- **Dependências:** conteúdo e procedimento de reporte; backend autoritativo no uso real.
- **Acessibilidade:** não exige digitação, velocidade nem percepção da variante.
- **Risco principal:** linguagem de culpa ou conclusão automática de comprometimento apenas porque a página divergiu.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** funciona como transferência dentro de typosquatting; não sustenta recompensa ou player próprios.
- **Vínculo recomendado:** banco de casos do laboratório de domínio parecido, com B como consequência narrativa ocasional.
- **Condição para avançar:** limitar famílias por tentativa e incluir diferenças legítimas/inconclusivas.

### Evidências no portal

- A Simulação já processa conjuntos de casos, mas sua taxonomia persistida é ação/evidência; classificar transformações exigiria extensão local ou novo contrato.

## `concept:combosquatting` — Palavra adicional, hífen, plural e outro TLD

### Formato A — Blocos de domínio

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** tokens do futuro componente de URL, escolhas por botão e conclusão do PhishLab.
- **Trabalho novo:** seletor de blocos sem arrastar, modelos de marca alegada/palavra/domínio/TLD e caso terceirizado legítimo.
- **Dependências:** corpus sintético e referência oficial fornecida; backend autoritativo no uso real.
- **Acessibilidade:** blocos selecionados e ordenados por controles nativos, com string final anunciada.
- **Risco principal:** ensinar que hífen, palavra de segurança, plural ou TLD alternativo são maliciosos por si.

### Formato B — Download corporativo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** lista de mensagens/resultados da Simulação, fontes progressivas e estação de processo de Equipes.
- **Trabalho novo:** resultados fictícios, catálogo oficial inerte e escolha da origem; nenhum arquivo seria baixado.
- **Dependências:** catálogo e procedimento corporativos fictícios ou aprovados; backend autoritativo antes de uso real.
- **Acessibilidade:** lista textual com metadados e ação explícita, sem distinguir apenas por logotipo.
- **Risco principal:** confundir o catálogo fictício com autorização real ou treinar o usuário a escolher pelo visual do resultado.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A explica o mecanismo e B mede o comportamento; ambos devem compartilhar a atividade de domínio em vez de repetir typosquatting.
- **Vínculo recomendado:** laboratório de domínio parecido seguido por caso de obtenção de software em simulação.
- **Condição para avançar:** consolidar tokens de domínio e definir uma referência oficial demonstrativa inequivocamente inerte.

### Evidências no portal

- Cartões, listas e fontes já existem; não há montador de blocos nem catálogo de software integrado.

## `concept:homograph-idn` — Homógrafos, IDN e Punycode

### Formato A — Identidade assistida

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ferramenta revelável e caso independente do PhishLab.
- **Trabalho novo:** anotação de script/código, representação ASCII explicada, normalização controlada, conteúdo multilíngue e testes de bidi/leitor de tela.
- **Dependências:** revisão Unicode especializada conforme [UTS #39](https://www.unicode.org/reports/tr39/), fontes testadas e backend autoritativo para a versão avaliada.
- **Acessibilidade:** nomes Unicode e posições em texto; nenhuma nota baseada em enxergar semelhança.
- **Risco principal:** tratar IDN ou Punycode como fraude, marginalizar escrita não latina ou introduzir falhas de bidi.

### Formato B — Sem caça à letra

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de rotas, decisões por rádio e debrief causal das Missões.
- **Trabalho novo:** duas superfícies sintéticas equivalentes e opção de abrir o serviço por rota independente.
- **Dependências:** conteúdo seguro e revisão inclusiva; backend autoritativo no uso real.
- **Acessibilidade:** cenário integralmente resolvível por processo e texto, com revelação técnica apenas no debrief.
- **Risco principal:** tornar as páginas visualmente “iguais” de forma que o exercício pareça pegadinha sem a rota alternativa clara.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Combinação.
- **Justificativa:** B deve carregar a avaliação; A serve como explicação assistida e não como caça visual.
- **Vínculo recomendado:** transferência dentro da Missão de recuperação de rota, com ferramenta Unicode opcional no PhishLab.
- **Condição para avançar:** validação com tecnologias assistivas, conteúdo multilíngue legítimo e política explícita contra veredito por Punycode.

### Evidências no portal

- O fluxo atual suporta ferramenta/debrief, mas não possui utilitários Unicode, testes de bidi ou componentes multilíngues especializados.

## `concept:link-text-mismatch` — Texto ou botão diferente do destino

### Formato A — Inspetor da mensagem

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cartão de mensagem do inspetor de remetente, ferramenta de link e achados pressionáveis.
- **Trabalho novo:** pares texto/destino, ação de revelar prévia inerte e casos em que a diferença é legítima ou inconclusiva.
- **Dependências:** corpus sintético e backend autoritativo se integrado à avaliação.
- **Acessibilidade:** destino revelado por botão focável e anunciado em texto completo; não depende de hover.
- **Risco principal:** reproduzir a instrução inacessível “passe o mouse” ou ensinar que toda diferença é maliciosa.

### Formato B — Promessa e destino

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** tabela/comparação de fontes de Equipes e opções de evidência do PhishLab.
- **Trabalho novo:** associação entre promessa, destino e ação segura, com justificativa curta.
- **Dependências:** conteúdo balanceado e backend autoritativo antes do uso real.
- **Acessibilidade:** linhas rotuladas e associação por seleção, sem conexão espacial obrigatória.
- **Risco principal:** reduzir a análise a igualdade literal e ignorar redirecionadores ou serviços legítimos.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** encaixa diretamente no PhishLab e ensina uma ferramenta observável; B pode compor o caso independente.
- **Vínculo recomendado:** estação de inspeção de links em mensagens.
- **Condição para avançar:** definir prévia acessível por teclado/toque e falsos positivos legítimos.

### Evidências no portal

- `SenderInspectorLab` já apresenta mensagem e ferramentas, mas não modela texto clicável versus destino nem eventos de prévia.

## `concept:url-shortener` — Encurtador

### Formato A — Prévia controlada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ferramenta revelável do PhishLab, cartão de artefato e conclusão em três estados.
- **Trabalho novo:** prévia totalmente declarativa, cadeia curta exibida sem resolver rede e estado de destino indisponível.
- **Dependências:** casos pré-calculados e backend autoritativo; nenhum serviço real de expansão.
- **Acessibilidade:** botão “mostrar destino simulado” e leitura linear da cadeia.
- **Risco principal:** prévia fictícia parecer uma garantia ou estimular abertura do link para “descobrir”.

### Formato B — Sensibilidade da ação

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** decisão/motivos das Missões e tipos legítimo, suspeito e verificar da Simulação.
- **Trabalho novo:** casos que variem ação solicitada e rota alternativa; não exige novo estado se for um caso no player existente.
- **Dependências:** conteúdo/procedimento e backend autoritativo do player hospedeiro.
- **Acessibilidade:** somente texto, grupos de escolha e explicação causal.
- **Risco principal:** regra absoluta “encurtador é golpe” ou pontuar reporte quando a resposta adequada seria verificar.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Combinação.
- **Justificativa:** a prévia A só deve explicar opacidade; B mede a decisão proporcional e cabe como caso, sem uma atividade isolada.
- **Vínculo recomendado:** caso do analisador de links e transferência em caixa de entrada.
- **Condição para avançar:** garantir que toda expansão seja conteúdo inerte e que “inconclusivo” seja resposta válida.

### Evidências no portal

- O PhishLab possui veredito inconclusivo e ferramentas clicáveis; não há rede, resolvedor ou cadeia de destinos, o que favorece dados pré-declarados.

## `concept:open-redirect` — Redirecionador aberto

### Formato A — Microscópio de parâmetro

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** futuro tokenizador de URL, ferramenta `path` e debrief do PhishLab.
- **Trabalho novo:** parâmetros aninhados, decodificação apenas assistida, indicação do destino seguinte e avaliação do limite humano.
- **Dependências:** exemplos pré-calculados, revisão técnica e backend autoritativo; nenhuma execução de redirecionamento.
- **Acessibilidade:** parâmetro e valor em lista, destino decodificado já fornecido, sem caça visual.
- **Risco principal:** ensinar decodificação manual como obrigação ou dar falsa certeza sobre cadeias mais complexas.

### Formato B — Confiança emprestada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** pedido, fonte oficial e decisão da estação de processo/ Missão.
- **Trabalho novo:** cenário em domínio conhecido com destino externo revelado e rota própria alternativa.
- **Dependências:** procedimento e domínios sintéticos; backend autoritativo antes do uso real.
- **Acessibilidade:** sequência textual origem → redirecionador → destino, além da representação visual.
- **Risco principal:** concluir que o domínio inicial legítimo autentica o destino final, ou que todo redirecionamento legítimo é inseguro.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina a decisão com baixo risco; A deve ser ferramenta avançada dentro da família de URL, não player próprio.
- **Vínculo recomendado:** caso avançado do laboratório de redirecionamentos.
- **Condição para avançar:** concluir o tokenizador e representar destinos aninhados sem pedir análise manual impossível.

### Evidências no portal

- O contrato atual só distingue partes fixas de URL; não registra cadeia nem parâmetro selecionado, enquanto a decisão segura já cabe nas Missões.

## `concept:redirect-chain` — Cadeia de redirecionamentos

### Formato A — Mapa de percurso

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** fontes reveladas progressivamente, cartões e resumo de evidências.
- **Trabalho novo:** linha de nós acessível, estados direto/redirecionado/interrompido, justificativa e contrato que registre a interpretação.
- **Dependências:** cadeia inteiramente pré-calculada, conteúdo técnico e backend autoritativo; nenhum salto de rede.
- **Acessibilidade:** lista ordenada equivalente ao mapa, foco previsível e relações anunciadas por texto.
- **Risco principal:** o diagrama sugerir que o navegador sempre revela toda a cadeia ou que quantidade de saltos determina malícia.

### Formato B — Reconstrução pós-evento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** thread e evidências da Missão de conversa comprometida; incidente adaptável de recuperação.
- **Trabalho novo:** eventos pré-ordenados ou seleção de ordem por controles, identificação do ponto de mudança e resposta proporcional.
- **Dependências:** narrativa e procedimento; backend autoritativo no uso real.
- **Acessibilidade:** ordenação por botões “mover antes/depois” ou escolha de posição, nunca arrastar obrigatório.
- **Risco principal:** atribuir ao funcionário a reconstrução forense exata ou inferir causalidade além dos dados apresentados.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** a reconstrução aproveita padrões reais e ensina limites; o mapa A só vale como visualização complementar compartilhada.
- **Vínculo recomendado:** família de linha do incidente, conectada à recuperação após clique.
- **Condição para avançar:** criar primeiro uma ordenação acessível compartilhada e definir quais eventos são observáveis pelo usuário.

### Evidências no portal

- Há threads e fontes progressivas, mas não há grafo nem ordenação compartilhada; o teste atual também não cobre teclado ou comportamento visual.

## `concept:url-obfuscation-advanced` — `userinfo@host`, IP, codificação e abuso de esquema

### Formato A — Normalizador explicativo

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** apenas shell, ferramentas e debrief do PhishLab.
- **Trabalho novo:** parser seguro e versionado para várias sintaxes, representação normalizada, casos de erro, manutenção técnica e testes extensos.
- **Dependências:** revisão de URI/navegador, biblioteca mantida, backend autoritativo e versionamento do resultado; nada poderia ser resolvido por navegação real.
- **Acessibilidade:** forma canônica e explicação linear; nunca exigir decodificação ou leitura de pontuação.
- **Risco principal:** construir um “detector” incompleto que passe falsa confiança e amplie demais a responsabilidade humana.

### Formato B — Limite de investigação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conclusão inconclusiva do PhishLab, decisões das Missões e rota conhecida como fonte.
- **Trabalho novo:** casos complexos deliberadamente não decodificáveis e escolhas seguras de abandonar/verificar/reportar.
- **Dependências:** revisão técnica/editorial e backend autoritativo no player hospedeiro.
- **Acessibilidade:** texto que explicita complexidade e ações, sem teste perceptivo.
- **Risco principal:** tratar toda URL complexa como fraude ou premiar a tentativa de “resolver” o artefato.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** ensina o limite correto com custo e risco muito menores; o normalizador completo não é proporcional ao papel do funcionário.
- **Vínculo recomendado:** caso avançado e debrief do laboratório de URL.
- **Condição para avançar:** definir critérios editoriais de incerteza e garantir que nenhuma resposta dependa de parser parcial no cliente.

### Evidências no portal

- O portal não usa parser de URL além de roteamento interno e o tipo `LinkToolKey` é fechado; um normalizador atravessaria conteúdo, domínio, persistência e testes.

## `concept:https-limit` — HTTPS e cadeado

### Formato A — Túnel de transporte

- **Viabilidade:** Média.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** debrief causal, cartões e marcações textuais.
- **Trabalho novo:** diagrama simples origem–transporte–destino, estados cifrado/não cifrado e perguntas sobre o que foi ou não provado.
- **Dependências:** revisão técnica de TLS e backend autoritativo apenas para avaliação/progresso.
- **Acessibilidade:** versão textual completa do diagrama e relações nomeadas.
- **Risco principal:** simplificar TLS a ponto de ensinar que certificado não tem valor ou que HTTPS é irrelevante.

### Formato B — Dois destinos cifrados

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação do PhishLab, rádios de veredito e evidências “HTTPS sozinho”.
- **Trabalho novo:** par legítimo/suspeito e feedback que separa canal cifrado de identidade/contexto.
- **Dependências:** conteúdo sintético e backend autoritativo do laboratório.
- **Acessibilidade:** URLs e diferenças lidas em texto; cadeado não depende de ícone ou cor.
- **Risco principal:** inverter o mito e ensinar “HTTPS é suspeito” em vez de “HTTPS não basta”.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** o portal já possui exatamente essa evidência; A pode ser um debrief curto, sem player separado.
- **Vínculo recomendado:** fundamento transversal no laboratório de domínio e páginas.
- **Condição para avançar:** revisar a formulação técnica e incluir exemplo legítimo que exige HTTPS.

### Evidências no portal

- `LinkEvidenceKey` já inclui `https-alone`, e o avaliador do PhishLab trata essa escolha como evidência incorreta quando usada como prova suficiente.

## `concept:cloned-page` — Página clonada e coleta de credenciais

### Formato A — Espelho sequencial

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartões de artefato, evidências reveláveis e debrief.
- **Trabalho novo:** duas superfícies estáticas de página, controle de comparação, foco consistente e conteúdo visual/textual equivalente.
- **Dependências:** produção visual de qualidade, revisão de marcas/privacidade e backend autoritativo; campos seriam inertes e não aceitariam segredo.
- **Acessibilidade:** conteúdo e diferenças em estrutura semântica; comparação não poderia exigir visão lado a lado.
- **Risco principal:** criar uma imitação convincente demais, coletar texto em formulário ou ensinar caça a defeitos visuais frágeis.

### Formato B — Painel de evidências de confiança

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** botões de evidência, múltipla escolha e decisão das Missões/PhishLab.
- **Trabalho novo:** classificar evidências copiáveis e não copiáveis e escolher a rota segura.
- **Dependências:** conteúdo visual/textual sintético e backend autoritativo para correção real.
- **Acessibilidade:** cada evidência nomeada em texto e ação resolvível sem imagem.
- **Risco principal:** sugerir que elementos “não copiáveis” visíveis autenticam a página ou que aparência ruim é requisito de phishing.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B mede raciocínio e evita uma comparação puramente estética; A pode fornecer o artefato sequencial quando houver produção acessível.
- **Vínculo recomendado:** futura estação Espelho de Página do PhishLab.
- **Condição para avançar:** proibir entrada de credenciais, definir conteúdo semanticamente equivalente e validar a página com teclado/leitor de tela.

### Evidências no portal

- O hub do PhishLab já reserva “Espelho de Página”, mas não existe seu player, contrato, catálogo ou componente de página clonada.

## `concept:false-sso` — Falso SSO

### Formato A — Handoff de autenticação

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** stepper, fontes progressivas e cartões de artefato.
- **Trabalho novo:** sequência aplicativo → provedor de identidade → retorno, indicação de origem em cada etapa e resposta sobre onde autenticar.
- **Dependências:** fluxo fictício aprovado por identidade/segurança e backend autoritativo; nenhum login real ou cookie.
- **Acessibilidade:** etapas enumeradas, origem textual e foco movido para o título de cada tela.
- **Risco principal:** simular detalhes diferentes do SSO corporativo e ensinar expectativas incorretas.

### Formato B — Trabalho interrompido

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cenário de Missão, painel de decisão e rota conhecida.
- **Trabalho novo:** interrupção contextual, opções continuar/reabrir/verificar/reportar e debrief do handoff.
- **Dependências:** procedimento corporativo ou claramente fictício; backend autoritativo no uso real.
- **Acessibilidade:** narrativa e opções nativas; não exige distinguir janela visual.
- **Risco principal:** afirmar que toda nova autenticação durante o trabalho é maliciosa ou omitir casos legítimos de reautenticação.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Combinação.
- **Justificativa:** B é o núcleo avaliável; A deve ser explicação controlada e aderente ao ambiente corporativo quando ele for definido.
- **Vínculo recomendado:** Missão de credenciais/página clonada, com handoff como ferramenta de investigação.
- **Condição para avançar:** obter modelo de SSO autorizado e definir sinais invariantes, sem reproduzir login real.

### Evidências no portal

- Não há autenticação corporativa real; `app/chatgpt-auth.ts` não compõe as atividades. O padrão de etapas existe, mas um handoff precisaria de contrato próprio.

## `concept:browser-in-browser` — Janela de navegador simulada

### Formato A — Inspetor de camadas

- **Viabilidade:** Não recomendada neste formato.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** evidências e debrief; não há janela/navegador simulado reutilizável.
- **Trabalho novo:** representação segura de página, janela desenhada e moldura real, com explicação de camadas e estados de foco.
- **Dependências:** design visual/acessível especializado, revisão de segurança e backend autoritativo se avaliado.
- **Acessibilidade:** árvore textual de camadas obrigatória; coordenadas e semelhança visual não podem determinar a resposta.
- **Risco principal:** reproduzir uma interface enganosa, confundir o navegador real e tornar o exercício uma pegadinha visual.

### Formato B — Saída independente

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** decisão de Missão, navegação fictícia por fonte conhecida e debrief.
- **Trabalho novo:** pedido de login em camada representada e opções de fechar/reabrir pelo serviço conhecido.
- **Dependências:** conteúdo inerte e backend autoritativo no player hospedeiro.
- **Acessibilidade:** cenário resolvível por texto, sem depender de perceber a janela falsa.
- **Risco principal:** esconder a alternativa segura ou ensinar atalhos visuais que mudam entre navegadores.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** preserva o comportamento transferível e evita construir uma imitação de navegador de alto risco.
- **Vínculo recomendado:** caso de falso SSO/página clonada, não player próprio.
- **Condição para avançar:** revisão de segurança de conteúdo e linguagem explícita de simulação antes de qualquer artefato visual.

### Evidências no portal

- A interface tem cartões de página, mas não possui browser chrome, sandbox de conteúdo ou testes visuais/E2E capazes de validar a distinção.

## `concept:captcha-trust` — CAPTCHA como falsa prova de segurança

### Formato A — O que foi provado?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de evidência e veredito do PhishLab.
- **Trabalho novo:** CAPTCHA inerte já concluído e escolhas sobre sua propriedade probatória.
- **Dependências:** conteúdo revisado e backend autoritativo do laboratório; nenhum widget real de terceiros.
- **Acessibilidade:** não exige resolver CAPTCHA; a situação e o resultado são descritos em texto.
- **Risco principal:** ensinar que CAPTCHA é sempre suspeito ou criar barreira cognitiva/visual desnecessária.

### Formato B — Depois do desafio

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** sequência de Missão e resposta a incidente.
- **Trabalho novo:** etapa posterior que pede download/comando/login e decisão de interromper/verificar.
- **Dependências:** artefatos inertes, procedimento seguro e backend autoritativo.
- **Acessibilidade:** todas as instruções em texto; nenhuma interação externa ou cópia executável.
- **Risco principal:** aproximar-se de ClickFix sem deixar clara a fronteira entre prova de humanidade e ação no dispositivo.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** é um ensinamento complementar simples; B deve aparecer junto de ClickFix, não duplicar atividade.
- **Vínculo recomendado:** painel de evidências de página e debrief da atividade de falso CAPTCHA.
- **Condição para avançar:** manter o CAPTCHA inteiramente cenográfico e incluir exemplos legítimos que calibrem a conclusão.

### Evidências no portal

- O contrato do PhishLab já pontua evidências corretas/incorretas e se adapta ao limite “não prova legitimidade” sem nova mecânica.

## `concept:quishing` — Quishing

### Formato A — Leitor simulado

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartão de artefato, revelação de ferramenta e analisador de URL.
- **Trabalho novo:** QR visual sintético, botão que revela payload pré-definido, transferência ao componente de URL e contrato de resposta.
- **Dependências:** geração de QR inerte/seguro, conteúdo e backend autoritativo; câmera e scanner real permanecem proibidos.
- **Acessibilidade:** payload e contexto sempre disponíveis em texto; imagem do QR é ilustrativa.
- **Risco principal:** o código ser escaneável para destino não controlado ou o “leitor” parecer validar segurança.

### Formato B — Handoff entre canais

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** sequência multietapa de MFA, cartões de mensagem e rota conhecida.
- **Trabalho novo:** eventos e-mail/aviso/QR/página apresentados estaticamente, com decisão em cada fronteira relevante.
- **Dependências:** conteúdo multicanal sintético e backend autoritativo; nenhum envio ou abertura real.
- **Acessibilidade:** canal, ordem e destino textual; QR não é a única fonte de informação.
- **Risco principal:** simulação multicanal parecer tempo real ou atribuir risco ao QR em si, não ao destino/ação.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** B ensina a mudança de canal; A oferece a ponte técnica para o laboratório de URL sem câmera.
- **Vínculo recomendado:** Missão “Entrega por QR Code” e conteúdo opcional do Radar já planejado.
- **Condição para avançar:** política de QR inerte, descrição textual equivalente e componente de URL compartilhado.

### Evidências no portal

- O catálogo curricular já referencia quishing e uma futura Missão de entrega, mas só o artigo de Radar está disponível; não existe leitor/QR no código.

## `concept:qr-physical-replacement` — QR físico substituído

### Formato A — Inspeção do ambiente

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Mídia ou processo externo.
- **Componentes e padrões reutilizáveis:** cartões de evidência e decisão; a inspeção visual/espacial seria nova.
- **Trabalho novo:** imagem ou planta de alta qualidade com pontos selecionáveis, alternativa textual e casos de dano legítimo.
- **Dependências:** produção visual, revisão de acessibilidade e procedimento de reporte físico; backend autoritativo se pontuado.
- **Acessibilidade:** lista equivalente de observações; hotspots não podem ser obrigatórios.
- **Risco principal:** medir visão/precisão, ensinar sinais superficiais e não representar contextos físicos reais.

### Formato B — Registro do ativo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** fontes progressivas do desafio bancário, comparação de registros e construtor de reporte da recuperação.
- **Trabalho novo:** ativo/identificador/local fictícios, comparação com cadastro e seleção de evidências adequadas ao reporte.
- **Dependências:** procedimento corporativo de ativos e canal de reporte aprovados; backend antes de qualquer dado real.
- **Acessibilidade:** tabela e formulário de escolhas, sem fotografia obrigatória.
- **Risco principal:** prometer um registro que o portal não integra ou incentivar coleta indevida de imagem/dados do ambiente.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina confirmação e reporte sem exigir ambiente espacial; A pode virar ilustração opcional posteriormente.
- **Vínculo recomendado:** caso de QR físico em Missão ou simulação, não PhishLab isolado.
- **Condição para avançar:** receber procedimento real autorizado e manter todo cadastro apenas fictício até backend/integração próprios.

### Evidências no portal

- Não há upload, câmera, mapa ou diretório de ativos; a estação de processo já oferece o padrão de comparar cadastro e solicitação.

## `concept:qr-payment-destination` — QR, valor e beneficiário

### Formato A — Confirmação de pagamento simulada

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** comparação de conta do desafio bancário e painel de evidências.
- **Trabalho novo:** tela de confirmação totalmente fictícia, campos valor/beneficiário/identificador e decisão de interromper/confirmar por rota independente.
- **Dependências:** revisão financeira e de privacidade, dados sintéticos e backend autoritativo; nenhum pagamento ou QR real.
- **Acessibilidade:** todos os dados em texto/tabela; diferenças não dependem de cor ou máscara.
- **Risco principal:** interface parecer bancária real, treinar procedimento diferente do corporativo ou expor dados sensíveis.

### Formato B — Reconciliação de fornecedor

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** `BankChangeChallenge`: cadastro anterior, contato homologado, fontes progressivas e cinco decisões.
- **Trabalho novo:** caso de QR como mais um artefato e comparação de beneficiário/valor sem executar transação.
- **Dependências:** procedimento financeiro autorizado e backend autoritativo antes de uso real.
- **Acessibilidade:** comparação tabular e escolhas por rádio já suportadas.
- **Risco principal:** representar uma regra financeira genérica como política corporativa ou usar dados reais no cliente.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** há encaixe quase direto na estação bancária; uma tela de pagamento separada aumenta risco e duplicação.
- **Vínculo recomendado:** variação futura da família Mudança bancária sem atalho.
- **Condição para avançar:** validação pelo responsável financeiro e catálogo exclusivamente sintético até backend e autorização.

### Evidências no portal

- O desafio bancário já modela contas, contato registrado, processo e privacidade; não há integração bancária e ela não é necessária ao ensino.

## `concept:seo-poisoning` — SEO poisoning

### Formato A — Página de resultados fictícia

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** lista de caixa de entrada/resultados, cartões, metadados e seleção de item.
- **Trabalho novo:** SERP sintética claramente rotulada, resultados orgânicos/patrocinados, referências oficiais e ação segura.
- **Dependências:** conteúdo que não copie busca real, revisão de marca e backend autoritativo se avaliado.
- **Acessibilidade:** ordem DOM igual à ordem visual, rótulo textual “patrocinado” e URLs completas.
- **Risco principal:** envelhecer rapidamente, sugerir que posição alta implica fraude ou segurança e confundir a página fictícia com buscador real.

### Formato B — Planejador de rota

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** estação de processo, fontes oficiais e decisões por etapa.
- **Trabalho novo:** tarefa de obter software/serviço e escolha entre favorito, catálogo, busca ou link recebido.
- **Dependências:** procedimento/catálogo fictício ou aprovado e backend autoritativo.
- **Acessibilidade:** caminhos como botões e lista ordenada, sem simular digitação real.
- **Risco principal:** ensinar “nunca use busca” em vez de priorizar uma rota adequada à sensibilidade.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A contextualiza o vetor e B avalia o hábito sustentável; devem formar um único caso.
- **Vínculo recomendado:** simulação de obtenção de software, junto de anúncio malicioso e atualização falsa.
- **Condição para avançar:** criar uma SERP sem semelhança enganosa com serviço real e definir referências corporativas autorizadas.

### Evidências no portal

- O padrão de lista selecionável já existe na Simulação, mas não há mecanismo de busca, navegador externo ou catálogo de software.

## `concept:malicious-ad` — Anúncio falso e malvertising

### Formato A — Faixa patrocinada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** página de resultados proposta, cartões e painel de evidências.
- **Trabalho novo:** marcação patrocinada, anunciante/domínio/destino e decisão sem clicar.
- **Dependências:** conteúdo sintético, revisão de publicidade/plataforma e backend autoritativo.
- **Acessibilidade:** rótulo patrocinado textual e metadados legíveis; não depender de posição ou cor.
- **Risco principal:** “patrocinado = malicioso” ou confiar no nome do anunciante como prova.

### Formato B — Botões de download concorrentes

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartão de página e fontes progressivas; ações seriam botões inertes.
- **Trabalho novo:** superfície estática com opções concorrentes, inspeção de origem e saída pelo catálogo oficial.
- **Dependências:** produção visual acessível e backend autoritativo; nenhum botão gera download.
- **Acessibilidade:** cada opção recebe rótulo, origem e finalidade em lista equivalente.
- **Risco principal:** interface confusa por design, clique acidental ou treinamento por estética do botão.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B transfere melhor ao objetivo de obter software; A é uma variação da mesma SERP de SEO poisoning.
- **Vínculo recomendado:** caso único de busca/download com SEO poisoning, combosquatting e fake update.
- **Condição para avançar:** garantir botões sem efeito, foco claro e rota oficial disponível desde o cenário.

### Evidências no portal

- Botões e cartões são fáceis de compor, mas os testes atuais não exercitam clique acidental, foco ou distinção visual; seria necessária validação de navegador.

## `concept:fake-app-developer` — Aplicativo e desenvolvedor imitados

### Formato A — Ficha da loja

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartões comparativos, fontes e escolhas do PhishLab.
- **Trabalho novo:** ficha fictícia com nome, editor, permissões, origem e referência do catálogo aprovado.
- **Dependências:** conteúdo de loja sintético, política corporativa de software e backend autoritativo.
- **Acessibilidade:** campos como lista de definição/tabela; ícone e avaliação visual não determinam a resposta.
- **Risco principal:** ensinar que selo/editor é garantia absoluta ou reproduzir loja/marca real de forma enganosa.

### Formato B — Solicitação de instalação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte de MFA, Missão com evidências e rota oficial.
- **Trabalho novo:** pedido de instalação, justificativa, comparação ao catálogo e decisão/reportar.
- **Dependências:** processo de instalação aprovado e backend autoritativo; nenhum pacote real.
- **Acessibilidade:** conversa e escolhas textuais já compatíveis com os padrões atuais.
- **Risco principal:** confundir editor conhecido com autorização daquele pedido ou ensinar um fluxo corporativo inexistente.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A oferece a evidência específica e B valida comportamento; cabe em uma atividade de software sem integração externa.
- **Vínculo recomendado:** caso de download/instalação segura, próximo de permissões OAuth e ferramenta remota.
- **Condição para avançar:** obter política corporativa de aplicativos e manter ficha/instalador completamente inertes.

### Evidências no portal

- A estação de processo e o falso suporte são reutilizáveis; não há loja, catálogo aprovado nem tipos persistidos para permissões de aplicativo.

## `concept:legitimate-site-compromise` — Site legítimo comprometido

### Formato A — Domínio certo, comportamento errado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** decisão/evidências da Missão e caso “conta conhecida comprometida” já implementado.
- **Trabalho novo:** página de domínio esperado com comportamento novo e escolha de interromper, verificar e reportar.
- **Dependências:** conteúdo sintético, procedimento de reporte e backend autoritativo.
- **Acessibilidade:** sinais e comportamento descritos em texto, sem exigir comparar pixel.
- **Risco principal:** concluir que domínio legítimo é irrelevante ou que qualquer mudança de comportamento significa comprometimento.

### Formato B — Divisão de responsabilidades

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** escolhas de ação/relato da recuperação e debrief sem culpa.
- **Trabalho novo:** separar ações do funcionário, suporte e equipe técnica em opções.
- **Dependências:** matriz de responsabilidades corporativa e backend do player hospedeiro.
- **Acessibilidade:** agrupamento textual por papel.
- **Risco principal:** atribuir diagnóstico/limpeza técnica ao funcionário ou prometer resposta operacional inexistente.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A é um caso forte de transferência; B deve estar no debrief/reporte, não virar player próprio.
- **Vínculo recomendado:** Missão de conta/site comprometido e atividade de recuperação.
- **Condição para avançar:** definir procedimento corporativo e limites explícitos de responsabilidade.

### Evidências no portal

- `CompromisedConversationMission` já ensina “origem conhecida não basta”; `RecoveryMission` já separa ação segura e danosa.

## `concept:watering-hole` — Watering hole

### Formato A — Retrospectiva sem culpa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** thread temporal, evidências e debrief da conversa comprometida/recuperação.
- **Trabalho novo:** sequência visita → comportamento inesperado → alerta posterior, com seleção apenas do que era observável.
- **Dependências:** narrativa técnica revisada, procedimento de reporte e backend autoritativo.
- **Acessibilidade:** linha do tempo linear e evidências textuais.
- **Risco principal:** culpa retrospectiva ou insinuar que o funcionário deveria detectar comprometimento invisível.

### Formato B — Barreiras em camadas

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartões de decisão e painel de responsabilidades.
- **Trabalho novo:** alocar respostas entre usuário, navegador, endpoint e equipe de segurança, sem pontuar detecção técnica humana.
- **Dependências:** revisão de controles organizacionais e backend do player se avaliado.
- **Acessibilidade:** tabela por papel e ação, sem diagrama obrigatório.
- **Risco principal:** transformar controles técnicos em promessa de proteção total ou responsabilizar o usuário por sua operação.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Nenhum como player próprio.
- **Justificativa:** o conceito é valioso para calibrar responsabilidade, mas os comportamentos observáveis já cabem em recuperação e site comprometido.
- **Vínculo recomendado:** debrief causal e caso de transferência em incidente de site legítimo.
- **Condição para avançar:** somente como narrativa revisada por segurança, sem recompensa própria nem exigência de detecção.

### Evidências no portal

- O portal favorece decisões discretas, mas não possui telemetria de navegador/endpoint; simular detecção técnica produziria avaliação enganosa.

## `concept:pharming` — Pharming

### Formato A — Caminho da resolução

- **Viabilidade:** Baixa.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** apenas debrief e fontes progressivas.
- **Trabalho novo:** diagrama DNS/resolução sem tecnicismo excessivo, estados confiável/alterado e limite de ação do usuário.
- **Dependências:** revisão técnica especializada e backend autoritativo para avaliação; nenhuma consulta DNS real.
- **Acessibilidade:** narrativa linear equivalente ao diagrama.
- **Risco principal:** sugerir que o usuário consegue validar DNS visualmente ou que deve diagnosticar a infraestrutura.

### Formato B — Rota correta, alerta inesperado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** Missão com evidências, aviso do navegador inerte e recuperação/reportar.
- **Trabalho novo:** cenário em rota conhecida com alerta ou página incoerente e decisão de parar/usar canal oficial.
- **Dependências:** procedimento corporativo, conteúdo de aviso revisado e backend autoritativo.
- **Acessibilidade:** alerta semanticamente anunciado e opções de ação claras; não imitar controle real do navegador.
- **Risco principal:** diagnosticar pharming a partir de sintoma não específico ou ensinar a ignorar exceções legítimas autorizadas.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** mede o comportamento correto sem exigir diagnóstico de DNS; A pode ser explicação breve no debrief.
- **Vínculo recomendado:** atividade de avisos do navegador e rota conhecida.
- **Condição para avançar:** revisão de linguagem que mantenha múltiplas causas possíveis e procedimento oficial de escalonamento.

### Evidências no portal

- Não há DNS, rede ou navegador remoto; o contrato de Missão já aceita o padrão observar–decidir–reportar.

## `concept:browser-warning` — Avisos do navegador e certificado

### Formato A — Intersticial seguro

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** alerta, botões de evidência, decisão e debrief.
- **Trabalho novo:** intersticial claramente simulado, tipos de aviso, opção de voltar e abrir canal oficial; nenhum botão contorna proteção.
- **Dependências:** revisão técnica/de conteúdo e backend autoritativo.
- **Acessibilidade:** `role="alert"`, título específico, foco controlado e equivalente textual.
- **Risco principal:** confundir-se com aviso real do navegador ou ensinar onde fica a opção de ignorar.

### Formato B — Exceção corporativa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte, fontes do processo e decisão por canal conhecido.
- **Trabalho novo:** alegação de exceção, fonte de autorização fictícia e escolha de confirmar/reportar.
- **Dependências:** procedimento corporativo aprovado e backend autoritativo.
- **Acessibilidade:** conversa e fonte em texto; nenhum alerta visual obrigatório.
- **Risco principal:** criar procedimento genérico para exceções ou normalizar o contorno de avisos.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A treina resposta imediata e B resiste à persuasão posterior; juntos evitam uma regra apenas visual.
- **Vínculo recomendado:** Missão de rota/aviso inesperado.
- **Condição para avançar:** design que não reproduza exatamente navegador real e validação do fluxo corporativo de suporte.

### Evidências no portal

- Há alertas e diálogos acessíveis, mas não intersticial de navegador; modais de onboarding demonstram foco/inert que pode orientar o componente.

## `concept:password-manager-clue` — Ausência de preenchimento automático

### Formato A — Dois logins

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** comparação de cartões e painel de evidências.
- **Trabalho novo:** dois formulários inertes, indicação declarativa “gerenciador reconheceu/não reconheceu” e rota segura.
- **Dependências:** conteúdo e revisão técnica; nenhuma integração com gerenciador real; backend autoritativo se avaliado.
- **Acessibilidade:** estado do gerenciador é texto/status, não ícone; campos não aceitam credenciais.
- **Risco principal:** ausência de preenchimento virar veredito ou o formulário induzir entrada de senha.

### Formato B — Calibração de evidência

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de evidência do PhishLab e debrief.
- **Trabalho novo:** classificar a pista como útil, insuficiente ou não aplicável em diferentes contextos.
- **Dependências:** exemplos e backend do player hospedeiro.
- **Acessibilidade:** seleção textual simples.
- **Risco principal:** ignorar que preferências, navegador, subdomínio ou cofre bloqueado também explicam a ausência.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A concretiza a pista e B impede confiança excessiva; deve compartilhar atividade com `concept:password-manager` do conjunto 04.
- **Vínculo recomendado:** laboratório de autenticação/domínio, não player duplicado neste conjunto.
- **Condição para avançar:** unificar a especificação com o conceito canônico de gerenciador e proibir entrada de segredo.

### Evidências no portal

- Não há formulário pedagógico inerte nem API de gerenciador; o padrão de evidência já suporta a calibração B.

## `concept:malicious-unsubscribe` — “Cancelar inscrição” malicioso

### Formato A — Caixa de entrada

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** `WorkdaySimulation`, com mensagem, link/anexo, evidências e quatro ações.
- **Trabalho novo:** casos legítimo, suspeito e inconclusivo de cancelamento, incluindo resposta por ferramenta nativa.
- **Dependências:** conteúdo e procedimento de e-mail; backend autoritativo do pacote real.
- **Acessibilidade:** mensagem e destino em texto; ação pela interface simulada, nunca link real.
- **Risco principal:** ensinar que todo “cancelar inscrição” é golpe ou que “apenas excluir” sempre basta.

### Formato B — Rota de preferências

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** navegação por fonte conhecida e preferências locais do Perfil como padrão visual, sem reutilizar dados reais.
- **Trabalho novo:** central de preferências fictícia, comparação de caminhos e decisão sobre reporte/bloqueio.
- **Dependências:** procedimento da plataforma/corporativo e backend autoritativo; nenhuma alteração de assinatura real.
- **Acessibilidade:** sequência de botões e confirmação textual.
- **Risco principal:** prometer cancelamento funcional ou misturar preferências do portal com as do serviço simulado.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A oferece triagem realista e B ensina uma saída segura; cabe como caso, não requer player próprio.
- **Vínculo recomendado:** pacote de caixa de entrada com transferência para rota oficial.
- **Condição para avançar:** definir ações por plataforma e manter todas as URLs/controles sem efeito externo.

### Evidências no portal

- A Simulação já suporta casos com ação/evidência e falsos positivos; a central de preferências seria conteúdo novo, não integração.

## `concept:tracking-pixel` — Pixel ou beacon invisível

### Formato A — Laboratório de carregamento

- **Viabilidade:** Não recomendada neste formato.
- **Esforço relativo:** G.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** debrief e cartões; o fenômeno de rede não possui representação atual.
- **Trabalho novo:** visualização causal inteiramente simulada de carregamento remoto, estados de configuração e limite do observável.
- **Dependências:** revisão técnica/privacidade e backend apenas para avaliação; nenhum recurso remoto seria solicitado.
- **Acessibilidade:** eventos de rede em lista textual; o “pixel” visual não pode ser alvo da tarefa.
- **Risco principal:** fingir que o funcionário detecta um recurso invisível ou executar rastreamento acidental no material.

### Formato B — Painel de responsabilidade

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de resposta, debrief e divisão de responsabilidades da recuperação.
- **Trabalho novo:** associar abrir/reportar/configurar/filtrar aos papéis corretos e explicar incerteza.
- **Dependências:** política de privacidade/e-mail e backend do player hospedeiro.
- **Acessibilidade:** tabela linear de papel e ação.
- **Risco principal:** prometer bloqueio total por cliente de e-mail ou colocar controle técnico sob responsabilidade do usuário.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Nenhum como player próprio.
- **Justificativa:** a técnica é invisível e a interação A criaria falsa detecção; B serve como limite/debrief dentro de abrir mensagem e reporte.
- **Vínculo recomendado:** explicação complementar na recuperação após abertura de mensagem.
- **Condição para avançar:** revisão de privacidade e formulação que não atribua causalidade ou detecção humana indevida.

### Evidências no portal

- O portal não carrega mensagens/remotos nem possui telemetria de rede; `RecoveryMission` já distingue “abri a mensagem” sem afirmar comprometimento automático.
