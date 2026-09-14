'use client'

export default function SkillIcon({
  src,
  classSrc,
  name,
  size = 72,
}: {
  src: string
  classSrc?: string
  name: string
  size?: number
}) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className="block object-contain"
      style={{ width: size, height: size, imageRendering: 'auto' }}
      onError={(e) => {
        const el = e.currentTarget
        if (classSrc && el.src !== classSrc) {
          el.src = classSrc
          return
        }
        if (!el.src.endsWith('fallback.svg')) el.src = '/icons/skills/fallback.svg'
      }}
    />
  )
}
