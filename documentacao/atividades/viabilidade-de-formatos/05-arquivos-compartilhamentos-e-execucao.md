# Viabilidade de formatos — Arquivos, compartilhamentos e execução

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Base:** portal local inspecionado em 2026-08-11; escopo desktop. Adaptação móvel permanece posterior.

Todo arquivo, convite, compartilhamento, alerta, atualização, comando e instalador abaixo seria representação sintética e inerte. Nenhum formato autoriza upload, download, descompactação, macro, área de transferência executável, terminal, instalação, extensão, RDP ou ferramenta remota real. A classificação considera o estado local demonstrativo; backend autoritativo permanece obrigatório antes de progresso, avaliação ou recompensa em uso real. A base pedagógica e as fontes oficiais estão no [estudo do conjunto](../estudos-de-formatos/05-arquivos-compartilhamentos-e-execucao.md).

## `concept:unexpected-attachment` — Anexo inesperado

### Formato A — Estação de contexto

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** caixa de entrada, remetente/link/contexto e quatro ações de `WorkdaySimulation`.
- **Trabalho novo:** ampliar casos esperado, inesperado e inconclusivo e incluir confirmação por canal independente.
- **Dependências:** conteúdo e procedimento corporativo de anexos; backend autoritativo do pacote real.
- **Acessibilidade:** nome/tipo/contexto em texto e controles nativos; nenhum arquivo é aberto.
- **Risco principal:** “inesperado = malicioso”, excesso de reporte ou confiança porque remetente é conhecido.

### Formato B — Caixa de exceções

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** triagem em lote da Simulação e fila de casos de Equipes.
- **Trabalho novo:** fila explícita de inconclusivos, retorno aos casos e justificativa do próximo passo.
- **Dependências:** corpus balanceado e backend autoritativo.
- **Acessibilidade:** estados resolvido/investigar anunciados; navegação por lista, sem arrastar.
- **Risco principal:** transformar “investigar” em estacionamento sem ação ou penalizar cautela proporcional.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** é reuso direto e já aparece como caso na simulação; B é uma melhoria transversal da triagem, não requisito deste conceito.
- **Vínculo recomendado:** pacote de caixa de entrada e futura Missão Documento inesperado.
- **Condição para avançar:** catálogo de anexos com legítimos difíceis e procedimento de confirmação/reporte aprovado.

### Evidências no portal

- `simulation-catalog.ts` já contém `NF_047_corrigida.xlsm`, contexto e ação esperada; o artefato é apenas texto.

## `concept:file-format-variety` — Variedade de formatos de arquivo

### Formato A — Famílias de comportamento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartões, seleção múltipla e debrief.
- **Trabalho novo:** classificar formatos por capacidade/risco contextual sem criar lista fixa de “seguros” e “perigosos”.
- **Dependências:** revisão técnica contínua e backend autoritativo se avaliado.
- **Acessibilidade:** nome completo, extensão e comportamento em texto; ícone não é necessário.
- **Risco principal:** taxonomia envelhecida ou veredito baseado só na extensão.

### Formato B — Mesmo pedido, outro contêiner

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** vários casos da Simulação com ação/evidência comum.
- **Trabalho novo:** repetir a mesma solicitação em documento, arquivo compactado, link de nuvem e convite, cobrando processo consistente.
- **Dependências:** conteúdo versionado e backend do player hospedeiro.
- **Acessibilidade:** cada contêiner descrito em texto; a decisão não depende de reconhecer ícone.
- **Risco principal:** ensinar que contêiner não importa de modo absoluto ou ocultar diferenças relevantes de exposição.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** demonstra transferência sem uma aula enciclopédica de formatos; A pode ser debrief resumido.
- **Vínculo recomendado:** banco de casos da atividade Documento inesperado.
- **Condição para avançar:** matriz editorial de comportamento/estágio, revista por segurança, sem classificação absoluta.

