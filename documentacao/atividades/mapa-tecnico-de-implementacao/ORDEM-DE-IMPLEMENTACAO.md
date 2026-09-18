# Ordem de implementação e gates

> **Estado:** ordem técnica aprovada; Onda 0 e provas 1.1–1.2 concluídas, sem transformar a sequência em cronograma.
>
> **Regra:** dependência arquitetural determina esta ordem. A ordem de aprendizagem foi aprovada separadamente na [jornada curricular](../mapa-conceitos-atividades/JORNADA-CURRICULAR.md) e não deve ser inferida das ondas abaixo.

## 1. Visão geral

| Onda | Objetivo | Atividades | Saída esperada |
|---:|---|---:|---|
| 0 | fundação P0 | nenhuma nova | registro, shell, runtime, conteúdo versionado e testes |
| 1 | provar quatro mecânicas fundamentais | 4 evoluções v2 | anatomia, timeline, relações e montador validados |
| 2 | ampliar inspeção e navegação segura | 5 novas | famílias C1/C2 aplicadas sem duplicação |
| 3 | processos, arquivos e rotina | 4 atividades | estação, ação e fila inconclusiva validadas |
| 4 | identidade contextual e consoles | 7 atividades | máquina de estados, dossiê e relações compostas |
| 5 | síntese multicanal | 1 nova | combinação C2+C3+C7/C8 validada |
| 6 | validação do portal do funcionário | 21 | catálogo, Perfil, recompensas, acessibilidade e regressão completos |
| posterior | Painel de gestão | fora deste mapa | somente após o portal do funcionário |

## 2. Onda 0 — fundação P0

Executar a ordem descrita em [`FUNDACAO-P0.md`](FUNDACAO-P0.md). Nenhuma nova atividade é marcada como disponível nesta onda.

### Entrada

- mapa técnico aprovado;
- worktree preservado e testes-base registrados;
- decisão explícita sobre dependências de teste de navegador.

### Saída

- rotas atuais resolvidas pelo registro sem regressão;
- shell flexível provado em pelo menos um player atual;
- submissões atuais usando validar → avaliar → persistir/retornar;
- conteúdo e runtime preparados para a primeira atividade v2;
- harness real de teclado, foco e acessibilidade;
- esquema ainda v6 enquanto a forma persistida não mudar.

## 3. Onda 1 — provas fundamentais, uma por vez

As quatro provas não devem ser abertas em paralelo. Cada uma precisa fechar testes e documentação antes da próxima.

### 1.1 Domínio sob a lupa v2 — concluída em 2026-08-15

**Prova:** C0, C1 e C9; pacote versionado; migração candidata v7; preservação de recompensa v1.

**Por que primeiro:** a atividade tem escopo visual contido, avaliador determinístico e maior reuso para URL, QR, página, consentimento, arquivo, busca e pagamento.

**Gate de saída:** protocolo, subdomínio, domínio registrado, caminho e parâmetro funcionam por representação visual e tabela textual; v1 permanece legível; nenhuma recompensa duplicada.

O gate foi aprovado por testes de contrato, avaliador, reducer, migração, SSR e navegador. Três pacotes alternativos foram publicados, o envelope local passou a v7 sem fabricar dados e o backend continuou explicitamente não autoritativo.

### 1.2 A conversa já estava acontecendo v2 — concluída em 2026-08-15

**Prova:** C2, ordem parcial, ponto de mudança e evidências fixadas.

**Gate de saída:** ordenar funciona por teclado/botões; ponto de mudança não é revelado pela apresentação; confirmação fora da thread é controle crítico; tentativa v1 permanece histórica.

O gate foi aprovado por contrato, avaliador, reducer, migração, SSR e navegador. Três pacotes alternativos foram publicados; ordem, ponto de mudança, classificação fato/indício/inferência, confirmação externa, reporte condicional e transferência usam a mesma atividade lógica. O envelope passou a v8 sem fabricar dados e sem reabrir a recompensa v1.

### Gate curricular intermediário — fundação v2

Antes da prova 1.3, o [blueprint de **O aviso que não podia esperar v2**](../blueprints/missao--o-aviso-que-nao-podia-esperar.md) precisa ser aprovado. A fundação não conta como uma quinta prova da Onda 1: ela corrige a entrada pedagógica, extrai o piloto inline e aplica pacote único automático e clareza contextual sobre a infraestrutura já provada. Se convertida, sua nova forma de tentativa ativa a proposta de esquema 9 antes da prova seguinte.

### 1.3 Quem enviou de verdade? v2

**Prova:** C3 com tabela canônica e visual derivado.

**Gate de saída:** fatos, inferências e controle não comprovado permanecem distintos; leitor de tela executa toda a atividade sem o grafo; v1 não é reinterpretada.

### 1.4 Cliquei. E agora? v2

**Prova:** C4, categorias de ação, dependências e construtor de reporte.

**Gate de saída:** todos os cartões podem ser classificados sem arrastar; ordem parcial evita sequência artificial; nenhum segredo é selecionável; recompensa v1 não reabre.

## 4. Onda 2 — inspeção e rota segura

Esta onda reutiliza as provas C1, C2 e C9. A numeração é ordem candidata dentro da onda.

| Ordem | Atividade | Dependência | Razão da posição |
|---:|---|---|---|
| 2.1 | Uma letra fora do lugar | C1 | extensão pequena da comparação textual |
| 2.2 | O destino atrás do QR | C1 | prévia fictícia, sem câmera ou QR ativo |
| 2.3 | Para onde esse link realmente vai? | C1 + C2 | cadeia inerte e precedência já provadas |
| 2.4 | Espelho de Página | C1 + snapshots inertes | prova origem e ação, não diferença cosmética |
| 2.5 | O primeiro resultado | C1 + planejador de rota | transfere o processo para busca/anúncio |

