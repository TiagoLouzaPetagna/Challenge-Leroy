# Jornada curricular aprovada

> **Estado:** direção curricular aprovada; primeira etapa convertida e validada em 2026-08-15.
>
> **Efeito técnico atual:** a fundação `mission:account-lock` v2 e a ordem executável inicial já estão no portal; as demais conversões continuam dependentes de aprovação individual.
>
> **Escopo:** ordem de aprendizagem e regras de apresentação para Missões, PhishLabs e Simulações no desktop. Radar continua opcional e pontuado por regra própria; Arcade permanece fora.

Este documento organiza o portfólio pelo que a pessoa precisa aprender antes de enfrentar situações mais ambíguas. Ele complementa o [mapa de propriedade dos 187 conceitos](README.md), as [composições aprovadas](COMPOSICOES-PROPOSTAS.md) e os [blueprints](../blueprints/README.md). A ordem técnica de implementação continua sendo tratada separadamente no [mapa técnico](../mapa-tecnico-de-implementacao/README.md).

## 1. Problema que a jornada corrige

A inspeção da primeira atividade mostrou quatro riscos para quem ainda está aprendendo:

- textos e respostas podem pressupor contexto que ainda não foi apresentado;
- a abertura permite escolher entre três percursos internos, embora essa escolha não tenha valor pedagógico para o primeiro contato;
- **A conversa já estava acontecendo** começa por conta comprometida, continuidade de thread e mudança de comportamento, conceitos mais avançados do que o modelo básico de phishing;
- a sequência técnica das implementações foi apresentada como se fosse a sequência ideal de aprendizagem.

A jornada passa a distinguir **ordem curricular**, **ordem técnica** e **estado disponível**. Uma atividade planejada nunca bloqueará conteúdo já disponível apenas para preservar uma ordem futura.

## 2. Fundação anterior ao portfólio-alvo

O piloto legado **O aviso que não podia esperar** passa a ter um formato-alvo aprovado como Missão de fundamento. Ele permanece fora das 22 atividades proprietárias e não recebe propriedade nova sobre os 187 `conceptId`s; portanto, a contagem do portfólio-alvo continua em 22. Enquanto a fundação também estiver visível, o produto poderá apresentar 23 práticas.

A versão sucessora da fundação deverá ensinar três âncoras que hoje aparecem dispersas:

1. **Modelo mental básico de phishing:** alguém usa identidade, contexto e pressão para induzir uma ação que beneficia o atacante. Phishing não é sinônimo de e-mail mal escrito, link visivelmente estranho ou golpe já comprovado.
2. **Ação pedida e consequência:** antes de procurar pistas, a pessoa identifica o que está sendo solicitado — abrir, entrar, informar, aprovar, instalar, pagar, mudar um processo ou liberar acesso — e qual ativo ou consequência está envolvido.
3. **Fonte de confirmação confiável:** a confirmação deve vir de uma referência obtida fora da solicitação, como favorito, aplicativo, diretório ou processo oficial conhecido. Outro endereço, número, link ou QR fornecido pelo mesmo solicitante não cria independência.

Essas âncoras usam uma apresentação simples do modelo **PARE**:

- **P — Pare:** interrompa a ação automática, sem transformar a pausa em paralisia;
- **A — Avalie:** identifique a ação pedida, o ativo e a consequência;
- **R — Reconfirme:** use uma fonte independente da própria solicitação;
- **E — Escale e responda:** siga o processo apropriado e reporte quando aplicável.

PARE continua pertencendo documentalmente a **Pedido urgente de um gestor** dentro do mapa dos 187 conceitos. A fundação apenas apresenta essa linguagem antes e não cria outro conceito, atividade proprietária, tentativa ou recompensa.

## 3. Sequência pedagógica recomendada

| Etapa | Pergunta de aprendizagem | Atividades e conteúdos principais | Saída esperada |
|---:|---|---|---|
| 1. Fundação | O que está tentando me fazer agir e como confirmo com segurança? | **O aviso que não podia esperar**, versão 2 implementada | Aplicar PARE, reconhecer a ação pedida e escolher uma fonte independente |
| 2. Leitura de elementos | Quem enviou e para onde a ação leva? | **Quem enviou de verdade?**, **Domínio sob a lupa**, **Uma letra fora do lugar** e **Para onde esse link realmente vai?** | Ler identidade e destino sem transformar uma pista isolada em veredito |
| 3. Confiança avançada | E se a mensagem vier de uma conta ou contexto plausível? | **A conversa já estava acontecendo**, **Ele já sabia meus dados** e **Pedido urgente de um gestor** | Reconhecer ruptura de processo, personalização e autoridade sem adivinhar intenção |
| 4. Acesso e execução | Como agir diante de autenticação, permissão, suporte e arquivo? | **Você iniciou este acesso?**, **De qual dispositivo veio este código?**, **Login verdadeiro, permissão errada**, **Espelho de Página**, **Documento inesperado** e **A central que não podia esperar** | Negar o que não foi iniciado, limitar consentimento e usar a rota oficial |
| 5. Resposta | O que fazer depois de uma interação ou exposição? | **Cliquei. E agora?** e variações de recuperação e reporte | Responder proporcionalmente, preservar fatos e reportar cedo, sem culpa |
| 6. Aplicação | Consigo aplicar o processo em rotina, múltiplos canais e decisões de impacto? | **Uma manhã comum**, **Central de mensagens**, **Ataque multicanal**, **O primeiro resultado**, **Pagamento para quem?**, **O pedido não tinha link** e, depois, **A porta também é um canal** | Triar legítimo, suspeito e inconclusivo; manter processo seguro sob ambiguidade |

