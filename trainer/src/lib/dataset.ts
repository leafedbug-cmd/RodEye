export interface DatasetEntry {
  id: string;
  family: string;
  brand: string;
  pitch_mm: number;
  od_mm: number;
  file: string;
}

export interface DatasetSummary {
  totalScans: number;
  families: Record<string, number>;
  lastImported: string;
}

const demoEntries: DatasetEntry[] = [
  {
    id: "scan-001",
    family: "HIWS1",
    brand: "Ditch Witch",
    pitch_mm: 3.175,
    od_mm: 49.3,
    file: "scans/hiws1/frame001.jpg"
  },
  {
    id: "scan-002",
    family: "API IF",
    brand: "API",
    pitch_mm: 3.628,
    od_mm: 65,
    file: "scans/api-if/frame004.jpg"
  }
];

export function getDatasetSummary(): DatasetSummary {
  return {
    totalScans: demoEntries.length,
    families: demoEntries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.family] = (acc[entry.family] ?? 0) + 1;
      return acc;
    }, {}),
    lastImported: "2024-04-12T11:04:00Z"
  };
}

export function listDatasetEntries(): DatasetEntry[] {
  return demoEntries;
}
