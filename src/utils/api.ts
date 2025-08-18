import { http } from "./http";

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

export const api = {
  register(payload: RegisterRequest) {
    return http.post<ApiResponse>("/api/auth/register", payload);
  },
  login(payload: LoginRequest) {
    return http.post<ApiResponse<LoginResponse>>("/api/auth/login", payload);
  },
  me() {
    return http.get<ApiResponse>("/api/auth/me");
  }
};

// Keep backward compatibility
export { api as apiClient };
