# Conjunto 03 — Destinos, links, QR, páginas e aplicativos

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividades proprietárias:** **Domínio sob a lupa**, **Uma letra fora do lugar**, **Para onde esse link realmente vai?**, **O destino atrás do QR**, **Espelho de Página** e **O primeiro resultado**.

## Objetivo

Ensinar a identificar o destino e a origem de navegação, reconhecer limites da aparência e usar uma rota conhecida para ações sensíveis. O funcionário não precisa decodificar manualmente toda ofuscação técnica; precisa saber quando não há informação suficiente e como evitar reutilizar a rota recebida.

## Conceitos pesquisados — anatomia e domínio

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:url-anatomy` | Protocolo, host, caminho, consulta e fragmento | Separar as partes sem confundir texto familiar com identidade do host. | Domínio sob a lupa | Espelho de Página |
| `concept:registered-domain` | Domínio registrado e sufixo público | Identificar corretamente inclusive em `.com.br`; não usar a regra “duas últimas partes”. | Domínio sob a lupa | Todas as atividades que exibem URL |
| `concept:deceptive-subdomain` | Subdomínio enganoso | A marca à esquerda pode pertencer a outro domínio registrado. | Domínio sob a lupa | Uma letra fora do lugar |
| `concept:path-query-branding` | Marca no caminho, parâmetro ou fragmento | Texto depois do host não muda quem controla o domínio. | Domínio sob a lupa | Para onde esse link realmente vai? |
| `concept:typosquatting` | Typosquatting | Comparar com referência oficial, sem confiar na aparência geral. | Uma letra fora do lugar | Domínio sob a lupa |
| `concept:typo-variants` | Omissão, inserção, troca, repetição e transposição | Reconhecer famílias de variação sem decorar uma lista fechada. | Uma letra fora do lugar | O primeiro resultado |
| `concept:combosquatting` | Palavra adicional, hífen, plural e outro TLD | `marca-login`, `marca-suporte` e TLD diferente continuam domínios independentes. | Uma letra fora do lugar | O primeiro resultado |
| `concept:homograph-idn` | Homógrafos, IDN e Punycode | Não julgar apenas pela tipografia; domínios internacionalizados legítimos existem. | Uma letra fora do lugar | Espelho de Página |
| `concept:link-text-mismatch` | Texto ou botão diferente do `href` | Comparar rótulo, destino indicado e rota final. | Para onde esse link realmente vai? | Domínio sob a lupa |
| `concept:url-shortener` | Encurtador | Destino oculto exige prévia segura ou navegação independente; encurtador não é fraude por definição. | Para onde esse link realmente vai? | O destino atrás do QR |
| `concept:open-redirect` | Redirecionador aberto | Um primeiro domínio conhecido pode apenas encaminhar ao destino controlado pelo atacante. | Para onde esse link realmente vai? | O primeiro resultado |
| `concept:redirect-chain` | Cadeia de redirecionamentos | Avaliar destino final e contexto, não só o primeiro salto. | Para onde esse link realmente vai? | Ataque multicanal |
| `concept:url-obfuscation-advanced` | `userinfo@host`, IP, codificação e abuso de esquema | Usar explicação assistida; não avaliar decodificação manual pelo funcionário. | Para onde esse link realmente vai?, modo avançado | Limite técnico em Ataque multicanal |

## Conceitos pesquisados — páginas, QR e descoberta

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:https-limit` | HTTPS e cadeado | Protegem a conexão com aquele domínio; não comprovam a honestidade da entidade. | Espelho de Página | Domínio sob a lupa; O destino atrás do QR |
| `concept:cloned-page` | Página clonada e coleta de credenciais | Marca, layout e campos preenchidos podem ser copiados; abrir o serviço por rota própria. | Espelho de Página | O primeiro resultado |
| `concept:false-sso` | Falso SSO | A tela familiar não substitui a conferência de origem e da ação iniciada. | Espelho de Página | Login verdadeiro, permissão errada |
| `concept:browser-in-browser` | Janela de navegador simulada | Elementos desenhados pela página podem imitar barra e pop-up de login. | Espelho de Página, caso avançado | Para onde esse link realmente vai? |
| `concept:captcha-trust` | CAPTCHA como falsa prova de segurança | Passar por um desafio não autentica o destino. | Espelho de Página | Documento inesperado |
| `concept:quishing` | Quishing | QR oculta o endereço e pode deslocar a ação para outro dispositivo. | O destino atrás do QR | Ataque multicanal |
| `concept:qr-physical-replacement` | QR físico substituído | Observar sobreposição, contexto e responsável; preferir app ou rota oficial. | O destino atrás do QR | A porta também é um canal |
| `concept:qr-payment-destination` | QR, valor e beneficiário | Conferir destino e recebedor antes de confirmar. | O destino atrás do QR | Pagamento para quem? |
| `concept:seo-poisoning` | SEO poisoning | Posição no resultado não autentica site ou suporte. | O primeiro resultado | Espelho de Página |
| `concept:malicious-ad` | Anúncio falso e malvertising | Resultado patrocinado pode imitar login, suporte ou download; usar favorito ou app. | O primeiro resultado | Ataque multicanal |
| `concept:fake-app-developer` | Aplicativo e desenvolvedor imitados | Conferir loja, editor, finalidade e rota oficial, não apenas nome e ícone. | O primeiro resultado | Login verdadeiro, permissão errada |
| `concept:legitimate-site-compromise` | Site legítimo comprometido | Domínio correto pode apresentar comportamento anormal; respeitar alertas e reportar. | Limite em Espelho de Página | Defesa principal técnica |
| `concept:watering-hole` | Watering hole | Não há necessariamente pista humana; atualização, isolamento e proteção do navegador são centrais. | Limite em Espelho de Página | Defesa principal técnica |
| `concept:pharming` | Pharming | Redirecionamento por DNS ou dispositivo pode não ser observável; não culpar o funcionário. | Limite em Espelho de Página | Defesa principal técnica |
| `concept:browser-warning` | Avisos do navegador e certificado | Não contornar aviso para cumprir instrução recebida. | Espelho de Página | O primeiro resultado |
| `concept:password-manager-clue` | Ausência de preenchimento automático | Pode ser indício de domínio diferente, mas não prova, pois configuração varia. | Espelho de Página | Uma letra fora do lugar |
| `concept:malicious-unsubscribe` | “Cancelar inscrição” malicioso | Em mensagem claramente suspeita, usar reporte/spam em vez do link; newsletter conhecida é diferente. | Uma manhã comum, como caso | Para onde esse link realmente vai? |
| `concept:tracking-pixel` | Pixel ou beacon invisível | Não transformar em exercício visual; tratamento pertence ao cliente de e-mail. | Limite técnico | Nenhuma atividade pontuada |

