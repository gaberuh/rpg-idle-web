export function formatGold(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1).replace('.0', '')}kk`
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(1).replace('.0', '')}k`
  return amount.toString()
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

export const rarityColor: Record<string, string> = {
  common:    'text-gray-300',
  uncommon:  'text-green-400',
  rare:      'text-blue-400',
  epic:      'text-purple-400',
  legendary: 'text-orange-400',
}

export function xpProgress(current: number, toNext: number): number {
  return Math.min(current / toNext, 1)
}
