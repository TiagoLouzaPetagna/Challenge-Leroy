# Viabilidade de formatos — Processos, pagamentos e BEC

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Base:** portal local inspecionado em 2026-08-11; escopo desktop. Adaptação móvel permanece posterior.

Valores, beneficiários, comprovantes, faturas, QR Codes, cadastros, diretórios, contas e instituições seriam sempre fictícios e inertes. Nenhum formato executaria pagamento, consultaria banco, validaria chave, abriria QR ou acionaria MED. A classificação considera o protótipo local; backend autoritativo e procedimentos aprovados permanecem obrigatórios antes de progresso, avaliação ou recompensa em uso real. A base pedagógica e as fontes oficiais permanecem no [estudo de formatos correspondente](../estudos-de-formatos/07-processos-pagamentos-e-bec.md).

## `concept:bec` — Business Email Compromise

### Formato A — Estação de pagamento

- **Viabilidade:** Alta.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cinco etapas, fontes progressivas, referência cadastrada, segunda aprovação, resultado privado e debrief de `BankChangeChallenge`.
- **Trabalho novo:** generalizar o fluxo hoje específico a alteração bancária, criar conteúdo declarativo por processo e ampliar contrato/avaliador sem perder allowlists.
- **Dependências:** processos e alçadas sintéticos/aprovados; dados financeiros fictícios; backend autoritativo no uso real.
- **Acessibilidade:** etapa, fontes e decisão já têm base semântica; qualquer comparação deve ser linearizável e o foco precisa acompanhar a etapa.
- **Risco principal:** transformar um caso de BEC em checklist universal ou manter conteúdo embutido em componentes centrais.

### Formato B — Caso em quatro canais

- **Viabilidade:** Média.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** thread, caixa de mensagens e fontes progressivas apenas como blocos visuais.
- **Trabalho novo:** linha temporal multicanal, estado entre canais, causalidade, navegação e conteúdo versionado; eventual retomada de rascunho.
- **Dependências:** roteiro extenso, sem canais reais; backend autoritativo e, se longitudinal, persistência de rascunho.
- **Acessibilidade:** alternativa linear cronológica com canal anunciado; áudio/vídeo não pode ser necessário.
- **Risco principal:** simulação cenográfica complexa, sobrecarga cognitiva e falsa impressão de integração em tempo real.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A deriva da base mais madura do portal; B só deve surgir depois de linha temporal e conteúdo declarativo.
- **Vínculo recomendado:** família compartilhada de estação de processo/pagamento.
- **Condição para avançar:** extrair `BankChangeChallenge` para um shell declarativo antes de criar variações.

### Evidências no portal

- `features/teams/BankChangeChallenge.tsx` e `lib/content/bank-change-catalog.ts` já implementam contenção, interpretação, verificação, proteção e reporte.
- Rotas, contratos, reducer e persistência são centralizados; uma nova família completa custa mais que a interface.

## `concept:ceo-fraud` — Falso gestor e fraude de autoridade

### Formato A — Pedido urgente de um gestor

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa, evidências, decisão e razões das Missões.
- **Trabalho novo:** cenário de autoridade com alçada fictícia, confirmação por contato conhecido e caso legítimo urgente.
- **Dependências:** organograma/alçadas sintéticos ou aprovados; backend autoritativo no uso real.
- **Acessibilidade:** cargo e alçada em texto, sem depender de avatar, tom ou posição hierárquica visual.
- **Risco principal:** ensinar desconfiança de gestores ou um processo que não corresponda à organização.

### Formato B — Agenda versus alçada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** tabelas/cards, fontes progressivas e decisão do desafio bancário.
- **Trabalho novo:** agenda e matriz de alçadas fictícias, comparação com o pedido e escolha de canal independente.
- **Dependências:** conteúdo organizacional aprovado e backend autoritativo para uso real.
- **Acessibilidade:** tabelas com cabeçalhos, leitura linear e nenhuma conclusão por cor.
- **Risco principal:** confundir disponibilidade na agenda com autorização ou expor agenda real.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A entrega a decisão principal e B pode ser fonte factual da mesma Missão.
- **Vínculo recomendado:** Missão planejada “Pedido urgente de um gestor”.
- **Condição para avançar:** definir alçadas fictícias e incluir transferência para outro papel/canal.

### Evidências no portal

- `learning-catalog.ts` já lista essa Missão como planejada e o Radar possui conteúdo relacionado.
- O contrato de Missão aceita decisão/evidências/razões, mas um novo ID ainda atravessa regras, estado, rota e testes.

## `concept:vendor-compromise` — Conta de fornecedor comprometida

### Formato A — Cadastro anterior, pedido novo

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cadastro anterior, pedido recebido, contato registrado e cinco etapas de `BankChangeChallenge`.
- **Trabalho novo:** parametrizar fornecedor/caso e acrescentar uma transferência curta que não seja mudança bancária.
- **Dependências:** dados fictícios e procedimento aprovado; backend autoritativo no uso real.
- **Acessibilidade:** comparação em `dl`/tabela, fontes por botão e decisão por `fieldset` já possíveis.
- **Risco principal:** duplicar a atividade existente ou ensinar que toda divergência do cadastro é fraude.

