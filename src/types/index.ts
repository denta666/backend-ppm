export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ContactDTO {
  name: string;
  email: string;
  message: string;
}

export interface ReviewDTO {
  name: string;
  rating: number;
  comment: string;
}
