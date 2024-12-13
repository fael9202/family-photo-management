"use client";
import { GetAllUsersService } from "@/services/users/get-all-users";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useUsers = () => {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 5 });
  const { data, error, isLoading } = useQuery({
    queryKey: [
      `users-${pagination.pageIndex}-${pagination.pageSize}`,
      { pagination: pagination },
    ],
    queryFn: async () => {
      return GetAllUsersService(pagination);
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
