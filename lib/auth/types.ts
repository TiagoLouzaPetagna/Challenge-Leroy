export type AccountRole = "administrator" | "learner";

export type AuthenticatedAccount = {
  id: string;
  employeeId: string;
  name: string;
  role: AccountRole;
  sectorId: string;
  sectorName: string;
};

export type AuthSessionResponse = {
  account: AuthenticatedAccount | null;
};
