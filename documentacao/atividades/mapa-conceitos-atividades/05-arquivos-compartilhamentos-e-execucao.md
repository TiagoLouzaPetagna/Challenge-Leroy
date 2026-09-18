# Mapa — Arquivos, compartilhamentos e execução

> **Estado:** mapa curricular e 21 blueprints de primeira versão aprovados em 2026-08-15; conversão técnica em proposta separada.

## Critério do conjunto

**Documento inesperado** é o proprietário do processo comum: confirmar contexto, inspecionar apenas a representação segura e recusar qualquer quebra de proteção antes de abrir ou executar. Formatos, disfarces, arquivos protegidos, nuvem, macros e pontes para outro destino entram como casos ou complementos, nunca como uma enciclopédia simultânea. Convites pertencem à triagem de **Uma manhã comum**; atualização segura pertence a **O primeiro resultado**; falso suporte, scareware e acesso remoto pertencem a **A central que não podia esperar**; estágios de exposição e contenção pertencem a **Cliquei. E agora?**.

Artefatos técnicos invisíveis só aparecem em debrief. Nenhum arquivo, macro, QR, comando, clipboard, atualização, instalador, extensão ou sessão remota é funcional, e a atividade não ensina caminhos para desativar controles.

## Mapa conceito → atividade

| `conceptId` | Conceito | Atividade proprietária | Papel | Formato | Decisão | Momento | Aplicação prevista | Aplicações secundárias |
|---|---|---|---|---|---|---|---|---|
| `concept:unexpected-attachment` | Anexo inesperado | Documento inesperado | Núcleo | Formato A | Manter | Primeira versão | Comparar o anexo textual com agenda, chamado, histórico e contato conhecido antes de prosseguir, verificar ou reportar. | Uma manhã comum |
| `concept:file-format-variety` | Office, PDF, HTML, SVG, OneNote, atalho, executável e imagem de disco | Documento inesperado | Variação de caso | Formato B | Combinar | Banco de casos | Repetir o mesmo pedido em PDF, link de nuvem, compactado ou outro contêiner e cobrar processo consistente, sem classificar extensões como seguras ou perigosas. | Uma manhã comum; Ataque multicanal |
| `concept:hidden-double-extension` | Extensão escondida ou dupla extensão | Documento inesperado | Complementar | Formato A | Adaptar | Primeira versão | Abrir um inspetor fictício com nome exibido, nome completo, tipo alegado e origem; a pessoa identifica inconsistência sem memorizar extensões. | Uma manhã comum |
| `concept:icon-masquerade` | Ícone ou nome incompatível | Documento inesperado | Variação de caso | Combinação | Combinar | Banco de casos | Calibrar ícone e nome como pistas fracas e conferir o artefato recebido contra a entrega esperada no canal oficial. | O primeiro resultado |
| `concept:rtlo-file-name` | Unicode RTL no nome do arquivo | Documento inesperado | Variação de caso | Formato B | Adaptar | Banco de casos | Resolver pela origem e pelo processo quando o sistema informa inconsistência; direção e caractere invisível são explicados depois, sem teste perceptivo. | Ataque multicanal |
| `concept:password-archive` | ZIP ou RAR com senha | Documento inesperado | Variação de caso | Formato B | Manter | Banco de casos | Contrastar arquivos protegidos esperado e inesperado, usando acordo e confirmação independente sem solicitar senha nem extrair conteúdo. | Uma manhã comum |
| `concept:cloud-share` | Documento compartilhado em nuvem | Documento inesperado | Variação de caso | Combinação | Manter | Banco de casos | Separar serviço, remetente, proprietário e destino e depois procurar o compartilhamento numa área oficial inteiramente simulada. | Quem enviou de verdade?; Para onde esse link realmente vai? |
| `concept:calendar-invite` | Convite de calendário ou arquivo ICS | Uma manhã comum | Variação de caso | Formato A | Manter | Banco de casos | Triar convite fictício por organizador, expectativa, link, telefone e anexo, podendo aceitar, confirmar ou reportar sem alterar calendário real. | Ataque multicanal; Documento inesperado |
| `concept:macro-enable-content` | Macro e “habilitar conteúdo” | Documento inesperado | Complementar | Combinação | Combinar | Primeira versão | Uma faixa inerte marca a fronteira e a comparação de processos mostra que autorização vem da política e do canal conhecido, não do arquivo. | Uma manhã comum |
| `concept:disable-protection` | Desativar antivírus, SmartScreen, modo protegido ou política | A central que não podia esperar | Complementar | Formato B | Manter | Primeira versão | Confrontar o pedido recebido com chamado, política e contato registrado e recusar mudança sem autorização verificável, sem revelar como desativar nada. | Documento inesperado |
| `concept:document-as-bridge` | PDF, HTML ou documento usado como ponte para link ou QR | Documento inesperado | Variação de caso | Formato B | Adaptar | Banco de casos | Um documento estático pede continuidade por link, QR ou telefone; a pessoa reavalia a nova origem e usa a rota conhecida. | O destino atrás do QR; Espelho de Página; Ataque multicanal |
| `concept:html-smuggling` | HTML smuggling e download construído no navegador | Documento inesperado | Debrief ou limite técnico | Nenhum como player próprio | Descartar como atividade própria | Debrief | Um download inesperado é tratado por contexto e reporte; o debrief cita possíveis causas e controles sem pedir diagnóstico nem mostrar código. | Cliquei. E agora?; Uma manhã comum |
| `concept:clickfix` | ClickFix ou falso CAPTCHA | Documento inesperado | Complementar | Combinação | Manter | Primeira versão | Uma sequência higienizada cruza da página para ação no sistema; a pessoa marca a fronteira, interrompe e reporta sem copiar ou executar conteúdo. | Espelho de Página; A central que não podia esperar; Cliquei. E agora? |
| `concept:copied-command` | Comando copiado e execução orientada | Documento inesperado | Variação de caso | Formato B | Adaptar | Banco de casos | Comparar pedido sanitizado com procedimento e chamado oficiais; a avaliação verifica origem e autorização, sem comando, terminal ou Clipboard API. | A central que não podia esperar; Cliquei. E agora? |
| `concept:fake-update` | Atualização falsa | O primeiro resultado | Variação de caso | Combinação | Manter | Banco de casos | Comparar aviso em página com manutenção e ferramenta oficial e obter a atualização somente pela origem aprovada, sem download. | Documento inesperado; Uma manhã comum |
| `concept:scareware` | Alerta falso, antivírus falso e tela cheia | A central que não podia esperar | Variação de caso | Formato B | Adaptar | Banco de casos | Reconstruir alerta → callback → falso técnico → acesso remoto e interromper pelo diretório oficial, sem tela cheia, timer, áudio ou contato acionável. | Cliquei. E agora?; Documento inesperado |
| `concept:remote-tool-artifact` | Instalador remoto, extensão, arquivo RDP | A central que não podia esperar | Núcleo | Combinação | Manter | Primeira versão | Validar chamado, profissional, ferramenta, duração e escopo e compreender as permissões solicitadas; nenhum pacote ou protocolo é aberto. | Cliquei. E agora?; Documento inesperado |
| `concept:file-view-download-open-execute` | Visualizar, baixar, abrir e executar | Cliquei. E agora? | Núcleo | Combinação | Manter | Primeira versão | Marcar o último estágio realmente ocorrido e montar ações “agora”, “em seguida” e “não faça”, separando fato de hipótese e sem culpa. | Documento inesperado |
| `concept:antivirus-silence` | “O antivírus não alertou” | Documento inesperado | Debrief ou limite técnico | Formato A | Combinar | Debrief | Classificar “sem alerta” como evidência insuficiente ao lado de contexto e origem; scanner continua controle técnico e nenhum arquivo é enviado para análise. | Uma manhã comum; Cliquei. E agora? |
| `concept:polyglot-magic-type` | Arquivo poliglota ou tipo interno divergente | Documento inesperado | Debrief ou limite técnico | Nenhum como player próprio | Descartar como atividade própria | Debrief | Explicar que tipo interno não é diagnosticável pela aparência e que preservar, não executar e encaminhar são os únicos comportamentos humanos avaliáveis. | Cliquei. E agora? |

