# Estudo de formatos — processos, pagamentos e BEC

> **Estado:** pesquisa; não aprovado para implementação.

Este documento transforma todos os conceitos canônicos do conjunto 07 em hipóteses pedagógicas. O fio comum é validar obrigação, beneficiário, contato anterior, alçada e registro antes de dinheiro ou exceção; não há transação real, definição de atividade, rota, recompensa ou viabilidade técnica.

## Resumo de cobertura

| Conceito | Potencial pedagógico | Papel recomendado |
|---|---|---|
| `concept:bec` | Alto | atividade de síntese |
| `concept:ceo-fraud` | Alto | caso |
| `concept:vendor-compromise` | Alto | caso/atividade |
| `concept:bank-change` | Alto | atividade |
| `concept:invoice-diversion` | Alto | caso |
| `concept:payroll-diversion` | Alto | caso de função |
| `concept:gift-card-procurement` | Alto | caso |
| `concept:beneficiary-check` | Alto | fundamento transversal |
| `concept:pix-fraud` | Alto | caso |
| `concept:boleto-fraud` | Alto | caso |
| `concept:payment-qr` | Alto | caso/transferência |
| `concept:fake-receipt` | Alto | caso |
| `concept:mistaken-pix-return` | Alto | caso |
| `concept:med-response` | Médio | explicação de limite/resposta |
| `concept:safe-account-scam` | Alto | caso |
| `concept:refund-overpayment` | Alto | caso |
| `concept:advance-fee` | Alto | caso transversal |
| `concept:second-approval` | Alto | fundamento de processo |
| `concept:process-exception` | Alto | caso transversal |
| `concept:job-recruitment-scam` | Alto | caso longitudinal |
| `concept:investment-pig-butchering` | Alto | caso longitudinal |
| `concept:romance-financial-scam` | Alto | caso longitudinal sensível |
| `concept:prize-sweepstakes` | Médio | caso/variação |
| `concept:charity-disaster` | Médio | caso/variação |
| `concept:government-legal-payment` | Alto | caso |
| `concept:delivery-fee` | Alto | caso/transferência |

## `concept:bec` — Business Email Compromise

### Ensinamento e papel

- **Comportamento observável:** verificar identidade, obrigação, beneficiário e autorização por rotas independentes antes de pagamento, compra, dado ou mudança de processo.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de síntese que conecta identidade, conversa e processo financeiro.
- BEC explora uma sequência plausível de trabalho; a prática deve exigir reconstrução do processo, não apenas reconhecimento da sigla ou de um e-mail “mal escrito”.

### Dificuldades e riscos

- BEC pode usar conta falsificada, parecida ou realmente comprometida; o mecanismo não deve ser a resposta exigida.
- Solicitações legítimas também podem ser urgentes, confidenciais ou alteradas.
- Não usar dados financeiros reais nem insinuar que uma única conferência elimina o risco.

### Formato A — Estação de pagamento

- **Área provável:** Missão.
- **Mecânica:** conciliar pedido, cadastro, beneficiário, aprovação e confirmação antes de liberar uma operação fictícia.
- **Fluxo:** solicitação → documentos → contato anterior → segunda aprovação → decisão/reporte.
- **O que seria avaliado:** integridade do processo e tratamento explícito de divergências.
- **Alternativa acessível:** etapas em formulário linear, com reordenação por botões e resumo textual.

### Formato B — Caso em quatro canais

