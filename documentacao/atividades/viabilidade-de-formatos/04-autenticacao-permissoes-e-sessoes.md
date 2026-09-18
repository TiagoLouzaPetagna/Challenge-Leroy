# Viabilidade de formatos — Autenticação, permissões e sessões

> **Estado:** análise técnica preliminar; não aprovado para implementação.
> **Base:** portal local inspecionado em 2026-08-11; escopo desktop. Adaptação móvel permanece posterior.

Toda autenticação, permissão, sessão, dispositivo e aplicativo abaixo seria uma representação sintética e inerte. O portal não receberia senha, OTP, código de recuperação, cookie, passkey nem autorização real. A classificação considera o estado local demonstrativo; backend autoritativo permanece obrigatório antes de progresso, avaliação, recompensa ou integração em uso real. A base pedagógica e as fontes oficiais estão no [estudo do conjunto](../estudos-de-formatos/04-autenticacao-permissoes-e-sessoes.md).

## `concept:credential-harvest` — Coleta de usuário e senha

### Formato A — Recomeçar pela rota conhecida

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** decisões de Missão, navegação por fonte conhecida do desafio bancário e incidentes da recuperação.
- **Trabalho novo:** página de login apenas cenográfica, opção de sair/reabrir pelo serviço conhecido e consequência por estágio de exposição.
- **Dependências:** modelo de autenticação fictício ou aprovado e backend autoritativo; nenhum campo aceita ou persiste texto secreto.
- **Acessibilidade:** formulário visual substituído por descrição/controles inertes, com origem e estado anunciados.
- **Risco principal:** induzir entrada de credencial ou afirmar que rota conhecida elimina comprometimento de site/conta.

### Formato B — Evidências copiáveis e não copiáveis

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** painel de evidências do PhishLab e escolhas múltiplas da Missão.
- **Trabalho novo:** classificar logotipo, texto, domínio, contexto e rota independente por força/limite, com casos legítimos.
- **Dependências:** conteúdo visual/textual revisado e backend autoritativo.
- **Acessibilidade:** toda evidência tem descrição textual; sem caça a defeitos gráficos.
- **Risco principal:** criar uma nova lista de “sinais infalíveis” ou chamar domínio/contexto de prova absoluta.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A mede o comportamento seguro e B calibra a evidência; cabem em uma única atividade sem autenticação real.
- **Vínculo recomendado:** Missão de página clonada/falso SSO com recuperação após exposição.
- **Condição para avançar:** componente de login estritamente inerte, revisão de conteúdo e teste que confirme ausência de captura de texto.

### Evidências no portal

- `RecoveryMission` já distingue clique, credencial informada e MFA aprovado; não há contrato de autenticação nem armazenamento adequado para qualquer segredo.

## `concept:mfa-uninitiated` — Solicitação MFA não iniciada

### Formato A — Console de eventos

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** fila de solicitações, dispositivo/local, evidências e decisão de `MfaFatigueMission`.
- **Trabalho novo:** variações de evento único, ação iniciada/não iniciada e feedback proporcional; pode ser caso do player atual.
- **Dependências:** conteúdo aderente ao MFA corporativo e backend autoritativo do player.
- **Acessibilidade:** eventos em lista com horário, dispositivo e estado; nenhuma dependência de notificação do sistema.
- **Risco principal:** tratar localização imprecisa ou dispositivo novo como prova de ataque.

### Formato B — Prompt atrasado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** linha temporal simples e escolhas da Missão MFA.
- **Trabalho novo:** associação entre ação anterior e prompt posterior, incluindo expiração e incerteza.
- **Dependências:** conteúdo revisado conforme produto de identidade e backend autoritativo.
- **Acessibilidade:** sequência textual com relação temporal explícita, sem cronômetro.
- **Risco principal:** ensinar “qualquer atraso = ataque” ou exigir memória temporal não fornecida.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** a mecânica já existe e cobre o comportamento central; B é uma boa variação para evitar regra simplista.
- **Vínculo recomendado:** mesma Missão “Você iniciou este acesso?”.
- **Condição para avançar:** catálogo de casos e revisão do fluxo MFA real antes de substituir os dados fictícios.

