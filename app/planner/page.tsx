'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Fog from '@/components/Fog'
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

const GEAR_SLOTS = [
  { id: 'helm', name: 'Capacete' },
  { id: 'chest', name: 'Peitoral' },
  { id: 'gloves', name: 'Luvas' },
  { id: 'pants', name: 'Calças' },
  { id: 'boots', name: 'Botas' },
  { id: 'amulet', name: 'Amuleto' },
  { id: 'ring1', name: 'Anel 1' },
  { id: 'ring2', name: 'Anel 2' },
  { id: 'main_hand', name: 'Arma Principal' },
  { id: 'off_hand', name: 'Arma Secundária' },
]

const input =
  'w-full bg-[#0a0c09] border border-green-border/60 text-bone text-[13px] px-3 py-2 focus:border-green-primary focus:outline-none placeholder:text-green-muted/50'
const inputGold =
  'w-full bg-[#0a0c09] border border-orange-primary/25 text-orange-primary text-[13px] px-3 py-2 focus:border-orange-primary focus:outline-none placeholder:text-orange-primary/30'

export default function BuildPlanner() {
  const [activeTab, setActiveTab] = useState('gear')
  const [selectedClass, setSelectedClass] = useState<(typeof D4_CLASSES)[number]>(D4_CLASSES[0])
  const [importUrl, setImportUrl] = useState('')
  const imported = useMemo(() => parseBuildUrl(importUrl), [importUrl])

  const [gear, setGear] = useState<Record<string, { stats: string[]; aspecto: string; tempera: string }>>(
    () => Object.fromEntries(GEAR_SLOTS.map((s) => [s.id, { stats: ['', '', '', ''], aspecto: '', tempera: '' }])),
  )
  const [bar, setBar] = useState(['', '', '', '', '', ''])
  const [passivas, setPassivas] = useState([''])
  const [boards, setBoards] = useState([{ nome: '', glifo: '' }])
  const [showcaseUrl, setShowcaseUrl] = useState('')
  const [descricao, setDescricao] = useState('')
  const [submission, setSubmission] = useState({
    playerName: '',
    characterName: '',
    buildName: '',
    version: `S${SEASON}`,
    key: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null)

  const options = skillOptions(selectedClass.id)
  const locked = !selectedClass.playable

  function updateGear(slotId: string, field: 'aspecto' | 'tempera', value: string) {
    setGear((g) => ({ ...g, [slotId]: { ...g[slotId], [field]: value } }))
  }
  function updateGearStat(slotId: string, i: number, value: string) {
    setGear((g) => {
      const stats = [...g[slotId].stats]
      stats[i] = value
      return { ...g, [slotId]: { ...g[slotId], stats } }
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submission.key !== 'ASILO.2026') {
      alert('Chave secreta inválida!')
      return
    }
    if (locked) {
      alert('Amazona ainda não tem kit no dump. Não publica build fantasma.')
      return
    }
    setSaving(true)
    try {
      const slug = toSlug(submission.buildName)
      const { error } = await supabase.from('public_builds').insert([
        {
          player_name: submission.playerName,
          character_name: submission.characterName,
          build_name: submission.buildName,
          slug,
          version: submission.version,
          class_id: selectedClass.id,
          build_data: { gear, bar, passivas, boards, imported },
          descricao: descricao || null,
          showcase_url: showcaseUrl || imported?.href || null,
          created_at: new Date().toISOString(),
        },
      ])
      if (error) throw error
      setSaveStatus('success')
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative pb-32">
      <Fog />
      <div className="max-w-7xl mx-auto px-5 pt-12 md:pt-16 relative">
        <p className="font-display text-[11px] tracking-[0.35em] text-green-bright mb-4">Planner · catálogo d4data</p>
        <h1 className="font-display text-4xl md:text-7xl text-white leading-none mb-4">Crie seu arsenal</h1>
        <p className="max-w-2xl text-bone/80 leading-7 mb-10">
          Skills vêm do SkillKit dataminado (MIT). Você cola o link do d4builds / Mobalytics / Maxroll — o chrome é nosso,
          não o layout deles. Amazona: H1 2027, kit vazio de propósito.
        </p>

        <label className="block mb-10">
          <span className="text-[11px] tracking-[0.2em] uppercase font-display text-green-muted">Importar por URL</span>
          <input
            className={`${input} mt-2`}
            placeholder="https://d4builds.gg/builds/…  ou  mobalytics / maxroll"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
          />
          {imported && (
            <p className="mt-2 text-sm text-green-bright">
              Fonte: {imported.source}
              {imported.classId ? ` · classe detectada: ${imported.classId}` : ' · classe não estava no link, escolha abaixo'}
            </p>
          )}
        </label>

        <div className="flex flex-wrap gap-2 mb-12">
          {D4_CLASSES.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => {
                setSelectedClass(cls)
                if (imported?.classId && imported.classId !== cls.id) {
                  /* keep url, user override */
                }
              }}
              className={`px-4 py-3 border text-[11px] tracking-[0.14em] uppercase font-display ${
                selectedClass.id === cls.id
                  ? 'border-green-primary text-green-bright bg-green-primary/10'
                  : 'border-green-border/50 text-green-muted'
              }`}
            >
              {cls.nome}
              {!cls.playable ? ' · 2027' : ''}
            </button>
          ))}
        </div>

        {locked && (
          <div className="border border-ember/50 bg-ember/10 p-8 mb-12">
            <h2 className="font-display text-2xl text-white mb-3">Amazona ainda não existe neste planner</h2>
            <p className="leading-7 text-bone/85">
              Blizzard: primeiro semestre de 2027. Arco e javelin. O SkillKit dump não tem Amazon.skl. Quando o showcase
              sair, a gente injeta o kit. Até lá, guia em /classes/amazona.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <div className="border border-green-border/40 p-6 md:p-8">
            <div className="flex gap-6 border-b border-green-border/30 mb-8 overflow-x-auto">
              {[
                { id: 'gear', label: 'Equipamento' },
                { id: 'skills', label: 'Habilidades' },
                { id: 'paragon', label: 'Paragon' },
                { id: 'showcase', label: 'Showcase' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-[11px] tracking-[0.2em] uppercase font-display ${
                    activeTab === tab.id ? 'text-green-bright' : 'text-green-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'gear' && (
                <motion.div key="gear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-4">
                  {GEAR_SLOTS.map((slot) => (
                    <div key={slot.id} className="border border-green-border/40 p-4 space-y-2">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-green-muted">{slot.name}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[0, 1, 2, 3].map((i) => (
                          <input
                            key={i}
                            className={input}
                            placeholder={`Afixo ${i + 1}`}
                            value={gear[slot.id]?.stats[i] || ''}
                            onChange={(e) => updateGearStat(slot.id, i, e.target.value)}
                          />
                        ))}
                      </div>
                      <input
                        className={inputGold}
                        placeholder="Aspecto ou unique"
                        value={gear[slot.id]?.aspecto || ''}
                        onChange={(e) => updateGear(slot.id, 'aspecto', e.target.value)}
                      />
                      <input
                        className={inputGold}
                        placeholder="Tempera"
                        value={gear[slot.id]?.tempera || ''}
                        onChange={(e) => updateGear(slot.id, 'tempera', e.target.value)}
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <p className="text-sm text-green-muted">
                    {options.length} nomes no kit {selectedClass.nome}. Barra de 6 + passivas.
                  </p>
                  <datalist id="d4-skills">
                    {options.map((s) => (
                      <option key={s.id} value={s.name} />
                    ))}
                  </datalist>
                  <div className="grid md:grid-cols-2 gap-3">
                    {bar.map((v, i) => (
                      <input
                        key={i}
                        list="d4-skills"
                        className={input}
                        placeholder={`Skill ${i + 1}`}
                        value={v}
                        disabled={locked}
                        onChange={(e) => setBar((b) => b.map((x, j) => (j === i ? e.target.value : x)))}
                      />
                    ))}
                  </div>
                  {passivas.map((p, i) => (
                    <input
                      key={i}
                      list="d4-skills"
                      className={input}
                      placeholder="Passiva"
                      value={p}
                      disabled={locked}
                      onChange={(e) => setPassivas((ps) => ps.map((x, j) => (j === i ? e.target.value : x)))}
                    />
                  ))}
                  <button
                    type="button"
                    className="text-[11px] tracking-[0.16em] uppercase font-display text-green-bright"
                    onClick={() => setPassivas((ps) => [...ps, ''])}
                  >
                    + passiva
                  </button>
                </motion.div>
              )}

              {activeTab === 'paragon' && (
                <motion.div key="paragon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  {boards.map((board, i) => (
                    <div key={i} className="grid md:grid-cols-2 gap-3">
                      <input
                        className={input}
                        placeholder="Board"
                        value={board.nome}
                        onChange={(e) => setBoards((bs) => bs.map((b, j) => (j === i ? { ...b, nome: e.target.value } : b)))}
                      />
                      <input
                        className={input}
                        placeholder="Glifo"
                        value={board.glifo}
                        onChange={(e) => setBoards((bs) => bs.map((b, j) => (j === i ? { ...b, glifo: e.target.value } : b)))}
                      />
                    </div>
                  ))}
                  {boards.length < 6 && (
                    <button
                      type="button"
                      className="text-[11px] tracking-[0.16em] uppercase font-display text-green-bright"
                      onClick={() => setBoards((b) => [...b, { nome: '', glifo: '' }])}
                    >
                      + board
                    </button>
                  )}
                </motion.div>
              )}

              {activeTab === 'showcase' && (
                <motion.div key="showcase" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <input
                    className={input}
                    placeholder="YouTube da run"
                    value={showcaseUrl}
                    onChange={(e) => setShowcaseUrl(e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSave} className="border border-green-border/40 p-8 space-y-5 sticky top-28">
            <h2 className="font-display text-xl text-white">Publicar no clã</h2>
            {(['playerName', 'characterName', 'buildName'] as const).map((field) => (
              <input
                key={field}
                required
                className={input}
                placeholder={field}
                value={submission[field]}
                onChange={(e) => setSubmission({ ...submission, [field]: e.target.value })}
              />
            ))}
            <textarea
              className={input}
              rows={4}
              placeholder="Resumo"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              className={input}
              value={submission.version}
              onChange={(e) => setSubmission({ ...submission, version: e.target.value })}
            />
            <input
              required
              type="password"
              className={inputGold}
              placeholder="Chave ASILO"
              value={submission.key}
              onChange={(e) => setSubmission({ ...submission, key: e.target.value })}
            />
            <button
              disabled={saving || locked}
              className="w-full py-4 bg-green-primary text-white font-display text-[11px] tracking-[0.22em] uppercase disabled:opacity-40"
            >
              {saving ? 'Publicando…' : 'Publicar build'}
            </button>
            {saveStatus === 'success' && <p className="text-green-bright text-sm">No ar.</p>}
            {saveStatus === 'error' && <p className="text-ember text-sm">Falhou. Chave ou Supabase.</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
