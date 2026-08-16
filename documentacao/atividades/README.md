# Documentação individual das atividades

Esta pasta reúne a especificação própria de cada Missão, PhishLab, Simulação, desafio de Equipes e conteúdo do Radar atualmente identificado no portal. O objetivo é permitir que conteúdo, mecânica, avaliação e compatibilidade evoluam sem esconder a diferença entre o que já funciona e o que apenas foi aprovado ou catalogado.

As regras compartilhadas da plataforma continuam em [`DOCUMENTACAO-PLATAFORMA.md`](../../DOCUMENTACAO-PLATAFORMA.md). Quando houver conflito, uma decisão transversal registrada no documento principal prevalece; a especificação individual deve então ser atualizada no mesmo lote da implementação.

O índice [`conjuntos-de-ensino`](conjuntos-de-ensino/README.md) registra a taxonomia defensiva pesquisada, a composição pedagógica **1 + até 2 + 1** e a proposta de distribuição dos conceitos pelo portfólio-alvo de Missões, PhishLabs e Simulações. Esses documentos são referências curriculares: não possuem rota, pontos, progresso ou integração no catálogo executável.

A pasta [`estudos-de-formatos`](estudos-de-formatos/README.md) analisa, conceito por conceito, diferentes maneiras de transformar essa taxonomia em experiências educativas. Ela registra possibilidades pedagógicas e limites, mas não aprova implementação, não conclui viabilidade técnica e não altera o portfólio ou o estado de qualquer atividade.

O estudo cobre 187 conceitos canônicos com dois formatos candidatos por conceito, totalizando 374 alternativas de desenho. Os formatos são opções de pesquisa e não devem ser contados como novas atividades do catálogo.

A pasta [`viabilidade-de-formatos`](viabilidade-de-formatos/README.md) executa a etapa técnica seguinte: confronta as 374 alternativas com a arquitetura atual, classifica esforço, reuso, dependências, acessibilidade e risco e recomenda manter, adaptar, combinar, adiar ou descartar cada hipótese como atividade própria. A análise continua preliminar e não autoriza código, rota, contrato, pontuação ou disponibilidade.

A pasta [`mapa-conceitos-atividades`](mapa-conceitos-atividades/README.md) consolida a pesquisa: atribui cada um dos 187 conceitos a uma única atividade proprietária entre as 22 práticas-alvo, escolhe o formato preliminar e separa núcleo, complementos, variações, transferências, versões futuras e debriefs. A [`jornada curricular aprovada`](mapa-conceitos-atividades/JORNADA-CURRICULAR.md) organiza essas práticas por pré-requisito de aprendizagem e adiciona uma fundação anterior ao portfólio, sem alterar fichas individuais nem o portal executável.

A pasta [`blueprints`](blueprints/README.md) detalha, uma atividade por arquivo, os percursos, casos, interação, avaliação, estados, acessibilidade, segurança e dependências técnicas decorrentes do mapa aprovado. Os 21 blueprints com primeira versão foram aprovados em 2026-08-15. **A porta também é um canal** foi aprovada apenas como arquitetura futura, sem composição executável.

A pasta [`mapa-tecnico-de-implementacao`](mapa-tecnico-de-implementacao/README.md) converte essa aprovação em uma proposta de fundação, componentes, identidades técnicas e ondas de implementação. Ela não altera o portal: IDs e rotas das 13 atividades novas, versões sucessoras, migração e ordem ainda dependem de aprovação específica do mapa técnico.

## Como interpretar os estados

Quatro dimensões diferentes aparecem no inventário e não devem ser combinadas:

| Dimensão | Significado |
|---|---|
| **Integração** | Informa se a atividade possui experiência, avaliador, persistência e rota utilizável. `Disponível` significa integrada; `Planejada` significa somente catálogo, card ou conceito. |
| **Progresso individual** | É um estado por funcionário, derivado durante o uso: **Não iniciada**, **Em andamento** ou **Concluída**. Esta documentação não atribui um desses estados a uma pessoa. Conteúdo planejado não cria progresso. |
| **Reformulação** | Informa o estado da nova mecânica discutida: sem decisão, aprovada mas não implementada, implementada ou validada. Aprovação de formato não torna a atividade disponível nem altera tentativas anteriores. |
| **Composição pedagógica** | Informa se comportamento principal, conceitos complementares e caso curto de transferência foram analisados, aprovados, implementados ou validados para uma versão. Ela não altera automaticamente a reformulação mecânica nem o estado de integração. |