Essa é uma ordem de aprendizagem por camadas, não uma afirmação de que todas as atividades já estão disponíveis. **A porta também é um canal** continua como arquitetura futura. A ordem exata dentro das etapas posteriores poderá ser refinada quando os casos forem convertidos, mas uma atividade avançada não deverá voltar a ocupar a abertura da jornada.

### 3.1 Transição possível com o conteúdo disponível

A versão sucessora da fundação já foi implementada. Enquanto os novos PhishLabs ainda não estiverem disponíveis, o portal não deve fingir que eles existem nem bloquear atividades existentes. A primeira sequência executável publicada é:

1. fundação reformulada de **O aviso que não podia esperar**;
2. **Quem enviou de verdade?**;
3. **Domínio sob a lupa**;
4. **A conversa já estava acontecendo**.

Os demais laboratórios da etapa 2 serão incorporados à camada introdutória quando possuírem player, avaliador, persistência e testes próprios.

A Visão geral deriva a próxima atividade desta ordem executável. Uma revisão adaptativa continua opcional e pode apontar para uma prática específica; ao concluir o PhishLab recomendado, a revisão é encerrada e o portal volta ao primeiro item curricular disponível, sem encadear automaticamente uma Simulação fora da sequência.

## 4. Percursos são pacotes internos, não uma escolha inicial

Os marcadores P1, P2 e P3 existem para documentação, conteúdo, avaliação e testes. Eles não são categorias que o funcionário precise compreender nem opções que devam aparecer na abertura.

Para cada atividade com mais de um pacote:

- a primeira conclusão recebe um caso canônico ou atribuído automaticamente pela versão publicada;
- o briefing apresenta somente o contexto daquele caso;
- outros pacotes alimentam repetição, banco de casos ou a ação **Praticar com outro caso**;
- a repetição não cria recompensa duplicada;
- retomada preserva o mesmo pacote e a mesma versão;
- o backend autoritativo deverá controlar publicação e atribuição no uso real.

A pessoa poderá escolher repetir uma atividade, mas não precisará escolher um “percurso de aprendizagem” antes de saber o que vai praticar.

## 5. Regra de contexto e clareza para todas as atividades

Antes de qualquer decisão avaliada, o player deverá explicar em linguagem direta:

1. **quem a pessoa representa** naquele cenário;
2. **o que aconteceu** e por que aquilo chegou até ela;
3. **qual é a tarefa atual**, em uma frase de ação;
4. **o que cada grupo de respostas decide**;
5. **qual consequência está sendo protegida**, sem revelar a resposta correta.

Regras de redação e interação:

- uma ação principal por etapa;
- títulos de resposta descrevem uma decisão concreta, e não um rótulo técnico isolado;
- termos como conta comprometida, thread hijacking, `Reply-To`, domínio registrado e OAuth são explicados depois do contexto ou no debrief;
- alternativas permanecem compreensíveis fora da pergunta e deixam claro o que aconteceria ao escolhê-las;
- instruções curtas ficam junto do controle que elas orientam;
- validação explica o que falta e preserva o que já foi preenchido;
- a primeira prática é guiada; a aplicação independente vem depois;
- casos legítimos, suspeitos e inconclusivos continuam presentes para evitar a regra falsa de que “tudo é phishing”.

## 6. Decisão específica para A conversa já estava acontecendo

Na próxima revisão do player:

- a atividade deixa de abrir com a escolha visível entre três pacotes;
- o primeiro caso é atribuído automaticamente e os demais ficam para repetição;
- o briefing e os textos de resposta recebem contexto mais direto;
- a atividade passa para depois da fundação e dos PhishLabs iniciais;
- o **painel de evidências permanece como está na versão 2**.

O painel continua registrando quais itens o funcionário selecionou como suporte para sua conclusão. Nenhuma mudança de nome, classificação, composição visual ou regra de avaliação do painel foi aprovada nesta revisão.

## 7. Compatibilidade e limites

- A decisão curricular não reinterpreta tentativas existentes nem concede novos pontos.
- A versão 2 atual de **A conversa já estava acontecendo** continua sendo o estado implementado até que a revisão seja convertida e validada.
- A versão 1 de `mission:account-lock` continua histórica; a versão 2 publicada possui conteúdo, contrato, avaliador e compatibilidade próprios.
- Nenhum novo `activityId`, rota, pré-requisito obrigatório ou número de versão é criado por este documento.
- Radar continua opcional, concede pontos por regra própria quando integrado e nunca é pré-requisito.
- Arcade continua apenas como catálogo e fora desta jornada.
- Celular permanece posterior.
- Backend autoritativo continua obrigatório antes de uso real.

## 8. Próxima conversão

O [blueprint técnico da fundação](../blueprints/missao--o-aviso-que-nao-podia-esperar.md) foi aprovado e convertido em versão 2 com pacote único atribuído automaticamente, estação PARE guiada, aplicação legítima curta, avaliação e compatibilidade.

O próximo lote curricular poderá aplicar a mesma regra de clareza e atribuição automática a **Quem enviou de verdade?**. Em paralelo documental, os blueprints das 22 atividades deverão substituir a ideia de escolha inicial de P1/P2/P3 pela regra de atribuição automática e revisar contexto, instruções e respostas. Isso não autoriza uma reescrita mecânica indiscriminada: cada atividade deve preservar sua interação própria e ser revisada individualmente.

Registrado em 2026-08-15 após inspeção da primeira atividade.
