import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { characterApi } from '@/api/character'
import { useAuthStore } from '@/store/authStore'
import type { Vocation } from '@/types/api'

const VOCATIONS: { value: Vocation; label: string; description: string }[] = [
  { value: 'knight', label: 'Knight', description: 'Tanque corpo a corpo. Alta defesa e HP.' },
  { value: 'paladin', label: 'Paladin', description: 'Combate à distância com magia de suporte.' },
  { value: 'sorcerer', label: 'Sorcerer', description: 'Mago ofensivo. Maior dano mágico.' },
  { value: 'druid', label: 'Druid', description: 'Mago de natureza. Suporte e dano elemental.' },
]

export function CreateCharacterPage() {
  const [name, setName] = useState('')
  const [vocation, setVocation] = useState<Vocation>('knight')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { setTokens, accessToken, playerId } = useAuthStore()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const character = await characterApi.create({ name, vocation })
      if (accessToken && playerId) {
        setTokens(accessToken, playerId, character.id)
      }
      navigate({ to: '/dashboard' })
    } catch {
      setError('Nome inválido ou já em uso.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-white">Criar Personagem</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div>
          <label className="text-gray-300 text-sm block mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            minLength={3}
            maxLength={20}
            placeholder="Ex: Sir Lancelot"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="text-gray-300 text-sm block mb-2">Vocação</label>
          <div className="grid grid-cols-2 gap-2">
            {VOCATIONS.map(v => (
              <button
                key={v.value}
                type="button"
                onClick={() => setVocation(v.value)}
                className={`p-3 rounded text-left border-2 transition-colors ${
                  vocation === v.value
                    ? 'border-purple-500 bg-purple-900/30'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="text-white font-semibold">{v.label}</div>
                <div className="text-gray-400 text-xs mt-1">{v.description}</div>
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar Personagem'}
        </button>
      </form>
    </div>
  )
}
