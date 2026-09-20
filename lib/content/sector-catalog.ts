export type SectorDefinition = {
  id: string;
  name: string;
};

// Áreas de trabalho publicadas no portal de carreiras da Leroy Merlin Brasil.
// A lista não é um diretório de funcionários nem identifica uma loja/unidade.
export const SECTOR_CATALOG: readonly SectorDefinition[] = [
  { id: "centro-distribuicao", name: "Centro de Distribuição" },
  { id: "loja-atendimento", name: "Loja - Atendimento" },
  { id: "loja-comercio", name: "Loja - Comércio" },
  { id: "loja-gestao", name: "Loja - Gestão" },
  { id: "loja-logistica", name: "Loja - Logística" },
  { id: "loja-novos-negocios", name: "Loja - Novos Negócios" },
  { id: "loja-servicos", name: "Loja - Serviços" },
  { id: "matriz-cadeia-suprimentos", name: "Matriz - Cadeia de Suprimentos" },
  { id: "matriz-expansao", name: "Matriz - Expansão" },
  { id: "matriz-experiencia-atendimento-clientes", name: "Matriz - Experiência e Atendimento Clientes" },
  { id: "matriz-marketing", name: "Matriz - Marketing" },
  { id: "matriz-novos-negocios", name: "Matriz - Novos Negócios" },
  { id: "matriz-oferta-produto", name: "Matriz - Oferta Produto" },
  { id: "matriz-performance-economico-financeira", name: "Matriz - Performance Econômico-Financeira" },
  { id: "matriz-recursos-humanos", name: "Matriz - Recursos Humanos" },
  { id: "matriz-tecnologia", name: "Matriz - Tecnologia" },
  { id: "plataforma", name: "Plataforma" },
  { id: "televendas", name: "Televendas" },
] as const;

export const LEGACY_SECTOR_MAPPINGS: readonly { from: string; to: string }[] = [
  { from: "casa-decoracao", to: "loja-comercio" },
  { from: "ferramentas", to: "loja-comercio" },
  { from: "tintas", to: "loja-comercio" },
  { from: "jardim", to: "loja-comercio" },
  { from: "madeiras", to: "loja-comercio" },
  { from: "logistica", to: "loja-logistica" },
  { from: "atendimento", to: "loja-atendimento" },
  { from: "administracao", to: "loja-gestao" },
  { from: "tecnologia", to: "matriz-tecnologia" },
] as const;

export const CUSTOM_SECTOR_ID = "outro-setor" as const;

export function findSectorDefinition(id: string) {
  return SECTOR_CATALOG.find((sector) => sector.id === currentWorkAreaId(id));
}

export function currentWorkAreaId(id: string): string {
  return LEGACY_SECTOR_MAPPINGS.find((mapping) => mapping.from === id)?.to ?? id;
}

export function legacySectorIdsFor(workAreaId: string): string[] {
  return LEGACY_SECTOR_MAPPINGS.filter((mapping) => mapping.to === workAreaId).map((mapping) => mapping.from);
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
