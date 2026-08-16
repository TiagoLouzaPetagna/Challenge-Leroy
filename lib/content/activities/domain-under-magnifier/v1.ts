import type { ActivityContentPackage } from "../../../activities/content";
import type {
  LinkEvidenceKey,
  LinkToolKey,
  LinkVerdict,
} from "../../../domain/types";

export type DomainAnalyzerToolKey = Extract<
  LinkToolKey,
  "protocol" | "subdomain" | "registeredDomain" | "path"
>;

type DomainAnalyzerContent = {
  guidedCase: {
    title: string;
    url: string;
    context: string;
  };
  independentCase: {
    title: string;
    url: string;
    context: string;
  };
  tools: Readonly<Record<DomainAnalyzerToolKey, { label: string; value: string }>>;
  evidenceOptions: readonly { id: LinkEvidenceKey; label: string }[];
};

type DomainAnalyzerAllowlists = {
  toolIds: readonly DomainAnalyzerToolKey[];
  evidenceIds: readonly LinkEvidenceKey[];
  correctEvidenceIds: readonly LinkEvidenceKey[];
  incorrectEvidenceIds: readonly LinkEvidenceKey[];
  verdictIds: readonly LinkVerdict[];
  guidedVerdict: LinkVerdict;
  independentVerdict: LinkVerdict;
};

export const DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE = {
  casePackageId: "phishlab:link-analyzer:v1:default",
  activityId: "phishlab:link-analyzer",
  activityVersion: 1,
  status: "published",
  editorialDate: "2026-08-15",
  content: {
    guidedCase: {
      title: "Um aviso pede confirmação imediata",
      url: "https://leroymerlin.seguranca-contas.example/confirmar",
      context:
        "Use as ferramentas para descobrir qual parte realmente identifica o destino.",
    },
    independentCase: {
      title: "Agora analise sem pistas",
      url: "https://treinamento.colaboradores.leroymerlin.example/curso-phishing",
      context:
        "Você abriu esta atividade a partir da plataforma de treinamento.",
    },
    tools: {
      protocol: {
        label: "Protocolo",
        value:
          "https:// — protege o transporte, mas não comprova quem controla o site.",
      },
      subdomain: {
        label: "Subdomínio",
        value:
          "leroymerlin — palavras conhecidas podem ser colocadas antes do domínio real.",
      },
      registeredDomain: {
        label: "Domínio registrado",
        value:
          "seguranca-contas.example — esta é a parte que identifica o destino real.",
      },
      path: {
        label: "Caminho",
        value:
          "/confirmar — descreve uma página, mas não altera quem controla o domínio.",
      },
    },
    evidenceOptions: [
      {
        id: "registered-domain",
        label:
          "O domínio registrado é leroymerlin.example, o portal fictício conhecido.",
      },
      {
        id: "expected-context",
        label: "O endereço leva ao treinamento que estava sendo realizado.",
      },
      {
        id: "https-alone",
        label: "O cadeado HTTPS, sozinho, comprova que o site é legítimo.",
      },
      {
        id: "visual-familiarity",
        label: "Palavras conhecidas no endereço são suficientes para confiar.",
      },
    ],
  },
  allowlists: {
    toolIds: ["protocol", "subdomain", "registeredDomain", "path"],
    evidenceIds: [
      "registered-domain",
      "expected-context",
      "https-alone",
      "visual-familiarity",
    ],
    correctEvidenceIds: ["registered-domain", "expected-context"],
    incorrectEvidenceIds: ["https-alone", "visual-familiarity"],
    verdictIds: ["legitimate", "suspicious", "inconclusive"],
    guidedVerdict: "suspicious",
    independentVerdict: "legitimate",
  },
  criticalControlIds: ["registered-domain", "expected-context"],
  feedback: {
    success:
      "Você localizou o domínio registrado e confirmou o contexto antes de confiar.",
    review:
      "Revise a diferença entre palavras familiares, HTTPS e o domínio registrado.",
  },
  debrief: {
    title: "O domínio registrado vale mais do que palavras familiares",
    body:
      "HTTPS protege a conexão, mas não garante que o proprietário seja confiável. Abra o serviço por uma rota conhecida.",
  },
} as const satisfies ActivityContentPackage<
  DomainAnalyzerContent,
  DomainAnalyzerAllowlists
>;

