import { CompressionResult } from '../core/types';

interface SideBySideViewProps {
  input: string;
  result: CompressionResult;
  copied: boolean;
  autoCopy: boolean;
  onCopy: () => void;
  onInputChange: (value: string) => void;
}

export const SideBySideView = ({
  input,
  result,
  copied,
  autoCopy,
  onCopy,
  onInputChange,
}: SideBySideViewProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 animate-slide-up">
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6 shadow-2xl transition-all hover:border-slate-700">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-semibold text-slate-300">
            Prompt Original
          </label>
          <span className="text-xs text-slate-400">{result.originalTokens} tokens</span>
        </div>
        <textarea
          className="w-full h-80 bg-slate-950 border border-slate-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-slate-100 resize-none"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-green-800/50 p-6 shadow-2xl transition-all hover:border-green-700/50">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-sm font-semibold text-green-300">Resultado Comprimido</h3>
            <p className="text-xs text-slate-500 mt-1">
              {result.strategiesApplied.join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-400">{result.compressedTokens} tokens</span>
            {!autoCopy && (
              <button
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95"
                onClick={onCopy}
              >
                {copied ? '✓' : 'Copiar'}
              </button>
            )}
          </div>
        </div>
        <div className="bg-slate-950 border border-green-800/30 rounded-lg p-4 font-mono text-sm text-slate-100 whitespace-pre-wrap break-words h-80 overflow-y-auto">
          {result.compressed}
        </div>
      </div>
    </div>
  );
};
