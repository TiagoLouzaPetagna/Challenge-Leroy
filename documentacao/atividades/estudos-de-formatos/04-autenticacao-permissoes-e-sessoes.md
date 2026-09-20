# Estudo de formatos — Autenticação, permissões e sessões

> **Estado:** pesquisa; não aprovado para implementação.

## `concept:credential-harvest` — Coleta de usuário e senha

### Ensinamento e papel

- **Comportamento observável:** interromper a página recebida e abrir o serviço por favorito, aplicativo, intranet ou endereço conhecido antes de inserir credenciais.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Caso principal de página falsa e ponte para recuperação.
- **Por que não basta uma explicação textual:** a pessoa precisa abandonar uma rota visualmente convincente e reconstruir a navegação segura, não apenas apontar defeitos cosméticos.

### Dificuldades e riscos

- A página pode ser quase idêntica à original e usar HTTPS.
- Fluxos legítimos de SSO podem mudar de aparência ou domínio.
- Ausência de autofill e pequenos erros visuais são pistas, não prova.
- Nenhum campo do treinamento pode aceitar ou persistir credencial real.

### Formato A — Recomeçar pela rota conhecida

- **Área provável:** Missão.
- **Mecânica:** diante de uma página inerte aberta por mensagem, a pessoa fecha a rota e navega numa representação do diretório oficial.
- **Fluxo:** solicitação → página convincente → escolha de origem → localização do serviço → confirmação ou reporte.
- **O que seria avaliado:** abandono da rota recebida, origem escolhida e decisão proporcional.
- **Alternativa acessível:** árvore textual de navegação por botões, sem campo de senha.

### Formato B — Evidências copiáveis e não copiáveis

- **Área provável:** PhishLab.
- **Mecânica:** classificar logotipo, personalização, HTTPS, URL, origem da navegação e ação iniciada conforme o que realmente demonstram.
- **Fluxo:** mapa guiado → caso independente → classificação com grau de certeza → debrief.
- **O que seria avaliado:** prioridade dada à origem e ao processo, não caça a erro visual.
- **Alternativa acessível:** tabela com seletores e explicação textual de cada evidência.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Recomeçar pela rota conhecida.
- A futura análise deve estudar uma página fictícia que não copie marca real e impedir entrada de segredos.
- Credencial informada deve encaminhar conceitualmente à recuperação, sem simular alteração real.

### Fontes

