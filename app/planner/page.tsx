'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Shield, Swords, Zap, Save, Layers, Plus, Trash2, PlayCircle, ExternalLink
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const CLASSES = [
  { id: 'spiritborn', name: 'Spiritborn', icon: '/icons/classes/spiritborn.png' },
  { id: 'barbarian', name: 'Bárbaro', icon: '/icons/classes/barbarian.png' },
  { id: 'necromancer', name: 'Necromante', icon: '/icons/classes/necromancer.png' },
  { id: 'sorcerer', name: 'Feiticeira', icon: '/icons/classes/sorcerer.png' },
  { id: 'rogue', name: 'Ladina', icon: '/icons/classes/rogue.png' },
  { id: 'druid', name: 'Druida', icon: '/icons/classes/druid.png' },
];

const GEAR_SLOTS = [
  { id: 'helm', name: 'Capacete' },
  { id: 'chest', name: 'Peitoral' },
  { id: 'gloves', name: 'Luvas' },
  { id: 'pants', name: 'Calças' },
  { id: 'boots', name: 'Botas' },
  { id: 'amulet', name: 'Amuleto' },
  { id: 'ring1', name: 'Anel 1' },
  { id: 'ring2', name: 'Anel 2' },
  { id: 'main_hand', name: 'Arma Principal' },
  { id: 'off_hand', name: 'Arma Secundária' },
  { id: 'offhand', name: 'Offhand' },
];

const SKILL_CATEGORIES = [
  { id: 'basic', label: 'Básica', dot: '#3a8a18', hasUpgrades: true, maxPts: 5 },
  { id: 'core', label: 'Principal', dot: '#6aaa2a', hasUpgrades: true, maxPts: 5 },
  { id: 'defense', label: 'Defesa', dot: '#4a7a24', hasUpgrades: true, maxPts: 5 },
  { id: 'potency', label: 'Potência', dot: '#4a7a24', hasUpgrades: true, maxPts: 5 },
  { id: 'ultimate', label: 'Ultimate', dot: '#8a6a10', hasUpgrades: true, maxPts: 1 },
];

function makeSkill(category: string, maxPts: number) {
  return { category, nome: '', pontos: 1, maxPts, aprimorado: '', avanco_a: '', avanco_b: '' };
}

function makePassiva() {
  return { nome: '', pontos: 1 };
}

function makeBoard() {
  return { nome: '', glifo: '' };
}

