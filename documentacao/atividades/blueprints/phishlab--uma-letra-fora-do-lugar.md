# Uma letra fora do lugar

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** planejada; não há ID público, versão executável ou rota disponível definidos.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | PhishLab |
| Comportamento principal aprovado | Comparar um identificador textual com uma referência confiável e agir pela origem confirmada, não pela semelhança visual. |
| Mecânica-base aprovada | Lente comparativa de caracteres com painel textual equivalente. |
| Estado da atividade atual | Planejada; nenhuma atividade executável correspondente. |
| Relação com implementação existente | Atividade nova; não substitui nem migra uma tentativa atual. |
| `activityId`, versão e rota | Não definidos; este blueprint não cria nenhum deles. |
| Duração-alvo | 7 a 9 minutos. |
| Regra de recompensa considerada | Regra de PhishLab: 60 pontos-base e bônus transversal, somente após implementação aprovada; não ativada pelo blueprint. |
| Conceitos proprietários | 4, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos iniciais centrados em comparação, contexto e rota própria;
- uma lente que torna toda diferença pontuada visível e textual;
- fronteiras entre typosquatting básico, banco de variações e homógrafos;
- estados, avaliação, contrato e critérios de segurança.

### 1.2 O que permanece sem decisão técnica

- ID, rota, versão e ordem curricular;
- pares finais de nomes fictícios;
- política editorial para idiomas, fontes e caracteres Unicode;
- ativação de pontos e persistência de rascunho.

## 2. Contrato educacional

- **Comportamento observável:** obter a referência por uma fonte fornecida, alinhar os dois identificadores, localizar diferenças e decidir se deve interromper, verificar ou prosseguir.
- **Técnicas ou objetivos do atacante:** registrar nome visualmente próximo ao esperado para induzir reconhecimento superficial.
- **Atalho inseguro enfrentado:** reconhecer a “forma geral” da palavra ou confiar porque só uma letra parece diferente.
- **Resposta segura generalizável:** comparar caractere por caractere e usar favorito, diretório ou endereço conhecido quando a identidade importar.
- **O que a conclusão permite afirmar:** se a pessoa aplicou um processo de comparação nesta tentativa fictícia.
- **O que não permite afirmar:** retenção, domínio permanente, intenção, titular real do domínio ou detecção de diferença invisível.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso | Destino |
|---|---|---|---|---|
| `concept:typosquatting` | Núcleo | Primeira versão | Reconhecer semelhança deliberada e confirmar pela referência. | P1, P2 e P3 |
| `concept:typo-variants` | Variação de caso | Banco de casos | Ampliar o banco com omissão, duplicação, transposição, substituição e hífen. | Banco B1 |
| `concept:combosquatting` | Variação de caso | Banco de casos | Combinar marca e termo convincente em novo domínio. | Banco B2 |
| `concept:homograph-idn` | Transferência | Banco de casos | Transferir a comparação para caracteres visualmente semelhantes e representação IDN. | Banco B3 |

Somente o núcleo typosquatting é formalmente ativo na primeira versão. A lente já é acessível a Unicode, mas homógrafos não são cobrados antes de entrarem no banco aprovado.

Regras aplicadas:

- cada conceito aparece exatamente uma vez com papel e momento aprovados;
- conceitos de banco não são obrigatórios na primeira versão;
- transferência de banco e variações não geram objetivo ou recompensa próprios;
- aplicações secundárias não alteram a propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Referência conhecida | Aviso de conta contém identificador quase igual ao favorito fictício. | Buscar a referência e alinhar os nomes. | Nenhum (0) | Mesma diferença em remetente textual. | Suspeito; usar rota própria. |
| P2 — Nome parecido, serviço diferente | Parceiro legítimo tem nome semelhante, mas finalidade e referência próprias. | Evitar falso positivo e confirmar pelo diretório. | Nenhum (0) | O contexto some e a decisão vira inconclusiva. | Legítimo no principal; verificar na transferência. |
| P3 — Comparação independente | Mensagem nova traz identificador próximo sem referência na própria mensagem. | Consultar a fonte independente e marcar a diferença. | Nenhum (0) | A mesma técnica aparece em nome de aplicativo. | Suspeito ou inconclusivo conforme o pacote. |

Os percursos são alternativos, usam uma única habilidade e não antecipam os conceitos de banco.

Cada pacote inclui uma calibração guiada curta da lente, não pontuada como caso completo, a resolução independente do artefato principal descrito na seção 5 e uma transferência curta. Os três percursos não são acumulados.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Referência conhecida

