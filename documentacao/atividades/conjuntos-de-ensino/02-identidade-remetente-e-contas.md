# Conjunto 02 — Identidade, remetente e contas

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividades proprietárias:** **A conversa já estava acontecendo**, **Ele já sabia meus dados** e **Quem enviou de verdade?**.

## Objetivo

Ensinar a distinguir identidade alegada, conta utilizada, pessoa que pode controlá-la, contexto do pedido e autorização. O comportamento comum é relacionar evidências sem transformar um cabeçalho, dado pessoal ou histórico conhecido em prova definitiva.

## Conceitos pesquisados

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:identity-display-name` | Nome exibido, foto e cargo | Abrir os detalhes e não confundir apresentação visual com conta. | Quem enviou de verdade? | Central de mensagens; Pedido urgente de um gestor |
| `concept:identity-from` | Endereço completo e campo `From` | Identificar a conta declarada como origem, sem inferir controle humano. | Quem enviou de verdade? | A conversa já estava acontecendo |
| `concept:identity-reply-to` | `Reply-To` diferente | Verificar para onde a resposta será enviada e considerar usos legítimos de sistemas intermediários. | Quem enviou de verdade? | Uma manhã comum |
| `concept:identity-spoofing` | Spoofing do remetente | Diferenciar falsificação do campo de um domínio parecido controlado pelo atacante. | Quem enviou de verdade? | Domínio sob a lupa |
| `concept:identity-external-marker` | Avisos “Externo”, “primeiro contato” ou “não verificado” | Usar como evidência, nunca como veredito. | Quem enviou de verdade? | Uma manhã comum; Central de mensagens |
| `concept:identity-authentication-limits` | Limites de SPF, DKIM e DMARC | Não exigir leitura de cabeçalho bruto; autenticação do domínio não autoriza o pedido. | Explicação complementar em Quem enviou de verdade? | Controle técnico do servidor de e-mail |
| `concept:account-compromise` | Conta legítima comprometida | Endereço correto não garante que o titular controla a conta naquele momento. | A conversa já estava acontecendo | Quem enviou de verdade?; Ataque multicanal |
| `concept:thread-hijacking` | Conversation ou thread hijacking | Perceber mudança de pedido, destino, processo, tom ou horário em conversa real. | A conversa já estava acontecendo | Pagamento para quem? |
| `concept:thread-fabrication` | Thread fabricada | `Re:`, histórico citado e assinatura podem ser apenas texto no corpo. | A conversa já estava acontecendo, em caso de transferência | Quem enviou de verdade? |
| `concept:lateral-phishing` | Phishing interno ou lateral | Uma conta interna comprometida pode atingir colegas e fornecedores. | A conversa já estava acontecendo | Uma manhã comum; Ataque multicanal |
| `concept:cloud-account-abuse` | Conta ou serviço legítimo de nuvem abusado | Distinguir quem enviou, quem hospedou, quem compartilhou e quem controla o destino. | Quem enviou de verdade? | Documento inesperado; Para onde esse link realmente vai? |
| `concept:spear-phishing` | Spear phishing | Dados do cargo e da rotina aumentam a plausibilidade, não a autenticidade. | Ele já sabia meus dados | Pedido urgente de um gestor |
| `concept:whaling` | Whaling e fraude contra lideranças | Manter confirmação e aprovação mesmo diante de identidade de alto valor. | Ele já sabia meus dados, em caso de função | Pedido urgente de um gestor |
| `concept:osint-personalization` | OSINT, pegada digital e organograma | Reconhecer que informações públicas podem construir um pedido convincente. | Ele já sabia meus dados | O pedido não tinha link |
| `concept:leaked-data` | Dados vazados usados como credibilidade | Nome, CPF, endereço, pedido ou fornecedor corretos não autenticam o contato. | Ele já sabia meus dados | Central de mensagens; Pagamento para quem? |
| `concept:synthetic-identity` | Identidade sintética e perfil composto | Confirmar pelo processo e por contatos anteriores, não por coerência aparente do perfil. | Ele já sabia meus dados | Central de mensagens |
| `concept:inbox-manipulation` | Regras maliciosas de encaminhamento e ocultação | Sumir resposta ou alterar fluxo após comprometimento é sinal para revisão e reporte, não diagnóstico individual. | Complemento em A conversa já estava acontecendo | Cliquei. E agora?; controle técnico |

## Composições candidatas 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| A conversa já estava acontecendo | confirmar fora da conversa quando o comportamento ou processo muda | conta comprometida | thread hijacking | mesma mudança em chat corporativo |
| Ele já sabia meus dados | tratar dados corretos e mídia convincente como plausibilidade, não autenticação | OSINT/dados vazados | identidade sintética | emergência ou recrutamento com detalhes verdadeiros |
| Quem enviou de verdade? | mapear nome, conta, resposta, domínio e contexto sem inferir controle não comprovado | `Reply-To` | conta comprometida | caso com todos os campos corretos, mas pedido inconclusivo |

## Limites

- Endereço correto não prova autorização; endereço diferente não prova fraude.
- Sistemas legítimos podem usar remetente ou `Reply-To` intermediário.
- Funcionário não substitui filtros, DMARC, investigação de logs ou resposta a conta comprometida.
- O mapa deve dizer “controle não comprovado”, nunca atribuir pessoa com certeza sem evidência.

## Fontes principais

- [MITRE ATT&CK — Phishing T1566](https://attack.mitre.org/techniques/T1566/);
- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise);
- [Microsoft — File hosting services misused for phishing](https://www.microsoft.com/en-us/security/blog/2024/10/08/file-hosting-services-misused-for-identity-phishing/);
- [NIST Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851).
