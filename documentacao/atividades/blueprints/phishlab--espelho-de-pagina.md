# Espelho de Página

> **Estado do blueprint:** aprovado em 2026-08-15; aguardando conversão técnica e implementação.
>
> **Mapa curricular:** aprovado em 2026-08-15.
>
> **Integração no portal:** existe apenas uma referência visual planejada no catálogo; não há ID público estável, versão executável ou rota disponível definidos para esta atividade.
>
> **Efeito técnico:** nenhum enquanto este documento não for aprovado e implementado.

## 1. Identidade e fronteira do blueprint

| Campo | Definição |
|---|---|
| Área | PhishLab |
| Comportamento principal aprovado | Abandonar a aparência como prova e abrir o serviço independentemente antes de decidir se a página ou o pedido são legítimos. |
| Mecânica-base aprovada | Mesa de comparação funcional entre origem, campos, promessa e próxima ação; não é caça a diferenças cosméticas. |
| Estado da atividade atual | Planejada como cartão; sem atividade executável própria. |
| Relação com implementação existente | Atividade nova derivada de referência visual planejada; o cartão atual não define tentativa migrável. |
| `activityId`, versão e rota | Não definidos; o rótulo interno atual não é promovido por este blueprint. |
| Duração-alvo | 9 a 12 minutos. |
| Regra de recompensa considerada | 60 pontos-base de PhishLab e bônus transversal, depois de aprovação executável; não ativada pelo blueprint. |
| Conceitos proprietários | 13, conforme o [mapa inverso](../mapa-conceitos-atividades/POR-ATIVIDADE.md). |
| Escopo de dispositivo | Desktop; celular posterior. |
| Dependência de backend | Obrigatória antes do uso real. |

### 1.1 O que este blueprint decide

- três percursos centrados em origem e solicitação, não em fidelidade visual;
- páginas totalmente cenográficas, sem formulário real;
- distribuição dos 13 conceitos conforme os momentos já aprovados;
- avaliação, feedback, contrato e controles críticos.

### 1.2 O que permanece sem decisão técnica

- ID, rota, versão e posição curricular;
- linguagem visual e conteúdo final das páginas;
- política de ativação dos bancos;
- integração de recompensa e persistência.

## 2. Contrato educacional

- **Comportamento observável:** abandonar a aparência como prova, abrir independentemente o serviço fictício pela rota habitual e só então comparar origem, contexto e dados solicitados.
- **Técnicas ou objetivos do atacante:** clonagem de interface, coleta de credenciais e falsa entrada única.
- **Atalho inseguro enfrentado:** validar pela aparência, logotipo, cadeado, CAPTCHA ou janela parecida.
- **Resposta segura generalizável:** sair da página candidata, abrir o serviço independentemente e decidir pelo processo e pelos campos esperados.
- **O que a conclusão permite afirmar:** se a pessoa aplicou esse processo nesta tentativa fictícia.
- **O que não permite afirmar:** retenção, domínio permanente, reconhecimento de toda página clonada, ausência de comprometimento ou confiança universal em HTTPS.

## 3. Inventário de conceitos proprietários

