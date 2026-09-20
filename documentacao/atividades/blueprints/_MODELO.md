# Título da atividade

> **Estado do blueprint:** proposta detalhada; aguardando aprovação específica.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** registrar o estado real, sem inferir disponibilidade.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Missão / PhishLab / Simulação |
| Comportamento principal aprovado | Uma ação observável |
| Mecânica-base aprovada | Família e expressão específica |
| Estado da atividade atual | Disponível, planejada, inexistente ou relacionada a legado |
| Relação com implementação existente | Evolução, substituição futura, atividade nova ou nenhuma |
| `activityId`, versão e rota | Existentes ou explicitamente não definidos |
| Duração-alvo | Faixa proposta, não compromisso de catálogo |
| Regra de recompensa considerada | Regra atual da área ou a definir; não ativada pelo blueprint |
| Conceitos proprietários | Total e link para o mapa inverso |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- percursos e casos da primeira versão;
- interação, estados e revisão;
- critérios de avaliação e controles críticos;
- conteúdo fictício necessário;
- fronteiras de persistência, privacidade, acessibilidade e testes.

### 1.2 O que permanece sem decisão técnica

- identificador e rota novos, quando não existirem;
- versão executável e eventual migração;
- ordem de implementação;
- ativação de pontos e recompensa;
- integração corporativa ou publicação real.

## 2. Contrato educacional

- **Comportamento observável:**
- **Técnicas ou objetivos do atacante:**
- **Atalho inseguro enfrentado:**
- **Resposta segura generalizável:**
- **O que a conclusão permite afirmar:** desempenho nesta tentativa.
- **O que não permite afirmar:** retenção, domínio permanente ou capacidade de detectar fenômenos invisíveis.

## 3. Inventário de conceitos proprietários

Todos os conceitos pertencentes à atividade devem aparecer exatamente uma vez.

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|

Regras:

- papel e momento devem ser idênticos ao mapa aprovado;
- um conceito de banco não pode ser apresentado como obrigatório na primeira versão;
- versão futura e debrief não geram objetivo ou recompensa próprios;
- aplicações secundárias de conceitos pertencentes a outra atividade não mudam propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|

Cada percurso:

- mantém o mesmo comportamento principal;
- ativa no máximo dois conceitos com papel formal **Complementar**;
- pode usar mais de um conceito de núcleo somente quando todos explicarem a mesma ação observável;
- inclui legítimo, malicioso ou inconclusivo conforme a necessidade pedagógica;
- não é executado junto com os demais numa única tentativa;
- não cria recompensa separada.

## 5. Casos e conteúdo da primeira versão

Para cada percurso, registrar:

### Percurso PX — nome

| Elemento | Definição |
|---|---|
| Situação inicial |  |
| Canal e artefatos |  |
| Identidade ou pretexto |  |
| Objetivo do atacante ou hipótese legítima |  |
| Pressões e aparências |  |
| Evidências disponíveis |  |
| Evidência decisiva ou limite de certeza |  |
| Confirmação independente |  |
| Ação segura |  |
| Reporte ou recuperação |  |
| Transferência curta |  |
| Debrief |  |
| Conteúdo fictício necessário |  |

Nenhum artefato poderá executar ação real. Usar `.example`, dados mascarados e nomes fictícios revisáveis.

## 6. Mecânica e diferenciação

- **Interação central:**
- **Por que combina com o comportamento:**
- **Como se distingue das outras 21 atividades:**
- **O que é reutilizável:**
- **O que exige componente novo:**
- **Alternativa sem arrastar, mídia ou representação espacial:**
- **Risco de virar questionário disfarçado e prevenção:**

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|

O fluxo deverá incluir abertura, investigação, decisão inicial, consequência, revisão, decisão final, transferência, resultado e debrief. A pessoa pode revisar antes de concluir; velocidade não pontua.

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada |  |  |  |  |
| Em andamento |  |  |  |  |
| Retomada |  |  |  |  |
| Revisão |  |  |  |  |
| Concluída |  |  |  |  |
| Repetição |  |  |  |  |
| Conteúdo indisponível |  |  |  |  |
| Resposta inválida |  |  |  |  |
| Falha ao salvar |  |  |  |  |

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|

Regras obrigatórias:

