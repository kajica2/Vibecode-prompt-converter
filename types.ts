export enum TechStackOption {
  REACT = 'React 18+',
  TYPESCRIPT = 'TypeScript',
  TAILWIND = 'Tailwind CSS',
  FRAMER_MOTION = 'Framer Motion',
  LUCIDE = 'Lucide Icons',
  RECHARTS = 'Recharts',
  D3 = 'D3.js',
  GEMINI_API = 'Gemini API',
}

export interface GenerationSettings {
  includeTechStack: boolean;
  selectedStack: TechStackOption[];
  strictMode: boolean;
  addVisuals: boolean;
  addErrorHandling: boolean;
  multiAgent: boolean;
  testing: boolean;
}

export interface PromptResponse {
  enhancedPrompt: string;
  explanation: string;
}

export const DEFAULT_STACK = [
  TechStackOption.REACT,
  TechStackOption.TYPESCRIPT,
  TechStackOption.TAILWIND,
  TechStackOption.LUCIDE,
];