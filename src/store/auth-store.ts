import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar_url: string;
  token: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => {
        localStorage.removeItem("auth-storage");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
