# Missão — O aviso que não podia esperar

> **Estado atual:** versão 2 implementada e validada como Missão de fundamento na demonstração local.
> **Compatibilidade:** versão 1 preservada como histórico, sem reinterpretar tentativa, recompensa ou contribuição.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | Missões |
| Percurso e ordem | Estado atual: jornada principal legada. Alvo: fundação anterior aos PhishLabs e às Missões de confiança avançada |
| `activityId` | `mission:account-lock` |
| Versão implementada | `2`; versão `1` aceita como histórica |
| Versão-alvo | `2`, publicada na demonstração local |
| Rota funcional | `/missoes/aviso-de-bloqueio` |
| Integração atual | Disponível |
| Duração estimada | 9 minutos no catálogo curricular; a tela informa 8–10 minutos |
| Pontos | 100 pontos-base; bônus de 10%, 20% ou 30% conforme desempenho; máximo de 130 na primeira conclusão |
| Competências | Observar, Investigar, Verificar, Decidir e Reportar |
| Pré-requisitos | Nenhum |
| Relações recomendadas | Alvo curricular: **Quem enviou de verdade?**, **Domínio sob a lupa** e, depois, **A conversa já estava acontecendo** |
| Radar relacionado | Opcional, pontuado por regra própria e nunca pré-requisito |
| Última conferência no código | 2026-08-15 |

O identificador permanece separado das Missões do portfólio proprietário. A atividade passa a ter um papel-alvo de fundação, mas continua fora da contagem das 22 práticas que possuem os 187 conceitos. Tentativas de `mission:account-lock` não podem ser reinterpretadas como tentativas de **A conversa já estava acontecendo** nem recalculadas pela versão sucessora.

### Mapa da implementação atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Catálogo legado | `lib/content/learning-catalog.ts` — `MAIN_MISSION_JOURNEY` | Implementado |
| Conteúdo publicado | `lib/content/activities/account-lock/v2.ts` | Pacote canônico v2 implementado |
| Identidade e regras | `lib/domain/rules.ts` — avaliadores v1 e `evaluatePhishingFoundationV2` | Implementado |
| Interface | `features/missions/PhishingFoundationMission.tsx` | Player v2 implementado e registrado |
| Estado | `lib/state/app-reducer.ts` — `MISSION_COMPLETED` histórico e `PHISHING_FOUNDATION_V2_COMPLETED` | Implementado |
| Persistência | `lib/state/persistence.ts` | Esquema local 9 e migração v8→v9 implementados |
| Seletores e integrações | `lib/state/selectors.ts` e `app/page.tsx` | Implementados |
| Testes | `tests/rendered-html.test.mjs` | Implementados para avaliação, repetição, integração, persistência e rota |
| Blueprint da versão sucessora | `documentacao/atividades/blueprints/missao--o-aviso-que-nao-podia-esperar.md` | Aprovado, implementado e validado |

## 2. Objetivo educacional

- **Comportamento esperado:** inspecionar remetente, destino e contexto antes de agir; escolher reporte ou verificação por um canal conhecido.
- **Técnica do atacante:** aviso falso de bloqueio de conta com identidade corporativa aparente e link para destino diferente.
- **Gatilhos sociais:** urgência, medo de perder acesso e autoridade de uma falsa Central de Acessos.
- **Atalho inseguro tratado:** confiar no nome, na aparência ou no prazo e abrir o botão recebido.
- **Limite da conclusão:** a nota descreve esta tentativa; não comprova retenção permanente nem garante comportamento fora do protótipo.

### 2.1 Objetivo educacional do formato-alvo

A versão 2 prepara uma pessoa sem conhecimento prévio para:

- compreender phishing como uso de identidade, contexto e pressão para induzir uma ação favorável ao atacante;
- identificar primeiro a ação pedida e a consequência possível, antes de procurar sinais técnicos;
- distinguir o contato recebido de uma fonte independente de confirmação;
- aplicar o modelo PARE: **Pare, Avalie, Reconfirme, Escale e responda**;
- admitir as saídas legítima, suspeita e inconclusiva sem transformar um indício isolado em veredito;
- reportar dúvida ou incidente cedo, com linguagem sem culpa.

Essas âncoras são uma introdução transversal e não criam novos `conceptId`s, recompensas ou propriedade curricular fora do mapa aprovado.

## 3. Implementação publicada e histórico

