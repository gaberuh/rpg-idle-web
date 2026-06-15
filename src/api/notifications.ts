import { api } from './client'

export const notificationsApi = {
  registerToken: (token: string, platform: 'web') =>
    api.post('/notifications/tokens', { token, platform }).then(r => r.data),
}
