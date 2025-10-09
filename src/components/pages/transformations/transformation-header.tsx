import { TRANSFORMATIONS_HEADER, TransformationType } from "@/constants";

type TransformationHeaderProps = {
  type: TransformationType;
};

export default function Transformation_Header({
  type,
}: TransformationHeaderProps) {
  const { title, description } = TRANSFORMATIONS_HEADER[type];
  TRANSFORMATIONS_HEADER[type];

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-primary text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
