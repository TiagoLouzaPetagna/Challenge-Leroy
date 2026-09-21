# Blueprints das atividades do portfólio-alvo

> **Estado:** documentação elaborada, validada e aprovada em 2026-08-15 para 21 blueprints do portfólio; **A porta também é um canal** foi aprovada apenas como arquitetura futura. A fundação, os dois PhishLabs iniciais, **A conversa já estava acontecendo**, **Você iniciou este acesso?** e **Cliquei. E agora?** já foram convertidos conforme suas fichas próprias.
>
> **Efeito técnico:** a aprovação documental isolada não altera o portal. Quando um blueprint é convertido, a ficha individual e o documento-mãe registram separadamente versão, contrato, persistência, recompensa e validação.
>
> **Escopo:** 8 Missões, 8 PhishLabs e 6 Simulações; desktop nesta etapa.

> **Pilotos simples em 2026-09-20:** **Pedido urgente de um gestor** e **Uma letra fora do lugar** estão disponíveis no portal com um caso curto e duas decisões cada. Seus blueprints completos permanecem como referência para possíveis casos adicionais; o estado atual está anotado nas fichas individuais.

Esta pasta transforma o [mapa completo de conceitos e atividades](../mapa-conceitos-atividades/README.md) em desenhos implementáveis e revisáveis, um por atividade. O mapa aprovado fixa propriedade, papel e momento dos 187 conceitos. Cada blueprint aprovado define como uma primeira versão poderá ensinar e avaliar uma parte coerente desse conteúdo sem exibir todo o inventário em uma única tentativa. A [jornada curricular aprovada](../mapa-conceitos-atividades/JORNADA-CURRICULAR.md) define a progressão de aprendizagem e introduz uma fundação anterior ao portfólio. A exceção é **A porta também é um canal**: seu arquivo registra uma arquitetura futura e quatro módulos possíveis, não uma primeira composição já escolhida.

## Aprovação registrada e limite técnico

A aprovação de 2026-08-15 confirmou:

- as 22 atividades do portfólio-alvo;
- seus comportamentos principais;
- a propriedade documental única dos 187 conceitos;
- os papéis e momentos de cobertura;
- a regra de composição por percurso;
- os percursos, casos, pesos, controles, estados, acessibilidade e fronteiras documentados nos 21 blueprints de primeira versão.

Ela não criou código nem aprovou automaticamente identificadores novos, rotas novas, número de versão executável, migração, ordem de implementação, ativação de recompensa ou publicação. Esses pontos seguem no [mapa técnico de implementação](../mapa-tecnico-de-implementacao/README.md). A arquitetura futura de **A porta também é um canal** continua dependendo da escolha de composição e de políticas locais.

## Hierarquia documental

1. [`DOCUMENTACAO-PLATAFORMA.md`](../../../DOCUMENTACAO-PLATAFORMA.md) contém regras transversais e prevalece em caso de conflito.
2. [`conjuntos-de-ensino`](../conjuntos-de-ensino/README.md) mantém a definição canônica dos conceitos.
3. [`mapa-conceitos-atividades`](../mapa-conceitos-atividades/README.md) mantém a propriedade, o papel, o formato, a decisão e o momento aprovados.
4. Esta pasta descreve os percursos, casos, interação, avaliação e dependências aprovados.
5. O [mapa técnico](../mapa-tecnico-de-implementacao/README.md) propõe identidade, componentes e ordem sem alterar o código.
6. As fichas individuais na pasta pai continuam registrando o estado implementado e não são alteradas automaticamente por um blueprint aprovado mas ainda não implementado.

## Regra de composição

Cada percurso da primeira versão deverá conter:

- um único comportamento principal observável;
- de zero a dois conceitos com papel formal **Complementar**;
- elementos de núcleo ou transversais que expliquem o mesmo comportamento sem criar objetivos paralelos;
- um caso curto de transferência quando ele couber sem introduzir um segundo objetivo;
- debrief que separe fato, indício, hipótese, limite técnico e resposta segura.

Uma atividade pode possuir vários percursos. Eles não são executados simultaneamente e não geram recompensas separadas. P1, P2 e P3 são nomes internos de documentação, conteúdo e teste: na primeira abertura, o player recebe um caso canônico ou atribuído automaticamente; outros pacotes ficam disponíveis em repetição ou **Praticar com outro caso**. Conceitos de banco, versão futura e debrief continuam rastreados mesmo quando não aparecem na primeira versão.

## Fundação fora das 22 propriedades

O protótipo legado [**O aviso que não podia esperar**](../missao--o-aviso-que-nao-podia-esperar.md) continua fora da lista proprietária abaixo e foi convertido em Missão de fundamento. Seu [blueprint técnico v2](missao--o-aviso-que-nao-podia-esperar.md) está implementado e validado com um único pacote inicial atribuído automaticamente, estação PARE guiada, aplicação legítima curta, contrato próprio e compatibilidade integral com a versão 1.

