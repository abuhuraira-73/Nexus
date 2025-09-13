import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Shape } from '../pages/infinite-canvas';

export type CanvasMode = 'select' | 'draw' | 'erase';

interface CanvasState {
  shapes: Shape[];
  history: Shape[][]; // Array of past shape states
  future: Shape[][]; // Array of future shape states for redo
  selectedId: string | null;
  mode: CanvasMode;
  strokeColor: string;
  strokeWidth: number;

  addShape: (newShape: Shape) => void;
  updateShape: (updatedShape: Partial<Shape> & { id: string }) => void;
  deleteShape: (id: string) => void;
  selectShape: (id: string | null) => void;
  setMode: (mode: CanvasMode) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  undo: () => void;
  redo: () => void;
}

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set) => ({
      shapes: [],
      history: [],
      future: [],
      selectedId: null,
      mode: 'select',
      strokeColor: '#000000',
      strokeWidth: 2,

      addShape: (newShape) => {
        set((state) => {
          const newHistory = [...state.history, state.shapes]; // Save current state to history
          return {
            shapes: [...state.shapes, newShape],
            history: newHistory,
            future: [], // Clear future on new action
          };
        });
      },

      updateShape: (updatedShape) => {
        set((state) => {
          const newHistory = [...state.history, state.shapes]; // Save current state to history
          return {
            shapes: state.shapes.map((shape) =>
              shape.id === updatedShape.id
                ? { ...shape, ...updatedShape }
                : shape
            ),
            history: newHistory,
            future: [], // Clear future on new action
          };
        });
      },

      deleteShape: (id) => {
        set((state) => {
          const newHistory = [...state.history, state.shapes]; // Save current state to history
          return {
            shapes: state.shapes.filter((shape) => shape.id !== id),
            history: newHistory,
            future: [], // Clear future on new action
            selectedId: null, // Deselect on deletion
          };
        });
      },

      selectShape: (id) => set({ selectedId: id }),

      setMode: (mode) => set({ mode }),

      setStrokeColor: (color) => set({ strokeColor: color }),

      setStrokeWidth: (width) => set({ strokeWidth: width }),

      undo: () => {
        set((state) => {
          if (state.history.length === 0) return state; // Nothing to undo

          const previousShapes = state.history[state.history.length - 1];
          const newHistory = state.history.slice(0, -1); // Remove last history entry
          const newFuture = [state.shapes, ...state.future]; // Add current state to future

          return {
            shapes: previousShapes,
            history: newHistory,
            future: newFuture,
            selectedId: null, // Deselect on undo
          };
        });
      },

      redo: () => {
        set((state) => {
          if (state.future.length === 0) return state; // Nothing to redo

          const nextShapes = state.future[0];
          const newFuture = state.future.slice(1); // Remove first future entry
          const newHistory = [...state.history, state.shapes]; // Add current state to history

          return {
            shapes: nextShapes,
            history: newHistory,
            future: newFuture,
            selectedId: null, // Deselect on redo
          };
        });
      },
    }),
    {
      name: 'canvas-storage', // unique name
      partialize: (state) => ({ shapes: state.shapes }), // only persist the 'shapes' state
    }
  )
);