# Cliquei em um link suspeito. E agora?

> **Estado atual (2026-09-20):** conteúdo implementado e disponível em `/radar/depois-do-clique`, com seis etapas, prática de evidências e verificação final.
>
> **Implementação:** 5 pontos na primeira resposta correta; conclusão e recompensa independentes dos demais radares. O registro de planejamento abaixo foi preservado como histórico anterior à implementação.

O caso fictício distingue abrir uma página de informar dados ou baixar arquivos. A leitura orienta interromper a interação e relatar o que realmente ocorreu, sem presumir roubo de senha ou instalação de programa. Conteúdo e pergunta: `lib/content/radar-lessons.ts`; interface: `features/radar/RadarAdditionalArticle.tsx`.

## 1. Identidade e estados

| Campo | Valor |
|---|---|
| Área | Radar |
| `activityId` | `radar:after-click` |
| Versão no catálogo | `1` |
| Slug | `depois-do-clique` |
| Rota referenciada | `/radar/depois-do-clique`, ainda não liberada como conteúdo integrado |
| Integração | Planejada |
| Duração estimada | 4 minutos |
| Categoria | Resposta segura |
| Competência indicada | Recuperar |
| Relação curricular | Conteúdo opcional relacionado a **Cliquei. E agora?** |
| Pontos atuais | Nenhum; conteúdo planejado não cria recompensa |
| Regra compartilhada futura | 5 pontos na primeira conclusão correta, sem bônus, somente depois da integração completa |
| Responsável editorial e revisão | A definir |
| Última conferência no catálogo | 2026-08-11 |

- **Integração:** `planned`; não possui artigo, pergunta, avaliador ou persistência próprios.
- **Progresso individual:** não aplicável enquanto planejado.
- **Reformulação:** nenhuma aprovada para este artigo. O montador de resposta aprovado pertence à Missão relacionada.

## 2. Definição existente no catálogo

O catálogo descreve uma sequência simples para interromper o risco, reportar rapidamente e apoiar a resposta. O texto de abertura reforça que reportar cedo é mais útil do que esconder o ocorrido ou tentar resolver sozinho.

Não estão definidos os diferentes tipos de ocorrência, procedimentos, passos detalhados, exemplo, pergunta, opções ou resposta correta do artigo. Os caminhos e ações da Missão **Cliquei. E agora?** não são automaticamente o conteúdo deste Radar.

## 3. Comportamento atual no portal

O card aparece como **Em preparação**, pode ser localizado pelos filtros e não oferece controle de abertura. Não existe tentativa, conclusão ou recompensa.

A rota referenciada pelo currículo não está integrada como artigo específico. Reconhecer o slug na camada genérica não é suficiente enquanto corpo e avaliador próprios estiverem ausentes.

## 4. Formato futuro sem conteúdo inventado

Aplicam-se somente as regras transversais do Radar: explicação curta, funcionamento, sinais, orientação segura, exemplo fictício, pergunta, resumo e ligação opcional com prática. A Missão relacionada deve permanecer utilizável sem esta leitura.

O nível de detalhe, os caminhos tratados, a interação e a verificação continuam **a definir**.

## 5. Avaliação, contrato e persistência

Não existe avaliação para `radar:after-click`; o avaliador atual aceita exclusivamente Quishing versão 1. O card não cria contrato, tentativa, progresso, evidência, recompensa, pontos ou histórico.

Antes da disponibilidade será necessário definir pergunta, alternativas, explicações, allowlist, avaliador, evidência e chave idempotente. Quando integrada, a política comum poderá conceder 5 pontos na primeira conclusão correta, sem bônus e sem repetição da recompensa.

O metadado versão 1 não altera o esquema. Um contrato futuro deverá preservar as tentativas existentes da Missão e não poderá reutilizá-las como conclusões do Radar.

## 6. Privacidade, segurança e backend

O artigo futuro deverá usar linguagem sem culpa e nunca solicitar senha, código temporário, dados reais do incidente ou upload de evidência. Nenhum botão poderá alterar senha, encerrar sessão, reportar ou acionar suporte de verdade.

Backend autoritativo deverá controlar publicação, versão, validação, conclusão, evidências, recompensa, retenção e auditoria. Procedimentos e canais reais precisarão de curadoria autorizada e não poderão ser codificados como promessas fictícias.

## 7. Acessibilidade

O estado planejado é textual. A futura leitura deverá manter hierarquia, linguagem clara, teclado, foco, feedback anunciado, contraste, texto ampliado, movimento reduzido e ausência de limite de tempo. Qualquer sequência visual precisará de equivalente textual.

O escopo atual é desktop; suporte móvel permanece posterior.

## 8. Critérios para sair de Planejado

- escopo editorial definido sem duplicar silenciosamente a Missão;
- texto, exemplo, pergunta, alternativas e explicações próprias;
- rota sem conteúdo emprestado;
- contrato e avaliador por ID e versão;
- conclusão e recompensa de 5 pontos idempotentes;
- integração com Perfil e histórico sem interferir no progresso da Missão;
- testes de conteúdo incorreto, correto, inválido e repetido;
- validação de linguagem, teclado, foco, contraste e console.

## 9. Fora de escopo atual

Procedimento específico, reporte real, recuperação de conta, montador da Missão, celular, Arcade e Painel de gestão.

## 10. Histórico

| Data | Registro | Estado |
|---|---|---|
| 2026-08-11 | Metadados existentes e lacunas documentados sem criar mecânica nova | Planejado |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