### Evidências no portal

- A experiência MFA implementada apresenta três solicitações, falso suporte, três ferramentas e decisão; seu contrato genérico já registra evidências/motivos.

## `concept:mfa-fatigue` — MFA fatigue ou push bombing

### Formato A — Fila de pressão controlada

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** `MfaFatigueMission` já implementa a fila, urgência, falso suporte, decisão e debrief.
- **Trabalho novo:** ampliar variedade e separar repetição de dispositivo/localização; não há nova mecânica necessária.
- **Dependências:** conteúdo/procedimento corporativo e backend autoritativo antes do uso real.
- **Acessibilidade:** lista estática, sem notificações intrusivas, vibração, áudio ou pressão temporal real.
- **Risco principal:** reproduzir assédio, usar timer ou sugerir que fechar avisos encerra a tentativa.

### Formato B — Reconstrução da campanha

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** thread da conversa comprometida, eventos MFA e painel de evidências.
- **Trabalho novo:** ordenar/associar tentativas, mensagem e decisão; alternativa acessível sem arrastar.
- **Dependências:** narrativa e backend autoritativo se o ordenamento for avaliado.
- **Acessibilidade:** ordem por lista/seletores; nenhuma interação rápida obrigatória.
- **Risco principal:** reconstrução forense excessiva ou inferir que todos os eventos vieram da mesma origem.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** já está funcional e pedagogicamente alinhado; B serve como revisão/transferência, não substituição.
- **Vínculo recomendado:** Missão MFA atual e futura linha do incidente.
- **Condição para avançar:** backend autoritativo e catálogo versionado de variações antes do uso real.

### Evidências no portal

- `MfaFatigueMission.tsx` e sua cobertura de reducer/contratos confirmam reuso direto; testes atuais ainda precisam de validação real de teclado e foco.

## `concept:mfa-context` — Número, localização e dispositivo do prompt

### Formato A — Calibrador de evidências

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** evidências e razões da Missão MFA, com resposta múltipla.
- **Trabalho novo:** casos em que localização/dispositivo/número ajudam, contradizem ou são inconclusivos.
- **Dependências:** comportamento do produto de identidade e backend autoritativo.
- **Acessibilidade:** todos os dados em texto; mapa ou cor são dispensáveis.
- **Risco principal:** pontuar geolocalização aproximada como prova ou sobrecarregar detalhes técnicos.

### Formato B — Associação a uma ação

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** lista de eventos e fonte progressiva.
- **Trabalho novo:** parear prompt com ação que o usuário iniciou, incluindo mais de uma ação plausível e opção “não corresponde”.
- **Dependências:** catálogo de fluxos fictícios e backend autoritativo.
- **Acessibilidade:** associação por menus/radios, não por linhas arrastadas.
- **Risco principal:** transformar coincidência de horário/número em autenticação suficiente.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** associa o segundo fator ao princípio “só aprove o que iniciou” e evita memorizar sinais isolados.
- **Vínculo recomendado:** caso independente dentro da Missão MFA.
- **Condição para avançar:** definir dados mínimos do prompt e casos de atraso/ambiguidade com revisão do provedor de identidade.

### Evidências no portal

- O console atual já mostra dispositivo e cidade, mas a resposta persistida não associa um prompt a uma ação iniciada.

## `concept:otp-theft` — Roubo de OTP

### Formato A — De qual fluxo veio o código?

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** eventos MFA, cartões de mensagem e escolhas por rádio.
- **Trabalho novo:** códigos mascarados/fictícios, origem declarada e associação ao fluxo sem permitir copiar segredo utilizável.
- **Dependências:** fluxo de identidade revisado e backend autoritativo.
- **Acessibilidade:** código é rótulo sintético, com origem e finalidade em texto.
- **Risco principal:** expor padrão real de OTP ou ensinar que reconhecer o serviço torna seguro compartilhar o código.

