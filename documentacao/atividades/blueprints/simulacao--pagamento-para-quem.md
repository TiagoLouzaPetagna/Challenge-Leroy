# Pagamento para quem?

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** atividade do portfólio-alvo ainda inexistente no catálogo executável; não possui player, identificador, versão ou rota.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Simulação |
| Comportamento principal aprovado | Confirmar obrigação, beneficiário e controles por registros independentes antes de liberar pagamento, crédito ou entrega |
| Mecânica-base aprovada | Estação de processo com comparação de registros, escolha de fonte oficial e montagem de controles |
| Estado da atividade atual | Inexistente como Simulação integrada |
| Relação com implementação existente | Atividade nova e individual; reutiliza padrões de **Mudança bancária sem atalho**, mas não substitui nem reinterpreta a atividade de Equipes |
| `activityId`, versão e rota | Não definidos |
| Duração-alvo | 12 a 16 minutos |
| Regra de recompensa considerada | 70 pontos-base de Simulação; não herda os 80 pontos nem a contribuição de `team:bank-change` |
| Conceitos proprietários | 12, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md) |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes iniciais separados para recebedor sem vínculo com a obrigação, comprovante sem crédito e intermediador legítimo;
- distribuição dos três Complementares de primeira versão com no máximo dois ativos por percurso;
- uma estação que avalia relações entre controles, sem exigir ordem total quando ações puderem ocorrer em paralelo;
- reporte estruturado e minimizado, sem texto livre;
- preservação integral da identidade, tentativa, recompensa e contribuição da atividade de Equipes.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão executável e rota;
- procedimento corporativo definitivo e responsáveis por sua publicação;
- número final de registros e documentos simulados por pacote;
- forma de integração com catálogo, Perfil e recomendações;
- ordem de implementação e ativação de recompensa.

## 2. Contrato educacional

