import timers from '@/data/d4/timers.json'
import type { SkillTree } from '@/lib/d4-tree'

export const D4_CLASSES = [
  { id: 'spiritborn', nome: 'Spiritborn', icon: '/icons/classes/spiritborn.png', playable: true },
  { id: 'barbarian', nome: 'Bárbaro', icon: '/icons/classes/barbarian.png', playable: true },
  { id: 'necromancer', nome: 'Necromante', icon: '/icons/classes/necromancer.png', playable: true },
  { id: 'sorcerer', nome: 'Feiticeira', icon: '/icons/classes/sorcerer.png', playable: true },
  { id: 'rogue', nome: 'Ladina', icon: '/icons/classes/rogue.png', playable: true },
  { id: 'druid', nome: 'Druida', icon: '/icons/classes/druid.png', playable: true },
  { id: 'paladin', nome: 'Paladino', icon: '/icons/classes/paladin.png', playable: true },
  { id: 'warlock', nome: 'Warlock', icon: '/icons/classes/warlock.png', playable: true },
  { id: 'amazon', nome: 'Amazona', icon: '/icons/classes/amazon.png', playable: false },
] as const

export type ClassId = (typeof D4_CLASSES)[number]['id']

const TREE_LOADERS: Record<string, () => Promise<{ default: SkillTree }>> = {
  barbarian: () => import('@/data/d4/trees/barbarian.json') as unknown as Promise<{ default: SkillTree }>,
  druid: () => import('@/data/d4/trees/druid.json') as unknown as Promise<{ default: SkillTree }>,
  necromancer: () => import('@/data/d4/trees/necromancer.json') as unknown as Promise<{ default: SkillTree }>,
  rogue: () => import('@/data/d4/trees/rogue.json') as unknown as Promise<{ default: SkillTree }>,
  sorcerer: () => import('@/data/d4/trees/sorcerer.json') as unknown as Promise<{ default: SkillTree }>,
  spiritborn: () => import('@/data/d4/trees/spiritborn.json') as unknown as Promise<{ default: SkillTree }>,
  paladin: () => import('@/data/d4/trees/paladin.json') as unknown as Promise<{ default: SkillTree }>,
  warlock: () => import('@/data/d4/trees/warlock.json') as unknown as Promise<{ default: SkillTree }>,
}

export async function loadSkillTree(id: string): Promise<SkillTree | null> {
  const load = TREE_LOADERS[id]
  if (!load) return null
  const mod = await load()
  return mod.default
}

export { timers }

export function nextWindow(kind: 'helltide' | 'worldBoss' | 'legion', now = Date.now()) {
  const cfg = timers[kind] as { epochUtc: string; cycleMs: number; activeMs: number }
  const epoch = Date.parse(cfg.epochUtc)
  const elapsed = now - epoch
  const cycle = cfg.cycleMs
  const into = ((elapsed % cycle) + cycle) % cycle
  const active = into < cfg.activeMs
  const remaining = active ? cfg.activeMs - into : cycle - into
  const startedAt = now - into
  const endsAt = active ? startedAt + cfg.activeMs : startedAt + cycle
  return { active, remaining, endsAt, nextStart: active ? startedAt + cycle : now + remaining }
}

export function parseBuildUrl(raw: string) {
  const url = raw.trim()
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
  } catch {
    return null
  }
  const host = parsed.hostname.replace(/^www\./, '')
  const path = parsed.pathname.toLowerCase()
  const hay = `${host}${path}${parsed.search}`.toLowerCase()

  const aliases: [string, (typeof D4_CLASSES)[number]['id']][] = [
    ['spiritborn', 'spiritborn'],
    ['necromancer', 'necromancer'],
    ['necromante', 'necromancer'],
    ['barbarian', 'barbarian'],
    ['barbaro', 'barbarian'],
    ['sorcerer', 'sorcerer'],
    ['sorceress', 'sorcerer'],
    ['feiticeira', 'sorcerer'],
    ['paladin', 'paladin'],
    ['paladino', 'paladin'],
    ['warlock', 'warlock'],
    ['amazon', 'amazon'],
    ['amazona', 'amazon'],
    ['druid', 'druid'],
    ['druida', 'druid'],
    ['rogue', 'rogue'],
    ['ladina', 'rogue'],
    ['ladino', 'rogue'],
  ]
  const classHit = aliases.find(([needle]) => hay.includes(needle))

  let source: string | null = null
  if (host.includes('d4builds')) source = 'd4builds'
  else if (host.includes('mobalytics')) source = 'mobalytics'
  else if (host.includes('maxroll')) source = 'maxroll'
  else if (host.includes('d4planner') || host.includes('d4.tools') || host.includes('infinity')) source = 'planner'
  else if (host.includes('youtube') || host.includes('youtu.be')) source = 'youtube'
  else source = host

  return { href: parsed.toString(), source, classId: classHit?.[1] ?? null }
}
