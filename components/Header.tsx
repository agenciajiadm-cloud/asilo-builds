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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-[#050605]/95 border-b border-green-border/60' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <img
            src="/images/logo.png"
            alt=""
            className="w-11 h-11 rounded-full border border-green-primary/40 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="font-display text-xl tracking-[0.12em] text-white">ASILO</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {NAV.map((link) => {
            const active = path === link.href || (link.href !== '/' && path.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] ${
                  active ? 'text-green-bright' : 'text-green-muted hover:text-bone'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cla"
            className="hidden sm:inline-flex px-5 py-2 text-sm border border-green-primary/50 text-green-bright hover:bg-green-primary hover:text-white"
          >
            Jogar com a gente
          </Link>
          <button
            type="button"
            className="lg:hidden w-10 h-10 border border-green-border text-bone"
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
            <Link key={link.href} href={link.href} className="text-bone">
              {link.label}
            </Link>
          ))}
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="text-green-bright font-display tracking-[0.18em] uppercase">
            Discord
          </a>
        </div>
      )}
    </header>
  )
}