## Decisões do conjunto

- **Documento inesperado** mantém um único processo e um banco rotativo: uma tentativa usa uma família de arquivo e uma quebra de proteção, não todos os conceitos.
- A inspeção de propriedades é declarativa e neutra entre sistemas; nunca recebe upload, nome livre ou arquivo executável.
- Convites são propriedade de **Uma manhã comum** porque exigem triagem entre eventos legítimos, suspeitos e inconclusivos, embora reforcem a lição de documentos.
- Atualização falsa pertence a **O primeiro resultado** porque o comportamento principal é recuperar a origem oficial de software.
- Desativação de proteção, scareware e ferramenta remota convergem em **A central que não podia esperar**, onde chamado, identidade e escopo são confirmados por rota independente.
- **Cliquei. E agora?** é proprietário dos estágios de interação e da resposta; nenhuma ação do portal promete contenção externa.
- HTML smuggling, silêncio do antivírus e tipo interno ficam como limites técnicos. A nota nunca exige detectar mecanismo invisível.
- Artefatos permanecem fictícios, inertes e sem texto operacionalizável; comandos, downloads, macros, clipboard e ferramentas remotas continuam proibidos.

## Regra de leitura

- **Atividade proprietária** é única e documental; não cria ID, rota ou disponibilidade.
- **Formato** e **Decisão** correspondem à matriz homônima de viabilidade.
- **Momento** impede que o inventário completo seja confundido com conteúdo simultâneo.
- **Aplicações secundárias** não duplicam propriedade.
