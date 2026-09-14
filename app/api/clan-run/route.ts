import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { PLAYABLE_CLASSES, parseTime, validVideo, type ClanRun, type RunKind } from '@/lib/clan-run'

export async function GET() {
  const { data, error } = await supabase.from('clan_runs').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ rows: [] as ClanRun[] })
  return NextResponse.json({ rows: (data ?? []) as ClanRun[] })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const kind = body.kind as RunKind
  const player_name = String(body.player_name || '').trim().slice(0, 32)
  const class_id = String(body.class_id || '')
  const tier = Number(body.tier)
  const video_url = String(body.video_url || '').trim()
  const time_seconds = kind === 'tower' ? parseTime(String(body.time || '')) : null

  if (kind !== 'pit' && kind !== 'tower') {
    return NextResponse.json({ ok: false, error: 'Escolhe Pit ou Torre.' }, { status: 400 })
  }
  if (player_name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Nick curto demais.' }, { status: 400 })
  }
  if (!PLAYABLE_CLASSES.some((c) => c.id === class_id)) {
    return NextResponse.json({ ok: false, error: 'Classe inválida.' }, { status: 400 })
  }
  if (!Number.isInteger(tier) || tier < 1 || tier > 250) {
    return NextResponse.json({ ok: false, error: 'Andar inválido.' }, { status: 400 })
  }
  if (!validVideo(video_url)) {
    return NextResponse.json({ ok: false, error: 'Manda YouTube, Twitch, Discord ou Medal.' }, { status: 400 })
  }
  if (kind === 'tower' && (time_seconds == null || time_seconds < 1)) {
    return NextResponse.json({ ok: false, error: 'Torre precisa de tempo (mm:ss).' }, { status: 400 })
  }

  const row = {
    kind,
    player_name,
    class_id,
    tier,
    time_seconds,
    video_url,
  }

  const { data, error } = await supabase.from('clan_runs').insert(row).select('*').single()
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const hook = process.env.DISCORD_WEBHOOK_URL
  if (hook) {
    const title = kind === 'pit' ? `Pit ${tier}` : `Torre ${tier} · ${formatHookTime(time_seconds)}`
    await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `Run nova no site · ${player_name}`,
        embeds: [
          {
            title,
            color: 0x3a8a18,
            fields: [
              { name: 'Jogador', value: player_name, inline: true },
              { name: 'Classe', value: class_id, inline: true },
              { name: 'Vídeo', value: video_url },
            ],
          },
        ],
      }),
    }).catch(() => null)
  }

  return NextResponse.json({ ok: true, row: data as ClanRun })
}

function formatHookTime(seconds: number | null) {
  if (seconds == null) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
