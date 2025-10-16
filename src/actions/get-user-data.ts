"use server";

import { prisma } from "@/lib/prisma";

export async function getUserData({ userClerkId }: { userClerkId: string }) {

    const user = await prisma.user.findUnique({
        where: { clerkId: userClerkId },
        include: { transformations: true },
    });

    if (!user) return null;
    return user;
}
