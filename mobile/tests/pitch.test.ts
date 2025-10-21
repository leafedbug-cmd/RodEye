import { estimatePitch } from "../src/lib/pitch";
import { findBestMatch } from "../src/lib/matching";

const calibration = {
  pxPerMM: 8,
  focalPx: 1200,
  timestamp: "2024-01-01T00:00:00Z"
};

const stripe = {
  points: [
    { x: 0, y: 100, intensity: 0.8 },
    { x: 16, y: 102, intensity: 0.82 },
    { x: 32, y: 101, intensity: 0.81 },
    { x: 48, y: 103, intensity: 0.83 },
    { x: 64, y: 102, intensity: 0.82 }
  ],
  confidence: 0.8,
  widthPx: 320,
  heightPx: 240
};

describe("pitch estimation", () => {
  it("computes pitch from stripe span", () => {
    const result = estimatePitch(stripe, calibration);
    expect(result.pitchMm).toBeCloseTo(2.0, 1);
    expect(result.pitchTpi).toBeGreaterThan(10);
  });
});

describe("matching", () => {
  it("finds the closest thread spec", () => {
    const best = findBestMatch(3.2, 49);
    expect(best?.family).toBe("HIWS1");
  });
});
