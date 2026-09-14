import type { Metadata } from 'next'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { CREATORS } from '@/lib/creators'

export const metadata: Metadata = {
  title: 'Criadores · ASILO',
  description: 'Quem do clã grava Diablo 4. Canal, tutoriais e runs.',
}

export default function CriadoresPage() {
  const saga = CREATORS[0]
  return (
    <div className="px-5 max-w-4xl mx-auto pt-12 pb-28">
      <p className="font-nav text-sm text-green-bright mb-4">O clã na câmera</p>
      <h1 className="font-display text-5xl md:text-7xl text-white mb-6 tracking-[0.04em]">Criadores</h1>
      <p className="max-w-2xl mx-auto lg:mx-0 text-lg leading-8 text-bone/80 mb-16">
        Gente do ASILO que grava o jogo. Começa pelo SagaWine — Pit, farm e build em português.
      </p>

      <article className="border-t border-green-border/40 pt-10">
        <h2 className="font-display text-4xl text-white mb-3">{saga.name}</h2>
        <p className="text-bone/70 mb-6">{saga.role}</p>
        <a href={saga.youtube} target="_blank" rel="noreferrer" className="btn-d4 mb-12">
          Canal no YouTube
        </a>
        <div className="mt-12 grid gap-4">
          {saga.videos.slice(0, 4).map((v) => (
            <YouTubeEmbed key={v.id} id={v.id} title={v.title} />
          ))}
        </div>
      </article>
    </div>
  )
}
