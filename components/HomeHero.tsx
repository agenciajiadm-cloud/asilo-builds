import Fog from '@/components/Fog'
import Link from 'next/link'
import BaalTilt from '@/components/BaalTilt'
import { SEASON, SEASON_NAME } from '@/lib/site'

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-green-border/40 min-h-[62vh] md:min-h-[78vh] flex items-center">
      <Fog />
      <div className="relative max-w-7xl mx-auto px-5 w-full py-4 md:py-6 grid lg:grid-cols-[0.92fr_1.2fr] gap-6 lg:gap-2 items-center">
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="font-nav text-green-bright tracking-[0.18em] text-sm mb-4 uppercase">
            Diablo IV · Season {SEASON} · {SEASON_NAME}
          </p>
          <h1 className="font-display font-normal text-[clamp(1.7rem,4.2vw,3rem)] text-white leading-[1.15] max-w-xl tracking-[0.03em]">
            Seu farm nunca mais vai ser o mesmo.
            <span className="block mt-2 text-bone/80 font-normal">Venha jogar com nosso clã</span>
          </h1>
          <p className="mt-5 max-w-md text-base md:text-lg leading-7 text-bone/80">
            Item, Pit, Torre, o clã no Discord. A gente monta o arsenal pra você não farmar no escuro.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="/rank" className="btn-d4">
              Rank do clã
            </Link>
            <Link href="/cla" className="btn-d4 btn-d4-ghost">
              Jogar com a gente
            </Link>
          </div>
        </div>
        <BaalTilt />
      </div>
    </section>
  )
}
