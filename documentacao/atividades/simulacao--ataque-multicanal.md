# Simulação — Ataque multicanal

> **Estado atual:** conceito planejado, exibido somente como card local.
> **Formato-alvo:** não definido.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | Simulações |
| Percurso | Fora do primeiro percurso aprovado |
| `activityId` | A definir |
| Identificador local do card | `multichannel` — não é contrato público |
| Versão | A definir |
| Rota funcional | Não existe |
| Integração atual | Planejada; somente card “Em produção” |
| Estrutura indicada | Caso conectado |
| Dificuldade indicada | Avançada |
| Duração estimada | A definir |
| Pontos | A definir |
| Competências | A definir |
| Pré-requisitos e relações | A definir |
| Última conferência no código | 2026-08-11 |

Não existe `simulation:multichannel`, slug ou versão publicados. `/simulacoes/ataque-multicanal` cairia no hub e não é rota funcional.

O “Desafio integrador multicanal” citado numa jornada histórica do documento-mãe não deve ser tratado automaticamente como esta mesma atividade. A seção 32 substituiu a quantidade e os temas fixos daquela jornada. Qualquer reaproveitamento exige decisão explícita.

### Mapa atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Card local | `features/simulations/SimulationExperience.tsx` — pacote `multichannel` | Planejado |
| Hub | `features/simulations/SimulationExperience.tsx` | Implementado para o catálogo |
| Catálogo versionado e player | Ausentes | Não implementados |
| Rota, avaliador e contrato | Ausentes | Não implementados |
| Persistência e testes específicos | Ausentes | Não implementados |

## 2. Objetivo educacional

O resumo propõe acompanhar um mesmo incidente por e-mail, mensagem, QR Code e página de confirmação. A aprendizagem esperada é analisar a cadeia completa, perceber como confiança e contexto migram entre canais e confirmar o pedido de forma independente.

- **Comportamento observável:** correlacionar eventos sem assumir que a mudança de canal confirma identidade.
- **Técnica do atacante:** encadeamento de pretexto, contato e destino em vários meios.
- **Atalho inseguro:** confiar no segundo canal porque ele parece confirmar o primeiro.
- **Limite:** o resultado descreve a resposta a um caso curado, não domínio definitivo de ataques multicanais.

## 3. Implementação atual

Existe apenas um card com o texto “Um mesmo incidente se desenvolve por e-mail, mensagem, QR Code e página de confirmação” e a meta “Caso conectado · Avançado”. O botão está desativado.

Não há artefatos, progressão, decisão, feedback, contrato, tentativa, nota ou pontos. Nenhum canal real é acessado.

## 4. Formato-alvo

**Não definido.** Um caso conectado poderá usar linha temporal, alternância de aplicativos, painel de evidências ou conversa ramificada, mas nenhuma dessas mecânicas foi aprovada para este pacote.

O desenho futuro deverá ser diferente de uma sequência de perguntas iguais em quatro aparências. Cada canal precisa acrescentar uma função pedagógica: origem do pretexto, pressão, ocultação do destino ou tentativa de captura. O conhecimento indispensável deve estar dentro da Simulação e não depender de Radar.

## 5. Modelo de conteúdo a definir

| Elemento | Situação |
|---|---|
| Contexto profissional | A definir |
| Identidade e relação usadas | A definir |
| Canais | E-mail, mensagem, QR Code e página representada |
| Objetivo do atacante | A definir |
| Gatilhos sociais | A definir; podem incluir continuidade, urgência e autoridade |
| Disfarces técnicos | QR Code, destino e página imitadora — detalhes a definir |
| Evidências | Metadados e relações entre canais a definir |
| Confirmação independente | Deve sair de toda a cadeia controlada pelo pedido |
| Ação segura | A definir por etapa e para o caso completo |
| Reporte e recuperação | A definir |

Todos os canais serão representações fictícias. QR Codes devem ser inertes, endereços devem usar `.example` e páginas não podem coletar dados.

## 6. Fluxo e interação

**A definir.** A especificação futura deverá resolver:

1. ordem e condições de liberação dos canais;
2. quais eventos são simultâneos ou dependentes;
3. como a pessoa investiga e relaciona evidências;
4. como toma ações sem receber feedback antecipado;
5. como pode revisar a cadeia antes de concluir;
6. como o debrief reproduz o caminho e o efeito das decisões;
7. como o pacote retoma e repete sem duplicar recompensa.

