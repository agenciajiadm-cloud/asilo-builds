import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCORD_INVITE, WHATSAPP } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Clã · ASILO',
  description: 'Lar Recreativo de Idosos — Discord, WhatsApp e como jogar junto.',
}

export default function ClaPage() {
  return (
    <div className="px-5 max-w-3xl mx-auto pt-16 pb-32">
      <p className="text-sm text-green-bright mb-4">O clã</p>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8">Lar Recreativo de Idosos</h1>
      <p className="text-lg leading-8 text-bone/85 mb-12">
        Um grupo de gente que gosta de Diablo. A gente monta build, conta a história do jogo, avisa Helltide e joga
        junto. Se você está começando ou já vive no Santuário, o convite é o mesmo.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noreferrer"
          className="text-center px-8 py-4 bg-green-primary text-white text-sm"
        >
          Entrar no Discord
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="text-center px-8 py-4 border border-green-primary/50 text-green-bright text-sm"
        >
          WhatsApp
        </a>
      </div>

      <section className="space-y-6 text-[16px] leading-8 text-bone/90 border-t border-green-border/40 pt-12">
        <h2 className="font-display text-2xl text-white">Como chegar</h2>
        <p>
          Convite permanente: {DISCORD_INVITE.replace('https://', '')}. Lê as regras, abre um ticket se quiser tag de
          membro. Sem pressa.
        </p>
        <h2 className="font-display text-2xl text-white pt-6">O que tem no servidor</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Salas por classe — guia da personagem separado da build da season</li>
          <li>Alertas de Helltide, World Boss e Legion</li>
          <li>Montador e builds no site, pra não ficar só no print</li>
          <li>Corridas de Fosso pra quem quiser gravar e aparecer no rank</li>
        </ul>
        <h2 className="font-display text-2xl text-white pt-6">O combinado</h2>
        <p>Respeito, jogo limpo, trade honesto. O resto está pinado no Discord.</p>
        <p className="pt-4">
          Formulário extra em <Link href="/recrutamento" className="text-green-bright underline">/recrutamento</Link>, se
          preferir escrever antes de entrar na call.
        </p>
      </section>
    </div>
  )
}
