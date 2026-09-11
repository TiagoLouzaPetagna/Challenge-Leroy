# Apontamento devolvido

> **Estado:** proposta editorial e técnica para aprovação.
>
> **Tipo:** simulação futura de phishing por e-mail, posterior à jornada principal.
>
> **Implementação atual:** inexistente. Não há disparo, rota, tela, pontuação,
> rastreamento ou integração com o portal.

## 1. Por que este é o primeiro caso

O caso foi escolhido para iniciar a criação individual das futuras campanhas por
quatro motivos:

- representa um processo corporativo específico, em vez de uma urgência genérica;
- faz sentido somente para um público elegível, o que permite trabalhar contexto
  sem transformar desconhecimento do processo em erro do funcionário;
- não depende de personificar gestor, colega, fornecedor ou outra pessoa física;
- permite avaliar uma ação segura completa sem solicitar ou registrar senha.

O relatório interno fornecido como referência foi usado apenas para extrair
lições gerais de desenho. Nenhum nome, domínio, marca, texto, imagem, dado ou
indicador da organização foi copiado para esta proposta.

## 2. Decisão pedagógica

### Comportamento principal

Ao receber uma suposta pendência em um processo conhecido, o funcionário abre o
portal pela rota que já utiliza e confirma o estado do registro sem usar o botão
do e-mail.

### Conceitos complementares

1. nome institucional e acabamento profissional não comprovam a origem;
2. prazo e consequência operacional justificam atenção, mas não dispensam a
   confirmação independente.

### O que este caso não tenta medir

- domínio definitivo de phishing;
- conhecimento técnico de cabeçalhos;
- velocidade de resposta;
- capacidade de reconhecer erros de português;
- disposição para desconfiar de toda mensagem interna;
- entrega de credenciais, porque nenhuma credencial será solicitada.

## 3. Público e condição de elegibilidade

### Público candidato

Funcionários que registram horas, alocação ou atividades em um portal
corporativo e que tenham usado esse processo recentemente.

### Condições obrigatórias antes de qualquer piloto

- a organização realmente possui um fluxo conhecido de apontamento;
- o público selecionado recebeu orientação prévia sobre a rota oficial;
- o calendário apresentado é compatível com o fechamento real daquele público;
- funcionários afastados, em férias, recém-admitidos sem acesso ou fora do
  processo são excluídos;
- nenhuma informação de cliente, projeto, contrato ou alocação real entra no
  e-mail;
- a área responsável pelo processo aprova o cenário e o momento do envio.

Sem essas condições, o caso perde valor pedagógico e não deve ser disparado.

## 4. Identidade e contexto fictícios

| Elemento | Definição da proposta |
|---|---|
| Identidade simulada | Área interna fictícia: **Central de Apontamentos** |
| Tipo permitido | `setor-interno` |
| Canal inicial | E-mail |
| Assinatura | Institucional, sem pessoa física |
| Portal conhecido | `https://horas.intra.example` |
| Domínio do remetente simulado | `horas-corporativo.example` |
| Destino do botão | `https://revisao.horas-corporativo.example/caso/registro-inerte` |
| Artefato | Notificação automática curta, sem anexo |
| Pedido | Revisar uma suposta divergência antes do fechamento |
| Consequência alegada | Registro seguir para o próximo ciclo de validação |

Os endereços `.example` são reservados e inertes. Eles representam a relação
entre os destinos, não a infraestrutura de uma campanha real. Um eventual
piloto exigirá domínio controlado, aprovado e monitorado pela organização.

## 5. E-mail simulado

### Cabeçalho visível

| Campo | Conteúdo |
|---|---|
| Nome exibido | Central de Apontamentos |
| De | `notificacoes@horas-corporativo.example` |
| Responder para | `notificacoes@horas-corporativo.example` |
| Assunto | **Apontamento de agosto devolvido para ajuste** |
| Prévia | O centro de custo informado não corresponde à alocação ativa. |

### Texto integral proposto

> Olá, Marina.
>
> Seu apontamento do período de **16 a 31 de agosto** voltou para ajuste antes
> do fechamento mensal.
>
> **Motivo informado**<br>
> Centro de custo diferente da alocação ativa
>
> **Referência**<br>
> AP-83217
>
> **Situação**<br>
> Ajuste pendente
>
> O período será consolidado hoje, às 17h. Se a divergência permanecer, as horas
> seguirão para o próximo ciclo de validação.
>
> **[Revisar pendência]**
>
> Esta é uma mensagem automática da **Central de Apontamentos**. Não responda a
> este e-mail.

