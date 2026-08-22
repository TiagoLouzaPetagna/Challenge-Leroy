# O primeiro resultado

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** atividade do portfólio-alvo ainda inexistente no catálogo executável; não possui player, identificador, versão ou rota.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | Simulação |
| Comportamento principal aprovado | Chegar a um serviço, suporte ou download pela origem oficial conhecida, sem tomar posição ou aparência do resultado como prova |
| Mecânica-base aprovada | Página sintética de resultados com inspetor de origem e montador de rota segura |
| Estado da atividade atual | Inexistente como atividade integrada |
| Relação com implementação existente | Atividade nova; poderá reutilizar inspetor de artefato e anatomia de destino |
| `activityId`, versão e rota | Não definidos |
| Duração-alvo | 7 a 10 minutos |
| Regra de recompensa considerada | 70 pontos-base de Simulação e bônus transversal, não ativados por este blueprint |
| Conceitos proprietários | 4, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md) |
| Escopo de dispositivo | Desktop; celular posterior |
| Dependência de backend | Obrigatória antes do uso real |

### 1.1 O que este blueprint decide

- três pacotes iniciais: resultado malicioso, anúncio legítimo e origem inconclusiva;
- uma interface de resultados inteiramente fictícia, sem copiar marca ou mecanismo real;
- construção de rota segura a partir de diretório, favorito conhecido ou endereço aprovado;
- avaliação da origem e do processo, não da posição “patrocinado/orgânico” isolada;
- ausência de navegação, download, instalação ou pesquisa real.

### 1.2 O que permanece sem decisão técnica

- `activityId`, versão executável e rota;
- linguagem visual final da página sintética;
- conjunto editorial de serviços e tarefas;
- uso compartilhado do inspetor com PhishLabs ainda a aprovar;
- ordem de implementação, publicação e recompensa.

## 2. Contrato educacional

- **Comportamento observável:** inspecionar a origem de opções encontradas e montar uma rota independente até o serviço apropriado antes de realizar tarefa sensível.
- **Técnicas ou objetivos do atacante:** envenenamento de resultados, anúncio malicioso, nome semelhante e falsa central de suporte ou download.
- **Atalho inseguro enfrentado:** acreditar que o primeiro resultado, um anúncio bem apresentado ou um texto familiar foi validado pela busca.
- **Resposta segura generalizável:** iniciar a tarefa em um ponto confiável — diretório, favorito, endereço conhecido ou catálogo autorizado — e verificar o domínio registrado antes de prosseguir.
- **O que a conclusão permite afirmar:** como a pessoa escolheu e justificou uma rota neste cenário sintético.
- **O que não permite afirmar:** que anúncios ou resultados orgânicos são sempre seguros ou inseguros, nem que a pessoa detectará manipulação invisível do mecanismo real.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso neste blueprint | Percurso ou destino |
|---|---|---|---|---|
| `concept:seo-poisoning` | Núcleo | Primeira versão | Posição e texto de resultado são tratados como descoberta, não autenticação | P1, P2 e P3 |
| `concept:malicious-ad` | Complementar | Primeira versão | Anúncio pode ser legítimo ou malicioso e exige confirmação da origem | P1, P2 e P3 |
| `concept:fake-app-developer` | Variação de caso | Banco de casos | Comparação entre editor alegado e origem oficial de aplicativo | Banco de casos |
| `concept:fake-update` | Variação de caso | Banco de casos | Aviso de atualização como isca para origem falsa | Banco de casos |

## 4. Arquitetura da primeira versão

Uma tentativa recebe um dos três pacotes, sempre com um Núcleo e um Complementar formal.

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Suporte urgente no topo | Funcionário precisa localizar suporte de um serviço | Montar rota oficial em vez de seguir posição | `concept:malicious-ad` | Resultado semelhante aparece como item orgânico | Malicioso |
| P2 — Anúncio legítimo, rota sensível | Um anúncio verdadeiro aparece acima do resultado oficial | Confirmar a origem e manter rota aprovada para tarefa sensível | `concept:malicious-ad` | Outro anúncio legítimo usa domínio de campanha autorizado | Legítimo |
| P3 — Nome semelhante sem referência suficiente | Vários resultados plausíveis e nenhuma fonte autorizada disponível | Declarar insuficiência e buscar rota organizacional | `concept:malicious-ad` | Um resultado orgânico também permanece sem confirmação | Inconclusivo |

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Suporte urgente no topo

