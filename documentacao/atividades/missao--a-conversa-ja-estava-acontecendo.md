# Missão — A conversa já estava acontecendo

> **Estado atual:** versão 2 implementada e disponível; validação automatizada concluída.
> **Histórico:** a versão 1 permanece legível e imutável.
> **Backend:** a demonstração local não é autoritativa e não está pronta para uso real.
> **Revisão aprovada:** reposicionamento curricular, atribuição automática do primeiro caso e textos contextuais implementados; painel de evidências preservado.

## 1. Identidade e rastreabilidade

| Campo | Valor vigente |
|---|---|
| Área | Missões |
| Percurso | Estado atual: Confiança sob pressão; alvo: etapa de confiança avançada da nova jornada |
| Ordem recomendada | Depois da Missão de fundamento, Quem enviou de verdade? e Domínio sob a lupa; a saída recomenda Você iniciou este acesso? |
| `activityId` | `mission:compromised-conversation` |
| Versão publicada | `2` |
| Versões aceitas no histórico | `1` e `2` |
| Rota | `/missoes/a-conversa-ja-estava-acontecendo` |
| Mecânica | `conversation-reconstruction` |
| Duração | 9–12 minutos |
| Pontos-base | 100 |
| Competências | Observar, Investigar, Verificar e Reportar |
| Pré-requisitos | Nenhum |
| Radar relacionado | Falso gestor; opcional, pontuado por regra própria e nunca pré-requisito |

Mapa de implementação:

- conteúdo: `lib/content/activities/compromised-conversation/v2.ts`;
- interface: `features/missions/ConversationReconstructionMission.tsx`;
- contrato e resultado: `lib/domain/types.ts`;
- validação e avaliação: `lib/domain/rules.ts`;
- execução local: `app/providers.tsx`;
- persistência: `lib/state/app-reducer.ts` e `lib/state/persistence.ts`;
- registro: `lib/activities/registry.ts`;
- testes: `tests/rendered-html.test.mjs` e `tests/browser/p0-accessibility.spec.ts`.

## 2. Objetivo educacional

O comportamento observado é reconhecer uma mudança de destino, escopo ou processo dentro de uma conversa familiar, suspender a ação e confirmar por uma rota obtida fora do mesmo fio.

A conclusão permite afirmar apenas o desempenho nesta tentativa. Ela não comprova retenção, domínio permanente, comprometimento real da conta ou causa técnica da mudança. Uma conta conhecida é um fato sobre o endereço; quem a controla no momento pode continuar incerto.

## 3. Estado histórico — versão 1

A versão 1 apresentava três mensagens já ordenadas, três botões de investigação, uma ação principal e justificativas. Ela usava `MissionSubmission`, com ação, evidências inspecionadas e razões selecionadas.

As tentativas v1 continuam na união `LearningAttempt`, mantêm nota, resposta, pontos e evidências originais e são apresentadas como resultado histórico. Elas não recebem ordem, ponto de mudança ou classificações inventadas e não são recompensadas novamente pela publicação da v2.

## 4. Versão 2 implementada

### 4.1 Mecânica

A atividade agora é uma reconstrução cronológica. O funcionário:

1. recebe automaticamente um dos três pacotes internos; a primeira abertura usa o caso canônico e os demais aparecem apenas na repetição;
2. ordena seis mensagens por botões Subir/Descer ou por seletor de posição;
3. prende pelo menos três evidências no painel;
4. classifica cada evidência como fato, indício ou inferência;
5. marca a mensagem em que o comportamento ou processo mudou;
6. registra uma conclusão provisória;
7. recebe a resposta de uma fonte independente fictícia;
8. revisa livremente o caminho;
9. escolhe rota de confirmação, conclusão e ação final;
10. monta o reporte somente quando o caso exige incidente;
11. aplica o mesmo comportamento em outro canal;
12. recebe resultado privado e debrief separado.

O player usa os nove estados da fundação P0: Abertura, Investigar, Decidir, Consequência, Revisar, Confirmar, Transferir, Resultado e Debrief.

### 4.2 Pacotes publicados

| `casePackageId` | Percurso | Resultado editorial |
|---|---|---|
| `mission:compromised-conversation:v2:p1-new-destination` | O novo destino | possível uso indevido confirmado externamente |
| `mission:compromised-conversation:v2:p2-legitimate-change` | A alteração legítima incompleta | pedido legítimo que ainda exigia processo |
| `mission:compromised-conversation:v2:p3-scope-change` | O chamado fora do padrão | solicitação não reconhecida pela área oficial |

Os pacotes são alternativas. Uma tentativa usa apenas um, e eles não geram recompensas separadas.

