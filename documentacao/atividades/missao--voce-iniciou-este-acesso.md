# Missão — Você iniciou este acesso?

> Estado documental: a versão 2 está implementada com console sequencial, falso suporte reativo e área oficial simulada. A versão 1 continua legível apenas para compatibilidade de tentativas, progresso e recompensa.

## 1. Identidade

| Campo | Valor vigente |
|---|---|
| Área | Missões |
| Percurso | Confiança sob pressão |
| Ordem recomendada | 5 de 8 |
| `activityId` | `mission:mfa-fatigue` |
| Versão implementada | `2` — versão 1 preservada |
| Rota | `/missoes/voce-iniciou-este-acesso` |
| Duração estimada | 9 minutos |
| Pontos-base | 100 |
| Competências | Investigar, Verificar, Decidir e Reportar |
| Pré-requisitos obrigatórios | Quem enviou de verdade? e Domínio sob a lupa |
| Radar relacionado | Fadiga de MFA: aprovações que você não iniciou — opcional e pontuado por regra própria |
| Próxima prática | Cliquei. E agora? |

Esta é a única etapa do percurso que possui pré-requisitos obrigatórios. O Radar nunca participa dessa liberação.

## 2. Objetivo de aprendizagem

Ensinar a reagir a uma autenticação não iniciada pelo funcionário, à repetição das solicitações e a uma abordagem de falso suporte. O comportamento esperado é negar o que não foi iniciado, não compartilhar código nem aprovação, usar uma rota oficial conhecida, reportar e revisar acessos.

A atividade também deve ensinar que uma notificação tecnicamente verdadeira pode representar uma tentativa de acesso indevida. A aparência do aplicativo não transforma o pedido em autorização.

## 3. Estado histórico — versão 1 preservada

Esta seção registra a forma anterior para explicar a compatibilidade. Ela não descreve mais a experiência apresentada em novas tentativas.

### 3.1 Conteúdo atual

A versão 1 exibe, ao mesmo tempo:

- três solicitações de MFA entre 10:14 e 10:16;
- dispositivo e localização não reconhecidos;
- repetição e ameaça de bloqueio;
- uma mensagem de falso suporte às 10:17;
- pedido para aprovar a próxima solicitação ou compartilhar código temporário.

As três notificações possuem texto visual “Negar / Aprovar”, mas esses elementos não são controles operáveis. A sequência já está completa quando a investigação começa. O chat é estático e não reage ao que o funcionário escolhe.

### 3.2 Fluxo atual

1. **Bloqueio de pré-requisitos:** enquanto um PhishLab estiver pendente, a rota orienta como concluí-lo e não cria tentativa.
2. **Briefing:** apresenta o cenário e seus limites fictícios.
3. **Investigar:** mostra as três solicitações, o chat e três botões de evidência.
4. **Decidir:** oferece uma ação principal em rádio e justificativas em caixas de seleção.
5. **Resultado:** mostra nota, consequência sem culpa, recompensa, competências e recuperação seguinte.

As três investigações atuais tratam acesso, repetição e identidade do suporte. É necessário abrir pelo menos duas para avançar.

### 3.3 Revisão de clareza da versão 1

A abertura agora informa explicitamente papel, situação, tarefa e consequência protegida. Na central de acesso, os textos “Negar / Aprovar” que pareciam botões foram substituídos por **Prévia da notificação · nenhuma ação nesta tela**. A instrução esclarece que a versão 1 mostra três cartões estáticos e avalia uma resposta para o conjunto completo.

A decisão pergunta diretamente o que fazer com os três pedidos e a mensagem de suporte. As alternativas continuam usando os mesmos IDs, mas apresentam conjuntos de ações concretos. O resultado compara, quando a resposta atual está disponível na sessão:

- cada verificação aberta ou não aberta;
- a ação escolhida e a ação esperada;
- cada justificativa marcada ou não marcada, incluindo a aparência do aplicativo, que não deve ser tratada como autorização.

O encaminhamento para **Cliquei. E agora?** passou a ser acionável. Essa revisão não transforma cartões em eventos operáveis e não simula o console v2 antes de seu contrato próprio.

### 3.3 Avaliação e recompensa atuais

A nota vai de 0 a 100:

- até 40 pontos pela ação principal;
- até 24 pontos pelas três verificações;
- até 36 pontos pelas três evidências corretas;
- desconto de 10 pontos por tratar aparência visual como prova.

A melhor resposta combina negar, encerrar o contato, acessar o suporte por uma rota conhecida, reportar e revisar acessos. A revisão é recomendada quando a nota é inferior a 75 ou quando a ação insegura é escolhida.

