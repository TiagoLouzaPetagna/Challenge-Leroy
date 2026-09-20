# F08 — Solicitação de MFA não iniciada

```yaml
id: real-case:f08-uninitiated-mfa
dificuldade: fundamental
area_corporativa: ti-e-suporte
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios]
canais: [notificacao-de-autenticacao]
tecnica_dominante: mfa-nao-iniciada
tecnicas_secundarias: [engenharia-social, fadiga-mfa, roubo-de-identidade]
objetivo_do_atacante: obter aprovacao de acesso nao iniciado pela vitima
fonte_principal: FBI Social Engineering Techniques 2024
data_da_fonte: 2024-04-11
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

O FBI descreve campanhas de personificação de funcionários e phishing usadas para obter acesso a contas corporativas. Solicitações de autenticação inesperadas aparecem em várias cadeias reais como etapa para converter credenciais ou uma redefinição em sessão válida.

## Sequência observada

1. o atacante obtém ou tenta redefinir uma credencial;
2. o sistema envia solicitação ao fator registrado;
3. a pessoa recebe um evento que não iniciou;
4. aprovação ou código compartilhado permite continuar o acesso.

## Texto usado na campanha

- **Natureza:** reconstrução segura de uma notificação.
- **Disponibilidade:** a fonte descreve a técnica, mas não publica um único modelo de prompt.
- **Exemplo reconstruído:**

> Solicitação de entrada recebida. Serviço corporativo · dispositivo não reconhecido. Você está tentando acessar agora?

- **Nota:** nenhum botão executa aprovação real e nenhum código é mostrado.

## Por que funcionava no contexto

- notificações são breves e familiares;
- a pessoa pode atribuir o evento a sincronização ou outra sessão;
- aprovar parece a forma mais rápida de remover o aviso;
- um contato posterior pode fornecer uma explicação falsa.

## Indícios e limites

O fato decisivo é a ausência de uma ação própria correspondente. Localização e nome do serviço ajudam, mas podem ser imprecisos e não devem ser a única regra.

A pessoa não precisa saber por que a solicitação surgiu. Deve negar ou revisar por área oficial e acionar o procedimento adequado.

## Comportamento seguro ensinável

Aprovar somente solicitações diretamente ligadas a uma ação própria ativa e conferida; negar e revisar as demais por rota conhecida.

## Possibilidade de atividade

- **Formato candidato:** console com um único evento antes da sequência de fadiga.
- **Decisão principal:** relacionar o prompt a uma ação própria.
- **Variação legítima necessária:** autenticação iniciada e dados coincidentes.
- **Transferência curta:** código recebido por SMS sem solicitação.
- **Risco pedagógico:** ensinar que toda localização diferente prova invasão.

## Justificativa da dificuldade

Uma pergunta e um evento tornam a regra inicial clara. Repetição, falso suporte, sessão e recuperação pertencem a casos intermediários ou avançados.

## Relação com o currículo atual

É a fundação de **Você iniciou este acesso?** e de **De qual dispositivo veio este código?**. O dossiê não muda a Missão já publicada.

## Fonte

- [FBI/IC3 — Cyber criminals target victims using social engineering techniques](https://www.ic3.gov/PSA/2024/PSA240411)