### Evidências no portal

- A Simulação já abstrai artefato como rótulo/valor e pode variar conteúdo; novo tipo persistido só seria necessário se a família fosse avaliada separadamente.

## `concept:hidden-double-extension` — Extensão escondida ou dupla extensão

### Formato A — Inspetor de propriedades

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ferramentas reveláveis do PhishLab, cartões e conclusão.
- **Trabalho novo:** representação de nome exibido/nome completo/tipo declarado, inspeção assistida e casos com extensões legítimas compostas.
- **Dependências:** revisão por sistema operacional, conteúdo sintético e backend autoritativo; nenhum arquivo real.
- **Acessibilidade:** propriedades em lista textual, sem depender de truncamento visual.
- **Risco principal:** ensinar regra “dois pontos = malware” ou simular um explorador diferente do ambiente real.

### Formato B — Montador de apresentação enganosa

- **Viabilidade:** Não recomendada neste formato.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** seletores/blocos; não há montador de nomes.
- **Trabalho novo:** composição controlada de nome, ícone e extensão, avaliador e salvaguardas contra geração livre.
- **Dependências:** revisão de segurança e backend autoritativo.
- **Acessibilidade:** seletores nomeados e resultado soletrado.
- **Risco principal:** ensinar a construir disfarces, focar em percepção e produzir combinações reutilizáveis fora do contexto.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina inspeção com controle; B adiciona risco ofensivo e não é necessário ao comportamento.
- **Vínculo recomendado:** estação de propriedades dentro do PhishLab de arquivos.
- **Condição para avançar:** especificar sistema operacional alvo, casos legítimos e componente que nunca aceite arquivo/nome livre.

### Evidências no portal

- Não há upload, File API, explorador ou tipos de propriedades; o padrão de ferramentas do PhishLab é a base mais próxima.

## `concept:icon-masquerade` — Ícone ou nome incompatível

### Formato A — Balança de evidências

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de evidência, cartões e veredito inconclusivo do PhishLab.
- **Trabalho novo:** comparar ícone, nome completo, tipo, origem e contexto e atribuir peso/limite.
- **Dependências:** conteúdo visual acessível e backend autoritativo.
- **Acessibilidade:** ícone sempre acompanhado por nome/descrição; nota não depende de enxergá-lo.
- **Risco principal:** ensinar “ícone incompatível = malicioso” ou que ícone coerente autentica o arquivo.

### Formato B — Conferência de entrega

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** estação bancária de comparação entre esperado/recebido e fontes progressivas.
- **Trabalho novo:** pedido de arquivo, registro anterior e artefato recebido, com confirmação independente.
- **Dependências:** procedimento corporativo e backend autoritativo; artefato inerte.
- **Acessibilidade:** tabela esperado/recebido e ações por rádio.
- **Risco principal:** confiar no acordo anterior sem confirmar mudança ou rejeitar variações legítimas.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A calibra a pista visual e B ancora a decisão no processo; cabem no mesmo caso.
- **Vínculo recomendado:** Missão Documento inesperado/estação de propriedades.
- **Condição para avançar:** produzir equivalente textual e incluir ícone coerente malicioso e incoerente legítimo.

### Evidências no portal

- O portal já compara evidências e fontes, mas não possui biblioteca de ícones de arquivos nem validação visual automatizada.

## `concept:rtlo-file-name` — Unicode RTL no nome do arquivo

### Formato A — Revelação assistida de direção

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ferramenta revelável e debrief do PhishLab.
- **Trabalho novo:** visualização segura de marcas bidi, ordem lógica/visual e testes de isolamento Unicode em UI, logs e persistência.
- **Dependências:** revisão Unicode especializada e backend autoritativo.
- **Acessibilidade:** nome lógico soletrado e marcas descritas; visual RTL não é requisito.
- **Risco principal:** falhas de bidi no próprio portal, estigmatizar escrita RTL ou exigir decodificação humana.

