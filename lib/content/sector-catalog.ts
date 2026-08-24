export type SectorDefinition = {
  id: string;
  name: string;
};

// Lista demonstrativa: deve ser substituída por um diretório validado antes
// de qualquer uso corporativo. Unidade/loja não faz parte deste contrato.
export const SECTOR_CATALOG: readonly SectorDefinition[] = [
  { id: "casa-decoracao", name: "Casa & Decoração" },
  { id: "ferramentas", name: "Ferramentas" },
  { id: "tintas", name: "Tintas" },
  { id: "jardim", name: "Jardim" },
  { id: "madeiras", name: "Madeiras" },
  { id: "logistica", name: "Logística" },
  { id: "atendimento", name: "Atendimento" },
  { id: "administracao", name: "Administração" },
] as const;

export const CUSTOM_SECTOR_ID = "outro-setor" as const;

export function findSectorDefinition(id: string) {
  return SECTOR_CATALOG.find((sector) => sector.id === id);
}

export function createCustomSectorId(name: string): string {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return normalized ? `setor-${normalized}` : "setor-personalizado";
}
