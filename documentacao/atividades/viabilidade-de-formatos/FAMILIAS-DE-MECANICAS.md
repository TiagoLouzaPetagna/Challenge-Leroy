# Famílias de mecânicas reutilizáveis

> **Estado:** síntese preliminar de viabilidade; não aprovada para implementação.

Os 374 formatos não devem produzir 374 componentes. Esta síntese agrupa interações semelhantes em famílias que podem atender vários conceitos e atividades. A unidade de investimento recomendada é a **mecânica reutilizável**, enquanto conteúdo, resposta e avaliação permanecem versionados por atividade.

As classificações dos arquivos conceito a conceito usam valores únicos. Nesta síntese, expressões como **Média/Baixa**, **M/G** ou **G/EG** representam uma **faixa entre variantes da família**, não um novo valor da escala.

## 1. Estrutura comum de atividade

- **Capacidade:** título, briefing, progresso, foco, navegação reversível, erro, revisão, resultado e debrief.
- **Base atual:** o padrão aparece repetido nas experiências existentes, mas não existe como componente compartilhado.
- **Viabilidade:** Alta.
- **Esforço:** G para extrair sem regressão; depois reduz o custo das demais mecânicas.
- **Prioridade preliminar:** fundação.
- **Risco:** abstração rígida que force Missão, PhishLab e Simulação a parecerem iguais. O shell deve compartilhar infraestrutura, não formato visual.

## 2. Inspetor de artefato e evidências

- **Capacidade:** revelar camadas, comparar metadados, prender evidências e registrar o que cada fato comprova ou não comprova.
- **Base atual:** botões de evidência, fontes progressivas e painéis de mensagem já existem.
- **Viabilidade:** Alta.
- **Esforço:** M como evolução local; G se virar componente declarativo para várias áreas.
- **Atende:** remetente, URL, QR, arquivo, página, consentimento, pagamento e reporte.
- **Acessibilidade:** rótulos completos, estado pressionado, ordem lógica e nenhuma evidência exclusivamente visual.
- **Prioridade preliminar:** alta.

## 3. Anatomia e comparação por camadas

- **Capacidade:** separar componentes de URL, cabeçalho, permissão, arquivo ou beneficiário e confrontá-los com uma referência.
- **Base atual:** comparações e fontes existem, mas a segmentação genérica não.
- **Viabilidade:** Alta.
- **Esforço:** M para um artefato; G para um componente extensível.
- **Atende:** domínio registrado, subdomínio, caminho, `Reply-To`, editor, escopos, arquivo e dados de cobrança.
- **Acessibilidade:** tabela/árvore textual equivalente, sem depender de alinhamento, tipografia ou cor.
- **Prioridade preliminar:** alta.

## 4. Ordenação acessível e linha temporal

- **Capacidade:** ordenar eventos, mensagens ou ações; marcar transições; representar relações parciais sem exigir uma sequência artificial única.
- **Base atual:** não existe componente de reordenação.
- **Viabilidade:** Média.
- **Esforço:** G, pois precisa de interação por teclado/botões, resposta versionada, avaliador e testes próprios.
- **Atende:** conversa comprometida, linha do incidente, cadeia multicanal, recuperação e processo financeiro.
- **Acessibilidade:** mover para cima/baixo/posição, anunciar posição, oferecer lista numerada e evitar arraste obrigatório.
- **Prioridade preliminar:** alta pelo reaproveitamento.

## 5. Mapa de relações

- **Capacidade:** relacionar identidade alegada, conta, endereço, domínio, dispositivo, permissão, canal e nível de certeza.
- **Base atual:** não existe grafo ou construtor de relações.
- **Viabilidade:** Média.
- **Esforço:** G.
- **Atende:** mapa de identidade, conta comprometida, multicanal, OAuth, dispositivo e cadeia de confiança.
- **Acessibilidade:** relações construídas também por seletores/tabela; linhas visuais são redundantes, nunca a única representação.
- **Prioridade preliminar:** alta.

## 6. Montador de ações e reporte

- **Capacidade:** distribuir ações entre agora, depois, somente com orientação e não fazer; montar relato com fatos úteis e sem segredos.
- **Base atual:** checkboxes da missão de recuperação e guia de reporte fornecem uma base parcial.
- **Viabilidade:** Alta.
- **Esforço:** M para evolução da atividade atual; G como componente reutilizável e persistido.
- **Atende:** pós-clique, arquivo, comando, acesso remoto, credencial, OAuth, pagamento e proteção coletiva.
- **Acessibilidade:** botões de mover/categorizar, revisão textual e nenhum gesto obrigatório.
- **Prioridade preliminar:** alta.

