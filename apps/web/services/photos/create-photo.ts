import { IAddPhotoResponse } from "@/utils/interfaces/photo-albums.interface";
import axios from "axios";

export async function addPhotoService({
  title,
  token,
  albumId,
}: {
  title: string;
  token: string;
  albumId: number;
}): Promise<IAddPhotoResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const body = {
    title,
    albumId,
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/photos`;

  try {
    const response = await axios.post<IAddPhotoResponse>(url, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
