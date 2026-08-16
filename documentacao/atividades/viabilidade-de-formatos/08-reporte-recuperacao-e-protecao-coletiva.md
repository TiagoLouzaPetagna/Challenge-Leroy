# Viabilidade de formatos — Reporte, recuperação e proteção coletiva

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Base:** portal local inspecionado em 2026-08-11; escopo desktop. Adaptação móvel permanece posterior.

Todos os incidentes, contas, dispositivos, sessões, permissões, pagamentos e reportes seriam sintéticos. Nenhuma atividade solicitaria senha, OTP, código, credencial, arquivo, comando, dado pessoal ou relato real; nenhum botão contataria suporte, banco ou canal corporativo. A classificação considera apenas a demonstração local. Backend autoritativo e procedimentos aprovados continuam obrigatórios antes de progresso, avaliação ou recompensa em uso real. A base pedagógica e as fontes oficiais permanecem no [estudo de formatos correspondente](../estudos-de-formatos/08-reporte-recuperacao-e-protecao-coletiva.md).

## `concept:no-blame-reporting` — Cultura de reporte sem culpa

### Formato A — O relato abre ajuda

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** resultado, debrief causal, reporte e proteção coletiva de `RecoveryMission` e da Missão de conversa comprometida.
- **Trabalho novo:** consequências comparativas de relato cedo/tarde e linguagem consistente sem culpa, sem aumentar pontuação por esconder falha.
- **Dependências:** política e tom institucional aprovados; backend autoritativo no uso real.
- **Acessibilidade:** consequências em texto claro e região de status; nenhuma emoção inferida por cor/ilustração.
- **Risco principal:** mensagem cultural contradizer a prática organizacional ou parecer promessa de ausência de consequência.

### Formato B — O que eu conto agora?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** checkboxes de detalhes de reporte e validação fechada de `RecoveryMission`.
- **Trabalho novo:** selecionar fatos mínimos em cenários de erro, dúvida e exposição, com feedback sobre utilidade e minimização.
- **Dependências:** procedimento de reporte aprovado; conteúdo fictício; backend autoritativo no uso real.
- **Acessibilidade:** `fieldset` com opções concretas e resumo textual, sem campo livre obrigatório.
- **Risco principal:** avaliar vergonha/confissão ou coletar relato real por engano.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A define a resposta institucional e B pratica o comportamento; devem atravessar as atividades de recuperação, não virar player isolado.
- **Vínculo recomendado:** abertura e resultado de todas as Missões de resposta a incidente.
- **Condição para avançar:** validar linguagem/política e manter entrada estritamente fechada e fictícia.

### Evidências no portal

- `RecoveryMission` já afirma que o canal não está configurado e não envia reporte real.
- O reducer guarda apenas IDs de opções allowlisted, não relato textual; isso deve ser preservado.

## `concept:report-preserve` — Preservação de contexto

### Formato A — Kit mínimo de fatos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** seleção de detalhes de reporte, ações de preservar/reportar e debrief da Missão de recuperação.
- **Trabalho novo:** adaptar fatos mínimos ao incidente e distinguir contexto útil de segredo desnecessário.
- **Dependências:** procedimento aprovado e cenários fictícios; backend autoritativo no uso real.
- **Acessibilidade:** categorias em checkboxes com explicações; nenhum upload, screenshot ou cópia real.
- **Risco principal:** ensinar um conjunto universal ou incentivar coleta excessiva.

### Formato B — Memória que se apaga

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** thread cronológica e debrief causal.
- **Trabalho novo:** linha temporal acessível, fatos disponíveis em momentos diferentes e decisão do que registrar sem cronômetro punitivo.
- **Dependências:** roteiro sintético e backend autoritativo; nenhuma telemetria real.
- **Acessibilidade:** lista temporal e controles de seleção; não medir memória ou velocidade.
- **Risco principal:** induzir ansiedade ou avaliar lembrança em vez de preservação.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A encaixa diretamente; B só agrega valor após existir linha temporal compartilhada e deve evitar teste de memória.
- **Vínculo recomendado:** etapa de reporte de `RecoveryMission`.
- **Condição para avançar:** definir fatos mínimos por tipo de exposição e proibir anexos/dados reais.

