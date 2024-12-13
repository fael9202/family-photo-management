"use client";
import { GetUserAlbumsService } from "@/services/users/get-user-albums";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useAlbumPhotos = ({ paramId }: { paramId: number }) => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const { data, error, isLoading } = useQuery({
    queryKey: [
      `album-photos-${pagination.pageIndex}-${pagination.pageSize}`,
      { pagination: pagination },
      paramId,
    ],
    queryFn: async () => {
      return GetAlbumPhotosService(pagination, paramId);
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
