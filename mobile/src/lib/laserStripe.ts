export type LaserColor = "red" | "green";

export interface LaserStripePoint {
  x: number;
  y: number;
  intensity: number;
}

export interface LaserStripeExtraction {
  points: LaserStripePoint[];
  confidence: number;
  widthPx: number;
  heightPx: number;
}

export interface LaserStripeOptions {
  color: LaserColor;
  downsample?: number;
}

export async function extractLaserStripe(
  uri: string,
  options: LaserStripeOptions
): Promise<LaserStripeExtraction> {
  // Placeholder extraction pipeline that fakes a sinusoidal profile.
  const amplitude = options.color === "red" ? 6 : 4;
  const points: LaserStripePoint[] = Array.from({ length: 32 }, (_, index) => {
    const x = index * 10;
    const y = 200 + Math.sin(index / 4) * amplitude;
    return { x, y, intensity: 0.8 };
  });

  return {
    points,
    confidence: 0.76,
    widthPx: 320,
    heightPx: 240
  };
}

export function normaliseStripe(
  stripe: LaserStripeExtraction
): LaserStripePoint[] {
  if (stripe.points.length === 0) {
    return [];
  }

  const minY = Math.min(...stripe.points.map((p) => p.y));
  return stripe.points.map((point) => ({
    ...point,
    y: point.y - minY
  }));
}
