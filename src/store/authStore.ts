import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  playerId: string | null
  characterId: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setTokens: (token: string, playerId: string, characterId: string | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  playerId: null,
  characterId: null,
  isAuthenticated: false,
  isLoading: true,
  setTokens: (token, playerId, characterId) => set({
    accessToken: token,
    playerId,
    characterId,
    isAuthenticated: true,
    isLoading: false,
  }),
  clearAuth: () => set({
    accessToken: null,
    playerId: null,
    characterId: null,
    isAuthenticated: false,
    isLoading: false,
  }),
}))
