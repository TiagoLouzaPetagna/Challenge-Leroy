const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ui = {
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  resultScreen: document.getElementById("resultScreen"),
  emailModal: document.getElementById("emailModal"),
  startButton: document.getElementById("startButton"),
  restartButton: document.getElementById("restartButton"),
  closeEmailButton: document.getElementById("closeEmailButton"),
  acceptButton: document.getElementById("acceptButton"),
  reportButton: document.getElementById("reportButton"),
  emailSubject: document.getElementById("emailSubject"),
  emailSender: document.getElementById("emailSender"),
  emailBody: document.getElementById("emailBody"),
  readTimerBar: document.getElementById("readTimerBar"),
  finalScore: document.getElementById("finalScore"),
  rankTitle: document.getElementById("rankTitle"),
  breakdown: document.getElementById("breakdown"),
  resultList: document.getElementById("resultList"),
  integrationStatus: document.getElementById("integrationStatus"),
  resultIntegrationStatus: document.getElementById("resultIntegrationStatus"),
};

const BRIDGE_SOURCE = "fortifica:overlooked-game";
const PLATFORM_SOURCE = "fortifica:arcade-platform";
const BRIDGE_VERSION = 1;
const isEmbedded = window.parent !== window;
let activeRunId = null;
let awaitingSession = false;
const onlineParams = new URLSearchParams(window.location.search);
const onlineCode = onlineParams.get("mode") === "online" && /^[A-Z2-9]{8}$/.test(onlineParams.get("code") || "")
  ? onlineParams.get("code") : null;
let onlineSocket = null;
let onlineRole = null;
let onlineRoomStatus = "waiting";
let onlineGuestConnected = false;
let onlineSnapshotAt = 0;
const remoteKeys = new Set();

const BASE_TILE = 128;
const TILE = 48;
const WORLD_SCALE = TILE / BASE_TILE;
const world = (value) => value * WORLD_SCALE;
const pixel = (value) => Math.round(world(value));
const MAP_COLS = 12;
const MAP_ROWS = 7;
const WIDTH = TILE * MAP_COLS;
const HEIGHT = TILE * MAP_ROWS;
canvas.width = WIDTH;
canvas.height = HEIGHT;
setCanvasSmoothing(false);
const SESSION_LENGTH = 300;
const MAX_QUEUE = 3;
const READ_LIMIT = 28;
const PLAYER_SPEED = world(280);
const EMAIL_ARRIVAL_MIN = 12;
const EMAIL_ARRIVAL_VARIATION = 6;
const ACTION_RANGE = world(70);
const PLAYER_SPRITE_SIZE = 48;
// The layered character art is centered at (27, 24), with its ground anchor at y = 36.
const PLAYER_SPRITE_ANCHOR_Y = 36;
const PLAYER_SPRITE_PIVOT_X = 27;
const PLAYER_SPRITE_PIVOT_Y = 24;
// Fast enough to undo two players walking directly into each other, but capped so
// overlaps caused by spawning or frame drops are corrected over a few frames.
const PLAYER_SEPARATION_SPEED = world(520);
const PAPER_SIZE = 16;
const BADGE_SIZE = 28;
const ARROW_SIZE = 32;
const PIXEL_GLYPHS = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
  ":": ["000", "010", "000", "010", "000"],
  "-": ["000", "000", "111", "000", "000"],
};

const FLOW_LABELS = {
  computer: "Computador",
  printer: "Impressora",
  signature: "Assinatura",
  stamp: "Carimbo",
  scanner: "Escaneador",
  deposit: "Deposito",
};

const FLOW_TIMES = {
  printer: 5,
  signature: 6,
  stamp: 5.5,
  scanner: 5,
  computer: 4,
};