### 3.1 Versão 2 — fundação PARE

A versão publicada atribui automaticamente `mission:account-lock:v2:foundation-account-alert`; P1 continua apenas como identificador documental e não aparece como escolha. O funcionário recebe papel, situação, tarefa e consequência antes da primeira resposta. Em seguida:

1. identifica a ação pedida, a conta protegida e a consequência possível;
2. aplica **Pare** e **Avalie** numa estação PARE;
3. observa uma consequência inerte, sem abrir link ou formulário;
4. revisa livremente a cadeia pedido → ativo → consequência;
5. **Reconfirma** pela referência oficial conhecida e escolhe como **Escalar e responder**;
6. seleciona apenas fatos não sensíveis para o reporte;
7. transfere o processo para um alerta legítimo de expiração de senha;
8. recebe resultado privado e debrief separado.

O fluxo possui nove estados visíveis, não pontua velocidade, não usa painel de evidências, não solicita dados reais e reinicia após recarga enquanto estiver incompleto. Os pesos são 20/15/25/25/15 e a nota baixa recomenda revisão sem bloquear a jornada.

### 3.2 Versão 1 histórica — caso e fluxo

O funcionário inicia o expediente e recebe três mensagens fictícias. A mensagem avaliada apresenta-se como **Central de Acessos**, vem de `suporte@seguranca-contas.example` e ameaça bloquear a conta em 30 minutos. O botão representado aponta para `login-colaborador.example/validar`; ele não abre uma página externa.

O fluxo possui quatro etapas:

1. **Briefing:** explica o papel, os objetivos e o caráter fictício do ambiente.
2. **Investigar:** permite comparar três mensagens e abrir as verificações de remetente, link e contexto. Pelo menos duas verificações são exigidas para avançar.
3. **Decidir:** solicita uma ação principal e uma ou mais justificativas.
4. **Resultado:** apresenta nota, decisão, quantidade de verificações, contribuição privada à equipe, recompensa, debrief e próximos caminhos.

As ações são **Reportar como suspeita**, **Verificar por um canal conhecido**, **Excluir sem reportar** e **Abrir o link para conferir**. As justificativas cobrem domínio, urgência, destino e a alternativa incorreta de tratar elementos visuais como prova.

### 3.3 Modelo do caso histórico

| Elemento | Definição atual |
|---|---|
| Canal | Caixa de entrada fictícia |
| Identidade utilizada | Central de Acessos |
| Objetivo do atacante | Levar a pessoa a abrir um destino controlado e informar dados |
| Gatilhos | Bloqueio iminente e prazo de 30 minutos |
| Aparências não probatórias | Nome corporativo, assinatura e apresentação do botão |
| Evidências úteis | Domínio externo, destino diferente e ausência de manutenção prevista |
| Confirmação independente | Portal aberto por favorito ou suporte contatado por referência conhecida |
| Ação segura | Interromper, verificar e reportar pelo canal oficial |
| Efeito real | Nenhum link, mensagem ou procedimento corporativo é executado |

## 4. Formato implementado

A atividade será a entrada pedagógica da jornada. O novo fluxo deve partir de uma situação simples de aviso de conta e ensinar um processo antes de exigir análise avançada.

O desenho técnico completo está em [**O aviso que não podia esperar — fundação**](blueprints/missao--o-aviso-que-nao-podia-esperar.md). Ele foi implementado como `mission:account-lock` versão 2, na mesma rota, com pacote canônico atribuído automaticamente, estação PARE guiada, transferência legítima, pesos 20/15/25/25/15, contrato próprio e migração local v8→v9.

### 4.1 Sequência mínima

1. **Contexto:** explicar quem o funcionário representa, o que recebeu e por que precisa decidir.
2. **Pedido:** identificar o que a mensagem quer que ele faça.
3. **Consequência:** relacionar a ação a credencial, conta, dado ou acesso que pode ser afetado.
4. **PARE guiado:** pausar, avaliar a ação e o ativo, reconfirmar por fonte independente e escalar ou responder pelo processo.
5. **Investigação curta:** comparar remetente, destino e contexto sem ensinar que uma pista isolada prova fraude.
6. **Decisão:** escolher uma ação proporcional e explicar por quê em alternativas escritas em linguagem direta.
7. **Transferência:** resolver um alerta curto de aparência diferente usando o mesmo processo.
8. **Resultado e debrief:** explicar fatos, indícios, incerteza, consequência evitada e próximo laboratório recomendado.

