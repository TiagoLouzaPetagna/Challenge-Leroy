# PhishLab — Espelho de Página

> **Estado atual:** conceito planejado, exibido somente como card local.
> **Formato-alvo:** existe uma descrição conceitual histórica, mas o formato executável ainda não foi aprovado.

## 1. Identidade e rastreabilidade

| Campo | Valor |
|---|---|
| Área | PhishLab |
| Percurso | Fora do primeiro percurso aprovado |
| `activityId` | A definir |
| Identificador local do card | `mirror-page` — não é contrato público |
| Versão | A definir |
| Rota funcional | Não existe |
| Integração atual | Planejada; somente card “Em produção” |
| Duração estimada | A definir |
| Pontos | A definir |
| Competência indicada | Verificar |
| Pré-requisitos | A definir |
| Relações recomendadas | Historicamente citado como reforço para páginas imitadas e documentos inesperados; vínculo não formalizado |
| Última conferência no código | 2026-08-11 |

O card usa o título **Espelho de Página**, enquanto trechos históricos do documento-mãe usam **Página Espelho**. O nome editorial deve ser consolidado antes da publicação. Não existe `phishlab:mirror-page`, versão ou slug formal; esses valores não devem ser inventados a partir do ID interno da interface.

### Mapa atual

| Responsabilidade | Arquivo ou símbolo | Situação |
|---|---|---|
| Card local | `features/phishlab/PhishLabExperience.tsx` — item `mirror-page` | Planejado |
| Descrição conceitual | `DOCUMENTACAO-PLATAFORMA.md`, seção 8.4 | Documentada historicamente |
| Player e rota | Ausentes | Não implementados |
| Catálogo versionado | Ausente | Não implementado |
| Avaliador, contrato e estado | Ausentes | Não implementados |
| Persistência e testes | Ausentes | Não implementados |

## 2. Objetivo educacional

Ensinar que logotipo, cores, tipografia, textos e aparência profissional não comprovam a identidade de uma página. O funcionário deverá comparar uma página legítima fictícia com uma imitação, localizar diferenças relevantes e escolher uma rota conhecida para acessar o serviço esperado.

- **Comportamento observável:** examinar endereço, contexto e dados solicitados antes de interagir.
- **Técnica do atacante:** clonagem visual de página de autenticação ou serviço conhecido.
- **Atalho inseguro:** confiar porque a tela “parece certa”.
- **Limite:** acertar uma comparação curada não prova que a pessoa reconhecerá toda página falsa futura.

## 3. Implementação atual

O hub apresenta um card com o resumo “Compare uma página fictícia legítima com uma imitação e descubra por que a aparência não comprova identidade” e a indicação “Comparação visual · Verificar”. O botão está desativado e informa conteúdo futuro.

Não existem páginas comparáveis, ferramentas, resposta, feedback, nota, tentativa, progresso ou recompensa. A URL hipotética `/phishlab/espelho-de-pagina` seria capturada por `/phishlab/[id]`, mas `app/page.tsx` não reconhece esse slug e exibiria o hub. Portanto ela não é rota funcional.

## 4. Formato conceitual existente

A descrição histórica prevê apresentar lado a lado uma página legítima fictícia e uma imitação para comparar:

- endereço;
- campos solicitados;
- textos;
- comportamento representado dos botões;
- elementos visuais;
- sinais usados para transmitir confiança.

Isso define o tema, não um player. Ainda precisam ser aprovados número de casos, ferramentas, ordem, interações, evidências, condições de avanço, feedback e debrief.

### Cuidados para o futuro formato

- O endereço e o processo esperado devem ter mais peso pedagógico que diferenças cosméticas.
- A página legítima também pode ter aparência incomum; “design ruim” não é prova de fraude.
- A imitação não deve ser deliberadamente grosseira.
- Nenhum campo pode aceitar credencial real.
- Botões e endereços devem ser inertes e usar domínios reservados `.example`.
- O usuário deve ter uma alternativa segura: abrir o serviço por rota conhecida e confirmar o contexto.

## 5. Modelo de conteúdo a definir

| Elemento | Estado |
|---|---|
| Contexto profissional | A definir |
| Serviço imitado | A definir; sempre fictício |
| Objetivo do atacante | Capturar credencial, código ou dado — cenário exato a definir |
| Gatilhos sociais | A definir |
| Aparências não probatórias | Logotipo, cores, HTTPS representado, linguagem profissional |
| Evidências úteis | Endereço, origem da navegação, contexto e campos solicitados |
| Evidência decisiva | A definir conforme o caso |
| Confirmação independente | Abrir o serviço por rota conhecida |
| Reporte e recuperação | A definir |

