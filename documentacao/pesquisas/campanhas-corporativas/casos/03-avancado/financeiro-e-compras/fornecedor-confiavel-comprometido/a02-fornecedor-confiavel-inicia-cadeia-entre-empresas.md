# A02 — Fornecedor confiável inicia cadeia entre empresas

```yaml
id: real-case:a02-trusted-vendor-aitm
dificuldade: avancado
area_corporativa: financeiro-e-compras
industrias: [financeiro, energia, aplicavel-a-todos]
papeis_alvo: [fornecedores, financeiro, contas-a-pagar, relacionamento]
canais: [email, servico-em-nuvem, pagina-de-autenticacao]
tecnica_dominante: fornecedor-confiavel-comprometido
tecnicas_secundarias: [aitm, relacionamento-confiavel, phishing-lateral, bec]
objetivo_do_atacante: expandir comprometimento entre organizacoes e preparar fraude
fonte_principal: Microsoft Multi-stage AiTM and BEC Campaign
data_da_fonte: 2023-06-08
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft Defender Experts descreveu campanha multietapa contra bancos e serviços financeiros que começou em fornecedor confiável comprometido, avançou por ataques AiTM e gerou BEC em várias organizações. Uma segunda onda enviou mais de 16 mil mensagens aos contatos da vítima.

## Sequência observada

1. um fornecedor ou parceiro legítimo é comprometido;
2. seus contatos recebem mensagem a partir da relação real;
3. a autenticação é interceptada e a sessão roubada;
4. o atacante modifica fatores ou mantém acesso;
5. a caixa comprometida espalha a campanha e apoia fraude.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte descreve a cadeia e os relacionamentos, sem fornecer um corpo único reutilizável.
- **Exemplo reconstruído:**

> Disponibilizamos a documentação atualizada da operação compartilhada. Acesse com sua conta corporativa para revisar antes da próxima etapa.

- **Nota:** não há link, empresa ou documento real.

## Por que funcionava no contexto

- a mensagem parte de relação legítima;
- o tema corresponde a trabalho em andamento;
- o login corporativo parece requisito normal;
- o comprometimento cruza fronteiras organizacionais;
- cada nova conta aumenta a credibilidade da etapa seguinte.

## Indícios e limites

Remetente e contexto corretos não comprovam o destino nem o controle atual da conta. A pessoa pode confirmar o compartilhamento pelo sistema ou contato já usado, mas não consegue detectar sozinha a infraestrutura AiTM.

A organização precisa combinar treinamento, MFA resistente a phishing, monitoramento de sessão e processos com fornecedores.

## Comportamento seguro ensinável

Confirmar compartilhamentos sensíveis no sistema ou contato já estabelecido e abrir o serviço de forma independente, mesmo quando a mensagem vem de parceiro real.

## Possibilidade de atividade

- **Formato candidato:** cadeia entre empresas com mapa de confiança.
- **Decisão principal:** qual elo foi confirmado e qual depende da própria solicitação.
- **Variação legítima necessária:** documento realmente publicado no repositório conhecido.
- **Transferência curta:** parceiro real envia convite por serviço de nuvem.
- **Risco pedagógico:** responsabilizar o usuário por identificar token ou sessão roubada.

## Justificativa da dificuldade

O ataque usa parceiro real, contexto plausível e propagação lateral. Há poucos sinais e o controle depende de processo entre organizações, justificando a faixa Avançado.

## Relação com o currículo atual

Combina **Quem enviou de verdade?**, **A conversa já estava acontecendo**, **Espelho de Página** e **Ataque multicanal**. Funciona melhor como pacote avançado composto.

## Fonte

- [Microsoft — Detecting and mitigating a multi-stage AiTM and BEC campaign](https://www.microsoft.com/security/blog/2023/06/08/detecting-and-mitigating-a-multi-stage-aitm-phishing-and-bec-campaign/)
