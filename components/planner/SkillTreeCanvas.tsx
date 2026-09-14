'use client'

import { useMemo, useRef, useState } from 'react'
import {
  type SkillTree,
  bump,
  canIncrement,
  matchesSearch,
  spent,
  SKILL_BUDGET,
} from '@/lib/d4-tree'

type Props = {
  tree: SkillTree
  ranks: Record<number, number>
  onRanks: (r: Record<number, number>) => void
}

export default function SkillTreeCanvas({ tree, ranks, onRanks }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [q, setQ] = useState('')
  const [cam, setCam] = useState({ x: 0, y: 0, k: 1 })
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null)

  const { minX, maxX, minY, maxY } = tree.bounds
  const w = Math.max(maxX - minX, 1)
  const h = Math.max(maxY - minY, 1)
  const pad = 80

  const pos = useMemo(() => {
    const m = new Map<number, { x: number; y: number }>()
    for (const n of tree.nodes) {
      m.set(n.i, { x: n.x - minX + pad, y: maxY - n.y + pad })
    }
    return m
  }, [tree, minX, maxY, pad])

  const vb = `0 0 ${w + pad * 2} ${h + pad * 2}`
  const used = spent(ranks)
  const hovered = tree.nodes.find((n) => n.i === hover)

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 0.92 : 1.08
    setCam((c) => ({ ...c, k: Math.min(2.4, Math.max(0.35, c.k * factor)) }))
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <p className="text-[13px] text-[#c8d4b8]">
          Pontos <span className="text-[#e8b86a] font-display text-lg">{SKILL_BUDGET - used}</span>
          <span className="text-[#7a7670]"> / {SKILL_BUDGET}</span>
        </p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar skill…"
          className="flex-1 min-w-[160px] bg-[#101014] border border-[#2a2a33] rounded-sm px-3 py-1.5 text-sm outline-none focus:border-[#3a8a18]"
        />
        <button type="button" className="text-[12px] text-[#8a8680]" onClick={() => onRanks({})}>
          Reset
        </button>
      </div>
      <div
        ref={wrap}
        className="relative h-[min(72vh,760px)] overflow-hidden border border-[rgba(58,138,24,0.25)] bg-[#080908] cursor-grab active:cursor-grabbing"
        onWheel={onWheel}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('[data-node]')) return
          drag.current = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y }
          ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!drag.current) return
          setCam((c) => ({
            ...c,
            x: drag.current!.cx + (e.clientX - drag.current!.x),
            y: drag.current!.cy + (e.clientY - drag.current!.y),
          }))
        }}
        onPointerUp={() => {
          drag.current = null
        }}
      >
        <svg
          viewBox={vb}
          className="absolute inset-0 h-full w-full"
          style={{ transform: `translate(${cam.x}px,${cam.y}px) scale(${cam.k})`, transformOrigin: 'center center' }}
        >
          {tree.edges.map(([a, b]) => {
            const pa = pos.get(a)
            const pb = pos.get(b)
            if (!pa || !pb) return null
            const live = (ranks[a] || 0) > 0 && (ranks[b] || 0) > 0
            const dead =
              tree.nodes.find((n) => n.i === a)?.exclusive != null &&
              tree.nodes.some(
                (n) =>
                  n.i !== a &&
                  n.exclusive === tree.nodes.find((x) => x.i === a)?.exclusive &&
                  (ranks[n.i] || 0) > 0,
              )
            return (
              <line
                key={`${a}-${b}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={dead ? 'rgba(138,42,24,0.55)' : live ? 'rgba(90,184,42,0.7)' : 'rgba(200,212,184,0.18)'}
                strokeWidth={live ? 22 : 12}
              />
            )
          })}
          {tree.nodes.map((n) => {
            const p = pos.get(n.i)
            if (!p) return null
            const r = n.kind === 'cluster' ? 210 : n.kind === 'skill' ? 150 : 78
            const rank = ranks[n.i] || 0
            const on = rank > 0
            const hit = q.trim() && matchesSearch(n, q)
            const dim = q.trim() && !hit
            const ok = n.kind !== 'cluster' && canIncrement(tree, ranks, n.i)
            const fill = on ? '#1e3a10' : n.kind === 'cluster' ? '#121510' : '#101014'
            const stroke = on ? '#5ab82a' : hit ? '#c88a1a' : ok ? '#3a8a18' : '#2a2a33'
            return (
              <g
                key={n.i}
                data-node
                transform={`translate(${p.x},${p.y})`}
                opacity={dim ? 0.22 : 1}
                className="cursor-pointer"
                onPointerEnter={() => setHover(n.i)}
                onPointerLeave={() => setHover((h) => (h === n.i ? null : h))}
                onClick={(e) => {
                  e.stopPropagation()
                  onRanks(bump(tree, ranks, n.i, 1))
                }}
                onContextMenu={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onRanks(bump(tree, ranks, n.i, -1))
                }}
              >
                {n.kind === 'mod' ? (
                  <rect x={-r} y={-r} width={r * 2} height={r * 2} fill={fill} stroke={stroke} strokeWidth={10} />
                ) : (
                  <circle r={r} fill={fill} stroke={stroke} strokeWidth={n.kind === 'cluster' ? 14 : 10} />
                )}
                {n.kind !== 'mod' && (
                  <text
                    textAnchor="middle"
                    y={14}
                    fill="#c8d4b8"
                    fontSize={n.kind === 'cluster' ? 42 : 36}
                    style={{ fontFamily: 'var(--font-body)', pointerEvents: 'none' }}
                  >
                    {n.kind === 'cluster' ? n.label : rank ? `${rank}/${n.maxRank}` : ''}
                  </text>
                )}
                {n.kind === 'skill' && !rank && (
                  <text
                    textAnchor="middle"
                    y={14}
                    fill="#7a7670"
                    fontSize={32}
                    style={{ fontFamily: 'var(--font-body)', pointerEvents: 'none' }}
                  >
                    {n.label.split(' ')[0]}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
        {hovered && (
          <div className="pointer-events-none absolute left-3 bottom-3 max-w-sm border border-[rgba(58,138,24,0.35)] bg-[#050605]/95 px-3 py-2">
            <p className="font-display text-[#e8b86a] text-sm">{hovered.label}</p>
            <p className="text-[11px] text-[#9a958c] mt-1">
              {hovered.kind === 'skill' && 'Skill · clique soma rank · direito tira'}
              {hovered.kind === 'mod' && 'Modificador · grupo exclusivo quando houver'}
              {hovered.kind === 'cluster' && 'Raiz do grupo — não gasta ponto'}
            </p>
            {(ranks[hovered.i] || 0) > 0 && hovered.kind === 'skill' && (
              <p className="text-[11px] text-[#5ab82a] mt-1">
                {ranks[hovered.i]}/{hovered.maxRank}
              </p>
            )}
          </div>
        )}
      </div>
      <p className="text-[11px] text-[#7a7670] mt-2">Arrasta o mapa · scroll zoom · clique aloca · direito remove.</p>
    </div>
  )
}