- [CISA Secure Our World — Recognize and Report Phishing](https://www.cisa.gov/secure-our-world)
- [NIST SP 800-63B — Authentication threats](https://pages.nist.gov/800-63-4/sp800-63b/security/)

## `concept:mfa-uninitiated` — Solicitação MFA não iniciada

### Ensinamento e papel

- **Comportamento observável:** negar a solicitação, não compartilhar código ou aprovação, abrir a área oficial por rota própria, revisar acessos e reportar.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria.
- **Por que não basta uma explicação textual:** o comportamento exige vincular o prompt a uma ação própria e continuar a resposta mesmo depois de negar.

### Dificuldades e riscos

- Um prompt legítimo pode chegar com atraso, mas continua exigindo vínculo com ação iniciada.
- Localização e dispositivo podem ser imprecisos.
- Fechar a notificação não substitui negar, revisar e reportar quando o processo assim exigir.
- A simulação não pode aprovar ou negar autenticação real.

### Formato A — Console de eventos

- **Área provável:** Missão.
- **Mecânica:** prompts chegam de forma sequencial e permitem negar, examinar contexto e abrir uma área oficial simulada.
- **Fluxo:** primeiro prompt → decisão → revisão de sessões → reporte → debrief causal.
- **O que seria avaliado:** vínculo com ação própria, negação, rota independente e revisão proporcional.
- **Alternativa acessível:** fila textual de eventos sem animação ou limite de tempo.

### Formato B — Prompt atrasado

- **Área provável:** PhishLab.
- **Mecânica:** ordenar ações recentes e prompts para decidir quais possuem vínculo demonstrável, incluindo um caso legítimo atrasado e um inconclusivo.
- **Fluxo:** linha temporal → associação prompt-ação → decisão → explicação dos limites.
- **O que seria avaliado:** uso da própria ação como referência, não precisão de geolocalização.
- **Alternativa acessível:** associação por menus e sequência numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Console de eventos.
- A análise futura deve decidir como representar chegada de notificações sem pressão temporal ou dependência de animação.
- O procedimento de revisão e reporte precisa ser editorialmente configurável.

### Fontes

- [MITRE ATT&CK — Multi-Factor Authentication Request Generation](https://attack.mitre.org/techniques/T1621/)
- [CISA — Implementing Number Matching in MFA Applications](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implement-number-matching-in-mfa-applications-508c.pdf)

## `concept:mfa-fatigue` — MFA fatigue ou push bombing

### Ensinamento e papel

- **Comportamento observável:** negar solicitações repetidas, não aprovar para fazê-las parar, interromper falso suporte associado, revisar acessos e reportar.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Comportamento principal ou conceito complementar forte da atividade de MFA.
- **Por que não basta uma explicação textual:** a repetição e a escalada de pressão precisam ser vivenciadas sem usar velocidade como critério.

### Dificuldades e riscos

- Repetição indica tentativa ou falha operacional, mas não identifica a causa exata.
- Notificações reais podem se duplicar por problemas técnicos.
- O treinamento não deve reproduzir vibração, som ou volume perturbador.
- Aprovação insegura deve abrir recuperação sem culpa, não reiniciar como punição.

### Formato A — Fila de pressão controlada

- **Área provável:** Missão.
- **Mecânica:** novos prompts aparecem após cada decisão, e um falso suporte textual reage por roteiro finito.
- **Fluxo:** prompt → repetição → suporte → negação/encerramento → revisão oficial → debrief.
- **O que seria avaliado:** consistência das decisões e proteção do segundo fator ao longo da sequência.
- **Alternativa acessível:** todos os eventos ficam numa lista, com anúncios opcionais e movimento reduzido.

### Formato B — Reconstrução da campanha

- **Área provável:** PhishLab.
- **Mecânica:** ordenar prompts, tentativas de login e mensagens de suporte e marcar os pontos onde a pressão mudou de canal.
- **Fluxo:** artefatos fora de ordem → linha causal → resposta segura por etapa → debrief.
- **O que seria avaliado:** reconhecimento da cadeia e escolha de contenção, não diagnóstico do invasor.
- **Alternativa acessível:** botões para ordenar e lista numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Fila de pressão controlada.
- O número de eventos e as ramificações devem ser definidos editorialmente sem simular assédio real.
- A futura etapa técnica deverá confirmar que nenhuma notificação do sistema é acionada.

### Fontes

- [MITRE ATT&CK — Multi-Factor Authentication Request Generation](https://attack.mitre.org/techniques/T1621/)
- [CISA — Implementing Number Matching in MFA Applications](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implement-number-matching-in-mfa-applications-508c.pdf)

## `concept:mfa-context` — Número, localização e dispositivo do prompt

### Ensinamento e papel

- **Comportamento observável:** conferir os detalhes como contexto adicional, mas aprovar somente quando houver uma ação própria correspondente.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e caso de transferência.
- **Por que não basta uma explicação textual:** casos contrastantes demonstram que detalhe coincidente ajuda, mas não cria autorização por si só.

### Dificuldades e riscos

- Geolocalização por IP pode apontar cidade próxima, VPN ou infraestrutura do provedor.
- Nomes de dispositivo podem ser genéricos ou repetidos.
- Número correspondente ainda não torna legítimo um fluxo iniciado pelo atacante.
- O exercício não deve premiar recusa baseada em uma única divergência visual.

### Formato A — Calibrador de evidências

- **Área provável:** PhishLab.
- **Mecânica:** classificar ação iniciada, número, localização, horário e dispositivo como evidência forte, contextual ou insuficiente.
- **Fluxo:** demonstração → três prompts contrastantes → grau de certeza → debrief.
- **O que seria avaliado:** primazia da ação própria e uso proporcional do contexto.
- **Alternativa acessível:** tabela com rótulos textuais e seletores.

### Formato B — Associação a uma ação

- **Área provável:** Simulação.
- **Mecânica:** relacionar prompts a tarefas recentes; alguns detalhes coincidem por acaso e outros divergem legitimamente.
- **Fluxo:** agenda de ações → prompts → associação ou “sem vínculo” → decisão final.
- **O que seria avaliado:** vínculo demonstrável e resposta aos casos inconclusivos.
- **Alternativa acessível:** menus por prompt, sem arrastar.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Calibrador de evidências.
- Os exemplos precisam evitar precisão irreal de localização.
- A análise futura deve definir o mínimo de contexto que a interface fictícia mostrará.

### Fontes

- [CISA — Implementing Number Matching in MFA Applications](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implement-number-matching-in-mfa-applications-508c.pdf)
- [NIST SP 800-63B — Authentication threats](https://pages.nist.gov/800-63-4/sp800-63b/security/)

## `concept:otp-theft` — Roubo de OTP

### Ensinamento e papel

- **Comportamento observável:** usar código somente no fluxo que a própria pessoa iniciou e nunca ditá-lo, enviá-lo ou colá-lo para outra pessoa.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria ou caso principal de origem do código.
- **Por que não basta uma explicação textual:** uma página ou suporte convincente pode pedir um código legítimo; a prática deve ligar origem, dispositivo e ação autorizada.

### Dificuldades e riscos

- OTP legítimo costuma chegar por outro canal, exatamente como alguns ataques.
- O código autentica a sessão que o consome, não necessariamente a pessoa que o recebeu.
- Alguns fluxos corporativos usam códigos de confirmação com finalidades diferentes.
- Nenhum código real ou formato reutilizável deve ser coletado.

### Formato A — De qual fluxo veio o código?

- **Área provável:** PhishLab.
- **Mecânica:** relacionar códigos fictícios a ações iniciadas, dispositivos e aplicativos; itens sem origem conhecida devem ser recusados.
- **Fluxo:** ação → código → pedido de terceiro → associação → decisão e debrief.
- **O que seria avaliado:** vínculo correto e recusa de retransmitir segredo.
- **Alternativa acessível:** seletores por código e descrição textual do dispositivo.

### Formato B — Conversa de retransmissão

- **Área provável:** Missão.
- **Mecânica:** falso suporte reformula o pedido de código; a pessoa pode encerrar, abrir o suporte oficial e reportar.
- **Fluxo:** contato → pedido → pressão → decisão → revisão de conta se houve compartilhamento.
- **O que seria avaliado:** proteção do código, encerramento e recuperação proporcional.
- **Alternativa acessível:** diálogo textual ramificado sem áudio ou temporizador.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** De qual fluxo veio o código?
- A terminologia deve diferenciar OTP, número de correspondência e código de dispositivo.
- A futura análise deve garantir que nenhum campo aceite sequência que pareça segredo real.

### Fontes

- [NIST SP 800-63B — Authentication threats](https://pages.nist.gov/800-63-4/sp800-63b/security/)
- [MITRE ATT&CK — Multi-Factor Authentication Request Generation](https://attack.mitre.org/techniques/T1621/)

## `concept:recovery-code-theft` — Roubo de código de recuperação

### Ensinamento e papel

- **Comportamento observável:** tratar código de recuperação como segredo de alto impacto, nunca fornecê-lo a suporte recebido e iniciar recuperação somente pela rota oficial.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de uma atividade de códigos e complemento de recuperação.
- **Por que não basta uma explicação textual:** o termo “recuperação” pode soar como solução oferecida pelo suporte; o exercício deve mostrar que o código pode substituir outro fator.

### Dificuldades e riscos

- Serviços apresentam e armazenam códigos de modos diferentes.
- A pessoa pode confundir código de recuperação, OTP, PIN e código de dispositivo.
- O procedimento após exposição depende do provedor e da empresa.
- Nenhum exemplo deve imitar sequência válida ou aceitar segredo real.

### Formato A — Cofre de segredos

- **Área provável:** PhishLab.
- **Mecânica:** classificar itens fictícios por função e impacto — notificação, OTP, recuperação, número de chamado — e escolher quais nunca são compartilhados.
- **Fluxo:** demonstração → classificação → pedido de falso suporte → decisão → debrief.
- **O que seria avaliado:** reconhecimento funcional e proteção do código de recuperação.
- **Alternativa acessível:** tabela com descrições e seletores.

### Formato B — Recuperação da recuperação

- **Área provável:** Missão.
- **Mecânica:** após exposição declarada, organizar ações entre interromper, reportar, abrir área oficial, invalidar métodos e revisar sessões.
- **Fluxo:** fato ocorrido → plano proporcional → reporte sem segredo → debrief.
- **O que seria avaliado:** rapidez conceitual do reporte sem pontuar tempo e uso da rota oficial.
- **Alternativa acessível:** cartões categorizados por menus e ordem por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Cofre de segredos, como caso junto de OTP.
- O conteúdo final depende do procedimento corporativo de recuperação.
- A etapa técnica futura deve rejeitar qualquer entrada livre de código.

### Fontes

- [NIST SP 800-63B — Recovery codes](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)
- [CISA — More than a Password](https://www.cisa.gov/more-password)

## `concept:aitm` — Adversary-in-the-middle

### Ensinamento e papel

- **Comportamento observável:** usar origem de navegação e domínio conhecido, compreender que login e MFA aparentemente bem-sucedidos não validam a rota e reportar comportamento inesperado.
- **Potencial pedagógico:** Médio como caso avançado; parte do mecanismo é controle técnico predominante.
- **Papel recomendado:** Caso observável de página e explicação causal.
- **Por que não basta uma explicação textual:** a cadeia ajuda a explicar por que uma página funcional pode capturar uma sessão, mas o funcionário não deve diagnosticar o proxy invisível.

### Dificuldades e riscos

- A experiência pode parecer completamente legítima depois da credencial e do MFA.
- O único indício humano pode ser a origem ou o domínio; às vezes nem isso basta.
- “MFA foi aceito” não significa que a sessão está segura.
- Defesa forte depende de autenticação resistente a phishing, políticas e detecção técnica.

### Formato A — Página funcional, rota errada

- **Área provável:** PhishLab.
- **Mecânica:** uma cadeia inerte mostra mensagem, domínio intermediário, login representado e acesso aparente; a pessoa deve abandonar a rota antes de inserir qualquer dado.
- **Fluxo:** origem recebida → inspeção da rota → decisão → raio X causal posterior.
- **O que seria avaliado:** origem escolhida e interrupção; o mecanismo só aparece no debrief.
- **Alternativa acessível:** linha textual de etapas, sem reproduzir formulário de senha.

### Formato B — Autópsia da sessão

- **Área provável:** PhishLab.
- **Mecânica:** ordenar eventos pós-incidente e ligar credencial, MFA, token representado e sessão ao que foi ou não protegido.
- **Fluxo:** fatos fora de ordem → mapa causal → ações de contenção → limite técnico.
- **O que seria avaliado:** compreensão de consequência e resposta, não detecção de cookie.
- **Alternativa acessível:** associação por menus e descrição de cada relação.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Página funcional, rota errada, seguida de explicação causal não pontuada.
- A futura análise deverá eliminar qualquer coleta de credencial e evitar ensinar implementação de proxy.
- O caso deve indicar que autenticação resistente a phishing é controle de plataforma, não responsabilidade exclusiva do usuário.

### Fontes

- [Microsoft Security Blog — AiTM phishing sites and session cookies](https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/)
- [NIST SP 800-63B — Phishing resistance](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)

## `concept:session-cookie` — Roubo ou reutilização de sessão

### Ensinamento e papel

- **Comportamento observável:** relatar a interação com precisão, usar a resposta oficial e revisar/revogar sessões; não assumir que trocar senha encerrou todo acesso.
- **Potencial pedagógico:** Controle técnico predominante, com recuperação observável.
- **Papel recomendado:** Explicação interativa de limite e caso de recuperação.
- **Por que não basta uma explicação textual:** um mapa de sessão torna compreensível por que senha, token e sessão têm ciclos diferentes, sem exigir inspeção técnica.

### Dificuldades e riscos

- Cookie ou token normalmente não é visível ao funcionário.
- Aplicações podem manter sessões próprias e tempos de revogação distintos.
- Troca de senha ajuda, mas não é garantia universal de encerramento imediato.
- Ações reais de revogação pertencem ao backend e ao procedimento autorizado.

### Formato A — Mapa de portas ainda abertas

- **Área provável:** PhishLab.
- **Mecânica:** visualizar conta, provedor, aplicações e sessões como relações; depois de uma mudança de senha simulada, algumas conexões permanecem até ação específica.
- **Fluxo:** incidente → alteração de senha representada → revisão das sessões → revogação simulada → debrief.
- **O que seria avaliado:** escolha de revisar e reportar, não conhecimento de token.
- **Alternativa acessível:** árvore textual com estados explícitos.

### Formato B — Resposta por exposição

- **Área provável:** Missão.
- **Mecânica:** distribuir ações para credencial exposta, sessão possivelmente roubada e aplicativo consentido.
- **Fluxo:** exposição declarada → plano agora/depois/não faça → reporte → explicação das diferenças.
- **O que seria avaliado:** proporcionalidade e inclusão de revisão/revogação conforme o caso.
- **Alternativa acessível:** categorização por seletores e ordem por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mapa de portas ainda abertas, sem simular que a revogação ocorreu de verdade.
- O procedimento corporativo deve definir quais ações cabem ao funcionário e quais dependem da equipe de identidade.
- Uma eventual proposta de implementação precisará de linguagem rigorosa sobre tempos e limites de revogação.

### Fontes

- [Microsoft Learn — Revoke user access in an emergency](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access)
- [Microsoft Security Blog — AiTM phishing sites and session cookies](https://www.microsoft.com/en-us/security/blog/2022/07/12/from-cookie-theft-to-bec-attackers-use-aitm-phishing-sites-as-entry-point-to-further-financial-fraud/)

## `concept:oauth-consent` — OAuth consent phishing

### Ensinamento e papel

- **Comportamento observável:** antes de consentir, relacionar aplicativo, finalidade, ação iniciada, editor e permissões; negar ou encaminhar por fluxo oficial quando algo não corresponder.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria em **Login verdadeiro, permissão errada**.
- **Por que não basta uma explicação textual:** a página do provedor pode ser autêntica; a decisão segura depende do que está sendo autorizado, não de encontrar uma página falsa.

### Dificuldades e riscos

- Consentimento legítimo faz parte da adoção de muitos aplicativos.
- A terminologia de permissões pode ser técnica ou vaga.
- Publisher verificado reduz risco, mas não comprova necessidade da permissão.
- Este conceito não deve ser inserido silenciosamente na atividade atual de MFA.

### Formato A — Mesa de consentimento

- **Área provável:** PhishLab.
- **Mecânica:** comparar finalidade declarada, aplicativo, editor e escopos de uma tela fictícia de consentimento.
- **Fluxo:** pedido → inspeção dos quatro elementos → consentir, negar ou solicitar revisão → debrief.
- **O que seria avaliado:** vínculo com ação própria, necessidade e uso do processo corporativo.
- **Alternativa acessível:** tabela de permissões com impacto descrito em linguagem clara.

### Formato B — Aplicativo no fluxo de trabalho

- **Área provável:** Missão.
- **Mecânica:** uma tarefa requer ferramenta nova; a pessoa consulta catálogo e aprovação antes de chegar à tela legítima de consentimento.
- **Fluxo:** necessidade → descoberta da ferramenta → aprovação fictícia → escopos → decisão.
- **O que seria avaliado:** origem do aplicativo e autorização de processo além da leitura da tela.
- **Alternativa acessível:** etapas em lista e escolhas por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mesa de consentimento.
- A curadoria precisa traduzir escopos sem prometer equivalência universal entre provedores.
- A análise futura deve impedir qualquer autenticação ou consentimento externo real.

### Fontes

- [Microsoft Learn — Protect against consent phishing](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/protect-against-consent-phishing)
- [Microsoft Learn — Permissions and consent overview](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview)

## `concept:oauth-scopes` — Permissões excessivas

### Ensinamento e papel

- **Comportamento observável:** comparar cada permissão à função declarada, recusar excesso e usar pedido de aprovação quando não souber avaliar.
- **Potencial pedagógico:** Alto como parte de uma atividade.
- **Papel recomendado:** Comportamento principal ou complementar de consentimento.
- **Por que não basta uma explicação textual:** a pessoa precisa raciocinar sobre necessidade e impacto, incluindo casos legítimos com permissões proporcionais.

### Dificuldades e riscos

- Nomes de escopo podem ser pouco compreensíveis.
- Alguns aplicativos legítimos precisam de acesso amplo por função real.
- “Poucas permissões” não significa seguro; “muitas” não prova ataque.
- Política corporativa pode proibir consentimento do usuário independentemente do julgamento.

### Formato A — Escopo versus finalidade

- **Área provável:** PhishLab.
- **Mecânica:** ligar permissões traduzidas a funções do aplicativo e marcar excesso, compatibilidade ou informação insuficiente.
- **Fluxo:** caso guiado → mapa de necessidade → caso independente → decisão.
- **O que seria avaliado:** proporcionalidade e escalonamento quando houver dúvida.
- **Alternativa acessível:** menus de associação em cada linha.

### Formato B — Orçamento de acesso

- **Área provável:** Simulação.
- **Mecânica:** escolher o conjunto mínimo de capacidades necessário para três ferramentas fictícias e rejeitar solicitações fora do catálogo.
- **Fluxo:** tarefas → opções de permissão → impacto acumulado → revisão e debrief.
- **O que seria avaliado:** princípio de menor privilégio, sem exigir nome técnico do escopo.
- **Alternativa acessível:** caixas de seleção com resumo textual do impacto.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Escopo versus finalidade.
- A futura análise deve validar traduções com especialistas de identidade e política de consentimento.
- O avaliador não deve pressupor que existe sempre uma única combinação mínima.

### Fontes

- [Microsoft Learn — Permissions and consent overview](https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview)
- [Microsoft Learn — Application consent management and evaluation](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-consent-requests)

## `concept:publisher-identity` — Editor verificado ou aplicativo conhecido

### Ensinamento e papel

- **Comportamento observável:** usar editor e domínio como evidências, mas confirmar finalidade, origem e permissões antes de autorizar.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e caso de transferência.
- **Por que não basta uma explicação textual:** casos pareados mostram que identidade verificada responde “quem publicou”, não “esta permissão é necessária agora”.

### Dificuldades e riscos

- A verificação do editor tem significados e critérios específicos por plataforma.
- Um editor legítimo pode publicar vários aplicativos com finalidades diferentes.
- Conta ou cadeia de publicação pode ser comprometida.
- “Não verificado” não prova malícia; pode exigir revisão administrativa.

### Formato A — O que o selo comprova?

- **Área provável:** PhishLab.
- **Mecânica:** classificar afirmações sobre editor, aplicativo, permissão e aprovação conforme são comprovadas ou continuam abertas.
- **Fluxo:** selo representado → mapa de garantias → caso legítimo excessivo → caso desconhecido proporcional → debrief.
- **O que seria avaliado:** uso limitado do indicador e decisão conforme política.
- **Alternativa acessível:** afirmações em lista com opções “comprova”, “ajuda” e “não comprova”.

### Formato B — Mesmo editor, dois pedidos

- **Área provável:** Missão.
- **Mecânica:** o mesmo editor aparece num aplicativo esperado e em outro pedido fora do processo; a pessoa escolhe como verificar.
- **Fluxo:** dois consentimentos → consulta ao catálogo → avaliação de finalidade → decisão.
- **O que seria avaliado:** não transformar familiaridade do editor em autorização universal.
- **Alternativa acessível:** comparação tabular completa.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** O que o selo comprova?
- A terminologia deve ser fictícia ou claramente genérica, sem imitar certificação inexistente.
- O conteúdo final precisa alinhar-se à política corporativa de aplicativos.

### Fontes

- [Microsoft Learn — Publisher verification](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview)
- [Microsoft Learn — Configure an app publisher domain](https://learn.microsoft.com/en-us/entra/identity-platform/howto-configure-publisher-domain)

## `concept:device-code` — Device-code phishing

### Ensinamento e papel

- **Comportamento observável:** inserir um código somente quando ele foi exibido pelo dispositivo ou aplicativo que a própria pessoa está configurando e quando aplicação e finalidade correspondem.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade própria em **De qual dispositivo veio este código?**.
- **Por que não basta uma explicação textual:** a página de login pode ser real; a decisão depende da origem do código e do equipamento que receberá a sessão.

### Dificuldades e riscos

- Device code possui usos legítimos em TVs, impressoras, CLI e dispositivos compartilhados.
- A tela legítima do provedor pode induzir confiança excessiva.
- O usuário pode não ver claramente qual aplicativo receberá os tokens.
- O conceito permanece fora da Missão atual de MFA.

### Formato A — Origem do código

- **Área provável:** PhishLab.
- **Mecânica:** relacionar códigos fictícios a dispositivos, aplicativos e ações iniciadas; um código vindo de chat não possui dispositivo próprio correspondente.
- **Fluxo:** configuração → código → página legítima representada → associação → decisão e debrief.
- **O que seria avaliado:** vínculo entre origem física/lógica, finalidade e ação própria.
- **Alternativa acessível:** seletores por item e descrições textuais dos dispositivos.

### Formato B — Cadeia multicanal

- **Área provável:** Simulação.
- **Mecânica:** e-mail, reunião ou suporte envia código; a pessoa precisa reconstruir quem iniciou o fluxo e quem obteria acesso.
- **Fluxo:** contato → código → login legítimo → permissão → revisão da cadeia → resposta.
- **O que seria avaliado:** abandono do código fornecido por terceiro e reporte.
- **Alternativa acessível:** linha temporal textual com relações escolhidas por menus.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Origem do código.
- Nenhum código, URL ou login real pode ser utilizado.
- A análise futura precisa distinguir visualmente este fluxo de OTP sem depender de jargão.

### Fontes

- [Microsoft Security Blog — Device code phishing](https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/)
- [Microsoft Learn — Authentication flows and device code](https://learn.microsoft.com/en-us/entra/msal/msal-authentication-flows)

## `concept:device-join` — Registro ou ingresso de dispositivo

### Ensinamento e papel

- **Comportamento observável:** identificar qual dispositivo será registrado, confirmar que a própria pessoa iniciou a inclusão e rejeitar código ou pedido fornecido por suporte, reunião ou mensagem não verificados.
- **Potencial pedagógico:** Alto como caso.
- **Papel recomendado:** Caso principal da atividade de dispositivo.
- **Por que não basta uma explicação textual:** registrar um dispositivo pode ocorrer por uma página legítima; é preciso visualizar a relação entre conta, máquina e autorização.

### Dificuldades e riscos

- Organizações possuem processos legítimos de ingresso e equipamentos compartilhados.
- Nome do dispositivo pode ser genérico ou desconhecido.
- A consequência do ingresso varia conforme política e plataforma.
- Não deve haver conexão, cadastro ou token real.

### Formato A — Mesa de registro

- **Área provável:** PhishLab.
- **Mecânica:** relacionar conta, dispositivo nomeado, solicitante, chamado e código; inconsistências permanecem como hipótese até confirmação.
- **Fluxo:** pedido → mapa de relações → consulta ao chamado → permitir, negar ou escalar.
- **O que seria avaliado:** ação iniciada, dispositivo reconhecido e processo autorizado.
- **Alternativa acessível:** tabela de relações com seletores.

### Formato B — Suporte quer “ajudar”

- **Área provável:** Missão.
- **Mecânica:** falso suporte tenta orientar registro de máquina alheia; a pessoa pode encerrar e abrir o suporte oficial.
- **Fluxo:** contato → código → pedido de ingresso → verificação → reporte e revisão.
- **O que seria avaliado:** recusa do vínculo não iniciado e uso do canal oficial.
- **Alternativa acessível:** conversa textual ramificada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mesa de registro.
- O conteúdo depende de uma política fictícia clara para dispositivos pessoais, corporativos e compartilhados.
- A futura análise deve determinar quanto impacto explicar sem exagerar permissões universais.

### Fontes

- [Microsoft Learn — Authentication flows as a Conditional Access condition](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-flows)
- [Microsoft Security Blog — Device code phishing](https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/)

## `concept:account-pairing-qr` — QR de pareamento ou vinculação de conta

### Ensinamento e papel

- **Comportamento observável:** escanear QR de pareamento somente durante fluxo iniciado no aplicativo oficial e revisar dispositivos vinculados se houve interação inesperada.
- **Potencial pedagógico:** Alto como caso.
- **Papel recomendado:** Caso de atividade de dispositivos e transferência para QR.
- **Por que não basta uma explicação textual:** o QR pode estar numa página legítima ou mensagem; o comportamento seguro nasce do vínculo com a ação iniciada.

### Dificuldades e riscos

- Pareamento por QR é comum e legítimo.
- O QR esconde parte do contexto e transfere a ação para outro dispositivo.
- Diferentes aplicativos exibem consequências e confirmações distintas.
- Não deve existir QR decodificável nem câmera no protótipo desktop.

### Formato A — Pareamento iniciado

- **Área provável:** PhishLab.
- **Mecânica:** comparar QR apresentado pelo próprio aplicativo durante configuração com QR recebido por mensagem ou suporte.
- **Fluxo:** ação inicial → QR inerte → descrição do dispositivo a vincular → decisão → debrief.
- **O que seria avaliado:** origem do fluxo e conferência do dispositivo.
- **Alternativa acessível:** prévia textual do QR e controles por botão.

### Formato B — Auditoria de dispositivos vinculados

- **Área provável:** Missão.
- **Mecânica:** após escaneamento declarado, revisar uma lista fictícia de dispositivos, remover o não reconhecido e reportar.
- **Fluxo:** incidente → área oficial simulada → revisão → contenção → reporte.
- **O que seria avaliado:** resposta proporcional e distinção entre conhecido, desconhecido e inconclusivo.
- **Alternativa acessível:** lista com estados textuais e ações por item.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Pareamento iniciado.
- Pode compartilhar linguagem curricular com QR sem reutilizar sua mecânica automaticamente.
- A análise futura precisa garantir QR totalmente inerte e sem permissão de câmera.

### Fontes

- [Microsoft Learn — Authentication transfer and device code flow](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-flows)
- [NCSC — QR codes: what is the real risk?](https://www.ncsc.gov.uk/blog-post/qr-codes-whats-real-risk)

## `concept:sim-swap` — SIM swap

### Ensinamento e papel

- **Comportamento observável:** diante de perda inesperada de serviço ou aviso de troca não iniciada, usar outro canal para contatar operadora e segurança, revisar conta e não depender apenas de SMS.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Caso de resposta em atividade de dispositivos ou mensagens.
- **Por que não basta uma explicação textual:** sinais surgem em sequência e precisam ser diferenciados de falha comum de rede, sem exigir certeza sobre a causa.

### Dificuldades e riscos

- Falta de sinal tem muitas causas benignas.
- A pessoa pode estar sem o próprio canal de telefone para pedir ajuda.
- Procedimentos de operadora e organização variam.
- O treinamento não deve simular atendimento ou portabilidade real.

### Formato A — Sinais em sequência

- **Área provável:** Missão.
- **Mecânica:** combinar perda de serviço, aviso de alteração e atividade de conta; a pessoa decide quando e como escalar.
- **Fluxo:** sinal isolado → segundo indício → contato por canal alternativo → revisão e reporte.
- **O que seria avaliado:** resposta proporcional e uso de canal independente, não diagnóstico definitivo.
- **Alternativa acessível:** linha temporal textual sem animação.

### Formato B — Plano sem o telefone

- **Área provável:** Simulação.
- **Mecânica:** montar um plano de contingência usando dispositivo alternativo, contatos conhecidos, operadora e segurança.
- **Fluxo:** indisponibilidade → seleção dos canais → ordem crítica → debrief.
- **O que seria avaliado:** escolha de fontes oficiais e proteção das contas afetadas.
- **Alternativa acessível:** cartões categorizados por menus.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Sinais em sequência.
- A curadoria deve evitar transformar qualquer queda de sinal em alarme de fraude.
- Procedimentos locais de operadora e empresa precisam ser definidos antes de avaliar ações específicas.

### Fontes

- [FTC — SIM swap scams: how to protect yourself](https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-protect-yourself)
- [FCC — Rules to protect consumers from SIM swap and port-out fraud](https://docs.fcc.gov/public/attachments/FCC-23-95A1.pdf)

## `concept:recovery-method-takeover` — Cadastro de novo fator, passkey ou recuperação

### Ensinamento e papel

- **Comportamento observável:** verificar toda inclusão de método, remover ou reportar o que não foi iniciado e revisar sessões e outros fatores pela área oficial.
- **Potencial pedagógico:** Alto como caso.
- **Papel recomendado:** Caso de atividade de dispositivo e recuperação.
- **Por que não basta uma explicação textual:** a pessoa precisa diferenciar método existente, novo e pendente e compreender que um fator adicionado pode manter acesso futuro.

### Dificuldades e riscos

- Alterações legítimas podem ser feitas por migração, troca de aparelho ou administração.
- Rótulos de dispositivo e passkey podem ser pouco reconhecíveis.
- Remover o método errado pode bloquear acesso legítimo.
- Ações reais dependem de autenticação, autorização e suporte.

### Formato A — Inventário de métodos

- **Área provável:** PhishLab.
- **Mecânica:** revisar métodos fictícios com data, dispositivo, origem e status, classificando conhecido, não reconhecido ou precisa confirmar.
- **Fluxo:** aviso → área oficial simulada → investigação → remoção/confirmação/reporte → debrief.
- **O que seria avaliado:** uso da origem e tratamento prudente de inconclusivos.
- **Alternativa acessível:** tabela com ações por linha e textos completos.

### Formato B — Migração legítima versus tomada de conta

- **Área provável:** Simulação.
- **Mecânica:** comparar uma troca de aparelho planejada com inclusão não solicitada, mantendo o mesmo processo de confirmação.
- **Fluxo:** dois casos → evidências → ação → comparação final.
- **O que seria avaliado:** vínculo com ação iniciada e resposta proporcional.
- **Alternativa acessível:** casos sequenciais com rádio e resumo textual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Inventário de métodos.
- A futura análise deve definir linguagem genérica para fatores, passkeys e recuperação.
- O fluxo não pode afirmar que removeu um método real.

### Fontes

- [NIST SP 800-63B — Authenticator binding and account recovery](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [FIDO Alliance — Passkeys](https://fidoalliance.org/passkeys/)

## `concept:credential-stuffing-symptom` — Prompt decorrente de tentativa com senha reutilizada

### Ensinamento e papel

- **Comportamento observável:** negar e reportar acesso não iniciado, revisar a conta pelo canal oficial e não tentar diagnosticar se a origem foi stuffing, spraying ou outra técnica.
- **Potencial pedagógico:** Controle técnico predominante.
- **Papel recomendado:** Explicação de limite dentro da atividade de MFA.
- **Por que não basta uma explicação textual:** casos com o mesmo prompt e causas distintas mostram por que o comportamento seguro independe do diagnóstico invisível.

### Dificuldades e riscos

- A causa não é observável no prompt.
- Reutilização de senha é hipótese, não conclusão sobre a pessoa.
- Logs, detecção de spraying e bloqueios são controles técnicos.
- O debrief deve evitar culpa e recomendar política corporativa sem coletar hábitos reais.

### Formato A — Mesmo sintoma, causas diferentes

- **Área provável:** PhishLab.
- **Mecânica:** três prompts idênticos recebem explicações técnicas diferentes somente depois da decisão.
- **Fluxo:** prompt → resposta → revelação de hipóteses → comportamento comum → limites.
- **O que seria avaliado:** negação/reporte do acesso não iniciado, não identificação da causa.
- **Alternativa acessível:** cartões textuais e resultado anunciado.

### Formato B — Divisão de responsabilidades

- **Área provável:** Simulação curta.
- **Mecânica:** relacionar ações do funcionário, identidade, endpoint e equipe de segurança às etapas que cada um consegue observar e conter.
- **Fluxo:** sintoma → atribuição de responsabilidades → plano conjunto → debrief.
- **O que seria avaliado:** encaminhamento correto e ausência de investigação impossível.
- **Alternativa acessível:** tabela de responsabilidades com seletores.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Mesmo sintoma, causas diferentes, como explicação não pontuada da causa.
- O conceito não justifica atividade própria.
- A análise futura deve garantir que o texto não atribua reutilização de senha sem evidência.

### Fontes

- [MITRE ATT&CK — Credential Stuffing](https://attack.mitre.org/techniques/T1110/004/)
- [NIST SP 800-63B — Authentication threats](https://pages.nist.gov/800-63-4/sp800-63b/security/)

## `concept:passkey-fido` — Passkeys e FIDO resistentes a phishing

### Ensinamento e papel

- **Comportamento observável:** compreender por que autenticação vinculada ao verificador reduz phishing e seguir o fluxo oficial, sem usar a presença ou ausência de passkey como veredito sobre uma mensagem.
- **Potencial pedagógico:** Baixo como atividade própria; alto valor como explicação protetiva.
- **Papel recomendado:** Conceito complementar e controle técnico.
- **Por que não basta uma explicação textual:** uma comparação interativa pode mostrar a diferença entre segredo digitável e credencial vinculada ao domínio, mas implantação não é ação do funcionário.

### Dificuldades e riscos

- Nem toda passkey é vinculada ao mesmo tipo de dispositivo ou política.
- Fluxos de recuperação continuam relevantes.
- O usuário pode interpretar falha de passkey como prova de fraude, embora existam causas técnicas benignas.
- A proteção depende da adoção organizacional e do provedor.

### Formato A — Segredo que viaja versus chave vinculada

- **Área provável:** PhishLab.
- **Mecânica:** comparar, de modo abstrato, senha/OTP que podem ser retransmitidos com autenticação vinculada ao verificador.
- **Fluxo:** dois fluxos → tentativa em domínio diferente → resultado explicado → limites de recuperação.
- **O que seria avaliado:** compreensão conceitual, não configuração ou uso de credencial real.
- **Alternativa acessível:** diagrama acompanhado de lista textual equivalente.

### Formato B — Falha sem diagnóstico precipitado

- **Área provável:** Simulação curta.
- **Mecânica:** passkey não é oferecida em casos de domínio diferente, dispositivo novo e configuração incompleta; a pessoa escolhe a rota oficial em todos.
- **Fluxo:** três casos → decisão → causas reveladas → debrief sobre pista e falso positivo.
- **O que seria avaliado:** não contornar o processo e não transformar a pista em certeza.
- **Alternativa acessível:** casos em texto com ações por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Segredo que viaja versus chave vinculada, como explicação complementar.
- A futura análise deve alinhar termos à implantação real da organização.
- Nenhuma passkey, biometria ou API WebAuthn deve ser acionada no estudo.

### Fontes

- [FIDO Alliance — Passkeys](https://fidoalliance.org/passkeys/)
- [NIST SP 800-63B — Phishing resistance](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)

## `concept:password-manager` — Gerenciador de senhas vinculado ao domínio

### Ensinamento e papel

- **Comportamento observável:** interpretar ausência de preenchimento como motivo para pausar e conferir domínio e rota, nunca como prova isolada de phishing.
- **Potencial pedagógico:** Médio.
- **Papel recomendado:** Conceito complementar e caso de transferência.
- **Por que não basta uma explicação textual:** casos com configurações diferentes calibram o valor da pista sem desestimular o uso do gerenciador.

### Dificuldades e riscos

- Autofill pode estar desativado, a conta pode não estar salva ou o formulário pode ser incompatível.
- Um gerenciador pode preencher em domínios relacionados conforme configuração.
- Preenchimento não comprova que o pedido, a sessão ou a ação são autorizados.
- O treinamento não acessa o gerenciador nem credenciais do navegador.

### Formato A — Dois logins, uma credencial salva

- **Área provável:** PhishLab.
- **Mecânica:** representar que o gerenciador oferece credencial numa origem conhecida e não em outra, combinando isso com URL e rota.
- **Fluxo:** página A → pista → página B → pista → decisão e debrief.
- **O que seria avaliado:** pausa e verificação da origem, não estado do autofill.
- **Alternativa acessível:** mensagens textuais “oferecido/não oferecido”, sem integração real.

### Formato B — Calibração de pista

- **Área provável:** Simulação curta.
- **Mecânica:** explicar depois da decisão quatro causas possíveis para ausência de preenchimento, incluindo uma maliciosa e três benignas.
- **Fluxo:** caso → ação → causas → escolha da rota segura comum.
- **O que seria avaliado:** tratamento como indício e uso de referência oficial.
- **Alternativa acessível:** lista de causas e conclusão por rádio.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Calibração de pista.
- Deve permanecer complementar a URL e página, não atividade isolada.
- A análise futura precisa evitar qualquer acesso à extensão ou ao armazenamento de senhas.

### Fontes

- [Google Chrome Help — How Chrome protects autofill and password data](https://support.google.com/chrome/answer/14271924)
- [NIST SP 800-63B — Password managers](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)

## `concept:session-review-revoke` — Revisão e revogação de sessões ou aplicativos

### Ensinamento e papel

- **Comportamento observável:** identificar o tipo de exposição, abrir a área oficial, revisar sessões, dispositivos e consentimentos e acionar a revogação ou suporte adequado.
- **Potencial pedagógico:** Alto.
- **Papel recomendado:** Atividade de recuperação e transferência comum às três atividades do conjunto.
- **Por que não basta uma explicação textual:** sessão, aplicativo e dispositivo exigem ações diferentes; a pessoa precisa montar resposta proporcional sem supor que uma troca de senha resolve tudo.

### Dificuldades e riscos

- Interfaces, permissões e capacidade de autoatendimento variam.
- Revogação pode não ser instantânea nem alcançar sessão própria de terceiro.
- Um item desconhecido pode ser dispositivo renomeado ou sessão antiga legítima.
- Nenhum botão pode afirmar que revogou acesso real.

### Formato A — Central de segurança simulada

- **Área provável:** Missão.
- **Mecânica:** revisar lista de sessões, dispositivos e aplicativos depois de um incidente declarado, escolhendo confirmar, encerrar ou escalar.
- **Fluxo:** exposição → área oficial → investigação → ações → reporte → debrief.
- **O que seria avaliado:** correspondência entre exposição e ações, tratamento de inconclusivos e reporte.
- **Alternativa acessível:** listas e tabelas com ações textuais por item.

### Formato B — Matriz exposição–contenção

- **Área provável:** PhishLab.
- **Mecânica:** relacionar credencial, MFA, sessão, consentimento e dispositivo às ações que reduzem cada risco.
- **Fluxo:** demonstração → associação → caso independente → explicação de dependências e limites.
- **O que seria avaliado:** seleção proporcional e reconhecimento de que ações podem ser cumulativas.
- **Alternativa acessível:** menus por linha, sem arrastar.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Central de segurança simulada.
- A futura análise depende da divisão de responsabilidades entre funcionário e equipe de identidade.
- Os textos precisam dizer “solicitar” ou “simular”, nunca confirmar efeito externo.

### Fontes

- [Microsoft Learn — Revoke user access in an emergency](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access)
- [Microsoft Learn — App consent grant investigation](https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-app-consent)
