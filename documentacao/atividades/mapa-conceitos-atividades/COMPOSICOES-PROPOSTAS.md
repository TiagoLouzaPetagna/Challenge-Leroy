# Composições propostas das 22 atividades

> **Estado:** composição curricular aprovada em 2026-08-15; detalhamento por atividade elaborado e validado documentalmente, ainda sujeito a aprovação específica.
>
> **Leitura:** cada linha define um comportamento, não todo o conteúdo que aparecerá simultaneamente em uma tentativa.

As 22 atividades continuam obedecendo à regra **um comportamento principal + até dois elementos de apoio ativos + um caso curto de transferência**. Conceitos adicionais pertencentes à mesma atividade entram como variação editorial, versão futura ou debrief técnico.

Nesta visão resumida, **elemento de apoio** descreve o que sustenta o caso e não substitui o papel curricular formal de cada `conceptId`. Da mesma forma, o exemplo curto de transferência descreve uma reaplicação do comportamento e não afirma, por si só, que exista um conceito classificado com o papel **Transferência**. Os papéis formais permanecem nos nove mapas por conceito e na visão inversa.

Esta visão permanece resumida e, por isso, não nomeia todos os pacotes de caso. Os blueprints distribuem atividades com mais de dois conceitos complementares de primeira versão entre percursos alternativos; eles nunca são ativados juntos por uma única tentativa. Os percursos são pacotes editoriais internos: o primeiro caso será canônico ou atribuído automaticamente, sem uma tela inicial de escolha P1/P2/P3.

## Fundação anterior às 22 atividades

**O aviso que não podia esperar** permanece fora da propriedade dos 187 conceitos e da contagem das 22 atividades-alvo, mas passa a ter um papel-alvo de fundação. Sua versão sucessora deverá apresentar o modelo mental básico de phishing, a análise da ação pedida e de sua consequência, a escolha de uma fonte independente de confirmação e o modelo PARE. Essa apresentação reutiliza ensinamentos transversais sem duplicar `conceptId`, recompensa ou atividade proprietária.

A fundação antecede os PhishLabs de identidade e destino. **A conversa já estava acontecendo** vem depois dessa base e não funciona mais como porta de entrada curricular.

## Missões

| Atividade | Comportamento principal | Até dois elementos de apoio no caso | Exemplo curto de transferência | Mecânica-base proposta |
|---|---|---|---|---|
| **A conversa já estava acontecendo** | Confirmar fora da conversa quando comportamento ou processo muda. | conta comprometida; sequestro de thread | mesma mudança em chat corporativo | reconstrução cronológica acessível + ponto de mudança + painel de evidências preservado; pacote atribuído automaticamente |
| **Você iniciou este acesso?** | Negar e reportar autenticação não iniciada. | repetição/fadiga; falso suporte | prompt único atrasado sem ação iniciada | console sequencial de eventos + conversa textual reativa |
| **Cliquei. E agora?** | Montar resposta proporcional ao evento real e reportar sem culpa. | preservação de fatos; reporte sem segredo | segundo incidente com exposição diferente | linha do incidente + montador por papel da ação + construtor de reporte |
| **Pedido urgente de um gestor** | Preservar o processo diante de autoridade e urgência. | urgência; sigilo | pedido legítimo igualmente urgente que também exige aprovação | conversa curta + estação de autoridade, alçada e aprovação |
| **Documento inesperado** | Confirmar contexto e recusar quebra de proteção antes de abrir ou executar. | arquivo disfarçado; ClickFix/comando | compartilhamento legítimo inesperado | inspetor de propriedades + cadeia de exposição + ação segura |
| **A central que não podia esperar** | Encerrar contato recebido e iniciar suporte pela rota oficial. | caller ID; acesso remoto | ligação legítima vinculada a chamado real | console textual de callback + diretório/chamado fictício |
| **Ele já sabia meus dados** | Tratar a personalização de um spear phishing — inclusive dados corretos e mídia convincente — como plausibilidade, não autenticação. | OSINT/dados vazados; identidade sintética | emergência ou recrutamento com detalhes verdadeiros | dossiê de fatos e inferências + narrativa em etapas |
| **O pedido não tinha link** | Validar identidade, necessidade e autorização antes de responder ou enviar dado. | pretexting; reciprocidade | solicitação equivalente por formulário ou chat | painel alegação–fato–necessidade–autorização + resposta conversacional |

## PhishLabs

