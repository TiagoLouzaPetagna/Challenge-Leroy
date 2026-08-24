import type { AuthenticatedAccount } from "@/lib/auth/types";
import type { AppState } from "@/lib/domain/types";

export function bindStateToAccount(
  state: AppState,
  account: AuthenticatedAccount,
): AppState {
  const rankingHasSector = state.teams.ranking.some(
    (entry) => entry.id === account.sectorId,
  );

  return {
    ...state,
    demo: {
      learner: {
        id: account.employeeId,
        name: account.name,
        store: "Conta autenticada",
        area: account.sectorName,
      },
      administrator:
        account.role === "administrator"
          ? { id: account.employeeId, name: account.name }
          : state.demo.administrator,
      activeRole: account.role,
    },
    teams: {
      ...state.teams,
      id: account.sectorId,
      name: account.sectorName,
      ranking: rankingHasSector
        ? state.teams.ranking.map((entry) =>
            entry.id === account.sectorId
              ? { ...entry, name: account.sectorName }
              : entry,
          )
        : [
            ...state.teams.ranking,
            {
              id: account.sectorId,
              name: account.sectorName,
              score: state.teams.baseShield,
            },
          ],
    },
  };
}
