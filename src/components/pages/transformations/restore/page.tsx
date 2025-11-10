"use client";
import { TransformationForm } from "@/components/pages/transformations/common/transformation-form";
import Transformation_Header from "@/components/pages/transformations/common/transformation-header";
import { TransformationType } from "@/constants";
import { restoreSchema } from "@/validations/transformations-schemas";
import React from "react";

export default function Restore_Transformations_Page() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-4 h-full">
      <Transformation_Header type={TransformationType.RESTORE} />

      <TransformationForm
        transformationType={TransformationType.RESTORE}
        schema={restoreSchema}
        fields={[{ name: "title", label: "Image Title", type: "text" }]}
      />
    </div>
  );
}
