import { useQuery } from '@tanstack/react-query'
import { leaderboardApi, type LeaderboardType } from '@/api/leaderboard'
import { queryKeys } from '@/types/queryKeys'

export function useLeaderboard(type: LeaderboardType) {
  return useQuery({
    queryKey: queryKeys.leaderboard(type),
    queryFn: () => leaderboardApi.get(type),
  })
}

export function useLeaderboardMe(type: LeaderboardType) {
  return useQuery({
    queryKey: queryKeys.leaderboardMe(type),
    queryFn: () => leaderboardApi.getMe(type),
  })
}
