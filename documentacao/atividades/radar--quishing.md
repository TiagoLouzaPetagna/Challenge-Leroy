# Quishing: phishing escondido em QR Codes

> **Estado atual:** conteúdo do Radar implementado e disponível na versão 1.
>
> **Formato-alvo:** o fluxo atual foi preservado; nenhuma reformulação específica foi aprovada.

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
| Última conferência no código | 2026-08-11 |

### Estados separados

- **Integração:** disponível, com card, artigo, verificação, avaliador, persistência e rota própria.
- **Progresso individual:** o estado persistido passa diretamente de ausência de conclusão para **Concluída** depois da resposta correta. A leitura e a resposta incorreta não criam **Em andamento**.
- **Reformulação:** nenhuma mudança de mecânica foi aprovada; a experiência atual permanece a referência.

### Mapa da implementação atual

| Responsabilidade | Arquivo ou símbolo |
|---|---|
| Catálogo e pergunta | `lib/content/radar-catalog.ts` |
| Interface do hub e artigo | `features/radar/RadarExperience.tsx` |
| Validação, avaliação e evidências | `isValidRadarSubmission`, `evaluateRadar` e `createRadarCompetencyEvidence` em `lib/domain/rules.ts` |
| Operação de conclusão | `completeRadar` e ação `RADAR_COMPLETED` em `lib/state/app-reducer.ts` |
| Operação assíncrona preparatória | `submitRadar` no provedor da aplicação |
| Persistência | Validadores de tentativa Radar em `lib/state/persistence.ts`; esquema local atual 6 |
| Seletores | Seletores de resultado, conclusão e pontos em `lib/state/selectors.ts` |
| Testes | `tests/rendered-html.test.mjs` |

## 2. Objetivo educacional

O conteúdo explica que um QR Code não é perigoso ou legítimo por sua aparência: ele oculta visualmente um endereço que ainda precisa ser avaliado. O comportamento esperado é interromper a ação impulsiva, visualizar o destino sem prosseguir, avaliar contexto e domínio, confirmar por uma rota conhecida e reportar quando a suspeita permanecer.

A conclusão registra leitura verificada e participação. Ela não comprova domínio definitivo nem substitui uma atividade prática do PhishLab.

## 3. Implementação atual

O hub apresenta Quishing como **Golpe em foco** e permite encontrá-lo pelos filtros de texto, tema, duração e competência. O artigo contém:

1. explicação de como QR Codes ocultam o destino;
2. sinais de atenção ligados a urgência, contexto, domínio e pedidos sensíveis;
3. resposta segura em quatro passos — Pare, Veja o destino, Confirme e Reporte;
4. mensagem principal de que o formato do código não autentica o destino;
5. uma verificação final com três alternativas;
6. continuidade para o PhishLab ou para Missões.

A resposta incorreta apresenta explicação e permite nova tentativa, mas não grava tentativa, progresso ou pontos. A resposta correta conclui o conteúdo. Depois da conclusão, a releitura continua disponível sem duplicar registros.

## 4. Formato-alvo

Não existe reformulação específica aprovada. Qualquer alteração futura de conteúdo, pergunta, alternativas ou critério deverá ser documentada e analisada quanto à necessidade de uma nova versão da atividade.

## 5. Conteúdo e resposta segura

| Elemento | Definição implementada |
|---|---|
| Contextos educativos | Cartaz, mensagem, aviso de entrega ou cobrança com QR Code |
| Técnica | Ocultar um endereço dentro de uma imagem e pressionar a pessoa a agir |
| Gatilho social | Urgência para escanear, pagar, confirmar ou autenticar |
| Aparência que não prova segurança | QR Code e presença de HTTPS |
| Evidências úteis | Contexto esperado, prévia do destino e domínio apresentado |
| Confirmação independente | Abrir serviço, aplicativo ou canal conhecido sem reutilizar o endereço recebido |
| Resposta segura | Ver o destino, avaliar o contexto e confirmar por um canal conhecido |
| Reporte | Usar o canal oficial quando o destino ou contexto continuar suspeito |

Não há QR Code real, link perigoso, navegação externa ou afirmação de incidente ativo na empresa.

## 6. Fluxo e regras de interação

| Etapa | Ação do funcionário | Estado ou registro |
|---|---|---|
| Hub | Abrir o destaque ou localizar o conteúdo pelos filtros | Nenhum ponto ou progresso por navegação |
| Leitura | Consultar explicação, sinais e quatro passos | Leitura não é persistida isoladamente |
| Verificação | Escolher uma das três alternativas e verificar | Incorreta: feedback local; correta: envio da resposta |
| Conclusão | Receber confirmação e retornar ao Radar ou continuar praticando | Tentativa, conclusão, pontos, evidências e histórico são persistidos uma vez |
| Releitura | Abrir novamente o conteúdo concluído | Nenhuma nova tentativa, evidência ou recompensa |

Não há cronômetro e a velocidade não participa da avaliação.

## 7. Avaliação, competências e recompensa

| Alternativa | Resultado |
|---|---|
| Ver o destino, avaliar o contexto e confirmar por um canal conhecido | Correta; nota 100 e 5 pontos potenciais |
| Escanear e confiar se a página usar HTTPS | Incorreta; HTTPS não autentica a organização esperada |
| Evitar todos os QR Codes, mesmo os esperados | Incorreta; rejeição automática cria falsos positivos |

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

A tentativa correta entra em `LearningAttempt`; o progresso recebe uma tentativa, nota 100 e data de conclusão. O estado local atual utiliza `APP_SCHEMA_VERSION = 9`. As migrações 6→7, 7→8 e 8→9 preservaram integralmente o contrato e as tentativas do Radar.

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

A implementação atual usa título principal, controles nativos, `fieldset` e `legend` para a pergunta, mensagens de erro com `role="alert"` e conclusão com `role="status"`. O fluxo não depende de tempo, arrastar ou áudio e pode ser operado por teclado. Estado concluído possui texto, não apenas cor.

Alto contraste, texto ampliado e redução de movimentos vêm das preferências globais. O escopo validado neste momento é desktop; comportamento móvel permanece para etapa posterior.

## 13. Testes e critérios de aceite

A suíte atual cobre:

- renderização do hub e da rota `/radar/quishing`;
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

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
