export type IndividualLeaderboardEntry = {
  position: number;
  displayName: string;
  totalPoints: number;
  completedActivities: number;
  averageScore: number;
  isCurrent: boolean;
};

export type SectorLeaderboardEntry = {
  position: number;
  sectorId: string;
  sectorName: string;
  score: number;
  averagePoints: number;
  averageScore: number;
  completionRate: number;
  participationRate: number;
  eligibleParticipants: number;
  activeParticipants: number;
  isCurrent: boolean;
};

export type CurrentLeaderboardParticipant = {
  participates: boolean;
  position: number | null;
  totalPoints: number;
  completedActivities: number;
  averageScore: number;
};

export type LeaderboardResponse = {
  generatedAt: string;
  availableCurriculumActivities: number;
  individual: IndividualLeaderboardEntry[];
  sectors: SectorLeaderboardEntry[];
  currentParticipant: CurrentLeaderboardParticipant | null;
};

export type AuthoritativeProgressSummary = {
  totalPoints: number;
  completedActivities: number;
  completedCurriculumActivities: number;
  completedMissions: number;
  averageScore: number;
  leaderboardParticipation: boolean;
  leaderboardIdentity: "initials" | "displayName" | "anonymous";
  lastActivityAt: string | null;
};
