# Viabilidade dos formatos de atividade

> **Estado:** análise técnica preliminar; nenhuma decisão desta pasta autoriza implementação.
> **Base avaliada:** portal local Casa Digital Segura em 2026-08-11.
> **Escopo atual:** desktop; adaptação móvel permanece posterior.

Esta pasta avalia os 374 formatos candidatos registrados em [`../estudos-de-formatos`](../estudos-de-formatos/README.md) contra a arquitetura que existe hoje no portal. A pergunta desta etapa é: **o que seria necessário para transformar cada hipótese pedagógica em uma experiência real, segura, acessível e sustentável neste projeto?**

A análise cobre os mesmos 187 `conceptId`s canônicos, dois formatos por conceito e a mesma ordem dos nove conjuntos. Ela não cria atividade, `activityId`, versão, rota, contrato, pontuação, recompensa ou disponibilidade.

## O que esta etapa decide

Para cada formato são avaliados:

- possibilidade de implementação no portal atual;
- esforço relativo, sem converter a classificação em prazo;
- quanto da interface, do estado e da avaliação atuais pode ser reutilizado;
- componentes, contratos e testes que precisariam ser criados;
- dependências editoriais, corporativas, de mídia ou de backend;
- acessibilidade e risco de ensinar uma regra incorreta;
- decisão preliminar de manter, adaptar, combinar, adiar ou descartar o formato como atividade própria.

A classificação mede **encaixe técnico atual**, não valor pedagógico. Um formato pode ser excelente para ensinar e ainda possuir baixa viabilidade imediata por depender de mídia, integração corporativa, produção extensa ou um subsistema que ainda não existe.

## Escala de viabilidade

| Classificação | Significado |
|---|---|
| **Alta** | Cabe na arquitetura atual com componentes existentes ou uma extensão localizada e determinística. |
| **Média** | É implementável, mas exige componente reutilizável novo, contrato próprio ou mudança transversal controlada. |
| **Baixa** | Exige subsistema, produção especializada, estado complexo, integração ou manutenção desproporcional ao conceito isolado. |
| **Não recomendada neste formato** | Produziria avaliação enganosa, risco desnecessário, duplicação ou responsabilidade que não pertence ao funcionário. |

## Escala de esforço relativo

| Esforço | Interpretação nesta análise |
|---|---|
| **P** | Variação de conteúdo ou caso em uma mecânica e contrato já compatíveis. |
| **M** | Nova tela ou componente local, com extensão limitada de resposta, avaliação e testes. |
| **G** | Nova versão de atividade ou mecânica compartilhada, com contrato, reducer, persistência, seletores e testes próprios. |
| **EG** | Novo subsistema, produção audiovisual/espacial, editor, integração corporativa ou coordenação entre múltiplas superfícies. |

Esforço não representa dias, custo fechado nem autorização. Mesmo um item **P** exige revisão editorial, acessibilidade, segurança e validação.

## Tipos de encaixe

- **Reuso direto:** escolhas, `fieldset`, evidências, stepper, caixa de mensagens, resultado e debrief existentes bastam.
- **Reuso com extensão:** a estrutura atual serve, mas precisa de nova visualização, estado ou regra de avaliação.
- **Componente novo:** a mecânica é autocontida e pode ser criada dentro de uma atividade.
- **Subsistema novo:** a capacidade deverá servir a várias atividades ou alterar estado, contratos e persistência de forma transversal.
- **Mídia ou processo externo:** depende de áudio, vídeo, diretório, procedimento corporativo, integração ou produção fora do código atual.

## Decisões preliminares

- **Manter:** o formato pode seguir para especificação quando a atividade correspondente for priorizada.
- **Adaptar:** o núcleo é válido, mas a interação precisa mudar antes de ser especificada.
- **Combinar:** o formato deve integrar outra mecânica ou conceito, sem gerar atividade/recompensa própria.
- **Adiar:** é viável em tese, mas depende de capacidade ou conteúdo que não convém construir agora.
- **Descartar como atividade própria:** preservar o ensinamento como caso, debrief ou limite técnico, sem player separado.

## Resultado consolidado da matriz

Os 374 formatos foram classificados individualmente:

| Viabilidade | Formatos |
|---|---:|
| Alta | 292 |
| Média | 67 |
| Baixa | 9 |
| Não recomendada neste formato | 6 |

| Esforço relativo | Formatos |
|---|---:|
| P | 52 |
| M | 241 |
| G | 68 |
| EG | 13 |

Depois da comparação A × B, os 187 conceitos receberam 53 decisões de **Manter**, 45 de **Adaptar**, 73 de **Combinar**, 6 de **Adiar** e 10 de **Descartar como atividade própria**. A alta viabilidade de muitos formatos não significa que devam virar players independentes: a decisão mais frequente foi combinar o ensinamento com uma mecânica ou atividade maior.

A distribuição curricular resultante foi consolidada em [`../mapa-conceitos-atividades`](../mapa-conceitos-atividades/README.md). O mapa e os 21 blueprints com primeira versão foram aprovados em 2026-08-15. A conversão para identidade, componentes e ordem está proposta no [`mapa técnico`](../mapa-tecnico-de-implementacao/README.md), ainda sem alterar o portal executável.

## Documentos

### Base transversal

- [Arquitetura atual e implicações](ARQUITETURA-ATUAL.md)
- [Famílias de mecânicas reutilizáveis](FAMILIAS-DE-MECANICAS.md)
- [Priorização preliminar](PRIORIZACAO-PRELIMINAR.md)
- [Modelo de análise por conceito](_MODELO.md)

### Avaliação por conjunto

1. [Decisão sob pressão e incerteza](01-decisao-sob-pressao-e-incerteza.md)
2. [Identidade, remetente e contas](02-identidade-remetente-e-contas.md)
3. [Destinos, links, QR, páginas e aplicativos](03-destinos-links-qr-paginas-e-aplicativos.md)
4. [Autenticação, permissões e sessões](04-autenticacao-permissoes-e-sessoes.md)
5. [Arquivos, compartilhamentos e execução](05-arquivos-compartilhamentos-e-execucao.md)
6. [Canais, personificação e IA](06-canais-personificacao-e-ia.md)
7. [Processos, pagamentos e BEC](07-processos-pagamentos-e-bec.md)
8. [Reporte, recuperação e proteção coletiva](08-reporte-recuperacao-e-protecao-coletiva.md)
9. [Engenharia social presencial e ambiental](09-engenharia-social-presencial-e-ambiental.md)

## Limites desta análise

- A arquitetura avaliada possui estado demonstrativo local e não autoritativo.
- Antes do uso real, o backend deverá validar versão, resposta, nota, recompensa, idempotência, autorização, publicação e retenção.
- Conteúdo corporativo só poderá usar diretórios, contatos e procedimentos publicados por responsáveis autorizados.
- Áudio e vídeo somente poderão avançar com qualidade editorial, direitos, consentimento, transcrição e equivalente textual.
- Nenhum artefato poderá executar comando, abrir link perigoso, instalar arquivo, escanear QR real, efetuar contato, pagamento ou reporte.
- Arcade permanece fora desta análise.
- A conclusão sobre viabilidade poderá mudar depois de uma refatoração da plataforma ou de uma prova de conceito aprovada.
