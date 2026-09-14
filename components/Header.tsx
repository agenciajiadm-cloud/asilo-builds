'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DISCORD_INVITE, NAV } from '@/lib/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [path])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-colors duration-300 ${
        scrolled || open ? 'bg-[#050605]/95 border-b border-green-border/60' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-24 flex items-center justify-between gap-4 overflow-visible">
        <Link href="/" className="relative flex items-center gap-3 min-w-0 z-20">
          <img
            src="/images/logo.png"
            alt="ASILO"
            className="relative -my-10 w-28 h-28 md:w-36 md:h-36 rounded-full border border-green-primary/50 object-cover shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="font-display font-bold text-4xl md:text-5xl tracking-[0.1em] text-white">ASILO</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
          {NAV.map((link) => {
            const active = path === link.href || (link.href !== '/' && path.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-nav text-[17px] xl:text-[18px] font-bold ${
                  active ? 'text-white' : 'text-bone/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cla" className="btn-d4 btn-d4-fill hidden sm:inline-flex min-h-11 px-5 text-[12px]">
            Jogar com a gente
          </Link>
          <button
            type="button"
            className="lg:hidden w-12 h-12 border border-green-border text-bone text-xl"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-green-border/40 bg-[#050605] px-5 py-6 flex flex-col gap-4">
          {NAV.map((link) => (
            <Link key={link.href} href={link.href} className="font-nav text-xl font-bold text-bone">
              {link.label}
            </Link>
          ))}
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="text-green-bright font-nav text-lg">
            Discord
          </a>
        </div>
      )}
    </header>
  )
}
