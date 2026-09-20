export type RadarLesson = {
  concept: {
    title: string;
    paragraphs: readonly [string, string];
    cardTitle: string;
    principle: string;
  };
  observe: {
    title: string;
    instruction: string;
    caseLabel: string;
    caseTitle: string;
    caseBody: string;
    details: readonly { label: string; value: string }[];
    clues: readonly { title: string; detail: string }[];
    caution: string;
  };
  evidence: {
    title: string;
    instruction: string;
    confirmed: readonly string[];
    unconfirmed: readonly string[];
    feedback: string;
  };
  act: {
    title: string;
    intro: string;
    steps: readonly { label: string; detail: string }[];
  };
  check: {
    title: string;
    context: string;
    question: string;
    options: readonly { id: string; label: string; explanation: string }[];
    correctOptionId: string;
  };
  resultTitle: string;
  related: { label: string; href: `/${string}`; description: string };
};

export const ADDITIONAL_RADAR_LESSONS: Readonly<Record<string, RadarLesson>> = {
  "radar:unexpected-attachments": {
    concept: {
      title: "Um anexo esperado tem contexto",
      paragraphs: [
        "Uma nota fiscal pode parecer rotineira e ainda assim chegar fora de hora, de um contato desconhecido ou em um formato inesperado.",
        "O nome do arquivo e a extensão são pistas, não um diagnóstico. Antes de abrir, compare o pedido com a compra ou a conversa que você já conhece.",
      ],
      cardTitle: "Arquivo não é confirmação",
      principle: "Confirme a origem e o motivo do envio por uma referência independente da própria mensagem.",
    },
    observe: {
      title: "Uma nota fiscal chegou sem aviso",
      instruction: "Examine a mensagem fictícia e abra os três detalhes ao lado.",
      caseLabel: "Caixa de entrada · Exemplo fictício",
      caseTitle: "Nota fiscal pendente para conferência",
      caseBody: "“Abra o anexo ainda hoje para evitar atraso no pagamento.”",
      details: [
        { label: "Remetente", value: "cobranca@parceiro-fatura.example" },
        { label: "Anexo", value: "NF_4821.zip" },
        { label: "Na sua rotina", value: "Nenhuma nota fiscal aguardada desse fornecedor" },
      ],
      clues: [
        { title: "O pedido", detail: "O prazo pressiona por uma abertura imediata, mas não explica a qual compra a nota se refere." },
        { title: "O arquivo", detail: "O anexo está compactado. Isso não prova fraude, mas pede atenção ao conteúdo antes de abrir." },
        { title: "O contexto", detail: "Você não reconhece uma solicitação anterior desse fornecedor para essa nota." },
      ],
      caution: "Esses sinais justificam conferir o pedido. Eles não identificam, por si só, quem enviou o arquivo.",
    },
    evidence: {
      title: "O que a mensagem realmente mostra?",
      instruction: "Selecione apenas o que é observável no caso. Deixe as conclusões ainda não confirmadas de fora.",
      confirmed: [
        "A mensagem pede que o anexo seja aberto ainda hoje.",
        "O arquivo recebido tem a extensão .zip.",
        "Não há uma nota fiscal desse fornecedor aguardada na rotina descrita.",
      ],
      unconfirmed: [
        "O arquivo contém um programa malicioso.",
        "O remetente é realmente o fornecedor cadastrado.",
        "Existe um pagamento em atraso ligado a essa mensagem.",
      ],
      feedback: "Prazo, extensão e contexto são observáveis. O conteúdo do arquivo e a identidade do remetente ainda precisam de confirmação.",
    },
    act: {
      title: "Confirme antes de abrir",
      intro: "Você pode verificar a solicitação sem depender do anexo recebido.",
      steps: [
        { label: "Pause", detail: "Não abra o arquivo por causa do prazo da mensagem." },
        { label: "Compare", detail: "Procure a compra ou a conversa que justificaria aquela nota fiscal." },
        { label: "Confirme por fora", detail: "Use um contato do fornecedor já conhecido ou o cadastro interno apropriado." },
      ],
    },
    check: {
      title: "Aplique a verificação",
      context: "A nota fiscal não era aguardada e veio em um arquivo .zip. O e-mail pede abertura imediata.",
      question: "Qual é o próximo passo mais seguro?",
      options: [
        { id: "attachment-open-zip", label: "Abrir o arquivo para descobrir a qual compra ele se refere", explanation: "O anexo não deve ser a fonte usada para confirmar um pedido inesperado." },
        { id: "attachment-confirm-context", label: "Conferir a compra e confirmar o envio por um contato já conhecido", explanation: "Isso verifica o contexto e a origem antes de expor o dispositivo ao arquivo." },
        { id: "attachment-declare-malware", label: "Tratar o arquivo como malicioso apenas por ser .zip", explanation: "A extensão exige cuidado, mas não comprova, sozinha, que o arquivo é malicioso." },
      ],
      correctOptionId: "attachment-confirm-context",
    },
    resultTitle: "Você confirmou o contexto antes de abrir o arquivo",
    related: { label: "Praticar em Uma manhã comum", href: "/simulacoes/dia-de-trabalho", description: "Na simulação, pedidos comuns e suspeitos aparecem juntos na rotina." },
  },
  "radar:manager-impersonation": {
    concept: {
      title: "Autoridade aparente não confirma identidade",
      paragraphs: [
        "Um golpista pode usar o nome de um gestor ou até uma conta conhecida para pedir uma exceção urgente.",
        "O ponto decisivo é o pedido: se ele muda o procedimento, exige sigilo ou pressiona pelo tempo, confirme por um caminho que não dependa da própria mensagem.",
      ],
      cardTitle: "Cargo não é prova",
      principle: "Uma solicitação incomum precisa ser confirmada mesmo quando parece vir de alguém conhecido.",
    },
    observe: {
      title: "Um pedido atribuído à gestão",
      instruction: "Leia a conversa fictícia e examine os detalhes antes de decidir.",
      caseLabel: "Mensagens de trabalho · Exemplo fictício",
      caseTitle: "“Preciso da lista de colaboradores agora”",
      caseBody: "“Envie diretamente para mim. Ainda não comente com a equipe; explico depois.”",
      details: [
        { label: "Nome exibido", value: "Gerência da unidade" },
        { label: "Pedido", value: "Lista de colaboradores fora do fluxo usual" },
        { label: "Pressão", value: "Urgência e sigilo" },
      ],
      clues: [
        { title: "O nome", detail: "O nome exibido indica como o contato se apresenta, não quem está usando a conta." },
        { title: "A exceção", detail: "O pedido tenta contornar o fluxo normal para enviar dados." },
        { title: "O sigilo", detail: "Pedir que ninguém seja consultado dificulta a verificação independente." },
      ],
      caution: "Não conclua que a conta foi invadida. O que você sabe é que o pedido precisa de confirmação.",
    },
    evidence: {
      title: "Separe pedido e identidade",
      instruction: "Selecione os fatos da conversa. Não inclua hipóteses sobre quem a enviou.",
      confirmed: [
        "A mensagem pede uma lista de colaboradores.",
        "O pedido solicita sigilo em relação à equipe.",
        "A solicitação foge do fluxo usual descrito no caso.",
      ],
      unconfirmed: [
        "O gestor verdadeiro enviou a mensagem.",
        "A conta do gestor foi invadida.",
        "Há autorização para enviar a lista por esse canal.",
      ],
      feedback: "O pedido, o sigilo e a exceção são visíveis. A identidade e a autorização ainda não foram confirmadas.",
    },
    act: {
      title: "Confirme a solicitação por fora da conversa",
      intro: "A verificação deve preservar os dados até que a origem e a autorização estejam claras.",
      steps: [
        { label: "Não envie", detail: "Mantenha a lista fora da conversa enquanto houver dúvida." },
        { label: "Retome o fluxo", detail: "Confira se esse tipo de compartilhamento foi solicitado pelo procedimento habitual." },
        { label: "Confirme", detail: "Procure o gestor por um contato já conhecido, sem usar os dados fornecidos na mensagem." },
      ],
    },
    check: {
      title: "Decida antes de compartilhar",
      context: "Uma mensagem com nome de gestor pede dados de colaboradores, urgência e sigilo fora do fluxo usual.",
      question: "O que fazer antes de enviar a lista?",
      options: [
        { id: "manager-send-private", label: "Enviar em particular, já que a mensagem usa o nome do gestor", explanation: "O nome exibido e o sigilo não confirmam a identidade nem autorizam o envio." },
        { id: "manager-verify-known", label: "Segurar o envio e confirmar o pedido por um contato já conhecido", explanation: "A confirmação independente permite verificar a origem e a autorização sem expor os dados." },
        { id: "manager-accuse-account", label: "Avisar que a conta do gestor foi invadida", explanation: "O caso mostra um pedido suspeito, mas não comprova invasão da conta." },
      ],
      correctOptionId: "manager-verify-known",
    },
    resultTitle: "Você confirmou o pedido antes de compartilhar dados",
    related: { label: "Praticar em A conversa já estava acontecendo", href: "/missoes/a-conversa-ja-estava-acontecendo", description: "Na missão, um pedido muda de rumo dentro de uma conversa aparentemente familiar." },
  },
  "radar:mfa-fatigue": {
    concept: {
      title: "Uma aprovação só faz sentido após o seu acesso",
      paragraphs: [
        "A autenticação em duas etapas pede uma confirmação extra quando alguém tenta entrar em uma conta.",
        "Se você não iniciou o acesso, a repetição da notificação não a torna confiável. Aprovar para fazer os avisos pararem pode permitir uma entrada indevida.",
      ],
      cardTitle: "Insistência não é legitimidade",
      principle: "A pergunta principal é simples: fui eu quem tentou entrar agora?",
    },
    observe: {
      title: "O celular pede aprovação várias vezes",
      instruction: "Confira o que aconteceu no exemplo fictício e abra os detalhes.",
      caseLabel: "Autenticação · Exemplo fictício",
      caseTitle: "Aprovar tentativa de acesso?",
      caseBody: "Três solicitações chegaram em poucos minutos enquanto você trabalhava sem tentar entrar em uma conta.",
      details: [
        { label: "Solicitações", value: "3 notificações de aprovação" },
        { label: "Seu acesso", value: "Nenhum login iniciado agora" },
        { label: "Ação pedida", value: "Aprovar ou recusar" },
      ],
      clues: [
        { title: "A origem", detail: "Você não iniciou o login correspondente às notificações." },
        { title: "A repetição", detail: "Vários avisos seguidos podem pressionar uma decisão automática." },
        { title: "O limite", detail: "O aviso, sozinho, não identifica quem tentou entrar nem como obteve os dados." },
      ],
      caution: "Você não precisa descobrir a causa da tentativa antes de recusar uma aprovação que não iniciou.",
    },
    evidence: {
      title: "O que já está claro?",
      instruction: "Selecione o que o caso informa, sem adivinhar quem está tentando entrar.",
      confirmed: [
        "Chegaram três solicitações de aprovação.",
        "Você não iniciou um login naquele momento.",
        "As solicitações apareceram em poucos minutos.",
      ],
      unconfirmed: [
        "Uma pessoa específica conhece sua senha.",
        "Todas as notificações vieram de um ataque deliberado.",
        "A conta já foi acessada por outra pessoa.",
      ],
      feedback: "As notificações e a ausência de um login seu são fatos. A origem e o resultado da tentativa ainda não estão comprovados.",
    },
    act: {
      title: "Não aprove o acesso que você não iniciou",
      intro: "Interrompa a pressão e procure ajuda pelo caminho habitual da organização.",
      steps: [
        { label: "Recuse", detail: "Não aprove a solicitação apenas para encerrar os avisos." },
        { label: "Registre", detail: "Anote horários e o que apareceu na notificação." },
        { label: "Comunique", detail: "Procure o suporte ou a equipe responsável pelo canal interno que você já conhece." },
      ],
    },
    check: {
      title: "Responda à solicitação",
      context: "Você não está tentando entrar em uma conta, mas recebe várias notificações pedindo aprovação.",
      question: "Qual decisão reduz o risco agora?",
      options: [
        { id: "mfa-approve-stop", label: "Aprovar uma vez para os avisos pararem", explanation: "A repetição não transforma uma tentativa desconhecida em um acesso autorizado." },
        { id: "mfa-deny-report", label: "Recusar, registrar o ocorrido e avisar pelo canal interno conhecido", explanation: "Você não iniciou o acesso; recusar e comunicar permite investigar sem conceder a aprovação." },
        { id: "mfa-ignore-forever", label: "Ignorar e não comunicar, pois nenhum acesso foi confirmado", explanation: "Mesmo sem aprovação, solicitações inesperadas merecem ser comunicadas à equipe responsável." },
      ],
      correctOptionId: "mfa-deny-report",
    },
    resultTitle: "Você recusou uma aprovação que não iniciou",
    related: { label: "Praticar em Você iniciou este acesso?", href: "/missoes/voce-iniciou-este-acesso", description: "Na missão, você lida com avisos insistentes e uma abordagem falsa de suporte." },
  },
  "radar:message-scams": {
    concept: {
      title: "Foto e nome podem acompanhar um número novo",
      paragraphs: [
        "Em aplicativos de mensagem, alguém pode usar a foto e o nome de uma pessoa conhecida para iniciar uma conversa por outro número.",
        "Uma lembrança ou detalhe do trabalho também não prova identidade. Quando o pedido muda o padrão, confirme pelo contato que você já tinha.",
      ],
      cardTitle: "Perfil não é identidade",
      principle: "Compare número, contexto e pedido antes de compartilhar informações ou atender a uma urgência.",
    },
    observe: {
      title: "O contato diz que trocou de número",
      instruction: "Leia a conversa fictícia e examine o que mudou.",
      caseLabel: "Aplicativo de mensagens · Exemplo fictício",
      caseTitle: "“Sou eu, este é meu número novo”",
      caseBody: "O perfil usa uma foto conhecida e pede que você encaminhe uma relação de clientes ainda hoje.",
      details: [
        { label: "Perfil", value: "Nome e foto familiares" },
        { label: "Número", value: "Diferente do contato salvo" },
        { label: "Pedido", value: "Relação de clientes por mensagem" },
      ],
      clues: [
        { title: "O número", detail: "A conversa começou em um número diferente do contato que você já tinha." },
        { title: "O perfil", detail: "Nome e foto podem ser reproduzidos por outra pessoa." },
        { title: "O pedido", detail: "Encaminhar dados de clientes por mensagem foge do contexto habitual descrito." },
      ],
      caution: "A mudança de número é uma alegação da própria conversa. Confirme antes de tratá-la como fato.",
    },
    evidence: {
      title: "O perfil comprova o quê?",
      instruction: "Selecione os sinais que você consegue observar; não marque a identidade como confirmada.",
      confirmed: [
        "A mensagem veio de um número diferente do contato salvo.",
        "O perfil mostra nome e foto familiares.",
        "A conversa pede uma relação de clientes.",
      ],
      unconfirmed: [
        "A pessoa conhecida realmente trocou de número.",
        "A foto pertence a quem enviou a mensagem.",
        "O envio da relação de clientes foi autorizado.",
      ],
      feedback: "Número, aparência do perfil e pedido são visíveis. Identidade e autorização ainda precisam de confirmação independente.",
    },
    act: {
      title: "Volte ao contato que você já conhece",
      intro: "A conversa nova não deve fornecer a própria prova de identidade.",
      steps: [
        { label: "Segure os dados", detail: "Não encaminhe a relação pela conversa nova." },
        { label: "Compare", detail: "Observe o número e o tipo de pedido em relação ao histórico conhecido." },
        { label: "Confirme", detail: "Contate a pessoa pelo número ou canal que já constava dos seus registros." },
      ],
    },
    check: {
      title: "Confirme o contato",
      context: "Uma conversa com foto familiar, mas número novo, pede dados de clientes fora do padrão habitual.",
      question: "O que fazer antes de responder ao pedido?",
      options: [
        { id: "message-trust-photo", label: "Enviar, porque a foto e o nome são os mesmos", explanation: "Foto e nome podem ser copiados e não confirmam quem controla o número." },
        { id: "message-confirm-old-contact", label: "Segurar os dados e confirmar pelo contato que já estava salvo", explanation: "A referência anterior é independente da conversa nova e permite verificar a mudança." },
        { id: "message-ask-new-number", label: "Pedir ao número novo que confirme a própria identidade", explanation: "A resposta viria da mesma fonte que fez a alegação; isso não cria uma confirmação independente." },
      ],
      correctOptionId: "message-confirm-old-contact",
    },
    resultTitle: "Você confirmou a identidade fora da conversa nova",
    related: { label: "Praticar em Quem enviou de verdade?", href: "/phishlab/quem-enviou-de-verdade", description: "No PhishLab, investigue quais sinais de uma mensagem realmente comprovam a origem." },
  },
  "radar:after-click": {
    concept: {
      title: "Depois do clique, descreva o que aconteceu",
      paragraphs: [
        "Abrir uma página suspeita, informar uma senha e baixar um arquivo são situações diferentes. A resposta começa por identificar qual delas ocorreu.",
        "Não esconda o episódio nem tente adivinhar sozinho se houve comprometimento. Interrompa a interação e comunique os fatos observados cedo.",
      ],
      cardTitle: "Fato antes de diagnóstico",
      principle: "Relate a ação realizada e o que apareceu na tela, sem presumir um dano que ainda não foi verificado.",
    },
    observe: {
      title: "Você abriu uma página inesperada",
      instruction: "Veja até onde a interação foi no caso fictício.",
      caseLabel: "Navegador · Exemplo fictício",
      caseTitle: "A página pediu sua senha de trabalho",
      caseBody: "Você clicou em um link recebido por mensagem. A página abriu, mas você não digitou dados nem baixou arquivos.",
      details: [
        { label: "Ação feita", value: "Link aberto" },
        { label: "Dados informados", value: "Nenhum" },
        { label: "Arquivo baixado", value: "Nenhum" },
      ],
      clues: [
        { title: "O clique", detail: "A página foi aberta. Esse é o fato que deve entrar no relato." },
        { title: "Os dados", detail: "Nenhuma senha foi digitada; não trate esse caso como envio de credenciais." },
        { title: "A incerteza", detail: "A aparência da página não mostra, sozinha, se houve algum efeito no dispositivo." },
      ],
      caution: "Informe exatamente o que ocorreu. A equipe responsável pode orientar os próximos passos conforme o caso.",
    },
    evidence: {
      title: "Que fatos entram no relato?",
      instruction: "Selecione apenas o que aconteceu; deixe diagnósticos não confirmados de fora.",
      confirmed: [
        "Você abriu o link recebido por mensagem.",
        "A página exibiu um pedido de senha.",
        "Você não informou dados nem baixou arquivos.",
      ],
      unconfirmed: [
        "Sua senha foi roubada.",
        "Um programa foi instalado no dispositivo.",
        "A conta já foi acessada por outra pessoa.",
      ],
      feedback: "O clique, a página e as ações que você não fez compõem um relato útil. Roubo de senha ou instalação são hipóteses neste caso.",
    },
    act: {
      title: "Interrompa e comunique o ocorrido",
      intro: "A resposta deve acompanhar os fatos deste caso: houve um clique, sem envio de dados ou download.",
      steps: [
        { label: "Pare", detail: "Não digite a senha nem continue seguindo instruções da página." },
        { label: "Preserve os fatos", detail: "Anote o link, a origem da mensagem e o que a página pediu." },
        { label: "Comunique cedo", detail: "Relate o clique pelo canal interno conhecido e siga a orientação recebida." },
      ],
    },
    check: {
      title: "Escolha o próximo passo",
      context: "Você abriu uma página que pediu senha, mas não digitou nada nem baixou arquivos.",
      question: "Como agir e relatar esse caso?",
      options: [
        { id: "click-hide-event", label: "Fechar e não contar a ninguém, pois nenhuma senha foi digitada", explanation: "Mesmo sem digitar dados, o clique pode ser comunicado com os fatos conhecidos para receber orientação." },
        { id: "click-report-facts", label: "Parar, registrar o link e relatar exatamente o que fez pelo canal interno conhecido", explanation: "O relato rápido e preciso permite que a equipe responsável avalie o caso sem conclusões inventadas." },
        { id: "click-claim-password", label: "Informar que sua senha foi roubada e trocar tudo imediatamente", explanation: "Neste caso nenhuma senha foi digitada; descreva os fatos e siga a orientação para essa situação específica." },
      ],
      correctOptionId: "click-report-facts",
    },
    resultTitle: "Você relatou o clique com precisão",
    related: { label: "Praticar em Cliquei. E agora?", href: "/missoes/cliquei-e-agora", description: "Na missão, escolha como conter e reportar diferentes situações após uma ação suspeita." },
  },
};

export function findAdditionalRadarLesson(activityId: string): RadarLesson | null {
  return Object.hasOwn(ADDITIONAL_RADAR_LESSONS, activityId)
    ? ADDITIONAL_RADAR_LESSONS[activityId]
    : null;
}
