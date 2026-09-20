# Título visível da atividade

> **Estado atual:** Planejada, implementada ou implementada e validada.
>
> **Formato-alvo:** Sem decisão, aprovado mas ainda não implementado, implementado ou validado.
> Um formato-alvo aprovado não deve ser descrito como disponível antes de possuir rota, contrato, avaliador, persistência e testes.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | Missão / PhishLab / Simulação / Equipes / Radar |
| Percurso e ordem | Nome do percurso e posição, ou Fora do percurso |
| `activityId` | Identificador estável ou Não definido |
| Versão implementada | Número ou Não aplicável |
| Versão-alvo | Número proposto ou A definir |
| Rota funcional | Rota ou Não existe |
| Integração atual | Disponível / Planejada |
| Duração estimada | Minutos ou A definir |
| Pontos | Base, bônus e condição, ou A definir |
| Competências | Competências relacionadas |
| Conjunto de ensino principal | Identificador e título do conjunto curricular |
| Conjuntos secundários | Conjuntos usados como complemento ou aplicação, ou Nenhum |
| Composição pedagógica | Não analisada / Candidata / Aprovada / Implementada / Validada |
| Versão da composição | Versão vigente ou versão-alvo à qual a composição se aplica |
| Pré-requisitos | Obrigatórios; registrar Nenhum quando não existirem |
| Relações recomendadas | Atividades anteriores e posteriores |
| Radar relacionado | Conteúdo opcional ou Não aplicável |
| Responsável editorial | Nome/função ou A definir |
| Última revisão de conteúdo | Data ou Pendente |
| Última conferência no código | Data ou Nunca implementada |

### Estados separados

- **Integração:** descreva se catálogo, rota, avaliador e persistência estão conectados.
- **Progresso individual:** Não iniciada, Em andamento e Concluída são estados derivados por funcionário; descreva quais realmente são persistidos.
- **Reformulação:** registre a situação da nova mecânica sem alterar o estado de integração atual.

### Mapa da implementação atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Catálogo | Caminho | Implementado / Planejado |
| Interface | Caminho | Implementado / Ausente |
| Avaliador | Caminho | Implementado / Ausente |
| Estado e operação | Caminho | Implementado / Ausente |
| Persistência e validação | Caminho | Implementado / Ausente |
| Seletores e integrações | Caminho | Implementado / Ausente |
| Testes | Caminho | Implementado / Ausente |

## 2. Objetivo educacional

- **Comportamento observável esperado:** o que a pessoa deve fazer.
- **Técnica ou objetivo do atacante:** o que o caso ensina a reconhecer.
- **Atalho inseguro tratado:** qual impulso ou erro a experiência confronta.
- **Limite da conclusão:** o resultado descreve o desempenho nesta tentativa; não comprova retenção ou domínio definitivo.

### 2.1 Composição pedagógica 1 + até 2 + 1

O modelo é interno a uma atividade e não significa uma Missão, dois PhishLabs e uma Simulação. Os conceitos complementares podem ser zero, um ou dois; não devem ser preenchidos artificialmente.

| Elemento | Versão atual | Composição-alvo | Estado |
|---|---|---|---|
| 1 comportamento principal |  |  | Não analisada / Candidata / Aprovada / Implementada / Validada |
| Conceito complementar 1 |  |  |  |
| Conceito complementar 2 |  |  |  |
| 1 caso curto de transferência |  |  |  |

Regras:

- o comportamento principal é a única ação observável que organiza interação, avaliação e debrief;
- os complementares ajudam a interpretar o caso, sem competir com o comportamento principal;
- o caso curto muda canal, aparência ou contexto e exige novamente o mesmo comportamento;
- se o caso curto exigir outro objetivo central, ele pertence a outra atividade;
- “transferência” descreve o desenho do caso, não um estado comprovado do funcionário;
- se o caso afetar nota ou persistência, ele entra no contrato e pode exigir nova `activityVersion`;
- se não for avaliado, não pode gerar evidência de competência.

### 2.2 Ciclo de aprendizagem da atividade

O formato-alvo deve adaptar, sem transformar em telas obrigatoriamente idênticas, o ciclo:

