"use client";

import { BankChangeChallenge } from "@/features/teams/BankChangeChallenge";
import { ConversationReconstructionMission } from "@/features/missions/ConversationReconstructionMission";
import { PhishingFoundationMission } from "@/features/missions/PhishingFoundationMission";
import { MfaFatigueMission } from "@/features/missions/MfaFatigueMission";
import { RecoveryMission } from "@/features/missions/RecoveryMission";
import { DomainUnderMagnifierLab } from "@/features/phishlab/DomainUnderMagnifierLab";
import { SenderInspectorLab } from "@/features/phishlab/SenderInspectorLab";
import { RadarArticle } from "@/features/radar/RadarExperience";
import { WorkdaySimulation } from "@/features/simulations/SimulationExperience";
import { TeamChallenge } from "@/features/teams/TeamsExperience";
import type { ActivityPlayerKey } from "@/lib/activities/types";

export const ACTIVITY_PLAYER_REGISTRY = {
  "phishing-foundation-mission": PhishingFoundationMission,
  "compromised-conversation-mission": ConversationReconstructionMission,
  "mfa-fatigue-mission": MfaFatigueMission,
  "recovery-mission": RecoveryMission,
  "sender-inspector": SenderInspectorLab,
  "link-analyzer": DomainUnderMagnifierLab,
  "workday-simulation": WorkdaySimulation,
  "secure-inbox-team-challenge": TeamChallenge,
  "bank-change-team-challenge": BankChangeChallenge,
  "radar-article": RadarArticle,
} as const;

export type RegisteredActivityPlayerKey =
  keyof typeof ACTIVITY_PLAYER_REGISTRY;

export function isRegisteredActivityPlayerKey(
  playerKey: ActivityPlayerKey | null,
): playerKey is RegisteredActivityPlayerKey {
  return Boolean(
    playerKey &&
      Object.prototype.hasOwnProperty.call(ACTIVITY_PLAYER_REGISTRY, playerKey),
  );
}

export function isActivityPlayerReady(
  playerKey: ActivityPlayerKey | null,
): boolean {
  return isRegisteredActivityPlayerKey(playerKey);
}
