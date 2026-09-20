# Domínio sob a lupa

> **Estado do blueprint:** aprovado, convertido e implementado como versão 2 em 2026-08-15.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** versão 2 disponível; versão 1 preservada como histórico legível.
>
> **Efeito técnico:** contrato `url-anatomy`, três pacotes publicados e migração local 6→7; a ficha canônica registra o estado executável.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | PhishLab |
| Comportamento principal aprovado | Identificar o domínio registrado antes de decidir se um endereço pertence ao serviço alegado. |
| Mecânica-base aprovada | Bancada de anatomia de URL com separação semântica e tabela textual equivalente. |
| Estado da atividade atual | Disponível na versão 2 como Domínio sob a lupa; v1 histórica. |
| Relação com implementação existente | Evolução implementada; resultados da versão 1 permanecem legíveis e não são reinterpretados. |
| `activityId`, versão e rota | `phishlab:link-analyzer`, versão `2`, `/phishlab/analisador-de-links`. |
| Duração-alvo | 8 a 10 minutos. |
| Regra de recompensa considerada | 60 pontos-base e bônus transversal na primeira conclusão lógica; v2 não reabre recompensa v1. |
| Conceitos proprietários | 4, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos de primeira versão;
- gramática visual e textual para protocolo, subdomínio, domínio registrado, caminho e parâmetros;
- avaliação, feedback, contrato, estados e controles críticos;
- uso exclusivo de endereços fictícios e inertes.

### 1.2 Decisões técnicas materializadas e limites restantes

- a versão sucessora é `2` e usa três pacotes alternativos;
- a demonstração trabalha somente com `.example`, sem biblioteca ou consulta externa de sufixos;
- a recompensa mantém a chave lógica anterior;
- o esquema local migrou de 6 para 7 sem materializar dados novos;
- uma tabela de sufixos públicos para conteúdo futuro continua fora desta versão.

## 2. Contrato educacional

- **Comportamento observável:** decompor o endereço, apontar o domínio registrado, interpretar subdomínio, caminho e parâmetros e escolher uma rota própria quando houver dúvida.
- **Técnicas ou objetivos do atacante:** colocar marca ou serviço conhecido à esquerda do domínio real ou repeti-lo depois dele no caminho.
- **Atalho inseguro enfrentado:** procurar uma palavra conhecida em qualquer parte da URL ou tratar HTTPS como prova de legitimidade.
- **Resposta segura generalizável:** ler a estrutura do endereço e comparar o domínio registrado com a origem esperada.
- **O que a conclusão permite afirmar:** se a pessoa localizou e interpretou corretamente as partes exibidas nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente, reputação real, propriedade atual, ausência de comprometimento ou segurança técnica do site.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso |
|---|---|---|---|---|
| `concept:url-anatomy` | Núcleo | Primeira versão | Separar as partes relevantes sem depender de cor ou posição. | P1, P2 e P3 |
| `concept:registered-domain` | Núcleo | Primeira versão | Identificar a parte que controla a decisão de origem. | P1, P2 e P3 |
| `concept:deceptive-subdomain` | Complementar | Primeira versão | Interpretar marca conhecida usada como subdomínio enganoso. | P1 e P3 |
| `concept:path-query-branding` | Complementar | Primeira versão | Distinguir domínio de palavras de marca no caminho ou parâmetro. | P2 e P3 |

Regras aplicadas:

- os quatro conceitos aparecem exatamente uma vez e mantêm papel e momento do mapa;
- todos entram na primeira versão sem criar objetivos ou recompensas separados;
- cada percurso ativa no máximo dois Complementares formais;
- aplicações secundárias de outras atividades não alteram propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Marca à esquerda | Aviso de conta leva a endereço com a marca antes do domínio real. | Segmentar e marcar o domínio registrado. | deceptive-subdomain (1) | Mesma estrutura em endereço de compartilhamento. | Suspeito; usar rota própria. |
| P2 — Marca depois da barra | Link exibe marca no caminho e no parâmetro. | Distinguir origem de conteúdo posterior. | path-query-branding (1) | Campanha legítima com parâmetros de medição. | Suspeito no principal; legítimo no transferido. |
| P3 — Endereço longo legítimo | Portal esperado usa subdomínio, caminho e parâmetros extensos. | Sustentar legitimidade pelo conjunto, sem penalizar comprimento. | deceptive-subdomain e path-query-branding (2) | Uma troca do domínio registrado muda o veredito. | Legítimo no principal; suspeito na transferência. |

