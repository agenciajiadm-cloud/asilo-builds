import type { Metadata } from 'next'
import MapTimers from '@/components/MapTimers'
import Fog from '@/components/Fog'

export const metadata: Metadata = { title: 'Mapas · ASILO' }

export default function MapasPage() {
  return (
    <div className="relative px-5 max-w-4xl mx-auto pt-16 pb-32">
      <Fog />
      <div className="relative">
        <p className="font-display text-[11px] tracking-[0.35em] text-green-bright mb-5">Mapas</p>
        <h1 className="font-display text-4xl md:text-6xl text-white mb-6">Helltide e o relógio</h1>
        <p className="text-lg leading-8 text-bone/85 mb-12">
          Sem timer, mapa de Helltide é poster. O relógio abaixo é nosso. A zona pintada e o baú mystery não são scrape da
          helltides.com — Cloudflare 403, e o produto é deles.
        </p>
        <MapTimers />
      </div>
    </div>
  )
}