## 7. Estação de processo

- **Capacidade:** consultar registros, escolher fonte independente, reconciliar dados, ordenar controles e concluir com aprovação/reporte.
- **Base atual:** Mudança bancária já integra solicitação, painel de cinco etapas e evidências progressivas. Ainda não existe uma estação genérica e reutilizável com diretório manipulável, reconciliação configurável e ordenação de controles.
- **Viabilidade:** Média.
- **Esforço:** G.
- **Atende:** fornecedor, alteração bancária, folha, boleto, Pix, compra, suporte e exceção de processo.
- **Acessibilidade:** documentos em texto estruturado, diretório fictício pesquisável e ordem manipulável por botões.
- **Prioridade preliminar:** alta para processos de maior impacto.

## 8. Triagem em lote e fila inconclusiva

- **Capacidade:** tratar vários itens, separar resolvidos de investigação e retomar pendências sem feedback antecipado.
- **Base atual:** Simulação e Caixa de Entrada Segura já possuem lista, item selecionado e ações.
- **Viabilidade:** Alta.
- **Esforço:** M para fila e estado local; G se houver rascunho persistido, variações e múltiplos canais.
- **Atende:** e-mail, mensagens, alertas, tarefas e casos legítimos/suspeitos/inconclusivos.
- **Acessibilidade:** listas com estado textual, navegação previsível e resumo antes do envio.
- **Prioridade preliminar:** alta.

## 9. Console de eventos e conversa ramificada

- **Capacidade:** eventos chegam em sequência e uma conversa textual reage a decisões anteriores.
- **Base atual:** MFA e conversas são estáticas; não existe motor de ramificação compartilhado.
- **Viabilidade:** Média.
- **Esforço:** G.
- **Atende:** fadiga de MFA, falso suporte, callback, novo número, gestor e pressão gradual.
- **Acessibilidade:** fluxo pausável, sem cronômetro, histórico completo e resultado independente de animação.
- **Prioridade preliminar:** média, depois dos componentes determinísticos básicos.

## 10. Ambiente multicanal

- **Capacidade:** correlacionar e-mail, chat, ligação, QR, página, reunião e registro interno sem tratar um canal controlado pelo solicitante como confirmação.
- **Base atual:** não existe compositor multicanal; a simulação atual apresenta essencialmente mensagens em uma caixa.
- **Viabilidade:** Média para versão textual; Baixa para mídia e eventos ricos.
- **Esforço:** G/EG.
- **Atende:** ataque multicanal, callback, perfil clonado, reunião falsa e cadeia de fraude.
- **Acessibilidade:** linha temporal e transcrição completas; áudio/vídeo são complementares.
- **Prioridade preliminar:** média, começando por texto e artefatos inertes.

## 11. Banco de casos e variações

- **Capacidade:** combinar pretexto, canal, gatilho e desfecho dentro de regras editoriais para reduzir repetição.
- **Base atual:** conteúdo é codificado em catálogos e componentes; não existe publicação declarativa completa nem editor.
- **Viabilidade:** Média para pacotes estáticos versionados; Baixa para geração combinatória ou editor.
- **Esforço:** G/EG.
- **Atende:** triagem, falsos positivos, transferência de contexto e módulos por função.
- **Risco:** combinações incoerentes, avaliação instável e manutenção editorial.
- **Prioridade preliminar:** média depois das primeiras mecânicas compartilhadas.

## 12. Demonstração de limite técnico

- **Capacidade:** mostrar retrospectivamente o que era visível, o que somente controles técnicos detectam e qual resposta ainda cabe ao funcionário.
- **Base atual:** debrief e fontes factuais permitem implementação localizada.
- **Viabilidade:** Alta como complemento; baixa utilidade como atividade pontuada própria.
- **Esforço:** P/M.
- **Atende:** SPF/DKIM/DMARC, pixel, site comprometido, watering hole, pharming, cadeia de redirecionamento invisível, arquivo poliglota e conteúdo oculto.
- **Prioridade preliminar:** alta como padrão de debrief, não como novo player.

## 13. Voz, vídeo e mídia sintética

- **Capacidade:** apresentar ligação, reunião, clonagem de voz ou deepfake e exigir confirmação por processo.
- **Base atual:** nenhuma infraestrutura de mídia.
- **Viabilidade:** Baixa no formato audiovisual; Média quando adaptado para transcrição e narrativa textual.
- **Esforço:** EG para produção com qualidade, direitos, consentimento, hospedagem, legendas e equivalência.
- **Risco:** ensinar caça a artefatos, baixa qualidade, custo de atualização e barreira de acessibilidade.
- **Prioridade preliminar:** adiada. Quando retomada, avaliar processo de confirmação, não detecção de falsidade.

