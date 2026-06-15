import { api } from '@/api/client'

export async function registerPushToken() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return

  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
  })

  await api.post('/notifications/tokens', {
    token: JSON.stringify(subscription),
    platform: 'web',
  })
}
