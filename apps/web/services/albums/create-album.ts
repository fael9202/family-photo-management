import { IAddAlbumResponse } from "@/utils/interfaces/albums.interface";
import axios from "axios";

export async function addAlbumService({
  title,
  token,
}: {
  title: string;
  token: string;
}): Promise<IAddAlbumResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const body = {
    title,
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/albums`;

  try {
    const response = await axios.post<IAddAlbumResponse>(url, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
