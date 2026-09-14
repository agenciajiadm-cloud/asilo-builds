import Fog from '@/components/Fog'
import Link from 'next/link'
import { SEASON, SEASON_NAME } from '@/lib/site'

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-green-border/40 min-h-[70vh] md:min-h-[78vh] flex items-end">
      <Fog />
      <div className="relative max-w-7xl mx-auto px-5 w-full pt-16 pb-16 md:pt-24 md:pb-24">
        <p className="font-display text-green-bright tracking-[0.28em] text-sm md:text-base mb-6">
          DIABLO IV · SEASON {SEASON} · {SEASON_NAME.toUpperCase()}
        </p>
        <h1 className="font-display font-black text-[clamp(2.8rem,9vw,6.4rem)] text-white leading-[0.92] max-w-5xl tracking-[0.02em]">
          SANTUÁRIO
          <span className="block text-bone/90">AINDA ESTÁ AQUI.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg md:text-xl leading-8 text-bone/85">
          O ASILO é a casa. O jogo é o convite. Rank do clã, builds da season, a história que a Blizzard já contou.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/rank" className="px-8 py-4 bg-green-primary text-white font-display tracking-[0.12em] text-sm">
            Rank do clã
          </Link>
          <Link href="/lore" className="px-8 py-4 border border-green-primary/50 text-green-bright font-display tracking-[0.12em] text-sm">
            História
          </Link>
        </div>
      </div>
    </section>
  )
}
