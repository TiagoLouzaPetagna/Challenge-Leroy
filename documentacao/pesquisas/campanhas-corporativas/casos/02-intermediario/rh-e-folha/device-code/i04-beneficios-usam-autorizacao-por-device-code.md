# I04 — Benefícios usam autorização por device code

```yaml
id: real-case:i04-benefits-device-code
dificuldade: intermediario
area_corporativa: rh-e-folha
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios]
canais: [email, qr, navegador, autenticacao]
tecnica_dominante: device-code-phishing
tecnicas_secundarias: [documento-compartilhado, marca-da-empresa, pagina-legitima, codigo-de-dispositivo]
objetivo_do_atacante: obter token de acesso a conta m365
fonte_principal: Proofpoint Device Code Authorization Phishing
data_da_fonte: 2025
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Proofpoint observou campanhas que usavam documento de salário e benefícios para iniciar um fluxo de autorização por código de dispositivo. A vítima podia terminar numa página legítima da Microsoft e inserir um código fornecido pela cadeia do atacante; o token resultante ficava disponível ao atacante.

## Sequência observada

1. a mensagem oferece relatório de salário ou benefícios;
2. link ou QR abre página personalizada com marca da empresa;
3. a página apresenta um código e orienta autenticação no endereço legítimo do provedor;
4. a vítima autentica e autoriza o dispositivo que não iniciou;
5. o atacante recebe acesso à conta.

## Texto usado na campanha

- **Natureza:** título curto publicado e reconstrução segura.
- **Título observado:** “Salary Bonus + Employer Benefits Reports 25”.
- **Exemplo reconstruído:**

> Para concluir a autenticação segura, copie o código apresentado e confirme no portal oficial da Microsoft.

- **Nota:** não há código nem endereço acionável. O corpo é reconstrução, não transcrição.

## Por que funcionava no contexto

- a página final é realmente do provedor;
- a marca da empresa aparece antes da autorização;
- “usar o site oficial” parece eliminar o risco;
- o código é tratado como etapa técnica sem origem compreendida;
- benefício e salário aumentam relevância.

## Indícios e limites

O domínio legítimo comprova somente onde a autorização ocorre, não quem iniciou o vínculo nem qual dispositivo receberá o token. O código deve pertencer a uma ação e dispositivo iniciados pela própria pessoa.

O funcionário não precisa entender OAuth internamente. Precisa associar código, dispositivo, finalidade e ação própria.

## Comportamento seguro ensinável

Inserir códigos de dispositivo somente quando o próprio funcionário iniciou o vínculo no dispositivo reconhecido e conferiu a finalidade.

## Possibilidade de atividade

- **Formato candidato:** mapa dispositivo → código → conta → permissões.
- **Decisão principal:** de qual dispositivo e ação veio o código.
- **Variação legítima necessária:** login de TV ou equipamento iniciado pelo funcionário.
- **Transferência curta:** código chega por chat de falso suporte.
- **Risco pedagógico:** ensinar que página legítima significa autorização segura.

## Justificativa da dificuldade

A infraestrutura legítima remove uma pista comum e o pretexto combina com o trabalho. A cadeia ainda revela que o usuário não iniciou o pareamento, justificando Intermediário.

## Relação com o currículo atual

É caso central de **De qual dispositivo veio este código?** e complemento de **Login verdadeiro, permissão errada**.

## Fonte

- [Proofpoint — Device code authorization phishing](https://www.proofpoint.com/us/blog/threat-insight/access-granted-phishing-device-code-authorization-account-takeover)
