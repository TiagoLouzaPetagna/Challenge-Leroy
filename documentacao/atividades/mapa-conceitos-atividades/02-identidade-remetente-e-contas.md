# Mapa — identidade, remetente e contas

> **Estado:** mapa curricular e 21 blueprints de primeira versão aprovados em 2026-08-15; conversão técnica em proposta separada.

Este mapa consolida a taxonomia do [conjunto 02](../conjuntos-de-ensino/02-identidade-remetente-e-contas.md), os [formatos pedagógicos](../estudos-de-formatos/02-identidade-remetente-e-contas.md) e a [matriz de viabilidade](../viabilidade-de-formatos/02-identidade-remetente-e-contas.md). Não cria atividade, rota, pontuação ou integração.

## Critério do conjunto

**Quem enviou de verdade?** concentra a leitura das camadas de identidade sem prometer atribuição humana; **A conversa já estava acontecendo** é proprietária das mudanças observáveis em conta e histórico; **Ele já sabia meus dados** ensina que personalização aumenta plausibilidade, não autenticação. Casos de autoridade, triagem e outros canais ficam com as experiências que praticam esses comportamentos. Conceitos técnicos invisíveis permanecem em debrief e variações estreitas entram no banco de casos, evitando carregar uma tentativa com todo o inventário.

## Mapa conceito → atividade

| `conceptId` | Conceito | Atividade proprietária | Papel | Formato | Decisão | Momento | Aplicação prevista | Aplicações secundárias |
|---|---|---|---|---|---|---|---|---|
| `concept:identity-display-name` | Nome exibido, foto e cargo | Quem enviou de verdade? | Núcleo | Formato A | Manter | Primeira versão | Abrir o cartão em camadas e separar apresentação visual, conta declarada, diretório fictício e controle ainda não comprovado. | Central de mensagens; Pedido urgente de um gestor |
| `concept:identity-from` | Endereço completo e campo `From` | Quem enviou de verdade? | Núcleo | Formato B | Combinar | Primeira versão | Comparar o `From` completo com uma referência fictícia e escolher confirmação independente sem tratá-lo como prova de controle. | A conversa já estava acontecendo |
| `concept:identity-reply-to` | `Reply-To` diferente | Quem enviou de verdade? | Complementar | Combinação | Combinar | Primeira versão | Revelar o destino inerte da resposta, contrastá-lo com o `From` e praticar casos legítimos, suspeitos e inconclusivos. | Uma manhã comum |
| `concept:identity-spoofing` | Spoofing do remetente | Quem enviou de verdade? | Debrief ou limite técnico | Combinação | Adaptar | Debrief | Classificar o que a tela comum permite ou não concluir e comparar, após a decisão, spoofing, domínio parecido e conta comprometida. | Domínio sob a lupa; A conversa já estava acontecendo |
| `concept:identity-external-marker` | Avisos “Externo”, “primeiro contato” ou “não verificado” | Uma manhã comum | Variação de caso | Formato B | Manter | Banco de casos | Triar mensagens com o mesmo marcador fictício em itens legítimos, suspeitos e inconclusivos, sem usá-lo como gabarito. | Quem enviou de verdade?; Central de mensagens |
| `concept:identity-authentication-limits` | Limites de SPF, DKIM e DMARC | Quem enviou de verdade? | Debrief ou limite técnico | Combinação | Descartar como atividade própria | Debrief | Explicar em camadas que autenticação de domínio ajuda controles técnicos, mas não autoriza o pedido nem exige leitura de cabeçalho pelo funcionário. | A conversa já estava acontecendo |
| `concept:account-compromise` | Conta legítima comprometida | A conversa já estava acontecendo | Complementar | Formato A | Manter | Primeira versão | Reconstruir o antes e o depois de uma conta correta e confirmar fora da conversa quando pedido, destino ou processo mudam. | Quem enviou de verdade?; Ataque multicanal |
| `concept:thread-hijacking` | Conversation ou thread hijacking | A conversa já estava acontecendo | Núcleo | Formato A | Combinar | Primeira versão | Ordenar mensagens, marcar a ruptura operacional e prender evidências antes de selecionar confirmação e reporte proporcionais. | Pagamento para quem? |
| `concept:thread-fabrication` | Thread fabricada | A conversa já estava acontecendo | Transferência | Formato B | Adaptar | Banco de casos | Contrastar `Re:` e citações no corpo com contexto realmente disponível, aceitando que histórico ausente também pode ser inconclusivo. | Quem enviou de verdade?; Uma manhã comum |
| `concept:lateral-phishing` | Phishing interno ou lateral | A conversa já estava acontecendo | Variação de caso | Formato A | Combinar | Banco de casos | Aplicar o mesmo processo a pedido interno inesperado e produzir reporte discreto, factual e sem acusar o titular da conta. | Uma manhã comum; Ataque multicanal |
| `concept:cloud-account-abuse` | Conta ou serviço legítimo de nuvem abusado | Quem enviou de verdade? | Variação de caso | Formato B | Combinar | Banco de casos | Abandonar a notificação e procurar o compartilhamento numa biblioteca totalmente fictícia, separando plataforma, conta, conteúdo e destino. | Documento inesperado; Para onde esse link realmente vai? |
| `concept:spear-phishing` | Spear phishing | Ele já sabia meus dados | Núcleo | Combinação | Combinar | Primeira versão | Separar detalhes verdadeiros, inferências e autorização num dossiê fictício e depois transferir o comportamento para pedidos com diferentes graus de contexto. | Pedido urgente de um gestor; Uma manhã comum |
| `concept:whaling` | Whaling e fraude contra lideranças | Pedido urgente de um gestor | Transferência | Formato B | Adaptar | Banco de casos | Montar uma resposta profissional e acionar assessoria ou alçada fictícia sem contornar o processo por causa do cargo. | Ele já sabia meus dados; Pagamento para quem? |
| `concept:osint-personalization` | OSINT, pegada digital e organograma | Ele já sabia meus dados | Complementar | Formato B | Adaptar | Primeira versão | Revisar a pegada de uma persona fictícia por finalidade e risco, sem pesquisar, aceitar ou persistir dados reais do participante. | O pedido não tinha link; Pedido urgente de um gestor |
| `concept:leaked-data` | Dados vazados usados como credibilidade | Ele já sabia meus dados | Complementar | Combinação | Combinar | Primeira versão | Inventariar categorias de dados sintéticos que o contato conhece, manter a origem como inconclusiva e confirmar pelo canal oficial. | Central de mensagens; Pagamento para quem? |
| `concept:synthetic-identity` | Identidade sintética e perfil composto | Ele já sabia meus dados | Variação de caso | Formato B | Adiar | Versão futura | Classificar peças verdadeiras e inferências de uma persona inteiramente fictícia, sem avaliar aparência ou autenticar identidade civil. | Central de mensagens |
| `concept:inbox-manipulation` | Regras maliciosas de encaminhamento e ocultação | A conversa já estava acontecendo | Debrief ou limite técnico | Combinação | Descartar como atividade própria | Debrief | Relacionar sintomas a causas legítimas e maliciosas e revelar, somente após o reporte, uma investigação administrativa fictícia. | Cliquei. E agora? |