- **Comportamento observável:** estabelecer o que é devido e a quem, consultar cadastro ou razão autorizada, confirmar pela origem oficial e aplicar os controles proporcionais antes de liberar valor ou bem.
- **Técnicas ou objetivos do atacante:** BEC, comprometimento de fornecedor, recebedor sem vínculo com a obrigação, comprovante falso e tentativa de substituir verificação por urgência ou aprovação hierárquica.
- **Atalho inseguro enfrentado:** confiar na conversa conhecida, no documento convincente, no comprovante ou na segunda aprovação sem verificar obrigação e beneficiário.
- **Resposta segura generalizável:** separar cobrança de registro autoritativo, confirmar obrigação e beneficiário pela origem oficial, manter a liberação suspensa até resolver divergências e relatar somente fatos necessários.
- **O que a conclusão permite afirmar:** como a pessoa aplicou esse processo nos registros sintéticos apresentados.
- **O que não permite afirmar:** fraude financeira real, autoria, aptidão permanente ou validade de qualquer procedimento fora do cenário publicado.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:bec` | Núcleo | Primeira versão | Personificação contextual em solicitação de alto impacto | P1 |
| `concept:beneficiary-check` | Núcleo | Primeira versão | Confirma obrigação e recebedor antes de qualquer liberação | P1, P2 e P3 |
| `concept:vendor-compromise` | Complementar | Primeira versão | Conta conhecida pode estar sob outro controle | P1 |
| `concept:fake-receipt` | Complementar | Primeira versão | Comprovante é comparado ao registro autoritativo | P2 |
| `concept:second-approval` | Complementar | Primeira versão | Segundo aprovador preserva segregação, mas não substitui verificação | P2 e P3 |
| `concept:bank-change` | Variação de caso | Banco de casos | Mudança de dados bancários | Banco de casos |
| `concept:invoice-diversion` | Variação de caso | Banco de casos | Redirecionamento de fatura ou cobrança | Banco de casos |
| `concept:boleto-fraud` | Variação de caso | Banco de casos | Divergência entre obrigação e beneficiário do boleto | Banco de casos |
| `concept:mistaken-pix-return` | Variação de caso | Banco de casos | Pedido de devolução para destino não validado | Banco de casos |
| `concept:refund-overpayment` | Variação de caso | Banco de casos | Reembolso ou pagamento excedente usado como pretexto | Banco de casos |
| `concept:advance-fee` | Variação de caso | Banco de casos | Taxa antecipada antes de benefício prometido | Banco de casos |
| `concept:payroll-diversion` | Variação de caso | Versão futura | Alteração de destino de pagamento pessoal | Versão futura |

## 4. Arquitetura da primeira versão

Cada tentativa recebe somente um percurso. Nenhum percurso ativa os três Complementares simultaneamente.

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Fatura válida, recebedor sem vínculo | Uma obrigação e sua fatura são autênticas, mas o recebedor apresentado não pertence à relação oficial | Conciliar obrigação, recebedor e origem antes de liberar | `concept:vendor-compromise` | A mesma divergência surge numa nota de cobrança, sem mudança cadastral | Malicioso |
| P2 — Comprovante chegou, crédito não | Cliente apresenta comprovante, mas o razão simulado ainda não registra crédito | Não liberar bem/serviço antes do registro autoritativo | `concept:fake-receipt` e `concept:second-approval` | O comprovante chega por outro canal e permanece apenas uma alegação | Inconclusivo |
| P3 — Intermediador esperado | Pagamento usa processador autorizado diferente do nome comercial | Confirmar a relação legítima e prosseguir pelo fluxo normal | `concept:second-approval` | Outro recebedor autorizado consta no mesmo registro oficial | Legítimo |

Os dois Núcleos descrevem a mesma ação observável. `concept:bec` participa apenas de P1; `concept:beneficiary-check` organiza os três percursos.

P1 usa uma fatura autêntica e inalterada: a divergência está no recebedor apresentado pela conversa possivelmente comprometida. Não existe pedido de mudança cadastral, contato anterior que nega alteração ou etapa de segunda aprovação. A mudança bancária profunda continua reservada à atividade de Equipes; substituição de fatura permanece no banco de casos.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Fatura válida, recebedor sem vínculo

| Elemento | Definição |
|---|---|
| Situação inicial | Pedido e fatura válidos estão registrados; durante a preparação da liberação, a conversa conhecida apresenta um intermediador que não consta na relação oficial |
| Canal e artefatos | Thread sintética, pedido, fatura inalterada, cadastro de fornecedores, razão e diretório oficial de intermediadores |
| Identidade ou pretexto | Conta conhecida do fornecedor, possivelmente comprometida, usa contexto verdadeiro para legitimar outro recebedor |
| Objetivo do atacante ou hipótese legítima | Desviar a liberação aproveitando uma obrigação real, sem pedir alteração do cadastro e sem substituir a fatura |
| Pressões e aparências | Histórico real do cenário, pedido e valor coerentes, vencimento próximo e nome empresarial plausível |
| Evidências disponíveis | Obrigação registrada, beneficiário da fatura, recebedor apresentado e relação oficial de intermediadores autorizados |
| Evidência decisiva ou limite de certeza | A obrigação é autêntica, mas a origem oficial não relaciona o recebedor apresentado àquela cobrança |
| Confirmação independente | Consultar o cadastro e o diretório oficial pelo ponto conhecido da estação, sem usar contato ou destino fornecido na conversa |
| Ação segura | Suspender somente essa liberação, preservar os registros, encaminhar a divergência pelo processo oficial e não alterar cadastro algum |
| Reporte ou recuperação | Montar relato com obrigação, recebedor divergente, fonte consultada e contenção, sem dados bancários completos |
| Transferência curta | Uma nota de cobrança repete o mesmo recebedor sem vínculo; o documento válido continua sem autenticar o destino |
| Debrief | Separa obrigação e fatura autênticas, controle possível da conta e validação independente do beneficiário |
| Conteúdo fictício necessário | Fornecedor, pedido, fatura inerte, recebedores mascarados, cadastro e diretório oficial simulados |

### Percurso P2 — Comprovante chegou, crédito não

| Elemento | Definição |
|---|---|
| Situação inicial | Um pedido aguarda confirmação; chega imagem descrita de comprovante, mas o razão ainda mostra pendente |
| Canal e artefatos | Conversa, representação textual de comprovante, pedido, razão sintético e política de liberação |
| Identidade ou pretexto | Cliente conhecido ou pessoa que alega representar o cliente |
| Objetivo do atacante ou hipótese legítima | O comprovante pode ser falso, atrasado ou referente a outra obrigação |
| Pressões e aparências | Pedido de liberação imediata, número de referência e documento visualmente coerente |
| Evidências disponíveis | Obrigação, recebedor esperado, valor, referência e ausência de crédito no registro autorizado |
| Evidência decisiva ou limite de certeza | Documento não substitui o registro; a ausência momentânea de crédito também não prova fraude |
| Confirmação independente | Consultar o razão sintético e encaminhar a divergência pelo fluxo autorizado |
| Ação segura | Não liberar nem acusar; manter pendente até confirmação do registro e segunda aprovação quando aplicável |
| Reporte ou recuperação | Relatar divergência factual e preservar o comprovante inerte |
| Transferência curta | O mesmo comprovante chega por chat; mudança de canal não transforma alegação em crédito |
| Debrief | Distingue evidência apresentada, registro autoritativo e estado inconclusivo |
| Conteúdo fictício necessário | Pedido, razão, comprovante textual, referências mascaradas e fragmentos de relato |

### Percurso P3 — Intermediador esperado

| Elemento | Definição |
|---|---|
| Situação inicial | O nome do recebedor difere do fornecedor, mas o cadastro indica processador autorizado |
| Canal e artefatos | Pedido, contrato sintético, cadastro, razão e trilha de aprovação |
| Identidade ou pretexto | Relação comercial legítima com intermediador |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima; controla o falso positivo |
| Pressões e aparências | Nome diferente, prazo normal e valor coerente |
| Evidências disponíveis | Obrigação, relação contratual, identificador mascarado e vigência |
| Evidência decisiva ou limite de certeza | Fonte autorizada liga fornecedor, obrigação e intermediador |
| Confirmação independente | Consultar contrato/cadastro por rota conhecida |
| Ação segura | Prosseguir pelo fluxo normal e obter segunda aprovação, sem abrir incidente de fraude |
| Reporte ou recuperação | Nenhum reporte de ataque; registrar aprovação regular |
| Transferência curta | Outra obrigação usa o mesmo intermediador dentro da vigência registrada |
| Debrief | Mostra que nome diferente exige verificação, não rejeição automática |
| Conteúdo fictício necessário | Cadastro, contrato, vigência, obrigação e contas mascaradas |

## 6. Mecânica e diferenciação

- **Interação central:** operar uma estação com painéis de `Obrigação esperada`, `Cobrança apresentada`, `Cadastro/razão` e `Controles`; comparar registros, escolher a origem oficial e relacionar controles à liberação.
- **Por que combina com o comportamento:** o processo seguro depende de relações entre obrigação, beneficiário, origem e autorização, não de uma única mensagem.
- **Como se distingue das outras 21 atividades:** é uma Simulação privada com pacotes financeiros variados; **Mudança bancária sem atalho** continua uma atividade de Equipes específica, com cinco decisões, 80 pontos e contribuição agregada própria.
- **O que é reutilizável:** fontes progressivas, cartões de registro, decisões, fragmentos de reporte e partes da estação de `team:bank-change`.
- **O que exige componente novo:** estação genérica declarativa, comparação lado a lado, relações de controle e avaliação de precedências parciais.
- **Alternativa sem arrastar, mídia ou representação espacial:** seletores e lista de relações “controle A precisa ocorrer antes de ação B”; botões Subir/Descer apenas quando uma sequência for realmente necessária.
- **Risco de virar questionário disfarçado e prevenção:** a pessoa monta o processo com registros conflitantes; não responde cinco alternativas isoladas.

O avaliador não exige uma ordem total quando bloqueio e preservação puderem ocorrer em paralelo. Ele verifica dependências críticas, como conciliação antes da liberação e, nos percursos P2 e P3, evidência antes de segunda aprovação.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Contexto, dados mascarados, privacidade e ausência de transação real | Iniciar | Pacote válido | Início/pacote | Sem revelar resultado | `h1` e resumo |
| Investigação | Obrigação e solicitação, sem resultado antecipado | Inspecionar e marcar divergências | Livre inspeção | Registros/campos consultados | Confirma inspeção | Tabelas nome/valor |
| Decisão inicial | Fontes e contatos disponíveis | Escolher rota independente e ação provisória | Fonte pertence ao pacote | Rota e contenção | Retorno factual, não acerto | `fieldset` |
| Consequência | Resposta sintética do cadastro, razão ou contato | Atualizar hipótese e controles | Conteúdo versionado | Evidência liberada | Região de status factual | Texto equivalente |
| Revisão | Comparação, controles possíveis e processo provisório | Relacionar bloqueio, confirmação, aprovação, liberação e reporte; corrigir qualquer etapa | Dependências e campos obrigatórios precisam ser tratados | Arestas, ordem parcial e rascunho revisado | Incoerência ou incompletude acessível, sem nota | Lista, seletores e resumo linear |
| Decisão final | Ação, certeza e relato | Confirmar | Contrato válido | Resposta bruta | Sem nota antecipada | Resumo antes do envio |
| Transferência | Divergência curta em outro artefato | Reaplicar beneficiário/controle | Uma decisão estruturada | Transferência | Sem acerto antecipado | Artefato textual |
| Resultado | Nota, controles e feedback | Consultar | Tentativa válida | Resultado derivado | Privado e sem culpa | Tabela |
| Debrief | Fato, indício, hipótese, limite e processo | Rever/repetir | Nova tentativa na repetição | Intenção de repetir | Explicação completa | Conteúdo linear |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem rascunho/tentativa | Apresentação e iniciar | Progresso oficial Não iniciada | `h1` e descrição |
| Em andamento | Pacote aberto | Registros, fontes, processo e decisões | Pacote, inspeções, relações e escolhas | Foco e progresso textual |
| Retomada | Rascunho compatível | Resumo de registros e controles já montados | Mesma versão/pacote | Anúncio do ponto retomado |
| Revisão | Processo provisório completo | Comparação e relações editáveis | Rascunho preservado | Cabeçalhos e links |
| Concluída | Tentativa válida | Resultado, debrief e repetição | Progresso oficial Concluída | Foco no resultado |
| Repetição | Já concluída | Pacote alternativo quando disponível | Melhor/última, sem nova recompensa | Aviso explícito |
| Conteúdo indisponível | Pacote/versão ausente | Retorno ao hub | Sem tentativa | Status e foco |
| Resposta inválida | Registro, relação ou opção incoerente | Corrigir sem perder dados | Sem conclusão | Alerta associado |
| Falha ao salvar | Persistência recusada | Tentar novamente | Sem recompensa/liberação | Alerta e contexto preservado |

Somente Não iniciada, Em andamento e Concluída são estados oficiais de progresso.

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Obrigação e beneficiário | 25 | Relaciona corretamente obrigação, valor/objeto e recebedor | Identifica divergência, mas deixa uma relação secundária implícita | Libera com base apenas na solicitação ou documento | Observar, Verificar |
| Registro e origem independente | 25 | Usa cadastro/razão e fonte oficial adequada | Fonte segura, porém incompleta | Usa a própria conversa, cobrança ou comprovante como confirmação | Verificar |
| Controles do processo | 25 | Bloqueia antes de liberar, confirma e preserva segunda aprovação | Evita dano, mas omite controle não crítico | Aprovação substitui verificação ou liberação ocorre primeiro | Decidir, Recuperar |
| Ação final e relato | 15 | Age proporcionalmente e relata fatos sem segredos | Ação segura com relato incompleto/excessivo | Paga/libera/altera, apaga evidência ou expõe dado | Decidir, Reportar |
| Falso positivo e proporcionalidade | 10 | Prossegue no caso legítimo e preserva inconclusivo | Excesso de cautela sem dano | Acusa o legítimo ou trata documento como veredito | Orientar |

Os pesos somam 100. Conclusão e nota são separadas; velocidade e valor monetário não pontuam.

### 9.1 Controles críticos

- pagamento, crédito ou entrega não podem ocorrer antes da confirmação exigida;
- a fonte de verificação deve ser independente da solicitação sob análise;
- segunda aprovação não substitui verificação de obrigação e beneficiário;
- divergência inconclusiva permanece retida sem acusação;
- relato não inclui conta completa, credencial, OTP, segredo ou dado pessoal;
- caso legítimo confirmado deve poder prosseguir pelo processo normal.

`needsReview` é verdadeiro abaixo de 60 pontos ou com falha em qualquer controle crítico.

### 9.2 Resultado privado

O resultado apresenta nota, cinco parcelas, comparação de registros, contato escolhido, relações críticas, ação, relato estruturado, competências, `needsReview`, debrief e recompensa potencial. Nenhum dado financeiro, escolha, nota ou recomendação individual é enviado à equipe. A atividade não contribui automaticamente para o agregado de `team:bank-change`.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 70 pontos de Simulação, sujeita à aprovação da versão executável.
- **Bônus:** apenas regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** não existem para esta Simulação. Tentativas e recompensa de `team:bank-change` permanecem separadas e imutáveis.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendações.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor real | idempotente |
| `activityId` | ID futuro publicado | Sim | catálogo autoritativo | não reutilizar `team:bank-change` |
| `activityVersion` | versão futura publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | seleção do servidor |
| `completedAt` | data válida | Sim | servidor real | sem pontuação por tempo |
| `inspectedRecordFieldIds` | IDs únicos de registro/campo | Sim | interação | somente campos publicados |
| `obligationAssessmentId` | opção permitida | Sim | interação | obrigação confirmada, divergente ou incerta |
| `beneficiaryAssessmentId` | opção permitida | Sim | interação | coerente com o pacote |
| `verificationRouteId` | cadastro, razão ou fonte oficial publicada | Sim | interação | origem independente validada |
| `processControlEdges` | origem, destino e relação permitida | Sim | interação | precedências críticas, sem arestas extras |
| `finalActionId` | ação publicada | Sim | interação | proporcional ao estado |
| `reportFragmentIds` | IDs predefinidos | Quando houver relato | interação | sem texto livre nem dados completos |
| `transferDecision` | obrigação, beneficiário e ação | Sim | transferência | allowlist própria |

Nota, bônus, competências, feedback e recompensa são derivados.

### 11.1 Invariantes

- todos os IDs pertencem à versão e ao pacote;
- listas e arestas rejeitam duplicatas, valores extras e relações inválidas;
- confirmação deve preceder a liberação quando o pacote assim exige;
- segunda aprovação não pode ser a única evidência de beneficiário;
- certeza e ação precisam ser compatíveis;
- replay do mesmo `attemptId` é `no-op`;
- nova tentativa não duplica recompensa;
- a chave de recompensa nunca colide com a atividade de Equipes;
- conteúdo e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Persistir versão, pacote, registros inspecionados, avaliações, rota, relações de controle, ação e fragmentos para retomada. A tentativa concluída guarda resposta bruta, resultado derivado e `isAuthoritative: false`. Não guardar número de conta completo, documento, telefone ou texto livre.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. Procedimentos e conteúdo precisam de publicação autorizada. Nenhum ERP, banco, diretório, mensageria, pagamento ou relatório real é integrado.

### Compatibilidade

- mudança semântica exige `activityVersion` nova;
- nova união persistida exige análise de `APP_SCHEMA_VERSION`;
- `team:bank-change` conserva contrato, tentativa, resultado, recompensa e contribuição próprios;
- componentes podem ser reutilizados, registros não;
- migrações preservam progresso, pontos, preferências e evidências;
- rascunho incompatível não é reinterpretado;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Local e minimizada | Própria tentativa | Nunca | Somente política autorizada |
| Nota e feedback | Melhor e última | Privados | Nunca | Preferir agregado |
| Competências | Derivadas | Privadas | Cobertura agregada, se aprovada | Agregado com limiar |
| Recompensa | Chave e valor | Titular | Nunca | Auditoria |
| Agregado | Não automático; reivindicação mínima se futura | Resumo | Sem registros/valores | Coorte autorizada |

Usar empresas, pessoas, pedidos, documentos e contas fictícios; números e valores são mascarados. Não coletar nem persistir dados financeiros reais, CPF/CNPJ, telefone, credencial, OTP, segredo ou texto livre. O player não altera cadastro, liga, envia mensagem, paga, devolve, libera pedido, consulta razão real ou produz reporte.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente;
- cada painel tem título semântico e pares nome/valor;
- comparação disponível em tabela, não apenas destaque por cor;
- operação integral por teclado;
- relações de controle em seletores e lista, sem exigir grafo;
- botões Subir/Descer e posição anunciada quando houver sequência;
- contas, valores e estados sempre legíveis em texto;
- `fieldset` e `legend` para decisões;
- feedback e erro sem apagar o processo;
- contraste, texto ampliado, movimento reduzido e sem limite de tempo;
- linguagem sem culpa e sem ameaça disciplinar;
- desktop agora; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Caso e fontes de `team:bank-change` como referência | Pacotes declarativos financeiros variados | P0: publicação/allowlist |
| Interface | Cartões de fonte, decisões e resultado | Estação genérica e relações de controle | P1: estação de processo |
| Contrato e avaliador | Validação determinística e decisões ponderadas | Obrigação/beneficiário/arestas parciais | P0: validar → avaliar → persistir |
| Estado e provider | Tentativas e progresso | Rascunho de estação | Rejeição antes de avaliar |
| Persistência | Envelope/migrações | União própria, sem colisão com Equipes | Análise de schema |
| Integrações | Perfil/histórico | Nova atividade e chave de recompensa | IDs ainda não definidos |
| Testes | Regras existentes de mudança bancária | Matriz de pacotes, relações e privacidade | Harness P0 |

Esforço relativo: **G**, entre P1 e P2, depois dos gates P0.

### 15.1 Riscos específicos e mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| Duplicar **Mudança bancária sem atalho** | Confunde identidade, recompensa e contribuição | P1 não altera cadastro, não usa contato que nega mudança e não ativa segunda aprovação; reuso somente de componentes |
| Tratar segunda aprovação como autenticação | Preserva um atalho inseguro | Controle crítico: confirmação do beneficiário ocorre antes |
| Generalizar um procedimento financeiro local | Orientação pode ser incorreta em outra organização | Política versionada e publicada por responsáveis autorizados |
| Expor dado financeiro ou pessoal | Aumenta risco e retenção | Dados fictícios/mascarados, IDs estruturados e nenhum texto livre |
| Interface parecer executar transação | Cria falsa confirmação de pagamento ou bloqueio | Ações sempre descritas como plano no cenário, nunca como integração |
| Falso positivo bloquear operação legítima | Segurança vira paralisação | P3 legítimo e critério próprio de proporcionalidade |

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, registros, rotas e relações por allowlist;
- máximo de dois Complementares por pacote;
- casos malicioso, legítimo e inconclusivo;
- P1 concilia obrigação e beneficiário sem pedido cadastral, contato de negação ou segunda aprovação;
- segunda aprovação nunca substitui confirmação;
- avaliador integral, parcial, inseguro e inválido;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada, repetição e recompensa idempotente;
- ausência de colisão com `team:bank-change`;
- persistência, retomada, migração e quarentena;
- privacidade e ausência de dado financeiro em agregado;
- Perfil, atividade recente e recomendação;
- rota futura própria sem queda silenciosa no hub;
- teclado, foco, tabelas e alternativa às relações.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- intermediador legítimo pode prosseguir sem incidente;
- comprovante sem crédito permanece inconclusivo;
- nenhum controle executa ação financeira ou externa;
- dados mascarados em toda tela, erro e resultado;
- teclado, leitor de tela, foco, contraste, texto ampliado e movimento reduzido;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:bank-change` | Banco de casos | Não duplicar o caso de Equipes e manter recompensa separada | Mudança cadastral profunda permanece reservada a **Mudança bancária sem atalho** |
| `concept:invoice-diversion` | Banco de casos | Modelo de fatura inerte e origem autorizada | Exige conteúdo fiscal revisado |
| `concept:boleto-fraud` | Banco de casos | Beneficiário mascarado, política regional e contraste legítimo | Exige artefato local específico |
| `concept:mistaken-pix-return` | Banco de casos | Processo aprovado que ensine devolver somente pela rota autorizada | Alto risco de generalização e de simular operação real |
| `concept:refund-overpayment` | Banco de casos | Diferenciar erro legítimo, crédito e pretexto | Exige mais de um registro contábil |
| `concept:advance-fee` | Banco de casos | Contexto profissional coerente e controles de falso positivo | Não deve virar regra “taxa é sempre fraude” |
| `concept:payroll-diversion` | Versão futura | Revisão de RH, Jurídico, privacidade e publicação segmentada | Envolve dado pessoal e processo distinto do fornecedor |

O debrief não antecipa procedimentos universais para Pix, boleto, reembolso ou folha. Cada caso só avança com política e conteúdo versionados.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes e a distribuição de Complementares;
- aprovar os cinco pesos, o corte de 60 e os controles críticos;
- decidir quais partes visuais de `team:bank-change` poderão virar componentes compartilhados;
- definir a ontologia de relações do processo;
- definir `activityId`, rota e versão apenas na conversão técnica;
- decidir se a Simulação terá qualquer contribuição agregada futura, sem herdar a de Equipes.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Estação financeira, três pacotes e fronteira com Equipes propostos | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | P1 redesenhado como conciliação de obrigação e beneficiário, sem mudança cadastral | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