Cada percurso mantém o mesmo comportamento, usa os dois Núcleos para a mesma ação, ativa no máximo dois Complementares, inclui um resultado calibrado, é alternativo aos demais e não cria recompensa separada.

Cada pacote contém uma calibração guiada curta, que apenas ensina o segmentador, seguida da resolução independente do artefato principal descrito na seção 5 e da transferência curta. Não existem dois casos completos acumulados na mesma tentativa.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Marca à esquerda

| Elemento | Definição |
|---|---|
| Situação inicial | E-mail fictício anuncia suspensão e mostra uma URL extensa. |
| Canal e artefatos | Mensagem, endereço inerte e cartão com a origem oficial fictícia. |
| Identidade ou pretexto | Central de segurança da empresa. |
| Objetivo do atacante ou hipótese legítima | Conduzir a pessoa a uma origem não controlada pelo serviço alegado. |
| Pressões e aparências | Urgência, marca conhecida e termo “segurança” antes do domínio real. |
| Evidências disponíveis | Esquema, cadeia de subdomínios, domínio registrado, caminho e contexto não iniciado. |
| Evidência decisiva ou limite de certeza | A anatomia mostra que a origem alegada não controla o domínio; não identifica o operador. |
| Confirmação independente | Abrir a área fictícia pelo favorito ou diretório fornecido, nunca pelo endereço analisado. |
| Ação segura | Não navegar pelo link; usar a rota própria. |
| Reporte ou recuperação | Reportar o artefato fictício com origem e contexto, sem dado pessoal. |
| Transferência curta | Link de compartilhamento legítimo usa marca no subdomínio, mas domínio registrado esperado. |
| Debrief | Marca à esquerda pode ser controlada por quem controla o domínio registrado; o contexto ainda importa. |
| Conteúdo fictício necessário | Somente rótulos, nomes inventados e domínios `.example`; nenhum link clicável. |

### Percurso P2 — Marca depois da barra

| Elemento | Definição |
|---|---|
| Situação inicial | Um endereço contém nome de banco no caminho e no parâmetro de retorno. |
| Canal e artefatos | Mensagem fictícia, URL inerte, referência da origem esperada e descrição do pedido. |
| Identidade ou pretexto | Atualização cadastral atribuída a uma instituição fictícia. |
| Objetivo do atacante ou hipótese legítima | Usar palavras posteriores à barra para fazer uma origem diferente parecer oficial. |
| Pressões e aparências | Prazo curto, termos de marca e parâmetro com linguagem de autenticação. |
| Evidências disponíveis | Domínio registrado incompatível; termos convincentes aparecem apenas após a barra. |
| Evidência decisiva ou limite de certeza | Caminho e parâmetro descrevem recursos, mas não mudam quem controla o domínio. |
| Confirmação independente | Acessar o serviço fictício por rota própria. |
| Ação segura | Interromper a navegação e consultar a origem esperada. |
| Reporte ou recuperação | Reportar a mensagem e o identificador do caso, sem abrir o endereço. |
| Transferência curta | Serviço legítimo inclui parâmetros de campanha; a origem permanece esperada. |
| Debrief | Palavras de marca no caminho podem ser legítimas ou enganosas; a fronteira registrável decide a origem. |
| Conteúdo fictício necessário | Dois endereços `.example` e explicação sem jargão desnecessário. |

### Percurso P3 — Endereço longo legítimo

| Elemento | Definição |
|---|---|
| Situação inicial | Um fluxo iniciado pelo funcionário abre endereço longo do serviço esperado. |
| Canal e artefatos | Registro fictício da ação, URL inerte e referência de origem. |
| Identidade ou pretexto | Serviço corporativo fictício usado no processo habitual. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima de navegação interna prevista pelo processo. |
| Pressões e aparências | Endereço longo, vários segmentos e aparência técnica que pode intimidar. |
| Evidências disponíveis | Contexto iniciado, domínio registrado esperado, subdomínio funcional e parâmetros compatíveis. |
| Evidência decisiva ou limite de certeza | Comprimento, cadeado e complexidade não bastam; o conjunto sustenta a decisão somente para a tarefa iniciada. |
| Confirmação independente | Conferir o registro na área fictícia aberta por rota própria. |
| Ação segura | Prosseguir apenas com a finalidade iniciada. |
| Reporte ou recuperação | Não reportar automaticamente; registrar dúvida se a origem ou a finalidade mudar. |
| Transferência curta | Troca de uma única fronteira registrável exige parar e verificar. |
| Debrief | Endereço longo não é sinônimo de fraude; a análise deve controlar falsos positivos. |
| Conteúdo fictício necessário | Variante legítima e variante enganosa em `.example`, com diferença anunciável em texto. |