Não haverá pontuação por velocidade. O termo “avançado” deverá refletir complexidade de integração das evidências, não dificuldade visual ou pressão de tempo.

## 7. Avaliação, competências e recompensa

**A definir.** O card não formaliza os 70 pontos-base usados pela Simulação disponível. Pesos, competências, falsos positivos, controles críticos, revisão, bônus e chave única ainda precisam de aprovação.

A avaliação futura deverá reconhecer decisões seguras em cada canal e a conclusão sobre a cadeia. Não deve premiar classificar tudo como fraude nem exigir que a pessoa identifique defeitos visuais artificiais. A confirmação independente e o reporte do contexto multicanal devem ser observáveis.

## 8. Contrato, persistência e compatibilidade

Não existe contrato. O `SimulationSubmission` atual registra decisões por mensagens independentes e pode não representar uma cadeia de estados. Ele não deve ser reutilizado sem análise.

Uma implementação futura precisará de ID e versão publicados, artefatos e transições permitidos, resposta bruta validada, avaliador determinístico, resultado, progresso, melhor nota, recompensa e contribuição idempotentes. Se forem persistidas relações ou estados novos, `APP_SCHEMA_VERSION` deverá ser analisado e tentativas antigas preservadas.

O card atual nunca deve ser convertido em conclusão durante migração.

## 9. Integrações

Hoje aparece somente no hub. Não pertence ao percurso vigente e não possui Radar, pré-requisito, recomendação ou destino posterior formalizados.

Uma futura integração poderá relacionar PhishLabs de identidade e domínio e Missões de recuperação, mas essas ligações devem continuar recomendadas quando apropriado, não assumidas. Perfil, pontos, competências, conquistas e Equipes só mudam após conclusão válida.

## 10. Privacidade, segurança e backend

Todas as mensagens, QR Codes, páginas, nomes e contatos serão fictícios. A Simulação não poderá acessar câmera, ler QR real, enviar mensagem, abrir site, solicitar credencial ou registrar conversa verdadeira. Respostas e nota permanecem privadas; a equipe recebe somente agregado autorizado.

O backend autoritativo deverá publicar versão, autorizar público, validar a cadeia de respostas, calcular resultado, impedir adulteração e duplicidade, persistir e auditar. Integrações reais ficam fora do protótipo.

## 11. Acessibilidade desktop

- cada canal deve possuir equivalente textual e navegação previsível;
- mudança de canal e novos eventos devem ser anunciados sem apagar contexto;
- QR Code precisa expor uma representação textual segura do destino;
- página comparativa não pode depender somente da visão;
- relações temporais devem ser legíveis em ordem linear;
- teclado, foco, contraste, texto ampliado e movimento reduzido são obrigatórios;
- nenhuma interação exige rapidez, hover, câmera ou arrastar.

Celular e mídia audiovisual permanecem fora do escopo atual.

## 12. Testes e critérios de disponibilidade

Antes de publicar, testar rota própria sem queda no hub, cadeia determinística, transições e IDs inválidos, caminhos integral/parcial/inseguro, confirmação independente, falsos positivos, repetição, persistência, recompensa, privacidade, ausência de navegação externa e acessibilidade entre canais.

No estado atual, o card deve permanecer não jogável e não criar progresso.

## 13. Pendências e histórico

- decidir se o conceito permanece após a nova matriz curricular;
- separar esta atividade do antigo desafio integrador supersedido;
- aprovar mecânica, cenário e função de cada canal;
- formalizar ID, versão, rota, duração, competências e pontos;
- definir contrato e impacto de persistência;
- validar acessibilidade sem depender de QR ou comparação visual.

| Data | Registro |
|---|---|
| MVP local | Card `multichannel` incluído como terceiro pacote futuro. |
| Revisão curricular | O primeiro percurso passou a ter sete atividades diferentes; o desafio integrador histórico deixou de ser plano canônico. |
| 2026-08-11 | Confirmada a ausência de ID formal, rota e contrato. |
| 2026-08-11 | Documento individual criado como conceito planejado. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
