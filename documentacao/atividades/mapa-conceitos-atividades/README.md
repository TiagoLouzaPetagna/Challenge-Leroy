# Mapa completo — conceitos e atividades

> **Estado:** mapa curricular aprovado em 2026-08-15; 22 documentos de blueprint elaborados e validados documentalmente, ainda sujeitos a aprovação específica.
>
> **Efeito técnico:** nenhum. Este mapa não cria `activityId`, versão, rota, pontos, recompensa, progresso ou disponibilidade.
>
> **Escopo:** 22 atividades-alvo de Missões, PhishLabs e Simulações; desktop nesta fase.

Esta pasta fixa uma **atividade proprietária documental** para cada um dos 187 conceitos pesquisados. A propriedade indica onde o conceito será mantido, ensinado ou explicado no portfólio; não significa que todos os conceitos aparecerão na mesma tentativa nem que a atividade já esteja implementada. O mapa, sua composição geral e os 21 blueprints com primeira versão foram aprovados em 2026-08-15. A [jornada curricular](JORNADA-CURRICULAR.md) organiza a ordem de aprendizagem; a identidade e a ordem de conversão permanecem separadas no [mapa técnico de implementação](../mapa-tecnico-de-implementacao/README.md).

O mapa parte de três fontes:

- a taxonomia e as alocações candidatas em [`../conjuntos-de-ensino`](../conjuntos-de-ensino/README.md);
- os formatos pedagógicos A/B em [`../estudos-de-formatos`](../estudos-de-formatos/README.md);
- a decisão técnica preliminar em [`../viabilidade-de-formatos`](../viabilidade-de-formatos/README.md).

## O que ficou definido pela aprovação

Para cada `conceptId`:

- uma única atividade proprietária entre as 22 atividades-alvo;
- o papel curricular dentro dela;
- a escolha preliminar entre Formato A, Formato B, combinação ou nenhum player próprio;
- a decisão de viabilidade já registrada;
- a mecânica ou aplicação prevista;
- o momento de cobertura: primeira versão, banco de casos, versão futura ou debrief;
- aplicações secundárias, quando o mesmo ensinamento reaparece em outra experiência.

O mapa é deliberadamente conceitual. O limite de até dois complementares vale por **percurso de caso**, não pela atividade inteira. Os blueprints distribuem os itens marcados como Primeira versão em pacotes explícitos; nenhum caminho individual ativa mais de dois complementares. P1, P2 e P3 são identificadores documentais internos: o funcionário não escolhe esses pacotes na primeira abertura, que deverá receber um caso canônico ou atribuído automaticamente.

Propriedade não significa exclusividade. Um conceito pode reaparecer como aplicação, mas sua definição, atualização e cobertura principal possuem um único local de referência.

## Papéis curriculares

| Papel | Uso no portfólio |
|---|---|
| **Núcleo** | Participa diretamente do comportamento principal e da avaliação da atividade. Vários conceitos podem explicar um único comportamento observável. |
| **Complementar** | É ensinado para interpretar o caso, sem receber nota isolada. A composição ativa de uma versão continua limitada a até dois complementares por percurso de caso. |
| **Variação de caso** | Alimenta um banco versionado; somente um subconjunto aparece por tentativa ou pacote editorial. |
| **Transferência** | Reapresenta um comportamento já praticado em outro canal, aparência ou contexto. Não comprova retenção definitiva. |
| **Debrief ou limite técnico** | Explica fenômeno, limite de observação e responsabilidade dos controles; não pontua detecção humana impossível. |
| **Transversal com proprietário** | É reutilizado amplamente, mas possui uma atividade responsável por ensiná-lo de forma explícita. |

## Momento de cobertura

| Momento | Significado |
|---|---|
| **Primeira versão** | Faz parte do blueprint inicial proposto para a atividade. |
| **Banco de casos** | É uma variação selecionável ou rotativa; não aparece obrigatoriamente em toda tentativa. |
| **Versão futura** | O proprietário está definido, mas depende de contrato, conteúdo ou capacidade posterior. |
| **Debrief** | Aparece como explicação ou limite, sem player e recompensa próprios. |

