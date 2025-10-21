#!/usr/bin/env node
/**
 * Placeholder CLI to demonstrate dataset import pipeline wiring.
 * In a real implementation this would mount removable storage or cloud buckets
 * and normalise incoming scan exports into the dataset/ tree.
 */
import { existsSync, mkdirSync, copyFileSync } from "fs";
import { resolve, join } from "path";

const args = process.argv.slice(2);
const source = args[0] ? resolve(process.cwd(), args[0]) : null;
const datasetRoot = resolve(process.cwd(), "dataset");

if (!source) {
  console.error("Usage: yarn dataset:import <path-to-scan-export>");
  process.exit(1);
}

if (!existsSync(source)) {
  console.error(`Source path not found: ${source}`);
  process.exit(1);
}

const targetDir = join(
  datasetRoot,
  "imports",
  new Date().toISOString().replace(/[:.]/g, "-")
);

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, join(targetDir, "import.zip"));

console.log(`Imported ${source} to ${targetDir}`);
