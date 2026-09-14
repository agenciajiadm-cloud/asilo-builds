export const TIER_ORDER = ['S', 'A', 'B', 'C'] as const
export type TierLetter = (typeof TIER_ORDER)[number]
export type ListKind = 'endgame' | 'leveling'

export type TierBuild = {
  id: string
  list_kind: ListKind
  tier: TierLetter
  sort: number
  name: string
  class_id: string
  skill_slug: string
  skill_icon: string
  href: string
}

export const TIER_TONE: Record<TierLetter, string> = {
  S: 'text-[#c88a1a] border-[#c88a1a]/50',
  A: 'text-[#5ab82a] border-[#5ab82a]/40',
  B: 'text-[#c8d4b8] border-[#c8d4b8]/25',
  C: 'text-[#8a2a18] border-[#8a2a18]/50',
}
