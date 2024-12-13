import { IAlbumsResponse } from "@/utils/interfaces/albums.interface";

import axios from "axios";

export async function GetAlbumPhotosService(
  pagination: {
    pageIndex: number;
    pageSize: number;
  },
  albumId: number
): Promise<IAlbumsResponse> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/albums/${albumId}/photos?page=${pagination.pageIndex}` +
    `${pagination.pageSize ? "&pageSize=" + pagination.pageSize : ""}`;
  const response = await axios.get(baseUrl, {
    headers: {},
  });
  return response.data.data;
}