### Formato B — Conversa de retransmissão

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte da Missão MFA, thread de conversa e decisões.
- **Trabalho novo:** conversa reativa apenas por ramificações pré-escritas, recusa, canal oficial e debrief de retransmissão.
- **Dependências:** roteiro de qualidade, procedimento corporativo e backend autoritativo.
- **Acessibilidade:** diálogo textual e escolhas; sem áudio, timer ou entrada livre.
- **Risco principal:** apresentar frases reais reutilizáveis, permitir código em campo ou tornar a recusa dependente de uma palavra exata.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** contextualiza por que o código não deve ser entregue e reutiliza a conversa existente; A pode ser ferramenta explicativa.
- **Vínculo recomendado:** extensão da Missão MFA/falso suporte.
- **Condição para avançar:** roteiro sem segredos reais, caminhos acessíveis e princípio corporativo confirmado.

### Evidências no portal

- A Missão atual já diz que suporte não solicita código, porém não possui ramificação de conversa nem tipo específico para segredo.

## `concept:recovery-code-theft` — Roubo de código de recuperação

### Formato A — Cofre de segredos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** seleção múltipla da recuperação, cartões e debrief.
- **Trabalho novo:** classificar senha, OTP, código de recuperação e informação não secreta, sempre com valores fictícios/mascarados.
- **Dependências:** política de identidade e backend autoritativo.
- **Acessibilidade:** rótulos textuais e categorias; não há revelação de valor.
- **Risco principal:** reduzir segurança a taxonomia ou sugerir local de armazenamento sem política aprovada.

### Formato B — Recuperação da recuperação

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** `RecoveryMission`, fontes progressivas e revisão de sessões.
- **Trabalho novo:** incidente específico, inventário de fatores, contenção escalonada e contrato que registre ordem/ações apropriadas.
- **Dependências:** procedimento real de recuperação, equipe de identidade e backend autoritativo.
- **Acessibilidade:** passos em lista e seleção por categoria; nenhum segredo é solicitado.
- **Risco principal:** prescrever recuperação genérica incorreta ou prometer ação que o portal não executa.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato A.
- **Justificativa:** A ensina o limite de compartilhamento com escopo controlado; B só deve avançar dentro da atividade de recuperação quando houver procedimento aprovado.
- **Vínculo recomendado:** módulo de segredos no PhishLab/MFA e caso posterior em recuperação.
- **Condição para avançar:** política de identidade publicada e proibição técnica de campos livres/segredos.

### Evidências no portal

- `RecoveryMission` já contém “senha ou código” como detalhe inseguro no reporte, mas não modela métodos de recuperação nem ordem específica.

## `concept:aitm` — Adversary-in-the-middle

### Formato A — Página funcional, rota errada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** página clonada inerte, analisador de domínio, fluxo de falso SSO e decisão.
- **Trabalho novo:** demonstrar que uma página pode responder corretamente sem autenticar a origem e terminar em reabertura por rota conhecida.
- **Dependências:** revisão técnica, artefato sintético e backend autoritativo; sem proxy/login/cookie real.
- **Acessibilidade:** funcionalidade é narrada/representada, não depende de formulário real.
- **Risco principal:** afirmar que o usuário consegue reconhecer AiTM pela página ou expor fluxo operacional detalhado demais.

### Formato B — Autópsia da sessão

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** linha do incidente, fontes progressivas e recuperação.
- **Trabalho novo:** causalidade credencial → MFA → sessão, mapa de exposição e ações posteriores sem mostrar cookie/segredo.
- **Dependências:** revisão de identidade/IR e backend autoritativo.
- **Acessibilidade:** lista causal equivalente ao mapa e relações explicitadas.
- **Risco principal:** transformar hipótese técnica em diagnóstico certo ou sobrecarregar o funcionário com sessão/cookie.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Combinação.
- **Justificativa:** A ensina o comportamento observável e B explica por que MFA bem-sucedido não encerra a resposta, sem simular ataque real.
- **Vínculo recomendado:** página clonada/falso SSO seguida de recuperação de sessão.
- **Condição para avançar:** revisão especializada e escopo explícito de que a atividade não diagnostica AiTM.

### Evidências no portal

- Não existe autenticação ou sessão real; a combinação de PhishLab, Missão MFA e Recuperação fornece os padrões sem precisar reproduzir o mecanismo.

## `concept:session-cookie` — Roubo ou reutilização de sessão