### Formato B — Duas versões do fornecedor

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** comparação de fontes e cartões de evidência do desafio.
- **Trabalho novo:** duas narrativas paralelas, marcação de fatos comuns/divergentes e conclusão sem escolher por aparência.
- **Dependências:** versões fictícias e backend autoritativo para avaliação real.
- **Acessibilidade:** duas versões precisam ser navegáveis sequencialmente e diferenças listadas textualmente.
- **Risco principal:** sobrecarregar comparação ou sugerir que uma versão é a “verdadeira” sem verificação independente.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A já existe; B pode enriquecer a investigação sem virar outro player.
- **Vínculo recomendado:** “Mudança bancária sem atalho”.
- **Condição para avançar:** extrair o conteúdo fixo do desafio e manter confirmação por canal cadastrado.

### Evidências no portal

- `bank-change-catalog.ts` contém exatamente solicitação nova, cadastro anterior e contato conhecido.
- O resultado já separa decisão privada de contribuição coletiva resumida.

## `concept:bank-change` — Alteração de dados bancários

### Formato A — Mudança bancária sem atalho

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** player, catálogo, contrato, avaliador, reducer, persistência, seletores, rota e testes já existentes.
- **Trabalho novo:** apenas revisão de conteúdo/variações e eventual extração para catálogo reutilizável; não criar novo activityId.
- **Dependências:** dados sempre fictícios; procedimento aprovado; backend autoritativo antes do uso real.
- **Acessibilidade:** a versão atual já usa etapas, `fieldset`, progresso e foco, com preferência de movimento reduzido.
- **Risco principal:** regressão ao duplicar lógica ou apresentar o protótipo como aprovação bancária real.

### Formato B — Mesa de exceções

- **Viabilidade:** Alta.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** caixa revisável da Simulação e fontes/decisões do desafio bancário.
- **Trabalho novo:** fila de solicitações, estado inconclusivo, retorno a casos e avaliador por exceção.
- **Dependências:** múltiplos casos sintéticos e backend autoritativo no uso real.
- **Acessibilidade:** fila com estados textuais, filtros por teclado e resumo de pendências.
- **Risco principal:** diluir o processo completo em triagem rápida ou avaliar velocidade.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** já é a implementação canônica e mais completa; B é variação futura para transferência.
- **Vínculo recomendado:** atividade existente `team:bank-change`.
- **Condição para avançar:** nenhuma nova rota; primeiro refatorar conteúdo e testes se houver variações.

### Evidências no portal

- A rota `/equipes/mudanca-bancaria-sem-atalho` já está integrada ao primeiro percurso transversal.
- Os testes provam validação, idempotência, recompensa única, privacidade e coexistência do agregado.

## `concept:invoice-diversion` — Fatura ou nota adulterada

### Formato A — Mesa de conciliação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** comparação de cadastro/solicitação e fontes progressivas do desafio bancário.
- **Trabalho novo:** pedido, contrato, recebimento e cobrança sintéticos; seleção de divergências e decisão de bloqueio/confirmação.
- **Dependências:** documentos fictícios sem upload; revisão de processo; backend autoritativo no uso real.
- **Acessibilidade:** registros em tabela com cabeçalhos e diferenças anunciadas; PDF/imagem não pode ser a única fonte.
- **Risco principal:** virar conferência contábil detalhista ou sugerir que aparência do documento comprova legitimidade.

### Formato B — O PDF chega por último

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** narrativa progressiva de Missão e achados por evidência.
- **Trabalho novo:** construir contexto antes de exibir um PDF representado como cartão inerte e exigir reconciliação, não abertura real.
- **Dependências:** texto/documento sintéticos e backend autoritativo no uso real.
- **Acessibilidade:** transcrição estruturada integral do documento; nenhuma inspeção visual de PDF.
- **Risco principal:** fazer o “PDF” parecer seguro por chegar depois ou medir leitura de layout.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** conciliação ensina processo transferível; B pode ordenar a revelação dentro do mesmo caso.
- **Vínculo recomendado:** estação de processo derivada do desafio bancário.
- **Condição para avançar:** definir modelo de registros acessível e não aceitar upload.

### Evidências no portal

- `BankChangeChallenge` já compara fontes, enquanto o catálogo de Simulação contém anexo apenas como texto.
- Não há visualizador/upload nem parser de documento; todo artefato deve ser conteúdo fixo.

## `concept:payroll-diversion` — Desvio de folha ou depósito salarial

### Formato A — Balcão de RH autenticado

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** biblioteca/diretório fictício, fontes progressivas e etapas de processo.
- **Trabalho novo:** portal de RH inerte, identificação de solicitação, canal oficial e opções de contenção sem coletar dado pessoal.
- **Dependências:** política de RH aprovada, personas/dados fictícios e backend autoritativo no uso real.
- **Acessibilidade:** formulário cenográfico sem campos livres sensíveis; fluxo e estado claramente simulados.
- **Risco principal:** parecer sistema de RH real ou persistir dado bancário/pessoal.

### Formato B — Linha do tempo de alteração

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** lista cronológica da conversa e resultado causal.
- **Trabalho novo:** ordenação acessível, marcos de pedido/confirmação/corte/depósito e avaliador de sequência.
- **Dependências:** calendário e processo fictícios; backend autoritativo no uso real.
- **Acessibilidade:** botões mover acima/abaixo, posição anunciada e alternativa por campos numerados; sem arrastar obrigatório.
- **Risco principal:** medir ordenação mecânica ou universalizar prazos de folha.

