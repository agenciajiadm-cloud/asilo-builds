import Link from 'next/link'
import { motion } from 'framer-motion'
import { scaleIn } from '@/lib/animations'
import { Play, Swords, Shield, Zap, TrendingUp } from 'lucide-react'

interface BuildCardProps {
  slug: string
  nome: string
  autor: string
  pit_maximo: number | null
  paragon_minimo: number | null
  dificuldade: string | null
  tags: string[]
  video_url: string | null
  featured: boolean
  rank_br: number | null
}

export default function BuildCard({
  slug, nome, autor, pit_maximo, paragon_minimo,
  dificuldade, tags, video_url, featured, rank_br
}: BuildCardProps) {
  const isTopRank = rank_br !== null && rank_br <= 5

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01, borderColor: 'rgba(90, 184, 42, 0.4)' }}
      className={`
        diablo-border rounded-[2px] p-8
        transition-all duration-500 cursor-pointer relative group/card
        ${featured ? 'border-l-[4px] border-l-green-primary shadow-[0_0_30px_rgba(58,138,24,0.1)]' : ''}
      `}
    >
      {/* Decorative Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none duration-700"></div>

      {/* Linha 1: Nome + Badge */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl text-white font-display tracking-wide group-hover/card:text-green-bright transition-colors duration-500">
              {nome}
            </h3>
            {featured && (
              <span className="animate-pulse text-green-bright">
                <Shield size={16} fill="currentColor" className="opacity-50" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse"></div>
            <p className="text-[11px] text-green-muted tracking-[3px] uppercase font-bold">Arquitetado por <span className="text-green-primary">{autor}</span></p>
          </div>
        </div>
        
        {rank_br && (
          <div className="shrink-0 flex flex-col items-end">
            <div className={`
              flex items-center gap-3 px-4 py-2 rounded-[1px] border font-display font-bold text-[11px] tracking-[2px] uppercase
              ${isTopRank
                ? 'bg-orange-primary/10 border-orange-primary/40 text-orange-primary shadow-[0_0_20px_rgba(200,138,26,0.15)]'
                : 'bg-green-primary/10 border-green-primary/40 text-green-bright'
              }
            `}>
              {isTopRank && <TrendingUp size={14} className="animate-bounce" />}
              Rank {rank_br} BR
            </div>
            {pit_maximo && (
              <span className="text-[10px] text-green-muted mt-2 font-mono tracking-widest uppercase flex items-center gap-2">
                <Swords size={12} /> Pit Tier {pit_maximo}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Linha 2: Tags - Elite Style */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8 relative z-10">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`
                text-[9px] tracking-[2px] uppercase px-3 py-1.5 rounded-[1px] border font-bold transition-all duration-300
                ${['Eagle Hall', 'Storm Feathers', 'Pit Push', 'Boss Killer'].includes(tag)
                  ? 'border-orange-primary/20 text-orange-primary bg-orange-primary/5 hover:border-orange-primary/40'
                  : 'border-green-border/40 text-green-muted bg-black/40 hover:border-green-primary/30 hover:text-green-primary'
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Linha 3: Stats Grid - Visual de Planner */}
      <div className="grid grid-cols-3 gap-1 mb-8 relative z-10 bg-black/60 border border-green-border/20 p-1">
        <div className="flex flex-col items-center py-4 bg-bg-card/50 border border-green-border/10">
          <span className="text-[9px] tracking-[3px] text-green-muted uppercase mb-2 font-bold">Paragon</span>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-green-primary opacity-40" />
            <span className="text-lg font-mono text-white font-bold">{paragon_minimo ?? '—'}</span>
          </div>
        </div>
        <div className="flex flex-col items-center py-4 bg-bg-card/50 border border-green-border/10">
          <span className="text-[9px] tracking-[3px] text-green-muted uppercase mb-2 font-bold">Dificuldade</span>
          <span className={`text-[11px] uppercase font-display font-bold tracking-widest ${
            dificuldade === 'Alta' ? 'text-red-500' : 'text-green-bright'
          }`}>{dificuldade ?? '—'}</span>
        </div>
        <div className="flex flex-col items-center py-4 bg-bg-card/50 border border-green-border/10">
          <span className="text-[9px] tracking-[3px] text-green-muted uppercase mb-2 font-bold">Season</span>
          <span className="text-lg font-mono text-green-primary font-bold">12</span>
        </div>
      </div>

      {/* Linha 4: Ações */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <Link
          href={`/builds/${slug}`}
          className="flex-[3] text-center py-4 text-[11px] tracking-[4px] uppercase font-display border border-green-primary/40 text-green-bright hover:bg-green-primary hover:text-white transition-all duration-500 rounded-[1px] group/btn overflow-hidden relative shadow-lg"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Analisar Arsenal <span className="group-hover:translate-x-2 transition-transform">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
        </Link>
        {video_url && (
          <a
            href={video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center py-4 border border-red-900/30 text-red-500 hover:bg-red-900 hover:text-white transition-all duration-500 rounded-[1px] shadow-lg"
            title="Ver Gameplay"
          >
            <Play size={18} fill="currentColor" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
