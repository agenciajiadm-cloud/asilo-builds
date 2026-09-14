import type { Metadata } from 'next'
import RankView from '@/components/rank/RankView'
import { supabase } from '@/lib/supabase'
import type { ClanRun } from '@/lib/clan-run'

export const metadata: Metadata = { title: 'Rank do clã · ASILO' }
export const dynamic = 'force-dynamic'

export default async function RankPage() {
  const { data } = await supabase.from('clan_runs').select('*').order('created_at', { ascending: false })
  return <RankView initial={(data ?? []) as ClanRun[]} />
}