P1, P2 e P3 são referências internas. A primeira abertura recebe o caso canônico automaticamente; os demais ficam para repetição por **Praticar com outro caso**. **Refazer Missão** mantém o caso atual.

### 4.3 Conteúdo seguro

Cada pacote contém seis mensagens, cinco evidências, uma consequência e uma transferência. Todos os nomes e endereços são fictícios e usam `.example`. Não existe link navegável, chamada, contato, chamado, alteração operacional ou reporte real.

## 5. Fluxo e estados

| Etapa | Ação do funcionário | Registro bruto | Feedback |
|---|---|---|---|
| Abertura | compreender papel, situação, tarefa e consequência do caso atribuído | `casePackageId` atribuído internamente | nenhum veredito antecipado |
| Investigar | ordenar e classificar evidências | ordem e avaliações | posição anunciada; sem nota |
| Decidir | marcar ruptura e hipótese | ponto e conclusão provisória | sem revelar correção |
| Consequência | consultar resposta fictícia | nenhum derivado confiado ao cliente | nova informação contextual |
| Revisar | conferir e voltar livremente | estado mantido na sessão | sem penalidade |
| Confirmar | escolher rota, conclusão, ação e reporte | decisões finais | erros associados aos campos |
| Transferir | reaplicar em outro canal | decisão de transferência | feedback somente após envio |
| Resultado | consultar decomposição privada e cada resposta dada comparada à esperada | resultado derivado | seis dimensões, revisão detalhada e recomendação |
| Debrief | revisar regra transferível | nenhuma nova nota | separação entre fato e hipótese |

Não há cronômetro nem pontos por velocidade. O rascunho ainda não é persistido entre sessões; somente tentativas concluídas são salvas.

### 5.1 Revisão de clareza aprovada

Antes da primeira decisão avaliada, a abertura apresenta o papel do funcionário, o que aconteceu, a tarefa daquela etapa e a consequência protegida. As etapas de reconstrução, mudança, confirmação e transferência explicam o objeto da decisão junto ao controle antes de introduzir termos técnicos.

A etapa de confirmação não apresenta mais a pergunta abstrata “Qual rota confirma sem depender do solicitante?”. Ela explica primeiro que o objetivo é verificar se a pessoa ou área conhecida realmente pediu a mudança. As opções nomeiam ações concretas: abrir diretório, portal ou chamado já usado pela empresa; responder na mesma conversa; usar o contato enviado junto com o pedido; ou usar o primeiro resultado de uma busca. “Referência conhecida” significa um contato ou sistema que já existia antes da conversa, e não um endereço fornecido pelo próprio pedido.

O **painel de evidências permanece como está na versão 2**. Ele continua registrando os itens que sustentam a conclusão do funcionário; não foram aprovadas mudanças em seu nome, classificação, composição visual ou pontuação.

## 6. Avaliação

| Critério | Peso |
|---|---:|
| Reconstrução temporal por pares de precedência | 20 |
| Ponto de mudança | 20 |
| Classificação das evidências | 20 |
| Calibração provisória, final e transferência | 15 |
| Confirmação independente | 15 |
| Ação e reporte proporcionais | 10 |

A nota é limitada a 0–100. `needsReview` é verdadeiro com nota inferior a 75 ou quando falha um controle crítico: reconhecer o ponto de mudança, usar rota independente, escolher ação segura ou montar reporte seguro quando o pacote exige incidente.

No percurso legítimo, reportar incidente não é premiado: a resposta correta é confirmar e seguir o processo normal.

## 7. Recompensa e competências

A primeira conclusão válida usa 100 pontos-base e o bônus transversal vigente. A chave permanece `mission:compromised-conversation:first-completion`.

- conclusão v1 seguida de v2 não concede outra recompensa;
- repetição v2 não duplica pontos nem contribuição;
- melhor nota e última tentativa continuam separadas;
- evidências de Observar, Investigar, Verificar e Reportar são derivadas do resultado;
- Radar continua opcional e concede seus próprios pontos quando aplicável.

## 8. Contrato v2

`ConversationReconstructionV2Submission` contém:

- `attemptId`, `activityId`, `activityVersion` e `completedAt`;
- `casePackageId` e `mechanicId`;
- `orderedArtifactIds` completos e sem duplicatas;
- `turningPointArtifactId` pertencente ao pacote;
- `evidenceAssessments` com IDs e classes allowlisted;
- conclusões provisória e final;
- rota de confirmação e ação final;
- `reportDetailIds` sem segredos;
- decisão de transferência.

O cliente envia resposta bruta. Nota, parcelas, controles críticos, competências, recompensa e contribuição são derivados pelo avaliador. Valores extras, IDs desconhecidos, ordem incompleta, duplicatas, versão incorreta e reporte incompatível são rejeitados antes da avaliação e da persistência.

