"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUserStore } from "@/stores/store-user-data";
import { Clock, History, ImageIcon, Loader, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Profile_Recent_Edits() {
  const { user, removeTransformation } = useUserStore();
  const [selectedEdit, setSelectedEdit] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const recentEdits = user?.transformations
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .map((item) => ({
      id: item.id,
      title: item.title,
      date: item.updatedAt,
      thumb: item.url,
    }));

  const handleDelete = (id: string) => {
    setSelectedEdit(id);
    setModalOpen(true);
  };

  // const confirmDelete = () => {
  //   if (!selectedEdit || !user) return;
  //   removeTransformation(selectedEdit);
  //   setModalOpen(false);
  //   setSelectedEdit(null);
  // };

  const confirmDelete = async () => {
    if (!selectedEdit || !user) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/transformations/${selectedEdit}/delete`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to delete");

      removeTransformation(selectedEdit);
    } catch (err) {
      console.error("Failed to delete transformation:", err);
    } finally {
      setIsDeleting(false);
      setModalOpen(false);
      setSelectedEdit(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="flex items-center gap-2 font-semibold text-primary text-2xl">
        <History className="w-6 h-6 text-primary" />
        Recent Edits
      </h2>

      {recentEdits && recentEdits.length > 0 ? (
        <div className="gap-6 grid grid-cols-2 sm:grid-cols-3">
          {recentEdits.map((edit) => (
            <div
              key={edit.id}
              className="group relative flex flex-col bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden hover:scale-105_ transition-transform duration-300 transform"
            >
              {/* Thumbnail */}
              <div className="relative flex justify-center w-full h-48 overflow-hidden">
                <Image
                  src={edit.thumb as string}
                  alt={edit.title}
                  fill
                  className="object-cover group-hover:scale-110_ transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Delete Icon */}
                <button
                  className="top-2 right-2 !z-10 absolute hover:bg-gray-50/50 p-1 rounded-full text-red-500 transition-colors hover:cursor-pointer"
                  onClick={() => handleDelete(edit.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 bg-gray-50 p-3">
                <p className="flex items-center gap-1 font-medium text-gray-800 truncate">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  {edit.title}
                </p>
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {new Date(edit.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-50 p-6 border-2 border-gray-200 border-dashed rounded-xl min-h-[12rem]">
          <p className="text-gray-500">No recent edits yet</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="hover:!bg-gray-500"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="!bg-red-500 hover:!bg-red-500/50"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader />}
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
