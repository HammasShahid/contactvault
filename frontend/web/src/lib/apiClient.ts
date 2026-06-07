import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

const getToken = (): string | null => {
  const storeToken = useAuthStore.getState().token;
  if (storeToken) return storeToken;
  try {
    const raw = localStorage.getItem('auth-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.state?.token ?? null;
    }
  } catch {
    return null;
  }
  return null;
};

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      // Only redirect if not already on /auth to avoid redirect loop
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/auth')
      ) {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
