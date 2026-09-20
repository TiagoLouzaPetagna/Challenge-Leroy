# Missão — Cliquei. E agora?

> Estado documental: a versão 2 está implementada e disponível; a validação completa do portal ainda está em andamento. A versão 1 e suas tentativas permanecem legíveis, sem reinterpretação.

## 1. Identidade

| Campo | Valor vigente |
|---|---|
| Área | Missões |
| Percurso | Confiança sob pressão |
| Ordem recomendada | 6 de 8 |
| `activityId` | `mission:clicked-now-what` |
| Versão implementada | `2` |
| Rota | `/missoes/cliquei-e-agora` |
| Duração estimada | 12 minutos |
| Pontos-base | 100 |
| Competências | Decidir, Reportar e Recuperar |
| Pré-requisitos obrigatórios | Nenhum |
| Recomendação anterior | Você iniciou este acesso? |
| Próxima prática | Uma manhã comum |
| Radar relacionado | Cliquei em um link suspeito. E agora? — opcional |

A ausência de pré-requisito é intencional: uma orientação de recuperação deve poder ser consultada mesmo quando as práticas anteriores não foram concluídas.

## 2. Objetivo de aprendizagem

Ensinar resposta e recuperação proporcionais ao que realmente aconteceu. A atividade começa depois de uma possível interação e valoriza interrupção, reporte rápido e preciso, preservação de informações úteis e uso apenas das medidas adequadas ao caso.

O tom deve permanecer sem culpa. Abrir uma mensagem, clicar, informar credenciais e aprovar MFA não produzem o mesmo risco e não devem receber um plano genérico idêntico.

## 3. Legado preservado — versão 1

### 3.1 Caminhos da versão 1

A primeira escolha descreve o ocorrido e não vale pontos:

1. abriu a mensagem;
2. clicou em um link sem informar dados;
3. informou credenciais;
4. aprovou uma autenticação não iniciada.

Depois, a pessoa escolhe:

- uma resposta imediata;
- ações de recuperação em caixas de seleção;
- informações para incluir no reporte.

As opções misturam ações adequadas, ações que pertencem somente a certos caminhos e ações prejudiciais, como apagar evidências, encaminhar a colegas ou voltar ao destino suspeito.

### 3.2 Fluxo da versão 1

1. **Briefing:** explica proporcionalidade, linguagem sem culpa e limites da demonstração.
2. **O que aconteceu:** seleciona um dos quatro caminhos.
3. **Plano:** escolhe uma resposta imediata, várias ações de recuperação e detalhes do reporte.
4. **Resultado:** apresenta consequência, decomposição da nota, plano esperado, recompensa e próxima prática.

As ações são selecionadas como listas. Elas ainda não são distribuídas por momento nem organizadas em uma sequência operacional.

### 3.3 Avaliação e recompensa da versão 1

A nota vai de 0 a 100:

- até 35 pontos pela resposta imediata;
- até 40 pontos pelas ações proporcionais ao caminho;
- até 25 pontos pelos fatos seguros do reporte;
- desconto de 10 pontos por ação prejudicial;
- desconto de 15 pontos por incluir senha ou código temporário.

A revisão é recomendada quando a nota é inferior a 75, o reporte é adiado, o canal oficial não é selecionado ou um segredo é incluído.

A primeira conclusão concede 100 pontos-base mais bônus geral de desempenho. Repetições atualizam tentativas e melhor resultado sem duplicar recompensa, contribuição ou conquista. Velocidade não entra na nota.

### 3.4 Contrato legado

A versão 1 possui tipos próprios: `RecoveryMissionSubmission`, `RecoveryMissionAttempt` e `RecoveryMissionResult`. A tentativa registra:

- `incidentType`;
- `immediateActionId`;
- `selectedRecoveryActionIds`;
- `selectedReportDetailIds`;
- identificador, versão, horário e resultado.

Esse contrato foi introduzido com o esquema local 5 e continua legível no esquema atual. Ele não armazena categoria temporal nem posição de cada ação.

## 4. Estado atual — versão 2 implementada

### 4.1 Mecânica principal

A versão 2 é um **montador de resposta ao incidente**. A primeira abertura atribui automaticamente o caso canônico de clique sem envio de dados; a pessoa não escolhe P1, P2 ou P3. Os outros pacotes aparecem somente em **Praticar outro caso**, depois da conclusão. A pessoa reconstrói os fatos e distribui todos os cartões entre:

- **Primeiras ações seguras**;
- **Ações sob orientação da equipe responsável**;
- **Ações que aumentam o risco**.

