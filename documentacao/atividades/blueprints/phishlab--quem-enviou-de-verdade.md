# Quem enviou de verdade?

> **Estado do blueprint:** aprovado, convertido, implementado e validado na demonstração local em 2026-08-15.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** a versão 2 do investigador de identidade está disponível; a versão 1 permanece histórica.
>
> **Efeito técnico:** `identity-map` publicado com três pacotes, contrato próprio, compatibilidade v1 e esquema local 10.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | PhishLab |
| Comportamento principal aprovado | Mapear nome, conta, destino da resposta, domínio e contexto sem inferir controle humano não comprovado. |
| Mecânica-base aprovada | Mapa de relações de identidade, com tabela textual como fonte de verdade. |
| Estado da atividade atual | Disponível na versão 2 com mapa textual de identidade, três pacotes internos e transferência curta. |
| Relação com implementação existente | Substituiu o player v1; tentativas v1 permanecem imutáveis e legíveis. |
| `activityId`, versão e rota | `phishlab:true-sender`, versão `2`, `/phishlab/quem-enviou-de-verdade`; versões aceitas `[1, 2]`. |
| Duração-alvo | 8 a 10 minutos. |
| Regra de recompensa considerada | Regra atual de PhishLab: 60 pontos-base e bônus transversal na primeira conclusão válida; não é reativada por este blueprint. |
| Conceitos proprietários | 6, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos de primeira versão para a mecânica-alvo;
- gramática de relações, estados, revisão, avaliação e controles críticos;
- preservação da conclusão inconclusiva quando o controle da conta não puder ser comprovado;
- conteúdo fictício, alternativa tabular, contrato semântico e testes necessários.

### 1.2 Decisões técnicas aplicadas

- versão sucessora 2 e `mechanicId: "identity-map"`;
- primeiro pacote atribuído automaticamente e demais pacotes acessíveis somente em repetição;
- quatro parcelas 20/30/25/25, totalizando 100;
- mesma chave lógica de recompensa entre v1 e v2;
- `APP_SCHEMA_VERSION = 10` e migração v9→v10 restrita ao metadado;
- diretório, correio e identidade reais continuam deliberadamente fora da demonstração.

## 2. Contrato educacional

