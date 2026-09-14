'use client'

const CLASSES = [
  { id: 'all', nome: 'Todos' },
  { id: 'spiritborn', nome: 'Spiritborn' },
  { id: 'paladin', nome: 'Paladino' },
  { id: 'barbarian', nome: 'Bárbaro' },
  { id: 'necromancer', nome: 'Necromante' },
  { id: 'druid', nome: 'Druida' },
  { id: 'sorcerer', nome: 'Feiticeira' },
  { id: 'rogue', nome: 'Ladina' },
  { id: 'warlock', nome: 'Warlock' },
]

export default function ClassTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CLASSES.map((cls) => (
        <button
          key={cls.id}
          type="button"
          onClick={() => setActiveTab(cls.id)}
          className={`px-3 py-2 border text-[10px] tracking-[0.16em] uppercase font-display ${
            activeTab === cls.id ? 'border-green-primary text-green-bright' : 'border-green-border/40 text-green-muted'
          }`}
        >
          {cls.nome}
        </button>
      ))}
    </div>
  )
}
