import { ARCADE_GAMES } from "../content/arcade-catalog";
import { BANK_CHANGE_ACTIVITY_ID } from "../content/bank-change-catalog";
import {
  BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
  BANK_CHANGE_PROCESS_V2_PACKAGE,
} from "../content/activities/bank-change/v2";
import { DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE } from "../content/activities/domain-under-magnifier/v1";
import {
  PHISHING_FOUNDATION_ACTIVITY_VERSION,
  PHISHING_FOUNDATION_PACKAGE_ID,
} from "../content/activities/account-lock/v2";
import { DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES } from "../content/activities/domain-under-magnifier/v2";
import {
  TRUE_SENDER_V2_ACTIVITY_VERSION,
  TRUE_SENDER_V2_PACKAGES,
} from "../content/activities/true-sender/v2";
import {
  COMPROMISED_CONVERSATION_V2_PACKAGES,
  CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
} from "../content/activities/compromised-conversation/v2";
import {
  MFA_CONSOLE_ACTIVITY_VERSION,
  MFA_CONSOLE_V2_PACKAGES,
} from "../content/activities/mfa-console/v2";
import {
  RECOVERY_BUILDER_ACTIVITY_VERSION,
  RECOVERY_BUILDER_V2_PACKAGES,
} from "../content/activities/recovery-builder/v2";
import {
  WORKDAY_TRIAGE_ACTIVITY_VERSION,
  WORKDAY_TRIAGE_V2_PACKAGES,
} from "../content/activities/workday-triage/v2";
import { RADAR_ARTICLES } from "../content/radar-catalog";
import {
  COMPROMISED_CONVERSATION_MISSION_ID,
  MFA_FATIGUE_MISSION_ID,
  PHISHLAB_ACTIVITY_ID,
  PILOT_MISSION_ID,
  POINT_RULES,
  RECOVERY_MISSION_ID,
  SENDER_INSPECTOR_ACTIVITY_ID,
  SIMULATION_ACTIVITY_ID,
  TEAM_CHALLENGE_ACTIVITY_ID,
} from "../domain/rules";
import type {
  ActivityRegistryDefinition,
  PortalRouteResolution,
  PortalViewKey,
} from "./types";

export const PORTAL_VIEW_ROUTES: Readonly<Record<PortalViewKey, string>> = {
  inicio: "/",
  missoes: "/missoes",
  missao: "/missoes/aviso-de-bloqueio",
  simulacoes: "/simulacoes",
  laboratorio: "/phishlab",
  arcade: "/arcade",
  radar: "/radar",
  equipes: "/equipes",
  perfil: "/perfil",
  gestao: "/gestao",
};

const EMPTY_RELATIONS: readonly string[] = [];
const EMPTY_COMPETENCIES: ActivityRegistryDefinition["competencyFocus"] = [];

