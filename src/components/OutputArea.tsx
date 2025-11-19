import { CompressionResult } from '../core/types';

interface OutputAreaProps {
  result: CompressionResult;
  copied: boolean;
  autoCopy: boolean;
  onCopy: () => void;
}

export const OutputArea = ({ result, copied, autoCopy, onCopy }: OutputAreaProps) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6 shadow-2xl animate-slide-up transition-all hover:border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-slate-300">Resultado Comprimido</h3>
        {!autoCopy && (
          <button
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95"
            onClick={onCopy}
          >
            {copied ? '✓ Copiado!' : 'Copiar'}
          </button>
        )}
      </div>
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-100 whitespace-pre-wrap break-words min-h-[120px]">
        {result.compressed}
      </div>
    </div>
  );
};
