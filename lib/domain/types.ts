import type {
  FoundationAssessmentId,
  FoundationConfirmationRouteId,
  FoundationConsequenceId,
  FoundationEvaluationId,
  FoundationFinalActionId,
  FoundationPauseDecisionId,
  FoundationProtectedAssetId,
  FoundationReportDetailId,
  FoundationRequestedActionId,
  FoundationTransferDecisionId,
} from "../content/activities/account-lock/v2";
import type {
  IdentityClaimAssessmentId,
  IdentityRelationId,
  IdentityVerificationRouteId,
} from "../content/activities/true-sender/v2";
import type {
  MfaAssociationId,
  MfaEventActionId,
  MfaOfficialConsoleActionId,
  MfaOfficialEntryRouteId,
  MfaReportDetailId,
  MfaSupportResponseId,
  MfaTransferActionId,
} from "../content/activities/mfa-console/v2";
import type {
  RecoveryActionPlacement,
  RecoveryOfficialRouteId,
  RecoveryReportBlockId,
} from "../content/activities/recovery-builder/v2";
import type {
  WorkdayActionId,
  WorkdayQueueId,
} from "../content/activities/workday-triage/v2";
import type {
  BankComparisonId,
  BankContactSourceId,
  BankProcessCardId,
  BankProcessGroupId,
  BankReportBlockId,
} from "../content/activities/bank-change/v2";

export const APP_SCHEMA_VERSION = 15 as const;

export const TUTORIAL_VERSION = 1 as const;

export type EvidenceKey = "sender" | "link" | "context";

export type DecisionKey = "reportar" | "verificar" | "excluir" | "abrir";

export type ReasonKey = "domain" | "urgency" | "visual" | "destination";

export type CompetencyId =
  | "observar"
  | "investigar"
  | "verificar"
  | "decidir"
  | "reportar"
  | "recuperar"
  | "orientar";

export type JourneyMissionStatus =
  | "locked"
  | "available"
  | "inProgress"
  | "completed";

export type JourneyMissionDefinition = {
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  summary: string;
  competencyFocus: CompetencyId[];
  estimatedMinutes: number;
  prerequisiteMissionId?: string;
  playableInMvp: boolean;
};

export type JourneyMissionView = JourneyMissionDefinition & {
  href: string;
  status: JourneyMissionStatus;
  attemptCount: number;
  bestScore: number | null;
  completedAt: string | null;
};

export type JourneyProgress = {
  missions: JourneyMissionView[];
  completedMissions: number;
  totalMissions: number;
  percentage: number;
  currentMission: JourneyMissionView | null;
  nextLockedMission: JourneyMissionView | null;
  isComplete: boolean;
};

export type NextStepRecommendation = {
  kind:
    | "startMission"
    | "continueMission"
    | "adaptiveReview"
    | "nextMission"
    | "journeyComplete";
  targetId: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  optional: boolean;
  journeyAlternative: {
    targetId: string;
    href: string;
    label: string;
  } | null;
};

export type MissionRewardBreakdown = {
  attemptId: string;
  activityId: string;
  basePoints: number;
  bonusRate: number;
  bonusPercentage: number;
  bonusPoints: number;
  totalPoints: number;
  claimStatus: "unclaimed" | "granted" | "alreadyGranted";
  rewardGranted: boolean;
  grantedOnThisAttempt: boolean;
  grantedPoints: number;
};

export type LevelProgress = {
  currentLevel: {
    id: string;
    label: string;
    minimum: number;
  };
  nextLevel: {
    id: string;
    label: string;
    minimum: number;
  } | null;
  totalPoints: number;
  pointsToNextLevel: number | null;
  progressPercentage: number;
  isMaximumLevel: boolean;
};

export type CompetencyLevelId =
  | "notAssessed"
  | "developing"
  | "practicing"
  | "consolidated"
  | "mastered";

export type CompetencyOverview = {
  id: CompetencyId;
  label: string;
  summary: string;
  score: number | null;
  levelId: CompetencyLevelId;
  levelLabel: string;
  evidenceCount: number;
  demonstratedContexts: number;
  latestActivityId: string | null;
  latestEvidenceAt: string | null;
};

