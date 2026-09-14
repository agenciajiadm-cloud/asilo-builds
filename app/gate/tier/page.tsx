import { redirect } from 'next/navigation'
import { isGated } from '@/lib/gate'
import GateTier from './GateTierClient'

export default async function Page() {
  if (!(await isGated())) redirect('/gate')
  return <GateTier />
}