No Radar disponível, a leitura ainda não possui um estado persistido de **Em andamento**: antes da resposta correta o conteúdo permanece **Não iniciado** no estado local; depois dela passa a **Concluído**. Isso é diferente do estado temporário da tela enquanto a pessoa está lendo.

## Inventário — 22 fichas individuais

### Estado implementado do percurso Confiança sob pressão

A ordem abaixo descreve a integração atual e não a nova sequência ideal de aprendizagem. A jornada curricular aprovada começa por uma fundação e pelos laboratórios iniciais antes de introduzir **A conversa já estava acontecendo**.

| # | Área | Documento | Integração atual | Progresso individual possível | Reformulação |
|---:|---|---|---|---|---|
| 1 | Missão | [A conversa já estava acontecendo](missao--a-conversa-ja-estava-acontecendo.md) | Disponível, versão 2; v1 histórica | Não iniciada / Em andamento / Concluída | Reconstrução implementada; revisão aprovada para atribuição automática do caso e textos mais contextuais, sem alterar o painel de evidências |
| 2 | PhishLab | [Quem enviou de verdade?](phishlab--quem-enviou-de-verdade.md) | Disponível, versão 2; v1 histórica | Não iniciada / Em andamento / Concluída | Mapa de identidade implementado com classificação Comprovado / Não comprovado e revisão final das respostas |
| 3 | PhishLab | [Domínio sob a lupa](phishlab--dominio-sob-a-lupa.md) | Disponível, versão 2; v1 histórica | Não iniciada / Em andamento / Concluída | Cirurgia de URL implementada com cinco trechos, três pacotes alternativos e transferência |
| 4 | Missão | [Você iniciou este acesso?](missao--voce-iniciou-este-acesso.md) | Disponível, versão 2; v1 histórica | Não iniciada / Em andamento / Concluída | Console de segurança sequencial, falso suporte reativo, área oficial e revisão final implementados |
| 5 | Missão | [Cliquei. E agora?](missao--cliquei-e-agora.md) | Disponível, versão 2; v1 histórica | Não iniciada / Em andamento / Concluída | Linha temporal, montador de ações, reporte seguro, transferência e revisão final implementados |
| 6 | Simulação | [Uma manhã comum](simulacao--uma-manha-comum.md) | Disponível, versão 1 | Não iniciada / Em andamento / Concluída | Triagem em lote com fila inconclusiva aprovada; ainda não implementada |
| 8 | Equipes | [Mudança bancária sem atalho](equipes--mudanca-bancaria-sem-atalho.md) | Disponível, versão 2; versão 1 preservada | Não iniciada / Em andamento / Concluída | Estação de processo implementada; validação automatizada concluída |

### Fundação, atividades legadas e planejadas fora do percurso implementado

| # | Área | Documento | Integração atual | Progresso individual possível | Reformulação |
|---:|---|---|---|---|---|
| 8 | Missão | [O aviso que não podia esperar](missao--o-aviso-que-nao-podia-esperar.md) | Disponível; protótipo legado | Não iniciada / Em andamento / Concluída | Papel de fundação aprovado; [blueprint v2](blueprints/missao--o-aviso-que-nao-podia-esperar.md) detalhado e aguardando aprovação específica |
| 9 | Missão | [Entrega por QR Code](missao--entrega-por-qr-code.md) | Planejada; sem player próprio | Não aplicável enquanto planejada | Sem reformulação aprovada |
| 10 | Missão | [Pedido urgente de um gestor](missao--pedido-urgente-de-um-gestor.md) | Planejada; sem player próprio | Não aplicável enquanto planejada | Sem reformulação aprovada |
| 11 | Missão | [Documento inesperado](missao--documento-inesperado.md) | Planejada; sem player próprio | Não aplicável enquanto planejada | Sem reformulação aprovada |
| 12 | PhishLab | [Espelho de página](phishlab--espelho-de-pagina.md) | Planejado; somente card local | Não aplicável enquanto planejado | Sem reformulação aprovada |
| 13 | PhishLab | [Linha do incidente](phishlab--linha-do-incidente.md) | Planejado; somente card local | Não aplicável enquanto planejado | Sem reformulação aprovada |
| 14 | Simulação | [Central de mensagens](simulacao--central-de-mensagens.md) | Planejada; somente card local | Não aplicável enquanto planejada | Sem reformulação aprovada |
| 15 | Simulação | [Ataque multicanal](simulacao--ataque-multicanal.md) | Planejada; somente card local | Não aplicável enquanto planejada | Sem reformulação aprovada |
| 16 | Equipes | [Caixa de Entrada Segura](equipes--caixa-de-entrada-segura.md) | Disponível, versão 1; desafio legado preservado | Não iniciada / Em andamento / Concluída | Sem reformulação aprovada |