| Elemento | Definição |
|---|---|
| Situação inicial | Um erro fictício exige localizar o suporte da plataforma “Nuvem Clara” |
| Canal e artefatos | Lista sintética de resultados, trechos, rótulos de anúncio, URLs exibidas e catálogo interno |
| Identidade ou pretexto | Falsa central de suporte com nome e texto próximos do serviço |
| Objetivo do atacante ou hipótese legítima | Levar a página inerte que pediria credencial ou instalação |
| Pressões e aparências | Resultado no topo, texto “oficial”, urgência do erro e aparência profissional |
| Evidências disponíveis | URL completa, anunciante alegado, diretório interno e endereço oficial conhecido |
| Evidência decisiva ou limite de certeza | O resultado superior usa domínio diferente; posição e texto não validam a origem |
| Confirmação independente | Consultar o catálogo sintético ou abrir o favorito conhecido dentro do exercício |
| Ação segura | Descartar a rota recebida e construir a rota pelo ponto autorizado |
| Reporte ou recuperação | Reportar o resultado suspeito apenas com URL aparente e contexto, sem visitá-lo |
| Transferência curta | Um resultado orgânico usa o mesmo domínio semelhante; “orgânico” também não autentica |
| Debrief | Compara posição, rótulo, origem e caminho escolhido |
| Conteúdo fictício necessário | Mecanismo de busca genérico, cinco resultados, domínios `.example` e catálogo |

### Percurso P2 — Anúncio legítimo, rota sensível

| Elemento | Definição |
|---|---|
| Situação inicial | A pessoa precisa acessar a página de administração de um serviço fictício |
| Canal e artefatos | Resultados sintéticos, anúncio legítimo, resultado oficial e diretório |
| Identidade ou pretexto | Campanha autorizada do próprio serviço |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima; o exercício controla o falso positivo |
| Pressões e aparências | O anúncio usa parâmetros de campanha e um domínio auxiliar autorizado |
| Evidências disponíveis | Registro de origem oficial, diretório e relação publicada entre domínios |
| Evidência decisiva ou limite de certeza | A fonte independente confirma a campanha, mas a tarefa sensível ainda possui rota administrativa conhecida |
| Confirmação independente | Consultar o diretório e usar o endereço administrativo aprovado |
| Ação segura | Não reportar o anúncio; realizar a navegação simulada pela rota oficial sensível |
| Reporte ou recuperação | Nenhum reporte de fraude; eventual anotação operacional sem dados pessoais |
| Transferência curta | Outro anúncio legítimo aponta a uma página pública, enquanto a área sensível continua no endereço conhecido |
| Debrief | Ensina que “patrocinado” é contexto, não veredito, e que a sensibilidade muda o controle |
| Conteúdo fictício necessário | Cinco resultados, registro de campanha e duas rotas autorizadas |

### Percurso P3 — Nome semelhante sem referência suficiente

| Elemento | Definição |
|---|---|
| Situação inicial | Um portal técnico pouco conhecido precisa ser localizado, mas o catálogo está temporariamente indisponível |
| Canal e artefatos | Resultados sintéticos com nomes, URLs e descrições plausíveis |
| Identidade ou pretexto | Possíveis portais e equipes de suporte alegados |
| Objetivo do atacante ou hipótese legítima | Não é possível distinguir origem legítima de imitadora com os dados apresentados |
| Pressões e aparências | Primeiro resultado, rótulo de anúncio e avaliações simuladas |
| Evidências disponíveis | URLs completas e estado de indisponibilidade da fonte autorizada |
| Evidência decisiva ou limite de certeza | Nenhuma referência independente valida o prestador ou o destino |
| Confirmação independente | Encaminhar ao catálogo/suporte autorizado e aguardar; não simular confirmação |
| Ação segura | Não abrir nem acusar; reter a tarefa e registrar a necessidade de origem oficial |
| Reporte ou recuperação | Relato de busca inconclusiva, sem classificar resultado como malicioso |
| Transferência curta | Um resultado orgânico tem nome idêntico, mas continua sem âncora |
| Debrief | Mostra que ausência de prova não deve virar clique nem acusação |
| Conteúdo fictício necessário | Quatro resultados, estado de fonte indisponível e opções de escalonamento |

## 6. Mecânica e diferenciação

