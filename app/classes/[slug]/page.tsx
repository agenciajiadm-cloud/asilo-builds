import type { Metadata } from 'next'
import Link from 'next/link'
import { CLASS_ALIAS, CLASS_GUIDES, CLASS_SLUGS } from '@/lib/content/classGuides'
import { D4_CLASSES } from '@/lib/d4'
import { CLASS_PORTRAIT, GUIDE_TO_CLASS } from '@/lib/portraits'
import catalog from '@/data/d4/skills-catalog.json'
import SkillIcon from '@/components/tier/SkillIcon'
import Fog from '@/components/Fog'

type Skill = { name: string; icon: string }

const CATALOG = catalog as Record<string, Skill[]>

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
  const key = CLASS_ALIAS[slug] ?? slug
  const page = CLASS_GUIDES[key]
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

  const classId = GUIDE_TO_CLASS[key]
  const cls = D4_CLASSES.find((c) => c.id === classId)
  const photo = classId ? CLASS_PORTRAIT[classId] : undefined
  const skills = (classId && CATALOG[classId] ? CATALOG[classId] : []).slice(0, 16)

  return (
    <div className="relative px-5 max-w-4xl mx-auto pt-8 pb-24">
      <Fog />
      <div className="relative">
        <Link href="/classes" className="text-[11px] tracking-[0.25em] uppercase text-green-muted font-display">
          Classes
        </Link>
        <div className="mt-6 grid md:grid-cols-[minmax(0,1fr)_240px] gap-10 items-start">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">{page.nome}</h1>
            <p className="text-lg leading-8 text-bone/85 mb-10">{page.lead}</p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden border border-green-border/40 bg-[#080a08]">
            {photo ? (
              <img src={photo} alt={page.nome} className="w-full h-full object-cover object-top" />
            ) : (
              <img src={cls?.icon} alt="" className="w-24 h-24 m-auto mt-16 opacity-70" />
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl text-white mb-5">Skills</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
              {skills.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <SkillIcon src={s.icon} classSrc={cls?.icon} name={s.name} size={40} />
                  <span className="text-sm text-bone/85 leading-snug">{s.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-green-muted">{page.skillsNote}</p>
          </section>
        )}

        {page.eras.map((e) => (
          <section key={e.jogo} className="mb-12">
            <h2 className="font-display text-xl text-green-bright mb-3">{e.jogo}</h2>
            <p className="leading-8 text-bone/90">{e.texto}</p>
          </section>
        ))}
        {skills.length === 0 && (
          <p className="text-sm leading-7 text-green-muted border-t border-green-border/40 pt-8">{page.skillsNote}</p>
        )}
      </div>
    </div>
  )
}
