import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCORD_INVITE } from '@/lib/site'

export const metadata: Metadata = { title: 'Rank · ASILO' }

export default function RankPage() {
  return (
    <div className="px-5 max-w-3xl mx-auto pt-16 pb-32">
      <p className="text-sm text-orange-primary mb-4">Fosso</p>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8">Quem foi mais fundo nesta semana</h1>
      <p className="text-lg leading-8 text-bone/85 mb-10">
        É um mural do clã, não um filtro de entrada. Gravou a runa, manda no Discord. A Torre mundial da Blizzard ainda
        não tem um jeito limpo de puxar sozinha — no jogo, tecla Y.
      </p>
      <ol className="mb-14 border-y border-green-border/40 divide-y divide-green-border/30">
        {[
          ['Naotsonek TV', 127],
          ['Rob2628', 127],
          ['TiagoTrama', 118],
          ['xBR_Hunters', 111],
          ['Sagawine', 109],
        ].map(([n, p], i) => (
          <li key={String(n)} className="flex justify-between py-4">
            <span className="text-bone">
              <span className="text-green-muted mr-3">#{i + 1}</span>
              {n}
            </span>
            <span className="font-mono text-orange-primary">{p}</span>
          </li>
        ))}
      </ol>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-green-border/50 p-8">
          <h2 className="font-display text-2xl text-white mb-3">Mandar uma run</h2>
          <p className="text-bone/80 leading-7 mb-6">Vídeo no #📥-pit-submit. Classe, andar, tempo. A lista ao vivo liga em seguida.</p>
          <a href={DISCORD_INVITE} className="text-green-bright text-sm" target="_blank" rel="noreferrer">
            Abrir o Discord
          </a>
        </div>
        <div className="border border-green-border/30 p-8">
          <h2 className="font-display text-2xl text-white mb-3">Torre</h2>
          <p className="text-bone/80 leading-7">Por enquanto só no cliente. Se a Blizzard abrir os números, a gente coloca aqui.</p>
        </div>
      </div>
      <p className="mt-12 text-sm text-green-muted">
        Quer montar a personagem? <Link href="/planner" className="underline">Montador</Link>.
      </p>
    </div>
  )
}
