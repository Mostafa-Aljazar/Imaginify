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
import { AlertCircle, CreditCard, Download, Loader2, X } from "lucide-react";
import { cn } from "@/lib/cn";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import { ROUTES, TransformationType } from "@/constants";
import { useUserStore } from "@/stores/store-user-data";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
}

export function TransformationForm({
  transformationType,
  schema,
  defaultValues,
  fields,
}: TransformationFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

  const { user } = useUserStore();
  const creditsAvailable = user?.creditsAvailable || 0;
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const { uploadImage, loading, progress, url, error } = useCloudinaryUpload();

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (creditsAvailable <= 0) {
      setShowModal(true);
      return;
    }

    if (!file) {
      alert("Please upload an image.");
      return;
    }

    await uploadImage(file, transformationType, values);
  };

  const handleDownload = async () => {
    if (!url) return;

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `transformed_${Date.now()}.png`; // filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  return (
    <>
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
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    {loading
                      ? "Uploading..."
                      : "Drag & Drop Image or Click Here"}
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
                Transformed
              </h3>

              <div
                className={cn(
                  "relative bg-gray-50 border-1 border-dashed rounded-xl w-full h-64 overflow-hidden"
                )}
              >
                {loading && (
                  <div className="flex flex-col justify-center items-center gap-4 px-6 h-full">
                    <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
                    <div className="bg-gray-200 rounded-full w-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-2 transition-all duration-300 ease-in-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="font-medium text-gray-600 text-sm">
                      Uploading image... {progress}%
                    </p>
                  </div>
                )}

                {!loading && error && (
                  <div className="flex flex-col justify-center items-center gap-3 px-4 h-full text-center">
                    <div className="flex justify-center items-center gap-2 bg-red-50 px-4 py-3 border border-red-200 rounded-md">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="font-medium text-red-600 text-sm">
                        Upload failed
                      </p>
                    </div>
                    <p className="text-gray-500 text-xs">{error}</p>
                  </div>
                )}

                {!loading && url && (
                  <>
                    <img
                      src={url}
                      alt="Transformed"
                      className="rounded-xl w-full h-64 object-contain"
                    />

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="top-2 right-2 absolute flex justify-center items-center bg-black/60 bg-opacity-60 hover:bg-opacity-80 p-1 rounded-full w-5 h-5 text-white"
                    >
                      <Download size={16} />
                    </button>
                  </>
                )}

                {!loading && !url && !error && (
                  <div className="flex flex-col justify-center items-center gap-2 h-full text-gray-400">
                    <p className="text-sm">No transformed image yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-center md:justify-start gap-4 md:gap-6 pb-10 w-full">
            <Button type="submit" className="flex-1">
              Apply Transformation
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <CreditCard className="w-5 h-5" />
              No Available Credits
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              You have no credits left. Please purchase more credits to continue
              using transformations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={() => router.push(ROUTES.PAGES.CREDITS)}>
              Buy Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
