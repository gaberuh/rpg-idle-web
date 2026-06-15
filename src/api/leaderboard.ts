import { api } from './client'
import type { LeaderboardResponse } from '@/types/api'

export type LeaderboardType = 'level' | 'wealth' | 'skills'

export const leaderboardApi = {
  get: (type: LeaderboardType) => api.get<LeaderboardResponse>(`/leaderboard/${type}`).then(r => r.data),
  getMe: (type: LeaderboardType) => api.get<LeaderboardResponse>(`/leaderboard/${type}/me`).then(r => r.data),
}
