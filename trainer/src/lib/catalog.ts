import { toolingMaster } from "@rodeye/shared";

export function listThreadFamilies() {
  const families = new Map<string, number>();
  toolingMaster.forEach((spec) => {
    const next = (families.get(spec.family) ?? 0) + 1;
    families.set(spec.family, next);
  });
  return Array.from(families.entries()).map(([family, count]) => ({
    family,
    count
  }));
}
