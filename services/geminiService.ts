import { GoogleGenAI, Type } from "@google/genai";
import { GenerationSettings, TechStackOption } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

export const generateEnhancedPrompt = async (
  rawInput: string,
  settings: GenerationSettings
): Promise<string> => {
  if (!rawInput.trim()) return '';

  const stackString = settings.includeTechStack 
    ? `Required Tech Stack: ${settings.selectedStack.join(', ')}.` 
    : '';
  
  const aestheticsString = settings.addVisuals 
    ? "Include rigorous requirements for modern UI/UX, 'vibe-aligned' aesthetics, responsiveness, and mobile-first design using Tailwind CSS. Use high-quality icons and refined typography." 
    : '';

  const strictnessString = settings.strictMode 
    ? "Enforce strict TypeScript usage, no 'any' types, proper error boundaries, and defensive programming patterns." 
    : '';

  const multiAgentString = settings.multiAgent
    ? "Architect the application using a Multi-Agent System (MAS) pattern. Design distinct roles (e.g., Coordinator, Executor, Validator) that communicate through a structured state machine or message bus. Focus on agentic autonomy and collaborative problem-solving within the app logic."
    : '';

  const testingString = settings.testing
    ? "Include a comprehensive testing strategy. Mandate the use of Vitest for unit/integration tests and provide a clear structure for E2E testing. Every core utility and component should have a corresponding '.test.ts' or '.spec.tsx' file with meaningful assertions."
    : '';

  const systemInstruction = `
    You are a Senior Vibe Coding Architect and Lead Prompt Engineer. 
    Your goal is to take a vague or simple user idea and transmute it into a "Vibe Coding" Master Prompt.
    
    A "Vibe Coding" Master Prompt is a highly detailed, technically precise instruction block that a user would paste into an AI coding assistant to get a perfect, one-shot application.
    
    The output should be the PROMPT itself, written in the second person (addressing the AI assistant).
    
    Structure the generated prompt with these sections:
    1. **Role & Goal**: Tell the AI it is a world-class senior engineer.
    2. **Core Functionality**: Expand the user's idea into concrete, high-value features.
    3. **Architecture & Multi-Agent**: ${multiAgentString}
    4. **Tech Stack Constraints**: ${stackString}
    5. **Visual Guidelines**: ${aestheticsString}
    6. **Code Quality & Testing**: ${strictnessString} ${testingString}
    7. **File Structure**: Mandate a clean, modular structure (e.g., components/, services/, agents/, tests/, types.ts).
    
    Do not output markdown code blocks for the prompt itself unless it contains code examples for the AI to follow. The output should be ready to copy-paste directly.
    
    User's Raw Idea: "${rawInput}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: "Generate the Master Prompt now.",
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 2048 },
        temperature: 0.7,
      }
    });

    return response.text || "Failed to generate prompt. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to Gemini API. Please check your API key and try again.";
  }
};