### 4.2 Regras de interação e texto

- uma ação principal por tela;
- nenhuma escolha de P1/P2/P3 na abertura;
- um caso canônico na primeira conclusão; variações somente em repetição;
- a pergunta e as respostas devem ser compreensíveis sem depender de jargão;
- cada grupo de opções explica que decisão está sendo tomada;
- termos técnicos aparecem depois do contexto ou no debrief;
- prática guiada antes do trecho pontuado de aplicação;
- nenhuma ação, link, confirmação ou reporte real.

### 4.3 Diferença entre atual e alvo

| Aspecto | Versão 1 atual | Formato-alvo |
|---|---|---|
| Papel curricular | Piloto legado de phishing por falso bloqueio | Fundação da jornada |
| Ponto de partida | Inspeção de três mensagens e evidências | Contexto, ação pedida, consequência e PARE |
| Modelo mental | Implícito no caso | Ensinado explicitamente em linguagem simples |
| Confirmação | Uma das decisões possíveis | Hierarquia de fonte confiável ensinada e praticada |
| Avaliação | Ação, evidências e justificativas do caso | Processo seguro após prática guiada; pesos ainda a definir |
| Compatibilidade | `mission:account-lock` v1 | Versão sucessora, sem reinterpretar v1 nem duplicar recompensa |

O fluxo v1 permanece funcional até a aprovação do blueprint técnico e a conversão completa de conteúdo, contrato, avaliador, persistência, testes e integração. Esta aprovação conceitual não torna o formato-alvo disponível.

## 5. Avaliação, competências e recompensa

A nota é limitada ao intervalo de 0 a 100:

| Critério | Regra atual |
|---|---|
| Ação principal | Reportar: 40; verificar: 32; excluir: 20; abrir: 0 |
| Evidências inspecionadas | 8 pontos por evidência única, até 24 |
| Justificativas corretas | 12 pontos por domínio, urgência e destino, até 36 |
| Justificativa incorreta | −10 por tratar aparência visual como prova |

A revisão é recomendada quando a nota fica abaixo de 75 ou quando a pessoa escolhe abrir. A conclusão ocorre mesmo com nota baixa e libera a etapa seguinte no mapa legado.

As evidências de competência são derivadas para:

- Observar: quantidade de verificações;
- Investigar: nota total;
- Decidir: qualidade da ação principal;
- Reportar: pontuação máxima somente para a decisão de reportar.

A primeira conclusão cria a chave `mission:account-lock:first-completion` e concede 100 pontos-base com o bônus geral. A contribuição privada usa chave independente e vale 12, 8, 5 ou 2 pontos conforme a ação na primeira conclusão. Repetições registram nova tentativa, atualizam a última e a melhor nota e acrescentam evidências, mas não repetem recompensa nem contribuição.

Velocidade não concede pontos. O texto visível “Até 100 pontos de domínio” não descreve corretamente a recompensa de até 130 pontos gerais e precisa ser harmonizado em lote futuro.

## 6. Contrato, persistência e compatibilidade

### Resposta bruta da versão 1

| Campo | Tipo e valores permitidos |
|---|---|
| `attemptId` | `string` não vazia |
| `activityId` | `mission:account-lock` |
| `activityVersion` | `1` |
| `completedAt` | data válida |
| `decision` | `reportar`, `verificar`, `excluir` ou `abrir` |
| `inspectedEvidence` | lista de `sender`, `link` e `context` |
| `selectedReasonIds` | lista de `domain`, `urgency`, `visual` e `destination` |

O resultado calculado registra `score`, decisão, quantidade inspecionada, justificativas corretas, contribuição da tentativa, necessidade de revisão e recompensa potencial. Esses campos não devem ser aceitos como autoridade do cliente em produção.

A tentativa avaliada, o progresso, a melhor nota, a recompensa, o livro-razão, as evidências, a recomendação e o histórico são salvos no estado local. O envelope atual é `mvp-local-v9`; a migração v8→v9 preserva tentativas antigas e o estado inválido segue para quarentena.

Uma mudança semântica de opções ou pesos exige nova versão da atividade. Uma mudança na união persistida exige análise explícita do esquema. Nunca recalcular uma tentativa v1 com um avaliador futuro.

