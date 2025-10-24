import type { CalibrationResult } from "./calibration";
import type { LaserStripeExtraction } from "./laserStripe";

export interface PitchEstimate {
  pitchMm: number;
  pitchTpi: number;
  crestCount: number;
  uncertainty: number;
}

export interface DiameterEstimate {
  odMm: number;
  odPx: number;
}

export function estimatePitch(
  stripe: LaserStripeExtraction,
  calibration: CalibrationResult
): PitchEstimate {
  // Number of crest intervals is typically points.length - 1 when each point
  // represents a detected crest along the stripe. Fall back to at least 2.
  const crestCount = Math.max(2, Math.max(0, stripe.points.length - 1));
  const spanPx =
    stripe.points.length > 1
      ? stripe.points[stripe.points.length - 1].x - stripe.points[0].x
      : 0;

  const pitchPx = spanPx / crestCount;
  const pitchMm = pitchPx / calibration.pxPerMM;
  const pitchTpi = pitchMm === 0 ? 0 : 25.4 / pitchMm;

  return {
    pitchMm,
    pitchTpi,
    crestCount,
    uncertainty: 0.12
  };
}

export function estimateOuterDiameter(
  stripe: LaserStripeExtraction,
  calibration: CalibrationResult
): DiameterEstimate {
  const maxY =
    stripe.points.length === 0
      ? 0
      : Math.max(...stripe.points.map((point) => point.y));
  const odPx = maxY * 2;
  const odMm = odPx / calibration.pxPerMM;

  return { odMm, odPx };
}
