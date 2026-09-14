'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { PLAYABLE_CLASSES, className, formatTime, sortRuns, type ClanRun, type RunKind } from '@/lib/clan-run'

export default function RankView({ initial }: { initial: ClanRun[] }) {
  const [rows, setRows] = useState(initial)
  const [kind, setKind] = useState<RunKind>('pit')
  const [player_name, setPlayer] = useState('')
  const [class_id, setClass] = useState(PLAYABLE_CLASSES[0].id)
  const [tier, setTier] = useState('')
  const [time, setTime] = useState('')
  const [video_url, setVideo] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const pit = useMemo(() => sortRuns(rows, 'pit'), [rows])
  const tower = useMemo(() => sortRuns(rows, 'tower'), [rows])

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const res = await fetch('/api/clan-run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, player_name, class_id, tier: Number(tier), time, video_url }),
    })
    const json = await res.json()
    setBusy(false)
    if (!json.ok) {
      setMsg(json.error || 'Não entrou.')
      return
    }
    setRows((prev) => [json.row as ClanRun, ...prev])
    setTier('')
    setTime('')
    setVideo('')
    setMsg('Entrou. Está no mural.')
  }

  return (
    <div className="px-5 max-w-7xl mx-auto pt-10 pb-28">
      <p className="font-display text-[#c88a1a] tracking-[0.2em] text-sm mb-4">CLÃ · SEASON 15</p>
      <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.95] mb-6">Rank do clã</h1>
      <p className="max-w-2xl mx-auto lg:mx-0 text-lg leading-8 text-bone/80 mb-14">
        Pit e Torre separados. Preenche o formulário com vídeo da run — entra na hora. Depois a gente aperta o filtro se precisar.
      </p>

      <div className="grid lg:grid-cols-2 gap-10 mb-20">
        <Board title="Pit" rows={pit} showTime={false} />
        <Board title="Torre" rows={tower} showTime />
      </div>

      <form onSubmit={submit} className="max-w-xl mx-auto lg:mx-0 border border-green-border/50 p-8">
        <h2 className="font-display text-3xl text-white mb-6">Mandar run</h2>
        <div className="flex gap-2 mb-6">
          {(['pit', 'tower'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`px-5 py-2 font-display tracking-[0.1em] text-sm ${
                kind === k ? 'bg-green-primary text-white' : 'border border-green-border text-bone'
              }`}
            >
              {k === 'pit' ? 'Pit' : 'Torre'}
            </button>
          ))}
        </div>
        <label className="block text-xs text-green-muted mb-2">Nick no jogo</label>
        <input
          value={player_name}
          onChange={(e) => setPlayer(e.target.value)}
          className="w-full mb-4 bg-transparent border border-green-border px-3 py-3 text-white"
          required
        />
        <label className="block text-xs text-green-muted mb-2">Classe</label>
        <select
          value={class_id}
          onChange={(e) => setClass(e.target.value)}
          className="w-full mb-4 bg-[#050605] border border-green-border px-3 py-3 text-white"
        >
          {PLAYABLE_CLASSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        <label className="block text-xs text-green-muted mb-2">Andar</label>
        <input
          type="number"
          min={1}
          max={250}
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="w-full mb-4 bg-transparent border border-green-border px-3 py-3 text-white"
          required
        />
        {kind === 'tower' && (
          <>
            <label className="block text-xs text-green-muted mb-2">Tempo (mm:ss)</label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="4:12"
              className="w-full mb-4 bg-transparent border border-green-border px-3 py-3 text-white"
              required
            />
          </>
        )}
        <label className="block text-xs text-green-muted mb-2">Vídeo</label>
        <input
          value={video_url}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="https://youtu.be/…"
          className="w-full mb-6 bg-transparent border border-green-border px-3 py-3 text-white"
          required
        />
        <button disabled={busy} className="px-8 py-3 bg-green-primary text-white font-display tracking-[0.12em] text-sm disabled:opacity-50">
          {busy ? 'Enviando…' : 'Entrar no mural'}
        </button>
        {msg && <p className="mt-4 text-sm text-bone/80">{msg}</p>}
      </form>
    </div>
  )
}

function Board({ title, rows, showTime }: { title: string; rows: ClanRun[]; showTime: boolean }) {
  return (
    <section>
      <h2 className="font-display text-3xl md:text-4xl text-white mb-6">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-bone/60 border-y border-green-border/30 py-8">Ainda vazio. Primeira run abre a lista.</p>
      ) : (
        <ol className="border-y border-green-border/40 divide-y divide-green-border/30">
          {rows.map((r, i) => (
            <li key={r.id} className="flex items-baseline justify-between gap-4 py-4">
              <span className="min-w-0">
                <span className="text-green-muted mr-3">#{i + 1}</span>
                <span className="text-white">{r.player_name}</span>
                <span className="text-bone/50 ml-3 text-sm">{className(r.class_id)}</span>
              </span>
              <span className="shrink-0 font-mono text-[#c88a1a]">
                {r.tier}
                {showTime ? ` · ${formatTime(r.time_seconds)}` : ''}
                {' · '}
                <a href={r.video_url} target="_blank" rel="noreferrer" className="text-green-bright">
                  vídeo
                </a>
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
