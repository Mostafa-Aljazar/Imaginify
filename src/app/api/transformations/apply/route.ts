// app/api/transformations/route.ts
import { TransformationType } from "@/constants";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary, TransformationOptions } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
});

export async function POST(req: NextRequest) {
    try {
        const { userId: userIdLogin } = getAuth(req);

        if (!userIdLogin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const userClerkId = userIdLogin as string;
        const type = formData.get("type") as TransformationType | null;
        const title = formData.get("title") as string;
        const transformationRaw = formData.get("transformation") as string;
        const file = formData.get("file") as File;

        if (!file || !userClerkId || !type || !title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const transformation: TransformationOptions = JSON.parse(transformationRaw || "{}");
        const metadata = JSON.parse(JSON.stringify(transformation)) as any;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary with auto-tagging
        const uploaded = await new Promise<{ public_id: string; secure_url: string; tags: string[] }>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: process.env.CLOUDINARY_UPLOAD_PRESET || "nextjs_uploads",
                        // categorization: "google_tagging", // Enable AI-based tagging
                        // auto_tagging: 0.5, // Tag with confidence >= 0.5
                        // visual_search: true, // Enable for Visual Search (if plan supports)
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as { public_id: string; secure_url: string; tags: string[] });
                    }
                );
                uploadStream.end(buffer);
            }
        );

        // Generate transformed image URL
        const transformedUrl = cloudinary.url(uploaded.public_id, {
            transformation: transformation,
        });

        const user = await prisma.user.findUnique({ where: { clerkId: userClerkId } });
        if (!user) throw new Error("User not found");

        // Save record in MongoDB via Prisma with tags
        const newTransformation = await prisma.transformation.create({
            data: {
                userId: user.id,
                title,
                type: type as any,
                url: transformedUrl,
                originalUrl: uploaded.secure_url,
                metadata: { ...metadata, tags: uploaded.tags || [metadata?.effect] }, // Store tags
            },
        });

        // Increment user stats
        await prisma.user.update({
            where: { id: user.id },
            data: {
                imageManipulationsDone: { increment: 1 },
                creditsAvailable: { decrement: 1 },
            },
        });

        return NextResponse.json({
            success: true,
            url: transformedUrl,
            transformation: newTransformation,
        });
    } catch (error) {
        console.error("Error in /api/transform:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}