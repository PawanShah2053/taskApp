import { create } from 'zustand';

type GenerationStatus = 'idle' | 'generating' | 'completed' | 'failed';

interface Generation {
  id: string;
  prompt: string;
  status: GenerationStatus;
  progress: number;
  timestamp: number;
  error?: string;
  audioUrl?: string;
}

interface StoreState {
  generations: Generation[];
  currentPrompt: string;
  isGenerating: boolean;
  addGeneration: (prompt: string) => string;
  updateGeneration: (id: string, updates: Partial<Generation>) => void;
  setCurrentPrompt: (prompt: string) => void;
}

const useStore = create<StoreState>((set) => ({
  generations: [],
  currentPrompt: '',
  isGenerating: false,
  
  addGeneration: (prompt: string) => {
    const newGeneration: Generation = {
      id: Date.now().toString(),
      prompt,
      status: 'generating',
      progress: 0,
      timestamp: Date.now(),
    };
    
    set((state) => ({
      generations: [newGeneration, ...state.generations],
      isGenerating: true,
    }));
    
    return newGeneration.id;
  },
  
  updateGeneration: (id: string, updates: Partial<Generation>) => 
    set((state) => ({
      generations: state.generations.map((gen) =>
        gen.id === id ? { ...gen, ...updates } : gen
      ),
      isGenerating: updates.status === 'generating',
    })),
    
  setCurrentPrompt: (prompt: string) => set({ currentPrompt: prompt }),
}));

export default useStore;
