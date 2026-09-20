# Arquitetura atual e implicações para os formatos

> **Estado:** inventário técnico de 2026-08-11; não autoriza refatoração ou implementação.

## 1. Base do portal

O portal utiliza React 19, Next 16 e Vinext, com saída compatível com Cloudflare. A configuração de hospedagem não declara D1 nem R2. O produto atual funciona como demonstração local e toda a persistência de aprendizagem permanece no navegador.

As rotas de Missões, PhishLab, Simulações, Equipes, Radar e Perfil reexportam a mesma página principal. `app/page.tsx` interpreta o caminho e decide qual experiência renderizar. Radar e Arcade já resolvem itens catalogados genericamente por slug, mas um novo player, tipo de experiência ou área tratada por ramificação fixa ainda depende do roteador central e aumenta o acoplamento entre áreas.

Indicadores de concentração encontrados nesta auditoria:

| Arquivo | Situação atual |
|---|---:|
| `app/page.tsx` | 2.759 linhas |
| `app/globals.css` | 9.677 linhas |
| `lib/state/app-reducer.ts` | 1.278 linhas |
| `lib/domain/rules.ts` | 1.238 linhas |
| `lib/state/persistence.ts` | 1.081 linhas |
| `tests/rendered-html.test.mjs` | 2.628 linhas e 17 blocos de teste |

Esses números não constituem erro por si só, mas indicam que implementar muitas mecânicas diretamente nesses arquivos aumentaria risco de regressão e custo de manutenção.

## 2. Capacidades já existentes

### Interface e fluxo

O portal já possui padrões aproveitáveis para:

- briefing, metadados e stepper de etapas;
- grupos de escolhas únicas e múltiplas;
- botões de evidência com estado pressionado;
- caixa de mensagens e seleção de item;
- fontes factuais liberadas progressivamente;
- comparação de respostas com resultado e debrief;
- listas, filtros, cards, abas e estados vazios;
- progresso, recomendações, histórico, pontos e conquistas;
- foco por etapa, `fieldset`/`legend`, regiões de status/alerta e preferência de movimento reduzido em experiências recentes.

Esses padrões favorecem formatos baseados em decisão, triagem, inspeção por camadas, montagem por opções, linha temporal simples e comparação de registros.

### Domínio e avaliação

Existem contratos próprios para:

- Missão genérica;
- Missão de recuperação;
- PhishLab;
- Simulação;
- Radar;
- desafio de Equipes;
- Mudança bancária sem atalho.

As submissões possuem validadores por allowlist e avaliadores determinísticos, e o reducer rejeita respostas inválidas antes de persistir progresso. O fluxo do provider, porém, ainda não aplica de forma uniforme a ordem **validar → avaliar → persistir/retornar**: Simulação e desafio de Equipes podem ser avaliados e devolvidos à interface antes da rejeição pelo reducer. Essa fronteira precisa ser padronizada antes de ampliar os contratos.

Tentativas, melhor nota, última tentativa, recompensa única, evidências de competência, recomendações e histórico derivam do reducer central.

### Persistência e privacidade

O esquema local está na versão 6. A aplicação valida o envelope, migra versões anteriores e envia estado inválido para quarentena. O protótipo já demonstra idempotência de tentativa, recompensa única e separação entre resultado privado e contribuição coletiva resumida.

Essa base ajuda atividades discretas e determinísticas. Ela não substitui o backend autoritativo e não deve receber dados reais de credencial, conta, pessoa, pagamento, reporte ou diretório.

### Testes

A suíte atual cobre SSR por conteúdo, contratos, avaliadores, reducers, idempotência, migrações, privacidade, percurso, Perfil, Radar, Arcade e Equipes. Ela não possui hoje um ambiente de navegador para provar interação por teclado, foco real, ordem anunciada, contraste ou verificações automatizadas de acessibilidade. Novas mecânicas deverão manter a cobertura existente e acrescentar um harness de interação/acessibilidade para provar:

- resposta válida e inválida;
- melhor, parcial e insegura;
- repetição e identificador duplicado;
- recompensa única;
- persistência e migração;
- ausência de dados privados em agregados;
- SSR próprio e integração nos hubs;
- teclado, foco, anúncios, alternativas sem arrastar e demais estados acessíveis no navegador.

## 3. Capacidades ausentes

Não existem hoje componentes ou subsistemas compartilhados para:

