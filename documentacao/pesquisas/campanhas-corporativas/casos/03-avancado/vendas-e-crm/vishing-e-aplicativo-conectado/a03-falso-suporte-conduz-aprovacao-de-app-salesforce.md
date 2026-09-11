# A03 — Falso suporte conduz aprovação de aplicativo Salesforce

```yaml
id: real-case:a03-salesforce-vishing-connected-app
dificuldade: avancado
area_corporativa: vendas-e-crm
industrias: [varejo, tecnologia, servicos, multinacionais]
papeis_alvo: [vendas, atendimento, administradores-de-crm, operacoes]
canais: [telefone, navegador, saas]
tecnica_dominante: vishing-e-aplicativo-conectado
tecnicas_secundarias: [falso-suporte, oauth, data-loader, exfiltracao, extorsao]
objetivo_do_atacante: autorizar aplicativo e extrair dados do crm
fonte_principal: Google Mandiant UNC6040
data_da_fonte: 2025
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

O Google Threat Intelligence Group documentou UNC6040 personificando suporte de TI por telefone e conduzindo funcionários a autorizar aplicativo conectado no Salesforce. Em casos observados, uma versão modificada ou nome semelhante ao Data Loader permitia acesso e extração de dados; o ataque explorava pessoas, não falha do Salesforce.

## Sequência observada

1. falso suporte liga para funcionário de organização usuária de Salesforce;
2. apresenta problema ou tarefa plausível;
3. orienta navegação dentro do portal legítimo;
4. pede aprovação de aplicativo conectado com nome convincente;
5. o aplicativo recebe capacidade de consultar e extrair dados;
6. credenciais e dados podem apoiar movimentação lateral e extorsão.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte não publica transcrição integral das chamadas.
- **Exemplo reconstruído:**

> Sou do suporte do CRM. Para concluir a correção, abra Aplicativos conectados e autorize o carregador de dados que aparece na tela.

- **Nota:** nenhuma navegação, aplicativo ou autorização real é oferecida.

## Por que funcionava no contexto

- a ligação é adaptada às respostas da vítima;
- o portal final é legítimo;
- Data Loader possui finalidade verdadeira no ecossistema;
- permissões podem parecer parte de manutenção;
- equipes comerciais dependem do CRM e querem restabelecer operação.

## Indícios e limites

O usuário pode verificar se iniciou o chamado, se o aplicativo consta no catálogo e se as permissões combinam com a tarefa. Não deve ser obrigado a conhecer todos os aplicativos do fornecedor.

O diretório, catálogo e política de consentimento são controles organizacionais indispensáveis. A voz e o conhecimento técnico do interlocutor não autenticam suporte.

## Comportamento seguro ensinável

Não autorizar aplicativo durante contato não iniciado; confirmar chamado e aplicativo pelo catálogo e suporte obtidos independentemente.

## Possibilidade de atividade

- **Formato candidato:** chamada textual reativa + console abstrato de aplicativo conectado.
- **Decisão principal:** autorizar, interromper ou escalar.
- **Variação legítima necessária:** aplicativo aprovado e solicitado em chamado iniciado pelo funcionário.
- **Transferência curta:** pedido semelhante chega por Teams.
- **Risco pedagógico:** criar interface fiel demais que possa ensinar abuso operacional.

## Justificativa da dificuldade

Voz, portal legítimo, ferramenta plausível e pressão operacional reduzem indícios. O caso exige reconstrução de chamado, catálogo e permissões, caracterizando Avançado.

## Relação com o currículo atual

É aplicação avançada de **Login verdadeiro, permissão errada**, **A central que não podia esperar** e **Ataque multicanal**.

## Fonte

- [Google/Mandiant — The Cost of a Call: From Voice Phishing to Data Extortion](https://cloud.google.com/blog/topics/threat-intelligence/voice-phishing-data-extortion)
