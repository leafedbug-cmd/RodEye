import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import type { ScanRecord } from "@rodeye/shared/schema/scanRecord";

const dbPromise = SQLite.openDatabaseAsync("rodeye.db");

async function ensureSchema() {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scanId TEXT NOT NULL,
      fileUri TEXT NOT NULL,
      family TEXT,
      brand TEXT,
      pitchMm REAL,
      pitchTpi REAL,
      odMm REAL,
      createdAt TEXT NOT NULL
    );
  `);
}

export interface StoredScan
  extends Pick<
    ScanRecord,
    "scanId" | "file" | "label" | "calibration" | "timestamp"
  > {
  pitchTpi: number;
  odMm: number;
}

export async function saveScan(record: StoredScan) {
  await ensureSchema();
  const db = await dbPromise;
  await db.runAsync(
    `
    INSERT INTO scans (
      scanId, fileUri, family, brand, pitchMm, pitchTpi, odMm, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
    record.scanId,
    record.file,
    record.label.family,
    record.label.brand,
    record.label.pitch_mm,
    record.pitchTpi,
    record.odMm,
    record.timestamp
  );
}

export interface ScanListItem {
  scanId: string;
  fileUri: string;
  family: string | null;
  brand: string | null;
  pitchMm: number | null;
  pitchTpi: number | null;
  odMm: number | null;
  createdAt: string;
}

export async function getRecentScans(
  limit = 20
): Promise<ScanListItem[]> {
  await ensureSchema();
  const db = await dbPromise;
  const result = await db.getAllAsync<ScanListItem>(
    "SELECT scanId, fileUri, family, brand, pitchMm, pitchTpi, odMm, createdAt FROM scans ORDER BY createdAt DESC LIMIT ?",
    limit
  );
  return result;
}

export async function exportScanBundle(
  scanId: string,
  targetDir: string
) {
  await ensureSchema();
  const db = await dbPromise;
  const record = await db.getFirstAsync<ScanListItem>(
    "SELECT scanId, fileUri, family, brand, pitchMm, pitchTpi, odMm, createdAt FROM scans WHERE scanId = ?",
    scanId
  );

  if (!record) {
    throw new Error(`Scan ${scanId} not found`);
  }

  await FileSystem.makeDirectoryAsync(targetDir, {
    intermediates: true
  });

  const meta = {
    scanId: record.scanId,
    label: {
      family: record.family,
      brand: record.brand,
      pitch_mm: record.pitchMm,
      pitch_tpi: record.pitchTpi,
      od_mm: record.odMm
    },
    createdAt: record.createdAt
  };

  await FileSystem.copyAsync({
    from: record.fileUri,
    to: `${targetDir}/frame.jpg`
  });
  await FileSystem.writeAsStringAsync(
    `${targetDir}/frame.meta.json`,
    JSON.stringify(meta, null, 2)
  );
}
