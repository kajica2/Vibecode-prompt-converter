import React from 'react';
import { GenerationSettings, TechStackOption } from '../types';
import { Check, Settings2, Palette, ShieldAlert, Users, Beaker } from 'lucide-react';

interface SettingsPanelProps {
  settings: GenerationSettings;
  setSettings: React.Dispatch<React.SetStateAction<GenerationSettings>>;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  
  const toggleStack = (option: TechStackOption) => {
    setSettings(prev => {
      const newStack = prev.selectedStack.includes(option)
        ? prev.selectedStack.filter(s => s !== option)
        : [...prev.selectedStack, option];
      return { ...prev, selectedStack: newStack };
    });
  };

  const toggleBoolean = (key: keyof GenerationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="glass-panel rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4 text-cyan-400">
        <Settings2 size={20} />
        <h3 className="font-semibold text-lg">Configuration Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {/* Core Switches */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${settings.includeTechStack ? 'bg-cyan-500 border-cyan-500' : 'border-slate-500 group-hover:border-cyan-400'}`}
                 onClick={() => toggleBoolean('includeTechStack')}>
              {settings.includeTechStack && <Check size={14} className="text-white" />}
            </div>
            <span className="text-slate-300 group-hover:text-white transition-colors">Enforce Tech Stack</span>
          </label>

           <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${settings.addVisuals ? 'bg-pink-500 border-pink-500' : 'border-slate-500 group-hover:border-pink-400'}`}
                 onClick={() => toggleBoolean('addVisuals')}>
              {settings.addVisuals && <Check size={14} className="text-white" />}
            </div>
            <div className="flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors">
              <Palette size={14} />
              <span>Vibe & Aesthetics</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${settings.strictMode ? 'bg-violet-500 border-violet-500' : 'border-slate-500 group-hover:border-violet-400'}`}
                 onClick={() => toggleBoolean('strictMode')}>
              {settings.strictMode && <Check size={14} className="text-white" />}
            </div>
             <div className="flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors">
              <ShieldAlert size={14} />
              <span>Strict Type Safety</span>
            </div>
          </label>
        </div>

        <div className="space-y-3">
           <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${settings.multiAgent ? 'bg-orange-500 border-orange-500' : 'border-slate-500 group-hover:border-orange-400'}`}
                 onClick={() => toggleBoolean('multiAgent')}>
              {settings.multiAgent && <Check size={14} className="text-white" />}
            </div>
            <div className="flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors">
              <Users size={14} />
              <span>Multi-Agent Architecture</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${settings.testing ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 group-hover:border-emerald-400'}`}
                 onClick={() => toggleBoolean('testing')}>
              {settings.testing && <Check size={14} className="text-white" />}
            </div>
            <div className="flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors">
              <Beaker size={14} />
              <span>Comprehensive Testing</span>
            </div>
          </label>
        </div>

        {/* Stack Selection */}
        {settings.includeTechStack && (
          <div className="col-span-full">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Active Modules</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(TechStackOption).map((option) => (
                <button
                  key={option}
                  onClick={() => toggleStack(option)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    settings.selectedStack.includes(option)
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};