import { IAlbumsResponse } from "@/utils/interfaces/albums.interface";

import axios from "axios";

export async function AlbumsService(
  pagination: {
    pageIndex: number;
    pageSize: number;
  },
  token: string
): Promise<IAlbumsResponse> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/albums/?page=${pagination.pageIndex}` +
    `${pagination.pageSize ? "&pageSize=" + pagination.pageSize : ""}`;
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data.data;
}
