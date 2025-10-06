import { create } from 'zustand';

interface AppState {
  isCreateModalOpen: boolean;
  setCreateModalOpen: (isOpen: boolean) => void;
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
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
  isCreateModalOpen: false,
  setCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),
  isProfileModalOpen: false,
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
  isDeleteModalOpen: false,
  openDeleteModal: () => set({ isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  currentCanvasName: null,
  isSaving: false,
  lastSaved: null,
  setCurrentCanvasName: (name) => set({ currentCanvasName: name }),
  setIsSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (date) => set({ lastSaved: date }),
  triggerAddComment: 0,
  fireAddComment: () => set((state) => ({ triggerAddComment: state.triggerAddComment + 1 })),
}));