### Formato B — Caso sem decodificação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** contexto, fonte e decisão das Missões/Simulação.
- **Trabalho novo:** arquivo de apresentação ambígua e rota de confirmar/rejeitar/reportar sem nomear a técnica.
- **Dependências:** strings sintéticas seguras, revisão inclusiva e backend autoritativo.
- **Acessibilidade:** resolvível por origem/contexto; a técnica é revelada só no debrief textual.
- **Risco principal:** virar pegadinha visual ou apresentar qualquer texto RTL como suspeito.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** mede o comportamento sem impor inspeção Unicode; A é explicação assistida opcional.
- **Vínculo recomendado:** caso avançado na atividade de arquivos disfarçados.
- **Condição para avançar:** testes bidi/leitor de tela e revisão por falantes/especialistas antes de qualquer string de caso.

### Evidências no portal

- Não há utilitários/testes bidi; o padrão de decisão contextual evita introduzir essa dependência no avaliador principal.

## `concept:password-archive` — Arquivo compactado com senha

### Formato A — Conferência de acordo prévio

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de fontes, contexto e decisão.
- **Trabalho novo:** acordo anterior, canal da senha, arquivo recebido e escolha de confirmar/reportar.
- **Dependências:** política corporativa de compartilhamento e backend autoritativo; nenhuma senha/extração real.
- **Acessibilidade:** evidências em texto e senha representada apenas como “fornecida/não fornecida”.
- **Risco principal:** “arquivo com senha = malicioso” ou ensinar troca de senha por canal inseguro.

### Formato B — Dois arquivos, dois contextos

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** pacote de casos da Simulação.
- **Trabalho novo:** dois anexos protegidos com contexto legítimo e suspeito e decisões independentes.
- **Dependências:** conteúdo/procedimento e backend do player.
- **Acessibilidade:** casos textuais, sem abrir compactado.
- **Risco principal:** diferença contextual óbvia demais ou conclusão de que criptografia sempre esconde malware.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** controla falso positivo e cabe como casos da mesma caixa; A fornece as evidências dentro de cada caso.
- **Vínculo recomendado:** Simulação/Documento inesperado.
- **Condição para avançar:** procedimento de compartilhamento validado e nenhum campo para senha real.

### Evidências no portal

- A Simulação já diferencia legítimo, phishing e verificar; o arquivo é texto e não exige capacidade de compactação.

## `concept:cloud-share` — Documento compartilhado em nuvem

### Formato A — Mapa de responsabilidades

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** fontes progressivas, comparação e painel de responsabilidades.
- **Trabalho novo:** separar identidade do remetente, serviço, proprietário e destino de autenticação.
- **Dependências:** modelo de compartilhamento corporativo e backend autoritativo; nenhuma nuvem real.
- **Acessibilidade:** relações em tabela/lista, não grafo obrigatório.
- **Risco principal:** complexidade de papéis ou concluir que serviço conhecido autentica o compartilhador.

### Formato B — Abrir pela área oficial

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** recuperar rota, diretório fictício e decisão de Missão.
- **Trabalho novo:** compartilhamento recebido, navegação simulada à área oficial e ausência/presença do item.
- **Dependências:** procedimento corporativo e backend autoritativo; nenhum acesso real.
- **Acessibilidade:** árvore de botões, resultados textuais e estado vazio explícito.
- **Risco principal:** ausência do item virar prova automática ou rota simulada parecer integração funcional.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A explica as identidades e B mede o comportamento; devem estar no mesmo caso.
- **Vínculo recomendado:** atividade de compartilhamentos/credenciais.
- **Condição para avançar:** modelo aprovado do serviço corporativo e rótulo permanente de simulação.

### Evidências no portal

- O portal já possui estados vazios, fontes e rotas fictícias, mas não tem integração com nuvem ou mapa genérico de identidades.

