# I02 — Recrutador transfere vaga para WhatsApp

```yaml
id: real-case:i02-fake-recruiter-whatsapp
dificuldade: intermediario
area_corporativa: rh-e-recrutamento
industrias: [aeroespacial, energia, tecnologia, defesa]
papeis_alvo: [profissionais-tecnicos, candidatos, recrutamento]
canais: [email, whatsapp, arquivo-compactado]
tecnica_dominante: falso-recrutador
tecnicas_secundarias: [spearphishing, mudanca-de-canal, descricao-de-vaga-copiada, software-adulterado]
objetivo_do_atacante: induzir instalacao de software adulterado e obter acesso
fonte_principal: Google Mandiant UNC2970
data_da_fonte: 2024-09-17
nivel_de_confianca: confirmado-pela-fonte
estado: pesquisa-documental
```

## Resumo factual

A Mandiant investigou atividade do UNC2970 em que o grupo personificava recrutadores de empresas conhecidas, adaptava descrições de vagas e migrava a conversa para WhatsApp. O arquivo supostamente continha a descrição em PDF, mas exigia um leitor incluído no pacote; o leitor era adulterado.

## Sequência observada

1. o contato oferece vaga coerente com o perfil da pessoa;
2. usa e-mail e depois WhatsApp para construir familiaridade;
3. envia arquivo protegido ou compactado;
4. afirma que um programa incluído é necessário para abrir o PDF;
5. a execução instala a cadeia maliciosa.

## Texto usado na campanha

- **Natureza:** reconstrução segura; a fonte descreve a abordagem e mostra artefatos, sem transcrição pública completa.
- **Exemplo reconstruído:**

> Seu perfil combina com uma posição confidencial. A descrição está no arquivo protegido; use o leitor incluído para visualizar corretamente.

- **Nota:** não são fornecidos arquivo, senha, software, marca ou contato real.

## Por que funcionava no contexto

- a vaga é personalizada para carreira e senioridade;
- mudar para mensageria parece parte de recrutamento ágil;
- confidencialidade explica o arquivo protegido;
- o PDF esperado reduz suspeita sobre o executável incluído;
- curiosidade e oportunidade profissional favorecem ação.

## Indícios e limites

Recrutadores reais também usam WhatsApp e arquivos. A quebra crítica é pedir execução de software fornecido pelo mesmo contato para abrir o documento.

O funcionário não deve tentar analisar o programa. Precisa manter as proteções, confirmar a oportunidade pelo site ou contato corporativo conhecido e tratar a instalação como ação de alto impacto.

## Comportamento seguro ensinável

Não instalar ferramenta fornecida pelo recrutador; confirmar a vaga independentemente e solicitar documento em formato acessível pelo ambiente autorizado.

## Possibilidade de atividade

- **Formato candidato:** reconstrução multicanal seguida por custódia de arquivo.
- **Decisão principal:** aceitar a quebra de proteção ou recuperar fonte independente.
- **Variação legítima necessária:** recrutador confirmado envia documento comum sem software adicional.
- **Transferência curta:** portfólio de candidato exige “visualizador” externo.
- **Risco pedagógico:** ensinar que WhatsApp ou arquivo compactado é sempre malicioso.

## Justificativa da dificuldade

O pretexto é altamente alinhado à pessoa, mas o pedido de instalar um leitor oferece uma quebra observável do processo. A cadeia curta e personalizada justifica Intermediário.

## Relação com o currículo atual

Pode compor **Documento inesperado**, **Ataque multicanal** e casos de **Ele já sabia meus dados**. O debrief deve separar recrutamento legítimo de execução não autorizada.

## Fonte

- [Google/Mandiant — UNC2970 and trojanized PDF reader](https://cloud.google.com/blog/topics/threat-intelligence/unc2970-backdoor-trojanized-pdf-reader)
