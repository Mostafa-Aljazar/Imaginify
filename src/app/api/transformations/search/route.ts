import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId: userIdLogin } = getAuth(req);

        if (!userIdLogin)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { clerkId: userIdLogin },
        });

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        const { searchParams } = new URL(req.url);
        const q = (searchParams.get("q") || "").trim();
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(24, parseInt(searchParams.get("limit") || "12"));

        // Build where condition without importing Prisma namespace
        const whereCondition: any = {
            userId: user.id,
        };

        // Add search conditions if query exists
        if (q) {
            whereCondition.OR = [
                { title: { contains: q, mode: "insensitive" } },
                { prompt: { contains: q, mode: "insensitive" } },
                { url: { contains: q, mode: "insensitive" } },
            ];
        }

        const [dbResults, total] = await Promise.all([
            prisma.transformation.findMany({
                where: whereCondition,
                select: {
                    id: true,
                    title: true,
                    url: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.transformation.count({ where: whereCondition }),
        ]);

        const totalPages = Math.ceil(total / limit);


        return NextResponse.json({
            success: true,
            data: dbResults,
            total,
            page,
            limit,
            totalPages,
        });
    } catch (err: any) {
        console.error("Search API Error:", err);
        const message =
            err.name === "PrismaClientKnownRequestError"
                ? "Database query failed"
                : "Internal Server Error";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}