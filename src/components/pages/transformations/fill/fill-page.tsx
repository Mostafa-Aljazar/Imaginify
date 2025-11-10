"use client";
import { TransformationForm } from "@/components/pages/transformations/common/transformation-form";
import Transformation_Header from "@/components/pages/transformations/common/transformation-header";
import { TransformationType } from "@/constants";
import { generativeFillSchema } from "@/validations/transformations-schemas";

export default function Fill_Transformations_Page() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-4 h-full">
      <Transformation_Header type={TransformationType.GENERATIVE_FILL} />

      <TransformationForm
        transformationType={TransformationType.GENERATIVE_FILL}
        schema={generativeFillSchema}
        fields={[
          { name: "title", label: "Image Title", type: "text" },
          {
            name: "new_additions",
            label: "Additions",
            type: "text",
            placeholder: "e.g., A box of cookies",
          },
          {
            name: "aspect_ratio",
            label: "Aspect Ratio",
            type: "select",
            options: [
              { label: "Square (1:1)", value: "1:1" },
              { label: "Standard Portrait (3:4)", value: "3:4" },
              { label: "Phone Portrait (9:16)", value: "9:16" },
              { label: "Standard Landscape (4:3)", value: "4:3" },
              { label: "Widescreen (16:9)", value: "16:9" },
            ],
          },
        ]}
      />
    </div>
  );
}
