'use client'

import { useMemo, useState } from 'react'
import catalog from '@/data/d4/skills-catalog.json'
import { D4_CLASSES } from '@/lib/d4'
import { TIER_ORDER, TIER_TONE, type ListKind, type TierBuild, type TierLetter } from '@/lib/tier'
import SkillIcon from '@/components/tier/SkillIcon'

const PLAYABLE = D4_CLASSES.filter((c) => c.playable)
const CLASS_ICON: Record<string, string> = Object.fromEntries(D4_CLASSES.map((c) => [c.id, c.icon]))

type Skill = { id: string; name: string; slug: string; icon: string }

export default function TierEditor({
  rows,
  onSave,
}: {
  rows: TierBuild[]
  onSave: (rows: TierBuild[]) => Promise<void>
}) {
  const [kind, setKind] = useState<ListKind>('endgame')
  const [mode, setMode] = useState<'idle' | 'insert' | 'remove'>('idle')
  const [plusTier, setPlusTier] = useState<TierLetter | null>(null)
  const [cls, setCls] = useState<string | null>(null)
  const [skill, setSkill] = useState<Skill | null>(null)
  const [name, setName] = useState('')
  const [href, setHref] = useState('')
  const [busy, setBusy] = useState(false)

  const skills = useMemo(() => {
    if (!cls) return []
    return ((catalog as Record<string, Skill[]>)[cls] || []) as Skill[]
  }, [cls])

  const list = rows.filter((r) => r.list_kind === kind)

  const persist = async (next: TierBuild[]) => {
    setBusy(true)
    try {
      await onSave(next)
    } finally {
      setBusy(false)
    }
  }

  const add = async () => {
    if (!plusTier || !cls || !skill || !name.trim() || !href.trim()) return
    const same = list.filter((r) => r.tier === plusTier)
    const item: TierBuild = {
      id: crypto.randomUUID(),
      list_kind: kind,
      tier: plusTier,
      sort: same.length,
      name: name.trim(),
      class_id: cls,
      skill_slug: skill.slug,
      skill_icon: skill.icon,
      href: href.trim(),
    }
    await persist([...rows, item])
    setMode('idle')
    setPlusTier(null)
    setCls(null)
    setSkill(null)
    setName('')
    setHref('')
  }

  const remove = async (id: string) => {
    await persist(rows.filter((r) => r.id !== id))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {(['endgame', 'leveling'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`px-4 py-2 text-[12px] tracking-[0.12em] uppercase border ${
              kind === k ? 'border-green-bright text-green-bright' : 'border-green-border text-green-muted'
            }`}
          >
            {k === 'endgame' ? 'Endgame' : 'Leveling'}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'insert' ? 'idle' : 'insert')
            setPlusTier(null)
            setCls(null)
            setSkill(null)
          }}
          className={`px-4 py-2 text-[12px] tracking-[0.12em] uppercase border ${
            mode === 'insert' ? 'border-[#c88a1a] text-[#c88a1a]' : 'border-green-border text-bone'
          }`}
        >
          Inserir build
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === 'remove' ? 'idle' : 'remove')}
          className={`px-4 py-2 text-[12px] tracking-[0.12em] uppercase border ${
            mode === 'remove' ? 'border-[#8a2a18] text-[#c45b4a]' : 'border-green-border text-bone'
          }`}
        >
          Remover build
        </button>
        {busy && <span className="text-[12px] text-green-muted self-center">Salvando…</span>}
      </div>

      {mode === 'insert' && plusTier && (
        <div className="mb-8 border border-green-border/40 p-5 space-y-4">
          <p className="text-[12px] tracking-[0.16em] uppercase text-[#c88a1a]">Nova no {plusTier}</p>
          {!cls && (
            <div className="flex flex-wrap gap-2">
              {PLAYABLE.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCls(c.id)}
                  className="flex items-center gap-2 border border-green-border/40 px-3 py-2 text-sm text-bone hover:border-green-bright"
                >
                  <img src={c.icon} alt="" className="w-7 h-7 object-contain" />
                  {c.nome}
                </button>
              ))}
            </div>
          )}
          {cls && !skill && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[360px] overflow-y-auto">
              {skills.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSkill(s)
                    setName(s.name)
                  }}
                  className="border border-green-border/30 p-1 hover:border-green-bright"
                  title={s.name}
                >
                  <SkillIcon src={s.icon} classSrc={CLASS_ICON[cls]} name={s.name} size={56} />
                  <span className="block text-[10px] text-bone/70 mt-1 line-clamp-2">{s.name}</span>
                </button>
              ))}
            </div>
          )}
          {skill && (
            <div className="space-y-3 max-w-lg">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#101014] border border-green-border/40 px-3 py-2 text-sm outline-none"
                placeholder="Nome da build"
              />
              <input
                value={href}
                onChange={(e) => setHref(e.target.value)}
                className="w-full bg-[#101014] border border-green-border/40 px-3 py-2 text-sm outline-none"
                placeholder="https://d4builds.gg/builds/…"
              />
              <button type="button" onClick={add} className="px-5 py-2 bg-green-primary text-white text-sm">
                Inserir
              </button>
            </div>
          )}
        </div>
      )}

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
              <div className={`flex items-center justify-center border-r ${TIER_TONE[letter]} font-display text-4xl`}>
                {letter}
              </div>
              <div className="flex flex-wrap gap-2 p-4 min-h-[88px] items-start">
                {mode === 'insert' && (
                  <button
                    type="button"
                    onClick={() => {
                      setPlusTier(letter)
                      setCls(null)
                      setSkill(null)
                    }}
                    className="w-[72px] h-[72px] border border-dashed border-green-bright/50 text-green-bright text-3xl leading-none"
                  >
                    +
                  </button>
                )}
                {builds.map((b) => (
                  <div key={b.id} className="relative w-[84px] border border-green-border/30 bg-[#0c100c] p-1.5">
                    {mode === 'remove' && (
                      <button
                        type="button"
                        onClick={() => remove(b.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-[#8a2a18] text-white text-xs z-10"
                        aria-label="Remover"
                      >
                        ×
                      </button>
                    )}
                    <SkillIcon src={b.skill_icon} classSrc={CLASS_ICON[b.class_id]} name={b.name} size={64} />
                    <span className="mt-1 block text-[10px] text-center text-bone/80 line-clamp-2">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
