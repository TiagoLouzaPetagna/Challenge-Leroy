# F05 — Cobrança que manda ligar para cancelar

```yaml
id: real-case:f05-toad-invoice-callback
dificuldade: fundamental
area_corporativa: geral
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios, financeiro, administrativo]
canais: [email, telefone]
tecnica_dominante: phishing-por-retorno-telefonico
tecnicas_secundarias: [fatura-falsa, urgencia, falso-atendimento, acesso-remoto]
objetivo_do_atacante: levar a vitima a iniciar uma ligacao e instalar acesso remoto ou malware
fonte_principal: Proofpoint Telephone-Oriented Attack Delivery
data_da_fonte: 2021-11-04
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Proofpoint documentou ataques TOAD em que um e-mail de compra, assinatura ou cobrança inclui um telefone para cancelamento. A mensagem pode não conter link ou anexo malicioso. Quando a pessoa liga, um falso atendente conduz instalação de acesso remoto, download de arquivo ou outras ações.

## Sequência observada

1. chega uma cobrança inesperada com número para contestação;
2. o destinatário liga para impedir a suposta perda;
3. o atendente cria confiança e pede ações no dispositivo;
4. a cadeia pode terminar em acesso remoto, fraude financeira ou malware.

## Texto usado na campanha

- **Natureza:** reconstrução segura baseada nos temas publicados.
- **Disponibilidade:** a fonte reproduz diversas imagens e roteiros, não um texto único.
- **Exemplo reconstruído:**

> Sua renovação foi confirmada. Caso não reconheça a cobrança, ligue hoje para a central indicada nesta fatura e solicite o cancelamento.

- **Nota:** nenhum telefone, marca ou valor real é fornecido.

## Por que funcionava no contexto

- não há link óbvio para inspecionar;
- a vítima acredita estar tomando iniciativa defensiva;
- o número dentro da mensagem parece ser a rota de solução;
- a cobrança cria medo de perda imediata;
- a interação humana permite adaptar o roteiro às dúvidas.

## Indícios e limites

Uma cobrança inesperada pode ser erro legítimo. O problema é usar a própria mensagem como única fonte do contato e aceitar instruções que dão controle do dispositivo.

O usuário não precisa permanecer na ligação para “investigar”. Deve consultar o serviço por uma referência já conhecida e interromper solicitações de instalação ou acesso.

## Comportamento seguro ensinável

Não utilizar o telefone fornecido pela cobrança; confirmar a obrigação por cadastro, aplicativo ou contato conhecido antes de agir.

## Possibilidade de atividade

- **Formato candidato:** conversa textual ramificada de falso atendimento.
- **Decisão principal:** escolher a origem do contato e interromper pedidos de acesso.
- **Variação legítima necessária:** cobrança real consultada no portal conhecido.
- **Transferência curta:** QR ou chat oferece a mesma “central”.
- **Risco pedagógico:** ensinar que ausência de link torna o e-mail seguro.

## Justificativa da dificuldade

O pretexto e a rota são claros, mas o canal muda de e-mail para telefone. A versão Fundamental deve encerrar antes de ações técnicas complexas e enfatizar a origem independente do contato.

## Relação com o currículo atual

Pode compor **O pedido não tinha link**, **Central de mensagens** ou **Ataque multicanal**. O princípio de confirmação reaparece sem exigir chamada real.

## Fonte

- [Proofpoint — Telephone-oriented attack delivery](https://www.proofpoint.com/us/blog/threat-insight/caught-beneath-landline-411-telephone-oriented-attack-delivery)
