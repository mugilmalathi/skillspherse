// src/utils/http.ts
import axios from "axios";

const RAW = import.meta.env.VITE_API_BASE_URL || "http://localhost:3007";

export const http = axios.create({
    baseURL: RAW.replace(/\/+$/, ""),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

http.interceptors.response.use(
    (res) => res.data, // <-- now api.login() resolves to ApiResponse directly
    (err) => {
        const msg = err?.response?.data?.message || err.message || "Request failed";
        return Promise.reject(new Error(msg));
    }
);
