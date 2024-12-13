import { IDeleteAlbumResponse } from "@/utils/interfaces/albums.interface";
import axios from "axios";

export async function deleteAlbumService({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<IDeleteAlbumResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const url = `${process.env.NEXT_PUBLIC_API_URL}/albums/${id}`;

  try {
    const response = await axios.delete<IDeleteAlbumResponse>(url, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
