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
  const crestCount = Math.max(2, Math.round(stripe.points.length / 4));
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
