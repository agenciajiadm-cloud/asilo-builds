'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { D4_CLASSES, parseBuildUrl, skillOptions } from '@/lib/d4'
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
  { id: 'bludgeon', label: 'Arma de concussão', short: 'Mação' },
  { id: 'dw1', label: 'Duas mãos 1', short: 'DW1' },
]

const RIGHT = [
  { id: 'amulet', label: 'Amuleto', short: 'Amu' },
  { id: 'ring1', label: 'Anel 1', short: 'Anel' },
  { id: 'ring2', label: 'Anel 2', short: 'Anel' },
  { id: 'empty', label: '', short: '' },
  { id: 'slash', label: 'Arma de corte', short: 'Corte' },
  { id: 'dw2', label: 'Duas mãos 2', short: 'DW2' },
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
  listId,
}: {
  label: string
  short: string
  name: string
  onName: (v: string) => void
  listId?: string
}) {
  if (!label) return <div className="h-14" />
  const gold = /aspect|aspecto|unique|vow|opus|tusk|rage|fist|chain|shattered/i.test(name)
  return (
    <div className="d4-slot">
      <div className="d4-slot-icon">{short}</div>
      <div className="min-w-0">
        <input
          list={listId}
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Item, aspecto ou unique"
          className={`w-full bg-transparent outline-none text-[15px] truncate ${gold ? 'text-[#e4b56a]' : 'text-[#cfc8bc]'}`}
        />
        <p className="text-[12px] text-[#7a7670]">{label}</p>
      </div>
    </div>
  )
}

