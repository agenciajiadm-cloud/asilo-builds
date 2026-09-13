'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0c09]/90 backdrop-blur-xl border-b border-[#1a2a10] shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-4'
          : 'bg-transparent py-6'
      }`}
      style={{ minHeight: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full" style={{ minHeight: '80px' }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-green-primary/20 blur-md rounded-full group-hover:bg-green-primary/40 transition-colors"></div>
            <img
              src="/images/logo.png"
              alt="ASILO"
              className="w-14 h-14 relative z-10 rounded-full border border-green-primary/30 bg-bg-primary/50"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[28px] font-display font-black tracking-[6px] text-white group-hover:text-green-bright transition-colors leading-none">
              ASILO
            </span>
            <span className="text-[11px] tracking-[3px] text-green-muted uppercase font-display mt-0.5">
              Lar Recreativo de Idosos
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Arsenal', href: '/' },
            { label: 'Tier List', href: '/tierlist' },
            { label: 'Build Planner', href: '/planner' },
            { label: 'Recrutamento', href: '/recrutamento' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] tracking-[3px] uppercase font-display font-bold text-green-muted hover:text-green-bright transition-colors duration-200 relative group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-bright transition-all duration-300 group-hover/link:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Discord CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://discord.com/invite/4jhsRbrQ"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex px-8 py-3 text-[11px] tracking-[3px] uppercase font-display font-bold border border-green-primary/40 bg-green-primary/10 text-green-bright hover:bg-green-primary hover:text-white transition-all duration-300 rounded-[2px] shadow-[0_0_20px_rgba(58,138,24,0.1)]"
          >
            Discord
          </a>
        </div>

      </div>
    </header>
  )
}
