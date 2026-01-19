import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | undefined
  userName: string | undefined
  isAuthenticated: boolean
  setCredentials: (accessToken: string, userName: string) => void
  clearCredentials: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: undefined,
      userName: undefined,
      isAuthenticated: false,
      setCredentials: (accessToken: string, userName: string) =>
        set({ accessToken, userName, isAuthenticated: true }),
      clearCredentials: () =>
        set({
          accessToken: undefined,
          userName: undefined,
          isAuthenticated: false
        })
    }),
    {
      name: 'auth-storage'
    }
  )
)
