import { IUsersResponse } from "@/utils/interfaces/users.interface";

import axios from "axios";

export async function GetAllUsersService(pagination: {
  pageIndex: number;
  pageSize: number;
}): Promise<IUsersResponse> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/users?page=${pagination.pageIndex}` +
    `${pagination.pageSize ? "&pageSize=" + pagination.pageSize : ""}`;
  const response = await axios.get(baseUrl, {
    headers: {},
  });
  return response.data.data;
}
