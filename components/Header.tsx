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
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [path])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-colors duration-500 ${
        scrolled || open ? 'bg-[#050605]/90 border-b border-green-border/50' : 'bg-transparent border-b border-transparent'
      }`}
      style={{ paddingTop: 'max(10px, env(safe-area-inset-top))' }}
    >
      <div className="max-w-7xl mx-auto pl-2 pr-2 md:px-5 flex items-start gap-6 overflow-visible">
        <Link href="/" className="shrink-0 hover:scale-[1.03] transition-transform duration-300">
          <img
            src="/images/logo.png"
            alt="ASILO"
            className="w-[10.5rem] h-[10.5rem] md:w-[12.5rem] md:h-[12.5rem] rounded-full border border-green-primary/50 object-cover shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </Link>

        <nav className="hidden lg:flex ml-auto items-center gap-4 xl:gap-7 pt-3">
          {NAV.map((link) => {
            const active = path === link.href || (link.href !== '/' && path.startsWith(`${link.href}/`))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`asilo-nav ${active ? 'text-white' : 'text-bone/80'}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="lg:hidden ml-auto w-12 h-12 border border-green-border text-bone text-xl shrink-0"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-green-border/40 bg-[#050605] px-5 py-6 flex flex-col items-center gap-4 text-center">
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
