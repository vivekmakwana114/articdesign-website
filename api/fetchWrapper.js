// src/api/fetchWrapper.js
import { API_URL } from "./config";

const fetchWrapper = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    "Cache-Control": "no-store", // Disable caching at the header level
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: "include", // Allows cookies to be sent with requests
    cache: "no-store", // Disable caching at the request level
  });

  if (response.status === 400) {
    // Try to refresh the token
    const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include", // Allows cookies to be sent with requests
      cache: "no-store",
    });

    if (refreshResponse.ok) {
      const refreshData = await refreshResponse.json();
      localStorage.setItem("accessToken", refreshData.accessToken);
      // Retry the original request with the new access token
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${refreshData.accessToken}`,
      };

      if (!(options.body instanceof FormData)) {
        retryHeaders["Content-Type"] = "application/json";
      }

      return fetchWrapper(url, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
        cache: "no-store",
      });
    }
  }

  return response;
};

export const getRequest = async (url) => {
  const response = await fetchWrapper(url);
  return response;
};

export const patchRequest = async (url, body) => {
  const response = await fetchWrapper(url, {
    method: "PATCH",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
  return response;
};

export const putRequest = async (url, body) => {
  const response = await fetchWrapper(url, {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
  return response;
};

export const postRequest = async (url, body) => {
  const response = await fetchWrapper(url, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
  return response;
};

export const deleteRequest = async (url) => {
  const response = await fetchWrapper(url, {
    method: "DELETE",
  });
  return response;
};

export default fetchWrapper;
