# Conjunto 04 — Autenticação, permissões e sessões

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividades proprietárias:** **Você iniciou este acesso?**, **Login verdadeiro, permissão errada** e **De qual dispositivo veio este código?**.

## Objetivo

Ensinar que uma interface ou página legítima pode estar autorizando uma ação perigosa. O comportamento comum é vincular autenticação, código, dispositivo, aplicativo e permissão a uma ação iniciada pelo próprio funcionário e usar a área oficial para negar, revisar ou revogar.

## Conceitos pesquisados

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:credential-harvest` | Coleta de usuário e senha | Não reutilizar a página recebida; abrir o serviço independentemente. | Espelho de Página | Cliquei. E agora? |
| `concept:mfa-uninitiated` | Solicitação MFA não iniciada | Aprovar somente uma solicitação vinculada a uma ação própria e conferida. | Você iniciou este acesso? | Ataque multicanal |
| `concept:mfa-fatigue` | MFA fatigue ou push bombing | Negar, interromper a pressão, revisar acesso e reportar; nunca aprovar para silenciar. | Você iniciou este acesso? | A central que não podia esperar |
| `concept:mfa-context` | Número, localização e dispositivo do prompt | Usar como contexto, não como autorização isolada. | Você iniciou este acesso? | De qual dispositivo veio este código? |
| `concept:otp-theft` | Roubo de OTP | Código autentica quem o usa; não deve ser ditado, enviado ou colado para outra pessoa. | De qual dispositivo veio este código? | Você iniciou este acesso?; Central de mensagens |
| `concept:recovery-code-theft` | Código de recuperação | Tratar como segredo de alto impacto e iniciar recuperação só pela rota oficial. | De qual dispositivo veio este código? | Cliquei. E agora? |
| `concept:aitm` | Adversary-in-the-middle | MFA concluída e página convincente não provam que a rota era segura. | Espelho de Página, caso avançado observável | Login verdadeiro, permissão errada; Cliquei. E agora? |
| `concept:session-cookie` | Roubo ou reutilização de sessão | Trocar senha pode não encerrar todas as sessões; seguir resposta oficial e revisar acessos. | Cliquei. E agora?, como recuperação | Login verdadeiro, permissão errada |
| `concept:oauth-consent` | OAuth consent phishing | A página do provedor pode ser real; avaliar aplicativo, finalidade e escopos. | Login verdadeiro, permissão errada | Ataque multicanal |
| `concept:oauth-scopes` | Permissões excessivas | Relacionar cada escopo à função declarada e negar o que não foi iniciado ou não é necessário. | Login verdadeiro, permissão errada | O pedido não tinha link |
| `concept:publisher-identity` | Editor verificado ou aplicativo conhecido | É evidência útil, não autorização automática para qualquer permissão. | Login verdadeiro, permissão errada | O primeiro resultado |
| `concept:device-code` | Device-code phishing | Inserir somente código originado no dispositivo ou aplicativo que a própria pessoa está configurando. | De qual dispositivo veio este código? | Ataque multicanal |
| `concept:device-join` | Registro ou ingresso de dispositivo | Nomear e conferir o dispositivo; suporte ou reunião não devem fornecer código para vincular máquina alheia. | De qual dispositivo veio este código? | Login verdadeiro, permissão errada |
| `concept:account-pairing-qr` | QR de pareamento ou vinculação de conta | Escanear apenas durante fluxo iniciado no próprio aplicativo e revisar dispositivos vinculados. | De qual dispositivo veio este código? | Central de mensagens; O destino atrás do QR |
| `concept:sim-swap` | SIM swap | Perda inesperada de serviço ou aviso de troca exige contato imediato com operadora e segurança. | De qual dispositivo veio este código?, como resposta | Central de mensagens |
| `concept:recovery-method-takeover` | Cadastro de novo fator, passkey ou recuperação | Verificar toda inclusão de método e remover o que não foi iniciado. | De qual dispositivo veio este código? | Cliquei. E agora? |
| `concept:credential-stuffing-symptom` | Prompt decorrente de tentativa de senha reutilizada | O usuário não precisa diagnosticar a origem; deve negar e reportar acesso não iniciado. | Você iniciou este acesso?, como limite | Controle técnico |
| `concept:passkey-fido` | Passkeys e FIDO resistentes a phishing | Entender o benefício sem transformar presença ou ausência em veredito da mensagem. | Complemento em Login verdadeiro, permissão errada | Política e implantação técnica |
| `concept:password-manager` | Gerenciador de senhas vinculado ao domínio | Ausência de preenchimento pode ser pista, não prova, e não substitui a rota oficial. | Complemento em Espelho de Página | Uma letra fora do lugar |
| `concept:session-review-revoke` | Revisão e revogação de sessões ou aplicativos | Escolher recuperação compatível com sessão, consentimento e dispositivo expostos. | Cliquei. E agora? | As três atividades deste conjunto |

## Composições candidatas 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| Você iniciou este acesso? | negar e reportar autenticação não iniciada | repetição/fadiga | falso suporte | prompt único atrasado, mas ainda sem ação iniciada |
| Login verdadeiro, permissão errada | avaliar aplicativo, finalidade e escopos antes de consentir | provedor legítimo | editor verificado como evidência limitada | aplicativo legítimo pedindo somente escopo compatível |
| De qual dispositivo veio este código? | associar código, QR ou vínculo a dispositivo iniciado e reconhecido | device code | OTP/pareamento | código legítimo exibido no próprio equipamento em configuração |

## Limites

- OAuth e device code não serão inseridos silenciosamente em **Você iniciou este acesso?**, cuja v1 os exclui.
- O funcionário não precisa distinguir credential stuffing de password spraying.
- Token, cookie e revogação real dependem de backend e procedimento corporativo.
- Nenhuma atividade solicita credencial, OTP, código ou vinculação real.

## Fontes principais

- [MITRE ATT&CK — Multi-Factor Authentication Request Generation](https://attack.mitre.org/techniques/T1621/);
- [Microsoft — Protect against consent phishing](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/protect-against-consent-phishing);
- [Microsoft — Device code phishing](https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/);
- [Microsoft — AiTM phishing and session cookies](https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/);
- [NIST SP 800-63B — Authentication threats](https://pages.nist.gov/800-63-4/sp800-63b/security/).
