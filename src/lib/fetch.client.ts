import axios from 'axios';
import { env } from '@/config';

const api = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const authPaths = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password-required'];
      const isOnAuthPage = authPaths.some((path) => window.location.pathname.startsWith(path));
      if (!isOnAuthPage) {
        window.location.href = '/sign-in';
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default api;
