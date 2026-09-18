# PhishLab — Domínio sob a lupa

> Estado documental: a versão 2 está implementada e validada. A versão 1 permanece histórica, legível e nunca é reinterpretada.

## 1. Identidade

| Campo | Valor vigente |
|---|---|
| Área | PhishLab |
| Percurso | Confiança sob pressão |
| Ordem recomendada | 3 de 7 |
| `activityId` | `phishlab:link-analyzer` |
| Versão publicada | `2`; versão `1` aceita como histórico |
| Rota preservada por compatibilidade | `/phishlab/analisador-de-links` |
| Título visível | Domínio sob a lupa |
| Duração estimada | 8 a 10 minutos |
| Pontos-base | 60 |
| Competências | Observar, Investigar e Decidir |
| Pré-requisitos | Nenhum |
| Recomendação anterior | Quem enviou de verdade? |
| Radar relacionado | Quishing: phishing escondido em QR Codes — opcional |

O identificador e a rota usam o nome técnico antigo **Analisador de Links** para preservar progresso. Esse detalhe não altera o título apresentado ao funcionário.

## 2. Objetivo de aprendizagem

Ensinar a localizar o domínio registrado e a separar as partes de uma URL sem confundir palavras familiares, cadeado HTTPS ou um caminho convincente com identidade do destino.

Depois da análise, o comportamento esperado é abrir o serviço por favorito, aplicativo, intranet ou endereço conhecido, em vez de continuar pelo endereço recebido.

## 3. Estado histórico preservado — versão 1

### 3.1 Conteúdo histórico

A versão 1 contém dois endereços sintéticos e não navegáveis:

- caso guiado suspeito: `https://leroymerlin.seguranca-contas.example/confirmar`;
- caso independente legítimo no contexto: `https://treinamento.colaboradores.leroymerlin.example/curso-phishing`.

No primeiro, botões revelam quatro componentes:

- protocolo;
- subdomínio;
- domínio registrado;
- caminho.

O caso também oferece uma pista opcional. No segundo, o funcionário seleciona evidências sobre domínio e contexto e escolhe entre legítimo, suspeito ou inconclusivo.

### 3.2 Fluxo histórico

1. **Briefing:** explica o caso guiado e o independente.
2. **Caso guiado:** o funcionário abre quatro explicações e escolhe um veredito.
3. **Caso independente:** aplica a técnica sem pistas, seleciona evidências e escolhe um veredito.
4. **Resultado:** recebe a decomposição da nota, debrief, recompensa e recomendação.

A URL era exibida como uma linha de texto. Os componentes eram explicados em cartões, sem seleção de limites ou classificação direta de segmentos. Tentativas dessa forma continuam carregáveis depois da migração 6→7.

### 3.3 Avaliação e recompensa históricas

A nota atual vai de 0 a 100:

- até 20 pontos pelo uso das quatro ferramentas;
- 25 pontos pelo veredito do caso guiado;
- até 30 pontos pelas evidências do caso independente;
- 25 pontos pelo veredito do caso independente.

A revisão é recomendada quando a nota é inferior a 60 ou quando o caso independente é classificado incorretamente. HTTPS e familiaridade visual são alternativas inadequadas de evidência.

A primeira conclusão concede 60 pontos-base mais bônus geral de desempenho. Repetições não duplicam recompensa, contribuição ou conquista.

### 3.4 Contrato histórico

A versão 1 usa `PhishLabSubmission`, `PhishLabAttempt` e `PhishLabResult` e registra:

- ferramentas utilizadas;
- uso de pista;
- vereditos guiado e independente;
- evidências selecionadas no caso independente;
- metadados e resultado da tentativa.

O catálogo e o validador atuais aceitam protocolo, subdomínio, domínio registrado e caminho. **Parâmetros não fazem parte da resposta implementada**, embora apareçam na definição conceitual do percurso.

## 4. Formato atual — versão 2 implementada

### 4.1 Mecânica principal

O formato atual é uma **cirurgia de URL**. O funcionário trabalha diretamente sobre um endereço sintético, atribuindo função a cinco trechos por seletores operáveis por teclado:

- protocolo;
- subdomínio;
- domínio registrado;
- caminho;
- parâmetro.

Em vez de abrir uma explicação pronta, a pessoa classifica cada trecho, marca qual é o domínio registrado, decide um veredito e escolhe a rota segura. Uma tabela textual é a representação canônica; cor e posição são apenas apoio visual. A interface explica que HTTPS protege o transporte, não a identidade ou a intenção do site.

