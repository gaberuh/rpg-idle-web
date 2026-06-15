import { api } from './client'
import type { CharacterResponse } from '@/types/api'

interface CreateCharacterRequest { name: string; vocation: string }

export const characterApi = {
  getMe: () => api.get<CharacterResponse>('/characters/me').then(r => r.data),
  create: (data: CreateCharacterRequest) => api.post<CharacterResponse>('/characters', data).then(r => r.data),
}