## 6. Fluxo e interação

**A definir.** A comparação lado a lado é somente a ideia inicial. Antes de implementação, a especificação deverá escolher se a pessoa marca regiões, relaciona diferenças, seleciona evidências, reconstrói o caminho de navegação ou combina essas ações.

O fluxo deverá incluir briefing, inspeção, conclusão, segundo caso independente e debrief se continuar seguindo a função geral do PhishLab. A abertura do card ou a simples visualização das páginas não poderá contar como conclusão.

## 7. Avaliação, competências e recompensa

**A definir.** A regra transversal das atividades PhishLab implementadas usa 60 pontos-base, mas este conceito não possui catálogo versionado nem recompensa própria; por isso o valor não é assumido aqui.

A avaliação futura deverá evitar pontuar quantidade de cliques ou velocidade. Possíveis dimensões — ainda não aprovadas — são identificação do endereço relevante, distinção entre aparência e prova, qualidade das evidências e escolha de rota conhecida. Pesos, crédito parcial, revisão, competência, chave única e bônus precisam ser formalizados antes da publicação.

## 8. Contrato, persistência e compatibilidade

Não existe resposta bruta nem resultado. O contrato genérico atual de `PhishLabSubmission` foi criado para análise de domínio e remetente; não deve ser reutilizado artificialmente para uma comparação de páginas.

Uma implementação futura deverá definir:

- `activityId`, versão e slug estáveis;
- IDs de páginas, regiões, evidências e conclusões;
- allowlist e rejeição de duplicados ou relações impossíveis;
- avaliador determinístico;
- resultado derivado e revisão;
- recompensa idempotente;
- persistência e eventual migração do esquema;
- leitura preservada das tentativas anteriores de outros PhishLabs.

Nenhum estado de conclusão deve ser criado a partir do card já existente.

## 9. Integrações

O card aparece no hub do PhishLab. O documento principal o cita como possível prática de competência e como exemplo relacionado a páginas ou documentos, mas atualmente não existe ação contextual funcional no Perfil, currículo, atividade recente ou Radar.

Quando integrado, deverá atualizar somente após conclusão válida: progresso, pontos, competência, conquistas, histórico e recomendação. A navegação não concede recompensa. Radar será opcional e Equipes receberá apenas contribuição permitida, nunca comparações ou erros individuais.

## 10. Privacidade, segurança e backend

Nenhuma página real, credencial, cookie, domínio ou dado de navegação deve ser coletado. A experiência utilizará capturas ou componentes fictícios e inertes. Respostas, nota e feedback são privados.

Antes do uso real, o backend autoritativo deverá publicar a versão, autorizar público, validar resposta, calcular resultado, conceder recompensa e persistir com idempotência. Integração com navegador, SSO ou página corporativa está fora deste protótipo.

## 11. Acessibilidade desktop

Uma atividade visual comparativa deverá possuir equivalência textual completa:

- cada região comparável com nome e descrição;
- leitura linear alternativa à disposição lado a lado;
- zoom e texto ampliado sem perda de conteúdo;
- operação integral por teclado, sem depender de hover ou coordenadas;
- diferenças explicadas sem depender somente de cor, posição ou imagem;
- foco programático, contraste e movimento reduzido;
- nenhuma pontuação por rapidez.

O suporte específico a celular permanece fora do escopo atual.

## 12. Testes e critérios de disponibilidade

Antes de marcar como disponível, testar rota exclusiva sem queda no hub, conteúdo inteiramente fictício, contrato, IDs inválidos, avaliação segura/parcial/insegura, repetição, persistência, recompensa, integrações, privacidade e equivalência textual. A validação manual deverá cobrir teclado, leitor de tela, zoom, contraste e texto ampliado.

No estado atual, o único comportamento aceito é card planejado e desativado que não cria progresso ou pontos.

## 13. Pendências e histórico

- consolidar o título editorial;
- definir ID, versão, rota, duração e pontos;
- aprovar mecânica e casos;
- definir o que diferencia evidência visual útil de mera aparência;
- garantir alternativa textual antes da implementação;
- decidir relações com Missões e Radar sem criar dependência.

| Data | Registro |
|---|---|
| Planejamento inicial | Página Espelho descrita como estação inicial do PhishLab. |
| MVP local | Card `mirror-page` adicionado ao hub como conteúdo em produção. |
| 2026-08-11 | Confirmado que não existe contrato, versão ou rota funcional. |
| 2026-08-11 | Documento individual criado sem promover o conceito a atividade disponível. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
