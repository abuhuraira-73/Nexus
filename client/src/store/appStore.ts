import { create } from 'zustand';

interface AppState {
  currentCanvasName: string | null;
  setCurrentCanvasName: (name: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentCanvasName: null,
  setCurrentCanvasName: (name) => set({ currentCanvasName: name }),
}));
