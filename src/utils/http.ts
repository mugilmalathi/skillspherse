// src/utils/http.ts
import axios from "axios";
import { AuthManager } from "./auth";

const RAW = import.meta.env.VITE_API_BASE_URL || "http://localhost:3007";

export const http = axios.create({
    baseURL: RAW.replace(/\/+$/, ""),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include auth token
http.interceptors.request.use(
    (config) => {
        const token = AuthManager.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => res.data, // <-- now api.login() resolves to ApiResponse directly
    (err) => {
        const msg = err?.response?.data?.message || err.message || "Request failed";
        return Promise.reject(new Error(msg));
    }
);