| `conceptId` | Papel aprovado | Momento aprovado | Uso | Percurso ou destino |
|---|---|---|---|---|
| `concept:cloned-page` | Núcleo | Primeira versão | Comparar função e origem de uma página imitadora. | P1, P2 e P3 |
| `concept:credential-harvest` | Núcleo | Primeira versão | Classificar pedido de senha ou segredo incompatível. | P1, P2 e P3 |
| `concept:https-limit` | Complementar | Primeira versão | Mostrar que conexão protegida não comprova legitimidade. | P1 e P3 |
| `concept:false-sso` | Complementar | Primeira versão | Investigar falsa entrada única dentro de fluxo convincente. | P2 |
| `concept:captcha-trust` | Complementar | Banco de casos | Evitar que CAPTCHA seja usado como selo de confiança. | Banco B1 |
| `concept:password-manager-clue` | Complementar | Banco de casos | Usar ausência de preenchimento como pista, nunca prova. | Banco B2 |
| `concept:password-manager` | Complementar | Banco de casos | Ensinar uso seguro do gerenciador por rota oficial. | Banco B3 |
| `concept:browser-in-browser` | Variação de caso | Banco de casos | Simular janela interna que imita autenticação. | Banco B4 |
| `concept:browser-warning` | Variação de caso | Banco de casos | Responder a aviso do navegador sem o contornar. | Banco B5 |
| `concept:legitimate-site-compromise` | Transferência | Banco de casos | Transferir o processo para origem legítima com conteúdo alterado. | Banco B6 |
| `concept:watering-hole` | Debrief ou limite técnico | Debrief | Explicar compromisso de site frequentado sem cobrar detecção visual. | Debrief D1 |
| `concept:pharming` | Debrief ou limite técnico | Debrief | Delimitar desvio de resolução que a página comum não revela. | Debrief D2 |
| `concept:aitm` | Debrief ou limite técnico | Debrief | Explicar intermediação de sessão sem simular roubo funcional. | Debrief D3 |

Regras aplicadas:

- os 13 conceitos aparecem uma vez, com papel e momento aprovados;
- Complementares de banco não são obrigatórios na primeira versão;
- conceitos de transferência e debrief não geram objetivo ou recompensa próprios;
- aplicações secundárias não alteram propriedade.

## 4. Arquitetura da primeira versão

| Percurso documental | Contexto profissional | Comportamento principal | Complementares formais ativos | Caso curto de transferência | Resultado possível |
|---|---|---|---|---|---|
| P1 — Redefinição clonada | Link não solicitado abre página muito parecida e pede senha atual. | Abandonar a aparência, abrir o serviço independentemente e comparar o pedido. | https-limit (1) | Página simples, sem acabamento visual, faz o mesmo pedido. | Suspeito e reportar. |
| P2 — Entrada única dentro da página | Documento incorpora painel falso de SSO. | Sair do candidato, abrir o serviço pela rota própria e distinguir o fluxo oficial. | false-sso (1) | SSO legítimo iniciado pelo portal oficial. | Suspeito no principal; legítimo no transferido. |
| P3 — Página legítima esperada | Fluxo iniciado leva a página correta com HTTPS e campos previstos. | Abrir independentemente o serviço e sustentar a conclusão pelo processo, não pela aparência. | https-limit (1) | Um campo novo pede segredo incompatível. | Legítimo; inconclusivo ou suspeito na mudança. |

Nenhum percurso tem mais de um Complementar formal. Conceitos de banco não são pistas ocultas nos casos iniciais.

Cada pacote contém microcalibração guiada da mesa, não pontuada como caso completo, resolução independente do artefato principal descrito na seção 5 e transferência curta. Abrir independentemente significa usar uma rota cenográfica fornecida, nunca navegar para serviço real.

## 5. Casos e conteúdo da primeira versão

### Percurso P1 — Redefinição clonada

| Elemento | Definição |
|---|---|
| Situação inicial | Mensagem inesperada leva a página de redefinição com marca fictícia. |
| Canal e artefatos | Mensagem, snapshot inerte, origem textual e rota oficial cenográfica. |
| Identidade ou pretexto | Portal de conta e redefinição urgente. |
| Objetivo do atacante ou hipótese legítima | Coletar credencial numa página clonada. |
| Pressões e aparências | Urgência, marca, acabamento fiel e HTTPS. |
| Evidências disponíveis | Ação não iniciada, origem incompatível e pedido de senha atual; a rota própria não mostra tarefa pendente. |
| Evidência decisiva ou limite de certeza | HTTPS não valida a finalidade; abrir o serviço independentemente revela ausência do processo. |
| Confirmação independente | Abandonar o snapshot e abrir a área fictícia pelo diretório. |
| Ação segura | Não preencher; usar a rota própria. |
| Reporte ou recuperação | Reportar página e mensagem fictícias sem credencial. |
| Transferência curta | Versão visualmente pobre mantém os mesmos sinais funcionais. |
| Debrief | Aparência perfeita ou imperfeita não é prova; o processo independente é estável. |
| Conteúdo fictício necessário | Campos não editáveis, snapshot local e domínios `.example`. |