- **Área provável:** Simulação.
- **Mecânica:** reunir e-mail, chat, diretório e registro de compra, sem assumir que repetição entre canais prova autenticidade.
- **Fluxo:** sinais dispersos → mapa de evidências → escolha de confirmação → consequência.
- **O que seria avaliado:** independência real da verificação e linguagem de incerteza.
- **Alternativa acessível:** linha do tempo textual com filtros por canal.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** estação de pagamento; reutilizar reconciliação, diretório e aprovações.
- Financeiro, Compras, RH e Segurança precisam validar o processo fictício; futuramente, confirmar que nenhuma ação pode atingir sistemas ou contas reais.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:ceo-fraud` — Falso gestor e fraude de autoridade

### Ensinamento e papel

- **Comportamento observável:** manter compras, confirmação e alçada diante de pedido atribuído à liderança, inclusive quando há urgência ou sigilo.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de pressão hierárquica e transferência para diferentes funções.
- A encenação permite praticar uma resposta profissional que não confronta a liderança nem contorna o processo.

### Dificuldades e riscos

- Gestores reais fazem pedidos excepcionais; autoridade não prova fraude e exceção não autoriza ação automática.
- Não caricaturar líderes nem usar nomes, agenda ou estilo de pessoas reais.
- Não avaliar “coragem” ou velocidade, apenas o uso do processo e da confirmação.

### Formato A — Pedido urgente de um gestor

- **Área provável:** Missão.
- **Mecânica:** montar resposta de limite, selecionar contato independente e registrar a solicitação.
- **Fluxo:** pedido confidencial → ativo solicitado → alçada → confirmação → decisão.
- **O que seria avaliado:** preservação do processo sob autoridade e sigilo.
- **Alternativa acessível:** conversa textual e seletores, sem áudio nem cronômetro.

### Formato B — Agenda versus alçada

- **Área provável:** PhishLab.
- **Mecânica:** comparar disponibilidade do gestor, matriz de aprovação e pedido recebido sem usar agenda como prova definitiva.
- **Fluxo:** três registros → hipóteses → contato correto → debrief.
- **O que seria avaliado:** combinar contexto e alçada, sem inferir fraude de uma inconsistência isolada.
- **Alternativa acessível:** tabela com cabeçalhos e explicações.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** pedido urgente; reutilizar resposta profissional e diretório.
- Liderança e Compras devem aprovar tom e alçadas fictícias; futuramente, testar se o caso mantém pressão sem conteúdo punitivo.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [FBI — Business Email Compromise on the Rise](https://www.fbi.gov/news/stories/business-e-mail-compromise-on-the-rise)

## `concept:vendor-compromise` — Conta de fornecedor comprometida

### Ensinamento e papel

- **Comportamento observável:** confirmar mudanças relevantes por contato já cadastrado e fora da conversa, mesmo quando endereço, histórico e documento são legítimos.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso principal de mudança bancária e conversa sequestrada.
- A atividade torna concreta a diferença entre reconhecer o fornecedor e autorizar a nova instrução.

### Dificuldades e riscos

- Fornecedores alteram representantes e dados de modo legítimo.
- Responder à mesma conta possivelmente comprometida não é confirmação independente.
- Não atribuir culpa ao fornecedor nem pedir que o funcionário investigue a infraestrutura dele.

### Formato A — Cadastro anterior, pedido novo

- **Área provável:** Missão.
- **Mecânica:** selecionar no diretório fictício o contato anterior e documentar a confirmação da mudança.
- **Fluxo:** mensagem na thread → comparação cadastral → contato independente → segunda aprovação.
- **O que seria avaliado:** origem do contato e trilha de decisão.
- **Alternativa acessível:** diretório pesquisável e formulário linear.

### Formato B — Duas versões do fornecedor

- **Área provável:** PhishLab.
- **Mecânica:** reconciliar e-mail, portal de fornecedores e contrato para localizar quais pontos exigem validação.
- **Fluxo:** painel documental → divergências → classificação → plano de confirmação.
- **O que seria avaliado:** distinguir identidade conhecida de instrução nova.
- **Alternativa acessível:** comparação tabular com diferenças descritas em texto.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** cadastro anterior; reutilizar diretório e reconciliação.
- Compras/Financeiro precisam definir registro de referência e quem confirma; futuramente, representar a resposta sem simular chamada real.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [FBI — BEC schemes related to the COVID-19 pandemic](https://www.fbi.gov/news/press-releases/fbi-anticipates-rise-in-business-email-compromise-schemes-related-to-the-covid-19-pandemic)

## `concept:bank-change` — Alteração de dados bancários

### Ensinamento e papel

- **Comportamento observável:** pausar alteração e pagamento associado, confirmar pelo cadastro anterior e obter a aprovação prevista antes de atualizar dados.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de processo.
- O valor está em executar uma sequência segura tanto para fraude quanto para uma mudança legítima, sem “reprovar” toda conta nova.

### Dificuldades e riscos

- Beneficiário novo ou banco diferente pode ser legítimo.
- Um documento assinado ou PDF não substitui contato independente e alçada.
- O caso não deve ensinar números, documentos ou telas bancárias reais.

### Formato A — Mudança bancária sem atalho

- **Área provável:** Missão.
- **Mecânica:** comparar cadastro anterior, solicitação, resposta do contato conhecido e ordem de aprovações.
- **Fluxo:** pedido → suspensão → contato no diretório → validação → atualização/pagamento fictícios.
- **O que seria avaliado:** sequência completa e separação entre confirmar e aprovar.
- **Alternativa acessível:** estação em passos numerados e ordenação por botões.

### Formato B — Mesa de exceções

- **Área provável:** Simulação.
- **Mecânica:** tratar várias mudanças — legítima, maliciosa e incompleta — e solicitar evidência faltante.
- **Fluxo:** fila → análise → devolver para complemento/confirmar/escalar → debrief.
- **O que seria avaliado:** consistência do processo sem decisões binárias por aparência.
- **Alternativa acessível:** tabela de casos com ações nomeadas.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mudança bancária sem atalho; reutilizar estação de processo.
- A sequência final depende de Financeiro, Compras e segregação local; futuramente, validar que dados são integralmente fictícios.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:invoice-diversion` — Fatura ou nota adulterada

### Ensinamento e papel

- **Comportamento observável:** conciliar obrigação, pedido, fornecedor, valor e beneficiário em registros independentes, em vez de confiar no documento recebido.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso documental dentro de pagamento.
- Uma comparação ativa ensina que um PDF visualmente correto pode conter instrução divergente e que diferenças legítimas exigem investigação, não descarte automático.

### Dificuldades e riscos

- Impostos, cessão, intermediários e faturamento centralizado podem mudar nomes e valores legitimamente.
- Ausência de erro visual não é prova; erro de digitação também não é prova de fraude.
- Não simular documento fiscal real nem pedir validação tributária ao usuário geral.

### Formato A — Mesa de conciliação

- **Área provável:** PhishLab.
- **Mecânica:** relacionar linhas de fatura fictícia a pedido, recebimento, cadastro e beneficiário.
- **Fluxo:** documento → conciliação → divergência → contato/processo → decisão.
- **O que seria avaliado:** fontes consultadas e tratamento da divergência.
- **Alternativa acessível:** tabela navegável com descrições de cada diferença.

### Formato B — O PDF chega por último

