'use client'

import { useState } from 'react'
import TierBoard from '@/components/tier/TierBoard'
import type { ListKind, TierBuild } from '@/lib/tier'

export default function HomeTier({ initial }: { initial: TierBuild[] }) {
  const [kind, setKind] = useState<ListKind>('endgame')
  return <TierBoard rows={initial} kind={kind} onKind={setKind} />
}
