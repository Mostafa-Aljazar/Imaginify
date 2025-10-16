import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
});

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const q = (searchParams.get("q") || "").trim();
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(24, parseInt(searchParams.get("limit") || "12"));

        if (q.length > 100)
            return NextResponse.json(
                { success: false, error: "Query too long" },
                { status: 400 }
            );

        let cloudResults: any[] = [];


        const expression = q
            ? `folder=imaginify AND tags=${q}`
            : "folder=imaginify";

        const result = await cloudinary.search
            .expression(expression)
            .sort_by("created_at", "desc")
            .max_results(100)
            .execute();

        cloudResults = result.resources || [];

        const urls = cloudResults.map((r) => r.secure_url);

        const dbResults = await prisma.transformation.findMany({
            where: q
                ? {
                    OR: [
                        { title: { contains: q, mode: "insensitive" } },
                        { url: { in: urls } },
                        { originalUrl: { in: urls } },
                    ],
                }
                : {},
            orderBy: { createdAt: "desc" },
        });

        const merged = [
            ...dbResults.map((d) => ({
                id: d.id,
                title: d.title,
                url: d.url,
                createdAt: d.createdAt,
            })),
            ...cloudResults
                .filter(
                    (r) =>
                        !dbResults.some(
                            (d) => d.url === r.secure_url || d.originalUrl === r.secure_url
                        )
                )
                .map((r) => ({
                    id: r.asset_id,
                    title: r.filename || r.public_id,
                    url: r.secure_url,
                    createdAt: r.created_at,
                })),
        ];

        const total = merged.length;
        const totalPages = Math.ceil(total / limit);
        const paginated = merged.slice((page - 1) * limit, page * limit);

        return NextResponse.json({
            success: true,
            data: paginated,
            total,
            page,
            limit,
            totalPages,
        });
    } catch (err) {
        console.error("Search API Error:", err);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


