# A06 — Vishing conduz SSO personalizado e novo fator

```yaml
id: real-case:a06-shinyhunters-saas-vishing
dificuldade: avancado
area_corporativa: ti-e-saas
industrias: [tecnologia, varejo, servicos, multinacionais]
papeis_alvo: [todos-os-funcionarios, suporte, administradores-de-saas]
canais: [telefone, pagina-personalizada, sso, mfa]
tecnica_dominante: vishing-e-sso-personalizado
tecnicas_secundarias: [credential-harvesting, novo-dispositivo-mfa, saas, extorsao]
objetivo_do_atacante: comprometer sso e extrair dados de plataformas saas
fonte_principal: Google Mandiant ShinyHunters-Branded SaaS Data Theft
data_da_fonte: 2026-01-30
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

O Google Threat Intelligence Group descreveu expansão de atividade associada à marca ShinyHunters usando vishing sofisticado e páginas de coleta personalizadas para a vítima. O objetivo era obter credenciais de SSO e códigos MFA, registrar dispositivos e acessar SaaS para exfiltrar dados e apoiar extorsão.

## Sequência observada

1. o atacante pesquisa a organização e o fluxo de identidade;
2. liga como suporte e apresenta contexto plausível;
3. conduz o usuário a página com marca da própria empresa;
4. coleta credenciais e código ou orienta registro de fator;
5. acessa aplicações SaaS e comunicações internas;
6. dados são extraídos e usados posteriormente.

## Texto usado na campanha

- **Natureza:** reconstrução segura; não existe transcrição pública integral das chamadas.
- **Exemplo reconstruído:**

> Estamos atualizando seu acesso único. Abra a página de verificação com a identidade da empresa e confirme o novo dispositivo para evitar interrupção.

- **Nota:** nenhum endereço, código, marca ou fator real é fornecido.

## Por que funcionava no contexto

- a página é personalizada com identidade da vítima;
- a ligação responde a dúvidas em tempo real;
- SSO e MFA são processos familiares;
- o atacante conhece aplicações usadas pela organização;
- a extorsão pode ocorrer meses depois, separando ação e consequência.

## Indícios e limites

O usuário pode verificar se iniciou o chamado, se o dispositivo é próprio e se a rota veio do diretório ou portal conhecido. A organização precisa restringir mudanças de MFA e monitorar exportações e consentimentos.

Marca correta e informação verdadeira demonstram pesquisa ou acesso anterior, não autenticidade do contato.

## Comportamento seguro ensinável

Não fornecer credenciais, códigos ou registrar fator durante ligação não iniciada; encerrar e abrir suporte e identidade por rota conhecida.

## Possibilidade de atividade

- **Formato candidato:** cadeia vishing textual → SSO personalizado → console de fatores.
- **Decisão principal:** vincular cada ação a chamado e dispositivo próprios.
- **Variação legítima necessária:** migração planejada anunciada e iniciada pelo portal.
- **Transferência curta:** contato começa por chat e migra para telefone.
- **Risco pedagógico:** ensinar que personalização visual ou voz pode ser verificada por intuição.

## Justificativa da dificuldade

Personalização, voz, SSO, MFA e múltiplos SaaS fornecem poucos indícios e forte alinhamento. A resposta exige processo de identidade resistente, caracterizando Avançado.

## Relação com o currículo atual

Combina **Ele já sabia meus dados**, **Você iniciou este acesso?**, **De qual dispositivo veio este código?** e **Ataque multicanal**.

## Fonte

- [Google/Mandiant — Tracking ShinyHunters-branded SaaS data theft](https://cloud.google.com/blog/topics/threat-intelligence/expansion-shinyhunters-saas-data-theft)