### Decisão preliminar

- **Destino:** Adiar.
- **Escolha:** Combinação.
- **Justificativa:** o tema exige forte validação procedimental; A e B podem compartilhar a futura estação e componente de linha temporal.
- **Vínculo recomendado:** módulo específico de RH, separado de dados reais.
- **Condição para avançar:** procedimento aprovado, componente acessível de ordenação e garantia de dados fictícios.

### Evidências no portal

- Não há sistema de RH, diretório ou rascunho; há apenas padrões cenográficos de fonte/decisão.
- A arquitetura recomenda criar ordenação compartilhada antes de repetir mecânicas locais.

## `concept:gift-card-procurement` — Cartão-presente e compra sigilosa

### Formato A — Pedido em duas etapas

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa, pressão, fontes e decisão de Missão.
- **Trabalho novo:** fase inicial plausível e pedido financeiro posterior, com reconfirmação e reporte.
- **Dependências:** cenário sintético e política de compras aprovada; backend autoritativo no uso real.
- **Acessibilidade:** etapas em lista cronológica; sigilo e urgência descritos, não inferidos por estilo.
- **Risco principal:** ensinar que cartão-presente é sempre fraude ou expor processo de compras real.

### Formato B — Catálogo de compras permitidas

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** fontes progressivas, filtros/listas e comparação de procedimento.
- **Trabalho novo:** catálogo fictício de itens/canais, consulta e decisão de exceção segura.
- **Dependências:** política sintética/aprovada; nenhum marketplace; backend autoritativo no uso real.
- **Acessibilidade:** catálogo como lista pesquisável estática, com estado “não previsto” e rota de ajuda.
- **Risco principal:** fazer ausência no catálogo provar fraude ou catalogar processos reais sensíveis.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina escalada e autoridade com a base atual; B pode ser uma fonte, não atividade separada.
- **Vínculo recomendado:** Missão de falso gestor/BEC.
- **Condição para avançar:** incluir um pedido legítimo fora do comum e uma rota de exceção aprovada.

### Evidências no portal

- `CompromisedConversationMission` e `MfaFatigueMission` já usam conversas que mudam sob pressão.
- Fontes progressivas do desafio bancário suportam um catálogo inerte sem integração.

## `concept:beneficiary-check` — Conferência do beneficiário

### Formato A — Tela final desacelerada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** resumo, confirmação e botões de decisão existentes.
- **Trabalho novo:** tela bancária explicitamente fictícia, leitura obrigatória não cronometrada e escolha voltar/confirmar/reportar.
- **Dependências:** dados financeiros sintéticos e revisão bancária; nenhuma transação; backend autoritativo no uso real.
- **Acessibilidade:** beneficiário e valor em texto/`dl`, foco claro e sem contagem regressiva.
- **Risco principal:** parecer operação bancária real ou treinar clique em “confirmar”.

### Formato B — Quem deveria receber?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cadastro anterior, fontes e decisão do desafio bancário.
- **Trabalho novo:** referência de beneficiário esperado, destinatário apresentado e resposta proporcional quando não coincide.
- **Dependências:** registros fictícios e backend autoritativo no uso real.
- **Acessibilidade:** comparação rotulada “esperado/apresentado”, sem cor como único sinal.
- **Risco principal:** tratar divergência como prova de crime ou fazer a pessoa validar dado que não conhece.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** B ancora a checagem em referência independente e encaixa diretamente na estação existente.
- **Vínculo recomendado:** etapa final de estação de pagamento.
- **Condição para avançar:** separar confirmação pedagógica de qualquer ação bancária e oferecer “não tenho referência”.

### Evidências no portal

- O desafio bancário já contém cadastro anterior e confirmação por contato conhecido.
- Não existe nem deve existir integração com banco; a tela final seria apenas um artefato inerte.

## `concept:pix-fraud` — Pix induzido por falsa central ou mensagem

### Formato A — A central não podia esperar

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte, sequência de solicitações e decisão segura de `MfaFatigueMission`.
- **Trabalho novo:** conversa textual sobre Pix, acesso pelo app oficial narrado e opções de interromper/contatar/reportar.
- **Dependências:** roteiro e procedimentos bancários revisados; nenhum app/telefone real; backend autoritativo no uso real.
- **Acessibilidade:** conversa textual completa; voz não é necessária nem avaliável.
- **Risco principal:** simular uma central real ou prescrever um único canal bancário.

### Formato B — Motivo alegado versus operação pedida

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cartões comparativos e múltipla escolha.
- **Trabalho novo:** pares motivo/operação e classificação de incompatibilidade, seguida de ação segura.
- **Dependências:** conteúdo bancário revisado; backend autoritativo se houver avaliação real.
- **Acessibilidade:** tabela com cabeçalhos e explicação textual da incompatibilidade.
- **Risco principal:** virar regra superficial e não preparar para histórias novas.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A dá contexto emocional e B explicita a contradição; B cabe como etapa da Missão.
- **Vínculo recomendado:** Missão de falsa central.
- **Condição para avançar:** revisão brasileira especializada e aviso explícito de simulação fictícia.

