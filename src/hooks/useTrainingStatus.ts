import { useQuery } from '@tanstack/react-query'
import { trainingApi } from '@/api/training'
import { queryKeys } from '@/types/queryKeys'

export function useTrainingStatus() {
  return useQuery({
    queryKey: queryKeys.trainingStatus,
    queryFn: trainingApi.getStatus,
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
  })
}