const emails = [
  {
    id: "sap-tigre",
    legitimate: true,
    title: "Homologação da integração Tigre",
    sender: "infraestrutura@leroymerlin.com.br",
    subject: "Integração Tigre | teste no ambiente de homologação",
    body: "Olá, equipe. A integração com a Tigre está pronta para o teste. Peço que encaminhem a abertura da porta 443 apenas no servidor de homologação, conforme o chamado LM-7823. Se a aprovação não constar no chamado, deixem a mudança pendente. Produção fica fora deste pedido.\n\nCarlos Eduardo | Infra e Redes",
    flow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Apenas no servidor de homologação\" delimita o alcance da mudança.",
      "\"Se a aprovação não constar no chamado, deixem a mudança pendente\" mantém o processo; citar um chamado não prova aprovação."
    ]
  },
  {
    id: "gerente-campinas",
    legitimate: true,
    title: "Cadastro da gerente de Campinas",
    sender: "rh.corporativo@leroymerlin.com.br",
    subject: "Admissão de Renata Souza | perfil de acesso da loja",
    body: "Bom dia. Renata Souza inicia na loja de Campinas na próxima semana. Solicito abrir o cadastro do perfil GL-03 pelo processo de admissão RH-1147. O formulário está no sistema de RH; se faltar alguma aprovação, devolvam o pedido por lá. Não enviem a senha inicial em resposta a este e-mail.\n\nFernanda Alves | RH",
    flow: [
      "printer",
      "signature",
      "deposit"
    ],
    signs: [
      "\"Pelo processo de admissão\" e \"devolvam o pedido por lá\" preservam o registro interno.",
      "\"Não enviem a senha inicial\" evita compartilhar credenciais por e-mail."
    ]
  },
  {
    id: "reset-marcos",
    legitimate: true,
    title: "Recuperação de acesso de Marcos Vinícius",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Atendimento GOV-RESET-02 | acesso de Marcos Vinícius",
    body: "Pessoal, Marcos Vinícius, da loja BH Shopping, perdeu acesso após trocar de telefone. Registrei a identificação presencial no atendimento GOV-RESET-02. Podem iniciar o reset pelo fluxo padrão? A senha provisória deve ser entregue pelo canal do atendimento, não nesta conversa.\n\nJuliana Freitas | Suporte Interno",
    flow: [
      "computer",
      "printer",
      "stamp",
      "deposit"
    ],
    signs: [
      "\"Iniciar o reset pelo fluxo padrão\" não pede exceção ao processo.",
      "\"Não nesta conversa\" evita expor a senha provisória por e-mail."
    ]
  },
  {
    id: "autocad",
    legitimate: true,
    title: "AutoCAD para a equipe de Obras",
    sender: "ti.corporativo@leroymerlin.com.br",
    subject: "Instalação do AutoCAD nos notebooks de Obras",
    body: "A equipe de Obras vai receber 12 notebooks novos. Podem conferir a homologação do AutoCAD no catálogo de TI e, se estiver válida, incluir a aplicação no pacote padrão dos ativos LM-OBR-001 a LM-OBR-012? Se houver divergência, não distribuam o instalador até corrigirmos o cadastro.\n\nRenato Carvalho | TI Corporativa",
    flow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Conferir a homologação do AutoCAD no catálogo de TI\" pede checagem pelo canal interno.",
      "\"Não distribuam o instalador\" se houver divergência evita contornar o controle."
    ]
  },
  {
    id: "vpn-pedro",
    legitimate: true,
    title: "VPN para equipamento corporativo",
    sender: "rh.corporativo@leroymerlin.com.br",
    subject: "Trabalho remoto de Pedro Lemos | notebook LM-NB-4471",
    body: "Olá. Pedro Henrique Lemos iniciará trabalho remoto na próxima semana. Solicito abrir a etapa de VPN para o notebook corporativo LM-NB-4471. O cadastro do equipamento e o certificado precisam ser conferidos no sistema antes da liberação. Caso falte algum deles, deixem o acesso pendente.\n\nFernanda Alves | RH",
    flow: [
      "printer",
      "signature",
      "deposit"
    ],
    signs: [
      "\"Notebook corporativo\" delimita qual equipamento receberá acesso.",
      "\"Conferidos no sistema antes da liberação\" condiciona o acesso à verificação."
    ]
  },
  {
    id: "rdp-typo",
    legitimate: false,
    title: "Acesso remoto sem chamado",
    sender: "infraestrutura@1eroymerlin.com.br",
    subject: "Acesso remoto para suporte ao servidor de vendas",
    body: "Bom dia. A equipe de loja precisa de suporte no servidor de vendas. Liberem hoje o acesso remoto pela porta 3389 para que o técnico entre sem esperar o chamado; depois regularizamos a mudança. Assim conseguimos atender antes da abertura da loja.\n\nEquipe de Infraestrutura",
    fakeFlow: [
      "printer",
      "stamp",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Sem esperar o chamado; depois regularizamos\" pede acesso antes da autorização.",
      "O remetente usa o número 1 em \"1eroymerlin\", imitando o nome da empresa."
    ]
  },
  {
    id: "admin-gmail",
    legitimate: false,
    title: "Conta administrativa fora do processo",
    sender: "diretoria.ti@leroymerlin.com.br.gmail.com",
    subject: "Conta temporária para revisão reservada",
    body: "Equipe, preciso da conta svc_auditoria_ext com perfil de administrador para uma revisão reservada. Enviem o usuário e a senha provisória em resposta a este e-mail; a diretoria fará o registro do chamado amanhã. Peço discrição porque o relatório ainda não circulou.\n\nDiretoria de TI",
    fakeFlow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Enviem o usuário e a senha provisória\" pede credenciais por e-mail.",
      "O endereço termina em \"gmail.com\", apesar de exibir o nome da empresa antes."
    ]
  },
  {
    id: "microsoft-falso",
    legitimate: false,
    title: "Renovação falsa do Microsoft 365",
    sender: "renovacao@microsoft-leroymerlin.support",
    subject: "Confirmação pendente da renovação Microsoft 365",
    body: "Olá. A renovação do Microsoft 365 da unidade aguarda confirmação. Antes que as licenças sejam suspensas, abram https://ms365-renewal.leroymerlin.support/validate e entrem com uma conta administrativa para validar o contrato. Leva dois minutos; não é necessário abrir um chamado interno.\n\nEquipe de Licenças",
    fakeFlow: [
      "computer",
      "printer",
      "deposit"
    ],
    signs: [
      "\"Entrem com uma conta administrativa\" pede login sensível em um link recebido por e-mail.",
      "\"Não é necessário abrir um chamado interno\" tenta afastar a conferência normal."
    ]
  },
  {
    id: "rh-falso",
    legitimate: false,
    title: "Revalidação falsa do RH",
    sender: "rh-notificacoes@leroymerlin-support.com.br",
    subject: "Revalidação do acesso aos sistemas de RH",
    body: "Estamos atualizando os cadastros de acesso. Para evitar suspensão, abram https://portal-rh.leroymerlin-support.com.br/revalidacao e digitem usuário, senha e o código do autenticador. O formulário fecha hoje; depois da confirmação não será preciso contatar o RH.\n\nNotificações de RH",
    fakeFlow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Digitem usuário, senha e o código do autenticador\" tenta capturar credenciais e o segundo fator.",
      "O link leva a \"leroymerlin-support.com.br\", domínio diferente do nome corporativo."
    ]
  },
  {
    id: "vpn-diretor",
    legitimate: false,
    title: "VPN para notebook particular",
    sender: "f.rodrigues@leroymerlin.com.br",
    subject: "Acesso VPN durante a viagem",
    body: "Pessoal, estou viajando e preciso entrar na VPN pelo meu notebook particular hoje. Ele ainda não tem o certificado da empresa, mas liberem meu usuário mesmo assim; aviso ao suporte para registrar o pedido quando voltar. Não consigo atender ligação agora.\n\nFelipe Rodrigues | Diretor Regional",
    fakeFlow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Notebook particular\" e \"não tem o certificado\" descrevem equipamento sem a checagem exigida.",
      "\"Liberem meu usuário mesmo assim\" pede contornar a validação antes do registro."
    ]
  },
  {
    id: "tigre-ip",
    legitimate: false,
    title: "Mudança na integração fora do chamado",
    sender: "suporte@tigre.com.br",
    subject: "Ajuste rápido no endpoint de produção",
    body: "Pessoal, a integração NF-e precisa de um ajuste antes do fechamento. Troquem o endpoint de produção para 185.220.101.47 e liberem a porta 8443 hoje. O chamado atual cobre só homologação, então registrem a exceção depois da troca para não atrasar o lote.\n\nSuporte Técnico | Tigre",
    fakeFlow: [
      "printer",
      "stamp",
      "scanner",
      "computer"
    ],
    signs: [
      "\"O chamado atual cobre só homologação\" admite que produção está fora da autorização.",
      "\"Registrem a exceção depois da troca\" pede executar antes da aprovação; o IP sozinho não prova fraude."
    ]
  },
  {
    id: "lista-usuarios",
    legitimate: false,
    title: "Exportação de usuários por e-mail",
    sender: "ti.corporativo@leroymerlin.com.br",
    subject: "Revisão trimestral de contas inativas",
    body: "Bom dia. Para a revisão trimestral, preciso da lista completa de usuários ativos, perfis e última data de login. Exportem a planilha e respondam com o arquivo neste e-mail; assim evitamos pedir acesso ao painel de auditoria. Pode ir sem senha, pois a conversa é interna.\n\nRenato Carvalho | TI Corporativa",
    fakeFlow: [
      "computer",
      "printer",
      "deposit"
    ],
    signs: [
      "\"Respondam com o arquivo neste e-mail\" expõe lista de acessos fora do painel de auditoria.",
      "\"Assim evitamos pedir acesso ao painel de auditoria\" revela a tentativa de contornar o canal controlado."
    ]
  },
  {
    id: "desativacao-conta",
    legitimate: true,
    title: "Desativação programada de acesso",
    sender: "rh.corporativo@leroymerlin.com.br",
    subject: "Desligamento programado | registro RH-2216",
    body: "Boa tarde. O contrato de Ana Ribeiro termina no fim do expediente. Peço que programem a desativação da conta para o horário registrado no processo RH-2216. A lista de sistemas está no cadastro interno; não copiem os dados pessoais para esta conversa. Se o horário mudar, aguardem a atualização do RH.\n\nFernanda Alves | RH",
    flow: [
      "computer",
      "printer",
      "stamp",
      "deposit"
    ],
    signs: [
      "\"Para o horário registrado no processo\" evita desativação fora do fluxo.",
      "\"Não copiem os dados pessoais\" mantém as informações no sistema interno."
    ]
  },
  {
    id: "troca-certificado",
    legitimate: true,
    title: "Renovação de certificado em teste",
    sender: "seguranca.ti@leroymerlin.com.br",
    subject: "Certificado do serviço de inventário | preparação",
    body: "Olá, o certificado do serviço de inventário vence na próxima janela de manutenção. Podem preparar a renovação no ambiente de testes e registrar o resultado no change SEC-318? A chave privada continua no cofre de TI; não a compartilhem por e-mail. A implantação em produção deve esperar a aprovação do change.\n\nMarina Costa | Segurança de TI",
    flow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Ambiente de testes\" limita esta etapa da mudança.",
      "\"A chave privada continua no cofre\" e \"produção deve esperar\" evitam atalhos arriscados."
    ]
  },
  {
    id: "cadastro-inventario",
    legitimate: true,
    title: "Correção no inventário de notebook",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Notebook LM-NB-2048 voltou do reparo",
    body: "O notebook LM-NB-2048 voltou do reparo, mas ainda aparece como \"em manutenção\" no inventário. Podem atualizar o status para \"disponível\" pelo processo de ativos e registrar a alteração no histórico? Não precisamos de acesso remoto ao equipamento nem de dados do usuário anterior.\n\nCamila Rocha | Suporte Interno",
    flow: [
      "computer",
      "printer",
      "deposit"
    ],
    signs: [
      "\"Pelo processo de ativos\" e \"registrar a alteração no histórico\" pedem alteração rastreável.",
      "\"Não precisamos de acesso remoto ao equipamento nem de dados\" mantém o pedido limitado ao cadastro."
    ]
  },
  {
    id: "backup-homologacao",
    legitimate: true,
    title: "Teste de restauração em homologação",
    sender: "infraestrutura@leroymerlin.com.br",
    subject: "Backup semanal | teste de restauração",
    body: "Equipe, vamos testar a restauração do backup semanal no servidor de homologação. Solicito preparar o registro e executar o teste apenas nesse ambiente, sem substituir dados de produção. Publiquem o resultado no change INF-204; se o ambiente não estiver isolado, adiem o teste.\n\nCarlos Eduardo | Infra e Redes",
    flow: [
      "printer",
      "signature",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Apenas nesse ambiente\" e \"sem substituir dados de produção\" delimitam o teste.",
      "\"Se o ambiente não estiver isolado, adiem\" prioriza a segurança sobre a pressa."
    ]
  },
  {
    id: "codigo-mfa",
    legitimate: false,
    title: "Pedido de código do autenticador",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Confirmação do bloqueio de autenticação",
    body: "Estamos conferindo um bloqueio de autenticação do seu setor. Quando o código de verificação chegar ao celular, respondam a este e-mail com os seis dígitos para concluirmos o teste. Não é necessário abrir chamado; o alerta já veio do sistema.\n\nSuporte Interno",
    fakeFlow: [
      "computer",
      "printer",
      "deposit"
    ],
    signs: [
      "\"Respondam a este e-mail com os seis dígitos\" pede o código de uso único, que não deve ser compartilhado.",
      "O endereço familiar não torna seguro o pedido de enviar o segundo fator por e-mail."
    ]
  },
  {
    id: "acesso-remoto-scanner",
    legitimate: false,
    title: "Manutenção remota sem acompanhamento",
    sender: "monitoramento@leroymerlin.com.br",
    subject: "Lentidão nos scanners da área de entrada",
    body: "Olá, os scanners da área de entrada estão lentos. Desativem temporariamente a proteção do computador e liberem acesso remoto sem acompanhamento para eu aplicar o ajuste. Depois aviso o que foi alterado; não abram incidente agora para evitar duplicidade.\n\nMonitoramento de TI",
    fakeFlow: [
      "printer",
      "stamp",
      "scanner",
      "computer"
    ],
    signs: [
      "\"Desativem temporariamente a proteção\" enfraquece o equipamento para a suposta manutenção.",
      "\"Acesso remoto sem acompanhamento\" e \"não abram incidente\" eliminam supervisão e registro."
    ]
  },
  {
    id: "vpn-renovacao-ana",
    legitimate: true,
    title: "Renovação de VPN em notebook corporativo",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Certificado renovado | notebook LM-NB-3290",
    body: "O notebook corporativo LM-NB-3290 de Ana Nunes passou por troca de certificado. Podem atualizar o acesso VPN usando o registro aberto no sistema de ativos? Confirmem o novo certificado antes de reativar a conexão. Se a conferência falhar, mantenham o acesso suspenso e registrem a pendência.\n\nCamila Rocha | Suporte Interno",
    flow: ["printer", "signature", "deposit"],
    signs: [
      "\"Confirmem o novo certificado antes de reativar a conexão\" exige a checagem do equipamento.",
      "\"Mantenham o acesso suspenso\" evita liberar VPN se a conferência falhar."
    ]
  },
  {
    id: "perfil-temporario",
    legitimate: true,
    title: "Perfil temporário para inventário",
    sender: "rh.corporativo@leroymerlin.com.br",
    subject: "Acesso temporário de Lucas Moraes | inventário",
    body: "Lucas Moraes vai apoiar o inventário por duas semanas. Solicito criar um perfil temporário apenas para leitura, com encerramento na data do contrato registrada no RH. Se a aprovação não estiver no processo, deixem a conta pendente. A senha inicial deve seguir o canal de entrega habitual.\n\nFernanda Alves | RH",
    flow: ["computer", "printer", "stamp", "deposit"],
    signs: [
      "\"Apenas para leitura\" limita a permissão ao trabalho descrito.",
      "\"Deixem a conta pendente\" condiciona a criação à aprovação no processo."
    ]
  },
  {
    id: "driver-scanner-catalogo",
    legitimate: true,
    title: "Atualização controlada dos scanners",
    sender: "ti.corporativo@leroymerlin.com.br",
    subject: "Driver dos scanners | teste antes da distribuição",
    body: "As estações de digitalização do setor fiscal precisam da nova versão do driver. Podem conferir o pacote no catálogo interno antes de distribuir? O teste deve começar em uma máquina de homologação; se houver falha, mantenham a versão atual. Não usem instaladores enviados por e-mail.\n\nRenato Carvalho | TI Corporativa",
    flow: ["printer", "signature", "scanner", "computer"],
    signs: [
      "\"Catálogo interno\" indica onde conferir o pacote antes da instalação.",
      "\"Não usem instaladores enviados por e-mail\" evita executar arquivos de origem incerta."
    ]
  },
  {
    id: "caixa-compartilhada-leitura",
    legitimate: true,
    title: "Leitura temporária de caixa compartilhada",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Cobertura de férias | caixa de atendimento da loja",
    body: "Beatriz Lima vai cobrir as férias no atendimento da loja. Solicito adicionar somente permissão de leitura à caixa compartilhada pelo processo ACC-541, com remoção no fim do período. Se o gestor não constar como aprovador no processo, não ativem o acesso.\n\nJuliana Freitas | Suporte Interno",
    flow: ["computer", "printer", "deposit"],
    signs: [
      "\"Somente permissão de leitura\" limita o acesso à necessidade descrita.",
      "\"Não ativem o acesso\" se faltar aprovação mantém a etapa de controle."
    ]
  },
  {
    id: "driver-drive-pessoal",
    legitimate: false,
    title: "Driver enviado por armazenamento pessoal",
    sender: "suporte.interno@leroymerlin.com.br",
    subject: "Correção rápida para os scanners do fiscal",
    body: "O driver do scanner do setor fiscal está falhando. Usem o instalador que enviei pelo meu drive pessoal, pois o catálogo interno ainda não foi atualizado. Se o Windows bloquear, desliguem a verificação de assinatura por alguns minutos e executem o arquivo mesmo assim. Depois registro a alteração.\n\nSuporte Interno",
    fakeFlow: ["printer", "stamp", "scanner", "computer"],
    signs: [
      "\"Meu drive pessoal\" substitui o catálogo interno por uma origem não controlada.",
      "\"Desliguem a verificação de assinatura\" pede reduzir a proteção para executar o arquivo."
    ]
  },
  {
    id: "backup-nuvem-pessoal",
    legitimate: false,
    title: "Backup enviado para conta pessoal",
    sender: "infraestrutura@leroymerlin.com.br",
    subject: "Cópia do backup para auditoria semanal",
    body: "Para a auditoria semanal, exportem uma cópia do backup do cadastro de clientes e enviem para meu armazenamento pessoal. O portal interno está lento; apago a cópia assim que eu terminar a conferência. Não registrem a movimentação agora para não atrasar a janela.\n\nEquipe de Infraestrutura",
    fakeFlow: ["computer", "printer", "deposit"],
    signs: [
      "\"Meu armazenamento pessoal\" tiraria o backup de clientes do ambiente controlado.",
      "\"Não registrem a movimentação agora\" pede transferir dados sem rastreabilidade."
    ]
  },
  {
    id: "acesso-fornecedor-admin",
    legitimate: false,
    title: "Acesso administrativo para fornecedor",
    sender: "suporte@tigre.com.br",
    subject: "Consulta de logs da integração em produção",
    body: "Nosso técnico precisa conferir os logs da integração em produção. Criem um login temporário com perfil de administrador e me mandem a senha por e-mail; ele usará a conta só até o fim do dia. Podemos registrar a aprovação depois do atendimento para não perder a janela.\n\nSuporte Técnico | Tigre",
    fakeFlow: ["printer", "signature", "scanner", "computer"],
    signs: [
      "\"Me mandem a senha por e-mail\" pede compartilhar uma credencial privilegiada.",
      "\"Registrar a aprovação depois do atendimento\" tenta inverter a ordem da autorização."
    ]
  },
  {
    id: "encaminhamento-caixa-compras",
    legitimate: false,
    title: "Encaminhamento externo da caixa de compras",
    sender: "gestao.ti@leroymerlin.com.br",
    subject: "Migração temporária da caixa de compras",
    body: "Durante a migração, configurem o encaminhamento automático de todas as mensagens da caixa de compras para arquivo-compras@consultoria-mail.net por uma semana. Assim a equipe externa acompanha os chamados sem pedir acesso formal. Não avisem os usuários ainda para evitar dúvidas antes da reunião.\n\nGestão de TI",
    fakeFlow: ["computer", "printer", "deposit"],
    signs: [
      "\"Encaminhamento automático de todas as mensagens\" enviaria também dados que não fazem parte da migração.",
      "\"Sem pedir acesso formal\" deixa uma equipe externa fora do controle de permissões."
    ]
  }
];

const COUNTER_COLOR = "#748079";

const stationDefs = [
  { id: "email", label: "E-mail", x: TILE * 5, y: TILE * 3, w: TILE, h: TILE, color: "#2368a2" },
  { id: "printer", label: "Impressora", x: TILE * 6, y: 0, w: TILE, h: TILE, color: "#16706c" },
  { id: "signature", label: "Assinatura", x: WIDTH - TILE, y: TILE * 2, w: TILE, h: TILE, color: "#d66b22" },
  { id: "stamp", label: "Carimbo", x: TILE * 2, y: HEIGHT - TILE, w: TILE, h: TILE, color: "#805a28" },
  { id: "deposit", label: "Deposito", x: TILE * 8, y: HEIGHT - TILE, w: TILE, h: TILE, color: "#66714c" },
  { id: "scanner", label: "Escaneador", x: TILE * 10, y: HEIGHT - TILE, w: TILE, h: TILE, color: "#6b4fa3" },
  { id: "computer", label: "Computador", x: 0, y: TILE * 2, w: TILE, h: TILE, color: "#1f7a45" },
];

