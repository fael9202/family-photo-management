"use client";
import { AlbumsService } from "@/services/albums/get-all-albums";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Session } from "next-auth";
export const useAlbums = (session: Session) => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const { data, error, isLoading } = useQuery({
    queryKey: [
      `albums-${pagination.pageIndex}-${pagination.pageSize}`,
      { pagination: pagination },
    ],
    queryFn: async () => {
      return AlbumsService(pagination, session.token);
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
