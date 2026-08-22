# Conjunto 07 — Processos, pagamentos e BEC

> **Estado curricular:** conceitos inventariados; alocação candidata.
> **Atividade proprietária:** **Pagamento para quem?**.
> **Aplicações complementares:** **Pedido urgente de um gestor**, **A conversa já estava acontecendo** e o desafio de Equipes **Mudança bancária sem atalho**, que permanece fora das 22 atividades deste portfólio.

## Objetivo

Ensinar que pedido, valor, documento e remetente plausíveis não substituem validação de beneficiário, contato previamente cadastrado, segregação de função e segunda aprovação. O funcionário deve preservar o processo tanto em fraude quanto em alteração legítima.

## Conceitos pesquisados — trabalho e pagamentos

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:bec` | Business Email Compromise | Verificar identidade e processo antes de dinheiro, dados ou exceção. | Pagamento para quem? | A conversa já estava acontecendo; Pedido urgente de um gestor |
| `concept:ceo-fraud` | CEO fraud e falso gestor | Autoridade e sigilo não eliminam compras e aprovações previstas. | Pedido urgente de um gestor | Pagamento para quem? |
| `concept:vendor-compromise` | Fornecedor comprometido | Confirmar mudança fora da conversa e pelo cadastro anterior. | Pagamento para quem? | A conversa já estava acontecendo; Mudança bancária sem atalho |
| `concept:bank-change` | Alteração bancária | Suspender mudança e pagamento relacionado até confirmação e segunda aprovação. | Pagamento para quem? | Mudança bancária sem atalho |
| `concept:invoice-diversion` | Fatura ou nota adulterada | Conciliar pedido, fornecedor, conta e beneficiário em vez de confiar no PDF. | Pagamento para quem? | Documento inesperado |
| `concept:payroll-diversion` | Desvio de folha ou alteração de depósito | Usar fluxo autenticado e notificação pelo contato anterior. | Pagamento para quem?, caso de função | O pedido não tinha link |
| `concept:gift-card-procurement` | Cartão-presente e compra sigilosa | Utilizar compras/procurement e confirmação, mesmo quando o pedido vem de liderança. | Pedido urgente de um gestor | Pagamento para quem? |
| `concept:beneficiary-check` | Conferência do beneficiário | Ler recebedor, documento e valor antes de confirmar; nome intermediário pode exigir investigação. | Pagamento para quem? | O destino atrás do QR |
| `concept:pix-fraud` | Pix induzido por falsa central ou mensagem | Não transferir para “cancelar” operação ou proteger saldo; abrir o banco por conta própria. | Pagamento para quem? | A central que não podia esperar |
| `concept:boleto-fraud` | Boleto adulterado | Confirmar dívida e beneficiário no canal oficial antes do pagamento. | Pagamento para quem? | Documento inesperado |
| `concept:payment-qr` | QR de pagamento alterado | Conferir recebedor, valor e origem; QR não autentica cobrança. | Pagamento para quem? | O destino atrás do QR |
| `concept:fake-receipt` | Comprovante falso | Confirmar crédito no sistema ou extrato, não pela imagem enviada. | Pagamento para quem? | Central de mensagens |
| `concept:mistaken-pix-return` | Pix “por engano” e falsa devolução | Usar a função oficial de devolução para a origem, não criar novo Pix para outra conta. | Pagamento para quem? | Central de mensagens |
| `concept:med-response` | Mecanismo Especial de Devolução e contato bancário | Após fraude real, acionar imediatamente instituição pelos canais oficiais e preservar fatos. | Cliquei. E agora?, caminho de pagamento | Pagamento para quem? |
| `concept:safe-account-scam` | “Conta segura” | Banco ou autoridade não exige mover dinheiro para protegê-lo. | Pagamento para quem? | A central que não podia esperar |
| `concept:refund-overpayment` | Reembolso, pagamento excedente e cheque aparente | Confirmar liquidação e instituição; não devolver antes da confirmação final. | Pagamento para quem?, caso rotativo | Central de mensagens |
| `concept:advance-fee` | Taxa antecipada para prêmio, emprego, benefício ou liberação | Não pagar para receber; verificar a organização e o processo. | Pagamento para quem?, caso rotativo | Ele já sabia meus dados |
| `concept:second-approval` | Segunda aprovação e segregação | Aprovação adicional não substitui confirmação independente e não deve ser contornada. | Pagamento para quem? | Pedido urgente de um gestor; Mudança bancária sem atalho |
| `concept:process-exception` | Exceção urgente ao processo | Pausar, documentar e escalar; processo também protege pedidos legítimos. | Pedido urgente de um gestor | Pagamento para quem? |

## Conceitos pesquisados — pretextos financeiros e pessoais

| `conceptId` | Conceito | Ensinamento defensivo | Ensino principal | Complemento ou aplicação |
|---|---|---|---|---|
| `concept:job-recruitment-scam` | Vaga e recrutamento falso | Localizar vaga e empresa por conta própria; não pagar para trabalhar nem antecipar dados bancários. | O pedido não tinha link, para dados | Pagamento para quem?, para taxa ou cheque |
| `concept:investment-pig-butchering` | Investimento, cripto e pig-butchering | Garantia, plataforma indicada e taxa para saque exigem parada e revisão independente. | Ele já sabia meus dados, para relação gradual | Pagamento para quem?, para fluxo financeiro |
| `concept:romance-financial-scam` | Romance seguido de emergência ou investimento | Buscar apoio externo e não transferir confiança da relação para pedido financeiro. | Ele já sabia meus dados | Pagamento para quem? |
| `concept:prize-sweepstakes` | Prêmio, sorteio e vantagem inesperada | Não pagar taxa nem entregar segredo para receber algo não confirmado. | Uma manhã comum, como gatilho | Pagamento para quem? |
| `concept:charity-disaster` | Caridade e desastre | Escolher organização conhecida e acessar o site por conta própria. | Ele já sabia meus dados, como empatia | Pagamento para quem? |
| `concept:government-legal-payment` | Governo, polícia, jurídico ou compliance exigindo pagamento | Encerrar contato e consultar o órgão no endereço oficial; ameaça não substitui procedimento. | O pedido não tinha link, para identidade | Pagamento para quem?, para cobrança |
| `concept:delivery-fee` | Entrega, pacote, pedágio ou taxa | Rastrear no app/site original e conferir beneficiário, mesmo com dados corretos. | Central de mensagens | O destino atrás do QR; Pagamento para quem? |

## Composição candidata 1 + até 2 + 1

| Atividade | Comportamento principal | Complementar 1 | Complementar 2 | Caso curto de transferência |
|---|---|---|---|---|
| Pagamento para quem? | confirmar obrigação, beneficiário e controles pelo processo oficial antes de pagar, liberar ou devolver | comprovante não é liquidação | segunda aprovação | cobrança legítima com intermediador que exige investigação, não rejeição automática |

Os pretextos pessoais e de função formam casos rotativos; não aparecem juntos em uma tentativa.

## Limites

- A simulação não executa Pix, boleto, contato bancário, MED, compra ou alteração cadastral.
- Procedimento financeiro final precisa ser validado por Financeiro, Jurídico, RH e Segurança.
- Um beneficiário diferente pode ser legítimo; o comportamento correto é investigar pelo processo.
- Valores, contas, documentos e organizações são fictícios ou mascarados.

## Fontes principais

- [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/business-email-compromise);
- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca);
- [Banco Central — Boleto falso](https://www.bcb.gov.br/meubc/faqs/p/vitima-pagou-um-boleto-e-caiu-em-um-golpe);
- [CERT.br — Golpes: evite fraudes](https://cartilha.cert.br/fasciculos/golpes-evite-fraudes/fasciculo-golpes-evite-fraudes.pdf).
