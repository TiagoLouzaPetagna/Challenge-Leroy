# A07 — Erro ou CAPTCHA orienta execução manual

```yaml
id: real-case:a07-clickfix-multistage
dificuldade: avancado
area_corporativa: geral
industrias: [aplicavel-a-todos, servicos, financeiro, governo]
papeis_alvo: [todos-os-funcionarios]
canais: [email, anexo-html, pagina, sistema-operacional]
tecnica_dominante: clickfix-multietapa
tecnicas_secundarias: [falso-erro, captcha-falso, redirecionamento, abuso-de-ferramenta-legitima]
objetivo_do_atacante: fazer a vitima executar manualmente uma cadeia maliciosa
fonte_principal: Microsoft ClickFix Analysis
data_da_fonte: 2025-08-21
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Microsoft analisou ClickFix em campanhas por e-mail, anúncios e sites comprometidos. Páginas apresentavam erro, documento que não abriu ou CAPTCHA e instruíam a vítima a copiar e executar comandos em ferramentas do sistema. Campanhas usaram temas de pagamento, fatura, documento e serviços públicos e podiam instalar ladrões de informação ou acesso remoto.

## Sequência observada

1. a pessoa abre link ou anexo ligado a tarefa plausível;
2. a página mostra falha ou verificação humana;
3. um botão oferece correção;
4. instruções deslocam a ação para o sistema operacional;
5. a vítima executa a cadeia manualmente;
6. malware ou ferramenta remota é instalada.

## Texto usado na campanha

- **Natureza:** rótulo curto observado e reconstrução segura.
- **Rótulo observado:** “How to fix”.
- **Exemplo reconstruído:**

> Não foi possível carregar o documento. Conclua a verificação manual para corrigir o acesso e continuar.

- **Nota:** comandos, teclas, caminhos, nomes de arquivo e instruções executáveis foram omitidos.

## Por que funcionava no contexto

- a pessoa quer resolver uma falha pequena;
- CAPTCHA e instruções numeradas parecem suporte;
- execução manual contorna controles automáticos;
- páginas e marcas podem parecer legítimas;
- cada etapa parece inofensiva isoladamente.

## Indícios e limites

Um site comum não precisa de comando no sistema operacional para provar que a pessoa é humana ou abrir um documento. Essa quebra de fronteira é ensinável sem revelar como executar.

O usuário não deve copiar a cadeia para “testar”. A organização precisa de bloqueios e detecção, porque treinamento não impede todas as variantes.

## Comportamento seguro ensinável

Interromper quando página ou mensagem solicita comando, script ou mudança de proteção; abrir o serviço por rota conhecida e acionar o suporte oficial.

## Possibilidade de atividade

- **Formato candidato:** cadeia causal abstrata com instruções redigidas.
- **Decisão principal:** reconhecer a transição indevida entre página e sistema.
- **Variação legítima necessária:** tutorial corporativo aprovado que não executa comando recebido.
- **Transferência curta:** falso reparo de arquivo em chat de suporte.
- **Risco pedagógico:** reproduzir comandos ou transformar a atividade em manual ofensivo.

## Justificativa da dificuldade

Várias etapas, serviços legítimos e intenção de “corrigir” ocultam o impacto. O pedido final é observável, mas a cadeia usa forte persuasão e evasão, justificando Avançado.

## Relação com o currículo atual

Pode aparecer em **Documento inesperado**, **Espelho de Página**, **A central que não podia esperar** e debrief de execução. Não precisa de um player com terminal real.

## Fonte

- [Microsoft — Think before you Click(Fix)](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/)