### Evidências no portal

- `MfaFatigueMission` já combina falso suporte reativo e console de segurança textual.
- O portal não possui app bancário, telefonia ou backend financeiro.

## `concept:boleto-fraud` — Boleto adulterado ou falso

### Formato A — Dívida antes do documento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** biblioteca/rota segura e fontes progressivas.
- **Trabalho novo:** consulta cenográfica de obrigação/segunda via e comparação com documento sintético.
- **Dependências:** conteúdo fiscal/financeiro fictício e procedimento aprovado; backend autoritativo no uso real.
- **Acessibilidade:** dados essenciais transcritos em tabela; não exigir leitura de código de barras/imagem.
- **Risco principal:** parecer validação real de boleto ou reduzir tudo à aparência.

### Formato B — Segunda via inesperada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** mensagem, evidências e decisão da Simulação.
- **Trabalho novo:** itens legítimos, suspeitos e inconclusivos, com ação “abrir pelo portal conhecido”.
- **Dependências:** casos sintéticos e backend autoritativo no uso real.
- **Acessibilidade:** assunto, remetente, contexto e dados do documento em texto integral.
- **Risco principal:** todo boleto inesperado virar phishing no conjunto.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** recuperar a obrigação por rota conhecida é mais transferível; B fornece o caso inicial.
- **Vínculo recomendado:** estação de processo de cobrança.
- **Condição para avançar:** nenhum código real, marca real ou consulta externa; incluir cobrança legítima inesperada.

### Evidências no portal

- A Simulação já trata anexo/link como texto e permite verificar por outro canal.
- Não existe leitura de documento, código de barras ou portal financeiro.

## `concept:payment-qr` — QR de pagamento alterado

### Formato A — O destino atrás do QR

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartão de URL/QR cenográfico do PhishLab e escolha de destino.
- **Trabalho novo:** representar conteúdo decodificado já fornecido, comparar beneficiário/referência e decidir sem câmera.
- **Dependências:** payload totalmente fictício; nenhuma leitura de QR, pagamento ou URL; backend autoritativo no uso real.
- **Acessibilidade:** conteúdo equivalente em texto e botão “ver conteúdo simulado”; imagem do QR decorativa.
- **Risco principal:** ensinar inspeção visual do QR ou fazê-lo parecer escaneável/pagável.

### Formato B — Adesivo sobreposto

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cards de evidência e decisão; estilos de comparação.
- **Trabalho novo:** cena física ilustrada com hotspots opcionais e alternativa textual completa, seguida de rota segura.
- **Dependências:** produção visual revisada; nenhum uso de câmera; backend autoritativo no uso real.
- **Acessibilidade:** lista equivalente de observações; hotspots não podem pontuar percepção visual.
- **Risco principal:** medir acuidade ou ensinar que sobreposição é sempre visível.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina verificar destino sem câmera; B é explicação opcional, não teste visual.
- **Vínculo recomendado:** PhishLab de QR/destino.
- **Condição para avançar:** definir payloads fictícios e uma representação textual canônica.

### Evidências no portal

- O Radar já possui tema quishing, mas é opcional; o PhishLab não lê câmera nem artefato externo.
- A arquitetura proíbe depender de QR real e recomenda artefatos inertes.

## `concept:fake-receipt` — Comprovante falso ou transação apenas agendada

### Formato A — Comprovante versus extrato

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** comparação de registros e fontes do desafio bancário.
- **Trabalho novo:** comprovante e registro interno/bancário fictícios, estados agendado/processando/liquidado e decisão de liberação.
- **Dependências:** dados sintéticos e revisão financeira; nenhuma consulta bancária; backend autoritativo no uso real.
- **Acessibilidade:** ambos os registros transcritos e rotulados; selo/imagem não pode carregar o estado.
- **Risco principal:** ensinar que uma tela cenográfica valida liquidação real.

### Formato B — Balcão de liberação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** fila de mensagens da Simulação e decisões por item.
- **Trabalho novo:** pedidos de liberar mercadoria/serviço, fontes de confirmação e estados pendente/inconclusivo.
- **Dependências:** processos fictícios/aprovados; backend autoritativo no uso real.
- **Acessibilidade:** fila com estado textual e nenhuma pressão de velocidade.
- **Risco principal:** induzir julgamento financeiro sem fonte autorizada ou universalizar prazos.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** a comparação ensina a fonte autoritativa; B é transferência contextual no mesmo conjunto.
- **Vínculo recomendado:** estação de conciliação/liberação.
- **Condição para avançar:** definir fonte fictícia explicitamente autoritativa e estados não binários.

### Evidências no portal

- `BankChangeChallenge` já compara cadastro e solicitação; `WorkdaySimulation` já suporta fila revisável.
- Não há integração bancária e nenhum artefato visual deve ser tratado como prova externa.

## `concept:mistaken-pix-return` — Pix “por engano” e falsa devolução

### Formato A — A devolução acompanha a origem

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** sequência de ações e fontes progressivas da estação de processo.
- **Trabalho novo:** fluxo inerte de devolução pelo mecanismo oficial, bloqueio de transferência nova e contato com instituição.
- **Dependências:** revisão bancária brasileira, dados fictícios e backend autoritativo no uso real.
- **Acessibilidade:** ações como lista ordenável por botões, sem reproduzir interface bancária real.
- **Risco principal:** prescrever passos universais ou parecer que o portal executa devolução.

