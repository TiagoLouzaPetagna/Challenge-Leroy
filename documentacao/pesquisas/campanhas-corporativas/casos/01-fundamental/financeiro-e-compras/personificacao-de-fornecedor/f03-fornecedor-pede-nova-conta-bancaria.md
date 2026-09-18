# F03 — Fornecedor pede nova conta bancária

```yaml
id: real-case:f03-vendor-bank-change
dificuldade: fundamental
area_corporativa: financeiro-e-compras
industrias: [aplicavel-a-todos]
papeis_alvo: [contas-a-pagar, compras, tesouraria]
canais: [email]
tecnica_dominante: personificacao-de-fornecedor
tecnicas_secundarias: [bec, dominio-semelhante, urgencia, documento-convincente]
objetivo_do_atacante: desviar pagamento de fornecedor
fonte_principal: FBI Business Email Compromise
data_da_fonte: pagina-atualizada-continuamente
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

O FBI apresenta como exemplo típico de BEC uma mensagem que parece vir de fornecedor habitual e solicita atualização de endereço ou instruções de pagamento. Pequenas variações em endereços e sites podem fazer a origem parecer conhecida.

## Sequência observada

1. o atacante pesquisa fornecedor, cliente e processo;
2. personifica a empresa ou usa uma conta comprometida;
3. introduz uma mudança bancária próxima de uma fatura real;
4. pressiona para que o lote seja liberado antes de uma confirmação independente.

## Texto usado na campanha

- **Natureza:** reconstrução segura em português.
- **Disponibilidade:** a fonte descreve a solicitação típica, não um único texto integral.
- **Exemplo reconstruído:**

> Para os próximos pagamentos, nossa conta de recebimento foi atualizada. A fatura permanece a mesma; use os novos dados anexos neste fechamento.

- **Nota:** não há anexo, conta ou contato real neste dossiê.

## Por que funcionava no contexto

- faturas e mudanças cadastrais fazem parte da rotina;
- valor, pedido e fornecedor podem ser verdadeiros;
- documento bem formatado fornece plausibilidade;
- proximidade do vencimento aumenta pressão;
- responder na mesma conversa parece natural, mas pode manter o funcionário no canal comprometido.

## Indícios e limites

A mudança do beneficiário é o evento crítico, não a aparência do PDF. Domínio parecido, urgência e contato novo justificam cautela; uma conta legítima também pode ter sido comprometida.

O funcionário não precisa determinar a técnica exata. Deve preservar o pagamento, consultar o cadastro existente, usar o contato previamente registrado e manter a segunda aprovação.

## Comportamento seguro ensinável

Suspender alteração e pagamento relacionado até confirmar pelo contato homologado e completar o processo oficial com segunda aprovação.

## Possibilidade de atividade

- **Formato candidato:** estação de processo financeiro.
- **Decisão principal:** qual fonte pode autorizar a mudança.
- **Variação legítima necessária:** alteração real já registrada no fluxo oficial.
- **Transferência curta:** mesma mudança chega dentro de uma thread conhecida.
- **Risco pedagógico:** ensinar a confiar na conta antiga sem confirmar a obrigação e o processo.

## Justificativa da dificuldade

Na versão Fundamental, o contato novo, a quebra do processo e a pressão ficam visíveis. Para Contas a Pagar com fornecedor e fatura reais, o caso deve ser classificado como intermediário ou avançado.

## Relação com o currículo atual

É a base real de **Mudança bancária sem atalho** e de casos em **Pagamento para quem?**. A biblioteca não altera a atividade já implementada.

## Fonte

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise)
