# A01 — Thread de pagamento sequestrada após AiTM

```yaml
id: real-case:a01-aitm-payment-thread
dificuldade: avancado
area_corporativa: financeiro-e-compras
industrias: [aplicavel-a-todos]
papeis_alvo: [contas-a-pagar, financeiro, fornecedores]
canais: [email, pagina-de-login, email-comprometido]
tecnica_dominante: thread-hijacking-e-aitm
tecnicas_secundarias: [roubo-de-sessao, regra-de-caixa, bec, fraude-de-pagamento]
objetivo_do_atacante: inserir fraude em conversa real de pagamento
fonte_principal: Microsoft From Cookie Theft to BEC
data_da_fonte: 2022-07-12
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft investigou campanha AiTM que roubava senha e cookie de sessão, acessava caixas de correio e criava regras. Em seguida, os atacantes respondiam a threads em andamento relacionadas a pagamentos e faturas para executar BEC e fraude financeira.

## Sequência observada

1. uma campanha de phishing conduz a proxy AiTM;
2. credenciais e sessão são capturadas mesmo com MFA convencional;
3. o atacante acessa a caixa e monitora conversas financeiras;
4. regras escondem ou encaminham respostas;
5. o atacante entra na thread no momento adequado e altera o pagamento.

## Texto usado na campanha

- **Natureza:** reconstrução segura de uma inserção em conversa; a fonte não publica transcrição integral do pedido financeiro.
- **Exemplo reconstruído:**

> Confirmando o fechamento da fatura já discutida: nosso banco mudou. Use os dados atualizados abaixo para que o crédito seja identificado hoje.

- **Nota:** o texto preserva continuidade, mudança bancária e urgência, mas não é citação original.

## Por que funcionava no contexto

- remetente, histórico, pedido e valor podem ser verdadeiros;
- o atacante conhece estilo, prazo e participantes;
- responder na thread parece confirmar identidade;
- regras podem ocultar mensagens de contestação;
- MFA já ter sido usada cria falsa sensação de proteção suficiente.

## Indícios e limites

Poucos sinais visuais podem existir. A mudança no processo e no beneficiário é mais importante que remetente e gramática. O usuário não consegue detectar roubo de cookie ou regra oculta pelo e-mail recebido.

A defesa humana deve preservar controles financeiros e confirmação independente; telemetria, revogação de sessão e regras de caixa pertencem à equipe técnica.

## Comportamento seguro ensinável

Tratar alteração financeira dentro de thread conhecida como nova autorização: suspender e confirmar pelo contato cadastrado e pelo fluxo oficial.

## Possibilidade de atividade

- **Formato candidato:** reconstrução de conversa com evidências de processo.
- **Decisão principal:** o que mudou e qual fonte pode autorizar.
- **Variação legítima necessária:** alteração real confirmada fora da thread.
- **Transferência curta:** pedido semelhante parte de chat interno comprometido.
- **Risco pedagógico:** procurar apenas erros de remetente numa conta verdadeira.

## Justificativa da dificuldade

Conta, thread, contexto e valores reais produzem forte alinhamento e poucos indícios. A confirmação exige sair da conversa. É um caso avançado mesmo sem malware visível.

## Relação com o currículo atual

É combinação direta de **A conversa já estava acontecendo** e **Mudança bancária sem atalho**, com debrief técnico sobre AiTM. Não deve virar um terceiro player redundante.

## Fonte

- [Microsoft — From cookie theft to BEC](https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/)
