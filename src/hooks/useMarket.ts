import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { marketApi } from '@/api/market'
import { queryKeys } from '@/types/queryKeys'

interface MarketFilters { item_type?: string; rarity?: string; min_price?: number; max_price?: number }

export function useMarketListings(filters: MarketFilters = {}) {
  return useQuery({
    queryKey: queryKeys.marketListings(filters),
    queryFn: () => marketApi.getListings(filters),
  })
}

export function useMyListings() {
  return useQuery({
    queryKey: queryKeys.myListings,
    queryFn: marketApi.getMyListings,
  })
}

export function useBuyListing() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (listingId: string) => marketApi.buy(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.character })
      queryClient.invalidateQueries({ queryKey: queryKeys.deposit })
      queryClient.invalidateQueries({ queryKey: ['market'] })
    },
  })
}
