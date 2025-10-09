import { v2 as cloudinary, TransformationOptions } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        console.log("🚀 ~ POST ~ file:", file)
        const transformationRaw = formData.get("transformation") as string;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const transformation: TransformationOptions = JSON.parse(transformationRaw);
        console.log("🚀 ~ POST ~ transformation:", transformation)

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<{ public_id: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: process.env.CLOUDINARY_UPLOAD_PRESET || "nextjs_uploads" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as { public_id: string });
                }
            );
            uploadStream.end(buffer);
        });
        console.log("🚀 ~ POST ~ uploaded:", uploaded)

        const transformedUrl = cloudinary.url(uploaded.public_id, {
            transformation: transformation,
        });
        console.log("🚀 ~ POST ~ transformedUrl:", transformedUrl)

        return NextResponse.json({ url: transformedUrl });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

