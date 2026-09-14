import type { Metadata } from 'next'
import Link from 'next/link'
import { CLASS_ALIAS, CLASS_GUIDES, CLASS_SLUGS } from '@/lib/content/classGuides'
import Fog from '@/components/Fog'

export function generateStaticParams() {
  const extra = ['barbarian', 'amazon', 'necromancer', 'sorcerer', 'rogue', 'druid', 'paladin']
  return [...CLASS_SLUGS, ...extra].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const key = CLASS_ALIAS[slug] ?? slug
  const p = CLASS_GUIDES[key]
  return { title: p ? `${p.nome} · ASILO` : 'Classe' }
}

export default async function ClassGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = CLASS_GUIDES[CLASS_ALIAS[slug] ?? slug]
  if (!page) {
    return (
      <div className="px-5 max-w-2xl mx-auto pt-24 pb-32">
        <h1 className="font-display text-4xl text-white mb-4">Classe desconhecida</h1>
        <Link href="/classes" className="text-green-bright font-display tracking-[0.15em] uppercase text-[11px]">
          Voltar às classes
        </Link>
      </div>
    )
  }

  return (
    <div className="relative px-5 max-w-2xl mx-auto pt-16 pb-32">
      <Fog />
      <div className="relative">
        <Link href="/classes" className="text-[11px] tracking-[0.25em] uppercase text-green-muted font-display">
          Classes
        </Link>
        <h1 className="font-display text-5xl md:text-6xl text-white mt-4 mb-6">{page.nome}</h1>
        <p className="text-lg leading-8 text-bone/85 mb-10">{page.lead}</p>
        <div className="h-44 mb-12 border border-green-border/40 bg-[radial-gradient(ellipse_at_top,rgba(58,138,24,0.14),transparent_65%)]" />
        {page.eras.map((e) => (
          <section key={e.jogo} className="mb-12">
            <h2 className="font-display text-xl text-green-bright mb-3">{e.jogo}</h2>
            <p className="leading-8 text-bone/90">{e.texto}</p>
          </section>
        ))}
        <p className="text-sm leading-7 text-green-muted border-t border-green-border/40 pt-8">{page.skillsNote}</p>
        <p className="mt-6">
          <Link href="/planner" className="text-[11px] tracking-[0.2em] uppercase font-display text-green-bright">
            Abrir planner desta classe
          </Link>
        </p>
      </div>
    </div>
  )
}