A primeira conclusão concede 100 pontos-base mais bônus geral de desempenho. Repetições atualizam o melhor resultado sem duplicar recompensa, contribuição ou conquista. Uma decisão insegura ainda conclui a atividade e encaminha para recuperação sem linguagem punitiva.

### 3.4 Contrato atual

A versão 1 reutiliza `MissionSubmission`, `MissionAttempt` e `MissionResult`. Ela registra:

- ação principal;
- evidências inspecionadas;
- justificativas selecionadas;
- metadados e resultado da tentativa.

O contrato não representa ações individuais em cada solicitação, evolução da conversa, revisão de sessão ou abertura de uma área oficial simulada.

## 4. Estado atual — versão 2 implementada

### 4.1 Mecânica principal

A versão publicada é um **console de segurança com eventos sucessivos**. As solicitações chegam em sequência e exigem ações dentro da simulação. Depois surge um falso suporte textual cujo roteiro reage às decisões anteriores.

O funcionário pratica:

- reconhecer que não iniciou o acesso;
- negar solicitações inesperadas;
- resistir à repetição e à ameaça de bloqueio;
- nunca compartilhar código ou aprovação;
- encerrar o contato recebido;
- entrar numa área oficial simulada por uma rota independente;
- revisar ou encerrar uma sessão não reconhecida;
- reportar pelo caminho oficial demonstrativo.

### 4.2 Fluxo-alvo

1. **Primeiro evento:** chega uma solicitação com dispositivo e localização. O funcionário pode examinar e agir.
2. **Repetição:** novas solicitações demonstram fadiga de MFA sem usar cronômetro como critério.
3. **Falso suporte reativo:** mensagens predefinidas mudam conforme houve negação, espera ou aprovação. Não se trata de chatbot aberto.
4. **Resposta ao contato:** a pessoa encerra o chat e rejeita pedidos de código ou aprovação.
5. **Rota oficial simulada:** o funcionário abre a área conhecida dentro da própria atividade, revisa sessões e seleciona as ações cabíveis.
6. **Reporte:** reúne fatos úteis sem segredos.
7. **Debrief:** uma linha de eventos explica a consequência de cada ação e apresenta recuperação quando necessária.

Se o funcionário aprovar uma solicitação, a atividade não deve reiniciar nem punir. Ela continua pelo ramo de contenção e oferece **Cliquei. E agora?** como aprofundamento.

### 4.3 Regras para o roteiro reativo

- As ramificações devem ser finitas, versionadas e testáveis.
- O falso suporte pode reformular a pressão, mas nunca pedir dados reais.
- A reação não deve depender de IA generativa ou serviço externo.
- O conteúdo não pode confirmar falsamente que uma sessão real foi encerrada ou que um reporte foi enviado.
- Todas as ações ocorrem numa interface fictícia e inerte.
- OAuth, consentimento de aplicações e código de dispositivo continuam fora deste percurso.

## 5. Histórico × versão publicada

| Aspecto | Versão 1 histórica | Versão 2 publicada |
|---|---|---|
| Solicitações | Três cartões estáticos já visíveis | Eventos que chegam em sequência |
| Negar/Aprovar | Texto ilustrativo | Decisões operáveis dentro da simulação |
| Falso suporte | Mensagem fixa | Roteiro textual que reage ao caminho anterior |
| Área oficial | Citada numa opção | Console interno simulado e independente |
| Resposta | Uma ação final e justificativas | Sequência de ações e recuperação proporcional |
| Contrato | `MissionSubmission` genérico | `MfaConsoleV2Submission` com eventos, suporte, área oficial, reporte e transferência |

## 6. Avaliação e recompensa da versão 2

Devem ser mantidos 100 pontos-base, bônus geral, recompensa única e ausência de nota por velocidade.

As dimensões publicadas somam 100 pontos:

- 15 pontos por associar os pedidos à ação própria correta, incluindo a transferência;
- 25 pontos pelas decisões sobre as solicitações e a transferência;
- 20 pontos por proteger o fator e encerrar o falso suporte;
- 15 pontos por entrar pela rota oficial conhecida;
- 25 pontos por revisão/recuperação e reporte seguro.

A avaliação considera o caminho percorrido e aplica controles críticos para aprovação insegura, contato de suporte, rota independente, recuperação, reporte e transferência.

## 7. Contrato, versionamento e compatibilidade

A versão 2 usa `mechanicId: "mfa-console"` e um contrato específico que registra:

- ações por `eventId`;
- inspeções realizadas;
- ramo do suporte textual;
- resposta ao suporte;
- ações no console oficial simulado;
- informações selecionadas para reporte;
- estado de recuperação necessário;
- metadados de tentativa.

