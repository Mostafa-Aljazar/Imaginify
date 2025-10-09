"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DragEvent, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import { TransformationType } from "@/constants";

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
};

interface TransformationFormProps {
  transformationType: TransformationType;
  schema: z.ZodObject<any>;
  defaultValues?: Record<string, any>;
  fields: FieldConfig[];
  onSubmit: (values: any) => void;
}

export function TransformationForm({
  transformationType,
  schema,
  defaultValues,
  fields,
  onSubmit,
}: TransformationFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

  const [file, setFile] = useState<File | null>(null);
  // console.log("🚀 ~ TransformationForm ~ file:", file);

  const [dragOver, setDragOver] = useState(false);
  // const [loading, setLoading] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
    // if (e.dataTransfer.files[0]) console.log(e.dataTransfer.files[0]);
  };
  const { uploadImage, loading, progress, url, error } = useCloudinaryUpload();

  const handleSubmit = async (values: Record<string, unknown>) => {
    console.log("handleSubmit :", values);
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    await uploadImage(file, transformationType, values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        {fields.map((fieldItem) => (
          <FormField
            key={fieldItem.name}
            control={form.control}
            name={fieldItem.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 text-sm">
                  {fieldItem.label}
                </FormLabel>
                <FormControl>
                  {fieldItem.type === "text" ? (
                    <Input
                      type="text"
                      placeholder={fieldItem.placeholder || ""}
                      className="shadow border-1 border-gray-300 focus-visible:ring-[1px]"
                      {...field}
                      value={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? field.value
                          : ""
                      }
                    />
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        typeof field.value === "string"
                          ? field.value
                          : undefined
                      }
                    >
                      <SelectTrigger className="shadow border-1 border-gray-300 focus-visible:ring-[1px] w-full">
                        <SelectValue
                          placeholder={fieldItem.placeholder || "Select"}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-100 dark:bg-gray-800 shadow border border-gray-300 dark:border-gray-600">
                        {fieldItem.options?.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="focus:bg-secondary/20 dark:focus:bg-gray-700 focus:text-black"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex md:flex-row flex-col justify-center md:justify-start gap-4 md:gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h3 className="font-semibold text-gray-500 text-2xl">Original</h3>
            <div
              className={cn(
                "relative rounded-xl w-full h-64 overflow-hidden",
                file && "border-1 border-dashed"
              )}
            >
              {!file ? (
                <div
                  className={cn(
                    "flex justify-center items-center p-6 border-1 border-dashed rounded-xl w-full h-full text-center cursor-pointer",
                    dragOver ? "border-blue-500" : "border-gray-300"
                  )}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  {loading ? "Uploading..." : "Drag & Drop Image or Click Here"}
                </div>
              ) : (
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    className="absolute inset-0 rounded-xl w-full h-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="top-2 right-2 absolute flex justify-center items-center bg-black/60 bg-opacity-60 hover:bg-opacity-80 p-1 rounded-full w-5 h-5 text-white"
                  >
                    <X size={16} />
                  </button>
                </>
              )}

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && setFile(e.target.files[0])
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h3 className="font-semibold text-primary text-2xl">
              <p>Transformed</p>
            </h3>
            <div
              // className="bg-gray-50 border-1 border-dashed rounded-xl w-full h-64 animate-puslse"
              className={cn(
                "relative rounded-xl w-full h-64 overflow-hidden",
                "border-1 border-dashed"
              )}
            >
              {/* Progress Bar */}
              {loading && (
                <div className="bg-gray-200 rounded w-full h-4 overflow-hidden">
                  <div
                    className="bg-blue-500 h-4"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Error Message */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Uploaded Image */}
              {url && (
                <img
                  src={url}
                  alt="Uploaded"
                  className="absolute inset-0 rounded-xl w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-center md:justify-start gap-4 md:gap-6 pb-10 w-full">
          <Button type="submit" className="flex-1">
            Apply Transformation
          </Button>

          <Button type="submit" className="flex-1">
            Save Image
          </Button>
        </div>
      </form>
    </Form>
  );
}
