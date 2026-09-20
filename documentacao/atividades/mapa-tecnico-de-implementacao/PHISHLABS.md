# Mapa técnico dos oito PhishLabs

> **Estado:** identidades, versões-alvo e rotas aprovadas; Quem enviou de verdade? v2 e Domínio sob a lupa v2 implementadas e validadas na demonstração local, demais atividades planejadas até implementação individual.
>
> **Regra de área:** 60 pontos-base e bônus transversal vigente na primeira conclusão válida. Ferramentas e dicas podem orientar, mas explorar evidência não reduz nota por si só.

## 1. Matriz de identidade

| PhishLab | Estado atual | Identidade técnica candidata | Estratégia | Onda |
|---|---|---|---|---:|
| Quem enviou de verdade? | disponível v2; v1 histórica | `phishlab:true-sender` v2 · `/phishlab/quem-enviou-de-verdade` | ID/rota, histórico e recompensa v1 preservados | 1 |
| Domínio sob a lupa | disponível v2; v1 histórica | `phishlab:link-analyzer` v2 · `/phishlab/analisador-de-links` | ID/rota e histórico v1 preservados | 1 |
| Uma letra fora do lugar | inexistente | `phishlab:lookalike-identifier` v1 · `/phishlab/uma-letra-fora-do-lugar` | nova identidade candidata | 2 |
| Para onde esse link realmente vai? | inexistente | `phishlab:destination-chain` v1 · `/phishlab/para-onde-esse-link-realmente-vai` | nova identidade candidata | 2 |
| O destino atrás do QR | inexistente | `phishlab:qr-destination` v1 · `/phishlab/o-destino-atras-do-qr` | absorve Entrega por QR como caso, não como atividade | 2 |
| Espelho de Página | card conceitual | `phishlab:page-mirror` v1 · `/phishlab/espelho-de-pagina` | o rótulo local `mirror-page` não é ID público | 2 |
| Login verdadeiro, permissão errada | inexistente | `phishlab:oauth-consent` v1 · `/phishlab/login-verdadeiro-permissao-errada` | nova identidade candidata | 4 |
| De qual dispositivo veio este código? | inexistente | `phishlab:device-code` v1 · `/phishlab/de-qual-dispositivo-veio-este-codigo` | nova identidade candidata | 4 |

## 2. Quem enviou de verdade?

### Fronteira técnica

- **Blueprint:** [`phishlab--quem-enviou-de-verdade.md`](../blueprints/phishlab--quem-enviou-de-verdade.md).
- **Mecânica:** C3 mapa de relações; tabela textual é a fonte de verdade.
- **Contrato bruto implementado:** `casePackageId`, `mechanicId`, `fieldRelationById`, `claimAssessmentById`, `inspectedEvidenceIds`, `verdictId`, `verificationRouteId`, `transferVerdictId`, `transferVerificationRouteId` e `usedHelpIds`.
- **Derivados:** mapa 20, fatos/hipóteses 30, conclusão/rota 25, transferência 25, controles críticos, competências, recompensa e contribuição.

### Reuso, compatibilidade e testes

Reutiliza os quatro campos da v1, acrescenta domínio e contexto como relações explícitas e usa tabela textual como fonte de verdade. A v2 publica três pacotes internos; o primeiro é atribuído automaticamente e os demais aparecem somente em repetição. V1 permanece `PhishLabAttempt`; v2 usa `TrueSenderV2Attempt`, não converte vereditos antigos em mapa e não reabre recompensa. A nova união persistida ativou esquema 10 e migração v9→v10 restrita ao metadado.

Testes próprios cobrem três pacotes, `From` diferente de `Reply-To`, conta conhecida possivelmente comprometida, caso legítimo, estado não comprovado, IDs extras/listas duplicadas, controle humano indevido, teclado, foco, SSR, envelope v10 e leitura do resultado v1.

## 3. Domínio sob a lupa

### Fronteira técnica