### Percurso P2 — Entrada única dentro da página

| Elemento | Definição |
|---|---|
| Situação inicial | Página de documento mostra uma janela de SSO dentro do próprio conteúdo. |
| Canal e artefatos | Documento, snapshot em camadas, origem textual e registro de acesso. |
| Identidade ou pretexto | Provedor de SSO conhecido. |
| Objetivo do atacante ou hipótese legítima | Coletar credencial por falsa janela; hipótese legítima existe no fluxo oficial iniciado. |
| Pressões e aparências | Documento bloqueado, janela familiar e promessa de continuidade. |
| Evidências disponíveis | Painel não altera origem, solicita credencial e a rota oficial não registra acesso iniciado. |
| Evidência decisiva ou limite de certeza | A aparência de janela não prova provedor separado; a rota própria mostra o fluxo real. |
| Confirmação independente | Fechar o candidato e acessar o documento pelo repositório fictício. |
| Ação segura | Não preencher e usar a rota própria. |
| Reporte ou recuperação | Reportar o documento fictício se o painel não existir no repositório. |
| Transferência curta | SSO legítimo iniciado pelo portal muda para origem prevista. |
| Debrief | O navegador simulado não é pista visual: origem e início do processo resolvem o caso. |
| Conteúdo fictício necessário | Molduras inertes, sem navegador, login ou autenticação. |

### Percurso P3 — Página legítima esperada

| Elemento | Definição |
|---|---|
| Situação inicial | Funcionário inicia alteração de perfil e chega a uma página esperada. |
| Canal e artefatos | Registro, snapshot, origem textual, rota própria e lista do processo. |
| Identidade ou pretexto | Área de perfil do serviço fictício. |
| Objetivo do atacante ou hipótese legítima | Hipótese legítima sustentada por ação iniciada e processo confirmado independentemente. |
| Pressões e aparências | Familiaridade visual e HTTPS, sem pedido urgente. |
| Evidências disponíveis | A rota própria reproduz a tarefa, a origem é esperada e os campos são compatíveis. |
| Evidência decisiva ou limite de certeza | Cadeado e aparência isolados não bastam; a confirmação vale só para a tarefa prevista. |
| Confirmação independente | Abandonar o candidato e abrir o serviço pela área própria. |
| Ação segura | Prosseguir apenas com campos previstos no fluxo independente. |
| Reporte ou recuperação | Não reportar automaticamente; parar se campo ou finalidade mudar. |
| Transferência curta | Um campo novo pede código de recuperação; parar e verificar. |
| Debrief | Mesmo no caso legítimo, a conclusão nasce do processo independente, não da aparência. |
| Conteúdo fictício necessário | Estado legítimo e mutação funcional, não cosmética, em mídia inerte. |

Nenhum artefato executa ação real. Não há HTML remoto, formulário funcional, credencial ou navegação.

## 6. Mecânica e diferenciação

- **Interação central:** abrir painéis de Origem, Contexto, Campos e Próxima ação; prender evidências a afirmações e comparar candidato com referência acessada por rota própria.
- **Por que combina com o comportamento:** a mesa só libera comparação depois que a pessoa escolhe abandonar o candidato e abrir a referência independente.
- **Como se distingue das outras 21 atividades:** investiga função da página e pedido de credencial; não avalia caça visual, URL isolada, permissão ou código.
- **O que é reutilizável:** shell, stepper, revisão, resultado e ativos versionados.
- **O que exige componente novo:** visualizador de snapshot inerte, painel de evidências e comparador funcional.
- **Alternativa sem arrastar, mídia ou representação espacial:** fichas sequenciais de origem, finalidade, campos e consequência.
- **Risco de virar questionário disfarçado e prevenção:** o veredito sem executar a rota independente e classificar campos limita a nota; cosmética e sinais técnicos invisíveis nunca pontuam.

