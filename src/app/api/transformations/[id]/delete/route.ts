import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { userId: userIdLogin } = getAuth(req);
        if (!userIdLogin)
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id: transId } = await context.params;

        const transformation = await prisma.transformation.findUnique({
            where: { id: transId },
            include: { user: true },
        });

        if (!transformation)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        if (transformation.user.clerkId !== userIdLogin)
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        await prisma.transformation.delete({ where: { id: transId } });

        await prisma.user.update({
            where: { id: transformation.userId },
            data: {
                imageManipulationsDone: { decrement: 1 },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting transformation:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
