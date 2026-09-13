'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, scaleIn } from '@/lib/animations'

const CLASSES = [
  { id: 'all', nome: 'Todos', icon: null },
  { id: 'spiritborn', nome: 'Spiritborn', icon: '/icons/classes/spiritborn.png' },
  { id: 'paladin', nome: 'Paladino', icon: '/icons/classes/paladin.png' },
  { id: 'barbarian', nome: 'Bárbaro', icon: '/icons/classes/barbarian.png' },
  { id: 'necromancer', nome: 'Necromante', icon: '/icons/classes/necromancer.png' },
  { id: 'druid', nome: 'Druida', icon: '/icons/classes/druid.png' },
  { id: 'sorcerer', nome: 'Feiticeira', icon: '/icons/classes/sorcerer.png' },
  { id: 'rogue', nome: 'Ladino', icon: '/icons/classes/rogue.png' },
]

interface ClassTabsProps {
  activeTab: string
  setActiveTab: (id: string) => void
}

export default function ClassTabs({ activeTab, setActiveTab }: ClassTabsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
    >
      {CLASSES.map((cls) => (
        <motion.button
          key={cls.id}
          variants={scaleIn}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(cls.id)}
          className={`
            group relative flex items-center gap-4 px-6 py-3 border transition-all duration-500 rounded-[2px] overflow-hidden cursor-pointer
            ${activeTab === cls.id
              ? 'bg-green-primary/10 border-green-primary/50 text-green-bright shadow-[0_0_20px_rgba(58,138,24,0.2)]'
              : 'bg-bg-card/40 border-green-border/40 text-green-muted hover:border-green-primary/30 hover:text-green-primary'
            }
          `}
        >
          {/* Active Background Glow */}
          {activeTab === cls.id && (
            <motion.div 
              layoutId="activeTabGlow"
              className="absolute inset-0 bg-green-primary/5 pointer-events-none"
            />
          )}

          {cls.icon ? (
            <div className="relative shrink-0">
              <img 
                src={cls.icon} 
                alt={cls.nome} 
                className={`w-6 h-6 object-contain relative z-10 transition-all duration-500 ${activeTab === cls.id ? 'opacity-100 scale-110' : 'opacity-30 group-hover:opacity-60'}`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<div class="w-6 h-6 flex items-center justify-center border border-green-border/40 rounded-sm bg-black/40"><div class="w-2 h-2 rounded-full bg-green-primary ${activeTab === cls.id ? 'opacity-100' : 'opacity-30'}"></div></div>`;
                }}
              />
              {activeTab === cls.id && (
                <motion.div 
                  layoutId="iconGlow"
                  className="absolute inset-[-4px] bg-green-primary/20 blur-[8px] rounded-full z-0"
                />
              )}
            </div>
          ) : (
            <div className="w-6 h-6 flex items-center justify-center border border-green-border/40 bg-black/40 shrink-0">
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeTab === 'all' ? 'bg-green-bright scale-125 shadow-[0_0_8px_rgba(90,184,42,0.6)]' : 'bg-green-muted opacity-40'}`}></div>
            </div>
          )}
          
          <span className={`text-[10px] tracking-[4px] uppercase font-display font-bold transition-colors duration-500 ${activeTab === cls.id ? 'text-green-bright' : 'text-green-muted group-hover:text-green-primary'}`}>
            {cls.nome}
          </span>

          {/* Bottom Active Indicator */}
          {activeTab === cls.id && (
            <motion.div 
              layoutId="activeTabLine"
              className="absolute bottom-0 left-0 w-full h-0.5 bg-green-bright shadow-[0_0_10px_rgba(90,184,42,0.8)]"
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  )
}