- **Interação central:** inspecionar resultados sintéticos e montar, em etapas, uma rota até origem, serviço e área desejada.
- **Por que combina com o comportamento:** o ensino acontece na escolha do ponto de partida e na proveniência, não em “achar o resultado feio”.
- **Como se distingue das outras 21 atividades:** PhishLabs de URL dissecam um destino recebido; esta Simulação começa antes do destino, num ambiente de descoberta com várias opções plausíveis.
- **O que é reutilizável:** inspetor de URL, anatomia de domínio, cartões de artefato, montador de sequência e resultado.
- **O que exige componente novo:** lista de resultados genérica e planejador de rota que separa descoberta, confirmação e navegação sensível.
- **Alternativa sem arrastar, mídia ou representação espacial:** lista ordenada com botões `Inspecionar` e `Adicionar à rota`; passos podem ser reordenados por Subir/Descer.
- **Risco de virar questionário disfarçado e prevenção:** não há pergunta “qual link é falso?”; a pessoa precisa construir uma rota completa e pode concluir que nenhuma opção é suficiente.

A interface não replica identidade visual de mecanismo de busca, loja ou fornecedor real. Resultados são inertes e não aceitam URL digitada livremente.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Tarefa, limites, privacidade e ausência de navegação real | Iniciar | Pacote válido | Início e pacote | Sem revelar resultado | `h1` e resumo |
| Investigação | Resultados sintéticos e fontes disponíveis | Inspecionar URL, rótulo, anunciante e origem | Livre inspeção | Resultados e campos vistos | Confirma inspeção | Lista semântica |
| Decisão inicial | Pontos possíveis de partida | Selecionar um ponto e justificar com evidência estruturada | Escolha pertence ao pacote | Origem e evidência | Sem acerto antecipado | `fieldset` |
| Consequência | Catálogo ou registro consultado | Atualizar a rota | Libera somente fato publicado | Fonte consultada | Status factual | Texto equivalente |
| Revisão | Rota montada e lacunas | Reordenar/corrigir passos | Rota precisa terminar em ação proporcional | Rascunho | Aviso de incompletude | Subir/Descer e lista numerada |
| Decisão final | Origem, serviço, área e ação | Confirmar rota | Validação semântica | Resposta bruta | Sem nota antecipada | Resumo antes do envio |
| Transferência | Novo resultado com rótulo diferente | Reaplicar o processo | Uma decisão curta | Origem, certeza e ação | Sem acerto antecipado | Texto |
| Resultado | Nota e decomposição | Consultar feedback | Tentativa válida | Resultado derivado | Privado | Tabela |
| Debrief | Fato, indício, hipótese, limite e rota segura | Rever ou repetir | Nova tentativa na repetição | Intenção de repetir | Explicação completa | Conteúdo linear |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem rascunho/tentativa | Apresentação e iniciar | Progresso oficial Não iniciada | `h1` e descrição |
| Em andamento | Pacote aberto | Resultados, inspetor, fontes e rota | Pacote, inspeções e passos | Foco e progresso textual |
| Retomada | Rascunho compatível | Resumo da rota e continuar/recomeçar | Mesma versão/pacote | Anúncio do ponto retomado |
| Revisão | Rota provisória montada | Lista editável e lacunas | Rascunho preservado | Passos numerados |
| Concluída | Tentativa válida | Resultado, debrief e repetição | Progresso oficial Concluída | Foco no resultado |
| Repetição | Já concluída | Pacote diferente quando disponível | Melhor e última separadas | Aviso de recompensa única |
| Conteúdo indisponível | Pacote/versão ausente | Retorno ao hub | Sem tentativa | Status e foco |
| Resposta inválida | ID/rota incoerente | Corrigir sem perda | Sem conclusão | Alerta associado |
| Falha ao salvar | Persistência recusada | Tentar novamente | Sem recompensa | Alerta e contexto preservado |

Somente Não iniciada, Em andamento e Concluída são estados oficiais de progresso.

## 9. Avaliação e feedback

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Origem e fonte | 30 | Distingue resultado, anunciante, domínio e fonte autorizada | Inspeciona origem, mas deixa uma dependência implícita | Usa posição, rótulo ou aparência como prova | Observar, Verificar |
| Seleção da rota | 30 | Parte de âncora conhecida e chega à área correta | Rota segura, porém indireta ou incompleta | Abre resultado não confirmado ou usa destino recebido para tarefa sensível | Verificar, Decidir |
| Evidências e limite | 25 | Usa evidência pertinente e declara insuficiência quando necessário | Evidência segura, porém incompleta | Inventa certeza ou ignora fonte indisponível | Observar, Reportar |
| Falso positivo e proporcionalidade | 15 | Não reporta anúncio legítimo e não obedece automaticamente | Evita dano com excesso de cautela | Considera todo anúncio fraudulento ou prossegue sem controle | Decidir, Orientar |

