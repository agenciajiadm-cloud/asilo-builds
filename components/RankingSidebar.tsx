'use client'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Shield, Swords, UserPlus, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface RankingItem {
  posicao: number
  player_name: string
  pit_nivel: number
}

interface RankingSidebarProps {
  rankings?: RankingItem[]
}

const MOCK_TOP = [
  { posicao: 1, player_name: 'Naotsonek TV', pit_nivel: 127 },
  { posicao: 2, player_name: 'Rob2628', pit_nivel: 127 },
  { posicao: 3, player_name: 'TiagoTrama', pit_nivel: 118 },
  { posicao: 4, player_name: 'xBR_Hunters', pit_nivel: 111 },
  { posicao: 5, player_name: 'Sagawine', pit_nivel: 109 },
]

export default function RankingSidebar({ rankings = [] }: RankingSidebarProps) {
  const displayRankings = rankings.length > 0 ? rankings : MOCK_TOP

  return (
    <div className="space-y-8">

      {/* Ranking Card */}
      <div className="brutal-card p-10 space-y-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
          <Trophy size={160} />
        </div>

        <div className="flex items-center justify-between border-b border-green-border/20 pb-8 relative z-10">
          <div className="flex items-center gap-4">
            <Trophy size={20} className="text-orange-primary" />
            <h2 className="text-[12px] font-display uppercase tracking-[4px] text-white font-black">
              Elite Rank <span className="text-orange-primary ml-1">Pit</span>
            </h2>
          </div>
          <TrendingUp size={16} className="text-green-muted" />
        </div>

        <div className="space-y-4 relative z-10">
          {displayRankings.map((rank, i) => (
            <motion.div
              key={rank.posicao}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`
                flex items-center justify-between p-4 border transition-all duration-300
                ${i === 0
                  ? 'bg-orange-primary/5 border-orange-primary/20 text-orange-primary shadow-[0_0_20px_rgba(200,138,26,0.05)]'
                  : 'bg-black/20 border-green-border/20 text-text-secondary hover:border-green-primary/30'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-display font-black w-6 ${i === 0 ? 'text-orange-primary' : 'text-green-muted'}`}>
                  #{rank.posicao}
                </span>
                <span className={`text-[11px] uppercase tracking-wider font-bold ${i === 0 ? 'text-white' : ''}`}>
                  {rank.player_name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Swords size={12} className="opacity-40" />
                <span className={`text-[11px] font-mono font-bold ${i === 0 ? 'text-orange-primary' : 'text-green-bright'}`}>
                  {rank.pit_nivel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-green-border/20 relative z-10">
          <div className="flex items-center gap-4 px-4 py-3 bg-green-primary/5 border border-green-primary/20 text-[9px] uppercase tracking-widest text-green-muted italic">
            <Shield size={14} className="shrink-0" />
            <span>Dados verificados em tempo real pela Tropa de Elite ASILO.</span>
          </div>
        </div>
      </div>

      {/* Recrutamento Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="brutal-card p-8 space-y-6 border border-green-primary/20 bg-green-primary/[0.03] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-[0.04]">
          <UserPlus size={80} />
        </div>

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-bright animate-pulse" />
            <span className="text-[9px] uppercase tracking-[4px] text-green-bright font-bold">
              Recrutamento Ativo
            </span>
          </div>
          <h3 className="text-[16px] font-display font-black uppercase tracking-wide text-white">
            Junte-se ao ASILO
          </h3>
        </div>

        <p className="text-[12px] text-text-secondary leading-relaxed tracking-wide relative z-10">
          Buscamos os melhores jogadores do Brasil.<br />
          <span className="text-green-muted">Pit 100+, dedicados.</span>
        </p>

        <div className="flex flex-col gap-3 relative z-10">
          <Link href="/recrutamento"
            className="flex items-center justify-center gap-3 px-6 py-3 bg-green-primary text-white text-[10px] tracking-[4px] uppercase font-display font-bold hover:bg-green-bright hover:shadow-[0_0_30px_rgba(90,184,42,0.4)] transition-all duration-300 rounded-[2px]">
            <UserPlus size={14} />
            Candidatar-se →
          </Link>
          <a href="https://discord.com/invite/4jhsRbrQ" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-3 border border-green-primary/40 text-green-bright text-[10px] tracking-[4px] uppercase font-display font-bold hover:bg-green-primary/10 transition-all duration-300 rounded-[2px]">
            <MessageCircle size={14} />
            Entrar no Discord →
          </a>
        </div>
      </motion.div>

    </div>
  )
}
