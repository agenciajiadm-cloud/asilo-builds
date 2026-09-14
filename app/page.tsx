import Image from 'next/image'
import Fog from '@/components/Fog'
import HomeHero from '@/components/HomeHero'
import HomeTier from '@/components/tier/HomeTier'
import { TIER_SEED } from '@/data/d4/tier-seed'
import { supabase } from '@/lib/supabase'
import type { TierBuild } from '@/lib/tier'

const OFFICIAL_ART =
  'https://bnetcmsus-a.akamaihd.net/cms/blog_header/y8/Y8RG9OJG3CVA1767892964876.png'
const OFFICIAL_HREF =
  'https://news.blizzard.com/pt-br/article/24247514/domine-a-torre-e-as-tabelas-de-classificacao-beta'

async function loadTier(): Promise<TierBuild[]> {
  const { data, error } = await supabase.from('tier_builds').select('*').order('sort', { ascending: true })
  if (!error && data && data.length > 0) return data as TierBuild[]
  return TIER_SEED
}

export default async function Home() {
  const rows = await loadTier()
  return (
    <div className="relative">
      <HomeHero />

      <section className="relative overflow-hidden border-b border-green-border/40">
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
          <HomeTier initial={rows} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Fog ember />
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
          <p className="font-display text-sm tracking-[0.2em] text-[#c88a1a] mb-6">ARTE OFICIAL</p>
          <a href={OFFICIAL_HREF} target="_blank" rel="noreferrer" className="block group relative aspect-[21/9] w-full overflow-hidden border border-[rgba(138,42,24,0.35)]">
            <Image
              src={OFFICIAL_ART}
              alt="Diablo IV — arte oficial da Torre (notícias Blizzard)"
              fill
              sizes="100vw"
              className="object-cover object-center mix-blend-luminosity group-hover:mix-blend-normal"
            />
          </a>
          <p className="mt-4 text-xs text-green-muted">
            Imagem publicada no{' '}
            <a href={OFFICIAL_HREF} className="text-green-bright underline" target="_blank" rel="noreferrer">
              blog oficial da Blizzard
            </a>
            . Não rehosteamos cinemática.
          </p>
        </div>
      </section>
    </div>
  )
}
