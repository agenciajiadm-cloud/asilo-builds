'use client'

import { useEffect, useMemo, useState } from 'react'
import SkillTreeCanvas from '@/components/planner/SkillTreeCanvas'
import { D4_CLASSES, loadSkillTree, parseBuildUrl } from '@/lib/d4'
import type { SkillTree } from '@/lib/d4-tree'
import { supabase } from '@/lib/supabase'
import { SEASON } from '@/lib/site'

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const LEFT = [
  { id: 'helm', label: 'Capacete', short: 'Cap' },
  { id: 'chest', label: 'Peitoral', short: 'Peito' },
  { id: 'gloves', label: 'Luvas', short: 'Luvas' },
  { id: 'pants', label: 'Calças', short: 'Calças' },
  { id: 'boots', label: 'Botas', short: 'Botas' },
  { id: 'main', label: 'Arma', short: 'Arma' },
  { id: 'off', label: 'Off-hand', short: 'Off' },
]

const RIGHT = [
  { id: 'amulet', label: 'Amuleto', short: 'Amu' },
  { id: 'ring1', label: 'Anel 1', short: 'Anel' },
  { id: 'ring2', label: 'Anel 2', short: 'Anel' },
  { id: 'empty', label: '', short: '' },
  { id: 'aspect', label: 'Aspecto / unique', short: 'Asp' },
]

const RING = [
  { i: 0, left: '50%', top: '14%' },
  { i: 1, left: '82%', top: '32%' },
  { i: 2, left: '82%', top: '68%' },
  { i: 3, left: '50%', top: '86%' },
  { i: 4, left: '18%', top: '68%' },
  { i: 5, left: '18%', top: '32%' },
]

const TABS = [
  { id: 'gear', label: 'Equipamento e skills' },
  { id: 'tree', label: 'Árvore' },
  { id: 'paragon', label: 'Paragon' },
  { id: 'merc', label: 'Mercenários' },
  { id: 'war', label: 'Planos de guerra' },
  { id: 'notes', label: 'Notas' },
] as const

function Slot({
  label,
  short,
  name,
  onName,
}: {
  label: string
  short: string
  name: string
  onName: (v: string) => void
}) {
  if (!label) return <div className="h-14" />
  const gold = /aspect|aspecto|unique|vow|opus/i.test(name)
  return (
    <div className="d4-slot">
      <div className="d4-slot-icon">{short}</div>
      <div className="min-w-0">
        <input
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Nome do item"
          className={`w-full bg-transparent outline-none text-[15px] truncate ${gold ? 'text-[#e4b56a]' : 'text-[#cfc8bc]'}`}
        />
        <p className="text-[12px] text-[#7a7670]">{label}</p>
      </div>
    </div>
  )
}

