'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Shield, Swords, Zap, Info, 
  ChevronRight, TrendingUp, AlertTriangle, Ghost
} from 'lucide-react';
import Link from 'next/link';

const CLASSES = [
  { id: 'all', name: 'Todas', icon: null },
  { id: 'spiritborn', name: 'Spiritborn', icon: '/icons/classes/spiritborn.png' },
  { id: 'barbarian', name: 'Bárbaro', icon: '/icons/classes/barbarian.png' },
  { id: 'necromancer', name: 'Necromante', icon: '/icons/classes/necromancer.png' },
  { id: 'sorcerer', name: 'Feiticeira', icon: '/icons/classes/sorcerer.png' },
  { id: 'rogue', name: 'Ladina', icon: '/icons/classes/rogue.png' },
  { id: 'druid', name: 'Druida', icon: '/icons/classes/druid.png' },
];

const TIER_LIST_DATA = [
  {
    tier: 'S',
    color: 'text-orange-primary',
    builds: [
      { id: 1, name: 'Touch of Death', class: 'spiritborn', pit: 127, tags: ['Endgame', 'Meta'] },
      { id: 2, name: 'Blessed Shield', class: 'paladin', pit: 127, tags: ['Endgame', 'Tank'] },
      { id: 3, name: 'Pulverize', class: 'druid', pit: 118, tags: ['Endgame', 'AOE'] },
    ]
  },
  {
    tier: 'A',
    color: 'text-green-bright',
    builds: [
      { id: 4, name: 'Lunging Strike', class: 'barbarian', pit: 117, tags: ['Leveling', 'Fast'] },
      { id: 5, name: 'Golem', class: 'necromancer', pit: 116, tags: ['Summon', 'Lazy'] },
      { id: 6, name: 'HotA', class: 'barbarian', pit: 116, tags: ['Endgame', 'Boss'] },
    ]
  },
  {
    tier: 'B',
    color: 'text-green-muted',
    builds: [
      { id: 7, name: 'Shadowblight', class: 'necromancer', pit: 115, tags: ['PVP', 'DOT'] },
      { id: 8, name: 'Twisting Blades', class: 'rogue', pit: 114, tags: ['Leveling', 'Active'] },
    ]
  }
];

export default function TierList() {
  const [selectedClass, setSelectedClass] = useState('all');

  const filteredTiers = useMemo(() => {
    if (selectedClass === 'all') return TIER_LIST_DATA;
    return TIER_LIST_DATA.map(tier => ({
      ...tier,
      builds: tier.builds.filter(b => b.class === selectedClass)
    })).filter(tier => tier.builds.length > 0);
  }, [selectedClass]);

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-40 relative overflow-hidden pattern-overlay">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-24 space-y-8">
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-green-primary/40"></div>
            <span className="text-[11px] tracking-[8px] text-green-bright uppercase font-display font-bold">
              Meta · S15
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-green-primary/40"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tight text-white leading-none drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            Arsenal de Elite
          </h1>
          <p className="text-[14px] text-text-secondary uppercase tracking-[4px] max-w-2xl mx-auto leading-relaxed">
            As builds mais letais do servidor brasileiro, ranqueadas pela Tropa de Elite do ASILO.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          {/* Sidebar Classes */}
          <aside className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[4px] text-green-muted font-bold mb-8 px-4">Filtrar por Classe</h3>
            {CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 border transition-all duration-300 rounded-[2px] ${
                  selectedClass === cls.id
                    ? 'bg-green-primary/10 border-green-primary/50 text-green-bright shadow-[0_0_15px_rgba(58,138,24,0.15)]'
                    : 'bg-bg-card/40 border-green-border/40 text-green-muted hover:border-green-primary/30 hover:text-green-primary'
                }`}
              >
                {cls.icon && <img src={cls.icon} alt={cls.name} className="w-5 h-5 object-contain" />}
                {!cls.icon && <Star size={16} />}
                <span className="text-[10px] tracking-[3px] uppercase font-display font-bold">{cls.name}</span>
              </button>
            ))}
          </aside>

          {/* Tier List Content */}
          <main className="space-y-12">
            {filteredTiers.length > 0 ? (
              filteredTiers.map((tier) => (
                <div key={tier.tier} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className={`text-6xl font-display font-black ${tier.color} drop-shadow-[0_0_15px_rgba(200,138,26,0.3)]`}>
                      {tier.tier}
                    </div>
                    <div className="flex-grow h-px bg-gradient-to-r from-green-border/40 to-transparent"></div>
                    <span className="text-[10px] tracking-[4px] text-green-muted uppercase font-bold">Potencial Máximo</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {tier.builds.map((build) => (
                      <Link 
                        key={build.id}
                        href={`/builds/${build.name.toLowerCase().replace(/ /g, '-')}`}
                        className="brutal-card p-6 flex items-center justify-between hover:bg-green-primary/5 group"
                      >
                        <div className="flex items-center gap-8">
                          <div className="w-12 h-12 bg-black border border-green-border/40 flex items-center justify-center text-green-primary">
                            <Swords size={20} />
                          </div>
                          <div>
                            <h4 className="text-lg text-white font-display uppercase tracking-wider group-hover:text-green-bright transition-colors">
                              {build.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-green-muted uppercase tracking-widest">{build.class}</span>
                              <div className="w-1 h-1 rounded-full bg-green-border"></div>
                              <span className="text-[10px] text-orange-primary uppercase tracking-widest font-bold">Pit {build.pit}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="hidden md:flex gap-2">
                            {build.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-black/40 border border-green-border/20 text-[8px] uppercase tracking-widest text-green-muted">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <ChevronRight size={18} className="text-green-muted group-hover:text-green-bright group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-40 brutal-card">
                <Ghost size={48} className="text-green-muted/20 mx-auto mb-6" />
                <p className="text-[12px] text-green-muted uppercase tracking-[4px]">Nenhuma build encontrada neste tier.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