const counterDefs = buildCounterLayout();

const keys = new Set();
let lastFrame = performance.now();
let game;

const PLAYER1_WALK_LEFT_SEQUENCE = [0, 2, 4, 2, 0, 1, 3, 5, 3, 1];
const PLAYER2_WALK_LEFT_SEQUENCE = [1, 3, 5, 3, 1, 0, 2, 4, 2, 0];
const PLAYER1_HOLD_PAPER_FOOT_SEQUENCE = ["rightStart", "rightMid", "rightFinal", "rightMid", "rightStart", "leftStart", "leftMid", "leftFinal", "leftMid", "leftStart"];
const EMAIL_NOTIFICATION_SEQUENCE = [0, 1, 2, 1];
const SIGNATURE_WRITE_SEQUENCE = [2, 3, 4, 3];
const SCANNER_SCAN_SEQUENCE = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];
const NEWTON_CRADLE_SEQUENCE = [0, 0, 1, 2, 3, 4, 4, 5, 6, 7];
const HOT_COFFEE_SEQUENCE = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];
const MINI_AQUARIUM_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const PLAYER2_HOLD_PAPER_FOOT_SEQUENCE = [
  "rightMid",
  "rightFinal",
  "rightMid",
  "leftMid",
  "leftFinal",
  "leftMid",
];
const EXCLAMATION_SEQUENCE = [0, 1, 2, 3, 4, 3, 2, 1, 0];
const sprites = {
  counters: {
    sideVertical: loadSprite("assets/sprites/counter-side-vertical.png"),
    sideHorizontal: loadSprite("assets/sprites/counter-side-horizontal.png"),
    cornerBottomRight: loadSprite("assets/sprites/counter-corner-bottom-right.png"),
    cornerBottomLeft: loadSprite("assets/sprites/counter-corner-bottom-left.png"),
    cornerTopRight: loadSprite("assets/sprites/counter-corner-top-right.png"),
    cornerTopLeft: loadSprite("assets/sprites/counter-corner-top-left.png"),
    centerRight: loadSprite("assets/sprites/counter-center-right.png"),
    centerLeft: loadSprite("assets/sprites/counter-center-left.png"),
  },
  countersLight: {
    sideVertical: loadSprite("assets/sprites/counter-side-vertical-light.png"),
    sideHorizontal: loadSprite("assets/sprites/counter-side-horizontal-light.png"),
    cornerBottomRight: loadSprite("assets/sprites/counter-corner-bottom-right-light.png"),
    cornerBottomLeft: loadSprite("assets/sprites/counter-corner-bottom-left-light.png"),
    cornerTopRight: loadSprite("assets/sprites/counter-corner-top-right-light.png"),
    cornerTopLeft: loadSprite("assets/sprites/counter-corner-top-left-light.png"),
    centerRight: loadSprite("assets/sprites/counter-center-right-light.png"),
    centerLeft: loadSprite("assets/sprites/counter-center-left-light.png"),
  },
  counterDecor: {
    newtonCradle: [
      loadSprite("assets/sprites/counter-newton-cradle-0.png"),
      loadSprite("assets/sprites/counter-newton-cradle-1.png"),
      loadSprite("assets/sprites/counter-newton-cradle-2.png"),
      loadSprite("assets/sprites/counter-newton-cradle-3.png"),
      loadSprite("assets/sprites/counter-newton-cradle-4.png"),
      loadSprite("assets/sprites/counter-newton-cradle-5.png"),
      loadSprite("assets/sprites/counter-newton-cradle-6.png"),
      loadSprite("assets/sprites/counter-newton-cradle-7.png"),
    ],
    hotCoffee: [
      loadSprite("assets/sprites/counter-hot-coffee-0.png"),
      loadSprite("assets/sprites/counter-hot-coffee-1.png"),
      loadSprite("assets/sprites/counter-hot-coffee-2.png"),
      loadSprite("assets/sprites/counter-hot-coffee-3.png"),
      loadSprite("assets/sprites/counter-hot-coffee-4.png"),
      loadSprite("assets/sprites/counter-hot-coffee-5.png"),
    ],
    miniAquarium: [
      loadSprite("assets/sprites/counter-mini-aquarium-0.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-1.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-2.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-3.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-4.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-5.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-6.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-7.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-8.png"),
      loadSprite("assets/sprites/counter-mini-aquarium-9.png"),
    ],
  },
  floor: {
    normal: loadSprite("assets/sprites/floor-normal.png"),
    common: loadSprite("assets/sprites/floor-common.png"),
    rare: [
      loadSprite("assets/sprites/floor-rare-0.png"),
      loadSprite("assets/sprites/floor-rare-1.png"),
    ],
    unique: [
      loadSprite("assets/sprites/floor-unique-0.png"),
      loadSprite("assets/sprites/floor-unique-1.png"),
    ],
  },
  floorShadow: loadSprite("assets/sprites/floor-shadow.png"),
  floorShadowCorner: loadSprite("assets/sprites/floor-shadow-corner.png"),
  computer: {
    on: loadSprite("assets/sprites/computer-on.png"),
    off: loadSprite("assets/sprites/computer-off.png"),
    frames: [
      loadSprite("assets/sprites/computer-process-0.png"),
      loadSprite("assets/sprites/computer-process-1.png"),
      loadSprite("assets/sprites/computer-process-2.png"),
      loadSprite("assets/sprites/computer-process-3.png"),
    ],
  },
  printer: {
    idle: loadSprite("assets/sprites/printer-idle.png"),
    frames: [
      loadSprite("assets/sprites/printer-print-0.png"),
      loadSprite("assets/sprites/printer-print-1.png"),
      loadSprite("assets/sprites/printer-print-2.png"),
      loadSprite("assets/sprites/printer-print-3.png"),
      loadSprite("assets/sprites/printer-print-4.png"),
    ],
  },
  stationEquipment: {
    stamp: {
      idle: loadSprite("assets/sprites/stamp-station.png"),
      frames: [
        loadSprite("assets/sprites/stamp-press-0.png"),
        loadSprite("assets/sprites/stamp-press-1.png"),
        loadSprite("assets/sprites/stamp-press-2.png"),
        loadSprite("assets/sprites/stamp-press-3.png"),
        loadSprite("assets/sprites/stamp-press-4.png"),
      ],
    },
    deposit: loadSprite("assets/sprites/deposit-station.png"),
    email: {
      idle: loadSprite("assets/sprites/email-terminal.png"),
      frames: [
        loadSprite("assets/sprites/email-notification-0.png"),
        loadSprite("assets/sprites/email-notification-1.png"),
        loadSprite("assets/sprites/email-notification-2.png"),
      ],
    },
    signature: {
      idle: loadSprite("assets/sprites/signature-station.png"),
      frames: [
        loadSprite("assets/sprites/signature-write-0.png"),
        loadSprite("assets/sprites/signature-write-1.png"),
        loadSprite("assets/sprites/signature-write-2.png"),
        loadSprite("assets/sprites/signature-write-3.png"),
        loadSprite("assets/sprites/signature-write-4.png"),
      ],
    },
    scanner: {
      idle: loadSprite("assets/sprites/scanner-station.png"),
      frames: [
        loadSprite("assets/sprites/scanner-scan-0.png"),
        loadSprite("assets/sprites/scanner-scan-1.png"),
        loadSprite("assets/sprites/scanner-scan-2.png"),
        loadSprite("assets/sprites/scanner-scan-3.png"),
        loadSprite("assets/sprites/scanner-scan-4.png"),
        loadSprite("assets/sprites/scanner-scan-5.png"),
      ],
    },
  },
  exclamation: [
    loadSprite("assets/sprites/exclamation-0.png"),
    loadSprite("assets/sprites/exclamation-1.png"),
    loadSprite("assets/sprites/exclamation-2.png"),
    loadSprite("assets/sprites/exclamation-3.png"),
    loadSprite("assets/sprites/exclamation-4.png"),
  ],
  arrow: [
    loadSprite("assets/sprites/arrow-0.png"),
    loadSprite("assets/sprites/arrow-1.png"),
    loadSprite("assets/sprites/arrow-2.png"),
    loadSprite("assets/sprites/arrow-3.png"),
    loadSprite("assets/sprites/arrow-4.png"),
    loadSprite("assets/sprites/arrow-5.png"),
  ],
  paper: {
    normal: loadSprite("assets/sprites/paper.png"),
    signed: loadSprite("assets/sprites/paper-signed.png"),
    stamped: loadSprite("assets/sprites/paper-stamped.png"),
  },
  player1IdleLeftLayers: {
    body: loadSprite("assets/sprites/player1-idle-left-body.png"),
    foot: loadSprite("assets/sprites/player1-idle-left-foot.png"),
  },
  player1HoldPaper: {
    bodies: {
      normal: loadSprite("assets/sprites/player1-hold-paper-body.png"),
      signed: loadSprite("assets/sprites/player1-hold-paper-body-signed.png"),
      stamped: loadSprite("assets/sprites/player1-hold-paper-body-stamped.png"),
    },
    feet: {
      idle: loadSprite("assets/sprites/player1-hold-paper-foot-idle.png"),
      rightStart: loadSprite("assets/sprites/player1-hold-paper-foot-right-start.png"),
      rightMid: loadSprite("assets/sprites/player1-hold-paper-foot-right-mid.png"),
      rightFinal: loadSprite("assets/sprites/player1-hold-paper-foot-right-final.png"),
      leftStart: loadSprite("assets/sprites/player1-hold-paper-foot-left-start.png"),
      leftMid: loadSprite("assets/sprites/player1-hold-paper-foot-left-mid.png"),
      leftFinal: loadSprite("assets/sprites/player1-hold-paper-foot-left-final.png"),
    },
  },
  player1WalkLeftLayers: PLAYER1_WALK_LEFT_SEQUENCE.map((frame) => ({
    body: loadSprite(`assets/sprites/player1-walk-left-body-${frame}.png`),
    foot: loadSprite(`assets/sprites/player1-walk-left-foot-${frame}.png`),
  })),
  player2IdleLeftLayers: {
    body: loadSprite("assets/sprites/player2-idle-left-body.png"),
    foot: loadSprite("assets/sprites/player2-idle-left-foot.png"),
  },
  player2HoldPaper: {
    bodies: {
      normal: loadSprite("assets/sprites/player2-hold-paper-body.png"),
      signed: loadSprite("assets/sprites/player2-hold-paper-body-signed.png"),
      stamped: loadSprite("assets/sprites/player2-hold-paper-body-stamped.png"),
    },
    feet: {
      idle: loadSprite("assets/sprites/player2-hold-paper-foot-idle.png"),
      rightStart: loadSprite("assets/sprites/player2-hold-paper-foot-right-start.png"),
      rightMid: loadSprite("assets/sprites/player2-hold-paper-foot-right-mid.png"),
      rightFinal: loadSprite("assets/sprites/player2-hold-paper-foot-right-final.png"),
      leftStart: loadSprite("assets/sprites/player2-hold-paper-foot-left-start.png"),
      leftMid: loadSprite("assets/sprites/player2-hold-paper-foot-left-mid.png"),
      leftFinal: loadSprite("assets/sprites/player2-hold-paper-foot-left-final.png"),
    },
  },
  player2WalkLeftLayers: PLAYER2_WALK_LEFT_SEQUENCE.map((frame) => ({
    body: loadSprite(`assets/sprites/player2-walk-left-body-${frame}.png`),
    foot: loadSprite(`assets/sprites/player2-walk-left-foot-${frame}.png`),
  })),
};