### Formato A — Mapa de portas ainda abertas

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** fontes progressivas, timeline e cartões de resultado.
- **Trabalho novo:** inventário visual de sessões/aplicativos, estados ativa/revogada/desconhecida e resposta por exposição.
- **Dependências:** modelo de sessão fictício, revisão de identidade e backend autoritativo; nenhum cookie real.
- **Acessibilidade:** tabela/lista completa além do mapa.
- **Risco principal:** apresentar o cookie como objeto que o usuário deve encontrar ou inferir sessão indevida por metadado isolado.

### Formato B — Resposta por exposição

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** incidentes e ações da `RecoveryMission`.
- **Trabalho novo:** diferenciar senha informada, MFA aprovado e sessão suspeita e escolher revisão/revogação/reportar.
- **Dependências:** procedimento de resposta e backend autoritativo; controles são inertes.
- **Acessibilidade:** seleção de ações por cenário e texto causal.
- **Risco principal:** prometer que trocar senha sempre revoga sessões ou que o usuário deve agir sem coordenação.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** mede a resposta relevante e cabe na recuperação; A deve ser reutilizado com revisão/revogação de sessão, não virar player separado.
- **Vínculo recomendado:** Missão de recuperação e central de segurança simulada.
- **Condição para avançar:** procedimento de sessão por serviço e limites claros das ações disponíveis ao funcionário.

### Evidências no portal

- A recuperação já inclui revisar sessões, mas o portal não representa sessão individual nem persistência de rascunho durante atividade.

## `concept:oauth-consent` — OAuth consent phishing

### Formato A — Mesa de consentimento

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** cartões, `fieldset`, fontes e debrief.
- **Trabalho novo:** tela de consentimento sintética com aplicativo, editor, escopos, finalidade, decisão e saída segura.
- **Dependências:** revisão de identidade/aplicativos, política corporativa e backend autoritativo; nenhum consentimento real.
- **Acessibilidade:** lista de permissões e finalidade, foco linear e botões sem integração.
- **Risco principal:** copiar tela real demais, ensinar “editor verificado = seguro” ou simplificar escopos.

### Formato B — Aplicativo no fluxo de trabalho

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** Missão contextual, diretório/fonte progressiva e decisão.
- **Trabalho novo:** pedido plausível de conexão, verificação no catálogo e escolha de negar/verificar/reportar.
- **Dependências:** catálogo de aplicativos e processo corporativo fictícios/aprovados; backend autoritativo.
- **Acessibilidade:** narrativa, tabela de app e opções nativas.
- **Risco principal:** concluir apenas pelo nome/contexto ou representar catálogo inexistente como real.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A ensina a superfície e B testa a decisão contextual; uma única atividade pode usar as duas etapas.
- **Vínculo recomendado:** estação de permissões/aplicativos no PhishLab ou Missão de ferramenta corporativa.
- **Condição para avançar:** modelo de tela abstrato, catálogo aprovado e proibição de qualquer OAuth real.

### Evidências no portal

- O desafio bancário demonstra fontes/decisões progressivas, mas não há tipos de aplicativo, escopo ou consentimento no domínio.

## `concept:oauth-scopes` — Permissões excessivas

### Formato A — Escopo versus finalidade

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** comparação em tabela, escolhas múltiplas e debrief.
- **Trabalho novo:** catálogo de finalidades e escopos em linguagem simples, opção inconclusiva e decisão de verificar.
- **Dependências:** revisão técnica/produto e backend autoritativo.
- **Acessibilidade:** cada permissão descrita por efeito; não depender de ícone ou jargão.
- **Risco principal:** afirmar que qualquer escopo amplo é malicioso sem considerar a função aprovada.

### Formato B — Orçamento de acesso

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** seletores e progresso; não existe alocador acessível reutilizável.
- **Trabalho novo:** distribuir permissões necessárias/opcionais/proibidas, conflitos e avaliador que aceite mais de uma solução segura.
- **Dependências:** matriz de mínimo privilégio, revisão especializada e backend autoritativo.
- **Acessibilidade:** seleção por categorias e resumo, sem arrastar fichas.
- **Risco principal:** gamificar mínimo privilégio com resposta artificial única ou ensinar configuração fora da responsabilidade do funcionário.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** compara finalidade e efeito diretamente; B adiciona complexidade sem ganho proporcional para usuário final.
- **Vínculo recomendado:** segunda etapa da Mesa de consentimento.
- **Condição para avançar:** glossário em linguagem simples e revisão das permissões que realmente aparecem no ambiente alvo.

