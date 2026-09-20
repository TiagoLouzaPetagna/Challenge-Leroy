# Simulação — Central de mensagens

> **Estado atual:** conceito planejado, exibido somente como card local.
> **Formato-alvo:** não definido.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | Simulações |
| Percurso | Fora do primeiro percurso aprovado |
| `activityId` | A definir |
| Identificador local do card | `message-center` — não é contrato público |
| Versão | A definir |
| Rota funcional | Não existe |
| Integração atual | Planejada; somente card “Em produção” |
| Quantidade indicada | 5 conversas |
| Dificuldade indicada | Intermediária |
| Duração estimada | A definir |
| Pontos | A definir |
| Competências | A definir |
| Pré-requisitos e relações | A definir |
| Última conferência no código | 2026-08-11 |

Não existe `simulation:message-center`, slug publicado ou versão. O identificador `message-center` serve apenas como chave do array local do hub. A URL hipotética `/simulacoes/central-de-mensagens` é capturada por `/simulacoes/[id]`, mas apresenta o hub porque não há discriminador de player em `app/page.tsx`.

### Mapa atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Card local | `features/simulations/SimulationExperience.tsx` — pacote `message-center` | Planejado |
| Hub | `features/simulations/SimulationExperience.tsx` — `SimulationsHub` | Implementado para o catálogo |
| Catálogo versionado | Ausente | Não implementado |
| Player e rota exclusiva | Ausentes | Não implementados |
| Contrato, avaliador e estado | Ausentes | Não implementados |
| Persistência e testes específicos | Ausentes | Não implementados |

## 2. Objetivo educacional

O card propõe praticar personificação e confirmação por outro canal em conversas de gestores, colegas e suporte. A habilidade central deverá ser distinguir identidade aparente, pedido esperado e necessidade de verificação independente sem classificar automaticamente todo contato incomum como fraude.

- **Comportamento observável esperado:** tratar conversas legítimas, suspeitas e inconclusivas de forma proporcional.
- **Técnicas possíveis:** personificação, conta comprometida, troca de número e falso suporte — conjunto final a definir.
- **Atalho inseguro:** confiar no nome, foto, cargo ou histórico da conversa.
- **Limite:** desempenho no pacote não prova retenção ou capacidade de reconhecer todas as variantes.

## 3. Implementação atual

O hub exibe o título, um resumo, “5 conversas · Intermediário” e o botão desativado “Conteúdo futuro”. Não existem conversas, mensagens, evidências, ações, feedback, resultado ou debrief.

Visualizar o card ou abrir uma URL dinâmica não registra tentativa, progresso, pontos, competências ou atividade recente.

## 4. Formato-alvo

**Não definido.** A aprovação de triagem em lote para **Uma manhã comum** não se aplica automaticamente a Central de mensagens. Esta simulação precisa de uma identidade própria antes de ser implementada.

Possíveis diferenças a decidir incluem conversa ramificada, comparação entre canais ou sequência de contatos, mas nenhuma delas está aprovada neste documento. O formato deve preservar a função de Simulação: ambiente com múltiplas situações e feedback não antecipado quando estiver em modo normal.

## 5. Modelo do pacote a definir

| Elemento | Situação |
|---|---|
| Canais | Conversas; aplicativos e apresentação exata a definir |
| Identidades | Gestores, colegas e suporte, sempre fictícios |
| Quantidade | Cinco conversas indicadas no card |
| Mistura de casos | Legítimos, maliciosos e inconclusivos a definir |
| Objetivos dos atacantes | A definir por conversa |
| Gatilhos sociais | Autoridade, familiaridade, urgência e ajuda podem aparecer; seleção final a definir |
| Evidências | Endereço, origem do contato, contexto e processo esperado; conteúdo final a definir |
| Ações | A definir |
| Confirmação independente | Canal conhecido fora da conversa, conforme o caso |
| Reporte e recuperação | A definir |

O pacote deverá usar nomes, números, endereços e organizações fictícios ou mascarados. Nenhum chat, telefone ou suporte real será acionado.

## 6. Fluxo e regras de interação

**A definir.** Uma futura especificação deve esclarecer:

1. como as cinco conversas chegam e se desenvolvem;
2. se a pessoa pode retornar a itens inconclusivos;
3. quais ferramentas de investigação estão disponíveis;
4. quais ações são possíveis por conversa;
5. quando o feedback é revelado;
6. como o resultado reproduz o raciocínio sem expor resposta durante o pacote;
7. como retomada e repetição funcionam.

Não deve existir cronômetro como fonte de pontuação. A interface não pode transformar “responder rápido” em sinal de competência.

## 7. Avaliação, competências e recompensa

**A definir.** A regra geral das Simulações implementadas utiliza 70 pontos-base, mas este card não possui recompensa, versão ou avaliador; o valor não é formalizado para Central de mensagens.

Uma avaliação futura deverá distinguir ação correta, qualidade da investigação, falsos positivos e confirmação independente. Classificar todas as conversas como phishing não pode produzir bom resultado. Pesos, nota de revisão, competências, pontos, bônus, chave única e contribuição coletiva permanecem a definir.

## 8. Contrato, persistência e compatibilidade

Não existe contrato. `SimulationSubmission` atualmente representa decisões por mensagem do pacote **Uma manhã comum**; ele não deve ser adotado antes de saber se Central de mensagens terá conversas ramificadas ou outro modelo.

Antes da publicação, definir:

- `activityId`, versão e slug estáveis;
- IDs e ordem determinística das conversas;
- resposta bruta validada por allowlist;
- avaliador e resultado derivados;
- idempotência de tentativa, recompensa e contribuição;
- persistência de progresso, última e melhor nota;
- migração explícita se a união persistida mudar;
- compatibilidade com tentativas de `simulation:workday`.

O card existente não gera migração nem conclusão.

## 9. Integrações

Hoje a única integração é visual no hub de Simulações. Não existe vínculo no currículo, Radar, Perfil ou recomendações. Quando implementada, a atividade poderá ser recomendada por dificuldades de identidade ou confirmação, mas não deverá bloquear a jornada principal.

Pontos, competências, conquistas, histórico, atividade recente e agregado de Equipes somente mudam após conclusão válida. Navegação e inspeção não concedem recompensa.

## 10. Privacidade, segurança e backend

Conversas, decisões, evidências, nota e feedback serão privados. A equipe poderá receber somente dados agregados autorizados. O protótipo não deve coletar histórico real de mensagens, agenda, números, contatos ou credenciais.

Antes do uso real, o backend autoritativo deverá publicar o pacote, selecionar versão e público, validar respostas, calcular resultado, confirmar recompensa e contribuição, persistir, auditar e aplicar retenção. Integrações reais de chat ou suporte estão fora deste conceito.

## 11. Acessibilidade desktop

Uma futura central deverá oferecer:

- lista e conteúdo das conversas com nomes acessíveis e posição anunciada;
- histórico textual preservado quando novas mensagens aparecem;
- operação integral por teclado e foco previsível;
- estados não dependentes apenas de cor, avatar ou ícone;
- contraste, texto ampliado e movimento reduzido;
- possibilidade de revisar itens sem limite de tempo;
- alternativa textual a qualquer mídia futura.

Celular permanece fora do escopo atual.

## 12. Testes e critérios de disponibilidade

Antes de disponibilizar, testar rota exclusiva sem queda no hub, composição das cinco conversas, contrato, ações e IDs inválidos, caminhos integral/parcial/inseguro, falsos positivos, repetição, persistência, recompensa, privacidade, integrações e acessibilidade desktop. O console deve permanecer sem erros.

Enquanto planejada, o teste adequado é o card desativado que não cria atividade educativa.

## 13. Pendências e histórico

- definir se o conceito continua necessário após a evolução de **Uma manhã comum**;
- aprovar mecânica distinta, casos, competências e dificuldade;
- formalizar ID, versão, rota, duração e pontos;
- decidir como representar conversa comprometida sem revelar a resposta cedo;
- fechar contrato e impacto no esquema local.

| Data | Registro |
|---|---|
| MVP local | Card `message-center` incluído como segundo pacote futuro. |
| 2026-08-11 | Confirmada a ausência de ID formal, player, versão e recompensa. |
| 2026-08-11 | Documento individual criado sem antecipar mecânica. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