## 7. Fluxo completo

| Etapa | Informação apresentada | Ação do funcionário | Regra de transição | Dado registrado | Feedback | Alternativa acessível |
|---|---|---|---|---|---|---|
| Abertura | Objetivo, privacidade, campos inertes e ausência de cronômetro. | Iniciar ou voltar. | Explícita. | Pacote. | Sem resposta. | Foco no `h1`. |
| Investigação | Microcalibração e depois candidato principal. | Aprender os painéis, abandonar o candidato, abrir a referência cenográfica e investigar independentemente. | Calibração vista e evidências principais completas. | Rota, painéis, vínculos e ajuda. | Ensina a mesa sem revelar o caso principal. | Fichas sequenciais. |
| Decisão inicial | Quadro funcional montado. | Escolher veredito provisório e ação. | Campos completos. | Decisão provisória. | Lacunas revisáveis. | `fieldset` e lista. |
| Consequência | Efeito cenográfico de preencher, abandonar ou abrir pela rota própria. | Observar sem fornecer dado. | Consequência lida. | Estado simulado. | Reforça a independência. | Texto completo. |
| Revisão | Artefato principal e decisão provisória. | Editar evidências, campos, conclusão ou rota. | Caso principal completo e editável. | Revisões. | Sem acerto antecipado. | Índice de foco. |
| Decisão final | Resposta consolidada. | Confirmar ou voltar. | Confirmação explícita. | Resposta bruta final. | Não antecipa nota. | Botões claros. |
| Transferência | Aparência ou campo muda. | Reaplicar a rota independente. | Uma resposta e rota. | Transferência. | Após envio. | Comparação textual. |
| Resultado | Nota, critérios, competências e recompensa potencial. | Consultar resultado privado. | Aceite. | Derivados. | Origem, campo, limite e ação. | Texto completo. |
| Debrief | Comparação funcional e limites técnicos. | Comparar e encerrar ou repetir. | Opcional; não altera nota. | Visualização opcional. | Reforça que aparência não é prova. | Texto estruturado. |

## 8. Estados da experiência

| Estado | Condição | Conteúdo e ação disponível | Persistência futura | Tratamento acessível |
|---|---|---|---|---|
| Não iniciada | Sem tentativa. | Briefing e iniciar. | Nenhuma. | Foco no h1. |
| Em andamento | Quadro parcial. | Investigar e revisar. | Rascunho opcional. | Etapa anunciada. |
| Retomada | Rascunho compatível. | Retomar ou reiniciar. | Sem gabarito. | Resumo textual. |
| Revisão | Casos completos. | Editar ou enviar. | Resposta bruta. | Índice por caso. |
| Concluída | Tentativa aceita. | Resultado e debrief. | Tentativa e derivados. | Nota anunciada. |
| Repetição | Já concluída. | Nova prática. | Novo attemptId; sem recompensa duplicada. | Regra explícita. |
| Conteúdo indisponível | Snapshot ou pacote ausente. | Voltar. | Nada. | Mensagem explícita. |
| Resposta inválida | Evidência ou campo incompatível. | Corrigir. | Não conclui. | Alerta focado. |
| Falha ao salvar | Persistência falhou. | Tentar novamente. | Preserva resposta. | Status anunciado. |

## 9. Avaliação e feedback

A rubrica segue a convenção transversal de PhishLab: evidências 30, conclusão 25, uso pertinente da mecânica ou ferramenta 20 e resolução independente com transferência 25. Os descritores especializam esses eixos para rota independente e função da página.

