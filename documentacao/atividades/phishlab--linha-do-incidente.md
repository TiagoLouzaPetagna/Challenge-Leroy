# PhishLab — Linha do Incidente

> **Estado atual:** conceito planejado, exibido somente como card local.
> **Formato-alvo:** há uma descrição conceitual de ordenação e resposta, mas o player ainda não foi aprovado.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | PhishLab |
| Percurso | Fora do primeiro percurso aprovado |
| `activityId` | A definir |
| Identificador local do card | `incident-line` — não é contrato público |
| Versão | A definir |
| Rota funcional | Não existe |
| Integração atual | Planejada; somente card “Em produção” |
| Duração estimada | A definir |
| Pontos | A definir |
| Competência indicada | Recuperar |
| Pré-requisitos | A definir |
| Relações recomendadas | Historicamente relacionada a resposta após incidente; vínculo formal a definir |
| Última conferência no código | 2026-08-11 |

Não existe `phishlab:incident-line`, versão ou slug publicados. A URL hipotética `/phishlab/linha-do-incidente` cai no hub e não constitui rota funcional.

### Mapa atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Card local | `features/phishlab/PhishLabExperience.tsx` — item `incident-line` | Planejado |
| Descrição conceitual | `DOCUMENTACAO-PLATAFORMA.md`, seção 8.4 | Documentada historicamente |
| Player, rota e catálogo versionado | Ausentes | Não implementados |
| Avaliador, contrato e persistência | Ausentes | Não implementados |
| Testes específicos | Ausentes | Não implementados |

## 2. Objetivo educacional

Ensinar a reconstruir o que aconteceu após uma interação suspeita, identificar o que pode ter sido exposto e ordenar contenção, reporte e recuperação sem esconder o incidente ou executar medidas desproporcionais.

- **Comportamento observável:** diferenciar abertura, clique, credencial, aprovação e outros efeitos; preservar fatos e acionar a resposta adequada.
- **Técnica tratada:** phishing que já produziu uma interação e exige resposta posterior.
- **Atalho inseguro:** apagar evidências, esperar sinais ou tentar resolver tudo sozinho.
- **Limite:** ordenar um caso curado não comprova capacidade de resposta a todo incidente real.

## 3. Implementação atual

O hub exibe somente o card “Organize acontecimentos depois de uma interação e pratique a ordem correta de contenção e reporte”, com meta “Resposta ao incidente · Recuperar”. O botão está desativado.

Não há eventos, linha temporal, ações, resposta, feedback, tentativa, nota ou recompensa. A atividade não repete nem consome os dados da Missão **Cliquei. E agora?**.

## 4. Formato conceitual existente

O documento-mãe sugere apresentar eventos desorganizados, como:

- mensagem recebida;
- link aberto;
- senha inserida;
- alerta percebido;
- conta desconectada;
- reporte realizado.

O funcionário organizaria os acontecimentos, identificaria a exposição, escolheria a ordem das ações de recuperação e definiria quem deve ser comunicado.

Essa descrição não resolve ainda quantos casos existirão, quais ordens alternativas serão aceitas, como separar fato de hipótese, quais medidas dependem do tipo de exposição ou como o resultado será calculado. Também não autoriza integrar sistemas reais.

## 5. Relação com Cliquei. E agora?

`mission:clicked-now-what` já implementa uma Missão de resposta proporcional com quatro caminhos. Linha do Incidente só fará sentido se oferecer uma prática laboratorial distinta, centrada na reconstrução temporal e nas relações entre evento, exposição e ação.

A futura especificação deverá evitar duplicar o montador de resposta aprovado para a Missão. Uma possibilidade conceitual é usar múltiplos eventos fora de ordem e hipóteses concorrentes, mas isso ainda precisa ser decidido.

## 6. Fluxo e conteúdo a definir

Precisam ser formalizados:

- cenário e canal;
- conjunto de artefatos e eventos;
- estados de exposição possíveis;
- relações temporais obrigatórias e ordens equivalentes;
- ações imediatas, posteriores e inadequadas;
- canal de reporte representado;
- feedback e debrief;
- retomada e repetição.