Antes dos cartões, a tela repete a situação concreta, o último estágio registrado e o significado de cada categoria. Assim, o exercício não exige interpretar um rótulo temporal abstrato para decidir onde uma ação se encaixa.

No final, monta um reporte somente com fatos úteis e sem senha, código, conclusão não confirmada ou informação excessiva. Nenhum reporte é enviado de verdade.

A atividade avalia relações de precedência e proporcionalidade sem impor uma sequência total artificial quando duas ações seguras podem ocorrer em paralelo.

### 4.2 Fluxo implementado

1. **Contexto:** explica papel, situação, tarefa e consequência protegida.
2. **Reconstrução:** ordena quatro fatos e registra o último estágio comprovado.
3. **Organização:** reapresenta o contexto e o estágio indicado, classifica todos os cartões em Primeiras ações seguras, Ações sob orientação da equipe responsável ou Ações que aumentam o risco e ajusta sua ordem por botões.
4. **Consequência:** explica por que interrupção e reporte vêm antes da investigação improvisada.
5. **Revisão:** resume fatos e plano sem revelar o gabarito.
6. **Reporte:** escolhe a rota de orientação e os blocos factuais seguros.
7. **Transferência:** aplica a regra a outro canal ou aparência.
8. **Resultado:** mostra nota e cada resposta como **Acertou** ou **Precisa revisar**.
9. **Debrief:** consolida a regra e recomenda a próxima atividade.

### 4.3 Pacotes internos publicados

Os pacotes são internos e versionados; não aparecem como escolha inicial:

| Pacote | Prioridades principais |
|---|---|
| Clique sem envio de dados — canônico | manter a página fechada, preservar fatos e reportar cedo |
| Estágio de arquivo incerto | diferenciar prévia, download, abertura e execução sem inventar certeza |
| Sessão não reconhecida | preservar o registro, reportar e seguir revisão e recuperação oficiais |

A estrutura continua preparada para casos futuros, como arquivo executado, permissão concedida, informação sensível enviada ou pagamento realizado, sem apresentar essas opções como disponíveis agora.

## 5. Legado × versão atual

| Aspecto | Versão 1 preservada | Versão 2 disponível |
|---|---|---|
| Incidente | Quatro caminhos selecionáveis | Caso inicial atribuído; pacotes alternativos só após conclusão |
| Ações | Lista de checkboxes | Cartões classificados por momento e risco |
| Sequência | Não registrada | Relações críticas e ordem quando necessária |
| Reporte | Seleção de campos | Montagem explícita de reporte seguro |
| Resultado | Lista de acertos e plano esperado | Reprodução do plano construído |
| Contrato | Listas sem posição | Categorias, posições, linha temporal, reporte e transferência allowlisted |

## 6. Avaliação e recompensa da versão 2

Os 100 pontos-base, bônus geral e recompensa única foram preservados. Repetir outro pacote não reabre a recompensa.

As dimensões implementadas são:

- classificação correta das ações entre primeiras ações seguras, ações sob orientação e ações que aumentam o risco;
- presença das ações necessárias ao incidente;
- respeito às relações críticas de precedência;
- ausência de ações prejudiciais;
- qualidade e segurança do reporte.

A avaliação não deve exigir uma ordem total única. Por exemplo, preservar detalhes e abrir o canal oficial podem possuir mais de uma sequência aceitável, enquanto continuar interagindo antes de interromper é claramente inseguro.

Os pesos são 20 pontos para fatos e estágio, 30 para classificação, 15 para precedência, 15 para proporcionalidade e 20 para reporte e transferência. A linguagem de resultado continua não punitiva, mesmo quando o plano contém riscos.

## 7. Contrato, versionamento e compatibilidade

O contrato publicado usa `RecoveryBuilderV2Submission`, `RecoveryBuilderV2Attempt` e `RecoveryBuilderV2Result`. A resposta bruta registra:

- `casePackageId` e `mechanicId: "incident-response-builder"`;
- ordem dos fatos e último estágio comprovado;
- ações agrupadas por `now`, `next` e `do-not`, com posição;
- blocos do reporte e rota oficial escolhida;
- exposição e duas primeiras ações da transferência;
- identificador, versão, horário e resultado derivado.

Todo cartão deve ser classificado exatamente uma vez; o validador rejeita ausência, duplicata, grupo, posição, pacote, versão ou opção fora da allowlist.

Na publicação foram aplicadas as seguintes regras:

- validar categorias, duplicatas, posições e ações permitidas por incidente;
- criar migração explícita do esquema local quando a união persistida mudar;
- preservar tentativas e resultados v1;
- não inventar categorias temporais para respostas antigas;
- preservar conclusão, pontos, conquistas e contribuição já concedidos;
- impedir nova recompensa por causa da mudança de formato.

O `activityId`, a rota e a chave de recompensa permaneceram estáveis. `APP_SCHEMA_VERSION` passou de 11 para 12; a migração v11→v12 altera somente a versão do estado e não fabrica tentativa, progresso, ponto ou recompensa.

## 8. Integrações

A atividade continua:

- acessível sem pré-requisito obrigatório;
- recomendada depois de **Você iniciou este acesso?**;
- capaz de receber quem aprovou MFA na atividade anterior;
- recomendando **Uma manhã comum** como prática seguinte;
- atualizando Decidir, Reportar e Recuperar;
- integrada a perfil, pontos, conquistas, atividade recente e contribuição privada;
- independente da conclusão do Radar.

Uma tentativa v1 já concluída continua contando para o percurso.

## 9. Privacidade, segurança e backend

O incidente informado, o plano, o reporte montado, os erros e a nota são privados. Não devem aparecer para colegas ou ranking.

O aviso verdadeiro permanece visível:

> Canal oficial ainda não configurado nesta demonstração.

Nenhum controle envia reporte, altera senha, encerra sessão, acessa conta ou confirma recuperação real. Todos os procedimentos e contatos do produto real precisarão ser publicados e versionados por responsáveis autorizados.

O backend autoritativo deverá validar o contrato bruto, calcular o resultado, confirmar recompensa e contribuição únicas e persistir tentativa e progresso de forma transacional.

## 10. Acessibilidade desktop

O montador não pode depender exclusivamente de arrastar. Deve oferecer:

- classificar cada cartão por um seletor com as três categorias explicadas e usar Subir ou Descer para ajustar a ordem;
- botões Subir e Descer dentro de cada grupo;
- posição e categoria anunciadas;
- alternativa linear para leitura e edição do plano;
- estado textual além de cor;
- foco estável após mover um cartão;
- reporte operável com controles nativos;
- nenhuma contagem regressiva ou bônus por rapidez;
- respeito a contraste, tamanho de texto e movimento reduzido.

O comportamento específico para celular permanece fora deste recorte.

## 11. Testes e critérios de aceite

- Os três pacotes v2 produzem nota 100 para a resposta canônica e preservam seus próprios fatos, ações e relações.
- O pacote inicial é atribuído automaticamente e os alternativos só aparecem após conclusão.
- O montador funciona integralmente por teclado e não depende de arrastar.
- Nenhuma ação desaparece ou aparece em duas categorias; omissão, duplicata e posição inválida são rejeitadas.
- Senha, código temporário e conclusão não comprovada são inadequados no reporte.
- A conclusão ocorre mesmo com erros e usa linguagem sem culpa.
- Nenhum controle executa reporte ou recuperação real.
- Tentativas v1 carregam após a migração sem receber respostas fabricadas.
- Repetições não duplicam recompensa, conquista ou contribuição.
- Build, lint, 27 testes de domínio/estado/persistência/SSR e oito cenários Playwright passaram; o cenário v2 confirmou teclado, revisão, persistência v12, contraste, `axe`, ausência de overflow e console limpo.

## 12. Pendências posteriores

- Validar os textos de recuperação com o procedimento corporativo futuro.
- Validar futuramente a referência oficial da organização; o botão global **Como reportar** foi retirado do protótipo.
- Validar visualmente todos os estados desktop em contraste e texto ampliado.
- Decidir se o rascunho Em andamento será persistido.

## 13. Histórico

| Data | Registro |
|---|---|
| Implementação anterior | Versão 1 disponibilizada com quatro caminhos, resposta imediata, ações e campos de reporte. |
| 2026-08-11 | Aprovado o formato de montador com Agora, Em seguida, Não faça e reporte final. |
| 2026-08-11 | Documento criado para separar o contrato v1 da experiência-alvo ainda não implementada. |
| 2026-08-16 | Publicada a versão 2 com caso inicial automático, três pacotes internos, linha temporal, montador, reporte, transferência e revisão resposta por resposta. |
| 2026-08-16 | A revisão da transferência foi separada entre estágio e ações; os grupos receberam rótulos operacionais e a rota conhecida deixou de depender do botão global removido. |
| 2026-08-16 | O montador passou a repetir o contexto e o estágio registrado; os grupos agora descrevem o papel das ações, e os cartões do pacote de arquivo explicitam download, incerteza e orientação responsável. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
