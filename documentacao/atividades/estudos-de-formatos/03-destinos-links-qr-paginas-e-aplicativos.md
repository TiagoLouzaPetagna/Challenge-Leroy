# Estudo de formatos — Destinos, links, QR, páginas e aplicativos

> **Estado:** pesquisa; não aprovado para implementação.

## `concept:url-anatomy` — Protocolo, host, caminho, consulta e fragmento

### Ensinamento e papel

- **Comportamento observável:** separar os componentes de uma URL e usar o host, em conjunto com contexto e rota conhecida, para avaliar o destino.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria em PhishLab e fundamento compartilhado.
- **Por que não basta uma explicação textual:** a pessoa precisa operar diretamente sobre endereços e perceber que palavras familiares podem estar fora da parte que identifica o host.

### Dificuldades e riscos

- Sintaxe completa de URI é mais ampla que o necessário para o funcionário.
- Caminho, consulta e fragmento podem conter dados importantes sem alterar quem controla o host.
- Não transformar a atividade em prova de pontuação, separadores ou parser.
- Endereços devem ser sintéticos, inertes e legíveis por tecnologia assistiva.

### Formato A — Mesa de dissecação

- **Área provável:** PhishLab.
- **Mecânica:** selecionar trechos de uma URL e atribuir protocolo, host, caminho, consulta e fragmento.
- **Fluxo:** demonstração → corte assistido → caso independente → recomposição e debrief.
- **O que seria avaliado:** limites dos componentes, localização do host e escolha de rota segura.
- **Alternativa acessível:** cada trecho recebe rótulo por menu, sem exigir arrastar ou seleção por precisão.

### Formato B — Mesma origem, outra roupa

- **Área provável:** PhishLab.
- **Mecânica:** agrupar endereços com caminhos e parâmetros diferentes pelo host que receberia a navegação.
- **Fluxo:** conjunto de URLs → agrupamento → justificativa → casos legítimos e enganosos no debrief.
- **O que seria avaliado:** foco no host sem ignorar o contexto posterior.
- **Alternativa acessível:** grupos escolhidos por rádio e lista textual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mesa de dissecação.
- A futura análise deve decidir como selecionar segmentos sem criar barreira motora.
- Os exemplos precisam representar sufixos brasileiros e parâmetros sem dados reais.

### Fontes

