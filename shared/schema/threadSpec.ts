import { z } from "zod";

export const threadSpecSchema = z.object({
  id: z.string(),
  family: z.string(),
  brand: z.string(),
  pitch_mm: z.number().positive(),
  pitch_tpi: z.number().positive(),
  od_mm: z.number().positive(),
  notes: z.string().optional()
});

export type ThreadSpec = z.infer<typeof threadSpecSchema>;