- **Área provável:** Missão narrativa.
- **Mecânica:** construir primeiro o contexto operacional e só depois receber uma fatura convincente.
- **Fluxo:** pedido/entrega → cobrança → comparação de memória versus registros → confirmação.
- **O que seria avaliado:** prioridade do sistema oficial sobre a aparência do anexo.
- **Alternativa acessível:** narrativa e documento em texto estruturado.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mesa de conciliação; reutilizar comparador documental.
- Financeiro deve definir quais campos um funcionário realmente confere; futuramente, garantir que o documento não reproduza marca ou identificador válido.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:payroll-diversion` — Desvio de folha ou depósito salarial

### Ensinamento e papel

- **Comportamento observável:** encaminhar alteração de conta salarial pelo fluxo autenticado de RH, notificar o titular por contato anterior e não efetivar mudança recebida apenas por mensagem.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de função para RH e folha.
- A prática precisa equilibrar prevenção e privacidade: confirmar o pedido sem expor dados salariais ou bancários em canais improvisados.

### Dificuldades e riscos

- Empregados realmente mudam de banco, nome e contato.
- A confirmação pode revelar informação sensível se feita em grupo ou pelo endereço fornecido no próprio pedido.
- O procedimento final varia por organização e legislação.

### Formato A — Balcão de RH autenticado

- **Área provável:** Missão de função.
- **Mecânica:** receber pedido por e-mail, redirecionar para portal fictício e confirmar pelo cadastro anterior.
- **Fluxo:** solicitação → proteção de dados → rota oficial → confirmação → registro.
- **O que seria avaliado:** não alterar fora do fluxo e preservar confidencialidade.
- **Alternativa acessível:** formulário textual sem campos bancários reais.

### Formato B — Linha do tempo de alteração

- **Área provável:** PhishLab.
- **Mecânica:** ordenar solicitação, autenticação, confirmação, aprovação e notificação.
- **Fluxo:** cartões de processo → ordem → identificação de atalhos → debrief.
- **O que seria avaliado:** dependências e segregação, não memorização de tela.
- **Alternativa acessível:** mover itens por botões e exibir lista numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** balcão autenticado; reutilizar portal inerte e diretório.
- RH, Privacidade e Folha devem aprovar dados e contatos; futuramente, verificar isolamento total de informações reais.

### Fontes

- [FBI — BEC schemes related to the COVID-19 pandemic](https://www.fbi.gov/news/press-releases/fbi-anticipates-rise-in-business-email-compromise-schemes-related-to-the-covid-19-pandemic)
- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)

## `concept:gift-card-procurement` — Cartão-presente e compra sigilosa

### Ensinamento e papel

- **Comportamento observável:** usar o processo de compras e confirmar com o solicitante antes de comprar ou transmitir códigos, mesmo sob autoridade e sigilo.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso curto de CEO fraud e processo de compras.
- A atividade deve expor a irreversibilidade do código sem ensinar que cartão-presente é sempre ilegítimo.

### Dificuldades e riscos

- Algumas organizações usam cartões-presente legitimamente.
- O perigo pode estar na compra, no envio dos códigos ou no contorno de prestação de contas.
- Não exibir códigos utilizáveis nem simular compra real.

### Formato A — Pedido em duas etapas

- **Área provável:** Missão.
- **Mecânica:** primeiro avaliar a compra e depois um pedido inesperado para fotografar/enviar os códigos.
- **Fluxo:** autorização alegada → compras → código solicitado → confirmação independente → reporte.
- **O que seria avaliado:** identificar as duas decisões sensíveis e manter rastreabilidade.
- **Alternativa acessível:** diálogo e recibos fictícios em texto.

### Formato B — Catálogo de compras permitidas

- **Área provável:** PhishLab.
- **Mecânica:** comparar o pedido com categoria, alçada, fornecedor e finalidade no catálogo fictício.
- **Fluxo:** requisição → consulta → lacunas → resposta de complemento/escala.
- **O que seria avaliado:** uso de procurement, não julgamento do produto isolado.
- **Alternativa acessível:** tabela filtrável por teclado.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** pedido em duas etapas; reutilizar conversa e alçada.
- Compras deve definir se e quando esse item existe no processo; futuramente, impedir qualquer sequência parecida com código válido.

### Fontes

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)
- [FTC — Avoiding and reporting gift card scams](https://consumer.ftc.gov/articles/avoiding-and-reporting-gift-card-scams)

## `concept:beneficiary-check` — Conferência do beneficiário

### Ensinamento e papel

- **Comportamento observável:** ler recebedor, documento mascarado, instituição e valor antes de confirmar e investigar divergência pelo processo.
- **Potencial pedagógico:** Alto; **papel recomendado:** fundamento transversal de toda atividade de pagamento.
- A interação é necessária porque a pessoa precisa interromper o automatismo de “copiar e confirmar” e distinguir beneficiário de chave, QR, boleto ou intermediador.

### Dificuldades e riscos

- Nome comercial, razão social, matriz, adquirente ou intermediador podem diferir legitimamente.
- O nome exibido pela instituição ajuda, mas não comprova a obrigação.
- Não ensinar comparação literal como única defesa nem usar dados reais.

### Formato A — Tela final desacelerada

- **Área provável:** PhishLab.
- **Mecânica:** antes da confirmação fictícia, selecionar explicitamente recebedor, valor e origem da obrigação.
- **Fluxo:** instrução → tela final → campos críticos → conciliação → decidir.
- **O que seria avaliado:** leitura ativa e investigação de divergência.
- **Alternativa acessível:** resumo textual com confirmação separada de cada campo.

### Formato B — Quem deveria receber?

- **Área provável:** Missão.
- **Mecânica:** construir o beneficiário esperado a partir de contrato, cadastro e pedido antes de revelar o recebedor apresentado.
- **Fluxo:** registros → expectativa → dados de pagamento → comparação → ação.
- **O que seria avaliado:** referência independente anterior ao dado recebido.
- **Alternativa acessível:** formulário e tabela em ordem lógica.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** quem deveria receber; reutilizar o comparador de beneficiário.
- Financeiro precisa definir quais campos e intermediadores são plausíveis; futuramente, representar a tela sem copiar banco real.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)

## `concept:pix-fraud` — Pix induzido por falsa central ou mensagem

### Ensinamento e papel

- **Comportamento observável:** não realizar Pix para “cancelar”, “testar” ou “proteger” saldo; encerrar o contato e abrir a instituição por conta própria.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de pressão financeira e canal independente.
- A simulação deve permitir ensaiar a saída da conversa e a navegação independente, sem executar transação.

### Dificuldades e riscos

- Pix é apenas o meio; solicitações legítimas usam o mesmo instrumento.
- A instituição e seus procedimentos variam; não prometer estorno nem reproduzir aplicativo real.
- A mensagem pode conter dados corretos ou confirmação aparente em outro canal.

### Formato A — A central não podia esperar

- **Área provável:** Missão.
- **Mecânica:** interromper uma conversa persistente, abrir um diretório fictício e consultar a conta por rota própria.
- **Fluxo:** alerta → pressão para transferir → encerramento → app/canal oficial inerte → reporte.
- **O que seria avaliado:** não transferir e reconstruir contato independente.
- **Alternativa acessível:** conversa textual, sem áudio, tempo ou animação obrigatórios.

### Formato B — Motivo alegado versus operação pedida

- **Área provável:** PhishLab.
- **Mecânica:** relacionar “cancelar”, “regularizar” e “proteger” às operações realmente solicitadas.
- **Fluxo:** frases → ação financeira → contradição → resposta segura.
- **O que seria avaliado:** reconhecer que transferir dinheiro não cancela fraude alegada.
- **Alternativa acessível:** tabela de duas colunas com explicações.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** a central não podia esperar; reutilizar conversa e rota independente.
- Revisão financeira deve validar linguagem genérica; futuramente, garantir que nenhum botão ou dado possa iniciar Pix real.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:boleto-fraud` — Boleto adulterado ou falso

### Ensinamento e papel

- **Comportamento observável:** confirmar dívida e beneficiário no canal oficial antes de pagar, especialmente diante de segunda via, desconto ou substituição inesperada.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso documental de pagamento.
- A atividade deve privilegiar o recebedor e a obrigação, não ensinar inspeção visual frágil de linha digitável ou logotipo.

### Dificuldades e riscos

- Cobranças legítimas podem vir de bancos, registradoras ou intermediários diferentes.
- Aparência perfeita não prova legitimidade; erro visual não prova fraude.
- O portal não deve validar boletos reais nem expor linha digitável utilizável.

