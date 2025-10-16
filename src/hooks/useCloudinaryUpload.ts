"use client"
import { useState } from "react";
import axios from "axios";
import { TransformationType } from "@/constants";
import { TransformationOptions } from "cloudinary";
import { createPromptBackgroundRemoval, createPromptBackgroundReplace, createPromptFill, createPromptRecolor, createPromptRemove, createPromptRestore } from "@/lib/create-prompt";
import { useUserStore } from "@/stores/store-user-data";

export default function useCloudinaryUpload() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [url, setUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { user, setUser, addTransformation } = useUserStore()

    const uploadImage = async function handleSubmit(file: File, type: TransformationType, values: any) {
        setLoading(true);
        setError(null);
        setProgress(0);

        try {

            let transformation: TransformationOptions;

            switch (type) {
                case TransformationType.RESTORE:
                    transformation = createPromptRestore();
                    break;

                case TransformationType.BACKGROUND_REMOVE:
                    transformation = createPromptBackgroundRemoval();
                    break;

                case TransformationType.BACKGROUND_REPLACE:
                    transformation = createPromptBackgroundReplace({
                        newBackground: values.new_background, // from form
                    });
                    break;

                case TransformationType.OBJECT_RECOLOR:
                    transformation = createPromptRecolor({
                        objects: [values.object_to_recolor],
                        toColor: values.replacement_color,
                        multiple: true,
                    });
                    break;

                case TransformationType.OBJECT_REMOVE:
                    transformation = createPromptRemove({
                        objects: [values.object_to_remove],
                        multiple: false,
                    });
                    break;

                case TransformationType.GENERATIVE_FILL:
                    transformation = createPromptFill({
                        newAdditions: values.new_additions || "",
                        options: {
                            aspect_ratio: values.aspect_ratio,
                            // width: 1500,
                            // height: 400,
                            // crop: "pad",
                        },
                    });
                    break;

                default:
                    throw new Error("Unknown transformation type");
            }

            console.log("🚀 ~ handleSubmit ~ transformation:", transformation)
            // console.log("🚀 ~ uploadImage ~ values.title:", values.title)
            // console.log("🚀 ~ handleSubmit ~ TransformationType[type]:", TransformationType[type])

            const formData = new FormData();
            formData.append("file", file);
            formData.append("transformation", JSON.stringify(transformation));
            formData.append("title", values.title);
            formData.append("type", TransformationType[type]);

            const res = await axios.post("/api/transformations/apply", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (event) => {
                    const percent = Math.round((event.loaded * 100) / (event.total || 1));
                    setProgress(percent);
                },
            });

            // If API returns an error in 2xx status, throw it manually
            if (res.data?.error) {
                throw new Error(res.data.error);
            }



            const responseText = await res.data;

            addTransformation(responseText.transformation)
            setUrl(responseText.url);

        } catch (err: any) {
            // Capture both Axios errors and manual errors from API
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError(err.message || "Unknown error");
            }

        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, progress, url, error };
}
