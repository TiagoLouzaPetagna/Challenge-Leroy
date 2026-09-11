# Critérios de dificuldade das campanhas

## Princípio

A classificação representa a dificuldade humana de reconhecer e responder ao caso para o público indicado. Ela não representa o dano potencial, a sofisticação do malware ou a importância do grupo atacante.

A base principal é a [NIST Phish Scale](https://www.nist.gov/publications/nist-phish-scale-user-guide), que combina indícios observáveis e alinhamento do pretexto com o contexto do destinatário. Esta biblioteca acrescenta, como adaptação para atividades além de e-mail, quantidade de canais, dependência de contexto, legitimidade da infraestrutura e quantidade de decisões.

## Dimensões analisadas

| Dimensão | Menor dificuldade | Maior dificuldade |
|---|---|---|
| Indícios observáveis | vários, claros e acessíveis | poucos, ambíguos ou ausentes |
| Alinhamento com o trabalho | pedido fora da função ou do momento | pedido habitual para aquela função e período |
| Identidade utilizada | conta externa e divergências visíveis | conta, thread, tenant ou serviço legítimo comprometido |
| Canais | um canal | cadeia de e-mail, chat, telefone, SMS, reunião ou sistema |
| Processo | uma decisão reversível | várias decisões, permissões, pagamento ou recuperação |
| Confirmação independente | rota conhecida e evidente | rota precisa ser reconstruída fora da solicitação |
| Personalização | mensagem genérica | dados, fornecedores, chamados ou papéis verdadeiros |
| Infraestrutura | destino claramente não relacionado | página, autorização ou serviço legítimo abusado |

## Faixa 01 — Fundamental

Características usuais:

- um canal principal;
- vários indícios disponíveis;
- pedido simples de explicar;
- contexto pouco ou moderadamente alinhado;
- rota independente evidente;
- uma ou duas decisões centrais.

O caso fundamental não precisa ser grosseiro. Ele deve permitir que o funcionário aprenda o processo com contexto suficiente e feedback direto.

## Faixa 02 — Intermediário

Características usuais:

- pretexto plausível para a área;
- aparência profissional;
- poucos indícios ou indícios misturados;
- serviço conhecido, QR, documento ou plataforma corporativa;
- cadeia curta com duas ou mais etapas;
- necessidade de consultar contexto ou uma fonte adicional.

O funcionário já precisa aplicar o processo e aceitar que alguns casos continuam inconclusivos até a confirmação.

## Faixa 03 — Avançado

Características usuais:

- alinhamento forte com o trabalho;
- conta, conversa, tenant ou serviço legítimo abusado;
- múltiplos canais ou etapas;
- informações verdadeiras usadas para criar credibilidade;
- solicitação de autenticação, permissão, alteração financeira ou acesso remoto;
- poucos indícios que possam ser tratados como prova isolada;
- necessidade de reconstruir uma rota independente e preservar o processo.

Uma atividade avançada não deve premiar a adivinhação. A resposta correta pode ser suspender, preservar e verificar, sem declarar fraude antes de existir evidência suficiente.

## Reavaliação obrigatória

A mesma mensagem pode mudar de faixa conforme o público. Uma fatura genérica pode ser fundamental para quem não trata pagamentos e avançada para Contas a Pagar se coincidir com fornecedor, prazo e processo reais.

Ao converter um dossiê em atividade, a dificuldade deve ser recalculada para:

- função do personagem;
- conhecimentos apresentados anteriormente;
- indícios efetivamente disponibilizados na interface;
- ajuda e ferramentas oferecidas;
- impacto da decisão;
- contexto legítimo de comparação.
