# Quando o golpista se passa por um gestor

> **Estado atual (2026-09-20):** conteúdo implementado e disponível em `/radar/falso-gestor`, com seis etapas, prática de evidências e verificação final.
>
> **Implementação:** 5 pontos na primeira resposta correta; conclusão e recompensa independentes dos demais radares. O registro de planejamento abaixo foi preservado como histórico anterior à implementação.

O caso fictício mostra um pedido atribuído à gestão que solicita dados, urgência e sigilo fora do fluxo usual. A leitura evita presumir invasão de conta e ensina a confirmar o pedido por um contato conhecido. Conteúdo e pergunta: `lib/content/radar-lessons.ts`; interface: `features/radar/RadarAdditionalArticle.tsx`.

## 1. Identidade e estados

| Campo | Valor |
|---|---|
| Área | Radar |
| `activityId` | `radar:manager-impersonation` |
| Versão no catálogo | `1` |
| Slug | `falso-gestor` |
| Rota referenciada | `/radar/falso-gestor`, ainda não liberada como conteúdo integrado |
| Integração | Planejada |
| Duração estimada | 6 minutos |
| Categoria | Identidade e confiança |
| Competência indicada | Verificar |
| Relação curricular | Opcional para **A conversa já estava acontecendo**, **Quem enviou de verdade?** e **Mudança bancária sem atalho** |
| Pontos atuais | Nenhum; conteúdo planejado não cria recompensa |
| Regra compartilhada futura | 5 pontos na primeira conclusão correta, sem bônus, somente depois da integração completa |
| Responsável editorial e revisão | A definir |
| Última conferência no catálogo | 2026-08-11 |

- **Integração:** `planned`; não possui artigo, pergunta, avaliador ou persistência próprios.
- **Progresso individual:** não aplicável enquanto planejado.
- **Reformulação:** nenhuma aprovada.

## 2. Definição existente no catálogo

O resumo registra sinais de autoridade, urgência e sigilo usados para induzir pagamentos ou envio de dados. O texto de abertura afirma que a identidade aparente não substitui confirmação por um canal conhecido.

O catálogo ainda não define cenário, mensagem fictícia, sinais anotados, canal, pedido, pergunta, opções ou debrief específicos. Também não escolhe se o exemplo representará personificação externa, conta comprometida ou outro mecanismo. Essas decisões permanecem abertas e não são inferidas neste documento.

## 3. Comportamento atual no portal

O card participa da busca e dos filtros do Radar e aparece como **Em preparação**, sem controle de abertura. Nenhuma interação com o card cria tentativa, conclusão, competência ou pontos.

O slug pode ser reconhecido pela camada genérica, mas isso não torna a rota funcional: não existem corpo editorial e avaliador próprios deste ID. O conteúdo não poderá ser marcado como disponível enquanto uma rota direta puder apresentar estrutura pertencente a outro artigo.

## 4. Formato futuro sem conteúdo inventado

Aplicam-se somente as regras compartilhadas já aprovadas para o Radar: explicação curta, funcionamento, sinais, ação segura, exemplo higienizado, pergunta de verificação, resumo e prática relacionada. A leitura deve ser opcional e as três atividades relacionadas precisam continuar compreensíveis sem ela.

A apresentação concreta, a pergunta, as alternativas, o critério correto e qualquer exemplo permanecem **a definir**.

## 5. Avaliação, contrato e persistência

Não existe submissão aceita para `radar:manager-impersonation`; o avaliador atual valida apenas `radar:quishing` versão 1. A versão de catálogo não autoriza reaproveitar a pergunta ou a resposta de Quishing.

Atualmente não há tentativa, progresso, evidência, recompensa, pontos, histórico, contribuição coletiva ou migração. Antes de disponibilizar, deverão ser definidos contrato, allowlist, avaliador, evidências e chave idempotente. A regra futura comum será 5 pontos apenas na primeira conclusão correta, sem bônus e sem duplicação por releitura.

## 6. Privacidade, segurança e backend

Exemplos futuros deverão ser inteiramente fictícios ou higienizados, sem nomes reais de gestores, organogramas, dados bancários, canais corporativos ou contatos reais. O artigo não poderá sugerir que existe um ataque ativo.

No produto real, publicação, versão, identidade, resposta, cálculo, evidências, recompensa, retenção e auditoria deverão ser autoritativos no backend. O cliente não poderá declarar que confirmou identidade nem que realizou pagamento ou reporte.

## 7. Acessibilidade

O estado planejado já é apresentado por texto. O artigo futuro deverá ter títulos coerentes, exemplos compreensíveis sem depender de imagem, pergunta nativa ou semanticamente agrupada, teclado, foco, feedback anunciado, contraste, texto ampliado e movimento reduzido. Não haverá pontuação por velocidade.

O escopo atual é desktop; suporte móvel permanece posterior.

## 8. Critérios para sair de Planejado

- definição editorial do tipo de personificação sem contradizer as atividades relacionadas;
- exemplo fictício e higienizado;
- pergunta, alternativas, explicações e resposta próprias;
- rota específica sem conteúdo emprestado;
- validador e avaliador por ID e versão;
- primeira conclusão com 5 pontos e repetição idempotente;
- persistência e integrações de Perfil e histórico;
- testes de estados correto, incorreto, inválido e repetido;
- validação acessível e manual em desktop.

## 9. Fora de escopo atual

Corpo, exemplo, pergunta, mídia, confirmação corporativa real, comportamento móvel, Arcade e Painel de gestão.

## 10. Histórico

| Data | Registro | Estado |
|---|---|---|
| 2026-08-11 | Metadados existentes e lacunas documentados sem criar mecânica nova | Planejado |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
