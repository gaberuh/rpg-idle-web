import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createRouter,
  RouterProvider,
  createRootRoute,
  createRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { AppShell } from '@/components/layout/AppShell'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { CreateCharacterPage } from '@/pages/CreateCharacterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { HuntsPage } from '@/pages/HuntsPage'
import { HuntResultPage } from '@/pages/HuntResultPage'
import { InventoryPage } from '@/pages/InventoryPage'
import { SkillsPage } from '@/pages/SkillsPage'
import { MarketPage } from '@/pages/MarketPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { BossPage } from '@/pages/BossPage'
import './index.css'

const queryClient = new QueryClient()

function AppInit({ children }: { children: React.ReactNode }) {
  const { setTokens, clearAuth } = useAuthStore()

  useEffect(() => {
    authApi.refresh()
      .then(data => setTokens(data.access_token, data.player_id, data.character_id))
      .catch(() => clearAuth())
  }, [])

  return <>{children}</>
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Carregando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    throw redirect({ to: '/login' })
  }

  return <>{children}</>
}

const rootRoute = createRootRoute({
  component: () => (
    <AppInit>
      <Outlet />
    </AppInit>
  ),
})

const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: LoginPage })
const registerRoute = createRoute({ getParentRoute: () => rootRoute, path: '/register', component: RegisterPage })
const createCharacterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/criar-personagem',
  component: () => <AuthGuard><CreateCharacterPage /></AuthGuard>,
})

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: () => <AuthGuard><AppShell /></AuthGuard>,
})

const dashboardRoute = createRoute({ getParentRoute: () => appRoute, path: '/dashboard', component: DashboardPage })
const huntsRoute = createRoute({ getParentRoute: () => appRoute, path: '/hunts', component: HuntsPage })
const huntResultRoute = createRoute({ getParentRoute: () => appRoute, path: '/hunts/sessions/$sessionId', component: HuntResultPage })
const inventoryRoute = createRoute({ getParentRoute: () => appRoute, path: '/inventory', component: InventoryPage })
const skillsRoute = createRoute({ getParentRoute: () => appRoute, path: '/skills', component: SkillsPage })
const marketRoute = createRoute({ getParentRoute: () => appRoute, path: '/market', component: MarketPage })
const leaderboardRoute = createRoute({ getParentRoute: () => appRoute, path: '/leaderboard', component: LeaderboardPage })
const bossRoute = createRoute({ getParentRoute: () => appRoute, path: '/boss', component: BossPage })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => { throw redirect({ to: '/dashboard' }) },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  createCharacterRoute,
  appRoute.addChildren([
    dashboardRoute,
    huntsRoute,
    huntResultRoute,
    inventoryRoute,
    skillsRoute,
    marketRoute,
    leaderboardRoute,
    bossRoute,
  ]),
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