## `concept:calendar-invite` — Convite de calendário ou arquivo ICS

### Formato A — Agenda sob revisão

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** mensagem, cartão, evidências e decisão da Simulação.
- **Trabalho novo:** convite estático com organizador, participantes, link, anexo, recorrência e ações aceitar/verificar/reportar.
- **Dependências:** conteúdo e procedimento de calendário; backend autoritativo; nenhum ICS importado.
- **Acessibilidade:** dados em lista de definição e ações nativas; layout de calendário não é obrigatório.
- **Risco principal:** “convite inesperado = phishing” ou aceitar porque o evento aparece no calendário.

### Formato B — Persistência entre canais

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** sequência multicanal e timeline.
- **Trabalho novo:** e-mail → calendário → lembrete com estado compartilhado e remoção/reportar simulados.
- **Dependências:** roteiro, comportamento da plataforma e backend autoritativo.
- **Acessibilidade:** sequência cronológica completa; canal indicado em texto.
- **Risco principal:** parecer tempo real ou prometer remoção efetiva do evento.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** cobre o artefato específico com esforço controlado; B pode ser transferência quando existir engine multicanal.
- **Vínculo recomendado:** pacote de caixa de entrada/mensagens.
- **Condição para avançar:** catálogo de convites legítimos/suspeitos e revisão do produto de calendário alvo.

### Evidências no portal

- Mensagens e cartões existem; não há calendário, ICS ou estado multicanal compartilhado.

## `concept:macro-enable-content` — Macro e “habilitar conteúdo”

### Formato A — Faixa de segurança inerte

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** alerta, cartão de documento, evidências e decisão.
- **Trabalho novo:** faixa claramente simulada, origem do documento, opção de fechar/verificar/reportar; botão “habilitar” sem efeito e preferencialmente não acionável.
- **Dependências:** revisão conforme suíte usada e backend autoritativo.
- **Acessibilidade:** aviso semanticamente anunciado e todo conteúdo em texto.
- **Risco principal:** reproduzir localização do controle perigoso ou sugerir que clicar é parte do exercício.

### Formato B — Processo legítimo versus atalho

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de fontes/processo do desafio bancário.
- **Trabalho novo:** dois pedidos, um fluxo aprovado sem macro e um atalho que exige habilitação, com decisão.
- **Dependências:** política de documentos/macros e backend autoritativo.
- **Acessibilidade:** comparação tabular e escolhas por rádio.
- **Risco principal:** regra universal sobre macros sem considerar ambientes administrados, ou “processo conhecido = arquivo seguro”.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A mostra a fronteira e B evita depender do visual da faixa; um único caso sustenta ambos.
- **Vínculo recomendado:** Missão Documento inesperado.
- **Condição para avançar:** procedimento corporativo de macros e design inerte que não ensine contorno.

### Evidências no portal

- O caso de fatura já menciona `.xlsm` e “habilitar conteúdo”, mas não há documento ou faixa simulada.

## `concept:disable-protection` — Pedido para desativar proteção

### Formato A — Conversa de suporte ramificada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** falso suporte MFA, thread e decisões.
- **Trabalho novo:** ramificações pré-escritas após recusa/aceite, saída por canal oficial e feedback causal.
- **Dependências:** roteiro, política de suporte e backend autoritativo; nenhuma configuração é aberta.
- **Acessibilidade:** diálogo textual, escolhas e foco previsível.
- **Risco principal:** frases operacionalizáveis demais, pressão indevida ou aceitação acidental de ação perigosa.

### Formato B — Fonte da autorização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** fontes progressivas e decisão do desafio bancário.
- **Trabalho novo:** alegação versus chamado/política/contato registrado e escolha de interromper/verificar/reportar.
- **Dependências:** procedimento corporativo autorizado e backend autoritativo.
- **Acessibilidade:** tabela de fontes e ações nativas.
- **Risco principal:** tratar chamado como prova absoluta ou ensinar que o usuário deve avaliar exceção técnica sozinho.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** mede confirmação por fonte independente com menos risco; A pode ser cenário de transferência depois.
- **Vínculo recomendado:** Missão de falso suporte/ferramenta remota.
- **Condição para avançar:** política de suporte publicada e nenhuma instrução concreta de desativação.

