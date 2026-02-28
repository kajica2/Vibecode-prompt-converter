import React, { useState } from 'react';
import { Copy, Check, Terminal, Sparkles } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
  isGenerating: boolean;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, isGenerating }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="glass-panel rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
          <Sparkles className="relative text-cyan-400 animate-spin-slow" size={48} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Synthesizing Vibe...</h3>
        <p className="text-slate-400 max-w-md">
          Aligning chakras with TypeScript definitions and constructing the ultimate prompt vector.
        </p>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="glass-panel rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center text-center border-dashed border-slate-700">
        <Terminal className="text-slate-600 mb-4" size={48} />
        <p className="text-slate-500">
          Ready to generate. Enter your idea above and hit Convert.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-2xl shadow-black/50 border-cyan-500/30">
      <div className="bg-slate-900/50 border-b border-white/5 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-3 text-sm font-mono text-slate-400">master_prompt.txt</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'COPIED' : 'COPY PROMPT'}
        </button>
      </div>
      <div className="p-6 overflow-auto max-h-[600px] bg-[#0B1221]">
        <pre className="whitespace-pre-wrap font-mono text-sm text-cyan-50 leading-relaxed selection:bg-cyan-500/30">
          {prompt}
        </pre>
      </div>
    </div>
  );
};