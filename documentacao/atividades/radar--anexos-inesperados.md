# Anexos inesperados e falsas notas fiscais

> **Estado atual (2026-09-20):** conteúdo implementado e disponível em `/radar/anexos-inesperados`, com seis etapas, prática de evidências e verificação final.
>
> **Implementação:** 5 pontos na primeira resposta correta; conclusão e recompensa independentes dos demais radares. O registro de planejamento abaixo foi preservado como histórico anterior à implementação.

O caso fictício apresenta uma nota fiscal inesperada em arquivo compactado. A leitura diferencia contexto observável de conclusões não comprovadas e orienta confirmar a compra e o remetente por uma referência conhecida antes de abrir o anexo. Conteúdo e pergunta: `lib/content/radar-lessons.ts`; interface: `features/radar/RadarAdditionalArticle.tsx`.

## 1. Identidade e estados

| Campo | Valor |
|---|---|
| Área | Radar |
| `activityId` | `radar:unexpected-attachments` |
| Versão no catálogo | `1` |
| Slug | `anexos-inesperados` |
| Rota referenciada | `/radar/anexos-inesperados`, ainda não liberada como conteúdo integrado |
| Integração | Planejada |
| Duração estimada | 5 minutos |
| Categoria | Mensagens e anexos |
| Competência indicada | Observar |
| Relação curricular | Conteúdo opcional relacionado a **Uma manhã comum** |
| Pontos atuais | Nenhum; conteúdo planejado não cria recompensa |
| Regra compartilhada futura | 5 pontos na primeira conclusão correta, sem bônus, somente depois da integração completa |
| Responsável editorial e revisão | A definir |
| Última conferência no catálogo | 2026-08-11 |

- **Integração:** `planned`; não possui artigo, pergunta, avaliador ou persistência próprios.
- **Progresso individual:** não aplicável. O card não cria Não iniciada, Em andamento ou Concluída no estado local.
- **Reformulação:** nenhuma aprovada.

## 2. Definição existente no catálogo

O catálogo informa apenas o seguinte objetivo: avaliar contexto, extensão do arquivo e canal de confirmação antes de abrir um documento. Seu texto de abertura registra que um anexo plausível ainda precisa fazer sentido dentro da rotina esperada.

Esses metadados não definem ainda:

- corpo editorial completo;
- exemplo fictício;
- tipos ou extensões usados no exemplo;
- pergunta de verificação e alternativas;
- resposta correta e explicações;
- prática relacionada acionável;
- contrato, avaliador, evidências ou recompensa próprios.

Nenhuma dessas lacunas deve ser preenchida por suposição nesta versão da documentação.

## 3. Comportamento atual no portal

O card participa da busca e dos filtros do hub do Radar e aparece com o estado **Em preparação**. Não existe controle de abertura oferecido pelo catálogo para esse item.

Embora o slug seja reconhecível pela camada genérica de navegação, ele não constitui uma experiência funcional: o portal ainda não possui corpo, pergunta ou avaliador específicos para este identificador. A atividade só poderá ser declarada disponível quando deixar de reutilizar estruturas que pertencem a Quishing e possuir integração própria validada.

## 4. Formato futuro sem conteúdo inventado

A única estrutura já aprovada transversalmente para qualquer conteúdo futuro do Radar prevê explicação curta, funcionamento da técnica, sinais, orientação segura, exemplo fictício e higienizado, pergunta de verificação, resumo e ligação opcional a uma prática. O Radar permanece opcional e nunca bloqueia **Uma manhã comum**.

O conteúdo específico, a interação, a pergunta e a avaliação deste artigo continuam **a definir**.

## 5. Avaliação, contrato e persistência

Não existe avaliação aceita para `radar:unexpected-attachments`. O avaliador atual do Radar valida exclusivamente `radar:quishing` versão 1; trocar apenas o `activityId` faria a submissão ser rejeitada.

O número `1` do catálogo é metadado editorial inicial, não autorização para criar uma tentativa. Hoje este conteúdo:

- não entra em `LearningAttempt`;
- não cria `ActivityProgress`;
- não cria evidência de competência;
- não cria `rewardClaim`, lançamento de pontos ou histórico;
- não possui chave de recompensa;
- não exige migração do esquema local.

Antes da disponibilidade deverão ser definidos e testados contrato bruto, allowlist de opções, avaliador, regra de conclusão, evidências e chave idempotente. A regra geral do Radar só poderá conceder 5 pontos depois de leitura, resposta correta e finalização; não há bônus e releitura não pode duplicar registros.

## 6. Privacidade, segurança e backend

Nenhum arquivo real deve ser anexado, baixado ou executado para demonstrar o conteúdo. Exemplos futuros precisam usar nomes, extensões, endereços e organizações fictícios ou higienizados, sem afirmar incidente ativo na empresa.

Antes do uso real, o backend deverá publicar a versão autorizada, validar a resposta bruta, calcular conclusão e evidências, conceder a recompensa uma única vez e persistir tudo com identidade, idempotência e auditoria. O navegador não poderá ser a fonte oficial.

## 7. Acessibilidade

O card atual usa texto explícito para o estado planejado. A futura experiência deverá ter hierarquia de títulos, pergunta agrupada semanticamente, operação por teclado, feedback anunciado, contraste e texto ampliado, movimento reduzido e ausência de limite de tempo. Qualquer exemplo visual de arquivo precisará de descrição textual equivalente.

O escopo atual é desktop; suporte móvel permanece posterior.

## 8. Critérios para sair de Planejado

- conteúdo editorial específico revisado e versionado;
- exemplo seguro e não executável;
- pergunta, alternativas e explicações próprias;
- rota que não apresente corpo de outro artigo;
- validador e avaliador por `activityId` e versão;
- primeira conclusão com 5 pontos e repetição idempotente;
- persistência, Perfil e histórico integrados;
- testes de payload inválido, resposta correta, resposta incorreta, repetição e migração quando aplicável;
- validação manual de teclado, foco, contraste, texto ampliado e console.

## 9. Fora de escopo atual

Corpo do artigo, pergunta, mecânica, integração com arquivos reais, comportamento móvel, Arcade e Painel de gestão.

## 10. Histórico

| Data | Registro | Estado |
|---|---|---|
| 2026-08-11 | Metadados existentes e lacunas documentados sem criar mecânica nova | Planejado |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
