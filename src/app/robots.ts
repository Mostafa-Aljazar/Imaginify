import type { MetadataRoute } from "next";
import { ROUTES, TRANSFORMATIONS_LINKS } from "@/constants";

// List of private/admin routes
const PRIVATE_ROUTES: string[] = [
    ROUTES.AUTH_ROUTES.SIGN_IN,
    ROUTES.AUTH_ROUTES.SIGN_UP,
    // Add any other admin-only pages here
];

export default async function robots(): Promise<MetadataRoute.Robots> {
    // Static public routes
    const staticPublicRoutes = [
        ROUTES.PAGES.HOME,
        ROUTES.PAGES.START,
        ROUTES.PAGES.PROFILE,
        ROUTES.PAGES.CREDITS,
    ];

    // Transformation pages
    const transformationRoutes = TRANSFORMATIONS_LINKS.map((link) => link.href);

    // Combine all public routes
    const publicRoutes = [...staticPublicRoutes, ...transformationRoutes];

    return {
        rules: [
            {
                userAgent: "*",
                allow: publicRoutes,
                disallow: PRIVATE_ROUTES,
            },
        ],
        sitemap: `${process.env.APP_URL || "https://imaginify-k9g5.onrender.com"}/sitemap.xml`,
    };
}
