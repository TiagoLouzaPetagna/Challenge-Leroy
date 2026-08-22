# Conjunto 06 — Canais, personificação e IA

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividades proprietárias:** **A central que não podia esperar**, **Central de mensagens** e **Ataque multicanal**.

## Objetivo

Ensinar que mudar de canal não confirma identidade quando o próprio solicitante controla a transição. Voz, vídeo, caller ID, conta social e mídia bem produzida aumentam plausibilidade; a decisão segura continua baseada em contato anterior, diretório e processo oficial.

## Conceitos pesquisados — canais e suporte

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:smishing` | Smishing e SMS | Usar app ou site oficial; link curto e número conhecido não bastam. | Central de mensagens | Ataque multicanal |
| `concept:messaging-phishing` | Phishing em mensageria | Reconciliar identidade ao mudar de plataforma e preservar o canal anterior. | Central de mensagens | Uma manhã comum |
| `concept:vishing` | Vishing | Encerrar e iniciar nova ligação usando número obtido independentemente. | A central que não podia esperar | Ataque multicanal |
| `concept:caller-id-spoofing` | Caller-ID ou sender-ID falsificado | Número exibido é evidência limitada, não autenticação. | A central que não podia esperar | Central de mensagens |
| `concept:callback-phishing` | Callback phishing | Não usar telefone contido em cobrança, pop-up ou alerta; consultar fornecedor por conta própria. | A central que não podia esperar | Ataque multicanal |
| `concept:fake-0800` | Falso 0800 ou central | Origem oficial do número importa mais que sua aparência ou gratuidade. | A central que não podia esperar | O primeiro resultado |
| `concept:fake-tech-support` | Falso suporte ou help desk | Validar ticket, técnico e canal; suporte não precisa da senha, OTP ou pagamento. | A central que não podia esperar | Você iniciou este acesso? |
| `concept:remote-assistance` | Quick Assist, AnyDesk, TeamViewer ou acesso remoto equivalente | Só aceitar em chamado iniciado e confirmado, com escopo visível. | A central que não podia esperar | Documento inesperado; Cliquei. E agora? |
| `concept:email-bombing-support` | E-mail bombing seguido de falso suporte | Enxurrada repentina é incidente; ajuda espontânea pode fazer parte da mesma cadeia. | Ataque multicanal | A central que não podia esperar |
| `concept:external-collaboration` | Chat externo e tenant de colaboração | Verificar marcador externo, identidade e necessidade antes de aceitar conversa ou arquivo. | Central de mensagens | Ataque multicanal |

## Conceitos pesquisados — redes sociais, mídia e cadeia

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:cloned-social-profile` | Perfil clonado ou conta social tomada | Foto, nome e contatos em comum não transferem confiança ao novo perfil. | Central de mensagens | Ele já sabia meus dados |
| `concept:new-number-scam` | Troca de número | Confirmar no contato antigo ou por terceiro conhecido antes de agir. | Central de mensagens | Ele já sabia meus dados |
| `concept:angler-phishing` | Falso atendimento após comentário público | Procurar o perfil e canal oficial, não seguir a primeira resposta privada. | Central de mensagens, caso rotativo | O primeiro resultado |
| `concept:catfishing-honeytrap` | Catfishing e honey trap | Relação e intimidade não substituem verificação; pedidos graduais exigem apoio externo. | Ele já sabia meus dados, caso longitudinal | Central de mensagens |
| `concept:virtual-meeting-bec` | Reunião virtual falsa | Falha de câmera ou áudio não é prova; pedido de alto impacto continua exigindo aprovação externa. | Ataque multicanal | Pedido urgente de um gestor |
| `concept:voice-cloning` | Voz clonada | Não decidir pela semelhança da voz; retornar por contato conhecido e usar segunda pessoa. | Ele já sabia meus dados, por transcrição ou mídia futura validada | A central que não podia esperar |
| `concept:deepfake-video` | Deepfake de vídeo | Não procurar apenas artefatos; verificar identidade, pedido e processo. | Ele já sabia meus dados, por transcrição ou mídia futura validada | Ataque multicanal |
| `concept:ai-polished-text` | Texto gerado ou aprimorado por IA | Boa gramática, tradução e personalização não autenticam a mensagem. | Ele já sabia meus dados | Uma manhã comum |
| `concept:multichannel-chain` | Ataque multicanal | Avaliar a cadeia inteira e identificar o único canal realmente independente. | Ataque multicanal | Todas as atividades deste conjunto |
| `concept:false-cross-channel-corroboration` | Um canal validando falsamente outro | E-mail → ligação → chat → QR continua uma só origem se a transição veio do solicitante. | Ataque multicanal | A central que não podia esperar |
| `concept:platform-migration` | Migração induzida de plataforma | Preservar a identidade e o processo ao trocar de canal. | Central de mensagens | Ataque multicanal |
| `concept:prompt-injection-assistant` | Prompt injection contra assistente de IA | Resumo ou ação automática não constitui autorização; revisar a fonte e manter aprovação humana. | Limite e conscientização em Ataque multicanal | Defesa principal da plataforma |

## Pretextos de transferência

Emergência familiar, romance, investimento, recrutamento, falso governo, entrega e suporte podem ser casos rotativos para verificar identidade e independência do canal. Eles não devem ser todos apresentados na mesma tentativa.

## Composições candidatas 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| A central que não podia esperar | encerrar contato recebido e iniciar suporte pela rota oficial | caller ID | acesso remoto | ligação legítima que ainda deve ser vinculada a chamado real |
| Central de mensagens | manter identidade consistente ao mudar de número, conta ou plataforma | perfil clonado | novo número | contato legítimo que trocou número, confirmado pelo canal antigo |
| Ataque multicanal | identificar que canais fornecidos pelo solicitante pertencem à mesma cadeia | falsa corroboração | reunião/QR | cadeia legítima com uma confirmação realmente independente |

## Limites

- Voz e vídeo só entram como mídia quando houver qualidade equivalente, consentimento, transcrição e acessibilidade; transcrição pode ensinar o processo antes disso.
- Artefato audiovisual não será resposta correta obrigatória.
- Prompt injection invisível, detecção de áudio e identidade de tenant exigem controles técnicos.
- Nenhuma ligação, reunião, mensagem ou sessão remota é real.

## Fontes principais

- [MITRE ATT&CK — Spearphishing Voice](https://attack.mitre.org/techniques/T1566/004/);
- [Cyber.gov.au — Social engineering](https://www.cyber.gov.au/threats/types-threats/social-engineering);
- [FBI — Criminal use of artificial intelligence](https://www.fbi.gov/contact-us/field-offices/sanfrancisco/news/fbi-warns-of-increasing-threat-of-cyber-criminals-utilizing-artificial-intelligence);
- [Microsoft — Quick Assist abuse](https://www.microsoft.com/en-us/security/blog/2024/05/15/threat-actors-misusing-quick-assist-in-social-engineering-attacks-leading-to-ransomware/).
