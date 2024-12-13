"use client";
import { AlbumsService } from "@/services/albums/get-all-albums";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useAlbums = () => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const { data, error, isLoading } = useQuery({
    queryKey: [
      `albums-${pagination.pageIndex}-${pagination.pageSize}`,
      { pagination: pagination },
    ],
    queryFn: async () => {
      return AlbumsService(pagination);
    },
  });

  return {
    data,
    error,
    isLoading,
    pagination,
    setPagination,
  };
};
