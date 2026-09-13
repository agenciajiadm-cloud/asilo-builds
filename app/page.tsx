'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import BuildCard from '@/components/BuildCard'
import ClassTabs from '@/components/ClassTabs'
import RankingSidebar from '@/components/RankingSidebar'
import { 
  ShieldCheck, Swords, Trophy, Zap, ChevronRight, 
  Star, Target, LayoutDashboard, TrendingUp, Ghost, User
} from 'lucide-react'

const FEATURED_FALLBACK = [
  { id: 1, name: 'Touch of Death', class: 'spiritborn', pit: 127, tier: 'S', author: 'Naotsonek TV' },
  { id: 2, name: 'Blessed Shield', class: 'paladin', pit: 127, tier: 'S', author: 'Rob2628' },
  { id: 3, name: 'Pulverize', class: 'druid', pit: 118, tier: 'A', author: 'TiagoTrama' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')
  const [builds, setBuilds] = useState<any[]>([])

  useEffect(() => {
    async function loadBuilds() {
      const { data } = await supabase
        .from('public_builds')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setBuilds(data)
    }
    loadBuilds()
  }, [])

  const filteredBuilds = useMemo(() => {
    if (activeTab === 'all') return builds.length > 0 ? builds : FEATURED_FALLBACK;
    return (builds.length > 0 ? builds : FEATURED_FALLBACK).filter(b => b.class_id === activeTab || b.class === activeTab)
  }, [activeTab, builds])

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden pattern-overlay">
      
      {/* Hero Section - Estilo 'Verdade Brutal' */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-green-border/10">
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                <div className="w-12 h-px bg-green-primary"></div>
                <span className="text-[11px] tracking-[8px] text-green-bright uppercase font-display font-bold">
                  Arsenal de Elite BR
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-[100px] font-display text-white uppercase leading-none tracking-tight font-black"
              >
                SEU CAMINHO <br/>
                AO <span className="text-green-primary drop-shadow-[0_0_30px_rgba(58,138,24,0.4)]">TOPO</span> DO <br/>
                SANTUÁRIO.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-text-secondary uppercase tracking-[4px] leading-relaxed max-w-2xl"
              >
                Você nos encontrou no Ranking Global. Agora, domine o Santuário com as builds da nossa comunidade.
                <span className="text-white font-bold ml-2 underline decoration-green-primary decoration-2 underline-offset-8">Simplicidade e força. Juntos somos mais fortes.</span>
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-10"
              >
                <Link
                  href="/planner"
                  className="px-12 py-5 bg-green-primary text-white text-[11px] tracking-[6px] uppercase font-display font-bold hover:bg-green-bright hover:shadow-[0_0_50px_rgba(90,184,42,0.4)] transition-all duration-500 rounded-[2px] shadow-2xl"
                >
                  Criar Build Agora
                </Link>
                <Link
                  href="/tierlist"
                  className="px-12 py-5 border border-green-border text-green-bright text-[11px] tracking-[6px] uppercase font-display font-bold hover:bg-green-primary/10 transition-all duration-500 rounded-[2px]"
                >
                  Ver Tier List
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex-1 relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-green-primary/20 blur-[120px] rounded-full animate-pulse"></div>
              <img 
                src="/images/logo.png" 
                alt="ASILO" 
                className="w-full max-w-lg mx-auto relative z-10 drop-shadow-[0_0_60px_rgba(58,138,24,0.6)] rounded-full border-4 border-green-primary/20 p-2 bg-bg-primary/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area - Estilo d4builds.gg */}
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-20">
          
          {/* Builds Feed */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-green-border/20 pb-12">
              <h2 className="text-[12px] tracking-[6px] text-white uppercase font-black flex items-center gap-4">
                <Target size={20} className="text-green-primary" />
                Arsenal Verificado <span className="text-green-muted ml-2">S12</span>
              </h2>
              <ClassTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="wait">
                {filteredBuilds.length > 0 ? (
                  filteredBuilds.map((build, i) => (
                    <motion.div
                      key={build.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={`/builds/${build.slug || (build.build_name || build.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')}`}
                        className="brutal-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-green-primary/5"
                      >
                        <div className="flex items-center gap-8 w-full">
                          <div className="w-16 h-16 bg-black border border-green-border flex items-center justify-center relative shrink-0 group-hover:border-green-primary transition-colors">
                            <Swords size={24} className="text-green-primary" />
                            {build.tier && (
                              <span className="absolute -top-3 -right-3 w-8 h-8 bg-orange-primary text-black font-display font-black flex items-center justify-center text-sm shadow-xl">
                                {build.tier}
                              </span>
                            )}
                          </div>
                          <div className="space-y-2 flex-grow">
                            <h3 className="text-2xl text-white font-display uppercase tracking-tight group-hover:text-green-bright transition-colors">
                              {build.build_name || build.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4">
                              <span className="text-[10px] text-green-muted uppercase tracking-[3px] font-bold">
                                {(build.player_name || build.author)}
                              </span>
                              <div className="w-1 h-1 rounded-full bg-green-border"></div>
                              <span className="text-[10px] text-text-secondary uppercase tracking-[3px]">
                                {build.class_id || build.class}
                              </span>
                              {build.pit && (
                                <>
                                  <div className="w-1 h-1 rounded-full bg-green-border"></div>
                                  <span className="text-[10px] text-orange-primary uppercase tracking-[3px] font-bold">
                                    Pit {build.pit}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 shrink-0 w-full md:w-auto border-t md:border-t-0 border-green-border/20 pt-6 md:pt-0">
                          <div className="flex-grow md:flex-grow-0 flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-[8px] uppercase tracking-widest text-green-muted mb-1">Status</div>
                              <div className="text-[10px] uppercase tracking-[2px] text-green-bright font-bold">Verificada</div>
                            </div>
                            <ChevronRight size={24} className="text-green-muted group-hover:text-green-bright group-hover:translate-x-2 transition-all" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-40 brutal-card">
                    <Ghost size={48} className="text-green-muted/20 mx-auto mb-6" />
                    <p className="text-[12px] text-green-muted uppercase tracking-[4px]">Nenhum registro encontrado para este tier.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Imersiva */}
          <aside className="space-y-12">
            <div className="sticky top-48 space-y-12">
              <RankingSidebar rankings={[]} />
              
              {/* Join Card Sidebar */}
              <div className="brutal-card p-10 text-center bg-gradient-to-b from-bg-card to-bg-primary group/sidebar overflow-hidden relative">
                <div className="absolute inset-0 bg-green-primary/5 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-700"></div>
                <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-green-primary/20 flex items-center justify-center text-green-primary group-hover/sidebar:border-green-primary group-hover/sidebar:scale-110 transition-all duration-500 relative z-10">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-[12px] tracking-[6px] text-white uppercase font-black mb-4 relative z-10">Recrutamento Ativo</h3>
                <p className="text-[11px] tracking-[3px] text-text-secondary uppercase leading-loose mb-10 relative z-10">
                  Junte-se à tropa de elite mais técnica do Santuário.
                </p>
                <Link
                  href="/recrutamento"
                  className="block w-full py-4 bg-green-primary text-white text-[10px] tracking-[4px] uppercase font-display font-bold hover:bg-green-bright hover:shadow-[0_0_30px_rgba(90,184,42,0.4)] transition-all duration-500 rounded-[2px] relative z-10"
                >
                  Candidatar-se
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Stats Section — Estilo Brutal */}
      <section className="py-40 border-t border-green-border/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-20">
          {[
            { valor: '150+', label: 'Membros Ativos', icon: User },
            { valor: 'Top 1', label: 'Comunidade BR', icon: Trophy },
            { valor: 'S12', label: 'Meta Prontos', icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center space-y-6"
            >
              <stat.icon size={32} className="text-green-primary mx-auto opacity-40" />
              <div className="font-display text-7xl text-white tracking-tight font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {stat.valor}
              </div>
              <div className="text-[11px] tracking-[6px] text-green-muted uppercase font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-60 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-green-primary/5 blur-[160px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-display text-6xl md:text-8xl text-white tracking-tight uppercase font-black leading-none"
          >
            A FORÇA ESTÁ NA <br/>
            <span className="text-green-primary">UNIÃO.</span>
          </motion.h2>
          <p className="text-[14px] tracking-[6px] text-text-secondary uppercase leading-loose max-w-2xl mx-auto">
            O ASILO não é apenas um clã. É a autoridade técnica definitiva no Brasil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
            <a
              href="https://discord.com/invite/4jhsRbrQ"
              target="_blank"
              className="px-16 py-6 bg-green-primary text-white text-[11px] tracking-[8px] uppercase font-display font-bold hover:bg-green-bright hover:shadow-[0_0_60px_rgba(90,184,42,0.5)] transition-all duration-500 rounded-[2px]"
            >
              Entrar no Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
