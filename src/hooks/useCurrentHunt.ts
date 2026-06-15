import { useQuery } from '@tanstack/react-query'
import { huntsApi } from '@/api/hunts'
import { queryKeys } from '@/types/queryKeys'

export function useCurrentHunt() {
  return useQuery({
    queryKey: queryKeys.currentHunt,
    queryFn: huntsApi.getCurrent,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    retry: false,
  })
}