### Evidências no portal

- `recovery-mission-catalog.ts` já contém canal, horário, origem/destino, ação e dispositivo, além de senha/código inseguros.
- Não existe componente compartilhado de linha temporal nem persistência de rascunho.

## `concept:do-not-delete-forward` — Não apagar nem encaminhar indiscriminadamente

### Formato A — Botão oficial, grupo informal

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** ações allowlisted de `RecoveryMission`, incluindo preservar, reportar, apagar e encaminhar.
- **Trabalho novo:** explicitar canal oficial fictício versus encaminhamento informal e adaptar feedback ao procedimento.
- **Dependências:** política aprovada; nenhum envio real; backend autoritativo no uso real.
- **Acessibilidade:** ações em checkboxes/radio com consequência textual e aviso de simulação.
- **Risco principal:** universalizar “não apagar” quando o procedimento local difere ou fazer o botão parecer funcional.

### Formato B — Cadeia de custódia cotidiana

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ações categorizadas e resultado causal.
- **Trabalho novo:** ordenação acessível de preservar, registrar, reportar e evitar redistribuição, com dependências simples.
- **Dependências:** procedimento aprovado e backend autoritativo no uso real.
- **Acessibilidade:** botões mover acima/abaixo e posição anunciada; arrastar nunca obrigatório.
- **Risco principal:** linguagem jurídica excessiva ou pontuar uma única ordem onde várias são seguras.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A já mede o comportamento; B pode virar debrief/ordenação quando o componente existir.
- **Vínculo recomendado:** Missão de recuperação e procedimento oficial de reporte futuro.
- **Condição para avançar:** validar o procedimento local e distinguir preservar de reter/redistribuir.

### Evidências no portal

- O catálogo atual marca `delete-message` e `forward-colleague` como ações nocivas e `preserve-message`/`report-official` como esperadas.
- A ação é apenas registrada localmente; nenhum botão envia ou exclui conteúdo.

## `concept:opened-message-response` — Apenas abriu a mensagem

### Formato A — Até onde você chegou?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** primeiro passo de classificação de incidente de `RecoveryMission`.
- **Trabalho novo:** melhorar perguntas de exposição para não confundir abrir, clicar, fornecer dado ou executar.
- **Dependências:** revisão técnica e procedimento aprovado; backend autoritativo no uso real.
- **Acessibilidade:** opções mutuamente exclusivas em `fieldset`, com exemplos textuais.
- **Risco principal:** minimizar toda abertura ou alarmar sem evidência de exposição adicional.

### Formato B — Mesma mensagem, exposições diferentes

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** triagem em lote e relatório final da Simulação.
- **Trabalho novo:** variantes abrir/clicar/digitar/executar e ação proporcional para cada pessoa fictícia.
- **Dependências:** conteúdo sintético e backend autoritativo no uso real.
- **Acessibilidade:** cada exposição descrita explicitamente; não depender de animação de interação.
- **Risco principal:** decorar quatro rótulos sem entender causalidade.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A é a entrada canônica; B demonstra proporcionalidade e pode ser caso de transferência.
- **Vínculo recomendado:** Missão “Cliquei. E agora?”.
- **Condição para avançar:** definir uma taxonomia simples e aceitar incerteza sobre o que ocorreu.

### Evidências no portal

- `RecoveryIncidentType` já inclui `opened-message`, `clicked-link`, `entered-credentials` e `approved-mfa`.
- Expandir conteúdo sem mudar a taxonomia é M; criar novos tipos atravessa tipos, regras, persistência e testes.

## `concept:clicked-link-response` — Clicou sem fornecer dado nem instalar algo

### Formato A — Cliquei. E agora?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** atividade homônima completa, ações de parar/preservar/reportar e resultado adaptativo.
- **Trabalho novo:** revisão de conteúdo e possível transferência curta; não criar novo activityId.
- **Dependências:** procedimento aprovado, cenário fictício e backend autoritativo no uso real.
- **Acessibilidade:** checkboxes e rádios já semânticos; convém padronizar foco e movimento reduzido.
- **Risco principal:** duplicação ou instrução genérica demais para procedimentos locais.