| Critério | Peso | Integral | Parcial | Zero ou inseguro | Competências |
|---|---:|---|---|---|---|
| Evidências funcionais | 30 | Usa origem, contexto, campos e finalidade pertinentes. | Omite um sinal não crítico. | Decide por aparência ou cadeado. | Observar, Investigar |
| Conclusão e controle de credencial | 25 | Veredito proporcional e não fornece segredo. | Ação segura com justificativa parcial. | Preencheria credencial ou trataria tudo como fraude. | Investigar |
| Comparação e rota própria | 20 | Usa referência e rota independente adequadas. | Comparação incompleta sem risco. | Usa a página candidata para confirmar. | Verificar |
| Independente e transferência | 25 | Repete em nova aparência/contexto. | Usa ajuda sem falha crítica. | Não transfere ou age inseguramente. | Investigar, Verificar |

Regras obrigatórias:

- pesos somam 100 e a nota fica entre 0 e 100;
- conclusão e desempenho permanecem separados;
- `needsReview` considera nota abaixo de 60 e controles críticos;
- feedback explica fatos, indícios, incerteza e processo seguro;
- aparência ou sinal isolado não vale como veredito;
- ajuda não reduz automaticamente a nota;
- velocidade não pontua;
- o caso legítimo exige processo independente, não obediência automática.

### 9.1 Controles críticos

- não inserir senha, OTP, código de recuperação ou outro segredo;
- não usar a própria página candidata como rota de confirmação;
- não tratar HTTPS, logotipo ou aparência como prova;
- não exigir a detecção de detalhe técnico não exposto.

### 9.2 Resultado privado

O resultado privado mostra nota, critérios, evidências funcionais, aparências não conclusivas, campos incompatíveis, veredito, rota independente, competências, recomendação e recompensa potencial. Não expõe resposta individual no agregado nem reexibe credencial.

## 10. Recompensa e integrações de aprendizagem

- **Regra-base considerada:** 60 pontos-base somente depois de versão executável aprovada.
- **Bônus:** somente a regra transversal vigente; velocidade não participa.
- **Idempotência:** primeira recompensa válida por chave publicada; repetição preserva recompensa e contribuição anteriores.
- **Versões anteriores:** nunca reinterpretar ou premiar novamente sem decisão explícita.
- **Integrações futuras:** hub, percurso, Perfil, atividade recente, competências, conquistas e recomendação para Login verdadeiro, permissão errada.
- **Radar:** opcional, pontuado por regra própria e nunca pré-requisito.

## 11. Contrato de resposta proposto

Este é um desenho semântico, não um tipo já aprovado no código. Não há `activityId` aprovado; o campo representa o valor futuro publicado, sem defini-lo.

| Campo conceitual | Tipo e valores permitidos | Obrigatório | Origem | Observação de validação |
|---|---|---|---|---|
| attemptId | identificador | Sim | servidor | idempotente |
| activityId | ID futuro publicado | Sim | catálogo | ainda indefinido |
| activityVersion | versão publicada | Sim | catálogo | compatível |
| casePackageId | ID allowlisted | Sim | conteúdo | pertence à versão |
| completedAt | data | Sim | servidor | sem rapidez |
| mainCaseResponse | rota independente, painéis, vínculos, campos e veredito | Sim | interação | artefato principal resolvido independentemente |
| transferResponse | resposta curta allowlisted | Sim | interação | calibração não é segundo caso |
| inspectedPanelIds | lista | Sim | mesa | painéis allowlisted |
| evidenceBindings | evidência, afirmação e classe | Sim | investigação | relações válidas |
| fieldAssessments | fieldId e expected, unnecessary ou secret | Sim | decisão | cobertura exata |
| originAssessmentId | expected, unexpected ou unconfirmed | Sim | decisão | allowlist |
| verdictId | legitimate, suspicious ou inconclusive | Sim | decisão | allowlist |
| safeRouteId | ID fictício | Sim | decisão | sem texto livre |
| usedHelpIds | lista | Não | interface | sem duplicatas |

