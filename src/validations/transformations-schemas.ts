import { z } from "zod";

export const restoreSchema = z.object({
    title: z.string().min(1, "Image Title is required"),
});

export const generativeFillSchema = z.object({
    title: z.string().min(1, "Image Title is required"),
    new_additions: z.string().optional(),
    aspect_ratio: z.string().min(1, "Aspect ratio is required"),
});

export const objectRemoveSchema = z.object({
    title: z.string().min(1, "Image Title is required"),
    object_to_remove: z.string().min(1, "Object to remove is required"),
});

export const objectRecolorSchema = z.object({
    title: z.string().min(1, "Image Title is required"),
    object_to_recolor: z.string().min(1, "Object to recolor is required"),
    replacement_color: z.string().min(1, "Replacement color is required"),
});

export const backgroundRemoveSchema = z.object({
    title: z.string().min(1, "Image Title is required"),
});

export const backgroundReplaceSchema = z.object({
    title: z.string().min(1, "Image Title is required"),
    new_background: z.string().min(1, "New background is required"),
});