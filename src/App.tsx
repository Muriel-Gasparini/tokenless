import { useState, useEffect } from "react";
import { CompressionOrchestrator } from "./core/orchestrator";
import { CompressionResult } from "./core/types";
import { freeTokenizer } from "./core/tokenizer";
import { useDebounce } from "./hooks/useDebounce";
import { Header } from "./components/Header";
import { Settings } from "./components/Settings";
import { InputArea } from "./components/InputArea";
import { OutputArea } from "./components/OutputArea";
import { SideBySideView } from "./components/SideBySideView";
import { MetricsCards } from "./components/MetricsCards";

const orchestrator = new CompressionOrchestrator();

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [autoCopy, setAutoCopy] = useState(true);
  const [sideBySide, setSideBySide] = useState(true);

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    return () => {
      freeTokenizer();
    };
  }, []);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setResult(null);
      setIsCompressing(false);
      return;
    }

    setIsCompressing(true);
    const compressionResult = orchestrator.compress(debouncedInput);
    setResult(compressionResult);
    setIsCompressing(false);

    if (autoCopy && compressionResult.compressed) {
      navigator.clipboard.writeText(compressionResult.compressed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [debouncedInput, autoCopy]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Header />

        <Settings
          sideBySide={sideBySide}
          autoCopy={autoCopy}
          copied={copied}
          onSideBySideChange={setSideBySide}
          onAutoCopyChange={setAutoCopy}
        />

        <div className="space-y-6">
          {sideBySide && result ? (
            <SideBySideView
              input={input}
              result={result}
              copied={copied}
              autoCopy={autoCopy}
              onCopy={() => handleCopy(result.compressed)}
              onInputChange={setInput}
            />
          ) : (
            <>
              <InputArea
                value={input}
                onChange={setInput}
                isCompressing={isCompressing}
              />

              {result && (
                <OutputArea
                  result={result}
                  copied={copied}
                  autoCopy={autoCopy}
                  onCopy={() => handleCopy(result.compressed)}
                />
              )}
            </>
          )}

          {result && <MetricsCards result={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;