1. situação profissional curta;
2. investigação pela mecânica própria;
3. primeira decisão entre prosseguir, interromper ou verificar;
4. consequência e explicação ligada à evidência;
5. evolução coerente do caso;
6. decisão final revisável;
7. caso curto de transferência, com menos orientação;
8. debrief separando fato, indício, limite de comprovação e resposta segura.

Aplicação por área:

- **Missão:** narrativa em três a cinco momentos; os conceitos surgem como contexto e consequência;
- **PhishLab:** caso guiado, comparação e artefato menos orientado; a operação investigativa é o centro;
- **Simulação:** ambiente de aplicação com legítimos, maliciosos e inconclusivos; não deve introduzir várias técnicas inéditas durante a avaliação;
- **Radar:** mantém explicação, exemplo, verificação e resumo e não precisa adotar 1 + até 2 + 1;
- **Equipes:** mantém o processo completo e o agregado privado, sem herdar automaticamente este formato.

## 3. Implementação atual

Descreva somente o que funciona hoje: mecânica, etapas, ferramentas, resposta, resultado, integrações e limitações. Conteúdo exibido apenas em card não possui player nem progresso.

## 4. Formato-alvo aprovado

Se não houver decisão, escreva **Não definido** e não invente telas, opções ou regras.

Quando houver formato aprovado, documente:

1. sequência de telas ou estados;
2. ações realizadas pelo funcionário;
3. evidências e condições de liberação;
4. feedback durante e depois da execução;
5. resultado e debrief;
6. alternativa acessível para gestos, arrastar ou mídia;
7. retomada, revisão e repetição.

### Diferenças entre atual e alvo

| Aspecto | Implementação atual | Formato-alvo | Impacto técnico ou de versão |
|---|---|---|---|
| Mecânica |  |  |  |
| Resposta persistida |  |  |  |
| Avaliação |  |  |  |
| Interface e acessibilidade |  |  |  |

## 5. Modelo do caso e conteúdo

| Elemento | Definição |
|---|---|
| Contexto profissional e canal |  |
| Identidade utilizada |  |
| Objetivo do atacante |  |
| Gatilhos sociais |  |
| Pedido ou ação induzida |  |
| Disfarces técnicos |  |
| Aparências que não provam autenticidade |  |
| Evidências úteis |  |
| Evidência decisiva |  |
| Confirmação independente |  |
| Ação segura |  |
| Reporte |  |
| Recuperação |  |

Todo cenário deve usar dados fictícios ou higienizados, domínios reservados como `.example` e informações mascaradas. Não incluir links perigosos, arquivos executáveis ou ações corporativas reais.

## 6. Fluxo e regras de interação

| Etapa | Informação exibida | Ação do funcionário | Transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |

Registrar início, retomada, revisão antes do envio, conclusão, repetição e navegação posterior. Velocidade não concede pontos salvo futura decisão explícita e documentada.

## 7. Avaliação, competências e recompensa

| Critério | Peso | Resposta integral | Crédito parcial | Zero ou penalidade | Competências |
|---|---:|---|---|---|---|
|  |  |  |  |  |  |

Documentar ainda:

- faixa da nota e arredondamento;
- controles críticos e condições de revisão;
- separação entre conclusão e nota;
- evidências de competência geradas;
- pontos-base e bônus;
- chave de recompensa única;
- comportamento de repetição, melhor nota e última tentativa;
- contribuição coletiva, quando existir;
- ausência de pontuação por velocidade.

Para o Radar, registrar a regra própria: primeira leitura realmente concluída e verificação correta podem conceder 5 pontos, sem bônus; releitura não duplica conclusão, tentativa válida, evidência nem recompensa.

## 8. Contrato, persistência e compatibilidade

### Resposta bruta

| Campo | Tipo e valores permitidos | Obrigatório | Observação |
|---|---|---|---|
| `attemptId` | `string` não vazia | Sim | Gerado localmente somente na demonstração |
| `activityId` | ID exato | Sim | Rejeitar atividade diferente |
| `activityVersion` | Versão permitida | Sim | Rejeitar versão desconhecida |
| `completedAt` | Data válida | Sim | Gerada localmente somente na demonstração |
| Campos específicos |  |  |  |