Os pesos somam 100. Conclusão e desempenho são separados; velocidade não pontua.

### 9.1 Controles críticos

- tarefa sensível não pode começar por resultado cuja origem não foi confirmada;
- posição, rótulo de anúncio, avaliações ou aparência não podem valer como prova;
- pacote inconclusivo deve terminar em retenção/escalonamento, não clique ou acusação;
- anúncio legítimo confirmado não deve gerar reporte de fraude;
- nenhum passo pode representar navegação ou download real.

`needsReview` é verdadeiro abaixo de 60 pontos ou quando qualquer controle crítico falha.

### 9.2 Resultado privado

O resultado mostra nota, quatro parcelas, rota montada, fontes utilizadas, distinção entre sinal e prova, ação final, competências, `needsReview`, debrief e recompensa potencial. Nenhuma URL, nota, escolha ou recomendação individual vai para agregado de equipe.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 70 pontos de Simulação, sujeita à aprovação da versão executável.
- **Bônus:** aplicar somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição atualiza melhor e última tentativa sem duplicar pontos.
- **Versões anteriores:** não existem; este blueprint não cria chave de recompensa.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo aprovado no código.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| `attemptId` | identificador não vazio | Sim | demonstração local; servidor real | idempotente |
| `activityId` | ID futuro publicado | Sim | catálogo autoritativo | ainda não definido |
| `activityVersion` | versão futura publicada | Sim | catálogo autoritativo | rejeitar desconhecida |
| `casePackageId` | allowlist versionada | Sim | conteúdo publicado | seleção do servidor |
| `completedAt` | data válida | Sim | servidor no uso real | sem pontuação por tempo |
| `inspectedResultIds` | IDs únicos | Sim | interação | subconjunto do pacote |
| `inspectedFieldIds` | resultado e campo publicados | Sim | interação | sem campos inventados |
| `consultedSourceIds` | IDs únicos | Sim | interação | somente fontes do pacote |
| `routeStepIds` | sequência de passos permitidos | Sim | interação | sem URL livre ou duplicata inválida |
| `certaintySelectionId` | nível publicado | Sim | interação | coerente com ação |
| `finalActionId` | prosseguir, reter, verificar ou reportar | Sim | interação | allowlist |
| `transferDecision` | origem, evidência e ação | Sim | transferência | pacote curto publicado |

Nota, feedback, competências e recompensa são derivados.

### 11.1 Invariantes

- IDs pertencem à versão e ao pacote;
- resultados e passos rejeitam duplicatas e valores extras;
- não há campo de URL livre nem evento de navegação externa;
- rota sensível exige âncora autorizada;
- certeza e ação precisam ser semanticamente compatíveis;
- replay do mesmo `attemptId` é `no-op`;
- nova tentativa não duplica recompensa;
- conteúdo e avaliador possuem versão compatível.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Guardar versão, pacote, inspeções, fontes, passos, certeza, ação e transferência para retomada. A tentativa concluída registra resposta bruta, resultado derivado e `isAuthoritative: false`.

### Backend obrigatório

O servidor controla identidade, autorização, público, versão, pacote, allowlists, avaliação, competências, recompensa, idempotência, transação, auditoria, retenção e exclusão. A lista de resultados é conteúdo publicado, não consulta ao mecanismo real.

### Compatibilidade

- mudança semântica exige `activityVersion` nova;
- nova forma persistida exige análise de `APP_SCHEMA_VERSION`;
- migrações preservam progresso, pontos, recompensas, preferências e evidências existentes;
- rascunho incompatível não é reinterpretado;
- resultados antigos permanecem imutáveis;
- dado inválido segue para quarentena.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Local, não autoritativa | Própria tentativa | Nunca | Somente minimizada e autorizada |
| Nota e feedback | Melhor e última | Privados | Nunca | Preferir agregado |
| Competências | Derivadas | Privadas | Cobertura agregada | Agregado com limiar |
| Recompensa | Chave e valor | Titular | Nunca | Auditoria |
| Agregado | Reivindicação mínima, se adotada | Resumo | Sem URL ou escolha | Coorte autorizada |

