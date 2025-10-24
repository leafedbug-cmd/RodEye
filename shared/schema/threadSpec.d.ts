import { z } from "zod";
export declare const threadSpecSchema: z.ZodObject<{
    id: z.ZodString;
    family: z.ZodString;
    brand: z.ZodString;
    pitch_mm: z.ZodNumber;
    pitch_tpi: z.ZodNumber;
    od_mm: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    brand: string;
    family: string;
    pitch_mm: number;
    od_mm: number;
    id: string;
    pitch_tpi: number;
    notes?: string | undefined;
}, {
    brand: string;
    family: string;
    pitch_mm: number;
    od_mm: number;
    id: string;
    pitch_tpi: number;
    notes?: string | undefined;
}>;
export type ThreadSpec = z.infer<typeof threadSpecSchema>;
