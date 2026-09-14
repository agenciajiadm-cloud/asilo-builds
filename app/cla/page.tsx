import type { Metadata } from 'next'
import Link from 'next/link'
import { DISCORD_INVITE, WHATSAPP } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Clã · ASILO',
  description: 'Lar Recreativo de Idosos — Discord, WhatsApp, regras e como entrar.',
}

export default function ClaPage() {
  return (
    <div className="px-5 max-w-3xl mx-auto pt-16 pb-32">
      <p className="font-display text-[11px] tracking-[0.35em] text-green-bright mb-5">Clã</p>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8">Lar Recreativo de Idosos</h1>
      <p className="text-lg leading-8 text-bone/85 mb-12">
        ASILO não é lista de Discord. É gente que joga fosso alto, ensina build e não trata recruta como lixo.
        O site é a vitrine. O servidor é a casa.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noreferrer"
          className="text-center px-8 py-4 bg-green-primary text-white font-display tracking-[0.2em] uppercase text-[11px] hover:bg-green-bright"
        >
          Discord eterno
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="text-center px-8 py-4 border border-green-primary/50 text-green-bright font-display tracking-[0.2em] uppercase text-[11px]"
        >
          WhatsApp
        </a>
      </div>

      <section className="space-y-6 text-[16px] leading-8 text-bone/90 border-t border-green-border/40 pt-12">
        <h2 className="font-display text-2xl text-white">Como entrar</h2>
        <p>
          Convite que não expira: {DISCORD_INVITE.replace('https://', '')}. Lê <strong>📜-regras</strong>, abre{' '}
          <strong>🎫-ticket-membro</strong>, faz a entrevista. Recruta não pede cargo de classe pro bot — vocês já têm tag.
        </p>
        <h2 className="font-display text-2xl text-white pt-6">O que o clã te dá</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Rank de Pit do ASILO (vídeo no Discord, officer valida, sobe no site)</li>
          <li>Salas por classe: guia ≠ build</li>
          <li>Alertas automáticos de Helltide, World Boss, Legion (bot Helltides + feeds do Rob e do Sanctuary)</li>
          <li>Builds do clã no site, não só print no chat</li>
        </ul>
        <h2 className="font-display text-2xl text-white pt-6">Regras curtas</h2>
        <p>
          Respeito. Sem cheat. Trade honesto. Rank só com vídeo sem corte. Política e ódio saem da voice.
          O texto completo está pinado no Discord.
        </p>
        <p className="pt-4">
          Candidatura formal também existe em <Link href="/recrutamento" className="text-green-bright underline">/recrutamento</Link>.
        </p>
      </section>
    </div>
  )
}
