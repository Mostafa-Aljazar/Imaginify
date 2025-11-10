import type { MetadataRoute } from "next";
import { ROUTES, TRANSFORMATIONS_LINKS } from "@/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: ROUTES.PAGES.HOME, lastModified: new Date() },
        { url: ROUTES.PAGES.START, lastModified: new Date() },
        { url: ROUTES.PAGES.PROFILE, lastModified: new Date() },
        { url: ROUTES.PAGES.CREDITS, lastModified: new Date() },
    ];

    // Transformation pages (from TRANSFORMATIONS_LINKS)
    const transformationPages: MetadataRoute.Sitemap = TRANSFORMATIONS_LINKS.map(
        (link) => ({
            url: link.href,
            lastModified: new Date(),
        })
    );

    // Combine all
    return [...staticPages, ...transformationPages];
}