## 7. Integrações

- aparece na jornada principal legada e possui rota direta; no alvo, antecede as 22 atividades proprietárias como fundação;
- atualiza pontos, nível, competências, conquistas, histórico e atividade recente;
- pode criar recomendação opcional para `phishlab:link-analyzer`;
- registra contribuição privada à equipe; a futura mudança de posição curricular não deve duplicar essa contribuição;
- permite abrir Missões, PhishLab e Meu perfil a partir do resultado;
- não depende do Radar, Arcade ou Painel de gestão.

O resultado informa que **Entrega por QR Code** foi liberada, mas essa Missão ainda não tem player. A interface precisa continuar tratando-a como conteúdo planejado, sem sugerir que já existe uma experiência funcional.

## 8. Privacidade e backend

Resposta, nota, justificativas, evidências e revisão são pessoais. A equipe recebe somente a contribuição permitida, sem a resposta nominal. O armazenamento no navegador é demonstrativo e pode ser alterado pelo usuário; não serve para uso corporativo real.

Antes do uso real, o backend deve autenticar e autorizar, selecionar a versão permitida, validar a resposta por allowlist, calcular resultado e competências, confirmar recompensa e contribuição de forma idempotente e persistir tudo transacionalmente. Nenhum botão pode afirmar que abriu portal, reportou mensagem ou contatou suporte real sem integração corporativa autorizada.

## 9. Acessibilidade desktop

O fluxo atual utiliza botões reais, rádio, caixas de seleção, `fieldset`, `legend`, progresso por etapas e mensagens de erro. A execução não depende de arrastar nem de cronômetro. A validação manual completa ainda deve confirmar:

- ordem e retorno de foco entre as quatro etapas;
- leitura do estado das evidências e da mensagem ativa por tecnologia assistiva;
- compreensão sem depender apenas de cor ou símbolos;
- teclado completo, contraste, texto ampliado e movimento reduzido;
- permanência do contexto quando uma validação falha.

O escopo atual é desktop; suporte específico a celular permanece fora desta etapa.

## 10. Testes e critérios de aceite

Os testes existentes cobrem contrato v2 válido e inválido, nota 100 e parcelas, revisão, recomendação do PhishLab, repetição e coexistência v1/v2 sem nova recompensa ou contribuição, perfil, persistência, migração v8→v9, rota SSR e fluxo completo por teclado no Chromium.

Validações concluídas nesta conversão:

- lint, build e 23 testes de domínio, estado, persistência e SSR;
- cinco cenários Playwright em Chromium, incluindo teclado, foco, alto contraste, texto extra grande e movimento reduzido;
- `git diff --check` e typecheck sem regressão relativa ao baseline externo do projeto.

## 11. Fora de escopo, pendências e riscos

- revisão editorial futura dos textos pela organização antes do uso real;
- validação manual adicional com usuários finais e leitor de tela dedicado;
- evitar que a liberação de um card planejado seja confundida com player disponível;
- não criar integração real de e-mail, reporte ou conta neste protótipo;
- não incorporar Arcade nem iniciar Painel de gestão;
- manter backend autoritativo obrigatório antes do uso real.

## 12. Histórico

| Data | Registro |
|---|---|
| Implementação inicial | Versão 1 criada como Missão piloto do MVP local. |
| Lotes posteriores | Recompensa idempotente, competências, recomendações, perfil, atividade recente e persistência foram conectados. |
| 2026-08-11 | Inventário confirmou que a atividade permanece funcional, porém fora do novo percurso de sete atividades. |
| 2026-08-11 | Documento individual criado sem inventar formato-alvo. |
| 2026-08-15 | Aprovado o novo papel de fundação, com modelo mental de phishing, ação e consequência, fonte independente e PARE; implementação permanece pendente. |
| 2026-08-15 | Blueprint técnico v2 criado com pacote único, aplicação legítima, contrato, avaliação e compatibilidade; aguardando aprovação específica. |
| 2026-08-15 | Versão 2 aprovada, implementada e validada; versão 1 preservada, esquema local elevado a 9 e primeira sequência curricular atualizada. |
| 2026-08-15 | A navegação visual foi corrigida para resumir Concluído, Agora e A seguir; enunciados e justificativas ganharam o contexto explícito do aviso de bloqueio e da Área oficial, sem mudança semântica do contrato v2. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
