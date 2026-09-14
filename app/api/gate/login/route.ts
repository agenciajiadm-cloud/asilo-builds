import { NextResponse } from 'next/server'
import { checkPassword, setGateCookie } from '@/lib/gate'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const password = String(body.password || '')
  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  await setGateCookie()
  return NextResponse.json({ ok: true })
}
