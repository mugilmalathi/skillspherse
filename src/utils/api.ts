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

export interface CourseDetailResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    category: string;
    duration: number;
    level: string;
    thumbnail: string;
    rating: number;
    totalRatings: number;
    enrollmentCount: number;
    tags: string[];
    requirements: string[];
    learningOutcomes: string[];
    createdAt: string;
  };
  timestamp: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
  };
  timestamp: string;
}

export const api = {
  register(payload: RegisterRequest) {
    return http.post<ApiResponse>("/api/auth/register", payload);
  },
  login(payload: LoginRequest) {
    return http.post<ApiResponse<LoginResponse>>("/api/auth/login", payload);
  },
  me() {
    return http.get<UserProfileResponse>("/api/auth/me");
  },
  logout() {
    return http.post<ApiResponse>("/api/auth/logout");
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
  getCourseDetail(courseId: string) {
    return http.get<CourseDetailResponse>(`/api/public/courses/${courseId}`);
  },
  getPurchasedCourses(page = 1, limit = 10) {
    return http.get<PurchasedCoursesResponse>(`/api/courses/purchased/all${page || limit ? `?page=${page}&limit=${limit}` : ''}`);
  }
};

// Keep backward compatibility
export { api as apiClient };
