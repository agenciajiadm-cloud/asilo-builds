'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const STEPS = [
  'Informações Gerais',
  'Resumo e Rotação',
  'Skills',
  'Equipamentos',
  'Paragon e Publicar'
];

export default function NovaBuildPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    classe_id: '',
    season: 12,
    pit_maximo: '',
    paragon_minimo: '',
    dificuldade: 'Média',
    tags: [] as string[],
    resumo: '',
    rotacao: '',
    video_url: '',
    planner_url: '',
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSave = async (publicado: boolean) => {
    setLoading(true);
    // In a real app, save to Supabase here
    console.log('Salvando build...', { ...formData, publicado });
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/builds');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-display uppercase tracking-[0.2em] text-green-primary mb-8">
            Cadastrar Nova Build
          </h1>
          
          {/* Stepper */}
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-green-dark/30 -translate-y-1/2 z-0"></div>
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                  currentStep === idx 
                    ? 'bg-green-primary border-green-light text-white scale-110' 
                    : currentStep > idx 
                    ? 'bg-green-dark border-green-primary text-green-light'
                    : 'bg-bg-primary border-green-dark text-text-secondary'
                }`}>
                  {currentStep > idx ? <Check size={14} /> : idx + 1}
                </div>
                <span className={`text-[9px] uppercase tracking-widest font-medium ${
                  currentStep === idx ? 'text-green-light' : 'text-text-secondary'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </header>

        <div className="bg-bg-card border border-green-dark p-8 mb-8 min-h-[400px]">
          {/* Step 1: Informações Gerais */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Nome da Build</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white"
                    placeholder="Ex: Evade Spiritborn · Perma-Evade"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Classe</label>
                  <select
                    value={formData.classe_id}
                    onChange={e => setFormData({ ...formData, classe_id: e.target.value })}
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white appearance-none"
                  >
                    <option value="">Selecionar classe...</option>
                    <option value="spiritborn">Spiritborn</option>
                    <option value="barbarian">Bárbaro</option>
                    {/* Add others */}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Pit Máximo</label>
                  <input
                    type="number"
                    value={formData.pit_maximo}
                    onChange={e => setFormData({ ...formData, pit_maximo: e.target.value })}
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white"
                    placeholder="Ex: 113"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Paragon Mínimo</label>
                  <input
                    type="number"
                    value={formData.paragon_minimo}
                    onChange={e => setFormData({ ...formData, paragon_minimo: e.target.value })}
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white"
                    placeholder="Ex: 280"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Dificuldade</label>
                  <select
                    value={formData.dificuldade}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        dificuldade: e.target.value as 'Baixa' | 'Média' | 'Alta',
                      })
                    }
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-green-dark/20">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Link do Planner (Maxroll/D2Core)</label>
                  <input
                    type="url"
                    value={formData.planner_url}
                    onChange={e => setFormData({ ...formData, planner_url: e.target.value })}
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white"
                    placeholder="https://maxroll.gg/d4/planner/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Link do Vídeo (YouTube)</label>
                  <input
                    type="url"
                    value={formData.video_url}
                    onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Resumo e Rotação */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Resumo da Build</label>
                <textarea
                  rows={5}
                  value={formData.resumo}
                  onChange={e => setFormData({ ...formData, resumo: e.target.value })}
                  className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white resize-none"
                  placeholder="Explique a mecânica central da build..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-text-secondary block">Rotação / Como jogar</label>
                <textarea
                  rows={5}
                  value={formData.rotacao}
                  onChange={e => setFormData({ ...formData, rotacao: e.target.value })}
                  className="w-full bg-bg-primary border border-green-dark/40 px-4 py-2.5 text-sm focus:border-green-primary outline-none text-white resize-none"
                  placeholder="Passo a passo da gameplay..."
                />
              </div>
            </div>
          )}

          {/* Steps 3, 4, 5 would follow similar pattern with more complex inputs */}
          {(currentStep >= 2) && (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
                Interface de formulário completa em desenvolvimento para os passos seguintes.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-2 border border-green-dark text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all disabled:opacity-30"
          >
            <ChevronLeft size={14} /> Anterior
          </button>
          
          <div className="flex items-center gap-4">
            {currentStep === STEPS.length - 1 ? (
              <>
                <button
                  onClick={() => handleSave(false)}
                  disabled={loading}
                  className="px-6 py-2 border border-green-primary text-green-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-green-primary hover:text-white transition-all"
                >
                  Salvar Rascunho
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-2 bg-green-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-green-light transition-all shadow-[0_0_20px_rgba(58,138,24,0.2)]"
                >
                  <Save size={14} /> Publicar Build
                </button>
              </>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-2 bg-green-dark border border-green-primary text-green-light text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-green-primary hover:text-white transition-all"
              >
                Próximo <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
