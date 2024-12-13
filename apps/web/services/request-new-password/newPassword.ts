import { ApiResponse } from "@/utils/interfaces/api-response.interface";
import axios from "axios";

export async function newPasswordService({
  password,
  passwordConfirmation,
  token,
}: {
  password: string;
  passwordConfirmation: string;
  token: string;
}): Promise<ApiResponse> {
  const headers = {
    accept: "*/*",
    "Content-Type": "application/json",
    Authorization: token,
  };

  const body = {
    password,
    passwordConfirmation,
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`;

  try {
    const response = await axios.post<ApiResponse>(url, body, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
