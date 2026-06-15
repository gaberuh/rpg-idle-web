import { Outlet, Link, useNavigate } from '@tanstack/react-router'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

export function AppShell() {
  const { clearAuth } = useAuthStore()
  const navigate = useNavigate()

  async function handleLogout() {
    await authApi.logout().catch(() => {})
    clearAuth()
    navigate({ to: '/login' })
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-56 bg-gray-800 flex flex-col">
        <div className="p-4 font-bold text-purple-400 text-lg">RPG Idle</div>
        <nav className="flex-1 p-2 space-y-1">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/hunts', label: 'Hunts' },
            { to: '/inventory', label: 'Inventário' },
            { to: '/skills', label: 'Skills' },
            { to: '/market', label: 'Market' },
            { to: '/leaderboard', label: 'Ranking' },
            { to: '/boss', label: 'Boss' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block px-3 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              activeProps={{ className: 'bg-purple-900/40 text-purple-300' }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="m-3 px-3 py-2 text-sm text-gray-400 hover:text-white text-left"
        >
          Sair
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