- **Comportamento observável:** relacionar cada campo ao que ele realmente informa, marcar o que permanece não comprovado e escolher confirmação independente proporcional.
- **Técnicas ou objetivos do atacante:** personificação por nome exibido, divergência de `Reply-To`, uso de conta verdadeira e abuso de serviço legítimo.
- **Atalho inseguro enfrentado:** tratar nome, foto, endereço conhecido ou domínio de plataforma como autorização suficiente.
- **Resposta segura generalizável:** distinguir identidade declarada, conta usada e pessoa no controle; verificar pelo canal habitual quando pedido ou processo mudar.
- **O que a conclusão permite afirmar:** como o funcionário interpretou as relações e a incerteza nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente, autoria humana ou detecção técnica de spoofing e comprometimento.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:identity-display-name` | Núcleo | Primeira versão | Separar apresentação visual de conta, domínio e controle atual. | P1, P2 e P3 |
| `concept:identity-from` | Núcleo | Primeira versão | Relacionar o `From` completo à conta que enviou, sem atribuir pessoa no controle. | P1, P2 e P3 |
| `concept:identity-reply-to` | Complementar | Primeira versão | Mostrar para onde uma resposta iria e calibrar divergências legítimas ou suspeitas. | P1, P2 e P3; um Complementar ativo |
| `concept:cloud-account-abuse` | Variação de caso | Banco de casos | Transferir o raciocínio para notificação de nuvem e biblioteca fictícia. | Banco B1 |
| `concept:identity-spoofing` | Debrief ou limite técnico | Debrief | Explicar que a tela comum não permite diagnosticar toda falsificação técnica. | Debrief D1 |
| `concept:identity-authentication-limits` | Debrief ou limite técnico | Debrief | Explicar o alcance e os limites de SPF, DKIM e DMARC sem cobrar leitura de cabeçalho. | Debrief D2 |

Regras aplicadas:

- cada conceito proprietário aparece exatamente uma vez neste inventário;
- papel e momento permanecem idênticos ao mapa aprovado;
- o conceito de banco não se torna obrigatório na primeira versão;
- conceitos de debrief não geram objetivo, nota ou recompensa próprios.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Suporte sem chamado | Pedido de código em nome do suporte. | Montar o mapa e confirmar a identidade fora da mensagem. | `identity-reply-to` (1) | Caixa compartilhada legítima com `Reply-To` operacional diferente. | Suspeito e reportar; legítimo no transferido. |
| P2 — Conta certa, processo diferente | Contato conhecido altera destino e procedimento. | Marcar controle atual como não comprovado e verificar. | `identity-reply-to` (1) | Mesmo padrão em chat corporativo com conta conhecida. | Inconclusivo e verificar. |
| P3 — Mensagem legítima incomum | Comunicação real chega por endereço e resposta esperados, mas fora do horário usual. | Sustentar uma conclusão legítima com contexto, sem usar um campo isolado. | `identity-reply-to` (1) | Pedido semelhante com contexto ausente. | Legítimo no caso principal; inconclusivo na transferência. |

Os três percursos:

- mantêm o mesmo comportamento principal;
- usam os dois Núcleos para explicar uma única ação observável;
- ativam somente um Complementar formal;
- incluem desfechos suspeito, legítimo e inconclusivo;
- são alternativas editoriais, nunca etapas acumuladas de uma tentativa;
- não criam recompensa separada.

Cada pacote de percurso contém uma calibração guiada curta, não pontuada como caso completo, seguida da resolução independente do artefato principal descrito na seção 5 e de uma transferência curta. Portanto, a tentativa não acumula dois casos completos.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Suporte sem chamado

| Elemento | Definição |
|---|---|
| Situação inicial | Uma mensagem solicita um código temporário para evitar bloqueio. |
| Canal e artefatos | E-mail fictício, cartão de identidade e diretório cenográfico. |
| Identidade ou pretexto | Nome e cargo conhecidos; conta e `Reply-To` externos. |
| Objetivo do atacante ou hipótese legítima | Obter um segredo usando autoridade técnica. |
| Pressões e aparências | Urgência, foto, assinatura e linguagem profissional. |
| Evidências disponíveis | Nome exibido, `From`, `Reply-To`, domínio, inexistência de chamado e natureza do pedido. |
| Evidência decisiva ou limite de certeza | Pedido de segredo e ausência de processo sustentam interrupção; os campos não identificam a pessoa no controle. |
| Confirmação independente | Abrir o suporte pelo diretório fictício, sem responder à mensagem. |
| Ação segura | Não compartilhar o código, encerrar a interação, verificar e reportar. |
| Reporte ou recuperação | Relato fictício sem código, senha ou dado real. |
| Transferência curta | Caixa compartilhada legítima usa `Reply-To` diferente por processo documentado. |
| Debrief | Divergência é evidência contextual, não veredito automático. |
| Conteúdo fictício necessário | Perfis, domínios `.example`, chamado ausente e referência de suporte. |

### Percurso P2 — Conta certa, processo diferente

| Elemento | Definição |
|---|---|
| Situação inicial | Uma conversa antiga recebe pedido de autenticação em novo portal. |
| Canal e artefatos | E-mail em thread, histórico curto e referência de processo. |
| Identidade ou pretexto | Nome, `From` e `Reply-To` pertencem ao contato esperado. |
| Objetivo do atacante ou hipótese legítima | Possível conta comprometida; também existe hipótese de mudança legítima não confirmada. |
| Pressões e aparências | Continuidade da conversa, conhecimento do pedido e prazo. |
| Evidências disponíveis | Campos coerentes, alteração de destino e ausência de aviso por canal independente. |
| Evidência decisiva ou limite de certeza | Cabeçalhos confirmam a conta usada, não a pessoa no controle nem a autorização do novo processo. |
| Confirmação independente | Contato previamente conhecido ou sistema oficial, fora da thread. |
| Ação segura | Interromper e verificar; não classificar automaticamente como fraude. |
| Reporte ou recuperação | Reportar possível comprometimento somente após a verificação ou conforme o procedimento. |
| Transferência curta | Conta conhecida repete a mudança em chat corporativo; a mesma confirmação continua necessária. |
| Debrief | “Inconclusivo: preciso verificar” é a conclusão correta e completa. |
| Conteúdo fictício necessário | Thread, contato conhecido e processo anterior versionados. |

### Percurso P3 — Mensagem legítima incomum

| Elemento | Definição |
|---|---|
| Situação inicial | Um serviço esperado envia confirmação fora do horário usual. |
| Canal e artefatos | E-mail e registro fictício da atividade iniciada pelo funcionário. |
| Identidade ou pretexto | Nome, conta, domínio e destino de resposta coerentes. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima sustentada pelo contexto iniciado pelo próprio funcionário. |
| Pressões e aparências | Aparência profissional sem pedido de segredo ou mudança de processo. |
| Evidências disponíveis | Registro anterior, finalidade, conta e rota esperadas. |
| Evidência decisiva ou limite de certeza | O conjunto é coerente; ainda assim, a mensagem não autoriza ações fora da finalidade. |
| Confirmação independente | Consultar o registro na plataforma fictícia quando desejar confirmar. |
| Ação segura | Prosseguir somente com a tarefa prevista ou consultar a rota própria. |
| Reporte ou recuperação | Não reportar automaticamente uma comunicação sustentada por contexto. |
| Transferência curta | O registro anterior desaparece; a conclusão passa a inconclusiva. |
| Debrief | Controlar falsos positivos faz parte da investigação. |
| Conteúdo fictício necessário | Registro de atividade, perfis e dois estados de contexto. |

## 6. Mecânica e diferenciação

- **Interação central:** escolher uma entidade de origem, uma entidade de destino e o tipo de relação; depois classificar afirmações somente como **Comprovado** ou **Não comprovado**. Uma explicação plausível permanece não comprovada enquanto faltar evidência direta.
- **Por que combina com o comportamento:** obriga a explicitar o que cada campo prova, em vez de apenas abrir explicações.
- **Como se distingue das outras 21 atividades:** é o único investigador centrado no mapa entre identidade declarada, conta, domínio, destino da resposta e controle desconhecido.
- **O que é reutilizável:** shell do PhishLab, catálogo versionado, escolhas, resultado, debrief e infraestrutura futura de mapa de relações.
- **O que exige componente novo:** editor de relações, gramática de vínculos, alternativa tabular e avaliador relacional.
- **Alternativa sem arrastar, mídia ou representação espacial:** seletores “origem”, “relação” e “destino”, acompanhados de tabela editável completa.
- **Risco de virar questionário disfarçado e prevenção:** o mapa precisa ser construído e revisado; o veredito final sozinho não concede pontuação integral.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, privacidade, duração e ausência de cronômetro. | Iniciar ou voltar ao hub. | Início explícito. | Pacote selecionado. | Sem revelar resposta. | Ordem linear e foco no `h1`. |
| Investigação | Microexemplo de calibração e, depois, artefato principal sem relações sugeridas. | Concluir a calibração curta e montar independentemente o mapa principal, consultando contexto quando necessário. | Calibração vista e relações mínimas do artefato principal completas. | Relações principais brutas e ajuda usada. | Explica a função do vínculo durante a calibração, não o veredito do caso principal. | Formulário e tabela. |
| Decisão inicial | Mapa montado e afirmações candidatas. | Classificar cada afirmação como Comprovado ou Não comprovado. | Todos os itens respondidos. | Classificações brutas. | Mostra incoerências revisáveis. | Rádios por afirmação. |
| Consequência | Efeito simulado da rota escolhida. | Escolher confirmação independente. | Uma rota permitida selecionada. | Rota e decisão. | Consequência textual e inerte. | Lista de ações. |
| Revisão | Artefato principal, decisão provisória e rota escolhida. | Revisar mapa e qualquer resposta do caso principal. | O caso principal fica completo, mas ainda editável. | Resposta principal e revisões. | Alerta lacunas sem revelar o gabarito. | Resumo com links de foco. |
| Decisão final | Mapas, conclusões e rotas escolhidas. | Confirmar a resposta final ou voltar à revisão. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões com ação e destino claros. |
| Transferência | Mesmo comportamento em outro canal ou contexto. | Relacionar conta, canal e controle. | Uma conclusão e rota. | Resposta curta. | Somente após envio. | Lista linear. |
| Resultado | Nota, decomposição, competências, recompensa potencial e revisão item a item. | Consultar o desempenho privado. | Tentativa aceita pelo avaliador. | Resultado derivado. | Declara Acertou ou Precisa revisar, mostra resposta esperada e explica o limite de comprovação. | Texto completo, sem depender do grafo. |
| Debrief | Mapa esperado, limites técnicos e próximo passo. | Comparar o processo e encerrar ou repetir. | Leitura opcional; não altera a nota. | Visualização do debrief, se necessária. | Explica spoofing e autenticação sem cobrar detecção invisível. | Conteúdo textual estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa ou rascunho. | Briefing e Iniciar. | Nenhuma. | Foco no título. |
| Em andamento | Há respostas locais não enviadas. | Continuar e revisar relações. | Rascunho mínimo por pacote, se aprovado. | Etapa e progresso anunciados. |
| Retomada | Rascunho compatível encontrado. | Retomar ou reiniciar a tentativa. | Nunca carrega gabarito. | Resumo do ponto retomado. |
| Revisão | Casos completos antes do envio. | Editar qualquer relação e concluir. | Resposta bruta local. | Resumo com links de foco. |
| Concluída | Backend ou adaptador aceitou a tentativa. | Resultado, debrief e próximos passos. | Tentativa e resultado derivados. | Título e nota anunciados. |
| Repetição | Atividade já concluída. | Nova tentativa ou resultado anterior. | Novo `attemptId`; recompensa preservada. | Explica ausência de nova recompensa. |
| Conteúdo indisponível | Versão ou pacote não publicado. | Voltar ao hub. | Nenhuma conclusão. | Mensagem explícita, sem queda silenciosa. |
| Resposta inválida | IDs, relações ou etapa incompatíveis. | Corrigir ou reiniciar. | Não persiste tentativa. | `role="alert"` e foco no erro. |
| Falha ao salvar | Avaliação ou persistência falhou. | Tentar novamente sem perder resposta. | Rascunho permanece; sem falsa conclusão. | Status anunciado e ação clara. |

## 9. Avaliação e feedback

A rubrica mantém a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores abaixo especializam esses quatro eixos para o mapa de identidade.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Qualidade das evidências | 30 | Distingue corretamente o que está comprovado do que permanece não comprovado em todos os campos relevantes. | Comete uma confusão sem alterar a resposta segura. | Trata aparência ou endereço isolado como prova. | Observar, Investigar |
| Conclusão e verificação | 25 | Conclusão proporcional e rota realmente independente. | Conclusão adequada com confirmação incompleta. | Obedece, responde na mesma conversa ou reporta tudo sem contexto. | Verificar |
| Mapa e ferramentas | 20 | Relações factuais completas, sem atribuir controle humano. | Mapa incompleto, mas sem relação falsa crítica. | Afirma que conta ou domínio provam a pessoa no controle. | Investigar |
| Caso independente e transferência | 25 | Repete o comportamento sem ajuda em novo contexto. | Usa ajuda ou deixa um limite implícito. | Não transfere ou escolhe ação insegura. | Investigar, Verificar |

Regras obrigatórias:

- os pesos somam 100 e a nota fica limitada ao intervalo de 0 a 100;
- conclusão e desempenho são registros separados;
- `needsReview` considera nota inferior a 60 e controles críticos;
- o feedback explica fatos, indícios, incerteza e processo seguro;
- nenhum sinal isolado recebe valor automático de veredito;
- ajuda é registrada, mas não reduz automaticamente a nota;
- velocidade nunca pontua;
- casos legítimos não premiam obediência automática a processo incompleto.

### 9.1 Controles críticos

- não atribuir controle humano apenas ao `From`, nome, foto ou domínio;
- não compartilhar código, senha ou outro segredo;
- não usar a própria conversa suspeita como confirmação independente;
- aceitar “inconclusivo” quando os fatos não sustentarem certeza.

### 9.2 Resultado privado

O resultado mostra nota, quatro critérios, relações corretas e indevidas, uso de ajuda, conclusão, rota de confirmação, competências e recomendação. Também apresenta cada campo, afirmação e decisão com **Acertou** ou **Precisa revisar**, resposta do funcionário, resposta esperada e explicação. Na primeira conclusão, a recompensa derivada é registrada; em repetições, o resultado informa os pontos já concedidos. A equipe recebe no máximo uma contribuição agregada elegível, nunca o mapa ou os erros.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base aplicada:** 60 pontos-base de PhishLab na primeira conclusão válida.
- **Bônus:** regra transversal vigente; velocidade não participa.
- **Idempotência:** a recompensa já concedida à atividade não reaparece por reformulação; repetição atualiza melhor e última tentativa.
- **Versões anteriores:** a versão 1 permanece legível e não é convertida em um mapa que nunca foi montado.
- **Integrações implementadas:** hub, percurso curricular, Perfil, atividade recente, competências, conquistas e recomendação para Domínio sob a lupa.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta implementado

O tipo `TrueSenderV2Submission` implementa o desenho com resposta bruta e valores fechados por pacote.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | `phishlab:true-sender` | Sim | catálogo autoritativo | rejeitar divergência |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | versão 1 não aceita o novo formato |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | pacote pertence à versão |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |
| `mechanicId` | `identity-map` | Sim | registro publicado | rejeitar divergência |
| `answerPayload.fieldRelationById` | mapa campo→relação | Sim | mapa/tabela | conjunto exato de campos do pacote |
| `answerPayload.claimAssessmentById` | mapa afirmação→`fact` ou `unproven` na interface atual | Sim | classificação | `inference` é aceito somente para preservar tentativas v2 antigas e não aparece como nova opção |
| `answerPayload.inspectedEvidenceIds` | IDs de campos sem duplicatas | Sim | interação | somente campos do pacote |
| `answerPayload.verdictId` | `legitimate`, `suspicious` ou `inconclusive` | Sim | decisão | validado por caso |
| `answerPayload.verificationRouteId` | allowlist publicada | Sim | decisão | não aceita texto livre |
| `answerPayload.transferVerdictId` | veredito allowlisted | Sim | transferência | validado pelo pacote |
| `answerPayload.transferVerificationRouteId` | rota allowlisted | Sim | transferência | validada pelo pacote |
| `answerPayload.usedHelpIds` | lista sem duplicatas | Sim | interface | somente `identity-reference` ou lista vazia |

### 11.1 Invariantes

- entidades e relações pertencem ao caso e à versão publicados;
- uma conta pode ser marcada como usada, mas a pessoa no controle só pode ser “confirmada” quando o caso fornece confirmação independente;
- listas rejeitam duplicatas e valores extras;
- replay é no-op e tentativa nova não duplica recompensa;
- resultado, nota, competências e feedback são sempre derivados.

### 11.2 Instrumentação mínima

Eventos permitidos: `case_started`, `relation_added`, `relation_changed`, `claim_classified`, `help_opened`, `answer_revised`, `submission_requested` e `submission_result`. Cada evento contém somente tentativa, versão, pacote, etapa, ID allowlisted e sequência. Não contém endereço livre, texto de mensagem, segredo ou resultado oficial. A avaliação usa a resposta final, não o log de eventos; qualquer telemetria de usabilidade terá retenção e acesso próprios.

## 12. Persistência, compatibilidade e backend

### Demonstração local

A nova forma usa `TrueSenderV2Attempt`, discriminada por `mechanicId: "identity-map"`, dentro de `LearningAttempt`. `APP_SCHEMA_VERSION` passou de 9 para 10 e o envelope para `mvp-local-v10`. A migração v9→v10 altera somente `meta.schemaVersion`, revalida o estado e não cria mapa, tentativa, progresso, competência, ponto, recompensa, recomendação ou contribuição. Não há rascunho durável nesta versão; `isAuthoritative` permanece falso.

### Backend obrigatório

Antes do uso real, o servidor:

- controla identidade, autorização e público elegível;
- publica e fixa `activityVersion` e `casePackageId`;
- valida entidades, relações, opções e etapas por allowlist;
- deriva avaliação, `needsReview`, competências e feedback;
- concede recompensa, evidência e contribuição na mesma transação idempotente;
- mantém auditoria sem conteúdo sensível;
- aplica retenção e exclusão conforme política;
- rejeita replay, versão desconhecida e pacote fora do público.

Ele não consulta e-mail, diretório ou domínio real.

### Compatibilidade

- `activityId` e rota existentes são preservados;
- a nova semântica usa `activityVersion: 2`;
- tentativas v1 permanecem imutáveis e satisfazem os pré-requisitos já conquistados;
- migração não cria mapas nem recompensa retroativa;
- estado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Somente conforme política; preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados por critério |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão local | Completa | Não | Estado de concessão |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas agregadas |

Nenhum campo recebe credencial, OTP, endereço livre ou dado pessoal. Endereços são texto inerte em `.example`; botões não respondem, enviam mensagem, abrem correio ou consultam diretório.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e o foco segue título, investigação, revisão, resultado e erro de forma coerente;
- estrutura, ordem, vínculos e estado “não comprovado” são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- toda relação pode ser criada, alterada e removida por teclado;
- qualquer ordenação futura oferece botões Mover, Subir e Descer e anuncia a nova posição;
- tabela e seletores são equivalentes ao grafo; linhas, cor, avatar e posição são redundantes;
- ilustração ou mídia futura recebe texto equivalente, e endereços completos não são truncados como única apresentação;
- feedback usa região de status e erro usa alerta com foco, sem apagar mapa, respostas ou contexto;
- alto contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo nem pontuação por rapidez;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo curricular e padrões atuais | Entidades, relações, afirmações e pacotes declarativos | P0: registro e publicação versionada |
| Interface | Shell, stepper, escolhas e resultado | Mapa/tabela de relações | P1: componente relacional acessível |
| Contrato e avaliador | Metadados e regra de recompensa | Submissão discriminada e avaliação relacional | Nova versão obrigatória |
| Estado e provider | Fronteira assíncrona atual | Operação própria por mecânica | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso comuns | Migração se a união persistida mudar | Análise de esquema |
| Integrações | Perfil, atividade recente e currículo | Registro genérico de rota/atividade | Não concentrar nova ramificação no roteador central |
| Testes | Contratos, reducer e SSR existentes | Navegador para teclado, foco e alternativa tabular | Harness de acessibilidade |

**Esforço relativo:** G. **Camadas:** P0 e P1; banco rotativo posterior em P2.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, entidades, relações e opções por allowlist;
- caso integral, parcial, inconclusivo e inseguro;
- rejeição de relação duplicada, impossível e controle humano inferido sem base;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada, repetição e recompensa idempotente;
- compatibilidade de tentativas v1 e preservação de pré-requisito;
- persistência, migração, quarentena e privacidade do agregado;
- Perfil, atividade recente, recomendação e rota própria;
- operação integral por teclado e tabela equivalente em navegador.

### Manuais no desktop

- P1, P2 e P3 do início ao resultado;
- casos suspeito, legítimo e inconclusivo;
- revisão e repetição sem nova recompensa;
- leitor de tela, foco, alto contraste, texto ampliado e movimento reduzido;
- nenhum endereço navegável, envio, segredo ou consulta externa;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:cloud-account-abuse` | Banco B1 — notificação de nuvem e biblioteca fictícia | Modelo claro de plataforma, conta, conteúdo e rota própria | É variação rotativa, não objetivo obrigatório da primeira versão |
| `concept:identity-spoofing` | Debrief D1 | Revisão técnica das afirmações observáveis | A pessoa não pode diagnosticar toda falsificação pela tela comum |
| `concept:identity-authentication-limits` | Debrief D2 | Texto revisado sobre SPF, DKIM e DMARC | Siglas e cabeçalhos técnicos não devem virar prova pontuada |

Não há conceito proprietário marcado como Versão futura neste blueprint.

## 18. Gates restantes

Os percursos, casos, pesos e controles foram implementados na demonstração local em 2026-08-15. Permanecem gates antes do uso real:

- validação editorial especializada com Segurança e Educação;
- validação adicional com tecnologia assistiva real e revisão visual dedicada;
- decidir, em lote futuro, se rascunho durável é necessário;
- implementar backend autoritativo e governança de publicação.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, mapa relacional, contrato e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
| 2026-08-15 | Versão 2 convertida com três pacotes internos, mapa textual, contrato e avaliador próprios | Implementado na demonstração local | Esquema 10; v1 e recompensa preservadas |
