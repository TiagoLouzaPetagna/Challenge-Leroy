# Mapa — processos, pagamentos e BEC

> **Estado:** mapa curricular e 21 blueprints de primeira versão aprovados em 2026-08-15; conversão técnica em proposta separada.

Este mapa consolida a taxonomia do [conjunto 07](../conjuntos-de-ensino/07-processos-pagamentos-e-bec.md), os [formatos pedagógicos](../estudos-de-formatos/07-processos-pagamentos-e-bec.md) e a [matriz de viabilidade](../viabilidade-de-formatos/07-processos-pagamentos-e-bec.md). Não cria atividade, rota, pontuação ou integração.

## Critério do conjunto

**Pagamento para quem?** é proprietária da estação fictícia que concilia obrigação, cadastro, beneficiário, liquidação e aprovação. Pressão hierárquica, falsa central, QR, coleta de dados e triagem conservam propriedade nas experiências especializadas, reaparecendo na estação apenas como aplicação. Casos pessoais, regulatórios, de função ou longitudinais entram no banco ou em versão futura, nunca todos na mesma tentativa. Nenhum fluxo executa transação, consulta instituição ou substitui procedimento corporativo; backend autoritativo e validação das áreas responsáveis continuam obrigatórios antes do uso real.

## Mapa conceito → atividade

| `conceptId` | Conceito | Atividade proprietária | Papel | Formato | Decisão | Momento | Aplicação prevista | Aplicações secundárias |
|---|---|---|---|---|---|---|---|---|
| `concept:bec` | Business Email Compromise | Pagamento para quem? | Núcleo | Formato A | Manter | Primeira versão | Conciliar solicitação contextualizada, obrigação autêntica, registro oficial e beneficiário apresentado antes de qualquer liberação, sem presumir que o documento ou a conversa comprovam o vínculo. | A conversa já estava acontecendo; Pedido urgente de um gestor |
| `concept:ceo-fraud` | CEO fraud e falso gestor | Pedido urgente de um gestor | Núcleo | Formato A | Combinar | Primeira versão | Montar resposta de limite, consultar alçada fictícia e confirmar por contato independente diante de autoridade, sigilo e urgência. | Pagamento para quem? |
| `concept:vendor-compromise` | Fornecedor comprometido | Pagamento para quem? | Complementar | Combinação | Combinar | Primeira versão | Comparar o recebedor apresentado numa conversa plausível com a relação e os registros oficiais, verificando fora da conversa se existe vínculo antes de qualquer decisão. | A conversa já estava acontecendo |
| `concept:bank-change` | Alteração bancária | Pagamento para quem? | Variação de caso | Formato A | Manter | Banco de casos | Executar a sequência fictícia de suspender, contatar pelo cadastro anterior, validar e obter segunda aprovação, sem atualizar ou pagar de verdade. | Mudança bancária sem atalho, em Equipes |
| `concept:invoice-diversion` | Fatura ou nota adulterada | Pagamento para quem? | Variação de caso | Formato A | Combinar | Banco de casos | Conciliar documento sintético com pedido, recebimento, fornecedor e beneficiário; o PDF apenas ordena a revelação e nunca é fonte autoritativa. | Documento inesperado |
| `concept:payroll-diversion` | Desvio de folha ou alteração de depósito | Pagamento para quem? | Variação de caso | Combinação | Adiar | Versão futura | Simular um balcão de RH inerte e uma sequência de alteração sem coletar dados pessoais ou bancários, após procedimento específico ser aprovado. | O pedido não tinha link |
| `concept:gift-card-procurement` | Cartão-presente e compra sigilosa | Pedido urgente de um gestor | Variação de caso | Formato A | Adaptar | Banco de casos | Apresentar primeiro a compra e depois o pedido de envio de códigos fictícios, exigindo procurement, reconfirmação e rastreabilidade. | Pagamento para quem? |
| `concept:beneficiary-check` | Conferência do beneficiário | Pagamento para quem? | Núcleo | Formato B | Manter | Primeira versão | Construir o beneficiário esperado a partir de fontes independentes antes de revelar recebedor, valor e instituição apresentados. | O destino atrás do QR |
| `concept:pix-fraud` | Pix induzido por falsa central ou mensagem | A central que não podia esperar | Variação de caso | Combinação | Combinar | Banco de casos | Interromper conversa textual persistente, decompor motivo alegado e operação pedida e reconstruir a rota oficial sem abrir aplicativo real. | Pagamento para quem? |
| `concept:boleto-fraud` | Boleto adulterado | Pagamento para quem? | Variação de caso | Formato A | Combinar | Banco de casos | Localizar obrigação em portal inerte aberto independentemente e comparar valor e beneficiário com um boleto não pagável. | Documento inesperado; Uma manhã comum |
| `concept:payment-qr` | QR de pagamento alterado | O destino atrás do QR | Transferência | Formato A | Adaptar | Banco de casos | Revelar por botão o conteúdo simulado do QR e confrontar obrigação, recebedor e valor, sem câmera nem código escaneável. | Pagamento para quem? |
| `concept:fake-receipt` | Comprovante falso | Pagamento para quem? | Complementar | Formato A | Combinar | Primeira versão | Comparar comprovante fictício com registro autoritativo cenográfico e distinguir agendado, processando, liquidado e ausente. | Central de mensagens |
| `concept:mistaken-pix-return` | Pix “por engano” e falsa devolução | Pagamento para quem? | Variação de caso | Formato A | Combinar | Banco de casos | Consultar extrato fictício e ordenar a devolução pela própria transação ou o contato oficial, bloqueando um novo Pix para terceiro. | Central de mensagens |
| `concept:med-response` | Mecanismo Especial de Devolução e contato bancário | Cliquei. E agora? | Debrief ou limite técnico | Formato A | Adaptar | Debrief | Diferenciar, em casos fictícios, suspeita de fraude, Pix errado e disputa, apontando contato imediato com a instituição sem garantir elegibilidade ou devolução. | Pagamento para quem? |
| `concept:safe-account-scam` | “Conta segura” | A central que não podia esperar | Complementar | Formato A | Combinar | Primeira versão | Decompor a falsa proteção em problema alegado, transferência exigida e perda de controle, então encerrar e procurar o canal oficial. | Pagamento para quem? |
| `concept:refund-overpayment` | Reembolso, pagamento excedente e cheque aparente | Pagamento para quem? | Variação de caso | Formato B | Combinar | Banco de casos | Triar créditos liquidado, pendente e inexistente e aplicar o processo formal de reembolso sem enviar dinheiro novo. | Uma manhã comum |
| `concept:advance-fee` | Taxa antecipada para prêmio, emprego, benefício ou liberação | Pagamento para quem? | Variação de caso | Formato A | Manter | Banco de casos | Decompor promessa, condição, taxa, destinatário e verificabilidade em casos legítimos, suspeitos e inconclusivos. | Ele já sabia meus dados; Uma manhã comum |
| `concept:second-approval` | Segunda aprovação e segregação | Pagamento para quem? | Complementar | Combinação | Combinar | Primeira versão | Separar confirmação, conferência e aprovação e montar para o segundo papel um pacote fechado de fatos, sem simular colaboração real. | Pedido urgente de um gestor; Mudança bancária sem atalho, em Equipes |
| `concept:process-exception` | Exceção urgente ao processo | Pedido urgente de um gestor | Complementar | Formato A | Manter | Primeira versão | Registrar motivo, risco, autoridade e medida temporária numa mesa de exceção fictícia, em vez de aceitar atalho informal. | Pagamento para quem? |
| `concept:job-recruitment-scam` | Vaga e recrutamento falso | O pedido não tinha link | Variação de caso | Formato B | Adaptar | Banco de casos | Cruzar anúncio, site de carreiras e diretório de RH inventados antes de fornecer dado ou pagar, aceitando ausência como inconclusiva. | Ele já sabia meus dados; Pagamento para quem? |
| `concept:investment-pig-butchering` | Investimento, cripto e pig-butchering | Ele já sabia meus dados | Variação de caso | Formato B | Adiar | Versão futura | Auditar promessa, risco, registro, custódia e saque num caso curto, sem aconselhamento financeiro ou campanha longitudinal nesta fase. | Pagamento para quem? |
| `concept:romance-financial-scam` | Romance seguido de emergência ou investimento | Ele já sabia meus dados | Variação de caso | Formato B | Adiar | Versão futura | Orientar uma persona fictícia a buscar apoio e separar confiança afetiva de dinheiro, com aviso, saída e revisão psicossocial obrigatórios. | Pagamento para quem? |
| `concept:prize-sweepstakes` | Prêmio, sorteio e vantagem inesperada | Uma manhã comum | Variação de caso | Combinação | Adaptar | Banco de casos | Consultar participação fictícia e decompor prêmio, taxa, prazo, canal e dados solicitados sem transformar surpresa em diagnóstico. | Pagamento para quem? |
| `concept:charity-disaster` | Caridade e desastre | Ele já sabia meus dados | Transferência | Formato A | Combinar | Banco de casos | Preservar a intenção de ajudar e localizar uma organização inteiramente fictícia por rota própria antes de escolher canal e beneficiário. | Pagamento para quem?; O destino atrás do QR |
| `concept:government-legal-payment` | Governo, polícia, jurídico ou compliance exigindo pagamento | O pedido não tinha link | Variação de caso | Formato A | Adaptar | Banco de casos | Encerrar ameaça textual, procurar órgão ou jurídico em diretório cenográfico e verificar o protocolo sem pagar nem fornecer dado. | Pagamento para quem?; A central que não podia esperar |
| `concept:delivery-fee` | Entrega, pacote, pedágio ou taxa | Uma manhã comum | Variação de caso | Combinação | Combinar | Banco de casos | Abandonar a mensagem, consultar rastreamento fictício e triar taxas legítimas, suspeitas e inconclusivas sem usar baixo valor como prova. | O destino atrás do QR; Pagamento para quem? |

