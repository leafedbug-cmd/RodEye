import baselineManifest from "../../assets/model/threadClassifier/manifest.json";
import labels from "../../assets/model/threadClassifier/labels.json";
import metrics from "../../assets/model/threadClassifier/metrics.json";

export interface ModelManifest {
  modelName: string;
  version: string;
  createdAt: string;
  framework: string;
  labels: string;
  preproc: string;
  checksum: {
    file: string;
    alg: string;
    value: string;
  };
  input: {
    shape: number[];
    dtype: string;
  };
  output: {
    shape: number[];
    dtype: string;
  };
  compat: {
    minMobileApp: string;
  };
}

export interface BundledModel {
  manifest: ModelManifest;
  labels: string[];
  metrics: Record<string, unknown>;
  file: string;
}

export function getBundledModel(): BundledModel {
  const typedManifest = baselineManifest as ModelManifest;
  return {
    manifest: typedManifest,
    labels,
    metrics,
    file: "assets://model/threadClassifier/model.tflite"
  };
}

export function isManifestCompatible(
  candidate: ModelManifest
): boolean {
  const bundled = getBundledModel().manifest;
  return (
    candidate.modelName === bundled.modelName &&
    candidate.framework === "tflite" &&
    candidate.input.dtype === bundled.input.dtype &&
    candidate.output.shape.length === bundled.output.shape.length
  );
}

export interface InferenceResult {
  label: string;
  confidence: number;
}

export function runMockInference(): InferenceResult[] {
  const bundled = getBundledModel();
  return bundled.labels.map((label, index) => ({
    label,
    confidence: Math.max(0.05, 0.9 - index * 0.1)
  }));
}

export async function validateExternalManifest(
  manifest: ModelManifest
): Promise<boolean> {
  return Promise.resolve(isManifestCompatible(manifest));
}
