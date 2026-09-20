# Conjuntos de ensino — phishing e engenharia social

> **Estado:** taxonomia pesquisada e distribuição curricular proposta.
> **Formato pedagógico:** **1 comportamento principal + até 2 conceitos complementares + 1 caso curto de transferência** aprovado como regra transversal; ainda não implementado globalmente.
> **Efeito técnico:** nenhum. Estes documentos não criam rota, pontos, progresso, tentativa, recompensa, pré-requisito ou disponibilidade.

Esta pasta organiza os conceitos defensivos pesquisados em conjuntos canônicos. Cada conceito possui um único conjunto “dono” para evitar definições conflitantes, embora possa aparecer em outras atividades como complemento ou aplicação.

As possibilidades de mecânica e experiência para cada conceito são exploradas separadamente em [`../estudos-de-formatos`](../estudos-de-formatos/README.md). Esses estudos não alteram a taxonomia nem significam aprovação ou viabilidade de implementação.

A aderência dessas possibilidades ao portal atual é avaliada em [`../viabilidade-de-formatos`](../viabilidade-de-formatos/README.md). Essa matriz técnica preserva os mesmos `conceptId`s e também não transforma uma hipótese em atividade aprovada.

A proposta consolidada de propriedade e formato está em [`../mapa-conceitos-atividades`](../mapa-conceitos-atividades/README.md). Ela escolhe um único proprietário documental para cada conceito sem apagar suas aplicações secundárias e sem criar rota, versão ou disponibilidade.

## Como interpretar os papéis

| Papel | Significado |
|---|---|
| **Principal** | A atividade explica, permite praticar e avalia o comportamento ligado ao conceito. |
| **Complementar** | O conceito ajuda a compreender o caso, mas não é o objetivo central nem recebe avaliação isolada. |
| **Aplicação** | A atividade exige o conhecimento em um ambiente misto, sem avisar antecipadamente qual técnica está presente. |
| **Limite técnico** | O conceito explica algo que o funcionário não consegue observar com confiabilidade; a defesa principal pertence à plataforma, ao navegador, ao endpoint ou ao backend. |

Os vínculos registrados aqui começam como **candidatos curriculares**. Um vínculo somente se torna implementado quando a ficha individual, a interface, o contrato, o avaliador, a persistência e os testes da versão correspondente comprovarem a cobertura.

## Portfólio-alvo de 22 atividades

O portfólio pesquisado contém somente Missões, PhishLabs e Simulações:

### Missões — 8

1. **A conversa já estava acontecendo**;
2. **Você iniciou este acesso?**;
3. **Cliquei. E agora?**;
4. **Pedido urgente de um gestor**;
5. **Documento inesperado**;
6. **A central que não podia esperar**;
7. **Ele já sabia meus dados**;
8. **O pedido não tinha link**.

### PhishLabs — 8

1. **Quem enviou de verdade?**;
2. **Domínio sob a lupa**;
3. **Uma letra fora do lugar**;
4. **Para onde esse link realmente vai?**;
5. **O destino atrás do QR**;
6. **Espelho de Página**;
7. **Login verdadeiro, permissão errada**;
8. **De qual dispositivo veio este código?**.

### Simulações — 6

1. **Uma manhã comum**;
2. **Central de mensagens**;
3. **Ataque multicanal**;
4. **O primeiro resultado**;
5. **Pagamento para quem?**;
6. **A porta também é um canal**.

As atividades novas ainda não recebem `activityId`, versão, rota, pontos ou ficha individual apenas por aparecerem neste planejamento. **O aviso que não podia esperar** continua como piloto legado fora das 22. **Entrega por QR Code** é absorvida como caso de **O destino atrás do QR**; **Linha do Incidente** torna-se uma mecânica possível de **Cliquei. E agora?**, e não outra atividade pontuada. Equipes, Radar e Arcade também não entram nesta contagem.

## Os nove conjuntos

