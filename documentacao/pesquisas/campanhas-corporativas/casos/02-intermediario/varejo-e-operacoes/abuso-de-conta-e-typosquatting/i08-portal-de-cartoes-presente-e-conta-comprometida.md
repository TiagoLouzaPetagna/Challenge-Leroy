# I08 — Portal de cartões-presente e conta comprometida

```yaml
id: real-case:i08-storm-0539-gift-card-cloud
dificuldade: intermediario
area_corporativa: varejo-e-operacoes
industrias: [varejo, luxo, alimentacao]
papeis_alvo: [operacoes-de-cartoes, financeiro, ti, marketing]
canais: [email, nuvem, portal-corporativo]
tecnica_dominante: abuso-de-conta-e-typosquatting
tecnicas_secundarias: [aitm, dispositivo-malicioso, lista-interna, reconhecimento-de-processo]
objetivo_do_atacante: obter acesso ao processo corporativo de emissao de cartoes-presente
fonte_principal: Microsoft Storm-0539 Gift Card Fraud
data_da_fonte: 2024-05-23
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft descreveu Storm-0539 como grupo que pesquisa processos de emissão de cartões-presente, compromete identidades em nuvem, registra dispositivos e usa domínios semelhantes. Depois de obter acesso, pode explorar guias e listas internas para parecer parte da operação.

## Sequência observada

1. o grupo identifica funcionários e fluxos de emissão;
2. usa phishing, AiTM ou domínio semelhante para comprometer identidade;
3. registra dispositivo e mantém acesso;
4. consulta documentos e listas internas;
5. usa o processo real para criar ou resgatar valor.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte descreve infraestrutura e processo, sem um texto único de campanha.
- **Exemplo reconstruído:**

> Revisão operacional do portal: confirme o acesso da sua equipe antes do próximo ciclo de emissão e valide o dispositivo cadastrado.

- **Nota:** nenhuma marca, domínio ou portal real é reproduzido.

## Por que funcionava no contexto

- o alvo realmente administra o produto financeiro;
- o atacante aprende linguagem e calendário internos;
- mensagens podem partir de conta comprometida ou lista legítima;
- o domínio semelhante aparece apenas no início da cadeia;
- o objetivo se confunde com uma operação válida.

## Indícios e limites

O usuário pode verificar se iniciou a revisão, se o dispositivo é reconhecido e se a solicitação existe no processo oficial. A detecção de persistência e abuso de token pertence aos controles técnicos.

O ensino deve evitar reduzir o caso a “ache a letra errada”, porque depois do comprometimento a mensagem pode ser internamente legítima.

## Comportamento seguro ensinável

Confirmar acesso, dispositivo e solicitação diretamente no processo autorizado e interromper mudanças que não correspondem a uma ação própria.

## Possibilidade de atividade

- **Formato candidato:** console de acesso seguido por estação de processo.
- **Decisão principal:** reconhecer e autorizar dispositivo ou alteração.
- **Variação legítima necessária:** revisão programada com chamado e dispositivo conhecido.
- **Transferência curta:** lista interna envia instrução incomum após comprometimento.
- **Risco pedagógico:** ensinar que domínios semelhantes são o único sinal relevante.

## Justificativa da dificuldade

O caso usa contexto especializado e conta ou lista legítima, mas ainda oferece ação própria, dispositivo e processo como fontes independentes. A primeira adaptação cabe no nível Intermediário; uma cadeia completa deve ser avançada.

## Relação com o currículo atual

Relaciona **Uma letra fora do lugar**, **Você iniciou este acesso?**, **A conversa já estava acontecendo** e **Pagamento para quem?**.

## Fonte

- [Microsoft — Storm-0539 gift card fraud](https://www.microsoft.com/en-us/security/blog/2024/05/23/cyber-signals-inside-the-growing-risk-of-gift-card-fraud/)
