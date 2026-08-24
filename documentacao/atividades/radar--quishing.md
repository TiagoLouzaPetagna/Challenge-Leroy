# Quishing: phishing escondido em QR Codes

> **Estado atual:** conteúdo do Radar implementado e disponível na versão 1, com leitura editorial em seis páginas.
>
> **Formato-alvo:** reformulação visual e navegação por etapas implementadas; contrato, resposta correta e recompensa da versão 1 preservados.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | Radar |
| Relação curricular | Conteúdo opcional relacionado a **Domínio sob a lupa** |
| `activityId` | `radar:quishing` |
| Versão implementada | `1` |
| Rota funcional | `/radar/quishing` |
| Integração atual | Disponível |
| Duração estimada | 4 minutos |
| Pontos | 5 na primeira conclusão correta; sem bônus |
| Competência principal do catálogo | Investigar |
| Evidências guiadas registradas | Investigar e Verificar, 75 em cada uma |
| Pré-requisitos | Nenhum; o Radar é opcional |
| Responsável editorial | A definir |
| Última revisão de conteúdo | Pendente de governança editorial |
| Última conferência no código | 2026-08-24 |

### Estados separados

- **Integração:** disponível, com card, artigo, verificação, avaliador, persistência e rota própria.
- **Progresso individual:** o estado persistido passa diretamente de ausência de conclusão para **Concluída** depois da resposta correta. A leitura e a resposta incorreta não criam **Em andamento**.
- **Reformulação:** experiência editorial em seis páginas implementada. Somente uma etapa é exibida por vez, como nas atividades práticas, sem transformar o Radar em pré-requisito.

### Mapa da implementação atual

| Responsabilidade | Arquivo ou símbolo |
|---|---|
| Catálogo e pergunta | `lib/content/radar-catalog.ts` |
| Interface do hub e artigo | `features/radar/RadarExperience.tsx` |
| Identidade visual própria do artigo | `features/radar/RadarArticle.module.css` |
| Validação, avaliação e evidências | `isValidRadarSubmission`, `evaluateRadar` e `createRadarCompetencyEvidence` em `lib/domain/rules.ts` |
| Operação de conclusão | `completeRadar` e ação `RADAR_COMPLETED` em `lib/state/app-reducer.ts` |
| Operação assíncrona preparatória | `submitRadar` no provedor da aplicação |
| Persistência | Validadores de tentativa Radar em `lib/state/persistence.ts`; esquema local atual 6 |
| Seletores | Seletores de resultado, conclusão e pontos em `lib/state/selectors.ts` |
| Testes | `tests/rendered-html.test.mjs` |

## 2. Objetivo educacional

O conteúdo explica que um QR Code não é perigoso ou legítimo por sua aparência: ele oculta visualmente um endereço que ainda precisa ser avaliado. O comportamento esperado é interromper a ação impulsiva, visualizar o destino sem prosseguir, separar sinais de conclusões ainda não comprovadas e confirmar por uma rota já conhecida, sem depender do endereço entregue pelo próprio aviso.

A conclusão registra leitura verificada e participação. Ela não comprova domínio definitivo nem substitui uma atividade prática do PhishLab.

## 3. Implementação atual

O hub apresenta Quishing como conteúdo em destaque e permite encontrar os demais itens pelos filtros de texto, tema, duração e competência. Ao abrir o artigo, o funcionário percorre seis páginas, com barra de progresso e navegação anterior/próxima:

1. **Entenda:** explica o que a imagem oculta e por que ela não autentica o destino;
2. **Observe:** apresenta um cartaz fictício no refeitório, uma prévia inerte e três sinais contextualizados;
3. **Não conclua cedo:** separa fatos comprovados no caso do que ainda não foi confirmado;
4. **Aja:** organiza interrupção, comparação, acesso independente e preservação do contexto;
5. **Confira:** aplica a decisão ao mesmo caso com uma pergunta e três alternativas;
6. **Resultado:** confirma a conclusão, mostra a resposta registrada e oferece continuidade para PhishLab ou Missões.

Somente uma dessas páginas aparece por vez. Ao avançar ou voltar, o foco do teclado é movido para o título da etapa recém-aberta.

A resposta incorreta apresenta explicação e permite nova tentativa, mas não grava tentativa, progresso ou pontos. A resposta correta conclui o conteúdo. Depois da conclusão, a releitura continua disponível sem duplicar registros.

## 4. Formato implementado

A leitura deixa de empilhar explicação, sinais, resposta e verificação na mesma página. A rota continua única (`/radar/quishing`), mas o estado temporário da interface controla seis páginas internas. Voltar preserva a seleção e permite revisar o raciocínio; recarregar a rota reinicia a leitura em **Entenda**, sem apagar uma conclusão já persistida.

