import {
  IDeletePhotoResponse,
} from "@/utils/interfaces/photo-albums.interface";
import axios from "axios";

export async function deletePhotoService({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<IDeletePhotoResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const url = `${process.env.NEXT_PUBLIC_API_URL}/photos/${id}`;

  try {
    const response = await axios.delete<IDeletePhotoResponse>(url, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
