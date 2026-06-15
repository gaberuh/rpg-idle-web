import { useState } from 'react'
import { useNavigate, Link } from '@tanstack/react-router'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

export function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { setTokens } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await authApi.register({ email, password })
      setTokens(data.access_token, data.player_id, data.character_id)
      navigate({ to: '/criar-personagem' })
    } catch {
      setError('Erro ao registrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full bg-gray-700 text-white px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Conta'}
        </button>
        <p className="text-gray-400 text-sm text-center">
          Já tem conta? <Link to="/login" className="text-purple-400">Entrar</Link>
        </p>
      </form>
    </div>
  )
}
