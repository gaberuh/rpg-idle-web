import { useQuery } from '@tanstack/react-query'
import { characterApi } from '@/api/character'
import { queryKeys } from '@/types/queryKeys'

export function useCharacter() {
  return useQuery({
    queryKey: queryKeys.character,
    queryFn: characterApi.getMe,
  })
}