function loadSprite(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function setCanvasSmoothing(enabled) {
  ctx.imageSmoothingEnabled = enabled;
  ctx.mozImageSmoothingEnabled = enabled;
  ctx.webkitImageSmoothingEnabled = enabled;
  ctx.msImageSmoothingEnabled = enabled;
}

function fitCanvasToViewport() {
  const viewportWidth = ui.gameScreen.clientWidth || window.innerWidth;
  const viewportHeight = ui.gameScreen.clientHeight || window.innerHeight;
  const dpr = window.devicePixelRatio || 1;
  const physicalWidth = Math.floor(viewportWidth * dpr);
  const physicalHeight = Math.floor(viewportHeight * dpr);
  const zoom = Math.max(
    1,
    Math.floor(Math.min(physicalWidth / WIDTH, physicalHeight / HEIGHT)),
  );
  const displayWidth = WIDTH * zoom;
  const displayHeight = HEIGHT * zoom;
  const left = Math.floor((physicalWidth - displayWidth) / 2);
  const top = Math.floor((physicalHeight - displayHeight) / 2);

  canvas.style.width = `${displayWidth / dpr}px`;
  canvas.style.height = `${displayHeight / dpr}px`;
  canvas.style.left = `${left / dpr}px`;
  canvas.style.top = `${top / dpr}px`;
}

function buildCounterLayout() {
  const byPosition = new Map();
  const add = (x, y, group = "edge") => {
    const key = `${x},${y}`;
    if (!byPosition.has(key)) {
      const station = stationDefs.find((item) => item.x === x && item.y === y);
      byPosition.set(key, {
        id: `counter-${x}-${y}`,
        label: station ? station.label : "Bancada",
        stationId: station?.id ?? null,
        group,
        x,
        y,
        w: TILE,
        h: TILE,
        color: station?.color ?? COUNTER_COLOR,
      });
    }
  };

  for (let x = 0; x <= WIDTH - TILE; x += TILE) {
    add(x, 0, "top");
    add(x, HEIGHT - TILE, "bottom");
  }
  for (let y = TILE; y <= HEIGHT - TILE * 2; y += TILE) {
    add(0, y, "left");
    add(WIDTH - TILE, y, "right");
  }
  for (let x = TILE * 3; x <= TILE * 10; x += TILE) {
    add(x, TILE * 3, "middle");
  }

  return [...byPosition.values()];
}

function createStations() {
  return Object.fromEntries(
    stationDefs.map((station) => [
      station.id,
      {
        ...station,
        queue: [],
        output: null,
        processing: null,
      },
    ]),
  );
}

function createCounters() {
  const counters = counterDefs.map((counter) => ({
    ...counter,
    surfaceItem: null,
    decor: null,
    decorPhase: 0,
  }));
  // Keep the Newton cradle on the top perimeter instead of the center island.
  const cradleCounter = counters.find((counter) => counter.x === TILE * 3 && counter.y === 0);
  if (cradleCounter) {
    cradleCounter.decor = "newtonCradle";
    cradleCounter.decorPhase = Math.floor(Math.random() * NEWTON_CRADLE_SEQUENCE.length);
  }
  const decorCandidates = shuffle(
    counters.filter((counter) => counter.group === "middle" && !counter.stationId),
  );
  const coffeeCounter = decorCandidates[0];
  if (coffeeCounter) {
    coffeeCounter.decor = "hotCoffee";
    coffeeCounter.decorPhase = Math.floor(Math.random() * HOT_COFFEE_SEQUENCE.length);
  }
  const aquariumCounter = decorCandidates[1];
  if (aquariumCounter) {
    aquariumCounter.decor = "miniAquarium";
    aquariumCounter.decorPhase = Math.floor(Math.random() * MINI_AQUARIUM_SEQUENCE.length);
  }

  return Object.fromEntries(counters.map((counter) => [counter.id, counter]));
}

function freshGame() {
  const deck = shuffle([...emails]);
  return {
    mode: "playing",
    timeLeft: SESSION_LENGTH,
    score: 0,
    nextEmailIn: 0.7,
    deck,
    queue: [],
    appeared: [],
    currentEmail: null,
    readTime: READ_LIMIT,
    stations: createStations(),
    counters: createCounters(),
    floorTiles: createFloorTiles(),
    floorShadows: createFloorShadows(),
    tasks: {},
    floorItems: [],
    players: [
      {
        id: 1,
        x: TILE * 4,
        y: TILE * 2,
        r: world(22),
        hitbox: { w: world(44), h: world(40), offsetY: world(-18) },
        speed: PLAYER_SPEED,
        color: "#2368a2",
        direction: "down",
        visualDirection: "down",
        moving: false,
        animTime: 0,
        carrying: null,
      },
      {
        id: 2,
        x: TILE * 4,
        y: TILE * 5 + TILE / 2,
        r: world(22),
        hitbox: { w: world(54), h: world(42), offsetY: world(-10) },
        speed: PLAYER_SPEED,
        color: "#d66b22",
        direction: "down",
        visualDirection: "down",
        moving: false,
        animTime: 0,
        carrying: null,
      },
    ],
    stats: {
      legitCompleted: 0,
      phishingReported: 0,
      phishingProcessed: 0,
      legitDiscarded: 0,
    },
  };
}

function shuffle(values) {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

function createFloorTiles() {
  const tiles = [];
  for (let x = 0; x < WIDTH; x += TILE) {
    for (let y = 0; y < HEIGHT; y += TILE) {
      tiles.push({
        x,
        y,
        type: "normal",
        variant: 0,
        rotation: randomTileRotation(),
      });
    }
  }

  const occupied = new Set(counterDefs.map((counter) => `${counter.x},${counter.y}`));
  const specialTiles = shuffle(tiles.filter((tile) => !occupied.has(`${tile.x},${tile.y}`)));
  assignFloorType(specialTiles, "common", 3);
  assignFloorType(specialTiles, "rare", 2);
  assignFloorType(specialTiles, "unique", 1);
  return tiles;
}

function createFloorShadows() {
  const occupied = new Set(counterDefs.map((counter) => `${counter.x},${counter.y}`));
  const directions = [
    { key: "top", dx: 0, dy: -TILE, rotation: 0 },
    { key: "right", dx: TILE, dy: 0, rotation: Math.PI / 2 },
    { key: "bottom", dx: 0, dy: TILE, rotation: Math.PI },
    { key: "left", dx: -TILE, dy: 0, rotation: -Math.PI / 2 },
  ];
  const cornerRotations = {
    "top,right": 0,
    "right,bottom": Math.PI / 2,
    "bottom,left": Math.PI,
    "left,top": -Math.PI / 2,
  };
  const shadows = [];

  for (let x = 0; x < WIDTH; x += TILE) {
    for (let y = 0; y < HEIGHT; y += TILE) {
      if (occupied.has(`${x},${y}`)) continue;

      const touching = directions.filter((item) =>
        occupied.has(`${x + item.dx},${y + item.dy}`),
      );
      const corner = cornerShadowForDirections(touching, cornerRotations);
      if (corner) {
        shadows.push({ x, y, rotation: corner.rotation, type: "corner" });
      } else if (touching.length > 0) {
        shadows.push({ x, y, rotation: touching[0].rotation, type: "single" });
      }
    }
  }

  return shadows;
}

function cornerShadowForDirections(directions, rotations) {
  const keys = directions.map((item) => item.key);
  const pairs = [
    ["top", "right"],
    ["right", "bottom"],
    ["bottom", "left"],
    ["left", "top"],
  ];
  const pair = pairs.find(([a, b]) => keys.includes(a) && keys.includes(b));
  if (!pair) return null;

  return { rotation: rotations[pair.join(",")] };
}

function assignFloorType(pool, type, count) {
  const variants = sprites.floor[type];
  const variantCount = Array.isArray(variants) ? variants.length : 1;
  const total = count * variantCount;
  for (let i = 0; i < total && pool.length > 0; i += 1) {
    const tile = pool.pop();
    tile.type = type;
    tile.variant = Array.isArray(variants) ? i % variants.length : 0;
  }
}

function randomTileRotation() {
  return Math.floor(Math.random() * 4) * (Math.PI / 2);
}

function startGame() {
  game = freshGame();
  setIntegrationStatus(ui.integrationStatus, "Partida conectada. Boa sorte!", "success");
  setIntegrationStatus(ui.resultIntegrationStatus, "");
  document.body.classList.add("is-playing");
  ui.startScreen.classList.add("hidden");
  ui.resultScreen.classList.add("hidden");
  ui.gameScreen.classList.remove("hidden");
  ui.emailModal.classList.add("hidden");
  fitCanvasToViewport();
  if (!onlineCode) requestGameFullscreen();
  lastFrame = performance.now();
  requestAnimationFrame(loop);
}

function requestGameFullscreen() {
  const target = document.documentElement;
  if (document.fullscreenElement || !target.requestFullscreen) return;
  target.requestFullscreen().catch(() => {});
}

function exitGameFullscreen() {
  if (!document.fullscreenElement || !document.exitFullscreen) return;
  document.exitFullscreen().catch(() => {});
}

function loop(now) {
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;

  if (game && game.mode === "playing") {
    if (onlineCode && onlineRole === "guest") {
      game.timeLeft = Math.max(0, game.timeLeft - dt);
    } else {
      update(dt);
      if (onlineCode && onlineRole === "host" && game.mode === "playing" && now - onlineSnapshotAt >= 100) {
        onlineSnapshotAt = now;
        sendOnline({ type: "snapshot", state: onlineGameState() });
      }
    }
    draw();
    requestAnimationFrame(loop);
  }
}

function update(dt) {
  game.timeLeft -= dt;
  if (game.timeLeft <= 0) {
    game.timeLeft = 0;
    finishGame();
    return;
  }

  updateEmailArrival(dt);
  updatePlayers(dt);
  updateStations(dt);
  updateEmailModal(dt);
}

function updateEmailArrival(dt) {
  if (game.queue.length >= MAX_QUEUE || game.deck.length === 0) {
    return;
  }

  game.nextEmailIn -= dt;
  if (game.nextEmailIn <= 0) {
    const email = game.deck.pop();
    game.queue.push(email);
    if (!game.appeared.some((item) => item.id === email.id)) {
      game.appeared.push({
        ...email,
        outcome: "pendente",
        points: 0,
      });
    }
    game.nextEmailIn = EMAIL_ARRIVAL_MIN + Math.random() * EMAIL_ARRIVAL_VARIATION;
  }
}

function updatePlayers(dt) {
  const bindings = [
    { up: "w", down: "s", left: "a", right: "d" },
    { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" },
  ];

  game.players.forEach((player, index) => {
    const input = onlineCode && index === 1
      ? { up: "w", down: "s", left: "a", right: "d" }
      : bindings[index];
    const pressed = onlineCode && index === 1 ? remoteKeys : keys;
    let dx = 0;
    let dy = 0;
    if (pressed.has(input.up)) dy -= 1;
    if (pressed.has(input.down)) dy += 1;
    if (pressed.has(input.left)) dx -= 1;
    if (pressed.has(input.right)) dx += 1;

    const wantsToMove = dx !== 0 || dy !== 0;
    player.moving = false;

    if (wantsToMove) {
      const length = Math.hypot(dx, dy);
      dx /= length;
      dy /= length;
      player.direction = directionFromVector(dx, dy, player.direction);
      player.visualDirection = visualDirectionFromVector(dx, dy, player.direction);
      player.lastMoveX = dx;
      player.lastMoveY = dy;
      player.moving = movePlayer(player, dx * player.speed * dt, dy * player.speed * dt);
    }

    player.animTime = player.moving ? player.animTime + dt : 0;
  });

  resolvePlayerSeparation(dt);
}

function resolvePlayerSeparation(dt) {
  for (let firstIndex = 0; firstIndex < game.players.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < game.players.length; secondIndex += 1) {
      separatePlayerPair(game.players[firstIndex], game.players[secondIndex], dt);
    }
  }
}

function separatePlayerPair(first, second, dt) {
  const firstRadius = first.separationRadius ?? first.r;
  const secondRadius = second.separationRadius ?? second.r;
  const minimumDistance = firstRadius + secondRadius;
  const offsetX = second.x - first.x;
  const offsetY = second.y - first.y;
  const currentDistance = Math.hypot(offsetX, offsetY);

  if (currentDistance >= minimumDistance) return;

  // A deterministic direction also separates players spawned at the exact same point.
  const normalX = currentDistance > 0.001 ? offsetX / currentDistance : 1;
  const normalY = currentDistance > 0.001 ? offsetY / currentDistance : 0;
  const overlap = minimumDistance - currentDistance;
  const correction = Math.min(overlap, PLAYER_SEPARATION_SPEED * dt);
  const correctionPerPlayer = correction / 2;

  // Reuse normal movement resolution so the separation cannot push anyone through
  // counters or beyond the map limits. Passive pushes do not change facing/animation.
  movePlayer(first, -normalX * correctionPerPlayer, -normalY * correctionPerPlayer);
  movePlayer(second, normalX * correctionPerPlayer, normalY * correctionPerPlayer);
}

function directionFromVector(dx, dy, fallback = "down") {
  if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) {
    return dx > 0 ? "right" : "left";
  }
  if (dy !== 0) {
    return dy > 0 ? "down" : "up";
  }
  return fallback;
}

function visualDirectionFromVector(dx, dy, fallback = "down") {
  return directionFromVector(dx, dy, fallback);
}

function movePlayer(player, dx, dy) {
  const oldX = player.x;
  const oldY = player.y;
  const bounds = movementBoundsForPlayer(player);

  player.x = clamp(player.x + dx, bounds.minX, bounds.maxX);
  if (collides(player)) player.x = oldX;
  player.y = clamp(player.y + dy, bounds.minY, bounds.maxY);
  if (collides(player)) player.y = oldY;

  return player.x !== oldX || player.y !== oldY;
}

function movementBoundsForPlayer(player) {
  const hitbox = player.hitbox ?? {
    w: player.r * 2,
    h: player.r * 2,
    offsetX: 0,
    offsetY: 0,
  };
  const offsetX = hitbox.offsetX ?? 0;
  const offsetY = hitbox.offsetY ?? 0;

  return {
    minX: hitbox.w / 2 - offsetX,
    maxX: WIDTH - hitbox.w / 2 - offsetX,
    minY: hitbox.h / 2 - offsetY,
    maxY: HEIGHT - hitbox.h / 2 - offsetY,
  };
}

function collides(player) {
  return counterDefs.some((rect) => circleRectCollision(player, rect));
}

function updateStations(dt) {
  Object.values(game.stations).forEach((station) => {
    if (!station.processing) return;

    const processing = station.processing;
    if (processing.mode === "manual") {
      const player = game.players.find((item) => item.id === processing.playerId);
      if (!player || !nearRect(player, station, world(58))) {
        station.processing = null;
        station.output = processing.taskId;
        return;
      }
    }

    processing.elapsed += dt;
    if (processing.elapsed >= processing.duration) {
      completeStationProcess(station);
    }
  });
}

function completeStationProcess(station) {
  const task = game.tasks[station.processing.taskId];
  station.processing = null;
  if (!task) return;

  updateTaskPaperState(task, station.id);
  task.stepIndex += 1;
  if (task.stepIndex >= task.flow.length) {
    completeTask(task);
    return;
  }

  const nextStep = task.flow[task.stepIndex];
  // Digital files reach the computer after scanning; computer records can go
  // straight to the printer queue without creating a carryable paper first.
  if (
    (station.id === "scanner" && nextStep === "computer") ||
    (station.id === "computer" && nextStep === "printer")
  ) {
    game.stations[nextStep].queue.push(task.id);
    task.status = `Aguardando ${FLOW_LABELS[nextStep]}`;
    return;
  }

  station.output = task.id;
  task.status = `Levar para ${FLOW_LABELS[nextStep]}`;
}

function updateTaskPaperState(task, stationId) {
  if (stationId === "signature") {
    task.paperState = "signed";
  } else if (stationId === "stamp") {
    task.paperState = "stamped";
  }
}

function updateEmailModal(dt) {
  if (!game.currentEmail) return;
  game.readTime = Math.max(0, game.readTime - dt);
  ui.readTimerBar.style.transform = `scaleX(${game.readTime / READ_LIMIT})`;
}

function handleAction(player) {
  if (!game || game.mode !== "playing" || game.currentEmail) return;

  const station = nearestStation(player, ACTION_RANGE);
  const counter = nearestCounter(player, ACTION_RANGE);
  if (player.carrying) {
    if (station && tryUseCarriedItem(player, station)) return;
    if (counter && placeOnCounter(player, counter)) return;
    dropOnFloor(player);
    return;
  }

  if (pickUpFromFloor(player)) return;

  if (station && pickUpFromStation(player, station)) return;
  if (counter && pickUpFromCounter(player, counter)) return;
  if (station?.id === "email") {
    openEmail();
    return;
  }
  if (station && startQueuedWork(player, station)) return;
}

function tryUseCarriedItem(player, station) {
  const task = game.tasks[player.carrying];
  if (!task || !canUseCarriedItemAtStation(player, station)) return false;

  if (station.id === "deposit") {
    player.carrying = null;
    completeTask(task);
    return true;
  }

  if (station.id === "signature" || station.id === "stamp") {
    station.processing = {
      taskId: task.id,
      elapsed: 0,
      duration: FLOW_TIMES[station.id],
      mode: "manual",
      playerId: player.id,
    };
    player.carrying = null;
    task.status = `${FLOW_LABELS[station.id]} em andamento`;
    return true;
  }

  if (station.id === "scanner") {
    station.processing = {
      taskId: task.id,
      elapsed: 0,
      duration: FLOW_TIMES.scanner,
      mode: "auto",
    };
    player.carrying = null;
    task.status = "Digitalizando";
    return true;
  }

  return false;
}

function placeOnCounter(player, counter) {
  if (!canPlaceCarriedItemOnCounter(player, counter)) return false;

  counter.surfaceItem = player.carrying;
  const task = game.tasks[player.carrying];
  if (task) task.status = `Aguardando em ${counter.label}`;
  player.carrying = null;
  return true;
}

function canUseCarriedItemAtStation(player, station) {
  if (!player?.carrying || !station) return false;

  const task = game.tasks[player.carrying];
  if (!task || task.flow[task.stepIndex] !== station.id) return false;

  if (station.id === "deposit") return true;
  if (station.id !== "signature" && station.id !== "stamp" && station.id !== "scanner") {
    return false;
  }

  const counter = counterForStation(station.id);
  return !station.processing && !station.output && !counter?.surfaceItem;
}

function canPlaceCarriedItemOnCounter(player, counter) {
  if (!player?.carrying || !counter) return false;
  const station = counter.stationId ? game.stations[counter.stationId] : null;
  return counter.stationId !== "email" && !counter.surfaceItem && !station?.processing && !station?.output;
}

function pickUpFromStation(player, station) {
  const taskId = station.output;
  if (!taskId) return false;
  station.output = null;
  player.carrying = taskId;
  const task = game.tasks[taskId];
  if (task) task.status = `Com P${player.id}`;
  return true;
}

function pickUpFromCounter(player, counter) {
  if (!counter.surfaceItem) return false;
  const station = counter.stationId ? game.stations[counter.stationId] : null;
  if (station?.processing) return false;
  player.carrying = counter.surfaceItem;
  counter.surfaceItem = null;
  const task = game.tasks[player.carrying];
  if (task) task.status = `Com P${player.id}`;
  return true;
}

function pickUpFromFloor(player) {
  const index = game.floorItems.findIndex((item) =>
    distanceToRect(player, { x: item.x, y: item.y, w: PAPER_SIZE, h: PAPER_SIZE }) < world(42),
  );
  if (index < 0) return false;
  const [item] = game.floorItems.splice(index, 1);
  player.carrying = item.taskId;
  const task = game.tasks[item.taskId];
  if (task) task.status = `Com P${player.id}`;
  return true;
}

function dropOnFloor(player) {
  const offsets = [
    [world(12), world(12)],
    [-PAPER_SIZE / 2, -PAPER_SIZE / 2],
    [-PAPER_SIZE - world(8), -PAPER_SIZE / 2],
    [world(8), -PAPER_SIZE / 2],
    [-PAPER_SIZE / 2, -PAPER_SIZE - world(8)],
    [-PAPER_SIZE / 2, world(8)],
  ];
  const position = offsets
    .map(([dx, dy]) => ({ x: player.x + dx, y: player.y + dy }))
    .find(({ x, y }) => {
      const paper = { x, y, w: PAPER_SIZE, h: PAPER_SIZE };
      return (
        x >= 0 && y >= 0 && x + PAPER_SIZE <= WIDTH && y + PAPER_SIZE <= HEIGHT &&
        Object.values(game.counters).every((counter) => !rectsOverlap(paper, counter))
      );
    });
  if (!position) return false;

  const taskId = player.carrying;
  game.floorItems.push({ taskId, ...position });
  const task = game.tasks[taskId];
  if (task) task.status = "No chao";
  player.carrying = null;
  return true;
}

function startQueuedWork(player, station) {
  if (!["printer", "computer"].includes(station.id)) return false;
  const counter = counterForStation(station.id);
  if (station.processing || station.output || counter?.surfaceItem || station.queue.length === 0) {
    return false;
  }

  const taskId = station.queue.shift();
  const task = game.tasks[taskId];
  if (!task) return false;

  station.processing = {
    taskId,
    elapsed: 0,
    duration: FLOW_TIMES[station.id],
    mode: "auto",
    playerId: player.id,
  };
  task.status = `${FLOW_LABELS[station.id]} processando`;
  return true;
}

function completeTask(task) {
  task.completed = true;
  task.status = "Concluida";

  const appeared = findAppeared(task.email.id);
  if (task.email.legitimate) {
    game.score += 10;
    game.stats.legitCompleted += 1;
    if (appeared) {
      appeared.outcome = "processado";
      appeared.points = 10;
    }
  } else {
    game.score -= 20;
    game.stats.phishingProcessed += 1;
    if (appeared) {
      appeared.outcome = "phishing processado";
      appeared.points = -20;
    }
  }
}

function openEmail() {
  if (game.queue.length === 0) return;
  const email = game.queue[0];
  game.currentEmail = email;
  game.readTime = READ_LIMIT;
  ui.emailSubject.textContent = email.subject;
  ui.emailSender.textContent = email.sender;
  ui.emailBody.textContent = email.body;
  ui.readTimerBar.style.transform = "scaleX(1)";
  ui.emailModal.classList.remove("hidden");
}

function closeEmail() {
  game.currentEmail = null;
  ui.emailModal.classList.add("hidden");
}

function decideEmail(decision) {
  const email = game.currentEmail;
  if (!email) return;

  game.queue.shift();
  const appeared = findAppeared(email.id);

  if (decision === "report") {
    if (email.legitimate) {
      game.score -= 5;
      game.stats.legitDiscarded += 1;
      if (appeared) {
        appeared.outcome = "legitimo descartado";
        appeared.points = -5;
      }
    } else {
      game.score += 15;
      game.stats.phishingReported += 1;
      if (appeared) {
        appeared.outcome = "phishing reportado";
        appeared.points = 15;
      }
    }
    closeEmail();
    return;
  }

  const flow = email.legitimate ? email.flow : email.fakeFlow;
  const task = {
    id: `task-${email.id}-${Date.now()}`,
    email,
    flow,
    stepIndex: 0,
    paperState: "normal",
    status: `Aguardando ${FLOW_LABELS[flow[0]]}`,
    completed: false,
  };

  game.tasks[task.id] = task;
  game.stations[flow[0]].queue.push(task.id);
  if (appeared) {
    appeared.outcome = "aceito";
    appeared.points = 0;
  }
  closeEmail();
}

function finishGame() {
  game.mode = "ended";
  document.body.classList.remove("is-playing");
  exitGameFullscreen();
  ui.gameScreen.classList.add("hidden");
  ui.emailModal.classList.add("hidden");
  ui.resultScreen.classList.remove("hidden");
  renderResults();
  if (onlineCode) {
    if (onlineRole === "host") {
      setIntegrationStatus(ui.resultIntegrationStatus, "Validando o resultado da dupla...");
      sendOnline({
        type: "complete",
        durationSeconds: SESSION_LENGTH - game.timeLeft,
        outcomes: game.appeared.map((email) => ({ id: email.id, outcome: email.outcome })),
        state: onlineGameState(),
      });
    } else {
      setIntegrationStatus(ui.resultIntegrationStatus, "Resultado da dupla registrado.", "success");
    }
  } else if (activeRunId) {
    setIntegrationStatus(ui.resultIntegrationStatus, "Validando o resultado na plataforma...");
    postToPlatform("overlooked:completed", {
      runId: activeRunId,
      durationSeconds: SESSION_LENGTH - game.timeLeft,
      outcomes: game.appeared.map((email) => ({ id: email.id, outcome: email.outcome })),
    });
  } else {
    setIntegrationStatus(
      ui.resultIntegrationStatus,
      "Partida local: entre na Casa Digital para registrar o resultado.",
    );
  }
}

function findAppeared(id) {
  return game.appeared.find((item) => item.id === id);
}

function renderResults() {
  ui.finalScore.textContent = game.score;
  ui.rankTitle.textContent = rankForScore(game.score);
  ui.breakdown.innerHTML = [
    ["Requisicoes concluidas", game.stats.legitCompleted],
    ["Phishings reportados", game.stats.phishingReported],
    ["Phishings processados", game.stats.phishingProcessed],
    ["Legitimos descartados", game.stats.legitDiscarded],
  ]
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  ui.resultList.innerHTML = game.appeared
    .map((email) => {
      const mistake =
        email.outcome === "phishing processado" || email.outcome === "legitimo descartado";
      const signs = email.signs.map((sign) => `<li>${escapeHtml(sign)}</li>`).join("");
      return `<article class="${mistake ? "mistake" : ""}">
        <h2>${escapeHtml(email.title)}</h2>
        <p><strong>${email.legitimate ? "Legitimo" : "Phishing"}</strong> - ${escapeHtml(email.outcome)} (${email.points > 0 ? "+" : ""}${email.points} pts)</p>
        <p>${escapeHtml(email.subject)}</p>
        <p class="result-list__evidence-title">Pistas no e-mail</p>
        <ul>${signs}</ul>
      </article>`;
    })
    .join("");
}

function rankForScore(score) {
  if (score >= 140) return "Elite Anti-Phishing";
  if (score >= 110) return "Cacador de Phishing";
  if (score >= 80) return "Guardiao Digital";
  if (score >= 50) return "Analista de Governanca";
  if (score >= 20) return "Analista em Formacao";
  if (score >= 0) return "Em treinamento";
  return "Revisao necessaria";
}

function setIntegrationStatus(element, message, state = "") {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", state === "error");
  element.classList.toggle("is-success", state === "success");
}

function postToPlatform(type, payload = {}) {
  if (!isEmbedded) return;
  window.parent.postMessage(
    { source: BRIDGE_SOURCE, version: BRIDGE_VERSION, type, ...payload },
    window.location.origin,
  );
}

function requestIntegratedStart() {
  if (onlineCode) {
    if (onlineRole === "host" && onlineRoomStatus === "waiting" && onlineGuestConnected) {
      ui.startButton.disabled = true;
      setIntegrationStatus(ui.integrationStatus, "Iniciando a partida da dupla...");
      sendOnline({ type: "start" });
    }
    return;
  }
  requestGameFullscreen();
  if (!isEmbedded) {
    activeRunId = null;
    startGame();
    return;
  }
  if (awaitingSession) return;
  awaitingSession = true;
  ui.startButton.disabled = true;
  ui.restartButton.disabled = true;
  setIntegrationStatus(ui.integrationStatus, "Abrindo uma sessão válida...");
  setIntegrationStatus(ui.resultIntegrationStatus, "Abrindo uma nova sessão válida...");
  postToPlatform("overlooked:start-request");
}

function sendOnline(payload) {
  if (onlineSocket?.readyState === WebSocket.OPEN) {
    onlineSocket.send(JSON.stringify(payload));
  }
}

function onlineGameState() {
  if (!game) return null;
  const { timeLeft, score, queue, appeared, currentEmail, readTime,
    stations, counters, tasks, floorItems, players, stats } = game;
  return { timeLeft, score, queue, appeared, currentEmail, readTime,
    stations, counters, tasks, floorItems, players, stats };
}

function applyOnlineState(state) {
  if (!game || !state || typeof state !== "object") return;
  Object.assign(game, state);
  if (game.currentEmail) {
    ui.emailSubject.textContent = game.currentEmail.subject;
    ui.emailSender.textContent = game.currentEmail.sender;
    ui.emailBody.textContent = game.currentEmail.body;
    ui.readTimerBar.style.transform = `scaleX(${Math.max(0, game.readTime / READ_LIMIT)})`;
    ui.emailModal.classList.remove("hidden");
  } else {
    ui.emailModal.classList.add("hidden");
  }
}

function onlineError(message) {
  setIntegrationStatus(ui.integrationStatus, message, "error");
  setIntegrationStatus(ui.resultIntegrationStatus, message, "error");
  postToPlatform("overlooked:room-error", { message });
}

function sendGuestInput() {
  if (onlineRole !== "guest" || !game || game.mode !== "playing") return;
  sendOnline({ type: "input", keys: ["w", "a", "s", "d"].filter((key) => keys.has(key)) });
}

function connectOnline() {
  if (!onlineCode) return;
  ui.startButton.disabled = true;
  ui.restartButton.classList.add("hidden");
  setIntegrationStatus(ui.integrationStatus, "Conectando à sala online...");
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  onlineSocket = new WebSocket(`${protocol}//${window.location.host}/api/arcade/overlooked/room/socket?code=${onlineCode}`);
  onlineSocket.addEventListener("message", (event) => {
    let message;
    try { message = JSON.parse(event.data); } catch { return; }
    if (message.type === "connected") {
      onlineRole = message.role;
      document.getElementById("playerOneLabel").textContent = onlineRole === "host" ? "Jogador 1 · você" : "Jogador 1 · dupla";
      document.getElementById("playerTwoLabel").textContent = onlineRole === "guest" ? "Jogador 2 · você" : "Jogador 2 · dupla";
      document.getElementById("playerTwoMovement").textContent = "W A S D";
      document.getElementById("playerTwoAction").textContent = "E";
      if (onlineRole === "guest") {
        ui.startButton.textContent = "Aguardando início";
        setIntegrationStatus(ui.integrationStatus, "Você é o jogador 2. Aguarde o início da partida.");
      }
      return;
    }
    if (message.type === "room") {
      onlineRoomStatus = message.status;
      onlineGuestConnected = message.guestConnected === true;
      if (onlineRole === "host" && game?.mode !== "playing") {
        ui.startButton.disabled = message.status !== "waiting" || !onlineGuestConnected;
        setIntegrationStatus(ui.integrationStatus, onlineGuestConnected
          ? "Sua dupla entrou. Inicie a partida quando estiverem prontos."
          : "Aguardando a outra pessoa entrar...");
      }
      if (onlineRole === "host" && !onlineGuestConnected) remoteKeys.clear();
      postToPlatform("overlooked:room-update", {
        roomPhase: message.status,
        roomStatus: message.status === "completed" ? "Partida concluída. Crie outra sala para jogar novamente."
          : message.status === "abandoned" ? "Partida interrompida. Crie outra sala."
          : message.status === "playing" && !onlineGuestConnected
            ? "A conexão da dupla caiu. Ela pode voltar pelo mesmo convite antes do fim."
          : onlineGuestConnected ? "Dupla conectada." : "Aguardando a dupla...",
        guestName: message.guestName,
        guestConnected: onlineGuestConnected,
      });
      return;
    }
    if (message.type === "started") {
      startGame();
      if (onlineRole === "guest") sendGuestInput();
      return;
    }
    if (message.type === "snapshot" && onlineRole === "guest" && game?.mode === "playing") {
      applyOnlineState(message.state);
      return;
    }
    if (message.type === "input" && onlineRole === "host") {
      remoteKeys.clear();
      for (const key of message.keys || []) remoteKeys.add(key);
      return;
    }
    if (message.type === "action" && onlineRole === "host" && game?.mode === "playing") {
      handleAction(game.players[1]);
      return;
    }
    if (message.type === "decision" && onlineRole === "host" && game?.mode === "playing") {
      if (message.value === "close") closeEmail();
      else decideEmail(message.value);
      return;
    }
    if (message.type === "completed") {
      if (onlineRole === "guest" && game?.mode === "playing") {
        applyOnlineState(message.state);
        game.timeLeft = 0;
        finishGame();
      }
      const score = message.result?.rawScore;
      setIntegrationStatus(ui.resultIntegrationStatus,
        `Resultado da dupla validado: ${score} pontos.`, "success");
      postToPlatform("overlooked:online-completed", { result: message.result });
      return;
    }
    if (message.type === "error") {
      onlineError(message.message || "Não foi possível concluir a partida online.");
      if (onlineRole === "host" && onlineRoomStatus === "waiting") ui.startButton.disabled = false;
    }
  });
  onlineSocket.addEventListener("close", () => {
    if (onlineRoomStatus !== "completed") onlineError(onlineRole === "guest"
      ? "A conexão caiu. Atualize a página para voltar à sala."
      : "A conexão da sala foi encerrada. Crie uma nova sala para jogar.");
  });
  onlineSocket.addEventListener("error", () => onlineError("Não foi possível conectar à sala online."));
  window.setInterval(sendGuestInput, 500);
}

connectOnline();

window.addEventListener("message", (event) => {
  if (
    event.source !== window.parent ||
    event.origin !== window.location.origin ||
    !event.data ||
    event.data.source !== PLATFORM_SOURCE ||
    event.data.version !== BRIDGE_VERSION
  ) {
    return;
  }

  if (event.data.type === "overlooked:session-ready" && typeof event.data.runId === "string") {
    activeRunId = event.data.runId;
    awaitingSession = false;
    ui.startButton.disabled = false;
    ui.restartButton.disabled = false;
    startGame();
  }
  if (event.data.type === "overlooked:session-error") {
    awaitingSession = false;
    ui.startButton.disabled = false;
    ui.restartButton.disabled = false;
    const message = event.data.message || "Não foi possível abrir a partida.";
    setIntegrationStatus(ui.integrationStatus, message, "error");
    setIntegrationStatus(ui.resultIntegrationStatus, message, "error");
  }
  if (event.data.type === "overlooked:result-saved") {
    setIntegrationStatus(
      ui.resultIntegrationStatus,
      `Resultado validado: ${event.data.score} pontos.`,
      "success",
    );
  }
  if (event.data.type === "overlooked:result-error") {
    setIntegrationStatus(
      ui.resultIntegrationStatus,
      event.data.message || "Não foi possível validar o resultado.",
      "error",
    );
  }
});

function draw() {
  const playersByDepth = [...game.players].sort((first, second) => first.y - second.y || first.id - second.id);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawFloor();
  drawFloorShadows();
  drawZones();
  playersByDepth.forEach(drawPlayerFootLayer);
  Object.values(game.counters).forEach(drawCounter);
  drawFloorItems();
  playersByDepth.forEach(drawCarriedTaskArrow);
  playersByDepth.forEach(drawPlayer);
  drawGameStatus();
}

function drawFloor() {
  ctx.imageSmoothingEnabled = false;
  for (const tile of game.floorTiles) {
    const sprite = spriteForFloorTile(tile);
    if (sprite?.complete) {
      drawFloorTileSprite(sprite, tile);
    } else {
      ctx.fillStyle = "#d8d8d8";
      ctx.fillRect(tile.x, tile.y, TILE, TILE);
    }
  }
}

function drawFloorTileSprite(sprite, tile) {
  if (!tile.rotation) {
    ctx.drawImage(sprite, tile.x, tile.y, TILE, TILE);
    return;
  }

  ctx.save();
  ctx.translate(tile.x + TILE / 2, tile.y + TILE / 2);
  ctx.rotate(tile.rotation);
  ctx.drawImage(sprite, -TILE / 2, -TILE / 2, TILE, TILE);
  ctx.restore();
}

function drawFloorShadows() {
  ctx.imageSmoothingEnabled = false;
  for (const shadow of game.floorShadows) {
    const sprite = shadow.type === "corner" ? sprites.floorShadowCorner : sprites.floorShadow;
    if (!sprite?.complete) continue;

    ctx.save();
    ctx.translate(shadow.x + TILE / 2, shadow.y + TILE / 2);
    ctx.rotate(shadow.rotation);
    ctx.drawImage(sprite, -TILE / 2, -TILE / 2, TILE, TILE);
    ctx.restore();
  }
}

function spriteForFloorTile(tile) {
  const sprite = sprites.floor[tile.type] ?? sprites.floor.normal;
  return Array.isArray(sprite) ? sprite[tile.variant % sprite.length] : sprite;
}

function drawZones() {
  ctx.fillStyle = "#6b7570";
  ctx.font = `700 ${pixel(12)}px sans-serif`;
}

function drawCounter(counter) {
  const station = counter.stationId ? game.stations[counter.stationId] : null;
  const highlighted = isPaperPlacementTarget(counter);
  const machineHighlight =
    highlighted && (station?.id === "printer" || station?.id === "computer");
  const counterSprite = spriteForCounter(counter, highlighted && !machineHighlight);
  if (counterSprite?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(counterSprite, counter.x, counter.y, counter.w, counter.h);
  } else {
    ctx.fillStyle = COUNTER_COLOR;
    ctx.fillRect(counter.x, counter.y, counter.w, counter.h);
  }
  if (
    station &&
    station.id !== "stamp" &&
    station.id !== "deposit" &&
    station.id !== "email" &&
    station.id !== "signature" &&
    station.id !== "scanner" &&
    station.id !== "computer"
  ) {
    drawStationSurfaceAccent(counter, highlighted);
  }
  ctx.strokeStyle = "rgba(30, 42, 37, 0.18)";
  ctx.lineWidth = 1;
  ctx.strokeRect(counter.x + 0.5, counter.y + 0.5, counter.w - 1, counter.h - 1);

  if (station) {
    drawStationIcon(counter, station);
  }

  if (!station) {
    drawCounterDecoration(counter);
  }

  if (machineHighlight) {
    drawCounterLightWash(counter);
  }

  if (station?.processing) {
    const ratio = station.processing.elapsed / station.processing.duration;
    drawProgress(counter.x + 3, counter.y + counter.h - 5, counter.w - 6, 3, ratio);
  }

  if (station?.queue.length > 0) {
    drawBadge(counter.x + counter.w - 7, counter.y + 14, station.queue.length);
  }

  if (station?.id === "email" && game.queue.length > 0) {
    drawBadge(counter.x + counter.w - 7, counter.y + 14, game.queue.length);
  }

  const paperTaskId = counter.surfaceItem ?? (station?.id !== "printer" ? station?.output : null);
  if (paperTaskId) {
    drawPaper(counter.x + 6, counter.y + 5, paperTaskId);
  }
}

function drawCounterDecoration(counter) {
  let frames;
  let sequence;
  let frameDuration;

  if (counter.decor === "newtonCradle") {
    frames = sprites.counterDecor.newtonCradle;
    sequence = NEWTON_CRADLE_SEQUENCE;
    frameDuration = 140;
  } else if (counter.decor === "hotCoffee") {
    frames = sprites.counterDecor.hotCoffee;
    sequence = HOT_COFFEE_SEQUENCE;
    frameDuration = 220;
  } else if (counter.decor === "miniAquarium") {
    frames = sprites.counterDecor.miniAquarium;
    sequence = MINI_AQUARIUM_SEQUENCE;
    frameDuration = 240;
  } else {
    return;
  }

  const sequenceIndex =
    (Math.floor(performance.now() / frameDuration) + counter.decorPhase) % sequence.length;
  const frame = sequence[sequenceIndex];
  const sprite = frames[frame];
  if (!sprite?.complete) return;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
}

function drawStationSurfaceAccent(counter, highlighted) {
  const inset = 7;
  const x = counter.x + inset;
  const y = counter.y + inset;
  const width = counter.w - inset * 2;
  const height = counter.h - inset * 2;

  ctx.save();
  ctx.fillStyle = counter.color;
  ctx.globalAlpha = highlighted ? 0.72 : 0.58;
  ctx.fillRect(x, y, width, height);

  ctx.globalAlpha = highlighted ? 0.82 : 0.62;
  ctx.fillRect(x, y, width, 2);

  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(30, 42, 45, 0.36)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);
  ctx.restore();
}

