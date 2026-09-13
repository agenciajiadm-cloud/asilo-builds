'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, Shield } from 'lucide-react';

// Mock data for admin listing
const MOCK_BUILDS = [
  { id: 1, nome: 'Evade Spiritborn · Perma-Evade', classe: 'Spiritborn', publicado: true, criado_em: '2024-03-31', slug: 'evade-spiritborn-perma-evade' },
  { id: 2, nome: 'Whirlwind Dust Devils', classe: 'Bárbaro', publicado: false, criado_em: '2024-03-30', slug: 'barbarian-whirlwind-dust-devils' },
];

export default function AdminBuildsPage() {
  const [builds, setBuilds] = useState(MOCK_BUILDS);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-display uppercase tracking-[0.2em] text-green-primary mb-2">
              Gerenciar Builds
            </h1>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-secondary">
              <Shield size={12} className="text-green-primary" />
              Portal do Membro · ASILO
            </div>
          </div>
          
          <Link 
            href="/admin/nova-build"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-green-primary text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-green-light transition-all shadow-[0_0_20px_rgba(58,138,24,0.2)]"
          >
            <Plus size={16} /> Nova Build
          </Link>
        </div>

        <div className="bg-bg-card border border-green-dark overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-green-dark/30 bg-bg-primary/50">
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Build</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Classe</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-dark/10">
              {builds.map((build) => (
                <tr key={build.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{build.nome}</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">Criada em {build.criado_em}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase tracking-widest text-green-text border border-green-dark/40 px-2 py-0.5 bg-green-dark/10">
                      {build.classe}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {build.publicado ? (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-green-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse"></span>
                        Publicado
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-dark"></span>
                        Rascunho
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/builds/${build.slug}`}
                        target="_blank"
                        className="p-2 text-text-secondary hover:text-green-primary transition-colors"
                        title="Ver no site"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button 
                        className="p-2 text-text-secondary hover:text-green-primary transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {builds.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                Você ainda não possui builds cadastradas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
