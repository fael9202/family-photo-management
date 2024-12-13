interface ErrorResponse {
  property?: string;
  children?: ErrorResponse[];
}

export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
  errors?: ErrorResponse[];
}
