# I03 — Bombardeio de e-mails seguido por Quick Assist

```yaml
id: real-case:i03-email-bombing-quick-assist
dificuldade: intermediario
area_corporativa: ti-e-suporte
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios, service-desk]
canais: [email, teams, telefone, acesso-remoto]
tecnica_dominante: falso-help-desk-e-acesso-remoto
tecnicas_secundarias: [email-bombing, vishing, quick-assist, aitm]
objetivo_do_atacante: obter controle remoto e acesso inicial
fonte_principal: Microsoft Storm-1811 Quick Assist
data_da_fonte: 2024-05-15
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft observou o Storm-1811 provocar ou aproveitar um grande volume de e-mails e depois contatar a vítima como suporte. A abordagem usou chamadas e mensagens no Teams e conduziu o usuário a iniciar Quick Assist. Em alguns casos, a cadeia também levava a página AiTM e, depois do acesso, a ransomware.

## Sequência observada

1. a caixa da vítima recebe grande volume de inscrições e mensagens;
2. um contato oferece ajuda para resolver o problema criado;
3. o falso suporte pede um código ou sessão de assistência remota;
4. o atacante assume controle e executa ações posteriores.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a Microsoft não publica transcrição completa da conversa.
- **Exemplo reconstruído:**

> Identificamos o volume anormal na sua caixa. Sou do suporte e vou corrigir agora; abra a assistência rápida e informe o código exibido.

- **Nota:** não há código, chamada, ferramenta ativa ou instrução operacional neste arquivo.

## Por que funcionava no contexto

- o atacante cria um problema real antes de oferecer solução;
- a ligação chega no momento de maior frustração;
- Quick Assist é ferramenta legítima e conhecida;
- o contato pode ocorrer dentro de plataforma corporativa;
- a urgência reduz a busca por um chamado oficial.

## Indícios e limites

O volume de e-mails não autentica quem oferece ajuda. A pessoa pode verificar se existe chamado, de onde partiu o contato e se a organização iniciou a sessão.

Uma ferramenta legítima não torna legítima a finalidade. O treinamento deve avaliar origem, autorização e ação solicitada, não demonizar Quick Assist.

## Comportamento seguro ensinável

Interromper o contato não solicitado e abrir um chamado ou contato de suporte pela rota corporativa já conhecida antes de conceder acesso remoto.

## Possibilidade de atividade

- **Formato candidato:** console textual reativo após uma caixa sobrecarregada.
- **Decisão principal:** aceitar assistência ou reconstruir o chamado oficial.
- **Variação legítima necessária:** sessão de suporte iniciada pelo próprio funcionário com protocolo correspondente.
- **Transferência curta:** falso suporte aparece após repetidas solicitações de MFA.
- **Risco pedagógico:** ensinar que toda chamada do suporte é fraude ou que spam é prova de comprometimento.

## Justificativa da dificuldade

Combina problema real, canal corporativo, voz e ferramenta legítima. A origem ainda pode ser verificada por chamado e diretório, o que mantém a cadeia no nível Intermediário para o público geral.

## Relação com o currículo atual

Encaixa em **A central que não podia esperar**, **Central de mensagens** e **Ataque multicanal**. Pode transferir o comportamento de **Você iniciou este acesso?**.

## Fonte

- [Microsoft — Quick Assist social engineering](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/)
