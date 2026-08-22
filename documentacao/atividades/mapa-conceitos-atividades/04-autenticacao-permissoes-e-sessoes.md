# Mapa — Autenticação, permissões e sessões

> **Estado:** mapa curricular e 21 blueprints de primeira versão aprovados em 2026-08-15; conversão técnica em proposta separada.

## Critério do conjunto

Os proprietários seguem a pergunta defensiva que deve orientar a ação: **Você iniciou este acesso?** concentra solicitações MFA; **Login verdadeiro, permissão errada** concentra aplicativo, finalidade e consentimento; **De qual dispositivo veio este código?** concentra códigos, dispositivos e métodos vinculados. Coleta de credenciais pertence a **Espelho de Página**, enquanto sessão e recuperação ficam em **Cliquei. E agora?**.

Nenhuma tentativa combina silenciosamente MFA, OAuth e device code. Fenômenos não observáveis — AiTM, cookie de sessão e causa de um prompt — entram somente para explicar consequências e calibrar responsabilidades. O portal jamais solicita segredo, autentica, concede consentimento, vincula dispositivo ou revoga acesso real.

## Mapa conceito → atividade

| `conceptId` | Conceito | Atividade proprietária | Papel | Formato | Decisão | Momento | Aplicação prevista | Aplicações secundárias |
|---|---|---|---|---|---|---|---|---|
| `concept:credential-harvest` | Coleta de usuário e senha | Espelho de Página | Núcleo | Combinação | Manter | Primeira versão | Fechar uma página de login inerte, reabrir o serviço por rota conhecida e classificar quais evidências podem ser copiadas; nenhum campo recebe texto. | Cliquei. E agora?; Documento inesperado |
| `concept:mfa-uninitiated` | Solicitação MFA não iniciada | Você iniciou este acesso? | Núcleo | Formato A | Manter | Primeira versão | Negar um evento fictício, abrir a área oficial simulada, revisar o contexto e reportar, sem notificação do sistema ou cronômetro. | Ataque multicanal; Cliquei. E agora? |
| `concept:mfa-fatigue` | MFA fatigue ou push bombing | Você iniciou este acesso? | Complementar | Formato A | Manter | Primeira versão | Manter a recusa diante de uma fila controlada e de falso suporte textual, sem som, vibração, volume perturbador ou pressão de tempo. | A central que não podia esperar; Ataque multicanal |
| `concept:mfa-context` | Número, localização e dispositivo do prompt | Você iniciou este acesso? | Complementar | Formato B | Manter | Primeira versão | Associar cada prompt a uma ação própria ou marcar “sem vínculo”, usando número, local e dispositivo apenas como contexto falível. | De qual dispositivo veio este código? |
| `concept:otp-theft` | Roubo de OTP | De qual dispositivo veio este código? | Núcleo | Formato B | Manter | Primeira versão | Um falso suporte reformula o pedido por um código apenas rotulado; a pessoa encerra a conversa e usa o canal oficial sem digitar segredo. | Você iniciou este acesso?; Central de mensagens |
| `concept:recovery-code-theft` | Código de recuperação | De qual dispositivo veio este código? | Complementar | Formato A | Combinar | Banco de casos | Classificar a função de itens mascarados e reconhecer o código de recuperação como segredo de alto impacto, sem ensinar formato real ou armazenamento. | Cliquei. E agora? |
| `concept:aitm` | Adversary-in-the-middle | Espelho de Página | Debrief ou limite técnico | Combinação | Adaptar | Debrief | A atividade avalia somente abandonar a rota recebida; depois, uma cadeia causal explica por que login e MFA bem-sucedidos não comprovam sessão segura. | Cliquei. E agora?; Login verdadeiro, permissão errada |
| `concept:session-cookie` | Roubo ou reutilização de sessão | Cliquei. E agora? | Debrief ou limite técnico | Formato B | Combinar | Debrief | Após uma exposição declarada, incluir revisão de sessões no plano proporcional e explicar que trocar senha pode não encerrá-las; nenhuma detecção de cookie é pedida. | Login verdadeiro, permissão errada |
| `concept:oauth-consent` | OAuth consent phishing | Login verdadeiro, permissão errada | Núcleo | Combinação | Manter | Primeira versão | Conferir aplicativo, finalidade, ação iniciada, editor e escopos numa tela abstrata e consultar o catálogo fictício antes de consentir ou escalar. | Ataque multicanal; O primeiro resultado |
| `concept:oauth-scopes` | Permissões excessivas | Login verdadeiro, permissão errada | Núcleo | Formato A | Manter | Primeira versão | Relacionar cada permissão traduzida à finalidade, aceitando compatível, excessiva ou informação insuficiente em vez de contar escopos. | O pedido não tinha link |
| `concept:publisher-identity` | Editor verificado ou aplicativo conhecido | Login verdadeiro, permissão errada | Complementar | Formato B | Combinar | Primeira versão | Comparar dois pedidos do mesmo editor com finalidades e permissões diferentes, demonstrando que identidade não é autorização universal. | O primeiro resultado |
| `concept:device-code` | Device-code phishing | De qual dispositivo veio este código? | Núcleo | Formato A | Manter | Primeira versão | Relacionar código fictício à ação, ao aplicativo e ao dispositivo que o originou, sem copiar, digitar ou abrir página real. | Ataque multicanal; Central de mensagens |
| `concept:device-join` | Registro ou ingresso de dispositivo | De qual dispositivo veio este código? | Variação de caso | Combinação | Combinar | Banco de casos | Um falso suporte fornece o contexto e uma mesa de registro mostra conta, máquina, chamado e efeito do vínculo antes da decisão. | Você iniciou este acesso?; A central que não podia esperar |
| `concept:account-pairing-qr` | QR de pareamento ou vinculação de conta | De qual dispositivo veio este código? | Variação de caso | Formato B | Adaptar | Banco de casos | Depois de interação declarada, revisar vínculos fictícios e solicitar remoção ou confirmação; o QR aparece apenas narrado e não é escaneável. | O destino atrás do QR; Central de mensagens |
| `concept:sim-swap` | SIM swap | De qual dispositivo veio este código? | Transferência | Combinação | Combinar | Versão futura | Combinar perda de serviço com outros sinais e montar um plano por canais alternativos, sem diagnosticar troca de SIM por um sintoma isolado. | Central de mensagens; Cliquei. E agora? |
| `concept:recovery-method-takeover` | Cadastro de novo fator, passkey ou recuperação | De qual dispositivo veio este código? | Variação de caso | Formato B | Manter | Banco de casos | Comparar migração planejada e inclusão não solicitada, usando inventário sintético para verificar, solicitar revogação e reportar. | Cliquei. E agora? |
| `concept:credential-stuffing-symptom` | Prompt decorrente de tentativa de senha reutilizada | Você iniciou este acesso? | Debrief ou limite técnico | Nenhum como player próprio | Descartar como atividade própria | Debrief | Revelar somente após a decisão que prompts iguais podem ter causas distintas; avaliar negar e reportar, nunca diagnosticar stuffing ou atribuir culpa. | Cliquei. E agora? |
| `concept:passkey-fido` | Passkeys e FIDO resistentes a phishing | Login verdadeiro, permissão errada | Debrief ou limite técnico | Formato B | Combinar | Debrief | Uma falha representada leva a reabrir a rota oficial; o debrief explica resistência a phishing sem prometer invulnerabilidade nem acionar WebAuthn. | Espelho de Página; Você iniciou este acesso? |
| `concept:password-manager` | Gerenciador de senhas vinculado ao domínio | Espelho de Página | Complementar | Combinação | Manter | Banco de casos | Comparar formulários inertes com estado declarativo do gerenciador e calibrar ausência de preenchimento como pista, não veredito. | Uma letra fora do lugar; Login verdadeiro, permissão errada |
| `concept:session-review-revoke` | Revisão e revogação de sessões ou aplicativos | Cliquei. E agora? | Núcleo | Combinação | Manter | Primeira versão | Relacionar o tipo de exposição às contenções e operar uma central inteiramente simulada de sessões, dispositivos e aplicativos, com “solicitar” em vez de prometer efeito real. | Você iniciou este acesso?; Login verdadeiro, permissão errada; De qual dispositivo veio este código? |