| # | Conjunto | Atividades principais do portfólio-alvo |
|---:|---|---|
| 1 | [Decisão sob pressão e incerteza](01-decisao-sob-pressao-e-incerteza.md) | Pedido urgente de um gestor; O pedido não tinha link; Uma manhã comum |
| 2 | [Identidade, remetente e contas](02-identidade-remetente-e-contas.md) | A conversa já estava acontecendo; Ele já sabia meus dados; Quem enviou de verdade? |
| 3 | [Destinos, links, QR, páginas e aplicativos](03-destinos-links-qr-paginas-e-aplicativos.md) | cinco PhishLabs técnicos; O primeiro resultado |
| 4 | [Autenticação, permissões e sessões](04-autenticacao-permissoes-e-sessoes.md) | Você iniciou este acesso?; Login verdadeiro, permissão errada; De qual dispositivo veio este código? |
| 5 | [Arquivos, compartilhamentos e execução](05-arquivos-compartilhamentos-e-execucao.md) | Documento inesperado |
| 6 | [Canais, personificação e IA](06-canais-personificacao-e-ia.md) | A central que não podia esperar; Central de mensagens; Ataque multicanal |
| 7 | [Processos, pagamentos e BEC](07-processos-pagamentos-e-bec.md) | Pagamento para quem?; aplicação complementar em Pedido urgente de um gestor e A conversa já estava acontecendo |
| 8 | [Reporte e recuperação](08-reporte-recuperacao-e-protecao-coletiva.md) | Cliquei. E agora?; aplicação em todas as atividades com consequência |
| 9 | [Engenharia social presencial e ambiental](09-engenharia-social-presencial-e-ambiental.md) | A porta também é um canal |

As 22 atividades aparecem uma vez como proprietárias principais. Vínculos secundários são registrados dentro de cada conjunto.

## Regra de composição por atividade

Uma atividade deve possuir:

- um comportamento principal observável;
- zero, um ou dois conceitos complementares;
- um caso curto que reapresente o mesmo comportamento em outro canal, aparência ou contexto;
- um debrief que separe fato, indício, limite de comprovação e ação segura.

O caso curto não comprova que o funcionário “transferiu” ou reteve definitivamente o conhecimento. Ele produz, no máximo, evidência daquela tentativa. Se introduzir outro comportamento central, deverá ser separado em outra atividade.

## Estados documentais

### Composição 1 + até 2 + 1

- **Não analisada:** nenhuma composição foi criada para a atividade.
- **Candidata:** existe uma proposta ainda não aprovada individualmente.
- **Aprovada:** comportamento, complementares e caso curto foram aceitos.
- **Implementada:** conteúdo, interface e avaliação da versão refletem a composição.
- **Validada:** passou pela revisão editorial, técnica e de acessibilidade aplicável.

### Cobertura de um conceito

- **Ausente:** não aparece na versão.
- **Somente documentada:** consta na especificação, não no player.
- **Presente:** aparece no caso, mas não é necessariamente avaliado.
- **Avaliada:** possui resposta e regra determinística na versão indicada.
- **Validada:** cobertura foi conferida editorial e tecnicamente.

Esses estados não substituem integração, progresso individual ou reformulação mecânica.

## Regras transversais

- Um sinal isolado aciona investigação; não determina sozinho que algo é phishing.
- Casos legítimos e inconclusivos devem existir para evitar o comportamento “reportar tudo”.
- O processo de confirmação deve usar uma rota obtida fora da própria solicitação.
- Aparência, HTTPS, voz, vídeo, dados corretos e conta conhecida são evidências, não autorização.
- Velocidade não concede pontos.
- Reporte rápido utiliza linguagem sem culpa.
- O cliente real nunca calcula de forma autoritativa nota, recompensa, competência ou agregado.
- Conceitos invisíveis ou não observáveis não devem virar pegadinhas avaliadas.
- Exemplos usam dados fictícios, `.example`, números e contas mascarados e nenhum artefato executável.
- Radar pode reforçar qualquer conjunto, continua opcional e concede seus próprios 5 pontos quando aplicável.
- Arcade permanece fora desta taxonomia operacional até decisão própria.
- Backend autoritativo continua obrigatório antes do uso real.

## Fontes oficiais de referência

- [NIST Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851);
- [MITRE ATT&CK — Phishing T1566](https://attack.mitre.org/techniques/T1566/);
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing);
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering);
- [CERT.br — Fascículos de segurança](https://cartilha.cert.br/fasciculos/);
- [NIST — Social engineering](https://csrc.nist.gov/glossary/term/social_engineering).

Pesquisa consolidada em 2026-08-11. Técnicas, pretextos e controles devem possuir revisão editorial periódica antes de publicação.
