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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'bg-[#050605]/90 border-b border-green-border/50' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-[5.25rem] flex items-center gap-8">
        <Link href="/" id="asilo-brand">
          <img id="asilo-logo" src="/images/d4-1.png" alt="" width={52} height={52} />
          <span id="asilo-wordmark">ASILO</span>
        </Link>

        <nav className="hidden lg:flex ml-auto items-center gap-4 xl:gap-7">
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
          className="lg:hidden ml-auto w-12 h-12 border border-green-border text-bone text-xl"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '×' : '☰'}
        </button>
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