### Formato B — Página fechada, relato aberto

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** seleção de detalhes de reporte e resumo final.
- **Trabalho novo:** construtor fechado de relato com URL/destino sintético, horário e ação, sem campo livre.
- **Dependências:** modelo de reporte aprovado; backend autoritativo no uso real.
- **Acessibilidade:** formulário agrupado e resumo revisável; nenhuma cópia de histórico real.
- **Risco principal:** fazer fechar a página parecer contenção suficiente ou coletar URL real.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** a atividade existente é a base; B deve ser sua etapa de reporte aprimorada.
- **Vínculo recomendado:** `mission:clicked-now-what`.
- **Condição para avançar:** parametrizar o reporte e manter todos os valores allowlisted/fictícios.

### Evidências no portal

- A rota `/missoes/cliquei-e-agora` já integra currículo, estado e testes de quatro incidentes.
- O canal real permanece explicitamente não configurado, como deve continuar no protótipo.

## `concept:credential-response` — Informou usuário ou senha

### Formato A — Rota oficial de recuperação

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** incidente `entered-credentials`, ações de trocar senha por rota conhecida, revisar sessões e reportar.
- **Trabalho novo:** reforçar ordem/procedimento e distinguir conta corporativa fictícia de outros usos.
- **Dependências:** procedimento de identidade aprovado; nenhuma credencial real; backend autoritativo no uso real.
- **Acessibilidade:** ações fechadas e instruções textuais; nenhum campo de senha.
- **Risco principal:** prescrever recuperação incompleta ou induzir o usuário a inserir credencial.

### Formato B — Onde mais esta chave cabia na história?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** checkboxes e debrief causal.
- **Trabalho novo:** persona inteiramente fictícia, inventário fechado de reutilização possível e escolha de canais oficiais de recuperação.
- **Dependências:** dados fictícios e revisão de segurança; backend autoritativo no uso real.
- **Acessibilidade:** nenhuma senha é mostrada/digitada; selecionar apenas categorias de conta fictícia.
- **Risco principal:** normalizar reutilização ou coletar informação sobre contas reais.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A é ação imediata; B amplia o alcance usando exclusivamente persona fechada.
- **Vínculo recomendado:** variante de credencial da Missão de recuperação.
- **Condição para avançar:** garantia de nenhuma entrada livre e procedimento de identidade aprovado.

### Evidências no portal

- O catálogo atual já inclui `change-password-known-route` e `review-sessions` como ações esperadas.
- A persistência valida IDs fechados; não deve ser ampliada para texto de credencial.

## `concept:otp-mfa-response` — Compartilhou OTP ou aprovou MFA

### Formato A — Você iniciou este acesso?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** Missão homônima de MFA, falso suporte, negação, encerramento de sessões e reporte.
- **Trabalho novo:** acrescentar explicitamente o caso de código compartilhado e rota de recuperação, se o contrato genérico comportar.
- **Dependências:** procedimento de identidade aprovado; nenhum código real; backend autoritativo no uso real.
- **Acessibilidade:** sequência e conversa em texto; nenhuma notificação real ou áudio.
- **Risco principal:** duplicar atividade ou ensinar que negar uma solicitação resolve toda exposição.

### Formato B — Senha, código e sessão

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** matriz de escolhas e debrief causal.
- **Trabalho novo:** relacionar três tipos de exposição às ações correspondentes, permitindo múltiplas ações.
- **Dependências:** revisão técnica e backend autoritativo no uso real.
- **Acessibilidade:** tabela com cabeçalhos e resumo por exposição; sem depender de diagrama.
- **Risco principal:** apresentar ações como independentes quando o incidente pode combinar exposições.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A já é forte e B cabe como debrief/transferência dentro da recuperação.
- **Vínculo recomendado:** Missão de MFA seguida de `RecoveryMission`.
- **Condição para avançar:** alinhar ações pós-aprovação com procedimento corporativo e não solicitar código.

### Evidências no portal

- `MfaFatigueMission` está jogável e depende dos dois PhishLabs; `RecoveryMission` já cobre `approved-mfa`.
- Os testes validam pré-requisitos, resultado e persistência dessas atividades.

## `concept:oauth-response` — Concedeu permissão OAuth