Nenhum artefato executa ação real. Endereços usam `.example`, dados mascarados e nomes fictícios revisáveis.

## 6. Mecânica e diferenciação

- **Interação central:** selecionar um endereço inerte, percorrer suas partes e atribuir a cada trecho um papel; depois marcar o domínio registrado e explicar a consequência por opções estruturadas.
- **Por que combina com o comportamento:** a faixa monoespaçada sincronizada com a tabela obriga a localizar a fronteira antes do veredito.
- **Como se distingue das outras 21 atividades:** é a única que avalia anatomia estrutural de uma URL isolada, sem rastrear cadeia ou comparar grafia com uma referência.
- **O que é reutilizável:** shell, stepper, revisão, resultado e catálogo versionado de PhishLab.
- **O que exige componente novo:** segmentador semântico, realce sincronizado e avaliador de fronteira registrável.
- **Alternativa sem arrastar, mídia ou representação espacial:** tabela ordenada de trechos, papel e valor com botões e seletores operáveis por teclado.
- **Risco de virar questionário disfarçado e prevenção:** a conclusão sem segmentação e identificação do domínio registrado não concede nota integral.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Caso atribuído, papel do funcionário, situação, tarefa, consequência protegida, duração e ausência de cronômetro. | Iniciar ou voltar. | Ação explícita; não há seletor visível de P1/P2/P3. | Pacote atribuído internamente. | Sem revelar resposta. | Foco no `h1`. |
| Investigação | Microexemplo de calibração e, depois, URL principal sem marcações sugeridas. | Concluir a calibração curta e segmentar independentemente o artefato principal. | Calibração vista e núcleos do caso principal respondidos. | Segmentos principais, consultas e ajuda. | Explica função no microexemplo, não o veredito principal. | Tabela linear. |
| Decisão inicial | Estrutura montada. | Marcar domínio registrado, conclusão provisória e rota. | Campos obrigatórios completos. | Decisão provisória. | Mostra lacunas revisáveis. | `fieldset` e lista textual. |
| Consequência | Efeito cenográfico da rota escolhida. | Observar o que a decisão autorizaria ou evitaria. | Consequência lida. | Estado simulado. | Não executa navegação. | Texto equivalente. |
| Revisão | URL principal, decisão provisória e rota. | Reexaminar segmentos e editar qualquer resposta. | Caso principal completo e editável. | Resposta principal e revisões. | Sem acerto antecipado. | Tabela e links de foco. |
| Decisão final | Segmentos, conclusões e rotas. | Confirmar ou voltar à revisão. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | Mudança mínima de contexto. | Identificar se altera a origem. | Uma decisão e uma rota. | Resposta curta. | Somente após envio. | Comparação textual. |
| Resultado | Nota, critérios, competências, recompensa potencial e comparação entre resposta dada e esperada. | Consultar desempenho privado. | Tentativa aceita. | Resultado derivado. | Cada item declara textualmente Acertou ou Precisa revisar. | Texto completo sem depender de cor. |
| Debrief | Decomposição canônica e limites de HTTPS. | Comparar o processo e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Consolida a leitura da fronteira registrável. | Conteúdo textual estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Iniciar ou voltar. | Nenhuma. | Foco no h1. |
| Em andamento | Resposta parcial. | Analisar e revisar. | Rascunho opcional. | Progresso anunciado. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Sem gabarito. | Resumo da etapa. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Atalhos por seção. |
| Concluída | Tentativa aceita. | Ver resultado. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Conclusão anterior. | Refazer o mesmo caso ou praticar com o próximo caso atribuído. | Novo attemptId; sem duplicar recompensa. | Regra explicitada. |
| Conteúdo indisponível | Pacote não publicado. | Voltar ao hub. | Nada. | Mensagem explícita. |
| Resposta inválida | Segmento ou opção incompatível. | Corrigir. | Não conclui. | Alerta e foco. |
| Falha ao salvar | Operação falhou. | Tentar novamente. | Preserva rascunho. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica mantém a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores abaixo especializam esses eixos para anatomia de URL.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidências e anatomia | 30 | Classifica trechos relevantes e usa contexto. | Um erro não crítico. | Decide por palavra, cor ou comprimento. | Observar, Investigar |
| Domínio e conclusão | 25 | Marca domínio registrado e conclusão proporcional. | Acerta origem com justificativa incompleta. | Marca subdomínio/caminho como origem. | Investigar |
| Ferramentas e rota própria | 20 | Usa referência quando útil e escolhe canal independente. | Ferramenta adequada, interpretação parcial. | Clica no endereço analisado para confirmar. | Verificar |
| Caso independente e transferência | 25 | Repete o raciocínio em estrutura nova. | Precisa de ajuda sem falha crítica. | Não transfere ou escolhe ação insegura. | Investigar, Verificar |

