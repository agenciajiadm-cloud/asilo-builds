import YouTubeEmbed from '@/components/YouTubeEmbed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lore · ASILO',
  description: 'História de Santuário, era por era — escrita do clã, imagens e cinemáticas oficiais em embed.',
}

function Era({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="relative py-20 md:py-28 border-t border-ember/30">
      <p className="font-display text-[11px] tracking-[0.35em] text-ember mb-4">{kicker}</p>
      <h2 className="font-display text-3xl md:text-5xl text-white mb-10 max-w-3xl">{title}</h2>
      <div className="max-w-2xl space-y-6 text-[17px] leading-8 text-bone/90">{children}</div>
    </section>
  )
}

function Plate({ caption }: { caption: string }) {
  return (
    <div className="my-12 max-w-3xl">
      <div className="h-48 md:h-72 border border-green-border/50 bg-[radial-gradient(ellipse_at_center,rgba(138,42,24,0.18),transparent_70%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay asilo-grain !relative !opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050605] to-transparent" />
      </div>
      <p className="mt-3 text-[12px] text-green-muted">{caption}</p>
    </div>
  )
}

export default function LorePage() {
  return (
    <div className="px-5 md:px-10 max-w-5xl mx-auto pb-32">
      <header className="pt-16 md:pt-28 pb-10">
        <p className="text-sm text-green-bright mb-6">A história</p>
        <h1 className="font-display text-4xl md:text-7xl text-white leading-[1.08] mb-8">
          Santuário não foi feito para nós.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-bone/80">
          Foi feito para esconder um pecado: um anjo e uma demônia geraram um mundo no meio da Guerra Eterna. Abaixo, a
          saga era por era — texto, imagem e as cinemáticas oficiais — pra quem quer entender o chão que pisa.
        </p>
      </header>

      <YouTubeEmbed id="0SSYzl9fXOQ" title="Diablo IV — cinematic de anúncio (BlizzCon 2019)" />

      <Era kicker="Antes dos jogos" title="Inarius, Lilith, o mundo-prisão">
        <p>
          A Guerra Eterna é o pano de fundo: Anu e Tathamet, Céu e Inferno, um conflito que não acaba porque nenhum dos dois lados consegue vencer de verdade.
          Inarius cansa. Lilith também. Os dois não fazem as pazes — fazem um filho ilegítimo chamado <em>mundo</em>.
        </p>
        <p>
          Santuário é um esconderijo. Humanos nascem da mistura: mortal, frágil, e perigoso demais para o equilíbrio.
          Lilith quer usar essa faísca. Inarius quer controlar. Nem um nem outro é salvador. O clã joga no meio.
        </p>
      </Era>

      <Plate caption="Silhueta — Mãe e o cego. Arte ASILO / paleta ember, sem still oficial." />

      <Era kicker="Diablo I · 1996" title="Tristram, a catedral, o Andarilho">
        <p>
          O primeiro jogo não explica o cosmos. Ele te joga numa cidade que apodreceu. O Arcebispo Lazarus abre o que não deveria.
          Diablo — o Terror — não invade o mundo com um exército: ele veste um homem.
        </p>
        <p>
          Aidan, o príncipe, vence o Senhor do Terror e comete o erro fundador da saga: crava a pedra da alma na própria testa.
          O herói vira o problema. Tudo que vem depois é consequência desse gesto.
        </p>
      </Era>

      <Era kicker="Diablo II · 2000" title="Os Três, o exílio, o Inferno">
        <p>
          Baal, Mefisto e Diablo andam de novo. O Andarilho Negro corta o continente. Amazonas, bárbaros, necromantes, paladinos, assassinas, druidas, feiticeiras — classes que o ASILO ainda discute como se fossem parentes.
        </p>
        <p>
          Lut-Halein, Kurast, as planícies do Inferno. O final não é paz: é um selo pior, um mundo que aprendeu o nome dos Males e não esqueceu.
        </p>
      </Era>

      <YouTubeEmbed id="UnF_5xJfe5k" title="Diablo IV — cinematic (The Game Awards 2022). Inarius contra Lilith." />

      <Era kicker="Diablo III · 2012" title="Céu aberto, pedra negra, Malthael">
        <p>
          Leah, Deckard Cain, os Nephalem sem disfarce. Diablo veste o Prime Evil inteiro. O Céu cai na terra.
          Reaper of Souls tira a máscara: Malthael, anjo da morte, decide que humanidade é o erro a ser apagado.
        </p>
        <p>
          É o capítulo mais “alto”: anjos na rua, fim do mundo. O D4 volta pro barro de propósito.
        </p>
      </Era>

      <Plate caption="Cinzas do Céu — transição para o tom do D4. Sem still da cinematic." />

      <Era kicker="Diablo IV · 2023" title="A filha volta">
        <p>
          Lilith emerge. Inarius prega. O lobo e o cego. Santuário não é campo de batalha distante: é vilarejo, lama, fé ruim.
          Vessel of Hatred / Lord of Hatred abre Nahantu e Skovos — e com Skovos a pergunta óbvia: cadê a Amazona?
        </p>
        <p>
          A resposta da Blizzard, em 2026: ela chega no primeiro semestre de 2027. Até lá o ASILO joga Paladino, Warlock, Spiritborn e o resto do roster no fosso.
        </p>
      </Era>

      <YouTubeEmbed id="HUDs8lEzR-E" title="Diablo IV — Story Launch Trailer oficial" />

      <Era kicker="Season 15 · 2026" title="Trinta anos, os Males de novo">
        <p>
          Hell’s Legacy é aniversário, não expansão. Ecos de Diablo, Baal e Mefisto. Uniques que o D2 ensinou a cobiçar.
          O clã trata isso como season pra rankear Pit — a Amazona espera 2027.
        </p>
      </Era>

      <YouTubeEmbed id="q_7AP2eou2A" title="BlizzCon 2026 — Diablo IV What’s Next (Amazon, S15)" />

      <Era kicker="Diablo V" title="Não tem data. Não inventamos.">
        <p>
          Quando a Blizzard anunciar, esta era ganha parágrafo e vídeo. Até lá, o próximo capítulo oficial do universo que jogamos é o class pack da Amazona e o que vier depois de Hatred.
        </p>
      </Era>
    </div>
  )
}