### Resultado derivado

Liste nota, decomposição, revisão, recompensa potencial, competências e quaisquer campos calculados. O cliente real não deve enviar esses valores como autoridade.

### Regras de compatibilidade

- Mudança semântica de escolhas, contrato ou avaliador exige nova `activityVersion`.
- Mudança da forma persistida exige análise e, quando necessário, incremento explícito de `APP_SCHEMA_VERSION`.
- Tentativas antigas permanecem legíveis e não são reinterpretadas silenciosamente.
- Migrações preservam progresso, recompensas, pontos, evidências, preferências e agregados.
- Estado inválido segue para o mecanismo de quarentena.

| Versão | Situação | Contrato e avaliador | Compatibilidade |
|---:|---|---|---|
| 1 |  |  |  |

## 9. Integrações

Descrever percurso e hub, recomendação anterior e posterior, Perfil, atividade recente, pontos, conquistas, competências, Radar e Equipes. Navegação, abertura e inspeção não concedem recompensa por si mesmas. Uma rota própria não pode cair silenciosamente no hub.

## 10. Privacidade e segurança

| Dado | Persistido localmente | Visível ao funcionário | Visível à equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta |  |  |  |  |
| Nota e feedback |  |  |  |  |
| Competências |  |  |  |  |
| Recompensa |  |  |  |  |
| Agregado |  |  |  |  |

Registrar que o armazenamento local é demonstrativo. Não afirmar que mensagem, reporte, ligação, alteração de conta ou pagamento real foi efetuado.

## 11. Backend autoritativo obrigatório

Antes do uso real, o servidor deverá:

- autenticar e autorizar funcionário, versão, público e equipe;
- publicar e selecionar uma versão válida do conteúdo;
- validar a resposta bruta por allowlist;
- gerar ou aceitar tentativas com idempotência;
- calcular nota, revisão, competências, pontos e agregados;
- conceder recompensa e contribuição em transação única;
- impedir duplicidade e adulteração do cliente;
- persistir, auditar, reter, anonimizar e excluir conforme a política;
- controlar integrações e procedimentos corporativos reais.

## 12. Acessibilidade e dispositivos

- um `h1` por estado principal e foco programático quando necessário;
- grupos com `fieldset` e `legend`;
- progresso, acerto e erro compreensíveis sem depender de cor;
- operação completa por teclado;
- alternativa a arrastar com Mover, Subir e Descer;
- posição e mudanças anunciadas para tecnologia assistiva;
- alertas e status sem remover contexto prematuramente;
- compatibilidade com alto contraste, texto ampliado e movimento reduzido;
- ausência de limite de tempo;
- legendas, transcrição e alternativa textual para futura mídia.

O escopo atual é desktop. Não declarar suporte móvel antes da etapa própria de implementação e validação.

## 13. Testes e critérios de aceite

### Automatizados

- identidade, versão, rota e catálogo;
- caminho integral, parcial e inseguro do avaliador;
- payload, IDs e versões inválidos;
- tentativa duplicada e idempotência de recompensa e contribuição;
- repetição, melhor nota e última tentativa;
- persistência, migração e quarentena;
- privacidade do agregado;
- Perfil, atividade recente, conquistas e recomendações;
- SSR da rota sem queda silenciosa para outro conteúdo.

### Manuais

- fluxo completo e retomada;
- teclado, foco, nomes acessíveis e mensagens de erro;
- alto contraste, texto ampliado e movimento reduzido;
- resultado e repetição;
- console do navegador sem erros.

Registrar resultados reais de build, lint, testes, verificação TypeScript e diferenças. Pendências preexistentes devem ser distinguidas de regressões novas.

## 14. Fora de escopo, pendências e riscos

Liste decisões abertas e dependências sem prometer implementação. Quando aplicável, registre separadamente integração real, celular, voz, vídeo, Arcade e Painel de gestão.

## 15. Histórico de decisões e versões

| Data | Decisão ou mudança | Estado | Versão afetada | Impacto ou migração |
|---|---|---|---:|---|
| AAAA-MM-DD |  | Documentada / Aprovada / Implementada / Validada |  |  |
