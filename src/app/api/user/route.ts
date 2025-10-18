import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userClerkId = req.nextUrl.searchParams.get("clerkId");
    if (!userClerkId) return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });

    const user = await prisma.user.findFirst({
        where: { clerkId: userClerkId },
        include: { transformations: true },
    });
    // console.log("🚀 ~ GET ~ user:", user)
    return NextResponse.json(user);
}
