export interface Classe {
  id: number;
  slug: string;
  nome: string;
  icone_url?: string;
  ativo: boolean;
}

export interface Membro {
  id: string;
  nome: string;
  battletag?: string;
  youtube_url?: string;
  twitch_url?: string;
  is_admin: boolean;
}

export interface Build {
  id: number;
  slug: string;
  nome: string;
  classe_id: number;
  autor_id: string;
  season: number;
  pit_maximo?: number;
  paragon_minimo?: number;
  dificuldade: 'Baixa' | 'Média' | 'Alta';
  featured: boolean;
  rank_br?: number;
  resumo: string;
  rotacao?: string;
  video_url?: string;
  planner_url?: string;
  tags: string[];
  publicado: boolean;
  criado_em: string;
  atualizado_em: string;
  
  // Joins
  membro?: Membro;
  classe?: Classe;
}

export interface Skill {
  id: number;
  build_id: number;
  ordem: number;
  nome: string;
  pontos?: number;
  descricao?: string;
}

export interface Afixos {
  stats: string[];
  aspecto?: string;
  temperas: string[];
  masterizacoes: string[];
}

export interface Equipamento {
  id: number;
  build_id: number;
  slot: string;
  item_power?: number;
  qualidade: string;
  afixos: Afixos;
}

export interface ParagonBoard {
  id: number;
  build_id: number;
  ordem: number;
  nome: string;
  nos_ativos: string[];
  glyphs: { nome: string; nivel: number }[];
}

export interface RankingBR {
  id: number;
  classe_id: number;
  posicao: number;
  player_name: string;
  battletag?: string;
  pit_nivel?: number;
  membro_id?: string;
  atualizado_em: string;
}
