'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DISCORD_INVITE, WHATSAPP } from '@/lib/site'

export default function Footer() {
  const path = usePathname()
  if (path === '/planner') return null

  return (
    <footer className="mt-auto border-t border-green-border/40 px-5 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-display text-white">ASILO</p>
          <p className="mt-2 text-sm text-green-muted max-w-sm">
            Um canto de Santuário: história, classes, mapas e builds. Lar Recreativo de Idosos.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-green-muted">
          <Link href="/notas">Patch notes</Link>
          <Link href="/lore">Lore</Link>
          <Link href="/mapas">Mapas</Link>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
            Discord
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </nav>
      </div>
    </footer>
  )
}
