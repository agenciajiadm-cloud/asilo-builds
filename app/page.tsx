'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Fog from '@/components/Fog'
import ClassTabs from '@/components/ClassTabs'
import RankingSidebar from '@/components/RankingSidebar'
import { DISCORD_INVITE, SEASON, SEASON_NAME } from '@/lib/site'

const FEATURED_FALLBACK = [
  { id: 1, name: 'Touch of Death', class: 'spiritborn', pit: 127, tier: 'S', author: 'Naotsonek TV', slug: 'touch-of-death' },
  { id: 2, name: 'Blessed Shield', class: 'paladin', pit: 127, tier: 'S', author: 'Rob2628', slug: 'blessed-shield' },
  { id: 3, name: 'Pulverize', class: 'druid', pit: 118, tier: 'A', author: 'TiagoTrama', slug: 'pulverize' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')
  const [builds, setBuilds] = useState<any[]>([])

  useEffect(() => {
    async function loadBuilds() {
      const { data } = await supabase.from('public_builds').select('*').order('created_at', { ascending: false })
      if (data) setBuilds(data)
    }
    loadBuilds()
  }, [])

  const filteredBuilds = useMemo(() => {
    const list = builds.length > 0 ? builds : FEATURED_FALLBACK
    if (activeTab === 'all') return list
    return list.filter((b) => b.class_id === activeTab || b.class === activeTab)
  }, [activeTab, builds])

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-green-border/40">
        <Fog />
        <div className="max-w-7xl mx-auto px-5 pt-16 md:pt-28 pb-20 md:pb-28 relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-[11px] tracking-[0.45em] text-green-bright mb-6"
          >
            Season {SEASON} · {SEASON_NAME}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-8xl text-white leading-[0.92] max-w-4xl"
          >
            O Santuário
            <br />
            não perdoa
            <br />
            <span className="text-green-bright">os despreparados.</span>
          </motion.h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-bone/80">
            ASILO é clã BR de Pit alto. Aqui o arsenal é verificado, a lore é manuscrito, o mapa tem relógio, e o planner
            não finge ser o d4builds.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/planner"
              className="px-8 py-4 bg-green-primary text-white font-display text-[11px] tracking-[0.22em] uppercase"
            >
              Montar build
            </Link>
            <Link
              href="/lore"
              className="px-8 py-4 border border-green-primary/50 text-green-bright font-display text-[11px] tracking-[0.22em] uppercase"
            >
              Ler a história
            </Link>
            <Link
              href="/mapas"
              className="px-8 py-4 border border-green-border text-bone font-display text-[11px] tracking-[0.22em] uppercase"
            >
              Mapas
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-green-border/30 pb-8">
            <h2 className="font-display text-3xl text-white">Arsenal · S{SEASON}</h2>
            <ClassTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <ul className="divide-y divide-green-border/30 border-y border-green-border/30">
            {filteredBuilds.map((build) => {
              const name = build.build_name || build.name
              const author = build.player_name || build.author
              const slug =
                build.slug ||
                String(name || '')
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9\s-]/g, '')
                  .trim()
                  .replace(/\s+/g, '-')
              const cls = build.class_id || build.class
              const pit = build.pit || build.pit_maximo
              return (
                <li key={build.id || slug}>
                  <Link href={`/builds/${slug}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 py-6 group">
                    <span className="font-display text-2xl text-white group-hover:text-green-bright">{name}</span>
                    <span className="text-[12px] tracking-[0.16em] uppercase text-green-muted">
                      {author} · {cls}
                      {pit ? ` · Pit ${pit}` : ''}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <aside className="space-y-8">
          <RankingSidebar rankings={[]} />
          <div className="border border-green-border/40 p-8">
            <h3 className="font-display text-xl text-white mb-3">Entrar</h3>
            <p className="text-sm leading-7 text-bone/75 mb-6">Discord eterno. Whats no /cla. Sem bot atribuindo classe — vocês já têm tag.</p>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="text-[11px] font-display tracking-[0.2em] uppercase text-green-bright">
              discord.gg/zXd4y525yV
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