### Formato B — Três histórias, dois mecanismos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** triagem de casos, rádio e relatório final.
- **Trabalho novo:** histórias legítimas/suspeitas e escolha entre devolução oficial, nova transferência ou contato com banco.
- **Dependências:** conteúdo revisado e backend autoritativo no uso real.
- **Acessibilidade:** mecanismos descritos textualmente; não exigir conhecimento do app.
- **Risco principal:** reduzir um caso real complexo a gabarito sem considerar procedimento vigente.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A fixa o comportamento; B controla transferência e falso positivo dentro do mesmo player.
- **Vínculo recomendado:** estação de resposta a pagamento.
- **Condição para avançar:** validação especializada e conteúdo datado/versionado.

### Evidências no portal

- A estação bancária já organiza ações e referências, mas não possui componente genérico de ordenação.
- Não há ação real sobre Pix; toda instrução precisa apontar para instituição/canal oficial aprovado.

## `concept:med-response` — MED e contato bancário após fraude

### Formato A — Qual rota cabe aqui?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** matriz de escolhas e debrief do Radar/Missão.
- **Trabalho novo:** cenários fictícios que distinguem suspeita, pagamento realizado e disputa não coberta, sempre encaminhando ao banco.
- **Dependências:** conteúdo oficial brasileiro atualizado e revisão jurídica/bancária; backend autoritativo no uso real.
- **Acessibilidade:** tabela de cenário/rota em linguagem simples, sem sigla como pré-requisito.
- **Risco principal:** prometer elegibilidade, prazo ou recuperação financeira.

### Formato B — Primeiros passos após o pagamento

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** seleção de ações e reporte de `RecoveryMission`.
- **Trabalho novo:** incidente financeiro próprio, ordem de passos, preservação de fatos e resultado sem garantia.
- **Dependências:** procedimento bancário vigente e conteúdo fictício; backend autoritativo no uso real.
- **Acessibilidade:** ordenação por controles acessíveis ou categorias “agora/depois/não faça”.
- **Risco principal:** instrução desatualizada ou promessa implícita de resultado.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A explica limites com menor risco; B pode virar uma variante da Missão de recuperação após revisão especializada.
- **Vínculo recomendado:** debrief e estação de resposta a pagamento.
- **Condição para avançar:** fonte oficial vigente, data de revisão e linguagem sem garantia.

### Evidências no portal

- `RecoveryMission` já classifica incidente e monta ações/reporte, mas seu catálogo só cobre quatro exposições digitais.
- Incluir pagamento exige novo tipo allowlisted, regras, persistência e migração.

## `concept:safe-account-scam` — Golpe da “conta segura”

### Formato A — Cofre que não existe

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte, pressão e ações da Missão de MFA.
- **Trabalho novo:** conversa textual de falsa central, contradição entre proteção alegada e transferência e rota oficial.
- **Dependências:** revisão bancária, dados fictícios e backend autoritativo no uso real.
- **Acessibilidade:** conversa integral em texto; sem voz como requisito.
- **Risco principal:** imitar instituição real ou ensinar frases exatas em vez do modelo mental.

### Formato B — Mapa do dinheiro

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** fontes e debrief causal.
- **Trabalho novo:** fluxo acessível origem–destino–beneficiário, marcação de quem ganha controle e alternativa linear.
- **Dependências:** valores/contas fictícios; backend autoritativo no uso real.
- **Acessibilidade:** lista de etapas e relações equivalente ao diagrama.
- **Risco principal:** diagrama visual complexo ou conclusão simplista baseada só no destino.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A já encaixa e B serve como debrief explicativo, não player próprio.
- **Vínculo recomendado:** Missão de falsa central/Pix.
- **Condição para avançar:** conteúdo sem marcas reais e revisão de procedimento.

### Evidências no portal

- `MfaFatigueMission` já representa falso suporte que reage a solicitações de segurança.
- Não existe componente de grafo nem integração financeira.

## `concept:refund-overpayment` — Reembolso, pagamento excedente e crédito aparente

### Formato A — Crédito pendente, pedido imediato

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de registro e pedido, fontes e decisão da estação bancária.
- **Trabalho novo:** crédito pendente sintético, pedido de devolução e consulta a registro autoritativo fictício.
- **Dependências:** processo financeiro revisado e backend autoritativo no uso real.
- **Acessibilidade:** status e valores em tabela, sem selo/print como prova.
- **Risco principal:** equiparar pendência a fraude ou simular conta real.

### Formato B — Livro-caixa de três casos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** triagem em lote e relatório final da Simulação.
- **Trabalho novo:** três casos com estados liquidado/pendente/inexistente, ações por item e falsos positivos.
- **Dependências:** registros fictícios e backend autoritativo no uso real.
- **Acessibilidade:** tabela responsiva em desktop com resumo por caso e navegação por teclado.
- **Risco principal:** transformar estado contábil em tarefa de velocidade.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** a comparação entre casos combate regras frágeis; A pode ser o primeiro caso guiado.
- **Vínculo recomendado:** Simulação de conciliação financeira.
- **Condição para avançar:** definir fonte fictícia autoritativa e incluir legítimo/inconclusivo.

