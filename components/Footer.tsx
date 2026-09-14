'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Swords } from 'lucide-react'
import { DISCORD_INVITE, WHATSAPP } from '@/lib/site'

export default function Footer() {
  const path = usePathname()
  if (path === '/planner') return null

  return (
    <footer className="mt-auto border-t border-[rgba(58,138,24,0.28)] bg-[#070907]">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-3xl tracking-[0.12em] text-white">ASILO</p>
          <p className="mt-4 text-sm leading-7 text-bone/65 max-w-xs">
            Lar Recreativo de Idosos. Santuário, classes, mapas e o que o clã está jogando nesta season.
          </p>
        </div>
        <div>
          <p className="font-nav text-sm tracking-[0.08em] text-green-bright mb-4">Casa</p>
          <nav className="flex flex-col gap-3 text-bone/80">
            <Link href="/lore" className="footer-link">Lore</Link>
            <Link href="/classes" className="footer-link">Classes</Link>
            <Link href="/mapas" className="footer-link">Mapas</Link>
            <Link href="/rank" className="footer-link">Rank do clã</Link>
            <Link href="/criadores" className="footer-link">Criadores</Link>
            <Link href="/notas" className="footer-link">Patch notes</Link>
          </nav>
        </div>
        <div>
          <p className="font-nav text-sm tracking-[0.08em] text-green-bright mb-4">Jogar</p>
          <nav className="flex flex-col gap-3 text-bone/80">
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="footer-link">
              Discord
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="footer-link">
              WhatsApp
            </a>
            <Link href="/cla" className="footer-link">Recrutamento</Link>
            <Link href="/gate" aria-label="Painel" className="opacity-30 hover:opacity-100 w-fit">
              <Swords size={16} />
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-green-border/20 px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p className="text-[11px] text-green-muted text-center sm:text-left">
          Não afiliado à Blizzard. Diablo IV é da Activision Blizzard.
        </p>
        <img src="/images/d4-mark.png" alt="" width={48} height={43} className="opacity-80" />
      </div>
    </footer>
  )
}