function getYoutubeId(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function BuildPlanner() {
  const [activeTab, setActiveTab] = useState('gear');
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);

  // Gear state: each slot has 4 stats + 1 aspecto + 1 tempera
  const [gear, setGear] = useState<Record<string, { stats: string[]; aspecto: string; tempera: string }>>(
    () => Object.fromEntries(GEAR_SLOTS.map(s => [s.id, { stats: ['', '', '', ''], aspecto: '', tempera: '' }]))
  );

  // Skills state
  const [skills, setSkills] = useState(
    SKILL_CATEGORIES.map(cat => makeSkill(cat.id, cat.maxPts))
  );
  const [passivas, setPassivas] = useState([makePassiva()]);

  // Paragon state
  const [boards, setBoards] = useState([makeBoard()]);

  // Showcase state
  const [showcaseUrl, setShowcaseUrl] = useState('');
  const [showcaseDesc, setShowcaseDesc] = useState('');

  // Descrição da build
  const [descricao, setDescricao] = useState('');

  // Submission
  const [submission, setSubmission] = useState({
    playerName: '', characterName: '', buildName: '', version: 'S12', key: ''
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null);

  const youtubeId = getYoutubeId(showcaseUrl);

  function updateGear(slotId: string, field: 'aspecto' | 'tempera', value: string) {
    setGear(g => ({ ...g, [slotId]: { ...g[slotId], [field]: value } }));
  }

  function updateGearStat(slotId: string, i: number, value: string) {
    setGear(g => {
      const stats = [...g[slotId].stats];
      stats[i] = value;
      return { ...g, [slotId]: { ...g[slotId], stats } };
    });
  }

  function updateSkill(idx: number, field: string, value: string | number) {
    setSkills(s => s.map((sk, i) => i === idx ? { ...sk, [field]: value } : sk));
  }

  function updatePassiva(idx: number, field: string, value: string | number) {
    setPassivas(p => p.map((ps, i) => i === idx ? { ...ps, [field]: value } : ps));
  }

  function updateBoard(idx: number, field: string, value: string) {
    setBoards(b => b.map((bd, i) => i === idx ? { ...bd, [field]: value } : bd));
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submission.key !== 'ASILO.2026') { alert('Chave secreta inválida!'); return; }
    setSaving(true);
    try {
      const slug = toSlug(submission.buildName);
      const { error } = await supabase.from('public_builds').insert([{
        player_name: submission.playerName,
        character_name: submission.characterName,
        build_name: submission.buildName,
        slug,
        version: submission.version,
        class_id: selectedClass.id,
        build_data: { gear, skills, passivas, boards },
        descricao: descricao || null,
        showcase_url: showcaseUrl || null,
        showcase_descricao: showcaseDesc || null,
        created_at: new Date().toISOString(),
      }]);
      if (error) throw error;
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const inputGreen = "w-full bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[11px] px-3 py-2 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3a10] tracking-wide";
  const inputOrange = "w-full bg-[#0a0c09] border border-[#3a2800] text-[#8a5a0a] text-[11px] px-3 py-2 focus:border-[#8a5a0a] focus:outline-none placeholder:text-[#3a2800] tracking-wide";

  return (
    <div className="min-h-screen bg-bg-primary pt-36 pb-40 relative overflow-hidden pattern-overlay">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-green-primary/10 border border-green-primary/30 text-green-bright text-[10px] font-bold uppercase tracking-[0.4em]">
              Build Planner · v2.0
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-white leading-none">
              Crie Seu Arsenal
            </h1>
            <p className="text-[13px] text-text-secondary uppercase tracking-[4px] leading-relaxed">
              Configure sua build de elite e compartilhe com o clã ASILO.
            </p>
          </div>

          {/* Class Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls)}
                className={`group relative p-4 border transition-all duration-300 rounded-[2px] ${
                  selectedClass.id === cls.id
                    ? 'bg-green-primary/10 border-green-primary/50 text-green-bright shadow-[0_0_20px_rgba(58,138,24,0.2)]'
                    : 'bg-bg-card/40 border-green-border/40 text-green-muted hover:border-green-primary/30'
                }`}
              >
                <img src={cls.icon} alt={cls.name} className={`w-8 h-8 object-contain transition-all duration-300 ${selectedClass.id === cls.id ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'}`} />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{cls.name}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Main Planner */}
          <main className="brutal-card p-8 md:p-10 space-y-12">

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-green-border/20 overflow-x-auto">
              {[
                { id: 'gear', label: 'Equipamento', icon: Swords },
                { id: 'skills', label: 'Habilidades', icon: Zap },
                { id: 'paragon', label: 'Paragon', icon: Layers },
                { id: 'showcase', label: 'Showcase', icon: PlayCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-2 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-green-bright' : 'text-green-muted hover:text-green-primary'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-0.5 bg-green-bright shadow-[0_0_10px_rgba(90,184,42,0.8)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              <AnimatePresence mode="wait">

                {/* ABA 1 — EQUIPAMENTO */}
                {activeTab === 'gear' && (
                  <motion.div key="gear" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GEAR_SLOTS.map((slot) => (
                      <div key={slot.id} className="bg-[#0c0f0a] border border-[#1a2a10] p-4 space-y-3">
                        <div className="text-[8px] uppercase tracking-[3px] text-[#2a5a12] font-bold border-b border-[#1a2a10] pb-2">
                          {slot.name}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[0, 1, 2, 3].map((i) => (
                            <input key={i} type="text" placeholder={`Stat ${i + 1}`} value={gear[slot.id]?.stats[i] || ''}
                              onChange={(e) => updateGearStat(slot.id, i, e.target.value)}
                              className={inputGreen} />
                          ))}
                        </div>
                        <input type="text" placeholder="Aspecto ou Unique" value={gear[slot.id]?.aspecto || ''}
                          onChange={(e) => updateGear(slot.id, 'aspecto', e.target.value)}
                          className={inputOrange} />
                        <input type="text" placeholder="Tempera" value={gear[slot.id]?.tempera || ''}
                          onChange={(e) => updateGear(slot.id, 'tempera', e.target.value)}
                          className={inputOrange} />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* ABA 2 — HABILIDADES */}
                {activeTab === 'skills' && (
                  <motion.div key="skills" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="space-y-8">

                    {SKILL_CATEGORIES.map((cat, catIdx) => {
                      const skill = skills[catIdx];
                      const pts = Array.from({ length: cat.maxPts }, (_, i) => i + 1);
                      return (
                        <div key={cat.id} className="space-y-2">
                          <div className="text-[8px] uppercase tracking-[4px] text-[#2a5a12] font-bold pb-2 border-b border-[#1a2a10]">
                            {cat.label}
                          </div>
                          <div className="bg-[#0c0f0a] border border-[#1a2a10] overflow-hidden">
                            {/* Skill main row */}
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#0f1a0a]">
                              <div className="w-7 h-7 bg-[#1a3a0a] border border-[#2a6a14] rounded-[2px] shrink-0" />
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.dot }} />
                              <input type="text" placeholder={`Nome da habilidade ${cat.label.toLowerCase()}`}
                                value={skill.nome}
                                onChange={(e) => updateSkill(catIdx, 'nome', e.target.value)}
                                className="flex-1 bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[11px] px-2 py-1 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3010]" />
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[8px] text-[#2a5a12] uppercase tracking-[1px]">pts</span>
                                <select value={skill.pontos} onChange={(e) => updateSkill(catIdx, 'pontos', Number(e.target.value))}
                                  className="bg-[#0a0c09] border border-[#1a2a10] text-[#4a9a24] text-[11px] px-1 py-1 focus:outline-none w-12">
                                  {pts.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                              </div>
                            </div>
                            {/* Upgrades */}
                            {cat.hasUpgrades && (
                              <div className="px-3 py-2 bg-[#0a0f0a] space-y-1.5 pl-12">
                                {/* Aprimorado */}
                                <div className="flex items-center gap-2">
                                  <div className="w-3.5 h-px bg-[#1a3010] shrink-0" />
                                  <span className="text-[8px] uppercase tracking-[1px] text-[#1e4010] shrink-0 w-14">Aprimorado</span>
                                  <input type="text" placeholder="Nome do avanço aprimorado" value={skill.aprimorado}
                                    onChange={(e) => updateSkill(catIdx, 'aprimorado', e.target.value)}
                                    className="flex-1 bg-[#0a0c09] border border-[#0f1a0a] text-[#5a8a2a] text-[10px] px-2 py-1 focus:outline-none placeholder:text-[#1a3010]" />
                                  <span className="text-[10px] text-[#3a6a18] bg-[#0a0c09] border border-[#0f1a0a] px-2 py-1 shrink-0">1</span>
                                </div>
                                {/* Avanço A */}
                                <div className="flex items-center gap-2">
                                  <div className="w-3.5 h-px bg-[#1a3010] shrink-0" />
                                  <span className="text-[8px] uppercase tracking-[1px] text-[#1e4010] shrink-0 w-14">Avanço A</span>
                                  <input type="text" placeholder="Nome do avanço A" value={skill.avanco_a}
                                    onChange={(e) => updateSkill(catIdx, 'avanco_a', e.target.value)}
                                    className="flex-1 bg-[#0a0c09] border border-[#0f1a0a] text-[#5a8a2a] text-[10px] px-2 py-1 focus:outline-none placeholder:text-[#1a3010]" />
                                  <span className="text-[10px] text-[#3a6a18] bg-[#0a0c09] border border-[#0f1a0a] px-2 py-1 shrink-0">1</span>
                                </div>
                                <div className="text-[8px] text-[#1a3010] tracking-[2px] pl-[78px]">ou</div>
                                {/* Avanço B */}
                                <div className="flex items-center gap-2">
                                  <div className="w-3.5 h-px bg-[#1a3010] shrink-0" />
                                  <span className="text-[8px] uppercase tracking-[1px] text-[#1e4010] shrink-0 w-14">Avanço B</span>
                                  <input type="text" placeholder="Nome do avanço B" value={skill.avanco_b}
                                    onChange={(e) => updateSkill(catIdx, 'avanco_b', e.target.value)}
                                    className="flex-1 bg-[#0a0c09] border border-[#0f1a0a] text-[#5a8a2a] text-[10px] px-2 py-1 focus:outline-none placeholder:text-[#1a3010]" />
                                  <span className="text-[10px] text-[#3a6a18] bg-[#0a0c09] border border-[#0f1a0a] px-2 py-1 shrink-0">1</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Passivas */}
                    <div className="space-y-2">
                      <div className="text-[8px] uppercase tracking-[4px] text-[#2a5a12] font-bold pb-2 border-b border-[#1a2a10]">
                        Passivas
                      </div>
                      {passivas.map((p, i) => (
                        <div key={i} className="bg-[#0c0f0a] border border-[#1a2a10] flex items-center gap-2 px-3 py-2">
                          <div className="w-7 h-7 bg-[#0f1a0a] border border-[#1a3010] rounded-[2px] shrink-0" />
                          <div className="w-2 h-2 rounded-full bg-[#2a4a18] shrink-0" />
                          <input type="text" placeholder="Nome da passiva" value={p.nome}
                            onChange={(e) => updatePassiva(i, 'nome', e.target.value)}
                            className="flex-1 bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[11px] px-2 py-1 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3010]" />
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[8px] text-[#2a5a12] uppercase">pts</span>
                            <select value={p.pontos} onChange={(e) => updatePassiva(i, 'pontos', Number(e.target.value))}
                              className="bg-[#0a0c09] border border-[#1a2a10] text-[#4a9a24] text-[11px] px-1 py-1 focus:outline-none w-12">
                              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                          </div>
                          {passivas.length > 1 && (
                            <button onClick={() => setPassivas(ps => ps.filter((_, j) => j !== i))}
                              className="text-red-900/60 hover:text-red-500 transition-colors shrink-0">
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => setPassivas(ps => [...ps, makePassiva()])}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-green-muted hover:text-green-bright transition-colors pt-1">
                        <Plus size={12} /> Adicionar passiva
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ABA 3 — PARAGON */}
                {activeTab === 'paragon' && (
                  <motion.div key="paragon" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="space-y-4">
                    <p className="text-[10px] text-green-muted uppercase tracking-[3px]">Rota de Paragon — até 6 boards</p>
                    {boards.map((board, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input type="text" placeholder={`Nome do board (ex: Board Inicial)`} value={board.nome}
                          onChange={(e) => updateBoard(i, 'nome', e.target.value)}
                          className="flex-1 bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[11px] px-3 py-2.5 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3010]" />
                        <span className="text-green-border text-sm">→</span>
                        <input type="text" placeholder="Glifo principal + nível (ex: Apostle Nv 21)" value={board.glifo}
                          onChange={(e) => updateBoard(i, 'glifo', e.target.value)}
                          className="flex-1 bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[11px] px-3 py-2.5 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3010]" />
                        {boards.length > 1 && (
                          <button onClick={() => setBoards(bs => bs.filter((_, j) => j !== i))}
                            className="text-red-900/60 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    {boards.length < 6 && (
                      <button onClick={() => setBoards(bs => [...bs, makeBoard()])}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-green-muted hover:text-green-bright transition-colors pt-2">
                        <Plus size={12} /> Adicionar Board
                      </button>
                    )}
                  </motion.div>
                )}

                {/* ABA 4 — SHOWCASE */}
                {activeTab === 'showcase' && (
                  <motion.div key="showcase" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold flex items-center gap-2">
                        <PlayCircle size={14} className="text-red-500" />
                        Link do Vídeo (YouTube)
                      </label>
                      <input type="url" placeholder="https://youtube.com/watch?v=..." value={showcaseUrl}
                        onChange={(e) => setShowcaseUrl(e.target.value)}
                        className="w-full bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[12px] px-4 py-3 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3010]" />
                    </div>

                    {youtubeId && (
                      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                        className="relative border border-[#1a2a10] overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                          alt="Thumbnail do showcase"
                          className="w-full object-cover"
                        />
                        <a href={showcaseUrl} target="_blank" rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors group">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors shadow-2xl">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white ml-1" />
                          </div>
                        </a>
                      </motion.div>
                    )}

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">
                        Descrição do Showcase
                      </label>
                      <textarea rows={5} placeholder="Descreva como a build performa no vídeo..."
                        value={showcaseDesc}
                        onChange={(e) => setShowcaseDesc(e.target.value)}
                        className="w-full bg-[#0a0c09] border border-[#1a2a10] text-[#8ab84a] text-[12px] px-4 py-3 focus:border-[#3a8a18] focus:outline-none placeholder:text-[#1a3010] resize-none" />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </main>

          {/* Sidebar — Formulário de Submissão */}
          <aside className="space-y-10">
            <div className="brutal-card p-10 space-y-8 sticky top-36">
              <div className="flex items-center gap-4 border-b border-green-border/20 pb-6">
                <Shield size={18} className="text-green-primary" />
                <h2 className="text-[12px] font-display uppercase tracking-[0.4em] text-green-primary font-black">Selo de Elite</h2>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                {[
                  { label: 'Nome do Jogador', field: 'playerName', placeholder: 'Seu Nome / Nick' },
                  { label: 'Nome do Personagem', field: 'characterName', placeholder: 'Ex: SpiritNaot' },
                  { label: 'Nome da Build', field: 'buildName', placeholder: 'Ex: Evade God S12' },
                ].map(({ label, field, placeholder }) => (
                  <div key={field} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">{label}</label>
                    <input required type="text" placeholder={placeholder}
                      value={submission[field as keyof typeof submission]}
                      onChange={(e) => setSubmission({ ...submission, [field]: e.target.value })}
                      className="w-full bg-black/40 border border-green-border/40 p-3 text-white text-xs tracking-widest focus:border-green-primary focus:outline-none" />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Descrição da Build</label>
                  <textarea
                    rows={4}
                    placeholder="Descreva a build, rotação, pontos fortes..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full bg-black/40 border border-green-border/40 p-3 text-white text-xs tracking-widest focus:border-green-primary focus:outline-none resize-none placeholder:text-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[3px] text-green-muted font-bold">Versão</label>
                    <input required type="text" value={submission.version}
                      onChange={(e) => setSubmission({ ...submission, version: e.target.value })}
                      className="w-full bg-black/40 border border-green-border/40 p-3 text-white text-xs tracking-widest focus:border-green-primary focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[3px] text-[#8a5a0a] font-bold">Chave ASILO</label>
                    <input required type="password" placeholder="••••••••" value={submission.key}
                      onChange={(e) => setSubmission({ ...submission, key: e.target.value })}
                      className="w-full bg-black/40 border border-[#8a5a0a]/20 p-3 text-[#8a5a0a] text-xs tracking-widest focus:border-[#8a5a0a] focus:outline-none" />
                  </div>
                </div>

                <button type="submit" disabled={saving}
                  className="w-full py-4 bg-green-primary text-white text-[11px] tracking-[6px] uppercase font-display font-bold hover:bg-green-bright hover:shadow-[0_0_40px_rgba(90,184,42,0.4)] transition-all duration-500 rounded-[2px] disabled:opacity-50 disabled:cursor-not-allowed">
                  {saving ? 'Publicando...' : 'Publicar Build'}
                </button>

                {saveStatus === 'success' && (
                  <div className="p-4 bg-green-primary/10 border border-green-primary/30 text-green-bright text-[10px] uppercase tracking-widest text-center">
                    Build publicada com sucesso!
                  </div>
                )}
                {saveStatus === 'error' && (
                  <div className="p-4 bg-red-900/10 border border-red-900/30 text-red-500 text-[10px] uppercase tracking-widest text-center">
                    Falha ao publicar. Verifique a chave ou conexão.
                  </div>
                )}
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
