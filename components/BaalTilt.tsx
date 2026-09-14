'use client'

import { useEffect, useRef } from 'react'

export default function BaalTilt() {
  const wrap = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = wrap.current
    const face = img.current
    if (!el || !face) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      face.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.04)`
    }
    const onLeave = () => {
      face.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrap} className="relative h-[64vh] md:h-[86vh] -mr-10 md:-mr-24 scale-[1.12] origin-right" style={{ perspective: '1000px' }}>
      <img
        ref={img}
        src="/images/baal.png"
        alt="Baal"
        className="absolute inset-0 w-full h-full object-contain object-right drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)] will-change-transform"
        style={{ transformOrigin: '55% 42%', transition: 'transform 0.16s ease-out' }}
      />
    </div>
  )
}
