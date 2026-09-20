# Golpes por mensagem e troca de número

> **Estado atual (2026-09-20):** conteúdo implementado e disponível em `/radar/golpes-por-mensagem`, com seis etapas, prática de evidências e verificação final.
>
> **Implementação:** 5 pontos na primeira resposta correta; conclusão e recompensa independentes dos demais radares. O registro de planejamento abaixo foi preservado como histórico anterior à implementação.

O caso fictício mostra um contato com foto conhecida, número novo e pedido de dados de clientes. A leitura diferencia aparência do perfil de identidade confirmada e recomenda verificar a mudança pelo contato anterior. Conteúdo e pergunta: `lib/content/radar-lessons.ts`; interface: `features/radar/RadarAdditionalArticle.tsx`.

## 1. Identidade e estados

| Campo | Valor |
|---|---|
| Área | Radar |
| `activityId` | `radar:message-scams` |
| Versão no catálogo | `1` |
| Slug | `golpes-por-mensagem` |
| Rota referenciada | `/radar/golpes-por-mensagem`, ainda não liberada como conteúdo integrado |
| Integração | Planejada |
| Duração estimada | 5 minutos |
| Categoria | Mensagens e anexos |
| Competência indicada | Verificar |
| Relação curricular | Opcional para **Quem enviou de verdade?** e **Uma manhã comum** |
| Pontos atuais | Nenhum; conteúdo planejado não cria recompensa |
| Regra compartilhada futura | 5 pontos na primeira conclusão correta, sem bônus, somente depois da integração completa |
| Responsável editorial e revisão | A definir |
| Última conferência no catálogo | 2026-08-11 |

- **Integração:** `planned`; não possui artigo, pergunta, avaliador ou persistência próprios.
- **Progresso individual:** não aplicável enquanto planejado.
- **Reformulação:** nenhuma aprovada.

## 2. Definição existente no catálogo

O catálogo limita o tema a pedidos fora do padrão em aplicativos de mensagem e confirmação de identidade. Seu texto de abertura registra que nome e foto conhecidos podem ser copiados e que o contexto precisa ser confirmado.

Ainda não há definição de aplicativo, conversa, identidade, pedido, número anterior ou novo, evidências, exemplo, pergunta, opções ou resposta correta. Nenhuma conversa específica deve ser inventada nesta documentação.

## 3. Comportamento atual no portal

O card pode ser encontrado pela busca e pelos filtros e aparece como **Em preparação**, sem botão de leitura. Navegar no hub não cria atividade nem recompensa.

O slug catalogado não equivale a uma rota funcional. Não existem corpo e avaliador próprios; portanto uma URL reconhecida pela camada genérica não pode ser apresentada como integração concluída.

## 4. Formato futuro sem conteúdo inventado

Permanecem válidos somente os requisitos comuns do Radar: explicação curta, funcionamento, sinais, orientação, exemplo higienizado, pergunta, resumo e prática relacionada. O artigo será opcional e as duas atividades relacionadas não dependerão dele.

Canal representado, mecânica, conteúdo e verificação continuam **a definir**.

## 5. Avaliação, contrato e persistência

O avaliador disponível aceita apenas `radar:quishing` versão 1 e rejeitaria uma submissão com `radar:message-scams`. O card não possui contrato, tentativa, resultado, evidência, progresso, recompensa, ponto ou histórico.

Antes de disponibilizar deverão existir pergunta e respostas específicas, allowlist, avaliador, evidência de competência e chave idempotente. A futura aplicação da regra comum será 5 pontos na primeira conclusão correta, sem bônus e sem duplicação por releitura.

O metadado versão 1 não exige migração. Compatibilidade e esquema deverão ser revistos quando o contrato real for definido.

## 6. Privacidade, segurança e backend

Exemplos futuros deverão usar números, nomes, imagens, organizações e conversas fictícios ou mascarados. O portal não deverá abrir aplicativo, enviar mensagem, ligar, adicionar contato nem afirmar que confirmou uma pessoa real.

No produto real, backend autoritativo deverá publicar a versão, validar a resposta, calcular conclusão e evidências, conceder a recompensa uma vez e persistir com identidade, retenção e auditoria. Nenhum dado de conversa real deve ser exigido para concluir.

## 7. Acessibilidade

O card atual comunica o planejamento por texto. Uma conversa ilustrativa futura precisará manter ordem de leitura, identificação textual dos participantes, contraste, texto ampliado, teclado, foco e alternativa equivalente a qualquer imagem ou gesto. Não haverá pontuação por velocidade.

O escopo atual é desktop; suporte móvel permanece posterior.

## 8. Critérios para sair de Planejado

- conteúdo, exemplo e revisão editorial próprios;
- pergunta e alternativas específicas;
- rota sem conteúdo de outro artigo;
- contrato, validação e avaliação por ID e versão;
- 5 pontos idempotentes na primeira conclusão correta;
- persistência, histórico e Perfil integrados;
- nenhuma coleta ou ação em aplicativo real;
- testes funcionais, de persistência, privacidade e acessibilidade.

## 9. Fora de escopo atual

Conversa específica, aplicativo real, contato real, pergunta, mecânica, celular, Arcade e Painel de gestão.

## 10. Histórico

| Data | Registro | Estado |
|---|---|---|
| 2026-08-11 | Metadados existentes e lacunas documentados sem criar mecânica nova | Planejado |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