O contrato publicado:

- validar eventos, transições e ações contra o catálogo da versão;
- rejeitar caminhos impossíveis, eventos repetidos ou identificadores desconhecidos;
- ampliou `LearningAttempt` e elevou `APP_SCHEMA_VERSION` de 10 para 11, com envelope `mvp-local-v11`;
- manter tentativas v1 carregáveis;
- manter a conclusão v1 válida para progresso e recompensa;
- não fabricar um caminho de eventos para tentativas antigas;
- impedir nova recompensa, contribuição ou conquista pela mudança de formato.

O `activityId` e a rota permaneceram estáveis. O registro publica a versão 2 e aceita as versões 1 e 2.

## 8. Integrações

A atividade deve continuar:

- bloqueada até a conclusão dos dois PhishLabs;
- independente de Radar;
- integrada a competências, perfil, pontos, conquistas e atividade recente;
- capaz de recomendar revisão em **Quem enviou de verdade?**;
- encaminhando decisões inseguras para **Cliquei. E agora?**;
- contribuindo de forma privada e idempotente para os registros coletivos.

Uma conclusão v1 continua satisfazendo a etapa mesmo quando uma versão nova for publicada.

## 9. Privacidade, segurança e backend

O caminho individual, aprovações, erros, sessões simuladas, reporte e nota são privados. Não devem aparecer em ranking ou histórico coletivo nominal.

Nenhuma notificação, autenticação, sessão, senha, código, chat ou reporte real é utilizado. A área oficial existe somente dentro do cenário.

Antes do uso real, o backend autoritativo deverá verificar pré-requisitos, selecionar a versão, validar a sequência de eventos, calcular o resultado e confirmar recompensa e contribuição únicas de maneira transacional.

## 10. Acessibilidade desktop

- Eventos novos devem ser anunciados sem deslocar foco inesperadamente.
- O console precisa manter uma lista cronológica acessível.
- Ações devem usar botões com nomes completos, não apenas ícones.
- O estado Negada, Aprovada, Pendente ou Não reconhecida deve aparecer em texto.
- O chat precisa possuir ordem de leitura estável e identificação clara de interlocutor.
- Nenhuma decisão pode depender de resposta rápida.
- Deve existir foco programático ao mudar de painel ou ramo.
- A interface deve respeitar contraste, tamanho de texto e movimento reduzido.
- Uma linha textual deve equivaler à visualização gráfica dos eventos.

O comportamento específico para celular permanece adiado.

## 11. Testes e critérios de aceite

- A rota direta deve manter o bloqueio real dos dois pré-requisitos.
- O Radar não pode liberar nem bloquear a atividade.
- Cada evento deve aparecer e aceitar ação na ordem permitida pelo catálogo.
- Negar e aprovar devem produzir ramos testáveis e debrief coerente.
- O falso suporte deve reagir somente por roteiros locais conhecidos.
- Nenhuma ação pode tocar autenticação, sessão, chat ou reporte reais.
- A atividade deve ser concluível por teclado e sem limite temporal.
- Uma aprovação insegura deve concluir e abrir orientação de recuperação sem punição.
- Tentativas malformadas e transições impossíveis devem ser rejeitadas.
- Tentativas v1 e recompensas anteriores devem sobreviver à migração.
- Repetições não podem duplicar recompensa, contribuição ou conquista.
- Build, lint, testes e percurso manual desktop devem passar sem erro de console.

## 12. Limites e pendências posteriores

- Validar os textos com os procedimentos corporativos que existirão no produto real.
- Adicionar testes de navegador específicos para todos os ramos antes do acabamento visual final.
- Manter autenticação, encerramento de sessão, recuperação, chat e reporte como ações inertes na demonstração.
- Substituir a persistência local pelo backend autoritativo antes de qualquer uso real.
- O comportamento para celular permanece posterior.

## 13. Histórico

| Data | Registro |
|---|---|
| Implementação anterior | Versão 1 disponibilizada com sequência e chat estáticos, investigação e decisão final. |
| 2026-08-11 | Aprovado o formato de console com eventos sucessivos e falso suporte textual reativo. |
| 2026-08-11 | Documento criado para separar claramente a versão funcional da evolução ainda não implementada. |
| 2026-08-15 | Versão 1 recebeu contexto explícito, distinção entre prévia e controle, decisão em linguagem direta, revisão resposta por resposta e ação para a recuperação seguinte; contrato, versão, avaliação e recompensa não mudaram. |
| 2026-08-15 | Versão 2 publicada com três pacotes internos atribuídos sem seletor, console sequencial, falso suporte reativo, área oficial, reporte, transferência, revisão detalhada e migração local v10→v11. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