### Evidências no portal

- O falso suporte e fontes progressivas já existem; não há engine de conversa ramificada nem integração com proteção do dispositivo.

## `concept:document-as-bridge` — Documento usado como ponte para link ou QR

### Formato A — Trilha de confiança

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartões de artefato, fontes e futura linha/mapa de relações.
- **Trabalho novo:** nós mensagem → documento → link/QR → página, seleção do ponto de quebra e alternativa linear.
- **Dependências:** conteúdo multiartefato e backend autoritativo; tudo inerte.
- **Acessibilidade:** lista ordenada equivalente e relações nomeadas.
- **Risco principal:** interface de grafo inacessível ou sugerir que a confiança se transfere entre camadas.

### Formato B — Documento incompleto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** Missão, evidências e rota independente.
- **Trabalho novo:** documento estático que manda continuar fora, ausência de dados esperados e decisão de confirmar/reportar.
- **Dependências:** conteúdo/procedimento e backend autoritativo; nenhum link/QR acionável.
- **Acessibilidade:** documento convertido em estrutura textual e destino descrito.
- **Risco principal:** “documento com link = fraude” ou usar incompletude como prova.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** ensina a quebra de contexto com encaixe direto; A pode aparecer no debrief quando houver componente de trilha compartilhado.
- **Vínculo recomendado:** Missão Documento inesperado/quishing.
- **Condição para avançar:** política de artefatos inertes e casos legítimos de documento com link.

### Evidências no portal

- Não há grafo ou visualizador de documento; a Missão já suporta cadeia narrativa e decisão sem executá-la.

## `concept:html-smuggling` — HTML smuggling

### Formato A — Raio X causal

- **Viabilidade:** Não recomendada neste formato.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** debrief e sequência; não há sandbox/navegador de conteúdo.
- **Trabalho novo:** visualização pré-renderizada de página → construção local → download, sem código ativo, e explicação de limite.
- **Dependências:** revisão técnica especializada e backend autoritativo; nenhum HTML executável.
- **Acessibilidade:** sequência causal em texto, sem animação obrigatória.
- **Risco principal:** detalhar técnica ofensiva, simular download ou pedir detecção de fenômeno invisível.

### Formato B — Mesmo sintoma, causas diferentes

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** pacote de casos, evidências e resposta da recuperação.
- **Trabalho novo:** download inesperado com várias causas possíveis e avaliação apenas de parar/verificar/reportar.
- **Dependências:** revisão de segurança e backend autoritativo.
- **Acessibilidade:** eventos e ações em texto; nada é baixado.
- **Risco principal:** diagnosticar smuggling pelo sintoma ou apresentar “download espontâneo” como comprometimento certo.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Nenhum como player próprio.
- **Justificativa:** o mecanismo não é detectável pelo usuário; B preserva o comportamento como caso, e A deve ser debrief técnico opcional.
- **Vínculo recomendado:** caso de download inesperado em recuperação/Simulação.
- **Condição para avançar:** linguagem não diagnóstica e revisão para não incluir código ou sequência operacionalizável.

### Evidências no portal

- Não há execução de HTML de atividade, download ou sandbox; o padrão de resposta a evento cabe sem afirmar a causa.

## `concept:clickfix` — ClickFix ou falso CAPTCHA

### Formato A — Verificação que cruza a fronteira

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** página/CAPTCHA inerte, evidências e decisão de Missão.
- **Trabalho novo:** marcar a transição página → copiar → abrir sistema → executar e escolher onde interromper.
- **Dependências:** conteúdo seguro e backend autoritativo; nenhum texto copiável/terminal real.
- **Acessibilidade:** etapas enumeradas e seleção por rádio, sem gesto de copiar.
- **Risco principal:** reproduzir comando, caminho do sistema ou botão que faça cópia real.

