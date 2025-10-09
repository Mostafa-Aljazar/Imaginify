"use client";

import { Input } from "@/components/ui/input";
import { icons, Search } from "lucide-react";
import React, { useState, useMemo, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/constants";

// Generate 25 fake edits
const edits = Array.from({ length: 25 }, (_, i) => {
  const types = NAVBAR_LINKS.slice(1, 6);
  return {
    id: i + 1,
    name: `Edit ${i + 1}`,
    type: types[i % types.length].name,
    image: `https://picsum.photos/seed/${i + 1}/600/400`,
    icons: types[i % types.length].icon,
  };
});

export default function Recent_Edits() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const pageSize = 9;

  const filtered = useMemo(() => {
    return edits.filter(
      (edit) =>
        edit.name.toLowerCase().includes(search.toLowerCase()) ||
        edit.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-2">
        <h2 className="font-bold text-gray-800 text-xl md:text-2xl lg:text-3xl text-nowrap tracking-tight">
          Recent Edits
        </h2>

        <div className="relative w-full md:w-2/3">
          <Search className="top-1/2 left-4 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
          <Input
            placeholder="Search edits..."
            value={search}
            onChange={(e) =>
              startTransition(() => {
                setSearch(e.target.value);
                setPage(1);
              })
            }
            className="shadow-sm pl-12 border border-gray-200 rounded-md focus-visible:ring-[1px] transition"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((edit) => (
          <Card
            key={edit.id}
            className="group bg-white shadow-sm hover:shadow-lg p-0 border-none rounded-md overflow-hidden transition-shadow duration-300 ease-in-out"
          >
            <CardContent className="p-0">
              <img
                src={edit.image}
                alt={edit.name}
                className="rounded-t-md w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <div className="flex flex-row justify-between items-center group-hover:bg-gray-50 p-2 transition-colors duration-300 ease-in-out">
                <p className="mt-1 text-gray-500 text-md group-hover:text-primary transition-colors duration-300 ease-in-out">
                  {edit.type}
                </p>
                {
                  <edit.icons className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors duration-300 ease-in-out" />
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading state */}
      {isPending && (
        <p className="mt-4 text-gray-500 text-sm text-center">Searching...</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="shadow px-4 rounded-full text-primary"
          >
            Prev
          </Button>
          <span className="font-normal text-gray-500 text-md">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="shadow px-4 rounded-full text-primary"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
