'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Trophy, User, ShieldCheck, Swords, Zap, Info,
  LayoutDashboard, BookOpen, Settings2, Share2, PlayCircle, ExternalLink,
  Target, Layers, Ghost, Star
} from 'lucide-react';
import ItemBlock from '@/components/ItemBlock';
import { supabase } from '@/lib/supabase';

export default function BuildPage() {
  const params = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [build, setBuild] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const slug = params.slug;
      if (!slug) return;

      setLoading(true);
      try {
        // Busca por slug primeiro (mais confiável)
        let { data } = await supabase
          .from('public_builds')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        // Fallback: busca por nome com hífens convertidos em espaços
        if (!data) {
          const { data: byName } = await supabase
            .from('public_builds')
            .select('*')
            .ilike('build_name', slug.replace(/-/g, ' '))
            .maybeSingle();
          data = byName;
        }

        if (data) setBuild(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="bg-bg-primary min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-green-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!build) {
    return (
      <div className="bg-bg-primary min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="text-[10px] uppercase tracking-[6px] text-green-muted">Build não encontrada</div>
        <Link href="/" className="px-8 py-3 border border-green-primary/40 text-green-bright text-[10px] tracking-[4px] uppercase font-display hover:bg-green-primary/10 transition-all rounded-[2px]">
          ← Voltar ao Arsenal
        </Link>
      </div>
    );
  }

  const name = build.build_name || build.nome;
  const player = build.player_name || (build.membros?.nome) || 'ASILO';

  return (
    <div className="bg-bg-primary min-h-screen pb-40 relative overflow-hidden pattern-overlay">
      
      {/* Header Imersivo */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-green-border/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-[10px] uppercase tracking-[8px] text-green-muted mb-16"
          >
            <Link href="/" className="hover:text-green-bright transition-colors">Arsenal</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-green-primary font-bold">{build.class_id || build.classe?.nome}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
            <div className="space-y-10 max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-6"
              >
                <div className="px-4 py-1.5 bg-green-primary/10 border border-green-primary/30 text-green-bright text-[10px] font-bold uppercase tracking-[4.4em] shadow-[0_0_20px_rgba(58,138,24,0.1)]">
                  {build.version || 'S12'}
                </div>
                {build.pit && (
                  <div className="flex items-center gap-3 px-4 py-1.5 bg-orange-primary/10 border border-orange-primary/40 text-orange-primary text-[10px] font-bold uppercase tracking-[0.4em]">
                    <Trophy size={14} /> Pit {build.pit}
                  </div>
                )}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl md:text-8xl font-display uppercase tracking-tight text-white leading-none font-black drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              >
                {name}
              </motion.h1>
              
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-green-primary/20 flex items-center justify-center text-green-primary bg-green-primary/5">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[4px] text-green-muted font-bold">Estrategista</div>
                    <div className="text-xl font-display text-white uppercase">{player}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="px-10 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[4px] hover:bg-green-bright hover:text-white transition-all duration-500 rounded-[2px] shadow-2xl">
                Copiar Planner
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-24 z-50 py-6 border-y border-green-border/10 bg-bg-primary/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-12">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BookOpen },
              { id: 'gear', label: 'Equipamento', icon: Swords },
              { id: 'skills', label: 'Habilidades', icon: Zap },
              ...(build.showcase_url ? [{ id: 'showcase', label: 'Showcase', icon: PlayCircle }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-3 py-3 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative ${
                  activeTab === tab.id ? 'text-green-bright' : 'text-green-muted hover:text-green-primary'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabLine"
                    className="absolute bottom-[-24px] left-0 w-full h-0.5 bg-green-bright" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-20"
            >
              <div className="brutal-card p-12 md:p-20 space-y-12">
                <div className="flex items-center gap-6">
                  <Info size={24} className="text-green-primary" />
                  <h2 className="text-[12px] font-display uppercase tracking-[6px] text-white font-black">Codex de Combate</h2>
                </div>
                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed uppercase tracking-wider font-medium border-l-4 border-green-primary pl-10 italic">
                  {build.descricao || build.build_data?.notes || build.resumo || 'Nenhuma descrição fornecida para esta build.'}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'gear' && (
            <motion.div
              key="gear"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {build.build_data?.gear ? Object.entries(build.build_data.gear).map(([slot, item]: [string, any]) => {
                const isObj = item && typeof item === 'object';
                const stats: string[] = isObj ? (item.stats || []) : [];
                const aspecto: string = isObj ? item.aspecto : '';
                const tempera: string = isObj ? item.tempera : '';
                const hasContent = stats.some(Boolean) || aspecto || tempera || (!isObj && item);
                if (!hasContent) return null;
                return (
                  <div key={slot} className="brutal-card p-6 space-y-4">
                    <div className="text-[8px] uppercase tracking-[3px] text-[#2a5a12] font-bold border-b border-green-border/20 pb-3">{slot}</div>
                    {isObj ? (
                      <div className="space-y-2">
                        {stats.filter(Boolean).map((s, i) => (
                          <div key={i} className="text-[12px] text-[#8ab84a] tracking-wide">{s}</div>
                        ))}
                        {aspecto && <div className="text-[12px] text-[#c8780a] tracking-wide border-t border-[#3a2800]/40 pt-2">{aspecto}</div>}
                        {tempera && <div className="text-[12px] text-[#c8780a] tracking-wide">{tempera}</div>}
                      </div>
                    ) : (
                      <div className="text-lg text-white font-display uppercase tracking-tight">{item}</div>
                    )}
                  </div>
                );
              }) : (build.equipments?.map((item: any) => (
                <ItemBlock key={item.id} item={item} />
              )))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {build.build_data?.skills ? build.build_data.skills.map((skill: any, i: number) => (
                  <div key={i} className="brutal-card p-8 flex items-center gap-8 group">
                    <div className="w-12 h-12 bg-black border border-green-border flex items-center justify-center text-green-primary font-display font-black group-hover:border-green-primary transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-lg text-white font-display uppercase tracking-tight group-hover:text-green-bright transition-colors">
                        {typeof skill === 'string' ? skill : skill.nome}
                      </div>
                      {typeof skill !== 'string' && skill.pontos && (
                        <div className="text-[10px] text-green-muted uppercase tracking-widest mt-1">{skill.pontos} pts</div>
                      )}
                    </div>
                  </div>
                )) : (build.skills?.map((skill: any) => (
                  <div key={skill.id} className="brutal-card p-8 flex items-center gap-8">
                    <div className="w-12 h-12 bg-black border border-green-border flex items-center justify-center text-green-primary font-display font-black">
                      {skill.ordem}
                    </div>
                    <div>
                      <div className="text-lg text-white font-display uppercase tracking-tight">{skill.nome}</div>
                      <div className="text-[10px] text-green-muted uppercase tracking-widest mt-1">{skill.descricao}</div>
                    </div>
                  </div>
                )))}
              </div>
            </motion.div>
          )}

          {activeTab === 'showcase' && build.showcase_url && (
            <motion.div
              key="showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Thumbnail clicável */}
              {(() => {
                const m = build.showcase_url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                const videoId = m ? m[1] : null;
                return videoId ? (
                  <div className="relative border border-green-border/20 overflow-hidden group">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Showcase thumbnail"
                      className="w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors shadow-2xl">
                        <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[24px] border-l-white ml-1.5" />
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Botão ASSISTIR SHOWCASE */}
              <a
                href={build.showcase_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 w-full py-6 bg-red-700 hover:bg-red-600 text-white text-[13px] tracking-[6px] uppercase font-display font-black transition-all duration-300 rounded-[2px] shadow-[0_0_40px_rgba(200,0,0,0.3)] hover:shadow-[0_0_60px_rgba(200,0,0,0.5)]"
              >
                <PlayCircle size={22} />
                ▶ Assistir Showcase
                <ExternalLink size={16} className="opacity-60" />
              </a>

              {build.showcase_descricao && (
                <div className="brutal-card p-10 space-y-6">
                  <h3 className="text-[12px] font-display uppercase tracking-[6px] text-white font-black">Sobre o Showcase</h3>
                  <p className="text-lg text-text-secondary leading-relaxed tracking-wide border-l-4 border-red-700 pl-8">
                    {build.showcase_descricao}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