### Radar opcional

| # | Documento | Integração atual | Progresso individual possível | Reformulação |
|---:|---|---|---|---|
| 17 | [Quishing: phishing escondido em QR Codes](radar--quishing.md) | Disponível, versão 1 | Não iniciada / Concluída; leitura não persiste Em andamento | Fluxo atual preservado; sem reformulação aprovada |
| 18 | [Anexos inesperados e falsas notas fiscais](radar--anexos-inesperados.md) | Planejado no catálogo, versão 1 | Não aplicável enquanto planejado | Sem reformulação aprovada |
| 19 | [Quando o golpista se passa por um gestor](radar--falso-gestor.md) | Planejado no catálogo, versão 1 | Não aplicável enquanto planejado | Sem reformulação aprovada |
| 20 | [Fadiga de MFA: aprovações que você não iniciou](radar--fadiga-mfa.md) | Planejado no catálogo, versão 1 | Não aplicável enquanto planejado | Sem reformulação aprovada |
| 21 | [Golpes por mensagem e troca de número](radar--golpes-por-mensagem.md) | Planejado no catálogo, versão 1 | Não aplicável enquanto planejado | Sem reformulação aprovada |
| 22 | [Cliquei em um link suspeito. E agora?](radar--depois-do-clique.md) | Planejado no catálogo, versão 1 | Não aplicável enquanto planejado | Sem reformulação aprovada |

Os conteúdos do Radar são opcionais, concedem pontos por regra própria quando efetivamente integrados e nunca funcionam como pré-requisito do percurso. A atividade prática relacionada deve permanecer compreensível sem a leitura.

## Portfólio-alvo pesquisado

Além das 22 fichas individuais que descrevem o inventário atual, foi dimensionado um portfólio curricular futuro com **22 atividades canônicas de prática**: 8 Missões, 8 PhishLabs e 6 Simulações. A coincidência numérica não significa que sejam os mesmos 22 itens: o inventário atual inclui Equipes e Radar, enquanto o portfólio-alvo solicitado os exclui.

O dimensionamento, os títulos de trabalho e os vínculos conceito → atividade foram aprovados para detalhamento em 2026-08-15, sem criar automaticamente novas fichas canônicas, rotas ou integrações. Na mesma data, os 21 blueprints com primeira versão foram aprovados e seguiram para o [`mapa técnico`](mapa-tecnico-de-implementacao/README.md). A arquitetura futura de **A porta também é um canal** continua dependendo da escolha de composição e políticas locais. O piloto legado **O aviso que não podia esperar** permanece preservado fora dessa contagem, mas recebeu um papel-alvo de fundação curricular; enquanto continuar visível, o produto poderá mostrar 23 atividades, embora somente 22 pertençam ao portfólio-alvo.

Os nove conjuntos de ensino e a alocação detalhada dos conceitos estão em [`conjuntos-de-ensino/README.md`](conjuntos-de-ensino/README.md). Cada conceito possui um conjunto canônico, mas pode reaparecer em outra atividade como complemento ou aplicação. Radar continua opcional e Equipes mantém seu papel coletivo; nenhum deles é a única fonte de um ensinamento indispensável.

## Arcade fora deste inventário

O Arcade está excluído explicitamente desta pasta por decisão vigente. Ele continua somente como catálogo, sem incorporação de jogos externos e sem definição de novas partidas, mecânicas ou atividades neste lote. Uma futura documentação individual do Arcade dependerá de decisão própria e não deve ser inferida a partir dos 22 documentos acima.

## Regra de manutenção

- Copiar [`_MODELO.md`](_MODELO.md) ao criar uma nova especificação.
- Atualizar o documento individual no mesmo lote de qualquer alteração de conteúdo, mecânica, avaliação, contrato, persistência ou integração.
- Incrementar a versão da atividade quando uma mudança semântica puder alterar a interpretação de uma resposta.
- Avaliar uma nova versão do esquema local somente quando a forma persistida mudar.
- Preservar tentativas antigas e nunca recalculá-las silenciosamente com um avaliador novo.
- Não marcar uma atividade como disponível antes de rota, resposta, avaliador, persistência e testes estarem conectados.
- Manter explícita a exigência de backend autoritativo antes do uso real.