## 9. Persistência e migração

A nova forma ampliou `LearningAttempt`, por isso:

- `APP_SCHEMA_VERSION` passou de 7 para 8;
- o envelope criado por essa conversão foi `mvp-local-v8`; o envelope atual é `mvp-local-v9` após a fundação v2;
- a migração `v7 → v8` modifica somente `meta.schemaVersion` e revalida o estado;
- a migração não cria tentativa, conclusão, competência, recomendação, ponto, recompensa ou contribuição;
- estados inválidos continuam em quarentena;
- versões 1 e 2 coexistem sem reinterpretação.

## 10. Integrações

A atividade continua ligada ao percurso, Perfil, atividade recente, pontos, conquistas, competências e recomendações. **Quem enviou de verdade?** e **Domínio sob a lupa** vêm antes desta Missão; o debrief agora recomenda **Você iniciou este acesso?** como próximo passo. A nota não bloqueia o percurso e a navegação não concede recompensa.

Equipe e gestão não recebem ordem, evidências, hipótese ou resposta individual. A contribuição coletiva existente é única por atividade lógica e não contém dados brutos.

## 11. Privacidade e segurança

| Dado | Funcionário | Equipe | Gestão futura |
|---|---|---|---|
| Resposta bruta | própria tentativa | não | não; apenas auditoria autorizada futura |
| Nota e feedback | completos | não | agregado permitido |
| Competências | próprias | agregado sem resposta | agregado com limiar futuro |
| Recompensa | própria | não | total agregado permitido |
| Conteúdo da conversa | fictício | não | não |

É proibido usar senha, OTP, segredo, dado pessoal, contato, conta ou chamado real. O protótipo não afirma que confirmou, bloqueou ou reportou algo na organização.

## 12. Backend autoritativo obrigatório

Antes do uso real, o servidor deverá controlar identidade, autorização, público, versão e pacote publicados, allowlists, idempotência, horário confiável, avaliação, competências, recompensa, contribuição, transação, auditoria, retenção e exclusão. O modo atual permanece `isAuthoritative: false`.

## 13. Acessibilidade e desktop

- `h1` único e foco no título de cada nova etapa;
- a instância do player mantém uma chave estável durante a hidratação, evitando perder a transição ou o foco quando a primeira ação é feita logo após abrir a rota;
- progresso com `role="progressbar"` e etapa atual marcada;
- ordenação por botões e seletor, sem arrastar obrigatório;
- posição anunciada em região de status;
- painel operável por teclado;
- `fieldset` e `legend` nas decisões;
- erros em `role="alert"`;
- contraste, texto ampliado e movimento reduzido;
- nenhuma dependência exclusiva de cor;
- desktop no escopo atual; celular permanece posterior.

## 14. Testes e critérios de aceite

A validação automatizada cobre três pacotes e IDs únicos, contrato perfeito, legítimo e inválido, nota 100, pesos, ordem duplicada, reporte incompatível, coexistência v1/v2, recompensa e contribuição únicas, replay do mesmo `attemptId`, registro publicado, migração v7→v8, SSR da rota e fluxo completo no Chromium por teclado, foco, persistência e `axe`.

## 15. Limites e próximas evoluções

- rascunho em andamento ainda não é persistido;
- lateral phishing e thread fabricada permanecem no banco de casos;
- regras maliciosas de caixa aparecem somente no debrief;
- celular, integrações corporativas e backend real permanecem fora;
- a atividade não diagnostica tecnicamente o comprometimento da conta.
- novos pacotes futuros precisam preservar a atribuição interna e a mesma clareza contextual;
- a revisão de apresentação permaneceu compatível com v2 porque não alterou contrato, allowlists, avaliador ou significado das respostas.

## 16. Histórico

| Data | Registro |
|---|---|
| Implementação anterior | Versão 1 disponibilizada com thread fixa e decisão genérica. |
| 2026-08-11 | Direção de reconstrução e painel de evidências aprovada. |
| 2026-08-15 | Blueprint e mapa técnico aprovados. |
| 2026-08-15 | Versão 2 implementada com três pacotes, contrato próprio, esquema 8 e compatibilidade v1. |
| 2026-08-15 | Implementados o reposicionamento da saída curricular, a atribuição automática do primeiro caso, textos contextuais e revisão resposta por resposta; painel de evidências, contrato, versão e recompensa foram preservados. |
| 2026-08-15 | A etapa de confirmação substituiu “rota” e “solicitante” por objetivo e ações concretas, explicando o que precisa ser verificado e por que contatos fornecidos no próprio pedido não confirmam sua autenticidade. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
