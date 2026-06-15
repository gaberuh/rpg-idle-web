interface MarketFilters {
  item_type?: string
  rarity?: string
  min_price?: number
  max_price?: number
}

export const queryKeys = {
  character: ['character', 'me'] as const,
  currentHunt: ['hunts', 'current'] as const,
  huntSession: (id: string) => ['hunts', 'sessions', id] as const,
  huntList: ['hunts', 'list'] as const,
  trainingStatus: ['training', 'status'] as const,
  deposit: ['inventory', 'deposit'] as const,
  lootBag: ['inventory', 'loot-bag'] as const,
  marketListings: (filters: MarketFilters) => ['market', 'listings', filters] as const,
  myListings: ['market', 'my-listings'] as const,
  leaderboard: (type: string) => ['leaderboard', type] as const,
  leaderboardMe: (type: string) => ['leaderboard', type, 'me'] as const,
}