| Elemento | Definição |
|---|---|
| Situação inicial | Um aviso urgente direciona para nome que difere em um caractere ASCII. |
| Canal e artefatos | Mensagem fictícia, candidato inerte e favorito fictício. |
| Identidade ou pretexto | Serviço de conta conhecido representado por nome quase idêntico. |
| Objetivo do atacante ou hipótese legítima | Induzir acesso a um identificador controlado por terceiro. |
| Pressões e aparências | Urgência, marca familiar e diferença pequena. |
| Evidências disponíveis | Diferença textual, origem independente do favorito e pedido não iniciado. |
| Evidência decisiva ou limite de certeza | A diferença justifica não usar o candidato; não identifica quem o registrou. |
| Confirmação independente | Abrir a referência cenográfica pelo favorito fornecido. |
| Ação segura | Interromper e usar a rota própria. |
| Reporte ou recuperação | Reportar candidato e contexto fictícios sem abrir o endereço. |
| Transferência curta | A diferença reaparece no campo de remetente. |
| Debrief | O processo é comparar com referência, não memorizar uma família de erro. |
| Conteúdo fictício necessário | Nomes inventados e domínios `.example`. |

### Percurso P2 — Nome parecido, serviço diferente

| Elemento | Definição |
|---|---|
| Situação inicial | Um fornecedor fictício legítimo possui nome semelhante ao portal interno. |
| Canal e artefatos | Mensagem, diretório, pedido anterior e dois identificadores. |
| Identidade ou pretexto | Parceiro cadastrado com nome próprio semelhante. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima sustentada por cadastro e finalidade anteriores. |
| Pressões e aparências | Semelhança visual que pode provocar falso positivo. |
| Evidências disponíveis | Cadastro anterior, finalidade compatível e origem independente. |
| Evidência decisiva ou limite de certeza | Semelhança não prova fraude nem legitimidade; o cadastro confirma somente o parceiro daquele processo. |
| Confirmação independente | Consultar o diretório fictício. |
| Ação segura | Prosseguir somente pela entrada cadastrada. |
| Reporte ou recuperação | Não reportar automaticamente; verificar se o contexto cadastrado faltar. |
| Transferência curta | Sem o cadastro anterior, manter inconclusivo e verificar. |
| Debrief | Controlar falsos positivos faz parte da comparação responsável. |
| Conteúdo fictício necessário | Par legítimo em `.example` e diretório cenográfico. |

### Percurso P3 — Comparação independente

| Elemento | Definição |
|---|---|
| Situação inicial | Convite de colaboração usa nome próximo ao de um serviço conhecido. |
| Canal e artefatos | Convite, catálogo fictício e lente sem marcações iniciais. |
| Identidade ou pretexto | Plataforma de colaboração conhecida. |
| Objetivo do atacante ou hipótese legítima | Levar a pessoa a aceitar convite em origem parecida; ausência de contexto mantém alternativa legítima não confirmada. |
| Pressões e aparências | Convite de colega, conveniência e nome familiar. |
| Evidências disponíveis | Comparação com catálogo, ausência de contexto e finalidade do convite. |
| Evidência decisiva ou limite de certeza | A diferença e o contexto orientam a rota; a pessoa não precisa nomear a família técnica. |
| Confirmação independente | Acessar catálogo ou serviço por rota própria. |
| Ação segura | Não abrir o convite; verificar e reportar se incompatível. |
| Reporte ou recuperação | Reporte fictício somente quando a comparação e o processo sustentarem suspeita. |
| Transferência curta | Nome de aplicativo quase igual solicita acesso. |
| Debrief | A lente torna a diferença observável; nenhuma fonte ou caractere invisível vira prova. |
| Conteúdo fictício necessário | Novo par simples em `.example`, sem diferença invisível. |

Nenhum artefato executa ação real. Usar `.example`, dados mascarados e nomes fictícios revisáveis.

## 6. Mecânica e diferenciação

