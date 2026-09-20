# I06 — Reclamação de hóspede termina em ClickFix

```yaml
id: real-case:i06-hospitality-clickfix
dificuldade: intermediario
area_corporativa: operacoes-e-atendimento
industrias: [hotelaria, turismo]
papeis_alvo: [recepcao, reservas, atendimento, operacoes]
canais: [email, pdf, pagina-falsa]
tecnica_dominante: clickfix
tecnicas_secundarias: [personificacao-de-plataforma, reclamacao-de-cliente, captcha-falso, execucao-manual]
objetivo_do_atacante: induzir execucao manual e instalar malware para roubo de dados
fonte_principal: Microsoft Booking.com ClickFix Campaign
data_da_fonte: 2025-03-13
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft identificou campanha contra organizações de hotelaria que personificava plataforma de reservas. As mensagens apresentavam cliente potencial, feedback negativo ou necessidade de verificar conta. O destino imitava a plataforma e mostrava CAPTCHA falso que conduzia a instruções ClickFix para execução manual.

## Sequência observada

1. chega mensagem plausível sobre reserva ou reclamação;
2. link ou PDF conduz à página com aparência da plataforma;
3. uma verificação humana falsa cria legitimidade;
4. instruções pedem ações incomuns no sistema;
5. a ação instala ladrão de credenciais.

## Texto usado na campanha

- **Natureza:** reconstrução segura baseada nos três temas publicados.
- **Exemplo reconstruído:**

> Um hóspede registrou feedback negativo e solicita resposta da propriedade. Verifique sua conta para abrir os detalhes da ocorrência.

- **Nota:** a fonte mostra exemplos visuais; este corpo é reconstruído. Instruções do ClickFix são omitidas.

## Por que funcionava no contexto

- avaliações e reservas fazem parte da rotina;
- urgência reputacional favorece resposta rápida;
- a plataforma conhecida reduz suspeita;
- CAPTCHA costuma representar segurança;
- o funcionário tenta resolver uma falha técnica para atender o cliente.

## Indícios e limites

O ponto crítico é a página pedir ações no sistema operacional que não pertencem à consulta de uma reserva. Mesmo uma reclamação real não justifica copiar ou executar comandos.

O funcionário não precisa diagnosticar o malware. Deve abandonar a rota, abrir a plataforma conhecida e consultar a ocorrência por dentro da conta.

## Comportamento seguro ensinável

Não executar etapas manuais no sistema para “corrigir” uma página; recuperar a reserva ou reclamação pela plataforma aberta independentemente.

## Possibilidade de atividade

- **Formato candidato:** atendimento em lote com uma ocorrência que muda para falso CAPTCHA.
- **Decisão principal:** continuar a correção ou recuperar o caso na plataforma.
- **Variação legítima necessária:** reclamação verdadeira presente no painel oficial.
- **Transferência curta:** suposto erro em documento de fornecedor.
- **Risco pedagógico:** revelar ou simular comandos utilizáveis.

## Justificativa da dificuldade

O pretexto é muito alinhado à hotelaria, mas a quebra de processo é observável e pode ser ensinada sem executar nada. Isso sustenta a faixa Intermediário.

## Relação com o currículo atual

Relaciona **O primeiro resultado**, **Espelho de Página**, **Documento inesperado** e limite técnico sobre ClickFix. A técnica de execução deve ficar inerte.

## Fonte

- [Microsoft — Booking.com ClickFix campaign](https://www.microsoft.com/en-us/security/blog/2025/03/13/phishing-campaign-impersonates-booking-com-delivers-a-suite-of-credential-stealing-malware/)