## Portfólio proprietário permitido

### Missões

1. **A conversa já estava acontecendo**
2. **Você iniciou este acesso?**
3. **Cliquei. E agora?**
4. **Pedido urgente de um gestor**
5. **Documento inesperado**
6. **A central que não podia esperar**
7. **Ele já sabia meus dados**
8. **O pedido não tinha link**

### PhishLabs

1. **Quem enviou de verdade?**
2. **Domínio sob a lupa**
3. **Uma letra fora do lugar**
4. **Para onde esse link realmente vai?**
5. **O destino atrás do QR**
6. **Espelho de Página**
7. **Login verdadeiro, permissão errada**
8. **De qual dispositivo veio este código?**

### Simulações

1. **Uma manhã comum**
2. **Central de mensagens**
3. **Ataque multicanal**
4. **O primeiro resultado**
5. **Pagamento para quem?**
6. **A porta também é um canal**

Nenhum conceito deste mapa terá Equipes, Radar ou Arcade como única fonte. O piloto legado **O aviso que não podia esperar** permanece fora das 22 atividades e não recebe propriedade curricular nova, mas passa a antecedê-las como fundação-alvo da jornada. Seu [blueprint técnico v2](../blueprints/missao--o-aviso-que-nao-podia-esperar.md) está detalhado e aguarda aprovação específica.

## Documentos do mapa

### Visões consolidadas

- [Mapa inverso por atividade](POR-ATIVIDADE.md)
- [Composições propostas das 22 atividades](COMPOSICOES-PROPOSTAS.md)
- [Jornada curricular aprovada](JORNADA-CURRICULAR.md)
- [Modelo de registro por conceito](_MODELO.md)

### Conceitos por conjunto

1. [Decisão sob pressão e incerteza](01-decisao-sob-pressao-e-incerteza.md)
2. [Identidade, remetente e contas](02-identidade-remetente-e-contas.md)
3. [Destinos, links, QR, páginas e aplicativos](03-destinos-links-qr-paginas-e-aplicativos.md)
4. [Autenticação, permissões e sessões](04-autenticacao-permissoes-e-sessoes.md)
5. [Arquivos, compartilhamentos e execução](05-arquivos-compartilhamentos-e-execucao.md)
6. [Canais, personificação e IA](06-canais-personificacao-e-ia.md)
7. [Processos, pagamentos e BEC](07-processos-pagamentos-e-bec.md)
8. [Reporte, recuperação e proteção coletiva](08-reporte-recuperacao-e-protecao-coletiva.md)
9. [Engenharia social presencial e ambiental](09-engenharia-social-presencial-e-ambiental.md)

## Regras de consistência

- Os 187 `conceptId`s devem aparecer uma vez como propriedade principal, sem ausência ou duplicação.
- A atividade proprietária deve pertencer à lista fechada de 22 títulos acima.
- Formato e decisão devem conservar a matriz de viabilidade; qualquer mudança exige justificativa e atualização conjunta.
- A visão por atividade deve ser gerada a partir do mapa por conceito, não mantida como uma taxonomia paralela conflitante.
- Uma atividade não exibirá todas as suas variações numa única tentativa.
- `Primeira versão` não significa um único percurso: os blueprints nomeiam pacotes internos e comprovam o limite de até dois complementares ativos em cada um; o primeiro caso é canônico ou atribuído automaticamente e os demais ficam para repetição ou banco.
- Conteúdo invisível ou técnico não será convertido em pegadinha pontuada.
- Artefatos permanecem fictícios e inertes; velocidade não pontua; Radar continua opcional.
- Backend autoritativo continua obrigatório antes de qualquer piloto real.

Mapa iniciado em 2026-08-13 e aprovado para detalhamento em 2026-08-15.