### Formato B — Autópsia de instruções

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** evidências, múltipla escolha e debrief causal.
- **Trabalho novo:** decompor instrução sanitizada em prova alegada, ação fora do navegador, privilégio e impacto.
- **Dependências:** revisão de segurança e backend autoritativo.
- **Acessibilidade:** instrução não operacional em texto e partes selecionáveis por lista.
- **Risco principal:** conteúdo ainda ser executável ou transformar palavras específicas em assinatura fixa.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A ensina a fronteira comportamental e B explica a manipulação; ambos cabem sem simular execução.
- **Vínculo recomendado:** Missão de falso CAPTCHA/ClickFix conectada a recuperação.
- **Condição para avançar:** revisão de segurança que remova comandos reais e teste de que nada entra na área de transferência.

### Evidências no portal

- As Missões já suportam sequência, evidências e consequência; não há clipboard ou terminal, o que deve permanecer como salvaguarda.

## `concept:copied-command` — Comando copiado e execução orientada

### Formato A — Clipboard selado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartão de artefato, status e debrief.
- **Trabalho novo:** representação não selecionável de “conteúdo oculto/diferente”, botão cenográfico e explicação da área de transferência sem gravá-la.
- **Dependências:** revisão de segurança e backend autoritativo.
- **Acessibilidade:** descrição do conteúdo e efeito; não exige copiar.
- **Risco principal:** qualquer uso acidental de Clipboard API ou inclusão de comando executável.

### Formato B — Fonte da instrução

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte, fontes progressivas e decisão.
- **Trabalho novo:** pedido sanitizado para executar ação no sistema, confirmação por chamado/política e recusa/reportar.
- **Dependências:** procedimento corporativo e backend do player; nenhuma instrução concreta.
- **Acessibilidade:** conversa e fontes textuais.
- **Risco principal:** ensinar frases/passo a passo ofensivos ou sugerir que chamado basta para autorizar comando.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** ensina a origem/autorização com risco mínimo; A pode ser explicação curta dentro de ClickFix, não player próprio.
- **Vínculo recomendado:** atividade ClickFix/falso suporte.
- **Condição para avançar:** conteúdo sanitizado sem comandos, caminhos de sistema ou cópia funcional.

### Evidências no portal

- Não há Clipboard API, terminal ou campos de comando; o falso suporte e fontes já fornecem a mecânica segura.

## `concept:fake-update` — Atualização falsa

### Formato A — Duas origens de atualização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartões comparativos, rota oficial e decisão.
- **Trabalho novo:** aviso em página versus atualização no canal aprovado, com origem e consequência.
- **Dependências:** política corporativa de atualização e backend autoritativo; nenhum instalador.
- **Acessibilidade:** origem e canal em texto, não por estilo de janela.
- **Risco principal:** “atualização na web = fraude” ou interface falsa confundida com sistema real.

### Formato B — Manutenção planejada ou isca

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** fontes progressivas, calendário/mensagem e estação de processo.
- **Trabalho novo:** comparar comunicado, catálogo e pedido urgente, decidindo verificar ou seguir fluxo aprovado.
- **Dependências:** calendário/procedimento corporativo e backend autoritativo.
- **Acessibilidade:** tabela e linha temporal textual.
- **Risco principal:** comunicado conhecido virar prova ou desestimular atualização legítima.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A diferencia origens e B inclui contexto/controle de falso positivo; formam um único caso de software.
- **Vínculo recomendado:** simulação de busca/download/instalação segura.
- **Condição para avançar:** política real de atualização e artefatos estritamente sem download.

### Evidências no portal

- Fontes e rotas simuladas são reutilizáveis; não há sistema de atualização ou catálogo integrado.

