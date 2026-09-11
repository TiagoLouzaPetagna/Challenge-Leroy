# A08 — Código de conduta abre cadeia AiTM

```yaml
id: real-case:a08-code-of-conduct-aitm
dificuldade: avancado
area_corporativa: juridico-e-compliance
industrias: [aplicavel-a-todos]
papeis_alvo: [todos-os-funcionarios, compliance, juridico, financeiro]
canais: [email, servico-legitimo, pagina-intermediaria, autenticacao]
tecnica_dominante: aitm-multietapa
tecnicas_secundarias: [pretexto-de-compliance, email-autenticado, redirecionamento, roubo-de-token]
objetivo_do_atacante: comprometer conta e preparar fraude financeira
fonte_principal: Microsoft Code of Conduct AiTM Campaign
data_da_fonte: 2026-05-04
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft descreveu campanha em grande escala com tema de código de conduta, cadeia de várias etapas, serviços legítimos de e-mail e mensagens autenticadas a partir de domínios controlados pelo atacante. A opção de entrada conduzia a sessão AiTM capaz de capturar tokens. A campanha observada atingiu dezenas de milhares de usuários em milhares de organizações.

## Sequência observada

1. mensagem formal solicita revisão de política ou conduta;
2. serviço legítimo ou remetente autenticado reduz suspeita técnica;
3. página intermediária apresenta opções de acesso;
4. autenticação Microsoft é intermediada por AiTM;
5. token é capturado e a conta pode apoiar fraude financeira.

## Texto usado na campanha

- **Natureza:** reconstrução segura baseada no tema e na ação publicados.
- **Exemplo reconstruído:**

> A atualização anual do Código de Conduta exige ciência até o fim do expediente. Entre com sua conta corporativa para revisar e confirmar.

- **Nota:** a fonte também descreve a opção de entrar com Microsoft; nenhum botão ou endereço é reproduzido aqui.

## Por que funcionava no contexto

- política e compliance alcançam todos os funcionários;
- prazo de ciência é comum;
- mensagem autenticada reduz alertas simples;
- serviços legítimos participam da entrega;
- a página final utiliza fluxo familiar de identidade.

## Indícios e limites

Gramática, autenticação do e-mail e marca não comprovam finalidade. O funcionário pode verificar se a política existe no portal corporativo e se a solicitação foi anunciada. Não pode detectar AiTM com confiabilidade apenas olhando a página.

O controle deve combinar publicação em portal conhecido, MFA resistente a phishing, proteção de e-mail e processo financeiro.

## Comportamento seguro ensinável

Recuperar políticas e treinamentos pelo portal corporativo conhecido, sem reutilizar a rota oferecida pela mensagem, mesmo quando o e-mail parece tecnicamente válido.

## Possibilidade de atividade

- **Formato candidato:** percurso de redirecionamento com portal de compliance fictício.
- **Decisão principal:** qual origem comprova que a obrigação existe.
- **Variação legítima necessária:** treinamento real previamente anunciado e visível no portal.
- **Transferência curta:** política chega por convite de calendário.
- **Risco pedagógico:** ensinar que mensagem autenticada é segura ou cobrar detecção visual de AiTM.

## Justificativa da dificuldade

Pretexto universal, comunicação formal, entrega autenticada e fluxo de login conhecido removem pistas comuns. A confirmação depende de fonte corporativa independente, caracterizando Avançado.

## Relação com o currículo atual

Combina **O aviso que não podia esperar**, **Para onde esse link realmente vai?**, **Espelho de Página** e **Uma manhã comum**. O AiTM permanece debrief técnico.

## Fonte

- [Microsoft — Multi-stage code of conduct phishing leads to AiTM token compromise](https://www.microsoft.com/en-us/security/blog/2026/05/04/breaking-the-code-multi-stage-code-of-conduct-phishing-campaign-leads-to-aitm-token-compromise/)
