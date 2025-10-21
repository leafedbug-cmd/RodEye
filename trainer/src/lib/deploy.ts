import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";

const version = "1.0.0";
const root = process.cwd();
const sourceDir = join(root, "models", "threadClassifier", version);
const targetDir = join(root, "..", "mobile", "assets", "model", "threadClassifier");

mkdirSync(targetDir, { recursive: true });
const files = [
  "model.tflite",
  "labels.json",
  "preproc.json",
  "metrics.json",
  "manifest.json",
  "checksum.sha256",
  "README.md"
];

for (const file of files) {
  copyFileSync(join(sourceDir, file), join(targetDir, file));
}

console.log(`Deployed model ${version} to mobile assets directory.`);
