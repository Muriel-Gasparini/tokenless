interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  isCompressing: boolean;
}

export const InputArea = ({ value, onChange, isCompressing }: InputAreaProps) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6 shadow-2xl transition-all hover:border-slate-700 animate-slide-up">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-sm font-semibold text-slate-300">
          Prompt Original
        </label>
        {isCompressing && (
          <span className="text-xs text-blue-400 animate-pulse">Comprimindo...</span>
        )}
      </div>
      <textarea
        className="w-full h-56 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-slate-100 resize-none placeholder-slate-600 transition-all"
        placeholder="Cole seu prompt aqui... A compressão acontece automaticamente enquanto você digita."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