## `concept:scareware` — Alerta falso, antivírus falso e tela cheia

### Formato A — Alerta sob controle

- **Viabilidade:** Não recomendada neste formato.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** modal/backdrop do onboarding, alerta e decisão.
- **Trabalho novo:** tela cenográfica sem aprisionar navegação, saída por controle do player, foco seguro e preferência de movimento reduzido.
- **Dependências:** design/acessibilidade, revisão de segurança e backend autoritativo.
- **Acessibilidade:** sem som, piscar, contagem ou bloqueio; alerta descrito e fechamento sempre disponível.
- **Risco principal:** causar ansiedade, confundir-se com incidente real, criar dark pattern ou impedir saída.

### Formato B — Roteiro de callback

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte, recuperação e fonte oficial.
- **Trabalho novo:** alerta que oferece telefone/chat e escolhas de fechar, procurar canal oficial e reportar.
- **Dependências:** procedimento corporativo e backend autoritativo; contato é obviamente fictício e não acionável.
- **Acessibilidade:** narrativa estática e opções textuais, sem estímulos intensos.
- **Risco principal:** número/link acionável ou simplificação “todo alerta é falso”.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** preserva a manipulação e a resposta sem reproduzir uma tela agressiva; A só justificaria uma prova de conceito acessível.
- **Vínculo recomendado:** Missão de falso suporte/recuperação.
- **Condição para avançar:** revisão de segurança/acessibilidade e proibição de áudio, timer, tela cheia ou contato funcional.

### Evidências no portal

- Modais acessíveis com `inert`/foco existem no onboarding, mas não há testes E2E de escape/foco nem razão para imitar scareware fielmente.

## `concept:remote-tool-artifact` — Instalador remoto, extensão ou arquivo RDP

### Formato A — Validador de chamado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte, fontes progressivas e estação de processo.
- **Trabalho novo:** pedido de ferramenta, chamado, contato registrado, escopo/duração e decisão.
- **Dependências:** procedimento de suporte remoto e backend autoritativo; nenhum instalador/extensão/RDP real.
- **Acessibilidade:** fontes e metadados em tabela, escolhas por rádio.
- **Risco principal:** chamado como prova suficiente ou ensinar nomes/extensões específicos como únicos sinais.

### Formato B — Manifesto de acesso

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** lista de permissões OAuth, cartões e decisão.
- **Trabalho novo:** comparar necessidade, privilégio, duração, responsável e revogação de um acesso remoto.
- **Dependências:** política corporativa, revisão de suporte e backend autoritativo.
- **Acessibilidade:** manifesto em lista de definição e diferenças textuais.
- **Risco principal:** colocar aprovação técnica no usuário final ou representar processo inexistente.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A verifica origem e B torna o impacto compreensível; podem ser etapas do mesmo caso.
- **Vínculo recomendado:** Missão de falso suporte/dispositivo, ligada a permissões.
- **Condição para avançar:** política oficial de acesso remoto e conteúdo sem pacote, endereço ou passo executável.

### Evidências no portal

- A estação bancária fornece o padrão de autorização independente; não há help desk, catálogo de ferramentas ou execução externa.

## `concept:file-view-download-open-execute` — Visualizar, baixar, abrir e executar

### Formato A — Linha de exposição

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** stepper, timeline e incidentes graduais da recuperação.
- **Trabalho novo:** estágios distintos, marcação do último evento ocorrido e consequências sem afirmar comprometimento automático.
- **Dependências:** revisão técnica/procedimental e backend autoritativo; nenhum arquivo.
- **Acessibilidade:** linha temporal em lista ordenada e seleção por rádio.
- **Risco principal:** escala linear simplificar demais diferentes formatos/controles ou gerar culpa.

