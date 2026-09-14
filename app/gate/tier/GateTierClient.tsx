'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TierEditor from '@/components/tier/TierEditor'
import type { TierBuild } from '@/lib/tier'

export default function GateTierClient() {
  const [rows, setRows] = useState<TierBuild[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/tier')
      .then((r) => r.json())
      .then((d) => setRows(d.rows || []))
      .catch(() => setRows([]))
  }, [])

  const save = async (next: TierBuild[]) => {
    const res = await fetch('/api/tier', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows: next }),
    })
    if (res.status === 401) {
      router.push('/gate')
      return
    }
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setErr(j.error || 'Não salvou')
      return
    }
    setErr(null)
    setRows(next)
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-4xl text-white">Montar tier list</h1>
          <p className="mt-3 text-sm text-bone/70 max-w-xl">
            O que você salva aqui é o quadro da home. Endgame e leveling são listas separadas.
          </p>
        </div>
        <button
          type="button"
          className="text-sm text-green-muted"
          onClick={async () => {
            await fetch('/api/gate/logout', { method: 'POST' })
            router.push('/')
          }}
        >
          Sair
        </button>
      </div>
      {err && <p className="text-sm text-[#c45b4a] mb-4">{err}</p>}
      {rows ? <TierEditor rows={rows} onSave={save} /> : <p className="text-green-muted">Carregando…</p>}
    </div>
  )
}
