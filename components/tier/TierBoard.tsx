'use client'

import { D4_CLASSES } from '@/lib/d4'
import { TIER_ORDER, TIER_TONE, type ListKind, type TierBuild } from '@/lib/tier'
import SkillIcon from '@/components/tier/SkillIcon'

const CLASS_ICON: Record<string, string> = Object.fromEntries(D4_CLASSES.map((c) => [c.id, c.icon]))

export default function TierBoard({
  rows,
  kind,
  onKind,
}: {
  rows: TierBuild[]
  kind: ListKind
  onKind?: (k: ListKind) => void
}) {
  const list = rows.filter((r) => r.list_kind === kind)

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-none">Tier list</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-bone/70">
            O que o clã está jogando agora. Clica no ícone e abre o guia — Maxroll, d4builds, vídeo, o que for.
          </p>
        </div>
        <div className="flex border border-green-border/40">
          {(['endgame', 'leveling'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => onKind?.(k)}
              className={`px-5 py-2.5 text-[12px] tracking-[0.14em] uppercase ${
                kind === k ? 'bg-green-primary text-white' : 'text-green-muted'
              }`}
            >
              {k === 'endgame' ? 'Endgame' : 'Leveling'}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-[rgba(58,138,24,0.28)] bg-[#080a08]">
        {TIER_ORDER.map((letter, i) => {
          const builds = list.filter((b) => b.tier === letter).sort((a, b) => a.sort - b.sort)
          return (
            <div
              key={letter}
              className={`grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] ${
                i < TIER_ORDER.length - 1 ? 'border-b border-green-border/25' : ''
              }`}
            >
              <div className={`flex items-center justify-center border-r ${TIER_TONE[letter]} font-display text-3xl md:text-5xl`}>
                {letter}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 p-3 md:p-5 min-h-[96px]">
                {builds.length === 0 && (
                  <p className="text-[12px] text-green-muted self-center px-1">Vazio — o painel preenche daqui.</p>
                )}
                {builds.map((b) => (
                  <a
                    key={b.id}
                    href={b.href}
                    target="_blank"
                    rel="noreferrer"
                    title={b.name}
                    className="group relative w-[72px] md:w-[84px] border border-green-border/30 bg-[#0c100c] p-1.5 hover:border-green-bright/70 hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <SkillIcon src={b.skill_icon} classSrc={CLASS_ICON[b.class_id]} name={b.name} size={72} />
                    <span className="mt-1 block text-[10px] leading-tight text-bone/80 text-center line-clamp-2 group-hover:text-green-bright">
                      {b.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
