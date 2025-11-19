import { CompressionResult } from '../core/types';

interface MetricsCardsProps {
  result: CompressionResult;
}

export const MetricsCards = ({ result }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 animate-fade-in">
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 text-center shadow-xl transition-all hover:scale-105 hover:border-slate-700">
        <div className="text-3xl font-bold text-slate-100 animate-count-up">
          {result.originalTokens}
        </div>
        <div className="text-xs text-slate-400 mt-2 font-medium">Tokens Originais</div>
      </div>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-5 text-center shadow-xl transition-all hover:scale-105 hover:border-slate-700">
        <div className="text-3xl font-bold text-slate-100 animate-count-up">
          {result.compressedTokens}
        </div>
        <div className="text-xs text-slate-400 mt-2 font-medium">Tokens Comprimidos</div>
      </div>
      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-800/50 rounded-xl p-5 text-center shadow-xl transition-all hover:scale-105 hover:border-green-700/50">
        <div className="text-3xl font-bold text-green-400 animate-count-up">
          {result.reduction}%
        </div>
        <div className="text-xs text-green-300/70 mt-2 font-medium">Redução</div>
      </div>
    </div>
  );
};