### Evidências no portal

- A Simulação já mede falso positivo; falta generalizar ações além de manter/verificar/reportar/excluir.
- O desafio bancário fornece o padrão de fontes progressivas e resultado privado.

## `concept:advance-fee` — Taxa antecipada para liberar vantagem

### Formato A — A vantagem tem uma catraca

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** decomposição de pedido, evidências e decisão de Missão/PhishLab.
- **Trabalho novo:** separar vantagem, condição, taxa e rota segura em casos sintéticos.
- **Dependências:** conteúdo revisado e backend autoritativo no uso real.
- **Acessibilidade:** partes em lista rotulada, sem depender de diagrama.
- **Risco principal:** ensinar que toda taxa antecipada é fraude sem contexto.

### Formato B — Escalada de pequenas taxas

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** conversa cronológica e progresso de etapa.
- **Trabalho novo:** sequência narrativa dentro de uma sessão, pontos de interrupção e custo acumulado; sem retomada longitudinal.
- **Dependências:** roteiro sintético e backend autoritativo no uso real.
- **Acessibilidade:** resumo cumulativo e opção de revisar etapas, sem pressão de tempo.
- **Risco principal:** manipulação emocional prolongada ou exigir memória do usuário.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A é transferível e barata; B pode ser transferência curta, não campanha longitudinal.
- **Vínculo recomendado:** Missão de vantagem inesperada.
- **Condição para avançar:** casos legítimos de cobrança e ação segura independente do diagnóstico.

### Evidências no portal

- Missões já suportam narrativa por etapas, mas não persistem rascunho entre sessões.
- Um caso linear cabe; uma campanha longa exigiria subsistema de conteúdo/retomada.

## `concept:second-approval` — Segunda aprovação e segregação

### Formato A — Duas decisões independentes

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** etapa de segunda aprovação e decisão privada do desafio bancário.
- **Trabalho novo:** parametrizar dois papéis fictícios e mostrar independência sem colaboração real.
- **Dependências:** alçadas sintéticas/aprovadas e backend autoritativo no uso real.
- **Acessibilidade:** decisões apresentadas sequencialmente com papéis claros; não depender de dois usuários.
- **Risco principal:** fazer uma única pessoa representar “independência” de modo enganoso.

### Formato B — Aprovador sem contexto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** report builder/checklist e fontes progressivas.
- **Trabalho novo:** selecionar fatos mínimos para o segundo aprovador e avaliar omissão/excesso sem texto livre.
- **Dependências:** procedimento fictício e backend autoritativo no uso real.
- **Acessibilidade:** seleção por checkboxes com resumo textual do pacote.
- **Risco principal:** expor dado desnecessário ou reduzir segunda aprovação a carimbo.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A demonstra a barreira e B ensina fornecer contexto; ambas cabem como etapas da mesma estação.
- **Vínculo recomendado:** “Mudança bancária sem atalho” e futuras estações de processo.
- **Condição para avançar:** esclarecer que a simulação individual não substitui segregação real.

### Evidências no portal

- `bank-change-catalog.ts` já inclui segunda aprovação como ação segura.
- Equipes agrega apenas resultado individual; não há fluxo real entre duas pessoas.

## `concept:process-exception` — Exceção urgente ao processo

### Formato A — Mesa de exceção

- **Viabilidade:** Alta.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** etapas, fontes e decisões do desafio bancário.
- **Trabalho novo:** fluxo genérico de exceção, justificativa fechada, aprovador alternativo, registro e retorno ao processo.
- **Dependências:** procedimento de contingência aprovado e backend autoritativo no uso real.
- **Acessibilidade:** etapas e dependências em lista, com ações indisponíveis explicadas.
- **Risco principal:** inventar exceção insegura ou ensinar que “urgência” permite contornar controle.

### Formato B — Processo degradado

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** fontes progressivas e escolhas por etapa.
- **Trabalho novo:** construtor acessível de contingência, dependências entre ações e avaliação de ordem.
- **Dependências:** políticas de continuidade aprovadas; backend autoritativo no uso real.
- **Acessibilidade:** controles mover/selecionar e lista de pré-condições; não exigir arrastar.
- **Risco principal:** mecânica complexa ou treinamento de processo local desatualizado.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A estende a estação existente e contém o escopo; B só depois de componente compartilhado de dependências.
- **Vínculo recomendado:** família de estação de processo.
- **Condição para avançar:** validar um fluxo de contingência e extrair shell/contrato do desafio bancário.

### Evidências no portal

- O portal suporta fontes liberadas e decisões sequenciais, mas não dependências montáveis.
- A arquitetura recomenda uma estação de processo compartilhada antes de múltiplas implementações.

## `concept:job-recruitment-scam` — Vaga e recrutamento falso

### Formato A — Processo seletivo em etapas

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** narrativa por etapas, conversa e fontes progressivas.
- **Trabalho novo:** jornada curta dentro da sessão, pontos de verificação, pedido de dado/taxa e consequência.
- **Dependências:** roteiro e política de recrutamento fictícios/aprovados; backend autoritativo no uso real.
- **Acessibilidade:** resumo acumulado, revisão livre e saída segura; não depender de vídeo/voz.
- **Risco principal:** exposição de candidatos reais, estereótipos ou campanha longa sem retomada.

