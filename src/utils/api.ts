import { http } from "./http";
import type { CoursesResponse, PurchasedCoursesResponse } from "../types/course";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLoginAt: string;
  };
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CoursesParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const api = {
  register(payload: RegisterRequest) {
    return http.post<ApiResponse>("/api/auth/register", payload);
  },
  login(payload: LoginRequest) {
    return http.post<ApiResponse<LoginResponse>>("/api/auth/login", payload);
  },
  me() {
    return http.get<ApiResponse>("/api/auth/me");
  },
  getCourses(params?: CoursesParams) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const queryString = searchParams.toString();
    return http.get<CoursesResponse>(`/api/courses${queryString ? `?${queryString}` : ''}`);
  },
  getPurchasedCourses(page = 1, limit = 10) {
    return http.get<PurchasedCoursesResponse>(`/api/courses/purchased/all?page=${page}&limit=${limit}`);
  }
};

// Keep backward compatibility
export { api as apiClient };
