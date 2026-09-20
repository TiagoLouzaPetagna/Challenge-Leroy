# Missão — Documento inesperado

> **Estado atual:** planejada no catálogo legado; não possui player.
> **Formato-alvo:** não definido.

## 1. Identidade

| Campo | Valor atual |
|---|---|
| Área | Missões |
| Percurso | Jornada principal legada, posição 4; fora de **Confiança sob pressão** |
| `activityId` | `mission:unexpected-document` |
| Versão | A definir |
| Slug catalogado | `documento-inesperado` |
| Rota funcional | Não existe |
| Integração | Planejada; card visível e não jogável |
| Duração estimada | 10 minutos no catálogo |
| Pontos | A definir |
| Competências indicadas | Observar, Investigar e Recuperar |
| Pré-requisito legado | `mission:urgent-manager-request` |
| Radar relacionado | A definir |

A URL `/missoes/documento-inesperado` é capturada pela rota dinâmica, mas atualmente renderiza o hub. Não há conteúdo exclusivo nessa URL.

### Mapa atual

| Responsabilidade | Arquivo | Situação |
|---|---|---|
| Card e metadados | `lib/content/learning-catalog.ts` | Planejado |
| Hub | `features/missions/MissionsHub.tsx` | Exibe conteúdo em produção |
| Player, conteúdo e avaliador | Ausentes | Não implementados |
| Contrato, persistência e testes | Ausentes | Não implementados |

## 2. Objetivo educacional

O catálogo propõe decidir como tratar um arquivo inesperado sem expor a conta ou o dispositivo. O comportamento seguro deve combinar análise de contexto e origem, confirmação por caminho conhecido, interrupção da interação e resposta proporcional caso o arquivo já tenha sido aberto ou executado.

O conceito não deve ensinar que toda extensão incomum prova malware nem que excluir o arquivo encerra o caso. Aparência de nota fiscal, contrato ou compartilhamento em nuvem também não comprova legitimidade.

## 3. Implementação atual

Existe apenas o card com subtítulo **Anexo fora de contexto**, resumo, competências, duração e posição. `playableInMvp` é `false`.

Não há artefato, arquivo, página, botão de download, cenário, decisão, consequência ou resultado. Nenhum anexo real é armazenado ou executado. Não há tentativa, progresso, recompensa ou evidência de competência.

## 4. Formato-alvo

**Não definido.** O conceito histórico de **Espelho de Página** pode ser uma prática relacionada, mas não determina a mecânica desta Missão. O montador de resposta aprovado para **Cliquei. E agora?** também não deve ser reutilizado automaticamente.

Uma futura definição precisa escolher se o foco será análise prévia do documento, confirmação do contexto, resposta após abertura ou combinação dessas etapas, sem sobrepor PhishLab e recuperação.

## 5. Conteúdo e fluxo a definir

Elementos existentes:

- documento ou anexo fora de contexto;
- risco à conta ou ao dispositivo;
- competências Observar, Investigar e Recuperar;
- duração editorial de 10 minutos.

Ainda faltam canal, identidade, tipo de arquivo, pedido, gatilhos, extensão, evidências, confirmação independente, ações possíveis, consequência, reporte e recuperação. Qualquer artefato futuro deverá ser representação inerte; não usar macro, executável, download ou URL real.

## 6. Avaliação e recompensa

**A definir.** A regra geral de 100 pontos-base das Missões principais atuais não está vinculada a este card. Uma futura avaliação deverá separar, conforme o foco aprovado:

- observação do contexto e da origem;
- investigação do tipo e da necessidade do arquivo;
- confirmação por canal conhecido;
- decisão de não abrir ou executar;
- reporte e recuperação proporcional se já houve interação.

Peso, nota de revisão, crédito parcial, chave de recompensa e contribuição coletiva permanecem a definir. Velocidade não deve valer pontos.

## 7. Contrato e persistência

Não existe contrato. A implementação não deve aceitar upload de arquivos reais nem inventar conclusão a partir de navegação no card.

Uma versão futura exigirá ID e versão publicados, rota exclusiva, catálogo seguro dos artefatos, resposta bruta validável, avaliador determinístico, resultado derivado, idempotência, persistência e eventual migração. O backend real deverá calcular e confirmar tudo; o cliente não poderá declarar que um arquivo foi analisado com segurança.

## 8. Integrações

Na sequência legada, vem depois de **Pedido urgente de um gestor** e antes de `mission:clicked-now-what`. O segundo já possui uma implementação canônica no novo percurso, embora o catálogo legado ainda o marque incorretamente como não jogável. Essa inconsistência não torna **Documento inesperado** disponível.

O Radar de anexos inesperados é tematicamente relacionado, mas continua planejado e opcional; o vínculo formal da Missão ainda é a definir. Perfil, atividade recente, pontos e competências não mudam ao visualizar o card.

## 9. Privacidade e backend

Hoje nenhum dado é coletado. Uma experiência futura não deve solicitar upload, hash, nome de arquivo real, dispositivo, credencial ou dado corporativo. Respostas e notas permanecem privadas; somente agregado autorizado pode chegar à equipe.

Backend autoritativo, catálogo de conteúdo revisado, armazenamento seguro, retenção e auditoria serão obrigatórios antes do uso real. Integração com antivírus, e-mail, endpoint ou canal de reporte está fora deste protótipo.

## 10. Acessibilidade desktop

Representações de arquivos devem possuir nome, tipo, tamanho e contexto em texto; ícone e cor nunca podem ser a única pista. Comparações devem funcionar por teclado e leitor de tela, sem exigir hover ou percepção visual fina. O fluxo precisa suportar foco, contraste, texto ampliado, movimento reduzido e ausência de limite de tempo.

Celular permanece fora do escopo atual.

## 11. Testes e disponibilidade

Para publicação serão necessários testes de segurança do artefato inerte, rota própria, contrato, avaliador, casos seguros e inseguros, payload inválido, repetição, recompensa, persistência, integrações, privacidade e acessibilidade. Deve existir verificação explícita de que nenhum arquivo ou endereço externo é aberto.

No estado atual, o teste esperado é apenas o card planejado, desativado e incapaz de criar progresso.

## 12. Pendências e histórico

- definir foco exato e formato;
- formalizar versão, rota, pontos e relação com Radar/PhishLab;
- separar prevenção de recuperação para não repetir **Cliquei. E agora?**;
- preservar o ambiente totalmente inerte;
- corrigir no futuro a apresentação da sequência legada sem alterar este status.

| Data | Registro |
|---|---|
| Planejamento inicial | Card incluído como quarta Missão da jornada legada. |
| 2026-08-11 | Confirmado que não existe player, versão, avaliador ou persistência. |
| 2026-08-11 | Documento individual criado como conceito planejado. |

Documento-mãe: [DOCUMENTACAO-PLATAFORMA.md](../../DOCUMENTACAO-PLATAFORMA.md).