### Formato B — Vaga no site, pessoa no diretório

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** biblioteca/diretório inerte, comparação e decisão de Missão.
- **Trabalho novo:** site e diretório fictícios, busca cenográfica e tratamento quando vaga/pessoa não são localizados.
- **Dependências:** dados inventados e procedimento aprovado; nenhuma consulta externa; backend autoritativo no uso real.
- **Acessibilidade:** listas pesquisáveis estáticas e estado de ausência anunciado.
- **Risco principal:** ausência virar prova automática ou portal cenográfico parecer oficial.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina recuperar a rota com custo/risco menores; A pode ser expansão futura curta.
- **Vínculo recomendado:** Missão de recrutamento com diretório fictício.
- **Condição para avançar:** políticas revisadas e nenhum campo para currículo ou dado pessoal.

### Evidências no portal

- Fontes progressivas e listas já existem; não há site/diretório real nem rascunho longitudinal.
- O estado local não deve coletar dados de candidato.

## `concept:investment-pig-butchering` — Investimento e fraude relacional prolongada

### Formato A — Diário do investimento aparente

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** cards e histórico apenas como aparência.
- **Trabalho novo:** narrativa longitudinal, retomada, progressão emocional, estados intermediários, conteúdo versionado e avaliação sem premiar perda simulada.
- **Dependências:** roteiro especializado, suporte/sensibilidade, backend autoritativo e rascunho seguro.
- **Acessibilidade:** resumos cumulativos, ritmo controlável e alternativa à memória; sem gráficos como única evidência.
- **Risco principal:** dano emocional, simplificação de fraude prolongada e estado frágil no navegador.

### Formato B — Auditoria da promessa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cartões comparativos, evidências e veredito inconclusivo do PhishLab.
- **Trabalho novo:** fatos/promessas/pressões sintéticos e escolha de rota independente, sem avaliar produto financeiro.
- **Dependências:** revisão financeira e conteúdo fictício; backend autoritativo no uso real.
- **Acessibilidade:** tabela de alegação/evidência/limite, sem depender de gráfico.
- **Risco principal:** virar aconselhamento de investimento ou regra de retorno “alto = golpe”.

### Decisão preliminar

- **Destino:** Adiar.
- **Escolha:** Formato B.
- **Justificativa:** B cabe como caso curto; A só depois de rascunho, conteúdo longitudinal e revisão de segurança psicológica.
- **Vínculo recomendado:** PhishLab opcional de promessa/verificação, não percurso principal imediato.
- **Condição para avançar:** revisão especializada e linguagem que não seja aconselhamento financeiro.

### Evidências no portal

- O portal não salva progresso dentro de atividade nem possui banco de episódios.
- PhishLab já comporta comparação guiada/independente com dados fixos.

## `concept:romance-financial-scam` — Romance seguido de pedido financeiro

### Formato A — Uma confiança construída

- **Viabilidade:** Baixa.
- **Esforço relativo:** EG.
- **Encaixe:** Subsistema novo.
- **Componentes e padrões reutilizáveis:** conversa e etapas apenas como blocos.
- **Trabalho novo:** narrativa longitudinal sensível, retomada, avisos, saída segura, revisão de trauma e avaliação não culpabilizante.
- **Dependências:** especialistas, roteiro cuidadoso, backend autoritativo e suporte de conteúdo.
- **Acessibilidade:** controle de ritmo, resumo, aviso de conteúdo e alternativa sem romance explícito.
- **Risco principal:** culpa, gatilho emocional, estereótipo e trivialização.

### Formato B — Conselho a outra pessoa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cenário textual, escolhas de orientação e debrief sem culpa.
- **Trabalho novo:** persona fictícia, opções de escuta, proteção financeira, reporte e apoio sem confrontação.
- **Dependências:** revisão psicossocial/jurídica e backend autoritativo no uso real.
- **Acessibilidade:** texto claro, opção de sair e ausência de mídia obrigatória.
- **Risco principal:** aconselhamento excessivo ou responsabilização da pessoa afetada.

### Decisão preliminar

- **Destino:** Adiar.
- **Escolha:** Formato B.
- **Justificativa:** B reduz exposição e ensina apoio; ainda requer revisão sensível antes de entrar no portal.
- **Vínculo recomendado:** atividade opcional de orientação, não player longitudinal.
- **Condição para avançar:** revisão especializada, aviso de conteúdo e protocolo de apoio aprovado.

### Evidências no portal

- O portal suporta escolhas de orientação, mas não possui mecanismos específicos de conteúdo sensível.
- Persistência local e ausência de retomada tornam A inadequado agora.

## `concept:prize-sweepstakes` — Prêmio, sorteio ou vantagem inesperada

### Formato A — Você participou?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** mensagem, contexto e decisão da Missão.
- **Trabalho novo:** verificar participação por rota fictícia e tratar casos legítimo/suspeito/inconclusivo.
- **Dependências:** campanhas inventadas e backend autoritativo no uso real.
- **Acessibilidade:** histórico de participação em lista textual; nenhuma imagem promocional como prova.
- **Risco principal:** “não lembro” virar gabarito de fraude.

