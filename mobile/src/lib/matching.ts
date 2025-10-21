import toolingData from "../data/tooling.sample.json";
import type { ThreadSpec } from "@rodeye/shared/schema/threadSpec";

export interface MatchResult extends ThreadSpec {
  score: number;
  pitchDelta: number;
  odDelta: number;
}

export function findMatches(
  pitchMm: number,
  odMm: number,
  limit = 3
): MatchResult[] {
  const scored = toolingData.map((spec) => {
    const pitchDelta = Math.abs(spec.pitch_mm - pitchMm);
    const odDelta = Math.abs(spec.od_mm - odMm);
    const score = 1 / (1 + pitchDelta * 2 + odDelta * 0.5);

    return {
      ...spec,
      score,
      pitchDelta,
      odDelta
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function findBestMatch(
  pitchMm: number,
  odMm: number
): MatchResult | null {
  const [top] = findMatches(pitchMm, odMm, 1);
  return top ?? null;
}
