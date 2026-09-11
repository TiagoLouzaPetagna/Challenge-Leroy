# I07 — Suporte externo pelo Teams pede código

```yaml
id: real-case:i07-midnight-blizzard-teams
dificuldade: intermediario
area_corporativa: ti-e-suporte
industrias: [tecnologia, governo, organizacoes-alvo-de-espionagem]
papeis_alvo: [todos-os-funcionarios, administradores]
canais: [teams, aplicativo-autenticador]
tecnica_dominante: spearphishing-via-service
tecnicas_secundarias: [tenant-comprometido, falso-suporte, codigo-mfa, token]
objetivo_do_atacante: obter token de autenticacao e acesso a m365
fonte_principal: Microsoft Midnight Blizzard Teams Social Engineering
data_da_fonte: 2023-08-02
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft observou Midnight Blizzard usar tenants Microsoft 365 de pequenas empresas já comprometidas, renomeá-los com temas de suporte ou segurança e enviar solicitações externas de conversa no Teams. Depois de aceita, a conversa tentava induzir o alvo a inserir um código no autenticador.

## Sequência observada

1. um usuário externo solicita conversa no Teams;
2. nome e domínio do tenant sugerem suporte ou proteção;
3. o contato apresenta um código e instruções;
4. a vítima insere o código no autenticador;
5. o atacante obtém token e acessa a conta.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte mostra capturas, mas a biblioteca não reproduz o roteiro nem o código.
- **Exemplo reconstruído:**

> A equipe de proteção precisa concluir uma verificação da sua conta. Abra o autenticador e confirme o código apresentado nesta conversa.

- **Nota:** não é transcrição original e nenhum código é incluído.

## Por que funcionava no contexto

- Teams é um canal de trabalho normal;
- o tenant subjacente é real, embora comprometido;
- termos de segurança no nome parecem oficiais;
- o código e o autenticador são componentes legítimos;
- aceitar uma conversa externa pode parecer inofensivo.

## Indícios e limites

A marcação de usuário externo, ausência de chamado e código não iniciado são evidências úteis. Um tenant legítimo não comprova que a área interna iniciou a conversa.

O funcionário deve verificar suporte pelo diretório ou chamado oficial e nunca transportar códigos de uma conversa não solicitada para o autenticador.

## Comportamento seguro ensinável

Não aceitar instrução de autenticação por conversa externa; encerrar e confirmar o suporte por rota corporativa conhecida.

## Possibilidade de atividade

- **Formato candidato:** mapa tenant → conta externa → conversa → autenticador.
- **Decisão principal:** o que a plataforma comprova e de onde veio a ação.
- **Variação legítima necessária:** fornecedor externo previamente registrado em chamado.
- **Transferência curta:** a mesma solicitação chega por SMS.
- **Risco pedagógico:** ensinar que todo usuário externo no Teams é malicioso.

## Justificativa da dificuldade

Plataforma e tenant legítimos reduzem sinais visuais, mas a origem externa e o código não iniciado permanecem observáveis. Para público treinado, é um caso intermediário de identidade e ação.

## Relação com o currículo atual

Combina **Quem enviou de verdade?**, **De qual dispositivo veio este código?**, **Você iniciou este acesso?** e **Ataque multicanal**.

## Fonte

- [Microsoft — Midnight Blizzard conducts social engineering over Teams](https://www.microsoft.com/en-us/security/blog/2023/08/02/midnight-blizzard-conducts-targeted-social-engineering-over-microsoft-teams/)