Todos os serviços, resultados, anunciantes e domínios são fictícios. Usar somente `.example` e texto inerte. Não coletar consulta real, histórico, URL digitada, credencial, arquivo, instalação ou dado pessoal. Nenhum controle abre página, realiza busca, baixa conteúdo, chama suporte ou envia reporte.

## 14. Acessibilidade e escopo de dispositivo

- um `h1` por estado principal e foco coerente;
- resultados em lista semântica com posição, rótulo, título, URL completa e descrição em texto;
- rótulo “patrocinado” não depende de cor;
- inspetor com pares nome/valor e ordem previsível;
- rota em lista numerada, operável por teclado;
- botões Subir/Descer e posição anunciada quando houver reordenação;
- `fieldset` e `legend` para certeza e ação;
- feedback/erro sem apagar a lista;
- contraste, texto ampliado, movimento reduzido e sem limite de tempo;
- linguagem sem culpa;
- desktop agora; celular posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Artefatos declarativos | Pacotes de resultados e fontes | P0: allowlist |
| Interface | Inspetor/anatomia e shell | Lista sintética e planejador de rota | P1 |
| Contrato e avaliador | Validadores e resultados | Semântica de rota/origem | P0: validar → avaliar → persistir |
| Estado e provider | Tentativas/progresso | Rascunho de rota | Rejeição antes de avaliar |
| Persistência | Envelope atual | União específica | Análise de schema |
| Integrações | Perfil/histórico | Nova atividade e rota | IDs ainda não definidos |
| Testes | Regras/renderização | Inspetor, ordenação e navegação inerte | Harness P0 |

Esforço relativo: **M**, principalmente P1 após o gate P0.

### 15.1 Riscos específicos e mitigação

| Risco | Impacto | Mitigação proposta |
|---|---|---|
| Ensinar “primeiro resultado é ruim” | Cria regra absoluta em vez de verificação | Resultados legítimo e inconclusivo, com nota baseada na origem |
| Ensinar “anúncio é fraude” | Gera falso positivo | P2 usa anúncio legítimo e mantém controle proporcional |
| Copiar mecanismo ou marca real | Confusão com serviço verdadeiro e manutenção frágil | Interface genérica, nomes fictícios e revisão editorial |
| URL sintética tornar-se navegável | Cria efeito externo ou destino imprevisível | `.example`, texto não clicável e contrato sem URL livre |
| Resultado envelhecer | Posição e linguagem deixam de representar prática atual | Conteúdo versionado e revisão periódica antes de publicar |

## 16. Testes e critérios de aceite

### Automatizados

- identidade, versão, pacote, resultados, campos e passos por allowlist;
- casos malicioso, legítimo e inconclusivo;
- anúncio/rank nunca usados como pontuação isolada;
- avaliador integral, parcial, inseguro e inválido;
- pesos somando 100 e nota limitada;
- controles críticos e `needsReview`;
- tentativa duplicada, repetição e recompensa idempotente;
- persistência, retomada, migração e quarentena;
- ausência de navegação, URL livre ou efeito externo;
- privacidade do agregado;
- Perfil, atividade recente e recomendação;
- rota futura própria sem queda silenciosa no hub;
- teclado, foco, ordem e anúncios.

### Manuais no desktop

- três percursos, revisão, retomada e repetição;
- anúncio legítimo não é tratado automaticamente como fraude;
- pacote inconclusivo permite não escolher nenhum resultado;
- nenhum item abre página ou download;
- teclado, leitor de tela, foco, contraste, texto ampliado e movimento reduzido;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| `concept:fake-app-developer` | Banco de casos | Loja sintética, origem editorial e casos legítimos equivalentes | Exige um artefato de aplicativo distinto da busca inicial |
| `concept:fake-update` | Banco de casos | Aviso inerte, rota oficial de atualização e política autorizada | Pode confundir busca, execução e atualização numa só tentativa |

O debrief pode antecipar que lojas, atualizações e resultados exigem origem, mas não pontua esses conceitos antes de entrarem em pacote versionado.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três pacotes e o serviço fictício inicial;
- aprovar a linguagem visual genérica da página de resultados;
- decidir quais fontes de origem aparecem no planejador;
- aprovar pesos, corte de 60 e controles críticos;
- definir `activityId`, rota e versão somente na etapa técnica;
- decidir se o rascunho é necessário para uma atividade curta ou apenas desejável.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados; blueprint individual iniciado | Documentada | Nenhum |
| 2026-08-15 | Resultados sintéticos, rota segura e três pacotes propostos | Aguardando aprovação específica | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