O conteúdo deverá usar somente dados fictícios. Nenhuma senha, sessão, conta, dispositivo ou reporte real será acessado.

## 7. Avaliação, competências e recompensa

**A definir.** Não há pontos formalizados. A regra geral de 60 pontos-base dos PhishLabs disponíveis não é automaticamente aplicada a este card.

Uma avaliação futura deverá considerar relações corretas, identificação do que ocorreu, resposta proporcional e reporte sem segredos. Não deverá exigir uma sequência artificial única quando duas ações forem equivalentes, nem dar pontos por velocidade. Pesos, crédito parcial, revisão, competência, recompensa e contribuição continuam a definir.

## 8. Contrato, persistência e compatibilidade

Não existe resposta bruta. A mecânica de ordenação não cabe automaticamente no `PhishLabSubmission` atual.

Uma implementação futura provavelmente precisará representar IDs de eventos, ordem ou relações, exposição inferida, ações escolhidas e reporte. A forma exata ainda não é normativa. Antes da publicação será necessário:

- definir `activityId`, versão e rota;
- validar conjunto, unicidade e relações entre eventos;
- aceitar ordens equivalentes quando pedagogicamente corretas;
- derivar nota e feedback no avaliador;
- preservar tentativas antigas de outras atividades;
- analisar incremento do esquema local;
- manter recompensa e tentativa idempotentes.

## 9. Integrações

Hoje existe apenas o card no PhishLab. O vínculo histórico com **Cliquei. E agora?** não cria recomendação, progresso ou botão funcional. Quando implementada, a atividade poderá reforçar Recuperar sem avançar a jornada principal nem bloquear outras atividades.

Perfil, atividade recente, pontos, conquistas e competências só devem mudar após conclusão válida. Equipes recebe no máximo contribuição agregada permitida. Radar permanece opcional.

## 10. Privacidade, segurança e backend

A linha montada, as hipóteses, ações, nota e feedback devem permanecer privados. Nenhum segredo deve ser solicitado como parte do reporte. O protótipo não pode afirmar que encerrou sessão, trocou senha, isolou dispositivo ou notificou Segurança.

Antes do uso real, o backend autoritativo deverá selecionar a versão, validar a resposta, calcular nota e competências, conceder recompensa uma vez, persistir, auditar e aplicar retenção. Procedimentos de incidente precisam ser publicados por responsáveis autorizados.

## 11. Acessibilidade desktop

A ordenação não poderá depender apenas de arrastar:

- selecionar evento e usar Mover antes, Mover depois, Subir e Descer;
- anunciar posição e alteração por tecnologia assistiva;
- oferecer leitura linear da linha temporal;
- representar relações e estados também por texto, nunca somente por setas ou cor;
- manter teclado, foco previsível, contraste, texto ampliado e movimento reduzido;
- não usar cronômetro.

Celular permanece fora do escopo atual.

## 12. Testes e critérios de disponibilidade

Antes de disponibilizar, testar rota exclusiva, catálogo de eventos, ordens válidas equivalentes, relações inválidas, duplicados, casos integral/parcial/inseguro, repetição, persistência, recompensa, privacidade, integrações e operação sem arrastar. Testes devem provar que a rota não cai no hub e que nenhum efeito corporativo real acontece.

Enquanto planejada, o card deve permanecer desativado e não produzir progresso.

## 13. Pendências e histórico

- definir se permanece necessária após a reformulação de **Cliquei. E agora?**;
- aprovar mecânica, casos e critérios de equivalência temporal;
- formalizar ID, versão, rota, duração e pontos;
- definir contrato e impacto no esquema;
- validar procedimentos com responsáveis de segurança;
- garantir alternativa completa a arrastar.

| Data | Registro |
|---|---|
| Planejamento inicial | Linha do Incidente descrita como estação inicial do PhishLab. |
| MVP local | Card `incident-line` adicionado ao hub como conteúdo em produção. |
| 2026-08-11 | Confirmada a ausência de ID formal, player e persistência. |
| 2026-08-11 | Documento individual criado sem inventar versão ou recompensa. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