`Marina` é uma destinatária fictícia usada somente para revisar a peça. Na
operação, a variável de saudação deverá ser validada antes do envio. Se não
houver um primeiro nome permitido e corretamente resolvido, a mensagem usará
somente `Olá,` e nunca exibirá o nome da variável ou outro marcador de template.

## 6. Coerência editorial

O texto adota o formato de uma notificação transacional, por isso é curto,
direto e organizado por campos. Ele não recebe banner promocional, lista de
vantagens, tom jurídico ou assinatura de suporte, pois esses recursos não
pertencem ao contexto de um apontamento devolvido.

A consequência é proporcional: o registro iria para outro ciclo de validação.
O e-mail não ameaça bloqueio de conta, perda imediata de salário, punição ou
demissão. O prazo cria uma decisão realista, mas não tenta produzir pânico.

O identificador `AP-83217` parece operacional, porém é inteiramente fictício e
não codifica matrícula, cliente, projeto ou período de uma pessoa real.

## 7. Indícios e prova no contexto

### O que o funcionário pode observar no e-mail

- o domínio `horas-corporativo.example` não é a rota conhecida
  `horas.intra.example`;
- a mensagem oferece um botão para uma ação que também pode ser feita pelo
  portal habitual;
- o prazo aumenta a pressão, mas não comprova que a pendência exista;
- o nome da área, o número de referência e a boa diagramação são aparências
  plausíveis, não provas.

### Evidência decisiva

Ao abrir **Intranet → Sistemas → Apontamento de horas** pela rota conhecida, o
funcionário não encontra a referência `AP-83217` nem qualquer devolução para o
período apresentado.

O veredito não depende de um erro de escrita ou de um detalhe visual. Ele nasce
da divergência entre o pedido do e-mail e a fonte autoritativa do processo.

### Limite da conclusão

Antes de consultar o portal oficial, o funcionário pode afirmar que a mensagem
precisa ser verificada, mas não que já comprovou a fraude. A ausência da
pendência na fonte oficial é o elemento que permite encerrar a decisão neste
caso.

## 8. Rota segura esperada

1. não usar o botão **Revisar pendência**;
2. abrir a intranet por favorito, endereço conhecido ou iniciador corporativo;
3. entrar em **Sistemas → Apontamento de horas**;
4. procurar o período e a referência apresentados;
5. ao confirmar que a pendência não existe, usar o recurso institucional de
   reporte disponibilizado pela organização, se esse recurso estiver integrado
   ao piloto.

Não será criado no portal um botão genérico **Como reportar**. Se a empresa não
possuir uma integração de reporte definida, a campanha avaliará somente o clique
e a visualização educativa; não fingirá que um reporte real foi realizado.

## 9. Comunicação legítima de controle

Uma mensagem legítima equivalente é obrigatória para impedir a regra errada de
que toda notificação de apontamento é phishing.

### Cabeçalho do controle

| Campo | Conteúdo |
|---|---|
| Nome exibido | Central de Apontamentos |
| De | `notificacoes@intra.example` |
| Assunto | **Apontamento de agosto disponível para conferência** |
| Prévia | A conferência do período está aberta até as 17h. |

### Texto integral do controle

> Olá, Marina.
>
> A conferência do apontamento de **16 a 31 de agosto** está disponível até as
> 17h de hoje.
>
> Para revisar horas, alocação e centro de custo, abra a **Intranet** e siga por
> **Sistemas → Apontamento de horas**.
>
> Nenhuma resposta a este e-mail é necessária.
>
> **Central de Apontamentos**

A peça legítima deve receber o mesmo cuidado tipográfico, contraste, revisão de
texto e compatibilidade com clientes de e-mail. A diferença ensinável está no
processo verificável, não em deixar a mensagem legítima mais bonita ou a
simulada propositalmente malfeita.

## 10. Experiência depois do clique

O botão simulado nunca abrirá um formulário de senha. O clique levará
diretamente a uma página educativa neutra, com o seguinte núcleo de mensagem:

> **Este link fazia parte de uma simulação interna.**
>
> Nenhuma senha ou dado de autenticação foi solicitado ou coletado.
>
> O e-mail parecia compatível com um fechamento mensal, mas a pendência só
> poderia ser confirmada pelo portal aberto pela rota conhecida. Antes de agir
> em um aviso desse tipo, acesse a Intranet e consulte o registro original.

A página deverá mostrar, nesta ordem:

1. o comportamento que teria reduzido o risco;
2. a diferença entre os dois domínios;
3. a rota oficial independente;
4. por que prazo, referência e aparência não bastavam;
5. uma revisão curta do e-mail recebido.

Não será usado o rótulo **vítima**, **comprometido**, **reprovado** ou **você
caiu**. Um clique é um evento observável da simulação, não prova de comprometimento
da conta nem julgamento definitivo sobre a pessoa.

