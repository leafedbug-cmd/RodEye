import { z } from "zod";
export const captureLaserSchema = z.object({
    wavelength_nm: z.number().min(300).max(1200),
    mode: z.enum(["line", "dot"])
});
export const captureSchema = z.object({
    laser: captureLaserSchema.optional()
});
export const calibrationSchema = z.object({
    pxPerMM: z.number().positive(),
    focalPx: z.number().positive()
});
export const deviceSchema = z.object({
    model: z.string(),
    os: z.string()
});
export const labelSchema = z.object({
    brand: z.string(),
    family: z.string(),
    pitch_mm: z.number().positive(),
    od_mm: z.number().positive()
});
export const scanRecordSchema = z.object({
    scanId: z.string(),
    file: z.string(),
    device: deviceSchema,
    timestamp: z.string(),
    label: labelSchema,
    calibration: calibrationSchema.optional(),
    capture: captureSchema.optional()
});
