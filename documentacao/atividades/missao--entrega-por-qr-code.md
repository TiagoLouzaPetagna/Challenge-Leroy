# Missão — Entrega por QR Code

> **Estado atual:** planejada no catálogo legado; não possui player.
> **Formato-alvo:** não definido.

## 1. Identidade

| Campo | Valor atual |
|---|---|
| Área | Missões |
| Percurso | Jornada principal legada, posição 2; fora de **Confiança sob pressão** |
| `activityId` | `mission:delivery-qr` |
| Versão | A definir |
| Slug catalogado | `entrega-por-qr-code` |
| Rota funcional | Não existe |
| Integração | Planejada; card visível e não jogável |
| Duração estimada | 9 minutos no catálogo |
| Pontos | A definir |
| Competências indicadas | Observar, Verificar e Decidir |
| Pré-requisito legado | `mission:account-lock` |
| Radar relacionado | Quishing é citado historicamente, mas o vínculo não está formalizado neste catálogo |

A URL `/missoes/entrega-por-qr-code` é alcançada pelo catch-all do Next.js, porém `app/page.tsx` não a reconhece como player e apresenta o hub de Missões. Ela não deve ser documentada como rota funcional.

### Mapa atual

| Responsabilidade | Arquivo | Situação |
|---|---|---|
| Card e metadados | `lib/content/learning-catalog.ts` | Planejado |
| Hub | `features/missions/MissionsHub.tsx` | Exibe conteúdo em produção |
| Player | Ausente | Não implementado |
| Avaliador | Ausente | Não implementado |
| Contrato e persistência | Ausentes | Não implementados |
| Rota exclusiva | Ausente | Não implementada |
| Testes da atividade | Ausentes | Não implementados |

## 2. Objetivo educacional

O resumo catalogado propõe avaliar um pedido de reagendamento de entrega que tenta conduzir a pessoa a um QR Code suspeito. O comportamento observável esperado é interromper o impulso, verificar o contexto da entrega e examinar o destino por uma rota segura antes de decidir.

Ainda não estão definidos o atacante, a narrativa completa, o canal, o conjunto de evidências, a confirmação independente, a ação de reporte nem a recuperação. O conceito não deve ensinar que todo QR Code é malicioso; deve diferenciar uso legítimo, situação inconclusiva e tentativa de phishing.

## 3. Implementação atual

Existe somente um registro de catálogo com título, subtítulo, resumo, competências, duração, ordem e pré-requisito. O botão permanece desativado porque `playableInMvp` é `false`.

Não há briefing, QR Code representado, inspeção, decisão, debrief, tentativa, nota, ponto, progresso ou histórico. Abrir o hub ou uma URL dinâmica não conclui a Missão e não concede recompensa.

## 4. Formato-alvo

**Não definido.** Nenhuma das reformulações aprovadas para as sete atividades de **Confiança sob pressão** foi atribuída a este card legado.

Antes de desenhar telas, será necessário decidir se a atividade continua no catálogo, se passa a outro percurso ou se seu tema será coberto por **Domínio sob a lupa** e pelo Radar de Quishing. Essa decisão não pode apagar o registro histórico do card.

## 5. Conteúdo e fluxo a definir

Os únicos elementos vigentes são:

- contexto geral de reagendamento de entrega;
- uso de QR Code como possível ocultação de destino;
- foco em Observar, Verificar e Decidir;
- duração editorial de 9 minutos.

Continuam a definir: identidade usada, pedido exato, gatilhos sociais, evidências, casos legítimos de comparação, confirmação independente, etapas, ferramentas, condições de avanço, feedback, resultado e navegação posterior.

Todos os exemplos futuros deverão usar domínios reservados, QR Codes inertes e dados fictícios. O protótipo não pode abrir a câmera, ler códigos reais ou navegar para destinos externos.

## 6. Avaliação e recompensa

**A definir.** A regra transversal vigente usa 100 pontos-base para Missões principais implementadas, mas este item não declara recompensa própria e não possui versão ou avaliador. Este documento não transforma a regra geral em contrato da atividade.

Uma especificação futura deverá estabelecer pesos, crédito parcial, controles críticos, condição de revisão, competências, chave única e comportamento de repetição. Velocidade não deverá conceder pontos sem decisão explícita.

## 7. Contrato, persistência e compatibilidade

Não existem resposta bruta, resultado, tentativa ou progresso próprios. `MissionSubmission` não deve ser adotado automaticamente, pois a mecânica ainda não foi definida.

Quando a atividade for implementada, serão obrigatórios:

- `activityVersion` publicada;
- rota exclusiva que não caia no hub;
- catálogo de IDs permitidos;
- avaliador determinístico;
- persistência e validação estrutural;
- recompensa e contribuição idempotentes;
- análise de migração do esquema local;
- preservação de qualquer progresso anterior sem criar conclusões artificiais.

## 8. Integrações

O mapa legado considera a Missão liberada após a conclusão do piloto. Atualmente isso significa apenas que o card deixa de estar bloqueado; ele continua “conteúdo em produção”. O documento principal menciona historicamente o Radar de Quishing como apoio opcional, mas o novo contrato curricular ainda não inclui esta atividade.

Perfil, atividade recente, conquistas, pontos, competências e Equipes não recebem qualquer registro desta Missão enquanto não houver conclusão funcional.

## 9. Privacidade e backend

Hoje nenhum dado de resposta é coletado. Uma implementação futura deverá manter respostas e notas privadas e compartilhar somente agregado permitido. Câmera, QR Code real, localização, pedido de entrega, contato de fornecedor e reporte corporativo não podem ser simulados como efetuados.

Antes do uso real, o backend autoritativo deverá publicar conteúdo e versão, autorizar público, validar resposta, calcular resultado, impedir duplicidades, persistir e auditar conforme política.

## 10. Acessibilidade desktop

Requisitos para uma futura experiência:

- alternativa textual integral ao QR Code;
- destino representado como texto segmentável e copiável apenas quando seguro;
- nenhuma dependência de câmera, cor, tamanho ou percepção visual fina;
- teclado, foco previsível, contraste e texto ampliado;
- ausência de cronômetro;
- feedback que diferencie suspeito de inconclusivo sem linguagem punitiva.

Celular permanece fora do escopo atual.

## 11. Testes e critérios de disponibilidade

A atividade só poderá mudar para disponível depois de testes de rota, catálogo, contrato, avaliador integral/parcial/inseguro, IDs inválidos, repetição, recompensa, persistência, privacidade, integrações e acessibilidade desktop. Um teste deve confirmar que a rota exibe o player correto em vez do hub.

O estado atual deve continuar testável como card desativado que não cria progresso ou pontos.

## 12. Pendências e histórico

- decidir se o conceito permanece no portfólio;
- definir formato, identidade, versão, rota e recompensa;
- eliminar a queda silenciosa de uma eventual URL para o hub antes da publicação;
- alinhar a relação com Quishing e Domínio sob a lupa sem repetir a mesma mecânica.

| Data | Registro |
|---|---|
| Planejamento inicial | Card incluído na jornada principal legada como segunda Missão. |
| 2026-08-11 | Confirmado que não há player, versão ou recompensa formalizada. |
| 2026-08-11 | Documento criado como especificação de conceito planejado. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
