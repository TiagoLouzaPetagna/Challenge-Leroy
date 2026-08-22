# Estudo de formatos — reporte, recuperação e proteção coletiva

> **Estado:** pesquisa; não aprovado para implementação.

Este documento converte todos os conceitos canônicos do conjunto 08 em hipóteses pedagógicas. O princípio comum é reconstruir o que realmente aconteceu, parar a interação, preservar fatos, usar o canal oficial e aplicar resposta proporcional sem culpa nem compartilhamento de segredos; não há definição de atividade, rota, recompensa ou viabilidade técnica.

## Resumo de cobertura

| Conceito | Potencial pedagógico | Papel recomendado |
|---|---|---|
| `concept:no-blame-reporting` | Alto | fundamento transversal |
| `concept:report-preserve` | Alto | atividade/complementar |
| `concept:do-not-delete-forward` | Médio | caso/explicação de procedimento |
| `concept:opened-message-response` | Médio | caso de contraste |
| `concept:clicked-link-response` | Alto | caso |
| `concept:credential-response` | Alto | caso de recuperação |
| `concept:otp-mfa-response` | Alto | caso de recuperação |
| `concept:oauth-response` | Médio | explicação de limite/caso |
| `concept:device-link-response` | Médio | explicação de limite/caso |
| `concept:file-execution-response` | Alto | caso de contenção |
| `concept:command-response` | Alto | caso de contenção |
| `concept:remote-access-response` | Alto | caso de contenção |
| `concept:data-disclosure-response` | Alto | caso de privacidade |
| `concept:payment-response` | Alto | caso de resposta financeira |
| `concept:account-recovery` | Alto | atividade de síntese/explicação de limite |
| `concept:report-without-secrets` | Alto | fundamento transversal |
| `concept:uncertain-reporting` | Alto | caso transversal |
| `concept:extortion-response` | Alto | caso sensível opcional |
| `concept:collective-protection` | Alto | síntese |
| `concept:incident-causality` | Alto | atividade de síntese |

## `concept:no-blame-reporting` — Cultura de reporte sem culpa

### Ensinamento e papel

- **Comportamento observável:** relatar cedo o que ocorreu, inclusive clique ou erro próprio, usando linguagem factual sem esconder, minimizar ou acusar pessoas.
- **Potencial pedagógico:** Alto; **papel recomendado:** fundamento transversal de toda recuperação.
- Uma experiência com consequência acolhedora é necessária: um texto dizendo “reporte sem medo” perde credibilidade se a interface pontua culpa, vergonha ou perfeição.

### Dificuldades e riscos

- O portal não pode prometer proteção institucional que ainda não foi formalmente adotada.
- Relato sem culpa não elimina investigação, responsabilidade de processo ou apoio à vítima.
- Não exibir ranking de cliques, constranger publicamente nem usar tempo de reporte como punição.

### Formato A — O relato abre ajuda

- **Área provável:** Missão.
- **Mecânica:** após uma decisão equivocada narrada, escolher contar os fatos e observar uma resposta de apoio e contenção.
- **Fluxo:** incidente → percepção → reporte → ações da equipe → debrief sem culpa.
- **O que seria avaliado:** completude factual e disposição para reportar, não o erro anterior.
- **Alternativa acessível:** narrativa textual sem cronômetro ou exposição pública.

### Formato B — O que eu conto agora?