- [RFC Editor — RFC 3986: URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
- [Microsoft Support — What is typosquatting?](https://support.microsoft.com/en-us/security/what-is-typosquatting)

## `concept:registered-domain` — Domínio registrado e sufixo público

### Ensinamento e papel

- **Comportamento observável:** localizar o domínio registrável com auxílio correto do sufixo público e compará-lo à referência oficial.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria e pré-requisito de outros casos de destino.
- **Por que não basta uma explicação textual:** exemplos como `.com.br` tornam falsa a regra “duas últimas partes”; a hierarquia precisa ser manipulada e visualizada.

### Dificuldades e riscos

- Sufixos públicos e privados não podem ser inferidos apenas pela quantidade de pontos.
- A Public Suffix List muda e precisa ser tratada como dado técnico, não memorizada.
- CDNs e plataformas hospedadas podem produzir domínios legítimos complexos.
- O funcionário não deve ser penalizado por não saber a lista de sufixos.

### Formato A — Árvore de controle

- **Área provável:** PhishLab.
- **Mecânica:** expandir uma árvore de rótulos até distinguir sufixo, domínio registrável e subdomínios.
- **Fluxo:** exemplo guiado `.com.br` → árvore assistida → outro sufixo → identificação do controlador.
- **O que seria avaliado:** escolha do domínio registrável com ajuda da ferramenta, não memória da lista.
- **Alternativa acessível:** lista hierárquica com níveis anunciados.

### Formato B — Quem controla este destino?

- **Área provável:** Missão.
- **Mecânica:** comparar solicitação sensível e referência oficial; o sistema destaca o domínio registrável, e a pessoa escolhe como prosseguir.
- **Fluxo:** pedido → inspeção → comparação à referência → rota própria ou reporte → debrief.
- **O que seria avaliado:** uso da referência e decisão proporcional.
- **Alternativa acessível:** tabela lado a lado com domínio destacado por texto além de cor.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Árvore de controle.
- A etapa futura deverá decidir como obter e versionar sufixos públicos sem tornar o cliente fonte autoritativa.
- O conteúdo deve incluir domínio legítimo difícil para controlar falsos positivos.

### Fontes

- [Public Suffix List — List format and data](https://publicsuffix.org/list/)
- [RFC Editor — RFC 3986: URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)

## `concept:deceptive-subdomain` — Subdomínio enganoso

### Ensinamento e papel

- **Comportamento observável:** reconhecer que uma marca à esquerda pode ser subdomínio de outro registrante e usar a rota oficial quando houver dúvida.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso dentro do laboratório de domínio.
- **Por que não basta uma explicação textual:** a posição das palavras e a hierarquia visual produzem o engano; manipular camadas torna a relação clara.

### Dificuldades e riscos

- Subdomínios longos, provedores, CDNs e portais terceirizados podem ser legítimos.
- Comprimento ou quantidade de pontos não é veredito.
- A parte decisiva depende do sufixo público correto.
- A atividade não deve ensinar “qualquer marca no subdomínio é fraude”.

### Formato A — Camadas do endereço

- **Área provável:** PhishLab.
- **Mecânica:** recolher visualmente os rótulos até revelar domínio registrável e proprietário aparente.
- **Fluxo:** URL inteira → camadas → fronteira do registro → caso independente.
- **O que seria avaliado:** localização assistida da fronteira e interpretação sem regra absoluta.
- **Alternativa acessível:** botões “recolher/expandir” e árvore textual.

### Formato B — Chamado de suporte

- **Área provável:** Missão.
- **Mecânica:** comparar endereço recebido com rota do diretório interno e decidir entre seguir, abrir independentemente ou reportar.
- **Fluxo:** contato → URL plausível → diretório → decisão → debrief.
- **O que seria avaliado:** confirmação por referência e abandono da rota recebida.
- **Alternativa acessível:** comparação em tabela e ações por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Camadas do endereço.
- Reutilização com domínio registrado deve ser avaliada depois, sem presumir componente existente.
- Os casos precisam equilibrar subdomínios corporativos legítimos e enganosos.

### Fontes

- [RFC Editor — RFC 3986: URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
- [Public Suffix List — Learn](https://publicsuffix.org/learn/)

## `concept:path-query-branding` — Marca no caminho, parâmetro ou fragmento

### Ensinamento e papel

- **Comportamento observável:** separar identidade do host de palavras familiares posteriores e, quando o parâmetro indicar redirecionamento, investigar o próximo destino.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e caso de transferência.
- **Por que não basta uma explicação textual:** a pessoa precisa marcar a fronteira e perceber que o mesmo host pode carregar muitas “histórias” no restante da URL.

### Dificuldades e riscos

- Caminho e parâmetros podem ser relevantes para função, rastreamento ou redirecionamento.
- A lição não deve ensinar a ignorar tudo depois do host.
- URLs legítimas podem incluir outro endereço como dado.
- A conclusão ainda depende de contexto e ação solicitada.

### Formato A — A fronteira do host

- **Área provável:** PhishLab.
- **Mecânica:** posicionar um divisor entre host e caminho/consulta/fragmento e rotular a função de cada lado.
- **Fluxo:** exemplo guiado → divisor assistido → caso novo → debrief.
- **O que seria avaliado:** fronteira correta e distinção entre identidade e conteúdo.
- **Alternativa acessível:** escolha do ponto por tokens numerados.

### Formato B — Muitas histórias, mesmo destino

- **Área provável:** PhishLab.
- **Mecânica:** agrupar links com marcas diferentes no caminho e parâmetro que chegam ao mesmo host.
- **Fluxo:** cartões → agrupamento → identificação dos parâmetros que exigem análise adicional → conclusão.
- **O que seria avaliado:** não atribuir controle à palavra de marca e reconhecer incerteza.
- **Alternativa acessível:** seleção de grupo por menu.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** A fronteira do host.
- A futura etapa deve definir como representar parâmetros aninhados sem exigir decodificação.
- Casos de open redirect devem permanecer em seção própria, não ser resolvidos apenas por esta regra.

### Fontes

- [RFC Editor — RFC 3986: URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
- [Microsoft Security Blog — Open redirector links](https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/)

## `concept:typosquatting` — Typosquatting

### Ensinamento e papel

- **Comportamento observável:** comparar o domínio com referência oficial ou abandonar a rota recebida sem depender apenas da percepção visual.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria.
- **Por que não basta uma explicação textual:** a prática precisa fornecer ferramentas de comparação e uma saída segura, não apenas mandar “olhar melhor”.

### Dificuldades e riscos

- Nomes legítimos podem ser parecidos.
- Dislexia, baixa visão, fonte e escala não podem determinar a nota.
- Um domínio sem erro aparente ainda pode ser malicioso ou comprometido.
- A referência oficial deve ser fornecida pelo exercício, não memorizada.

### Formato A — Lente de comparação

- **Área provável:** PhishLab.
- **Mecânica:** alinhar domínio candidato e referência, com diferenças reveláveis por caractere, áudio opcional e descrição textual.
- **Fluxo:** comparação guiada → caso independente → escolha de rota → debrief com falso positivo legítimo.
- **O que seria avaliado:** uso da referência e decisão, não acuidade visual.
- **Alternativa acessível:** strings soletradas e diferenças enumeradas.

### Formato B — Recuperar a rota

- **Área provável:** Missão.
- **Mecânica:** sair de uma página duvidosa e reencontrar o serviço pelo favorito, diretório ou aplicativo aprovado sem precisar nomear a alteração.
- **Fluxo:** página recebida → pausa → navegação própria → conclusão ou reporte.
- **O que seria avaliado:** comportamento seguro mesmo quando a pessoa não identifica a letra exata.
- **Alternativa acessível:** árvore de navegação por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Recuperar a rota, apoiado por lente opcional.
- A futura análise deve confirmar comparação acessível de caracteres e idioma.
- Exemplos precisam usar domínios reservados e não ensinar marcas reais como alvos.

### Fontes

- [Microsoft Support — What is typosquatting?](https://support.microsoft.com/en-us/security/what-is-typosquatting)
- [Google Chrome Help — Manage warnings about unsafe sites](https://support.google.com/chrome/answer/99020)

## `concept:typo-variants` — Omissão, inserção, troca, repetição e transposição

### Ensinamento e papel

- **Comportamento observável:** reconhecer famílias de variação com ajuda de referência e manter o processo seguro diante de variante nova.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Pacote de casos e transferência.
- **Por que não basta uma explicação textual:** classificar exemplos ajuda a generalizar, mas a avaliação principal deve continuar sendo a rota escolhida.

### Dificuldades e riscos

- Uma lista fechada envelhece e incentiva memorização.
- Diferença não implica fraude automaticamente.
- Erro de digitação do próprio usuário não deve gerar linguagem de culpa.
- Caracteres visualmente semelhantes pertencem também ao tema de homógrafos.

### Formato A — Famílias de alteração

- **Área provável:** PhishLab.
- **Mecânica:** classificar pares pela transformação ocorrida e depois escolher a ação segura.
- **Fluxo:** exemplo de cada família → conjunto misto → referência oficial → debrief.
- **O que seria avaliado:** generalização e uso da referência, não velocidade.
- **Alternativa acessível:** descrição textual “faltou”, “trocou” ou “mudou de posição”.

### Formato B — Erro de digitação sem culpa

- **Área provável:** Missão.
- **Mecânica:** endereço digitado leva a página inesperada; a pessoa fecha, usa referência salva e reporta se necessário.
- **Fluxo:** digitação representada → comportamento anormal → recuperação de rota → conclusão.
- **O que seria avaliado:** reação segura e reporte, não identificação da variante.
- **Alternativa acessível:** evento narrado em texto, sem exigir digitação real.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Famílias de alteração como complemento de typosquatting.
- O estudo futuro deve limitar quantidade por tentativa e oferecer exemplos legítimos semelhantes.
- Não criar um catálogo ofensivo de marcas reais.

### Fontes

- [Microsoft Support — What is typosquatting?](https://support.microsoft.com/en-us/security/what-is-typosquatting)
- [MITRE ATT&CK — Acquire Infrastructure: Domains](https://attack.mitre.org/techniques/T1583/001/)

## `concept:combosquatting` — Palavra adicional, hífen, plural e outro TLD

### Ensinamento e papel

- **Comportamento observável:** identificar que combinações plausíveis continuam domínios independentes e validar o serviço por referência conhecida.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Comportamento principal ou caso forte em atividade de domínio parecido.
- **Por que não basta uma explicação textual:** blocos e tarefas concretas mostram que palavras “login”, “suporte” ou “segurança” não transferem identidade.

### Dificuldades e riscos

- Empresas legítimas usam domínios de campanha, produto e país.
- Outro TLD não é fraude por definição.
- A avaliação deve admitir “inconclusivo; verificar”.
- A referência oficial precisa ser acessível dentro do cenário.

### Formato A — Blocos de domínio

- **Área provável:** PhishLab.
- **Mecânica:** montar e desmontar domínios sintéticos em marca alegada, palavra adicional, domínio registrável e TLD.
- **Fluxo:** construção guiada → comparação → caso legítimo terceirizado → debrief.
- **O que seria avaliado:** controle do domínio e conclusão proporcional.
- **Alternativa acessível:** seletores por bloco em vez de arrastar.

### Formato B — Download corporativo

- **Área provável:** Missão.
- **Mecânica:** escolher entre resultados plausíveis e catálogo oficial para obter uma ferramenta.
- **Fluxo:** tarefa → resultados → consulta ao catálogo → origem correta → conclusão.
- **O que seria avaliado:** uso do catálogo e recusa de confiar no nome plausível.
- **Alternativa acessível:** lista de resultados com metadados textuais.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Blocos de domínio.
- A etapa futura deverá tratar combosquatting junto de domínio registrável, sem repetir o mesmo exercício.
- Incluir domínio de campanha legítimo confirmado pelo diretório.

### Fontes

- [Microsoft Support — What is typosquatting?](https://support.microsoft.com/en-us/security/what-is-typosquatting)
- [MITRE ATT&CK — Acquire Infrastructure: Domains](https://attack.mitre.org/techniques/T1583/001/)

## `concept:homograph-idn` — Homógrafos, IDN e Punycode

### Ensinamento e papel

- **Comportamento observável:** não confiar apenas na semelhança tipográfica e usar referência oficial ou rota própria quando a ação for sensível.
- **Potencial pedagógico:** Médio como complemento; baixo como atividade visual isolada.
- **Papel recomendado:** Explicação assistida e caso de transferência.
- **Por que não basta uma explicação textual:** revelar script, pontos de código e forma ASCII torna o mecanismo compreensível, mas a pessoa não deve decodificá-lo manualmente.

### Dificuldades e riscos

- Domínios internacionalizados legítimos são essenciais para muitos idiomas.
- Confusabilidade varia por fonte, contexto e percepção.
- Penalizar quem não enxerga a diferença criaria barreira de acessibilidade.
- Punycode visível não é sinônimo de fraude.

### Formato A — Identidade assistida

- **Área provável:** PhishLab.
- **Mecânica:** alternar representação visual, scripts anotados e Punycode explicado por ferramenta.
- **Fluxo:** par confusável → revelação assistida → referência oficial → decisão e limite.
- **O que seria avaliado:** uso da ferramenta e da rota segura, não decodificação.
- **Alternativa acessível:** caracteres soletrados com nome Unicode e posição.

### Formato B — Sem caça à letra

- **Área provável:** Missão.
- **Mecânica:** duas páginas visualmente equivalentes exigem que a pessoa use a rota oficial; o homógrafo só é revelado depois.
- **Fluxo:** solicitação → escolha da origem → navegação independente → debrief.
- **O que seria avaliado:** comportamento defensivo mesmo sem perceber a diferença.
- **Alternativa acessível:** cenário resolvível integralmente por texto e processo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Identidade assistida como complemento não baseado em visão.
- A futura análise deve testar bidi, leitores de tela, normalização e fontes.
- Casos legítimos em escrita não latina são obrigatórios.

### Fontes

- [Unicode — UTS #39: Unicode Security Mechanisms](https://www.unicode.org/reports/tr39/)
- [Unicode — UTR #36: Unicode Security Considerations](https://www.unicode.org/reports/tr36/)

## `concept:link-text-mismatch` — Texto ou botão diferente do destino

### Ensinamento e papel

- **Comportamento observável:** comparar promessa, destino indicado, contexto e rota final antes de agir.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria ou comportamento principal de inspeção de links.
- **Por que não basta uma explicação textual:** a divergência precisa ser investigada com ferramenta acessível; `hover` não é suficiente nem universal.

### Dificuldades e riscos

- Serviços legítimos reescrevem links para rastreamento e proteção.
- Em telas touch e teclado não existe a mesma prévia por hover.
- Texto e destino coincidentes ainda não comprovam legitimidade.
- A atividade deve representar destino sem permitir navegação.

### Formato A — Inspetor da mensagem

- **Área provável:** PhishLab.
- **Mecânica:** foco, teclado ou ponteiro abre a mesma prévia textual e permite prender a divergência como evidência.
- **Fluxo:** mensagem → inspeção → contexto → decisão → debrief.
- **O que seria avaliado:** uso do inspetor e interpretação proporcional.
- **Alternativa acessível:** botão “ver destino” associado a cada link.

### Formato B — Promessa e destino

- **Área provável:** PhishLab.
- **Mecânica:** relacionar rótulos de botões aos endereços efetivos e decidir quando abandonar a rota recebida.
- **Fluxo:** pares guiados → caso independente → rota segura → explicação de reescrita legítima.
- **O que seria avaliado:** relações corretas e tratamento de inconclusivo.
- **Alternativa acessível:** menus de associação por linha.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Inspetor da mensagem.
- A futura análise deve oferecer comportamento idêntico a mouse, teclado e toque futuro.
- Incluir link reescrito legitimamente que ainda exige contexto.

### Fontes

- [Microsoft Support — Protect yourself from phishing](https://support.microsoft.com/en-US/security/protect-yourself-from-phishing)
- [CISA Secure Our World — Recognize and Report Phishing](https://www.cisa.gov/secure-our-world)

## `concept:url-shortener` — Encurtador

### Ensinamento e papel

- **Comportamento observável:** reconhecer informação insuficiente e usar prévia segura ou navegação independente, especialmente para login, pagamento e download.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de uma atividade.
- **Por que não basta uma explicação textual:** a pessoa precisa decidir conforme sensibilidade e contexto; “link curto é fraude” seria uma regra falsa.

### Dificuldades e riscos

- Encurtadores têm usos legítimos em comunicação e acessibilidade.
- Serviços de prévia podem falhar ou acrescentar outro intermediário.
- Expandir não garante que a cadeia terminou.
- O exercício não deve consultar rede ou serviço real.

### Formato A — Prévia controlada

- **Área provável:** PhishLab.
- **Mecânica:** revelar internamente destinos sintéticos de links curtos legítimos, suspeitos e inconclusivos.
- **Fluxo:** link curto → prévia → contexto → ação → debrief.
- **O que seria avaliado:** busca de informação suficiente e decisão proporcional.
- **Alternativa acessível:** prévia textual anunciada em região de status.

### Formato B — Sensibilidade da ação

- **Área provável:** Simulação.
- **Mecânica:** decidir quando um link curto pode servir para conteúdo de baixo impacto e quando a tarefa exige rota oficial.
- **Fluxo:** microcasos → classificação de impacto → ação → contraste final.
- **O que seria avaliado:** calibragem pelo impacto, sem condenação automática.
- **Alternativa acessível:** cartões textuais com ações por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Sensibilidade da ação.
- Uma eventual proposta de implementação não deverá expandir links reais.
- Casos legítimos e inconclusivos são indispensáveis.

### Fontes

- [CISA/US-CERT — Risks of URL Shortening Services](https://www.cisa.gov/sites/default/files/publications/TIP10-105-01.pdf)
- [Microsoft Security Blog — Open redirector links](https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/)

## `concept:open-redirect` — Redirecionador aberto

### Ensinamento e papel

- **Comportamento observável:** não encerrar a análise no primeiro domínio conhecido e preferir abrir o serviço diretamente quando a rota recebida incorpora outro destino.
- **Potencial pedagógico:** Alto como caso central.
- **Papel recomendado:** Caso de uma atividade de destino e redirecionamento.
- **Por que não basta uma explicação textual:** destacar o destino incorporado e mostrar os saltos torna clara a “confiança emprestada” sem ensinar exploração.

### Dificuldades e riscos

- Redirecionamentos legítimos são frequentes em autenticação, marketing e proteção.
- O funcionário não precisa diagnosticar vulnerabilidade do site.
- Parâmetro pode estar codificado ou não ser humanamente legível.
- Um domínio inicial conhecido não prova o destino final.

### Formato A — Microscópio de parâmetro

- **Área provável:** PhishLab.
- **Mecânica:** a ferramenta destaca um destino sintético incorporado em parâmetro e separa primeiro e próximo host.
- **Fluxo:** URL → destaque assistido → cadeia → decisão → debrief.
- **O que seria avaliado:** reconhecimento de salto e escolha de rota segura, não decodificação.
- **Alternativa acessível:** parâmetro explicado em campos textuais.

### Formato B — Confiança emprestada

- **Área provável:** Missão.
- **Mecânica:** narrativa oferece primeiro salto conhecido; a pessoa escolhe seguir ou abrir diretamente o serviço.
- **Fluxo:** pedido → domínio familiar → aviso de redirecionamento → ação → consequência.
- **O que seria avaliado:** abandono da rota recebida para ação sensível.
- **Alternativa acessível:** cadeia descrita por lista e botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Microscópio de parâmetro.
- A futura análise deve representar codificação somente de forma assistida.
- O material não pode fornecer um redirecionador funcional.

### Fontes

- [Microsoft Security Blog — Open redirector links](https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/)
- [RFC Editor — RFC 3986: URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)

## `concept:redirect-chain` — Cadeia de redirecionamentos

### Ensinamento e papel

- **Comportamento observável:** considerar destino final e mudanças de domínio e, quando a cadeia não for observável, usar rota conhecida ou reportar.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria ou transferência avançada.
- **Por que não basta uma explicação textual:** uma linha de percurso mostra como cada salto acrescenta ou remove contexto e onde a pessoa ainda pode interromper.

### Dificuldades e riscos

- Cadeias legítimas de SSO, marketing e proteção são comuns.
- O navegador pode ocultar saltos rápidos.
- Logs HTTP completos seriam conhecimento de especialista.
- O destino final ainda pode mudar por sessão, região ou dispositivo.

### Formato A — Mapa de percurso

- **Área provável:** PhishLab.
- **Mecânica:** revelar saltos sintéticos sequencialmente e marcar mudanças de domínio e destino final.
- **Fluxo:** primeiro link → saltos → origem final → escolha de rota → debrief.
- **O que seria avaliado:** leitura do mapa fornecido e resposta, não observação impossível em tempo real.
- **Alternativa acessível:** lista numerada de saltos.

### Formato B — Reconstrução pós-evento

- **Área provável:** Simulação.
- **Mecânica:** ordenar registros simplificados de navegação e montar resposta proporcional.
- **Fluxo:** eventos fora de ordem → cadeia → exposição → reporte e recuperação.
- **O que seria avaliado:** relações causais e fatos preservados.
- **Alternativa acessível:** ordenação por botões e resumo textual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mapa de percurso.
- A futura etapa deve decidir se a cadeia é conteúdo curado, nunca descoberta por rede.
- Incluir cadeia legítima para evitar que quantidade de saltos vire veredito.

### Fontes

- [Microsoft Security Blog — Open redirector links](https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/)
- [MITRE ATT&CK — Phishing: Spearphishing Link](https://attack.mitre.org/techniques/T1566/002/)

## `concept:url-obfuscation-advanced` — `userinfo@host`, IP, codificação e abuso de esquema

### Ensinamento e papel

- **Comportamento observável:** reconhecer quando a inspeção humana não fornece confiança suficiente e interromper ação sensível, usando rota oficial ou escalonamento.
- **Potencial pedagógico:** Baixo como atividade própria.
- **Papel recomendado:** Explicação assistida e limite técnico.
- **Por que não basta uma explicação textual:** um normalizador pode demonstrar a estrutura, mas decodificação manual não deve ser avaliada.

### Dificuldades e riscos

- IPs, codificação, `userinfo` e esquemas personalizados têm usos legítimos.
- Normalização pode depender de parser e contexto técnico.
- Excesso de exemplos vira catálogo ofensivo ou teste de especialista.
- A resposta correta pode ser “informação insuficiente”.

### Formato A — Normalizador explicativo

- **Área provável:** PhishLab.
- **Mecânica:** a ferramenta transforma representações sintéticas em componentes legíveis e explica o limite.
- **Fluxo:** endereço opaco → normalização assistida → host/ação → decisão.
- **O que seria avaliado:** decisão posterior, não transformação manual.
- **Alternativa acessível:** antes/depois em tabela textual.

### Formato B — Limite de investigação

- **Área provável:** Simulação curta.
- **Mecânica:** tarefas de impactos diferentes usam destinos opacos; a pessoa escolhe o que pode prosseguir e o que exige rota oficial.
- **Fluxo:** casos → impacto → evidência disponível → ação → debrief.
- **O que seria avaliado:** calibragem da resposta e uso de escalonamento.
- **Alternativa acessível:** cartões de caso em texto.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Normalizador explicativo não pontuado; a decisão pode ser pontuada.
- A análise técnica futura deve usar somente dados curados e parser seguro.
- Não é necessário cobrir todas as formas numa tentativa.

### Fontes

- [RFC Editor — RFC 3986: URI Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html)
- [CISA/US-CERT — Risks of URL Shortening Services](https://www.cisa.gov/sites/default/files/publications/TIP10-105-01.pdf)

## `concept:https-limit` — HTTPS e cadeado

### Ensinamento e papel

- **Comportamento observável:** entender que HTTPS protege a conexão com o domínio mostrado, mas ainda conferir domínio, origem e finalidade.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar obrigatório em página e URL.
- **Por que não basta uma explicação textual:** um modelo de transporte e dois casos cifrados evitam tanto supervalorizar quanto desvalorizar HTTPS.

### Dificuldades e riscos

- Ausência de HTTPS é problema; presença não atesta honestidade.
- Navegadores mudaram a representação do cadeado e do estado seguro.
- Certificado válido pode pertencer ao domínio do atacante.
- Não ensinar que aviso de certificado deve ser ignorado porque “cadeado não prova nada”.

### Formato A — Túnel de transporte

- **Área provável:** PhishLab.
- **Mecânica:** montar navegador → conexão cifrada → domínio e selecionar exatamente o que foi protegido.
- **Fluxo:** diagrama guiado → afirmações → dois domínios HTTPS → debrief.
- **O que seria avaliado:** limite conceitual e continuação da verificação.
- **Alternativa acessível:** descrição linear equivalente ao diagrama.

### Formato B — Dois destinos cifrados

- **Área provável:** Missão.
- **Mecânica:** duas páginas usam HTTPS, mas só uma corresponde à referência oficial; a pessoa escolhe a rota.
- **Fluxo:** solicitação → inspeção → referência → decisão → explicação.
- **O que seria avaliado:** conferência do destino sem tratar HTTPS como veredito.
- **Alternativa acessível:** comparação tabular por texto.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Dois destinos cifrados.
- A futura análise deve usar iconografia genérica e texto explícito, não depender de um navegador específico.
- O caso legítimo precisa reforçar o valor real da conexão protegida.

### Fontes

- [Google Chrome Help — Check if a site's connection is secure](https://support.google.com/chrome/answer/95617)
- [NIST — Guidelines for the Selection, Configuration, and Use of TLS Implementations](https://csrc.nist.gov/pubs/sp/800/52/r2/final)

## `concept:cloned-page` — Página clonada e coleta de credenciais

### Ensinamento e papel

- **Comportamento observável:** abandonar aparência, personalização e campos preenchidos como prova e abrir o serviço independentemente.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria em PhishLab.
- **Por que não basta uma explicação textual:** a experiência precisa evitar “sete erros” e ensinar origem da navegação diante de uma cópia convincente.

### Dificuldades e riscos

- Layout legítimo pode mudar e página falsa pode ser visualmente perfeita.
- Comparação lado a lado pode ensinar caça a defeito cosmético.
- A página não pode aceitar credencial real.
- Design simples ou estranho não prova fraude.

### Formato A — Espelho sequencial

- **Área provável:** PhishLab.
- **Mecânica:** a referência e a página recebida não aparecem lado a lado; a pessoa precisa sair e iniciar navegação própria.
- **Fluxo:** página recebida → decisão de sair → rota conhecida → comparação posterior no debrief.
- **O que seria avaliado:** origem escolhida e não interação com a página recebida.
- **Alternativa acessível:** páginas descritas por estrutura textual e URL.

### Formato B — Painel de evidências de confiança

- **Área provável:** PhishLab.
- **Mecânica:** classificar logo, texto, personalização, URL, rota iniciada e alertas entre copiável, contextual e mais forte.
- **Fluxo:** evidências → classificação → veredito proporcional → debrief.
- **O que seria avaliado:** peso dado às evidências e escolha de rota.
- **Alternativa acessível:** tabela com seletores.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Espelho sequencial.
- A análise futura deve proibir formulários de segredo e cópia de marca real.
- Incluir página legítima visualmente incomum para evitar regra cosmética.

### Fontes

- [Google Search Central — Social engineering](https://developers.google.com/search/docs/monitor-debug/security/social-engineering)
- [CISA Secure Our World — Recognize and Report Phishing](https://www.cisa.gov/secure-our-world)

## `concept:false-sso` — Falso SSO

### Ensinamento e papel

- **Comportamento observável:** conferir se o login foi iniciado pela própria pessoa, qual aplicação solicitou autenticação e qual provedor/origem foi aberto.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso principal em página falsa e ponte para autenticação.
- **Por que não basta uma explicação textual:** fluxos legítimos atravessam aplicações; ordenar a passagem entre elas permite distinguir transição esperada de interrupção recebida.

### Dificuldades e riscos

- SSO real pode mudar de domínio e aparência.
- Não existe lista universal de provedores confiáveis.
- Página do provedor pode ser real em device code ou consentimento malicioso.
- A atividade não autentica ninguém.

### Formato A — Handoff de autenticação

- **Área provável:** PhishLab.
- **Mecânica:** ordenar aplicação → provedor autorizado → retorno e identificar pedido inesperado de credencial.
- **Fluxo:** caso guiado → cadeia legítima → cadeia alterada → decisão.
- **O que seria avaliado:** relação entre ação iniciada, aplicação e provedor.
- **Alternativa acessível:** ordenação por botões e lista numerada.

### Formato B — Trabalho interrompido

- **Área provável:** Missão.
- **Mecânica:** documento recebido abre tela familiar de SSO; a pessoa pode fechar e abrir o documento pelo portal conhecido.
- **Fluxo:** tarefa → login inesperado → rota independente → conclusão ou reporte.
- **O que seria avaliado:** abandono do login recebido e verificação do documento.
- **Alternativa acessível:** narrativa textual e árvore de ações.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Handoff de autenticação.
- A futura análise deve definir provedores fictícios e transições legíveis.
- Não misturar false SSO, OAuth e device code numa única tentativa.

### Fontes

- [Microsoft Learn — Permissions and consent overview](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview)
- [Microsoft Security Blog — Open redirector links and fake sign-in](https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/)

## `concept:browser-in-browser` — Janela de navegador simulada

### Ensinamento e papel

- **Comportamento observável:** compreender que conteúdo da página pode desenhar uma falsa janela e iniciar o login pelo aplicativo ou rota conhecida.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso avançado e explicação interativa.
- **Por que não basta uma explicação textual:** a diferença entre interface do navegador e conteúdo precisa ser revelada por camadas, sem depender de truques visuais frágeis.

### Dificuldades e riscos

- Bordas, arraste, maximização e posição não são provas universais.
- Acessibilidade e diferentes navegadores mudam a apresentação.
- Uma réplica muito fiel pode confundir ou treinar caça a pixel.
- A ação segura deve funcionar mesmo sem reconhecer a técnica.

### Formato A — Inspetor de camadas

- **Área provável:** PhishLab.
- **Mecânica:** alternar entre “conteúdo da página” e “interface do navegador”, revelando onde a janela foi desenhada.
- **Fluxo:** pop-up representado → camadas → origem → decisão → debrief.
- **O que seria avaliado:** compreensão das camadas e uso de rota independente.
- **Alternativa acessível:** árvore semântica textual das camadas.

### Formato B — Saída independente

- **Área provável:** Missão.
- **Mecânica:** diante de pop-up convincente, fechar a guia representada e iniciar login pelo aplicativo conhecido.
- **Fluxo:** pop-up → escolha → rota própria → resultado e revelação da técnica.
- **O que seria avaliado:** ação, não descoberta de detalhe visual.
- **Alternativa acessível:** botões explícitos para fechar e abrir rota oficial.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Inspetor de camadas como caso avançado.
- A futura análise deverá testar foco, leitores de tela e distinção entre moldura didática e réplica.
- Não depender de arrastar a janela para revelar fraude.

### Fontes

- [Microsoft Security Blog — Device-code campaign using browser-in-the-browser](https://www.microsoft.com/en-us/security/blog/2026/04/06/ai-enabled-device-code-phishing-campaign-april-2026/)
- [Google Search Central — Social engineering](https://developers.google.com/search/docs/monitor-debug/security/social-engineering)

## `concept:captcha-trust` — CAPTCHA como falsa prova de segurança

### Ensinamento e papel

- **Comportamento observável:** entender que CAPTCHA tenta verificar interação para o site, não identidade do site para a pessoa, e continuar avaliando origem e ação.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e ponte para ClickFix.
- **Por que não basta uma explicação textual:** comparar fluxos legítimo e malicioso com CAPTCHA evita transformar o desafio em sinal de fraude ou segurança.

### Dificuldades e riscos

- CAPTCHAs legítimos são comuns e podem ser barreira de acessibilidade.
- O exercício não deve pedir resolução visual ou auditiva de CAPTCHA.
- O risco principal pode aparecer somente depois do desafio.
- ClickFix é um caso distinto quando a página exige comando no sistema.

### Formato A — O que foi provado?

- **Área provável:** PhishLab.
- **Mecânica:** comparar dois fluxos, ambos com CAPTCHA, e selecionar a garantia real oferecida.
- **Fluxo:** desafios representados → afirmações → contexto e origem → debrief.
- **O que seria avaliado:** limite conceitual, não resolução do desafio.
- **Alternativa acessível:** CAPTCHA apenas descrito, nunca usado como barreira.

### Formato B — Depois do desafio

- **Área provável:** Missão.
- **Mecânica:** após uma verificação representada, a página pede senha ou ação de sistema; a pessoa decide pela origem e pelo pedido.
- **Fluxo:** CAPTCHA → pedido seguinte → pausa → rota oficial ou reporte.
- **O que seria avaliado:** reavaliação após cada etapa.
- **Alternativa acessível:** sequência textual com botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** O que foi provado?
- A futura análise deve garantir que nenhum CAPTCHA real seja incorporado.
- O conceito pode complementar página falsa e ClickFix sem atividade própria.

### Fontes

- [Google — reCAPTCHA](https://developers.google.com/recaptcha/)
- [Microsoft Security Blog — Think before you Click(Fix)](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/)

## `concept:quishing` — Quishing

### Ensinamento e papel

- **Comportamento observável:** obter prévia do destino, avaliar contexto e usar rota conhecida para autenticação, pagamento ou dado sensível.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria.
- **Por que não basta uma explicação textual:** QR desloca contexto para outro dispositivo; a prática precisa separar formato, destino e finalidade sem usar câmera real.

### Dificuldades e riscos

- QR é amplamente legítimo.
- Alguns leitores mostram prévia incompleta ou redirecionada.
- Troca de dispositivo pode remover alertas e histórico da mensagem original.
- Nenhum QR do exercício deve ser decodificável ou acionável.

### Formato A — Leitor simulado

- **Área provável:** PhishLab.
- **Mecânica:** QR estático e inerte produz prévia textual controlada antes da decisão.
- **Fluxo:** contexto → prévia → domínio/beneficiário → ação → debrief.
- **O que seria avaliado:** solicitação de prévia, contexto e rota escolhida.
- **Alternativa acessível:** botão “ver conteúdo representado” e texto equivalente.

### Formato B — Handoff entre canais

- **Área provável:** Missão.
- **Mecânica:** e-mail ou documento pede usar outro dispositivo; a pessoa escolhe o aplicativo oficial ou a rota recebida.
- **Fluxo:** pedido → troca de canal → destino → confirmação independente → resultado.
- **O que seria avaliado:** preservação do contexto entre canais.
- **Alternativa acessível:** canais representados em abas com ordem de leitura explícita.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Leitor simulado.
- A análise futura deve garantir representação totalmente inerte e sem permissão de câmera.
- Incluir QR legítimo e inconclusivo para controlar falso positivo.

### Fontes

- [NCSC — QR codes: what is the real risk?](https://www.ncsc.gov.uk/blog-post/qr-codes-whats-real-risk)
- [FTC — Scammers hide harmful links in QR codes](https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information)

## `concept:qr-physical-replacement` — QR físico substituído

### Ensinamento e papel

- **Comportamento observável:** considerar contexto, responsável, identificação do ativo e possível sobreposição e preferir aplicativo ou rota oficial.
- **Potencial pedagógico:** Alto como caso.
- **Papel recomendado:** Caso de atividade de QR e transferência para ambiente físico.
- **Por que não basta uma explicação textual:** a decisão combina observação do local e confirmação processual; notar cola ou desalinhamento sozinho não basta.

### Dificuldades e riscos

- Adesivos e atualizações físicas podem ser legítimos.
- Imagem, contraste e baixa visão não podem determinar a nota.
- O responsável pelo ativo precisa existir no cenário fictício.
- A representação não pode conter QR funcional.

### Formato A — Inspeção do ambiente

- **Área provável:** Missão.
- **Mecânica:** ilustração com zoom e descrição textual permite recolher evidências visuais e contextuais.
- **Fluxo:** necessidade → placa ou equipamento → inspeção → confirmação com responsável → decisão.
- **O que seria avaliado:** combinação de evidências e verificação, não percepção de um adesivo.
- **Alternativa acessível:** descrição estruturada de cada região e pistas textuais equivalentes.

### Formato B — Registro do ativo

- **Área provável:** PhishLab.
- **Mecânica:** confrontar local, identificador, finalidade e responsável do QR com inventário fictício.
- **Fluxo:** QR representado → consulta ao registro → divergência ou confirmação → ação.
- **O que seria avaliado:** uso da fonte oficial e tratamento proporcional.
- **Alternativa acessível:** comparação em tabela.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Registro do ativo, por não depender da visão.
- A futura análise deve alinhar o caso ao conjunto presencial sem criar câmera ou geolocalização.
- Incluir substituição autorizada para controlar falso positivo.

### Fontes

- [NCSC — QR codes: what is the real risk?](https://www.ncsc.gov.uk/blog-post/qr-codes-whats-real-risk)
- [FTC — Scammers hide harmful links in QR codes](https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information)

## `concept:qr-payment-destination` — QR, valor e beneficiário

### Ensinamento e papel

- **Comportamento observável:** conferir beneficiário, valor, finalidade e cadastro antes de confirmar, usando segunda aprovação quando o processo exigir.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso principal de QR financeiro e transferência para processo de pagamento.
- **Por que não basta uma explicação textual:** a pessoa precisa reconciliar dados e interromper pagamento diante de divergência, não apenas inspecionar URL.

### Dificuldades e riscos

- Nome jurídico ou intermediador pode diferir legitimamente da marca.
- O beneficiário exibido depende do arranjo de pagamento.
- A confirmação precisa usar cadastro ou processo conhecido, não contato do próprio pedido.
- Nenhum QR ou pagamento real pode existir.

### Formato A — Confirmação de pagamento simulada

- **Área provável:** Missão.
- **Mecânica:** comparar solicitação original com valor e beneficiário exibidos antes da aprovação fictícia.
- **Fluxo:** cobrança → prévia do QR → divergências → confirmação independente → decisão.
- **O que seria avaliado:** conferência dos campos e preservação do processo.
- **Alternativa acessível:** tabela de dados com diferenças descritas.

### Formato B — Reconciliação de fornecedor

- **Área provável:** Simulação.
- **Mecânica:** consultar cadastro anterior, diretório, confirmação e segunda aprovação para resolver cobrança por QR.
- **Fluxo:** pedido → registros → contato homologado → bloqueio/aprovação → reporte.
- **O que seria avaliado:** cadeia completa, não velocidade.
- **Alternativa acessível:** estações navegáveis por teclado e ações por menus.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Confirmação de pagamento simulada.
- A análise futura depende de regra corporativa e terminologia local do arranjo de pagamento.
- Os dados devem ser fictícios e insuficientes para transação.

### Fontes

- [Banco Central do Brasil — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [CERT.br — Fascículo Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes/fasciculo-golpes.pdf)

## `concept:seo-poisoning` — SEO poisoning

### Ensinamento e papel

- **Comportamento observável:** não tratar posição no resultado como autenticação e localizar serviço, suporte ou download pela origem oficial.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria de descoberta segura.
- **Por que não basta uma explicação textual:** a pessoa precisa completar uma tarefa sem usar ranking como evidência, inclusive quando o primeiro resultado é legítimo.

### Dificuldades e riscos

- Resultados orgânicos podem ser legítimos ou maliciosos.
- Ranking varia por região, personalização e momento.
- A simulação não deve copiar um buscador real ou consultar a web.
- “Primeiro resultado é fraude” seria outra regra incorreta.

### Formato A — Página de resultados fictícia

- **Área provável:** PhishLab.
- **Mecânica:** distinguir anúncio, ranking, domínio e origem oficial e escolher como continuar.
- **Fluxo:** tarefa → resultados curados → inspeção → catálogo/favorito/endereço conhecido → debrief.
- **O que seria avaliado:** rota construída e evidências usadas.
- **Alternativa acessível:** lista de resultados com rótulos textuais completos.

### Formato B — Planejador de rota

- **Área provável:** Missão.
- **Mecânica:** receber tarefa sensível e montar a navegação por diretório interno, aplicativo ou endereço conhecido.
- **Fluxo:** necessidade → fontes possíveis → sequência escolhida → destino → resultado.
- **O que seria avaliado:** independência da busca e uso da fonte apropriada.
- **Alternativa acessível:** sequência escolhida por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Página de resultados fictícia.
- A futura análise deve separar busca, anúncio e aplicativo sem sobrecarregar uma tentativa.
- Incluir primeiro resultado legítimo e resultado posterior oficial.

### Fontes

- [FBI — Cybercriminals impersonating employee self-service websites](https://www.fbi.gov/investigate/cyber/alerts/2025/cybercriminals-impersonating-employee-self-service-websites-to-steal-victim-information-and-funds)
- [CISA — Securing Web Browsers and Defending Against Malvertising](https://www.cisa.gov/sites/default/files/2023-09/CISA%20CEG%20Securing%20Web%20Browsers%20And%20Defending%20Against%20Malvertising.pdf)

## `concept:malicious-ad` — Anúncio falso e malvertising

### Ensinamento e papel

- **Comportamento observável:** não depender de anúncio para login, suporte ou download sensível; usar catálogo, aplicativo ou endereço oficial.
- **Potencial pedagógico:** Alto como caso.
- **Papel recomendado:** Caso complementar a descoberta segura.
- **Por que não basta uma explicação textual:** anúncios podem imitar controles e ocupar a primeira posição; a tarefa deve continuar por uma rota independente.

### Dificuldades e riscos

- A maioria dos anúncios não é maliciosa.
- Rótulo “patrocinado” não prova fraude, e anunciante aparente pode ser insuficiente.
- Bloqueador é controle técnico/política, não obrigação universal do funcionário.
- Nenhuma publicidade real deve ser carregada.

### Formato A — Faixa patrocinada

- **Área provável:** PhishLab.
- **Mecânica:** examinar rótulo, anunciante e destino representados e concluir a tarefa pela rota oficial.
- **Fluxo:** busca → anúncio → inspeção → rota alternativa → debrief.
- **O que seria avaliado:** não usar posição ou aparência como autorização.
- **Alternativa acessível:** resultados em lista e rótulos explícitos.

### Formato B — Botões de download concorrentes

- **Área provável:** Missão.
- **Mecânica:** página contém anúncios que imitam download; a pessoa deve usar atualização no aplicativo ou catálogo aprovado.
- **Fluxo:** necessidade → página → escolha da fonte → download apenas representado → conclusão.
- **O que seria avaliado:** origem escolhida e recusa de controles publicitários.
- **Alternativa acessível:** cada elemento identificado semanticamente como anúncio ou conteúdo, sem depender de cor.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Faixa patrocinada.
- A etapa futura deve criar resultados fictícios sem reproduzir interface ou anunciante real.
- Um anúncio legítimo precisa aparecer para controlar falso positivo.

### Fontes

- [CISA — Securing Web Browsers and Defending Against Malvertising](https://www.cisa.gov/sites/default/files/2023-09/CISA%20CEG%20Securing%20Web%20Browsers%20And%20Defending%20Against%20Malvertising.pdf)
- [Google Ad Manager Help — Prevent malware in ad content](https://support.google.com/admanager/answer/181490)

## `concept:fake-app-developer` — Aplicativo e desenvolvedor imitados

### Ensinamento e papel

- **Comportamento observável:** conferir loja ou catálogo, editor, finalidade, origem e permissões, preferindo o caminho oficial da organização.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso próprio de descoberta e ponte para consentimento.
- **Por que não basta uma explicação textual:** nome e ícone podem ser copiados; comparar ficha, catálogo e permissões oferece evidências mais fortes.

### Dificuldades e riscos

- Nome jurídico do editor pode diferir da marca.
- Loja e identidade verificada reduzem risco, mas não garantem finalidade ou comportamento.
- Aplicativos legítimos podem mudar de editor após aquisição.
- Nenhum app ou loja real deve ser aberto.

### Formato A — Ficha da loja

- **Área provável:** PhishLab.
- **Mecânica:** comparar editor, contato, origem, histórico e permissões de apps visualmente parecidos.
- **Fluxo:** caso guiado → ficha → catálogo oficial → caso independente → debrief.
- **O que seria avaliado:** uso de múltiplas evidências e rota oficial.
- **Alternativa acessível:** fichas em tabela.

### Formato B — Solicitação de instalação

- **Área provável:** Missão.
- **Mecânica:** localizar app no catálogo corporativo e avaliar permissões no primeiro uso, em vez de seguir link recebido.
- **Fluxo:** pedido → catálogo → editor → permissões → decisão.
- **O que seria avaliado:** origem, finalidade e proporcionalidade das permissões.
- **Alternativa acessível:** árvore de catálogo e lista de permissões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Solicitação de instalação.
- A futura análise precisa decidir como representar loja fictícia sem parecer endosso real.
- Publisher deve ser tratado como evidência limitada.

### Fontes

- [Apple Developer — App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Console Help — Verify developer identity information](https://support.google.com/googleplay/android-developer/answer/10841920)

## `concept:legitimate-site-compromise` — Site legítimo comprometido

### Ensinamento e papel

- **Comportamento observável:** interromper comportamento inesperado mesmo em domínio correto, respeitar alertas e reportar sem assumir que deveria ter detectado o comprometimento.
- **Potencial pedagógico:** Controle técnico predominante.
- **Papel recomendado:** Explicação interativa de limite e caso de resposta.
- **Por que não basta uma explicação textual:** um contraste causal mostra que domínio correto reduz algumas hipóteses, mas não elimina risco do conteúdo atual.

### Dificuldades e riscos

- Pode não existir pista humana antes da interação.
- O comportamento anormal pode ser bug ou mudança legítima.
- Responsabilizar a visita ao site habitual seria injusto.
- Defesa principal envolve correção do site, navegador, endpoint e monitoramento.

### Formato A — Domínio certo, comportamento errado

- **Área provável:** Missão.
- **Mecânica:** site conhecido pede download, comando ou quebra de proteção; a pessoa decide parar e reportar.
- **Fluxo:** rota correta → evento anormal → decisão → explicação do comprometimento possível.
- **O que seria avaliado:** resposta ao comportamento observável, não diagnóstico.
- **Alternativa acessível:** evento e opções em texto.

### Formato B — Divisão de responsabilidades

- **Área provável:** PhishLab.
- **Mecânica:** relacionar usuário, navegador, endpoint, dono do site e segurança ao que cada um consegue observar e conter.
- **Fluxo:** incidente → responsabilidades → controles → debrief sem culpa.
- **O que seria avaliado:** encaminhamento correto; detecção técnica não recebe pontos.
- **Alternativa acessível:** tabela de responsabilidades.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Domínio certo, comportamento errado.
- A futura análise deve explicitar que “correto” se refere ao domínio esperado, não à segurança total.
- Não simular exploração ou comprometimento real.

### Fontes

- [MITRE ATT&CK — Drive-by Compromise](https://attack.mitre.org/techniques/T1189/)
- [Google Search Console Help — Dangerous or hacked site warnings](https://support.google.com/webmasters/answer/6347750)

## `concept:watering-hole` — Watering hole

### Ensinamento e papel

- **Comportamento observável:** manter software e navegador gerenciados, respeitar bloqueios e reportar anomalia quando houver, entendendo que visitar site habitual não é falha humana.
- **Potencial pedagógico:** Controle técnico predominante.
- **Papel recomendado:** Explicação de limite e defesa em camadas.
- **Por que não basta uma explicação textual:** uma retrospectiva pode separar o que era visível no momento do que só a investigação descobriu, evitando falsa promessa de detecção.

### Dificuldades e riscos

- A simples visita pode ser suficiente e o site pode parecer normal.
- Não existe teste humano justo para reconhecer ataque invisível.
- Atualização, isolamento, filtragem e detecção são controles centrais.
- O exercício não deve insinuar que “site do setor” é suspeito por categoria.

### Formato A — Retrospectiva sem culpa

- **Área provável:** PhishLab.
- **Mecânica:** reconstruir incidente e marcar fatos visíveis antes, durante e somente depois da investigação.
- **Fluxo:** visita habitual → efeito técnico representado → investigação posterior → divisão de responsabilidades.
- **O que seria avaliado:** resposta aos sinais que realmente existiam e reporte, não detecção inicial.
- **Alternativa acessível:** linha temporal textual com rótulos de disponibilidade da informação.

### Formato B — Barreiras em camadas

- **Área provável:** Simulação curta.
- **Mecânica:** relacionar atualização, filtragem, isolamento, monitoramento e reporte às etapas da cadeia.
- **Fluxo:** cadeia abstrata → controles → lacunas → debrief.
- **O que seria avaliado:** compreensão de responsabilidades; a visita não recebe penalidade.
- **Alternativa acessível:** tabela etapa–controle.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Retrospectiva sem culpa, como explicação não pontuada da detecção.
- Não criar atividade autônoma de “ache o watering hole”.
- A futura análise deve decidir se o conceito agrega valor ao público geral ou apenas ao debrief técnico.

### Fontes

- [MITRE ATT&CK — Drive-by Compromise](https://attack.mitre.org/techniques/T1189/)
- [NIST — Guide to Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final)

## `concept:pharming` — Pharming

### Ensinamento e papel

- **Comportamento observável:** não contornar alerta ou comportamento anormal mesmo após digitar endereço correto e acionar suporte oficial.
- **Potencial pedagógico:** Controle técnico predominante.
- **Papel recomendado:** Explicação interativa de limite e caso de resposta.
- **Por que não basta uma explicação textual:** um diagrama de resolução pode explicar por que a rota digitada ainda pode ser desviada, sem responsabilizar a pessoa por DNS invisível.

### Dificuldades e riscos

- Alteração de DNS ou dispositivo pode ser completamente invisível.
- Nem todo desvio gera aviso de certificado.
- Falha de DNS e erro de certificado podem ter causas benignas.
- Proteção principal depende de DNS seguro, dispositivo e rede administrados.

### Formato A — Caminho da resolução

- **Área provável:** PhishLab.
- **Mecânica:** diagrama interativo mostra navegador, resolvedor, resposta e destino, destacando quais etapas o funcionário não controla.
- **Fluxo:** endereço digitado → resolução → possível desvio → sinais disponíveis → limite técnico.
- **O que seria avaliado:** reação a alerta observável; o mecanismo não é teste.
- **Alternativa acessível:** lista causal numerada.

### Formato B — Rota correta, alerta inesperado

- **Área provável:** Missão.
- **Mecânica:** endereço conhecido resulta em aviso ou página incoerente; a pessoa interrompe e usa suporte oficial.
- **Fluxo:** rota própria → anomalia → decisão → reporte → debrief sobre causas possíveis.
- **O que seria avaliado:** não contornar e não afirmar diagnóstico sem evidência.
- **Alternativa acessível:** aviso textual e ações por botão.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Rota correta, alerta inesperado.
- A futura análise não deve tentar simular DNS real.
- O debrief precisa incluir causas benignas e controles técnicos.

### Fontes

- [NIST Glossary — Pharming](https://csrc.nist.gov/glossary/term/pharming)
- [NIST SP 800-81 Rev. 3 — Secure Domain Name System Deployment Guide](https://csrc.nist.gov/pubs/sp/800/81/r3/final)

## `concept:browser-warning` — Avisos do navegador e certificado

### Ensinamento e papel

- **Comportamento observável:** não ultrapassar aviso para cumprir instrução recebida; voltar, usar rota conhecida e buscar validação oficial quando houver necessidade legítima.
- **Potencial pedagógico:** Alto como caso.
- **Papel recomendado:** Caso complementar de página.
- **Por que não basta uma explicação textual:** a pessoa precisa praticar a exceção correta sem aprender que todo aviso significa ataque confirmado.

### Dificuldades e riscos

- Certificado expirado, proxy corporativo ou sistema interno mal configurado podem gerar falso positivo.
- Navegadores apresentam avisos e opções diferentes.
- A exceção legítima deve seguir processo oficial, não instrução da própria mensagem.
- O exercício não pode abrir site inseguro nem copiar intersticial real de forma enganosa.

### Formato A — Intersticial seguro

- **Área provável:** Missão.
- **Mecânica:** aviso inerte oferece voltar, reportar e abrir rota conhecida; “prosseguir” permanece apenas como opção avaliada, sem efeito.
- **Fluxo:** aviso → contexto → ação → validação oficial → debrief.
- **O que seria avaliado:** não contornar e usar o processo adequado.
- **Alternativa acessível:** região textual com foco previsível e controles nativos.

### Formato B — Exceção corporativa

- **Área provável:** Simulação.
- **Mecânica:** sistema legítimo apresenta erro; a pessoa precisa solicitar validação oficial em vez de seguir instrução recebida.
- **Fluxo:** tarefa → aviso → chamado oficial → confirmação ou bloqueio → resultado.
- **O que seria avaliado:** tratamento de inconclusivo e ausência de exceção improvisada.
- **Alternativa acessível:** etapas em lista.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Exceção corporativa.
- A futura análise deve usar texto genérico e não ensinar caminho de bypass.
- Incluir falso positivo legítimo para calibrar a resposta.

### Fontes

- [Google Chrome Help — Manage warnings about unsafe sites](https://support.google.com/chrome/answer/99020)
- [Google Chrome Help — Check if a site's connection is secure](https://support.google.com/chrome/answer/95617)

## `concept:password-manager-clue` — Ausência de preenchimento automático

### Ensinamento e papel

- **Comportamento observável:** usar ausência de preenchimento como motivo para pausar e conferir origem, nunca como prova isolada.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e caso de calibração.
- **Por que não basta uma explicação textual:** cenários com configurações diferentes mostram por que o indício é útil, mas falível.

### Dificuldades e riscos

- Conta não salva, dispositivo novo, recurso desativado ou formulário incompatível também impedem preenchimento.
- Preenchimento disponível não autentica pedido ou finalidade.
- Gerenciadores e regras de correspondência variam.
- A atividade não acessa credenciais ou extensão real.

### Formato A — Dois logins

- **Área provável:** PhishLab.
- **Mecânica:** representar que o gerenciador oferece credencial apenas numa origem salva e combinar a pista com domínio e rota.
- **Fluxo:** página A → estado do gerenciador → página B → decisão → debrief.
- **O que seria avaliado:** pausa e verificação do domínio, não presença do autofill.
- **Alternativa acessível:** mensagens textuais “oferecido/não oferecido”.

### Formato B — Calibração de evidência

- **Área provável:** Simulação curta.
- **Mecânica:** quatro casos explicam causas legítimas e suspeitas de ausência após a decisão.
- **Fluxo:** casos → ação → causas → rota segura comum.
- **O que seria avaliado:** tratamento como indício e não como veredito.
- **Alternativa acessível:** lista textual e rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Calibração de evidência.
- Deve permanecer complemento de domínio e página, não atividade própria.
- A análise futura precisa evitar integração com gerenciadores reais.

### Fontes

- [Google Chrome Help — How Chrome protects autofill and password data](https://support.google.com/chrome/answer/14271924)
- [NIST SP 800-63B — Password managers](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)

## `concept:malicious-unsubscribe` — “Cancelar inscrição” malicioso

### Ensinamento e papel

- **Comportamento observável:** em mensagem claramente suspeita, usar reporte ou spam; em serviço conhecido, preferir preferências da conta aberta independentemente quando houver dúvida.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de triagem e transferência para links.
- **Por que não basta uma explicação textual:** newsletters legítimas exigem cancelamento; o exercício precisa usar histórico e confiança para evitar “nunca clique”.

### Dificuldades e riscos

- Links de cancelamento são obrigação e prática legítima em muitos contextos.
- Interagir pode confirmar conta ativa ou levar a destino malicioso em mensagem suspeita.
- Reportar newsletter legítima como phishing é falso positivo.
- O portal não altera inscrição real.

### Formato A — Caixa de entrada

- **Área provável:** Simulação.
- **Mecânica:** escolher entre cancelar, ajustar preferências na conta, reportar ou arquivar para mensagens distintas.
- **Fluxo:** lote → histórico/contexto → ação por item → debrief final.
- **O que seria avaliado:** resposta proporcional e falsos positivos.
- **Alternativa acessível:** lista de mensagens e ações por rádio.

### Formato B — Rota de preferências

- **Área provável:** Missão.
- **Mecânica:** abrir conta conhecida independentemente e remover assinatura numa representação de preferências, preservando mensagem suspeita.
- **Fluxo:** e-mail → decisão de não usar link → conta oficial → preferências → reporte se cabível.
- **O que seria avaliado:** origem de navegação e distinção entre remetente conhecido e suspeito.
- **Alternativa acessível:** árvore de navegação por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Caixa de entrada.
- A futura análise deve definir histórico de consentimento suficiente em cada caso.
- Não usar regra absoluta contra links de cancelamento.

### Fontes

- [CISA — Secure Our World: Phishing Tip Sheet](https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Phishing-Tip-Sheet.pdf)
- [FTC — How to get less spam in your email](https://consumer.ftc.gov/articles/how-get-less-spam-your-email)

## `concept:tracking-pixel` — Pixel ou beacon invisível

### Ensinamento e papel

- **Comportamento observável:** compreender que conteúdo externo pode sinalizar abertura e seguir a configuração e política do cliente de e-mail, sem tentar “achar” o pixel.
- **Potencial pedagógico:** Controle técnico predominante.
- **Papel recomendado:** Explicação interativa de limite e controle técnico.
- **Por que não basta uma explicação textual:** uma demonstração de carregamento ajuda a entender o mecanismo, mas a detecção visual é impossível e não deve ser avaliada.

### Dificuldades e riscos

- Pixels são invisíveis e podem ser carregados por proxy ou cache.
- Imagens externas têm usos legítimos.
- Clientes e configurações de privacidade variam.
- Não se deve pedir que o funcionário inspecione HTML ou cabeçalho de rede.

### Formato A — Laboratório de carregamento

- **Área provável:** PhishLab.
- **Mecânica:** alternar de forma simulada “carregar conteúdo externo” e observar quais metadados hipotéticos poderiam ser expostos.
- **Fluxo:** mensagem → configuração representada → efeitos explicados → limites por cliente.
- **O que seria avaliado:** compreensão da política; não localização do pixel.
- **Alternativa acessível:** tabela estado–efeito, sem animação.

### Formato B — Painel de responsabilidade

- **Área provável:** Simulação curta.
- **Mecânica:** relacionar cliente de e-mail, proxy, administração e funcionário aos controles possíveis.
- **Fluxo:** cenário → responsabilidades → política → debrief.
- **O que seria avaliado:** aplicação da política e reporte de mensagem suspeita, nunca detecção do beacon.
- **Alternativa acessível:** tabela de responsabilidades.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Laboratório de carregamento como explicação não pontuada.
- O conceito não justifica atividade própria de detecção.
- A análise futura deve decidir se a organização expõe ao funcionário alguma escolha sobre imagens externas.

### Fontes

- [Gmail Help — Images in Gmail and sender tracking](https://support.google.com/mail/answer/145919)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
