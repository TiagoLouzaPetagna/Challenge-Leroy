# Missão — Pedido urgente de um gestor

> **Estado atual:** planejada no catálogo legado; não possui player.
> **Formato-alvo:** não definido.

## 1. Identidade

| Campo | Valor atual |
|---|---|
| Área | Missões |
| Percurso | Jornada principal legada, posição 3; fora de **Confiança sob pressão** |
| `activityId` | `mission:urgent-manager-request` |
| Versão | A definir |
| Slug catalogado | `pedido-urgente-do-gestor` |
| Rota funcional | Não existe |
| Integração | Planejada; card visível e não jogável |
| Duração estimada | 10 minutos no catálogo |
| Pontos | A definir |
| Competências indicadas | Investigar, Verificar, Decidir e Reportar |
| Pré-requisito legado | `mission:delivery-qr` |
| Radar relacionado | A definir |

A URL `/missoes/pedido-urgente-do-gestor` pode ser resolvida pelo catch-all, mas atualmente apresenta o hub. Isso não constitui rota própria nem player.

### Mapa atual

| Responsabilidade | Arquivo | Situação |
|---|---|---|
| Card e metadados | `lib/content/learning-catalog.ts` | Planejado |
| Hub | `features/missions/MissionsHub.tsx` | Exibe conteúdo em produção |
| Player, contrato e avaliador | Ausentes | Não implementados |
| Persistência e integrações | Ausentes | Não implementadas |
| Testes específicos | Ausentes | Não implementados |

## 2. Objetivo educacional

O resumo propõe reconhecer personificação, pressão e falsa autoridade antes de atender a um pedido fora do processo. O funcionário deverá investigar o contexto, confirmar a identidade por outro canal e preservar o procedimento mesmo quando o pedido pareça vir de uma liderança.

O conceito deve evitar dois erros: ensinar que toda solicitação urgente de gestor é fraude e tratar um endereço conhecido como prova suficiente. A resposta segura depende da natureza do pedido, do processo esperado e da confirmação independente.

## 3. Implementação atual

Somente o card de catálogo existe. Não foram definidos nome do gestor, canal, pedido, contexto, evidências, decisões, consequência, reporte, resultado ou debrief. `playableInMvp` está `false`.

Não há rota funcional, tentativa, progresso, nota ou pontos. O estado de bloqueio pode mudar conforme a sequência legada, mas um card desbloqueado continua não jogável.

## 4. Formato-alvo

**Não definido.** O console reativo aprovado para **Você iniciou este acesso?** e a estação de processo aprovada para **Mudança bancária sem atalho** não devem ser copiados automaticamente para este conceito.

Uma futura decisão poderá explorar conversa ramificada, verificação de autoridade ou comparação de processo, desde que a mecânica seja aprovada e não repita uma atividade existente. Nenhuma dessas alternativas é contrato vigente.

## 5. Conteúdo e fluxo a definir

Já estão registrados somente:

- personificação de gestor;
- pressão e falsa autoridade;
- pedido fora do processo;
- competências Investigar, Verificar, Decidir e Reportar;
- duração editorial de 10 minutos.

Precisam ser definidos identidade, objetivo do atacante, tipo de solicitação, canal, sinais úteis, aparência enganosa, fonte de contato conhecida, ação segura, reporte, consequências e recuperação. Voz e vídeo não devem ser incorporados sem os critérios de qualidade e acessibilidade do documento principal.

## 6. Avaliação e recompensa

**A definir.** Embora Missões principais implementadas usem atualmente 100 pontos-base, o card não formaliza pontos, chave de recompensa, pesos ou bônus. A futura especificação deverá distinguir:

- verificação independente;
- preservação do processo;
- decisão proporcional;
- reporte quando houver possível personificação;
- crédito parcial sem premiar obediência insegura.

Velocidade não concede pontos salvo decisão futura explícita.

## 7. Contrato e persistência

Não há contrato de resposta, avaliador, tentativa ou resultado. Um futuro player deverá publicar versão e rota próprias, validar IDs por allowlist, calcular no servidor e registrar progresso, melhor nota, última tentativa, recompensa e contribuição sem duplicidade.

Não é correto encaixar o caso no `MissionSubmission` atual antes de definir sua mecânica. Mudanças na união persistida exigirão análise de `APP_SCHEMA_VERSION`; tentativas antigas não podem ser fabricadas a partir do card.

## 8. Integrações

No mapa legado, depende de **Entrega por QR Code** e antecede **Documento inesperado**. Como a atividade anterior também não possui player, esta cadeia não representa uma sequência executável completa.

O Radar de falso gestor é tematicamente compatível no novo catálogo, mas qualquer vínculo deverá permanecer opcional e ser formalizado no catálogo da atividade. Perfil, histórico, pontos, competências, conquistas e Equipes não são alterados pela mera visualização do card.

## 9. Privacidade e backend

Nenhuma resposta é coletada hoje. Uma futura experiência deverá usar nomes e endereços fictícios, não efetuar mensagens, chamadas, pagamentos ou reportes e manter a resposta individual privada.

O backend autoritativo será obrigatório para autoria e publicação, autorização, idempotência, cálculo, persistência, auditoria e agregação. Pedidos reais de gestores ou dados organizacionais não devem ser usados sem governança explícita.

## 10. Acessibilidade desktop

Qualquer conversa, diretório ou processo futuro deverá ser operável por teclado, possuir ordem de foco coerente, textos equivalentes a sinais visuais, contraste, texto ampliado e movimento reduzido. Se houver diálogo ramificado, as mudanças precisam ser anunciadas sem apagar o histórico. Não haverá pontuação por rapidez.

Celular e mídia audiovisual permanecem fora do escopo até lotes próprios.

## 11. Testes e disponibilidade

Antes de publicar: testar rota exclusiva, catálogo, versão, contrato, avaliador, caminhos seguro/parcial/inseguro, payload inválido, repetição, persistência, recompensa, privacidade, integrações, SSR e acessibilidade desktop. O teste deve impedir que a rota caia silenciosamente no hub.

Enquanto planejada, deve haver somente teste de apresentação honesta do card, ação desativada e ausência de progresso ou recompensa.

## 12. Pendências e histórico

- definir se permanece na jornada ou migra para outro percurso;
- escolher uma mecânica distinta das sete já aprovadas;
- formalizar cenário, versão, rota, pontos e Radar relacionado;
- decidir como a cadeia legada será apresentada sem sugerir players inexistentes.

| Data | Registro |
|---|---|
| Planejamento inicial | Card incluído como terceira Missão da jornada legada. |
| 2026-08-11 | Confirmado que o conceito não possui contrato, versão ou rota funcional. |
| 2026-08-11 | Documento individual criado sem antecipar mecânica. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
