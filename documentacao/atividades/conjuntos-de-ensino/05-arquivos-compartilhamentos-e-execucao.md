# Conjunto 05 — Arquivos, compartilhamentos e execução

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividade proprietária:** **Documento inesperado**.
> **Aplicações:** **Uma manhã comum**, **Ataque multicanal** e **Cliquei. E agora?**.

## Objetivo

Ensinar a avaliar contexto, origem, necessidade e comportamento pedido por um arquivo. O funcionário não precisa memorizar extensões exóticas; precisa interromper instruções que contornam proteções, confirmar o conteúdo por canal conhecido e responder proporcionalmente se houve download, abertura ou execução.

## Conceitos pesquisados

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:unexpected-attachment` | Anexo inesperado | Confirmar necessidade, remetente e contexto antes de interagir. | Documento inesperado | Uma manhã comum |
| `concept:file-format-variety` | Office, PDF, HTML, SVG, OneNote, atalho, executável e imagem de disco | Formato isolado não é veredito; comportamento e processo importam. | Documento inesperado | Ataque multicanal |
| `concept:hidden-double-extension` | Extensão escondida ou dupla extensão | Reconhecer inconsistência sem exigir memorização completa de tipos. | Documento inesperado | Uma manhã comum |
| `concept:icon-masquerade` | Ícone ou nome incompatível | Aparência de documento não comprova seu tipo nem sua necessidade. | Documento inesperado | O primeiro resultado |
| `concept:rtlo-file-name` | Unicode RTL no nome do arquivo | Caso avançado assistido; não avaliar pela capacidade de decodificar manualmente. | Documento inesperado, variação avançada | Ataque multicanal |
| `concept:password-archive` | ZIP ou RAR com senha | Senha pode evitar análise, mas também existe em usos legítimos; confirmar acordo e canal. | Documento inesperado | Uma manhã comum |
| `concept:cloud-share` | Documento compartilhado em nuvem | Notificação e hospedagem legítimas não autenticam autor, conteúdo ou destino final. | Documento inesperado | Quem enviou de verdade?; Para onde esse link realmente vai? |
| `concept:calendar-invite` | Convite de calendário ou arquivo ICS | Convite pode carregar link, telefone ou anexo; confirmar contexto antes de seguir. | Documento inesperado | Uma manhã comum; Ataque multicanal |
| `concept:macro-enable-content` | Macro e “habilitar conteúdo” | Nunca contornar proteção por instrução contida no próprio arquivo. | Documento inesperado | Uma manhã comum |
| `concept:disable-protection` | Desativar antivírus, SmartScreen, modo protegido ou política | Interromper e usar suporte oficial; autorização não vem do conteúdo bloqueado. | Documento inesperado | A central que não podia esperar |
| `concept:document-as-bridge` | PDF, HTML ou documento usado como ponte para link ou QR | Abertura sem alerta não torna seguro o próximo destino. | Documento inesperado | O destino atrás do QR; Espelho de Página |
| `concept:html-smuggling` | HTML smuggling e download construído no navegador | Parar quando “documento” inicia download ou execução inesperada; análise profunda é técnica. | Documento inesperado | Ataque multicanal |
| `concept:clickfix` | ClickFix ou falso CAPTCHA | Site, CAPTCHA ou suporte não exigem abrir Executar, PowerShell ou Terminal e colar comando. | Documento inesperado | Espelho de Página; A central que não podia esperar |
| `concept:copied-command` | Comando copiado e execução orientada | Nenhum comando funcional aparece no treinamento; interromper e reportar. | Documento inesperado | Cliquei. E agora? |
| `concept:fake-update` | Atualização falsa | Instalar somente pela ferramenta, loja ou processo oficial. | Documento inesperado | O primeiro resultado |
| `concept:scareware` | Alerta falso, antivírus falso e tela cheia | Fechar com segurança e abrir suporte por rota própria; não ligar para número do alerta. | A central que não podia esperar | Documento inesperado |
| `concept:remote-tool-artifact` | Instalador remoto, extensão, arquivo RDP | Exigir chamado iniciado, técnico confirmado e escopo visível. | Documento inesperado | A central que não podia esperar; Cliquei. E agora? |
| `concept:file-view-download-open-execute` | Visualizar, baixar, abrir e executar | Distinguir exposição e recuperação em vez de recomendar a mesma resposta para tudo. | Documento inesperado | Cliquei. E agora? |
| `concept:antivirus-silence` | “O antivírus não alertou” | Ausência de alerta não autoriza o arquivo; contexto e política continuam necessários. | Documento inesperado | Uma manhã comum |
| `concept:polyglot-magic-type` | Arquivo poliglota ou tipo interno divergente | Não transformar em pegadinha visual; análise pertence a scanner e endpoint. | Limite técnico | Nenhuma atividade pontuada |

## Composição candidata 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| Documento inesperado | confirmar contexto e recusar quebra de proteção antes de abrir ou executar | arquivo disfarçado | ClickFix/comando | compartilhamento legítimo inesperado que exige confirmação, não reporte automático |

Uma tentativa usa somente uma família de arquivo e uma quebra de proteção. As demais entram em versões ou casos rotativos.

## Limites

- Não há link, macro, comando, instalador ou arquivo executável real.
- Senha em arquivo, PDF, ZIP e nuvem não são maliciosos por definição.
- Scanner, sandbox, assinatura e inspeção de tipo continuam controles técnicos.
- USB pertence canonicamente ao conjunto presencial, embora compartilhe a ideia de execução.

## Fontes principais

- [MITRE ATT&CK — Spearphishing Attachment](https://attack.mitre.org/techniques/T1566/001/);
- [MITRE ATT&CK — Malicious File](https://attack.mitre.org/techniques/T1204/002/);
- [MITRE ATT&CK — Malicious Copy and Paste](https://attack.mitre.org/techniques/T1204/004/);
- [Microsoft — ClickFix](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/).