### Evidências no portal

- `fieldset`, tabelas e fontes existem; o modelo de resposta atual não suporta alocação nem múltiplas combinações equivalentes.

## `concept:publisher-identity` — Editor verificado ou aplicativo conhecido

### Formato A — O que o selo comprova?

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de evidência do PhishLab e debrief “sinal útil, não garantia”.
- **Trabalho novo:** selo/editor sintéticos e classificação do limite probatório.
- **Dependências:** revisão da plataforma de identidade e backend do player hospedeiro.
- **Acessibilidade:** significado do selo em texto; ícone não é necessário.
- **Risco principal:** reforçar o próprio viés que pretende corrigir ou deslegitimar toda verificação de editor.

### Formato B — Mesmo editor, dois pedidos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** comparação lado a lado, contexto e decisões.
- **Trabalho novo:** dois consentimentos do mesmo editor com finalidades/escopos diferentes.
- **Dependências:** conteúdo revisado e backend autoritativo.
- **Acessibilidade:** tabela linear de editor, finalidade e permissão.
- **Risco principal:** caso artificial demais ou conclusão de que editor nunca importa.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** demonstra melhor que identidade é uma evidência entre várias; deve viver na atividade OAuth.
- **Vínculo recomendado:** Mesa de consentimento, sem player/recompensa próprios.
- **Condição para avançar:** definir precisamente o que o selo da plataforma alvo atesta.

### Evidências no portal

- O padrão de comparação e evidência existe; não há representação de editor verificado ou política de aplicativo.

## `concept:device-code` — Device-code phishing

### Formato A — Origem do código

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** eventos MFA, mensagens e associação por rádio.
- **Trabalho novo:** código fictício mascarado, ação que o gerou e opções “iniciado por mim/não iniciado/incerto”.
- **Dependências:** fluxo de device code aprovado e backend autoritativo; nenhum código utilizável ou página real.
- **Acessibilidade:** origem/finalidade em texto; não exige copiar/digitar código.
- **Risco principal:** ensinar passos operacionais reproduzíveis ou que todo device code é golpe.

### Formato B — Cadeia multicanal

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** sequência MFA, conversa e cartões multicanal.
- **Trabalho novo:** alternância estática entre mensagem, tela e suporte, estado compartilhado e avaliação causal.
- **Dependências:** roteiro extenso, revisão de identidade e backend autoritativo.
- **Acessibilidade:** lista cronológica completa; canal não indicado apenas por estilo.
- **Risco principal:** complexidade, instrução ofensiva detalhada ou falsa sensação de tempo real.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato A.
- **Justificativa:** ensina o princípio de origem sem reproduzir o ataque; B pode ser caso avançado depois de uma engine multicanal.
- **Vínculo recomendado:** atividade MFA/consentimento.
- **Condição para avançar:** revisão de conteúdo para remover códigos e etapas operacionalizáveis e manter tudo inerte.

### Evidências no portal

- A interface MFA fornece o padrão de eventos, mas não há engine multicanal nem contrato para associação código–ação.

## `concept:device-join` — Registro ou ingresso de dispositivo

### Formato A — Mesa de registro

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** tabela de fontes, escolhas e debrief.
- **Trabalho novo:** dispositivo, proprietário, ação iniciadora, efeito de ingresso e decisão de negar/verificar.
- **Dependências:** procedimento de gestão de dispositivos e backend autoritativo; nenhum registro real.
- **Acessibilidade:** dados tabulares e efeitos descritos em linguagem simples.
- **Risco principal:** usuário final tentar diagnosticar configuração técnica ou associar todo dispositivo novo a ataque.