### Formato B — Montador de resposta por estágio

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** quatro incidentes, ações e reporte da `RecoveryMission`.
- **Trabalho novo:** adicionar download/abertura/execução como cenários quando o procedimento os distinguir.
- **Dependências:** playbook corporativo e backend autoritativo.
- **Acessibilidade:** ações por categorias e texto, sem ordenar por arrasto.
- **Risco principal:** prescrever resposta única fora do contexto ou prometer ação técnica.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A constrói o modelo mental e B o aplica; o player de recuperação já cobre grande parte da mecânica.
- **Vínculo recomendado:** expansão da Missão Cliquei. E agora?.
- **Condição para avançar:** playbook aprovado e definição dos estágios que alteram de fato a resposta.

### Evidências no portal

- A recuperação atual diferencia abriu mensagem, clicou, informou credenciais e aprovou MFA; o mesmo catálogo pode inspirar, mas novos tipos mudariam contrato/persistência.

## `concept:antivirus-silence` — Ausência de alerta do antivírus

### Formato A — Balança sem veredito automático

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de evidência e decisão inconclusiva do PhishLab.
- **Trabalho novo:** casos “sem alerta” com contexto seguro, suspeito e desconhecido e classificação do limite.
- **Dependências:** revisão de endpoint/segurança e backend hospedeiro.
- **Acessibilidade:** estado do antivírus em texto, sem ícone.
- **Risco principal:** “sem alerta = seguro” ou a correção oposta “sem alerta = ameaça”.

### Formato B — Detecção tardia

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** timeline de incidente e recuperação.
- **Trabalho novo:** evento posterior de detecção, ações já tomadas e atualização do plano/reportar.
- **Dependências:** roteiro e procedimento de IR; backend autoritativo.
- **Acessibilidade:** linha do tempo textual.
- **Risco principal:** sugerir que toda detecção tardia prova falha do usuário ou que esperar pelo alerta é aceitável.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** é um limite de evidência simples; B funciona como transferência na recuperação, sem atividade própria.
- **Vínculo recomendado:** debrief de arquivos e linha do incidente.
- **Condição para avançar:** revisão de endpoint e exemplos que preservem resposta proporcional.

### Evidências no portal

- O PhishLab já usa evidências úteis/enganosas; não há telemetria ou integração com antivírus.

## `concept:polyglot-magic-type` — Arquivo poliglota ou tipo interno divergente

### Formato A — Camadas que o usuário não vê

- **Viabilidade:** Não recomendada neste formato.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** debrief e cartões; não há inspetor binário.
- **Trabalho novo:** visualização conceitual pré-renderizada de nome, tipo declarado, assinatura e interpretação, sem bytes/arquivo real.
- **Dependências:** revisão técnica especializada e backend autoritativo se avaliado.
- **Acessibilidade:** explicação linear completa, sem hex ou identificação visual.
- **Risco principal:** atribuir inspeção técnica ao usuário ou detalhar construção/diagnóstico ofensivo.

### Formato B — Limite da inspeção humana

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** decisão inconclusiva, confirmação por processo e debrief.
- **Trabalho novo:** caso em que nome/ícone/extensão parecem coerentes, mas a resposta depende de origem/contexto/canal oficial.
- **Dependências:** conteúdo revisado e backend do player hospedeiro.
- **Acessibilidade:** resolvível inteiramente por texto/processo.
- **Risco principal:** mensagem fatalista “não dá para saber nada” ou confiança exclusiva em controles técnicos.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Nenhum como player próprio.
- **Justificativa:** a divergência interna não é observável nem responsabilidade humana; B deve fechar a atividade de arquivos como limite técnico.
- **Vínculo recomendado:** debrief da estação de propriedades/Documento inesperado.
- **Condição para avançar:** apenas revisão técnica da explicação, sem arquivo, bytes, detector ou recompensa própria.

### Evidências no portal

- Não há upload, leitura de bytes, sandbox ou antivírus; os padrões de contexto e decisão já sustentam a lição de limite.
