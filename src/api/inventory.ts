import { api } from './client'
import type { LootItem } from '@/types/api'

interface DepositItem {
  id: string
  name: string
  rarity: string
  affixes: Record<string, number>
}

interface DepositResponse { items: DepositItem[] }
interface LootBagResponse { items: LootItem[] }

export const inventoryApi = {
  getDeposit: () => api.get<DepositResponse>('/inventory/deposit').then(r => r.data),
  getLootBag: () => api.get<LootBagResponse>('/inventory/loot-bag').then(r => r.data),
  claimLoot: () => api.post('/inventory/loot-bag/claim').then(r => r.data),
  equip: (itemId: string) => api.post(`/inventory/equip/${itemId}`).then(r => r.data),
  unequip: (slot: string) => api.post(`/inventory/unequip/${slot}`).then(r => r.data),
}
