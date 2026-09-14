import { NextResponse } from 'next/server'
import { clearGateCookie } from '@/lib/gate'

export async function POST() {
  await clearGateCookie()
  return NextResponse.json({ ok: true })
}
