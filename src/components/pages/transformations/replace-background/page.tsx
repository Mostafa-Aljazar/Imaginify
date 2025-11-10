"use client";
import { TransformationForm } from "@/components/pages/transformations/common/transformation-form";
import Transformation_Header from "@/components/pages/transformations/common/transformation-header";
import { TransformationType } from "@/constants";
import { backgroundReplaceSchema } from "@/validations/transformations-schemas";
import React from "react";

export default function Replace_Background_Transformations_Page() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-4 h-full">
      <Transformation_Header type={TransformationType.BACKGROUND_REPLACE} />

      <TransformationForm
        transformationType={TransformationType.BACKGROUND_REPLACE}
        schema={backgroundReplaceSchema}
        fields={[
          { name: "title", label: "Image Title", type: "text" },
          {
            name: "new_background",
            label: "New Background Description",
            type: "text",
          },
        ]}
      />
    </div>
  );
}
