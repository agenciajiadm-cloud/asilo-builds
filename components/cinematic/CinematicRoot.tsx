'use client'

import { useEffect, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/gsap'

function GsapLenisBridge() {
  const lenis = useLenis()

  useEffect(() => {
    registerGsap()
    if (!lenis) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      lenis.stop()
      return
    }

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
    }
  }, [lenis])

  return null
}

function Grain() {
  return <div className="asilo-grain" aria-hidden />
}

export default function CinematicRoot({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.1, smoothWheel: true, autoRaf: false }}>
      <GsapLenisBridge />
      <Grain />
      {children}
    </ReactLenis>
  )
}
