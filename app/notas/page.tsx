import type { Metadata } from 'next'
import { PATCH_NOTES } from '@/lib/site'

export const metadata: Metadata = { title: 'Notas de patch · ASILO' }

export default function NotasPage() {
  return (
    <div className="px-5 max-w-2xl mx-auto pt-16 pb-32">
      <h1 className="font-display text-4xl md:text-5xl text-white mb-6">Patch notes</h1>
      <p className="leading-8 text-bone/85 mb-10">
        Não copiamos o texto da Blizzard. É copyright deles e muda toda week. O ASILO aponta pro original e guarda o recorte do clã (o que muda Pit, planner, season).
      </p>
      <ul className="space-y-8">
        {PATCH_NOTES.map((p) => (
          <li key={p.href} className="border-t border-green-border/40 pt-6">
            <a href={p.href} target="_blank" rel="noreferrer" className="font-display text-xl text-green-bright">
              {p.title}
            </a>
            <p className="mt-3 text-bone/80 leading-7">{p.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
