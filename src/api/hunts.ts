import { api } from './client'
import type { CurrentHuntResponse, HuntSessionResult } from '@/types/api'

interface StartHuntRequest { duration_minutes: number }

export const huntsApi = {
  getCurrent: () => api.get<CurrentHuntResponse>('/hunts/current').then(r => r.data),
  getSession: (id: string) => api.get<HuntSessionResult>(`/hunts/sessions/${id}`).then(r => r.data),
  start: (huntId: string, data: StartHuntRequest) => api.post(`/hunts/${huntId}/start`, data).then(r => r.data),
  stop: () => api.post('/hunts/stop').then(r => r.data),
}
