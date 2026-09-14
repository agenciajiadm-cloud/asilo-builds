import HomeHero from '@/components/HomeHero'
import HomeTier from '@/components/tier/HomeTier'
import OfficialCarousel from '@/components/OfficialCarousel'
import DonateBox from '@/components/DonateBox'
import { TIER_SEED } from '@/data/d4/tier-seed'
import { supabase } from '@/lib/supabase'
import type { TierBuild } from '@/lib/tier'

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
      <OfficialCarousel />
      <DonateBox />
    </div>
  )
}
