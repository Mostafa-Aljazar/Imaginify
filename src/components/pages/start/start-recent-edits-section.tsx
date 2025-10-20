"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Clock, ImageIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Edit = {
  id: string;
  title: string;
  url: string;
  createdAt: string | Date;
  tags: string[];
};

export default function StartRecentEditsSection() {
  const [query, setQuery] = useState("");
  const [edits, setEdits] = useState<Edit[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();
  const limit = 12;

  async function fetchData(search: string, pageNumber: number) {
    try {
      setError("");
      const res = await fetch(
        `/api/transformations/search?q=${encodeURIComponent(
          search
        )}&page=${pageNumber}&limit=${limit}`
      );

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      setEdits(data.data || []);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (e: any) {
      setError(e.message);
      setEdits([]);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      startTransition(() => fetchData(query, 1));
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    if (page > 1) startTransition(() => fetchData(query, page));
  }, [page]);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-3">
        <h2 className="font-bold text-gray-800 text-xl md:text-2xl">
          Recent Edits
        </h2>
        <div className="flex items-center gap-4 w-full md:w-2/3">
          <div className="relative flex-1">
            <Search className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search edits ..."
              className="pl-12 border border-gray-200 rounded-md"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      {isPending && !error && (
        <p className="text-gray-500 text-sm text-center">Loading...</p>
      )}
      {!isPending && !error && edits.length === 0 && (
        <p className="text-gray-500 text-sm text-center">No results found</p>
      )}

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {edits.map((edit) => (
          <div
            key={edit.id}
            className="flex flex-col bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition"
          >
            <div className="relative flex justify-center w-full h-48 overflow-hidden">
              {edit.url ? (
                <img
                  src={edit.url}
                  alt={edit.title}
                  className="h-full object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-200 w-full h-full">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 bg-gray-50 p-3">
              <p className="flex items-center gap-2 font-medium text-gray-800 truncate">
                <ImageIcon className="w-4 h-4 text-gray-500" /> {edit.title}
              </p>
              <span className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                {new Date(edit.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {edit.tags?.length > 0 && (
                <p className="text-gray-500 text-xs truncate">
                  Tags: {edit.tags.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <span className="text-gray-500 text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