### Formato A — Dívida antes do documento

- **Área provável:** Missão.
- **Mecânica:** localizar a cobrança num portal fictício aberto independentemente e comparar beneficiário e valor.
- **Fluxo:** boleto recebido → portal oficial simulado → obrigação → recebedor → decisão.
- **O que seria avaliado:** confirmação independente e conferência final.
- **Alternativa acessível:** registro e boleto em texto estruturado.

### Formato B — Segunda via inesperada

- **Área provável:** Simulação de caixa de entrada.
- **Mecânica:** triar cobranças originais, substituídas legitimamente e adulteradas, solicitando confirmação quando necessário.
- **Fluxo:** lote → contexto → próximo passo → resultado.
- **O que seria avaliado:** não pagar nem descartar apenas por aparência.
- **Alternativa acessível:** lista com ações explícitas e sem tempo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** dívida antes do documento; reutilizar portal inerte e comparador.
- Financeiro deve aprovar quais elementos aparecem; futuramente, usar apenas dados fictícios não pagáveis.

### Fontes

- [Banco Central — Vítima pagou um boleto e caiu em um golpe](https://www.bcb.gov.br/meubc/faqs/p/vitima-pagou-um-boleto-e-caiu-em-um-golpe)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:payment-qr` — QR de pagamento alterado

### Ensinamento e papel

- **Comportamento observável:** tratar o QR como forma de transportar dados, conferir recebedor, valor e obrigação na tela final e abandonar a operação se o contexto não fechar.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso e transferência do ensino de URL para pagamento.
- O ato de revelar o destino decodificado torna visível que a imagem não autentica a cobrança.

### Dificuldades e riscos

- QR legítimos podem ser estáticos, dinâmicos ou apontar para intermediários.
- O usuário não deve aprender a julgar o padrão visual da imagem.
- Nenhum QR do treinamento pode ser escaneável para destino externo ou pagamento real.

### Formato A — O destino atrás do QR

- **Área provável:** PhishLab.
- **Mecânica:** usar um decodificador inteiramente fictício e comparar o resultado com obrigação e beneficiário.
- **Fluxo:** QR inerte → dados revelados → tela final → conciliação → decisão.
- **O que seria avaliado:** conferência do resultado, não leitura da imagem.
- **Alternativa acessível:** os dados decodificados ficam disponíveis por botão e texto, sem câmera.

### Formato B — Adesivo sobreposto

- **Área provável:** Missão narrativa.
- **Mecânica:** investigar um ponto físico fictício com placa, cadastro e QR substituído, sem depender de percepção visual fina.
- **Fluxo:** cobrança → descrição de sinais → consulta ao estabelecimento → recebedor → reporte.
- **O que seria avaliado:** confirmação do recebedor e abandono seguro.
- **Alternativa acessível:** descrição textual explícita de todas as pistas visuais.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** destino atrás do QR; reutilizar decompositor de destino.
- Todo código deve ser deliberadamente inerte; futuramente, validar acessibilidade sem câmera e sem leitura por cor.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:fake-receipt` — Comprovante falso ou transação apenas agendada

### Ensinamento e papel

- **Comportamento observável:** verificar crédito e status no sistema/extrato aberto por conta própria antes de liberar produto, reembolsar ou considerar quitado.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de conciliação e transferência para múltiplos meios de pagamento.
- A prática contrapõe uma imagem convincente à fonte autoritativa e ensina que comprovante é alegação sobre a transação, não liquidação.

### Dificuldades e riscos

- Processamento, agendamento e indisponibilidade podem atrasar confirmação legítima.
- Um comprovante verdadeiro pode corresponder a outra transação ou ser posteriormente contestado.
- Não reproduzir marcas, saldos ou transações reais.

### Formato A — Comprovante versus extrato

- **Área provável:** PhishLab.
- **Mecânica:** reconciliar imagem fictícia, pedido e registro autoritativo.
- **Fluxo:** comprovante → consulta independente → status → decisão/reporte.
- **O que seria avaliado:** fonte usada e tratamento de ausência ou agendamento.
- **Alternativa acessível:** conteúdo do comprovante integralmente transcrito.

### Formato B — Balcão de liberação

- **Área provável:** Simulação.
- **Mecânica:** decidir sobre entregas em uma fila com pagamentos confirmados, pendentes e alegados.
- **Fluxo:** cliente → comprovante → sistema → liberar/aguardar/escalar → debrief.
- **O que seria avaliado:** política consistente, não aparência da imagem.
- **Alternativa acessível:** tabela de fila sem temporizador.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** comprovante versus extrato; reutilizar reconciliação.
- Financeiro deve definir o registro autoritativo e estados plausíveis; futuramente, assegurar dados simulados e não conectados.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [Banco Central — Novas funcionalidades e diferenciação de comprovantes](https://www.bcb.gov.br/detalhenoticia/20602/noticia)

## `concept:mistaken-pix-return` — Pix “por engano” e falsa devolução

### Ensinamento e papel

- **Comportamento observável:** verificar o extrato e, se houver valor real a devolver, usar a função de devolução da própria transação para a origem, nunca um novo Pix para conta indicada na conversa.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de resposta financeira com limite claro.
- A atividade precisa distinguir comprovante, crédito real e função oficial, porque a história pode combinar evidência verdadeira com instrução perigosa.

### Dificuldades e riscos

- Pode não existir crédito; pode existir um Pix realmente enviado por erro.
- O MED e a devolução voluntária são mecanismos diferentes; não prometer resultado nem instruir fora do aplicativo da instituição.
- Não executar devolução nem exibir dados bancários reais.

### Formato A — A devolução acompanha a origem

- **Área provável:** Missão.
- **Mecânica:** consultar extrato fictício e escolher entre nenhuma ação, função “devolver” ou contato oficial.
- **Fluxo:** mensagem → comprovante → extrato → transação original → decisão.
- **O que seria avaliado:** não criar novo Pix e não confiar na conta fornecida pelo solicitante.
- **Alternativa acessível:** extrato textual e botões inertes.

### Formato B — Três histórias, dois mecanismos

- **Área provável:** PhishLab.
- **Mecânica:** classificar erro do pagador, golpe sofrido e desacordo comercial quanto à rota apropriada.
- **Fluxo:** casos → identificar situação → selecionar função/contato → explicar limite.
- **O que seria avaliado:** distinção conceitual sem operar sistema real.
- **Alternativa acessível:** tabela de cenários com glossário.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** a devolução acompanha a origem; reutilizar extrato fictício.
- Conteúdo deve acompanhar orientação vigente do Banco Central; futuramente, revisar rótulos sem copiar interface bancária.

### Fontes

- [Banco Central — Vítima fez um Pix e caiu em um golpe](https://www.bcb.gov.br/meubc/faqs/p/vitima-fez-um-pix-e-caiu-em-um-golpe)
- [Banco Central — FAQ Pix, devolução de dinheiro](https://www.bcb.gov.br/meubc/faqs/s/pix)

## `concept:med-response` — MED e contato bancário após fraude

### Ensinamento e papel

- **Comportamento observável:** após Pix possivelmente fraudulento, acionar imediatamente a própria instituição pelo aplicativo/canal oficial, preservar fatos e entender que o MED depende de análise e saldo.
- **Potencial pedagógico:** Médio; **papel recomendado:** explicação de limite e caminho de resposta, não atividade de “recuperar dinheiro”.
- O portal pode treinar a escolha da rota, mas não abrir MED, classificar juridicamente o caso ou prometer devolução.

### Dificuldades e riscos

- MED não se aplica a todo erro, desacordo comercial ou terceiro de boa-fé.
- Prazos e fluxo podem mudar; conteúdo precisa de revisão regulatória.
- A urgência de agir não deve virar cronômetro punitivo.

### Formato A — Qual rota cabe aqui?

- **Área provável:** PhishLab explicativo.
- **Mecânica:** diferenciar fraude/golpe, Pix errado e disputa comercial em casos fictícios.
- **Fluxo:** evento → classificação provisória → canal oficial → limites do mecanismo.
- **O que seria avaliado:** escolha do contato e ausência de promessa de resultado.
- **Alternativa acessível:** matriz textual e glossário.

### Formato B — Primeiros passos após o pagamento

- **Área provável:** Missão de resposta.
- **Mecânica:** ordenar contato à instituição, preservação de dados e reporte interno, sem tela bancária operacional.
- **Fluxo:** percepção do golpe → parar interação → abrir banco por conta própria → registrar fatos → debrief.
- **O que seria avaliado:** sequência proporcional e canal independente.
- **Alternativa acessível:** ordenação por botões e lista numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** qual rota cabe aqui; reutilizar classificador de incidente.
- Jurídico/Financeiro devem validar versão e linguagem; futuramente, prever data de revisão das regras e nenhum vínculo com banco real.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [Banco Central — Vítima fez um Pix e caiu em um golpe](https://www.bcb.gov.br/meubc/faqs/p/vitima-fez-um-pix-e-caiu-em-um-golpe)

## `concept:safe-account-scam` — Golpe da “conta segura”

### Ensinamento e papel

- **Comportamento observável:** recusar transferência para suposta conta de proteção, encerrar contato e consultar a instituição ou autoridade em endereço obtido independentemente.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de falsa central e personificação governamental.
- A atividade deve evidenciar a contradição operacional: mover dinheiro para um terceiro não protege a conta original.

### Dificuldades e riscos

- Contatos legítimos de prevenção a fraude podem pedir confirmação, mas não se deve generalizar procedimentos específicos sem validação local.
- Dados corretos, número exibido e protocolo não autenticam a chamada.
- Evitar linguagem absoluta além do princípio de não transferir para “proteger”.

### Formato A — Cofre que não existe

- **Área provável:** Missão.
- **Mecânica:** desmontar o pedido em problema alegado, ação exigida e beneficiário real.
- **Fluxo:** chamada/texto → decomposição → encerramento → canal oficial → reporte.
- **O que seria avaliado:** recusa da transferência e navegação independente.
- **Alternativa acessível:** diálogo textual, sem voz obrigatória.

### Formato B — Mapa do dinheiro

- **Área provável:** PhishLab.
- **Mecânica:** traçar para onde o dinheiro sairia em diferentes “soluções” alegadas.
- **Fluxo:** cenários → fluxo financeiro → identificação do controle perdido → ação segura.
- **O que seria avaliado:** compreender beneficiário e perda de controle, não reconhecer frases decoradas.
- **Alternativa acessível:** sequência numerada em vez de diagrama.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mapa do dinheiro; reutilizar decompositor de pedido.
- Financeiro deve revisar afirmações sobre bancos; futuramente, garantir que nenhum exemplo indique conta utilizável.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [FTC — Government impersonation scams](https://consumer.ftc.gov/articles/how-avoid-government-impersonation-scam)

## `concept:refund-overpayment` — Reembolso, pagamento excedente e crédito aparente

### Ensinamento e papel

- **Comportamento observável:** não devolver diferença nem repassar valores até confirmar liquidação e obrigação em fonte independente.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de conciliação que combina comprovante, cheque ou crédito reversível.
- A prática mostra a assimetria entre saldo aparentemente disponível e liquidação final, sem exigir conhecimento bancário avançado.

### Dificuldades e riscos

- Pagamentos excedentes legítimos acontecem e precisam de processo de reembolso.
- O registro pode mostrar valor pendente ou provisório; “apareceu no saldo” nem sempre encerra a análise.
- Não ensinar prazos universais nem reproduzir cheque ou conta real.

### Formato A — Crédito pendente, pedido imediato

- **Área provável:** Missão.
- **Mecânica:** comparar registro provisório com pedido para devolver ou pagar terceiro.
- **Fluxo:** crédito → pressão → status de liquidação → processo de reembolso → decisão.
- **O que seria avaliado:** espera pela fonte autoritativa e uso de reembolso formal.
- **Alternativa acessível:** extrato e estados descritos em texto.

### Formato B — Livro-caixa de três casos

- **Área provável:** PhishLab.
- **Mecânica:** reconciliar excesso legítimo, comprovante falso e crédito posteriormente inválido.
- **Fluxo:** casos → evidências → próximo passo → explicação da diferença.
- **O que seria avaliado:** não enviar dinheiro novo para corrigir alegação não confirmada.
- **Alternativa acessível:** tabela navegável, sem cálculos complexos.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** crédito pendente; reutilizar estados de transação.
- Financeiro deve definir termos locais de liquidação e reembolso; futuramente, testar clareza sem parecer aconselhamento bancário individual.

### Fontes

- [FTC — How to spot, avoid, and report fake check scams](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-fake-check-scams)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:advance-fee` — Taxa antecipada para liberar vantagem

### Ensinamento e papel

- **Comportamento observável:** pausar quando uma oportunidade, benefício, prêmio, crédito ou emprego exige pagamento prévio e verificar a organização e o processo independentemente.
- **Potencial pedagógico:** Alto; **papel recomendado:** fundamento transversal para casos financeiros pessoais.
- O formato deve ensinar a reconhecer a estrutura “pague para receber”, sem afirmar que toda taxa legítima é fraude.

### Dificuldades e riscos

- Serviços legítimos cobram taxas; importam obrigação, destinatário, transparência e canal.
- O pretexto varia e pode começar sem pedido financeiro.
- Evitar culpabilizar vítimas por desejo, necessidade ou investimento anterior.

### Formato A — A vantagem tem uma catraca

- **Área provável:** PhishLab.
- **Mecânica:** decompor promessa, condição, destinatário e verificabilidade em diferentes pretextos.
- **Fluxo:** oferta → custo revelado → fonte independente → decisão.
- **O que seria avaliado:** percepção da estrutura e busca de confirmação.
- **Alternativa acessível:** tabela de campos e opções textuais.

### Formato B — Escalada de pequenas taxas

- **Área provável:** Missão longitudinal.
- **Mecânica:** acompanhar taxas sucessivas que exploram compromisso já assumido.
- **Fluxo:** primeira promessa → pequeno pagamento fictício narrado → nova exigência → apoio/verificação.
- **O que seria avaliado:** interromper a escalada e reportar sem vergonha.
- **Alternativa acessível:** diário textual sem transação interativa.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** vantagem tem uma catraca; reutilizar decompositor promessa/ação.
- Editorial deve incluir exemplos legítimos e fraudulentos; futuramente, revisar tom para não responsabilizar a vítima.

### Fontes

- [FTC — Fake prize, sweepstakes, and lottery scams](https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:second-approval` — Segunda aprovação e segregação

### Ensinamento e papel

- **Comportamento observável:** encaminhar ações de risco à segunda aprovação prevista, fornecendo evidências independentes e sem tratar o segundo clique como confirmação automática.
- **Potencial pedagógico:** Alto; **papel recomendado:** fundamento de processo em pagamento, cadastro e exceções.
- A interação precisa mostrar que duas pessoas podem repetir o mesmo erro se ambas confiarem na mesma mensagem.

### Dificuldades e riscos

- A aprovação adicional não substitui verificação do beneficiário ou do solicitante.
- Segregação e alçadas variam; não inventar autoridade corporativa final.
- Evitar ensinar “obter qualquer colega” ou compartilhar segredos para conseguir aprovação.

### Formato A — Duas decisões independentes

- **Área provável:** PhishLab.
- **Mecânica:** separar confirmação da origem, conferência dos dados e aprovação por alçada.
- **Fluxo:** pedido → evidência → primeira análise → pacote ao aprovador → decisão.
- **O que seria avaliado:** independência das etapas e qualidade do registro.
- **Alternativa acessível:** fluxograma convertido em lista ordenada.

### Formato B — Aprovador sem contexto

- **Área provável:** Missão de comunicação.
- **Mecânica:** montar um resumo que permita ao segundo aprovador verificar, em vez de apenas clicar “aprovar”.
- **Fluxo:** caso → seleção de fatos → origem das evidências → envio fictício → feedback.
- **O que seria avaliado:** informação suficiente sem segredo e sem pressão indevida.
- **Alternativa acessível:** construtor de relatório por checkboxes.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** duas decisões independentes; reutilizar motor de processo.
- Áreas responsáveis devem definir alçadas e evidências; futuramente, representar papéis sem usar colaboradores reais.

### Fontes

- [FBI — Business Email Compromise on the Rise](https://www.fbi.gov/news/stories/business-e-mail-compromise-on-the-rise)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:process-exception` — Exceção urgente ao processo

### Ensinamento e papel

- **Comportamento observável:** pausar, documentar e escalar uma exceção pela rota autorizada, protegendo inclusive pedidos legítimos de erro e contestação.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso transversal que combina urgência, autoridade e processo.
- O ensaio deve oferecer uma forma operacional de continuar o trabalho, em vez de ensinar proibição genérica.

### Dificuldades e riscos

- Exceções reais existem; bloquear tudo pode causar dano operacional.
- A rota de exceção pode ser alvo do atacante ou estar indisponível.
- Não premiar lentidão nem obediência cega; avaliar documentação e autoridade correta.

### Formato A — Mesa de exceção

- **Área provável:** Missão.
- **Mecânica:** preencher motivo, risco, autoridade e medida temporária antes de uma decisão fictícia.
- **Fluxo:** urgência → impossibilidade do fluxo normal → registro → escalada → resultado.
- **O que seria avaliado:** exceção explícita e rastreável, não atalho informal.
- **Alternativa acessível:** formulário linear e resumo final.

### Formato B — Processo degradado

- **Área provável:** Simulação.
- **Mecânica:** operar durante indisponibilidade fictícia escolhendo controles compensatórios.
- **Fluxo:** falha do sistema → opções de continuidade → aprovação independente → reconciliação posterior.
- **O que seria avaliado:** preservação de controle sob contingência.
- **Alternativa acessível:** escolhas textuais sem limite de tempo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mesa de exceção; reutilizar formulário e aprovações.
- Continuidade, Financeiro e Jurídico precisam definir rotas reais antes da publicação; futuramente, testar sem sugerir que o portal autoriza exceções.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise)

## `concept:job-recruitment-scam` — Vaga e recrutamento falso

### Ensinamento e papel

- **Comportamento observável:** localizar vaga e empresa por conta própria, confirmar recrutador em canal oficial e não pagar para trabalhar nem antecipar dados financeiros desnecessários.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso longitudinal entre identidade, dados e taxa antecipada.
- O caso precisa evoluir de oferta plausível para coleta/pagamento, porque a fraude pode incluir entrevista e documentos convincentes.

### Dificuldades e riscos

- Recrutadores legítimos fazem contato não solicitado e pedem dados em etapas posteriores.
- A existência de entrevista ou site não autentica a vaga.
- Não coletar currículo, documento, salário ou dados bancários reais do participante.

### Formato A — Processo seletivo em etapas

- **Área provável:** Missão longitudinal.
- **Mecânica:** acompanhar mensagem, entrevista textual, portal e pedido de compra/taxa.
- **Fluxo:** oferta → pesquisa independente → entrevista → exigência sensível → decisão/reporte.
- **O que seria avaliado:** verificação contínua e minimização de dados.
- **Alternativa acessível:** diário textual sem vídeo ou envio de arquivo.

### Formato B — Vaga no site, pessoa no diretório

- **Área provável:** PhishLab.
- **Mecânica:** cruzar anúncio recebido, carreira oficial fictícia e contato de RH.
- **Fluxo:** mensagem → busca independente → correspondências/lacunas → próximo passo.
- **O que seria avaliado:** fonte consultada e tratamento do que permanece inconclusivo.
- **Alternativa acessível:** resultados em lista com explicações.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** processo seletivo em etapas; reutilizar diário longitudinal.
- RH e Privacidade devem aprovar estágios e dados; futuramente, garantir que nenhum campo aceite currículo ou documento real.

### Fontes

- [FTC — Job scams](https://consumer.ftc.gov/articles/job-scams)
- [FTC — How to spot, avoid, and report fake check scams](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-fake-check-scams)

## `concept:investment-pig-butchering` — Investimento e fraude relacional prolongada

### Ensinamento e papel

- **Comportamento observável:** interromper aporte diante de retorno garantido, plataforma indicada ou taxa para saque; consultar fonte regulatória e pessoa de confiança independentemente.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso longitudinal que ensina compromisso, confiança e escalada.
- O formato precisa mostrar pequenos ganhos aparentes e investimento emocional ao longo do tempo, sem gamificar perda financeira.

### Dificuldades e riscos

- O termo pode ser estigmatizante; preferir linguagem centrada no comportamento e explicar o rótulo no glossário.
- Investimentos legítimos têm risco e podem usar plataformas pouco conhecidas.
- Não pedir decisão financeira real nem responsabilizar a vítima por permanecer na relação.

### Formato A — Diário do investimento aparente

- **Área provável:** Missão longitudinal.
- **Mecânica:** acompanhar contato, painel fictício, aportes narrados e bloqueio do saque.
- **Fluxo:** vínculo → oportunidade → ganho exibido → nova exigência → pausa/apoio/reporte.
- **O que seria avaliado:** verificação independente e interrupção da escalada.
- **Alternativa acessível:** diário e extratos textuais, sem gráficos obrigatórios.

### Formato B — Auditoria da promessa

- **Área provável:** PhishLab.
- **Mecânica:** decompor retorno, risco, registro, custódia, saque e origem do contato.
- **Fluxo:** proposta → perguntas verificáveis → fontes independentes fictícias → decisão.
- **O que seria avaliado:** recusa de garantias e plataforma autoatestada.
- **Alternativa acessível:** checklist estruturado com glossário financeiro simples.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** diário do investimento aparente; reutilizar narrativa longitudinal.
- Jurídico e bem-estar devem revisar linguagem e intensidade; futuramente, não mostrar valores capazes de induzir decisão financeira pessoal.

### Fontes

- [FTC — Investment scams](https://consumer.ftc.gov/articles/investment-scams)
- [FBI IC3 — Cryptocurrency investment fraud](https://www.ic3.gov/PSA/2023/PSA230314)

## `concept:romance-financial-scam` — Romance seguido de pedido financeiro

### Ensinamento e papel

- **Comportamento observável:** buscar apoio de pessoa confiável, verificar fora do relacionamento e não transferir confiança afetiva para dinheiro, investimento, documento ou segredo.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso longitudinal sensível e opcional.
- A prática deve mostrar isolamento e escalada sem ridicularizar afeto, solidão ou vítima.

### Dificuldades e riscos

- Tema emocional e potencialmente traumático; precisa de aviso, saída e alternativa equivalente.
- Relações legítimas a distância existem; perfil novo ou ausência de vídeo não prova fraude.
- Não avaliar emoções, orientação, estado civil ou capacidade de “descobrir mentira”.

### Formato A — Uma confiança construída

- **Área provável:** Missão longitudinal opcional.
- **Mecânica:** acompanhar conversas fictícias até uma emergência ou investimento e escolher apoio/verificação.
- **Fluxo:** vínculo → consistência aparente → pedido → pausa social → decisão.
- **O que seria avaliado:** ampliar a rede de decisão e proteger recursos/dados.
- **Alternativa acessível:** texto ajustável, opção de tema neutro e saída sem penalidade.

### Formato B — Conselho a outra pessoa

- **Área provável:** PhishLab reflexivo.
- **Mecânica:** orientar um personagem, reduzindo exposição pessoal e viés defensivo.
- **Fluxo:** relato → identificar ação de risco → escolher apoio e fonte → plano.
- **O que seria avaliado:** resposta sem culpa e foco no processo.
- **Alternativa acessível:** narrativa textual curta com linguagem não gráfica.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** conselho a outra pessoa; reutilizar plano de apoio.
- Bem-estar, Diversidade e Jurídico devem aprovar tom e opção de saída; futuramente, testar segurança emocional antes de qualquer uso.

### Fontes

- [FTC — What to know about romance scams](https://consumer.ftc.gov/articles/what-know-about-romance-scams)
- [FBI — Romance scams](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/romance-scams)

## `concept:prize-sweepstakes` — Prêmio, sorteio ou vantagem inesperada

### Ensinamento e papel

- **Comportamento observável:** verificar se participou, localizar o promotor por conta própria e não pagar nem entregar dados financeiros para receber prêmio não confirmado.
- **Potencial pedagógico:** Médio; **papel recomendado:** caso curto de recompensa e taxa antecipada.
- A comparação ajuda a separar promoção legítima, publicidade agressiva e fraude sem usar “você ganhou” como diagnóstico automático.

### Dificuldades e riscos

- Concursos legítimos podem pedir confirmação e dados mínimos.
- Regras jurídicas variam; não apresentar afirmações locais sem revisão.
- Não incentivar clique, cadastro ou contato real.

### Formato A — Você participou?

- **Área provável:** Missão curta.
- **Mecânica:** consultar um histórico fictício de inscrições e regras oficiais antes de responder.
- **Fluxo:** anúncio → histórico → promotor oficial → custo/dados pedidos → decisão.
- **O que seria avaliado:** confirmação independente e recusa de taxa inesperada.
- **Alternativa acessível:** registros e regras em texto.

### Formato B — Anatomia do prêmio

- **Área provável:** PhishLab.
- **Mecânica:** decompor prêmio, condição, prazo, pagamento e informação solicitada.
- **Fluxo:** ofertas variadas → classificação dos componentes → ação segura → debrief.
- **O que seria avaliado:** reconhecer a estrutura sem depender de design ruim.
- **Alternativa acessível:** tabela com seletores.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** anatomia do prêmio; reutilizar decompositor de promessa.
- Jurídico deve revisar exemplos locais; futuramente, manter todos os promotores fictícios.

### Fontes

- [FTC — Fake prize, sweepstakes, and lottery scams](https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:charity-disaster` — Caridade, desastre e solidariedade

### Ensinamento e papel

- **Comportamento observável:** escolher a organização independentemente, pesquisar sua identidade e doar pela rota oficial em vez de usar link, QR ou conta recebidos sob pressão emocional.
- **Potencial pedagógico:** Médio; **papel recomendado:** caso de empatia e evento atual.
- A atividade deve preservar a intenção de ajudar, oferecendo uma alternativa segura, não ensinar cinismo diante de campanhas legítimas.

### Dificuldades e riscos

- Organizações pequenas e campanhas emergenciais legítimas podem ter pouca presença.
- O fato de a causa ser real não autentica o arrecadador.
- Evitar desastre real recente ou imagens traumáticas.

### Formato A — Escolha a causa, depois o canal

- **Área provável:** Missão.
- **Mecânica:** separar decisão de doar da escolha do recebedor e localizar a organização por fonte própria.
- **Fluxo:** apelo → pausa → diretório/pesquisa fictícia → beneficiário → decisão.
- **O que seria avaliado:** rota independente sem abandonar a ajuda.
- **Alternativa acessível:** texto neutro, sem imagens de sofrimento.

### Formato B — Campanha sob verificação

- **Área provável:** PhishLab.
- **Mecânica:** analisar organizador, destino, transparência e canal de pagamento em campanhas variadas.
- **Fluxo:** cartões → perguntas → fontes → conclusão graduada.
- **O que seria avaliado:** qualidade da verificação, não reconhecimento de marca.
- **Alternativa acessível:** formulário e tabela textual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** escolha a causa, depois o canal; reutilizar diretório e beneficiário.
- Editorial deve usar cenário fictício e atemporal; futuramente, revisar sensibilidade e evitar arrecadação real.

### Fontes

- [FTC — Donating safely and avoiding scams](https://consumer.ftc.gov/features/donating-safely-and-avoiding-scams)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)

## `concept:government-legal-payment` — Governo, polícia ou jurídico exigindo pagamento

### Ensinamento e papel

- **Comportamento observável:** encerrar o contato, acessar o órgão ou área jurídica por endereço conhecido e não pagar nem fornecer dados para neutralizar ameaça imediata.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de autoridade, medo e pagamento.
- A encenação permite praticar como sair de uma ameaça sem precisar decidir se o assunto legal é verdadeiro.

### Dificuldades e riscos

- Órgãos e departamentos jurídicos fazem comunicações legítimas e procedimentos variam.
- Crachá, número de processo e dados corretos podem ser copiados.
- Evitar aconselhamento jurídico específico e conteúdo de prisão/deportação potencialmente traumático sem alternativa.

### Formato A — Protocolo não autentica o contato

- **Área provável:** Missão.
- **Mecânica:** receber cobrança ameaçadora, localizar o órgão por diretório oficial fictício e verificar o processo.
- **Fluxo:** contato → protocolo alegado → encerramento → fonte oficial → apoio/reporte.
- **O que seria avaliado:** canal independente e ausência de pagamento impulsivo.
- **Alternativa acessível:** conversa textual com intensidade reduzida.

### Formato B — Competência e forma de cobrança

- **Área provável:** PhishLab.
- **Mecânica:** comparar o que o contato afirma poder fazer com o procedimento documentado.
- **Fluxo:** alegações → fonte oficial → incompatibilidades → próximo passo.
- **O que seria avaliado:** consultar procedimento, não memorizar frases universais.
- **Alternativa acessível:** tabela “alegação / fonte / ação”.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** protocolo não autentica; reutilizar rota independente.
- Jurídico deve validar todas as afirmações e oferecer rota de apoio; futuramente, revisar acessibilidade emocional.

### Fontes

- [FTC — Government impersonation scams](https://consumer.ftc.gov/articles/how-avoid-government-impersonation-scam)
- [Banco Central — Golpes envolvendo o Meu BC](https://www.bcb.gov.br/meubc/faqs/p/golpes-envolvendo-o-meu-bc)

## `concept:delivery-fee` — Entrega, pacote, pedágio ou pequena taxa

### Ensinamento e papel

- **Comportamento observável:** abrir o aplicativo ou site original por conta própria, confirmar que a entrega existe e conferir o beneficiário antes de pagar ou fornecer dados.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso curto multicanal e transferência para QR/link.
- O formato deve mostrar como valor baixo e dados corretos do pacote reduzem a vigilância, sem ensinar que toda taxa aduaneira ou de entrega é falsa.

### Dificuldades e riscos

- Transportadoras e governo podem cobrar taxas legítimas por processos próprios.
- Código de rastreio e endereço podem ter vazado ou sido obtidos legitimamente.
- Não usar pedido, telefone, endereço ou código real do participante.

### Formato A — Rastreie sem usar a mensagem

- **Área provável:** Missão.
- **Mecânica:** abandonar SMS/e-mail, abrir um agregador fictício por rota conhecida e localizar o pedido.
- **Fluxo:** aviso → navegação independente → pedido existente/ausente → cobrança → decisão.
- **O que seria avaliado:** reconstrução da rota e conferência do recebedor.
- **Alternativa acessível:** busca textual com código fictício já fornecido no cenário.

### Formato B — Pequenas taxas em lote

- **Área provável:** Simulação.
- **Mecânica:** triar entrega, pedágio e alfândega com valores baixos, separando resolver, investigar e reportar.
- **Fluxo:** fila → fonte oficial → beneficiário → ação → revisão.
- **O que seria avaliado:** não usar baixo valor ou familiaridade como prova.
- **Alternativa acessível:** lista sem temporizador e com todas as imagens descritas.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** rastreie sem usar a mensagem; reutilizar navegação independente.
- Editorial/Jurídico devem definir exemplos brasileiros e fictícios; futuramente, nenhum link, QR ou código pode resolver para serviço externo.

### Fontes

- [Receita Federal — Golpe em remessas postais e expressas](https://www.gov.br/receitafederal/pt-br/assuntos/aduana-e-comercio-exterior/manuais/remessas-postal-e-expressa/e-golpe)
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf)
