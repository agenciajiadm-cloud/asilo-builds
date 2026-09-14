import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCORD_INVITE } from '@/lib/site'

export const metadata: Metadata = { title: 'Rank · ASILO' }

export default function RankPage() {
  return (
    <div className="px-5 max-w-3xl mx-auto pt-16 pb-32">
      <p className="font-display text-[11px] tracking-[0.35em] text-orange-primary mb-5">Rank</p>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8">Fosso do clã. Torre, não ainda.</h1>
      <p className="text-lg leading-8 text-bone/85 mb-10">
        Pit é ASILO: você grava, manda em <strong>#📥-pit-submit</strong>, officer valida, a lista sobe aqui.
        Torre mundial da Blizzard não tem API pública. Datamine não traz leaderboard. Scrape da Helltides bate em Cloudflare e
        ainda assim seria o rank <em>deles</em>, não o da Blizzard.
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
          <h2 className="font-display text-2xl text-white mb-3">Pit · clã</h2>
          <p className="text-bone/80 leading-7 mb-6">Vídeo sem corte. Classe, tier, tempo. Lista ao vivo entra quando a fila do Discord ligar no Supabase.</p>
          <a href={DISCORD_INVITE} className="text-green-bright text-[11px] font-display tracking-[0.2em] uppercase" target="_blank" rel="noreferrer">
            Submeter run
          </a>
        </div>
        <div className="border border-green-border/30 p-8 opacity-80">
          <h2 className="font-display text-2xl text-white mb-3">Torre</h2>
          <p className="text-bone/80 leading-7">Fora do v1 mundial. No jogo: tecla Y / Collections. Se a Blizzard abrir endpoint, a gente pluga. Até lá, sem mentira de “automático”.</p>
        </div>
      </div>
      <p className="mt-12 text-sm text-green-muted">
        Builds S/A/B por classe ficam em <Link href="/planner" className="underline">Planner</Link> e no arsenal, não misturadas com Pit.
      </p>
    </div>
  )
}