- **Interação central:** escolher a referência, alinhar referência e candidato e marcar posições iguais, diferentes ou ausentes; depois formular uma conclusão estruturada.
- **Por que combina com o comportamento:** duas linhas sincronizadas, índice de posição e leitura textual obrigam comparação com referência antes da conclusão.
- **Como se distingue das outras 21 atividades:** compara ortografia entre dois identificadores; não disseca URL, rastreia redirecionamento ou avalia aparência de página.
- **O que é reutilizável:** shell, stepper, revisão, resultado e catálogo versionado.
- **O que exige componente novo:** alinhador de grafemas versionado e painel de diferenças acessível.
- **Alternativa sem arrastar, mídia ou representação espacial:** lista por posição com valor de referência, valor candidato e estado, totalmente operável por teclado.
- **Risco de virar questionário disfarçado e prevenção:** acertar o veredito sem produzir comparação e rota segura limita a nota; toda diferença pontuada é exposta em texto.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, conteúdo fictício e ausência de cronômetro. | Iniciar ou voltar. | Ação explícita. | Pacote. | Sem gabarito. | Foco no `h1`. |
| Investigação | Microexemplo guiado e depois par principal sem marcações. | Aprender a lente e comparar independentemente o artefato principal. | Calibração vista e posições principais respondidas. | Referência, marcas e ajuda. | Ensina o instrumento sem revelar o caso principal. | Tabela por posição. |
| Decisão inicial | Evidências marcadas. | Escolher veredito provisório e rota. | Campos completos. | Decisão provisória. | Aponta lacunas revisáveis. | `fieldset` e lista. |
| Consequência | Efeito cenográfico da rota. | Observar resultado sem navegar. | Consequência lida. | Estado simulado. | Explica risco ou falso positivo. | Texto equivalente. |
| Revisão | Comparação principal e decisão provisória. | Editar referência, marcas, conclusão ou rota. | Caso principal completo e editável. | Revisões. | Sem acerto antecipado. | Links de foco. |
| Decisão final | Resposta principal consolidada. | Confirmar ou voltar. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | Outro tipo de identificador. | Comparar e agir. | Uma resposta e rota. | Transferência. | Após envio. | Texto alinhado. |
| Resultado | Nota, critérios, competências e recompensa potencial. | Consultar resultado privado. | Tentativa aceita. | Derivados. | Mostra diferença e limite. | Texto completo. |
| Debrief | Processo esperado e destinos de banco. | Comparar e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Reforça que sinais invisíveis não são cobrados. | Texto estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Briefing e iniciar. | Nenhuma. | Foco no h1. |
| Em andamento | Comparação parcial. | Continuar ou revisar. | Rascunho opcional. | Posição e progresso anunciados. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Sem gabarito. | Resumo do caso. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Índice por caso. |
| Concluída | Tentativa aceita. | Resultado e debrief. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Já concluída. | Praticar novamente. | Novo attemptId; sem prêmio duplicado. | Regra explícita. |
| Conteúdo indisponível | Pacote ausente. | Voltar. | Nada. | Mensagem explícita. |
| Resposta inválida | Posição ou fonte incompatível. | Corrigir. | Não conclui. | Alerta focado. |
| Falha ao salvar | Persistência falhou. | Tentar novamente. | Preserva resposta. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica segue a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores especializam esses eixos para comparação textual.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidência comparativa | 30 | Usa referência independente e marca diferenças relevantes. | Omite uma diferença não crítica. | Decide só pela impressão visual. | Observar, Investigar |
| Conclusão proporcional | 25 | Distingue suspeito, legítimo e inconclusivo. | Conclusão segura com justificativa incompleta. | Confunde semelhança com prova. | Investigar |
| Uso da lente e verificação | 20 | Opera a lente e escolhe rota própria pertinente. | Usa instrumento com leitura parcial. | Abre o candidato para confirmar. | Verificar |
| Caso independente e transferência | 25 | Repete o comportamento sem dica. | Usa ajuda sem falha crítica. | Não transfere ou age de modo inseguro. | Investigar, Verificar |

Regras obrigatórias:

- pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho permanecem separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinal isolado não vale como veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- caso legítimo não premia obediência automática.

### 9.1 Controles críticos

- usar referência independente, não o texto da própria mensagem;
- não navegar pelo identificador suspeito para “ver se funciona”;
- não acusar fraude apenas por semelhança;
- não exigir percepção de caractere que a interface não expõe em texto.

### 9.2 Resultado privado

O resultado privado mostra nota, quatro critérios, referência escolhida, diferenças em linguagem simples, conclusão, rota, competências, recomendação e recompensa potencial. Não expõe resposta individual no agregado.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos de PhishLab, sujeita à aprovação executável.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição mantém melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** nenhuma tentativa é reinterpretada ou premiada novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação para Domínio sob a lupa.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código. Não há `activityId` aprovado; o campo significa o ID futuramente publicado e não autoriza criar um nome agora.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor real | idempotente |
| activityId | ID futuro publicado | Sim | catálogo | nenhum valor definido aqui |
| activityVersion | versão futura | Sim | catálogo | compatível com pacote |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | não pontua rapidez |
| mainCaseResponse | referência, marcas, veredito e rota | Sim | interação | artefato principal resolvido independentemente |
| transferResponse | resposta curta allowlisted | Sim | interação | calibração não é segundo caso |
| referenceSourceId | ID de fonte | Sim | escolha | allowlist do caso |
| comparisonMarks | posição e estado | Sim | lente | cobertura e limites canônicos |
| verdictId | legitimate, suspicious ou inconclusive | Sim | decisão | allowlist |
| safeRouteId | ID de rota fictícia | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- pares, posições e fontes pertencem ao pacote;
- normalização, alinhamento e gabarito são definidos pelo servidor;
- o cliente não envia nota, competência ou recompensa;
- nenhuma resposta exige inferir caractere não apresentado;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível.

