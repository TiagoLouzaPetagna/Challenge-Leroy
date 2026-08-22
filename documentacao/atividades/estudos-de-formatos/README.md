# Estudos de formatos por conceito

> **Estado:** pesquisa e ideação pedagógica; nenhuma proposta desta pasta está aprovada para implementação.
> **Escopo:** analisar como cada conceito da taxonomia pode virar atividade, caso, variação, explicação interativa ou limite técnico.
> **Etapa seguinte:** a análise técnica está registrada em [`../viabilidade-de-formatos`](../viabilidade-de-formatos/README.md); ela ainda não autoriza implementação.

Esta pasta parte dos conceitos canônicos de [`conjuntos-de-ensino`](../conjuntos-de-ensino/README.md). Ela não cria novas atividades no catálogo, não atribui `activityId`, versão, rota, pontos, recompensa ou progresso e não altera as 22 atividades dimensionadas.

A cobertura consolidada desta pesquisa contém **187 `conceptId`s**, todos presentes exatamente uma vez e na mesma ordem dos nove conjuntos canônicos. Cada conceito possui dois formatos candidatos, totalizando **374 possibilidades documentadas**. Essa quantidade representa alternativas de desenho, não 374 atividades futuras.

## Objetivo desta etapa

Para cada `conceptId`, registrar:

- o comportamento que poderia ser ensinado;
- se o conceito sustenta uma atividade inteira ou funciona melhor como caso, complemento, transferência ou explicação;
- dificuldades pedagógicas e riscos de ensinar uma regra errada;
- pelo menos dois formatos candidatos quando isso fizer sentido;
- forma de interação, sequência e retorno educativo de cada formato;
- alternativas sem arrastar, áudio, vídeo ou informação técnica invisível;
- perguntas que deverão ser respondidas na futura análise de viabilidade no portal.

Esta pasta avalia **possibilidade pedagógica**, não viabilidade técnica definitiva. Expressões como “alto potencial” significam que existe uma experiência educativa coerente, e não que ela já cabe no código atual.

## Classificações usadas

### Potencial pedagógico preliminar

| Classificação | Significado |
|---|---|
| **Alto** | Possui comportamento observável, evidência compreensível e mecânica própria ou reutilizável. |
| **Médio** | Pode gerar bom caso, mas depende de contexto, curadoria ou combinação com outro conceito. |
| **Baixo como atividade própria** | É útil como explicação, variação ou limite, mas isoladamente produziria exercício artificial ou repetitivo. |
| **Controle técnico predominante** | O funcionário não consegue observar ou resolver o fenômeno com confiabilidade; a atividade deve ensinar limite e resposta, não detecção. |

### Papel recomendado

- **Atividade própria:** pode sustentar objetivo, interação e avaliação independentes.
- **Caso de uma atividade:** funciona melhor como um cenário dentro de uma mecânica maior.
- **Conceito complementar:** explica evidência ou limite sem receber avaliação isolada.
- **Caso de transferência:** reapresenta comportamento já ensinado em outro canal ou contexto.
- **Explicação interativa:** demonstra mecanismo sem transformar o usuário em responsável pela detecção.
- **Controle técnico:** deve ser tratado principalmente pela plataforma, navegador, endpoint ou backend.

## Regras de elaboração

- Uma possibilidade de formato não é promessa de implementação.
- Não criar uma atividade só para justificar cada termo.
- Não usar “encontre a pista” quando a pista não é observável ou confiável.
- Incluir casos legítimos ou inconclusivos quando existirem falsos positivos plausíveis.
- Avaliar comportamento e processo, não certeza sobre intenção criminosa.
- Nenhuma proposta exibe comando funcional, link perigoso, QR ativo, arquivo executável, credencial, segredo ou pagamento real.
- Arrastar sempre terá alternativa por botões e teclado; áudio e vídeo sempre terão transcrição e equivalente textual.
- Velocidade não pontua.
- Reporte e recuperação usam linguagem sem culpa.
- A futura implementação continua dependente de backend autoritativo antes do uso real.

## Estrutura dos estudos

| # | Documento | Conjunto de origem |
|---:|---|---|
| 1 | [Decisão sob pressão e incerteza](01-decisao-sob-pressao-e-incerteza.md) | gatilhos humanos, pretexto e ambiguidade |
| 2 | [Identidade, remetente e contas](02-identidade-remetente-e-contas.md) | identidade alegada, conta e contexto |
| 3 | [Destinos, links, QR, páginas e aplicativos](03-destinos-links-qr-paginas-e-aplicativos.md) | navegação, domínio, página, QR e descoberta |
| 4 | [Autenticação, permissões e sessões](04-autenticacao-permissoes-e-sessoes.md) | MFA, código, OAuth, dispositivo e sessão |
| 5 | [Arquivos, compartilhamentos e execução](05-arquivos-compartilhamentos-e-execucao.md) | anexo, proteção, comando e instalação |
| 6 | [Canais, personificação e IA](06-canais-personificacao-e-ia.md) | SMS, voz, suporte, mídia e cadeia multicanal |
| 7 | [Processos, pagamentos e BEC](07-processos-pagamentos-e-bec.md) | processo, beneficiário, pagamento e fraude financeira |
| 8 | [Reporte e recuperação](08-reporte-recuperacao-e-protecao-coletiva.md) | resposta proporcional e preservação |
| 9 | [Engenharia social presencial e ambiental](09-engenharia-social-presencial-e-ambiental.md) | acesso físico, elicitation, mídia e descarte |

## Base metodológica

As propostas seguem quatro princípios documentados por fontes oficiais:

1. objetivos, conteúdo e avaliação precisam estar alinhados;
2. exercícios práticos devem se aproximar do papel e da rotina do público;
3. dificuldade depende das pistas e do alinhamento do pretexto ao contexto, não apenas do tipo de golpe;
4. nenhuma capacitação permite reconhecer todo phishing, portanto reporte, controles em camadas e cultura sem culpa continuam necessários.

Referências:

- [NIST SP 800-50r1 — Building a Cybersecurity and Privacy Learning Program](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-50r1.pdf);
- [NIST Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851);
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing);
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Pesquisa de formatos iniciada em 2026-08-11.

## Continuidade da pesquisa

A pasta [`../viabilidade-de-formatos`](../viabilidade-de-formatos/README.md) confronta os dois formatos de cada conceito com a arquitetura que existe hoje. Ela registra esforço relativo, encaixe, reuso, trabalho novo, dependências, acessibilidade, risco e uma decisão preliminar. Os estudos desta pasta continuam sendo a fonte pedagógica; a matriz seguinte não altera seus conceitos nem cria atividades.

A etapa posterior de consolidação está em [`../mapa-conceitos-atividades`](../mapa-conceitos-atividades/README.md). Ela utiliza a escolha de formato para propor em qual das 22 atividades cada conceito será mantido, sem transformar a escolha em implementação aprovada.