## Regras comuns dos blueprints

- avaliar processo seguro, não certeza absoluta sobre fraude;
- apresentar papel, situação, tarefa e consequência antes da primeira resposta avaliada;
- manter uma única ação principal por etapa e alternativas compreensíveis dentro do contexto;
- usar termos técnicos depois da explicação em linguagem direta ou no debrief;
- atribuir o primeiro pacote automaticamente, sem pedir que o funcionário escolha P1/P2/P3;
- incluir casos legítimos e inconclusivos quando a mecânica permitir;
- não usar gramática ruim, logotipo, HTTPS, urgência ou aparência como veredito isolado;
- nunca pontuar detecção humana de fenômeno invisível;
- preservar linguagem de reporte sem culpa;
- usar somente dados fictícios, domínios `.example`, contas e contatos mascarados;
- manter links, QR, arquivos, comandos, pagamentos, contatos e reportes inertes;
- não conceder pontos por velocidade;
- manter Radar opcional e Arcade fora;
- documentar alternativa completa a arrastar, mídia e representação visual;
- manter celular como etapa posterior;
- exigir backend autoritativo antes de qualquer uso real.

## Índice documental

### Fundação adicional, fora das 22 propriedades

- [O aviso que não podia esperar — fundação](missao--o-aviso-que-nao-podia-esperar.md) — versão 2 implementada e validada na demonstração local.

### Missões

1. [A conversa já estava acontecendo](missao--a-conversa-ja-estava-acontecendo.md)
2. [Você iniciou este acesso?](missao--voce-iniciou-este-acesso.md) — versão 2 implementada na demonstração local.
3. [Cliquei. E agora?](missao--cliquei-e-agora.md) — versão 2 implementada; validação completa em andamento.
4. [Pedido urgente de um gestor](missao--pedido-urgente-de-um-gestor.md)
5. [Documento inesperado](missao--documento-inesperado.md)
6. [A central que não podia esperar](missao--a-central-que-nao-podia-esperar.md)
7. [Ele já sabia meus dados](missao--ele-ja-sabia-meus-dados.md)
8. [O pedido não tinha link](missao--o-pedido-nao-tinha-link.md)

### PhishLabs

1. [Quem enviou de verdade?](phishlab--quem-enviou-de-verdade.md) — versão 2 implementada e validada na demonstração local.
2. [Domínio sob a lupa](phishlab--dominio-sob-a-lupa.md) — versão 2 implementada e validada na demonstração local.
3. [Uma letra fora do lugar](phishlab--uma-letra-fora-do-lugar.md)
4. [Para onde esse link realmente vai?](phishlab--para-onde-esse-link-realmente-vai.md)
5. [O destino atrás do QR](phishlab--o-destino-atras-do-qr.md)
6. [Espelho de Página](phishlab--espelho-de-pagina.md)
7. [Login verdadeiro, permissão errada](phishlab--login-verdadeiro-permissao-errada.md)
8. [De qual dispositivo veio este código?](phishlab--de-qual-dispositivo-veio-este-codigo.md)

### Simulações

1. [Uma manhã comum](simulacao--uma-manha-comum.md)
2. [Central de mensagens](simulacao--central-de-mensagens.md)
3. [Ataque multicanal](simulacao--ataque-multicanal.md)
4. [O primeiro resultado](simulacao--o-primeiro-resultado.md)
5. [Pagamento para quem?](simulacao--pagamento-para-quem.md)
6. [A porta também é um canal](simulacao--a-porta-tambem-e-um-canal.md)

## Validação e aprovação desta etapa

Em 2026-08-15, a validação cruzada confirmou:

- os 22 arquivos seguem [`_MODELO.md`](_MODELO.md) e preservam os 187 conceitos uma única vez em seus proprietários;
- os 21 blueprints aprovados distribuem os itens de primeira versão em percursos explícitos; **A porta também é um canal** mantém seus nove conceitos em versão futura;
- nenhum percurso ativa mais de dois complementares formais;
- os pesos propostos de cada atividade somam 100, sem pontuação por velocidade;
- controles críticos, estados, acessibilidade, privacidade, backend, banco de casos, versões futuras e limites técnicos estão rastreados;
- propostas não convertidas continuam explicitamente separadas do estado funcional; a fundação e **Quem enviou de verdade? v2** registram sua conversão nas fichas próprias.

O blueprint adicional da fundação foi validado estruturalmente contra o mesmo modelo, não integra as contagens dos 187 conceitos ou das 22 atividades proprietárias e já foi convertido conforme sua ficha própria.

Essa validação comprovou consistência documental. A aprovação posterior confirmou o desenho dos 21 blueprints, mas não comprova funcionamento no site nem substitui os gates técnicos, editoriais especializados e autoritativos anteriores à publicação.
