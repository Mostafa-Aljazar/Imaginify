"use client";
import { TransformationForm } from "@/components/pages/transformations/common/transformation-form";
import Transformation_Header from "@/components/pages/transformations/common/transformation-header";
import { TransformationType } from "@/constants";
import { backgroundRemoveSchema } from "@/validations/transformations-schemas";
import React from "react";

export default function Remove_Background_Transformations_Page() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-4 h-full">
      <Transformation_Header type={TransformationType.BACKGROUND_REMOVE} />

      <TransformationForm
        transformationType={TransformationType.BACKGROUND_REMOVE}
        schema={backgroundRemoveSchema}
        fields={[{ name: "title", label: "Image Title", type: "text" }]}
      />
    </div>
  );
}
