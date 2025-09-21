import { create } from 'zustand';

interface AppState {
  currentCanvasName: string | null;
  isSaving: boolean;
  lastSaved: Date | null;
  setCurrentCanvasName: (name: string | null) => void;
  setIsSaving: (isSaving: boolean) => void;
  setLastSaved: (date: Date | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentCanvasName: null,
  isSaving: false,
  lastSaved: null,
  setCurrentCanvasName: (name) => set({ currentCanvasName: name }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (date) => set({ lastSaved: date }),
}));
