"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SetStateAction } from "react";

export default function Pagination({
  pagination,
  setPagination,
  data,
}: {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: (
    value: SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  ) => void;
  data: {
    totalPages: number;
  };
}) {
  return (
    <div className="flex justify-between items-center">
      <Button
        variant="outline"
        onClick={() =>
          setPagination((old) => ({
            ...old,
            pageIndex: Math.max(old.pageIndex - 1, 1),
          }))
        }
        disabled={pagination.pageIndex === 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {pagination.pageIndex} of {data.totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() =>
          setPagination((old) => ({
            ...old,
            pageIndex: Math.min(old.pageIndex + 1, data.totalPages),
          }))
        }
        disabled={pagination.pageIndex === data.totalPages}
      >
        Next <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
