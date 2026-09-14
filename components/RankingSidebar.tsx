'use client'

import Link from 'next/link'
import { DISCORD_INVITE } from '@/lib/site'

interface RankingItem {
  posicao: number
  player_name: string
  pit_nivel: number
}

const MOCK_TOP = [
  { posicao: 1, player_name: 'Naotsonek TV', pit_nivel: 127 },
  { posicao: 2, player_name: 'Rob2628', pit_nivel: 127 },
  { posicao: 3, player_name: 'TiagoTrama', pit_nivel: 118 },
  { posicao: 4, player_name: 'xBR_Hunters', pit_nivel: 111 },
  { posicao: 5, player_name: 'Sagawine', pit_nivel: 109 },
]

export default function RankingSidebar({ rankings = [] }: { rankings?: RankingItem[] }) {
  const list = rankings.length > 0 ? rankings : MOCK_TOP
  return (
    <div className="border border-green-border/40 p-8">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl text-white">Fosso da semana</h2>
        <Link href="/rank" className="text-[10px] tracking-[0.16em] uppercase text-orange-primary">
          Rank
        </Link>
      </div>
      <ol className="space-y-3">
        {list.map((rank) => (
          <li key={rank.posicao} className="flex justify-between text-sm">
            <span className="text-bone/80">
              <span className="text-green-muted mr-2">#{rank.posicao}</span>
              {rank.player_name}
            </span>
            <span className="font-mono text-orange-primary">{rank.pit_nivel}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs leading-6 text-green-muted">
        Lista de quem mandou vídeo.{' '}
        <a href={DISCORD_INVITE} className="text-green-bright" target="_blank" rel="noreferrer">
          Submeter
        </a>
      </p>
    </div>
  )
}
