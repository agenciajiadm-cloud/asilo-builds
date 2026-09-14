'use client'

import { useEffect, useState } from 'react'
import { nextWindow } from '@/lib/d4'
import { DISCORD_INVITE } from '@/lib/site'

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':')
}

function Card({
  title,
  kind,
}: {
  title: string
  kind: 'helltide' | 'worldBoss' | 'legion'
}) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const w = nextWindow(kind, now)
  return (
    <div className="border border-green-border/50 p-6 md:p-8 relative overflow-hidden">
      <p className="font-display text-[11px] tracking-[0.28em] uppercase text-green-muted mb-3">{title}</p>
      <p className={`font-display text-3xl md:text-4xl ${w.active ? 'text-orange-primary' : 'text-white'}`}>
        {w.active ? 'Ativo' : 'Em breve'}
      </p>
      <p className="mt-4 font-mono text-2xl text-bone tracking-widest">{fmt(w.remaining)}</p>
      <p className="mt-2 text-sm text-green-muted">{w.active ? 'até acabar' : 'até o próximo spawn'}</p>
    </div>
  )
}

export default function MapTimers() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Helltide" kind="helltide" />
        <Card title="World Boss" kind="worldBoss" />
        <Card title="Legion" kind="legion" />
      </div>
      <p className="text-sm leading-7 text-bone/70">
        Relógio interno do site (ciclo comunitário, não Cloudflare). Se o patch da season mudar o intervalo, o Discord
        continua certo:{' '}
        <a className="text-green-bright underline" href={DISCORD_INVITE} target="_blank" rel="noreferrer">
          #🔥-helltide · #👹-world-boss · #🗡️-legion
        </a>
        . Zona no mapa e baú mystery entram quando o clã calibrar o cron — não quando a gente copiar o helltides.com.
      </p>
    </div>
  )
}
