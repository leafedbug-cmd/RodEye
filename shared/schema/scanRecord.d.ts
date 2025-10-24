import { z } from "zod";
export declare const captureLaserSchema: z.ZodObject<{
    wavelength_nm: z.ZodNumber;
    mode: z.ZodEnum<["line", "dot"]>;
}, "strip", z.ZodTypeAny, {
    wavelength_nm: number;
    mode: "line" | "dot";
}, {
    wavelength_nm: number;
    mode: "line" | "dot";
}>;
export declare const captureSchema: z.ZodObject<{
    laser: z.ZodOptional<z.ZodObject<{
        wavelength_nm: z.ZodNumber;
        mode: z.ZodEnum<["line", "dot"]>;
    }, "strip", z.ZodTypeAny, {
        wavelength_nm: number;
        mode: "line" | "dot";
    }, {
        wavelength_nm: number;
        mode: "line" | "dot";
    }>>;
}, "strip", z.ZodTypeAny, {
    laser?: {
        wavelength_nm: number;
        mode: "line" | "dot";
    } | undefined;
}, {
    laser?: {
        wavelength_nm: number;
        mode: "line" | "dot";
    } | undefined;
}>;
export declare const calibrationSchema: z.ZodObject<{
    pxPerMM: z.ZodNumber;
    focalPx: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pxPerMM: number;
    focalPx: number;
}, {
    pxPerMM: number;
    focalPx: number;
}>;
export declare const deviceSchema: z.ZodObject<{
    model: z.ZodString;
    os: z.ZodString;
}, "strip", z.ZodTypeAny, {
    model: string;
    os: string;
}, {
    model: string;
    os: string;
}>;
export declare const labelSchema: z.ZodObject<{
    brand: z.ZodString;
    family: z.ZodString;
    pitch_mm: z.ZodNumber;
    od_mm: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    brand: string;
    family: string;
    pitch_mm: number;
    od_mm: number;
}, {
    brand: string;
    family: string;
    pitch_mm: number;
    od_mm: number;
}>;
export declare const scanRecordSchema: z.ZodObject<{
    scanId: z.ZodString;
    file: z.ZodString;
    device: z.ZodObject<{
        model: z.ZodString;
        os: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model: string;
        os: string;
    }, {
        model: string;
        os: string;
    }>;
    timestamp: z.ZodString;
    label: z.ZodObject<{
        brand: z.ZodString;
        family: z.ZodString;
        pitch_mm: z.ZodNumber;
        od_mm: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        brand: string;
        family: string;
        pitch_mm: number;
        od_mm: number;
    }, {
        brand: string;
        family: string;
        pitch_mm: number;
        od_mm: number;
    }>;
    calibration: z.ZodOptional<z.ZodObject<{
        pxPerMM: z.ZodNumber;
        focalPx: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        pxPerMM: number;
        focalPx: number;
    }, {
        pxPerMM: number;
        focalPx: number;
    }>>;
    capture: z.ZodOptional<z.ZodObject<{
        laser: z.ZodOptional<z.ZodObject<{
            wavelength_nm: z.ZodNumber;
            mode: z.ZodEnum<["line", "dot"]>;
        }, "strip", z.ZodTypeAny, {
            wavelength_nm: number;
            mode: "line" | "dot";
        }, {
            wavelength_nm: number;
            mode: "line" | "dot";
        }>>;
    }, "strip", z.ZodTypeAny, {
        laser?: {
            wavelength_nm: number;
            mode: "line" | "dot";
        } | undefined;
    }, {
        laser?: {
            wavelength_nm: number;
            mode: "line" | "dot";
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    scanId: string;
    file: string;
    device: {
        model: string;
        os: string;
    };
    timestamp: string;
    label: {
        brand: string;
        family: string;
        pitch_mm: number;
        od_mm: number;
    };
    calibration?: {
        pxPerMM: number;
        focalPx: number;
    } | undefined;
    capture?: {
        laser?: {
            wavelength_nm: number;
            mode: "line" | "dot";
        } | undefined;
    } | undefined;
}, {
    scanId: string;
    file: string;
    device: {
        model: string;
        os: string;
    };
    timestamp: string;
    label: {
        brand: string;
        family: string;
        pitch_mm: number;
        od_mm: number;
    };
    calibration?: {
        pxPerMM: number;
        focalPx: number;
    } | undefined;
    capture?: {
        laser?: {
            wavelength_nm: number;
            mode: "line" | "dot";
        } | undefined;
    } | undefined;
}>;
export type ScanRecord = z.infer<typeof scanRecordSchema>;