## Composições candidatas 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| Domínio sob a lupa | localizar domínio registrado e separar componentes | subdomínio | caminho/parâmetro | endereço legítimo difícil |
| Uma letra fora do lugar | comparar domínio com referência conhecida | typosquatting | homógrafo/IDN | domínio internacionalizado legítimo |
| Para onde esse link realmente vai? | identificar cadeia e destino final | texto × `href` | open redirect | encurtador legítimo que ainda exige rota segura |
| O destino atrás do QR | conferir destino, contexto e, quando aplicável, beneficiário | URL oculta | QR físico | QR legítimo em canal esperado |
| Espelho de Página | abandonar a aparência como prova e abrir o serviço independentemente | HTTPS | falso SSO/BitB | página visualmente simples, mas com origem correta |
| O primeiro resultado | localizar serviço, suporte, download ou app pela origem oficial | anúncio falso | desenvolvedor imitado | anúncio legítimo que não deve ser tratado automaticamente como fraude |

## Limites

- Um PhishLab usa poucos casos por tentativa; os conceitos formam pacotes, não uma tela enciclopédica.
- QR, encurtador, IDN, anúncio e HTTPS são comuns em usos legítimos.
- Reputação, DNS, site comprometido e pixel invisível exigem controles técnicos.
- Nenhum endereço do exercício é navegável e nenhum QR executa ação real.

## Fontes principais

- [Microsoft — Typosquatting](https://support.microsoft.com/en-us/security/what-is-typosquatting);
- [MITRE ATT&CK — Acquire Infrastructure: Domains](https://attack.mitre.org/techniques/T1583/001/);
- [Unicode Technical Standard #39](https://www.unicode.org/reports/tr39/);
- [NCSC — QR codes: what is the real risk?](https://www.ncsc.gov.uk/blog-post/qr-codes-whats-real-risk);
- [Microsoft — Open redirector links](https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/).