### Formato A — Acesso que ficou depois da senha

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** matriz causal, escolhas múltiplas e debrief da recuperação.
- **Trabalho novo:** explicar senha versus consentimento/permissão e escolher revogar/reportar/revisar sessão por rota oficial.
- **Dependências:** revisão de identidade, procedimentos aprovados e backend autoritativo no uso real.
- **Acessibilidade:** permissões em texto simples, sem exigir leitura de tela real de provedor.
- **Risco principal:** ensinar que trocar senha sempre remove consentimento ou exigir diagnóstico técnico do funcionário.

### Formato B — Inventário de permissões

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** listas selecionáveis, filtros e cards do portal.
- **Trabalho novo:** central de permissões inteiramente inerte, origem/escopo/data, seleção de itens a escalar e estado inconclusivo.
- **Dependências:** inventário fictício; nenhuma integração com provedor; backend autoritativo no uso real.
- **Acessibilidade:** tabela/lista com escopo completo e controles de seleção; nenhum ícone como única indicação.
- **Risco principal:** interface parecer central real ou incentivar revogação sem procedimento.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina o limite com menor risco; B só depois de componente reutilizável e procedimento validado.
- **Vínculo recomendado:** extensão da Missão de recuperação, não integração de identidade.
- **Condição para avançar:** novo tipo de incidente allowlisted e revisão técnica/procedimental.

### Evidências no portal

- O catálogo de recuperação não inclui OAuth; seria necessário ampliar tipos, regras, reducer, persistência e testes.
- Não há sessão, consentimento ou diretório integrado.

## `concept:device-link-response` — Vinculou dispositivo ou método de acesso

### Formato A — De qual dispositivo veio este código?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** console textual e sequência de solicitações de `MfaFatigueMission`.
- **Trabalho novo:** fatos sobre tentativa de vínculo, confirmação “você iniciou?” e ações de negar/reportar/revisar.
- **Dependências:** conteúdo fictício, procedimento de identidade e backend autoritativo no uso real.
- **Acessibilidade:** cada solicitação com dispositivo/canal em texto; sem push real.
- **Risco principal:** tratar origem exibida como prova ou imitar notificações reais.

### Formato B — Vínculo legítimo, dispositivo errado

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** listas, comparação e decisão da recuperação.
- **Trabalho novo:** inventário inerte de dispositivos/métodos, estados esperado/desconhecido e rota de escalonamento.
- **Dependências:** dispositivos fictícios; nenhuma consulta à conta; backend autoritativo no uso real.
- **Acessibilidade:** lista com nome, data e origem textual; nenhuma miniatura como prova.
- **Risco principal:** parecer painel real ou sugerir remover dispositivo sem orientação.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A reutiliza a Missão existente e mede a decisão; B é valioso depois como artefato cenográfico.
- **Vínculo recomendado:** Missão de MFA/acesso inesperado.
- **Condição para avançar:** definir ações aprovadas e criar tipo de exposição sem qualquer dado real.

### Evidências no portal

- Há console fictício de MFA, mas não inventário compartilhado de dispositivos.
- A persistência atual só aceita os incidentes allowlisted; novo vínculo exige migração/validação.

## `concept:file-execution-response` — Abriu ou executou arquivo

### Formato A — O arquivo parou onde?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** classificação inicial de incidente e ações proporcionais da recuperação.
- **Trabalho novo:** distinguir recebeu/baixou/abriu/executou/permitiu, sem arquivo real, e selecionar resposta.
- **Dependências:** revisão técnica e procedimento de suporte; backend autoritativo no uso real.
- **Acessibilidade:** etapas descritas por texto/rádio; nenhuma animação ou arquivo necessário.
- **Risco principal:** usuário não saber o estágio exato e ser penalizado por incerteza.

### Formato B — Cartões de contenção

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** checkboxes de ações, categorias e debrief.
- **Trabalho novo:** ações “agora/depois/não faça” adaptadas a execução, inclusive parar e seguir orientação oficial.
- **Dependências:** procedimento aprovado; nenhum comando/isolamento real; backend autoritativo no uso real.
- **Acessibilidade:** categorização por select/radio/checkbox, sem arrastar.
- **Risco principal:** prescrever desligamento/desconexão universal ou fazer a pessoa improvisar contenção técnica.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A determina exposição e B monta resposta; juntas formam variante clara da Missão de recuperação.
- **Vínculo recomendado:** novo incidente fictício em `RecoveryMission`.
- **Condição para avançar:** procedimento técnico aprovado e respostas que aceitem “não sei se executou”.