### 11.2 Instrumentação mínima

Eventos: case_started, reference_selected, comparison_position_reviewed, difference_marked, help_opened, answer_revised, submission_requested e submission_result. Somente IDs allowlisted, sequência, versão e etapa; nenhum endereço livre. A nota deriva da resposta final.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Exige uma variante de submissão própria e análise de `APP_SCHEMA_VERSION`. Persiste apenas retomada, resposta bruta, resultado derivado e progresso. Até existir backend, `isAuthoritative` permanece falso.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização e público; publica versão e pacote; valida pares, posições, fontes, opções e etapas por allowlist; deriva avaliação, `needsReview`, competências e feedback; concede recompensa, evidência e contribuição numa transação idempotente; mantém auditoria sem identificador livre; e aplica retenção e exclusão conforme política. Não resolve domínio, navega, consulta reputação nem recebe identificadores reais.

### Compatibilidade

Não há tentativa anterior desta atividade a migrar. ID, rota e versão só podem nascer no catálogo aprovado. Estado desconhecido ou de versão incompatível é colocado em quarentena, nunca convertido por aproximação.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas sem resposta individual |

Somente nomes inventados e `.example`. Não há credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte, URL real, link, DNS, clipboard externo ou mensagem real. O player não afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, posições e caracteres são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- todos os controles operam integralmente por teclado;
- qualquer ordenação oferece Mover, Subir e Descer e anuncia posição;
- painel textual e seletores equivalem à lente visual; diferenças não dependem de fonte, cor ou acuidade;
- ilustração ou mídia futura possui texto equivalente; Unicode futuro inclui nome e pronúncia adequada;
- feedback usa região de status e erro usa alerta com foco, sem apagar comparação ou contexto;
- contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem pontos por rapidez;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e casos | Pares, referências e alinhamentos canônicos | P0 |
| Interface | Shell e resultado | Lente e tabela de grafemas | P1 |
| Contrato e avaliador | Envelope e pesos comuns | Resposta comparativa e regras por posição | Versão nova |
| Estado e provider | Provider assíncrono | Operação de alinhamento e revisão | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso | Rascunho compatível e quarentena | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Perfil e hub | Registro genérico de nova atividade | ID aprovado |
| Testes | Reducer e SSR | Unicode, teclado e zoom | Harness |

**Esforço relativo:** M. **Camadas:** P0 e P1; bancos B1–B3 em P2.

## 16. Testes e critérios de aceite

### Automatizados

- pacote, fonte, posições e opções por allowlist;
- alinhamento com adição, ausência e substituição sem índice inválido;
- nenhum caso pontuado depende de diferença invisível;
- pesos somam 100 e nota fica no intervalo;
- integral, parcial, falso positivo controlado e inseguro;
- controles críticos e needsReview;
- replay, repetição e recompensa idempotente;
- privacidade, quarentena e integração futura;
- operação por teclado e equivalência textual.

### Manuais no desktop

- concluir P1, P2 e P3;
- testar leitor de tela, zoom 200%, contraste e movimento reduzido;
- confirmar que cada diferença possui descrição textual;
- revisar e repetir sem prêmio duplicado;
- assegurar ausência de link real e erro de console.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| concept:typo-variants | Banco B1 | Taxonomia curta e casos sem ambiguidade | A primeira versão ensina o processo antes da variedade |
| concept:combosquatting | Banco B2 | Separação clara de anatomia de URL | Não misturar duas habilidades na avaliação inicial |
| concept:homograph-idn | Banco B3, transferência | Renderização, pronúncia e fallback textual validados | Nunca pode virar pegadinha visual ou depender da fonte |

O debrief pode citar que existem outras famílias, mas não as cobra nem simula detalhes técnicos não observáveis.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar pares e referências dos três percursos;
- decidir ID, rota, versão e posição curricular;
- validar a lente com leitor de tela e diferentes fontes;
- aprovar critérios de entrada dos bancos B1–B3;
- validar textos com Segurança, Educação e Acessibilidade.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, lente comparativa e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