function drawCounterLightWash(counter) {
  const sprite = spriteForCounter(counter, true);
  if (!sprite?.complete) return;

  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
  ctx.restore();
}

function isPaperPlacementTarget(counter) {
  return game.players.some((player) => {
    if (!canPlaceCarriedItemOnCounter(player, counter)) return false;

    const station = nearestStation(player, ACTION_RANGE);
    if (station && canUseCarriedItemAtStation(player, station)) return false;

    return nearestCounter(player, ACTION_RANGE) === counter;
  });
}

function spriteForCounter(counter, highlighted = false) {
  const c = highlighted ? sprites.countersLight : sprites.counters;
  if (counter.group === "middle") {
    if (counter.x === TILE * 3) return c.centerLeft;
    if (counter.x === TILE * 10) return c.centerRight;
    return c.sideHorizontal;
  }
  if (counter.x === 0 && counter.y === 0) return c.cornerTopLeft;
  if (counter.x === WIDTH - TILE && counter.y === 0) return c.cornerTopRight;
  if (counter.x === 0 && counter.y === HEIGHT - TILE) return c.cornerBottomLeft;
  if (counter.x === WIDTH - TILE && counter.y === HEIGHT - TILE) return c.cornerBottomRight;
  if (counter.group === "left" || counter.group === "right") return c.sideVertical;
  return c.sideHorizontal;
}