- pesos somam 100;
- nota fica entre 0 e 100;
- conclusão é separada de desempenho;
- `needsReview` considera nota e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- sinais isolados não recebem valor de veredito;
- não existe pontuação por velocidade;
- casos legítimos não premiam obediência automática a processo incompleto.

### 9.1 Controles críticos

Liste ações cuja ausência exige revisão mesmo com nota total acima do corte.

### 9.2 Resultado privado

Descreva nota, decomposição, decisões, feedback, competências, recomendação e recompensa potencial. Toda atividade implementada deve encerrar com revisão privada que indique textualmente **Acertou** ou **Precisa revisar**, apresente a resposta do funcionário quando disponível, explicite o comportamento esperado e explique o motivo sem culpa. Não expor resposta individual em agregado de equipe.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** Missão 100, PhishLab 60 ou Simulação 70, sujeita à aprovação da versão executável e às regras vigentes.
- **Bônus:** aplicar somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** nunca reinterpretar nem conceder novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor no uso real | idempotente |
| `activityId` | ID publicado | Sim | catálogo autoritativo | rejeitar divergência |
| `activityVersion` | versão publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | não confiar no cliente |
| `completedAt` | data válida | Sim | servidor no uso real | não pontuar velocidade |

Adicionar somente campos brutos necessários à interação. Nota, bônus, competências e feedback são derivados pelo avaliador autoritativo.

### 11.1 Invariantes

- IDs e opções pertencem à versão publicada;
- listas rejeitam duplicatas e valores extras;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op;
- tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Registrar o mínimo necessário para retomada, resposta bruta, resultado derivado e progresso, mantendo `isAuthoritative: false`.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização, público, versão, pacote de caso, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão.

### Compatibilidade

- mudança semântica exige `activityVersion` nova;
- mudança de forma persistida exige análise de `APP_SCHEMA_VERSION`;
- tentativas anteriores permanecem legíveis e imutáveis;
- migrações preservam progresso, pontos, recompensas, preferências e evidências;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta |  |  |  |  |
| Nota e feedback |  |  |  |  |
| Competências |  |  |  |  |
| Recompensa |  |  |  |  |
| Agregado |  |  |  |  |

Proibir credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando ou reporte real. O player não deve afirmar que uma ação corporativa foi executada.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente após transição;
- estrutura e ordem compreensíveis por leitor de tela;
- `fieldset` e `legend` para decisões relacionadas;
- operação integral por teclado;
- botões Mover/Subir/Descer e posição anunciada para ordenação;
- tabela ou seletores como equivalentes de grafos e relações visuais;
- texto equivalente para ilustração, áudio ou vídeo;
- feedback e erro em regiões adequadas sem apagar contexto;
- contraste, texto ampliado e movimento reduzido;
- ausência de limite de tempo;
- linguagem sem culpa;
- desktop neste blueprint; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado |  |  |  |
| Interface |  |  |  |
| Contrato e avaliador |  |  |  |
| Estado e provider |  |  |  |
| Persistência |  |  |  |
| Integrações |  |  |  |
| Testes |  |  |  |

Registrar esforço relativo e a posição provável nas camadas P0, P1, P2 ou P3 da análise arquitetural. Isso não é cronograma.

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote e opções por allowlist;
- avaliador integral, parcial, inseguro e inválido;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada e repetição com nova tentativa;
- recompensa, evidência e contribuição idempotentes;
- persistência, migração e quarentena;
- privacidade de qualquer agregado;
- Perfil, atividade recente e recomendação;
- rota própria sem cair silenciosamente no hub;
- interação, teclado, foco e alternativa acessível em navegador.

### Manuais no desktop

- percursos completos, revisão, retomada e repetição;
- caso integral, parcial, inseguro, legítimo e inconclusivo quando aplicável;
- teclado, leitor de tela, foco e anúncios;
- alto contraste, texto ampliado e movimento reduzido;
- console sem erros e nenhum efeito externo.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|

Todo conceito proprietário fora da primeira versão precisa aparecer nesta seção. Conceitos invisíveis permanecem explicativos; mídia e integrações reais continuam condicionadas.

## 18. Pendências para aprovação específica

Liste apenas decisões que realmente precisam ser tomadas antes de converter o blueprint em ficha versionada. Não repetir limites transversais já definidos.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
