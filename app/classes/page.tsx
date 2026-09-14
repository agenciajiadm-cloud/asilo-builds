import type { Metadata } from 'next'
import Link from 'next/link'
import { D4_CLASSES } from '@/lib/d4'
import { CLASS_PORTRAIT } from '@/lib/portraits'

export const metadata: Metadata = { title: 'Classes · ASILO' }

const ERA: Record<string, string> = {
  spiritborn: 'D4',
  barbarian: 'D1 · D2 · D3 · D4',
  rogue: 'D3 · D4',
  sorcerer: 'D2 · D3 · D4',
  druid: 'D2 · D4',
  necromancer: 'D2 · D3 · D4',
  paladin: 'D2 · D4',
  warlock: 'D4',
  amazon: 'D2 · D4 em 2027',
}

const SLUG: Record<string, string> = {
  spiritborn: 'spiritborn',
  barbarian: 'barbaro',
  rogue: 'ladina',
  sorcerer: 'feiticeira',
  druid: 'druida',
  necromancer: 'necromante',
  paladin: 'paladino',
  warlock: 'warlock',
  amazon: 'amazona',
}

export default function ClassesPage() {
  return (
    <div className="px-5 max-w-6xl mx-auto pt-8 pb-24">
      <p className="text-sm text-green-bright mb-4">Classes</p>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-6">Nove jeitos de atravessar Santuário</h1>
      <p className="max-w-2xl text-lg leading-8 text-bone/85 mb-8">
        Retrato, skills do kit e a história da classe.
      </p>
      <ul className="divide-y divide-green-border/40 border-y border-green-border/40">
        {D4_CLASSES.map((c) => {
          const photo = CLASS_PORTRAIT[c.id]
          return (
            <li key={c.id}>
              <Link
                href={`/classes/${SLUG[c.id]}`}
                className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-6 py-6 asilo-row text-center lg:text-left"
              >
                <div className="relative w-28 h-36 md:w-40 md:h-52 shrink-0 overflow-hidden border border-green-border/40 bg-[#080a08]">
                  {photo ? (
                    <img src={photo} alt="" className="w-full h-full object-cover object-top" />
                  ) : (
                    <img src={c.icon} alt="" className="w-16 h-16 m-auto mt-10 opacity-70" />
                  )}
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="font-display text-2xl md:text-3xl text-white">{c.nome}</span>
                  <span className="mt-2 text-[12px] tracking-[0.16em] uppercase text-green-muted">{ERA[c.id]}</span>
                  {!c.playable && <span className="mt-3 text-sm text-bone/60">Ainda não jogável.</span>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
