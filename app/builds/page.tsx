'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import BuildCard from '@/components/BuildCard'
import ClassTabs from '@/components/ClassTabs'
import RankingSidebar from '@/components/RankingSidebar'
import { staggerContainer } from '@/lib/animations'

type BuildCardData = {
  slug: string
  nome: string
  autor: string
  classe: string
  pit_maximo: number | null
  paragon_minimo: number | null
  dificuldade: string | null
  tags: string[]
  video_url: string | null
  featured: boolean
  rank_br: number | null
}

export default function BuildsPage() {
  const [classeAtiva, setClasseAtiva] = useState('spiritborn')
  const [builds, setBuilds] = useState<BuildCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)

        let classeId: number | null = null
        if (classeAtiva !== 'all') {
          const { data: classe } = await supabase
            .from('classes')
            .select('id')
            .eq('slug', classeAtiva)
            .single()
          classeId = classe?.id ?? null
        }

        const baseQuery = supabase
          .from('builds')
          .select(`
            slug, nome, pit_maximo, paragon_minimo, dificuldade,
            tags, video_url, featured, rank_br,
            membros!autor_id ( nome ),
            classes!classe_id ( slug )
          `)
          .eq('publicado', true)

        const { data } =
          classeId !== null
            ? await baseQuery
                .eq('classe_id', classeId)
                .order('rank_br', { ascending: true })
            : await baseQuery.order('rank_br', { ascending: true })

        type SupabaseBuildRow = {
          slug: string
          nome: string
          pit_maximo: number | null
          paragon_minimo: number | null
          dificuldade: string | null
          tags: string[] | null
          video_url: string | null
          featured: boolean | null
          rank_br: number | null
          membros?: { nome: string | null } | null
          classes?: { slug: string } | null
        }

        const mapped: BuildCardData[] = ((data ?? []) as unknown as SupabaseBuildRow[]).map((b) => ({
          slug: b.slug,
          nome: b.nome,
          autor: b.membros?.nome ?? 'ASILO',
          classe: b.classes?.slug ?? '',
          pit_maximo: b.pit_maximo ?? null,
          paragon_minimo: b.paragon_minimo ?? null,
          dificuldade: b.dificuldade ?? null,
          tags: b.tags ?? [],
          video_url: b.video_url ?? null,
          featured: Boolean(b.featured),
          rank_br: b.rank_br ?? null,
        }))

        setBuilds(mapped)
      } catch (e) {
        console.error('Falha ao carregar builds', e)
        setBuilds([])
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [classeAtiva])

  return (
    <main className="min-h-screen pt-20 bg-bg-primary">
      <div className="py-16 text-center border-b border-green-border/40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl text-green-primary tracking-[12px] uppercase mb-4"
        >
          BUILDS
        </motion.h1>
        <div className="shimmer-line h-[1px] w-24 mx-auto mb-4" />
        <p className="text-[10px] tracking-[3px] text-green-muted uppercase">
          Verificadas por jogadores top ranked do servidor brasileiro
        </p>

        <div className="mt-6">
          <ClassTabs activeTab={classeAtiva} setActiveTab={setClasseAtiva} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div>
            <p className="text-[9px] tracking-[4px] text-green-muted uppercase mb-5 pb-3 border-b border-green-border/40">
              Builds verificadas
            </p>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="h-40 bg-bg-card border border-green-border rounded-[2px] animate-pulse"
                  />
                ))}
              </div>
            ) : builds.length === 0 ? (
              <p className="text-[12px] text-green-muted py-10 text-center">
                Nenhuma build publicada para esta classe ainda.
              </p>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {builds.map((build) => (
                  <BuildCard key={build.slug} {...build} />
                ))}
              </motion.div>
            )}

            <div className="text-center mt-10">
              <Link
                href="/"
                className="inline-block px-8 py-3 text-[10px] tracking-[4px] uppercase font-serif border border-green-border text-green-primary hover:border-green-primary hover:bg-bg-card transition-all duration-200 rounded-[2px]"
              >
                Voltar para a Home →
              </Link>
            </div>
          </div>

          <aside className="space-y-5">
            <RankingSidebar />

            <div className="bg-bg-card border border-green-border rounded-[2px] p-4">
              <div className="text-[9px] tracking-[4px] text-green-muted uppercase mb-4 pb-2 border-b border-green-border">
                Comunidade
              </div>
              <div className="space-y-2 text-[11px] text-green-muted mb-4">
                <div>50+ membros ativos</div>
                <div>Paragon 300 verificados</div>
                <div>Top 5 ranking mundial</div>
              </div>
              <div className="space-y-2">
                <a
                  href="https://discord.com/invite/4jhsRbrQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 text-[9px] tracking-[2px] uppercase border border-green-primary bg-green-primary/10 text-green-primary hover:bg-green-primary hover:text-white transition-all duration-200 rounded-[1px]"
                >
                  Entrar no Discord
                </a>
                <a
                  href="https://chat.whatsapp.com/HDtn7oE0JZxE5tOKiFwelH?mode=gi_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2 text-[9px] tracking-[2px] uppercase border border-green-border bg-bg-primary text-green-primary hover:bg-bg-card hover:text-green-bright transition-all duration-200 rounded-[1px]"
                >
                  Grupo WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