### Evidências no portal

- O catálogo já planeja “Documento inesperado”, mas a recuperação não possui tipo de arquivo.
- Não há upload, sandbox de arquivo ou controle de dispositivo; toda execução deve ser narrada.

## `concept:command-response` — Colou ou executou comando

### Formato A — A instrução saiu do navegador

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** narrativa, evidências e decisão de Missão.
- **Trabalho novo:** mostrar a quebra de contexto navegador→terminal apenas em texto e interromper/reportar sem repetir comando.
- **Dependências:** revisão técnica, comandos fictícios não executáveis e backend autoritativo no uso real.
- **Acessibilidade:** comando substituído por marcador seguro/categoria; ninguém precisa copiar ou digitar.
- **Risco principal:** reproduzir comando perigoso ou transformar atividade em tutorial operacional.

### Formato B — Plano depois do comando

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** montador de ações de `RecoveryMission`.
- **Trabalho novo:** ações proporcionais, preservação do fato de execução, contato oficial e instruções a evitar.
- **Dependências:** playbook aprovado; nenhum terminal; backend autoritativo no uso real.
- **Acessibilidade:** seleção fechada por categorias e resumo; não exibir sintaxe real.
- **Risco principal:** oferecer contenção técnica universal ou incentivar nova execução.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** B mede a resposta segura; A deve ser apenas briefing que sinaliza mudança de superfície.
- **Vínculo recomendado:** variante avançada da Missão de recuperação.
- **Condição para avançar:** revisão de segurança e substituição de qualquer comando por conteúdo inerte não reutilizável.

### Evidências no portal

- Não existe terminal nem executor, o que é uma proteção a preservar.
- O contrato de recuperação pode inspirar a mecânica, mas novo incidente exige tipos/regras/persistência/testes.

## `concept:remote-access-response` — Concedeu acesso remoto

### Formato A — Quem ainda controla a tela?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** conversa de falso suporte, escolhas e debrief causal.
- **Trabalho novo:** cenário textual de instalação/controle narrado, interrupção e busca de suporte por rota conhecida.
- **Dependências:** procedimento técnico aprovado; nenhuma ferramenta remota real; backend autoritativo no uso real.
- **Acessibilidade:** transcrição e estados textuais; sem vídeo/voz obrigatórios.
- **Risco principal:** instrução técnica inadequada ou imitação realista demais de ferramenta.

### Formato B — Superfícies afetadas

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cards, seleção múltipla e debrief.
- **Trabalho novo:** mapa/lista de dispositivo, sessão, arquivo e conta potencialmente expostos, com ações por prioridade.
- **Dependências:** conteúdo fictício e revisão técnica; backend autoritativo no uso real.
- **Acessibilidade:** representação linear completa; grafo apenas complementar.
- **Risco principal:** exigir diagnóstico que cabe à equipe técnica ou aumentar culpa.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina interromper e pedir ajuda; B funciona melhor como debrief, não como diagnóstico do funcionário.
- **Vínculo recomendado:** Missão de falso suporte/recuperação.
- **Condição para avançar:** playbook aprovado e linguagem que não peça investigação técnica autônoma.

### Evidências no portal

- A Missão de MFA já possui falso suporte textual, mas não há ferramenta remota, mídia ou controle de dispositivo.
- O padrão seguro é cenário inerte e ações allowlisted.

## `concept:data-disclosure-response` — Enviou dado pessoal ou corporativo

### Formato A — Categoria, não segredo

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** detalhes de reporte seguros/nocivos e checkboxes da recuperação.
- **Trabalho novo:** categorias de dado fictício, impacto/processo por categoria e minimização do relato.
- **Dependências:** classificação aprovada por privacidade/segurança; backend autoritativo no uso real.
- **Acessibilidade:** nenhuma entrada livre; selecionar apenas categorias e ações.
- **Risco principal:** coletar segredo real ou apresentar classificação interna desatualizada.