- **Área provável:** PhishLab reflexivo.
- **Mecânica:** reconstruir um relato próprio após um erro fictício, distinguindo fatos úteis de versões que escondem, minimizam ou culpam.
- **Fluxo:** incidente narrado → impulso de ocultar → seleção dos fatos → relato pelo canal oficial → debrief.
- **O que seria avaliado:** reportar sem adiar, não omitir o erro e usar linguagem factual sem autoacusação.
- **Alternativa acessível:** blocos de texto selecionáveis por teclado, com versão linear equivalente.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** o relato abre ajuda; reutilizar debrief de contenção.
- RH, Segurança e liderança devem aprovar a promessa institucional e o tom; futuramente, verificar que métricas não reintroduzem culpa.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [NCSC — Developing a positive cyber security culture](https://www.ncsc.gov.uk/collection/board-toolkit/principle-c-people/developing-a-positive-cyber-security-culture)

## `concept:report-preserve` — Preservação de contexto

### Ensinamento e papel

- **Comportamento observável:** registrar canal, horário, remetente/conta, assunto, destino aparente e ações realizadas, preservando o item conforme procedimento.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de construção de reporte e complemento de todos os incidentes.
- A prática ensina a diferença entre fato útil e interpretação, além de quais detalhes podem se perder depois.

### Dificuldades e riscos

- Preservar não significa coletar dados excessivos, investigar logs ou fazer captura contendo segredo.
- Procedimentos de retenção e evidência variam por organização.
- Não pedir que o usuário abra novamente link/arquivo ou repita a ação para obter detalhes.

### Formato A — Kit mínimo de fatos

- **Área provável:** PhishLab.
- **Mecânica:** selecionar de um caso os fatos úteis e descartar opinião, segredo e dado irrelevante.
- **Fluxo:** incidente → inventário → pacote de reporte → feedback.
- **O que seria avaliado:** relevância, origem e segurança da informação preservada.
- **Alternativa acessível:** checkboxes com descrições completas.

### Formato B — Memória que se apaga

- **Área provável:** Missão narrativa.
- **Mecânica:** reconstruir a linha do incidente a partir de registros disponíveis sem revisitar o artefato perigoso.
- **Fluxo:** percepção tardia → histórico fictício → linha temporal → reporte.
- **O que seria avaliado:** honestidade sobre lacunas e não fabricação de detalhes.
- **Alternativa acessível:** lista cronológica sem efeito de desaparecimento obrigatório.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** kit mínimo de fatos; reutilizar construtor de reporte.
- Segurança e Privacidade devem definir campos mínimos e retenção; futuramente, impedir anexos ou capturas reais.

### Fontes

- [CISA — Federal Government Cybersecurity Incident and Vulnerability Response Playbooks](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)
- [Microsoft Support — Protect yourself from phishing](https://support.microsoft.com/en-US/security/protect-yourself-from-phishing)

## `concept:do-not-delete-forward` — Não apagar nem encaminhar indiscriminadamente

### Ensinamento e papel

- **Comportamento observável:** usar a função/canal de reporte definido sem apagar antes da preservação nem encaminhar o conteúdo a colegas ou endereço improvisado.
- **Potencial pedagógico:** Médio; **papel recomendado:** caso e explicação dependente do procedimento corporativo.
- A comparação prática é importante porque “encaminhe para avisar” e “apague logo” parecem intuitivos, mas podem ampliar exposição ou remover contexto.

### Dificuldades e riscos

- Alguns canais oficiais exigem encaminhamento ou removem a mensagem após o reporte; a regra é seguir o mecanismo autorizado, não “nunca encaminhar/apagar”.
- Manter conteúdo perigoso indefinidamente também não é objetivo.
- Não pedir reabertura de anexo, link ou conversa.

### Formato A — Botão oficial, grupo informal

- **Área provável:** Missão curta.
- **Mecânica:** escolher entre reporte integrado fictício, encaminhamento a colegas, exclusão imediata e canal não configurado.
- **Fluxo:** item suspeito → preservação mínima → canal → tratamento posterior explicado.
- **O que seria avaliado:** uso do procedimento e não disseminação.
- **Alternativa acessível:** ações em lista com descrições, sem ícones isolados.

### Formato B — Cadeia de custódia cotidiana

- **Área provável:** PhishLab.
- **Mecânica:** ordenar o que acontece com uma mensagem depois do reporte, distinguindo ações do usuário e da equipe.
- **Fluxo:** descoberta → preservar → reportar → análise → remoção autorizada.
- **O que seria avaliado:** fronteira de responsabilidade, não técnica forense.
- **Alternativa acessível:** ordenação por botões e lista numerada.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** botão oficial, grupo informal; reutilizar seletor de canal.
- O procedimento precisa estar configurado antes de substituir o estado genérico; futuramente, verificar comportamento sem encaminhar mensagem real.

### Fontes

- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)
- [CISA — Federal Government Cybersecurity Incident and Vulnerability Response Playbooks](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)

## `concept:opened-message-response` — Apenas abriu a mensagem

### Ensinamento e papel

- **Comportamento observável:** distinguir abertura de mensagem de clique, envio de dado, download ou execução; preservar e seguir orientação sem afirmar comprometimento automático.
- **Potencial pedagógico:** Médio; **papel recomendado:** caso de contraste na linha do incidente.
- A prática reduz pânico e respostas desproporcionais, mas mantém espaço para particularidades técnicas e política corporativa.

### Dificuldades e riscos

- Alguns clientes carregam conteúdo remoto e ataques raros podem não exigir clique; o usuário não deve diagnosticar impacto técnico.
- “Só abriu” precisa ser verdadeiro, não pressuposto por memória incompleta.
- Não ensinar que nenhuma ação ou reporte jamais é necessário.

### Formato A — Até onde você chegou?

- **Área provável:** PhishLab.
- **Mecânica:** marcar a última ação realmente realizada numa linha de exposição.
- **Fluxo:** relato → eventos possíveis → seleção → resposta proporcional.
- **O que seria avaliado:** precisão causal e ausência de etapas inventadas.
- **Alternativa acessível:** lista de eventos com opção “não sei”.

### Formato B — Mesma mensagem, exposições diferentes

- **Área provável:** Simulação.
- **Mecânica:** comparar três personagens que abriram, clicaram ou forneceram dado.
- **Fluxo:** casos paralelos → planos → diferenças → síntese.
- **O que seria avaliado:** não aplicar a mesma resposta a todos.
- **Alternativa acessível:** tabela comparativa e leitura sequencial.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** mesma mensagem, exposições diferentes; reutilizar classificador de incidente.
- Segurança deve validar a orientação local; futuramente, apresentar exceções técnicas apenas no debrief, sem alarmismo.

### Fontes

- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:clicked-link-response` — Clicou sem fornecer dado nem instalar algo

### Ensinamento e papel

- **Comportamento observável:** fechar a rota suspeita, não continuar, registrar destino/contexto e reportar conforme procedimento, informando claramente que não houve dado ou execução conhecidos.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso central de resposta proporcional.
- O aluno precisa praticar interromper a cadeia e relatar sem pânico nem falsa certeza sobre o dispositivo.

### Dificuldades e riscos

- O usuário pode não saber se houve download automático ou exploração; a opção “não sei” precisa existir.
- Orientação de varredura/isolamento varia conforme dispositivo e equipe.
- Não reabrir o link para copiá-lo nem simular navegação externa.

### Formato A — Cliquei. E agora?

- **Área provável:** Missão.
- **Mecânica:** distribuir ações entre “faça agora”, “faça em seguida” e “não faça”.
- **Fluxo:** clique → parada → fatos → canal oficial → monitoramento orientado.
- **O que seria avaliado:** interrupção, reporte preciso e ausência de ação destrutiva improvisada.
- **Alternativa acessível:** categorização por seletores, sem arraste.

### Formato B — Página fechada, relato aberto

- **Área provável:** PhishLab.
- **Mecânica:** construir um relato a partir do histórico fictício do navegador sem revisitar o destino.
- **Fluxo:** evento → registro disponível → campos mínimos → plano proporcional.
- **O que seria avaliado:** preservar o que existe e reconhecer incerteza.
- **Alternativa acessível:** histórico em tabela e navegação por teclado.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** cliquei. E agora?; reutilizar montador de ações.
- Segurança deve definir ações por dispositivo; futuramente, nenhum link de caso pode sair do ambiente inerte.

### Fontes

- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)
- [Ministério da Justiça — Cliquei em link suspeito](https://www.gov.br/mj/pt-br/acesso-a-informacao/acoes-e-programas/sofri-um-golpe-e-agora/cliquei-em-links/)

## `concept:credential-response` — Informou usuário ou senha

### Ensinamento e papel

- **Comportamento observável:** reportar imediatamente, abrir recuperação por rota oficial, alterar a credencial afetada conforme orientação e informar reutilização sem revelar a senha.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de recuperação e ponte para sessões/contas.
- A interação deve mostrar que reportar e recuperar são ações complementares e que a senha nunca precisa aparecer no relato.

### Dificuldades e riscos

- Alterar senha pode não revogar sessão, token, permissão ou regra de caixa.
- O procedimento muda entre conta pessoal, corporativa e serviço federado.
- Nenhum campo pode aceitar senha real, antiga ou fictícia parecida com a usada pelo participante.
- O treinamento não deve pedir nem persistir uma lista das contas reais do participante; qualquer mapa de reutilização usa exclusivamente uma persona e categorias fictícias.

### Formato A — Rota oficial de recuperação

- **Área provável:** Missão.
- **Mecânica:** sair da página recebida e navegar numa central fictícia para selecionar conta e ação proporcional.
- **Fluxo:** credencial informada → reporte → serviço aberto independentemente → recuperação → revisão de sessões.
- **O que seria avaliado:** origem da rota e cobertura da conta afetada.
- **Alternativa acessível:** árvore textual sem campos de senha.

### Formato B — Onde mais esta chave cabia na história?

- **Área provável:** PhishLab.
- **Mecânica:** mapear, em uma persona totalmente fictícia, a reutilização narrada por categorias genéricas de conta, sem pedir credencial ou inventário do participante.
- **Fluxo:** exposição fictícia → categorias potencialmente afetadas → ordem de proteção → reporte.
- **O que seria avaliado:** abrangência e não compartilhamento do segredo.
- **Alternativa acessível:** checkboxes de categorias fictícias e instruções textuais.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** rota oficial; reutilizar árvore de recuperação.
- Identidade/Segurança devem definir etapas locais; uma eventual análise técnica deverá proibir entrada ou persistência de segredo e de inventário real das contas do participante.

### Fontes

- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)
- [Microsoft Support — Protect yourself from phishing](https://support.microsoft.com/en-US/security/protect-yourself-from-phishing)

## `concept:otp-mfa-response` — Compartilhou OTP ou aprovou MFA

### Ensinamento e papel

- **Comportamento observável:** negar novos eventos não iniciados, reportar como possível acesso e revisar sessões/métodos pela área oficial conforme orientação.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de tomada de conta e recuperação.
- O ensaio precisa separar “senha não foi dada” de “acesso pode ter sido autorizado” e praticar resposta sem exigir perícia sobre tokens.

### Dificuldades e riscos

- MFA varia: código, push, número, passkey e chave têm respostas diferentes.
- Aprovação acidental não prova que o atacante concluiu acesso, mas exige tratamento.
- Não gerar nem solicitar OTP real e não simular notificação do autenticador instalado.

### Formato A — Você iniciou este acesso?

- **Área provável:** Missão.
- **Mecânica:** reconstruir uma sequência de prompts, negar os não iniciados e escolher rota oficial de revisão.
- **Fluxo:** aprovação narrada → novos eventos → negação → reporte → sessões/métodos.
- **O que seria avaliado:** vínculo com ação iniciada e recuperação proporcional.
- **Alternativa acessível:** eventos em texto, sem push, vibração ou tempo real.

### Formato B — Senha, código e sessão

- **Área provável:** PhishLab.
- **Mecânica:** relacionar cada item ao que pode conceder e às respostas que ainda faltam.
- **Fluxo:** cartões conceituais → mapa de impacto → plano → debrief.
- **O que seria avaliado:** não minimizar OTP/MFA nem assumir remediação por troca de senha isolada.
- **Alternativa acessível:** tabela de relações.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** você iniciou este acesso?; reutilizar console de eventos.
- Identidade deve validar tipos e ações; futuramente, manter códigos obviamente inertes e desconectados.

### Fontes

- [FTC — What's a verification code and why would someone ask for it?](https://consumer.ftc.gov/consumer-alerts/2024/03/whats-verification-code-why-would-someone-ask-me-it)
- [NIST — SP 800-63B, authentication threats](https://pages.nist.gov/800-63-4/sp800-63b/security/)

## `concept:oauth-response` — Concedeu permissão OAuth

### Ensinamento e papel

- **Comportamento observável:** reportar a concessão, abrir a gestão oficial de aplicativos e solicitar/revogar o consentimento conforme autorização; entender que trocar apenas a senha pode não retirar o acesso.
- **Potencial pedagógico:** Médio; **papel recomendado:** explicação de limite com caso guiado, pois investigação e desativação podem exigir administrador.
- O portal deve explicar a persistência por permissão sem fingir que o usuário consegue avaliar a malícia do aplicativo ou remediar o tenant.

### Dificuldades e riscos

- Aplicativos legítimos pedem permissões amplas por função; nome conhecido não prova segurança.
- Revogação do usuário e desativação administrativa não são equivalentes.
- Não conectar a aplicativos reais nem representar a troca de senha como solução completa.

### Formato A — Acesso que ficou depois da senha

- **Área provável:** PhishLab explicativo.
- **Mecânica:** comparar credencial, sessão e consentimento em uma matriz de “o que cada ação remove”.
- **Fluxo:** concessão → troca de senha narrada → acesso ainda possível → reporte/revogação orientada.
- **O que seria avaliado:** escolher a categoria correta de recuperação, não detectar app malicioso.
- **Alternativa acessível:** tabela textual com glossário.

### Formato B — Inventário de permissões

- **Área provável:** Missão guiada.
- **Mecânica:** localizar um aplicativo fictício numa área oficial inerte e montar um pedido de revisão para a equipe.
- **Fluxo:** fato ocorrido → navegação independente → permissões concedidas → reporte → ação administrativa explicada.
- **O que seria avaliado:** rota oficial e informação útil sem revogação real.
- **Alternativa acessível:** lista de aplicativos fictícios e botões inertes.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** acesso que ficou; reutilizar matriz de recuperação.
- Identidade deve definir quem pode revogar e quais termos usar; futuramente, nenhuma integração com consentimento real.

### Fontes

- [Microsoft Learn — Protect against consent phishing](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/protect-against-consent-phishing)
- [Microsoft Learn — App consent grant investigation](https://learn.microsoft.com/en-us/security/operations/incident-response-playbook-app-consent)

## `concept:device-link-response` — Vinculou dispositivo ou método de acesso

### Ensinamento e papel

- **Comportamento observável:** reportar o vínculo não reconhecido e revisar/remover dispositivo ou método pela área oficial, com apoio quando a origem não puder ser confirmada.
- **Potencial pedagógico:** Médio; **papel recomendado:** explicação de limite e caso de recuperação.
- O comportamento ensinável é reconhecer que aprovar um código pode autorizar outra sessão/dispositivo; não identificar o atacante ou o token.

### Dificuldades e riscos

- Fluxos legítimos de código de dispositivo existem para equipamentos com entrada limitada.
- A página de autenticação pode ser legítima enquanto o código foi iniciado pelo atacante.
- Remoção, revogação de tokens e reautenticação dependem da plataforma e talvez de administrador.

### Formato A — De qual dispositivo veio este código?

- **Área provável:** Missão.
- **Mecânica:** relacionar o código a uma ação iniciada e, após vínculo narrado, navegar para revisão oficial fictícia.
- **Fluxo:** código recebido → origem não iniciada → exposição → reporte → dispositivos/sessões.
- **O que seria avaliado:** vínculo entre intenção e autorização, além da rota de recuperação.
- **Alternativa acessível:** texto sem QR, código real ou segundo dispositivo.

### Formato B — Vínculo legítimo, dispositivo errado

- **Área provável:** PhishLab.
- **Mecânica:** depois de um vínculo narrado, abrir uma área oficial fictícia, comparar dispositivos e métodos registrados e encaminhar o item não reconhecido para remoção/revisão.
- **Fluxo:** vínculo narrado → acesso independente à conta → inventário de dispositivos/métodos → reporte e ação assistida → limite técnico.
- **O que seria avaliado:** uso da rota oficial, identificação do vínculo não reconhecido e pedido de apoio sem assumir que a revogação local resolveu todo o acesso.
- **Alternativa acessível:** lista textual de dispositivos e métodos com ações por botões.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** vínculo legítimo, dispositivo errado; reutilizar inventário fictício de sessões e métodos.
- Identidade deve validar recuperação; futuramente, todos os códigos devem ser não funcionais e claramente confinados ao cenário.

### Fontes

- [Microsoft — Storm-2372 device code phishing](https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/)
- [Microsoft — Inside an AI-enabled device code phishing campaign](https://www.microsoft.com/en-us/security/blog/2026/04/06/ai-enabled-device-code-phishing-campaign-april-2026/)

## `concept:file-execution-response` — Abriu ou executou arquivo

### Ensinamento e papel

- **Comportamento observável:** interromper o trabalho, não tentar “limpar” ou continuar explorando e acionar suporte/segurança pelo canal oficial com fatos sobre arquivo e ações.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de contenção de dispositivo.
- A prática deve distinguir visualizar, baixar, abrir e executar, pois cada palavra muda o plano sem permitir diagnóstico autônomo.

### Dificuldades e riscos

- “Abrir” pode significar visualização segura, execução de macro ou lançamento de programa; o relato precisa ser específico.
- Desconectar rede, desligar ou rodar ferramenta depende da orientação local; uma regra universal pode destruir evidência ou ampliar dano.
- Nenhum arquivo executável ou macro deve existir no treinamento.

### Formato A — O arquivo parou onde?

- **Área provável:** Missão.
- **Mecânica:** reconstruir download, abertura, aviso, permissão e execução e selecionar o canal de contenção.
- **Fluxo:** arquivo inerte → eventos narrados → última ação → reporte → instrução da equipe.
- **O que seria avaliado:** precisão e parada imediata, não remediação técnica.
- **Alternativa acessível:** linha de eventos em lista.

### Formato B — Cartões de contenção

- **Área provável:** PhishLab.
- **Mecânica:** separar “faça agora”, “somente se orientado” e “não faça” para diferentes exposições.
- **Fluxo:** caso → categorização → dependências locais → debrief.
- **O que seria avaliado:** reconhecer limite e pedir ajuda.
- **Alternativa acessível:** seletores no lugar de arraste.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** o arquivo parou onde?; reutilizar linha do incidente.
- Suporte/Segurança devem definir instruções por dispositivo; futuramente, garantir artefatos apenas descritivos e inertes.

### Fontes

- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)
- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)

## `concept:command-response` — Colou ou executou comando

### Ensinamento e papel

- **Comportamento observável:** parar de seguir instruções, não executar comando de reversão fornecido pelo mesmo contato e acionar imediatamente o canal oficial, relatando texto e contexto sem repeti-lo em terminal.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de contenção e transferência de falso CAPTCHA/suporte.
- A simulação precisa tornar clara a diferença entre copiar texto e executá-lo, sem disponibilizar comando funcional.

### Dificuldades e riscos

- Comandos legítimos existem em suporte autorizado; o problema é origem, autorização e impacto.
- Pedir ao usuário que copie o comando para o reporte pode fazê-lo executar ou divulgar segredo.
- Resposta técnica varia por sistema e privilégio.

### Formato A — A instrução saiu do navegador

- **Área provável:** Missão.
- **Mecânica:** reconstruir uma cadeia de falso CAPTCHA ou tutorial que leva ao terminal fictício.
- **Fluxo:** página → copiar → executar narrado → parar → reporte/suporte.
- **O que seria avaliado:** reconhecer a mudança de superfície e não tentar desfazer sozinho.
- **Alternativa acessível:** narrativa textual; nenhum terminal editável.

### Formato B — Plano depois do comando

- **Área provável:** PhishLab.
- **Mecânica:** diante de uma execução já narrada, separar ações entre “pare agora”, “somente com orientação” e “não tente”, sem mostrar sintaxe copiável.
- **Fluxo:** execução fictícia → efeitos ainda incertos → classificação das respostas → canal oficial → debrief.
- **O que seria avaliado:** interromper, não executar um comando de reversão do mesmo contato e pedir contenção especializada.
- **Alternativa acessível:** tabela textual com seleção por botões e nenhuma instrução executável.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** a instrução saiu do navegador; reutilizar linha causal.
- Suporte deve validar linguagem e proibir comandos reais; futuramente, impedir seleção/cópia de qualquer cadeia parecida com instrução executável.

### Fontes

- [FTC — How to spot a CAPTCHA scam](https://consumer.ftc.gov/consumer-alerts/2026/06/how-spot-captcha-scam)
- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)

## `concept:remote-access-response` — Concedeu acesso remoto

### Ensinamento e papel

- **Comportamento observável:** interromper a interação quando seguro, não fornecer novas credenciais/pagamentos e acionar suporte/segurança oficial por dispositivo ou canal confiável.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de contenção multicanal.
- A prática deve mostrar que fechar a chamada não necessariamente encerra sessão, software, conta ou pagamento e que a equipe precisa orientar a contenção.

### Dificuldades e riscos

- “Encerrar quando seguro” depende do que está sendo controlado e das orientações locais.
- O usuário pode não saber se software foi instalado, sessão continua ou dados foram vistos.
- Não simular controle remoto real nem instruir remoção improvisada.

### Formato A — Quem ainda controla a tela?

- **Área provável:** Missão.
- **Mecânica:** reconstruir instalação, permissão, sessão e ações observadas antes de chamar suporte oficial.
- **Fluxo:** falso suporte → acesso narrado → parada segura → outro canal/dispositivo → reporte.
- **O que seria avaliado:** não continuar obedecendo e fornecer fatos sem diagnóstico.
- **Alternativa acessível:** conversa e eventos em texto, sem animação da tela.

### Formato B — Superfícies afetadas

- **Área provável:** PhishLab.
- **Mecânica:** mapear dispositivo, conta, banco e dados potencialmente expostos para acionar áreas apropriadas.
- **Fluxo:** relato → mapa de ativos → prioridades → plano coordenado.
- **O que seria avaliado:** abrangência e limite de certeza.
- **Alternativa acessível:** checklist hierárquico em vez de mapa visual.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** superfícies afetadas; reutilizar mapa de ativos.
- Suporte, Segurança e Financeiro devem definir rotas; futuramente, nenhuma ferramenta de acesso remoto pode ser aberta pelo cenário.

### Fontes

- [FTC — How to spot, avoid, and report tech support scams](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams)
- [FTC — Tech support scams](https://consumer.ftc.gov/features/pass-it-on/impersonator-scams/tech-support-scams)

## `concept:data-disclosure-response` — Enviou dado pessoal ou corporativo

### Ensinamento e papel

- **Comportamento observável:** reportar quais categorias de dado, de quem, por qual canal e para qual destino foram enviadas, sem reproduzir no relato o conteúdo secreto desnecessário.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de privacidade e classificação de exposição.
- Um construtor de relato pode ensinar precisão — “cópia de documento” versus o número completo — e acionar a área adequada.

### Dificuldades e riscos

- Sensibilidade e obrigação de notificação dependem do dado, titular, jurisdição e contexto.
- O funcionário não deve fazer avaliação jurídica nem contactar pessoas afetadas sem orientação.
- Não coletar dado pessoal real no exercício.

### Formato A — Categoria, não segredo

- **Área provável:** PhishLab.
- **Mecânica:** transformar exemplos fictícios em categorias e fatos mínimos para reporte.
- **Fluxo:** exposição → categoria/titular/destino → revisão de minimização → envio fictício.
- **O que seria avaliado:** utilidade e ausência de repetição desnecessária.
- **Alternativa acessível:** seletores e texto pré-definido; nenhum campo livre para dados reais.

### Formato B — Quem precisa saber?

- **Área provável:** Missão.
- **Mecânica:** encaminhar o caso a Segurança, Privacidade, RH ou Financeiro conforme ativos afetados, admitindo múltiplas áreas.
- **Fluxo:** relato → mapa de impacto → rotas oficiais → resposta coordenada.
- **O que seria avaliado:** escalada apropriada sem divulgação ampla.
- **Alternativa acessível:** lista de áreas com descrição de função.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** categoria, não segredo; reutilizar classificador de dados.
- Privacidade/Jurídico devem definir categorias e destinatários; futuramente, evitar campos livres e persistência de conteúdo sensível.

### Fontes

- [CERT.br — Golpes: o que fazer](https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf)
- [Ministério da Justiça — Cliquei em link suspeito](https://www.gov.br/mj/pt-br/acesso-a-informacao/acoes-e-programas/sofri-um-golpe-e-agora/cliquei-em-links/)

## `concept:payment-response` — Realizou pagamento

### Ensinamento e papel

- **Comportamento observável:** interromper novo contato, acionar imediatamente Financeiro e a instituição por canal oficial, preservar transação/conversa e reportar sem prometer recuperação.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso de resposta financeira integrado ao conjunto 07.
- A prática deve diferenciar meio de pagamento e rota aplicável, mantendo como comportamento comum agir cedo e não enviar mais dinheiro.

### Dificuldades e riscos

- Pix, boleto, cartão, transferência e cripto têm mecanismos, prazos e probabilidades diferentes.
- Reporte interno não substitui banco, autoridade ou procedimento jurídico; o portal não pode iniciar nenhuma dessas ações.
- Não pontuar velocidade com cronômetro nem prometer estorno/MED.

### Formato A — Primeira hora sem relógio

- **Área provável:** Missão.
- **Mecânica:** ordenar ações imediatas por dependência, sem pressão temporal artificial.
- **Fluxo:** pagamento percebido → parar → instituição/Financeiro → evidências → reporte adicional.
- **O que seria avaliado:** sequência, canais e ausência de pagamento complementar.
- **Alternativa acessível:** lista ordenável por botões.

### Formato B — Meio de pagamento, rota de resposta

- **Área provável:** PhishLab.
- **Mecânica:** associar casos fictícios a contatos e limites apropriados, incluindo “procedimento não configurado”.
- **Fluxo:** casos → meio → canal oficial → expectativa realista.
- **O que seria avaliado:** escolha da rota sem garantia de resultado.
- **Alternativa acessível:** matriz textual com glossário.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** primeira hora sem relógio; reutilizar montador de resposta.
- Financeiro/Jurídico devem validar cada meio e canal; futuramente, manter contatos genéricos até configuração autorizada.

### Fontes

- [Banco Central — Segurança no Pix](https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca)
- [CERT.br — Golpes: o que fazer](https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf)

## `concept:account-recovery` — Recuperação de conta e sessão

### Ensinamento e papel

- **Comportamento observável:** abrir o serviço independentemente e aplicar, com orientação, medidas específicas para credencial, sessão, método, permissão, dispositivo e regras de conta.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de síntese com explicações de limite administrativo.
- A interação é necessária para desfazer o modelo frágil “trocar senha resolve tudo”, mas não deve fingir que o usuário possui todas as permissões de remediação.

### Dificuldades e riscos

- Plataformas e privilégios variam; algumas ações pertencem ao administrador.
- Encerrar sessões pode afetar trabalho e não remover aplicativo, regra ou dispositivo.
- Não conectar a conta real, pedir segredo ou afirmar que uma lista genérica encerrou o incidente.

### Formato A — Matriz de persistência

- **Área provável:** PhishLab.
- **Mecânica:** relacionar tipo de exposição ao que pode permanecer após troca de senha.
- **Fluxo:** incidente → credencial/sessão/permissão/método → ações correspondentes → limite da função.
- **O que seria avaliado:** cobertura proporcional e escalada administrativa.
- **Alternativa acessível:** tabela “exposição / pode persistir / quem trata”.

### Formato B — Central de recuperação inerte

- **Área provável:** Missão.
- **Mecânica:** navegar numa área fictícia, selecionar eventos não reconhecidos e montar solicitação à equipe.
- **Fluxo:** reporte → conta → sessões/apps/métodos → seleção → resumo.
- **O que seria avaliado:** rota independente e identificação da categoria correta.
- **Alternativa acessível:** árvore textual sem campos de autenticação.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** matriz de persistência; reutilizar no conjunto 04.
- Identidade/Segurança devem aprovar capacidades por papel; futuramente, a central deve ser completamente desconectada dos serviços reais.

### Fontes

- [Microsoft Learn — Respond to a compromised email account](https://learn.microsoft.com/en-us/defender-office-365/responding-to-a-compromised-email-account)
- [gov.br — Segurança da conta](https://www.gov.br/governodigital/pt-br/identidade/conta-gov-br/seguranca-da-conta/seguranca-da-conta)

## `concept:report-without-secrets` — Reporte sem senha, OTP ou código

### Ensinamento e papel

- **Comportamento observável:** informar que um segredo foi exposto, sua categoria e o sistema afetado sem copiar senha, OTP, token, chave ou código no relato.
- **Potencial pedagógico:** Alto; **papel recomendado:** fundamento transversal e critério do construtor de reporte.
- A prática permite corrigir o impulso de “provar o que aconteceu” reenviando justamente o material que precisa ser protegido.

### Dificuldades e riscos

- Algumas equipes podem pedir identificadores técnicos específicos; isso não autoriza enviar segredo por canal comum.
- Distinguir identificador de segredo exige exemplos claros e fictícios.
- Campos livres podem receber dados reais mesmo com aviso; o desenho deve minimizar essa possibilidade.

### Formato A — Redator com minimização

- **Área provável:** PhishLab.
- **Mecânica:** escolher entre frases que descrevem a exposição e versões que repetem o segredo.
- **Fluxo:** fatos → redação → detector pedagógico de excesso → revisão → reporte.
- **O que seria avaliado:** descrição suficiente sem valor secreto.
- **Alternativa acessível:** opções pré-redigidas, sem entrada livre obrigatória.

### Formato B — Tarja conceitual

- **Área provável:** Missão.
- **Mecânica:** substituir valores fictícios por categorias antes de montar o relato.
- **Fluxo:** evidências → marcar “segredo” → generalizar → enviar ao canal fictício.
- **O que seria avaliado:** reconhecer o que não deve ser reproduzido.
- **Alternativa acessível:** botão “substituir por categoria”; não depender de gesto ou cor.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** redator com minimização; reutilizar em todos os reportes.
- Segurança/Privacidade devem aprovar exemplos; futuramente, preferir opções fechadas e descarte imediato de qualquer texto livre.

### Fontes

- [FTC — Verification codes](https://consumer.ftc.gov/consumer-alerts/2024/03/whats-verification-code-why-would-someone-ask-me-it)
- [Microsoft Support — Protect yourself from phishing](https://support.microsoft.com/en-US/security/protect-yourself-from-phishing)

## `concept:uncertain-reporting` — Reportar mesmo em dúvida

### Ensinamento e papel

- **Comportamento observável:** encaminhar uma suspeita com fatos e grau de certeza, sem esperar provar fraude ou atribuir intenção criminosa.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso transversal em itens inconclusivos.
- A interação precisa recompensar o reporte bem formulado mesmo quando o caso se revela legítimo, reduzindo o medo do falso positivo.

### Dificuldades e riscos

- Alto volume de relatos exige triagem, mas não deve ser resolvido transferindo ao usuário a obrigação de perícia.
- Reporte não é acusação; linguagem e privacidade importam.
- Não prometer resposta imediata se o canal ainda não estiver configurado.

### Formato A — Inconclusivo é uma conclusão

- **Área provável:** Missão.
- **Mecânica:** trabalhar com evidências insuficientes e selecionar “verificar/reportar” com justificativa limitada.
- **Fluxo:** caso ambíguo → evidências → grau de certeza → reporte → investigação da equipe.
- **O que seria avaliado:** honestidade epistemológica e ação proporcional.
- **Alternativa acessível:** escala com rótulos textuais, sem cor.

### Formato B — Falso positivo útil

- **Área provável:** Simulação.
- **Mecânica:** relatar um item legítimo porém incomum e ver como o feedback melhora processo ou comunicação.
- **Fluxo:** dúvida → reporte → verificação legítima → melhoria coletiva.
- **O que seria avaliado:** qualidade do relato, não acerto binário sobre fraude.
- **Alternativa acessível:** narrativa linear e resumo.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** falso positivo útil; reutilizar grau de certeza e feedback.
- Segurança deve definir retorno e capacidade de triagem; futuramente, não prometer SLA ou canal antes da configuração.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [NIST — Phish Scale User Guide](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=956851)

## `concept:extortion-response` — Extorsão, sextorsão ou chantagem

### Ensinamento e papel

- **Comportamento observável:** não pagar nem continuar negociando, preservar a comunicação, bloquear conforme orientação e buscar apoio oficial e humano apropriado.
- **Potencial pedagógico:** Alto; **papel recomendado:** caso sensível opcional ou transferência, nunca surpresa obrigatória.
- A prática deve reduzir isolamento e vergonha, sem reproduzir ameaça gráfica nem pedir que a pessoa prove se o material existe.

### Dificuldades e riscos

- Conteúdo pode ser traumático, envolver menores, risco físico ou material íntimo; cada caso exige rota especializada.
- “Não apagar” e “bloquear” precisam seguir a ordem de preservação e o procedimento local.
- Não aconselhar confronto, rastreamento do agressor ou pagamento experimental.

### Formato A — Plano de apoio, não negociação

- **Área provável:** Missão opcional.
- **Mecânica:** montar uma rede de apoio e sequência de preservação/reporte para personagem fictício.
- **Fluxo:** ameaça neutra → pausa → pessoa/área de apoio → preservar → reportar/bloquear.
- **O que seria avaliado:** saída do isolamento e ausência de pagamento.
- **Alternativa acessível:** tema financeiro não íntimo equivalente e saída sem penalidade.

### Formato B — Conselho a um colega

- **Área provável:** PhishLab reflexivo.
- **Mecânica:** distinguir respostas culpabilizantes, arriscadas e protetivas diante de relato alheio.
- **Fluxo:** colega pede ajuda → seleção de linguagem → canal especializado → síntese.
- **O que seria avaliado:** acolhimento, preservação e escalada.
- **Alternativa acessível:** texto com aviso de conteúdo e intensidade reduzida.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** conselho a um colega; reutilizar rede de apoio.
- Jurídico, RH, bem-estar e proteção de menores devem aprovar escopo e saídas; futuramente, realizar revisão de segurança emocional.

### Fontes

- [FBI — Financially motivated sextortion threat](https://www.fbi.gov/news/stories/the-financially-motivated-sextortion-threat)
- [CERT.br — Golpes: o que fazer](https://cartilha.cert.br/fasciculos/golpes-o-que-fazer/fasciculo-golpes-o-que-fazer.pdf)

## `concept:collective-protection` — Reporte como proteção coletiva

### Ensinamento e papel

- **Comportamento observável:** reportar por canal oficial para permitir alerta, bloqueio e ajuda a outros, sem expor publicamente vítima, conteúdo sensível ou resultado individual.
- **Potencial pedagógico:** Alto; **papel recomendado:** síntese e consequência positiva do reporte.
- Visualizar a propagação interrompida torna concreto o valor coletivo sem transformar colegas em placar ou vigilantes.

### Dificuldades e riscos

- A equipe pode não conseguir bloquear imediatamente; não prometer contenção total.
- Alertas amplos demais podem reproduzir link, dado ou vergonha.
- Métrica coletiva não deve revelar quem clicou ou deixou de reportar.

### Formato A — Um relato, várias barreiras

- **Área provável:** Missão de debrief.
- **Mecânica:** após um reporte, revelar ações possíveis da equipe em correio, contas, dispositivos e comunicação.
- **Fluxo:** suspeita → reporte → investigação → bloqueios/avisos → limites restantes.
- **O que seria avaliado:** canal e qualidade factual, não a eficácia técnica simulada.
- **Alternativa acessível:** lista cronológica no lugar de mapa animado.

### Formato B — O mesmo golpe chegou a outra pessoa

- **Área provável:** PhishLab.
- **Mecânica:** ao perceber um segundo caso parecido, escolher entre conversa pública, encaminhamento, exclusão e reporte oficial e então montar o relato mínimo que permita proteção coletiva.
- **Fluxo:** suspeita individual → ocorrência semelhante → escolha do canal → relato factual e minimizado → consequência organizacional fictícia.
- **O que seria avaliado:** uso do canal oficial, preservação dos fatos e ausência de exposição pública de pessoa, segredo ou artefato perigoso.
- **Alternativa acessível:** opções e construtor textual por teclado, sem envio real.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** um relato, várias barreiras; reutilizar consequência organizacional.
- Segurança/Comunicação/Privacidade devem aprovar o que pode ser divulgado; futuramente, garantir que nenhuma mensagem real seja enviada.

### Fontes

- [NCSC — Phishing attacks: defending your organisation](https://www.ncsc.gov.uk/guidance/phishing)
- [Microsoft Support — Phishing and suspicious behavior in Outlook](https://support.microsoft.com/en-US/Outlook/mail/phishing-and-suspicious-behavior-in-outlook)

## `concept:incident-causality` — Linha temporal e tipo de exposição

### Ensinamento e papel

- **Comportamento observável:** distinguir recebimento, abertura, clique, download, execução, credencial, MFA, permissão, dado e pagamento para escolher resposta e relatar incertezas.
- **Potencial pedagógico:** Alto; **papel recomendado:** atividade de síntese dentro de “Cliquei. E agora?”.
- A reconstrução é o mecanismo que impede respostas genéricas e mostra por que dois incidentes parecidos exigem medidas diferentes.

### Dificuldades e riscos

- Eventos podem ser simultâneos, desconhecidos ou registrados de modo incompleto.
- A linha temporal do usuário não substitui telemetria e investigação técnica.
- Não inferir causalidade apenas porque um evento aconteceu depois de outro; permitir “pode estar relacionado”.

### Formato A — Linha do Incidente

- **Área provável:** Missão.
- **Mecânica:** ordenar fatos, marcar a última exposição conhecida e anexar evidências/certeza.
- **Fluxo:** fragmentos → cronologia → tipo de exposição → plano proporcional → reporte.
- **O que seria avaliado:** consistência entre fatos, incerteza e ações.
- **Alternativa acessível:** ordenação por botões e lista numerada com relações descritas.

### Formato B — Árvore de resposta por exposição

- **Área provável:** PhishLab.
- **Mecânica:** partir do mesmo contato e percorrer ramos conforme o que cada personagem realmente fez.
- **Fluxo:** mensagem comum → eventos divergentes → planos → comparação final.
- **O que seria avaliado:** seleção de resposta pela exposição, não pelo rótulo “phishing”.
- **Alternativa acessível:** tabela de casos e planos, sem diagrama obrigatório.

### Recomendação para a etapa de viabilidade

- **Melhor formato preliminar:** Linha do Incidente; reutilizar como componente de todos os caminhos de resposta.
- Segurança, Privacidade e Financeiro devem validar o mapeamento; futuramente, testar como representar simultaneidade e “não sei” sem concluir viabilidade agora.

### Fontes

- [CISA — Federal Government Cybersecurity Incident and Vulnerability Response Playbooks](https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf)
- [NCSC — Responding to phishing attacks](https://www.ncsc.gov.uk/section/respond-recover/phishing)
