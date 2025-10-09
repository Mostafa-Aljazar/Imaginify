import { useState } from "react";
import axios from "axios";
import { TransformationType } from "@/constants";
import { TransformationOptions } from "cloudinary";
import { createPromptBackgroundRemoval, createPromptBackgroundReplace, createPromptFill, createPromptRecolor, createPromptRemove, createPromptRestore } from "@/lib/create-prompt";





export default function useCloudinaryUpload() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [url, setUrl] = useState<string | null>(null);
    console.log("🚀 ~ useCloudinaryUpload ~ url:", url)
    const [error, setError] = useState<string | null>(null);


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

                case TransformationType.RECOLOR:
                    transformation = createPromptRecolor({
                        objects: [values.object_to_recolor],
                        toColor: values.replacement_color,
                        multiple: true,
                    });
                    break;

                case TransformationType.REMOVE:
                    transformation = createPromptRemove({
                        objects: [values.object_to_remove],
                        multiple: false,
                    });
                    break;

                case TransformationType.FILL:
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

            const formData = new FormData();
            formData.append("file", file);
            formData.append("transformation", JSON.stringify(transformation));

            const res = await axios.post("/api/apply-transformation", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (event) => {
                    const percent = Math.round((event.loaded * 100) / (event.total || 1));
                    setProgress(percent);
                },
            });

            const responseText = await res.data;
            console.log("🚀 ~ handleSubmit ~ responseText:", responseText)
            setUrl(responseText.url);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, progress, url, error };
}