## Decisões do conjunto

- **Pagamento para quem?** recebe o processo reutilizável de conciliação, mas cada tentativa mantém um comportamento principal, até dois complementares e somente uma transferência curta.
- **Mudança bancária sem atalho** permanece uma aplicação secundária de Equipes, fora das 22 proprietárias; sua base pode inspirar a estação, mas este mapa não cria nem renomeia `activityId`.
- Autoridade e exceção ficam em **Pedido urgente de um gestor**; falsa central e “conta segura” ficam em **A central que não podia esperar**; QR de pagamento permanece em **O destino atrás do QR**.
- Folha, investimento e romance são futuros. MED permanece debrief datado e revisado, sem promessa de recuperação financeira.
- Valores, cadastros, beneficiários, extratos, faturas, QR Codes, diretórios e instituições são sintéticos e inertes. Nenhuma ação consulta banco, executa Pix, paga boleto, abre MED ou altera cadastro.
- Financeiro, Compras, RH, Jurídico, Privacidade e Segurança devem aprovar conteúdo e procedimento; backend autoritativo continua obrigatório antes de progresso, avaliação ou recompensa reais.

## Regra de leitura

- **Atividade proprietária** é única e documental; não cria ID, rota ou disponibilidade.
- **Formato** e **Decisão** correspondem à matriz de viabilidade homônima.
- **Momento** impede que o banco completo de pretextos seja exibido numa única tentativa.
- **Aplicações secundárias** reaplicam o comportamento sem duplicar propriedade.
