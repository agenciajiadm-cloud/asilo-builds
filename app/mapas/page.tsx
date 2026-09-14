import type { Metadata } from 'next'
import MapTimers from '@/components/MapTimers'
import Fog from '@/components/Fog'

export const metadata: Metadata = { title: 'Mapas · ASILO' }

const MAXROLL_MAP = 'https://maxroll.gg/d4/map-tool'

export default function MapasPage() {
  return (
    <div className="relative px-5 max-w-5xl mx-auto pt-16 pb-32">
      <Fog />
      <div className="relative">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-6">Quando o mundo muda de cor</h1>
        <p className="text-lg leading-8 text-bone/85 mb-10">
          Helltide, chefes e legião têm hora. O mapa abaixo é o Santuário que a gente usa aqui. O mapa interativo com
          pins ao vivo continua no Maxroll — a gente não copia a ferramenta deles.
        </p>
        <figure className="mb-6 border border-green-border/40 overflow-hidden bg-[#080a08]">
          <img src="/images/mapa.webp" alt="Mapa de Santuário" className="w-full h-auto" />
        </figure>
        <a href={MAXROLL_MAP} target="_blank" rel="noreferrer" className="btn-d4 mb-16">
          Abrir map tool no Maxroll
        </a>
        <MapTimers />
      </div>
    </div>
  )
}
