import { createHash } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const modelDir = join(process.cwd(), "models", "threadClassifier", "1.0.0");
const modelPath = join(modelDir, "model.tflite");
const checksumPath = join(modelDir, "checksum.sha256");
const manifestPath = join(modelDir, "manifest.json");

const buffer = readFileSync(modelPath);
const checksum = createHash("sha256").update(buffer).digest("hex");
writeFileSync(checksumPath, `${checksum}  model.tflite\n`);

const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
manifest.checksum.value = checksum;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Updated checksum ${checksum} for model`);
