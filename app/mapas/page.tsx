import type { Metadata } from 'next'
import MapTimers from '@/components/MapTimers'
import Fog from '@/components/Fog'

export const metadata: Metadata = { title: 'Mapas · ASILO' }

export default function MapasPage() {
  return (
    <div className="relative px-5 max-w-4xl mx-auto pt-16 pb-32">
      <Fog />
      <div className="relative">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-6">Quando o mundo muda de cor</h1>
        <p className="text-lg leading-8 text-bone/85 mb-12">
          Helltide, chefes e legião têm hora. O relógio abaixo é um guia; o aviso na hora continua no Discord, pra ninguém
          perder o mapa aberto.
        </p>
        <MapTimers />
      </div>
    </div>
  )
}