## 11. Eventos e dados mínimos

### Eventos candidatos

| Evento | Finalidade | Observação |
|---|---|---|
| `simulation_delivered` | confirmar entrega técnica | não significa leitura humana |
| `simulation_link_clicked` | registrar uso do destino simulado | não significa envio de dados |
| `simulation_education_viewed` | confirmar abertura do debrief | não comprova aprendizagem |
| `simulation_reported` | registrar reporte pelo canal integrado | somente se a plataforma de e-mail oferecer evento confiável |

### Dados que não serão guardados

- senha, tentativa de senha ou conteúdo digitado;
- corpo de resposta do funcionário;
- captura de tela da caixa postal;
- histórico geral de navegação;
- conteúdo de mensagens reais;
- cliente, projeto, centro de custo ou alocação reais;
- pixel de abertura usado como medida de comportamento.

### Registro mínimo por evento

- identificador opaco da campanha;
- identificador opaco do destinatário, separado do endereço de e-mail;
- tipo de evento permitido por `allowlist`;
- instante no servidor;
- versão da peça e do público elegível;
- origem técnica necessária para auditoria e antifraude, com retenção definida.

O endereço de e-mail e a tabela que resolve o identificador opaco permanecem em
repositório de acesso restrito. Dados individuais não serão usados em ranking,
conquista, pontuação do portal ou exposição pública.

## 12. Leitura dos resultados

| Sequência observada | Interpretação permitida |
|---|---|
| reporte antes do clique | ação segura observada no canal integrado |
| nenhum clique e nenhum reporte | nenhuma conclusão sobre o motivo |
| clique e abertura do debrief | interação de risco seguida de orientação |
| clique e reporte posterior | recuperação e reporte depois da interação |
| entrega sem leitura comprovável | somente entrega técnica |

A campanha não produzirá uma taxa de “contas comprometidas”, porque não existe
coleta de credenciais. Também não classificará silêncio como acerto: a pessoa
pode ter ignorado, não visto ou filtrado a mensagem.

## 13. Segurança operacional futura

Antes de qualquer envio real serão necessários:

- autorização formal de Segurança, Privacidade, Pessoas e da área responsável
  pelo processo retratado;
- domínio de simulação pertencente à organização e claramente documentado para
  as equipes que operam e respondem a incidentes;
- SPF, DKIM e DMARC configurados de acordo com a arquitetura aprovada, sem
  falsificar o domínio produtivo;
- identificadores assinados, com expiração, sem dados pessoais na URL;
- página HTTPS controlada, sem recursos de terceiros e sem campos de login;
- `allowlist` de eventos, idempotência, controle de acesso, auditoria e retenção;
- teste prévio com caixas controladas para validar remetente, variáveis, links,
  layout, acessibilidade e cancelamento de emergência;
- exclusão segura dos dados ao final da retenção aprovada;
- plano para suporte a quem interpretar a mensagem como ocorrência real.

O backend autoritativo continua obrigatório. A existência deste arquivo não
autoriza disparo, compra de domínio, configuração de correio ou coleta de dados.

## 14. Acessibilidade da peça e do debrief

- informação essencial em texto, sem depender de imagem;
- ordem de leitura linear e sem tabela usada como estrutura invisível;
- botão com rótulo descritivo e destino disponível para inspeção;
- contraste suficiente e foco visível na página educativa;
- título único, regiões semânticas e operação completa por teclado;
- diferenças entre domínios explicadas por texto, não apenas por cor;
- ausência de contagem regressiva, animação obrigatória ou limite de tempo.

## 15. Critérios para aprovação deste caso

O caso somente avança para protótipo quando forem aprovados:

1. pertinência do processo de apontamento para o público real;
2. nome real da rota independente que o público já conhece;
3. período, prazo e consequência compatíveis com o processo;
4. integração — ou exclusão explícita — do evento de reporte;
5. domínio controlado a ser usado em ambiente autorizado;
6. texto final da peça simulada e da mensagem legítima de controle;
7. retenção, acesso e apresentação dos resultados;
8. revisão jurídica, de privacidade, acessibilidade e segurança.

## 16. Fora de escopo desta proposta

- disparo de e-mail;
- tela no Painel de gestão;
- implementação no portal do funcionário;
- criação de domínio ou conta de remetente;
- integração com correio, SSO, intranet ou sistema de apontamento;
- pontos, conquistas, ranking ou recompensa;
- suporte móvel;
- segundo caso de phishing.

## 17. Histórico

| Data | Decisão | Estado |
|---|---|---|
| 2026-09-02 | Criar somente o primeiro caso após análise individual, usando o relatório interno apenas como referência confidencial. | Documentado para aprovação |