- **Blueprint:** [`phishlab--dominio-sob-a-lupa.md`](../blueprints/phishlab--dominio-sob-a-lupa.md).
- **Mecânica:** C1 anatomia de URL e C9 pacote versionado.
- **Contrato bruto proposto:** `casePackageId`, `segmentRoleById`, `registeredDomainSelectionId`, `inspectedSegmentIds`, `verdictId`, `safeRouteId`.
- **Derivados:** protocolo, subdomínio, domínio registrado, caminho, parâmetro, pertencimento e nota.

### Reuso, compatibilidade e testes

É a primeira prova técnica. Reutiliza o caso atual e substitui botões de revelação por segmentação direta com lista textual equivalente. A versão 2 inclui parâmetro, ausente na v1. A estratégia de sufixos deve ser totalmente offline, pequena e versionada; não existe consulta DNS ou de registro.

Testes cobrem limites registráveis, subdomínio com marca, caminho/parâmetro enganoso, HTTPS legítimo e malicioso, endereço de terceiro legítimo, teclado, texto equivalente, v1 legível e recompensa única.

## 4. Uma letra fora do lugar

### Fronteira técnica

- **Blueprint:** [`phishlab--uma-letra-fora-do-lugar.md`](../blueprints/phishlab--uma-letra-fora-do-lugar.md).
- **Mecânica:** lente comparativa como variante C1.
- **Contrato bruto proposto:** `casePackageId`, `referenceId`, `candidateId`, `markedDifferenceIds`, `comparisonAssessmentId`, `safeOriginId`, `finalActionId`.
- **Derivados:** uso da referência, diferenças relevantes, ação pela origem e nota.

### Reuso e testes

Reutiliza segmentação e comparação, mas o objetivo é comparar identificadores completos, não localizar o domínio registrável. Homógrafo e IDN nunca dependem apenas de “encontrar a letra”; a decisão segura continua usar uma origem conhecida.

Testes incluem troca, omissão, inserção, hífen, plural, caracteres visualmente semelhantes, IDN legítimo, referência incorreta, zoom sem cor e execução por lista textual.

## 5. Para onde esse link realmente vai?

### Fronteira técnica

- **Blueprint:** [`phishlab--para-onde-esse-link-realmente-vai.md`](../blueprints/phishlab--para-onde-esse-link-realmente-vai.md).
- **Mecânica:** C2 linha de rastreamento inerte + C1 inspeção de cada nó.
- **Contrato bruto proposto:** `casePackageId`, `orderedNodeIds`, `nodeAssessmentById`, `promiseDestinationId`, `observableDestinationId`, `stopPointId`, `safeRouteId`.
- **Derivados:** cadeia observável, divergência entre promessa e destino, ponto de interrupção e nota.

### Reuso e testes

Nenhum nó é aberto. O pacote fornece toda a cadeia sintética e distingue o que era observável antes da ação do que só aparece no debrief. Encurtador legítimo não é veredito; ausência de cadeia completa permite resposta inconclusiva.

Testes cobrem redirecionamento legítimo, cadeia suspeita, encurtador, parâmetro, nó invisível apenas no debrief, ordem parcial, IDs extras e alternativa sem arrastar.

## 6. O destino atrás do QR

### Fronteira técnica

- **Blueprint:** [`phishlab--o-destino-atras-do-qr.md`](../blueprints/phishlab--o-destino-atras-do-qr.md).
- **Mecânica:** mesa de espécimes C1 com contexto e prévia fornecida.
- **Contrato bruto proposto:** `casePackageId`, `contextAssessmentId`, `previewActionId`, `previewSegmentIds`, `recipientAssessmentId`, `safeRouteId`, `finalActionId`.
- **Derivados:** expectativa do fluxo, uso seguro da prévia, destino/recebedor, rota oficial e nota.

### Reuso e testes

QR é imagem inerte e acompanhado de conteúdo textual já decodificado pelo caso. Não há câmera nem código navegável. **Entrega por QR Code** entra como pacote desta atividade e não ganha recompensa própria.

Testes cobrem QR esperado, inesperado, sem prévia, adesivo descrito, pagamento com recebedor divergente apenas quando o pacote financeiro for aprovado, rota oficial e equivalência total sem imagem.

## 7. Espelho de Página

