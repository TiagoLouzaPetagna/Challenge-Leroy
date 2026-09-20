(function exposeEmailGenerator(root, factory) {
  const content =
    typeof module !== "undefined" && module.exports
      ? require("./email-content.js")
      : root.EmailPleaseContent;
  const generator = factory(content);

  if (typeof module !== "undefined" && module.exports) {
    module.exports = generator;
  }

  root.EmailPleaseGenerator = generator;
})(typeof globalThis !== "undefined" ? globalThis : this, function createEmailGenerator(content) {
  "use strict";

  if (!content) {
    throw new Error("EmailPleaseContent must be loaded before the email generator.");
  }

  const PERIODS = ["abril", "maio", "junho", "julho", "agosto", "setembro"];
  const RECIPIENTS = {
    financeiro: "financeiro@correio.corp",
    juridico: "juridico@correio.corp",
    rh: "rh@correio.corp",
    ti: "ti@correio.corp",
  };
  const DEFAULT_VALID_RATE = 0.6;
  const DEFAULT_PARTNER_RATE = 0.6;
  const DEFAULT_TURN_EMAIL_COUNT = 10;
  const SOURCE_TYPE = {
    PARTNER: "partner",
    INTERNAL: "internal",
  };
  const LINK_KIND = {
    DIRECT: "direct",
    SHORTENED: "shortened",
  };
  const LINK_RESOLUTION = {
    OK: "OK",
    UNRESOLVED: "UNRESOLVED",
  };
  const PERSISTENT_CHANGE_RATE = 0.3;
  const TEMPORARY_CHANGE_RATE = 0.65;
  const PERSISTENT_CHANGE_MAX_GAP_TURNS = 4;
  const MAX_PERSISTENT_CHANGES_PER_RUN = 4;
  const TEMPORARY_CHANGE_COOLDOWN_TURNS = 3;
  const SHORT_LINK_MAX_GAP_TURNS = 2;
  const SHORT_LINK_EARLY_RATE = 0.35;
  const SCARCE_ATTACHMENT_TYPES = new Set(["zip", "bat", "exe", "msi"]);
  const PARTNER_UNEXPECTED_ATTACHMENT_RATE = 0.5;
  const PARTNER_ATTACHMENT_VARIANTS = [
    { type: "exe", scanner: { label: "REPUTACAO", value: "SEM ALERTAS" } },
    { type: "zip", scanner: { label: "CONTEUDO", value: "COMPACTADO" } },
    { type: "docx", scanner: { label: "MACROS", value: "AUSENTES" } },
    { type: "pdf", scanner: { label: "SCRIPT", value: "AUSENTE" } },
    { type: "xlsx", scanner: { label: "MACROS", value: "AUSENTES" } },
    { type: "bat", scanner: { label: "COMPORTAMENTO", value: "NAO VERIFICADO" } },
    { type: "msi", scanner: { label: "PUBLICADOR", value: "NAO VERIFICADO" } },
  ];
  const FORMER_CONTACT_EMAIL_RATE = 0.03;
  const FORMER_CONTACT_COOLDOWN_TURNS = 2;
  const CHANGE_DURATION = {
    RUN: "RUN",
    TURN: "TURN",
  };
  const CHANGE_TYPE = {
    CONTACT_DISMISSED: "CONTACT_DISMISSED",
    CONTACT_SUSPENDED: "CONTACT_SUSPENDED",
    OPERATION_SUSPENDED: "OPERATION_SUSPENDED",
    ZIP_CAMPAIGN: "ZIP_CAMPAIGN",
    PROTOCOL_RANGE_SUSPENDED: "PROTOCOL_RANGE_SUSPENDED",
  };
  const ZIP_CAMPAIGN_CHANGE_ID = "campaign:aurora-zip";
  const AUD_48_CHANGE_ID = "suspend-protocol:AUD-48xx";
  const FOL_73_CHANGE_ID = "suspend-protocol:FOL-73xx";
  const SHORT_LINK_VARIANTS = [
    { verdict: "ACCEPT", archetypeId: "valid" },
    { verdict: "REJECT", archetypeId: "fake-link-destination" },
    { verdict: "ACCEPT", archetypeId: "valid" },
    { verdict: "REJECT", archetypeId: "short-link-unresolved" },
    { verdict: "REJECT", archetypeId: "wrong-link-path" },
    { verdict: "ACCEPT", archetypeId: "valid" },
    { verdict: "REJECT", archetypeId: "unrecognized-shortener" },
  ];

  const bulletinOperations = {
    "aurora-zip-campaign": {
      id: "aurora-zip-campaign",
      partnerId: "aurora",
      allowedContactIds: ["mauro-reis"],
      allowedDepartments: ["financeiro"],
      requiredProtocolPrefix: "CAMP",
      requiredChangeId: ZIP_CAMPAIGN_CHANGE_ID,
      purpose: "campanha-documental",
      attachment: {
        type: "zip",
        scanner: { label: "CONTEUDO", value: "COMPACTADO" },
      },
      subjectBuilders: [
        (facts) => `Pacote fiscal da campanha // ${facts.protocol}`,
        (facts) => `Documentos consolidados de ${facts.period}`,
      ],
      bodyBuilders: [
        (facts) =>
          [
            "Setor Financeiro,",
            "",
            `Segue o pacote documental da campanha de ${facts.period}.`,
            `Protocolo temporario: ${facts.protocol}.`,
            "O conteudo foi reunido em um arquivo ZIP.",
            "",
            facts.sender.name,
          ].join("\n"),
        (facts) =>
          [
            "Bom dia,",
            "",
            "Encaminho os documentos fiscais previstos na campanha vigente.",
            `Registro da campanha: ${facts.protocol}.`,
            "",
            facts.sender.name,
          ].join("\n"),
      ],
    },
  };
  const internalOperations = content.internalOperations ?? {};
  const operationsById = {
    ...content.operations,
    ...internalOperations,
    ...bulletinOperations,
  };

  function hashSeed(seed) {
    if (typeof seed === "number" && Number.isFinite(seed)) {
      return seed >>> 0;
    }

    const text = String(seed ?? "email-please");
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function createSeededRandom(seed) {
    let state = hashSeed(seed) || 0x6d2b79f5;
    return function nextRandom() {
      state += 0x6d2b79f5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function choose(items, random) {
    if (!items.length) throw new Error("Cannot choose from an empty list.");
    return items[Math.floor(random() * items.length)];
  }

  function randomDigits(random, length = 4) {
    let result = "";
    for (let index = 0; index < length; index += 1) {
      result += Math.floor(random() * 10);
    }
    return result;
  }

  function cloneData(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function createEmailContext(overrides = {}) {
    const source = cloneData(overrides) ?? {};
    return {
      ...source,
      turnNumber: Number.isInteger(source.turnNumber) ? source.turnNumber : 0,
      bulletinId: source.bulletinId ?? null,
      suspendedPartners: Array.from(new Set(source.suspendedPartners ?? [])),
      suspendedContacts: Array.from(new Set(source.suspendedContacts ?? [])),
      suspendedOperationIds: Array.from(new Set(source.suspendedOperationIds ?? [])),
      dismissedContacts: Array.from(new Set(source.dismissedContacts ?? [])),
      activeChangeIds: Array.from(new Set(source.activeChangeIds ?? [])),
      suspendedProtocolRanges: cloneData(source.suspendedProtocolRanges ?? []),
    };
  }

  function protocolMatchesSuspendedRange(protocol, range) {
    const match = /^([A-Z]+)-(\d{4})$/.exec(String(protocol ?? ""));
    if (!match || match[1] !== range.prefix) return false;
    const number = Number(match[2]);
    return number >= range.start && number <= range.end;
  }

  function isProtocolSuspended(protocol, context) {
    return context.suspendedProtocolRanges.some((range) =>
      protocolMatchesSuspendedRange(protocol, range),
    );
  }

  function operationIsEnabled(operation, context) {
    return !operation.requiredChangeId || context.activeChangeIds.includes(operation.requiredChangeId);
  }

  function operationIsSuspended(operation, context) {
    return context.suspendedOperationIds.includes(operation.id);
  }

  function operationIsAvailable(operation, context) {
    return operationIsEnabled(operation, context) && !operationIsSuspended(operation, context);
  }

  function eligibleContactIds(operation, context) {
    return operation.allowedContactIds.filter(
      (contactId) =>
        !context.dismissedContacts.includes(contactId) &&
        !context.suspendedContacts.includes(contactId),
    );
  }

  function senderFromContact(contact, partner) {
    return {
      contactId: contact.id,
      name: contact.name,
      role: contact.role,
      email: `${contact.localPart}@${partner.baseDomain}`,
      origin: "EXTERNA",
    };
  }

  function senderFromInternalContact(contact) {
    return {
      contactId: contact.id,
      kind: contact.kind,
      name: contact.name,
      role: contact.role,
      department: contact.department,
      email: `${contact.localPart}@${content.internalDirectory.baseDomain}`,
      origin: "INTERNA",
    };
  }

  function parseUrlDetails(value) {
    try {
      const parsed = new URL(String(value ?? "").trim());
      const host = parsed.hostname.toLowerCase().replace(/\.$/, "");
      return {
        href: parsed.href,
        protocol: parsed.protocol.toLowerCase(),
        host,
        path: parsed.pathname || "/",
        usesPunycode: host.split(".").some((label) => label.startsWith("xn--")),
      };
    } catch (_error) {
      return null;
    }
  }

  function extractDomain(addressOrUrl) {
    const value = String(addressOrUrl ?? "").trim().toLowerCase();
    if (!value) return "";

    if (value.includes("@") && !value.includes("://")) {
      return value.slice(value.lastIndexOf("@") + 1);
    }

    return parseUrlDetails(value)?.host ?? "";
  }

  function normalizePathPrefix(path) {
    const value = String(path ?? "/").trim();
    const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
    return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : "/";
  }

  function pathMatchesPrefix(path, expectedPrefix) {
    const actual = normalizePathPrefix(path);
    const expected = normalizePathPrefix(expectedPrefix);
    return expected === "/" || actual === expected || actual.startsWith(`${expected}/`);
  }

  function replaceUrlHost(url, host) {
    const parsed = new URL(url);
    return `${parsed.protocol}//${host}${parsed.pathname}${parsed.search}${parsed.hash}`;
  }

  function replaceUrlPath(url, path) {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}${normalizePathPrefix(path)}${parsed.search}${parsed.hash}`;
  }

  function createFalseSuffixDomain(domain) {
    return `${domain}.portal-falso.nac`;
  }

  function createUnrecognizedShortener(domain) {
    const labels = String(domain).split(".");
    labels[0] = `${labels[0]}-seguro`;
    return labels.join(".");
  }

  const HOMOGRAPH_REPLACEMENTS = [
    ["a", "а"],
    ["c", "с"],
    ["e", "е"],
    ["i", "і"],
    ["o", "о"],
    ["p", "р"],
  ];

  function homographCandidates(domain) {
    const lastDot = domain.lastIndexOf(".");
    return HOMOGRAPH_REPLACEMENTS.flatMap(([latin, unicode]) => {
      const candidates = [];
      for (let index = 0; index < lastDot; index += 1) {
        if (domain[index] === latin) candidates.push({ index, unicode });
      }
      return candidates;
    });
  }

  function createUnicodeHomographDomain(domain, random) {
    const candidates = homographCandidates(domain);
    if (!candidates.length) return null;
    const candidate = choose(candidates, random);
    return `${domain.slice(0, candidate.index)}${candidate.unicode}${domain.slice(candidate.index + 1)}`;
  }

  function syncLinkMetadata(link) {
    link.url = link.displayText;
    const targetUrl = link.shortened
      ? link.resolution === LINK_RESOLUTION.OK
        ? link.resolvedUrl
        : null
      : link.embeddedUrl;
    const target = parseUrlDetails(targetUrl);
    link.destinationDomain = target?.host ?? null;
    link.destinationPath = target?.path ?? null;
    link.usesPunycode = Boolean(target?.usesPunycode);
    return link;
  }

  function setLinkDestination(link, destinationUrl, options = {}) {
    if (link.shortened) {
      link.resolvedUrl = destinationUrl;
      link.resolution = LINK_RESOLUTION.OK;
    } else {
      link.embeddedUrl = destinationUrl;
      if (!options.preserveDisplay) link.displayText = destinationUrl;
    }
    return syncLinkMetadata(link);
  }

  function setShortenerUrl(link, shortUrl) {
    link.displayText = shortUrl;
    link.embeddedUrl = shortUrl;
    return syncLinkMetadata(link);
  }

  function setLinkUnresolved(link) {
    link.resolution = LINK_RESOLUTION.UNRESOLVED;
    link.resolvedUrl = null;
    return syncLinkMetadata(link);
  }

  function createOperationLink(operation, random) {
    if (!operation.link) return null;

    const shortened = Boolean(operation.link.shortened);
    const token = randomDigits(random, 6);
    const destinationPath = `${normalizePathPrefix(operation.link.path)}/${token}`;
    const destinationUrl = `https://${operation.link.domain}${destinationPath}`;
    const displayUrl = shortened
      ? `https://${operation.link.displayDomain}/r/${token}`
      : destinationUrl;
    return syncLinkMetadata({
      kind: shortened ? LINK_KIND.SHORTENED : LINK_KIND.DIRECT,
      displayText: displayUrl,
      embeddedUrl: displayUrl,
      resolvedUrl: shortened ? destinationUrl : null,
      resolution: LINK_RESOLUTION.OK,
      shortened,
      scannable: true,
    });
  }

  function operationHasDirectLink(operation) {
    return Boolean(operation.link && !operation.link.shortened);
  }

  function operationHasShortLink(operation) {
    return Boolean(operation.link?.shortened && operation.link.displayDomain);
  }

  function operationSupportsHomograph(operation) {
    return operationHasDirectLink(operation) && homographCandidates(operation.link.domain).length > 0;
  }

  function currentLinkDestination(link) {
    return link.shortened ? link.resolvedUrl : link.embeddedUrl;
  }

  function mutateLinkToFalseDestination(facts, operation) {
    const destinationUrl = currentLinkDestination(facts.link);
    const fakeDomain = createFalseSuffixDomain(operation.link.domain);
    setLinkDestination(facts.link, replaceUrlHost(destinationUrl, fakeDomain));
  }

  function mutateLinkToWrongPath(facts, _operation, _owner, random) {
    const destinationUrl = currentLinkDestination(facts.link);
    const wrongPath = `/portal/validar/${randomDigits(random, 6)}`;
    setLinkDestination(facts.link, replaceUrlPath(destinationUrl, wrongPath));
  }

  function mutateLinkTargetMismatch(facts, operation) {
    const fakeDomain = createFalseSuffixDomain(operation.link.domain);
    const hiddenDestination = replaceUrlHost(facts.link.embeddedUrl, fakeDomain);
    setLinkDestination(facts.link, hiddenDestination, { preserveDisplay: true });
  }

  function mutateLinkToUnicodeHomograph(facts, operation, _owner, random) {
    const homographDomain = createUnicodeHomographDomain(operation.link.domain, random);
    const homographUrl = replaceUrlHost(facts.link.embeddedUrl, homographDomain);
    setLinkDestination(facts.link, homographUrl);
  }

  function mutateLinkToUnrecognizedShortener(facts, operation) {
    const fakeShortener = createUnrecognizedShortener(operation.link.displayDomain);
    setShortenerUrl(
      facts.link,
      replaceUrlHost(facts.link.embeddedUrl, fakeShortener),
    );
    mutateLinkToFalseDestination(facts, operation);
  }

  function authorizedPartnerAttachmentTypes(partner, contactId) {
    return new Set(
      Object.values(content.operations)
        .filter((operation) => operation.partnerId === partner.id &&
          operation.allowedContactIds.includes(contactId))
        .map((operation) => operation.attachment?.type)
        .filter(Boolean),
    );
  }

  function mutateUnexpectedPartnerAttachment(facts, _operation, partner, random, _context, options = {}) {
    const authorizedTypes = authorizedPartnerAttachmentTypes(partner, facts.sender.contactId);
    const unauthorized = PARTNER_ATTACHMENT_VARIANTS.filter(
      (attachment) => !authorizedTypes.has(attachment.type),
    );
    const selected = options.attachmentType
      ? unauthorized.find((attachment) => attachment.type === options.attachmentType)
      : choose(unauthorized, random);
    if (!selected) throw new Error(`Attachment ${options.attachmentType} is authorized for this contact.`);
    facts.attachment = cloneData(selected);
  }

  function createBaseFacts(operation, partner, random, contactIds = operation.allowedContactIds) {
    const contactId = choose(contactIds, random);
    const contact = partner.contacts[contactId];
    const department = choose(operation.allowedDepartments, random);
    const protocol = operation.requiredProtocolPrefix
      ? `${operation.requiredProtocolPrefix}-${randomDigits(random)}`
      : null;
    const link = createOperationLink(operation, random);

    return {
      sourceType: SOURCE_TYPE.PARTNER,
      partnerId: partner.id,
      operationId: operation.id,
      sender: senderFromContact(contact, partner),
      recipient: {
        department,
        email: RECIPIENTS[department],
      },
      replyTo: `${contact.localPart}@${partner.baseDomain}`,
      period: choose(PERIODS, random),
      purpose: operation.purpose,
      protocol,
      attachment: cloneData(operation.attachment),
      link,
    };
  }

  function setFactsContact(facts, contact, partner) {
    facts.sender = senderFromContact(contact, partner);
    facts.replyTo = facts.sender.email;
  }

  function createInternalBaseFacts(
    operation,
    random,
    contactIds = operation.allowedContactIds,
  ) {
    const directory = content.internalDirectory;
    const contactId = choose(contactIds, random);
    const contact = directory.contacts[contactId];
    const department = choose(operation.allowedDepartments, random);
    const protocol = operation.requiredProtocolPrefix
      ? `${operation.requiredProtocolPrefix}-${randomDigits(random)}`
      : null;
    return {
      sourceType: SOURCE_TYPE.INTERNAL,
      partnerId: null,
      internalDirectoryId: directory.id,
      operationId: operation.id,
      sender: senderFromInternalContact(contact),
      recipient: {
        department,
        email: RECIPIENTS[department],
      },
      replyTo: `${contact.localPart}@${directory.baseDomain}`,
      period: choose(PERIODS, random),
      purpose: operation.purpose,
      protocol,
      attachment: cloneData(operation.attachment),
      link: createOperationLink(operation, random),
      prohibitedRequest: false,
      subjectOverride: null,
      bodyOverride: null,
    };
  }

  function setInternalFactsContact(facts, contact) {
    facts.sender = senderFromInternalContact(contact);
    facts.replyTo = facts.sender.email;
  }

  function addMaliciousAttachmentLure(facts) {
    facts.attachment = {
      type: "exe",
      scanner: { label: "REPUTACAO", value: "MALICIOSO" },
    };
    facts.subjectOverride = "Visualizador do documento // ação necessária";
    facts.bodyOverride = [
      "Olá,",
      "",
      "Para abrir o documento, execute o visualizador anexado.",
      "Depois da instalação, o arquivo será exibido normalmente.",
      "",
      facts.sender.name,
    ].join("\n");
  }

  const archetypes = {
    valid: {
      intendedVerdict: "ACCEPT",
      supports: () => true,
      mutate: () => {},
    },
    "typosquat-domain": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, _operation, _partner, random) => {
        const fakeDomain = choose(
          ["aruora-contabil.nac", "aurora-contabi1.nac", "aurora-contabil.com"],
          random,
        );
        const localPart = facts.sender.email.split("@")[0];
        facts.sender.email = `${localPart}@${fakeDomain}`;
        facts.replyTo = facts.sender.email;
      },
    },
    "wrong-recipient": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, operation, _partner, random) => {
        const invalidDepartments = Object.keys(RECIPIENTS).filter(
          (department) => !operation.allowedDepartments.includes(department),
        );
        const department = choose(invalidDepartments, random);
        facts.recipient = { department, email: RECIPIENTS[department] };
      },
    },
    "missing-protocol": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.requiredProtocolPrefix),
      mutate: (facts) => {
        facts.protocol = null;
      },
    },
    "wrong-protocol": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.requiredProtocolPrefix),
      mutate: (facts, _operation, _partner, random) => {
        facts.protocol = `PROC-${randomDigits(random)}`;
      },
    },
    "role-mismatch": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, operation, partner, random, context) => {
        const alternatives = Object.values(partner.contacts).filter(
          (contact) =>
            !operation.allowedContactIds.includes(contact.id) &&
            !context.dismissedContacts.includes(contact.id) &&
            !context.suspendedContacts.includes(contact.id),
        );
        setFactsContact(facts, choose(alternatives, random), partner);
      },
    },
    "reply-to-mismatch": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts) => {
        facts.replyTo = "retorno@aurora-pagamentos.nac";
      },
    },
    "payment-diversion": {
      intendedVerdict: "REJECT",
      supports: (operation) => operation.allowedDepartments.includes("financeiro"),
      mutate: (facts) => {
        facts.prohibitedRequest = true;
        facts.subjectOverride = "Alteração bancária // próximo pagamento";
        facts.bodyOverride = [
          "Financeiro,",
          "",
          "Atualizem a conta de recebimento da Aurora para os próximos pagamentos.",
          "Respondam a este e-mail para receber os novos dados bancários.",
          "Não usem o cadastro anterior para a próxima fatura.",
          "",
          facts.sender.name,
        ].join("\n");
      },
    },
    "credential-request": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.link),
      mutate: (facts) => {
        facts.prohibitedRequest = true;
        facts.subjectOverride = "Confirmação de acesso ao suporte";
        facts.bodyOverride = [
          "Equipe de TI,",
          "",
          "Para manter o chamado aberto, respondam com usuário, senha e código MFA.",
          "O atendimento será cancelado se a confirmação não chegar hoje.",
          "",
          facts.sender.name,
        ].join("\n");
      },
    },
    "attachment-lure": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.attachment),
      mutate: addMaliciousAttachmentLure,
    },
    "unexpected-partner-attachment": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: mutateUnexpectedPartnerAttachment,
    },
    "contact-suspended": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, _operation, _partner, _random, context) => {
        context.suspendedContacts.push(facts.sender.contactId);
      },
    },
    "partner-suspended": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, _operation, _partner, _random, context) => {
        context.suspendedPartners.push(facts.partnerId);
      },
    },
    "fake-link-destination": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.link),
      mutate: mutateLinkToFalseDestination,
    },
    "wrong-link-path": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.link),
      mutate: mutateLinkToWrongPath,
    },
    "link-target-mismatch": {
      intendedVerdict: "REJECT",
      supports: operationHasDirectLink,
      mutate: mutateLinkTargetMismatch,
    },
    "link-idn-typosquat": {
      intendedVerdict: "REJECT",
      supports: operationSupportsHomograph,
      mutate: mutateLinkToUnicodeHomograph,
    },
  };

  function unsafeInternalScannerResult(operation) {
    const attachment = operation.attachment;
    if (!attachment) return null;

    const unsafeByType = {
      exe: { label: "REPUTACAO", value: "MALICIOSO" },
      pdf: { label: "SCRIPT", value: "EMBUTIDO" },
      bat: { label: "COMPORTAMENTO", value: "MALICIOSO" },
    };
    const unsafe = unsafeByType[attachment.type];
    if (!unsafe || unsafe.value === attachment.scanner?.value) return null;
    return unsafe;
  }

  function alternateInternalAttachment(currentType, random) {
    const options = [
      { type: "pdf", scanner: { label: "SCRIPT", value: "AUSENTE" } },
      { type: "docx", scanner: { label: "MACROS", value: "AUSENTES" } },
      { type: "xlsx", scanner: { label: "MACROS", value: "AUSENTES" } },
      { type: "zip", scanner: { label: "CONTEUDO", value: "COMPACTADO" } },
    ].filter((attachment) => attachment.type !== currentType);
    return cloneData(choose(options, random));
  }

  const internalArchetypes = {
    valid: {
      intendedVerdict: "ACCEPT",
      supports: () => true,
      mutate: () => {},
    },
    "typosquat-domain": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, _operation, _directory, random) => {
        const fakeDomain = choose(
          ["correio-corp.nac", "correio.c0rp", "correio.corp-seguro.nac"],
          random,
        );
        const localPart = facts.sender.email.split("@")[0];
        facts.sender.email = `${localPart}@${fakeDomain}`;
        facts.replyTo = facts.sender.email;
      },
    },
    "wrong-recipient": {
      intendedVerdict: "REJECT",
      supports: (operation) => operation.allowedDepartments.length < Object.keys(RECIPIENTS).length,
      mutate: (facts, operation, _directory, random) => {
        const invalidDepartments = Object.keys(RECIPIENTS).filter(
          (department) => !operation.allowedDepartments.includes(department),
        );
        const department = choose(invalidDepartments, random);
        facts.recipient = { department, email: RECIPIENTS[department] };
      },
    },
    "missing-protocol": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.requiredProtocolPrefix),
      mutate: (facts) => {
        facts.protocol = null;
      },
    },
    "wrong-protocol": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.requiredProtocolPrefix),
      mutate: (facts, _operation, _directory, random) => {
        facts.protocol = `PROC-${randomDigits(random)}`;
      },
    },
    "role-mismatch": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, operation, directory, random, context) => {
        const alternatives = Object.values(directory.contacts).filter(
          (contact) =>
            !operation.allowedContactIds.includes(contact.id) &&
            !context.dismissedContacts.includes(contact.id) &&
            !context.suspendedContacts.includes(contact.id),
        );
        setInternalFactsContact(facts, choose(alternatives, random));
      },
    },
    "reply-to-mismatch": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts) => {
        facts.replyTo = "confirmacao@correio-validacao.nac";
      },
    },
    "attachment-lure": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.attachment),
      mutate: addMaliciousAttachmentLure,
    },
    "origin-mismatch": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts) => {
        facts.sender.origin = "EXTERNA";
      },
    },
    "contact-data-mismatch": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts) => {
        facts.sender.name = "Administração Corporativa";
      },
    },
    "fake-link-destination": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.link),
      mutate: mutateLinkToFalseDestination,
    },
    "wrong-link-path": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(operation.link),
      mutate: mutateLinkToWrongPath,
    },
    "short-link-unresolved": {
      intendedVerdict: "REJECT",
      supports: operationHasShortLink,
      mutate: (facts) => {
        setLinkUnresolved(facts.link);
      },
    },
    "unrecognized-shortener": {
      intendedVerdict: "REJECT",
      supports: operationHasShortLink,
      mutate: mutateLinkToUnrecognizedShortener,
    },
    "link-target-mismatch": {
      intendedVerdict: "REJECT",
      supports: operationHasDirectLink,
      mutate: mutateLinkTargetMismatch,
    },
    "link-idn-typosquat": {
      intendedVerdict: "REJECT",
      supports: operationSupportsHomograph,
      mutate: mutateLinkToUnicodeHomograph,
    },
    "unsafe-attachment": {
      intendedVerdict: "REJECT",
      supports: (operation) => Boolean(unsafeInternalScannerResult(operation)),
      mutate: (facts, operation) => {
        facts.attachment.scanner = unsafeInternalScannerResult(operation);
      },
    },
    "sensitive-data-request": {
      intendedVerdict: "REJECT",
      supports: (operation) => ["folha-pagamento", "relatorio-financeiro", "politica-juridica"].includes(operation.purpose),
      mutate: (facts) => {
        facts.prohibitedRequest = true;
        facts.subjectOverride = "Conferência urgente de documentos";
        facts.bodyOverride = [
          "Pessoal,",
          "",
          "Enviem a versão completa dos dados desta operação para revisão externa.",
          "Use o endereço revisao@auditoria-externa.nac, fora do portal corporativo.",
          "",
          facts.sender.name,
        ].join("\n");
      },
    },
    "disable-protection-request": {
      intendedVerdict: "REJECT",
      supports: (operation) => ["exe", "bat", "msi"].includes(operation.attachment?.type),
      mutate: (facts) => {
        facts.prohibitedRequest = true;
        facts.subjectOverride = "Instalação urgente // exceção de segurança";
        facts.bodyOverride = [
          "Equipe de TI,",
          "",
          "Desativem temporariamente a proteção da estação antes de abrir o anexo.",
          "Não registrem a exceção no sistema de chamados.",
          "",
          facts.sender.name,
        ].join("\n");
      },
    },
    "unexpected-attachment": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts, operation, _directory, random) => {
        facts.attachment = alternateInternalAttachment(operation.attachment?.type, random);
      },
    },
    "prohibited-request": {
      intendedVerdict: "REJECT",
      supports: () => true,
      mutate: (facts) => {
        facts.prohibitedRequest = true;
        facts.subjectOverride = "AÇÃO IMEDIATA // validação da conta";
        facts.bodyOverride = [
          "Funcionário,",
          "",
          "Responda a esta mensagem com sua senha e o código MFA atual.",
          "A validação deve ser concluída imediatamente.",
          "",
          facts.sender.name,
        ].join("\n");
      },
    },
  };

  const archetypeIds = Object.keys(archetypes);
  const bulletinOnlyArchetypeIds = new Set(["contact-suspended", "partner-suspended"]);
  const administrativeArchetypeIds = new Set([
    "wrong-recipient",
    "missing-protocol",
    "wrong-protocol",
    "origin-mismatch",
    "unexpected-attachment",
  ]);
  const invalidArchetypeIds = archetypeIds.filter(
    (id) => id !== "valid" && !bulletinOnlyArchetypeIds.has(id) && !administrativeArchetypeIds.has(id),
  );
  const internalArchetypeIds = Object.keys(internalArchetypes);
  const invalidInternalArchetypeIds = internalArchetypeIds.filter(
    (id) => id !== "valid" && !administrativeArchetypeIds.has(id),
  );

  function chooseDefaultArchetype(random) {
    return random() < DEFAULT_VALID_RATE ? "valid" : choose(invalidArchetypeIds, random);
  }

  function chooseDefaultInternalArchetype(random) {
    return random() < DEFAULT_VALID_RATE
      ? "valid"
      : choose(invalidInternalArchetypeIds, random);
  }

  function addViolation(violations, code) {
    if (!violations.includes(code)) violations.push(code);
  }

  function evaluateOperationLink(emailLink, operationLink, violations) {
    if (!operationLink) {
      if (emailLink) addViolation(violations, "LINK_NOT_AUTHORIZED");
      return;
    }
    if (!emailLink) {
      addViolation(violations, "LINK_MISSING");
      return;
    }

    const expectedShortened = Boolean(operationLink.shortened);
    const expectedKind = expectedShortened ? LINK_KIND.SHORTENED : LINK_KIND.DIRECT;
    const actualKind = emailLink.kind ??
      (emailLink.shortened ? LINK_KIND.SHORTENED : LINK_KIND.DIRECT);
    if (actualKind !== expectedKind || Boolean(emailLink.shortened) !== expectedShortened) {
      addViolation(violations, "LINK_PRESENTATION_INVALID");
    }

    const display = parseUrlDetails(emailLink.displayText ?? emailLink.url);
    const embedded = parseUrlDetails(emailLink.embeddedUrl ?? emailLink.url);
    if (!display || !embedded) {
      addViolation(violations, "LINK_URL_INVALID");
      return;
    }
    if (display.href !== embedded.href) {
      addViolation(violations, "LINK_DISPLAY_TARGET_MISMATCH");
    }

    let destination = embedded;
    if (expectedShortened) {
      const expectedShortener = String(operationLink.displayDomain ?? "").toLowerCase();
      if (display.host !== expectedShortener || embedded.host !== expectedShortener) {
        addViolation(violations, "LINK_SHORTENER_UNRECOGNIZED");
      }

      if (
        emailLink.resolution !== LINK_RESOLUTION.OK ||
        !emailLink.resolvedUrl ||
        !(destination = parseUrlDetails(emailLink.resolvedUrl))
      ) {
        addViolation(violations, "LINK_DESTINATION_UNRESOLVED");
        destination = null;
      }
    }

    if (!destination) return;
    const expectedHost = String(operationLink.domain).toLowerCase();
    if (destination.host !== expectedHost) {
      addViolation(violations, "LINK_DESTINATION_UNRECOGNIZED");
      if (destination.usesPunycode) {
        addViolation(violations, "LINK_IDN_HOST_UNRECOGNIZED");
      }
    }
    if (!pathMatchesPrefix(destination.path, operationLink.path)) {
      addViolation(violations, "LINK_PATH_NOT_AUTHORIZED");
    }
  }

  function evaluateEmail(emailCase) {
    const sourceType = emailCase.email.sourceType ??
      (emailCase.email.partnerId ? SOURCE_TYPE.PARTNER : null);
    if (sourceType === SOURCE_TYPE.INTERNAL) return evaluateInternalEmail(emailCase);
    return evaluatePartnerEmail(emailCase);
  }

  function evaluatePartnerEmail(emailCase) {
    const { email } = emailCase;
    const context = createEmailContext(emailCase.context);
    const partner = content.partners[email.partnerId];
    const operation = operationsById[email.operationId];
    const violations = [];

    if (!partner || !operation) {
      return { verdict: "REJECT", violations: ["UNKNOWN_CASE_REFERENCE"] };
    }

    const contact = partner.contacts[email.sender.contactId];
    const senderDomain = extractDomain(email.sender.email);
    const replyDomain = extractDomain(email.replyTo);

    if (context.suspendedPartners.includes(partner.id)) {
      addViolation(violations, "PARTNER_SUSPENDED");
    }
    if (context.suspendedContacts.includes(email.sender.contactId)) {
      addViolation(violations, "CONTACT_SUSPENDED");
    }
    if (context.dismissedContacts.includes(email.sender.contactId)) {
      addViolation(violations, "CONTACT_DISMISSED");
    }
    if (!operationIsEnabled(operation, context)) {
      addViolation(violations, "BULLETIN_AUTHORIZATION_REQUIRED");
    }
    if (operationIsSuspended(operation, context)) {
      addViolation(violations, "OPERATION_SUSPENDED");
    }
    if (senderDomain !== partner.baseDomain) {
      addViolation(violations, "SENDER_DOMAIN_UNRECOGNIZED");
    }
    if (
      !contact ||
      contact.name !== email.sender.name ||
      contact.role !== email.sender.role ||
      `${contact.localPart}@${partner.baseDomain}`.split("@")[0] !== email.sender.email.split("@")[0]
    ) {
      addViolation(violations, "CONTACT_DATA_MISMATCH");
    }
    if (!operation.allowedContactIds.includes(email.sender.contactId)) {
      addViolation(violations, "CONTACT_OUTSIDE_FUNCTION");
    }
    if (!operation.allowedDepartments.includes(email.recipient.department)) {
      addViolation(violations, "RECIPIENT_NOT_AUTHORIZED");
    }
    if (replyDomain !== senderDomain && !partner.serviceDomains.includes(replyDomain)) {
      addViolation(violations, "REPLY_TO_DIVERGENT");
    }
    if (operation.requiredProtocolPrefix) {
      const expectedPattern = new RegExp(`^${operation.requiredProtocolPrefix}-\\d{4}$`);
      if (!email.protocol) {
        addViolation(violations, "PROTOCOL_MISSING");
      } else if (!expectedPattern.test(email.protocol)) {
        addViolation(violations, "PROTOCOL_INVALID");
      }
    }
    if (email.protocol && isProtocolSuspended(email.protocol, context)) {
      addViolation(violations, "PROTOCOL_RANGE_SUSPENDED");
    }

    if (email.attachment?.scanner?.value === "MALICIOSO") {
      addViolation(violations, "MALWARE_CONFIRMED");
    }
    if (operation.attachment) {
      if (!email.attachment || email.attachment.type !== operation.attachment.type) {
        addViolation(violations, "ATTACHMENT_NOT_AUTHORIZED");
      } else if (
        email.attachment.scanner?.label !== operation.attachment.scanner?.label ||
        email.attachment.scanner?.value !== operation.attachment.scanner?.value
      ) {
        addViolation(violations, "ATTACHMENT_SCAN_NOT_AUTHORIZED");
      }
    } else if (email.attachment) {
      addViolation(violations, "ATTACHMENT_NOT_AUTHORIZED");
    }

    evaluateOperationLink(email.link, operation.link, violations);
    if (email.prohibitedRequest) {
      addViolation(violations, "PROHIBITED_REQUEST");
    }

    return {
      verdict: violations.length ? "REJECT" : "ACCEPT",
      violations,
    };
  }

  function evaluateInternalEmail(emailCase) {
    const { email } = emailCase;
    const context = createEmailContext(emailCase.context);
    const directory = content.internalDirectory;
    const operation = internalOperations[email.operationId];
    const violations = [];

    if (!directory || !operation || operation.sourceType !== SOURCE_TYPE.INTERNAL) {
      return { verdict: "REJECT", violations: ["UNKNOWN_CASE_REFERENCE"] };
    }

    const contact = directory.contacts[email.sender.contactId];
    const senderDomain = extractDomain(email.sender.email);
    const replyDomain = extractDomain(email.replyTo);

    if (context.suspendedContacts.includes(email.sender.contactId)) {
      addViolation(violations, "CONTACT_SUSPENDED");
    }
    if (context.dismissedContacts.includes(email.sender.contactId)) {
      addViolation(violations, "CONTACT_DISMISSED");
    }
    if (!operationIsEnabled(operation, context)) {
      addViolation(violations, "BULLETIN_AUTHORIZATION_REQUIRED");
    }
    if (operationIsSuspended(operation, context)) {
      addViolation(violations, "OPERATION_SUSPENDED");
    }
    if (email.sender.origin !== "INTERNA") {
      addViolation(violations, "INTERNAL_ORIGIN_MISMATCH");
    }
    if (senderDomain !== directory.baseDomain) {
      addViolation(violations, "SENDER_DOMAIN_UNRECOGNIZED");
    }
    if (
      !contact ||
      contact.name !== email.sender.name ||
      contact.role !== email.sender.role ||
      contact.department !== email.sender.department ||
      contact.kind !== email.sender.kind ||
      contact.localPart !== email.sender.email.split("@")[0]
    ) {
      addViolation(violations, "CONTACT_DATA_MISMATCH");
    }
    if (!operation.allowedContactIds.includes(email.sender.contactId)) {
      addViolation(violations, "CONTACT_OUTSIDE_FUNCTION");
    }
    if (
      !operation.allowedDepartments.includes(email.recipient.department) ||
      RECIPIENTS[email.recipient.department] !== email.recipient.email
    ) {
      addViolation(violations, "RECIPIENT_NOT_AUTHORIZED");
    }
    if (replyDomain !== directory.baseDomain) {
      addViolation(violations, "REPLY_TO_DIVERGENT");
    }
    if (email.purpose !== operation.purpose) {
      addViolation(violations, "PURPOSE_NOT_AUTHORIZED");
    }

    if (operation.requiredProtocolPrefix) {
      const expectedPattern = new RegExp(`^${operation.requiredProtocolPrefix}-\\d{4}$`);
      if (!email.protocol) {
        addViolation(violations, "PROTOCOL_MISSING");
      } else if (!expectedPattern.test(email.protocol)) {
        addViolation(violations, "PROTOCOL_INVALID");
      }
    }
    if (email.protocol && isProtocolSuspended(email.protocol, context)) {
      addViolation(violations, "PROTOCOL_RANGE_SUSPENDED");
    }

    if (email.attachment?.scanner?.value === "MALICIOSO") {
      addViolation(violations, "MALWARE_CONFIRMED");
    }
    if (operation.attachment) {
      if (!email.attachment || email.attachment.type !== operation.attachment.type) {
        addViolation(violations, "ATTACHMENT_NOT_AUTHORIZED");
      } else if (
        email.attachment.scanner?.label !== operation.attachment.scanner?.label ||
        email.attachment.scanner?.value !== operation.attachment.scanner?.value
      ) {
        addViolation(violations, "ATTACHMENT_SCAN_NOT_AUTHORIZED");
      }
    } else if (email.attachment) {
      addViolation(violations, "ATTACHMENT_NOT_AUTHORIZED");
    }

    evaluateOperationLink(email.link, operation.link, violations);

    if (email.prohibitedRequest) {
      addViolation(violations, "PROHIBITED_REQUEST");
    }

    return {
      verdict: violations.length ? "REJECT" : "ACCEPT",
      violations,
    };
  }

  function createLinkScannerResult(link) {
    if (link.shortened && link.resolution !== LINK_RESOLUTION.OK) {
      return ["LINK", "DESTINO:", "NAO RESOLVIDO"];
    }

    const targetUrl = link.shortened ? link.resolvedUrl : link.embeddedUrl;
    const target = parseUrlDetails(targetUrl);
    if (!target) return ["LINK", "DESTINO:", "NAO RESOLVIDO"];
    if (target.usesPunycode) {
      return ["LINK", "HOST ASCII:", target.host, "IDN: SIM"];
    }

    return [
      "LINK",
      link.shortened ? "URL FINAL:" : "DESTINO:",
      target.host,
      target.path,
    ];
  }

  function renderEmail(facts, operation, random) {
    const subject = facts.subjectOverride ?? choose(operation.subjectBuilders, random)(facts);
    const body = facts.bodyOverride ?? choose(operation.bodyBuilders, random)(facts);
    const attachment = cloneData(facts.attachment);
    const link = cloneData(facts.link);

    if (attachment?.scanner) {
      attachment.scannerResult = [
        attachment.type.toUpperCase(),
        `${attachment.scanner.label}:`,
        attachment.scanner.value,
      ];
    }
    if (link) {
      syncLinkMetadata(link);
      link.scannable = true;
      link.scannerResult = createLinkScannerResult(link);
    }

    return {
      sourceType: facts.sourceType ?? SOURCE_TYPE.PARTNER,
      partnerId: facts.partnerId,
      internalDirectoryId: facts.internalDirectoryId ?? null,
      operationId: facts.operationId,
      sender: cloneData(facts.sender),
      recipient: cloneData(facts.recipient),
      replyTo: facts.replyTo,
      purpose: facts.purpose,
      protocol: facts.protocol,
      subject,
      body,
      attachment,
      link,
      prohibitedRequest: Boolean(facts.prohibitedRequest),
    };
  }

  function ensureProtocolAllowed(facts, operation, context, random) {
    if (!facts.protocol || !isProtocolSuspended(facts.protocol, context)) return;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      facts.protocol = `${operation.requiredProtocolPrefix}-${randomDigits(random)}`;
      if (!isProtocolSuspended(facts.protocol, context)) return;
    }
    throw new Error(`Could not generate an active protocol for ${operation.id}.`);
  }

  function finalizeGeneratedCase({
    seed,
    operation,
    facts,
    context,
    random,
    archetypeId,
    intendedVerdict,
    relatedChangeId = null,
  }) {
    const email = renderEmail(facts, operation, random);
    const generatedCase = {
      id: `${facts.partnerId ?? facts.internalDirectoryId ?? facts.sourceType}-${hashSeed(seed)}-${operation.id}-${archetypeId}`,
      seed,
      archetype: archetypeId,
      intendedVerdict,
      relatedChangeId,
      context: createEmailContext(context),
      email,
    };
    generatedCase.evaluation = evaluateEmail(generatedCase);

    if (generatedCase.evaluation.verdict !== generatedCase.intendedVerdict) {
      throw new Error(
        `Generated case ${generatedCase.id} evaluated as ${generatedCase.evaluation.verdict}, expected ${generatedCase.intendedVerdict}.`,
      );
    }

    return generatedCase;
  }

  function generateAuroraEmail(options = {}) {
    const seed = options.seed ?? Date.now();
    const random = createSeededRandom(seed);
    const requestedArchetype = options.archetype ?? chooseDefaultArchetype(random);
    const archetype = archetypes[requestedArchetype];

    if (!archetype) {
      throw new Error(`Unknown email archetype: ${requestedArchetype}`);
    }

    const partner = content.partners.aurora;
    const context = createEmailContext(options.context);
    const compatibleOperations = Object.values(operationsById).filter(
      (operation) =>
        operation.partnerId === partner.id &&
        operationIsEnabled(operation, context) &&
        archetype.supports(operation) &&
        eligibleContactIds(operation, context).length > 0 &&
        (!options.operationId || operation.id === options.operationId),
    );
    const operation = choose(compatibleOperations, random);
    const facts = createBaseFacts(operation, partner, random, eligibleContactIds(operation, context));
    ensureProtocolAllowed(facts, operation, context, random);

    archetype.mutate(facts, operation, partner, random, context);
    return finalizeGeneratedCase({
      seed,
      operation,
      facts,
      context,
      random,
      archetypeId: requestedArchetype,
      intendedVerdict: archetype.intendedVerdict,
    });
  }

  function internalArchetypeSupportsContext(archetypeId, operation, context) {
    const archetype = internalArchetypes[archetypeId];
    if (!archetype?.supports(operation)) return false;
    if (archetypeId !== "role-mismatch") return true;

    return Object.values(content.internalDirectory.contacts).some(
      (contact) =>
        !operation.allowedContactIds.includes(contact.id) &&
        !context.dismissedContacts.includes(contact.id) &&
        !context.suspendedContacts.includes(contact.id),
    );
  }

  function generateInternalEmail(options = {}) {
    const seed = options.seed ?? Date.now();
    const random = createSeededRandom(seed);
    const requestedArchetype = options.archetype ?? chooseDefaultInternalArchetype(random);
    const archetype = internalArchetypes[requestedArchetype];

    if (!archetype) {
      throw new Error(`Unknown internal email archetype: ${requestedArchetype}`);
    }

    const context = createEmailContext(options.context);
    const compatibleOperations = Object.values(internalOperations).filter(
      (operation) =>
        operationIsEnabled(operation, context) &&
        internalArchetypeSupportsContext(requestedArchetype, operation, context) &&
        eligibleContactIds(operation, context).length > 0 &&
        (!options.operationId || operation.id === options.operationId),
    );
    if (!compatibleOperations.length) {
      throw new Error(
        `No internal operation supports archetype ${requestedArchetype}${options.operationId ? ` for ${options.operationId}` : ""}.`,
      );
    }

    const operation = choose(compatibleOperations, random);
    const facts = createInternalBaseFacts(
      operation,
      random,
      eligibleContactIds(operation, context),
    );
    ensureProtocolAllowed(facts, operation, context, random);
    archetype.mutate(facts, operation, content.internalDirectory, random, context);

    return finalizeGeneratedCase({
      seed,
      operation,
      facts,
      context,
      random,
      archetypeId: requestedArchetype,
      intendedVerdict: archetype.intendedVerdict,
    });
  }

  function createRunState(options = {}) {
    const seed = options.seed ?? Date.now();
    return {
      version: 1,
      seed,
      turnNumber: 0,
      dismissedContacts: [],
      persistentChanges: [],
      bulletinHistory: [],
      formerContactLastSeen: {},
      operationLastSeen: {},
      presentationLastSeen: {},
      archetypeLastSeen: {},
      lastShortLinkTurn: null,
      shortLinkSequenceIndex: hashSeed(seed) % SHORT_LINK_VARIANTS.length,
    };
  }

  function normalizeRunState(runState) {
    const source = cloneData(runState ?? createRunState());
    return {
      version: source.version ?? 1,
      seed: source.seed ?? "email-please-run",
      turnNumber: Number.isInteger(source.turnNumber) ? source.turnNumber : 0,
      dismissedContacts: Array.from(new Set(source.dismissedContacts ?? [])),
      persistentChanges: cloneData(source.persistentChanges ?? []),
      bulletinHistory: cloneData(source.bulletinHistory ?? []),
      formerContactLastSeen: cloneData(source.formerContactLastSeen ?? {}),
      operationLastSeen: cloneData(source.operationLastSeen ?? {}),
      presentationLastSeen: cloneData(source.presentationLastSeen ?? {}),
      archetypeLastSeen: cloneData(source.archetypeLastSeen ?? {}),
      lastShortLinkTurn: Number.isInteger(source.lastShortLinkTurn)
        ? source.lastShortLinkTurn
        : null,
      shortLinkSequenceIndex: Number.isInteger(source.shortLinkSequenceIndex)
        ? source.shortLinkSequenceIndex
        : hashSeed(source.seed ?? "email-please-run") % SHORT_LINK_VARIANTS.length,
    };
  }

  function createContactDismissalChange(contact, sourceType) {
    const internal = sourceType === SOURCE_TYPE.INTERNAL;
    const organizationId = internal ? content.internalDirectory.id : "aurora";
    const organizationPhrase = internal ? "do Correio Corporativo" : "da Aurora";
    return {
      id: `dismiss-contact:${contact.id}`,
      type: CHANGE_TYPE.CONTACT_DISMISSED,
      duration: CHANGE_DURATION.RUN,
      sourceType,
      partnerId: internal ? null : "aurora",
      internalDirectoryId: internal ? content.internalDirectory.id : null,
      contactId: contact.id,
      title: "DESLIGAMENTO",
      lines: [
        `${contact.name} foi desligado ${organizationPhrase}.`,
        "Mensagens futuras em seu nome nao sao legitimas.",
      ],
      validity: "ATE O FIM DA JOGATINA",
      conflictKeys: [`contact:${organizationId}:${contact.id}`],
      disablesContactIds: [contact.id],
      requiresContactIds: [],
    };
  }

  function createContactSuspensionChange(contact, sourceType) {
    const internal = sourceType === SOURCE_TYPE.INTERNAL;
    const organizationId = internal ? content.internalDirectory.id : "aurora";
    return {
      id: `suspend-contact:${contact.id}`,
      type: CHANGE_TYPE.CONTACT_SUSPENDED,
      duration: CHANGE_DURATION.TURN,
      sourceType,
      partnerId: internal ? null : "aurora",
      internalDirectoryId: internal ? content.internalDirectory.id : null,
      contactId: contact.id,
      title: "CONTA SUSPENSA",
      lines: [
        `A conta de ${contact.name} esta suspensa.`,
        "Recuse mensagens dessa conta neste turno.",
      ],
      validity: "ESTE TURNO",
      conflictKeys: [`contact:${organizationId}:${contact.id}`],
      disablesContactIds: [contact.id],
      requiresContactIds: [],
    };
  }

  function createZipCampaignChange() {
    return {
      id: ZIP_CAMPAIGN_CHANGE_ID,
      type: CHANGE_TYPE.ZIP_CAMPAIGN,
      duration: CHANGE_DURATION.TURN,
      sourceType: SOURCE_TYPE.PARTNER,
      partnerId: "aurora",
      operationId: "aurora-zip-campaign",
      title: "CAMPANHA DE ZIP",
      lines: [
        "O Financeiro pode receber ZIP da Aurora.",
        "Todo pacote exige protocolo CAMP-####.",
      ],
      validity: "ESTE TURNO",
      conflictKeys: ["attachment:aurora:financeiro:zip"],
      disablesContactIds: [],
      requiresContactIds: ["mauro-reis"],
    };
  }

  function createOperationSuspensionChange(operation, label) {
    const internal = operation.sourceType === SOURCE_TYPE.INTERNAL;
    return {
      id: `suspend-operation:${operation.id}`,
      type: CHANGE_TYPE.OPERATION_SUSPENDED,
      duration: CHANGE_DURATION.TURN,
      sourceType: internal ? SOURCE_TYPE.INTERNAL : SOURCE_TYPE.PARTNER,
      partnerId: internal ? null : operation.partnerId,
      internalDirectoryId: internal ? content.internalDirectory.id : null,
      operationId: operation.id,
      title: "OPERACAO SUSPENSA",
      lines: [
        `${label} esta suspensa neste turno.`,
        "Recuse mensagens ligadas a essa operacao.",
      ],
      validity: "ESTE TURNO",
      conflictKeys: [`operation:${operation.id}`],
      disablesContactIds: [],
      requiresContactIds: [...operation.allowedContactIds],
    };
  }

  function createProtocolSuspensionChange({
    sourceType,
    operationId,
    contactId,
    prefix,
    series,
  }) {
    const internal = sourceType === SOURCE_TYPE.INTERNAL;
    const start = series * 100;
    const end = start + 99;
    return {
      id: `suspend-protocol:${prefix}-${String(series).padStart(2, "0")}xx`,
      type: CHANGE_TYPE.PROTOCOL_RANGE_SUSPENDED,
      duration: CHANGE_DURATION.TURN,
      sourceType,
      partnerId: internal ? null : "aurora",
      internalDirectoryId: internal ? content.internalDirectory.id : null,
      operationId,
      contactId,
      title: "SERIE SUSPENSA",
      lines: [
        `Protocolos ${prefix}-${start} a ${prefix}-${end} estao suspensos.`,
        "Recuse mensagens que utilizem essa serie.",
      ],
      validity: "ESTE TURNO",
      conflictKeys: [`protocol:${internal ? "correio" : "aurora"}:${prefix}-${series}xx`],
      disablesContactIds: [],
      requiresContactIds: [contactId],
      protocolRange: { prefix, start, end },
    };
  }

  const protocolSuspensionDefinitions = [
    ...[12, 48, 76].map((series) => ({
      sourceType: SOURCE_TYPE.PARTNER,
      operationId: "aurora-audit-spreadsheet",
      contactId: "helena-voss",
      prefix: "AUD",
      series,
    })),
    ...[23, 73, 91].map((series) => ({
      sourceType: SOURCE_TYPE.INTERNAL,
      operationId: "internal-payroll-clean-xlsx",
      contactId: "internal-otavio-mendes",
      prefix: "FOL",
      series,
    })),
  ];

  const operationSuspensionDefinitions = [
    ["internal-profile-update-link", "A atualizacao cadastral por link"],
    ["internal-deployment-msi", "A implantacao por instalador MSI"],
    ["internal-files-archive", "A exportacao do Servico de Arquivos"],
    ["internal-support-status", "A consulta de chamados por link"],
  ];

  function standardOperations() {
    return Object.values(content.operations);
  }

  function standardInternalOperations() {
    return Object.values(internalOperations);
  }

  function hasAvailableOperation(blockedContactIds, sourceType) {
    const blocked = new Set(blockedContactIds);
    const operations = sourceType === SOURCE_TYPE.INTERNAL
      ? standardInternalOperations()
      : standardOperations();
    return operations.some((operation) =>
      operation.allowedContactIds.some((contactId) => !blocked.has(contactId)),
    );
  }

  function buildBulletinChangeCatalog(runState) {
    const state = normalizeRunState(runState);
    const partner = content.partners.aurora;
    const activePartnerContacts = Object.values(partner.contacts).filter(
      (contact) => !state.dismissedContacts.includes(contact.id),
    );
    const activeInternalContacts = Object.values(content.internalDirectory.contacts).filter(
      (contact) =>
        contact.kind === "employee" &&
        !state.dismissedContacts.includes(contact.id),
    );
    const persistent = activePartnerContacts
      .filter((contact) =>
        hasAvailableOperation(
          [...state.dismissedContacts, contact.id],
          SOURCE_TYPE.PARTNER,
        ),
      )
      .map((contact) => createContactDismissalChange(contact, SOURCE_TYPE.PARTNER));
    persistent.push(
      ...activeInternalContacts
        .filter((contact) =>
          hasAvailableOperation(
            [...state.dismissedContacts, contact.id],
            SOURCE_TYPE.INTERNAL,
          ),
        )
        .map((contact) => createContactDismissalChange(contact, SOURCE_TYPE.INTERNAL)),
    );
    const temporary = activePartnerContacts
      .filter((contact) =>
        hasAvailableOperation(
          [...state.dismissedContacts, contact.id],
          SOURCE_TYPE.PARTNER,
        ),
      )
      .map((contact) => createContactSuspensionChange(contact, SOURCE_TYPE.PARTNER));
    temporary.push(
      ...activeInternalContacts
        .filter((contact) =>
          hasAvailableOperation(
            [...state.dismissedContacts, contact.id],
            SOURCE_TYPE.INTERNAL,
          ),
        )
        .map((contact) => createContactSuspensionChange(contact, SOURCE_TYPE.INTERNAL)),
    );

    if (!state.dismissedContacts.includes("mauro-reis")) {
      temporary.push(createZipCampaignChange());
    }
    protocolSuspensionDefinitions
      .filter((definition) => !state.dismissedContacts.includes(definition.contactId))
      .forEach((definition) => {
        temporary.push(createProtocolSuspensionChange(definition));
      });
    operationSuspensionDefinitions.forEach(([operationId, label]) => {
      const operation = operationsById[operationId];
      if (
        operation &&
        operation.allowedContactIds.some(
          (contactId) => !state.dismissedContacts.includes(contactId),
        )
      ) {
        temporary.push(createOperationSuspensionChange(operation, label));
      }
    });

    return { persistent, temporary, all: [...persistent, ...temporary] };
  }

  function bulletinChangesAreCompatible(changes, runState) {
    const persistentCount = changes.filter(
      (change) => change.duration === CHANGE_DURATION.RUN,
    ).length;
    const temporaryCount = changes.filter(
      (change) => change.duration === CHANGE_DURATION.TURN,
    ).length;
    if (persistentCount > 1 || temporaryCount > 1) return false;

    for (let leftIndex = 0; leftIndex < changes.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < changes.length; rightIndex += 1) {
        const left = changes[leftIndex];
        const right = changes[rightIndex];
        if (left.conflictKeys.some((key) => right.conflictKeys.includes(key))) return false;
        if (left.disablesContactIds.some((id) => right.requiresContactIds.includes(id))) return false;
        if (right.disablesContactIds.some((id) => left.requiresContactIds.includes(id))) return false;
      }
    }

    const state = normalizeRunState(runState);
    const blocked = new Set(state.dismissedContacts);
    changes.forEach((change) => {
      change.disablesContactIds.forEach((contactId) => blocked.add(contactId));
    });
    return (
      hasAvailableOperation([...blocked], SOURCE_TYPE.PARTNER) &&
      hasAvailableOperation([...blocked], SOURCE_TYPE.INTERNAL)
    );
  }

  function resolveBulletinChanges(runState, changeIds) {
    const catalog = buildBulletinChangeCatalog(runState);
    const changes = changeIds.map((changeId) => {
      const change = catalog.all.find((candidate) => candidate.id === changeId);
      if (!change) throw new Error(`Bulletin change is not available: ${changeId}`);
      return change;
    });
    if (new Set(changes.map((change) => change.id)).size !== changes.length) {
      throw new Error("A bulletin cannot contain the same change twice.");
    }
    if (!bulletinChangesAreCompatible(changes, runState)) {
      throw new Error("The requested bulletin changes are incompatible.");
    }
    return changes;
  }

  function bulletinChangeCategory(change) {
    if (change.type === CHANGE_TYPE.CONTACT_SUSPENDED) return "ACCOUNT";
    if (change.type === CHANGE_TYPE.OPERATION_SUSPENDED) return "OPERATION";
    if (change.type === CHANGE_TYPE.PROTOCOL_RANGE_SUSPENDED) return "PROTOCOL";
    if (change.type === CHANGE_TYPE.ZIP_CAMPAIGN) return "CAMPAIGN";
    return change.type;
  }

  function chooseByCategory(items, random, categoryForItem) {
    const categories = new Map();
    items.forEach((item) => {
      const category = categoryForItem(item);
      if (!categories.has(category)) categories.set(category, []);
      categories.get(category).push(item);
    });
    return choose(choose([...categories.values()], random), random);
  }

  function latestPersistentChangeTurn(runState) {
    for (let index = runState.bulletinHistory.length - 1; index >= 0; index -= 1) {
      const bulletin = runState.bulletinHistory[index];
      if (bulletin.changes.some((change) => change.duration === CHANGE_DURATION.RUN)) {
        return bulletin.turnNumber;
      }
    }
    return null;
  }

  function latestTemporaryCategory(runState) {
    for (let index = runState.bulletinHistory.length - 1; index >= 0; index -= 1) {
      const temporary = runState.bulletinHistory[index].changes.find(
        (change) => change.duration === CHANGE_DURATION.TURN,
      );
      if (temporary) return bulletinChangeCategory(temporary);
    }
    return null;
  }

  function recentTemporaryChangeIds(runState, turnNumber) {
    const recentIds = new Set();
    runState.bulletinHistory.forEach((bulletin) => {
      if (turnNumber - bulletin.turnNumber > TEMPORARY_CHANGE_COOLDOWN_TURNS) return;
      bulletin.changes
        .filter((change) => change.duration === CHANGE_DURATION.TURN)
        .forEach((change) => recentIds.add(change.id));
    });
    return recentIds;
  }

  function selectTemporaryChange(candidates, runState, turnNumber, random) {
    if (!candidates.length) return null;
    const recentIds = recentTemporaryChangeIds(runState, turnNumber);
    const latestCategory = latestTemporaryCategory(runState);
    const fresh = candidates.filter((change) => !recentIds.has(change.id));
    const differentCategory = fresh.filter(
      (change) => bulletinChangeCategory(change) !== latestCategory,
    );
    const categoryFallback = candidates.filter(
      (change) => bulletinChangeCategory(change) !== latestCategory,
    );
    const pool = differentCategory.length
      ? differentCategory
      : fresh.length
        ? fresh
        : categoryFallback.length
          ? categoryFallback
          : candidates;
    return chooseByCategory(pool, random, bulletinChangeCategory);
  }

  function selectBulletinChanges(
    runState,
    turnNumber,
    random,
    forcedChangeIds,
    requireBulletin = false,
  ) {
    if (Array.isArray(forcedChangeIds)) {
      return resolveBulletinChanges(runState, forcedChangeIds);
    }

    const catalog = buildBulletinChangeCatalog(runState);
    const changes = [];
    const state = normalizeRunState(runState);
    const lastPersistentTurn = latestPersistentChangeTurn(state);
    const canAddPersistent =
      state.persistentChanges.length < MAX_PERSISTENT_CHANGES_PER_RUN;
    const persistentDue =
      canAddPersistent &&
      turnNumber >= 3 &&
      (lastPersistentTurn === null ||
        turnNumber - lastPersistentTurn >= PERSISTENT_CHANGE_MAX_GAP_TURNS);
    if (
      turnNumber >= 3 &&
      canAddPersistent &&
      catalog.persistent.length &&
      (persistentDue || random() < PERSISTENT_CHANGE_RATE)
    ) {
      changes.push(
        chooseByCategory(catalog.persistent, random, (change) => change.sourceType),
      );
    }
    if (turnNumber >= 2 && catalog.temporary.length && random() < TEMPORARY_CHANGE_RATE) {
      const compatibleTemporary = catalog.temporary.filter((change) =>
        bulletinChangesAreCompatible([...changes, change], runState),
      );
      const selected = selectTemporaryChange(
        compatibleTemporary,
        state,
        turnNumber,
        random,
      );
      if (selected) changes.push(selected);
    }
    if (
      requireBulletin &&
      !changes.some((change) => change.duration === CHANGE_DURATION.TURN)
    ) {
      const compatibleTemporary = catalog.temporary.filter((change) =>
        bulletinChangesAreCompatible([...changes, change], runState),
      );
      const selected = selectTemporaryChange(
        compatibleTemporary,
        state,
        turnNumber,
        random,
      );
      if (selected) changes.push(selected);
    }
    if (requireBulletin && !changes.length && turnNumber >= 3) {
      const compatiblePersistent = catalog.persistent.filter((change) =>
        bulletinChangesAreCompatible([change], runState),
      );
      if (compatiblePersistent.length) changes.push(choose(compatiblePersistent, random));
    }
    return changes;
  }

  function applyPersistentChanges(runState, changes) {
    changes
      .filter((change) => change.duration === CHANGE_DURATION.RUN)
      .forEach((change) => {
        if (!runState.persistentChanges.some((existing) => existing.id === change.id)) {
          runState.persistentChanges.push(cloneData(change));
        }
        if (
          change.type === CHANGE_TYPE.CONTACT_DISMISSED &&
          !runState.dismissedContacts.includes(change.contactId)
        ) {
          runState.dismissedContacts.push(change.contactId);
        }
      });
  }

  function createTurnBulletin(turnNumber, seed, changes) {
    if (!changes.length) return null;
    return {
      id: `bulletin-${turnNumber}-${hashSeed(seed)}`,
      turnNumber,
      title: "BOLETIM DE ALTERACOES",
      changes: cloneData(changes),
      persistentChangeIds: changes
        .filter((change) => change.duration === CHANGE_DURATION.RUN)
        .map((change) => change.id),
      temporaryChangeIds: changes
        .filter((change) => change.duration === CHANGE_DURATION.TURN)
        .map((change) => change.id),
    };
  }

  function createTurnContext(runState, bulletin) {
    const changes = bulletin?.changes ?? [];
    const context = createEmailContext({
      turnNumber: runState.turnNumber,
      bulletinId: bulletin?.id ?? null,
      dismissedContacts: runState.dismissedContacts,
      activeChangeIds: [
        ...runState.persistentChanges.map((change) => change.id),
        ...changes.map((change) => change.id),
      ],
    });

    changes.forEach((change) => {
      if (change.type === CHANGE_TYPE.CONTACT_SUSPENDED) {
        context.suspendedContacts.push(change.contactId);
      }
      if (change.type === CHANGE_TYPE.OPERATION_SUSPENDED) {
        context.suspendedOperationIds.push(change.operationId);
      }
      if (change.type === CHANGE_TYPE.PROTOCOL_RANGE_SUSPENDED) {
        context.suspendedProtocolRanges.push(cloneData(change.protocolRange));
      }
    });
    return createEmailContext(context);
  }

  function archetypeSupportsTurnContext(archetypeId, operation, partner, context) {
    const archetype = archetypes[archetypeId];
    if (!archetype?.supports(operation)) return false;
    if (archetypeId !== "role-mismatch") return true;
    return Object.values(partner.contacts).some(
      (contact) =>
        !operation.allowedContactIds.includes(contact.id) &&
        !context.dismissedContacts.includes(contact.id) &&
        !context.suspendedContacts.includes(contact.id),
    );
  }

  function buildTurnCase({
    seed,
    random,
    operation,
    context,
    archetypeId,
    intendedVerdict,
    contactIds,
    mutateFacts = null,
    mutationOptions = {},
    relatedChangeId = null,
  }) {
    const partner = content.partners[operation.partnerId];
    const caseContext = createEmailContext(context);
    const facts = createBaseFacts(operation, partner, random, contactIds);
    ensureProtocolAllowed(facts, operation, caseContext, random);

    const archetype = archetypes[archetypeId];
    if (archetype) {
      archetype.mutate(facts, operation, partner, random, caseContext, mutationOptions);
    }
    mutateFacts?.(facts, operation, partner, random, caseContext);

    return finalizeGeneratedCase({
      seed,
      operation,
      facts,
      context: caseContext,
      random,
      archetypeId,
      intendedVerdict: intendedVerdict ?? archetype?.intendedVerdict,
      relatedChangeId,
    });
  }

  function buildInternalTurnCase({
    seed,
    random,
    operation,
    context,
    archetypeId,
    intendedVerdict,
    contactIds,
    mutateFacts = null,
    relatedChangeId = null,
  }) {
    const caseContext = createEmailContext(context);
    const facts = createInternalBaseFacts(operation, random, contactIds);
    ensureProtocolAllowed(facts, operation, caseContext, random);

    const archetype = internalArchetypes[archetypeId];
    if (archetype) {
      archetype.mutate(
        facts,
        operation,
        content.internalDirectory,
        random,
        caseContext,
      );
    }
    mutateFacts?.(
      facts,
      operation,
      content.internalDirectory,
      random,
      caseContext,
    );

    return finalizeGeneratedCase({
      seed,
      operation,
      facts,
      context: caseContext,
      random,
      archetypeId,
      intendedVerdict: intendedVerdict ?? archetype?.intendedVerdict,
      relatedChangeId,
    });
  }

  function buildCaseForOperation(options) {
    if (options.operation.sourceType === SOURCE_TYPE.INTERNAL) {
      return buildInternalTurnCase(options);
    }
    return buildTurnCase(options);
  }

  function chooseVariedItem(items, random, getId, lastSeen, usedIds) {
    const unused = items.filter((item) => !usedIds.has(getId(item)));
    const pool = unused.length ? unused : items;
    let oldestTurn = Infinity;
    pool.forEach((item) => {
      const seen = lastSeen[getId(item)];
      oldestTurn = Math.min(oldestTurn, Number.isInteger(seen) ? seen : -1);
    });
    return choose(
      pool.filter((item) => {
        const seen = lastSeen[getId(item)];
        return (Number.isInteger(seen) ? seen : -1) === oldestTurn;
      }),
      random,
    );
  }

  function presentationKey(attachment, link) {
    if (attachment) return `attachment:${attachment.type}`;
    if (link) return `link:${link.kind ?? (link.shortened ? LINK_KIND.SHORTENED : LINK_KIND.DIRECT)}`;
    return "text";
  }

  function chooseTurnOperation(operations, random, selection, prioritizeScarceAttachment = false) {
    if (prioritizeScarceAttachment) {
      const scarce = operations.filter((operation) =>
        SCARCE_ATTACHMENT_TYPES.has(operation.attachment?.type),
      );
      const scarceAlreadyUsed = [...selection.usedPresentationKeys].some((key) =>
        key.startsWith("attachment:") &&
        SCARCE_ATTACHMENT_TYPES.has(key.slice("attachment:".length)),
      );
      if (scarce.length && !scarceAlreadyUsed) {
        return chooseVariedItem(
          scarce,
          random,
          (operation) => presentationKey(operation.attachment, operation.link),
          selection.presentationLastSeen,
          selection.usedPresentationKeys,
        );
      }
    }
    const unusedPresentations = operations.filter(
      (operation) => !selection.usedPresentationKeys.has(
        presentationKey(operation.attachment, operation.link),
      ),
    );
    const pool = unusedPresentations.length ? unusedPresentations : operations;
    const oldestOperation = Math.min(...pool.map((operation) => {
      const seen = selection.operationLastSeen[operation.id];
      return Number.isInteger(seen) ? seen : -1;
    }));
    const leastRecent = pool.filter((operation) => {
      const seen = selection.operationLastSeen[operation.id];
      return (Number.isInteger(seen) ? seen : -1) === oldestOperation;
    });
    return chooseVariedItem(
      leastRecent,
      random,
      (operation) => presentationKey(operation.attachment, operation.link),
      selection.presentationLastSeen,
      selection.usedPresentationKeys,
    );
  }

  function chooseTurnArchetype(archetypeIdsForOperation, random, selection) {
    return chooseVariedItem(
      archetypeIdsForOperation,
      random,
      (archetypeId) => archetypeId,
      selection.archetypeLastSeen,
      selection.usedArchetypeIds,
    );
  }

  function recordTurnSelection(emailCase, selection) {
    selection.usedOperationIds.add(emailCase.email.operationId);
    selection.usedPresentationKeys.add(
      presentationKey(emailCase.email.attachment, emailCase.email.link),
    );
    selection.usedArchetypeIds.add(emailCase.archetype);
  }

  function generatePartnerTurnCase({ seed, random, context, desiredVerdict, selection }) {
    const partner = content.partners.aurora;
    const operations = standardOperations().filter(
      (operation) =>
        operation.partnerId === partner.id &&
        operationIsAvailable(operation, context) &&
        eligibleContactIds(operation, context).length > 0,
    );

    if (desiredVerdict === "ACCEPT") {
      const operation = chooseTurnOperation(operations, random, selection);
      return buildTurnCase({
        seed,
        random,
        operation,
        context,
        archetypeId: "valid",
        intendedVerdict: "ACCEPT",
        contactIds: eligibleContactIds(operation, context),
      });
    }

    const compatibleOperations = operations.filter((operation) =>
      invalidArchetypeIds.some((archetypeId) =>
        archetypeSupportsTurnContext(archetypeId, operation, partner, context),
      ),
    );
    const unexpectedAttachmentId = "unexpected-partner-attachment";
    if (
      !selection.usedArchetypeIds.has(unexpectedAttachmentId) &&
      random() < PARTNER_UNEXPECTED_ATTACHMENT_RATE
    ) {
      const variants = PARTNER_ATTACHMENT_VARIANTS.map((attachment) => ({
        attachment,
        operations: compatibleOperations.filter((operation) =>
          eligibleContactIds(operation, context).some((contactId) =>
            !authorizedPartnerAttachmentTypes(partner, contactId).has(attachment.type),
          ),
        ),
      })).filter((variant) => variant.operations.length);
      if (variants.length) {
        const variant = choose(variants, random);
        const operation = chooseTurnOperation(variant.operations, random, selection);
        const contactIds = eligibleContactIds(operation, context).filter((contactId) =>
          !authorizedPartnerAttachmentTypes(partner, contactId).has(variant.attachment.type),
        );
        return buildTurnCase({
          seed,
          random,
          operation,
          context,
          archetypeId: unexpectedAttachmentId,
          intendedVerdict: "REJECT",
          contactIds,
          mutationOptions: { attachmentType: variant.attachment.type },
        });
      }
    }
    const operation = chooseTurnOperation(compatibleOperations, random, selection);
    const compatibleArchetypes = invalidArchetypeIds.filter((archetypeId) =>
      archetypeId !== unexpectedAttachmentId &&
      archetypeSupportsTurnContext(archetypeId, operation, partner, context),
    );
    const archetypeId = chooseTurnArchetype(compatibleArchetypes, random, selection);
    return buildTurnCase({
      seed,
      random,
      operation,
      context,
      archetypeId,
      intendedVerdict: "REJECT",
      contactIds: eligibleContactIds(operation, context),
    });
  }

  function generateInternalTurnCase({ seed, random, context, desiredVerdict, selection }) {
    const operations = Object.values(internalOperations).filter(
      (operation) =>
        operationIsAvailable(operation, context) &&
        eligibleContactIds(operation, context).length > 0,
    );

    if (desiredVerdict === "ACCEPT") {
      const operation = chooseTurnOperation(operations, random, selection, true);
      return buildInternalTurnCase({
        seed,
        random,
        operation,
        context,
        archetypeId: "valid",
        intendedVerdict: "ACCEPT",
        contactIds: eligibleContactIds(operation, context),
      });
    }

    const compatibleOperations = operations.filter((operation) =>
      invalidInternalArchetypeIds.some((archetypeId) =>
        internalArchetypeSupportsContext(archetypeId, operation, context),
      ),
    );
    const operation = chooseTurnOperation(compatibleOperations, random, selection, true);
    const compatibleArchetypes = invalidInternalArchetypeIds.filter((archetypeId) =>
      (archetypeId !== "attachment-lure" ||
        !SCARCE_ATTACHMENT_TYPES.has(operation.attachment?.type)) &&
      internalArchetypeSupportsContext(archetypeId, operation, context),
    );
    const archetypeId = chooseTurnArchetype(compatibleArchetypes, random, selection);
    return buildInternalTurnCase({
      seed,
      random,
      operation,
      context,
      archetypeId,
      intendedVerdict: "REJECT",
      contactIds: eligibleContactIds(operation, context),
    });
  }

  function generateGeneralTurnCase({
    seed,
    random,
    context,
    desiredVerdict,
    sourceType = SOURCE_TYPE.PARTNER,
    selection,
  }) {
    if (sourceType === SOURCE_TYPE.INTERNAL) {
      return generateInternalTurnCase({ seed, random, context, desiredVerdict, selection });
    }
    return generatePartnerTurnCase({ seed, random, context, desiredVerdict, selection });
  }

  function generateContactSuspensionCase({ seed, random, context, change }) {
    const operations = [...standardOperations(), ...standardInternalOperations()].filter(
      (operation) => operation.allowedContactIds.includes(change.contactId),
    );
    const operation = choose(operations, random);
    return buildCaseForOperation({
      seed,
      random,
      operation,
      context,
      archetypeId: "bulletin-contact-suspended",
      intendedVerdict: "REJECT",
      contactIds: [change.contactId],
      relatedChangeId: change.id,
    });
  }

  function generateProtocolSuspensionCase({ seed, random, context, change }) {
    const operation = operationsById[change.operationId];
    return buildCaseForOperation({
      seed,
      random,
      operation,
      context,
      archetypeId: "bulletin-protocol-suspended",
      intendedVerdict: "REJECT",
      contactIds: [change.contactId],
      relatedChangeId: change.id,
      mutateFacts: (facts) => {
        const range = change.protocolRange;
        facts.protocol = `${range.prefix}-${range.start + Math.floor(random() * (range.end - range.start + 1))}`;
      },
    });
  }

  function generateOperationSuspensionCase({ seed, random, context, change }) {
    const operation = operationsById[change.operationId];
    return buildCaseForOperation({
      seed,
      random,
      operation,
      context,
      archetypeId: "bulletin-operation-suspended",
      intendedVerdict: "REJECT",
      contactIds: eligibleContactIds(operation, context),
      relatedChangeId: change.id,
    });
  }

  function generateZipCampaignCase({ seed, random, context, change, desiredVerdict }) {
    const operation = operationsById[change.operationId];
    return buildTurnCase({
      seed,
      random,
      operation,
      context,
      archetypeId:
        desiredVerdict === "ACCEPT"
          ? "bulletin-zip-campaign-valid"
          : "bulletin-zip-campaign-missing-protocol",
      intendedVerdict: desiredVerdict,
      contactIds: ["mauro-reis"],
      relatedChangeId: change.id,
      mutateFacts:
        desiredVerdict === "REJECT"
          ? (facts) => {
              facts.protocol = null;
            }
          : null,
    });
  }

  function generateBulletinRelatedCase({
    seed,
    random,
    context,
    change,
    desiredVerdict,
  }) {
    if (change.type === CHANGE_TYPE.CONTACT_SUSPENDED) {
      return generateContactSuspensionCase({ seed, random, context, change });
    }
    if (change.type === CHANGE_TYPE.PROTOCOL_RANGE_SUSPENDED) {
      return generateProtocolSuspensionCase({ seed, random, context, change });
    }
    if (change.type === CHANGE_TYPE.OPERATION_SUSPENDED) {
      return generateOperationSuspensionCase({ seed, random, context, change });
    }
    if (change.type === CHANGE_TYPE.ZIP_CAMPAIGN) {
      return generateZipCampaignCase({ seed, random, context, change, desiredVerdict });
    }
    throw new Error(`Unsupported temporary bulletin change: ${change.type}`);
  }

  function formerContactDescriptor(contactId) {
    const partnerContact = content.partners.aurora.contacts[contactId];
    if (partnerContact) {
      return {
        contactId,
        sourceType: SOURCE_TYPE.PARTNER,
        operations: standardOperations().filter((operation) =>
          operation.allowedContactIds.includes(contactId),
        ),
      };
    }
    const internalContact = content.internalDirectory.contacts[contactId];
    if (internalContact) {
      return {
        contactId,
        sourceType: SOURCE_TYPE.INTERNAL,
        operations: standardInternalOperations().filter((operation) =>
          operation.allowedContactIds.includes(contactId),
        ),
      };
    }
    return null;
  }

  function availableFormerContacts(runState) {
    return runState.dismissedContacts.map(formerContactDescriptor).filter((descriptor) => {
      if (!descriptor) return false;
      const { contactId } = descriptor;
      const lastSeen = runState.formerContactLastSeen[contactId];
      const cooldownFinished =
        !Number.isInteger(lastSeen) ||
        runState.turnNumber - lastSeen > FORMER_CONTACT_COOLDOWN_TURNS;
      return cooldownFinished && descriptor.operations.length > 0;
    });
  }

  function generateFormerContactCase({
    seed,
    random,
    context,
    runState,
    availableContacts = availableFormerContacts(runState),
  }) {
    const descriptor = choose(availableContacts, random);
    const { contactId } = descriptor;
    const operation = choose(descriptor.operations, random);
    const generatedCase = buildCaseForOperation({
      seed,
      random,
      operation,
      context,
      archetypeId: "former-contact-impersonation",
      intendedVerdict: "REJECT",
      contactIds: [contactId],
      relatedChangeId: `dismiss-contact:${contactId}`,
    });
    runState.formerContactLastSeen[contactId] = runState.turnNumber;
    return generatedCase;
  }

  function shuffle(items, random) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [items[index], items[target]] = [items[target], items[index]];
    }
    return items;
  }

  function generateTurn(options = {}) {
    const runState = normalizeRunState(options.runState ?? createRunState({ seed: options.seed }));
    const turnNumber = runState.turnNumber + 1;
    const seed = options.seed ?? `${runState.seed}:turn:${turnNumber}`;
    const random = createSeededRandom(seed);
    const emailCount = Math.max(
      1,
      Math.min(50, Math.round(options.emailCount ?? DEFAULT_TURN_EMAIL_COUNT)),
    );
    const forcedChangeIds = Object.prototype.hasOwnProperty.call(options, "bulletinChangeIds")
      ? options.bulletinChangeIds
      : undefined;
    const changes = selectBulletinChanges(
      runState,
      turnNumber,
      random,
      forcedChangeIds,
      Boolean(options.requireBulletin),
    );

    applyPersistentChanges(runState, changes);
    runState.turnNumber = turnNumber;
    const bulletin = createTurnBulletin(turnNumber, seed, changes);
    const context = createTurnContext(runState, bulletin);
    if (bulletin) {
      runState.bulletinHistory.push(cloneData(bulletin));
    }

    const targetAccepts = Math.round(emailCount * DEFAULT_VALID_RATE);
    const targetRejects = emailCount - targetAccepts;
    const targetPartners = Math.round(emailCount * DEFAULT_PARTNER_RATE);
    const targetInternals = emailCount - targetPartners;
    let generatedAccepts = 0;
    let generatedRejects = 0;
    let serial = 0;
    const cases = [];
    const selection = {
      operationLastSeen: runState.operationLastSeen,
      presentationLastSeen: runState.presentationLastSeen,
      archetypeLastSeen: runState.archetypeLastSeen,
      usedOperationIds: new Set(),
      usedPresentationKeys: new Set(),
      usedArchetypeIds: new Set(),
    };
    const nextSeed = (label) => `${seed}:${label}:${serial++}`;
    const temporaryChange = changes.find(
      (change) => change.duration === CHANGE_DURATION.TURN,
    );

    if (temporaryChange) {
      const relatedSourceTarget = temporaryChange.sourceType === SOURCE_TYPE.INTERNAL
        ? targetInternals
        : targetPartners;
      const relatedTarget = Math.min(
        relatedSourceTarget,
        Math.max(1, Math.round(emailCount * 0.25)),
      );
      for (let index = 0; index < relatedTarget; index += 1) {
        let desiredVerdict = "REJECT";
        if (temporaryChange.type === CHANGE_TYPE.ZIP_CAMPAIGN) {
          desiredVerdict = index % 2 === 0 ? "ACCEPT" : "REJECT";
          if (desiredVerdict === "ACCEPT" && generatedAccepts >= targetAccepts) {
            desiredVerdict = "REJECT";
          }
          if (desiredVerdict === "REJECT" && generatedRejects >= targetRejects) {
            desiredVerdict = "ACCEPT";
          }
        } else if (generatedRejects >= targetRejects) {
          break;
        }

        const generatedCase = generateBulletinRelatedCase({
          seed: nextSeed("bulletin"),
          random,
          context,
          change: temporaryChange,
          desiredVerdict,
        });
        cases.push(generatedCase);
        recordTurnSelection(generatedCase, selection);
        if (generatedCase.evaluation.verdict === "ACCEPT") generatedAccepts += 1;
        else generatedRejects += 1;
      }
    }

    const shortenedLinkAlreadyPresent = cases.some(
      (emailCase) => emailCase.email.link?.kind === LINK_KIND.SHORTENED,
    );
    const generatedInternalsBeforeShortLink = cases.filter(
      (emailCase) => emailCase.email.sourceType === SOURCE_TYPE.INTERNAL,
    ).length;
    const shortLinkGap = runState.lastShortLinkTurn === null
      ? Infinity
      : turnNumber - runState.lastShortLinkTurn;
    const shortLinkDue = runState.lastShortLinkTurn === null
      ? turnNumber >= SHORT_LINK_MAX_GAP_TURNS || random() < SHORT_LINK_EARLY_RATE
      : shortLinkGap >= SHORT_LINK_MAX_GAP_TURNS ||
        (shortLinkGap >= 1 && random() < SHORT_LINK_EARLY_RATE);
    const shortLinkOperation = internalOperations["internal-access-short-link"];
    if (
      shortLinkDue &&
      !shortenedLinkAlreadyPresent &&
      generatedInternalsBeforeShortLink < targetInternals &&
      operationIsAvailable(shortLinkOperation, context) &&
      eligibleContactIds(shortLinkOperation, context).length > 0
    ) {
      const availableVerdicts = new Set();
      if (generatedAccepts < targetAccepts) availableVerdicts.add("ACCEPT");
      if (generatedRejects < targetRejects) availableVerdicts.add("REJECT");
      let variantIndex = runState.shortLinkSequenceIndex % SHORT_LINK_VARIANTS.length;
      for (let offset = 0; offset < SHORT_LINK_VARIANTS.length; offset += 1) {
        const candidateIndex =
          (runState.shortLinkSequenceIndex + offset) % SHORT_LINK_VARIANTS.length;
        if (availableVerdicts.has(SHORT_LINK_VARIANTS[candidateIndex].verdict)) {
          variantIndex = candidateIndex;
          break;
        }
      }
      const variant = SHORT_LINK_VARIANTS[variantIndex];
      const generatedCase = buildInternalTurnCase({
        seed: nextSeed("scheduled-short-link"),
        random,
        operation: shortLinkOperation,
        context,
        archetypeId: variant.archetypeId,
        intendedVerdict: variant.verdict,
        contactIds: eligibleContactIds(shortLinkOperation, context),
      });
      cases.push(generatedCase);
      recordTurnSelection(generatedCase, selection);
      runState.shortLinkSequenceIndex = (variantIndex + 1) % SHORT_LINK_VARIANTS.length;
      runState.lastShortLinkTurn = turnNumber;
      if (generatedCase.evaluation.verdict === "ACCEPT") generatedAccepts += 1;
      else generatedRejects += 1;
    }

    const formerContacts = availableFormerContacts(runState);
    const generatedSourceCount = (sourceType) => cases.filter(
      (emailCase) => emailCase.email.sourceType === sourceType,
    ).length;
    const eligibleFormerContacts = formerContacts.filter((descriptor) => {
      const sourceTarget = descriptor.sourceType === SOURCE_TYPE.INTERNAL
        ? targetInternals
        : targetPartners;
      return generatedSourceCount(descriptor.sourceType) < sourceTarget;
    });
    const formerContactTurnChance = 1 - Math.pow(1 - FORMER_CONTACT_EMAIL_RATE, emailCount);
    if (
      eligibleFormerContacts.length &&
      generatedRejects < targetRejects &&
      random() < formerContactTurnChance
    ) {
      const generatedCase = generateFormerContactCase({
        seed: nextSeed("former-contact"),
        random,
        context,
        runState,
        availableContacts: eligibleFormerContacts,
      });
      cases.push(generatedCase);
      recordTurnSelection(generatedCase, selection);
      generatedRejects += 1;
    }

    const generatedPartners = cases.filter(
      (emailCase) => emailCase.email.sourceType === SOURCE_TYPE.PARTNER,
    ).length;
    const generatedInternals = cases.filter(
      (emailCase) => emailCase.email.sourceType === SOURCE_TYPE.INTERNAL,
    ).length;
    const remainingSources = [
      ...Array(Math.max(0, targetPartners - generatedPartners)).fill(SOURCE_TYPE.PARTNER),
      ...Array(Math.max(0, targetInternals - generatedInternals)).fill(SOURCE_TYPE.INTERNAL),
    ];
    const remainingVerdicts = [
      ...Array(Math.max(0, targetAccepts - generatedAccepts)).fill("ACCEPT"),
      ...Array(Math.max(0, targetRejects - generatedRejects)).fill("REJECT"),
    ];
    shuffle(remainingSources, random);
    shuffle(remainingVerdicts, random);

    if (remainingSources.length !== remainingVerdicts.length) {
      throw new Error("Turn source and verdict budgets became inconsistent.");
    }

    for (let index = 0; index < remainingSources.length; index += 1) {
      const desiredVerdict = remainingVerdicts[index];
      const sourceType = remainingSources[index];
      const generatedCase = generateGeneralTurnCase({
        seed: nextSeed(`${sourceType}-${desiredVerdict.toLowerCase()}`),
        random,
        context,
        desiredVerdict,
        sourceType,
        selection,
      });
      cases.push(generatedCase);
      recordTurnSelection(generatedCase, selection);
      if (desiredVerdict === "ACCEPT") generatedAccepts += 1;
      else generatedRejects += 1;
    }

    cases.forEach((emailCase) => {
      runState.operationLastSeen[emailCase.email.operationId] = turnNumber;
      runState.presentationLastSeen[
        presentationKey(emailCase.email.attachment, emailCase.email.link)
      ] = turnNumber;
      runState.archetypeLastSeen[emailCase.archetype] = turnNumber;
      if (emailCase.email.link?.kind === LINK_KIND.SHORTENED) {
        runState.lastShortLinkTurn = turnNumber;
      }
    });

    shuffle(cases, random);
    return {
      id: `turn-${turnNumber}-${hashSeed(seed)}`,
      seed,
      turnNumber,
      emailCount,
      bulletin,
      context,
      cases,
      summary: {
        accepts: generatedAccepts,
        rejects: generatedRejects,
        partners: cases.filter(
          (emailCase) => emailCase.email.sourceType === SOURCE_TYPE.PARTNER,
        ).length,
        internals: cases.filter(
          (emailCase) => emailCase.email.sourceType === SOURCE_TYPE.INTERNAL,
        ).length,
        bulletinRelated: cases.filter((emailCase) => emailCase.relatedChangeId).length,
      },
      runState,
    };
  }

  return {
    ARCHETYPE_IDS: archetypeIds,
    INTERNAL_ARCHETYPE_IDS: internalArchetypeIds,
    CHANGE_DURATION,
    CHANGE_TYPE,
    LINK_KIND,
    LINK_RESOLUTION,
    SOURCE_TYPE,
    DEFAULT_PARTNER_RATE,
    DEFAULT_VALID_RATE,
    DEFAULT_TURN_EMAIL_COUNT,
    FORMER_CONTACT_COOLDOWN_TURNS,
    FORMER_CONTACT_EMAIL_RATE,
    ZIP_CAMPAIGN_CHANGE_ID,
    AUD_48_CHANGE_ID,
    FOL_73_CHANGE_ID,
    buildBulletinChangeCatalog,
    bulletinChangesAreCompatible,
    createEmailContext,
    createRunState,
    createSeededRandom,
    evaluateEmail,
    generateAuroraEmail,
    generateInternalEmail,
    generateTurn,
    resolveBulletinChanges,
  };
});