### Formato B — Suporte quer “ajudar”

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** falso suporte da Missão MFA e decisão por canal oficial.
- **Trabalho novo:** pedido de registrar dispositivo, justificativa, consulta a chamado e ação segura.
- **Dependências:** processo de suporte/chamados aprovado e backend autoritativo.
- **Acessibilidade:** conversa textual e fonte de chamado, sem simular sistema real.
- **Risco principal:** ensinar fluxo diferente do suporte corporativo ou detalhar passos de ingresso indevido.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** B cria contexto e A mostra o efeito; juntos evitam que a lição seja só “não confie no suporte”.
- **Vínculo recomendado:** extensão da Missão MFA/falso suporte.
- **Condição para avançar:** revisão de identidade e help desk, com detalhes técnicos mínimos necessários ao comportamento.

### Evidências no portal

- O falso suporte já existe; não há diretório de dispositivo, chamado ou tipos de registro no estado.

## `concept:account-pairing-qr` — QR de pareamento ou vinculação de conta

### Formato A — Pareamento iniciado

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** QR inerte proposto, eventos MFA e decisão.
- **Trabalho novo:** pedido de pareamento, payload pré-definido, confirmação de origem e consequência de vincular.
- **Dependências:** fluxo do produto, geração segura de QR e backend autoritativo; sem câmera ou pareamento real.
- **Acessibilidade:** payload/finalidade em texto e controles por botão.
- **Risco principal:** QR escaneável ou instrução suficientemente fiel para operacionalizar vinculação indevida.

### Formato B — Auditoria de dispositivos vinculados

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** fontes progressivas, inventário de sessões e recuperação.
- **Trabalho novo:** lista sintética de vínculos, seleção dos não reconhecidos e plano de revogar/reportar.
- **Dependências:** procedimento de conta e backend autoritativo; controles não alteram conta real.
- **Acessibilidade:** tabela/lista de dispositivos, datas e origem; ações explicitamente simuladas.
- **Risco principal:** confundir ausência de reconhecimento com prova e prometer revogação funcional.

### Decisão preliminar

- **Destino:** Adaptar.
- **Escolha:** Formato B.
- **Justificativa:** ensina resposta segura sem expor um fluxo de pareamento; A pode ser narrativa curta no debrief.
- **Vínculo recomendado:** central simulada de sessões/dispositivos.
- **Condição para avançar:** política aprovada e conteúdo QR não escaneável ou sem destino funcional.

### Evidências no portal

- Não existe QR, dispositivo ou sessão no domínio; listas e ações simuladas cabem melhor que uma reprodução de pareamento.

## `concept:sim-swap` — SIM swap

### Formato A — Sinais em sequência

- **Viabilidade:** Média.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** timeline, mensagens e evidências.
- **Trabalho novo:** perda de serviço, alertas de conta e contato de operadora em sequência, com causas alternativas.
- **Dependências:** revisão de telecom/identidade, procedimento corporativo e backend autoritativo.
- **Acessibilidade:** sequência textual, sem depender de ícones de sinal.
- **Risco principal:** diagnosticar SIM swap por falha de rede isolada ou orientar contato por número não validado.

### Formato B — Plano sem o telefone

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** montagem de ações/reporte da `RecoveryMission`.
- **Trabalho novo:** selecionar canais alternativos, preservar evidências e escalar sem usar o número afetado.
- **Dependências:** contatos/procedimento reais aprovados e backend autoritativo; cenário usa apenas referências fictícias até lá.
- **Acessibilidade:** plano em categorias e passos textuais.
- **Risco principal:** dar instrução genérica inadequada, exigir recurso inacessível ou prometer recuperação de operadora.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Combinação.
- **Justificativa:** A reconhece um conjunto de sinais e B converte incerteza em resposta segura; não deve ser diagnóstico autônomo.
- **Vínculo recomendado:** Missão de recuperação de conta, não atividade de phishing isolada.
- **Condição para avançar:** procedimento local validado, rotas alternativas acessíveis e linguagem não diagnóstica.

### Evidências no portal

- A recuperação já monta plano e reporte; não há canal de telecom ou contatos reais, portanto toda resposta permanece demonstrativa.

## `concept:recovery-method-takeover` — Cadastro de novo fator, passkey ou recuperação

