'use client'

import { useState, type FormEvent } from 'react'

const PRESETS = [1, 10, 25, 100]

export default function DonateBox() {
  const [amount, setAmount] = useState('10')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function go(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr(null)
    const reais = Number(amount.replace(',', '.'))
    const res = await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: reais }),
    })
    const json = await res.json()
    setBusy(false)
    if (!json.url) {
      setErr(json.error || 'Stripe ainda não está ligado neste ambiente.')
      return
    }
    window.location.href = json.url
  }

  return (
    <section id="doar" className="border-t border-green-border/40">
      <div className="max-w-7xl mx-auto px-5 py-12 md:py-16">
        <p className="font-nav text-sm text-[#c88a1a] mb-2">Apoio</p>
        <h2 className="font-display text-2xl md:text-3xl text-white mb-3">Doar pro projeto</h2>
        <p className="max-w-xl text-sm leading-7 text-bone/70 mb-6">
          Qualquer valor — R$ 1 ou R$ 100. Vai pra melhorar o site, pagar ferramenta e manter o ASILO no ar. Não é clã fee.
        </p>
        <form onSubmit={go} className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-[11px] text-green-muted mb-1">Valor (R$)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              className="w-28 bg-transparent border border-green-border px-3 py-2 text-white"
            />
          </div>
          {PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setAmount(String(n))}
              className="px-3 py-2 border border-green-border/50 text-sm text-bone/80 hover:text-white"
            >
              {n}
            </button>
          ))}
          <button disabled={busy} className="btn-d4 min-h-11 text-[11px] disabled:opacity-50">
            {busy ? 'Abrindo…' : 'Doar no Stripe'}
          </button>
        </form>
        {err && <p className="mt-3 text-sm text-[#c88a1a]">{err}</p>}
      </div>
    </section>
  )
}
