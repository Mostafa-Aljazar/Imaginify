"use client";
import { TransformationForm } from "@/components/pages/transformations/transformation-form";
import Transformation_Header from "@/components/pages/transformations/transformation-header";
import { TransformationType } from "@/constants";
import { objectRecolorSchema } from "@/validations/transformations-schemas";
import React from "react";

export default function Recolor_Transformations_Page() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-4 h-full">
      <Transformation_Header type={TransformationType.OBJECT_RECOLOR} />

      <TransformationForm
        transformationType={TransformationType.OBJECT_RECOLOR}
        schema={objectRecolorSchema}
        fields={[
          { name: "title", label: "Image Title", type: "text" },
          {
            name: "object_to_recolor",
            label: "Object to Recolor",
            type: "text",
          },
          {
            name: "replacement_color",
            label: "Replacement Color",
            type: "text",
          },
        ]}
        onSubmit={(values) => console.log(values)}
      />
    </div>
  );
}
