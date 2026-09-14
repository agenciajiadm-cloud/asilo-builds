import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE = 'asilo_gate'
const PASS = process.env.TIER_GATE_PASSWORD || '#00010001'
const SECRET = process.env.TIER_GATE_SECRET || 'asilo-gate-hmac'

function token() {
  return createHmac('sha256', SECRET).update('ok').digest('hex')
}

export function checkPassword(input: string) {
  const a = Buffer.from(input)
  const b = Buffer.from(PASS)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function isGated() {
  const jar = await cookies()
  const v = jar.get(COOKIE)?.value
  if (!v) return false
  const t = token()
  try {
    return timingSafeEqual(Buffer.from(v), Buffer.from(t))
  } catch {
    return false
  }
}

export async function setGateCookie() {
  const jar = await cookies()
  jar.set(COOKIE, token(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })
}

export async function clearGateCookie() {
  const jar = await cookies()
  jar.delete(COOKIE)
}

export function gateKey() {
  return PASS
}