function drawStationIcon(counter, station) {
  if (station.id === "printer") {
    drawPrinterStation(counter, station);
    return;
  }

  if (station.id === "computer") {
    drawComputerStation(counter, station);
    return;
  }

  if (station.id === "stamp") {
    drawStampStation(counter, station);
    return;
  }

  if (station.id === "email") {
    drawEmailStation(counter);
    return;
  }

  if (station.id === "deposit") {
    drawDepositStation(counter);
    return;
  }

  if (station.id === "signature") {
    drawSignatureStation(counter, station);
    return;
  }

  if (station.id === "scanner") {
    drawScannerStation(counter, station);
    return;
  }
}

function drawEnvelopeIcon(x, y, w, h) {
  const centerX = x + Math.floor(w / 2);
  const centerY = y + Math.floor(h / 2);
  drawPixelRect(x, y, w, h);
  drawPixelLine(x, y, centerX, centerY);
  drawPixelLine(x + w - 1, y, centerX, centerY);
  drawPixelLine(x, y + h - 1, centerX - 2, centerY + 1);
  drawPixelLine(x + w - 1, y + h - 1, centerX + 2, centerY + 1);
}

function drawPenIcon(x, y) {
  drawPixelLine(x + 12, y + 29, x + 28, y + 13, 2);
  drawPixelLine(x + 13, y + 31, x + 30, y + 14);
  ctx.fillRect(x + 10, y + 30, 4, 4);
  drawPixelLine(x + 9, y + 35, x + 17, y + 33);
  drawPixelLine(x + 17, y + 33, x + 23, y + 35);
  drawPixelLine(x + 23, y + 35, x + 31, y + 32);
}

