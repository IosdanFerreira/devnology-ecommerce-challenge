

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
  return config;
});

// Interceptor de resposta para gerenciar refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const isRefreshRequest = originalRequest.url?.includes('/auth/refresh');

    if (
      status === 401 &&
      !originalRequest._authRetry &&
      !isRefreshRequest
    ) {
      originalRequest._authRetry = true;
      try {
        await api.post('/auth/refresh', {}); // Renova token
        return api(originalRequest); // Reexecuta requisição original
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);