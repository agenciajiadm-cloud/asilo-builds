import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { TIER_SEED } from '@/data/d4/tier-seed'
import { gateKey, isGated } from '@/lib/gate'
import type { TierBuild } from '@/lib/tier'

async function loadRows(): Promise<TierBuild[]> {
  const { data, error } = await supabase.from('tier_builds').select('*').order('sort', { ascending: true })
  if (!error && data && data.length > 0) return data as TierBuild[]
  if (!data || data.length === 0) {
    await supabase.rpc('save_tier_builds', { payload: TIER_SEED, gate: gateKey() })
  }
  return TIER_SEED
}

export async function GET() {
  const rows = await loadRows()
  return NextResponse.json({ rows })
}

export async function PUT(req: Request) {
  if (!(await isGated())) return NextResponse.json({ ok: false }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const rows = (body.rows || []) as TierBuild[]
  const { error } = await supabase.rpc('save_tier_builds', { payload: rows, gate: gateKey() })
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, rows })
}
