import Fog from '@/components/Fog'
import Link from 'next/link'
import { SEASON, SEASON_NAME } from '@/lib/site'

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-green-border/40 min-h-[68vh] md:min-h-[76vh] flex items-center">
      <Fog />
      <div className="relative max-w-7xl mx-auto px-5 w-full py-16 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="font-nav text-green-bright tracking-[0.18em] text-sm mb-5 uppercase">
            Diablo IV · Season {SEASON} · {SEASON_NAME}
          </p>
          <h1 className="font-display font-normal text-[clamp(1.7rem,4.2vw,3rem)] text-white leading-[1.15] max-w-xl tracking-[0.03em]">
            Seu grind nunca mais vai ser o mesmo.
            <span className="block mt-2 text-bone/80 font-normal">Joga.</span>
          </h1>
          <p className="mt-6 max-w-md text-base md:text-lg leading-7 text-bone/80">
            Item, Pit, Torre, o clã no Discord. A gente monta o arsenal pra você não farmar no escuro.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/rank" className="btn-d4">
              Rank do clã
            </Link>
            <Link href="/cla" className="btn-d4 btn-d4-ghost">
              Jogar com a gente
            </Link>
          </div>
        </div>
        <div className="relative min-h-[320px] md:min-h-[520px]">
          <img
            src="/images/baal.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-contain object-right mix-blend-lighten opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050605] via-transparent to-transparent md:via-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
