import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inventoryApi } from '@/api/inventory'
import { queryKeys } from '@/types/queryKeys'

export function useDeposit() {
  return useQuery({
    queryKey: queryKeys.deposit,
    queryFn: inventoryApi.getDeposit,
  })
}

export function useLootBag() {
  return useQuery({
    queryKey: queryKeys.lootBag,
    queryFn: inventoryApi.getLootBag,
  })
}

export function useClaimLoot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: inventoryApi.claimLoot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.character })
      queryClient.invalidateQueries({ queryKey: queryKeys.deposit })
      queryClient.invalidateQueries({ queryKey: queryKeys.lootBag })
      queryClient.invalidateQueries({ queryKey: queryKeys.currentHunt })
    },
  })
}