- reordenação acessível de cartões ou linha temporal;
- mapa de relações entre identidade, conta, domínio e controle;
- decomposição visual genérica de URL;
- montagem de fluxo com dependências entre ações;
- grafo, planta, mapa espacial ou conexão entre nós;
- áudio, vídeo, transcrição sincronizada ou gestão de mídia;
- upload, arquivo real, QR por câmera ou leitura de artefato externo;
- terminal, navegador remoto, aplicativo bancário ou sistema corporativo real;
- editor de casos, banco rotativo de variações ou publicação versionada de conteúdo;
- salvamento de rascunho/retomada durante uma atividade;
- telemetria, colaboração simultânea ou eventos em tempo real;
- diretório, help desk, correio, identidade, banco ou canal de reporte integrados.

Nenhuma dessas ausências torna uma ideia impossível. Elas mudam a classificação de reuso localizado para componente ou subsistema novo.

## 4. Custo transversal de uma nova mecânica

Uma interação visual isolada não encerra uma atividade. Uma mudança semântica normalmente precisa atravessar:

1. catálogo e conteúdo versionado;
2. tipo de resposta e tentativa;
3. validação por allowlist;
4. avaliador e feedback;
5. action/provider;
6. reducer, progresso e recompensa;
7. persistência, migração e quarentena;
8. seletores, Perfil e atividade recente;
9. rota e hub;
10. estilos, acessibilidade e testes.

Por isso, uma mecânica visual aparentemente pequena pode receber esforço **G** quando altera a forma persistida ou precisa ser reutilizada por várias atividades.

## 5. Famílias com melhor encaixe imediato

Possuem base forte no portal:

- investigação por evidências reveladas;
- comparação lado a lado ou por camadas;
- decisão com resposta revisável;
- triagem de itens legítimos, maliciosos e inconclusivos;
- montagem de resposta por categorias;
- sequência de etapas com fontes progressivas;
- debrief causal e recomendações derivadas.

Podem avançar com componentes reutilizáveis novos, sem exigir plataforma externa:

- ordenação acessível;
- linha temporal;
- mapa de identidade por seletores;
- decomposição de URL;
- estação de processo;
- fila explícita de inconclusivos;
- construtor de reporte com campos fictícios e minimização.

## 6. Famílias que exigem adiamento ou adaptação

Possuem custo ou dependência maior:

- voz, vídeo, deepfake e reunião audiovisual;
- mapas espaciais e ambientes físicos ricos;
- simulação multicanal em tempo real;
- editor de conteúdo e geração de casos combinatórios;
- integração com diretório, identidade, e-mail, banco ou reporte;
- qualquer mecânica baseada em detecção humana de fenômeno invisível;
- qualquer formato que dependa de ação real em dispositivo, arquivo, QR, comando, pagamento ou conta.

Esses conceitos podem continuar ensináveis por narrativa textual, transcrição, artefatos inertes, retrospectiva causal e divisão de responsabilidades.

## 7. Refatorações recomendadas antes de ampliar o portfólio

Esta análise não autoriza as mudanças abaixo, mas identifica uma ordem de preparação provável:

1. extrair um `ActivityShell` com título, stepper, foco, navegação, erro e resultado;
2. criar componentes compartilhados para escolhas, evidências, fontes e debrief;
3. separar registro de rota/atividade do `app/page.tsx`;
4. criar uma camada declarativa para conteúdo e opções versionadas;
5. padronizar contratos de tentativa com extensões por mecânica e a ordem **validar → avaliar → persistir/retornar**;
6. criar componentes acessíveis de ordenação, linha temporal e relação;
7. dividir estilos por experiência ou família de mecânica;
8. separar testes de contrato, estado e SSR e adicionar testes reais de interação, teclado, foco e acessibilidade;
9. somente depois avaliar rascunho persistido, banco de casos e mídia.

## 8. Regra para a análise por conceito

A classificação considera o código atual, mas evita perpetuar suas limitações. Reutilizar uma tela inadequada apenas para reduzir esforço não torna um formato recomendável. Da mesma forma, um componente novo pode ser preferível quando elimina repetição e sustenta várias atividades com acessibilidade consistente.

Backend autoritativo permanece condição obrigatória antes do uso real, independentemente da classificação de viabilidade local. Esse gate de produção é diferente das integrações corporativas opcionais: mesmo uma atividade sem diretório, banco ou e-mail real deverá ter identidade, autorização, versão publicada, validação, avaliação, recompensa, idempotência, auditoria e retenção controladas pelo servidor.