### Gate de saída da onda

- os cinco players reutilizam conteúdo e anatomia sem condicionais por atividade;
- nenhum endereço, QR, botão de página ou resultado é navegável;
- casos legítimos e inconclusivos impedem regras absolutas;
- cada atividade possui ID, rota e recompensa próprios apenas após integração completa.

## 5. Onda 3 — processo, arquivo e rotina

| Ordem | Atividade | Dependência | Prova principal |
|---:|---|---|---|
| 3.1 | Documento inesperado | C1 + C4 | propriedades, contexto e recusa de quebra de proteção |
| 3.2 | Pedido urgente de um gestor | C5 | processo prevalece sobre cargo e urgência |
| 3.3 | Pagamento para quem? | C5 + C1 + C3 | obrigação, recebedor e controles; sem duplicar Equipes |
| 3.4 | Uma manhã comum v2 | C6 + C9 | lote misto, fila inconclusiva e revisão global |

### Gate de saída da onda

- arquivos continuam descritos e inertes;
- a estação é reutilizável e não carrega agregado de Equipes;
- a triagem não fornece feedback antes da revisão;
- rascunho só é persistido se a implementação aprovada demonstrar necessidade;
- atividades preservam casos legítimos e decisão inconclusiva.

## 6. Onda 4 — contexto, autenticação e console textual

| Ordem | Atividade | Dependência | Prova principal |
|---:|---|---|---|
| 4.1 | Login verdadeiro, permissão errada | C1 + C3 | finalidade, aplicativo, publicador e escopos |
| 4.2 | De qual dispositivo veio este código? | C3 + C7 mínimo | código, origem, dispositivo e sessão |
| 4.3 | Você iniciou este acesso? v2 | C7 | eventos MFA e falso suporte reativo |
| 4.4 | A central que não podia esperar | C7 + diretório fictício | encerrar callback e iniciar rota oficial |
| 4.5 | O pedido não tinha link | matriz fato/necessidade + C5 | pretexting sem link ou artefato técnico |
| 4.6 | Ele já sabia meus dados | dossiê + narrativa textual | dado correto não autentica a pessoa |
| 4.7 | Central de mensagens | C3 + C9 | continuidade entre conversas paralelas |

### Gate de saída da onda

- consoles são máquinas de estados finitas, não IA generativa;
- nenhum código, sessão, aplicativo ou contato é real;
- conta, canal e pessoa permanecem entidades distintas;
- mídia sintética aparece somente como descrição ou debrief textual;
- casos legítimos não são punidos por mudança de número ou pedido incomum quando o processo confirma.

## 7. Onda 5 — Ataque multicanal

**Dependências:** C2, C3, C7 e C8 já validados em atividades menores.

Esta Simulação é a última atividade nova porque combina linha temporal, relações, canais, dependências e controles de interrupção. A primeira versão permanece textual e inerte.

### Gate de saída

- a tabela canônica permite executar tudo sem o mapa visual;
- o avaliador distingue canais independentes de autocorroboração;
- transcrição não é tratada como chamada real;
- áudio, vídeo, deepfake e reunião rica continuam fora;
- retomada de grafo parcial, se implementada, possui expiração e validação próprias.

## 8. Onda 6 — validação completa do portal do funcionário

Nenhum Painel de gestão começa antes deste gate.

### Catálogo e navegação

- 21 atividades com identidade única e rota própria;
- atividade planejada nunca cai silenciosamente no hub;
- percurso e pré-requisitos revisados separadamente da ordem técnica;
- Radar opcional, pontuado e nunca bloqueante;
- Arcade inalterado como catálogo.

### Aprendizagem e estado

- progresso Não iniciada/Em andamento/Concluída consistente;
- melhor e última tentativa corretas por versão;
- recompensa única por atividade lógica;
- Perfil, conquistas, competências e atividade recente derivados do mesmo estado;
- recomendações não confundem revisão opcional com bloqueio.

### Compatibilidade

- formas v1 e v2 legíveis;
- migrações v1–v8, com v8 ativado;
- quarentena de tentativa, pacote ou versão inválidos;
- reset demonstrativo preserva preferências de segurança esperadas pelo contrato vigente.

### Desktop e acessibilidade

- teclado, foco, anúncios e alternativas em todos os players;
- alto contraste, texto ampliado e movimento reduzido;
- 1280 × 720 e 1440 × 900 sem overflow horizontal;
- nenhum limite de tempo ou ponto por velocidade;
- linguagem sem culpa e estados de erro acionáveis.

### Segurança e privacidade

- nenhum efeito externo;
- nenhum segredo ou dado real persistido;
- resultado individual privado;
- agregado somente onde a atividade de Equipes já o define;
- `isAuthoritative: false` visível na demonstração;
- gate de backend documentado e não apresentado como concluído.

## 9. Quando uma atividade pode avançar de onda

Cada atividade avança apenas quando:

1. blueprint e identidade técnica estão aprovados;
2. dependências compartilhadas passaram no consumidor anterior;
3. pacote inicial e allowlists estão fechados;
4. contrato, avaliador e controles críticos possuem testes;
5. estratégia de versão, recompensa e migração está definida;
6. interação acessível está provada em navegador;
7. ficha canônica e documento principal foram atualizados;
8. nenhuma regressão ficou pendente no portal do funcionário.

Uma onda pode ser interrompida entre atividades sem deixar contratos ou versões parcialmente publicados.
