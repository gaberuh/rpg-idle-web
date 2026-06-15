import { api } from './client'

interface LoginRequest { email: string; password: string }
interface RegisterRequest { email: string; password: string }
interface AuthResponse { access_token: string; player_id: string; character_id: string | null }

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data).then(r => r.data),
  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data).then(r => r.data),
  refresh: () => api.post<AuthResponse>('/auth/refresh').then(r => r.data),
  logout: () => api.post('/auth/logout'),
}