### Formato A — Inventário de métodos

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso com extensão.
- **Componentes e padrões reutilizáveis:** fontes progressivas, listas e decisão/revogação.
- **Trabalho novo:** inventário sintético de fatores, datas, origem e estado reconhecido/inconclusivo.
- **Dependências:** modelo de identidade e backend autoritativo; nenhum método real.
- **Acessibilidade:** tabela linear e ações simuladas.
- **Risco principal:** remover fator legítimo com base em nome/dispositivo incompleto ou prometer controle de conta.

### Formato B — Migração legítima versus tomada de conta

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** comparação de dois casos da Simulação e evidências contextuais.
- **Trabalho novo:** parear solicitação autorizada e mudança não iniciada, escolhendo verificar/revogar/reportar.
- **Dependências:** procedimento de migração e backend autoritativo.
- **Acessibilidade:** casos apresentados separadamente em texto, sem distinção só por visual.
- **Risco principal:** “método novo = ataque” ou excesso de confiança em chamado/conversa.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Formato B.
- **Justificativa:** controla falsos positivos e mede confirmação de origem; A funciona como painel dentro do mesmo caso.
- **Vínculo recomendado:** central simulada de segurança e recuperação de conta.
- **Condição para avançar:** modelo corporativo de cadastro/migração e respostas que aceitem incerteza.

### Evidências no portal

- O padrão de casos legítimo/phishing/verificar já existe na Simulação, mas métodos de identidade exigem conteúdo e contrato novos.

## `concept:credential-stuffing-symptom` — Prompt decorrente de tentativa com senha reutilizada

### Formato A — Mesmo sintoma, causas diferentes

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** pacote de casos da Simulação, eventos MFA e opção verificar.
- **Trabalho novo:** prompts iguais com causas possíveis e avaliação da resposta, nunca da atribuição técnica exata.
- **Dependências:** revisão de identidade e backend autoritativo.
- **Acessibilidade:** casos textuais com os mesmos sinais explicitados.
- **Risco principal:** pedir diagnóstico de stuffing ou concluir reutilização de senha sem evidência.

### Formato B — Divisão de responsabilidades

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** debrief e seleção de ações da recuperação.
- **Trabalho novo:** separar negar/reportar/revisar do trabalho de investigação técnica.
- **Dependências:** procedimento corporativo e backend hospedeiro.
- **Acessibilidade:** tabela simples por papel.
- **Risco principal:** moralizar reutilização de senha ou atribuir investigação ao usuário.

### Decisão preliminar

- **Destino:** Descartar como atividade própria.
- **Escolha:** Nenhum como player próprio.
- **Justificativa:** o sintoma reforça incerteza e resposta MFA, mas não é mensurável como técnica separada pelo funcionário.
- **Vínculo recomendado:** variação/debrief da Missão MFA e recuperação.
- **Condição para avançar:** formular avaliação apenas sobre ação observável e sem inferência de causa.

### Evidências no portal

- A Missão MFA já avalia negar/verificar/reportar; não há telemetria de senha ou identidade para confirmar a causa.

## `concept:passkey-fido` — Passkeys e FIDO resistentes a phishing

### Formato A — Segredo que viaja versus chave vinculada

- **Viabilidade:** Média.
- **Esforço relativo:** G.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** debrief, cartões comparativos e sequência de etapas.
- **Trabalho novo:** modelo conceitual acessível de segredo reutilizável versus credencial vinculada à origem, sem simular cerimônia real.
- **Dependências:** revisão FIDO/WebAuthn, conteúdo versionado e backend autoritativo se avaliado.
- **Acessibilidade:** descrição causal completa; animação/diagrama é opcional.
- **Risco principal:** prometer invulnerabilidade, confundir sincronização/recuperação ou ensinar detalhe técnico além da ação do usuário.

### Formato B — Falha sem diagnóstico precipitado

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** Missão de rota conhecida, evidências e decisão inconclusiva.
- **Trabalho novo:** passkey que não aparece/funciona em uma origem e escolhas de parar, reabrir ou procurar suporte oficial.
- **Dependências:** fluxo corporativo de passkey e backend autoritativo; nenhuma WebAuthn real.
- **Acessibilidade:** falha e alternativas em texto, sem autenticação biométrica.
- **Risco principal:** “passkey falhou = phishing” ou incentivar fallback inseguro.