## Decisões do conjunto

- **Você iniciou este acesso?** continua dedicada a prompts MFA; OAuth e device code não são inseridos como variações escondidas desse player.
- **De qual dispositivo veio este código?** usa origem e vínculo como princípio comum, mas separa OTP, device code, ingresso, QR e método de recuperação em casos diferentes.
- **Login verdadeiro, permissão errada** ensina que a autenticidade do provedor ou editor não substitui finalidade, escopo e autorização de processo.
- **Cliquei. E agora?** é o proprietário da resposta a sessão exposta e da revisão/revogação; a central é declarativa e não promete operar contas externas.
- AiTM, cookie, credential stuffing e resistência de passkeys não viram testes de detecção. Apenas comportamentos observáveis podem compor avaliação.
- SIM swap permanece para versão futura até haver procedimento local de contato alternativo, operadora e identidade.
- Todos os códigos, fatores, aplicativos, sessões e dispositivos são fictícios; entrada livre de segredo e integração real continuam proibidas.

## Regra de leitura

- **Atividade proprietária** é única e documental; não cria ID, rota ou disponibilidade.
- **Formato** e **Decisão** correspondem à matriz homônima de viabilidade.
- **Momento** impede que o inventário completo seja confundido com conteúdo simultâneo.
- **Aplicações secundárias** não duplicam propriedade.
