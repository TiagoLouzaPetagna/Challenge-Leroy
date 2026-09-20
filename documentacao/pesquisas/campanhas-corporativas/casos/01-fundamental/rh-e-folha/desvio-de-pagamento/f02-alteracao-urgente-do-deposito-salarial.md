# F02 — Alteração urgente do depósito salarial

```yaml
id: real-case:f02-payroll-redirect
dificuldade: fundamental
area_corporativa: rh-e-folha
industrias: [aplicavel-a-todos]
papeis_alvo: [rh, folha-de-pagamento, financeiro]
canais: [email]
tecnica_dominante: desvio-de-pagamento
tecnicas_secundarias: [personificacao-de-funcionario, conta-gratuita, urgencia]
objetivo_do_atacante: redirecionar salario para conta controlada pelo atacante
fonte_principal: Proofpoint BEC Taxonomy Payroll Redirects
data_da_fonte: 2021-05-20
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Proofpoint documentou campanhas em que atacantes personificavam funcionários e enviavam mensagens ao departamento de folha para substituir dados de depósito. Os pedidos variavam principalmente pelo nome da pessoa, destinatário e idioma e frequentemente partiam de contas gratuitas com nome exibido conhecido.

## Sequência observada

1. o atacante identifica funcionários e responsáveis por folha;
2. cria uma conta externa usando o nome da pessoa;
3. pergunta como atualizar ou envia os novos dados;
4. tenta concluir a mudança antes do próximo fechamento.

## Texto usado na campanha

- **Natureza:** reconstrução segura baseada no padrão documentado.
- **Disponibilidade:** a fonte reproduz imagens de exemplos, mas não fornece uma transcrição textual única para reutilização.
- **Exemplo reconstruído:**

> Preciso atualizar minha conta de depósito antes do fechamento desta folha. Pode confirmar quais dados devo enviar por aqui?

- **Nota:** dados bancários foram deliberadamente omitidos. O exemplo não é transcrição original.

## Por que funcionava no contexto

- RH realmente recebe solicitações de alteração;
- a primeira mensagem pode apenas iniciar conversa, sem link ou anexo;
- nome exibido e tom simples parecem compatíveis com um funcionário;
- o fechamento cria uma urgência plausível.

## Indícios e limites

Conta externa, mudança financeira e pressão de prazo justificam investigação, mas não formam prova isolada. A pessoa pode ter trocado de endereço ou estar impossibilitada de usar o canal habitual.

O ponto decisivo é o procedimento: dados bancários não devem ser alterados somente porque uma mensagem possui nome e informações corretas.

## Comportamento seguro ensinável

Manter a alteração suspensa até concluir o procedimento de identificação e confirmação aprovado, fora da própria mensagem.

## Possibilidade de atividade

- **Formato candidato:** balcão de RH inerte com pedido e cadastro.
- **Decisão principal:** alterar, solicitar confirmação ou recusar sem analisar.
- **Variação legítima necessária:** atualização iniciada no portal interno e confirmada pelo procedimento.
- **Transferência curta:** pedido feito por chat depois de uma mensagem inicial.
- **Risco pedagógico:** ensinar que todo e-mail pessoal é fraudulento.

## Justificativa da dificuldade

O pedido é simples, o canal é único e a divergência de origem pode ser apresentada com clareza. A dificuldade sobe para RH quando o fechamento e os dados da pessoa coincidem com a rotina.

## Relação com o currículo atual

Relaciona personificação, mudança de processo, dados pessoais e fraude de pagamento. Está previsto como variação em **Pagamento para quem?** e pode transferir o comportamento de **O pedido não tinha link**.

## Fonte

- [Proofpoint — BEC Taxonomy: Payroll Redirects](https://www.proofpoint.com/us/blog/threat-insight/bec-taxonomy-payroll-redirects)
