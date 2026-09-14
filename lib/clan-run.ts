import { D4_CLASSES } from '@/lib/d4'

export type RunKind = 'pit' | 'tower'

export type ClanRun = {
  id: string
  kind: RunKind
  player_name: string
  class_id: string
  tier: number
  time_seconds: number | null
  video_url: string
  created_at: string
}

export const PLAYABLE_CLASSES = D4_CLASSES.filter((c) => c.playable)

const VIDEO_HOSTS = new Set([
  'youtube.com',
  'youtu.be',
  'm.youtube.com',
  'twitch.tv',
  'clips.twitch.tv',
  'discord.com',
  'cdn.discordapp.com',
  'media.discordapp.net',
  'vimeo.com',
  'medal.tv',
])

export function className(id: string) {
  return D4_CLASSES.find((c) => c.id === id)?.nome ?? id
}

export function formatTime(seconds: number | null) {
  if (seconds == null || Number.isNaN(seconds)) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function parseTime(raw: string): number | null {
  const t = raw.trim()
  if (!t) return null
  if (/^\d+$/.test(t)) return Number(t)
  const m = t.match(/^(\d+):([0-5]?\d)$/)
  if (!m) return null
  return Number(m[1]) * 60 + Number(m[2])
}

export function validVideo(url: string) {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    return VIDEO_HOSTS.has(host)
  } catch {
    return false
  }
}

export function sortRuns(rows: ClanRun[], kind: RunKind) {
  return rows
    .filter((r) => r.kind === kind)
    .slice()
    .sort((a, b) => {
      if (b.tier !== a.tier) return b.tier - a.tier
      const at = a.time_seconds ?? Number.POSITIVE_INFINITY
      const bt = b.time_seconds ?? Number.POSITIVE_INFINITY
      return at - bt
    })
}
