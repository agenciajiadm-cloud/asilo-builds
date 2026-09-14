'use client'

import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      h.style.setProperty('--scroll', String(p))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return <div className="asilo-progress" aria-hidden />
}
