import {
    Home,
    History,
    Sparkles,
    Eraser,
    Palette,
    Image as ImageIcon,
    User as UserIcon,
    CreditCard,
    Images as ImagesIcon,
} from "lucide-react";

export const ROUTES = {
    AUTH_ROUTES: {
        SIGN_IN: "/sign-in",
        SIGN_UP: "/sign-up",
    },
    PAGES: {
        HOME: "/",
        CREDITS: "/credits",
        PROFILE: "/profile",
        START: "/start",
        TRANSFORMATIONS: "/transformations",
        TRANSFORMATIONS_FILL: "/transformations/fill",
        TRANSFORMATIONS_RECOLOR: "/transformations/recolor",
        TRANSFORMATIONS_REMOVE: "/transformations/remove",
        TRANSFORMATIONS_REMOVE_BACKGROUND: "/transformations/remove-background",
        TRANSFORMATIONS_REPLACE_BACKGROUND: "/transformations/replace-background",
        TRANSFORMATIONS_RESTORE: "/transformations/restore",
    }
} as const;

export const NAVBAR_LINKS = [
    { name: "Start", href: ROUTES.PAGES.START, icon: Home },
    {
        name: "Image Restore",
        href: ROUTES.PAGES.TRANSFORMATIONS_RESTORE,
        icon: History,
    },
    {
        name: "Generative Fill",
        href: ROUTES.PAGES.TRANSFORMATIONS_FILL,
        icon: Sparkles,
    },
    {
        name: "Object Remove",
        href: ROUTES.PAGES.TRANSFORMATIONS_REMOVE,
        icon: Eraser,
    },
    {
        name: "Object Recolor",
        href: ROUTES.PAGES.TRANSFORMATIONS_RECOLOR,
        icon: Palette,
    },
    {
        name: "Background Remove",
        href: ROUTES.PAGES.TRANSFORMATIONS_REMOVE_BACKGROUND,
        icon: ImageIcon,
    },
    {
        name: "Background Replace",
        href: ROUTES.PAGES.TRANSFORMATIONS_REPLACE_BACKGROUND,
        icon: ImagesIcon,
    },

    { name: "Profile", href: ROUTES.PAGES.PROFILE, icon: UserIcon },
    { name: "Buy Credits", href: ROUTES.PAGES.CREDITS, icon: CreditCard },
] as const;

export enum PROMPT_TYPE {
    BACKGROUND_REMOVAL = "background_removal",
    BACKGROUND_REPLACE = "gen_background_replace",
    RECOLOR = "gen_recolor",
    RESTORE = "gen_restore",
    REMOVE = "gen_remove",
    FILL = "gen_fill",
}

export enum TransformationType {
    RESTORE = "restore",
    FILL = "fill",
    REMOVE = "remove",
    RECOLOR = "recolor",
    BACKGROUND_REMOVE = "background_remove",
    BACKGROUND_REPLACE = "background_replace",
}

export const TRANSFORMATIONS_HEADER = {
    [TransformationType.RESTORE]: {
        title: "Restore Image",
        description: "Refine images by removing noise and imperfections",
    },
    [TransformationType.FILL]: {
        title: "Generative Fill",
        description: "Enhance an image's dimensions using AI outpainting",
    },
    [TransformationType.REMOVE]: {
        title: "Object Removal",
        description:
            "Identify and eliminate unwanted objects from your images seamlessly",
    },
    [TransformationType.RECOLOR]: {
        title: "Recolor Image",
        description: "Identify and recolor objects from the image",
    },
    [TransformationType.BACKGROUND_REMOVE]: {
        title: "Background Removal",
        description: "Remove the background from your images effortlessly using AI",
    },
    [TransformationType.BACKGROUND_REPLACE]: {
        title: "Background Replace",
        description: "Replace the background of your images with AI-generated scenes",
    },
} as const;


// ASPECT_RATIO_OPTIONS
export const ASPECT_RATIO_OPTIONS = [
    { label: "Square (1:1)", value: "1:1" },
    { label: "Standard Portrait (3:4)", value: "3:4" },
    { label: "Phone Portrait (9:16)", value: "9:16" },
    { label: "Standard Landscape (4:3)", value: "4:3" },
    { label: "Widescreen (16:9)", value: "16:9" },
];

export type ASPECT_RATIO = typeof ASPECT_RATIO_OPTIONS[number]["value"];
