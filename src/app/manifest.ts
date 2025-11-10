import { FAVICON, IMG_START_PAGE, LOGO } from "@/assets/common";
import { ROUTES } from "@/constants";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Imaginify – AI Image Platform",
        short_name: "Imaginify",
        description:
            "AI-powered platform for generating, editing, and enhancing images with cutting-edge tools and transformations.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#6f4eff",
        orientation: "any",
        dir: "ltr",
        lang: "en",
        categories: ["productivity", "photography", "artificial_intelligence", "design"],
        id: "/imaginify",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "48x48 72x72 96x96 128x128 256x256",
                type: "image/x-icon",
            },
            {
                src: LOGO.src,
                sizes: "512x512",
                type: "image/png",
            },
        ],
        screenshots: [
            {
                src: IMG_START_PAGE.src,
                sizes: "1280x720",
                type: "image/png",
            },
            {
                src: FAVICON.src,
                sizes: "1280x720",
                type: "image/png",
            },
            {
                src: FAVICON.src,
                sizes: "1280x720",
                type: "image/png",
            },
        ],
        shortcuts: [
            {
                name: "Home Page",
                short_name: "Home",
                description: "Explore Imaginify and start creating AI-powered image transformations.",
                url: ROUTES.PAGES.START,
                icons: [{ src: IMG_START_PAGE.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "All Transformations",
                short_name: "Transform",
                description: "Access all AI image transformation tools including fill, recolor, remove, restore, and background edits.",
                url: ROUTES.PAGES.TRANSFORMATIONS,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Generative Fill",
                short_name: "Fill",
                description: "Enhance your images using AI-powered generative fill.",
                url: ROUTES.PAGES.TRANSFORMATIONS_FILL,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Object Recolor",
                short_name: "Recolor",
                description: "Recolor objects in your images using AI.",
                url: ROUTES.PAGES.TRANSFORMATIONS_RECOLOR,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Object Remove",
                short_name: "Remove",
                description: "Remove unwanted objects from your images seamlessly.",
                url: ROUTES.PAGES.TRANSFORMATIONS_REMOVE,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Background Remove",
                short_name: "Bg Remove",
                description: "Remove the background from images using AI.",
                url: ROUTES.PAGES.TRANSFORMATIONS_REMOVE_BACKGROUND,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Background Replace",
                short_name: "Bg Replace",
                description: "Replace the background in your images with AI-generated scenes.",
                url: ROUTES.PAGES.TRANSFORMATIONS_REPLACE_BACKGROUND,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Image Restore",
                short_name: "Restore",
                description: "Restore images by removing noise and imperfections.",
                url: ROUTES.PAGES.TRANSFORMATIONS_RESTORE,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
            {
                name: "Profile",
                short_name: "Profile",
                description: "Manage your account, view your recent edits, and track usage.",
                url: ROUTES.PAGES.PROFILE,
                icons: [{ src: FAVICON.src, sizes: "128x128", type: "image/png" }],
            },
        ]

    };
}
