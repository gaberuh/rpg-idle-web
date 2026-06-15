import { api } from './client'
import type { TrainingStatusResponse, SkillType } from '@/types/api'

export const trainingApi = {
  getStatus: () => api.get<TrainingStatusResponse>('/training/status').then(r => r.data),
  start: (skill_type: SkillType) => api.post('/training/start', { skill_type }).then(r => r.data),
  stop: () => api.post('/training/stop').then(r => r.data),
}
