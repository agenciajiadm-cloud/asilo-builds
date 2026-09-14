import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Classes · ASILO' }

const D4 = [
  { slug: 'spiritborn', nome: 'Spiritborn', jogos: 'D4' },
  { slug: 'barbaro', nome: 'Bárbaro', jogos: 'D1 · D2 · D3 · D4' },
  { slug: 'ladina', nome: 'Ladina / Rogue', jogos: 'D3 · D4' },
  { slug: 'feiticeira', nome: 'Feiticeira', jogos: 'D2 · D3 · D4' },
  { slug: 'druida', nome: 'Druida', jogos: 'D2 · D4' },
  { slug: 'necromante', nome: 'Necromante', jogos: 'D2 · D3 · D4' },
  { slug: 'paladino', nome: 'Paladino', jogos: 'D2 · D4' },
  { slug: 'warlock', nome: 'Warlock', jogos: 'D4' },
  { slug: 'amazona', nome: 'Amazona', jogos: 'D2 · D4 em 2027' },
]

export default function ClassesPage() {
  return (
    <div className="px-5 max-w-4xl mx-auto pt-16 pb-32">
      <p className="text-sm text-green-bright mb-4">Classes</p>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-6">Nove jeitos de atravessar Santuário</h1>
      <p className="max-w-2xl text-lg leading-8 text-bone/85 mb-14">
        Cada classe tem uma história nos jogos. Aqui você lê quem ela é. A build da season — itens, paragon, rotação —
        fica no montador.
      </p>
      <ul className="divide-y divide-green-border/40 border-y border-green-border/40">
        {D4.map((c) => (
          <li key={c.slug}>
            <Link href={`/classes/${c.slug}`} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-6 hover:text-green-bright">
              <span className="font-display text-2xl text-white">{c.nome}</span>
              <span className="text-[12px] tracking-[0.2em] uppercase text-green-muted">{c.jogos}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
