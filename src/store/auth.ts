import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStoreState {
  isAuthenticated: boolean;
  token: string;
  login: ({ token }: { token: string }) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStoreState>(
    (set) => ({
      isAuthenticated: false,
      token: '',
      refreshToken: '',
      login: ({ token }) => {
        set({
          token,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          token: '',
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth',
    },
  ),
);

export default useAuthStore;
