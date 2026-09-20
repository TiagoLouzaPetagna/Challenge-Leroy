export type SectorRankingBasis = {
  sectorId: string;
  sectorName: string;
  eligibleMembers: number;
  participants: number;
  averagePoints: number;
};

export type SectorRankingEntry = SectorRankingBasis & {
  position: number;
  participationRate: number;
  isCurrent: boolean;
};

export type TeamRankingsResponse = {
  periodId: string;
  periodLabel: string;
  participation: SectorRankingEntry[];
  points: SectorRankingEntry[];
};

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

export function buildTeamSectorRankings(
  sectors: SectorRankingBasis[],
  currentSectorId: string,
): Pick<TeamRankingsResponse, "participation" | "points"> {
  const entries = sectors
    .filter((sector) => sector.eligibleMembers > 0)
    .map((sector) => ({
      ...sector,
      participationRate: roundOne((sector.participants / sector.eligibleMembers) * 100),
      isCurrent: sector.sectorId === currentSectorId,
    }));

  function ranked(metric: "participation" | "points") {
    const metricValue = (entry: typeof entries[number]) => metric === "participation"
      ? entry.participants / entry.eligibleMembers
      : entry.averagePoints;
    const sorted = [...entries].sort((left, right) =>
      metricValue(right) - metricValue(left) || left.sectorName.localeCompare(right.sectorName, "pt-BR"),
    );
    return sorted.map((entry, index) => ({
      ...entry,
      position: index > 0 && metricValue(entry) === metricValue(sorted[index - 1])
        ? sorted.findIndex((candidate) => metricValue(candidate) === metricValue(entry)) + 1
        : index + 1,
    }));
  }

  return { participation: ranked("participation"), points: ranked("points") };
}