### 11.1 Invariantes

- snapshot, painéis, campos e evidências pertencem ao pacote;
- snapshots são mídia inerte, nunca HTML de terceiro;
- nenhum campo recebe texto do funcionário;
- etapas obrigatórias não podem ser omitidas;
- replay do mesmo `attemptId` é no-op e tentativa nova não duplica recompensa;
- conteúdo e avaliador possuem versão compatível;
- cliente não envia nota, resposta oficial ou recompensa;
- resultados e competências são derivados.

### 11.2 Instrumentação mínima

Eventos: case_started, panel_opened, evidence_bound, field_classified, reference_opened, help_opened, answer_revised, submission_requested e submission_result. Somente IDs allowlisted, versão, etapa e sequência; nenhum texto de campo ou segredo. A resposta final, não o log, sustenta a nota.

## 12. Persistência, compatibilidade e backend

### Demonstração local

Requer submissão discriminada e análise de `APP_SCHEMA_VERSION`. Persiste somente retomada, resposta bruta, resultado derivado e progresso. Snapshots são ativos versionados; `isAuthoritative` permanece falso.

### Backend obrigatório

Antes do uso real, o servidor controla identidade, autorização e público; publica versão, pacote e snapshots; valida rota, vínculos, campos, opções e etapas por allowlist; deriva avaliação, `needsReview`, competências e feedback; concede recompensa, evidência e contribuição em transação idempotente; mantém auditoria sem segredo; e aplica retenção e exclusão conforme política. Não carrega páginas reais, recebe credenciais ou executa conteúdo remoto.

### Compatibilidade

O cartão planejado atual não define identidade pública nem tentativa migrável. ID, rota e versão só surgem após aprovação. Estado incompatível fica em quarentena, sem conversão aproximada.

## 13. Privacidade e segurança

| Dado | Persistência local demonstrativa | Funcionário | Equipe | Gestão futura |
|---|---|---|---|---|
| Resposta bruta | Sim, somente fictícia | Completa | Não | Preferir agregado |
| Nota e feedback | Sim | Completa | Não | Agregados |
| Competências | Sim | Completa | Cobertura agregada | Agregada |
| Recompensa | Livro-razão | Completa | Não | Estado |
| Agregado | Reivindicação resumida | Própria contribuição | Total coletivo | Métricas sem resposta individual |

Não há credencial, OTP, segredo, dado pessoal, conta, telefone, pagamento, chamada, arquivo, comando, reporte, formulário real, autofill, clipboard, navegação, iframe, HTML remoto, cookie ou sessão. O player não afirma executar ação corporativa.

## 14. Acessibilidade e escopo de dispositivo

- cada estado principal possui um único `h1` e foco coerente após transição;
- estrutura, origem, contexto, campos e ação são compreensíveis por leitor de tela;
- decisões relacionadas usam `fieldset` e `legend`;
- painéis, rota e vínculos operam integralmente por teclado;
- qualquer ordenação oferece Mover, Subir e Descer e anuncia posição;
- fichas e seletores equivalem aos snapshots; diferenças cosméticas nunca pontuam;
- snapshots e qualquer mídia possuem descrição funcional completa;
- feedback usa região de status e erro usa alerta com foco, sem apagar artefato ou contexto;
- contraste, texto ampliado e movimento reduzido são respeitados;
- não há limite de tempo;
- linguagem é neutra, acionável e sem culpa;
- este blueprint cobre desktop; celular permanece posterior.

## 15. Arquitetura e esforço

