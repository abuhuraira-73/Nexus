import { create } from 'zustand';

interface AppStore {
  isCreateModalOpen: boolean;
  setCreateModalOpen: (isOpen: boolean) => void;
  currentCanvasName: string | null;
  setCurrentCanvasName: (name: string | null) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
  lastSaved: Date | null;
  setLastSaved: (date: Date | null) => void;
  triggerAddComment: number;
  fireAddComment: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentCanvasName: null,
  isSaving: false,
  lastSaved: null,
  setCurrentCanvasName: (name) => set({ currentCanvasName: name }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (date) => set({ lastSaved: date }),
  triggerAddComment: 0,
  fireAddComment: () => set((state) => ({ triggerAddComment: state.triggerAddComment + 1 })),
}));