| Atividade | Comportamento principal | Até dois elementos de apoio no caso | Exemplo curto de transferência | Mecânica-base proposta |
|---|---|---|---|---|
| **Quem enviou de verdade?** | Mapear nome, conta, resposta, domínio e contexto sem inferir controle não comprovado. | `Reply-To`; conta comprometida | campos corretos com pedido ainda inconclusivo | mapa de relações com alternativa tabular completa |
| **Domínio sob a lupa** | Localizar domínio registrado e separar componentes da URL. | subdomínio; caminho/parâmetro | endereço legítimo difícil | anatomia de URL por segmentos, sem arraste obrigatório |
| **Uma letra fora do lugar** | Comparar domínio com referência conhecida. | typosquatting; homógrafo/IDN | domínio internacionalizado legítimo | lente de comparação Unicode + pares legítimos/enganosos |
| **Para onde esse link realmente vai?** | Identificar a cadeia e o destino final. | texto × destino; redirecionador aberto | encurtador legítimo que ainda exige rota segura | linha de redirecionamentos inerte + decisão de navegação independente |
| **O destino atrás do QR** | Conferir destino, contexto e, quando aplicável, beneficiário. | URL oculta; QR físico | QR legítimo em canal esperado | prévia fictícia de QR + inspeção de contexto e recebedor |
| **Espelho de Página** | Abandonar aparência como prova e abrir o serviço independentemente. | HTTPS; falso SSO/janela simulada | página simples com origem correta | comparação de origem, campos e ação pedida; não “jogo dos sete erros” |
| **Login verdadeiro, permissão errada** | Avaliar aplicativo, finalidade e escopos antes de consentir. | provedor legítimo; identidade do editor como evidência limitada | app legítimo com escopo compatível | mesa de consentimento e permissões fictícias |
| **De qual dispositivo veio este código?** | Associar código, QR ou vínculo a uma ação iniciada em dispositivo reconhecido. | device code; OTP/pareamento | código legítimo no próprio fluxo iniciado | mapa dispositivo–código–sessão + console de vínculo fictício |

## Simulações

| Atividade | Comportamento principal | Até dois elementos de apoio no caso | Exemplo curto de transferência | Mecânica-base proposta |
|---|---|---|---|---|
| **Uma manhã comum** | Triar entre prosseguir, verificar e reportar sem feedback antecipado. | sobrecarga; ambiguidade | ocorrência curta em outro canal | triagem em lote + fila explícita de inconclusivos |
| **Central de mensagens** | Manter identidade consistente ao mudar de número, conta ou plataforma. | perfil clonado; novo número | contato legítimo confirmado pelo canal antigo | conversas paralelas + mapa de identidade/canal |
| **Ataque multicanal** | Reconhecer que canais fornecidos pelo solicitante pertencem à mesma cadeia. | falsa corroboração; reunião/QR | cadeia legítima com confirmação realmente independente | linha temporal multicanal textual + mapa causal |
| **O primeiro resultado** | Localizar serviço, suporte, download ou aplicativo pela origem oficial. | anúncio falso; desenvolvedor imitado | anúncio legítimo que ainda não é rota de confiança | resultados de busca/loja fictícios + comparação de origem |
| **Pagamento para quem?** | Confirmar obrigação, beneficiário e controles pelo processo oficial antes de pagar, liberar ou devolver. | comprovante não é liquidação; segunda aprovação | cobrança legítima com intermediador inconclusivo | estação de processo com cadastro, diretório, conciliação e aprovação |
| **A porta também é um canal** | Encaminhar pessoa, pergunta ou objeto pelo controle apropriado sem ceder acesso próprio. | pretexting; cortesia/quid pro quo | visitante legítimo com problema real de acesso | estação de recepção textual/ilustrada + cadeia de custódia |

## Limites de composição

- “Até dois elementos de apoio” vale por caso ou versão; o banco documental pode conter mais conceitos. Quando um desses elementos tiver o papel curricular formal **Complementar**, ele também estará sujeito ao limite de até dois complementares ativos registrado no mapa.
- P1, P2 e P3 são referências de documentação e teste; não são escolhas exibidas ao funcionário na primeira abertura.
- Uma variação de caso não recebe objetivo, nota ou recompensa separados.
- Uma transferência mede a resposta naquela tentativa, não domínio permanente.
- Conceitos técnicos invisíveis aparecem em debrief e controles em camadas.
- Áudio, vídeo, cena física rica, QR real, arquivo, comando, pagamento ou integração corporativa não são requisitos desta proposta.
- Mudanças semânticas futuras exigirão versão própria, preservação de tentativas antigas e backend autoritativo antes de uso real.
