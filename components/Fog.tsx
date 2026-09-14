export default function Fog({ ember = false }: { ember?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`asilo-fog ${ember ? 'asilo-fog-ember' : ''}`} />
    </div>
  )
}
