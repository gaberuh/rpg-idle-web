import { useEffect } from 'react'
import { useCharacter } from '@/hooks/useCharacter'
import { useCurrentHunt } from '@/hooks/useCurrentHunt'
import { useTrainingStatus } from '@/hooks/useTrainingStatus'
import { formatGold, formatDuration, xpProgress } from '@/utils/format'
import { registerPushToken } from '@/utils/notifications'

export function DashboardPage() {
  const { data: character, isLoading } = useCharacter()
  const { data: hunt } = useCurrentHunt()
  const { data: training } = useTrainingStatus()

  useEffect(() => {
    registerPushToken().catch(() => {})
  }, [])

  if (isLoading || !character) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Carregando...</div>
  }

  const xp = xpProgress(character.xp_current, character.xp_to_next)

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-white">{character.name}</h2>
            <p className="text-gray-400 capitalize">{character.vocation} — Nível {character.level}</p>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 font-semibold">{formatGold(character.gold)} gold</p>
            <p className="text-gray-400 text-sm capitalize">{character.status}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>XP</span>
            <span>{character.xp_current.toLocaleString()} / {character.xp_to_next.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-700 rounded h-2">
            <div
              className="bg-purple-500 h-2 rounded transition-all"
              style={{ width: `${xp * 100}%` }}
            />
          </div>
        </div>
      </div>

      {hunt && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">Hunt em andamento</h3>
          <p className="text-gray-300">{hunt.hunt_name}</p>
          <p className="text-gray-400 text-sm">
            {formatDuration(hunt.elapsed_minutes)} / {formatDuration(hunt.configured_duration_minutes)}
          </p>
          <div className="mt-2 text-sm text-gray-400">
            <span className="text-green-400">+{formatGold(hunt.gold_gained_so_far)} gold</span>
            {' · '}
            <span className="text-blue-400">+{hunt.xp_gained_so_far.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      {training && training.status === 'training' && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">Treinando</h3>
          <p className="text-gray-300 capitalize">{training.skill_type}</p>
          <p className="text-gray-400 text-sm">Tanque: {formatDuration(training.tank_minutes)}</p>
        </div>
      )}
    </div>
  )
}