function drawStampIcon(x, y) {
  ctx.fillRect(x + 21, y + 12, 6, 8);
  ctx.fillRect(x + 18, y + 19, 12, 4);
  drawPixelRect(x + 14, y + 23, 20, 8, 2);
  ctx.fillRect(x + 12, y + 33, 24, 3);
}

function drawStampStation(counter, station) {
  const stamp = sprites.stationEquipment.stamp;
  let sprite = stamp.idle;

  if (station.processing) {
    const progress = station.processing.elapsed / station.processing.duration;
    if (progress < 0.3 || progress >= 0.7) {
      sprite = stamp.frames[0];
    } else if (progress < 0.4) {
      sprite = stamp.frames[1];
    } else if (progress < 0.48) {
      sprite = stamp.frames[2];
    } else if (progress < 0.54) {
      sprite = stamp.frames[3];
    } else if (progress < 0.62) {
      sprite = stamp.frames[2];
    } else {
      sprite = stamp.frames[4];
    }
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawStampIcon(counter.x, counter.y);
  ctx.restore();
}

function drawSignatureStation(counter, station) {
  const signature = sprites.stationEquipment.signature;
  let sprite = signature.idle;

  if (station.processing) {
    const progress = station.processing.elapsed / station.processing.duration;
    if (progress < 0.08 || progress > 0.92) {
      sprite = signature.frames[0];
    } else if (progress < 0.16 || progress > 0.84) {
      sprite = signature.frames[1];
    } else {
      const sequenceIndex =
        Math.floor(station.processing.elapsed * 8) % SIGNATURE_WRITE_SEQUENCE.length;
      sprite = signature.frames[SIGNATURE_WRITE_SEQUENCE[sequenceIndex]];
    }
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawPenIcon(counter.x, counter.y);
  ctx.restore();
}

function drawEmailStation(counter) {
  const email = sprites.stationEquipment.email;
  let sprite = email.idle;

  if (game.queue.length > 0) {
    const sequenceIndex =
      Math.floor(performance.now() / 160) % EMAIL_NOTIFICATION_SEQUENCE.length;
    sprite = email.frames[EMAIL_NOTIFICATION_SEQUENCE[sequenceIndex]];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawEnvelopeIcon(counter.x + 10, counter.y + 10, 18, 12);
  ctx.restore();
}

function drawDepositStation(counter) {
  const sprite = sprites.stationEquipment.deposit;
  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawDepositIcon(counter.x, counter.y);
  ctx.restore();
}

function drawScannerIcon(x, y) {
  drawPixelRect(x + 11, y + 16, 26, 17, 2);
  drawPixelLine(x + 14, y + 13, x + 34, y + 16);
  ctx.fillRect(x + 15, y + 22, 18, 2);
}

function drawScannerStation(counter, station) {
  const scanner = sprites.stationEquipment.scanner;
  let sprite = scanner.idle;

  if (station.processing) {
    const sequenceIndex = Math.floor(station.processing.elapsed * 9) % SCANNER_SCAN_SEQUENCE.length;
    sprite = scanner.frames[SCANNER_SCAN_SEQUENCE[sequenceIndex]];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawScannerIcon(counter.x, counter.y);
  ctx.restore();
}

function drawDepositIcon(x, y) {
  drawPixelRect(x + 11, y + 17, 26, 18, 2);
  ctx.fillRect(x + 16, y + 24, 16, 2);
  ctx.fillRect(x + 14, y + 14, 20, 3);
}

function drawPixelRect(x, y, w, h, thickness = 1) {
  const left = Math.round(x);
  const top = Math.round(y);
  const width = Math.round(w);
  const height = Math.round(h);
  ctx.fillRect(left, top, width, thickness);
  ctx.fillRect(left, top + height - thickness, width, thickness);
  ctx.fillRect(left, top + thickness, thickness, height - thickness * 2);
  ctx.fillRect(left + width - thickness, top + thickness, thickness, height - thickness * 2);
}

function drawPixelLine(x0, y0, x1, y1, thickness = 1) {
  let x = Math.round(x0);
  let y = Math.round(y0);
  const endX = Math.round(x1);
  const endY = Math.round(y1);
  const dx = Math.abs(endX - x);
  const sx = x < endX ? 1 : -1;
  const dy = -Math.abs(endY - y);
  const sy = y < endY ? 1 : -1;
  let error = dx + dy;

  while (true) {
    ctx.fillRect(x, y, thickness, thickness);
    if (x === endX && y === endY) break;
    const doubledError = error * 2;
    if (doubledError >= dy) {
      error += dy;
      x += sx;
    }
    if (doubledError <= dx) {
      error += dx;
      y += sy;
    }
  }
}

function drawPrinterStation(counter, station) {
  let sprite = sprites.printer.idle;
  if (station.output) {
    sprite = sprites.printer.frames[sprites.printer.frames.length - 1];
  } else if (station.processing) {
    const progress = clamp(station.processing.elapsed / station.processing.duration, 0, 0.999);
    const frame = Math.floor(progress * sprites.printer.frames.length);
    sprite = sprites.printer.frames[frame];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  drawPrinterFallbackIcon(counter);
}

function drawComputerStation(counter, station) {
  const active = station.queue.length > 0 || station.processing || station.output;
  let sprite = active ? sprites.computer.on : sprites.computer.off;

  if (station.processing) {
    const frame = Math.floor(station.processing.elapsed * 8) % sprites.computer.frames.length;
    sprite = sprites.computer.frames[frame];
  }

  if (sprite.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, counter.x, counter.y, counter.w, counter.h);
    return;
  }

  drawComputerFallbackIcon(counter);
}

function drawPrinterFallbackIcon(counter) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  drawPixelRect(counter.x + 10, counter.y + 12, 28, 15, 2);
  ctx.fillRect(counter.x + 15, counter.y + 7, 18, 7);
  drawPixelRect(counter.x + 14, counter.y + 26, 20, 9, 2);
  ctx.restore();
}

function drawComputerFallbackIcon(counter) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  drawPixelRect(counter.x + 10, counter.y + 9, 28, 20, 2);
  ctx.fillRect(counter.x + 23, counter.y + 29, 2, 6);
  ctx.fillRect(counter.x + 17, counter.y + 35, 14, 2);
  ctx.restore();
}

function drawBadge(x, y) {
  const sequenceIndex = Math.floor(performance.now() / 115) % EXCLAMATION_SEQUENCE.length;
  const frame = sprites.exclamation[EXCLAMATION_SEQUENCE[sequenceIndex]];
  const size = BADGE_SIZE;

  if (frame?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(frame, Math.round(x - size / 2), Math.round(y - size / 2), size, size);
    return;
  }

  ctx.fillStyle = "#fff21f";
  ctx.fillRect(Math.round(x) - 2, Math.round(y) - 9, 4, 12);
  ctx.fillRect(Math.round(x) - 2, Math.round(y) + 6, 4, 4);
}

function drawProgress(x, y, w, h, ratio) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#e9b949";
  ctx.fillRect(x, y, Math.round(w * clamp(ratio, 0, 1)), h);
}

function drawCarriedTaskArrow(player) {
  if (!player.carrying) return;

  const target = targetCounterForCarriedTask(player);
  if (!target) return;

  const targetX = target.x + target.w / 2;
  const targetY = target.y + target.h / 2;
  const dx = targetX - player.x;
  const dy = targetY - player.y;
  const length = Math.hypot(dx, dy);
  if (length < world(48)) return;

  const unitX = dx / length;
  const unitY = dy / length;
  const arrowX = Math.round(player.x + unitX * world(62));
  const arrowY = Math.round(player.y + unitY * world(62) - world(18));
  const rawAngle = Math.atan2(dy, dx) + Math.PI / 2;
  const angle = Math.round(rawAngle / (Math.PI / 2)) * (Math.PI / 2);
  const size = ARROW_SIZE;
  const frame = sprites.arrow[Math.floor(performance.now() / 95) % sprites.arrow.length];

  ctx.save();
  ctx.translate(arrowX, arrowY);
  ctx.rotate(angle);
  if (frame?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(frame, -size / 2, -size / 2, size, size);
  } else {
    ctx.fillStyle = "#fff21f";
    ctx.fillRect(-2, -8, 4, 18);
    ctx.fillRect(-6, -8, 12, 4);
    ctx.fillRect(-4, -12, 8, 4);
    ctx.fillRect(-2, -16, 4, 4);
  }
  ctx.restore();
}

function targetCounterForCarriedTask(player) {
  const task = game.tasks[player.carrying];
  if (!task) return null;

  const step = task.flow[task.stepIndex];
  return counterForStation(step);
}

function drawGameStatus() {
  const time = formatTime(game.timeLeft);
  const score = String(game.score);
  const danger = game.timeLeft <= 30;
  const textScale = 2;
  const timeWidth = measurePixelText(time, textScale);
  const scoreWidth = measurePixelText(score, textScale);
  const panelWidth = Math.max(timeWidth, scoreWidth) + 10;
  const panelHeight = 28;
  const panelX = WIDTH - 9 - panelWidth;
  const panelY = HEIGHT - 9 - panelHeight;

  ctx.save();
  ctx.fillStyle = "rgba(23, 33, 31, 0.68)";
  ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

  drawPixelText(score, WIDTH - 14, panelY + 4, "#fffdf4", textScale, "right");
  drawPixelText(
    time,
    WIDTH - 14,
    panelY + 15,
    danger ? "#ff6868" : "#fffdf4",
    textScale,
    "right",
  );
  ctx.restore();
}

function measurePixelText(value, scale = 1) {
  const text = String(value);
  if (text.length === 0) return 0;
  return text.length * 3 * scale + (text.length - 1) * scale;
}

function drawPixelText(value, x, y, color, scale = 1, align = "left") {
  const text = String(value);
  const width = measurePixelText(text, scale);
  let cursorX = Math.round(align === "right" ? x - width : x);
  const top = Math.round(y);
  ctx.fillStyle = color;

  for (const character of text) {
    const glyph = PIXEL_GLYPHS[character];
    if (glyph) {
      glyph.forEach((row, rowIndex) => {
        [...row].forEach((cell, columnIndex) => {
          if (cell === "1") {
            ctx.fillRect(
              cursorX + columnIndex * scale,
              top + rowIndex * scale,
              scale,
              scale,
            );
          }
        });
      });
    }
    cursorX += 4 * scale;
  }
}

function drawFloorItems() {
  game.floorItems.forEach((item) => drawPaper(item.x, item.y, item.taskId));
}

function drawPlayerFootLayer(player) {
  const transform = transformForDirection(player.visualDirection);

  if (player.id === 1) {
    if (player.carrying) {
      const foot = player.moving
        ? player1HoldPaperWalkFootFrame(player)
        : sprites.player1HoldPaper.feet.idle;
      if (foot.complete) {
        drawPlayerSprite(player, foot, transform);
      }
      return;
    }

    const foot = player.moving
      ? player1LayeredWalkFrame(player).foot
      : sprites.player1IdleLeftLayers.foot;
    if (foot.complete) {
      drawPlayerSprite(player, foot, transform);
    }
    return;
  }

  if (player.id !== 2) return;
  if (player.carrying) {
    const foot = player.moving ? player2HoldPaperWalkFootFrame(player) : sprites.player2HoldPaper.feet.idle;
    if (foot.complete) {
      drawPlayerSprite(player, foot, transform);
    }
    return;
  }

  const foot = player.moving
    ? player2LayeredWalkFrame(player).foot
    : sprites.player2IdleLeftLayers.foot;
  if (foot.complete) {
    drawPlayerSprite(player, foot, transform);
  }
}

function drawPlayer(player) {
  const transform = transformForDirection(player.visualDirection);

  if (player.id === 1) {
    if (player.carrying) {
      const body = player1HoldPaperBodyForTask(player.carrying);
      if (body.complete) {
        drawPlayerSprite(player, body, transform);
        return;
      }
    }

    const body = player.moving
      ? player1LayeredWalkFrame(player).body
      : sprites.player1IdleLeftLayers.body;
    if (body.complete) {
      drawPlayerSprite(player, body, transform);
      if (player.carrying) drawPaper(player.x - 5, player.y - 16, player.carrying);
      return;
    }
  }

  if (player.id === 2) {
    if (player.carrying) {
      const body = player2HoldPaperBodyForTask(player.carrying);
      if (body.complete) {
        drawPlayerSprite(player, body, transform);
        return;
      }
    }

    const body = player.moving
      ? player2LayeredWalkFrame(player).body
      : sprites.player2IdleLeftLayers.body;
    if (body.complete) {
      drawPlayerSprite(player, body, transform);
      return;
    }
  }

  ctx.fillStyle = player.color;
  const fallbackSize = Math.max(4, Math.round(player.r * 2));
  ctx.fillRect(
    Math.round(player.x - fallbackSize / 2),
    Math.round(player.y - fallbackSize / 2),
    fallbackSize,
    fallbackSize,
  );
  if (player.carrying) drawPaper(player.x - 5, player.y - 16, player.carrying);
}

function player1LayeredWalkFrame(player) {
  const frames = sprites.player1WalkLeftLayers;
  const frame = Math.floor(player.animTime * 8) % frames.length;
  return frames[frame];
}

function player1HoldPaperWalkFootFrame(player) {
  const frame = Math.floor(player.animTime * 8) % PLAYER1_HOLD_PAPER_FOOT_SEQUENCE.length;
  const key = PLAYER1_HOLD_PAPER_FOOT_SEQUENCE[frame];
  return sprites.player1HoldPaper.feet[key];
}

function player1HoldPaperBodyForTask(taskId) {
  return sprites.player1HoldPaper.bodies[paperStateForTask(taskId)] ?? sprites.player1HoldPaper.bodies.normal;
}

function player2LayeredWalkFrame(player) {
  const frames = sprites.player2WalkLeftLayers;
  const frame = Math.floor(player.animTime * 10) % frames.length;
  return frames[frame];
}

function player2HoldPaperWalkFootFrame(player) {
  const frame = Math.floor(player.animTime * 6) % PLAYER2_HOLD_PAPER_FOOT_SEQUENCE.length;
  const key = PLAYER2_HOLD_PAPER_FOOT_SEQUENCE[frame];
  return sprites.player2HoldPaper.feet[key];
}

function player2HoldPaperBodyForTask(taskId) {
  return sprites.player2HoldPaper.bodies[paperStateForTask(taskId)] ?? sprites.player2HoldPaper.bodies.normal;
}

function paperSpriteForTask(taskId) {
  return sprites.paper[paperStateForTask(taskId)] ?? sprites.paper.normal;
}

function paperStateForTask(taskId) {
  return game.tasks[taskId]?.paperState ?? "normal";
}

function transformForDirection(direction) {
  if (direction === "right") return { flipX: true, rotation: 0 };
  if (direction === "up") return { flipX: false, rotation: Math.PI / 2 };
  if (direction === "down") return { flipX: false, rotation: -Math.PI / 2 };
  return { flipX: false, rotation: 0 };
}

function drawPlayerSprite(player, sprite, transform = {}) {
  const spriteW = PLAYER_SPRITE_SIZE;
  const spriteH = PLAYER_SPRITE_SIZE;
  const renderX = Math.round(player.x + (transform.offsetX ?? 0));
  const renderY = Math.round(
    player.y - (PLAYER_SPRITE_ANCHOR_Y - PLAYER_SPRITE_PIVOT_Y) +
      (transform.offsetY ?? 0),
  );
  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.translate(renderX, renderY);
  ctx.rotate(transform.rotation ?? 0);
  ctx.scale(transform.flipX ? -1 : 1, 1);
  ctx.drawImage(
    sprite,
    -PLAYER_SPRITE_PIVOT_X,
    -PLAYER_SPRITE_PIVOT_Y,
    spriteW,
    spriteH,
  );
  ctx.restore();
}

function drawPaper(x, y, taskId = null) {
  const sprite = paperSpriteForTask(taskId);
  const renderX = Math.round(x);
  const renderY = Math.round(y);
  if (sprite?.complete) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, renderX, renderY, PAPER_SIZE, PAPER_SIZE);
    return;
  }

  ctx.save();
  ctx.translate(renderX, renderY);
  ctx.fillStyle = "#fffdf4";
  ctx.fillRect(2, 1, 12, 14);
  ctx.fillStyle = "#8d988f";
  drawPixelRect(2, 1, 12, 14);
  ctx.fillStyle = "#c7b46a";
  ctx.fillRect(5, 6, 7, 1);
  ctx.fillRect(5, 9, 7, 1);
  ctx.fillRect(5, 12, 5, 1);
  ctx.restore();
}

