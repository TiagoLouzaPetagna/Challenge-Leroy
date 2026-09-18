# A04 — SMS e personificação obtêm redefinição de identidade

```yaml
id: real-case:a04-unc3944-smishing-helpdesk
dificuldade: avancado
area_corporativa: ti-e-suporte
industrias: [telecomunicacoes, tecnologia, hospitalidade, aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios, service-desk, administradores-de-identidade]
canais: [sms, telefone, portal-de-identidade]
tecnica_dominante: smishing-e-reset-de-identidade
tecnicas_secundarias: [sim-swap, personificacao-de-funcionario, mfa-reset, reconhecimento]
objetivo_do_atacante: obter credenciais e assumir identidade corporativa
fonte_principal: Google Mandiant UNC3944
data_da_fonte: 2023-09-14
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Mandiant descreveu UNC3944, sobreposto a Scattered Spider, usando SMS phishing e engenharia social por telefone para obter credenciais, executar SIM swapping e escalar acesso. Outros relatos do mesmo ecossistema incluem personificação de funcionários diante de service desks para redefinir senha ou MFA.

## Sequência observada

1. o grupo pesquisa pessoa, empresa e processo de suporte;
2. envia SMS com portal de identidade ou aviso corporativo;
3. coleta credenciais ou dados úteis;
4. personifica funcionário junto ao suporte ou operadora;
5. solicita redefinição de senha, MFA ou número;
6. usa o acesso para nuvem, extorsão ou ransomware.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte descreve o uso de SMS, mas não oferece uma transcrição única.
- **Exemplo reconstruído:**

> A sincronização do seu acesso corporativo expirou. Confirme sua conta no portal móvel antes do encerramento do turno.

- **Nota:** nenhum link, número, marca ou portal real é incluído.

## Por que funcionava no contexto

- SMS parece adequado a aviso urgente;
- o texto pode usar dados verdadeiros do funcionário;
- o atacante adapta a narrativa ao service desk;
- troca de SIM afeta fatores de recuperação;
- cada etapa confirma falsamente a anterior.

## Indícios e limites

Para o funcionário, ação não iniciada, rota do link e contexto do aviso são observáveis. Para o service desk, sequência incomum de redefinições, contato e provas de identidade são relevantes. Nenhuma equipe isolada possui todo o contexto.

Treinamento de usuário não substitui processos resistentes à personificação no suporte e na operadora.

## Comportamento seguro ensinável

Funcionário: abandonar o SMS e consultar a identidade pela rota conhecida. Service desk: aplicar verificação forte e aprovação para redefinições de alto risco.

## Possibilidade de atividade

- **Formato candidato:** simulação multicanal com duas perspectivas apresentadas à mesma pessoa, sem papéis simultâneos.
- **Decisão principal:** vincular cada pedido à identidade e ao processo autorizado.
- **Variação legítima necessária:** redefinição iniciada e registrada pelo usuário.
- **Transferência curta:** chamada sobre troca de aparelho após o SMS.
- **Risco pedagógico:** ensinar perguntas pessoais como autenticação suficiente.

## Justificativa da dificuldade

Personalização, múltiplos canais e exploração do processo de recuperação exigem visão sistêmica. O caso possui poucos sinais isolados e impacto de identidade, justificando Avançado.

## Relação com o currículo atual

Combina **Ele já sabia meus dados**, **De qual dispositivo veio este código?**, **Central de mensagens** e **Ataque multicanal**.

## Fonte

- [Google/Mandiant — UNC3944 leverages SMS phishing and SIM swapping](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-sms-phishing-sim-swapping-ransomware)
- [FBI/IC3 — Social engineering techniques](https://www.ic3.gov/PSA/2024/PSA240411)