### 4.2 Fluxo implementado

1. **Abertura:** o sistema atribui um caso e explica o papel do funcionário, o que aconteceu, a tarefa e o que aquela análise protege. A pessoa não escolhe entre rótulos internos como P1, P2 e P3.
2. **Investigação:** consulta uma calibração curta e classifica independentemente os cinco trechos do caso principal.
3. **Decisão inicial:** marca domínio registrado, veredito e rota.
4. **Consequência:** vê somente o efeito cenográfico da rota, sem gabarito antecipado.
5. **Revisão:** edita anatomia ou decisão.
6. **Decisão final:** confirma o caso principal.
7. **Transferência:** identifica origem e veredito em uma mudança curta.
8. **Resultado:** recebe nota, critérios privados e a comparação textual entre cada resposta dada e a resposta esperada.
9. **Debrief:** compara fato, limite e ação segura.

A atividade deve preservar a progressão guiado → independente, pois ela já diferencia este PhishLab das Missões e Simulações.

### 4.3 Pacotes publicados

Três pacotes `v2` estáticos e allowlisted estão publicados:

- `phishlab:link-analyzer:v2:p1-left-brand` — marca no subdomínio de outra origem;
- `phishlab:link-analyzer:v2:p2-path-brand` — marca no caminho e no parâmetro;
- `phishlab:link-analyzer:v2:p3-long-legitimate` — endereço longo legítimo com transferência suspeita.

Cada tentativa executa apenas um pacote. O banco futuro ainda poderá representar:

- texto de botão diferente do destino;
- pequenas alterações de grafia;
- endereços longos;
- palavras familiares no subdomínio ou caminho;
- parâmetros que exibem outro endereço como texto;
- HTTPS em destino suspeito;
- redirecionadores e encurtadores como situações que exigem outra verificação;
- endereços legítimos difíceis;
- casos inconclusivos;
- escolha de favorito, aplicativo, intranet ou endereço conhecido.

Não é necessário colocar todos os padrões na mesma tentativa. Os exemplos devem permanecer sintéticos, inertes e legíveis.

Na interface publicada, a primeira abertura recebe o pacote canônico inicial. Depois da conclusão, **Praticar com outro caso** avança para o pacote seguinte. Essa rotação permite variedade sem transformar identificadores editoriais em uma escolha sem contexto para o funcionário. **Refazer laboratório** mantém o caso atual para uma nova tentativa.

## 5. Atual × alvo

| Aspecto | Versão 1 histórica | Versão 2 publicada |
|---|---|---|
| URL | Linha de texto estática | Cinco trechos inertes em tabela |
| Componentes | Quatro botões explicativos | Cinco categorias atribuídas diretamente |
| Parâmetro | Não implementado | Parte explícita e avaliada |
| Domínio registrado | Revelado por ferramenta | Identificado no caso e na transferência |
| Casos | Um guiado e um independente | Um percurso alternativo com calibração, caso e transferência |
| Resposta | Ferramentas, evidências e vereditos | Papéis por trecho, domínio, veredito, rota e transferência |

## 6. Avaliação e recompensa da versão 2

Os 60 pontos-base e a recompensa lógica única foram mantidos. Velocidade não concede pontos.

As dimensões implementadas são:

- anatomia dos cinco trechos — 30 pontos;
- domínio registrado e conclusão proporcional — 25 pontos;
- rota própria — 20 pontos;
- transferência da técnica — 25 pontos.

O uso da referência é registrado para o debrief, mas não reduz automaticamente a nota. `needsReview` ocorre com nota abaixo de 60 ou falha crítica em domínio registrado, rota segura ou origem da transferência.

## 7. Contrato, versionamento e compatibilidade implementados

`DomainAnalyzerV2Submission` usa `activityVersion: 2`, `mechanicId: "url-anatomy"`, `casePackageId` publicado e `answerPayload` com:

- `segmentRoleById`;
- `registeredDomainSelectionId`;
- `inspectedSegmentIds`;
- `verdictId`;
- `safeRouteId`;
- `transferRegisteredDomainSelectionId`;
- `transferVerdictId`;
- `usedHelpIds`.

Como a forma persistida mudou:

- a versão 2 foi publicada na mesma rota e ID;
- segmentos são validados contra o pacote, sem analisar URLs externas;
- o esquema local migrou de 6 para 7, alterando somente o metadado;
- tentativas v1 continuam carregáveis;
- conclusão, recompensa, conquistas e contribuição anteriores são preservadas;
- nenhuma segmentação é fabricada para tentativa antiga.

O `activityId` e a rota devem permanecer estáveis por compatibilidade.

## 8. Integrações

A atividade deve continuar:

- como terceira etapa recomendada do percurso;
- servindo de pré-requisito para **Você iniciou este acesso?**;
- relacionada ao Radar de Quishing, sem depender dele;
- registrando competências em Observar, Investigar e Decidir;
- atualizando perfil, pontos, conquistas e atividade recente;
- recomendando uma prática seguinte sem bloquear a jornada.

Conclusões v1 devem continuar satisfazendo o pré-requisito depois de qualquer evolução de formato.

## 9. Privacidade, segurança e backend

Segmentos selecionados, erros, uso de ajuda e nota são privados. Somente o resumo coletivo permitido pode alimentar agregados.

Os endereços permanecem sintéticos. A implementação não deve:

- abrir uma URL;
- realizar requisição de rede;
- resolver DNS;
- expandir um encurtador real;
- aceitar URL livre inserida pelo funcionário;
- afirmar reputação real de domínio.

No uso real, o backend autoritativo deve validar a versão e os identificadores de segmentos, calcular o resultado e confirmar recompensa e contribuição idempotentes.

## 10. Acessibilidade desktop

A cirurgia visual precisa oferecer:

- tokens focáveis com leitura correta de pontuação;
- alternativa textual ou tabular para atribuir rótulos;
- comandos de teclado sem exigir seleção precisa com mouse;
- indicação textual do segmento atual e de sua categoria;
- não depender somente de cores, sublinhados ou posição;
- leitura sem quebra confusa para URLs longas;
- foco programático entre casos;
- respeito a contraste, tamanho de texto e movimento reduzido.

O comportamento específico para celular permanece fora deste recorte.

## 11. Testes e critérios de aceite

- A rota técnica antiga deve continuar abrindo o título visível correto.
- Todos os casos devem usar endereços inertes e catalogados.
- A calibração, o caso principal, a revisão e a transferência devem ser concluíveis por teclado.
- Protocolo, subdomínio, domínio registrado, caminho e parâmetro devem ser distinguíveis.
- A avaliação não pode tratar HTTPS como prova de legitimidade.
- Casos inconclusivos devem aceitar verificação como comportamento seguro.
- Segmentos ou casos desconhecidos devem ser rejeitados pelo validador.
- Nenhuma URL pode produzir navegação ou requisição externa.
- Repetições não podem duplicar recompensa ou contribuição.
- Tentativas v1 carregam após a migração 6→7 sem receber campos v2 fabricados.
- Build, lint, testes automatizados e validação manual desktop devem passar.

## 12. Expansões posteriores, fora desta versão

- ampliar o banco com encurtadores e redirecionamentos totalmente inertes;
- avaliar uma tabela offline e versionada de sufixos públicos para casos além de `.example`;
- validar o conjunto completo em leitor de tela durante o acabamento transversal;
- tratar celular somente na etapa posterior aprovada.

## 13. Histórico

| Data | Registro |
|---|---|
| Implementação anterior | Versão 1 disponibilizada como Analisador de Links, depois apresentada com o título Domínio sob a lupa. |
| Preparação do percurso | `activityId` e rota antigos preservados para compatibilidade. |
| 2026-08-11 | Confirmada a direção de cirurgia visual da URL como formato próprio desta atividade. |
| 2026-08-11 | Documento registra a lacuna de parâmetros e separa o refinamento-alvo do estado vigente. |
| 2026-08-15 | P0 extraiu o conteúdo e as allowlists vigentes para o pacote declarativo `phishlab:link-analyzer:v1:default`; a mecânica, o contrato, a recompensa e o esquema 6 não mudaram. |
| 2026-08-15 | Versão 2 publicada com três pacotes alternativos, anatomia de cinco trechos, transferência, contrato `url-anatomy`, migração 6→7 e recompensa histórica preservada. |
| 2026-08-15 | Abertura passou a atribuir o caso automaticamente, ganhou contexto de papel, situação, tarefa e consequência protegida, e o resultado passou a comparar respostas dadas e esperadas; contrato, avaliador, versão e recompensa não mudaram. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