### Formato B — Quem precisa saber?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** escolhas múltiplas, fontes e debrief.
- **Trabalho novo:** roteamento fictício por tipo de dado e seleção mínima de áreas, sem enviar nada.
- **Dependências:** matriz de escalonamento aprovada e backend autoritativo no uso real.
- **Acessibilidade:** lista de áreas com finalidade textual; organograma visual opcional.
- **Risco principal:** ensinar canal incorreto ou disseminar o dado em nome do reporte.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A evita recolher o segredo e B ensina encaminhamento mínimo; formam uma única etapa de reporte.
- **Vínculo recomendado:** construtor de reporte da Missão de recuperação.
- **Condição para avançar:** política de classificação/roteamento aprovada e input estritamente fechado.

### Evidências no portal

- `RecoveryMission` já marca senha/código como detalhes nocivos no reporte.
- A persistência de IDs fechados oferece boa base; texto livre violaria a fronteira atual de privacidade.

## `concept:payment-response` — Realizou pagamento

### Formato A — Primeira hora sem relógio

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** ações de recuperação e etapa de processo bancário.
- **Trabalho novo:** ordenação acessível sem cronômetro, fatos mínimos, contato com instituição e reporte interno, sem promessa de resultado.
- **Dependências:** procedimentos por meio de pagamento revisados; dados fictícios; backend autoritativo no uso real.
- **Acessibilidade:** categorias “agora/depois/não faça” e nenhuma avaliação de velocidade.
- **Risco principal:** “primeira hora” virar SLA universal ou promessa de reversão.

### Formato B — Meio de pagamento, rota de resposta

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** matriz de casos, escolhas e debrief de recuperação.
- **Trabalho novo:** meios fictícios e rotas procedimentais, com opção “contatar instituição pelo canal oficial”.
- **Dependências:** revisão financeira/jurídica e versionamento; backend autoritativo no uso real.
- **Acessibilidade:** tabela linearizável e termos explicados.
- **Risco principal:** conteúdo desatualizado ou aconselhamento financeiro definitivo.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** B ensina proporcionalidade com a base atual; A pode ser etapa posterior quando houver ordenação compartilhada.
- **Vínculo recomendado:** extensão financeira de `RecoveryMission`.
- **Condição para avançar:** revisão datada por meio de pagamento e linguagem sem garantias.

### Evidências no portal

- A Missão atual não cobre pagamento; `BankChangeChallenge` cobre prevenção, não resposta após transação.
- Um novo incidente financeiro atravessa catálogo, tipos, avaliador, reducer, persistência e testes.

## `concept:account-recovery` — Recuperação de conta e sessão

### Formato A — Matriz de persistência

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** tabela de escolhas, ações da recuperação e debrief causal.
- **Trabalho novo:** relacionar senha, sessão, MFA, OAuth e dispositivo às ações, aceitando combinações.
- **Dependências:** revisão de identidade e playbook aprovado; backend autoritativo no uso real.
- **Acessibilidade:** tabela com cabeçalhos/descrição e resumo por exposição.
- **Risco principal:** simplificar recuperação técnica ou ensinar que uma ação remove todas as persistências.

### Formato B — Central de recuperação inerte

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** listas, filtros, progresso e fontes do portal.
- **Trabalho novo:** painel fictício de sessões, consentimentos e métodos; escolhas de escalonamento sem efetuar alteração.
- **Dependências:** inventário sintético, nenhuma integração, backend autoritativo no uso real.
- **Acessibilidade:** listas completas e botões declarados “simulação”; nenhum estado só visual.
- **Risco principal:** parecer sistema real ou incentivar ações autônomas fora do playbook.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A explica causalidade com menor custo; B pode ser caso independente depois.
- **Vínculo recomendado:** debrief compartilhado das Missões de credencial/MFA/OAuth.
- **Condição para avançar:** matriz tecnicamente revisada e respostas que apontem para rota oficial.

### Evidências no portal

- O catálogo atual já inclui troca por rota conhecida e revisão de sessões.
- Não há integração com identidade, consentimento ou dispositivo; central só poderia ser inerte.

