export type Vocation = 'knight' | 'paladin' | 'sorcerer' | 'druid'
export type CharacterStatus = 'idle' | 'hunting' | 'training' | 'pending_claim'
export type SkillType = 'sword' | 'axe' | 'club' | 'distance' | 'shielding' | 'magic_level'
export type EquipmentSlot = 'helmet' | 'armor' | 'legs' | 'boots' | 'weapon' | 'shield' | 'ring' | 'necklace'
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export interface SkillData {
  level: number
  xp_current: number
  xp_to_next: number
}

export interface EquippedItem {
  id: string
  name: string
  rarity: Rarity
  base_stats: Record<string, number>
  affixes: Record<string, number>
}

export interface CharacterResponse {
  id: string
  name: string
  vocation: Vocation
  level: number
  xp_current: number
  xp_to_next: number
  gold: number
  hp_max: number
  mana_max: number
  status: CharacterStatus
  skills: Record<SkillType, SkillData>
  equipment: Record<EquipmentSlot, EquippedItem | null>
  blessings: number
}

export interface CurrentHuntResponse {
  session_id: string
  hunt_name: string
  status: 'running'
  started_at: string
  estimated_end_at: string
  elapsed_minutes: number
  configured_duration_minutes: number
  xp_gained_so_far: number
  gold_gained_so_far: number
}

export interface TrainingStatusResponse {
  skill_type: SkillType | null
  status: 'idle' | 'training'
  tank_minutes: number
  last_updated_at: string
}

export interface LootItem {
  template_id: string
  name: string
  quantity: number
  rarity: Rarity
  item_ids?: string[]
}

export interface HuntSessionResult {
  session_id: string
  hunt_name: string
  ended_by: 'completed' | 'player_stopped' | 'death'
  xp_gained: number
  gold_gained: number
  death_count: number
  loot: LootItem[]
}

export interface MarketListing {
  id: string
  seller_name: string
  item_name: string
  rarity: Rarity
  quantity: number
  price: number
  created_at: string
  affixes?: Record<string, number>
}

export interface LeaderboardEntry {
  rank: number
  character_name: string
  vocation: Vocation
  value: number
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[]
  my_rank?: number
  my_value?: number
}

export interface ApiError {
  error: {
    code: string
    message: string
  }
}
