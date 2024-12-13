"use client";
import { GetAlbumPhotosService } from "@/services/albums/get-album-photos";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Session } from "next-auth";
export const useAlbumPhotos = ({ paramId, session }: { paramId: number, session: Session }) => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const { data, error, isLoading } = useQuery({
    queryKey: [
      `album-photos`,
      { pagination: pagination },
      paramId,
    ],
    queryFn: async () => {
      return GetAlbumPhotosService(pagination, paramId, session.token);
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
