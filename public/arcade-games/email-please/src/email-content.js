(function exposeEmailContent(root, factory) {
  const content = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = content;
  }

  root.EmailPleaseContent = content;
})(typeof globalThis !== "undefined" ? globalThis : this, function createEmailContent() {
  "use strict";

  const partners = {
    aurora: {
      id: "aurora",
      name: "Aurora Contábil",
      baseDomain: "aurora-contabil.nac",
      serviceDomains: ["portal.aurora-contabil.nac"],
      contacts: {
        "helena-voss": {
          id: "helena-voss",
          name: "Helena Voss",
          firstName: "Helena",
          localPart: "helena.voss",
          role: "Auditora",
        },
        "mauro-reis": {
          id: "mauro-reis",
          name: "Mauro Reis",
          firstName: "Mauro",
          localPart: "mauro.reis",
          role: "Analista Fiscal",
        },
        "caio-neri": {
          id: "caio-neri",
          name: "Caio Neri",
          firstName: "Caio",
          localPart: "caio.neri",
          role: "Suporte Técnico",
        },
      },
    },
  };

  function protocolSentence(facts) {
    return facts.protocol
      ? `Registro de auditoria: ${facts.protocol}.`
      : "O registro de auditoria não foi informado.";
  }

  const operations = {
    "aurora-audit-spreadsheet": {
      id: "aurora-audit-spreadsheet",
      partnerId: "aurora",
      allowedContactIds: ["helena-voss"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: "AUD",
      purpose: "auditoria",
      attachment: {
        type: "xlsx",
        scanner: { label: "MACROS", value: "AUSENTES" },
      },
      subjectBuilders: [
        (facts) => `Auditoria de ${facts.period} // ${facts.protocol ?? "sem registro"}`,
        (facts) => `Planilha de revisão fiscal // ${facts.protocol ?? "registro ausente"}`,
        (facts) => `Conferência automatizada de ${facts.period}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Inspetor,",
            "",
            `Encaminho a planilha referente à auditoria de ${facts.period}.`,
            protocolSentence(facts),
            "Confira os valores antes de concluir a auditoria.",
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Boa tarde,",
            "",
            `A revisão fiscal de ${facts.period} está pronta para conferência.`,
            protocolSentence(facts),
            "A planilha contém os valores e fórmulas para conferência.",
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Setor Financeiro,",
            "",
            `Segue o fechamento automatizado do período de ${facts.period}.`,
            protocolSentence(facts),
            "Os dados estão prontos para análise.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "aurora-monthly-balance": {
      id: "aurora-monthly-balance",
      partnerId: "aurora",
      allowedContactIds: ["mauro-reis"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: null,
      purpose: "balancete",
      attachment: {
        type: "xlsx",
        scanner: { label: "MACROS", value: "AUSENTES" },
      },
      subjectBuilders: [
        (facts) => `Balancete mensal // ${facts.period}`,
        (facts) => `Demonstrativo fiscal de ${facts.period}`,
        () => "Documentos para conciliação",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Financeiro,",
            "",
            `Segue o balancete consolidado de ${facts.period}.`,
            "O arquivo não utiliza automações ou macros.",
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Bom dia,",
            "",
            `Encaminho os valores revisados para a conciliação de ${facts.period}.`,
            "A planilha contém somente dados e fórmulas comuns.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "aurora-tax-opinion": {
      id: "aurora-tax-opinion",
      partnerId: "aurora",
      allowedContactIds: ["mauro-reis"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: null,
      purpose: "parecer-fiscal",
      attachment: {
        type: "pdf",
        scanner: { label: "SCRIPT", value: "AUSENTE" },
      },
      subjectBuilders: [
        (facts) => `Parecer fiscal // ${facts.period}`,
        () => "Orientação sobre recolhimento",
        (facts) => `Relatório tributário de ${facts.period}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Prezados,",
            "",
            `Encaminho o parecer fiscal referente a ${facts.period}.`,
            "O documento anexo contém a fundamentação e os valores revisados.",
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Setor Financeiro,",
            "",
            `Concluímos a análise tributária de ${facts.period}.`,
            "O relatório segue em PDF para arquivamento.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "aurora-fiscal-draft": {
      id: "aurora-fiscal-draft",
      partnerId: "aurora",
      allowedContactIds: ["mauro-reis"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: null,
      purpose: "minuta-fiscal",
      attachment: {
        type: "docx",
        scanner: { label: "MACROS", value: "AUSENTES" },
      },
      subjectBuilders: [
        (facts) => `Minuta fiscal de ${facts.period}`,
        () => "Revisão de texto para o fechamento",
      ],
      bodyBuilders: [
        (facts) => [
          "Financeiro,",
          "",
          `Segue a minuta fiscal de ${facts.period} para revisão antes do fechamento.`,
          "O documento anexo contém somente texto e tabelas.",
          "",
          facts.sender.name,
        ].join("\n"),
        (facts) => [
          "Bom dia,",
          "",
          "Encaminho a versão editável da orientação tributária.",
          "Confiram os dados antes de devolver os comentários.",
          "",
          facts.sender.name,
        ].join("\n"),
      ],
    },
    "aurora-fiscal-notice": {
      id: "aurora-fiscal-notice",
      partnerId: "aurora",
      allowedContactIds: ["mauro-reis"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: null,
      purpose: "aviso-fiscal",
      attachment: null,
      subjectBuilders: [
        (facts) => `Agenda fiscal de ${facts.period}`,
        () => "Confirmação de reunião contábil",
      ],
      bodyBuilders: [
        (facts) => [
          "Financeiro,",
          "",
          `A conferência de ${facts.period} foi incluída na agenda da equipe.`,
          "Não há arquivos para abrir nesta mensagem.",
          "",
          facts.sender.name,
        ].join("\n"),
        (facts) => [
          "Olá,",
          "",
          "Confirmo o horário da reunião para revisar o fechamento fiscal.",
          "Os documentos serão tratados pelo canal habitual.",
          "",
          facts.sender.name,
        ].join("\n"),
      ],
    },
    "aurora-support-link": {
      id: "aurora-support-link",
      partnerId: "aurora",
      allowedContactIds: ["caio-neri"],
      allowedDepartments: ["ti"],
      requiredProtocolPrefix: null,
      purpose: "suporte",
      attachment: null,
      link: {
        domain: "portal.aurora-contabil.nac",
        path: "/suporte/chamado",
      },
      subjectBuilders: [
        () => "Acompanhamento de chamado",
        () => "Portal de suporte Aurora",
        () => "Dados adicionais para atendimento",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Equipe de TI,",
            "",
            "O chamado foi atualizado no portal de suporte da Aurora.",
            `Consulte: ${facts.link.url}`,
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Olá,",
            "",
            "Incluímos novas informações no atendimento em andamento.",
            `Acesso ao chamado: ${facts.link.url}`,
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
  };

  const internalEmployeeIds = [
    "internal-livia-nunes",
    "internal-otavio-mendes",
    "internal-caio-ferraz",
    "internal-davi-lacerda",
    "internal-elisa-prado",
    "internal-tomas-leal",
    "internal-renata-azevedo",
    "internal-dario-salles",
  ];
  const internalDepartments = ["financeiro", "juridico", "rh", "ti"];
  const internalDirectory = {
    id: "correio-corporativo",
    name: "Correio Corporativo",
    baseDomain: "correio.corp",
    serviceDomains: [
      "acesso.correio.corp",
      "arquivos.correio.corp",
      "suporte.correio.corp",
    ],
    contacts: {
      "internal-livia-nunes": {
        id: "internal-livia-nunes",
        kind: "employee",
        name: "Lívia Nunes",
        firstName: "Lívia",
        localPart: "livia.nunes",
        role: "Analista de RH",
        department: "rh",
      },
      "internal-otavio-mendes": {
        id: "internal-otavio-mendes",
        kind: "employee",
        name: "Otávio Mendes",
        firstName: "Otávio",
        localPart: "otavio.mendes",
        role: "Gerente de Pessoal",
        department: "rh",
      },
      "internal-caio-ferraz": {
        id: "internal-caio-ferraz",
        kind: "employee",
        name: "Caio Ferraz",
        firstName: "Caio",
        localPart: "caio.ferraz",
        role: "Técnico de Suporte",
        department: "ti",
      },
      "internal-davi-lacerda": {
        id: "internal-davi-lacerda",
        kind: "employee",
        name: "Davi Lacerda",
        firstName: "Davi",
        localPart: "davi.lacerda",
        role: "Administrador de Sistemas",
        department: "ti",
      },
      "internal-elisa-prado": {
        id: "internal-elisa-prado",
        kind: "employee",
        name: "Elisa Prado",
        firstName: "Elisa",
        localPart: "elisa.prado",
        role: "Analista Financeiro",
        department: "financeiro",
      },
      "internal-tomas-leal": {
        id: "internal-tomas-leal",
        kind: "employee",
        name: "Tomás Leal",
        firstName: "Tomás",
        localPart: "tomas.leal",
        role: "Gerente Financeiro",
        department: "financeiro",
      },
      "internal-renata-azevedo": {
        id: "internal-renata-azevedo",
        kind: "employee",
        name: "Renata Azevedo",
        firstName: "Renata",
        localPart: "renata.azevedo",
        role: "Assistente Jurídico",
        department: "juridico",
      },
      "internal-dario-salles": {
        id: "internal-dario-salles",
        kind: "employee",
        name: "Dário Salles",
        firstName: "Dário",
        localPart: "dario.salles",
        role: "Advogado Corporativo",
        department: "juridico",
      },
      "internal-access-service": {
        id: "internal-access-service",
        kind: "service",
        name: "Central de Acesso",
        firstName: "Central",
        localPart: "acesso",
        role: "SISTEMA AUTOMÁTICO",
        department: "ti",
      },
      "internal-files-service": {
        id: "internal-files-service",
        kind: "service",
        name: "Serviço de Arquivos",
        firstName: "Serviço",
        localPart: "arquivos",
        role: "SISTEMA AUTOMÁTICO",
        department: "ti",
      },
      "internal-support-service": {
        id: "internal-support-service",
        kind: "service",
        name: "Central de Suporte",
        firstName: "Central",
        localPart: "suporte",
        role: "SISTEMA AUTOMÁTICO",
        department: "ti",
      },
    },
  };

  function internalProtocolSentence(facts, label = "Protocolo") {
    return facts.protocol
      ? `${label}: ${facts.protocol}.`
      : `${label} não informado.`;
  }

  function internalDepartmentLabel(facts) {
    const labels = {
      financeiro: "Financeiro",
      juridico: "Jurídico",
      rh: "RH",
      ti: "TI",
    };
    return labels[facts.recipient.department] ?? facts.recipient.department;
  }

  const internalOperations = {
    "internal-common-message": {
      id: "internal-common-message",
      sourceType: "internal",
      allowedContactIds: internalEmployeeIds,
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: null,
      purpose: "comunicado-interno",
      attachment: null,
      subjectBuilders: [
        (facts) => `Alinhamento interno de ${facts.period}`,
        () => "Atualização da equipe",
        () => "Confirmação de agenda",
      ],
      bodyBuilders: [
        (facts) =>
          [
            `${internalDepartmentLabel(facts)},`,
            "",
            `O alinhamento interno de ${facts.period} foi confirmado.`,
            "Não há documentos ou ações adicionais nesta mensagem.",
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Olá,",
            "",
            "A pauta compartilhada foi atualizada pela equipe.",
            "Este comunicado é apenas informativo.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-profile-update-link": {
      id: "internal-profile-update-link",
      sourceType: "internal",
      allowedContactIds: ["internal-livia-nunes", "internal-otavio-mendes"],
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: null,
      purpose: "atualizacao-cadastral",
      attachment: null,
      link: {
        domain: "acesso.correio.corp",
        path: "/perfil/atualizar",
      },
      subjectBuilders: [
        () => "Revisão cadastral interna",
        () => "Atualização de dados funcionais",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Funcionário,",
            "",
            "O RH abriu o período de revisão dos dados funcionais.",
            `Acesse o portal corporativo: ${facts.link.url}`,
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-profile-update-pdf": {
      id: "internal-profile-update-pdf",
      sourceType: "internal",
      allowedContactIds: ["internal-livia-nunes", "internal-otavio-mendes"],
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: null,
      purpose: "atualizacao-cadastral",
      attachment: {
        type: "pdf",
        scanner: { label: "SCRIPT", value: "AUSENTE" },
      },
      subjectBuilders: [
        () => "Orientações para atualização cadastral",
        (facts) => `Formulário funcional // ${facts.period}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Funcionário,",
            "",
            "Segue o documento com as orientações para revisão cadastral.",
            "O PDF é somente informativo e não contém formulário ativo.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-payroll-clean-xlsx": {
      id: "internal-payroll-clean-xlsx",
      sourceType: "internal",
      allowedContactIds: ["internal-otavio-mendes"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: "FOL",
      purpose: "folha-pagamento",
      attachment: {
        type: "xlsx",
        scanner: { label: "MACROS", value: "AUSENTES" },
      },
      subjectBuilders: [
        (facts) => `Resumo da folha // ${facts.protocol}`,
        (facts) => `Planilha consolidada de ${facts.period}`,
        (facts) => `Fechamento da folha // ${facts.protocol}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Financeiro,",
            "",
            `Encaminho o resumo consolidado da folha de ${facts.period}.`,
            internalProtocolSentence(facts, "Registro da folha"),
            "Confira os totais antes do processamento.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-support-request": {
      id: "internal-support-request",
      sourceType: "internal",
      allowedContactIds: internalEmployeeIds,
      allowedDepartments: ["ti"],
      requiredProtocolPrefix: "SUP",
      purpose: "chamado-suporte",
      attachment: null,
      subjectBuilders: [
        (facts) => `Chamado de suporte // ${facts.protocol}`,
        () => "Falha em estação de trabalho",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Equipe de TI,",
            "",
            "Solicito análise de uma falha na estação de trabalho.",
            internalProtocolSentence(facts, "Chamado"),
            "Não há arquivos anexados.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-support-pdf": {
      id: "internal-support-pdf",
      sourceType: "internal",
      allowedContactIds: internalEmployeeIds,
      allowedDepartments: ["ti"],
      requiredProtocolPrefix: "SUP",
      purpose: "chamado-suporte",
      attachment: {
        type: "pdf",
        scanner: { label: "SCRIPT", value: "AUSENTE" },
      },
      subjectBuilders: [
        (facts) => `Relatório do chamado // ${facts.protocol}`,
        () => "Registro visual de falha",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Equipe de TI,",
            "",
            "Anexo o relatório estático com as mensagens apresentadas pelo sistema.",
            internalProtocolSentence(facts, "Chamado"),
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-maintenance-bat": {
      id: "internal-maintenance-bat",
      sourceType: "internal",
      allowedContactIds: ["internal-davi-lacerda"],
      allowedDepartments: ["ti"],
      requiredProtocolPrefix: "MAN",
      purpose: "manutencao-tecnica",
      attachment: {
        type: "bat",
        scanner: { label: "COMPORTAMENTO", value: "NAO VERIFICADO" },
      },
      subjectBuilders: [
        (facts) => `Rotina de manutenção // ${facts.protocol}`,
        () => "Ajuste das estações do setor",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Equipe de TI,",
            "",
            "Segue a rotina de manutenção preparada para as estações internas.",
            internalProtocolSentence(facts, "Janela de manutenção"),
            "O comportamento ainda não foi classificado pelo scanner.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-deployment-exe": {
      id: "internal-deployment-exe",
      sourceType: "internal",
      allowedContactIds: ["internal-davi-lacerda"],
      allowedDepartments: ["ti"],
      requiredProtocolPrefix: "DEP",
      purpose: "implantacao-software",
      attachment: {
        type: "exe",
        scanner: { label: "REPUTACAO", value: "SEM ALERTAS" },
      },
      subjectBuilders: [
        (facts) => `Utilitário de implantação // ${facts.protocol}`,
        () => "Pacote para estações internas",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Equipe de TI,",
            "",
            "Encaminho o utilitário aprovado para a implantação interna.",
            internalProtocolSentence(facts, "Mudança"),
            "A reputação do arquivo não apresenta alertas.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-deployment-msi": {
      id: "internal-deployment-msi",
      sourceType: "internal",
      allowedContactIds: ["internal-davi-lacerda"],
      allowedDepartments: ["ti"],
      requiredProtocolPrefix: "DEP",
      purpose: "implantacao-software",
      attachment: {
        type: "msi",
        scanner: { label: "PUBLICADOR", value: "VERIFICADO" },
      },
      subjectBuilders: [
        (facts) => `Instalador corporativo // ${facts.protocol}`,
        () => "Atualização de aplicativo interno",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Equipe de TI,",
            "",
            "Segue o instalador da atualização prevista para as estações internas.",
            internalProtocolSentence(facts, "Mudança"),
            "O pacote possui publicador verificado.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-financial-report": {
      id: "internal-financial-report",
      sourceType: "internal",
      allowedContactIds: ["internal-elisa-prado", "internal-tomas-leal"],
      allowedDepartments: ["rh", "juridico"],
      requiredProtocolPrefix: "FIN",
      purpose: "relatorio-financeiro",
      attachment: {
        type: "xlsx",
        scanner: { label: "MACROS", value: "AUSENTES" },
      },
      subjectBuilders: [
        (facts) => `Relatório financeiro // ${facts.protocol}`,
        (facts) => `Consolidação de ${facts.period}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            `${internalDepartmentLabel(facts)},`,
            "",
            `Encaminho o relatório financeiro consolidado de ${facts.period}.`,
            internalProtocolSentence(facts, "Registro financeiro"),
            "A planilha não utiliza macros.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-legal-policy-pdf": {
      id: "internal-legal-policy-pdf",
      sourceType: "internal",
      allowedContactIds: ["internal-dario-salles"],
      allowedDepartments: ["rh", "financeiro"],
      requiredProtocolPrefix: "JUR",
      purpose: "politica-juridica",
      attachment: {
        type: "pdf",
        scanner: { label: "SCRIPT", value: "AUSENTE" },
      },
      subjectBuilders: [
        (facts) => `Orientação jurídica // ${facts.protocol}`,
        () => "Atualização de política corporativa",
      ],
      bodyBuilders: [
        (facts) =>
          [
            `${internalDepartmentLabel(facts)},`,
            "",
            "Segue a orientação jurídica aprovada para aplicação interna.",
            internalProtocolSentence(facts, "Registro jurídico"),
            "O PDF não contém scripts.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-legal-policy-docx": {
      id: "internal-legal-policy-docx",
      sourceType: "internal",
      allowedContactIds: ["internal-dario-salles"],
      allowedDepartments: ["rh", "financeiro"],
      requiredProtocolPrefix: "JUR",
      purpose: "politica-juridica",
      attachment: {
        type: "docx",
        scanner: { label: "MACROS", value: "AUSENTES" },
      },
      subjectBuilders: [
        (facts) => `Minuta corporativa // ${facts.protocol}`,
        () => "Documento jurídico para revisão",
      ],
      bodyBuilders: [
        (facts) =>
          [
            `${internalDepartmentLabel(facts)},`,
            "",
            "Encaminho a minuta corporativa para revisão do setor.",
            internalProtocolSentence(facts, "Registro jurídico"),
            "O documento não possui macros.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-files-archive": {
      id: "internal-files-archive",
      sourceType: "internal",
      allowedContactIds: ["internal-files-service"],
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: "ARQ",
      purpose: "pacote-arquivos",
      attachment: {
        type: "zip",
        scanner: { label: "CONTEUDO", value: "COMPACTADO" },
      },
      subjectBuilders: [
        (facts) => `Pacote de arquivos // ${facts.protocol}`,
        (facts) => `Arquivo setorial de ${facts.period}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            `${internalDepartmentLabel(facts)},`,
            "",
            "O pacote solicitado foi exportado pelo Serviço de Arquivos.",
            internalProtocolSentence(facts, "Registro de arquivo"),
            `Destino registrado: ${internalDepartmentLabel(facts)}.`,
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-access-alert": {
      id: "internal-access-alert",
      sourceType: "internal",
      allowedContactIds: ["internal-access-service"],
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: null,
      purpose: "alerta-acesso",
      attachment: null,
      link: {
        domain: "acesso.correio.corp",
        path: "/conta/atividade",
      },
      subjectBuilders: [
        () => "Atividade recente na conta",
        () => "Revisão de acesso corporativo",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Funcionário,",
            "",
            "Uma atividade recente foi registrada na conta corporativa.",
            `Revise os dados no portal: ${facts.link.url}`,
            "O serviço nunca solicita senha por resposta.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-access-short-link": {
      id: "internal-access-short-link",
      sourceType: "internal",
      allowedContactIds: ["internal-access-service"],
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: null,
      purpose: "alerta-acesso",
      attachment: null,
      link: {
        domain: "acesso.correio.corp",
        path: "/conta/atividade",
        shortened: true,
        displayDomain: "cor.re",
      },
      subjectBuilders: [
        () => "Verificação de acesso",
        () => "Atividade da conta corporativa",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Funcionário,",
            "",
            "O endereço curto abaixo leva ao portal corporativo de acesso.",
            `Verificação: ${facts.link.url}`,
            "Analise o destino antes de prosseguir.",
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
    "internal-support-status": {
      id: "internal-support-status",
      sourceType: "internal",
      allowedContactIds: ["internal-support-service"],
      allowedDepartments: internalDepartments,
      requiredProtocolPrefix: "SUP",
      purpose: "atualizacao-chamado",
      attachment: null,
      link: {
        domain: "suporte.correio.corp",
        path: "/chamados/acompanhar",
      },
      subjectBuilders: [
        (facts) => `Atualização de chamado // ${facts.protocol}`,
        () => "Chamado interno atualizado",
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Funcionário,",
            "",
            "O chamado interno recebeu uma atualização da equipe de TI.",
            internalProtocolSentence(facts, "Chamado"),
            `Acompanhe pelo portal: ${facts.link.url}`,
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
  };

  return {
    partners,
    operations,
    internalDirectory,
    internalOperations,
  };
});
