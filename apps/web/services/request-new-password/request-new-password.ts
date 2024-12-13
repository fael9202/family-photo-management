import { ApiResponse } from "@/utils/interfaces/api-response.interface";
import axios from "axios";

export async function requestNewPasswordService({
  email,
}: {
  email: string;
}): Promise<ApiResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
  };

  const body = {
    email,
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/request-new-password`;

  try {
    const response = await axios.post<ApiResponse>(url, body, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
