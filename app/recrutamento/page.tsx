'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Swords, User, Zap, MessageSquare, 
  Send, ChevronRight, Trophy, Star, Target
} from 'lucide-react';
import Link from 'next/link';

export default function RecruitmentPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    battletag: '',
    discordId: '',
    classe: 'spiritborn',
    pitTier: '',
    paragon: '',
    experience: '',
    whyAsilo: ''
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        size: 1 + (i % 3),
        left: (i * 13.7) % 100,
        top: (i * 23.3) % 100,
        duration: 4 + (i % 6),
        delay: (i * 0.5) % 4,
      })),
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full diablo-border p-16 text-center bg-bg-card/80 backdrop-blur-xl relative z-10"
        >
          <div className="w-24 h-24 bg-green-primary/20 rounded-full flex items-center justify-center text-green-bright mx-auto mb-10 border border-green-primary/40 shadow-[0_0_30px_rgba(58,138,24,0.3)]">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl font-display text-white uppercase tracking-[8px] mb-6">Candidatura Enviada</h1>
          <p className="text-[14px] text-green-muted uppercase tracking-[3px] leading-loose mb-12">
            Seu perfil será analisado pelo Conselho de Elite do ASILO. <br/>
            Fique atento ao seu Discord.
          </p>
          <Link 
            href="/"
            className="inline-block px-12 py-5 bg-green-primary text-white text-[11px] tracking-[4px] uppercase font-display hover:bg-green-bright hover:shadow-[0_0_40px_rgba(90,184,42,0.4)] transition-all duration-500 rounded-[2px]"
          >
            Voltar ao Arsenal
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-40 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-green-primary/40"></div>
            <span className="text-[11px] tracking-[8px] text-green-bright uppercase font-display font-bold">
              Recrutamento de Elite
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-green-primary/40"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-white uppercase tracking-[12px] mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
            ASILO ALIANÇA
          </h1>
          <p className="text-[14px] text-green-muted uppercase tracking-[4px] max-w-2xl mx-auto leading-relaxed">
            Buscamos os jogadores mais dedicados, técnicos e competitivos do Brasil. <br/>
            Preencha os requisitos para ser avaliado.
          </p>
        </motion.div>

        <div className="diablo-border bg-bg-card/40 backdrop-blur-xl p-8 md:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <ShieldCheck size={200} />
          </div>

          <form onSubmit={handleSubmit} className="relative z-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-12 diablo-border flex items-center justify-center text-green-bright">
                      <User size={24} />
                    </div>
                    <h2 className="text-xs font-display uppercase tracking-[0.5em] text-green-primary">Identidade no Santuário</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">BattleTag</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Player#1234"
                        value={formData.battletag}
                        onChange={(e) => setFormData({...formData, battletag: e.target.value})}
                        className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Discord ID</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: player_discord"
                        value={formData.discordId}
                        onChange={(e) => setFormData({...formData, discordId: e.target.value})}
                        className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button 
                      type="button"
                      onClick={handleNext}
                      className="px-12 py-4 bg-green-primary/10 border border-green-primary/40 text-green-bright text-[11px] tracking-[4px] uppercase font-display hover:bg-green-primary hover:text-white transition-all duration-500 shadow-xl flex items-center gap-4"
                    >
                      Próximo Passo <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-12 diablo-border flex items-center justify-center text-green-bright">
                      <Swords size={24} />
                    </div>
                    <h2 className="text-xs font-display uppercase tracking-[0.5em] text-green-primary">Arsenal e Performance</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Classe Principal</label>
                      <select 
                        value={formData.classe}
                        onChange={(e) => setFormData({...formData, classe: e.target.value})}
                        className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all appearance-none"
                      >
                        <option value="spiritborn">Spiritborn</option>
                        <option value="barbarian">Bárbaro</option>
                        <option value="necromancer">Necromante</option>
                        <option value="sorcerer">Feiticeira</option>
                        <option value="rogue">Ladina</option>
                        <option value="druid">Druida</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Pit Tier Máximo (Solo)</label>
                      <input 
                        required
                        type="number" 
                        placeholder="Ex: 110"
                        value={formData.pitTier}
                        onChange={(e) => setFormData({...formData, pitTier: e.target.value})}
                        className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Nível de Paragon</label>
                    <input 
                      required
                      type="number" 
                      placeholder="Ex: 300"
                      value={formData.paragon}
                      onChange={(e) => setFormData({...formData, paragon: e.target.value})}
                      className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all placeholder:text-white/10"
                    />
                  </div>

                  <div className="flex justify-between pt-8">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="px-8 py-4 border border-green-border/40 text-green-muted text-[11px] tracking-[4px] uppercase font-display hover:text-green-primary transition-all duration-500"
                    >
                      Voltar
                    </button>
                    <button 
                      type="button"
                      onClick={handleNext}
                      className="px-12 py-4 bg-green-primary/10 border border-green-primary/40 text-green-bright text-[11px] tracking-[4px] uppercase font-display hover:bg-green-primary hover:text-white transition-all duration-500 shadow-xl flex items-center gap-4"
                    >
                      Próximo Passo <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-12 diablo-border flex items-center justify-center text-green-bright">
                      <Target size={24} />
                    </div>
                    <h2 className="text-xs font-display uppercase tracking-[0.5em] text-green-primary">Legado e Motivação</h2>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Experiência em Diablo</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Conte sobre sua trajetória em Diablo (D2, D3, D4, rankings etc.)"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all placeholder:text-white/10 resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Por que o ASILO?</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="O que você busca ao entrar no clã mais ativo do Brasil?"
                      value={formData.whyAsilo}
                      onChange={(e) => setFormData({...formData, whyAsilo: e.target.value})}
                      className="w-full bg-black/40 border border-green-border/40 p-5 text-white text-sm tracking-widest focus:border-green-primary focus:outline-none transition-all placeholder:text-white/10 resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-8">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="px-8 py-4 border border-green-border/40 text-green-muted text-[11px] tracking-[4px] uppercase font-display hover:text-green-primary transition-all duration-500"
                    >
                      Voltar
                    </button>
                    <button 
                      type="submit"
                      className="px-16 py-5 bg-green-primary text-white text-[11px] tracking-[5px] uppercase font-display hover:bg-green-bright hover:shadow-[0_0_50px_rgba(90,184,42,0.5)] transition-all duration-500 shadow-2xl flex items-center gap-4 group"
                    >
                      Enviar Candidatura <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: Trophy, title: 'Rankings', desc: 'Estamos no topo dos rankings brasileiros de performance.' },
            { icon: Zap, title: 'Conhecimento', desc: 'Acesso a canais exclusivos com os melhores teóricos do clã.' },
            { icon: Star, title: 'Prestígio', desc: 'Faça parte da maior autoridade em Diablo 4 no Brasil.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="diablo-border p-8 text-center bg-black/20"
            >
              <item.icon size={32} className="text-green-primary mx-auto mb-6 opacity-40" />
              <h3 className="text-[11px] tracking-[4px] text-green-bright uppercase font-bold mb-4">{item.title}</h3>
              <p className="text-[10px] tracking-[2px] text-green-muted uppercase leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