export default function D4Montador() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('gear')
  const [cls, setCls] = useState<(typeof D4_CLASSES)[number]>(D4_CLASSES[0])
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

  const options = skillOptions(cls.id)
  const locked = !cls.playable

  useEffect(() => {
    const parsed = parseBuildUrl(importUrl)
    if (!parsed?.classId) return
    const next = D4_CLASSES.find((c) => c.id === parsed.classId)
    if (next) setCls(next)
  }, [importUrl])

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
          build_data: { items, skills, runes, technique, boards, imported },
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
      <div className="max-w-[1280px] mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 rounded-lg bg-[#101014] border border-[#2a2a33] overflow-hidden shrink-0">
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
                className="w-full bg-transparent text-[22px] text-[#e8b86a] outline-none"
              />
              <p className="text-sm text-[#9a958c] mt-1">
                {cls.nome}
                {imported?.source ? ` · importada de ${imported.source}` : ' · montador ASILO'}
              </p>
              <label className="block mt-3 text-[11px] text-[#7a7670]">
                Colar link (d4builds, Mobalytics, Maxroll)
                <input
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder="https://d4builds.gg/builds/…"
                  className="mt-1 w-full bg-[#101014] border border-[#2a2a33] rounded-md px-3 py-2 text-sm text-[#d7d3cc] outline-none focus:border-[#c4a056]"
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
                className={`px-3 py-1.5 rounded-md text-[12px] border ${
                  cls.id === c.id ? 'border-[#c4a056] text-[#e8d9a8] bg-[#c4a056]/10' : 'border-[#2a2a33] text-[#8a8680]'
                }`}
              >
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        {locked && (
          <p className="mb-6 text-sm text-[#c4a056]">
            Amazona chega no primeiro semestre de 2027 (arco e javelin). O montador espera o kit oficial — até lá dá pra
            ler a história em Classes.
          </p>
        )}

        <div className="flex flex-wrap gap-1 border-b border-[#2a2a33] mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[13px] ${tab === t.id ? 'text-white border-b-2 border-[#c4a056]' : 'text-[#8a8680]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

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
              <p className="text-center text-sm text-[#8a8680] mb-4">Season {SEASON}</p>
              <div className="d4-ring">
                {RING.map((n) => (
                  <div key={n.i} className="d4-node" style={{ left: n.left, top: n.top }}>
                    <input
                      list="d4-skills"
                      disabled={locked}
                      value={skills[n.i]}
                      placeholder="skill"
                      onChange={(e) => setSkills((s) => s.map((x, i) => (i === n.i ? e.target.value : x)))}
                    />
                  </div>
                ))}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#7b4bb8] bg-[#1a1024] shadow-[0_0_24px_rgba(123,75,184,0.35)]" />
              </div>
              <p className="text-center text-[12px] text-[#8a8680] mt-6 mb-2">Runas ativas</p>
              <div className="flex justify-center gap-3">
                {runes.map((r, i) => (
                  <input
                    key={i}
                    value={r}
                    onChange={(e) => setRunes((rs) => rs.map((x, j) => (j === i ? e.target.value : x)))}
                    placeholder="—"
                    className="w-14 h-14 rounded-md bg-[#101014] border border-[#2a2a33] text-center text-[#e8d9a8] outline-none"
                  />
                ))}
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_120px] gap-6 items-end">
                <div>
                  <p className="text-[12px] text-[#8a8680] mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-md bg-[#101014] border border-[#2a2a33] flex items-center justify-center text-[9px] text-[#c4a056] text-center px-1"
                        title={s}
                      >
                        {s ? s.slice(0, 6) : i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] text-[#8a8680] mb-2">Técnica</p>
                  <input
                    value={technique}
                    onChange={(e) => setTechnique(e.target.value)}
                    className="w-full h-12 rounded-md bg-[#101014] border border-[#2a2a33] px-2 text-sm outline-none"
                    placeholder="Arma"
                  />
                </div>
              </div>
              <datalist id="d4-skills">
                {options.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
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

        {tab === 'tree' && (
          <p className="text-[#9a958c] max-w-xl leading-7">
            A árvore completa (nós e avanços) entra no próximo passo, com o SkillKit que já está no catálogo. Por agora,
            as seis skills do anel são a barra ativa — como no jogo.
          </p>
        )}

        {tab === 'paragon' && (
          <div className="max-w-lg space-y-3">
            {boards.map((b, i) => (
              <input
                key={i}
                value={b}
                onChange={(e) => setBoards((bs) => bs.map((x, j) => (j === i ? e.target.value : x)))}
                placeholder={`Board ${i + 1} + glifo`}
                className="w-full bg-[#101014] border border-[#2a2a33] rounded-md px-3 py-2 text-sm outline-none"
              />
            ))}
          </div>
        )}

        {tab === 'merc' && (
          <p className="text-[#9a958c] max-w-xl leading-7">Mercenários do Vessel of Hatred — slots no próximo giro.</p>
        )}

        {tab === 'war' && (
          <p className="text-[#9a958c] max-w-xl leading-7">
            Planos de guerra (Helltide, Pit, Hordes) usam os SkillKits Warplans do dump. Interface na sequência.
          </p>
        )}

        {tab === 'notes' && (
          <div className="max-w-xl space-y-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              placeholder="Rotação, por que essa unique, o que testar…"
              className="w-full bg-[#101014] border border-[#2a2a33] rounded-md px-3 py-2 text-sm outline-none"
            />
            <input
              value={meta.author}
              onChange={(e) => setMeta({ ...meta, author: e.target.value })}
              placeholder="Seu nick"
              className="w-full bg-[#101014] border border-[#2a2a33] rounded-md px-3 py-2 text-sm outline-none"
            />
            <input
              type="password"
              value={meta.key}
              onChange={(e) => setMeta({ ...meta, key: e.target.value })}
              placeholder="Chave do clã (só pra publicar no site)"
              className="w-full bg-[#101014] border border-[#2a2a33] rounded-md px-3 py-2 text-sm outline-none"
            />
            <button
              type="button"
              disabled={saving || locked}
              onClick={handleSave}
              className="px-5 py-2.5 rounded-md bg-[#5b4bdb] text-white text-sm disabled:opacity-40"
            >
              {saving ? 'Salvando…' : 'Salvar build'}
            </button>
            {saveStatus === 'ok' && <p className="text-sm text-[#8ab84a]">Build no arsenal.</p>}
            {saveStatus === 'err' && <p className="text-sm text-[#c45b4a]">Não salvou. Confere a chave.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
