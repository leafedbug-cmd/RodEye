import { describe, expect, it } from "vitest";
import { getDatasetSummary } from "./dataset";

describe("dataset summary", () => {
  it("counts families", () => {
    const summary = getDatasetSummary();
    expect(summary.totalScans).toBeGreaterThan(0);
    expect(Object.keys(summary.families)).toContain("HIWS1");
  });
});
