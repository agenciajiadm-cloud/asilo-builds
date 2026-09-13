import { Equipamento } from '@/lib/types';
import { motion } from 'framer-motion';

interface ItemBlockProps {
  item: Equipamento;
}

export default function ItemBlock({ item }: ItemBlockProps) {
  const { afixos } = item;
  
  // Cores baseadas na qualidade
  const qualityColors = {
    'Ancestral': 'text-orange-primary',
    'Lendário': 'text-orange-400',
    'Único': 'text-purple-400',
    'Comum': 'text-text-secondary',
  };

  const qualityColor = qualityColors[item.qualidade as keyof typeof qualityColors] || 'text-orange-primary';

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="diablo-border p-5 bg-gradient-to-br from-bg-card to-bg-primary group/item cursor-default"
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-white/90 group-hover:text-green-bright transition-colors">
          {item.slot}
        </span>
        {item.item_power && (
          <span className="text-[10px] font-mono text-green-muted font-bold tracking-tighter">
            {item.item_power} IP
          </span>
        )}
      </div>
      
      <div className={`text-[10px] uppercase tracking-[0.4em] font-bold ${qualityColor} mb-4 border-b border-green-border/20 pb-2 flex items-center gap-2`}>
        <div className={`w-1 h-1 rounded-full ${qualityColor.replace('text-', 'bg-')}`}></div>
        {item.qualidade}
      </div>
      
      <div className="space-y-2">
        {/* Stats Normais */}
        <div className="space-y-1">
          {afixos.stats.map((stat, idx) => (
            <div key={idx} className="text-[12px] text-green-text leading-tight font-medium flex items-start gap-2">
              <span className="text-green-muted mt-0.5">•</span>
              {stat}
            </div>
          ))}
        </div>
        
        {/* Aspecto */}
        {afixos.aspecto && (
          <div className="py-3 border-y border-green-border/10 my-3">
            <div className="text-[12px] text-orange-primary font-bold leading-relaxed tracking-tight group-hover:text-orange-400 transition-colors">
              {afixos.aspecto}
            </div>
            <div className="text-[9px] uppercase tracking-[2px] text-orange-900/60 font-bold mt-1">Aspecto Lendário</div>
          </div>
        )}
        
        {/* Temperas */}
        {afixos.temperas.length > 0 && (
          <div className="space-y-1 mt-3">
            {afixos.temperas.map((tempera, idx) => (
              <div key={idx} className="text-[11px] text-orange-primary/80 leading-tight italic flex items-center gap-2">
                <span className="text-orange-900/40">✦</span>
                {tempera}
              </div>
            ))}
          </div>
        )}
        
        {/* Masterizações */}
        {afixos.masterizacoes.length > 0 && (
          <div className="space-y-1 mt-4 pt-3 border-t border-green-border/5">
            {afixos.masterizacoes.map((master, idx) => (
              <div key={idx} className="text-[11px] text-orange-dark leading-tight flex items-start gap-2 group-hover:text-orange-primary/60 transition-colors">
                <span className="mt-1 text-[8px]">◆</span>
                <span className="font-medium">{master}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
