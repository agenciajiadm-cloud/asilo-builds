'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DISCORD_INVITE } from '@/lib/site'
import Fog from '@/components/Fog'

export default function RecruitmentPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ battletag: '', discord: '', classe: 'spiritborn', pit: '', why: '' })

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-5 pt-24 pb-32">
        <h1 className="font-display text-4xl text-white mb-4">Candidatura anotada</h1>
        <p className="leading-8 text-bone/80 mb-8">
          O filtro de verdade é o Discord: regras, ticket, entrevista. Este form não substitui o servidor.
        </p>
        <Link href="/cla" className="text-green-bright font-display tracking-[0.16em] uppercase text-[11px]">
          Ir ao clã
        </Link>
      </div>
    )
  }

  return (
    <div className="relative px-5 max-w-xl mx-auto pt-16 pb-32">
      <Fog />
      <div className="relative">
        <p className="font-display text-[11px] tracking-[0.3em] text-green-bright mb-4">Recrutamento</p>
        <h1 className="font-display text-4xl md:text-5xl text-white mb-6">Quer entrar. Prove no servidor.</h1>
        <p className="leading-8 text-bone/85 mb-8">
          Pit alto ajuda. Não é o único critério. Abre o Discord eterno, lê as regras, abre ticket. O formulário abaixo é
          recorte — officers olham o perfil lá.
        </p>
        <a href={DISCORD_INVITE} className="inline-block mb-12 text-[11px] tracking-[0.2em] uppercase font-display text-green-bright">
          {DISCORD_INVITE.replace('https://', '')}
        </a>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          {(
            [
              ['battletag', 'Battletag'],
              ['discord', 'Discord'],
              ['pit', 'Pit mais alto (vídeo)'],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className="block">
              <span className="text-[10px] tracking-[0.18em] uppercase text-green-muted">{label}</span>
              <input
                required
                className="mt-1 w-full bg-transparent border border-green-border/50 px-3 py-2 text-bone"
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            </label>
          ))}
          <label className="block">
            <span className="text-[10px] tracking-[0.18em] uppercase text-green-muted">Por que ASILO</span>
            <textarea
              required
              rows={4}
              className="mt-1 w-full bg-transparent border border-green-border/50 px-3 py-2 text-bone"
              value={form.why}
              onChange={(e) => setForm({ ...form, why: e.target.value })}
            />
          </label>
          <button className="px-8 py-3 bg-green-primary text-white font-display text-[11px] tracking-[0.2em] uppercase">
            Enviar recorte
          </button>
        </form>
      </div>
    </div>
  )
}