Regras obrigatórias:

- os pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho permanecem separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinal isolado não recebe valor automático de veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- o caso legítimo não premia obediência automática a processo incompleto.

### 9.1 Controles críticos

- não tratar subdomínio, caminho ou parâmetro como domínio registrado;
- não usar presença de HTTPS como prova de legitimidade;
- não abrir o endereço analisado para “testar”;
- não transformar endereço longo ou incomum em suspeita automática.

### 9.2 Resultado privado

O resultado privado mostra nota, quatro critérios, decomposição correta em texto, fronteira do domínio, evidências usadas, decisão, rota segura, competências, recomendação e recompensa potencial. Nunca expõe resposta individual no agregado de equipe.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos-base de PhishLab, sujeita à aprovação da versão executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** a versão 1 nunca é reinterpretada nem recompensada novamente sem decisão explícita.
- **Integrações atuais:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação seguinte; Para onde esse link realmente vai? continua planejada.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta implementado

O desenho semântico foi materializado em `DomainAnalyzerV2Submission`, com `mechanicId: "url-anatomy"`; os nomes de campo abaixo correspondem ao contrato executável ou ao seu conteúdo aninhado.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor no uso real | idempotente |
| activityId | phishlab:link-analyzer | Sim | catálogo | rejeitar divergência |
| activityVersion | versão publicada | Sim | catálogo | versão compatível |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | não mede velocidade |
| caseResponses | resposta do artefato principal e da transferência | Sim | interação | calibração não é um segundo caso pontuado |
| segmentAssignments | trechoId e papelId | Sim | bancada | cobertura exata, sem extras |
| registeredDomainSegmentId | trechoId | Sim | decisão | deve ser registrável no pacote |
| verdictId | legitimate, suspicious ou inconclusive | Sim | decisão | allowlist do caso |
| safeRouteId | ID allowlisted | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- endereço, trechos e resposta pertencem ao pacote publicado;
- o cliente não informa gabarito, nota ou recompensa;
- listas extras, duplicadas ou fora de ordem são rejeitadas;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- versão 1 não aceita a nova forma;
- conteúdo e avaliador possuem versão compatível;
- resultado e competências são derivados de resposta bruta.

### 11.2 Instrumentação mínima

Eventos permitidos: case_started, segment_selected, segment_classified, reference_opened, help_opened, answer_revised, submission_requested e submission_result. Guardam somente IDs allowlisted, versão, etapa e sequência. Não guardam URL livre nem participam diretamente da nota.

## 12. Persistência, compatibilidade e backend

### Demonstração local

A mecânica não cabe integralmente na submissão genérica atual. Exige variante discriminada, revisão de `APP_SCHEMA_VERSION` e migração explícita se houver rascunho. Persiste somente retomada, resposta bruta, resultado derivado e progresso, sempre com `isAuthoritative: false`.

### Backend obrigatório

Antes do uso real, o servidor:

- controla identidade, autorização e público elegível;
- publica e fixa versão e pacote de caso;
- valida segmentos, opções e etapas por allowlist;
- deriva avaliação, `needsReview`, competências e feedback;
- concede recompensa, evidência e contribuição na mesma transação idempotente;
- mantém auditoria sem URL livre ou resposta sensível;
- aplica retenção e exclusão conforme política;
- rejeita replay, versão desconhecida e pacote incompatível.

