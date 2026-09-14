import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'Doação ainda não está ligada. Falta a chave Stripe no servidor.' },
      { status: 503 },
    )
  }

  const body = await req.json().catch(() => ({}))
  const amount = Number(body.amount)
  if (!Number.isFinite(amount) || amount < 1 || amount > 5000) {
    return NextResponse.json({ error: 'Escolhe um valor entre R$ 1 e R$ 5.000.' }, { status: 400 })
  }

  const origin = new URL(req.url).origin
  const stripe = new Stripe(key)
  const cents = Math.round(amount * 100)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${origin}/?doacao=ok`,
    cancel_url: `${origin}/#doar`,
    integration_identifier: 'asilo-donate-kqmwrpzx',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'brl',
          unit_amount: cents,
          product_data: {
            name: 'Doação ASILO',
            description: 'Apoio ao site do clã — ferramentas e manutenção.',
          },
        },
      },
    ],
  })

  return NextResponse.json({ url: session.url })
}