const plannedDefinitions = [
  ["mission:urgent-manager-request", "mission", "Pedido urgente de um gestor", "/missoes/pedido-urgente-do-gestor", POINT_RULES.mainMission],
  ["mission:unexpected-document", "mission", "Documento inesperado", "/missoes/documento-inesperado", POINT_RULES.mainMission],
  ["mission:official-callback", "mission", "A central que não podia esperar", "/missoes/a-central-que-nao-podia-esperar", POINT_RULES.mainMission],
  ["mission:personalized-pretext", "mission", "Ele já sabia meus dados", "/missoes/ele-ja-sabia-meus-dados", POINT_RULES.mainMission],
  ["mission:pretext-without-link", "mission", "O pedido não tinha link", "/missoes/o-pedido-nao-tinha-link", POINT_RULES.mainMission],
  ["phishlab:lookalike-identifier", "phishlab", "Uma letra fora do lugar", "/phishlab/uma-letra-fora-do-lugar", POINT_RULES.phishLab],
  ["phishlab:destination-chain", "phishlab", "Para onde esse link realmente vai?", "/phishlab/para-onde-esse-link-realmente-vai", POINT_RULES.phishLab],
  ["phishlab:qr-destination", "phishlab", "O destino atrás do QR", "/phishlab/o-destino-atras-do-qr", POINT_RULES.phishLab],
  ["phishlab:page-mirror", "phishlab", "Espelho de Página", "/phishlab/espelho-de-pagina", POINT_RULES.phishLab],
  ["phishlab:oauth-consent", "phishlab", "Login verdadeiro, permissão errada", "/phishlab/login-verdadeiro-permissao-errada", POINT_RULES.phishLab],
  ["phishlab:device-code", "phishlab", "De qual dispositivo veio este código?", "/phishlab/de-qual-dispositivo-veio-este-codigo", POINT_RULES.phishLab],
  ["simulation:message-center", "simulation", "Central de mensagens", "/simulacoes/central-de-mensagens", POINT_RULES.simulation],
  ["simulation:multichannel", "simulation", "Ataque multicanal", "/simulacoes/ataque-multicanal", POINT_RULES.simulation],
  ["simulation:search-results", "simulation", "O primeiro resultado", "/simulacoes/o-primeiro-resultado", POINT_RULES.simulation],
  ["simulation:payment-recipient", "simulation", "Pagamento para quem?", "/simulacoes/pagamento-para-quem", POINT_RULES.simulation],
] as const;

const targetPlannedActivities: ActivityRegistryDefinition[] =
  plannedDefinitions.map(([activityId, area, title, route, basePoints]) => ({
    activityId,
    area,
    title,
    route,
    publishedVersion: null,
    integrationStatus: "planned",
    playerKey: null,
    contractFamily: "not-published",
    basePoints,
    rewardClaimKey: `${activityId}:first-completion`,
    competencyFocus: EMPTY_COMPETENCIES,
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: EMPTY_RELATIONS,
    acceptedVersions: [],
  }));