A interface segue a linha visual editorial mais recente do portal: fundo creme, superfícies de papel, verde-floresta, acentos lima/amarelo/azul-petróleo, títulos em Fraunces, texto de interface em Manrope, cartões amplos e botões com profundidade curta. A peça visual de QR Code é deliberadamente não escaneável.

Esta alteração não cria uma nova atividade nem muda o significado persistido das respostas. Qualquer mudança futura de critério, alternativa correta ou interpretação dos IDs deverá ser analisada quanto à necessidade de uma nova `activityVersion`.

## 5. Conteúdo e resposta segura

| Elemento | Definição implementada |
|---|---|
| Contexto educativo desta versão | Cartaz fictício no refeitório sobre atualização de benefícios |
| Técnica | Ocultar um endereço dentro de uma imagem e pressionar a pessoa a agir |
| Gatilho social | Prazo até as 16h e ameaça de suspensão do acesso |
| Aparência que não prova segurança | QR Code e presença de HTTPS |
| Evidências úteis | Prazo, sobreposição do adesivo, prévia do destino e diferença entre domínios |
| Domínio mostrado na prévia | `beneficios-colaborador.example` |
| Rota conhecida | `beneficios.intra.example` |
| Confirmação independente | Fechar a prévia e abrir a rota já utilizada, sem reutilizar o endereço recebido |
| Resposta segura | Interromper, comparar, acessar por fora e preservar o contexto caso seja necessário buscar orientação interna |

Os domínios `.example` são fictícios. Não há QR Code real, link perigoso, navegação externa, botão de **Como reportar**, canal de reporte presumido ou afirmação de incidente ativo na empresa.

## 6. Fluxo e regras de interação

| Etapa | Ação do funcionário | Estado ou registro |
|---|---|---|
| Hub | Abrir o destaque ou localizar o conteúdo pelos filtros | Nenhum ponto ou progresso por navegação |
| Entenda | Ler a diferença entre destino codificado e identidade confirmada | Leitura não é persistida isoladamente |
| Observe | Examinar cartaz, prévia, rota conhecida e sinais | Estado temporário da etapa; nenhuma submissão |
| Não conclua cedo | Comparar listas **Comprovado neste caso** e **Não comprovado** | Estado temporário da etapa; nenhuma submissão |
| Aja | Consultar quatro ações defensivas proporcionais | Estado temporário da etapa; nenhuma submissão |
| Confira | Escolher uma das três alternativas e verificar | Incorreta: feedback local e permanência na página; correta: envio da resposta e avanço |
| Resultado | Receber confirmação e consultar a revisão da resposta | Tentativa, conclusão, pontos, evidências e histórico são persistidos uma vez |
| Releitura | Abrir novamente o conteúdo concluído | Nenhuma nova tentativa, evidência ou recompensa |

Não há cronômetro e a velocidade não participa da avaliação.

## 7. Avaliação, competências e recompensa

| Alternativa | Resultado |
|---|---|
| Fechar a prévia e abrir `beneficios.intra.example` pela rota já utilizada | Correta; nota 100 e 5 pontos potenciais |
| Abrir o endereço porque a prévia mostra HTTPS | Incorreta; HTTPS não autentica o serviço esperado |
| Decidir que qualquer QR Code encontrado no local é fraudulento | Incorreta; os sinais justificam verificar, mas não comprovam fraude |

O avaliador devolve nota 100 para a alternativa correta e 0 para as demais. O reducer só persiste a resposta correta; por isso uma resposta incorreta não aparece como tentativa avaliada nem como conclusão.

A primeira conclusão correta:

- concede 5 pontos confirmados pela chave `radar:quishing:first-completion`;
- cria evidências guiadas em Investigar e Verificar com nota 75;
- cria um evento de conclusão e outro de recompensa no histórico;
- não conclui Missão, não altera a ordem do percurso e não alimenta agregado de Equipes;
- não recebe bônus de desempenho.

Releitura ou reenvio posterior não concede novos pontos, tentativa válida, evidência, conclusão ou evento.

## 8. Contrato, persistência e compatibilidade

### Resposta bruta

```ts
type RadarSubmission = {
  attemptId: string;
  activityId: "radar:quishing";
  activityVersion: 1;
  completedAt: string;
  selectedOptionId:
    | "scan-and-trust"
    | "inspect-and-confirm"
    | "avoid-all-qr";
};
```

O validador exige identificador não vazio, atividade e versão exatas, data válida e uma alternativa conhecida.

### Resultado derivado

```ts
type RadarResult = {
  score: number;
  correct: boolean;
  points: number;
  alreadyCompleted: boolean;
};
```