## 14. Ambiente físico e espacial

- **Capacidade:** recepção, catraca, mesa, descarte, ombro, QR físico e cadeia de custódia.
- **Base atual:** nenhuma planta, cena espacial ou interação de ambiente.
- **Viabilidade:** Baixa para cena rica; Média quando adaptada para sequência ilustrada ou decisão textual.
- **Esforço:** G/EG.
- **Risco:** produção visual, alternativas textuais, políticas locais e incentivo a confronto.
- **Prioridade preliminar:** adiada, exceto casos simples baseados em processo e cortesia segura.

## 15. Integrações e ações reais

- **Capacidade:** diretório, e-mail, identidade, help desk, banco, pagamento, QR, arquivo, reporte ou colaboração reais.
- **Base atual:** inexistente; D1 e R2 também não estão configurados.
- **Viabilidade:** Não recomendada na demonstração atual.
- **Esforço:** EG e dependente de autorização, segurança, privacidade, auditoria e backend.
- **Decisão preliminar:** toda atividade usa dados e efeitos fictícios. Se uma integração real for autorizada futuramente, deverá ser tratada como projeto separado e controlado; ela nunca é requisito para validar a mecânica de aprendizagem.

## Rastreabilidade das famílias prioritárias

O vínculo é muitos-para-muitos: um conceito pode usar inspetor, linha temporal e debrief na mesma experiência. Por isso, somar conceitos por família produziria dupla contagem. A tabela registra `conceptId`s representativos, o mínimo de conjuntos canônicos já alcançados por esses exemplos e a dependência que determina a prioridade. A decisão exata dos 187 conceitos permanece nos nove arquivos da matriz.

| Família | `conceptId`s representativos | Conjuntos representados pelos exemplos | Dependência principal |
|---|---|---:|---|
| Inspetor/anatomia | `concept:identity-reply-to`, `concept:url-anatomy`, `concept:oauth-scopes`, `concept:unexpected-attachment`, `concept:beneficiary-check` | 5 | modelo declarativo de artefato e comparação textual |
| Ordenação/linha temporal | `concept:thread-hijacking`, `concept:multichannel-chain`, `concept:bank-change`, `concept:incident-causality` | 4 | interação acessível, contrato de ordem parcial e testes de teclado/foco |
| Mapa de relações | `concept:identity-from`, `concept:account-compromise`, `concept:oauth-consent`, `concept:false-cross-channel-corroboration` | 3 | tabela/seletor como fonte de verdade e grafo apenas redundante |
| Montador de ações/reporte | `concept:session-review-revoke`, `concept:copied-command`, `concept:payment-response`, `concept:report-without-secrets` | 3 | categorização acessível, minimização e avaliador proporcional |
| Estação de processo | `concept:influence-authority`, `concept:thread-hijacking`, `concept:oauth-scopes`, `concept:bank-change`, `concept:physical-pretexting` | 5 | conteúdo corporativo autorizado e componentes genéricos de consulta/reconciliação |
| Triagem/fila inconclusiva | `concept:decision-ambiguity`, `concept:identity-external-marker`, `concept:unexpected-attachment`, `concept:messaging-phishing` | 4 | estado explícito de pendência e casos legítimos/maliciosos/inconclusivos |
| Console ramificado | `concept:influence-commitment`, `concept:mfa-fatigue`, `concept:callback-phishing` | 3 | motor textual determinístico, histórico completo e fluxo pausável |
| Multicanal textual | `concept:account-pairing-qr`, `concept:multichannel-chain`, `concept:false-cross-channel-corroboration`, `concept:platform-migration` | 2 | linha temporal e identidade coerente entre canais fictícios |
| Limite técnico/debrief | `concept:identity-authentication-limits`, `concept:tracking-pixel`, `concept:polyglot-magic-type` | 3 | separar observação humana de controles técnicos sem pontuar detecção impossível |

## Síntese

Os primeiros investimentos reutilizáveis de melhor relação entre alcance e risco são:

1. estrutura comum de atividade;
2. inspetor/anatomia de artefato;
3. ordenação e linha temporal acessíveis;
4. mapa de relações;
5. montador de ações/reporte;
6. estação de processo;
7. triagem com fila inconclusiva.

Console ramificado, multicanal e banco de casos vêm depois. Mídia audiovisual, ambientes físicos ricos e integrações reais permanecem adiados.