const availableActivities: ActivityRegistryDefinition[] = [
  {
    activityId: PILOT_MISSION_ID,
    area: "mission",
    title: "O aviso que não podia esperar",
    route: "/missoes/aviso-de-bloqueio",
    publishedVersion: PHISHING_FOUNDATION_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "phishing-foundation-mission",
    contractFamily: "phishing-foundation-v2",
    basePoints: POINT_RULES.mainMission,
    rewardClaimKey: `${PILOT_MISSION_ID}:first-completion`,
    competencyFocus: [
      "observar",
      "investigar",
      "verificar",
      "decidir",
      "reportar",
    ],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: [SENDER_INSPECTOR_ACTIVITY_ID],
    publishedCasePackageIds: [PHISHING_FOUNDATION_PACKAGE_ID],
    acceptedVersions: [1, PHISHING_FOUNDATION_ACTIVITY_VERSION],
  },
  {
    activityId: COMPROMISED_CONVERSATION_MISSION_ID,
    area: "mission",
    title: "A conversa já estava acontecendo",
    route: "/missoes/a-conversa-ja-estava-acontecendo",
    publishedVersion: CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "compromised-conversation-mission",
    contractFamily: "conversation-reconstruction-v2",
    basePoints: POINT_RULES.mainMission,
    rewardClaimKey: `${COMPROMISED_CONVERSATION_MISSION_ID}:first-completion`,
    competencyFocus: ["observar", "investigar", "verificar", "reportar"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: COMPROMISED_CONVERSATION_V2_PACKAGES.map(
      (contentPackage) => contentPackage.casePackageId,
    ),
    acceptedVersions: [1, CONVERSATION_RECONSTRUCTION_ACTIVITY_VERSION],
  },
  {
    activityId: MFA_FATIGUE_MISSION_ID,
    area: "mission",
    title: "Você iniciou este acesso?",
    route: "/missoes/voce-iniciou-este-acesso",
    publishedVersion: MFA_CONSOLE_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "mfa-fatigue-mission",
    contractFamily: "mfa-console-v2",
    basePoints: POINT_RULES.mainMission,
    rewardClaimKey: `${MFA_FATIGUE_MISSION_ID}:first-completion`,
    competencyFocus: ["investigar", "verificar", "decidir", "reportar"],
    prerequisiteActivityIds: [
      SENDER_INSPECTOR_ACTIVITY_ID,
      PHISHLAB_ACTIVITY_ID,
    ],
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: MFA_CONSOLE_V2_PACKAGES.map(
      (contentPackage) => contentPackage.casePackageId,
    ),
    acceptedVersions: [1, MFA_CONSOLE_ACTIVITY_VERSION],
  },
  {
    activityId: RECOVERY_MISSION_ID,
    area: "mission",
    title: "Cliquei. E agora?",
    route: "/missoes/cliquei-e-agora",
    publishedVersion: RECOVERY_BUILDER_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "recovery-mission",
    contractFamily: "incident-response-builder-v2",
    basePoints: POINT_RULES.mainMission,
    rewardClaimKey: `${RECOVERY_MISSION_ID}:first-completion`,
    competencyFocus: ["decidir", "reportar", "recuperar"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: [MFA_FATIGUE_MISSION_ID],
    publishedCasePackageIds: RECOVERY_BUILDER_V2_PACKAGES.map(
      (contentPackage) => contentPackage.casePackageId,
    ),
    acceptedVersions: [1, RECOVERY_BUILDER_ACTIVITY_VERSION],
  },
  {
    activityId: SENDER_INSPECTOR_ACTIVITY_ID,
    area: "phishlab",
    title: "Quem enviou de verdade?",
    route: "/phishlab/quem-enviou-de-verdade",
    publishedVersion: TRUE_SENDER_V2_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "sender-inspector",
    contractFamily: "identity-map-v2",
    basePoints: POINT_RULES.phishLab,
    rewardClaimKey: `${SENDER_INSPECTOR_ACTIVITY_ID}:first-completion`,
    competencyFocus: ["observar", "investigar", "verificar"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: [PILOT_MISSION_ID],
    publishedCasePackageIds: TRUE_SENDER_V2_PACKAGES.map(
      (contentPackage) => contentPackage.casePackageId,
    ),
    acceptedVersions: [1, TRUE_SENDER_V2_ACTIVITY_VERSION],
  },
  {
    activityId: PHISHLAB_ACTIVITY_ID,
    area: "phishlab",
    title: "Domínio sob a lupa",
    route: "/phishlab/analisador-de-links",
    publishedVersion: 2,
    integrationStatus: "available",
    playerKey: "link-analyzer",
    contractFamily: "url-anatomy-v2",
    basePoints: POINT_RULES.phishLab,
    rewardClaimKey: `${PHISHLAB_ACTIVITY_ID}:first-completion`,
    competencyFocus: ["observar", "investigar", "decidir"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: [SENDER_INSPECTOR_ACTIVITY_ID],
    publishedCasePackageIds: [
      DOMAIN_UNDER_MAGNIFIER_V1_PACKAGE.casePackageId,
      ...DOMAIN_UNDER_MAGNIFIER_V2_PACKAGES.map(
        (contentPackage) => contentPackage.casePackageId,
      ),
    ],
    acceptedVersions: [1, 2],
  },
  {
    activityId: SIMULATION_ACTIVITY_ID,
    area: "simulation",
    title: "Uma manhã comum",
    route: "/simulacoes/dia-de-trabalho",
    publishedVersion: WORKDAY_TRIAGE_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "workday-simulation",
    contractFamily: "batch-triage-v2",
    basePoints: POINT_RULES.simulation,
    rewardClaimKey: `${SIMULATION_ACTIVITY_ID}:first-completion`,
    competencyFocus: [
      "observar",
      "investigar",
      "verificar",
      "decidir",
      "reportar",
    ],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: [RECOVERY_MISSION_ID],
    publishedCasePackageIds: WORKDAY_TRIAGE_V2_PACKAGES.map(
      (contentPackage) => contentPackage.casePackageId,
    ),
    acceptedVersions: [1, WORKDAY_TRIAGE_ACTIVITY_VERSION],
  },
  {
    activityId: "team:sector-protocol",
    area: "team",
    title: "Desafio do setor",
    route: "/equipes/desafio-do-setor",
    publishedVersion: 1,
    integrationStatus: "available",
    playerKey: "team-protocol",
    contractFamily: "team-protocol-v1",
    basePoints: 0,
    rewardClaimKey: "team:sector-protocol:round",
    competencyFocus: ["observar", "verificar", "decidir"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: EMPTY_RELATIONS,
    acceptedVersions: [1],
  },
  {
    activityId: TEAM_CHALLENGE_ACTIVITY_ID,
    area: "team",
    title: "Caixa de Entrada Segura",
    route: "/equipes/caixa-de-entrada-segura",
    publishedVersion: 1,
    integrationStatus: "available",
    playerKey: "secure-inbox-team-challenge",
    contractFamily: "team-challenge-v1",
    basePoints: POINT_RULES.teamOperation,
    rewardClaimKey: `${TEAM_CHALLENGE_ACTIVITY_ID}:first-completion`,
    competencyFocus: ["observar", "verificar", "decidir"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: EMPTY_RELATIONS,
    acceptedVersions: [1],
    legacy: true,
  },
  {
    activityId: BANK_CHANGE_ACTIVITY_ID,
    area: "team",
    title: "Mudança bancária sem atalho",
    route: "/equipes/mudanca-bancaria-sem-atalho",
    publishedVersion: BANK_CHANGE_PROCESS_ACTIVITY_VERSION,
    integrationStatus: "available",
    playerKey: "bank-change-team-challenge",
    contractFamily: "bank-process-v2",
    basePoints: POINT_RULES.teamOperation,
    rewardClaimKey: `${BANK_CHANGE_ACTIVITY_ID}:first-completion`,
    competencyFocus: ["verificar", "decidir", "reportar", "orientar"],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: [SIMULATION_ACTIVITY_ID],
    publishedCasePackageIds: [BANK_CHANGE_PROCESS_V2_PACKAGE.casePackageId],
    acceptedVersions: [1, BANK_CHANGE_PROCESS_ACTIVITY_VERSION],
  },
];

const legacyPlannedActivities: ActivityRegistryDefinition[] = [
  {
    activityId: "mission:delivery-qr",
    area: "mission",
    title: "Entrega por QR Code",
    route: "/missoes/entrega-por-qr-code",
    publishedVersion: null,
    integrationStatus: "planned",
    playerKey: null,
    contractFamily: "not-published",
    basePoints: POINT_RULES.mainMission,
    rewardClaimKey: "mission:delivery-qr:first-completion",
    competencyFocus: EMPTY_COMPETENCIES,
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: EMPTY_RELATIONS,
    acceptedVersions: [],
    legacy: true,
  },
];

const radarActivities: ActivityRegistryDefinition[] = RADAR_ARTICLES.map(
  (article) => ({
    activityId: article.id,
    area: "radar",
    title: article.title,
    route: `/radar/${article.slug}`,
    publishedVersion: article.status === "available" ? article.version : null,
    integrationStatus: article.status,
    playerKey: article.status === "available" ? "radar-article" : null,
    contractFamily:
      article.status === "available" ? "radar-v1" : "not-published",
    basePoints: POINT_RULES.radar,
    rewardClaimKey: `${article.id}:first-completion`,
    competencyFocus: [article.competencyId],
    prerequisiteActivityIds: EMPTY_RELATIONS,
    recommendedAfterActivityIds: EMPTY_RELATIONS,
    publishedCasePackageIds: EMPTY_RELATIONS,
    acceptedVersions: article.status === "available" ? [article.version] : [],
  }),
);

export const PORTAL_ACTIVITY_REGISTRY: readonly ActivityRegistryDefinition[] = [
  ...availableActivities,
  ...targetPlannedActivities,
  ...legacyPlannedActivities,
  ...radarActivities,
];

type StaticRouteDefinition = Omit<
  PortalRouteResolution,
  "pathname" | "activityId" | "playerKey"
>;

const STATIC_ROUTES: Readonly<Record<string, StaticRouteDefinition>> = {
  "/": {
    kind: "home",
    view: "inicio",
    title: "Visão geral",
    areaLabel: "Portal",
    hubRoute: "/",
  },
  "/missoes": {
    kind: "hub",
    view: "missoes",
    title: "Missões",
    areaLabel: "Missões",
    hubRoute: "/missoes",
  },
  "/simulacoes": {
    kind: "hub",
    view: "simulacoes",
    title: "Simulações",
    areaLabel: "Simulações",
    hubRoute: "/simulacoes",
  },
  "/phishlab": {
    kind: "hub",
    view: "laboratorio",
    title: "PhishLab",
    areaLabel: "PhishLab",
    hubRoute: "/phishlab",
  },
  "/arcade": {
    kind: "hub",
    view: "arcade",
    title: "Arcade",
    areaLabel: "Arcade",
    hubRoute: "/arcade",
  },
  "/radar": {
    kind: "hub",
    view: "radar",
    title: "Radar",
    areaLabel: "Radar",
    hubRoute: "/radar",
  },
  "/equipes": {
    kind: "hub",
    view: "equipes",
    title: "Equipes",
    areaLabel: "Equipes",
    hubRoute: "/equipes",
  },
  "/perfil": {
    kind: "hub",
    view: "perfil",
    title: "Meu perfil",
    areaLabel: "Perfil",
    hubRoute: "/perfil",
  },
  "/perfil/historico": {
    kind: "detail",
    view: "perfil",
    title: "Histórico de atividades",
    areaLabel: "Perfil",
    hubRoute: "/perfil",
  },
  "/perfil/conquistas": {
    kind: "detail",
    view: "perfil",
    title: "Conquistas",
    areaLabel: "Perfil",
    hubRoute: "/perfil",
  },
  "/gestao": {
    kind: "hub",
    view: "gestao",
    title: "Painel de gestão",
    areaLabel: "Gestão",
    hubRoute: "/gestao",
  },
};

const ARCADE_DETAIL_ROUTES: Readonly<Record<string, StaticRouteDefinition>> =
  Object.fromEntries(
    ARCADE_GAMES.map((game) => [
      `/arcade/${game.slug}`,
      {
        kind: "detail",
        view: "arcade",
        title: game.title,
        areaLabel: "Arcade",
        hubRoute: "/arcade",
      },
    ]),
  );

const AREA_FALLBACKS = [
  ["/missoes/", "missoes", "Missões", "/missoes"],
  ["/simulacoes/", "simulacoes", "Simulações", "/simulacoes"],
  ["/phishlab/", "laboratorio", "PhishLab", "/phishlab"],
  ["/arcade/", "arcade", "Arcade", "/arcade"],
  ["/radar/", "radar", "Radar", "/radar"],
  ["/equipes/", "equipes", "Equipes", "/equipes"],
] as const;

function normalizePortalPath(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = withoutQuery.startsWith("/")
    ? withoutQuery
    : `/${withoutQuery}`;
  return withLeadingSlash.length > 1
    ? withLeadingSlash.replace(/\/+$/, "")
    : withLeadingSlash;
}

function activityView(area: ActivityRegistryDefinition["area"]): PortalViewKey {
  if (area === "mission") return "missao";
  if (area === "phishlab") return "laboratorio";
  if (area === "simulation") return "simulacoes";
  if (area === "radar") return "radar";
  return "equipes";
}

function activityAreaLabel(area: ActivityRegistryDefinition["area"]): string {
  if (area === "mission") return "Missão";
  if (area === "phishlab") return "PhishLab";
  if (area === "simulation") return "Simulação";
  if (area === "radar") return "Radar";
  return "Equipes";
}

function activityHubRoute(
  area: ActivityRegistryDefinition["area"],
): `/${string}` {
  if (area === "mission") return "/missoes";
  if (area === "phishlab") return "/phishlab";
  if (area === "simulation") return "/simulacoes";
  if (area === "radar") return "/radar";
  return "/equipes";
}

export function findActivityById(
  activityId: string,
): ActivityRegistryDefinition | null {
  return (
    PORTAL_ACTIVITY_REGISTRY.find(
      (definition) => definition.activityId === activityId,
    ) ?? null
  );
}

export function findActivityByRoute(
  pathname: string,
): ActivityRegistryDefinition | null {
  const normalizedPath = normalizePortalPath(pathname);
  return (
    PORTAL_ACTIVITY_REGISTRY.find(
      (definition) => definition.route === normalizedPath,
    ) ?? null
  );
}

export function resolvePortalRoute(pathname: string): PortalRouteResolution {
  const normalizedPath = normalizePortalPath(pathname);
  const staticRoute = STATIC_ROUTES[normalizedPath] ?? ARCADE_DETAIL_ROUTES[normalizedPath];

  if (staticRoute) {
    return {
      pathname: normalizedPath,
      ...staticRoute,
      activityId: null,
      playerKey: null,
    };
  }

  const activity = findActivityByRoute(normalizedPath);
  if (activity) {
    return {
      pathname: normalizedPath,
      kind: activity.integrationStatus === "available" ? "activity" : "planned",
      view: activityView(activity.area),
      title: activity.title,
      areaLabel: activityAreaLabel(activity.area),
      hubRoute: activityHubRoute(activity.area),
      activityId: activity.activityId,
      playerKey: activity.playerKey,
    };
  }

  const fallback = AREA_FALLBACKS.find(([prefix]) =>
    normalizedPath.startsWith(prefix),
  );

  if (fallback) {
    return {
      pathname: normalizedPath,
      kind: "unknown",
      view: fallback[1],
      title: "Atividade não encontrada",
      areaLabel: fallback[2],
      hubRoute: fallback[3],
      activityId: null,
      playerKey: null,
    };
  }

  return {
    pathname: normalizedPath,
    kind: "unknown",
    view: "inicio",
    title: "Página não encontrada",
    areaLabel: "Portal",
    hubRoute: "/",
    activityId: null,
    playerKey: null,
  };
}

export function validateActivityRegistry(
  registry: readonly ActivityRegistryDefinition[] = PORTAL_ACTIVITY_REGISTRY,
): readonly string[] {
  const issues: string[] = [];
  const activityIds = new Set<string>();
  const routes = new Set<string>();

  for (const definition of registry) {
    if (activityIds.has(definition.activityId)) {
      issues.push(`activityId duplicado: ${definition.activityId}`);
    }
    activityIds.add(definition.activityId);

    if (routes.has(definition.route)) {
      issues.push(`rota duplicada: ${definition.route}`);
    }
    routes.add(definition.route);

    if (
      definition.integrationStatus === "available" &&
      (!definition.playerKey ||
        definition.publishedVersion === null ||
        !definition.acceptedVersions.includes(definition.publishedVersion) ||
        definition.contractFamily === "not-published")
    ) {
      issues.push(`atividade disponível incompleta: ${definition.activityId}`);
    }

    if (
      definition.integrationStatus === "planned" &&
      (definition.playerKey !== null || definition.acceptedVersions.length > 0)
    ) {
      issues.push(`atividade planejada exposta como executável: ${definition.activityId}`);
    }
  }

  return issues;
}