export type PointOrigin = {
  id: string;
  sourceId: string;
  sourceLabel: string;
  category: PointEntry["category"];
  categoryLabel: string;
  points: number;
  status: PointEntry["status"];
  createdAt: string;
};

export type MissionSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  decision: DecisionKey;
  inspectedEvidence: EvidenceKey[];
  selectedReasonIds: ReasonKey[];
};

export type MissionAnswer = Omit<
  MissionSubmission,
  "attemptId" | "completedAt"
>;

export type MissionResult = {
  score: number;
  decision: DecisionKey;
  inspected: number;
  correctReasons: number;
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type MissionAttempt = MissionSubmission & {
  status: "evaluated";
  result: MissionResult;
};

export type PhishingFoundationV2Submission = {
  attemptId: string;
  activityId: "mission:account-lock";
  activityVersion: 2;
  casePackageId: string;
  completedAt: string;
  mechanicId: "phishing-foundation";
  requestedActionId?: FoundationRequestedActionId;
  protectedAssetId: FoundationProtectedAssetId;
  potentialConsequenceId: FoundationConsequenceId;
  pauseDecisionId: FoundationPauseDecisionId;
  evaluationId: FoundationEvaluationId;
  confirmationRouteId: FoundationConfirmationRouteId;
  finalAssessmentId: FoundationAssessmentId;
  finalActionId: FoundationFinalActionId;
  reportDetailIds: FoundationReportDetailId[];
  transferDecisionId: FoundationTransferDecisionId;
};

export type PhishingFoundationV2Answer = Omit<
  PhishingFoundationV2Submission,
  "attemptId" | "completedAt"
>;

export type PhishingFoundationV2Result = {
  score: number;
  requestImpactPoints: number;
  pauseEvaluationPoints: number;
  confirmationPoints: number;
  responseReportPoints: number;
  transferPoints: number;
  correctReportDetails: number;
  totalSafeReportDetails: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type PhishingFoundationV2Attempt = PhishingFoundationV2Submission & {
  status: "evaluated";
  result: PhishingFoundationV2Result;
};

export type ConversationEvidenceAssessment = {
  evidenceId: string;
  classificationId: "fact" | "indicator" | "inference";
};

export type ConversationReconstructionV2Submission = {
  attemptId: string;
  activityId: "mission:compromised-conversation";
  activityVersion: 2;
  casePackageId: string;
  completedAt: string;
  mechanicId: "conversation-reconstruction";
  orderedArtifactIds: string[];
  turningPointArtifactId: string;
  evidenceAssessments: ConversationEvidenceAssessment[];
  provisionalConclusionId:
    | "legitimate"
    | "malicious-probable"
    | "inconclusive";
  finalConclusionId:
    | "legitimate"
    | "malicious-probable"
    | "inconclusive";
  confirmationRouteId:
    | "registered-contact"
    | "same-thread"
    | "request-contact"
    | "public-search";
  finalActionId:
    | "pause-confirm-report"
    | "pause-confirm-normal-process"
    | "refuse-check-official"
    | "continue-request";
  reportDetailIds: string[];
  transferDecisionId:
    | "pause-use-known-route"
    | "continue-familiar-channel"
    | "reply-for-confirmation"
    | "ignore-without-record";
};

export type ConversationReconstructionV2Answer = Omit<
  ConversationReconstructionV2Submission,
  "attemptId" | "completedAt"
>;

export type ConversationReconstructionV2Result = {
  score: number;
  reconstructionPoints: number;
  turningPointPoints: number;
  evidencePoints: number;
  calibrationPoints: number;
  confirmationPoints: number;
  responsePoints: number;
  correctEvidenceAssessments: number;
  totalEvidenceAssessments: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type ConversationReconstructionV2Attempt =
  ConversationReconstructionV2Submission & {
    status: "evaluated";
    result: ConversationReconstructionV2Result;
  };

export type MfaEventAssociation = {
  eventId: string;
  associationId: MfaAssociationId;
};

export type MfaEventDecision = {
  eventId: string;
  actionId: MfaEventActionId;
};

export type MfaConsoleV2Submission = {
  attemptId: string;
  activityId: "mission:mfa-fatigue";
  activityVersion: 2;
  casePackageId: string;
  completedAt: string;
  mechanicId: "mfa-console";
  eventInitiationAssociations: MfaEventAssociation[];
  eventActions: MfaEventDecision[];
  supportResponseIds: MfaSupportResponseId[];
  officialEntryRouteId: MfaOfficialEntryRouteId;
  officialConsoleActionIds: MfaOfficialConsoleActionId[];
  reportDetailIds: MfaReportDetailId[];
  transferAssociationId: MfaAssociationId;
  transferActionId: MfaTransferActionId;
};

export type MfaConsoleV2Answer = Omit<
  MfaConsoleV2Submission,
  "attemptId" | "completedAt"
>;

export type MfaConsoleV2Result = {
  score: number;
  contextAssociationPoints: number;
  eventDecisionPoints: number;
  factorSupportPoints: number;
  officialRoutePoints: number;
  recoveryReportPoints: number;
  correctAssociations: number;
  totalAssociations: number;
  correctEventActions: number;
  totalEventActions: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type MfaConsoleV2Attempt = MfaConsoleV2Submission & {
  status: "evaluated";
  result: MfaConsoleV2Result;
};

export type RecoveryIncidentType =
  | "opened-message"
  | "clicked-link"
  | "entered-credentials"
  | "approved-mfa";

export type RecoveryImmediateActionId =
  | "report-now"
  | "secure-alone-first"
  | "wait-for-signs"
  | "hide-incident";

export type RecoveryActionId =
  | "stop-interaction"
  | "preserve-details"
  | "report-official"
  | "change-password-known-route"
  | "review-sessions"
  | "deny-further-mfa"
  | "delete-evidence"
  | "forward-to-colleagues"
  | "continue-interaction";

export type RecoveryReportDetailId =
  | "received-channel"
  | "occurred-at"
  | "apparent-sender-destination"
  | "action-taken"
  | "affected-device"
  | "password-or-code";

export type RecoveryMissionSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  incidentType: RecoveryIncidentType;
  immediateActionId: RecoveryImmediateActionId;
  selectedRecoveryActionIds: RecoveryActionId[];
  selectedReportDetailIds: RecoveryReportDetailId[];
};

export type RecoveryMissionAnswer = Omit<
  RecoveryMissionSubmission,
  "attemptId" | "completedAt"
>;

export type RecoveryMissionResult = {
  score: number;
  incidentType: RecoveryIncidentType;
  immediatePoints: number;
  recoveryPoints: number;
  reportPoints: number;
  correctRecoveryActions: number;
  expectedRecoveryActions: number;
  harmfulActions: number;
  correctReportDetails: number;
  exposedSecret: boolean;
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type RecoveryMissionAttempt = RecoveryMissionSubmission & {
  status: "evaluated";
  result: RecoveryMissionResult;
};

export type RecoveryBuilderV2Submission = {
  attemptId: string;
  activityId: "mission:clicked-now-what";
  activityVersion: 2;
  casePackageId: string;
  completedAt: string;
  mechanicId: "incident-response-builder";
  timelineFactIds: string[];
  exposureStageId: string;
  actionPlacements: RecoveryActionPlacement[];
  reportBlockIds: RecoveryReportBlockId[];
  officialRouteActionId: RecoveryOfficialRouteId;
  transferExposureId: string;
  transferFirstActionIds: string[];
};

export type RecoveryBuilderV2Answer = Omit<
  RecoveryBuilderV2Submission,
  "attemptId" | "completedAt"
>;

export type RecoveryBuilderV2Result = {
  score: number;
  casePackageId: string;
  exposurePoints: number;
  classificationPoints: number;
  precedencePoints: number;
  proportionalityPoints: number;
  reportPoints: number;
  correctPlacements: number;
  totalPlacements: number;
  correctPrecedencePairs: number;
  totalPrecedencePairs: number;
  safeReportBlocks: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type RecoveryBuilderV2Attempt = RecoveryBuilderV2Submission & {
  status: "evaluated";
  result: RecoveryBuilderV2Result;
};

export type LinkVerdict = "legitimate" | "suspicious" | "inconclusive";

export type LinkToolKey =
  | "protocol"
  | "subdomain"
  | "registeredDomain"
  | "path"
  | "displayName"
  | "fromAddress"
  | "replyTo"
  | "messageContext";

export type LinkEvidenceKey =
  | "registered-domain"
  | "expected-context"
  | "https-alone"
  | "visual-familiarity"
  | "known-address"
  | "changed-request"
  | "reply-to-proves-safety"
  | "display-name-proof";

export type PhishLabSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  usedTools: LinkToolKey[];
  usedHint: boolean;
  guidedVerdict: LinkVerdict;
  independentVerdict: LinkVerdict;
  independentEvidence: LinkEvidenceKey[];
};

export type PhishLabAnswer = Omit<
  PhishLabSubmission,
  "attemptId" | "completedAt"
>;

export type PhishLabResult = {
  score: number;
  evidencePoints: number;
  conclusionPoints: number;
  toolsPoints: number;
  independentPoints: number;
  usedTools: number;
  selectedEvidence: number;
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type PhishLabAttempt = PhishLabSubmission & {
  status: "evaluated";
  result: PhishLabResult;
};

export type UrlAnatomyMechanicAnswerPayload = {
  segmentRoleById: Record<string, string>;
  registeredDomainSelectionId: string;
  inspectedSegmentIds: string[];
  verdictId: LinkVerdict;
  safeRouteId: string;
  transferRegisteredDomainSelectionId: string;
  transferVerdictId: LinkVerdict;
  usedHelpIds: string[];
};

export type DomainAnalyzerV2Submission = {
  attemptId: string;
  activityId: "phishlab:link-analyzer";
  activityVersion: 2;
  casePackageId: string;
  completedAt: string;
  mechanicId: "url-anatomy";
  answerPayload: UrlAnatomyMechanicAnswerPayload;
};

export type DomainAnalyzerV2Answer = Omit<
  DomainAnalyzerV2Submission,
  "attemptId" | "completedAt"
>;

export type DomainAnalyzerV2Result = {
  score: number;
  anatomyPoints: number;
  domainConclusionPoints: number;
  safeRoutePoints: number;
  transferPoints: number;
  correctlyAssignedSegments: number;
  totalSegments: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type DomainAnalyzerV2Attempt = DomainAnalyzerV2Submission & {
  status: "evaluated";
  result: DomainAnalyzerV2Result;
};

export type IdentityMapMechanicAnswerPayload = {
  fieldRelationById: Record<string, IdentityRelationId>;
  claimAssessmentById: Record<string, IdentityClaimAssessmentId>;
  inspectedEvidenceIds: string[];
  verdictId: LinkVerdict;
  verificationRouteId: IdentityVerificationRouteId;
  transferVerdictId: LinkVerdict;
  transferVerificationRouteId: IdentityVerificationRouteId;
  usedHelpIds: string[];
};

export type TrueSenderV2Submission = {
  attemptId: string;
  activityId: "phishlab:true-sender";
  activityVersion: 2;
  casePackageId: string;
  completedAt: string;
  mechanicId: "identity-map";
  answerPayload: IdentityMapMechanicAnswerPayload;
};

export type TrueSenderV2Answer = Omit<
  TrueSenderV2Submission,
  "attemptId" | "completedAt"
>;

export type TrueSenderV2Result = {
  score: number;
  evidencePoints: number;
  conclusionPoints: number;
  mapPoints: number;
  transferPoints: number;
  correctlyMappedFields: number;
  totalMappedFields: number;
  correctClaimAssessments: number;
  totalClaimAssessments: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type TrueSenderV2Attempt = TrueSenderV2Submission & {
  status: "evaluated";
  result: TrueSenderV2Result;
};

export type SimulationActionKey = "keep" | "verify" | "report" | "delete";

export type SimulationMessageDecision = {
  messageId: string;
  action: SimulationActionKey;
  inspectedEvidence: EvidenceKey[];
};

export type SimulationSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  messageDecisions: SimulationMessageDecision[];
};

export type SimulationAnswer = Omit<
  SimulationSubmission,
  "attemptId" | "completedAt"
>;

export type SimulationResult = {
  score: number;
  identificationPoints: number;
  actionPoints: number;
  evidencePoints: number;
  falsePositivePoints: number;
  correctIdentifications: number;
  correctActions: number;
  inspectedMessages: number;
  falsePositives: number;
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type SimulationAttempt = SimulationSubmission & {
  status: "evaluated";
  result: SimulationResult;
};

export type WorkdayTriageV2ItemDecision = {
  itemId: string;
  queueId: WorkdayQueueId;
  actionId: WorkdayActionId;
  inspectedEvidenceIds: string[];
};

export type WorkdayTriageV2Submission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  casePackageId: string;
  completedAt: string;
  mechanicId: "batch-triage";
  itemDecisions: WorkdayTriageV2ItemDecision[];
  transferActionId: WorkdayActionId;
  transferEvidenceId: string;
};

export type WorkdayTriageV2Answer = Omit<
  WorkdayTriageV2Submission,
  "attemptId" | "completedAt"
>;

export type WorkdayTriageV2Result = {
  score: number;
  triagePoints: number;
  actionPoints: number;
  evidencePoints: number;
  calibrationPoints: number;
  correctQueues: number;
  correctActions: number;
  totalItems: number;
  inspectedEvidence: number;
  requiredEvidence: number;
  falsePositives: number;
  criticalFailureIds: string[];
  teamPoints: number;
  needsReview: boolean;
  potentialReward: number;
};

export type WorkdayTriageV2Attempt = WorkdayTriageV2Submission & {
  status: "evaluated";
  result: WorkdayTriageV2Result;
};

export type RadarSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  selectedOptionId: string;
};

export type RadarAnswer = Omit<RadarSubmission, "attemptId" | "completedAt">;

export type RadarResult = {
  score: number;
  correct: boolean;
  points: number;
  alreadyCompleted: boolean;
};

export type RadarAttempt = RadarSubmission & {
  status: "evaluated";
  result: RadarResult;
};

export type TeamChallengeDecision = {
  caseId: string;
  action: SimulationActionKey;
  inspectedEvidence: EvidenceKey[];
};

export type TeamChallengeSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  caseDecisions: TeamChallengeDecision[];
};

export type TeamChallengeAnswer = Omit<
  TeamChallengeSubmission,
  "attemptId" | "completedAt"
>;

export type TeamChallengeCompetencyScores = Record<
  "observar" | "verificar" | "decidir",
  number
>;

export type TeamChallengeResult = {
  score: number;
  correctDecisions: number;
  totalDecisions: number;
  falsePositives: number;
  competencyScores: TeamChallengeCompetencyScores;
  coveredCompetencyIds: CompetencyId[];
  potentialReward: number;
};

export type TeamChallengeAttempt = TeamChallengeSubmission & {
  status: "evaluated";
  result: TeamChallengeResult;
};

export type BankChangeStageId =
  | "initial-action"
  | "evidence-assessment"
  | "verification-route"
  | "process-action"
  | "report-action";

export type BankChangeInitialActionId =
  | "pause-and-preserve"
  | "reply-and-hold"
  | "apply-now"
  | "ignore-request";

export type BankChangeEvidenceAssessmentId =
  | "plausible-not-authenticated"
  | "thread-proves-identity"
  | "document-proves-change"
  | "urgency-supports-request";

export type BankChangeVerificationRouteId =
  | "registered-contact"
  | "public-search"
  | "request-contact"
  | "same-thread";

export type BankChangeProcessActionId =
  | "block-report-second-approval"
  | "pay-old-account-now"
  | "supervisor-only-approval"
  | "update-and-review-later";

export type BankChangeReportActionId =
  | "official-complete-report"
  | "finance-only"
  | "team-chat-forward"
  | "wait-for-more";

export type BankChangeEvidenceId =
  | "request-context"
  | "payment-schedule"
  | "vendor-record"
  | "official-procedure"
  | "registered-contact-response";

export type BankChangeSubmission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  completedAt: string;
  initialActionId: BankChangeInitialActionId;
  evidenceAssessmentId: BankChangeEvidenceAssessmentId;
  verificationRouteId: BankChangeVerificationRouteId;
  processActionId: BankChangeProcessActionId;
  reportActionId: BankChangeReportActionId;
  inspectedEvidenceIds: BankChangeEvidenceId[];
};

export type BankChangeAnswer = Omit<
  BankChangeSubmission,
  "attemptId" | "completedAt"
>;

export type BankChangeStageScores = Record<BankChangeStageId, number>;

export type BankChangeCompetencyScores = Record<
  "verificar" | "decidir" | "reportar" | "orientar",
  number
>;

export type BankChangeResult = {
  score: number;
  correctDecisions: number;
  totalDecisions: 5;
  stageScores: BankChangeStageScores;
  competencyScores: BankChangeCompetencyScores;
  coveredCompetencyIds: CompetencyId[];
  needsReview: boolean;
  criticalFailureStageIds: BankChangeStageId[];
  potentialReward: number;
};

export type BankChangeAttempt = BankChangeSubmission & {
  status: "evaluated";
  result: BankChangeResult;
};

export type BankProcessV2CardPlacement = {
  cardId: BankProcessCardId;
  groupId: BankProcessGroupId;
  position: number;
};

export type BankProcessV2Submission = {
  attemptId: string;
  activityId: string;
  activityVersion: number;
  casePackageId: string;
  completedAt: string;
  mechanicId: "process-station";
  selectedComparisonIds: BankComparisonId[];
  contactSourceId: BankContactSourceId;
  contactResponseViewed: boolean;
  processPlacements: BankProcessV2CardPlacement[];
  selectedReportBlockIds: BankReportBlockId[];
};

export type BankProcessV2Answer = Omit<
  BankProcessV2Submission,
  "attemptId" | "completedAt"
>;

export type BankProcessV2Result = {
  score: number;
  comparisonPoints: number;
  contactPoints: number;
  processClassificationPoints: number;
  processRelationPoints: number;
  reportPoints: number;
  correctDecisions: number;
  totalDecisions: 5;
  normalizedControlScores: BankChangeStageScores;
  competencyScores: BankChangeCompetencyScores;
  coveredCompetencyIds: CompetencyId[];
  needsReview: boolean;
  criticalFailureIds: string[];
  potentialReward: number;
};

export type BankProcessV2Attempt = BankProcessV2Submission & {
  status: "evaluated";
  result: BankProcessV2Result;
};

export type LearningAttempt =
  | MissionAttempt
  | PhishingFoundationV2Attempt
  | ConversationReconstructionV2Attempt
  | MfaConsoleV2Attempt
  | RecoveryMissionAttempt
  | RecoveryBuilderV2Attempt
  | PhishLabAttempt
  | DomainAnalyzerV2Attempt
  | TrueSenderV2Attempt
  | SimulationAttempt
  | WorkdayTriageV2Attempt
  | RadarAttempt
  | TeamChallengeAttempt
  | BankChangeAttempt
  | BankProcessV2Attempt;

export type ActivityProgress = {
  activityId: string;
  status: "available" | "inProgress" | "completed";
  attemptIds: string[];
  lastAttemptId?: string;
  bestScore?: number;
  completedAt?: string;
};

export type RewardClaim = {
  claimKey: string;
  sourceId: string;
  points: number;
  claimedAt: string;
};

export type PointEntry = {
  id: string;
  claimKey: string;
  sourceId: string;
  category: "learning" | "arcade" | "team" | "radar" | "achievement";
  points: number;
  status: "confirmed" | "pending";
  createdAt: string;
};

export type CompetencyEvidence = {
  key: string;
  competencyId: CompetencyId;
  activityId: string;
  attemptId: string;
  score: number;
  context: "guided" | "independent" | "review";
  createdAt: string;
};

export type ReviewRecommendation = {
  id: string;
  sourceActivityId: string;
  targetActivityId: string;
  reason: string;
  status: "recommended" | "completed" | "dismissed";
  createdAt: string;
};

export type HistoryEvent = {
  id: string;
  kind:
    | "activityCompleted"
    | "rewardGranted"
    | "achievementUnlocked"
    | "demoReset";
  sourceId: string;
  title: string;
  createdAt: string;
};

export type ActivityTimelineItem = {
  id: string;
  kind: "learningActivity" | "achievement";
  sourceId: string;
  categoryLabel: string;
  title: string;
  detail: string;
  createdAt: string;
  attemptCount: number;
  latestScore: number | null;
  bestScore: number | null;
  confirmedPoints: number;
  competencyCount: number;
  hasTeamContribution: boolean;
  href: string;
  actionLabel: string;
};

export type LearnerPreferences = {
  reducedMotion: boolean;
  highContrast: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  textSize: "default" | "large" | "extraLarge";
  captionsEnabled: boolean;
  leaderboardParticipation: boolean;
  leaderboardIdentity: "initials" | "displayName" | "anonymous";
  notificationMission: boolean;
  notificationReview: boolean;
  notificationArcade: boolean;
  notificationTeam: boolean;
  notificationRadar: boolean;
  reminderFrequency: "important" | "weekly" | "off";
};

export type LearnerRegistration = {
  employeeId: string;
  name: string;
  sectorId: string;
  sectorName: string;
  leaderboardParticipation: boolean;
  leaderboardIdentity: LearnerPreferences["leaderboardIdentity"];
};

export type ManagementTestUserStatus = "active" | "inactive";

export type ManagementTestUser = {
  id: string;
  employeeId: string;
  name: string;
  sectorId: string;
  sectorName: string;
  status: ManagementTestUserStatus;
  createdAt: string;
  updatedAt: string;
};

export type ManagementTestUserInput = {
  id?: string;
  employeeId: string;
  name: string;
  sectorId: string;
  sectorName: string;
};

export type TeamContribution = {
  claimKey: string;
  sourceId: string;
  points: number;
  createdAt: string;
};

export type TeamAggregateClaim = {
  claimKey: string;
  sourceId: string;
  correctDecisions: number;
  totalDecisions: number;
  coveredCompetencyIds: CompetencyId[];
  createdAt: string;
};

export type SectorAggregate = {
  eligibleParticipants: number;
  validParticipants: number;
  correctDecisions: number;
  validDecisions: number;
  requiredCompetencyIds: CompetencyId[];
  coveredCompetencyIds: CompetencyId[];
};

export type SectorRankingEntry = {
  id: string;
  name: string;
  score: number;
};

export type SectorMetrics = {
  participation: number;
  precision: number;
  coverage: number;
  score: number;
  shieldLevel: "Em construção" | "Reforçado" | "Protegido" | "Resiliente";
};

export type TeamCollectiveHistoryEvent = {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
};

export type TutorialStatus =
  | "required"
  | "available"
  | "inProgress"
  | "completed";

export type TutorialState = {
  version: typeof TUTORIAL_VERSION;
  status: TutorialStatus;
  currentStep: number;
  completedAt: string | null;
};

export type AppState = {
  meta: {
    schemaVersion: typeof APP_SCHEMA_VERSION;
    revision: number;
    savedAt: string;
  };
  demo: {
    learner: {
      id: string;
      name: string;
      store: string;
      area: string;
    };
    administrator: {
      id: string;
      name: string;
    };
    activeRole: "learner" | "administrator";
  };
  learning: {
    attempts: Record<string, LearningAttempt>;
    activityProgress: Record<string, ActivityProgress>;
    rewardClaims: Record<string, RewardClaim>;
    pointLedger: PointEntry[];
    competencyEvidence: CompetencyEvidence[];
    recommendations: Record<string, ReviewRecommendation>;
    history: HistoryEvent[];
  };
  teams: {
    id: string;
    name: string;
    baseShield: number;
    contributionClaims: Record<string, TeamContribution>;
    aggregateClaims: Record<string, TeamAggregateClaim>;
    sectorAggregate: SectorAggregate;
    ranking: SectorRankingEntry[];
    activeGoal: {
      id: string;
      title: string;
      description: string;
      targetScore: number;
    };
    history: TeamCollectiveHistoryEvent[];
  };
  preferences: LearnerPreferences;
  onboarding: {
    tutorial: TutorialState;
  };
  admin: {
    testUsers: ManagementTestUser[];
    auditLog: Array<{
      id: string;
      action: string;
      actorId: string;
      createdAt: string;
    }>;
  };
};