function roundRect(x, y, w, h, r, color) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function nearestStation(player, range) {
  let best = null;
  let bestDistance = Infinity;
  Object.values(game.stations).forEach((station) => {
    const d = distanceToRect(player, station);
    if (d < range && d < bestDistance) {
      best = station;
      bestDistance = d;
    }
  });
  return best;
}

function nearestCounter(player, range) {
  let best = null;
  let bestDistance = Infinity;
  Object.values(game.counters).forEach((counter) => {
    const d = distanceToRect(player, counter);
    if (d < range && d < bestDistance) {
      best = counter;
      bestDistance = d;
    }
  });
  return best;
}

function counterForStation(stationId) {
  return Object.values(game.counters).find((counter) => counter.stationId === stationId);
}

function nearRect(point, rect, range) {
  return distanceToRect(point, rect) < range;
}

function distanceToRect(point, rect) {
  const x = clamp(point.x, rect.x, rect.x + rect.w);
  const y = clamp(point.y, rect.y, rect.y + rect.h);
  return Math.hypot(point.x - x, point.y - y);
}

function circleRectCollision(circle, rect) {
  if (circle.hitbox) {
    return rectsOverlap(playerHitbox(circle), rect);
  }
  return distanceToRect(circle, rect) < circle.r;
}

function playerHitbox(player) {
  const hitbox =
    player.hitbox ??
    { w: player.r * 2, h: player.r * 2, offsetX: 0, offsetY: 0 };
  return {
    x: player.x - hitbox.w / 2 + (hitbox.offsetX ?? 0),
    y: player.y - hitbox.h / 2 + (hitbox.offsetY ?? 0),
    w: hitbox.w,
    h: hitbox.h,
  };
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatTime(seconds) {
  const total = Math.ceil(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "enter", " "].includes(key)) {
    event.preventDefault();
  }
  if (onlineCode && onlineRole === "guest") {
    if (game?.currentEmail) {
      if (!event.repeat && key === "a") sendOnline({ type: "decision", value: "accept" });
      if (!event.repeat && key === "r") sendOnline({ type: "decision", value: "report" });
      if (!event.repeat && key === "escape") sendOnline({ type: "decision", value: "close" });
    } else if (!event.repeat && key === "e") {
      sendOnline({ type: "action" });
    }
    keys.add(key);
    if (["w", "a", "s", "d"].includes(key)) sendGuestInput();
    return;
  }
  if (game?.currentEmail) {
    if (key === "a") decideEmail("accept");
    if (key === "r") decideEmail("report");
    if (key === "escape") closeEmail();
    keys.add(key);
    return;
  }
  if (key === "e" && !keys.has("e")) handleAction(game?.players[0]);
  if (!onlineCode && key === "enter" && !keys.has("enter")) handleAction(game?.players[1]);
  keys.add(key);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
  if (onlineCode && onlineRole === "guest") sendGuestInput();
});

window.addEventListener("resize", fitCanvasToViewport);
document.addEventListener("fullscreenchange", fitCanvasToViewport);

ui.startButton.addEventListener("click", requestIntegratedStart);
ui.restartButton.addEventListener("click", requestIntegratedStart);
ui.closeEmailButton.addEventListener("click", () => {
  if (onlineCode && onlineRole === "guest") sendOnline({ type: "decision", value: "close" });
  else closeEmail();
});
ui.acceptButton.addEventListener("click", () => {
  if (onlineCode && onlineRole === "guest") sendOnline({ type: "decision", value: "accept" });
  else decideEmail("accept");
});
ui.reportButton.addEventListener("click", () => {
  if (onlineCode && onlineRole === "guest") sendOnline({ type: "decision", value: "report" });
  else decideEmail("report");
});

fitCanvasToViewport();
postToPlatform("overlooked:ready");
