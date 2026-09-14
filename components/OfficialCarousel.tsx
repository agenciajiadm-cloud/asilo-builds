'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const SLIDES = [
  {
    src: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/y8/Y8RG9OJG3CVA1767892964876.png',
    href: 'https://news.blizzard.com/pt-br/article/24247514/domine-a-torre-e-as-tabelas-de-classificacao-beta',
    alt: 'Torre e tabelas de classificação',
  },
  {
    src: 'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blte7cc54a2440b93ae/6a8c98451deff35d1f438f90/d4_s15_masthead_2600.webp?format=webp',
    href: 'https://diablo4.blizzard.com/pt-br/upcoming',
    alt: 'Season of Hell’s Legacy',
  },
  {
    src: 'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt27a73f189178b304/6a8c9831c751e181c80c4e74/d4_s15_newthisseason_echoes.webp?format=webp',
    href: 'https://diablo4.blizzard.com/pt-br/upcoming',
    alt: 'Echoes of Evil',
  },
  {
    src: 'https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt4f3c0acf67d486b4/6a8c983132e6028e2fc0d9f0/d4_s15_seasonfeatures_nightmares.webp?format=webp',
    href: 'https://diablo4.blizzard.com/pt-br/upcoming',
    alt: 'Nightmares of the Past',
  },
]

export default function OfficialCarousel() {
  const [i, setI] = useState(0)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5200)
    return () => window.clearInterval(t)
  }, [reduce])

  const slide = SLIDES[i]

  return (
    <section className="relative overflow-hidden border-t border-green-border/40">
      <div className="max-w-7xl mx-auto px-5 py-8 md:py-12">
        <p className="font-display text-sm tracking-[0.2em] text-[#c88a1a] mb-5">ARTE OFICIAL</p>
        <a href={slide.href} target="_blank" rel="noreferrer" className="asilo-art block relative aspect-[21/9] w-full overflow-hidden border border-[rgba(138,42,24,0.35)] hover:border-[rgba(200,138,26,0.55)]">
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
          />
        </a>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-green-muted">
            Publicada pela Blizzard.{' '}
            <a href={slide.href} className="text-green-bright underline" target="_blank" rel="noreferrer">
              Fonte
            </a>
          </p>
          <div className="flex gap-2">
            {SLIDES.map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`Arte ${n + 1}`}
                onClick={() => setI(n)}
                className={`h-1.5 w-8 ${n === i ? 'bg-[#c88a1a]' : 'bg-green-border'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
