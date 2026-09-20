# Conjunto 08 — Reporte e recuperação

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividade proprietária:** **Cliquei. E agora?**.
> **Aplicação:** toda atividade que termina em verificação, reporte, contenção ou recuperação.

## Objetivo

Ensinar resposta proporcional ao que realmente aconteceu, sem culpa e sem medidas genéricas desnecessárias. O comportamento comum é parar a interação, preservar fatos, usar o canal oficial, proteger o ativo correto e não compartilhar segredos no reporte.

## Conceitos pesquisados

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:no-blame-reporting` | Cultura de reporte sem culpa | Reportar cedo reduz impacto; clique ou erro não deve ser escondido nem usado para constrangimento. | Cliquei. E agora? | Todas as atividades |
| `concept:report-preserve` | Preservação de contexto | Guardar canal, horário, remetente, assunto, destino aparente e ação realizada. | Cliquei. E agora? | A conversa já estava acontecendo |
| `concept:do-not-delete-forward` | Não apagar nem encaminhar indiscriminadamente | Excluir pode remover evidência; encaminhar pode ampliar exposição. | Cliquei. E agora? | Documento inesperado |
| `concept:opened-message-response` | Apenas abriu a mensagem | Parar, preservar detalhes e seguir orientação; não afirmar comprometimento automático. | Cliquei. E agora? | Uma manhã comum |
| `concept:clicked-link-response` | Clicou sem fornecer dado | Fechar, não continuar, preservar destino e reportar conforme procedimento. | Cliquei. E agora? | Espelho de Página |
| `concept:credential-response` | Informou credencial | Reportar imediatamente, alterar por rota oficial e revisar sessões conforme orientação. | Cliquei. E agora? | Espelho de Página |
| `concept:otp-mfa-response` | Compartilhou OTP ou aprovou MFA | Tratar como possível tomada de conta, negar novos eventos e revisar acesso. | Cliquei. E agora? | Você iniciou este acesso? |
| `concept:oauth-response` | Concedeu OAuth | Revogar consentimento e revisar aplicativos/sessões; trocar apenas senha pode não remover acesso. | Cliquei. E agora?, caminho futuro | Login verdadeiro, permissão errada |
| `concept:device-link-response` | Vinculou dispositivo ou método | Remover vínculo não reconhecido e revisar recuperação pela área oficial. | Cliquei. E agora?, caminho futuro | De qual dispositivo veio este código? |
| `concept:file-execution-response` | Abriu ou executou arquivo | Interromper e acionar equipe responsável; não tentar “limpar” sozinho. | Cliquei. E agora?, caminho futuro | Documento inesperado |
| `concept:command-response` | Colou ou executou comando | Parar a interação e acionar resposta oficial imediatamente. | Cliquei. E agora?, caminho futuro | Documento inesperado |
| `concept:remote-access-response` | Concedeu acesso remoto | Encerrar sessão quando seguro e acionar suporte/segurança oficial. | Cliquei. E agora?, caminho futuro | A central que não podia esperar |
| `concept:data-disclosure-response` | Enviou dado pessoal ou corporativo | Informar Segurança e Privacidade, especificando o dado sem reproduzir segredo desnecessariamente. | Cliquei. E agora?, caminho futuro | O pedido não tinha link |
| `concept:payment-response` | Realizou pagamento | Acionar imediatamente Financeiro e instituição por canal oficial e preservar evidências. | Cliquei. E agora?, caminho futuro | Pagamento para quem? |
| `concept:account-recovery` | Recuperação de conta e sessão | Usar serviço aberto independentemente e aplicar medida proporcional a credencial, sessão, permissão ou dispositivo. | Cliquei. E agora? | Conjunto 04 |
| `concept:report-without-secrets` | Reporte sem senha, OTP ou código | Informar fatos úteis sem enviar credencial, token ou segredo nem ao suposto suporte. | Cliquei. E agora? | Todas as atividades com reporte |
| `concept:uncertain-reporting` | Reportar mesmo em dúvida | O canal oficial pode investigar; o funcionário não precisa provar intenção criminosa. | Cliquei. E agora? | Uma manhã comum |
| `concept:extortion-response` | Extorsão, sextorsão ou chantagem | Não pagar nem apagar; preservar, bloquear, reportar e buscar apoio apropriado. | Cliquei. E agora?, caso de transferência futuro | Ele já sabia meus dados |
| `concept:collective-protection` | Reporte como proteção coletiva | Alertar a organização sem expor publicamente erro ou resultado individual. | Cliquei. E agora? | A conversa já estava acontecendo; Ataque multicanal |
| `concept:incident-causality` | Linha temporal e exposição | Distinguir mensagem, clique, credencial, permissão, execução e pagamento para escolher resposta. | Mecânica Linha do Incidente dentro de Cliquei. E agora? | Ataque multicanal |

## Composição candidata 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| Cliquei. E agora? | montar resposta proporcional ao evento real e reportar sem culpa | preservar fatos | não compartilhar segredo | segundo incidente com exposição diferente, exigindo outro plano |

Os caminhos de arquivo, OAuth, dado e pagamento são futuros até possuírem contrato, avaliador, persistência e conteúdo aprovados. A mecânica **Linha do Incidente** não recebe atividade ou recompensa separada enquanto for apenas uma forma de reconstruir o caso.

## Limites

- A atividade não altera senha, sessão, consentimento, dispositivo, arquivo ou pagamento real.
- Canal e procedimento corporativos permanecem “não configurados” até publicação autorizada.
- Orientações genéricas não substituem resposta de Segurança, Privacidade, Financeiro ou Jurídico.
- Velocidade não pontua; “reportar rapidamente” significa não adiar em situação real.

## Fontes principais

- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing);
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing);
- [CERT.br — Golpes: o que fazer](https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf);
- [CISA — Four Cybersecurity Essentials](https://www.cisa.gov/resources-tools/resources/four-cybersecurity-essentials-sltts).