## `concept:report-without-secrets` — Reporte sem senha, OTP ou código

### Formato A — Redator com minimização

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** checkboxes de detalhes seguros/nocivos e resumo de `RecoveryMission`.
- **Trabalho novo:** modelo de relato por blocos fechados e feedback específico sobre necessidade/minimização.
- **Dependências:** formulário/procedimento aprovado; dados fictícios; backend autoritativo no uso real.
- **Acessibilidade:** seleção e ordenação por controles, sem texto livre; resumo anunciado.
- **Risco principal:** transformar modelo em formulário real ou permitir que segredo apareça em texto.

### Formato B — Tarja conceitual

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** cartões selecionáveis e comparação antes/depois.
- **Trabalho novo:** selecionar trechos categorizados de relato fictício para remover/substituir, com alternativa textual à tarja visual.
- **Dependências:** relatos sintéticos e revisão de privacidade; backend autoritativo no uso real.
- **Acessibilidade:** cada trecho é botão/checkbox nomeado; cor da tarja não carrega a decisão.
- **Risco principal:** virar reconhecimento visual ou ensinar a “mascarar” segredo em vez de não o enviar.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** A se integra diretamente e evita entrada livre; B pode ser transferência curta.
- **Vínculo recomendado:** etapa final de qualquer Missão de recuperação.
- **Condição para avançar:** conteúdo fechado e teste que prove ausência de segredo no estado persistido.

### Evidências no portal

- O contrato atual inclui `unsafe-password` e `unsafe-code` como detalhes nocivos, exatamente a fronteira necessária.
- Persistência/quarentena já valida IDs; a solução deve manter essa allowlist.

## `concept:uncertain-reporting` — Reportar mesmo em dúvida

### Formato A — Inconclusivo é uma conclusão

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** veredito `inconclusive` do PhishLab, ação `verify` da Simulação e reporte das Missões.
- **Trabalho novo:** conectar explicitamente incerteza a verificação/reporte proporcional e não penalizá-la quando sustentada.
- **Dependências:** procedimento aprovado e backend autoritativo no uso real.
- **Acessibilidade:** opção explícita em rádio, com explicação do próximo passo.
- **Risco principal:** fazer “inconclusivo” virar resposta sempre segura ou sinônimo de reportar tudo.

### Formato B — Falso positivo útil

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** métrica de falsos positivos e relatório final de `WorkdaySimulation`.
- **Trabalho novo:** casos em que o reporte cauteloso é defensável, feedback sobre qualidade dos fatos e resultado não punitivo.
- **Dependências:** critérios institucionais e backend autoritativo no uso real.
- **Acessibilidade:** feedback textual; não usar pontuação isolada para constranger.
- **Risco principal:** confundir reporte útil com classificação correta ou incentivar volume sem contexto.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A estabelece a opção e B demonstra consequência; devem ser regra transversal de avaliação.
- **Vínculo recomendado:** PhishLab, Simulação e Missões, sem player próprio.
- **Condição para avançar:** política clara sobre quando verificar, reportar ou ambos e rubrica proporcional.

### Evidências no portal

- PhishLab já permite inconclusivo e Simulação já distingue verificação de reporte e mede falsos positivos.
- Ajustar rubrica exige cuidado nos avaliadores determinísticos para não premiar resposta-coringa.

## `concept:extortion-response` — Extorsão, sextorsão ou chantagem

### Formato A — Plano de apoio, não negociação

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** montador de ações da recuperação e guia de reporte.
- **Trabalho novo:** aviso de conteúdo, saída segura, ações de preservar/procurar apoio/reportar e bloqueio de negociação improvisada.
- **Dependências:** revisão jurídica, psicossocial e de segurança; canais de apoio aprovados; backend autoritativo no uso real.
- **Acessibilidade:** linguagem não gráfica, controle de ritmo e opção de sair sem perda.
- **Risco principal:** gatilho, aconselhamento indevido ou promessa de resposta institucional.

### Formato B — Conselho a um colega

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** cenário textual, escolhas de orientação e debrief sem culpa.
- **Trabalho novo:** respostas empáticas, proteção imediata e encaminhamento, sem pedir detalhes íntimos.
- **Dependências:** revisão especializada e procedimento aprovado; backend autoritativo no uso real.
- **Acessibilidade:** texto simples, aviso e saída; nenhuma mídia obrigatória.
- **Risco principal:** culpa, coleta de conteúdo sensível ou recomendação universal.

