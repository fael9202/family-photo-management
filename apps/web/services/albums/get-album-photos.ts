import { IPhotoAlbum } from "@/utils/interfaces/photo-albums.interface";

import axios from "axios";

export async function GetAlbumPhotosService(
  pagination: {
    pageIndex: number;
    pageSize: number;
  },
  albumId: number,
  token: string
): Promise<IPhotoAlbum> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/albums/${albumId}?page=${pagination.pageIndex}` +
    `${pagination.pageSize ? "&pageSize=" + pagination.pageSize : ""}`;
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data.data;
}