export default function D4Montador() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('tree')
  const [cls, setCls] = useState<(typeof D4_CLASSES)[number]>(D4_CLASSES[1])
  const [tree, setTree] = useState<SkillTree | null>(null)
  const [ranks, setRanks] = useState<Record<number, number>>({})
  const [importUrl, setImportUrl] = useState('')
  const imported = useMemo(() => parseBuildUrl(importUrl), [importUrl])

  const [items, setItems] = useState<Record<string, string>>({})
  const [skills, setSkills] = useState(['', '', '', '', '', ''])
  const [runes, setRunes] = useState(['', '', '', ''])
  const [technique, setTechnique] = useState('')
  const [boards, setBoards] = useState(['', '', '', '', '', ''])
  const [notes, setNotes] = useState('')
  const [meta, setMeta] = useState({
    title: 'Nova build',
    author: '',
    version: `S${SEASON}`,
    key: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<null | 'ok' | 'err'>(null)

  const locked = !cls.playable

  useEffect(() => {
    let live = true
    setTree(null)
    setRanks({})
    if (!cls.playable) return
    loadSkillTree(cls.id).then((t) => {
      if (live) setTree(t)
    })
    return () => {
      live = false
    }
  }, [cls.id, cls.playable])

  useEffect(() => {
    const parsed = parseBuildUrl(importUrl)
    if (!parsed?.classId) return
    const next = D4_CLASSES.find((c) => c.id === parsed.classId)
    if (next) setCls(next)
  }, [importUrl])

  const allocatedSkills = useMemo(() => {
    if (!tree) return []
    return tree.nodes.filter((n) => n.kind === 'skill' && (ranks[n.i] || 0) > 0)
  }, [tree, ranks])

  const handleSave = async () => {
    if (meta.key !== 'ASILO.2026') {
      alert('Chave do clã inválida.')
      return
    }
    if (locked) return
    setSaving(true)
    try {
      const slug = toSlug(meta.title)
      const { error } = await supabase.from('public_builds').insert([
        {
          player_name: meta.author || 'ASILO',
          character_name: meta.author,
          build_name: meta.title,
          slug,
          version: meta.version,
          class_id: cls.id,
          build_data: { items, skills, runes, technique, boards, ranks, imported },
          descricao: notes || null,
          showcase_url: imported?.href || null,
          created_at: new Date().toISOString(),
        },
      ])
      if (error) throw error
      setSaveStatus('ok')
    } catch {
      setSaveStatus('err')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="d4-board min-h-[calc(100vh-5rem)] pb-24 font-body">
      <div className="max-w-[1400px] mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 rounded-sm bg-[#101014] border border-[rgba(58,138,24,0.25)] overflow-hidden shrink-0">
              <img
                src={cls.icon}
                alt=""
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <input
                value={meta.title}
                onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                className="w-full bg-transparent text-[22px] text-[#e8b86a] font-display outline-none"
              />
              <p className="text-sm text-[#9a958c] mt-1">
                {cls.nome} · SkillKit d4data · season {SEASON}
              </p>
              <label className="block mt-3 text-[11px] text-[#7a7670]">
                Link de referência (não importa o kit dos outros)
                <input
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder="https://d4builds.gg/builds/… — só detecta a classe"
                  className="mt-1 w-full bg-[#101014] border border-[#2a2a33] rounded-sm px-3 py-2 text-sm text-[#d7d3cc] outline-none focus:border-[#3a8a18]"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {D4_CLASSES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCls(c)}
                className={`px-3 py-1.5 rounded-sm text-[12px] border ${
                  cls.id === c.id ? 'border-[#5ab82a] text-[#c8d4b8] bg-[#3a8a18]/15' : 'border-[#2a2a33] text-[#8a8680]'
                }`}
              >
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        {locked && (
          <p className="mb-6 text-sm text-[#c4a056]">
            Amazona chega no primeiro semestre de 2027 (arco e javelin). Sem SkillKit no dump — o montador não inventa.
          </p>
        )}

        <div className="flex flex-wrap gap-1 border-b border-[#2a2a33] mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[13px] ${tab === t.id ? 'text-white border-b-2 border-[#5ab82a]' : 'text-[#8a8680]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'tree' && (
          <div>
            {tree ? (
              <SkillTreeCanvas tree={tree} ranks={ranks} onRanks={setRanks} />
            ) : (
              !locked && <p className="text-[#8a8680]">Carregando árvore…</p>
            )}
          </div>
        )}

        {tab === 'gear' && (
          <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr_260px] gap-8 items-start">
            <div className="space-y-3">
              {LEFT.map((s) => (
                <Slot
                  key={s.id}
                  label={s.label}
                  short={s.short}
                  name={items[s.id] || ''}
                  onName={(v) => setItems((p) => ({ ...p, [s.id]: v }))}
                />
              ))}
            </div>

            <div>
              <p className="text-center text-sm text-[#8a8680] mb-4">Barra ativa — skills com ponto na árvore</p>
              <div className="d4-ring">
                {RING.map((n) => (
                  <div key={n.i} className="d4-node" style={{ left: n.left, top: n.top }}>
                    <select
                      disabled={locked}
                      value={skills[n.i]}
                      onChange={(e) => setSkills((s) => s.map((x, i) => (i === n.i ? e.target.value : x)))}
                    >
                      <option value="">—</option>
                      {allocatedSkills.map((s) => (
                        <option key={s.i} value={s.power || s.label}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#3a8a18] bg-[#0a1208]" />
              </div>
              <p className="text-center text-[12px] text-[#8a8680] mt-6 mb-2">Runas</p>
              <div className="flex justify-center gap-3">
                {runes.map((r, i) => (
                  <input
                    key={i}
                    value={r}
                    onChange={(e) => setRunes((rs) => rs.map((x, j) => (j === i ? e.target.value : x)))}
                    placeholder="—"
                    className="w-14 h-14 rounded-sm bg-[#101014] border border-[#2a2a33] text-center text-[#e8d9a8] outline-none"
                  />
                ))}
              </div>
              <div className="mt-6">
                <p className="text-[12px] text-[#8a8680] mb-2">Técnica / expertise</p>
                <input
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  className="w-full h-12 rounded-sm bg-[#101014] border border-[#2a2a33] px-2 text-sm outline-none"
                  placeholder="Arma"
                />
              </div>
            </div>

            <div className="space-y-3">
              {RIGHT.map((s) => (
                <Slot
                  key={s.id || 'gap'}
                  label={s.label}
                  short={s.short}
                  name={items[s.id] || ''}
                  onName={(v) => setItems((p) => ({ ...p, [s.id]: v }))}
                />
              ))}
            </div>
          </div>
        )}

        {tab === 'paragon' && (
          <div className="max-w-lg space-y-3">
            <p className="text-[#9a958c] text-sm leading-6">
              Boards e glifos entram no próximo ingest (ParagonBoard no d4data). Por agora, nomeia as 5+1 à mão.
            </p>
            {boards.map((b, i) => (
              <input
                key={i}
                value={b}
                onChange={(e) => setBoards((bs) => bs.map((x, j) => (j === i ? e.target.value : x)))}
                placeholder={`Board ${i + 1}`}
                className="w-full bg-[#101014] border border-[#2a2a33] rounded-sm px-3 py-2 text-sm outline-none"
              />
            ))}
          </div>
        )}

        {tab === 'merc' && (
          <p className="text-[#9a958c] max-w-xl leading-7">
            SkillKits de mercenário existem no dump (BerserkerCrone, BountyHunter…). Overlay depois — não é HTML de terceiros.
          </p>
        )}

        {tab === 'war' && (
          <p className="text-[#9a958c] max-w-xl leading-7">
            Warplans (Pit, Helltide, Hordes) são outros `.skl.json`. Mesma ponte, outra aba.
          </p>
        )}

        {tab === 'notes' && (
          <div className="max-w-xl space-y-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              placeholder="Rotação, unique, o que o clã testa nesta season…"
              className="w-full bg-[#101014] border border-[#2a2a33] rounded-sm px-3 py-2 text-sm outline-none"
            />
            <input
              value={meta.author}
              onChange={(e) => setMeta({ ...meta, author: e.target.value })}
              placeholder="Seu nick"
              className="w-full bg-[#101014] border border-[#2a2a33] rounded-sm px-3 py-2 text-sm outline-none"
            />
            <input
              type="password"
              value={meta.key}
              onChange={(e) => setMeta({ ...meta, key: e.target.value })}
              placeholder="Chave do clã (só pra publicar no site)"
              className="w-full bg-[#101014] border border-[#2a2a33] rounded-sm px-3 py-2 text-sm outline-none"
            />
            <button
              type="button"
              disabled={saving || locked}
              onClick={handleSave}
              className="px-5 py-2.5 rounded-sm bg-[#3a8a18] text-white text-sm disabled:opacity-40"
            >
              {saving ? 'Salvando…' : 'Salvar no arsenal'}
            </button>
            {saveStatus === 'ok' && <p className="text-sm text-[#8ab84a]">Build no arsenal.</p>}
            {saveStatus === 'err' && <p className="text-sm text-[#c45b4a]">Não salvou. Confere a chave.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