### Decisão preliminar

- **Destino:** Adiar.
- **Escolha:** Formato B.
- **Justificativa:** B reduz exposição, mas o tema ainda requer governança e suporte além da mecânica atual.
- **Vínculo recomendado:** atividade opcional de orientação, não fluxo obrigatório.
- **Condição para avançar:** revisão especializada, canais aprovados, aviso de conteúdo e política de saída.

### Evidências no portal

- O portal não possui padrão específico de conteúdo sensível ou pausa/saída preservada.
- A entrada fechada evita coleta, mas não substitui governança institucional.

## `concept:collective-protection` — Reporte como proteção coletiva

### Formato A — Um relato, várias barreiras

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** debrief da conversa comprometida e agregados privados de Equipes.
- **Trabalho novo:** consequência causal fictícia: bloqueio de artefato, alerta, busca e proteção de colegas, sem alegar execução real.
- **Dependências:** procedimento e linguagem institucional aprovados; backend autoritativo no uso real.
- **Acessibilidade:** sequência em lista com relações textuais; diagrama opcional.
- **Risco principal:** prometer que todo relato aciona todas as barreiras ou expor quem reportou.

### Formato B — O mesmo golpe chegou a outra pessoa

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** caixa de mensagens, ação de reporte e relatório final da Simulação.
- **Trabalho novo:** dois destinatários fictícios, comparação do efeito de um reporte precoce e ação do segundo caso.
- **Dependências:** roteiro sintético e backend autoritativo no uso real.
- **Acessibilidade:** casos em ordem textual e consequência anunciada; não depender de animação.
- **Risco principal:** transformar atividade em competição ou expor comportamento individual em equipe.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A é debrief transversal e B fornece transferência; nenhum precisa de player próprio.
- **Vínculo recomendado:** resultados de Missões/Simulações e visão agregada privada.
- **Condição para avançar:** separar claramente consequência simulada de ação real e manter agregados sem identidade.

### Evidências no portal

- `CompromisedConversationMission` já diz que reportar ajuda outras pessoas.
- Equipes já prova contribuição agregada sem dados privados; não há eventos reais de proteção.

## `concept:incident-causality` — Linha temporal e tipo de exposição

### Formato A — Linha do Incidente

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** etapas, listas cronológicas e debrief causal existentes.
- **Trabalho novo:** componente acessível de ordenar/relacionar evento, exposição e resposta; contrato próprio, avaliador com ordens equivalentes e testes de teclado/leitor.
- **Dependências:** cenários fictícios, procedimento aprovado e backend autoritativo no uso real.
- **Acessibilidade:** mover acima/abaixo, posição anunciada, alternativa numerada e nenhuma dependência de arrastar.
- **Risco principal:** pontuar ordem única, medir habilidade motora ou confundir cronologia com causalidade.

### Formato B — Árvore de resposta por exposição

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** classificação de incidente, checkboxes de ações e debrief de `RecoveryMission`.
- **Trabalho novo:** decisões condicionais em lista/árvore textual, exposições combinadas e ramo “não sei”.
- **Dependências:** taxonomia/procedimentos revisados e backend autoritativo no uso real.
- **Acessibilidade:** árvore visual duplicada por perguntas sequenciais e resumo do caminho.
- **Risco principal:** árvore rígida simplificar incidentes ou fazer o funcionário diagnosticar além do necessário.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** B é implementável primeiro; A é um componente compartilhado valioso para transferência e debrief, não deve ser arrastar.
- **Vínculo recomendado:** evolução de `RecoveryMission` e futura estação “Linha do Incidente”.
- **Condição para avançar:** protótipo acessível de ordenação, rubrica com sequências equivalentes e taxonomia validada.

### Evidências no portal

- O hub do PhishLab já mostra “Linha do Incidente” como conteúdo futuro, sem player ou contrato.
- A arquitetura não possui ordenação acessível/linha temporal; criar uma implementação compartilhada é preferível a soluções locais.
