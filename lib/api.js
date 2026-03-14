import axios from "axios";

// Fallback to localhost if environment variable is not defined
const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
const BASE_URL = RAW_BASE_URL.replace(/\/+$/g, "");

// Log API URL to verify correct backend connection
console.log("Using API Base URL:", BASE_URL);

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      // Check localStorage first, then sessionStorage
      const raw =
        localStorage.getItem("auth") || sessionStorage.getItem("auth");
      if (raw) {
        const { tokens } = JSON.parse(raw);
        const token = tokens?.access?.token;
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.error("Debug: Error in interceptor:", e);
    }
  }
  return config;
});

// Response interceptor to handle token expiration (401)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      // Check if error is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        try {
          // Clear auth data from both storages
          localStorage.removeItem("auth");
          sessionStorage.removeItem("auth");

          // Define protected routes that REQUIRE a redirect to /auth on 401
          const protectedRoutes = ["/user"];
          const currentPath = window.location.pathname;
          
          const isProtected = protectedRoutes.some(route => 
            currentPath === route || currentPath.startsWith(`${route}/`) || currentPath.startsWith(`${route}?`)
          );

          // Force redirect to auth page ONLY if on a protected route
          // Otherwise, just stay on the page (tokens are cleared, user will see guest view)
          if (isProtected && !currentPath.includes("/auth")) {
            window.location.href = `/auth?returnUrl=${encodeURIComponent(currentPath)}`;
          }
        } catch (e) {
          console.error("Error handling 401 redirect:", e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
