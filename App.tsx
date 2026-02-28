import React, { useState } from 'react';
import { Wand2, Zap, Github, Cpu } from 'lucide-react';
import { SettingsPanel } from './components/SettingsPanel';
import { PromptDisplay } from './components/PromptDisplay';
import { generateEnhancedPrompt } from './services/geminiService';
import { GenerationSettings, DEFAULT_STACK } from './types';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    includeTechStack: true,
    selectedStack: DEFAULT_STACK,
    strictMode: true,
    addVisuals: true,
    addErrorHandling: true,
    multiAgent: false,
    testing: false,
  });

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;
    
    setIsGenerating(true);
    setGeneratedPrompt(''); // Clear previous
    
    // Simulate a minimum "processing" feel for better UX
    const startTime = Date.now();
    
    const result = await generateEnhancedPrompt(inputValue, settings);
    
    const duration = Date.now() - startTime;
    const minTime = 800; // ms
    
    if (duration < minTime) {
      await new Promise(resolve => setTimeout(resolve, minTime - duration));
    }

    setGeneratedPrompt(result);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-cyan-500/30">
      {/* Background Gradient Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />

      <main className="relative max-w-5xl mx-auto px-4 py-12 md:py-20">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full glass-panel mb-4 shadow-[0_0_20px_rgba(167,139,250,0.3)]">
             <div className="px-4 py-1 rounded-full bg-slate-900/50 text-xs font-medium text-violet-300 flex items-center gap-2">
               <Cpu size={14} />
               <span>POWERED BY GEMINI 3 FLASH</span>
             </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Vibe<span className="gradient-text">Coder</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Transform your rough ideas into precision-engineered instructions for AI coding assistants. 
            Stop iterating. <span className="text-white font-medium">Start building.</span>
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-xl h-full flex flex-col">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Your Idea</span>
                <span className="text-xs text-slate-500 font-normal normal-case">Be vague, it's okay.</span>
              </label>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., I want a crypto dashboard that looks like a spaceship HUD, tracks Bitcoin price, and has a news feed."
                className="w-full flex-grow bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none font-medium leading-relaxed transition-all min-h-[200px]"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !inputValue.trim()}
                className={`mt-6 w-full py-4 rounded-lg font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                  isGenerating || !inputValue.trim()
                    ? 'bg-slate-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]'
                }`}
              >
                {isGenerating ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Wand2 size={20} />
                    CONVERT TO PROMPT
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
             <SettingsPanel settings={settings} setSettings={setSettings} />
             <PromptDisplay prompt={generatedPrompt} isGenerating={isGenerating} />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} VibeCoder. All vibes reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Github size={16} />
              <span>Source</span>
            </a>
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              <span>Built with React + Tailwind</span>
            </span>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;