A tentativa correta entra em `LearningAttempt`; o progresso recebe uma tentativa, nota 100 e data de conclusão. O estado atual utiliza `APP_SCHEMA_VERSION = 15`. As migrações posteriores à criação do Radar preservaram integralmente seu contrato e suas tentativas.

Tentativas de versões futuras não poderão ser avaliadas como versão 1. Uma mudança semântica da pergunta, das alternativas ou da interpretação da resposta exige revisão explícita de `activityVersion`; a forma persistida só deve provocar nova versão do esquema quando realmente mudar.

## 9. Integrações

- É consulta opcional relacionada a **Domínio sob a lupa** e nunca funciona como pré-requisito.
- A conclusão aparece no histórico e na origem de pontos do perfil.
- O hub apresenta quantidade de leituras concluídas e pontos do Radar.
- O artigo oferece continuidade para PhishLab e Missões, sem conceder recompensa por navegação.
- O conteúdo não cria contribuição nem agregado de Equipes.
- O Arcade não participa desta atividade.

## 10. Privacidade e segurança

| Dado | Persistência local | Visibilidade |
|---|---|---|
| Alternativa correta enviada | Sim, dentro da tentativa concluída | Funcionário na demonstração |
| Resposta incorreta | Não | Apenas feedback temporário da tela |
| Nota e conclusão | Sim | Funcionário |
| Evidências de competência | Sim | Perfil individual |
| Pontos e recompensa | Sim | Perfil individual |
| Agregado de equipe | Não existe | Não aplicável |

O armazenamento no navegador é somente demonstrativo. O conteúdo não monitora ameaças reais, não coleta QR Codes, não abre endereços e não envia reportes.

## 11. Backend autoritativo obrigatório

Antes do uso real, o servidor deverá publicar a versão autorizada, autenticar o funcionário, validar a alternativa permitida, registrar a tentativa idempotente, calcular conclusão e evidências, conceder os 5 pontos uma única vez e persistir histórico e progresso de forma transacional. O cliente não poderá declarar nota, conclusão ou recompensa como fonte oficial.

A curadoria também deverá versionar o texto, a pergunta, as fontes e a data de revisão. Conteúdo baseado em notícia real precisará de fonte e data, sem reprodução indevida.

## 12. Acessibilidade e dispositivos

A implementação atual usa um único título principal, títulos de etapa focáveis, barra de progresso semântica, controles nativos, `fieldset` e `legend` para a pergunta, mensagens de erro com `role="alert"` e conclusão com `role="status"`. O fluxo não depende de tempo, arrastar ou áudio e pode ser operado por teclado. Estado concluído possui texto, não apenas cor.

O avanço entre páginas move o foco para o novo título. Os botões possuem alvo mínimo de 44 px; estados de foco, redução de movimento e cores forçadas são contemplados pela camada visual.

Alto contraste, texto ampliado e redução de movimentos vêm das preferências globais. O escopo validado neste momento é desktop; comportamento móvel permanece para etapa posterior.

## 13. Testes e critérios de aceite

A suíte atual cobre:

- renderização do hub e da rota `/radar/quishing`;
- renderização inicial da etapa **Entenda**, indicação **Etapa 1 de 6** e chamada para o caso fictício;
- rejeição da resposta incorreta sem mutar o estado;
- conclusão somente com a alternativa correta;
- 5 pontos na primeira conclusão;
- duas evidências guiadas de competência;
- ausência de avanço em Missões;
- persistência e restauração;
- releitura sem duplicar pontos ou registros;
- integridade do percurso sem dependência do Radar.

Qualquer versão futura deverá repetir esses testes para seu próprio identificador, incluir migração quando necessária e validar teclado, foco, mensagens, contraste e console no navegador.

## 14. Fora de escopo e pendências

- definição de responsável editorial e calendário de revisão;
- integração com notícia ou fonte externa;
- monitoramento de ameaça real;
- envio de reporte;
- mídia, QR Code real e navegação externa;
- comportamento específico para celular;
- Arcade e Painel de gestão.

## 15. Histórico

| Data | Decisão ou mudança | Estado | Versão |
|---|---|---|---:|
| 2026-08-11 | Documentação individual do fluxo existente, pontos, persistência e limites | Documentada | 1 |
| 2026-08-23 | Leitura reorganizada em Entenda, Observe, Não conclua cedo, Aja, Confira e Resultado; novo caso fictício, identidade editorial e clareza das alternativas; IDs, avaliação e recompensa preservados | Implementada; lint, build e 36 testes automatizados aprovados | 1 |
| 2026-08-24 | Fluxo em seis páginas recomposto depois que a reformulação visual do hub restaurou acidentalmente o artigo empilhado; o hub novo, o conteúdo, os IDs, a avaliação e a recompensa foram preservados | Restaurada; build, 36 testes e lint dos arquivos alterados aprovados | 1 |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