### Formato B — Anatomia do prêmio

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cards de fatos e múltipla escolha.
- **Trabalho novo:** decompor elegibilidade, taxa, prazo, canal e ação solicitada.
- **Dependências:** casos sintéticos e backend autoritativo se pontuado.
- **Acessibilidade:** lista rotulada com leitura linear.
- **Risco principal:** memorização de sinais em vez de confirmação.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Combinação.
- **Justificativa:** A mede recuperação de contexto e B explica; não sustentam players separados.
- **Vínculo recomendado:** Missão curta de vantagem inesperada.
- **Condição para avançar:** incluir promoção legítima e resposta inconclusiva.

### Evidências no portal

- Missões já avaliam contexto e decisão; nenhum catálogo real de campanhas existe.
- O cenário deve permanecer fechado e totalmente fictício.

## `concept:charity-disaster` — Caridade, desastre e solidariedade

### Formato A — Escolha a causa, depois o canal

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** rota segura/biblioteca fictícia e decisão da Missão.
- **Trabalho novo:** escolher apoiar e depois localizar canal confiável, separando urgência da verificação.
- **Dependências:** organizações/campanhas totalmente fictícias; backend autoritativo no uso real.
- **Acessibilidade:** busca/lista estática e linguagem não coercitiva; imagens emocionais não pontuam.
- **Risco principal:** explorar desastre real ou sugerir endosso a entidade.

### Formato B — Campanha sob verificação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de campos e veredito inconclusivo do PhishLab.
- **Trabalho novo:** campanhas legítima/suspeita/inconclusiva e evidências de canal/destino.
- **Dependências:** casos inventados, revisão editorial e backend autoritativo no uso real.
- **Acessibilidade:** fatos em texto e nenhuma avaliação de logotipo/foto.
- **Risco principal:** ensinar sinais superficiais ou usar conteúdo emocional indevido.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A preserva a intenção pró-social e ensina rota segura; B pode ser transferência curta.
- **Vínculo recomendado:** Missão de rota confiável.
- **Condição para avançar:** conteúdo inteiramente fictício e revisão de sensibilidade.

### Evidências no portal

- A base já oferece navegação cenográfica por fontes e decisões proporcionais.
- Não há diretório de entidades nem deve haver integração nesta fase.

## `concept:government-legal-payment` — Governo, polícia ou jurídico exigindo pagamento

### Formato A — Protocolo não autentica o contato

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa, evidências e confirmação independente da Missão.
- **Trabalho novo:** contato fictício com número de protocolo e consulta por rota oficial cenográfica.
- **Dependências:** revisão jurídica/governamental e dados inventados; backend autoritativo no uso real.
- **Acessibilidade:** protocolo, órgão alegado e ação em texto; tom/brasão não são evidência.
- **Risco principal:** aconselhamento jurídico, imitação de órgão real ou universalização de procedimento.

### Formato B — Competência e forma de cobrança

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** matriz de comparação e debrief.
- **Trabalho novo:** fatos fictícios sobre quem poderia cobrar, por qual processo e qual rota confirmar.
- **Dependências:** conteúdo revisado e datado; backend autoritativo se avaliado.
- **Acessibilidade:** tabela com cabeçalhos e explicação de incerteza.
- **Risco principal:** conteúdo desatualizado ou apresentado como orientação legal definitiva.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina não autenticar pelo protocolo; B deve ser fonte explicativa, não prova jurídica.
- **Vínculo recomendado:** Missão de autoridade e cobrança.
- **Condição para avançar:** revisão jurídica, data de validade e aviso de cenário fictício.

### Evidências no portal

- O padrão de contato conhecido e fonte progressiva já existe no desafio bancário.
- Não há integração com governo ou jurídico; qualquer consulta precisa ser simulada.

## `concept:delivery-fee` — Entrega, pacote, pedágio ou pequena taxa

### Formato A — Rastreie sem usar a mensagem

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** recuperação de rota do PhishLab e fontes da estação de processo.
- **Trabalho novo:** pedido/rastreamento fictício, biblioteca de entregas e ação quando nada é localizado.
- **Dependências:** dados inventados; nenhuma transportadora, QR ou pagamento real; backend autoritativo no uso real.
- **Acessibilidade:** rastreio como lista estática com busca por seleção, sem código real.
- **Risco principal:** ausência provar fraude ou interface parecer serviço de entrega.

### Formato B — Pequenas taxas em lote

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** caixa mista, ações revisáveis e métrica de falsos positivos da Simulação.
- **Trabalho novo:** mensagens de entrega, pedágio, assinatura e taxa legítimas/suspeitas/inconclusivas.
- **Dependências:** casos sintéticos e backend autoritativo no uso real.
- **Acessibilidade:** itens e estados textuais, sem limite de tempo.
- **Risco principal:** associar valor pequeno a fraude ou transformar volume em teste de velocidade.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A fixa o comportamento de recuperar a rota e B demonstra transferência entre pretextos.
- **Vínculo recomendado:** pacote da Simulação “Uma manhã comum” ou sucessor.
- **Condição para avançar:** banco de casos balanceado, sem marcas/códigos reais e com opção inconclusiva.

### Evidências no portal

- `WorkdaySimulation` já mistura mensagens legítimas, suspeitas e de verificação e mede falsos positivos.
- A rota segura pode reutilizar fontes fictícias; não há integração logística ou financeira.
