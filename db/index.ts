import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let activeD1Binding: D1Database | null = null;

export function setD1Binding(binding: D1Database): void {
  activeD1Binding = binding;
}

export function getDb() {
  if (!activeD1Binding) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` and inject it at the Worker request boundary before using the database."
    );
  }

  return drizzle(activeD1Binding, { schema });
}

export function getD1Binding() {
  if (!activeD1Binding) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` before using account persistence.",
    );
  }

  return activeD1Binding;
}
