# Priorização preliminar de capacidades

> **Estado:** ordem técnica candidata; não é cronograma nem autorização de implementação.

Esta priorização considera reutilização entre atividades, coerência pedagógica, risco, acessibilidade e custo transversal. Ela não substitui a escolha editorial das atividades que serão produzidas.

## Resultado quantitativo da análise

A matriz avaliou 374 formatos e fechou uma decisão para cada um dos 187 conceitos:

| Dimensão | Distribuição |
|---|---|
| Viabilidade | 292 Alta; 67 Média; 9 Baixa; 6 Não recomendada neste formato |
| Esforço | 52 P; 241 M; 68 G; 13 EG |
| Encaixe | 130 Reuso direto; 135 Reuso com extensão; 92 Componente novo; 10 Subsistema novo; 7 Mídia ou processo externo |
| Destino por conceito | 53 Manter; 45 Adaptar; 73 Combinar; 6 Adiar; 10 Descartar como atividade própria |
| Escolha entre alternativas | 54 Formato A; 52 Formato B; 76 Combinação; 5 Nenhum como player próprio |

O predomínio de viabilidade **Alta** e esforço **M** mostra que grande parte do conteúdo cabe como caso ou extensão. Ao mesmo tempo, **Combinar** é o destino mais frequente: isso sustenta a estratégia de poucas mecânicas compartilhadas, não a criação de um player para cada conceito.

## P0 — preparar a base sem uniformizar as experiências

1. **Registro de atividades e rotas fora de `app/page.tsx`:** reduzir o acoplamento do roteamento central.
2. **Estrutura comum de atividade:** compartilhar foco, progresso, navegação, revisão, erro e resultado.
3. **Conteúdo versionado declarativo:** separar dados do caso de componentes e impedir que toda variação exija duplicação de tela.
4. **Primitivas de resposta e avaliação:** padronizar idempotência, recompensa, evidência, compatibilidade e a ordem **validar → avaliar → persistir/retornar**, sem apagar contratos específicos.
5. **Separação de estilos e testes:** evitar crescimento contínuo dos arquivos globais.
6. **Harness de interação e acessibilidade:** testar teclado, foco, anúncios, ordem e alternativas sem arrastar em navegador; SSR por texto não prova esses comportamentos.

O P0 não deve redesenhar todas as atividades de uma vez. A extração precisa ser incremental e comprovada pelos testes existentes mais os novos testes de interação e acessibilidade aplicáveis.

### Gate obrigatório antes de piloto real

Esse gate não pertence ao P3 e não depende de integração corporativa opcional. Antes de qualquer piloto com funcionários, o backend autoritativo deverá controlar identidade, autorização, versão publicada, allowlists, avaliação, recompensa, idempotência, transação, auditoria e retenção. Enquanto isso não existir, o portal permanece demonstração local.

## P1 — mecânicas de maior reaproveitamento

A numeração desta seção serve para referência das capacidades, não define a ordem de construção. A ordem incremental candidata aparece em **Ordem candidata para provas de conceito**.

### 1. Inspetor e anatomia de artefato

Primeiro candidato porque aproveita evidências existentes e atende URL, remetente, QR, arquivo, permissão e pagamento.

### 2. Ordenação e linha temporal acessíveis

Atende reconstrução de conversa, incidente, cadeia multicanal e processo. Deve nascer com botões/teclado, não como arraste adaptado depois.

### 3. Mapa de relações

Atende identidade, conta, domínio, canal, dispositivo e permissão. A versão textual/tabular precisa ser a fonte de verdade; o grafo é apresentação redundante.

### 4. Montador de ações e reporte

Evolui a missão de recuperação e serve a vários tipos de exposição. Não aceita segredos, contas reais ou envio real.

### 5. Estação de processo

Suporta confirmação independente, diretório fictício, reconciliação e aprovação em casos financeiros, de RH e suporte.

### 6. Fila inconclusiva

Evolui a triagem atual com pouco risco conceitual e prepara casos legítimos difíceis sem incentivar “reportar tudo”.

## P2 — experiências compostas

1. console de eventos e conversa ramificada;
2. compositor multicanal somente textual e inerte;
3. pacotes estáticos de casos versionados;
4. retomada de rascunho, caso realmente necessária para atividades longas;
5. componentes de processo por função.

Essas capacidades devem reutilizar P1. Criá-las antes produziria componentes isolados e contratos duplicados.

## P3 — capacidades adiadas

- áudio, vídeo, deepfake e reunião com mídia;
- ambiente físico rico, planta ou cena espacial;
- editor interno de casos;
- geração combinatória de cenários;
- colaboração simultânea;
- telemetria e eventos em tempo real;
- integrações com sistemas corporativos;
- comportamento específico para celular.

Esses itens não estão rejeitados definitivamente. Eles dependem de uma necessidade priorizada, produção sustentável e infraestrutura que ainda não existe.

## Conceitos que não justificam player próprio

Fenômenos invisíveis ou predominantemente técnicos devem ser combinados com debrief, retrospectiva ou divisão de responsabilidades. Exemplos incluem:

- autenticação completa de e-mail;
- pixel de rastreamento;
- site legítimo comprometido e watering hole;
- pharming;
- arquivo poliglota ou conteúdo ativo invisível;
- detecção de deepfake por artefato;
- telemetria, logs e atribuição do atacante.

O ensinamento permanece importante, mas a avaliação mede resposta e uso do processo, não detecção impossível.

## Critério para escolher provas de conceito

Uma prova de conceito futura só deverá ser proposta quando:

1. atender pelo menos duas atividades ou uma atividade prioritária de alto valor;
2. possuir comportamento observável e avaliação determinística;
3. permitir equivalente completo por teclado e texto;
4. não depender de dado, link, arquivo, pagamento ou contato real;
5. encaixar em um contrato versionado e em testes de idempotência/persistência;
6. possuir conteúdo revisável e sustentável;
7. manter o backend autoritativo como requisito antes do uso real;
8. possuir testes de navegador para teclado, foco, anúncios e alternativa acessível quando a mecânica exigir interação nova.

## Ordem candidata para provas de conceito

Se a etapa seguinte autorizar protótipos, a ordem técnica preliminar é:

1. anatomia de URL e artefato;
2. ordenação/linha temporal acessível;
3. mapa de identidade por seletores e visual redundante;
4. montador de ações/reporte;
5. triagem com fila inconclusiva;
6. estação de processo;
7. console textual ramificado.

Essa ordem testa componentes fundamentais antes de mídia, integração ou cenários muito compostos.