A biblioteca de sufixos é fixa e versionada; não há consulta DNS, reputação ou navegação.

### Compatibilidade

- ID e rota existentes são preservados;
- tentativas da versão 1 continuam legíveis e imutáveis;
- a sucessora usa versão nova e contrato próprio;
- migração não inventa segmentação nem recompensa;
- estado inválido vai para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados por critério |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado de concessão |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas agregadas sem resposta individual |

URLs são texto inerte em `.example`, sem âncora, DNS, preview remoto, fetch ou redirecionamento. Não há credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte ou endereço real. O player nunca afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, ordem, endereço e papéis são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- a operação é integral por teclado;
- ordenação oferece botões Mover, Subir e Descer e anuncia posição;
- tabela e seletores são equivalentes à faixa visual; cor e espaçamento são redundantes;
- qualquer ilustração ou mídia tem texto equivalente, e o endereço completo permanece disponível em texto;
- feedback usa região de status e erro usa alerta com foco, sem apagar URL, respostas ou contexto;
- alto contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem pontuação por rapidez;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo curricular | URLs tokenizadas e referência registrável | P0: pacote versionado |
| Interface | Shell e revisão | Bancada e tabela sincronizadas | P1: componente acessível |
| Contrato e avaliador | Envelope e pesos comuns | Submissão discriminada, validação de segmentos e fronteira | Nova `activityVersion` |
| Estado e provider | Provider assíncrono | Operação própria da mecânica | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso comuns | Migração de rascunho, se aprovada | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Perfil, atividade recente e currículo | Cadastro genérico da rota e versão | Não ampliar o roteador central |
| Testes | Contratos existentes | Teclado, quebra de URL e fuzz de IDs | Harness de navegador |

**Esforço relativo:** M. **Camadas:** P0 e P1; novos pacotes em P2.

## 16. Testes e critérios de aceite

### Automatizados

- IDs, versão, pacote, trechos, papéis e opções por allowlist;
- quatro pesos somando 100 e nota limitada;
- casos integral, parcial, legítimo, suspeito e inconclusivo;
- controles críticos, needsReview e ajuda sem penalidade automática;
- Unicode e pontuação exibidos sem alterar token canônico;
- replay, repetição e recompensa idempotente;
- compatibilidade v1, migração e quarentena;
- nenhuma navegação, resolução DNS ou fetch;
- integração com perfil e atividade recente;
- teclado, foco e tabela equivalente.

### Manuais no desktop

- concluir P1, P2 e P3;
- revisar resposta antes do envio;
- testar leitor de tela, zoom, alto contraste e movimento reduzido;
- confirmar que linha longa não esconde o domínio;
- repetir sem nova recompensa;
- verificar console sem erros.

## 17. Banco de casos, versões futuras e debriefs

Todos os conceitos proprietários já têm momento de primeira versão. O banco posterior pode variar idioma, número de subdomínios, parâmetros legítimos e ordens visuais, sem introduzir conceito novo nem depender de técnica invisível.

O debrief reforça que HTTPS protege transporte, não comprova intenção, conteúdo ou identidade; isso é suporte ao comportamento, não novo conceito proprietário nem pegadinha pontuada.

## 18. Gates para expansão e uso real

Os percursos, casos, pesos e controles deste blueprint foram aprovados e a versão 2 foi publicada localmente em 2026-08-15. Os itens abaixo permanecem como validações editoriais, especializadas ou de infraestrutura para expansões e para o uso real; não reabrem o desenho pedagógico aprovado.

- revisar novos pacotes antes de incorporá-los ao banco;
- definir uma versão sucessora somente quando houver mudança semântica de contrato ou avaliação;
- confirmar biblioteca e estratégia de sufixos totalmente offline;
- validar textos e casos com Segurança, Educação e Acessibilidade;
- substituir a autoridade local demonstrativa por backend autoritativo antes do uso real.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos e bancada de anatomia com avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado | Preparou a versão 2 |
| 2026-08-15 | Versão 2 publicada localmente com três pacotes, anatomia completa e compatibilidade histórica | Implementada e validada localmente | Contrato `url-anatomy`, migração e player próprios |
| 2026-08-15 | Caso passou a ser atribuído automaticamente e a abertura ganhou contexto explícito; resultado compara resposta dada e esperada | Implementada e validada localmente | Apenas apresentação e encadeamento; sem nova versão ou contrato |
