import { IEditPhotoResponse } from "@/utils/interfaces/photo-albums.interface";
import axios from "axios";

export async function editPhotoService({
  title,
  token,
  id,
}: {
  title: string;
  token: string;
  id: number;
}): Promise<IEditPhotoResponse> {
  console.log("token", token);
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const body = {
    title,
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/photos/${id}`;

  try {
    const response = await axios.patch<IEditPhotoResponse>(url, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
