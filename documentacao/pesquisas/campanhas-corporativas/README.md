# Biblioteca de campanhas corporativas reais

## Finalidade

Esta pasta reúne pesquisas de campanhas observadas por órgãos públicos e equipes de inteligência de ameaças. Ela complementa a taxonomia de conceitos e os blueprints de atividades com uma visão baseada em casos reais.

Os dossiês não criam atividade, `activityId`, rota, versão, pontos, recompensa, progresso ou disponibilidade no portal. A transformação de um caso em atividade exige análise pedagógica, blueprint, contrato de resposta, avaliador, acessibilidade, segurança, testes e aprovação próprios.

## Organização

```text
casos/
├── 01-fundamental/
├── 02-intermediario/
└── 03-avancado/
    └── area-corporativa/
        └── tecnica-dominante/
            └── caso.md
```

A pasta de área representa quem recebe ou precisa decidir no processo, por exemplo Financeiro, RH, TI ou Diretoria. O ramo da organização e as técnicas secundárias ficam nos metadados do arquivo porque uma mesma campanha pode atingir várias indústrias e combinar diversas técnicas.

## Inventário inicial

| Dificuldade | Casos | Finalidade predominante |
|---|---:|---|
| Fundamental | 8 | ensinar um processo seguro com sinais mais visíveis e um canal principal |
| Intermediário | 8 | aplicar o processo em contexto plausível, serviço conhecido ou cadeia curta |
| Avançado | 8 | combinar conta legítima, vários canais, contexto específico ou abuso de identidade e nuvem |
| **Total** | **24** | banco de pesquisa; não representa 24 atividades aprovadas |

O índice de cobertura está em [MATRIZ-DE-COBERTURA.md](MATRIZ-DE-COBERTURA.md). O resumo conjunto dos casos, exemplos de texto e domínios publicados está em [RESUMO-CASOS-TEXTOS-E-DOMINIOS.md](RESUMO-CASOS-TEXTOS-E-DOMINIOS.md). A interpretação das três faixas está em [CRITERIOS-DE-DIFICULDADE.md](CRITERIOS-DE-DIFICULDADE.md). A restrição corporativa de identidades e canais está em [POLITICA-DE-REMETENTES-SIMULADOS.md](POLITICA-DE-REMETENTES-SIMULADOS.md).

## Como os textos reais são tratados

Cada dossiê possui uma seção **Texto usado na campanha** e identifica uma destas naturezas:

- **trecho literal curto:** fragmento publicamente reproduzido pela fonte, limitado ao mínimo necessário;
- **tradução curta:** tradução de um fragmento publicado, sem ampliar o original;
- **reconstrução segura:** exemplo novo, escrito em português a partir do pretexto e da ação documentados pela fonte;
- **descrição do tema:** quando a fonte publica somente o assunto, a imagem ou a finalidade, sem transcrição suficiente.

Uma reconstrução nunca é apresentada como texto original do atacante. Domínios ativos, indicadores de comprometimento, códigos, comandos, telefones, credenciais e instruções executáveis são omitidos ou substituídos por dados reservados e inertes.

Quando uma fonte publica domínios históricos, o resumo os registra de forma desativada com `[.]` e diferencia domínio do atacante, padrão de nomenclatura e serviço legítimo abusado. Ausência de domínio publicado não é preenchida por inferência.

## Critério de seleção

Um caso entra nesta biblioteca quando acrescenta pelo menos um dos seguintes elementos:

- contexto corporativo reconhecível;
- decisão humana observável;
- técnica ou combinação ainda útil para o currículo;
- rota independente de confirmação;
- resposta ou recuperação que possa ser ensinada com segurança;
- fonte primária ou pesquisa técnica identificável.

Casos sensacionalistas, voltados apenas a consumidores ou dependentes de malware sem decisão humana relevante não recebem prioridade.

## Uso futuro

Pesquisa histórica não equivale a autorização editorial. Mesmo que uma fonte descreva personificação de diretor, funcionário, recrutador, técnico ou outra pessoa, a simulação da Fortifica deverá começar por e-mail e usar somente um setor interno, uma pessoa jurídica externa ou um órgão público como identidade aparente. Pessoa física nunca poderá ser o remetente malicioso simulado.

O fluxo recomendado para aproveitar um dossiê é:

1. comparar o caso com os 187 conceitos e as atividades proprietárias existentes;
2. identificar qual comportamento seguro ainda não está coberto;
3. decidir se o caso será núcleo, variação, transferência ou apenas debrief;
4. produzir uma adaptação fictícia e inerte;
5. aplicar a regra de um comportamento principal, até dois complementares e uma transferência curta;
6. revisar dificuldade, acessibilidade, segurança e falsos positivos;
7. somente então propor blueprint ou banco de casos versionado.

## Limites

- Os exemplos não devem ser usados para disparar phishing real.
- Nenhum texto desta pasta autoriza uso de marcas, pessoas ou domínios reais numa atividade.
- Nenhuma simulação poderá personificar pessoa física; conversas, voz, vídeo, telefone, SMS, WhatsApp e perfis individuais não são formatos autorizados.
- A dificuldade é relativa ao público-alvo, não uma nota absoluta da campanha.
- Aparência, gramática, urgência ou um único campo nunca formam veredito isolado.
- Radar permanece opcional; Arcade não faz parte desta biblioteca.
- O portal continua demonstrativo e o backend autoritativo permanece obrigatório antes do uso real.
