import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserResponse } from '../types';

interface AuthState {
  token: string | null;
  user: UserResponse | null;
  setAuth: (token: string, user: UserResponse) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: 'auth-storage' },
  ),
);

// export const getPersistedToken = (): string | null => {
//   // localStorage is not available on the server
//   if (typeof window === 'undefined') return null;
//   try {
//     const raw = localStorage.getItem('auth-storage');
//     if (!raw) return null;
//     const parsed = JSON.parse(raw);
//     return parsed?.state?.token ?? null;
//   } catch {
//     return null;
//   }
// };

const isTokenExpired = (token: string): boolean => {
  try {
    // JWT payload is the second segment, base64 encoded
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now();
  } catch {
    // If we can't decode it, treat it as expired
    return true;
  }
};

export const getPersistedToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('auth-storage');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const token = parsed?.state?.token ?? null;
    if (!token) return null;
    // Clear expired token from store immediately
    if (isTokenExpired(token)) {
      useAuthStore.getState().clearAuth();
      return null;
    }
    return token;
  } catch {
    return null;
  }
};
