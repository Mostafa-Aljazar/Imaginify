"use client";
import { TransformationForm } from "@/components/pages/transformations/transformation-form";
import Transformation_Header from "@/components/pages/transformations/transformation-header";
import { TransformationType } from "@/constants";
import { objectRemoveSchema } from "@/validations/transformations-schemas";

export default function Remove_Transformations_Page() {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-4 h-full">
      <Transformation_Header type={TransformationType.OBJECT_REMOVE} />

      <TransformationForm
        transformationType={TransformationType.OBJECT_REMOVE}
        schema={objectRemoveSchema}
        fields={[
          { name: "title", label: "Image Title", type: "text" },
          {
            name: "object_to_remove",
            label: "Object to Remove",
            type: "text",
          },
        ]}
        onSubmit={(values) => console.log(values)}
      />
    </div>
  );
}
