interface SettingsProps {
  sideBySide: boolean;
  autoCopy: boolean;
  copied: boolean;
  onSideBySideChange: (value: boolean) => void;
  onAutoCopyChange: (value: boolean) => void;
}

export const Settings = ({
  sideBySide,
  autoCopy,
  copied,
  onSideBySideChange,
  onAutoCopyChange,
}: SettingsProps) => {
  return (
    <div className="flex justify-center gap-6 mb-8 animate-fade-in">
      <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-white transition-colors">
        <input
          type="checkbox"
          checked={sideBySide}
          onChange={(e) => onSideBySideChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
        />
        <span>Comparação Lado a Lado</span>
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-white transition-colors">
        <input
          type="checkbox"
          checked={autoCopy}
          onChange={(e) => onAutoCopyChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
        />
        <span>Copiar Automaticamente</span>
        {autoCopy && copied && (
          <span className="text-green-400 text-xs animate-pulse">✓</span>
        )}
      </label>
    </div>
  );
};
