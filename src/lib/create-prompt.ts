import { PROMPT_TYPE, ASPECT_RATIO } from "@/constants";
import { CropMode, TransformationOptions } from "cloudinary";




// BACKGROUND REMOVAL
export const createPromptBackgroundRemoval = (): TransformationOptions => ({
    effect: "background_removal:fineedges_y"
});
// ex:
// createPromptBackgroundRemoval();


// BACKGROUND REPLACE
export const createPromptBackgroundReplace = ({
    newBackground = ""
}: {
    newBackground: string;
}): TransformationOptions => ({
    effect: `${PROMPT_TYPE.BACKGROUND_REPLACE}${newBackground.trim() ? `:prompt_${newBackground}` : ""};seed_${Math.floor(Math.random() * 100)}`,
});
// ex:

// createPromptBackgroundReplace({ newBackground: "a deserted street" });
// createPromptBackgroundReplace({ newBackground: "an old castle" });

export const createPromptRecolor = ({
    objects,
    toColor,
    multiple = false
}: {
    objects: string[],
    toColor: string,
    multiple?: boolean,
}
): TransformationOptions => {
    if (!toColor) {
        throw new Error("RECOLOR requires `toColor` in options");
    }

    let objectText = objects.length > 1 ? `(${objects.join(";")})` : objects[0];
    const prompt = `${PROMPT_TYPE.RECOLOR}:prompt_${objectText};to-color_${toColor}${multiple ? ";multiple_true" : ""}`

    return {
        effect: prompt,
    };
};
// ex:
// createPromptRecolor({
//     objects: ["(shirt;hair)"],
//     toColor: "EA672A",
//     multiple: true,
// });

// RESTORE
export const createPromptRestore = (): TransformationOptions => ({
    effect: `${PROMPT_TYPE.RESTORE}`,
});
// ex:
// createPromptRestore();



// REMOVE
export const createPromptRemove = ({
    objects,
    multiple = false
}: {
    objects: string[],
    multiple?: boolean,
}
): TransformationOptions => {
    let objectText = objects.length > 1 ? `(${objects.join(";")})` : objects[0]
    return {
        effect: `${PROMPT_TYPE.REMOVE}:prompt_${objectText}${multiple ? ";multiple_true" : ""}`,
    };
};
// ex:
// createPromptRemove({
//     objects: ["(chair;background)"],
//     multiple: true,
// });


// FILL
export const createPromptFill = ({
    newAdditions, options = {
        width: 800,
        height: 400,
        crop: "pad",
        aspect_ratio: "9:16" as ASPECT_RATIO,
    }
}: {
    newAdditions: string,
    options: {
        width?: number;
        height?: number;
        aspect_ratio?: ASPECT_RATIO;
        crop?: CropMode;
    }
}): TransformationOptions => {
    const textAdd = !newAdditions.trim() ? "" : `prompt_${newAdditions}`;

    return {
        background: `gen_fill:${textAdd};seed_${Math.floor(Math.random() * 100)}`,
        aspect_ratio: options.aspect_ratio || "9:16", width: options.width || 800, crop: "pad"
    };
};
//  { aspect_ratio: "16:9", background: "gen_fill:prompt_box of cookies;seed_10", width: 1250, crop: "pad" }
// ex:
// createPromptFill({
//     newAdditions: "box of cookies",
//     options: { width: 1500, height: 400, crop: "pad" }
// });
// createPromptFill({
//     newAdditions: "",
//     options: { aspect_ratio: "16:9", width: 1250, crop: "pad" }
// });



// const Transformations: TransformationOptions = [
//     // { effect: "background_removal:fineedges_y" },

//     // { effect: "gen_background_replace" },
//     // { effect: "gen_background_replace:prompt_a deserted street;seed_1" },
//     // { effect: "gen_background_replace:prompt_an old castle" },
//     // { effect: "gen_background_replace:prompt_a hub with a laptop;seed_1" },


//     // { effect: "gen_recolor:prompt_(shirt;hair);to-color_EA672A" }
//     // { effect: "gen_recolor:prompt_shirt;to-color_green;multiple_true" }

//     // { effect: "gen_restore" },
//     // { effect: "gen_restore" },

//     // { effect: "gen_remove:prompt_(chair;background;)" },
//     // { effect: "gen_remove:prompt_the chair;multiple_true" }
//     // { effect: "gen_remove:prompt_the chair" },

//     // { background: "gen_fill:prompt_box of cookies;seed_1", height: 400, width: 1500, crop: "pad" }
//     // { aspect_ratio: "16:9", background: "gen_fill", width: 1250, crop: "pad" }

// ];