### Decisão preliminar

- **Destino:** Combinar.
- **Escolha:** Formato B.
- **Justificativa:** ensina reação observável e limite; A deve ser explicação, não simulação técnica ou atividade própria.
- **Vínculo recomendado:** debrief de autenticação/rota e conteúdo opcional do Radar.
- **Condição para avançar:** revisão especializada e linguagem explícita de resistência a phishing sem garantia absoluta.

### Evidências no portal

- Não há WebAuthn, biometria ou autenticação real; o padrão de falha/rota segura cabe em Missão sem introduzi-los.

## `concept:password-manager` — Gerenciador de senhas vinculado ao domínio

### Formato A — Dois logins, uma credencial salva

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** comparação de cartões, evidências e debrief do PhishLab.
- **Trabalho novo:** formulários inertes e estado declarativo reconhecido/não reconhecido, com diferenças de domínio e contexto.
- **Dependências:** revisão técnica e backend autoritativo; nenhuma API de cofre ou entrada de senha.
- **Acessibilidade:** estado do gerenciador em texto/status e campos não editáveis.
- **Risco principal:** ausência de preenchimento como veredito ou incentivo para digitar manualmente em página duvidosa.

### Formato B — Calibração de pista

- **Viabilidade:** Alta.
- **Esforço relativo:** P.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** opções de evidência do PhishLab.
- **Trabalho novo:** casos de cofre bloqueado, subdomínio, nova credencial e página suspeita, classificando a pista como insuficiente.
- **Dependências:** conteúdo e backend hospedeiro.
- **Acessibilidade:** escolha textual.
- **Risco principal:** diluir demais uma pista útil ou representar comportamento diferente do gerenciador alvo.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A torna a pista concreta e B evita absolutismo; deve unificar-se a `concept:password-manager-clue` do conjunto 03.
- **Vínculo recomendado:** laboratório de autenticação/domínio compartilhado.
- **Condição para avançar:** especificação única entre os dois conceitos, formulários inertes e revisão por produto/acessibilidade.

### Evidências no portal

- O portal não integra gerenciador; evidências e comparação são suficientes para uma representação declarativa segura.

## `concept:session-review-revoke` — Revisão e revogação de sessões ou aplicativos

### Formato A — Central de segurança simulada

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Componente novo.
- **Componentes e padrões reutilizáveis:** fontes progressivas, listas selecionáveis, ações de recuperação e resultado/debrief.
- **Trabalho novo:** inventário sintético de sessões/apps, detalhes por item, seleção de revogar/manter/verificar e estado pós-ação.
- **Dependências:** procedimento e modelo de identidade, backend autoritativo; ações não atingem serviços reais.
- **Acessibilidade:** tabela/lista com botões explícitos, confirmação e foco mantido após mudança.
- **Risco principal:** falsa revogação, exclusão de sessão legítima por geolocalização ou confusão com central real.

### Formato B — Matriz exposição–contenção

- **Viabilidade:** Alta.
- **Esforço relativo:** M.
- **Encaixe:** Reuso direto.
- **Componentes e padrões reutilizáveis:** incidentes e seleção de ações da recuperação.
- **Trabalho novo:** associar abriu/clicou/credencial/MFA/sessão às respostas proporcionais, aceitando dependência de procedimento.
- **Dependências:** playbook corporativo e backend autoritativo.
- **Acessibilidade:** tabela ou grupos de escolha, sem arrastar.
- **Risco principal:** matriz genérica prescrever ação errada ou parecer substituta do canal oficial.

### Decisão preliminar

- **Destino:** Manter.
- **Escolha:** Combinação.
- **Justificativa:** A pratica a operação simulada e B dá o raciocínio proporcional; é a consolidação natural dos conceitos de sessão.
- **Vínculo recomendado:** etapa final da Missão de recuperação/central de conta.
- **Condição para avançar:** procedimento autorizado, rótulo permanente de simulação e backend antes de qualquer dado/ação real.

### Evidências no portal

- `RecoveryMission` já contém “revisar sessões” e quatro níveis de exposição, mas não há inventário, ação de revogação nem tipos persistidos de sessão/aplicativo.
