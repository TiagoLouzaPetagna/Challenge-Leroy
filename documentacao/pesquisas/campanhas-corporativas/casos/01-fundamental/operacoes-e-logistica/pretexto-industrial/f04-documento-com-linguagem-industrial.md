# F04 — Documento com linguagem industrial

```yaml
id: real-case:f04-industrial-themed-attachment
dificuldade: fundamental
area_corporativa: operacoes-e-logistica
industrias: [industria, energia, agua, logistica, engenharia]
papeis_alvo: [engenharia, operacoes, logistica, suprimentos]
canais: [email, anexo]
tecnica_dominante: pretexto-industrial
tecnicas_secundarias: [anexo-malicioso, linguagem-especializada, pedido-ou-fatura]
objetivo_do_atacante: induzir abertura de anexo e obter acesso inicial
fonte_principal: Google Mandiant Industrial-Themed Phishing
data_da_fonte: 2023-01-17
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Mandiant analisou 1.733 mensagens únicas com temas industriais encontradas em 2022. O estudo mostra como terminologia específica aumenta o alinhamento do pretexto: documentos de embarque podem atrair logística, enquanto listas de materiais podem atrair gestores de engenharia.

## Sequência observada

1. a campanha utiliza assunto relacionado a um processo industrial;
2. o e-mail apresenta arquivo como documento operacional;
3. a pessoa abre ou executa o conteúdo por reconhecer o vocabulário;
4. o acesso inicial pode ser vendido ou usado em fraude, ransomware ou espionagem.

## Texto usado na campanha

- **Natureza:** temas literais curtos publicados pela fonte.
- **Exemplos observados:** “bill of lading” e “bill of materials (BOM)”.
- **Tradução contextual:** conhecimento de embarque e lista de materiais.
- **Nota:** a biblioteca não reproduz nomes de arquivos, cargas ou instruções de execução.

## Por que funcionava no contexto

- o vocabulário combina com a rotina do alvo;
- documentos podem chegar de fornecedores novos;
- processos operacionais favorecem abertura rápida;
- uma campanha genérica parece direcionada quando usa o termo certo.

## Indícios e limites

O assunto especializado não autentica o remetente. O tipo de arquivo, a expectativa, o pedido ou projeto relacionado e a origem precisam ser verificados em conjunto.

O funcionário não consegue determinar com segurança o conteúdo de um arquivo apenas pela extensão ou pelo nome. A atividade deve avaliar confirmação de contexto e custódia, não análise de malware.

## Comportamento seguro ensinável

Confirmar origem, projeto e necessidade do documento antes de abrir ou executar, mantendo proteções e procedimento de arquivos.

## Possibilidade de atividade

- **Formato candidato:** triagem de documentos por contexto.
- **Decisão principal:** abrir, manter pendente ou encaminhar para análise.
- **Variação legítima necessária:** documento esperado ligado a pedido existente.
- **Transferência curta:** arquivo chega por compartilhamento em nuvem.
- **Risco pedagógico:** ensinar que terminologia técnica ou anexo inesperado significa fraude.

## Justificativa da dificuldade

A primeira versão pode oferecer remetente externo, ausência de pedido e tipo de arquivo incomum, tornando o processo didático. Um caso alinhado a projeto real deve subir de faixa.

## Relação com o currículo atual

Relaciona **Documento inesperado**, **Uma manhã comum** e conceitos de anexos, contexto e execução. O detalhe industrial deve entrar como pacote setorial, não como nova competência.

## Fonte

- [Google/Mandiant — Industrial-themed phishing](https://cloud.google.com/blog/topics/threat-intelligence/phishing-hunting-industrial-emails/)
