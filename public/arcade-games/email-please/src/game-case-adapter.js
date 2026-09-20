(function exposeGameCaseAdapter(root, factory) {
  const adapter = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = adapter;
  }

  root.EmailPleaseCaseAdapter = adapter;
})(typeof globalThis !== "undefined" ? globalThis : this, function createGameCaseAdapter() {
  "use strict";

  const LINK_PROMPTS = {
    "alerta-acesso": "ENDERECO PARA REVISAO:",
    "atualizacao-cadastral": "ENDERECO PARA ATUALIZACAO:",
    "atualizacao-chamado": "ENDERECO DO CHAMADO:",
    suporte: "ENDERECO DO SUPORTE:",
  };

  function cloneData(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function formatTurnDate(turnNumber = 1) {
    const date = new Date(Date.UTC(2026, 4, 23 + Math.max(1, turnNumber)));
    return [
      String(date.getUTCDate()).padStart(2, "0"),
      String(date.getUTCMonth() + 1).padStart(2, "0"),
      date.getUTCFullYear(),
    ].join(".");
  }

  function stripDisplayedLinkLine(body, displayedLink) {
    if (!displayedLink) return String(body ?? "").trim();
    return String(body ?? "")
      .split("\n")
      .filter((line) => !line.includes(displayedLink))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function compactCaseCode(generatedCase) {
    const protocol = generatedCase.email.protocol;
    if (protocol) return protocol;
    const source = generatedCase.email.sourceType === "internal" ? "INT" : "EXT";
    const digits = String(generatedCase.id).replace(/\D/g, "").slice(-4).padStart(4, "0");
    return `${source}-${digits}`;
  }

  function adaptGeneratedCase(generatedCase, options = {}) {
    if (!generatedCase?.email || !generatedCase?.evaluation) {
      throw new Error("A complete generated email case is required.");
    }

    const source = generatedCase.email;
    const displayedLink = source.link?.displayText ?? source.link?.url ?? null;
    const turnNumber = source.context?.turnNumber ?? generatedCase.context?.turnNumber ?? 1;
    const attachment = source.attachment
      ? {
          type: source.attachment.type,
          label: `ANEXO .${source.attachment.type.toUpperCase()}`,
          textureKey: `${source.attachment.type}Attachment`,
          scannerResult: cloneData(source.attachment.scannerResult),
        }
      : null;
    const link = source.link
      ? {
          text: displayedLink,
          prompt: LINK_PROMPTS[source.purpose] ?? "ENDERECO PARA ANALISE:",
          kind: source.link.kind,
          shortened: Boolean(source.link.shortened),
          usesPunycode: Boolean(source.link.usesPunycode),
          scannerResult: cloneData(source.link.scannerResult),
        }
      : null;

    return {
      id: generatedCase.id,
      archetype: generatedCase.archetype,
      sourceType: source.sourceType,
      operationId: source.operationId,
      expectedVerdict: generatedCase.evaluation.verdict,
      violations: cloneData(generatedCase.evaluation.violations),
      email: {
        senderAddress: source.sender.email,
        date: options.date ?? formatTurnDate(turnNumber),
        subject: source.subject,
        body: stripDisplayedLinkLine(source.body, displayedLink),
        link,
      },
      visa: {
        senderName: source.sender.name,
        role: source.sender.role,
        origin: source.sender.origin === "INTERNA" ? "INT" : "EXT",
        hasAttachment: Boolean(attachment),
        hasLink: Boolean(link),
        code: compactCaseCode(generatedCase),
      },
      attachment,
    };
  }

  return {
    adaptGeneratedCase,
    formatTurnDate,
    stripDisplayedLinkLine,
  };
});