### Fronteira técnica

- **Blueprint:** [`phishlab--espelho-de-pagina.md`](../blueprints/phishlab--espelho-de-pagina.md).
- **Mecânica:** comparação funcional C1 entre origem, promessa, campos e próxima ação.
- **Contrato bruto proposto:** `casePackageId`, `originAssessmentId`, `requestedFieldIds`, `promiseAssessmentId`, `independentEntryRouteId`, `comparisonFindingIds`, `finalActionId`.
- **Derivados:** abandono da aparência como prova, minimização de campos, rota independente e nota.

### Reuso e testes

O renderizador aceita snapshots sintéticos locais e uma árvore textual equivalente. Não tenta copiar marca real nem criar uma página navegável. Diferença de pixel, erro de português ou ausência de cadeado não é resposta-chave.

Testes incluem página visualmente perfeita e maliciosa, SSO legítimo em domínio diferente, reautenticação esperada, campos excessivos, rota iniciada por link e rota aberta independentemente.

## 8. Login verdadeiro, permissão errada

### Fronteira técnica

- **Blueprint:** [`phishlab--login-verdadeiro-permissao-errada.md`](../blueprints/phishlab--login-verdadeiro-permissao-errada.md).
- **Mecânica:** mesa de consentimento com C1 e C3.
- **Contrato bruto proposto:** `casePackageId`, `purposeAssessmentId`, `appIdentityRelationIds`, `publisherAssessmentId`, `scopeAssessmentById`, `consentDecisionId`, `officialCatalogRouteId`.
- **Derivados:** necessidade, identidade do app, escopos proporcionais, decisão e nota.

### Reuso e testes

Todas as telas de consentimento são fictícias. O login pode ser legítimo e a concessão ainda insegura. O laboratório não conecta app nem solicita credencial. O catálogo autorizado é um registro sintético versionado.

Testes cobrem app aprovado com escopos adequados, app aprovado pedindo excesso, app desconhecido, publicador não comprovado, finalidade ausente, negação proporcional e estado inconclusivo.

## 9. De qual dispositivo veio este código?

### Fronteira técnica

- **Blueprint:** [`phishlab--de-qual-dispositivo-veio-este-codigo.md`](../blueprints/phishlab--de-qual-dispositivo-veio-este-codigo.md).
- **Mecânica:** C3 entre código, origem, dispositivo e sessão; C7 mínimo para sequência.
- **Contrato bruto proposto:** `casePackageId`, `codeTypeId`, `generationSourceId`, `receivingDeviceId`, `intendedEntryTargetId`, `sessionRelationIds`, `finalActionId`, `recoveryRouteId`.
- **Derivados:** correspondência com ação iniciada, finalidade, sessão, resposta e nota.

### Reuso e testes

Códigos são placeholders não funcionais. O aluno nunca digita código livre. A atividade distingue inserir um código no fluxo oficial iniciado pela própria pessoa de ditá-lo a alguém ou inseri-lo em outro dispositivo.

Testes cobrem OTP próprio, código inesperado, vinculação de dispositivo, recuperação iniciada fora da rota, código expirado, pedido de suporte, relações extras e fronteira com MFA.

## 10. Dependências transversais dos PhishLabs

| Dependência | Consumidores | Gate |
|---|---|---|
| C1 anatomia | Domínio, Letra, Link, QR, Espelho, OAuth | Domínio v2 aprovado no navegador |
| C2 timeline | Link | Conversa v2 e contrato de ordem parcial |
| C3 relações | Remetente, OAuth, Código | Remetente v2 com tabela canônica |
| C7 console mínimo | Código | máquina finita sem evento real |
| snapshots inertes | Espelho | nenhum `href`, formulário ou marca real |
| tabela offline de sufixos | Domínio, Letra | versão fixa, testes e nenhum acesso de rede |

## 11. Gate de conversão para código

Um PhishLab só entra em catálogo como disponível quando possui caso guiado e transferência, contrato allowlisted, avaliador independente do texto, alternativa textual completa, rota SSR própria, persistência e recompensa idempotentes. Card ou rota dinâmica não bastam.
