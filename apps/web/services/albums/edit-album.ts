import { IEditAlbumResponse } from "@/utils/interfaces/albums.interface";
import axios from "axios";

export async function editAlbumService({
  title,
  token,
  id,
}: {
  title: string;
  token: string;
  id: number;
}): Promise<IEditAlbumResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const body = {
    title,
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/albums/${id}`;

  try {
    const response = await axios.patch<IEditAlbumResponse>(url, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
