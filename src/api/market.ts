import { api } from './client'
import type { MarketListing } from '@/types/api'

interface MarketFilters { item_type?: string; rarity?: string; min_price?: number; max_price?: number }
interface CreateListingRequest { item_id?: string; template_id?: string; quantity?: number; price: number }
interface MarketListingsResponse { listings: MarketListing[]; total: number }

export const marketApi = {
  getListings: (filters?: MarketFilters) => api.get<MarketListingsResponse>('/market/listings', { params: filters }).then(r => r.data),
  getMyListings: () => api.get<MarketListingsResponse>('/market/listings/mine').then(r => r.data),
  create: (data: CreateListingRequest) => api.post('/market/listings', data).then(r => r.data),
  buy: (listingId: string) => api.post(`/market/listings/${listingId}/buy`).then(r => r.data),
  cancel: (listingId: string) => api.delete(`/market/listings/${listingId}`).then(r => r.data),
}