## Decisões do conjunto

- A propriedade das camadas visíveis de identidade fica em **Quem enviou de verdade?**; o player deve aceitar conclusão inconclusiva e nunca atribuir uma pessoa somente pelo endereço.
- Conta comprometida e sequestro de conversa permanecem no mesmo percurso de **A conversa já estava acontecendo**; fabricação, phishing lateral e caixa manipulada entram como transferência, banco ou debrief.
- Personalização, OSINT e dados vazados formam a primeira composição de **Ele já sabia meus dados**. Identidade sintética permanece futura por exigir revisão de vieses e conteúdo mais cuidadoso.
- SPF, DKIM, DMARC, spoofing e regras de caixa não se tornam testes de perícia humana. Seus efeitos são explicados como limites dos controles e da interface.
- Diretórios, bibliotecas, contas, mensagens e pessoas são sempre sintéticos. Nenhum formato consulta correio, nuvem, identidade ou perfil real; backend autoritativo continua obrigatório antes de uso real.

## Regra de leitura

- **Atividade proprietária** é única e documental; não cria ID, rota ou disponibilidade.
- **Formato** e **Decisão** correspondem à matriz de viabilidade homônima.
- **Momento** separa a composição inicial de variações e explicações posteriores.
- **Aplicações secundárias** reaplicam o comportamento sem duplicar propriedade.