| Camada | Reuso possível | Trabalho novo | Dependência ou gate |
|---|---|---|---|
| Conteúdo versionado | Catálogo e ativos locais | Snapshots, campos e evidências versionados | P0 |
| Interface | Shell, stepper e resultado | Mesa comparativa e fichas | P1 |
| Contrato e avaliador | Envelope e pesos comuns | Vínculos, avaliação de campos e controles críticos | Nova versão |
| Estado e provider | Provider assíncrono | Operação de rota, mesa e revisão | Padronizar validar → avaliar → persistir |
| Persistência | Tentativas e progresso | Rascunho, migração e quarentena | Análise de `APP_SCHEMA_VERSION` |
| Integrações | Perfil e hub | Cadastro da nova atividade | ID aprovado |
| Testes | Contratos, reducer e SSR | Render inerte, teclado, foco e fichas equivalentes | Harness de navegador |

**Esforço relativo:** G. **Camadas:** P0 e P1; bancos B1–B6 em P2.

## 16. Testes e critérios de aceite

### Automatizados

- versão, pacote, snapshot, painel, campo, evidência e opção por allowlist;
- vínculo inválido, campo ausente, duplicata e extra;
- quatro pesos somando 100 e nota limitada;
- integral, parcial, legítimo, suspeito e inconclusivo;
- controles críticos, needsReview e ajuda sem desconto;
- nenhum input, iframe, navegação, fetch ou HTML remoto;
- replay, repetição, recompensa idempotente e privacidade;
- teclado e equivalência entre snapshot e fichas.

### Manuais no desktop

- concluir P1, P2 e P3;
- confirmar que nenhum campo aceita digitação ou autofill;
- testar leitor de tela, zoom, contraste e movimento reduzido;
- resolver ignorando completamente a aparência;
- revisar e repetir sem prêmio duplicado;
- console sem erros.

## 17. Banco de casos, versões futuras e debriefs

| Conceito ou grupo | Destino | Condição para avançar | Não entra agora porque |
|---|---|---|---|
| concept:captcha-trust | Banco B1 | Caso em que CAPTCHA seja aparência, não desafio real | Evitar selo simplista |
| concept:password-manager-clue | Banco B2 | Feedback calibrado como pista não conclusiva | Ausência de preenchimento não prova fraude |
| concept:password-manager | Banco B3 | Fluxo cenográfico e política editorial | Não instruir armazenamento real no laboratório |
| concept:browser-in-browser | Banco B4 | Alternativa textual equivalente validada | Não virar caça a borda de janela |
| concept:browser-warning | Banco B5 | Aviso fictício sem ensinar contorno | Exige controle crítico próprio |
| concept:legitimate-site-compromise | Banco B6, transferência | Evidências de processo suficientes | Origem legítima não encerra investigação |
| concept:watering-hole | Debrief D1 | Revisão técnica | Usuário não deve “detectar” a técnica pela aparência |
| concept:pharming | Debrief D2 | Revisão técnica | Sinal pode ser invisível na página |
| concept:aitm | Debrief D3 | Revisão técnica e de recuperação | Simulação funcional seria insegura e desnecessária |

Não há conceito proprietário marcado como Versão futura neste blueprint.

## 18. Gates para conversão técnica e publicação

Os percursos, casos, pesos e controles deste blueprint foram aprovados em 2026-08-15. Os itens abaixo permanecem como validações técnicas, editoriais ou especializadas antes da implementação e da publicação; não reabrem o desenho pedagógico aprovado.

- aprovar os três percursos e a gramática funcional;
- definir ID, rota, versão e posição curricular;
- validar o renderizador de snapshots inertes;
- aprovar gates dos seis bancos e três debriefs;
- revisar com Segurança, Educação e Acessibilidade.

## 19. Histórico

| Data | Decisão | Estado | Efeito técnico |
|---|---|---|---|
| 2026-08-15 | Mapa e composição geral aprovados | Documentada | Nenhum |
| 2026-08-15 | Propostos três percursos, mesa funcional e avaliação 30/25/20/25 | Proposta | Nenhum |
| 2026-08-15 | Blueprint de primeira versão aprovado para conversão técnica | Aprovado; não implementado | Nenhum |
