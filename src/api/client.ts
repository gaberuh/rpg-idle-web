import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: () => void }> = []

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const res = await api.post<{ access_token: string; player_id: string; character_id: string | null }>('/auth/refresh')
      const { access_token, player_id, character_id } = res.data
      useAuthStore.getState().setTokens(access_token, player_id, character_id)

      failedQueue.forEach((p) => p.resolve(access_token))
      failedQueue = []

      originalRequest.headers.Authorization = `Bearer ${access_token}`
      return api(originalRequest)
    } catch {
      failedQueue.forEach((p) => p.reject())
      failedQueue = []
      useAuthStore.getState().clearAuth()
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  },
)
