import PortalPage from "../page";
import { requireAdministrator } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function ManagementPage() {
  await requireAdministrator("/gestao");
  return <PortalPage />;
}
