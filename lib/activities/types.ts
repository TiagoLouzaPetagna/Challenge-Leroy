import type { CompetencyId } from "../domain/types";

export type PortalViewKey =
  | "inicio"
  | "missoes"
  | "missao"
  | "simulacoes"
  | "laboratorio"
  | "arcade"
  | "radar"
  | "equipes"
  | "perfil"
  | "gestao";

export type ActivityArea =
  | "mission"
  | "phishlab"
  | "simulation"
  | "radar"
  | "team";

export type ActivityIntegrationStatus = "available" | "planned";

export type ActivityContractFamily =
  | "mission-v1"
  | "phishing-foundation-v2"
  | "conversation-reconstruction-v2"
  | "mfa-console-v2"
  | "recovery-mission-v1"
  | "incident-response-builder-v2"
  | "phishlab-v1"
  | "url-anatomy-v2"
  | "identity-map-v2"
  | "simulation-v1"
  | "batch-triage-v2"
  | "radar-v1"
  | "team-challenge-v1"
  | "team-protocol-v1"
  | "bank-change-v1"
  | "bank-process-v2"
  | "not-published";

export type ActivityPlayerKey =
  | "phishing-foundation-mission"
  | "compromised-conversation-mission"
  | "mfa-fatigue-mission"
  | "recovery-mission"
  | "sender-inspector"
  | "link-analyzer"
  | "workday-simulation"
  | "secure-inbox-team-challenge"
  | "team-protocol"
  | "bank-change-team-challenge"
  | "radar-article";

export type ActivityRegistryDefinition = {
  activityId: string;
  area: ActivityArea;
  title: string;
  route: `/${string}`;
  publishedVersion: number | null;
  integrationStatus: ActivityIntegrationStatus;
  playerKey: ActivityPlayerKey | null;
  contractFamily: ActivityContractFamily;
  basePoints: number;
  rewardClaimKey: string;
  competencyFocus: readonly CompetencyId[];
  prerequisiteActivityIds: readonly string[];
  recommendedAfterActivityIds: readonly string[];
  publishedCasePackageIds: readonly string[];
  acceptedVersions: readonly number[];
  legacy?: boolean;
};

export type PortalRouteKind =
  | "home"
  | "hub"
  | "activity"
  | "detail"
  | "planned"
  | "unknown";

export type PortalRouteResolution = {
  pathname: string;
  kind: PortalRouteKind;
  view: PortalViewKey;
  title: string;
  areaLabel: string;
  hubRoute: `/${string}` | "/";
  activityId: string | null;
  playerKey: ActivityPlayerKey | null;
};
